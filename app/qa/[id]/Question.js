'use client';

// One question, and what people said.

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Flag from '@/components/Flag';
import { useT } from '@/components/Lang';

const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';
const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);
// Somebody else's question or answer can be reported, and its author blocked.
const whom = (p, me) => (p?.id && p.id !== me ? { id: p.id, name: name(p) } : null);

export default function Question({ post, subject, answers: first, me }) {
  const t = useT();
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
    if (!res.ok) { setError(data.error || t('تعذّر الإرسال ({status})', { status: res.status })); return; }
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
          <Link href="/qa" className="icobtn" aria-label={t('رجوع')}><Icon name="chevR" size={19} /></Link>
          <div className="grow">
            <div className="head-t">{t('سؤال')}</div>
            <div className="head-s">
              {subject ? <span dir="ltr">{subject}</span> : t('من دفعتك')}
              {post.answered ? t(' · مُجاب') : ''}
            </div>
          </div>
        </div>
      </header>

      <div className="scroll">
        <div className="qa-full">
          <div className="post-head" style={{ padding: 0 }}>
            <div className="av" style={{ width: 36, height: 36, fontSize: 12, background: '#A8502A' }}>
              {initials(post.author)}
            </div>
            <div className="grow">
              <div className="post-name"><b>{name(post.author)}</b></div>
            </div>
            {whom(post.author, me.id) && (
              <div className="post-more">
                <Flag type="post" id={post.id} person={whom(post.author, me.id)}
                  onBlocked={() => window.location.assign('/qa')} />
              </div>
            )}
          </div>
          <div className="qa-body" dir="auto">{post.body}</div>
        </div>

        <div className="eyebrow" style={{ margin: '4px 2px 0' }}>
          {answers.length ? t('{length} ردّ', { length: answers.length }) : t('لا ردود بعد')}
        </div>

        {answers.map((a) => (
          <div key={a.id} className={`ans${a.accepted ? ' ok' : ''}`}>
            <div className="ans-top">
              <div className="av" style={{ width: 30, height: 30, fontSize: 11, background: 'var(--olive)' }}>
                {initials(a.author)}
              </div>
              <b className="grow">{name(a.author)}</b>
              {a.accepted && <span className="pill ans-tag"><Icon name="check" size={13} />{' '}{t('الجواب')}</span>}
              {whom(a.author, me.id) && (
                <Flag type="comment" id={a.id} person={whom(a.author, me.id)} className="ans-more" size={16} />
              )}
            </div>
            <div className="ans-body" dir="auto">{a.body}</div>
            {me.asked && (
              <button className="ans-pick" onClick={() => accept(a.id)}>
                {a.accepted ? t('ألغِ الاختيار') : t('هذا هو الجواب')}
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
          placeholder={t('اكتب ردًّا…')} aria-label={t('ردّك')} />
        <button disabled={!draft.trim() || busy} onClick={answer} aria-label={t('أرسل')}>
          <Icon name="send" size={19} />
        </button>
      </div>
    </>
  );
}
