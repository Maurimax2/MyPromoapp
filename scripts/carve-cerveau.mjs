// The deep brain, from an MRI, placed in the body.
//
//   node --max-old-space-size=8192 scripts/carve-cerveau.mjs --z ../zanat --spl ../spl
//
// Z-Anatomy draws the thalamus as one piece and the hypothalamus as another;
// «Le diencéphale et les noyaux gris» is taught nucleus by nucleus. The
// SPL-PNL Brain Atlas (Surgical Planning Laboratory and Psychiatry
// Neuroimaging Laboratory, Brigham and Women's Hospital — 3D Slicer licence,
// part B, like the ear) is one healthy brain segmented from a 3 T MRI: the
// thalamic nuclei, the hypothalamic regions, the subthalamic nucleus, the
// substantia nigra, both segments of the pallidum, the accumbens, the
// claustrum, the hypophysis, the pineal, the cerebellar nuclei, the
// ventricles, the white matter. Download:
// https://www.openanatomy.org/atlases/nac/brain-2017-01.zip (into ../spl).
//
// It is fitted onto Z-Anatomy's brain like the ear (scripts/spl-lib.mjs): a
// similarity on what both have — thalami, striatum, pallidum, ventricles,
// corpus callosum, brainstem, hippocampi, amygdalae, and the cortex as a
// whole — and its structures keep the atlas's own colours, one per nucleus,
// the way the atlas and every textbook figure of the thalamus colour them.
//
// Writes two systems into public/anatomy/body/: `irm` (grey nuclei,
// diencephalon, ventricles, brainstem, cerebellar nuclei) and `irm-blanche`
// (the white matter, to open see-through around them).

