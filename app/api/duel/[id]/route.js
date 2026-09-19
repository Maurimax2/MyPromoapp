// A duel, after it has been sent: accepting it, refusing it, answering it.
//
// Three things arrive here, and which one is decided by `action`. All of them
// are decided on the server — a state a player's own device sets is a state
// that player can set, and so is a score.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { score, stage } from '@/lib/duel';
import { notify } from '@/lib/notify';

export const runtime = 'nodejs';

const WHO = (p) => p?.full_name || p?.email?.split('@')[0] || 'زميلك';

export async function POST(request, { params }) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { id } = await params;
  const { action, answers } = await request.json().catch(() => ({}));

  const db = supabaseAdmin();
  const { data: duel } = await db.from('duels')
    .select(`id, title, state, questions, challenger, opponent,
             challenger_score, opponent_score, challenger_at, opponent_at,
             a:profiles!duels_challenger_fkey(full_name, email),
             b:profiles!duels_opponent_fkey(full_name, email)`)
    .eq('id', id).maybeSingle();

  if (!duel) return NextResponse.json({ error: 'لا تحدٍّ بهذا الرقم' }, { status: 404 });

  const mine = duel.challenger === me.id;
  if (!mine && duel.opponent !== me.id) {
    return NextResponse.json({ error: 'هذا التحدّي ليس لك' }, { status: 403 });
  }

  // ---- accepting, or not -------------------------------------------------
  if (action === 'accept' || action === 'refuse') {
    if (mine) {
      return NextResponse.json({ error: 'أنت من أرسله' }, { status: 403 });
    }
    if (duel.state !== 'invited') {
      return NextResponse.json({ error: 'رُدّ عليه من قبل' }, { status: 409 });
    }

    const to = action === 'accept' ? 'playing' : 'refused';
    const { error } = await db.from('duels')
      .update({ state: to, accepted_at: new Date().toISOString() })
      .eq('id', duel.id).eq('state', 'invited');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await notify({
      person: duel.challenger, actor: me.id,
      kind: action === 'accept' ? 'duel_ok' : 'duel_no',
      body: action === 'accept'
        ? `${WHO(duel.b)} قبل التحدّي — ${duel.title}`
        : `${WHO(duel.b)} اعتذر عن ${duel.title}`,
    });

    return NextResponse.json({ ok: true, state: to });
  }

  // ---- answering it ------------------------------------------------------
  if (duel.state === 'invited') {
    return NextResponse.json({ error: 'لم يُقبل التحدّي بعد' }, { status: 409 });
  }
  if (duel.state === 'refused') {
    return NextResponse.json({ error: 'انتهى هذا التحدّي' }, { status: 409 });
  }
  if ((mine ? duel.challenger_at : duel.opponent_at)) {
    return NextResponse.json({ error: 'أجبتَ عليه من قبل' }, { status: 409 });
  }

  // The questions as the duel stored them, in the order it stored them — `in`
  // comes back in whatever order it likes, so it is put back afterwards.
  const { data: rows, error: reading } = await db.from('questions')
    .select('id, answer').in('id', duel.questions);
  if (reading) return NextResponse.json({ error: reading.message }, { status: 500 });

  const byId = new Map((rows || []).map((q) => [Number(q.id), q]));
  const asked = duel.questions.map((qid) => byId.get(Number(qid))).filter(Boolean);
  const got = score(asked, answers);

  const now = new Date().toISOString();
  const patch = mine
    ? { challenger_score: got, challenger_at: now }
    : { opponent_score: got, opponent_at: now };

  // Both halves in? Then it is over, and both may see the two numbers.
  const theirsIn = mine ? duel.opponent_at : duel.challenger_at;
  if (theirsIn) patch.state = 'done';

  const { error } = await db.from('duels').update(patch).eq('id', duel.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Told only when the result is complete. Telling somebody "he answered" in
  // the middle is telling them nothing they can act on — it is still their
  // turn either way.
  if (theirsIn) {
    const theirScore = mine ? duel.opponent_score : duel.challenger_score;
    await notify({
      person: mine ? duel.opponent : duel.challenger, actor: me.id,
      kind: 'duel_done',
      body: `${duel.title} — ${theirScore}/${duel.questions.length} مقابل ${got}/${duel.questions.length}`,
    });
  }

  return NextResponse.json({
    score: got,
    of: duel.questions.length,
    theirs: theirsIn ? (mine ? duel.opponent_score : duel.challenger_score) : null,
    done: !!theirsIn,
    stage: stage({ ...duel, ...patch }, me.id),
  });
}
