// DCEP1 — pharmacy, third year.
//
// Source: a standalone Drive, "UNEM-DCEP1" (12K5lpmyyWgVrUozCicVV16PZKSmKaeRE),
// shared "anyone with the link" rather than to this account directly — it
// does not show up in a Drive search, only by opening it (or its folders)
// by id, so every id below was read off the folder's own public listing
// page, one level at a time, rather than found by search.
//
// Its S1 is one folder per subject (ANALYSE, PARASITOLOGIE_MYCOLOGIE,
// PH MOOLECULAIRE, PH.GALENIQUE, PHARMACOLOGIE GENERAL). Its S2 is filed
// differently: a `CM` folder holding three subjects taught as cours
// magistraux (Bactériologie, ph.gnosie i.e. pharmacognosie, Virologie) —
// catalogued below — and a separate `CC` folder (`CC1`, `CC2`) that mixes
// pharmacologie fiches, a `chimie` folder, and digestive-pharmacology
// isolés/QCM under no subject heading either could confirm; it did not
// clearly belong to any S1 or S2 subject here and is left out of this pass.
//
// A few folders came back refused by a content-safety filter on this run
// (PH MOOLECULAIRE's `resume`, PARASITOLOGIE's `Diapo`) — their sibling
// folders (`isole`, `Cours`) were readable and are catalogued; those two are
// simply missing rather than deliberately excluded.
//
// `year` is the year in the file name; most files here carry no year at
// all, since the Drive is a single recent snapshot rather than an archive
// spanning several promos, unlike PCEP1's.

const P = 'PDF';
const X = 'PPTX';
const W = 'DOCX';

// ---------------------------------------------------------------------------
// S1
// ---------------------------------------------------------------------------

export const DCEP1_ANALYSE = {
  id: 'dcep1-analyse', promo: 'dcep1', semester: 'S1',
  name: 'CHIMIE ANALYTIQUE', icon: 'flask', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: "Chimie analytique et techniques d'analyse",
      lectures: [
        { n: 1, title: 'Chimie générale', ext: P, mb: '0', fid: '11ZH9AtnkljWsWBugueQSXtnHwHEvx6fJ' },
        { n: 2, title: 'Techniques de séparation', ext: P, mb: '0', fid: '1jph08y6RRKZjoIdpRhv_7jv2jgRoPH9y' },
        { n: 3, title: 'Chromatographie', ext: P, mb: '0', fid: '100hGUhmj55uGlZUNJqiNybA3IiRIGwKJ' },
        { n: 4, title: 'Méthodes spectroscopiques', ext: P, mb: '0', fid: '1ks4bDzDpJOil0Zx-BNgzIC9F5ALE_dH2' },
        { n: 5, title: 'Analyse fonctionnelle — les amines', ext: P, mb: '0', fid: '13-_EDkImg6hBHMxFiUWnsqlAQ3cV_4bA' },
        { n: 6, title: 'Nomenclature des hétérocycles', ext: P, mb: '0', fid: '1shG_oeOjHJTrFLTgGSklCPruJhTw_6i9' },
        { n: 7, title: 'Dénominations communes internationales (DCI)', ext: P, mb: '0', fid: '1x2aFuA3l6AXAicK0Iyln0CTITiwEdB75',
          versions: [
            { title: 'Dénomination', ext: P, mb: '0', fid: '14tardMaphMUmfwk6G8KmtqK_r6J8Jjbj' },
          ] },
      ],
    },
  ],

  // The `Td` folder's own `EXAM` subfolder was not opened (a folder inside a
  // folder inside a folder, past what this pass had room for); what is here
  // is everything filed directly under `Td`.
  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Polycopié de cours', ext: P, mb: '0', fid: '1akjGFC3NaN9KX99PQNyRHnPxIV9EYKK4' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD — filtration, exercice corrigé', ext: P, mb: '0', fid: '1twAA2TG4AIP_poJNvk4TCpz09AHZodds' },
        { title: 'Application', ext: P, mb: '0', fid: '1tG9dZrS4QSNV0fljrVvDYnBEKjqt9ezd' },
        { title: 'Application 2', ext: P, mb: '0', fid: '1GL24_U4DTk_RMA4FIhNaAGkVyLGMsgAG' },
        { title: 'Corrigé — les changements d’états', ext: P, mb: '0', fid: '1cecTPzSmY1t4aFxVLs2grCFzNFZiWnvl' },
        { title: 'Corrigé — exercices 07', ext: P, mb: '0', fid: '1LyK32bRxyau7iwOtgQwgwpJF8FUoCvkX' },
        { title: 'Les mélanges, la dissolution et la séparation des constituants', ext: P, mb: '0', fid: '1go_jbQHOu6ZKkwpF54fVGaptoSPs1rlD' },
        { title: 'Série d’exercices — extraction et séparation', ext: P, mb: '0', fid: '150vmyme_BsETJ51kDkmu04-XqQ0CsY8l' },
        { title: 'Série — hétérocycles', ext: P, mb: '0', fid: '14iuKxxWCZUhoxzSEHZkAsg9izW6lFUL_' },
        { title: 'TD — analyse', ext: P, mb: '0', fid: '1NfgDPEPD83DUwsJhUSyIlKayt3kTe4fA' },
      ],
    },
  ],
};

