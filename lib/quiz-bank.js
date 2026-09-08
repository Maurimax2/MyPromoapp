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

/**
 * A stored question, in the shape the quiz already speaks.
 *
 * `by` is what the student is told: `paper` when the faculty's own correction
 * said so, `claude` when a model worked it out and nobody has confirmed it
 * yet. The quiz prints that difference, and it must survive the trip.
 */
const asQuestion = (q, bank, moduleId, nth) => ({
  id: `${moduleId}:${bank.id}:${q.n}${nth === 1 ? '' : `-${nth}`}`,
  n: q.n,
  q: q.stem,
  options: q.options || [],
  answer: q.answer || [],
  why: q.why || null,
  unanswered: !(q.answer || []).length,
  by: q.source === 'claude' ? 'claude' : 'paper',
  topic: bank.title,
});

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

  const { data: rows, error: refused } = await sb
    .from('questions')
    .select('id, bank, n, stem, options, answer, why, source, status')
    .in('bank', banks.map((b) => b.id))
    .eq('status', 'published')
    .order('id');

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

/** Every question in the subject, for a mixed run. */
export async function allOf(moduleId) {
  return (await banksOf(moduleId)).flatMap((b) => b.questions);
}
