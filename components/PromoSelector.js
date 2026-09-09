'use client';

// Which year's material you are reading.
//
// Not who you are: your promo is still your promo, your feed is still your
// feed, and this does not move you. It changes what الأرشيف, اختبر نفسك and
// الملخصات are showing — the years are all one faculty's, and a student
// revising ahead had no way to reach any of them.
//
// The years come from the database, never a list written here: six was a
// fact, not a rule, and the panel can add one.

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

export default function PromoSelector({ promos, current, mine }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const box = useRef(null);

  // A menu that only closes by choosing something is a trap on a phone.
  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => { if (!box.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [open]);

  if (!promos?.length) return null;

  const choose = async (id) => {
    setOpen(false);
    if (id === current) return;
    setBusy(true);
    try {
      await fetch('/api/promo', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ promo: id }),
      });
      router.refresh();
    } finally { setBusy(false); }
  };

  const here = promos.find((p) => p.id === current);

  return (
    <div className="yr" ref={box}>
      <button
        className={`yr-btn${current !== mine ? ' away' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`السنة المعروضة — ${here?.name || current}`}
        disabled={busy}
      >
        <span dir="ltr">{here?.name || current.toUpperCase()}</span>
        <Icon name="chev" size={15} />
      </button>

      {open && (
        <div className="yr-menu" role="menu">
          {promos.map((p) => (
            <button
              key={p.id}
              role="menuitem"
              className={`yr-item${p.id === current ? ' on' : ''}`}
              onClick={() => choose(p.id)}
            >
              <span className="yr-dot" style={{ background: p.badge }} />
              <span className="grow" dir="ltr">{p.name}</span>
              {/* Which one is actually yours, so leaving it is a deliberate
                  act and coming back is one tap and no thinking. */}
              {p.id === mine && <span className="yr-mine">دفعتك</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
