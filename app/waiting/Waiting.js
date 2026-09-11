'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';

/**
 * The screen a new account sees, and the only one it can reach.
 *
 * It says "you cannot see anything yet" once, plainly, instead of leaving it
 * to be discovered one refused button at a time. It is also where a profile
 * gets finished: the doors other than sign-up never asked for a year or for
 * the faculty's number, and an account missing either reads an empty app
 * without being told why.
 */
export default function Waiting({
  name, email, promo, refused, years, needsNumber, matricule, approved,
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [year, setYear] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const asks = !refused && (years || needsNumber);

  const again = () => {
    setBusy(true);
    router.refresh();
    // The refresh is a server round trip; the button stays busy long enough
    // to read as one, then comes back rather than spinning for ever.
    setTimeout(() => setBusy(false), 1200);
  };

  const post = async (url, body) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `تعذّر الحفظ (${res.status})`);
  };

  // Both in one tap, because they are one question to the student: who are
  // you. The number goes first — it is the one that can be refused for being
  // somebody else's, and a year saved beside a rejected number would leave
  // the screen half-done with no way to tell.
  const save = async () => {
    if (busy) return;
    setBusy(true); setError('');
    try {
      if (needsNumber) await post('/api/me/matricule', { matricule: number });
      if (years) await post('/api/me/promo', { promo: year });
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  const ready = (!needsNumber || number.trim()) && (!years || year);

  return (
    <div className="scroll wait">
      <Logo size={54} id="wait" />

      <div className="wait-card">
        <div className={`tile ${refused ? 'tint-orange' : 'tint-purple'}`}>
          <Icon name={refused ? 'x' : asks ? 'award' : 'clock'} size={24} />
        </div>
        <div className="wait-t">
          {refused ? 'لم يُقبل حسابك' : `أهلًا ${name}`}
        </div>
        <p className="wait-b">
          {refused
            ? 'راجع أحد المشرفين إن كنت ترى أن هذا خطأ.'
            : asks
            ? 'أكمل بياناتك لنعرف من أنت. لا يمكن تغييرها بعد ذلك إلا عبر مشرف.'
            : 'حسابك قيد المراجعة. يفتح لك التطبيق بمجرد أن يوافق عليه أحد المشرفين — عادةً في نفس اليوم.'}
        </p>

        <div className="wait-rows">
          <div><span>البريد</span><b dir="ltr">{email}</b></div>
          {promo && <div><span>السنة</span><b dir="ltr">{promo}</b></div>}
          {matricule && <div><span>الرقم الجامعي</span><b dir="ltr">{matricule}</b></div>}
        </div>

        {/* Upper-cased as it is typed, so the field shows what will be stored
            and D04458 is never two different students. */}
        {needsNumber && (
          <input
            className="login-input" dir="ltr" autoFocus
            placeholder="الرقم الجامعي — D04458"
            value={number}
            onChange={(e) => setNumber(e.target.value.toUpperCase())}
            aria-label="الرقم الجامعي" />
        )}

        {/* The same chips as sign-up, because it is the same question. */}
        {years && (
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
        )}

        {error && <div className="login-err">{error}</div>}

        {asks ? (
          <button className="btn p" onClick={save} disabled={!ready || busy}>
            {busy ? 'جارٍ الحفظ…' : 'حفظ'}
          </button>
        ) : !refused ? (
          <button className="btn p" onClick={again} disabled={busy}>
            {busy ? 'جارٍ التحقق…' : 'تحقّق الآن'}
          </button>
        ) : null}

        {/* Approved and only missing these: say so, or the screen reads as
            "still waiting" to somebody who is not. */}
        {asks && approved && (
          <p className="wait-b">تمت الموافقة على حسابك — تبقّت هذه البيانات فقط.</p>
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
