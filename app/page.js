'use client';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { POSTS, promoById } from '@/lib/data';

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
        {posts.map((p) => {
          const promo = promoById(p.promo);
          return (
            <article key={p.id} className="card" style={{ padding: 15 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div className="av" style={{ width: 42, height: 42, fontSize: 14, background: p.colour }}>
                  {p.initials}
                </div>
                <div className="grow">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 700 }}>{p.author}</span>
                    <span className="pill solid" style={{ background: promo.badge, fontSize: 10.5, padding: '3px 8px' }}>
                      {promo.name}
                    </span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 3 }}>
                    {p.field} · {p.when}
                  </div>
                </div>
                <button className="chev" aria-label="خيارات"><Icon name="dots" size={18} /></button>
              </div>

              <h2 className="ptitle">{p.title}</h2>
              <p className="pbody">{p.body}</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                <div className="pfoot">
                  <span className="pf"><Icon name="heart" size={17} />{p.likes}</span>
                  <span className="pf"><Icon name="msg" size={17} />{p.comments}</span>
                </div>
                <span className="pill">{p.tag}</span>
              </div>
            </article>
          );
        })}

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
