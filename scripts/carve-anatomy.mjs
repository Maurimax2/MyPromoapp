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
import { BUNDLES } from '../lib/anatomy/bundles.js';

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
    const take = (offset, bytes) => {
      const start = round4(at);
      pieces.push({ pad: start - at, buf: bin.subarray(offset, offset + bytes) });
      at = start + bytes;
      return start;
    };

    // Laid out exactly as the atlas lays it out — positions as 32-bit floats,
    // normals as signed 16-bit, indices as 32-bit — so the browser hands the
    // buffer straight to the GPU without touching it.
    const positions = take(p.positions, p.vertexCount * 3 * 4);
    const normals = take(p.normals, p.vertexCount * 3 * 2);
    const indices = take(p.indices, p.indexCount * 4);

    for (let i = 0; i < 3; i++) {
      lo[i] = Math.min(lo[i], p.bounds[0][i]);
      hi[i] = Math.max(hi[i], p.bounds[1][i]);
    }

    parts.push({
      id: p.id, name, fma: p.conceptId, source: p.name,
      positions, normals, indices,
      vertexCount: p.vertexCount, indexCount: p.indexCount,
      bounds: p.bounds,
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
