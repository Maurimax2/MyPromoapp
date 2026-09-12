// What is in public/anatomy, checked against what says it is there.
//
//   npm run check:anatomy
//
// The geometry is a binary blob read straight into GPU buffers, so a wrong
// offset does not throw — it draws a cloud of triangles, or nothing, and the
// screen looks like a model that failed to load. This reads the file the way
// the browser reads it and asserts the things the browser cannot.

import { readFileSync, existsSync } from 'node:fs';
import { BUNDLES, CREDIT, boneOf, familyOf } from '../lib/anatomy/bundles.js';
import { LANDMARKS } from '../lib/anatomy/landmarks.js';
import { NOTES, noteFor, SECTIONS } from '../lib/anatomy/notes.js';
import { partsOf } from '../lib/anatomy/parts.js';

let bad = 0;
const no = (why) => { bad++; console.log(`  FAIL ${why}`); };
const ok = (what) => console.log(`  ok   ${what}`);

if (!CREDIT.includes('CC BY 4.0')) no('the default credit line no longer names the licence');

for (const bundle of BUNDLES) {
  console.log(`— ${bundle.id}`);
  // Z-Anatomy is share-alike and BodyParts3D is not; a bundle that carries the
  // wrong credit is the one mistake here with a legal edge to it.
  const said = bundle.credit || CREDIT;
  if (!/CC BY/.test(said)) no(`${bundle.id}: the credit line names no licence`);
  if (bundle.source === 'zanatomy' && !/CC BY-SA/.test(said)) {
    no(`${bundle.id} comes from Z-Anatomy but its credit does not say CC BY-SA`);
  }
  const json = `public/anatomy/${bundle.id}.json`;
  const bin = `public/anatomy/${bundle.id}.bin`;
  if (!existsSync(json) || !existsSync(bin)) {
    no(`${bundle.id} has not been carved — run scripts/carve-anatomy.mjs`);
    continue;
  }

  const meta = JSON.parse(readFileSync(json, 'utf8'));
  const raw = readFileSync(bin);
  const buf = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.length);

  // A bundle either lists its structures outright or lists the files it takes
  // them from, and a mirrored file gives two for every one it names.
  const listed = bundle.parts
    ? Object.keys(bundle.parts).length
    : bundle.files.reduce((n, f) => n + Object.keys(f.parts).length * (f.mirrored ? 2 : 1), 0);
  if (meta.parts.length !== listed) {
    no(`${meta.parts.length} structures in the file, ${listed} named in bundles.js`);
  } else ok(`${meta.parts.length} structures, all named`);

  // A name in Arabic would break the language rule in the one place a
  // student is reading anatomy, so it is checked rather than trusted.
  const arabic = meta.parts.filter((p) => /[؀-ۿ]/.test(p.name));
  if (arabic.length) no(`named in Arabic: ${arabic.map((p) => p.name).join(', ')}`);
  else ok('every name is French');

  // Colour is how the plate is read, so the two halves of one bone must not
  // be able to drift apart, and the app's orange must not turn up on a bone.
  const shades = new Map();
  for (const p of meta.parts) {
    const family = familyOf(bundle, p.name);
    if (!/^#[0-9A-Fa-f]{6}$/.test(p.tint || '')) { no(`${p.name}: no colour`); continue; }
    if (p.tint.toUpperCase() === '#F97316') no(`${p.name} is painted the app's orange`);
    const seen = shades.get(family);
    if (seen && seen !== p.tint) no(`${family} is two colours: ${seen} and ${p.tint}`);
    shades.set(family, p.tint);
  }
  const spread = new Set(shades.values());
  if (spread.size !== shades.size) no('two different groups share a colour');
  else ok(`${shades.size} groups, ${shades.size} colours`);

  let triangles = 0;
  for (const p of meta.parts) {
    const where = `${bundle.id}/${p.name}`;
    for (const [field, size] of [['positions', 4], ['normals', 2], ['indices', 4]]) {
      if (p[field] % size) no(`${where}: ${field} is not ${size}-byte aligned`);
    }
    const end = p.indices + p.indexCount * 4;
    if (end > buf.byteLength) { no(`${where}: runs past the end of the file`); continue; }

    const idx = new Uint32Array(buf, p.indices, p.indexCount);
    let top = 0;
    for (const i of idx) if (i > top) top = i;
    if (top >= p.vertexCount) no(`${where}: an index points at vertex ${top} of ${p.vertexCount}`);

    const pos = new Float32Array(buf, p.positions, p.vertexCount * 3);
    let loose = 0;
    for (let i = 0; i < pos.length; i += 3) {
      for (let k = 0; k < 3; k++) {
        if (pos[i + k] < p.bounds[0][k] - 1e-3 || pos[i + k] > p.bounds[1][k] + 1e-3) loose++;
      }
    }
    if (loose) no(`${where}: ${loose} coordinates outside the box the manifest gives`);

    const nrm = new Int16Array(buf, p.normals, p.vertexCount * 3);
    if (!nrm.some((v) => v !== 0)) no(`${where}: every normal is zero, it would draw black`);

    if (p.indexCount % 3) no(`${where}: ${p.indexCount} indices is not whole triangles`);
    triangles += p.indexCount / 3;
  }

  // The landmarks. A label that has slipped off its bone is the worst kind of
  // mistake this file can make: it does not look broken, it looks like an
  // answer, and a student would learn it.
  const wanted = LANDMARKS[bundle.id] || [];
  const marks = existsSync(`public/anatomy/${bundle.id}.points.json`)
    ? JSON.parse(readFileSync(`public/anatomy/${bundle.id}.points.json`, 'utf8')).points
    : [];
  if (marks.length !== wanted.length) {
    no(`${marks.length} landmarks placed, ${wanted.length} named — run scripts/place-landmarks.mjs`);
  } else if (marks.length) {
    const where = new Map(meta.parts.map((q) => [q.id, q]));
    for (const m of marks) {
      const host = where.get(m.part);
      if (!host) { no(`${m.name} points at ${m.part}, which is not in this model`); continue; }
      if (/[؀-ۿ]/.test(m.name)) no(`landmark named in Arabic: ${m.name}`);
      const off = m.at.some((v, k) => v < host.bounds[0][k] - 1e-3 || v > host.bounds[1][k] + 1e-3);
      if (off) no(`${m.name} is not on ${host.name}`);
      const len = Math.hypot(...m.out);
      if (Math.abs(len - 1) > 0.02) no(`${m.name} faces nowhere in particular`);
    }
    const twice = marks.map((m) => m.name).filter((n, i, a) => a.indexOf(n) !== i);
    if (twice.length) no(`named twice: ${[...new Set(twice)].join(', ')}`);
    ok(`${marks.length} landmarks, each on its own bone`);
  }

  // The descriptions. A model whose structures have no description is a
  // picture, and a structure that has one in Arabic breaks the language rule
  // in the one place a student is reading anatomy.
  const described = [...new Set(
    [...meta.parts.map((q) => q.name), ...marks.map((m) => m.name)].map(boneOf))];
  const written = Object.keys(NOTES[bundle.id] || {});
  const blank = described.filter((n) => !noteFor(bundle.id, n));
  const spare = written.filter((n) => !described.includes(n));
  if (blank.length) no(`nothing written about: ${blank.join(', ')}`);
  if (spare.length) no(`written about something this model does not hold: ${spare.join(', ')}`);
  if (!blank.length && !spare.length) ok(`${described.length} structures, every one described`);

  const keys = new Set(SECTIONS.map(([k]) => k));
  for (const n of described) {
    const d = noteFor(bundle.id, n);
    if (!d) continue;
    if (!d.what || d.what.length < 30) no(`${n}: the description says almost nothing`);
    for (const [key, value] of Object.entries(d)) {
      if (key === 'what' || key === 'note') {
        if (/[؀-ۿ]/.test(value || '')) no(`${n}: written in Arabic`);
        continue;
      }
      if (!keys.has(key)) { no(`${n}: "${key}" is not a section the screen knows`); continue; }
      if (!Array.isArray(value) || !value.length) no(`${n}: ${key} is empty`);
      else if (value.some((t) => /[؀-ۿ]/.test(t))) no(`${n}: ${key} written in Arabic`);
    }
  }

  // A bone divided into parts. The division is approximate by construction,
  // but it must at least cover the bone exactly once and leave no part empty:
  // a part with no triangles is a name in the list that colours nothing.
  let divided = 0;
  for (const q of meta.parts) {
    const wanted = partsOf(bundle.id, boneOf(q.name));
    if (!wanted) { if (q.groups) no(`${q.name} is divided but nothing asked for it`); continue; }
    if (!q.groups) { no(`${q.name} has named parts but was never divided`); continue; }
    divided += 1;
    if (q.groups.length !== wanted.length) no(`${q.name}: ${q.groups.length} parts, ${wanted.length} named`);
    let next = 0;
    for (const g of q.groups) {
      if (g.start !== next) no(`${q.name}: ${g.name} does not carry on from the part before it`);
      if (!g.count) no(`${q.name}: ${g.name} holds no triangles at all`);
      if (g.count % 3) no(`${q.name}: ${g.name} is not whole triangles`);
      if (/[؀-ۿ]/.test(g.name)) no(`${q.name}: ${g.name} is named in Arabic`);
      next = g.start + g.count;
    }
    if (next !== q.indexCount) no(`${q.name}: the parts cover ${next} of ${q.indexCount} indices`);
  }
  if (divided) ok(`${divided} bones divided into parts, each covered exactly once`);

  const mb = (raw.length / 1048576).toFixed(2);
  ok(`${triangles} triangles, ${mb} MB`);
  // Mobile data is the reason this is a handful of structures and not the
  // whole atlas. A bundle that has quietly grown past a lecture's worth of
  // PDF should be noticed here rather than on somebody's phone.
  if (raw.length > 6 * 1048576) no(`${bundle.id} is ${mb} MB — too much to open on mobile data`);
}

console.log(bad ? `\n${bad} to look at` : '\nall good');
process.exit(bad ? 1 : 0);
