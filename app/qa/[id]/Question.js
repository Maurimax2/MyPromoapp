'use client';

// One question, and what people said.

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';
const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);

export default function Question({ post, subject, answers: first, me }) {
  const [answers, setAnswers] = useState(first);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const answer = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/posts/comment', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ post: post.id, body: text }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر الإرسال (${res.status})`); return; }
    setAnswers((a) => [...a, { ...data, accepted: false }]);
    setDraft('');
  };

  const accept = async (id) => {
    const on = !answers.find((a) => a.id === id)?.accepted;
    setAnswers((list) => list.map((a) => ({ ...a, accepted: a.id === id ? on : false })));
    const res = await fetch('/api/qa', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ comment: id, on }),
    });
    if (!res.ok) setAnswers(first);
  };

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/qa" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow">
            <div className="head-t">سؤال</div>
            <div className="head-s">
              {subject ? <span dir="ltr">{subject}</span> : 'من دفعتك'}
              {post.answered ? ' · مُجاب' : ''}
            </div>
          </div>
        </div>
      </header>

      <div className="scroll">
        <div className="qa-full">
          <div className="post-head" style={{ padding: 0 }}>
            <div className="av" style={{ width: 36, height: 36, fontSize: 12, background: '#F97316' }}>
              {initials(post.author)}
            </div>
            <div className="grow">
              <div className="post-name"><b>{name(post.author)}</b></div>
            </div>
          </div>
          <div className="qa-body">{post.body}</div>
        </div>

        <div className="eyebrow" style={{ margin: '4px 2px 0' }}>
          {answers.length ? `${answers.length} ردّ` : 'لا ردود بعد'}
        </div>

        {answers.map((a) => (
          <div key={a.id} className={`ans${a.accepted ? ' ok' : ''}`}>
            <div className="ans-top">
              <div className="av" style={{ width: 30, height: 30, fontSize: 11, background: 'var(--purple)' }}>
                {initials(a.author)}
              </div>
              <b className="grow">{name(a.author)}</b>
              {a.accepted && <span className="pill ans-tag"><Icon name="check" size={13} /> الجواب</span>}
            </div>
            <div className="ans-body">{a.body}</div>
            {me.asked && (
              <button className="ans-pick" onClick={() => accept(a.id)}>
                {a.accepted ? 'ألغِ الاختيار' : 'هذا هو الجواب'}
              </button>
            )}
          </div>
        ))}

        {error && <div className="admin-err">{error}</div>}
      </div>

      <div className="say-new">
        <input
          value={draft} onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && answer()}
          placeholder="اكتب ردًّا…" aria-label="ردّك" />
        <button disabled={!draft.trim() || busy} onClick={answer} aria-label="أرسل">
          <Icon name="send" size={19} />
        </button>
      </div>
    </>
  );
}
