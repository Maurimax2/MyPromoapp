// The named points of the whole skeleton, from Z-Anatomy's labels.
//
//   node --max-old-space-size=8192 scripts/carve-landmarks.mjs --z ../zanat
//
// Z-Anatomy names the features of its bones — tubercles, processes, foramina,
// lines, fossae — with short leader lines: one end on the feature, the other
// where the label is printed. That end on the bone is the landmark. It is
// found as the end nearer the skeleton's surface, then snapped onto it; a
// line whose nearer end is more than 2 cm from any bone is not a landmark
// and is dropped. A paired bone gets the point on both sides.
//
// Names in French and what passes through each opening come from
// lib/anatomy/landmark-names.js. Writes public/anatomy/body/reperes.json,
// read by the body viewer when a bone's «المعالم» are asked for.
// Run after scripts/carve-body.mjs (the bones' French names come from its
// squelette.json).

import { writeFileSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { meshesOf, normalsOf } from './fbx-meshes.mjs';
import { LANDMARK_NAMES, LANDMARK_SKIP, LANDMARK_THROUGH } from '../lib/anatomy/landmark-names.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const HERE = dirname(fileURLToPath(import.meta.url));
const FBX = join(resolve(arg('z', '../zanat')), 'Resources/Models/FBX');
const OUT = resolve(HERE, '../public/anatomy/body');
const CM = 0.01;

const skeleton = JSON.parse(readFileSync(join(OUT, 'squelette.json'), 'utf8'));
const frenchOf = new Map(skeleton.items.map((i) => [i.b, i.n]));
const all = meshesOf(join(FBX, 'SkeletalSystem100.fbx'));

// ---------------------------------------------------------------- the bones
const base = (n) => n.replace(/\.+$/, '').trim();
const bones = [];
const sides = new Map();
for (const name of all.keys()) {
  const m = name.match(/^(.*?)\.([lr])$/);
  const b = base(m ? m[1] : name);
  if (!sides.has(b)) sides.set(b, new Set());
  sides.get(b).add(m ? m[2] : '-');
}
for (const [name, mesh] of all) {
  if (/\.(i|j)$/.test(name) || /\.(o|e)\d*[lr]$/.test(name)) continue;
  const m = name.match(/^(.*?)\.([lr])$/);
  const b = base(m ? m[1] : name);
  const n = frenchOf.get(b);
  if (!n) continue;
  const p = Float32Array.from(mesh.positions, (v) => v * CM);
  const nm = normalsOf(mesh.positions, mesh.indices);
  const side = m ? m[2] : null;
  bones.push({ n, side, p, nm });
  if (side && !sides.get(b).has(side === 'l' ? 'r' : 'l')) {
    const q = Float32Array.from(p); for (let i = 0; i < q.length; i += 3) q[i] = -q[i];
    const qn = Float32Array.from(nm); for (let i = 0; i < qn.length; i += 3) qn[i] = -qn[i];
    bones.push({ n, side: side === 'l' ? 'r' : 'l', p: q, nm: qn });
  }
}
console.log(`${bones.length} bones`);

// A grid of every bone vertex, 1 cm cells, for the nearest point.
const CELL = 0.01;
const grid = new Map();
const key = (x, y, z) => `${Math.floor(x / CELL)},${Math.floor(y / CELL)},${Math.floor(z / CELL)}`;
bones.forEach((bone, bi) => {
  for (let i = 0; i < bone.p.length; i += 3) {
    const k = key(bone.p[i], bone.p[i + 1], bone.p[i + 2]);
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(bi, i);
  }
});
// An opening lies between bones; its point belongs to the bone named.
const BONE_OF = {
  'Foramen magnum': 'Os occipital', 'Hypoglossal canal': 'Os occipital', '(Condylar canal)': 'Os occipital', 'Occipital condyle': 'Os occipital',
  'Foramen ovale': 'Os sphénoïde', 'Foramen rotundum': 'Os sphénoïde', 'Foramen spinosum': 'Os sphénoïde', 'Optic canal': 'Os sphénoïde',
  'Pterygoid canal': 'Os sphénoïde', 'Mental foramen': 'Mandibule', 'Intervertebral foramen': null, 'Vertebral foramen': null,
  // A joint's two faces touch: nearest-bone put the head of the radius on
  // the ulna and the acetabular notch on the femur.
  'Acetabular notch': 'Os coxal', 'Opening of frontal sinus': 'Os frontal',
};
// …and a name that says whose it is, «of femur», «of frontal bone», is believed.
const OWNER = [
  [/\bof (?:the )?(?:head of )?femur\b/i, 'Fémur'], [/\bof (?:the )?(?:head of )?tibia\b/i, 'Tibia'], [/\bof (?:the )?(?:head of )?fibula\b/i, 'Fibula'],
  [/\bof (?:the )?(?:head of )?humerus\b/i, 'Humérus'], [/\bof (?:the )?(?:head of )?radius\b/i, 'Radius'], [/\bof (?:the )?(?:head of )?ulna\b/i, 'Ulna'],
  [/\bof (?:the )?sacrum\b/i, 'Sacrum'], [/\bof (?:the )?(?:ilium|ischium|pubis)\b/i, 'Os coxal'], [/\bof (?:the )?frontal bone\b/i, 'Os frontal'],
  [/\bof (?:the )?parietal bone\b/i, 'Os pariétal'], [/\bof (?:the )?temporal bone\b/i, 'Os temporal'], [/\bof (?:the )?occipital bone\b/i, 'Os occipital'],
  [/\bof (?:the )?scapula\b/i, 'Scapula'], [/\bof (?:the )?clavicle\b/i, 'Clavicule'], [/\bof (?:the )?talus\b/i, 'Talus'], [/\bof (?:the )?calcaneus\b/i, 'Calcanéus'],
];
const known = new Set(skeleton.items.map((i) => i.n));
const ownerOf = (en) => {
  if (en in BONE_OF) return BONE_OF[en];
  const hit = OWNER.find(([re]) => re.test(en));
  return hit && known.has(hit[1]) ? hit[1] : null;
};
function nearest(x, y, z, reach = 2, only = null) {
  const cx = Math.floor(x / CELL), cy = Math.floor(y / CELL), cz = Math.floor(z / CELL);
  let best = null, bd = Infinity;
  for (let i = -reach; i <= reach; i++) for (let j = -reach; j <= reach; j++) for (let k = -reach; k <= reach; k++) {
    const list = grid.get(`${cx + i},${cy + j},${cz + k}`);
    if (!list) continue;
    for (let t = 0; t < list.length; t += 2) {
      const bone = bones[list[t]], at = list[t + 1];
      if (only && bone.n !== only) continue;
      const d = (bone.p[at] - x) ** 2 + (bone.p[at + 1] - y) ** 2 + (bone.p[at + 2] - z) ** 2;
      if (d < bd) { bd = d; best = { bone, at }; }
    }
  }
  return best ? { ...best, d: Math.sqrt(bd), p: [best.bone.p[best.at], best.bone.p[best.at + 1], best.bone.p[best.at + 2]] } : null;
}

// --------------------------------------------------------------- the labels
const items = [];
const seen = new Set();
let dropped = 0;
for (const [name, mesh] of all) {
  if (!/\.(i|j)$/.test(name) || mesh.positions.length / 3 > 400) continue;
  const en = name.replace(/\.(i|j)$/, '');
  if (LANDMARK_SKIP.has(en) || !LANDMARK_NAMES[en]) continue;
  const p = Float32Array.from(mesh.positions, (v) => v * CM);
  // The two ends of the leader: the farthest pair of its vertices.
  let a = 0, b = 0, far = -1;
  for (let i = 0; i < p.length; i += 3) for (let j = i + 3; j < p.length; j += 3) {
    const d = (p[i] - p[j]) ** 2 + (p[i + 1] - p[j + 1]) ** 2 + (p[i + 2] - p[j + 2]) ** 2;
    if (d > far) { far = d; a = i; b = j; }
  }
  const ends = [[p[a], p[a + 1], p[a + 2]], [p[b], p[b + 1], p[b + 2]]];
  const hits = ends.map((e) => nearest(...e, 2, ownerOf(en)));
  const pick = hits[0] && (!hits[1] || hits[0].d <= hits[1].d) ? 0 : 1;
  const hit = hits[pick];
  if (!hit || hit.d > 0.02) { dropped++; continue; }
  const other = ends[1 - pick];
  const out = other.map((v, k) => v - hit.p[k]);
  const len = Math.hypot(...out) || 1;
  // A single midline bone's paired feature says its own side (`h`): the
  // sphenoid has two foramina ovalia and the list must tell them apart.
  // +x is the body's left.
  const handOf = (h) => (!h.bone.side && Math.abs(h.p[0]) > 0.006 ? (h.p[0] > 0 ? 'l' : 'r') : null);
  // The way the feature faces: the bone's own surface around the point,
  // averaged over 3 mm — the leader line only says where the label was
  // printed. A plate thinner than that (the greater wing) averages to
  // nothing, and then the one vertex is believed.
  const facing = (h, fallback) => {
    const out = [0, 0, 0];
    const R = 0.003;
    let count = 0;
    const cx = Math.floor(h.p[0] / CELL), cy = Math.floor(h.p[1] / CELL), cz = Math.floor(h.p[2] / CELL);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) {
      const list = grid.get(`${cx + i},${cy + j},${cz + k}`);
      if (!list) continue;
      for (let t = 0; t < list.length; t += 2) {
        const bone = bones[list[t]], at = list[t + 1];
        if (bone !== h.bone) continue;
        if ((bone.p[at] - h.p[0]) ** 2 + (bone.p[at + 1] - h.p[1]) ** 2 + (bone.p[at + 2] - h.p[2]) ** 2 > R * R) continue;
        out[0] += bone.nm[at]; out[1] += bone.nm[at + 1]; out[2] += bone.nm[at + 2];
        count += 32767;
      }
    }
    let len = Math.hypot(...out);
    if (len < 0.35 * count) { out[0] = h.bone.nm[h.at]; out[1] = h.bone.nm[h.at + 1]; out[2] = h.bone.nm[h.at + 2]; len = Math.hypot(...out); }
    return len > 1e-6 ? out.map((v) => v / len) : fallback;
  };
  const place = (h, o) => ({
    n: LANDMARK_NAMES[en], en, bone: h.bone.n, s: h.bone.side, ...(handOf(h) ? { h: handOf(h) } : {}), d: h.d,
    p: h.p.map((v) => Math.round(v * 10000) / 10000), o: facing(h, o.map((v) => v / len)).map((v) => Math.round(v * 1000) / 1000),
    ...(LANDMARK_THROUGH[en] ? { t: LANDMARK_THROUGH[en] } : {}),
  });
  const keyOf = (it) => `${it.en}|${it.bone}|${it.s}|${it.p.map((v) => Math.round(v * 200)).join(',')}`;
  const here = place(hit, out);
  if (!seen.has(keyOf(here))) { seen.add(keyOf(here)); items.push(here); }
  // The other side: of a paired bone, or of a single midline bone whose
  // feature is not on the midline (the foramen ovale of the sphenoid).
  if (hit.bone.side || Math.abs(ends[pick][0]) > 0.008) {
    const m = nearest(-hit.p[0], hit.p[1], hit.p[2], 2, hit.bone.n);
    if (m && m.d < 0.01 && (hit.bone.side ? m.bone.side !== hit.bone.side : true)) {
      const there = place(m, [-out[0], out[1], out[2]]);
      if (!seen.has(keyOf(there))) { seen.add(keyOf(there)); items.push(there); }
    }
  }
}
// Z-Anatomy labels some features twice (the olecranon from the front and
// from behind): one point per name, side and bone — the one that sat closest
// to the bone.
const best = new Map();
for (const it of items) {
  const k = `${it.en}|${it.bone}|${it.s || it.h || ''}`;
  if (!best.has(k) || it.d < best.get(k).d) best.set(k, it);
}
const twice = items.length - best.size;
items.length = 0;
for (const it of best.values()) { delete it.d; items.push(it); }
// A midline bone's point off the midline is a side only if the other side is
// there too: the foramen magnum's rim is a centimetre off centre and is not
// «côté gauche».
for (const it of items) {
  if (it.h && !best.has(`${it.en}|${it.bone}|${it.h === 'l' ? 'r' : 'l'}`)) delete it.h;
}
items.sort((x, y) => x.bone.localeCompare(y.bone, 'fr') || x.n.localeCompare(y.n, 'fr'));
items.forEach((it, i) => { it.id = `rep${i}`; });
writeFileSync(join(OUT, 'reperes.json'), JSON.stringify({ items }));
const perBone = new Map(); for (const it of items) perBone.set(it.bone, (perBone.get(it.bone) || 0) + 1);
console.log(`${items.length} landmarks on ${perBone.size} bones (${dropped} labels too far from any bone, ${twice} labelled twice)`);
console.log([...perBone].sort((x, y) => y[1] - x[1]).slice(0, 15).map(([b, n]) => `${b} ${n}`).join(' · '));
