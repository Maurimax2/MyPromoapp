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

// A subject's banner (components/SubjectBanner.js): two shades of one hue,
// dark where the name sits and bright behind the model, which is drawn in
// that same hue. Richer than GROUND on purpose — the banner is the subject's
// face across the app, the owner's own pick of a look (2026-10).
const BANNER = {
  crane: ['#0B3A2E', '#1E7A58'], tete: ['#0E3438', '#24767A'], coeur: ['#4A0F1C', '#B23A3E'],
  poumons: ['#132B45', '#3A6FA8'], encephale: ['#1B1F4F', '#4A55B8'], reins: ['#3D1A12', '#9C4A2E'],
  molecule: ['#4A2608', '#C0701F'], morula: ['#4E1530', '#C04A76'], cellules: ['#251A52', '#6447BE'],
  membrane: ['#0F2E45', '#2F7DAE'], chromosomes: ['#2B1B4A', '#7A4FC0'], langue: ['#0F3A40', '#2A8A8F'],
  hopital: ['#123B36', '#2E8A73'], graphique: ['#3A2410', '#A8661E'], thorax: ['#1E2A44', '#4C6AA8'],
  globules: ['#4A0D14', '#B8323E'], anticorps: ['#0E3A44', '#2B8C9E'], bacteries: ['#253A12', '#6B9A2E'],
  virus: ['#3B1236', '#9A3A8C'], gelules: ['#0F3B2C', '#2E9468'], parasite: ['#3A2E0A', '#9C8222'],
  infection: ['#2E1A40', '#7C4AA8'], digestif: ['#4A2A0A', '#C27A26'], colon: ['#4A1A14', '#B4503A'],
  pancreas: ['#3A2A12', '#A87A2E'], radiologie: ['#0E161D', '#3A5468'], organes: ['#0F3B2C', '#2E8A64'],
  colonne: ['#18263A', '#3E6A98'], gyneco: ['#4A1430', '#B8456E'], vessie: ['#0F2F3A', '#2E7D92'],
};

// Where each model sits on a 272×156 banner: [width, how far it hangs off the
// far edge, how far down, tilt]. Drawn by eye in design/v2-dashboard-banners.
const PLACE = {
  crane: [190, -28, -6, -8], coeur: [170, -14, 2, 10], cellules: [200, -30, 4, 0],
  molecule: [186, -24, 10, -14], morula: [160, -10, 8, 0],
};

/** The banner's two shades, its model and where the model sits. */
export function bannerOf(name) {
  const { art, img } = artOf(name);
  const [a, b] = BANNER[art] || ['#0B3A2E', '#1E7A58'];
  const [w, x, y, r] = PLACE[art] || [176, -20, 0, 0];
  return { art, img, a, b, w, x, y, r };
}

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
 * A chapter's picture: a region of the body when its title names one
 * («Ostéologie du membre supérieur»), else a subject's model when it names
 * one («Physiologie cardiaque» is still a heart), else the subject's own.
 */
export function chapterArt(title, fallback) {
  const n = plain(String(title || '').replace(/-/g, ' ')).replace(/cardiaque|cardio/g, 'coeur cardio');
  const region = REGION_RULES.find(([re]) => re.test(n));
  if (region) return `/art/${region[1]}.webp`;
  const subject = RULES.find(([re]) => re.test(n));
  return subject ? `/art/${subject[1]}.webp` : fallback;
}
