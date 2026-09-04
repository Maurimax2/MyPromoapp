// pdf.js needs three sets of files at runtime: its worker, the CMap tables for
// CID-keyed fonts, and the standard font programs (Times, Helvetica, Courier…).
// Without the last one it substitutes fonts and the letter spacing falls apart.
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

console.log('pdf.js runtime assets copied to public/pdfjs');
