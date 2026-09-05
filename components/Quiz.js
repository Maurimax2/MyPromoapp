'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';

// A UNEM question can have one right answer or four. You tick what you think
// is true and then confirm — there is no way to score a multiple-answer
// question the moment a single option is tapped.
//
// Scoring is all-or-nothing, which is how the faculty marks them: every
// correct proposition and no incorrect one.

const LETTER = (n) => String.fromCharCode(65 + n);

const sameSet = (a, b) =>
  a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);

export default function Quiz({ questions, moduleId, moduleName, source }) {
  const [i, setI] = useState(0);
  const [ticked, setTicked] = useState([]);
  const [shown, setShown] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[i];
  const last = i === questions.length - 1;
  const answer = q.answer || [];
  const single = answer.length === 1;

  const toggle = (n) => {
    if (shown) return;
    setTicked((t) => (t.includes(n) ? t.filter((x) => x !== n) : [...t, n]));
  };

  const confirm = () => {
    setShown(true);
    if (sameSet(ticked, answer)) setScore((s) => s + 1);
  };

  const next = () => {
    if (last) { setDone(true); return; }
    setI((n) => n + 1);
    setTicked([]);
    setShown(false);
  };

  const restart = () => { setI(0); setTicked([]); setShown(false); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="scroll">
        <div className="card quiz-result">
          <div className={`quiz-score ${pct >= 50 ? 'good' : 'poor'}`}>{score}/{questions.length}</div>
          <div className="quiz-verdict">
            {pct >= 75 ? 'ممتاز' : pct >= 50 ? 'لا بأس — راجع ما فاتك' : 'يحتاج مراجعة'}
          </div>
          <div className="quiz-actions">
            <button className="btn p" onClick={restart}>أعد المحاولة</button>
            <Link className="btn g" href={`/quiz/${moduleId}`}>العودة إلى {moduleName}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll">
      <div className="quiz-bar">
        <div className="quiz-bar-fill" style={{ width: `${((i + (shown ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>
      <div className="quiz-step">
        <span>سؤال {i + 1} من {questions.length}</span>
        <span className="quiz-kind">{single ? 'جواب واحد' : 'عدة أجوبة'}</span>
      </div>

      <div className="card quiz-q">{q.q}</div>

      <div className="quiz-options">
        {q.options.map((opt, n) => {
          const isRight = answer.includes(n);
          const isTicked = ticked.includes(n);
          const state = !shown ? (isTicked ? ' on' : '')
            : isRight ? ' right'
            : isTicked ? ' wrong' : ' dim';
          return (
            <button key={n} className={`quiz-opt${state}`} onClick={() => toggle(n)} disabled={shown}>
              <span className="quiz-letter">{LETTER(n)}</span>
              <span className="grow">{opt}</span>
              {shown && isRight && <Icon name="check" size={18} />}
              {shown && isTicked && !isRight && <Icon name="x" size={18} />}
            </button>
          );
        })}
      </div>

      {!shown ? (
        <button className="btn p" onClick={confirm} disabled={ticked.length === 0}>
          تأكيد
        </button>
      ) : (
        <>
          <div className={`quiz-why ${sameSet(ticked, answer) ? 'ok' : 'no'}`}>
            {sameSet(ticked, answer)
              ? 'صحيح'
              : `الجواب: ${answer.map(LETTER).join(' · ') || '—'}`}
            {q.why ? ` — ${q.why}` : ''}
          </div>
          <button className="btn p" onClick={next}>{last ? 'إنهاء' : 'السؤال التالي'}</button>
        </>
      )}

      {source && <div className="quiz-src">من: {source}</div>}
    </div>
  );
}
