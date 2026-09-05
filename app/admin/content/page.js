import Link from 'next/link';
import Icon from '@/components/Icon';
import { supabaseServer, currentProfile, isAdmin } from '@/lib/supabase/server';
import PromoScreen from './PromoScreen';
import ModuleScreen from './ModuleScreen';
import ContentScreen from './ContentScreen';

export const dynamic = 'force-dynamic';

// Three depths, one route. The years, then a year's subjects, then a
// subject's files — `?promo=` and `?module=` say how deep you are.
//
// Every count here used to be its own awaited query inside a for-loop: the
// years page alone made thirteen round trips in a row, which on a phone is
// seconds of nothing happening. Counts that must be separate queries are
// fired together; counts that can be tallied from rows we already have are.
export default async function ContentPage({ searchParams }) {
  const params = await searchParams;
  const sb = await supabaseServer();

  // ---- a subject's files -------------------------------------------------
  if (params?.module) {
    const where = params.where || 'archive';

    // One query for the subject's whole catalogue; the three tab counts come
    // out of the same rows rather than three more trips.
    const [me, { data: module }, { data: all }] = await Promise.all([
      currentProfile(),
      sb.from('modules').select('id, name, semester, promo').eq('id', params.module).single(),
      sb.from('documents')
        .select('id, title, n, where_shown, section, ext, bytes, prof, year, published, drive_id, position')
        .eq('module', params.module).order('position').limit(1000),
    ]);

    const rows = all || [];
    const counts = { archive: 0, notes: 0, quiz: 0 };
    for (const d of rows) if (counts[d.where_shown] !== undefined) counts[d.where_shown] += 1;

    return (
      <ContentScreen
        module={module}
        documents={rows.filter((d) => d.where_shown === where)}
        where={where}
        counts={counts}
        canDelete={isAdmin(me)}
      />
    );
  }

  // ---- one year's subjects ----------------------------------------------
  if (params?.promo) {
    const [{ data: promo }, { data: modules }] = await Promise.all([
      sb.from('promos').select('id, name, label').eq('id', params.promo).single(),
      sb.from('modules').select('id, name, semester').eq('promo', params.promo).order('position'),
    ]);

    const list = modules || [];
    const tallies = await Promise.all(list.map((m) =>
      sb.from('documents').select('*', { count: 'exact', head: true }).eq('module', m.id)));

    const files = {};
    list.forEach((m, i) => { files[m.id] = tallies[i]?.count || 0; });

    return <ModuleScreen promo={promo || { id: params.promo, name: params.promo }}
                         modules={list} files={files} />;
  }

  // ---- the six years -----------------------------------------------------
  const [{ data: promos }, { data: mods }] = await Promise.all([
    sb.from('promos').select('id, name, label, badge, indexed').order('position'),
    sb.from('modules').select('id, promo'),
  ]);

  const byPromo = new Map();
  for (const m of mods || []) {
    if (!byPromo.has(m.promo)) byPromo.set(m.promo, []);
    byPromo.get(m.promo).push(m.id);
  }

  const list = promos || [];
  const tallies = await Promise.all(list.map((p) => {
    const ids = byPromo.get(p.id) || [];
    if (!ids.length) return Promise.resolve({ count: 0 });
    return sb.from('documents').select('*', { count: 'exact', head: true }).in('module', ids);
  }));

  const subjects = {};
  const files = {};
  list.forEach((p, i) => {
    subjects[p.id] = (byPromo.get(p.id) || []).length;
    files[p.id] = tallies[i]?.count || 0;
  });

  return <PromoScreen promos={list} subjects={subjects} files={files} />;
}
