'use client';

// One post in the feed.
//
// Liking is optimistic — the heart fills the moment you press it and the
// request follows, because waiting 400ms to see your own tap is what makes an
// app feel dead. If the request fails, it goes back.

import { useState } from 'react';
import Icon from './Icon';

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

// "قبل ساعتين" without a date library.
function when(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'الآن';
  const m = Math.floor(s / 60);
  if (m < 60) return `قبل ${m} دقيقة`;
  const h = Math.floor(m / 60);
  if (h < 24) return `قبل ${h} ساعة`;
  const d = Math.floor(h / 24);
  return d < 7 ? `قبل ${d} يوم` : new Date(iso).toLocaleDateString('fr');
}

const initials = (p) =>
  (p?.full_name || p?.email || '؟').trim().slice(0, 2);

export default function Post({ post, me }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes || 0);
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState(null);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [menu, setMenu] = useState(false);

  const report = async () => {
    setMenu(false); setFlagged(true);
    await fetch('/api/report', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'post', id: post.id }),
    });
  };

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
        <div className="av" style={{ width: 38, height: 38, fontSize: 12, background: '#F97316' }}>
          {initials(post.author)}
        </div>
        <div className="grow">
          <div className="post-name">
            <b>{post.author?.full_name || post.author?.email?.split('@')[0] || 'طالب'}</b>
            {post.author?.promo && (
              <span className="pill" style={{ fontSize: 11, padding: '2px 7px' }}>
                {post.author.promo.toUpperCase()}
              </span>
            )}
          </div>
          <div className="post-meta">{when(post.created_at)}</div>
        </div>

        {/* Every post needs a way to be objected to. Apple requires it for an
            app carrying what students write, and a promo needs it the first
            time somebody posts something they should not have. */}
        <div className="post-more">
          <button onClick={() => setMenu((m) => !m)} aria-label="خيارات">
            <Icon name="dots" size={18} />
          </button>
          {menu && (
            <div className="post-menu">
              {post.author?.id === me.id
                ? <button onClick={remove}>احذف منشوري</button>
                : <button onClick={report} disabled={flagged}>
                    {flagged ? 'أُبلغ عنه' : 'أبلغ عن المنشور'}
                  </button>}
            </div>
          )}
        </div>
      </div>

      {post.body && <div className="post-body">{post.body}</div>}

      {post.media?.length > 0 && (
        <div className="post-media">
          {post.media.map((m, i) => (m.kind === 'image' ? (
            <img key={i} className="post-photo-real" src={m.url} alt="" loading="lazy" />
          ) : (
            <a key={i} className="post-file" href={m.url} target="_blank" rel="noreferrer">
              <div className="tile tint-orange"><Icon name="file" size={20} /></div>
              <div className="grow">
                <div className="post-file-nm" dir="ltr">{m.name || 'ملف'}</div>
                <div className="post-file-mt">{mb(m.bytes)}</div>
              </div>
              <Icon name="download" size={18} />
            </a>
          )))}
        </div>
      )}

      <div className="post-acts">
        <button onClick={like} data-on={liked}>
          <Icon name={liked ? 'heartFill' : 'heart'} size={18} />
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
              <div className="av" style={{ width: 30, height: 30, fontSize: 11, background: 'var(--purple)' }}>
                {initials(c.author)}
              </div>
              <div className="grow">
                <b>{c.author?.full_name || c.author?.email?.split('@')[0] || 'طالب'}</b>
                <div>{c.body}</div>
              </div>
            </div>
          ))}
          {replies?.length === 0 && <div className="replies-wait">لا ردود بعد.</div>}

          <div className="reply-new">
            <input
              value={draft} onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && reply()}
              placeholder="اكتب ردًّا…" aria-label="ردّك" />
            <button disabled={!draft.trim() || busy} onClick={reply} aria-label="أرسل">
              <Icon name="send" size={18} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
