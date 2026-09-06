// The Leitner schedule, on the server.
//
// A question you miss comes back in ten minutes; each time you get it right
// it waits longer — a day, three days, a week, three weeks. Miss it again and
// it drops to the start. Answer it right from the top box and it is learnt,
// so it stops being tracked at all.

import { NextResponse } from 'next/server';
import { currentProfile, supabaseServer } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

// Minutes to wait after each consecutive correct answer.
const DELAYS = [10, 24 * 60, 3 * 24 * 60, 7 * 24 * 60, 21 * 24 * 60];

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { question, correct } = await request.json();
  if (!question) return NextResponse.json({ error: 'no question' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: prev } = await db.from('reviews')
    .select('box, wrong').eq('person', me.id).eq('question', question).maybeSingle();

  const box = correct ? Math.min((prev?.box ?? -1) + 1, DELAYS.length - 1) : 0;

  // Learnt: right from the top box. Stop carrying it.
  if (correct && (prev?.box ?? 0) >= DELAYS.length - 1) {
    await db.from('reviews').delete().eq('person', me.id).eq('question', question);
    return NextResponse.json({ learnt: true });
  }

  const due = new Date(Date.now() + DELAYS[box] * 60e3).toISOString();
  const row = {
    person: me.id, question, box,
    wrong: (prev?.wrong ?? 0) + (correct ? 0 : 1),
    due_at: due, seen_at: new Date().toISOString(),
  };

  const { error } = prev
    ? await db.from('reviews').update(row).eq('person', me.id).eq('question', question)
    : await db.from('reviews').insert(row);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ box, due_at: due });
}

/** What this student owes right now. */
export async function GET() {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const sb = await supabaseServer();
  const now = new Date().toISOString();

  const [{ data: due }, { count: tracked }] = await Promise.all([
    sb.from('reviews').select('question, box, wrong')
      .eq('person', me.id).lte('due_at', now).order('due_at').limit(60),
    sb.from('reviews').select('*', { count: 'exact', head: true }).eq('person', me.id),
  ]);

  return NextResponse.json({
    due: (due || []).map((r) => r.question),
    dueCount: due?.length || 0,
    tracked: tracked || 0,
  });
}
