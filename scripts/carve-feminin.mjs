// The female pelvis, in place: organs, walls, floor and ligaments.
//
//   node --max-old-space-size=8192 scripts/carve-feminin.mjs --z ../zanat
//
// Both of the app's body sources are one male body. The Human Reference Atlas
// (HuBMAP, CC BY 4.0) publishes organs segmented from the Visible Human Female,
// each placed where it sits in her body, so the uterus, the tubes, the ovaries,
// the bladder, the ureters, the rectum and the pelvic vessels come out already
// in place around each other and inside her pelvis. The first version drew the
// organs alone in front of a grey pelvis, floating; this one draws the pelvis
// they live in:
//
// - the walls and the floor: obturator internus, piriformis, the levator ani,
//   coccygeus, the sacrospinous and sacrotuberous ligaments. Neither atlas has
//   a female pelvic floor, so Z-Anatomy's (CC BY-SA 4.0) is fitted onto her
//   pelvis: thirteen landmarks found on both pelvises (the anterior superior
//   iliac spines, the crests, the ischial tuberosities, the symphysis, the
//   promontory, the coccyx) give a scale and a shift per axis, and the muscles
//   follow the bones they hold on to. The fit is printed; a residual of a few
//   millimetres is what a scale can do between two people.
// - the uterus's ligaments, the vagina and the urethra. No atlas segments
//   them, so each is drawn between its real attachments measured on her
//   organs and bones — the round ligament from the uterine horn to the deep
//   inguinal ring, the utero-sacral ligaments from the cervix round the rectum
//   to the sacrum. Their descriptions say so: «tracé schématique».
// - the skin of the hips, faint, so the pelvis is in a body.
//
// Writes public/anatomy/feminin/ in the shape the body viewer reads
// (scripts/carve-body.mjs). The HRA files are cached in ../hra.

import { writeFileSync, mkdirSync, readFileSync, existsSync, statSync, renameSync, readdirSync, unlinkSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { meshesOf } from './fbx-meshes.mjs';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = resolve(HERE, '../../hra');
const OUT = resolve(HERE, '../public/anatomy/feminin');
const TMP = join(os.tmpdir(), 'mypromo-feminin');
const GLTFPACK = resolve(HERE, '../node_modules/gltfpack/cli.js');
const ZFBX = join(resolve(arg('z', '../zanat')), 'Resources/Models/FBX');
const CDN = 'https://cdn.humanatlas.io/digital-objects/ref-organ';

const SOURCES = [
  'pelvis-female/v1.3/assets/3d-vh-f-pelvis.glb',
  'uterus-female/v1.2/assets/3d-vh-f-uterus.glb',
  'fallopian-tube-female-left/v1.2/assets/3d-vh-f-fallopian-tube-l.glb',
  'fallopian-tube-female-right/v1.2/assets/3d-vh-f-fallopian-tube-r.glb',
  'ovary-female-left/v1.3/assets/3d-vh-f-ovary-l.glb',
  'ovary-female-right/v1.3/assets/3d-vh-f-ovary-r.glb',
  'urinary-bladder-female/v1.2/assets/3d-vh-f-urinary-bladder.glb',
  'ureter-female-left/v1.2/assets/3d-vh-f-ureter-l.glb',
  'ureter-female-right/v1.2/assets/3d-vh-f-ureter-r.glb',
  'large-intestine-female/v1.3/assets/3d-sbu-f-large-intestine.glb',
  'blood-vasculature-female/v1.3/assets/3d-vh-f-blood-vasculature.glb',
  'skin-female/v1.5/assets/3d-vh-f-skin.glb',
];

// Node name (side taken off) → [system, tissue, French name]. A node not
// listed is a group, a duplicate surface (the spongy bone inside the compact)
// or outside the pelvis, and is left out.
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
  left_ureter: ['vessie', 'urine', 'Uretère'],
  right_ureter: ['vessie', 'urine', 'Uretère'],
  rectum: ['intestin', 'gut', 'Rectum'],
  sigmoid_colon: ['intestin', 'gut', 'Côlon sigmoïde'],
  left_uterine_artery: ['vaisseaux', 'artery', 'Artère utérine'],
  right_uterine_artery: ['vaisseaux', 'artery', 'Artère utérine'],
  left_uterine_vein: ['vaisseaux', 'vein', 'Veines utérines'],
  right_uterine_vein: ['vaisseaux', 'vein', 'Veines utérines'],
  superior_rectal_artery: ['vaisseaux', 'artery', 'Artère rectale supérieure'],
  superior_rectal_vein: ['vaisseaux', 'vein', 'Veine rectale supérieure'],
  middle_rectal_vein: ['vaisseaux', 'vein', 'Veine rectale moyenne'],
  inferior_rectal_vein: ['vaisseaux', 'vein', 'Veine rectale inférieure'],
  internal_iliac_vein: ['vaisseaux', 'vein', 'Veine iliaque interne'],
  left_common_iliac_vein: ['vaisseaux', 'vein', 'Veine iliaque commune'],
  right_common_iliac_vein: ['vaisseaux', 'vein', 'Veine iliaque commune'],
  internal_pudendal_vein: ['vaisseaux', 'vein', 'Veine pudendale interne'],
  median_sacral_vein: ['vaisseaux', 'vein', 'Veine sacrale médiane'],
  inferior_mesenteric_artery: ['vaisseaux', 'artery', 'Artère mésentérique inférieure'],
  inferior_mesenteric_vein: ['vaisseaux', 'vein', 'Veine mésentérique inférieure'],
  sigmoid_artery_a: ['vaisseaux', 'artery', 'Artères sigmoïdiennes'],
  sigmoid_artery_b: ['vaisseaux', 'artery', 'Artères sigmoïdiennes'],
  sigmoid_artery_c: ['vaisseaux', 'artery', 'Artères sigmoïdiennes'],
  sigmoid_vein_a: ['vaisseaux', 'vein', 'Veines sigmoïdiennes'],
  sigmoid_vein_b: ['vaisseaux', 'vein', 'Veines sigmoïdiennes'],
  sigmoid_vein_c: ['vaisseaux', 'vein', 'Veines sigmoïdiennes'],
  descending_aorta_b: ['vaisseaux', 'artery', 'Aorte abdominale'],
  inferior_vena_cava_b: ['vaisseaux', 'vein', 'Veine cave inférieure'],
  skin: ['peau', 'skin', 'Peau'],
};

