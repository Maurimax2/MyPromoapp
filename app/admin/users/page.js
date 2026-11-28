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

  const asks = await resetAsks();

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
      asks={asks}
      status={status}
      counts={counts}
      canAct={isAdmin(me)}
      meId={me?.id}
    />
  );
}

// «نسيت كلمة السر؟» requests still waiting: asked in the last two weeks and
// not answered since (an answer is a `password_reset_done` row, written when
// an admin makes the temporary password). See /api/auth/reset-request.
async function resetAsks() {
  const db = supabaseAdmin();
  const since = new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString();
  const { data: log } = await db.from('audit_log').select('action, target_id, at, detail')
    .in('action', ['password_reset_asked', 'password_reset_done'])
    .gte('at', since).order('at', { ascending: true }).limit(500);

  const open = new Map();
  for (const row of log || []) {
    if (row.action === 'password_reset_asked') open.set(row.target_id, row);
    else open.delete(row.target_id);
  }
  const ids = [...open.keys()];
  if (!ids.length) return [];

  const [{ data: who }, { data: phones }] = await Promise.all([
    db.from('profiles').select('id, email, full_name, promo, username, matricule, role').in('id', ids),
    db.from('profile_private').select('id, phone').in('id', ids),
  ]);
  const phoneOf = Object.fromEntries((phones || []).map((x) => [x.id, x.phone]));
  return (who || []).map((p) => ({
    id: p.id, email: p.email, full_name: p.full_name, promo: p.promo, role: p.role,
    username: p.username || null, matricule: p.matricule || null, phone: phoneOf[p.id] || null,
    at: open.get(p.id).at, typed: open.get(p.id).detail?.typed || null,
  })).sort((a, b) => (a.at < b.at ? 1 : -1));
}
