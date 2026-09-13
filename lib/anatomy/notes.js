// What a structure is, for a student who has just touched it.
//
// A model that only says "Os temporal" is a picture. The thing being revised
// is the rest: what the bone is made of, what it joins, what pulls on it, and
// what runs through it. That is standard descriptive anatomy — the same in
// every atlas, and unchanged for a century — so it is written here directly,
// in French, rather than scraped from anything.
//
// Keyed by the name with the side taken off, because the left temporal and
// the right temporal have the same description.
//
// Nomenclature follows the Terminologia Anatomica, with the older French term
// in brackets where a teacher still uses it.

import { boneOf } from './bundles.js';

export const NOTES = {
  crane: {
    // ---------------------------------------------------------------- os
    'Os frontal': {
      what: `Os impair et médian de la voûte. Il forme le front, le plafond des
        orbites et l'étage antérieur de la base du crâne.`,
      parts: ['Écaille frontale, verticale', 'Portions orbitaires, horizontales',
        'Portion nasale et épine nasale', 'Sinus frontaux'],
      relief: ['Bosses frontales', 'Arcades sourcilières', 'Glabelle',
        'Lignes temporales', 'Incisure (ou foramen) supra-orbitaire'],
      joints: ['Pariétaux, par la suture coronale', 'Sphénoïde', 'Ethmoïde',
        'Os nasaux, lacrymaux, maxillaires et zygomatiques'],
      muscles: ['Ventre frontal de l’occipito-frontal',
        'Corrugateur du sourcil et procérus', 'Temporal, sur la ligne temporale'],
      through: ['Incisure supra-orbitaire — nerf et vaisseaux supra-orbitaires (V1)',
        'Foramen supra-trochléaire — nerf et vaisseaux supra-trochléaires'],
    },

    'Os pariétal': {
      what: `Os pair, quadrilatère, le plus étendu de la voûte crânienne. Deux
        faces, quatre bords et quatre angles.`,
      parts: ['Face exocrânienne, convexe', 'Face endocrânienne, concave',
        'Quatre angles : frontal, sphénoïdal, occipital, mastoïdien'],
      relief: ['Bosse pariétale, point le plus saillant',
        'Lignes temporales supérieure et inférieure',
        'Sillons de l’artère méningée moyenne, sur la face interne',
        'Fossettes granulaires de Pacchioni', 'Sillon du sinus sagittal supérieur'],
      joints: ['Frontal, par la suture coronale', 'Pariétal opposé, par la suture sagittale',
        'Occipital, par la suture lambdoïde', 'Temporal, par la suture squameuse',
        'Sphénoïde, à l’angle du ptérion'],
      muscles: ['Temporal', 'Aponévrose épicrânienne'],
      through: ['Foramen pariétal — veine émissaire pariétale'],
      note: `Le ptérion, où se rejoignent frontal, pariétal, temporal et grande
        aile du sphénoïde, est le point le plus mince de la voûte : l'artère
        méningée moyenne y chemine juste en dedans.`,
    },

    'Os occipital': {
      what: `Os impair et médian, postérieur et inférieur, percé par le foramen
        magnum autour duquel il s'organise.`,
      parts: ['Écaille occipitale, en arrière', 'Parties latérales, portant les condyles',
        'Partie basilaire (clivus), en avant'],
      relief: ['Protubérance occipitale externe (inion)',
        'Lignes nuchales supérieure et inférieure', 'Crête occipitale externe',
        'Protubérance occipitale interne et sillons des sinus, sur la face interne'],
      joints: ['Pariétaux, par la suture lambdoïde', 'Temporaux',
        'Sphénoïde, par la synchondrose sphéno-occipitale', 'Atlas (C1)'],
      muscles: ['Trapèze et sterno-cléido-mastoïdien, sur la ligne nuchale supérieure',
        'Splénius de la tête et semi-épineux de la tête',
        'Droits postérieurs et obliques de la tête, dans le triangle sous-occipital',
        'Ligament nuchal, sur la crête occipitale externe'],
      through: ['Foramen magnum', 'Canal du nerf hypoglosse — nerf XII',
        'Canal condylaire — veine émissaire condylaire',
        'Foramen jugulaire, avec le temporal — veine jugulaire interne, IX, X, XI'],
    },

    'Os temporal': {
      what: `Os pair, le plus complexe du crâne. Il participe à la voûte et à la
        base, porte l'articulation temporo-mandibulaire et contient l'organe de
        l'audition et de l'équilibre.`,
      parts: ['Écaille (squama), verticale', 'Partie pétreuse (rocher)',
        'Partie mastoïdienne', 'Partie tympanique',
        'Processus styloïde', 'Processus zygomatique'],
      relief: ['Méat acoustique externe', 'Fosse mandibulaire et tubercule articulaire',
        'Processus mastoïde et cellules mastoïdiennes', 'Incisure mastoïdienne',
        'Éminence arquée et tegmen tympani, sur le rocher'],
      joints: ['Pariétal, par la suture squameuse', 'Occipital', 'Sphénoïde',
        'Zygomatique, par l’arcade', 'Mandibule, par l’articulation temporo-mandibulaire'],
      muscles: ['Temporal, sur l’écaille',
        'Sterno-cléido-mastoïdien, splénius et longissimus de la tête, sur la mastoïde',
        'Ventre postérieur du digastrique, dans l’incisure mastoïdienne',
        'Masséter, sur l’arcade zygomatique',
        'Bouquet de Riolan : stylo-hyoïdien, stylo-glosse, stylo-pharyngien'],
      through: ['Canal carotidien — artère carotide interne et plexus sympathique',
        'Foramen stylo-mastoïdien — nerf facial (VII) à sa sortie',
        'Méat acoustique interne — VII, VIII et artère labyrinthique',
        'Foramen jugulaire, avec l’occipital — veine jugulaire interne, IX, X, XI',
        'Canal musculo-tubaire — trompe auditive et muscle tenseur du tympan'],
    },

    'Os sphénoïde': {
      what: `Os impair et médian en forme de papillon, pièce centrale de la base
        du crâne. Il s'articule avec tous les autres os du crâne.`,
      parts: ['Corps, creusé des sinus sphénoïdaux', 'Petites ailes',
        'Grandes ailes', 'Processus ptérygoïdes, à deux lames'],
      relief: ['Selle turcique et fosse hypophysaire', 'Processus clinoïdes',
        'Fissure orbitaire supérieure', 'Épine du sphénoïde',
        'Hamulus ptérygoïdien', 'Fosse ptérygoïdienne'],
      joints: ['Frontal, ethmoïde, occipital, pariétaux, temporaux',
        'Vomer, palatins, zygomatiques'],
      muscles: ['Ptérygoïdien latéral et ptérygoïdien médial',
        'Temporal, sur la grande aile', 'Tenseur du voile du palais',
        'Constricteur supérieur du pharynx, sur l’hamulus'],
      through: ['Canal optique — nerf optique (II) et artère ophtalmique',
        'Fissure orbitaire supérieure — III, IV, V1, VI et veine ophtalmique supérieure',
        'Foramen rond — nerf maxillaire (V2)',
        'Foramen ovale — nerf mandibulaire (V3) et artère petite méningée',
        'Foramen épineux — artère méningée moyenne',
        'Canal ptérygoïdien — nerf et vaisseaux du canal ptérygoïdien'],
      note: `Le sinus caverneux repose de part et d'autre du corps : III, IV, V1,
        V2 et VI y cheminent avec la carotide interne.`,
    },

    'Os ethmoïde': {
      what: `Os impair et médian, léger et fragile, entre les deux orbites. Il
        forme le toit des fosses nasales et une partie du septum.`,
      parts: ['Lame criblée, horizontale', 'Crista galli', 'Lame perpendiculaire',
        'Labyrinthes (masses latérales) et cellules ethmoïdales',
        'Cornets nasaux supérieur et moyen'],
      relief: ['Lame orbitaire (os planum), très mince',
        'Processus unciné et bulle ethmoïdale', 'Hiatus semi-lunaire'],
      joints: ['Frontal, sphénoïde, nasaux, lacrymaux', 'Maxillaires, palatins',
        'Vomer et cornets nasaux inférieurs'],
      through: ['Lame criblée — filets du nerf olfactif (I)',
        'Foramens ethmoïdaux antérieur et postérieur — nerfs et vaisseaux ethmoïdaux'],
      note: `La crista galli donne insertion à la faux du cerveau. La lame
        orbitaire est si fine qu'une infection ethmoïdale passe facilement à
        l'orbite.`,
    },

    Mandibule: {
      what: `Os impair, le plus volumineux et le plus résistant de la face, et le
        seul os mobile du crâne. Il porte les dents inférieures.`,
      parts: ['Corps, horizontal', 'Branches (ramus), verticales', 'Angle (gonion)',
        'Processus condylaire', 'Processus coronoïde', 'Incisure mandibulaire'],
      relief: ['Protubérance mentonnière', 'Foramen mentonnier', 'Ligne oblique',
        'Épines mentonnières (apophyses géni)', 'Ligne mylo-hyoïdienne',
        'Foramen mandibulaire et lingula', 'Processus alvéolaire'],
      joints: ['Temporal, par l’articulation temporo-mandibulaire'],
      muscles: ['Masséter, sur la face latérale de l’angle',
        'Ptérygoïdien médial, sur la face médiale de l’angle',
        'Temporal, sur le processus coronoïde',
        'Ptérygoïdien latéral, sur le col du condyle',
        'Mylo-hyoïdien, génio-hyoïdien, génio-glosse et digastrique',
        'Buccinateur et muscles peauciers du menton'],
      through: ['Foramen mandibulaire et canal mandibulaire — nerf et artère alvéolaires inférieurs',
        'Foramen mentonnier — nerf et vaisseaux mentonniers'],
    },

    Maxillaire: {
      what: `Os pair, pièce principale du massif facial. Il porte les dents
        supérieures et entre dans la construction du palais, de l'orbite et des
        fosses nasales.`,
      parts: ['Corps, creusé du sinus maxillaire', 'Processus frontal',
        'Processus zygomatique', 'Processus palatin', 'Processus alvéolaire'],
      relief: ['Foramen infra-orbitaire', 'Tubérosité maxillaire',
        'Épine nasale antérieure', 'Fosse canine', 'Hiatus maxillaire'],
      joints: ['Frontal, ethmoïde, nasal, lacrymal', 'Zygomatique, palatin',
        'Vomer, cornet nasal inférieur', 'Maxillaire opposé, par la suture intermaxillaire'],
      muscles: ['Releveur de la lèvre supérieure et releveur de l’angle de la bouche',
        'Buccinateur', 'Nasal et abaisseur du septum',
        'Ptérygoïdien médial, sur la tubérosité'],
      through: ['Canal infra-orbitaire — nerf et vaisseaux infra-orbitaires (V2)',
        'Canal incisif — nerf naso-palatin et artère sphéno-palatine'],
    },

    'Os zygomatique': {
      what: `Os pair, la pommette. Il unit le maxillaire au temporal et au
        frontal et donne son relief à la joue.`,
      parts: ['Corps', 'Processus frontal', 'Processus temporal', 'Processus maxillaire'],
      relief: ['Arcade zygomatique, avec le processus zygomatique du temporal',
        'Foramen zygomatico-facial', 'Foramen zygomatico-temporal'],
      joints: ['Frontal, maxillaire, temporal', 'Grande aile du sphénoïde'],
      muscles: ['Masséter, sur le bord inférieur et l’arcade',
        'Grand et petit zygomatiques',
        'Élévateur de la lèvre supérieure et de l’aile du nez'],
      through: ['Foramens zygomatico-facial et zygomatico-temporal — rameaux du nerf zygomatique (V2)'],
    },

    'Os nasal': {
      what: `Os pair, petit et quadrangulaire. Les deux os nasaux forment la
        racine et le dos osseux du nez ; le reste du nez est cartilagineux.`,
      relief: ['Foramen nasal, pour un rameau vasculaire'],
      joints: ['Frontal', 'Lame perpendiculaire de l’ethmoïde',
        'Processus frontal du maxillaire', 'Os nasal opposé'],
      note: 'C’est l’os de la face le plus souvent fracturé.',
    },

    'Os lacrymal': {
      what: `Os pair, le plus petit et le plus fragile du crâne, dans la paroi
        médiale de l'orbite.`,
      relief: ['Crête lacrymale postérieure', 'Sillon lacrymal',
        'Fosse du sac lacrymal, avec le maxillaire'],
      joints: ['Frontal, ethmoïde', 'Maxillaire', 'Cornet nasal inférieur'],
      muscles: ['Portion lacrymale de l’orbiculaire de l’œil (muscle de Horner)'],
      through: ['Canal naso-lacrymal, avec le maxillaire — conduit lacrymo-nasal, vers le méat inférieur'],
    },

    'Os palatin': {
      what: `Os pair en forme de L, encastré entre le maxillaire et le processus
        ptérygoïde. Il complète le palais osseux en arrière.`,
      parts: ['Lame horizontale', 'Lame perpendiculaire', 'Processus pyramidal',
        'Processus orbitaire', 'Processus sphénoïdal'],
      relief: ['Épine nasale postérieure', 'Incisure sphéno-palatine',
        'Crêtes conchale et ethmoïdale'],
      joints: ['Maxillaire, sphénoïde, ethmoïde', 'Vomer, cornet nasal inférieur',
        'Palatin opposé'],
      muscles: ['Constricteur supérieur du pharynx', 'Muscles du voile du palais'],
      through: ['Foramen grand palatin — nerf et vaisseaux grands palatins',
        'Foramens petits palatins — nerfs petits palatins',
        'Foramen sphéno-palatin — artère sphéno-palatine et nerfs naso-palatins'],
    },

    'Cornet nasal inférieur': {
      what: `Os pair, lame enroulée appendue à la paroi latérale des fosses
        nasales. C'est un os indépendant, à la différence des cornets supérieur
        et moyen qui appartiennent à l'ethmoïde.`,
      relief: ['Processus lacrymal', 'Processus maxillaire', 'Processus ethmoïdal'],
      joints: ['Maxillaire, lacrymal', 'Ethmoïde, palatin'],
      note: `Le méat inférieur s'ouvre sous lui : c'est là que débouche le
        conduit lacrymo-nasal.`,
    },

    Vomer: {
      what: `Os impair et médian, mince lame quadrangulaire. Il forme la partie
        postéro-inférieure du septum nasal.`,
      joints: ['Sphénoïde, par les ailes du vomer',
        'Lame perpendiculaire de l’ethmoïde', 'Maxillaires et palatins, sur la crête nasale',
        'Cartilage septal, en avant'],
      note: `Septum nasal = lame perpendiculaire de l'ethmoïde en haut, vomer en
        bas et en arrière, cartilage septal en avant.`,
    },

    // ---------------------------------------------------------- les repères
    Glabelle: {
      what: `Saillie médiane et lisse du frontal, entre les deux arcades
        sourcilières, au-dessus de la racine du nez.`,
      note: 'Point céphalométrique antérieur, palpable sous la peau.',
    },

    'Foramen magnum': {
      what: `Le grand orifice de l'occipital. Il fait communiquer la cavité
        crânienne et le canal vertébral.`,
      through: ['Jonction bulbo-médullaire', 'Artères vertébrales',
        'Artère spinale antérieure et artères spinales postérieures',
        'Racines spinales du nerf accessoire (XI)',
        'Membrane tectoriale et ligaments alaires'],
      note: `Son engagement par les amygdales cérébelleuses est la complication
        redoutée de toute hypertension intracrânienne.`,
    },

    'Protubérance occipitale externe': {
      what: `Saillie médiane de l'écaille occipitale, à mi-hauteur de la nuque.
        Repère palpable, aussi appelée inion.`,
      muscles: ['Ligament nuchal', 'Trapèze'],
      note: `En regard, sur la face interne, la protubérance occipitale interne
        marque le confluent des sinus (pressoir d'Hérophile).`,
    },

    'Condyle occipital': {
      what: `Surface articulaire ovalaire et convexe, de part et d'autre du
        foramen magnum, sur la partie latérale de l'occipital.`,
      joints: ['Masse latérale de l’atlas — articulation atlanto-occipitale'],
      through: ['Canal du nerf hypoglosse, en avant du condyle — nerf XII',
        'Canal condylaire, en arrière — veine émissaire'],
      note: 'L’articulation atlanto-occipitale fait le mouvement du « oui ».',
    },

    'Processus mastoïde': {
      what: `Saillie conique du temporal, en arrière et en dessous de l'oreille.
        Palpable, creusée des cellules mastoïdiennes.`,
      muscles: ['Sterno-cléido-mastoïdien', 'Splénius de la tête',
        'Longissimus de la tête',
        'Ventre postérieur du digastrique, dans l’incisure mastoïdienne'],
      through: ['Foramen stylo-mastoïdien, en dedans — nerf facial (VII)'],
      note: `Les cellules mastoïdiennes communiquent avec la caisse du tympan :
        une otite peut s'y propager et donner une mastoïdite.`,
    },

    'Processus zygomatique du temporal': {
      what: `Prolongement antérieur de l'écaille du temporal. Il rejoint le
        processus temporal du zygomatique pour former l'arcade zygomatique.`,
      relief: ['Fosse mandibulaire et tubercule articulaire, à sa racine'],
      muscles: ['Masséter, sur le bord inférieur de l’arcade'],
      joints: ['Os zygomatique', 'Mandibule, par la fosse mandibulaire'],
    },

    'Processus ptérygoïde': {
      what: `Descend verticalement du sphénoïde, à la jonction du corps et de la
        grande aile. Deux lames, médiale et latérale, séparées par la fosse
        ptérygoïdienne.`,
      relief: ['Lames médiale et latérale', 'Fosse ptérygoïdienne',
        'Hamulus ptérygoïdien, au bas de la lame médiale'],
      muscles: ['Ptérygoïdien latéral, sur la face latérale de la lame latérale',
        'Ptérygoïdien médial, dans la fosse ptérygoïdienne',
        'Tenseur du voile du palais',
        'Constricteur supérieur du pharynx, sur l’hamulus'],
      through: ['Canal ptérygoïdien, à sa racine — nerf du canal ptérygoïdien'],
    },

    'Grande aile du sphénoïde': {
      what: `Large lame étalée de chaque côté du corps. Elle forme le plancher de
        la fosse crânienne moyenne, une partie de la paroi latérale de l'orbite
        et le fond de la fosse temporale.`,
      through: ['Foramen rond — nerf maxillaire (V2)',
        'Foramen ovale — nerf mandibulaire (V3) et artère petite méningée',
        'Foramen épineux — artère méningée moyenne'],
      muscles: ['Temporal', 'Ptérygoïdien latéral, sur sa face infra-temporale'],
      note: 'Rond, ovale, épineux : d’avant en arrière et de dedans en dehors.',
    },

    'Condyle mandibulaire': {
      what: `Extrémité supérieure et postérieure du ramus, portée par le col de
        la mandibule.`,
      joints: ['Fosse mandibulaire du temporal, par l’intermédiaire du disque articulaire'],
      muscles: ['Ptérygoïdien latéral, dans la fovéa ptérygoïdienne du col'],
      note: `Le col est un point de fracture fréquent ; la luxation se fait en
        avant du tubercule articulaire.`,
    },

    'Processus coronoïde': {
      what: `Lame triangulaire à l'extrémité antéro-supérieure du ramus, séparée
        du condyle par l'incisure mandibulaire.`,
      muscles: ['Temporal, sur son sommet et son bord antérieur'],
    },

    'Angle de la mandibule': {
      what: `Jonction du bord inférieur du corps et du bord postérieur du ramus.
        Repère palpable, appelé gonion.`,
      muscles: ['Masséter, en dehors', 'Ptérygoïdien médial, en dedans'],
      note: `Les deux muscles forment la sangle ptérygo-massétérine, qui enserre
        l'angle de part et d'autre.`,
    },

    'Protubérance mentonnière': {
      what: `Saillie triangulaire médiane du corps de la mandibule. Elle est
        propre à l'espèce humaine.`,
      through: ['Foramen mentonnier, en dehors et au-dessus — nerf mentonnier (V3)'],
      muscles: ['Mentonnier', 'Abaisseur de la lèvre inférieure'],
    },

    'Processus frontal du maxillaire': {
      what: `Montant qui remonte du corps du maxillaire vers le frontal. Il forme
        le bord médial de l'orbite et la paroi latérale du nez.`,
      relief: ['Crête lacrymale antérieure', 'Fosse du sac lacrymal, avec l’os lacrymal'],
      joints: ['Frontal', 'Os nasal', 'Os lacrymal'],
    },

    'Processus alvéolaire': {
      what: `Bord inférieur du maxillaire, creusé des alvéoles dentaires
        supérieures.`,
      note: 'Il se résorbe après la perte des dents.',
    },

    'Processus temporal du zygomatique': {
      what: `Prolongement postérieur du zygomatique. Il rejoint le processus
        zygomatique du temporal pour fermer l'arcade zygomatique.`,
      muscles: ['Masséter, sur le bord inférieur de l’arcade'],
      joints: ['Os temporal'],
    },

    'Processus frontal du zygomatique': {
      what: `Montant qui s'élève vers le frontal et ferme le bord latéral de
        l'orbite.`,
      joints: ['Processus zygomatique du frontal', 'Grande aile du sphénoïde'],
      note: 'Repère palpable au bord externe de l’œil.',
    },

    // ------------------------------------------------------- les orifices
    'Canal optique': {
      what: `Creusé dans la petite aile du sphénoïde. Il fait communiquer
        l'étage antérieur de la base du crâne et le sommet de l'orbite.`,
      through: ['Nerf optique (II), entouré de ses méninges',
        'Artère ophtalmique, première branche de la carotide interne'],
    },

    'Fissure orbitaire supérieure': {
      what: `Fente entre la petite et la grande aile du sphénoïde. Elle unit la
        fosse crânienne moyenne au sommet de l'orbite.`,
      through: ['Nerf oculomoteur (III)', 'Nerf trochléaire (IV)',
        'Nerf ophtalmique (V1) : branches lacrymale, frontale et naso-ciliaire',
        'Nerf abducens (VI)', 'Veine ophtalmique supérieure',
        'Rameaux sympathiques du plexus carotidien'],
      note: `Le syndrome de la fissure orbitaire supérieure associe
        ophtalmoplégie complète, ptosis, mydriase aréflexique et anesthésie du
        territoire de V1.`,
    },

    'Foramen rond': {
      what: `Percé dans la grande aile du sphénoïde. Il ouvre la fosse
        crânienne moyenne sur la fosse ptérygo-palatine.`,
      through: ['Nerf maxillaire (V2)'],
    },

    'Foramen ovale': {
      what: `Dans la grande aile du sphénoïde, en arrière et en dehors du
        foramen rond. Il ouvre sur la fosse infra-temporale.`,
      through: ['Nerf mandibulaire (V3)',
        'Artère petite méningée (méningée accessoire)',
        'Nerf petit pétreux', 'Plexus veineux du foramen ovale'],
    },

    'Foramen épineux': {
      what: `Le plus petit et le plus postérieur des trois, percé près de
        l'épine du sphénoïde.`,
      through: ['Artère méningée moyenne et ses veines',
        'Rameau méningé du nerf mandibulaire (nerf épineux)'],
      note: `L'artère méningée moyenne chemine ensuite en dedans du ptérion,
        où la voûte est la plus mince : sa rupture donne l'hématome
        extra-dural.`,
    },

    'Canal ptérygoïdien': {
      what: `Creusé à la racine du processus ptérygoïde, dans l'épaisseur du
        sphénoïde. Il joint le foramen déchiré à la fosse ptérygo-palatine.
        Autrefois appelé canal vidien.`,
      through: ['Nerf du canal ptérygoïdien, formé du nerf grand pétreux et du nerf pétreux profond',
        'Artère et veine du canal ptérygoïdien'],
    },

    'Canal carotidien': {
      what: `Creusé dans la partie pétreuse du temporal. Il s'ouvre à la face
        inférieure du rocher, monte, puis se coude en avant et en dedans pour
        déboucher à l'apex pétreux.`,
      through: ['Artère carotide interne',
        'Plexus sympathique péri-carotidien', 'Veines carotidiennes'],
    },

    'Méat acoustique interne': {
      what: `S'ouvre sur la face postéro-supérieure du rocher et conduit au
        fond du conduit, vers l'oreille interne.`,
      through: ['Nerf facial (VII) et nerf intermédiaire',
        'Nerf vestibulo-cochléaire (VIII)',
        'Artère labyrinthique, branche de l’artère cérébelleuse antéro-inférieure'],
    },

    'Foramen stylo-mastoïdien': {
      what: `À la face inférieure du temporal, entre le processus styloïde et
        le processus mastoïde.`,
      through: ['Nerf facial (VII), à sa sortie du crâne',
        'Artère stylo-mastoïdienne'],
      note: `C'est là que le facial devient extra-crânien, juste avant
        d'entrer dans la glande parotide, où il se divise.`,
    },

    'Foramen jugulaire': {
      what: `Entre la partie pétreuse du temporal et l'occipital. Il est
        cloisonné en deux compartiments, nerveux en avant et veineux en
        arrière.`,
      through: ['Sinus pétreux inférieur, en avant',
        'Nerf glosso-pharyngien (IX)', 'Nerf vague (X)', 'Nerf accessoire (XI)',
        'Golfe de la veine jugulaire interne, en arrière',
        'Artère méningée postérieure'],
    },

    'Canal du nerf hypoglosse': {
      what: `Creusé dans la partie latérale de l'occipital, au-dessus et en
        avant du condyle.`,
      through: ['Nerf hypoglosse (XII)', 'Rameau méningé', 'Plexus veineux'],
    },

    'Canal condylaire': {
      what: `En arrière du condyle occipital. Inconstant, et souvent présent
        d'un seul côté.`,
      through: ['Veine émissaire condylaire, qui unit le sinus sigmoïde au plexus veineux vertébral'],
    },

    'Foramens de la lame criblée': {
      what: `La lame criblée de l'ethmoïde est percée d'une vingtaine
        d'orifices de chaque côté de la crista galli.`,
      through: ['Filets du nerf olfactif (I), venus de la muqueuse olfactive',
        'Artères et veines ethmoïdales antérieures'],
      note: `Une fracture de l'étage antérieur y ouvre une brèche
        ostéo-durale : anosmie et rhinorrhée cérébro-spinale.`,
    },

    'Foramen supra-orbitaire': {
      what: `Sur le bord supra-orbitaire du frontal, à l'union du tiers médial
        et des deux tiers latéraux. Souvent une simple incisure plutôt qu'un
        vrai foramen.`,
      through: ['Nerf supra-orbitaire (V1)', 'Artère et veine supra-orbitaires'],
    },

    'Foramen infra-orbitaire': {
      what: `Sur la face antérieure du maxillaire, à un centimètre environ
        sous le rebord orbitaire inférieur. C'est la sortie du canal
        infra-orbitaire.`,
      through: ['Nerf infra-orbitaire (V2)', 'Artère et veine infra-orbitaires'],
      note: `Supra-orbitaire, infra-orbitaire et mentonnier sont sur une même
        verticale : les trois points de sortie du trijumeau à la face.`,
    },

    'Foramen mandibulaire': {
      what: `Sur la face médiale de la branche de la mandibule, bordé en avant
        par la lingula. Il ouvre le canal mandibulaire.`,
      through: ['Nerf alvéolaire inférieur (V3)',
        'Artère et veine alvéolaires inférieures'],
      note: `C'est le repère de l'anesthésie tronculaire du nerf alvéolaire
        inférieur, à l'épine de Spix.`,
    },

    'Foramen mentonnier': {
      what: `Sur la face latérale du corps de la mandibule, en regard de la
        deuxième prémolaire. Terminaison du canal mandibulaire.`,
      through: ['Nerf mentonnier (V3)', 'Artère et veine mentonnières'],
    },

    'Foramen grand palatin': {
      what: `À l'angle postéro-latéral du palais osseux, dans l'os palatin.`,
      through: ['Nerf grand palatin (V2)', 'Artère et veine grandes palatines'],
    },

    'Foramen zygomatico-facial': {
      what: `Sur la face latérale de l'os zygomatique, au-dessous et en dehors
        de l'orbite.`,
      through: ['Nerf zygomatico-facial (V2)', 'Vaisseaux homonymes'],
    },

    'Bosse pariétale': {
      what: `Point le plus saillant de la face externe du pariétal, et centre
        d'ossification de l'os.`,
      note: 'Les deux bosses marquent la largeur maximale du crâne.',
    },
  },
};

// ---------------------------------------------------------------------------
// Les vaisseaux de la tête et du cou.
//
// A vessel is read differently again: where it comes from, the course it
// takes, what it gives off, what it drains, what it supplies and where it
// ends. Origine · Trajet · Branches · Affluents · Territoire · Terminaison.

