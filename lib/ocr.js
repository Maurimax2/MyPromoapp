// Reading a photographed paper, in the browser.
//
// Half the exam papers here are photographs of a sheet of paper — CamScanner,
// on a phone, in a lecture hall. There is no text in them at all, so the
// parser has nothing to read and the panel used to say so and stop.
//
// The reading happens on the machine of whoever pressed the button, not on the
// server: a page takes seconds, five pages would run a serverless function
// past its limit, and the browser already has pdf.js loaded to draw the page
// in the first place. The text is sent up once and kept, so a paper is read
// once ever, by the first person to ask for it.
//
// Nothing is fetched from a CDN. The engine, its WebAssembly and the French
// model are all served from our own origin — one origin is enough on mobile
// data, and a CDN that is slow or blocked is a button that spins with no
// explanation.

import { pdfjs } from '@/lib/pdfjs';

// 300 dpi on A4. This is not a free parameter: at 240 the same paper gives 14
// questions where 300 gives 19 — the engine needs the strokes. Larger than
// this buys nothing and costs a phone both memory and seconds.
const WIDTH = 2480;

// Tesseract's `single column of text of variable sizes`. These papers are one
// column of questions; left to itself the engine finds columns in the shadow
// down the right-hand side of the photograph.
const SINGLE_COLUMN = '4';

/**
 * Flatten a photograph to black on white.
 *
 * A phone photograph of a page is unevenly lit — a shadow down one side, the
 * curl of the paper, the next page showing through. One threshold for the
 * whole page cannot serve all of it: set it for the bright half and the
 * shadowed corners go solid black, taking the header and the first question
 * with them. That is not a guess; it is what the page looked like when this
 * cut at a fixed level, and it read 14 questions out of 20.
 *
 * Each pixel is judged instead against the average of the paper around it — a
 * window about a sixteenth of the page across, summed once through an integral
 * image so the cost stays linear however wide the window is. A pixel darker
 * than its surroundings by MARGIN is ink; everything else is paper.
 *
 * MARGIN is measured, not chosen: on their Anatomie 2025 paper anything from
 * 25 to 40 reads all 20 questions, 12 reads 15 and 50 reads 19. 30 sits in the
 * middle of what works.
 */
const MARGIN = 30;

function flatten(ctx, width, height) {
  const image = ctx.getImageData(0, 0, width, height);
  const px = image.data;

  // Rec. 601 luma — the same weighting a greyscale conversion uses.
  const grey = new Uint8ClampedArray(width * height);
  for (let i = 0, g = 0; i < px.length; i += 4, g++) {
    grey[g] = (px[i] * 299 + px[i + 1] * 587 + px[i + 2] * 114) / 1000;
  }

  // Summed-area table: every entry is the total of everything above and left
  // of it, so any window's total is four lookups.
  const sum = new Float64Array((width + 1) * (height + 1));
  for (let y = 0; y < height; y++) {
    let row = 0;
    for (let x = 0; x < width; x++) {
      row += grey[y * width + x];
      sum[(y + 1) * (width + 1) + x + 1] = sum[y * (width + 1) + x + 1] + row;
    }
  }

  const radius = Math.max(8, Math.round(width / 32));

  for (let y = 0; y < height; y++) {
    const y0 = Math.max(0, y - radius);
    const y1 = Math.min(height - 1, y + radius);
    for (let x = 0; x < width; x++) {
      const x0 = Math.max(0, x - radius);
      const x1 = Math.min(width - 1, x + radius);
      const total =
        sum[(y1 + 1) * (width + 1) + x1 + 1] -
        sum[y0 * (width + 1) + x1 + 1] -
        sum[(y1 + 1) * (width + 1) + x0] +
        sum[y0 * (width + 1) + x0];
      const mean = total / ((y1 - y0 + 1) * (x1 - x0 + 1));

      const g = y * width + x;
      const bw = grey[g] < mean - MARGIN ? 0 : 255;
      const i = g * 4;
      px[i] = px[i + 1] = px[i + 2] = bw;
      px[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
}

/** One page of the PDF, drawn and flattened, as something Tesseract can read. */
async function pageImage(doc, n) {
  const page = await doc.getPage(n);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: WIDTH / base.width });

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  // A PDF page is transparent where nothing is drawn, and transparent reads as
  // black once the alpha is thrown away.
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: ctx, viewport }).promise;
  flatten(ctx, canvas.width, canvas.height);
  page.cleanup();

  return canvas;
}

/**
 * Read every page of a photographed paper.
 *
 * `onPage(done, total)` is called as each one finishes — a page takes several
 * seconds and nobody should watch a button that does not move.
 */
export async function readScan(bytes, { onPage, signal } = {}) {
  const lib = await pdfjs();
  const task = lib.getDocument({
    data: new Uint8Array(bytes),
    standardFontDataUrl: '/pdfjs/standard_fonts/',
    cMapUrl: '/pdfjs/cmaps/',
    cMapPacked: true,
    // Scanners write JBIG2 and JPEG 2000, and without the decoders every page
    // draws blank — which would read as a paper with nothing on it.
    wasmUrl: '/pdfjs/wasm/',
    iccUrl: '/pdfjs/iccs/',
    useSystemFonts: false,
  });
  const doc = await task.promise;

  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker('fra', 1, {
    workerPath: '/tesseract/worker.min.js',
    corePath: '/tesseract/',
    langPath: '/tessdata',
    gzip: true,
  });

  try {
    await worker.setParameters({ tessedit_pageseg_mode: SINGLE_COLUMN });

    const pages = [];
    for (let n = 1; n <= doc.numPages; n++) {
      if (signal?.aborted) break;
      const canvas = await pageImage(doc, n);
      const { data } = await worker.recognize(canvas);
      // A canvas this size is several megabytes of bitmap; letting it go is
      // what keeps a long paper from taking the tab down with it.
      canvas.width = canvas.height = 0;
      pages.push(data.text);
      onPage?.(n, doc.numPages);
    }

    return { pages, total: doc.numPages };
  } finally {
    await worker.terminate();
    await task.destroy();
  }
}
