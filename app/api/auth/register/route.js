// Making an account.
//
// Supabase's own sign-up sends a confirmation email, and the built-in mailer
// allows a couple an hour — which is fine for nobody. So the account is made
// here with the service key, already confirmed, and the student signs in with
// their password straight away.
//
// This is safe because confirming an email was never the gate. The gate is
// `status`: a new profile is `pending`, and every policy in the schema is
// written against is_approved(), so until a member of staff approves them a
// new account can read nothing at all.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const PROMOS = ['pcem1', 'pcem2', 'dcem1', 'dcem2', 'dcem3', 'dcem4'];

export async function POST(request) {
  const { email, password, full_name, promo } = await request.json();

  const address = String(email || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address)) {
    return NextResponse.json({ error: 'عنوان بريد غير صالح' }, { status: 400 });
  }
  if (String(password || '').length < 8) {
    return NextResponse.json({ error: 'كلمة السر: 8 أحرف على الأقل' }, { status: 400 });
  }
  if (!String(full_name || '').trim()) {
    return NextResponse.json({ error: 'اكتب اسمك' }, { status: 400 });
  }

  const db = supabaseAdmin();

  // Which years exist is a question for the database, not a constant — the
  // panel can add one.
  const { data: years } = await db.from('promos').select('id');
  const allowed = years?.length ? years.map((p) => p.id) : PROMOS;
  if (!allowed.includes(promo)) {
    return NextResponse.json({ error: 'اختر سنتك' }, { status: 400 });
  }

  const { data: made, error } = await db.auth.admin.createUser({
    email: address,
    password,
    email_confirm: true,
    user_metadata: { full_name: String(full_name).trim() },
  });

  if (error) {
    const taken = /already|registered|exists/i.test(error.message);
    return NextResponse.json(
      { error: taken ? 'هذا البريد مسجَّل بالفعل — سجّل الدخول' : error.message },
      { status: taken ? 409 : 500 });
  }

  const { error: profileError } = await db.from('profiles').insert({
    id: made.user.id,
    email: address,
    full_name: String(full_name).trim(),
    promo,
    role: 'student',
    status: 'pending',
  });

  // An auth user with no profile is a person who can sign in and then hit a
  // wall nobody can explain, so undo rather than leave that behind.
  if (profileError) {
    await db.auth.admin.deleteUser(made.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
