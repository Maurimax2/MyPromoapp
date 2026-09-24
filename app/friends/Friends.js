'use client';

// الأصدقاء.
//
// Requests first — they are the only thing here waiting on you — then your
// friends, ordered by the streak they are keeping, which is the reason to
// look at this list at all.

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Find from '@/app/profile/Find';

const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};

function Person({ p, children }) {
  return (
    <div className="fr-row">
      <Link href={`/u/${encodeURIComponent(p.handle)}`} className="fr-who">
        <span className="fr-face" style={{ background: faceOf(p.id) }}>{p.name.slice(0, 2)}</span>
        <span className="grow">
          <b>{p.name}</b>
          <s dir="ltr">{p.username ? `@${p.username}` : p.handle}</s>
        </span>
      </Link>
      {children}
    </div>
  );
}

export default function Friends({ friends, asked, sent, off }) {
  const router = useRouter();
  const [busy, setBusy] = useState(null);

  const answer = async (p, yes) => {
    setBusy(p.id);
    await fetch('/api/friends', {
      method: yes ? 'POST' : 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ to: p.handle }),
    }).catch(() => {});
    setBusy(null);
    router.refresh();
  };

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/profile" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow">
            <div className="head-t">الأصدقاء</div>
            <div className="head-s">{friends.length ? `${friends.length} ${friends.length === 1 ? 'صديق' : 'أصدقاء'}` : 'من دفعتك'}</div>
          </div>
        </div>
      </header>

      <div className="scroll fr">
        {off && <div className="admin-err">الأصدقاء غير مفعّلين بعد.</div>}

        {asked.length > 0 && (
          <section className="fr-sec">
            <div className="fr-h"><b>طلبات صداقة</b><span className="tally">{asked.length}</span></div>
            {asked.map((p) => (
              <Person key={p.id} p={p}>
                <span className="fr-acts">
                  <button className="fr-yes" onClick={() => answer(p, true)} disabled={busy === p.id}>
                    {busy === p.id ? '…' : 'قبول'}
                  </button>
                  <button className="fr-no" onClick={() => answer(p, false)} disabled={busy === p.id} aria-label={`رفض ${p.name}`}>
                    <Icon name="x" size={16} />
                  </button>
                </span>
              </Person>
            ))}
          </section>
        )}

        <Find />

        <section className="fr-sec">
          <div className="fr-h"><b>أصدقاؤك</b></div>
          {friends.map((p) => (
            <Person key={p.id} p={p}>
              {p.streak > 0 && (
                <span className={`fr-streak${p.today ? ' today' : ''}`} title={p.today ? 'درس اليوم' : 'لم يدرس اليوم بعد'}>
                  <Icon name="flame" size={14} weight="fill" /> {p.streak}
                </span>
              )}
            </Person>
          ))}
          {!friends.length && (
            <p className="fr-empty">
              ابحث عن زميل باسم المستخدم أو الرقم الجامعي، ثم «أضف صديقًا». يصلك إشعار حين ينشر أحد أصدقائك أو يفتح غرفة دراسة.
            </p>
          )}
        </section>

        {sent.length > 0 && (
          <section className="fr-sec">
            <div className="fr-h"><b>بانتظار ردّهم</b></div>
            {sent.map((p) => (
              <Person key={p.id} p={p}>
                <button className="fr-no" onClick={() => answer(p, false)} disabled={busy === p.id} aria-label={`إلغاء الطلب إلى ${p.name}`}>
                  <Icon name="x" size={16} />
                </button>
              </Person>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
