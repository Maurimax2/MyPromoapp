// The whole body, one file per system, out of the Z-Anatomy FBX files.
//
//   node --max-old-space-size=8192 scripts/carve-body.mjs --z ../zanat
//   node --max-old-space-size=8192 scripts/carve-body.mjs --z ../zanat --only nerfs
//
// Needs, beside the repo:
//   ../zanat/Resources/Models/FBX/*.fbx   git clone LluisV/Z-Anatomy, or the
//                                          nine files from its Resources/Models/FBX
//   ../zanat/fr-defs/*-FR.txt             its Resources/Descriptions/French definitions
//
// Writes public/anatomy/body/<system>.glb (+ .json names, + .defs.json
// descriptions) and index.json (sizes, region boxes).
//
// Why a different format from the regional models: those are a few hundred
// thousand triangles each and ship raw. The body is about eight million once
// both sides exist, so every system is simplified (meshoptimizer, through
// gltfpack) and compressed (EXT_meshopt_compression), which three.js decodes
// with a decoder it already ships. A system costs a phone a few megabytes,
// and only once it is switched on.

import { writeFileSync, mkdirSync, readFileSync, readdirSync, existsSync, statSync, renameSync, copyFileSync, unlinkSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { meshesOf, normalsOf } from './fbx-meshes.mjs';
import { BUNDLES } from '../lib/anatomy/bundles.js';
import { NOTES } from '../lib/anatomy/notes.js';
import { NAMES, RULES, LEAVE_OUT } from '../lib/anatomy/body-names.js';
import { BODY_NOTES } from '../lib/anatomy/body-notes.js';
import { LAYERS } from '../lib/anatomy/body.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const HERE = dirname(fileURLToPath(import.meta.url));
const ZROOT = resolve(arg('z', '../zanat'));
const FBX = join(ZROOT, 'Resources/Models/FBX');
const DEFS = join(ZROOT, 'fr-defs');
const OUT = resolve(HERE, '../public/anatomy/body');
const TMP = join(os.tmpdir(), 'mypromo-body');
const GLTFPACK = resolve(HERE, '../node_modules/gltfpack/cli.js');
const only = arg('only', null);
const CM = 0.01;

// How much of each system is kept. A muscle is a big smooth surface and
// loses nothing at a seventh; a nerve is a thin tube and needs more of its
// rings to stay round; the skin is already coarse.
const RATIO = {
  peau: 0.6, fascias: 0.14, muscles: 0.14, arteres: 0.22, veines: 0.22, nerfs: 0.2,
  lymphe: 0.5, organes: 0.25, snc: 0.16, articulations: 0.3, squelette: 0.35,
  // The attachment areas are thin patches lying on the bone; their outline is
  // what matters, and a patch keeps its outline at a fifth of its triangles.
  insertions: 0.15,
};

const FILES = [
  'SkeletalSystem100', 'MuscularSystem100', 'NervousSystem100', 'CardioVascular41',
  'VisceralSystem100', 'LymphoidOrgans100', 'Joints100', 'Regions of human body100',
];

for (const need of [FBX, DEFS]) {
  if (!existsSync(need)) {
    console.error(`Missing ${need}\n\nSee the header of this script for what goes where.`);
    process.exit(1);
  }
}

// ------------------------------------------------------------------ names

const base = (n) => n.replace(/\.+$/, '').trim();
const plainKey = (n) => n.replace(/^\((.*)\)$/, '$1').trim();

// The regional models' names: checked against a lecture, so they win.
const fromBundles = new Map();
for (const b of BUNDLES) {
  if (b.source !== 'zanatomy') continue;
  for (const f of b.files || []) {
    for (const [src, fr] of Object.entries(f.parts || {})) {
      if (typeof fr !== 'string') continue;
      const key = base(src.replace(/\.[lr]$/, ''));
      if (!fromBundles.has(key)) fromBundles.set(key, fr.replace(/\s+(gauche|droite?)$/i, ''));
    }
  }
}

// Z-Anatomy's French definitions: a title, then paragraphs, then a link.
const ACCENTS = [
  [/\barteres?\b/g, (m) => m.replace('artere', 'artère')], [/\bsuperieur/g, 'supérieur'],
  [/\binferieur/g, 'inférieur'], [/\banterieur/g, 'antérieur'], [/\bposterieur/g, 'postérieur'],
  [/\blateral/g, 'latéral'], [/\bmedian/g, 'médian'], [/\bmembrane interosseuse/g, 'membrane interosseuse'],
];
function sentence(title) {
  let s = plainKey(title).toLowerCase();
  for (const [re, to] of ACCENTS) s = s.replace(re, to);
  s = s.replace(/\(([ivx]+)\)/g, (_, r) => `(${r.toUpperCase()})`)
    .replace(/\b([ctls])(\d{1,2})\b/g, (_, l, n) => `${l.toUpperCase()}${n}`)
    .replace(/’/g, '’');
  return s.charAt(0).toUpperCase() + s.slice(1);
}
const defs = new Map();
for (const f of readdirSync(DEFS)) {
  const lines = readFileSync(join(DEFS, f), 'utf8').split(/\r?\n/).map((l) => l.trim());
  const solid = lines.filter(Boolean);
  if (!solid.length) continue;
  const link = solid.find((l) => /^https?:\/\//.test(l)) || null;
  const body = solid.slice(1).filter((l) => l !== link).join('\n').replace(/\n-\s*/g, '\n• ');
  defs.set(plainKey(f.replace(/-FR\.txt$/, '')), { title: sentence(solid[0]), text: body, link });
}

function french(name) {
  const k = base(name);
  const keys = [k, plainKey(k), `${k}.`];
  for (const key of keys) if (fromBundles.has(key)) return fromBundles.get(key);
  for (const key of keys) if (NAMES[key]) return NAMES[key];
  for (const [re, make] of RULES) { const m = k.match(re); if (m) return make(m); }
  for (const key of keys) if (defs.has(key)) return defs.get(key).title;
  return null;
}

// The written descriptions of the regional models, by French name.
const notes = new Map();
for (const book of Object.values(NOTES)) {
  for (const [name, note] of Object.entries(book)) if (!notes.has(name)) notes.set(name, note);
}
const flat = (t) => (typeof t === 'string' ? t.replace(/\s+/g, ' ').trim() : t);

// ---------------------------------------------------------------- systems

const FASCIA = /fascia|retinaculum|septum|bursa|bursae|sheath|Palmar aponeurosis|Plantar aponeurosis|transverse meta(carpal|tarsal) ligament|Dorsal fascia/i;
const SENSE = /eyeball|^Retina$|^Sclera$|^Cornea$|^Iris$|^Lens$|Vitreous|Zonular|chamber of eyeball|acrimal|Tympanic|^Cochlea$|^Vestibule$|Auditory tube|Semicircular|^Choroid$|Ciliary body|Nasolacrimal/i;
const NERVE = /nerve|plexus|ganglion|ganglia|Sympathetic|Cauda equina|root of spinal|Roots of brachial|trunk of brachial|cord of brachial|division of .*trunk|Chorda tympani|Ansa |branch/i;

function systemOf(file, name) {
  switch (file) {
    case 'SkeletalSystem100': return 'squelette';
    case 'MuscularSystem100': return FASCIA.test(name) ? 'fascias' : 'muscles';
    case 'NervousSystem100':
      if (SENSE.test(name)) return 'organes';
      if (NERVE.test(name) && !/Choroid plexus|nucleus|tract$/i.test(name)) return 'nerfs';
      return 'snc';
    case 'CardioVascular41':
      if (/vein|venous|vena|sinus|azygos|plexus/i.test(name)) return 'veines';
      if (/arter|aort|trunk|arch|anastomosis|circle|branch|segment|\(M\d/i.test(name)) return 'arteres';
      return 'organes';
    case 'VisceralSystem100': return 'organes';
    case 'LymphoidOrgans100': return 'lymphe';
    case 'Joints100': return 'articulations';
    default: return 'peau';
  }
}

function tissueOf(system, n) {
  switch (system) {
    case 'squelette':
      if (/incisor|canine|molar|premolar/i.test(n)) return 'tooth';
      return /cartilage/i.test(n) ? 'cartilage' : 'bone';
    case 'muscles':
      return /tendon|aponeurosis|tract|tendinous ring|tarsus|Trochlea|raphe|ligament/i.test(n) ? 'tendon' : 'muscle';
    case 'fascias': return /bursa|sheath/i.test(n) ? 'bursa' : 'fascia';
    case 'nerfs': return 'nerve';
    case 'snc':
      if (/ventricle|aqueduct|Central canal|cistern|Choroid plexus/i.test(n)) return 'csf';
      if (/dura|mater|arachnoid|falx|tentorium/i.test(n)) return 'fascia';
      if (/nucle|horn|thalam|putamen|caudate|globus|claustrum|amygdal|nigra|olive|geniculate|hippocamp|pallid|striat/i.test(n)) return 'grey';
      return 'brain';
    case 'arteres': return 'artery';
    case 'veines': return /sinus/i.test(n) && !/coronary sinus/i.test(n) ? 'sinus' : 'vein';
    case 'lymphe': return /spleen/i.test(n) ? 'spleen' : /thymus/i.test(n) ? 'gland' : 'lymph';
    case 'articulations':
      if (/disc|pulposus|symphysis/i.test(n)) return 'disc';
      if (/menisc|labrum|cartilage/i.test(n)) return 'cartilage';
      return 'ligament';
    case 'peau':
      if (/hair|eyelash/i.test(n)) return 'hair';
      if (/nail|perionyx/i.test(n)) return 'nail';
      return 'skin';
    default: // organes
      if (/eyeball|retina|sclera|cornea|^iris|^lens|vitreous|zonular|chamber/i.test(n)) return 'eye';
      if (/lacrimal|gland|thyroid|parathyroid|hypophys|pineal|suprarenal|pancrea|parotid/i.test(n)) return 'gland';
      if (/renal pelvis|ureter|bladder|urethra/i.test(n)) return 'urine';
      if (/kidney|renal/i.test(n)) return 'kidney';
      if (/testis|epididym|prostate|seminal|deferens|ejaculatory/i.test(n)) return 'gonad';
      if (/penis|cavernos|spongios|glans/i.test(n)) return 'erectile';
      if (/lung|pleura/i.test(n)) return 'lung';
      if (/bronch|trachea|epiglott|larynx|cartilage/i.test(n)) return 'cartilage';
      if (/atri|ventric|valve|leaflet|papillary|chordae|cusp|heart|cardiac|myocard|pericard|auricle|septum/i.test(n)) return 'heart';
      if (/liver|gallbladder|bile|hepat|cystic/i.test(n)) return 'liver';
      if (/tongue/i.test(n)) return 'muscle';
      if (/palate|uvula|gingiva|mucosa|tympanic|cochlea|vestibule|auditory/i.test(n)) return 'mucosa';
      return 'gut';
  }
}

// ------------------------------------------------------------------- geometry

function mirror(positions, indices) {
  const p = new Float32Array(positions.length);
  for (let i = 0; i < positions.length; i += 3) {
    p[i] = -positions[i]; p[i + 1] = positions[i + 1]; p[i + 2] = positions[i + 2];
  }
  const idx = new Uint32Array(indices.length);
  for (let t = 0; t < indices.length; t += 3) {
    idx[t] = indices[t]; idx[t + 1] = indices[t + 2]; idx[t + 2] = indices[t + 1];
  }
  return { positions: p, indices: idx };
}

function boxOf(p) {
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) {
    for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], p[i + k]); hi[k] = Math.max(hi[k], p[i + k]); }
  }
  return [lo, hi];
}

