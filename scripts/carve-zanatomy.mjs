// Cut a model out of the Z-Anatomy FBX files.
//
//   node scripts/carve-zanatomy.mjs --z ../zanat
//   node scripts/carve-zanatomy.mjs --z ../zanat --only vaisseaux
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
import { partsOf } from '../lib/anatomy/parts.js';
import { meshesOf, normalsOf } from './fbx-meshes.mjs';
import { divide } from './divide-bone.mjs';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const CM = 0.01;
const out = resolve('public/anatomy');
const root = resolve(arg('z', '../zanat'), 'Resources/Models/FBX');

const only = arg('only', null);

// The cardiovascular file alone is 64 MB and several bundles come out of the
// same one. Reading it once per bundle was most of the time this script took.
const opened = new Map();
const readOnce = (path) => {
  if (!opened.has(path)) opened.set(path, meshesOf(path));
  return opened.get(path);
};

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

/**
 * Fewer triangles, by snapping vertices onto a grid.
 *
 * Z-Anatomy draws a nerve as a smooth tube: the vagus alone arrives as
 * forty-six thousand triangles, which is more resolution than a nerve has
 * shape. Every vertex is moved to the middle of the cell it falls in, vertices
 * that land in the same cell become one, and triangles that collapse to a line
 * are dropped. Crude next to a proper edge-collapse, and for a tube it is
 * indistinguishable.
 */
function fewer(positions, indices, cell) {
  const key = new Map();
  const remap = new Uint32Array(positions.length / 3);
  const kept = [];
  for (let v = 0; v < positions.length / 3; v++) {
    const o = v * 3;
    const id = Math.round(positions[o] / cell) + ',' +
      Math.round(positions[o + 1] / cell) + ',' +
      Math.round(positions[o + 2] / cell);
    let at = key.get(id);
    if (at === undefined) {
      at = kept.length / 3;
      key.set(id, at);
      kept.push(positions[o], positions[o + 1], positions[o + 2]);
    }
    remap[v] = at;
  }
  const tris = [];
  for (let t = 0; t < indices.length; t += 3) {
    const a = remap[indices[t]], b = remap[indices[t + 1]], c = remap[indices[t + 2]];
    if (a === b || b === c || a === c) continue;
    tris.push(a, b, c);
  }
  return { positions: new Float32Array(kept), indices: new Uint32Array(tris) };
}

/** Two meshes as one, with the second's indices moved along. */
function weld(a, b) {
  const positions = new Float32Array(a.positions.length + b.positions.length);
  positions.set(a.positions, 0);
  positions.set(b.positions, a.positions.length);
  const shift = a.positions.length / 3;
  const indices = new Uint32Array(a.indices.length + b.indices.length);
  indices.set(a.indices, 0);
  for (let i = 0; i < b.indices.length; i++) indices[a.indices.length + i] = b.indices[i] + shift;
  return { positions, indices };
}

for (const bundle of BUNDLES) {
  if (bundle.source !== 'zanatomy') continue;
  if (only && bundle.id !== only) continue;
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
    const all = readOnce(join(root, group.file));
    for (const [source, french] of Object.entries(group.parts)) {
      const found = all.get(source);
      if (!found) {
        console.error(bundle.id + ': ' + group.file + ' has no mesh called ' + source);
        process.exit(1);
      }
      const metres = new Float32Array(found.positions.length);
      for (let i = 0; i < found.positions.length; i++) metres[i] = found.positions[i] * CM;

      // Three ways a mesh becomes structures. `mirrored` makes a left and a
      // right from a left-only mesh. `both` makes one structure of the two
      // halves, for a midline thing like the pons that the file happens to
      // hold as a half. Otherwise the mesh is the structure.
      const thinned = group.simplify
        ? fewer(metres, found.indices, group.simplify)
        : { positions: metres, indices: found.indices };
      const other = mirror(thinned.positions, thinned.indices);
      const sides = group.both
        ? [[french, weld(thinned, other)]]
        : group.mirrored
          ? [[french + ' gauche', thinned], [french + ' droit', other]]
          : [[french, thinned]];

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
        // A bone with named parts has its triangles sorted so that each part
        // is a run of the index buffer, handed to the browser as a draw group.
        // Nothing is duplicated: the same triangles in a different order.
        const seeds = partsOf(bundle.id, boneOf(name));
        const sorted = seeds
          ? divide(mesh.positions, mesh.indices, box, seeds, /\s+droite?$/.test(name))
          : null;

        const positions = keep(Buffer.from(mesh.positions.buffer, mesh.positions.byteOffset, mesh.positions.byteLength));
        const normalsAt = keep(Buffer.from(normals.buffer, normals.byteOffset, normals.byteLength));
        const order = sorted ? sorted.order : mesh.indices;
        const indices = keep(Buffer.from(order.buffer, order.byteOffset, order.byteLength));
        parts.push({
          id: name, name, tint, family, source,
          positions, normals: normalsAt, indices,
          vertexCount: mesh.positions.length / 3,
          indexCount: mesh.indices.length,
          bounds: box.map((v) => v.map(near)),
          ...(sorted ? { groups: sorted.groups } : {}),
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
    bounds: [lo.map(near), hi.map(near)],
    // Where to open. The vagus runs to the abdomen, so framing les nerfs
    // crâniens on everything it holds puts the head in the corner.
    ...(bundle.frame ? { frame: bundle.frame } : {}),
    parts,
  }) + '\n');

  console.log(bundle.id + ': ' + parts.length + ' structures, ' +
    (buf.length / 1048576).toFixed(2) + ' MB');
}
