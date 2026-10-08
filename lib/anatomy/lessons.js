// The anatomy of a year, in the order it is taught.
//
// The models used to be reached by system — a skull here, the whole body
// there, the drawings on a third screen — and a student had to know which
// screen answered which lecture. Here every lecture of ANATOMIE says what it
// is studied with: a 3D scene of its part of the body, the drawings of the
// same thing, and the questions asked on it. The subject's «Atlas» tab lists
// them chapter by chapter, and each lecture in المحاضرات carries a «3D» chip.
//
// A scene is the whole body cut down to the lecture: the systems it needs
// (`layers`, each with how opaque it opens), the part of the body it keeps
// (`box`, metres, the carve's frame: +x is the left side, +z the front), and
// optionally a tighter box for one system (`boxes` — the bones of the neck
// without the ribs under them), which names of a system it keeps (`keep`) or
// opens with taken off (`drop`). Everything else stays one tap away — the systems panel turns on
// what the lecture left off, and «le corps entier» drops the box.
//
// Filters are regex SOURCES, not RegExp: a lesson travels from the server page
// to the viewer as props, and a RegExp does not survive the trip.
//
// `match` is tested against the lecture titles the subject actually has (the
// database's, folded), so the Cours numbers shown are the course's own. A
// `region` lesson opens a regional model instead (lib/anatomy/curriculum.js)
// — the skull keeps its landmarks and its bone parts there.

const fold = (s) => String(s || '').replace(/œ/g, 'oe').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’']/g, ' ').toLowerCase().trim();

// ------------------------------------------------------------------ boxes
const BOX = {
  tete: [[-0.09, 1.47, -0.125], [0.09, 1.735, 0.12]],
  teteCou: [[-0.125, 1.355, -0.13], [0.125, 1.735, 0.12]],
  face: [[-0.085, 1.47, -0.05], [0.085, 1.665, 0.12]],
  osTeteCou: [[-0.095, 1.40, -0.125], [0.095, 1.735, 0.12]],
  cou: [[-0.125, 1.34, -0.11], [0.125, 1.565, 0.085]],
  orbite: [[-0.062, 1.548, 0.0], [0.062, 1.635, 0.105]],
  oreille: [[-0.075, 1.548, -0.045], [0.075, 1.612, 0.032]],
  nez: [[-0.045, 1.52, -0.005], [0.045, 1.64, 0.115]],
  bouche: [[-0.065, 1.455, -0.015], [0.065, 1.585, 0.115]],
  larynx: [[-0.045, 1.435, -0.035], [0.045, 1.565, 0.065]],
  thyroide: [[-0.06, 1.415, -0.045], [0.06, 1.525, 0.065]],
  rachisCervical: [[-0.065, 1.425, -0.11], [0.065, 1.605, 0.035]],
  encephale: [[-0.085, 1.5, -0.115], [0.085, 1.75, 0.1]],
  rachis: [[-0.07, 0.78, -0.13], [0.07, 1.63, 0.04]],
  retro: [[-0.14, 0.93, -0.11], [0.14, 1.25, 0.07]],
  urinaire: [[-0.14, 0.76, -0.11], [0.14, 1.25, 0.1]],
  pelvis: [[-0.16, 0.66, -0.13], [0.16, 1.06, 0.13]],
  thorax: [[-0.16, 1.05, -0.12], [0.16, 1.47, 0.15]],
  mediastin: [[-0.1, 1.13, -0.1], [0.1, 1.43, 0.11]],
  abdomen: [[-0.15, 0.9, -0.12], [0.15, 1.27, 0.17]],
  osLarynx: [[-0.05, 1.42, -0.06], [0.05, 1.515, 0.06]],
  osUrinaire: [[-0.14, 0.76, -0.11], [0.14, 1.12, 0.1]],
  petitBassin: [[-0.16, 0.76, -0.13], [0.16, 1.06, 0.13]],
};

