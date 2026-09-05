// pdf.js needs four sets of files at runtime: its worker, the CMap tables for
// CID-keyed fonts, the standard font programs (Times, Helvetica, Courier…) and
// the WebAssembly decoders. Without the fonts it substitutes and the letter
// spacing falls apart; without the wasm, scanned pages — JBIG2 and JPEG 2000,
// which is what every scanner app produces — do not decode at all.
//
// They are copied out of node_modules at build time and served from our own
// origin, rather than fetched from a CDN — same-origin is faster and means the
// viewer has no external dependency.

import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const from = join(root, 'node_modules', 'pdfjs-dist');
const to = join(root, 'public', 'pdfjs');

await rm(to, { recursive: true, force: true });
await mkdir(to, { recursive: true });

await cp(join(from, 'build', 'pdf.worker.min.mjs'), join(to, 'pdf.worker.min.mjs'));
await cp(join(from, 'cmaps'), join(to, 'cmaps'), { recursive: true });
await cp(join(from, 'standard_fonts'), join(to, 'standard_fonts'), { recursive: true });
await cp(join(from, 'wasm'), join(to, 'wasm'), { recursive: true });
await cp(join(from, 'iccs'), join(to, 'iccs'), { recursive: true });

console.log('pdf.js runtime assets copied to public/pdfjs');
