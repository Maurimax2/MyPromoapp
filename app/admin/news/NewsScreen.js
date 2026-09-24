'use client';

// Writing an announcement, seeing it the way a lock screen will, and sending
// it — to everybody, or to one year.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

function when(iso) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1} · ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function NewsScreen({ years, past, ready }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [promo, setPromo] = useState('');
  const [link, setLink] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const [sure, setSure] = useState(false);

  const to = promo ? (years.find((y) => y.id === promo)?.name || promo) : 'كل الطلبة';

  const send = async () => {
    if (!title.trim() || busy) return;
    // Two taps: a message to two thousand phones cannot be unsent.
    if (!sure) { setSure(true); return; }
    setBusy(true); setError(''); setDone('');
    const res = await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, body, promo: promo || null, link }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false); setSure(false);
    if (!res.ok) { setError(data.error || 'تعذّر الإرسال'); return; }
    setDone(`أُرسل إلى ${data.to} طالبًا`);
    setTitle(''); setBody(''); setLink('');
    router.refresh();
  };

  const remove = async (id) => {
    const res = await fetch('/api/admin/news', {
      method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id }),
    });
    if (res.ok) router.refresh();
  };

  return (
    <div className="admin-body">
      {!ready && (
        <div className="admin-err">جدول الإعلانات غير موجود بعد — الصق supabase/push.sql في Supabase.</div>
      )}

      <div className="admin-bar"><span>إعلان جديد</span><span>{to}</span></div>
      <section className="admin-card admin-seed">
        <div className="news-to" role="radiogroup" aria-label="إلى من">
          <button role="radio" aria-checked={!promo} data-on={!promo} onClick={() => { setPromo(''); setSure(false); }}>الجميع</button>
          {years.map((y) => (
            <button key={y.id} role="radio" aria-checked={promo === y.id} data-on={promo === y.id} dir="ltr"
                    onClick={() => { setPromo(y.id); setSure(false); }}>{y.name}</button>
          ))}
        </div>
        <input className="admin-input" placeholder="العنوان — تأجيل امتحان ANATOMIE" maxLength={80}
               value={title} onChange={(e) => { setTitle(e.target.value); setSure(false); }} dir="auto" />
        <textarea className="admin-input news-body" placeholder="التفاصيل (اختياري)" maxLength={600} rows={4}
                  value={body} onChange={(e) => { setBody(e.target.value); setSure(false); }} dir="auto" />
        <input className="admin-input sm" placeholder="رابط (اختياري) — /study أو https://…" dir="ltr"
               value={link} onChange={(e) => setLink(e.target.value)} />

        {/* What the phone will show. */}
        {title.trim() && (
          <div className="news-peek" aria-label="معاينة">
            <span className="news-peek-ic"><Icon name="bell" size={16} /></span>
            <span className="grow">
              <b dir="auto">{title}</b>
              {body.trim() && <s dir="auto">{body.length > 140 ? `${body.slice(0, 139)}…` : body}</s>}
            </span>
            <span className="news-peek-app">MyPromo</span>
          </div>
        )}

        {error && <div className="admin-err">{error}</div>}
        {done && <div className="news-done"><Icon name="check" size={16} /> {done}</div>}
        <button className={`btn p${sure ? ' news-sure' : ''}`} onClick={send} disabled={!title.trim() || busy || !ready}>
          <Icon name="bell" size={17} />
          {busy ? '…' : sure ? `اضغط مرة أخرى للإرسال إلى ${to}` : 'أرسل'}
        </button>
      </section>

      {past.length > 0 && <div className="admin-bar"><span>أُرسلت</span><span>{past.length}</span></div>}
      <div className="admin-rows">
        {past.map((a) => (
          <section key={a.id} className="admin-card admin-seed news-past">
            <div className="news-past-top">
              <b dir="auto" className="grow">{a.title}</b>
              <span dir="ltr">{a.promo ? a.promo.toUpperCase() : 'ALL'}</span>
            </div>
            {a.body && <p className="admin-card-b" dir="auto">{a.body}</p>}
            <div className="news-past-top">
              <span className="grow" suppressHydrationWarning>{when(a.created_at)}</span>
              <button className="news-del" onClick={() => remove(a.id)}>احذف من الإشعارات</button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