// What reaches out of the pelvis is cut where the pelvis stops: the aorta and
// the vena cava at the lumbar vertebrae, the skin at the waist and the thighs,
// and the arms that hang beside the hips are left out altogether.
const CROP = {
  skin: [[-0.205, -0.11, -1], [0.19, 0.21, 1]],
  descending_aorta_b: [[-1, -1, -1], [1, 0.235, 1]],
  inferior_vena_cava_b: [[-1, -1, -1], [1, 0.235, 1]],
};

// Z-Anatomy's pelvic walls and floor, fitted onto her pelvis.
const FROM_Z = {
  MuscularSystem100: {
    'Pubococcygeus muscle': ['plancher', 'muscle', 'Muscle pubo-coccygien (élévateur de l’anus)'],
    'Iliococcygeus muscle': ['plancher', 'muscle', 'Muscle ilio-coccygien (élévateur de l’anus)'],
    'Coccygeus muscle': ['plancher', 'muscle', 'Muscle coccygien'],
    'Tendinous arch of levator ani': ['plancher', 'tendon', 'Arc tendineux du muscle élévateur de l’anus'],
    'Obturator internus': ['plancher', 'muscle', 'Muscle obturateur interne'],
    'Piriformis muscle': ['plancher', 'muscle', 'Muscle piriforme'],
    'External anal sphincter': ['plancher', 'muscle', 'Muscle sphincter externe de l’anus'],
  },
  Joints100: {
    'Sacrospinous ligament': ['ligaments', 'ligament', 'Ligament sacro-épineux'],
    'Sacrotuberous ligament': ['ligaments', 'ligament', 'Ligament sacro-tubéral'],
    'Obturator membrane': ['ligaments', 'ligament', 'Membrane obturatrice'],
  },
};

// Simplified to keep a phone happy. The skin is a scan of a whole woman.
const RATIO = { bassin: 0.35, genital: 0.5, vessie: 0.45, intestin: 0.5, vaisseaux: 0.4, plancher: 0.35, ligaments: 0.6, peritoine: 1, peau: 0.12 };