NOTES.vaisseaux = {
  // ------------------------------------------------------------- les troncs
  'Crosse de l’aorte': {
    what: `Portion horizontale de l'aorte, dans le médiastin supérieur. Elle
      enjambe la bronche principale gauche et donne les trois vaisseaux qui
      montent vers la tête et les membres supérieurs.`,
    origin: ['Suite de l’aorte ascendante, en regard du 2e cartilage costal droit'],
    course: ['D’avant en arrière et de droite à gauche, au-dessus du hile pulmonaire gauche',
      'Se termine en aorte thoracique descendante, à hauteur de T4'],
    branches: ['Tronc brachio-céphalique', 'Artère carotide commune gauche',
      'Artère subclavière gauche'],
    near: ['Nerf laryngé récurrent gauche, qui contourne la crosse sous le ligament artériel',
      'Trachée et œsophage, en arrière', 'Thymus et veine brachio-céphalique gauche, en avant'],
    note: `L'asymétrie est le point à retenir : à droite un tronc unique qui se
      divise, à gauche deux artères nées directement de la crosse.`,
  },

  'Tronc brachio-céphalique': {
    what: `Premier et plus volumineux collatéral de la crosse. Il n'existe qu'à
      droite et ne mesure que quatre à cinq centimètres.`,
    origin: ['Face supérieure de la crosse de l’aorte, en avant de la trachée'],
    course: ['En haut, en arrière et à droite, derrière l’articulation sterno-claviculaire droite'],
    ends: ['Se divise en artère carotide commune droite et artère subclavière droite'],
    note: 'Il n’a pas d’équivalent à gauche : c’est l’asymétrie de la crosse.',
  },

  'Artère carotide commune': {
    what: `L'artère nourricière de la tête. Elle monte dans le cou sans donner
      aucune collatérale et se divise en carotide interne et carotide externe.`,
    origin: ['À droite, du tronc brachio-céphalique',
      'À gauche, directement de la crosse de l’aorte — elle est donc plus longue'],
    course: ['Dans la gaine carotidienne, en dedans de la veine jugulaire interne',
      'Le nerf vague est dans l’angle dièdre postérieur entre les deux'],
    ends: ['Bifurcation au bord supérieur du cartilage thyroïde, à hauteur de C4'],
    near: ['Gaine carotidienne : artère en dedans, veine jugulaire interne en dehors, X en arrière',
      'Muscle sterno-cléido-mastoïdien, qui la recouvre',
      'Anse cervicale, en avant de la gaine'],
    note: `Elle ne donne rien dans le cou : toute branche cervicale vient de la
      carotide externe. Le sinus carotidien, à la bifurcation, est un
      baro-récepteur innervé par le IX.`,
  },

  'Artère subclavière': {
    what: `Artère du membre supérieur, mais elle donne au passage la vertébrale
      et la thyroïdienne inférieure, donc elle appartient aussi à la
      vascularisation de la tête et du cou.`,
    origin: ['À droite, du tronc brachio-céphalique',
      'À gauche, de la crosse de l’aorte'],
    course: ['Décrit une crosse au-dessus de la première côte',
      'Divisée en trois portions par le muscle scalène antérieur'],
    branches: ['Artère vertébrale', 'Artère thoracique interne',
      'Tronc thyro-cervical, dont l’artère thyroïdienne inférieure',
      'Tronc costo-cervical'],
    ends: ['Devient artère axillaire au bord externe de la première côte'],
    near: ['Plexus brachial, en haut et en dehors', 'Dôme pleural, en dessous'],
  },

  // ------------------------------------------------- le système carotidien
  'Artère carotide externe': {
    what: `Branche de bifurcation destinée à la face, au cou et aux téguments
      du crâne. C'est elle, et elle seule, qui donne des collatérales dans le
      cou : six, plus deux branches terminales.`,
    origin: ['Bifurcation carotidienne, au bord supérieur du cartilage thyroïde'],
    course: ['D’abord en avant et en dedans de la carotide interne, puis elle croise en dehors',
      'Traverse la glande parotide, où elle se divise'],
    branches: ['Artère thyroïdienne supérieure, la première, descendante',
      'Artère pharyngienne ascendante, la seule de la face profonde',
      'Artère linguale', 'Artère faciale', 'Artère occipitale',
      'Artère auriculaire postérieure'],
    ends: ['Artère temporale superficielle et artère maxillaire, dans la parotide'],
    near: ['Glande parotide, qu’elle traverse',
      'Nerf facial, plus superficiel qu’elle dans la parotide',
      'Veine rétro-mandibulaire, entre les deux'],
    note: `Dans la parotide les trois se superposent, du plus profond au plus
      superficiel : artère carotide externe, veine rétro-mandibulaire, nerf
      facial. Le nerf est le plus superficiel — c'est pourquoi il est le
      premier menacé par une tumeur ou une chirurgie parotidienne.`,
  },

  'Artère carotide interne': {
    what: `Artère du cerveau et de l'œil. Elle ne donne rien dans le cou et
      entre dans le crâne par le canal carotidien du rocher.`,
    origin: ['Bifurcation carotidienne, à hauteur de C4'],
    course: ['Portion cervicale, verticale, sans aucune collatérale',
      'Portion pétreuse, dans le canal carotidien du temporal',
      'Portion caverneuse, en S dans le sinus caverneux — le siphon carotidien',
      'Portion cérébrale, après avoir percé la dure-mère'],
    branches: ['Artère ophtalmique', 'Artère communicante postérieure',
      'Artère choroïdienne antérieure'],
    ends: ['Artère cérébrale antérieure et artère cérébrale moyenne'],
    near: ['Sinus caverneux, qu’elle traverse avec le VI collé contre elle',
      'III, IV, V1 et V2 dans la paroi latérale du sinus'],
    note: `Une absence totale de collatérale cervicale est un point d'examen :
      toute artère palpable dans le cou vient de la carotide externe.`,
  },

  'Artère ophtalmique': {
    what: `Première branche intracrânienne de la carotide interne, et l'artère
      de l'œil.`,
    origin: ['Carotide interne, dès sa sortie du sinus caverneux'],
    course: ['Entre dans l’orbite par le canal optique, sous le nerf optique'],
    branches: ['Artère centrale de la rétine', 'Artères ciliaires',
      'Artère lacrymale', 'Artères ethmoïdales',
      'Artères supra-orbitaire et supra-trochléaire'],
    supplies: ['Globe oculaire et rétine', 'Muscles de l’orbite',
      'Paupières, front et racine du nez'],
    note: `L'artère centrale de la rétine est terminale : son occlusion donne
      une cécité monoculaire brutale et définitive. C'est aussi par les
      branches faciales de l'ophtalmique que se fait l'anastomose entre
      carotide interne et carotide externe.`,
  },

  'Artère pharyngienne ascendante': {
    what: `La plus grêle des collatérales de la carotide externe, et la seule
      qui naisse de sa face profonde.`,
    origin: ['Face médiale de la carotide externe, près de son origine'],
    course: ['Monte verticalement entre le pharynx et la carotide interne'],
    supplies: ['Paroi pharyngée', 'Méninges, par une branche méningée postérieure',
      'Oreille moyenne'],
  },

  'Artère faciale': {
    what: `L'artère de la face. Son trajet en zigzag lui donne une longueur de
      réserve qui suit les mouvements de la mandibule et des lèvres.`,
    origin: ['Face antérieure de la carotide externe, au-dessus de la linguale'],
    course: ['Contourne la glande submandibulaire, puis croise le bord inférieur de la mandibule',
      'Devient superficielle au bord antérieur du masséter, où on la palpe',
      'Monte en zigzag vers l’angle interne de l’œil'],
    branches: ['Artère palatine ascendante', 'Artère submentale',
      'Artères labiales supérieure et inférieure'],
    ends: ['Artère angulaire, à l’angle médial de l’œil'],
    note: `Le pouls facial se prend au bord antérieur du masséter, sur le bord
      de la mandibule. L'artère angulaire s'anastomose avec des branches de
      l'ophtalmique : c'est un pont entre carotide externe et carotide interne.`,
  },

  'Artère occipitale': {
    what: `Artère de la région occipitale et d'une partie des muscles de la
      nuque.`,
    origin: ['Face postérieure de la carotide externe, en regard de la faciale'],
    course: ['En arrière, dans le sillon de l’artère occipitale sous le processus mastoïde',
      'Perce les muscles de la nuque et devient sous-cutanée'],
    supplies: ['Cuir chevelu de la région occipitale',
      'Muscles de la nuque', 'Méninges, par une branche mastoïdienne'],
    near: ['Nerf grand occipital (Arnold), qui l’accompagne dans le cuir chevelu'],
  },

  'Artère temporale superficielle': {
    what: `Branche terminale superficielle de la carotide externe, et la
      dernière artère palpable du crâne.`,
    origin: ['Dans la glande parotide, par bifurcation de la carotide externe'],
    course: ['Monte en avant du tragus, sur la racine du processus zygomatique',
      'Se divise en une branche frontale et une branche pariétale'],
    branches: ['Artère transverse de la face', 'Artère zygomatico-orbitaire',
      'Artère temporale moyenne'],
    supplies: ['Cuir chevelu des régions frontale, temporale et pariétale'],
    note: `On la palpe en avant du tragus. Sa biopsie est l'examen de la
      maladie de Horton ; son artérite donne la céphalée temporale du sujet âgé.`,
  },

  'Artère maxillaire': {
    what: `Branche terminale profonde de la carotide externe, la plus
      volumineuse, et l'artère de la région profonde de la face.`,
    origin: ['Dans la parotide, derrière le col de la mandibule'],
    course: ['Trois portions : mandibulaire, ptérygoïdienne et ptérygo-palatine',
      'Traverse la fosse infra-temporale et gagne la fosse ptérygo-palatine'],
    branches: ['Artère méningée moyenne', 'Artère alvéolaire inférieure',
      'Artères temporales profondes et artères des muscles masticateurs',
      'Artère buccale', 'Artère alvéolaire supérieure postérieure',
      'Artère infra-orbitaire', 'Artère palatine descendante'],
    ends: ['Artère sphéno-palatine, dans la fosse ptérygo-palatine'],
    note: `La sphéno-palatine est l'artère de l'épistaxis grave : elle est la
      principale source de la tache vasculaire de la cloison.`,
  },

  'Artère méningée moyenne': {
    what: `Artère de la dure-mère, et la plus importante des artères méningées.
      Elle est appliquée contre la face interne de la voûte, dans des sillons
      qu'elle y creuse.`,
    origin: ['Première portion de l’artère maxillaire'],
    course: ['Monte entre les deux racines du nerf auriculo-temporal',
      'Entre dans le crâne par le foramen épineux',
      'Se divise en branche antérieure et branche postérieure sur la face interne du pariétal'],
    supplies: ['Dure-mère', 'Os de la voûte crânienne'],
    near: ['Ptérion, où sa branche antérieure est séparée de l’extérieur par un os très mince'],
    note: `Sa rupture au ptérion donne l'hématome extra-dural : un traumatisme
      temporal, un intervalle libre, puis une aggravation rapide. C'est la
      raison pour laquelle le ptérion est enseigné.`,
  },

  'Artère alvéolaire inférieure': {
    what: `Artère de la mandibule et des dents inférieures, qui chemine dans
      l'os avec le nerf du même nom.`,
    origin: ['Première portion de l’artère maxillaire'],
    course: ['Descend vers le foramen mandibulaire et parcourt le canal mandibulaire'],
    branches: ['Rameau mylo-hyoïdien', 'Rameaux dentaires'],
    ends: ['Artère mentonnière, par le foramen mentonnier'],
    near: ['Nerf alvéolaire inférieur (V3), qu’elle accompagne dans tout le canal'],
  },

  // ------------------------------------------- le système vertébro-basilaire
  'Artère vertébrale': {
    what: `Première branche de la subclavière et artère du cerveau postérieur.
      Son trajet dans les processus transverses des vertèbres cervicales est ce
      qui la distingue de toute autre artère.`,
    origin: ['Face supérieure de la première portion de l’artère subclavière'],
    course: ['Monte dans les foramens transversaires de C6 à C1',
      'Contourne la masse latérale de l’atlas dans le sillon de l’artère vertébrale',
      'Perce la membrane atlanto-occipitale et entre par le foramen magnum'],
    branches: ['Artère spinale antérieure', 'Artère spinale postérieure',
      'Artère cérébelleuse postéro-inférieure (PICA)'],
    ends: ['Les deux vertébrales s’unissent en tronc basilaire, au bord inférieur du pont'],
    note: `Elle n'entre pas dans le foramen transversaire de C7 : elle commence
      à C6. L'occlusion de la PICA donne le syndrome de Wallenberg.`,
  },

  'Tronc basilaire': {
    what: `Artère impaire et médiane, née de la réunion des deux vertébrales.
      Elle est appliquée sur la face antérieure du pont, dans le sillon
      basilaire.`,
    origin: ['Réunion des deux artères vertébrales, au bord inférieur du pont'],
    course: ['Monte sur la face antérieure du pont jusqu’au bord supérieur'],
    branches: ['Artère cérébelleuse antéro-inférieure (AICA)',
      'Artères pontiques, médiales et latérales',
      'Artère labyrinthique', 'Artère cérébelleuse supérieure'],
    ends: ['Se divise en deux artères cérébrales postérieures'],
    note: `Sa thrombose est la plus grave des occlusions artérielles
      intracrâniennes : le tronc cérébral entier en dépend.`,
  },

  // ------------------------------------------------- les artères cérébrales
  'Artère cérébrale antérieure': {
    what: `Branche terminale antérieure de la carotide interne. Elle contourne
      le genou du corps calleux et irrigue la face interne de l'hémisphère.`,
    origin: ['Bifurcation terminale de la carotide interne'],
    course: ['En avant et en dedans au-dessus du nerf optique',
      'Rejoint sa symétrique par la communicante antérieure',
      'Contourne le genou du corps calleux'],
    supplies: ['Face médiale du lobe frontal et du lobe pariétal',
      'Partie du corps calleux',
      'Territoire moteur et sensitif du membre inférieur'],
    note: `Son occlusion donne une monoplégie du membre inférieur
      controlatéral : c'est le membre inférieur qui occupe la face interne de
      l'homoncule.`,
  },

  'Artère cérébrale moyenne': {
    what: `La plus volumineuse des branches terminales de la carotide interne,
      et la plus souvent touchée par un infarctus. Elle s'engage dans la vallée
      sylvienne.`,
    origin: ['Bifurcation terminale de la carotide interne'],
    course: ['Segment M1, horizontal, dans la vallée sylvienne',
      'Segment M2, insulaire', 'Segments M3 et M4, corticaux'],
    branches: ['Artères lenticulo-striées, perforantes, du segment M1'],
    supplies: ['Face latérale de l’hémisphère',
      'Territoires moteur et sensitif de la face et du membre supérieur',
      'Aires du langage dans l’hémisphère dominant'],
    note: `Elle reçoit le plus gros débit et prolonge la carotide interne en
      ligne droite, ce qui explique qu'un embole y aille de préférence.
      Hémiplégie à prédominance brachio-faciale, et aphasie à gauche.`,
  },

  'Artère cérébrale postérieure': {
    what: `Branche terminale du tronc basilaire, artère du lobe occipital et de
      la face inférieure du lobe temporal.`,
    origin: ['Bifurcation du tronc basilaire'],
    course: ['Contourne le pédoncule cérébral et gagne la face inférieure et interne de l’hémisphère'],
    supplies: ['Lobe occipital et cortex visuel',
      'Face inférieure du lobe temporal', 'Thalamus, par des branches perforantes'],
    note: `Son occlusion donne une hémianopsie latérale homonyme
      controlatérale : le cortex visuel primaire est dans son territoire.`,
  },

  'Artère communicante antérieure': {
    what: `Court vaisseau transversal, souvent long de deux ou trois
      millimètres, qui relie les deux cérébrales antérieures et ferme le
      polygone en avant.`,
    origin: ['Entre les deux artères cérébrales antérieures'],
    note: `C'est le siège le plus fréquent des anévrismes du polygone de
      Willis.`,
  },

  'Artère communicante postérieure': {
    what: `Elle relie la carotide interne à la cérébrale postérieure et ferme
      ainsi le polygone de Willis latéralement : c'est l'anastomose entre le
      système carotidien et le système vertébro-basilaire.`,
    origin: ['Face postérieure de la carotide interne'],
    course: ['En arrière, jusqu’à l’artère cérébrale postérieure'],
    near: ['Nerf oculomoteur (III), qui chemine juste en dessous'],
    note: `Un anévrisme de la communicante postérieure comprime le III : c'est
      une paralysie oculomotrice avec mydriase, et une urgence.`,
  },

  // ------------------------------------------------------------- les veines
  'Veine jugulaire interne': {
    what: `La veine principale de la tête et du cou : elle draine le cerveau,
      la face et le cou. Elle prend la suite du sinus sigmoïde.`,
    origin: ['Golfe de la jugulaire, à la sortie du foramen jugulaire'],
    course: ['Descend dans la gaine carotidienne, en dehors de la carotide',
      'Le nerf vague est entre les deux, en arrière'],
    tributaries: ['Veine faciale, par le tronc thyro-linguo-facial',
      'Veine linguale', 'Veines thyroïdiennes supérieure et moyenne',
      'Veine pharyngienne'],
    ends: ['S’unit à la veine subclavière pour former le tronc veineux brachio-céphalique'],
    near: ['Confluent de Pirogoff, jonction avec la subclavière',
      'Canal thoracique, qui s’y jette à gauche'],
    note: `Sa turgescence est un signe d'insuffisance cardiaque droite. Le
      foramen jugulaire livre aussi passage au IX, au X et au XI.`,
  },

  'Veine jugulaire externe': {
    what: `Veine superficielle du cou, sous-cutanée, visible à travers la peau
      quand la pression veineuse monte.`,
    origin: ['Réunion de la division postérieure de la rétro-mandibulaire et de la veine auriculaire postérieure'],
    course: ['Descend obliquement en travers du sterno-cléido-mastoïdien, sous le platysma'],
    ends: ['Veine subclavière, après avoir perforé le fascia cervical'],
    note: 'Elle est en dehors du muscle, ce qui la distingue de l’interne.',
  },

  'Veine jugulaire antérieure': {
    what: `Petite veine superficielle et médiane, paire, dans la région
      sous-hyoïdienne.`,
    origin: ['Veines submentales, sous le menton'],
    course: ['Descend près de la ligne médiane, puis s’écarte au-dessus du sternum'],
    ends: ['Veine jugulaire externe ou veine subclavière'],
    note: `Les deux jugulaires antérieures sont reliées par l'arc veineux
      jugulaire, au-dessus du manubrium : c'est le vaisseau que la trachéotomie
      doit éviter.`,
  },

  'Veine faciale': {
    what: `Veine de la face, satellite de l'artère faciale mais plus rectiligne
      qu'elle.`,
    origin: ['Veine angulaire, à l’angle médial de l’œil'],
    course: ['Descend en arrière de l’artère faciale, en ligne droite',
      'Croise le bord inférieur de la mandibule'],
    ends: ['Veine jugulaire interne, souvent par un tronc commun avec la linguale et la thyroïdienne supérieure'],
    note: `Par la veine angulaire et les veines ophtalmiques elle communique
      avec le sinus caverneux, sans valvule. C'est le trajet d'une
      thrombophlébite du sinus caverneux à partir d'un furoncle de la lèvre
      supérieure ou de l'aile du nez — le triangle de la mort.`,
  },

  'Veine rétro-mandibulaire': {
    what: `Veine profonde de la parotide, née derrière le col de la mandibule.`,
    origin: ['Réunion de la veine temporale superficielle et des veines maxillaires'],
    course: ['Descend dans la glande parotide, entre le nerf facial et la carotide externe'],
    ends: ['Se divise en une division antérieure, pour la veine faciale, et une division postérieure, pour la jugulaire externe'],
    near: ['Nerf facial, en dehors d’elle', 'Artère carotide externe, en dedans'],
  },

  'Tronc veineux brachio-céphalique': {
    what: `Gros tronc veineux du médiastin supérieur, formé par la jonction de
      la jugulaire interne et de la subclavière. Il existe à droite et à
      gauche, mais les deux sont très inégaux.`,
    origin: ['Confluent jugulo-subclavier, derrière l’articulation sterno-claviculaire'],
    course: ['Le droit est court et presque vertical',
      'Le gauche est long et oblique : il traverse le médiastin en avant des troncs de la crosse'],
    ends: ['Les deux s’unissent en veine cave supérieure'],
    note: `Le canal thoracique se jette dans le confluent gauche, la grande
      veine lymphatique dans le droit.`,
  },

  // ----------------------------------------------------- les sinus de la dure-mère
  'Sinus sagittal supérieur': {
    what: `Sinus impair et médian, creusé dans le bord supérieur de la faux du
      cerveau, de la crista galli à la protubérance occipitale interne. Un
      sinus n'est pas une veine : il est entre les deux feuillets de la
      dure-mère, sans valvule et sans paroi musculaire.`,
    course: ['D’avant en arrière sur la ligne médiane de la voûte, en s’élargissant'],
    tributaries: ['Veines cérébrales superficielles',
      'Veines diploïques et émissaires', 'Granulations arachnoïdiennes de Pacchioni'],
    ends: ['Confluent des sinus (pressoir d’Hérophile)'],
    note: `C'est ici que le liquide cérébro-spinal est résorbé, par les
      granulations arachnoïdiennes.`,
  },

  'Sinus sagittal inférieur': {
    what: `Sinus impair, beaucoup plus grêle, dans le bord libre inférieur de
      la faux du cerveau.`,
    course: ['D’avant en arrière, au-dessus du corps calleux'],
    ends: ['Rejoint la grande veine cérébrale de Galien pour former le sinus droit'],
  },

  'Sinus droit': {
    what: `Sinus impair et médian, à la jonction de la faux du cerveau et de la
      tente du cervelet. Son nom veut dire rectiligne, pas latéralisé.`,
    origin: ['Réunion du sinus sagittal inférieur et de la grande veine cérébrale de Galien'],
    course: ['En arrière et en bas, dans l’insertion de la faux sur la tente'],
    ends: ['Confluent des sinus'],
    note: `Il draine le sang profond de l'encéphale, celui des noyaux gris et
      des plexus choroïdes, par la veine de Galien.`,
  },

  'Sinus occipital': {
    what: `Le plus petit des sinus, impair, dans le bord attaché de la faux du
      cervelet.`,
    course: ['Du bord postérieur du foramen magnum vers le haut'],
    ends: ['Confluent des sinus'],
  },

  'Sinus transverse': {
    what: `Sinus pair, horizontal, logé dans le sillon du sinus transverse de
      l'occipital, sur l'insertion de la tente du cervelet.`,
    origin: ['Confluent des sinus, à la protubérance occipitale interne'],
    course: ['En dehors et en avant, jusqu’à la base du rocher'],
    ends: ['Devient le sinus sigmoïde à l’angle postéro-inférieur du pariétal'],
    note: `Le confluent est rarement symétrique : le sagittal supérieur va le
      plus souvent à droite, le sinus droit à gauche, et le sinus transverse
      droit est en règle le plus large.`,
  },

  'Sinus sigmoïde': {
    what: `Suite du sinus transverse, en S, creusé dans le sillon du sinus
      sigmoïde sur la face interne du rocher et de la mastoïde.`,
    origin: ['Sinus transverse'],
    course: ['Décrit un S en bas et en avant, contre la face postérieure du rocher'],
    ends: ['Foramen jugulaire, où il devient la veine jugulaire interne'],
    near: ['Cellules mastoïdiennes, dont il n’est séparé que par une mince lame osseuse'],
    note: `Une otite ou une mastoïdite peut s'y propager : c'est la
      thrombophlébite du sinus latéral.`,
  },

  'Sinus pétreux supérieur': {
    what: `Sinus pair et grêle, dans le bord supérieur du rocher, sur
      l'insertion de la tente du cervelet.`,
    origin: ['Sinus caverneux, en avant'],
    course: ['En arrière et en dehors le long du bord supérieur du rocher'],
    ends: ['Jonction du sinus transverse et du sinus sigmoïde'],
    note: 'Il relie le sinus caverneux au système sigmoïde.',
  },

  'Sinus caverneux': {
    what: `Sinus pair, de part et d'autre du corps du sphénoïde et de la selle
      turcique. C'est le carrefour le plus dense de la base du crâne : une
      artère le traverse et quatre nerfs crâniens cheminent dans sa paroi.`,
    course: ['De la fissure orbitaire supérieure à l’apex du rocher'],
    tributaries: ['Veines ophtalmiques supérieure et inférieure',
      'Veine cérébrale moyenne superficielle', 'Sinus sphéno-pariétal'],
    ends: ['Sinus pétreux supérieur et sinus pétreux inférieur'],
    through: ['Artère carotide interne, dans la cavité même',
      'Nerf abducens (VI), seul nerf libre dans la cavité, collé à la carotide',
      'Nerf oculomoteur (III), dans la paroi latérale',
      'Nerf trochléaire (IV), dans la paroi latérale',
      'Nerf ophtalmique (V1), dans la paroi latérale',
      'Nerf maxillaire (V2), dans la partie basse de la paroi latérale'],
    note: `Les deux sinus caverneux communiquent par les sinus
      intercaverneux antérieur et postérieur, autour de l'hypophyse. Une
      thrombose du sinus caverneux donne une ophtalmoplégie complète avec
      exophtalmie et œdème palpébral.`,
  },
};

// ---------------------------------------------------------------------------
// Le rachis cervical.

NOTES.rachis = {
  'Atlas (C1)': {
    what: `La première vertèbre cervicale, et la seule qui n'ait pas de corps :
      un anneau osseux de deux masses latérales réunies par un arc antérieur et
      un arc postérieur. Elle porte la tête.`,
    parts: ['Arc antérieur, avec le tubercule antérieur et la fossette dentaire',
      'Deux masses latérales', 'Arc postérieur, avec le tubercule postérieur',
      'Deux processus transverses, les plus longs du rachis cervical'],
    relief: ['Fossette dentaire, qui reçoit la dent de l’axis',
      'Sillon de l’artère vertébrale, sur la face supérieure de l’arc postérieur',
      'Facettes articulaires supérieures, concaves, en haricot',
      'Facettes articulaires inférieures, presque planes'],
    joints: ['Condyles occipitaux, par l’articulation atlanto-occipitale — c’est l’articulation du oui',
      'Axis, par les articulations atlanto-axoïdiennes latérales et médiane'],
    muscles: ['Petit et grand droit postérieur de la tête',
      'Oblique supérieur et oblique inférieur de la tête',
      'Élévateur de la scapula et scalènes, sur le processus transverse'],
    through: ['Foramen transversaire — artère et veine vertébrales',
      'Foramen vertébral, le plus large du rachis'],
    note: `Le ligament transverse de l'atlas maintient la dent contre l'arc
      antérieur et divise le foramen vertébral en deux : la dent en avant, la
      moelle en arrière. Il n'est pas dessiné dans ce modèle, la source ne le
      contient pas. Sa rupture est mortelle.`,
  },

  'Axis (C2)': {
    what: `La deuxième vertèbre cervicale, reconnaissable à la dent qui monte de
      son corps. C'est le pivot autour duquel l'atlas et la tête tournent.`,
    parts: ['Dent (processus odontoïde), avec sa tête, son col et ses deux facettes',
      'Corps vertébral', 'Deux processus transverses',
      'Processus épineux, épais et bifide'],
    relief: ['Facette articulaire antérieure de la dent, pour l’arc antérieur de l’atlas',
      'Facette articulaire postérieure de la dent, pour le ligament transverse',
      'Facettes articulaires supérieures, sur le corps, pour l’atlas'],
    joints: ['Atlas, par l’articulation atlanto-axoïdienne médiane — c’est l’articulation du non',
      'Vertèbre C3, par un disque et deux articulations zygapophysaires'],
    muscles: ['Grand droit postérieur de la tête et oblique inférieur, sur l’épineuse',
      'Élévateur de la scapula, sur le processus transverse'],
    through: ['Foramen transversaire — artère vertébrale, qui y change de direction'],
    note: `La fracture de la dent est la plus fréquente des fractures du rachis
      cervical supérieur. C'est aussi l'axis qui donne son nom à l'articulation :
      la rotation de la tête se fait ici, et nulle part ailleurs pour l'essentiel.`,
  },

  'Vertèbre C3': {
    what: `La première vertèbre cervicale typique : un corps petit et large, un
      foramen vertébral triangulaire, un processus épineux court et bifide, et
      surtout un foramen transversaire dans chaque processus transverse.`,
    parts: ['Corps vertébral, avec ses uncus latéraux',
      'Deux pédicules et deux lames, qui ferment l’arc',
      'Deux processus transverses percés du foramen transversaire',
      'Quatre processus articulaires', 'Processus épineux, court et bifide'],
    relief: ['Uncus (processus unciforme), sur les bords latéraux du plateau supérieur',
      'Tubercules antérieur et postérieur du processus transverse',
      'Gouttière du nerf spinal, entre les deux tubercules'],
    joints: ['Axis en haut, C4 en bas, par un disque et deux articulations zygapophysaires',
      'Articulations unco-vertébrales de Luschka, entre les uncus'],
    muscles: ['Scalènes, sur les tubercules antérieur et postérieur',
      'Longus colli et longus capitis, en avant',
      'Splénius et semi-épineux, en arrière'],
    through: ['Foramen transversaire — artère et veine vertébrales',
      'Foramen intervertébral — racine du nerf spinal C4'],
    note: `Le foramen transversaire est le caractère de la vertèbre cervicale :
      aucune autre vertèbre du corps n'en a. C'est aussi ce qui explique que le
      rachis cervical soit une voie vasculaire.`,
  },

  'Vertèbre C4': {
    what: `Vertèbre cervicale typique. Le corps de C4 est le repère du niveau de
      la bifurcation carotidienne et du bord supérieur du cartilage thyroïde.`,
    parts: ['Corps vertébral et uncus', 'Pédicules et lames',
      'Processus transverses percés', 'Processus articulaires',
      'Processus épineux bifide'],
    relief: ['Uncus', 'Tubercules antérieur et postérieur',
      'Gouttière du nerf spinal'],
    joints: ['C3 en haut, C5 en bas', 'Articulations unco-vertébrales'],
    muscles: ['Scalène antérieur et scalène moyen', 'Longus colli',
      'Semi-épineux du cou'],
    through: ['Foramen transversaire — artère vertébrale',
      'Foramen intervertébral — racine C5'],
    note: `C4 est le niveau où la carotide commune se divise et où l'os hyoïde
      se projette : c'est le repère qu'on utilise pour se situer dans le cou.`,
  },

  'Vertèbre C5': {
    what: `Vertèbre cervicale typique, au milieu de la lordose cervicale. C'est
      le niveau du plus grand mouvement de flexion-extension du cou.`,
    parts: ['Corps vertébral et uncus', 'Pédicules et lames',
      'Processus transverses percés', 'Processus articulaires',
      'Processus épineux bifide'],
    relief: ['Uncus', 'Tubercules antérieur et postérieur'],
    joints: ['C4 en haut, C6 en bas', 'Articulations unco-vertébrales'],
    muscles: ['Scalènes', 'Longus colli', 'Iliocostal et longissimus du cou'],
    through: ['Foramen transversaire — artère vertébrale',
      'Foramen intervertébral — racine C6'],
    note: `Le disque C5-C6 est le plus souvent hernié du rachis cervical, et la
      racine comprimée est C6 : douleur du bord radial de l'avant-bras et du
      pouce, réflexe styloradial aboli.`,
  },

  'Vertèbre C6': {
    what: `Vertèbre cervicale typique, remarquable par le tubercule antérieur de
      son processus transverse, très saillant : le tubercule carotidien de
      Chassaignac.`,
    parts: ['Corps vertébral et uncus', 'Pédicules et lames',
      'Processus transverses percés', 'Processus articulaires',
      'Processus épineux bifide'],
    relief: ['Tubercule carotidien (de Chassaignac), sur le tubercule antérieur',
      'Uncus', 'Gouttière du nerf spinal'],
    joints: ['C5 en haut, C7 en bas', 'Articulations unco-vertébrales'],
    muscles: ['Scalènes', 'Longus colli'],
    through: ['Foramen transversaire — artère vertébrale, qui y entre',
      'Foramen intervertébral — racine C7'],
    note: `On comprime la carotide commune contre le tubercule de Chassaignac.
      C'est aussi à C6 que l'artère vertébrale entre dans les foramens
      transversaires : elle ne passe pas par celui de C7.`,
  },

  'Vertèbre C7': {
    what: `La vertèbre proéminente : son processus épineux est long, non bifide,
      et c'est la saillie qu'on palpe à la base du cou. Vertèbre cervicale
      atypique.`,
    parts: ['Corps vertébral', 'Pédicules et lames',
      'Processus transverses, à gros tubercule postérieur',
      'Processus articulaires', 'Processus épineux long, horizontal, non bifide'],
    relief: ['Processus épineux proéminent, repère de surface',
      'Tubercule antérieur souvent absent'],
    joints: ['C6 en haut, T1 en bas'],
    muscles: ['Trapèze et rhomboïdes, sur l’épineuse',
      'Ligament nuchal, qui s’y termine', 'Scalène postérieur'],
    through: ['Foramen transversaire, présent mais ne livrant passage qu’à la veine vertébrale',
      'Foramen intervertébral — racine C8'],
    note: `L'artère vertébrale ne traverse pas le foramen transversaire de C7 :
      elle entre à C6. C'est l'exception qu'il faut savoir. Le processus
      transverse de C7 peut donner une côte cervicale et comprimer le plexus
      brachial.`,
  },

  'Vertèbre T1': {
    what: `La première vertèbre thoracique, à la charnière : un corps de type
      thoracique avec ses fossettes costales, mais un processus épineux encore
      long comme celui de C7.`,
    parts: ['Corps vertébral, avec une fossette costale complète en haut et une demi-fossette en bas',
      'Pédicules et lames', 'Processus transverses, avec une fossette costale transversaire',
      'Processus articulaires', 'Processus épineux long et horizontal'],
    relief: ['Fossette costale supérieure, entière, pour la première côte',
      'Demi-fossette inférieure, pour la deuxième côte'],
    joints: ['C7 en haut, T2 en bas', 'Première côte, par une articulation costo-vertébrale entière',
      'Deuxième côte, par une demi-fossette'],
    muscles: ['Trapèze, rhomboïdes', 'Longissimus et iliocostal'],
    through: ['Foramen intervertébral — racine T1, qui rejoint le plexus brachial'],
    note: `La première côte s'articule avec T1 seule, alors que les côtes 2 à 9
      s'articulent avec deux vertèbres. T1 donne aussi une racine au plexus
      brachial : le plexus est C5 à T1.`,
  },

  // ---------------------------------------------------------- les disques
  'Disque intervertébral C2-C3': {
    what: `Le premier disque du rachis : il n'y en a pas entre C1 et C2, ni
      entre l'occipital et C1. Un anneau fibreux concentrique autour d'un noyau
      pulpeux, qui amortit et qui permet le mouvement.`,
    near: ['Racine du nerf spinal C3, dans le foramen intervertébral'],
    note: `Le rachis cervical a sept vertèbres et huit racines : la racine sort
      au-dessus du pédicule de la vertèbre dont elle porte le nom, jusqu'à C7.
      Donc au disque C2-C3 correspond la racine C3.`,
  },

  'Disque intervertébral C3-C4': {
    what: `Disque du segment mobile C3-C4. Le noyau pulpeux est plus antérieur
      dans le disque cervical que dans le disque lombaire.`,
    near: ['Racine du nerf spinal C4'],
  },

  'Disque intervertébral C4-C5': {
    what: `Disque du segment mobile C4-C5, au sommet de la lordose cervicale et
      donc l'un des plus sollicités.`,
    near: ['Racine du nerf spinal C5'],
    note: 'Une hernie à ce niveau comprime C5 : déficit du deltoïde.',
  },

  'Disque intervertébral C5-C6': {
    what: `Le disque le plus souvent hernié de tout le rachis cervical, parce
      que c'est là que la flexion-extension est la plus ample.`,
    near: ['Racine du nerf spinal C6'],
    note: `Névralgie cervico-brachiale C6 : douleur de la face externe du bras
      et de l'avant-bras jusqu'au pouce, réflexe styloradial aboli.`,
  },

  'Disque intervertébral C6-C7': {
    what: `Deuxième disque cervical le plus souvent hernié, juste après C5-C6.`,
    near: ['Racine du nerf spinal C7'],
    note: `Névralgie C7 : douleur de la face postérieure du bras jusqu'au
      médius, déficit du triceps, réflexe tricipital aboli.`,
  },

  'Disque intervertébral C7-T1': {
    what: `Le disque de la charnière cervico-thoracique, où le rachis mobile
      rejoint le rachis rigide de la cage thoracique.`,
    near: ['Racine du nerf spinal C8, la dernière racine cervicale'],
    note: `À partir de T1 la règle change : la racine sort au-dessous du
      pédicule de la vertèbre dont elle porte le nom. C'est la racine C8 qui
      fait la transition, et il n'y a pas de vertèbre C8.`,
  },

  // ------------------------------------------------------------- le larynx
  'Os hyoïde': {
    what: `Le seul os du corps qui ne s'articule avec aucun autre. Il flotte
      dans le cou, suspendu par des muscles et des ligaments, au-dessus du
      larynx et sous la langue.`,
    parts: ['Corps, quadrilatère, en avant', 'Deux grandes cornes, en arrière et en dehors',
      'Deux petites cornes, en haut et en arrière du corps'],
    relief: ['Face antérieure du corps, convexe et palpable',
      'Extrémité des grandes cornes, repère chirurgical'],
    muscles: ['Sus-hyoïdiens en haut : digastrique, stylo-hyoïdien, mylo-hyoïdien, génio-hyoïdien',
      'Sous-hyoïdiens en bas : sterno-hyoïdien, omo-hyoïdien, thyro-hyoïdien',
      'Hyo-glosse et constricteur moyen du pharynx'],
    near: ['Cartilage thyroïde, en dessous, relié par la membrane thyro-hyoïdienne',
      'Glande submandibulaire, au-dessus et en dehors'],
    note: `Il se projette en regard de C3-C4. Le ligament stylo-hyoïdien le
      relie au processus styloïde du temporal : c'est le seul rattachement au
      crâne. Sa fracture est un signe médico-légal de strangulation.`,
  },

  'Cartilage thyroïde': {
    what: `Le plus grand cartilage du larynx : deux lames quadrilatères réunies
      en avant à angle aigu, qui forment la proéminence laryngée — la pomme
      d'Adam.`,
    parts: ['Deux lames latérales', 'Proéminence laryngée, en avant',
      'Deux cornes supérieures et deux cornes inférieures'],
    relief: ['Incisure thyroïdienne supérieure, au-dessus de la proéminence',
      'Ligne oblique, sur la face externe de chaque lame'],
    joints: ['Cartilage cricoïde, par l’articulation crico-thyroïdienne, sur les cornes inférieures'],
    muscles: ['Thyro-hyoïdien et sterno-thyroïdien, sur la ligne oblique',
      'Constricteur inférieur du pharynx'],
    near: ['Os hyoïde, au-dessus', 'Glande thyroïde, en dessous et en dehors',
      'Bifurcation carotidienne, en regard de son bord supérieur'],
    note: `L'angle des deux lames est plus aigu chez l'homme, ce qui rend la
      proéminence visible. Le bord supérieur répond à C4 et à la bifurcation
      carotidienne.`,
  },

  'Cartilage cricoïde': {
    what: `Un anneau cartilagineux complet, en chevalière : un arc étroit en
      avant et une lame haute en arrière. C'est le seul anneau complet de toute
      la voie aérienne.`,
    parts: ['Arc, en avant, étroit', 'Lame (chaton), en arrière, haute'],
    relief: ['Facettes articulaires pour les aryténoïdes, sur le bord supérieur de la lame',
      'Facettes pour les cornes inférieures du thyroïde, sur les faces latérales'],
    joints: ['Cartilage thyroïde, par l’articulation crico-thyroïdienne',
      'Cartilages aryténoïdes, par les articulations crico-aryténoïdiennes',
      'Premier anneau trachéal, par le ligament crico-trachéal'],
    near: ['Membrane crico-thyroïdienne, au-dessus de l’arc',
      'Corps vertébral de C6, en arrière'],
    note: `C'est le repère de la cricothyroïdotomie : la membrane
      crico-thyroïdienne, juste au-dessus de l'arc, est l'accès d'urgence aux
      voies aériennes. Le cricoïde marque aussi le niveau C6, où le pharynx
      devient œsophage et le larynx devient trachée.`,
  },

  'Ligament nuchal': {
    what: `Une lame fibreuse sagittale et médiane, tendue de la protubérance
      occipitale externe au processus épineux de C7. C'est l'équivalent
      cervical du ligament supra-épineux, élargi en cloison.`,
    insertion: ['Protubérance occipitale externe et crête occipitale externe, en haut',
      'Processus épineux de C7, en bas',
      'Tubercule postérieur de l’atlas et processus épineux cervicaux, en profondeur'],
    action: ['Retient la flexion de la tête et du cou',
      'Sert de cloison et de surface d’insertion aux muscles de la nuque'],
    muscles: ['Trapèze', 'Splénius de la tête', 'Rhomboïde mineur',
      'Semi-épineux de la tête'],
    note: `Les processus épineux cervicaux sont courts et bifides, ce qui laisse
      peu de place aux muscles : c'est le ligament nuchal qui leur donne leur
      surface d'insertion. Chez les quadrupèdes il est très épais et soutient
      la tête.`,
  },
};

