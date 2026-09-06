'use client';

// The front door — three ways through it.
//
// A link to your own inbox is the right door for a student who forgets
// passwords. It is the wrong door when Supabase's built-in mailer sends two
// messages an hour, which is where this project spent an evening. So there is
// also a password, and a way to make an account that needs no email at all.
//
// Making an account does not let you in. A new profile is `pending` and every
// policy is written against is_approved(), so a student sees nothing until
// somebody on the team approves them. That is the gate — not the inbox.

import { useState } from 'react';
import Logo from '@/components/Logo';
import Icon from '@/components/Icon';
import { supabase } from '@/lib/supabase/browser';
import { PROMOS } from '@/lib/data';

export default function LoginForm() {
  const [how, setHow] = useState('link');       // link | password | join
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [promo, setPromo] = useState('');
  const [state, setState] = useState('idle');   // idle | busy | sent | error
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
    // One destination for everybody; the server picks the screen, because it
    // is the only side that can see whether you are staff, a student, or an
    // account still waiting to be approved.
    window.location.href = '/auth/home';
  };

  const join = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password, full_name: name.trim(), promo }),
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
    : email.trim() && password.length >= 8 && name.trim() && promo;

  const submit = async (e) => {
    e.preventDefault();
    if (!ready || state === 'busy') return;
    setState('busy'); setError('');
    try {
      await (how === 'link' ? sendLink() : how === 'password' ? signIn() : join());
    } catch (err) {
      const rate = /rate limit|too many/i.test(err.message);
      setError(rate ? 'تجاوزنا حدّ الرسائل — أنشئ حسابًا بكلمة سر بدل الرابط' : err.message);
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

      <form className="login-form" onSubmit={submit}>
        {how === 'join' && (
          <input
            className="login-input" autoFocus placeholder="اسمك الكامل"
            value={name} onChange={(e) => setName(e.target.value)} aria-label="الاسم" />
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

        {how === 'join' && (
          <>
            <div className="login-lbl">سنتك</div>
            <div className="login-promos">
              {PROMOS.map((p) => (
                <button
                  type="button" key={p.id}
                  className={`imp-kind${promo === p.id ? ' on' : ''}`}
                  style={promo === p.id ? { background: p.badge } : undefined}
                  onClick={() => setPromo(p.id)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </>
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