const SCHEMA = 'Tracé schématique : l’atlas source ne segmente pas cette structure ; son trajet est reconstruit entre ses insertions mesurées sur les organes et le bassin de ce corps.';
const FITTED = 'Muscle du Z-Anatomy (corps masculin) ajusté au bassin féminin par ses repères osseux : position et proportions approchées.';

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
      'Mésovarium, attaché au feuillet postérieur du ligament large'],
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
  'Uretère': {
    what: `Conduit qui mène l’urine du bassinet à la vessie, long de 25 à 30 cm,
      lombaire, iliaque puis pelvien.`,
    course: ['Croise les vaisseaux iliaques au détroit supérieur', 'Longe la paroi pelvienne latérale',
      'Passe sous l’artère utérine à 1,5 cm du col («l’eau passe sous le pont»)', 'S’abouche dans la vessie au trigone'],
    note: 'Le croisement avec l’artère utérine est le danger de l’hystérectomie.',
  },
  'Artère utérine': {
    what: `Branche du tronc antérieur de l’artère iliaque interne, artère
      principale de l’utérus.`,
    course: ['Descend sur la paroi pelvienne latérale', 'Gagne le col dans la base du ligament large (paramètre)',
      'Croise l’uretère en avant et au-dessus de lui', 'Remonte en spirale le long du bord latéral de l’utérus'],
    branches: ['Rameaux cervico-vaginaux', 'Rameaux du corps', 'Rameau tubaire', 'Rameau ovarique, anastomosé avec l’artère ovarique'],
  },
  'Rectum': {
    what: `Dernier segment du gros intestin, de S3 au canal anal, appliqué
      contre la concavité du sacrum et du coccyx.`,
    near: ['En avant : l’utérus et le vagin, par le cul-de-sac recto-utérin (de Douglas)',
      'En arrière : le sacrum et le coccyx', 'En bas : le muscle élévateur de l’anus'],
    supplies: ['Artères rectales supérieure, moyennes et inférieures'],
  },
  'Ligament rond de l’utérus': {
    what: `Cordon fibro-musculaire qui part de la corne utérine, en avant et
      au-dessous de la trompe, chemine dans le ligament large jusqu’à
      l’anneau inguinal profond, traverse le canal inguinal et se termine
      dans la grande lèvre.`,
    note: `Il maintient l’antéversion. ${SCHEMA}`,
  },
  'Ligament propre de l’ovaire (utéro-ovarien)': {
    what: `Cordon qui relie l’extrémité utérine de l’ovaire à la corne utérine,
      en arrière et au-dessous de la trompe.`,
    note: SCHEMA,
  },
  'Ligament suspenseur de l’ovaire (lombo-ovarien)': {
    what: `Repli péritonéal qui relie l’extrémité tubaire de l’ovaire à la paroi
      pelvienne, au-dessus des vaisseaux iliaques externes.`,
    through: ['Artère et veine ovariques', 'Lymphatiques et nerfs de l’ovaire'],
    note: SCHEMA,
  },
  'Ligament utéro-sacré': {
    what: `Faisceau fibro-musculaire qui part de la face postérieure du col et de
      l’isthme, contourne le rectum latéralement et s’attache à la face
      antérieure du sacrum (S2–S3).`,
    note: `Il limite le cul-de-sac recto-utérin et tire le col en arrière. ${SCHEMA}`,
  },
  'Ligament cardinal (paramètre)': {
    what: `Condensation fibreuse de la base du ligament large, du bord latéral du
      col et du vagin vers la paroi pelvienne latérale. Moyen de fixité
      principal de l’utérus.`,
    through: ['Artère utérine', 'Uretère, sous l’artère'],
    note: SCHEMA,
  },
  'Ligament large': {
    what: `Repli péritonéal à deux feuillets tendu du bord latéral de l’utérus à
      la paroi pelvienne. La trompe occupe son bord libre supérieur.`,
    parts: ['Mésosalpinx, sous la trompe', 'Mésovarium, en arrière, qui porte l’ovaire', 'Mésomètre, le long de l’utérus'],
    through: ['Trompe utérine', 'Ligaments rond et propre de l’ovaire', 'Artère et veines utérines', 'Uretère, à sa base'],
    note: SCHEMA,
  },
  'Vagin': {
    what: `Conduit musculo-membraneux d’environ 8 cm, du col de l’utérus à la
      vulve, oblique en bas et en avant. Ses parois antérieure et postérieure
      sont au contact ; le col fait saillie dans son dôme, entouré des culs-de-sac
      vaginaux.`,
    near: ['En avant : la vessie puis l’urètre', 'En arrière : le cul-de-sac recto-utérin puis le rectum',
      'En bas : le muscle élévateur de l’anus'],
    note: SCHEMA,
  },
  'Urètre féminin': {
    what: `Conduit court (3 à 4 cm) du col de la vessie au méat urétral, dans le
      vestibule, en avant de l’orifice vaginal.`,
    near: ['En arrière : la paroi antérieure du vagin', 'En avant : la symphyse pubienne'],
    note: SCHEMA,
  },
  'Muscle pubo-coccygien (élévateur de l’anus)': {
    what: 'Partie antérieure et médiale du muscle élévateur de l’anus.',
    origin: ['Face postérieure du pubis', 'Partie antérieure de l’arc tendineux'],
    insertion: ['Ligament ano-coccygien et coccyx', 'Fibres pubo-rectales en sangle derrière le rectum'],
    action: ['Soutient les viscères pelviens', 'Continence anale'],
    note: FITTED,
  },
  'Muscle ilio-coccygien (élévateur de l’anus)': {
    what: 'Partie postérieure et latérale, mince, du muscle élévateur de l’anus.',
    origin: ['Arc tendineux du muscle élévateur de l’anus', 'Épine ischiatique'],
    insertion: ['Ligament ano-coccygien et coccyx'],
    note: FITTED,
  },
  'Muscle coccygien': {
    what: 'Muscle triangulaire du plancher pelvien, en arrière de l’élévateur de l’anus.',
    origin: ['Épine ischiatique'], insertion: ['Bords du sacrum et du coccyx'],
    note: FITTED,
  },
  'Muscle obturateur interne': {
    what: 'Muscle de la paroi latérale du petit bassin, qui sort par la petite incisure ischiatique.',
    origin: ['Face interne de la membrane obturatrice et de son pourtour'],
    insertion: ['Fosse trochantérique du fémur'],
    action: ['Rotation latérale de la cuisse'],
    nerve: ['Nerf de l’obturateur interne (L5–S2)'],
    note: FITTED,
  },
  'Muscle piriforme': {
    what: 'Muscle de la paroi postérieure du petit bassin, qui sort par la grande incisure ischiatique.',
    origin: ['Face antérieure du sacrum (S2–S4)'], insertion: ['Bord supérieur du grand trochanter'],
    action: ['Rotation latérale de la cuisse'],
    note: FITTED,
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
const centroid = (p) => {
  const c = [0, 0, 0];
  for (let i = 0; i < p.length; i += 3) { c[0] += p[i]; c[1] += p[i + 1]; c[2] += p[i + 2]; }
  return c.map((v) => v / (p.length / 3));
};
const add = (a, b) => a.map((v, k) => v + b[k]);
const sub = (a, b) => a.map((v, k) => v - b[k]);
const lerp = (a, b, t) => a.map((v, k) => v + (b[k] - v) * t);
const dist = (a, b) => Math.hypot(...sub(a, b));
const concat = (...arrays) => { const out = new Float32Array(arrays.reduce((n, a) => n + a.length, 0)); let at = 0; for (const a of arrays) { out.set(a, at); at += a.length; } return out; };

/** The vertex furthest along a direction, among those a filter keeps. */
function ext(p, d, keep = null) {
  let best = -Infinity, at = null;
  for (let i = 0; i < p.length; i += 3) {
    const x = p[i], y = p[i + 1], z = p[i + 2];
    if (keep && !keep(x, y, z)) continue;
    const s = x * d[0] + y * d[1] + z * d[2];
    if (s > best) { best = s; at = [x, y, z]; }
  }
  if (!at) throw new Error(`no vertex for direction ${d}`);
  return at;
}

/** Keeps the triangles whose three corners are inside a box. */
function crop(positions, indices, [lo, hi]) {
  const inside = (v) => [0, 1, 2].every((k) => positions[v * 3 + k] >= lo[k] && positions[v * 3 + k] <= hi[k]);
  const map = new Map(); const pos = []; const idx = [];
  for (let t = 0; t < indices.length; t += 3) {
    const tri = [indices[t], indices[t + 1], indices[t + 2]];
    if (!tri.every(inside)) continue;
    for (const v of tri) {
      if (!map.has(v)) { map.set(v, pos.length / 3); pos.push(positions[v * 3], positions[v * 3 + 1], positions[v * 3 + 2]); }
      idx.push(map.get(v));
    }
  }
  return { positions: Float32Array.from(pos), indices: Uint32Array.from(idx) };
}

function normals(positions, indices) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setIndex(new THREE.BufferAttribute(indices, 1));
  g.computeVertexNormals();
  return Float32Array.from(g.attributes.normal.array);
}

