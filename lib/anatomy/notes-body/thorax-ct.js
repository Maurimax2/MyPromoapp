// The thorax from the Nouakchott CT atlas (scripts/carve-nouakchott.mjs):
// what the body's descriptions do not already cover, because the scanner
// segments whole systems at once — all the ribs, both pulmonary arteries,
// every segmental bronchus — where the body has them one by one.

export const THORAX_CT_NOTES = {
  'Cœur': {
    what: 'Muscle creux à quatre cavités, dans le médiastin moyen, enveloppé du péricarde ; un tiers à droite de la ligne médiane, deux tiers à gauche. Base en haut, en arrière et à droite ; apex en bas, en avant et à gauche, au 5e espace intercostal gauche sur la ligne médio-claviculaire.',
    parts: [
      'Atrium droit : reçoit les veines caves et le sinus coronaire',
      'Ventricule droit : forme l’essentiel de la face antérieure, éjecte dans le tronc pulmonaire',
      'Atrium gauche : la partie la plus postérieure du cœur, reçoit les quatre veines pulmonaires',
      'Ventricule gauche : forme l’apex et le bord gauche, éjecte dans l’aorte',
    ],
    near: [
      'En arrière : l’atrium gauche contre l’œsophage — une grosse oreillette gauche le déplace, ce que montre un transit baryté',
      'De chaque côté : plèvres médiastinales et nerfs phréniques',
      'En bas : le diaphragme (face diaphragmatique)',
    ],
    vessels: ['Artères coronaires droite et gauche, nées des sinus de l’aorte ; veines par le sinus coronaire'],
  },
  'Aorte thoracique (scanner)': {
    what: 'L’aorte de son origine au diaphragme : aorte ascendante, crosse, aorte descendante thoracique.',
    parts: [
      'Aorte ascendante : du ventricule gauche, dans le péricarde, vers le haut et la droite ; donne les artères coronaires',
      'Crosse de l’aorte : derrière le manubrium, au-dessus de la bifurcation pulmonaire ; donne le tronc brachio-céphalique, la carotide commune gauche et la subclavière gauche',
      'Aorte descendante thoracique : du flanc gauche de T4 au hiatus aortique du diaphragme (T12), en arrière dans le médiastin postérieur',
    ],
    near: [
      'La crosse enjambe la bronche principale gauche ; le nerf laryngé récurrent gauche passe sous elle',
      'L’aorte descendante longe la gauche de l’œsophage puis passe en arrière de lui',
    ],
  },
  'Carène trachéale': {
    what: 'L’éperon à l’intérieur de la bifurcation de la trachée, entre les deux bronches principales, en regard de T4–T5 (angle sternal).',
    note: 'La muqueuse de la carène est la plus sensible de l’arbre bronchique : la toucher déclenche la toux. Un élargissement de son angle à la bronchoscopie fait chercher des adénopathies sous-carénaires.',
  },
  'Bronches principales droite et gauche': {
    what: 'Les deux branches de division de la trachée, de la carène au hile de chaque poumon.',
    parts: [
      'Bronche principale droite : plus courte (2,5 cm), plus large, plus verticale — un corps étranger inhalé y va le plus souvent',
      'Bronche principale gauche : plus longue (5 cm), plus horizontale, passe sous la crosse de l’aorte et devant l’œsophage',
    ],
  },
  'Bronches lobaires': {
    what: 'Les bronches de chaque lobe : trois à droite (supérieure, moyenne, inférieure), deux à gauche (supérieure, qui donne la lingulaire, et inférieure).',
    note: 'La bronche lobaire supérieure droite naît au-dessus de l’artère pulmonaire droite (bronche épartérielle) ; toutes les autres sont au-dessous.',
  },
  'Bronches segmentaires': {
    what: 'Les bronches des segments broncho-pulmonaires : dix à droite, huit à dix à gauche. Chaque segment a sa bronche, son artère au centre, ses veines à la périphérie entre les segments.',
    action: ['Un segment peut être réséqué seul, en suivant les veines intersegmentaires (segmentectomie)'],
    note: 'Couché sur le dos, ce qui est inhalé tombe dans le segment apical du lobe inférieur (le premier qui part en arrière) : c’est là que siègent le plus souvent les pneumopathies d’inhalation.',
  },
  'Artère interventriculaire postérieure': {
    what: 'Dans le sillon interventriculaire postérieur, vers l’apex. Elle naît de l’artère coronaire droite dans la majorité des cœurs (dominance droite), parfois de la circonflexe (dominance gauche).',
    supplies: ['Le tiers postérieur du septum interventriculaire, les parois inférieures des deux ventricules'],
  },
  'Artères pulmonaires droite et gauche': {
    what: 'Les deux branches du tronc pulmonaire, sous la crosse de l’aorte, qui portent le sang pauvre en oxygène aux poumons.',
    parts: [
      'Artère pulmonaire droite : plus longue, passe sous la crosse et derrière l’aorte ascendante et la veine cave supérieure',
      'Artère pulmonaire gauche : plus courte, croise la bronche principale gauche par-dessus ; reliée à la crosse par le ligament artériel',
    ],
    near: ['Au hile, elles suivent les bronches puis se divisent comme elles, lobe par lobe et segment par segment'],
  },
  'Veines pulmonaires': {
    what: 'Les veines qui ramènent le sang oxygéné des poumons à l’atrium gauche, habituellement deux de chaque côté (supérieure et inférieure).',
    course: ['Elles courent entre les segments, pas avec les bronches ; au hile, elles sont les éléments les plus antérieurs et les plus bas'],
    note: 'Leur abouchement dans l’atrium gauche est la cible de l’ablation dans la fibrillation atriale.',
  },
  'Côtes': {
    what: 'Les douze paires de côtes : sept vraies (reliées au sternum par leur propre cartilage), trois fausses (par le cartilage de la côte au-dessus), deux flottantes (libres en avant).',
    parts: [
      'Tête : s’articule avec deux corps vertébraux et le disque entre eux',
      'Col, tubercule (s’articule avec le processus transverse), angle, corps',
      'Sillon costal sous le bord inférieur : veine, artère et nerf intercostaux, de haut en bas',
    ],
    note: 'Le sillon costal explique pourquoi une ponction pleurale se fait au ras du bord supérieur de la côte du dessous.',
  },
  'Cartilages costaux': {
    what: 'Le cartilage hyalin qui prolonge chaque côte en avant ; ceux des sept premières vont au sternum, ceux des 8e à 10e au cartilage du dessus et forment le rebord costal.',
    note: 'Ils donnent au thorax son élasticité ; ils se calcifient avec l’âge.',
  },
  'Articulations sterno-claviculaires': {
    what: 'La seule articulation entre le membre supérieur et le squelette du tronc : extrémité médiale de la clavicule, incisure claviculaire du manubrium et premier cartilage costal.',
    parts: ['Un disque articulaire la divise en deux cavités', 'Tenue par les ligaments sterno-claviculaires, interclaviculaire et costo-claviculaire'],
  },
  'Vertèbres thoraciques': {
    what: 'Les douze vertèbres du thorax, qui portent les côtes.',
    relief: [
      'Fossettes costales sur le corps (pour les têtes des côtes) et sur les processus transverses (pour les tubercules)',
      'Processus épineux longs, inclinés vers le bas',
      'Foramen vertébral petit et rond : la moelle y est à l’étroit',
    ],
  },
  'Disques intervertébraux': {
    what: 'Entre deux corps vertébraux : un anneau fibreux autour d’un noyau pulpeux.',
    note: 'Au thorax, les côtes et le sternum limitent les mouvements : les hernies discales y sont bien plus rares qu’aux lombes.',
  },
};
