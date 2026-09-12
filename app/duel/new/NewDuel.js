'use client';

// Setting up a duel, and taking it.
//
// Who, what, then ten questions. In that order on purpose: asked the other
// way round you would answer ten questions and then find out nobody holds
// that number.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Quiz from '@/components/Quiz';
import { normalise, looksRight } from '@/lib/matricule';

export default function NewDuel({ subjects, to }) {
  const router = useRouter();
  const [matricule, setMatricule] = useState(to || '');
  const [module, setModule] = useState('');
  const [about, setAbout] = useState(null);      // the subject's lectures
  const [lecture, setLecture] = useState('all');
  const [run, setRun] = useState(null);          // the drawn questions
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const number = normalise(matricule);
  const ready = looksRight(number) && module && about;

  // How many it will actually be. A subject with four usable questions draws
  // four, and a button promising ten over it is a button that lies about the
  // one number the student is agreeing to.
  const here = lecture === 'all'
    ? about?.total
    : about?.lectures.find((l) => l.id === lecture)?.count;
  const willBe = Math.min(about?.length || 10, here || 0);

  useEffect(() => {
    if (!module) { setAbout(null); return undefined; }
    let alive = true;
    setBusy(true); setError(''); setLecture('all');
    fetch(`/api/duel/setup?module=${encodeURIComponent(module)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        setBusy(false);
        if (d.error) { setError(d.error); return; }
        setAbout(d);
      })
      .catch(() => { if (alive) { setBusy(false); setError('لا اتصال'); } });
    return () => { alive = false; };
  }, [module]);

  const start = async () => {
    setBusy(true); setError('');
    const res = await fetch(
      `/api/duel/setup?module=${encodeURIComponent(module)}&lecture=${encodeURIComponent(lecture)}`);
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(d.error || 'تعذّر'); return; }
    setRun(d.questions);
  };

  const send = async (answers) => {
    setBusy(true); setError('');
    const chosen = about.lectures.find((l) => l.id === lecture);
    const res = await fetch('/api/duel', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        matricule: number,
        module,
        lecture: chosen ? { id: Number(chosen.id), title: chosen.title } : null,
        questions: run.map((q) => q.dbId),
        answers,
      }),
    });
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(d.error || 'تعذّر الإرسال'); setRun(null); return; }
    router.push(`/duel/${d.id}`);
  };

  if (run) {
    return (
      <Quiz
        questions={run}
        moduleName={about?.name}
        source="تحدٍّ"
        onAnswers={send}
      />
    );
  }

  return (
    <>
      <section className="card duel-set">
        <div className="nm">من تتحدّى؟</div>
        <input
          className="login-input"
          dir="ltr"
          placeholder="D04458"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value.toUpperCase())}
          aria-label="الرقم الجامعي"
        />
      </section>

      <div className="eyebrow">المادة</div>
      <div className="imp-kinds">
        {subjects.map((s) => (
          <button
            key={s.id}
            className={`imp-kind${module === s.id ? ' on' : ''}`}
            onClick={() => setModule(s.id)}
            dir="ltr"
          >
            {s.name}
          </button>
        ))}
      </div>
      {!subjects.length && (
        <p className="quiz-note">لا مواد فيها أسئلة بعد.</p>
      )}

      {about && (
        <>
          <div className="eyebrow">على أيّ محاضرة؟</div>
          <section className="chapter">
            <button
              className={`pick${lecture === 'all' ? ' on' : ''}`}
              onClick={() => setLecture('all')}
            >
              <span className={`pick-box${lecture === 'all' ? ' on' : ''}`}>
                {lecture === 'all' && <Icon name="check" size={13} />}
              </span>
              <span className="grow"><span className="lec-nm">المادة كلها</span></span>
              <span className="num">{about.total}</span>
            </button>

            {about.lectures.map((l) => (
              <button
                key={l.id}
                className={`pick${lecture === l.id ? ' on' : ''}`}
                onClick={() => setLecture(l.id)}
              >
                <span className={`pick-box${lecture === l.id ? ' on' : ''}`}>
                  {lecture === l.id && <Icon name="check" size={13} />}
                </span>
                {l.n != null && <span className="num pick-n">{l.n}</span>}
                <span className="grow">
                  <span className="lec-nm" dir="auto">{l.title}</span>
                </span>
                <span className="num">{l.count}</span>
              </button>
            ))}

            {!about.lectures.length && (
              <p className="quiz-note" style={{ margin: 12 }}>
                لم تُصنَّف أسئلة هذه المادة حسب المحاضرة بعد — التحدّي على المادة كلها.
              </p>
            )}
          </section>
        </>
      )}

      {error && <div className="admin-err">{error}</div>}

      <button className="btn p" disabled={!ready || busy} onClick={start}>
        {busy ? '…' : `ابدأ — ${willBe} ${willBe === 2 ? 'سؤالان' : 'أسئلة'}`}
      </button>

      <p className="quiz-note">
        تجيب أنت أوّلًا، ثمّ يصله التحدّي بالأسئلة نفسها.
      </p>
    </>
  );
}
