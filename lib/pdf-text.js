// The words in a PDF, in reading order.
//
// pdf.js hands back a flat list of positioned fragments; a line is whatever
// shares a baseline. Grouping by that is what turns "1." and "La structure
// anatomique…" back into one line the question parser can read.
//
// Deliberately no `standardFontDataUrl`, no `cMapUrl`, no wasm: those matter
// for drawing a page and not for reading its text, and a serverless function
// cannot count on files being next to it. Checked against a real paper — the
// same 11,979 characters and the same 50 questions either way, accents intact.

/** How little text means "this is a scan, not a document". */
export const SCANNED_UNDER = 200;

export async function pdfText(bytes) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const task = pdfjs.getDocument({ data: new Uint8Array(bytes) });
  const doc = await task.promise;

  let text = '';
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();

    let baseline = null;
    let line = '';
    for (const item of content.items) {
      const y = item.transform[5];
      // Two points of drift is a wrapped line rather than a new one.
      if (baseline !== null && Math.abs(y - baseline) > 2) {
        text += `${line}\n`;
        line = '';
      }
      line += item.str;
      baseline = y;
    }
    text += `${line}\n`;
    page.cleanup();
  }

  const pages = doc.numPages;
  await task.destroy();

  return { text, pages, scanned: text.replace(/\s/g, '').length < SCANNED_UNDER };
}
