// The whole body, in systems.
//
// The regional models answer «what is in the arm»; this answers what a
// dissection answers — what lies under what. Every system is its own file,
// fetched the first time it is switched on, so opening the body costs the
// skeleton and nothing else. The files are cut by scripts/carve-body.mjs out
// of Z-Anatomy (CC BY-SA 4.0, after BodyParts3D © DBCLS, CC BY 4.0).
//
// System names are anatomy, so they are French in both interfaces.

export const BODY_CREDIT =
  'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science · définitions : Wikipédia, CC BY-SA';

/**
 * Drawn from the outside in. `on` is what the body opens with; `see` is how
 * opaque a system starts when it is switched on — the skin starts faint, so
 * switching it on shows the body's outline rather than a mannequin.
 */
export const LAYERS = [
  { id: 'peau', name: 'Peau et régions', on: false, see: 0.3, tint: 'skin' },
  { id: 'fascias', name: 'Fascias, bourses et gaines', on: false, see: 0.55, tint: 'fascia' },
  { id: 'muscles', name: 'Muscles', on: false, see: 1, tint: 'muscle' },
  { id: 'arteres', name: 'Artères', on: false, see: 1, tint: 'artery' },
  { id: 'veines', name: 'Veines', on: false, see: 1, tint: 'vein' },
  { id: 'nerfs', name: 'Nerfs', on: false, see: 1, tint: 'nerve' },
  { id: 'lymphe', name: 'Système lymphatique', on: false, see: 1, tint: 'lymph' },
  { id: 'organes', name: 'Viscères et organes des sens', on: false, see: 1, tint: 'gut' },
  { id: 'snc', name: 'Encéphale et moelle spinale', on: false, see: 1, tint: 'brain' },
  { id: 'articulations', name: 'Articulations et ligaments', on: false, see: 1, tint: 'ligament' },
  // Where each muscle holds on: origins in red, terminations in blue, the
  // way an atlas colours them on the bone.
  { id: 'insertions', name: 'Insertions musculaires', on: false, see: 1, tint: 'origin' },
  { id: 'squelette', name: 'Squelette', on: true, see: 1, tint: 'bone' },
];

export const layerOf = (id) => LAYERS.find((l) => l.id === id) || null;

/**
 * Ready-made dissections: which systems, and how see-through each is.
 * A study plan in one tap — the nerves of a limb are read against the bones
 * and with the muscles thinned, not alone on a white page.
 */
export const VIEWS = [
  { id: 'os', name: 'Ostéologie', layers: { squelette: 1 } },
  { id: 'myo', name: 'Myologie', layers: { squelette: 1, muscles: 1 } },
  { id: 'neuro', name: 'Nerfs', layers: { squelette: 1, muscles: 0.18, nerfs: 1 } },
  { id: 'vasc', name: 'Vaisseaux', layers: { squelette: 1, muscles: 0.18, arteres: 1, veines: 1 } },
  { id: 'splanch', name: 'Splanchnologie', layers: { squelette: 0.35, organes: 1, lymphe: 1 } },
  { id: 'neuroc', name: 'Neuro-anatomie', layers: { squelette: 0.25, snc: 1, nerfs: 1 } },
  { id: 'arthro', name: 'Arthrologie', layers: { squelette: 1, articulations: 1 } },
  { id: 'tout', name: 'Tout', layers: { squelette: 1, muscles: 1, arteres: 1, veines: 1, nerfs: 1, organes: 1, lymphe: 1, snc: 1, articulations: 1 } },
  { id: 'surface', name: 'Anatomie de surface', layers: { peau: 0.85, muscles: 1, squelette: 1 } },
];

/** Plate colours, after lib/anatomy/tissue.js, plus what only a body has. */
export const TINT = {
  bone: '#E8E1D2', tooth: '#F6F2E8', cartilage: '#D6DEE4', disc: '#C9CFC2',
  muscle: '#A83236', tendon: '#EDE7DA', fascia: '#D8D2C4', bursa: '#B8D4E6',
  nerve: '#E3C244', artery: '#C0392B', vein: '#2E6DA8', sinus: '#1E3F66',
  brain: '#D6BFB8', grey: '#9E8C93', csf: '#7FB8D8',
  lung: '#D6A9A2', heart: '#9E3B3B', liver: '#8C5A3C', gut: '#C9A06B', gland: '#B5757E',
  kidney: '#9B4B4B', urine: '#D8C98A', gonad: '#C08A8A', erectile: '#B05C6B',
  mucosa: '#D98C8C', eye: '#EDEAE4', lymph: '#7FB07A', spleen: '#7A2E3A',
  ligament: '#E4DCC8', skin: '#D8A98A', hair: '#3B2A20', nail: '#EAD7CB',
  origin: '#D2443A', insertion: '#2F6FD0',
  uterus: '#C98A8F', tube: '#D9A3A0', fat: '#E8C77A', duct: '#C7A2B8', cord: '#B9C9D6',
};

/**
 * The camera's ready places. The boxes are measured on the skeleton when the
 * body is carved (public/anatomy/body/index.json); these are the names.
 */
export const REGIONS = [
  { id: 'corps', name: 'Corps entier' },
  { id: 'tete', name: 'Tête' },
  { id: 'cou', name: 'Cou' },
  { id: 'thorax', name: 'Thorax' },
  { id: 'abdomen', name: 'Abdomen' },
  { id: 'bassin', name: 'Bassin' },
  { id: 'membre-sup', name: 'Membre supérieur' },
  { id: 'membre-inf', name: 'Membre inférieur' },
];

