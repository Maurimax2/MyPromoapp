// The question banks, read from the database.
//
// They used to live entirely in lib/questions/*.json — written once by an
// offline script and imported straight into the student screens. That is
// exactly the shape of the bug the catalogue already had: the panel wrote to
// Postgres and every screen read the file, so a subject added in the panel
// never appeared in the app.
//
// The same was true here, and worse: every question the panel extracts —
// from a paper, from a photograph, from Gemini — went into the `questions`
// table, and no student screen has ever read that table. The extraction was
// filling a room nobody could enter.
//
// This reads Postgres and hands back exactly the shape those screens expect,
// so the switch is one import per screen. The files remain the fallback, per
// subject: a module the database holds no questions for falls back to its
// file, so a half-finished migration cannot empty اختبر نفسك.

import { supabaseServer } from '@/lib/supabase/server';
import * as file from '@/lib/questions';
import {
  readingQuestions, QUESTION_COLUMNS, QUESTION_COLUMNS_BEFORE_KIND,
} from '@/lib/qcm/read';

/**
 * A stored question, in the shape the quiz already speaks.
 *
 * `by` is what the student is told: `paper` when the faculty's own correction
 * said so, `claude` when a model worked it out and nobody has confirmed it
 * yet. The quiz prints that difference, and it must survive the trip.
 */
const asQuestion = (q, bank, moduleId, nth) => {
  // A written answer is held as words, not as indexes into propositions the
  // paper never printed. Everything downstream asks `kind` rather than
  // guessing from an empty options array, because an empty options array is
  // also what a half-read QCM looks like.
  const written = q.kind === 'qroc';
  return {
    id: `${moduleId}:${bank.id}:${q.n}${nth === 1 ? '' : `-${nth}`}`,
    // The row's own id. `id` above is what the review schedule keys on and
    // has to stay the shape it has always been; this is what a duel stores,
    // because a duel has to be able to fetch exactly these questions again
    // for the second player. Absent when a subject is still being served
    // from the bundled file.
    dbId: q.id ?? null,
    n: q.n,
    q: q.stem,
    kind: written ? 'qroc' : 'qcm',
    // Which lecture it revises, as opposed to which paper it was printed on.
    // Null until somebody has said, and a null is shown rather than hidden.
    lecture: q.lecture ?? null,
    options: q.options || [],
    answer: q.answer || [],
    model: q.model_answer || null,
    why: q.why || null,
    unanswered: written ? !q.model_answer : !(q.answer || []).length,
    by: q.source === 'claude' ? 'claude' : 'paper',
    topic: bank.title,
  };
};

/**
 * Every published bank of a subject, from the database.
 *
 * Only `published` questions: a draft, or one still waiting for somebody to
 * say what the answer is, is staff business and never reaches a student.
 */
export async function banksOf(moduleId) {
  const sb = await supabaseServer();

  const { data: banks, error } = await sb
    .from('question_banks')
    .select('id, title, section, position')
    .eq('module', moduleId)
    .order('position');

  // A refusal and an empty subject are different things, and the difference
  // matters: falling back to the file on a refusal is how the database saying
  // "not for you" becomes questions served to somebody who should not have
  // them. The file stands in for a subject not yet migrated, never for a
  // reader who was turned away.
  if (error) return [];
  if (!banks.length) return file.banksFor(moduleId);

  // Asked for twice at most: a database that has not had schema.sql pasted
  // refuses a select naming `kind` outright, and reading that refusal as an
  // empty subject is what emptied اختبر نفسك with the questions still in the
  // table. See lib/qcm/read.js.
  const ask = (columns) => sb
    .from('questions')
    .select(columns)
    .in('bank', banks.map((b) => b.id))
    .eq('status', 'published')
    .order('id');

  const { data: rows, error: refused } = await readingQuestions(
    () => ask(QUESTION_COLUMNS),
    () => ask(QUESTION_COLUMNS_BEFORE_KIND),
  );

  if (refused) return [];

  const byBank = new Map(banks.map((b) => [b.id, []]));
  for (const q of rows || []) byBank.get(q.bank)?.push(q);

  const out = banks.map((b) => {
    // A paper that numbers two sections from 1 gives two questions the same
    // number; each needs an id of its own or an answer lands on the wrong one.
    const seen = new Map();
    const questions = (byBank.get(b.id) || []).map((q) => {
      const nth = (seen.get(q.n) || 0) + 1;
      seen.set(q.n, nth);
      return asQuestion(q, b, moduleId, nth);
    });
    return { fid: String(b.id), title: b.title, section: b.section, questions };
  }).filter((b) => b.questions.length);

  // The database knows the subject but holds no published questions for it —
  // mid-migration, or nothing extracted yet. The file still has them.
  return out.length ? out : file.banksFor(moduleId);
}

export async function bankOf(moduleId, slug) {
  return (await banksOf(moduleId)).find((b) => b.fid === slug) || null;
}

export async function countOf(moduleId) {
  return (await banksOf(moduleId)).reduce((n, b) => n + b.questions.length, 0);
}

/**
 * The subjects اختبر نفسك should list, from the database.
 *
 * The index used to be built from `quizzedModules()` — the bundled file. So a
 * subject only appeared if the copy shipped with the app already knew it had
 * question material, and every paper the panel extracted for a subject that
 * copy has never heard of went into the database and was never listed
 * anywhere. Exactly the bug the catalogue had, in the one screen that still
 * had it.
 *
 * Returns null when the read fails, so the caller can say so rather than
 * print an empty list over a database that answered.
 */
export async function quizzedIds() {
  const sb = await supabaseServer();

  const { data: banks, error } = await sb.from('question_banks').select('id, module');
  if (error) return null;
  const moduleOfBank = new Map((banks || []).map((b) => [b.id, b.module]));
  if (!moduleOfBank.size) return new Set();

  // Paged, and forward by what came back rather than by the page asked for:
  // a subject's questions run into the thousands and the server answers at
  // most `db-max-rows` whatever the limit says.
  const PAGE = 1000;
  const ids = new Set();
  for (let from = 0, turn = 0; turn < 500; turn += 1) {
    const page = await sb.from('questions')
      .select('bank').eq('status', 'published').order('id')
      .range(from, from + PAGE - 1);
    if (page.error) return null;

    const got = page.data || [];
    if (!got.length) break;
    for (const q of got) {
      const m = moduleOfBank.get(q.bank);
      if (m) ids.add(m);
    }
    from += got.length;
  }
  return ids;
}

/** How many banks a subject has, for the line under its name. */
export async function bankCountOf(moduleId) {
  const sb = await supabaseServer();
  const { count } = await sb.from('question_banks')
    .select('id', { count: 'exact', head: true }).eq('module', moduleId);
  return count || 0;
}

/** Every question in the subject, for a mixed run. */
export async function allOf(moduleId) {
  return (await banksOf(moduleId)).flatMap((b) => b.questions);
}
