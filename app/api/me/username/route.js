// Choosing a username — once, from /waiting, for an account that came in
// through a door that did not ask (Google, an emailed link, an account made
// before usernames existed). Changing it later is not offered yet: it is how
// classmates find you, and a name that moves is a name nobody can find.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normaliseUsername, usernameError } from '@/lib/identity';

export const runtime = 'nodejs';

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });
  if (me.username) return NextResponse.json({ error: 'لديك اسم مستخدم بالفعل' }, { status: 409 });

  const { username } = await request.json().catch(() => ({}));
  const handle = normaliseUsername(username);
  const bad = usernameError(handle);
  if (bad) return NextResponse.json({ error: bad }, { status: 400 });

  const db = supabaseAdmin();
  const { data: saved, error } = await db.from('profiles')
    .update({ username: handle }).eq('id', me.id).is('username', null)
    .select('username').maybeSingle();

  if (error?.code === '23505') {
    return NextResponse.json({ error: 'اسم المستخدم محجوز — اختر غيره' }, { status: 409 });
  }
  if (error?.code === '42703') {
    console.error('me/username: profiles.username is missing — paste supabase/accounts.sql');
    return NextResponse.json({ error: 'غير متاح الآن — راجع أحد المشرفين' }, { status: 503 });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!saved) return NextResponse.json({ error: 'لديك اسم مستخدم بالفعل' }, { status: 409 });

  return NextResponse.json({ ok: true, username: handle });
}
