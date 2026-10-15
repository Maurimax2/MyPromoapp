// The ear, from a scanner, placed in the body.
//
//   node --max-old-space-size=8192 scripts/carve-oreille.mjs --z ../zanat --spl ../spl
//
// Z-Anatomy's ear is the ossicles, a cochlea, a vestibule and a membrane,
// floating with nothing round them: the owner opened «L'oreille» and found the
// middle and inner ear and nothing else. The SPL Inner Ear Atlas (Surgical
// Planning Laboratory, Brigham and Women's Hospital — 3D Slicer licence,
// part B, which allows commercial use and asks that its text travel with the
// data) is a high-resolution CT of a temporal bone with everything in it
// segmented: the bone itself with its canals, cavities and mastoid cells, the
// bony labyrinth, the osseous spiral lamina, the round window, the three
// ossicles and their two muscles, the tympanic membrane, the facial, cochlear
// and vestibular nerves, the internal carotid and the sigmoid sinus with the
// jugular bulb. Download: https://www.openanatomy.org/atlases/nac/inner-ear-2018-02.zip
// (unzipped into ../spl).
//
// The specimen was scanned in whatever position it lay, at its own scale. It
// is put where the body's left ear is by a similarity (a rotation, one scale
// and a shift) fitted on the structures both have — ossicles, membrane and
// labyrinth first, the nerves and vessels as weaker guides — by iterated
// closest points. Both handednesses are tried and the better kept; the fit is
// printed. The right ear is the mirror.
//
// The labyrinth is one surface in the atlas; it is cut into the cochlea and
// the vestibule with its canals by which of Z-Anatomy's two pieces each
// triangle lies nearer, once fitted.
//
// Writes two systems into public/anatomy/body/ — `rocher` (the bone) and
// `oreille` (all the rest) — so a lesson can open the bone see-through over
// solid ossicles. The licence sits beside them.

