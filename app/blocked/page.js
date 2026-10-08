import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import Unblock from '@/components/Unblock';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getT } from '@/lib/lang';

export const dynamic = 'force-dynamic';

// أنا ← المحظورون: the people you have blocked, and the way back.
//
// A block hides a person everywhere, including from the lists you would look
// for them in, so this is the one screen that still names them.
export default async function Blocked() {
  const t = await getT();
  const me = await currentProfile();
  if (!me) redirect('/login');

  const db = supabaseAdmin();
  const { data: rows, error } = await db.from('blocks')
    .select('blocked, created_at').eq('blocker', me.id).order('created_at', { ascending: false });
  const ids = (rows || []).map((r) => r.blocked);
  const { data: people } = ids.length
    ? await db.from('profiles').select('id, full_name, email, username, matricule').in('id', ids)
    : { data: [] };
  const byId = new Map((people || []).map((p) => [p.id, p]));
  const list = ids.map((id) => byId.get(id)).filter(Boolean);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/profile" className="icobtn" aria-label={t('رجوع')}><Icon name="chevR" size={19} /></Link>
          <div className="grow">
            <div className="head-t">{t('المحظورون')}</div>
            <div className="head-s">{t('لا يرون ما تنشره، ولا تراهم')}</div>
          </div>
        </div>
      </header>

      <div className="scroll fr">
        {error && <div className="admin-err">{t('الحظر غير مفعّل بعد')}</div>}

        {list.length > 0 && (
          <section className="fr-sec">
            {list.map((p) => {
              const name = p.full_name || p.email?.split('@')[0] || t('طالب');
              return (
                <div key={p.id} className="fr-row">
                  <div className="fr-who">
                    <span className="fr-face" style={{ background: 'var(--ink-3)' }}>{name.slice(0, 2)}</span>
                    <span className="grow">
                      <b>{name}</b>
                      <s dir="ltr">{p.username ? `@${p.username}` : p.matricule || ''}</s>
                    </span>
                  </div>
                  <Unblock person={p.id} className="fr-unblock" />
                </div>
              );
            })}
          </section>
        )}

        {!error && !list.length && (
          <div className="empty">
            <div className="tile tint-olive"><Icon name="block" size={24} /></div>
            <div className="empty-t">{t('لم تحظر أحدًا')}</div>
            <div className="empty-b">{t('تحظر أحدًا من النقاط الثلاث بجانب ما كتبه، أو من ملفه.')}</div>
          </div>
        )}
      </div>
    </>
  );
}
