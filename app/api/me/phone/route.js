// A first-year's WhatsApp number, for staff to check against the faculty's
// groups before approving. Kept in profile_private — the person and staff
// read it, classmates never do. Asked of first years only.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalisePhone, phoneError } from '@/lib/identity';

export const runtime = 'nodejs';

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  const { phone } = await request.json().catch(() => ({}));
  const number = normalisePhone(phone);
  const bad = phoneError(number);
  if (bad) return NextResponse.json({ error: bad }, { status: 400 });

  const db = supabaseAdmin();
  // Look first, then write: no ON CONFLICT against this schema.
  const { data: had, error: lookup } = await db.from('profile_private').select('id').eq('id', me.id).maybeSingle();
  if (lookup?.code === '42P01') {
    console.error('me/phone: profile_private is missing — paste supabase/accounts.sql');
    return NextResponse.json({ error: 'غير متاح الآن — راجع أحد المشرفين' }, { status: 503 });
  }
  if (lookup) return NextResponse.json({ error: lookup.message }, { status: 500 });

  const { error } = had
    ? await db.from('profile_private').update({ phone: number, updated_at: new Date().toISOString() }).eq('id', me.id)
    : await db.from('profile_private').insert({ id: me.id, phone: number });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
