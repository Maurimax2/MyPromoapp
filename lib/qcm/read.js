// Reading questions out of a database that may be a migration behind.
//
// This exists because of one outage. `questions` gained `kind` and
// `model_answer` when the clinical years needed a question you write the
// answer to, every screen that reads a question started asking for them, and
// the database those screens actually talk to had not had schema.sql pasted
// into it. Postgres does not answer such a select with the columns it does
// have — it refuses the whole thing, 42703 — and the code above read that
// refusal as "this subject has no questions".
//
// So اختبر نفسك went quiet. Not an error, not an empty state that explains
// itself: every subject still listed, every one of them reading 0 سؤال, with
// fifteen hundred questions sitting in the table. The same shape as the
// matricule bug a fortnight earlier, and for the same reason: code shipped
// ahead of the SQL it needs, failing silently in between.
//
// A missing column is not a refusal. A refusal — row-level security saying
// "not for you" — must never fall back to anything, or the app hands out
// what the database withheld. A column that is not there yet is different in
// kind: nothing is being withheld, the question simply has no answer to give
// about a field nobody has added. So we ask again without it, and the app
// works exactly as it did the day before the column existed.

/** Postgres for "no such column". */
export const MIGRATION_BEHIND = '42703';

// The columns a question has always had, and the ones the written-answer kind
// added. Kept as strings rather than built from a list, so the shape asked
// for is the shape you read here.
export const QUESTION_COLUMNS =
  'id, bank, n, kind, stem, options, answer, model_answer, why, source, status';
export const QUESTION_COLUMNS_BEFORE_KIND =
  'id, bank, n, stem, options, answer, why, source, status';

let told = false;

/**
 * Ask for everything; settle for what this database has.
 *
 * `full` and `plain` each run the same read with a different column list.
 * Nothing is cached: a database that gets the SQL pasted into it starts
 * answering the first call again with no redeploy, and one wasted round trip
 * per read is the right price for a database that is behind.
 */
export async function readingQuestions(full, plain) {
  const res = await full();
  if (!res.error || res.error.code !== MIGRATION_BEHIND) return res;

  if (!told) {
    told = true;
    console.error(
      'questions.kind is missing — paste supabase/schema.sql into Supabase. '
      + 'Reading without it meanwhile; written answers will not appear.');
  }
  return plain();
}
