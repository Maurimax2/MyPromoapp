// The thorax from a CT, by the anatomy laboratory of Nouakchott.
//
//   node --max-old-space-size=8192 scripts/carve-nouakchott.mjs --spl ../spl
//
// The Mauritanian Anatomy Laboratory Thoracic Atlas — Haythem Guermazi,
// Ahmedou Moulaye Idriss and Tfeil Yahya, Faculty of Medicine of the
// University of Nouakchott Al Aasriya, with the National Cardiovascular
// Centre (3D Slicer licence, part B) — is one CT of a 38-year-old man,
// segmented in 3D Slicer: the five lobes, the airways down to the segmental
// bronchi, the heart and its coronary arteries, the great vessels, the
// oesophagus, the thoracic skeleton. Made by the students' own faculty.
//
// Its zip is gone from the site, but the viewer's files are still served:
// fetch atlasStructure.json and models/*.vtk from
// https://www.openanatomy.org/atlases/macbioidi/mauritania/thorax-2020-11-15/
// into ../spl/thorax (the GeometrySelector of each structure names its file).
//
// A clinical CT is in the scanner's patient axes (RAS, millimetres), so it
// needs no fitting: it is turned into the body's axes (x to the left, y up,
// z forward, metres) and drawn as its own body, a set like the female pelvis
// — one person's thorax, consistent with itself.

