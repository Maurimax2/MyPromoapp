// Answering a duel somebody sent you.
//
// The score is worked out here, against the questions the duel stored, from
// the answers the browser sends. Not in the browser: a number a player's own
// device decides is a number that player can decide.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { score } from '@/lib/duel';
import { notify } from '@/lib/notify';

export const runtime = 'nodejs';

export async function POST(request, { params }) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { id } = await params;
  const { answers } = await request.json().catch(() => ({}));

  const db = supabaseAdmin();
  const { data: duel } = await db.from('duels')
    .select('id, module, questions, challenger, opponent, challenger_score, opponent_at')
    .eq('id', id).maybeSingle();

  if (!duel) return NextResponse.json({ error: 'لا تحدٍّ بهذا الرقم' }, { status: 404 });
  if (duel.opponent !== me.id) {
    // The challenger already answered theirs when they sent it, and nobody
    // else is in this row at all.
    return NextResponse.json({ error: 'هذا التحدّي ليس لك' }, { status: 403 });
  }
  if (duel.opponent_at) {
    return NextResponse.json({ error: 'أجبتَ عليه من قبل' }, { status: 409 });
  }

  // The questions as they were, in the order the duel stored them — `in`
  // comes back in whatever order it likes, so it is put back afterwards.
  const { data: rows, error: reading } = await db.from('questions')
    .select('id, answer').in('id', duel.questions);
  if (reading) return NextResponse.json({ error: reading.message }, { status: 500 });

  const byId = new Map((rows || []).map((q) => [Number(q.id), q]));
  const asked = duel.questions.map((qid) => byId.get(Number(qid))).filter(Boolean);

  const mine = score(asked, answers);

  const { error } = await db.from('duels').update({
    opponent_score: mine,
    opponent_at: new Date().toISOString(),
  }).eq('id', duel.id).is('opponent_at', null);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // The person who sent it is told how it went, because they are not looking
  // at the screen — that is the whole point of a duel you can send at
  // midnight.
  await notify({
    person: duel.challenger, actor: me.id, kind: 'duel_done',
    body: `${mine}/${duel.questions.length} — أنت ${duel.challenger_score}/${duel.questions.length}`,
  });

  return NextResponse.json({
    score: mine,
    of: duel.questions.length,
    theirs: duel.challenger_score,
  });
}
