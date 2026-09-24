import { supabaseServer, currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { promosOf } from '@/lib/catalogue';
import UsersScreen from './UsersScreen';

export const dynamic = 'force-dynamic';

export default async function UsersPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || 'pending';

  const sb = await supabaseServer();

  // All of it at once. These used to run one after another, so opening the
  // screen cost four round trips instead of one.
  const states = ['pending', 'approved', 'refused'];
  const [me, years, { data: people }, ...tallies] = await Promise.all([
    currentProfile(),
    // The years from the database, so PCEP1 and PCED1 can be given.
    promosOf(),
    sb.from('profiles')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(200),
    ...states.map((s) =>
      sb.from('profiles').select('*', { count: 'exact', head: true }).eq('status', s)),
  ]);

  // First-years' WhatsApp numbers, from the table classmates cannot read,
  // so the admin can check the number is in the faculty's groups.
  const ids = (people || []).map((p) => p.id);
  const { data: phones } = ids.length
    ? await supabaseAdmin().from('profile_private').select('id, phone').in('id', ids)
    : { data: [] };
  const phoneOf = Object.fromEntries((phones || []).map((x) => [x.id, x.phone]));

  const counts = {};
  states.forEach((s, i) => { counts[s] = tallies[i]?.count || 0; });

  return (
    <UsersScreen
      // The list is held in state so a row can be approved without a round
      // trip — which meant switching بانتظار → أعضاء changed the tab and left
      // the same people on screen. A different list is a different component.
      key={status}
      people={(people || []).map((p) => ({
        id: p.id, email: p.email, full_name: p.full_name, promo: p.promo, role: p.role,
        status: p.status, created_at: p.created_at, matricule: p.matricule || null,
        username: p.username || null, phone: phoneOf[p.id] || null,
      }))}
      years={years.promos}
      status={status}
      counts={counts}
      canAct={isAdmin(me)}
      meId={me?.id}
    />
  );
}