import { writeFileSync, readFileSync, existsSync, statSync, renameSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { meshesOf, normalsOf } from './fbx-meshes.mjs';
import { readVtk } from './vtk.mjs';
import { EAR_NOTES } from '../lib/anatomy/notes-body/oreille.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const HERE = dirname(fileURLToPath(import.meta.url));
const ZFBX = join(resolve(arg('z', '../zanat')), 'Resources/Models/FBX');
const SPL = join(resolve(arg('spl', '../spl')), 'inner-ear-2018-02/models');
const OUT = resolve(HERE, '../public/anatomy/body');
const TMP = join(os.tmpdir(), 'mypromo-oreille');
const GLTFPACK = resolve(HERE, '../node_modules/gltfpack/cli.js');
mkdirSync(TMP, { recursive: true });

// file → [system, kind, French name, key]
const PARTS = {
  'Model_3_Temporal_Bone.vtk': ['rocher', 'bone', 'Os temporal — rocher et mastoïde (scanner)', 'spl-temporal'],
  cochlea: ['oreille', 'labyrinth', 'Cochlée', 'spl-cochlea'], // the labyrinth, cut in two below
  vestibule: ['oreille', 'labyrinth', 'Vestibule et canaux semi-circulaires', 'spl-vestibule'],
  'Model_23_Osseous_Spiral_Lamina.vtk': ['oreille', 'bone', 'Lame spirale osseuse', 'spl-lamina'],
  'Model_12_Fenestra_Rotunda.vtk': ['oreille', 'membrane', 'Fenêtre de la cochlée (ronde)', 'spl-round'],
  'Model_4_Tympanic_Membrane.vtk': ['oreille', 'membrane', 'Membrane du tympan', 'spl-tympan'],
  'Model_140_Malleus_Bone.vtk': ['oreille', 'bone', 'Malléus (marteau)', 'spl-malleus'],
  'Model_14_Incus_Bone.vtk': ['oreille', 'bone', 'Incus (enclume)', 'spl-incus'],
  'Model_17_Stapes_Bone.vtk': ['oreille', 'bone', 'Stapès (étrier)', 'spl-stapes'],
  'Model_19_Tensor_Tympani_Muscle.vtk': ['oreille', 'muscle', 'Muscle tenseur du tympan', 'spl-tensor'],
  'Model_28_Stapedius_Muscle.vtk': ['oreille', 'muscle', 'Muscle stapédien', 'spl-stapedius'],
  'Model_5_Facial_Nerve.vtk': ['oreille', 'nerve', 'Nerf facial (VII) — canal facial', 'spl-facial'],
  'Model_9_Cochlear_Nerve.vtk': ['oreille', 'nerve', 'Nerf cochléaire', 'spl-cochlear'],
  'Model_25_Vestibular_Nerve.vtk': ['oreille', 'nerve', 'Nerf vestibulaire', 'spl-vestibular'],
  'Model_24_Internal_Carotid_Artery.vtk': ['oreille', 'artery', 'Artère carotide interne (segment pétreux)', 'spl-carotid'],
  'Model_21_Internal_Jugular_Vein.vtk': ['oreille', 'vein', 'Sinus sigmoïde et bulbe jugulaire', 'spl-jugular'],
};
const RATIO = { rocher: 0.07, oreille: 0.5 };

// ------------------------------------------------------------------ reading
const spl = new Map();
for (const f of [...Object.keys(PARTS).filter((k) => k.endsWith('.vtk')), 'Model_10_Labyrinth.vtk']) {
  const { positions, indices } = readVtk(join(SPL, f));
  spl.set(f, { positions: Float32Array.from(positions, (v) => v * 0.001), indices });
}
const zm = new Map();
for (const f of ['CardioVascular41.fbx', 'NervousSystem100.fbx', 'SkeletalSystem100.fbx']) {
  for (const [k, v] of meshesOf(join(ZFBX, f))) zm.set(k, v);
}
const zPoints = (...names) => {
  const parts = names.map((n) => {
    const m = zm.get(n);
    if (!m) throw new Error(`Z-Anatomy has no ${n}`);
    return Float32Array.from(m.positions, (v) => v * 0.01);
  });
  const out = new Float32Array(parts.reduce((a, p) => a + p.length, 0));
  let at = 0; for (const p of parts) { out.set(p, at); at += p.length; }
  return out;
};

// ------------------------------------------------------- nearest-point grids
function grid(points, cell) {
  const g = new Map();
  for (let i = 0; i < points.length; i += 3) {
    const k = `${Math.floor(points[i] / cell)},${Math.floor(points[i + 1] / cell)},${Math.floor(points[i + 2] / cell)}`;
    if (!g.has(k)) g.set(k, []);
    g.get(k).push(i);
  }
  // Nearest point, searched in growing shells of cells (and one more after the
  // first hit, so a nearer point in the next shell is not missed).
  return (x, y, z, rings = 12) => {
    const cx = Math.floor(x / cell), cy = Math.floor(y / cell), cz = Math.floor(z / cell);
    let best = -1, bd = Infinity, stop = rings;
    for (let r = 0; r <= stop; r++) {
      for (let i = -r; i <= r; i++) for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) {
        if (Math.max(Math.abs(i), Math.abs(j), Math.abs(k)) !== r) continue;
        const l = g.get(`${cx + i},${cy + j},${cz + k}`);
        if (!l) continue;
        for (const a of l) {
          const d = (points[a] - x) ** 2 + (points[a + 1] - y) ** 2 + (points[a + 2] - z) ** 2;
          if (d < bd) { bd = d; best = a; }
        }
      }
      if (best >= 0 && stop === rings) stop = r + 1;
    }
    return best < 0 ? null : [points[best], points[best + 1], points[best + 2], Math.sqrt(bd)];
  };
}

