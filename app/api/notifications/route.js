// What happened while you were away.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function GET() {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const db = supabaseAdmin();
  const [{ data: rows }, { count }] = await Promise.all([
    db.from('notifications')
      .select('id, kind, post, comment, body, created_at, seen, actor')
      .eq('person', me.id).order('created_at', { ascending: false }).limit(50),
    db.from('notifications')
      .select('id', { count: 'exact', head: true }).eq('person', me.id).eq('seen', false),
  ]);

  // The actors are fetched separately rather than embedded: `notifications`
  // points at `profiles` twice, so an embed has to be told which foreign key
  // it means, and one small query is easier to read than that.
  const ids = [...new Set((rows || []).map((r) => r.actor).filter(Boolean))];
  const { data: people } = ids.length
    ? await db.from('profiles').select('id, full_name, email').in('id', ids)
    : { data: [] };
  const named = Object.fromEntries((people || []).map((p) => [p.id, p]));

  return NextResponse.json({
    items: (rows || []).map((r) => ({ ...r, actor: named[r.actor] || null })),
    unseen: count || 0,
  });
}

// Marking them read. Opening the screen clears the count — a badge you
// cannot clear is a badge you learn to ignore.
export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { id } = await request.json().catch(() => ({}));
  const db = supabaseAdmin();
  let q = db.from('notifications').update({ seen: true }).eq('person', me.id);
  q = id ? q.eq('id', id) : q.eq('seen', false);

  const { error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
