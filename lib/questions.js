// The question banks, as extracted from the papers themselves.
//
// Each bank is one paper: an exam session, an isolé, a teacher's QCM sheet.
// `scripts/extract-qcm.mjs` writes these; nothing here is hand-written, and
// nothing is invented — where a paper carried no answer key the question is
// marked `unanswered` and kept out of the student's way until someone fills
// it in.

import anatomie from './questions/anatomie.json' with { type: 'json' };
import biochimie from './questions/biochimie.json' with { type: 'json' };
import histologie from './questions/histologie.json' with { type: 'json' };
import moduleSante from './questions/module-sante.json' with { type: 'json' };
import physiologieS1 from './questions/physiologie-s1.json' with { type: 'json' };
import anatomieS2 from './questions/anatomie-s2.json' with { type: 'json' };
import biophysique from './questions/biophysique.json' with { type: 'json' };
import embryologie from './questions/embryologie.json' with { type: 'json' };
import physiologieS2 from './questions/physiologie-s2.json' with { type: 'json' };
import supplied from './questions/answers.json' with { type: 'json' };

const BANKS = {
  anatomie, biochimie, histologie,
  'module-sante': moduleSante,
  'physiologie-s1': physiologieS1,
  'anatomie-s2': anatomieS2,
  biophysique, embryologie,
  'physiologie-s2': physiologieS2,
};

// A question is askable once someone has said what the answer is. First choice
// is always the paper's own correction. Where there is none, an answer written
// by Claude stands in — marked as such, so a student can see it was not the
// faculty that said so, and so it can be replaced the day the real correction
// turns up.
const SUPPLIED = supplied.answers || {};

const withSuppliedAnswer = (moduleId, bank) => (q) => {
  if (!q.unanswered && q.answer.length) return { ...q, by: 'paper' };
  const mine = SUPPLIED[`${moduleId}:${bank.fid}:${q.n}`];
  if (!mine) return null;
  return { ...q, answer: mine.answer, why: mine.why, unanswered: false, by: mine.by || 'claude' };
};

// Every question needs a name of its own, so the app can remember which ones
// a student got wrong across sessions.
const withIds = (moduleId, bank) =>
  bank.questions
    .map(withSuppliedAnswer(moduleId, bank))
    .filter(Boolean)
    .map((q) => ({
      ...q,
      id: `${moduleId}:${bank.fid}:${q.n}`,
      topic: bank.title,
    }));

export const banksFor = (moduleId) =>
  (BANKS[moduleId]?.banks || [])
    .map((b) => ({ ...b, questions: withIds(moduleId, b) }))
    .filter((b) => b.questions.length);

export const bankBySlug = (moduleId, slug) =>
  banksFor(moduleId).find((b) => b.fid === slug) || null;

export const questionCount = (moduleId) =>
  banksFor(moduleId).reduce((n, b) => n + b.questions.length, 0);

// Every question in the module, for a mixed run.
export const allQuestions = (moduleId) =>
  banksFor(moduleId).flatMap((b) => b.questions);

// Everything in PCEM2, for a student revising the whole year.
export const allQuestionsEverywhere = () =>
  Object.keys(BANKS).flatMap((id) =>
    allQuestions(id).map((q) => ({ ...q, module: BANKS[id].name })));

// Questions still waiting for someone to say what the answer is.
export const unansweredCount = (moduleId) =>
  (BANKS[moduleId]?.banks || []).reduce(
    (n, b) => n + b.questions.filter(
      (q) => (q.unanswered || !q.answer.length) && !SUPPLIED[`${moduleId}:${b.fid}:${q.n}`],
    ).length, 0,
  );