// --------------------------------------------------------------- filters
const MASTICATEURS = 'Masséter|Temporal$|Ptérygoïdien|digastrique|mylo-hyoïdien|génio-hyoïdien';
const PEAUCIERS = 'zygomatique|Orbiculaire|Abaisseur|Élévateur|Buccinateur|Mentonnier|Risorius|Procérus|nasal|Corrugateur|frontal|occipital|temporo-pariétal|épicrânienne|Platysma';
const OCULO = 'droit (supérieur|inférieur|latéral|médial) de l|oblique (supérieur|inférieur) de l|élévateur de la paupière|Zinn|Trochlée';
const ORBITE_NERFS = 'optique|oculomoteur|trochléaire|abducens|ophtalmique';
const OEIL = 'Sclère|Cornée|Iris|Cristallin|Rétine|Corps vitré|Chambre|zonulaires|bulbe de l.œil|lacrymal|Glande lacrymale|Sac lacrymal';
const OREILLE = 'Cochlée|Vestibule|tympan|Trompe auditive';
const OSSELETS = 'Malléus|Incus|Stapes|Os temporal';
const NERFS_CRANIENS = '\\((I|II|III|IV|V|V1|V2|V3|VI|VII|VIII|IX|X|XI|XII)\\)|trijumeau|Corde du tympan|lingual|alvéolaire|buccal|mentonnier|mylohyoïdien|cochléaire|vestibulaire|maxillaire|mandibulaire';
const PHARYNX = 'pharynx|Constricteur|palatopharyngien|stylo-pharyngien|aryténoïdien|crico|thyro-aryténoïdien|Épiglotte|Voile du palais|Uvule';
const BOUCHE = 'Langue|Glande (parotide|sublinguale|submandibulaire)|Conduit (parotidien|submandibulaire)|Gencive|Voile du palais|Uvule|Oropharynx';
const BOUCHE_MUSCLES = 'glosse|génio-hyoïdien|mylo-hyoïdien|digastrique|Buccinateur|Orbiculaire de la bouche|palatopharyngien|Constricteur supérieur';
const TRONC = 'Bulbe rachidien|Pont|Mésencéphale|Pédoncule|Colliculus|Olive|Pyramide|Quatrième ventricule|Aqueduc|Noyau (ambigu|dorsal|du nerf|moteur|cochléaire|vestibulaire|du tractus|rouge|salivaire|accessoire)|Noyaux vestibulaires|Fosse interpédonculaire';
const CERVELET = 'vermis|Lobule (central|biventre|gracile|quadrangulaire|semi-lunaire)|Flocculus|Culmen|Déclive|Amygdale cérébelleuse|Aile du lobule|cérébelleux';
const PROFOND = 'Thalamus|Hypothalamus|Noyau (caudé|lenticulaire)|Putamen|Pallidum|Corps amygdaloïde|Hippocampe|Fornix|Ventricule|ventricule|Septum pellucidum|Plexus choroïdes|Commissure|Habenula|Glande pinéale|Corps (géniculé|mamillaires)|Strie|Corps calleux|hypophyse|Chiasma|Tractus optique|Noyaux septaux';
const CORTEX = 'Gyr|Lobule pariétal|Pôle|Cunéus|Précunéus|Corps calleux|Faux du cerveau';
const MOELLE = 'Moelle spinale|Canal central|Corne|Faisceau|Dure-mère spinale';
const REIN = 'Rein|Glande surrénale|Bassinet|Uretère';
const URINAIRE = 'Rein|Bassinet|Uretère|Vessie|Urètre';
const VAISSEAUX_REIN = 'rénal|Aorte|cave|surrénal|ovarique|testiculaire|gonad|mésentérique|cœliaque|Tronc';
const VAISSEAUX_URINE = 'rénal|Aorte|cave|iliaque|vésical|ovarique|testiculaire|gonad';
const COEUR_VAISSEAUX = 'coronaire|Aorte|aortique|pulmonaire|cave|brachio|cardiaque|Sinus coronaire|Tronc';
// The skeleton of the neck without the teeth that sit at the same height.
const OS_COU = 'cartilage|Cartilage|hyoïde|Vertèbre|Atlas|Axis';
const GENITAL_M = 'Prostate|Testicule|Épididyme|Conduit déférent|Vésicule séminale|Canal éjaculateur|Corps caverneux|Corps spongieux|Gland|Urètre|Vessie';

/**
 * Promo → semester → chapters → lessons. A chapter's `match` finds it among
 * the subject's own chapter titles; a lesson's `match`, among its lectures.
 */
