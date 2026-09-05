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

const BANKS = {
  anatomie, biochimie, histologie,
  'module-sante': moduleSante,
  'physiologie-s1': physiologieS1,
  'anatomie-s2': anatomieS2,
  biophysique, embryologie,
  'physiologie-s2': physiologieS2,
};

// Only questions whose answer the paper actually gave. A question we cannot
// mark is not a question we can ask.
const answered = (qs) => qs.filter((q) => !q.unanswered && q.answer.length);

export const banksFor = (moduleId) =>
  (BANKS[moduleId]?.banks || [])
    .map((b) => ({ ...b, questions: answered(b.questions) }))
    .filter((b) => b.questions.length);

export const bankBySlug = (moduleId, slug) =>
  banksFor(moduleId).find((b) => b.fid === slug) || null;

export const questionCount = (moduleId) =>
  banksFor(moduleId).reduce((n, b) => n + b.questions.length, 0);

// Every question in the module, for a mixed run.
export const allQuestions = (moduleId) =>
  banksFor(moduleId).flatMap((b) => b.questions.map((q) => ({ ...q, from: b.title })));

// Questions still waiting for someone to say what the answer is.
export const unansweredCount = (moduleId) =>
  (BANKS[moduleId]?.banks || []).reduce(
    (n, b) => n + b.questions.filter((q) => q.unanswered || !q.answer.length).length, 0,
  );
