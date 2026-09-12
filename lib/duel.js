// تحدّي زميلك — the part that has to be the same for both of you.
//
// Kept out of the routes so it can be run without a database, because both
// of the decisions in here are the kind that look right and are wrong: a
// duel whose two halves draw different questions, and a score worked out in
// the browser of the person it flatters.

/** How many questions a duel is. Long enough to mean something, short
    enough to take on a phone between two lectures. */
export const LENGTH = 10;

/**
 * Whether a question can be in a duel at all.
 *
 * Multiple choice, because a written answer is marked by the student who
 * wrote it and two people each marking themselves is not a score either can
 * stand behind. Answered, because an unanswered question cannot be got right.
 * And with a row of its own, because a duel stores the exact ids it drew and
 * a question still being served from the bundled file has none.
 *
 * Exported so the counts a student is shown and the questions they are given
 * are decided by the same rule. Two rules that agree today are two rules.
 */
export const usable = (q) =>
  q.kind !== 'qroc'
  && (q.answer || []).length > 0
  && (q.options || []).length >= 2
  && q.dbId != null;

/**
 * The questions for a duel, drawn once and kept.
 *
 * Shuffled and cut, and the result is stored on the duel. Re-picking for the
 * second player would give two people different questions and call the
 * difference a result.
 */
export function pick(questions, length = LENGTH) {
  const a = questions.filter(usable);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, length);
}

const sameSet = (a, b) => {
  const x = [...new Set(a)].sort((m, n) => m - n);
  const y = [...new Set(b)].sort((m, n) => m - n);
  return x.length === y.length && x.every((v, i) => v === y[i]);
};

/**
 * The score, worked out here rather than sent from the browser.
 *
 * `given` is what the player ticked, one array per question, in the order the
 * duel stores them. Anything missing counts as unanswered, which counts as
 * wrong — a player who closes the tab half way has not drawn.
 *
 * All-or-nothing per question, which is how the faculty marks them: every
 * correct proposition and no incorrect one.
 */
export function score(questions, given) {
  const answers = Array.isArray(given) ? given : [];
  let right = 0;
  questions.forEach((q, i) => {
    const ticked = Array.isArray(answers[i]) ? answers[i].map(Number).filter(Number.isInteger) : [];
    if (ticked.length && sameSet(ticked, q.answer || [])) right += 1;
  });
  return right;
}

/** Who won, said the way the screen says it. */
export function outcome(mine, theirs) {
  if (mine == null || theirs == null) return null;
  if (mine > theirs) return 'won';
  if (mine < theirs) return 'lost';
  return 'drew';
}
