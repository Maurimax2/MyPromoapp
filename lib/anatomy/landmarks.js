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


    // ------------------------------------------------- les reliefs, suite
    //
    // A bone is not one name and a handful of holes. What is asked in an exam
    // is the relief: the process you palpate, the fossa a muscle sits in, the
    // line an aponeurosis pulls on. These are all found by rule, because every
    // one of them IS the extreme point of its bone in some direction — that is
    // what makes it a relief in the first place.

    // --- os frontal
    { part: 'FJ3200', name: 'Bosse frontale gauche', dir: [0.5, 0.7, 1] },
    { part: 'FJ3200', name: 'Bosse frontale droite', dir: [-0.5, 0.7, 1] },
    { part: 'FJ3200', name: 'Arcade sourcilière gauche', dir: [0.45, 0, 1], band: ['y', 0, 0.45] },
    { part: 'FJ3200', name: 'Arcade sourcilière droite', dir: [-0.45, 0, 1], band: ['y', 0, 0.45] },
    { part: 'FJ3200', name: 'Nasion', dir: [0, -1, 1], band: ['x', 0.45, 0.55] },
    { part: 'FJ3200', name: 'Bregma', dir: [0, 1, -1], band: ['x', 0.45, 0.55] },

    // --- os pariétal
    { part: 'FJ3274', name: 'Vertex', dir: [0, 1, 0], band: ['x', 0, 0.2] },
    { part: 'FJ3274', name: 'Angle mastoïdien du pariétal gauche', dir: [0.4, -1, -1] },
    { part: 'FJ3380', name: 'Angle mastoïdien du pariétal droit', dir: [-0.4, -1, -1] },
    { part: 'FJ3274', name: 'Angle sphénoïdal du pariétal gauche', dir: [0.4, -1, 1] },
    { part: 'FJ3380', name: 'Angle sphénoïdal du pariétal droit', dir: [-0.4, -1, 1] },
    { part: 'FJ3274', name: 'Ligne temporale gauche', dir: [1, -0.3, 0.3] },
    { part: 'FJ3380', name: 'Ligne temporale droite', dir: [-1, -0.3, 0.3] },

    // --- os occipital
    { part: 'FJ3309', name: 'Lambda', dir: [0, 1, -0.6], band: ['x', 0.45, 0.55] },
    { part: 'FJ3309', name: 'Ligne nuchale supérieure gauche', dir: [1, 0.2, -1] },
    { part: 'FJ3309', name: 'Ligne nuchale supérieure droite', dir: [-1, 0.2, -1] },
    { part: 'FJ3309', name: 'Clivus', dir: [0, 0.3, 1], band: ['x', 0.45, 0.55] },
    // The two ends of the foramen magnum, on the midline: the front edge and
    // the back edge of the hole itself.
    { part: 'FJ3309', name: 'Basion', dir: [0, -0.2, 1],
      box: [[-0.006, 1.545, -0.045], [0.006, 1.575, -0.008]] },
    { part: 'FJ3309', name: 'Opisthion', dir: [0, -0.2, -1],
      box: [[-0.006, 1.545, -0.070], [0.006, 1.575, -0.020]] },

    // --- os temporal
    { part: 'FJ3281', name: 'Processus styloïde gauche', dir: [0.2, -1, 0.35] },
    { part: 'FJ3386', name: 'Processus styloïde droit', dir: [-0.2, -1, 0.35] },
    // The lowest point of the temporal is the mastoid, two centimetres away
    // from any of these. Each one is the lowest point of ITS region, which is
    // what the box is for.
    { part: 'FJ3281', name: 'Fosse mandibulaire gauche', dir: [0, -1, 0],
      box: [[0.035, 1.554, -0.005], [0.058, 1.585, 0.022]] },
    { part: 'FJ3386', name: 'Fosse mandibulaire droite', dir: [0, -1, 0],
      box: [[-0.058, 1.554, -0.005], [-0.035, 1.585, 0.022]] },
    { part: 'FJ3281', name: 'Tubercule articulaire gauche', dir: [0, -1, 0.4],
      box: [[0.035, 1.554, 0.010], [0.058, 1.585, 0.034]] },
    { part: 'FJ3386', name: 'Tubercule articulaire droit', dir: [0, -1, 0.4],
      box: [[-0.058, 1.554, 0.010], [-0.035, 1.585, 0.034]] },
    { part: 'FJ3281', name: 'Méat acoustique externe gauche', dir: [1, 0, -0.3],
      box: [[0.040, 1.558, -0.030], [0.070, 1.585, 0.005]] },
    { part: 'FJ3386', name: 'Méat acoustique externe droit', dir: [-1, 0, -0.3],
      box: [[-0.070, 1.558, -0.030], [-0.040, 1.585, 0.005]] },
    { part: 'FJ3281', name: 'Apex du rocher gauche', dir: [-1, 0, 0.3] },
    { part: 'FJ3386', name: 'Apex du rocher droit', dir: [1, 0, 0.3] },

    // --- os sphénoïde
    // The clinoid processes are the high points of the body's upper surface,
    // and the sella is the floor between them.
    { part: 'FJ3394', name: 'Processus clinoïde antérieur gauche', dir: [0.3, 1, -0.6],
      box: [[0.004, 1.590, -0.006], [0.020, 1.622, 0.016]] },
    { part: 'FJ3394', name: 'Processus clinoïde antérieur droit', dir: [-0.3, 1, -0.6],
      box: [[-0.020, 1.590, -0.006], [-0.004, 1.622, 0.016]] },
    { part: 'FJ3394', name: 'Petite aile du sphénoïde gauche', dir: [0.8, 0.6, 0.5] },
    { part: 'FJ3394', name: 'Petite aile du sphénoïde droite', dir: [-0.8, 0.6, 0.5] },
    { part: 'FJ3394', name: 'Épine du sphénoïde gauche', dir: [0.3, -1, -1],
      box: [[0.024, 1.557, -0.012], [0.042, 1.585, 0.006]] },
    { part: 'FJ3394', name: 'Épine du sphénoïde droite', dir: [-0.3, -1, -1],
      box: [[-0.042, 1.557, -0.012], [-0.024, 1.585, 0.006]] },
    { part: 'FJ3394', name: 'Hamulus ptérygoïdien gauche', dir: [0, -1, 0],
      box: [[0.006, 1.554, 0.008], [0.020, 1.585, 0.030]] },
    { part: 'FJ3394', name: 'Hamulus ptérygoïdien droit', dir: [0, -1, 0],
      box: [[-0.020, 1.554, 0.008], [-0.006, 1.585, 0.030]] },

    // --- maxillaire
    { part: 'FJ3269', name: 'Épine nasale antérieure', dir: [0, 0, 1], band: ['y', 0.25, 0.55] },
    { part: 'FJ3269', name: 'Tubérosité maxillaire gauche', dir: [0.6, -0.6, -1] },
    { part: 'FJ3375', name: 'Tubérosité maxillaire droite', dir: [-0.6, -0.6, -1] },
    { part: 'FJ3269', name: 'Processus palatin gauche', dir: [-1, -0.3, 0] },
    { part: 'FJ3375', name: 'Processus palatin droit', dir: [1, -0.3, 0] },

    // --- mandibule
    // The notch is the lowest point between the two processes; the lingula is
    // the sharp point on the medial face just in front of the foramen.
    { part: 'FJ3289', name: 'Incisure mandibulaire gauche', dir: [0, -1, 0],
      box: [[0.030, 1.550, -0.012], [0.046, 1.585, 0.010]] },
    { part: 'FJ3289', name: 'Incisure mandibulaire droite', dir: [0, -1, 0],
      box: [[-0.046, 1.550, -0.012], [-0.030, 1.585, 0.010]] },
    { part: 'FJ3289', name: 'Lingula (épine de Spix) gauche', dir: [-1, 0.6, 0],
      box: [[0.028, 1.538, -0.010], [0.042, 1.558, 0.008]] },
    { part: 'FJ3289', name: 'Lingula (épine de Spix) droite', dir: [1, 0.6, 0],
      box: [[-0.042, 1.538, -0.010], [-0.028, 1.558, 0.008]] },
    { part: 'FJ3289', name: 'Symphyse mentonnière', dir: [0, -1, 1], band: ['x', 0.45, 0.55] },

    // --- os zygomatique
    { part: 'FJ3287', name: 'Processus maxillaire du zygomatique gauche', dir: [0, -1, 0.3] },
    { part: 'FJ3392', name: 'Processus maxillaire du zygomatique droit', dir: [0, -1, 0.3] },

    // --- os palatin
    { part: 'FJ3273', name: 'Épine nasale postérieure gauche', dir: [-1, -0.5, -0.6] },
    { part: 'FJ3379', name: 'Épine nasale postérieure droite', dir: [1, -0.5, -0.6] },
    { part: 'FJ3273', name: 'Lame perpendiculaire du palatin gauche', dir: [0, 1, 0] },
    { part: 'FJ3379', name: 'Lame perpendiculaire du palatin droite', dir: [0, 1, 0] },

    // --- os ethmoïde
    { part: 'FJ3199', name: 'Crista galli', dir: [0, 1, 0], band: ['x', 0.45, 0.55] },
    { part: 'FJ3199', name: 'Cornet nasal moyen gauche', dir: [1, -0.6, 0] },
    { part: 'FJ3199', name: 'Cornet nasal moyen droit', dir: [-1, -0.6, 0] },

    // --- vomer, cornets, os nasaux et lacrymaux
    { part: 'FJ3395', name: 'Bord postérieur du vomer', dir: [0, 0.4, -1] },
    { part: 'FJ3263', name: 'Bord libre du cornet inférieur gauche', dir: [0, -1, 0] },
    { part: 'FJ3369', name: 'Bord libre du cornet inférieur droit', dir: [0, -1, 0] },
    { part: 'FJ3272', name: 'Os nasal gauche', dir: [0, 0, 1] },
    { part: 'FJ3378', name: 'Os nasal droit', dir: [0, 0, 1] },
    { part: 'FJ3265', name: 'Sillon lacrymal gauche', dir: [0, 0, 1] },
    { part: 'FJ3371', name: 'Sillon lacrymal droit', dir: [0, 0, 1] },

    // ---------------------------------------------------------- les orifices
    //
    // Named outright rather than found. A two millimetre scan simplified for
    // the browser closed every foramen but the largest: of the whole skull,
    // only the foramen magnum and two pairs in the sphenoid survive as real
    // holes. The shapes around them are still there, so each one is placed at
    // the spot it occupies and snapped to the surface of its bone.

    // sphénoïde — l'étage moyen
    { part: 'FJ3394', name: 'Canal optique gauche', at: [0.018, 1.606, 0.020] },
    { part: 'FJ3394', name: 'Canal optique droit', at: [-0.018, 1.606, 0.020] },
    { part: 'FJ3394', name: 'Fissure orbitaire supérieure gauche', at: [0.026, 1.600, 0.026] },
    { part: 'FJ3394', name: 'Fissure orbitaire supérieure droite', at: [-0.026, 1.600, 0.026] },
    { part: 'FJ3394', name: 'Foramen rond gauche', at: [0.026, 1.592, 0.012] },
    { part: 'FJ3394', name: 'Foramen rond droit', at: [-0.026, 1.592, 0.012] },
    { part: 'FJ3394', name: 'Foramen ovale gauche', at: [0.024, 1.578, 0.001] },
    { part: 'FJ3394', name: 'Foramen ovale droit', at: [-0.024, 1.578, 0.001] },
    { part: 'FJ3394', name: 'Foramen épineux gauche', at: [0.029, 1.576, -0.006] },
    { part: 'FJ3394', name: 'Foramen épineux droit', at: [-0.029, 1.576, -0.006] },
    { part: 'FJ3394', name: 'Canal ptérygoïdien gauche', at: [0.010, 1.574, 0.008] },
    { part: 'FJ3394', name: 'Canal ptérygoïdien droit', at: [-0.010, 1.574, 0.008] },

    // temporal — le rocher
    { part: 'FJ3281', name: 'Canal carotidien gauche', at: [0.020, 1.572, -0.006] },
    { part: 'FJ3386', name: 'Canal carotidien droit', at: [-0.020, 1.572, -0.006] },
    { part: 'FJ3281', name: 'Méat acoustique interne gauche', at: [0.020, 1.576, -0.020] },
    { part: 'FJ3386', name: 'Méat acoustique interne droit', at: [-0.020, 1.576, -0.020] },
    { part: 'FJ3281', name: 'Foramen stylo-mastoïdien gauche', at: [0.033, 1.558, -0.013] },
    { part: 'FJ3386', name: 'Foramen stylo-mastoïdien droit', at: [-0.033, 1.558, -0.013] },
    { part: 'FJ3281', name: 'Foramen jugulaire gauche', at: [0.021, 1.570, -0.021] },
    { part: 'FJ3386', name: 'Foramen jugulaire droit', at: [-0.021, 1.570, -0.021] },

    // occipital — l'étage postérieur
    { part: 'FJ3309', name: 'Canal du nerf hypoglosse gauche', at: [0.014, 1.563, -0.028] },
    { part: 'FJ3309', name: 'Canal du nerf hypoglosse droit', at: [-0.014, 1.563, -0.028] },
    { part: 'FJ3309', name: 'Canal condylaire gauche', at: [0.020, 1.561, -0.048] },
    { part: 'FJ3309', name: 'Canal condylaire droit', at: [-0.020, 1.561, -0.048] },

    // ethmoïde — l'étage antérieur
    { part: 'FJ3199', name: 'Foramens de la lame criblée', at: [0.004, 1.604, 0.045] },

    // la face
    { part: 'FJ3200', name: 'Foramen supra-orbitaire gauche', at: [0.022, 1.607, 0.068] },
    { part: 'FJ3200', name: 'Foramen supra-orbitaire droit', at: [-0.022, 1.607, 0.068] },
    { part: 'FJ3269', name: 'Foramen infra-orbitaire gauche', at: [0.018, 1.594, 0.070] },
    { part: 'FJ3375', name: 'Foramen infra-orbitaire droit', at: [-0.018, 1.594, 0.070] },
    { part: 'FJ3289', name: 'Foramen mandibulaire gauche', at: [0.036, 1.545, -0.002] },
    { part: 'FJ3289', name: 'Foramen mandibulaire droit', at: [-0.036, 1.545, -0.002] },
    { part: 'FJ3289', name: 'Foramen mentonnier gauche', at: [0.032, 1.520, 0.045] },
    { part: 'FJ3289', name: 'Foramen mentonnier droit', at: [-0.032, 1.520, 0.045] },
    { part: 'FJ3273', name: 'Foramen grand palatin gauche', at: [0.019, 1.552, 0.022] },
    { part: 'FJ3379', name: 'Foramen grand palatin droit', at: [-0.019, 1.552, 0.022] },
    { part: 'FJ3287', name: 'Foramen zygomatico-facial gauche', at: [0.052, 1.590, 0.050] },
    { part: 'FJ3392', name: 'Foramen zygomatico-facial droit', at: [-0.052, 1.590, 0.050] },
  ],
};
