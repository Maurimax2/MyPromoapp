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


  {
    id: 'tete',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les muscles de la tête',
    subtitle: 'Masticateurs et peauciers de la face',
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'MuscularSystem100.fbx',
        // Z-Anatomy holds only the left of each pair; the right is mirrored
        // when the model is cut.
        mirrored: true,
        parts: {
          'Temporalis muscle.l': 'Temporal',
          'Superficial part of masseter.l': 'Masséter, partie superficielle',
          'Deep part of masseter.l': 'Masséter, partie profonde',
          'Medial pterygoid muscle.l': 'Ptérygoïdien médial',
          'Superior head of lateral pterygoid muscle.l': 'Ptérygoïdien latéral, chef supérieur',
          'Inferior head of lateral pterygoid muscle.l': 'Ptérygoïdien latéral, chef inférieur',

          'Frontalis muscle.l': 'Muscle frontal',
          'Occipitalis muscle.l': 'Muscle occipital',
          'Epicranial aponeurosis.l': 'Aponévrose épicrânienne',

          'Orbital part of orbicularis oculi.l': 'Orbiculaire de l’œil, partie orbitaire',
          'Palpebral part of orbicularis oculi.l': 'Orbiculaire de l’œil, partie palpébrale',
          'Corrugator supercilii.l': 'Corrugateur du sourcil',
          'Procerus muscle.l': 'Procérus',

          'Nasalis muscle.l': 'Muscle nasal',
          'Depressor septi nasi.l': 'Abaisseur du septum nasal',

          'Levator labii superioris.l': 'Élévateur de la lèvre supérieure',
          'Levator nasolabialis.l': 'Élévateur de la lèvre supérieure et de l’aile du nez',
          'Levator anguli oris.l': 'Élévateur de l’angle de la bouche',
          'Zygomaticus major muscle.l': 'Grand zygomatique',
          'Zygomaticus minor muscle.l': 'Petit zygomatique',
          'Risorius muscle.l': 'Risorius',
          'Bucinator.l': 'Buccinateur',
          'Orbicularis oris muscle.l': 'Orbiculaire de la bouche',
          'Depressor anguli oris.l': 'Abaisseur de l’angle de la bouche',
          'Depressor labii inferioris.l': 'Abaisseur de la lèvre inférieure',
          'Mentalis muscle.l': 'Mentonnier',
        },
      },
      {
        // The bone they move, for orientation.
        file: 'SkeletalSystem100.fbx',
        parts: { Mandible: 'Mandibule' },
      },
    ],

    families: {
      Temporal: 'Muscles masticateurs',
      'Masséter, partie superficielle': 'Muscles masticateurs',
      'Masséter, partie profonde': 'Muscles masticateurs',
      'Ptérygoïdien médial': 'Muscles masticateurs',
      'Ptérygoïdien latéral, chef supérieur': 'Muscles masticateurs',
      'Ptérygoïdien latéral, chef inférieur': 'Muscles masticateurs',

      'Muscle frontal': 'Muscles du crâne',
      'Muscle occipital': 'Muscles du crâne',
      'Aponévrose épicrânienne': 'Muscles du crâne',

      'Orbiculaire de l’œil, partie orbitaire': 'Muscles des paupières',
      'Orbiculaire de l’œil, partie palpébrale': 'Muscles des paupières',
      'Corrugateur du sourcil': 'Muscles des paupières',
      Procérus: 'Muscles des paupières',

      'Muscle nasal': 'Muscles du nez',
      'Abaisseur du septum nasal': 'Muscles du nez',

      'Élévateur de la lèvre supérieure': 'Muscles des lèvres',
      'Élévateur de la lèvre supérieure et de l’aile du nez': 'Muscles des lèvres',
      'Élévateur de l’angle de la bouche': 'Muscles des lèvres',
      'Grand zygomatique': 'Muscles des lèvres',
      'Petit zygomatique': 'Muscles des lèvres',
      Risorius: 'Muscles des lèvres',
      Buccinateur: 'Muscles des lèvres',
      'Orbiculaire de la bouche': 'Muscles des lèvres',
      'Abaisseur de l’angle de la bouche': 'Muscles des lèvres',
      'Abaisseur de la lèvre inférieure': 'Muscles des lèvres',
      Mentonnier: 'Muscles des lèvres',

      Mandibule: 'Os',
    },

    tints: {
      'Muscles masticateurs': '#C75B85',
      'Muscles du crâne': '#C9982F',
      'Muscles des paupières': '#4A86C4',
      'Muscles du nez': '#3FA5A8',
      'Muscles des lèvres': '#8A63BE',
      Os: '#8C8577',
    },
  },


  {
    id: 'nerfs',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les nerfs crâniens',
    subtitle: 'Les douze paires, et le tronc cérébral d’où elles sortent',
    // The vagus runs to the abdomen and the accessory to the shoulder. The
    // screen is about the head: this is the box the twelve pairs and the
    // brainstem occupy, and the two long ones simply leave it. Framing the
    // whole of what is drawn put the brainstem on screen at the size of a
    // thumbnail.
    frame: [[-0.070, 1.495, -0.045], [0.070, 1.640, 0.092]],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'NervousSystem100.fbx',
        // A nerve is drawn as a smooth tube with far more resolution than it
        // has shape: the vagus alone arrives as forty-six thousand triangles.
        simplify: 0.0006,
        parts: {
          'Olfactory nerve (I).l': 'Nerf olfactif (I) gauche',
          'Olfactory nerve (I).r': 'Nerf olfactif (I) droit',
          'Optic nerve (II).l': 'Nerf optique (II) gauche',
          'Optic nerve (II).r': 'Nerf optique (II) droit',
          'Oculomotor nerve (III).l': 'Nerf oculomoteur (III) gauche',
          'Oculomotor nerve (III).r': 'Nerf oculomoteur (III) droit',
          'Trochlear nerve (IV).l': 'Nerf trochléaire (IV) gauche',
          'Trochlear nerve (IV).r': 'Nerf trochléaire (IV) droit',
          'Trigeminal nerve (V).l': 'Nerf trijumeau (V) gauche',
          'Trigeminal nerve (V).r': 'Nerf trijumeau (V) droit',
          'Ophthalmic nerve.l': 'Nerf ophtalmique (V1) gauche',
          'Ophthalmic nerve.r': 'Nerf ophtalmique (V1) droit',
          'Maxillary nerve.l': 'Nerf maxillaire (V2) gauche',
          'Maxillary nerve.r': 'Nerf maxillaire (V2) droit',
          'Anterior division of mandibular nerve.l': 'Nerf mandibulaire (V3), division antérieure gauche',
          'Anterior division of mandibular nerve.r': 'Nerf mandibulaire (V3), division antérieure droit',
          'Posterior division of mandibular nerve.l': 'Nerf mandibulaire (V3), division postérieure gauche',
          'Posterior division of mandibular nerve.r': 'Nerf mandibulaire (V3), division postérieure droit',
          'Abducens nerve (VI).l': 'Nerf abducens (VI) gauche',
          'Abducens nerve (VI).r': 'Nerf abducens (VI) droit',
          'Facial nerve (VII).l': 'Nerf facial (VII) gauche',
          'Facial nerve (VII).r': 'Nerf facial (VII) droit',
          'Vestibulocochlear nerve (VIII).l': 'Nerf vestibulo-cochléaire (VIII) gauche',
          'Vestibulocochlear nerve (VIII).r': 'Nerf vestibulo-cochléaire (VIII) droit',
          'Glossopharyngeal nerve (IX).l': 'Nerf glosso-pharyngien (IX) gauche',
          'Glossopharyngeal nerve (IX).r': 'Nerf glosso-pharyngien (IX) droit',
          'Vagus nerve (X).l': 'Nerf vague (X) gauche',
          'Vagus nerve (X).r': 'Nerf vague (X) droit',
          'Accessory nerve (XI).l': 'Nerf accessoire (XI) gauche',
          'Accessory nerve (XI).r': 'Nerf accessoire (XI) droit',
          'Hypoglossal nerve (XII).l': 'Nerf hypoglosse (XII) gauche',
          'Hypoglossal nerve (XII).r': 'Nerf hypoglosse (XII) droit',
        },
      },
      {
        // The file holds these as one half each; both halves make the whole.
        file: 'NervousSystem100.fbx',
        both: true,
        simplify: 0.0008,
        parts: {
          'Midbrain.l': 'Mésencéphale',
          'Pons.l': 'Pont',
          'Medulla oblongata.r': 'Bulbe rachidien',
        },
      },
    ],

    families: {
      'Nerf olfactif (I)': 'Nerfs sensoriels',
      'Nerf optique (II)': 'Nerfs sensoriels',
      'Nerf vestibulo-cochléaire (VIII)': 'Nerfs sensoriels',

      'Nerf oculomoteur (III)': 'Nerfs de l’œil',
      'Nerf trochléaire (IV)': 'Nerfs de l’œil',
      'Nerf abducens (VI)': 'Nerfs de l’œil',

      'Nerf trijumeau (V)': 'Nerf trijumeau',
      'Nerf ophtalmique (V1)': 'Nerf trijumeau',
      'Nerf maxillaire (V2)': 'Nerf trijumeau',
      'Nerf mandibulaire (V3), division antérieure': 'Nerf trijumeau',
      'Nerf mandibulaire (V3), division postérieure': 'Nerf trijumeau',

      'Nerf facial (VII)': 'Nerfs mixtes',
      'Nerf glosso-pharyngien (IX)': 'Nerfs mixtes',
      'Nerf vague (X)': 'Nerfs mixtes',

      'Nerf accessoire (XI)': 'Nerfs moteurs',
      'Nerf hypoglosse (XII)': 'Nerfs moteurs',

      Mésencéphale: 'Tronc cérébral',
      Pont: 'Tronc cérébral',
      'Bulbe rachidien': 'Tronc cérébral',
    },

    tints: {
      'Nerfs sensoriels': '#C9982F',
      'Nerfs de l’œil': '#4A86C4',
      'Nerf trijumeau': '#C75B85',
      'Nerfs mixtes': '#7FA83F',
      'Nerfs moteurs': '#3FA5A8',
      'Tronc cérébral': '#8C8577',
    },
  },

  {
    id: 'vaisseaux',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les vaisseaux de la tête et du cou',
    subtitle: 'Carotides, vertébrales, polygone de Willis, jugulaires et sinus duraux',
    // Everything below the clavicle is in the file because the arch of the
    // aorta is where the story starts, but the screen is the head and the neck.
    frame: [[-0.085, 1.375, -0.110], [0.085, 1.705, 0.095]],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'CardioVascular41.fbx',
        // An artery is drawn as a smooth tube with far more resolution than it
        // has shape: the posterior cerebral alone arrives as fourteen thousand
        // triangles for a vessel three millimetres across.
        simplify: 0.0005,
        parts: {
          // The trunks. Unlike the rest of Z-Anatomy the cardiovascular file
          // has both sides baked, and the aortic arch is genuinely asymmetric
          // — on the right a brachiocephalic trunk, on the left two vessels
          // straight off the arch — so the sides are named one by one.
          'Aortic arch': 'Crosse de l’aorte',
          'Brachiocephalic trunk': 'Tronc brachio-céphalique',
          'Right common carotid artery': 'Artère carotide commune droite',
          'Left common carotid artery': 'Artère carotide commune gauche',
          'Right subclavian artery': 'Artère subclavière droite',
          'Left subclavian artery': 'Artère subclavière gauche',

          'External carotid artery.l': 'Artère carotide externe gauche',
          'External carotid artery.r': 'Artère carotide externe droite',
          'Internal carotid artery.l': 'Artère carotide interne gauche',
          'Internal carotid artery.r': 'Artère carotide interne droite',
          'Vertebral artery.l': 'Artère vertébrale gauche',
          'Vertebral artery.r': 'Artère vertébrale droite',
          'Basilar artery': 'Tronc basilaire',

          // The branches of the external carotid the file holds. It has no
          // mesh for the superior thyroid, the lingual or the posterior
          // auricular; all three are named in the description instead, because
          // the six branches are the answer to the question.
          'Ascending pharyngeal artery.l': 'Artère pharyngienne ascendante gauche',
          'Ascending pharyngeal artery.r': 'Artère pharyngienne ascendante droite',
          'Facial artery.l': 'Artère faciale gauche',
          'Facial artery.r': 'Artère faciale droite',
          'Occipital artery.l': 'Artère occipitale gauche',
          'Occipital artery.r': 'Artère occipitale droite',
          'Superficial temporal artery.l': 'Artère temporale superficielle gauche',
          'Superficial temporal artery.r': 'Artère temporale superficielle droite',
          'Maxillary artery.l': 'Artère maxillaire gauche',
          'Maxillary artery.r': 'Artère maxillaire droite',
          'Middle meningeal artery.l': 'Artère méningée moyenne gauche',
          'Middle meningeal artery.r': 'Artère méningée moyenne droite',
          'Inferior alveolar artery.l': 'Artère alvéolaire inférieure gauche',
          'Inferior alveolar artery.r': 'Artère alvéolaire inférieure droite',

          // The circle, and the three cerebral arteries that close it.
          'Ophthalmic artery.l': 'Artère ophtalmique gauche',
          'Ophthalmic artery.r': 'Artère ophtalmique droite',
          'Anterior cerebral artery.l': 'Artère cérébrale antérieure gauche',
          'Anterior cerebral artery.r': 'Artère cérébrale antérieure droite',
          'Middle cerebral artery (M1-segment).l': 'Artère cérébrale moyenne gauche',
          'Middle cerebral artery (M1-segment).r': 'Artère cérébrale moyenne droite',
          'Posterior cerebral artery.l': 'Artère cérébrale postérieure gauche',
          'Posterior cerebral artery.r': 'Artère cérébrale postérieure droite',
          'Anterior communicating artery': 'Artère communicante antérieure',
          'Posterior communicating artery.l': 'Artère communicante postérieure gauche',
          'Posterior communicating artery.r': 'Artère communicante postérieure droite',

          // The veins.
          'Internal jugular vein.l': 'Veine jugulaire interne gauche',
          'Internal jugular vein.r': 'Veine jugulaire interne droite',
          'External jugular vein.l': 'Veine jugulaire externe gauche',
          'External jugular vein.r': 'Veine jugulaire externe droite',
          'Anterior jugular vein.l': 'Veine jugulaire antérieure gauche',
          'Anterior jugular vein.r': 'Veine jugulaire antérieure droite',
          'Facial vein.l': 'Veine faciale gauche',
          'Facial vein.r': 'Veine faciale droite',
          'Retromandibular vein.l': 'Veine rétro-mandibulaire gauche',
          'Retromandibular vein.r': 'Veine rétro-mandibulaire droite',
          'Left brachiocephalic vein': 'Tronc veineux brachio-céphalique gauche',
          'Right brachiocephalic vein': 'Tronc veineux brachio-céphalique droit',

          // The dural sinuses, which is where the blood of the brain actually
          // goes: they are not veins, they run between the two leaves of the
          // dura and have no valves and no muscular wall.
          'Superior sagittal sinus': 'Sinus sagittal supérieur',
          'Inferior sagittal sinus': 'Sinus sagittal inférieur',
          'Straight sinus': 'Sinus droit',
          'Occipital sinus': 'Sinus occipital',
          'Transverse sinus.l': 'Sinus transverse gauche',
          'Transverse sinus.r': 'Sinus transverse droit',
          'Sigmoid sinus.l': 'Sinus sigmoïde gauche',
          'Sigmoid sinus.r': 'Sinus sigmoïde droit',
          'Superior petrosal sinus.l': 'Sinus pétreux supérieur gauche',
          'Superior petrosal sinus.r': 'Sinus pétreux supérieur droit',
          'Cavernous sinus.l': 'Sinus caverneux gauche',
          'Cavernous sinus.r': 'Sinus caverneux droit',
        },
      },
    ],

    // Coloured the way a plate colours them: warm for arterial, cool for
    // venous, and within the arterial side by the territory a question is
    // asked about — « les branches de la carotide externe » is one question.
    families: {
      'Crosse de l’aorte': 'Troncs de la base',
      'Tronc brachio-céphalique': 'Troncs de la base',
      'Artère carotide commune': 'Troncs de la base',
      'Artère subclavière': 'Troncs de la base',

      'Artère carotide externe': 'Système carotidien externe',
      'Artère pharyngienne ascendante': 'Système carotidien externe',
      'Artère faciale': 'Système carotidien externe',
      'Artère occipitale': 'Système carotidien externe',
      'Artère temporale superficielle': 'Système carotidien externe',
      'Artère maxillaire': 'Système carotidien externe',
      'Artère méningée moyenne': 'Système carotidien externe',
      'Artère alvéolaire inférieure': 'Système carotidien externe',

      'Artère carotide interne': 'Système carotidien interne',
      'Artère ophtalmique': 'Système carotidien interne',

      'Artère vertébrale': 'Système vertébro-basilaire',
      'Tronc basilaire': 'Système vertébro-basilaire',

      'Artère cérébrale antérieure': 'Artères cérébrales',
      'Artère cérébrale moyenne': 'Artères cérébrales',
      'Artère cérébrale postérieure': 'Artères cérébrales',
      'Artère communicante antérieure': 'Artères cérébrales',
      'Artère communicante postérieure': 'Artères cérébrales',

      'Veine jugulaire interne': 'Veines',
      'Veine jugulaire externe': 'Veines',
      'Veine jugulaire antérieure': 'Veines',
      'Veine faciale': 'Veines',
      'Veine rétro-mandibulaire': 'Veines',
      'Tronc veineux brachio-céphalique': 'Veines',

      'Sinus sagittal supérieur': 'Sinus de la dure-mère',
      'Sinus sagittal inférieur': 'Sinus de la dure-mère',
      'Sinus droit': 'Sinus de la dure-mère',
      'Sinus occipital': 'Sinus de la dure-mère',
      'Sinus transverse': 'Sinus de la dure-mère',
      'Sinus sigmoïde': 'Sinus de la dure-mère',
      'Sinus pétreux supérieur': 'Sinus de la dure-mère',
      'Sinus caverneux': 'Sinus de la dure-mère',
    },

    tints: {
      'Troncs de la base': '#9B1B30',
      'Système carotidien externe': '#E4596A',
      'Système carotidien interne': '#C0392B',
      'Système vertébro-basilaire': '#A63BA6',
      'Artères cérébrales': '#E58FA8',
      Veines: '#2E75B6',
      'Sinus de la dure-mère': '#1B3F6B',
    },
  },

  {
    id: 'rachis',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Le rachis cervical',
    subtitle: 'C1 à C7, les disques, et le squelette du larynx',
    frame: [[-0.055, 1.420, -0.100], [0.055, 1.600, 0.055]],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'SkeletalSystem100.fbx',
        // A vertebra is one symmetric mesh in this file, both sides together,
        // so nothing is mirrored here.
        parts: {
          'Atlas (C1)': 'Atlas (C1)',
          'Axis (C2)': 'Axis (C2)',
          'Vertebra C3': 'Vertèbre C3',
          'Vertebra C4': 'Vertèbre C4',
          'Vertebra C5': 'Vertèbre C5',
          'Vertebra C6': 'Vertèbre C6',
          'Vertebra C7': 'Vertèbre C7',
          'Vertebra T1': 'Vertèbre T1',
          'Hyoid bone': 'Os hyoïde',
          'Thyroid cartilage': 'Cartilage thyroïde',
          'Cricoid cartilage': 'Cartilage cricoïde',
        },
      },
      {
        file: 'Joints100.fbx',
        parts: {
          'Intervertebral disc C2-C3': 'Disque intervertébral C2-C3',
          'Intervertebral disc C3-C4': 'Disque intervertébral C3-C4',
          'Intervertebral disc C4-C5': 'Disque intervertébral C4-C5',
          'Intervertebral disc C5-C6': 'Disque intervertébral C5-C6',
          'Intervertebral disc C6-C7': 'Disque intervertébral C6-C7',
          'Intervertebral disc C7-T1': 'Disque intervertébral C7-T1',
          // The anterior and posterior longitudinal ligaments run the whole
          // column, from the sacrum up; in a cervical model they would be two
          // ribbons mostly out of frame. The nuchal ligament is cervical and
          // nothing else, so it is the one that is drawn.
          'Nuchal ligament': 'Ligament nuchal',
        },
      },
    ],

    families: {
      'Atlas (C1)': 'Charnière cranio-vertébrale',
      'Axis (C2)': 'Charnière cranio-vertébrale',
      'Vertèbre C3': 'Vertèbres cervicales typiques',
      'Vertèbre C4': 'Vertèbres cervicales typiques',
      'Vertèbre C5': 'Vertèbres cervicales typiques',
      'Vertèbre C6': 'Vertèbres cervicales typiques',
      'Vertèbre C7': 'Charnière cervico-thoracique',
      'Vertèbre T1': 'Charnière cervico-thoracique',
      'Disque intervertébral C2-C3': 'Disques intervertébraux',
      'Disque intervertébral C3-C4': 'Disques intervertébraux',
      'Disque intervertébral C4-C5': 'Disques intervertébraux',
      'Disque intervertébral C5-C6': 'Disques intervertébraux',
      'Disque intervertébral C6-C7': 'Disques intervertébraux',
      'Disque intervertébral C7-T1': 'Disques intervertébraux',
      'Os hyoïde': 'Squelette laryngé',
      'Cartilage thyroïde': 'Squelette laryngé',
      'Cartilage cricoïde': 'Squelette laryngé',
      'Ligament nuchal': 'Ligaments',
    },

    tints: {
      'Charnière cranio-vertébrale': '#C75B85',
      'Vertèbres cervicales typiques': '#4A86C4',
      'Charnière cervico-thoracique': '#58A177',
      'Disques intervertébraux': '#C9982F',
      'Squelette laryngé': '#3FA5A8',
      Ligaments: '#A97048',
    },
  },

  {
    id: 'encephale',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Le cortex cérébral',
    subtitle: 'Les lobes, les circonvolutions et les sillons',
    // A brain is drawn from the side in every book, and opening one on its
    // frontal poles shows two pink lumps and nothing else. This is the view a
    // plate uses: the left hemisphere seen from the left.
    facing: [1, 0.08, 0],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'NervousSystem100.fbx',
        // The cortical parcellation is the one part of Z-Anatomy that ships as
        // a right hemisphere rather than a left, so the mirror is the left.
        mirrored: true,
        side: 'r',
        parts: {
          // Lobe frontal
          'Superior frontal gyrus.r': 'Gyrus frontal supérieur (F1)',
          'Middle frontal gyrus.r': 'Gyrus frontal moyen (F2)',
          'Opercular part of inferior frontal gyrus.r': 'Gyrus frontal inférieur, pars opercularis',
          'Triangular part of inferior frontal gyrus.r': 'Gyrus frontal inférieur, pars triangularis',
          'Orbital part of  inferior frontal gyrus.r': 'Gyrus frontal inférieur, pars orbitalis',
          'Precentral gyrus.r': 'Gyrus précentral',
          'Straight gyrus (Gyrus rectus).r': 'Gyrus rectus',
          'Orbital gyri (Frontomarginal gyrus and sulcus*).r': 'Gyri orbitaires',
          'Paracentral gyrus and sulcus*.r': 'Lobule paracentral',

          // Lobe pariétal
          'Postcentral gyrus.r': 'Gyrus postcentral',
          'Superior parietal lobule.r': 'Lobule pariétal supérieur',
          'Supramarginal gyrus.r': 'Gyrus supramarginal',
          'Angular gyrus.r': 'Gyrus angulaire',
          'Precuneus.r': 'Précunéus',

          // Lobe temporal
          'Superior temporal gyrus (Lateral part).r': 'Gyrus temporal supérieur (T1)',
          'Middle temporal gyrus.r': 'Gyrus temporal moyen (T2)',
          'Inferior temporal gyrus.r': 'Gyrus temporal inférieur (T3)',
          'Transverse temporal gyri.r': 'Gyri temporaux transverses (de Heschl)',
          'Temporal pole.r': 'Pôle temporal',
          'Medial occipitotemporal gyrus (Parahippocampal*).r': 'Gyrus parahippocampique',
          'Lateral occipitotemporal gyrus.r': 'Gyrus occipito-temporal latéral (fusiforme)',

          // Lobe occipital
          'Cuneus.r': 'Cunéus',
          'Lingual gyrus.r': 'Gyrus lingual',
          'Superior occipital gyri.r': 'Gyri occipitaux supérieurs',
          'Lateral occipital gyrus (Middle occipital gyrus*).r': 'Gyrus occipital latéral',
          'Inferior occipital gyrus and sulcus*.r': 'Gyrus occipital inférieur',
          'Occipital pole.r': 'Pôle occipital',

          // Lobe limbique
          'Cingulate gyrus and sulcus (Middle anterior part).r': 'Gyrus cingulaire, partie antérieure',
          'Cingulate gyrus and sulcus (Middle posterior part).r': 'Gyrus cingulaire, partie moyenne',
          'Cingulate gyrus and sulcus (Posterior dorsal part).r': 'Gyrus cingulaire, partie postéro-dorsale',
          'Cingulate gyrus (Posteroventral part*).r': 'Gyrus cingulaire, partie postéro-ventrale',

          // Insula
          'Insula (Subcentral gyrus and ant. and post. sulci*).r': 'Insula',

          // Les trois sillons qui délimitent les lobes. La scissure de Sylvius
          // n'est pas dans la source : c'est une fente, pas une surface.
          'Central sulcus.r': 'Sillon central (scissure de Rolando)',
          'Parieto-occipital sulcus.r': 'Sillon pariéto-occipital',
          'Calcarine sulcus.r': 'Sillon calcarin',
        },
      },
    ],

    // Coloured by lobe, which is the whole point: a gyrus is learned as part
    // of the lobe it belongs to, and thirty-five colours would say nothing.
    families: {
      'Gyrus frontal supérieur (F1)': 'Lobe frontal',
      'Gyrus frontal moyen (F2)': 'Lobe frontal',
      'Gyrus frontal inférieur, pars opercularis': 'Lobe frontal',
      'Gyrus frontal inférieur, pars triangularis': 'Lobe frontal',
      'Gyrus frontal inférieur, pars orbitalis': 'Lobe frontal',
      'Gyrus précentral': 'Lobe frontal',
      'Gyrus rectus': 'Lobe frontal',
      'Gyri orbitaires': 'Lobe frontal',
      'Lobule paracentral': 'Lobe frontal',

      'Gyrus postcentral': 'Lobe pariétal',
      'Lobule pariétal supérieur': 'Lobe pariétal',
      'Gyrus supramarginal': 'Lobe pariétal',
      'Gyrus angulaire': 'Lobe pariétal',
      Précunéus: 'Lobe pariétal',

      'Gyrus temporal supérieur (T1)': 'Lobe temporal',
      'Gyrus temporal moyen (T2)': 'Lobe temporal',
      'Gyrus temporal inférieur (T3)': 'Lobe temporal',
      'Gyri temporaux transverses (de Heschl)': 'Lobe temporal',
      'Pôle temporal': 'Lobe temporal',
      'Gyrus parahippocampique': 'Lobe temporal',
      'Gyrus occipito-temporal latéral (fusiforme)': 'Lobe temporal',

      Cunéus: 'Lobe occipital',
      'Gyrus lingual': 'Lobe occipital',
      'Gyri occipitaux supérieurs': 'Lobe occipital',
      'Gyrus occipital latéral': 'Lobe occipital',
      'Gyrus occipital inférieur': 'Lobe occipital',
      'Pôle occipital': 'Lobe occipital',

      'Gyrus cingulaire, partie antérieure': 'Lobe limbique',
      'Gyrus cingulaire, partie moyenne': 'Lobe limbique',
      'Gyrus cingulaire, partie postéro-dorsale': 'Lobe limbique',
      'Gyrus cingulaire, partie postéro-ventrale': 'Lobe limbique',

      Insula: 'Insula',

      'Sillon central (scissure de Rolando)': 'Sillons',
      'Sillon pariéto-occipital': 'Sillons',
      'Sillon calcarin': 'Sillons',
    },

    tints: {
      'Lobe frontal': '#C75B85',
      'Lobe pariétal': '#4A86C4',
      'Lobe temporal': '#58A177',
      'Lobe occipital': '#C9982F',
      'Lobe limbique': '#8A63BE',
      Insula: '#3FA5A8',
      Sillons: '#8C8577',
    },
  },

  {
    id: 'profond',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les noyaux gris et les ventricules',
    subtitle: 'Le cerveau profond : noyaux de la base, thalamus, système ventriculaire',
    facing: [1, 0.22, 0.32],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'NervousSystem100.fbx',
        mirrored: true,
        parts: {
          'Caudate nucleus.l': 'Noyau caudé',
          'Putamen.l': 'Putamen',
          'Globus pallidus.l': 'Pallidum',
          'Thalamus.l': 'Thalamus',
          'Red nucleus.l': 'Noyau rouge',
          'Hippocampus.l': 'Hippocampe',
          'Amygdaloid body.l': 'Corps amygdaloïde',
          'Fornix.l': 'Fornix (trigone)',
          'Lateral ventricle.l': 'Ventricule latéral',
          'Optic tract.l': 'Tractus optique',
        },
      },
      {
        file: 'NervousSystem100.fbx',
        // Midline structures the file happens to hold as a half.
        both: true,
        parts: { 'Optic chiasm.l': 'Chiasma optique' },
      },
      {
        file: 'NervousSystem100.fbx',
        // Genuinely single, median structures.
        parts: {
          'Corpus callosum': 'Corps calleux',
          'Septum pellucidum': 'Septum pellucidum',
          'Hippocampal commissure': 'Commissure hippocampique',
          'Third ventricle': 'Troisième ventricule',
          'Fourth ventricle': 'Quatrième ventricule',
        },
      },
    ],

    families: {
      'Noyau caudé': 'Noyaux gris centraux',
      Putamen: 'Noyaux gris centraux',
      Pallidum: 'Noyaux gris centraux',

      Thalamus: 'Diencéphale',

      'Noyau rouge': 'Noyaux du tronc cérébral',

      Hippocampe: 'Système limbique',
      'Corps amygdaloïde': 'Système limbique',
      'Fornix (trigone)': 'Système limbique',
      'Commissure hippocampique': 'Système limbique',

      'Ventricule latéral': 'Système ventriculaire',
      'Troisième ventricule': 'Système ventriculaire',
      'Quatrième ventricule': 'Système ventriculaire',
      'Septum pellucidum': 'Système ventriculaire',

      'Corps calleux': 'Commissures',

      'Chiasma optique': 'Voies optiques',
      'Tractus optique': 'Voies optiques',
    },

    tints: {
      'Noyaux gris centraux': '#C75B85',
      Diencéphale: '#8A63BE',
      'Noyaux du tronc cérébral': '#C45A54',
      'Système limbique': '#58A177',
      'Système ventriculaire': '#4A86C4',
      Commissures: '#8C8577',
      'Voies optiques': '#C9982F',
    },
  },

  {
    id: 'cervelet',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Le cervelet et le tronc cérébral',
    subtitle: 'Vermis, lobules, pédoncules, et les trois étages du tronc',
    // Seen from behind and a little above, which is the only view where the
    // vermis and the two hemispheres are all three on the screen at once.
    facing: [0.35, 0.3, -1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'NervousSystem100.fbx',
        // The cerebellar lobules ship as a right hemisphere, like the cortex.
        mirrored: true,
        side: 'r',
        // Z-Anatomy draws the cerebellar lobules as smooth masses — the folia
        // are not in the geometry to begin with — so decimating them changes
        // nothing on screen and saves half a megabyte. Checked by looking.
        simplify: 0.0006,
        parts: {
          'Anterior quadrangular lobule.r': 'Lobule quadrangulaire antérieur',
          'Posterior quadrangular lobule.r': 'Lobule quadrangulaire postérieur',
          'Superior semilunar lobule.r': 'Lobule semi-lunaire supérieur',
          'Inferior semilunar lobule.r': 'Lobule semi-lunaire inférieur',
          'Gracile lobule.r': 'Lobule gracile',
          'Biventral lobule.r': 'Lobule biventre',
          'Tonsil of cerebellum.r': 'Amygdale cérébelleuse',
          'Flocculus.r': 'Flocculus',
          'Wing of central lobule.r': 'Aile du lobule central',
          'Superior cerebellar peduncle.r': 'Pédoncule cérébelleux supérieur',
        },
      },
      {
        file: 'NervousSystem100.fbx',
        // The colliculi are held as a left, not a right.
        mirrored: true,
        parts: {
          'Superior colliculus.l': 'Colliculus supérieur',
          'Inferior colliculus.l': 'Colliculus inférieur',
        },
      },
      {
        file: 'NervousSystem100.fbx',
        // The vermis is median and comes whole.
        simplify: 0.0006,
        parts: {
          'Lingula of cerebellum': 'Lingula du vermis',
          'Central lobule': 'Lobule central du vermis',
          Culmen: 'Culmen',
          Declive: 'Déclive',
          'Folium of vermis': 'Folium du vermis',
          'Tuber of vermis': 'Tuber du vermis',
          'Pyramis of vermis': 'Pyramis du vermis',
          'Uvula of vermis': 'Uvule du vermis',
          'Nodule of vermis': 'Nodule du vermis',
          'Aqueduct of midbrain': 'Aqueduc du mésencéphale',
        },
      },
      {
        file: 'NervousSystem100.fbx',
        // The three storeys of the brainstem, each held as a half.
        both: true,
        parts: {
          'Midbrain.l': 'Mésencéphale',
          'Pons.l': 'Pont',
          'Medulla oblongata.r': 'Bulbe rachidien',
          'Base of peduncle.l': 'Pied du pédoncule cérébral',
        },
      },
    ],

    families: {
      'Lobule quadrangulaire antérieur': 'Lobe antérieur',
      'Aile du lobule central': 'Lobe antérieur',

      'Lobule quadrangulaire postérieur': 'Lobe postérieur',
      'Lobule semi-lunaire supérieur': 'Lobe postérieur',
      'Lobule semi-lunaire inférieur': 'Lobe postérieur',
      'Lobule gracile': 'Lobe postérieur',
      'Lobule biventre': 'Lobe postérieur',
      'Amygdale cérébelleuse': 'Lobe postérieur',

      Flocculus: 'Lobe flocculo-nodulaire',
      'Nodule du vermis': 'Lobe flocculo-nodulaire',

      'Lingula du vermis': 'Vermis',
      'Lobule central du vermis': 'Vermis',
      Culmen: 'Vermis',
      Déclive: 'Vermis',
      'Folium du vermis': 'Vermis',
      'Tuber du vermis': 'Vermis',
      'Pyramis du vermis': 'Vermis',
      'Uvule du vermis': 'Vermis',

      'Pédoncule cérébelleux supérieur': 'Pédoncules',

      'Aqueduc du mésencéphale': 'Système ventriculaire',

      Mésencéphale: 'Tronc cérébral',
      Pont: 'Tronc cérébral',
      'Bulbe rachidien': 'Tronc cérébral',
      'Pied du pédoncule cérébral': 'Tronc cérébral',

      'Colliculus supérieur': 'Tectum',
      'Colliculus inférieur': 'Tectum',
    },

    tints: {
      'Lobe antérieur': '#C75B85',
      'Lobe postérieur': '#4A86C4',
      'Lobe flocculo-nodulaire': '#C9982F',
      Vermis: '#58A177',
      Pédoncules: '#3FA5A8',
      'Tronc cérébral': '#8C8577',
      Tectum: '#8A63BE',
      'Système ventriculaire': '#A97048',
    },
  },

  {
    id: 'membre-sup',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les os du membre supérieur',
    subtitle: 'Ceinture scapulaire, bras et avant-bras — côté gauche',
    // One limb, not two. A plate draws one arm, and mirroring would double the
    // geometry to say nothing new. Z-Anatomy holds the left, so it is the left.
    facing: [0.35, 0, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'SkeletalSystem100.fbx',
        parts: {
          'Scapula.l': 'Scapula',
          'Clavicle.l': 'Clavicule',
          'Humerus.l': 'Humérus',
          'Radius.l': 'Radius',
          'Ulna.l': 'Ulna',
        },
      },
    ],

    // One colour per bone, like the skull: there is no group here that a
    // question is asked about.
    tints: {
      Scapula: '#C75B85',
      Clavicule: '#4A86C4',
      Humérus: '#58A177',
      Radius: '#C9982F',
      Ulna: '#8A63BE',
    },
  },

  {
    id: 'main',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'La main',
    subtitle: 'Les vingt-sept os du carpe, du métacarpe et des doigts — main gauche',
    facing: [0, 0, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'SkeletalSystem100.fbx',
        parts: {
          // Première rangée du carpe, de dehors en dedans
          'Scaphoid bone.l': 'Scaphoïde',
          'Lunate bone.l': 'Lunatum (semi-lunaire)',
          'Triquetrum bone.l': 'Triquetrum (pyramidal)',
          'Pisiform bone.l': 'Pisiforme',
          // Deuxième rangée
          'Trapezium bone.l': 'Trapèze',
          'Trapezoid bone.l': 'Trapézoïde',
          'Capitate bone.l': 'Capitatum (grand os)',
          'Hamate bone.l': 'Hamatum (os crochu)',

          'First metacarpal bone.l': 'Premier métacarpien',
          'Second metacarpal bone.l': 'Deuxième métacarpien',
          'Third metacarpal bone.l': 'Troisième métacarpien',
          'Fourth metacarpal bone.l': 'Quatrième métacarpien',
          'Fifth metacarpal bone.l': 'Cinquième métacarpien',

          'Proximal phalanx of first finger of hand.l': 'Phalange proximale du pouce',
          'Distal phalanx of first finger of hand.l': 'Phalange distale du pouce',
          'Proximal phalanx of second finger of hand.l': 'Phalange proximale de l’index',
          'Middle phalanx of second finger of hand.l': 'Phalange moyenne de l’index',
          'Distal phalanx of second finger of hand.l': 'Phalange distale de l’index',
          'Proximal phalanx of third finger of hand.l': 'Phalange proximale du majeur',
          'Middle phalanx of third finger of hand.l': 'Phalange moyenne du majeur',
          'Distal phalanx of third finger of hand.l': 'Phalange distale du majeur',
          'Proximal phalanx of fourth finger of hand.l': 'Phalange proximale de l’annulaire',
          'Middle phalanx of fourth finger of hand.l': 'Phalange moyenne de l’annulaire',
          'Distal phalanx of fourth finger of hand.l': 'Phalange distale de l’annulaire',
          'Proximal phalanx of fifth finger of hand.l': 'Phalange proximale de l’auriculaire',
          'Middle phalanx of fifth finger of hand.l': 'Phalange moyenne de l’auriculaire',
          'Distal phalanx of fifth finger of hand.l': 'Phalange distale de l’auriculaire',
        },
      },
    ],

    // Coloured by the row and the ray, because that is how the carpus is
    // learned: two rows of four, then five rays.
    families: {
      Scaphoïde: 'Première rangée du carpe',
      'Lunatum (semi-lunaire)': 'Première rangée du carpe',
      'Triquetrum (pyramidal)': 'Première rangée du carpe',
      Pisiforme: 'Première rangée du carpe',

      Trapèze: 'Deuxième rangée du carpe',
      Trapézoïde: 'Deuxième rangée du carpe',
      'Capitatum (grand os)': 'Deuxième rangée du carpe',
      'Hamatum (os crochu)': 'Deuxième rangée du carpe',

      'Premier métacarpien': 'Métacarpe',
      'Deuxième métacarpien': 'Métacarpe',
      'Troisième métacarpien': 'Métacarpe',
      'Quatrième métacarpien': 'Métacarpe',
      'Cinquième métacarpien': 'Métacarpe',

      'Phalange proximale du pouce': 'Phalanges proximales',
      'Phalange proximale de l’index': 'Phalanges proximales',
      'Phalange proximale du majeur': 'Phalanges proximales',
      'Phalange proximale de l’annulaire': 'Phalanges proximales',
      'Phalange proximale de l’auriculaire': 'Phalanges proximales',

      'Phalange moyenne de l’index': 'Phalanges moyennes',
      'Phalange moyenne du majeur': 'Phalanges moyennes',
      'Phalange moyenne de l’annulaire': 'Phalanges moyennes',
      'Phalange moyenne de l’auriculaire': 'Phalanges moyennes',

      'Phalange distale du pouce': 'Phalanges distales',
      'Phalange distale de l’index': 'Phalanges distales',
      'Phalange distale du majeur': 'Phalanges distales',
      'Phalange distale de l’annulaire': 'Phalanges distales',
      'Phalange distale de l’auriculaire': 'Phalanges distales',
    },

    tints: {
      'Première rangée du carpe': '#C75B85',
      'Deuxième rangée du carpe': '#4A86C4',
      Métacarpe: '#58A177',
      'Phalanges proximales': '#C9982F',
      'Phalanges moyennes': '#8A63BE',
      'Phalanges distales': '#3FA5A8',
    },
  },

  {
    id: 'membre-inf',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les os du membre inférieur',
    subtitle: 'Os coxal, fémur, patella, tibia et fibula — côté gauche',
    facing: [0.35, 0, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'SkeletalSystem100.fbx',
        parts: {
          'Hip bone.l': 'Os coxal',
          'Femur.l': 'Fémur',
          'Patella.l': 'Patella',
          'Tibia.l': 'Tibia',
          'Fibula.l': 'Fibula',
        },
      },
      {
        file: 'SkeletalSystem100.fbx',
        parts: { Sacrum: 'Sacrum', Coccyx: 'Coccyx' },
      },
    ],

    tints: {
      'Os coxal': '#C75B85',
      Fémur: '#4A86C4',
      Patella: '#C9982F',
      Tibia: '#58A177',
      Fibula: '#8A63BE',
      Sacrum: '#A97048',
      Coccyx: '#3FA5A8',
    },
  },

  {
    id: 'pied',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Le pied',
    subtitle: 'Les vingt-six os du tarse, du métatarse et des orteils — pied gauche',
    facing: [0.2, 0.55, 0.8],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'SkeletalSystem100.fbx',
        parts: {
          'Talus.l': 'Talus',
          'Calcaneus.l': 'Calcanéus',
          'Navicular bone.l': 'Os naviculaire',
          'Cuboid bone.l': 'Os cuboïde',
          'Medial cuneiform bone.l': 'Cunéiforme médial',
          'Intermediate cuneiform bone.l': 'Cunéiforme intermédiaire',
          'Lateral cuneiform bone.l': 'Cunéiforme latéral',

          'First metatarsal bone.l': 'Premier métatarsien',
          'Second metatarsal bone.l': 'Deuxième métatarsien',
          'Third metatarsal bone.l': 'Troisième métatarsien',
          'Fourth metatarsal bone.l': 'Quatrième métatarsien',
          'Fifth metatarsal bone.l': 'Cinquième métatarsien',

          'Proximal phalanx of first finger of foot.l': 'Phalange proximale de l’hallux',
          'Distal phalanx of first finger of foot.l': 'Phalange distale de l’hallux',
          'Proximal phalanx of second finger of foot.l': 'Phalange proximale du deuxième orteil',
          'Middle phalanx of second finger of foot.l': 'Phalange moyenne du deuxième orteil',
          'Distal phalanx of second finger of foot.l': 'Phalange distale du deuxième orteil',
          'Proximal phalanx of third finger of foot.l': 'Phalange proximale du troisième orteil',
          'Middle phalanx of third finger of foot.l': 'Phalange moyenne du troisième orteil',
          'Distal phalanx of third finger of foot.l': 'Phalange distale du troisième orteil',
          'Proximal phalanx of fourth finger of foot.l': 'Phalange proximale du quatrième orteil',
          'Middle phalanx of fourth finger of foot.l': 'Phalange moyenne du quatrième orteil',
          'Distal phalanx of fourth finger of foot.l': 'Phalange distale du quatrième orteil',
          'Proximal phalanx of fifth finger of foot.l': 'Phalange proximale du cinquième orteil',
          'Middle phalanx of fifth finger of foot.l': 'Phalange moyenne du cinquième orteil',
          'Distal phalanx of fifth finger of foot.l': 'Phalange distale du cinquième orteil',
        },
      },
    ],

    // Coloured by the row, the way the foot is divided when it is taught:
    // arrière-pied, médio-pied, avant-pied.
    families: {
      Talus: 'Tarse postérieur',
      Calcanéus: 'Tarse postérieur',

      'Os naviculaire': 'Tarse antérieur',
      'Os cuboïde': 'Tarse antérieur',
      'Cunéiforme médial': 'Tarse antérieur',
      'Cunéiforme intermédiaire': 'Tarse antérieur',
      'Cunéiforme latéral': 'Tarse antérieur',

      'Premier métatarsien': 'Métatarse',
      'Deuxième métatarsien': 'Métatarse',
      'Troisième métatarsien': 'Métatarse',
      'Quatrième métatarsien': 'Métatarse',
      'Cinquième métatarsien': 'Métatarse',

      'Phalange proximale de l’hallux': 'Phalanges proximales',
      'Phalange proximale du deuxième orteil': 'Phalanges proximales',
      'Phalange proximale du troisième orteil': 'Phalanges proximales',
      'Phalange proximale du quatrième orteil': 'Phalanges proximales',
      'Phalange proximale du cinquième orteil': 'Phalanges proximales',

      'Phalange moyenne du deuxième orteil': 'Phalanges moyennes',
      'Phalange moyenne du troisième orteil': 'Phalanges moyennes',
      'Phalange moyenne du quatrième orteil': 'Phalanges moyennes',
      'Phalange moyenne du cinquième orteil': 'Phalanges moyennes',

      'Phalange distale de l’hallux': 'Phalanges distales',
      'Phalange distale du deuxième orteil': 'Phalanges distales',
      'Phalange distale du troisième orteil': 'Phalanges distales',
      'Phalange distale du quatrième orteil': 'Phalanges distales',
      'Phalange distale du cinquième orteil': 'Phalanges distales',
    },

    tints: {
      'Tarse postérieur': '#C75B85',
      'Tarse antérieur': '#4A86C4',
      Métatarse: '#58A177',
      'Phalanges proximales': '#C9982F',
      'Phalanges moyennes': '#8A63BE',
      'Phalanges distales': '#3FA5A8',
    },
  },

  {
    id: 'thorax',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'La cage thoracique',
    subtitle: 'Sternum, côtes et cartilages costaux, et le diaphragme — côté gauche',
    facing: [0.5, 0.1, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'SkeletalSystem100.fbx',
        // One hemithorax, like the limbs: a plate draws one side and the other
        // is its mirror. A rib arrives as thirty thousand triangles of smooth
        // tube, which is more resolution than a rib has shape.
        simplify: 0.0007,
        parts: {
          'Manubrium of sternum': 'Manubrium sternal',
          'Body of sternum': 'Corps du sternum',
          'Xiphoid process': 'Processus xiphoïde',
          'First rib.l': 'Première côte',
          'Second rib.l': 'Deuxième côte',
          'Third rib.l': 'Troisième côte',
          'Fourth rib.l': 'Quatrième côte',
          'Fifth rib.l': 'Cinquième côte',
          'Sixth rib.l': 'Sixième côte',
          'Seventh rib.l': 'Septième côte',
          'Eighth rib.l': 'Huitième côte',
          'Ninth rib.l': 'Neuvième côte',
          'Tenth rib.l': 'Dixième côte',
          'Eleventh rib.l': 'Onzième côte',
          'Twelfth rib.l': 'Douzième côte',
          'Costal cartilage of first rib.l': 'Cartilage costal de la première côte',
          'Costal cartilage of second rib.l': 'Cartilage costal de la deuxième côte',
          'Costal cartilage of third rib.l': 'Cartilage costal de la troisième côte',
          'Costal cartilage of fourth rib.l': 'Cartilage costal de la quatrième côte',
          'Costal cartilage of fifth rib.l': 'Cartilage costal de la cinquième côte',
          'Costal cartilage of sixth rib.l': 'Cartilage costal de la sixième côte',
          'Costal cartilage of seventh rib.l': 'Cartilage costal de la septième côte',
          'Costal cartilage of eighth rib.l': 'Cartilage costal de la huitième côte',
          'Costal cartilage of ninth rib.l': 'Cartilage costal de la neuvième côte',
          'Costal cartilage of tenth rib.l': 'Cartilage costal de la dixième côte',
        },
      },
      {
        file: 'MuscularSystem100.fbx',
        simplify: 0.0009,
        parts: { Diaphragm: 'Diaphragme' },
      },
    ],

    families: {
      'Manubrium sternal': 'Sternum',
      'Corps du sternum': 'Sternum',
      'Processus xiphoïde': 'Sternum',
      'Première côte': 'Côtes vraies',
      'Deuxième côte': 'Côtes vraies',
      'Troisième côte': 'Côtes vraies',
      'Quatrième côte': 'Côtes vraies',
      'Cinquième côte': 'Côtes vraies',
      'Sixième côte': 'Côtes vraies',
      'Septième côte': 'Côtes vraies',
      'Huitième côte': 'Côtes fausses',
      'Neuvième côte': 'Côtes fausses',
      'Dixième côte': 'Côtes fausses',
      'Onzième côte': 'Côtes flottantes',
      'Douzième côte': 'Côtes flottantes',
      'Cartilage costal de la première côte': 'Cartilages costaux',
      'Cartilage costal de la deuxième côte': 'Cartilages costaux',
      'Cartilage costal de la troisième côte': 'Cartilages costaux',
      'Cartilage costal de la quatrième côte': 'Cartilages costaux',
      'Cartilage costal de la cinquième côte': 'Cartilages costaux',
      'Cartilage costal de la sixième côte': 'Cartilages costaux',
      'Cartilage costal de la septième côte': 'Cartilages costaux',
      'Cartilage costal de la huitième côte': 'Cartilages costaux',
      'Cartilage costal de la neuvième côte': 'Cartilages costaux',
      'Cartilage costal de la dixième côte': 'Cartilages costaux',
      Diaphragme: 'Diaphragme',
    },

    tints: {
      Sternum: '#C75B85',
      'Côtes vraies': '#4A86C4',
      'Côtes fausses': '#58A177',
      'Côtes flottantes': '#8A63BE',
      'Cartilages costaux': '#C9982F',
      Diaphragme: '#C45A54',
    },
  },

  {
    id: 'colonne',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Le rachis thoracique et lombal',
    subtitle: 'T1 à T12, L1 à L5, le sacrum et le coccyx',
    facing: [0.6, 0.05, 0.8],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'SkeletalSystem100.fbx',
        parts: {
          'Vertebra T1': 'Vertèbre T1',
          'Vertebra T2': 'Vertèbre T2',
          'Vertebra T3': 'Vertèbre T3',
          'Vertebra T4': 'Vertèbre T4',
          'Vertebra T5': 'Vertèbre T5',
          'Vertebra T6': 'Vertèbre T6',
          'Vertebra T7': 'Vertèbre T7',
          'Vertebra T8': 'Vertèbre T8',
          'Vertebra T9': 'Vertèbre T9',
          'Vertebra T10': 'Vertèbre T10',
          'Vertebra T11': 'Vertèbre T11',
          'Vertebra T12': 'Vertèbre T12',
          'Vertebra L1': 'Vertèbre L1',
          'Vertebra L2': 'Vertèbre L2',
          'Vertebra L3': 'Vertèbre L3',
          'Vertebra L4': 'Vertèbre L4',
          'Vertebra L5': 'Vertèbre L5',
          Sacrum: 'Sacrum',
          Coccyx: 'Coccyx',
        },
      },
    ],

    families: {
      'Vertèbre T1': 'Vertèbres thoraciques',
      'Vertèbre T2': 'Vertèbres thoraciques',
      'Vertèbre T3': 'Vertèbres thoraciques',
      'Vertèbre T4': 'Vertèbres thoraciques',
      'Vertèbre T5': 'Vertèbres thoraciques',
      'Vertèbre T6': 'Vertèbres thoraciques',
      'Vertèbre T7': 'Vertèbres thoraciques',
      'Vertèbre T8': 'Vertèbres thoraciques',
      'Vertèbre T9': 'Vertèbres thoraciques',
      'Vertèbre T10': 'Vertèbres thoraciques',
      'Vertèbre T11': 'Vertèbres thoraciques',
      'Vertèbre T12': 'Vertèbres thoraciques',
      'Vertèbre L1': 'Vertèbres lombales',
      'Vertèbre L2': 'Vertèbres lombales',
      'Vertèbre L3': 'Vertèbres lombales',
      'Vertèbre L4': 'Vertèbres lombales',
      'Vertèbre L5': 'Vertèbres lombales',
      Sacrum: 'Sacrum et coccyx',
      Coccyx: 'Sacrum et coccyx',
    },

    tints: {
      'Vertèbres thoraciques': '#4A86C4',
      'Vertèbres lombales': '#C9982F',
      'Sacrum et coccyx': '#A97048',
    },
  },

  {
    id: 'coeur',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Le cœur',
    subtitle: 'Les quatre cavités, les gros vaisseaux et les artères coronaires',
    facing: [0.15, 0.1, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'CardioVascular41.fbx',
        simplify: 0.0005,
        parts: {
          'Right atrium': 'Atrium droit',
          'Right ventricle': 'Ventricule droit',
          'Left atrium': 'Atrium gauche',
          'Left ventricle': 'Ventricule gauche',
          'Ascending aorta': 'Aorte ascendante',
          'Aortic arch': 'Crosse de l’aorte',
          'Pulmonary trunk': 'Tronc pulmonaire',
          'Superior vena cava': 'Veine cave supérieure',
          'Inferior vena cava (thoracic part)': 'Veine cave inférieure',
          'Left coronary artery': 'Artère coronaire gauche',
          'Anterior interventricular artery': 'Artère interventriculaire antérieure',
          'Circumflex artery of heart': 'Artère circonflexe',
          'Right coronary artery': 'Artère coronaire droite',
          'Coronary sinus': 'Sinus coronaire',
          'Great cardiac vein': 'Grande veine cardiaque',
        },
      },
    ],

    families: {
      'Atrium droit': 'Cavités droites',
      'Ventricule droit': 'Cavités droites',
      'Atrium gauche': 'Cavités gauches',
      'Ventricule gauche': 'Cavités gauches',
      'Aorte ascendante': 'Gros vaisseaux',
      'Crosse de l’aorte': 'Gros vaisseaux',
      'Tronc pulmonaire': 'Gros vaisseaux',
      'Veine cave supérieure': 'Gros vaisseaux',
      'Veine cave inférieure': 'Gros vaisseaux',
      'Artère coronaire gauche': 'Artères coronaires',
      'Artère interventriculaire antérieure': 'Artères coronaires',
      'Artère circonflexe': 'Artères coronaires',
      'Artère coronaire droite': 'Artères coronaires',
      'Sinus coronaire': 'Veines cardiaques',
      'Grande veine cardiaque': 'Veines cardiaques',
    },

    tints: {
      'Cavités droites': '#4A86C4',
      'Cavités gauches': '#C45A54',
      'Gros vaisseaux': '#8A63BE',
      'Artères coronaires': '#E4596A',
      'Veines cardiaques': '#2E75B6',
    },
  },

  {
    id: 'poumons',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les poumons et l’arbre bronchique',
    subtitle: 'Les cinq lobes, la trachée et les bronches',
    facing: [0.1, 0.05, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'VisceralSystem100.fbx',
        simplify: 0.0008,
        parts: {
          'Superior lobe of right lung': 'Lobe supérieur droit',
          'Middle lobe of right lung': 'Lobe moyen droit',
          'Inferior lobe of right lung': 'Lobe inférieur droit',
          'Superior lobe of left lung': 'Lobe supérieur gauche',
          'Inferior lobe of left lung': 'Lobe inférieur gauche',
          Trachea: 'Trachée',
          'Right main bronchus': 'Bronche principale droite',
          'Left main bronchus': 'Bronche principale gauche',
          'Right superior lobar bronchus': 'Bronche lobaire supérieure droite',
          'Right inferior lobar bronchus': 'Bronche lobaire inférieure droite',
          'Left superior lobar bronchus': 'Bronche lobaire supérieure gauche',
          'Left inferior lobar bronchus': 'Bronche lobaire inférieure gauche',
        },
      },
    ],

    families: {
      'Lobe supérieur droit': 'Poumon droit',
      'Lobe moyen droit': 'Poumon droit',
      'Lobe inférieur droit': 'Poumon droit',
      'Lobe supérieur gauche': 'Poumon gauche',
      'Lobe inférieur gauche': 'Poumon gauche',
      Trachée: 'Voies aériennes',
      'Bronche principale droite': 'Voies aériennes',
      'Bronche principale gauche': 'Voies aériennes',
      'Bronche lobaire supérieure droite': 'Bronches lobaires',
      'Bronche lobaire inférieure droite': 'Bronches lobaires',
      'Bronche lobaire supérieure gauche': 'Bronches lobaires',
      'Bronche lobaire inférieure gauche': 'Bronches lobaires',
    },

    tints: {
      'Poumon droit': '#4A86C4',
      'Poumon gauche': '#C75B85',
      'Voies aériennes': '#58A177',
      'Bronches lobaires': '#C9982F',
    },
  },

  {
    id: 'abdomen',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les viscères abdominaux',
    subtitle: 'Foie et ses segments, estomac, rate, pancréas et tube digestif',
    facing: [0.1, 0.05, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'VisceralSystem100.fbx',
        simplify: 0.0008,
        parts: {
          'Posterior segment of liver (I)': 'Foie — segment I (lobe caudé)',
          'Left posterior lateral segment of liver (II)': 'Foie — segment II',
          'Left anterior lateral segment of liver (III)': 'Foie — segment III',
          'Left medial segment of liver (IV)': 'Foie — segment IV (lobe carré)',
          'Anterior medial segment of liver (V)': 'Foie — segment V',
          'Anterior lateral segment of liver (VI)': 'Foie — segment VI',
          'Posterior lateral segment of liver (VII)': 'Foie — segment VII',
          'Posterior medial segment of liver (VIII)': 'Foie — segment VIII',
          Gallbladder: 'Vésicule biliaire',
          Oesophagus: 'Œsophage',
          Stomach: 'Estomac',
          Duodenum: 'Duodénum',
          Jejunum: 'Jéjunum',
          'Ascending colon': 'Côlon ascendant',
          'Transverse colon': 'Côlon transverse',
          'Descending colon': 'Côlon descendant',
          'Sigmoid colon': 'Côlon sigmoïde',
          'Vermiform appendix': 'Appendice vermiforme',
          Pancreas: 'Pancréas',
        },
      },
      {
        file: 'LymphoidOrgans100.fbx',
        parts: { Spleen: 'Rate' },
      },
    ],

    families: {
      'Foie — segment I (lobe caudé)': 'Foie',
      'Foie — segment II': 'Foie',
      'Foie — segment III': 'Foie',
      'Foie — segment IV (lobe carré)': 'Foie',
      'Foie — segment V': 'Foie',
      'Foie — segment VI': 'Foie',
      'Foie — segment VII': 'Foie',
      'Foie — segment VIII': 'Foie',
      'Vésicule biliaire': 'Voies biliaires',
      Œsophage: 'Tube digestif haut',
      Estomac: 'Tube digestif haut',
      Duodénum: 'Intestin grêle',
      Jéjunum: 'Intestin grêle',
      'Côlon ascendant': 'Côlon',
      'Côlon transverse': 'Côlon',
      'Côlon descendant': 'Côlon',
      'Côlon sigmoïde': 'Côlon',
      'Appendice vermiforme': 'Côlon',
      Pancréas: 'Glandes annexes',
      Rate: 'Glandes annexes',
    },

    tints: {
      Foie: '#A97048',
      'Voies biliaires': '#7FA83F',
      'Tube digestif haut': '#C75B85',
      'Intestin grêle': '#C9982F',
      Côlon: '#4A86C4',
      'Glandes annexes': '#8A63BE',
    },
  },

  {
    id: 'urinaire',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'L’appareil urinaire et génital',
    subtitle: 'Reins, uretères, vessie, et l’appareil génital masculin',
    facing: [0.1, 0.05, 1],
    // Both sources are a male reference body. There is no female anatomy to
    // take from either of them, and none is invented here.
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'VisceralSystem100.fbx',
        mirrored: false,
        parts: {
          'Kidney.l': 'Rein gauche',
          'Kidney.r': 'Rein droit',
          'Renal pelvis.l': 'Bassinet gauche',
          'Renal pelvis.r': 'Bassinet droit',
          'Ureter.l': 'Uretère gauche',
          'Ureter.r': 'Uretère droit',
          'Suprarenal gland.l': 'Glande surrénale gauche',
          'Suprarenal gland.r': 'Glande surrénale droite',
          'Urinary bladder': 'Vessie',
          Prostate: 'Prostate',
          'Seminal gland.l': 'Vésicule séminale gauche',
          'Testis.l': 'Testicule gauche',
          'Testis.r': 'Testicule droit',
          'Epididymis.l': 'Épididyme gauche',
          'Epididymis.r': 'Épididyme droit',
          'Ductus deferens.l': 'Conduit déférent gauche',
          'Ductus deferens.r': 'Conduit déférent droit',
          'Corpus cavernosum of penis': 'Corps caverneux',
          'Corpus spongiosum of penis': 'Corps spongieux',
          'Glans penis': 'Gland',
        },
      },
    ],

    families: {
      Rein: 'Reins',
      Bassinet: 'Voies excrétrices',
      Uretère: 'Voies excrétrices',
      Vessie: 'Voies excrétrices',
      'Glande surrénale': 'Glandes surrénales',
      Prostate: 'Appareil génital',
      'Vésicule séminale': 'Appareil génital',
      Testicule: 'Gonades',
      Épididyme: 'Gonades',
      'Conduit déférent': 'Appareil génital',
      'Corps caverneux': 'Organes érectiles',
      'Corps spongieux': 'Organes érectiles',
      Gland: 'Organes érectiles',
    },

    tints: {
      Reins: '#C45A54',
      'Voies excrétrices': '#C9982F',
      'Glandes surrénales': '#8A63BE',
      'Appareil génital': '#4A86C4',
      Gonades: '#58A177',
      'Organes érectiles': '#C75B85',
    },
  },

  {
    id: 'muscles-sup',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les muscles du membre supérieur',
    subtitle: 'Épaule, bras et avant-bras — côté gauche',
    facing: [0.45, 0, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'MuscularSystem100.fbx',
        simplify: 0.0008,
        parts: {
          'Descending part of trapezius muscle.l': 'Trapèze, faisceau descendant',
          'Transverse part of trapezius muscle.l': 'Trapèze, faisceau transverse',
          'Ascending part of trapezius muscle.l': 'Trapèze, faisceau ascendant',
          'Latissimus dorsi muscle.l': 'Grand dorsal',
          'Levator scapulae.l': 'Élévateur de la scapula',
          'Rhomboid major muscle.l': 'Rhomboïde majeur',
          'Rhomboid minor muscle.l': 'Rhomboïde mineur',
          'Serratus anterior muscle.l': 'Dentelé antérieur',
          'Clavicular head of pectoralis major muscle.l': 'Grand pectoral, chef claviculaire',
          'Sternocostal head of pectoralis major muscle.l': 'Grand pectoral, chef sterno-costal',

          'Supraspinatus muscle.l': 'Supra-épineux',
          'Infraspinatus muscle.l': 'Infra-épineux',
          'Teres minor muscle.l': 'Petit rond',
          'Subscapularis muscle.l': 'Subscapulaire',
          'Teres major muscle.l': 'Grand rond',

          'Clavicular part of deltoid muscle.l': 'Deltoïde, faisceau claviculaire',
          'Acromial part of deltoid muscle.l': 'Deltoïde, faisceau acromial',
          'Scapular spinal part of deltoid muscle.l': 'Deltoïde, faisceau spinal',

          'Long head of biceps brachii.l': 'Biceps brachial, longue portion',
          'Short head of biceps brachii.l': 'Biceps brachial, courte portion',
          'Brachialis muscle.l': 'Brachial',
          'Coracobrachialis muscle.l': 'Coraco-brachial',
          'Long head of triceps brachii.l': 'Triceps brachial, longue portion',
          'Lateral head of triceps brachii.l': 'Triceps brachial, vaste latéral',
          'Medial head of triceps brachii.l': 'Triceps brachial, vaste médial',

          'Superficial head of pronator teres.l': 'Rond pronateur',
          'Flexor carpi radialis.l': 'Fléchisseur radial du carpe',
          'Palmaris longus muscle.l': 'Long palmaire',
          'Humeral head of flexor carpi ulnaris.l': 'Fléchisseur ulnaire du carpe',
          'Humero-ulnar head of flexor digitorum superficialis.l': 'Fléchisseur superficiel des doigts',
          'Flexor digitorum profundus.l': 'Fléchisseur profond des doigts',
          'Pronator quadratus.l': 'Carré pronateur',
          'Extensor digitorum.l': 'Extenseur des doigts',
          'Humeral head of extensor carpi ulnaris.l': 'Extenseur ulnaire du carpe',
        },
      },
    ],

    families: {
      'Trapèze, faisceau descendant': 'Muscles de la ceinture',
      'Trapèze, faisceau transverse': 'Muscles de la ceinture',
      'Trapèze, faisceau ascendant': 'Muscles de la ceinture',
      'Grand dorsal': 'Muscles de la ceinture',
      'Élévateur de la scapula': 'Muscles de la ceinture',
      'Rhomboïde majeur': 'Muscles de la ceinture',
      'Rhomboïde mineur': 'Muscles de la ceinture',
      'Dentelé antérieur': 'Muscles de la ceinture',
      'Grand pectoral, chef claviculaire': 'Muscles de la ceinture',
      'Grand pectoral, chef sterno-costal': 'Muscles de la ceinture',

      'Supra-épineux': 'Coiffe des rotateurs',
      'Infra-épineux': 'Coiffe des rotateurs',
      'Petit rond': 'Coiffe des rotateurs',
      Subscapulaire: 'Coiffe des rotateurs',
      'Grand rond': 'Coiffe des rotateurs',

      'Deltoïde, faisceau claviculaire': 'Deltoïde',
      'Deltoïde, faisceau acromial': 'Deltoïde',
      'Deltoïde, faisceau spinal': 'Deltoïde',

      'Biceps brachial, longue portion': 'Loge antérieure du bras',
      'Biceps brachial, courte portion': 'Loge antérieure du bras',
      Brachial: 'Loge antérieure du bras',
      'Coraco-brachial': 'Loge antérieure du bras',

      'Triceps brachial, longue portion': 'Loge postérieure du bras',
      'Triceps brachial, vaste latéral': 'Loge postérieure du bras',
      'Triceps brachial, vaste médial': 'Loge postérieure du bras',

      'Rond pronateur': 'Loge antérieure de l’avant-bras',
      'Fléchisseur radial du carpe': 'Loge antérieure de l’avant-bras',
      'Long palmaire': 'Loge antérieure de l’avant-bras',
      'Fléchisseur ulnaire du carpe': 'Loge antérieure de l’avant-bras',
      'Fléchisseur superficiel des doigts': 'Loge antérieure de l’avant-bras',
      'Fléchisseur profond des doigts': 'Loge antérieure de l’avant-bras',
      'Carré pronateur': 'Loge antérieure de l’avant-bras',

      'Extenseur des doigts': 'Loge postérieure de l’avant-bras',
      'Extenseur ulnaire du carpe': 'Loge postérieure de l’avant-bras',
    },

    tints: {
      'Muscles de la ceinture': '#4A86C4',
      'Coiffe des rotateurs': '#C75B85',
      Deltoïde: '#C9982F',
      'Loge antérieure du bras': '#58A177',
      'Loge postérieure du bras': '#8A63BE',
      'Loge antérieure de l’avant-bras': '#3FA5A8',
      'Loge postérieure de l’avant-bras': '#A97048',
    },
  },

  {
    id: 'muscles-inf',
    module: 'anatomie',
    source: 'zanatomy',
    title: 'Les muscles du membre inférieur',
    subtitle: 'Hanche, cuisse et jambe — côté gauche',
    facing: [0.45, 0, 1],
    credit: 'Z-Anatomy, CC BY-SA 4.0 — d’après BodyParts3D, © The Database Center for Life Science',
    files: [
      {
        file: 'MuscularSystem100.fbx',
        simplify: 0.0009,
        parts: {
          'Psoas major.l': 'Grand psoas',
          'Iliacus muscle.l': 'Iliaque',
          'Gluteus maximus muscle.l': 'Grand fessier',
          'Gluteus medius muscle.l': 'Moyen fessier',
          'Gluteus minimus muscle.l': 'Petit fessier',
          'Piriformis muscle.l': 'Piriforme',
          'Obturator internus.l': 'Obturateur interne',
          'Obturator externus.l': 'Obturateur externe',

          'Rectus femoris muscle.l': 'Droit fémoral',
          'Vastus lateralis muscle.l': 'Vaste latéral',
          'Vastus medialis muscle.l': 'Vaste médial',
          'Vastus intermedius muscle.l': 'Vaste intermédiaire',
          'Sartorius muscle.l': 'Sartorius',

          'Adductor longus.l': 'Long adducteur',
          'Adductor brevis.l': 'Court adducteur',
          'Adductor magnus.l': 'Grand adducteur',
          'Gracilis muscle.l': 'Gracile',
          'Pectineus muscle.l': 'Pectiné',

          'Long head of biceps femoris.l': 'Biceps fémoral, longue portion',
          'Short head of biceps femoris.l': 'Biceps fémoral, courte portion',
          'Semitendinosus muscle.l': 'Semi-tendineux',
          'Semimembranosus muscle.l': 'Semi-membraneux',

          'Tibialis anterior muscle.l': 'Tibial antérieur',
          'Extensor digitorum longus.l': 'Long extenseur des orteils',
          'Fibularis tertius muscle.l': 'Troisième fibulaire',
          'Fibularis longus muscle.l': 'Long fibulaire',
          'Fibularis brevis muscle.l': 'Court fibulaire',
          'Medial head of gastrocnemius.l': 'Gastrocnémien médial',
          'Lateral head of gastrocnemius.l': 'Gastrocnémien latéral',
          'Soleus muscle.l': 'Soléaire',
          'Tibialis posterior muscle.l': 'Tibial postérieur',
          'Flexor digitorum longus.l': 'Long fléchisseur des orteils',
        },
      },
    ],

    families: {
      'Grand psoas': 'Muscles de la hanche',
      Iliaque: 'Muscles de la hanche',
      'Grand fessier': 'Muscles fessiers',
      'Moyen fessier': 'Muscles fessiers',
      'Petit fessier': 'Muscles fessiers',
      Piriforme: 'Pelvi-trochantériens',
      'Obturateur interne': 'Pelvi-trochantériens',
      'Obturateur externe': 'Pelvi-trochantériens',

      'Droit fémoral': 'Loge antérieure de la cuisse',
      'Vaste latéral': 'Loge antérieure de la cuisse',
      'Vaste médial': 'Loge antérieure de la cuisse',
      'Vaste intermédiaire': 'Loge antérieure de la cuisse',
      Sartorius: 'Loge antérieure de la cuisse',

      'Long adducteur': 'Loge médiale de la cuisse',
      'Court adducteur': 'Loge médiale de la cuisse',
      'Grand adducteur': 'Loge médiale de la cuisse',
      Gracile: 'Loge médiale de la cuisse',
      Pectiné: 'Loge médiale de la cuisse',

      'Biceps fémoral, longue portion': 'Loge postérieure de la cuisse',
      'Biceps fémoral, courte portion': 'Loge postérieure de la cuisse',
      'Semi-tendineux': 'Loge postérieure de la cuisse',
      'Semi-membraneux': 'Loge postérieure de la cuisse',

      'Tibial antérieur': 'Loge antérieure de la jambe',
      'Long extenseur des orteils': 'Loge antérieure de la jambe',
      'Troisième fibulaire': 'Loge antérieure de la jambe',

      'Long fibulaire': 'Loge latérale de la jambe',
      'Court fibulaire': 'Loge latérale de la jambe',

      'Gastrocnémien médial': 'Loge postérieure de la jambe',
      'Gastrocnémien latéral': 'Loge postérieure de la jambe',
      Soléaire: 'Loge postérieure de la jambe',
      'Tibial postérieur': 'Loge postérieure de la jambe',
      'Long fléchisseur des orteils': 'Loge postérieure de la jambe',
    },

    tints: {
      'Muscles de la hanche': '#C45A54',
      'Muscles fessiers': '#C75B85',
      'Pelvi-trochantériens': '#A97048',
      'Loge antérieure de la cuisse': '#4A86C4',
      'Loge médiale de la cuisse': '#3FA5A8',
      'Loge postérieure de la cuisse': '#8A63BE',
      'Loge antérieure de la jambe': '#58A177',
      'Loge latérale de la jambe': '#C9982F',
      'Loge postérieure de la jambe': '#7FA83F',
    },
  },

];