// ---------------------------------------------------------------------------
// Le cortex cérébral.
//
// A gyrus is read for what it does: where it sits, what it borders, and the
// function it carries. Rapports and Territoire, plus the clinical note that is
// usually why it is taught at all.

NOTES.encephale = {
  // ------------------------------------------------------------ lobe frontal
  'Gyrus précentral': {
    what: `La circonvolution frontale ascendante, en avant du sillon central.
      C'est le cortex moteur primaire, l'aire 4 de Brodmann, d'où part le
      faisceau pyramidal.`,
    supplies: ['Motricité volontaire de tout l’hémicorps controlatéral'],
    near: ['Sillon central en arrière, qui le sépare du gyrus postcentral',
      'Sillon précentral en avant'],
    note: `L'homoncule moteur y est couché tête en bas : la face et la main
      occupent la partie basse et latérale, le membre inférieur la partie haute
      et médiale, dans le lobule paracentral. L'artère cérébrale moyenne
      irrigue la face et la main, l'artère cérébrale antérieure le pied.`,
  },

  'Gyrus frontal supérieur (F1)': {
    what: `La première circonvolution frontale, la plus haute, qui court d'avant
      en arrière le long du bord supérieur de l'hémisphère et se prolonge sur la
      face médiale.`,
    supplies: ['Aire motrice supplémentaire, dans sa partie postérieure',
      'Fonctions exécutives, dans sa partie antérieure'],
    near: ['Sillon frontal supérieur, en dessous', 'Gyrus cingulaire, en dedans'],
  },

  'Gyrus frontal moyen (F2)': {
    what: `La deuxième circonvolution frontale, entre les sillons frontaux
      supérieur et inférieur.`,
    supplies: ['Champ oculomoteur frontal, dans sa partie postérieure — aire 8',
      'Mémoire de travail'],
    note: `Une lésion du champ oculomoteur frontal fait dévier les yeux vers le
      côté de la lésion : « le malade regarde sa lésion ».`,
  },

  'Gyrus frontal inférieur, pars opercularis': {
    what: `La partie postérieure de la troisième circonvolution frontale, entre
      le sillon précentral et la branche ascendante du sillon latéral. Avec la
      pars triangularis, c'est l'aire de Broca.`,
    supplies: ['Production du langage, dans l’hémisphère dominant — aire 44'],
    note: `L'aire de Broca est à gauche chez presque tous les droitiers. Sa
      lésion donne une aphasie non fluente : le malade comprend mais ne peut
      plus produire.`,
  },

  'Gyrus frontal inférieur, pars triangularis': {
    what: `La partie moyenne de la troisième circonvolution frontale, en forme
      de coin entre les deux branches antérieures du sillon latéral. Deuxième
      moitié de l'aire de Broca.`,
    supplies: ['Production du langage — aire 45'],
    near: ['Pars opercularis en arrière', 'Pars orbitalis en avant et en bas'],
  },

  'Gyrus frontal inférieur, pars orbitalis': {
    what: `La partie antérieure et inférieure de la troisième circonvolution
      frontale, au-dessus de l'orbite.`,
    supplies: ['Contrôle inhibiteur et comportement social'],
  },

  'Gyrus rectus': {
    what: `La circonvolution la plus médiale de la face orbitaire du lobe
      frontal, le long du sillon olfactif.`,
    near: ['Sillon olfactif en dehors, où reposent le bulbe et le tractus olfactifs',
      'Lame criblée de l’ethmoïde, en dessous'],
    note: `Le bulbe olfactif est posé dans le sillon olfactif à son bord
      latéral : un traumatisme frontal qui cisaille les filets olfactifs à
      travers la lame criblée donne une anosmie.`,
  },

  'Gyri orbitaires': {
    what: `Les circonvolutions de la face inférieure du lobe frontal, qui
      reposent sur le toit de l'orbite.`,
    supplies: ['Cortex orbito-frontal : jugement, inhibition, régulation émotionnelle'],
    note: `C'est la région lésée dans le syndrome frontal orbitaire :
      désinhibition, familiarité excessive, perte du jugement social, avec une
      intelligence conservée.`,
  },

  'Lobule paracentral': {
    what: `Le prolongement des gyrus précentral et postcentral sur la face
      médiale de l'hémisphère, autour de l'extrémité du sillon central.`,
    supplies: ['Motricité et sensibilité du membre inférieur controlatéral',
      'Contrôle volontaire des sphincters'],
    note: `C'est le territoire de l'artère cérébrale antérieure. Une lésion
      bilatérale, ou une compression para-sagittale, donne une paraplégie avec
      troubles sphinctériens.`,
  },

  // ----------------------------------------------------------- lobe pariétal
  'Gyrus postcentral': {
    what: `La circonvolution pariétale ascendante, en arrière du sillon central.
      C'est le cortex somesthésique primaire, les aires 3, 1 et 2.`,
    supplies: ['Sensibilité tactile, thermique, douloureuse et profonde de l’hémicorps controlatéral'],
    near: ['Sillon central en avant', 'Sillon postcentral en arrière'],
    note: `L'homoncule sensitif y est disposé comme le moteur, tête en bas, et
      les surfaces les plus riches en récepteurs — la main, les lèvres, la
      langue — occupent une étendue hors de proportion avec leur taille réelle.`,
  },

  'Lobule pariétal supérieur': {
    what: `La partie du lobe pariétal au-dessus du sillon intrapariétal, entre
      le gyrus postcentral et le précunéus.`,
    supplies: ['Intégration somesthésique et représentation du corps dans l’espace'],
    note: `Sa lésion donne une astéréognosie : le malade sent l'objet mais ne le
      reconnaît plus au toucher.`,
  },

  'Gyrus supramarginal': {
    what: `La circonvolution qui contourne l'extrémité postérieure du sillon
      latéral. Avec le gyrus angulaire, il forme le lobule pariétal inférieur.`,
    supplies: ['Aire 40 — langage et schéma corporel dans l’hémisphère dominant'],
    note: `Il fait partie du carrefour temporo-pariétal : sa lésion à gauche
      participe à l'aphasie de conduction, à droite à l'héminégligence.`,
  },

  'Gyrus angulaire': {
    what: `La circonvolution qui contourne l'extrémité du sillon temporal
      supérieur, en arrière du gyrus supramarginal.`,
    supplies: ['Aire 39 — lecture, calcul, intégration multimodale'],
    note: `Sa lésion dans l'hémisphère dominant donne le syndrome de Gerstmann :
      agraphie, acalculie, agnosie digitale et confusion droite-gauche.`,
  },

  Précunéus: {
    what: `La circonvolution de la face médiale du lobe pariétal, entre le
      lobule paracentral en avant et le sillon pariéto-occipital en arrière.`,
    supplies: ['Représentation visuo-spatiale, mémoire épisodique, conscience de soi'],
    near: ['Sillon pariéto-occipital en arrière, qui le sépare du cunéus',
      'Gyrus cingulaire en dessous'],
  },

  // ----------------------------------------------------------- lobe temporal
  'Gyrus temporal supérieur (T1)': {
    what: `La première circonvolution temporale, le long du bord inférieur du
      sillon latéral. Sa partie postérieure, dans l'hémisphère dominant, est
      l'aire de Wernicke.`,
    supplies: ['Aire auditive associative', 'Compréhension du langage — aire 22'],
    note: `Une lésion de l'aire de Wernicke donne une aphasie fluente : le
      malade parle abondamment mais ne comprend pas et son discours n'a pas de
      sens. Le faisceau arqué relie Wernicke à Broca.`,
  },

  'Gyrus temporal moyen (T2)': {
    what: `La deuxième circonvolution temporale, entre les sillons temporaux
      supérieur et inférieur.`,
    supplies: ['Reconnaissance des mots et des objets', 'Mémoire sémantique'],
  },

  'Gyrus temporal inférieur (T3)': {
    what: `La troisième circonvolution temporale, la plus basse sur la face
      latérale, qui se prolonge sur la face inférieure du lobe.`,
    supplies: ['Voie visuelle ventrale : reconnaissance des formes et des objets'],
  },

  'Gyri temporaux transverses (de Heschl)': {
    what: `Deux ou trois petites circonvolutions enfouies dans le plancher du
      sillon latéral, sur la face supérieure du lobe temporal. C'est le cortex
      auditif primaire.`,
    supplies: ['Audition — aires 41 et 42'],
    note: `Chaque oreille se projette sur les deux hémisphères : une lésion
      unilatérale ne rend pas sourd. La tonotopie y est respectée, des sons
      graves en avant aux aigus en arrière.`,
  },

  'Pôle temporal': {
    what: `L'extrémité antérieure du lobe temporal, dans la fosse crânienne
      moyenne.`,
    supplies: ['Mémoire sémantique et traitement émotionnel'],
    note: `C'est une des zones les plus exposées aux lésions de contrecoup : le
      pôle temporal vient buter contre la petite aile du sphénoïde.`,
  },

  'Gyrus parahippocampique': {
    what: `La circonvolution la plus médiale de la face inférieure du lobe
      temporal, qui borde l'hippocampe et se recourbe en avant pour former
      l'uncus.`,
    supplies: ['Cortex entorhinal — porte d’entrée de l’hippocampe', 'Mémoire spatiale'],
    near: ['Hippocampe, en dedans et en haut', 'Sillon collatéral, en dehors',
      'Mésencéphale et nerf oculomoteur, en dedans'],
    note: `L'uncus est ce qui s'engage dans l'incisure de la tente en cas
      d'hypertension intracrânienne : il comprime le III, d'où la mydriase
      homolatérale, puis le pédicule cérébral.`,
  },

  'Gyrus occipito-temporal latéral (fusiforme)': {
    what: `La circonvolution fusiforme, sur la face inférieure du cerveau, entre
      le sillon collatéral en dedans et le sillon occipito-temporal en dehors.`,
    supplies: ['Reconnaissance des visages, dans sa partie postérieure',
      'Reconnaissance des mots écrits, à gauche'],
    note: `Sa lésion bilatérale donne une prosopagnosie : le malade ne reconnaît
      plus les visages, y compris le sien, tout en voyant parfaitement.`,
  },

  // ---------------------------------------------------------- lobe occipital
  'Pôle occipital': {
    what: `L'extrémité postérieure de l'hémisphère, où se projette la macula.`,
    supplies: ['Vision centrale'],
    note: `Le pôle occipital reçoit une double irrigation, cérébrale postérieure
      et cérébrale moyenne : c'est pourquoi un infarctus de la cérébrale
      postérieure épargne souvent la vision maculaire.`,
  },

  Cunéus: {
    what: `Le coin de la face médiale du lobe occipital, entre le sillon
      pariéto-occipital en haut et le sillon calcarin en bas.`,
    supplies: ['Lèvre supérieure de la scissure calcarine : quadrant visuel inférieur controlatéral'],
  },

  'Gyrus lingual': {
    what: `La circonvolution de la face inférieure et médiale du lobe occipital,
      sous le sillon calcarin.`,
    supplies: ['Lèvre inférieure de la scissure calcarine : quadrant visuel supérieur controlatéral'],
    note: `L'inversion est double : ce qui est en haut dans le champ visuel se
      projette en bas dans le cortex, et ce qui est à droite se projette à
      gauche.`,
  },

  'Gyri occipitaux supérieurs': {
    what: `Les circonvolutions de la partie haute de la face latérale du lobe
      occipital.`,
    supplies: ['Voie visuelle dorsale : mouvement et localisation dans l’espace'],
  },

  'Gyrus occipital latéral': {
    what: `La circonvolution moyenne de la face latérale du lobe occipital, en
      arrière du sillon occipital antérieur.`,
    supplies: ['Aires visuelles associatives — reconnaissance des objets'],
  },

  'Gyrus occipital inférieur': {
    what: `La circonvolution la plus basse de la face latérale du lobe
      occipital, à la jonction avec le lobe temporal.`,
    supplies: ['Aires visuelles associatives ventrales'],
  },

  // ----------------------------------------------------------- lobe limbique
  'Gyrus cingulaire, partie antérieure': {
    what: `La partie antérieure de la circonvolution qui entoure le corps
      calleux, au-dessus du genou.`,
    supplies: ['Attention, contrôle du conflit, composante affective de la douleur',
      'Régulation autonome'],
  },

  'Gyrus cingulaire, partie moyenne': {
    what: `La partie moyenne du gyrus cingulaire, au-dessus du corps du corps
      calleux.`,
    supplies: ['Sélection de la réponse motrice', 'Motivation'],
  },

  'Gyrus cingulaire, partie postéro-dorsale': {
    what: `La partie postérieure et haute du gyrus cingulaire, en avant du
      précunéus.`,
    supplies: ['Mémoire autobiographique', 'Orientation spatiale'],
  },

  'Gyrus cingulaire, partie postéro-ventrale': {
    what: `Le rétrosplénial, sous le bourrelet (splénium) du corps calleux, où
      le gyrus cingulaire se continue avec le gyrus parahippocampique par
      l'isthme.`,
    supplies: ['Mémoire épisodique et navigation'],
    note: `Le circuit de Papez passe ici : hippocampe, fornix, corps mamillaires,
      thalamus antérieur, gyrus cingulaire, et retour au parahippocampique.`,
  },

  // ------------------------------------------------------------------ insula
  Insula: {
    what: `Le cinquième lobe, enfoui au fond du sillon latéral et recouvert par
      les opercules frontal, pariétal et temporal. On ne le voit qu'en écartant
      les lèvres de la scissure de Sylvius.`,
    supplies: ['Cortex viscéral et interoception', 'Goût',
      'Composante affective de la douleur', 'Régulation autonome'],
    near: ['Putamen et capsule externe, en dedans',
      'Artère cérébrale moyenne, dont le segment M2 chemine à sa surface'],
    note: `L'insula est au cœur du territoire de l'artère cérébrale moyenne :
      c'est la première région à souffrir dans un infarctus sylvien, et le
      « ruban insulaire » qui s'efface est un des signes précoces au scanner.`,
  },

  // ----------------------------------------------------------------- sillons
  'Sillon central (scissure de Rolando)': {
    what: `Le sillon oblique en bas et en avant qui sépare le lobe frontal du
      lobe pariétal, et le cortex moteur du cortex sensitif.`,
    near: ['Gyrus précentral en avant, gyrus postcentral en arrière'],
    note: `C'est le repère de toute la face latérale : tout ce qui est en avant
      est moteur, tout ce qui est en arrière est sensitif.`,
  },

  'Sillon pariéto-occipital': {
    what: `Le sillon profond de la face médiale de l'hémisphère qui sépare le
      lobe pariétal du lobe occipital.`,
    near: ['Précunéus en avant, cunéus en arrière',
      'Rejoint le sillon calcarin en avant du pôle occipital'],
    note: `C'est la seule limite franche entre pariétal et occipital : sur la
      face latérale la limite est conventionnelle.`,
  },

  'Sillon calcarin': {
    what: `Le sillon horizontal de la face médiale du lobe occipital. Ses deux
      lèvres portent le cortex visuel primaire, l'aire 17.`,
    near: ['Cunéus au-dessus, gyrus lingual au-dessous'],
    supplies: ['Cortex visuel primaire — hémichamp visuel controlatéral'],
    note: `Une lésion d'un sillon calcarin donne une hémianopsie latérale
      homonyme controlatérale. C'est le territoire de l'artère cérébrale
      postérieure.`,
  },
};

// ---------------------------------------------------------------------------
// Le cerveau profond.

NOTES.profond = {
  'Noyau caudé': {
    what: `Un noyau gris en forme de virgule, moulé sur le ventricule latéral
      qu'il borde sur toute sa longueur : une tête volumineuse, un corps et une
      queue qui redescend dans le lobe temporal jusqu'à l'amygdale.`,
    parts: ['Tête, qui fait saillie dans la corne frontale',
      'Corps, le long du ventricule latéral', 'Queue, dans la corne temporale'],
    near: ['Ventricule latéral, qu’il borde en dehors',
      'Bras antérieur de la capsule interne, qui le sépare du putamen',
      'Thalamus, en dedans et en arrière'],
    supplies: ['Boucle motrice des noyaux gris : sélection et initiation du mouvement'],
    note: `Avec le putamen il forme le striatum, séparés par les travées de la
      capsule interne qui donnent son nom au corps strié. La dégénérescence du
      caudé est la lésion de la chorée de Huntington.`,
  },

  Putamen: {
    what: `Le plus latéral et le plus volumineux des noyaux gris de la base. Avec
      le pallidum il forme le noyau lenticulaire, en forme de coin.`,
    near: ['Capsule externe et claustrum, puis l’insula, en dehors',
      'Pallidum, en dedans', 'Capsule interne, en dedans et en avant'],
    supplies: ['Boucle motrice : régulation de l’amplitude et de la vitesse du mouvement'],
    note: `Sur une coupe horizontale, putamen et pallidum forment ensemble le
      noyau lenticulaire : le putamen sombre en dehors, le pallidum pâle en
      dedans.`,
  },

  Pallidum: {
    what: `Le globus pallidus, plus pâle que le putamen parce qu'il est traversé
      de fibres myélinisées. Deux segments, interne et externe.`,
    parts: ['Segment externe (GPe)', 'Segment interne (GPi)'],
    near: ['Putamen en dehors', 'Bras postérieur de la capsule interne en dedans'],
    supplies: ['Sortie principale des noyaux gris vers le thalamus'],
    note: `Le segment interne est la cible de la stimulation cérébrale profonde
      dans la maladie de Parkinson et la dystonie.`,
  },

  Thalamus: {
    what: `Une grosse masse de substance grise ovoïde, de part et d'autre du
      troisième ventricule. Tout ce qui monte vers le cortex y fait relais,
      sauf l'olfaction.`,
    parts: ['Noyaux antérieurs', 'Noyaux médians', 'Noyaux latéraux',
      'Corps genouillé latéral, relais visuel',
      'Corps genouillé médial, relais auditif', 'Pulvinar, en arrière'],
    near: ['Troisième ventricule en dedans',
      'Bras postérieur de la capsule interne en dehors',
      'Ventricule latéral au-dessus', 'Hypothalamus en dessous'],
    supplies: ['Relais de toutes les voies sensitives et sensorielles vers le cortex',
      'Relais des boucles motrices et limbiques'],
    note: `Le corps genouillé latéral reçoit le tractus optique et envoie les
      radiations optiques au cortex calcarin. Une lésion thalamique donne le
      syndrome de Déjerine-Roussy : hémianesthésie puis douleurs
      centrales rebelles.`,
  },

  'Noyau rouge': {
    what: `Un noyau du tegmentum mésencéphalique, rouge à l'état frais par sa
      richesse en fer. Il reçoit le cervelet et donne le faisceau rubro-spinal.`,
    near: ['Substance noire en avant', 'Faisceau cérébelleux supérieur, qui s’y termine'],
    supplies: ['Contrôle du tonus des fléchisseurs du membre supérieur'],
    note: `Sa lésion, avec celle du III qui le traverse, donne le syndrome de
      Claude ou de Benedikt : paralysie du III d'un côté, syndrome cérébelleux
      de l'autre.`,
  },

  Hippocampe: {
    what: `Un repli du cortex enroulé sur lui-même dans le plancher de la corne
      temporale du ventricule latéral. C'est la structure de la mémoire.`,
    parts: ['Tête, avec les digitations', 'Corps', 'Queue',
      'Corne d’Ammon et gyrus denté'],
    near: ['Corne temporale du ventricule latéral, au-dessus',
      'Gyrus parahippocampique, en dedans et en dessous',
      'Amygdale, en avant'],
    supplies: ['Mémoire épisodique et consolidation',
      'Navigation et mémoire spatiale'],
    note: `Ses efférences forment le fornix. Une lésion bilatérale donne une
      amnésie antérograde massive avec mémoire ancienne conservée. C'est aussi
      la zone la plus vulnérable à l'anoxie, et le foyer le plus fréquent de
      l'épilepsie temporale — la sclérose de l'hippocampe.`,
  },

  'Corps amygdaloïde': {
    what: `Un noyau en amande, en avant de la tête de l'hippocampe, dans le pôle
      temporal, sous l'uncus.`,
    near: ['Hippocampe, immédiatement en arrière',
      'Queue du noyau caudé, au-dessus', 'Uncus, en dedans'],
    supplies: ['Peur et réponses émotionnelles', 'Mémoire émotionnelle',
      'Réponses végétatives à la menace'],
    note: `Sa destruction bilatérale donne le syndrome de Klüver-Bucy :
      disparition de la peur, hyperoralité, hypersexualité.`,
  },

  'Fornix (trigone)': {
    what: `Le grand faisceau efférent de l'hippocampe : deux arcs de substance
      blanche qui partent de l'hippocampe, se rejoignent sous le corps calleux
      et redescendent vers les corps mamillaires.`,
    parts: ['Fimbria, sur l’hippocampe', 'Pilier postérieur (crus)',
      'Corps du fornix', 'Pilier antérieur, vers le corps mamillaire'],
    near: ['Corps calleux, au-dessus', 'Septum pellucidum, entre les deux',
      'Troisième ventricule, en dessous du corps'],
    note: `C'est le premier segment du circuit de Papez : hippocampe, fornix,
      corps mamillaire, faisceau mamillo-thalamique, thalamus antérieur, gyrus
      cingulaire, retour au parahippocampique.`,
  },

  'Commissure hippocampique': {
    what: `Les fibres transversales qui unissent les deux piliers postérieurs du
      fornix sous le splénium du corps calleux, le psaltérium.`,
    near: ['Splénium du corps calleux, au-dessus',
      'Piliers postérieurs du fornix, qu’elle réunit'],
  },

  'Corps calleux': {
    what: `La plus grande commissure du cerveau : deux cents millions de fibres
      qui relient les deux hémisphères et forment le toit des ventricules
      latéraux.`,
    parts: ['Rostrum (bec), en avant et en bas', 'Genou', 'Corps (tronc)',
      'Splénium (bourrelet), en arrière'],
    near: ['Gyrus cingulaire, au-dessus',
      'Ventricules latéraux, en dessous', 'Septum pellucidum, sous le genou et le corps'],
    note: `Les fibres du genou forment le forceps mineur et celles du splénium
      le forceps majeur. Sa section, ou son agénésie, donne le syndrome de
      déconnexion interhémisphérique.`,
  },

  'Septum pellucidum': {
    what: `Une mince cloison verticale et médiane, faite de deux lames, tendue
      entre le corps calleux au-dessus et le fornix en dessous. Elle sépare les
      deux ventricules latéraux.`,
    near: ['Corps calleux, au-dessus et en avant',
      'Fornix, en dessous', 'Cornes frontales des ventricules latéraux, de chaque côté'],
    note: `Un espace peut persister entre les deux lames : le cavum du septum
      pellucidum, qu'on ne prend pas pour un cinquième ventricule.`,
  },

  'Ventricule latéral': {
    what: `La cavité épendymaire de chaque hémisphère, en fer à cheval autour du
      thalamus. Elle contient un plexus choroïde qui sécrète le liquide
      cérébro-spinal.`,
    parts: ['Corne frontale', 'Corps', 'Carrefour (atrium)',
      'Corne temporale', 'Corne occipitale'],
    near: ['Noyau caudé, en dehors', 'Thalamus, en dedans et en bas',
      'Corps calleux, au-dessus', 'Hippocampe, dans le plancher de la corne temporale'],
    ends: ['Troisième ventricule, par le foramen interventriculaire de Monro'],
    note: `L'hydrocéphalie se voit d'abord sur la taille des cornes frontales et
      des carrefours. La corne occipitale est la plus variable.`,
  },

  'Troisième ventricule': {
    what: `Une fente verticale et médiane entre les deux thalamus, au centre du
      diencéphale.`,
    near: ['Thalamus de chaque côté', 'Hypothalamus dans son plancher',
      'Corps calleux et fornix dans son toit',
      'Chiasma optique et tige pituitaire en avant et en bas'],
    origin: ['Reçoit les deux ventricules latéraux par les foramens de Monro'],
    ends: ['Quatrième ventricule, par l’aqueduc du mésencéphale (de Sylvius)'],
    note: `L'aqueduc est le point le plus étroit du système : sa sténose est la
      cause classique d'hydrocéphalie non communicante.`,
  },

  'Quatrième ventricule': {
    what: `Une cavité en losange entre le tronc cérébral en avant et le cervelet
      en arrière. Son plancher est le plancher rhomboïde, où se projettent les
      noyaux des nerfs crâniens.`,
    relief: ['Plancher rhomboïde, avec le colliculus facial et le trigone de l’hypoglosse',
      'Toit formé par les voiles médullaires et le cervelet'],
    origin: ['Reçoit le troisième ventricule par l’aqueduc du mésencéphale'],
    ends: ['Espace sous-arachnoïdien, par les foramens de Luschka (latéraux) et de Magendie (médian)',
      'Canal central de la moelle spinale'],
    note: `C'est par ses trois orifices que le liquide passe dans les espaces
      sous-arachnoïdiens. Leur obstruction donne le syndrome de Dandy-Walker.`,
  },

  'Chiasma optique': {
    what: `Le croisement des deux nerfs optiques, au-dessus de la selle turcique.
      Seules les fibres nasales, celles qui viennent de la rétine du côté du
      nez, y croisent.`,
    near: ['Selle turcique et hypophyse, juste en dessous',
      'Troisième ventricule, au-dessus', 'Artères carotides internes, de chaque côté'],
    note: `Une tumeur de l'hypophyse qui grandit vers le haut comprime le
      chiasma par sa partie médiane, donc les fibres croisées, donc les deux
      champs temporaux : c'est l'hémianopsie bitemporale, ou vision en tunnel.`,
  },

  'Tractus optique': {
    what: `Le segment de la voie visuelle entre le chiasma et le corps genouillé
      latéral. Il porte désormais les fibres d'un seul hémichamp visuel, venues
      des deux yeux.`,
    course: ['Contourne le pédoncule cérébral'],
    ends: ['Corps genouillé latéral du thalamus, pour l’essentiel',
      'Colliculus supérieur et prétectum, pour les réflexes'],
    note: `À partir du chiasma, toute lésion de la voie visuelle donne une
      hémianopsie latérale homonyme controlatérale, et non plus un déficit
      monoculaire.`,
  },
};

// ---------------------------------------------------------------------------
// Le cervelet et le tronc cérébral.

NOTES.cervelet = {
  // ------------------------------------------------------ le lobe antérieur
  'Lobule quadrangulaire antérieur': {
    what: `Le lobule le plus antérieur de la face supérieure de l'hémisphère
      cérébelleux, en avant de la fissure primaire. Il appartient au lobe
      antérieur, le spinocervelet.`,
    near: ['Fissure primaire en arrière, qui sépare lobe antérieur et lobe postérieur',
      'Culmen du vermis en dedans'],
    supplies: ['Tonus et posture, par les afférences spinocérébelleuses'],
  },

  'Aile du lobule central': {
    what: `Le prolongement latéral du lobule central du vermis sur la face
      supérieure de l'hémisphère, caché sous le lobule quadrangulaire.`,
    near: ['Lobule central du vermis, en dedans'],
  },

  // ----------------------------------------------------- le lobe postérieur
  'Lobule quadrangulaire postérieur': {
    what: `Le lobule qui suit immédiatement la fissure primaire sur la face
      supérieure de l'hémisphère. Premier lobule du lobe postérieur, le
      cérébrocervelet.`,
    near: ['Fissure primaire en avant', 'Déclive du vermis en dedans'],
    supplies: ['Planification et coordination fine du mouvement'],
  },

  'Lobule semi-lunaire supérieur': {
    what: `Un large lobule de la face postéro-supérieure de l'hémisphère, en
      arrière du lobule quadrangulaire postérieur.`,
    near: ['Fissure horizontale en dessous, la plus profonde du cervelet'],
  },

  'Lobule semi-lunaire inférieur': {
    what: `Le lobule qui fait suite au semi-lunaire supérieur sous la fissure
      horizontale, sur la face inférieure de l'hémisphère.`,
    near: ['Fissure horizontale au-dessus', 'Lobule gracile en dedans'],
  },

  'Lobule gracile': {
    what: `Un lobule étroit de la face inférieure de l'hémisphère, entre le
      semi-lunaire inférieur et le biventre.`,
    near: ['Tuber du vermis, en dedans'],
  },

  'Lobule biventre': {
    what: `Le lobule à deux ventres de la face inférieure de l'hémisphère, en
      dehors de l'amygdale cérébelleuse.`,
    near: ['Amygdale cérébelleuse en dedans', 'Pyramis du vermis en dedans'],
  },

  'Amygdale cérébelleuse': {
    what: `Une saillie arrondie de la face inférieure de l'hémisphère, au-dessus
      du foramen magnum et de chaque côté de l'uvule.`,
    near: ['Foramen magnum, juste en dessous', 'Bulbe rachidien, en avant',
      'Uvule du vermis, en dedans'],
    note: `C'est ce qui s'engage dans le foramen magnum en cas d'hypertension
      intracrânienne : l'engagement amygdalien comprime le bulbe et arrête la
      respiration. C'est la raison pour laquelle on ne ponctionne pas en
      lombaire avant d'avoir éliminé une hypertension intracrânienne.`,
  },

  // -------------------------------------------- le lobe flocculo-nodulaire
  Flocculus: {
    what: `Un petit lobule isolé sous le pédoncule cérébelleux moyen, à l'angle
      ponto-cérébelleux. Avec le nodule il forme le lobe flocculo-nodulaire, le
      vestibulocervelet — la partie la plus ancienne du cervelet.`,
    near: ['Angle ponto-cérébelleux', 'Nerfs VII et VIII, juste en avant'],
    supplies: ['Équilibre et mouvements oculaires, par ses connexions vestibulaires'],
    note: `Sa lésion donne une ataxie du tronc et de la marche avec nystagmus,
      sans ataxie des membres : le malade ne tient pas debout mais son doigt
      atteint son nez.`,
  },

  'Nodule du vermis': {
    what: `Le segment le plus antérieur et le plus inférieur du vermis, dans le
      toit du quatrième ventricule. Il forme avec le flocculus le lobe
      flocculo-nodulaire.`,
    near: ['Quatrième ventricule, dont il forme une partie du toit',
      'Uvule du vermis, en arrière'],
  },

  // ----------------------------------------------------------------- vermis
  'Lingula du vermis': {
    what: `Le premier segment du vermis, appliqué sur le voile médullaire
      supérieur, entre les deux pédoncules cérébelleux supérieurs.`,
    near: ['Voile médullaire supérieur, en avant'],
  },

  'Lobule central du vermis': {
    what: `Le deuxième segment du vermis, juste en arrière de la lingula, qui se
      prolonge de chaque côté par son aile.`,
  },

  Culmen: {
    what: `Le sommet du vermis, le segment le plus haut, en avant de la fissure
      primaire. Il appartient au lobe antérieur.`,
    near: ['Fissure primaire en arrière', 'Tente du cervelet, au-dessus'],
  },

  Déclive: {
    what: `Le segment du vermis qui descend derrière la fissure primaire, premier
      segment vermien du lobe postérieur.`,
  },

  'Folium du vermis': {
    what: `Un segment étroit du vermis, à hauteur de la fissure horizontale, qui
      sépare le déclive du tuber.`,
  },

  'Tuber du vermis': {
    what: `Le segment du vermis situé sous la fissure horizontale, entre le
      folium et le pyramis.`,
  },

  'Pyramis du vermis': {
    what: `Un segment saillant du vermis sur la face inférieure, entre le tuber
      et l'uvule.`,
  },

  'Uvule du vermis': {
    what: `Le segment du vermis compris entre les deux amygdales cérébelleuses,
      sur la face inférieure.`,
    near: ['Amygdales cérébelleuses, de chaque côté'],
  },

  // ------------------------------------------------------------- pédoncules
  'Pédoncule cérébelleux supérieur': {
    what: `Le faisceau qui relie le cervelet au mésencéphale. C'est la voie de
      sortie principale du cervelet.`,
    origin: ['Noyau dentelé du cervelet'],
    course: ['Monte dans le toit du quatrième ventricule, puis décusse dans le tegmentum'],
    ends: ['Noyau rouge et thalamus controlatéraux'],
    note: `Il porte la sortie ; le pédoncule moyen, de loin le plus gros, porte
      l'entrée venue du pont, et le pédoncule inférieur l'entrée venue de la
      moelle et du bulbe.`,
  },

  // ---------------------------------------------------------------- tectum
  'Colliculus supérieur': {
    what: `La paire supérieure des tubercules quadrijumeaux, sur la face
      postérieure du mésencéphale. C'est un centre visuel réflexe.`,
    near: ['Colliculus inférieur, en dessous', 'Glande pinéale, au-dessus'],
    supplies: ['Réflexe photomoteur, par ses connexions avec le noyau d’Edinger-Westphal',
      'Saccades oculaires et poursuite réflexe'],
    note: `Le syndrome de Parinaud — paralysie du regard vers le haut — vient
      d'une compression des colliculus supérieurs, typiquement par une tumeur
      pinéale.`,
  },

  'Colliculus inférieur': {
    what: `La paire inférieure des tubercules quadrijumeaux. C'est un relais
      obligatoire de la voie auditive.`,
    near: ['Colliculus supérieur, au-dessus',
      'Nerf trochléaire (IV), qui émerge juste en dessous'],
    supplies: ['Relais auditif vers le corps genouillé médial'],
    note: `Le IV est le seul nerf crânien à émerger de la face postérieure du
      tronc, juste sous le colliculus inférieur, et le seul à croiser avant
      d'émerger.`,
  },

  // -------------------------------------------------------- tronc cérébral
  Mésencéphale: {
    what: `L'étage supérieur du tronc cérébral, entre le diencéphale et le pont.
      Il est traversé par l'aqueduc, qui le divise en tectum en arrière et en
      pédoncules cérébraux en avant.`,
    parts: ['Tectum (lame quadrijumelle), en arrière de l’aqueduc',
      'Tegmentum, avec le noyau rouge et la substance noire',
      'Pieds des pédoncules cérébraux, en avant'],
    near: ['Incisure de la tente du cervelet, qu’il traverse',
      'Uncus du lobe temporal, de chaque côté'],
    note: `Le III en sort en avant, dans la fosse interpédonculaire, et le IV en
      arrière. L'engagement temporal comprime le III puis le pied du pédoncule :
      mydriase d'un côté, hémiplégie de l'autre.`,
  },

  'Pied du pédoncule cérébral': {
    what: `La partie antérieure du mésencéphale, faite uniquement de substance
      blanche descendante : c'est par là que passe le faisceau pyramidal.`,
    near: ['Substance noire, juste en arrière', 'Nerf oculomoteur (III), en dedans'],
    supplies: ['Faisceaux cortico-spinal, cortico-nucléaire et cortico-pontique'],
  },

  Pont: {
    what: `L'étage moyen du tronc cérébral, bombé en avant, fait de fibres
      transversales qui gagnent le cervelet par le pédoncule cérébelleux moyen.`,
    parts: ['Partie basilaire, en avant, avec le sillon basilaire',
      'Tegmentum pontique, en arrière, qui forme le plancher du quatrième ventricule'],
    near: ['Tronc basilaire, dans le sillon basilaire',
      'Angle ponto-cérébelleux, où émergent le VII et le VIII'],
    note: `Le V en sort par sa face latérale, le VI, le VII et le VIII au
      sillon bulbo-pontique. Une thrombose basilaire peut donner le
      locked-in syndrome : tout est paralysé sauf la verticalité du regard.`,
  },

  'Bulbe rachidien': {
    what: `L'étage inférieur du tronc, entre le pont et la moelle spinale, dont
      il prend la suite au niveau du foramen magnum.`,
    parts: ['Pyramides, en avant, avec leur décussation',
      'Olives, en dehors des pyramides',
      'Sillons pré-olivaire et rétro-olivaire'],
    near: ['Foramen magnum, à sa limite inférieure',
      'Artères vertébrales et PICA, en avant et en dehors'],
    note: `Le IX, le X et le XI sortent du sillon rétro-olivaire, le XII du
      sillon pré-olivaire. La décussation des pyramides est pourquoi une lésion
      d'un hémisphère paralyse l'autre côté. L'occlusion de la PICA donne le
      syndrome de Wallenberg.`,
  },

  'Aqueduc du mésencéphale': {
    what: `Le canal étroit, long d'un centimètre et demi, qui traverse le
      mésencéphale et fait communiquer le troisième et le quatrième ventricule.
      C'est le point le plus étroit de tout le système ventriculaire.`,
    origin: ['Troisième ventricule'],
    ends: ['Quatrième ventricule'],
    note: `Sa sténose est la cause classique d'hydrocéphalie non communicante :
      les ventricules latéraux et le troisième se dilatent, le quatrième reste
      normal.`,
  },
};