import { writeFileSync, readFileSync, existsSync, statSync, renameSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { normalsOf } from './fbx-meshes.mjs';
import { readVtk } from './vtk.mjs';
import { centroid, boxOf, glb } from './spl-lib.mjs';
import { THORAX_CT_NOTES } from '../lib/anatomy/notes-body/thorax-ct.js';
import { NOTES } from '../lib/anatomy/notes.js';
import { BODY_NOTES } from '../lib/anatomy/body-notes.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(resolve(arg('spl', '../spl')), 'thorax/models');
const OUT = resolve(HERE, '../public/anatomy/nouakchott');
const TMP = join(os.tmpdir(), 'mypromo-nouakchott');
const GLTFPACK = resolve(HERE, '../node_modules/gltfpack/cli.js');
mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

// file → [system, kind, French name, the description to borrow if not its own]
const PARTS = {
  'superior lobe of right lung': ['poumons', 'lung', 'Lobe supérieur droit'],
  'middle lobe of right lung': ['poumons', 'lung', 'Lobe moyen droit'],
  'inferior lobe of right lung': ['poumons', 'lung', 'Lobe inférieur droit'],
  'superior lobe of left lung': ['poumons', 'lung', 'Lobe supérieur gauche'],
  'inferior lobe of left lung': ['poumons', 'lung', 'Lobe inférieur gauche'],
  'trachea': ['bronches', 'cartilage', 'Trachée'],
  'carina of trachea': ['bronches', 'cartilage', 'Carène trachéale'],
  'main bronchi': ['bronches', 'cartilage', 'Bronches principales droite et gauche'],
  'lobar bronchi': ['bronches', 'cartilage', 'Bronches lobaires'],
  'segmental bronchi': ['bronches', 'cartilage', 'Bronches segmentaires'],
  'heart': ['coeur', 'heart', 'Cœur'],
  'right coronary artery': ['coeur', 'artery', 'Artère coronaire droite'],
  'left coronary artery': ['coeur', 'artery', 'Artère coronaire gauche'],
  'anterior interventricular artery': ['coeur', 'artery', 'Artère interventriculaire antérieure'],
  'inferior interventricular artery': ['coeur', 'artery', 'Artère interventriculaire postérieure'],
  'coronary sinus': ['coeur', 'vein', 'Sinus coronaire'],
  'aorta': ['vaisseaux', 'artery', 'Aorte thoracique (scanner)'],
  'pulmonary trunk': ['vaisseaux', 'pulmart', 'Tronc pulmonaire'],
  'pulmonary arteries': ['vaisseaux', 'pulmart', 'Artères pulmonaires droite et gauche'],
  'pulmonary veins': ['vaisseaux', 'pulmvein', 'Veines pulmonaires'],
  'superior vena cava': ['vaisseaux', 'vein', 'Veine cave supérieure'],
  'inferior vena cava': ['vaisseaux', 'vein', 'Veine cave inférieure'],
  'azygos vein': ['vaisseaux', 'vein', 'Veine azygos'],
  'esophagus': ['oesophage', 'gut', 'Œsophage'],
  'manubrium of sternum': ['squelette', 'bone', 'Manubrium sternal'],
  'body of sternum': ['squelette', 'bone', 'Corps du sternum'],
  'xiphoid process': ['squelette', 'bone', 'Processus xiphoïde'],
  'ribs': ['squelette', 'bone', 'Côtes'],
  'costal cartilages': ['squelette', 'cartilage', 'Cartilages costaux'],
  'clavicle': ['squelette', 'bone', 'Clavicules', 'Clavicule'],
  'scapula': ['squelette', 'bone', 'Scapulas', 'Scapula'],
  'sternoclavicular joint': ['squelette', 'ligament', 'Articulations sterno-claviculaires'],
  'vertebra': ['squelette', 'bone', 'Vertèbres thoraciques'],
  'intervertebral discs': ['squelette', 'disc', 'Disques intervertébraux'],
};
const RATIO = { squelette: 0.45, poumons: 0.5, bronches: 0.8, coeur: 0.7, vaisseaux: 0.6, oesophage: 0.7 };

const notes = new Map();
for (const book of Object.values(NOTES)) for (const [name, note] of Object.entries(book)) if (!notes.has(name)) notes.set(name, note);
const describe = (n) => THORAX_CT_NOTES[n] || notes.get(n) || BODY_NOTES[n] || null;

// RAS millimetres → the body's axes: x to the left, y up, z forward, metres.
// (x, y, z) → (−x, z, y) is a rotation (determinant +1), so the triangles
// keep their winding.
const toBody = (p) => {
  const q = new Float32Array(p.length);
  for (let i = 0; i < p.length; i += 3) { q[i] = -p[i] * 0.001; q[i + 1] = p[i + 2] * 0.001; q[i + 2] = p[i + 1] * 0.001; }
  return q;
};

const systems = new Map();
for (const [file, [system, k, n, borrow]] of Object.entries(PARTS)) {
  const path = join(SRC, `${file}.vtk`);
  if (!existsSync(path)) throw new Error(`missing ${path}`);
  const note = describe(n) || (borrow && describe(borrow));
  if (!note) throw new Error(`no description for ${n}`);
  const { positions, indices } = readVtk(path);
  if (!systems.has(system)) systems.set(system, []);
  systems.get(system).push({ n, k, b: `ct-${file.replace(/[^a-z]+/g, '-')}`, note, positions: toBody(positions), indices });
}

const grow = (box, b) => (box
  ? [box[0].map((x, k) => Math.min(x, b[0][k])), box[1].map((x, k) => Math.max(x, b[1][k]))]
  : [b[0].slice(), b[1].slice()]);
const boxes = {};
const index = { layers: {}, regions: {} };
const flat = (t) => (typeof t === 'string' ? t.replace(/\s+/g, ' ').trim() : t);
for (const [system, items] of systems) {
  items.sort((a, b) => a.n.localeCompare(b.n, 'fr'));
  const meshes = [], manifest = [], described = {};
  items.forEach((item, i) => {
    const id = `${system.slice(0, 3)}${i}`;
    const normals = Float32Array.from(normalsOf(item.positions, item.indices), (v) => v / 32767);
    meshes.push({ id, positions: item.positions, normals, indices: item.indices });
    boxes[system] = grow(boxes[system], boxOf(item.positions));
    const c = centroid(item.positions).map((v) => Math.round(v * 1000) / 1000);
    manifest.push({ id, n: item.n, k: item.k, b: item.b, r: 'thorax', c });
    described[item.b] = { note: Object.fromEntries(Object.entries(item.note).map(([k, v]) => [k, flat(v)])) };
  });
  writeFileSync(join(TMP, `${system}.raw.glb`), glb(meshes));
  execFileSync(process.execPath, [GLTFPACK, '-i', `${system}.raw.glb`, '-o', `${system}.glb`, '-cc', '-kn', '-si', String(RATIO[system])],
    { stdio: 'inherit', cwd: TMP });
  renameSync(join(TMP, `${system}.glb`), join(OUT, `${system}.glb`));
  writeFileSync(join(OUT, `${system}.json`), JSON.stringify({ system, items: manifest }));
  writeFileSync(join(OUT, `${system}.defs.json`), JSON.stringify(described));
  const tris = items.reduce((n, it) => n + it.indices.length / 3, 0);
  index.layers[system] = { bytes: statSync(join(OUT, `${system}.glb`)).size, count: items.length, tris: Math.round(tris * RATIO[system]) };
  console.log(`${system.padEnd(10)} ${String(items.length).padStart(3)} structures  ${(statSync(join(OUT, `${system}.glb`)).size / 1e6).toFixed(2)} MB  ~${Math.round(tris * RATIO[system] / 1000)}k triangles`);
}
const round = (b) => b.map((v) => v.map((x) => Math.round(x * 1000) / 1000));
index.regions = {
  corps: round(Object.values(boxes).reduce((a, b) => grow(a, b), null)),
  poumons: round(grow(boxes.poumons, boxes.bronches)),
  coeur: round(grow(boxes.coeur, boxes.vaisseaux)),
};
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index));
console.log(index.regions);
if (!existsSync(join(OUT, 'LICENCE.txt'))) throw new Error('public/anatomy/nouakchott/LICENCE.txt must sit beside the files');
