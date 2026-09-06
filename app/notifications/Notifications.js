'use client';

// الإشعارات.
//
// Everything here happened because of something you wrote, so every row leads
// back to it. Reading the screen is what marks them read — there is no button
// for that, because nobody has ever wanted one.

import { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

const WHO = (p) => p?.full_name || p?.email?.split('@')[0] || 'زميل';

const SAYS = {
  like:     (n) => `${WHO(n.actor)} أعجب بمنشورك`,
  comment:  (n) => `${WHO(n.actor)} علّق على منشورك`,
  answer:   (n) => `${WHO(n.actor)} أجاب على سؤالك`,
  accepted: (n) => `${WHO(n.actor)} قبِل جوابك`,
  approved: () => 'فُتح لك التطبيق — أهلًا بك',
};

const ICON = { like: 'heart', comment: 'msg', answer: 'msg', accepted: 'check', approved: 'person' };

function when(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'الآن';
  const m = Math.floor(s / 60);
  if (m < 60) return `قبل ${m} دقيقة`;
  const h = Math.floor(m / 60);
  if (h < 24) return `قبل ${h} ساعة`;
  return `قبل ${Math.floor(h / 24)} يوم`;
}

export default function Notifications({ items }) {
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
          <Link href="/feed" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow">
            <div className="head-t">الإشعارات</div>
            <div className="head-s">
              {items.length ? `${items.length} إشعارًا` : 'لا جديد'}
            </div>
          </div>
        </div>
      </header>

      <div className="scroll">
        {items.map((n) => {
          const line = (SAYS[n.kind] || (() => 'حدث شيء'))(n);
          const inner = (
            <div className="card-row">
              <div className={`tile ${n.kind === 'accepted' ? 'tint-orange' : 'tint-purple'}`}>
                <Icon name={ICON[n.kind] || 'bell'} size={19} />
              </div>
              <div className="grow">
                <div className="nm">{line}</div>
                {n.body && <div className="mt" dir="auto">{n.body}</div>}
                <div className="mt" suppressHydrationWarning>{when(n.created_at)}</div>
              </div>
            </div>
          );
          const href = n.kind === 'approved' ? '/feed'
            : n.kind === 'answer' || n.kind === 'accepted' ? `/qa/${n.post}` : '/feed';
          return (
            <Link key={n.id} href={href} className={`card${n.seen ? '' : ' notif-new'}`}>
              {inner}
            </Link>
          );
        })}

        {!items.length && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="bell" size={24} /></div>
            <div className="empty-t">لا إشعارات بعد</div>
            <div className="empty-b">
              حين يعجب أحدهم بمنشورك أو يجيب على سؤالك، ستجده هنا.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
