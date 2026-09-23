'use client';

// Taking a duel.
//
// It opens the way the prototype does: the two of you slide in from either
// side, VS lands, 3 · 2 · 1, and only then the first question — so a timed
// duel's clock starts on the question, not on the show. A tap skips it, and
// so does asking the phone for less motion.
//
// The score is not worked out here. The ticks go to the server, which has the
// questions the duel stored and decides from those — so the number on the
// result screen is one both players can point at.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Quiz from '@/components/Quiz';

const SPARKS = Array.from({ length: 10 }, (_, n) => ({
  a: `${n * 36 + 8}deg`, c: n % 2 ? '#E08A5E' : '#FFE7A8', d: `${0.5 + (n % 4) * 0.05}s`,
}));

export default function Play({ id, questions, title, seconds = 0, me, them }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  // vs → 3 → 2 → 1 → go → quiz
  const [phase, setPhase] = useState('vs');

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setPhase('quiz'); return undefined; }
    const at = [['3', 1300], ['2', 1850], ['1', 2400], ['go', 2950], ['quiz', 3400]];
    const timers = at.map(([p, ms]) => setTimeout(() => setPhase((now) => (now === 'quiz' ? now : p)), ms));
    return () => timers.forEach(clearTimeout);
  }, []);

  const send = async (answers) => {
    setBusy(true); setError('');
    const res = await fetch(`/api/duel/${id}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(d.error || 'تعذّر الإرسال'); return; }
    router.refresh();
  };

  if (error) {
    return (
      <div className="ar-body">
        <div className="admin-err">{error}</div>
        <button className="ar-ghost" onClick={() => router.refresh()}>حدِّث</button>
      </div>
    );
  }

  if (busy) return <div className="ar-body"><div className="pdf-msg"><div className="spinner" /></div></div>;

  if (phase !== 'quiz') {
    return (
      <button className="ar-show" onClick={() => setPhase('quiz')} aria-label="تخطَّ">
        {phase === 'vs' ? (
          <span className="ar-in">
            <span className="ar-side me">
              <span className="ar-f big" style={{ background: me.face }}>{me.ini}</span>
              <b>أنت</b>
            </span>
            <span className="ar-side them">
              <span className="ar-f big" style={{ background: them.face }}>{them.ini}</span>
              <b dir="auto">{them.first}</b>
            </span>
            <span className="ar-sparks">
              {SPARKS.map((k) => (
                <span key={k.a} style={{ transform: `rotate(${k.a})` }}>
                  <i style={{ background: k.c, animationDelay: k.d }} />
                </span>
              ))}
            </span>
            <span className="ar-bang">
              <span className="ar-bolt"><Icon name="bolt" size={92} weight="fill" /></span>
              <b>VS</b>
            </span>
            <span className="ar-flash" />
          </span>
        ) : (
          <b key={phase} className={`ar-count${phase === '1' ? ' hot' : ''}${phase === 'go' ? ' go' : ''}`}>
            {phase === 'go' ? 'انطلق!' : phase}
          </b>
        )}
      </button>
    );
  }

  return (
    <div className="ar-body ar-play">
      <div className="ar-strip">
        <span className="ar-f sm" style={{ background: me.face }}>{me.ini}</span>
        <b>أنت</b>
        <span className="grow" />
        <Icon name="bolt" size={16} weight="fill" />
        <span className="grow" />
        <b dir="auto">{them.first}</b>
        <span className="ar-f sm" style={{ background: them.face }}>{them.ini}</span>
      </div>
      <Quiz questions={questions} moduleName={title} source="تحدٍّ"
        seconds={seconds} onAnswers={send} />
    </div>
  );
}