// ---------------------------------------------------------------------------
// Le membre supérieur.

NOTES['membre-sup'] = {
  Scapula: {
    what: `Un os plat et triangulaire appliqué sur la face postérieure du
      thorax, de la deuxième à la septième côte. Il ne s'articule au squelette
      axial que par la clavicule : tout le reste est musculaire, et c'est ce qui
      donne à l'épaule sa mobilité.`,
    parts: ['Corps, avec la fosse supra-épineuse et la fosse infra-épineuse en arrière',
      'Fosse subscapulaire, sur la face costale',
      'Épine de la scapula, qui se prolonge par l’acromion',
      'Processus coracoïde, en avant', 'Cavité glénoïdale, en dehors',
      'Trois bords — supérieur, médial (spinal), latéral (axillaire)',
      'Trois angles — supérieur, inférieur, latéral'],
    relief: ['Tubercules supra-glénoïdal et infra-glénoïdal',
      'Incisure scapulaire (coracoïdienne), sur le bord supérieur',
      'Col de la scapula'],
    joints: ['Humérus, par l’articulation scapulo-humérale',
      'Clavicule, par l’articulation acromio-claviculaire',
      'Thorax, par l’espace de glissement scapulo-thoracique, qui n’est pas une vraie articulation'],
    muscles: ['Supra-épineux et infra-épineux, dans leurs fosses',
      'Subscapulaire, sur la face costale', 'Petit rond et grand rond, sur le bord latéral',
      'Long biceps sur le tubercule supra-glénoïdal, long triceps sur l’infra-glénoïdal',
      'Petit pectoral, coraco-brachial et court biceps sur le processus coracoïde',
      'Trapèze et deltoïde sur l’épine et l’acromion',
      'Rhomboïdes et élévateur de la scapula sur le bord médial'],
    through: ['Incisure scapulaire — nerf supra-scapulaire dessous, artère supra-scapulaire dessus'],
    note: `La coiffe des rotateurs est faite de quatre muscles nés de la
      scapula : supra-épineux, infra-épineux, petit rond et subscapulaire. Le
      supra-épineux passe sous l'acromion, et c'est son conflit avec l'acromion
      qui donne l'épaule douloureuse.`,
  },

  Clavicule: {
    what: `Un os long en S allongé, sous-cutané sur toute sa longueur, tendu du
      sternum à l'acromion. C'est le seul lien osseux entre le membre supérieur
      et le squelette axial, et le premier os à s'ossifier.`,
    parts: ['Extrémité sternale (médiale), renflée',
      'Corps, à courbure antérieure en dedans et postérieure en dehors',
      'Extrémité acromiale (latérale), aplatie'],
    relief: ['Tubercule conoïde et ligne trapézoïde, à la face inférieure de l’extrémité latérale',
      'Sillon du subclavier, à la face inférieure du corps',
      'Empreinte du ligament costo-claviculaire, en dedans'],
    joints: ['Manubrium sternal, par l’articulation sterno-claviculaire',
      'Acromion, par l’articulation acromio-claviculaire',
      'Première côte, par le ligament costo-claviculaire'],
    muscles: ['Deltoïde et grand pectoral, en avant',
      'Trapèze, en arrière et en dehors',
      'Sterno-cléido-mastoïdien, en dedans', 'Subclavier, dans son sillon'],
    near: ['Plexus brachial et artère subclavière, juste en dessous du tiers moyen',
      'Dôme pleural, en dedans'],
    note: `C'est l'os le plus souvent fracturé du corps, et la fracture siège au
      tiers moyen : le fragment médial est tiré en haut par le
      sterno-cléido-mastoïdien, le latéral en bas par le poids du membre. Le
      danger est en dessous : plexus brachial, artère subclavière, plèvre.`,
  },

  Humérus: {
    what: `L'os du bras, le plus long du membre supérieur. Une extrémité
      supérieure sphérique, une diaphyse, et une extrémité inférieure aplatie
      qui porte deux surfaces articulaires différentes.`,
    parts: ['Tête humérale, tiers de sphère orientée en haut, en dedans et en arrière',
      'Col anatomique, autour de la tête',
      'Tubercule majeur (trochiter) et tubercule mineur (trochin)',
      'Col chirurgical, sous les tubercules',
      'Corps (diaphyse), prismatique triangulaire',
      'Trochlée en dedans et capitulum (condyle) en dehors',
      'Épicondyles médial (épitrochlée) et latéral'],
    relief: ['Sillon intertuberculaire (coulisse bicipitale), entre les deux tubercules',
      'Tubérosité deltoïdienne, au milieu de la diaphyse',
      'Sillon du nerf radial, oblique sur la face postérieure',
      'Fosses coronoïdienne et radiale en avant, fosse olécrânienne en arrière',
      'Sillon du nerf ulnaire, derrière l’épicondyle médial'],
    joints: ['Scapula, par la scapulo-humérale', 'Ulna, par la huméro-ulnaire',
      'Radius, par la huméro-radiale'],
    muscles: ['Supra-épineux, infra-épineux et petit rond sur le tubercule majeur',
      'Subscapulaire sur le tubercule mineur',
      'Grand pectoral, grand dorsal et grand rond autour de la coulisse bicipitale',
      'Deltoïde sur la tubérosité deltoïdienne',
      'Brachial et coraco-brachial sur la diaphyse',
      'Épicondyliens latéraux (extenseurs) et médiaux (fléchisseurs) sur les épicondyles'],
    near: ['Nerf axillaire, contre le col chirurgical',
      'Nerf radial, dans son sillon sur la diaphyse',
      'Nerf ulnaire, derrière l’épicondyle médial'],
    note: `Trois nerfs sont contre l'os et trois fractures les menacent : le col
      chirurgical menace le nerf axillaire, la diaphyse le nerf radial — d'où la
      main tombante — et la palette humérale le nerf ulnaire. Le tendon du long
      biceps passe dans la coulisse bicipitale.`,
  },

  Radius: {
    what: `L'os latéral de l'avant-bras, du côté du pouce. Il est petit en haut
      et gros en bas, exactement l'inverse de l'ulna, et c'est lui qui porte la
      main et tourne autour de l'ulna dans la pronosupination.`,
    parts: ['Tête radiale, cylindrique, avec sa fossette supérieure',
      'Col', 'Tubérosité radiale (bicipitale)',
      'Corps (diaphyse), triangulaire, à courbure latérale',
      'Extrémité distale, avec le processus styloïde et l’incisure ulnaire'],
    relief: ['Fossette de la tête, pour le capitulum',
      'Circonférence articulaire de la tête, pour l’incisure radiale de l’ulna',
      'Processus styloïde radial, qui descend plus bas que l’ulnaire',
      'Tubercule dorsal de Lister'],
    joints: ['Humérus, par la huméro-radiale',
      'Ulna, par les articulations radio-ulnaires proximale et distale',
      'Scaphoïde et lunatum, par l’articulation radio-carpienne'],
    muscles: ['Biceps brachial, sur la tubérosité radiale',
      'Supinateur et rond pronateur, sur la diaphyse',
      'Carré pronateur, en bas', 'Brachio-radial, sur le processus styloïde'],
    note: `La fracture de l'extrémité distale du radius est la fracture la plus
      fréquente de l'adulte — la fracture de Pouteau-Colles, avec déplacement
      dorsal et déformation en dos de fourchette. Le styloïde radial descend un
      centimètre plus bas que l'ulnaire : l'index radio-ulnaire.`,
  },

  Ulna: {
    what: `L'os médial de l'avant-bras, du côté du petit doigt. Gros en haut et
      grêle en bas. C'est lui qui fait le coude ; le radius fait le poignet.`,
    parts: ['Olécrâne, en haut et en arrière',
      'Processus coronoïde, en haut et en avant',
      'Incisure trochléaire (grande cavité sigmoïde), entre les deux',
      'Incisure radiale (petite cavité sigmoïde), en dehors',
      'Corps (diaphyse)', 'Tête ulnaire et processus styloïde, en bas'],
    relief: ['Bec de l’olécrâne', 'Tubérosité ulnaire, sous le processus coronoïde',
      'Bord interosseux, tranchant, en dehors'],
    joints: ['Humérus, par la huméro-ulnaire — une trochléenne pure',
      'Radius, par les deux articulations radio-ulnaires',
      'Disque articulaire du poignet, en bas — elle ne touche pas le carpe'],
    muscles: ['Triceps brachial, sur l’olécrâne',
      'Brachial, sur la tubérosité ulnaire',
      'Fléchisseur ulnaire du carpe et fléchisseur profond des doigts, sur la diaphyse',
      'Carré pronateur, en bas'],
    near: ['Nerf ulnaire, dans le sillon rétro-épicondylien médial, contre l’olécrâne'],
    note: `L'articulation du coude est une trochléenne : flexion-extension et
      rien d'autre. La pronosupination se fait aux deux radio-ulnaires, autour
      d'un axe qui va de la tête radiale au processus styloïde ulnaire. La
      fracture de Monteggia associe une fracture de l'ulna et une luxation de la
      tête radiale.`,
  },
};

// ---------------------------------------------------------------------------
// La main.
//
// Twenty-seven bones, and the point of naming every one is that they are asked
// for one by one. Two rows of four in the carpus, five metacarpals, and
// fourteen phalanges — two for the thumb, three for each other finger.

NOTES.main = {
  Scaphoïde: {
    what: `Le plus latéral et le plus gros de la première rangée du carpe, en
      forme de barque. Il est à cheval sur les deux rangées, ce qui en fait la
      clé mécanique du carpe.`,
    relief: ['Tubercule du scaphoïde, palpable à la base de l’éminence thénar'],
    joints: ['Radius en haut', 'Lunatum en dedans',
      'Trapèze et trapézoïde en bas', 'Capitatum en bas et en dedans'],
    near: ['Tabatière anatomique, dont il forme le plancher',
      'Artère radiale, qui traverse la tabatière'],
    note: `C'est l'os du carpe le plus souvent fracturé, et sa vascularisation
      se fait de distal en proximal : une fracture du col prive le pôle
      proximal de sang, d'où la pseudarthrose et la nécrose. Une douleur de la
      tabatière anatomique après une chute sur la main est une fracture du
      scaphoïde jusqu'à preuve du contraire, même si la radiographie initiale
      est normale.`,
  },

  'Lunatum (semi-lunaire)': {
    what: `Le deuxième os de la première rangée, en croissant, au milieu du
      poignet et directement sous le radius.`,
    joints: ['Radius en haut', 'Scaphoïde en dehors', 'Triquetrum en dedans',
      'Capitatum et hamatum en bas'],
    note: `C'est l'os du carpe le plus souvent luxé, et le siège de la maladie
      de Kienböck, une ostéonécrose aseptique.`,
  },

  'Triquetrum (pyramidal)': {
    what: `Le troisième os de la première rangée, pyramidal, du côté ulnaire. Il
      porte le pisiforme sur sa face palmaire.`,
    joints: ['Lunatum en dehors', 'Hamatum en bas', 'Pisiforme en avant',
      'Disque articulaire du poignet en haut — pas l’ulna directement'],
  },

  Pisiforme: {
    what: `Un os sésamoïde de la taille d'un pois, posé sur la face palmaire du
      triquetrum. Il n'appartient pas vraiment à la rangée : il est dans le
      tendon du fléchisseur ulnaire du carpe.`,
    joints: ['Triquetrum, et lui seul'],
    muscles: ['Fléchisseur ulnaire du carpe, qui s’y termine',
      'Abducteur du cinquième doigt, qui en part'],
    near: ['Canal de Guyon, dont il forme le bord latéral',
      'Nerf ulnaire et artère ulnaire, dans ce canal'],
  },

  Trapèze: {
    what: `Le plus latéral de la deuxième rangée, sous le scaphoïde et au-dessus
      du premier métacarpien. Sa surface distale est une selle.`,
    relief: ['Tubercule du trapèze', 'Sillon du fléchisseur radial du carpe'],
    joints: ['Scaphoïde en haut', 'Trapézoïde en dedans',
      'Premier métacarpien en bas, par une articulation en selle',
      'Deuxième métacarpien'],
    note: `L'articulation trapézo-métacarpienne est une selle, et c'est elle qui
      donne au pouce son opposition. Son arthrose est la rhizarthrose.`,
  },

  Trapézoïde: {
    what: `Le plus petit de la deuxième rangée, coincé entre le trapèze et le
      capitatum, à la base du deuxième métacarpien.`,
    joints: ['Scaphoïde en haut', 'Trapèze en dehors', 'Capitatum en dedans',
      'Deuxième métacarpien en bas'],
  },

  'Capitatum (grand os)': {
    what: `Le plus volumineux des os du carpe, au centre. Sa tête arrondie
      s'emboîte dans la concavité formée par le scaphoïde et le lunatum.`,
    parts: ['Tête, en haut', 'Col', 'Corps'],
    joints: ['Scaphoïde et lunatum en haut', 'Trapézoïde en dehors',
      'Hamatum en dedans', 'Deuxième, troisième et quatrième métacarpiens en bas'],
    note: 'C’est l’axe du carpe : tout le poignet tourne autour de sa tête.',
  },

  'Hamatum (os crochu)': {
    what: `Le plus médial de la deuxième rangée, reconnaissable à son crochet
      (hamulus) qui fait saillie sur la face palmaire.`,
    relief: ['Hamulus (crochet de l’hamatum), palpable dans l’éminence hypothénar'],
    joints: ['Lunatum et triquetrum en haut', 'Capitatum en dehors',
      'Quatrième et cinquième métacarpiens en bas'],
    near: ['Canal de Guyon, dont l’hamulus forme le bord médial',
      'Canal carpien, dont l’hamulus est un des quatre piliers',
      'Branche profonde du nerf ulnaire, qui le contourne'],
    note: `Le canal carpien est délimité par quatre saillies osseuses reliées
      par le rétinaculum des fléchisseurs : le tubercule du scaphoïde et celui
      du trapèze en dehors, le pisiforme et l'hamulus en dedans. Le nerf médian
      y passe, et c'est son compression qui donne le syndrome du canal carpien.`,
  },

  'Premier métacarpien': {
    what: `Le métacarpien du pouce : le plus court et le plus épais, et le seul
      dont la base porte une surface en selle. Il est en rotation de quatre-vingt
      dix degrés par rapport aux autres.`,
    parts: ['Base, en selle', 'Corps', 'Tête'],
    joints: ['Trapèze, par l’articulation trapézo-métacarpienne',
      'Phalange proximale du pouce'],
    muscles: ['Opposant du pouce', 'Long abducteur du pouce',
      'Premier interosseux dorsal'],
    note: `Sa rotation est ce qui rend l'opposition possible, et donc la pince
      pouce-index. La fracture de sa base, ou fracture de Bennett, est une
      fracture-luxation articulaire.`,
  },

  'Deuxième métacarpien': {
    what: `Le plus long des métacarpiens, celui de l'index. Sa base s'encastre
      entre le trapèze, le trapézoïde et le capitatum, ce qui en fait la colonne
      la plus fixe de la main.`,
    joints: ['Trapèze, trapézoïde et capitatum', 'Troisième métacarpien',
      'Phalange proximale de l’index'],
    muscles: ['Long extenseur radial du carpe, sur sa base',
      'Fléchisseur radial du carpe', 'Interosseux'],
  },

  'Troisième métacarpien': {
    what: `Le métacarpien du majeur, avec un processus styloïde sur sa base
      dorsale. C'est l'axe de la main.`,
    relief: ['Processus styloïde, sur le bord dorso-latéral de la base'],
    joints: ['Capitatum', 'Deuxième et quatrième métacarpiens',
      'Phalange proximale du majeur'],
    muscles: ['Court extenseur radial du carpe, sur sa base', 'Adducteur du pouce', 'Interosseux'],
    note: 'C’est par rapport à son axe que l’on définit abduction et adduction des doigts.',
  },

  'Quatrième métacarpien': {
    what: `Le métacarpien de l'annulaire, grêle, entre le troisième et le
      cinquième.`,
    joints: ['Capitatum et hamatum', 'Troisième et cinquième métacarpiens',
      'Phalange proximale de l’annulaire'],
    muscles: ['Interosseux'],
  },

  'Cinquième métacarpien': {
    what: `Le métacarpien de l'auriculaire, le plus médial et le plus mobile
      après celui du pouce.`,
    joints: ['Hamatum', 'Quatrième métacarpien', 'Phalange proximale de l’auriculaire'],
    muscles: ['Extenseur ulnaire du carpe, sur sa base',
      'Opposant du cinquième doigt'],
    note: `La fracture de son col est la fracture du boxeur : la tête bascule en
      palmaire et la saillie de l'articulation disparaît.`,
  },

  'Phalange proximale du pouce': {
    what: `La première des deux phalanges du pouce — c'est le seul doigt qui
      n'en a pas trois.`,
    joints: ['Premier métacarpien en haut', 'Phalange distale du pouce en bas'],
    muscles: ['Court fléchisseur et court abducteur du pouce, en dehors',
      'Adducteur du pouce, en dedans'],
  },

  'Phalange distale du pouce': {
    what: `La phalange unguéale du pouce, large et aplatie, qui porte l'ongle et
      la pulpe.`,
    joints: ['Phalange proximale du pouce'],
    muscles: ['Long fléchisseur du pouce en avant', 'Long extenseur du pouce en arrière'],
  },

  'Phalange proximale de l’index': {
    what: `La première phalange du deuxième doigt, la plus longue des trois.`,
    joints: ['Deuxième métacarpien', 'Phalange moyenne de l’index'],
    muscles: ['Interosseux et lombricaux, sur la base',
      'Dossier des interosseux, sur la face dorsale'],
  },

  'Phalange moyenne de l’index': {
    what: `La deuxième phalange de l'index, sur laquelle se termine le
      fléchisseur superficiel des doigts.`,
    joints: ['Phalange proximale et phalange distale de l’index'],
    muscles: ['Fléchisseur superficiel des doigts, qui s’y termine en deux languettes'],
  },

  'Phalange distale de l’index': {
    what: `La phalange unguéale de l'index, avec sa tubérosité en fer à cheval
      qui soutient la pulpe.`,
    joints: ['Phalange moyenne de l’index'],
    muscles: ['Fléchisseur profond des doigts, qui s’y termine'],
  },

  'Phalange proximale du majeur': {
    what: `La première phalange du troisième doigt, la plus longue de la main.`,
    joints: ['Troisième métacarpien', 'Phalange moyenne du majeur'],
    muscles: ['Interosseux dorsaux et palmaires', 'Lombricaux'],
  },

  'Phalange moyenne du majeur': {
    what: `La deuxième phalange du majeur.`,
    joints: ['Phalange proximale et phalange distale du majeur'],
    muscles: ['Fléchisseur superficiel des doigts'],
  },

  'Phalange distale du majeur': {
    what: `La phalange unguéale du majeur.`,
    joints: ['Phalange moyenne du majeur'],
    muscles: ['Fléchisseur profond des doigts'],
  },

  'Phalange proximale de l’annulaire': {
    what: `La première phalange du quatrième doigt.`,
    joints: ['Quatrième métacarpien', 'Phalange moyenne de l’annulaire'],
    muscles: ['Interosseux', 'Lombricaux'],
  },

  'Phalange moyenne de l’annulaire': {
    what: `La deuxième phalange de l'annulaire.`,
    joints: ['Phalange proximale et phalange distale de l’annulaire'],
    muscles: ['Fléchisseur superficiel des doigts'],
  },

  'Phalange distale de l’annulaire': {
    what: `La phalange unguéale de l'annulaire.`,
    joints: ['Phalange moyenne de l’annulaire'],
    muscles: ['Fléchisseur profond des doigts'],
  },

  'Phalange proximale de l’auriculaire': {
    what: `La première phalange du cinquième doigt, la plus courte des
      proximales.`,
    joints: ['Cinquième métacarpien', 'Phalange moyenne de l’auriculaire'],
    muscles: ['Court fléchisseur et abducteur du cinquième doigt',
      'Interosseux palmaire'],
  },

  'Phalange moyenne de l’auriculaire': {
    what: `La deuxième phalange de l'auriculaire.`,
    joints: ['Phalange proximale et phalange distale de l’auriculaire'],
    muscles: ['Fléchisseur superficiel des doigts'],
  },

  'Phalange distale de l’auriculaire': {
    what: `La phalange unguéale de l'auriculaire.`,
    joints: ['Phalange moyenne de l’auriculaire'],
    muscles: ['Fléchisseur profond des doigts'],
  },
};

// ---------------------------------------------------------------------------
// Le membre inférieur.

NOTES['membre-inf'] = {
  'Os coxal': {
    what: `Un os plat et tordu en hélice, fait de trois pièces soudées à
      l'adolescence — ilium, ischium et pubis — dont la soudure se fait au fond
      de l'acétabulum, en Y. Avec le sacrum il forme le bassin.`,
    parts: ['Ilium, en haut, avec l’aile iliaque et la crête iliaque',
      'Ischium, en bas et en arrière, avec la tubérosité ischiatique',
      'Pubis, en bas et en avant, avec ses deux branches',
      'Acétabulum, à la jonction des trois',
      'Foramen obturé, entre pubis et ischium'],
    relief: ['Épines iliaques antéro-supérieure et antéro-inférieure',
      'Épines iliaques postéro-supérieure et postéro-inférieure',
      'Grande et petite incisures ischiatiques',
      'Épine ischiatique, entre les deux',
      'Ligne arquée, qui marque le détroit supérieur',
      'Éminence ilio-pubienne', 'Tubercule pubien'],
    joints: ['Fémur, par l’articulation coxo-fémorale, à l’acétabulum',
      'Sacrum, par l’articulation sacro-iliaque',
      'Os coxal opposé, par la symphyse pubienne'],
    muscles: ['Fessiers sur la face glutéale de l’aile iliaque',
      'Iliaque dans la fosse iliaque', 'Sartorius sur l’épine iliaque antéro-supérieure',
      'Droit fémoral sur l’épine iliaque antéro-inférieure',
      'Ischio-jambiers sur la tubérosité ischiatique',
      'Adducteurs sur les branches du pubis',
      'Obturateurs autour du foramen obturé'],
    through: ['Canal obturateur — nerf et vaisseaux obturateurs',
      'Grand foramen ischiatique — nerf sciatique, nerf glutéal supérieur, pédicule glutéal',
      'Petit foramen ischiatique — nerf et vaisseaux pudendaux'],
    note: `Le détroit supérieur — promontoire, lignes arquées, bord supérieur du
      pubis — sépare le grand bassin du petit bassin, et c'est par lui que passe
      la tête fœtale. Le bassin féminin est plus large, plus bas, avec un angle
      sous-pubien ouvert : c'est la différence sexuelle la plus marquée du
      squelette.`,
  },

  Fémur: {
    what: `L'os le plus long, le plus lourd et le plus solide du corps. Sa tête
      est portée par un col oblique, ce qui transforme chaque appui en une force
      de cisaillement sur ce col.`,
    parts: ['Tête fémorale, deux tiers de sphère, avec sa fovéa',
      'Col fémoral, oblique en haut et en dedans',
      'Grand trochanter, en dehors', 'Petit trochanter, en dedans et en arrière',
      'Corps (diaphyse), à courbure antérieure',
      'Condyles médial et latéral, en bas'],
    relief: ['Fovéa de la tête, pour le ligament rond',
      'Ligne inter-trochantérique en avant, crête inter-trochantérique en arrière',
      'Ligne âpre, sur la face postérieure de la diaphyse',
      'Épicondyles médial et latéral', 'Fosse intercondylaire, en arrière',
      'Surface patellaire (trochlée fémorale), en avant'],
    joints: ['Os coxal, par la coxo-fémorale', 'Tibia, par le genou',
      'Patella, par l’articulation fémoro-patellaire'],
    muscles: ['Moyen et petit fessiers sur le grand trochanter',
      'Psoas-iliaque sur le petit trochanter',
      'Grand fessier, adducteurs et biceps fémoral sur la ligne âpre',
      'Vastes du quadriceps sur la diaphyse',
      'Gastrocnémiens sur les condyles'],
    near: ['Nerf sciatique, en arrière',
      'Artère fémorale profonde et ses perforantes, le long de la ligne âpre'],
    note: `L'angle cervico-diaphysaire est d'environ 125 degrés : s'il augmente
      c'est une coxa valga, s'il diminue une coxa vara. La vascularisation de la
      tête vient surtout des artères circonflexes, qui remontent le long du col
      — d'où la nécrose de la tête après une fracture du col, la fracture du
      sujet âgé.`,
  },

  Patella: {
    what: `Le plus gros os sésamoïde du corps, logé dans le tendon du
      quadriceps. Elle éloigne le tendon de l'axe du genou et augmente ainsi le
      bras de levier de l'extension.`,
    parts: ['Base, en haut', 'Apex, en bas',
      'Face postérieure articulaire, à deux facettes séparées par une crête'],
    joints: ['Fémur, par la trochlée fémorale — elle ne s’articule pas avec le tibia'],
    muscles: ['Tendon du quadriceps fémoral, sur la base',
      'Ligament patellaire, de l’apex à la tubérosité tibiale'],
    note: `Son cartilage est le plus épais du corps. Sa luxation se fait
      toujours en dehors, parce que le quadriceps tire obliquement en dehors :
      c'est le vaste médial qui la retient.`,
  },

  Tibia: {
    what: `L'os médial de la jambe, le seul des deux qui porte le poids du corps.
      Sa face antéro-médiale est sous-cutanée sur toute sa longueur — la crête
      tibiale.`,
    parts: ['Plateau tibial, avec les deux cavités glénoïdes et les épines',
      'Tubérosité tibiale, en avant', 'Corps (diaphyse), triangulaire',
      'Malléole médiale, en bas'],
    relief: ['Éminence intercondylaire (épines tibiales)',
      'Crête tibiale (bord antérieur), sous-cutanée',
      'Tubercule de Gerdy, en dehors de la tubérosité',
      'Incisure fibulaire, en bas et en dehors'],
    joints: ['Fémur, par le genou', 'Fibula, par les articulations tibio-fibulaires',
      'Talus, par l’articulation talo-crurale'],
    muscles: ['Ligament patellaire sur la tubérosité tibiale',
      'Patte d’oie — sartorius, gracile, semi-tendineux — en dedans',
      'Tractus ilio-tibial sur le tubercule de Gerdy',
      'Tibial antérieur et tibial postérieur sur la diaphyse',
      'Soléaire sur la ligne du soléaire'],
    note: `Il porte tout le poids : la fibula n'en prend rien. Sa face
      antéro-médiale sous-cutanée explique que les fractures de jambe soient si
      souvent ouvertes. Le plateau tibial porte les deux ménisques.`,
  },

  Fibula: {
    what: `L'os latéral de la jambe, grêle et non portant. Elle sert
      d'insertion musculaire et forme la malléole latérale, qui verrouille la
      cheville en dehors.`,
    parts: ['Tête fibulaire, avec son apex (styloïde)', 'Col',
      'Corps (diaphyse)', 'Malléole latérale, en bas'],
    relief: ['Apex de la tête', 'Bord interosseux',
      'Fosse malléolaire, sur la face médiale de la malléole'],
    joints: ['Tibia, par les articulations tibio-fibulaires proximale et distale',
      'Talus, par la malléole latérale'],
    muscles: ['Biceps fémoral sur la tête', 'Fibulaires (long et court) sur la diaphyse',
      'Long extenseur des orteils et troisième fibulaire'],
    near: ['Nerf fibulaire commun, qui contourne le col'],
    note: `La malléole latérale descend plus bas que la médiale, ce qui
      explique que l'entorse se fasse en varus. Le nerf fibulaire commun au col
      est le nerf le plus exposé du membre inférieur : sa lésion donne le pied
      tombant et la steppage. Sa diaphyse est le greffon osseux vascularisé le
      plus utilisé, précisément parce qu'elle ne porte rien.`,
  },

  Sacrum: {
    what: `Cinq vertèbres soudées en un os triangulaire, coincé comme une clef
      de voûte entre les deux os coxaux. Il transmet le poids du rachis au
      bassin.`,
    parts: ['Base, en haut, avec le promontoire',
      'Deux ailes sacrées (ailerons), de part et d’autre de la base',
      'Face pelvienne, concave, avec quatre paires de foramens',
      'Face dorsale, convexe, avec les crêtes sacrées',
      'Apex, en bas, articulé au coccyx'],
    relief: ['Promontoire, angle saillant du bord antérieur de la base',
      'Crête sacrée médiane, des processus épineux soudés',
      'Hiatus sacré et cornes sacrées, en bas',
      'Surface auriculaire, sur la face latérale'],
    joints: ['Vertèbre L5, par le disque L5-S1', 'Os coxaux, par les sacro-iliaques',
      'Coccyx, en bas'],
    through: ['Canal sacré — queue de cheval et filum terminal',
      'Foramens sacrés antérieurs et postérieurs — branches des nerfs sacrés'],
    note: `Le promontoire est le repère du détroit supérieur et le point de
      mesure de l'obstétricien. Le hiatus sacré est la voie de l'anesthésie
      caudale. La moelle s'arrête en L1-L2 : le canal sacré ne contient que la
      queue de cheval.`,
  },

  Coccyx: {
    what: `Trois à cinq vertèbres rudimentaires soudées, vestige de la queue.
      C'est le dernier segment du rachis.`,
    joints: ['Sacrum, par l’articulation sacro-coccygienne'],
    muscles: ['Élévateur de l’anus et coccygien, qui forment le plancher pelvien',
      'Grand fessier, par quelques fibres', 'Ligament ano-coccygien'],
    note: `Sa fracture ou sa luxation, après une chute sur les fesses, donne une
      coccygodynie longue et rebelle. Il fait partie du plancher pelvien.`,
  },
};

// ---------------------------------------------------------------------------
// Le pied.
//
// Twenty-six bones, one fewer than the hand: the foot has no pisiform.

