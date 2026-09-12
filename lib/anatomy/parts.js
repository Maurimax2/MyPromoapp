// The parts of a bone.
//
// A bone arrives from the atlas as one mesh. The temporal has no seam in it
// between the squama and the petrous part, because BodyParts3D never drew one
// — and yet "les parties de l'os temporal" is an exam question, and a student
// looking at the bone alone expects to see them apart.
//
// So the mesh is divided here. Each part is given an anchor, written the same
// way a landmark is: a direction, and the point of the bone furthest that way.
// Every triangle then belongs to the anchor it is nearest. The boundaries are
// therefore approximate — they fall where the parts meet, not along a suture
// the geometry does not contain — which is honest for teaching what a part is
// and where it sits, and is not a claim about the exact line.
//
// Axes are the atlas's: +x the body's LEFT, +y up, +z forward. For a bone that
// comes as a left and a right, the directions are written for the left one and
// mirrored for the other.

/** Colours for the parts of one bone. Never seen beside the bone colours. */
export const PART_TINTS = [
  '#C75B85', '#4A86C4', '#58A177', '#C9982F',
  '#8A63BE', '#3FA5A8', '#A97048', '#7FA83F',
];

export const PARTS = {
  crane: {
    // `pull` says how far a part reaches. Without it the styloid process, a
    // spike the width of a pencil, took as much of the bone as the mastoid.
    'Os temporal': [
      { name: 'Écaille (squama)', dir: [0.3, 1, 0.2], pull: 1.35 },
      { name: 'Partie pétreuse (rocher)', dir: [-1, -0.2, 0.2] },
      { name: 'Partie mastoïdienne', dir: [0.2, -1, -0.8], pull: 1.1 },
      { name: 'Partie tympanique', dir: [0.8, -0.5, 0.1], pull: 0.8 },
      { name: 'Processus styloïde', dir: [-0.4, -1, 0.5], pull: 0.45 },
      { name: 'Processus zygomatique', dir: [0.3, 0, 1], pull: 1.4 },
    ],

    'Os occipital': [
      { name: 'Écaille occipitale', dir: [0, 0.3, -1] },
      { name: 'Partie latérale gauche', dir: [1, -0.8, 0] },
      { name: 'Partie latérale droite', dir: [-1, -0.8, 0] },
      { name: 'Partie basilaire (clivus)', dir: [0, -0.2, 1] },
    ],

    'Os sphénoïde': [
      { name: 'Corps', dir: [0, 1, 0], band: ['x', 0.44, 0.56] },
      { name: 'Petite aile gauche', dir: [0.7, 0.6, 1] },
      { name: 'Petite aile droite', dir: [-0.7, 0.6, 1] },
      { name: 'Grande aile gauche', dir: [1, 0.3, 0] },
      { name: 'Grande aile droite', dir: [-1, 0.3, 0] },
      { name: 'Processus ptérygoïde gauche', dir: [0.4, -1, 0.2] },
      { name: 'Processus ptérygoïde droit', dir: [-0.4, -1, 0.2] },
    ],

    Mandibule: [
      { name: 'Corps', dir: [0, -0.4, 1], band: ['x', 0.42, 0.58] },
      { name: 'Branche gauche (ramus)', dir: [1, 0, -0.8] },
      { name: 'Branche droite (ramus)', dir: [-1, 0, -0.8] },
      { name: 'Processus condylaire gauche', dir: [0.6, 1, -0.5] },
      { name: 'Processus condylaire droit', dir: [-0.6, 1, -0.5] },
      { name: 'Processus coronoïde gauche', dir: [0.6, 1, 0.5] },
      { name: 'Processus coronoïde droit', dir: [-0.6, 1, 0.5] },
    ],

    Maxillaire: [
      { name: 'Corps', dir: [0.5, 0, 0.6] },
      { name: 'Processus frontal', dir: [-0.2, 1, 0.3] },
      { name: 'Processus zygomatique', dir: [1, 0.2, 0] },
      { name: 'Processus palatin', dir: [-1, -0.3, 0] },
      { name: 'Processus alvéolaire', dir: [0.2, -1, 0.2] },
    ],

    'Os frontal': [
      { name: 'Écaille frontale', dir: [0, 1, 0.5] },
      { name: 'Portion orbitaire gauche', dir: [0.6, -1, 0.2] },
      { name: 'Portion orbitaire droite', dir: [-0.6, -1, 0.2] },
      { name: 'Portion nasale', dir: [0, -0.6, 1], band: ['x', 0.42, 0.58] },
    ],

    'Os zygomatique': [
      { name: 'Corps', dir: [1, 0, 0.5] },
      { name: 'Processus frontal', dir: [0, 1, 0] },
      { name: 'Processus temporal', dir: [0.3, 0, -1] },
      { name: 'Processus maxillaire', dir: [-0.3, -1, 0.3] },
    ],

    'Os palatin': [
      { name: 'Lame horizontale', dir: [-0.5, -1, 0] },
      { name: 'Lame perpendiculaire', dir: [0.3, 1, 0] },
    ],

    'Os ethmoïde': [
      { name: 'Crista galli et lame criblée', dir: [0, 1, 0], band: ['x', 0.42, 0.58] },
      { name: 'Lame perpendiculaire', dir: [0, -1, 0], band: ['x', 0.42, 0.58] },
      { name: 'Labyrinthe ethmoïdal gauche', dir: [1, 0, 0] },
      { name: 'Labyrinthe ethmoïdal droit', dir: [-1, 0, 0] },
    ],
  },
};

/** The parts of a bone, whichever side of the head it is on. */
export const partsOf = (bundle, bone) => PARTS[bundle]?.[bone] || null;
