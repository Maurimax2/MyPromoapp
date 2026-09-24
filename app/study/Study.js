'use client';

// الدراسة.
//
// The four things you do with the material, then the material itself: every
// year, both semesters, every subject — each with its own model breaking out
// of its card, the same picture it wears on الرئيسية.
//
// Only two of the tools ever carry a number, because only two can be waiting
// on you: a duel somebody sent, and questions that have come due. Both are
// clay while they are, and plain the rest of the time.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { badgeOf } from '@/lib/data';
import { artOf } from '@/lib/subjectArt';
import { dueCount } from '@/lib/review';

// S1 and S2 are shown exactly as written — that is what students call them.
const SEMESTERS = ['S1', 'S2'];

const strip = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function Study({ promos, modules: all, counts, mine, waiting = 0, anatomy = {},
                                readError = null, fromFile = false }) {
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
            <b>الدراسة</b>
            <s>كل ما تحتاجه لامتحانك، في مكان واحد</s>
          </span>
          <Link href="/saved" className="h-bell" aria-label="المحفوظات">
            <Icon name="bookmark" size={20} />
          </Link>
        </div>

        <label className="srch">
          <Icon name="search" size={19} />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث في مواد دفعتك" type="search" aria-label="ابحث في المواد" />
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
        {/* ---------- the four tools ---------- */}
        <div className="st-tools r2">
          <Link href="/quiz" className="st-tool olive">
            <span className="st-tool-mark"><Icon name="quiz" size={96} weight="light" /></span>
            <span className="st-tool-ic"><Icon name="quiz" size={21} /></span>
            <span><b>اختبر نفسك</b><s>QCM لكل مادة</s></span>
          </Link>
          <Link href="/duel" className="st-tool ink">
            <span className="st-tool-mark"><Icon name="swords" size={96} weight="light" /></span>
            <span className="st-tool-row">
              <span className="st-tool-ic"><Icon name="swords" size={21} /></span>
              {waiting > 0 && <span className="st-tool-live"><i />{waiting} ينتظرك</span>}
            </span>
            <span><b>التحدّي</b><s>واجه زميلًا على نفس الأسئلة</s></span>
          </Link>
          <Link href="/notes" className="st-tool plain">
            <span className="st-tool-mark"><Icon name="book2" size={96} weight="light" /></span>
            <span className="st-tool-ic"><Icon name="book2" size={21} /></span>
            <span><b>الملخصات</b><s>ما كتبته دفعتك</s></span>
          </Link>
          <Link href="/review" className={`st-tool ${due > 0 ? 'clay' : 'plain'}`}>
            <span className="st-tool-mark"><Icon name="clock" size={96} weight="light" /></span>
            <span className="st-tool-row">
              <span className="st-tool-ic"><Icon name="clock" size={21} /></span>
              {due > 0 && <b className="st-tool-n">{due}</b>}
            </span>
            <span><b>المراجعة</b><s>{due > 0 ? 'أسئلة أخطأت فيها، تعود اليوم' : 'ما أخطأت فيه يعود إليك'}</s></span>
          </Link>
        </div>

        {/* ---------- the 3D reader, the thing no other app here has ---------- */}
        {anatomy[promo] && (
        <Link href={anatomy[promo]} className="st-3d r3">
          <img className="st-3d-model" src="/art/crane-big.webp" alt="" />
          <span className="st-3d-text">
            <span className="st-3d-tag"><Icon name="box" size={12} /> ثلاثي الأبعاد</span>
            <b>التشريح بين يديك</b>
            <s>33 منطقة · 319 معلمًا · 818 اسمًا</s>
            <span className="st-3d-go">افتح النموذج <Icon name="chev" size={13} /></span>
          </span>
        </Link>
        )}

        {/* ---------- every subject ---------- */}
        <div className="st-head r4">
          <b>المواد · <span dir="ltr">{chosen?.name}</span></b>
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
          <div className="admin-err" style={{ padding: '0 2px' }}>
            تعذّرت قراءة المواد — {readError}
          </div>
        )}

        {!readError && fromFile && (
          <div className="admin-err" style={{ padding: '0 2px' }}>
            هذه المواد من نسخة التطبيق، لا من قاعدة البيانات — ما تضيفه في
            اللوحة لن يظهر هنا حتى يُقرأ الجدول. أبلغ عن هذه الرسالة.
          </div>
        )}

        {inPromo.length === 0 && (
          <div className="st-empty">
            <span><Icon name="book" size={28} /></span>
            <b>{chosen?.name} — قريبًا</b>
            <s>لم تُفهرس مواد هذه السنة بعد. تُضاف من لوحة التحكم، وتظهر هنا فور إضافتها.</s>
          </div>
        )}

        {modules.length > 0 && (
          <div className="st-grid" key={`${promo}-${sem}`}>
            {modules.map((m, i) => {
              const n = counts[m.id]?.lectures || 0;
              const total = counts[m.id]?.files || 0;
              const a = artOf(m.name);
              // Always a link. A count worked out from another query is never
              // allowed to decide whether real content can be opened.
              return (
                <Link key={m.id} href={`/archive/${m.id}`} className="st-subj" style={{ background: a.bg }}>
                  <img className="float" src={a.img} alt="" style={{ animationDelay: `${-i * 0.8}s` }} />
                  <b dir="ltr">{m.name}</b>
                  <s>{[n ? `${n} محاضرة` : null, total ? `${total} ملف` : null].filter(Boolean).join(' · ') || 'لا ملفات بعد'}</s>
                </Link>
              );
            })}
          </div>
        )}

        {inPromo.length > 0 && modules.length === 0 && (
          <div className="st-empty">
            <span><Icon name="search" size={28} /></span>
            <b>لا نتائج</b>
            <s>{q ? <>لا توجد مادة تطابق «{q}» في {sem}.</> : <>لا مواد في {sem} لهذه السنة.</>}</s>
          </div>
        )}
      </div>
    </>
  );
}
