// Answering the question of the day.
//
// The question is picked again here, on the server, from the year and the
// date (lib/daily.js) — the phone only says which propositions it ticked, so
// it can neither choose an easier question nor mark its own answer. One
// answer per person per day; the second tap gets the first answer back.
// Answering counts as a day studied.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { dailyQuestion, dailyTally } from '@/lib/daily';
import { recordStudy } from '@/lib/days';
import { dayOf } from '@/lib/habit';

export const runtime = 'nodejs';

const sameSet = (a, b) => a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });
  if (me.status !== 'approved' || !me.promo) {
    return NextResponse.json({ error: 'حسابك بانتظار الموافقة' }, { status: 403 });
  }

  const day = dayOf();
  const q = await dailyQuestion(me.promo, day);
  if (!q) return NextResponse.json({ error: 'لا سؤال اليوم لسنتك بعد' }, { status: 404 });

  const db = supabaseAdmin();
  const reveal = async (correct, already = false) => NextResponse.json({
    correct, already, answer: q.answer, why: q.why, tally: await dailyTally(me.promo, day),
  });

  // Already answered today: the first answer stands.
  const { data: had, error: lookup } = await db.from('daily_answers')
    .select('correct').eq('person', me.id).eq('day', day).maybeSingle();
  if (lookup) {
    if (lookup.code === '42P01' || /does not exist/.test(lookup.message)) {
      return NextResponse.json({ error: 'سؤال اليوم غير متاح بعد' }, { status: 503 });
    }
    return NextResponse.json({ error: lookup.message }, { status: 500 });
  }
  if (had) return reveal(had.correct, true);

  const { ticked } = await request.json().catch(() => ({}));
  const mine = (Array.isArray(ticked) ? ticked : []).map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n < q.options.length);
  if (!mine.length) return NextResponse.json({ error: 'اختر جوابًا' }, { status: 400 });

  const correct = sameSet(mine, q.answer);
  const { error } = await db.from('daily_answers').insert({
    person: me.id, day, promo: me.promo, question: q.dbId, correct,
  });
  if (error?.code === '23505') {
    const { data: first } = await db.from('daily_answers').select('correct').eq('person', me.id).eq('day', day).maybeSingle();
    return reveal(first?.correct ?? correct, true);
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await recordStudy(me.id, me.promo, 1);
  return reveal(correct);
}
