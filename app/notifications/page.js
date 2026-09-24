import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import Notifications from './Notifications';

export const dynamic = 'force-dynamic';

// الإشعارات — the bell had nowhere to go.
export default async function NotificationsPage() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const db = supabaseAdmin();
  const mine = (cols) => db.from('notifications').select(cols)
    .eq('person', me.id).order('created_at', { ascending: false }).limit(50);
  // `link` and `announcement` come with push.sql; before it is pasted the
  // bell reads what it always read.
  let { data: rows, error } = await mine('id, kind, post, comment, body, created_at, seen, actor, link, announcement');
  if (error) ({ data: rows } = await mine('id, kind, post, comment, body, created_at, seen, actor'));

  // An announcement's row carries its title; the words are on the announcement.
  const news = [...new Set((rows || []).map((r) => r.announcement).filter(Boolean))];
  const { data: said } = news.length
    ? await db.from('announcements').select('id, title, body').in('id', news)
    : { data: [] };
  const byNews = Object.fromEntries((said || []).map((a) => [a.id, a]));

  const ids = [...new Set((rows || []).map((r) => r.actor).filter(Boolean))];
  const { data: people } = ids.length
    ? await db.from('profiles').select('id, full_name, email').in('id', ids)
    : { data: [] };
  const named = Object.fromEntries((people || []).map((p) => [p.id, p]));

  return (
    <Notifications
      items={(rows || []).map((r) => ({
        ...r,
        actor: named[r.actor] || null,
        news: r.announcement ? byNews[r.announcement] || null : null,
      }))}
    />
  );
}
