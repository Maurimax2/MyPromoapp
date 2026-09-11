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

/**
 * What the database refused, and what to tell the student about it.
 *
 * The two routes that write a matricule both need this and they had it
 * slightly differently, which is how the bug got in: one of them matched the
 * word "matricule" anywhere in the error text. Postgres says
 *
 *   column "matricule" of relation "profiles" does not exist
 *
 * when schema.sql has not been pasted — and that sentence contains the word.
 * So every number a student typed came back "already taken", including the
 * numbers nobody had, and the message pointed at the student instead of at
 * the migration nobody had run.
 *
 * Only the code is trusted now. 23505 is the unique index and nothing else.
 */
export function writeFailure(error) {
  if (!error) return null;

  if (error.code === '23505') {
    return { status: 409, error: 'هذا الرقم الجامعي مسجَّل بالفعل' };
  }

  // The column is missing: schema.sql has not been applied to this database.
  // Nothing the student types can fix it, so the message must not suggest
  // that it could.
  if (error.code === '42703') {
    return {
      status: 503,
      error: 'التسجيل غير متاح الآن — راجع أحد المشرفين',
      log: `profiles.matricule is missing — paste supabase/schema.sql (${error.message})`,
    };
  }

  return { status: 500, error: error.message };
}
