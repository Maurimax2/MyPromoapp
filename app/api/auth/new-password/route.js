// The password a student chooses after signing in with a temporary one.
//
// A temporary password is set by staff (POST /api/admin/users with `reset`)
// and marks the account `must_change_pw`. The door sees the mark right after
// signing in and asks for a password of their own; this is where it lands.
// It is written with the server's key so the mark is cleared in the same call.

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getT } from '@/lib/lang';

export const runtime = 'nodejs';

export async function POST(request) {
  const t = await getT();
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: t('سجّل الدخول أولًا') }, { status: 401 });

  const { password } = await request.json().catch(() => ({}));
  if (String(password || '').length < 8) {
    return NextResponse.json({ error: t('8 أحرف على الأقل') }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { error } = await db.auth.admin.updateUserById(user.id, {
    password,
    app_metadata: { ...(user.app_metadata || {}), must_change_pw: false },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from('audit_log').insert({
    actor: user.id, action: 'password_changed', target_type: 'profile', target_id: user.id,
  });
  return NextResponse.json({ ok: true });
}
