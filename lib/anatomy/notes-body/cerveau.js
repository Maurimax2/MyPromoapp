// The deep brain from an MRI (scripts/carve-cerveau.mjs): what Z-Anatomy
// draws as one thalamus and one hypothalamus, divided into the nuclei that
// are taught. Written here in French; the structures the body already
// describes (noyau caudé, putamen, ventricules…) keep their descriptions.

export const BRAIN_NOTES = {
  'Noyau antérieur du thalamus': {
    what: 'Groupe antérieur du thalamus, sous le tubercule antérieur, entre les deux branches de la lame médullaire interne.',
    contents: ['Reçoit le faisceau mamillo-thalamique (du corps mamillaire)', 'Projette vers le gyrus cingulaire'],
    action: ['Relais du circuit de Papez : hippocampe → fornix → corps mamillaire → noyau antérieur → gyrus cingulaire → hippocampe. Mémoire épisodique'],
  },
  'Noyau dorso-médial du thalamus': {
    what: 'Le grand noyau du groupe médial, en dedans de la lame médullaire interne, le long du troisième ventricule.',
    contents: ['Connexions réciproques avec le cortex préfrontal', 'Afférences de l’amygdale, de l’hypothalamus et du pallidum ventral'],
    action: ['Humeur, motivation, fonctions exécutives et mémoire de travail'],
    note: 'Lésé des deux côtés (infarctus thalamique paramédian, syndrome de Korsakoff), il donne des troubles de la mémoire et un syndrome frontal.',
  },
  'Noyau centre-médian du thalamus': {
    what: 'Le plus grand des noyaux intralaminaires, enfermé dans la lame médullaire interne, au tiers postérieur du thalamus.',
    contents: ['Afférences de la formation réticulée, du pallidum interne et du cortex moteur', 'Projette surtout vers le striatum (putamen)'],
    action: ['Éveil et attention ; boucles motrices des noyaux gris centraux'],
  },
  'Noyau latéral dorsal du thalamus': {
    what: 'La partie la plus antérieure du groupe latéral, sur la face dorsale du thalamus, en arrière du noyau antérieur dont il prolonge les connexions.',
    contents: ['Connexions avec le gyrus cingulaire et le précunéus'],
    action: ['Système limbique, orientation dans l’espace'],
  },
  'Noyau latéral postérieur du thalamus': {
    what: 'Groupe latéral, partie dorsale, entre le noyau latéral dorsal en avant et le pulvinar en arrière.',
    contents: ['Connexions avec le lobule pariétal supérieur'],
    action: ['Intégration sensorielle d’association'],
  },
  'Pulvinar du thalamus': {
    what: 'La masse postérieure du thalamus, qui surplombe les corps géniculés et le mésencéphale.',
    contents: ['Afférences du colliculus supérieur et des aires visuelles', 'Connexions avec le cortex d’association pariéto-temporo-occipital'],
    action: ['Attention visuelle, intégration de la vision et du langage'],
  },
  'Noyau ventral antérieur du thalamus': {
    what: 'Le plus antérieur des noyaux ventraux du groupe latéral.',
    contents: ['Afférences du globus pallidus interne et de la substance noire réticulée', 'Projette vers le cortex prémoteur et préfrontal'],
    action: ['Relais moteur des noyaux gris centraux : préparation et choix du mouvement'],
  },
  'Noyau ventral latéral du thalamus': {
    what: 'Noyau ventral du groupe latéral, en arrière du ventral antérieur.',
    contents: ['Afférences du noyau dentelé du cervelet (controlatéral, par le pédoncule cérébelleux supérieur) et du pallidum interne', 'Projette vers le cortex moteur primaire et prémoteur'],
    action: ['Relais moteur du cervelet : coordination du mouvement'],
    note: 'Sa partie cérébelleuse (VIM) est la cible de la stimulation cérébrale profonde dans le tremblement essentiel.',
  },
  'Noyau ventral postéro-latéral du thalamus': {
    what: 'Noyau ventral postérieur, partie latérale : le relais de la sensibilité du corps.',
    contents: ['Lemnisque médial (tact fin, vibration, sens de la position)', 'Faisceau spino-thalamique (douleur, température)'],
    action: ['Projette vers le gyrus postcentral (aires 3, 1, 2), organisé en somatotopie : le membre inférieur en dehors'],
    note: 'Un infarctus de ce noyau donne une hémianesthésie controlatérale, parfois suivie de douleurs (syndrome thalamique de Dejerine-Roussy).',
  },
  'Noyau ventral postéro-médial du thalamus': {
    what: 'Noyau ventral postérieur, partie médiale : le relais de la sensibilité de la face et du goût.',
    contents: ['Lemnisque trigéminal (sensibilité de la face)', 'Fibres gustatives du noyau du tractus solitaire (sa partie parvocellulaire)'],
    action: ['Projette vers la partie inférieure du gyrus postcentral (la face) et vers l’insula (le goût)'],
  },
  'Lame médullaire interne du thalamus': {
    what: 'Lame de substance blanche en Y dans le thalamus, qui le divise en groupes antérieur (entre les branches du Y), médial et latéral.',
    contents: ['Les noyaux intralaminaires, dont le centre-médian'],
  },
  'Hypothalamus antérieur, partie supérieure': {
    what: 'Région antérieure de l’hypothalamus au-dessus du chiasma : aire préoptique et noyau paraventriculaire, autour de la partie antérieure du troisième ventricule.',
    contents: ['Noyau paraventriculaire : ocytocine et hormone antidiurétique (vers la neurohypophyse), CRH et TRH (vers l’éminence médiane)', 'Aire préoptique : thermorégulation (perte de chaleur), sommeil'],
  },
  'Hypothalamus antérieur, partie inférieure': {
    what: 'Région antérieure de l’hypothalamus au contact du chiasma optique.',
    contents: ['Noyau supra-optique : hormone antidiurétique et ocytocine, vers la neurohypophyse', 'Noyau supra-chiasmatique : horloge circadienne, réglée par la rétine'],
  },
  'Hypothalamus tubérien, partie supérieure': {
    what: 'Région moyenne de l’hypothalamus, au-dessus du tuber cinereum.',
    contents: ['Noyaux dorso-médial et ventro-médial'],
    action: ['Le noyau ventro-médial est le centre de la satiété : sa lésion fait manger sans fin'],
  },
  'Hypothalamus tubérien, partie inférieure': {
    what: 'Région moyenne et basse de l’hypothalamus : le tuber cinereum et l’éminence médiane, d’où part la tige pituitaire.',
    contents: ['Noyau arqué (infundibulaire) : hormones de libération et d’inhibition déversées dans le système porte hypothalamo-hypophysaire'],
    action: ['Commande l’adénohypophyse'],
  },
  'Hypothalamus postérieur': {
    what: 'Région postérieure de l’hypothalamus, au-dessus et en avant des corps mamillaires.',
    contents: ['Noyau postérieur'],
    action: ['Production de chaleur et éveil : sa lésion donne une hypothermie et une somnolence'],
  },
  'Corps mamillaire': {
    what: 'Petite saillie arrondie à la face inférieure de l’hypothalamus, en arrière du tuber cinereum, un de chaque côté.',
    contents: ['Reçoit le fornix, venu de l’hippocampe', 'Projette vers le noyau antérieur du thalamus (faisceau mamillo-thalamique) et vers le tegmentum mésencéphalique'],
    action: ['Mémoire : relais du circuit de Papez'],
    note: 'Ils s’atrophient dans le syndrome de Korsakoff (carence en vitamine B1, souvent alcoolique).',
  },
  'Faisceau mamillo-thalamique (de Vicq d’Azyr)': {
    what: 'Faisceau de fibres qui monte du corps mamillaire au noyau antérieur du thalamus.',
    action: ['Un maillon du circuit de Papez'],
  },
  'Noyau subthalamique (corps de Luys)': {
    what: 'Noyau en lentille sous le thalamus, au-dessus de la substance noire, en dedans de la capsule interne.',
    contents: ['Afférences du globus pallidus externe (voie indirecte) et du cortex moteur', 'Efférences excitatrices (glutamate) vers le globus pallidus interne et la substance noire réticulée'],
    action: ['Freine le mouvement : il renforce l’inhibition que les noyaux gris exercent sur le thalamus'],
    note: 'Sa lésion donne un hémiballisme du côté opposé. Il est la cible principale de la stimulation cérébrale profonde dans la maladie de Parkinson.',
  },
  'Substance noire (locus niger)': {
    what: 'Lame de substance grise du mésencéphale, entre le pied du pédoncule cérébral en avant et le tegmentum en arrière ; noire de neuromélanine.',
    parts: [
      'Partie compacte : neurones dopaminergiques, vers le striatum (voie nigro-striée)',
      'Partie réticulée : une sortie des noyaux gris centraux, vers le thalamus (ventral antérieur et latéral) et le colliculus supérieur',
    ],
    note: 'La perte des neurones de la partie compacte cause la maladie de Parkinson : akinésie, rigidité, tremblement de repos.',
  },
  'Globus pallidus externe': {
    what: 'Segment latéral du pallidum, en dedans du putamen dont le sépare la lame médullaire latérale.',
    contents: ['Afférences inhibitrices du striatum (voie indirecte)', 'Projette (GABA) vers le noyau subthalamique'],
    action: ['Un relais de la voie indirecte des noyaux gris centraux'],
  },
  'Globus pallidus interne': {
    what: 'Segment médial du pallidum, contre la capsule interne : la sortie principale des noyaux gris centraux.',
    contents: ['Afférences du striatum (voie directe) et du noyau subthalamique', 'Projette (GABA) vers le thalamus ventral antérieur et ventral latéral, par l’anse et le faisceau lenticulaires'],
    action: ['Inhibe le thalamus moteur ; la voie directe lève ce frein et permet le mouvement'],
    note: 'Cible de la pallidotomie et de la stimulation profonde dans la maladie de Parkinson et les dystonies.',
  },
  'Noyau accumbens': {
    what: 'Le striatum ventral : là où la tête du noyau caudé et le putamen se rejoignent sous la capsule interne, en avant.',
    contents: ['Afférences dopaminergiques de l’aire tegmentale ventrale', 'Afférences de l’amygdale, de l’hippocampe et du cortex préfrontal'],
    action: ['Circuit de la récompense et de la motivation ; impliqué dans les addictions'],
  },
  'Claustrum (avant-mur)': {
    what: 'Mince lame de substance grise sous le cortex de l’insula, entre la capsule externe (en dedans) et la capsule extrême (en dehors).',
    contents: ['Connexions réciproques avec presque tout le cortex'],
  },
  'Adénohypophyse': {
    what: 'Lobe antérieur de l’hypophyse, dans la selle turcique ; issu de la poche de Rathke (ectoderme du pharynx primitif).',
    contents: ['Sécrète l’hormone de croissance, la prolactine, l’ACTH, la TSH, la FSH et la LH'],
    vessels: ['Système porte hypothalamo-hypophysaire : le sang de l’éminence médiane lui apporte les hormones de commande'],
    near: ['Au-dessus : diaphragme sellaire et chiasma optique — un adénome qui monte comprime le chiasma (hémianopsie bitemporale)', 'De chaque côté : sinus caverneux'],
  },
  'Neurohypophyse': {
    what: 'Lobe postérieur de l’hypophyse : un prolongement du cerveau, fait des terminaisons des axones hypothalamiques.',
    contents: ['Axones des noyaux supra-optique et paraventriculaire (faisceau hypothalamo-hypophysaire)'],
    action: ['Libère dans le sang l’hormone antidiurétique et l’ocytocine'],
    note: 'Sa destruction, ou celle de la tige, donne un diabète insipide.',
  },
  'Tige pituitaire (infundibulum)': {
    what: 'Le pédicule qui relie l’hypothalamus (éminence médiane) à l’hypophyse, à travers le diaphragme sellaire.',
    contents: ['Faisceau hypothalamo-hypophysaire, vers la neurohypophyse', 'Vaisseaux portes, vers l’adénohypophyse'],
  },
  'Glande pinéale (épiphyse)': {
    what: 'Petite glande de l’épithalamus, au-dessus des colliculus supérieurs, en arrière du troisième ventricule.',
    action: ['Sécrète la mélatonine la nuit : rythme veille-sommeil'],
    note: 'Souvent calcifiée chez l’adulte : un repère médian sur les radiographies et le scanner.',
  },
  'Corne temporale du ventricule latéral': {
    what: 'La corne inférieure du ventricule latéral, qui descend en avant dans le lobe temporal.',
    near: ['Plancher et paroi médiale : hippocampe', 'Toit : queue du noyau caudé et substance blanche du lobe temporal', 'À son extrémité antérieure : corps amygdaloïde'],
  },
  'Bras du colliculus supérieur': {
    what: 'Cordon qui relie le tractus optique et le corps géniculé latéral au colliculus supérieur.',
    action: ['Voie des réflexes visuels : orientation des yeux et de la tête vers ce qui bouge'],
  },
  'Bras du colliculus inférieur': {
    what: 'Cordon qui relie le colliculus inférieur au corps géniculé médial.',
    action: ['Un maillon de la voie auditive, vers le cortex auditif'],
  },
  'Noyau dentelé du cervelet': {
    what: 'Le plus grand et le plus latéral des noyaux du cervelet, plissé comme une bourse, dans la substance blanche de l’hémisphère.',
    contents: ['Reçoit le cortex de l’hémisphère cérébelleux latéral', 'Projette par le pédoncule cérébelleux supérieur vers le noyau rouge et le thalamus ventral latéral du côté opposé'],
    action: ['Planification et coordination des mouvements volontaires'],
  },
  'Noyaux fastigial, globuleux et emboliforme': {
    what: 'Les autres noyaux du cervelet, en dedans du noyau dentelé.',
    parts: [
      'Noyau fastigial : le plus médial, sous le vermis ; vers les noyaux vestibulaires et la formation réticulée — équilibre',
      'Noyaux globuleux et emboliforme (noyau interposé) : reçoivent le paravermis ; vers le noyau rouge — coordination des membres',
    ],
  },
  'Cortex visuel primaire (aire striée)': {
    what: 'Aire 17 de Brodmann, sur les berges du sillon calcarin, à la face médiale du lobe occipital.',
    contents: ['Reçoit les radiations optiques du corps géniculé latéral', 'La strie de Gennari, visible à l’œil nu sur une coupe'],
    action: ['Chaque côté voit l’hémichamp visuel opposé ; la macula est représentée au pôle occipital'],
    note: 'La macula est souvent épargnée dans un infarctus de l’artère cérébrale postérieure : le pôle reçoit aussi de l’artère cérébrale moyenne.',
  },
  'Substance blanche de l’hémisphère cérébral': {
    what: 'Toute la substance blanche d’un hémisphère sous le cortex : le centre semi-ovale, la couronne rayonnante, les capsules.',
    parts: [
      'Fibres d’association : dans un hémisphère (faisceau arqué, cingulum…)',
      'Fibres commissurales : d’un hémisphère à l’autre (corps calleux, commissure antérieure)',
      'Fibres de projection : vers et depuis le tronc cérébral et la moelle, par la couronne rayonnante et la capsule interne',
    ],
    near: ['Capsule interne : entre le noyau caudé et le thalamus en dedans, le noyau lenticulaire en dehors — un infarctus lacunaire y donne une hémiplégie complète'],
  },
  'Substance blanche du cervelet': {
    what: 'L’« arbre de vie » (arbor vitae) : la substance blanche ramifiée de l’hémisphère cérébelleux, qui porte les lamelles du cortex.',
    contents: ['Les noyaux du cervelet (dentelé, globuleux, emboliforme, fastigial)', 'Les fibres des trois pédoncules cérébelleux'],
  },
};