/** A minimal glTF 2.0 binary: one node and one mesh per structure. */
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
    asset: { version: '2.0', generator: 'MyPromo carve-body' },
    scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes: gmeshes,
    accessors, bufferViews: views, buffers: [{ byteLength: at }],
    materials: [{ name: 'tissue', pbrMetallicRoughness: { baseColorFactor: [0.9, 0.9, 0.9, 1], metallicFactor: 0, roughnessFactor: 0.6 } }],
  };
  let text = Buffer.from(JSON.stringify(json));
  if (text.length % 4) text = Buffer.concat([text, Buffer.alloc(4 - (text.length % 4), 0x20)]);
  const bin = Buffer.concat(chunks);
  const binPad = bin.length % 4 ? Buffer.alloc(4 - (bin.length % 4)) : Buffer.alloc(0);
  const head = Buffer.alloc(12);
  const total = 12 + 8 + text.length + 8 + bin.length + binPad.length;
  head.writeUInt32LE(0x46546c67, 0); head.writeUInt32LE(2, 4); head.writeUInt32LE(total, 8);
  const jh = Buffer.alloc(8); jh.writeUInt32LE(text.length, 0); jh.writeUInt32LE(0x4e4f534a, 4);
  const bh = Buffer.alloc(8); bh.writeUInt32LE(bin.length + binPad.length, 0); bh.writeUInt32LE(0x004e4942, 4);
  return Buffer.concat([head, jh, text, bh, bin, binPad]);
}