import { writeFileSync, readFileSync, existsSync, statSync, renameSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { meshesOf, normalsOf } from './fbx-meshes.mjs';
import { readVtk } from './vtk.mjs';
import { grid, move, sample, centroid, fit, glb } from './spl-lib.mjs';
import { BRAIN_NOTES } from '../lib/anatomy/notes-body/cerveau.js';
import { NOTES } from '../lib/anatomy/notes.js';
import { BODY_NOTES } from '../lib/anatomy/body-notes.js';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const HERE = dirname(fileURLToPath(import.meta.url));
const ZFBX = join(resolve(arg('z', '../zanat')), 'Resources/Models/FBX');
const ATLAS = join(resolve(arg('spl', '../spl')), 'brain-2017-01');
const OUT = resolve(HERE, '../public/anatomy/body');
const TMP = join(os.tmpdir(), 'mypromo-cerveau');
const GLTFPACK = resolve(HERE, '../node_modules/gltfpack/cli.js');
mkdirSync(TMP, { recursive: true });

// atlas name without its side → [system, French name]
const PARTS = {
  'anterior thalamic nucleus': ['irm', 'Noyau antérieur du thalamus'],
  'dorsomedial thalamic nucleus': ['irm', 'Noyau dorso-médial du thalamus'],
  'centromedian thalamic nucleus': ['irm', 'Noyau centre-médian du thalamus'],
  'lateral dorsal thalamic nucleus': ['irm', 'Noyau latéral dorsal du thalamus'],
  'lateral posterior thalamic nucleus': ['irm', 'Noyau latéral postérieur du thalamus'],
  'pulvinar': ['irm', 'Pulvinar du thalamus'],
  'ventral anterior thalamic nucleus': ['irm', 'Noyau ventral antérieur du thalamus'],
  'ventral lateral thalamic nucleus': ['irm', 'Noyau ventral latéral du thalamus'],
  'ventral posterolateral thalamic nucleus': ['irm', 'Noyau ventral postéro-latéral du thalamus'],
  'ventral posteromedial thalamic nucleus': ['irm', 'Noyau ventral postéro-médial du thalamus'],
  'internal medullary lamina': ['irm', 'Lame médullaire interne du thalamus'],
  'lateral geniculate body': ['irm', 'Corps géniculé latéral'],
  'medial geniculate body': ['irm', 'Corps géniculé médial'],
  'anterior superior hypothalamus': ['irm', 'Hypothalamus antérieur, partie supérieure'],
  'anterior inferior hypothalamus': ['irm', 'Hypothalamus antérieur, partie inférieure'],
  'superior tuberal hypothalamus': ['irm', 'Hypothalamus tubérien, partie supérieure'],
  'inferior tuberal hypothalamus': ['irm', 'Hypothalamus tubérien, partie inférieure'],
  'posterior superior hypothalamus': ['irm', 'Hypothalamus postérieur'],
  'mammillary body': ['irm', 'Corps mamillaire'],
  'mammillothalamic tract': ['irm', 'Faisceau mamillo-thalamique (de Vicq d’Azyr)'],
  'subthalamic nucleus': ['irm', 'Noyau subthalamique (corps de Luys)'],
  'optic chiasm': ['irm', 'Chiasma optique'],
  'optic nerve': ['irm', 'Nerf optique (II)'],
  'optic tract': ['irm', 'Tractus optique'],
  'neurohypophysis': ['irm', 'Neurohypophyse'],
  'adenohypophysis': ['irm', 'Adénohypophyse'],
  'infundibulum of neurohypophysis': ['irm', 'Tige pituitaire (infundibulum)'],
  'pineal body': ['irm', 'Glande pinéale (épiphyse)'],
  'caudate nucleus': ['irm', 'Noyau caudé'],
  'putamen': ['irm', 'Putamen'],
  'globus pallidus pars externa': ['irm', 'Globus pallidus externe'],
  'globus pallidus pars interna': ['irm', 'Globus pallidus interne'],
  'nucleus accumbens': ['irm', 'Noyau accumbens'],
  'claustrum': ['irm', 'Claustrum (avant-mur)'],
  'amygdala': ['irm', 'Corps amygdaloïde'],
  'hippocampus': ['irm', 'Hippocampe'],
  'fornix of forebrain': ['irm', 'Fornix (trigone)'],
  'corpus callosum': ['irm', 'Corps calleux'],
  'anterior commissure': ['irm', 'Commissure antérieure'],
  'pellucid septum': ['irm', 'Septum pellucidum'],
  'lateral ventricle': ['irm', 'Ventricule latéral'],
  'temporal horn of lateral ventricle': ['irm', 'Corne temporale du ventricule latéral'],
  'third ventricle': ['irm', 'Troisième ventricule'],
  'aqueduct': ['irm', 'Aqueduc du mésencéphale'],
  'fourth ventricle': ['irm', 'Quatrième ventricule'],
  'part of midbrain': ['irm', 'Mésencéphale'],
  'pons': ['irm', 'Pont'],
  'medulla oblongata': ['irm', 'Bulbe rachidien'],
  'red nucleus': ['irm', 'Noyau rouge'],
  'substantia nigra': ['irm', 'Substance noire (locus niger)'],
  'superior colliculus': ['irm', 'Colliculus supérieur'],
  'inferior colliculus': ['irm', 'Colliculus inférieur'],
  'brachia of superior colliculus': ['irm', 'Bras du colliculus supérieur'],
  'brachia of inferior colliculus': ['irm', 'Bras du colliculus inférieur'],
  'dentate-nucleus': ['irm', 'Noyau dentelé du cervelet'],
  'fage nuclei': ['irm', 'Noyaux fastigial, globuleux et emboliforme'],
  'visual cortex': ['irm', 'Cortex visuel primaire (aire striée)'],
  'white matter of cerebral hemisphere': ['irm-blanche', 'Substance blanche de l’hémisphère cérébral'],
  'white matter of hemisphere of cerebellum': ['irm-blanche', 'Substance blanche du cervelet'],
};
// Triangles kept per system, whatever the atlas's density.
const TARGET = { irm: 260000, 'irm-blanche': 110000 };

// ------------------------------------------------------------- the atlas
const atlas = JSON.parse(readFileSync(join(ATLAS, 'atlasStructure.json'), 'utf8'));
const byId = new Map(atlas.map((x) => [x['@id'], x]));
const sideAndBase = (name) => {
  const n = name.toLowerCase().replace(/_/g, ' ');
  let m = n.match(/^(left|right)[- ](.*)$/);
  if (m) return [m[1] === 'left' ? 'l' : 'r', m[2]];
  m = n.match(/^(.*) of (left|right) (.*)$/);
  if (m) return [m[2] === 'left' ? 'l' : 'r', `${m[1]} of ${m[3]}`];
  return [null, n];
};
const pieces = [];   // { base, side, system, n, colour, positions, indices, file }
const seenFile = new Set();
for (const s of atlas.filter((x) => x['@type'] === 'Structure')) {
  const sel = (s.sourceSelector || []).find((x) => x.dataSource && x.dataSource.endsWith('_ModelDS'));
  const file = sel && byId.get(sel.dataSource)?.source;
  if (!file || seenFile.has(file)) continue;
  const [side, base] = sideAndBase(s.annotation.name);
  pieces.push({ base, side, file, colour: s.renderOption?.color, sname: s.annotation.name });
  seenFile.add(file);
}
const rgb = (c) => {
  const m = String(c || '').match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!m) return null;
  // A little lifted: the atlas's colours are dark under a studio light.
  const lift = (v) => Math.round(Math.min(255, Number(v) * 0.75 + 64));
  return `#${[m[1], m[2], m[3]].map((v) => lift(v).toString(16).padStart(2, '0')).join('')}`;
};
const read = (file) => {
  const { positions, indices } = readVtk(join(ATLAS, file));
  return { positions: Float32Array.from(positions, (v) => v * 0.001), indices };
};

