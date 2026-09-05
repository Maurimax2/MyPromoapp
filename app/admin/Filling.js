'use client';

// The panel filling itself.
//
// There used to be a button here. Nobody should have to press a button to see
// their own catalogue, and when that button failed it failed quietly — so the
// panel does the work itself, one subject at a time, and says out loud what
// happened to each.

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function Filling() {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [done, setDone] = useState([]);
  const [failed, setFailed] = useState([]);
  const [at, setAt] = useState(null);
  const [state, setState] = useState('starting');  // starting|running|done|error
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      const res = await fetch('/api/admin/seed/module');
      const data = await res.json();
      if (!res.ok) { setFailed([{ name: '—', error: data.error }]); setState('error'); return; }

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
        const out = await r.json();
        if (r.ok) setDone((d) => [...d, out]);
        else setFailed((f) => [...f, { name: m.name, error: out.error }]);
      }

      setAt(null);
      setState('done');
      router.refresh();
    })();
  }, [router]);

  const total = list.length || 9;
  const seen = done.length + failed.length;
  const files = done.reduce((n, d) => n + d.documents, 0);
  const questions = done.reduce((n, d) => n + d.questions, 0);

  return (
    <section className="admin-card admin-seed">
      <div className="admin-card-t">
        {state === 'done' && !failed.length ? 'المحتوى جاهز'
          : state === 'error' ? 'تعذّر النقل'
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

      {state === 'done' && (
        <button className="btn p" onClick={() => router.refresh()}>
          <Icon name="check" size={17} /> تم
        </button>
      )}
    </section>
  );
}
