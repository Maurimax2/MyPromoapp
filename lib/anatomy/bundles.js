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

];

/**
 * Structures whose name ends in a side word and has no side.
 *
 * The straight sinus is « le sinus droit » in French, and taking the last word
 * off it as though it were a side leaves « Sinus », which is nothing. There is
 * no way to tell from the string alone, so the exceptions are named.
 */
const WHOLE = new Set(['Sinus droit']);

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
