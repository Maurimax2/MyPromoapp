'use client';

// الرئيسية — the front page.
//
// Three things in a fixed order, decided by looking at them side by side:
// somewhere to post, then every tool the app has or will have, then your
// subjects as pictures, then what your promo is saying.
//
// The tools come before the pictures on purpose. A student who opened the app
// to do questions gets there without scrolling; the banners are big enough to
// pull the eye anyway.

import Link from 'next/link';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import PostCard from '@/components/PostCard';
import { POSTS, MODULES, bannerFor, fileCount } from '@/lib/data';

// Everything the app has or will have, EXCEPT what the bottom nav already
// carries. الملخصات and الأرشيف are tabs; a tile for them as well would be a
// second button to the same page.
const TOOLS = [
  { id: 'quiz',     label: 'اختبر نفسك', icon: 'quiz',  href: '/quiz',     from: '#6B21B5', to: '#8B5CF6' },
  { id: 'lectures', label: 'المحاضرات',  icon: 'book',  href: '/lectures', from: '#F97316', to: '#FDBA74' },
  { id: 'qa',       label: 'سؤال وجواب',  icon: 'msg' },
  { id: 'chat',     label: 'المحادثات',   icon: 'send' },
  { id: 'rooms',    label: 'غرف الدراسة', icon: 'person' },
  { id: 'duel',     label: 'تحدّي زميلك', icon: 'flask' },
  { id: 'review',   label: 'المراجعة',    icon: 'clock' },
  { id: 'points',   label: 'النقاط',      icon: 'check' },
  { id: 'models',   label: 'نماذج 3D',    icon: 'atom' },
  { id: 'timetable',label: 'جدول الحصص',  icon: 'clock' },
];

const PROMO = 'pcem2';

export default function Feed() {
  const subjects = MODULES.filter((m) => m.promo === PROMO && fileCount(m) > 0);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Logo size={34} id="feed" />
          <div className="head-t">الرئيسية</div>
          <button className="icobtn" aria-label="الإشعارات"><Icon name="bell" size={19} /></button>
          <div className="av" style={{ width: 38, height: 38, fontSize: 13, background: 'var(--purple)' }}>ه ب</div>
        </div>
      </header>

      <div className="scroll" style={{ gap: 14 }}>
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

        <div className="rail">
          {TOOLS.map((t) => (t.href ? (
            <Link
              key={t.id}
              href={t.href}
              className="tool-a"
              style={{ background: `linear-gradient(140deg, ${t.from}, ${t.to})` }}
            >
              <span className="tool-a-ic"><Icon name={t.icon} size={24} /></span>
              <b>{t.label}</b>
            </Link>
          ) : (
            <div key={t.id} className="tool-a off" aria-disabled="true">
              <span className="tool-a-soon">قريبًا</span>
              <b>{t.label}</b>
            </div>
          )))}
        </div>

        <div className="eyebrow" style={{ margin: '0 2px' }}>موادك</div>
        <div className="subs">
          {subjects.map((m) => {
            const banner = bannerFor(m.id);
            return (
              <Link key={m.id} href={`/archive/${m.id}`} className="sub">
                {banner
                  ? <img src={banner} alt={m.name} />
                  : (
                    <div className={`sub-none tint-${m.tint}`}>
                      <span dir="ltr">{m.name}</span>
                    </div>
                  )}
              </Link>
            );
          })}
        </div>

        {POSTS.length > 0
          ? POSTS.map((p) => <PostCard key={p.id} post={p} />)
          : (
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
