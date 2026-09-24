'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { record } from '@/lib/review';
import { scored } from '@/lib/best';

// An FMPOS question can have one right answer or four. You tick what you think
// is true and then confirm — there is no way to score a multiple-answer
// question the moment a single option is tapped.
//
// Scoring is all-or-nothing, which is how the faculty marks them: every
// correct proposition and no incorrect one.
//
// The clinical years are not examined that way. Their papers ask you to write
// the answer, so a `qroc` shows the question, then the answer when you ask for
// it, and you say whether you had it. Nothing here reads what a student typed:
// matching French medical prose by keyword is wrong often enough to be worse
// than saying nothing, and being told you are wrong when you were right
// teaches a student to stop believing the screen.
//
// Both feed the same schedule. `reviews` keys on the question and keeps a box;
// it has never asked how the answer was judged.

const LETTER = (n) => String.fromCharCode(65 + n);

const sameSet = (a, b) =>
  a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);

const CLOCK = 100.5;   // 2πr, r = 16
const SCORE = 339.3;   // 2πr, r = 54

const clockOf = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// Colours that are already the app's, falling in the result of a perfect run.
const CONFETTI = ['#2A5B3E', '#E08A5E', '#8A6A14', '#14555F', '#A8502A', '#3F7A57', '#D9B44A'];