// ----------------------------------------------------------------- carving

mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

const systems = new Map(LAYERS.map((l) => [l.id, []]));
const missing = new Map();
let skipped = 0;
// Where each muscle holds on to a bone. Z-Anatomy draws these as patches on
// the bone's surface, in the skeleton's own file, named after the muscle:
// «Masseter.or» is the masseter's origin on the right, «.e1l» the first
// piece of its insertion on the left. They are what «les insertions» means
// in an exam question, so they are a system of their own.
const attachments = [];
const bones = [];

for (const file of FILES) {
  const all = meshesOf(join(FBX, `${file}.fbx`));
  // Which bases exist on which side, to know what has to be mirrored.
  const sides = new Map();
  for (const name of all.keys()) {
    const m = name.match(/^(.*?)\.([lr])$/);
    const b = base(m ? m[1] : name);
    if (!sides.has(b)) sides.set(b, new Set());
    sides.get(b).add(m ? m[2] : '-');
  }

  for (const [name, mesh] of all) {
    if (mesh.indices.length / 3 <= 12) continue;                  // a label's anchor
    if (/\.(j|i)\d*$/.test(name)) continue;
    const att = name.match(/^(.*?)\.(o|e)(\d*)([lr])$/);
    if (att) {
      if (file === 'SkeletalSystem100' && (!only || only === 'insertions')) {
        attachments.push({ b: base(att[1]), kind: att[2], part: att[3], side: att[4], mesh });
      }
      continue;
    }
    const m = name.match(/^(.*?)\.([lr])$/);
    const b = base(m ? m[1] : name);
    const side = m ? m[2] : null;
    if (LEAVE_OUT.some((re) => re.test(b))) { skipped++; continue; }
    const system = systemOf(file, b);
    // The bones are always read: the other systems are placed against them.
    if (only && system !== only && system !== 'squelette') continue;
    const fr = french(b);
    if (!fr) { missing.set(b, file); continue; }

    const metres = new Float32Array(mesh.positions.length);
    for (let i = 0; i < metres.length; i++) metres[i] = mesh.positions[i] * CM;
    if (system === 'squelette') {
      bones.push({ b, n: fr, positions: metres });
      if (side && !sides.get(b).has(side === 'l' ? 'r' : 'l')) bones.push({ b, n: fr, positions: mirror(metres, mesh.indices).positions });
      if (only && only !== 'squelette') continue;
    }
    const list = [[side, { positions: metres, indices: mesh.indices }]];
    // A one-sided structure gets its other side, flipped.
    if (side && !sides.get(b).has(side === 'l' ? 'r' : 'l')) {
      list.push([side === 'l' ? 'r' : 'l', mirror(metres, mesh.indices)]);
    }
    for (const [s, g] of list) {
      systems.get(system).push({ b, n: fr, s, k: tissueOf(system, b), ...g });
    }
  }
  console.log(`${file.padEnd(26)} read`);
}