// --------------------------------------------------- similarity (Horn, 1987)
function topEigen4(A) {
  const a = A.map((r) => r.slice());
  const V = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0;
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) off += a[i][j] ** 2;
    if (off < 1e-24) break;
    for (let p = 0; p < 4; p++) for (let q = p + 1; q < 4; q++) {
      if (Math.abs(a[p][q]) < 1e-30) continue;
      const th = (a[q][q] - a[p][p]) / (2 * a[p][q]);
      const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
      const c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < 4; k++) { const x = a[k][p], y = a[k][q]; a[k][p] = c * x - s * y; a[k][q] = s * x + c * y; }
      for (let k = 0; k < 4; k++) { const x = a[p][k], y = a[q][k]; a[p][k] = c * x - s * y; a[q][k] = s * x + c * y; }
      for (let k = 0; k < 4; k++) { const x = V[k][p], y = V[k][q]; V[k][p] = c * x - s * y; V[k][q] = s * x + c * y; }
    }
  }
  let b = 0;
  for (let i = 1; i < 4; i++) if (a[i][i] > a[b][b]) b = i;
  return [V[0][b], V[1][b], V[2][b], V[3][b]];
}
function similarity(X, Y, W) {
  let sw = 0;
  const mx = [0, 0, 0], my = [0, 0, 0];
  X.forEach((x, i) => { sw += W[i]; for (let k = 0; k < 3; k++) { mx[k] += W[i] * x[k]; my[k] += W[i] * Y[i][k]; } });
  for (let k = 0; k < 3; k++) { mx[k] /= sw; my[k] /= sw; }
  const M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  let sxx = 0;
  X.forEach((x, i) => {
    const a = x.map((v, k) => v - mx[k]), b = Y[i].map((v, k) => v - my[k]);
    sxx += W[i] * (a[0] ** 2 + a[1] ** 2 + a[2] ** 2);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) M[r][c] += W[i] * a[r] * b[c];
  });
  const [[xx, xy, xz], [yx, yy, yz], [zx, zy, zz]] = M;
  const [w, x, y, z] = topEigen4([
    [xx + yy + zz, yz - zy, zx - xz, xy - yx],
    [yz - zy, xx - yy - zz, xy + yx, zx + xz],
    [zx - xz, xy + yx, -xx + yy - zz, yz + zy],
    [xy - yx, zx + xz, yz + zy, -xx - yy + zz],
  ]);
  const R = [
    [w * w + x * x - y * y - z * z, 2 * (x * y - w * z), 2 * (x * z + w * y)],
    [2 * (x * y + w * z), w * w - x * x + y * y - z * z, 2 * (y * z - w * x)],
    [2 * (x * z - w * y), 2 * (y * z + w * x), w * w - x * x - y * y + z * z],
  ];
  let num = 0;
  X.forEach((p, i) => {
    const a = p.map((v, k) => v - mx[k]);
    const ra = R.map((r) => r[0] * a[0] + r[1] * a[1] + r[2] * a[2]);
    num += W[i] * ra.reduce((n, v, k) => n + v * (Y[i][k] - my[k]), 0);
  });
  const s = num / sxx;
  const t = my.map((v, k) => v - s * (R[k][0] * mx[0] + R[k][1] * mx[1] + R[k][2] * mx[2]));
  return { R, s, t };
}
const move = ({ R, s, t }, p) => R.map((r, k) => s * (r[0] * p[0] + r[1] * p[1] + r[2] * p[2]) + t[k]);

// Keeps only the triangles `keep(t)` says, and the vertices they use.
function subset(positions, indices, keep) {
  const map = new Int32Array(positions.length / 3).fill(-1);
  const pos = [], idx = [];
  for (let t = 0; t < indices.length; t += 3) {
    if (!keep(t / 3)) continue;
    for (let k = 0; k < 3; k++) {
      const v = indices[t + k];
      if (map[v] < 0) { map[v] = pos.length / 3; pos.push(positions[v * 3], positions[v * 3 + 1], positions[v * 3 + 2]); }
      idx.push(map[v]);
    }
  }
  return { positions: Float32Array.from(pos), indices: Uint32Array.from(idx) };
}

// ------------------------------------------------- the labyrinth, cut in two
// The osseous spiral lamina runs up the middle of the cochlea's canal, so the
// cochlea is the part of the labyrinth's wall near it: within 1.6 mm of it in
// life (the canal is about 3 mm across), where the vestibule and the canals
// lie 2 mm and more away — the distances fall in two clear heaps. Measured in
// the scanner's own units, `mm` of them to a millimetre.
function cutLabyrinth(positions, indices, lamina, mm) {
  const near = grid(lamina, 0.002);
  const n = indices.length / 3;
  const label = new Uint8Array(n);
  for (let t = 0; t < n; t++) {
    const c = [0, 1, 2].map((k) => (positions[indices[t * 3] * 3 + k] + positions[indices[t * 3 + 1] * 3 + k] + positions[indices[t * 3 + 2] * 3 + k]) / 3);
    const h = near(...c, 6);
    label[t] = h && h[3] < 1.6 * mm ? 0 : 1;
  }
  // Islands: a patch of one label inside the other is a fitting error, and
  // goes to its surroundings. Triangles are neighbours through an edge.
  const edges = new Map();
  for (let t = 0; t < n; t++) for (let k = 0; k < 3; k++) {
    const a = indices[t * 3 + k], b = indices[t * 3 + (k + 1) % 3];
    const key = a < b ? `${a},${b}` : `${b},${a}`;
    if (!edges.has(key)) edges.set(key, []);
    edges.get(key).push(t);
  }
  const nb = Array.from({ length: n }, () => []);
  for (const ts of edges.values()) for (const a of ts) for (const b of ts) if (a !== b) nb[a].push(b);
  for (let pass = 0; pass < 3; pass++) {
    const seen = new Int32Array(n).fill(-1);
    const comps = [];
    for (let t = 0; t < n; t++) {
      if (seen[t] >= 0) continue;
      const stack = [t], members = [];
      seen[t] = comps.length;
      while (stack.length) {
        const u = stack.pop(); members.push(u);
        for (const v of nb[u]) if (seen[v] < 0 && label[v] === label[t]) { seen[v] = comps.length; stack.push(v); }
      }
      comps.push(members);
    }
    const biggest = [0, 0];
    for (const c of comps) biggest[label[c[0]]] = Math.max(biggest[label[c[0]]], c.length);
    for (const c of comps) if (c.length < biggest[label[c[0]]]) for (const u of c) label[u] = 1 - label[u];
  }
  return [0, 1].map((l) => subset(positions, indices, (t) => label[t] === l));
}

