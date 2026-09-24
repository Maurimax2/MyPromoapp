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

export default function LoginForm({ years = PROMOS }) {
  const [how, setHow] = useState('link');       // link | password | join
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
  useEffect(() => { setWeb(!window.Capacitor?.isNativePlatform?.()); }, []);

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

  const signIn = async () => {
    const { error } = await supabase().auth.signInWithPassword({
      email: email.trim(), password,
    });
    if (error) throw error;
    // One destination for everybody; the server picks the screen, because it
    // is the only side that can see whether you are staff, a student, or an
    // account still waiting to be approved.
    window.location.href = '/auth/home';
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
        ? 'الدخول بحساب Google غير مفعّل بعد — استعمل البريد'
        : authMessage(error));
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
    if (!res.ok) throw new Error(data.error || `تعذّر إنشاء الحساب (${res.status})`);

    // Signed in straight away, then sent to the one screen an unapproved
    // account can reach. Saying "you are waiting" here as well would be a
    // second version of that screen to keep in step with the first.
    await supabase().auth.signInWithPassword({ email: email.trim(), password });
    window.location.href = '/auth/home';
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
        ? 'تجاوزنا حدّ الرسائل — أنشئ حسابًا بكلمة سر بدل الرابط'
        : unknown && how === 'link'
        ? 'لا حساب بهذا البريد — أنشئ حسابًا أولًا'
        : authMessage(err));
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="login">
        <Logo size={74} id="login" />
        <div className="login-name"><span>My</span><span className="login-name-b">Promo</span></div>
        <div className="login-sent">
          <div className="login-sent-t">تحقّق من بريدك</div>
          <div className="login-sent-b">
            أرسلنا رابط الدخول إلى<br /><span dir="ltr">{email}</span>
          </div>
          <button className="btn g" onClick={() => { setState('idle'); setHow('link'); }}>
            رجوع
          </button>
        </div>
        <p className="login-terms">بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية</p>
      </div>
    );
  }

  return (
    <div className="login">
      <Logo size={74} id="login" />
      <div className="login-name"><span>My</span><span className="login-name-b">Promo</span></div>

      {web && (
        <>
          <button type="button" className="login-google" onClick={google} disabled={state === 'busy'}>
            <Icon name="google" size={20} weight="bold" /> المتابعة بحساب Google
          </button>
          <div className="login-or"><span>أو</span></div>
        </>
      )}

      <form className="login-form" onSubmit={submit}>
        {how === 'join' && (
          <input
            className="login-input" autoFocus placeholder="اسمك الكامل"
            value={name} onChange={(e) => setName(e.target.value)} aria-label="الاسم" />
        )}

        {/* How classmates find and challenge you. Lower-case as it is typed,
            so the field shows exactly what will be stored. */}
        {how === 'join' && (
          <input
            className="login-input" dir="ltr" placeholder="اسم المستخدم — مثال: sidi.ahmed"
            value={username}
            onChange={(e) => setUsername(normaliseUsername(e.target.value))}
            autoCapitalize="none" autoCorrect="off" spellCheck={false}
            aria-label="اسم المستخدم" />
        )}

        {how === 'join' && (
          <>
            <div className="login-lbl">سنتك</div>
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
          </>
        )}

        {/* The first year has no university number yet. Instead: a WhatsApp
            number, which staff check against the faculty's groups — and
            which no classmate ever sees. */}
        {how === 'join' && first === true && (
          <>
            {/* The words above, the number alone in the field: Arabic and
                digits in one placeholder print the digit groups backwards. */}
            <div className="login-lbl">رقم واتساب</div>
            <input
              className="login-input" dir="ltr" type="tel" inputMode="tel"
              placeholder="36 12 34 56"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              aria-label="رقم واتساب" />
            <p className="login-note">يتحقّق منه المشرفون فقط، ولا يراه زملاؤك.</p>
          </>
        )}

        {/* Upper-cased as it is typed, so the field shows what will be stored
            and D12345 is never two different students. */}
        {how === 'join' && first === false && (
          <input
            className="login-input" dir="ltr" placeholder="الرقم الجامعي — D12345"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value.toUpperCase())}
            aria-label="الرقم الجامعي" />
        )}

        <input
          className="login-input" type="email" dir="ltr" inputMode="email"
          autoComplete="email" placeholder="you@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)}
          aria-label="البريد الإلكتروني" />

        {how !== 'link' && (
          <input
            className="login-input" type="password" dir="ltr"
            autoComplete={how === 'join' ? 'new-password' : 'current-password'}
            placeholder={how === 'join' ? 'كلمة سر — 8 أحرف على الأقل' : 'كلمة السر'}
            value={password} onChange={(e) => setPassword(e.target.value)}
            aria-label="كلمة السر" />
        )}

        <button className="btn p" disabled={!ready || state === 'busy'}>
          {state === 'busy' ? '…'
            : how === 'link' ? 'أرسل رابط الدخول'
            : how === 'password' ? 'ادخل'
            : 'أنشئ الحساب'}
        </button>

        {state === 'error' && <div className="login-err">{error}</div>}

        <div className="login-alts">
          {how !== 'password' && (
            <button type="button" className="login-alt"
              onClick={() => { setHow('password'); setState('idle'); }}>
              ادخل بكلمة السر
            </button>
          )}
          {how !== 'join' && (
            <button type="button" className="login-alt"
              onClick={() => { setHow('join'); setState('idle'); }}>
              <Icon name="plus" size={15} /> حساب جديد
            </button>
          )}
          {how !== 'link' && (
            <button type="button" className="login-alt"
              onClick={() => { setHow('link'); setState('idle'); }}>
              أرسل لي رابطًا
            </button>
          )}
        </div>
      </form>

      <p className="login-terms">بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية</p>
    </div>
  );
}