export const DCEP1_PARASITOLOGIE_MYCOLOGIE = {
  id: 'dcep1-parasitologie', promo: 'dcep1', semester: 'S1',
  name: 'PARASITOLOGIE-MYCOLOGIE', icon: 'micro', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Parasitologie',
      lectures: [
        { n: 1, title: 'Généralités', ext: P, mb: '0', year: 2024, fid: '14s-cViI3WcO0Th8jv0qcr216hiZ9MbX4' },
        { n: 2, title: 'Amibiase', ext: P, mb: '0', year: 2024, fid: '1CGiLGYTpFzCuUYrlzLMazGiDCQu12XnN' },
        { n: 3, title: 'Flagellés intestinaux et uro-génitaux', ext: P, mb: '0', fid: '1fXkwSjV4jfZnMJh1i2_vd1kSbu1C2uy_' },
        { n: 4, title: 'Flagellés sanguicoles', ext: P, mb: '0', fid: '14lm73_pOLeCmJICqvlEkuRnyRcVset_b' },
        { n: 5, title: 'Coccidies et coccidioses', ext: P, mb: '0', fid: '10B_PiuaoQfukNjj7sb4Fnf1ynM9Gw4SW' },
        { n: 6, title: 'Paludisme', ext: P, mb: '0', fid: '1iLvTDTAimEudP41jMdKTfDPUSAHa1cYf' },
        { n: 7, title: 'Toxoplasmose', ext: P, mb: '0', fid: '177pq2nv9FA0YUB6RBWqbPXHb7M1domYw' },
        { n: 8, title: 'Ascaris, oxyure et trichocéphale', ext: P, mb: '0', fid: '1diT4JxVf24N8YI3EgltLdqSvRwqkbm1W' },
        { n: 9, title: 'Anguillulose et ankylostomose', ext: P, mb: '0', fid: '1-wf7qhBcMzb09YnHhZ3EAbD5FSjDa5gf' },
        { n: 10, title: 'Syndrome de larva migrans', ext: P, mb: '0', fid: '1NfBz2vcTt4c4SDAf5xF2GxdToLjSITDF' },
        { n: 11, title: 'Douves et distomatoses', ext: P, mb: '0', fid: '1UXBJBXmFWcwwb1pAYSBjt0369LZlmo0n' },
        { n: 12, title: 'Échinococcoses', ext: P, mb: '0', fid: '1lr-8siXgyQOlLTL9dARqCSDVk_FIzFeh' },
        { n: 13, title: 'Filarioses', ext: P, mb: '0', fid: '19hb16rgXeYtHys6rFumcxXl7rwmadLGU' },
        { n: 14, title: 'Schistosomes et schistosomiases', ext: P, mb: '0', fid: '14FY2EGFMjzGSY9JerRuM2MuBPSbNKGZa' },
        { n: 15, title: 'Taenia et téniasis', ext: P, mb: '0', fid: '1lSGmtwacET3PKjnZEFuBSRp4_wHqVpR0' },
      ],
    },
    {
      title: 'Mycologie',
      lectures: [
        { n: 16, title: 'Candida et candidoses', ext: P, mb: '0', fid: '1yJeDYJcaRJLAtco2LYKEn5x_8R9okhWm',
          versions: [
            { title: 'Candida et candidoses — diapositives', ext: P, mb: '0', fid: '1O596d3CKDqrc9fJckZvJVfGjzwwLwW-_' },
          ] },
        { n: 17, title: 'Dermatophyties et dermatophytes', ext: P, mb: '0', fid: '1g9VVjY3FPnHzRtN-lQguS3w6JXLHdNB7' },
        { n: 18, title: 'Mycétomes et pneumocystose', ext: P, mb: '0', fid: '1h30AzGC_IRx-G1kIeRQLRV27JW17jXLU' },
        { n: 19, title: 'Pityriasis versicolor et Malassezia', ext: P, mb: '0', fid: '1r-_yGVMUuzuG5a64aWQ3VeKhiwhcRUs6' },
      ],
    },
    {
      title: 'Cryptogamie',
      lectures: [
        { n: 20, title: 'Généralités sur la cryptogamie', ext: P, mb: '0', fid: '1iiReGbqulcfhm71fcMlsSeEbBVefRj3m' },
        { n: 21, title: 'Champignons toxinogènes et mycotoxicoses', ext: P, mb: '0', fid: '12QCmiY6J0viKu701s8aSoDGGx17GH9vm' },
        { n: 22, title: 'Champignons toxiques et comestibles', ext: P, mb: '0', fid: '1_PYAaNXktz3WxWUtwSC8ErWVaUsV7DJf' },
        { n: 23, title: 'Aérocontamination en industrie pharmaceutique', ext: P, mb: '0', fid: '1CSQKhtM8TtExj3yY-_2s2-IwRoSVIUu-' },
      ],
    },
  ],

  sections: [
    {
      id: 'livres', where: 'archive', title: 'Livres', icon: 'book',
      items: [
        { title: 'Parasitoses et mycoses (Elsevier, 2019)', ext: P, mb: '0', fid: '1zdB-4LvwI-iZblXyGETHdHgPRtznjhrV' },
        { title: 'Manuel de la Société africaine de parasitologie', ext: P, mb: '0', fid: '1n9M48Mn1-GgRbq1l4AiTOIeN4PWxOFHu' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM', icon: 'quiz',
      items: [
        { title: 'Parasitoses — QCM', ext: P, mb: '0', fid: '1zftUvFuPpnPnX_dmveomQ1vVZP2-gQp-' },
        { title: 'QROC — mycologie', ext: P, mb: '0', fid: '1U_rFuI-jINwzC3GOimw_orcdRfz6q3bc' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen de parasitologie — 2025, session normale', ext: P, mb: '0', year: 2025, fid: '19TEm2jfvh-wJSTHyAJADqGRZMoKq8e-A' },
        { title: 'Examen de parasitologie — 2024', ext: P, mb: '0', year: 2024, fid: '16d8-fKjV9wSkDeDvjwVvr12KIjEExYlZ' },
        { title: 'Examen de parasitologie — 2025, rattrapage', ext: P, mb: '0', year: 2025, fid: '1CeB0nszcyaB_khOYtBJsE80qaTjafOLm' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolé de parasitologie — 2025', ext: P, mb: '0', year: 2025, fid: '1egCcX5v9ePEB1QiIWIvsDdWqHxal4BG9' },
        { title: 'Isolé de parasitologie, corrigé — 2024', ext: P, mb: '0', year: 2024, fid: '1_CeoOo-VpgdaylTf9jexxrzlAFfvLzuQ' },
        { title: 'Parasitologie — notes du Pr Chikha', ext: P, mb: '0', prof: 'Chikha', fid: '1u9zT8MfKQVdSQLloBcuEaYfRrdDkFqAC' },
      ],
    },
  ],
};

export const DCEP1_PHARMACOLOGIE_MOLECULAIRE = {
  id: 'dcep1-pharmaco-moleculaire', promo: 'dcep1', semester: 'S1',
  name: 'PHARMACOLOGIE MOLÉCULAIRE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pharmacologie moléculaire',
      lectures: [
        { n: 1, title: 'Introduction à la pharmacologie moléculaire', ext: P, mb: '0', year: 2020, fid: '19Uli4CXPOeJn1mW6ZRqH8_FBtUuD4cn8' },
        { n: 2, title: 'Les récepteurs', ext: P, mb: '0', year: 2024, fid: '1qqFykaESgOmhqNdPudeagUmFW2XVVzxn' },
        { n: 3, title: 'Pharmacométrie', ext: P, mb: '0', fid: '1VhhKrSQ9Ghh-CF62csKIpJSl0H9S1C1D' },
        { n: 4, title: 'Transmission cholinergique', ext: P, mb: '0', fid: '1JxgfDsX8wIoHQLYax4EiQctVyrU21T9O' },
        { n: 5, title: 'Transmission noradrénergique', ext: P, mb: '0', fid: '1jRxFpr0Z6WHyuWC9eTgITvAxj-O3NjiQ' },
        { n: 6, title: 'Neurotransmission sérotoninergique (5-HT)', ext: P, mb: '0', fid: '1PZZ1pUGQb3Z4Q2UpDhXCv2nCDZYFt_Qq' },
        { n: 7, title: 'Neurotransmission peptidergique (opioïdes)', ext: P, mb: '0', year: 2020, fid: '14EqmDd-H-SAxlktxVhkr5ZrvPzVePVwK' },
        { n: 8, title: 'Neurotransmission dopaminergique', ext: P, mb: '0', fid: '1-Ep9iVsZ3uj0S1Q3krGpWJZU1PbmCBJ0' },
        { n: 9, title: 'Les eicosanoïdes', ext: P, mb: '0', year: 2024, fid: '14y3JY5VgoauUk8WDtmyPv4RNYQFhncwr' },
        { n: 10, title: 'Neurotransmission histaminergique', ext: P, mb: '0', fid: '1iOzruvanf0FRIUh5C75jH1sgD4Uzy7sH' },
        { n: 11, title: 'La neurotransmission par les acides aminés', ext: P, mb: '0', year: 2020, fid: '1QvNQ6KWYJH-dNtTXIaxmKmeEKYhTE15R' },
      ],
    },
  ],

  // `resume` was refused by a content filter on this run and could not be
  // catalogued; `exam`'s own `eam` subfolder was not opened.
  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Support de cours de pharmacologie moléculaire — 2024', ext: P, mb: '0', year: 2024, fid: '15MnSV1grLX2qJLyleDTB45ekxjEhfeka' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'Correction — TD de pharmacométrie', ext: P, mb: '0', fid: '1A-o29Wso-7N7apx8VDTht6CPypdWV1wQ' },
        { title: 'Révision et correction — examen 2023', ext: P, mb: '0', year: 2023, fid: '1JcELR4UKIAzNG4-bUB3J6JtSbzAWt5aY' },
        { title: 'TD de pharmacologie', ext: P, mb: '0', fid: '1y6En6x4xAsQMHerGCig6qVoKmUi_Wc2Y',
          versions: [
            { title: 'TD de pharmacologie — diapositives', ext: X, mb: '0', fid: '1NtvfBuEzBgRCcw5yxPgFaviknvm2_68Y' },
          ] },
        { title: 'TD de pharmacométrie — 2023-2024', ext: P, mb: '0', year: 2024, fid: '1sKTcDzATQy-GUgTuKoPNAyRbcfSCB3RU' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolé — histaminergique', ext: P, mb: '0', fid: '1-gYe_AZZlSLbTOVBCfldcJWgai6WDFDO' },
        { title: 'Isolé — eicosanoïdes', ext: P, mb: '0', fid: '1e3igBlTSN15d62cGPNXmyOerY6o3r5sq' },
        { title: 'Isolé — acides aminés', ext: P, mb: '0', fid: '1JirzrSEUZ6_peiO1EW3EaIPp_8TM4Jkh' },
        { title: 'Isolé — cholinergique', ext: P, mb: '0', fid: '1MrOqwCsPiI-44WvZtrc4vlOsxZ7OI7RQ' },
        { title: 'Isolé — dopaminergique', ext: P, mb: '0', fid: '1P7cLwOkqf-lnrTfp_uA8JwwkcwYG_L_1' },
        { title: 'Isolé — noradrénergique', ext: P, mb: '0', fid: '1oFKtgamUFGfmuIm3ytiWyFxmhKkXdHHf' },
        { title: 'Isolé — peptidergique', ext: P, mb: '0', fid: '1iTnmL243Khr1aUPQ9PhCc7lAkwUfrBdX' },
        { title: 'Isolé — pharmacométrie', ext: P, mb: '0', fid: '1dwvm2qeHHromC2pxJpXMKZeB2FkqrP56' },
        { title: 'Isolé — récepteurs', ext: P, mb: '0', fid: '1bxdU8s5XfG2jKF4RgJzK9Cbln1dWCc7C' },
        { title: 'Isolé — sérotonine, correction', ext: P, mb: '0', fid: '1vItDheuJTlAH8_FiV5TDXqFwe7eVGrx0' },
        { title: 'Transmission par acides aminés — isolé', ext: P, mb: '0', fid: '1V3WgJ99sDedOmjjGV89RXLKFgiy2kKlz' },
      ],
    },
  ],
};

