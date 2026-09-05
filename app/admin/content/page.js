import Link from 'next/link';
import Icon from '@/components/Icon';
import { supabaseServer, currentProfile, isAdmin } from '@/lib/supabase/server';
import ContentScreen from './ContentScreen';

export const dynamic = 'force-dynamic';

// No module chosen yet: the modules themselves, with how many files each
// holds. It is the fastest way to see that something never got imported.
async function ModulePicker({ sb }) {
  const { data: modules } = await sb
    .from('modules').select('id, name, semester, tint').order('position');

  const counts = {};
  for (const m of modules || []) {
    const { count } = await sb.from('documents')
      .select('*', { count: 'exact', head: true }).eq('module', m.id);
    counts[m.id] = count || 0;
  }

  if (!modules?.length) {
    return (
      <div className="admin-body">
        <section className="admin-card admin-seed">
          <div className="admin-card-t">لا مواد بعد</div>
          <p className="admin-card-b">انقل المحتوى إلى قاعدة البيانات من الصفحة الرئيسية أولًا.</p>
          <Link href="/admin" className="btn g">الرئيسية</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <div className="admin-bar"><span>المواد</span><span>{modules.length}</span></div>
      <div className="admin-rows">
        {modules.map((m) => (
          <Link key={m.id} href={`/admin/content?module=${m.id}`} className="ctm">
            <div className="grow">
              <div className="ctm-t">{m.name}</div>
              <div className="ctm-b">{m.semester} · {counts[m.id]} ملف</div>
            </div>
            <Icon name="chev" size={18} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function ContentPage({ searchParams }) {
  const params = await searchParams;
  const moduleId = params?.module || null;
  const where = params?.where || 'archive';

  const sb = await supabaseServer();
  if (!moduleId) return <ModulePicker sb={sb} />;

  const me = await currentProfile();

  const [{ data: module }, { data: documents }] = await Promise.all([
    sb.from('modules').select('id, name, semester').eq('id', moduleId).single(),
    sb.from('documents')
      .select('id, title, n, where_shown, section, ext, bytes, prof, year, published, drive_id')
      .eq('module', moduleId).eq('where_shown', where)
      .order('position').limit(400),
  ]);

  const counts = {};
  for (const w of ['archive', 'notes', 'quiz']) {
    const { count } = await sb.from('documents')
      .select('*', { count: 'exact', head: true }).eq('module', moduleId).eq('where_shown', w);
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
