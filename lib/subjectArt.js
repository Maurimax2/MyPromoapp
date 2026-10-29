// Which model stands for a subject, and on what colour.
//
// Read off the subject's name rather than kept in a table of names, because
// the names are not ours: the panel is where subjects are created, the same
// subject is typed three ways in three years ("ANATOMIE PATHOLOGIQUE",
// "Anatomopathologie"), and DCEM3 and DCEM4 have not been catalogued yet.
// Matching on what the name is *about* means a subject added tonight arrives
// with the right model, and nobody has to remember to come back here.
//
// Order matters, most specific first: "Sémiologie cardiologique" is a heart
// before it is a ribcage, "Anatomie pathologique" is pathology before it is
// anatomy, and "Pathologies digestives chirurgicales" is surgery on the
// colon before it is the stomach.
//
// The pictures are rendered from the app's own anatomy models (BodyParts3D,
// public/anatomy) or built for the subjects that have no body part — see
// scripts/render-models.mjs. None of them is clay: clay means "this needs
// you", and a subject never does just by existing.

const RULES = [
  [/anat\w*\s*patho|anapath|anatomopath/, 'reins'],
  [/cardio/, 'coeur'],
  [/pneumo|respirat/, 'poumons'],
  [/neuro|psychiat/, 'encephale'],
  [/radiolog|imagerie/, 'radiologie'],
  [/hemato/, 'globules'],
  [/immuno/, 'anticorps'],
  [/virolog/, 'virus'],
  [/bacterio|microbio/, 'bacteries'],
  [/parasito|mycolog/, 'parasite'],
  [/infecti/, 'infection'],
  [/pharmaco|therapeut/, 'gelules'],
  [/chirurg\w*.*digest|digest\w*.*chirurg/, 'colon'],
  [/digest|gastro|hepato/, 'digestif'],
  [/endocrin|diabet/, 'pancreas'],
  [/medecine interne|interne/, 'organes'],
  // Two subjects, two pictures: the kidneys are nephrology; the whole urinary
  // tract — kidneys, ureters, bladder — is urology.
  [/urolog/, 'vessie'],
  [/nephro/, 'reins'],
  [/semiolog/, 'thorax'],
  [/biochim/, 'molecule'],
  [/genetiq|biologie/, 'chromosomes'],
  [/biophys/, 'membrane'],
  [/biostat|statist|epidemio|informati|mathemat/, 'graphique'],
  [/sante|hygiene|legale/, 'hopital'],
  [/anglais|english|francais|langue|terminolog/, 'langue'],
  // Women's health is the female reproductive system, which is built, not
  // carved: the anatomy sources are a male reference body.
  [/gyneco|obstetr/, 'gyneco'],
  [/embryo|pediat|neonat/, 'morula'],
  [/histolog|dermato/, 'cellules'],
  [/physio/, 'encephale'],
  [/rhumato|orthop|traumato/, 'colonne'],
  [/anatom\w*\s*(s2|2|ii)\b/, 'tete'],
  [/anatom|osteo/, 'crane'],
];

// Each picture's ground: deep and muted, so the model is the bright thing on
// the card. Repeats are fine across years; within one year no two neighbours
// share one.
const GROUND = {
  crane: '#2A5B3E', tete: '#1F4E4A', coeur: '#6B3A2E', poumons: '#34495A',
  encephale: '#3E4A63', reins: '#5B4636', molecule: '#6E5634', morula: '#8A6A14',
  cellules: '#4B5B3A', membrane: '#243B52', chromosomes: '#34495A', langue: '#14555F',
  hopital: '#1F4E4A', graphique: '#6B3A2E', thorax: '#3E4A63', globules: '#243B52',
  anticorps: '#14555F', bacteries: '#4B5B3A', virus: '#5B4636', gelules: '#2A5B3E',
  parasite: '#6E5634', infection: '#34495A', digestif: '#8A6A14', colon: '#6B3A2E',
  pancreas: '#5B4636', radiologie: '#16222B', organes: '#2A5B3E', colonne: '#34495A',
  gyneco: '#7A3A4C', vessie: '#2F5560',
};

const plain = (s = '') => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, ' ').trim();

