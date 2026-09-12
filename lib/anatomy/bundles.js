// The 3D models, and which lecture each one belongs to.
//
// A model is not a feature of its own — your notes settled that when نماذج 3D
// came off الرئيسية: a model belongs to the subject it explains, so it is
// reached from that subject and nowhere else.
//
// Geometry comes from BodyParts3D, an adult male reference anatomy published
// by the Database Center for Life Science under CC Attribution 4.0. We take a
// named handful of structures per lecture rather than the whole body: the
// complete atlas is 33 MB of geometry, and a student opening the skull on
// mobile data should pay for the skull.
//
// Every part is listed by hand with its French name. Two reasons, both hard
// rules here: study content is French and the source names are English, and a
// regional cut by coordinates would silently include whatever else happened
// to sit in the same box.

/** What the credit line has to say, wherever a model is drawn. */
export const CREDIT =
  'BodyParts3D, © The Database Center for Life Science, CC BY 4.0';

export const BUNDLES = [
  {
    id: 'crane',
    module: 'anatomie',
    title: 'Le crâne',
    subtitle: 'Les 22 os de la tête osseuse',
    // Source part id → the name a student reads. BodyParts3D splits a few
    // bones into left and right meshes; the side is part of the name because
    // that is how it is asked in an exam.
    parts: {
      FJ3200: 'Os frontal',
      FJ3274: 'Os pariétal gauche',
      FJ3380: 'Os pariétal droit',
      FJ3309: 'Os occipital',
      FJ3281: 'Os temporal gauche',
      FJ3386: 'Os temporal droit',
      FJ3394: 'Os sphénoïde',
      FJ3199: 'Os ethmoïde',
      FJ3289: 'Mandibule',
      FJ3269: 'Maxillaire gauche',
      FJ3375: 'Maxillaire droit',
      FJ3287: 'Os zygomatique gauche',
      FJ3392: 'Os zygomatique droit',
      FJ3272: 'Os nasal gauche',
      FJ3378: 'Os nasal droit',
      FJ3265: 'Os lacrymal gauche',
      FJ3371: 'Os lacrymal droit',
      FJ3273: 'Os palatin gauche',
      FJ3379: 'Os palatin droit',
      FJ3263: 'Cornet nasal inférieur gauche',
      FJ3369: 'Cornet nasal inférieur droit',
      FJ3395: 'Vomer',
    },
    // One colour per bone, not per mesh: the left and right parietal are the
    // same bone and every plate in every textbook colours them the same. Keyed
    // by the name with the side taken off, so adding a side cannot forget one.
    //
    // The app's orange is not in here. It means something needs attention, and
    // a bone is not an alarm.
    tints: {
      'Os frontal': '#C75B85',
      'Os pariétal': '#4A86C4',
      'Os occipital': '#58A177',
      'Os temporal': '#8A63BE',
      'Os sphénoïde': '#C9982F',
      'Os ethmoïde': '#3FA5A8',
      Mandibule: '#A97048',
      Maxillaire: '#B45FAE',
      'Os zygomatique': '#7FA83F',
      'Os nasal': '#5B68C0',
      'Os lacrymal': '#7CC4B1',
      'Os palatin': '#C45A54',
      'Cornet nasal inférieur': '#A8A33C',
      Vomer: '#6E7C8C',
    },
  },
];

/** The same bone, whichever side of the head it is on. */
export const boneOf = (name) => name.replace(/\s+(gauche|droite?)$/, '');

/** The models a subject has, if any. */
export const bundlesOf = (moduleId) =>
  BUNDLES.filter((b) => b.module === moduleId);

/** One model by its id. */
export const bundleOf = (id) => BUNDLES.find((b) => b.id === id) || null;
