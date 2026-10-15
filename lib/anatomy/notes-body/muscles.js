// The muscles the whole body shows and no regional model described.
// Same rules as lib/anatomy/notes.js: written here, standard descriptive
// anatomy, Terminologia Anatomica with the older French term in brackets.
// Keyed by the French name in the body's manifests, without the side.

export const MUSCLE_NOTES = {
  // -------------------------------- whole muscles, read from their insertions
  'Muscle deltoïde': {
    origin: ['Partie claviculaire : tiers latéral de la clavicule', 'Partie acromiale : acromion', 'Partie spinale : épine de la scapula'],
    insertion: ['Tubérosité deltoïdienne de l’humérus'],
    nerve: ['Nerf axillaire (C5–C6)'],
    action: ['Abduction du bras de 15° à 90° (partie acromiale)', 'Flexion et rotation médiale (antérieure), extension et rotation latérale (postérieure)'],
  },
  'Muscle grand pectoral': {
    origin: ['Partie claviculaire : moitié médiale de la clavicule', 'Partie sterno-costale : sternum et cartilages costaux 1 à 6', 'Partie abdominale : gaine du droit'],
    insertion: ['Lèvre latérale du sillon intertuberculaire de l’humérus (tendon en U)'],
    nerve: ['Nerfs pectoraux latéral et médial (C5–T1)'],
    action: ['Adduction et rotation médiale du bras', 'Flexion (partie claviculaire)', 'Inspirateur accessoire si le bras est fixé'],
  },
  'Muscle biceps brachial': {
    origin: ['Chef long : tubercule supraglénoïdal (intra-articulaire)', 'Chef court : processus coracoïde'],
    insertion: ['Tubérosité radiale', 'Aponévrose bicipitale sur le fascia antébrachial'],
    nerve: ['Nerf musculocutané (C5–C6)'],
    action: ['Supination puissante', 'Flexion du coude', 'Flexion de l’épaule'],
    note: 'Réflexe bicipital : C5–C6.',
  },
  'Muscle triceps brachial': {
    origin: ['Chef long : tubercule infraglénoïdal', 'Chef latéral : face postérieure de l’humérus au-dessus du sillon radial', 'Chef médial : face postérieure sous le sillon radial'],
    insertion: ['Olécrâne'],
    nerve: ['Nerf radial (C6–C8)'],
    action: ['Extension du coude ; le chef long étend et adducte le bras'],
    note: 'Réflexe tricipital : C7.',
  },
  'Muscle rond pronateur': {
    origin: ['Chef huméral : épicondyle médial', 'Chef ulnaire : processus coronoïde'],
    insertion: ['Face latérale du radius, à mi-hauteur'],
    nerve: ['Nerf médian (C6–C7)'],
    action: ['Pronation, flexion accessoire du coude'],
  },
  'Adducteur du pouce': {
    origin: ['Chef oblique : capitatum, bases des 2e et 3e métacarpiens', 'Chef transverse : face antérieure du 3e métacarpien'],
    insertion: ['Sésamoïde médial et base de la phalange proximale du pouce'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Adduction du pouce, pince latérale'],
  },
  'Tendon commun des fléchisseurs': { what: 'Tendon d’origine commun des muscles épicondyliens médiaux (rond pronateur, fléchisseur radial du carpe, long palmaire, fléchisseur superficiel des doigts, fléchisseur ulnaire du carpe), sur l’épicondyle médial.', note: 'Son inflammation : épicondylite médiale (golfer’s elbow).' },
  'Tendon commun des extenseurs': { what: 'Tendon d’origine commun des épicondyliens latéraux (court extenseur radial du carpe, extenseur des doigts, extenseur du petit doigt, extenseur ulnaire du carpe), sur l’épicondyle latéral.', note: 'Son inflammation : épicondylite latérale (tennis elbow).' },
  'Muscle masséter': {
    origin: ['Partie superficielle : bord inférieur des deux tiers antérieurs de l’arcade zygomatique', 'Partie profonde : face médiale de l’arcade zygomatique'],
    insertion: ['Face latérale de la branche et de l’angle de la mandibule'],
    nerve: ['Nerf massétérique (V3)'],
    action: ['Élève la mandibule (fermeture puissante de la bouche)'],
  },
  'Muscle ptérygoïdien latéral': {
    origin: ['Chef supérieur : face infra-temporale de la grande aile du sphénoïde', 'Chef inférieur : face latérale de la lame latérale du processus ptérygoïde'],
    insertion: ['Fovéa ptérygoïdienne du col de la mandibule', 'Disque et capsule de l’ATM'],
    nerve: ['Nerf du ptérygoïdien latéral (V3)'],
    action: ['Propulsion et diduction controlatérale de la mandibule', 'Seul muscle masticateur qui ouvre la bouche'],
  },
  'Muscle iliopsoas': {
    origin: ['Psoas : corps et processus transverses T12–L5', 'Iliaque : fosse iliaque'],
    insertion: ['Petit trochanter du fémur'],
    nerve: ['Psoas : rameaux de L1–L3 ; iliaque : nerf fémoral (L2–L3)'],
    action: ['Principal fléchisseur de la hanche', 'Fléchit le tronc sur le bassin'],
    note: 'Signe du psoas : douleur à l’extension de la hanche dans l’appendicite rétrocæcale.',
  },
  'Muscle quadriceps fémoral': {
    origin: ['Droit fémoral : épine iliaque antéro-inférieure et sourcil acétabulaire', 'Vastes latéral, médial et intermédiaire : diaphyse du fémur'],
    insertion: ['Base de la patella, puis tubérosité tibiale par le ligament patellaire'],
    nerve: ['Nerf fémoral (L2–L4)'],
    action: ['Extension du genou ; le droit fémoral fléchit aussi la hanche'],
    note: 'Réflexe rotulien : L4.',
  },
  'Ligament patellaire': { what: 'Tendon terminal du quadriceps, de l’apex de la patella à la tubérosité tibiale.', note: 'Percuté pour le réflexe rotulien (L3–L4) ; prélevé pour les ligamentoplasties du LCA.' },
  'Muscle articulaire du genou': { origin: ['Face antérieure du fémur, tiers inférieur'], insertion: ['Bourse suprapatellaire'], nerve: ['Nerf fémoral'], action: ['Remonte la bourse pendant l’extension, l’empêchant d’être pincée'] },
  'Muscle biceps fémoral': {
    origin: ['Chef long : tubérosité ischiatique', 'Chef court : lèvre latérale de la ligne âpre'],
    insertion: ['Tête de la fibula'],
    nerve: ['Chef long : partie tibiale du nerf ischiatique', 'Chef court : partie fibulaire commune'],
    action: ['Fléchit le genou et tourne la jambe en dehors ; le chef long étend la hanche'],
  },
  'Muscle triceps sural': {
    origin: ['Gastrocnémien : condyles fémoraux (deux chefs)', 'Soléaire : tête et col de la fibula, ligne du soléaire du tibia'],
    insertion: ['Calcanéus par le tendon calcanéen (d’Achille)'],
    nerve: ['Nerf tibial (S1–S2)'],
    action: ['Flexion plantaire de la cheville ; le gastrocnémien fléchit aussi le genou'],
    note: 'Le soléaire est la « pompe » du retour veineux du membre inférieur.',
  },
  'Muscle élévateur de l\'anus': {
    what: 'Principal muscle du plancher pelvien, en trois parties : pubo-rectale, pubo-coccygienne, ilio-coccygienne.',
    origin: ['Face postérieure du pubis', 'Arc tendineux du fascia obturateur', 'Épine ischiatique'],
    insertion: ['Centre tendineux du périnée, ligament ano-coccygien, coccyx'],
    nerve: ['Nerf du muscle élévateur de l’anus (S3–S4) et nerf pudendal'],
    action: ['Soutient les viscères pelviens', 'Continence (sangle pubo-rectale)'],
    note: 'Lésé à l’accouchement : prolapsus et incontinence.',
  },
  'Muscles érecteurs du rachis': {
    what: 'Masse musculaire paravertébrale en trois colonnes : ilio-costal (latérale), longissimus (intermédiaire), épineux (médiale).',
    origin: ['Aponévrose commune sur le sacrum, la crête iliaque et les processus épineux lombaux'],
    insertion: ['Côtes, processus transverses et épineux, jusqu’à l’occipital'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Extension et inclinaison latérale du rachis, maintien de la posture'],
  },
  'Muscles pelvi-trochantériens': {
    what: 'Muscles rotateurs latéraux de la hanche qui se terminent sur ou près du grand trochanter : piriforme, jumeaux supérieur et inférieur, obturateurs interne et externe, carré fémoral.',
    nerve: ['Branches collatérales du plexus sacral ; nerf obturateur pour l’obturateur externe'],
    action: ['Rotation latérale de la cuisse, stabilisation de la tête fémorale'],
  },

  // ------------------------------------------------------------ tête : œil
  'Anneau tendineux commun (de Zinn)': {
    what: `Anneau fibreux fixé autour du canal optique et de la partie médiale de
      la fissure orbitaire supérieure ; origine commune des quatre muscles droits.`,
    through: ['Nerf optique et artère ophtalmique (par le canal optique)',
      'Nerf oculomoteur (III), divisions supérieure et inférieure', 'Nerf abducens (VI)',
      'Nerf naso-ciliaire (V1)'],
    note: 'Passent EN DEHORS de l’anneau : nerfs frontal, lacrymal et trochléaire (IV), veine ophtalmique supérieure.',
  },
  'Muscle droit supérieur de l\'oeil': {
    origin: ['Anneau tendineux commun, partie supérieure'],
    insertion: ['Sclère, en haut, à 7,7 mm du limbe'],
    nerve: ['Division supérieure du nerf oculomoteur (III)'],
    action: ['Élévation (surtout en abduction)', 'Intorsion', 'Adduction accessoire'],
  },
  'Muscle droit inférieur de l\'oeil': {
    origin: ['Anneau tendineux commun, partie inférieure'],
    insertion: ['Sclère, en bas, à 6,5 mm du limbe'],
    nerve: ['Division inférieure du nerf oculomoteur (III)'],
    action: ['Abaissement (surtout en abduction)', 'Extorsion', 'Adduction accessoire'],
  },
  'Muscle droit médial de l\'oeil': {
    origin: ['Anneau tendineux commun, partie médiale'],
    insertion: ['Sclère, en dedans, à 5,5 mm du limbe — le plus proche du limbe'],
    nerve: ['Division inférieure du nerf oculomoteur (III)'],
    action: ['Adduction'],
  },
  'Muscle droit latéral de l\'oeil': {
    origin: ['Anneau tendineux commun, partie latérale (deux chefs enjambant la fissure orbitaire supérieure)'],
    insertion: ['Sclère, en dehors, à 6,9 mm du limbe'],
    nerve: ['Nerf abducens (VI)'],
    action: ['Abduction'],
    note: 'Paralysie du VI : strabisme convergent, diplopie horizontale.',
  },
  'Muscle oblique supérieur de l\'œil': {
    origin: ['Corps du sphénoïde, au-dessus et en dedans du canal optique'],
    course: ['Longe la paroi supéro-médiale de l’orbite', 'Se réfléchit dans la trochlée', 'Repart en arrière et en dehors sous le droit supérieur'],
    insertion: ['Sclère, quadrant postéro-supéro-latéral, en arrière de l’équateur'],
    nerve: ['Nerf trochléaire (IV)'],
    action: ['Intorsion', 'Abaissement (surtout en adduction)', 'Abduction'],
    note: 'Paralysie du IV : diplopie verticale à la descente des escaliers, tête inclinée du côté sain.',
  },
  'Muscle oblique inférieur de l\'œil': {
    origin: ['Plancher de l’orbite, en dehors du sillon lacrymo-nasal (maxillaire)'],
    insertion: ['Sclère, quadrant postéro-inféro-latéral'],
    nerve: ['Division inférieure du nerf oculomoteur (III)'],
    action: ['Extorsion', 'Élévation (surtout en adduction)', 'Abduction'],
    note: 'Seul muscle extrinsèque de l’œil qui ne naît pas du fond de l’orbite.',
  },
  'Muscle élévateur de la paupière supérieure': {
    origin: ['Petite aile du sphénoïde, au-dessus du canal optique'],
    insertion: ['Peau de la paupière supérieure et face antérieure du tarse supérieur (aponévrose)',
      'Muscle tarsal supérieur (de Müller), lisse, sur le bord du tarse'],
    nerve: ['Division supérieure du nerf oculomoteur (III) ; contingent sympathique pour le muscle de Müller'],
    action: ['Élève la paupière supérieure'],
    note: 'Ptosis complet dans la paralysie du III, partiel dans le syndrome de Claude Bernard-Horner.',
  },
  'Trochlée du muscle oblique supérieur': {
    what: `Poulie fibro-cartilagineuse fixée à la fossette trochléaire de l’os
      frontal, en haut et en dedans de l’orbite, où se réfléchit le tendon du
      muscle oblique supérieur.`,
  },
  'Tarse supérieur': {
    what: `Lame de tissu conjonctif dense qui forme le squelette de la paupière
      supérieure, haute d’environ 10 mm ; elle contient les glandes tarsales (de
      Meibomius).`,
    insertion: ['Aponévrose du muscle élévateur de la paupière supérieure', 'Ligaments palpébraux médial et latéral'],
  },
  'Tarse inférieur': {
    what: `Squelette conjonctif de la paupière inférieure, plus étroit (environ
      5 mm) ; glandes tarsales dans son épaisseur.`,
    insertion: ['Ligaments palpébraux médial et latéral'],
  },

  // ------------------------------------------------------ tête : face, langue
  'Muscle temporo-pariétal': {
    origin: ['Aponévrose épicrânienne, région temporale'],
    insertion: ['Cartilage de l’auricule, au-dessus du muscle auriculaire supérieur'],
    nerve: ['Rameaux temporaux du nerf facial (VII)'],
    action: ['Tend le cuir chevelu, élève l’auricule'],
  },
  'Muscle génioglosse': {
    origin: ['Épine mentonnière supérieure (apophyse géni) de la mandibule'],
    insertion: ['En éventail dans toute la hauteur de la langue, jusqu’à la pointe', 'Corps de l’os hyoïde (fibres inférieures)'],
    nerve: ['Nerf hypoglosse (XII)'],
    action: ['Protraction de la langue (la tire en avant)', 'Abaisse la partie centrale de la langue'],
    note: 'Paralysie unilatérale du XII : la langue tirée dévie du côté paralysé.',
  },
  'Muscle hyoglosse': {
    origin: ['Grande corne et corps de l’os hyoïde'],
    insertion: ['Bord latéral de la langue'],
    nerve: ['Nerf hypoglosse (XII)'],
    action: ['Abaisse et rétracte la langue'],
    near: ['Superficiellement : nerf hypoglosse, nerf lingual, conduit submandibulaire',
      'Profondément : artère linguale (repère classique)'],
  },
  'Muscle mylo-hyoïdien': {
    origin: ['Ligne mylo-hyoïdienne de la face interne de la mandibule'],
    insertion: ['Raphé médian (avec le muscle opposé) et corps de l’os hyoïde'],
    nerve: ['Nerf mylo-hyoïdien, branche du nerf alvéolaire inférieur (V3)'],
    action: ['Forme le plancher de la bouche (diaphragme oral)', 'Élève l’os hyoïde et la langue', 'Abaisse la mandibule si l’hyoïde est fixé'],
    near: ['La glande submandibulaire contourne son bord postérieur'],
  },
  'Muscle stylo-hyoïdien': {
    origin: ['Processus styloïde du temporal'],
    insertion: ['Corps de l’os hyoïde, en se dédoublant autour du tendon intermédiaire du digastrique'],
    nerve: ['Nerf facial (VII)'],
    action: ['Élève et attire en arrière l’os hyoïde'],
  },
  'Ventre antérieur du muscle digastrique': {
    origin: ['Fosse digastrique de la mandibule'],
    insertion: ['Tendon intermédiaire, fixé à l’os hyoïde par une sangle fibreuse'],
    nerve: ['Nerf mylo-hyoïdien (V3)'],
    action: ['Abaisse la mandibule', 'Élève l’os hyoïde'],
    note: 'Deux ventres, deux origines embryologiques, deux nerfs : V3 en avant, VII en arrière.',
  },
  'Ventre postérieur du muscle digastrique': {
    origin: ['Incisure mastoïdienne du temporal'],
    insertion: ['Tendon intermédiaire, fixé à l’os hyoïde'],
    nerve: ['Nerf facial (VII)'],
    action: ['Élève et attire en arrière l’os hyoïde', 'Participe à l’ouverture de la bouche'],
    near: ['Repère chirurgical du cou : croise superficiellement les carotides, la veine jugulaire interne et le nerf hypoglosse'],
  },
  'Tendon intermédiaire du muscle digastrique': {
    what: `Tendon qui unit les deux ventres du digastrique ; il glisse dans une
      boucle fibreuse fixée à la grande corne de l’os hyoïde et traverse le
      muscle stylo-hyoïdien.`,
  },

  // ------------------------------------------------------------ pharynx
  'Constricteur supérieur du pharynx': {
    origin: ['Lame médiale du processus ptérygoïde et hamulus', 'Raphé ptérygo-mandibulaire',
      'Extrémité postérieure de la ligne mylo-hyoïdienne', 'Bord de la langue'],
    insertion: ['Raphé pharyngien médian et tubercule pharyngien de l’occipital'],
    nerve: ['Plexus pharyngien (X)'],
    action: ['Contraction séquentielle du pharynx pendant la déglutition'],
    near: ['Entre son bord supérieur et la base du crâne : trompe auditive et muscle élévateur du voile'],
  },
  'Constricteur moyen du pharynx': {
    origin: ['Grande et petite cornes de l’os hyoïde', 'Ligament stylo-hyoïdien'],
    insertion: ['Raphé pharyngien'],
    nerve: ['Plexus pharyngien (X)'],
    action: ['Constriction du pharynx pendant la déglutition'],
    near: ['Le muscle stylo-pharyngien et le nerf glosso-pharyngien passent entre le constricteur supérieur et le moyen'],
  },
  'Constricteur inférieur du pharynx': {
    origin: ['Ligne oblique du cartilage thyroïde (partie thyro-pharyngienne)',
      'Arc du cartilage cricoïde (partie crico-pharyngienne)'],
    insertion: ['Raphé pharyngien ; la partie crico-pharyngienne entoure la bouche de l’œsophage'],
    nerve: ['Plexus pharyngien (X), nerf laryngé externe et récurrent'],
    action: ['Constriction ; la partie crico-pharyngienne forme le sphincter supérieur de l’œsophage'],
    note: 'Zone faible entre ses deux parties (triangle de Killian) : diverticule de Zenker.',
  },
  'Muscle stylo-pharyngien': {
    origin: ['Face médiale du processus styloïde'],
    insertion: ['Paroi du pharynx et bord postérieur du cartilage thyroïde'],
    nerve: ['Nerf glosso-pharyngien (IX) — seul muscle de ce nerf'],
    action: ['Élève le pharynx et le larynx, élargit le pharynx'],
  },
  'Muscle palatopharyngien': {
    origin: ['Aponévrose palatine et bord postérieur du palais osseux'],
    insertion: ['Paroi du pharynx et bord postérieur du cartilage thyroïde'],
    nerve: ['Plexus pharyngien (X)'],
    action: ['Élève le pharynx et le larynx', 'Rapproche les arcs palato-pharyngiens'],
    near: ['Il soulève l’arc palato-pharyngien (pilier postérieur), derrière l’amygdale palatine'],
  },

  // -------------------------------------------------------------- larynx
  'Partie droite du muscle crico-thyroïdien': {
    origin: ['Face antéro-latérale de l’arc du cartilage cricoïde'],
    insertion: ['Bord inférieur de la lame du cartilage thyroïde'],
    nerve: ['Nerf laryngé externe (branche du laryngé supérieur, X)'],
    action: ['Bascule le thyroïde en avant : tend et allonge les plis vocaux (voix aiguë)'],
  },
  'Partie oblique du muscle crico-thyroïdien': {
    origin: ['Arc du cartilage cricoïde'],
    insertion: ['Corne inférieure du cartilage thyroïde'],
    nerve: ['Nerf laryngé externe (X)'],
    action: ['Glisse le thyroïde en avant : tension des plis vocaux'],
    note: 'Seul muscle intrinsèque du larynx innervé par le laryngé supérieur ; tous les autres par le récurrent.',
  },
  'Muscle crico-aryténoïdien': {
    what: 'Ici le crico-aryténoïdien latéral.',
    origin: ['Bord supérieur de l’arc du cricoïde'],
    insertion: ['Processus musculaire de l’aryténoïde'],
    nerve: ['Nerf laryngé inférieur (récurrent, X)'],
    action: ['Rotation interne de l’aryténoïde : adduction des plis vocaux (fermeture de la glotte)'],
    note: 'Le crico-aryténoïdien postérieur, son antagoniste, est le seul abducteur de la glotte.',
  },
  'Muscle arytenoidien transverse': {
    origin: ['Face postérieure d’un cartilage aryténoïde'],
    insertion: ['Face postérieure de l’aryténoïde opposé'],
    nerve: ['Nerf laryngé inférieur (récurrent)'],
    action: ['Rapproche les aryténoïdes : ferme la partie postérieure (intercartilagineuse) de la glotte'],
    note: 'Seul muscle intrinsèque impair du larynx.',
  },
  'Partie ary-épiglottique du muscle aryténoïdien oblique': {
    what: `Prolongement des fibres de l’aryténoïdien oblique dans le pli
      ary-épiglottique jusqu’au bord de l’épiglotte.`,
    nerve: ['Nerf laryngé inférieur (récurrent)'],
    action: ['Rétrécit l’entrée du larynx, rabat l’épiglotte pendant la déglutition'],
  },
  'Partie externe du muscle thyro-aryténoïdien': {
    origin: ['Face postérieure de l’angle thyroïdien'],
    insertion: ['Face antéro-latérale de l’aryténoïde'],
    nerve: ['Nerf laryngé inférieur (récurrent)'],
    action: ['Relâche et raccourcit les plis vocaux', 'Adduction'],
    note: 'Sa partie interne, au bord du pli vocal, est le muscle vocal.',
  },
  'Partie thyro-épiglottique du muscle thyro-aryténoïdien': {
    what: 'Fibres du thyro-aryténoïdien qui gagnent le bord de l’épiglotte et le pli ary-épiglottique.',
    nerve: ['Nerf laryngé inférieur (récurrent)'],
    action: ['Élargit l’entrée du larynx'],
  },

  // ---------------------------------------------------------- cou : hyoïdiens
  'Muscle génio-hyoïdien': {
    origin: ['Épine mentonnière inférieure de la mandibule'],
    insertion: ['Face antérieure du corps de l’os hyoïde'],
    nerve: ['Fibres de C1 cheminant avec le nerf hypoglosse'],
    action: ['Attire l’os hyoïde en avant et en haut', 'Abaisse la mandibule si l’hyoïde est fixé'],
  },
  'Muscle thyro-hyoïdien': {
    origin: ['Ligne oblique du cartilage thyroïde'],
    insertion: ['Grande corne et corps de l’os hyoïde'],
    nerve: ['Fibres de C1 par le nerf hypoglosse'],
    action: ['Abaisse l’os hyoïde ; élève le larynx si l’hyoïde est fixé'],
  },
  'Muscle sterno-hyoïdien': {
    origin: ['Face postérieure du manubrium sternal et extrémité médiale de la clavicule'],
    insertion: ['Bord inférieur du corps de l’os hyoïde'],
    nerve: ['Anse cervicale (C1–C3)'],
    action: ['Abaisse l’os hyoïde après la déglutition'],
  },
  'Muscle sterno-thyroïdien': {
    origin: ['Face postérieure du manubrium, sous le sterno-hyoïdien'],
    insertion: ['Ligne oblique du cartilage thyroïde'],
    nerve: ['Anse cervicale (C1–C3)'],
    action: ['Abaisse le larynx'],
    near: ['Couvre directement la glande thyroïde'],
  },
  'Muscle omohyoïdien': {
    origin: ['Bord supérieur de la scapula, près de l’incisure scapulaire (ventre inférieur)'],
    insertion: ['Bord inférieur du corps de l’os hyoïde (ventre supérieur)'],
    nerve: ['Anse cervicale (C1–C3)'],
    action: ['Abaisse et fixe l’os hyoïde', 'Tend la lame prétrachéale du fascia cervical'],
    near: ['Son tendon intermédiaire croise la veine jugulaire interne, retenu à la clavicule par une gaine fibreuse',
      'Il divise le triangle antérieur et le triangle postérieur du cou'],
  },
  'Muscle sterno-cléido-mastoïdien': {
    origin: ['Chef sternal : face antérieure du manubrium', 'Chef claviculaire : tiers médial de la clavicule'],
    insertion: ['Face latérale du processus mastoïde', 'Moitié latérale de la ligne nucale supérieure'],
    nerve: ['Nerf accessoire (XI), branche latérale', 'Rameaux de C2–C3 (proprioception)'],
    action: ['Unilatéral : incline la tête de son côté et la tourne du côté opposé',
      'Bilatéral : fléchit le cou, projette la tête en avant', 'Inspirateur accessoire'],
    near: ['Couvre le paquet vasculo-nerveux du cou (carotide, jugulaire interne, X)',
      'Sépare la région cervicale antérieure de la latérale'],
    note: 'Sa rétraction congénitale donne le torticolis.',
  },

  // --------------------------------------------- cou : prévertébraux, scalènes
  'Muscle long du cou': {
    origin: ['Corps des vertèbres C1–T3 et tubercules antérieurs des processus transverses C3–C6'],
    insertion: ['Tubercule antérieur de l’atlas et corps des vertèbres cervicales supérieures'],
    nerve: ['Rameaux ventraux de C2–C6'],
    action: ['Fléchit le cou ; inclinaison latérale et rotation'],
  },
  'Muscle long de la tête': {
    origin: ['Tubercules antérieurs des processus transverses C3–C6'],
    insertion: ['Partie basilaire de l’occipital'],
    nerve: ['Rameaux ventraux de C1–C3'],
    action: ['Fléchit la tête'],
  },
  'Muscle droit antérieur de la tête': {
    origin: ['Masse latérale de l’atlas'],
    insertion: ['Partie basilaire de l’occipital, devant le foramen magnum'],
    nerve: ['Rameaux ventraux de C1–C2'],
    action: ['Fléchit la tête sur l’atlas'],
  },
  'Muscle droit latéral de la tête': {
    origin: ['Processus transverse de l’atlas'],
    insertion: ['Processus jugulaire de l’occipital'],
    nerve: ['Rameaux ventraux de C1–C2'],
    action: ['Incline la tête de son côté'],
  },
  'Muscle scalène antérieur': {
    origin: ['Tubercules antérieurs des processus transverses C3–C6'],
    insertion: ['Tubercule du muscle scalène antérieur (de Lisfranc) de la 1re côte'],
    nerve: ['Rameaux ventraux de C4–C6'],
    action: ['Élève la 1re côte (inspiration)', 'Incline le cou de son côté'],
    near: ['En avant : veine subclavière et nerf phrénique (à sa surface)',
      'En arrière : artère subclavière et racines du plexus brachial (défilé des scalènes)'],
  },
  'Muscle scalène': {
    what: 'Ici le scalène moyen, le plus grand des scalènes.',
    origin: ['Tubercules postérieurs des processus transverses C2–C7'],
    insertion: ['Face supérieure de la 1re côte, en arrière du sillon de l’artère subclavière'],
    nerve: ['Rameaux ventraux de C3–C8'],
    action: ['Élève la 1re côte', 'Incline le cou de son côté'],
    near: ['Le nerf dorsal de la scapula et le nerf thoracique long le traversent'],
  },

  // ----------------------------------------------------- nuque, sous-occipitaux
  'Muscle splénius de la tête': {
    origin: ['Moitié inférieure du ligament nuchal', 'Processus épineux C7–T3'],
    insertion: ['Processus mastoïde et tiers latéral de la ligne nucale supérieure'],
    nerve: ['Rameaux dorsaux des nerfs cervicaux moyens'],
    action: ['Unilatéral : incline et tourne la tête de son côté', 'Bilatéral : étend la tête'],
  },
  'Muscle splénius du cou': {
    origin: ['Processus épineux T3–T6'],
    insertion: ['Tubercules postérieurs des processus transverses C1–C3'],
    nerve: ['Rameaux dorsaux des nerfs cervicaux inférieurs'],
    action: ['Étend le cou ; rotation et inclinaison homolatérales'],
  },
  'Muscle longissimus de la tête': {
    origin: ['Processus transverses T1–T5 et processus articulaires C4–C7'],
    insertion: ['Bord postérieur du processus mastoïde'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend la tête ; l’incline et la tourne de son côté'],
  },
  'Muscle longissimus du cou': {
    origin: ['Processus transverses T1–T5'],
    insertion: ['Tubercules postérieurs des processus transverses C2–C6'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend le cou, l’incline de son côté'],
  },
  'Muscle épineux de la tête': {
    what: 'Faisceau médial du muscle épineux, souvent fusionné avec le semi-épineux de la tête.',
    origin: ['Processus épineux C7–T1'],
    insertion: ['Os occipital, entre les lignes nucales'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend la tête'],
  },
  'Muscle épineux du cou': {
    origin: ['Ligament nuchal et processus épineux C7–T2'],
    insertion: ['Processus épineux C2–C4'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend le cou'],
  },
  'Muscle multifide du cou': {
    origin: ['Processus articulaires C4–C7'],
    insertion: ['Processus épineux des vertèbres sus-jacentes, en sautant 2 à 4 vertèbres'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Stabilise le rachis cervical ; extension et rotation controlatérale'],
  },
  'Muscles interépineux du cou': {
    origin: ['Processus épineux d’une vertèbre cervicale'],
    insertion: ['Processus épineux de la vertèbre sus-jacente'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Extension du cou, segment par segment'],
  },
  'Muscle grand droit postérieur de la tête': {
    origin: ['Processus épineux de l’axis'],
    insertion: ['Partie latérale de la ligne nucale inférieure'],
    nerve: ['Nerf sous-occipital (rameau dorsal de C1)'],
    action: ['Étend la tête, la tourne de son côté'],
    note: 'Avec les obliques de la tête, il limite le triangle sous-occipital (artère vertébrale, nerf sous-occipital).',
  },
  'Muscle petit droit postérieur de la tête': {
    origin: ['Tubercule postérieur de l’atlas'],
    insertion: ['Partie médiale de la ligne nucale inférieure'],
    nerve: ['Nerf sous-occipital (C1)'],
    action: ['Étend la tête'],
  },
  'Muscle oblique inférieur de la tête': {
    origin: ['Processus épineux de l’axis'],
    insertion: ['Processus transverse de l’atlas'],
    nerve: ['Nerf sous-occipital (C1)'],
    action: ['Tourne l’atlas, donc la tête, de son côté'],
    note: 'Le nerf grand occipital (C2) émerge sous son bord inférieur.',
  },
  'Muscle oblique supérieur de la tête': {
    origin: ['Processus transverse de l’atlas'],
    insertion: ['Os occipital, entre les lignes nucales supérieure et inférieure'],
    nerve: ['Nerf sous-occipital (C1)'],
    action: ['Étend la tête, l’incline de son côté'],
  },

  // -------------------------------------------------------------- dos (érecteurs)
  'Muscle ilio-costal des lombes': {
    origin: ['Crête iliaque, sacrum et aponévrose commune des érecteurs du rachis'],
    insertion: ['Angles des 6 à 9 dernières côtes'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend le rachis, l’incline de son côté'],
    note: 'Colonne la plus latérale des érecteurs du rachis (ilio-costal, longissimus, épineux, de dehors en dedans).',
  },
  'Muscle ilio-costal du thorax': {
    origin: ['Angles des six dernières côtes'],
    insertion: ['Angles des six premières côtes et processus transverse de C7'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend et incline le rachis thoracique'],
  },
  'Muscle ilio-costal du cou': {
    origin: ['Angles des côtes 3 à 6'],
    insertion: ['Tubercules postérieurs des processus transverses C4–C6'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend et incline le cou'],
  },
  'Muscle longissimus du thorax': {
    origin: ['Aponévrose commune des érecteurs, processus transverses lombaires'],
    insertion: ['Processus transverses des vertèbres thoraciques et côtes entre tubercule et angle'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend le rachis, l’incline de son côté'],
  },
  'Muscle épineux du thorax': {
    origin: ['Processus épineux T11–L2'],
    insertion: ['Processus épineux T1–T8'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend le rachis thoracique'],
  },
  'Muscle semi-épineux du thorax': {
    origin: ['Processus transverses T6–T10'],
    insertion: ['Processus épineux C6–T4'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend le rachis, rotation controlatérale'],
  },
  'Muscle semi-épineux du cou': {
    origin: ['Processus transverses T1–T6'],
    insertion: ['Processus épineux C2–C5'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Étend le cou, rotation controlatérale'],
  },
  'Muscle multifide du thorax': {
    origin: ['Processus transverses thoraciques'],
    insertion: ['Processus épineux situés 2 à 4 étages plus haut'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Stabilisation segmentaire, extension, rotation controlatérale'],
  },
  'Muscle multifide des lombes': {
    origin: ['Face dorsale du sacrum, épine iliaque postéro-supérieure, processus mamillaires lombaires'],
    insertion: ['Processus épineux lombaires sus-jacents'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Principal stabilisateur du rachis lombal'],
    note: 'Son atrophie est fréquente dans la lombalgie chronique.',
  },
  'Muscles rotateurs': {
    origin: ['Processus transverses'],
    insertion: ['Base du processus épineux de la vertèbre sus-jacente (courts) ou de la deuxième au-dessus (longs)'],
    nerve: ['Rameaux dorsaux des nerfs spinaux'],
    action: ['Rotation controlatérale et proprioception segmentaire'],
  },
  'Muscles interépineux du thorax': {
    origin: ['Processus épineux'], insertion: ['Processus épineux sus-jacent'],
    nerve: ['Rameaux dorsaux'], action: ['Extension segmentaire (peu développés au thorax)'],
  },
  'Muscles interépineux des lombes': {
    origin: ['Processus épineux lombaire'], insertion: ['Processus épineux sus-jacent'],
    nerve: ['Rameaux dorsaux'], action: ['Extension segmentaire du rachis lombal'],
  },
  'Parties dorsales des muscles intertransversaires latéraux des lombes': {
    what: 'Petits faisceaux entre processus accessoires et transverses lombaires voisins.',
    nerve: ['Rameaux dorsaux des nerfs lombaux'], action: ['Inclinaison latérale, stabilisation'],
  },
  'Parties ventrales des muscles intertransversaires latéraux des lombes': {
    what: 'Petits faisceaux entre processus transverses lombaires voisins.',
    nerve: ['Rameaux ventraux des nerfs lombaux'], action: ['Inclinaison latérale du rachis lombal'],
  },
  'Muscle carré des lombes': {
    origin: ['Lèvre interne de la crête iliaque et ligament ilio-lombal'],
    insertion: ['Bord inférieur de la 12e côte', 'Processus transverses L1–L4'],
    nerve: ['Nerf subcostal (T12) et rameaux de L1–L4'],
    action: ['Incline le tronc de son côté', 'Fixe la 12e côte pendant l’inspiration', 'Élève l’hémibassin'],
    near: ['Paroi postérieure de l’abdomen, derrière le rein'],
  },

  // -------------------------------------------------------------- thorax
  'Muscle dentelé postérieur et supérieur': {
    origin: ['Ligament nuchal et processus épineux C7–T3'],
    insertion: ['Côtes 2 à 5, en dehors de leur angle'],
    nerve: ['Nerfs intercostaux 2 à 5'],
    action: ['Élève les côtes (inspirateur accessoire)'],
  },
  'Muscle dentelé postérieur et inférieur': {
    origin: ['Processus épineux T11–L2 par le fascia thoraco-lombal'],
    insertion: ['Bord inférieur des côtes 9 à 12'],
    nerve: ['Nerfs intercostaux 9 à 11 et subcostal'],
    action: ['Abaisse les dernières côtes'],
  },
  'Muscles intercostaux externes': {
    origin: ['Bord inférieur de la côte sus-jacente'],
    insertion: ['Bord supérieur de la côte sous-jacente ; fibres obliques en bas et en avant'],
    nerve: ['Nerfs intercostaux'],
    action: ['Élèvent les côtes : inspiration'],
    note: 'Remplacés en avant, entre les cartilages, par la membrane intercostale externe.',
  },
  'Muscles intercostaux internes': {
    origin: ['Sillon costal de la côte sus-jacente'],
    insertion: ['Bord supérieur de la côte sous-jacente ; fibres en bas et en arrière'],
    nerve: ['Nerfs intercostaux'],
    action: ['Abaissent les côtes : expiration forcée (partie interosseuse)'],
  },
  'Muscles intercostaux intimes': {
    what: 'Couche la plus profonde des intercostaux, séparée des internes par le paquet vasculo-nerveux intercostal.',
    nerve: ['Nerfs intercostaux'], action: ['Comme les intercostaux internes'],
    near: ['Le paquet vasculo-nerveux (veine, artère, nerf de haut en bas) court entre intercostaux internes et intimes, dans le sillon costal'],
  },
  'Muscle transverse du thorax': {
    origin: ['Face postérieure du corps du sternum et du processus xiphoïde'],
    insertion: ['Face profonde des cartilages costaux 2 à 6'],
    nerve: ['Nerfs intercostaux 2 à 6'],
    action: ['Abaisse les cartilages costaux (expiration)'],
    near: ['Les vaisseaux thoraciques internes passent en avant de lui'],
  },
  'Muscles longs élévateurs des côtes': {
    origin: ['Processus transverses T7–T11'], insertion: ['Deuxième côte au-dessous, près de l’angle'],
    nerve: ['Rameaux dorsaux'], action: ['Élèvent les côtes'],
  },
  'Muscles courts élévateurs des côtes': {
    origin: ['Processus transverses C7–T11'], insertion: ['Côte immédiatement au-dessous, entre tubercule et angle'],
    nerve: ['Rameaux dorsaux'], action: ['Élèvent les côtes, inclinaison du rachis'],
  },
  'Muscle petit pectoral': {
    origin: ['Face externe des côtes 3 à 5, près des cartilages'],
    insertion: ['Processus coracoïde de la scapula (bord médial)'],
    nerve: ['Nerf pectoral médial (C8–T1)'],
    action: ['Abaisse et attire en avant la scapula', 'Inspirateur accessoire si la scapula est fixée'],
    near: ['Divise l’artère axillaire en trois segments (avant, derrière, après lui)'],
  },
  'Muscle subclavier': {
    origin: ['Jonction de la 1re côte et de son cartilage'],
    insertion: ['Sillon du muscle subclavier, face inférieure de la clavicule'],
    nerve: ['Nerf subclavier (C5–C6)'],
    action: ['Abaisse et stabilise la clavicule'],
    note: 'Amortit une fracture de la clavicule et protège les vaisseaux subclaviers.',
  },
  'Partie abdominale du muscle grand pectoral': {
    origin: ['Gaine du muscle droit de l’abdomen (feuillet antérieur)'],
    insertion: ['Lèvre latérale du sillon intertuberculaire de l’humérus, avec les autres faisceaux du grand pectoral'],
    nerve: ['Nerfs pectoraux médial et latéral'],
    action: ['Adduction et rotation médiale du bras ; abaisse le bras levé'],
  },

  // -------------------------------------------------------------- abdomen
  'Muscle droit de l\'abdomen': {
    origin: ['Crête pubienne et symphyse pubienne'],
    insertion: ['Cartilages costaux 5 à 7 et processus xiphoïde'],
    nerve: ['Nerfs intercostaux 7 à 11 et subcostal (T7–T12)'],
    action: ['Fléchit le tronc', 'Comprime l’abdomen', 'Rétroversion du bassin'],
    near: ['Enfermé dans sa gaine ; trois ou quatre intersections tendineuses le recoupent',
      'L’artère épigastrique inférieure monte à sa face profonde'],
  },
  'Muscle oblique externe de l\'abdomen': {
    origin: ['Face externe des côtes 5 à 12, en digitations engrenées avec le dentelé antérieur et le grand dorsal'],
    insertion: ['Lèvre externe de la crête iliaque', 'Ligne blanche par une large aponévrose', 'Tubercule pubien et ligament inguinal (bord inférieur de l’aponévrose)'],
    nerve: ['Nerfs intercostaux 7 à 11 et subcostal'],
    action: ['Bilatéral : flexion du tronc, compression abdominale', 'Unilatéral : rotation du tronc du côté opposé, inclinaison homolatérale'],
    note: 'Son aponévrose forme la paroi antérieure du canal inguinal et l’anneau inguinal superficiel.',
  },
  'Muscle oblique interne de l\'abdomen': {
    origin: ['Fascia thoraco-lombal', 'Ligne intermédiaire de la crête iliaque', 'Deux tiers latéraux du ligament inguinal'],
    insertion: ['Bord inférieur des côtes 10 à 12', 'Ligne blanche par son aponévrose', 'Crête pubienne (tendon conjoint, avec le transverse)'],
    nerve: ['Nerfs intercostaux 7 à 11, subcostal, ilio-hypogastrique et ilio-inguinal'],
    action: ['Flexion et rotation homolatérale du tronc', 'Compression abdominale'],
    note: 'Ses fibres inférieures accompagnent le cordon spermatique : muscle crémaster.',
  },
  'Muscle transverse de l\'abdomen': {
    origin: ['Face interne des cartilages costaux 7 à 12', 'Fascia thoraco-lombal', 'Crête iliaque', 'Tiers latéral du ligament inguinal'],
    insertion: ['Ligne blanche par son aponévrose, crête pubienne (tendon conjoint)'],
    nerve: ['Nerfs intercostaux 7 à 11, subcostal, ilio-hypogastrique, ilio-inguinal'],
    action: ['Comprime l’abdomen (sangle abdominale) : expiration forcée, défécation, accouchement'],
    near: ['Plan neuro-vasculaire de la paroi entre lui et l’oblique interne'],
  },
  'Muscle pyramidal de l\'abdomen': {
    origin: ['Corps du pubis, en avant du droit'], insertion: ['Ligne blanche, à mi-chemin du nombril'],
    nerve: ['Nerf subcostal (T12)'], action: ['Tend la ligne blanche'],
    note: 'Inconstant (absent chez environ 20 % des sujets).',
  },
  'Ligne blanche': {
    what: `Raphé fibreux médian tendu du processus xiphoïde à la symphyse pubienne,
      formé par l’entrecroisement des aponévroses des trois muscles larges.`,
    near: ['L’ombilic la traverse', 'Large au-dessus de l’ombilic, étroite au-dessous'],
    note: 'Lieu des hernies épigastriques et du diastasis des droits ; voie d’abord des laparotomies médianes.',
  },
  'Ligament inguinal': {
    what: `Bord inférieur, épaissi et replié, de l’aponévrose de l’oblique externe,
      tendu de l’épine iliaque antéro-supérieure au tubercule pubien.`,
    near: ['Plancher du canal inguinal', 'Au-dessous : lacune musculaire (ilio-psoas, nerf fémoral) et lacune vasculaire (artère et veine fémorales, canal fémoral)'],
  },
  'Arcade ilio-pectinée': {
    what: `Épaississement du fascia iliaque tendu du ligament inguinal à l’éminence
      ilio-pubienne ; il sépare sous le ligament inguinal la lacune musculaire
      (en dehors) de la lacune vasculaire (en dedans).`,
  },

  // ------------------------------------------------------ bassin, périnée
  'Arc tendineux du muscle élévateur de l’anus': {
    what: `Épaississement du fascia obturateur, du pubis à l’épine ischiatique,
      sur lequel s’insère le muscle ilio-coccygien.`,
  },
  'Muscle pubo-coccygien': {
    origin: ['Face postérieure du corps du pubis', 'Partie antérieure de l’arc tendineux'],
    insertion: ['Ligament ano-coccygien et coccyx', 'Centre tendineux du périnée'],
    nerve: ['Nerf du muscle élévateur de l’anus (S3–S4) et nerf pudendal'],
    action: ['Soutient les viscères pelviens', 'Participe à la continence'],
    note: 'Partie principale du muscle élévateur de l’anus ; sa sangle pubo-rectale crée l’angle ano-rectal.',
  },
  'Muscle ilio-coccygien': {
    origin: ['Arc tendineux du muscle élévateur de l’anus', 'Épine ischiatique'],
    insertion: ['Ligament ano-coccygien et deux dernières pièces du coccyx'],
    nerve: ['Nerf du muscle élévateur de l’anus (S3–S4)'],
    action: ['Soutient le plancher pelvien'],
  },
  'Muscle pubo-anal': {
    what: 'Fibres du pubo-coccygien qui se terminent dans la paroi du canal anal entre les sphincters.',
    nerve: ['Nerf pudendal et nerfs sacraux S3–S4'], action: ['Participe à la continence anale'],
  },
  'Muscle coccygien': {
    origin: ['Épine ischiatique et ligament sacro-épineux'],
    insertion: ['Bords latéraux du coccyx et de la dernière pièce sacrée'],
    nerve: ['Rameaux de S4–S5'],
    action: ['Soutient le plancher pelvien, fléchit le coccyx'],
  },
  'Sphincter anal externe': {
    what: 'Muscle strié qui entoure le canal anal en trois parties : sous-cutanée, superficielle et profonde.',
    insertion: ['Centre tendineux du périnée en avant, ligament ano-coccygien en arrière'],
    nerve: ['Nerf rectal inférieur (branche du pudendal, S2–S4)'],
    action: ['Continence anale volontaire'],
  },

  // -------------------------------------------------------- membre supérieur
  'Muscle brachio-radial': {
    origin: ['Deux tiers supérieurs du bord latéral de l’humérus (crête supra-épicondylaire latérale)'],
    insertion: ['Base du processus styloïde du radius'],
    nerve: ['Nerf radial (C5–C6)'],
    action: ['Fléchit le coude, surtout en position neutre (pouce en haut)'],
    note: 'Seul fléchisseur du coude innervé par le radial ; repère du nerf radial et de l’artère radiale à l’avant-bras.',
  },
  'Muscle long extenseur radial du carpe': {
    origin: ['Tiers inférieur de la crête supra-épicondylaire latérale'],
    insertion: ['Base du 2e métacarpien, face dorsale'],
    nerve: ['Nerf radial (C6–C7)'],
    action: ['Extension et abduction (inclinaison radiale) du poignet'],
  },
  'Court extenseur radial du carpe': {
    origin: ['Épicondyle latéral (tendon commun des extenseurs)'],
    insertion: ['Base du 3e métacarpien, face dorsale'],
    nerve: ['Branche profonde du nerf radial'],
    action: ['Extension du poignet'],
    note: 'Son tendon d’origine est le siège de l’épicondylite (tennis elbow).',
  },
  'Supinateur': {
    origin: ['Épicondyle latéral, ligaments collatéral radial et annulaire, crête du supinateur de l’ulna'],
    insertion: ['Faces latérale, antérieure et postérieure du tiers supérieur du radius'],
    nerve: ['Branche profonde du nerf radial, qui le traverse'],
    action: ['Supination de l’avant-bras'],
    note: 'L’arcade de Fröhse, à son bord supérieur, peut comprimer la branche profonde du radial.',
  },
  'Muscle anconé': {
    origin: ['Face postérieure de l’épicondyle latéral'],
    insertion: ['Face latérale de l’olécrâne et face postérieure de l’ulna'],
    nerve: ['Nerf radial'],
    action: ['Assiste le triceps dans l’extension du coude, stabilise l’articulation'],
  },
  'Long abducteur du pouce': {
    origin: ['Faces postérieures de l’ulna, du radius et membrane interosseuse'],
    insertion: ['Base du 1er métacarpien, bord latéral'],
    nerve: ['Branche profonde du radial (nerf interosseux postérieur)'],
    action: ['Abduction et extension du pouce'],
    note: 'Avec le court extenseur du pouce, il forme le bord latéral de la tabatière anatomique ; ténosynovite de De Quervain.',
  },
  'Court extenseur du pouce': {
    origin: ['Face postérieure du radius et membrane interosseuse'],
    insertion: ['Base de la phalange proximale du pouce'],
    nerve: ['Nerf interosseux postérieur (radial)'],
    action: ['Extension de l’articulation métacarpo-phalangienne du pouce'],
  },
  'Long extenseur du pouce': {
    origin: ['Face postérieure de l’ulna, tiers moyen, et membrane interosseuse'],
    insertion: ['Base de la phalange distale du pouce'],
    nerve: ['Nerf interosseux postérieur (radial)'],
    action: ['Extension du pouce, toutes articulations'],
    note: 'Son tendon contourne le tubercule dorsal (de Lister) et borde en dedans la tabatière anatomique.',
  },
  'Muscle extenseur de l\'index': {
    origin: ['Face postérieure de l’ulna, tiers inférieur'],
    insertion: ['Expansion dorsale de l’index, avec le tendon de l’extenseur des doigts'],
    nerve: ['Nerf interosseux postérieur (radial)'],
    action: ['Extension indépendante de l’index'],
  },
  'Muscle extenseur du petit doigt': {
    origin: ['Épicondyle latéral (tendon commun)'],
    insertion: ['Expansion dorsale du 5e doigt'],
    nerve: ['Nerf interosseux postérieur (radial)'],
    action: ['Extension du petit doigt'],
  },
  'Chef ulnaire du muscle extenseur ulnaire du carpe': {
    what: 'Chef de l’extenseur ulnaire du carpe né du bord postérieur de l’ulna.',
    insertion: ['Base du 5e métacarpien'],
    nerve: ['Nerf interosseux postérieur (radial)'],
    action: ['Extension et adduction (inclinaison ulnaire) du poignet'],
  },
  'Chef ulnaire du muscle fléchisseur ulnaire du carpe': {
    what: 'Chef né du bord médial de l’olécrâne et du bord postérieur de l’ulna ; le nerf ulnaire passe entre ses deux chefs.',
    insertion: ['Os pisiforme, puis hamulus de l’hamatum et base du 5e métacarpien'],
    nerve: ['Nerf ulnaire (C7–T1)'],
    action: ['Flexion et adduction du poignet'],
  },
  'Chef radial du muscle fléchisseur superficiel des doigts': {
    what: 'Chef né de la ligne oblique du radius ; l’artère ulnaire et le nerf médian passent sous l’arcade tendue entre ses chefs.',
    insertion: ['Faces latérales des phalanges moyennes des doigts 2 à 5 (tendons perforés)'],
    nerve: ['Nerf médian'],
    action: ['Flexion des articulations interphalangiennes proximales'],
  },
  'Chef profond du muscle rond pronateur': {
    what: 'Chef né du processus coronoïde de l’ulna ; le nerf médian passe entre ce chef et le chef huméral.',
    insertion: ['Face latérale du radius, à mi-hauteur (empreinte du rond pronateur)'],
    nerve: ['Nerf médian'],
    action: ['Pronation ; flexion accessoire du coude'],
    note: 'Syndrome du rond pronateur : compression du médian entre ses deux chefs.',
  },
  'Long fléchisseur du pouce': {
    origin: ['Face antérieure du radius et membrane interosseuse'],
    insertion: ['Base de la phalange distale du pouce'],
    nerve: ['Nerf interosseux antérieur (médian)'],
    action: ['Flexion de l’interphalangienne du pouce'],
    note: 'Seul fléchisseur de la phalange distale du pouce : test du nerf interosseux antérieur (signe du « O »).',
  },
  'Court abducteur du pouce': {
    origin: ['Rétinaculum des fléchisseurs, tubercules du scaphoïde et du trapèze'],
    insertion: ['Base de la phalange proximale du pouce, côté radial'],
    nerve: ['Branche thénarienne (récurrente) du nerf médian'],
    action: ['Abduction du pouce (le pouce s’écarte en avant de la paume)'],
    note: 'Son amyotrophie est un signe tardif du syndrome du canal carpien.',
  },
  'Chef superficiel du muscle court fléchisseur du pouce': {
    origin: ['Rétinaculum des fléchisseurs et tubercule du trapèze'],
    insertion: ['Base de la phalange proximale du pouce, côté radial (sésamoïde latéral)'],
    nerve: ['Branche thénarienne du nerf médian'],
    action: ['Flexion de la métacarpo-phalangienne du pouce'],
  },
  'Chef profond du muscle court fléchisseur du pouce': {
    origin: ['Trapézoïde et capitatum'],
    insertion: ['Base de la phalange proximale du pouce'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Flexion du pouce'],
  },
  'Muscle opposant du pouce': {
    origin: ['Rétinaculum des fléchisseurs et tubercule du trapèze'],
    insertion: ['Bord latéral et face antérieure du 1er métacarpien'],
    nerve: ['Branche thénarienne du nerf médian'],
    action: ['Opposition : rotation et flexion du 1er métacarpien vers la paume'],
  },
  'Chef oblique du muscle adducteur du pouce': {
    origin: ['Capitatum et bases des 2e et 3e métacarpiens'],
    insertion: ['Sésamoïde médial et base de la phalange proximale du pouce'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Adduction du pouce'],
  },
  'Chef transverse du muscle adducteur du pouce': {
    origin: ['Face antérieure du 3e métacarpien'],
    insertion: ['Base de la phalange proximale du pouce, côté ulnaire'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Adduction du pouce (pince pouce-index)'],
    note: 'Sa paralysie (atteinte du nerf ulnaire) donne le signe de Froment.',
  },
  'Muscle abducteur du petit doigt': {
    origin: ['Os pisiforme et tendon du fléchisseur ulnaire du carpe'],
    insertion: ['Base de la phalange proximale du 5e doigt, côté ulnaire'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Abduction du petit doigt'],
  },
  'Court fléchisseur du petit doigt': {
    origin: ['Hamulus de l’hamatum et rétinaculum des fléchisseurs'],
    insertion: ['Base de la phalange proximale du 5e doigt'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Flexion de la métacarpo-phalangienne du petit doigt'],
  },
  'Muscle opposant du petit doigt': {
    origin: ['Hamulus de l’hamatum et rétinaculum des fléchisseurs'],
    insertion: ['Bord médial du 5e métacarpien'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Amène le 5e métacarpien en avant (creuse la paume)'],
  },
  'Muscles lombricaux de la main': {
    origin: ['Tendons du fléchisseur profond des doigts, dans la paume'],
    insertion: ['Bord radial de l’expansion dorsale des doigts 2 à 5'],
    nerve: ['1er et 2e : nerf médian ; 3e et 4e : nerf ulnaire'],
    action: ['Fléchissent les métacarpo-phalangiennes et étendent les interphalangiennes (position du « scribe »)'],
  },
  'Muscle interosseux dorsaux de la main': {
    origin: ['Faces adjacentes des métacarpiens, par deux chefs'],
    insertion: ['Bases des phalanges proximales et expansions dorsales des doigts 2, 3 (deux côtés) et 4'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Abduction des doigts par rapport à l’axe du 3e doigt (DAB)', 'Flexion des MCP, extension des IP'],
  },
  'Muscles interosseux palmaires': {
    origin: ['Faces palmaires des 2e, 4e et 5e métacarpiens'],
    insertion: ['Expansions dorsales des mêmes doigts'],
    nerve: ['Branche profonde du nerf ulnaire'],
    action: ['Adduction des doigts vers l’axe du 3e doigt (PAD)'],
    note: 'La paralysie des interosseux (nerf ulnaire) donne la griffe ulnaire des 4e et 5e doigts.',
  },

  // -------------------------------------------------------- membre inférieur
  'Muscle jumeau supérieur': {
    origin: ['Épine ischiatique'], insertion: ['Tendon de l’obturateur interne, puis fosse trochantérique'],
    nerve: ['Nerf du muscle obturateur interne (L5–S2)'], action: ['Rotation latérale de la cuisse'],
  },
  'Muscle jumeau inférieur': {
    origin: ['Tubérosité ischiatique, partie supérieure'], insertion: ['Tendon de l’obturateur interne'],
    nerve: ['Nerf du muscle carré fémoral (L4–S1)'], action: ['Rotation latérale de la cuisse'],
  },
  'Muscle carré fémoral': {
    origin: ['Bord latéral de la tubérosité ischiatique'], insertion: ['Tubercule carré de la crête intertrochantérique'],
    nerve: ['Nerf du muscle carré fémoral (L4–S1)'], action: ['Rotation latérale et adduction de la cuisse'],
    note: 'L’artère circonflexe fémorale médiale chemine à son bord supérieur.',
  },
  'Muscle petit adducteur (adductor minimus)': {
    what: 'Faisceau supérieur, quadrilatère, du grand adducteur.',
    origin: ['Branche inférieure du pubis'], insertion: ['Ligne âpre, partie supérieure'],
    nerve: ['Nerf obturateur'], action: ['Adduction et rotation latérale de la cuisse'],
  },
  'Tractus ilio-tibial': {
    what: `Épaississement du fascia lata, de la crête iliaque au tubercule infra-condylaire
      (de Gerdy) du tibia, sur lequel se terminent le tenseur du fascia lata et une
      partie du grand fessier.`,
    action: ['Stabilise le genou en extension et la hanche en appui unipodal'],
    note: 'Son frottement sur l’épicondyle latéral : syndrome de la bandelette ilio-tibiale du coureur.',
  },
  'Muscle poplité': {
    origin: ['Face latérale du condyle latéral du fémur', 'Ménisque latéral'],
    insertion: ['Face postérieure du tibia, au-dessus de la ligne du soléaire'],
    nerve: ['Nerf tibial (L4–S1)'],
    action: ['« Déverrouille » le genou en extension : rotation médiale du tibia (ou latérale du fémur)'],
  },
  'Muscle plantaire': {
    origin: ['Ligne supracondylaire latérale du fémur'], insertion: ['Tendon calcanéen ou bord médial du calcanéus'],
    nerve: ['Nerf tibial'], action: ['Faible fléchisseur plantaire et du genou'],
    note: 'Tendon très long et fin, prélevé pour les greffes tendineuses ; inconstant.',
  },
  'Tendon calcanéen (d’Achille)': {
    what: `Tendon commun du triceps sural (gastrocnémien et soléaire), le plus épais
      et le plus résistant du corps.`,
    insertion: ['Partie moyenne de la face postérieure du calcanéus'],
    action: ['Flexion plantaire de la cheville (appui sur la pointe du pied, propulsion)'],
    note: 'Réflexe achilléen : S1. Rupture typique lors d’une poussée brutale.',
  },
  'Muscle long extenseur de l\'hallux': {
    origin: ['Face médiale de la fibula, tiers moyen, et membrane interosseuse'],
    insertion: ['Base de la phalange distale de l’hallux'],
    nerve: ['Nerf fibulaire profond (L5)'],
    action: ['Extension de l’hallux, flexion dorsale de la cheville'],
    note: 'Test moteur de la racine L5.',
  },
  'Tendon du muscle long extenseur des orteils': {
    what: 'Tendons du long extenseur des orteils, qui se divisent sous le rétinaculum en quatre pour les orteils 2 à 5.',
    insertion: ['Phalanges moyennes et distales des orteils 2 à 5 (expansions dorsales)'],
    action: ['Extension des orteils, flexion dorsale de la cheville'],
  },
  'Muscle court extenseur de l’hallux': {
    origin: ['Face dorsale du calcanéus'], insertion: ['Base de la phalange proximale de l’hallux'],
    nerve: ['Nerf fibulaire profond'], action: ['Extension de l’hallux'],
  },
  'Court extenseur des orteils': {
    origin: ['Face dorsale du calcanéus'], insertion: ['Tendons du long extenseur des orteils 2 à 4'],
    nerve: ['Nerf fibulaire profond'], action: ['Extension des orteils 2 à 4'],
  },
  'Muscle long fléchisseur de l\'hallux': {
    origin: ['Face postérieure de la fibula, deux tiers inférieurs'],
    insertion: ['Base de la phalange distale de l’hallux'],
    nerve: ['Nerf tibial (S1–S2)'],
    action: ['Flexion de l’hallux, flexion plantaire, soutien de l’arche longitudinale médiale'],
    near: ['Son tendon passe sous le sustentaculum tali, dans un sillon du talus'],
  },
  'Abducteur de l\'hallux': {
    origin: ['Processus médial de la tubérosité du calcanéus'], insertion: ['Base de la phalange proximale de l’hallux, côté médial'],
    nerve: ['Nerf plantaire médial'], action: ['Abduction de l’hallux, soutien de l’arche médiale'],
  },
  'Chef médial du muscle court fléchisseur de l’hallux': {
    origin: ['Cuboïde et cunéiforme latéral'], insertion: ['Sésamoïde médial et base de la phalange proximale de l’hallux'],
    nerve: ['Nerf plantaire médial'], action: ['Flexion de la métatarso-phalangienne de l’hallux'],
  },
  'Chef latéral du muscle court fléchisseur de l’hallux': {
    origin: ['Cuboïde et cunéiforme latéral'], insertion: ['Sésamoïde latéral et base de la phalange proximale'],
    nerve: ['Nerf plantaire médial'], action: ['Flexion de l’hallux'],
  },
  'Chef oblique du muscle adducteur de l’hallux': {
    origin: ['Bases des métatarsiens 2 à 4'], insertion: ['Sésamoïde latéral et base de la phalange proximale de l’hallux'],
    nerve: ['Nerf plantaire latéral'], action: ['Adduction de l’hallux, soutien de l’arche transversale'],
  },
  'Chef transverse du muscle adducteur de l’hallux': {
    origin: ['Ligaments plantaires des métatarso-phalangiennes 3 à 5'], insertion: ['Base de la phalange proximale de l’hallux'],
    nerve: ['Nerf plantaire latéral'], action: ['Adduction de l’hallux, maintient l’arche transversale antérieure'],
  },
  'Court fléchisseur des orteils': {
    origin: ['Processus médial de la tubérosité du calcanéus, aponévrose plantaire'],
    insertion: ['Phalanges moyennes des orteils 2 à 5 (tendons perforés)'],
    nerve: ['Nerf plantaire médial'], action: ['Flexion des orteils'],
  },
  'Muscle carré plantaire': {
    origin: ['Faces médiale et inférieure du calcanéus, par deux chefs'],
    insertion: ['Bord latéral du tendon du long fléchisseur des orteils'],
    nerve: ['Nerf plantaire latéral'], action: ['Redresse la traction oblique du long fléchisseur des orteils'],
  },
  'Abducteur du petit orteil': {
    origin: ['Processus latéral et médial de la tubérosité du calcanéus'], insertion: ['Base de la phalange proximale du 5e orteil'],
    nerve: ['Nerf plantaire latéral'], action: ['Abduction et flexion du 5e orteil'],
  },
  'Muscle court fléchisseur du petit orteil': {
    origin: ['Base du 5e métatarsien'], insertion: ['Base de la phalange proximale du 5e orteil'],
    nerve: ['Nerf plantaire latéral'], action: ['Flexion du 5e orteil'],
  },
  'Muscle opposant du petit orteil': {
    what: 'Faisceau inconstant du court fléchisseur du petit orteil.',
    insertion: ['Bord latéral du 5e métatarsien'], nerve: ['Nerf plantaire latéral'],
  },
  'Muscles lombricaux du pied': {
    origin: ['Tendons du long fléchisseur des orteils'], insertion: ['Bord médial des expansions dorsales des orteils 2 à 5'],
    nerve: ['1er : nerf plantaire médial ; 2e à 4e : nerf plantaire latéral'],
    action: ['Flexion des métatarso-phalangiennes, extension des interphalangiennes'],
  },
  'Muscles interosseux dorsaux du pied': {
    origin: ['Faces adjacentes des métatarsiens'], insertion: ['Bases des phalanges proximales des orteils 2 (deux côtés), 3 et 4'],
    nerve: ['Nerf plantaire latéral'], action: ['Abduction des orteils par rapport à l’axe du 2e orteil'],
  },
  'Muscles interosseux plantaires': {
    origin: ['Faces médiales des métatarsiens 3 à 5'], insertion: ['Bases des phalanges proximales des mêmes orteils'],
    nerve: ['Nerf plantaire latéral'], action: ['Adduction des orteils 3 à 5 vers le 2e'],
  },
};
