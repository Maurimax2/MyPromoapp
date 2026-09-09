'use client';

// What a phone shows instead of a dialog.
//
// It comes up from the edge the thumb is already at, the screen behind it is
// dimmed and blurred so the page is plainly still there, and it goes away
// three ways: the dimmed area, the cancel row, or pushing it back down.
//
// The grip is why the drag is here at all. A handle that cannot be dragged is
// the same fault as the + that was a <div> for weeks — the biggest signal on
// the surface, meaning nothing. Either the mark goes or the gesture does, and
// the gesture is the one worth having.

import { useCallback, useEffect, useRef, useState } from 'react';

// Far enough that a tap or a scroll-flick never dismisses by accident, close
// enough that a deliberate push always does.
const FAR_ENOUGH = 90;

export default function Sheet({ onClose, children }) {
  const [drag, setDrag] = useState(0);      // how far it has been pushed down
  const [going, setGoing] = useState(false); // let it fall before unmounting
  const from = useRef(null);

  const close = useCallback(() => {
    if (going) return;
    setGoing(true);
    // Long enough for the sheet to reach the bottom, so it is never seen
    // vanishing from halfway up the screen.
    setTimeout(onClose, 200);
  }, [going, onClose]);

  // Escape closes it on a keyboard, and the page behind must not scroll under
  // a sheet — on a phone that reads as the sheet sliding around.
  useEffect(() => {
    const key = (e) => { if (e.key === 'Escape') close(); };
    const had = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = had;
      document.removeEventListener('keydown', key);
    };
  }, [close]);

  // The capture goes on the element carrying the handlers, not on the sheet.
  // Capturing on the sheet retargets every later pointer event to the sheet,
  // so the moment a finger left the small grip the moves stopped arriving
  // here — the distance froze a few pixels in and every real push sprang
  // back as if it had been a twitch.
  const start = (e) => {
    from.current = e.clientY;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const move = (e) => {
    if (from.current === null) return;
    // Down only. Pulling up past the top edge is a rubber band we do not need.
    setDrag(Math.max(0, e.clientY - from.current));
  };

  const end = () => {
    if (from.current === null) return;
    from.current = null;
    if (drag > FAR_ENOUGH) close();
    else setDrag(0);   // not far enough — it springs back
  };

  return (
    <div className={`sheet-back${going ? ' going' : ''}`} onClick={close}>
      <div
        className={`sheet${going ? ' going' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={drag ? { transform: `translateY(${drag}px)`, transition: 'none' } : undefined}
        role="dialog"
        aria-modal="true"
      >
        {/* The grip takes the gesture, and so does the padding around it: a
            4px-tall bar is not a touch target. */}
        <div
          className="sheet-grab"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        >
          <div className="sheet-grip" />
        </div>
        {children}
      </div>
    </div>
  );
}
