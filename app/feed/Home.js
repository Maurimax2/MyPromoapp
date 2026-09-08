'use client';

// الرئيسية.
//
// Somewhere to post, then every tool the app has or will have, then your
// subjects as their own banners, then what your promo is saying.
//
// The tools come before the pictures on purpose: a student who opened the app
// to do questions should not scroll past four illustrations to reach them.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { DEFAULT_HOME } from '@/lib/home-blocks';
import { TOOLS } from '@/lib/tools';
import Logo from '@/components/Logo';
import Post from '@/components/Post';
import PickPromo from './PickPromo';
import { imageThumb, pdfThumb } from '@/lib/thumb';

// Everything the app has or will have, EXCEPT what the bottom nav already
// carries. الملخصات and الأرشيف are tabs; a tile for them would be a second
// button to the same page.
const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

export default function Home({ me, posts, subjects, unseen = 0, readError = null,
                               refused = 0, layout = DEFAULT_HOME, due = 0 }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);      // what has been uploaded, not what is chosen
  const [module, setModule] = useState('');   // the subject it belongs to
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const picker = useRef(null);
  const field = useRef(null);

  // The + in the bar is the same action as the box at the top of this screen,
  // so it puts the cursor in it rather than opening a second way to post.
  useEffect(() => {
    const write = () => {
      field.current?.focus();
      field.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    };
    if (new URLSearchParams(window.location.search).has('write')) write();
    window.addEventListener('mypromo:new', write);
    return () => window.removeEventListener('mypromo:new', write);
  }, []);

  // Files go up as they are chosen, not when the post is sent — a student on
  // LTE should be waiting while they write, not after.
  const take = async (list) => {
    setError('');
    for (const file of Array.from(list).slice(0, 6 - files.length)) {
      const kind = file.type.startsWith('image/') ? 'image' : 'file';
      const holding = { name: file.name, kind, bytes: file.size,
                        pending: true, id: crypto.randomUUID(),
                        thumb: kind === 'image' ? imageThumb(file) : null };
      setFiles((f) => [...f, holding]);

      // The first page of a PDF, drawn while the bytes are still going up.
      if (kind === 'file') {
        pdfThumb(file).then((thumb) => {
          if (thumb) setFiles((f) => f.map((x) => (x.id === holding.id ? { ...x, thumb } : x)));
        });
      }

      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFiles((f) => f.filter((x) => x.id !== holding.id));
        setError(data.error || `تعذّر الرفع (${res.status})`);
        continue;
      }
      setFiles((f) => f.map((x) => (
        x.id === holding.id ? { ...data, id: holding.id, thumb: x.thumb } : x)));
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
        module: module || null,
        media: files.filter((f) => !f.pending).map(({ kind, path, name, bytes }) =>
          ({ kind, path, name, bytes })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر النشر (${res.status})`); return; }
    setBody(''); setFiles([]); setModule('');
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
          {/* It was a <button> with no handler for weeks. */}
          <Link href="/notifications" className="icobtn bell" aria-label="الإشعارات">
            <Icon name="bell" size={19} />
            {unseen > 0 && <span className="bell-dot" />}
          </Link>
          <div className="av" style={{ width: 38, height: 38, fontSize: 13, background: 'var(--purple)' }}>
            {me.name.slice(0, 2)}
          </div>
        </div>
      </header>

      <div className="scroll" style={{ gap: 14 }}>
        {/* Refusals are said out loud wherever the blocks end up. An empty
            screen reads as an empty promo, and we lost an afternoon to that. */}
        {readError && (
          <div className="admin-err" style={{ padding: '0 2px' }}>
            تعذّرت قراءة المنشورات — {readError}
          </div>
        )}
        {!readError && refused > 0 && (
          <div className="admin-err" style={{ padding: '0 2px' }}>
            في دفعتك {refused} منشورًا لا يسمح لك الخادم بقراءتها — تحقّق من
            حالة حسابك وسنتك في اللوحة.
          </div>
        )}

        {/* The order is the row somebody saved in the panel, not the order
            these happen to be written in. */}
        {layout.filter((b) => b.on).map((block) => {
          switch (block.id) {

            case 'due':
              return due > 0 ? (
                <Link key="due" href="/review" className="home-due">
                  <span className="home-due-ic"><Icon name="clock" size={17} /></span>
                  <div className="grow">
                    <b>{due} سؤالًا للمراجعة اليوم</b>
                    <span>خمس دقائق تكفي</span>
                  </div>
                  <Icon name="chev" size={17} />
                </Link>
              ) : null;

            case 'tools': {
              const live = TOOLS.filter((t) => t.href).slice(0, block.count ?? 4);
              const plain = block.style !== 'ملوّن';
              return (
                <div key="tools" className={`strip${plain ? '' : ' loud'}`}>
                  {live.map((t) => (
                    <Link key={t.id} href={t.href} className="strip-a"
                      style={plain ? undefined
                        : { background: `linear-gradient(140deg, ${t.from}, ${t.to})` }}>
                      <span className="strip-ic"><Icon name={t.icon} size={19} /></span>
                      <b>{t.label}</b>
                    </Link>
                  ))}
                  <Link href="/tools" className="strip-a all">
                    <span className="strip-ic"><Icon name="dots" size={19} /></span>
                    <b>الكل</b>
                  </Link>
                </div>
              );
            }

            case 'composer':
              return !me.promo ? <PickPromo key="composer" /> : (
                <div className="composer" key="composer">
                  <div className="composer-top">
                    <div className="av" style={{ width: 40, height: 40, fontSize: 13, background: 'var(--purple)' }}>
                      {me.name.slice(0, 2)}
                    </div>
                    <textarea
                      ref={field}
                      className="composer-field"
                      dir="auto"
                      rows={1}
                      placeholder="شارك شيئًا مع دفعتك…"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="composer-files">
                      {files.map((f, i) => (
                        <div key={i} className={`cf${f.pending ? ' pending' : ''}`}>
                          {f.thumb
                            ? <img src={f.thumb} alt="" />
                            : <span className="cf-ic"><Icon name="file" size={17} /></span>}
                          <button className="cf-x" onClick={() => drop(i)} aria-label="أزل">×</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {(body.trim() || files.length > 0) && subjects.length > 0 && (
                    <select className="composer-sub" value={module}
                            onChange={(e) => setModule(e.target.value)}>
                      <option value="">بلا مادة</option>
                      {subjects.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
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
              );

            case 'subjects':
              return subjects.length === 0 ? null : (
                <div key="subjects">
                  <div className="eyebrow" style={{ margin: '0 2px 8px' }}>موادك</div>
                  <div className="subs">
                    {subjects.map((m) => (
                      <Link key={m.id} href={`/archive/${m.id}`} className="sub">
                        {m.banner
                          ? <img src={m.banner} alt={m.name} />
                          : <div className={`sub-none tint-${m.tint}`}><span dir="ltr">{m.name}</span></div>}
                      </Link>
                    ))}
                  </div>
                </div>
              );

            case 'feed':
              return posts.length > 0
                ? <div key="feed" className="home-feed">
                    {posts.map((p) => <Post key={p.id} post={p} me={me} />)}
                  </div>
                : (
                  <div className="empty" key="feed">
                    <div className="tile tint-purple"><Icon name="msg" size={24} /></div>
                    <div className="empty-t">لا منشورات بعد</div>
                    <div className="empty-b">كن أول من ينشر في دفعتك.</div>
                  </div>
                );

            default:
              return null;
          }
        })}
      </div>
    </>
  );
}