export const DCEP1_PHARMACIE_GALENIQUE = {
  id: 'dcep1-galenique', promo: 'dcep1', semester: 'S1',
  name: 'PHARMACIE GALÉNIQUE', icon: 'flask', tint: 'purple',
  professors: ['Limayem'],

  chapters: [
    {
      title: 'Pharmacie galénique',
      lectures: [
        { n: 1, title: 'Support de cours de galénique — 3ème année', ext: P, mb: '0', fid: '1byP2hgsm2ldn4kEMnKG9Jd0QgpkkRkKc',
          versions: [
            { title: 'Support de cours de galénique — 3ème année (autre copie)', ext: P, mb: '0', fid: '13JXcYUY4w9ngoCpE54JCzF0zvHvlUUiu' },
            { title: 'Support de cours de galénique — 3ème année', ext: W, mb: '0', fid: '1ZFmSgwCNNvPuxsh6Kz13-lKGsysa-hg7' },
            { title: 'Support de cours de galénique', ext: P, mb: '0', fid: '1CsVwYLD6kLQhrnLnGWJ8jQixteel9j1L' },
          ] },
      ],
    },
    {
      title: 'Formes et procédés pharmaceutiques',
      lectures: [
        { n: 2, title: 'Les comprimés', ext: P, mb: '0', fid: '1OOMBtIizWHDzTS6yRD4lug1y_3KwmpBU' },
        { n: 3, title: 'Stérilisation', ext: P, mb: '0', fid: '1OiUDJyndTck9xOtRyOjvMEN7rCVwPNJf' },
        { n: 4, title: 'Filtration', ext: P, mb: '0', fid: '11m3dWD6TstnCMF9uFbMtFdYSA4cOAGB_' },
        { n: 5, title: 'Les eaux à usage pharmaceutique — 2023', ext: P, mb: '0', year: 2023, fid: '1WQqm7EwBEjfQxbY4TQlt889kJBye6ttd' },
        { n: 6, title: 'La dissolution', ext: P, mb: '0', fid: '1LhRpZ68WB16MFEDHXVWDDUNKP9jMLk9j' },
        { n: 7, title: 'Les injectables', ext: P, mb: '0', fid: '1h1BID0_8mM7xf7TODjdc69khXAmlDttt' },
        { n: 8, title: 'Les préparations ophtalmiques', ext: P, mb: '0', fid: '1NtTqN-W4Wmi8r5Bbbrwj_FqKckj7mpa_' },
      ],
    },
  ],

  // `exam`'s own `Isolés` subfolder was not opened.
  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés — fiches', icon: 'file',
      items: [
        { title: 'Fiche — broyage', ext: P, mb: '0', fid: '1uLsI00qzTX4bxkz1GIJKvuiLYbA40PxQ' },
        { title: 'Fiche — dissolution', ext: P, mb: '0', fid: '1TDvDrheVy3Q1zNNTTzfOmh5m0M_fk-1O' },
        { title: 'Fiche — eaux à usage pharmaceutique', ext: P, mb: '0', fid: '1dlYT1l7D4VfrgcquOGwQoEp-SYwdejaq' },
        { title: 'Fiche — émulsions', ext: P, mb: '0', fid: '1y9hU0d301bOq-rxLSWMX_xCCtldxrh_n' },
        { title: 'Fiche — filtration', ext: P, mb: '0', fid: '1rdSxgCVaUFrEacHTVLHmPLy4mt3c-nih' },
        { title: 'Fiche — les capsules', ext: P, mb: '0', fid: '1oV5u7uzz3tqSNPZ7QesBzYApsJ3jYjN6' },
        { title: 'Fiche — les comprimés', ext: P, mb: '0', fid: '1Ea8rFwXIneiSGNIQu3NuVxdUqn0kfvHK' },
        { title: 'Fiche — mélange', ext: P, mb: '0', fid: '1Vm8SQHAc3ngeA1Zj2sClnW7ra4qv3S2i' },
        { title: 'Fiche — poudres à usage pharmaceutique', ext: P, mb: '0', fid: '1Qiu75rcuCQQnzcr2b7c9Xu2yWUZ4Yann' },
        { title: 'Fiche — préparations ophtalmiques', ext: P, mb: '0', fid: '1Bfw7jqb3GCkHe4OHh5aaGBcZL9ri5uMj' },
        { title: 'Fiche — préparations pour inhalation', ext: P, mb: '0', fid: '13IUcQUR5P2-ERE7zWJz6JZlb1-ZH-5D1' },
        { title: 'Fiche — préparations pour usage parentéral', ext: P, mb: '0', fid: '1DAj8Tg4DzzB_mneWR8_lOyLgQ3NWyHuv' },
        { title: 'Fiche — préparations pour voie cutanée', ext: P, mb: '0', fid: '10hMI44qYyGzIMCFHR40lROTZeR2gi9be' },
        { title: 'Fiche — préparations rectales', ext: P, mb: '0', fid: '1x___EFOS1VaJr5x5hUa6Z-ZT3gGQ9CeX' },
        { title: 'Fiche — stérilisation', ext: P, mb: '0', fid: '1nBtaRK_NQ5me676-E2llQ3YhfzjeZVyG' },
        { title: 'Fiche — suspensions', ext: P, mb: '0', fid: '111yoxDVXg4QT5YNuTeOVHi1rZDIQM5yv' },
        { title: 'Fiche — tensioactifs', ext: P, mb: '0', fid: '1BNHk-bTbPyC7Hs4RaOTpg7_9o1u3x7zm' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD1 — poudres à usage pharmaceutique', ext: P, mb: '0', fid: '113xOHCXZyNExzuTMWFQX2sQLgw2zk_Pm',
          versions: [{ title: 'TD1 — correction', ext: P, mb: '0', fid: '15b1Xc8zrMd6lFRu5rqls4th3Lvf5MfXH' }] },
        { title: 'TD2 — comprimés et capsules', ext: P, mb: '0', fid: '1XFpRr87kyiGWO0zmY0uOe6CwqPNrckrV',
          versions: [
            { title: 'TD2 — correction', ext: P, mb: '0', fid: '1gbQJcSmpaC7QOD36pSI-czEiElIZZffo' },
            { title: 'TD2 — correction, Pr Imane', ext: P, mb: '0', prof: 'Imane', fid: '1B6SJ2bkQy-hKYyPAa7n6Ocz5q30KO41i' },
          ] },
        { title: 'TD3 — partie du Dr Limayem', ext: P, mb: '0', prof: 'Limayem', fid: '1rOndqJ3tU2pxFNKpGRp_r2DtLP2mda_n',
          versions: [
            { title: 'TD3 — correction', ext: P, mb: '0', fid: '1MnKpOY52yRA1zVUTsLEcPDcviMVxC10R' },
            { title: 'TD3 — correction, Pr Imane', ext: P, mb: '0', prof: 'Imane', fid: '1VFMzeaiD49SqTn1CfgZWE9x93F-dHAK7' },
          ] },
        { title: 'TD4 — suppositoires, émulsions, pommades', ext: P, mb: '0', fid: '1KN9XkXSH1Z05Mg_Vy0tTAvcRquvZGvHb',
          versions: [{ title: 'TD4 — correction', ext: P, mb: '0', fid: '1bB5mUEMEXuGyqZzCGDf9gv2rJ5U1GWcU' }] },
        { title: 'Support des TD de galénique', ext: P, mb: '0', fid: '1NKflKCVT30DfzbJinnc9QxNKmbF4xKoL' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale de galénique', ext: P, mb: '0', prof: 'Imane', fid: '1nVrKno4c2KX3lJ_Q97DEt_lK3QV3kOtm',
          versions: [{ title: 'Annale de galénique, corrigée', ext: P, mb: '0', prof: 'Imane', fid: '1b5d5hvyOQrDHueHqQLP5QuFFygD06iS8' }] },
        { title: 'Correction des examens de galénique', ext: P, mb: '0', prof: 'Imane', fid: '1h7ilwIAzVEtTlHwqcYN5q2nDdC0UYnu' },
        { title: 'Correction — examen 2023-2024', ext: P, mb: '0', year: 2024, prof: 'Imane', fid: '1SN-j5pP2PcEyVOQcMFKQC5QvzJbVuIE5' },
        { title: 'Examen de galénique — 2025, rattrapage', ext: P, mb: '0', year: 2025, prof: 'Imane', fid: '11HcI8hzUcLLyKKV4og93dp5xypJnQico' },
        { title: 'Examen principal de galénique — 2024', ext: P, mb: '0', year: 2024, prof: 'Imane', fid: '1Vy2x4w7fvEs-oaOmjMGF9Ee-hJK3QLxh' },
        { title: 'Cours d’administration cutanée — Pr Yousf', ext: P, mb: '0', prof: 'Yousf', fid: '18aXtoDm11pRkIqdH1-zh1TbBPJ6jvUHO' },
        { title: 'Les poudres — Pr Yousf', ext: P, mb: '0', prof: 'Yousf', fid: '17a28k6w1EJ-1ij0GidhsSPHRuw7bIwn-' },
        { title: 'Le broyage — Pr Yousf', ext: P, mb: '0', prof: 'Yousf', fid: '1aQyf3rOjKgdPUQcIPqWGWvRw3eg9X5yq' },
        { title: 'Le mélange — Pr Yousf', ext: P, mb: '0', prof: 'Yousf', fid: '1m9kfWH-BkXRJy4_mSPtwEHotsRElxdof' },
        { title: 'Les capsules — Pr Yousf', ext: P, mb: '0', prof: 'Yousf', fid: '10gcemrDzoWa4ck3ZqXhT4JtqLsmlBgWW' },
        { title: 'Les suspensions — Pr Yousf', ext: P, mb: '0', prof: 'Yousf', fid: '1fNKU-C1Ad06QWSQeya3ilYvBdt9y3ayB' },
        { title: 'Les émulsions — Pr Yousf', ext: P, mb: '0', year: 2024, prof: 'Yousf', fid: '1RHrD-eWpu_ttSkzdXS3JIPiN6DP3goeN' },
        { title: 'Les tensioactifs — Pr Yousf', ext: P, mb: '0', year: 2022, prof: 'Yousf', fid: '1wK_PHE4JB-4sElC67mwptJj_bZoDx2z6' },
        { title: 'Préparations pour inhalation — Pr Yousf', ext: P, mb: '0', prof: 'Yousf', fid: '13Ej3FPH-7_GnASyWgcD2pEc7ivQrNkTP' },
        { title: 'Suppositoires — Pr Yousf', ext: P, mb: '0', prof: 'Yousf', fid: '12-vzmBJw-87pEgdoqDmFQWnWWeCpeS9X' },
      ],
    },
  ],
};