/**
 * A tube swept along a smooth path through `points`. The cross-section is an
 * ellipse: `a` across (towards `across`, the side unless told otherwise),
 * `b` the other way, each a number or a function of the way along (0..1).
 */
function sweep(points, a, b = a, { across = [1, 0, 0], rings = 48, sides = 14 } = {}) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'centripetal');
  const X = new THREE.Vector3(...across).normalize();
  const pos = []; const idx = [];
  const at = (f, t) => (typeof f === 'function' ? f(t) : f);
  for (let i = 0; i <= rings; i++) {
    const t = i / rings;
    const P = curve.getPointAt(t);
    const T = curve.getTangentAt(t).normalize();
    let L = X.clone().sub(T.clone().multiplyScalar(X.dot(T)));
    if (L.lengthSq() < 1e-6) L = new THREE.Vector3(0, 1, 0).sub(T.clone().multiplyScalar(T.y));
    L.normalize();
    const U = new THREE.Vector3().crossVectors(T, L).normalize();
    const ra = at(a, t), rb = at(b, t);
    for (let j = 0; j < sides; j++) {
      const th = (j / sides) * Math.PI * 2;
      const v = P.clone().addScaledVector(L, Math.cos(th) * ra).addScaledVector(U, Math.sin(th) * rb);
      pos.push(v.x, v.y, v.z);
    }
  }
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < sides; j++) {
      const a0 = i * sides + j, a1 = i * sides + ((j + 1) % sides);
      const b0 = a0 + sides, b1 = a1 + sides;
      idx.push(a0, b0, a1, a1, b0, b1);
    }
  }
  // The two ends closed, so a cut tube is not a hollow sleeve.
  for (const [ring, flip] of [[0, true], [rings, false]]) {
    const c = curve.getPointAt(ring / rings);
    const ci = pos.length / 3; pos.push(c.x, c.y, c.z);
    for (let j = 0; j < sides; j++) {
      const p0 = ring * sides + j, p1 = ring * sides + ((j + 1) % sides);
      if (flip) idx.push(ci, p1, p0); else idx.push(ci, p0, p1);
    }
  }
  return { positions: Float32Array.from(pos), indices: Uint32Array.from(idx) };
}

/** A sheet spanned by its four edges (a Coons patch), both faces drawn. */
function sheet(top, bottom, near, far, nu = 18, nv = 12) {
  // top(u), bottom(u): u from the uterus (0) to the wall (1); near(v), far(v): v from the bottom (0) to the top (1).
  const C = (pts) => new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)), false, 'centripetal');
  const T = C(top), B = C(bottom), N = C(near), F = C(far);
  const P00 = B.getPointAt(0), P10 = B.getPointAt(1), P01 = T.getPointAt(0), P11 = T.getPointAt(1);
  const pos = []; const idx = [];
  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    for (let i = 0; i <= nu; i++) {
      const u = i / nu;
      const s = B.getPointAt(u).multiplyScalar(1 - v).add(T.getPointAt(u).multiplyScalar(v))
        .add(N.getPointAt(v).multiplyScalar(1 - u)).add(F.getPointAt(v).multiplyScalar(u))
        .sub(P00.clone().multiplyScalar((1 - u) * (1 - v))).sub(P10.clone().multiplyScalar(u * (1 - v)))
        .sub(P01.clone().multiplyScalar((1 - u) * v)).sub(P11.clone().multiplyScalar(u * v));
      pos.push(s.x, s.y, s.z);
    }
  }
  const w = nu + 1;
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = j * w + i, b = a + 1, c = a + w, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  return { positions: Float32Array.from(pos), indices: Uint32Array.from(idx) };
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
const raw = new Map();          // HRA node (as named) → world positions, for measuring
const put = (system, item) => {
  if (!systems.has(system)) systems.set(system, []);
  systems.get(system).push(item);
};

