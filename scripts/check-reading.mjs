// How much of what a landmark means is already written down.
//
//   npm run check:reading
//
// Every placed point is asked for the line of its bone's description that
// names it. A point that finds one can say what runs through it; a point that
// does not says its name and stops — which is honest, and is also the list of
// what is worth writing next. Nothing here invents a description.

import { readFileSync, existsSync } from 'node:fs';
import { BUNDLES, boneOf } from '../lib/anatomy/bundles.js';
import { NOTES } from '../lib/anatomy/notes.js';
import { lineFor, tabsOf, noteOn } from '../lib/anatomy/reading.js';

let own = 0;
let found = 0;
let mute = 0;
const missing = [];

for (const b of BUNDLES) {
  const file = `public/anatomy/${b.id}.points.json`;
  if (!existsSync(file)) continue;
  const meta = JSON.parse(readFileSync(`public/anatomy/${b.id}.json`, 'utf8'));
  const nameOf = new Map(meta.parts.map((p) => [p.id, boneOf(p.name)]));
  const { points } = JSON.parse(readFileSync(file, 'utf8'));

  for (const p of points) {
    const note = NOTES[b.id]?.[nameOf.get(p.part)];
    if (noteOn(NOTES[b.id], p.name)) { own += 1; continue; }
    const line = lineFor(p.name, note);
    if (line) found += 1;
    else { mute += 1; missing.push(`${b.id.padEnd(11)} ${boneOf(p.name).padEnd(42)} ${nameOf.get(p.part) || '?'}`); }
  }
}

// Every structure that has a note must land in at least one tab, or it has a
// description the screen cannot draw.
let empty = 0;
for (const [bundle, book] of Object.entries(NOTES)) {
  for (const [name, note] of Object.entries(book)) {
    if (!tabsOf(note).length && !note.what) {
      console.log(`  no tab and no text  ${bundle} ${name}`);
      empty += 1;
    }
  }
}

const total = own + found + mute;
console.log(`${total} landmarks — ${own} with a description of their own, `
  + `${found} given the line of their bone that names them, ${mute} with nothing to read`);
if (process.argv.includes('--list')) {
  console.log('\nwithout a line:');
  for (const m of [...new Set(missing)].sort()) console.log(`  ${m}`);
}
if (empty) {
  console.log(`\n${empty} structures with a description the screen cannot draw`);
  process.exit(1);
}