export const DCEP1_PHARMACOLOGIE_GENERALE = {
  id: 'dcep1-pharmaco-generale', promo: 'dcep1', semester: 'S1',
  name: 'PHARMACOLOGIE GÉNÉRALE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pharmacologie générale',
      lectures: [
        { n: 1, title: 'Généralités sur la conception des médicaments', ext: P, mb: '0', fid: '1-aP703KYrmSSHyPdbNIv1uYtl8equp_M' },
        { n: 2, title: 'Cours de pharmacologie — 2', ext: P, mb: '0', fid: '1ux4prYdtgrd1qAh1AkjQxm5agYWTFBnX' },
        { n: 3, title: 'Cours de pharmacologie — 3', ext: P, mb: '0', fid: '17O_zythsCa_KFoSGhGYJU5LnFrWmze9c' },
        { n: 4, title: 'Cours de pharmacologie — 4', ext: P, mb: '0', fid: '1o1-UrVjQUGGdLGTZBFnpd12Yc_LakzHD' },
        { n: 5, title: 'Cours de pharmacologie — 5', ext: P, mb: '0', fid: '1NkE_Ra9iXY3rJYkn7fsOIlyyRrGhHZfJ' },
        { n: 6, title: 'Cours de pharmacologie — 6', ext: P, mb: '0', fid: '1YXry4quRoDL6I7jgkH_WX9Ma9IViImvB' },
        { n: 7, title: 'Cours de pharmacologie — 7', ext: P, mb: '0', fid: '1hBH8xxFSAnL7gCgT6dsuoSE1NGULaWby' },
        { n: 8, title: 'Cours de pharmacologie — 8', ext: P, mb: '0', fid: '1ku3NdaO-mDn3i42GxBwy6-MRlNIJhlus' },
        { n: 9, title: 'Cours de pharmacologie — 9', ext: P, mb: '0', fid: '1Hi2EMxW6BZHWjzyyWtSBv3uVCVXxRytH' },
        { n: 10, title: 'Cours de pharmacologie — 11', ext: P, mb: '0', fid: '1boL4Wyp23eBxUeQVv2EQYFYOnQxFvcNJ' },
        { n: 11, title: 'Cours de pharmacologie — 12', ext: P, mb: '0', fid: '1ht557Ut-yZDr-gFpIhhNCxz71UvhTa0w' },
        { n: 12, title: 'Cours de pharmacologie — 13', ext: W, mb: '0', fid: '1biOy9B2X-Nay3sqe94PHGAqTWCUsrNQh' },
      ],
    },
  ],

  sections: [
    {
      id: 'livres', where: 'archive', title: 'Livres', icon: 'book',
      items: [
        { title: 'Les médicaments — Pierre Allain (Estem, 1996)', ext: P, mb: '0', fid: '1iK-Tub6G3FlRau6jviSlK0klOqTYpB7q' },
        { title: 'Bases fondamentales en pharmacologie — sciences du médicament (Elsevier Masson, 2014)', ext: P, mb: '0', fid: '1VPf9kNLHKYNjk_mCISEiqkMPZsIEJ53g' },
      ],
    },
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Bases fondamentales en pharmacologie', ext: P, mb: '0', fid: '1-j4fQ6dlM-Ys2J1xbcIDGGLv59N8xUF_' },
        { title: 'Généralités sur les médicaments', ext: P, mb: '0', fid: '1GGHON7K439QJKdJyfbIM5_LNewEYzFUj' },
        { title: 'Médicaments et méthodologie d’évaluation', ext: P, mb: '0', fid: '1jXKebBKJ7bMbKTk1o_XCkBnFXneXdRpq' },
        { title: 'Effets indésirables des médicaments', ext: P, mb: '0', fid: '1KcaTNK1kjWqAfiuWoP8t0srokO7J4Z_u' },
        { title: 'Les essais cliniques', ext: P, mb: '0', fid: '11ToKZ_JA2wgYwZ4dQ2LeUCw80wMRjIEB' },
        { title: 'Interaction médicamenteuse', ext: P, mb: '0', fid: '1zG_j4PBPbQ5iqf-Vc9wrtm3Bn0EVjfoU' },
        { title: 'La phase de distribution des médicaments', ext: P, mb: '0', fid: '12l4PoyjQac5_Njw0Iv9psLv-bi-90YD3' },
        { title: 'Mécanisme d’action des médicaments — de l’échelle moléculaire à la clinique', ext: P, mb: '0', fid: '1Qp8DKCPr49F5AKvQybykgcrcU11b4rDU' },
        { title: 'La phase de métabolisme', ext: P, mb: '0', fid: '1I-QY9PdYPRtdakP79z6n4GB_06jq0ETf' },
        { title: 'La phase d’excrétion des médicaments', ext: P, mb: '0', fid: '11oVncZDD0FDkwB8Uzd1delCCHufagOLu' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Collection de questions d’examens de pharmacologie', ext: P, mb: '0', fid: '1k_wydyGx8TPG6Ye2-kiyKAZDwT6jtniu' },
        { title: 'Correction du TD de pharmacologie', ext: X, mb: '0', fid: '11Ao-GM7_V1oxhdQAVnJ-XBOSbHjOBdOJ' },
        { title: 'Correction — TD pharmaco 2018-2019', ext: P, mb: '0', year: 2019, fid: '15Ktf84RcZxihJpWlv22RDSXtgo-_W13R' },
        { title: 'Examen de pharmacologie — 2021', ext: P, mb: '0', year: 2021, fid: '1KsVdpFYKeUWbXQyFOkFoRkg9l_IP60MK' },
        { title: 'Examen de pharmacologie — 2023', ext: P, mb: '0', year: 2023, fid: '1FtI301drEMWBIHy3E02NoROzILI0Ajdt' },
        { title: 'Examen de pharmacologie — février 2020', ext: P, mb: '0', year: 2020, fid: '1UikHF8gvch3dy6o5FTBy-YfETyVonHXe' },
        { title: 'Examen de pharmacologie', ext: P, mb: '0', fid: '11pZtWKZ00o3Hyk33r6zKUyCorUJDsJqA' },
        { title: 'Examens de pharmacologie — 2025', ext: P, mb: '0', year: 2025, fid: '1AHGpntf_dQWWOP9jLBoyHNbrMz8V6kNw' },
        { title: 'Pharmaco — 2024, session normale', ext: P, mb: '0', year: 2024, fid: '1r0KrFXEKP3kwR93iaxmjv-u-uq5lhnMe' },
        { title: 'Pharmaco 2022 — chapitres 1 à 3', ext: P, mb: '0', year: 2022, fid: '1cOmqxAM3k0OTyGokoRzgZUTrBLXwXR9i' },
        { title: 'QROC de pharmacologie', ext: P, mb: '0', fid: '1eAhCVTKBs5Cow3iIE8zKHIRCA-tFYyw9' },
      ],
    },
    {
      // A reference course on pharmacocinétique, distinct from Monastir —
      // filed the same way, under its own city heading.
      id: 'tunis', where: 'archive', title: 'Cours — Tunis', icon: 'book',
      items: [
        { title: 'Voies d’administration des médicaments', ext: P, mb: '0', year: 2020, fid: '1FWcgrAOYjALQwj1EmQGeW6tsGPwzpqjt' },
        { title: 'Absorption', ext: P, mb: '0', year: 2020, fid: '12TYNHR8bNpKY3I8KMyQPYzPwq780FBez' },
        { title: 'Distribution', ext: P, mb: '0', year: 2020, fid: '1ekYtlDahgW_5sBPI5NMWiPdv6nH_Sobo' },
        { title: 'Élimination', ext: P, mb: '0', year: 2020, fid: '1aHwL4DH3DKvzs9CgfmlfdTZqoW8q22by' },
        { title: 'Interprétation des données cinétiques', ext: P, mb: '0', year: 2020, fid: '1rMXh31bH8Rgtu8fAdxfgJ7xHnK_nUh8f' },
        { title: 'Métabolisme — partie 1', ext: P, mb: '0', year: 2024, fid: '1JEt4KBGBoNIJ59argXeJ0BqcEj-7h0pQ' },
        { title: 'Métabolisme — partie 2', ext: P, mb: '0', year: 2024, fid: '1860OZCgdrC5Pa-woD5TB_r7AJtEy32E5' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// S2 — the Drive's `CM` folder (cours magistraux)
// ---------------------------------------------------------------------------

export const DCEP1_BACTERIOLOGIE = {
  id: 'dcep1-bacteriologie', promo: 'dcep1', semester: 'S2',
  name: 'BACTÉRIOLOGIE', icon: 'micro', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Bactériologie générale et spéciale',
      lectures: [
        { n: 1, title: 'Généralités — 2024', ext: P, mb: '0', year: 2024, fid: '1yP1mqYljEI9zvlptl24z9PTXU8l75K4-',
          versions: [{ title: 'Généralités — diapositives', ext: P, mb: '0', year: 2024, fid: '1lX7CLsfOERtvrM2nMAtedww0wMqGnGtx' }] },
        { n: 2, title: 'Antibiotiques — 2024', ext: P, mb: '0', year: 2024, fid: '1f_qFXMtTiKZsUq5wE2Ij4lQ5O4oC4Z9y',
          versions: [{ title: 'Antibiotiques — diapositives', ext: P, mb: '0', year: 2024, fid: '1AB6jYx5os5XCmYdpguRpT54kZHJij-Y7' }] },
        { n: 3, title: 'Staphylocoques — 2023', ext: P, mb: '0', year: 2023, fid: '1Xj44G14ZcVtK-PaWSlOpCPWJbADb88Te',
          versions: [{ title: 'Staphylocoques — diapositives', ext: P, mb: '0', year: 2023, fid: '13Sdj4SUWs3Y4d8_5sxOhqXTKCgKpOGhA' }] },
        { n: 4, title: 'Streptocoques — 2025', ext: P, mb: '0', year: 2025, fid: '1ZNpntTQF7P0nShjKrxcMKgBJzeaO0mDQ',
          versions: [{ title: 'Streptocoques — diapositives', ext: P, mb: '0', year: 2025, fid: '115yxmcdeBPzU0nU1P-HNSsBx66QWlYpp' }] },
        { n: 5, title: 'Entérobactéries — 1, 2025', ext: P, mb: '0', year: 2025, fid: '1TmUFA_-5boerbjXuoeJFqI7a0LTtgA3L',
          versions: [{ title: 'Entérobactéries 1 — diapositives', ext: P, mb: '0', year: 2025, fid: '1AImqGGLgsM4C5Oep6eIGxNX4FadT2ya8' }] },
        { n: 6, title: 'Entérobactéries — 2, 2025', ext: P, mb: '0', year: 2025, fid: '16yFWQzjs_gSWWVno9Chfy4y299BkfERR',
          versions: [{ title: 'Entérobactéries 2 — diapositives', ext: P, mb: '0', year: 2025, fid: '1wlNxKe26G10DnkOia244m-7jfvJvb5ef' }] },
        { n: 7, title: 'Mycobactéries — 2025', ext: P, mb: '0', year: 2025, fid: '1c9vmXxm2l42FkVKHGQt9D4IO1qUqvto5',
          versions: [{ title: 'Mycobactéries — diapositives', ext: P, mb: '0', year: 2025, fid: '17eLZhB6ka-K80l7iErMoqMB0DJBYMPVh' }] },
        { n: 8, title: 'Spirochètes, chlamydia et mycoplasmes — 2025', ext: P, mb: '0', year: 2025, fid: '1n-MBuHTuK72IZsMbEika2JjgT1IHH_47',
          versions: [{ title: 'Spirochètes, chlamydia et mycoplasmes — diapositives', ext: P, mb: '0', year: 2025, fid: '19SrkWs8Iv5m-yruqpOAzdYuYmi66rn93' }] },
        { n: 9, title: 'Cas clinique — chlamydia', ext: P, mb: '0', fid: '1sfTd03Iylj2IWrV4RwtY88WtVZp85IBi',
          versions: [{ title: 'Cas clinique — chlamydia (autre copie)', ext: P, mb: '0', fid: '1MmMqeWU_l5-QWVc0v4WMUaPu3Psx9FwC' }] },
        { n: 10, title: 'Neisseriaceae — 2025', ext: P, mb: '0', year: 2025, fid: '1-tvsbKDsrQwVLvhS5PAu07UD7U7l9qxn',
          versions: [{ title: 'Neisseriaceae — diapositives', ext: P, mb: '0', year: 2025, fid: '1oaSyExPfMYEfA_Lviyzry66w-7RyBedD' }] },
        { n: 11, title: 'Caractères bactériologiques', ext: P, mb: '0', fid: '1b-O70RWkt-N3DdIYDB1pPcSJlB7jzc-z' },
        { n: 12, title: 'BGN hémophiles — 2025', ext: X, mb: '0', year: 2025, fid: '1xK8Dm0xA7K6-SrCidh_zC3dRxo3dzCzf' },
        { n: 13, title: 'Campylobacter, Helicobacter — 2025', ext: P, mb: '0', year: 2025, fid: '187jBRScS6HbP9sWAk7Uwv_wVUu3Eo3Fk' },
        { n: 14, title: 'BGP non sporulés — 2025', ext: P, mb: '0', year: 2025, fid: '1jfeSNtaN4iJTMmUQhmlLW7vn6R-2n6u3' },
        { n: 15, title: 'Anaérobies et charbon — 2025', ext: P, mb: '0', year: 2025, fid: '1cApCKkPygX8XxIW6FUiMnhBOs3Ek2QCC' },
      ],
    },
  ],

  sections: [
    {
      id: 'qcm', where: 'quiz', title: 'Cas cliniques et TD', icon: 'quiz',
      items: [
        { title: 'Examen cytobactériologique des urines', ext: P, mb: '0', fid: '1Xml1DXUHpCxkZs3jlrsP-sJXNBmO4aqA' },
        { title: 'Cas clinique — tuberculose', ext: P, mb: '0', fid: '1obgduuZsb9y9b_YQ_HOFOfRCFtf5E53U' },
        { title: 'Cas cliniques — TD 2025', ext: P, mb: '0', year: 2025, fid: '15tPqe9EaH-80Rkwx3RN2MHr6tasyNIUp' },
        { title: 'TD de bactériologie — 2024', ext: P, mb: '0', year: 2024, fid: '13H4fdEuBncbgUpIgMYFeXIZrlVnIjI34' },
        { title: 'TD de bactériologie', ext: P, mb: '0', fid: '1Pk3F_9U46LFUkZ7d3P5ftJkiCXGkmyAK',
          versions: [{ title: 'TD de bactériologie, correction — 2023', ext: P, mb: '0', year: 2023, fid: '1-FP2ANySy03awZww_b3XVWIXv4pRkMno' }] },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'QROC de bactériologie', ext: P, mb: '0', fid: '16pDCuGt1lskJKVYPV9aernoMFNH58aHb' },
        { title: 'Cas cliniques de bactériologie', ext: P, mb: '0', fid: '1pbf2hx08q7kq6oEmgzkVGWEqFIXECIOp' },
        { title: 'Bactériologie — 2024', ext: P, mb: '0', year: 2024, fid: '18uY-B5NKsr4nb80APxdoGjiKQzLgIpcv' },
        { title: 'Bactériologie — 2025, session normale', ext: P, mb: '0', year: 2025, fid: '1dmC-rnNt-j6uCtd0GBXJnP0a8nhlqbq5' },
        { title: 'Examen de bactériologie S2 — 2023', ext: P, mb: '0', year: 2023, fid: '1CtJenrChQXLtJMw1wFO83brYDGCWjt3c' },
        { title: 'Isolé de bactériologie', ext: P, mb: '0', fid: '1IHir0rrRv_HXpBbsutYF06lKd7TBeELr' },
        { title: 'Bactériologie — rattrapage', ext: P, mb: '0', fid: '1-VrQCQvlsTAeQTFkgtTySqv0fFTp5lcf' },
      ],
    },
  ],
};

