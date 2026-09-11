// The matricule, checked without a database.
//
// This exists because of one bug. The sign-up route decided "somebody already
// has that number" by looking for the word `matricule` anywhere in the error
// text — and Postgres, on a database where schema.sql had not been pasted,
// says `column "matricule" of relation "profiles" does not exist`. So every
// number a student typed came back as taken, including the free ones, and the
// message blamed the student for a migration nobody had run.
//
//   npm run check:matricule
//
// The error strings below are copied from a real Postgres 16, not invented:
// see the 42703 one reproduced against the schema as it stood before the
// column existed.

import { normalise, looksRight, matriculeError, writeFailure } from '../lib/matricule.js';

let bad = 0;
const is = (label, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { bad++; console.log(`  FAIL ${label}\n       got  ${JSON.stringify(got)}\n       want ${JSON.stringify(want)}`); }
  else console.log(`  ok   ${label}`);
};

console.log('— what the student typed');
is('a space and lower case still find the same student', normalise('d0 4458'), 'D04458');
is('so does a dash', normalise('D0-4458'), 'D04458');
is('D04458 is a matricule', looksRight(normalise('D04458')), true);
is('a name is not', looksRight(normalise('Sidi')), false);
is('nothing typed is named as nothing typed', matriculeError(''), 'اكتب رقمك الجامعي');
is('a wrong shape says so', matriculeError('12'), 'رقم جامعي غير صالح — مثال: D04458');
is('a good one has nothing wrong with it', matriculeError('d0 4458'), null);

console.log('— what the database refused');
is('the unique index is the only thing that means "taken"',
  writeFailure({
    code: '23505',
    message: 'duplicate key value violates unique constraint "profiles_matricule_key"',
  }),
  { status: 409, error: 'هذا الرقم الجامعي مسجَّل بالفعل' });

// The bug, kept as a test: this must never again read as "already taken".
const missing = writeFailure({
  code: '42703',
  message: 'column "matricule" of relation "profiles" does not exist',
});
is('a missing column is not a taken number', missing.status, 503);
is('…and does not blame the student', missing.error, 'التسجيل غير متاح الآن — راجع أحد المشرفين');
is('…and says in the log what to actually do',
  /paste supabase\/schema\.sql/.test(missing.log || ''), true);

is('anything else is passed through as it came',
  writeFailure({ code: '23503', message: 'insert or update on table "profiles" violates foreign key constraint' }),
  { status: 500, error: 'insert or update on table "profiles" violates foreign key constraint' });

is('no error is no failure', writeFailure(null), null);

console.log(bad ? `\n${bad} to look at` : '\nall good');
process.exit(bad ? 1 : 0);
