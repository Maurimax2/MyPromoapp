// scripts/check-sql.sh, in-process: the same files, in the same order, on a
// real Postgres compiled to run inside Node (PGlite), then the policy checks.
// For a machine with no Postgres installed — Windows, for one.
//
//   npm run check:sql:lite
//
// Applies every migration to an empty database, applies them again to prove
// they are safe to paste twice, then the short form, then asks the policies
// who can read what. A check that fails raises, and the exit code says so.
import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = join(dirname(fileURLToPath(import.meta.url)), '..');
const S = (f) => join(HERE, 'supabase', f);
const MIGRATIONS = ['schema.sql', 'social.sql', 'feedback.sql', 'accounts.sql', 'habits.sql'];

const db = new PGlite();
await db.waitReady;

async function apply(file, sql = readFileSync(file, 'utf8')) {
  process.stdout.write(basename(file).padEnd(26));
  try {
    await db.exec(sql);
    console.log('ok');
  } catch (e) {
    console.log('FAILED');
    console.log('   ', e.message.split('\n')[0]);
    if (e.position) {
      const at = Number(e.position);
      console.log('   near:', JSON.stringify(sql.slice(Math.max(0, at - 120), at + 60)));
    }
    process.exit(1);
  }
}

console.log('— on an empty database');
await apply(S('test/stub.sql'));
for (const f of MIGRATIONS) await apply(S(f));
console.log('— and again, because it is pasted twice as often as not');
for (const f of MIGRATIONS) await apply(S(f));
console.log('— the short form, on a database that is already up to date');
await apply(S('catch-up.sql'));

console.log('— who can read what');
// psql's \gset has no equivalent here: the bank id is read back by its title.
const rls = readFileSync(S('test/rls.sql'), 'utf8')
  .replace(/\s*returning id \\gset bank_/, ';')
  .replace(/:bank_id/g, "(select id from question_banks where title = 'Examen 2024')");
await apply(S('test/rls.sql'), rls);
await apply(S('test/accounts.sql'));
await apply(S('test/habits.sql'));