// The attachments, named after their muscle: «Masséter — origine».
const ATTACH = { o: 'origine', e: 'terminaison' };
if (systems.has('insertions') && (!only || only === 'insertions')) {
  const have = new Set(attachments.map((a) => `${a.b}|${a.kind}|${a.part}|${a.side}`));
  for (const a of attachments) {
    if (LEAVE_OUT.some((re) => re.test(a.b))) { skipped++; continue; }
    const fr = french(a.b);
    if (!fr) { missing.set(a.b, 'attachments'); continue; }
    const metres = new Float32Array(a.mesh.positions.length);
    for (let i = 0; i < metres.length; i++) metres[i] = a.mesh.positions[i] * CM;
    const list = [[a.side, { positions: metres, indices: a.mesh.indices }]];
    const other = a.side === 'l' ? 'r' : 'l';
    if (!have.has(`${a.b}|${a.kind}|${a.part}|${other}`)) list.push([other, mirror(metres, a.mesh.indices)]);
    for (const [s, g] of list) {
      systems.get('insertions').push({
        b: a.b, n: `${fr} — ${ATTACH[a.kind]}`, s, k: a.kind === 'o' ? 'origin' : 'insertion', m: fr, ...g,
      });
    }
  }
}

if (missing.size) {
  console.error(`\n${missing.size} structures have no French name — add them to lib/anatomy/body-names.js:`);
  for (const [b, f] of missing) console.error(`  ${f}: ${b}`);
  process.exit(1);
}
console.log(`left out on purpose: ${skipped}`);

