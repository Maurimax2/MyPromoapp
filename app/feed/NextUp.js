'use client';

// المحاضرة القادمة — the first thing on الرئيسية.
//
// What the faculty's planning says a student has next, and one tap to revise
// it: the lecture's own file when it can be told which that is, else the
// subject. A student who opens the app at 14:30 should see that Dermatologie
// starts in half an hour and be able to read it before it does.
//
// It says something in every state — live, next today, next on another day,
// an empty day with the reason, before the term, after it — so the screen does
// not change shape from one morning to the next. The clock is read in the
// browser and re-read each minute; the first paint uses the server's, so
// nothing jumps when the script arrives.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { agenda, clockOf } from '@/lib/timetable-core';
import { inTime, whenIs, longDay, KIND } from '@/lib/timetable-text';
import { artOf } from '@/lib/subjectArt';
import { useT } from '@/components/Lang';

const minutes = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

export default function NextUp({ sessions, term, now: serverNow }) {
  const t = useT();
  const [now, setNow] = useState(serverNow);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const a = agenda(sessions, now, term || {});
  if (a.over || (!a.live && !a.next)) return null;

  const s = a.live || a.next;
  const art = artOf(s.module);
  const cl = clockOf(now);

  let kicker;
  if (a.live) kicker = t('الآن في القاعة');
  else if (!a.started) kicker = t('أول محاضرة في الفصل · {longDay}', { longDay: longDay(a.next.date, t) });
  else if (a.until != null) kicker = t('المحاضرة القادمة · {inTime}', { inTime: inTime(a.until, t) });
  else kicker = t('المحاضرة القادمة · {whenIs}', { whenIs: whenIs(a.next.date, a.day, t) });

  // «اليوم لا محاضرات» belongs above the next one when today is empty, and says
  // why when the faculty did: a holiday, or a day left for revision.
  const note = a.free && a.started && !a.live
    ? (a.why?.kind === 'break'
        ? (a.why.title || a.why.module)
        : a.why?.kind === 'revision' ? t('يوم مراجعة — لا محاضرات اليوم') : t('لا محاضرات اليوم'))
    : null;

  const done = a.live
    ? Math.max(0, Math.min(100, Math.round(((cl.min - minutes(s.start)) / (minutes(s.end) - minutes(s.start))) * 100)))
    : 0;

  const revise = s.fid
    ? { at: `/file/${s.fid}`, label: a.live ? t('افتح المحاضرة') : t('راجع قبل المحاضرة') }
    : s.sub ? { at: `/archive/${s.sub}`, label: t('افتح المادة') } : null;

  return (
    <section className={`nu r2${a.live ? ' live' : ''}`}>
      {note && <div className="nu-note">{note}</div>}

      <div className="nu-main">
        <span className="nu-art" style={{ background: art.bg }}>
          <img src={art.img} alt="" />
        </span>
        <span className="grow">
          <s>{a.live && <i className="nu-dot" />}{kicker}</s>
          <b dir="auto">{s.title || s.module}</b>
          <em dir="auto">
            {s.title ? <>{s.module} · </> : null}
            <bdi dir="ltr">{s.start}–{s.end}</bdi>
            {s.kind !== 'course' && <span className="nu-kind">{t(KIND[s.kind])}</span>}
          </em>
          {s.teacher && <small dir="auto">{s.teacher}</small>}
        </span>
      </div>

      {a.live && <span className="nu-bar"><i style={{ width: `${done}%` }} /></span>}

      <div className="nu-acts">
        {revise && (
          <Link href={revise.at} className="nu-go">
            <Icon name="book" size={16} /> {revise.label}
          </Link>
        )}
        <Link href="/timetable" className="nu-all">
          <Icon name="calendar" size={16} />{' '}{t('الجدول كاملًا')}</Link>
      </div>
    </section>
  );
}
