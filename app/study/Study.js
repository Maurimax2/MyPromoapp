'use client';

// الدراسة.
//
// Four doors, then the material. The doors are what you *do* — a quiz, a
// duel, somebody's summary, the questions you got wrong — and only التحدّي
// ever wears a number, because it is the only one of the four that can be
// waiting on you.
//
// Below them is what الأرشيف used to be, whole: every year, both semesters,
// every subject. الملخصات lost its tab and became one of the doors; the two
// were always the same idea, and a student looking for "the material" had to
// guess which of two tabs held it.

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { badgeOf, tintOf } from '@/lib/data';

// S1 and S2 are shown exactly as written — that is what students call them.
const SEMESTERS = ['S1', 'S2'];

const strip = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function Study({ promos, modules: all, counts, mine, waiting = 0,
                                readError = null, fromFile = false }) {
  const [promo, setPromo] = useState(
    promos.some((p) => p.id === mine) ? mine : promos[0]?.id);
  const [sem, setSem] = useState('S1');
  const [q, setQ] = useState('');

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
  const inPromo = all.filter((m) => m.promo === promo);
  const modules = inPromo
    .filter((m) => m.semester === sem)
    .filter((m) => !q || strip(m.name).includes(strip(q)));

  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الدراسة</div>
            <div className="head-s">UNEM · {chosen?.name}</div>
          </div>
          <Link href="/saved" className="icobtn" aria-label="المحفوظات">
            <Icon name="bookmark" size={19} />
          </Link>
        </div>

        <label className="srch">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث في مواد دفعتك" type="search" aria-label="ابحث في المواد" />
        </label>
      </header>

      <div className="scroll">
        {/* ---- the four doors ---- */}
        <div className="doors">
          <Link href="/quiz" className="door">
            <span className="door-ic tint-olive"><Icon name="quiz" size={19} /></span>
            <b>اختبر نفسك</b>
          </Link>
          {/* The only one that can be waiting on you, so the only one in clay
              — and only while something actually is. */}
          <Link href="/duel" className={`door${waiting ? ' needs' : ''}`}>
            <span className={`door-ic ${waiting ? 'tint-clay' : 'tint-olive'}`}>
              <Icon name="swords" size={19} />
            </span>
            <b>التحدّي</b>
            {waiting > 0 && <span className="door-n">{waiting > 9 ? '+9' : waiting}</span>}
          </Link>
          <Link href="/notes" className="door">
            <span className="door-ic tint-olive"><Icon name="book2" size={19} /></span>
            <b>الملخصات</b>
          </Link>
          <Link href="/review" className="door">
            <span className="door-ic tint-olive"><Icon name="clock" size={19} /></span>
            <b>المراجعة</b>
          </Link>
        </div>

        {/* The thing no other app here has, so it is named rather than filed
            away behind a subject. */}
        <Link href="/anatomie" className="card">
          <div className="card-row">
            <div className="tile tint-olive"><Icon name="box" size={22} /></div>
            <div className="grow">
              <div className="nm">التشريح ثلاثي الأبعاد</div>
              <div className="mt">33 منطقة · 319 معلمًا عظميًا</div>
            </div>
            <span className="chev"><Icon name="chev" size={18} /></span>
          </div>
        </Link>

        <div className="eyebrow" style={{ margin: '10px 2px 0' }}>كل المواد</div>

        <div className="chips">
          {promos.map((p) => (
            <button key={p.id} onClick={() => choose(p.id)}
              className={`pill${promo === p.id ? ' solid' : ' grey'}`}
              style={promo === p.id ? { background: badgeOf(p) } : undefined}>
              {p.name}
            </button>
          ))}
        </div>

        <div className="seg">
          {SEMESTERS.map((s) => (
            <button key={s} data-on={sem === s} onClick={() => setSem(s)}>{s}</button>
          ))}
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
          <div className="empty">
            <div className="tile tint-olive"><Icon name="archive" size={24} /></div>
            <div className="empty-t">{chosen?.name} — لم تُفهرس بعد</div>
            <div className="empty-b">
              لا مواد في هذه الدفعة بعد. تُضاف من لوحة التحكم.
            </div>
          </div>
        )}

        {modules.map((m) => {
          const n = counts[m.id]?.lectures || 0;
          const total = counts[m.id]?.files || 0;
          const meta = [n ? `${n} محاضرة` : null, total ? `${total} ملف` : null]
            .filter(Boolean).join(' · ') || 'لا ملفات بعد';

          // Always a link. This used to draw a dead card whenever the count
          // said zero, so a wrong count did not merely misinform — it put the
          // subject out of reach. A number worked out from another query is
          // never allowed to decide whether real content can be opened.
          return (
            <Link key={m.id} href={`/archive/${m.id}`} className="card">
              <div className="card-row">
                <div className={`tile tint-${tintOf(m.tint)}`}>
                  <Icon name={m.icon || 'book'} size={22} />
                </div>
                <div className="grow">
                  <div className="nm">{m.name}</div>
                  <div className="mt">{meta}</div>
                </div>
                {total > 0 && <span className="cnt">{n || total}</span>}
                <span className="chev"><Icon name="chev" size={18} /></span>
              </div>
            </Link>
          );
        })}

        {inPromo.length > 0 && modules.length === 0 && (
          <div className="empty">
            <div className="tile tint-olive"><Icon name="search" size={24} /></div>
            <div className="empty-t">لا نتائج</div>
            <div className="empty-b">لا توجد مادة تطابق «{q}» في {sem}.</div>
          </div>
        )}
      </div>
    </>
  );
}