NOTES.pied = {
  Talus: {
    what: `L'os qui reçoit tout le poids du corps venu de la jambe et le
      répartit entre le talon et l'avant-pied. C'est le seul os du pied sur
      lequel aucun muscle ne s'insère.`,
    parts: ['Tête, en avant', 'Col', 'Corps, avec la trochlée en haut'],
    relief: ['Trochlée du talus, plus large en avant qu’en arrière',
      'Sillon du talus, qui forme le sinus du tarse avec le calcanéus',
      'Processus postérieur, avec le sillon du long fléchisseur de l’hallux'],
    joints: ['Tibia et fibula, par l’articulation talo-crurale',
      'Calcanéus, par les articulations sub-talaires',
      'Os naviculaire, par l’articulation talo-naviculaire'],
    note: `Aucun muscle ne s'y insère, et sa vascularisation est rétrograde :
      une fracture du col donne une nécrose du corps. Sa trochlée étant plus
      large en avant, la cheville est stable en flexion dorsale et instable en
      flexion plantaire — c'est là que l'on se tord le pied.`,
  },

  Calcanéus: {
    what: `Le plus gros et le plus solide des os du tarse : il forme le talon et
      reçoit le tendon calcanéen.`,
    parts: ['Corps', 'Tubérosité calcanéenne, en arrière',
      'Sustentaculum tali, en dedans', 'Processus antérieur'],
    relief: ['Tubérosité calcanéenne, point d’appui postérieur de la voûte',
      'Sustentaculum tali, qui soutient le col du talus',
      'Sillon du long fibulaire, en dehors',
      'Sinus du tarse, entre calcanéus et talus'],
    joints: ['Talus, par les articulations sub-talaires',
      'Os cuboïde, par l’articulation calcanéo-cuboïdienne'],
    muscles: ['Tendon calcanéen (d’Achille), sur la tubérosité',
      'Aponévrose plantaire, sur la tubérosité',
      'Court fléchisseur des orteils et abducteur de l’hallux'],
    note: `L'articulation médio-tarsienne de Chopart est la ligne
      talo-naviculaire plus calcanéo-cuboïdienne : c'est un niveau
      d'amputation. La fasciite plantaire est une douleur d'insertion de
      l'aponévrose sur la tubérosité.`,
  },

  'Os naviculaire': {
    what: `Un os aplati en forme de barque, entre la tête du talus en arrière et
      les trois cunéiformes en avant. C'est la clef de voûte de l'arche médiale.`,
    relief: ['Tubérosité de l’os naviculaire, en dedans, palpable'],
    joints: ['Talus en arrière', 'Les trois cunéiformes en avant',
      'Os cuboïde en dehors'],
    muscles: ['Tibial postérieur, sur la tubérosité'],
    note: `Le tibial postérieur s'y insère et soutient l'arche médiale : sa
      défaillance donne le pied plat de l'adulte. Sa nécrose chez l'enfant est
      la maladie de Köhler.`,
  },

  'Os cuboïde': {
    what: `L'os cubique du bord latéral du tarse, entre le calcanéus en arrière
      et les deux derniers métatarsiens en avant. Clef de voûte de l'arche
      latérale.`,
    relief: ['Sillon du tendon du long fibulaire, sur la face plantaire',
      'Tubérosité du cuboïde'],
    joints: ['Calcanéus en arrière', 'Quatrième et cinquième métatarsiens en avant',
      'Os naviculaire et cunéiforme latéral en dedans'],
    muscles: ['Long fibulaire, dont le tendon le contourne'],
  },

  'Cunéiforme médial': {
    what: `Le plus gros des trois cunéiformes, à la base du premier
      métatarsien. Sa base est plantaire, contrairement aux deux autres — ce qui
      contribue à la voûte transversale.`,
    joints: ['Os naviculaire en arrière', 'Premier métatarsien en avant',
      'Cunéiforme intermédiaire en dehors'],
    muscles: ['Tibial antérieur et long fibulaire, sur ses faces'],
  },

  'Cunéiforme intermédiaire': {
    what: `Le plus petit des trois cunéiformes, en retrait par rapport aux deux
      autres, ce qui encastre la base du deuxième métatarsien dans une mortaise.`,
    joints: ['Os naviculaire en arrière', 'Deuxième métatarsien en avant',
      'Cunéiformes médial et latéral de chaque côté'],
    note: `C'est ce recul qui bloque le deuxième métatarsien et fait de la
      deuxième colonne la plus rigide du pied — et la plus exposée à la
      fracture de fatigue, la fracture de marche.`,
  },

  'Cunéiforme latéral': {
    what: `Le troisième cunéiforme, entre l'intermédiaire et le cuboïde, à la
      base du troisième métatarsien.`,
    joints: ['Os naviculaire en arrière', 'Troisième métatarsien en avant',
      'Cunéiforme intermédiaire en dedans', 'Os cuboïde en dehors'],
  },

  'Premier métatarsien': {
    what: `Le plus court et le plus épais des métatarsiens, celui de l'hallux.
      Il porte l'essentiel de l'appui antérieur.`,
    relief: ['Deux sésamoïdes sous sa tête'],
    joints: ['Cunéiforme médial', 'Phalange proximale de l’hallux'],
    muscles: ['Long fibulaire et tibial antérieur, sur sa base'],
    note: `Sa déviation en varus fait l'hallux valgus, avec la saillie médiale
      de sa tête. Les deux sésamoïdes sous sa tête sont dans le tendon du court
      fléchisseur de l'hallux.`,
  },

  'Deuxième métatarsien': {
    what: `Le plus long des métatarsiens, encastré entre les trois cunéiformes.`,
    joints: ['Cunéiforme intermédiaire, et les deux autres par ses faces latérales',
      'Phalange proximale du deuxième orteil'],
    note: `C'est le siège de la fracture de fatigue du marcheur, et de la
      maladie de Freiberg, une nécrose de sa tête.`,
  },

  'Troisième métatarsien': {
    what: `Le métatarsien du troisième orteil, entre le deuxième et le
      quatrième.`,
    joints: ['Cunéiforme latéral', 'Phalange proximale du troisième orteil'],
  },

  'Quatrième métatarsien': {
    what: `Le métatarsien du quatrième orteil, articulé au cuboïde.`,
    joints: ['Os cuboïde', 'Phalange proximale du quatrième orteil'],
  },

  'Cinquième métatarsien': {
    what: `Le métatarsien du cinquième orteil, reconnaissable à la tubérosité
      saillante de sa base sur le bord latéral du pied.`,
    relief: ['Tubérosité (styloïde) de la base, palpable au bord externe du pied'],
    joints: ['Os cuboïde', 'Phalange proximale du cinquième orteil'],
    muscles: ['Court fibulaire, sur la tubérosité'],
    note: `L'arrachement de sa tubérosité par le court fibulaire, lors d'une
      entorse en varus, est la fracture de Jones : elle se confond avec une
      simple entorse et consolide mal.`,
  },

  'Phalange proximale de l’hallux': {
    what: `La première des deux phalanges du gros orteil — comme le pouce, il
      n'en a que deux.`,
    joints: ['Premier métatarsien', 'Phalange distale de l’hallux'],
    muscles: ['Court fléchisseur de l’hallux, abducteur et adducteur de l’hallux'],
  },

  'Phalange distale de l’hallux': {
    what: `La phalange unguéale du gros orteil, large et aplatie.`,
    joints: ['Phalange proximale de l’hallux'],
    muscles: ['Long fléchisseur de l’hallux', 'Long extenseur de l’hallux'],
  },

  'Phalange proximale du deuxième orteil': {
    what: `La première phalange du deuxième orteil, la plus longue des trois.`,
    joints: ['Deuxième métatarsien', 'Phalange moyenne du deuxième orteil'],
    muscles: ['Interosseux et lombricaux'],
  },

  'Phalange moyenne du deuxième orteil': {
    what: `La deuxième phalange du deuxième orteil, courte.`,
    joints: ['Phalanges proximale et distale du deuxième orteil'],
    muscles: ['Court fléchisseur des orteils'],
  },

  'Phalange distale du deuxième orteil': {
    what: `La phalange unguéale du deuxième orteil.`,
    joints: ['Phalange moyenne du deuxième orteil'],
    muscles: ['Long fléchisseur des orteils'],
  },

  'Phalange proximale du troisième orteil': {
    what: `La première phalange du troisième orteil.`,
    joints: ['Troisième métatarsien', 'Phalange moyenne du troisième orteil'],
    muscles: ['Interosseux et lombricaux'],
  },

  'Phalange moyenne du troisième orteil': {
    what: `La deuxième phalange du troisième orteil.`,
    joints: ['Phalanges proximale et distale du troisième orteil'],
    muscles: ['Court fléchisseur des orteils'],
  },

  'Phalange distale du troisième orteil': {
    what: `La phalange unguéale du troisième orteil.`,
    joints: ['Phalange moyenne du troisième orteil'],
    muscles: ['Long fléchisseur des orteils'],
  },

  'Phalange proximale du quatrième orteil': {
    what: `La première phalange du quatrième orteil.`,
    joints: ['Quatrième métatarsien', 'Phalange moyenne du quatrième orteil'],
    muscles: ['Interosseux et lombricaux'],
  },

  'Phalange moyenne du quatrième orteil': {
    what: `La deuxième phalange du quatrième orteil.`,
    joints: ['Phalanges proximale et distale du quatrième orteil'],
    muscles: ['Court fléchisseur des orteils'],
  },

  'Phalange distale du quatrième orteil': {
    what: `La phalange unguéale du quatrième orteil.`,
    joints: ['Phalange moyenne du quatrième orteil'],
    muscles: ['Long fléchisseur des orteils'],
  },

  'Phalange proximale du cinquième orteil': {
    what: `La première phalange du cinquième orteil, la plus courte.`,
    joints: ['Cinquième métatarsien', 'Phalange moyenne du cinquième orteil'],
    muscles: ['Abducteur et court fléchisseur du cinquième orteil'],
  },

  'Phalange moyenne du cinquième orteil': {
    what: `La deuxième phalange du cinquième orteil, souvent soudée à la
      distale.`,
    joints: ['Phalanges proximale et distale du cinquième orteil'],
    muscles: ['Court fléchisseur des orteils'],
  },

  'Phalange distale du cinquième orteil': {
    what: `La phalange unguéale du cinquième orteil, la plus petite pièce
      osseuse du pied.`,
    joints: ['Phalange moyenne du cinquième orteil'],
    muscles: ['Long fléchisseur des orteils'],
  },
};

// ---------------------------------------------------------------------------
// La cage thoracique.

NOTES.thorax = {
  'Première côte': {
    what: `La plus courte, la plus large et la plus courbée des côtes. Elle est
      horizontale, à plat, et ne ressemble à aucune autre.`,
    relief: ['Tubercule du muscle scalène antérieur, sur la face supérieure', 'Sillon de la veine subclavière, en avant du tubercule', 'Sillon de l’artère subclavière, en arrière du tubercule'],
    joints: ['Vertèbre T1 seule, par une facette entière', 'Manubrium sternal, par son cartilage'],
    muscles: ['Scalène antérieur, sur son tubercule', 'Scalène moyen, en arrière', 'Subclavier, en avant'],
    note: `Elle porte le passage du paquet vaso-nerveux du membre supérieur :
      veine subclavière en avant du tubercule, artère subclavière et plexus
      brachial en arrière. C'est le repère du défilé thoraco-brachial.`,
  },

  'Deuxième côte': {
    what: `Deux fois plus longue que la première, mais encore très courbée. Son
      cartilage rejoint le sternum à l'angle sternal.`,
    relief: ['Tubérosité du muscle dentelé antérieur, sur sa face externe'],
    joints: ['Vertèbres T1 et T2', 'Sternum, à l’angle sternal de Louis'],
    muscles: ['Dentelé antérieur, sur sa tubérosité', 'Scalène postérieur'],
    note: `L'angle sternal de Louis, repère palpable, marque le niveau de la
      deuxième côte : c'est de là que l'on compte les espaces intercostaux.`,
  },

  'Troisième côte': {
    what: `La première des côtes vraiment typiques : tête, col, tubercule, angle,
      corps et sillon costal.`,
    relief: ['Angle costal', 'Sillon costal, sur le bord inférieur de la face interne'],
    joints: ['Vertèbres T2 et T3', 'Sternum par son cartilage'],
    muscles: ['Intercostaux', 'Dentelé antérieur'],
  },

  'Quatrième côte': {
    what: `Côte typique. Son extrémité antérieure répond au mamelon chez l'homme
      et au niveau de la bifurcation trachéale.`,
    relief: ['Sillon costal, qui loge le paquet intercostal'],
    joints: ['Vertèbres T3 et T4', 'Sternum par son cartilage'],
    muscles: ['Intercostaux', 'Grand pectoral'],
    note: `Le paquet intercostal — veine, artère, nerf de haut en bas — chemine
      dans le sillon costal : une ponction pleurale se fait au bord SUPÉRIEUR
      de la côte inférieure, jamais sous la côte.`,
  },

  'Cinquième côte': {
    what: `Côte typique, la plus longue de la série avec la sixième et la
      septième.`,
    relief: ['Sillon costal'],
    joints: ['Vertèbres T4 et T5', 'Sternum par son cartilage'],
    muscles: ['Intercostaux', 'Grand pectoral', 'Dentelé antérieur'],
  },

  'Sixième côte': {
    what: `Côte typique, au niveau de la pointe du cœur sur la ligne médio-claviculaire
      gauche.`,
    relief: ['Sillon costal'],
    joints: ['Vertèbres T5 et T6', 'Sternum par son cartilage'],
    muscles: ['Intercostaux', 'Dentelé antérieur', 'Oblique externe'],
  },

  'Septième côte': {
    what: `La dernière côte vraie : son cartilage est le dernier à rejoindre
      directement le sternum.`,
    relief: ['Sillon costal'],
    joints: ['Vertèbres T6 et T7', 'Sternum, par le dernier cartilage direct'],
    muscles: ['Intercostaux', 'Droit de l’abdomen', 'Oblique externe'],
    note: `Les sept premières sont les côtes vraies ou sternales, parce que leur
      cartilage s'articule directement avec le sternum.`,
  },

  'Huitième côte': {
    what: `Première des côtes fausses : son cartilage ne rejoint pas le sternum
      mais celui de la côte au-dessus.`,
    relief: ['Sillon costal'],
    joints: ['Vertèbres T7 et T8', 'Cartilage de la septième côte'],
    muscles: ['Intercostaux', 'Oblique externe', 'Diaphragme'],
    note: `Les côtes huit, neuf et dix sont fausses : leurs cartilages forment le rebord costal.`,
  },

  'Neuvième côte': {
    what: `Côte fausse. Son cartilage rejoint celui de la huitième pour former le
      rebord costal.`,
    relief: ['Sillon costal'],
    joints: ['Vertèbres T8 et T9', 'Cartilage de la huitième côte'],
    muscles: ['Intercostaux', 'Diaphragme', 'Oblique externe'],
  },

  'Dixième côte': {
    what: `La dernière côte fausse, et souvent la dernière à s'articuler avec deux
      vertèbres.`,
    relief: ['Sillon costal'],
    joints: ['Vertèbre T10, par une facette souvent entière', 'Cartilage de la neuvième côte'],
    muscles: ['Intercostaux', 'Diaphragme'],
  },

  'Onzième côte': {
    what: `Première côte flottante : courte, sans tubercule, sans col net, et son
      extrémité antérieure est libre dans la paroi abdominale.`,
    relief: ['Pas de tubercule, pas d’angle, sillon costal effacé'],
    joints: ['Vertèbre T11 seule'],
    muscles: ['Carré des lombes', 'Diaphragme', 'Oblique interne'],
    note: `Les onzième et douzième sont flottantes : elles ne rejoignent aucun cartilage.`,
  },

  'Douzième côte': {
    what: `La plus courte des côtes, flottante, parfois si courte qu'elle est
      difficile à palper.`,
    relief: ['Ni tubercule, ni angle, ni sillon costal'],
    joints: ['Vertèbre T12 seule'],
    muscles: ['Carré des lombes', 'Diaphragme', 'Dentelé postérieur inférieur'],
    note: `Elle croise le rein en arrière : c'est le repère de la voie d'abord
      lombaire, et le point de percussion de la fosse lombaire.`,
  },

  'Cartilage costal de la première côte': {
    what: `Le seul cartilage costal qui ne bouge pas : il forme avec le manubrium une synchondrose, une articulation immobile.`,
    joints: ['Manubrium sternal'],
  },

  'Cartilage costal de la deuxième côte': {
    what: `Il s'articule avec le sternum exactement à l'angle sternal, à la jonction du manubrium et du corps.`,
    joints: ['Sternum, à l’angle de Louis'],
    note: `C’est lui qui fait de l’angle sternal le repère de comptage des espaces.`,
  },

  'Cartilage costal de la troisième côte': {
    what: `Cartilage costal vrai : il rejoint directement le bord latéral du corps du sternum.`,
    joints: ['Corps du sternum'],
  },

  'Cartilage costal de la quatrième côte': {
    what: `Cartilage costal vrai, articulé au corps du sternum.`,
    joints: ['Corps du sternum'],
  },

  'Cartilage costal de la cinquième côte': {
    what: `Cartilage costal vrai, articulé au corps du sternum.`,
    joints: ['Corps du sternum'],
  },

  'Cartilage costal de la sixième côte': {
    what: `Cartilage costal vrai, articulé au corps du sternum, près de sa partie basse.`,
    joints: ['Corps du sternum'],
  },

  'Cartilage costal de la septième côte': {
    what: `Le dernier cartilage à rejoindre le sternum, tout en bas, près du processus xiphoïde.`,
    joints: ['Corps du sternum et processus xiphoïde'],
    note: `Il marque la limite entre côtes vraies et côtes fausses.`,
  },

  'Cartilage costal de la huitième côte': {
    what: `Il ne rejoint pas le sternum : il s'unit au cartilage de la septième côte et participe au rebord costal.`,
    joints: ['Cartilage de la septième côte'],
    note: `Le rebord costal est fait des cartilages sept à dix.`,
  },

  'Cartilage costal de la neuvième côte': {
    what: `Il s'unit au cartilage de la huitième côte et forme avec lui le rebord costal.`,
    joints: ['Cartilage de la huitième côte'],
  },

  'Cartilage costal de la dixième côte': {
    what: `Le dernier cartilage costal : il s'unit à celui de la neuvième et termine le rebord costal.`,
    joints: ['Cartilage de la neuvième côte'],
    note: `Son extrémité est le point le plus bas du rebord costal palpable.`,
  },

  'Manubrium sternal': {
    what: `La pièce supérieure du sternum, la plus large et la plus épaisse.
      Elle porte la clavicule et les deux premières côtes.`,
    relief: ['Incisure jugulaire (fourchette sternale), sur son bord supérieur',
      'Incisures claviculaires, de chaque côté',
      'Angle sternal (de Louis), à sa jonction avec le corps'],
    joints: ['Clavicules, par les articulations sterno-claviculaires',
      'Premières côtes, par une synchondrose', 'Deuxièmes côtes, à l’angle sternal',
      'Corps du sternum, par la symphyse manubrio-sternale'],
    muscles: ['Sterno-cléido-mastoïdien', 'Sterno-hyoïdien et sterno-thyroïdien',
      'Grand pectoral'],
    near: ['Crosse de l’aorte et ses branches, juste en arrière',
      'Troncs veineux brachio-céphaliques', 'Thymus chez l’enfant'],
    note: `L'angle sternal se palpe et se compte : il répond au disque T4-T5, à
      la bifurcation trachéale, au début et à la fin de la crosse de l'aorte, et
      à la deuxième côte.`,
  },

  'Corps du sternum': {
    what: `La pièce moyenne du sternum, longue et plate, faite de quatre
      sternèbres soudées dont les traces restent visibles.`,
    relief: ['Crêtes transversales, vestiges de la soudure des sternèbres',
      'Incisures costales, de la deuxième à la septième côte'],
    joints: ['Cartilages costaux des côtes deux à sept',
      'Manubrium en haut, processus xiphoïde en bas'],
    muscles: ['Grand pectoral', 'Diaphragme, par quelques fibres'],
    near: ['Cœur et péricarde, directement en arrière',
      'Plèvres médiastines, de chaque côté'],
    note: `C'est sur lui que l'on comprime pendant un massage cardiaque, au
      niveau du tiers inférieur. La ponction sternale se fait dans le corps,
      pour le myélogramme.`,
  },

  'Processus xiphoïde': {
    what: `La pièce inférieure du sternum, petite, cartilagineuse jusqu'à un
      âge avancé, de forme très variable.`,
    joints: ['Corps du sternum, par la symphyse xipho-sternale',
      'Cartilage de la septième côte'],
    muscles: ['Diaphragme', 'Droit de l’abdomen', 'Ligne blanche'],
    note: `C'est le repère de la limite supérieure de l'appui pendant un massage
      cardiaque : comprimer dessus le fracture et peut déchirer le foie.`,
  },

  Diaphragme: {
    what: `Le muscle de la respiration : une cloison musculo-tendineuse en
      coupole qui sépare le thorax de l'abdomen. Il est le seul muscle
      inspiratoire indispensable.`,
    parts: ['Centre tendineux (centre phrénique), en trèfle',
      'Portion sternale, sur le processus xiphoïde',
      'Portion costale, sur les six dernières côtes',
      'Portion lombale, avec les piliers droit et gauche et les arcades'],
    relief: ['Coupoles droite et gauche, la droite plus haute à cause du foie',
      'Piliers, insérés sur L1 à L3',
      'Ligaments arqués médian, médial et latéral'],
    insertion: ['Processus xiphoïde en avant', 'Six dernières côtes et leurs cartilages',
      'Corps vertébraux L1 à L3, par les piliers'],
    nerve: ['Nerf phrénique (C3, C4, C5), pour tout le muscle'],
    action: ['Inspiration : sa descente augmente les trois diamètres du thorax',
      'Participe à la poussée abdominale'],
    through: ['Hiatus de la veine cave inférieure, dans le centre tendineux, à T8',
      'Hiatus œsophagien, dans le pilier gauche, à T10 — avec les nerfs vagues',
      'Hiatus aortique, en arrière des piliers, à T12 — avec le canal thoracique'],
    note: `« C3, C4, C5 keep the diaphragm alive » : une lésion médullaire
      au-dessus de C3 arrête la respiration. Les trois orifices se retiennent
      par leur niveau : cave à T8, œsophage à T10, aorte à T12.`,
  },
};

// ---------------------------------------------------------------------------
// Le rachis thoracique et lombal.
//
// The rule for the root changes at T1: in the cervical spine the root leaves
// ABOVE the pedicle of the vertebra it is named for, and from T1 down it leaves
// BELOW it. C8 is the transition, and there is no eighth cervical vertebra.

NOTES.colonne = {
  'Vertèbre T1': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque la charnière cervico-thoracique.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Facette costale supérieure entière pour la première côte, demi-facette inférieure pour la deuxième'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Première côte, par une facette entière'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T1, qui sort AU-DESSOUS du pédicule de T1'],
    note: `Son processus épineux est long comme celui de C7. Elle donne une racine au plexus brachial.`,
  },

  'Vertèbre T2': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le haut du rachis thoracique.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Deux demi-facettes costales, supérieure et inférieure'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Deuxième et troisième côtes'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T2, qui sort AU-DESSOUS du pédicule de T2'],
  },

  'Vertèbre T3': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le haut du rachis thoracique.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Deux demi-facettes costales'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Troisième et quatrième côtes'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T3, qui sort AU-DESSOUS du pédicule de T3'],
  },

  'Vertèbre T4': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le niveau de l’angle sternal.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Deux demi-facettes costales'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Quatrième et cinquième côtes'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T4, qui sort AU-DESSOUS du pédicule de T4'],
    note: `Le disque T4-T5 répond à l’angle sternal, à la bifurcation trachéale et aux deux extrémités de la crosse de l’aorte.`,
  },

  'Vertèbre T5': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le milieu du rachis thoracique.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Deux demi-facettes costales'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Cinquième et sixième côtes'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T5, qui sort AU-DESSOUS du pédicule de T5'],
  },

  'Vertèbre T6': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le milieu du rachis thoracique.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Deux demi-facettes costales'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Sixième et septième côtes'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T6, qui sort AU-DESSOUS du pédicule de T6'],
  },

  'Vertèbre T7': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le milieu du rachis thoracique, au sommet de la cyphose.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Deux demi-facettes costales'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Septième et huitième côtes'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T7, qui sort AU-DESSOUS du pédicule de T7'],
    note: `Son processus épineux, très oblique, se projette en regard du corps de T8 : c’est la vertèbre où l’épineuse est la plus inclinée.`,
  },

  'Vertèbre T8': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le niveau du hiatus de la veine cave.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Deux demi-facettes costales'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Huitième et neuvième côtes'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T8, qui sort AU-DESSOUS du pédicule de T8'],
    note: `La veine cave inférieure traverse le diaphragme à hauteur de T8.`,
  },

  'Vertèbre T9': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le bas du rachis thoracique.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Deux demi-facettes costales'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Neuvième et dixième côtes'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T9, qui sort AU-DESSOUS du pédicule de T9'],
  },

  'Vertèbre T10': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque le niveau du hiatus œsophagien.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Une facette costale souvent entière'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Dixième côte'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T10, qui sort AU-DESSOUS du pédicule de T10'],
    note: `L’œsophage traverse le diaphragme à hauteur de T10, avec les deux nerfs vagues.`,
  },

  'Vertèbre T11': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque la transition thoraco-lombale.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Une facette costale entière sur le pédicule, pas de facette transversaire'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Onzième côte, flottante'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T11, qui sort AU-DESSOUS du pédicule de T11'],
  },

  'Vertèbre T12': {
    what: `Vertèbre thoracique, reconnaissable à ses facettes costales. Elle
      marque la charnière thoraco-lombale, et le niveau du hiatus aortique.`,
    parts: ['Corps vertébral', 'Pédicules et lames', 'Processus transverses', 'Processus articulaires', 'Processus épineux, long et oblique en bas'],
    relief: ['Une facette costale entière, processus transverses réduits'],
    joints: ['Vertèbre au-dessus et vertèbre au-dessous, par un disque et deux zygapophysaires', 'Douzième côte, flottante'],
    muscles: ['Érecteurs du rachis', 'Trapèze et rhomboïdes, sur les épineuses hautes', 'Grand dorsal, sur les épineuses basses'],
    through: ['Foramen intervertébral — racine du nerf spinal T12, qui sort AU-DESSOUS du pédicule de T12'],
    note: `L’aorte traverse le diaphragme à hauteur de T12, avec le canal thoracique. En dessous, le rachis devient lombal et les processus articulaires changent d’orientation.`,
  },

  'Vertèbre L1': {
    what: `La première vertèbre lombale, au niveau où la moelle se termine.`,
    parts: ['Corps vertébral, massif et réniforme', 'Pédicules épais et lames', 'Processus costiformes (transverses)', 'Processus articulaires, à facettes sagittales', 'Processus épineux, rectangulaire et horizontal'],
    relief: ['Processus mamillaire et processus accessoire', 'Pas de foramen transversaire, pas de facette costale'],
    joints: ['Vertèbres voisines, par un disque et deux zygapophysaires'],
    muscles: ['Érecteurs du rachis et multifides', 'Psoas, sur le corps et les processus costiformes', 'Carré des lombes'],
    through: ['Foramen intervertébral — racine du nerf spinal L1'],
    note: `Le cône médullaire s’arrête en regard de L1-L2 : en dessous il n’y a plus que la queue de cheval. C’est aussi le niveau du plan trans-pylorique.`,
  },

  'Vertèbre L2': {
    what: `Vertèbre lombale typique : corps massif réniforme, processus épineux rectangulaire et horizontal.`,
    parts: ['Corps vertébral, massif et réniforme', 'Pédicules épais et lames', 'Processus costiformes (transverses)', 'Processus articulaires, à facettes sagittales', 'Processus épineux, rectangulaire et horizontal'],
    relief: ['Processus mamillaire et processus accessoire', 'Pas de foramen transversaire, pas de facette costale'],
    joints: ['Vertèbres voisines, par un disque et deux zygapophysaires'],
    muscles: ['Érecteurs du rachis et multifides', 'Psoas, sur le corps et les processus costiformes', 'Carré des lombes'],
    through: ['Foramen intervertébral — racine du nerf spinal L2'],
    note: `La ponction lombaire ne se fait jamais au-dessus de L2 : la moelle y est encore.`,
  },

  'Vertèbre L3': {
    what: `Vertèbre lombale typique, au centre de la lordose lombale.`,
    parts: ['Corps vertébral, massif et réniforme', 'Pédicules épais et lames', 'Processus costiformes (transverses)', 'Processus articulaires, à facettes sagittales', 'Processus épineux, rectangulaire et horizontal'],
    relief: ['Processus mamillaire et processus accessoire', 'Pas de foramen transversaire, pas de facette costale'],
    joints: ['Vertèbres voisines, par un disque et deux zygapophysaires'],
    muscles: ['Érecteurs du rachis et multifides', 'Psoas, sur le corps et les processus costiformes', 'Carré des lombes'],
    through: ['Foramen intervertébral — racine du nerf spinal L3'],
  },

  'Vertèbre L4': {
    what: `Vertèbre lombale typique. Son processus épineux est au niveau de la ligne joignant les deux crêtes iliaques.`,
    parts: ['Corps vertébral, massif et réniforme', 'Pédicules épais et lames', 'Processus costiformes (transverses)', 'Processus articulaires, à facettes sagittales', 'Processus épineux, rectangulaire et horizontal'],
    relief: ['Processus mamillaire et processus accessoire', 'Pas de foramen transversaire, pas de facette costale'],
    joints: ['Vertèbres voisines, par un disque et deux zygapophysaires'],
    muscles: ['Érecteurs du rachis et multifides', 'Psoas, sur le corps et les processus costiformes', 'Carré des lombes'],
    through: ['Foramen intervertébral — racine du nerf spinal L4'],
    note: `La ligne de Tuffier, entre les deux crêtes iliaques, passe par L4 : c’est le repère de la ponction lombaire, faite en L4-L5 ou L3-L4.`,
  },

  'Vertèbre L5': {
    what: `La plus volumineuse des vertèbres, avec un corps plus haut en avant qu’en arrière, ce qui crée l’angle lombo-sacré.`,
    parts: ['Corps vertébral, massif et réniforme', 'Pédicules épais et lames', 'Processus costiformes (transverses)', 'Processus articulaires, à facettes sagittales', 'Processus épineux, rectangulaire et horizontal'],
    relief: ['Processus mamillaire et processus accessoire', 'Pas de foramen transversaire, pas de facette costale'],
    joints: ['Vertèbres voisines, par un disque et deux zygapophysaires'],
    muscles: ['Érecteurs du rachis et multifides', 'Psoas, sur le corps et les processus costiformes', 'Carré des lombes'],
    through: ['Foramen intervertébral — racine du nerf spinal L5'],
    note: `Le disque L5-S1 est le plus souvent hernié de tout le rachis, et la racine comprimée est S1 : douleur de la face postérieure de la jambe jusqu’au talon, réflexe achilléen aboli.`,
  },

  Sacrum: {
    what: `Cinq vertèbres soudées en un os triangulaire, coincé comme une clef
      de voûte entre les deux os coxaux. Il transmet le poids du rachis au
      bassin.`,
    parts: ['Base, avec le promontoire', 'Deux ailes sacrées',
      'Face pelvienne, concave, à quatre paires de foramens',
      'Face dorsale, convexe, avec les crêtes sacrées', 'Apex'],
    relief: ['Promontoire', 'Crête sacrée médiane',
      'Hiatus sacré et cornes sacrées', 'Surface auriculaire'],
    joints: ['Vertèbre L5, par le disque L5-S1', 'Os coxaux, par les sacro-iliaques',
      'Coccyx'],
    through: ['Canal sacré — queue de cheval et filum terminal',
      'Foramens sacrés — branches des nerfs sacrés'],
    note: `Le promontoire est le repère du détroit supérieur. Le hiatus sacré
      est la voie de l'anesthésie caudale.`,
  },

  Coccyx: {
    what: `Trois à cinq vertèbres rudimentaires soudées, vestige de la queue.
      Dernier segment du rachis.`,
    joints: ['Sacrum, par l’articulation sacro-coccygienne'],
    muscles: ['Élévateur de l’anus et coccygien', 'Ligament ano-coccygien'],
    note: `Sa fracture après une chute sur les fesses donne une coccygodynie
      longue et rebelle.`,
  },
};

// ---------------------------------------------------------------------------
// Le cœur.

NOTES.coeur = {
  'Atrium droit': {
    what: `La cavité qui reçoit tout le sang veineux du corps. Sa paroi est
      mince et sa face interne porte les muscles pectinés dans sa partie
      antérieure.`,
    relief: ['Auricule droite', 'Muscles pectinés', 'Crête terminale',
      'Fosse ovale, sur le septum interatrial'],
    origin: ['Veine cave supérieure', 'Veine cave inférieure', 'Sinus coronaire'],
    ends: ['Ventricule droit, par l’orifice tricuspide'],
    note: `Le nœud sinusal est dans sa paroi, à la jonction avec la veine cave
      supérieure : c'est le pacemaker du cœur. La fosse ovale est le vestige du
      foramen ovale fœtal.`,
  },

  'Ventricule droit': {
    what: `La cavité la plus antérieure du cœur, celle qui est directement
      derrière le sternum. Sa paroi fait un tiers de l'épaisseur de celle du
      ventricule gauche, parce qu'elle pousse contre la basse pression
      pulmonaire.`,
    relief: ['Trabécules charnues', 'Muscles papillaires et cordages tendineux',
      'Bandelette ansiforme (trabécule septo-marginale)',
      'Infundibulum (cône artériel), en haut'],
    origin: ['Atrium droit, par la valve tricuspide'],
    ends: ['Tronc pulmonaire, par la valve pulmonaire'],
    note: `C'est le ventricule qui souffre dans l'embolie pulmonaire et dans
      l'insuffisance cardiaque droite. Étant le plus antérieur, c'est lui qui
      est atteint dans un traumatisme thoracique.`,
  },

  'Atrium gauche': {
    what: `La cavité la plus postérieure du cœur. Sa paroi est lisse sauf dans
      l'auricule, et elle reçoit les quatre veines pulmonaires.`,
    relief: ['Auricule gauche', 'Paroi lisse', 'Valvule de la fosse ovale'],
    origin: ['Quatre veines pulmonaires, deux à droite et deux à gauche'],
    ends: ['Ventricule gauche, par la valve mitrale'],
    near: ['Œsophage, juste en arrière'],
    note: `Sa dilatation, dans le rétrécissement mitral, comprime l'œsophage et
      le nerf laryngé récurrent gauche. L'auricule gauche est où se forment les
      thrombus de la fibrillation atriale.`,
  },

  'Ventricule gauche': {
    what: `La pompe systémique : sa paroi est trois fois plus épaisse que celle
      du ventricule droit, parce qu'elle éjecte contre la pression artérielle.
      Il forme la pointe du cœur.`,
    relief: ['Trabécules charnues fines', 'Deux muscles papillaires, antérieur et postérieur',
      'Vestibule aortique, lisse, sous la valve aortique'],
    origin: ['Atrium gauche, par la valve mitrale'],
    ends: ['Aorte ascendante, par la valve aortique'],
    note: `L'hypertrophie ventriculaire gauche est la réponse à l'hypertension
      et au rétrécissement aortique. La rupture d'un muscle papillaire après un
      infarctus donne une insuffisance mitrale aiguë.`,
  },

  'Aorte ascendante': {
    what: `Le premier segment de l'aorte, du ventricule gauche à la crosse. Il
      ne donne que deux branches, mais ce sont les artères du cœur lui-même.`,
    origin: ['Ventricule gauche, par la valve aortique'],
    branches: ['Artère coronaire droite', 'Artère coronaire gauche'],
    relief: ['Sinus aortiques (de Valsalva), au-dessus des trois cuspides'],
    note: `Les coronaires naissent des sinus de Valsalva, donc juste au-dessus
      des cuspides : le cœur se perfuse pendant la diastole, quand les cuspides
      se referment et que le sang reflue dans les sinus.`,
  },

  'Crosse de l’aorte': {
    what: `La portion horizontale, qui enjambe la bronche principale gauche et
      donne les trois vaisseaux de la tête et des membres supérieurs.`,
    branches: ['Tronc brachio-céphalique', 'Artère carotide commune gauche',
      'Artère subclavière gauche'],
    near: ['Nerf laryngé récurrent gauche, qui la contourne sous le ligament artériel',
      'Trachée et œsophage, en arrière'],
  },

  'Tronc pulmonaire': {
    what: `L'artère qui porte le sang désoxygéné du ventricule droit aux
      poumons. C'est la seule artère du corps à porter du sang veineux.`,
    origin: ['Ventricule droit, par la valve pulmonaire'],
    ends: ['Artères pulmonaires droite et gauche, sous la crosse de l’aorte'],
    near: ['Ligament artériel, vestige du canal artériel, entre sa bifurcation et la crosse'],
    note: `Une embolie pulmonaire massive se bloque à sa bifurcation : l'embolie
      en selle. La persistance du canal artériel est une cardiopathie
      congénitale fréquente.`,
  },

  'Veine cave supérieure': {
    what: `Le gros tronc veineux qui ramène à l'atrium droit tout le sang de la
      tête, du cou, des membres supérieurs et de la paroi thoracique.`,
    origin: ['Réunion des deux troncs veineux brachio-céphaliques, derrière le premier cartilage costal droit'],
    tributaries: ['Veine azygos, juste avant son abouchement'],
    ends: ['Atrium droit'],
    note: `Sa compression par une tumeur médiastinale donne le syndrome cave
      supérieur : œdème en pèlerine, turgescence jugulaire, circulation
      collatérale thoracique.`,
  },

  'Veine cave inférieure': {
    what: `La plus grosse veine du corps : elle ramène le sang de tout ce qui
      est sous le diaphragme.`,
    course: ['Traverse le diaphragme par le hiatus de la veine cave, à hauteur de T8'],
    ends: ['Atrium droit, dans sa partie basse'],
    note: 'Son trajet est à droite du rachis, contrairement à l’aorte.',
  },

  'Artère coronaire gauche': {
    what: `Un tronc très court, un à deux centimètres, qui naît du sinus
      aortique gauche et se divise presque aussitôt.`,
    origin: ['Sinus aortique gauche'],
    ends: ['Artère interventriculaire antérieure et artère circonflexe'],
    note: `Son occlusion, avant la division, est l'infarctus du tronc commun :
      la plus grave de toutes, parce qu'elle prive le ventricule gauche de
      presque tout son sang.`,
  },

  'Artère interventriculaire antérieure': {
    what: `La branche descendante de la coronaire gauche, dans le sillon
      interventriculaire antérieur. C'est l'artère qui nourrit le plus de
      myocarde.`,
    supplies: ['Paroi antérieure du ventricule gauche',
      'Deux tiers antérieurs du septum interventriculaire', 'Pointe du cœur'],
    note: `Son occlusion est l'infarctus antérieur, le plus fréquent et le plus
      étendu. Les Anglo-Saxons l'appellent la widow-maker.`,
  },

  'Artère circonflexe': {
    what: `La branche latérale de la coronaire gauche, dans le sillon
      atrio-ventriculaire gauche.`,
    supplies: ['Paroi latérale du ventricule gauche', 'Atrium gauche'],
  },

  'Artère coronaire droite': {
    what: `Née du sinus aortique droit, elle chemine dans le sillon
      atrio-ventriculaire droit et contourne le bord droit du cœur.`,
    supplies: ['Ventricule droit et atrium droit',
      'Nœud sinusal, chez la plupart des gens',
      'Nœud atrio-ventriculaire',
      'Paroi inférieure du ventricule gauche, par l’interventriculaire postérieure'],
    note: `La dominance est droite chez quatre-vingts pour cent des gens :
      l'interventriculaire postérieure naît d'elle. Son occlusion donne
      l'infarctus inférieur, souvent avec un bloc atrio-ventriculaire et une
      bradycardie, parce qu'elle nourrit les deux nœuds.`,
  },

  'Sinus coronaire': {
    what: `Le collecteur veineux du cœur, dans le sillon atrio-ventriculaire
      postérieur. Il draine presque tout le sang veineux du myocarde.`,
    tributaries: ['Grande veine cardiaque', 'Veine moyenne', 'Veine petite'],
    ends: ['Atrium droit, entre l’orifice de la veine cave inférieure et l’orifice tricuspide'],
  },

  'Grande veine cardiaque': {
    what: `La principale veine du cœur : elle accompagne l'artère
      interventriculaire antérieure puis la circonflexe.`,
    ends: ['Sinus coronaire'],
  },
};

