'use client';

// A picture you can hold: two fingers zoom about their midpoint, one finger
// moves a zoomed picture, a double tap zooms in where it lands (or back out),
// and a quick sideways swipe on an unzoomed picture steps to the next one.
//
// Written for the plates (components/Planches.js) and shared with a post's
// photos (components/PhotoViewer.js), so a student's fingers do the same
// thing on both.

import { useEffect, useRef, useState } from 'react';

const REST = { s: 1, x: 0, y: 0 };

export function useZoom(box, onStep) {
  const [view, setView] = useState(REST);
  const live = useRef(view);
  live.current = view;
  // The newest onStep, without binding the listeners again on every render.
  const step = useRef(onStep);
  step.current = onStep;

  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const pts = new Map();
    let pinch = null, drag = null, lastTap = 0, swipe = null;
    const clamp = (v) => {
      const s = Math.min(5, Math.max(1, v.s));
      if (s === 1) return REST;
      const r = el.getBoundingClientRect();
      const mx = (r.width * (s - 1)) / 2, my = (r.height * (s - 1)) / 2;
      return { s, x: Math.max(-mx, Math.min(mx, v.x)), y: Math.max(-my, Math.min(my, v.y)) };
    };
    const down = (e) => {
      el.setPointerCapture?.(e.pointerId);
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), v: live.current, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
        drag = null; swipe = null;
      } else if (pts.size === 1) {
        drag = { x: e.clientX, y: e.clientY, v: live.current };
        swipe = live.current.s === 1 ? { x: e.clientX, y: e.clientY, t: Date.now() } : null;
      }
    };
    const move = (e) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch && pts.size === 2) {
        const [a, b] = [...pts.values()];
        const r = el.getBoundingClientRect();
        const k = Math.hypot(a.x - b.x, a.y - b.y) / pinch.d;
        const s = pinch.v.s * k;
        // Zoom about the fingers' midpoint, not the middle of the screen.
        const cx = pinch.mx - (r.left + r.width / 2), cy = pinch.my - (r.top + r.height / 2);
        setView(clamp({ s, x: cx - (cx - pinch.v.x) * (s / pinch.v.s), y: cy - (cy - pinch.v.y) * (s / pinch.v.s) }));
      } else if (drag && live.current.s > 1) {
        setView(clamp({ s: drag.v.s, x: drag.v.x + e.clientX - drag.x, y: drag.v.y + e.clientY - drag.y }));
      }
    };
    const up = (e) => {
      const was = pts.get(e.pointerId);
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (pts.size === 0) {
        drag = null;
        if (swipe && was) {
          const dx = was.x - swipe.x, dy = was.y - swipe.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && Date.now() - swipe.t < 600) {
            // In a right-to-left page a swipe to the left is «next» either way:
            // the picture itself is a picture, not text.
            step.current?.(dx < 0 ? 1 : -1);
            swipe = null;
            return;
          }
          if (Math.hypot(dx, dy) < 8) {
            const now = Date.now();
            if (now - lastTap < 300) {
              const r = el.getBoundingClientRect();
              const cx = was.x - (r.left + r.width / 2), cy = was.y - (r.top + r.height / 2);
              setView(live.current.s > 1 ? REST : clamp({ s: 2.5, x: -cx * 1.5, y: -cy * 1.5 }));
              lastTap = 0;
            } else lastTap = now;
          }
        }
        swipe = null;
      }
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [box]);

  return [view, setView];
}
