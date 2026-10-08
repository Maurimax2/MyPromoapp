// Female anatomy, from the Human Reference Atlas (HuBMAP, CC BY 4.0).
//
//   node scripts/carve-feminin.mjs
//
// Both of the app's other sources are one male body. The Human Reference
// Atlas publishes organs segmented from the Visible Human Female, each placed
// where it sits in her body, so the uterus, the tubes, the ovaries, the pelvis,
// the bladder and the breast come out already in place around each other.
//
// Fetches the GLB files from the atlas's CDN (cached in ../hra), names every
// structure in French, and writes public/anatomy/feminin/ in the same shape as
// the whole body (scripts/carve-body.mjs), so the same viewer reads it.

import { writeFileSync, mkdirSync, readFileSync, existsSync, statSync, renameSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = resolve(HERE, '../../hra');
const OUT = resolve(HERE, '../public/anatomy/feminin');
const TMP = join(os.tmpdir(), 'mypromo-feminin');
const GLTFPACK = resolve(HERE, '../node_modules/gltfpack/cli.js');
const CDN = 'https://cdn.humanatlas.io/digital-objects/ref-organ';

const SOURCES = [
  ['pelvis-female/v1.3', '3d-vh-f-pelvis.glb'],
  ['uterus-female/v1.2', '3d-vh-f-uterus.glb'],
  ['fallopian-tube-female-left/v1.2', '3d-vh-f-fallopian-tube-l.glb'],
  ['fallopian-tube-female-right/v1.2', '3d-vh-f-fallopian-tube-r.glb'],
  ['ovary-female-left/v1.3', '3d-vh-f-ovary-l.glb'],
  ['ovary-female-right/v1.3', '3d-vh-f-ovary-r.glb'],
  ['urinary-bladder-female/v1.2', '3d-vh-f-urinary-bladder.glb'],
  ['mammary-gland-female-left/v1.1', '3d-vh-f-mammary-gland-l.glb'],
  ['mammary-gland-female-right/v1.1', '3d-vh-f-mammary-gland-r.glb'],
  ['placenta-full-term-female/v1.1', '3d-vh-f-placenta-full-term.glb'],
];

// Node name (side taken off) → [system, tissue, French name]. A node not
// listed is a group or a duplicate surface (the spongy bone inside the
// compact) and is left out.
const PARTS = {
  sacrum: ['bassin', 'bone', 'Sacrum'],
  coccyx: ['bassin', 'bone', 'Coccyx'],
  pubis_compact_bone: ['bassin', 'bone', 'Pubis'],
  ilium_compact_bone: ['bassin', 'bone', 'Ilium'],
  ischium_compact_bone: ['bassin', 'bone', 'Ischium'],
  fundus_of_uterus: ['genital', 'uterus', 'Fond de l’utérus'],
  body_of_uterus: ['genital', 'uterus', 'Corps de l’utérus'],
  cornua: ['genital', 'uterus', 'Cornes utérines'],
  anterior_wall_of_uterus: ['genital', 'uterus', 'Paroi antérieure de l’utérus'],
  posterior_wall_of_uterus: ['genital', 'uterus', 'Paroi postérieure de l’utérus'],
  lower_uterine_segment: ['genital', 'uterus', 'Segment inférieur de l’utérus (isthme utérin)'],
  cervix: ['genital', 'uterus', 'Col de l’utérus'],
  internal_cervical_os: ['genital', 'mucosa', 'Orifice interne du col'],
  external_cervical_os: ['genital', 'mucosa', 'Orifice externe du col'],
  cervicovaginal_junction: ['genital', 'mucosa', 'Jonction cervico-vaginale'],
  abdominal_ostium_of_uterine_tube: ['genital', 'mucosa', 'Ostium abdominal de la trompe utérine'],
  uterine_tube_infundibulum: ['genital', 'tube', 'Infundibulum de la trompe utérine'],
  fibria_of_uterine_tube: ['genital', 'tube', 'Franges de la trompe utérine (fimbriae)'],
  ampulla_of_uterine_tube: ['genital', 'tube', 'Ampoule de la trompe utérine'],
  isthmus_of_fallopian_tube: ['genital', 'tube', 'Isthme de la trompe utérine'],
  left_ovary: ['genital', 'gonad', 'Ovaire'],
  right_ovary: ['genital', 'gonad', 'Ovaire'],
  fundus_of_urinary_bladder_dome: ['vessie', 'urine', 'Dôme de la vessie'],
  fundus_of_urinary_bladder_base: ['vessie', 'urine', 'Base de la vessie (fond vésical)'],
  urinary_bladder_neck_smooth_muscle: ['vessie', 'urine', 'Col de la vessie'],
  trigone_of_urinary_bladder: ['vessie', 'mucosa', 'Trigone vésical'],
  ureteral_orifice: ['vessie', 'mucosa', 'Orifice urétéral'],
  fat: ['sein', 'fat', 'Tissu adipeux du sein'],
  mammary_lobes: ['sein', 'gland', 'Lobes de la glande mammaire'],
  main_lactiferous_ducts: ['sein', 'duct', 'Conduits lactifères'],
  main_lactiferous_sinuses: ['sein', 'duct', 'Sinus lactifères'],
  suspensory_ligaments: ['sein', 'ligament', 'Ligaments suspenseurs du sein (de Cooper)'],
  nipple: ['sein', 'skin', 'Mamelon'],
  areola: ['sein', 'skin', 'Aréole'],
  areolar_tubercles: ['sein', 'skin', 'Tubercules aréolaires (de Montgomery)'],
  basal_plate: ['placenta', 'heart', 'Plaque basale du placenta'],
  chorionic_plate: ['placenta', 'gland', 'Plaque choriale du placenta'],
  placenta_vessels: ['placenta', 'artery', 'Vaisseaux placentaires'],
  amnion: ['placenta', 'bursa', 'Amnios'],
  umbilical_cord: ['placenta', 'cord', 'Cordon ombilical'],
  umbilical_artery_1: ['placenta', 'artery', 'Artère ombilicale'],
  umbilical_artery_2: ['placenta', 'artery', 'Artère ombilicale'],
  umbilical_vein: ['placenta', 'vein', 'Veine ombilicale'],
};

// Simplified to keep a phone happy: the breast arrives as forty megabytes.
const RATIO = { bassin: 0.35, genital: 0.5, vessie: 0.5, sein: 0.07, placenta: 0.2 };

const DESCRIPTIONS = {
  'Col de l’utérus': {
    what: `Partie inférieure, cylindrique, de l’utérus. Sa portion vaginale fait
      saillie dans le vagin ; le canal cervical s’ouvre par l’orifice interne
      dans la cavité utérine et par l’orifice externe dans le vagin.`,
    near: ['En avant : la vessie', 'En arrière : le rectum, par le cul-de-sac recto-utérin (de Douglas)',
      'Latéralement : l’uretère croise sous l’artère utérine, à 1,5 cm du col'],
  },
  'Corps de l’utérus': {
    what: `Partie supérieure de l’utérus, triangulaire, normalement en
      antéversion et antéflexion au-dessus de la vessie.`,
    parts: ['Fond, au-dessus de l’abouchement des trompes', 'Cornes, où s’abouchent les trompes',
      'Faces vésicale et intestinale'],
    supplies: ['Artère utérine, branche de l’iliaque interne'],
  },
  'Ovaire': {
    what: `Gonade féminine, paire, dans la fosse ovarique de la paroi pelvienne
      latérale, entre les vaisseaux iliaques externes et internes.`,
    near: ['Ligament suspenseur de l’ovaire (lombo-ovarien), avec les vaisseaux ovariques',
      'Ligament propre de l’ovaire (utéro-ovarien), vers la corne utérine',
      'Mésovarium, attaché au ligament large'],
    supplies: ['Artère ovarique, branche de l’aorte abdominale', 'Rameau ovarique de l’artère utérine'],
  },
  'Ampoule de la trompe utérine': {
    what: `Segment le plus long et le plus large de la trompe, entre
      l’infundibulum et l’isthme.`,
    note: 'Siège habituel de la fécondation, et de la plupart des grossesses extra-utérines.',
  },
  'Trigone vésical': {
    what: `Zone triangulaire lisse du fond de la vessie, entre les deux orifices
      urétéraux et l’orifice interne de l’urètre.`,
  },
  'Ligaments suspenseurs du sein (de Cooper)': {
    what: `Travées fibreuses qui relient la peau du sein au fascia pectoral et
      cloisonnent la glande.`,
    note: 'Leur rétraction par une tumeur donne l’aspect de peau d’orange et la rétraction du mamelon.',
  },
};

// ------------------------------------------------------------------ geometry

const plain = (name) => name.replace(/^VH_F_/, '').replace(/_[LR]$/, '');
const sideOf = (name) => (/_L$|^VH_F_left_/.test(name) ? 'l' : /_R$|^VH_F_right_/.test(name) ? 'r' : null);

function boxOf(p) {
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) {
    for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], p[i + k]); hi[k] = Math.max(hi[k], p[i + k]); }
  }
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
    asset: { version: '2.0', generator: 'MyPromo carve-feminin' },
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

