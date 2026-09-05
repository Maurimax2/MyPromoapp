import Link from 'next/link';
import Icon from '@/components/Icon';
import Filling from './Filling';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const count = async (sb, table, filter) => {
  let q = sb.from(table).select('*', { count: 'exact', head: true });
  if (filter) q = filter(q);
  const { count: n } = await q;
  return n || 0;
};

export default async function AdminHome() {
  const sb = await supabaseServer();

  const [pending, needAnswer, drafts, published, documents] = await Promise.all([
    count(sb, 'profiles', (q) => q.eq('status', 'pending')),
    count(sb, 'questions', (q) => q.eq('status', 'needs_answer')),
    count(sb, 'questions', (q) => q.eq('status', 'draft')),
    count(sb, 'questions', (q) => q.eq('status', 'published')),
    count(sb, 'documents'),
  ]);

  const empty = documents === 0 && published === 0;

  return (
    <div className="admin-body">
      {empty && <Filling />}

      <div className="admin-grid">
        <Link href="/admin/users" className="admin-tile">
          <Icon name="user" size={19} />
          <b>{pending}</b>
          <span>طلب انضمام</span>
        </Link>
        <Link href="/admin/questions" className="admin-tile">
          <Icon name="quiz" size={19} />
          <b>{drafts + needAnswer}</b>
          <span>سؤال بانتظار المراجعة</span>
        </Link>
        <Link href="/admin/content" className="admin-tile">
          <Icon name="archive" size={19} />
          <b>{documents}</b>
          <span>ملف</span>
        </Link>
        <Link href="/admin/questions?status=published" className="admin-tile">
          <Icon name="check" size={19} />
          <b>{published}</b>
          <span>سؤال منشور</span>
        </Link>
      </div>

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
