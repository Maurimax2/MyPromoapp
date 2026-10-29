'use client';

// One post in the feed (design/v2-feed.html, approved 2026-10).
//
// Who wrote it, in which year, about which subject and what it is (a résumé,
// a question); what it says; its file as a card in the subject's colours or
// its photo; then the heart, the replies, and a bookmark. Replies open in a
// sheet over the feed, in bubbles, with the box at the bottom where a thumb is.
//
// Liking is optimistic — the heart fills the moment you press it and the
// request follows, because waiting 400ms to see your own tap is what makes an
// app feel dead. If the request fails, it goes back. A double tap on the
// photo or the file likes it too, with a heart over it.

import { useRef, useState } from 'react';
import Sheet from './Sheet';
import Icon from './Icon';
import Flag from './Flag';
import { SubjectTile } from './SubjectBanner';
import { glyphOf } from '@/lib/subjectArt';
import { useT } from '@/components/Lang';
import { ago } from '@/lib/i18n';

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

// A face needs a colour, and it has to be the same colour tomorrow, so it is
// read off the id rather than handed out (the same rule as الرئيسية's).
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A', '#5B3A6B', '#2F5560'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};
const initials = (p) => (p?.full_name || p?.email || '؟').trim().slice(0, 2);
const nameOf = (p) => p?.full_name || p?.email?.split('@')[0] || '';
// Who to block from a post or a reply — nobody, when it is your own.
const whom = (p, me) => (p?.id && p.id !== me ? { id: p.id, name: nameOf(p) } : null);

