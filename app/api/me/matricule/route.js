// Claiming the number the faculty gave you.
//
// Sign-up asks for it. The people who reach this came in before the column
// existed, or through the emailed link back when it still made accounts.
//
// Set once, like the year: the number identifies a student to the whole
// school, and a student who can edit it can walk into somebody else's
// identity. Changing it afterwards is an admin's call, and an admin has the
// faculty's list in front of them.

import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalise, matriculeError } from '@/lib/matricule';

export const runtime = 'nodejs';

const TAKEN = 'هذا الرقم الجامعي مسجَّل بالفعل';

export async function POST(request) {
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: 'سجّل الدخول' }, { status: 401 });

  if (me.matricule) {
    return NextResponse.json(
      { error: 'رقمك مسجَّل — راجع أحد المشرفين لتغييره' }, { status: 409 });
  }

  const { matricule } = await request.json().catch(() => ({}));
  const number = normalise(matricule);
  const wrong = matriculeError(number);
  if (wrong) return NextResponse.json({ error: wrong }, { status: 400 });

  // `is('matricule', null)` guards the same race the year does: two tabs, or
  // a tap while an admin is filling it in from the panel.
  const { data: saved, error } = await supabaseAdmin().from('profiles')
    .update({ matricule: number }).eq('id', me.id).is('matricule', null)
    .select('matricule').maybeSingle();

  if (error) {
    // The unique index doing its job: somebody already holds that number.
    const taken = error.code === '23505' || /duplicate key/i.test(error.message || '');
    return NextResponse.json({ error: taken ? TAKEN : error.message },
      { status: taken ? 409 : 500 });
  }
  if (!saved) {
    return NextResponse.json(
      { error: 'رقمك مسجَّل — راجع أحد المشرفين لتغييره' }, { status: 409 });
  }

  return NextResponse.json({ ok: true, matricule: saved.matricule });
}
