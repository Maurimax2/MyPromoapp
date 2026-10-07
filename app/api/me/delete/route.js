// Delete my account.
//
//   POST { confirm: true }   the signed-in person, and everything of theirs
//
// Google Play requires that a student can do this from inside the app.
//
// Deleting the auth user is what removes them: profiles, posts, comments,
// messages, points, devices and settings all hang off it `on delete cascade`.
// The exceptions are the few columns that only *name* somebody — who approved
// an account, who wrote a summary or a question, who reported something — and
// have no cascade. Those would stop the delete with a foreign-key error, so
// they are cleared first. A summary or question a student shared stays for
// the promo, but is no longer tied to a person.
//
// The owner is refused: an owner who deletes themselves leaves a panel with
// nobody to open it.

import { NextResponse } from 'next/server';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getT } from '@/lib/lang';

export const runtime = 'nodejs';

const NAMES = [
  ['profiles', ['approved_by']],
  ['documents', ['created_by']],
  ['questions', ['created_by', 'reviewed_by']],
  ['import_jobs', ['created_by']],
  ['reports', ['reporter', 'handled_by']],
  ['audit_log', ['actor']],
];

export async function POST(request) {
  const t = await getT();
  const me = await currentProfile();
  if (!me) return NextResponse.json({ error: t('سجّل الدخول') }, { status: 401 });

  const { confirm } = await request.json().catch(() => ({}));
  if (confirm !== true) return NextResponse.json({ error: t('لم يتم التأكيد') }, { status: 400 });

  if (me.role === 'owner') {
    return NextResponse.json({ error: t('حساب المالك لا يُحذف من هنا') }, { status: 403 });
  }

  const db = supabaseAdmin();

  for (const [table, columns] of NAMES) {
    for (const column of columns) {
      const { error } = await db.from(table).update({ [column]: null }).eq(column, me.id);
      if (error) {
        return NextResponse.json({ error: t('تعذّر حذف الحساب، حاول لاحقًا') }, { status: 500 });
      }
    }
  }

  const { error } = await db.auth.admin.deleteUser(me.id);
  if (error) return NextResponse.json({ error: t('تعذّر حذف الحساب، حاول لاحقًا') }, { status: 500 });

  const res = NextResponse.json({ ok: true });
  try { await (await supabaseServer()).auth.signOut(); } catch { /* the account is already gone */ }
  res.cookies.delete('mp-pass');
  res.cookies.delete('mp-push');
  return res;
}
