// The two decisions in a duel that have to be right.
//
//   npm run check:duel
//
// A duel is two people agreeing to be compared, so the comparison has to be
// worth something: the same questions for both, and a score neither of them
// worked out themselves. Both are invisible in a running app — a duel scored
// generously looks exactly like a duel scored correctly until somebody loses
// one they should have won.

import { pick, score, outcome, LENGTH } from '../lib/duel.js';

let bad = 0;
const is = (label, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { bad++; console.log(`  FAIL ${label}\n       got  ${JSON.stringify(got)}\n       want ${JSON.stringify(want)}`); }
  else console.log(`  ok   ${label}`);
};

const q = (answer, extra = {}) => ({
  dbId: 1, options: ['a', 'b', 'c'], answer, ...extra,
});

console.log('— what goes in');
const mixed = [
  q([0]),
  { ...q([1]), kind: 'qroc' },            // marked by the student who wrote it
  { ...q([]), answer: [] },               // nobody has said what the answer is
  { ...q([0]), options: ['only one'] },   // nothing to choose between
  { ...q([2]), dbId: null },              // no row to point a duel at
  q([1, 2]),
];
is('only questions that can be scored against somebody else',
  pick(mixed).length, 2);
is('a duel is at most this long', pick(Array.from({ length: 40 }, () => q([0]))).length, LENGTH);
is('…and is as long as the subject when the subject is shorter',
  pick([q([0]), q([1]), q([2])]).length, 3);

console.log('— the score');
const paper = [q([0]), q([1, 2]), q([2])];
is('every proposition and no others', score(paper, [[0], [1, 2], [2]]), 3);
is('the order they were shown in is the order they are marked in',
  score(paper, [[2], [1, 2], [0]]), 1);
is('one right out of two is not half a mark', score(paper, [[0], [1], [2]]), 2);
is('a right one with a wrong one beside it is wrong',
  score(paper, [[0, 1], [1, 2], [2]]), 2);
is('the same proposition twice is still one answer',
  score(paper, [[0, 0], [1, 2, 2], [2]]), 3);
is('a question left unanswered is wrong', score(paper, [[0], [], [2]]), 2);
is('closing the tab half way does not draw', score(paper, [[0]]), 1);
is('answering nothing scores nothing', score(paper, []), 0);
is('and nonsense is not an answer', score(paper, [['x'], null, 7]), 0);

console.log('— who won');
is('more is a win', outcome(7, 3), 'won');
is('fewer is a loss', outcome(3, 7), 'lost');
is('the same is a draw', outcome(5, 5), 'drew');
is('and until they have answered there is nothing to say', outcome(5, null), null);

console.log(bad ? `\n${bad} to look at` : '\nall good');
process.exit(bad ? 1 : 0);
