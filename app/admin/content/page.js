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

    // A subject the database does not have. It happens: a stale link, a
    // subject deleted in another tab, a typed address. Say so — the screen
    // used to render around a missing subject with an empty header and a
    // back button that went nowhere.
    if (!module) {
      return (
        <div className="admin-body">
          <section className="admin-card admin-seed">
            <div className="admin-card-t">لا توجد هذه المادة</div>
            <p className="admin-card-b">ربما حُذفت، أو الرابط قديم.</p>
            <Link className="btn p" href="/admin/content">كل المواد</Link>
          </section>
        </div>
      );
    }

    return (
      <ContentScreen
        // The list lives in state inside there, so that it can be edited
        // without a round trip. State survives a re-render, which meant
        // switching from الأرشيف to اختبر نفسك changed the address and the
        // counts and left the same files on screen. The key makes a different
        // list a different component.
        key={`${module.id}:${where}`}
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
    const [me, { data: promo }, { data: modules }] = await Promise.all([
      currentProfile(),
      sb.from('promos').select('id, name, label').eq('id', params.promo).single(),
      sb.from('modules').select('id, name, semester').eq('promo', params.promo).order('position'),
    ]);

    const list = modules || [];
    const tallies = await Promise.all(list.map((m) =>
      sb.from('documents').select('*', { count: 'exact', head: true }).eq('module', m.id)));

    const files = {};
    list.forEach((m, i) => { files[m.id] = tallies[i]?.count || 0; });

    // One question's parent bank names its module, not a column on the
    // question itself — so a subject's MCQ count is not a column filter but a
    // join. Fetching every bank in this year and every question in those
    // banks, once each, and tallying in JS is one round trip for the lot
    // rather than a query per subject.
    const mcqs = {};
    list.forEach((m) => { mcqs[m.id] = 0; });
    const banks = [];
    for (let from = 0; ; ) {
      const { data: page } = await sb.from('question_banks')
        .select('id, module').in('module', list.map((m) => m.id))
        .order('id').range(from, from + 999);
      if (!page || !page.length) break;
      banks.push(...page);
      from += page.length;
    }
    const bankIds = (banks || []).map((b) => b.id);
    if (bankIds.length) {
      const bankModule = new Map(banks.map((b) => [b.id, b.module]));
      // Paged, and the banks named a slice at a time: the server answers at
      // most a thousand rows, so a year holding nine thousand questions was
      // counted as a thousand, spread over whichever subjects came first.
      for (let i = 0; i < bankIds.length; i += 150) {
        const slice = bankIds.slice(i, i + 150);
        for (let from = 0; ; ) {
          const { data: qrows } = await sb.from('questions')
            .select('bank').in('bank', slice).neq('status', 'rejected')
            .order('id').range(from, from + 999);
          if (!qrows || !qrows.length) break;
          for (const q of qrows) {
            const mod = bankModule.get(q.bank);
            if (mod && mcqs[mod] !== undefined) mcqs[mod] += 1;
          }
          from += qrows.length;
        }
      }
    }

    return <ModuleScreen promo={promo || { id: params.promo, name: params.promo }}
                         modules={list} files={files} mcqs={mcqs} canDelete={isAdmin(me)} />;
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

  return <PromoScreen promos={list} subjects={subjects} files={files}
                      canDelete={isAdmin(await currentProfile())} />;
}
