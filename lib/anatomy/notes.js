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
