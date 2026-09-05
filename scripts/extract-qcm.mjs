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

import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { promisify } from 'node:util';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODULES, sectionsFor } from '../lib/data.js';
import { parseQcm } from '../lib/qcm/parse.js';
import { parseAnswerKey, splitAtCorrection } from '../lib/qcm/key.js';

const run = promisify(execFile);
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
    if ((res.status === 403 || res.status === 429) && attempt < 7) {
      await wait(3000 * 2 ** attempt);
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

// Half the archive is photographs of paper — no text layer at all. Those pages
// are rendered at 300 dpi and read with Tesseract, which handles printed French
// exam papers well. Handwritten corrections it reads badly; that is why the
// answers to those are written by hand rather than trusted to the machine.
async function ocrOf(data) {
  const dir = await mkdtemp(join(tmpdir(), 'mypromo-ocr-'));
  try {
    await writeFile(join(dir, 'in.pdf'), data);
    await run('pdftoppm', ['-r', '300', '-gray', '-png', join(dir, 'in.pdf'), join(dir, 'pg')],
      { maxBuffer: 1 << 28 });
    const pages = (await readdir(dir)).filter((f) => f.endsWith('.png')).sort();
    let out = '';
    for (const page of pages) {
      const { stdout } = await run('tesseract', [join(dir, page), 'stdout', '-l', 'fra', '--psm', '6'],
        { maxBuffer: 1 << 28 });
      out += stdout + '\n';
    }
    return out;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// A scanned sheet has a tick or a bullet before each proposition, and OCR
// renders it as anything at all — `o`, `©`, `æ`, `#`, `= - o`. Rather than
// guess at the bullet, find where the proposition's letter actually starts and
// cut everything before it.
//
// The heavier marks are the student's own ticks, which is to say the answer.
// They are not trusted: OCR mistakes a smudge for a tick and a tick for a
// smudge, and a wrong answer taught as right is worse than no question.
const OPT_LINE = /^.{0,10}?([A-Ea-e]\s*[.):\u2013-]\s*\S.*)$/;
const NUM_LINE = /^[^\p{L}\p{N}]{0,6}(\d{1,3}\s*[.):\u2013-]\s*\S.*)$/u;

const tidyOcr = (text) =>
  text.split('\n')
    .map((line) => {
      const opt = line.match(OPT_LINE);
      if (opt) return opt[1];
      const num = line.match(NUM_LINE);
      return num ? num[1] : line;
    })
    .join('\n');

// OCR leaves speckle at the end of a line — a stray `k`, `#”`, `| :`, a lone
// comma. Trim it, but only trim a single loose character, never a word.
const scrub = (text) => text
  .replace(/[\s|#*~_·•”“"'’,;:.\-—]+$/u, '')
  .replace(/\s+\S$/u, (tail) => (text.length > 25 ? '' : tail))
  .trim();

const scrubQuestion = (q) => ({
  ...q,
  q: scrub(q.q),
  options: q.options.map(scrub),
});

const only = process.argv.slice(2);
const modules = only.length ? MODULES.filter((m) => only.includes(m.id)) : MODULES;

for (const m of modules) {
  const sources = sectionsFor(m, 'quiz').flatMap((s) =>
    s.items.map((it) => ({ ...it, section: s.title })),
  );
  // A run that loses a file to Drive's rate limiter must not delete what an
  // earlier run got out of it. Anything that fails today keeps yesterday's.
  const path = join(root, 'lib/questions', `${m.id}.json`);
  const previous = new Map();
  try {
    const old = JSON.parse(await readFile(path, 'utf8'));
    for (const b of old.banks || []) previous.set(b.fid, b);
  } catch { /* first run for this module */ }

  const banks = [];
  let questions = 0;

  for (const src of sources) {
    // Photographed papers hold no text at all; they need OCR, not a parser.
    if ((src.ext || 'PDF').toUpperCase() !== 'PDF') continue;
    try {
      await wait(500); // stay under Drive's per-second ceiling
      const data = await fetchFile(src.fid);
      // pdf.js takes ownership of the buffer it is handed, so it gets a copy —
      // otherwise there is nothing left for the OCR fallback to render.
      let text = await textOf(data.slice());
      const ocred = text.replace(/\s/g, '').length < 200;
      if (ocred) text = tidyOcr(await ocrOf(data));
      if (RESERVED.test(text)) {
        console.log(`  skip  ${m.id} · ${src.title} — redistribution reserved by its author`);
        continue;
      }
      // Papers that answer themselves put the key after the questions; the
      // rest keep it in a separate file the catalogue already points at.
      const [asked, answered] = splitAtCorrection(text);
      // A proposition is a sentence, not a page. Anything longer than that is
      // the parser having swallowed the questions that followed, and showing
      // it to a student would be worse than dropping it.
      const usable = (list) => list.filter((q) =>
        q.options.length >= 3 && q.q.length > 15 && q.q.length < 400 &&
        q.options.every((o) => o.length < 300));

      // Some papers put `REPONSES` in the title, above everything. Cutting
      // there would throw the paper away, so take whichever half actually
      // holds the questions.
      const beforeKey = parseQcm(asked);
      const whole = parseQcm(text);
      const qs = usable(whole).length > usable(beforeKey).length ? whole : beforeKey;

      let key = parseAnswerKey(answered);
      // Sheets that answer themselves fiche by fiche keep the key inline
      // rather than at the end, so fall back to reading the whole document.
      if (key.size === 0) key = parseAnswerKey(text);
      if (key.size === 0 && src.correction) {
        try {
          await wait(250);
          key = parseAnswerKey(await textOf(await fetchFile(src.correction)));
        } catch { /* the correction is a photograph, or gone */ }
      }

      let filled = 0;
      for (const q of qs) {
        if (!q.unanswered) continue;
        const a = key.get(q.n);
        if (!a) continue;
        const within = a.filter((i) => i < q.options.length);
        if (!within.length) continue;
        q.answer = within;
        q.unanswered = false;
        filled += 1;
      }

      const good = usable(ocred ? qs.map(scrubQuestion) : qs);
      if (good.length >= 3) {
        banks.push({ fid: src.fid, title: src.title, section: src.section, questions: good });
        questions += good.length;
        const known = good.filter((q) => !q.unanswered).length;
        console.log(`  ${String(good.length).padStart(4)} (${String(known).padStart(3)} answered)  ${m.id} · ${src.title}`);
      }
    } catch (err) {
      const kept = previous.get(src.fid);
      if (kept) {
        banks.push(kept);
        questions += kept.questions.length;
        console.log(`  ${String(kept.questions.length).padStart(4)} (kept)      ${m.id} · ${src.title}`);
      } else {
        console.error(`  ....  ${m.id} · ${src.title} — ${err.message}`);
      }
    }
  }

  await mkdir(join(root, 'lib/questions'), { recursive: true });
  await writeFile(
    path,
    JSON.stringify({ module: m.id, name: m.name, banks }, null, 1),
  );
  console.log(`${m.name}: ${questions} questions from ${banks.length} papers\n`);
}
