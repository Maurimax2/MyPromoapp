// What an admin pasted, read without a database.
//
//   npm run check:paste
//
// The reader is the only thing between a model's answer and the questions
// students are examined on, and every one of its decisions is invisible in a
// running app: a QROC silently dropped, an AI-written answer stored as though
// the faculty had signed it. Both are quiet, and both are wrong in a way a
// student only finds out at the exam.

import { readPasted } from '../lib/qcm/paste.js';

let bad = 0;
const is = (label, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { bad++; console.log(`  FAIL ${label}\n       got  ${JSON.stringify(got)}\n       want ${JSON.stringify(want)}`); }
  else console.log(`  ok   ${label}`);
};

const one = (text) => readPasted(text).sections[0]?.questions[0];

console.log('— a QCM, as before');
const qcm = one(JSON.stringify({ sections: [{ title: 'T', questions: [
  { n: '1', stem: 'Le crâne ?', options: ['A', 'B', 'C'], answer: [0, 2] },
] }] }));
is('is still a QCM', qcm.kind, 'qcm');
is('…keeps its propositions', qcm.options, ['A', 'B', 'C']);
is('…and the indexes of the true ones', qcm.answer, [0, 2]);
is('…and carries no written answer', qcm.model, null);

console.log('— a QROC');
const qroc = one(JSON.stringify({ sections: [{ questions: [
  { n: '1', kind: 'qroc', stem: 'Citez trois signes.', model_answer: 'HTA, protéinurie, œdème.' },
] }] }));
is('is read as written', qroc.kind, 'qroc');
is('…with the correction as its answer', qroc.model, 'HTA, protéinurie, œdème.');
is('…and no propositions invented for it', qroc.options, []);
is('…and no index pretending to be one', qroc.answer, []);
is('…and is not blamed on a model', qroc.guessed, false);

console.log('— a QROC the model answered itself');
const mine = one(JSON.stringify({ sections: [{ questions: [
  { n: '2', kind: 'qroc', stem: 'Définissez la pré-éclampsie.', model_answer: 'HTA après 20 SA…', by: 'ai' },
] }] }));
is('is marked as the model’s own words', mine.guessed, true);

// The bug this guards: a question with no propositions used to be thrown away
// by the length check, so a whole QROC paper read as nothing at all and the
// panel said "لم نفهم ما لُصق" over a perfectly good paste.
console.log('— a QROC that did not say what it was');
const bare = one(JSON.stringify({ sections: [{ questions: [
  { n: '3', stem: 'Quel est le traitement ?', answer: 'Sulfate de magnésium.' },
] }] }));
is('is not dropped for having no propositions', Boolean(bare), true);
is('…is read as written', bare.kind, 'qroc');
is('…and a string answer is its answer, not an index', bare.model, 'Sulfate de magnésium.');

console.log('— a QROC the paper never answered');
const open = one(JSON.stringify({ sections: [{ questions: [
  { n: '4', kind: 'qroc', stem: 'Décrivez la conduite à tenir.' },
] }] }));
is('is kept', Boolean(open), true);
is('…with nothing where the answer would be', open.model, null);
is('…and is not marked as a model’s guess', open.guessed, false);

console.log('— a paper with both kinds in it');
const mixed = readPasted(JSON.stringify({ sections: [{ title: 'Examen 2024', questions: [
  { n: '1', stem: 'A ou B ?', options: ['A', 'B'], answer: [1] },
  { n: '2', kind: 'qroc', stem: 'Citez deux causes.', model_answer: 'L’une et l’autre.' },
] }] }));
is('both survive the same paste',
  mixed.sections[0].questions.map((q) => q.kind), ['qcm', 'qroc']);
is('and it was read as JSON', mixed.how, 'json');

console.log(bad ? `\n${bad} to look at` : '\nall good');
process.exit(bad ? 1 : 0);
