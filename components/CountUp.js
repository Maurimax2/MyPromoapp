'use client';

// A number that arrives rather than appears.
//
// Counts from zero to the value over a short ease-out, once, when it first
// shows. The final value is what is in the markup for anything that reads the
// page without running scripts, and under reduced motion it is simply there.

import { useEffect, useRef, useState } from 'react';

export default function CountUp({ to, ms = 900, delay = 0 }) {
  const target = Number(to) || 0;
  const [n, setN] = useState(target);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current || target <= 0) return undefined;
    ran.current = true;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
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
