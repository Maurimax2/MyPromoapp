// Letting someone in, or not.
//
// Approving is an admin's call, not an editor's — an editor maintains the
// catalogue, they do not decide who is in the promo. The promo itself is set
// here too: nobody types it at sign-up, and every screen filters by it, so an
// approved student without one would see an empty app.

import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { notify } from '@/lib/notify';

export const runtime = 'nodejs';

const STATUS = ['pending', 'approved', 'refused'];
const ROLES = ['owner', 'admin', 'editor', 'marketing', 'student'];

export async function POST(request) {
  const me = await currentProfile();
  if (!isAdmin(me)) return NextResponse.json({ error: 'admins only' }, { status: 403 });

  const { id, status, promo, role, reset } = await request.json();
  if (!id) return NextResponse.json({ error: 'no person' }, { status: 400 });

  if (reset) return temporaryPassword(me, id);
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

  // Waiting to be let in is the one thing worth being told about without
  // opening the app to check.
  if (status === 'approved') await notify({ person: id, actor: me.id, kind: 'approved' });

  return NextResponse.json({ ok: true });
}

// A forgotten password, answered.
//
// Nobody can read a password — Supabase keeps only a hash — so the answer is
// a new one: shown once to the admin, who sends it on WhatsApp, and marked
// `must_change_pw` so the door asks the student for one of their own right
// after they sign in with it. Letters that look alike (0/O, 1/l/I) are left
// out: it is read off one phone and typed into another.
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';

async function temporaryPassword(me, id) {
  const db = supabaseAdmin();
  const { data: who } = await db.from('profiles').select('role').eq('id', id).maybeSingle();
  if (!who) return NextResponse.json({ error: 'لا يوجد حساب' }, { status: 404 });
  // An admin answering for another member of staff could walk into their
  // account; only the owner may do that.
  if (who.role !== 'student' && me.role !== 'owner') {
    return NextResponse.json({ error: 'كلمة سر حسابات الفريق يغيّرها المالك فقط' }, { status: 403 });
  }

  const pick = randomBytes(10);
  const temp = [...pick].map((b) => ALPHABET[b % ALPHABET.length]).join('');

  const { data: got, error: readFail } = await db.auth.admin.getUserById(id);
  if (readFail) return NextResponse.json({ error: readFail.message }, { status: 500 });
  const { error } = await db.auth.admin.updateUserById(id, {
    password: temp,
    app_metadata: { ...(got?.user?.app_metadata || {}), must_change_pw: true },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: me.id, action: 'password_reset_done', target_type: 'profile', target_id: id,
  });
  return NextResponse.json({ ok: true, temp });
}