// --------------------------------------------------- what the fit is guided by
const zm = new Map();
for (const [k, v] of meshesOf(join(ZFBX, 'NervousSystem100.fbx'))) zm.set(k, v);
// Z-Anatomy stores one side of most of the brain; its other side is the
// mirror, made at carve time (scripts/carve-body.mjs) — and here too.
const other = (n) => (/\.l$/.test(n) ? n.replace(/\.l$/, '.r') : /\.r$/.test(n) ? n.replace(/\.r$/, '.l') : null);
const zHas = (n) => zm.has(n) || (!!other(n) && zm.has(other(n)));
const zOne = (n) => {
  if (zm.has(n)) return Float32Array.from(zm.get(n).positions, (v) => v * 0.01);
  const q = Float32Array.from(zm.get(other(n)).positions, (v) => v * 0.01);
  for (let i = 0; i < q.length; i += 3) q[i] = -q[i];
  return q;
};
const zPoints = (names) => {
  const parts = names.filter(zHas).map(zOne);
  if (!parts.length) throw new Error(`Z-Anatomy has none of ${names.join(', ')}`);
  const out = new Float32Array(parts.reduce((a, p) => a + p.length, 0));
  let at = 0; for (const p of parts) { out.set(p, at); at += p.length; }
  return out;
};
const both = (b) => [`${b}.l`, `${b}.r`, b];
const atlasPoints = (test) => {
  const list = pieces.filter(test).map((p) => read(p.file).positions);
  if (!list.length) throw new Error('no atlas piece for a guide');
  const out = new Float32Array(list.reduce((a, p) => a + p.length, 0));
  let at = 0; for (const p of list) { out.set(p, at); at += p.length; }
  return out;
};
const THAL = /thalamic nucleus|pulvinar|internal medullary lamina|geniculate body/;
const sided = (side, re) => (p) => p.side === side && re.test(p.base);
const CORTEX_Z = [...new Set([...zm.keys()]
  .filter((k) => /gyrus|gyri|Precuneus|Cuneus|Occipital pole|Temporal pole|Superior parietal lobule/i.test(k) && !/\.(i|j)$/.test(k))
  .flatMap((k) => [k, other(k)].filter(Boolean)))];
