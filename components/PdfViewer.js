'use client';
import { useEffect, useRef, useState } from 'react';
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

const KEEP = 4;          // rendered pages retained either side of the viewport
const MAX_WIDTH = 820;   // no point rendering wider than a phone can show
const MAX_DPR = 1.5;     // 2x doubles memory for very little visible gain

export default function PdfViewer({ src, title }) {
  const holder = useRef(null);
  const [status, setStatus] = useState('loading');
  const [pages, setPages] = useState(0);
  const [percent, setPercent] = useState(0);

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

        const width = Math.min(el.clientWidth || 390, MAX_WIDTH);
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

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
            if (e.isIntersecting) {
              drawPage(slot);
            } else {
              const n = Number(slot.dataset.page);
              const near = [...drawn].some((d) => Math.abs(d - n) <= KEEP && d !== n);
              if (drawn.has(n) && drawn.size > KEEP * 2 && !near) cleanupSlot(slot);
            }
          });
        }, { rootMargin: '600px 0px' });
        slots.forEach((s) => observer.observe(s));
      } catch (err) {
        if (!dead) {
          console.error('PDF viewer:', err);
          setStatus('error');
        }
      }
    })();

    return () => {
      dead = true;
      if (observer) observer.disconnect();
      tasks.forEach((t) => { try { t.cancel(); } catch {} });
      tasks.clear();
      if (holder.current) holder.current.replaceChildren();
      if (loadingTask) { try { loadingTask.destroy(); } catch {} }
    };
  }, [src]);

  return (
    <div className="pdf">
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
