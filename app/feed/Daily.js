'use client';

// سؤال اليوم, and — at the start of a week — how the last one went.
//
// The question is the same for the whole year today (lib/daily.js). The
// phone never sees the answer until it has answered: it sends what it
// ticked, and /api/daily says whether that was right, what the answer was,
// and how the year did. Answering keeps the streak going, and a right answer
// is worth points.

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

const LETTER = (n) => String.fromCharCode(65 + n);

export function DailyCard({ q, mine, tally, today = 0 }) {
  const [ticked, setTicked] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  // A result from the server — or, when it was answered earlier today, the
  // one the page arrived with.
  const [result, setResult] = useState(mine?.answered
    ? { correct: mine.correct, answer: q?.answer || [], why: q?.why || null, tally, already: true }
    : null);

  if (!q) return null;

  const toggle = (n) => {
    if (result) return;
    setTicked((t) => (q.several ? (t.includes(n) ? t.filter((x) => x !== n) : [...t, n]) : [n]));
  };

  const check = async () => {
    if (!ticked.length || busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/daily', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ticked }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || 'تعذّر الإرسال'); return; }
    setResult(data);
  };

  const t = result?.tally;
  const pct = t?.answered ? Math.round((t.right / t.answered) * 100) : null;

  return (
    <section className={`dq r3${result ? (result.correct ? ' right' : ' wrong') : ''}`}>
      <div className="dq-top">
        <span className="dq-chip"><Icon name="sparkle" size={13} weight="fill" /> سؤال اليوم</span>
        {q.subject && <span className="dq-subj" dir="ltr">{q.subject}</span>}
        {!result && <span className="dq-worth">+2</span>}
      </div>

      <b className="dq-stem" dir="auto">{q.stem}</b>
      {!result && <span className="dq-kind">{q.several ? 'جواب أو أكثر' : 'جواب واحد'}</span>}

      <div className="dq-opts">
        {q.options.map((o, n) => {
          const isRight = result && result.answer.includes(n);
          const isMine = ticked.includes(n);
          const state = !result ? (isMine ? ' on' : '')
            : isRight ? ' right' : isMine ? ' wrong' : ' dim';
          return (
            <button key={n} className={`dq-opt${state}`} onClick={() => toggle(n)} disabled={!!result} aria-pressed={isMine}>
              <span className="dq-l">{LETTER(n)}</span>
              <span className="grow" dir="auto">{o}</span>
              {result && isRight && <Icon name="right" size={19} />}
              {result && isMine && !isRight && <Icon name="wrong" size={19} />}
            </button>
          );
        })}
      </div>

      {error && <div className="admin-err">{error}</div>}

      {!result ? (
        <button className="dq-go" onClick={check} disabled={!ticked.length || busy}>
          {busy ? '…' : 'تحقّق'}
        </button>
      ) : (
        <div className="dq-after">
          <b className="dq-verdict">
            <Icon name={result.correct ? 'sparkle' : 'bulb'} size={17} weight="fill" />
            {result.correct
              ? (result.already ? 'أصبت سؤال اليوم' : 'صحيح! +2 نقطة، وسلسلتك مستمرة')
              : (result.already ? 'أجبت سؤال اليوم' : `الجواب: ${result.answer.map(LETTER).join(' · ')} — وسلسلتك مستمرة`)}
          </b>
          {result.why && <p className="dq-why" dir="auto">{result.why}</p>}
          {t && t.answered > 0 && (
            <span className="dq-tally">
              {t.answered === 1 ? 'أنت أول من أجاب اليوم' : `أصاب ${pct}٪ ممن أجابوا من دفعتك (${t.answered})`} · سؤال جديد غدًا
            </span>
          )}
        </div>
      )}

      {today > 0 && <span className="dq-today"><i />{today === 1 ? 'واحد من دفعتك درس اليوم' : `${today} من دفعتك درسوا اليوم`}</span>}
    </section>
  );
}

/** The week that ended, said on Saturday and Sunday. */
export function Recap({ recap }) {
  if (!recap) return null;
  const { days, right } = recap;
  return (
    <Link href="/points?w=1" className="recap r2">
      <span className="recap-ic"><Icon name="calendar" size={20} /></span>
      <span className="grow">
        <b>أسبوعك الماضي</b>
        <s>
          درست {days} {days === 1 ? 'يومًا' : 'أيام'} من 7
          {right > 0 ? ` · أصبت ${right} من أسئلة اليوم` : ''}
          {' · '}أسبوع جديد، ترتيب جديد
        </s>
      </span>
      <Icon name="chev" size={15} />
    </Link>
  );
}