export default function Post({ post, me }) {
  const t = useT();
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes || 0);
  const [saved, setSaved] = useState(!!post.saved);
  const [count, setCount] = useState(post.comments || 0);
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState(null);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [menu, setMenu] = useState(false);
  const [burst, setBurst] = useState(0);   // the big heart over a double-tapped picture
  const field = useRef(null);

  const remove = async () => {
    setMenu(false);
    const res = await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: post.id }),
    });
    if (res.ok) window.location.reload();
  };

  const like = async (on = !liked) => {
    if (on === liked) return;
    if (on) { try { navigator.vibrate?.(10); } catch { /* not a phone */ } }
    setLiked(on); setLikes((n) => n + (on ? 1 : -1));
    const res = await fetch('/api/posts/like', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ post: post.id, on }),
    });
    if (!res.ok) { setLiked(!on); setLikes((n) => n + (on ? -1 : 1)); }
  };

  // A double tap always likes, never unlikes — that is what it means
  // everywhere else a picture can be double-tapped.
  const love = () => { setBurst((b) => b + 1); like(true); };

  const keep = async () => {
    const on = !saved;
    setSaved(on);
    const res = await fetch('/api/saves', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ post: post.id, on }),
    });
    if (!res.ok) setSaved(!on);
  };

  const show = async () => {
    setOpen(true);
    if (replies) return;
    const res = await fetch(`/api/posts/comments?post=${post.id}`);
    setReplies(res.ok ? (await res.json()).comments || [] : []);
  };

  const reply = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setBusy(true);
    const res = await fetch('/api/posts/comment', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ post: post.id, body: text }),
    });
    setBusy(false);
    if (!res.ok) return;
    const made = await res.json();
    setReplies((r) => [...(r || []), { ...made, author: { id: me.id, full_name: me.name } }]);
    setCount((n) => n + 1);
    setDraft('');
  };

  const author = post.author || {};
  const kind = post.kind === 'note' ? t('ملخص') : post.kind === 'question' ? t('سؤال') : null;
  const shades = glyphOf(post.subject || '');

  return (
    <article className="pv">
      <header className="pv-head">
        <span className="pv-av" style={{ background: faceOf(author.id) }}>{initials(author)}</span>
        <div className="grow">
          <div className="pv-name">
            <b>{nameOf(author) || t('طالب')}</b>
            {post.year && (
              <span className="pv-year" style={{ '--y': post.year.badge }} dir="ltr">{post.year.name}</span>
            )}
          </div>
          {/* The server renders this a few seconds before the browser does,
              and "قبل 19 دقيقة" against "قبل 20 دقيقة" is a hydration error
              on every feed load. The difference is the point of the label,
              so the mismatch is allowed rather than designed away. */}
          <div className="pv-meta" suppressHydrationWarning>
            <span>{ago(t, post.created_at, { dateAfterWeek: true })}</span>
            {/* The subject stays in French, like everything that names study
                material. */}
            {post.subject && (
              <span className="pv-subj"><SubjectTile name={post.subject} size={18} radius={6} /><span dir="ltr">{post.subject}</span></span>
            )}
          </div>
        </div>

        {/* Every post needs a way to be objected to. Apple requires it for an
            app carrying what students write, and a promo needs it the first
            time somebody posts something they should not have. */}
        <div className="post-more">
          {author.id === me.id ? (
            <button onClick={() => setMenu((m) => !m)} aria-label={t('خيارات')}>
              <Icon name="dots" size={18} />
            </button>
          ) : (
            <Flag type="post" id={post.id} person={whom(author, me.id)} />
          )}
        </div>

        {menu && (
          <Sheet onClose={() => setMenu(false)}>
            <button className="sheet-act warn" onClick={remove}>{t('احذف منشوري')}</button>
            <button className="sheet-act quiet" onClick={() => setMenu(false)}>{t('إلغاء')}</button>
          </Sheet>
        )}
      </header>

      {kind && <span className={`pv-kind ${post.kind}`}>{kind}</span>}
      {post.body && <div className="pv-body" dir="auto">{post.body}</div>}

      {post.media?.length > 0 && (
        <div className="pv-media" onDoubleClick={love}>
          {post.media.map((m, i) => (m.kind === 'image' ? (
            <img key={i} className="pv-photo" src={m.url} alt="" loading="lazy" />
          ) : (
            <a key={i} className="pv-file" href={m.url} target="_blank" rel="noreferrer"
               style={{ '--a': shades.a, '--b': shades.b }}>
              <span className="grow">
                <b dir="ltr">{m.name || t('ملف')}</b>
                <span dir="ltr">{mb(m.bytes)}</span>
              </span>
              <span className="pv-paper" aria-hidden="true"><i /><i /><i /><i /><i /></span>
            </a>
          )))}
          {burst > 0 && <span key={burst} className="pv-love" aria-hidden="true"><Icon name="heartFill" size={84} /></span>}
        </div>
      )}

      <div className="pv-acts">
        <button onClick={() => like()} data-on={liked} aria-label={t('أعجبني')}>
          {/* Keyed on the state, so each like starts the pop over; the little
              hearts only fly when it is a like, never when it is taken back. */}
          <span className={`heart${liked ? ' pop' : ''}`} key={liked ? 'on' : 'off'}>
            <Icon name={liked ? 'heartFill' : 'heart'} size={22} />
            {liked && <span className="heart-burst" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>}
          </span>
          {likes > 0 && <span>{likes}</span>}
        </button>
        <button onClick={show} aria-label={t('الردود')}>
          <Icon name="msg" size={22} />{count > 0 && <span>{count}</span>}
        </button>
        <span className="grow" />
        <button onClick={keep} data-on={saved} className="pv-keep" aria-label={saved ? t('محفوظ') : t('احفظ')}>
          <Icon name="bookmark" size={22} weight={saved ? 'fill' : undefined} />
        </button>
      </div>

      {count > 0 && (
        <button className="pv-more" onClick={show}>{t('عرض التعليقات ({count})', { count })}</button>
      )}

      {open && (
        <Sheet onClose={() => setOpen(false)}>
          <div className="cm-head"><b>{t('التعليقات')}</b>{count > 0 && <span className="cm-n">{count}</span>}</div>
          <div className="cm-list">
            {replies === null && <div className="cm-empty">…</div>}
            {replies?.map((c) => (
              <div key={c.id} className="cm">
                <span className="cm-av" style={{ background: faceOf(c.author?.id) }}>{initials(c.author)}</span>
                <div className="cm-bub">
                  <b>
                    {nameOf(c.author) || t('طالب')}
                    {c.author?.id && c.author.id === author.id && <i className="cm-op">{t('الكاتب')}</i>}
                  </b>
                  <div dir="auto">{c.body}</div>
                  <span className="cm-when" suppressHydrationWarning>{ago(t, c.created_at)}</span>
                </div>
                {whom(c.author, me.id) && (
                  <Flag type="comment" id={c.id} person={whom(c.author, me.id)} className="reply-more" size={16} />
                )}
              </div>
            ))}
            {replies?.length === 0 && <div className="cm-empty">{t('لا ردود بعد.')}</div>}
          </div>
          <div className="cm-new">
            <span className="cm-av" style={{ background: faceOf(me.id) }}>{(me.name || '؟').slice(0, 2)}</span>
            <input
              ref={field} value={draft} dir="auto" onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && reply()}
              placeholder={t('اكتب تعليقًا…')} aria-label={t('ردّك')} />
            <button disabled={!draft.trim() || busy} onClick={reply} aria-label={t('أرسل')}>
              <Icon name="send" size={19} />
            </button>
          </div>
        </Sheet>
      )}
    </article>
  );
}
