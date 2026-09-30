'use client';

// الشارات — earned ones in their metal, the rest in grey with how far there
// is to go.
//
// A badge is a threshold, not a mystery (lib/points.js): tapping one says
// exactly what it wants and how much of it you have.

import { useState } from 'react';
import Sheet from '@/components/Sheet';
import BadgeArt from '@/components/BadgeArt';
import BadgeCelebrate from '@/components/BadgeCelebrate';
import { TIERS } from '@/lib/points';

const pct = (b) => Math.min(100, Math.round((b.have / b.need) * 100));

export default function Badges({ badges }) {
  const [open, setOpen] = useState(null);
  const got = badges.filter((b) => b.done).length;
  const b = badges.find((x) => x.id === open);
  // Earned first, then the ones closest to being earned.
  const shelf = [...badges].sort((x, y) => (y.done - x.done) || (pct(y) - pct(x)));

  return (
    <div className="me-badges r5">
      <BadgeCelebrate badges={badges} />
      <div className="me-days-top">
        <b>الشارات</b>
        <s>{got} من {badges.length}</s>
      </div>
      <div className="me-badge-row">
        {shelf.map((x, i) => (
          <button
            key={x.id}
            className={`me-badge${x.done ? ' done' : ''}`}
            style={{ '--i': i }}
            onClick={() => setOpen(x.id)}
          >
            <BadgeArt kind={x.kind} tier={x.tier} icon={x.icon} done={x.done} size={58} />
            <b>{x.label}</b>
            <span className="me-badge-bar"><i style={{ width: `${pct(x)}%` }} /></span>
          </button>
        ))}
      </div>

      {b && (
        <Sheet onClose={() => setOpen(null)}>
          <div className="me-badge-sheet">
            <span className="me-badge-big"><BadgeArt kind={b.kind} tier={b.tier} icon={b.icon} done={b.done} size={124} /></span>
            <b>{b.label}</b>
            <span className={`me-badge-tier t${b.tier}`}>شارة {TIERS[b.tier]}</span>
            <s>{b.want}</s>
            <span className="me-badge-bar wide"><i style={{ width: `${pct(b)}%` }} /></span>
            <em>{b.done ? 'حصلت عليها' : `${b.have} من ${b.need}`}</em>
            <button className="me-badge-ok" onClick={() => setOpen(null)}>حسنًا</button>
          </div>
        </Sheet>
      )}
    </div>
  );
}
