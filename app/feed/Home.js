'use client';

// الرئيسية.
//
// Somewhere to post, then every tool the app has or will have, then your
// subjects as their own banners, then what your promo is saying.
//
// The tools come before the pictures on purpose: a student who opened the app
// to do questions should not scroll past four illustrations to reach them.

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import Post from '@/components/Post';

// Everything the app has or will have, EXCEPT what the bottom nav already
// carries. الملخصات and الأرشيف are tabs; a tile for them would be a second
// button to the same page.
const TOOLS = [
  { id: 'quiz',      label: 'اختبر نفسك', icon: 'quiz', href: '/quiz',     from: '#6B21B5', to: '#8B5CF6' },
  { id: 'lectures',  label: 'المحاضرات',  icon: 'book', href: '/lectures', from: '#F97316', to: '#FDBA74' },
  { id: 'qa',        label: 'سؤال وجواب',  icon: 'msg', href: '/qa', from: '#7C3AED', to: '#A78BFA' },
  { id: 'chat',      label: 'المحادثات',   icon: 'send', href: '/chat', from: '#C2410C', to: '#F97316' },
  { id: 'rooms',     label: 'غرف الدراسة', icon: 'person', href: '/rooms', from: '#5B21B6', to: '#7C3AED' },
  { id: 'duel',      label: 'تحدّي زميلك', icon: 'flask' },
  { id: 'review',    label: 'المراجعة',    icon: 'clock', href: '/review', from: '#5B21B6', to: '#8B5CF6' },
  { id: 'points',    label: 'النقاط',      icon: 'check' },
  { id: 'models',    label: 'نماذج 3D',    icon: 'atom' },
  { id: 'timetable', label: 'جدول الحصص',  icon: 'clock' },
];

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

export default function Home({ me, posts, subjects }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);      // what has been uploaded, not what is chosen
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const picker = useRef(null);

  // Files go up as they are chosen, not when the post is sent — a student on
  // LTE should be waiting while they write, not after.
  const take = async (list) => {
    setError('');
    for (const file of Array.from(list).slice(0, 6 - files.length)) {
      const holding = { name: file.name, kind: file.type.startsWith('image/') ? 'image' : 'file',
                        bytes: file.size, pending: true, id: crypto.randomUUID() };
      setFiles((f) => [...f, holding]);

      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFiles((f) => f.filter((x) => x.id !== holding.id));
        setError(data.error || `تعذّر الرفع (${res.status})`);
        continue;
      }
      setFiles((f) => f.map((x) => (x.id === holding.id ? { ...data, id: holding.id } : x)));
    }
  };

  const send = async () => {
    if (busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        body,
        media: files.filter((f) => !f.pending).map(({ kind, path, name, bytes }) =>
          ({ kind, path, name, bytes })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر النشر (${res.status})`); return; }
    setBody(''); setFiles([]);
    router.refresh();
  };

  const ready = !busy && (body.trim() || files.some((f) => !f.pending))
    && !files.some((f) => f.pending);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Logo size={34} id="feed" />
          <div className="head-t">الرئيسية</div>
          <button className="icobtn" aria-label="الإشعارات"><Icon name="bell" size={19} /></button>
          <div className="av" style={{ width: 38, height: 38, fontSize: 13, background: 'var(--purple)' }}>
            {me.name.slice(0, 2)}
          </div>
        </div>
      </header>

      <div className="scroll" style={{ gap: 14 }}>
        <div className="composer">
          <div className="composer-top">
            <div className="av" style={{ width: 40, height: 40, fontSize: 13, background: 'var(--purple)' }}>
              {me.name.slice(0, 2)}
            </div>
            <textarea
              className="composer-field"
              rows={body ? 3 : 1}
              placeholder="شارك شيئًا مع دفعتك…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              aria-label="منشور جديد"
            />
          </div>

          {files.length > 0 && (
            <div className="draft">
              {files.map((f) => (
                <div key={f.id} className={`draft-f${f.pending ? ' up' : ''}`}>
                  <Icon name={f.kind === 'image' ? 'image' : 'file'} size={17} />
                  <span className="grow" dir="ltr">{f.name}</span>
                  <span className="draft-mb">{f.pending ? '…' : mb(f.bytes)}</span>
                  {!f.pending && (
                    <button aria-label="احذف"
                      onClick={() => setFiles((l) => l.filter((x) => x.id !== f.id))}>
                      <Icon name="x" size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {error && <div className="admin-err">{error}</div>}

          <div className="composer-acts">
            <input
              ref={picker} type="file" hidden multiple
              accept="image/*,application/pdf"
              onChange={(e) => { take(e.target.files); e.target.value = ''; }}
            />
            <button onClick={() => picker.current?.click()}>
              <span className="ic-img"><Icon name="image" size={19} /></span>صورة
            </button>
            <button onClick={() => picker.current?.click()}>
              <span className="ic-pdf"><Icon name="file" size={19} /></span>ملف
            </button>
            <button className="composer-send" disabled={!ready} onClick={send}>
              {busy ? '…' : 'انشر'}
            </button>
          </div>
        </div>

        <div className="rail">
          {TOOLS.map((t) => (t.href ? (
            <Link key={t.id} href={t.href} className="tool-a"
              style={{ background: `linear-gradient(140deg, ${t.from}, ${t.to})` }}>
              <span className="tool-a-ic"><Icon name={t.icon} size={24} /></span>
              <b>{t.label}</b>
            </Link>
          ) : (
            <div key={t.id} className="tool-a off" aria-disabled="true">
              <span className="tool-a-soon">قريبًا</span>
              <b>{t.label}</b>
            </div>
          )))}
        </div>

        <div className="eyebrow" style={{ margin: '0 2px' }}>موادك</div>
        <div className="subs">
          {subjects.map((m) => (
            <Link key={m.id} href={`/archive/${m.id}`} className="sub">
              {m.banner
                ? <img src={m.banner} alt={m.name} />
                : <div className={`sub-none tint-${m.tint}`}><span dir="ltr">{m.name}</span></div>}
            </Link>
          ))}
        </div>

        {posts.length > 0
          ? posts.map((p) => <Post key={p.id} post={p} me={me} />)
          : (
            <div className="empty">
              <div className="tile tint-purple"><Icon name="msg" size={24} /></div>
              <div className="empty-t">لا منشورات بعد</div>
              <div className="empty-b">كن أول من ينشر في دفعتك.</div>
            </div>
          )}
      </div>
    </>
  );
}
