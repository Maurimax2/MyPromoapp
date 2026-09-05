import { supabaseServer, currentProfile, isAdmin } from '@/lib/supabase/server';
import UsersScreen from './UsersScreen';

export const dynamic = 'force-dynamic';

export default async function UsersPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || 'pending';

  const sb = await supabaseServer();

  // All of it at once. These used to run one after another, so opening the
  // screen cost four round trips instead of one.
  const states = ['pending', 'approved', 'refused'];
  const [me, { data: people }, ...tallies] = await Promise.all([
    currentProfile(),
    sb.from('profiles')
      .select('id, email, full_name, promo, role, status, created_at')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(200),
    ...states.map((s) =>
      sb.from('profiles').select('*', { count: 'exact', head: true }).eq('status', s)),
  ]);

  const counts = {};
  states.forEach((s, i) => { counts[s] = tallies[i]?.count || 0; });

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
