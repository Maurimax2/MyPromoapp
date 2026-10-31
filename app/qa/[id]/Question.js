'use client';

// One question, and what people said.

import { useState } from 'react';
import Link from '@/components/Link';
import Icon from '@/components/Icon';
import Flag from '@/components/Flag';
import { useT } from '@/components/Lang';
import { ago } from '@/lib/i18n';

const name = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';
// The same face as on the post in the feed (components/Post.js).
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A', '#5B3A6B', '#2F5560'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};
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
        {/* The question first and big, then who asked it — it is kept here
            for whoever has the same question next year. */}
        <div className="qa-full">
          <span className="pv-kind question">{t('سؤال')}</span>
          <div className="qa-q" dir="auto">{post.body}</div>
          <div className="qa-by">
            <span className="pv-av" style={{ background: faceOf(post.author?.id) }}>{initials(post.author)}</span>
            <span className="grow">
              <b>{t('سؤال من {name}', { name: name(post.author) })}</b>
              <s suppressHydrationWarning>{ago(t, post.created_at, { dateAfterWeek: true })}</s>
            </span>
            {whom(post.author, me.id) && (
              <div className="post-more">
                <Flag type="post" id={post.id} person={whom(post.author, me.id)}
                  onBlocked={() => window.location.assign('/qa')} />
              </div>
            )}
          </div>
        </div>

        <div className="eyebrow" style={{ margin: '4px 2px 0' }}>
          {answers.length ? t('{length} ردّ', { length: answers.length }) : t('لا ردود بعد')}
        </div>

        {answers.map((a) => (
          <div key={a.id} className={`ans${a.accepted ? ' ok' : ''}`}>
            <div className="ans-top">
              <span className="pv-av ans-av" style={{ background: faceOf(a.author?.id) }}>{initials(a.author)}</span>
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
