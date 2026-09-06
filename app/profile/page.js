import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { supabaseServer, currentProfile, isStaff } from '@/lib/supabase/server';
import { promoById } from '@/lib/data';
import Sign from './Sign';

export const dynamic = 'force-dynamic';

const ROLE = {
  owner: 'مالك', admin: 'مشرف', editor: 'محرّر',
  marketing: 'تسويق', student: 'طالب',
};

export default async function Profile() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const sb = await supabaseServer();

  // Real numbers, or none at all — an invented "12 saved" is worse than a 0.
  const [posts, saves, answers, rooms] = await Promise.all([
    sb.from('posts').select('*', { count: 'exact', head: true })
      .eq('author', me.id).eq('removed', false),
    sb.from('saves').select('*', { count: 'exact', head: true }).eq('person', me.id),
    sb.from('comments').select('*', { count: 'exact', head: true })
      .eq('author', me.id).eq('accepted', true),
    sb.from('room_members').select('*', { count: 'exact', head: true }).eq('person', me.id),
  ]);

  const promo = promoById(me.promo) || null;
  const name = me.full_name || me.email.split('@')[0];

  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="head-t">الملف الشخصي</div>
        </div>
      </header>

      <div className="scroll">
        <div className="me">
          <div className="av" style={{ width: 68, height: 68, fontSize: 22, background: 'var(--purple)' }}>
            {name.slice(0, 2)}
          </div>
          <div className="me-name">{name}</div>
          <div className="me-row">
            {promo && (
              <span className="pill solid" style={{ background: promo.badge, fontSize: 11 }}>
                {promo.name}
              </span>
            )}
            <span className="me-sub">{ROLE[me.role] || me.role} · UNEM</span>
          </div>
          <div className="me-mail" dir="ltr">{me.email}</div>

          {me.status !== 'approved' && (
            <div className="notice" style={{ width: '100%' }}>
              <Icon name="alert" size={19} />
              <div>
                <div className="notice-t">حسابك بانتظار الموافقة</div>
                <div className="notice-b">سيفتح لك التطبيق كاملًا فور موافقة أحد المشرفين.</div>
              </div>
            </div>
          )}

          <div className="me-stats">
            {[[posts.count || 0, 'منشور'], [saves.count || 0, 'محفوظ'],
              [answers.count || 0, 'جواب مقبول'], [rooms.count || 0, 'غرفة']].map(([n, l]) => (
              <div key={l} className="me-stat">
                <b>{n}</b><span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {isStaff(me) && (
          <Link href="/admin" className="card">
            <div className="card-row">
              <div className="tile tint-purple"><Icon name="settings" size={20} /></div>
              <div className="grow">
                <div className="nm">لوحة التحكم</div>
                <div className="mt">المحتوى، الأعضاء، الأسئلة</div>
              </div>
              <span className="chev"><Icon name="chev" size={18} /></span>
            </div>
          </Link>
        )}

        <Link href="/saved" className="card">
          <div className="card-row">
            <div className="tile tint-orange"><Icon name="bookmark" size={20} /></div>
            <div className="grow">
              <div className="nm">المحفوظات</div>
              <div className="mt">{saves.count || 0} عنصرًا</div>
            </div>
            <span className="chev"><Icon name="chev" size={18} /></span>
          </div>
        </Link>

        <Link href="/rooms" className="card">
          <div className="card-row">
            <div className="tile tint-purpleLight"><Icon name="person" size={20} /></div>
            <div className="grow">
              <div className="nm">غرف الدراسة</div>
              <div className="mt">{rooms.count || 0} غرفة أنت فيها</div>
            </div>
            <span className="chev"><Icon name="chev" size={18} /></span>
          </div>
        </Link>

        <Sign />
      </div>
    </>
  );
}
