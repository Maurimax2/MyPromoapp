'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';

export default function Waiting({ name, email, promo, refused }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const again = () => {
    setBusy(true);
    router.refresh();
    // The refresh is a server round trip; the button stays busy long enough
    // to read as one, then comes back rather than spinning for ever.
    setTimeout(() => setBusy(false), 1200);
  };

  return (
    <div className="scroll wait">
      <Logo size={54} id="wait" />

      <div className="wait-card">
        <div className={`tile ${refused ? 'tint-orange' : 'tint-purple'}`}>
          <Icon name={refused ? 'x' : 'clock'} size={24} />
        </div>
        <div className="wait-t">
          {refused ? 'لم يُقبل حسابك' : `أهلًا ${name}`}
        </div>
        <p className="wait-b">
          {refused
            ? 'راجع أحد المشرفين إن كنت ترى أن هذا خطأ.'
            : 'حسابك قيد المراجعة. يفتح لك التطبيق بمجرد أن يوافق عليه أحد المشرفين — عادةً في نفس اليوم.'}
        </p>

        <div className="wait-rows">
          <div><span>البريد</span><b dir="ltr">{email}</b></div>
          {promo && <div><span>السنة</span><b dir="ltr">{promo}</b></div>}
        </div>

        {!refused && (
          <button className="btn p" onClick={again} disabled={busy}>
            {busy ? 'جارٍ التحقق…' : 'تحقّق الآن'}
          </button>
        )}
        {/* A POST, like everywhere else: a prefetched link must not be able
            to end a session. */}
        <form action="/auth/signout" method="post">
          <button className="btn g">خروج</button>
        </form>
      </div>
    </div>
  );
}