// ---------------------------------------------------------------------------
// Les poumons.

NOTES.poumons = {
  'Lobe supérieur droit': {
    what: `Le lobe le plus haut du poumon droit, séparé du lobe moyen par la
      petite scissure (scissure horizontale).`,
    parts: ['Segment apical (S1)', 'Segment postérieur (S2)', 'Segment antérieur (S3)'],
    near: ['Petite scissure en bas', 'Dôme pleural et première côte en haut'],
    note: `Le poumon droit a trois lobes et deux scissures, le gauche deux lobes
      et une scissure. La petite scissure n'existe qu'à droite.`,
  },

  'Lobe moyen droit': {
    what: `Le petit lobe antérieur du poumon droit, entre la petite scissure
      au-dessus et la grande scissure en dessous. Il n'a pas d'équivalent à
      gauche.`,
    parts: ['Segment latéral (S4)', 'Segment médial (S5)'],
    note: `Sa bronche est longue, étroite et naît à angle droit : c'est le
      syndrome du lobe moyen, une atélectasie à répétition.`,
  },

  'Lobe inférieur droit': {
    what: `Le plus volumineux des lobes du poumon droit, en arrière et en bas de
      la grande scissure.`,
    parts: ['Segment apical (S6)', 'Segments basaux médial, antérieur, latéral et postérieur (S7 à S10)'],
    note: `Le segment apical S6 est le plus souvent atteint dans les
      pneumopathies d'inhalation chez un malade couché, parce que sa bronche est
      la plus déclive dans cette position.`,
  },

  'Lobe supérieur gauche': {
    what: `Le lobe antéro-supérieur du poumon gauche. Il porte la lingula, qui
      correspond au lobe moyen droit, et l'incisure cardiaque.`,
    parts: ['Segment apico-postérieur (S1+S2)', 'Segment antérieur (S3)',
      'Lingula, segments supérieur et inférieur (S4, S5)'],
    relief: ['Incisure cardiaque, sur son bord antérieur'],
    note: `Il n'y a pas de S7 à gauche. L'incisure cardiaque est ce qui laisse
      le cœur en contact direct avec la paroi : c'est par là que l'on ausculte
      le mieux.`,
  },

  'Lobe inférieur gauche': {
    what: `Le lobe postéro-inférieur du poumon gauche, derrière la grande
      scissure.`,
    parts: ['Segment apical (S6)', 'Segments basaux (S8 à S10)'],
  },

  Trachée: {
    what: `Un conduit fibro-cartilagineux de dix à douze centimètres, fait de
      seize à vingt anneaux incomplets en fer à cheval, ouverts en arrière où la
      paroi est musculaire et membraneuse.`,
    parts: ['Portion cervicale', 'Portion thoracique'],
    relief: ['Anneaux cartilagineux incomplets', 'Paroi membraneuse postérieure',
      'Carène, à sa bifurcation'],
    near: ['Œsophage, juste en arrière', 'Glande thyroïde, en avant, à hauteur du 2e au 4e anneau',
      'Crosse de l’aorte, qui la croise en bas'],
    ends: ['Bronches principales droite et gauche, à hauteur de T4-T5'],
    note: `La bifurcation est à l'angle sternal, disque T4-T5. La paroi
      postérieure est membraneuse parce que l'œsophage doit pouvoir s'y
      appuyer quand un bol alimentaire passe.`,
  },

  'Bronche principale droite': {
    what: `Plus large, plus courte et plus verticale que la gauche : elle
      prolonge presque la trachée en ligne droite.`,
    course: ['De la carène au hile droit, sur environ deux centimètres et demi'],
    ends: ['Bronches lobaires supérieure, moyenne et inférieure'],
    note: `C'est pourquoi un corps étranger inhalé, ou une sonde d'intubation
      poussée trop loin, va à droite. C'est aussi pourquoi les pneumopathies
      d'inhalation sont à droite.`,
  },

  'Bronche principale gauche': {
    what: `Plus étroite, plus longue et plus horizontale que la droite, parce
      qu'elle doit passer sous la crosse de l'aorte.`,
    course: ['De la carène au hile gauche, sur environ cinq centimètres'],
    ends: ['Bronches lobaires supérieure et inférieure'],
    near: ['Crosse de l’aorte, qui l’enjambe', 'Œsophage, en arrière'],
  },

  'Bronche lobaire supérieure droite': {
    what: `La seule bronche lobaire qui naisse au-dessus de l'artère pulmonaire
      — on l'appelle épartérielle.`,
    supplies: ['Lobe supérieur du poumon droit'],
  },

  'Bronche lobaire inférieure droite': {
    what: `Elle prolonge la bronche principale droite après le départ des
      bronches supérieure et moyenne.`,
    supplies: ['Lobe inférieur du poumon droit'],
  },

  'Bronche lobaire supérieure gauche': {
    what: `Elle se divise en un tronc culminal et un tronc lingulaire, ce
      dernier correspondant au lobe moyen droit.`,
    supplies: ['Lobe supérieur du poumon gauche, lingula comprise'],
  },

  'Bronche lobaire inférieure gauche': {
    what: `Elle prolonge la bronche principale gauche vers le bas et l'arrière.`,
    supplies: ['Lobe inférieur du poumon gauche'],
  },
};

// ---------------------------------------------------------------------------
// Les viscères abdominaux.
//
// The liver arrives as its eight Couinaud segments rather than as one mass,
// which is how a liver is actually read: a resection is named by segment.
// The source has no ileum, no caecum and no rectum — the gut it holds runs
// duodenum, jejunum, then the colon. That is said rather than faked.

NOTES.abdomen = {
  'Foie — segment I (lobe caudé)': {
    what: `Le lobe caudé (de Spiegel), à la face postérieure du foie, entre la
      veine cave inférieure et le sillon du ligament veineux.`,
    near: ['Veine cave inférieure, en arrière et à droite',
      'Ligament veineux, à gauche', 'Hile hépatique, en bas et en avant'],
    note: `C'est le seul segment à se drainer directement dans la veine cave :
      il est donc épargné, et hypertrophié, dans le syndrome de Budd-Chiari.`,
  },

  'Foie — segment II': {
    what: `Le segment postérieur du secteur latéral gauche, en haut et à gauche
      du ligament falciforme.`,
    near: ['Segment III en dessous', 'Estomac, en arrière'],
  },

  'Foie — segment III': {
    what: `Le segment antérieur du secteur latéral gauche, la pointe du lobe
      gauche du foie.`,
    near: ['Estomac, en arrière', 'Segment IV, à droite du ligament falciforme'],
    note: `Les segments II et III forment le lobe gauche anatomique : c'est le
      greffon du donneur vivant pour un enfant.`,
  },

  'Foie — segment IV (lobe carré)': {
    what: `Le secteur médial gauche, entre le ligament falciforme à gauche et la
      vésicule biliaire à droite.`,
    near: ['Vésicule biliaire, à sa droite', 'Ligament falciforme, à sa gauche',
      'Pylore et duodénum, en dessous'],
    note: `Sa partie inférieure est le lobe carré des anciens. Le sillon de la
      vésicule et la veine cave définissent la vraie ligne de partage du foie,
      qui ne passe pas par le ligament falciforme.`,
  },

  'Foie — segment V': {
    what: `Le segment antéro-inférieur du secteur antérieur droit, juste à
      droite de la vésicule biliaire.`,
    near: ['Vésicule biliaire, à sa gauche', 'Angle colique droit, en dessous'],
  },

  'Foie — segment VI': {
    what: `Le segment postéro-inférieur du secteur latéral droit, au bord
      inférieur droit du foie.`,
    near: ['Rein droit et angle colique droit, en dessous'],
  },

  'Foie — segment VII': {
    what: `Le segment postéro-supérieur du secteur latéral droit, le plus
      postérieur et le plus haut à droite.`,
    near: ['Diaphragme et coupole droite, au-dessus'],
  },

  'Foie — segment VIII': {
    what: `Le segment antéro-supérieur du secteur antérieur droit, le plus
      volumineux des huit.`,
    near: ['Diaphragme, au-dessus', 'Veine cave inférieure, en dedans'],
  },

  'Vésicule biliaire': {
    what: `Un réservoir piriforme de cinquante millilitres, logé dans la fossette
      cystique à la face inférieure du foie. Elle concentre et stocke la bile
      entre les repas.`,
    parts: ['Fond, qui déborde le bord inférieur du foie', 'Corps', 'Infundibulum', 'Col'],
    near: ['Segments IV et V du foie', 'Duodénum et angle colique droit, en dessous',
      'Triangle de Calot, entre le canal cystique, le canal hépatique et le foie'],
    ends: ['Canal cystique, puis canal cholédoque'],
    note: `Le fond se projette au croisement du rebord costal droit et du bord
      externe du droit de l'abdomen : c'est le point de Murphy. Le triangle de
      Calot est le repère qu'il faut disséquer avant de couper quoi que ce soit
      dans une cholécystectomie.`,
  },

  Œsophage: {
    what: `Un conduit musculaire de vingt-cinq centimètres, du pharynx à
      l'estomac. Sa musculature est striée en haut et lisse en bas.`,
    parts: ['Portion cervicale', 'Portion thoracique', 'Portion abdominale, courte'],
    relief: ['Trois rétrécissements : cricoïdien, aortique et diaphragmatique'],
    course: ['Descend derrière la trachée puis derrière l’atrium gauche',
      'Traverse le diaphragme par le hiatus œsophagien, à T10'],
    near: ['Trachée en avant en haut, atrium gauche en avant en bas',
      'Aorte thoracique, qu’il croise', 'Nerfs vagues, qui l’accompagnent'],
    note: `Les trois rétrécissements sont où se bloquent les corps étrangers et
      où brûlent les caustiques. Le cardia est le siège du reflux et de
      l'endobrachyœsophage.`,
  },

  Estomac: {
    what: `Une poche musculaire en J entre l'œsophage et le duodénum, dans
      l'hypocondre gauche et l'épigastre. Sa paroi a trois couches musculaires
      au lieu de deux.`,
    parts: ['Cardia', 'Fundus (grosse tubérosité)', 'Corps',
      'Antre pylorique', 'Pylore'],
    relief: ['Petite courbure, à droite, avec l’incisure angulaire',
      'Grande courbure, à gauche', 'Plis (replis) de la muqueuse'],
    near: ['Foie et diaphragme, au-dessus', 'Rate, à gauche',
      'Pancréas et arrière-cavité des épiploons, en arrière',
      'Côlon transverse, en dessous'],
    note: `Sa vascularisation vient des trois branches du tronc cœliaque, par
      deux arcades sur ses courbures. L'ulcère de la petite courbure érode
      l'artère gastrique gauche ; l'ulcère de la face postérieure du bulbe érode
      l'artère gastro-duodénale, et c'est l'hémorragie grave.`,
  },

  Duodénum: {
    what: `Le premier segment de l'intestin grêle, en cadre autour de la tête du
      pancréas. Il est fixe et rétropéritonéal sauf son premier centimètre.`,
    parts: ['Première portion (D1), le bulbe, mobile',
      'Deuxième portion (D2), descendante, où s’abouchent les canaux',
      'Troisième portion (D3), horizontale', 'Quatrième portion (D4), ascendante'],
    relief: ['Papille duodénale majeure (ampoule de Vater), sur D2',
      'Angle duodéno-jéjunal, soutenu par le ligament de Treitz'],
    near: ['Tête du pancréas, qu’il entoure', 'Vésicule et voie biliaire, en arrière de D1',
      'Vaisseaux mésentériques supérieurs, qui croisent D3'],
    note: `Le cholédoque et le canal pancréatique s'abouchent ensemble à
      l'ampoule de Vater, sur D2 : un calcul enclavé là donne à la fois un
      ictère et une pancréatite. L'angle de Treitz est la limite entre hémorragie
      digestive haute et basse.`,
  },

  Jéjunum: {
    what: `La partie mobile et plissée de l'intestin grêle, suspendue au
      mésentère. Le jéjunum est la partie haute, l'iléon la partie basse, et il
      n'y a pas de frontière nette entre les deux.`,
    relief: ['Plis circulaires (valvules conniventes), hauts et serrés',
      'Arcades vasculaires peu nombreuses, vasa recta longs'],
    near: ['Mésentère, qui le suspend', 'Côlon, qui l’encadre'],
    note: `Le jéjunum a des plis hauts, peu d'arcades et des vasa recta longs ;
      l'iléon a des plis effacés, beaucoup d'arcades, des vasa recta courts et
      des plaques de Peyer. C'est ainsi qu'on les distingue au bloc. La source
      de ce modèle ne contient pas l'iléon séparément.`,
  },

  'Côlon ascendant': {
    what: `Le premier segment du côlon, du cæcum à l'angle colique droit, dans
      le flanc droit. Il est fixe et rétropéritonéal.`,
    relief: ['Bandelettes (ténias) coliques', 'Haustrations', 'Appendices épiploïques'],
    near: ['Rein droit et muscle carré des lombes, en arrière',
      'Foie, à l’angle colique droit'],
    note: `Les trois caractères du côlon — ténias, haustrations, appendices
      épiploïques — le distinguent du grêle au premier coup d'œil. La source ne
      contient pas le cæcum séparément.`,
  },

  'Côlon transverse': {
    what: `Le segment mobile du côlon, suspendu par le mésocôlon transverse, de
      l'angle droit à l'angle gauche.`,
    relief: ['Bandelettes coliques', 'Haustrations'],
    near: ['Estomac au-dessus, auquel il est relié par le ligament gastro-colique',
      'Grand omentum, qui pend devant lui',
      'Rate, à l’angle colique gauche'],
    note: `Le mésocôlon transverse divise la cavité abdominale en étage
      sus-mésocolique et sous-mésocolique. L'angle gauche est plus haut et plus
      aigu que le droit : c'est l'angle splénique.`,
  },

  'Côlon descendant': {
    what: `Le segment du flanc gauche, de l'angle colique gauche à la fosse
      iliaque gauche. Fixe et rétropéritonéal, comme l'ascendant.`,
    relief: ['Bandelettes coliques', 'Haustrations'],
    near: ['Rein gauche, en arrière', 'Rate, à l’angle colique gauche'],
  },

  'Côlon sigmoïde': {
    what: `La boucle mobile qui fait suite au côlon descendant dans le petit
      bassin, suspendue par le mésosigmoïde.`,
    relief: ['Bandelettes qui s’étalent et disparaissent à sa terminaison'],
    near: ['Vessie et rectum, dans le petit bassin', 'Uretère gauche, en arrière'],
    note: `C'est le siège le plus fréquent de la diverticulose et du volvulus,
      parce qu'il est mobile sur un méso étroit. La source ne contient pas le
      rectum séparément.`,
  },

  'Appendice vermiforme': {
    what: `Un diverticule de huit centimètres né du cæcum, à la convergence des
      trois bandelettes coliques. Sa position est très variable.`,
    relief: ['Base fixe, au confluent des trois ténias', 'Méso-appendice, qui porte son artère'],
    near: ['Cæcum, dont il naît', 'Uretère droit et vaisseaux iliaques, en arrière',
      'Fosse iliaque droite'],
    note: `Sa base se projette au point de McBurney, à l'union du tiers externe
      et des deux tiers internes de la ligne ombilic — épine iliaque
      antéro-supérieure. Quelle que soit la position de sa pointe, on le trouve
      toujours en suivant les bandelettes jusqu'à leur confluent.`,
  },

  Pancréas: {
    what: `Une glande mixte, exocrine et endocrine, allongée transversalement
      en arrière de l'estomac. Elle est rétropéritonéale et profonde.`,
    parts: ['Tête, dans le cadre duodénal, avec le processus unciné',
      'Col (isthme)', 'Corps', 'Queue, au contact de la rate'],
    relief: ['Canal pancréatique principal (de Wirsung)',
      'Canal accessoire (de Santorini)',
      'Incisure du col, où passent les vaisseaux mésentériques supérieurs'],
    near: ['Duodénum, qui entoure la tête', 'Cholédoque, dans la tête',
      'Vaisseaux mésentériques supérieurs, derrière le col',
      'Rate et hile splénique, au contact de la queue',
      'Aorte et veine cave, en arrière'],
    note: `Le cancer de la tête comprime le cholédoque : ictère nu, sans fièvre
      ni douleur, avec grosse vésicule — le signe de Courvoisier. Sa position
      devant le rachis explique qu'un traumatisme de l'abdomen l'écrase contre
      L1-L2.`,
  },

  Rate: {
    what: `Le plus gros organe lymphoïde du corps, dans l'hypocondre gauche,
      contre la coupole diaphragmatique, en regard des côtes neuf à onze.`,
    relief: ['Face diaphragmatique, convexe', 'Face viscérale, avec le hile',
      'Bord antérieur crénelé'],
    near: ['Diaphragme et côtes 9 à 11, en dehors', 'Estomac, en dedans',
      'Rein gauche et queue du pancréas, en arrière',
      'Angle colique gauche, en dessous'],
    note: `Normalement non palpable : une rate qu'on palpe est déjà deux fois
      trop grosse. Une fracture des côtes basses gauches doit faire chercher une
      rupture de rate, qui peut saigner en deux temps.`,
  },
};

// ---------------------------------------------------------------------------
// L'appareil urinaire et génital.
//
// Both sources are a male reference body. There is no female anatomy to take
// from either of them, so none is drawn and none is invented.

NOTES.urinaire = {
  Rein: {
    what: `Un organe en haricot de douze centimètres, rétropéritonéal, dans la
      loge rénale de part et d'autre du rachis. Le droit est plus bas que le
      gauche, parce que le foie le repousse.`,
    parts: ['Cortex, en périphérie', 'Médullaire, avec les pyramides de Malpighi',
      'Colonnes de Bertin, entre les pyramides', 'Sinus rénal, qui contient les cavités'],
    relief: ['Hile rénal, sur le bord médial', 'Papilles rénales, au sommet des pyramides'],
    near: ['Glande surrénale, coiffant le pôle supérieur',
      'Douzième côte, en arrière', 'Foie à droite, rate et estomac à gauche',
      'Duodénum à droite, queue du pancréas à gauche'],
    through: ['Pédicule rénal, au hile : veine en avant, artère au milieu, bassinet en arrière'],
    note: `L'ordre au hile se retient d'avant en arrière : Veine, Artère,
      Bassinet. Les reins montent de la région pelvienne pendant le
      développement : un rein en fer à cheval reste bloqué sous l'artère
      mésentérique inférieure.`,
  },

  Bassinet: {
    what: `Le réservoir en entonnoir qui recueille l'urine des calices et la
      verse dans l'uretère. Il est en partie dans le sinus rénal, en partie
      hors du rein.`,
    origin: ['Calices majeurs, eux-mêmes formés des calices mineurs'],
    ends: ['Uretère, à la jonction pyélo-urétérale'],
    note: `La jonction pyélo-urétérale est le premier des trois rétrécissements
      de la voie urinaire, et le premier endroit où un calcul se bloque.`,
  },

  Uretère: {
    what: `Un conduit musculaire de vingt-cinq à trente centimètres, du bassinet
      à la vessie, entièrement rétropéritonéal. Il pousse l'urine par
      péristaltisme, pas par gravité.`,
    parts: ['Portion abdominale', 'Portion pelvienne', 'Portion intra-murale, dans la paroi vésicale'],
    relief: ['Trois rétrécissements : jonction pyélo-urétérale, croisement des vaisseaux iliaques, méat vésical'],
    course: ['Descend sur le muscle psoas', 'Croise les vaisseaux iliaques à leur bifurcation',
      'Chemine sur la paroi latérale du pelvis puis gagne la vessie obliquement'],
    near: ['Vaisseaux gonadiques, qui le croisent en avant — « water under the bridge »',
      'Conduit déférent, qui le croise en avant chez l’homme',
      'Artère utérine chez la femme, qui le croise de la même façon'],
    note: `Les trois rétrécissements sont où se bloquent les calculs. Le
      croisement avec l'artère utérine est la raison pour laquelle l'uretère est
      blessé dans les hystérectomies : l'eau passe sous le pont.`,
  },

  Vessie: {
    what: `Un réservoir musculaire extensible, sous-péritonéal, derrière la
      symphyse pubienne. Vide, elle est pelvienne ; pleine, elle devient
      abdominale.`,
    parts: ['Apex (sommet)', 'Corps', 'Fond', 'Col, qui donne l’urètre'],
    relief: ['Trigone vésical, entre les deux méats urétéraux et le col',
      'Muscle détrusor', 'Ouraque, du sommet à l’ombilic'],
    near: ['Symphyse pubienne, en avant', 'Prostate, en dessous chez l’homme',
      'Rectum, en arrière', 'Péritoine, sur sa face supérieure seulement'],
    note: `Pleine, elle dépasse le pubis et peut être ponctionnée par voie
      sus-pubienne sans traverser le péritoine. Le trigone est la seule partie
      lisse de la muqueuse, et le siège de prédilection des tumeurs.`,
  },

  'Glande surrénale': {
    what: `Une glande endocrine coiffant le pôle supérieur du rein, dans la loge
      rénale mais séparée du rein par une lame de tissu. Triangulaire à droite,
      en croissant à gauche.`,
    parts: ['Corticale, qui fait les minéralocorticoïdes, glucocorticoïdes et androgènes',
      'Médullaire, qui fait l’adrénaline et la noradrénaline'],
    near: ['Pôle supérieur du rein', 'Veine cave inférieure, à droite',
      'Pancréas et rate, à gauche'],
    note: `Sa veine est courte et se jette directement dans la veine cave à
      droite, dans la veine rénale à gauche. Le phéochromocytome vient de la
      médullaire, la maladie d'Addison est une insuffisance de la corticale.`,
  },

  Prostate: {
    what: `Une glande en châtaigne entourant l'urètre juste sous la vessie. Elle
      fournit environ un tiers du volume du sperme.`,
    parts: ['Zone périphérique', 'Zone centrale', 'Zone de transition, autour de l’urètre'],
    near: ['Vessie au-dessus', 'Rectum en arrière — d’où le toucher rectal',
      'Symphyse pubienne en avant', 'Plancher pelvien en dessous'],
    note: `L'adénome naît de la zone de transition, autour de l'urètre, et gêne
      la miction ; le cancer naît de la zone périphérique, contre le rectum, et
      c'est pourquoi on le palpe au toucher rectal avant qu'il ne gêne.`,
  },

  'Vésicule séminale': {
    what: `Un réservoir contourné de cinq centimètres, derrière la vessie et
      au-dessus de la prostate. Elle fournit la majeure partie du liquide
      séminal.`,
    near: ['Vessie en avant', 'Rectum en arrière', 'Conduit déférent en dedans'],
    ends: ['Conduit éjaculateur, avec le conduit déférent, dans l’urètre prostatique'],
  },

  Testicule: {
    what: `La gonade masculine, ovoïde, dans le scrotum. Il fait les
      spermatozoïdes et la testostérone, et il est hors du corps parce que la
      spermatogenèse a besoin de deux degrés de moins.`,
    parts: ['Lobules testiculaires', 'Tubes séminifères', 'Rete testis',
      'Albuginée, la capsule fibreuse'],
    near: ['Épididyme, coiffant son bord postérieur', 'Vaginale, qui l’enveloppe'],
    note: `Sa vascularisation et son drainage lymphatique viennent de l'abdomen,
      d'où il descend : un cancer du testicule métastase aux ganglions
      lombo-aortiques, pas aux ganglions inguinaux. La torsion est une urgence
      de six heures.`,
  },

  Épididyme: {
    what: `Un conduit unique de six mètres pelotonné sur le bord postérieur du
      testicule, où les spermatozoïdes achèvent leur maturation et sont
      stockés.`,
    parts: ['Tête', 'Corps', 'Queue'],
    ends: ['Conduit déférent, dont il est la suite directe'],
  },

  'Conduit déférent': {
    what: `Un tube musculaire épais de quarante-cinq centimètres, palpable comme
      une corde dans le cordon spermatique. Il monte du scrotum au pelvis.`,
    course: ['Monte dans le cordon spermatique et traverse le canal inguinal',
      'Croise l’uretère par-dessus dans le pelvis',
      'Se dilate en ampoule derrière la vessie'],
    ends: ['Conduit éjaculateur, en s’unissant à la vésicule séminale'],
    note: `Sa consistance dure le rend reconnaissable à la palpation du cordon,
      et c'est lui que l'on sectionne dans une vasectomie.`,
  },

  'Corps caverneux': {
    what: `Les deux cylindres érectiles dorsaux du pénis, entourés d'une
      albuginée épaisse. Ce sont eux qui font la rigidité.`,
    parts: ['Racine (pilier), fixée sur la branche ischio-pubienne', 'Corps'],
    near: ['Corps spongieux, en dessous', 'Artères caverneuses, en leur centre'],
    note: `Leur albuginée inextensible est ce qui permet la rigidité : le sang
      qui entre ne peut plus sortir. Sa fibrose donne la maladie de La Peyronie.`,
  },

  'Corps spongieux': {
    what: `Le cylindre érectile médian et ventral, qui entoure l'urètre et se
      termine par le gland. Son albuginée est mince, ce qui laisse l'urètre
      libre pendant l'érection.`,
    parts: ['Bulbe du pénis, en arrière', 'Corps', 'Gland, en avant'],
    through: ['Urètre spongieux, sur toute sa longueur'],
  },

  Gland: {
    what: `L'extrémité conique et renflée du corps spongieux, la partie la plus
      richement innervée du pénis.`,
    relief: ['Couronne du gland', 'Méat urétral, à son sommet'],
    near: ['Prépuce, qui le recouvre'],
  },
};

// ---------------------------------------------------------------------------
// Les muscles du membre supérieur.
//
// A muscle is read differently from a bone: Origine, Insertion, Innervation,
// Action, Rapports.

