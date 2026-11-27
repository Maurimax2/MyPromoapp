'use client';

// Drawing on a lecture kept on the phone (owner, 2026-11-27: «multiple other
// PDF tools, like highlighting»).
//
// Only here, in our own reader, which opens a lecture kept in التنزيلات: online
// reading is Google's preview, and nothing can be drawn on Google's pages.
//
// The marks are drawn ON the page, not on its text. Half the course is
// scanned — a photograph of paper, with no text in it to select — so a
// highlighter that needs a selection would work on one lecture in two. A
// marker you run along a line works on every one of them:
// - تظليل: a broad see-through marker; a stroke kept near one height is laid
//   flat on its line, the way a marker on paper ends up.
// - قلم: a fine pen, in four colours.
// - ممحاة and تراجع, inside either of those.
// - ملاحظة: a note pinned where the page is touched; its pin opens it again.
// - الصفحات: every page, the marked ones flagged, one tap to go there.
//
// While a tool is in hand, one finger draws and two still zoom; «تمّ» puts it
// down and the page scrolls again. An Apple Pencil is a finger here.
// Everything is kept on the phone (lib/marks.js), per file.

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Sheet from './Sheet';
import Icon from './Icon';
import { useT } from './Lang';
import { readMarks, writeMarks, EMPTY } from '@/lib/marks';

const COLORS = {
  hl: [['#FFD400', 'أصفر'], ['#3DDC97', 'أخضر'], ['#FF6FB5', 'وردي'], ['#5AB0FF', 'أزرق']],
  pen: [['#D7263D', 'أحمر'], ['#1F5FD6', 'أزرق'], ['#0D1B16', 'أسود'], ['#1C7457', 'أخضر']],
};
// Thickness, in thousandths of the page's width: a marker covers a line of
// lecture text, a pen is a pen.
const WIDTH = { hl: 24, pen: 3.2 };
// How near the eraser has to come, in the same units.
const REACH = 16;

const uid = () => Math.random().toString(36).slice(2, 10);
const clamp = (v) => Math.min(1, Math.max(0, v));
const fix = (v) => Math.round(v * 10000) / 10000;

// The page's height over its width, from the box the reader sized it with.
const ratioOf = (slot) => {
  const m = /([\d.]+)\s*\/\s*([\d.]+)/.exec(slot?.style.aspectRatio || '');
  return m ? Number(m[2]) / Number(m[1]) : 1.414;
};

// A marker run along a line wobbles; kept near one height, it is laid flat.
function settle(kind, pts, ratio) {
  if (kind !== 'hl' || pts.length < 2) return pts;
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const across = Math.max(...xs) - Math.min(...xs);
  const rise = (Math.max(...ys) - Math.min(...ys)) * ratio;
  if (across < 0.03 || rise > 0.035) return pts;
  const y = ys.reduce((a, b) => a + b, 0) / ys.length;
  return [[Math.min(...xs), y], [Math.max(...xs), y]];
}

// Smooth through the points rather than joining them with corners.
function pathOf(pts, ratio) {
  const P = pts.map(([x, y]) => [x * 1000, y * 1000 * ratio]);
  const f = (n) => n.toFixed(1);
  if (P.length === 1) return `M${f(P[0][0])} ${f(P[0][1])}l0.1 0`;
  let d = `M${f(P[0][0])} ${f(P[0][1])}`;
  for (let i = 1; i < P.length - 1; i += 1) {
    const mx = (P[i][0] + P[i + 1][0]) / 2;
    const my = (P[i][1] + P[i + 1][1]) / 2;
    d += `Q${f(P[i][0])} ${f(P[i][1])} ${f(mx)} ${f(my)}`;
  }
  const L = P[P.length - 1];
  return `${d}L${f(L[0])} ${f(L[1])}`;
}

// Whether a point of the page is on a stroke: its distance to each segment,
// in thousandths of the page's width.
function touches(stroke, [x, y], ratio) {
  const r = (REACH + WIDTH[stroke.kind] / 2) / 1000;
  const P = stroke.pts;
  const d2 = (ax, ay, bx, by) => {
    const vx = bx - ax, vy = (by - ay) * ratio;
    const wx = x - ax, wy = (y - ay) * ratio;
    const len = vx * vx + vy * vy;
    const k = len ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / len)) : 0;
    const dx = wx - k * vx, dy = wy - k * vy;
    return dx * dx + dy * dy;
  };
  if (P.length === 1) return d2(P[0][0], P[0][1], P[0][0], P[0][1]) < r * r;
  for (let i = 0; i < P.length - 1; i += 1) {
    if (d2(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1]) < r * r) return true;
  }
  return false;
}

