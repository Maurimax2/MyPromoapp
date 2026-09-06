// Do the app's queries name columns the database actually has?
//
// The mock answers from plain JavaScript objects, so it will happily return a
// row for a column that does not exist — the query only fails in front of a
// student. This reads the two migrations, works out what each table really
// has, and checks every `.from(...).select(...)` in the app against it.
//
//   node scripts/check-queries.mjs
//
// It is deliberately conservative: anything it cannot read with confidence is
// skipped rather than guessed at. A false alarm here would teach us to ignore
// it, which is worse than missing one.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// ---- what the database has ------------------------------------------------

const sql = ['supabase/schema.sql', 'supabase/social.sql']
  .map((f) => readFileSync(f, 'utf8')).join('\n');

const tables = new Map();

for (const m of sql.matchAll(/create table if not exists\s+(\w+)\s*\(([\s\S]*?)\n\);/g)) {
  const [, name, body] = m;
  const cols = new Set();
  for (const line of body.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('--')) continue;
    // Skip table-level constraints; take the first word of a column line.
    if (/^(primary|foreign|unique|check|constraint)\b/i.test(t)) continue;
    const col = /^([a-z_][a-z0-9_]*)\s/i.exec(t);
    if (col) cols.add(col[1]);
  }
  tables.set(name, cols);
}

for (const m of sql.matchAll(/alter table\s+(\w+)\s+add column if not exists\s+(\w+)/g)) {
  tables.get(m[1])?.add(m[2]);
}

// Supabase's own, which the app reads through the same client.
tables.set('storage.objects', new Set(['id', 'name', 'bucket_id']));

// ---- what the app asks for ------------------------------------------------

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.')) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith('.js')) files.push(path);
  }
})('app');
files.push('lib/notify.js', 'lib/supabase/server.js');

/** `id, body, author:profiles(id, name), post_media(path)` → the top level only. */
function topLevel(select) {
  const out = [];
  let depth = 0, token = '';
  for (const ch of select) {
    if (ch === '(') { depth++; if (depth === 1) { out.push(token); token = ''; continue; } }
    if (ch === ')') { depth--; if (depth === 0) { token = ''; continue; } }
    if (depth === 0 && ch === ',') { out.push(token); token = ''; continue; }
    if (depth === 0) token += ch;
  }
  out.push(token);
  return out.map((t) => t.trim()).filter(Boolean);
}

const problems = [];

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  // .from('posts') … .select(`…`) — the select may be several lines below.
  for (const m of src.matchAll(/\.from\('([a-z_]+)'\)([\s\S]{0,400}?)\.select\(\s*([`'"])([\s\S]*?)\3/g)) {
    const [, table, between, , select] = m;
    if (between.includes('.from(')) continue;          // not this one's select
    const cols = tables.get(table);
    if (!cols) { problems.push(`${file}: unknown table "${table}"`); continue; }

    for (const item of topLevel(select)) {
      if (item === '*' || item.startsWith('count')) continue;
      // `author:profiles` is an embed: the name after the colon is a table.
      const embed = /^(?:[\w]+:)?([a-z_]+)$/.exec(item);
      // `question_banks!inner` — the modifier is not part of the name.
      const bare = (item.includes(':') ? item.split(':')[1] : item).replace(/!.*$/, '').trim();
      if (select.includes(`${bare}(`) || select.includes(`${bare}!`)) {   // an embed
        if (!tables.has(bare)) problems.push(`${file}: ${table} → embeds unknown table "${bare}"`);
        continue;
      }
      const name = bare;
      if (name && !cols.has(name) && embed) {
        problems.push(`${file}: ${table} has no column "${name}"`);
      }
    }
  }
}

if (problems.length) {
  console.log(problems.join('\n'));
  console.log(`\n${problems.length} to look at`);
  process.exit(1);
}
console.log(`${files.length} files, every column asked for exists`);
