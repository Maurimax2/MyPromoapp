'use client';

// الملخصات, and adding one.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');
const who = (p) => p?.full_name || p?.email?.split('@')[0] || null;
const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);

export default function NoteList({ groups, subjects, me }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [module, setModule] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const picker = useRef(null);

  // The + in the bar opens the same form as the card below, never a second one.
  useEffect(() => {
    const open = () => setAdding(true);
    window.addEventListener('mypromo:new', open);
    return () => window.removeEventListener('mypromo:new', open);
  }, []);

  const take = async (chosen) => {
    if (!chosen) return;
    setError(''); setFile({ name: chosen.name, bytes: chosen.size, pending: true });
    const form = new FormData();
    form.append('file', chosen);
    const res = await fetch('/api/upload', { method: 'POST', body: form });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setFile(null); setError(data.error || `تعذّر الرفع (${res.status})`); return; }
    setFile(data);
    if (!title.trim()) setTitle(chosen.name.replace(/\.[a-z0-9]+$/i, ''));
  };

  const share = async (e) => {
    e.preventDefault();
    if (!file || file.pending || !module || busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        body: title.trim() || file.name, kind: 'note', module,
        media: [{ kind: file.kind, path: file.path, name: file.name, bytes: file.bytes }],
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر النشر (${res.status})`); return; }
    setTitle(''); setFile(null); setModule(''); setAdding(false);
    router.refresh();
  };

  const keep = async (post, on) => {
    await fetch('/api/saves', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ post, on }),
    });
    router.refresh();
  };

  const shown = groups
    .map((g) => ({ ...g, items: g.items.filter((n) => !q
      || n.title.toLowerCase().includes(q.toLowerCase())
      || (who(n.author) || '').toLowerCase().includes(q.toLowerCase())
      || g.name.toLowerCase().includes(q.toLowerCase())) }))
    .filter((g) => g.items.length);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الملخصات</div>
            <div className="head-s">{total ? `${total} ملخصًا` : 'لا ملخصات بعد'}</div>
          </div>
        </div>
        <label className="srch">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} type="search"
            placeholder="ابحث بالمادة أو باسم الطالب" aria-label="ابحث في الملخصات" />
        </label>
      </header>

      <div className="scroll">
        {error && <div className="admin-err">{error}</div>}

        {adding ? (
          <form className="admin-card admin-seed" onSubmit={share}>
            <div className="admin-card-t">شارك ملخصًا</div>
            <input ref={picker} type="file" hidden accept="image/*,application/pdf"
              onChange={(e) => { take(e.target.files?.[0]); e.target.value = ''; }} />

            {file ? (
              <div className={`draft-f${file.pending ? ' up' : ''}`}>
                <Icon name="file" size={17} />
                <span className="grow" dir="ltr">{file.name}</span>
                <span className="draft-mb">{file.pending ? '…' : mb(file.bytes)}</span>
                {!file.pending && (
                  <button type="button" aria-label="احذف" onClick={() => setFile(null)}>
                    <Icon name="x" size={15} />
                  </button>
                )}
              </div>
            ) : (
              <button type="button" className="btn g" onClick={() => picker.current?.click()}>
                <Icon name="file" size={18} /> اختر ملفًا
              </button>
            )}

            <input className="admin-input" placeholder="عنوان الملخص" dir="ltr"
              value={title} onChange={(e) => setTitle(e.target.value)} aria-label="العنوان" />
            <select className="admin-input" value={module}
              onChange={(e) => setModule(e.target.value)} aria-label="المادة">
              <option value="">اختر المادة</option>
              {subjects.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>

            <div className="usr-acts">
              <button className="btn p sm" disabled={busy || !file || file.pending || !module}>
                شارك
              </button>
              <button type="button" className="btn g sm" onClick={() => setAdding(false)}>ألغِ</button>
            </div>
          </form>
        ) : (
          <button className="admin-card admin-import" onClick={() => setAdding(true)}>
            <div className="admin-import-ic"><Icon name="plus" size={22} /></div>
            <div className="grow ct-start">
              <div className="admin-card-t">شارك ملخصك</div>
              <div className="admin-card-b">ارفعه مرة، وتستفيد منه دفعتك كلها</div>
            </div>
          </button>
        )}

        {shown.map((g) => (
          <section key={g.id} className="note-group">
            <div className="note-subject">
              <span dir="ltr">{g.name}</span>
              <span className="note-subject-n">{g.items.length}</span>
            </div>
            {g.items.map((n) => {
              const inner = (
                <>
                  <div className="note-top">
                    {n.author ? (
                      <div className="av" style={{ width: 38, height: 38, fontSize: 12.5, background: 'var(--purple)' }}>
                        {initials(n.author)}
                      </div>
                    ) : (
                      <div className="note-ic"><Icon name="file" size={17} /></div>
                    )}
                    <div className="grow">
                      <div className="note-title" dir="ltr">{n.title}</div>
                      <div className="note-by">{who(n.author) || 'من مواد المقرّر'}</div>
                    </div>
                  </div>
                  <div className="note-foot">
                    <span className="pill grey">
                      {n.ext || 'PDF'}{n.bytes ? ` · ${mb(n.bytes)}` : ''}
                    </span>
                    {n.post ? (
                      <button
                        className="note-saves" data-on={n.saved}
                        onClick={(e) => { e.preventDefault(); keep(n.post, !n.saved); }}
                        aria-label={n.saved ? 'أزل الحفظ' : 'احفظ'}
                      >
                        <Icon name="bookmark" size={16} />
                      </button>
                    ) : <span className="note-saves"><Icon name="chev" size={15} /></span>}
                  </div>
                </>
              );

              const to = n.href || n.url;
              return to
                ? <a key={n.id} href={to} target={n.url ? '_blank' : undefined}
                     rel="noreferrer" className="card note">{inner}</a>
                : <article key={n.id} className="card note">{inner}</article>;
            })}
          </section>
        ))}

        {!shown.length && !adding && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="book" size={24} /></div>
            <div className="empty-t">{q ? 'لا نتائج' : 'لا ملخصات بعد'}</div>
            <div className="empty-b">
              {q ? `لا ملخص يطابق «${q}».` : 'كن أول من يشارك ملخصًا مع دفعتك.'}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
