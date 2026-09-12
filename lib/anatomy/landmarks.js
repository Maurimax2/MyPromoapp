// The named points on a bone.
//
// BodyParts3D is one mesh per whole bone. There is no separate piece anywhere
// in it for a foramen, a process, a fossa or a condyle — the only thing called
// a foramen in the entire body is in the brain. The shapes are all there, at
// full detail: the foramen magnum is a real hole in the occipital and the
// mastoid is a real spur on the temporal. What the atlas has no word for is
// what they are called.
//
// So a landmark is a labelled point on the surface, the way a printed plate
// does it, and this file says how to find each one. Every rule is a direction:
// the point is the vertex of that bone that sits furthest that way. Frontmost,
// lowest, most lateral. Written as a rule rather than as coordinates so that a
// re-cut of the geometry moves the labels with the bone instead of leaving
// them hanging in the air.
//
// Axes, in the atlas's own space: +x is the body's LEFT, +y is up, +z is
// forward, toward the face.

/** Names are French, like every other piece of study content. */
export const LANDMARKS = {
  crane: [
    // --- os frontal
    { part: 'FJ3200', name: 'Glabelle', dir: [0, 0, 1], band: ['x', 0.42, 0.58] },

    // --- os occipital
    { part: 'FJ3309', name: 'Foramen magnum', hole: 'y' },
    { part: 'FJ3309', name: 'Protubérance occipitale externe', dir: [0, 0, -1], band: ['x', 0.42, 0.58] },
    { part: 'FJ3309', name: 'Condyle occipital gauche', dir: [0, -1, 0], band: ['x', 0.55, 1] },
    { part: 'FJ3309', name: 'Condyle occipital droit', dir: [0, -1, 0], band: ['x', 0, 0.45] },

    // --- os temporal
    { part: 'FJ3281', name: 'Processus mastoïde gauche', dir: [0, -1, 0] },
    { part: 'FJ3386', name: 'Processus mastoïde droit', dir: [0, -1, 0] },
    { part: 'FJ3281', name: 'Processus zygomatique du temporal gauche', dir: [0, 0, 1] },
    { part: 'FJ3386', name: 'Processus zygomatique du temporal droit', dir: [0, 0, 1] },

    // --- os sphénoïde
    { part: 'FJ3394', name: 'Processus ptérygoïde gauche', dir: [0, -1, 0], band: ['x', 0.55, 1] },
    { part: 'FJ3394', name: 'Processus ptérygoïde droit', dir: [0, -1, 0], band: ['x', 0, 0.45] },
    { part: 'FJ3394', name: 'Grande aile du sphénoïde gauche', dir: [1, 0, 0] },
    { part: 'FJ3394', name: 'Grande aile du sphénoïde droite', dir: [-1, 0, 0] },

    // --- mandibule
    { part: 'FJ3289', name: 'Condyle mandibulaire gauche', dir: [0, 1, -0.4], band: ['x', 0.55, 1] },
    { part: 'FJ3289', name: 'Condyle mandibulaire droit', dir: [0, 1, -0.4], band: ['x', 0, 0.45] },
    { part: 'FJ3289', name: 'Processus coronoïde gauche', dir: [0, 1, 0.4], band: ['x', 0.55, 1] },
    { part: 'FJ3289', name: 'Processus coronoïde droit', dir: [0, 1, 0.4], band: ['x', 0, 0.45] },
    { part: 'FJ3289', name: 'Angle de la mandibule gauche', dir: [0, -1, -1], band: ['x', 0.55, 1] },
    { part: 'FJ3289', name: 'Angle de la mandibule droit', dir: [0, -1, -1], band: ['x', 0, 0.45] },
    { part: 'FJ3289', name: 'Protubérance mentonnière', dir: [0, -0.5, 1], band: ['x', 0.42, 0.58] },

    // --- maxillaire
    { part: 'FJ3269', name: 'Processus frontal du maxillaire gauche', dir: [0, 1, 0] },
    { part: 'FJ3375', name: 'Processus frontal du maxillaire droit', dir: [0, 1, 0] },
    { part: 'FJ3269', name: 'Processus alvéolaire gauche', dir: [0, -1, 0] },
    { part: 'FJ3375', name: 'Processus alvéolaire droit', dir: [0, -1, 0] },

    // --- os zygomatique
    { part: 'FJ3287', name: 'Processus temporal du zygomatique gauche', dir: [0, 0, -1] },
    { part: 'FJ3392', name: 'Processus temporal du zygomatique droit', dir: [0, 0, -1] },
    { part: 'FJ3287', name: 'Processus frontal du zygomatique gauche', dir: [0, 1, 0] },
    { part: 'FJ3392', name: 'Processus frontal du zygomatique droit', dir: [0, 1, 0] },

    // --- os pariétal
    { part: 'FJ3274', name: 'Bosse pariétale gauche', dir: [1, 0, 0] },
    { part: 'FJ3380', name: 'Bosse pariétale droite', dir: [-1, 0, 0] },
  ],
};
