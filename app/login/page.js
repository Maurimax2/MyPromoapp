import { redirect } from 'next/navigation';
import { currentProfile, homeFor } from '@/lib/supabase/server';
import { syncStaffRole } from '@/lib/supabase/admin';
import { yearsForJoining } from '@/lib/catalogue';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

// The front door. A stranger gets the form; somebody whose session is still
// alive is not shown a door at all — they go straight in. It used to stop them
// with «أنت داخل بالفعل» and a button, which is a screen whose only job is to
// say "you did nothing wrong, now tap again".
export default async function Login() {
  const profile = await syncStaffRole(await currentProfile());
  if (profile) redirect(homeFor(profile));
  // The years from the database, so PCEP1 and PCED1 — or a year the panel
  // adds tomorrow — can be chosen at sign-up the day they exist.
  return <LoginForm years={await yearsForJoining()} />;
}
