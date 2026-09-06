// pdf.js needs four sets of files at runtime: its worker, the CMap tables for
// CID-keyed fonts, the standard font programs (Times, Helvetica, Courier…) and
// the WebAssembly decoders. Without the fonts it substitutes and the letter
// spacing falls apart; without the wasm, scanned pages — JBIG2 and JPEG 2000,
// which is what every scanner app produces — do not decode at all.
//
// They are copied out of node_modules at build time and served from our own
// origin, rather than fetched from a CDN — same-origin is faster and means the
// viewer has no external dependency.

import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const from = join(root, 'node_modules', 'pdfjs-dist');
const to = join(root, 'public', 'pdfjs');

await rm(to, { recursive: true, force: true });
await mkdir(to, { recursive: true });

// The worker runs in its own realm, so a polyfill installed on the page does
// not reach it — and it calls `Map.prototype.getOrInsertComputed` seventeen
// times. That method is a proposal no browser ships yet; without it every
// page throws and nothing is ever drawn, which on screen is indistinguishable
// from a file that will not download. It is prepended here rather than
// patched into node_modules.
const POLYFILL = `if(!Map.prototype.getOrInsertComputed){Object.defineProperty(Map.prototype,"getOrInsertComputed",{value:function(k,f){if(!this.has(k))this.set(k,f(k));return this.get(k)},writable:true,configurable:true})}
if(!Map.prototype.getOrInsert){Object.defineProperty(Map.prototype,"getOrInsert",{value:function(k,v){if(!this.has(k))this.set(k,v);return this.get(k)},writable:true,configurable:true})}
`;

const worker = await readFile(join(from, 'build', 'pdf.worker.min.mjs'), 'utf8');
await writeFile(join(to, 'pdf.worker.min.mjs'), POLYFILL + worker);
await cp(join(from, 'cmaps'), join(to, 'cmaps'), { recursive: true });
await cp(join(from, 'standard_fonts'), join(to, 'standard_fonts'), { recursive: true });
await cp(join(from, 'wasm'), join(to, 'wasm'), { recursive: true });
await cp(join(from, 'iccs'), join(to, 'iccs'), { recursive: true });

console.log('pdf.js runtime assets copied to public/pdfjs');
