// Cut a model out of the Z-Anatomy FBX files.
//
//   node scripts/carve-zanatomy.mjs --z ../zanat
//
// Same output as scripts/carve-anatomy.mjs and the same viewer reads it. The
// difference is the source: BodyParts3D as the Database Center ships it has no
// muscles of mastication and no muscles of the face at all, and Z-Anatomy —
// which is BodyParts3D with structures added by a medical illustrator — has
// every one of them.
//
// Two things about that file. It is in centimetres, so everything is scaled to
// metres to match. And it holds only the left of each pair, because the right
// is a mirror modifier that the FBX export did not bake, so the right is made
// here by flipping x and reversing the winding.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { BUNDLES, boneOf, familyOf } from '../lib/anatomy/bundles.js';
import { meshesOf, normalsOf } from './fbx-meshes.mjs';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const CM = 0.01;
const out = resolve('public/anatomy');
const root = resolve(arg('z', '../zanat'), 'Resources/Models/FBX');

const round4 = (n) => (n + 3) & ~3;
const near = (v) => Math.round(v * 1e5) / 1e5;

/** The same mesh on the other side of the body. */
function mirror(positions, indices) {
  const p = new Float32Array(positions.length);
  for (let i = 0; i < positions.length; i += 3) {
    p[i] = -positions[i]; p[i + 1] = positions[i + 1]; p[i + 2] = positions[i + 2];
  }
  // Flipping one axis turns every triangle inside out, so the winding has to
  // come back round or the whole side is lit from within.
  const idx = new Uint32Array(indices.length);
  for (let t = 0; t < indices.length; t += 3) {
    idx[t] = indices[t]; idx[t + 1] = indices[t + 2]; idx[t + 2] = indices[t + 1];
  }
  return { positions: p, indices: idx };
}

for (const bundle of BUNDLES) {
  if (bundle.source !== 'zanatomy') continue;
  if (!existsSync(root)) {
    console.error('No Z-Anatomy at ' + root + '\n\nGet one with:\n' +
      '  git clone --depth 1 https://github.com/moueza/Z-Anatomy.git\n' +
      'then point this at it with --z <path>.');
    process.exit(1);
  }

  const pieces = [];
  let at = 0;
  const parts = [];
  const lo = [Infinity, Infinity, Infinity];
  const hi = [-Infinity, -Infinity, -Infinity];

  const keep = (buf) => {
    const start = round4(at);
    pieces.push({ pad: start - at, buf });
    at = start + buf.length;
    return start;
  };

  for (const group of bundle.files) {
    const all = meshesOf(join(root, group.file));
    for (const [source, french] of Object.entries(group.parts)) {
      const found = all.get(source);
      if (!found) {
        console.error(bundle.id + ': ' + group.file + ' has no mesh called ' + source);
        process.exit(1);
      }
      const metres = new Float32Array(found.positions.length);
      for (let i = 0; i < found.positions.length; i++) metres[i] = found.positions[i] * CM;

      const sides = group.mirrored
        ? [[french + ' gauche', { positions: metres, indices: found.indices }],
           [french + ' droit', mirror(metres, found.indices)]]
        : [[french, { positions: metres, indices: found.indices }]];

      for (const [name, mesh] of sides) {
        const family = familyOf(bundle, name);
        const tint = bundle.tints[family];
        if (!tint) {
          console.error(bundle.id + ': no colour for ' + family + ' (' + name + ')');
          process.exit(1);
        }
        const normals = normalsOf(mesh.positions, mesh.indices);
        const box = [[Infinity, Infinity, Infinity], [-Infinity, -Infinity, -Infinity]];
        for (let i = 0; i < mesh.positions.length; i += 3) {
          for (let k = 0; k < 3; k++) {
            box[0][k] = Math.min(box[0][k], mesh.positions[i + k]);
            box[1][k] = Math.max(box[1][k], mesh.positions[i + k]);
            lo[k] = Math.min(lo[k], box[0][k]);
            hi[k] = Math.max(hi[k], box[1][k]);
          }
        }
        const positions = keep(Buffer.from(mesh.positions.buffer, mesh.positions.byteOffset, mesh.positions.byteLength));
        const normalsAt = keep(Buffer.from(normals.buffer, normals.byteOffset, normals.byteLength));
        const indices = keep(Buffer.from(mesh.indices.buffer, mesh.indices.byteOffset, mesh.indices.byteLength));
        parts.push({
          id: name, name, tint, family, source,
          positions, normals: normalsAt, indices,
          vertexCount: mesh.positions.length / 3,
          indexCount: mesh.indices.length,
          bounds: box.map((v) => v.map(near)),
        });
      }
    }
  }

  const buf = Buffer.alloc(round4(at));
  let cursor = 0;
  for (const piece of pieces) {
    cursor += piece.pad;
    piece.buf.copy(buf, cursor);
    cursor += piece.buf.length;
  }

  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, bundle.id + '.bin'), buf);
  writeFileSync(join(out, bundle.id + '.json'), JSON.stringify({
    id: bundle.id, title: bundle.title, bytes: buf.length,
    bounds: [lo.map(near), hi.map(near)], parts,
  }) + '\n');

  console.log(bundle.id + ': ' + parts.length + ' structures, ' +
    (buf.length / 1048576).toFixed(2) + ' MB');
}
