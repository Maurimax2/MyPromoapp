'use client';

// Choosing what to be tested on, and the review that follows.
//
// Everything is selected to begin with, because "test me on the whole module"
// is the common case.
//
// Two ways to slice the same questions. By lecture is what a student
// revising actually wants — the vessels of the head and neck, out of every
// paper at once — and it is the one shown first wherever the subject has been
// classified. By paper is sitting a past exam whole, which is the other real
// thing people do the week before. Neither is a sub-view of the other, so
// they are a switch rather than a filter.

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

const BY_LECTURE = 'lecture';
const BY_PAPER = 'paper';

export default function QuizPicker({ banks, lectures, moduleId, moduleName }) {
  // The subject has been classified, or it has not. Where it has, the lecture
  // is what opens, because it is the question a student came to ask.
  const canSplit = Boolean(lectures && lectures.length);
  const [by, setBy] = useState(canSplit ? BY_LECTURE : BY_PAPER);
  const groups = by === BY_LECTURE && canSplit ? lectures : banks;

  const [chosen, setChosen] = useState(() => groups.map((g) => g.fid));
  const [playing, setPlaying] = useState(null);
  const [due, setDue] = useState(0);
  const [tracked, setTracked] = useState(0);

  const refresh = () => { setDue(dueCount()); setTracked(trackedCount()); };
  useEffect(refresh, []);

  // Switching sides selects everything again. A selection of papers means
  // nothing as a selection of lectures, and carrying the count across would
  // leave the button promising a number the list cannot explain.
  const swap = (next) => {
    setBy(next);
    setChosen((next === BY_LECTURE ? lectures : banks).map((g) => g.fid));
  };

  const all = banks.flatMap((b) => b.questions);
  const picked = groups.filter((g) => chosen.includes(g.fid)).flatMap((g) => g.questions);

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

      {canSplit && (
        <div className="seg">
          <button data-on={by === BY_LECTURE} onClick={() => swap(BY_LECTURE)}>
            حسب المحاضرة
          </button>
          <button data-on={by === BY_PAPER} onClick={() => swap(BY_PAPER)}>
            حسب الورقة
          </button>
        </div>
      )}

      <section className="chapter">
        <div className="chapter-head">
          <span className="chapter-ic tint-purple"><Icon name="quiz" size={16} /></span>
          <div className="grow">
            <div className="chapter-t">
              {by === BY_LECTURE && canSplit ? 'اختر المحاضرات' : 'اختر الأوراق'}
            </div>
            <div className="chapter-s">{picked.length} من {all.length} سؤال</div>
          </div>
          <button
            className="pill grey"
            onClick={() => setChosen(chosen.length === groups.length ? [] : groups.map((g) => g.fid))}
          >
            {chosen.length === groups.length ? 'إلغاء الكل' : 'اختر الكل'}
          </button>
        </div>

        {groups.map((g) => {
          const on = chosen.includes(g.fid);
          return (
            <button key={g.fid} className={`pick${on ? ' on' : ''}`} onClick={() => toggle(g.fid)}>
              <span className={`pick-box${on ? ' on' : ''}`}>
                {on && <Icon name="check" size={13} />}
              </span>
              {/* The number the module gives the lecture, never a dash: a
                  lecture without one is drawn without the badge. */}
              {g.n != null && <span className="num pick-n">{g.n}</span>}
              <span className="grow">
                <span className="lec-nm" style={{ display: 'block' }} dir="auto">{g.title}</span>
                {g.section && <span className="lec-mt" dir="auto">{g.section}</span>}
              </span>
              <span className="num">{g.questions.length}</span>
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
