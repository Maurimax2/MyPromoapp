'use client';

// الدراسة.
//
// The four things you do with the material, then the material itself: every
// year, both semesters, every subject — each as its banner, the same one it
// wears on الرئيسية (design/v2-screens.html, approved 2026-10).
//
// Only two of the tools ever carry a number, because only two can be waiting
// on you: a duel somebody sent, and questions that have come due. Both are
// clay while they are, and plain the rest of the time.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { badgeOf } from '@/lib/data';
import SubjectBanner from '@/components/SubjectBanner';
import { dueCount } from '@/lib/review';
import { useT } from '@/components/Lang';

// S1 and S2 are shown exactly as written — that is what students call them.
const SEMESTERS = ['S1', 'S2'];

const strip = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function Study({ promos, modules: all, mine, waiting = 0,
                                readError = null, fromFile = false }) {
  const t = useT();
  const [promo, setPromo] = useState(
    promos.some((p) => p.id === mine) ? mine : promos[0]?.id);
  const [sem, setSem] = useState('S1');
  const [q, setQ] = useState('');
  // The review schedule lives in this browser, so its count arrives a moment
  // after the page does.
  const [due, setDue] = useState(0);
  useEffect(() => { setDue(dueCount()); }, []);

  // The year chosen here is the same choice الرئيسية shows and اختبر نفسك
  // reads. It used to live only in this component's state, so picking DCEM1
  // here and going to the quiz put you back in your own year.
  const choose = (id) => {
    setPromo(id);
    fetch('/api/promo', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ promo: id }),
    }).catch(() => { /* the list on screen has already moved */ });
  };

  const chosen = promos.find((p) => p.id === promo) || promos[0];
  // A year's own subjects, and — for the pharmacy and dental first years —
  // the medicine first year's they share (promos.reads_from).
  const year = promos.find((p) => p.id === promo);
  const inPromo = all.filter((m) => m.promo === promo
    || (year?.reads_from === m.promo
      && (!year.reads_semesters?.length || year.reads_semesters.includes(m.semester))));
  const modules = inPromo
    .filter((m) => m.semester === sem)
    .filter((m) => !q || strip(m.name).includes(strip(q)));

  return (
    <>
      <header className="st-top r1">
        <div className="st-title">
          <span className="grow">
            <b>{t('الدراسة')}</b>
          </span>
          <Link href="/saved" className="h-bell" aria-label={t('المحفوظات')}>
            <Icon name="bookmark" size={20} />
          </Link>
        </div>

        <label className="srch">
          <Icon name="search" size={19} />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder={t('ابحث في مواد دفعتك')} type="search" aria-label={t('ابحث في المواد')} />
        </label>

        <div className="st-years">
          {promos.map((p) => (
            <button key={p.id} onClick={() => choose(p.id)} data-on={promo === p.id}
              style={promo === p.id ? { background: badgeOf(p), borderColor: badgeOf(p) } : undefined}>
              {p.name}
            </button>
          ))}
        </div>
      </header>

      <div className="scroll st-flow">
        {/* ---------- the four tools: compact, so the subjects come up the screen ---------- */}
        <div className="st-tools2 r2">
          <Link href="/quiz" className="st-t2">
            <span className="st-t2-ic"><Icon name="quiz" size={20} /></span><b>{t('اختبر نفسك')}</b>
          </Link>
          <Link href="/duel" className="st-t2">
            <span className="st-t2-ic"><Icon name="swords" size={20} /></span><b>{t('التحدّي')}</b>
            {waiting > 0 && <i className="st-t2-n">{waiting}</i>}
          </Link>
          <Link href="/notes" className="st-t2">
            <span className="st-t2-ic"><Icon name="book2" size={20} /></span><b>{t('الملخصات')}</b>
          </Link>
          <Link href="/review" className="st-t2">
            <span className="st-t2-ic"><Icon name="clock" size={20} /></span><b>{t('المراجعة')}</b>
            {due > 0 && <i className="st-t2-n">{due}</i>}
          </Link>
        </div>

        {/* Anatomy in 3D is not a door of its own here: it is inside ANATOMIE,
            lecture by lecture (the subject's «Atlas» tab). Four loose cards
            for it here left a student guessing which one answered which
            lecture. */}

        {/* ---------- every subject ---------- */}
        <div className="st-head r4">
          <b>{t('المواد ·')}{' '}<span dir="ltr">{chosen?.name}</span></b>
          <span className="st-seg">
            {SEMESTERS.map((s) => (
              <button key={s} data-on={sem === s} onClick={() => setSem(s)}>{s}</button>
            ))}
          </span>
        </div>

        {/* Silence here is what makes "the panel saved it and the app never
            got it" impossible to tell apart from "nobody has catalogued it".
            One of these is a bug and the other is a Tuesday. */}
        {readError && (
          <div className="admin-err" style={{ padding: '0 2px' }}>{t('تعذّرت قراءة المواد — {readError}', { readError })}</div>
        )}

        {!readError && fromFile && (
          <div className="admin-err" style={{ padding: '0 2px' }}>{t(
            'هذه المواد من نسخة التطبيق، لا من قاعدة البيانات — ما تضيفه في اللوحة لن يظهر هنا حتى يُقرأ الجدول. أبلغ عن هذه الرسالة.'
          )}</div>
        )}

        {inPromo.length === 0 && (
          <div className="st-empty">
            <span><Icon name="book" size={28} /></span>
            <b>{t('{name} — لا مواد بعد', { name: chosen?.name })}</b>
          </div>
        )}

        {/* A banner each, full width, one under the other. Nothing printed under
            it: the banner names the subject. Always a link — a count worked
            out from another query never decides whether content opens. */}
        {modules.length > 0 && (
          <div className="st-banners" key={`${promo}-${sem}`}>
            {modules.map((m, i) => (
              <SubjectBanner key={m.id} subject={m} href={`/archive/${m.id}`} size="wide" index={i}
                             tag={[chosen?.name, m.semester].filter(Boolean).join(' · ')} />
            ))}
          </div>
        )}

        {inPromo.length > 0 && modules.length === 0 && (
          <div className="st-empty">
            <span><Icon name="search" size={28} /></span>
            <b>{q ? t('لا توجد مادة تطابق «{q}» في {sem}.', { q, sem }) : t('لا مواد في {sem} لهذه السنة.', { sem })}</b>
          </div>
        )}
      </div>
    </>
  );
}