// Region boxes, measured on the skeleton.
const REGION_BONES = {
  tete: /^(Frontal|Parietal|Occipital|Temporal|Sphenoid|Zygomatic) bone$|^Mandible$|^Maxilla$/,
  cou: /^Vertebra C[3-7]$|^Atlas|^Axis|^Hyoid bone$|^Thyroid cartilage$/,
  thorax: /rib$|sternum|^Xiphoid|^Vertebra T\d+$/,
  abdomen: /^Vertebra L\d$|^(Tenth|Eleventh|Twelfth) rib$/,
  bassin: /^Hip bone$|^Sacrum$|^Coccyx$/,
  'membre-sup': /^(Scapula|Clavicle|Humerus|Radius|Ulna)$|metacarpal|of hand$|^(Capitate|Hamate|Lunate|Pisiform|Scaphoid|Trapezium|Trapezoid|Triquetrum) bone$/,
  'membre-inf': /^(Femur|Patella|Tibia|Fibula|Talus|Calcaneus)$|metatarsal|of foot$|cuneiform|Navicular|Cuboid/,
};
const regions = {};
let everything = null;
const grow = (box, b) => (box
  ? [box[0].map((v, k) => Math.min(v, b[0][k])), box[1].map((v, k) => Math.max(v, b[1][k]))]
  : [b[0].slice(), b[1].slice()]);
const skeleton = only && only !== 'squelette' ? null : systems.get('squelette');
if (skeleton) {
  for (const item of skeleton) {
    const box = boxOf(item.positions);
    everything = grow(everything, box);
    for (const [region, re] of Object.entries(REGION_BONES)) {
      // A limb is framed on one side, the way a plate draws it.
      if ((region === 'membre-sup' || region === 'membre-inf') && item.s === 'r') continue;
      if (re.test(item.b)) regions[region] = grow(regions[region], box);
    }
  }
  regions.corps = everything;
  // The abdomen is as wide as the lower ribs, not as the lumbar vertebrae.
  if (regions.abdomen && regions.thorax) {
    regions.abdomen[0][0] = regions.thorax[0][0]; regions.abdomen[1][0] = regions.thorax[1][0];
    regions.abdomen[0][2] = regions.thorax[0][2] - 0.04; regions.abdomen[1][2] = regions.thorax[1][2] + 0.04;
  }
  for (const k of Object.keys(regions)) regions[k] = regions[k].map((v) => v.map((x) => Math.round(x * 1000) / 1000));
}

// For what holds on to no bone — the viscera, the brain, the vessels. The
// trunk is asked first: an arm's box, hanging, covers half the trunk, and the
// liver came out as part of the upper limb. The thorax stops at the dome of
// the diaphragm, not at the lowest rib, or the liver and the stomach are
// thoracic.
const DOME = 1.21;
const regionOf = (box) => {
  const c = [0, 1, 2].map((k) => (box[0][k] + box[1][k]) / 2);
  const inside = (r) => r && c.every((v, k) => v >= r[0][k] - 0.01 && v <= r[1][k] + 0.01);
  const trunk = {
    ...regions,
    thorax: regions.thorax && [[regions.thorax[0][0], DOME, regions.thorax[0][2]], regions.thorax[1]],
    abdomen: regions.abdomen && [regions.abdomen[0], [regions.abdomen[1][0], DOME, regions.abdomen[1][2]]],
  };
  for (const id of ['tete', 'cou', 'thorax', 'abdomen', 'bassin', 'membre-sup', 'membre-inf']) {
    const r = trunk[id];
    if (!r) continue;
    // A limb box is one side; the other side's structure belongs there too.
    const mirrored = [[-r[1][0], r[0][1], r[0][2]], [-r[0][0], r[1][1], r[1][2]]];
    if (inside(r) || ((id === 'membre-sup' || id === 'membre-inf') && inside(mirrored))) return id;
  }
  return null;
};

