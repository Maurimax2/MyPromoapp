'use client';

// The front door: a password, a new account, Google on the website — and,
// for a forgotten password, a request that staff answer with a temporary one
// on WhatsApp (the emailed link never worked from a phone; see askReset).
//
// Making an account does not let you in. A new profile is `pending` and every
// policy is written against is_approved(), so a student sees nothing until
// somebody on the team approves them. That is the gate — not the inbox.

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import Icon from '@/components/Icon';
import { supabase } from '@/lib/supabase/browser';
import { authMessage } from '@/lib/auth-error';
import { PROMOS, badgeOf } from '@/lib/data-core';
import { isFirstYear, normaliseUsername } from '@/lib/identity';
import { useT, LangSwitch } from '@/components/Lang';

export default function LoginForm({ years = PROMOS }) {
  const t = useT();
  const [how, setHow] = useState('password');   // password | join | link (forgot) | renew
  const [who, setWho] = useState('');           // forgot: email, username or number
  const [fresh, setFresh] = useState('');       // renew: the password of their own
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [matricule, setMatricule] = useState('');
  const [phone, setPhone] = useState('');
  const [promo, setPromo] = useState('');
  const [state, setState] = useState('idle');   // idle | busy | sent | error
  const [error, setError] = useState('');
  // Google refuses to sign in inside an app's own web view, so the button
  // shows on the website only until the app has its own Google sign-in.
  const [web, setWeb] = useState(false);
  // Neither the phone app nor the laptop app can show Google's sign-in: Google
  // refuses to run inside an embedded window.
  useEffect(() => {
    setWeb(!window.Capacitor?.isNativePlatform?.() && !/MyPromoDesktop/.test(navigator.userAgent));
  }, []);

  const chosen = years.find((y) => y.id === promo);
  const first = chosen ? isFirstYear(chosen) : null;

  // A forgotten password is a request a person answers, not an emailed link.
  //
  // The link opened in the phone's browser, which does not hold the half of
  // the sign-in the app had started, so it landed back on this door — and
  // Supabase's mailer sends two messages an hour. The request appears in
  // اللوحة ← الأعضاء; an admin checks who it is and sends a temporary password
  // on WhatsApp. See /api/auth/reset-request.
  const askReset = async () => {
    const res = await fetch('/api/auth/reset-request', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ who: who.trim() }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || t('تعذّر إرسال الطلب ({status})', { status: res.status }));
    setState('sent');
  };

  // Signed in with a temporary password: a password of their own first, then
  // the app. The temporary one keeps working until this is done.
  const renew = async () => {
    const res = await fetch('/api/auth/new-password', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: fresh }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || t('تعذّر الحفظ ({status})', { status: res.status }));
    window.location.href = afterSignIn();
  };

  // Where the door sends you: the screen the server picks, remembering the
  // link you came for when there was one (a private room's invitation).
  const afterSignIn = () => {
    const next = new URLSearchParams(window.location.search).get('next');
    return next ? `/auth/home?next=${encodeURIComponent(next)}` : '/auth/home';
  };

  const signIn = async () => {
    const { data, error } = await supabase().auth.signInWithPassword({
      email: email.trim(), password,
    });
    if (error) throw error;
    if (data?.user?.app_metadata?.must_change_pw) {
      setHow('renew'); setState('idle'); setShowPw(false);
      return;
    }
    // One destination for everybody; the server picks the screen, because it
    // is the only side that can see whether you are staff, a student, or an
    // account still waiting to be approved.
    window.location.href = afterSignIn();
  };

  // Google hands back to /auth/callback, the same door the emailed link uses.
  // A new Google account arrives with a name and nothing else, and /waiting
  // asks for the year, the username and the number or WhatsApp.
  const google = async () => {
    setState('busy'); setError('');
    const { error } = await supabase().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(/not enabled|unsupported provider/i.test(error.message)
        ? t('الدخول بحساب Google غير مفعّل بعد — استعمل البريد')
        : t(authMessage(error)));
      setState('error');
    }
  };

  const join = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(), password, full_name: name.trim(), promo,
        username, matricule: first ? matricule || null : matricule, phone: first ? phone : null,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || t('تعذّر إنشاء الحساب ({status})', { status: res.status }));

    // Signed in straight away, then sent to the one screen an unapproved
    // account can reach. Saying "you are waiting" here as well would be a
    // second version of that screen to keep in step with the first.
    await supabase().auth.signInWithPassword({ email: email.trim(), password });
    window.location.href = afterSignIn();
  };

  const ready =
    how === 'link' ? who.trim().length >= 3
    : how === 'renew' ? fresh.length >= 8
    : how === 'password' ? email.trim() && password
    : email.trim() && password.length >= 8 && name.trim() && promo
      && normaliseUsername(username).length >= 3
      && (first ? phone.replace(/[^0-9]/g, '').length >= 8 : matricule.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!ready || state === 'busy') return;
    setState('busy'); setError('');
    try {
      await (how === 'link' ? askReset() : how === 'renew' ? renew()
        : how === 'password' ? signIn() : join());
    } catch (err) {
      setError(t(authMessage(err)));
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="login">
        <Logo size={74} id="login" />
        <div className="login-name"><span>My</span><span className="login-name-b">Promo</span></div>
        <div className="login-sent">
          <div className="login-sent-t">{t('وصل طلبك')}</div>
          <div className="login-sent-b">{t('سيتحقّق أحد المشرفين من حسابك ويرسل لك كلمة سر مؤقتة على واتساب. ادخل بها، ثم اختر كلمة سر جديدة.')}</div>
          <button className="btn g" onClick={() => { setState('idle'); setHow('password'); }}>{t('رجوع')}</button>
        </div>
        <Agree t={t} />
      </div>
    );
  }

  const go = (to) => () => { setHow(to); setState('idle'); setError(''); };
  // Only the two side doors say something under the name: what happens next.
  const hello = how === 'link' ? t('نسيت كلمة السر؟ اطلب كلمة سر مؤقتة يرسلها لك مشرف على واتساب')
    : how === 'renew' ? t('دخلت بكلمة سر مؤقتة — اختر كلمة سر جديدة لحسابك')
    : null;

  return (
    <div className="login">
      <LangSwitch className="lang-switch login-lang" />
      <div className="login-top">
        <Logo size={64} id="login" />
        <div className="login-name"><span>My</span><span className="login-name-b">Promo</span></div>
        {hello && <p className="login-hello">{hello}</p>}
      </div>

      {how !== 'link' && how !== 'renew' && (
        <div className="login-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={how === 'password'}
            className={how === 'password' ? 'on' : ''} onClick={go('password')}>{t('تسجيل الدخول')}</button>
          <button type="button" role="tab" aria-selected={how === 'join'}
            className={how === 'join' ? 'on' : ''} onClick={go('join')}>{t('حساب جديد')}</button>
        </div>
      )}

      <form className="login-form" onSubmit={submit}>
        {how === 'join' && (
          <>
            <label className="login-lbl" htmlFor="lg-name">{t('الاسم الكامل')}</label>
            <input id="lg-name" className="login-input" autoComplete="name"
              value={name} onChange={(e) => setName(e.target.value)} />

            {/* How classmates find and challenge you. Lower-case as it is typed,
                so the field shows exactly what will be stored. */}
            <label className="login-lbl" htmlFor="lg-user">{t('اسم المستخدم')}</label>
            <input id="lg-user" className="login-input" dir="ltr" placeholder="sidi.ahmed"
              value={username} onChange={(e) => setUsername(normaliseUsername(e.target.value))}
              autoCapitalize="none" autoCorrect="off" spellCheck={false} />

            <div className="login-lbl">{t('سنتك')}</div>
            <div className="login-promos">
              {years.map((p) => (
                <button
                  type="button" key={p.id}
                  className={`imp-kind${promo === p.id ? ' on' : ''}`}
                  style={promo === p.id ? { background: badgeOf(p) } : undefined}
                  onClick={() => setPromo(p.id)}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* The first year has no university number yet. Instead: a WhatsApp
                number, which staff check against the faculty's groups — and
                which no classmate ever sees. */}
            {first === true && (
              <>
                <label className="login-lbl" htmlFor="lg-phone">{t('رقم واتساب')}</label>
                <input id="lg-phone" className="login-input" dir="ltr" type="tel" inputMode="tel"
                  placeholder="36 12 34 56" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <p className="login-note">{t('يتحقّق منه المشرفون فقط، ولا يراه زملاؤك.')}</p>
              </>
            )}

            {/* Upper-cased as it is typed, so the field shows what will be stored
                and D12345 is never two different students. */}
            {first === false && (
              <>
                <label className="login-lbl" htmlFor="lg-mat">{t('الرقم الجامعي')}</label>
                <input id="lg-mat" className="login-input" dir="ltr" placeholder="D12345"
                  value={matricule} onChange={(e) => setMatricule(e.target.value.toUpperCase())} />
              </>
            )}
          </>
        )}

        {how === 'link' && (
          <>
            <label className="login-lbl" htmlFor="lg-who">{t('البريد أو اسم المستخدم أو رقم الهاتف')}</label>
            <input id="lg-who" className="login-input" dir="ltr" autoCapitalize="none" autoCorrect="off"
              spellCheck={false} value={who} onChange={(e) => setWho(e.target.value)} />
          </>
        )}

        {how === 'renew' && (
          <>
            <label className="login-lbl" htmlFor="lg-new">{t('كلمة السر الجديدة')}</label>
            <div className="login-pw">
              <input id="lg-new" className="login-input" type={showPw ? 'text' : 'password'} dir="ltr"
                autoComplete="new-password" placeholder={t('8 أحرف على الأقل')}
                value={fresh} onChange={(e) => setFresh(e.target.value)} />
              <button type="button" className="login-eye" onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? t('أخفِ كلمة السر') : t('أظهر كلمة السر')}>
                {showPw ? t('إخفاء') : t('إظهار')}
              </button>
            </div>
          </>
        )}

        {how !== 'link' && how !== 'renew' && (
          <>
            <label className="login-lbl" htmlFor="lg-email">{t('البريد الإلكتروني')}</label>
            <input id="lg-email" className="login-input" type="email" dir="ltr" inputMode="email"
              autoComplete="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </>
        )}

        {how !== 'link' && how !== 'renew' && (
          <>
            <label className="login-lbl" htmlFor="lg-pw">{t('كلمة السر')}</label>
            <div className="login-pw">
              <input id="lg-pw" className="login-input" type={showPw ? 'text' : 'password'} dir="ltr"
                autoComplete={how === 'join' ? 'new-password' : 'current-password'}
                placeholder={how === 'join' ? t('8 أحرف على الأقل') : ''}
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="login-eye" onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? t('أخفِ كلمة السر') : t('أظهر كلمة السر')}>
                {showPw ? t('إخفاء') : t('إظهار')}
              </button>
            </div>
          </>
        )}

        {how === 'password' && (
          <button type="button" className="login-forgot" onClick={go('link')}>{t('نسيت كلمة السر؟')}</button>
        )}

        <button className="btn p" disabled={!ready || state === 'busy'}>
          {state === 'busy' ? '…'
            : how === 'link' ? t('اطلب كلمة سر مؤقتة')
            : how === 'renew' ? t('احفظ وادخل')
            : how === 'password' ? t('تسجيل الدخول')
            : t('أنشئ الحساب')}
        </button>

        {state === 'error' && <div className="login-err">{error}</div>}

        {how === 'link' && (
          <button type="button" className="login-alt login-back" onClick={go('password')}>{t('رجوع إلى تسجيل الدخول')}</button>
        )}
      </form>

      {web && how !== 'link' && how !== 'renew' && (
        <>
          <div className="login-or"><span>{t('أو')}</span></div>
          <button type="button" className="login-google" onClick={google} disabled={state === 'busy'}>
            <Icon name="google" size={20} weight="bold" />{' '}{t('المتابعة بحساب Google')}</button>
        </>
      )}

      <Agree t={t} />
    </div>
  );
}

// One sentence, one key — French puts the two links in its own order — with
// the links put back where the braces are. The terms are what Apple means by
// «users agree to terms with no tolerance for objectionable content».
function Agree({ t }) {
  const parts = t('بالمتابعة، أنت توافق على {terms} و{privacy}').split(/(\{terms\}|\{privacy\})/);
  return (
    <p className="login-terms">
      {parts.map((part, i) => (part === '{terms}' ? <a key={i} href="/terms">{t('شروط الاستخدام')}</a>
        : part === '{privacy}' ? <a key={i} href="/privacy">{t('سياسة الخصوصية')}</a>
          : part))}
    </p>
  );
}
