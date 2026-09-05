'use client';

// The screen you live in.
//
// One question at a time, because a wall of them is where attention goes to
// die. Number keys tick propositions, Enter publishes, and the card leaves —
// about two seconds a question once your hands know it. Everything the paper
// already answered is ticked before you arrive.

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const LETTER = (i) => String.fromCharCode(65 + i);
const TABS = [
  { id: 'needs_answer', label: 'بلا جواب' },
  { id: 'draft',        label: 'مسودة' },
  { id: 'published',    label: 'منشور' },
];

export default function ReviewScreen({ questions, modules, status, moduleId, counts }) {
  const router = useRouter();
  const [queue, setQueue] = useState(questions);
  const [ticked, setTicked] = useState(questions[0]?.answer || []);
  const [why, setWhy] = useState(questions[0]?.why || '');
  const [busy, setBusy] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const current = queue[0];
  const whyRef = useRef(null);

  useEffect(() => {
    setQueue(questions);
    setTicked(questions[0]?.answer || []);
    setWhy(questions[0]?.why || '');
  }, [questions]);

  const advance = useCallback(() => {
    setLeaving(true);
    setTimeout(() => {
      setQueue((q) => {
        const rest = q.slice(1);
        setTicked(rest[0]?.answer || []);
        setWhy(rest[0]?.why || '');
        return rest;
      });
      setLeaving(false);
    }, 180);
  }, []);

  const send = useCallback(async (next) => {
    if (!current || busy) return;
    if (next === 'published' && !ticked.length) return;
    setBusy(true);
    await fetch('/api/admin/questions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: current.id, answer: ticked, why, status: next }),
    });
    setBusy(false);
    advance();
  }, [current, ticked, why, busy, advance]);

  const toggle = useCallback((i) => {
    setTicked((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i].sort((a, b) => a - b)));
  }, []);

  // The keyboard is the point: 1–5 to tick, Enter to publish, Escape to skip.
  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement === whyRef.current) return;
      if (e.key >= '1' && e.key <= '9') {
        const i = Number(e.key) - 1;
        if (current && i < current.options.length) { toggle(i); e.preventDefault(); }
      } else if (e.key === 'Enter') { send('published'); e.preventDefault(); }
      else if (e.key === 'Escape') { advance(); e.preventDefault(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, toggle, send, advance]);

  const go = (patch) => {
    const p = new URLSearchParams();
    p.set('status', patch.status ?? status);
    if (patch.module ?? moduleId) p.set('module', patch.module ?? moduleId);
    router.push(`/admin/questions?${p}`);
  };

  return (
    <div className="admin-body">
      <div className="rev-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`rev-tab${status === t.id ? ' on' : ''}`}
            onClick={() => go({ status: t.id })}
          >
            {t.label}<span>{counts[t.id]}</span>
          </button>
        ))}
      </div>

      <select
        className="admin-input"
        value={moduleId || ''}
        onChange={(e) => go({ module: e.target.value || null })}
      >
        <option value="">كل المواد</option>
        {modules.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>

      {!current ? (
        <section className="admin-card admin-seed">
          <div className="admin-card-t">لا شيء هنا</div>
          <p className="admin-card-b">لا أسئلة في هذه القائمة.</p>
        </section>
      ) : (
        <>
          <div className="rev-meta">
            <span>{current.question_banks?.title}</span>
            <span className="rev-n">سؤال {current.n}</span>
          </div>

          <div className={`rev-card${leaving ? ' out' : ''}`}>
            <div className="rev-stem" dir="ltr">{current.stem}</div>

            <div className="rev-options">
              {current.options.map((o, i) => (
                <button
                  key={i}
                  className={`rev-opt${ticked.includes(i) ? ' on' : ''}`}
                  dir="ltr"
                  onClick={() => toggle(i)}
                >
                  <span className="rev-letter">{LETTER(i)}</span>
                  <span className="grow">{o}</span>
                  {ticked.includes(i) && <Icon name="check" size={17} />}
                </button>
              ))}
            </div>

            <textarea
              ref={whyRef}
              className="rev-why"
              dir="ltr"
              rows={2}
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="التفسير (اختياري) — بالفرنسية"
            />
          </div>

          <div className="rev-actions">
            <button className="btn p" disabled={!ticked.length || busy} onClick={() => send('published')}>
              انشر {ticked.length ? `(${ticked.map(LETTER).join('')})` : ''}
            </button>
            <div className="rev-minor">
              <button className="pill grey" onClick={advance}>تخطَّ</button>
              <button className="pill grey" onClick={() => send('rejected')}>احذف</button>
            </div>
          </div>

          <p className="rev-hint">
            الأرقام تختار · Enter ينشر · Esc يتخطى · بقي {queue.length}
          </p>
        </>
      )}
    </div>
  );
}
