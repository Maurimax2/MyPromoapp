// The arteries the whole body shows and no regional model described.
// Origin, course, branches, territory — the order a lecture asks for them.
// Keyed by the French name in the body's manifests, without the side.

const seg = (lobe, side, where) => ({
  what: `Artère segmentaire du ${lobe} ${side}, branche de l’artère pulmonaire, qui accompagne la bronche segmentaire du même nom${where ? ` (${where})` : ''}.`,
  supplies: ['Le segment broncho-pulmonaire correspondant (sang veineux à oxygéner)'],
  note: 'Les artères pulmonaires suivent les bronches ; les veines pulmonaires courent entre les segments.',
});

export const ARTERY_NOTES = {
  // ----------------------------------------------------------- tronc
  'Aorte thoracique': {
    what: `Aorte descendante dans le médiastin postérieur, de T4 au hiatus aortique
      du diaphragme (T12), d’abord à gauche puis en avant du rachis.`,
    branches: ['Artères intercostales postérieures (3e à 11e) et subcostales', 'Artères bronchiques',
      'Artères œsophagiennes', 'Artères phréniques supérieures', 'Rameaux médiastinaux et péricardiques'],
    near: ['En avant : bronche principale gauche, péricarde (atrium gauche), œsophage qui la croise',
      'À droite : conduit thoracique et veine azygos'],
  },
  'Aorte abdominale': {
    what: `Suite de l’aorte thoracique, du hiatus aortique (T12) à sa bifurcation
      devant L4, à gauche de la veine cave inférieure.`,
    branches: ['Viscérales impaires : tronc cœliaque (T12), artère mésentérique supérieure (L1), artère mésentérique inférieure (L3)',
      'Viscérales paires : surrénales moyennes, rénales (L1–L2), gonadiques (L2)',
      'Pariétales : phréniques inférieures, artères lombales (4 paires), sacrale médiane'],
    ends: ['Bifurque en artères iliaques communes droite et gauche, devant L4 (niveau de l’ombilic)'],
    near: ['En avant : pancréas, 3e duodénum, veine rénale gauche (pince aorto-mésentérique)'],
    note: 'Siège principal des anévrysmes, sous-rénaux le plus souvent.',
  },
  'Tronc cœliaque': {
    what: 'Première branche viscérale impaire de l’aorte abdominale, à T12, courte (1 à 2 cm).',
    branches: ['Artère gastrique gauche', 'Artère hépatique commune', 'Artère splénique'],
    supplies: ['Organes de l’étage sus-mésocolique : estomac, foie, voies biliaires, rate, pancréas, duodénum proximal'],
    note: 'Ses trois branches forment le « trépied cœliaque » de Haller.',
  },
  'Artère gastrique gauche': {
    what: 'Plus petite branche du tronc cœliaque ; monte vers le cardia puis suit la petite courbure de l’estomac.',
    branches: ['Rameaux œsophagiens', 'Rameaux gastriques'],
    ends: ['S’anastomose avec l’artère gastrique droite sur la petite courbure'],
  },
  'Artère hépatique commune': {
    what: 'Branche droite du tronc cœliaque, le long du bord supérieur du pancréas.',
    branches: ['Artère gastroduodénale', 'Artère hépatique propre (sa suite)'],
  },
  'Artère hépatique propre': {
    what: 'Suite de l’hépatique commune après la gastroduodénale, dans le ligament hépato-duodénal, à gauche du conduit cholédoque et en avant de la veine porte.',
    branches: ['Artère gastrique droite', 'Branches droite (→ artère cystique) et gauche du foie'],
    supplies: ['Foie (environ 25 % de son débit sanguin, mais la moitié de son oxygène)', 'Vésicule biliaire'],
  },
  'Artère gastroduodénale': {
    what: 'Branche de l’hépatique commune, qui descend derrière la première partie du duodénum.',
    branches: ['Artère gastro-omentale droite', 'Artères pancréatico-duodénales supérieures antérieure et postérieure'],
    note: 'Un ulcère de la face postérieure du bulbe duodénal peut l’éroder : hémorragie digestive grave.',
  },
  'Artère splénique': {
    what: 'Branche la plus grosse du tronc cœliaque, très sinueuse, le long du bord supérieur du pancréas jusqu’au hile de la rate.',
    branches: ['Rameaux pancréatiques (dont la grande artère pancréatique)', 'Artères gastriques courtes',
      'Artère gastro-omentale gauche', 'Artères spléniques terminales'],
  },
  'Artère mésentérique supérieure': {
    what: 'Naît de l’aorte à L1, derrière le pancréas ; passe en avant du 3e duodénum et entre dans la racine du mésentère.',
    branches: ['Artère pancréatico-duodénale inférieure', 'Artères jéjunales et iléales (12 à 15)', 'Artère colique moyenne',
      'Artère colique droite', 'Artère iléo-colique'],
    supplies: ['Intestin moyen : duodénum distal, jéjunum, iléum, cæcum, appendice, côlon ascendant, deux tiers droits du transverse'],
    near: ['Avec l’aorte, elle pince la veine rénale gauche et le 3e duodénum'],
  },
  'Artère pancréatico-duodénale inférieure': {
    what: 'Première branche de l’artère mésentérique supérieure.',
    branches: ['Rameaux antérieur et postérieur'],
    supplies: ['Tête du pancréas et duodénum'],
    note: 'S’anastomose avec les pancréatico-duodénales supérieures : arcades pancréatico-duodénales, pont entre tronc cœliaque et mésentérique supérieure.',
  },
  'Artère pancréatico-duodénale inférieure antérieure': {
    what: 'Rameau antérieur de la pancréatico-duodénale inférieure.',
    supplies: ['Face antérieure de la tête du pancréas et du duodénum'],
    ends: ['Arcade pancréatico-duodénale antérieure, avec l’artère supérieure antérieure'],
  },
  'Artère colique moyenne': {
    what: 'Branche de la mésentérique supérieure qui entre dans le mésocôlon transverse.',
    supplies: ['Côlon transverse (deux tiers droits)'],
    note: 'Ses anastomoses avec la colique gauche participent à l’arcade marginale.',
  },
  'Artère colique droite': {
    what: 'Branche de la mésentérique supérieure, rétropéritonéale, vers le côlon ascendant.',
    branches: ['Rameau ascendant et rameau descendant'], supplies: ['Côlon ascendant et angle colique droit'],
  },
  'Artère iléo-colique': {
    what: 'Dernière branche droite de la mésentérique supérieure, vers la fosse iliaque droite.',
    branches: ['Rameau colique', 'Rameau iléal', 'Artères cæcales antérieure et postérieure', 'Artère appendiculaire'],
    supplies: ['Iléum terminal, cæcum, appendice, début du côlon ascendant'],
  },
  'Rameau colique de l’artère iléo-colique': {
    what: 'Branche ascendante de l’iléo-colique, anastomosée avec la colique droite.', supplies: ['Début du côlon ascendant'],
  },
  'Rameau iléal de l’artère iléo-colique': {
    what: 'Branche de l’iléo-colique anastomosée avec la dernière artère iléale.', supplies: ['Iléum terminal'],
  },
  'Artère appendiculaire': {
    what: 'Branche de l’artère iléo-colique, dans le méso-appendice, derrière l’iléum terminal.',
    supplies: ['Appendice vermiforme'],
    note: 'Artère terminale : sa thrombose dans l’appendicite mène à la gangrène et à la perforation.',
  },
  'Artère mésentérique inférieure': {
    what: 'Naît de l’aorte à L3, rétropéritonéale, à gauche.',
    branches: ['Artère colique gauche', 'Artères sigmoïdiennes (2 à 4)', 'Artère rectale supérieure (sa terminaison)'],
    supplies: ['Intestin postérieur : tiers gauche du transverse, côlon descendant, sigmoïde, rectum supérieur'],
  },
  'Artère colique gauche': {
    what: 'Première branche de la mésentérique inférieure.',
    branches: ['Branche ascendante', 'Branche descendante'],
    supplies: ['Côlon descendant et angle colique gauche'],
  },
  'Branche ascendante de l’artère colique gauche': {
    what: 'Monte vers l’angle colique gauche et s’anastomose avec la colique moyenne (arcade de Riolan).',
    supplies: ['Angle colique gauche, fin du transverse'],
  },
  'Branche descendante de l’artère colique gauche': {
    what: 'Descend le long du côlon descendant, anastomosée avec la première artère sigmoïdienne.',
    supplies: ['Côlon descendant'],
  },
  'Artères sigmoïdiennes': {
    what: 'Deux à quatre branches de la mésentérique inférieure, dans le mésocôlon sigmoïde.',
    supplies: ['Côlon sigmoïde'],
  },
  'Artère marginale du côlon': {
    what: `Arcade continue (de Drummond) le long du bord mésentérique du côlon,
      formée par les anastomoses de toutes les artères coliques.`,
    note: 'Elle permet la survie du côlon quand une artère colique est liée.',
  },
  'Artère rectale supérieure': {
    what: 'Terminaison de la mésentérique inférieure, qui croise les vaisseaux iliaques communs gauches.',
    branches: ['Rameaux droit et gauche'], supplies: ['Partie supérieure du rectum'],
    note: 'Anastomose avec les rectales moyennes et inférieures : carrefour entre système porte et système cave.',
  },
  'Artère rénale droite': {
    what: 'Naît de l’aorte à L1–L2, plus longue que la gauche, passe derrière la veine cave inférieure.',
    branches: ['Artère surrénale inférieure', 'Branches antérieure et postérieure (pré- et rétro-pyélique)', 'Rameaux urétériques'],
    supplies: ['Rein droit (artères segmentaires terminales)'],
  },
  'Artère rénale gauche': {
    what: 'Naît de l’aorte à L1, courte, derrière la veine rénale gauche.',
    branches: ['Artère surrénale inférieure', 'Branches antérieure et postérieure', 'Rameaux urétériques'],
    supplies: ['Rein gauche'],
  },
  'Branche antérieure de l’artère rénale': {
    what: 'Branche pré-pyélique, en avant du bassinet.',
    branches: ['Artères segmentaires supérieure, antéro-supérieure, antéro-inférieure et inférieure'],
    note: 'Les artères segmentaires sont terminales : chacune irrigue un segment rénal sans suppléance.',
  },
  'Branche postérieure de l’artère rénale': {
    what: 'Branche rétro-pyélique, derrière le bassinet.', branches: ['Artère segmentaire postérieure'],
    note: 'Entre les territoires antérieur et postérieur passe la ligne avasculaire de Hyrtl, voie d’abord chirurgicale du rein.',
  },
  'Artères intrarénales du rein droit': {
    what: 'Artères segmentaires, interlobaires, arquées et interlobulaires du rein droit, jusqu’aux artérioles afférentes des glomérules.',
  },
  'Artères intrarénales du rein gauche': {
    what: 'Artères segmentaires, interlobaires (entre les pyramides), arquées (à la base des pyramides) et interlobulaires (dans le cortex) du rein gauche.',
  },
  'Artère surrénale': {
    what: 'La glande surrénale reçoit trois artères : supérieure (de la phrénique inférieure), moyenne (de l’aorte), inférieure (de la rénale).',
    supplies: ['Glande surrénale'],
  },
  'Artère testiculaire droite': {
    what: 'Naît de la face antérieure de l’aorte à L2 ; longue et grêle, descend devant le psoas puis entre dans le canal inguinal avec le cordon spermatique.',
    supplies: ['Testicule et épididyme'],
    near: ['Croise en avant l’uretère et la veine cave inférieure'],
  },
  'Artère testiculaire gauche': {
    what: 'Naît de l’aorte à L2, descend en arrière du côlon sigmoïde jusqu’à l’anneau inguinal profond.',
    supplies: ['Testicule et épididyme gauches'],
  },
  'Artères lombales': {
    what: 'Quatre paires de branches pariétales de l’aorte, en regard de L1–L4.',
    supplies: ['Muscles de la paroi postérieure de l’abdomen', 'Muscles du dos', 'Rameaux spinaux pour la moelle et le canal vertébral'],
  },
  'Artère sacrale médiane': {
    what: 'Petite branche impaire née de la face postérieure de l’aorte juste au-dessus de sa bifurcation ; descend sur le sacrum et le coccyx.',
    supplies: ['Sacrum, coccyx, rectum'],
  },
  'Artère phrénique inférieure': {
    what: 'Première branche de l’aorte abdominale (ou du tronc cœliaque), à la face inférieure du diaphragme.',
    branches: ['Artère surrénale supérieure'], supplies: ['Diaphragme', 'Glande surrénale'],
  },
  'Artères phréniques supérieures': {
    what: 'Petites branches de l’aorte thoracique basse, à la face supérieure du diaphragme.',
    supplies: ['Partie postérieure du diaphragme'],
  },
  'Artère subcostale': {
    what: 'Dernière branche pariétale de l’aorte thoracique, sous la 12e côte.',
    supplies: ['Paroi abdominale postérieure et latérale'],
  },
  'Artère épigastrique supérieure': {
    what: 'Branche terminale médiale de l’artère thoracique interne, qui entre dans la gaine du muscle droit.',
    supplies: ['Muscle droit de l’abdomen, paroi antérieure supra-ombilicale'],
    ends: ['S’anastomose avec l’épigastrique inférieure dans le muscle droit'],
  },
  'Artère épigastrique profonde': {
    what: 'Artère épigastrique inférieure : branche de l’artère iliaque externe juste au-dessus du ligament inguinal ; monte à la face profonde du muscle droit.',
    branches: ['Artère crémastérique (ou du ligament rond)', 'Rameau pubien (parfois artère obturatrice : corona mortis)'],
    supplies: ['Muscle droit et paroi antérieure de l’abdomen'],
    near: ['Elle borde en dedans l’anneau inguinal profond : hernie oblique externe en dehors d’elle, directe en dedans'],
  },
  'Artère épigastrique superficielle': {
    what: 'Branche de l’artère fémorale sous le ligament inguinal, qui remonte vers l’ombilic dans le tissu sous-cutané.',
    supplies: ['Peau et tissu sous-cutané de la paroi abdominale inférieure'],
  },
  'Artère musculophrénique': {
    what: 'Branche terminale latérale de l’artère thoracique interne, le long de l’arc costal.',
    supplies: ['Diaphragme', 'Espaces intercostaux 7 à 9 (artères intercostales antérieures)'],
  },
  'Artère iliaque commune': {
    what: 'Branche de bifurcation de l’aorte devant L4 ; descend vers l’articulation sacro-iliaque.',
    ends: ['Se divise en artère iliaque externe et iliaque interne devant l’articulation sacro-iliaque'],
    near: ['L’uretère la croise (ou croise la bifurcation) au détroit supérieur'],
  },
  'Artère iliaque interne': {
    what: 'Branche de division médiale de l’iliaque commune ; descend dans le petit bassin.',
    branches: ['Tronc postérieur : ilio-lombale, sacrales latérales, glutéale supérieure',
      'Tronc antérieur : ombilicale, vésicales, obturatrice, utérine, rectale moyenne, vaginale, pudendale interne, glutéale inférieure'],
    supplies: ['Viscères pelviens, périnée, région glutéale, organes génitaux'],
  },
  'Tronc postérieur de l’artère iliaque interne': {
    what: 'Division postérieure de l’iliaque interne.',
    branches: ['Artère ilio-lombale', 'Artères sacrales latérales', 'Artère glutéale supérieure'],
    supplies: ['Paroi : muscles et os du bassin, région glutéale supérieure'],
  },
  'Tronc antérieur de l’artère iliaque interne': {
    what: 'Division antérieure de l’iliaque interne, surtout viscérale.',
    branches: ['Artère ombilicale (→ artères vésicales supérieures)', 'Artère obturatrice', 'Artère vésicale inférieure (homme)',
      'Artère utérine et artère vaginale (femme)', 'Artère rectale moyenne', 'Artère pudendale interne', 'Artère glutéale inférieure'],
  },
  'Artère ilio-lombaire': {
    what: 'Artère ilio-lombale : première branche du tronc postérieur de l’iliaque interne, qui remonte derrière le psoas.',
    branches: ['Rameau lombal', 'Rameau spinal', 'Rameau iliaque'],
  },
  'Rameau lombal de l’artère ilio-lombale': { what: 'Branche ascendante de l’ilio-lombale.', supplies: ['Muscles psoas et carré des lombes'] },
  'Rameau spinal de l’artère ilio-lombale': { what: 'Branche qui entre dans le foramen intervertébral L5–S1.', supplies: ['Queue de cheval et méninges'] },
  'Rameau iliaque de l’artère ilio-lombale': { what: 'Branche qui gagne la fosse iliaque.', supplies: ['Muscle iliaque et os coxal'] },
  'Artère glutéale supérieure': {
    what: 'Plus grosse branche de l’iliaque interne ; sort du bassin par la grande incisure ischiatique AU-DESSUS du muscle piriforme.',
    branches: ['Branche superficielle (grand fessier)', 'Branche profonde (moyen et petit fessiers)'],
    supplies: ['Muscles moyen et petit fessiers, tenseur du fascia lata, grand fessier (partie supérieure)'],
  },
  'Artère glutéale inférieure': {
    what: 'Branche du tronc antérieur de l’iliaque interne ; sort AU-DESSOUS du muscle piriforme, avec le nerf ischiatique.',
    supplies: ['Grand fessier, muscles pelvi-trochantériens', 'Artère du nerf ischiatique'],
  },
  'Artère obturatrice': {
    what: 'Branche du tronc antérieur de l’iliaque interne ; longe la paroi pelvienne et sort par le canal obturateur.',
    supplies: ['Muscles adducteurs', 'Tête fémorale (artère du ligament de la tête fémorale)'],
    note: 'Dans 25 % des cas elle naît de l’épigastrique inférieure et passe au bord du canal fémoral : « corona mortis », danger dans la cure de hernie fémorale.',
  },
  'Artère pudendale interne': {
    what: 'Branche du tronc antérieur de l’iliaque interne ; sort du bassin sous le piriforme, contourne l’épine ischiatique et rentre dans le périnée par la petite incisure ischiatique, dans le canal pudendal (d’Alcock).',
    branches: ['Artère rectale inférieure', 'Artère périnéale', 'Artère du bulbe', 'Artère profonde et artère dorsale du pénis (ou du clitoris)'],
    supplies: ['Périnée, organes génitaux externes, canal anal'],
  },
  'Artère dorsale du pénis': {
    what: 'Branche terminale de la pudendale interne, sur le dos du pénis entre la veine dorsale profonde (au milieu) et le nerf dorsal (en dehors).',
    supplies: ['Gland, peau et fascias du pénis'],
  },
  'Artère profonde du pénis': {
    what: 'Artère caverneuse : branche terminale de la pudendale interne, dans l’axe de chaque corps caverneux.',
    branches: ['Artères hélicines'], supplies: ['Corps caverneux : sa dilatation produit l’érection'],
  },
  'Artère pudendale externe superficielle': {
    what: 'Branche de l’artère fémorale au trigone fémoral.', supplies: ['Peau du pubis, du scrotum ou des grandes lèvres'],
  },
  'Artère pudendale externe profonde': {
    what: 'Branche de l’artère fémorale, passe sous le fascia lata.', supplies: ['Scrotum ou grandes lèvres'],
  },
  'Artère iliaque externe': {
    what: 'Branche de division latérale de l’iliaque commune ; longe le bord médial du psoas jusqu’au ligament inguinal.',
    branches: ['Artère épigastrique inférieure', 'Artère circonflexe iliaque profonde'],
    ends: ['Devient l’artère fémorale en passant sous le ligament inguinal (lacune vasculaire)'],
  },

  // -------------------------------------------------------- membre inférieur
  'Artère fémorale': {
    what: 'Suite de l’iliaque externe sous le ligament inguinal ; descend dans le trigone fémoral puis le canal des adducteurs (de Hunter).',
    branches: ['Épigastrique superficielle, circonflexe iliaque superficielle, pudendales externes', 'Artère profonde de la cuisse', 'Artère descendante du genou'],
    ends: ['Devient l’artère poplitée au hiatus de l’adducteur'],
    near: ['Au trigone fémoral, de dehors en dedans : nerf, artère, veine (NAV)', 'Pouls fémoral à mi-distance de l’épine iliaque antéro-supérieure et de la symphyse'],
  },
  'Artère profonde de la cuisse': {
    what: 'Principale branche de l’artère fémorale, née 3 à 5 cm sous le ligament inguinal ; descend en arrière du long adducteur.',
    branches: ['Artères circonflexes fémorales médiale et latérale', 'Artères perforantes (3 ou 4)'],
    supplies: ['Muscles de la cuisse, tête et col du fémur'],
  },
  'Artère circonflexe fémorale médiale': {
    what: 'Branche de la profonde de la cuisse, qui contourne en arrière le col du fémur.',
    supplies: ['Tête et col du fémur — artère principale de la tête', 'Adducteurs'],
    note: 'Sa rupture dans une fracture du col du fémur expose à la nécrose de la tête fémorale.',
  },
  'Artère circonflexe fémorale latérale': {
    what: 'Branche de la profonde de la cuisse, en avant du col, sous le droit fémoral.',
    branches: ['Branches ascendante, transverse et descendante'],
    supplies: ['Quadriceps, région trochantérienne, tête fémorale (partiellement)'],
  },
  'Branche descendante de l’artère circonflexe fémorale latérale': {
    what: 'Descend le long du vaste latéral jusqu’au genou, où elle rejoint le réseau articulaire.', supplies: ['Vaste latéral'],
  },
  'Artères perforantes de la cuisse': {
    what: 'Trois ou quatre branches de la profonde de la cuisse qui traversent le grand adducteur vers la loge postérieure.',
    supplies: ['Ischio-jambiers, vaste latéral, fémur (artère nourricière)'],
  },
  'Artère poplitée': {
    what: 'Suite de la fémorale au hiatus de l’adducteur ; traverse la fosse poplitée, plan le plus profond (contre le fémur).',
    branches: ['Artères supéro-médiale et supéro-latérale du genou', 'Artère moyenne du genou', 'Artères inféro-médiale et inféro-latérale du genou', 'Artères surales'],
    ends: ['Se divise au bord inférieur du poplité en artères tibiale antérieure et tibio-fibulaire (tronc → tibiale postérieure et fibulaire)'],
    note: 'Pouls difficile à percevoir, genou fléchi ; menacée dans les luxations du genou.',
  },
  'Artère supéro-médiale du genou': { what: 'Branche de la poplitée qui contourne le condyle médial au-dessus de lui.', ends: ['Réseau articulaire du genou'] },
  'Artère supéro-latérale du genou': { what: 'Branche de la poplitée qui contourne le condyle latéral.', ends: ['Réseau articulaire du genou'] },
  'Artère moyenne du genou': { what: 'Branche de la poplitée qui perfore la capsule postérieure.', supplies: ['Ligaments croisés, synoviale'] },
  'Artère inféro-médiale du genou': { what: 'Branche de la poplitée qui passe sous le condyle médial du tibia.', ends: ['Réseau articulaire du genou'] },
  'Artère inféro-latérale du genou': { what: 'Branche de la poplitée, au-dessus de la tête fibulaire, sous le ligament collatéral fibulaire.', ends: ['Réseau articulaire du genou'] },
  'Réseau articulaire patellaire': {
    what: 'Réseau anastomotique autour de la patella, formé par les artères du genou, la descendante du genou et les récurrentes tibiales.',
  },
  'Artère tibiale antérieure': {
    what: 'Branche de la poplitée qui traverse la membrane interosseuse et descend dans la loge antérieure de la jambe avec le nerf fibulaire profond.',
    branches: ['Artères récurrentes tibiales', 'Artères malléolaires antérieures'],
    ends: ['Devient l’artère dorsale du pied devant la cheville'],
  },
  'Artère tibiale postérieure': {
    what: 'Branche du tronc tibio-fibulaire, dans la loge postérieure profonde avec le nerf tibial.',
    branches: ['Artère fibulaire (le plus souvent)', 'Rameaux calcanéens', 'Artère nourricière du tibia'],
    ends: ['Se divise sous le rétinaculum des fléchisseurs en artères plantaires médiale et latérale'],
    note: 'Pouls derrière la malléole médiale.',
  },
  'Rameaux calcanéens de l’artère tibiale postérieure': { what: 'Petites branches vers la face médiale du calcanéus.', supplies: ['Talon'] },
  'Artère fibulaire': {
    what: 'Branche de la tibiale postérieure (ou du tronc tibio-fibulaire) qui descend contre la fibula, sous le long fléchisseur de l’hallux.',
    branches: ['Rameau perforant', 'Rameaux calcanéens latéraux', 'Artère nourricière de la fibula'],
    supplies: ['Loge latérale et loge postérieure profonde, fibula'],
  },
  'Rameaux calcanéens de l’artère fibulaire': { what: 'Branches terminales de la fibulaire vers la face latérale du talon.' },
  'Artère dorsale du pied': {
    what: 'Suite de la tibiale antérieure au dos du pied, en dehors du tendon du long extenseur de l’hallux.',
    branches: ['Artères tarsiennes latérale et médiales', 'Artère arquée', 'Artère plantaire profonde (vers l’arcade plantaire)'],
    note: 'Pouls pédieux, entre les tendons des long extenseurs de l’hallux et des orteils.',
  },
  'Artère tarsienne latérale': { what: 'Branche de la dorsale du pied sous le court extenseur des orteils.', supplies: ['Tarse latéral'] },
  'Artère arquée du pied': {
    what: 'Branche de la dorsale du pied qui croise en arc les bases des métatarsiens.',
    branches: ['Artères métatarsiennes dorsales 2 à 4'],
  },
  'Artères métatarsiennes dorsales': { what: 'Branches de l’artère arquée dans les espaces intermétatarsiens.', branches: ['Artères digitales dorsales'] },
  'Artères digitales dorsales du pied': { what: 'Branches terminales des métatarsiennes dorsales, au dos des orteils.' },
  'Artère plantaire profonde': { what: 'Branche de la dorsale du pied qui traverse le premier espace intermétatarsien pour fermer l’arcade plantaire profonde.' },
  'Artère plantaire médiale': {
    what: 'Branche de division la plus petite de la tibiale postérieure, au bord médial de la plante.',
    branches: ['Branche superficielle et branche profonde'], supplies: ['Muscles et peau du bord médial de la plante, hallux'],
  },
  'Branche superficielle de l’artère plantaire médiale': { what: 'Rameau de la plantaire médiale qui gagne le bord médial de l’hallux.' },
  'Artère plantaire latérale': {
    what: 'Branche de division la plus grosse de la tibiale postérieure ; traverse la plante en diagonale vers la base du 5e métatarsien.',
    ends: ['Forme l’arcade plantaire profonde avec l’artère plantaire profonde'],
  },
  'Arcade plantaire profonde': {
    what: 'Arcade artérielle à la base des métatarsiens, formée par l’artère plantaire latérale et la plantaire profonde (de la dorsale du pied).',
    branches: ['Artères métatarsiennes plantaires', 'Rameaux perforants'],
  },
  'Artères métatarsiennes plantaires': { what: 'Quatre branches de l’arcade plantaire, entre les métatarsiens.', branches: ['Artères digitales plantaires communes'] },
  'Rameaux perforants des artères métatarsiennes plantaires': { what: 'Anastomoses entre artères métatarsiennes plantaires et dorsales.' },
  'Artères digitales plantaires communes': { what: 'Suite des métatarsiennes plantaires, qui se divisent en digitales propres.' },
  'Artères digitales plantaires propres': { what: 'Artères des bords des orteils, côté plantaire.' },

  // -------------------------------------------------------- membre supérieur
  'Artère axillaire': {
    what: 'Suite de la subclavière au bord externe de la 1re côte, jusqu’au bord inférieur du grand rond ; divisée en trois segments par le petit pectoral.',
    branches: ['1er segment : artère thoracique supérieure', '2e segment : thoraco-acromiale, thoracique latérale',
      '3e segment : subscapulaire, circonflexes humérales antérieure et postérieure'],
    ends: ['Devient l’artère brachiale'],
    near: ['Entourée des faisceaux du plexus brachial, nommés d’après leur position autour d’elle'],
  },
  'Artère thoraco-acromiale': {
    what: 'Branche du 2e segment de l’axillaire qui perfore le fascia clavi-pectoral.',
    branches: ['Rameaux pectoraux', 'Rameau acromial', 'Rameau claviculaire', 'Rameau deltoïdien'],
  },
  'Rameaux pectoraux de l’artère thoraco-acromiale': { what: 'Branches de la thoraco-acromiale entre grand et petit pectoral.', supplies: ['Muscles pectoraux'] },
  'Artère thoracique latérale': {
    what: 'Branche du 2e segment de l’axillaire, le long du bord inférieur du petit pectoral.',
    supplies: ['Muscle dentelé antérieur, pectoraux, partie latérale de la glande mammaire'],
  },
  'Artère subscapulaire': {
    what: 'Plus grosse branche de l’axillaire (3e segment).',
    branches: ['Artère circonflexe de la scapula', 'Artère thoraco-dorsale'],
  },
  'Artère circonflexe de la scapula': {
    what: 'Branche de la subscapulaire qui passe par l’espace triangulaire (omo-tricipital) vers la fosse infra-épineuse.',
    note: 'Anastomose avec la suprascapulaire et la transverse du cou : réseau périscapulaire, voie de suppléance de l’axillaire.',
  },
  'Artère thoraco-dorsale': { what: 'Suite de la subscapulaire, avec le nerf thoraco-dorsal.', supplies: ['Muscle grand dorsal'] },
  'Artère circonflexe humérale antérieure': { what: 'Branche de l’axillaire qui contourne en avant le col chirurgical de l’humérus.' },
  'Artère circonflexe humérale postérieure': {
    what: 'Branche de l’axillaire qui passe avec le nerf axillaire par l’espace quadrangulaire et contourne en arrière le col chirurgical.',
    supplies: ['Deltoïde, articulation de l’épaule'],
  },
  'Artère brachiale': {
    what: 'Suite de l’axillaire au bord inférieur du grand rond ; descend au bord médial du biceps, avec le nerf médian qui la croise.',
    branches: ['Artère profonde du bras', 'Artères collatérales ulnaires supérieure et inférieure', 'Artère nourricière de l’humérus'],
    ends: ['Se divise au pli du coude, sous l’aponévrose bicipitale, en artères radiale et ulnaire'],
    note: 'Pouls brachial au pli du coude, en dedans du tendon du biceps : prise de la tension artérielle.',
  },
  'Artère profonde du bras': {
    what: 'Branche de la brachiale qui accompagne le nerf radial dans le sillon du nerf radial.',
    branches: ['Artère collatérale moyenne', 'Artère collatérale radiale'],
    supplies: ['Triceps, humérus'],
  },
  'Artère collatérale moyenne': { what: 'Branche terminale postérieure de la profonde du bras.', ends: ['Réseau articulaire du coude, avec la récurrente interosseuse'] },
  'Artère collatérale radiale': { what: 'Branche terminale antérieure de la profonde du bras, avec le nerf radial.', ends: ['S’anastomose avec la récurrente radiale'] },
  'Artère collatérale ulnaire supérieure': { what: 'Branche de la brachiale qui accompagne le nerf ulnaire.', ends: ['Réseau du coude, avec la récurrente ulnaire postérieure'] },
  'Artère collatérale ulnaire inférieure': { what: 'Branche de la brachiale au-dessus du coude.', ends: ['Réseau du coude, avec la récurrente ulnaire antérieure'] },
  'Artère radiale': {
    what: 'Branche de division latérale de la brachiale ; descend sous le brachio-radial puis traverse la tabatière anatomique.',
    branches: ['Artère récurrente radiale', 'Rameau carpien palmaire', 'Rameau palmaire superficiel', 'Artère principale du pouce'],
    ends: ['Forme l’arcade palmaire profonde'],
    note: 'Pouls radial en dehors du tendon du fléchisseur radial du carpe ; voie d’abord des coronarographies.',
  },
  'Rameau carpien palmaire de l’artère radiale': { what: 'Petite branche de la radiale au poignet.', ends: ['Réseau carpien palmaire'] },
  'Artère ulnaire': {
    what: 'Branche de division médiale de la brachiale, plus grosse ; passe sous le rond pronateur puis le long du nerf ulnaire et franchit le poignet par le canal ulnaire (de Guyon).',
    branches: ['Artères récurrentes ulnaires', 'Artère interosseuse commune', 'Rameaux carpiens', 'Rameau palmaire profond'],
    ends: ['Forme l’arcade palmaire superficielle'],
  },
  'Artère récurrente ulnaire': { what: 'Branches antérieure et postérieure de l’ulnaire qui remontent autour de l’épicondyle médial.', ends: ['Réseau articulaire du coude'] },
  'Rameau carpien dorsal de l’artère ulnaire': { what: 'Branche de l’ulnaire qui contourne le poignet en dedans.', ends: ['Réseau carpien dorsal'] },
  'Artère interosseuse commune': {
    what: 'Branche courte de l’ulnaire.', branches: ['Artère interosseuse antérieure', 'Artère interosseuse postérieure'],
  },
  'Artère interosseuse postérieure': {
    what: 'Passe au-dessus de la membrane interosseuse vers la loge postérieure, avec le nerf interosseux postérieur.',
    branches: ['Artère interosseuse récurrente'], supplies: ['Muscles extenseurs de l’avant-bras'],
  },
  'Artère interosseuse récurrente': { what: 'Branche de l’interosseuse postérieure qui remonte vers l’épicondyle latéral.', ends: ['Réseau articulaire du coude'] },
  'Réseau carpien dorsal': {
    what: 'Réseau artériel du dos du carpe, formé par les rameaux carpiens dorsaux radial et ulnaire et les interosseuses.',
    branches: ['Artères métacarpiennes dorsales'],
  },
  'Arcade palmaire superficielle': {
    what: 'Arcade formée surtout par l’artère ulnaire, complétée par le rameau palmaire superficiel de la radiale, sous l’aponévrose palmaire.',
    branches: ['Artères digitales palmaires communes'],
    note: 'Sa convexité est au niveau du pli de flexion transversal proximal de la paume (ligne de Kaplan).',
  },
  'Arcade palmaire profonde': {
    what: 'Arcade formée surtout par l’artère radiale, complétée par le rameau palmaire profond de l’ulnaire ; sur les bases des métacarpiens, avec la branche profonde du nerf ulnaire.',
    branches: ['Artères métacarpiennes palmaires', 'Rameaux perforants'],
    note: 'Elle est environ un travers de doigt plus proximale que l’arcade superficielle.',
  },
  'Artères métacarpiennes palmaires': { what: 'Branches de l’arcade palmaire profonde.', ends: ['Rejoignent les digitales palmaires communes'] },
  'Artères métacarpiennes dorsales': { what: 'Branches du réseau carpien dorsal.', branches: ['Artères digitales dorsales'] },
  'Artères digitales palmaires communes': { what: 'Branches de l’arcade palmaire superficielle, dans les espaces interdigitaux.', branches: ['Artères digitales palmaires propres'] },
  'Artères digitales palmaires propres': { what: 'Artères des bords des doigts, côté palmaire, avec les nerfs digitaux.' },
  'Artères digitales dorsales de la main': { what: 'Artères du dos des doigts, jusqu’à la phalange moyenne.' },

  // ----------------------------------------------------------- cou, épaule
  'Tronc thyro-cervical': {
    what: 'Branche de la face antérieure de la subclavière (1re portion), au bord médial du scalène antérieur.',
    branches: ['Artère thyroïdienne inférieure', 'Artère cervicale ascendante', 'Artère suprascapulaire', 'Artère transverse du cou (souvent)'],
  },
  'Artère thyroïdienne inférieure': {
    what: 'Branche du tronc thyro-cervical ; monte puis s’incurve en dedans derrière la gaine carotidienne vers le pôle inférieur de la thyroïde.',
    branches: ['Artère laryngée inférieure', 'Rameaux glandulaires', 'Artère cervicale ascendante (parfois)'],
    supplies: ['Thyroïde, glandes parathyroïdes', 'Larynx, trachée, œsophage'],
    near: ['Croise le nerf laryngé récurrent près de la thyroïde : danger de la thyroïdectomie'],
  },
  'Artère suprascapulaire': {
    what: 'Branche du tronc thyro-cervical qui passe AU-DESSUS du ligament transverse supérieur de la scapula (le nerf passe dessous).',
    supplies: ['Muscles supra- et infra-épineux'],
  },
  'Artère transverse du cou': {
    what: 'Branche du tronc thyro-cervical ou de la subclavière, qui croise le triangle postérieur du cou.',
    branches: ['Branche superficielle', 'Branche profonde (artère dorsale de la scapula)'],
  },
  'Branche superficielle de l’artère transverse du cou': { what: 'Rameau qui passe sous le trapèze.', supplies: ['Trapèze'] },
  'Branche profonde de l’artère transverse du cou': {
    what: 'Artère dorsale de la scapula : descend le long du bord médial de la scapula.', supplies: ['Muscles rhomboïdes, élévateur de la scapula'],
  },
  'Tronc costo-cervical': {
    what: 'Branche de la face postérieure de la subclavière (2e portion, derrière le scalène antérieur).',
    branches: ['Artère cervicale profonde', 'Artère intercostale suprême'],
  },
  'Artère cervicale profonde': { what: 'Branche du tronc costo-cervical qui monte dans la nuque.', supplies: ['Muscles profonds de la nuque'] },
  'Artère intercostale suprême': { what: 'Branche du tronc costo-cervical qui descend devant les cols des deux premières côtes.', branches: ['1re et 2e artères intercostales postérieures'] },
  'Première artère intercostale postérieure': { what: 'Née de l’artère intercostale suprême.', supplies: ['1er espace intercostal'] },
  'Deuxième artère intercostale postérieure': { what: 'Née de l’artère intercostale suprême.', supplies: ['2e espace intercostal'] },
  'Artères intercostales postérieures': {
    what: 'Neuf paires (3e à 11e espaces) nées de l’aorte thoracique ; courent dans le sillon costal avec la veine et le nerf (VAN de haut en bas).',
    branches: ['Rameau dorsal (muscles du dos, moelle)', 'Rameaux collatéral et cutané latéral'],
    note: 'Ponction pleurale au bord supérieur de la côte inférieure, pour éviter le paquet.',
  },
  'Artère thoracique interne': {
    what: 'Artère mammaire interne : branche de la face inférieure de la subclavière ; descend derrière les cartilages costaux, à 1 cm du bord du sternum.',
    branches: ['Artère péricardiaco-phrénique', 'Artères intercostales antérieures', 'Rameaux perforants (glande mammaire)'],
    ends: ['Se divise au 6e espace en artère musculophrénique et artère épigastrique supérieure'],
    note: 'Greffon de choix des pontages aorto-coronariens.',
  },

  // -------------------------------------------------------------- cœur, poumon
  'Artère coronaire': {
    what: 'Artères coronaires droite et gauche, nées des sinus aortiques juste au-dessus de la valve aortique ; elles cheminent dans les sillons du cœur.',
    branches: ['Coronaire gauche : interventriculaire antérieure et circonflexe', 'Coronaire droite : marginale droite, interventriculaire postérieure (chez 70 %)', 'Artères du nœud sinusal et du nœud atrio-ventriculaire'],
    supplies: ['Le myocarde'],
    note: 'Le cœur est irrigué en diastole ; l’occlusion d’une coronaire donne l’infarctus du territoire correspondant.',
  },
  'Rameau inféro-latéral de l’artère coronaire droite': { what: 'Branche marginale droite du bord inférieur du cœur.', supplies: ['Paroi du ventricule droit'] },
  'Rameaux septaux de l’artère interventriculaire antérieure': {
    what: 'Branches perforantes qui plongent dans le septum interventriculaire.', supplies: ['Deux tiers antérieurs du septum, faisceau de His et ses branches'],
  },
  'Bifurcation du tronc pulmonaire': {
    what: 'Division du tronc pulmonaire, sous l’arc aortique, en artères pulmonaires droite et gauche (niveau T5).',
    near: ['Ligament artériel (reste du conduit artériel) entre elle et l’arc aortique ; le nerf laryngé récurrent gauche le contourne'],
  },
  'Artère pulmonaire droite': {
    what: 'Plus longue que la gauche ; passe sous l’arc aortique et derrière l’aorte ascendante et la veine cave supérieure vers le hile droit.',
    branches: ['Tronc antérieur (lobe supérieur)', 'Artères des lobes moyen et inférieur'],
  },
  'Artère pulmonaire gauche': {
    what: 'Courte, passe en avant de l’aorte descendante, au-dessus de la bronche principale gauche, vers le hile gauche.',
    branches: ['Artères lobaires supérieure (et lingulaire) et inférieure'],
  },
  'Artère lobaire supérieure du poumon droit': { what: 'Tronc antérieur de l’artère pulmonaire droite.', supplies: ['Lobe supérieur droit'] },
  'Artère lobaire moyenne du poumon droit': { what: 'Branche de l’artère pulmonaire droite.', supplies: ['Lobe moyen (segments latéral et médial)'] },
  'Artère lobaire inférieure du poumon droit': { what: 'Suite de l’artère pulmonaire droite après la lobaire moyenne.', supplies: ['Lobe inférieur droit'] },
  'Artère lingulaire supérieure du poumon gauche': seg('lobe supérieur', 'gauche', 'lingula, segment supérieur'),
  'Artère lingulaire inférieure du poumon gauche': seg('lobe supérieur', 'gauche', 'lingula, segment inférieur'),
  'Artère segmentaire apicale du poumon droit': seg('lobe supérieur', 'droit', 'segment I'),
  'Artère segmentaire postérieure du poumon droit': seg('lobe supérieur', 'droit', 'segment II'),
  'Artère segmentaire antérieure du poumon droit': seg('lobe supérieur', 'droit', 'segment III'),
  'Artère segmentaire latérale du poumon droit': seg('lobe moyen', 'droit', 'segment IV'),
  'Artère segmentaire médiale du poumon droit': seg('lobe moyen', 'droit', 'segment V'),
  'Artère segmentaire supérieure du poumon droit': seg('lobe inférieur', 'droit', 'segment VI'),
  'Artère segmentaire basale médiale du poumon droit': seg('lobe inférieur', 'droit', 'segment VII'),
  'Artère segmentaire basale antérieure du poumon droit': seg('lobe inférieur', 'droit', 'segment VIII'),
  'Artère segmentaire basale latérale du poumon droit': seg('lobe inférieur', 'droit', 'segment IX'),
  'Artère segmentaire basale postérieure du poumon droit': seg('lobe inférieur', 'droit', 'segment X'),
  'Artère segmentaire apicale du poumon gauche': seg('lobe supérieur', 'gauche', 'segment apico-postérieur I+II'),
  'Artère segmentaire postérieure du poumon gauche': seg('lobe supérieur', 'gauche', 'segment apico-postérieur'),
  'Artère segmentaire antérieure du poumon gauche': seg('lobe supérieur', 'gauche', 'segment III'),
  'Artère segmentaire supérieure du poumon gauche': seg('lobe inférieur', 'gauche', 'segment VI'),
  'Artère segmentaire basale médiale du poumon gauche': seg('lobe inférieur', 'gauche', 'segment VII, souvent fusionné avec le VIII'),
  'Artère segmentaire basale antérieure du poumon gauche': seg('lobe inférieur', 'gauche', 'segment VIII'),
  'Artère segmentaire basale latérale du poumon gauche': seg('lobe inférieur', 'gauche', 'segment IX'),
  'Artère segmentaire basale postérieure du poumon gauche': seg('lobe inférieur', 'gauche', 'segment X'),

  // ------------------------------------------------------------- tête : face
  'Artère transverse de la face': {
    what: 'Branche de la temporale superficielle, dans la loge parotidienne ; croise le masséter au-dessus du conduit parotidien.',
    supplies: ['Glande parotide, masséter, peau de la joue'],
  },
  'Branche frontale de l’artère temporale superficielle': {
    what: 'Branche terminale antérieure de la temporale superficielle, visible sur la tempe (sinueuse chez le sujet âgé).',
    supplies: ['Cuir chevelu et muscles de la région frontale'],
    note: 'Biopsiée dans la maladie de Horton.',
  },
  'Artère labiale supérieure': { what: 'Branche de l’artère faciale, dans la lèvre supérieure entre muscle et muqueuse.', supplies: ['Lèvre supérieure, septum nasal'] },
  'Artère labiale inférieure': { what: 'Branche de l’artère faciale, dans la lèvre inférieure.', supplies: ['Lèvre inférieure'] },
  'Artère angulaire': {
    what: 'Terminaison de l’artère faciale à l’angle médial de l’œil.', ends: ['S’anastomose avec l’artère dorsale du nez (ophtalmique) : anastomose entre carotides externe et interne'],
  },
  'Artère submentonnière': { what: 'Branche cervicale de l’artère faciale, sous le muscle mylo-hyoïdien.', supplies: ['Glande submandibulaire, plancher de la bouche, menton'] },
  'Artère buccale': { what: 'Branche de l’artère maxillaire (2e portion), avec le nerf buccal.', supplies: ['Muscle buccinateur, muqueuse de la joue'] },
  'Artère alvéolaire supéro-postérieure': { what: 'Branche de l’artère maxillaire (3e portion) qui pénètre la tubérosité du maxillaire.', supplies: ['Molaires et prémolaires supérieures, sinus maxillaire, gencive'] },
  'Artère infra-orbitaire': {
    what: 'Branche de l’artère maxillaire (3e portion) ; traverse la fissure orbitaire inférieure, le sillon puis le canal infra-orbitaire et sort par le foramen infra-orbitaire.',
    branches: ['Artères alvéolaires supéro-antérieures'], supplies: ['Dents antérieures supérieures, paupière inférieure, joue'],
  },
  'Artère palatine descendante': {
    what: 'Branche de l’artère maxillaire dans la fosse ptérygo-palatine, qui descend dans le canal grand palatin.',
    branches: ['Artère grande palatine', 'Artères petites palatines'],
  },
  'Artère grande palatine': {
    what: 'Branche de la palatine descendante, sortie par le foramen grand palatin ; chemine vers l’avant sous le palais dur.',
    supplies: ['Palais dur, gencive palatine'],
    ends: ['Remonte par le canal incisif à la rencontre de la sphéno-palatine'],
  },
  'Artère du canal ptérygoïdien': { what: 'Petite branche de l’artère maxillaire, dans le canal ptérygoïdien.', supplies: ['Partie supérieure du pharynx, trompe auditive'] },
  'Rameaux nasaux postéro-latéraux de l’artère sphéno-palatine': { what: 'Branches de la sphéno-palatine sur la paroi latérale des fosses nasales.', supplies: ['Cornets et méats'] },
  'Rameaux septaux postérieurs de l’artère sphéno-palatine': {
    what: 'Branches de la sphéno-palatine sur le septum nasal.',
    note: 'Elles participent à la tache vasculaire (de Kiesselbach) du septum antérieur, siège des épistaxis.',
  },
  'Rameaux septaux antérieurs de l’artère ethmoïdale antérieure': { what: 'Branches de l’ethmoïdale antérieure sur le septum.', ends: ['Tache vasculaire du septum'] },
  'Rameaux septaux de l’artère ethmoïdale postérieure': { what: 'Branches de l’ethmoïdale postérieure sur la partie haute du septum.' },
  'Artère ethmoïdale antérieure': {
    what: 'Branche de l’ophtalmique (carotide interne) qui traverse le foramen ethmoïdal antérieur.',
    supplies: ['Cellules ethmoïdales antérieures, sinus frontal, fosses nasales, dure-mère de la fosse crânienne antérieure'],
  },
  'Artère ethmoïdale postérieure': { what: 'Branche de l’ophtalmique par le foramen ethmoïdal postérieur.', supplies: ['Cellules ethmoïdales postérieures, partie haute des fosses nasales'] },
  'Rameau mentonnier de l’artère alvéolaire inférieure': { what: 'Branche terminale de l’alvéolaire inférieure, sortie par le foramen mentonnier.', supplies: ['Menton, lèvre inférieure'] },
  'Rameau mylo-hyoïdien de l’artère alvéolaire inférieure': { what: 'Branche de l’alvéolaire inférieure avant son entrée dans le canal mandibulaire, avec le nerf mylo-hyoïdien.', supplies: ['Muscle mylo-hyoïdien'] },
  'Artère temporale profonde antérieure': { what: 'Branche de l’artère maxillaire (2e portion), sous le muscle temporal.', supplies: ['Muscle temporal (partie antérieure)'] },
  'Artère temporale profonde postérieure': { what: 'Branche de l’artère maxillaire, sous le muscle temporal.', supplies: ['Muscle temporal (partie postérieure)'] },
  'Rameau accessoire de l’artère méningée moyenne': {
    what: 'Petite branche de la méningée moyenne (ou de la maxillaire) qui entre dans le crâne par le foramen ovale.', supplies: ['Ganglion trigéminal, dure-mère'],
  },
  'Artère supra-orbitaire': {
    what: 'Branche de l’ophtalmique qui sort de l’orbite par l’incisure (ou le foramen) supra-orbitaire avec le nerf du même nom.',
    supplies: ['Front et cuir chevelu', 'Paupière supérieure'],
  },
  'Artère supratrochléaire': { what: 'Branche terminale de l’ophtalmique, au-dessus de la trochlée.', supplies: ['Partie médiale du front'] },
  'Artère lacrymale': { what: 'Branche de l’ophtalmique le long du bord supérieur du droit latéral.', supplies: ['Glande lacrymale, paupières, conjonctive'] },
  'Artère centrale de la rétine': {
    what: 'Branche de l’ophtalmique qui pénètre le nerf optique à 1 cm en arrière du globe et en émerge à la papille.',
    supplies: ['Couches internes de la rétine'],
    note: 'Artère terminale : son occlusion donne une cécité brutale et définitive de l’œil.',
  },
  'Artères ciliaires postérieures courtes': { what: 'Une vingtaine de branches de l’ophtalmique qui perforent la sclère autour du nerf optique.', supplies: ['Choroïde, couches externes de la rétine'] },
  'Artères ciliaires postérieures longues': { what: 'Deux branches de l’ophtalmique qui cheminent entre sclère et choroïde jusqu’au corps ciliaire.', supplies: ['Corps ciliaire, iris (grand cercle artériel de l’iris)'] },

  // ------------------------------------------------------------ encéphale
  'Artère spinale': {
    what: 'Artère spinale antérieure : née des deux artères vertébrales, qui s’unissent en un tronc unique descendant dans la fissure médiane antérieure de la moelle.',
    supplies: ['Deux tiers antérieurs de la moelle spinale'],
    note: 'Renforcée par les artères radiculo-médullaires, dont la grande (d’Adamkiewicz) vers T9–L2.',
  },
  'Artère cérébelleuse inféro-postérieure': {
    what: 'PICA : branche de l’artère vertébrale, qui contourne le bulbe.',
    supplies: ['Face inférieure du cervelet', 'Partie latérale du bulbe'],
    note: 'Son occlusion donne le syndrome de Wallenberg (bulbe latéral).',
  },
  'Artère cérébelleuse antéro-inférieure': {
    what: 'AICA : branche de la partie basse du tronc basilaire.',
    branches: ['Artère labyrinthique (souvent)'], supplies: ['Face antéro-inférieure du cervelet', 'Pont (partie latérale)'],
  },
  'Artère cérébelleuse supérieure': {
    what: 'Branche terminale du tronc basilaire, juste sous les cérébrales postérieures.',
    supplies: ['Face supérieure du cervelet, mésencéphale'],
    near: ['Le nerf oculomoteur (III) passe entre elle et l’artère cérébrale postérieure'],
  },
  'Rameaux pontiques médiaux de l’artère basilaire': { what: 'Branches paramédianes du tronc basilaire.', supplies: ['Partie médiale du pont (voies motrices)'] },
  'Rameaux pontiques latéraux de l’artère basilaire': { what: 'Branches circonférentielles courtes du tronc basilaire.', supplies: ['Parties latérales du pont'] },
  'Artère péricalleuse': {
    what: 'Suite de l’artère cérébrale antérieure au-dessus du corps calleux.',
    supplies: ['Corps calleux', 'Face médiale du lobe pariétal (précunéus)'],
  },
  'Artère calloso-marginale': {
    what: 'Branche de la cérébrale antérieure dans le sillon cingulaire.',
    branches: ['Rameaux frontaux'], supplies: ['Gyrus frontal médial et lobule paracentral (membre inférieur)'],
    note: 'Un infarctus du territoire de la cérébrale antérieure paralyse surtout le membre inférieur controlatéral.',
  },
  'Rameaux frontaux de l’artère calloso-marginale': { what: 'Branches antérieures, moyennes et postérieures vers le gyrus frontal supérieur.', supplies: ['Face médiale du lobe frontal'] },
  'Rameaux orbito-frontaux de l’artère cérébrale antérieure': { what: 'Premières branches corticales de la cérébrale antérieure.', supplies: ['Face orbitaire du lobe frontal, gyrus rectus'] },
  'Rameaux insulaires de l’artère cérébrale moyenne (M2)': {
    what: 'Segment M2 : branches de la cérébrale moyenne à la surface de l’insula.', supplies: ['Insula'],
  },
  'Artère cérébrale moyenne (segment M3)': {
    what: 'Segment operculaire de la cérébrale moyenne, qui sort du sillon latéral.',
    note: 'L’artère cérébrale moyenne irrigue la face latérale de l’hémisphère : face et membre supérieur (aires motrices et sensitives), langage dans l’hémisphère dominant.',
  },
  'Artères striées latérales proximales': {
    what: 'Branches perforantes du segment M1 de la cérébrale moyenne (artères lenticulo-striées).',
    supplies: ['Noyau lenticulaire, caudé, capsule interne'],
    note: 'Fragiles, elles se rompent dans l’hémorragie hypertensive (« artère de l’hémorragie cérébrale » de Charcot).',
  },
  'Artères striées latérales distales': { what: 'Perforantes plus latérales de la cérébrale moyenne.', supplies: ['Putamen, capsule interne et externe'] },
  'Rameaux pariétaux de l’artère cérébrale moyenne': { what: 'Branches corticales vers le lobe pariétal.', supplies: ['Lobe pariétal, face latérale'] },
  'Rameaux temporaux de l’artère cérébrale moyenne': { what: 'Branches corticales vers le lobe temporal.', supplies: ['Gyrus temporaux, aire de Wernicke (hémisphère dominant)'] },
  'Rameau temporal antérieur': { what: 'Branche de la cérébrale moyenne vers le pôle et le gyrus temporal supérieur.' },
  'Rameau temporal postérieur': { what: 'Branche de la cérébrale moyenne vers la partie postérieure du lobe temporal.' },
  'Rameau temporo-occipital': { what: 'Branche de la cérébrale moyenne vers la jonction temporo-occipitale.' },
  'Rameau du gyrus angulaire': { what: 'Branche terminale de la cérébrale moyenne.', supplies: ['Gyrus angulaire (lecture, écriture)'] },
  'Rameau artériel postcentral': { what: 'Branche de la cérébrale moyenne dans le sillon postcentral.', supplies: ['Gyrus postcentral (aire somesthésique)'] },
  'Artère préfrontale': { what: 'Branche de la cérébrale moyenne.', supplies: ['Gyrus frontaux moyen et inférieur (aire de Broca dans l’hémisphère dominant)'] },
  'Artère fronto-basale latérale': { what: 'Branche de la cérébrale moyenne vers la face orbitaire du lobe frontal.' },
  'Artère pariétale postérieure': { what: 'Branche de la cérébrale moyenne.', supplies: ['Lobule pariétal inférieur, gyrus supramarginal'] },
  'Artère pariéto-occipitale': { what: 'Branche de la cérébrale postérieure dans le sillon pariéto-occipital.', supplies: ['Cunéus, précunéus'] },
  'Artère occipitale médiale': {
    what: 'Branche terminale de la cérébrale postérieure.', branches: ['Artère calcarine', 'Artère pariéto-occipitale'],
    supplies: ['Cortex visuel (sillon calcarin)'],
    note: 'Son occlusion donne une hémianopsie latérale homonyme controlatérale.',
  },
  'Artère occipitale latérale': { what: 'Branche terminale de la cérébrale postérieure.', supplies: ['Face inférieure du lobe temporal et occipital'] },
};
