// A paper that is really several papers.
//
// `ABDOMEN ISOLE QCM.pdf` is seven regions bound together — Paroi abdominale,
// Gros vaisseaux, Le foie — and every region starts again at 1. So does its
// key:
//
//     Correction.
//     Paroi abdominale:
//     1.B 2.A 3.C 4.E 5.C 6.CD 7.D 8.AC(D) 9.C 10.C
//     Organogenese du tube digestif:
//     1.D 2.AD 3.E
//
// Flattening that loses the paper: seven questions numbered 1, one key entry
// for 1, and six wrong answers. Each region becomes its own bank instead, so
// the numbering a student reads on the sheet is the numbering they see, and a
// region is a sitting of the right length.
//
// Nothing here guesses. A key is only applied to a region when the two sides
// agree on how many regions there are and how long each one is; if they do
// not, the questions go to the review queue unanswered.

const clean = (s) => s.replace(/\s+/g, ' ').trim();
const toIndexes = (letters) =>
  [...new Set([...letters].map((l) => l.charCodeAt(0) - 65))].sort((a, b) => a - b);

/** Split parsed questions where the numbering starts over. */
export function runsOfQuestions(questions) {
  const runs = [];
  let run = null;
  for (const q of questions) {
    if (!run || q.n <= run[run.length - 1].n) { run = []; runs.push(run); }
    run.push(q);
  }
  return runs;
}

// A region's name on the key: a short line of words ending in a colon, holding
// no answers of its own. `1.D 2.AD 3.E` is not a heading; `Le foie:` is.
const REGION = /^[^0-9]{3,60}:\s*$/;
const TOKEN = /(\d{1,3})\s*[.:)–-]?\s*([A-E]{1,5})(?![A-Za-zÀ-ÿ])/g;

/**
 * A key written region by region. Returns one entry per region, in the order
 * the sheet gives them, each holding the answers by the paper's own number.
 */
export function runsOfKey(text) {
  const runs = [];
  let run = null;

  for (const raw of text.split('\n')) {
    const line = clean(raw);
    if (!line) continue;

    if (REGION.test(line)) { run = { title: line.replace(/:\s*$/, ''), answers: new Map() }; runs.push(run); continue; }
    if (!run) continue;

    // Brackets mark a proposition the students argued over; leave it out
    // rather than call it certainly right.
    const flat = line.replace(/\([A-E]\)/g, '');
    let m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(flat))) run.answers.set(Number(m[1]), toIndexes(m[2]));
  }

  return runs.filter((r) => r.answers.size);
}

/**
 * Pair the regions of a paper with the regions of its key.
 *
 * They match only if there are as many of each and every region holds the
 * numbers its key answers — anything less and the whole key is refused, since
 * a key applied to the wrong region is worse than no key at all.
 */
export function alignSections(questions, keyRuns) {
  const runs = runsOfQuestions(questions);

  const agrees = keyRuns.length === runs.length && runs.every((run, i) => {
    const answered = [...keyRuns[i].answers.keys()];
    const numbers = new Set(run.map((q) => q.n));
    return answered.length > 0 && answered.every((n) => numbers.has(n));
  });

  return runs.map((run, i) => ({
    title: agrees ? keyRuns[i].title : null,
    answers: agrees ? keyRuns[i].answers : new Map(),
    questions: run,
  }));
}
