// Descriptions for structures the whole body shows and no regional model
// described — first of all the nerves of the limbs, which a student has to
// learn as a course (origin, path, branches, territory) and which the source's
// French definitions skip.
//
// Same rules as lib/anatomy/notes.js: written here, not scraped; standard
// descriptive anatomy under the Terminologia Anatomica, with the older French
// term in brackets where a teacher still uses it. Keyed by the French name the
// body uses (lib/anatomy/body-names.js), without the side.
//
// Read by scripts/carve-body.mjs only, into public/anatomy/body/*.defs.json.

export const BODY_NOTES = {
  // ------------------------------------------------------- plexus brachial
  'Racines du plexus brachial': {
    what: `Branches ventrales des nerfs spinaux C5, C6, C7, C8 et T1, entre les
      muscles scalènes antérieur et moyen.`,
    branches: ['Nerf dorsal de la scapula (C5)', 'Nerf thoracique long (C5–C7)',
      'Participation au nerf phrénique (C5)'],
    near: ['Passent dans le défilé interscalénique avec l’artère subclavière',
      'La veine subclavière passe en avant du scalène antérieur'],
    note: `Moyen mnémotechnique de l’organisation : Racines, Troncs, Divisions,
      Faisceaux, Branches terminales.`,
  },
  'Tronc supérieur du plexus brachial': {
    what: 'Union des racines C5 et C6, au bord latéral du scalène antérieur.',
    branches: ['Nerf suprascapulaire', 'Nerf subclavier',
      'Division antérieure et division postérieure'],
    note: `Une traction brutale de l’épaule vers le bas l’étire : paralysie
      d’Erb-Duchenne, bras en « pourboire de garçon de café ».`,
  },
  'Tronc moyen du plexus brachial': {
    what: 'Prolongement de la seule racine C7.',
    branches: ['Division antérieure (→ faisceau latéral)', 'Division postérieure (→ faisceau postérieur)'],
  },
  'Tronc inférieur du plexus brachial': {
    what: 'Union des racines C8 et T1, posé sur la première côte, derrière l’artère subclavière.',
    branches: ['Division antérieure (→ faisceau médial)', 'Division postérieure (→ faisceau postérieur)'],
    note: `Une traction du bras vers le haut l’arrache : paralysie de
      Klumpke, main en griffe, parfois syndrome de Claude Bernard-Horner.`,
  },
  'Faisceau postérieur du plexus brachial': {
    what: `Réunion des trois divisions postérieures, en arrière de l’artère
      axillaire.`,
    branches: ['Nerfs subscapulaires supérieur et inférieur', 'Nerf thoraco-dorsal',
      'Nerf axillaire (branche terminale)', 'Nerf radial (branche terminale)'],
    supplies: ['Les muscles extenseurs du membre supérieur'],
  },
  'Nerf dorsal de la scapula': {
    what: 'Branche de la racine C5, qui traverse le scalène moyen.',
    supplies: ['Muscle élévateur de la scapula', 'Muscles rhomboïdes'],
  },
  'Nerf médian': {
    what: `Nerf mixte, né par deux racines des faisceaux latéral (C6–C7) et
      médial (C8–T1), qui forment la « fourche » en avant de l’artère axillaire.`,
    origin: ['Racine latérale : faisceau latéral (C6–C7)', 'Racine médiale : faisceau médial (C8–T1)'],
    course: ['Bras : longe l’artère brachiale, la croise de dehors en dedans, sans donner de branche',
      'Coude : passe entre les deux chefs du rond pronateur',
      'Avant-bras : entre fléchisseur superficiel et fléchisseur profond des doigts',
      'Poignet : traverse le canal carpien, sous le rétinaculum des fléchisseurs'],
    branches: ['Rameaux musculaires de la loge antérieure de l’avant-bras',
      'Nerf interosseux antérieur', 'Rameau palmaire (avant le canal carpien)',
      'Rameau thénarien (récurrent)', 'Nerfs digitaux palmaires communs et propres'],
    supplies: ['Moteur : tous les muscles de la loge antérieure de l’avant-bras sauf le fléchisseur ulnaire du carpe et la moitié médiale du fléchisseur profond',
      'Moteur : muscles de l’éminence thénar (court abducteur, opposant, chef superficiel du court fléchisseur) et lombricaux I–II',
      'Sensitif : face palmaire des trois premiers doigts et demi, face dorsale de leurs deux dernières phalanges'],
    note: `Compression au canal carpien : paresthésies des trois premiers doigts,
      puis amyotrophie thénarienne. Section au coude : « main de prédicateur ».`,
  },
  'Nerf interosseux antérieur': {
    what: 'Branche du nerf médian au tiers supérieur de l’avant-bras, sur la membrane interosseuse.',
    supplies: ['Long fléchisseur du pouce', 'Moitié latérale du fléchisseur profond des doigts',
      'Carré pronateur'],
    note: 'Purement moteur : sa lésion empêche de faire « OK » avec le pouce et l’index.',
  },
  'Nerf ulnaire': {
    what: 'Nerf mixte, branche terminale du faisceau médial du plexus brachial (C8–T1).',
    origin: ['Faisceau médial du plexus brachial (C8, T1)'],
    course: ['Bras : médial à l’artère brachiale, puis traverse le septum intermusculaire médial',
      'Coude : dans la gouttière épitrochléo-olécrânienne, derrière l’épicondyle médial',
      'Avant-bras : sous le fléchisseur ulnaire du carpe, avec l’artère ulnaire',
      'Poignet : canal ulnaire (de Guyon), en avant du rétinaculum des fléchisseurs'],
    branches: ['Rameaux musculaires de l’avant-bras', 'Branche dorsale', 'Rameau palmaire',
      'Branche superficielle (sensitive)', 'Branche profonde (motrice)'],
    supplies: ['Moteur : fléchisseur ulnaire du carpe, moitié médiale du fléchisseur profond des doigts',
      'Moteur : éminence hypothénar, interosseux, lombricaux III–IV, adducteur du pouce, chef profond du court fléchisseur du pouce',
      'Sensitif : petit doigt et moitié médiale de l’annulaire, bord médial de la main'],
    note: `Le nerf qu’on se cogne au coude, contre l’épicondyle médial. Lésion :
      griffe ulnaire des deux derniers doigts, signe de Froment (le pouce
      fléchit pour pincer, faute d’adducteur).`,
  },
  'Branche profonde du nerf ulnaire': {
    what: 'Branche motrice du nerf ulnaire, née dans le canal ulnaire, qui suit l’arcade palmaire profonde.',
    supplies: ['Muscles hypothénariens', 'Tous les interosseux', 'Lombricaux III et IV',
      'Adducteur du pouce', 'Chef profond du court fléchisseur du pouce'],
  },
  'Branche superficielle du nerf ulnaire': {
    what: 'Branche sensitive, à la sortie du canal ulnaire.',
    supplies: ['Court palmaire (moteur)', 'Peau palmaire du petit doigt et de la moitié médiale de l’annulaire'],
  },
  'Branche dorsale du nerf ulnaire': {
    what: 'Naît au tiers inférieur de l’avant-bras et contourne l’ulna vers le dos de la main.',
    supplies: ['Peau de la moitié médiale du dos de la main et des doigts IV et V'],
  },
  'Branche profonde du nerf radial': {
    what: `Branche motrice du nerf radial, née au coude, qui traverse le muscle
      supinateur pour devenir le nerf interosseux postérieur.`,
    supplies: ['Court extenseur radial du carpe', 'Supinateur', 'Les muscles de la loge postérieure de l’avant-bras'],
    note: 'Compression dans l’arcade de Fröhse : main tombante sans trouble sensitif.',
  },
  'Nerf interosseux postérieur': {
    what: 'Suite de la branche profonde du nerf radial après le supinateur, sur la membrane interosseuse.',
    supplies: ['Extenseurs des doigts, de l’index et du petit doigt', 'Extenseur ulnaire du carpe',
      'Long abducteur, court et long extenseurs du pouce'],
  },
  'Branche superficielle du nerf radial': {
    what: `Branche sensitive du nerf radial, sous le muscle brachio-radial, puis
      sous la peau au tiers inférieur de l’avant-bras.`,
    supplies: ['Peau de la moitié latérale du dos de la main et des trois premiers doigts et demi (sauf leurs dernières phalanges)'],
    note: 'Territoire autonome : la face dorsale de la première commissure.',
  },
  'Nerf cutané médial de l’avant-bras': {
    what: 'Branche du faisceau médial (C8–T1), sensitive.',
    supplies: ['Peau de la face médiale de l’avant-bras, par ses branches antérieure et postérieure'],
  },
  'Nerf cutané latéral de l’avant-bras': {
    what: `Terminaison sensitive du nerf musculo-cutané, qui sort au coude
      entre biceps et brachial.`,
    supplies: ['Peau de la face latérale de l’avant-bras'],
  },

  // ------------------------------------------------------------- tronc
  'Nerfs intercostaux': {
    what: 'Branches ventrales des nerfs spinaux T1 à T11, chacune dans son espace intercostal.',
    course: ['Dans le sillon costal, sous la côte, au-dessous de la veine et de l’artère intercostales (ordre VAN de haut en bas)',
      'Entre muscles intercostaux interne et intime'],
    supplies: ['Muscles intercostaux', 'Les six derniers : muscles de la paroi abdominale antérolatérale',
      'Peau du thorax et de l’abdomen, en bandes (dermatomes)'],
    note: 'Ponction pleurale au bord supérieur de la côte inférieure, pour éviter le paquet.',
  },
  'Tronc sympathique': {
    what: `Chaîne de ganglions reliés par des rameaux interganglionnaires, de
      chaque côté de la colonne vertébrale, de la base du crâne au coccyx.`,
    parts: ['Partie cervicale : ganglions cervicaux supérieur, moyen et inférieur (stellaire)',
      'Partie thoracique : environ onze ganglions', 'Parties lombale et sacrale',
      'Les deux chaînes se rejoignent en avant du coccyx (ganglion impar)'],
    branches: ['Rameaux communicants blancs et gris', 'Nerfs splanchniques (grand, petit, imus)'],
  },
  'Queue de cheval': {
    what: `Racines des nerfs lombaux, sacraux et coccygien, qui descendent dans
      le sac dural au-dessous du cône médullaire (vers L1–L2).`,
    note: `C’est pourquoi la ponction lombaire se fait en L3–L4 ou L4–L5 : les
      racines s’écartent de l’aiguille, la moelle est plus haut.`,
  },

  // ---------------------------------------------------------- plexus lombal
  'Nerf ilio-hypogastrique': {
    what: 'Branche de L1 (et T12), qui émerge au bord latéral du grand psoas.',
    supplies: ['Muscles transverse et oblique interne de l’abdomen',
      'Peau de la région glutéale latérale et de la région pubienne'],
  },
  'Nerf ilio-inguinal': {
    what: 'Branche de L1, sous le nerf ilio-hypogastrique ; traverse le canal inguinal et sort par l’anneau inguinal superficiel.',
    supplies: ['Muscles larges de l’abdomen (partie basse)', 'Peau de la racine de la cuisse, du scrotum ou de la grande lèvre'],
  },
  'Nerf génito-fémoral': {
    what: 'Branche de L1–L2 qui perfore le grand psoas et descend sur sa face antérieure.',
    branches: ['Rameau génital : canal inguinal, muscle crémaster', 'Rameau fémoral : peau du triangle fémoral'],
    note: 'Support du réflexe crémastérien (L1–L2).',
  },
  'Nerf cutané latéral de la cuisse': {
    what: 'Branche de L2–L3, purement sensitive, qui passe sous le ligament inguinal près de l’épine iliaque antérosupérieure.',
    supplies: ['Peau de la face latérale de la cuisse'],
    note: 'Sa compression sous le ligament inguinal donne la méralgie paresthésique.',
  },
  'Nerf fémoral': {
    what: 'Branche terminale la plus volumineuse du plexus lombal (L2–L4).',
    origin: ['Branches postérieures de L2, L3, L4'],
    course: ['Dans la gouttière entre grand psoas et iliaque', 'Sous le ligament inguinal, latéral à l’artère fémorale (lacune musculaire)',
      'Se divise dans le triangle fémoral (de Scarpa)'],
    branches: ['Rameaux musculaires', 'Rameaux cutanés antérieurs', 'Nerf saphène'],
    supplies: ['Moteur : iliaque, pectiné, sartorius, quadriceps fémoral',
      'Sensitif : face antérieure de la cuisse ; par le saphène, face médiale de la jambe et du pied'],
    note: 'Lésion : extension du genou impossible, réflexe rotulien (L4) aboli.',
  },
  'Nerf saphène': {
    what: 'Branche sensitive terminale du nerf fémoral, la plus longue.',
    course: ['Accompagne l’artère fémorale dans le canal des adducteurs (de Hunter)',
      'Devient superficiel à la face médiale du genou', 'Descend avec la grande veine saphène'],
    supplies: ['Peau de la face médiale du genou, de la jambe et du bord médial du pied'],
  },
  'Nerf obturateur': {
    what: 'Branche du plexus lombal (L2–L4, divisions antérieures).',
    course: ['Au bord médial du grand psoas', 'Paroi latérale du petit bassin', 'Traverse le canal obturateur'],
    branches: ['Branche antérieure', 'Branche postérieure'],
    supplies: ['Moteur : muscles adducteurs (long, court, grand), gracile, obturateur externe',
      'Sensitif : face médiale de la cuisse'],
  },

  // ---------------------------------------------------------- plexus sacral
  'Nerf glutéal supérieur': {
    what: 'Branche du plexus sacral (L4–S1) qui sort par la grande incisure ischiatique au-dessus du piriforme.',
    supplies: ['Moyen et petit fessiers', 'Tenseur du fascia lata'],
    note: 'Lésion : signe de Trendelenburg, le bassin bascule du côté opposé à l’appui.',
  },
  'Nerf ischiatique (sciatique)': {
    what: 'Le plus gros nerf du corps, branche terminale du plexus sacral (L4–S3).',
    origin: ['Plexus sacral, L4 à S3'],
    course: ['Sort du bassin par la grande incisure ischiatique, sous le piriforme',
      'Descend entre ischion et grand trochanter, sous le grand fessier',
      'Région postérieure de la cuisse, sous le chef long du biceps fémoral',
      'Se divise au sommet du creux poplité en nerfs tibial et fibulaire commun'],
    branches: ['Rameaux des muscles ischio-jambiers et du grand adducteur', 'Nerf tibial', 'Nerf fibulaire commun'],
    supplies: ['Muscles de la loge postérieure de la cuisse', 'Par ses branches : tous les muscles de la jambe et du pied',
      'Sensitif : jambe et pied, sauf le territoire du saphène'],
    note: `Injection intramusculaire au quadrant supéro-latéral de la fesse pour
      l’éviter.`,
  },
  'Nerf tibial': {
    what: 'Branche terminale médiale du nerf ischiatique (L4–S3).',
    course: ['Traverse le creux poplité, superficiel aux vaisseaux poplités',
      'Passe sous l’arcade du soléaire', 'Loge postérieure profonde de la jambe',
      'Contourne la malléole médiale dans le canal tarsien et s’y divise'],
    branches: ['Nerf cutané sural médial', 'Rameaux musculaires', 'Nerfs plantaires médial et latéral'],
    supplies: ['Muscles de la loge postérieure de la jambe (fléchisseurs plantaires)', 'Muscles plantaires, par les nerfs plantaires',
      'Peau de la plante du pied'],
    note: 'Lésion : marche sur les talons impossible, réflexe achilléen (S1) aboli.',
  },
  'Nerf fibulaire commun': {
    what: 'Branche terminale latérale du nerf ischiatique (L4–S2).',
    course: ['Longe le tendon du biceps fémoral', 'Contourne le col de la fibula, sous la peau',
      'Se divise dans le muscle long fibulaire'],
    branches: ['Rameau communicant sural', 'Nerf fibulaire superficiel', 'Nerf fibulaire profond'],
    note: `Le nerf le plus souvent lésé du membre inférieur, au col de la fibula
      (plâtre, fracture, jambes croisées) : pied tombant, steppage.`,
  },
  'Nerf fibulaire superficiel': {
    what: 'Branche du nerf fibulaire commun, dans la loge latérale de la jambe.',
    supplies: ['Muscles long et court fibulaires (éversion du pied)',
      'Peau du bas de la jambe et du dos du pied, sauf la première commissure'],
  },
  'Nerf fibulaire profond': {
    what: 'Branche du nerf fibulaire commun, dans la loge antérieure de la jambe, avec l’artère tibiale antérieure.',
    supplies: ['Tibial antérieur, long extenseur des orteils, long extenseur de l’hallux, troisième fibulaire',
      'Court extenseur des orteils et de l’hallux', 'Peau de la première commissure dorsale'],
    note: 'Lésion : pied tombant, mais l’éversion reste possible (nerf fibulaire superficiel intact).',
  },
  'Nerf sural': {
    what: `Nerf sensitif, formé par le nerf cutané sural médial (du tibial) et le
      rameau communicant du fibulaire commun.`,
    course: ['Descend avec la petite veine saphène', 'Passe derrière la malléole latérale'],
    supplies: ['Peau du bord latéral du pied et du petit orteil'],
    note: 'Le nerf prélevé pour les biopsies et les greffes nerveuses.',
  },
  'Nerf plantaire médial': {
    what: 'Branche terminale du nerf tibial, l’équivalent du nerf médian à la main.',
    supplies: ['Abducteur et court fléchisseur de l’hallux, court fléchisseur des orteils, premier lombrical',
      'Peau des trois premiers orteils et demi à la plante'],
  },
  'Nerf plantaire latéral': {
    what: 'Branche terminale du nerf tibial, l’équivalent du nerf ulnaire à la main.',
    supplies: ['Les autres muscles plantaires : carré plantaire, abducteur et court fléchisseur du petit orteil, interosseux, lombricaux II–IV, adducteur de l’hallux',
      'Peau du petit orteil et de la moitié latérale du quatrième'],
  },
  'Nerf cutané postérieur de la cuisse': {
    what: 'Branche sensitive du plexus sacral (S1–S3), sous le piriforme, qui descend sous le fascia de la cuisse.',
    supplies: ['Peau du bas de la fesse, de la face postérieure de la cuisse et du creux poplité'],
  },
  'Nerf pudendal': {
    what: `Nerf du périnée (S2–S4), qui sort du bassin sous le piriforme,
      contourne l’épine ischiatique et rentre par la petite incisure ischiatique.`,
    course: ['Canal pudendal (d’Alcock), sur la paroi latérale de la fosse ischio-anale'],
    branches: ['Nerf rectal inférieur', 'Nerfs périnéaux', 'Nerf dorsal du pénis ou du clitoris'],
    supplies: ['Sphincter externe de l’anus et de l’urètre, muscles du périnée', 'Peau du périnée et des organes génitaux externes'],
  },
};