// ------------------------------------------------------------------- reading

mkdirSync(CACHE, { recursive: true });
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

const loader = new GLTFLoader();
const systems = new Map();

for (const [path, file] of SOURCES) {
  const local = join(CACHE, file);
  if (!existsSync(local)) {
    const res = await fetch(`${CDN}/${path}/assets/${file}`);
    if (!res.ok) throw new Error(`${file}: ${res.status}`);
    writeFileSync(local, Buffer.from(await res.arrayBuffer()));
  }
  const data = readFileSync(local);
  const gltf = await new Promise((ok, fail) => loader.parse(
    data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength), '', ok, fail));
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    // The name is on the mesh or on the node holding it.
    const name = [o.name, o.parent?.name].find((n) => n && PARTS[plain(n)]);
    if (!name) return;
    const [system, kind, french] = PARTS[plain(name)];
    const g = o.geometry.index ? o.geometry : o.geometry.clone().setIndex(
      [...Array(o.geometry.attributes.position.count).keys()]);
    const pos = g.attributes.position;
    const positions = new Float32Array(pos.count * 3);
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld);
      positions[i * 3] = v.x; positions[i * 3 + 1] = v.y; positions[i * 3 + 2] = v.z;
    }
    const indices = Uint32Array.from(g.index.array);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    geo.computeVertexNormals();
    if (!systems.has(system)) systems.set(system, []);
    systems.get(system).push({
      n: french, s: sideOf(name), k: kind, b: plain(name),
      positions, indices, normals: geo.attributes.normal.array,
    });
  });
  console.log(`${file.padEnd(34)} read`);
}

