'use client';

// سؤال وجواب.

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';

export default function Ask({ questions, subjects, open, only, me }) {
  const router = useRouter();
  const [asking, setAsking] = useState(false);
  const [body, setBody] = useState('');
  const [module, setModule] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const ask = async (e) => {
    e.preventDefault();
    if (!body.trim() || busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ body, kind: 'question', module: module || null }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر النشر (${res.status})`); return; }
    setBody(''); setAsking(false);
    router.refresh();
  };

  const subject = (id) => subjects.find((s) => s.id === id)?.name;

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/feed" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow">
            <div className="head-t">سؤال وجواب</div>
            <div className="head-s">{open ? `${open} بلا جواب` : 'كل الأسئلة مُجابة'}</div>
          </div>
        </div>
        <div className="seg">
          <Link href="/qa" data-on={!only} className="seg-a">الكل</Link>
          <Link href="/qa?only=open" data-on={only} className="seg-a">بلا جواب</Link>
        </div>
      </header>

      <div className="scroll">
        {error && <div className="admin-err">{error}</div>}

        {asking ? (
          <form className="admin-card admin-seed" onSubmit={ask}>
            <div className="admin-card-t">سؤال جديد</div>
            <textarea
              className="admin-input qa-write" autoFocus rows={4}
              placeholder="اكتب سؤالك…"
              value={body} onChange={(e) => setBody(e.target.value)} aria-label="سؤالك" />
            <select className="admin-input" value={module} onChange={(e) => setModule(e.target.value)}>
              <option value="">بلا مادة</option>
              {subjects.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <div className="usr-acts">
              <button className="btn p sm" disabled={busy || !body.trim()}>اسأل</button>
              <button type="button" className="btn g sm" onClick={() => setAsking(false)}>ألغِ</button>
            </div>
          </form>
        ) : (
          <button className="admin-card admin-import" onClick={() => setAsking(true)}>
            <div className="admin-import-ic"><Icon name="msg" size={22} /></div>
            <div className="grow ct-start">
              <div className="admin-card-t">اسأل دفعتك</div>
              <div className="admin-card-b">من يعرف الجواب سيردّ</div>
            </div>
          </button>
        )}

        {questions.map((q) => (
          <Link key={q.id} href={`/qa/${q.id}`} className="qa">
            <div className="qa-top">
              <span className={`qa-dot${q.answered ? ' done' : ''}`}>
                {q.answered ? <Icon name="check" size={13} /> : '؟'}
              </span>
              <div className="grow">
                <div className="qa-q">{q.body}</div>
                <div className="qa-m">
                  {name(q.author)}
                  {q.module ? ` · ${subject(q.module) || ''}` : ''}
                  {q.comments ? ` · ${q.comments} ردّ` : ''}
                </div>
              </div>
              <span className="chev"><Icon name="chev" size={17} /></span>
            </div>
          </Link>
        ))}

        {!questions.length && !asking && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="msg" size={24} /></div>
            <div className="empty-t">{only ? 'لا أسئلة بلا جواب' : 'لا أسئلة بعد'}</div>
            <div className="empty-b">اسأل أول سؤال — دفعتك ترى الأسئلة كلها.</div>
          </div>
        )}
      </div>
    </>
  );
}
