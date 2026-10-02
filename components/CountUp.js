'use client';

// A number that arrives rather than appears.
//
// Counts from zero to the value over a short ease-out whenever the value is
// first shown or changes. The final value is the initial state, so a render
// that never runs the effect (reduced motion, a failed script) still shows the
// right number, and the effect cleans up after itself so being run twice — as
// React does in development — only restarts the count and never strands it.

import { useEffect, useState } from 'react';

export default function CountUp({ to, ms = 900, delay = 0 }) {
  const target = Number(to) || 0;
  const [n, setN] = useState(target);

  useEffect(() => {
    if (target <= 0) { setN(target); return undefined; }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setN(target); return undefined; }
    let raf = 0;
    let start = 0;
    setN(0);
    const timer = setTimeout(() => {
      const step = (t) => {
        if (!start) start = t;
        const k = Math.min(1, (t - start) / ms);
        setN(Math.round(target * (1 - (1 - k) ** 3)));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target, ms, delay]);

  return <>{n}</>;
}
