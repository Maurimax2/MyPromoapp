'use client';

// A new level, the first time this device sees it.
//
// The level is read off the points (app/profile/page.js), which are counted,
// never stored — so, like a badge, "new" means "higher than the last level
// this device showed". The first visit records the level silently.

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useT } from '@/components/Lang';

const KEY = 'mypromo.level';
const COLOURS = ['#F4CD6B', '#E3EDE5', '#E08A5A', '#43A26E', '#FFFDF8'];

export default function LevelUp({ level, toNext }) {
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let last = null;
    try { last = Number(localStorage.getItem(KEY)) || null; } catch { /* private window */ }
    try { localStorage.setItem(KEY, String(level)); } catch { /* nothing to remember with */ }
    if (last && level > last) {
      setShow(true);
      try { navigator.vibrate?.([40, 50, 80]); } catch { /* not a phone */ }
    }
  }, [level]);

  if (!show) return null;
  const close = () => setShow(false);

  return createPortal(
    <div className="bc" role="dialog" aria-label={t('المستوى {level}', { level })} onClick={close}>
      <div className="bc-rays" />
      <div className="bc-burst" aria-hidden="true">
        {Array.from({ length: 32 }, (_, i) => (
          <i
            key={i}
            style={{
              '--a': `${(i / 32) * 360}deg`, '--d': `${140 + (i * 41) % 120}px`, '--r': `${(i * 67) % 360}deg`,
              '--t': `${1 + ((i * 3) % 5) / 10}s`, background: COLOURS[i % COLOURS.length],
            }}
          />
        ))}
      </div>
      <div className="bc-card" onClick={(e) => e.stopPropagation()}>
        <div className="bc-kicker">{t('مستوى جديد')}</div>
        <div className="bc-medal lv-medal"><span>{level}</span></div>
        <b className="bc-name">{t('المستوى {level}', { level })}</b>
        <s className="bc-want">{t('{toNext} نقطة للمستوى {v2}', { toNext, v2: level + 1 })}</s>
        <button className="bc-ok" onClick={close}>{t('رائع')}</button>
      </div>
    </div>,
    document.body,
  );
}
