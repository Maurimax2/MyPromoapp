// Reporting something.
//
// Apple will not accept an app carrying what students write without a way to
// report it and a way for somebody to act — and beyond the rule, a promo of
// eighty needs it the first time somebody posts an exam paper they should
// not have.

import { NextResponse } from 'next/server';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const KINDS = ['post', 'comment', 'note', 'profile', 'room'];

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { type, id, reason } = await request.json();
  if (!KINDS.includes(type) || !id) {
    return NextResponse.json({ error: 'ما الذي تُبلّغ عنه؟' }, { status: 400 });
  }

  const db = supabaseAdmin();

  // Reporting the same thing twice is a person pressing again, not two
  // reports. It should not double the queue.
  const { data: already } = await db.from('reports')
    .select('id').eq('reporter', me.id).eq('target_type', type)
    .eq('target_id', String(id)).eq('state', 'open').maybeSingle();
  if (already) return NextResponse.json({ ok: true, already: true });

  const { error } = await db.from('reports').insert({
    target_type: type,
    target_id: String(id),
    reason: String(reason || '').trim().slice(0, 400) || null,
    reporter: me.id,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

/** Acting on one: hide what was reported, or decide there is nothing wrong. */
export async function PATCH(request) {
  const me = await currentProfile();
  if (!isAdmin(me)) return NextResponse.json({ error: 'admins only' }, { status: 403 });

  const { id, action } = await request.json();
  if (!id || !['remove', 'dismiss'].includes(action)) {
    return NextResponse.json({ error: 'bad action' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data: report } = await db.from('reports')
    .select('target_type, target_id').eq('id', id).maybeSingle();
  if (!report) return NextResponse.json({ error: 'لا بلاغ' }, { status: 404 });

  if (action === 'remove') {
    // Hidden, never deleted: a moderator must be able to look at what they
    // removed, and so must whoever asks them why.
    const table = report.target_type === 'comment' ? 'comments' : 'posts';
    await db.from(table).update({ removed: true }).eq('id', report.target_id);
  }

  const { error } = await db.from('reports')
    .update({ state: action === 'remove' ? 'actioned' : 'dismissed',
              handled_by: me.id, handled_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: me.id, action: `report_${action}`,
    target_type: report.target_type, target_id: report.target_id,
  });

  return NextResponse.json({ ok: true });
}
