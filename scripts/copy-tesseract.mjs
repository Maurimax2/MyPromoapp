// The reader for photographed papers, served from our own origin.
//
// tesseract.js fetches its worker, its WebAssembly core and its language data
// from a CDN by default. Three reasons not to: the pages are read on a phone
// on Mauritanian mobile data, where one origin beats three; a CDN that is
// slow or blocked turns a working button into a spinner with no explanation;
// and the app already serves pdf.js this way.
//
// The French data itself is not copied here — it is committed under
// public/tessdata, because npm ships only the 6 MB and 0.7 MB models and the
// 1.1 MB `fast` one reads these papers better than either.

import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const to = join(root, 'public', 'tesseract');

await rm(to, { recursive: true, force: true });
await mkdir(to, { recursive: true });

// The worker script, and the core the browser picks by what it supports —
// SIMD where there is SIMD, plain WebAssembly where there is not. Only the
// LSTM builds: that is the engine this uses, and the others are dead weight.
await cp(
  join(root, 'node_modules', 'tesseract.js', 'dist', 'worker.min.js'),
  join(to, 'worker.min.js'),
);

// Only the `.wasm.js` builds: they carry the WebAssembly inside them, so the
// browser fetches one file rather than two.
// All three: the browser picks by what it supports — relaxed SIMD where there
// is relaxed SIMD, plain SIMD next, and neither on an old phone. Ship one and
// the others 404 inside a worker, which surfaces as a network error with no
// clue in it.
for (const core of [
  'tesseract-core-lstm.wasm.js',
  'tesseract-core-simd-lstm.wasm.js',
  'tesseract-core-relaxedsimd-lstm.wasm.js',
]) {
  await cp(join(root, 'node_modules', 'tesseract.js-core', core), join(to, core));
}

console.log('tesseract runtime assets copied to public/tesseract');
