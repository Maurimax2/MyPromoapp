// What went wrong at the door, in Arabic.
//
// Supabase answers in English — "Invalid login credentials" — and printing
// that to a student who mistyped their password tells them nothing and looks
// like the app broke. Anything not recognised is passed through rather than
// replaced by a vague apology: a message we have never seen is more useful
// than "something went wrong".

const SAYS = [
  [/invalid login credentials|invalid credentials/i, 'البريد أو كلمة السر غير صحيحة'],
  [/email not confirmed/i,                           'لم يُفعَّل هذا البريد بعد'],
  [/rate limit|too many/i,                           'تجاوزنا حدّ الرسائل — ادخل بكلمة السر'],
  [/already registered|already exists/i,             'هذا البريد مسجَّل بالفعل — سجّل الدخول'],
  [/password should be at least/i,                   'كلمة السر قصيرة — 8 أحرف على الأقل'],
  [/user not found/i,                                'لا حساب بهذا البريد'],
  [/failed to fetch|network|load failed/i,           'لا اتصال بالخادم'],
];

export function authMessage(err) {
  const text = String(err?.message || err || '').trim();
  for (const [pattern, arabic] of SAYS) if (pattern.test(text)) return arabic;
  return text || 'تعذّر الدخول';
}
