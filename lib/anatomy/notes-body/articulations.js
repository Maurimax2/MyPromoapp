// Joints, ligaments, discs and capsules the whole body shows and no regional
// model described: what it joins, what it holds, how it fails.

const disc = (lvl) => {
  const lumbar = /^L|^T12/.test(lvl);
  const cervical = /^C/.test(lvl);
  return {
    what: `Disque intervertébral ${lvl} : fibrocartilage entre deux corps vertébraux, fait d’un anneau fibreux périphérique et d’un noyau pulpeux central.`,
    action: ['Amortit les charges et permet de petits mouvements entre les vertèbres'],
    note: lumbar
      ? 'Les disques lombaux sont les plus épais ; L4–L5 et L5–S1 sont les sièges habituels des hernies discales (sciatique L5 ou S1).'
      : cervical ? 'Au cou, les hernies touchent surtout C5–C6 et C6–C7 (névralgie cervico-brachiale).'
        : 'Au thorax, les disques sont minces et les hernies rares : la cage thoracique limite les mouvements.',
  };
};
const nucleus = (lvl) => ({
  what: `Noyau pulpeux (nucleus pulposus) du disque ${lvl} : gel riche en eau, reste de la notochorde, un peu en arrière du centre du disque.`,
  note: 'Une fissure de l’anneau fibreux le laisse migrer en arrière et en dehors : hernie discale comprimant la racine.',
});
const capsule = (joint, extra) => ({
  what: `Capsule fibreuse de l’articulation ${joint}, doublée en dedans par la membrane synoviale qui sécrète la synovie.`,
  ...(extra || {}),
});
const lig = (what, insertion, action, note) => ({ what, ...(insertion ? { insertion } : {}), ...(action ? { action } : {}), ...(note ? { note } : {}) });

