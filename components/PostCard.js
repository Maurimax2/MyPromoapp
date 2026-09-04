'use client';
import { useState } from 'react';
import Icon from './Icon';
import { promoById } from '@/lib/data';

function Media({ a }) {
  if (!a) return null;
  if (a.kind === 'image') {
    return (
      <div className="post-media post-photo">
        <Icon name="image" size={30} />
        <span>{a.caption}</span>
      </div>
    );
  }
  return (
    <div className="post-media">
      <a className="post-file" href={a.href} target="_blank" rel="noopener noreferrer">
        <div className="tile tint-orange"><Icon name="file" size={19} /></div>
        <div className="grow">
          <div className="post-file-nm">{a.name}</div>
          <div className="post-file-mt">{a.ext} · {a.mb} MB</div>
        </div>
        <span className="chev"><Icon name="download" size={18} /></span>
      </a>
    </div>
  );
}

export default function PostCard({ post }) {
  const promo = promoById(post.promo);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <article className="post">
      <div className="post-head">
        <div className="av" style={{ width: 44, height: 44, fontSize: 14, background: post.colour }}>
          {post.initials}
        </div>
        <div className="grow">
          <div className="post-name">
            <b>{post.author}</b>
            <span className="pill solid" style={{ background: promo.badge, fontSize: 10.5, padding: '3px 8px' }}>
              {promo.name}
            </span>
          </div>
          <div className="post-meta">{post.field} · {post.when}</div>
        </div>
        <button className="chev" aria-label="خيارات المنشور"><Icon name="dots" size={18} /></button>
      </div>

      <p className="post-body">{post.body}</p>

      <Media a={post.attachment} />

      <div className="post-tagrow"><span className="pill">{post.tag}</span></div>

      <div className="post-counts">
        <span className="heart"><Icon name="heartFill" size={11} /></span>
        <span>{likes}</span>
        <span className="dot" style={{ margin: '0 4px' }} />
        <span>{post.comments} تعليق</span>
        <span className="dot" style={{ margin: '0 4px' }} />
        <span>{post.saves} حفظ</span>
      </div>

      <div className="post-acts">
        <button data-on={liked} onClick={() => setLiked(!liked)} aria-pressed={liked}>
          <Icon name={liked ? 'heartFill' : 'heart'} size={18} />إعجاب
        </button>
        <button><Icon name="msg" size={18} />تعليق</button>
        <button data-on={saved} onClick={() => setSaved(!saved)} aria-pressed={saved}>
          <Icon name="bookmark" size={18} />حفظ
        </button>
        <button><Icon name="send" size={18} />مشاركة</button>
      </div>
    </article>
  );
}
