'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';

export default function Waiting({ name, email, promo, refused, years, approved }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const again = () => {
    setBusy(true);
    router.refresh();
    // The refresh is a server round trip; the button stays busy long enough
    // to read as one, then comes back rather than spinning for ever.
    setTimeout(() => setBusy(false), 1200);
  };

  // Asked here rather than left to an admin to guess, because a profile with
  // no year reads an empty app and says nothing about why.
  const saveYear = async () => {
    if (!year || busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/me/promo', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ promo: year }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر الحفظ (${res.status})`); return; }
    router.refresh();
  };

  return (
    <div className="scroll wait">
      <Logo size={54} id="wait" />

      <div className="wait-card">
        <div className={`tile ${refused ? 'tint-orange' : 'tint-purple'}`}>
          <Icon name={refused ? 'x' : years ? 'award' : 'clock'} size={24} />
        </div>
        <div className="wait-t">
          {refused ? 'لم يُقبل حسابك' : `أهلًا ${name}`}
        </div>
        <p className="wait-b">
          {refused
            ? 'راجع أحد المشرفين إن كنت ترى أن هذا خطأ.'
            : years
            ? 'اختر سنتك لنعرف أيّ دفعة أنت فيها. لا يمكن تغييرها بعد ذلك إلا عبر مشرف.'
            : 'حسابك قيد المراجعة. يفتح لك التطبيق بمجرد أن يوافق عليه أحد المشرفين — عادةً في نفس اليوم.'}
        </p>

        <div className="wait-rows">
          <div><span>البريد</span><b dir="ltr">{email}</b></div>
          {promo && <div><span>السنة</span><b dir="ltr">{promo}</b></div>}
        </div>

        {/* The year, when the door they came through never asked for it. */}
        {years && (
          <>
            {/* The same chips as sign-up, because it is the same question. */}
            <div className="login-promos">
              {years.map((y) => (
                <button
                  type="button" key={y.id}
                  className={`imp-kind${year === y.id ? ' on' : ''}`}
                  style={year === y.id && y.badge ? { background: y.badge } : undefined}
                  onClick={() => setYear(y.id)}
                >
                  {y.name || y.id.toUpperCase()}
                </button>
              ))}
            </div>
            {error && <div className="login-err">{error}</div>}
            <button className="btn p" onClick={saveYear} disabled={!year || busy}>
              {busy ? 'جارٍ الحفظ…' : 'حفظ'}
            </button>
          </>
        )}

        {!refused && !years && (
          <button className="btn p" onClick={again} disabled={busy}>
            {busy ? 'جارٍ التحقق…' : 'تحقّق الآن'}
          </button>
        )}

        {/* Approved and only missing a year: say so, or the screen reads as
            "still waiting" to somebody who is not. */}
        {years && approved && (
          <p className="wait-b">تمت الموافقة على حسابك — تبقّت السنة فقط.</p>
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
