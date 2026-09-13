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
