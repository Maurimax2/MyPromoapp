// Reading an answer key.
//
// Corrections come in two shapes. Most are a compact table, which is what a
// student writes out after the exam:
//
//     1 BCD 2 ABCDE 3 ABCD 4 ABCDE 5 ABCDE
//     11 AD(E) 12 ABCDE 13 CDE
//
// The rest restate each question and list only the propositions that were
// true:
//
//     QCM 10 :
//     A : sillon longitudinal
//     C : ventral
//
// A letter in brackets is one the students argued over. It is left out rather
// than counted, because marking a disputed proposition as certainly right is
// worse than leaving it off.

const clean = (s) => s.replace(/\s+/g, ' ').trim();
const toIndexes = (letters) =>
  [...new Set([...letters].map((l) => l.charCodeAt(0) - 65))].sort((a, b) => a - b);

// A heading, not a word in passing. `Réponse : ABCD` sits inside a question in
// half these papers and must never be mistaken for the start of the key.
const HEADING = /^(corrections?|corrig[ée]s?|r[ée]ponses)\s*:?\s*$/i;

/** Where a paper stops asking and starts answering. */
export function splitAtCorrection(text) {
  const lines = text.split('\n');
  const at = lines.findIndex((l) => HEADING.test(l.trim()));
  if (at === -1) return [text, ''];
  return [lines.slice(0, at).join('\n'), lines.slice(at + 1).join('\n')];
}

/**
 * A compact table: number, then the letters that are true. Accepted only as a
 * run — 1, 2, 3 … — so that "3 ABC" inside a sentence cannot pass for a key.
 */
export function parseTableKey(text) {
  const flat = clean(text.replace(/\([A-E]\)/g, ''));
  const out = new Map();
  let expected = 1;

  const token = /(\d{1,3})\s*[.:)–-]?\s*([A-E]{1,5})(?![A-Za-zÀ-ÿ])/g;
  let m;
  while ((m = token.exec(flat))) {
    const n = Number(m[1]);
    // A key sometimes leaves a question blank — the one everybody contested.
    // A small jump forward is that; a jump backwards, or a large one, is a
    // number that belongs to something else on the page.
    if (n < expected || n > expected + 3) continue;
    out.set(n, toIndexes(m[2]));
    expected = n + 1;
  }
  return out;
}

/**
 * The restated form: `QCM 10 :` and then the true propositions, one per line.
 * Only letters that open a line count, so the words after them are ignored.
 */
export function parseBlockKey(text) {
  const out = new Map();
  let n = null;
  let letters = [];

  const close = () => {
    if (n !== null && letters.length) out.set(n, toIndexes(letters.join('')));
    letters = [];
  };

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;

    const head = line.match(/^(?:QCM|QCR|Question|Q)\s*[N°n]?\s*(\d{1,3})\s*[.:)-]?\s*$/i);
    if (head) { close(); n = Number(head[1]); continue; }

    const opt = line.match(/^([A-E])\s*[.:)]/);
    if (n !== null && opt) { letters.push(opt[1]); continue; }

    // Anything else ends the block: a heading, a stray sentence, a page number.
    if (n !== null && !opt) { close(); n = null; }
  }
  close();
  return out;
}

/** Whichever of the two shapes the document turns out to be. */
export function parseAnswerKey(text) {
  const block = parseBlockKey(text);
  const table = parseTableKey(text);
  return block.size >= table.size ? block : table;
}
