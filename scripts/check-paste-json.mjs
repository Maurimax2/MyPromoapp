// What a phone does to a model's JSON, checked.
//
//   npm run check:paste-json

import { parsePasted, straighten } from '../lib/json-paste.js';

let bad = 0;
const is = (what, got, want) => {
  const a = JSON.stringify(got), b = JSON.stringify(want);
  if (a === b) console.log(`  ok   ${what}`);
  else { bad++; console.log(`  FAIL ${what}\n       got  ${a}\n       want ${b}`); }
};

is('plain JSON is read as it comes',
  parsePasted('[{"id":1,"lecture":"13"}]'), [{ id: 1, lecture: '13' }]);

// The actual paste that was refused.
is('curly quotes from a phone',
  parsePasted('[{\u201Cid\u201D:2849,\u201Clecture\u201D:\u201C13\u201D}]'),
  [{ id: 2849, lecture: '13' }]);

is('a fenced block still works',
  parsePasted('voici:\n```json\n[{\u201Cid\u201D:7,\u201Clecture\u201D:\u201C2\u201D}]\n```\nvoilà'),
  [{ id: 7, lecture: '2' }]);

is('curly single quotes too',
  parsePasted('[{\u2018id\u2019:3,\u2018lecture\u2019:\u20182\u2019}]'),
  [{ id: 3, lecture: '2' }]);

// The one that a blind find-and-replace would break.
is('a curly quote inside a straight string is left alone',
  parsePasted('[{"stem":"il a dit \u201Coui\u201D","id":4}]'),
  [{ stem: 'il a dit \u201Coui\u201D', id: 4 }]);

is('an apostrophe inside a curly string survives',
  parsePasted('[{\u201Cstem\u201D:\u201Cl\u2019art\u00e8re\u201D}]'),
  [{ stem: 'l\u2019art\u00e8re' }]);

is('nothing usable is null', parsePasted('je ne sais pas'), null);
is('empty is null', parsePasted(''), null);

is('text that already parses is not rewritten',
  straighten('{"a":"b"}'), '{"a":"b"}');

console.log(bad ? `\n${bad} to look at` : '\nall good');
process.exit(bad ? 1 : 0);
