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
  const { data: rows } = await db.from('notifications')
    .select('id, kind, post, comment, body, created_at, seen, actor')
    .eq('person', me.id).order('created_at', { ascending: false }).limit(50);

  const ids = [...new Set((rows || []).map((r) => r.actor).filter(Boolean))];
  const { data: people } = ids.length
    ? await db.from('profiles').select('id, full_name, email').in('id', ids)
    : { data: [] };
  const named = Object.fromEntries((people || []).map((p) => [p.id, p]));

  return (
    <Notifications
      items={(rows || []).map((r) => ({ ...r, actor: named[r.actor] || null }))}
    />
  );
}
