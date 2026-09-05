'use client';

// The front door.
//
// No password. You give your email, we send a link, you tap it. Students
// forget passwords and share them; a link to their own inbox is both simpler
// and harder to lend to someone who is not in the promo.
//
// The form itself. Whether it is shown at all is decided on the server, in
// page.js — somebody already signed in should never see it again.

import { useState } from 'react';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase/browser';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');   // idle | sending | sent | error
  const [error, setError] = useState('');

  const send = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState('sending');

    const { error } = await supabase().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) { setError(error.message); setState('error'); return; }
    setState('sent');
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
        <form className="login-form" onSubmit={send}>
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
          <button className="btn p" disabled={state === 'sending' || !email.trim()}>
            {state === 'sending' ? '…' : 'أرسل رابط الدخول'}
          </button>
          {state === 'error' && <div className="login-err">{error}</div>}
        </form>
      )}

      <p className="login-terms">
        بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
      </p>
    </div>
  );
}