const GUIDES = [
  ['thalamus l', sided('l', THAL), both('Thalamus').slice(0, 1), 1, true],
  ['thalamus r', sided('r', THAL), both('Thalamus').slice(1, 2), 1, true],
  ['caudate l', sided('l', /^caudate nucleus$/), ['Caudate nucleus.l'], 1, true],
  ['caudate r', sided('r', /^caudate nucleus$/), ['Caudate nucleus.r'], 1, true],
  ['putamen l', sided('l', /^putamen$/), ['Putamen.l'], 1, true],
  ['putamen r', sided('r', /^putamen$/), ['Putamen.r'], 1, true],
  ['pallidum l', sided('l', /^globus pallidus/), ['Globus pallidus.l'], 0.7, true],
  ['pallidum r', sided('r', /^globus pallidus/), ['Globus pallidus.r'], 0.7, true],
  ['ventricle l', sided('l', /lateral ventricle/), ['Lateral ventricle.l'], 1, true],
  ['ventricle r', sided('r', /lateral ventricle/), ['Lateral ventricle.r'], 1, true],
  ['third ventricle', (p) => /^third ventricle$/.test(p.base), ['Third ventricle'], 0.7, true],
  ['fourth ventricle', (p) => /^fourth ventricle$/.test(p.base), ['Fourth ventricle'], 0.7, true],
  ['corpus callosum', (p) => /^corpus callosum$/.test(p.base), ['Corpus callosum'], 1, true],
  ['pons', (p) => /^pons$/.test(p.base), both('Pons'), 1, true],
  ['medulla', (p) => /^medulla oblongata$/.test(p.base), both('Medulla oblongata'), 0.7, false],
  ['midbrain', (p) => /^part of midbrain$/.test(p.base), both('Midbrain'), 0.7, false],
  ['hippocampus l', sided('l', /^hippocampus$/), ['Hippocampus.l'], 0.7, true],
  ['hippocampus r', sided('r', /^hippocampus$/), ['Hippocampus.r'], 0.7, true],
  ['amygdala l', sided('l', /^amygdala$/), ['Amygdaloid body.l'], 0.5, true],
  ['amygdala r', sided('r', /^amygdala$/), ['Amygdaloid body.r'], 0.5, true],
];
const guides = [];
for (const [label, test, znames, w, core] of GUIDES) {
  const names = znames.filter(zHas);
  if (!names.length) { console.warn(`  (no Z-Anatomy ${znames.join('/')} — guide «${label}» skipped)`); continue; }
  const src = atlasPoints(test), dst = zPoints(names);
  guides.push({ label, w, core, src: sample(src, 500), sc: centroid(src), dc: centroid(dst), near: grid(dst, 0.004) });
}
// The cortex as a whole: two parcellations by different hands, one surface.
{
  const src = atlasPoints((p) => /gyrus|lobule|pole|cuneus|insula|limen/.test(p.base) && !/white matter/.test(p.base));
  const dst = zPoints(CORTEX_Z);
  guides.push({ label: 'cortex', w: 1.5, core: false, src: sample(src, 3000), sc: centroid(src), dc: centroid(dst), near: grid(dst, 0.006) });
}
const fits = [fit(guides, false), fit(guides, true)].sort((a, b) => a.err - b.err);
const F = fits[0];
console.log(`fit: ${F.mirror ? 'mirrored' : 'as scanned'}, scale ${F.T.s.toFixed(3)}, core ${(F.err * 1000).toFixed(2)} mm (other hand ${(fits[1].err * 1000).toFixed(2)} mm)`);
console.log(`  mm per guide: ${F.per.join(' · ')}`);
if (F.mirror) throw new Error('a mirrored fit would swap left and right: look at the guides before trusting it');