// Which bone a structure lies against. A box per region put the hip's
// ligaments in the upper limb — a hanging arm reaches below the hip joint —
// so what holds on to a bone takes the region of the bone it holds on to.
const boneRegion = (b) => {
  for (const [region, re] of Object.entries(REGION_BONES)) if (re.test(b)) return region;
  return null;
};
const boneIndex = bones.map((x) => {
  const step = Math.max(1, Math.floor(x.positions.length / 3 / 800));
  const pts = [];
  for (let i = 0; i < x.positions.length; i += 3 * step) pts.push(x.positions[i], x.positions[i + 1], x.positions[i + 2]);
  return { n: x.n, box: boxOf(x.positions), pts, region: boneRegion(x.b) };
});
const centroid = (p) => {
  const c = [0, 0, 0];
  for (let i = 0; i < p.length; i += 3) { c[0] += p[i]; c[1] += p[i + 1]; c[2] += p[i + 2]; }
  return c.map((v) => v / (p.length / 3));
};
function nearestBone(positions, reach) {
  const c = centroid(positions);
  let best = null, bestD = reach * reach;
  for (const bn of boneIndex) {
    const [lo, hi] = bn.box;
    if (c.some((v, k) => v < lo[k] - reach || v > hi[k] + reach)) continue;
    for (let i = 0; i < bn.pts.length; i += 3) {
      const d = (bn.pts[i] - c[0]) ** 2 + (bn.pts[i + 1] - c[1]) ** 2 + (bn.pts[i + 2] - c[2]) ** 2;
      if (d < bestD) { bestD = d; best = bn; }
    }
  }
  return best;
}
const ON_BONE = { insertions: 0.03, articulations: 0.04, muscles: 0.06, fascias: 0.06 };

const index = existsSync(join(OUT, 'index.json')) ? JSON.parse(readFileSync(join(OUT, 'index.json'), 'utf8')) : { layers: {} };
if (skeleton) index.regions = regions;
Object.assign(regions, index.regions || {});

for (const [system, items] of systems) {
  if (!items.length) continue;
  items.sort((a, b) => a.n.localeCompare(b.n, 'fr'));
  const meshes = [];
  const manifest = [];
  const described = {};
  items.forEach((item, i) => {
    const id = `${system.slice(0, 3)}${i}`;
    // normalsOf packs them into 16 bits for the regional models; glTF wants
    // floats unless told otherwise, and gltfpack quantizes them itself.
    const normals = Float32Array.from(normalsOf(item.positions, item.indices), (v) => v / 32767);
    meshes.push({ id, positions: item.positions, normals, indices: item.indices });
    let r = null, on = null;
    if (system === 'squelette') r = boneRegion(item.b);
    else if (ON_BONE[system]) {
      const bn = nearestBone(item.positions, ON_BONE[system]);
      if (bn) { r = bn.region; on = bn.n; }
    }
    r = r || regionOf(boxOf(item.positions));
    // Where it is, to the millimetre: a lesson keeps what lies in its part of
    // the body, and can tell before a single file of geometry has arrived.
    const c = centroid(item.positions).map((v) => Math.round(v * 1000) / 1000);
    manifest.push({
      id, n: item.n, s: item.s, k: item.k, b: item.b, ...(r ? { r } : {}), c,
      // An attachment says whose it is and which bone it is on.
      ...(item.m ? { m: item.m } : {}), ...(system === 'insertions' && on ? { o: on } : {}),
    });

    if (!described[item.b]) {
      const note = notes.get(item.n) || BODY_NOTES[item.n] || (item.m && (notes.get(item.m) || BODY_NOTES[item.m]));
      const def = defs.get(plainKey(item.b));
      if (note || def) {
        described[item.b] = {
          ...(note ? { note: Object.fromEntries(Object.entries(note).map(([k, v]) => [k, flat(v)])) } : {}),
          ...(def && def.text ? { text: def.text, link: def.link } : {}),
        };
      }
    }
  });

  const raw = join(TMP, `${system}.raw.glb`);
  writeFileSync(raw, glb(meshes));
  const out = join(OUT, `${system}.glb`);
  // gltfpack's file layer does not understand a Windows drive letter, so it is
  // run from inside the folder with bare names, and its output moved after.
  execFileSync(process.execPath, [GLTFPACK, '-i', `${system}.raw.glb`, '-o', `${system}.glb`, '-cc', '-kn', '-si', String(RATIO[system])],
    { stdio: 'inherit', cwd: TMP });
  renameSync(join(TMP, `${system}.glb`), out);

  writeFileSync(join(OUT, `${system}.json`), JSON.stringify({ system, items: manifest }));
  writeFileSync(join(OUT, `${system}.defs.json`), JSON.stringify(described));
  const tris = items.reduce((n, it) => n + it.indices.length / 3, 0);
  index.layers[system] = {
    bytes: statSync(out).size, count: items.length,
    tris: Math.round(tris * RATIO[system]),
  };
  console.log(`${system.padEnd(14)} ${String(items.length).padStart(5)} structures  ${(statSync(out).size / 1e6).toFixed(1).padStart(5)} MB  ~${Math.round(tris * RATIO[system] / 1000)}k triangles`);
}

writeFileSync(join(OUT, 'index.json'), JSON.stringify(index));
