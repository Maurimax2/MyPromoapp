'use client';

import { useEffect, useRef, useState } from 'react';

// A section arrives as it comes into view.
//
// One observer per block, disconnected the moment it has fired — a page that
// keeps watching twenty elements while somebody scrolls is a page that drops
// frames on the phone this is written for. Nothing above the fold uses it:
// the first thing a student sees is painted by the server, not waiting on
// JavaScript. A reader who asked for less motion gets everything still.
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const host = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return undefined; }
    const eye = new IntersectionObserver((rows) => {
      for (const row of rows) {
        if (!row.isIntersecting) continue;
        setOn(true);
        eye.disconnect();
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
    eye.observe(el);
    return () => eye.disconnect();
  }, []);

  return (
    <Tag
      ref={host}
      className={`lp-rev${on ? ' on' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
