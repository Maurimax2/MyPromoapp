'use client';

// Tells the server, every four minutes, that somebody has MyPromo open and
// which screen they are on — so the panel can say how many are here and doing
// what.
//
// It was once a minute and again on every change of screen, which made it
// most of the app's calls to the server — and on Vercel's free plan every
// call is CPU (owner, 2026-10-30: no Pro). Four minutes, never twice within
// one, and the screen it reports is wherever the student is at that moment.
//
// Mounted once in the root layout. Draws nothing, and does nothing while the
// app is in the background: a phone in a pocket is not «online». It never asks
// anything of the student and never shows an error — being counted is worth
// less than the screen they are on.

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** The event the duel count travels on, from here to the bottom bar. */
export const WAITING = 'mypromo:waiting';

// Screens where nobody is signed in yet, or let in yet.
const OUTSIDE = ['/login', '/waiting', '/feedback', '/auth', '/admin', '/privacy', '/delete-account', '/download', '/terms', '/support'];
const EVERY = 4 * 60 * 1000;
const SOON = 60 * 1000;          // a ping this soon after the last one is not sent
const NEW_VISIT = 30 * 60 * 1000;
const LAST = 'mypromo.ping';

function platform() {
  if (window.Capacitor?.isNativePlatform?.()) return 'app';
  if (/MyPromoDesktop/.test(navigator.userAgent)) return 'desktop';
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
      if (last && now - last < SOON) return;
      const opened = !last || now - last > NEW_VISIT;
      try { sessionStorage.setItem(LAST, String(now)); } catch { /* private mode */ }
      // The answer carries the bottom bar's duel count, so the bar does not
      // make a call of its own beside this one (BottomNav listens for it).
      fetch('/api/me/ping', {
        method: 'POST', keepalive: true,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path: here.current, opened, platform: platform() }),
      })
        .then((r) => (r.status === 200 ? r.json() : null))
        .then((d) => {
          if (typeof d?.waiting === 'number') window.dispatchEvent(new CustomEvent(WAITING, { detail: d.waiting }));
        })
        .catch(() => {});
    };

    // A moment after the app has painted, then every four minutes, and again
    // as soon as the app comes back to the front. Not on a change of screen:
    // `here` carries the screen, and the next ping reports it.
    const first = setTimeout(ping, 2500);
    const timer = setInterval(ping, EVERY);
    const back = () => { if (document.visibilityState === 'visible') ping(); };
    document.addEventListener('visibilitychange', back);
    return () => { clearTimeout(first); clearInterval(timer); document.removeEventListener('visibilitychange', back); };
  }, [outside]);

  return null;
}
