// May this request touch the panel's data?
//
// The check used to be one line in each route — `isStaff(currentProfile())` —
// and it answered "staff only" to every possible reason: no session, a
// session we could not read, a real student, or a member of staff whose row
// still said `student`. Four different problems, one message, printed in
// English on an Arabic screen.
//
// It also missed what the panel's own layout does: bring the role in line
// with ADMIN_EMAILS. So somebody could be looking at the panel — the layout
// let them in and upgraded them — while every request the page made was
// refused.

import { currentProfile, isStaff } from '@/lib/supabase/server';
import { syncStaffRole } from '@/lib/supabase/admin';

/**
 * @returns {{profile: object} | {error: string, status: number}}
 */
export async function requireStaff() {
  const profile = await syncStaffRole(await currentProfile());

  if (!profile) {
    return { error: 'انتهت جلستك — سجّل الدخول من جديد', status: 401 };
  }
  if (!isStaff(profile)) {
    return {
      error: `هذا الحساب ليس من الطاقم — ${profile.email} · ${profile.role}`,
      status: 403,
    };
  }
  return { profile };
}
