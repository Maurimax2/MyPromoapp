import { redirect } from 'next/navigation';
import { currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { yearsForJoining } from '@/lib/catalogue';
import NewsScreen from './NewsScreen';

export const dynamic = 'force-dynamic';

// إعلان — one message, to every phone in the faculty or in one year.
export default async function NewsPage() {
  const me = await currentProfile();
  if (!isAdmin(me)) redirect('/admin');

  const db = supabaseAdmin();
  const [years, { data: past, error }] = await Promise.all([
    yearsForJoining(),
    db.from('announcements').select('id, title, body, promo, link, created_at')
      .order('created_at', { ascending: false }).limit(20),
  ]);

  return <NewsScreen years={years} past={past || []} ready={!error} />;
}
