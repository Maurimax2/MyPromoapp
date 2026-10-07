'use client';

// الإشعارات.
//
// Everything here happened because of something you wrote, so every row leads
// back to it. Reading the screen is what marks them read — there is no button
// for that, because nobody has ever wanted one.

import { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useT } from '@/components/Lang';
import { ago } from '@/lib/i18n';

const WHO = (p, t) => p?.full_name || p?.email?.split('@')[0] || t('زميل');

const SAYS = {
  like:     (n, t) => t('{who} أعجب بمنشورك', { who: WHO(n.actor, t) }),
  comment:  (n, t) => t('{who} علّق على منشورك', { who: WHO(n.actor, t) }),
  answer:   (n, t) => t('{who} أجاب على سؤالك', { who: WHO(n.actor, t) }),
  accepted: (n, t) => t('{who} قبِل جوابك', { who: WHO(n.actor, t) }),
  approved: (n, t) => t('فُتح لك التطبيق — أهلًا بك'),
  duel:      (n, t) => t('{who} تحدّاك', { who: WHO(n.actor, t) }),
  duel_ok:   (n, t) => t('{who} قبِل تحدّيك', { who: WHO(n.actor, t) }),
  duel_no:   (n, t) => t('{who} اعتذر عن تحدّيك', { who: WHO(n.actor, t) }),
  duel_done: (n, t) => t('{who} أنهى التحدّي — ظهرت النتيجة', { who: WHO(n.actor, t) }),
  friend_req:  (n, t) => t('{who} يريد أن يضيفك صديقًا', { who: WHO(n.actor, t) }),
  friend_ok:   (n, t) => t('{who} قبِل طلب صداقتك', { who: WHO(n.actor, t) }),
  friend_post: (n, t) => t('{who} نشر', { who: WHO(n.actor, t) }),
  friend_room: (n, t) => t('{who} فتح غرفة دراسة', { who: WHO(n.actor, t) }),
  news:        (n, t) => n.news?.title || n.body || t('إعلان'),
};

const ICON = {
  like: 'heart', comment: 'msg', answer: 'msg', accepted: 'check', approved: 'person',
  duel: 'swords', duel_done: 'swords', duel_ok: 'swords', duel_no: 'swords',
  friend_req: 'addFriend', friend_ok: 'friend', friend_post: 'friends', friend_room: 'video',
  news: 'news',
};


export default function Notifications({ items }) {
  const t = useT();
  // Opening the screen is the acknowledgement.
  useEffect(() => {
    if (items.some((n) => !n.seen)) {
      fetch('/api/notifications', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' })
        .catch(() => {});
    }
  }, [items]);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/feed" className="icobtn" aria-label={t('رجوع')}><Icon name="chevR" size={19} /></Link>
          <div className="grow">
            <div className="head-t">{t('الإشعارات')}</div>
            <div className="head-s">
              {items.length ? t('{length} إشعارًا', { length: items.length }) : t('لا جديد')}
            </div>
          </div>
          <Link href="/notifications/settings" className="icobtn" aria-label={t('إعدادات الإشعارات')}>
            <Icon name="settings" size={19} />
          </Link>
        </div>
      </header>

      <div className="scroll">
        {items.map((n) => {
          const line = (SAYS[n.kind] || (() => t('حدث شيء')))(n, t);
          const inner = (
            <div className="card-row">
              <div className={`tile ${n.kind === 'duel' || n.kind === 'news' ? 'tint-clay' : 'tint-olive'}`}>
                <Icon name={ICON[n.kind] || 'bell'} size={19} />
              </div>
              <div className="grow">
                <div className="nm">{line}</div>
                {n.kind === 'news'
                  ? n.news?.body && <div className="mt notif-news" dir="auto">{n.news.body}</div>
                  : n.body && <div className="mt" dir="auto">{n.body}</div>}
                <div className="mt" suppressHydrationWarning>{ago(t, n.created_at)}</div>
              </div>
            </div>
          );
          const href = n.link && (n.link.startsWith('/') || n.link.startsWith('https://')) ? n.link
            : n.kind === 'approved' ? '/feed'
            : n.kind.startsWith('duel') ? '/duel'
            : n.kind === 'answer' || n.kind === 'accepted' ? `/qa/${n.post}` : '/feed';
          return (
            <Link key={n.id} href={href} className={`card${n.seen ? '' : ' notif-new'}`}>
              {inner}
            </Link>
          );
        })}

        {!items.length && (
          <div className="empty">
            <div className="tile tint-olive"><Icon name="bell" size={24} /></div>
            <div className="empty-t">{t('لا إشعارات بعد')}</div>
            <div className="empty-b">{t('حين يعجب أحدهم بمنشورك، أو يتحدّاك، أو ينشر أحد أصدقائك، ستجده هنا.')}</div>
          </div>
        )}
      </div>
    </>
  );
}
