'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';

export default function Quiz({ questions, moduleId, moduleName }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[i];
  const last = i === questions.length - 1;

  const choose = (n) => {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (last) { setDone(true); return; }
    setI((n) => n + 1);
    setPicked(null);
  };

  const restart = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

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
            <Link className="btn g" href={`/archive/${moduleId}`}>
              العودة إلى {moduleName}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll">
      <div className="quiz-bar">
        <div className="quiz-bar-fill" style={{ width: `${((i + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>
      <div className="quiz-step">سؤال {i + 1} من {questions.length}</div>

      <div className="card quiz-q">{q.q}</div>

      <div className="quiz-options">
        {q.options.map((opt, n) => {
          const state = picked === null ? ''
            : n === q.answer ? ' right'
            : n === picked ? ' wrong' : ' dim';
          return (
            <button key={n} className={`quiz-opt${state}`} onClick={() => choose(n)} disabled={picked !== null}>
              <span className="grow">{opt}</span>
              {picked !== null && n === q.answer && <Icon name="check" size={18} />}
              {picked !== null && n === picked && n !== q.answer && <Icon name="x" size={18} />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <>
          <div className="quiz-why">{q.why}</div>
          <button className="btn p" onClick={next}>{last ? 'إنهاء' : 'السؤال التالي'}</button>
        </>
      )}
    </div>
  );
}
