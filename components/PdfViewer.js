'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Draws the PDF itself, page by page, onto canvases.
//
// An <iframe> or <embed> is unreliable on iPhone — Safari renders only the
// first page, or nothing. Rendering with pdf.js means the document behaves
// the same on every phone, and it stays inside the app.
//
// Two things keep it quick: the proxy passes through range requests so pdf.js
// streams rather than waiting for the whole file, and only pages near the
// viewport are drawn. Every page still gets a correctly-sized placeholder up
// front, so scrolling never jumps.

export default function PdfViewer({ src, title }) {
  const holder = useRef(null);
  const [status, setStatus] = useState('loading');
  const [pages, setPages] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let doc = null;
    let observer = null;

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

        const task = pdfjs.getDocument({
          url: src,
          // Without these the standard PDF fonts are substituted and the
          // letter spacing breaks apart.
          standardFontDataUrl: '/pdfjs/standard_fonts/',
          cMapUrl: '/pdfjs/cmaps/',
          cMapPacked: true,
        });
        task.onProgress = ({ loaded, total }) => {
          if (!cancelled && total) setPercent(Math.min(99, Math.round((loaded / total) * 100)));
        };

        doc = await task.promise;
        if (cancelled) return;
        setPages(doc.numPages);
        setStatus('ok');

        const el = holder.current;
        if (!el) return;
        el.innerHTML = '';

        const width = Math.min(el.clientWidth || 390, 1000);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const drawn = new Set();

        // A placeholder per page, at the right height, so the scrollbar is
        // honest before anything has been drawn.
        const slots = [];
        for (let n = 1; n <= doc.numPages; n++) {
          const page = await doc.getPage(n);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: width / base.width });

          const slot = document.createElement('div');
          slot.className = 'pdf-page';
          slot.style.aspectRatio = `${base.width} / ${base.height}`;
          slot.dataset.page = String(n);
          el.appendChild(slot);
          slots.push({ slot, page, viewport });
        }

        const draw = async ({ slot, page, viewport }) => {
          const n = slot.dataset.page;
          if (drawn.has(n)) return;
          drawn.add(n);
          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = '100%';
          canvas.style.display = 'block';
          canvas.setAttribute('aria-label', `صفحة ${n}`);
          const ctx = canvas.getContext('2d');
          ctx.scale(dpr, dpr);
          await page.render({ canvasContext: ctx, viewport }).promise;
          if (!cancelled) slot.replaceChildren(canvas);
        };

        // First page immediately; the rest as they come into view.
        if (slots[0]) await draw(slots[0]);

        observer = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const hit = slots.find((s) => s.slot === e.target);
            if (hit) draw(hit);
          });
        }, { rootMargin: '800px 0px' });
        slots.forEach((s) => observer.observe(s.slot));
      } catch (err) {
        if (!cancelled) {
          setStatus('error');
          console.error('PDF viewer:', err);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (doc) doc.destroy();
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
