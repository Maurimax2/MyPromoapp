'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Draws the PDF itself, page by page, onto canvases.
//
// The obvious approach — an <iframe> or <embed> pointing at the file — is
// unreliable on iPhone: Safari renders only the first page, or nothing.
// Rendering with pdf.js means the document behaves the same on every phone,
// and it stays inside the app.

export default function PdfViewer({ src, title }) {
  const holder = useRef(null);
  const [state, setState] = useState({ status: 'loading', pages: 0 });

  useEffect(() => {
    let cancelled = false;
    let doc = null;

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc =
          `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

        doc = await pdfjs.getDocument({ url: src }).promise;
        if (cancelled) return;
        setState({ status: 'ok', pages: doc.numPages });

        const el = holder.current;
        if (!el) return;
        el.innerHTML = '';

        // Render at the container's width, capped so a huge phone does not
        // ask for a needlessly large canvas.
        const width = Math.min(el.clientWidth || 390, 900);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let n = 1; n <= doc.numPages; n++) {
          if (cancelled) return;
          const page = await doc.getPage(n);
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: width / base.width });

          const canvas = document.createElement('canvas');
          canvas.className = 'pdf-page';
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = '100%';
          canvas.setAttribute('aria-label', `صفحة ${n}`);
          el.appendChild(canvas);

          const ctx = canvas.getContext('2d');
          ctx.scale(dpr, dpr);
          await page.render({ canvasContext: ctx, viewport }).promise;
        }
      } catch (err) {
        if (!cancelled) setState({ status: 'error', pages: 0, message: String(err && err.message || err) });
      }
    })();

    return () => {
      cancelled = true;
      if (doc) doc.destroy();
    };
  }, [src]);

  return (
    <div className="pdf">
      {state.status === 'loading' && (
        <div className="pdf-msg">
          <div className="spinner" />
          <span>جارٍ فتح {title}…</span>
        </div>
      )}

      {state.status === 'error' && (
        <div className="pdf-msg">
          <Icon name="alert" size={26} />
          <span>تعذّر عرض الملف داخل التطبيق.</span>
          <a className="btn g" href={src} style={{ marginTop: 6 }}>فتح الملف مباشرة</a>
        </div>
      )}

      <div ref={holder} className="pdf-pages" />

      {state.status === 'ok' && (
        <div className="pdf-count">{state.pages} صفحة</div>
      )}
    </div>
  );
}