/**
 * Structures whose name ends in a side word and has no side.
 *
 * The straight sinus is « le sinus droit » in French, and taking the last word
 * off it as though it were a side leaves « Sinus », which is nothing. There is
 * no way to tell from the string alone, so the exceptions are named.
 */
const WHOLE = new Set([
  // The straight sinus.
  'Sinus droit',
  // A right atrium is not the right-hand copy of an atrium: it takes different
  // blood, has a different wall and a different valve. The same goes for every
  // side-named piece of the heart and the lungs, where left and right are what
  // the structure IS and not which half of the body it sits in — the right lung
  // has three lobes and the left has two.
  'Atrium droit', 'Atrium gauche', 'Ventricule droit', 'Ventricule gauche',
  'Artère coronaire droite', 'Artère coronaire gauche',
  'Lobe supérieur droit', 'Lobe moyen droit', 'Lobe inférieur droit',
  'Lobe supérieur gauche', 'Lobe inférieur gauche',
  'Bronche principale droite', 'Bronche principale gauche',
  'Bronche lobaire supérieure droite', 'Bronche lobaire inférieure droite',
  'Bronche lobaire supérieure gauche', 'Bronche lobaire inférieure gauche',
]);

/** The same bone, whichever side of the head it is on. */
export const boneOf = (name) =>
  (WHOLE.has(name) ? name : name.replace(/\s+(gauche|droite?)$/, ''));

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
