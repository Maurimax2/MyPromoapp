import { supabaseServer, currentProfile, isAdmin } from '@/lib/supabase/server';
import UsersScreen from './UsersScreen';

export const dynamic = 'force-dynamic';

export default async function UsersPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || 'pending';

  const me = await currentProfile();
  const sb = await supabaseServer();

  const { data: people } = await sb
    .from('profiles')
    .select('id, email, full_name, promo, role, status, created_at')
    .eq('status', status)
    .order('created_at', { ascending: false })
    .limit(200);

  const counts = {};
  for (const s of ['pending', 'approved', 'refused']) {
    const { count } = await sb.from('profiles')
      .select('*', { count: 'exact', head: true }).eq('status', s);
    counts[s] = count || 0;
  }

  return (
    <UsersScreen
      people={people || []}
      status={status}
      counts={counts}
      canAct={isAdmin(me)}
      meId={me?.id}
    />
  );
}
