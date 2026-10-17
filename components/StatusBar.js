'use client';

// The strip under the clock, on a phone that draws the app edge to edge.
//
// The iPhone app used to be inset by iOS (ios.contentInset "always"): the page
// started below the clock and stopped above the home bar, framed by two strips
// of nothing — the first thing that made it read as a website. Edge to edge,
// every screen starts under the clock, and two things follow:
//
//   - Scrolled, the page would run under the clock the way it does in Safari.
//     `.sb-shade` covers that strip in the colour the screen starts with, the
//     way a native bar stays put. At the top of the page it is not drawn:
//     the screen's own head is already there.
//   - The clock is dark on a light screen and must turn light on a dark one —
//     the 3D models, a subject's hero, a duel. The colour under the clock is
//     looked at, not listed per screen, so the next dark screen needs nothing.
//
// Only inside the app: a browser draws its own bar over the page, and there
// the strip is 0 px tall anyway.

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const native = () => typeof window !== 'undefined' && !!window.Capacitor?.isNativePlatform?.();

// The colours an element paints with: its background colour, or the stops of
// its gradient. Computed styles give rgb() and, for color-mix(), color(srgb).
const paints = (el) => {
  const s = getComputedStyle(el);
  const out = [];
  const take = (text) => {
    for (const m of text.matchAll(/rgba?\(([^)]+)\)/g)) {
      const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      out.push([r, g, b, a]);
    }
    for (const m of text.matchAll(/color\(srgb ([^)]+)\)/g)) {
      const [r, g, b, a = 1] = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
      out.push([r * 255, g * 255, b * 255, a]);
    }
  };
  if (s.backgroundImage !== 'none') take(s.backgroundImage);
  if (!out.length) take(s.backgroundColor);
  return out.filter((c) => c[3] > 0.5);
};

// What is under the clock: the first thing up from the topmost element there
// that paints something solid. The shade is passed over when it is on its way
// out, or a page would take the colour of the one before it.
const under = (shade) => {
  const stack = document.elementsFromPoint(innerWidth / 2, 1);
  for (let el = stack.find((e) => shade || !e.classList.contains('sb-shade')); el; el = el.parentElement) {
    const c = paints(el);
    if (c.length) return c.reduce((m, [r, g, b]) => [m[0] + r / c.length, m[1] + g / c.length, m[2] + b / c.length], [0, 0, 0]);
  }
  return null;
};

const dark = ([r, g, b]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;

/**
 * Whether the page really is drawn under the clock. Not in a browser, and not
 * in the first iPhone build, which iOS still insets: there the strip above the
 * page is iOS's own and light whatever the screen, so a light clock asked for
 * by a dark screen would vanish into it.
 */
export function edgeToEdge() {
  if (!native()) return false;
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;top:0;height:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none';
  document.body.appendChild(probe);
  const yes = probe.offsetHeight > 0;
  probe.remove();
  return yes;
}

export default function StatusBar() {
  const path = usePathname();

  useEffect(() => {
    if (!edgeToEdge()) return undefined;
    const root = document.documentElement;
    let tone = null;
    let bars = null;
    import('@capacitor/core').then((m) => { bars = m.SystemBars; }).catch(() => {});

    const look = () => {
      // The shade takes the colour the screen starts with, so it is measured
      // with the page at the top and the shade out of the way.
      const top = window.scrollY <= 4;
      root.toggleAttribute('data-scrolled', !top);
      const c = under(!top);
      if (top && c) root.style.setProperty('--sb', `rgb(${c.map(Math.round).join(' ')})`);
      if (!c) return;
      // DARK is Capacitor's name for a dark screen, which takes a light clock.
      const want = dark(c) ? 'DARK' : 'LIGHT';
      root.dataset.clock = want;
      if (bars && want !== tone) { tone = want; bars.setStyle({ style: want }).catch(() => {}); }
    };

    look();
    const onScroll = () => { root.toggleAttribute('data-scrolled', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true });
    // A sheet, a picture opened full screen, a duel's splash: they arrive
    // without a scroll or a new address, so the colour is looked at again
    // a few times a second — one hit test, nothing a phone notices.
    const tick = setInterval(look, 350);
    return () => { clearInterval(tick); window.removeEventListener('scroll', onScroll); };
  }, [path]);

  return <div className="sb-shade" aria-hidden="true" />;
}
