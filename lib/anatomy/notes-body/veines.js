// The veins the whole body shows and no regional model described.
// Origin, course, tributaries, where it ends.

const pv = (lobe, where) => ({
  what: `Veine pulmonaire segmentaire du ${lobe}${where ? ` (${where})` : ''} ; ramène le sang oxygéné vers les veines pulmonaires et l’atrium gauche.`,
  note: 'Les veines pulmonaires sont intersegmentaires : elles courent entre les segments, pas avec les bronches.',
});
const comitant = (art, where) => ({
  what: `Veines satellites, en général doubles, de l’artère ${art}${where ? `, ${where}` : ''}.`,
  note: 'Au membre, les veines profondes sont doublées autour de l’artère et reliées par des anastomoses en échelle.',
});

export const VEIN_NOTES = {
  // ------------------------------------------------------------- tronc
  'Veine cave inférieure (partie abdominale)': {
    what: 'Formée devant L5 par l’union des deux veines iliaques communes ; monte à droite de l’aorte, derrière le foie, et traverse le diaphragme au foramen de la veine cave (T8).',
    tributaries: ['Veines lombales (3e et 4e)', 'Veine testiculaire ou ovarique droite', 'Veines rénales', 'Veine surrénale droite', 'Veines phréniques inférieures', 'Veines hépatiques'],
    ends: ['Atrium droit'],
    note: 'La veine gonadique gauche, elle, se jette dans la veine rénale gauche.',
  },
  'Veines hépatiques': {
    what: 'Trois veines (droite, intermédiaire, gauche) qui drainent le foie et se jettent dans la veine cave inférieure juste sous le diaphragme.',
    note: 'Elles courent entre les segments du foie et servent de repère à la segmentation de Couinaud ; leur thrombose : syndrome de Budd-Chiari.',
  },
  'Veine porte hépatique': {
    what: 'Formée derrière le col du pancréas par l’union de la veine mésentérique supérieure et de la veine splénique ; monte dans le ligament hépato-duodénal, en arrière de l’artère hépatique et du cholédoque.',
    tributaries: ['Veine splénique (avec la mésentérique inférieure)', 'Veine mésentérique supérieure', 'Veines gastriques gauche et droite', 'Veine cystique', 'Veines para-ombilicales'],
    ends: ['Se divise au hile en branches droite et gauche, puis en capillaires sinusoïdes du foie'],
    note: 'Elle apporte 75 % du sang du foie. Anastomoses porto-caves (œsophage, rectum, ombilic) : varices en cas d’hypertension portale.',
  },
  'Veine splénique': {
    what: 'Naît au hile de la rate et suit la face postérieure du pancréas.',
    tributaries: ['Veines gastriques courtes', 'Veine gastro-omentale gauche', 'Veines pancréatiques', 'Veine mésentérique inférieure (le plus souvent)'],
    ends: ['S’unit à la mésentérique supérieure derrière le col du pancréas pour former la veine porte'],
  },
  'Veine mésentérique supérieure': {
    what: 'Satellite de l’artère mésentérique supérieure, à sa droite, dans la racine du mésentère.',
    tributaries: ['Veines jéjunales et iléales', 'Veine iléo-colique', 'Veines coliques droite et moyenne', 'Veine gastro-omentale droite', 'Veines pancréatico-duodénales'],
    ends: ['Forme la veine porte avec la veine splénique'],
  },
  'Veine mésentérique inférieure': {
    what: 'Satellite à distance de l’artère mésentérique inférieure ; monte à gauche du 4e duodénum, près de l’angle duodéno-jéjunal.',
    tributaries: ['Veine rectale supérieure', 'Veines sigmoïdiennes', 'Veine colique gauche'],
    ends: ['Veine splénique (le plus souvent), ou confluent spléno-mésaraïque'],
  },
  'Veine colique droite': { what: 'Draine le côlon ascendant.', ends: ['Veine mésentérique supérieure'] },
  'Veine colique moyenne': { what: 'Draine le côlon transverse, dans le mésocôlon transverse.', ends: ['Veine mésentérique supérieure'] },
  'Veines sigmoïdiennes': { what: 'Drainent le côlon sigmoïde.', ends: ['Veine mésentérique inférieure'] },
  'Veine gastro-omentale droite': { what: 'Suit la grande courbure de l’estomac de gauche à droite.', ends: ['Veine mésentérique supérieure'] },
  'Veine gastro-omentale gauche': { what: 'Suit la grande courbure de l’estomac vers la rate.', ends: ['Veine splénique'] },
  'Veine rénale droite': { what: 'Courte (2 à 4 cm), sort du hile en avant de l’artère.', ends: ['Veine cave inférieure'] },
  'Veine rénale gauche': {
    what: 'Longue (7 cm) ; passe en avant de l’aorte, juste sous l’origine de l’artère mésentérique supérieure.',
    tributaries: ['Veine surrénale gauche', 'Veine testiculaire ou ovarique gauche', 'Veine phrénique inférieure gauche'],
    ends: ['Veine cave inférieure'],
    note: 'Sa compression entre aorte et mésentérique supérieure : syndrome du casse-noisette ; explique la varicocèle gauche plus fréquente.',
  },
  'Veines intrarénales du rein droit': { what: 'Veines interlobulaires, arquées et interlobaires du rein droit, satellites des artères mais largement anastomosées.' },
  'Veines intrarénales du rein gauche': { what: 'Veines interlobulaires, arquées et interlobaires du rein gauche ; contrairement aux artères, elles ne sont pas terminales.' },
  'Veine testiculaire droite': {
    what: 'Naît du plexus pampiniforme dans le cordon spermatique ; monte devant le psoas.', ends: ['Veine cave inférieure, à angle aigu'],
  },
  'Veine testiculaire gauche': {
    what: 'Naît du plexus pampiniforme, monte à gauche.', ends: ['Veine rénale gauche, à angle droit'],
    note: 'Ce drainage à angle droit, plus long, explique que la varicocèle est surtout gauche.',
  },
  'Veine iliaque commune': {
    what: 'Union des veines iliaques externe et interne devant l’articulation sacro-iliaque.',
    ends: ['Les deux veines s’unissent devant L5, à droite de l’aorte, pour former la veine cave inférieure'],
    note: 'L’artère iliaque commune droite croise la veine iliaque commune gauche : syndrome de May-Thurner (thromboses du membre gauche).',
  },
  'Veine iliaque externe': { what: 'Suite de la veine fémorale sous le ligament inguinal, en dedans de l’artère.', tributaries: ['Veine épigastrique inférieure', 'Veine circonflexe iliaque profonde'], ends: ['Veine iliaque commune'] },
  'Veine iliaque interne': {
    what: 'Draine le bassin ; ses affluents correspondent aux branches de l’artère, sauf l’ombilicale et l’ilio-lombale.',
    tributaries: ['Veines glutéales, obturatrices, sacrales latérales', 'Plexus veineux vésical, rectal, utérin et vaginal', 'Veine pudendale interne'],
    ends: ['Veine iliaque commune'],
  },
  'Veine ilio-lombale': { what: 'Satellite de l’artère ilio-lombale.', ends: ['Veine iliaque commune ou interne'] },
  'Veines lombales': { what: 'Quatre ou cinq paires satellites des artères lombales, unies par la veine lombale ascendante.', ends: ['Veine cave inférieure (3e et 4e), veine lombale ascendante'] },
  'Veine lombale ascendante droite': {
    what: 'Veine verticale devant les processus transverses lombaux, qui relie les veines lombales.', ends: ['Se continue au thorax par la veine azygos'],
  },
  'Veine lombale ascendante gauche': { what: 'Veine verticale reliant les veines lombales gauches.', ends: ['Se continue par la veine hémi-azygos'] },
  'Veine subcostale droite': { what: 'Satellite de l’artère subcostale.', ends: ['Rejoint la lombale ascendante pour former l’azygos'] },
  'Veine subcostale gauche': { what: 'Satellite de l’artère subcostale gauche.', ends: ['Contribue à former l’hémi-azygos'] },
  'Veine phrénique supérieure droite': { what: 'Draine la face supérieure du diaphragme.', ends: ['Veine azygos'] },
  'Veine épigastrique inférieure': {
    what: 'Satellite de l’artère épigastrique inférieure, à la face profonde du muscle droit.', ends: ['Veine iliaque externe'],
    note: 'Anastomosée avec l’épigastrique supérieure : voie de suppléance cave-cave.',
  },
  'Veine épigastrique superficielle': {
    what: 'Veine sous-cutanée de la paroi abdominale inférieure.', ends: ['Grande veine saphène'],
    note: 'Dilatée en « tête de méduse » autour de l’ombilic dans l’hypertension portale.',
  },
  'Veines épigastriques supérieures': { what: 'Satellites de l’artère épigastrique supérieure.', ends: ['Veines thoraciques internes'] },
  'Veines musculo-phréniques': { what: 'Satellites des artères musculo-phréniques.', ends: ['Veines thoraciques internes'] },
  'Veines thoraciques internes': { what: 'Satellites de l’artère thoracique interne.', ends: ['Veines brachio-céphaliques'] },
  'Veine azygos': {
    what: 'Naît de l’union de la veine lombale ascendante et de la subcostale droites ; monte dans le médiastin postérieur à droite de l’aorte.',
    tributaries: ['Veines intercostales postérieures droites (4e à 11e)', 'Veine intercostale supérieure droite', 'Veines hémi-azygos et hémi-azygos accessoire', 'Veines œsophagiennes, bronchiques, péricardiques'],
    ends: ['Crosse au-dessus de la bronche principale droite, dans la veine cave supérieure (T4)'],
    note: 'Voie de suppléance cave inférieure → cave supérieure.',
  },
  'Veine hémi-azygos': { what: 'Équivalent gauche de l’azygos, née de la lombale ascendante et de la subcostale gauches.', tributaries: ['Veines intercostales postérieures 9 à 11 gauches'], ends: ['Croise le rachis vers T8–T9 pour se jeter dans l’azygos'] },
  'Veine hémi-azygos accessoire': { what: 'Draine les espaces intercostaux gauches 4 à 8.', ends: ['Veine azygos (vers T7–T8) ou veine hémi-azygos'] },
  'Veine intercostale supérieure droite': { what: 'Union des veines des espaces 2 à 4 droits.', ends: ['Veine azygos'] },
  'Veine intercostale supérieure gauche': {
    what: 'Union des veines des espaces 2 à 4 gauches ; croise l’arc aortique.', ends: ['Veine brachio-céphalique gauche'],
  },

  // ----------------------------------------------------------- bassin, périnée
  'Veine pudendale interne': { what: 'Satellite de l’artère pudendale interne, dans le canal pudendal.', ends: ['Veine iliaque interne'] },
  'Veine dorsale profonde du pénis': {
    what: 'Veine impaire médiane sous le fascia profond du pénis, entre les deux artères dorsales.',
    ends: ['Passe sous la symphyse et rejoint le plexus veineux prostatique'],
  },
  'Veines dorsales superficielles du pénis': { what: 'Veines sous-cutanées du dos du pénis.', ends: ['Veines pudendales externes, puis grande saphène'] },
  'Veines pudendales externes': { what: 'Drainent la peau du pubis et des organes génitaux externes.', ends: ['Grande veine saphène'] },
  'Veines glutéales supérieures': { what: 'Satellites de l’artère glutéale supérieure.', ends: ['Veine iliaque interne'] },
  'Veines glutéales inférieures': { what: 'Satellites de l’artère glutéale inférieure.', ends: ['Veine iliaque interne'] },
  'Veines sacrales latérales': { what: 'Satellites des artères sacrales latérales, en avant du sacrum.', ends: ['Veine iliaque interne'] },
  'Veines circonflexes fémorales médiales': comitant('circonflexe fémorale médiale', 'autour du col du fémur'),
  'Veines circonflexes fémorales latérales': comitant('circonflexe fémorale latérale'),

  // -------------------------------------------------------- membre inférieur
  'Grande veine saphène': {
    what: 'Plus longue veine du corps, superficielle ; naît de l’arcade veineuse dorsale du pied, passe DEVANT la malléole médiale et monte à la face médiale de la jambe et de la cuisse.',
    tributaries: ['Veines du réseau superficiel', 'Veines pudendales externes, épigastrique superficielle, circonflexe iliaque superficielle (à la crosse)'],
    ends: ['Crosse : traverse le hiatus saphène et se jette dans la veine fémorale, 3 cm sous le ligament inguinal'],
    near: ['Accompagnée du nerf saphène à la jambe'],
    note: 'Siège principal des varices ; prélevée pour les pontages.',
  },
  'Petite veine saphène': {
    what: 'Naît du bord latéral de l’arcade dorsale, passe DERRIÈRE la malléole latérale et monte au milieu du mollet.',
    ends: ['Veine poplitée, dans la fosse poplitée'],
    near: ['Accompagnée du nerf sural'],
  },
  'Arcade veineuse dorsale du pied': { what: 'Arcade superficielle du dos du pied.', ends: ['Se continue en grande saphène (en dedans) et petite saphène (en dehors)'] },
  'Arcade veineuse plantaire': { what: 'Arcade profonde de la plante, satellite de l’arcade artérielle.', ends: ['Veines plantaires médiales et latérales'] },
  'Veines digitales dorsales du pied': { what: 'Veines du dos des orteils.', ends: ['Arcade veineuse dorsale'] },
  'Veines digitales plantaires': { what: 'Veines des faces plantaires des orteils.', ends: ['Veines métatarsiennes plantaires'] },
  'Veines intercapitulaires du pied': { what: 'Anastomoses entre les réseaux plantaire et dorsal, entre les têtes des métatarsiens.' },
  'Veines métatarsiennes dorsales': { what: 'Veines des espaces intermétatarsiens, face dorsale.', ends: ['Arcade veineuse dorsale'] },
  'Veines métatarsiennes plantaires': { what: 'Veines des espaces intermétatarsiens, face plantaire.', ends: ['Arcade veineuse plantaire'] },
  'Veines plantaires médiales': comitant('plantaire médiale'),
  'Veines plantaires latérales': comitant('plantaire latérale'),
  'Veines tibiales antérieures': comitant('tibiale antérieure', 'dans la loge antérieure de la jambe'),
  'Veines tibiales postérieures': comitant('tibiale postérieure', 'derrière la malléole médiale'),
  'Veines fibulaires': comitant('fibulaire'),
  'Veines du genou': comitant('du genou', 'autour de l’articulation'),
  'Veine poplitée': {
    what: 'Formée par l’union des veines tibiales ; traverse la fosse poplitée entre l’artère (en avant) et le nerf tibial (en arrière).',
    tributaries: ['Petite veine saphène', 'Veines du genou, veines surales'],
    ends: ['Devient la veine fémorale au hiatus de l’adducteur'],
  },
  'Veine fémorale': {
    what: 'Suite de la poplitée ; monte avec l’artère, d’abord en arrière puis en dedans d’elle au trigone fémoral.',
    tributaries: ['Veine fémorale profonde', 'Grande veine saphène (crosse)'],
    ends: ['Devient la veine iliaque externe sous le ligament inguinal'],
    note: 'Ponction et cathétérisme en dedans du pouls fémoral.',
  },
  'Veine fémorale profonde': { what: 'Satellite de l’artère profonde de la cuisse.', ends: ['Veine fémorale'] },
  'Veines perforantes': {
    what: 'Veines qui traversent le fascia profond pour unir le réseau superficiel au réseau profond ; leurs valvules ne laissent passer le sang que vers la profondeur.',
    note: 'Leur incontinence est une cause de varices et d’ulcères de jambe.',
  },

  // -------------------------------------------------------- membre supérieur
  'Réseau veineux dorsal de la main': { what: 'Réseau superficiel du dos de la main.', ends: ['Veine céphalique (côté radial) et veine basilique (côté ulnaire)'] },
  'Veine céphalique': {
    what: 'Veine superficielle du bord radial ; monte au bord latéral du biceps puis dans le sillon delto-pectoral.',
    ends: ['Perfore le fascia clavi-pectoral et se jette dans la veine axillaire'],
  },
  'Veine basilique': {
    what: 'Veine superficielle du bord ulnaire ; perfore le fascia profond à mi-bras.',
    ends: ['S’unit aux veines brachiales pour former la veine axillaire, au bord inférieur du grand rond'],
  },
  'Veine médiane du coude': {
    what: 'Veine oblique du pli du coude reliant céphalique et basilique.',
    note: 'Site habituel des prises de sang ; l’aponévrose bicipitale la sépare de l’artère brachiale et du nerf médian.',
  },
  'Veine médiane de l’avant-bras': { what: 'Veine superficielle de la face antérieure de l’avant-bras.', ends: ['Veine médiane du coude ou basilique'] },
  'Arcade veineuse palmaire superficielle': { what: 'Satellite de l’arcade artérielle superficielle.', ends: ['Veines ulnaires'] },
  'Arcade veineuse palmaire profonde': { what: 'Satellite de l’arcade artérielle profonde.', ends: ['Veines radiales'] },
  'Veines digitales dorsales de la main': { what: 'Veines du dos des doigts.', ends: ['Réseau veineux dorsal de la main'] },
  'Veines digitales palmaires': { what: 'Veines de la face palmaire des doigts.', ends: ['Arcade veineuse palmaire superficielle'] },
  'Veines radiales': comitant('radiale'),
  'Veines ulnaires': comitant('ulnaire'),
  'Veines brachiales': { ...comitant('brachiale'), ends: ['Forment la veine axillaire avec la basilique'] },
  'Veine circonflexe humérale antérieure': { what: 'Satellite de l’artère du même nom.', ends: ['Veine axillaire'] },
  'Veine circonflexe humérale postérieure': { what: 'Satellite de l’artère du même nom, dans l’espace quadrangulaire.', ends: ['Veine axillaire'] },
  'Veine axillaire': {
    what: 'Suite de la veine basilique au bord inférieur du grand rond ; en dedans et en avant de l’artère axillaire.',
    tributaries: ['Veine céphalique', 'Veines satellites des branches de l’artère axillaire'],
    ends: ['Devient la veine subclavière au bord externe de la 1re côte'],
  },
  'Veine subscapulaire': { what: 'Satellite de l’artère subscapulaire.', ends: ['Veine axillaire'] },
  'Veine circonflexe de la scapula': { what: 'Satellite de l’artère circonflexe de la scapula.', ends: ['Veine subscapulaire'] },
  'Veine thoraco-dorsale': { what: 'Satellite de l’artère thoraco-dorsale.', ends: ['Veine subscapulaire'] },
  'Veine thoracique latérale': { what: 'Draine la paroi latérale du thorax et la partie latérale de la glande mammaire.', ends: ['Veine axillaire'] },
  'Veine suprascapulaire': { what: 'Satellite de l’artère suprascapulaire.', ends: ['Veine jugulaire externe ou subclavière'] },
  'Veine subclavière droite': {
    what: 'Suite de la veine axillaire ; passe EN AVANT du scalène antérieur (l’artère passe derrière).',
    tributaries: ['Veine jugulaire externe'],
    ends: ['S’unit à la jugulaire interne derrière l’articulation sterno-claviculaire : veine brachio-céphalique droite'],
    note: 'Au confluent droit se jette le conduit lymphatique droit.',
  },
  'Veine subclavière gauche': {
    what: 'Suite de la veine axillaire gauche, en avant du scalène antérieur.',
    ends: ['Forme avec la jugulaire interne la veine brachio-céphalique gauche'],
    note: 'Au confluent veineux jugulo-subclavier gauche se jette le conduit thoracique.',
  },

  // -------------------------------------------------------------- tête et cou
  'Veine vertébrale': { what: 'Plexus puis veine qui descend avec l’artère vertébrale dans les foramens transversaires.', ends: ['Veine brachio-céphalique'] },
  'Veine occipitale': { what: 'Draine la région occipitale du cuir chevelu.', ends: ['Plexus sous-occipital, veine jugulaire externe ou interne'] },
  'Veine auriculaire postérieure': { what: 'Draine la région derrière l’auricule.', ends: ['S’unit à la branche postérieure de la rétromandibulaire pour former la jugulaire externe'] },
  'Veines temporales superficielles': { what: 'Drainent le cuir chevelu de la région temporale.', ends: ['Forment avec la veine maxillaire la veine rétromandibulaire, dans la parotide'] },
  'Veines maxillaires': { what: 'Courtes veines qui drainent le plexus ptérygoïdien.', ends: ['Veine rétromandibulaire'] },
  'Branche antérieure de la veine rétromandibulaire': { what: 'Branche de division de la rétromandibulaire.', ends: ['S’unit à la veine faciale (tronc thyro-linguo-facial)'] },
  'Branche postérieure de la veine rétromandibulaire': { what: 'Branche de division de la rétromandibulaire.', ends: ['Forme la jugulaire externe avec l’auriculaire postérieure'] },
  'Tronc thyro-linguo-facial (veine faciale commune)': {
    what: 'Tronc formé par les veines faciale, linguale et thyroïdienne supérieure, sous l’angle de la mandibule.',
    ends: ['Veine jugulaire interne'],
    note: 'Repère de la bifurcation carotidienne, juste en arrière de lui.',
  },
  'Veine angulaire': {
    what: 'Origine de la veine faciale à l’angle médial de l’œil.',
    ends: ['Communique avec la veine ophtalmique supérieure : voie vers le sinus caverneux'],
    note: 'Une infection du « triangle dangereux de la face » peut gagner le sinus caverneux (thrombophlébite).',
  },
  'Veine labiale supérieure': { what: 'Draine la lèvre supérieure.', ends: ['Veine faciale'] },
  'Veines labiales inférieures': { what: 'Drainent la lèvre inférieure.', ends: ['Veine faciale'] },
  'Veine submentale': { what: 'Satellite de l’artère submentale.', ends: ['Veine faciale'] },
  'Veine linguale': { what: 'Draine la langue (veines profonde et dorsales).', ends: ['Tronc thyro-linguo-facial ou jugulaire interne'] },
  'Veine thyroïdienne supérieure': { what: 'Satellite de l’artère thyroïdienne supérieure.', ends: ['Tronc thyro-linguo-facial ou jugulaire interne'] },
  'Veine ophtalmique supérieure': {
    what: 'Principale veine de l’orbite ; naît de l’union avec la veine angulaire et traverse la fissure orbitaire supérieure.',
    ends: ['Sinus caverneux'],
  },
  'Veine ophtalmique inférieure': { what: 'Naît du plancher de l’orbite.', ends: ['Veine ophtalmique supérieure et plexus ptérygoïdien (par la fissure orbitaire inférieure)'] },
  'Sinus': {
    what: 'Sinus veineux de la dure-mère : canaux veineux sans valvules, creusés entre les deux feuillets de la dure-mère, qui drainent l’encéphale vers les veines jugulaires internes.',
  },
  'Sinus pétreux inférieur': {
    what: 'Sinus de la dure-mère dans le sillon pétro-occipital ; relie le sinus caverneux au golfe de la jugulaire.',
    ends: ['Veine jugulaire interne, par la partie antérieure du foramen jugulaire'],
  },
  'Sinus intercaverneux antérieur': { what: 'Relie les deux sinus caverneux en avant de l’hypophyse.', note: 'Avec le postérieur, il forme le sinus circulaire autour de l’hypophyse.' },
  'Sinus intercaverneux postérieur': { what: 'Relie les deux sinus caverneux en arrière de l’hypophyse.' },
  'Plexus veineux basilaire': {
    what: 'Réseau veineux sur le clivus, entre les sinus caverneux et pétreux inférieurs et le plexus vertébral interne.',
  },

  // ---------------------------------------------------------------- cœur
  'Veine cardiaque moyenne': {
    what: 'Veine du sillon interventriculaire postérieur, satellite de l’artère interventriculaire postérieure.', ends: ['Sinus coronaire, près de sa terminaison'],
  },
  'Veine inférieure du ventricule gauche': { what: 'Draine la face diaphragmatique du ventricule gauche.', ends: ['Sinus coronaire'] },

  // -------------------------------------------------------------- poumons
  'Veine pulmonaire supérieure droite': { what: 'Draine les lobes supérieur et moyen droits.', ends: ['Atrium gauche'], near: ['Passe derrière la veine cave supérieure'] },
  'Veine pulmonaire inférieure droite': { what: 'Draine le lobe inférieur droit ; la plus basse du hile, dans le ligament pulmonaire.', ends: ['Atrium gauche'] },
  'Veine pulmonaire supérieure gauche': { what: 'Draine le lobe supérieur gauche et la lingula.', ends: ['Atrium gauche'] },
  'Veine pulmonaire inférieure gauche': { what: 'Draine le lobe inférieur gauche.', ends: ['Atrium gauche'] },
  'Veine apicale du poumon droit': pv('lobe supérieur droit', 'segment apical'),
  'Veine antérieure du poumon droit': pv('lobe supérieur droit', 'segment antérieur'),
  'Veine postérieure du poumon droit': pv('lobe supérieur droit', 'segment postérieur'),
  'Veine latérale du poumon droit': pv('lobe moyen', 'segment latéral'),
  'Veine médiale du poumon droit': pv('lobe moyen', 'segment médial'),
  'Veine supérieure du poumon droit': pv('lobe inférieur droit', 'segment supérieur'),
  'Veine basale supérieure du poumon droit': pv('lobe inférieur droit', 'segments basaux antérieur et latéral'),
  'Veine basale inférieure du poumon droit': pv('lobe inférieur droit', 'segments basaux postérieurs'),
  'Veine apico-postérieure du poumon gauche': pv('lobe supérieur gauche', 'segment apico-postérieur'),
  'Veine antérieure du poumon gauche': pv('lobe supérieur gauche', 'segment antérieur'),
  'Veine lingulaire du poumon gauche': pv('lobe supérieur gauche', 'lingula'),
  'Veine lingulaire supérieure du poumon gauche': pv('lobe supérieur gauche', 'segment lingulaire supérieur'),
  'Veine lingulaire inférieure du poumon gauche': pv('lobe supérieur gauche', 'segment lingulaire inférieur'),
  'Veine supérieure du poumon gauche': pv('lobe inférieur gauche', 'segment supérieur'),
  'Veine basale supérieure du poumon gauche': pv('lobe inférieur gauche', 'segments basaux antérieurs'),
  'Veine basale inférieure du poumon gauche': pv('lobe inférieur gauche', 'segments basaux postérieurs'),
};