// ---------------------------------------------------------------- the fit
// [atlas file, Z-Anatomy pieces, weight, core]. The core is what both have
// whole; a nerve or a vessel is a partial piece of a longer Z-Anatomy one,
// so only its best-matching part counts, and less.
const GUIDES = [
  ['Model_140_Malleus_Bone.vtk', ['Malleus.l'], 1, true],
  ['Model_14_Incus_Bone.vtk', ['Incus.l'], 1, true],
  ['Model_17_Stapes_Bone.vtk', ['Stapes.l'], 1, true],
  ['Model_4_Tympanic_Membrane.vtk', ['Tympanic membrane.l'], 1, true],
  ['cochlea', ['Cochlea.l'], 1, true],
  ['vestibule', ['Vestibule.l'], 1, true],
  ['Model_9_Cochlear_Nerve.vtk', ['Cochlear nerve.l'], 0.4, false],
  ['Model_25_Vestibular_Nerve.vtk', ['Vestibular nerve.l'], 0.4, false],
  ['Model_5_Facial_Nerve.vtk', ['Facial nerve (VII).l'], 0.5, false],
  ['Model_24_Internal_Carotid_Artery.vtk', ['Internal carotid artery.l'], 0.5, false],
  ['Model_21_Internal_Jugular_Vein.vtk', ['Internal jugular vein.l', 'Sigmoid sinus.l'], 0.3, false],
];
const sample = (p, n) => {
  const step = Math.max(1, Math.floor(p.length / 3 / n));
  const out = [];
  for (let i = 0; i < p.length; i += 3 * step) out.push([p[i], p[i + 1], p[i + 2]]);
  return out;
};
const centroid = (p) => {
  const c = [0, 0, 0];
  for (let i = 0; i < p.length; i += 3) { c[0] += p[i]; c[1] += p[i + 1]; c[2] += p[i + 2]; }
  return c.map((v) => v / (p.length / 3));
};
const guide = ([f, zs, w, core]) => {
  const dst = zPoints(...zs);
  return { f, w, core, src: sample(spl.get(f).positions, 400), sc: centroid(spl.get(f).positions), dc: centroid(dst), near: grid(dst, 0.004) };
};

