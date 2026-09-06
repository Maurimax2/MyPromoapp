'use client';

// The panel's own door.
//
// Nothing in the student app links here, and signing in through the app's
// front door lands you in the app like everybody else. The panel is reached
// by coming to this address and signing in with a staff email — which is the
// whole point: six people run it, and nobody else needs to know it is here.

import { useState } from 'react';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase/browser';
import { authMessage } from '@/lib/auth-error';

export default function AdminLogin() {
  const [how, setHow] = useState('password');   // password | link
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('idle');   // idle | busy | sent | error
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (state === 'busy') return;
    if (!email.trim() || (how === 'password' && !password)) return;
    setState('busy'); setError('');

    try {
      if (how === 'link') {
        // The link comes back to the panel, not to the app: somebody who
        // asked for the panel should not land on the feed five minutes later
        // wondering where it went.
        const { error: err } = await supabase().auth.signInWithOtp({
          email: email.trim(),
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` },
        });
        if (err) throw err;
        setState('sent');
        return;
      }

      const { error: err } = await supabase().auth.signInWithPassword({
        email: email.trim(), password,
      });
      if (err) throw err;

      // A reload rather than a route change: the layout above this form is
      // what decides whether you see the panel, and it decides on the server.
      window.location.href = '/admin';
    } catch (err) {
      setError(authMessage(err));
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="login">
        <Logo size={74} id="adm" />
        <div className="login-name"><span>My</span><span className="login-name-b">Promo</span></div>
        <div className="login-sent">
          <div className="login-sent-t">تحقّق من بريدك</div>
          <div className="login-sent-b">
            أرسلنا رابط الدخول إلى<br /><span dir="ltr">{email}</span>
          </div>
          <button className="btn g" onClick={() => setState('idle')}>رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login">
      <Logo size={74} id="adm" />
      <div className="login-name"><span>My</span><span className="login-name-b">Promo</span></div>
      <div className="admin-badge" style={{ marginTop: 6 }}>لوحة التحكم</div>

      <form className="login-form" onSubmit={submit}>
        <input
          className="login-input" type="email" dir="ltr" inputMode="email"
          autoComplete="email" placeholder="بريد الطاقم" autoFocus
          value={email} onChange={(e) => setEmail(e.target.value)}
          aria-label="بريد الطاقم" />

        {how === 'password' && (
          <input
            className="login-input" type="password" dir="ltr"
            autoComplete="current-password" placeholder="كلمة السر"
            value={password} onChange={(e) => setPassword(e.target.value)}
            aria-label="كلمة السر" />
        )}

        <button className="btn p" disabled={state === 'busy'}>
          {state === 'busy' ? '…' : how === 'password' ? 'ادخل إلى اللوحة' : 'أرسل رابط الدخول'}
        </button>

        {state === 'error' && <div className="login-err">{error}</div>}

        <div className="login-alts">
          <button
            type="button" className="login-alt"
            onClick={() => { setHow(how === 'password' ? 'link' : 'password'); setState('idle'); }}
          >
            {how === 'password' ? 'أرسل لي رابطًا' : 'ادخل بكلمة السر'}
          </button>
        </div>
      </form>

      <p className="login-terms">هذه الصفحة للطاقم. الطلاب يدخلون من الصفحة الرئيسية.</p>
    </div>
  );
}
