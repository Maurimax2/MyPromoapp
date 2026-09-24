// The evening reminder — once a day, at six in Nouakchott (vercel.json).
//
// Only to people who can be woken, have not turned reminders off, and have
// not studied today. One of two things, never both:
//
//   a streak that ends tonight  «سلسلتك: 12 يومًا — لا تكسرها الليلة»
//   no streak                   «سؤال اليوم بانتظارك» and its question
//
// Somebody who has not opened a lecture in two weeks is not nagged every
// evening — once a week, on Saturday, when the week and its board are new.
//
// Called by Vercel's scheduler with `Authorization: Bearer $CRON_SECRET`.
// Without CRON_SECRET set it refuses everybody, which is the safe way round.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { pushTo, pushReady } from '@/lib/push';
import { streaksOf } from '@/lib/days';
import { dayOf } from '@/lib/habit';
import { dailyQuestion } from '@/lib/daily';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const plural = (n) => (n === 1 ? 'يوم واحد' : n === 2 ? 'يومان' : n <= 10 ? `${n} أيام` : `${n} يومًا`);

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'no' }, { status: 401 });
  }
  if (!pushReady()) return NextResponse.json({ sent: 0, why: 'push is not configured' });

  const db = supabaseAdmin();
  const today = dayOf();
  const saturday = new Date(`${today}T12:00:00Z`).getUTCDay() === 6;

  // Who can be woken at all.
  const people = new Set();
  for (let from = 0; from < 200000; from += 1000) {
    const { data, error } = await db.from('push_devices').select('person').range(from, from + 999);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    for (const d of data || []) people.add(d.person);
    if (!data || data.length < 1000) break;
  }
  if (!people.size) return NextResponse.json({ sent: 0 });
  const ids = [...people];

  // …minus those who turned reminders off, or were already reminded today.
  const skip = new Set();
  for (let i = 0; i < ids.length; i += 200) {
    const group = ids.slice(i, i + 200);
    const [{ data: prefs }, { data: done }] = await Promise.all([
      db.from('push_prefs').select('person, off').in('person', group),
      db.from('push_log').select('person').in('person', group).eq('kind', 'remind').eq('day', today),
    ]);
    for (const p of prefs || []) if ((p.off || []).includes('reminders')) skip.add(p.person);
    for (const d of done || []) skip.add(d.person);
  }
  const left = ids.filter((id) => !skip.has(id));
  if (!left.length) return NextResponse.json({ sent: 0 });

  // Their days, and their year — the question of the day is per year.
  const [streaks, promos] = await Promise.all([
    streaksOf(left, today),
    (async () => {
      const out = new Map();
      for (let i = 0; i < left.length; i += 200) {
        const { data } = await db.from('profiles').select('id, promo, status')
          .in('id', left.slice(i, i + 200));
        for (const p of data || []) if (p.status === 'approved') out.set(p.id, p.promo);
      }
      return out;
    })(),
  ]);

  const streakers = new Map();           // run length → people
  const askers = new Map();              // promo → people
  for (const id of left) {
    const s = streaks.get(id);
    if (!promos.has(id) || s?.today) continue;           // studied today: nothing to say
    if (s?.current > 0) {
      if (!streakers.has(s.current)) streakers.set(s.current, []);
      streakers.get(s.current).push(id);
      continue;
    }
    const last = [...(s?.days?.keys() || [])].sort().pop();
    const quiet = !last || (Date.parse(today) - Date.parse(last)) / 86400000 > 14;
    if (quiet && !saturday) continue;
    const promo = promos.get(id) || 'pcem2';
    if (!askers.has(promo)) askers.set(promo, []);
    askers.get(promo).push(id);
  }

  const chosen = [...streakers.values(), ...askers.values()].flat();
  if (!chosen.length) return NextResponse.json({ sent: 0 });

  // Written down before sending: a job that runs twice sends once.
  for (let i = 0; i < chosen.length; i += 500) {
    await db.from('push_log').insert(chosen.slice(i, i + 500).map((person) => ({ person, kind: 'remind', day: today })));
  }

  let sent = 0;
  for (const [run, who] of streakers) {
    const r = await pushTo(who, {
      kind: 'streak', title: `🔥 ${plural(run)} متتالية`,
      body: 'سلسلتك تنتهي الليلة — افتح محاضرة أو أجب سؤال اليوم لتبقيها', url: '/feed', tag: 'remind',
    });
    sent += r.sent || 0;
  }
  for (const [promo, who] of askers) {
    const q = await dailyQuestion(promo).catch(() => null);
    const stem = q?.stem ? (q.stem.length > 110 ? `${q.stem.slice(0, 109)}…` : q.stem) : null;
    const r = await pushTo(who, {
      kind: 'daily', title: saturday ? 'أسبوع جديد، ترتيب جديد' : 'سؤال اليوم بانتظارك',
      body: stem || 'سؤال واحد، دقيقة واحدة — وتبدأ سلسلتك', url: '/feed', tag: 'remind',
    });
    sent += r.sent || 0;
  }

  return NextResponse.json({ sent, streaks: [...streakers.values()].flat().length, daily: [...askers.values()].flat().length });
}
