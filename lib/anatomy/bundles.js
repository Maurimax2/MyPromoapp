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

  {
    id: 'cou',
    module: 'anatomie',
    title: 'Les muscles du cou',
    subtitle: 'Superficiels, hyoïdiens, scalènes, prévertébraux, sous-occipitaux',
    parts: {
      FJ1558: 'Platysma gauche',
      FJ1587: 'Platysma droit',
      FJ1573: 'Sterno-cléido-mastoïdien gauche',
      FJ1595: 'Sterno-cléido-mastoïdien droit',
      FJ1521M: 'Trapèze, partie descendante gauche',
      FJ1521: 'Trapèze, partie descendante droit',

      FJ1555: 'Digastrique, ventre antérieur gauche',
      FJ1556: 'Digastrique, ventre antérieur droit',
      FJ1578: 'Digastrique, ventre postérieur gauche',
      FJ1579: 'Digastrique, ventre postérieur droit',
      FJ1576: 'Stylo-hyoïdien gauche',
      FJ1598: 'Stylo-hyoïdien droit',
      FJ1562: 'Mylo-hyoïdien gauche',
      FJ1583: 'Mylo-hyoïdien droit',
      FJ1559: 'Génio-hyoïdien gauche',
      FJ1580: 'Génio-hyoïdien droit',

      FJ1574: 'Sterno-hyoïdien gauche',
      FJ1596: 'Sterno-hyoïdien droit',
      FJ1575: 'Sterno-thyroïdien gauche',
      FJ1597: 'Sterno-thyroïdien droit',
      FJ1577: 'Thyro-hyoïdien gauche',
      FJ1599: 'Thyro-hyoïdien droit',
      FJ1565: 'Omo-hyoïdien gauche',
      FJ1586: 'Omo-hyoïdien droit',

      FJ1570: 'Scalène antérieur gauche',
      FJ1592: 'Scalène antérieur droit',
      FJ1571: 'Scalène moyen gauche',
      FJ1593: 'Scalène moyen droit',
      FJ1572: 'Scalène postérieur gauche',
      FJ1594: 'Scalène postérieur droit',

      FJ1561: 'Long de la tête gauche',
      FJ1582: 'Long de la tête droit',
      // Le long du cou n'est segmenté qu'à gauche dans l'atlas.
      FJ1600: 'Long du cou, partie oblique supérieure gauche',
      FJ1601: 'Long du cou, partie verticale gauche',
      FJ1557: 'Long du cou, partie oblique inférieure gauche',
      FJ1566: 'Droit antérieur de la tête gauche',
      FJ1588: 'Droit antérieur de la tête droit',
      FJ1569: 'Droit latéral de la tête gauche',
      FJ1591: 'Droit latéral de la tête droit',

      FJ1567: 'Grand droit postérieur de la tête gauche',
      FJ1589: 'Grand droit postérieur de la tête droit',
      FJ1568: 'Petit droit postérieur de la tête gauche',
      FJ1590: 'Petit droit postérieur de la tête droit',
      FJ1564: 'Oblique supérieur de la tête gauche',
      FJ1585: 'Oblique supérieur de la tête droit',
      FJ1563: 'Oblique inférieur de la tête gauche',
      FJ1584: 'Oblique inférieur de la tête droit',

      FJ1545M: 'Splénius de la tête gauche',
      FJ1545: 'Splénius de la tête droit',
      FJ1546M: 'Splénius du cou gauche',
      FJ1546: 'Splénius du cou droit',
      FJ1538M: 'Semi-épineux de la tête gauche',
      FJ1538: 'Semi-épineux de la tête droit',

      FJ3201: 'Os hyoïde',
    },

    // Muscles are coloured by the group they are taught in, not one colour
    // each: twenty-six colours tell a student nothing, and « les muscles
    // sous-hyoïdiens » is how the question is asked.
    families: {
      Platysma: 'Muscles superficiels',
      'Sterno-cléido-mastoïdien': 'Muscles superficiels',
      'Trapèze, partie descendante': 'Muscles superficiels',

      'Digastrique, ventre antérieur': 'Muscles sus-hyoïdiens',
      'Digastrique, ventre postérieur': 'Muscles sus-hyoïdiens',
      'Stylo-hyoïdien': 'Muscles sus-hyoïdiens',
      'Mylo-hyoïdien': 'Muscles sus-hyoïdiens',
      'Génio-hyoïdien': 'Muscles sus-hyoïdiens',

      'Sterno-hyoïdien': 'Muscles sous-hyoïdiens',
      'Sterno-thyroïdien': 'Muscles sous-hyoïdiens',
      'Thyro-hyoïdien': 'Muscles sous-hyoïdiens',
      'Omo-hyoïdien': 'Muscles sous-hyoïdiens',

      'Scalène antérieur': 'Muscles scalènes',
      'Scalène moyen': 'Muscles scalènes',
      'Scalène postérieur': 'Muscles scalènes',

      'Long de la tête': 'Muscles prévertébraux',
      'Long du cou, partie oblique supérieure': 'Muscles prévertébraux',
      'Long du cou, partie verticale': 'Muscles prévertébraux',
      'Long du cou, partie oblique inférieure': 'Muscles prévertébraux',
      'Droit antérieur de la tête': 'Muscles prévertébraux',
      'Droit latéral de la tête': 'Muscles prévertébraux',

      'Grand droit postérieur de la tête': 'Muscles sous-occipitaux',
      'Petit droit postérieur de la tête': 'Muscles sous-occipitaux',
      'Oblique supérieur de la tête': 'Muscles sous-occipitaux',
      'Oblique inférieur de la tête': 'Muscles sous-occipitaux',

      'Splénius de la tête': 'Muscles spinaux',
      'Splénius du cou': 'Muscles spinaux',
      'Semi-épineux de la tête': 'Muscles spinaux',

      'Os hyoïde': 'Os',
    },

    // Taken off to begin with, and put back from the list. The platysma is a
    // sheet under the skin that covers the whole neck: left on, the first
    // thing a student sees is a pink curtain with everything behind it.
    hidden: ['Platysma'],

    tints: {
      'Muscles superficiels': '#C75B85',
      'Muscles sus-hyoïdiens': '#C9982F',
      'Muscles sous-hyoïdiens': '#8A63BE',
      'Muscles scalènes': '#3FA5A8',
      'Muscles prévertébraux': '#A97048',
      'Muscles sous-occipitaux': '#7FA83F',
      'Muscles spinaux': '#4A86C4',
      Os: '#8C8577',
    },
  },

];

/** The same bone, whichever side of the head it is on. */
export const boneOf = (name) => name.replace(/\s+(gauche|droite?)$/, '');

/**
 * The group a structure is coloured by — its own name where the bundle names
 * no groups, which is how the skull works: one colour per bone.
 */
export const familyOf = (bundle, name) =>
  bundle.families?.[boneOf(name)] || boneOf(name);

/** The models a subject has, if any. */
export const bundlesOf = (moduleId) =>
  BUNDLES.filter((b) => b.module === moduleId);

/** One model by its id. */
export const bundleOf = (id) => BUNDLES.find((b) => b.id === id) || null;
