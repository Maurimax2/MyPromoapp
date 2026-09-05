// Why a paper yielded nothing.
//
// Three answers are possible and they need different work: the file holds no
// text at all (a photograph — it needs OCR), it holds text the parser could
// not shape into questions (the parser needs teaching), or it is simply not a
// QCM paper (an essay subject, a table of results).
//
//   GOOGLE_API_KEY=… node scripts/diagnose-qcm.mjs <moduleId …>

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODULES, sectionsFor, moduleById } from '../lib/data.js';
import { parseQcm } from '../lib/qcm/parse.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const key = process.env.GOOGLE_API_KEY;
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function textOf(fid) {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fid}?alt=media&key=${key}`);
  if (!res.ok) throw new Error(`drive ${res.status}`);
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(await res.arrayBuffer()),
    standardFontDataUrl: join(root, 'public/pdfjs/standard_fonts/'),
    cMapUrl: join(root, 'public/pdfjs/cmaps/'), cMapPacked: true,
    wasmUrl: join(root, 'public/pdfjs/wasm/'), iccUrl: join(root, 'public/pdfjs/iccs/'),
  }).promise;
  let out = '';
  for (let p = 1; p <= doc.numPages; p++) {
    const tc = await (await doc.getPage(p)).getTextContent();
    let last = null, line = '';
    for (const it of tc.items) {
      const y = it.transform[5];
      if (last !== null && Math.abs(y - last) > 3) { out += line.trim() + '\n'; line = ''; }
      line += it.str + (it.hasEOL ? '\n' : '');
      last = y;
    }
    out += line.trim() + '\n';
  }
  await doc.cleanup();
  return out;
}

for (const id of process.argv.slice(2)) {
  const m = moduleById(id);
  if (!m) continue;
  console.log(`\n### ${m.name}`);
  for (const s of sectionsFor(m, 'quiz')) {
    for (const it of s.items) {
      if ((it.ext || 'PDF').toUpperCase() !== 'PDF') { console.log(`  image  ${it.title}`); continue; }
      await wait(400);
      try {
        const text = await textOf(it.fid);
        const chars = text.replace(/\s/g, '').length;
        const qs = parseQcm(text).filter((q) => q.options.length >= 3);
        const verdict = chars < 200 ? 'SCAN — no text'
          : qs.length ? `parses (${qs.length})`
          : 'text but no QCM shape';
        console.log(`  ${String(chars).padStart(7)} chars  ${verdict.padEnd(22)} ${it.title}`);
      } catch (err) {
        console.log(`  ......  ${err.message.padEnd(22)} ${it.title}`);
      }
    }
  }
}