function fit(guides, mirror) {
  const M = (p) => (mirror ? [-p[0], p[1], p[2]] : p);
  const core = guides.filter((g) => g.core);
  let T = similarity(core.map((g) => M(g.sc)), core.map((g) => g.dc), core.map(() => 1));
  let err = 0;
  for (let it = 0; it < 80; it++) {
    const X = [], Y = [], W = [];
    let e = 0, n = 0;
    for (const g of guides) {
      const hits = [];
      for (const q of g.src) { const h = g.near(...move(T, M(q))); if (h) hits.push([q, h]); }
      hits.sort((a, b) => a[1][3] - b[1][3]);
      const keep = hits.slice(0, Math.ceil(hits.length * (g.core ? 0.9 : 0.6)));
      for (const [q, h] of keep) {
        X.push(M(q)); Y.push(h.slice(0, 3)); W.push(g.w / keep.length);
        if (g.core) { e += h[3]; n++; }
      }
    }
    T = similarity(X, Y, W);
    err = e / n;
  }
  const per = guides.map((g) => {
    let e = 0;
    for (const q of g.src) e += g.near(...move(T, M(q)))[3];
    return `${g.f.replace(/Model_\d+_|\.vtk/g, '')} ${(e / g.src.length * 1000).toFixed(1)}`;
  });
  return { mirror, T, err, per };
}
// First with the labyrinth whole, for the scale — which the cut needs to
// know what a millimetre is — then cut, and fitted again piece by piece: the
// whole labyrinth fitted as one could turn its cochlea towards Z-Anatomy's
// vestibule and still look close.
const first = [fit([...GUIDES.filter((g) => g[0] !== 'cochlea' && g[0] !== 'vestibule'), ['Model_10_Labyrinth.vtk', ['Cochlea.l', 'Vestibule.l'], 1.5, true]].map(guide), false),
  fit([...GUIDES.filter((g) => g[0] !== 'cochlea' && g[0] !== 'vestibule'), ['Model_10_Labyrinth.vtk', ['Cochlea.l', 'Vestibule.l'], 1.5, true]].map(guide), true)]
  .sort((a, b) => a.err - b.err)[0];
{
  const lab = spl.get('Model_10_Labyrinth.vtk');
  const [cochlea, vestibule] = cutLabyrinth(lab.positions, lab.indices, spl.get('Model_23_Osseous_Spiral_Lamina.vtk').positions, 0.001 / first.T.s);
  spl.set('cochlea', cochlea);
  spl.set('vestibule', vestibule);
  console.log(`labyrinth: cochlea ${cochlea.indices.length / 3} triangles, vestibule and canals ${vestibule.indices.length / 3}`);
}
const fits = [fit(GUIDES.map(guide), false), fit(GUIDES.map(guide), true)].sort((a, b) => a.err - b.err);
const F = fits[0];
console.log(`fit: ${F.mirror ? 'mirrored' : 'as scanned'}, scale ${F.T.s.toFixed(3)}, core ${(F.err * 1000).toFixed(2)} mm (other hand ${(fits[1].err * 1000).toFixed(2)} mm)`);
console.log(`  mm per structure: ${F.per.join(' · ')}`);

const place = (positions) => {
  const out = new Float32Array(positions.length);
  for (let i = 0; i < positions.length; i += 3) {
    const p = [F.mirror ? -positions[i] : positions[i], positions[i + 1], positions[i + 2]];
    const q = move(F.T, p);
    out[i] = q[0]; out[i + 1] = q[1]; out[i + 2] = q[2];
  }
  return out;
};
// A mirror turns every triangle inside out unless its winding is reversed.
const flipWinding = (idx) => {
  const o = Uint32Array.from(idx);
  for (let t = 0; t < o.length; t += 3) { o[t + 1] = idx[t + 2]; o[t + 2] = idx[t + 1]; }
  return o;
};
const mirrorX = (p) => { const q = Float32Array.from(p); for (let i = 0; i < q.length; i += 3) q[i] = -q[i]; return q; };

// ------------------------------------------------------------------ the GLB
function boxOf(p) {
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], p[i + k]); hi[k] = Math.max(hi[k], p[i + k]); }
  return [lo, hi];
}
/** The same minimal GLB writer as carve-body.mjs: one node per structure. */
function glb(meshes) {
  const views = [], accessors = [], gmeshes = [], nodes = [], chunks = [];
  let at = 0;
  const put = (arr, target) => {
    const pad = (4 - (at % 4)) % 4;
    if (pad) { chunks.push(Buffer.alloc(pad)); at += pad; }
    const buf = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
    views.push({ buffer: 0, byteOffset: at, byteLength: buf.length, target });
    chunks.push(buf); at += buf.length;
    return views.length - 1;
  };
  for (const m of meshes) {
    const [lo, hi] = boxOf(m.positions);
    accessors.push({ bufferView: put(m.positions, 34962), componentType: 5126, count: m.positions.length / 3, type: 'VEC3', min: lo, max: hi });
    accessors.push({ bufferView: put(m.normals, 34962), componentType: 5126, count: m.normals.length / 3, type: 'VEC3' });
    accessors.push({ bufferView: put(m.indices, 34963), componentType: 5125, count: m.indices.length, type: 'SCALAR' });
    const a = accessors.length;
    gmeshes.push({ name: m.id, primitives: [{ attributes: { POSITION: a - 3, NORMAL: a - 2 }, indices: a - 1, material: 0 }] });
    nodes.push({ name: m.id, mesh: gmeshes.length - 1 });
  }
  const json = {
    asset: { version: '2.0', generator: 'MyPromo carve-oreille' },
    scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes: gmeshes,
    accessors, bufferViews: views, buffers: [{ byteLength: at }],
    materials: [{ name: 'tissue', pbrMetallicRoughness: { baseColorFactor: [0.9, 0.9, 0.9, 1], metallicFactor: 0, roughnessFactor: 0.6 } }],
  };
  let text = Buffer.from(JSON.stringify(json));
  if (text.length % 4) text = Buffer.concat([text, Buffer.alloc(4 - (text.length % 4), 0x20)]);
  const bin = Buffer.concat(chunks);
  const binPad = bin.length % 4 ? Buffer.alloc(4 - (bin.length % 4)) : Buffer.alloc(0);
  const head = Buffer.alloc(12);
  head.writeUInt32LE(0x46546c67, 0); head.writeUInt32LE(2, 4);
  head.writeUInt32LE(12 + 8 + text.length + 8 + bin.length + binPad.length, 8);
  const jh = Buffer.alloc(8); jh.writeUInt32LE(text.length, 0); jh.writeUInt32LE(0x4e4f534a, 4);
  const bh = Buffer.alloc(8); bh.writeUInt32LE(bin.length + binPad.length, 0); bh.writeUInt32LE(0x004e4942, 4);
  return Buffer.concat([head, jh, text, bh, bin, binPad]);
}