NOTES['muscles-sup'] = {
  'Trapèze, faisceau descendant': {
    what: `La partie haute du trapèze, des os du crâne et du ligament nuchal
      vers la clavicule. C'est elle qui hausse l'épaule.`,
    origin: ['Protubérance occipitale externe, ligne nuchale supérieure, ligament nuchal'],
    insertion: ['Tiers latéral du bord postérieur de la clavicule'],
    nerve: ['Nerf accessoire (XI), avec des fibres sensitives de C3-C4'],
    action: ['Élève la ceinture scapulaire', 'Sonnette latérale de la scapula'],
    note: `Une paralysie du XI donne une épaule tombante et un déficit
      d'élévation du bras au-delà de l'horizontale : le trapèze ne peut plus
      faire sonner la scapula.`,
  },

  'Trapèze, faisceau transverse': {
    what: `La partie moyenne du trapèze, horizontale, des épineuses cervicales
      basses et thoraciques hautes vers l'acromion et l'épine.`,
    origin: ['Processus épineux de C7 à T3'],
    insertion: ['Acromion et bord supérieur de l’épine de la scapula'],
    nerve: ['Nerf accessoire (XI)'],
    action: ['Adduction de la scapula — il rapproche les omoplates'],
  },

  'Trapèze, faisceau ascendant': {
    what: `La partie basse du trapèze, des épineuses thoraciques vers la racine
      de l'épine de la scapula.`,
    origin: ['Processus épineux de T4 à T12'],
    insertion: ['Racine de l’épine de la scapula'],
    nerve: ['Nerf accessoire (XI)'],
    action: ['Abaisse la scapula', 'Participe à la sonnette latérale avec le faisceau descendant'],
  },

  'Grand dorsal': {
    what: `Le plus large muscle du corps : une nappe qui va du bas du dos et du
      bassin jusqu'à la coulisse bicipitale de l'humérus.`,
    origin: ['Processus épineux de T7 au sacrum, par l’aponévrose thoraco-lombale',
      'Crête iliaque', 'Quatre dernières côtes', 'Angle inférieur de la scapula'],
    insertion: ['Fond de la coulisse bicipitale de l’humérus'],
    nerve: ['Nerf thoraco-dorsal (C6, C7, C8)'],
    action: ['Adduction, rotation médiale et rétropulsion du bras',
      'Muscle de la grimpe et de la nage'],
    note: 'C’est le muscle qui ramène le bras vers le corps quand on se hisse.',
  },

  'Élévateur de la scapula': {
    what: `Un muscle en ruban des processus transverses cervicaux à l'angle
      supérieur de la scapula.`,
    origin: ['Tubercules postérieurs des processus transverses de C1 à C4'],
    insertion: ['Angle supérieur et bord médial de la scapula'],
    nerve: ['Nerf dorsal de la scapula (C5) et rameaux de C3-C4'],
    action: ['Élève la scapula', 'Sonnette médiale'],
  },

  'Rhomboïde majeur': {
    what: `Un muscle quadrilatère entre les épineuses thoraciques et le bord
      médial de la scapula, sous le trapèze.`,
    origin: ['Processus épineux de T2 à T5'],
    insertion: ['Bord médial de la scapula, sous l’épine'],
    nerve: ['Nerf dorsal de la scapula (C5)'],
    action: ['Adduction et sonnette médiale de la scapula'],
    note: `Sa paralysie donne un décollement du bord médial de la scapula, moins
      marqué que celui du dentelé antérieur.`,
  },

  'Rhomboïde mineur': {
    what: `Le petit rhomboïde, au-dessus du majeur, du ligament nuchal à la
      racine de l'épine de la scapula.`,
    origin: ['Ligament nuchal et processus épineux de C7 et T1'],
    insertion: ['Bord médial de la scapula, à hauteur de l’épine'],
    nerve: ['Nerf dorsal de la scapula (C5)'],
    action: ['Adduction de la scapula'],
  },

  'Dentelé antérieur': {
    what: `Un large muscle en éventail qui plaque la scapula contre le thorax,
      des dix premières côtes au bord médial de la scapula.`,
    origin: ['Faces latérales des dix premières côtes'],
    insertion: ['Bord médial de la scapula, sur sa face costale'],
    nerve: ['Nerf thoracique long (C5, C6, C7)'],
    action: ['Plaque la scapula contre le thorax', 'Sonnette latérale — il permet de lever le bras au-dessus de l’horizontale'],
    note: `Sa paralysie donne le scapula alata, l'omoplate décollée en aile : le
      bord médial se soulève quand on pousse contre un mur. Le nerf thoracique
      long est superficiel et souvent lésé dans les curages axillaires.`,
  },

  'Grand pectoral, chef claviculaire': {
    what: `La partie haute du grand pectoral, de la clavicule à l'humérus. Elle
      antépulse le bras.`,
    origin: ['Moitié médiale du bord antérieur de la clavicule'],
    insertion: ['Lèvre latérale de la coulisse bicipitale de l’humérus'],
    nerve: ['Nerf pectoral latéral (C5, C6, C7)'],
    action: ['Antépulsion et adduction du bras', 'Rotation médiale'],
  },

  'Grand pectoral, chef sterno-costal': {
    what: `La partie principale du grand pectoral, du sternum et des cartilages
      costaux à l'humérus.`,
    origin: ['Sternum et cartilages costaux des six premières côtes'],
    insertion: ['Lèvre latérale de la coulisse bicipitale de l’humérus'],
    nerve: ['Nerfs pectoraux latéral et médial (C6 à T1)'],
    action: ['Adduction et rotation médiale du bras', 'Abaisse l’épaule'],
    note: `Les deux chefs se croisent avant de s'insérer, ce qui explique que le
      tendon soit torsadé et que le muscle ait deux actions opposées sur
      l'élévation.`,
  },

  'Supra-épineux': {
    what: `Le premier muscle de la coiffe des rotateurs, dans la fosse
      supra-épineuse, sous l'acromion.`,
    origin: ['Fosse supra-épineuse de la scapula'],
    insertion: ['Facette supérieure du tubercule majeur de l’humérus'],
    nerve: ['Nerf supra-scapulaire (C5, C6)'],
    action: ['Initie l’abduction du bras, les quinze premiers degrés',
      'Maintient la tête humérale dans la glène'],
    near: ['Acromion et ligament coraco-acromial, au-dessus',
      'Bourse sous-acromiale, entre les deux'],
    note: `C'est le tendon le plus souvent rompu du corps. Son passage sous
      l'acromion est ce qui fait le conflit sous-acromial, et sa rupture donne
      un bras qui ne peut plus démarrer l'abduction.`,
  },

  'Infra-épineux': {
    what: `Le deuxième muscle de la coiffe, dans la fosse infra-épineuse, sous
      l'épine de la scapula.`,
    origin: ['Fosse infra-épineuse de la scapula'],
    insertion: ['Facette moyenne du tubercule majeur de l’humérus'],
    nerve: ['Nerf supra-scapulaire (C5, C6)'],
    action: ['Rotation latérale du bras, principal rotateur externe'],
  },

  'Petit rond': {
    what: `Le plus petit muscle de la coiffe, sous l'infra-épineux, du bord
      latéral de la scapula à l'humérus.`,
    origin: ['Bord latéral de la scapula, partie haute'],
    insertion: ['Facette inférieure du tubercule majeur de l’humérus'],
    nerve: ['Nerf axillaire (C5, C6)'],
    action: ['Rotation latérale du bras'],
  },

  Subscapulaire: {
    what: `Le seul muscle de la coiffe qui soit en avant : il occupe toute la
      face costale de la scapula.`,
    origin: ['Fosse subscapulaire, sur la face costale de la scapula'],
    insertion: ['Tubercule mineur de l’humérus'],
    nerve: ['Nerfs subscapulaires supérieur et inférieur (C5, C6)'],
    action: ['Rotation médiale du bras', 'Stabilise la tête humérale en avant'],
    note: `Étant le seul en avant, c'est lui qui empêche la luxation antérieure
      — la plus fréquente des luxations de l'épaule.`,
  },

  'Grand rond': {
    what: `Un muscle épais de l'angle inférieur de la scapula à l'humérus. Il
      n'appartient PAS à la coiffe des rotateurs.`,
    origin: ['Angle inférieur et bord latéral de la scapula'],
    insertion: ['Lèvre médiale de la coulisse bicipitale de l’humérus'],
    nerve: ['Nerf subscapulaire inférieur (C5, C6)'],
    action: ['Adduction et rotation médiale du bras'],
    note: `Il est souvent confondu avec la coiffe : la coiffe, ce sont le
      supra-épineux, l'infra-épineux, le petit rond et le subscapulaire — le
      grand rond n'en fait pas partie.`,
  },

  'Deltoïde, faisceau claviculaire': {
    what: `La partie antérieure du deltoïde, de la clavicule à la tubérosité
      deltoïdienne.`,
    origin: ['Tiers latéral du bord antérieur de la clavicule'],
    insertion: ['Tubérosité deltoïdienne de l’humérus'],
    nerve: ['Nerf axillaire (C5, C6)'],
    action: ['Antépulsion et rotation médiale du bras'],
  },

  'Deltoïde, faisceau acromial': {
    what: `La partie moyenne du deltoïde, multipennée, la plus puissante : c'est
      le muscle de l'abduction.`,
    origin: ['Acromion'],
    insertion: ['Tubérosité deltoïdienne de l’humérus'],
    nerve: ['Nerf axillaire (C5, C6)'],
    action: ['Abduction du bras, de quinze à quatre-vingt-dix degrés'],
    note: `Le nerf axillaire contourne le col chirurgical de l'humérus : une
      fracture à ce niveau ou une luxation d'épaule le lèse, et le moignon de
      l'épaule devient insensible — le signe du galon.`,
  },

  'Deltoïde, faisceau spinal': {
    what: `La partie postérieure du deltoïde, de l'épine de la scapula à
      l'humérus.`,
    origin: ['Bord inférieur de l’épine de la scapula'],
    insertion: ['Tubérosité deltoïdienne de l’humérus'],
    nerve: ['Nerf axillaire (C5, C6)'],
    action: ['Rétropulsion et rotation latérale du bras'],
  },

  'Biceps brachial, longue portion': {
    what: `Le chef long du biceps : son tendon naît dans l'articulation
      elle-même, traverse la capsule et descend dans la coulisse bicipitale.`,
    origin: ['Tubercule supra-glénoïdal de la scapula, dans l’articulation'],
    insertion: ['Tubérosité radiale, et expansion aponévrotique vers l’avant-bras'],
    nerve: ['Nerf musculo-cutané (C5, C6)'],
    action: ['Flexion du coude', 'Supination, la plus puissante du corps',
      'Participe à l’abduction du bras'],
    note: `Son tendon intra-articulaire est le siège des tendinites et des
      ruptures : la rupture donne le signe de Popeye, le ventre musculaire qui
      descend en boule.`,
  },

  'Biceps brachial, courte portion': {
    what: `Le chef court du biceps, du processus coracoïde à la tubérosité
      radiale, avec le coraco-brachial.`,
    origin: ['Processus coracoïde de la scapula'],
    insertion: ['Tubérosité radiale'],
    nerve: ['Nerf musculo-cutané (C5, C6)'],
    action: ['Flexion du coude et supination'],
  },

  Brachial: {
    what: `Le vrai fléchisseur du coude : il est sous le biceps et s'insère sur
      l'ulna, donc il fléchit quelle que soit la position de la main.`,
    origin: ['Moitié inférieure de la face antérieure de l’humérus'],
    insertion: ['Tubérosité ulnaire, sous le processus coronoïde'],
    nerve: ['Nerf musculo-cutané (C5, C6), avec un rameau du radial'],
    action: ['Flexion du coude, quelle que soit la pronosupination'],
  },

  'Coraco-brachial': {
    what: `Un muscle grêle du processus coracoïde au milieu de la face médiale
      de l'humérus.`,
    origin: ['Processus coracoïde de la scapula'],
    insertion: ['Face médiale de l’humérus, au tiers moyen'],
    nerve: ['Nerf musculo-cutané (C5, C6, C7), qui le traverse'],
    action: ['Antépulsion et adduction du bras'],
    note: 'Il est le seul muscle que le nerf musculo-cutané perfore.',
  },

  'Triceps brachial, longue portion': {
    what: `Le seul chef du triceps qui naisse de la scapula, et donc le seul qui
      agisse aussi sur l'épaule.`,
    origin: ['Tubercule infra-glénoïdal de la scapula'],
    insertion: ['Olécrâne'],
    nerve: ['Nerf radial (C6, C7, C8)'],
    action: ['Extension du coude', 'Rétropulsion et adduction du bras'],
  },

  'Triceps brachial, vaste latéral': {
    what: `Le chef latéral du triceps, au-dessus et en dehors du sillon du nerf
      radial.`,
    origin: ['Face postérieure de l’humérus, au-dessus du sillon radial'],
    insertion: ['Olécrâne'],
    nerve: ['Nerf radial (C6, C7, C8)'],
    action: ['Extension du coude'],
  },

  'Triceps brachial, vaste médial': {
    what: `Le chef médial du triceps, profond, au-dessous du sillon du nerf
      radial.`,
    origin: ['Face postérieure de l’humérus, au-dessous du sillon radial'],
    insertion: ['Olécrâne'],
    nerve: ['Nerf radial (C6, C7, C8)'],
    action: ['Extension du coude'],
    note: `Le nerf radial passe entre le vaste latéral et le vaste médial, dans
      le sillon radial de l'humérus : une fracture de la diaphyse humérale le
      lèse et donne la main tombante.`,
  },

  'Rond pronateur': {
    what: `Le premier des épicondyliens médiaux, de l'épicondyle médial au
      milieu du radius. Il forme le bord médial du pli du coude.`,
    origin: ['Épicondyle médial de l’humérus et processus coronoïde de l’ulna'],
    insertion: ['Face latérale du radius, au tiers moyen'],
    nerve: ['Nerf médian (C6, C7)'],
    action: ['Pronation', 'Flexion du coude'],
    note: `Le nerf médian passe entre ses deux chefs : c'est le syndrome du rond
      pronateur, qui imite un canal carpien mais avec une atteinte plus haute.`,
  },

  'Fléchisseur radial du carpe': {
    what: `Un épicondylien médial dont le tendon est le repère du pouls radial :
      l'artère radiale est juste en dehors de lui.`,
    origin: ['Épicondyle médial de l’humérus'],
    insertion: ['Base du deuxième métacarpien'],
    nerve: ['Nerf médian (C6, C7)'],
    action: ['Flexion et abduction radiale du poignet'],
  },

  'Long palmaire': {
    what: `Un muscle grêle et inconstant — il manque chez une personne sur dix —
      dont le tendon se prolonge dans l'aponévrose palmaire.`,
    origin: ['Épicondyle médial de l’humérus'],
    insertion: ['Rétinaculum des fléchisseurs et aponévrose palmaire'],
    nerve: ['Nerf médian (C7, C8)'],
    action: ['Flexion faible du poignet', 'Tend l’aponévrose palmaire'],
    note: `Son absence n'a aucune conséquence, et c'est pour cela qu'on le
      prélève comme greffon tendineux. Il passe AU-DESSUS du rétinaculum, pas
      dans le canal carpien.`,
  },

  'Fléchisseur ulnaire du carpe': {
    what: `Le plus médial des fléchisseurs superficiels, le seul innervé par
      l'ulnaire.`,
    origin: ['Épicondyle médial de l’humérus et olécrâne'],
    insertion: ['Pisiforme, hamulus de l’hamatum et cinquième métacarpien'],
    nerve: ['Nerf ulnaire (C7, C8)'],
    action: ['Flexion et adduction ulnaire du poignet'],
    note: `Le nerf ulnaire passe entre ses deux chefs après avoir contourné
      l'épicondyle médial : c'est le deuxième site de compression de l'ulnaire
      après la gouttière épitrochléo-olécrânienne.`,
  },

  'Fléchisseur superficiel des doigts': {
    what: `Le plan intermédiaire de la loge antérieure : quatre tendons pour les
      quatre derniers doigts, qui se terminent sur les phalanges moyennes.`,
    origin: ['Épicondyle médial, processus coronoïde de l’ulna, bord antérieur du radius'],
    insertion: ['Phalanges moyennes des doigts deux à cinq, par deux languettes'],
    nerve: ['Nerf médian (C7, C8, T1)'],
    action: ['Flexion des articulations interphalangiennes proximales'],
    note: `Ses tendons se dédoublent pour laisser passer ceux du fléchisseur
      profond : c'est le chiasma tendineux de Camper.`,
  },

  'Fléchisseur profond des doigts': {
    what: `Le plan profond : ses tendons traversent ceux du superficiel et vont
      jusqu'aux phalanges distales.`,
    origin: ['Faces antérieure et médiale de l’ulna, membrane interosseuse'],
    insertion: ['Phalanges distales des doigts deux à cinq'],
    nerve: ['Nerf médian pour les doigts deux et trois, nerf ulnaire pour quatre et cinq'],
    action: ['Flexion des interphalangiennes distales'],
    note: `C'est le seul muscle du corps à avoir une double innervation partagée
      entre médian et ulnaire, ce qui explique que la griffe ulnaire n'atteigne
      que les deux derniers doigts.`,
  },

  'Carré pronateur': {
    what: `Un muscle plat et carré entre l'ulna et le radius, juste au-dessus du
      poignet. C'est le pronateur principal.`,
    origin: ['Quart distal de la face antérieure de l’ulna'],
    insertion: ['Quart distal de la face antérieure du radius'],
    nerve: ['Nerf interosseux antérieur, du médian (C8, T1)'],
    action: ['Pronation'],
  },

  'Extenseur des doigts': {
    what: `Le principal extenseur de la loge postérieure : quatre tendons qui
      forment le dossier des interosseux sur le dos des doigts.`,
    origin: ['Épicondyle latéral de l’humérus'],
    insertion: ['Appareil extenseur des doigts deux à cinq'],
    nerve: ['Nerf interosseux postérieur, du radial (C7, C8)'],
    action: ['Extension des doigts et du poignet'],
  },

  'Extenseur ulnaire du carpe': {
    what: `Le plus médial des épicondyliens latéraux, de l'épicondyle latéral au
      cinquième métacarpien.`,
    origin: ['Épicondyle latéral de l’humérus et bord postérieur de l’ulna'],
    insertion: ['Base du cinquième métacarpien'],
    nerve: ['Nerf interosseux postérieur, du radial (C7, C8)'],
    action: ['Extension et adduction ulnaire du poignet'],
    note: `Les épicondyliens latéraux sont les extenseurs : leur tendinite
      d'insertion est l'épicondylite, le tennis elbow. Les épicondyliens médiaux
      sont les fléchisseurs, et leur tendinite est l'épitrochléite, le golf
      elbow.`,
  },
};

// ---------------------------------------------------------------------------
// Les muscles du membre inférieur.

NOTES['muscles-inf'] = {
  'Grand psoas': {
    what: `Un long muscle fusiforme le long du rachis lombal, qui descend dans
      le bassin et passe sous le ligament inguinal pour gagner le fémur. Avec
      l'iliaque il forme l'ilio-psoas.`,
    origin: ['Corps et disques de T12 à L5, processus costiformes lombaux'],
    insertion: ['Petit trochanter du fémur'],
    nerve: ['Rameaux directs du plexus lombal (L1, L2, L3)'],
    action: ['Fléchisseur principal de la hanche', 'Fléchit le tronc sur le bassin'],
    near: ['Rein et uretère, en avant', 'Nerf fémoral, entre psoas et iliaque'],
    note: `Un abcès du psoas — tuberculeux, ou par contiguïté d'une appendicite
      rétro-cæcale — donne une hanche en flexion irréductible : le psoas
      irrité ne peut plus s'étendre.`,
  },

  Iliaque: {
    what: `Un muscle en éventail qui tapisse la fosse iliaque interne et rejoint
      le psoas sous le ligament inguinal.`,
    origin: ['Fosse iliaque interne de l’os coxal'],
    insertion: ['Petit trochanter du fémur, avec le psoas'],
    nerve: ['Nerf fémoral (L2, L3)'],
    action: ['Flexion de la hanche'],
  },

  'Grand fessier': {
    what: `Le muscle le plus volumineux du corps : une nappe épaisse qui va du
      bassin et du sacrum au fémur et au tractus ilio-tibial. C'est le muscle
      de la station debout et de la montée d'escalier.`,
    origin: ['Face glutéale de l’ilium, en arrière de la ligne glutéale postérieure',
      'Face postérieure du sacrum et du coccyx', 'Ligament sacro-tubéral'],
    insertion: ['Tubérosité glutéale du fémur', 'Tractus ilio-tibial'],
    nerve: ['Nerf glutéal inférieur (L5, S1, S2)'],
    action: ['Extension puissante de la hanche', 'Rotation latérale'],
    note: `L'injection intramusculaire se fait dans le quadrant supéro-externe de
      la fesse, parce que le nerf sciatique passe dans le quadrant
      inféro-interne.`,
  },

  'Moyen fessier': {
    what: `Un muscle en éventail sur la face glutéale de l'ilium, sous le grand
      fessier. C'est le stabilisateur du bassin pendant la marche.`,
    origin: ['Face glutéale de l’ilium, entre les lignes glutéales antérieure et postérieure'],
    insertion: ['Face latérale du grand trochanter'],
    nerve: ['Nerf glutéal supérieur (L4, L5, S1)'],
    action: ['Abduction de la hanche', 'Stabilise le bassin sur l’appui unipodal'],
    note: `Sa paralysie donne le signe de Trendelenburg : à l'appui sur la jambe
      atteinte, le bassin bascule du côté sain. Bilatérale, c'est la démarche en
      canard.`,
  },

  'Petit fessier': {
    what: `Le plus profond des fessiers, sous le moyen, avec la même action.`,
    origin: ['Face glutéale de l’ilium, entre les lignes glutéales antérieure et inférieure'],
    insertion: ['Bord antérieur du grand trochanter'],
    nerve: ['Nerf glutéal supérieur (L4, L5, S1)'],
    action: ['Abduction et rotation médiale de la hanche'],
  },

  Piriforme: {
    what: `Un muscle triangulaire qui part de la face pelvienne du sacrum et
      sort du bassin par le grand foramen ischiatique. C'est le repère de toute
      la région fessière profonde.`,
    origin: ['Face pelvienne du sacrum, autour des foramens sacrés antérieurs'],
    insertion: ['Bord supérieur du grand trochanter'],
    nerve: ['Rameaux du plexus sacral (S1, S2)'],
    action: ['Rotation latérale de la hanche', 'Abduction quand la hanche est fléchie'],
    near: ['Nerf sciatique, qui sort juste en dessous de lui'],
    note: `Tout ce qui sort du bassin dans la fesse se repère par rapport à lui :
      au-dessus le pédicule glutéal supérieur, au-dessous le sciatique, le
      pédicule glutéal inférieur et le pédicule pudendal. Le syndrome du
      piriforme est une sciatalgie par compression à ce niveau.`,
  },

  'Obturateur interne': {
    what: `Un muscle pelvien qui tapisse le foramen obturé de l'intérieur, sort
      par le petit foramen ischiatique et se coude à angle droit sur l'épine
      ischiatique.`,
    origin: ['Face interne de la membrane obturatrice et du pourtour du foramen obturé'],
    insertion: ['Fosse trochantérique du fémur'],
    nerve: ['Nerf de l’obturateur interne (L5, S1)'],
    action: ['Rotation latérale de la hanche'],
  },

  'Obturateur externe': {
    what: `Le pendant externe : il tapisse le foramen obturé par sa face
      superficielle et passe sous le col du fémur.`,
    origin: ['Face externe de la membrane obturatrice et du pourtour du foramen obturé'],
    insertion: ['Fosse trochantérique du fémur'],
    nerve: ['Nerf obturateur (L3, L4)'],
    action: ['Rotation latérale et adduction de la hanche'],
  },

  'Droit fémoral': {
    what: `Le seul chef du quadriceps qui soit bi-articulaire : il naît du
      bassin, donc il fléchit aussi la hanche.`,
    origin: ['Épine iliaque antéro-inférieure, et au-dessus de l’acétabulum'],
    insertion: ['Base de la patella, puis tubérosité tibiale par le ligament patellaire'],
    nerve: ['Nerf fémoral (L2, L3, L4)'],
    action: ['Extension du genou', 'Flexion de la hanche'],
  },

  'Vaste latéral': {
    what: `Le plus volumineux des quatre chefs du quadriceps, sur la face
      latérale de la cuisse.`,
    origin: ['Grand trochanter et lèvre latérale de la ligne âpre du fémur'],
    insertion: ['Patella, puis tubérosité tibiale'],
    nerve: ['Nerf fémoral (L2, L3, L4)'],
    action: ['Extension du genou'],
  },

  'Vaste médial': {
    what: `Le chef médial du quadriceps, dont les fibres basses sont presque
      horizontales et retiennent la patella en dedans.`,
    origin: ['Lèvre médiale de la ligne âpre du fémur'],
    insertion: ['Patella, puis tubérosité tibiale'],
    nerve: ['Nerf fémoral (L2, L3, L4)'],
    action: ['Extension du genou', 'Retient la patella contre sa luxation latérale'],
    note: `C'est le premier chef à s'amyotrophier après une immobilisation du
      genou, et son déficit favorise la luxation de la patella, qui se fait
      toujours en dehors.`,
  },

  'Vaste intermédiaire': {
    what: `Le chef profond du quadriceps, directement sur la face antérieure du
      fémur, sous le droit fémoral.`,
    origin: ['Faces antérieure et latérale du corps du fémur'],
    insertion: ['Patella, puis tubérosité tibiale'],
    nerve: ['Nerf fémoral (L2, L3, L4)'],
    action: ['Extension du genou'],
  },

  Sartorius: {
    what: `Le muscle le plus long du corps : un ruban qui descend en écharpe de
      l'épine iliaque antéro-supérieure à la face médiale du tibia.`,
    origin: ['Épine iliaque antéro-supérieure'],
    insertion: ['Face médiale du tibia, par la patte d’oie'],
    nerve: ['Nerf fémoral (L2, L3)'],
    action: ['Flexion, abduction et rotation latérale de la hanche', 'Flexion du genou'],
    note: `C'est le muscle du tailleur — il met la jambe en position croisée. La
      patte d'oie réunit ses tendons à ceux du gracile et du semi-tendineux ; sa
      bursite est une cause fréquente de douleur médiale du genou.`,
  },

  'Long adducteur': {
    what: `Le plus antérieur des adducteurs, du pubis à la ligne âpre. Son bord
      médial limite le triangle fémoral.`,
    origin: ['Face antérieure du corps du pubis, sous le tubercule pubien'],
    insertion: ['Tiers moyen de la lèvre médiale de la ligne âpre du fémur'],
    nerve: ['Nerf obturateur (L2, L3, L4)'],
    action: ['Adduction et flexion de la hanche'],
    note: `Le triangle fémoral de Scarpa est délimité par le ligament inguinal
      en haut, le sartorius en dehors et le long adducteur en dedans. Le
      pédicule fémoral y est : Nerf, Artère, Veine de dehors en dedans.`,
  },

  'Court adducteur': {
    what: `L'adducteur moyen, derrière le long adducteur et le pectiné.`,
    origin: ['Branche inférieure du pubis'],
    insertion: ['Tiers supérieur de la ligne âpre du fémur'],
    nerve: ['Nerf obturateur (L2, L3, L4)'],
    action: ['Adduction de la hanche'],
    note: `Le nerf obturateur se divise autour de lui en une branche antérieure
      et une branche postérieure.`,
  },

  'Grand adducteur': {
    what: `Le plus volumineux et le plus profond des adducteurs, en éventail du
      pubis et de l'ischium jusqu'au tubercule de l'adducteur. Il est à cheval
      sur deux loges.`,
    origin: ['Branche ischio-pubienne et tubérosité ischiatique'],
    insertion: ['Ligne âpre du fémur et tubercule de l’adducteur, sur l’épicondyle médial'],
    nerve: ['Nerf obturateur pour la partie adductrice, nerf tibial pour la partie ischio-jambière'],
    action: ['Adduction de la hanche', 'Extension, par sa portion ischio-condylaire'],
    relief: ['Hiatus de l’adducteur (anneau du grand adducteur), près de son insertion distale'],
    note: `L'hiatus de l'adducteur est par où l'artère fémorale passe de la
      cuisse au creux poplité et devient artère poplitée. C'est aussi le seul
      muscle à double innervation du membre inférieur.`,
  },

  Gracile: {
    what: `Le plus superficiel et le plus médial des adducteurs : un ruban mince
      du pubis à la patte d'oie. Il est bi-articulaire.`,
    origin: ['Branche inférieure du pubis'],
    insertion: ['Face médiale du tibia, par la patte d’oie'],
    nerve: ['Nerf obturateur (L2, L3)'],
    action: ['Adduction de la hanche', 'Flexion et rotation médiale du genou'],
    note: `Son caractère accessoire en fait un greffon de choix : on le prélève
      pour les transferts musculaires libres et les ligamentoplasties.`,
  },

  Pectiné: {
    what: `Un muscle quadrilatère entre le psoas et le long adducteur, du pecten
      du pubis au fémur. Il forme le plancher du triangle fémoral.`,
    origin: ['Pecten du pubis (crête pectinéale)'],
    insertion: ['Ligne pectinée du fémur, sous le petit trochanter'],
    nerve: ['Nerf fémoral, parfois aussi le nerf obturateur (L2, L3)'],
    action: ['Adduction et flexion de la hanche'],
  },

  'Biceps fémoral, longue portion': {
    what: `Le chef long du biceps fémoral, de la tubérosité ischiatique à la
      tête de la fibula. C'est un ischio-jambier vrai, bi-articulaire.`,
    origin: ['Tubérosité ischiatique'],
    insertion: ['Tête de la fibula'],
    nerve: ['Nerf tibial, du sciatique (L5, S1, S2)'],
    action: ['Extension de la hanche', 'Flexion et rotation latérale du genou'],
    note: `Il forme le bord supéro-latéral du creux poplité. Le nerf fibulaire
      commun longe son tendon avant de contourner le col de la fibula.`,
  },

  'Biceps fémoral, courte portion': {
    what: `Le chef court, qui naît du fémur et non de l'ischium : il n'est donc
      pas un ischio-jambier au sens strict, et il a une innervation différente.`,
    origin: ['Lèvre latérale de la ligne âpre du fémur'],
    insertion: ['Tête de la fibula, avec le chef long'],
    nerve: ['Nerf fibulaire commun, du sciatique (L5, S1, S2)'],
    action: ['Flexion et rotation latérale du genou'],
    note: `C'est le seul muscle de la loge postérieure innervé par le contingent
      fibulaire du sciatique : les autres le sont par le contingent tibial.`,
  },

  'Semi-tendineux': {
    what: `Un ischio-jambier médial dont le long tendon rejoint la patte d'oie.
      Son ventre est court et son tendon commence haut.`,
    origin: ['Tubérosité ischiatique'],
    insertion: ['Face médiale du tibia, par la patte d’oie'],
    nerve: ['Nerf tibial, du sciatique (L5, S1, S2)'],
    action: ['Extension de la hanche', 'Flexion et rotation médiale du genou'],
    note: `Son tendon, avec celui du gracile, est le greffon le plus utilisé
      pour reconstruire le ligament croisé antérieur : le DIDT.`,
  },

  'Semi-membraneux': {
    what: `L'ischio-jambier le plus profond et le plus puissant : sa partie haute
      est une large lame tendineuse, d'où son nom.`,
    origin: ['Tubérosité ischiatique'],
    insertion: ['Condyle médial du tibia, par un tendon trifurqué'],
    nerve: ['Nerf tibial, du sciatique (L5, S1, S2)'],
    action: ['Extension de la hanche', 'Flexion et rotation médiale du genou'],
    note: `Le kyste poplité, ou kyste de Baker, naît de la bourse située entre
      son tendon et le gastrocnémien médial.`,
  },

  'Tibial antérieur': {
    what: `Le muscle le plus médial et le plus superficiel de la loge antérieure
      de la jambe, contre la crête tibiale.`,
    origin: ['Condyle latéral et face latérale du tibia, membrane interosseuse'],
    insertion: ['Cunéiforme médial et base du premier métatarsien'],
    nerve: ['Nerf fibulaire profond (L4, L5)'],
    action: ['Flexion dorsale du pied', 'Inversion (supination)'],
    note: `Son déficit, par atteinte du nerf fibulaire, donne le pied tombant et
      la démarche en steppage. Il soutient aussi l'arche médiale.`,
  },

  'Long extenseur des orteils': {
    what: `Le muscle latéral de la loge antérieure, qui envoie quatre tendons
      aux quatre derniers orteils.`,
    origin: ['Condyle latéral du tibia, face médiale de la fibula, membrane interosseuse'],
    insertion: ['Phalanges moyennes et distales des orteils deux à cinq'],
    nerve: ['Nerf fibulaire profond (L5, S1)'],
    action: ['Extension des orteils', 'Flexion dorsale du pied'],
  },

  'Troisième fibulaire': {
    what: `Un petit muscle inconstant, détaché du long extenseur des orteils,
      qui va au cinquième métatarsien. Il est propre à l'espèce humaine.`,
    origin: ['Tiers inférieur de la face médiale de la fibula'],
    insertion: ['Base du cinquième métatarsien'],
    nerve: ['Nerf fibulaire profond (L5, S1)'],
    action: ['Flexion dorsale et éversion du pied'],
  },

  'Long fibulaire': {
    what: `Le plus superficiel et le plus long des fibulaires : son tendon
      contourne la malléole latérale, passe sous le cuboïde et traverse toute la
      plante du pied.`,
    origin: ['Tête et deux tiers supérieurs de la face latérale de la fibula'],
    insertion: ['Cunéiforme médial et base du premier métatarsien, par la plante'],
    nerve: ['Nerf fibulaire superficiel (L5, S1, S2)'],
    action: ['Éversion (pronation) du pied', 'Flexion plantaire',
      'Soutient la voûte transversale'],
    note: `C'est le seul tendon à traverser la plante du pied de dehors en
      dedans : il fait avec le tibial postérieur un étrier qui tient la voûte.`,
  },

  'Court fibulaire': {
    what: `Le fibulaire profond et court, dont le tendon se termine sur la
      tubérosité du cinquième métatarsien.`,
    origin: ['Deux tiers inférieurs de la face latérale de la fibula'],
    insertion: ['Tubérosité de la base du cinquième métatarsien'],
    nerve: ['Nerf fibulaire superficiel (L5, S1)'],
    action: ['Éversion du pied', 'Flexion plantaire'],
    note: `C'est lui qui arrache la tubérosité du cinquième métatarsien dans une
      entorse en varus — la fracture de Jones.`,
  },

  'Gastrocnémien médial': {
    what: `Le chef médial du jumeau interne, du condyle médial du fémur au
      tendon calcanéen. Il est bi-articulaire.`,
    origin: ['Face postérieure du condyle médial du fémur'],
    insertion: ['Tubérosité calcanéenne, par le tendon calcanéen'],
    nerve: ['Nerf tibial (S1, S2)'],
    action: ['Flexion plantaire du pied', 'Flexion du genou'],
    note: `Sa déchirure à la jonction myo-tendineuse est le tennis leg : une
      douleur brutale au mollet en pleine course, qui imite une phlébite.`,
  },

  'Gastrocnémien latéral': {
    what: `Le chef latéral, du condyle latéral du fémur. Les deux chefs forment
      les bords inférieurs du creux poplité.`,
    origin: ['Face postérieure du condyle latéral du fémur'],
    insertion: ['Tubérosité calcanéenne, par le tendon calcanéen'],
    nerve: ['Nerf tibial (S1, S2)'],
    action: ['Flexion plantaire du pied', 'Flexion du genou'],
  },

  Soléaire: {
    what: `Le muscle profond et large du mollet, sous les gastrocnémiens. Il est
      mono-articulaire : il ne passe pas le genou.`,
    origin: ['Tête et bord postérieur de la fibula, ligne du soléaire du tibia',
      'Arcade tendineuse du soléaire, entre les deux os'],
    insertion: ['Tubérosité calcanéenne, par le tendon calcanéen'],
    nerve: ['Nerf tibial (S1, S2)'],
    action: ['Flexion plantaire puissante', 'Muscle postural de la station debout'],
    note: `On l'appelle le cœur périphérique : sa contraction pendant la marche
      chasse le sang veineux vers le haut. Son immobilité est la raison pour
      laquelle l'alitement donne des thromboses veineuses.`,
  },

  'Tibial postérieur': {
    what: `Le muscle le plus profond de la loge postérieure, entre le tibia et
      la fibula. Son tendon contourne la malléole médiale.`,
    origin: ['Faces postérieures du tibia et de la fibula, membrane interosseuse'],
    insertion: ['Tubérosité de l’os naviculaire et les trois cunéiformes'],
    nerve: ['Nerf tibial (L4, L5)'],
    action: ['Inversion (supination) du pied', 'Flexion plantaire',
      'Soutient l’arche médiale'],
    note: `Sa défaillance est la cause la plus fréquente du pied plat acquis de
      l'adulte. Derrière la malléole médiale l'ordre est : Tibial postérieur,
      long Fléchisseur des orteils, Artère tibiale postérieure, Nerf tibial,
      long fléchisseur de l'Hallux.`,
  },

  'Long fléchisseur des orteils': {
    what: `Le fléchisseur profond des quatre derniers orteils, qui croise le
      tendon du long fléchisseur de l'hallux dans la plante.`,
    origin: ['Face postérieure du tibia, sous la ligne du soléaire'],
    insertion: ['Phalanges distales des orteils deux à cinq'],
    nerve: ['Nerf tibial (S1, S2)'],
    action: ['Flexion des orteils', 'Flexion plantaire et inversion du pied'],
  },
};

// Written as indented template literals so the file stays readable; the line
// breaks are the file's, not the sentence's.
const flat = (t) => (t ? t.replace(/\s+/g, ' ').trim() : t);

/** What is known about a structure, whichever side of the head it is on. */
export const noteFor = (bundle, name) => {
  const found = NOTES[bundle]?.[boneOf(name)];
  if (!found) return null;
  return { ...found, what: flat(found.what), note: flat(found.note) };
};

/** The headings, in the order a description is read. */
export const SECTIONS = [
  ['parts', 'Parties'],
  ['relief', 'Reliefs'],
  ['origin', 'Origine'],
  ['course', 'Trajet'],
  ['exit', 'Sortie du crâne'],
  ['insertion', 'Insertion'],
  ['nerve', 'Innervation'],
  ['action', 'Action'],
  ['branches', 'Branches'],
  ['tributaries', 'Affluents'],
  ['supplies', 'Territoire'],
  ['ends', 'Terminaison'],
  ['joints', 'Articulations'],
  ['muscles', 'Insertions musculaires'],
  ['through', 'Éléments qui le traversent'],
  ['near', 'Rapports'],
];

// ---------------------------------------------------------------------------
// Les muscles du cou.
//
// A muscle is read differently from a bone: what a student is asked is where
// it comes from, where it goes, what moves it and what it does. So the same
// file, different sections.

