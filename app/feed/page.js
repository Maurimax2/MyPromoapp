'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import PostCard from '@/components/PostCard';
import { POSTS } from '@/lib/data';

// The feed spans every promo. Each post carries its author's promo badge,
// so you can tell at a glance whether an answer comes from your own year.
export default function Feed() {
  const [tab, setTab] = useState('all');
  const posts = tab === 'all' ? POSTS : POSTS.filter((p) => p.promo === 'pcem2');

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Logo size={34} id="feed" />
          <div className="head-t">الرئيسية</div>
          <button className="icobtn" aria-label="الإشعارات"><Icon name="bell" size={19} /></button>
          <div className="av" style={{ width: 38, height: 38, fontSize: 13, background: 'var(--purple)' }}>ه ب</div>
        </div>
        <div className="tabs">
          <button data-on={tab === 'all'} onClick={() => setTab('all')}>كل الدفعات</button>
          <button data-on={tab === 'mine'} onClick={() => setTab('mine')}>دفعتي</button>
        </div>
      </header>

      <div className="scroll">
        <div className="composer">
          <div className="composer-top">
            <div className="av" style={{ width: 40, height: 40, fontSize: 13, background: 'var(--purple)' }}>ه ب</div>
            <div className="composer-field">شارك شيئًا مع دفعتك…</div>
          </div>
          <div className="composer-acts">
            <button><span className="ic-img"><Icon name="image" size={19} /></span>صورة</button>
            <button><span className="ic-pdf"><Icon name="file" size={19} /></span>ملف</button>
            <button><Icon name="msg" size={19} />سؤال</button>
          </div>
        </div>

        <Link href="/lectures" className="card today">
          <div className="today-ic"><Icon name="clock" size={19} /></div>
          <div className="grow">
            <div className="nm" style={{ fontSize: 14 }}>محاضرات اليوم</div>
            <div className="mt">3 محاضرات · الثلاثاء 4 سبتمبر</div>
          </div>
          <span className="chev"><Icon name="chev" size={18} /></span>
        </Link>

        {posts.map((p) => <PostCard key={p.id} post={p} />)}

        {posts.length === 0 && (
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
