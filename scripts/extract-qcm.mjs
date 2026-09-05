// Pulls questions out of the exam papers.
//
// Reads every file filed under اختبر نفسك, fetches it from Drive, extracts the
// text with pdf.js and runs the parser over it. What comes out is written to
// lib/questions/<module>.json for the app to serve.
//
// Nothing is invented: a question with no answer key in the paper is kept and
// marked, so it can be answered by a human rather than guessed at.
//
//   GOOGLE_API_KEY=… node scripts/extract-qcm.mjs [moduleId …]

import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODULES, sectionsFor } from '../lib/data.js';
import { parseQcm } from '../lib/qcm/parse.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const key = process.env.GOOGLE_API_KEY;
if (!key) { console.error('GOOGLE_API_KEY is not set'); process.exit(1); }

const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Drive rate-limits a run of this size, and answers 403 rather than 429 when
// it does. Backing off and trying again is the difference between 26 questions
// and all of them.
async function fetchFile(fid) {
  const url = `https://www.googleapis.com/drive/v3/files/${fid}?alt=media&key=${key}`;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url);
    if (res.ok) return new Uint8Array(await res.arrayBuffer());
    if ((res.status === 403 || res.status === 429) && attempt < 5) {
      await wait(2000 * 2 ** attempt);
      continue;
    }
    throw new Error(`drive ${res.status}`);
  }
}

// pdf.js gives words with positions; a change in y means a new line.
async function textOf(data) {
  const doc = await pdfjs.getDocument({
    data,
    standardFontDataUrl: join(root, 'public/pdfjs/standard_fonts/'),
    cMapUrl: join(root, 'public/pdfjs/cmaps/'),
    cMapPacked: true,
    wasmUrl: join(root, 'public/pdfjs/wasm/'),
    iccUrl: join(root, 'public/pdfjs/iccs/'),
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

// Commercial revision books say plainly that they may not be redistributed.
// Their questions are not ours to lift, however useful they are, so a document
// that carries that notice is skipped whatever folder it sits in.
const RESERVED = /(droits?\s+(de\s+l'auteur\s+)?r[ée]serv|duplication[^.]{0,60}interdite|toute\s+reproduction[^.]{0,40}interdite)/i;

const only = process.argv.slice(2);
const modules = only.length ? MODULES.filter((m) => only.includes(m.id)) : MODULES;

for (const m of modules) {
  const sources = sectionsFor(m, 'quiz').flatMap((s) =>
    s.items.map((it) => ({ ...it, section: s.title })),
  );
  const banks = [];
  let questions = 0;

  for (const src of sources) {
    // Photographed papers hold no text at all; they need OCR, not a parser.
    if ((src.ext || 'PDF').toUpperCase() !== 'PDF') continue;
    try {
      await wait(250); // stay under Drive's per-second ceiling
      const text = await textOf(await fetchFile(src.fid));
      if (RESERVED.test(text)) {
        console.log(`  skip  ${m.id} · ${src.title} — redistribution reserved by its author`);
        continue;
      }
      const qs = parseQcm(text);
      const good = qs.filter((q) => q.options.length >= 3 && q.q.length > 15);
      if (good.length >= 3) {
        banks.push({ fid: src.fid, title: src.title, section: src.section, questions: good });
        questions += good.length;
        console.log(`  ${String(good.length).padStart(4)}  ${m.id} · ${src.title}`);
      }
    } catch (err) {
      console.error(`  ....  ${m.id} · ${src.title} — ${err.message}`);
    }
  }

  await mkdir(join(root, 'lib/questions'), { recursive: true });
  await writeFile(
    join(root, 'lib/questions', `${m.id}.json`),
    JSON.stringify({ module: m.id, name: m.name, banks }, null, 1),
  );
  console.log(`${m.name}: ${questions} questions from ${banks.length} papers\n`);
}
