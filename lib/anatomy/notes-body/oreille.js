// The ear from the scanner (scripts/carve-oreille.mjs): a CT of a temporal
// bone, every structure segmented on it. Written here in French like the rest
// of the body's descriptions, under Terminologia Anatomica with the older
// French name in brackets where a teacher still says it.

export const EAR_NOTES = {
  'Os temporal — rocher et mastoïde (scanner)': {
    what: 'Les parties pétreuse et mastoïdienne de l’os temporal, reconstruites à partir d’un scanner haute résolution d’un rocher : on y voit les cavités que l’os contient — conduit auditif externe, caisse du tympan, antre et cellules mastoïdiennes, conduit auditif interne, canal carotidien.',
    parts: [
      'Partie squameuse (écaille) : en haut, paroi latérale de la fosse temporale',
      'Partie tympanique : lame en gouttière sous le conduit auditif externe',
      'Partie pétreuse (rocher) : pyramide couchée, base latérale, apex antéro-médial ; elle contient l’oreille moyenne et l’oreille interne',
      'Partie mastoïdienne : en arrière du conduit auditif externe, creusée de cellules aériques reliées à la caisse par l’antre mastoïdien',
    ],
    relief: [
      'Conduit auditif externe (méat acoustique externe) : environ 2,5 cm, tiers latéral cartilagineux, deux tiers médiaux osseux ; fermé en dedans par la membrane du tympan',
      'Conduit auditif interne (méat acoustique interne) : face postérieure du rocher ; nerfs facial (VII), intermédiaire et vestibulo-cochléaire (VIII), artère labyrinthique',
      'Caisse du tympan : cavité de l’oreille moyenne, entre la membrane du tympan et le labyrinthe ; l’attique (récessus épitympanique) au-dessus, l’aditus ad antrum en arrière',
      'Antre mastoïdien et cellules mastoïdiennes',
      'Canal carotidien : coudé dans le rocher, contient l’artère carotide interne',
      'Fosse jugulaire : sous le rocher, loge le bulbe de la veine jugulaire interne',
      'Processus mastoïde et processus styloïde, et entre eux le foramen stylo-mastoïdien (sortie du nerf facial)',
    ],
    near: [
      'En haut : fosse cérébrale moyenne et lobe temporal, séparés de la caisse par le tegmen tympani, lame osseuse mince',
      'En arrière : fosse cérébrale postérieure ; sinus sigmoïde dans son sillon sur la face endocrânienne de la mastoïde',
      'En avant et en dedans : artère carotide interne, trompe auditive',
    ],
    note: 'Scanner d’un rocher isolé (atlas SPL de l’oreille), mis à la taille et à la place de l’oreille du corps entier. Les cellules mastoïdiennes sont réelles ; le contour externe est coupé là où s’arrêtait le champ du scanner.',
  },

  'Cochlée': {
    what: 'Partie antérieure du labyrinthe osseux : un tube enroulé en spirale de deux tours et demi à deux tours trois quarts autour d’un axe osseux, le modiolus. Elle contient le conduit cochléaire et l’organe spiral (de Corti), organe de l’audition.',
    parts: [
      'Base : tournée vers le fond du conduit auditif interne, percée pour les fibres du nerf cochléaire (aire cochléaire)',
      'Apex (coupole) : dirigé en avant et en dehors',
      'Modiolus : axe conique creux, contient le ganglion spiral',
      'Lame spirale osseuse : s’enroule autour du modiolus et sépare, avec la membrane basilaire, la rampe vestibulaire (en haut) de la rampe tympanique (en bas)',
      'Canal spiral : environ 30 à 35 mm de long',
    ],
    relief: [
      'Promontoire : saillie du premier tour sur la paroi médiale de la caisse du tympan',
      'Fenêtre de la cochlée (ronde) : termine la rampe tympanique, fermée par la membrane tympanique secondaire',
      'Hélicotrème : à l’apex, fait communiquer les rampes vestibulaire et tympanique',
    ],
    contents: [
      'Périlymphe dans les rampes vestibulaire et tympanique',
      'Conduit cochléaire (rampe moyenne), rempli d’endolymphe, avec l’organe spiral (de Corti) sur la membrane basilaire',
    ],
    nerve: ['Nerf cochléaire (VIII) : neurones du ganglion spiral, dans le modiolus'],
    vessels: ['Artère labyrinthique, branche de l’artère cérébelleuse antéro-inférieure (parfois de l’artère basilaire) : artère terminale, son occlusion donne une surdité brusque'],
    near: [
      'En dehors : caisse du tympan (promontoire)',
      'En arrière : vestibule',
      'En dedans : fond du conduit auditif interne',
      'En avant : canal carotidien et artère carotide interne',
    ],
    note: 'Les sons aigus sont reçus à la base de la cochlée, les graves à l’apex (tonotopie) : la surdité due au bruit et à l’âge commence par les aigus.',
  },

  'Vestibule et canaux semi-circulaires': {
    what: 'Partie centrale et postérieure du labyrinthe osseux : le vestibule, cavité ovoïde au milieu, et les trois canaux semi-circulaires qui s’y ouvrent. Ils contiennent l’utricule, le saccule et les conduits semi-circulaires, organes de l’équilibre.',
    parts: [
      'Vestibule : entre la caisse du tympan en dehors et le conduit auditif interne en dedans ; la fenêtre du vestibule (ovale) s’ouvre sur sa paroi latérale',
      'Canal semi-circulaire antérieur (supérieur) : vertical, perpendiculaire à l’axe du rocher ; il soulève l’éminence arquée',
      'Canal semi-circulaire postérieur : vertical, parallèle à l’axe du rocher',
      'Canal semi-circulaire latéral : presque horizontal ; il saille dans l’aditus ad antrum',
      'Ampoules : une extrémité renflée par canal ; les canaux antérieur et postérieur s’unissent par l’autre extrémité en un pilier commun — cinq orifices dans le vestibule',
    ],
    contents: [
      'Utricule et saccule : macules, sensibles aux accélérations linéaires et à la pesanteur',
      'Conduits semi-circulaires : crêtes ampullaires, sensibles aux rotations de la tête',
      'Endolymphe dans le labyrinthe membraneux, périlymphe autour',
      'Conduit endolymphatique, vers le sac endolymphatique sous la dure-mère de la face postérieure du rocher',
    ],
    nerve: ['Nerf vestibulaire (VIII), ganglion vestibulaire (de Scarpa) : rameau supérieur (utricule, canaux antérieur et latéral), rameau inférieur (saccule, canal postérieur)'],
    near: [
      'En dehors : caisse du tympan — fenêtre du vestibule et platine de l’étrier',
      'Au-dessus et en dehors : canal du nerf facial',
      'En avant : cochlée',
    ],
    note: 'Les trois canaux d’un côté sont perpendiculaires entre eux. Le canal latéral d’un côté est dans le plan de celui de l’autre ; l’antérieur d’un côté est parallèle au postérieur de l’autre. Le vertige positionnel paroxystique bénin vient le plus souvent du canal postérieur.',
  },

  'Lame spirale osseuse': {
    what: 'Mince lame d’os enroulée autour du modiolus comme le filet d’une vis, à mi-hauteur du canal spiral de la cochlée. La membrane basilaire la prolonge jusqu’à la paroi externe et ferme la séparation entre rampe vestibulaire et rampe tympanique.',
    parts: ['Limbe spiral, sur son bord libre : la membrane tectoriale s’y attache'],
    contents: ['Les fibres du nerf cochléaire, entre ses deux feuillets, vers l’organe spiral'],
    near: [
      'Au-dessus : rampe vestibulaire',
      'Au-dessous : rampe tympanique',
      'Au bord libre : conduit cochléaire et organe spiral (de Corti)',
    ],
  },

  'Fenêtre de la cochlée (ronde)': {
    what: 'Orifice de la paroi médiale de la caisse du tympan, en arrière et au-dessous du promontoire, au fond d’une fossette. Il termine la rampe tympanique et il est fermé par la membrane tympanique secondaire.',
    action: ['La membrane tympanique secondaire bombe vers la caisse quand la platine de l’étrier s’enfonce dans la fenêtre du vestibule : la périlymphe est incompressible et ne bouge que si une fenêtre recule quand l’autre avance'],
    near: [
      'Au-dessus : promontoire (premier tour de la cochlée)',
      'En haut et en avant : fenêtre du vestibule et platine de l’étrier',
    ],
  },

  'Membrane du tympan': {
    what: 'Cloison mince, ovale, gris nacré, entre le conduit auditif externe et la caisse du tympan : environ 9 × 10 mm, inclinée en bas, en avant et en dedans, tirée vers la caisse en un cône dont le sommet est l’ombilic.',
    parts: [
      'Pars tensa : la plus grande partie, tendue ; trois couches — épiderme, couche fibreuse (radiaire et circulaire), muqueuse',
      'Pars flaccida (membrane de Shrapnell) : petite partie au-dessus des plis malléaires, sans couche fibreuse',
      'Ombilic : extrémité du manche du marteau, au centre',
      'Proéminence malléaire : soulevée par le processus latéral du marteau',
    ],
    relief: [
      'À l’otoscope, le triangle lumineux en avant et en bas de l’ombilic',
      'Quatre quadrants, par la ligne du manche du marteau et sa perpendiculaire à l’ombilic ; la paracentèse se fait classiquement dans le quadrant postéro-inférieur, loin des osselets',
    ],
    nerve: [
      'Face externe : nerf auriculo-temporal (V3) et rameau auriculaire du nerf vague (X)',
      'Face interne : nerf glosso-pharyngien (IX), par le plexus tympanique',
    ],
    near: [
      'Le manche du marteau est inclus dans sa couche fibreuse',
      'La corde du tympan croise sa face interne, entre le marteau et l’enclume',
    ],
  },

  'Malléus (marteau)': {
    what: 'Le plus latéral et le plus long des osselets (8 à 9 mm) : son manche est pris dans la membrane du tympan, sa tête, dans l’attique, s’articule avec l’enclume.',
    parts: [
      'Tête : dans le récessus épitympanique (attique), facette articulaire en arrière pour le corps de l’enclume',
      'Col',
      'Manche (manubrium) : inclus dans la membrane du tympan jusqu’à l’ombilic',
      'Processus latéral : soulève la membrane (proéminence malléaire)',
      'Processus antérieur : vers la fissure pétro-tympanique, tenu par le ligament antérieur du marteau',
    ],
    joints: ['Articulation incudo-malléaire, avec le corps de l’enclume'],
    muscles: ['Muscle tenseur du tympan : sur le manche, près du col'],
    action: ['Transmet les vibrations de la membrane du tympan à l’enclume. Le levier des osselets et surtout le rapport des surfaces tympan / platine (environ 17 fois) adaptent l’air à la périlymphe'],
    near: ['La corde du tympan passe en dedans du col'],
  },

  'Incus (enclume)': {
    what: 'L’osselet du milieu, entre le marteau et l’étrier : un corps dans l’attique et deux branches.',
    parts: [
      'Corps : facette articulaire en avant pour la tête du marteau',
      'Branche courte : en arrière, vers la fosse de l’enclume à l’entrée de l’antre',
      'Branche longue : descend en arrière du manche du marteau et se termine par le processus lenticulaire',
    ],
    joints: [
      'Incudo-malléaire, avec la tête du marteau',
      'Incudo-stapédienne, par le processus lenticulaire, avec la tête de l’étrier',
    ],
    near: ['La corde du tympan passe entre la branche longue de l’enclume et le manche du marteau'],
    note: 'La branche longue est mal vascularisée : c’est la première partie des osselets détruite dans les otites chroniques.',
  },

  'Stapès (étrier)': {
    what: 'Le plus petit os du corps (environ 3 mm) : sa platine ferme la fenêtre du vestibule et transmet les vibrations à la périlymphe.',
    parts: [
      'Tête : s’articule avec le processus lenticulaire de l’enclume',
      'Col : reçoit le tendon du muscle stapédien',
      'Branches antérieure et postérieure',
      'Platine (base) : ovale, tenue dans la fenêtre du vestibule par le ligament annulaire',
    ],
    joints: ['Incudo-stapédienne, avec l’enclume'],
    muscles: ['Muscle stapédien : sur le col'],
    near: [
      'Au-dessus : canal du nerf facial, dont la paroi est parfois déhiscente',
      'En dedans : vestibule',
    ],
    note: 'Dans l’otospongiose, la platine se soude à la fenêtre du vestibule : surdité de transmission, traitée en remplaçant l’étrier par une prothèse (stapédotomie).',
  },

  'Muscle tenseur du tympan': {
    origin: ['Partie cartilagineuse de la trompe auditive, grande aile du sphénoïde voisine et parois de son demi-canal'],
    course: ['Dans son demi-canal, au-dessus de la trompe auditive ; son tendon se réfléchit à angle droit sur le processus cochléariforme pour traverser la caisse'],
    insertion: ['Manche du marteau, près du col'],
    nerve: ['Nerf du muscle tenseur du tympan, branche du nerf mandibulaire (V3)'],
    action: ['Tire le manche du marteau en dedans et tend la membrane du tympan : amortit les sons forts et le bruit de la mastication'],
  },

  'Muscle stapédien': {
    origin: ['Cavité de l’éminence pyramidale, sur la paroi postérieure de la caisse du tympan'],
    insertion: ['Col de l’étrier, par un tendon qui sort au sommet de l’éminence pyramidale'],
    nerve: ['Nerf du muscle stapédien, branche du nerf facial (VII) dans sa portion mastoïdienne'],
    action: ['Bascule l’étrier en arrière et freine la platine : c’est le réflexe stapédien, qui protège l’oreille interne des sons intenses'],
    note: 'Le plus petit muscle strié du corps. Une paralysie faciale au-dessus de son nerf donne une hyperacousie : un son ordinaire devient pénible.',
  },

  'Nerf facial (VII) — canal facial': {
    what: 'Le trajet du nerf facial dans le rocher, dans le canal facial (aqueduc de Fallope), du fond du conduit auditif interne au foramen stylo-mastoïdien : le plus long trajet d’un nerf dans un canal osseux.',
    course: [
      'Segment méatal : dans le conduit auditif interne, en haut et en avant, au-dessus du nerf cochléaire, avec le nerf intermédiaire',
      '1re portion (labyrinthique) : en avant et en dehors, entre la cochlée et le vestibule, jusqu’au ganglion géniculé',
      'Premier genou : ganglion géniculé ; naissance du grand nerf pétreux',
      '2e portion (tympanique) : horizontale, en arrière, sur la paroi médiale de la caisse, au-dessus de la fenêtre du vestibule',
      'Second genou : sous le canal semi-circulaire latéral',
      '3e portion (mastoïdienne) : verticale, dans la paroi postérieure de la caisse, jusqu’au foramen stylo-mastoïdien',
    ],
    branches: [
      'Grand nerf pétreux (au ganglion géniculé) : glande lacrymale, glandes du nez et du palais',
      'Nerf du muscle stapédien (3e portion)',
      'Corde du tympan (3e portion) : goût des deux tiers antérieurs de la langue, glandes sub-mandibulaire et sub-linguale',
    ],
    exit: ['Foramen stylo-mastoïdien, puis la glande parotide'],
    near: ['Dans le conduit auditif interne : le facial en haut et en avant, le cochléaire en bas et en avant, les deux nerfs vestibulaires en arrière'],
    note: 'Une lésion dans le canal se situe par ce qui manque : les larmes (au-dessus du ganglion géniculé), l’hyperacousie (au-dessus du nerf du stapédien), le goût (au-dessus de la corde du tympan).',
  },

  'Nerf cochléaire': {
    what: 'La racine auditive du nerf vestibulo-cochléaire (VIII) : les axones des neurones du ganglion spiral, de la cochlée au tronc cérébral.',
    course: [
      'Naît dans le modiolus et sort par l’aire cochléaire, au fond du conduit auditif interne',
      'Dans le conduit : en bas et en avant, sous le nerf facial',
      'S’unit au nerf vestibulaire pour former le nerf VIII, qui traverse l’angle ponto-cérébelleux',
    ],
    ends: ['Noyaux cochléaires antérieur et postérieur, à la jonction du bulbe et du pont'],
    note: 'Le schwannome vestibulaire (neurinome de l’acoustique) de l’angle ponto-cérébelleux se révèle d’abord par une surdité d’un côté et des acouphènes.',
  },

  'Nerf vestibulaire': {
    what: 'La racine de l’équilibre du nerf VIII : les axones du ganglion vestibulaire (de Scarpa), au fond du conduit auditif interne.',
    course: [
      'Rameau supérieur : en haut et en arrière dans le conduit ; utricule, ampoules des canaux antérieur et latéral',
      'Rameau inférieur : en bas et en arrière ; saccule et ampoule du canal postérieur',
      'Rejoint le nerf cochléaire dans le conduit et gagne le tronc cérébral',
    ],
    ends: ['Noyaux vestibulaires, sous le plancher du IVe ventricule ; quelques fibres directement au cervelet'],
  },

  'Artère carotide interne (segment pétreux)': {
    what: 'L’artère carotide interne dans le canal carotidien du rocher : elle monte, se coude, puis court en avant et en dedans jusqu’à l’apex du rocher.',
    course: [
      'Segment vertical : entre par l’orifice externe du canal carotidien, en avant de la fosse jugulaire',
      'Genou : se coude en avant et en dedans, en avant de la cochlée',
      'Segment horizontal : vers l’apex ; sort par l’orifice interne du canal, au-dessus du foramen déchiré, puis entre dans le sinus caverneux',
    ],
    branches: ['Artères carotico-tympaniques, vers la caisse du tympan'],
    near: [
      'En arrière et en dehors : cochlée et caisse du tympan, dont la sépare une lame osseuse mince',
      'Au-dessus du toit du canal : ganglion trigéminal',
      'Autour d’elle : plexus sympathique carotidien',
    ],
  },

  'Sinus sigmoïde et bulbe jugulaire': {
    what: 'La fin du sinus sigmoïde, dans son sillon sur la face endocrânienne de la mastoïde, et le bulbe supérieur de la veine jugulaire interne, dans la fosse jugulaire sous la caisse du tympan.',
    course: [
      'Le sinus sigmoïde descend en S dans le sillon sigmoïde, en arrière de l’antre mastoïdien',
      'Il traverse la partie postérieure du foramen jugulaire',
      'Bulbe supérieur : dilatation de l’origine de la veine jugulaire interne, sous le plancher de la caisse',
    ],
    tributaries: [
      'Sinus transverse, dont le sinus sigmoïde est la suite',
      'Veine émissaire mastoïdienne',
      'Sinus pétreux inférieur, au foramen jugulaire',
    ],
    near: [
      'En avant et en dehors : antre et cellules mastoïdiennes — une mastoïdite peut se compliquer d’une thrombophlébite du sinus sigmoïde',
      'Au-dessus du bulbe : plancher de la caisse, parfois déhiscent (bulbe procident)',
      'En avant : nerfs IX, X et XI dans le foramen jugulaire',
    ],
  },
};
