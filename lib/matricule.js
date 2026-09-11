// The number the faculty gave a student.
//
// D04458. Every student has one, no two students share one, and it is what
// they know each other by — a classmate's email is a thing you look up, a
// classmate's matricule is a thing you already have written down.
//
// One place, because it is read at sign-up, on /waiting for the accounts that
// came in before this existed, in the panel, and in the search box; and the
// moment two of those disagree about whether d04458 is D04458, the number
// stops finding anybody.

/**
 * The number as it is stored: upper-case, no spaces, no punctuation.
 *
 * Students type it with a space or a dash as often as not, and a search that
 * fails on "D0 4458" would be blamed on the person being missing rather than
 * on the space.
 */
export const normalise = (raw) =>
  String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

/**
 * Whether it can be a matricule at all.
 *
 * Looser than D0 followed by four digits on purpose: a cohort whose prefix
 * changes must not find sign-up closed on the morning of registration. A
 * number that is the wrong student's is not something any pattern can catch —
 * that is what approval is for, and the person approving has the faculty's
 * own list in front of them.
 */
export const looksRight = (value) => /^[A-Z]{1,2}[0-9]{3,8}$/.test(value);

/** Arabic for what is wrong with it, or null when nothing is. */
export function matriculeError(raw) {
  const value = normalise(raw);
  if (!value) return 'اكتب رقمك الجامعي';
  if (!looksRight(value)) return 'رقم جامعي غير صالح — مثال: D04458';
  return null;
}
