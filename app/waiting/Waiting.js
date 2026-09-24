'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { badgeOf } from '@/lib/data';
import { isFirstYear, normaliseUsername } from '@/lib/identity';

/**
 * The screen a new account sees, and the only one it can reach.
 *
 * It says "you cannot see anything yet" once, plainly, instead of leaving it
 * to be discovered one refused button at a time. It is also where a profile
 * gets finished: the doors other than sign-up — Google, an emailed link —
 * never asked for a year, a username, or the faculty's number, and an
 * account missing them reads an empty app without being told why.
 *
 * A first year has no faculty number yet, so it is asked for a WhatsApp
 * number instead: staff check it is in the faculty's groups before letting
 * them in. Which of the two is asked follows the year — the one on the
 * profile, or the one being chosen right here.
 */
export default function Waiting({
  name, email, promo, promoFirst, refused, years, needsUsername, numberMissing, phoneMissing,
  matricule, username, approved,
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [year, setYear] = useState('');
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [handle, setHandle] = useState('');
  const [error, setError] = useState('');

  const chosen = years ? years.find((y) => y.id === year) : null;
  // Until a year is chosen nobody knows which question to ask, so neither
  // field shows — choosing the year is the first thing on this screen.
  const first = years ? (chosen ? isFirstYear(chosen) : null) : promoFirst;
  const asksNumber = numberMissing && first === false;
  const asksPhone = phoneMissing && first === true;
  const asks = !refused && (years || needsUsername || asksNumber || asksPhone);

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

  // All in one tap, because they are one question to the student: who are
  // you. The ones that can be refused for being somebody else's — the
  // username, the number — go first, so a year is never saved beside a
  // rejected name and leaves the screen half-done.
  const save = async () => {
    if (busy) return;
    setBusy(true); setError('');
    try {
      if (needsUsername) await post('/api/me/username', { username: handle });
      if (asksNumber) await post('/api/me/matricule', { matricule: number });
      if (asksPhone) await post('/api/me/phone', { phone });
      if (years) await post('/api/me/promo', { promo: year });
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  const ready = (!years || year)
    && (!needsUsername || normaliseUsername(handle).length >= 3)
    && (!asksNumber || number.trim())
    && (!asksPhone || phone.replace(/[^0-9]/g, '').length >= 8);

  return (
    <div className="scroll wait">
      <Logo size={54} id="wait" />

      <div className="wait-card">
        <div className={`tile ${refused ? 'tint-clay' : 'tint-olive'}`}>
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
          {username && <div><span>اسم المستخدم</span><b dir="ltr">@{username}</b></div>}
          {matricule && <div><span>الرقم الجامعي</span><b dir="ltr">{matricule}</b></div>}
        </div>

        {/* The same chips as sign-up, because it is the same question. */}
        {years && (
          <div className="login-promos">
            {years.map((y) => (
              <button
                type="button" key={y.id}
                className={`imp-kind${year === y.id ? ' on' : ''}`}
                style={year === y.id && y.badge ? { background: badgeOf(y) } : undefined}
                onClick={() => setYear(y.id)}
              >
                {y.name || y.id.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {needsUsername && (
          <input
            className="login-input" dir="ltr" autoFocus={!years}
            placeholder="اسم المستخدم — مثال: sidi.ahmed"
            value={handle}
            onChange={(e) => setHandle(normaliseUsername(e.target.value))}
            autoCapitalize="none" autoCorrect="off" spellCheck={false}
            aria-label="اسم المستخدم" />
        )}

        {/* Upper-cased as it is typed, so the field shows what will be stored
            and D12345 is never two different students. */}
        {asksNumber && (
          <input
            className="login-input" dir="ltr"
            placeholder="الرقم الجامعي — D12345"
            value={number}
            onChange={(e) => setNumber(e.target.value.toUpperCase())}
            aria-label="الرقم الجامعي" />
        )}

        {asksPhone && (
          <>
            <div className="login-lbl">رقم واتساب</div>
            <input
              className="login-input" dir="ltr" type="tel" inputMode="tel"
              placeholder="36 12 34 56"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="رقم واتساب" />
            <p className="wait-note">
              لا رقم جامعي في السنة الأولى بعد — يتحقّق المشرفون من أن رقمك في مجموعات الكلية، ولا يراه أحد غيرهم.
            </p>
          </>
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
