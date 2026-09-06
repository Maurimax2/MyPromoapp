'use client';

// المراجعة — only what you got wrong, and only when it is due.
//
// Different from اختبر نفسك on purpose: that one is a subject you choose,
// this one is a debt the app is collecting. It reads the schedule the browser
// keeps, so it works the moment you finish a quiz rather than after a round
// trip, and the server copy is what carries it to your next phone.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Quiz from '@/components/Quiz';
import { dueIds, trackedCount, dueCount } from '@/lib/review';
import { allQuestionsEverywhere } from '@/lib/questions';

export default function Review() {
  const [state, setState] = useState(null);   // null while the browser is read
  const [playing, setPlaying] = useState(false);

  // localStorage is not there during the server render, so nothing is decided
  // until the page is running in the browser.
  useEffect(() => {
    const ids = new Set(dueIds());
    const all = allQuestionsEverywhere();
    setState({
      due: all.filter((q) => ids.has(q.id)),
      tracked: trackedCount(),
      count: dueCount(),
    });
  }, [playing]);

  if (playing && state?.due.length) {
    return (
      <Quiz
        questions={state.due}
        moduleName="المراجعة"
        source="ما أخطأت فيه"
        onFinish={() => setPlaying(false)}
      />
    );
  }

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/feed" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow">
            <div className="head-t">المراجعة</div>
            <div className="head-s">
              {state === null ? '…'
                : state.tracked ? `${state.tracked} سؤالًا تتابعها`
                : 'لا شيء تتابعه بعد'}
            </div>
          </div>
        </div>
      </header>

      <div className="scroll">
        {state === null ? (
          <div className="sk sk-card" />
        ) : state.due.length ? (
          <>
            <div className="rev-due">
              <div className="rev-due-n">{state.due.length}</div>
              <div className="rev-due-l">سؤالًا حان وقته</div>
            </div>
            <button className="btn p" onClick={() => setPlaying(true)}>ابدأ المراجعة</button>
            <p className="rev-hint">
              السؤال الذي تخطئ فيه يعود بعد عشر دقائق، ثم يوم، ثم ثلاثة، ثم أسبوع.
            </p>
          </>
        ) : (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="check" size={24} /></div>
            <div className="empty-t">
              {state.tracked ? 'لا شيء حان وقته' : 'لا شيء للمراجعة بعد'}
            </div>
            <div className="empty-b">
              {state.tracked
                ? 'ما أخطأت فيه سيعود إليك في وقته. عُد لاحقًا.'
                : 'أجب على أسئلة في «اختبر نفسك» — ما تخطئ فيه يظهر هنا.'}
            </div>
            <Link href="/quiz" className="btn g" style={{ maxWidth: 240 }}>اختبر نفسك</Link>
          </div>
        )}
      </div>
    </>
  );
}
