'use client';

// The front door.
//
// A link to your own inbox is the right door for a student: they forget
// passwords and they lend them, and a link is harder to lend to somebody who
// is not in the promo. But Supabase's built-in mailer sends a couple of
// messages an hour, which is fine for a student signing up once and useless
// for the four of us signing in twenty times a day while we build. So there
// is a password door too, and staff use it.
//
// The form itself. Whether it is shown at all is decided on the server, in
// page.js — somebody already signed in should never see it again.

import { useState } from 'react';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase/browser';

export default function LoginForm() {
  const [how, setHow] = useState('link');       // link | password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('idle');   // idle | sending | sent | error
  const [error, setError] = useState('');

  const sendLink = async () => {
    const { error } = await supabase().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
    setState('sent');
  };

  const signIn = async () => {
    const { error } = await supabase().auth.signInWithPassword({
      email: email.trim(), password,
    });
    if (error) throw error;
    // The panel's own gate sends anyone who is not staff on to the app, so
    // one destination is right for both.
    window.location.href = '/admin';
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (how === 'password' && !password) return;
    setState('sending'); setError('');

    try {
      await (how === 'link' ? sendLink() : signIn());
    } catch (err) {
      // The one people actually hit, and the message Supabase gives for it
      // says nothing about what to do next.
      const rate = /rate limit|too many/i.test(err.message);
      setError(rate
        ? 'تجاوزنا حدّ الرسائل — جرّب كلمة السر بدل الرابط'
        : err.message);
      setState('error');
    }
  };

  return (
    <div className="login">
      <Logo size={74} id="login" />
      <div className="login-name">
        <span>My</span><span className="login-name-b">Promo</span>
      </div>

      {state === 'sent' ? (
        <div className="login-sent">
          <div className="login-sent-t">تحقّق من بريدك</div>
          <div className="login-sent-b">
            أرسلنا رابط الدخول إلى<br /><span dir="ltr">{email}</span>
          </div>
          <button className="btn g" onClick={() => setState('idle')}>عنوان آخر</button>
        </div>
      ) : (
        <form className="login-form" onSubmit={submit}>
          <input
            className="login-input"
            type="email"
            dir="ltr"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="البريد الإلكتروني"
          />

          {how === 'password' && (
            <input
              className="login-input"
              type="password"
              dir="ltr"
              autoComplete="current-password"
              placeholder="كلمة السر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="كلمة السر"
            />
          )}

          <button
            className="btn p"
            disabled={state === 'sending' || !email.trim() || (how === 'password' && !password)}
          >
            {state === 'sending' ? '…' : how === 'link' ? 'أرسل رابط الدخول' : 'ادخل'}
          </button>

          {state === 'error' && <div className="login-err">{error}</div>}

          <button
            type="button"
            className="login-alt"
            onClick={() => { setHow(how === 'link' ? 'password' : 'link'); setState('idle'); }}
          >
            {how === 'link' ? 'ادخل بكلمة السر' : 'أرسل لي رابطًا بدل ذلك'}
          </button>
        </form>
      )}

      <p className="login-terms">
        بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
      </p>
    </div>
  );
}
