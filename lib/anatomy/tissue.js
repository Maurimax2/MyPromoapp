// What a structure is made of, and therefore what colour it is.
//
// Every model opened in the same bone white, because the reader had one
// default colour and used it for everything. A muscle drawn in bone white is
// a muscle a student has to be told is a muscle; on a plate it is red, and
// that is not decoration — the colour is how you read which tissue you are
// looking at before you have read a single label.
//
// So this is the plate convention, and nothing else: muscle red, tendon and
// aponeurosis pearl, bone ivory, cartilage bluish, nerve yellow, artery red,
// vein blue, and the viscera close to what they look like fresh.
//
// It is a DEFAULT, not the only colouring. The coloured plate — تلوين كل
// العظام — still paints every structure its own group's colour, because that
// is what tells fourteen bones of a skull apart. Tissue is what the model
// looks like when nothing has been asked of it.

/** The standard colours. Hex, because that is what three.js wants. */
export const TISSUE = {
  bone:       '#E8E1D2',   // ivory, faintly warm
  cartilage:  '#D6DEE4',   // the blue-white of costal and laryngeal cartilage
  disc:       '#C9CFC2',   // fibro-cartilage, greener and duller
  muscle:     '#A83236',   // the red of fresh muscle belly
  tendon:     '#EDE7DA',   // pearl — tendon, aponeurosis, fascia, ligament
  nerve:      '#E3C244',   // the yellow every atlas uses
  artery:     '#C0392B',
  vein:       '#2E6DA8',
  sinus:      '#1E3F66',   // dural sinus: venous, but not a vein
  brain:      '#C9B5B0',   // cortex, fresh
  grey:       '#9E8C93',   // deep grey matter
  csf:        '#7FB8D8',   // the ventricles, which hold fluid and not tissue
  lung:       '#D6A9A2',
  heart:      '#9E3B3B',
  liver:      '#8C5A3C',
  gut:        '#C9A06B',
  gland:      '#B5757E',
  kidney:     '#9B4B4B',
  urine:      '#D8C98A',   // the excretory tract, which carries it
  gonad:      '#C08A8A',
  erectile:   '#B05C6B',
};

/** The default for a bundle that says nothing. Bone is the commonest. */
export const DEFAULT_TISSUE = 'bone';

/**
 * A name that says what it is, whatever bundle it came from.
 *
 * Z-Anatomy names a fascia a fascia and a ligament a ligament, so a muscle
 * bundle that happens to hold one should not paint it red. Read before the
 * bundle's own answer, because it is more specific than the bundle is.
 */
const BY_NAME = [
  [/^(aponévrose|fascia|rétinaculum|ligament|tendon)\b/i, 'tendon'],
  [/\b(aponévrose|fascia|rétinaculum)\b/i, 'tendon'],
  [/^cartilage\b/i, 'cartilage'],
  [/^disque intervertébral/i, 'disc'],
  [/^ligament/i, 'tendon'],
];

/**
 * The tissue of one structure.
 *
 * The bundle says what it is mostly made of; `tissues` overrides that per
 * family, for a bundle that genuinely holds more than one — les vaisseaux is
 * arteries AND veins AND dural sinuses, and painting them one colour would
 * throw away the first thing a student reads off the page.
 */
export function tissueOf(bundle, name, family) {
  for (const [re, kind] of BY_NAME) if (re.test(name)) return kind;
  if (bundle?.tissues && family && bundle.tissues[family]) return bundle.tissues[family];
  return bundle?.tissue || DEFAULT_TISSUE;
}

/** …and its colour. */
export const colourOf = (bundle, name, family) =>
  TISSUE[tissueOf(bundle, name, family)] || TISSUE[DEFAULT_TISSUE];
