// A picture of what you are about to post.
//
// An attachment used to be a filename and a size, which is not enough to tell
// whether you picked the right photograph — and for a scan of a lecture, the
// filename tells you nothing at all. This makes the picture in the browser,
// from the file the phone already has: nothing is uploaded to find out what
// it looks like, and nothing waits on the network.

/** An image, at its own aspect ratio. Revoked by the caller when done with. */
export function imageThumb(file) {
  return URL.createObjectURL(file);
}

/**
 * The first page of a PDF, drawn to a data URL.
 *
 * pdf.js is a large library, so it is imported only when somebody actually
 * attaches a PDF — the feed does not pay for it otherwise. Only page one is
 * ever read: `getPage(1)` fetches what it needs and no more.
 */
export async function pdfThumb(file, width = 220) {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

  const task = pdfjs.getDocument({
    data: new Uint8Array(await file.arrayBuffer()),
    // Without these the standard fonts are substituted and the letter spacing
    // collapses — the same thing that bites in the viewer.
    standardFontDataUrl: '/pdfjs/standard_fonts/',
    cMapUrl: '/pdfjs/cmaps/',
    cMapPacked: true,
    wasmUrl: '/pdfjs/wasm/',
    iccUrl: '/pdfjs/iccs/',
  });

  try {
    const doc = await task.promise;
    const page = await doc.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: width / base.width });

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    await page.render({ canvas, canvasContext: canvas.getContext('2d'), viewport }).promise;

    const url = canvas.toDataURL('image/jpeg', 0.7);
    // The bitmap is freed straight away: on a long lecture, keeping these is
    // what filled Safari's memory in the viewer.
    canvas.width = canvas.height = 0;
    doc.destroy();
    return url;
  } catch {
    // No preview is a smaller problem than a broken composer.
    return null;
  } finally {
    try { task.destroy(); } catch {}
  }
}
