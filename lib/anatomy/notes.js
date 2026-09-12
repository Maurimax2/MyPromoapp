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
  ['joints', 'Articulations'],
  ['muscles', 'Insertions musculaires'],
  ['through', 'Éléments qui le traversent'],
];
