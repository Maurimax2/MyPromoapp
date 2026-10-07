'use client';

// The front door — four ways through it.
//
// Google is the quickest: every Android phone already has an account, so it
// is one tap and no password to forget. A link to your own inbox is the
// right door for a student who forgets passwords, but Supabase's built-in
// mailer sends two messages an hour — so there is also a password, and a way
// to make an account that needs no email at all.
//
// Making an account does not let you in. A new profile is `pending` and every
// policy is written against is_approved(), so a student sees nothing until
// somebody on the team approves them. That is the gate — not the inbox.

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import Icon from '@/components/Icon';
import { supabase } from '@/lib/supabase/browser';
import { authMessage } from '@/lib/auth-error';
import { PROMOS, badgeOf } from '@/lib/data';
import { isFirstYear, normaliseUsername } from '@/lib/identity';
import { useT, LangSwitch } from '@/components/Lang';

export default function LoginForm({ years = PROMOS }) {
  const t = useT();
  const [how, setHow] = useState('password');   // password | join | link (forgot)
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

  // The link signs you in. It does not sign you up.
  //
  // Supabase creates the account for an unknown address unless it is told
  // not to, so typing any address here used to make a student — with no name
  // and, worse, no year. Signing up takes an email, a password and a year;
  // this is the other way in for somebody who already did that.
  const sendLink = async () => {
    const { error } = await supabase().auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    setState('sent');
  };

  // Where the door sends you: the screen the server picks, remembering the
  // link you came for when there was one (a private room's invitation).
  const afterSignIn = () => {
    const next = new URLSearchParams(window.location.search).get('next');
    return next ? `/auth/home?next=${encodeURIComponent(next)}` : '/auth/home';
  };

  const signIn = async () => {
    const { error } = await supabase().auth.signInWithPassword({
      email: email.trim(), password,
    });
    if (error) throw error;
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
    how === 'link' ? email.trim()
    : how === 'password' ? email.trim() && password
    : email.trim() && password.length >= 8 && name.trim() && promo
      && normaliseUsername(username).length >= 3
      && (first ? phone.replace(/[^0-9]/g, '').length >= 8 : matricule.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!ready || state === 'busy') return;
    setState('busy'); setError('');
    try {
      await (how === 'link' ? sendLink() : how === 'password' ? signIn() : join());
    } catch (err) {
      // The link is the only door where the rate limit has a different way
      // out, so that one sentence stays here.
      const rate = /rate limit|too many/i.test(err.message);
      // Supabase's answer for an address it has never seen, now that the link
      // no longer creates one. It is the commonest thing a new student will
      // do here, so it says where to go instead of showing them the raw
      // "Signups not allowed for otp".
      const unknown = /signups? not allowed|user not found/i.test(err.message);
      setError(rate && how === 'link'
        ? t('تجاوزنا حدّ الرسائل — أنشئ حسابًا بكلمة سر بدل الرابط')
        : unknown && how === 'link'
        ? t('لا حساب بهذا البريد — أنشئ حسابًا أولًا')
        : t(authMessage(err)));
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="login">
        <Logo size={74} id="login" />
        <div className="login-name"><span>My</span><span className="login-name-b">Promo</span></div>
        <div className="login-sent">
          <div className="login-sent-t">{t('تحقّق من بريدك')}</div>
          <div className="login-sent-b">{t('أرسلنا رابط الدخول إلى')}<br /><span dir="ltr">{email}</span>
          </div>
          <button className="btn g" onClick={() => { setState('idle'); setHow('password'); }}>{t('رجوع')}</button>
        </div>
        <p className="login-terms">{t('بالمتابعة، أنت توافق على')}{' '}<a href="/privacy">{t('سياسة الخصوصية')}</a></p>
      </div>
    );
  }

  const go = (to) => () => { setHow(to); setState('idle'); setError(''); };
  const hello = how === 'join' ? t('أنشئ حسابك لتنضمّ إلى دفعتك')
    : how === 'link' ? t('نسيت كلمة السر؟ سنرسل لك رابطًا للدخول')
    : t('أهلًا بعودتك');

  return (
    <div className="login">
      <LangSwitch className="lang-switch login-lang" />
      <div className="login-top">
        <Logo size={64} id="login" />
        <div className="login-name"><span>My</span><span className="login-name-b">Promo</span></div>
        <p className="login-hello">{hello}</p>
      </div>

      {how !== 'link' && (
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

        <label className="login-lbl" htmlFor="lg-email">{t('البريد الإلكتروني')}</label>
        <input id="lg-email" className="login-input" type="email" dir="ltr" inputMode="email"
          autoComplete="email" placeholder="you@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        {how !== 'link' && (
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
            : how === 'link' ? t('أرسل رابط الدخول')
            : how === 'password' ? t('تسجيل الدخول')
            : t('أنشئ الحساب')}
        </button>

        {state === 'error' && <div className="login-err">{error}</div>}

        {how === 'link' && (
          <button type="button" className="login-alt login-back" onClick={go('password')}>{t('رجوع إلى تسجيل الدخول')}</button>
        )}
      </form>

      {web && how !== 'link' && (
        <>
          <div className="login-or"><span>{t('أو')}</span></div>
          <button type="button" className="login-google" onClick={google} disabled={state === 'busy'}>
            <Icon name="google" size={20} weight="bold" />{' '}{t('المتابعة بحساب Google')}</button>
        </>
      )}

      <p className="login-terms">{t('بالمتابعة، أنت توافق على')}{' '}<a href="/privacy">{t('سياسة الخصوصية')}</a></p>
    </div>
  );
}