export default function PdfInk({ fid, slots }) {
  const t = useT();
  const [marks, setMarks] = useState(EMPTY);
  const [ready, setReady] = useState(false);
  const [tool, setTool] = useState(null);          // null | 'hl' | 'pen' | 'note'
  const [erasing, setErasing] = useState(false);
  const [color, setColor] = useState({ hl: COLORS.hl[0][0], pen: COLORS.pen[0][0] });
  const [editing, setEditing] = useState(null);    // the note being read or written
  const [pages, setPages] = useState(null);        // the page list: null, or the page you are on
  const [onlyMarked, setOnlyMarked] = useState(false);
  const [canUndo, setCanUndo] = useState(false);

  const now = useRef(EMPTY);                       // the marks as they are, between renders
  const past = useRef([]);
  const dirty = useRef(false);
  const erased = useRef(false);                    // this sweep of the eraser has taken something
  const fresh = useRef(null);                      // a note just placed, still empty

  useEffect(() => {
    let live = true;
    readMarks(fid)
      .then((m) => { if (live) { now.current = m; setMarks(m); } })
      .catch(() => {})
      .finally(() => { if (live) setReady(true); });
    past.current = [];
    setCanUndo(false);
    return () => { live = false; };
  }, [fid]);

  // Kept a moment after the last change rather than on every point of a
  // stroke — and at once if the reader closes in between.
  useEffect(() => {
    if (!ready || !dirty.current) return undefined;
    const id = setTimeout(() => { dirty.current = false; writeMarks(fid, now.current).catch(() => {}); }, 400);
    return () => clearTimeout(id);
  }, [marks, ready, fid]);
  useEffect(() => () => { if (dirty.current) writeMarks(fid, now.current).catch(() => {}); }, [fid]);

  const put = useCallback((next, remember = true) => {
    if (remember) {
      past.current.push(now.current);
      if (past.current.length > 80) past.current.shift();
      setCanUndo(true);
    }
    now.current = next;
    dirty.current = true;
    setMarks(next);
  }, []);

  const undo = () => {
    const prev = past.current.pop();
    if (!prev) return;
    now.current = prev;
    dirty.current = true;
    setMarks(prev);
    setCanUndo(past.current.length > 0);
  };

  const stroke = useCallback((page, pts, ratio) => {
    const kind = tool;
    const m = now.current;
    put({
      ...m,
      strokes: [...m.strokes, {
        id: uid(), page, kind, color: color[kind],
        pts: settle(kind, pts, ratio).map(([x, y]) => [fix(x), fix(y)]),
      }],
    });
  }, [tool, color, put]);

  const erase = useCallback((page, point, ratio, start) => {
    if (start) erased.current = false;
    const m = now.current;
    const keep = m.strokes.filter((s) => s.page !== page || !touches(s, point, ratio));
    if (keep.length === m.strokes.length) return;
    // One sweep is one step back, however many marks it took.
    put({ ...m, strokes: keep }, !erased.current);
    erased.current = true;
  }, [put]);

  const place = useCallback((page, [x, y]) => {
    const id = uid();
    const m = now.current;
    put({ ...m, notes: [...m.notes, { id, page, x: fix(x), y: fix(y), text: '' }] });
    fresh.current = id;
    setEditing(id);
  }, [put]);

  const note = marks.notes.find((n) => n.id === editing);
  const write = (text) => {
    const m = now.current;
    put({ ...m, notes: m.notes.map((n) => (n.id === editing ? { ...n, text } : n)) }, false);
  };
  const shut = () => {
    // A note placed and left empty was a stray touch: it goes, and so does
    // the step back that placed it.
    const m = now.current;
    const n = m.notes.find((x) => x.id === editing);
    if (n && !n.text.trim()) {
      put({ ...m, notes: m.notes.filter((x) => x.id !== editing) }, false);
      if (fresh.current === editing) { past.current.pop(); setCanUndo(past.current.length > 0); }
    }
    fresh.current = null;
    setEditing(null);
  };
  const drop = () => {
    const m = now.current;
    put({ ...m, notes: m.notes.filter((x) => x.id !== editing) }, fresh.current !== editing);
    if (fresh.current === editing) { past.current.pop(); setCanUndo(past.current.length > 0); }
    fresh.current = null;
    setEditing(null);
  };

  // Which page is in the middle of the screen, for the page list.
  const openPages = () => {
    const mid = window.innerHeight / 2;
    const here = slots.find((s) => { const r = s.getBoundingClientRect(); return r.top <= mid && r.bottom >= mid; });
    setPages(here ? Number(here.dataset.page) : 1);
  };
  const go = (n) => {
    slots.find((s) => Number(s.dataset.page) === n)?.scrollIntoView({ block: 'start' });
    setPages(null);
  };

  const putDown = () => { setTool(null); setErasing(false); };
  const marked = new Set([...marks.strokes.map((s) => s.page), ...marks.notes.map((n) => n.page)]);

  return (
    <>
      {ready && slots.map((slot) => {
        const n = Number(slot.dataset.page);
        return createPortal(
          <InkPage slot={slot} page={n} tool={tool} erasing={erasing} color={tool ? color[tool] : null}
            strokes={marks.strokes.filter((s) => s.page === n)}
            notes={marks.notes.filter((x) => x.page === n)}
            onStroke={stroke} onErase={erase} onPlace={place} onOpen={setEditing} t={t} />,
          slot, `ink-${n}`,
        );
      })}

      <div className="ink-foot">
        {tool === 'hl' || tool === 'pen' ? (
          <div className="ink-dock ink-two" role="toolbar" aria-label={tool === 'hl' ? t('تظليل') : t('قلم')}>
            <span className="ink-colors">
              {COLORS[tool].map(([c, word]) => (
                <button key={c} className="ink-sw" style={{ '--c': c }} aria-label={t(word)}
                  data-on={!erasing && color[tool] === c}
                  onClick={() => { setErasing(false); setColor((k) => ({ ...k, [tool]: c })); }} />
              ))}
            </span>
            <span className="ink-row">
              <button className="ink-done" onClick={putDown}><Icon name="check" size={20} /><span>{t('تمّ')}</span></button>
              <button data-on={erasing} onClick={() => setErasing((e) => !e)}>
                <Icon name="eraser" size={20} /><span>{t('ممحاة')}</span></button>
              <button onClick={undo} disabled={!canUndo}><Icon name="undo" size={20} /><span>{t('تراجع')}</span></button>
            </span>
          </div>
        ) : tool === 'note' ? (
          <div className="ink-dock" role="toolbar" aria-label={t('ملاحظة')}>
            <button className="ink-done" onClick={putDown}><Icon name="check" size={20} /><span>{t('تمّ')}</span></button>
            <span className="ink-say">{t('المس مكان الملاحظة')}</span>
            <button onClick={undo} disabled={!canUndo}><Icon name="undo" size={20} /><span>{t('تراجع')}</span></button>
          </div>
        ) : (
          <div className="ink-dock" role="toolbar">
            <button onClick={() => setTool('hl')}><Icon name="highlight" size={21} /><span>{t('تظليل')}</span></button>
            <button onClick={() => setTool('pen')}><Icon name="pen" size={21} /><span>{t('قلم')}</span></button>
            <button onClick={() => setTool('note')}><Icon name="note" size={21} /><span>{t('ملاحظة')}</span></button>
            <button onClick={openPages} disabled={!slots.length}><Icon name="pages" size={21} /><span>{t('الصفحات')}</span></button>
          </div>
        )}
      </div>

      {note && (
        <Sheet onClose={shut}>
          <div className="sheet-say"><b>{t('ملاحظة · صفحة {n}', { n: note.page })}</b></div>
          <textarea className="ink-note" dir="auto" rows={5} value={note.text} autoFocus={!note.text}
            placeholder={t('اكتب ملاحظتك…')} onChange={(e) => write(e.target.value)} />
          <button className="sheet-act" onClick={shut}><Icon name="check" size={20} />{t('تمّ')}</button>
          {(note.text || fresh.current !== note.id) && (
            <button className="sheet-act warn" onClick={drop}>{t('احذف')}</button>
          )}
        </Sheet>
      )}

      {pages !== null && (
        <Sheet onClose={() => setPages(null)}>
          <div className="sheet-say"><b>{t('الصفحات')}</b></div>
          {marked.size > 0 && (
            <div className="ink-filter">
              <button data-on={!onlyMarked} onClick={() => setOnlyMarked(false)}>{t('كل الصفحات')}</button>
              <button data-on={onlyMarked} onClick={() => setOnlyMarked(true)}>
                {t('المعلَّمة')} <span dir="ltr">{marked.size}</span></button>
            </div>
          )}
          <div className="ink-pages">
            {slots.map((s) => Number(s.dataset.page)).filter((n) => !onlyMarked || marked.has(n)).map((n) => {
              const hl = marks.strokes.find((x) => x.page === n && x.kind === 'hl');
              const pen = marks.strokes.some((x) => x.page === n && x.kind === 'pen');
              const nts = marks.notes.some((x) => x.page === n);
              return (
                <button key={n} className="ink-pg" data-here={n === pages} onClick={() => go(n)}
                  aria-label={t('صفحة {n}', { n })}>
                  <b dir="ltr">{n}</b>
                  {(hl || pen || nts) && (
                    <span className="ink-pg-m" aria-hidden="true">
                      {hl && <i style={{ background: hl.color }} />}
                      {pen && <Icon name="pen" size={12} />}
                      {nts && <Icon name="note" size={12} />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Sheet>
      )}
    </>
  );
}

// One page's marks, drawn over its canvas, in the page's own coordinates.
function InkPage({ slot, page, tool, erasing, color, strokes, notes, onStroke, onErase, onPlace, onOpen, t }) {
  const svg = useRef(null);
  const fingers = useRef(new Set());
  const doing = useRef(null);
  const [live, setLive] = useState(null);
  const ratio = ratioOf(slot);

  const at = (e) => {
    const r = svg.current.getBoundingClientRect();
    return [clamp((e.clientX - r.left) / r.width), clamp((e.clientY - r.top) / r.height)];
  };

  const down = (e) => {
    fingers.current.add(e.pointerId);
    // A second finger is a pinch, not a stroke: whatever was started goes.
    if (fingers.current.size > 1) { doing.current = null; setLive(null); return; }
    svg.current.setPointerCapture?.(e.pointerId);
    const p = at(e);
    if (tool === 'note') { doing.current = { note: p, x: e.clientX, y: e.clientY }; return; }
    if (erasing) { doing.current = { erase: true }; onErase(page, p, ratio, true); return; }
    doing.current = { pts: [p] };
    setLive([p]);
  };
  const move = (e) => {
    const d = doing.current;
    if (!d || fingers.current.size > 1 || !fingers.current.has(e.pointerId)) return;
    const p = at(e);
    if (d.erase) { onErase(page, p, ratio, false); return; }
    if (!d.pts) return;
    const last = d.pts[d.pts.length - 1];
    if (Math.hypot(p[0] - last[0], (p[1] - last[1]) * ratio) < 0.003) return;
    d.pts.push(p);
    setLive([...d.pts]);
  };
  const up = (e) => {
    fingers.current.delete(e.pointerId);
    const d = doing.current;
    doing.current = null;
    if (!d) return;
    if (d.note) {
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < 12) onPlace(page, d.note);
      return;
    }
    if (d.pts) { setLive(null); onStroke(page, d.pts, ratio); }
  };
  const lost = (e) => { fingers.current.delete(e.pointerId); doing.current = null; setLive(null); };

  const H = 1000 * ratio;
  const draw = (s, key) => (
    <path key={key} d={pathOf(s.pts, ratio)} fill="none" stroke={s.color}
      strokeWidth={WIDTH[s.kind]} strokeLinecap={s.kind === 'hl' ? 'butt' : 'round'} strokeLinejoin="round" />
  );

  return (
    <>
      <svg ref={svg} className="ink" viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none"
        data-on={!!tool} data-tool={erasing ? 'erase' : tool || ''}
        onPointerDown={tool ? down : undefined} onPointerMove={tool ? move : undefined}
        onPointerUp={tool ? up : undefined} onPointerCancel={tool ? lost : undefined}>
        <g className="ink-hl">{strokes.filter((s) => s.kind === 'hl').map((s) => draw(s, s.id))}</g>
        <g>{strokes.filter((s) => s.kind === 'pen').map((s) => draw(s, s.id))}</g>
        {live && (
          <g className={tool === 'hl' ? 'ink-hl' : undefined}>
            {draw({ kind: tool, color, pts: live }, 'live')}
          </g>
        )}
      </svg>
      {/* The page is laid out left to right whatever the interface's
          language, and a note's place is a place on the page, so it is
          measured from the page's own left edge. */}
      {notes.map((n) => (
        <button key={n.id} className="ink-pin" style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
          onClick={() => onOpen(n.id)} aria-label={t('ملاحظة')}>
          <Icon name="note" size={16} />
        </button>
      ))}
    </>
  );
}
