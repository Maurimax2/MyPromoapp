// What is in public/anatomy, checked against what says it is there.
//
//   npm run check:anatomy
//
// The geometry is a binary blob read straight into GPU buffers, so a wrong
// offset does not throw — it draws a cloud of triangles, or nothing, and the
// screen looks like a model that failed to load. This reads the file the way
// the browser reads it and asserts the things the browser cannot.

import { readFileSync, existsSync } from 'node:fs';
import { BUNDLES, CREDIT, boneOf } from '../lib/anatomy/bundles.js';
import { LANDMARKS } from '../lib/anatomy/landmarks.js';

let bad = 0;
const no = (why) => { bad++; console.log(`  FAIL ${why}`); };
const ok = (what) => console.log(`  ok   ${what}`);

if (!CREDIT.includes('CC BY 4.0')) no('the credit line no longer names the licence');

for (const bundle of BUNDLES) {
  console.log(`— ${bundle.id}`);
  const json = `public/anatomy/${bundle.id}.json`;
  const bin = `public/anatomy/${bundle.id}.bin`;
  if (!existsSync(json) || !existsSync(bin)) {
    no(`${bundle.id} has not been carved — run scripts/carve-anatomy.mjs`);
    continue;
  }

  const meta = JSON.parse(readFileSync(json, 'utf8'));
  const raw = readFileSync(bin);
  const buf = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.length);

  const named = Object.keys(bundle.parts);
  if (meta.parts.length !== named.length) {
    no(`${meta.parts.length} structures in the file, ${named.length} named in bundles.js`);
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
    const bone = boneOf(p.name);
    if (!/^#[0-9A-Fa-f]{6}$/.test(p.tint || '')) { no(`${p.name}: no colour`); continue; }
    if (p.tint.toUpperCase() === '#F97316') no(`${p.name} is painted the app's orange`);
    const seen = shades.get(bone);
    if (seen && seen !== p.tint) no(`${bone} is two colours: ${seen} and ${p.tint}`);
    shades.set(bone, p.tint);
  }
  const spread = new Set(shades.values());
  if (spread.size !== shades.size) no('two different bones share a colour');
  else ok(`${shades.size} bones, ${shades.size} colours`);

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

  const mb = (raw.length / 1048576).toFixed(2);
  ok(`${triangles} triangles, ${mb} MB`);
  // Mobile data is the reason this is a handful of structures and not the
  // whole atlas. A bundle that has quietly grown past a lecture's worth of
  // PDF should be noticed here rather than on somebody's phone.
  if (raw.length > 6 * 1048576) no(`${bundle.id} is ${mb} MB — too much to open on mobile data`);
}

console.log(bad ? `\n${bad} to look at` : '\nall good');
process.exit(bad ? 1 : 0);
