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
      box: [[0.45, 0, 0.60], [0.55, 0.20, 0.93]] },
    { part: 'FJ3309', name: 'Opisthion', dir: [0, -0.2, -1],
      box: [[0.45, 0, 0.40], [0.55, 0.20, 0.82]] },

    // --- os temporal
    { part: 'FJ3281', name: 'Processus styloïde gauche', dir: [0.2, -1, 0.35] },
    { part: 'FJ3386', name: 'Processus styloïde droit', dir: [-0.2, -1, 0.35] },
    // The lowest point of the temporal is the mastoid, two centimetres away
    // from any of these. Each one is the lowest point of ITS region, which is
    // what the box is for.
    { part: 'FJ3281', name: 'Fosse mandibulaire gauche', dir: [0, -1, 0],
      box: [[0.38, 0, 0.55], [0.75, 0.42, 0.90]] },
    { part: 'FJ3386', name: 'Fosse mandibulaire droite', dir: [0, -1, 0],
      box: [[0.25, 0, 0.55], [0.62, 0.42, 0.90]] },
    { part: 'FJ3281', name: 'Tubercule articulaire gauche', dir: [0, -1, 0.4],
      box: [[0.38, 0, 0.75], [0.75, 0.42, 1]] },
    { part: 'FJ3386', name: 'Tubercule articulaire droit', dir: [0, -1, 0.4],
      box: [[0.25, 0, 0.75], [0.62, 0.42, 1]] },
    { part: 'FJ3281', name: 'Méat acoustique externe gauche', dir: [1, 0, -0.3],
      box: [[0.46, 0.05, 0.35], [0.95, 0.42, 0.70]] },
    { part: 'FJ3386', name: 'Méat acoustique externe droit', dir: [-1, 0, -0.3],
      box: [[0.05, 0.05, 0.35], [0.54, 0.42, 0.70]] },
    { part: 'FJ3281', name: 'Apex du rocher gauche', dir: [-1, 0, 0.3] },
    { part: 'FJ3386', name: 'Apex du rocher droit', dir: [1, 0, 0.3] },

    // --- os sphénoïde
    // The clinoid processes are the high points of the body's upper surface,
    // and the sella is the floor between them.
    { part: 'FJ3394', name: 'Processus clinoïde antérieur gauche', dir: [0.3, 1, -0.6],
      box: [[0.50, 0.47, 0.06], [0.68, 0.93, 0.47]] },
    { part: 'FJ3394', name: 'Processus clinoïde antérieur droit', dir: [-0.3, 1, -0.6],
      box: [[0.32, 0.47, 0.06], [0.50, 0.93, 0.47]] },
    { part: 'FJ3394', name: 'Petite aile du sphénoïde gauche', dir: [0.8, 0.6, 0.5] },
    { part: 'FJ3394', name: 'Petite aile du sphénoïde droite', dir: [-0.8, 0.6, 0.5] },
    { part: 'FJ3394', name: 'Épine du sphénoïde gauche', dir: [0.3, -1, -1],
      box: [[0.70, 0, 0], [0.92, 0.40, 0.29]] },
    { part: 'FJ3394', name: 'Épine du sphénoïde droite', dir: [-0.3, -1, -1],
      box: [[0.08, 0, 0], [0.30, 0.40, 0.29]] },
    { part: 'FJ3394', name: 'Hamulus ptérygoïdien gauche', dir: [0, -1, 0],
      box: [[0.52, 0, 0.33], [0.68, 0.40, 0.73]] },
    { part: 'FJ3394', name: 'Hamulus ptérygoïdien droit', dir: [0, -1, 0],
      box: [[0.32, 0, 0.33], [0.48, 0.40, 0.73]] },

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
      box: [[0.72, 0.30, 0.35], [0.94, 0.75, 0.62]] },
    { part: 'FJ3289', name: 'Incisure mandibulaire droite', dir: [0, -1, 0],
      box: [[0.06, 0.30, 0.35], [0.28, 0.75, 0.62]] },
    { part: 'FJ3289', name: 'Lingula (épine de Spix) gauche', dir: [-1, 0.6, 0],
      box: [[0.68, 0.10, 0.37], [0.90, 0.48, 0.60]] },
    { part: 'FJ3289', name: 'Lingula (épine de Spix) droite', dir: [1, 0.6, 0],
      box: [[0.10, 0.10, 0.37], [0.32, 0.48, 0.60]] },
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

  // ------------------------------------------------- le membre supérieur
  //
  // The LEFT limb, in the atlas's axes: +x is lateral here, -x medial, +y
  // proximal, +z anterior. Almost every landmark on a long bone IS an extreme
  // of that bone in some direction — that is what makes it a landmark — so
  // these are nearly all plain directions. A box is added only where the
  // extreme of the whole bone is somewhere else entirely: the deltoid
  // tuberosity is the most lateral point of the SHAFT, not of the humerus,
  // whose most lateral point is the greater tubercle.
  'membre-sup': [
    // --- scapula
    { part: 'Scapula', name: 'Acromion', dir: [1, 0.7, -0.4] },
    { part: 'Scapula', name: 'Processus coracoïde', dir: [0.4, 0.7, 1] },
    { part: 'Scapula', name: 'Cavité glénoïdale', dir: [1, 0.15, 0.15] },
    { part: 'Scapula', name: 'Épine de la scapula', dir: [0.2, 0.6, -1] },
    { part: 'Scapula', name: 'Angle inférieur de la scapula', dir: [-0.2, -1, -0.2] },
    { part: 'Scapula', name: 'Angle supérieur de la scapula', dir: [-0.6, 1, -0.2] },
    { part: 'Scapula', name: 'Bord médial de la scapula', dir: [-1, 0.1, -0.3] },
    { part: 'Scapula', name: 'Bord latéral de la scapula', dir: [0.6, -0.8, -0.3] },

    // --- clavicule
    { part: 'Clavicule', name: 'Extrémité sternale de la clavicule', dir: [-1, 0, 0.3] },
    { part: 'Clavicule', name: 'Extrémité acromiale de la clavicule', dir: [1, 0, -0.3] },
    { part: 'Clavicule', name: 'Tubercule conoïde', dir: [0.7, -1, -0.4] },
    { part: 'Clavicule', name: 'Sillon du subclavier', dir: [0, -1, 0], band: ['x', 0.3, 0.7] },

    // --- humérus
    { part: 'Humérus', name: 'Tête humérale', dir: [-1, 1, -0.5] },
    { part: 'Humérus', name: 'Tubercule majeur (trochiter)', dir: [1, 0.8, 0] },
    { part: 'Humérus', name: 'Tubercule mineur (trochin)', dir: [0, 0.8, 1] },
    { part: 'Humérus', name: 'Sillon intertuberculaire (coulisse bicipitale)', dir: [0, 1, 1],
      box: [[0.20, 0.86, 0.40], [0.70, 1, 1]] },
    { part: 'Humérus', name: 'Col chirurgical', dir: [0, 1, 0],
      box: [[0.20, 0.72, 0.15], [0.85, 0.85, 1]] },
    { part: 'Humérus', name: 'Tubérosité deltoïdienne', dir: [1, 0, 0.3], band: ['y', 0.40, 0.68] },
    { part: 'Humérus', name: 'Sillon du nerf radial', dir: [0, 0, -1], band: ['y', 0.38, 0.65] },
    { part: 'Humérus', name: 'Épicondyle médial (épitrochlée)', dir: [-1, -0.8, 0] },
    { part: 'Humérus', name: 'Épicondyle latéral', dir: [1, -0.8, 0] },
    { part: 'Humérus', name: 'Trochlée humérale', dir: [-0.4, -1, 0],
      box: [[0, 0, 0.30], [0.60, 0.10, 1]] },
    { part: 'Humérus', name: 'Capitulum', dir: [0.5, -1, 0.3],
      box: [[0.50, 0, 0.30], [1, 0.10, 1]] },
    { part: 'Humérus', name: 'Fosse olécrânienne', dir: [0, -0.4, -1],
      box: [[0.15, 0.02, 0], [0.80, 0.16, 0.65]] },

    // --- radius
    { part: 'Radius', name: 'Tête radiale', dir: [0, 1, 0] },
    { part: 'Radius', name: 'Col du radius', dir: [0, 1, 0],
      box: [[0, 0.82, 0], [1, 0.94, 1]] },
    { part: 'Radius', name: 'Tubérosité radiale (bicipitale)', dir: [-1, 0.4, 0],
      box: [[0, 0.70, 0], [1, 0.88, 1]] },
    { part: 'Radius', name: 'Processus styloïde radial', dir: [1, -1, 0] },
    { part: 'Radius', name: 'Tubercule dorsal (de Lister)', dir: [0, -0.5, -1],
      box: [[0.25, 0, 0], [1, 0.16, 0.75]] },
    { part: 'Radius', name: 'Incisure ulnaire du radius', dir: [-1, -0.6, 0],
      box: [[0, 0, 0], [0.60, 0.16, 1]] },

    // --- ulna
    { part: 'Ulna', name: 'Olécrâne', dir: [0, 1, -0.6] },
    { part: 'Ulna', name: 'Processus coronoïde de l’ulna', dir: [0, 0.7, 1] },
    { part: 'Ulna', name: 'Incisure trochléaire', dir: [0, 0.9, 0.3],
      box: [[0, 0.85, 0], [1, 0.96, 1]] },
    { part: 'Ulna', name: 'Incisure radiale de l’ulna', dir: [1, 0.5, 0.3],
      box: [[0.20, 0.84, 0], [1, 0.98, 1]] },
    { part: 'Ulna', name: 'Tubérosité ulnaire', dir: [0, 0.4, 1],
      box: [[0, 0.72, 0], [1, 0.88, 1]] },
    { part: 'Ulna', name: 'Tête ulnaire', dir: [1, -1, 0] },
    { part: 'Ulna', name: 'Processus styloïde ulnaire', dir: [-0.5, -1, -0.5] },
  ],

  // ------------------------------------------------- le membre inférieur
  'membre-inf': [
    // --- os coxal
    { part: 'Os coxal', name: 'Crête iliaque', dir: [0, 1, 0] },
    { part: 'Os coxal', name: 'Épine iliaque antéro-supérieure', dir: [0.3, 0.5, 1] },
    { part: 'Os coxal', name: 'Épine iliaque antéro-inférieure', dir: [0.4, 0, 1],
      box: [[0.35, 0.45, 0.55], [1, 0.80, 1]] },
    { part: 'Os coxal', name: 'Épine iliaque postéro-supérieure', dir: [-0.3, 0.5, -1] },
    { part: 'Os coxal', name: 'Acétabulum', dir: [1, 0, 0],
      box: [[0.50, 0.20, 0.20], [1, 0.60, 0.85]] },
    { part: 'Os coxal', name: 'Tubérosité ischiatique', dir: [0, -1, -0.5] },
    { part: 'Os coxal', name: 'Épine ischiatique', dir: [0.2, -0.5, -1],
      box: [[0.10, 0.05, 0], [0.70, 0.40, 0.50]] },
    { part: 'Os coxal', name: 'Tubercule pubien', dir: [-1, -0.3, 1] },
    { part: 'Os coxal', name: 'Symphyse pubienne', dir: [-1, -0.2, 0.3] },

    // --- fémur
    { part: 'Fémur', name: 'Tête fémorale', dir: [-1, 0.8, 0] },
    { part: 'Fémur', name: 'Col fémoral', dir: [-0.7, 0.7, 0],
      box: [[0.15, 0.85, 0.20], [0.70, 0.97, 1]] },
    { part: 'Fémur', name: 'Grand trochanter', dir: [1, 0.9, -0.2] },
    { part: 'Fémur', name: 'Petit trochanter', dir: [-0.4, 0.5, -1] },
    { part: 'Fémur', name: 'Ligne âpre', dir: [0, 0, -1], band: ['y', 0.30, 0.70] },
    { part: 'Fémur', name: 'Condyle fémoral médial', dir: [-1, -1, 0] },
    { part: 'Fémur', name: 'Condyle fémoral latéral', dir: [1, -1, 0] },
    { part: 'Fémur', name: 'Épicondyle médial du fémur', dir: [-1, -0.3, 0],
      box: [[0, 0, 0], [0.50, 0.12, 1]] },
    { part: 'Fémur', name: 'Épicondyle latéral du fémur', dir: [1, -0.3, 0],
      box: [[0.55, 0, 0], [1, 0.12, 1]] },
    { part: 'Fémur', name: 'Fosse intercondylaire', dir: [0, -0.5, -1],
      box: [[0.30, 0, 0], [0.75, 0.10, 0.55]] },
    { part: 'Fémur', name: 'Surface patellaire (trochlée fémorale)', dir: [0, -0.4, 1],
      box: [[0.25, 0.01, 0.60], [0.80, 0.14, 1]] },

    // --- patella
    { part: 'Patella', name: 'Base de la patella', dir: [0, 1, 0] },
    { part: 'Patella', name: 'Apex de la patella', dir: [0, -1, 0] },

    // --- tibia
    { part: 'Tibia', name: 'Plateau tibial', dir: [0, 1, 0] },
    { part: 'Tibia', name: 'Éminence intercondylaire (épines tibiales)', dir: [0, 1, 0],
      box: [[0.30, 0.88, 0.20], [0.70, 1, 0.80]] },
    { part: 'Tibia', name: 'Condyle tibial médial', dir: [-1, 0.6, 0] },
    { part: 'Tibia', name: 'Condyle tibial latéral', dir: [1, 0.6, 0] },
    { part: 'Tibia', name: 'Tubérosité tibiale', dir: [0, 0.4, 1],
      box: [[0.20, 0.82, 0.70], [0.85, 0.98, 1]] },
    { part: 'Tibia', name: 'Tubercule de Gerdy', dir: [1, 0.3, 1],
      box: [[0.60, 0.84, 0.55], [1, 0.98, 1]] },
    { part: 'Tibia', name: 'Crête tibiale', dir: [0, 0, 1], band: ['y', 0.30, 0.80] },
    { part: 'Tibia', name: 'Malléole médiale', dir: [-1, -1, 0] },

    // --- fibula
    { part: 'Fibula', name: 'Tête fibulaire', dir: [0, 1, 0] },
    { part: 'Fibula', name: 'Col de la fibula', dir: [0, 1, 0],
      box: [[0, 0.88, 0], [1, 0.96, 1]] },
    { part: 'Fibula', name: 'Malléole latérale', dir: [0.4, -1, 0] },
  ],

  // ------------------------------------------------------------- la main
  //
  // The LEFT hand, hanging: +x is radial (the thumb side), +y proximal, +z
  // palmar. The four pillars of the carpal tunnel are the point of most of
  // these — the tubercles of the scaphoid and trapezium laterally, the
  // pisiform and the hook of the hamate medially.
  main: [
    { part: 'Scaphoïde', name: 'Tubercule du scaphoïde', dir: [1, -1, 1] },
    { part: 'Trapèze', name: 'Tubercule du trapèze', dir: [1, -1, 1] },
    { part: 'Hamatum (os crochu)', name: 'Hamulus de l’hamatum (crochet)', dir: [-0.4, -1, 1] },
    { part: 'Capitatum (grand os)', name: 'Tête du capitatum', dir: [0, 1, 0] },
    { part: 'Lunatum (semi-lunaire)', name: 'Corne postérieure du lunatum', dir: [0, 0, -1] },

    { part: 'Premier métacarpien', name: 'Base du premier métacarpien', dir: [0, 1, 0] },
    { part: 'Premier métacarpien', name: 'Tête du premier métacarpien', dir: [0, -1, 0] },
    { part: 'Deuxième métacarpien', name: 'Tête du deuxième métacarpien', dir: [0, -1, 0] },
    { part: 'Troisième métacarpien', name: 'Processus styloïde du troisième métacarpien',
      dir: [1, 1, -1] },
    { part: 'Troisième métacarpien', name: 'Tête du troisième métacarpien', dir: [0, -1, 0] },
    { part: 'Quatrième métacarpien', name: 'Tête du quatrième métacarpien', dir: [0, -1, 0] },
    { part: 'Cinquième métacarpien', name: 'Tubérosité du cinquième métacarpien', dir: [-1, 1, 0] },
    { part: 'Cinquième métacarpien', name: 'Tête du cinquième métacarpien', dir: [0, -1, 0] },

    { part: 'Phalange proximale du pouce', name: 'Base de la phalange proximale du pouce',
      dir: [0, 1, 0] },
    { part: 'Phalange distale du pouce', name: 'Houppe unguéale du pouce', dir: [0, -1, 0] },
    { part: 'Phalange distale de l’index', name: 'Houppe unguéale de l’index', dir: [0, -1, 0] },
    { part: 'Phalange distale du majeur', name: 'Houppe unguéale du majeur', dir: [0, -1, 0] },
    { part: 'Phalange distale de l’annulaire', name: 'Houppe unguéale de l’annulaire', dir: [0, -1, 0] },
    { part: 'Phalange distale de l’auriculaire', name: 'Houppe unguéale de l’auriculaire', dir: [0, -1, 0] },
  ],

  // ------------------------------------------------------------- le pied
  //
  // The LEFT foot, flat: +x lateral, +y dorsal (up), +z forward toward the
  // toes. The long axis is z here, not y — a foot points where a hand hangs.
  pied: [
    { part: 'Calcanéus', name: 'Tubérosité calcanéenne', dir: [0, -0.4, -1] },
    { part: 'Calcanéus', name: 'Sustentaculum tali', dir: [-1, 0.5, 0.3] },
    { part: 'Calcanéus', name: 'Sillon du long fibulaire, sur le calcanéus', dir: [1, -0.5, 0.2] },
    { part: 'Talus', name: 'Trochlée du talus', dir: [0, 1, 0] },
    { part: 'Talus', name: 'Tête du talus', dir: [0, 0, 1] },
    { part: 'Talus', name: 'Col du talus', dir: [0, 1, 1], box: [[0, 0, 0.55], [1, 1, 0.80]] },
    { part: 'Talus', name: 'Processus postérieur du talus', dir: [0, 0, -1] },
    { part: 'Os naviculaire', name: 'Tubérosité de l’os naviculaire', dir: [-1, -0.3, 0] },
    { part: 'Os cuboïde', name: 'Sillon du tendon du long fibulaire', dir: [0, -1, -0.3] },
    { part: 'Cunéiforme médial', name: 'Face plantaire du cunéiforme médial', dir: [0, -1, 0] },

    { part: 'Premier métatarsien', name: 'Base du premier métatarsien', dir: [0, 0, -1] },
    { part: 'Premier métatarsien', name: 'Tête du premier métatarsien', dir: [0, -0.3, 1] },
    { part: 'Deuxième métatarsien', name: 'Base du deuxième métatarsien', dir: [0, 0.3, -1] },
    { part: 'Deuxième métatarsien', name: 'Tête du deuxième métatarsien', dir: [0, 0, 1] },
    { part: 'Troisième métatarsien', name: 'Tête du troisième métatarsien', dir: [0, 0, 1] },
    { part: 'Quatrième métatarsien', name: 'Tête du quatrième métatarsien', dir: [0, 0, 1] },
    { part: 'Cinquième métatarsien', name: 'Tubérosité du cinquième métatarsien', dir: [1, 0, -1] },
    { part: 'Cinquième métatarsien', name: 'Tête du cinquième métatarsien', dir: [0, 0, 1] },

    { part: 'Phalange proximale de l’hallux', name: 'Base de la phalange proximale de l’hallux',
      dir: [0, 0, -1] },
    { part: 'Phalange distale de l’hallux', name: 'Houppe unguéale de l’hallux', dir: [0, 0, 1] },
  ],

  // ---------------------------------------------------------- le thorax
  //
  // One hemithorax, left: +x lateral, +y up, +z anterior. A rib is read the
  // same way whichever one it is — head, neck, tubercle, angle, body, costal
  // groove — so the head and the angle are given for all twelve, and what is
  // particular to a rib is given only to that rib.
  thorax: [
    { part: 'Manubrium sternal', name: 'Incisure jugulaire (fourchette sternale)',
      dir: [0, 1, -0.4], box: [[0.35, 0.60, 0], [0.65, 1, 1]] },
    { part: 'Manubrium sternal', name: 'Incisure claviculaire gauche', dir: [1, 1, 0] },
    { part: 'Manubrium sternal', name: 'Angle sternal (de Louis)', dir: [0, -1, 1] },
    { part: 'Corps du sternum', name: 'Jonction xipho-sternale', dir: [0, -1, 0] },
    { part: 'Processus xiphoïde', name: 'Pointe du processus xiphoïde', dir: [0, -1, 0.3] },

    { part: 'Première côte', name: 'Tubercule du scalène antérieur', dir: [0, 1, 0.3] },
    { part: 'Première côte', name: 'Sillon de la veine subclavière', dir: [0, 0.6, 1] },
    { part: 'Première côte', name: 'Sillon de l’artère subclavière', dir: [0, 0.6, -1] },
    { part: 'Deuxième côte', name: 'Tubérosité du dentelé antérieur', dir: [1, 0, 0.4] },
    { part: 'Sixième côte', name: 'Sillon costal', dir: [0.3, -1, -0.5] },
    { part: 'Douzième côte', name: 'Extrémité libre de la douzième côte', dir: [1, 0, 0.5] },

    { part: 'Première côte', name: 'Tête de la première côte', dir: [-1, 0, -0.3] },
    { part: 'Première côte', name: 'Angle de la première côte', dir: [0.3, 0, -1] },
    { part: 'Deuxième côte', name: 'Tête de la deuxième côte', dir: [-1, 0, -0.3] },
    { part: 'Deuxième côte', name: 'Angle de la deuxième côte', dir: [0.3, 0, -1] },
    { part: 'Troisième côte', name: 'Tête de la troisième côte', dir: [-1, 0, -0.3] },
    { part: 'Troisième côte', name: 'Angle de la troisième côte', dir: [0.3, 0, -1] },
    { part: 'Quatrième côte', name: 'Tête de la quatrième côte', dir: [-1, 0, -0.3] },
    { part: 'Quatrième côte', name: 'Angle de la quatrième côte', dir: [0.3, 0, -1] },
    { part: 'Cinquième côte', name: 'Tête de la cinquième côte', dir: [-1, 0, -0.3] },
    { part: 'Cinquième côte', name: 'Angle de la cinquième côte', dir: [0.3, 0, -1] },
    { part: 'Sixième côte', name: 'Tête de la sixième côte', dir: [-1, 0, -0.3] },
    { part: 'Sixième côte', name: 'Angle de la sixième côte', dir: [0.3, 0, -1] },
    { part: 'Septième côte', name: 'Tête de la septième côte', dir: [-1, 0, -0.3] },
    { part: 'Septième côte', name: 'Angle de la septième côte', dir: [0.3, 0, -1] },
    { part: 'Huitième côte', name: 'Tête de la huitième côte', dir: [-1, 0, -0.3] },
    { part: 'Huitième côte', name: 'Angle de la huitième côte', dir: [0.3, 0, -1] },
    { part: 'Neuvième côte', name: 'Tête de la neuvième côte', dir: [-1, 0, -0.3] },
    { part: 'Neuvième côte', name: 'Angle de la neuvième côte', dir: [0.3, 0, -1] },
    { part: 'Dixième côte', name: 'Tête de la dixième côte', dir: [-1, 0, -0.3] },
    { part: 'Dixième côte', name: 'Angle de la dixième côte', dir: [0.3, 0, -1] },
    { part: 'Onzième côte', name: 'Tête de la onzième côte', dir: [-1, 0, -0.3] },
    { part: 'Onzième côte', name: 'Angle de la onzième côte', dir: [0.3, 0, -1] },
    { part: 'Douzième côte', name: 'Tête de la douzième côte', dir: [-1, 0, -0.3] },
    { part: 'Douzième côte', name: 'Angle de la douzième côte', dir: [0.3, 0, -1] },
    { part: 'Diaphragme', name: 'Centre tendineux du diaphragme', dir: [0, 1, 0],
      box: [[0.35, 0, 0.30], [0.65, 1, 0.75]] },
    { part: 'Diaphragme', name: 'Pilier droit du diaphragme', dir: [-0.4, -1, -1] },
    { part: 'Diaphragme', name: 'Pilier gauche du diaphragme', dir: [0.4, -1, -1] },
  ],

  // ------------------------------------- le rachis thoracique et lombal
  colonne: [
    { part: 'Vertèbre T1', name: 'Fossette costale supérieure de T1', dir: [1, 1, -0.3] },
    { part: 'Vertèbre T4', name: 'Processus épineux de T4', dir: [0, -0.4, -1] },
    { part: 'Vertèbre T6', name: 'Processus transverse gauche de T6', dir: [1, 0, -0.5] },
    { part: 'Vertèbre T6', name: 'Processus épineux de T6', dir: [0, -0.6, -1] },
    { part: 'Vertèbre T12', name: 'Processus épineux de T12', dir: [0, 0, -1] },
    { part: 'Vertèbre T12', name: 'Corps vertébral de T12', dir: [0, 0, 1] },

    { part: 'Vertèbre L1', name: 'Corps vertébral de L1', dir: [0, 0, 1] },
    { part: 'Vertèbre L1', name: 'Processus costiforme gauche de L1', dir: [1, 0, -0.2] },
    { part: 'Vertèbre L3', name: 'Processus épineux de L3', dir: [0, 0, -1] },
    { part: 'Vertèbre L4', name: 'Processus épineux de L4', dir: [0, 0, -1] },
    { part: 'Vertèbre L5', name: 'Corps vertébral de L5', dir: [0, -0.3, 1] },
    { part: 'Vertèbre L5', name: 'Processus articulaire inférieur gauche de L5', dir: [1, -1, -0.6] },

    { part: 'Sacrum', name: 'Promontoire sacré', dir: [0, 1, 1] },
    { part: 'Sacrum', name: 'Aile sacrée gauche', dir: [1, 0.6, 0] },
    { part: 'Sacrum', name: 'Crête sacrée médiane', dir: [0, 0.3, -1], box: [[0.42, 0, 0], [0.58, 1, 1]] },
    { part: 'Sacrum', name: 'Hiatus sacré', dir: [0, -1, -0.6], box: [[0.40, 0, 0], [0.60, 0.35, 1]] },
    { part: 'Sacrum', name: 'Surface auriculaire gauche', dir: [1, 0.2, -0.6] },
    { part: 'Sacrum', name: 'Apex du sacrum', dir: [0, -1, 0] },
    { part: 'Coccyx', name: 'Cornes coccygiennes', dir: [0, 1, -0.4] },
    { part: 'Coccyx', name: 'Pointe du coccyx', dir: [0, -1, 0] },
  ],

  // ------------------------------------------------- le rachis cervical
  rachis: [
    { part: 'Atlas (C1)', name: 'Tubercule antérieur de l’atlas', dir: [0, 0, 1],
      box: [[0.42, 0, 0], [0.58, 1, 1]] },
    { part: 'Atlas (C1)', name: 'Tubercule postérieur de l’atlas', dir: [0, 0, -1],
      box: [[0.42, 0, 0], [0.58, 1, 1]] },
    { part: 'Atlas (C1)', name: 'Sillon de l’artère vertébrale gauche', dir: [0.5, 1, -1] },
    { part: 'Atlas (C1)', name: 'Processus transverse gauche de l’atlas', dir: [1, 0, 0] },

    { part: 'Axis (C2)', name: 'Apex de la dent de l’axis', dir: [0, 1, 0] },
    { part: 'Axis (C2)', name: 'Facette articulaire antérieure de la dent', dir: [0, 0.6, 1] },
    { part: 'Axis (C2)', name: 'Processus épineux de l’axis', dir: [0, 0, -1] },

    { part: 'Vertèbre C4', name: 'Uncus gauche de C4', dir: [1, 1, 0] },
    { part: 'Vertèbre C4', name: 'Foramen transversaire gauche de C4', dir: [1, 0, 0.3],
      box: [[0.62, 0, 0.30], [1, 1, 0.90]] },
    { part: 'Vertèbre C6', name: 'Tubercule carotidien (de Chassaignac) gauche', dir: [1, 0, 1] },
    { part: 'Vertèbre C7', name: 'Processus épineux de C7 (vertèbre proéminente)', dir: [0, 0, -1] },

    { part: 'Os hyoïde', name: 'Corps de l’os hyoïde', dir: [0, 0, 1],
      box: [[0.40, 0, 0], [0.60, 1, 1]] },
    { part: 'Os hyoïde', name: 'Grande corne gauche de l’hyoïde', dir: [1, 0, -1] },
    { part: 'Os hyoïde', name: 'Petite corne gauche de l’hyoïde', dir: [0.5, 1, 0.3] },

    { part: 'Cartilage thyroïde', name: 'Proéminence laryngée (pomme d’Adam)',
      dir: [0, 0, 1], box: [[0.42, 0, 0], [0.58, 1, 1]] },
    { part: 'Cartilage thyroïde', name: 'Incisure thyroïdienne supérieure',
      dir: [0, 1, 1], box: [[0.42, 0.55, 0], [0.58, 1, 1]] },
    { part: 'Cartilage thyroïde', name: 'Corne supérieure gauche du thyroïde', dir: [0.6, 1, -0.6] },
    { part: 'Cartilage thyroïde', name: 'Corne inférieure gauche du thyroïde', dir: [0.6, -1, -0.6] },
    { part: 'Cartilage thyroïde', name: 'Ligne oblique gauche', dir: [1, 0, 0.2] },

    { part: 'Cartilage cricoïde', name: 'Arc du cricoïde', dir: [0, -0.3, 1] },
    { part: 'Cartilage cricoïde', name: 'Lame (chaton) du cricoïde', dir: [0, 1, -1] },
    // The crico-thyroid membrane itself is between two cartilages and has no
    // geometry of its own. What is drawn is the upper border of the arch it
    // rises from, which is what a hand finds anyway.
    { part: 'Cartilage cricoïde', name: 'Bord supérieur de l’arc cricoïdien',
      dir: [0, 1, 1], box: [[0.35, 0.75, 0], [0.65, 1, 1]] },
  ],
};
