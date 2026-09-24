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
//
// Everybody chooses a username. A first-year (PCEM1, PCEP1, PCED1) has no
// university number yet, so they give a WhatsApp number instead — kept in
// profile_private, where only they and staff can read it, so staff can check
// it is in the faculty's groups before approving.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalise, matriculeError, writeFailure } from '@/lib/matricule';
import {
  normaliseUsername, usernameError, normalisePhone, phoneError, isFirstYear,
} from '@/lib/identity';

export const runtime = 'nodejs';

const PROMOS = ['pcem1', 'pcem2', 'dcem1', 'dcem2', 'dcem3', 'dcem4'];

export async function POST(request) {
  const { email, password, full_name, promo, matricule, username, phone } = await request.json();

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

  const handle = normaliseUsername(username);
  const badName = usernameError(handle);
  if (badName) return NextResponse.json({ error: badName }, { status: 400 });

  const db = supabaseAdmin();

  // Which years exist is a question for the database, not a constant — the
  // panel can add one. Read with the year column when accounts.sql is in.
  let { data: years, error: yearsError } = await db.from('promos').select('id, year');
  if (yearsError) ({ data: years } = await db.from('promos').select('id'));
  const allowed = years?.length ? years.map((p) => p.id) : PROMOS;
  if (!allowed.includes(promo)) {
    return NextResponse.json({ error: 'اختر سنتك' }, { status: 400 });
  }
  const first = isFirstYear(years?.find((p) => p.id === promo) || promo);

  // The faculty's number: required from second year on, optional in the
  // first — a first-year who already has one may give it. Checked here as
  // well as in the browser, because it is unique for the whole school.
  const number = normalise(matricule);
  if (!first || number) {
    const wrong = matriculeError(number);
    if (wrong) return NextResponse.json({ error: wrong }, { status: 400 });
  }

  const whatsapp = normalisePhone(phone);
  if (first) {
    const badPhone = phoneError(whatsapp);
    if (badPhone) return NextResponse.json({ error: badPhone }, { status: 400 });
  }

  // Taken already? Asked before the account is made, so a clash costs the
  // student one retype instead of a half-made account.
  const { data: clash, error: clashError } = await db.from('profiles')
    .select('id').eq('username', handle).maybeSingle();
  if (!clashError && clash) {
    return NextResponse.json({ error: 'اسم المستخدم محجوز — اختر غيره' }, { status: 409 });
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

  const row = {
    id: made.user.id,
    email: address,
    full_name: String(full_name).trim(),
    promo,
    matricule: number || null,
    username: handle,
    role: 'student',
    status: 'pending',
  };
  let { error: profileError } = await db.from('profiles').insert(row);

  // A database that has not had accounts.sql pasted has no username column.
  // Sign-up must not close because a migration is late: the account is made
  // without it, and /waiting asks for it once the column exists.
  if (profileError?.code === '42703' && /username/.test(profileError.message)) {
    const { username: _later, ...without } = row;
    void _later;
    ({ error: profileError } = await db.from('profiles').insert(without));
  }

  // An auth user with no profile is a person who can sign in and then hit a
  // wall nobody can explain, so undo rather than leave that behind.
  if (profileError) {
    await db.auth.admin.deleteUser(made.user.id);
    if (profileError.code === '23505' && /username/.test(`${profileError.message} ${profileError.details || ''}`)) {
      return NextResponse.json({ error: 'اسم المستخدم محجوز — اختر غيره' }, { status: 409 });
    }
    // Classified by SQLSTATE, in one place shared with /api/me/matricule:
    // "somebody already holds that number" is a thing to tell the student,
    // and every other failure is a thing to tell us.
    const failed = writeFailure(profileError);
    if (failed.log) console.error('register:', failed.log);
    return NextResponse.json({ error: failed.error }, { status: failed.status });
  }

  if (first && whatsapp) {
    const { error: phoneFail } = await db.from('profile_private').insert({ id: made.user.id, phone: whatsapp });
    // The account stands either way — staff can still ask for the number —
    // but a missing table is a migration somebody has to run.
    if (phoneFail) console.error('register: WhatsApp number not kept —', phoneFail.message);
  }

  return NextResponse.json({ ok: true });
}
