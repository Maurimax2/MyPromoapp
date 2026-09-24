import { currentProfile, homeFor } from '@/lib/supabase/server';
import { syncStaffRole } from '@/lib/supabase/admin';
import { yearsForJoining } from '@/lib/catalogue';
import LoginForm from './LoginForm';
import SignedIn from './SignedIn';

export const dynamic = 'force-dynamic';

// The front door, both ways. A stranger gets the email form; somebody whose
// session is still alive gets told so, by name, and walks through — rather
// than being asked again for an email they have already given, or bounced
// past the door so fast they cannot see it exists.
export default async function Login() {
  const profile = await syncStaffRole(await currentProfile());
  if (profile) return <SignedIn profile={profile} home={homeFor(profile)} />;
  // The years from the database, so PCEP1 and PCED1 — or a year the panel
  // adds tomorrow — can be chosen at sign-up the day they exist.
  return <LoginForm years={await yearsForJoining()} />;
}
