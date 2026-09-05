import { supabaseServer, currentProfile, isAdmin } from '@/lib/supabase/server';
import PromoScreen from './PromoScreen';
import ModuleScreen from './ModuleScreen';
import ContentScreen from './ContentScreen';

export const dynamic = 'force-dynamic';

// Three depths, one route. The years, then a year's subjects, then a
// subject's files — `?promo=` and `?module=` say how deep you are.
export default async function ContentPage({ searchParams }) {
  const params = await searchParams;
  const sb = await supabaseServer();

  // ---- a subject's files -------------------------------------------------
  if (params?.module) {
    const where = params.where || 'archive';
    const me = await currentProfile();

    const [{ data: module }, { data: documents }] = await Promise.all([
      sb.from('modules').select('id, name, semester, promo').eq('id', params.module).single(),
      sb.from('documents')
        .select('id, title, n, where_shown, section, ext, bytes, prof, year, published, drive_id')
        .eq('module', params.module).eq('where_shown', where)
        .order('position').limit(400),
    ]);

    const counts = {};
    for (const w of ['archive', 'notes', 'quiz']) {
      const { count } = await sb.from('documents')
        .select('*', { count: 'exact', head: true })
        .eq('module', params.module).eq('where_shown', w);
      counts[w] = count || 0;
    }

    return (
      <ContentScreen
        module={module}
        documents={documents || []}
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

    const files = {};
    for (const m of modules || []) {
      const { count } = await sb.from('documents')
        .select('*', { count: 'exact', head: true }).eq('module', m.id);
      files[m.id] = count || 0;
    }

    return <ModuleScreen promo={promo || { id: params.promo, name: params.promo }}
                         modules={modules || []} files={files} />;
  }

  // ---- the six years -----------------------------------------------------
  const { data: promos } = await sb
    .from('promos').select('id, name, label, badge, indexed').order('position');

  const subjects = {};
  const files = {};
  for (const p of promos || []) {
    const { data: mods } = await sb.from('modules').select('id').eq('promo', p.id);
    subjects[p.id] = mods?.length || 0;
    if (mods?.length) {
      const { count } = await sb.from('documents')
        .select('*', { count: 'exact', head: true })
        .in('module', mods.map((m) => m.id));
      files[p.id] = count || 0;
    } else files[p.id] = 0;
  }

  return <PromoScreen promos={promos || []} subjects={subjects} files={files} />;
}
