// Cut one lecture's worth of geometry out of the BodyParts3D atlas.
//
//   node scripts/carve-anatomy.mjs --atlas ../human-atlas
//
// The atlas ships as fifteen four-megabyte chunks with every structure in the
// body packed end to end; a manifest says where each one starts. This reads
// the manifest, copies out only the structures named in lib/anatomy/bundles.js,
// and writes them to public/anatomy as one file per model.
//
// The result is committed. Nobody has to run this to build the app — it is
// here so the geometry can be traced back to the file it came from, and so a
// new lecture's model is one entry in bundles.js and one command.
//
// Source: github.com/ashemag/human-atlas (MIT), which carries BodyParts3D 4.0
// converted for the browser. The geometry itself is CC BY 4.0; see CREDIT.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { BUNDLES, boneOf } from '../lib/anatomy/bundles.js';
import { partsOf, PART_TINTS } from '../lib/anatomy/parts.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const atlasDir = resolve(arg('atlas', '../human-atlas'));
const models = join(atlasDir, 'public', 'models');
const out = resolve('public/anatomy');

if (!existsSync(join(models, 'atlas.json'))) {
  console.error(
    `No atlas at ${models}\n\n` +
    'Get one with:\n' +
    '  git clone --depth 1 https://github.com/ashemag/human-atlas.git\n' +
    'then point this at it with --atlas <path>.');
  process.exit(1);
}

const atlas = JSON.parse(readFileSync(join(models, 'atlas.json'), 'utf8'));
const byId = new Map(atlas.parts.map((p) => [p.id, p]));

