'use client';

// A badge the moment it is earned: the medal springs in over rays and
// confetti, says what it is for, and gets out of the way on one tap.
//
// Earned is worked out from counts (lib/points.js), never stored, so "new"
// can only mean "not yet shown on this device". The first time a device
// looks, everything already earned is recorded silently — a student opening
// the update should not be buried under a year of old badges — and from then
// on each one is celebrated once. Several at once queue, one after another.

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import BadgeArt from '@/components/BadgeArt';
import { TIERS } from '@/lib/points';

const KEY = 'mypromo.badges.seen';
const COLOURS = ['#F4CD6B', '#E3EDE5', '#E08A5A', '#43A26E', '#FFFDF8', '#C9D0D6'];

function readSeen() {
  try { const v = localStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch { return null; }
}
function writeSeen(ids) {
  try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* private window: celebrate again next time */ }
}

export default function BadgeCelebrate({ badges }) {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const earned = badges.filter((b) => b.done).map((b) => b.id);
    const seen = readSeen();
    if (!seen) { writeSeen(earned); return; }
    const fresh = badges.filter((b) => b.done && !seen.includes(b.id));
    if (fresh.length) setQueue(fresh);
  }, [badges]);

  const b = queue[0];
  useEffect(() => {
    if (!b) return;
    const seen = readSeen() || [];
    if (!seen.includes(b.id)) writeSeen([...seen, b.id]);
    try { navigator.vibrate?.([30, 40, 60]); } catch { /* not a phone */ }
  }, [b]);

  if (!b) return null;
  const next = () => setQueue((q) => q.slice(1));

  // Onto the body: the profile's cards animate in with a transform, and a
  // transformed ancestor turns position: fixed into a strip inside the card.
  return createPortal(
    <div className="bc" role="dialog" aria-label={`شارة جديدة: ${b.label}`} onClick={next} key={b.id}>
      <div className="bc-rays" />
      <div className="bc-burst" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * 360 + (i % 3) * 7;
          const dist = 130 + (i * 37) % 110;
          return (
            <i
              key={i}
              style={{
                '--a': `${a}deg`, '--d': `${dist}px`, '--r': `${(i * 53) % 360}deg`,
                '--t': `${0.9 + ((i * 7) % 5) / 10}s`, background: COLOURS[i % COLOURS.length],
              }}
            />
          );
        })}
      </div>
      <div className="bc-card" onClick={(e) => e.stopPropagation()}>
        <div className="bc-kicker">شارة جديدة</div>
        <div className="bc-medal"><BadgeArt kind={b.kind} tier={b.tier} icon={b.icon} size={150} /></div>
        <b className="bc-name">{b.label}</b>
        <span className="bc-tier">شارة {TIERS[b.tier]}</span>
        <s className="bc-want">{b.want}</s>
        <button className="bc-ok" onClick={next}>{queue.length > 1 ? 'التالية' : 'رائع'}</button>
      </div>
    </div>,
    document.body,
  );
}
