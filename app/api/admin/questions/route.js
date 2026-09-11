// Reviewing a question: saying what the answer is, and publishing it.
//
// A question is only ever published with an answer. That is the whole point of
// the queue — half-answered questions were the thing most likely to reach a
// student and teach them something wrong.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });
  const profile = gate.profile;

  const { id, answer, model, why, status } = await request.json();
  if (!id) return NextResponse.json({ error: 'no question' }, { status: 400 });

  const db = supabaseAdmin();

  // What counts as an answer depends on the question. A written one is
  // answered by words; asking it for an index into propositions it does not
  // have is how a QROC would sit in the queue for ever, unpublishable.
  const { data: known } = await db.from('questions')
    .select('kind').eq('id', id).maybeSingle();
  const written = known?.kind === 'qroc';
  const text = model === undefined || model === null ? null : String(model).trim();

  const answered = written ? Boolean(text) : Array.isArray(answer) && answer.length > 0;
  if (status === 'published' && !answered) {
    return NextResponse.json({ error: 'لا يمكن نشر سؤال بلا جواب' }, { status: 400 });
  }

  const { error } = await db.from('questions').update({
    ...(written ? {} : (answer ? { answer } : {})),
    ...(written && text !== null ? { model_answer: text } : {}),
    ...(why !== undefined ? { why } : {}),
    ...(status ? { status } : {}),
    source: 'staff',
    reviewed_by: profile.id,
    reviewed_at: new Date().toISOString(),
  }).eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: profile.id, action: `question_${status || 'edited'}`,
    target_type: 'question', target_id: String(id),
  });

  return NextResponse.json({ ok: true });
}