// ------------------------------------------------------------------ writing
const systems = new Map();
const add = (system, item) => {
  if (!systems.has(system)) systems.set(system, []);
  // The left ear as fitted, and its mirror on the right.
  systems.get(system).push({ ...item, s: 'l' });
  systems.get(system).push({ ...item, s: 'r', positions: mirrorX(item.positions), indices: flipWinding(item.indices) });
};
for (const [f, [system, k, n, b]] of Object.entries(PARTS)) {
  const src = spl.get(f);
  let positions = place(src.positions);
  // A mirrored fit has turned the triangles inside out.
  const indices = F.mirror ? flipWinding(src.indices) : src.indices;
  add(system, { n, k, b, positions, indices });
}

const index = JSON.parse(readFileSync(join(OUT, 'index.json'), 'utf8'));
for (const [system, items] of systems) {
  items.sort((a, b) => a.n.localeCompare(b.n, 'fr') || a.s.localeCompare(b.s));
  const meshes = [], manifest = [], described = {};
  items.forEach((item, i) => {
    const id = `${system.slice(0, 3)}${i}`;
    const normals = Float32Array.from(normalsOf(item.positions, item.indices), (v) => v / 32767);
    meshes.push({ id, positions: item.positions, normals, indices: item.indices });
    const c = centroid(item.positions).map((v) => Math.round(v * 1000) / 1000);
    manifest.push({ id, n: item.n, s: item.s, k: item.k, b: item.b, r: 'tete', c });
    const note = EAR_NOTES[item.n];
    if (!note) throw new Error(`no description for ${item.n}`);
    described[item.b] = { note: Object.fromEntries(Object.entries(note).map(([k, v]) => [k, typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : v])) };
  });
  writeFileSync(join(TMP, `${system}.raw.glb`), glb(meshes));
  // The bone is a scan surface, every air cell in it; it is told to reach the
  // ratio regardless of the bumps (-sa).
  const hard = system === 'rocher' ? ['-sa'] : [];
  execFileSync(process.execPath, [GLTFPACK, '-i', `${system}.raw.glb`, '-o', `${system}.glb`, '-cc', '-kn', '-si', String(RATIO[system]), ...hard],
    { stdio: 'inherit', cwd: TMP });
  renameSync(join(TMP, `${system}.glb`), join(OUT, `${system}.glb`));
  writeFileSync(join(OUT, `${system}.json`), JSON.stringify({ system, items: manifest }));
  writeFileSync(join(OUT, `${system}.defs.json`), JSON.stringify(described));
  const tris = items.reduce((n, it) => n + it.indices.length / 3, 0);
  index.layers[system] = { bytes: statSync(join(OUT, `${system}.glb`)).size, count: items.length, tris: Math.round(tris * RATIO[system]) };
  console.log(`${system.padEnd(8)} ${String(items.length).padStart(3)} structures  ${(statSync(join(OUT, `${system}.glb`)).size / 1e6).toFixed(2)} MB  ~${Math.round(tris * RATIO[system] / 1000)}k triangles`);
}
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index));

// The licence travels with the data (its condition b) and says what was
// changed (d): public/anatomy/body/LICENCE-oreille-SPL.txt, kept in the repo.
if (!existsSync(join(OUT, 'LICENCE-oreille-SPL.txt'))) throw new Error('LICENCE-oreille-SPL.txt must sit beside the files');