const place = (positions) => {
  const out = new Float32Array(positions.length);
  for (let i = 0; i < positions.length; i += 3) {
    const q = move(F.T, [positions[i], positions[i + 1], positions[i + 2]]);
    out[i] = q[0]; out[i + 1] = q[1]; out[i + 2] = q[2];
  }
  return out;
};

// --------------------------------------------------------------- writing
const notes = new Map();
for (const book of Object.values(NOTES)) for (const [name, note] of Object.entries(book)) if (!notes.has(name)) notes.set(name, note);
const describe = (n) => BRAIN_NOTES[n] || notes.get(n) || BODY_NOTES[n] || null;

const systems = new Map();
const missing = new Set();
for (const p of pieces) {
  const part = PARTS[p.base];
  if (!part) continue;
  const [system, n] = part;
  if (!describe(n)) missing.add(n);
  const { positions, indices } = read(p.file);
  if (!indices.length) continue;
  if (!systems.has(system)) systems.set(system, []);
  systems.get(system).push({ n, s: p.side, k: 'atlas', b: `spl-${p.base.replace(/[^a-z]+/g, '-')}`, t: rgb(p.colour), positions: place(positions), indices });
}
if (missing.size) throw new Error(`no description for: ${[...missing].join(', ')}`);
const absent = Object.keys(PARTS).filter((b) => !pieces.some((p) => p.base === b));
if (absent.length) console.warn(`  (not in the atlas: ${absent.join(', ')})`);

const index = JSON.parse(readFileSync(join(OUT, 'index.json'), 'utf8'));
const flat = (t) => (typeof t === 'string' ? t.replace(/\s+/g, ' ').trim() : t);
for (const [system, items] of systems) {
  items.sort((a, b) => a.n.localeCompare(b.n, 'fr') || String(a.s).localeCompare(String(b.s)));
  const meshes = [], manifest = [], described = {};
  const tris = items.reduce((n, it) => n + it.indices.length / 3, 0);
  const ratio = Math.min(1, TARGET[system] / tris);
  items.forEach((item, i) => {
    const id = `${system.replace(/[^a-z]/g, '').slice(0, 3)}${system === 'irm' ? '' : 'b'}${i}`;
    const normals = Float32Array.from(normalsOf(item.positions, item.indices), (v) => v / 32767);
    meshes.push({ id, positions: item.positions, normals, indices: item.indices });
    const c = centroid(item.positions).map((v) => Math.round(v * 1000) / 1000);
    manifest.push({ id, n: item.n, s: item.s || undefined, k: item.k, b: item.b, r: 'tete', c, ...(item.t ? { t: item.t } : {}) });
    const note = describe(item.n);
    described[item.b] = { note: Object.fromEntries(Object.entries(note).map(([k, v]) => [k, flat(v)])) };
  });
  writeFileSync(join(TMP, `${system}.raw.glb`), glb(meshes));
  execFileSync(process.execPath, [GLTFPACK, '-i', `${system}.raw.glb`, '-o', `${system}.glb`, '-cc', '-kn', '-si', ratio.toFixed(3), '-sa'],
    { stdio: 'inherit', cwd: TMP });
  renameSync(join(TMP, `${system}.glb`), join(OUT, `${system}.glb`));
  writeFileSync(join(OUT, `${system}.json`), JSON.stringify({ system, items: manifest }));
  writeFileSync(join(OUT, `${system}.defs.json`), JSON.stringify(described));
  index.layers[system] = { bytes: statSync(join(OUT, `${system}.glb`)).size, count: items.length, tris: Math.round(tris * ratio) };
  console.log(`${system.padEnd(12)} ${String(items.length).padStart(3)} structures  ${(statSync(join(OUT, `${system}.glb`)).size / 1e6).toFixed(2)} MB  ~${Math.round(tris * ratio / 1000)}k triangles (of ${Math.round(tris / 1000)}k)`);
}
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index));
if (!existsSync(join(OUT, 'LICENCE-cerveau-SPL.txt'))) throw new Error('LICENCE-cerveau-SPL.txt must sit beside the files');
