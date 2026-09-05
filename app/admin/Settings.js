// What the server can actually see.
//
// Vercel hides a secret's value the moment you save it, and sorts the list by
// when it was added rather than by name — so "is my key even there?" is a
// question you cannot answer by looking. This answers it: present or absent,
// never the value.

const REQUIRED = [
  { key: 'NEXT_PUBLIC_SUPABASE_URL',  label: 'رابط Supabase',    why: 'بدونه لا يعمل شيء' },
  { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', label: 'مفتاح Supabase العام', why: 'تسجيل الدخول' },
  { key: 'SUPABASE_SERVICE_ROLE_KEY', label: 'مفتاح Supabase السري', why: 'الكتابة من اللوحة' },
  { key: 'ADMIN_EMAILS',              label: 'بريد الطاقم',      why: 'من يدخل اللوحة' },
  { key: 'GOOGLE_API_KEY',            label: 'مفتاح Google Drive', why: 'قراءة المجلدات' },
];

export default function Settings() {
  const rows = REQUIRED.map((r) => ({ ...r, set: !!process.env[r.key]?.trim() }));
  const missing = rows.filter((r) => !r.set);
  if (!missing.length) return null;

  return (
    <section className="admin-card admin-seed">
      <div className="admin-card-t">
        {missing.length === 1 ? 'متغيّر ناقص على الخادم' : `${missing.length} متغيّرات ناقصة على الخادم`}
      </div>
      <div className="env-rows">
        {rows.map((r) => (
          <div key={r.key} className={`env${r.set ? ' ok' : ''}`}>
            <span className="env-dot" />
            <div className="grow">
              <div className="env-k" dir="ltr">{r.key}</div>
              <div className="env-v">{r.label} — {r.why}</div>
            </div>
            <span className="env-state">{r.set ? 'موجود' : 'ناقص'}</span>
          </div>
        ))}
      </div>
      <p className="admin-card-b">
        أضفه في Vercel ← Settings ← Environment Variables، ثم اضغط Redeploy.
        المتغيّر لا يصل إلى التطبيق إلا بنشر جديد.
      </p>
    </section>
  );
}
