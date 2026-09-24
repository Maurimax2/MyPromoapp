'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { pushStatus, enablePush, disablePush, isNative } from '@/lib/pushClient';

// The groups lib/push.js sends under, said the way a student would.
const KINDS = [
  { id: 'messages',  icon: 'msgs',   t: 'الرسائل',        s: 'حين يكتب لك أحد' },
  { id: 'friends',   icon: 'friends', t: 'الأصدقاء',       s: 'طلبات الصداقة، ومنشوراتهم وغرفهم' },
  { id: 'duels',     icon: 'swords', t: 'التحدّيات',       s: 'حين يتحدّاك أحد، أو يُنهي تحدّيًا' },
  { id: 'social',    icon: 'heart',  t: 'منشوراتك',        s: 'الإعجابات والتعليقات والأجوبة' },
  { id: 'reminders', icon: 'flame',  t: 'التذكير اليومي', s: 'مساءً، إن لم تدرس بعد — مرة واحدة' },
  { id: 'news',      icon: 'news',   t: 'إعلانات الكلية', s: 'من فريق MyPromo' },
];

const SAY = {
  granted: 'مفعّلة على هذا الجهاز',
  default: 'غير مفعّلة على هذا الجهاز',
  denied: 'محظورة على هذا الجهاز',
  install: 'على iPhone: أضف MyPromo إلى الشاشة الرئيسية أولًا',
  unsupported: 'هذا المتصفّح لا يدعم الإشعارات',
  error: 'تعذّر التفعيل — حاول مرة أخرى',
};

export default function PushSettings({ off: initial, ready }) {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [off, setOff] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { pushStatus().then(setStatus); }, []);

  const turnOn = async () => {
    setBusy(true);
    setStatus(await enablePush((u) => router.push(u)));
    setBusy(false);
  };
  const turnOff = async () => {
    setBusy(true);
    await disablePush();
    setStatus(await pushStatus());
    setBusy(false);
  };

  const flip = async (id) => {
    const next = off.includes(id) ? off.filter((x) => x !== id) : [...off, id];
    setOff(next); setError('');
    const res = await fetch('/api/me/push', {
      method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ off: next }),
    });
    if (!res.ok) {
      setOff(off);
      setError((await res.json().catch(() => ({}))).error || 'تعذّر الحفظ');
    }
  };

  const on = status === 'granted';

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/notifications" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow"><div className="head-t">إعدادات الإشعارات</div></div>
        </div>
      </header>

      <div className="scroll ps">
        <section className={`ps-dev${on ? ' on' : ''}`}>
          <span className="ps-dev-ic"><Icon name="bell" size={22} weight={on ? 'fill' : 'regular'} /></span>
          <span className="grow">
            <b>{status ? SAY[status] : '…'}</b>
            {status === 'denied' && (
              <s>{isNative()
                ? 'افتح إعدادات الهاتف ← التطبيقات ← MyPromo ← الإشعارات، وفعّلها.'
                : 'اضغط رمز القفل بجانب العنوان في أعلى المتصفّح ← الإشعارات ← السماح، ثم أعد تحميل الصفحة.'}</s>
            )}
          </span>
          {(status === 'default' || status === 'error') && (
            <button className="ps-go" onClick={turnOn} disabled={busy}>{busy ? '…' : 'فعّل'}</button>
          )}
          {on && <button className="ps-stop" onClick={turnOff} disabled={busy}>{busy ? '…' : 'أوقف'}</button>}
        </section>

        {!ready && <div className="admin-err">الإعدادات غير متاحة بعد.</div>}
        {error && <div className="admin-err">{error}</div>}

        <div className="ps-list" role="group" aria-label="ما يصلك">
          {KINDS.map((k) => {
            const yes = !off.includes(k.id);
            return (
              <button key={k.id} className="ps-row" role="switch" aria-checked={yes}
                      onClick={() => flip(k.id)} disabled={!ready}>
                <span className="ps-row-ic"><Icon name={k.icon} size={18} /></span>
                <span className="grow"><b>{k.t}</b><s>{k.s}</s></span>
                <span className={`ps-sw${yes ? ' on' : ''}`} aria-hidden="true"><i /></span>
              </button>
            );
          })}
        </div>
        <p className="ps-note">تُطبَّق على كل أجهزتك. الإشعارات داخل التطبيق (الجرس) تبقى كما هي.</p>
      </div>
    </>
  );
}
