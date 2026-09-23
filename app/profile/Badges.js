'use client';

// الشارات — earned ones in gold, the rest with how far there is to go.
//
// A badge is a threshold, not a mystery (lib/points.js): tapping one says
// exactly what it wants and how much of it you have.

import { useState } from 'react';
import Icon from '@/components/Icon';
import Sheet from '@/components/Sheet';

export default function Badges({ badges }) {
  const [open, setOpen] = useState(null);
  const got = badges.filter((b) => b.done).length;
  const b = badges.find((x) => x.id === open);

  return (
    <div className="me-badges r5">
      <div className="me-days-top">
        <b>الشارات</b>
        <s>{got} من {badges.length}</s>
      </div>
      <div className="me-badge-row">
        {badges.map((x) => (
          <button key={x.id} className={`me-badge${x.done ? ' done' : ''}`} onClick={() => setOpen(x.id)}>
            <span className="me-medal">
              <Icon name={x.icon} size={24} />
              {!x.done && <span className="me-lock"><Icon name="lock" size={11} weight="fill" /></span>}
            </span>
            <b>{x.label}</b>
            <span className="me-badge-bar"><i style={{ width: `${Math.min(100, Math.round((x.have / x.need) * 100))}%` }} /></span>
          </button>
        ))}
      </div>

      {b && (
        <Sheet onClose={() => setOpen(null)}>
          <div className="me-badge-sheet">
            <span className={`me-medal big${b.done ? ' done' : ''}`}><Icon name={b.icon} size={44} /></span>
            <b>{b.label}</b>
            <s>{b.want}</s>
            <span className="me-badge-bar wide"><i style={{ width: `${Math.min(100, Math.round((b.have / b.need) * 100))}%` }} /></span>
            <em>{b.done ? 'حصلت عليها' : `${b.have} من ${b.need}`}</em>
            <button className="me-badge-ok" onClick={() => setOpen(null)}>حسنًا</button>
          </div>
        </Sheet>
      )}
    </div>
  );
}
