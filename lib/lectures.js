// Numbering the lectures of a module.
//
// Lectures belong to a chapter and are numbered straight through the module:
// ANATOMIE runs 1–10 for الرأس والعنق, then 11–18 for التشريح العصبي. That
// rule was written into lib/data.js by hand, one `n` per file, because Drive
// had numbered most of them and the rest could be continued by eye.
//
// Nothing carried it forward. A subject added through the panel — DCEM1, and
// every clinical year — has no `n` on any of its rows, so the archive drew a
// dash where the number goes and تصنيف الأسئلة had nothing to offer: a screen
// that can only send a question to a numbered lecture, and no numbered
// lecture in the whole module.
//
// So the number is derived rather than read. It is worked out the same way in
// both places, which is the point of this file being one file: a question
// classified against number 7 in the panel has to land on the lecture the
// archive prints as 7.

/** The integer a number starts with, so `5b` counts as five. */
const leading = (n) => {
  const found = /^\s*(\d+)/.exec(n == null ? '' : String(n));
  return found ? Number(found[1]) : null;
};

/** Has the archive already said what this one is called? */
const numbered = (n) => n != null && String(n).trim() !== '';

/**
 * Fill in the missing numbers, in place, over a list already in the order the
 * module is taught — chapter by chapter, and within a chapter by position.
 *
 * What the archive says is kept, whatever shape it is in: `5b` is the
 * lymphatics lecture sharing a Drive number with the vessels, and renumbering
 * it would move a lecture a student has already learned to find. The
 * unnumbered ones continue from where the numbered ones stop.
 */
export function numberLectures(lectures) {
  let top = 0;
  for (const l of lectures) {
    const k = leading(l.n);
    if (k != null && k > top) top = k;
  }
  let next = top + 1;
  for (const l of lectures) {
    if (numbered(l.n)) continue;
    l.n = String(next++);
  }
  return lectures;
}