// The chunks are read on demand: a model usually lives in two or three of the
// fifteen, and reading all of them is 60 MB to copy out one skull.
const chunks = new Map();
const chunkOf = (i) => {
  if (!chunks.has(i)) {
    const url = atlas.chunks[i].url.replace(/^\//, '');
    chunks.set(i, readFileSync(join(atlasDir, 'public', url.replace(/^models\//, 'models/'))));
  }
  return chunks.get(i);
};

const round4 = (n) => (n + 3) & ~3;

mkdirSync(out, { recursive: true });

for (const bundle of BUNDLES) {
  const pieces = [];
  let at = 0;
  const parts = [];
  const lo = [Infinity, Infinity, Infinity];
  const hi = [-Infinity, -Infinity, -Infinity];

  for (const [sourceId, name] of Object.entries(bundle.parts)) {
    const p = byId.get(sourceId);
    if (!p) {
      console.error(`${bundle.id}: the atlas has no part ${sourceId} (${name})`);
      process.exit(1);
    }
    const bin = chunkOf(p.chunk);
    const take = (offset, bytes, made) => {
      const start = round4(at);
      pieces.push({ pad: start - at, buf: made || bin.subarray(offset, offset + bytes) });
      at = start + bytes;
      return start;
    };

    // Laid out exactly as the atlas lays it out — positions as 32-bit floats,
    // normals as signed 16-bit, indices as 32-bit — so the browser hands the
    // buffer straight to the GPU without touching it.
    const positions = take(p.positions, p.vertexCount * 3 * 4);
    const normals = take(p.normals, p.vertexCount * 3 * 2);

    // A bone with named parts has its triangles sorted so that each part is a
    // run of the index buffer, and the run is handed to the browser as a draw
    // group. Nothing is duplicated: it is the same triangles in a different
    // order.
    const seeds = partsOf(bundle.id, boneOf(name));
    const sorted = seeds && divide(bin, p, seeds, /\s+droite?$/.test(name));
    const indices = sorted
      ? take(null, p.indexCount * 4, Buffer.from(sorted.order.buffer))
      : take(p.indices, p.indexCount * 4);

    for (let i = 0; i < 3; i++) {
      lo[i] = Math.min(lo[i], p.bounds[0][i]);
      hi[i] = Math.max(hi[i], p.bounds[1][i]);
    }

    const tint = bundle.tints[boneOf(name)];
    if (!tint) {
      console.error(`${bundle.id}: no colour for ${boneOf(name)} (${name})`);
      process.exit(1);
    }

    parts.push({
      id: p.id, name, tint, fma: p.conceptId, source: p.name,
      positions, normals, indices,
      vertexCount: p.vertexCount, indexCount: p.indexCount,
      bounds: p.bounds,
      ...(sorted ? { groups: sorted.groups } : {}),
    });
  }

  const buf = Buffer.alloc(round4(at));
  let cursor = 0;
  for (const piece of pieces) {
    cursor += piece.pad;
    piece.buf.copy(buf, cursor);
    cursor += piece.buf.length;
  }

  writeFileSync(join(out, `${bundle.id}.bin`), buf);
  writeFileSync(join(out, `${bundle.id}.json`), `${JSON.stringify({
    id: bundle.id, title: bundle.title, bytes: buf.length,
    bounds: [lo, hi], parts,
  })}\n`);

  const mb = (buf.length / 1048576).toFixed(2);
  console.log(`${bundle.id}: ${parts.length} structures, ${mb} MB`);
}


/**
 * Cut one bone's triangles into its named parts.
 *
 * Each part gets an anchor — the point of the bone furthest in the direction
 * the rule gives — and every triangle goes to the anchor its middle is nearest
 * to. The result is the same triangles in a new order, plus the run each part
 * occupies.
 */
function divide(bin, p, seeds, mirrored) {
  const pos = new Float32Array(p.vertexCount * 3);
  const idx = new Uint32Array(p.indexCount);
  // Copied rather than viewed: a file read is not guaranteed to land on a
  // four-byte boundary, and a typed array over it would throw.
  for (let i = 0; i < pos.length; i++) pos[i] = bin.readFloatLE(p.positions + i * 4);
  for (let i = 0; i < idx.length; i++) idx[i] = bin.readUInt32LE(p.indices + i * 4);

  const anchors = seeds.map((seed) => {
    const d = [...seed.dir];
    if (mirrored) d[0] = -d[0];
    const len = Math.hypot(...d) || 1;
    const unit = d.map((n) => n / len);

    let lo = -Infinity, hi = Infinity, axis = 0;
    if (seed.band) {
      const [name, from, to] = seed.band;
      axis = { x: 0, y: 1, z: 2 }[name];
      const a = p.bounds[0][axis], b = p.bounds[1][axis];
      lo = a + (b - a) * from;
      hi = a + (b - a) * to;
    }

    // Measured inside the bone's own box rather than in metres. A maxilla is
    // three times as deep as it is wide, so in raw coordinates "forward and a
    // little to the side" is simply "forward", and the anchors for the two
    // sides landed in different places on bones that are nearly mirrors.
    const span = [0, 1, 2].map((k) => (p.bounds[1][k] - p.bounds[0][k]) || 1);
    let best = -Infinity, at = 0;
    for (let v = 0; v < p.vertexCount; v++) {
      const o = v * 3;
      if (seed.band) { const on = pos[o + axis]; if (on < lo || on > hi) continue; }
      let score = 0;
      for (let k = 0; k < 3; k++) score += unit[k] * ((pos[o + k] - p.bounds[0][k]) / span[k]);
      if (score > best) { best = score; at = o; }
    }
    return [pos[at], pos[at + 1], pos[at + 2]];
  });

  const mine = new Uint8Array(p.indexCount / 3);
  for (let t = 0; t < p.indexCount; t += 3) {
    let cx = 0, cy = 0, cz = 0;
    for (let k = 0; k < 3; k++) {
      const o = idx[t + k] * 3;
      cx += pos[o]; cy += pos[o + 1]; cz += pos[o + 2];
    }
    cx /= 3; cy /= 3; cz /= 3;
    let near = Infinity, who = 0;
    anchors.forEach((a, i) => {
      // `pull` is how far a part reaches. Nearest-anchor alone gives a thin
      // spike like the styloid process the same territory as the mastoid it
      // sits beside, because territory is decided by the gap between anchors
      // and not by the size of the thing.
      const reach = seeds[i].pull || 1;
      const d = ((cx - a[0]) ** 2 + (cy - a[1]) ** 2 + (cz - a[2]) ** 2) / (reach * reach);
      if (d < near) { near = d; who = i; }
    });
    mine[t / 3] = who;
  }

  const order = new Uint32Array(p.indexCount);
  const groups = [];
  let cursor = 0;
  seeds.forEach((seed, i) => {
    const start = cursor;
    for (let t = 0; t < mine.length; t++) {
      if (mine[t] !== i) continue;
      order[cursor] = idx[t * 3];
      order[cursor + 1] = idx[t * 3 + 1];
      order[cursor + 2] = idx[t * 3 + 2];
      cursor += 3;
    }
    groups.push({
      name: seed.name, tint: PART_TINTS[i % PART_TINTS.length],
      start, count: cursor - start,
    });
  });
  return { order, groups };
}