/** The model and colour for a subject name. Never throws, never empty. */
export function artOf(name) {
  const n = plain(name);
  const hit = RULES.find(([re]) => re.test(n));
  const art = hit ? hit[1] : 'cellules';
  return { art, img: `/art/${art}.webp`, bg: GROUND[art] || '#2A5B3E' };
}

// A subject's drawing and colour (components/SubjectGlyph.js), read off its
// name like the models above. The 3D renders stood for subjects until
// 2026-10-29; a render exists only for a part of the body, so half the
// subjects of the later years landed on a picture that was not theirs. Every
// field has a drawing. Most specific first, as in RULES: «urgences
// thérapeutiques» is an ambulance before it is a pill, «neurochirurgie» a
// brain before it is surgery, «sémiologie-épidémiologie» the clinic before
// the statistics.
const GLYPH_RULES = [
  [/anat\w*\s*patho|anapath|anatomopath/, 'microscope'],
  [/cardio/, 'heart'],
  [/pneumo|respirat/, 'lungs'],
  [/neurochir/, 'brain'],
  [/psychiat|psycholog|sante mentale/, 'mind'],
  [/neuro/, 'brain'],
  [/ophtalm|oculaire/, 'eye'],
  [/\borl\b|otorhino|laryng/, 'ear'],
  [/stomato|dentaire|odonto|bucco/, 'tooth'],
  [/dermato|venero/, 'skin'],
  [/radiolog|imagerie/, 'scan'],
  [/hemato/, 'drop'],
  [/immuno/, 'shield'],
  [/bacterio|microbio/, 'bacteria'],
  [/viro|infecti/, 'virus'],
  [/toxico/, 'hazard'],
  [/fertil|reproduct/, 'baby'],
  [/parasito|mycolog/, 'bug'],
  [/urgence|reanima|anesthes/, 'ambulance'],
  [/pharmacognos/, 'leaf'],
  [/pharmaco|therapeut|galeniq|pharmacie|medicament/, 'pill'],
  [/chirurg/, 'scissors'],
  [/digest|gastro|hepato/, 'stomach'],
  [/endocrin|diabet|nutrition|metabol/, 'syringe'],
  [/urolog|nephro|urinaire/, 'kidney'],
  [/gyneco|obstetr/, 'female'],
  [/embryo/, 'morula'],
  [/pediat|neonat/, 'baby'],
  [/semiolog|medecine interne|clinique/, 'stethoscope'],
  [/biologie moleculaire|genetiq|molecul/, 'dna'],
  [/biochim/, 'molecule'],
  [/botaniq|vegetal|plante/, 'leaf'],
  [/analytiq|qualite|laboratoire/, 'testtube'],
  [/mineral/, 'crystal'],
  [/chimie/, 'flask'],
  [/biophys|physique/, 'atom'],
  [/biostat|statist|epidemio|informati|mathemat/, 'chart'],
  [/travail/, 'briefcase'],
  [/legale|ethiq|deontolog/, 'scales'],
  [/sante publique|hygiene|communaut/, 'people'],
  [/anglais|english|francais|langue|terminolog|communication/, 'language'],
  [/histolog|cytolog/, 'cell'],
  [/physio/, 'wave'],
  [/rhumato|orthop|traumato|osteo/, 'bone'],
  [/anatom/, 'skull'],
  [/sante|secour/, 'firstaid'],
];

