'use client';

// «فعّل الإشعارات» — asked on الرئيسية, once the student can see what for.
//
// Only while the answer is still open: granted, refused, or a browser that
// cannot do it at all, and the card is not drawn. «لاحقًا» hides it for a
// week, not for ever — a student who said later meant later.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { pushStatus, enablePush } from '@/lib/pushClient';

const LATER = 'mypromo.push.later';
const WEEK = 7 * 86400000;

export default function PushAsk() {
  const router = useRouter();
  const [state, setState] = useState(null);     // null until known
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let later = 0;
    try { later = Number(localStorage.getItem(LATER) || 0); } catch { /* private mode */ }
    if (Date.now() - later < WEEK) return;
    pushStatus().then(setState);
  }, []);

  if (state !== 'default' && state !== 'install' && state !== 'error') return null;

  const turnOn = async () => {
    setBusy(true);
    const s = await enablePush((u) => router.push(u));
    setBusy(false);
    setState(s);
  };
  const notNow = () => {
    try { localStorage.setItem(LATER, String(Date.now())); } catch { /* private mode */ }
    setState(null);
  };

  return (
    <section className="pa r3">
      <span className="pa-ic"><Icon name="bell" size={21} weight="fill" /></span>
      <span className="grow">
        <b>لا تفوّتك دفعتك</b>
        <s>
          {state === 'install'
            ? 'على iPhone: اضغط زرّ المشاركة ثم «إضافة إلى الشاشة الرئيسية»، وافتح MyPromo من هناك لتصلك الإشعارات.'
            : state === 'error'
              ? 'تعذّر التفعيل — حاول مرة أخرى بعد قليل.'
              : 'رسائل أصدقائك، التحدّيات، تذكير سلسلتك، وإعلانات الكلية — على هاتفك.'}
        </s>
        <span className="pa-acts">
          {state !== 'install' && (
            <button className="pa-go" onClick={turnOn} disabled={busy}>{busy ? '…' : 'فعّل الإشعارات'}</button>
          )}
          <button className="pa-later" onClick={notNow}>لاحقًا</button>
        </span>
      </span>
    </section>
  );
}