// ------------------------------------------------------------------- writing

const index = { layers: {}, regions: {} };
const grow = (box, b) => (box
  ? [box[0].map((x, k) => Math.min(x, b[0][k])), box[1].map((x, k) => Math.max(x, b[1][k]))]
  : [b[0].slice(), b[1].slice()]);
let all = null;
const boxes = {};

for (const [system, items] of systems) {
  items.sort((a, b) => a.n.localeCompare(b.n, 'fr'));
  const meshes = [];
  const manifest = [];
  const described = {};
  for (const [i, item] of items.entries()) {
    const id = `${system.slice(0, 3)}${i}`;
    meshes.push({ id, positions: item.positions, normals: Float32Array.from(item.normals), indices: item.indices });
    const box = boxOf(item.positions);
    boxes[system] = grow(boxes[system], box);
    if (system !== 'placenta') all = grow(all, box);
    manifest.push({ id, n: item.n, s: item.s, k: item.k, b: item.b, r: system === 'sein' ? 'sein' : system === 'placenta' ? 'placenta' : 'pelvis' });
    if (DESCRIPTIONS[item.n]) described[item.b] = { note: DESCRIPTIONS[item.n] };
  }
  writeFileSync(join(TMP, `${system}.raw.glb`), glb(meshes));
  // The breast's fat is a scan surface full of small bumps, which the careful
  // simplifier will not flatten; it is told to reach the ratio regardless.
  const hard = system === 'sein' ? ['-sa'] : [];
  execFileSync(process.execPath, [GLTFPACK, '-i', `${system}.raw.glb`, '-o', `${system}.glb`, '-cc', '-kn', '-si', String(RATIO[system]), ...hard],
    { stdio: 'inherit', cwd: TMP });
  renameSync(join(TMP, `${system}.glb`), join(OUT, `${system}.glb`));
  writeFileSync(join(OUT, `${system}.json`), JSON.stringify({ system, items: manifest }));
  writeFileSync(join(OUT, `${system}.defs.json`), JSON.stringify(Object.fromEntries(
    Object.entries(described).map(([k, v]) => [k, { note: Object.fromEntries(Object.entries(v.note).map(([a, b]) => [a, typeof b === 'string' ? b.replace(/\s+/g, ' ').trim() : b])) }]))));
  index.layers[system] = { bytes: statSync(join(OUT, `${system}.glb`)).size, count: items.length };
  console.log(`${system.padEnd(10)} ${String(items.length).padStart(3)} structures  ${(statSync(join(OUT, `${system}.glb`)).size / 1e6).toFixed(1)} MB`);
}

const round = (b) => b.map((v) => v.map((x) => Math.round(x * 1000) / 1000));
index.regions = {
  corps: round(all),
  pelvis: round(grow(grow(boxes.genital, boxes.vessie), boxes.bassin)),
  genital: round(boxes.genital),
  sein: round(boxes.sein),
  placenta: round(boxes.placenta),
};
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index));
console.log(index.regions);