for (const path of SOURCES) {
  const file = path.split('/').pop();
  const local = join(CACHE, file);
  if (!existsSync(local)) {
    const res = await fetch(`${CDN}/${path}`);
    if (!res.ok) throw new Error(`${file}: ${res.status}`);
    writeFileSync(local, Buffer.from(await res.arrayBuffer()));
  }
  const data = readFileSync(local);
  const gltf = await new Promise((ok, fail) => loader.parse(
    data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength), '', ok, fail));
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    const name = [o.name, o.parent?.name].find((n) => n && /^VH_F_/.test(n)) || o.name;
    const g = o.geometry.index ? o.geometry : o.geometry.clone().setIndex(
      [...Array(o.geometry.attributes.position.count).keys()]);
    const pos = g.attributes.position;
    let positions = new Float32Array(pos.count * 3);
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld);
      positions[i * 3] = v.x; positions[i * 3 + 1] = v.y; positions[i * 3 + 2] = v.z;
    }
    let indices = Uint32Array.from(g.index.array);
    raw.set(name, positions);
    const key = plain(name);
    if (!PARTS[key]) return;
    if (CROP[key]) ({ positions, indices } = crop(positions, indices, CROP[key]));
    if (!indices.length) return;
    const [system, kind, french] = PARTS[key];
    put(system, { n: french, s: sideOf(name), k: kind, b: key, positions, indices });
  });
  console.log(`${file.padEnd(38)} read`);
}

const need = (name) => { const p = raw.get(name); if (!p) throw new Error(`missing ${name}`); return p; };

// ------------------------------------------------- her pelvis, and Z-Anatomy's

const hraHipL = concat(need('VH_F_ilium_compact_bone_L'), need('VH_F_ischium_compact_bone_L'), need('VH_F_pubis_compact_bone_L'));
const hraHipR = concat(need('VH_F_ilium_compact_bone_R'), need('VH_F_ischium_compact_bone_R'), need('VH_F_pubis_compact_bone_R'));
const hraSac = need('VH_F_sacrum');
const hraCoc = need('VH_F_coccyx');

const metres = (p) => Float32Array.from(p, (x) => x * 0.01);
const mirrorX = (p) => { const q = Float32Array.from(p); for (let i = 0; i < q.length; i += 3) q[i] = -q[i]; return q; };
const flipWinding = (idx) => { const o = Uint32Array.from(idx); for (let t = 0; t < o.length; t += 3) { o[t + 1] = idx[t + 2]; o[t + 2] = idx[t + 1]; } return o; };

const zSkel = meshesOf(join(ZFBX, 'SkeletalSystem100.fbx'));
const zHipL = metres(zSkel.get('Hip bone.l').positions);
const zHipR = mirrorX(zHipL);
const zSac = metres(zSkel.get('Sacrum').positions);
const zCoc = metres(zSkel.get('Coccyx').positions);

/** Thirteen landmarks a pelvis carries, found the same way on both. */
function landmarks(hipL, hipR, sac, coc) {
  const both = concat(hipL, hipR);
  const [lo, hi] = boxOf(both);
  const mid = (lo[0] + hi[0]) / 2;
  const near = (x) => Math.abs(x - mid) < 0.012;
  const sacTop = boxOf(sac)[1][1];
  return {
    asisL: ext(hipL, [0.25, 0.35, 1]), asisR: ext(hipR, [-0.25, 0.35, 1]),
    crestL: ext(hipL, [0, 1, 0]), crestR: ext(hipR, [0, 1, 0]),
    tuberL: ext(hipL, [0.15, -1, -0.25]), tuberR: ext(hipR, [-0.15, -1, -0.25]),
    sideL: ext(hipL, [1, 0.1, 0]), sideR: ext(hipR, [-1, 0.1, 0]),
    symTop: ext(both, [0, 1, 0.4], (x) => near(x)),
    symBottom: ext(both, [0, -1, 0.3], (x) => near(x)),
    promontory: ext(sac, [0, 0.35, 1], (x, y) => y > sacTop - 0.035),
    coccyx: ext(coc, [0, -1, 0.4]),
    sacBack: ext(sac, [0, 0, -1]),
    mid,
  };
}
const her = landmarks(hraHipL, hraHipR, hraSac, hraCoc);
const his = landmarks(zHipL, zHipR, zSac, zCoc);
const KEYS = Object.keys(her).filter((k) => k !== 'mid');

// A scale and a shift per axis, by least squares over the landmarks.
const fit = [0, 1, 2].map((k) => {
  const xs = KEYS.map((key) => his[key][k]), ys = KEYS.map((key) => her[key][k]);
  const mx = xs.reduce((a, b) => a + b) / xs.length, my = ys.reduce((a, b) => a + b) / ys.length;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < xs.length; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const a = sxy / sxx;
  return [a, my - a * mx];
});
const residual = Math.sqrt(KEYS.reduce((s, key) => s + dist(her[key], [0, 1, 2].map((k) => fit[k][0] * his[key][k] + fit[k][1])) ** 2, 0) / KEYS.length);
console.log(`landmarks: scale ${fit.map(([a]) => a.toFixed(3)).join(' / ')}, residual ${(residual * 1000).toFixed(1)} mm`);

