'use client';

// The panel filling itself.
//
// There used to be a button here. Nobody should have to press a button to see
// their own catalogue, and when that button failed it failed quietly — so the
// panel does the work itself, one subject at a time, and says out loud what
// happened to each.

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function Filling() {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [done, setDone] = useState([]);
  const [failed, setFailed] = useState([]);
  const [at, setAt] = useState(null);
  const [state, setState] = useState('starting');  // starting|running|done|error|nothing
  const started = useRef(false);

  const run = useCallback(async () => {
    setDone([]); setFailed([]); setState('starting');

    const res = await fetch('/api/admin/seed/module');
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setFailed([{ name: '—', error: data.error || res.status }]); setState('error'); return; }

    // Nothing missing is not an event: the card takes itself off the screen
    // rather than announcing that it had nothing to do.
    if (!data.modules?.length) { setState('nothing'); return; }

    setList(data.modules);
    setState('running');

    // One at a time, on purpose. Nine short requests survive a serverless
    // timeout where one long one does not.
    for (const m of data.modules) {
      setAt(m.name);
      const r = await fetch('/api/admin/seed/module', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: m.id }),
      });
      const out = await r.json().catch(() => ({}));
      if (r.ok) setDone((d) => [...d, out]);
      else setFailed((f) => [...f, { name: m.name, error: out.error || `HTTP ${r.status}` }]);
    }

    setAt(null);
    setState('done');
    router.refresh();
  }, [router]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    run();
  }, [run]);

  if (state === 'nothing') return null;

  const total = list.length || 1;
  const seen = done.length + failed.length;
  const files = done.reduce((n, d) => n + d.documents, 0);
  const questions = done.reduce((n, d) => n + d.questions, 0);

  return (
    <section className="admin-card admin-seed">
      <div className="admin-card-t">
        {state === 'done' && !failed.length ? 'المحتوى جاهز'
          : state === 'error' ? 'تعذّر النقل'
          : state === 'starting' ? 'نبحث عمّا ينقص'
          : 'ننقل المحتوى إلى قاعدة البيانات'}
      </div>

      <div className="fill-bar">
        <div className="fill-bar-in" style={{ width: `${(seen / total) * 100}%` }} />
      </div>

      <div className="admin-card-b">
        {at ? <span dir="ltr">{at}</span> : `${seen} / ${total}`}
        {' · '}{files} ملف · {questions} سؤال
      </div>

      {failed.map((f) => (
        <div key={f.name} className="admin-err">
          <span dir="ltr">{f.name}</span> — {f.error}
        </div>
      ))}

      {/* A run that failed needs another go, not an acknowledgement. تم used
          to call refresh() on a screen whose state had not changed, which is
          indistinguishable from a dead button. */}
      {state === 'done' && (failed.length
        ? <button className="btn p" onClick={run}>أعد المحاولة</button>
        : <button className="btn p" onClick={() => router.refresh()}>
            <Icon name="check" size={17} /> تم
          </button>)}

      {state === 'error' && <button className="btn p" onClick={run}>أعد المحاولة</button>}
    </section>
  );
}
