import { redirect } from 'next/navigation';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { activityStats } from '@/lib/activity-stats';
import ActivityScreen from './ActivityScreen';

export const dynamic = 'force-dynamic';

// النشاط — who has the app open right now, doing what, and how many have ever
// opened it, by year.
export default async function ActivityPage() {
  const me = await currentProfile();
  if (!isAdmin(me)) redirect('/admin');
  return <ActivityScreen initial={await activityStats()} />;
}
