'use client';

// Tells the server, once a minute, that somebody has MyPromo open and which
// screen they are on — so the panel can say how many are here and doing what.
//
// Mounted once in the root layout. Draws nothing, and does nothing while the
// app is in the background: a phone in a pocket is not «online». It never asks
// anything of the student and never shows an error — being counted is worth
// less than the screen they are on.

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Screens where nobody is signed in yet, or let in yet.
const OUTSIDE = ['/login', '/waiting', '/feedback', '/auth', '/admin', '/privacy', '/delete-account', '/download'];
const EVERY = 60 * 1000;
const NEW_VISIT = 30 * 60 * 1000;
const LAST = 'mypromo.ping';

function platform() {
  if (window.Capacitor?.isNativePlatform?.()) return 'app';
  if (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone) return 'pwa';
  return 'web';
}

export default function Heartbeat() {
  const path = usePathname();
  const outside = !path || OUTSIDE.some((p) => path.startsWith(p));
  const here = useRef(path);
  here.current = path;

  useEffect(() => {
    if (outside) return undefined;

    const ping = () => {
      if (document.visibilityState !== 'visible') return;
      let last = 0;
      try { last = Number(sessionStorage.getItem(LAST) || 0); } catch { /* private mode */ }
      const now = Date.now();
      const opened = !last || now - last > NEW_VISIT;
      try { sessionStorage.setItem(LAST, String(now)); } catch { /* private mode */ }
      fetch('/api/me/ping', {
        method: 'POST', keepalive: true,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path: here.current, opened, platform: platform() }),
      }).catch(() => {});
    };

    // A moment after the screen has painted, then every minute, and again as
    // soon as the app comes back to the front.
    const first = setTimeout(ping, 2500);
    const timer = setInterval(ping, EVERY);
    const back = () => { if (document.visibilityState === 'visible') ping(); };
    document.addEventListener('visibilitychange', back);
    return () => { clearTimeout(first); clearInterval(timer); document.removeEventListener('visibilitychange', back); };
  }, [outside, path]);

  return null;
}
