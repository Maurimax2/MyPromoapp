import { redirect } from 'next/navigation';
import { currentProfile, homeFor } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Opening the site lands on sign-in — unless you are already signed in, in
// which case it lands where you work.
export default async function Home() {
  const profile = await currentProfile();
  redirect(profile ? homeFor(profile) : '/login');
}
