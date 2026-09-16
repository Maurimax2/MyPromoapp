// How a structure is read, once it is held.
//
// Two things, both of which only rearrange what `notes.js` already says. No
// description is written here and none is invented: if the atlas and the notes
// do not have it, the screen does not show it.
//
// 1. The sections a structure carries are grouped into the tabs it is revised
//    in. « Les parties de l'os temporal », « ses articulations », « ce qui le
//    traverse » are three different questions in an exam and reading them as
//    one scroll of nine headings is why nobody scrolls.
//
// 2. A landmark is given the line of its bone's description that names it.
//    « Foramen ovale — nerf mandibulaire (V3) et artère petite méningée » is
//    already written, under Éléments qui le traversent on the sphénoïde. What
//    a student touching that dot got was the word « Foramen ovale », and what
//    runs through an orifice is the reason it is named.

import { boneOf } from './bundles.js';

const fold = (s) => String(s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’']/g, ' ')
  .replace(/\s+/g, ' ')
  .toLowerCase().trim();

/**
 * The tabs, in the order the material is taught.
 *
 * A tab holds one or more of the sections `notes.js` already defines and keeps
 * their headings inside it, so a muscle — Origine, Insertion, Innervation,
 * Action — reads as one tab with four headings rather than four tabs of one
 * line. A tab whose sections are all empty is never drawn, which is what makes
 * the same list work for a bone, a muscle, a nerve and an artery.
 */
export const TABS = [
  { id: 'parties', title: 'Parties', keys: ['parts'] },
  { id: 'reliefs', title: 'Reliefs', keys: ['relief'] },
  { id: 'articulations', title: 'Articulations', keys: ['joints'] },
  { id: 'insertions', title: 'Insertions', keys: ['muscles', 'origin', 'insertion', 'nerve', 'action'] },
  { id: 'traverse', title: 'Ce qui le traverse', keys: ['through'] },
  { id: 'trajet', title: 'Trajet', keys: ['course', 'exit', 'branches', 'tributaries', 'supplies', 'ends'] },
  { id: 'rapports', title: 'Rapports', keys: ['near'] },
];

/** The tabs this structure actually has something to put in. */
export function tabsOf(note) {
  if (!note) return [];
  return TABS
    .map((t) => ({ ...t, keys: t.keys.filter((k) => note[k]?.length) }))
    .filter((t) => t.keys.length);
}

// The words a landmark's name begins with. « Foramen ovale » and « Incisure
// (ou foramen) supra-orbitaire » name the same kind of thing twice over, so
// what identifies a landmark is what comes AFTER the word for what it is.
const KIND = /^(foramen|trou|canal|conduit|meat|méat|fissure|incisure|echancrure|échancrure|fosse|fossette|sillon|gouttiere|gouttière|processus|apophyse|epine|épine|tubercule|tuberosite|tubérosité|condyle|tete|tête|col|crete|crête|ligne|bord|angle|face|surface|eminence|éminence|protuberance|protubérance|trochanter|malleole|malléole|styloide|styloïde|arcade|bosse|plateau|scissure|aile|corne|branche|corps|base|sommet|pole|pôle)\s+/i;

// French writes a relief in the plural as often as not — the description says
// « Condyles occipitaux » and « Bosses frontales » where the point is « Condyle
// occipital ». Comparing the two as written found neither, so every word is
// put back in the singular before anything is compared: the -aux of occipitaux
// is the -al of occipital, and a trailing s or x is a plural everywhere else.
const one = (w) => w
  .replace(/(.)aux$/, '$1al')
  .replace(/eaux$/, 'eau')
  .replace(/[sx]$/, '');

// Punctuation goes too, or « Foramen jugulaire, avec l'occipital » offers
// « jugulaire, » where the point says « jugulaire ».
const words = (s) => fold(s).replace(/[,.;:()]/g, ' ')
  .split(' ').filter(Boolean).map(one);

/**
 * Whether two names are the same thing said at two lengths.
 *
 * « Ligne temporale » is the landmark; the bone's description says « Lignes
 * temporales supérieure et inférieure ». One is the beginning of the other,
 * which is what a printed plate does too — so a run of words that starts one
 * name and starts the other is a match, provided it is long enough to mean
 * something. A single short word is not: « Face » would otherwise answer for
 * every line on the bone.
 */
function alike(a, b) {
  const x = words(a);
  const y = words(b);
  if (!x.length || !y.length) return false;
  const n = Math.min(x.length, y.length);
  let same = true;
  for (let i = 0; i < n; i++) if (x[i] !== y[i]) { same = false; break; }
  if (same) return n >= 2 || x[0].length >= 5;

  // …or the shorter one is named part-way along the longer: the temporal's
  // reliefs say « Fosse mandibulaire et tubercule articulaire », which is two
  // landmarks on one line. Two words at least, so a stray « face » or « bord »
  // cannot claim a line it only happens to appear in.
  const [few, many] = x.length <= y.length ? [x, y] : [y, x];
  if (few.length < 2) return false;
  for (let i = 0; i + few.length <= many.length; i++) {
    if (few.every((w, k) => w === many[i + k])) return true;
  }
  return false;
}

/** « Incisure (ou foramen) supra-orbitaire » → « supra-orbitaire ». */
const tail = (s) => {
  let t = String(s).replace(/\([^)]*\)/g, ' ');
  // Only the first word is dropped, and only when it is the word for a kind
  // of landmark: « Grande aile du sphénoïde » must not become « du sphénoïde ».
  t = t.replace(KIND, '');
  return fold(t).replace(/^(de |du |des |d )/, '');
};

// Where the line that names a landmark is looked for, best first. What runs
// through an orifice is the answer worth having, so `through` is asked first
// even for a point that is also listed as a relief.
const LOOK = [
  ['through', 'Ce qui le traverse'],
  ['relief', 'Relief'],
  ['parts', 'Partie'],
  ['joints', 'Articulation'],
  ['muscles', 'Insertion musculaire'],
];

/**
 * The line of a bone's description that names this landmark.
 *
 * Returns `{ section, title, head, rest }` — `rest` being what the line says
 * after the dash, which is the part a student does not already know from the
 * name. Nothing is returned when no line names it; a dot that has nothing
 * written about it says its name and stops, rather than being given the line
 * of whatever was nearest in the list.
 */
/**
 * A landmark that has a description entirely of its own.
 *
 * Most do not — a foramen is a line in the bone's own note. But the points on
 * the spine are written one by one, because « l'épineuse de T4 » is a surface
 * marking with its own answer (the disque T4-T5, l'angle sternal) and not a
 * feature of a vertebra in general. Asked for first: a description written
 * about this point beats any line that merely names it.
 */
export const noteOn = (book, name) => (book ? book[boneOf(String(name))] : null) || null;

export function lineFor(name, note) {
  if (!name || !note) return null;
  const want = boneOf(String(name));
  const flat = fold(want);
  const stem = tail(want);

  for (const [key, title] of LOOK) {
    for (const line of note[key] || []) {
      const [head, ...more] = String(line).split(/\s+—\s+/);
      const rest = more.join(' — ').trim();
      const h = fold(head);
      // Either the line opens with the landmark's own name — « Foramen
      // jugulaire, avec l'occipital » — or the two say the same thing with a
      // different word for the kind of thing it is.
      const hit = h === flat || alike(head, want)
        || (stem.length > 3 && tail(head) === stem);
      if (hit) return { section: key, title, head: head.trim(), rest };
    }
  }
  return null;
}

/** Every landmark of one structure, in the order they are listed. */
export const pointsOn = (points, id) =>
  points.filter((p) => p.part === id);
