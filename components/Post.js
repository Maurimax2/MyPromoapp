'use client';

// One post in the feed.
//
// Liking is optimistic — the heart fills the moment you press it and the
// request follows, because waiting 400ms to see your own tap is what makes an
// app feel dead. If the request fails, it goes back.

import { useState } from 'react';
import Sheet from './Sheet';
import Icon from './Icon';
import Flag from './Flag';
import { useT } from '@/components/Lang';
import { ago } from '@/lib/i18n';

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');


const initials = (p) =>
  (p?.full_name || p?.email || '؟').trim().slice(0, 2);
const nameOf = (p) => p?.full_name || p?.email?.split('@')[0] || '';
// Who to block from a post or a reply — nobody, when it is your own.
const whom = (p, me) => (p?.id && p.id !== me ? { id: p.id, name: nameOf(p) } : null);

export default function Post({ post, me }) {
  const t = useT();
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes || 0);
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState(null);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [menu, setMenu] = useState(false);

  const remove = async () => {
    setMenu(false);
    const res = await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: post.id }),
    });
    if (res.ok) window.location.reload();
  };

  const like = async () => {
    const on = !liked;
    if (on) { try { navigator.vibrate?.(10); } catch { /* not a phone */ } }
    setLiked(on); setLikes((n) => n + (on ? 1 : -1));
    const res = await fetch('/api/posts/like', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ post: post.id, on }),
    });
    if (!res.ok) { setLiked(!on); setLikes((n) => n + (on ? -1 : 1)); }
  };

  const show = async () => {
    setOpen((o) => !o);
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
    setReplies((r) => [...(r || []), made]);
    setDraft('');
  };

  return (
    <article className="post">
      <div className="post-head">
        <div className="av" style={{ width: 38, height: 38, fontSize: 12, background: '#A8502A' }}>
          {initials(post.author)}
        </div>
        <div className="grow">
          <div className="post-name">
            <b>{post.author?.full_name || post.author?.email?.split('@')[0] || t('طالب')}</b>
            {post.author?.promo && (
              <span className="pill" style={{ fontSize: 11, padding: '2px 7px' }}>
                {post.author.promo.toUpperCase()}
              </span>
            )}
          </div>
          {/* The server renders this a few seconds before the browser does,
              and "قبل 19 دقيقة" against "قبل 20 دقيقة" is a hydration error
              on every feed load. The difference is the point of the label,
              so the mismatch is allowed rather than designed away. */}
          <div className="post-meta" suppressHydrationWarning>
            {ago(t, post.created_at, { dateAfterWeek: true })}
            {/* The subject stays in French, like everything that names study
                material. */}
            {post.subject && <> · <span dir="ltr">{post.subject}</span></>}
          </div>
        </div>

        {/* Every post needs a way to be objected to. Apple requires it for an
            app carrying what students write, and a promo needs it the first
            time somebody posts something they should not have. */}
        <div className="post-more">
          {post.author?.id === me.id ? (
            <button onClick={() => setMenu((m) => !m)} aria-label={t('خيارات')}>
              <Icon name="dots" size={18} />
            </button>
          ) : (
            <Flag type="post" id={post.id} person={whom(post.author, me.id)} />
          )}
        </div>

        {/* A sheet, not a popover under the dots.

            It used to be a small menu with nothing behind it, which meant
            tapping anywhere else did not close it — the only way out was to
            find the same three dots again. A sheet comes up from the bottom
            where a thumb already is, and the screen behind it is dimmed and
            blurred, which is both what says "this is over everything" and
            what gives the tap-to-dismiss somewhere to land. */}
        {menu && (
          <Sheet onClose={() => setMenu(false)}>
            <button className="sheet-act warn" onClick={remove}>{t('احذف منشوري')}</button>
            <button className="sheet-act quiet" onClick={() => setMenu(false)}>{t('إلغاء')}</button>
          </Sheet>
        )}
      </div>

      {post.body && <div className="post-body" dir="auto">{post.body}</div>}

      {post.media?.length > 0 && (
        <div className="post-media">
          {post.media.map((m, i) => (m.kind === 'image' ? (
            <img key={i} className="post-photo-real" src={m.url} alt="" loading="lazy" />
          ) : (
            <a key={i} className="post-file" href={m.url} target="_blank" rel="noreferrer">
              <div className="tile tint-olive"><Icon name="file" size={20} /></div>
              <div className="grow">
                <div className="post-file-nm" dir="ltr">{m.name || t('ملف')}</div>
                <div className="post-file-mt" dir="ltr">{mb(m.bytes)}</div>
              </div>
              <Icon name="download" size={18} />
            </a>
          )))}
        </div>
      )}

      <div className="post-acts">
        <button onClick={like} data-on={liked}>
          {/* Keyed on the state, so each like starts the pop over; the little
              hearts only fly when it is a like, never when it is taken back. */}
          <span className={`heart${liked ? ' pop' : ''}`} key={liked ? 'on' : 'off'}>
            <Icon name={liked ? 'heartFill' : 'heart'} size={18} />
            {liked && <span className="heart-burst" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>}
          </span>
          {likes || ''}
        </button>
        <button onClick={show}>
          <Icon name="msg" size={18} />{post.comments || ''}
        </button>
      </div>

      {open && (
        <div className="replies">
          {replies === null && <div className="replies-wait">…</div>}
          {replies?.map((c) => (
            <div key={c.id} className="reply">
              <div className="av" style={{ width: 30, height: 30, fontSize: 11, background: 'var(--olive)' }}>
                {initials(c.author)}
              </div>
              <div className="grow">
                <b>{c.author?.full_name || c.author?.email?.split('@')[0] || t('طالب')}</b>
                <div dir="auto">{c.body}</div>
              </div>
              {whom(c.author, me.id) && (
                <Flag type="comment" id={c.id} person={whom(c.author, me.id)} className="reply-more" size={16} />
              )}
            </div>
          ))}
          {replies?.length === 0 && <div className="replies-wait">{t('لا ردود بعد.')}</div>}

          <div className="reply-new">
            <input
              value={draft} dir="auto" onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && reply()}
              placeholder={t('اكتب ردًّا…')} aria-label={t('ردّك')} />
            <button disabled={!draft.trim() || busy} onClick={reply} aria-label={t('أرسل')}>
              <Icon name="send" size={18} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