export const LESSONS = [
  {
    promo: 'PCEM2',
    semesters: [
      {
        id: 's1', semester: 'S1',
        chapters: [
          {
            title: 'Tête et cou',
            lessons: [
              {
                id: 'crane', title: 'Le crâne', subtitle: 'Les vingt-deux os, leurs parties et leurs orifices',
                match: 'osteolog|crane', region: 'crane',
                planches: ['skull', 'head-skull'],
              },
              {
                id: 'base-du-crane', title: 'La base du crâne', subtitle: 'Les trois étages, et ce qui passe par chaque orifice',
                match: 'osteolog|crane', region: 'base-du-crane',
                planches: [],
              },
              {
                id: 'manducateur', title: 'L’appareil manducateur', subtitle: 'Mandibule, articulation temporo-mandibulaire et muscles masticateurs',
                match: 'manducat|masticat|temporo.?mandibul',
                scene: {
                  box: BOX.face, from: [0.85, 0.05, 1],
                  layers: { squelette: 1, articulations: 1, muscles: 1 },
                  keep: { muscles: MASTICATEURS },
                },
                quiz: ['muscles', 'squelette', 'articulations'],
                planches: ['tooth', 'adult-teeth', 'child-teeth'],
              },
              {
                id: 'muscles-tete-cou', title: 'Les muscles de la tête et du cou', subtitle: 'Peauciers, masticateurs, muscles du cou',
                match: 'muscles (de la |du |de |)(tete|cou|face)|myologie|peauciers',
                scene: {
                  box: BOX.teteCou, from: [0.55, 0.05, 1],
                  layers: { squelette: 1, muscles: 1 },
                  drop: 'Platysma',
                },
                quiz: ['muscles'],
                planches: ['musculature-back'],
              },
              {
                id: 'vaisseaux-tete-cou', title: 'Les vaisseaux de la tête et du cou', subtitle: 'Carotides, vertébrales, jugulaires et sinus duraux',
                match: 'vaisseaux|carotid|jugulaire',
                scene: {
                  box: BOX.teteCou, from: [0.6, 0.05, 1],
                  layers: { squelette: 1, arteres: 1, veines: 1 },
                  boxes: { squelette: BOX.osTeteCou },
                  also: 'Arc de l.aorte|Tronc brachio-céphalique|Artère subclavière|Veine (subclavière|brachio-céphalique)',
                },
                quiz: ['arteres', 'veines'],
                planches: ['brain-arteries', 'head-and-neck-arteries', 'vein-diagram'],
              },
              {
                id: 'lymphatiques-tete-cou', title: 'Les lymphatiques de la tête et du cou', subtitle: 'Nœuds lymphatiques cervicaux et leur drainage',
                match: 'lymph',
                scene: {
                  box: BOX.teteCou, from: [0.6, 0.05, 1],
                  layers: { squelette: 1, lymphe: 1, veines: 0.45 },
                },
                quiz: ['lymphe'],
                planches: ['lymphatic-circulation', 'smart-lymph-node'],
              },
              {
                id: 'oeil-orbite', title: 'L’orbite et l’œil', subtitle: 'Bulbe de l’œil, muscles oculomoteurs et nerfs de l’orbite',
                match: 'vision|visuel|orbit|oeil|oculo',
                scene: {
                  box: BOX.orbite, from: [0.75, 0.25, 1],
                  layers: { squelette: 0.35, organes: 1, muscles: 1, nerfs: 1 },
                  keep: { organes: OEIL, muscles: OCULO, nerfs: ORBITE_NERFS },
                },
                quiz: ['muscles', 'organes', 'nerfs'],
                planches: ['eye-vitreous-body-2', 'retina', 'smart-retina', 'optical-pathways', 'tear-duct'],
              },
              {
                id: 'fosses-nasales', title: 'Les fosses nasales', subtitle: 'Cloison, cornets, muqueuse et sinus',
                match: 'nasal|nez|olfact',
                scene: {
                  box: BOX.nez, from: [1, 0.05, 0.35],
                  layers: { squelette: 1, organes: 1 },
                  keep: { organes: 'cavité nasale|Nasopharynx|Trompe auditive|lacrymo-nasal' },
                },
                quiz: ['squelette', 'organes'],
                planches: ['nasal-cavity', 'paranasal-sinuses', 'olfactory-bulb-ov', 'mouth'],
              },
              {
                id: 'oreille', title: 'L’oreille', subtitle: 'Tympan, osselets, cochlée et vestibule',
                match: 'oreille|audit|cochle|vestibul',
                scene: {
                  box: BOX.oreille, from: [1, 0.15, 0.2],
                  layers: { squelette: 0.3, organes: 1, nerfs: 1 },
                  keep: { organes: OREILLE, squelette: OSSELETS, nerfs: 'cochléaire|vestibul|Corde du tympan' },
                },
                quiz: ['organes', 'squelette'],
                planches: ['ear', 'inner-ear', 'organ-of-corti'],
              },
              {
                id: 'larynx-pharynx', title: 'Le larynx et le pharynx', subtitle: 'Cartilages, ligaments et muscles du larynx, constricteurs du pharynx',
                match: 'larynx|pharynx',
                scene: {
                  box: BOX.larynx, from: [0.8, 0.05, 1],
                  layers: { squelette: 1, articulations: 1, muscles: 1, organes: 1 },
                  boxes: { squelette: BOX.osLarynx },
                  keep: { muscles: PHARYNX, organes: PHARYNX, squelette: OS_COU },
                },
                quiz: ['squelette', 'muscles', 'articulations'],
                planches: ['larynx-front-view', 'mouth'],
              },
              {
                id: 'thyroide', title: 'La thyroïde', subtitle: 'La glande, les parathyroïdes et leurs vaisseaux',
                match: 'thyroid',
                scene: {
                  box: BOX.thyroide, from: [0.35, 0.05, 1],
                  layers: { squelette: 1, organes: 1, arteres: 1, veines: 1, muscles: 0.25 },
                  boxes: { squelette: BOX.osLarynx },
                  keep: { organes: 'thyro|Trachée|Œsophage|pharynx', squelette: OS_COU },
                },
                quiz: ['organes', 'arteres', 'veines'],
                planches: ['normal-thyroid'],
              },
              {
                id: 'cavite-buccale', title: 'La cavité buccale et les glandes salivaires', subtitle: 'Langue, palais, glandes parotide, submandibulaire et sublinguale',
                match: 'buccal|bouche|salivaire|langue',
                scene: {
                  box: BOX.bouche, from: [1, 0.1, 0.55],
                  layers: { squelette: 1, organes: 1, muscles: 1, nerfs: 1 },
                  keep: { organes: BOUCHE, muscles: BOUCHE_MUSCLES, nerfs: 'lingual|hypoglosse|facial|glosso' },
                },
                quiz: ['organes', 'muscles'],
                planches: ['oral-cavity', 'salivary-glands', 'tongue', 'papillae', 'taste', 'tooth'],
              },
              {
                id: 'cou', title: 'Le cou', subtitle: 'Topographie : muscles, vaisseaux, nerfs et viscères',
                match: 'topograph|region cervicale|^le cou$',
                scene: {
                  box: BOX.cou, from: [0.6, 0.05, 1],
                  layers: { squelette: 1, muscles: 1, arteres: 1, veines: 1, nerfs: 1, organes: 1 },
                  drop: 'Platysma',
                },
                quiz: ['muscles', 'arteres', 'veines', 'nerfs'],
                planches: ['head-and-neck-arteries'],
              },
              {
                id: 'rachis-cervical', title: 'Le rachis cervical', subtitle: 'Atlas, axis, C3 à C7, disques et ligaments',
                match: 'rachis|vertebr|colonne',
                scene: {
                  box: BOX.rachisCervical, from: [1, 0.05, 0.6],
                  layers: { squelette: 1, articulations: 1 },
                },
                quiz: ['squelette', 'articulations'],
                planches: ['vertebral-column-overview', 'vertebral-column-side'],
              },
            ],
          },
          {
            title: 'Neuro-anatomie',
            lessons: [
              {
                id: 'moelle', title: 'La moelle spinale', subtitle: 'Cornes, cordons, racines et le canal vertébral',
                match: 'moelle',
                scene: {
                  box: BOX.rachis, from: [1, 0.05, -0.25],
                  layers: { squelette: 0.3, snc: 1, nerfs: 1 },
                  keep: { snc: MOELLE, nerfs: 'spinal|Racine|Queue de cheval|plexus' },
                },
                quiz: ['snc', 'squelette'],
                planches: ['spinal-cord-ov', 'overview-vertebral-column', 'dermatomes', 'smart-dermatomes'],
              },
              {
                id: 'tronc-cerebral', title: 'Le tronc cérébral et le cervelet', subtitle: 'Bulbe, pont, mésencéphale, noyaux des nerfs crâniens, cervelet',
                match: 'tronc cerebral|cervelet|bulbe rachidien|mesencephal',
                scene: {
                  box: BOX.encephale, from: [1, 0.05, -0.3],
                  // The nerves are one tap away in the panel: all twelve at
                  // once, branches and all, buried the brainstem.
                  layers: { snc: 1 },
                  keep: { snc: `${TRONC}|${CERVELET}`, nerfs: NERFS_CRANIENS },
                },
                quiz: ['snc'],
                planches: ['brain-17', 'whole-brain'],
              },
              {
                id: 'cerveau-profond', title: 'Le diencéphale et les noyaux gris', subtitle: 'Thalamus, hypothalamus, noyaux gris centraux, ventricules',
                match: 'diencephal|noyaux gris|thalam|ventricul|substance blanche|configuration interne',
                scene: {
                  box: BOX.encephale, from: [0.9, 0.2, 0.6],
                  layers: { snc: 1 },
                  keep: { snc: `${PROFOND}|${TRONC}` },
                },
                quiz: ['snc'],
                planches: ['smart-brain-sections', 'cerebrospinal-fluid', 'hippocampus'],
              },
              {
                id: 'cortex', title: 'Le télencéphale', subtitle: 'Lobes, gyrus et sillons, aires fonctionnelles',
                match: 'telencephal|morphologie externe|lobaire|cortex|hemispher',
                scene: {
                  box: BOX.encephale, from: [1, 0.15, 0.25],
                  layers: { snc: 1 },
                  keep: { snc: `${CORTEX}|${CERVELET}|${TRONC}` },
                },
                quiz: ['snc'],
                planches: ['brain-overview-smart', 'smart-brain-overview', 'brain-area', 'brain-section', 'whole-brain'],
              },
              {
                id: 'meninges', title: 'Les méninges', subtitle: 'Dure-mère, faux du cerveau, tente du cervelet',
                match: 'mening',
                scene: {
                  box: BOX.encephale, from: [1, 0.2, 0.4],
                  layers: { snc: 1, squelette: 0.25, veines: 1 },
                  keep: { snc: 'Faux du cerveau|Tente du cervelet|Dure-mère|Gyr|Pôle', veines: 'Sinus' },
                },
                quiz: ['snc', 'veines'],
                planches: ['meninges', 'cerebrospinal-fluid'],
              },
              {
                id: 'arteres-cerveau', title: 'La vascularisation artérielle du cerveau', subtitle: 'Carotides internes, système vertébro-basilaire, cercle artériel',
                match: 'vascularisation arterielle|arteres? (du cerveau|de l encephale)|willis',
                scene: {
                  box: BOX.encephale, from: [0.2, -0.9, 0.4],
                  layers: { arteres: 1, snc: 0.3 },
                },
                quiz: ['arteres'],
                planches: ['circle-of-willis', 'smart-brain-arteries', 'brain-circulation', 'smart-brain-circulation'],
              },
              {
                id: 'veines-cerveau', title: 'La vascularisation veineuse du cerveau', subtitle: 'Sinus de la dure-mère et veines cérébrales',
                match: 'vascularisation veineuse|veines? (du cerveau|de l encephale)|sinus (veineux|de la dure)',
                scene: {
                  box: BOX.encephale, from: [1, 0.25, 0.3],
                  layers: { veines: 1, snc: 0.3, squelette: 0.2 },
                },
                quiz: ['veines'],
                planches: ['vein-diagram'],
              },
              {
                id: 'nerfs-craniens', title: 'Les nerfs crâniens', subtitle: 'Les douze paires, leurs noyaux et leurs territoires',
                match: 'nerfs? craniens?|paires craniennes',
                scene: {
                  box: BOX.teteCou, from: [1, 0.1, 0.45],
                  layers: { nerfs: 1, snc: 1, squelette: 0.25 },
                  keep: { snc: TRONC },
                  also: 'Nerf vague|Nerf accessoire|Nerf phrénique',
                },
                quiz: ['nerfs'],
                planches: ['nervous-system'],
              },
            ],
          },
        ],
      },
      {
        id: 's2', semester: 'S2',
        chapters: [
          {
            title: 'Appareil urinaire et génital',
            lessons: [
              {
                id: 'reins', title: 'Les reins et les surrénales', subtitle: 'Loge rénale, hile, pédicule, rapports',
                match: 'rein|renal|surrenal',
                scene: {
                  box: BOX.retro, from: [0.35, 0.1, 1],
                  layers: { squelette: 1, organes: 1, arteres: 1, veines: 1 },
                  keep: { organes: REIN, arteres: VAISSEAUX_REIN, veines: VAISSEAUX_REIN },
                },
                quiz: ['organes', 'arteres', 'veines'],
                planches: ['kidney', 'kidney-overview', 'adrenal', 'adrenal-gland-overview', 'smart-nephron-ov', 'smart-nephron', 'afferent-arteriole'],
              },
              {
                id: 'voies-urinaires', title: 'L’uretère et la vessie', subtitle: 'Trajet, rétrécissements, rapports pelviens',
                match: 'uretere|vessie|vesical|voies urinaires',
                scene: {
                  box: BOX.urinaire, from: [0.6, 0.1, 1],
                  layers: { squelette: 1, organes: 1, arteres: 1, veines: 1 },
                  boxes: { squelette: BOX.osUrinaire },
                  keep: { organes: URINAIRE, arteres: VAISSEAUX_URINE, veines: VAISSEAUX_URINE },
                },
                quiz: ['organes', 'arteres'],
                planches: ['bladder', 'urinary-tract-overview', 'urinary-tract'],
              },
              {
                id: 'genital-masculin', title: 'L’appareil génital masculin', subtitle: 'Urètre, prostate, testicule, voies spermatiques, pénis',
                match: 'uretre|prostat|bourses|scrot|testicul|epididym|spermati|glandes genitales|penis|verge|genital masculin',
                scene: {
                  box: BOX.pelvis, from: [0.85, 0.05, 0.75],
                  layers: { squelette: 1, organes: 1, muscles: 0.25 },
                  keep: { organes: GENITAL_M },
                },
                quiz: ['organes'],
                planches: ['testicle-ov', 'urinary-tract-overview'],
              },
              {
                id: 'genital-feminin', title: 'L’utérus et ses annexes', subtitle: 'Utérus, trompes, ovaires, vagin — dans le petit bassin',
                match: 'uterus|uterin|ovaire|trompe|vagin|vulve|genital feminin',
                set: 'feminin',
                scene: { from: [0.12, 0.9, 1], drop: 'Côlon sigmoïde' },
                planches: ['uterus', 'uterus-lateral-view', 'ovary', 'uterine-cycle', 'urinary-tract'],
              },
              {
                id: 'vaisseaux-pelviens', title: 'Les vaisseaux pelviens', subtitle: 'Artères et veines iliaques et leurs branches',
                match: 'vaisseaux pelvien|pelvi',
                scene: {
                  box: BOX.pelvis, from: [0.5, 0.15, 1],
                  layers: { squelette: 1, arteres: 1, veines: 1, organes: 0.35 },
                  boxes: { arteres: BOX.petitBassin, veines: BOX.petitBassin },
                },
                quiz: ['arteres', 'veines'],
                planches: ['abdominal-aorta'],
              },
              {
                id: 'retroperitoine', title: 'La région rétropéritonéale', subtitle: 'Reins, gros vaisseaux, psoas et plexus lombal',
                match: 'retro.?periton',
                scene: {
                  box: BOX.retro, from: [0.3, 0.15, 1],
                  layers: { squelette: 1, organes: 1, arteres: 1, veines: 1, nerfs: 1, muscles: 1 },
                  keep: { organes: `${REIN}|Pancréas|Duodénum`, muscles: 'psoas|carré des lombes|Diaphragme|iliaque' },
                },
                quiz: ['organes', 'arteres', 'veines', 'nerfs', 'muscles'],
                planches: ['abdominal-aorta', 'kidney-overview'],
              },
            ],
          },
          {
            title: 'Tête et cou',
            lessons: [
              { use: 'cavite-buccale', match: 'buccal|bouche|langue' },
              {
                id: 'parotide', title: 'La loge parotidienne', subtitle: 'La glande, le nerf facial et la carotide externe',
                match: 'parotid',
                scene: {
                  box: BOX.face, from: [1, 0.05, 0.4],
                  layers: { squelette: 1, organes: 1, nerfs: 1, arteres: 1, veines: 1, muscles: 1 },
                  keep: { organes: 'parotide|Conduit parotidien', nerfs: 'facial|auriculo', muscles: MASTICATEURS + '|sterno-cléido|digastrique|stylo' },
                },
                quiz: ['organes', 'nerfs', 'arteres', 'muscles'],
                planches: ['salivary-glands'],
              },
              { use: 'muscles-tete-cou', match: 'muscles (de la |du |de |)(tete|cou|face)|peauciers' },
              { use: 'oreille', match: 'audit|oreille' },
              { use: 'oeil-orbite', match: 'orbit|oeil|oculo' },
            ],
          },
        ],
      },
    ],
  },

  {
    promo: 'PCEM1',
    semesters: [
      {
        id: 's1', semester: 'S1',
        chapters: [
          {
            title: 'Membre supérieur',
            lessons: limb('sup', [
              ['epaule', 'L’épaule', 'Ceinture scapulaire, articulation gléno-humérale, coiffe des rotateurs', [[-0.02, 1.16, -0.14], [0.27, 1.47, 0.10]], ['skeleton-face']],
              ['bras', 'Le bras', 'Humérus, loge antérieure et loge postérieure', [[0.10, 1.03, -0.10], [0.27, 1.43, 0.06]], []],
              ['coude', 'Le coude', 'Articulation, ligaments collatéraux, ligament annulaire', [[0.16, 1.01, -0.09], [0.30, 1.16, 0.06]], ['joint-elbow']],
              ['avant-bras', 'L’avant-bras', 'Radius, ulna, membrane interosseuse, loges', [[0.17, 0.83, -0.08], [0.33, 1.13, 0.09]], ['arm-bones']],
              ['main', 'Le poignet et la main', 'Carpe, métacarpe, phalanges et leurs ligaments', [[0.21, 0.69, -0.06], [0.34, 0.90, 0.10]], ['arm-bones']],
            ]),
          },
          {
            title: 'Membre inférieur',
            lessons: limb('inf', [
              ['hanche', 'La hanche', 'Os coxal, articulation coxo-fémorale, fessiers', [[-0.07, 0.68, -0.13], [0.16, 1.02, 0.08]], ['pelvis']],
              ['cuisse', 'La cuisse', 'Fémur, quadriceps, adducteurs, ischio-jambiers', [[0.00, 0.40, -0.10], [0.17, 0.92, 0.07]], ['femur']],
              ['genou', 'Le genou', 'Ménisques, ligaments croisés et collatéraux', [[0.02, 0.36, -0.11], [0.15, 0.50, 0.06]], ['normal-joint']],
              ['jambe', 'La jambe', 'Tibia, fibula et les quatre loges', [[0.02, 0.05, -0.12], [0.16, 0.44, 0.06]], ['leg-venous-circulation', 'venous-circulation-leg-view']],
              ['pied', 'La cheville et le pied', 'Mortaise, tarse, métatarse et leurs ligaments', [[0.03, 0.00, -0.10], [0.15, 0.10, 0.14]], []],
            ]),
          },
        ],
      },
      {
        id: 's2', semester: 'S2',
        chapters: [
          {
            title: 'Thorax',
            lessons: [
              {
                id: 'paroi-thoracique', title: 'La paroi thoracique', subtitle: 'Sternum, côtes, muscles intercostaux et diaphragme',
                scene: { box: BOX.thorax, from: [0.4, 0.05, 1], layers: { squelette: 1, articulations: 1, muscles: 1 }, keep: { muscles: 'intercostal|Diaphragme|dentelé|pectoral|subcostal|transverse du thorax' } },
                quiz: ['squelette', 'muscles'], planches: ['skeleton-face'],
              },
              {
                id: 'coeur', title: 'Le cœur', subtitle: 'Cavités, valves et vaisseaux coronaires',
                scene: { box: BOX.mediastin, from: [0.3, 0.05, 1], layers: { organes: 1, arteres: 1, veines: 1 }, keep: { organes: 'Atrium|Ventricule|Valv|Cuspide|papillaire|Cœur', arteres: COEUR_VAISSEAUX, veines: COEUR_VAISSEAUX } },
                quiz: ['organes', 'arteres'], planches: ['heart-vector', 'smart-heart-ov', 'smart-heart-sagittal', 'heart-vascularization', 'heart-conduction', 'heart-sections', 'ventricle'],
              },
              {
                id: 'mediastin', title: 'Le médiastin', subtitle: 'Cœur, gros vaisseaux, trachée, œsophage, nerfs',
                scene: { box: BOX.mediastin, from: [0.5, 0.05, 1], layers: { squelette: 0.3, organes: 1, arteres: 1, veines: 1, nerfs: 1 } },
                quiz: ['organes', 'arteres', 'veines', 'nerfs'], planches: ['aorta', 'pulmonary-circulation'],
              },
              {
                id: 'poumons', title: 'Les poumons et la plèvre', subtitle: 'Lobes, arbre bronchique, segments',
                scene: { box: BOX.thorax, from: [0.4, 0.05, 1], layers: { squelette: 0.3, organes: 1 }, keep: { organes: 'Lobe|Bronch|Trachée|Plèvre' } },
                quiz: ['organes'], planches: ['lungs-11', 'intrapulmonary-airways-lungs', 'bronchi-section-ov', 'smart-pulmonary-circulation'],
              },
            ],
          },
          {
            title: 'Abdomen',
            lessons: [
              {
                id: 'visceres-abdominaux', title: 'Les viscères abdominaux', subtitle: 'Foie, estomac, rate, pancréas, intestin',
                scene: { box: BOX.abdomen, from: [0.3, 0.1, 1], layers: { squelette: 0.4, organes: 1, lymphe: 1 } },
                quiz: ['organes'], planches: ['anatomical-diagram-complete-digestive-apparatus', 'liver-and-gallbladder', 'smart-stomach-ov', 'colon', 'intestine-overview', 'spleen-ov', 'pancreas-coronal'],
              },
              { use: 'retroperitoine' },
              {
                id: 'rachis-thoraco-lombal', title: 'Le rachis thoracique et lombal', subtitle: 'Vertèbres, disques et ligaments',
                scene: { box: BOX.rachis, from: [1, 0.05, 0.5], layers: { squelette: 1, articulations: 1 } },
                quiz: ['squelette', 'articulations'], planches: ['vertebral-column-overview', 'vertebral-column-side'],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The lessons of a limb: bones, joints and muscles, looked at from its side. */
function limb(which, rows) {
  return rows.map(([id, title, subtitle, box, planches]) => ({
    id, title, subtitle,
    scene: { box, from: [1, 0.05, 0.7], layers: { squelette: 1, articulations: 1, muscles: 1 } },
    quiz: ['squelette', 'muscles', 'articulations'],
    planches: [...planches, which === 'sup' ? 'musculature-back' : 'tendon-anatomy'].filter(Boolean),
  }));
}

// ---------------------------------------------------------------- reading

const allLessons = LESSONS.flatMap((p) => p.semesters.flatMap((s) => s.chapters.flatMap((c) => c.lessons)));
const byId = new Map(allLessons.filter((l) => l.id).map((l) => [l.id, l]));
/** A lesson written as `{ use: id }` is the same lesson listed again. */
const resolve = (l) => (l.use ? { ...byId.get(l.use), ...(l.match ? { match: l.match } : {}) } : l);

const semesterOf = (promo, semester) => LESSONS
  .find((p) => p.promo.toLowerCase() === String(promo || '').toLowerCase())
  ?.semesters.find((s) => s.semester.toUpperCase() === String(semester || '').toUpperCase()
    || s.id === String(semester || '').toLowerCase()) || null;

/** One lesson by its id, with where it belongs. */
export function lessonOf(promo, semester, id) {
  const term = semesterOf(promo, semester);
  if (!term) return null;
  for (const c of term.chapters) {
    for (const raw of c.lessons) {
      const l = resolve(raw);
      if (l?.id === id) return { ...l, chapter: c.title, promo: String(promo).toUpperCase(), semester: term.semester, semesterId: term.id };
    }
  }
  return null;
}

/**
 * A semester's lessons, chapter by chapter, each told which of the subject's
 * own lectures it goes with (`lectures`: the numbers, as the course has them).
 */
export function atlasOf(promo, semester, lectures = []) {
  const term = semesterOf(promo, semester);
  if (!term) return [];
  const folded = lectures.map((l) => ({ n: l.n, fid: l.fid, t: fold(l.title) }));
  return term.chapters.map((c) => ({
    title: c.title,
    lessons: c.lessons.map(resolve).filter(Boolean).map((l) => {
      const re = l.match ? new RegExp(l.match) : null;
      const hits = re ? folded.filter((x) => re.test(x.t)) : [];
      return {
        id: l.id, title: l.title, subtitle: l.subtitle, planches: l.planches || [],
        region: l.region || null,
        lectures: [...new Set(hits.map((x) => x.n).filter((n) => n != null).map(String))],
        fids: hits.map((x) => x.fid).filter(Boolean),
        href: `/anatomie/${String(promo).toLowerCase()}/${term.id}/${l.id}`,
      };
    }),
  }));
}

export const hasAtlas = (promo, semester) => !!semesterOf(promo, semester);