export const DCEP1_PHARMACOGNOSIE = {
  id: 'dcep1-pharmacognosie', promo: 'dcep1', semester: 'S2',
  name: 'PHARMACOGNOSIE', icon: 'flask', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Pharmacognosie',
      lectures: [
        { n: 1, title: 'Support de cours de pharmacognosie — 3ème année, 2024-2025', ext: P, mb: '0', year: 2025, fid: '1BssOlCyledOL2alZJV7hfshBYBb7pUfa' },
      ],
    },
  ],

  // `Résumés`'s own `Résumés 2` subfolder was not opened.
  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Plantes', ext: P, mb: '0', fid: '1ejjDmxHbpsUtdvibg6LMDAV-tCuLaBbr' },
        { title: 'Résumé de pharmacognosie', ext: P, mb: '0', fid: '17GVfqjBH07vIdMVJFnTKNJR1xV41G4VB' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'TD', icon: 'quiz',
      items: [
        { title: 'Fascicule de TD de pharmacognosie', ext: P, mb: '0', fid: '1OLf2Z36rF1_yo3Djfvw6W1vlfm8curvH',
          versions: [{ title: 'TD de pharmacognosie, correction', ext: P, mb: '0', fid: '1HhvB8d5-yIsR4ZvdKSN2HDooWum5Fxp2' }] },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolé — coumarines', ext: P, mb: '0', fid: '1R0cRRHf93j5fx_P6AkHEHkmwBZKJkdge' },
        { title: 'Isolé — hétérosides cardiotoniques', ext: P, mb: '0', fid: '1WmFK9QUTE1dXiLYKT237QJBXZ1k1WPKd' },
        { title: 'Isolé — huiles essentielles', ext: P, mb: '0', fid: '1CHdx9JIy7x6OaVg73dIELhrbti3UkFn1' },
        { title: 'Isolé — flavonoïdes et tanins', ext: P, mb: '0', fid: '1HM5F5AEvP7Jm4seP8JIeA2DmWn4FkdS1' },
        { title: 'Isolé — anthocyanosides', ext: P, mb: '0', fid: '11ox13cJORiV-VxlmYhyrgCG8GeTFSk6i' },
        { title: 'Isolé — chapitre 1', ext: P, mb: '0', fid: '1Mmw6KgBhiUdnHEPxbb4VZzoaA5Mh8TZI' },
        { title: 'Isolé — chapitre 2', ext: P, mb: '0', fid: '1wcKXtFKvpzG7xJzx2CRF3oSvjPJdpRFn' },
        { title: 'Isolé de pharmacognosie', ext: P, mb: '0', fid: '1gGdYvzxS84gWWIhFX0Vpuxagv_m_5sxd' },
        { title: 'Isolé — hétérosides anthracéniques', ext: P, mb: '0', fid: '1-lRfb8qxeWmz95YT7aWWg4p6vETt3-sR' },
        { title: 'Révision — 3ème année', ext: P, mb: '0', fid: '1-zVyz1a_rD2aBf24ktCQf7u-aRUIOm13' },
        { title: 'Isolé — saponosides', ext: P, mb: '0', fid: '1QZSE8oi0ivnAMlUQLsvx0x349fOPyGgD' },
      ],
    },
    // Filed under FMPOS's own `Examens` heading in Drive but genuinely a
    // Faculté de Monastir paper trail, same convention as PCEP1's Monastir
    // sections.
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Introduction à la pharmacognosie', ext: P, mb: '0', fid: '1aSqox_2A_j__JVzjSiPL4Hcee_86gPO0' },
        { title: 'Les métabolites primaires', ext: P, mb: '0', fid: '18-LNThCdbKHIKlFdkYd5wPQX-KY309su' },
        { title: 'Les métabolites secondaires', ext: P, mb: '0', fid: '1O4S7HIy5Iwd6EuvroePuoOAvpW6lp1zt' },
        { title: 'Tanins', ext: P, mb: '0', fid: '1HrOF3CcBcq2CXJ9TjTDJ0d09UMGOyugn' },
        { title: 'Flavonoïdes', ext: P, mb: '0', fid: '1-wO-_lTvFYFQ3XOVISBeKwCYJFKb0-iV',
          versions: [{ title: 'Monographie des flavonoïdes', ext: P, mb: '0', fid: '15G-a6OcjoTOJJ_szamb9SSl-8A9558vp' }] },
        { title: 'Anthocyanosides', ext: P, mb: '0', fid: '1IQ_onyAZLoy0crVr0dDN8pyzLkYhwaC1' },
        { title: 'Coumarines', ext: P, mb: '0', fid: '1xXSkelTyU1bOHAfXJAzo_4a7j4R5K8gJ' },
        { title: 'Saponosides', ext: P, mb: '0', fid: '1NcMxSW8xTKyeTHN9s794ALCnd-fuWca6' },
        { title: 'Hétérosides cardiotoniques', ext: P, mb: '0', fid: '12pfyWXWsoPlmP4ddzirymORjqpiwDHoN' },
        { title: 'Huiles essentielles', ext: P, mb: '0', fid: '16rM_JuX6Iv4j157EGyu5EeRrLWuj3ZzU',
          versions: [{ title: 'Monographie des huiles essentielles', ext: P, mb: '0', fid: '1p59YumQDvD9Kpub9jUTqZ0TkXEgk1L_R' }] },
        { title: 'Oléorésines et baumes', ext: P, mb: '0', fid: '17pB5QrKPcwkyvfIJ04AhvT7KUrbepvui' },
        { title: 'Iridoïdes', ext: P, mb: '0', fid: '1gNFwyOadVhAvtPKuuJGDTNf3FKwgZmIp' },
        { title: 'Hétérosides anthracéniques', ext: P, mb: '0', fid: '1V6ddtz8AWlnxC3Mlu4Xbao5L183Q1yqw' },
        { title: 'Document — cours de pharmacognosie', ext: P, mb: '0', fid: '1dr_XrEaRm1m_v3GCwLvLlJSnL_AvrY-7' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale de pharmacognosie 3 — 2024-2025', ext: P, mb: '0', year: 2025, fid: '1xh38HxppkGaxu8k0RSt7mBvMld0TjKz5' },
        { title: 'Correcteur — examen de pharmacognosie, QROC', ext: P, mb: '0', fid: '1vpb57CaeQltVmDQBJuluyU-uPRTs47FM' },
        { title: 'Correction — examen de pharmacognosie, 3ème année, session janvier 2025', ext: P, mb: '0', year: 2025, fid: '1A4AXQt2tFkDPIZBVxeep0joeRureZhU0' },
        { title: 'Pharmacognosie principale — 2025', ext: P, mb: '0', year: 2025, fid: '1rJaDUygyvoW8iQPosECXj2Y5cOPqeFTY' },
        { title: 'TD de pharmacognosie, fascicule — Monastir', ext: P, mb: '0', fid: '1OLf2Z36rF1_yo3Djfvw6W1vlfm8curvH' },
      ],
    },
  ],
};