export default function Quiz({
  questions, moduleId, moduleName, source, onFinish,
  // A duel needs what was ticked, not what the browser thought of it: the
  // score is worked out on the server, against the questions it stored.
  // Given this, the run ends by handing the answers over instead of drawing
  // a result of its own.
  onAnswers,
  // Seconds a question is allowed, when the run is timed. A duel may be; the
  // subject's own quiz never is — you are revising there, and a clock over
  // somebody reading a question for the first time teaches them to panic.
  seconds = 0,
  // Where a finished run's score is kept (lib/best.js), when it is a paper
  // of a subject. A duel and the review have none.
  bestKey = null,
}) {
  const [i, setI] = useState(0);
  const [ticked, setTicked] = useState([]);
  const [shown, setShown] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [given, setGiven] = useState([]);
  const [left, setLeft] = useState(seconds);
  // Right or wrong, per question, for the segments along the top.
  const [marks, setMarks] = useState([]);
  const [run, setRun] = useState(0);        // right answers in a row, now
  const [bestRun, setBestRun] = useState(0);
  const [took, setTook] = useState(0);
  const began = useRef(Date.now());

  const q = questions[i];
  const last = i === questions.length - 1;
  const answer = q.answer || [];
  const single = answer.length === 1;
  const written = q.kind === 'qroc';
  const right = sameSet(ticked, answer);

  const judged = (ok) => {
    setMarks((m) => { const n = [...m]; n[i] = ok; return n; });
    const now = ok ? run + 1 : 0;
    setRun(now);
    setBestRun((b) => Math.max(b, now));
  };

  const toggle = (n) => {
    if (shown) return;
    setTicked((t) => (t.includes(n) ? t.filter((x) => x !== n) : [...t, n]));
  };

  const confirm = () => {
    setShown(true);
    const ok = sameSet(ticked, answer);
    if (ok) setScore((s) => s + 1);
    judged(ok);
    // Right or wrong, the schedule is told: a miss comes back in ten minutes,
    // a hit waits longer each time until the question is learnt.
    if (q.id) record(q.id, ok);
  };

  const next = (mine = ticked) => {
    const all = [...given];
    all[i] = mine;
    setGiven(all);

    if (last) {
      if (onAnswers) { onAnswers(all); return; }
      setTook(Math.round((Date.now() - began.current) / 1000));
      setDone(true);
      return;
    }
    setI((n) => n + 1);
    setTicked([]);
    setShown(false);
    setLeft(seconds);
  };

  // The clock, when there is one. It runs per question and takes whatever is
  // ticked when it reaches zero — a question you ran out of time on is a
  // question you did not answer, which is the same as getting it wrong.
  //
  // Held in a ref so the countdown is not torn down and restarted every time
  // a box is ticked, and moved on from an effect rather than from inside the
  // state update: React may run an updater twice, and a question that submits
  // itself twice is a duel answered twice.
  const move = useRef(next);
  const ranOut = useRef(-1);
  useEffect(() => { move.current = next; });

  useEffect(() => {
    if (!seconds || done || left <= 0) return undefined;
    const tick = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(tick);
  }, [left, seconds, done]);

  useEffect(() => {
    if (!seconds || done || left > 0) return;
    // Once per question, however many times this effect is run.
    if (ranOut.current === i) return;
    ranOut.current = i;
    move.current();
  }, [left, seconds, done, i]);

  // A written answer is marked by the person who wrote it. Two buttons, not
  // five: a scale a student has to interpret is a scale they answer
  // differently on Tuesday than on Friday, and the schedule underneath only
  // knows right from wrong anyway.
  const mark = (knew) => {
    if (knew) setScore((n) => n + 1);
    judged(knew);
    if (q.id) record(q.id, knew);
    // A written answer has nothing to send: it was marked by the person who
    // wrote it, which is why a duel never contains one.
    next([]);
  };

  // Once per finished run: `done` turning true is the result screen appearing.
  useEffect(() => {
    if (done && bestKey) scored(bestKey, Math.round((score / questions.length) * 100));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const restart = () => {
    setI(0); setTicked([]); setShown(false); setScore(0); setDone(false); setGiven([]);
    setMarks([]); setRun(0); setBestRun(0); setLeft(seconds);
    began.current = Date.now();
  };

  // ================= the result =================
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const missed = questions.length - score;
    const ink = pct >= 75 ? 'var(--olive)' : pct >= 50 ? '#8A6A14' : 'var(--clay)';
    return (
      <div className="qz-done">
        {pct === 100 && (
          <div className="qz-confetti" aria-hidden="true">
            {Array.from({ length: 18 }, (_, n) => (
              <i key={n} style={{
                left: `${(n * 37) % 100}%`, background: CONFETTI[n % CONFETTI.length],
                animationDelay: `${(n % 6) * 0.35}s`, animationDuration: `${2.6 + (n % 5) * 0.3}s`,
                borderRadius: n % 3 === 0 ? '50%' : 2, width: 7 + (n % 3) * 2, height: n % 3 === 0 ? 8 : 12,
              }} />
            ))}
          </div>
        )}
        <span className="qz-score">
          <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
            <circle cx="66" cy="66" r="54" fill="none" stroke="var(--line-soft)" strokeWidth="10" />
            <circle className="qz-score-go" cx="66" cy="66" r="54" fill="none" stroke={ink} strokeWidth="10"
              strokeLinecap="round" strokeDasharray={SCORE} strokeDashoffset={SCORE * (1 - pct / 100)} />
          </svg>
          <span>
            <b style={{ color: ink }} dir="ltr">{score}/{questions.length}</b>
            <s>صحيحة</s>
          </span>
        </span>
        <b className="qz-head">
          {pct === 100 ? 'كاملة!' : pct >= 75 ? 'أحسنت' : pct >= 50 ? 'لا بأس — راجع ما فاتك' : 'تحتاج مراجعة'}
        </b>
        <span className="qz-sub">
          {missed
            ? `${missed === 1 ? 'سؤال واحد أخطأت فيه سيعود' : missed === 2 ? 'سؤالان أخطأت فيهما سيعودان' : `${missed} أسئلة أخطأت فيها ستعود`} إليك في المراجعة.`
            : 'لا شيء للمراجعة — كل الأسئلة صحيحة.'}
        </span>

        <div className="qz-stats">
          <span><b dir="ltr">{clockOf(took)}</b><s>الوقت</s></span>
          <span className={bestRun >= 3 ? 'hot' : ''}><b dir="ltr">×{bestRun}</b><s>أطول سلسلة</s></span>
          <span><b>{missed}</b><s>للمراجعة</s></span>
        </div>

        <span className="grow" />
        {/* Only questions the database holds can be sent to somebody else: a
            duel stores their ids. A subject still served from the bundled
            file is offered no challenge rather than a form that cannot start. */}
        {moduleId && questions.some((x) => x.dbId) && (
          <Link href={`/duel/new?subject=${encodeURIComponent(moduleId)}`} className="qz-duel">
            <Icon name="swords" size={19} /> تحدَّ زميلًا في <span dir="ltr">{moduleName}</span>
          </Link>
        )}
        <div className="qz-two">
          <button className="qz-again" onClick={restart}><Icon name="again" size={16} /> أعد</button>
          {onFinish
            ? <button className="qz-back" onClick={onFinish}>العودة</button>
            : <Link className="qz-back" href={moduleId ? `/archive/${moduleId}` : '/study'}>العودة للمادة</Link>}
        </div>
      </div>
    );
  }

  // ================= a question =================
  const few = questions.length <= 24;
  return (
    <div className="qz">
      <div className="qz-top">
        <span className="grow">
          <span className="qz-count">
            <span>السؤال <b>{i + 1}</b> من {questions.length}</span>
            {run >= 2 && (
              <span className="qz-run" key={run}><Icon name="flame" size={14} weight="fill" /><span dir="ltr">×{run}</span></span>
            )}
          </span>
          {few ? (
            <span className="qz-segs">
              {questions.map((_, n) => (
                <i key={n} className={marks[n] === true ? 'ok' : marks[n] === false ? 'no' : n === i ? 'now' : ''} />
              ))}
            </span>
          ) : (
            <span className="qz-bar"><i style={{ width: `${((i + (shown ? 1 : 0)) / questions.length) * 100}%` }} /></span>
          )}
        </span>
        {/* The clock sits where the eye already is, beside the count — not
            over the question, which is the thing being read. */}
        {seconds > 0 && (
          <span className={`qz-clock${left <= 5 ? ' out' : ''}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="16" fill="none" stroke="var(--line-soft)" strokeWidth="4" />
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                strokeDasharray={CLOCK} strokeDashoffset={CLOCK * (1 - left / seconds)} />
            </svg>
            <b dir="ltr">{left}</b>
          </span>
        )}
      </div>

      <div className="qz-q" key={`q${i}`}>
        {(q.topic || source) && (
          <span className="qz-chip" dir="ltr">{[moduleName, q.topic || source].filter(Boolean).join(' · ')}</span>
        )}
        <b className="qz-stem" dir="auto">{q.q}</b>
        <span className="qz-kind">
          {written ? 'أجب في ورقتك، ثمّ تحقّق' : single ? 'إجابة واحدة' : 'إجابة أو أكثر'}
        </span>
      </div>

      {written ? (
        shown && (
          <div className="qz-after">
            {q.by === 'claude' && (
              <div className="quiz-by">
                هذا الجواب من MyPromo، لا من ورقة التصحيح — الورقة الأصلية لا تحمل تصحيحًا.
              </div>
            )}
            <div className="qz-model" dir="auto">{q.model || '—'}</div>
            {q.why && (
              <div className="qz-why">
                <span><Icon name="bulb" size={17} /> الشرح</span>
                <p dir="auto">{q.why}</p>
              </div>
            )}
          </div>
        )
      ) : (
        <>
          <div className={`qz-opts${shown && !right ? ' shake' : ''}`} key={`o${i}`}>
            {q.options.map((opt, n) => {
              const isRight = answer.includes(n);
              const isTicked = ticked.includes(n);
              const state = !shown ? (isTicked ? ' on' : '')
                : isRight ? ' right'
                : isTicked ? ' wrong' : ' dim';
              return (
                <button key={n} className={`qz-opt${state}`} onClick={() => toggle(n)} disabled={shown}
                  aria-pressed={isTicked}>
                  <span className="qz-l">{LETTER(n)}</span>
                  <span className="grow" dir="auto">{opt}</span>
                  {shown && isRight && <span className="qz-mk ok"><Icon name="right" size={22} /></span>}
                  {shown && isTicked && !isRight && <span className="qz-mk no"><Icon name="wrong" size={22} /></span>}
                </button>
              );
            })}
          </div>

          {shown && (
            <div className="qz-after">
              {q.by === 'claude' && (
                <div className="quiz-by">
                  هذا الجواب من MyPromo، لا من ورقة التصحيح — الورقة الأصلية لا تحمل تصحيحًا.
                </div>
              )}
              <div className={`qz-verdict ${right ? 'ok' : 'no'}`}>
                <Icon name={right ? 'sparkle' : 'wrong'} size={20} weight="fill" />
                <b>
                  {right
                    ? (run >= 3 ? `صحيح — ${run} على التوالي` : 'صحيح')
                    : `الجواب: ${answer.map(LETTER).join(' · ') || '—'}`}
                </b>
              </div>
              {q.why && (
                <div className="qz-why">
                  <span><Icon name="bulb" size={17} /> الشرح</span>
                  <p dir="auto">{q.why}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className="qz-act">
        {written ? (
          !shown ? (
            <button className="qz-go" onClick={() => setShown(true)}>أظهر الجواب</button>
          ) : (
            <div className="qz-two">
              <button className="qz-again" onClick={() => mark(false)}>لم أعرفها</button>
              <button className="qz-go" onClick={() => mark(true)}>عرفتها</button>
            </div>
          )
        ) : !shown ? (
          <button className="qz-go" onClick={confirm} disabled={ticked.length === 0}>تأكيد</button>
        ) : (
          <button className="qz-go" onClick={() => next()}>
            {last ? (onAnswers ? 'أرسِل' : 'إنهاء') : 'السؤال التالي'}
            {!last && <Icon name="chev" size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
