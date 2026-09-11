'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { pdfjs as load } from '@/lib/pdfjs';

// Draws the PDF page by page onto canvases.
//
// Two things matter more than anything else here, and getting them wrong is
// what crashed the tab before:
//
//   Memory. A rendered page is a bitmap. At 2x on a phone a single A4 page is
//   roughly 16 MB, so a 40-page lecture with every page retained is enough for
//   iOS to kill the tab — which looks to the student like "it froze and I had
//   to reload". Only a small window of pages is ever kept drawn; the rest fall
//   back to an empty box of the right height.
//
//   Time to first page. Asking the document for every page's size before
//   drawing anything stalls a long lecture. Page one is measured and drawn
//   immediately, and its shape sizes the placeholders for the rest.

const MAX_DPR = 1.5;     // 2x doubles memory for very little visible gain

// How many pixels across a page may ever be drawn.
//
// A drawn page is a bitmap the browser holds until it is thrown away, and
// keeping every page drawn is what crashed Safari on a long lecture. So a
// wider page is drawn at a lower density rather than at a larger size, and a
// page on a 1280px tablet costs about what one on a phone always did.
//
// A student who has pinched in has asked for detail and gets more of it —
// paid for by holding fewer pages at once, which is what `keepFor` is doing
// below. Without this, zooming would only enlarge the same bitmap: bigger
// letters made of the same number of pixels, which is not what anybody zooms
// a lecture for.
const BUDGET = 1500;
const BUDGET_ZOOM = 2200;

// Pages retained either side of the viewport, against the size of one.
const keepFor = (px) => (px > 1800 ? 1 : px > 800 ? 2 : 4);