export const DCEP1_VIROLOGIE = {
  id: 'dcep1-virologie', promo: 'dcep1', semester: 'S2',
  name: 'VIROLOGIE', icon: 'shield', tint: 'orange',
  professors: [],

  // `Résumé`'s own subfolders (`Notes Resumé`, `Resumé Par Houda Cheibeta`)
  // were not opened; `resume 2025` stands in for the résumés section.
  chapters: [
    {
      title: 'Virologie générale et virus',
      subtitle: 'Diapositives — 2025',
      lectures: [
        { n: 1, title: 'Cours de virologie — 1', ext: P, mb: '0', year: 2025, fid: '1imvRjX_Dh1GmI2BKujL5eerKV11oZvwm' },
        { n: 2, title: 'Cours de virologie — 2', ext: P, mb: '0', year: 2025, fid: '17dTN4YZwhNWCAFwichDHAANSgtvhi9NQ' },
        { n: 3, title: 'Cours de virologie — 3', ext: P, mb: '0', year: 2025, fid: '1zyssVUdegOlEA7CBLsalU0ECg50MX_28',
          versions: [{ title: 'Suite du cours 2', ext: P, mb: '0', year: 2025, fid: '1tgewojPQVhT_XUluHnycWtNn-Ops_jX4' }] },
        { n: 4, title: 'Cours de virologie — 4', ext: P, mb: '0', year: 2025, fid: '1CEnZ8u5E_sqQI-iex2xeHVp6K-jvg0Ku' },
        { n: 5, title: 'Cours de virologie — 5', ext: P, mb: '0', year: 2025, fid: '1hdzmar21LT0GO1zOHrKfkFzFwuFFv8tG' },
        { n: 6, title: 'Les virus des hépatites', ext: P, mb: '0', year: 2025, fid: '16fgRzoINPGODor0fxYzDLM5IQIFGiV3B',
          versions: [{ title: 'Les virus des hépatites — 2024', ext: P, mb: '0', year: 2024, fid: '1aGXhUcYTw68n1jVk5Mvro8pGjZmuimdJ' }] },
        { n: 7, title: 'Orthomyxoviridae', ext: P, mb: '0', year: 2025, fid: '1iuC-89gb9GYJXKSWDBzyO3elYvrzSAVs' },
        { n: 8, title: 'Paramyxoviridae — 2024', ext: P, mb: '0', year: 2024, fid: '1Cfd4oflb27vmnTtUNkg4Dy_DanFjRM1v' },
        { n: 9, title: 'Picornaviridae — 2024', ext: P, mb: '0', year: 2024, fid: '1Pd_foC9c8hIZNo1-kSb7GPlv4nz9xMQh' },
        { n: 10, title: 'Rétrovirus — 2024', ext: P, mb: '0', year: 2024, fid: '1fAQOe7rVyzlYFe5LO1j_xk0llSny4j35' },
        { n: 11, title: 'Rhabdoviridae — 2024', ext: P, mb: '0', year: 2024, fid: '1lfK0JPG8JBe5D71bGXixGm60dDYhazMD' },
        { n: 12, title: 'Togaviridae — 2024', ext: P, mb: '0', year: 2024, fid: '1_4yHBhOIRGc0iAgQ5LZFYphbLkhHE3S-' },
        { n: 13, title: 'Méthodes de diagnostic en virologie — 2024', ext: P, mb: '0', year: 2024, fid: '1pS4o5eZv_DXQxE-s2LKV-O9bPKl_7tjF' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Herpesviridae', ext: P, mb: '0', fid: '1_6mCoJMBNaVQd8wka-SDpQmWlfk0xPuI' },
        { title: 'Méthodes de diagnostic en virologie', ext: P, mb: '0', fid: '1K09H-1zAafqT-6nUN0W5V3xFm_zjuniP' },
        { title: 'Orthomyxoviridae — polycopié', ext: P, mb: '0', fid: '19eX708SEpE2z1MKzNpQgu-fhjlrZwtoC' },
        { title: 'Pathogenèse des infections virales', ext: P, mb: '0', fid: '1EwDky45CjjECDy2CuOtWAoiFjPLhNYKV' },
        { title: 'Réplication virale', ext: P, mb: '0', fid: '1zsBj7Rzr5k176GP6KTXvmSwGOti8dP78' },
        { title: 'Structure et classification des virus', ext: P, mb: '0', fid: '1hOmG25u7JFt1C0XxeuwIQPuBunXZ8tnR' },
        { title: 'Le virus de l’hépatite B (VHB)', ext: P, mb: '0', fid: '1XPu9mj3ewVmOtNVsWo4y7fRA8sF8Jlem' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — orthomyxoviridae', ext: P, mb: '0', fid: '1sFezx7PDLt0fBYPuXHMxP6GbwVS-PWgX' },
        { title: 'Résumé — cours 1', ext: P, mb: '0', fid: '1x9GCcFlWcwyzBQGYxYib-pJqFW2t5uv1',
          versions: [{ title: 'Résumé — cours 1, avec Lbaraa', ext: P, mb: '0', fid: '1GLcEXPpXKVl--UrAgnaW4r-N6AtfZIQV' }] },
        { title: 'Résumé — cours 3', ext: P, mb: '0', fid: '1aRC1zNn0LadJYY862OGPtRYfwvNlew76',
          versions: [{ title: 'Résumé — cours 3', ext: P, mb: '0', fid: '1tYe_QudPBsYzkPmfSqyeVN4qvCGRUlD2' }] },
        { title: 'Résumé — cours 4', ext: P, mb: '0', fid: '1Hh70NFKXdZf1_yuswfXZoTlUD32MK_vP' },
        { title: 'Résumé — cours 5', ext: P, mb: '0', fid: '1jjKJ9kDD-___ECt3vxB1og1NmpVfXGDh',
          versions: [{ title: 'Résumé — cours 5 (autre copie)', ext: P, mb: '0', fid: '1I0AnrxYS9etk1ZrkqOF6MYP32--d4z7k' }] },
        { title: 'Résumé — cours 6', ext: P, mb: '0', fid: '1-qfFtuT1QAqPlNRbfC7FYgU6HWf1ytGR' },
        { title: 'Résumé — cours 6C', ext: P, mb: '0', fid: '1MZFsxH9Xqwm-d70Tn2rfG9Irn5DPaVMq' },
        { title: 'Résumé — cours 7', ext: P, mb: '0', fid: '1fQ34rT_RZO4pBm6bKWeuWtpAvzI5eHgU' },
        { title: 'Résumé — cours 7X', ext: P, mb: '0', fid: '1m7J_jrjbXdNfClXkt_3AFY3tUHMsBl7H' },
        { title: 'Résumé — réplication virale, avec Lbaraa', ext: P, mb: '0', fid: '17Em80CA397fXxPlKQBA07KFVqxfBfrav' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen de virologie — 2020, première session', ext: P, mb: '0', year: 2020, fid: '17b1QW1EzmL1iFpmxfyMklre-WZoYL_0o' },
        { title: 'Examen de virologie — 2021', ext: P, mb: '0', year: 2021, fid: '1yT5sqQGPJNrTZBML4lBpHGkhrUox83bL' },
        { title: 'Examen de virologie — 2022', ext: P, mb: '0', year: 2022, fid: '12_pd4gEbHP_QIcd6DziqeEQk4FvE9fSR' },
        { title: 'Examen de virologie — 2023, session normale', ext: P, mb: '0', year: 2023, fid: '12w3v8OM2GRdSkNlWa51Nnb-k5cQGmRyE' },
        { title: 'Virologie — 2024', ext: P, mb: '0', year: 2024, fid: '1oHS5QPc-UmPtSNcEL26AMp2dxeekbtj9' },
        { title: 'Virologie — 2025, session normale', ext: P, mb: '0', year: 2025, fid: '1V2mTW_dT9AjwLwiQ6DuAJywacS2a8hLF' },
        { title: 'Virologie — 2025, rattrapage', ext: P, mb: '0', year: 2025, fid: '1ObXJpYDPuxHo60cP5WK2vK-Z_HYz3XNi' },
        { title: 'Examens de virologie organisés', ext: P, mb: '0', fid: '1owoVzCYUCjPHDZyYL7JUvlHeQVJNj5PU' },
        { title: 'QCM — introduction à la virologie', ext: P, mb: '0', fid: '1TYABp5JxhlqzxPwYf3fYWm_ZnJazA4I4' },
        { title: 'QCM — réplication virale', ext: P, mb: '0', fid: '1BsacfGMSNWl88bdgM-3xzCpRscjBaZN2' },
        { title: 'Virology cases — MCQs, groupe 2', ext: P, mb: '0', fid: '1XMdAwNDcW4scUDU06tCOZ9p2RpRTB-82' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolé de virologie', ext: P, mb: '0', fid: '11NZN2TqGqgWHo-WSTjZK8WTHDs6Ri-9E' },
      ],
    },
  ],
};

export const DCEP1 = [
  DCEP1_ANALYSE,
  DCEP1_PARASITOLOGIE_MYCOLOGIE,
  DCEP1_PHARMACOLOGIE_MOLECULAIRE,
  DCEP1_PHARMACIE_GALENIQUE,
  DCEP1_PHARMACOLOGIE_GENERALE,
  DCEP1_BACTERIOLOGIE,
  DCEP1_PHARMACOGNOSIE,
  DCEP1_VIROLOGIE,
];
