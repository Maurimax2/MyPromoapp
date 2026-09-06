import Link from 'next/link';
import Icon from '@/components/Icon';
import Filling from './Filling';
import Settings from './Settings';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// A count that cannot be read comes back as a number anyway, and zero is a
// perfectly believable number — which is how "the database refused me" spent
// a morning looking like "there is nothing here". The error comes back too.
const count = async (sb, table, filter) => {
  let q = sb.from(table).select('*', { count: 'exact', head: true });
  if (filter) q = filter(q);
  const { count: n, error } = await q;
  return { n: n || 0, error: error?.message || null };
};

export default async function AdminHome() {
  const sb = await supabaseServer();

  const [pending, needAnswer, drafts, published, documents, reports] = await Promise.all([
    count(sb, 'profiles', (q) => q.eq('status', 'pending')),
    count(sb, 'questions', (q) => q.eq('status', 'needs_answer')),
    count(sb, 'questions', (q) => q.eq('status', 'draft')),
    count(sb, 'questions', (q) => q.eq('status', 'published')),
    count(sb, 'documents'),
    count(sb, 'reports', (q) => q.eq('state', 'open')),
  ]);

  const failed = [pending, needAnswer, drafts, published, documents, reports]
    .map((c) => c.error).filter(Boolean);
  const empty = documents.n === 0 && published.n === 0 && !failed.length;

  return (
    <div className="admin-body">
      <Settings />

      {/* If a count could not be read, say so rather than printing a zero
          that reads as "nothing here yet". */}
      {failed.length > 0 && (
        <div className="admin-err">تعذّرت قراءة الأرقام — {failed[0]}</div>
      )}

      {empty && <Filling />}

      <div className="admin-grid">
        <Link href="/admin/users" className="admin-tile">
          <Icon name="user" size={19} />
          <b>{pending.n}</b>
          <span>طلب انضمام</span>
        </Link>
        <Link href="/admin/questions" className="admin-tile">
          <Icon name="quiz" size={19} />
          <b>{drafts.n + needAnswer.n}</b>
          <span>سؤال بانتظار المراجعة</span>
        </Link>
        <Link href="/admin/content" className="admin-tile">
          <Icon name="archive" size={19} />
          <b>{documents.n}</b>
          <span>ملف</span>
        </Link>
        <Link href="/admin/questions?status=published" className="admin-tile">
          <Icon name="check" size={19} />
          <b>{published.n}</b>
          <span>سؤال منشور</span>
        </Link>
      </div>

      {reports.n > 0 && (
        <Link href="/admin/reports" className="admin-card admin-import">
          <div className="admin-import-ic" style={{ background: 'var(--wrong)' }}>
            <Icon name="alert" size={22} />
          </div>
          <div className="grow">
            <div className="admin-card-t">{reports.n} بلاغ بانتظار المراجعة</div>
            <div className="admin-card-b">محتوى اعترض عليه طالب</div>
          </div>
          <Icon name="chev" size={18} />
        </Link>
      )}

      <Link href="/admin/import" className="admin-card admin-import">
        <div className="admin-import-ic"><Icon name="plus" size={22} /></div>
        <div className="grow">
          <div className="admin-card-t">استيراد من Drive</div>
          <div className="admin-card-b">
            الصق رابط مجلد — يقرأ الملفات، يستخرج الأسئلة، ويعرضها للمراجعة
          </div>
        </div>
        <Icon name="chev" size={18} />
      </Link>
    </div>
  );
}