NOTES.cou = {
  // ------------------------------------------------------ superficiels
  Platysma: {
    what: `Muscle peaucier large et mince, tendu de la face au thorax dans le
      fascia superficiel, au-dessus du fascia cervical. C'est le seul muscle
      peaucier du cou.`,
    origin: ['Fascia du deltoïde et du grand pectoral, sous la clavicule'],
    insertion: ['Bord inférieur de la mandibule',
      'Peau de la joue et de la lèvre inférieure',
      'Modiolus, à l’angle de la bouche'],
    nerve: ['Rameau cervical du nerf facial (VII)'],
    action: ['Tend la peau du cou', 'Abaisse l’angle de la bouche et la lèvre inférieure'],
  },

  'Sterno-cléido-mastoïdien': {
    what: `Le muscle le plus visible du cou. Oblique en bas et en avant, il
      partage la région cervicale en un triangle antérieur et un triangle
      postérieur.`,
    origin: ['Chef sternal : face antérieure du manubrium',
      'Chef claviculaire : tiers médial de la clavicule'],
    insertion: ['Processus mastoïde du temporal',
      'Moitié latérale de la ligne nuchale supérieure'],
    nerve: ['Nerf accessoire (XI), moteur', 'Rameaux de C2 et C3, proprioceptifs'],
    action: ['D’un côté : incline la tête du même côté et la tourne du côté opposé',
      'Des deux côtés : fléchit le cou et étend la tête',
      'Inspirateur accessoire, point fixe sur la tête'],
    note: `Son bord postérieur limite le triangle postérieur. À son milieu
      émerge le plexus cervical superficiel, au point d'Erb.`,
  },

  'Trapèze, partie descendante': {
    what: `La partie supérieure du trapèze, qui descend de l'occipital et du
      ligament nuchal vers la clavicule et ferme le triangle postérieur en
      arrière.`,
    origin: ['Protubérance occipitale externe et ligne nuchale supérieure',
      'Ligament nuchal'],
    insertion: ['Tiers latéral du bord postérieur de la clavicule'],
    nerve: ['Nerf accessoire (XI)', 'Rameaux de C3 et C4'],
    action: ['Élève la ceinture scapulaire', 'Étend et incline la tête'],
  },

  // ------------------------------------------------------ sus-hyoïdiens
  'Digastrique, ventre antérieur': {
    what: `Le plus antérieur des sus-hyoïdiens. Il rejoint le tendon
      intermédiaire, qui coulisse dans une poulie fibreuse amarrée à l'os
      hyoïde.`,
    origin: ['Fosse digastrique de la mandibule'],
    insertion: ['Tendon intermédiaire, amarré à l’os hyoïde'],
    nerve: ['Nerf mylo-hyoïdien, branche du nerf alvéolaire inférieur (V3)'],
    action: ['Abaisse la mandibule', 'Élève l’os hyoïde'],
    note: `Les deux ventres n'ont pas la même innervation parce qu'ils ne
      viennent pas du même arc branchial : le premier pour l'antérieur, le
      deuxième pour le postérieur.`,
  },

  'Digastrique, ventre postérieur': {
    what: `Le second ventre du digastrique, tendu de la mastoïde au tendon
      intermédiaire. Il croise la carotide externe et le nerf hypoglosse.`,
    origin: ['Incisure mastoïdienne du temporal'],
    insertion: ['Tendon intermédiaire, amarré à l’os hyoïde'],
    nerve: ['Nerf facial (VII)'],
    action: ['Élève l’os hyoïde et le tire en arrière', 'Abaisse la mandibule'],
  },

  'Stylo-hyoïdien': {
    what: `Grêle, il accompagne le ventre postérieur du digastrique et se
      dédouble à son extrémité pour livrer passage au tendon intermédiaire.`,
    origin: ['Processus styloïde du temporal'],
    insertion: ['Corps de l’os hyoïde, près de la grande corne'],
    nerve: ['Nerf facial (VII)'],
    action: ['Élève l’os hyoïde et le tire en arrière'],
  },

  'Mylo-hyoïdien': {
    what: `Les deux muscles forment le plancher de la bouche, le diaphragme
      buccal, en se rejoignant sur un raphé médian.`,
    origin: ['Ligne mylo-hyoïdienne de la mandibule'],
    insertion: ['Raphé médian et corps de l’os hyoïde'],
    nerve: ['Nerf mylo-hyoïdien (V3)'],
    action: ['Élève le plancher buccal et la langue, premier temps de la déglutition',
      'Élève l’os hyoïde', 'Abaisse la mandibule, point fixe sur l’hyoïde'],
  },

  'Génio-hyoïdien': {
    what: `Au-dessus du mylo-hyoïdien, contre son homologue, dans l'épaisseur
      du plancher buccal.`,
    origin: ['Épine mentonnière inférieure de la mandibule'],
    insertion: ['Corps de l’os hyoïde'],
    nerve: ['Rameau de C1 emprunté au trajet du nerf hypoglosse (XII)'],
    action: ['Tire l’os hyoïde en haut et en avant', 'Élargit le pharynx pendant la déglutition'],
  },

  // ----------------------------------------------------- sous-hyoïdiens
  'Sterno-hyoïdien': {
    what: `Le plus superficiel et le plus médial des sous-hyoïdiens, en avant
      du larynx et de la thyroïde.`,
    origin: ['Face postérieure du manubrium et extrémité médiale de la clavicule'],
    insertion: ['Bord inférieur du corps de l’os hyoïde'],
    nerve: ['Anse cervicale (C1 à C3)'],
    action: ['Abaisse l’os hyoïde après la déglutition'],
  },

  'Sterno-thyroïdien': {
    what: `Sous le sterno-hyoïdien, plus large et plus court. Il est appliqué
      sur la glande thyroïde.`,
    origin: ['Face postérieure du manubrium'],
    insertion: ['Ligne oblique du cartilage thyroïde'],
    nerve: ['Anse cervicale (C1 à C3)'],
    action: ['Abaisse le larynx'],
  },

  'Thyro-hyoïdien': {
    what: `Court, il prolonge le sterno-thyroïdien au-dessus du cartilage
      thyroïde.`,
    origin: ['Ligne oblique du cartilage thyroïde'],
    insertion: ['Grande corne et corps de l’os hyoïde'],
    nerve: ['Rameau de C1 emprunté au trajet du nerf hypoglosse (XII)'],
    action: ['Abaisse l’os hyoïde', 'Élève le larynx quand l’hyoïde est fixé'],
  },

  'Omo-hyoïdien': {
    what: `Deux ventres réunis par un tendon intermédiaire que le fascia
      cervical moyen amarre à la clavicule. Son ventre inférieur traverse le
      triangle postérieur et le divise.`,
    origin: ['Ventre inférieur : bord supérieur de la scapula, près de l’incisure'],
    insertion: ['Ventre supérieur : bord inférieur du corps de l’os hyoïde'],
    nerve: ['Anse cervicale (C1 à C3)'],
    action: ['Abaisse et recule l’os hyoïde', 'Tend le fascia cervical moyen'],
  },

  // ----------------------------------------------------------- scalènes
  'Scalène antérieur': {
    what: `Le repère majeur de la base du cou. L'artère subclavière et le
      plexus brachial passent derrière lui, la veine subclavière devant.`,
    origin: ['Tubercules antérieurs des processus transverses de C3 à C6'],
    insertion: ['Tubercule du scalène antérieur, sur la première côte'],
    nerve: ['Rameaux antérieurs de C4 à C6'],
    action: ['Élève la première côte, inspirateur accessoire', 'Incline le cou du même côté'],
    near: ['En avant : veine subclavière, nerf phrénique sur sa face antérieure',
      'En arrière : artère subclavière et troncs du plexus brachial',
      'En dedans : dôme pleural'],
    note: `L'espace entre le scalène antérieur et le scalène moyen est le
      défilé des scalènes, siège du syndrome du défilé thoraco-brachial.`,
  },

  'Scalène moyen': {
    what: `Le plus volumineux des trois, en arrière du scalène antérieur dont
      il est séparé par le défilé.`,
    origin: ['Tubercules postérieurs des processus transverses de C2 à C7'],
    insertion: ['Face supérieure de la première côte, en arrière du sillon de l’artère subclavière'],
    nerve: ['Rameaux antérieurs de C3 à C8'],
    action: ['Élève la première côte', 'Incline le cou du même côté'],
  },

  'Scalène postérieur': {
    what: `Le plus petit et le plus profond, souvent confondu avec le scalène
      moyen.`,
    origin: ['Tubercules postérieurs des processus transverses de C4 à C6'],
    insertion: ['Face externe de la deuxième côte'],
    nerve: ['Rameaux antérieurs de C6 à C8'],
    action: ['Élève la deuxième côte', 'Incline le cou du même côté'],
  },

  // ------------------------------------------------------ prévertébraux
  'Long de la tête': {
    what: `Plaqué contre la face antérieure du rachis cervical, il monte des
      processus transverses à la base du crâne.`,
    origin: ['Tubercules antérieurs des processus transverses de C3 à C6'],
    insertion: ['Partie basilaire de l’occipital'],
    nerve: ['Rameaux antérieurs de C1 à C3'],
    action: ['Fléchit la tête sur le cou'],
  },

  'Long du cou, partie oblique supérieure': {
    what: `La plus haute des trois parties du long du cou, oblique en haut et
      en dedans.`,
    origin: ['Tubercules antérieurs des processus transverses de C3 à C5'],
    insertion: ['Tubercule antérieur de l’atlas'],
    nerve: ['Rameaux antérieurs de C2 à C6'],
    action: ['Fléchit le rachis cervical', 'Le tourne légèrement du côté opposé'],
  },

  'Long du cou, partie verticale': {
    what: `La partie médiane, tendue le long des corps vertébraux.`,
    origin: ['Corps de C5 à T3'],
    insertion: ['Corps de C2 à C4'],
    nerve: ['Rameaux antérieurs de C2 à C6'],
    action: ['Fléchit le rachis cervical'],
  },

  'Long du cou, partie oblique inférieure': {
    what: `La plus basse des trois, oblique en haut et en dehors.`,
    origin: ['Corps de T1 à T3'],
    insertion: ['Tubercules antérieurs des processus transverses de C5 et C6'],
    nerve: ['Rameaux antérieurs de C2 à C6'],
    action: ['Fléchit le rachis cervical', 'Le tourne légèrement du côté opposé'],
  },

  'Droit antérieur de la tête': {
    what: `Court muscle profond, en avant de l'articulation atlanto-occipitale.`,
    origin: ['Masse latérale de l’atlas'],
    insertion: ['Partie basilaire de l’occipital'],
    nerve: ['Rameaux antérieurs de C1 et C2'],
    action: ['Fléchit la tête sur l’atlas'],
  },

  'Droit latéral de la tête': {
    what: `Court et latéral, en dehors de l'articulation atlanto-occipitale.`,
    origin: ['Processus transverse de l’atlas'],
    insertion: ['Processus jugulaire de l’occipital'],
    nerve: ['Rameaux antérieurs de C1 et C2'],
    action: ['Incline la tête du même côté'],
  },

  // ----------------------------------------------------- sous-occipitaux
  'Grand droit postérieur de la tête': {
    what: `Le plus grand des quatre muscles sous-occipitaux, triangulaire, de
      l'axis à l'occipital.`,
    origin: ['Processus épineux de l’axis (C2)'],
    insertion: ['Partie latérale de la ligne nuchale inférieure'],
    nerve: ['Nerf sous-occipital, rameau postérieur de C1'],
    action: ['Étend la tête', 'La tourne du même côté'],
    note: `Avec le petit droit postérieur et les deux obliques, il limite le
      triangle sous-occipital, où cheminent l'artère vertébrale et le nerf
      sous-occipital.`,
  },

  'Petit droit postérieur de la tête': {
    what: `Le plus médial et le plus profond, de l'atlas à l'occipital.`,
    origin: ['Tubercule postérieur de l’atlas (C1)'],
    insertion: ['Partie médiale de la ligne nuchale inférieure'],
    nerve: ['Nerf sous-occipital (C1)'],
    action: ['Étend la tête'],
    note: `Il est relié à la dure-mère par le pont myodural, ce qui le met en
      cause dans certaines céphalées cervicogéniques.`,
  },

  'Oblique supérieur de la tête': {
    what: `Oblique en haut et en dedans, il ferme le triangle sous-occipital
      en dehors et en haut.`,
    origin: ['Processus transverse de l’atlas'],
    insertion: ['Occipital, entre les lignes nuchales supérieure et inférieure'],
    nerve: ['Nerf sous-occipital (C1)'],
    action: ['Étend la tête', 'L’incline du même côté'],
  },

  'Oblique inférieur de la tête': {
    what: `Tendu de l'axis à l'atlas, c'est le seul sous-occipital qui ne
      s'attache pas au crâne.`,
    origin: ['Processus épineux de l’axis'],
    insertion: ['Processus transverse de l’atlas'],
    nerve: ['Nerf sous-occipital (C1)'],
    action: ['Tourne l’atlas, et donc la tête, du même côté'],
  },

  // ------------------------------------------------------------ spinaux
  'Splénius de la tête': {
    what: `Large et plat, il recouvre les muscles profonds de la nuque comme
      un pansement — d'où son nom.`,
    origin: ['Moitié inférieure du ligament nuchal', 'Processus épineux de C7 à T3'],
    insertion: ['Processus mastoïde', 'Tiers latéral de la ligne nuchale supérieure'],
    nerve: ['Rameaux postérieurs des nerfs cervicaux moyens'],
    action: ['Étend la tête', 'L’incline et la tourne du même côté'],
  },

  'Splénius du cou': {
    what: `Plus bas et plus profond que le splénius de la tête, il se termine
      sur les vertèbres cervicales hautes.`,
    origin: ['Processus épineux de T3 à T6'],
    insertion: ['Tubercules postérieurs des processus transverses de C1 à C3'],
    nerve: ['Rameaux postérieurs des nerfs cervicaux inférieurs'],
    action: ['Étend le cou', 'Le tourne du même côté'],
  },

  'Semi-épineux de la tête': {
    what: `Épais et vertical, de part et d'autre de la ligne médiane, il est
      le principal extenseur de la tête.`,
    origin: ['Processus transverses de C7 à T6', 'Processus articulaires de C4 à C6'],
    insertion: ['Occipital, entre les lignes nuchales supérieure et inférieure'],
    nerve: ['Rameaux postérieurs des nerfs cervicaux'],
    action: ['Étend la tête', 'La tourne légèrement du côté opposé'],
    note: `Le nerf grand occipital (rameau postérieur de C2) le traverse pour
      devenir sous-cutané : c'est un point de compression classique.`,
  },

  // --------------------------------------------------------------- l'os
  'Os hyoïde': {
    what: `Os impair et médian en forme de fer à cheval, à hauteur de C3. Le
      seul os du corps qui ne s'articule avec aucun autre : il est suspendu
      par des muscles et des ligaments.`,
    parts: ['Corps', 'Grandes cornes', 'Petites cornes'],
    muscles: ['Au-dessus : mylo-hyoïdien, génio-hyoïdien, stylo-hyoïdien, digastrique',
      'Au-dessous : sterno-hyoïdien, thyro-hyoïdien, omo-hyoïdien',
      'Sur les cornes : hyoglosse, constricteur moyen du pharynx',
      'Ligament stylo-hyoïdien, sur la petite corne'],
    note: `Sa fracture est un signe médico-légal de strangulation. Il sert de
      point fixe mobile : les sus-hyoïdiens le tirent en haut, les
      sous-hyoïdiens le ramènent en bas.`,
  },
};

// ---------------------------------------------------------------------------
// Les muscles de la tête.
//
// Two groups that are easy to confuse and are examined on the difference:
// the masticators all take V3 and move the mandible, the peauciers all take
// VII and move the skin. The buccinator sits among the masticators and is a
// peaucier.

NOTES.tete = {
  // ------------------------------------------------------- masticateurs
  Temporal: {
    what: `Le plus étendu des masticateurs. En éventail dans la fosse
      temporale, il passe sous l'arcade zygomatique pour gagner la mandibule.`,
    origin: ['Fosse temporale, jusqu’à la ligne temporale inférieure',
      'Face profonde du fascia temporal'],
    insertion: ['Processus coronoïde et bord antérieur du ramus de la mandibule'],
    nerve: ['Nerfs temporaux profonds, du nerf mandibulaire (V3)'],
    action: ['Élève la mandibule, fermeture de la bouche',
      'Ses fibres postérieures, horizontales, la rétropulsent'],
  },

  'Masséter, partie superficielle': {
    what: `Le plus puissant des élévateurs, et le plus superficiel. Ses fibres
      descendent en bas et en arrière.`,
    origin: ['Deux tiers antérieurs du bord inférieur de l’arcade zygomatique'],
    insertion: ['Angle et face latérale du ramus de la mandibule'],
    nerve: ['Nerf massétérique (V3)'],
    action: ['Élève la mandibule', 'Légère propulsion'],
  },

  'Masséter, partie profonde': {
    what: `Sous la partie superficielle, ses fibres sont presque verticales.`,
    origin: ['Face médiale de l’arcade zygomatique'],
    insertion: ['Partie supérieure de la face latérale du ramus'],
    nerve: ['Nerf massétérique (V3)'],
    action: ['Élève la mandibule'],
    note: `Avec le ptérygoïdien médial il forme la sangle ptérygo-massétérine,
      qui prend l'angle de la mandibule entre ses deux faces.`,
  },

  'Ptérygoïdien médial': {
    what: `Le miroir profond du masséter : même direction, de l'autre côté du
      ramus.`,
    origin: ['Fosse ptérygoïdienne, face médiale de la lame latérale du processus ptérygoïde',
      'Tubérosité du maxillaire, par son faisceau superficiel'],
    insertion: ['Face médiale de l’angle de la mandibule'],
    nerve: ['Nerf ptérygoïdien médial (V3)'],
    action: ['Élève la mandibule', 'Diduction du côté opposé'],
  },

  'Ptérygoïdien latéral, chef supérieur': {
    what: `Le plus petit des deux chefs. Il ne va pas à l'os mais au disque de
      l'articulation temporo-mandibulaire.`,
    origin: ['Face infratemporale de la grande aile du sphénoïde'],
    insertion: ['Disque articulaire et capsule de l’articulation temporo-mandibulaire'],
    nerve: ['Nerf ptérygoïdien latéral (V3)'],
    action: ['Retient le disque pendant la fermeture'],
  },

  'Ptérygoïdien latéral, chef inférieur': {
    what: `Horizontal, il tire le condyle en avant. C'est le seul masticateur
      qui ouvre la bouche.`,
    origin: ['Face latérale de la lame latérale du processus ptérygoïde'],
    insertion: ['Fovéa ptérygoïdienne, sur le col du condyle mandibulaire'],
    nerve: ['Nerf ptérygoïdien latéral (V3)'],
    action: ['Propulse la mandibule et l’abaisse', 'Diduction du côté opposé'],
    note: `Les quatre masticateurs sont innervés par V3. L'ouverture de la
      bouche est l'affaire de ce chef et des muscles sus-hyoïdiens ; les trois
      autres masticateurs ne font que fermer.`,
  },

  // --------------------------------------------------------- le crâne
  'Muscle frontal': {
    what: `Le ventre antérieur de l'occipito-frontal. Il n'a pas d'attache
      osseuse en bas : il se termine dans la peau.`,
    origin: ['Aponévrose épicrânienne'],
    insertion: ['Peau des sourcils et de la racine du nez'],
    nerve: ['Rameau temporal du nerf facial (VII)'],
    action: ['Élève les sourcils', 'Plisse le front transversalement'],
  },

  'Muscle occipital': {
    what: `Le ventre postérieur de l'occipito-frontal.`,
    origin: ['Deux tiers latéraux de la ligne nuchale supérieure', 'Processus mastoïde'],
    insertion: ['Aponévrose épicrânienne'],
    nerve: ['Rameau auriculaire postérieur du nerf facial (VII)'],
    action: ['Tire l’aponévrose et le cuir chevelu en arrière'],
  },

  'Aponévrose épicrânienne': {
    what: `Lame fibreuse qui unit les ventres frontal et occipital et couvre la
      voûte. Elle est solidaire de la peau au-dessus et glisse sur le
      péricrâne au-dessous.`,
    note: `C'est le plan de clivage du scalp : le cuir chevelu se décolle en
      bloc dans le tissu conjonctif lâche sous-aponévrotique.`,
  },

  // ------------------------------------------------------- les paupières
  'Orbiculaire de l’œil, partie orbitaire': {
    what: `Le grand anneau extérieur, débordant sur le pourtour de l'orbite.`,
    origin: ['Partie nasale du frontal', 'Processus frontal du maxillaire',
      'Ligament palpébral médial'],
    insertion: ['Décrit un anneau complet et revient à son origine'],
    nerve: ['Rameaux temporal et zygomatique du nerf facial (VII)'],
    action: ['Fermeture forcée des paupières, comme contre le vent'],
  },

  'Orbiculaire de l’œil, partie palpébrale': {
    what: `L'anneau mince, dans l'épaisseur des paupières elles-mêmes.`,
    origin: ['Ligament palpébral médial'],
    insertion: ['Raphé palpébral latéral'],
    nerve: ['Rameaux temporal et zygomatique du nerf facial (VII)'],
    action: ['Clignement et fermeture douce des paupières'],
    note: `Sa paralysie, dans l'atteinte périphérique du VII, empêche la
      fermeture de l'œil : c'est le signe de Charles Bell.`,
  },

  'Corrugateur du sourcil': {
    what: `Petit muscle profond, sous l'orbiculaire et le frontal.`,
    origin: ['Extrémité médiale de l’arcade sourcilière'],
    insertion: ['Peau du sourcil, à sa partie moyenne'],
    nerve: ['Nerf facial (VII)'],
    action: ['Rapproche les sourcils', 'Creuse les rides verticales de la glabelle'],
  },

  Procérus: {
    what: `Petite lame verticale entre les deux sourcils, prolongeant le
      frontal vers le bas.`,
    origin: ['Fascia des os nasaux et du cartilage latéral'],
    insertion: ['Peau de la glabelle'],
    nerve: ['Nerf facial (VII)'],
    action: ['Abaisse la partie médiale du sourcil',
      'Plisse la racine du nez transversalement'],
  },

  // ----------------------------------------------------------- le nez
  'Muscle nasal': {
    what: `Deux parties de sens opposés : une partie transverse qui pince la
      narine et une partie alaire qui l'ouvre.`,
    origin: ['Maxillaire, au-dessus des incisives latérale et canine'],
    insertion: ['Partie transverse : aponévrose du dos du nez',
      'Partie alaire : cartilage alaire'],
    nerve: ['Nerf facial (VII)'],
    action: ['Partie transverse : comprime la narine',
      'Partie alaire : dilate la narine'],
  },

  'Abaisseur du septum nasal': {
    what: `Petit muscle entre la lèvre supérieure et le septum.`,
    origin: ['Maxillaire, au-dessus de l’incisive médiale'],
    insertion: ['Partie mobile du septum nasal'],
    nerve: ['Nerf facial (VII)'],
    action: ['Abaisse le septum et rétrécit la narine'],
  },

  // -------------------------------------------------------- les lèvres
  'Élévateur de la lèvre supérieure': {
    what: `Lame quadrangulaire descendant du rebord orbitaire à la lèvre.`,
    origin: ['Bord infra-orbitaire du maxillaire'],
    insertion: ['Peau et muscle de la lèvre supérieure'],
    nerve: ['Nerf facial (VII)'],
    action: ['Élève la lèvre supérieure'],
  },

  'Élévateur de la lèvre supérieure et de l’aile du nez': {
    what: `Le plus médial des élévateurs, le long du bord du nez.`,
    origin: ['Processus frontal du maxillaire'],
    insertion: ['Aile du nez et lèvre supérieure, par deux faisceaux'],
    nerve: ['Nerf facial (VII)'],
    action: ['Élève l’aile du nez et la lèvre supérieure', 'Creuse le sillon naso-labial'],
  },

  'Élévateur de l’angle de la bouche': {
    what: `Profond, sous l'élévateur de la lèvre supérieure.`,
    origin: ['Fosse canine du maxillaire, sous le foramen infra-orbitaire'],
    insertion: ['Modiolus, à l’angle de la bouche'],
    nerve: ['Nerf facial (VII)'],
    action: ['Élève l’angle de la bouche'],
  },

  'Grand zygomatique': {
    what: `Le muscle du sourire. Oblique en bas et en dedans, de la pommette à
      la commissure.`,
    origin: ['Face latérale de l’os zygomatique'],
    insertion: ['Modiolus, à l’angle de la bouche'],
    nerve: ['Rameaux zygomatique et buccal du nerf facial (VII)'],
    action: ['Tire l’angle de la bouche en haut et en dehors'],
  },

  'Petit zygomatique': {
    what: `En avant et en dedans du grand, il va à la lèvre et non à la
      commissure.`,
    origin: ['Face latérale de l’os zygomatique, en avant du grand zygomatique'],
    insertion: ['Lèvre supérieure'],
    nerve: ['Nerf facial (VII)'],
    action: ['Élève la lèvre supérieure'],
  },

  Risorius: {
    what: `Mince faisceau horizontal, inconstant, tendu vers la commissure.`,
    origin: ['Fascia parotidien et fascia massétérique'],
    insertion: ['Modiolus'],
    nerve: ['Nerf facial (VII)'],
    action: ['Tire l’angle de la bouche en dehors'],
  },

  Buccinateur: {
    what: `La paroi musculaire de la joue, entre le maxillaire et la mandibule.
      Il est plus profond que tous les autres peauciers.`,
    origin: ['Processus alvéolaires du maxillaire et de la mandibule, en regard des molaires',
      'Raphé ptérygo-mandibulaire, en arrière'],
    insertion: ['Modiolus et orbiculaire de la bouche'],
    nerve: ['Rameau buccal du nerf facial (VII)'],
    action: ['Applique la joue contre les dents pendant la mastication',
      'Chasse l’air de la bouche : le muscle du trompettiste'],
    note: `Il est traversé par le conduit parotidien en regard de la deuxième
      molaire supérieure. Malgré sa situation il est innervé par le VII et non
      par le V : c'est un peaucier, pas un masticateur.`,
  },

  'Orbiculaire de la bouche': {
    what: `L'anneau des lèvres. Il est fait pour une bonne part des fibres des
      muscles voisins qui viennent s'y entrecroiser.`,
    origin: ['Modiolus et fibres venues des muscles voisins'],
    insertion: ['Peau et muqueuse des lèvres'],
    nerve: ['Rameaux buccal et marginal de la mandibule du nerf facial (VII)'],
    action: ['Ferme les lèvres et les projette en avant'],
  },

  'Abaisseur de l’angle de la bouche': {
    what: `Triangulaire, du bord de la mandibule à la commissure.`,
    origin: ['Ligne oblique de la mandibule'],
    insertion: ['Modiolus'],
    nerve: ['Rameaux buccal et marginal du nerf facial (VII)'],
    action: ['Abaisse l’angle de la bouche'],
  },

  'Abaisseur de la lèvre inférieure': {
    what: `En avant et en dedans de l'abaisseur de l'angle, qui le recouvre en
      partie.`,
    origin: ['Ligne oblique de la mandibule, en avant du précédent'],
    insertion: ['Peau et muqueuse de la lèvre inférieure'],
    nerve: ['Rameau marginal de la mandibule du nerf facial (VII)'],
    action: ['Abaisse et évertit la lèvre inférieure'],
  },

  Mentonnier: {
    what: `Petit muscle conique, le plus profond du menton.`,
    origin: ['Fosse incisive de la mandibule'],
    insertion: ['Peau du menton'],
    nerve: ['Rameau marginal de la mandibule du nerf facial (VII)'],
    action: ['Élève et plisse la peau du menton', 'Projette la lèvre inférieure'],
  },

  Mandibule: {
    what: `L'os que les masticateurs déplacent, et sur lequel la moitié des
      peauciers s'attachent. Seul os mobile du crâne.`,
    muscles: ['Masséter sur la face latérale de l’angle',
      'Ptérygoïdien médial sur sa face médiale',
      'Temporal sur le processus coronoïde',
      'Ptérygoïdien latéral sur le col du condyle',
      'Abaisseurs et mentonnier sur le corps'],
    note: 'Sa description complète est dans le modèle « Le crâne ».',
  },
};

// ---------------------------------------------------------------------------
// Les nerfs crâniens.
//
// A nerve is read by where it starts, which hole it leaves the skull through,
// what it supplies and what its lesion looks like. The hole is why the skull
// model names the orifices: the two screens answer each other.

NOTES.nerfs = {
  'Nerf olfactif (I)': {
    what: `Sensoriel pur. Ce n'est pas un nerf mais une vingtaine de filets, et
      c'est le seul nerf crânien qui ne soit pas relié au tronc cérébral.`,
    origin: ['Cellules réceptrices de la muqueuse olfactive, au toit des fosses nasales'],
    exit: ['Foramens de la lame criblée de l’ethmoïde'],
    supplies: ['Odorat'],
    note: `Une fracture de l'étage antérieur cisaille les filets : anosmie, et
      souvent rhinorrhée cérébro-spinale avec elle.`,
  },

  'Nerf optique (II)': {
    what: `Sensoriel pur. C'est en réalité un faisceau du système nerveux
      central, entouré des trois méninges et non d'un épinèvre.`,
    origin: ['Cellules ganglionnaires de la rétine'],
    exit: ['Canal optique, avec l’artère ophtalmique'],
    supplies: ['Vision'],
    note: `Une lésion en avant du chiasma donne une cécité monoculaire ; au
      chiasma, une hémianopsie bitemporale ; en arrière, une hémianopsie
      latérale homonyme.`,
  },

  'Nerf oculomoteur (III)': {
    what: `Moteur et parasympathique. Il commande quatre des six muscles de
      l'œil, la paupière et la pupille.`,
    origin: ['Noyau de l’oculomoteur et noyau accessoire (Edinger-Westphal), dans le mésencéphale',
      'Émergence dans la fosse interpédonculaire'],
    exit: ['Fissure orbitaire supérieure'],
    supplies: ['Droits supérieur, médial et inférieur, et oblique inférieur',
      'Élévateur de la paupière supérieure',
      'Sphincter de la pupille et muscle ciliaire, par le ganglion ciliaire'],
    note: `Sa paralysie complète : ptosis, œil dévié en dehors et en bas,
      mydriase aréflexique. Les fibres pupillaires sont périphériques dans le
      nerf, donc une compression les touche en premier.`,
  },

  'Nerf trochléaire (IV)': {
    what: `Le plus grêle des nerfs crâniens, et le seul à sortir de la face
      postérieure du tronc cérébral.`,
    origin: ['Noyau du trochléaire, dans le mésencéphale',
      'Émergence en arrière, sous les colliculus inférieurs'],
    exit: ['Fissure orbitaire supérieure'],
    supplies: ['Muscle oblique supérieur'],
    note: `Diplopie verticale, majorée au regard en bas et en dedans : le
      patient incline la tête du côté sain pour descendre un escalier.`,
  },

  'Nerf trijumeau (V)': {
    what: `Le plus volumineux. Sensitif de toute la face et moteur des muscles
      masticateurs. Son ganglion, le ganglion trigéminal, est logé dans le cavum
      de Meckel sur la face antérieure du rocher.`,
    origin: ['Noyaux sensitifs étendus du mésencéphale au bulbe, et noyau moteur dans le pont',
      'Émergence sur la face latérale du pont'],
    exit: ['V1 par la fissure orbitaire supérieure',
      'V2 par le foramen rond', 'V3 par le foramen ovale'],
    supplies: ['Sensibilité de la face, des méninges, des sinus et des deux tiers antérieurs de la langue',
      'Muscles masticateurs, par V3 seulement'],
  },

  'Nerf ophtalmique (V1)': {
    what: `La branche supérieure, purement sensitive.`,
    origin: ['Ganglion trigéminal'],
    exit: ['Fissure orbitaire supérieure'],
    supplies: ['Front, paupière supérieure, cornée, dos du nez',
      'Branches lacrymale, frontale et naso-ciliaire'],
    note: `Le réflexe cornéen a V1 pour voie afférente et VII pour voie
      efférente : il teste les deux d'un coup.`,
  },

  'Nerf maxillaire (V2)': {
    what: `La branche moyenne, purement sensitive. Elle gagne la fosse
      ptérygo-palatine, puis l'orbite et la face par le canal infra-orbitaire.`,
    origin: ['Ganglion trigéminal'],
    exit: ['Foramen rond'],
    supplies: ['Paupière inférieure, aile du nez, joue, lèvre supérieure',
      'Dents supérieures, palais, sinus maxillaire'],
  },

  'Nerf mandibulaire (V3), division antérieure': {
    what: `La seule partie motrice du trijumeau, avec un rameau sensitif pour
      la joue.`,
    origin: ['Ganglion trigéminal, puis foramen ovale'],
    exit: ['Foramen ovale'],
    supplies: ['Temporal, masséter, ptérygoïdiens médial et latéral',
      'Nerf buccal, sensitif de la joue et de la muqueuse jugale'],
    note: `Le buccinateur, qui est dessous, n'est pas innervé par lui mais par
      le VII : c'est un peaucier.`,
  },

  'Nerf mandibulaire (V3), division postérieure': {
    what: `La partie sensitive de V3, qui donne les trois grands nerfs de
      l'étage inférieur de la face.`,
    origin: ['Ganglion trigéminal, puis foramen ovale'],
    exit: ['Foramen ovale'],
    supplies: ['Nerf alvéolaire inférieur : dents inférieures, puis menton par le foramen mentonnier',
      'Nerf lingual : sensibilité des deux tiers antérieurs de la langue',
      'Nerf auriculo-temporal : tempe, conduit auditif, articulation temporo-mandibulaire'],
    note: `La corde du tympan, branche du VII, rejoint le nerf lingual et lui
      apporte le goût et la sécrétion salivaire : deux nerfs dans un seul
      tronc.`,
  },

  'Nerf abducens (VI)': {
    what: `Moteur pur, pour un seul muscle. Son trajet intracrânien est le plus
      long de tous.`,
    origin: ['Noyau de l’abducens, dans le pont',
      'Émergence au sillon bulbo-pontique'],
    exit: ['Fissure orbitaire supérieure'],
    supplies: ['Muscle droit latéral'],
    note: `Sa longueur le rend vulnérable à toute hypertension intracrânienne :
      sa paralysie est un faux signe de localisation.`,
  },

  'Nerf facial (VII)': {
    what: `Moteur, sensoriel et parasympathique. Il traverse le rocher dans son
      propre canal avant de sortir et de se diviser dans la parotide.`,
    origin: ['Noyau moteur du facial, dans le pont',
      'Émergence à l’angle ponto-cérébelleux'],
    exit: ['Méat acoustique interne, puis canal facial, puis foramen stylo-mastoïdien'],
    supplies: ['Tous les muscles peauciers de la face',
      'Ventre postérieur du digastrique et stylo-hyoïdien',
      'Goût des deux tiers antérieurs de la langue, par la corde du tympan',
      'Glandes lacrymale, submandibulaire et sublinguale'],
    note: `Atteinte périphérique : toute l'hémiface est paralysée et l'œil ne
      ferme plus. Atteinte centrale : le front est épargné, parce que sa partie
      supérieure reçoit les deux hémisphères.`,
  },

  'Nerf vestibulo-cochléaire (VIII)': {
    what: `Sensoriel pur, deux nerfs en un : l'audition et l'équilibre.`,
    origin: ['Ganglion spiral pour la cochlée, ganglion vestibulaire pour le labyrinthe'],
    exit: ['Méat acoustique interne'],
    supplies: ['Audition, par la partie cochléaire',
      'Équilibre, par la partie vestibulaire'],
    note: `Le neurinome de l'acoustique naît de sa gaine dans le méat : surdité
      d'abord, puis compression du VII et du V à l'angle ponto-cérébelleux.`,
  },

  'Nerf glosso-pharyngien (IX)': {
    what: `Mixte. Un seul muscle, mais un vaste territoire sensitif et le
      contrôle de la pression artérielle.`,
    origin: ['Noyaux ambigu, salivaire inférieur et du tractus solitaire, dans le bulbe'],
    exit: ['Foramen jugulaire'],
    supplies: ['Muscle stylo-pharyngien',
      'Goût et sensibilité du tiers postérieur de la langue',
      'Sensibilité du pharynx, de l’oreille moyenne et de la trompe auditive',
      'Glande parotide',
      'Sinus et glomus carotidiens'],
    note: `Il est la voie afférente du réflexe nauséeux, dont le X est la voie
      efférente.`,
  },

  'Nerf vague (X)': {
    what: `Le plus étendu des nerfs crâniens : il descend dans le cou, traverse
      le thorax et gagne l'abdomen.`,
    origin: ['Noyaux ambigu, dorsal du vague et du tractus solitaire, dans le bulbe'],
    exit: ['Foramen jugulaire'],
    supplies: ['Muscles du voile du palais, du pharynx et du larynx',
      'Sensibilité du larynx et d’une partie du conduit auditif externe',
      'Parasympathique du cœur, des poumons et du tube digestif jusqu’à l’angle colique gauche'],
    note: `Le nerf laryngé récurrent gauche fait le tour de la crosse aortique
      avant de remonter : toute masse du médiastin peut le prendre, et la voix
      change avant tout le reste.`,
  },

  'Nerf accessoire (XI)': {
    what: `Moteur pur. Sa racine vient de la moelle cervicale, remonte par le
      foramen magnum et ressort aussitôt par le foramen jugulaire.`,
    origin: ['Racine spinale née de C1 à C5, qui entre par le foramen magnum'],
    exit: ['Foramen jugulaire'],
    supplies: ['Sterno-cléido-mastoïdien', 'Trapèze'],
    note: `Il est superficiel dans le triangle postérieur du cou : un curage
      ganglionnaire ou une biopsie l'y sectionne facilement, et l'épaule tombe.`,
  },

  'Nerf hypoglosse (XII)': {
    what: `Moteur pur. Il commande la langue, et rien d'autre — mais un rameau
      de C1 fait route avec lui pour gagner les muscles sous-hyoïdiens.`,
    origin: ['Noyau de l’hypoglosse, dans le bulbe',
      'Émergence dans le sillon pré-olivaire'],
    exit: ['Canal du nerf hypoglosse'],
    supplies: ['Tous les muscles de la langue sauf le palato-glosse, qui est au X'],
    note: `Sa paralysie fait dévier la langue du côté atteint quand le patient
      la tire : le génio-glosse sain pousse la langue vers le côté malade.`,
  },

  Mésencéphale: {
    what: `L'étage supérieur du tronc cérébral, entre le diencéphale et le
      pont.`,
    parts: ['Pédoncules cérébraux', 'Tegmentum', 'Tectum et colliculus',
      'Aqueduc du mésencéphale'],
    note: 'Le III et le IV en sortent.',
  },

  Pont: {
    what: `L'étage moyen, renflé en avant par les fibres transversales qui
      gagnent le cervelet.`,
    note: 'Le V, le VI, le VII et le VIII en sortent.',
  },

  'Bulbe rachidien': {
    what: `L'étage inférieur, entre le pont et la moelle spinale, dont il prend
      la suite au niveau du foramen magnum.`,
    parts: ['Pyramides', 'Olives', 'Sillons pré-olivaire et rétro-olivaire'],
    note: 'Le IX, le X, le XI et le XII en sortent.',
  },
};
