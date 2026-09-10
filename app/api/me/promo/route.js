// Saying which year you are in, once.
//
// Sign-up asks for it, so almost nobody arrives here. The people who do came
// in through a door that never asked: an emailed link, or an account made in
// Supabase's dashboard. Their profile carries no promo, and a promo is not
// decoration — every policy in social.sql compares against my_promo(), and
// `promo = NULL` is never true, so a student without one reads an empty feed,
// is refused at the composer, and nothing on either screen says why.
//
// It sets the column only while it is empty. Changing years afterwards is an
// admin's call, not a student's: the alternative is a student moving into
// DCEM1 the week of the exam to read its feed.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  if (me.promo) {
    return NextResponse.json(
      { error: 'سنتك محدَّدة — راجع أحد المشرفين لتغييرها' }, { status: 409 });
  }

  const { promo } = await request.json().catch(() => ({}));
  const want = String(promo || '').trim();
  if (!want) return NextResponse.json({ error: 'اختر سنتك' }, { status: 400 });

  const db = supabaseAdmin();

  // Which years exist is the database's answer, not a list written here: the
  // panel can add one, and it must be choosable the same day.
  const { data: known, error: lookupError } = await db
    .from('promos').select('id').eq('id', want).maybeSingle();
  if (lookupError) {
    return NextResponse.json({ error: lookupError.message }, { status: 500 });
  }
  if (!known) return NextResponse.json({ error: 'لا سنة بهذا الاسم' }, { status: 404 });

  // `is('promo', null)` and not just the id: two tabs, or a tap while an
  // admin is setting it from the panel, must not race into a second answer.
  const { data: saved, error } = await db.from('profiles')
    .update({ promo: want }).eq('id', me.id).is('promo', null)
    .select('promo').maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!saved) {
    return NextResponse.json(
      { error: 'سنتك محدَّدة — راجع أحد المشرفين لتغييرها' }, { status: 409 });
  }

  await db.from('audit_log').insert({
    actor: me.id,
    action: 'user_promo_self',
    target_type: 'profile', target_id: me.id,
  });

  return NextResponse.json({ ok: true, promo: saved.promo });
}
