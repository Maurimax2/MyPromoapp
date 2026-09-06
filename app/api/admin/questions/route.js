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

  const { id, answer, why, status } = await request.json();
  if (!id) return NextResponse.json({ error: 'no question' }, { status: 400 });

  if (status === 'published' && (!Array.isArray(answer) || !answer.length)) {
    return NextResponse.json({ error: 'لا يمكن نشر سؤال بلا جواب' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { error } = await db.from('questions').update({
    ...(answer ? { answer } : {}),
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
