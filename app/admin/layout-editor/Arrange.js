'use client';

// Up, down, on, off.
//
// Arrows rather than dragging: this is used on a phone, one-handed, and a
// drag that needs a long press and a steady thumb is a worse tool than two
// buttons that always work.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function Arrange({ blocks, catalogue }) {
  const router = useRouter();
  const [rows, setRows] = useState(blocks);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const about = Object.fromEntries(catalogue.map((b) => [b.id, b]));
  const touch = (next) => { setRows(next); setSaved(false); };

  const move = (i, by) => {
    const to = i + by;
    if (to < 0 || to >= rows.length) return;
    const next = [...rows];
    [next[i], next[to]] = [next[to], next[i]];
    touch(next);
  };

  const toggle = (i) => touch(rows.map((r, n) => (n === i ? { ...r, on: !r.on } : r)));
  const set = (i, key, value) =>
    touch(rows.map((r, n) => (n === i ? { ...r, [key]: value } : r)));

  const save = async () => {
    setBusy(true); setError('');
    let res, data;
    try {
      res = await fetch('/api/admin/layout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ screen: 'home', blocks: rows }),
      });
      data = await res.json().catch(() => ({}));
    } catch {
      setBusy(false); setError('لا اتصال بالخادم'); return;
    }
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر الحفظ (${res.status})`); return; }
    setSaved(true);
    router.refresh();
  };

  return (
    <div className="admin-body">
      <div className="admin-bar">
        <span>ترتيب الرئيسية</span>
        <span>{rows.filter((r) => r.on).length} من {rows.length}</span>
      </div>

      {error && <div className="admin-err">{error}</div>}

      <div className="admin-rows">
        {rows.map((row, i) => {
          const block = about[row.id];
          if (!block) return null;
          return (
            <div key={row.id} className={`arr${row.on ? '' : ' off'}`}>
              <div className="arr-move">
                <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="لأعلى">
                  <Icon name="chevR" size={15} />
                </button>
                <span className="arr-n">{i + 1}</span>
                <button onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label="لأسفل">
                  <Icon name="chevR" size={15} />
                </button>
              </div>

              <div className="grow">
                <div className="arr-t">{block.name}</div>
                <div className="arr-b">{block.about}</div>

                {row.on && (block.options || []).map((opt) => (
                  <div key={opt.id} className="arr-opt">
                    <span>{opt.name}</span>
                    <div className="imp-kinds">
                      {opt.values.map((v) => (
                        <button
                          key={String(v)}
                          className={`imp-kind${row[opt.id] === v ? ' on' : ''}`}
                          onClick={() => set(i, opt.id, v)}
                        >
                          {String(v)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={`arr-sw${row.on ? ' on' : ''}`}
                onClick={() => toggle(i)}
                aria-label={row.on ? `أخفِ ${block.name}` : `أظهِر ${block.name}`}
              >
                <span />
              </button>
            </div>
          );
        })}
      </div>

      <div className="arr-save">
        <button className="btn p" disabled={busy} onClick={save}>
          {busy ? 'نحفظ…' : saved ? 'حُفظ ✓' : 'احفظ الترتيب'}
        </button>
        <p className="admin-card-b">
          يظهر على شاشة كل طالب فورًا. جرّبه من «التطبيق» بالأعلى.
        </p>
      </div>
    </div>
  );
}
