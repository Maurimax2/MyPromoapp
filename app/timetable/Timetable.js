'use client';

// جدول الحصص — a week as seven chips, and the day you pick below them.
//
// The whole semester is already here (about two hundred sessions, a few
// dozen KB), so moving between days and weeks is instant and never asks the
// server for anything. A lecture carries a way to revise it when the server
// could tell which file it is; the rest are plain on purpose.

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import BackButton from '@/components/BackButton';
import { agenda, clockOf, LECTURE } from '@/lib/timetable-core';
import { KIND, dayNumber, monthOf, longDay } from '@/lib/timetable-text';
import { artOf } from '@/lib/subjectArt';

const ONE = 86400000;
const iso = (t) => new Date(t).toISOString().slice(0, 10);
const addDays = (day, n) => iso(Date.parse(`${day}T12:00:00Z`) + n * ONE);
// A week starts on Monday here, like the faculty's planning does.
const mondayOf = (day) => addDays(day, -((new Date(`${day}T12:00:00Z`).getUTCDay() + 6) % 7));
const SHORT = { 0: 'أحد', 1: 'إثنين', 2: 'ثلاثاء', 3: 'أربعاء', 4: 'خميس', 5: 'جمعة', 6: 'سبت' };

export default function Timetable({ promo, semester, sessions, now: serverNow }) {
  const [now, setNow] = useState(serverNow);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const today = clockOf(now).day;
  const first = sessions[0]?.date;
  const last = sessions.at(-1)?.date;

  // The day on screen: today, or the first day of term before it starts, or
  // the last day after it has finished.
  const home = !sessions.length ? today : today < first ? first : today > last ? last : today;
  const [day, setDay] = useState(home);
  const strip = useRef(null);

  // The server picked a day by its clock; this phone's clock is the one that
  // matters, and the two only differ around midnight.
  useEffect(() => {
    const t = clockOf(Date.now()).day;
    if (sessions.length) setDay(t < first ? first : t > last ? last : t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const by = useMemo(() => {
    const m = new Map();
    for (const s of sessions) {
      if (!m.has(s.date)) m.set(s.date, []);
      m.get(s.date).push(s);
    }
    return m;
  }, [sessions]);

  const monday = mondayOf(day);
  // Monday to Saturday — the faculty does not teach on Sunday, but a Sunday
  // that has something on it gets its own chip rather than being hidden.
  const week = [0, 1, 2, 3, 4, 5, 6].map((n) => addDays(monday, n))
    .filter((d, n) => n < 6 || by.has(d));
  const lo = mondayOf(first || today);
  const hi = mondayOf(last || today);
  const live = agenda(sessions, now).live;

  // Keep the chosen chip in view when the week changes.
  useEffect(() => {
    strip.current?.querySelector('[data-on="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [day]);

  const list = by.get(day) || [];
  const lectures = list.filter((s) => LECTURE.has(s.kind));

  if (!sessions.length) {
    return (
      <>
        <header className="head">
          <div className="head-row">
            <BackButton fallback="/feed" />
            <div className="grow">
              <div className="head-t">جدول الحصص</div>
              <div className="head-s" dir="ltr">{promo}</div>
            </div>
          </div>
        </header>
        <div className="scroll">
          <div className="empty">
            <div className="tile tint-olive"><Icon name="calendar" size={24} /></div>
            <div className="empty-t">لا جدول لسنتك بعد</div>
            <div className="empty-b">سيظهر هنا حين تنشر الكلية جدول سنتك.</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="head tt-head">
        <div className="head-row">
          <BackButton fallback="/feed" />
          <div className="grow">
            <div className="head-t">جدول الحصص</div>
            <div className="head-s"><bdi dir="ltr">{promo} · {semester}</bdi></div>
          </div>
          {day !== today && today >= first && today <= last && (
            <button className="tt-today" onClick={() => setDay(today)}>اليوم</button>
          )}
        </div>

        <div className="tt-month">
          <button aria-label="الأسبوع السابق" disabled={monday <= lo}
                  onClick={() => setDay(addDays(monday, -7) < first ? first : addDays(monday, -7))}>
            <Icon name="chev" size={17} />
          </button>
          <b>{dayNumber(week[0])} {monthOf(week[0])} – {dayNumber(week.at(-1))} {monthOf(week.at(-1))}</b>
          <button aria-label="الأسبوع التالي" disabled={monday >= hi}
                  onClick={() => setDay(addDays(monday, 7) > last ? last : addDays(monday, 7))}>
            <Icon name="chevR" size={17} />
          </button>
        </div>

        <div className="tt-strip" ref={strip}>
          {week.map((d) => {
            const rows = by.get(d) || [];
            const some = rows.some((s) => LECTURE.has(s.kind));
            const off = rows.length > 0 && rows.every((s) => s.kind === 'break');
            return (
              <button key={d} data-on={d === day} data-today={d === today}
                      className={`tt-chip${some ? ' has' : ''}${off ? ' off' : ''}`}
                      onClick={() => setDay(d)}>
                <s>{SHORT[new Date(`${d}T12:00:00Z`).getUTCDay()]}</s>
                <b>{dayNumber(d)}</b>
                <i />
              </button>
            );
          })}
        </div>
      </header>

      <div className="scroll tt-flow">
        <div className="tt-day">
          {longDay(day)}
          {day === today && <span>اليوم</span>}
        </div>

        {list.length === 0 && (
          <div className="empty" style={{ paddingTop: 28 }}>
            <div className="tile tint-olive"><Icon name="clock" size={24} /></div>
            <div className="empty-t">لا حصص هذا اليوم</div>
          </div>
        )}

        {list.map((s) => {
          if (s.kind === 'break') {
            return (
              <div key={s.id} className="tt-off">
                <Icon name="sparkle" size={16} />
                <b dir="auto">{s.title || s.module}</b>
                <span dir="ltr">{s.start}–{s.end}</span>
              </div>
            );
          }
          if (s.kind === 'revision') {
            return (
              <div key={s.id} className="tt-free">
                <span className="tt-time" dir="ltr"><b>{s.start}</b><s>{s.end}</s></span>
                <span className="grow">حصة مراجعة <small>القاعة مفتوحة للمراجعة الشخصية</small></span>
              </div>
            );
          }
          const art = artOf(s.module);
          const isLive = live && live.id === s.id;
          const href = s.fid ? `/file/${s.fid}` : s.sub ? `/archive/${s.sub}` : null;
          return (
            <div key={s.id} className={`tt-card${isLive ? ' live' : ''}${s.kind === 'exam' ? ' exam' : ''}`}>
              <span className="tt-time" dir="ltr"><b>{s.start}</b><s>{s.end}</s></span>
              <span className="tt-bar" style={{ background: art.bg }} />
              <span className="grow">
                <b dir="auto">{s.title || s.module}</b>
                <em dir="auto">
                  {s.title ? s.module : ''}
                  {s.kind !== 'course' && <span className="nu-kind">{KIND[s.kind]}</span>}
                  {isLive && <span className="nu-kind live">الآن</span>}
                </em>
                {s.teacher && <small dir="auto">{s.teacher}</small>}
                {href && (
                  <Link href={href} className="tt-rev">
                    <Icon name="book" size={14} />
                    {s.fid ? 'راجع هذه المحاضرة' : 'افتح المادة'}
                  </Link>
                )}
              </span>
            </div>
          );
        })}

        {lectures.length > 0 && (
          <p className="tt-foot">
            هذا ما نشرته الكلية. قد يتقدّم الأستاذ أو يتأخّر — اسأل زملاءك في الدفعة
            عن آخر ما وصل إليه.
          </p>
        )}
      </div>
    </>
  );
}