// Two shades per drawing, dark where the name sits and bright behind the
// drawing. Deep and saturated: the banner is the subject's face in the app.
const SHADES = {
  heart: ['#4A0F1C', '#B23A3E'], lungs: ['#132B45', '#3A6FA8'], brain: ['#1B1F4F', '#4A55B8'],
  mind: ['#2E1A40', '#7C4AA8'], eye: ['#0F3A40', '#2A8A8F'], ear: ['#3B1236', '#9A3A8C'],
  tooth: ['#123B36', '#2E8A73'], skin: ['#4A2A0A', '#C27A26'], scan: ['#0E161D', '#3A5468'],
  drop: ['#4A0D14', '#B8323E'], shield: ['#0E3A44', '#2B8C9E'], virus: ['#253A12', '#6B9A2E'], bacteria: ['#1E3A2A', '#3E9A6A'], hazard: ['#3A2E0A', '#B08A1E'],
  bug: ['#3A2E0A', '#9C8222'], ambulance: ['#4A0D14', '#C0392B'], pill: ['#0F3B2C', '#2E9468'],
  scissors: ['#1E2A44', '#4C6AA8'], stomach: ['#4A2608', '#C0701F'], syringe: ['#3A2A12', '#A87A2E'],
  kidney: ['#0F2F3A', '#2E7D92'], female: ['#4A1430', '#B8456E'], morula: ['#4E1530', '#C04A76'],
  baby: ['#4E1530', '#D0607E'], stethoscope: ['#0F3B2C', '#2E8A64'], dna: ['#2B1B4A', '#7A4FC0'],
  molecule: ['#4A2608', '#C0701F'], leaf: ['#1E3A12', '#4E8A2E'], testtube: ['#0E3438', '#24767A'],
  crystal: ['#0F2E45', '#2F7DAE'], flask: ['#3A2410', '#A8661E'], atom: ['#0F2E45', '#2F7DAE'],
  chart: ['#3A2410', '#A8661E'], briefcase: ['#2F2A1A', '#8A7A3A'], scales: ['#24243A', '#5A5A9A'],
  people: ['#123B36', '#2E8A73'], language: ['#0F3A40', '#2A8A8F'], cell: ['#251A52', '#6447BE'],
  wave: ['#0E3A44', '#2B8C9E'], bone: ['#18263A', '#3E6A98'], skull: ['#0B3A2E', '#1E7A58'],
  firstaid: ['#123B36', '#2E8A73'], microscope: ['#3D1A12', '#9C4A2E'], book: ['#0B3A2E', '#1E7A58'],
};

/** A subject's drawing and two shades. Never throws, never empty. */
export function glyphOf(name) {
  const n = plain(name);
  const hit = GLYPH_RULES.find(([re]) => re.test(n));
  const glyph = hit ? hit[1] : 'book';
  const [a, b] = SHADES[glyph];
  return { glyph, a, b };
}

/** The banner: the subject's drawing on its two shades. */
export const bannerOf = glyphOf;

// A region of the body in the 3D tab, by its id in lib/anatomy/curriculum.js.
// Also read by what it is about, so a region added to the curriculum lands on
// the nearest picture rather than on nothing. Nerfs crâniens is the brain on
// purpose: twelve pairs of nerves rendered at card size are twelve threads.
const REGION_RULES = [
  [/main|carpe/, 'main'], [/pied|cheville|tarse/, 'pied'],
  [/epaule|bras|coude|poignet|membre sup/, 'membre-sup'],
  [/cuisse|genou|jambe|membre inf/, 'membre-inf'],
  [/hanche|bassin|pelvis|coxal/, 'bassin'],
  [/rachis|vertebr|colonne/, 'colonne'],
  [/base du crane|crane/, 'crane'], [/face|tete/, 'tete'], [/cou|vaisseaux/, 'cou'],
  [/nerf|encephale|cerve|tronc/, 'encephale'],
  [/coeur|mediastin/, 'coeur'], [/poumon|plevre/, 'poumons'], [/paroi|thora|sternum|cote/, 'thorax'],
  [/retroperit|rein|surren|urinaire|genital/, 'reins'], [/abdom|viscer|digest/, 'digestif'],
];

/** The picture for a 3D region: `{ id, title }` from the curriculum. */
export function regionArt(region) {
  const n = plain(`${region?.id || ''} ${region?.title || ''}`.replace(/-/g, ' '));
  const hit = REGION_RULES.find(([re]) => re.test(n));
  return `/art/${hit ? hit[1] : 'crane'}.webp`;
}

/**
 * An anatomy chapter's picture: a region of the body when its title names one
 * («Ostéologie du membre supérieur»), else `fallback`.
 */
export function chapterArt(title, fallback) {
  const n = plain(String(title || '').replace(/-/g, ' ')).replace(/cardiaque|cardio/g, 'coeur cardio');
  const region = REGION_RULES.find(([re]) => re.test(n));
  return region ? `/art/${region[1]}.webp` : fallback;
}
