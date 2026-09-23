'use client';

// Your numbers, and your days.
//
// Points, rank and duels won come from the server; the streak and the five
// weeks of squares come from this browser (lib/streak.js), which is why this
// is a client component and why those two arrive a moment after the rest.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { streak as streakOf, lastWeeks, longest } from '@/lib/streak';

const DAYS = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];   // Saturday first
const shade = (n) => (n <= 0 ? 0 : n < 3 ? 1 : n < 8 ? 2 : 3);
const plural = (n) => (n === 1 ? 'يوم واحد' : n === 2 ? 'يومان' : n <= 10 ? `${n} أيام` : `${n} يومًا`);

export default function MeLive({ points, rank, wins }) {
  const [cells, setCells] = useState(null);
  const [run, setRun] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    setCells(lastWeeks(5));
    setRun(streakOf());
    setBest(longest());
  }, []);

  return (
    <>
      <div className="me-nums r3">
        <Link href="/points"><Icon name="award" size={18} /><b>{points}</b><s>نقطة</s></Link>
        <Link href="/points"><Icon name="list" size={18} /><b>{rank ? `#${rank}` : '—'}</b><s>الترتيب</s></Link>
        <Link href="/duel"><Icon name="swords" size={18} /><b>{wins}</b><s>تحدٍّ مربوح</s></Link>
        <span className={run ? 'hot' : ''}><Icon name="flame" size={18} weight={run ? 'fill' : 'duotone'} />
          <b>{run}</b><s>{run === 1 ? 'يوم' : 'أيام متتالية'}</s></span>
      </div>

      <div className="me-days r4">
        <div className="me-days-top">
          <b>أيام دراستك</b>
          <s>{best ? <>أطول سلسلة: <b>{plural(best)}</b></> : 'افتح محاضرة أو أجب سؤالًا ليبدأ العدّ'}</s>
        </div>
        <div className="me-grid">
          {DAYS.map((d) => <span key={d} className="me-grid-d">{d}</span>)}
          {(cells || Array.from({ length: 35 }, () => ({ n: 0 }))).map((c, i) => (
            <span key={i} className={`me-cell s${shade(c.n)}${c.today ? ' today' : ''}${c.future ? ' future' : ''}`}
                  style={{ animationDelay: `${i * 0.012}s` }}
                  title={c.day ? `${c.day}${c.n ? '' : ' — لا دراسة'}` : undefined} />
          ))}
        </div>
        <div className="me-legend">
          أقل <i className="s0" /><i className="s1" /><i className="s2" /><i className="s3" /> أكثر
        </div>
      </div>
    </>
  );
}