export default function PdfViewer({ src, title, zoom = 1, onZoom }) {
  const holder = useRef(null);        // .pdf-pages
  const [status, setStatus] = useState('loading');
  const [pages, setPages] = useState(0);
  const [percent, setPercent] = useState(0);

  const zoomRef = useRef(zoom);
  const rescale = useRef(null);       // filled in once the document is open

  // What is actually scrolling.
  //
  // Normally the window: the reader is just a long page. In ملء الشاشة the
  // reader becomes its own scrolling surface, because a page zoomed wider
  // than the screen has to pan and the window would not take it.
  const surface = () => {
    const el = holder.current?.parentElement;
    if (el && getComputedStyle(el).overflowY !== 'visible') return el;
    return document.scrollingElement || document.documentElement;
  };

  // Where you are in the document, as a fraction of its height.
  //
  // A zoom changes the size of every page, so the pixel you were parked at
  // means nothing afterwards. Without this, pinching while reading page 30
  // puts you back at the top of page 1.
  const at = useRef(0);
  useEffect(() => {
    const note = () => {
      const s = surface();
      const run = s.scrollHeight - s.clientHeight;
      if (run > 0) at.current = s.scrollTop / run;
    };
    // Captured rather than bubbled: a scroll inside an element does not
    // bubble, and which of the two is scrolling changes with ملء الشاشة.
    window.addEventListener('scroll', note, { capture: true, passive: true });
    return () => window.removeEventListener('scroll', note, { capture: true });
  }, []);

  // The width has already changed in the DOM by the time this runs, so the
  // page is the right size and only the drawing is stale. Put the reader back
  // where they were before the browser paints, then redraw.
  useLayoutEffect(() => {
    zoomRef.current = zoom;
    const s = surface();
    const run = s.scrollHeight - s.clientHeight;
    if (run > 0) s.scrollTop = at.current * run;
    rescale.current?.();
  }, [zoom]);

  // Two fingers.
  //
  // The browser's own pinch zooms the whole page — the header, the bar, the
  // button you would need to get back — and inside a fullscreen document it
  // does nothing at all, which is what a student sees as "it will not let
  // me". This zooms the document instead, and the pages are drawn again at
  // the new size rather than stretched.
  useEffect(() => {
    const el = holder.current?.parentElement;
    if (!el || !onZoom) return undefined;

    let apart = 0;
    let from = 1;
    const span = (t) => Math.hypot(
      t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

    const start = (e) => {
      if (e.touches.length !== 2) return;
      apart = span(e.touches);
      from = zoomRef.current;
    };
    const move = (e) => {
      if (e.touches.length !== 2 || !apart) return;
      e.preventDefault();          // or the page scrolls under the fingers
      onZoom(from * (span(e.touches) / apart));
    };
    const done = () => { apart = 0; };

    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchmove', move, { passive: false });
    el.addEventListener('touchend', done);
    el.addEventListener('touchcancel', done);
    return () => {
      el.removeEventListener('touchstart', start);
      el.removeEventListener('touchmove', move);
      el.removeEventListener('touchend', done);
      el.removeEventListener('touchcancel', done);
    };
  }, [onZoom]);

  useEffect(() => {
    let dead = false;
    let loadingTask = null;
    let doc = null;
    let observer = null;
    const tasks = new Map();   // page number -> live RenderTask
    const drawn = new Set();

    const cleanupSlot = (slot) => {
      const n = Number(slot.dataset.page);
      const task = tasks.get(n);
      if (task) { try { task.cancel(); } catch {} tasks.delete(n); }
      slot.replaceChildren();
      drawn.delete(n);
    };

    (async () => {
      try {
        const pdfjs = await load();

        loadingTask = pdfjs.getDocument({
          url: src,
          // Without these the standard PDF fonts are substituted and the
          // letter spacing breaks apart.
          standardFontDataUrl: '/pdfjs/standard_fonts/',
          cMapUrl: '/pdfjs/cmaps/',
          cMapPacked: true,
          // Scanners compress their pages with JBIG2 and JPEG 2000, and pdf.js
          // decodes both in WebAssembly. Without this the scanned lectures —
          // the CamScanner ones especially — come up blank or smeared.
          wasmUrl: '/pdfjs/wasm/',
          iccUrl: '/pdfjs/iccs/',
          // Much of this material is exported from PowerPoint and names fonts
          // (Calibri, Cambria) that no phone has. Left to itself pdf.js hands
          // those to the device and the metrics fall apart differently on
          // every phone; this makes it use its own substitution tables.
          useSystemFonts: false,
          // Keep pdf.js from eagerly pulling the whole file down.
          disableAutoFetch: true,
          rangeChunkSize: 262144,
        });
        loadingTask.onProgress = ({ loaded, total }) => {
          if (!dead && total) setPercent(Math.min(99, Math.round((loaded / total) * 100)));
        };

        doc = await loadingTask.promise;
        if (dead) return;
        setPages(doc.numPages);

        const el = holder.current;
        if (!el) return;
        el.replaceChildren();

        // How wide to draw a page, worked out afresh every time rather than
        // once: the answer changes when a student zooms, and it changes when
        // ملء الشاشة takes the document from `--doc-w` out to the whole
        // screen. A canvas drawn for the narrower of the two is stretched and
        // soft the moment either happens, so the wider one always wins — a
        // page scaled down costs nothing to look at.
        const measure = () => {
          const z = zoomRef.current;
          const width = Math.max(el.clientWidth || 0, (window.innerWidth || 390) * z);
          const dpr = Math.min(
            window.devicePixelRatio || 1, MAX_DPR,
            (z > 1.05 ? BUDGET_ZOOM : BUDGET) / width);
          return { width, dpr, keep: keepFor(width * dpr) };
        };

        // Measure page one only. Its shape stands in for the rest until each
        // is actually drawn, which is what makes the first page appear fast.
        const first = await doc.getPage(1);
        if (dead) return;
        const unit = first.getViewport({ scale: 1 });
        const ratio = `${unit.width} / ${unit.height}`;

        const slots = [];
        for (let n = 1; n <= doc.numPages; n++) {
          const slot = document.createElement('div');
          slot.className = 'pdf-page';
          slot.style.aspectRatio = ratio;
          slot.dataset.page = String(n);
          el.appendChild(slot);
          slots.push(slot);
        }
        setStatus('ok');

        const drawPage = async (slot) => {
          const n = Number(slot.dataset.page);
          if (dead || drawn.has(n)) return;
          drawn.add(n);
          const { width, dpr } = measure();
          slot.dataset.drawnAt = String(Math.round(width));
          try {
            const page = n === 1 ? first : await doc.getPage(n);
            if (dead) return;
            const base = page.getViewport({ scale: 1 });
            const viewport = page.getViewport({ scale: width / base.width });
            slot.style.aspectRatio = `${base.width} / ${base.height}`;

            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(viewport.width * dpr);
            canvas.height = Math.floor(viewport.height * dpr);
            canvas.style.width = '100%';
            canvas.style.display = 'block';
            canvas.setAttribute('aria-label', `صفحة ${n}`);

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            const task = page.render({ canvasContext: ctx, viewport });
            tasks.set(n, task);
            await task.promise;
            tasks.delete(n);
            if (!dead) slot.replaceChildren(canvas);
          } catch (err) {
            drawn.delete(n);
            if (err && err.name !== 'RenderingCancelledException') {
              console.error(`page ${n}:`, err);
            }
          }
        };

        await drawPage(slots[0]);

        // Draw what is near, free what is far. Freeing is the half that keeps
        // the tab alive on a long document.
        observer = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            const slot = e.target;
            const { keep } = measure();
            if (e.isIntersecting) {
              drawPage(slot);
            } else {
              const n = Number(slot.dataset.page);
              const near = [...drawn].some((d) => Math.abs(d - n) <= keep && d !== n);
              if (drawn.has(n) && drawn.size > keep * 2 && !near) cleanupSlot(slot);
            }
          });
        }, { rootMargin: '600px 0px' });
        slots.forEach((s) => observer.observe(s));

        // A zoom happened. Throw away every page drawn at the old size and
        // draw the ones on screen again at the new one; the observer picks up
        // the rest as the student scrolls into them.
        rescale.current = () => {
          if (dead) return;
          const { width } = measure();
          const want = String(Math.round(width));
          slots.forEach((s) => {
            if (drawn.has(Number(s.dataset.page)) && s.dataset.drawnAt !== want) {
              cleanupSlot(s);
            }
          });
          const tall = window.innerHeight;
          slots.forEach((s) => {
            const box = s.getBoundingClientRect();
            if (box.bottom > -400 && box.top < tall + 400) drawPage(s);
          });
        };
      } catch (err) {
        if (!dead) {
          console.error('PDF viewer:', err);
          setStatus('error');
        }
      }
    })();

    return () => {
      dead = true;
      rescale.current = null;
      if (observer) observer.disconnect();
      tasks.forEach((t) => { try { t.cancel(); } catch {} });
      tasks.clear();
      if (holder.current) holder.current.replaceChildren();
      if (loadingTask) { try { loadingTask.destroy(); } catch {} }
    };
  }, [src]);

  return (
    <div className="pdf" style={{ '--zoom': zoom }}>
      {status === 'loading' && (
        <div className="pdf-msg">
          <div className="spinner" />
          <span>جارٍ فتح {title}…</span>
          {percent > 0 && <span className="pdf-pct">{percent}%</span>}
        </div>
      )}

      {status === 'error' && (
        <div className="pdf-msg">
          <Icon name="alert" size={26} />
          <span>تعذّر عرض الملف داخل التطبيق.</span>
          <a className="btn g" href={src} style={{ marginTop: 6 }}>فتح الملف مباشرة</a>
        </div>
      )}

      <div ref={holder} className="pdf-pages" />

      {status === 'ok' && <div className="pdf-count">{pages} صفحة</div>}
    </div>
  );
}
