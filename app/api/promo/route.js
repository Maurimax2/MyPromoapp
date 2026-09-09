// Choosing which year's material to read.
//
// A cookie, not a column: this is not a change to who the student is. Their
// promo is what their feed is and what they may post into, and tapping a menu
// must never quietly move them out of their own year.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { PROMO_COOKIE } from '@/lib/promo';

export const runtime = 'nodejs';

export async function POST(request) {
  const { promo } = await request.json().catch(() => ({}));
  const want = String(promo || '').trim();
  if (!want) return NextResponse.json({ error: 'أيّ سنة؟' }, { status: 400 });

  // Asked of the database rather than checked against a list written here:
  // the panel can add a year, and a year it added must be choosable the same
  // day without anybody editing a file.
  const { data: known, error } = await supabaseAdmin()
    .from('promos').select('id').eq('id', want).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!known) return NextResponse.json({ error: 'لا سنة بهذا الاسم' }, { status: 404 });

  const res = NextResponse.json({ ok: true, promo: want });
  res.cookies.set(PROMO_COOKIE, want, {
    path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