export const JOINT_NOTES = {
  // ------------------------------------------------------------ rachis
  ...Object.fromEntries(['C7-T1', 'T1-T2', 'T2-T3', 'T3-T4', 'T4-T5', 'T5-T6', 'T6-T7', 'T7-T8', 'T8-T9', 'T9-T10', 'T10-T11', 'T11-T12', 'T12-L1',
    'L1-L2', 'L2-L3', 'L3-L4', 'L4-L5', 'L5-S1'].map((l) => [`Disque intervertébral ${l}`, disc(l)])),
  ...Object.fromEntries(['C2-C3', 'C3-C4', 'C4-C5', 'C5-C6', 'C6-C7', 'C7-T1', 'T1-T2', 'T2-T3', 'T3-T4', 'T4-T5', 'T5-T6', 'T6-T7', 'T7-T8', 'T8-T9',
    'T9-T10', 'T10-T11', 'T11-T12', 'T12-L1', 'L1-L2', 'L2-L3', 'L3-L4', 'L4-L5', 'L5-S1'].map((l) => [`Nucléus pulposus ${l}`, nucleus(l)])),
  'Ligament longitudinal antérieur': lig('Large bande fibreuse sur la face antérieure des corps vertébraux et des disques, de l’occipital (tubercule pharyngien) au sacrum.', null, ['Limite l’extension du rachis'], 'Arraché dans les traumatismes en hyperextension du cou (coup du lapin).'),
  'Ligament longitudinal postérieur': lig('Bande fibreuse dans le canal vertébral, sur la face postérieure des corps et des disques, de l’axis (où il devient la membrane tectoriale) au sacrum.', null, ['Limite la flexion', 'Retient le disque en arrière'], 'Plus étroit au niveau lombal : les hernies passent en postéro-latéral, sur la racine.'),
  'Ligament jaune': lig('Ligaments élastiques (couleur jaune) qui unissent les lames de vertèbres voisines, et ferment le canal vertébral en arrière.', null, ['Limite la flexion, ramène le rachis en extension'], 'Traversé par l’aiguille de la ponction lombaire et de la péridurale (perte de résistance) ; son épaississement rétrécit le canal lombal.'),
  'Ligament supra-épineux': lig('Cordon fibreux sur le sommet des processus épineux, de C7 au sacrum ; prolongé au cou par le ligament nuchal.', null, ['Limite la flexion']),
  'Ligaments interépineux': lig('Membranes minces entre processus épineux voisins.', null, ['Limitent la flexion']),
  'Ligament intertransversaire': lig('Faisceaux entre processus transverses voisins, surtout développés aux lombes.', null, ['Limitent l’inclinaison latérale']),
  'Ligament ilio-lombal': lig('Ligament puissant tendu du processus transverse de L5 à la crête iliaque.', null, ['Stabilise L5 sur le bassin, s’oppose au glissement en avant de L5 sur S1']),
  'Ligament radié de la tête costale': lig('Ligament en éventail de la tête costale aux deux corps vertébraux et au disque.', null, ['Fixe l’articulation de la tête costale']),
  'Ligament intra-articulaire de la tête de la côte': lig('Ligament de la crête de la tête costale au disque intervertébral, qui divise l’articulation en deux cavités (côtes 2 à 10).'),
  'Ligament costotransversaire': lig('Ligament du col de la côte au processus transverse correspondant.', null, ['Fixe l’articulation costo-transversaire']),
  'Membrane intercostale externe': lig('Membrane qui prolonge en avant le muscle intercostal externe, entre les cartilages costaux.'),
  'Membrane intercostale interne': lig('Membrane qui prolonge en arrière le muscle intercostal interne, de l’angle de la côte au rachis.'),

  // ----------------------------------------------- tête et cou, larynx, ATM
  'Capsule de l’articulation temporo-mandibulaire': capsule('temporo-mandibulaire', {
    insertion: ['En haut : pourtour du tubercule articulaire et de la fosse mandibulaire', 'En bas : col de la mandibule'],
    note: 'Lâche en haut, serrée en bas : le disque la divise en compartiments supérieur (translation) et inférieur (rotation).',
  }),
  'Disque de l’articulation temporo-mandibulaire': {
    what: 'Lame fibro-cartilagineuse biconcave entre le condyle mandibulaire et le temporal, attachée à la capsule et au faisceau supérieur du ptérygoïdien latéral.',
    action: ['Accompagne le condyle en avant pendant l’ouverture de la bouche'],
    note: 'Son déplacement donne les claquements et blocages de l’ATM.',
  },
  'Ligament latéral de l’articulation temporo-mandibulaire': lig('Épaississement latéral de la capsule, du tubercule articulaire et du zygomatique au col de la mandibule.', null, ['Principal moyen d’union de l’ATM, limite le recul du condyle']),
  'Ligament sphéno-mandibulaire': lig('Bande fibreuse de l’épine du sphénoïde à la lingula de la mandibule.', null, null, 'Le nerf et les vaisseaux alvéolaires inférieurs passent entre lui et la branche de la mandibule.'),
  'Ligament stylo-mandibulaire': lig('Ligament du processus styloïde à l’angle de la mandibule ; épaississement du fascia de la parotide.', null, ['Limite la propulsion de la mandibule']),
  'Ligament stylo-hyoïdien': lig('Cordon fibreux du processus styloïde à la petite corne de l’os hyoïde ; reste du 2e arc branchial.', null, null, 'Ossifié chez certains sujets (syndrome d’Eagle).'),
  'Ligament thyro-hyoïdien médian': lig('Épaississement médian de la membrane thyro-hyoïdienne, entre l’échancrure thyroïdienne et l’os hyoïde.'),
  'Ligament thyro-hyoïdien latéral': lig('Bord postérieur épaissi de la membrane thyro-hyoïdienne, de la corne supérieure du thyroïde à la grande corne de l’hyoïde ; contient souvent le cartilage triticé.'),
  'Ligament crico-thyroïdien médian': lig('Membrane élastique entre l’arc du cricoïde et le bord inférieur du thyroïde, sous la peau du cou.', null, null, 'Lieu de la coniotomie (crico-thyrotomie) d’urgence : seule voie aérienne rapide sous la glotte.'),
  'Ligament crico-pharyngien': lig('Ligament de la lame du cricoïde à la muqueuse du pharynx.'),
  'Membrane quadrangulaire': lig('Membrane fibro-élastique entre le bord latéral de l’épiglotte et l’aryténoïde ; son bord inférieur libre forme le ligament vestibulaire (fausse corde vocale).'),

  // ---------------------------------------------------- ceinture scapulaire
  'Capsule de l’articulation sterno-claviculaire': capsule('sterno-claviculaire', { note: 'Seule articulation qui unit le membre supérieur au squelette axial.' }),
  'Disque de l’articulation sterno-claviculaire': { what: 'Disque fibro-cartilagineux entre clavicule et manubrium, qui divise l’articulation en deux et amortit les chocs transmis par la clavicule.' },
  'Ligament sterno-claviculaire antérieur': lig('Renfort antérieur de la capsule sterno-claviculaire.'),
  'Ligament sterno-claviculaire postérieur': lig('Renfort postérieur de la capsule ; plus solide.', null, null, 'Une luxation postérieure de la clavicule menace les vaisseaux du médiastin supérieur.'),
  'Ligament interclaviculaire': lig('Ligament entre les extrémités médiales des deux clavicules, au-dessus de l’incisure jugulaire.'),
  'Capsule de l’articulation acromio-claviculaire': capsule('acromio-claviculaire'),
  'Disque de l’articulation acromio-claviculaire': { what: 'Ménisque inconstant, souvent incomplet, de l’articulation acromio-claviculaire.' },
  'Ligament acromio-claviculaire': lig('Renfort supérieur de la capsule acromio-claviculaire.', null, ['Stabilité horizontale de la clavicule']),
  'Ligament conoïde': lig('Partie médiale et verticale du ligament coraco-claviculaire, du processus coracoïde au tubercule conoïde de la clavicule.', null, ['Suspend la scapula à la clavicule'], 'Sa rupture avec celle du trapézoïde : luxation acromio-claviculaire grave (« touche de piano »).'),
  'Ligament trapézoïde': lig('Partie latérale du ligament coraco-claviculaire, du processus coracoïde à la ligne trapézoïde de la clavicule.'),

  // ------------------------------------------------------------ épaule
  'Capsule de l’articulation gléno-humérale': capsule('gléno-humérale', {
    insertion: ['Pourtour de la cavité glénoïdale et du labrum', 'Col anatomique de l’humérus'],
    note: 'Lâche, surtout en bas (récessus axillaire) : grande mobilité, mais luxations fréquentes (antéro-internes).',
  }),
  'Labrum glénoïdal': { what: 'Bourrelet fibro-cartilagineux autour de la cavité glénoïdale, qui l’approfondit ; le tendon du long chef du biceps s’y fixe en haut.', note: 'Lésions SLAP (supérieures) et de Bankart (antéro-inférieures, après luxation).' },
  'Ligament gléno-huméral supérieur': lig('Renfort antérieur de la capsule, de la glène au-dessus du petit tubercule.'),
  'Ligament gléno-huméral moyen': lig('Renfort antérieur moyen de la capsule.', null, ['Limite la rotation latérale bras le long du corps']),
  'Ligament gléno-huméral inférieur': lig('Hamac capsulaire inférieur, avec ses faisceaux antérieur et postérieur.', null, ['Principal stabilisateur antérieur en abduction-rotation latérale']),
  'Ligament coraco-huméral': lig('Ligament du processus coracoïde aux tubercules de l’humérus, au-dessus de l’articulation.', null, ['Renforce la capsule en haut, limite la rotation latérale']),
  'Ligament huméral transverse': lig('Ligament qui ferme le sillon intertuberculaire et retient le tendon du long chef du biceps.'),

  // -------------------------------------------------------------- coude
  'Capsule de l’articulation du coude': capsule('du coude', { note: 'Une seule capsule pour trois articulations : huméro-ulnaire, huméro-radiale et radio-ulnaire proximale.' }),
  'Ligament collatéral ulnaire de l’articulation du coude': lig('Ligament en éventail de l’épicondyle médial au processus coronoïde et à l’olécrâne (faisceaux antérieur, postérieur, transverse).', null, ['Stabilité en valgus'], 'Lésé chez les lanceurs.'),
  'Ligament collatéral radial': lig('Ligament de l’épicondyle latéral au ligament annulaire.', null, ['Stabilité en varus']),
  'Ligament annulaire du radius': lig('Anneau fibreux fixé aux bords de l’incisure radiale de l’ulna, qui entoure la tête radiale.', null, ['Maintient la tête radiale pendant la prono-supination'], 'Chez l’enfant, une traction sur le bras luxe la tête sous lui : pronation douloureuse.'),
  'Membrane interosseuse de l’avant-bras': lig('Membrane fibreuse entre les bords interosseux du radius et de l’ulna, fibres obliques en bas et en dedans.', null, ['Transmet les charges du radius à l’ulna', 'Sépare les loges antérieure et postérieure']),

  // ---------------------------------------------------------- poignet, main
  'Capsule de l’articulation radio-carpienne': capsule('radio-carpienne'),
  'Disque articulaire radio-ulnaire distal': { what: 'Disque triangulaire (complexe fibro-cartilagineux triangulaire) tendu de l’ulna au radius, sous la tête ulnaire.', action: ['Unit les deux os de l’avant-bras en bas, sépare l’ulna du carpe'] },
  'Ligament radio-ulnaire palmaire': lig('Renfort palmaire de l’articulation radio-ulnaire distale.'),
  'Ligament collatéral radial du carpe': lig('Ligament du processus styloïde du radius au scaphoïde.', null, ['Limite l’inclinaison ulnaire']),
  'Ligament collatéral ulnaire du carpe': lig('Ligament du processus styloïde de l’ulna au triquetrum et au pisiforme.', null, ['Limite l’inclinaison radiale']),
  'Ligament radio-scapho-capital': lig('Ligament palmaire du radius au capitatum, en sangle sous le col du scaphoïde.'),
  'Ligament radio-carpien dorsal': lig('Principal ligament dorsal du poignet, du radius au triquetrum.'),
  'Ligament radié du carpe': lig('Ligaments palmaires en éventail autour de la tête du capitatum.'),
  'Ligament ulno-lunaire': lig('Ligament palmaire de l’ulna (disque) au lunatum.'),
  'Ligament ulno-triquétral': lig('Ligament palmaire de l’ulna au triquetrum.'),
  'Ligament ulno-capital': lig('Ligament palmaire de l’ulna au capitatum.'),
  'Ligament ulno-carpien dorsal': lig('Ligament dorsal de l’ulna au carpe.'),
  'Ligament triquétro-capital': lig('Ligament palmaire entre triquetrum et capitatum.'),
  'Ligament scapho-triquétral dorsal': lig('Ligament dorsal intercarpien du scaphoïde au triquetrum.'),
  'Ligament scapho-triquétral palmaire': lig('Ligament palmaire du scaphoïde au triquetrum.'),
  'Ligament scapho-trapézo-trapézoïdien': lig('Ligament palmaire du tubercule du scaphoïde au trapèze et au trapézoïde.'),
  'Ligament piso-triquétral': lig('Ligament du pisiforme au triquetrum ; capsule de l’articulation piso-triquétrale.'),
  'Ligaments intercarpiens dorsaux': lig('Ligaments dorsaux entre les os du carpe.'),
  'Ligaments carpo-métacarpiens dorsaux': lig('Ligaments dorsaux du carpe aux bases des métacarpiens.'),
  'Ligaments carpo-métacarpiens palmaires': lig('Ligaments palmaires du carpe aux bases des métacarpiens.'),
  'Ligaments métacarpiens dorsaux': lig('Ligaments dorsaux entre les bases des métacarpiens 2 à 5.'),
  'Ligaments métacarpiens palmaires': lig('Ligaments palmaires entre les bases des métacarpiens.'),
  'Ligaments métacarpiens interosseux': lig('Ligaments entre les faces adjacentes des bases des métacarpiens.'),
  'Ligament métacarpien transverse profond': lig('Ligament qui unit les plaques palmaires des métacarpo-phalangiennes 2 à 5.', null, ['Empêche l’écartement des têtes métacarpiennes']),
  'Capsules des articulations métacarpo-phalangiennes': capsule('métacarpo-phalangienne', { note: 'Renforcée en avant par la plaque palmaire et latéralement par les ligaments collatéraux.' }),
  'Ligaments collatéraux métacarpo-phalangiens': lig('Ligaments latéraux des MCP, tendus en flexion et lâches en extension.', null, null, 'D’où l’immobilisation des MCP en flexion (position intrinsèque plus) pour éviter les raideurs.'),
  'Capsules des articulations interphalangiennes proximales': capsule('interphalangienne proximale'),
  'Capsules des articulations interphalangiennes distales': capsule('interphalangienne distale'),
  'Ligaments collatéraux interphalangiens de la main': lig('Ligaments latéraux des articulations interphalangiennes.', null, ['Stabilité latérale des doigts']),
  'Ligaments palmaires interphalangiens': lig('Plaques palmaires : fibrocartilages à la face palmaire des interphalangiennes.', null, ['Limitent l’hyperextension']),

  // ------------------------------------------------------------- bassin
  'Ligament sacro-iliaque antérieur': lig('Ligament mince à la face antérieure de l’articulation sacro-iliaque.'),
  'Ligament sacro-iliaque interosseux': lig('Ligament le plus puissant du corps, entre la tubérosité iliaque et la tubérosité sacrale.', null, ['Suspend le sacrum entre les os coxaux']),
  'Ligament sacro-iliaque postérieur': lig('Ligaments courts et longs à la face postérieure de l’articulation, de l’épine iliaque postéro-supérieure au sacrum.'),
  'Ligament sacro-épineux': lig('Ligament triangulaire du bord du sacrum et du coccyx à l’épine ischiatique.', null, ['S’oppose à la bascule du sacrum (nutation)', 'Transforme l’incisure ischiatique en grand et petit foramens'], 'Passent au-dessus de lui (grand foramen ischiatique) : piriforme, vaisseaux glutéaux, nerf ischiatique, nerf pudendal (qui le contourne).'),
  'Ligament sacrotubéral': lig('Large ligament du sacrum, du coccyx et des épines iliaques postérieures à la tubérosité ischiatique.', null, ['S’oppose à la nutation', 'Ferme en dehors le petit foramen ischiatique']),
  'Ligament pubien supérieur': lig('Ligament épais au-dessus de la symphyse pubienne, entre les deux tubercules pubiens.'),
  'Ligament pubien inférieur': lig('Ligament arqué sous la symphyse pubienne, qui arrondit l’angle sous-pubien.'),
  'Disque interpubien': { what: 'Fibrocartilage de la symphyse pubienne, parfois creusé d’une petite cavité.', note: 'Il se relâche pendant la grossesse sous l’effet hormonal.' },
  'Symphyse sacro-coccygienne': { what: 'Articulation cartilagineuse entre le sommet du sacrum et le coccyx.', action: ['Permet au coccyx de reculer pendant la défécation et l’accouchement'] },
  'Ligament intercornual': lig('Ligament qui unit les cornes du sacrum et du coccyx, au bord du hiatus sacral.'),
  'Membrane obturatrice': lig('Membrane fibreuse qui ferme le foramen obturé, sauf en haut où reste le canal obturateur.', null, null, 'Le canal obturateur laisse passer le nerf et les vaisseaux obturateurs.'),
  'Cartilage triradié': { what: 'Cartilage en Y au fond de l’acétabulum, où se rencontrent ilium, ischium et pubis chez l’enfant ; il ossifie vers 15–16 ans.' },

  // -------------------------------------------------------------- hanche
  'Capsule de l’articulation coxo-fémorale': capsule('coxo-fémorale', {
    insertion: ['Pourtour de l’acétabulum et labrum', 'En avant : ligne intertrochantérique ; en arrière : partie moyenne du col'],
    note: 'Le col fémoral est en partie intracapsulaire : les fractures du col menacent la vascularisation de la tête.',
  }),
  'Zone orbiculaire': lig('Fibres circulaires de la capsule qui serrent le col du fémur comme une boutonnière.'),
  'Freins capsulaires': lig('Replis synoviaux (frenula capsulae) qui soulèvent les vaisseaux rétinaculaires le long du col fémoral.'),
  'Labrum acétabulaire': { what: 'Bourrelet fibro-cartilagineux autour de l’acétabulum, qui l’approfondit et retient la tête fémorale par effet de joint.', note: 'Lésé dans les conflits fémoro-acétabulaires.' },
  'Ligament transverse de l’acétabulum': lig('Pont fibreux qui ferme l’incisure acétabulaire, prolongeant le labrum.', null, null, 'Les vaisseaux du ligament rond passent sous lui.'),
  'Ligament de la tête fémorale (ligament rond)': lig('Ligament intra-articulaire de la fovea de la tête fémorale à l’incisure acétabulaire.', null, null, 'Il conduit une petite artère (branche de l’obturatrice), importante chez l’enfant.'),
  'Faisceau supérieur du ligament ilio-fémoral': lig('Faisceau latéral du ligament de Bertin, de l’épine iliaque antéro-inférieure à la partie haute de la ligne intertrochantérique.', null, ['Limite l’extension et la rotation latérale']),
  'Faisceau inférieur du ligament ilio-fémoral': lig('Faisceau médial, vers le bas de la ligne intertrochantérique ; avec le supérieur il dessine un Y inversé.', null, ['Limite l’extension : il permet la station debout sans effort musculaire'], 'Ligament le plus solide du corps.'),
  'Ligament pubo-fémoral': lig('Ligament de l’éminence ilio-pubienne et de la branche supérieure du pubis au col.', null, ['Limite l’abduction et l’extension']),
  'Ligament ischio-fémoral': lig('Ligament postérieur de l’ischium à la fosse trochantérique, en spirale.', null, ['Limite la rotation médiale et l’extension']),

  // --------------------------------------------------------------- genou
  'Capsule de l’articulation du genou': capsule('du genou', { note: 'Très lâche en avant, où le récessus supra-patellaire remonte sous le quadriceps.' }),
  'Ligament croisé antérieur': lig('Ligament intra-articulaire de l’aire intercondylaire antérieure du tibia à la face médiale du condyle latéral du fémur.', null, ['Empêche le tibia de glisser en avant (tiroir antérieur)', 'Contrôle la rotation médiale'], 'Rompu dans les torsions du genou au sport ; test de Lachman.'),
  'Ligament croisé postérieur': lig('Ligament de l’aire intercondylaire postérieure du tibia à la face latérale du condyle médial ; plus épais que l’antérieur.', null, ['Empêche le tibia de reculer (tiroir postérieur)'], 'Lésé dans le choc du genou fléchi contre le tableau de bord.'),
  'Partie superficielle du ligament collatéral tibial': lig('Bande plate de l’épicondyle médial à la face médiale du tibia, sous la patte d’oie.', null, ['Stabilité en valgus']),
  'Partie profonde du ligament collatéral tibial': lig('Faisceaux courts ménisco-fémoral et ménisco-tibial, adhérents au ménisque médial.', null, null, 'Cette adhérence explique les lésions associées : triade de O’Donoghue (LCA, collatéral tibial, ménisque médial).'),
  'Ligament collatéral fibulaire': lig('Cordon arrondi de l’épicondyle latéral à la tête fibulaire, séparé du ménisque latéral par le tendon du poplité.', null, ['Stabilité en varus']),
  'Ménisque médial': { what: 'Fibrocartilage en C ouvert, entre condyle médial et plateau tibial ; adhérent à la capsule et au collatéral tibial, donc peu mobile.', action: ['Augmente la congruence, répartit les charges, amortit'], note: 'Plus souvent déchiré que le latéral.' },
  'Ménisque latéral': { what: 'Fibrocartilage presque circulaire (en O), plus mobile, séparé du collatéral fibulaire par le tendon du poplité.', action: ['Congruence et amortissement du compartiment latéral'] },
  'Ligament transverse du genou': lig('Ligament qui unit en avant les cornes antérieures des deux ménisques.'),
  'Ligament ménisco-patellaire': lig('Faisceau du rétinaculum patellaire au bord du ménisque.'),
  'Ligament ménisco-tibial antérieur (ménisque médial)': lig('Attache de la corne antérieure du ménisque médial sur l’aire intercondylaire antérieure.'),
  'Ligament ménisco-tibial postérieur (ménisque médial)': lig('Attache de la corne postérieure du ménisque médial sur l’aire intercondylaire postérieure.'),
  'Ligament ménisco-tibial antérieur (ménisque latéral)': lig('Attache de la corne antérieure du ménisque latéral.'),
  'Ligament ménisco-tibial postérieur (ménisque latéral)': lig('Attache de la corne postérieure du ménisque latéral.'),
  'Ligament poplité oblique': lig('Expansion du tendon du semi-membraneux sur la capsule postérieure, vers le condyle latéral.', null, ['Renforce la capsule postérieure, limite l’hyperextension']),
  'Ligament poplité arqué': lig('Ligament en Y de la tête fibulaire, qui enjambe le tendon du poplité vers la capsule postérieure.'),
  'Ligament poplité-fibulaire': lig('Ligament du tendon du poplité à la tête fibulaire ; élément du point d’angle postéro-latéral.'),
  'Coussinet adipeux infrapatellaire': { what: 'Corps adipeux de Hoffa, sous la patella, entre le ligament patellaire et la synoviale.' },
  'Capsule de l’articulation tibio-fibulaire proximale': capsule('tibio-fibulaire proximale'),
  'Ligament antérieur de la tête fibulaire': lig('Renfort antérieur de l’articulation tibio-fibulaire proximale.'),
  'Ligament postérieur de la tête fibulaire': lig('Renfort postérieur de l’articulation tibio-fibulaire proximale.'),
  'Membrane interosseuse de la jambe': lig('Membrane entre les bords interosseux du tibia et de la fibula.', null, ['Sépare les loges antérieure et postérieure de la jambe'], 'Les vaisseaux tibiaux antérieurs la traversent en haut.'),

  // ---------------------------------------------------- cheville (talo-crurale)
  'Ligament tibio-fibulaire antérieur': lig('Ligament antérieur de la syndesmose tibio-fibulaire distale.', null, ['Maintient la mortaise'], 'Lésé dans l’entorse « haute » de la cheville.'),
  'Ligament tibio-fibulaire postérieur': lig('Ligament postérieur de la syndesmose tibio-fibulaire distale.'),
  'Ligament tibio-fibulaire transverse': lig('Partie profonde du ligament postérieur, qui forme la lèvre postérieure de la mortaise.'),
  'Ligament talo-fibulaire antérieur': lig('Faisceau antérieur du ligament collatéral latéral, de la malléole latérale au col du talus.', null, ['Limite l’inversion en flexion plantaire'], 'Premier ligament rompu dans l’entorse de la cheville en varus.'),
  'Ligament calcanéo-fibulaire': lig('Faisceau moyen du collatéral latéral, de la pointe de la malléole latérale au calcanéus.', null, ['Limite l’inversion'], 'Rompu dans les entorses graves, après le talo-fibulaire antérieur.'),
  'Ligament talo-fibulaire postérieur': lig('Faisceau postérieur du collatéral latéral, le plus solide, vers le tubercule latéral du talus.'),
  'Ligament tibio-naviculaire': lig('Faisceau antérieur superficiel du ligament collatéral médial (deltoïdien), de la malléole médiale au naviculaire.'),
  'Ligament tibio-calcanéen': lig('Faisceau moyen du ligament deltoïdien, vers le sustentaculum tali.', null, ['Limite l’éversion']),
  'Ligament tibio-talaire postérieur': lig('Faisceau profond et postérieur du ligament deltoïdien, vers le talus.'),

  // --------------------------------------------------------- tarse et pied
  'Ligament talo-calcanéen interosseux': lig('Ligament épais dans le sinus du tarse, entre talus et calcanéus.', null, ['Principal moyen d’union de l’articulation sub-talaire']),
  'Ligament talo-calcanéen latéral': lig('Petit ligament latéral de l’articulation sub-talaire.'),
  'Ligament talo-calcanéen médial': lig('Petit ligament médial de l’articulation sub-talaire.'),
  'Ligament talo-calcanéen antérieur': lig('Ligament antérieur de la sub-talaire, dans le sinus du tarse.'),
  'Ligament talo-calcanéen postérieur': lig('Ligament postérieur de la sub-talaire.'),
  'Ligament talo-naviculaire': lig('Ligament dorsal entre col du talus et naviculaire.'),
  'Ligament calcanéo-naviculaire': lig('Faisceau médial du ligament bifurqué (en Y) de Chopart.', null, null, 'Le ligament bifurqué est la « clé » de l’articulation transverse du tarse (Chopart).'),
  'Ligament calcanéo-naviculaire plantaire': lig('Ligament « glénoïdien » (spring ligament) du sustentaculum tali au naviculaire, qui porte la tête du talus.', null, ['Soutient l’arche longitudinale médiale'], 'Sa distension contribue au pied plat.'),
  'Ligament calcanéo-cuboïdien': lig('Faisceau latéral du ligament bifurqué, du calcanéus au cuboïde.'),
  'Ligament calcanéo-cuboïdien plantaire': lig('Ligament plantaire court, profond, du calcanéus au cuboïde.', null, ['Soutient l’arche latérale']),
  'Ligament plantaire long': lig('Ligament le plus long du pied, du calcanéus au cuboïde et aux bases des métatarsiens 2 à 5 ; il forme le canal du tendon du long fibulaire.', null, ['Soutient l’arche longitudinale latérale']),
  'Ligament cunéo-cuboïdien interosseux': lig('Ligament entre cunéiforme latéral et cuboïde.'),
  'Ligament cunéo-cuboïdien plantaire': lig('Ligament plantaire entre cunéiforme latéral et cuboïde.'),
  'Ligaments cunéo-naviculaires dorsaux': lig('Ligaments dorsaux du naviculaire aux trois cunéiformes.'),
  'Ligaments cunéo-naviculaires plantaires': lig('Ligaments plantaires du naviculaire aux cunéiformes.'),
  'Ligaments intercunéiformes dorsaux': lig('Ligaments dorsaux entre les cunéiformes.'),
  'Ligaments intercunéiformes plantaires': lig('Ligaments plantaires entre les cunéiformes.'),
  'Ligaments intercunéiformes interosseux': lig('Ligaments entre les faces adjacentes des cunéiformes.'),
  'Ligaments tarso-métatarsiens dorsaux': lig('Ligaments dorsaux de l’articulation de Lisfranc.'),
  'Ligaments tarso-métatarsiens plantaires': lig('Ligaments plantaires de l’articulation de Lisfranc.'),
  'Ligaments cunéo-métatarsiens interosseux': lig('Ligaments interosseux de Lisfranc, dont le plus fort unit le cunéiforme médial à la base du 2e métatarsien (ligament de Lisfranc).', null, null, 'Sa rupture : entorse ou luxation de Lisfranc, souvent méconnue.'),
  'Ligaments métatarsiens dorsaux': lig('Ligaments dorsaux entre les bases des métatarsiens.'),
  'Ligaments métatarsiens plantaires': lig('Ligaments plantaires entre les bases des métatarsiens.'),
  'Ligaments métatarsiens interosseux': lig('Ligaments entre les bases adjacentes des métatarsiens 2 à 5.'),
  'Ligament métatarsien transverse profond': lig('Ligament qui unit les plaques plantaires des métatarso-phalangiennes.', null, null, 'Le nerf digital passe sous lui : névrome de Morton (3e espace).'),
  'Ligament intersésamoïdien': lig('Ligament entre les deux sésamoïdes de l’hallux.'),
  'Capsules des articulations métatarso-phalangiennes': capsule('métatarso-phalangienne'),
  'Ligaments collatéraux métatarso-phalangiens': lig('Ligaments latéraux des métatarso-phalangiennes.'),
  'Ligaments plantaires métatarso-phalangiens': lig('Plaques plantaires des métatarso-phalangiennes.'),
  'Capsules des articulations interphalangiennes proximales du pied': capsule('interphalangienne proximale du pied'),
  'Capsules des articulations interphalangiennes distales du pied': capsule('interphalangienne distale du pied'),
  'Capsule de l’articulation interphalangienne de l’hallux': capsule('interphalangienne de l’hallux'),
  'Ligaments collatéraux interphalangiens du pied': lig('Ligaments latéraux des interphalangiennes du pied.'),
  'Ligaments plantaires interphalangiens': lig('Plaques plantaires des interphalangiennes du pied.'),
};
