// Anatomy as it is taught, not as it was carved.
//
// The models were built one lecture at a time, and the reader opened them the
// same way: one bundle, alone, centred on itself. That is how a median nerve
// ends up floating in space. A student asking "where is it?" is not helped by
// a nerve on a white background — they need the arm it runs down.
//
// Nothing here duplicates geometry. A region names the bundles its scene is
// composed of, and every bundle is carved in the SAME world frame — one
// standing body, metres, y measured off the floor — so loading `membre-sup`
// and `muscles-sup` together puts the muscles on the bones with no transform
// at all. That was true the whole time; the reader simply never asked for two.
//
// `frame` is the box the camera opens on. Without it a region containing a
// limb and a hand frames the whole body and shows neither.

import { bundleOf } from './bundles.js';

/**
 * A region: what a student opens, and what is in the scene when they do.
 *
 * `bundles` is the CONTEXT — everything visible, opaque, at once. Nothing is
 * ever ghosted: an X-ray of twenty overlapping structures is a picture of
 * none of them. A structure is found by touching it, and what is in the way
 * is taken off.
 *
 * `lead` is the bundle whose list opens first, for a region whose scene holds
 * several. `frame` is in world coordinates, the same metres as the geometry.
 */
export const CURRICULUM = [
  {
    promo: 'PCEM1',
    semesters: [
      {
        id: 's1',
        semester: 'S1',
        title: 'Appareil locomoteur',
        subtitle: 'Membre supérieur et membre inférieur',
        regions: [
          {
            id: 'epaule',
            takes: {
              'muscles-sup': ['Muscles de la ceinture', 'Coiffe des rotateurs', 'Deltoïde'],
              thorax: ['Côtes vraies', 'Sternum'],
            },
            title: 'Épaule',
            subtitle: 'Ceinture scapulaire, coiffe des rotateurs et deltoïde',
            bundles: ['membre-sup', 'muscles-sup', 'thorax'],
            lead: 'membre-sup',
            frame: [[-0.02, 1.16, -0.14], [0.27, 1.47, 0.10]],
          },
          {
            id: 'bras',
            takes: {
              'muscles-sup': ['Deltoïde', 'Loge antérieure du bras', 'Loge postérieure du bras'],
            },
            title: 'Bras',
            subtitle: 'Humérus, loge antérieure et loge postérieure',
            bundles: ['membre-sup', 'muscles-sup'],
            lead: 'membre-sup',
            frame: [[0.10, 1.03, -0.10], [0.27, 1.43, 0.06]],
          },
          {
            id: 'coude',
            takes: {
              'muscles-sup': ['Loge antérieure du bras', 'Loge postérieure du bras',
                'Loge antérieure de l’avant-bras', 'Loge postérieure de l’avant-bras'],
            },
            title: 'Coude',
            subtitle: 'Palette humérale, olécrâne et tête radiale',
            bundles: ['membre-sup', 'muscles-sup'],
            lead: 'membre-sup',
            frame: [[0.16, 1.01, -0.09], [0.30, 1.16, 0.06]],
          },
          {
            id: 'avant-bras',
            takes: {
              'muscles-sup': ['Loge antérieure de l’avant-bras', 'Loge postérieure de l’avant-bras'],
            },
            title: 'Avant-bras',
            subtitle: 'Radius, ulna, fléchisseurs et extenseurs',
            bundles: ['membre-sup', 'muscles-sup'],
            lead: 'membre-sup',
            frame: [[0.17, 0.83, -0.08], [0.33, 1.13, 0.09]],
          },
          {
            id: 'poignet',
            takes: {
              'muscles-sup': ['Loge antérieure de l’avant-bras', 'Loge postérieure de l’avant-bras'],
            },
            title: 'Poignet',
            subtitle: 'Extrémités distales et la première rangée du carpe',
            bundles: ['membre-sup', 'main', 'muscles-sup'],
            lead: 'main',
            frame: [[0.21, 0.82, -0.06], [0.33, 0.90, 0.07]],
          },
          {
            id: 'main',
            title: 'Main',
            subtitle: 'Carpe, métacarpe et les quatorze phalanges',
            bundles: ['main', 'membre-sup'],
            lead: 'main',
            frame: [[0.22, 0.69, 0.00], [0.34, 0.87, 0.10]],
          },

          {
            id: 'hanche',
            takes: {
              'muscles-inf': ['Muscles de la hanche', 'Muscles fessiers', 'Pelvi-trochantériens'],
            },
            title: 'Hanche',
            subtitle: 'Os coxal, tête fémorale, fessiers et pelvi-trochantériens',
            bundles: ['membre-inf', 'muscles-inf'],
            lead: 'membre-inf',
            frame: [[-0.07, 0.68, -0.13], [0.16, 1.02, 0.08]],
          },
          {
            id: 'cuisse',
            takes: {
              'muscles-inf': ['Loge antérieure de la cuisse', 'Loge médiale de la cuisse',
                'Loge postérieure de la cuisse'],
            },
            title: 'Cuisse',
            subtitle: 'Fémur, quadriceps, adducteurs et ischio-jambiers',
            bundles: ['membre-inf', 'muscles-inf'],
            lead: 'membre-inf',
            frame: [[0.00, 0.40, -0.10], [0.17, 0.92, 0.07]],
          },
          {
            id: 'genou',
            takes: {
              'muscles-inf': ['Loge antérieure de la cuisse', 'Loge postérieure de la cuisse',
                'Loge postérieure de la jambe'],
            },
            title: 'Genou',
            subtitle: 'Condyles, plateau tibial et patella',
            bundles: ['membre-inf', 'muscles-inf'],
            lead: 'membre-inf',
            frame: [[0.02, 0.36, -0.11], [0.15, 0.50, 0.06]],
          },
          {
            id: 'jambe',
            takes: {
              'muscles-inf': ['Loge antérieure de la jambe', 'Loge latérale de la jambe',
                'Loge postérieure de la jambe'],
            },
            title: 'Jambe',
            subtitle: 'Tibia, fibula et les quatre loges',
            bundles: ['membre-inf', 'muscles-inf'],
            lead: 'membre-inf',
            frame: [[0.02, 0.05, -0.12], [0.16, 0.44, 0.06]],
          },
          {
            id: 'cheville',
            takes: {
              'muscles-inf': ['Loge antérieure de la jambe', 'Loge latérale de la jambe',
                'Loge postérieure de la jambe'],
            },
            title: 'Cheville',
            subtitle: 'Mortaise tibio-fibulaire, talus et calcanéus',
            bundles: ['pied', 'membre-inf', 'muscles-inf'],
            lead: 'pied',
            frame: [[0.03, 0.00, -0.10], [0.15, 0.10, 0.05]],
          },
          {
            id: 'pied',
            takes: {
              'muscles-inf': ['Loge antérieure de la jambe', 'Loge latérale de la jambe',
                'Loge postérieure de la jambe'],
            },
            title: 'Pied',
            subtitle: 'Tarse, métatarse et les orteils',
            bundles: ['pied', 'muscles-inf'],
            lead: 'pied',
            frame: [[0.04, 0.00, -0.10], [0.15, 0.09, 0.14]],
          },
        ],
      },

      {
        id: 's2',
        semester: 'S2',
        title: 'Thorax et abdomen',
        subtitle: 'Paroi, médiastin, et les viscères',
        regions: [
          {
            id: 'paroi-thoracique',
            title: 'Paroi thoracique',
            subtitle: 'Sternum, côtes, cartilages costaux et le diaphragme',
            bundles: ['thorax', 'colonne'],
            lead: 'thorax',
            frame: [[-0.14, 1.03, -0.12], [0.15, 1.46, 0.16]],
          },
          {
            id: 'mediastin',
            title: 'Médiastin',
            subtitle: 'Le cœur et les gros vaisseaux entre les deux poumons',
            bundles: ['coeur', 'poumons', 'thorax'],
            lead: 'coeur',
            frame: [[-0.09, 1.15, -0.09], [0.10, 1.42, 0.10]],
          },
          {
            id: 'coeur',
            title: 'Cœur',
            subtitle: 'Les quatre cavités et les artères coronaires',
            bundles: ['coeur', 'poumons'],
            lead: 'coeur',
            frame: [[-0.05, 1.16, -0.06], [0.10, 1.40, 0.10]],
          },
          {
            id: 'poumons',
            title: 'Poumons et plèvre',
            subtitle: 'Les cinq lobes et l’arbre bronchique',
            bundles: ['poumons', 'coeur', 'thorax'],
            lead: 'poumons',
            frame: [[-0.14, 1.15, -0.10], [0.14, 1.47, 0.12]],
          },
          {
            id: 'abdomen',
            title: 'Viscères abdominaux',
            subtitle: 'Foie, estomac, rate, pancréas et le tube digestif',
            bundles: ['abdomen', 'thorax'],
            lead: 'abdomen',
            frame: [[-0.13, 0.80, -0.10], [0.13, 1.30, 0.14]],
          },
          {
            id: 'retroperitoine',
            title: 'Rétropéritoine',
            subtitle: 'Reins, surrénales, uretères et les gros vaisseaux',
            bundles: ['urinaire', 'abdomen', 'colonne'],
            lead: 'urinaire',
            frame: [[-0.11, 0.95, -0.08], [0.11, 1.25, 0.08]],
          },
          {
            id: 'rachis-tl',
            title: 'Rachis thoracique et lombal',
            subtitle: 'T1 à T12, L1 à L5, le sacrum et le coccyx',
            bundles: ['colonne', 'thorax'],
            lead: 'colonne',
            frame: [[-0.08, 0.82, -0.12], [0.08, 1.46, 0.06]],
          },
        ],
      },
    ],
  },

  {
    promo: 'PCEM2',
    semesters: [
      {
        id: 's1',
        semester: 'S1',
        title: 'Tête et cou',
        subtitle: 'Crâne, face, cou et neuroanatomie',
        regions: [
          {
            id: 'crane',
            title: 'Crâne',
            subtitle: 'Les vingt-deux os, leurs parties et leurs orifices',
            // The skull alone on purpose: it is the one model with landmarks,
            // and sixty-seven of them on a head wearing its muscles is a head
            // with sixty-seven dots on the skin.
            bundles: ['crane'],
            lead: 'crane',
          },
          {
            id: 'base-du-crane',
            title: 'Base du crâne',
            subtitle: 'Les trois étages, et ce qui passe par chaque orifice',
            bundles: ['crane', 'nerfs'],
            lead: 'crane',
            frame: [[-0.08, 1.50, -0.11], [0.08, 1.60, 0.09]],
          },
          {
            id: 'face',
            title: 'Face',
            subtitle: 'Muscles peauciers et muscles masticateurs',
            bundles: ['tete', 'crane'],
            lead: 'tete',
            frame: [[-0.08, 1.49, -0.06], [0.08, 1.71, 0.11]],
          },
          {
            id: 'cou',
            title: 'Cou',
            subtitle: 'Triangles, muscles sus- et sous-hyoïdiens',
            bundles: ['cou', 'rachis'],
            lead: 'cou',
            frame: [[-0.15, 1.29, -0.11], [0.15, 1.59, 0.08]],
          },
          {
            id: 'rachis-cervical',
            title: 'Rachis cervical',
            subtitle: 'C1 à C7, les disques et le squelette du larynx',
            bundles: ['rachis', 'cou'],
            lead: 'rachis',
            frame: [[-0.06, 1.42, -0.10], [0.06, 1.60, 0.06]],
          },
          {
            id: 'vaisseaux',
            title: 'Vaisseaux de la tête et du cou',
            subtitle: 'Carotides, vertébrales, jugulaires et sinus duraux',
            bundles: ['vaisseaux', 'crane', 'rachis'],
            lead: 'vaisseaux',
            frame: [[-0.09, 1.38, -0.11], [0.09, 1.71, 0.10]],
          },
          {
            id: 'nerfs-craniens',
            title: 'Nerfs crâniens',
            subtitle: 'Les douze paires et le tronc cérébral',
            bundles: ['nerfs', 'crane'],
            lead: 'nerfs',
            frame: [[-0.07, 1.50, -0.05], [0.07, 1.64, 0.10]],
          },
          {
            id: 'encephale',
            title: 'Encéphale',
            subtitle: 'Lobes, circonvolutions et sillons',
            bundles: ['encephale', 'crane'],
            lead: 'encephale',
            frame: [[-0.08, 1.57, -0.11], [0.08, 1.71, 0.09]],
          },
          {
            id: 'cerveau-profond',
            title: 'Cerveau profond',
            subtitle: 'Noyaux gris, thalamus et le système ventriculaire',
            bundles: ['profond', 'encephale'],
            lead: 'profond',
            frame: [[-0.05, 1.55, -0.08], [0.05, 1.67, 0.06]],
          },
          {
            id: 'cervelet',
            title: 'Cervelet et tronc cérébral',
            subtitle: 'Vermis, lobules et les trois étages du tronc',
            bundles: ['cervelet', 'nerfs'],
            lead: 'cervelet',
            frame: [[-0.06, 1.53, -0.10], [0.06, 1.63, 0.03]],
          },
        ],
      },

      {
        id: 's2',
        semester: 'S2',
        title: 'Uro-génital et pelvis',
        subtitle: 'Reins, voies urinaires, pelvis et périnée',
        regions: [
          {
            id: 'bassin',
            title: 'Bassin osseux',
            subtitle: 'Os coxal, sacrum, coccyx et les détroits',
            bundles: ['membre-inf', 'colonne'],
            lead: 'membre-inf',
            frame: [[-0.15, 0.78, -0.12], [0.15, 1.03, 0.08]],
          },
          {
            id: 'reins',
            title: 'Reins et surrénales',
            subtitle: 'Loge rénale, hile, bassinet et les rapports',
            bundles: ['urinaire', 'abdomen', 'colonne'],
            lead: 'urinaire',
            frame: [[-0.11, 1.02, -0.07], [0.11, 1.20, 0.06]],
          },
          {
            id: 'voies-urinaires',
            title: 'Voies urinaires',
            subtitle: 'Uretères, vessie et leurs trois rétrécissements',
            bundles: ['urinaire', 'membre-inf', 'colonne'],
            lead: 'urinaire',
            frame: [[-0.09, 0.80, -0.08], [0.09, 1.18, 0.08]],
          },
          {
            id: 'uro-genital',
            title: 'Appareil génital',
            subtitle: 'Prostate, vésicules séminales, gonades et organes érectiles',
            bundles: ['urinaire', 'membre-inf'],
            lead: 'urinaire',
            frame: [[-0.07, 0.72, -0.07], [0.07, 0.90, 0.12]],
          },
        ],
      },
    ],
  },
];

/** Every region, flat, with the promo and semester it belongs to. */
export const REGIONS = CURRICULUM.flatMap((p) =>
  p.semesters.flatMap((s) =>
    s.regions.map((r) => ({
      ...r,
      promo: p.promo,
      semester: s.semester,
      semesterId: s.id,
      semesterTitle: s.title,
    }))));

/** One region, by the promo, semester and region ids in the address. */
export const regionOf = (promo, semester, id) =>
  REGIONS.find((r) =>
    r.promo.toLowerCase() === String(promo).toLowerCase() &&
    r.semesterId === String(semester).toLowerCase() &&
    r.id === id) || null;

/**
 * The bundles a region's scene is made of, in drawing order, refusing any the
 * catalogue does not have.
 *
 * A region that names a bundle nobody carved would otherwise fail at the fetch
 * and take the whole scene down with it — one missing file and a student gets
 * a spinner instead of the eleven structures that ARE there.
 */
export const bundlesFor = (region) =>
  (region?.bundles || []).map(bundleOf).filter(Boolean);