// …then refined on the surfaces themselves: every sampled point of his pelvis
// is paired with the nearest point of hers and the whole map re-solved
// (affine, so a pelvis tilted a few degrees more than the other is followed),
// fifteen times over. Pairs further apart than 2 cm are not trusted.
let A = [0, 1, 2].map((k) => { const row = [0, 0, 0, fit[k][1]]; row[k] = fit[k][0]; return row; });
const apply = (M, x, y, z) => M.map((r) => r[0] * x + r[1] * y + r[2] * z + r[3]);
{
  const herPts = concat(hraHipL, hraHipR, hraSac, hraCoc);
  const hisAll = concat(zHipL, zHipR, zSac, zCoc);
  const CELL = 0.008;
  const keyOf = (x, y, z) => `${Math.floor(x / CELL)},${Math.floor(y / CELL)},${Math.floor(z / CELL)}`;
  const grid = new Map();
  for (let i = 0; i < herPts.length; i += 3) {
    const k = keyOf(herPts[i], herPts[i + 1], herPts[i + 2]);
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(i);
  }
  const nearest = (x, y, z) => {
    const cx = Math.floor(x / CELL), cy = Math.floor(y / CELL), cz = Math.floor(z / CELL);
    let best = null, bd = Infinity;
    for (let r = 0; r <= 3 && bd > (r - 1) * CELL * ((r - 1) * CELL); r++) {
      for (let i = -r; i <= r; i++) for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) {
        if (Math.max(Math.abs(i), Math.abs(j), Math.abs(k)) !== r) continue;
        for (const at of grid.get(`${cx + i},${cy + j},${cz + k}`) || []) {
          const d = (herPts[at] - x) ** 2 + (herPts[at + 1] - y) ** 2 + (herPts[at + 2] - z) ** 2;
          if (d < bd) { bd = d; best = at; }
        }
      }
    }
    return best == null ? null : [herPts[best], herPts[best + 1], herPts[best + 2], Math.sqrt(bd)];
  };
  const step = Math.max(1, Math.floor(hisAll.length / 3 / 5000));
  const solve4 = (M, v) => {   // Gaussian elimination, 4×4
    const a = M.map((r, i) => [...r, v[i]]);
    for (let c = 0; c < 4; c++) {
      let p = c; for (let r = c + 1; r < 4; r++) if (Math.abs(a[r][c]) > Math.abs(a[p][c])) p = r;
      [a[c], a[p]] = [a[p], a[c]];
      for (let r = 0; r < 4; r++) if (r !== c) { const f = a[r][c] / a[c][c]; for (let k = c; k < 5; k++) a[r][k] -= f * a[c][k]; }
    }
    return a.map((r, i) => r[4] / r[i]);
  };
  for (let it = 0; it < 15; it++) {
    const XtX = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    const XtY = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let n = 0, sum = 0;
    for (let i = 0; i < hisAll.length; i += 3 * step) {
      const src = [hisAll[i], hisAll[i + 1], hisAll[i + 2], 1];
      const q = apply(A, src[0], src[1], src[2]);
      const h = nearest(q[0], q[1], q[2]);
      if (!h || h[3] > 0.02) continue;
      n++; sum += h[3];
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) XtX[r][c] += src[r] * src[c];
      for (let k = 0; k < 3; k++) for (let c = 0; c < 4; c++) XtY[k][c] += h[k] * src[c];
    }
    if (it === 0 || it === 14) console.log(`surface fit ${it}: ${n} pairs, mean ${(sum / n * 1000).toFixed(1)} mm`);
    A = [0, 1, 2].map((k) => solve4(XtX, XtY[k]));
  }
}
const place = (p) => { const q = new Float32Array(p.length); for (let i = 0; i < p.length; i += 3) { const v = apply(A, p[i], p[i + 1], p[i + 2]); q[i] = v[0]; q[i + 1] = v[1]; q[i + 2] = v[2]; } return q; };

for (const [file, wanted] of Object.entries(FROM_Z)) {
  const all = meshesOf(join(ZFBX, `${file}.fbx`));
  for (const [base, [system, kind, french]] of Object.entries(wanted)) {
    const sides = ['l', 'r'].filter((s) => all.has(`${base}.${s}`));
    if (!sides.length) throw new Error(`Z-Anatomy has no ${base}`);
    for (const s of ['l', 'r']) {
      let positions, indices;
      if (all.has(`${base}.${s}`)) {
        const m = all.get(`${base}.${s}`); positions = metres(m.positions); indices = Uint32Array.from(m.indices);
      } else {
        // Only one side drawn: the other is its mirror, wound the other way.
        const m = all.get(`${base}.${sides[0]}`); positions = mirrorX(metres(m.positions)); indices = flipWinding(m.indices);
      }
      put(system, { n: french, s, k: kind, b: base.replace(/\s+/g, '_').toLowerCase(), positions: place(positions), indices });
    }
  }
}

