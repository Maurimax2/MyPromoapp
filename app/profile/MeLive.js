'use client';

// Your numbers, and your days.
//
// Points, rank and duels won come from the server; the streak and the five
// weeks of squares come from this browser (lib/streak.js), which is why this
// is a client component and why those two arrive a moment after the rest.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Flame from '@/components/Flame';
import { lastWeeks, daysKnown } from '@/lib/streak';
import { streakOf, dayOf, nextMilestone } from '@/lib/habit';
import { useT } from '@/components/Lang';
import { daysWord } from '@/lib/i18n';

const DAYS = {                                     // Saturday first
  ar: ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'],
  fr: ['S', 'D', 'L', 'M', 'M', 'J', 'V'],
};
const shade = (n) => (n <= 0 ? 0 : n < 3 ? 1 : n < 8 ? 2 : 3);

export default function MeLive({ points, rank, wins, days = null }) {
  const t = useT();
  const [cells, setCells] = useState(null);
  const [run, setRun] = useState(0);
  const [best, setBest] = useState(0);
  const [freezes, setFreezes] = useState(0);

  // This phone's days and the server's together (habits.sql), counted the
  // same way the server counts them — freezes included.
  useEffect(() => {
    const all = daysKnown(days);
    const s = streakOf(Object.keys(all), dayOf());
    setCells(lastWeeks(5, Date.now(), days));
    setRun(s.current);
    setBest(s.longest);
    setFreezes(s.freezes);
  }, [days]);
  const goal = nextMilestone(run);

  return (
    <>
      <div className="me-nums r3">
        <Link href="/points"><Icon name="award" size={18} /><b>{points}</b><s>{t('نقطة')}</s></Link>
        <Link href="/points"><Icon name="list" size={18} /><b>{rank ? `#${rank}` : '—'}</b><s>{t('الترتيب')}</s></Link>
        <Link href="/duel"><Icon name="swords" size={18} /><b>{wins}</b><s>{t('تحدٍّ مربوح')}</s></Link>
        <span className={run ? 'hot' : ''}>{run ? <Flame streak={run} size={20} /> : <Icon name="flame" size={18} weight="duotone" />}
          <b>{run}</b><s>{run === 1 ? t('يوم') : t('أيام متتالية')}</s></span>
      </div>

      <div className="me-days r4">
        <div className="me-days-top">
          <b>{t('أيام دراستك')}</b>
          <s>{best ? <>{t('أطول سلسلة:')}{' '}<b>{daysWord(t, best)}</b></> : t('افتح محاضرة أو أجب سؤالًا ليبدأ العدّ')}</s>
        </div>
        {(goal || freezes > 0) && run > 0 && (
          <div className="me-goal">
            {goal && <span><Flame streak={run} size={14} />{' '}{t('{days} لشارة', { days: daysWord(t, goal.left) })}{' '}{goal.target === 7 ? t('أسبوع كامل') : goal.target === 30 ? t('شهر كامل') : t('المئة')}</span>}
            {freezes > 0 && <span className="frz">❄ {freezes === 1 ? t('تجميد واحد يحمي سلسلتك') : t('تجميدان يحميان سلسلتك')}</span>}
          </div>
        )}
        <div className="me-grid">
          {DAYS[t.lang].map((d, i) => <span key={i} className="me-grid-d">{d}</span>)}
          {(cells || Array.from({ length: 35 }, () => ({ n: 0 }))).map((c, i) => (
            <span key={i} className={`me-cell s${shade(c.n)}${c.today ? ' today' : ''}${c.future ? ' future' : ''}`}
                  style={{ animationDelay: `${i * 0.012}s` }}
                  title={c.day ? `${c.day}${c.n ? '' : t(' — لا دراسة')}` : undefined} />
          ))}
        </div>
        <div className="me-legend">{t('أقل')}{' '}<i className="s0" /><i className="s1" /><i className="s2" /><i className="s3" />{' '}{t('أكثر')}</div>
      </div>
    </>
  );
}
