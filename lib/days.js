// Days studied, kept on the server (habits.sql) — so a streak survives a new
// phone, and classmates can see it.
//
// Written only here, with the service key: a browser cannot give itself a
// day. What counts as studying is decided by the callers — a lecture opened,
// a question answered, the question of the day — never simply opening the app.

import { supabaseAdmin } from '@/lib/supabase/admin';
import { dayOf, streakOf } from '@/lib/habit';

// A database that has not had habits.sql pasted has no such table. The app
// must not break on that — the streak simply is not kept yet.
const missing = (error) => error?.code === '42P01' || /does not exist/.test(error?.message || '');

/** Count today as studied for this person, `weight` times. Never throws. */
export async function recordStudy(person, promo, weight = 1) {
  if (!person) return;
  const db = supabaseAdmin();
  const day = dayOf();
  const w = Math.max(1, Math.min(20, Math.round(Number(weight) || 1)));

  // Look first, then write: no ON CONFLICT against this schema.
  const { data: had, error } = await db.from('study_days')
    .select('n').eq('person', person).eq('day', day).maybeSingle();
  if (error) { if (!missing(error)) console.error('recordStudy:', error.message); return; }

  if (had) {
    await db.from('study_days').update({ n: (had.n || 0) + w }).eq('person', person).eq('day', day);
    return;
  }
  const { error: made } = await db.from('study_days').insert({ person, day, n: w, promo: promo || null });
  // Two taps racing to be the day's first: the other one made the row.
  if (made?.code === '23505') {
    const { data: now } = await db.from('study_days').select('n').eq('person', person).eq('day', day).maybeSingle();
    await db.from('study_days').update({ n: (now?.n || 0) + w }).eq('person', person).eq('day', day);
  } else if (made && !missing(made)) {
    console.error('recordStudy:', made.message);
  }
}

/**
 * The days a set of people studied since `since`, as person → Map(day → n).
 * Read a page at a time and in small groups of people, because a year of a
 * promo is more rows than one answer carries.
 */
export async function daysOf(people, since) {
  const out = new Map(people.map((id) => [id, new Map()]));
  if (!people.length) return out;
  const db = supabaseAdmin();
  const PAGE = 1000;
  for (let i = 0; i < people.length; i += 80) {
    const group = people.slice(i, i + 80);
    for (let from = 0; from < 50000; ) {
      const { data, error } = await db.from('study_days')
        .select('person, day, n').in('person', group).gte('day', since)
        .order('day').range(from, from + PAGE - 1);
      if (error) return out;          // not pasted yet: nobody has days
      for (const r of data || []) out.get(r.person)?.set(String(r.day).slice(0, 10), r.n || 1);
      if (!data?.length || data.length < PAGE) break;
      from += data.length;
    }
  }
  return out;
}

/** Everybody's streak in one go: person → { current, longest, freezes, today }. */
export async function streaksOf(people, today = dayOf()) {
  // Long enough for a 100-day badge and the longest run anybody has now.
  const since = dayOf(Date.parse(`${today}T00:00:00Z`) - 200 * 86400000);
  const days = await daysOf(people, since);
  return new Map([...days].map(([id, m]) => [id, { ...streakOf(m.keys(), today), days: m }]));
}

/** How many of a year studied today. */
export async function studiedToday(promo) {
  if (!promo) return 0;
  const { count, error } = await supabaseAdmin().from('study_days')
    .select('person', { count: 'exact', head: true }).eq('promo', promo).eq('day', dayOf());
  return error ? 0 : count || 0;
}