// ------------------------------------------------ what no atlas segments
const uterusAll = concat(need('VH_F_body_of_uterus'), need('VH_F_fundus_of_uterus'), need('VH_F_cervix'), need('VH_F_lower_uterine_segment'));
const uMid = centroid(need('VH_F_body_of_uterus'));
const cornua = need('VH_F_cornua');
const half = (p, sign) => { const out = []; for (let i = 0; i < p.length; i += 3) if ((p[i] - uMid[0]) * sign > 0) out.push(p[i], p[i + 1], p[i + 2]); return Float32Array.from(out); };
const cervix = centroid(need('VH_F_cervix'));
const extOs = centroid(need('VH_F_external_cervical_os'));
const neck = centroid(need('VH_F_urinary_bladder_neck_smooth_muscle'));
const rectum = need('VH_F_rectum');
const sacMid = (() => { const [lo, hi] = boxOf(hraSac); return lo[1] + (hi[1] - lo[1]) * 0.45; })();

// The vestibule: behind and below the symphysis, where the vagina and the
// urethra open.
const vestibule = add(her.symBottom, [0, -0.016, -0.03]);

const schematic = [];
for (const [side, sign] of [['l', 1], ['r', -1]]) {
  const hip = side === 'l' ? hraHipL : hraHipR;
  const S = side === 'l' ? 'L' : 'R';
  const cornu = centroid(half(cornua, sign));
  const ovaryPts = need(side === 'l' ? 'VH_F_left_ovary' : 'VH_F_right_ovary');
  const ovaryUterine = ext(ovaryPts, sub(cornu, centroid(ovaryPts)));
  const ovaryTubal = ext(ovaryPts, sub(centroid(ovaryPts), cornu));
  const asis = side === 'l' ? her.asisL : her.asisR;
  const tubercle = add(her.symTop, [sign * 0.022, -0.003, 0.002]);
  const deepRing = add(lerp(asis, tubercle, 0.5), [0, 0.012, -0.014]);
  // The pelvic wall, inside: the most medial point of the hip bone at a height
  // and a depth.
  const wall = (y, z) => ext(hip, [-sign, 0, 0], (x, yy, zz) => Math.abs(yy - y) < 0.01 && Math.abs(zz - z) < 0.02);
  const brim = wall(her.promontory[1] - 0.02, ovaryTubal[2]);
  const cardinalWall = wall(cervix[1], cervix[2]);
  const sacral = ext(hraSac, [sign * 0.35, 0, 1], (x, y) => Math.abs(y - sacMid) < 0.01);
  const rectumSide = ext(rectum, [sign, 0, 0], (x, y) => Math.abs(y - (cervix[1] + 0.005)) < 0.01);
  const tubePath = ['isthmus_of_fallopian_tube', 'ampulla_of_uterine_tube', 'uterine_tube_infundibulum']
    .map((n) => centroid(need(`VH_F_${n}_${S}`)));

  schematic.push(
    // Drawn as far as the deep inguinal ring, where it leaves the pelvis for
    // the inguinal canal.
    ['ligaments', 'ligament', 'Ligament rond de l’utérus', 'round_ligament', sweep(
      [add(cornu, [0, -0.004, 0.006]), add(lerp(cornu, deepRing, 0.45), [sign * 0.008, -0.008, 0.002]), deepRing], 0.0024)],
    ['ligaments', 'ligament', 'Ligament propre de l’ovaire (utéro-ovarien)', 'ovarian_ligament', sweep(
      [add(cornu, [0, -0.005, -0.006]), lerp(add(cornu, [0, -0.005, -0.006]), ovaryUterine, 0.5), ovaryUterine], 0.0019)],
    // Over the pelvic brim, then up with the ovarian vessels towards the
    // lumbar region, bending in as they do.
    ['ligaments', 'ligament', 'Ligament suspenseur de l’ovaire (lombo-ovarien)', 'suspensory_ligament', sweep(
      [ovaryTubal, add(lerp(ovaryTubal, brim, 0.6), [0, 0.006, 0]), add(brim, [sign * -0.006, 0.018, -0.004]), add(brim, [sign * -0.016, 0.04, -0.01])], 0.0026)],
    ['ligaments', 'ligament', 'Ligament utéro-sacré', 'uterosacral_ligament', sweep(
      [add(cervix, [sign * 0.008, 0.006, -0.009]), add(rectumSide, [sign * 0.006, 0, 0.004]), add(sacral, [0, 0, 0.004])], 0.0032)],
    ['ligaments', 'ligament', 'Ligament cardinal (paramètre)', 'cardinal_ligament', sweep(
      [add(cervix, [sign * 0.01, 0, 0]), lerp(add(cervix, [sign * 0.01, 0, 0]), cardinalWall, 0.5), add(cardinalWall, [sign * -0.002, 0, 0])],
      (t) => 0.0058 - 0.0015 * t, 0.0026, { across: [0, 1, 0] })],
  );

  // The broad ligament: from the side of the uterus to the wall, the tube in
  // its upper edge.
  const margin = (y) => add(ext(uterusAll, [sign, 0, 0], (x, yy) => Math.abs(yy - y) < 0.004), [sign * 0.001, 0, 0]);
  const top = [add(cornu, [sign * 0.002, 0, 0]), ...tubePath];
  const bottom = [add(cervix, [sign * 0.011, 0.004, 0]), lerp(add(cervix, [sign * 0.011, 0.004, 0]), cardinalWall, 0.5), add(cardinalWall, [sign * -0.003, 0.004, 0])];
  const nearEdge = [bottom[0], margin(lerp(bottom[0], top[0], 0.35)[1]), margin(lerp(bottom[0], top[0], 0.7)[1]), top[0]];
  const farEdge = [bottom[2], lerp(bottom[2], top[top.length - 1], 0.5), top[top.length - 1]];
  schematic.push(['peritoine', 'fascia', 'Ligament large', 'broad_ligament', sheet(top, bottom, nearEdge, farEdge)]);
}

