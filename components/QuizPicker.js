'use client';

// Choosing what to be tested on, and the review that follows.
//
// A student revising picks chapters, not files — so the chapters are the list,
// and each one carries how many questions it holds. Everything is selected to
// begin with, because "test me on the whole module" is the common case.

import { useEffect, useState } from 'react';
import Icon from './Icon';
import Quiz from './Quiz';
import { dueIds, dueCount, trackedCount } from '@/lib/review';

const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function QuizPicker({ banks, moduleId, moduleName }) {
  const [chosen, setChosen] = useState(() => banks.map((b) => b.fid));
  const [playing, setPlaying] = useState(null);
  const [due, setDue] = useState(0);
  const [tracked, setTracked] = useState(0);

  const refresh = () => { setDue(dueCount()); setTracked(trackedCount()); };
  useEffect(refresh, []);

  const all = banks.flatMap((b) => b.questions);
  const picked = banks.filter((b) => chosen.includes(b.fid)).flatMap((b) => b.questions);

  const toggle = (fid) =>
    setChosen((c) => (c.includes(fid) ? c.filter((x) => x !== fid) : [...c, fid]));

  const startReview = () => {
    const ids = new Set(dueIds());
    setPlaying(shuffle(all.filter((q) => ids.has(q.id))));
  };

  if (playing) {
    return (
      <Quiz
        questions={playing}
        moduleId={moduleId}
        moduleName={moduleName}
        onFinish={() => { setPlaying(null); refresh(); }}
      />
    );
  }

  return (
    <>
      {due > 0 && (
        <button className="card quizcard review" onClick={startReview}>
          <div className="quizcard-ic"><Icon name="clock" size={19} /></div>
          <div className="grow">
            <div className="nm" style={{ fontSize: 14 }}>المراجعة</div>
            <div className="mt">{due} سؤال أخطأت فيه، حان وقت إعادته</div>
          </div>
          <span className="chev"><Icon name="chev" size={18} /></span>
        </button>
      )}

      <section className="chapter">
        <div className="chapter-head">
          <span className="chapter-ic tint-purple"><Icon name="quiz" size={16} /></span>
          <div className="grow">
            <div className="chapter-t">اختر الفصول</div>
            <div className="chapter-s">{picked.length} من {all.length} سؤال</div>
          </div>
          <button
            className="pill grey"
            onClick={() => setChosen(chosen.length === banks.length ? [] : banks.map((b) => b.fid))}
          >
            {chosen.length === banks.length ? 'إلغاء الكل' : 'اختر الكل'}
          </button>
        </div>

        {banks.map((b) => {
          const on = chosen.includes(b.fid);
          return (
            <button key={b.fid} className={`pick${on ? ' on' : ''}`} onClick={() => toggle(b.fid)}>
              <span className={`pick-box${on ? ' on' : ''}`}>
                {on && <Icon name="check" size={13} />}
              </span>
              <span className="grow">
                <span className="lec-nm" style={{ display: 'block' }}>{b.title}</span>
                <span className="lec-mt">{b.section}</span>
              </span>
              <span className="num">{b.questions.length}</span>
            </button>
          );
        })}
      </section>

      <button
        className="btn p"
        disabled={!picked.length}
        onClick={() => setPlaying(shuffle(picked))}
      >
        ابدأ — {picked.length} سؤال
      </button>

      {tracked > 0 && due === 0 && (
        <div className="quiz-note">
          {tracked} سؤال تحت المراجعة. سيعود كل واحد منها في وقته.
        </div>
      )}
    </>
  );
}
