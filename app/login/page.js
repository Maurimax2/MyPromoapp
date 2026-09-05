import { redirect } from 'next/navigation';
import { currentProfile, homeFor } from '@/lib/supabase/server';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

// Somebody already signed in has no business on the sign-in screen; send them
// where they belong instead of asking for an email they have already given.
export default async function Login() {
  const profile = await currentProfile();
  if (profile) redirect(homeFor(profile));
  return <LoginForm />;
}
