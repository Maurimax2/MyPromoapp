// Letting someone in, or not.
//
// Approving is an admin's call, not an editor's — an editor maintains the
// catalogue, they do not decide who is in the promo. The promo itself is set
// here too: nobody types it at sign-up, and every screen filters by it, so an
// approved student without one would see an empty app.

import { NextResponse } from 'next/server';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const STATUS = ['pending', 'approved', 'refused'];
const ROLES = ['owner', 'admin', 'editor', 'marketing', 'student'];

export async function POST(request) {
  const me = await currentProfile();
  if (!isAdmin(me)) return NextResponse.json({ error: 'admins only' }, { status: 403 });

  const { id, status, promo, role } = await request.json();
  if (!id) return NextResponse.json({ error: 'no person' }, { status: 400 });
  if (status && !STATUS.includes(status)) return NextResponse.json({ error: 'bad status' }, { status: 400 });
  if (role && !ROLES.includes(role)) return NextResponse.json({ error: 'bad role' }, { status: 400 });

  // The one thing an admin may not do is take the owner's chair away, or
  // hand it out. There is one owner and it is not decided from a web form.
  if (role === 'owner' || (me.role !== 'owner' && id === me.id)) {
    return NextResponse.json({ error: 'غير مسموح' }, { status: 403 });
  }

  const db = supabaseAdmin();
  const { error } = await db.from('profiles').update({
    ...(status ? { status } : {}),
    ...(promo !== undefined ? { promo } : {}),
    ...(role ? { role } : {}),
    ...(status === 'approved' ? { approved_by: me.id, approved_at: new Date().toISOString() } : {}),
  }).eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: me.id,
    action: status ? `user_${status}` : role ? 'user_role' : 'user_promo',
    target_type: 'profile', target_id: id,
  });

  return NextResponse.json({ ok: true });
}
