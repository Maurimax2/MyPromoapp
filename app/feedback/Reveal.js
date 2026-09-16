'use client';

import { useEffect, useRef, useState } from 'react';

// A section arrives as it comes into view.
//
// One observer per block, disconnected the moment it has fired — a page that
// keeps watching twenty elements while somebody scrolls is a page that drops
// frames on the phone this is written for. A browser that does not have
// IntersectionObserver, or a reader who has asked for less motion, gets the
// content sitting still, which is the point of starting from the CSS class
// rather than from an inline style.
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
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    eye.observe(el);
    return () => eye.disconnect();
  }, []);

  return (
    <Tag
      ref={host}
      className={`pl-rev${on ? ' on' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