/** The side, said without agreeing with a noun: «— côté droit». */
export const SIDE = { l: 'côté gauche', r: 'côté droit' };
export const fullName = (item) => (item.s ? `${item.n} — ${SIDE[item.s]}` : item.n);

/**
 * The headings of a written description, in the order it is read. A copy of
 * the list in notes.js: importing that file would put every description of
 * every regional model into the body's download.
 */
export const BODY_SECTIONS = [
  ['parts', 'Parties'], ['relief', 'Reliefs'], ['origin', 'Origine'], ['course', 'Trajet'],
  ['exit', 'Sortie du crâne'], ['insertion', 'Insertion'], ['nerve', 'Innervation'],
  ['action', 'Action'], ['branches', 'Branches'], ['tributaries', 'Affluents'],
  ['supplies', 'Territoire'], ['ends', 'Terminaison'], ['joints', 'Articulations'],
  ['muscles', 'Insertions musculaires'], ['through', 'Éléments qui le traversent'], ['near', 'Rapports'],
];

/** Which look a tissue borrows from lib/anatomy/material.js. */
export const LOOK_OF = {
  tooth: 'bone', fascia: 'tendon', bursa: 'csf', mucosa: 'gland', eye: 'cartilage',
  lymph: 'gland', spleen: 'liver', ligament: 'tendon', skin: 'brain', hair: 'bone', nail: 'cartilage',
  origin: 'gland', insertion: 'gland',
};

/** Thin things a thumb misses: a tap that lands beside one still takes it. */
export const THIN = new Set(['nerfs', 'arteres', 'veines', 'lymphe']);

/** Accent- and case-blind, for searching French names typed on a phone. */
export const fold = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’']/g, ' ').toLowerCase().trim();

// ------------------------------------------------------------------ the sets

/** Inside to outside, for blending see-through systems over what is under them. */
const BODY_DEPTH = ['squelette', 'insertions', 'articulations', 'snc', 'organes', 'lymphe', 'veines', 'arteres', 'nerfs', 'muscles', 'fascias', 'peau'];

export const BODY = {
  id: 'corps', root: '/anatomy/body', title: 'Le corps entier', credit: BODY_CREDIT,
  layers: LAYERS, views: VIEWS, regions: REGIONS, depth: BODY_DEPTH,
  // It opens dressed: the skeleton alone looked like a skeleton, not a body.
  start: 'myo', home: 'corps', all: 'corps', quizLayer: 'squelette',
};

/**
 * Female anatomy. Neither of the body's sources has any — both are one male
 * body — so the organs come from the Human Reference Atlas (HuBMAP), segmented
 * from the Visible Human Female and placed where she has them: the uterus and
 * its adnexa with the bladder in front, the rectum behind, the ureters and the
 * pelvic vessels at the sides, inside her pelvis and under the skin of her
 * hips. The walls and the floor are Z-Anatomy's, fitted to her pelvis; the
 * uterus's ligaments, the vagina and the urethra are drawn between their
 * attachments (scripts/carve-feminin.mjs). A separate body, so a separate set:
 * it is never drawn inside the male one.
 */
export const FEMALE = {
  id: 'feminin', root: '/anatomy/feminin', title: 'Le petit bassin féminin',
  credit: 'Human Reference Atlas (HuBMAP), CC BY 4.0, d’après le Visible Human Project (NLM) · plancher pelvien : Z-Anatomy, CC BY-SA 4.0',
  layers: [
    { id: 'peau', name: 'Peau', on: false, see: 0.2, tint: 'skin' },
    { id: 'peritoine', name: 'Ligament large', on: true, see: 0.4, tint: 'fascia' },
    { id: 'genital', name: 'Utérus, trompes, ovaires, vagin', on: true, see: 1, tint: 'uterus' },
    { id: 'vessie', name: 'Vessie, uretères, urètre', on: true, see: 1, tint: 'urine' },
    { id: 'intestin', name: 'Rectum et côlon sigmoïde', on: true, see: 1, tint: 'gut' },
    { id: 'vaisseaux', name: 'Vaisseaux pelviens', on: true, see: 1, tint: 'artery' },
    { id: 'ligaments', name: 'Ligaments', on: true, see: 1, tint: 'ligament' },
    { id: 'plancher', name: 'Muscles du bassin', on: true, see: 1, tint: 'muscle' },
    { id: 'bassin', name: 'Bassin osseux', on: true, see: 1, tint: 'bone' },
  ],
  views: [
    { id: 'pelvis', name: 'Petit bassin', layers: { peritoine: 0.4, genital: 1, vessie: 1, intestin: 1, vaisseaux: 1, ligaments: 1, plancher: 1, bassin: 1 } },
    { id: 'fixite', name: 'Moyens de fixité', layers: { genital: 1, vessie: 1, intestin: 1, ligaments: 1, peritoine: 0.5, bassin: 0.5 } },
    { id: 'organes', name: 'Organes', layers: { genital: 1, vessie: 1, intestin: 1, vaisseaux: 1 } },
    { id: 'plancher', name: 'Plancher pelvien', layers: { plancher: 1, ligaments: 1, bassin: 1, intestin: 1, genital: 1, vessie: 1 } },
  ],
  regions: [
    { id: 'corps', name: 'Tout' }, { id: 'pelvis', name: 'Pelvis' }, { id: 'genital', name: 'Utérus et annexes' },
  ],
  depth: ['bassin', 'plancher', 'ligaments', 'vaisseaux', 'intestin', 'vessie', 'genital', 'peritoine', 'peau'],
  start: 'pelvis', home: 'pelvis', all: 'corps', quizLayer: 'genital',
};

export const SETS = { corps: BODY, feminin: FEMALE };