// The vagina, from the cervix down and forward to the vestibule: wide at its
// vault round the cervix, flat below where its walls touch.
const vault = add(extOs, [0, 0.004, -0.004]);
schematic.push(['genital', 'mucosa', 'Vagin', 'vagina', sweep(
  [vault, add(lerp(vault, vestibule, 0.5), [0, 0, -0.006]), vestibule],
  (t) => 0.016 - 0.005 * t, (t) => Math.max(0.0045, 0.012 - 0.016 * t))]);
schematic.push(['vessie', 'urine', 'Urètre féminin', 'urethra', sweep(
  [neck, add(lerp(neck, add(vestibule, [0, 0.004, 0.02]), 0.5), [0, 0, 0.002]), add(vestibule, [0, 0.004, 0.02])], 0.0028)]);
console.log(`vagina ${(dist(vault, vestibule) * 100).toFixed(1)} cm, urethra ${(dist(neck, add(vestibule, [0, 0.004, 0.02])) * 100).toFixed(1)} cm`);

for (const [system, kind, french, b, g] of schematic) put(system, { n: french, s: null, k: kind, b, ...g });
// The paired ones carry their side, in the order they were made: left, right.
const seen = new Map();
for (const item of systems.get('ligaments') || []) {
  if (!/^(round|ovarian|suspensory|uterosacral|cardinal)_ligament$/.test(item.b)) continue;
  item.s = seen.has(item.b) ? 'r' : 'l'; seen.set(item.b, true);
}
for (const item of systems.get('peritoine') || []) { item.s = seen.has(item.b) ? 'r' : 'l'; seen.set(item.b, true); }

// ------------------------------------------------------------------- writing

for (const f of readdirSync(OUT)) unlinkSync(join(OUT, f));
const index = { layers: {}, regions: {} };
const grow = (box, b) => (box
  ? [box[0].map((x, k) => Math.min(x, b[0][k])), box[1].map((x, k) => Math.max(x, b[1][k]))]
  : [b[0].slice(), b[1].slice()]);
const boxes = {};

for (const [system, items] of systems) {
  items.sort((a, b) => a.n.localeCompare(b.n, 'fr'));
  const meshes = [];
  const manifest = [];
  const described = {};
  for (const [i, item] of items.entries()) {
    const id = `${system.slice(0, 3)}${i}`;
    meshes.push({ id, positions: item.positions, normals: normals(item.positions, item.indices), indices: item.indices });
    const box = boxOf(item.positions);
    boxes[system] = grow(boxes[system], box);
    const c = centroid(item.positions).map((v) => Math.round(v * 1000) / 1000);
    manifest.push({ id, n: item.n, s: item.s, k: item.k, b: item.b, r: 'pelvis', c });
    if (DESCRIPTIONS[item.n]) described[item.b] = { note: DESCRIPTIONS[item.n] };
  }
  writeFileSync(join(TMP, `${system}.raw.glb`), glb(meshes));
  // The skin is a scan surface full of small bumps, which the careful
  // simplifier will not flatten; it is told to reach the ratio regardless.
  const hard = system === 'peau' ? ['-sa'] : [];
  execFileSync(process.execPath, [GLTFPACK, '-i', `${system}.raw.glb`, '-o', `${system}.glb`, '-cc', '-kn', '-si', String(RATIO[system]), ...hard],
    { stdio: 'inherit', cwd: TMP });
  renameSync(join(TMP, `${system}.glb`), join(OUT, `${system}.glb`));
  writeFileSync(join(OUT, `${system}.json`), JSON.stringify({ system, items: manifest }));
  writeFileSync(join(OUT, `${system}.defs.json`), JSON.stringify(Object.fromEntries(
    Object.entries(described).map(([k, v]) => [k, { note: Object.fromEntries(Object.entries(v.note).map(([a, b]) => [a, typeof b === 'string' ? b.replace(/\s+/g, ' ').trim() : b])) }]))));
  index.layers[system] = { bytes: statSync(join(OUT, `${system}.glb`)).size, count: items.length };
  console.log(`${system.padEnd(10)} ${String(items.length).padStart(3)} structures  ${(statSync(join(OUT, `${system}.glb`)).size / 1e6).toFixed(2)} MB`);
}

const round = (b) => b.map((v) => v.map((x) => Math.round(x * 1000) / 1000));
index.regions = {
  corps: round(grow(boxes.bassin, boxes.peau)),
  pelvis: round(boxes.bassin),
  genital: round(grow(boxes.genital, boxes.vessie)),
};
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index));
console.log(index.regions);
