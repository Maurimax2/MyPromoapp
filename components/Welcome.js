'use client';

// The first time a student opens the app: a welcome, and five screens that say
// what it is for.
//
// Shown once per phone (localStorage), never to somebody still waiting for
// approval, and again on demand from أنا → «جولة في التطبيق» (`/feed?tour=1`).
// It is drawn into <body> for the same reason Sheet is: a transformed
// ancestor makes `position: fixed` mean «fixed to me».
//
// Swipe or tap. In a right-to-left screen the next page is the one to the
// left, so a finger moving right turns forward.

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';

const KEY = 'mypromo.welcome';

const SLIDES = [
  {
    art: null,
    title: (name) => `أهلًا بك يا ${name}`,
    body: 'هذه النسخة التجريبية الأولى من MyPromo، صُنعت لطلاب الطب والصيدلة وطب الأسنان في نواكشوط. '
      + 'أنت من أوائل من يجرّبها — ورأيك هو ما سيصنع النسخة القادمة.',
    points: [],
  },
  {
    art: ['crane', 'coeur', 'poumons'],
    title: () => 'محاضراتك كلها هنا',
    points: [
      ['book', 'الأرشيف', 'مواد سنتك ومحاضراتها، تُفتح داخل التطبيق مباشرة.'],
      ['box', 'نماذج ثلاثية الأبعاد', 'في مواد التشريح: أدر العضو والمس أي جزء لتعرف اسمه.'],
    ],
  },
  {
    art: null,
    next: true,
    title: () => 'محاضرتك القادمة أمامك',
    points: [
      ['calendar', 'جدول الكلية', 'يقرأ التطبيق جدول سنتك، فتجد في أعلى الرئيسية ما ينتظرك.'],
      ['book', 'راجعها قبل أن تبدأ', 'لمسة واحدة تفتح المحاضرة أو المادة، ولمسة أخرى تفتح الجدول كاملًا.'],
    ],
  },
  {
    art: ['encephale', 'reins', 'globules'],
    title: () => 'اختبر نفسك',
    points: [
      ['quiz', 'QCM في كل مادة', 'أجب، وانظر الجواب وشرحه فورًا.'],
      ['clock', 'ما تخطئ فيه يعود إليك', 'تعرض عليك المراجعة الأسئلة التي أخطأت فيها في وقتها المناسب.'],
      ['swords', 'تحدَّ زميلًا', 'مبارزة QCM بينك وبين أي زميل في دفعتك.'],
    ],
  },
  {
    art: null,
    friends: true,
    title: () => 'أنت وزملاؤك',
    points: [
      ['file', 'شارك واسأل', 'انشر ملخّصًا، أو اسأل دفعتك، أو أجب زميلًا.'],
      ['video', 'غرف الدراسة', 'ادرس مع زملائك في غرفة مباشرة.'],
      ['award', 'نقاط وشارات', 'كل ما يفيد زميلك يرفعك في الترتيب.'],
    ],
  },
];

/** What the third slide shows: the card students will see at the top of الرئيسية. */
function MiniCard() {
  return (
    <span className="wl-mini">
      <span className="wl-mini-art"><img src="/art/coeur.webp" alt="" /></span>
      <span className="grow">
        <s>المحاضرة القادمة · بعد ساعة</s>
        <b dir="ltr">Sémiologie cardiologique</b>
        <em dir="ltr">15:00–16:30</em>
      </span>
    </span>
  );
}

export default function Welcome({ name, ready = true }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [host, setHost] = useState(null);
  const from = useRef(null);

  useEffect(() => {
    setHost(document.body);
    if (!ready) return;
    const asked = new URLSearchParams(window.location.search).has('tour');
    let seen = false;
    try { seen = !!localStorage.getItem(KEY); } catch { /* private window: show it once per visit */ }
    if (asked || !seen) setOpen(true);
  }, [ready]);

  // The page behind must not scroll under it.
  useEffect(() => {
    if (!open) return undefined;
    const was = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = was; };
  }, [open]);

  const done = () => {
    try { localStorage.setItem(KEY, String(Date.now())); } catch { /* fine */ }
    setOpen(false);
    // `?tour=1` has done its job; leaving it in the address would reopen this
    // on every refresh.
    if (new URLSearchParams(window.location.search).has('tour')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  if (!open || !host) return null;
  const last = step === SLIDES.length - 1;
  const s = SLIDES[step];
  const first = (name || '').split(' ')[0] || 'زميلي';

  const go = (n) => setStep(Math.max(0, Math.min(SLIDES.length - 1, n)));

  return createPortal(
    <div className="wl" role="dialog" aria-modal="true" aria-label="جولة في التطبيق"
         onTouchStart={(e) => { from.current = e.touches[0].clientX; }}
         onTouchEnd={(e) => {
           if (from.current == null) return;
           const dx = e.changedTouches[0].clientX - from.current;
           from.current = null;
           if (Math.abs(dx) > 50) go(step + (dx > 0 ? 1 : -1));
         }}>
      <div className="wl-top">
        {step > 0 ? <button className="wl-back" onClick={() => go(step - 1)}>رجوع</button> : <span />}
        {!last && <button className="wl-skip" onClick={done}>تخطَّ</button>}
      </div>

      <div className="wl-page" key={step}>
        <div className={`wl-vis${s.art ? '' : step === 0 ? ' hero' : ''}`}>
          {step === 0 && <span className="wl-logo"><Logo size={74} white /></span>}
          {s.next && <MiniCard />}
          {s.friends && (
            <span className="wl-faces">
              {['#A8502A', '#14555F', '#8A6A14', '#4B5B3A'].map((c, i) => (
                <i key={c} style={{ background: c, animationDelay: `${i * 0.08}s` }}>{['ن', 'م', 'س', 'ع'][i]}</i>
              ))}
            </span>
          )}
          {s.art && s.art.map((a, i) => (
            <img key={a} src={`/art/${a}.webp`} alt="" className={`wl-art a${i}`} />
          ))}
        </div>

        <h2 className="wl-title">{s.title(first)}</h2>
        {s.body && <p className="wl-body">{s.body}</p>}

        {s.points.length > 0 && (
          <ul className="wl-points">
            {s.points.map(([icon, head, text]) => (
              <li key={head}>
                <span className="wl-ic"><Icon name={icon} size={19} /></span>
                <span><b>{head}</b><s>{text}</s></span>
              </li>
            ))}
          </ul>
        )}

        {last && (
          <Link href="/feedback" className="wl-note" onClick={done}>
            عندك رأي أو وجدت خطأً؟ <b>شاركنا في دقيقة</b>
          </Link>
        )}
      </div>

      <div className="wl-foot">
        <span className="wl-dots" aria-hidden="true">
          {SLIDES.map((_, i) => <i key={i} data-on={i === step} />)}
        </span>
        <button className="wl-next" onClick={() => (last ? done() : go(step + 1))}>
          {last ? 'ابدأ' : 'التالي'}
        </button>
      </div>
    </div>,
    host,
  );
}
