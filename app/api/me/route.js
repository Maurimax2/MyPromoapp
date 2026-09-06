// Telling the app which year you are in.
//
// A student who signed up chose their year on the way in. A profile made by
// a magic link never did — that path knows an email address and nothing else
// — and a profile with no year cannot post, because every post belongs to a
// promo. It used to fail at the moment of posting, with a red line under the
// composer, which is the worst possible place to discover it.
//
// You may set it once. Changing it afterwards is an admin's job: a student
// who moves year takes their posts with them, and that is a decision, not a
// preference.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });
  if (me.promo) {
    return NextResponse.json({ error: 'سنتك محدَّدة — راجع مشرفًا لتغييرها' }, { status: 409 });
  }

  const { promo } = await request.json().catch(() => ({}));
  const db = supabaseAdmin();

  // Which years exist is a question for the database, not a constant.
  const { data: years } = await db.from('promos').select('id');
  if (!years?.some((p) => p.id === promo)) {
    return NextResponse.json({ error: 'اختر سنتك' }, { status: 400 });
  }

  const { error } = await db.from('profiles').update({ promo }).eq('id', me.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
