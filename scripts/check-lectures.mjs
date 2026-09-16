// The numbering, checked against the three cases that have actually bitten.
//
//   npm run check:lectures

import { numberLectures } from '../lib/lectures.js';

let bad = 0;
const is = (what, got, want) => {
  const a = JSON.stringify(got), b = JSON.stringify(want);
  if (a === b) console.log(`  ok   ${what}`);
  else { bad++; console.log(`  FAIL ${what}\n       got  ${a}\n       want ${b}`); }
};
const ns = (rows) => numberLectures(rows).map((l) => l.n);

// ANATOMIE: Drive numbered the head and neck, and left the neuro files bare.
// The unnumbered ones continue from where the numbered ones stop.
is('unnumbered files continue from the last number',
  ns([{ n: '1' }, { n: '2' }, { n: '3' }, { n: null }, { n: null }]),
  ['1', '2', '3', '4', '5']);

// DCEM1: added through the panel, so nothing carries a number at all. This is
// the case that made تصنيف الأسئلة say there were no lectures.
is('a module with no numbers at all is numbered from one',
  ns([{ n: null }, { n: null }, { n: null }, { n: null }]),
  ['1', '2', '3', '4']);

// Vessels are 5 and lymphatics 5b, both numbered `-5-` in Drive. Renumbering
// the lymphatics would move a lecture students already know where to find.
is('a number the archive gives is kept, whatever shape it is in',
  ns([{ n: '4' }, { n: '5' }, { n: '5b' }, { n: null }]),
  ['4', '5', '5b', '6']);

is('an empty string counts as unnumbered',
  ns([{ n: '1' }, { n: '  ' }]),
  ['1', '2']);

is('nothing to number is not an error', ns([]), []);

console.log(bad ? `\n${bad} to look at` : '\nall good');
process.exit(bad ? 1 : 0);
