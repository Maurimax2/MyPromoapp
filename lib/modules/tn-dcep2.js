// DCEP2 — pharmacy, fourth year: the Tunisian programme.
//
// The Faculté de pharmacie de Monastir's fourth year, as its students publish
// it on Pharmask (sites.google.com/view/pharmasktn › Externat › DCEP2). The
// page embeds one Drive folder, «4ème Année Pharmacie»
// (1fmQdxjlJEV4ttjrm6qrher2S6iqSvzsw), shared «anyone with the link» and read
// off each folder's public listing — metadata only, nothing in it touched.
// Sixty-one of its folders, most of CC2's and CC3's older editions, are not
// shared publicly and are absent; the year is thinner than the others.
//
// A student reads this year in FMPOS's programme (dcep2.js) or in this one,
// chosen on الدراسة. Same shape as tn-dcep3.js. The certificates are named by
// the faculty's own course codes, printed on every handout: MED.NEURO,
// MED.CARDIO (with pneumology), MED.INFECT, MED.ENDO.
//
// Every id starts `tn-` (lib/data.js, isTunisian).

const P = 'PDF';
const PT = 'PPT';
const X = 'PPTX';

// ---------------------------------------------------------------------------
// S1
// ---------------------------------------------------------------------------

export const TN_DCEP2_CC1 = {
  id: 'tn-dcep2-cc1', promo: 'dcep2', semester: 'S1',
  name: 'NEURO-PSYCHIATRIE (CC1)', icon: 'person', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Chimie thérapeutique',
      lectures: [
        { n: 1, title: 'Alzheimer', prof: 'Pr Raafa Ben Saada', ext: P, year: 2025, fid: '1vXhMoGBc4nXQYD5w_8LNxceggDfAvlLp' },
        { n: 2, title: 'Anesthesique 2021 PPT', prof: 'Pr Meriem Laaribi', ext: P, year: 2021, fid: '1FvxqFsPfKDFz0MMdhaaEkx_XLGWCz0kq' },
        { n: 3, title: 'Antidépresseurs', prof: 'Pr Meriem Laaribi', ext: P, year: 2025, fid: '1CybrQ5g-ET2YFtpfwnM4DLgDCzZEvEeD' },
        { n: 4, title: 'Les antiparkinsoniens', prof: 'Pr Olfa Gloulou', ext: P, year: 2025, fid: '1OTZYYHvCysqAxR6dPUIOVMKv18Tf2ebF' },
        { n: 5, title: 'Les anxiolytiques', prof: 'Pr Meriem Laaribi', ext: P, year: 2025, fid: '1xlisR567WHellUpI3QFhVv4t2WEXBfVe' },
        { n: 6, title: 'Médicaments antiépileptiques', prof: 'Pr Olfa Gloulou', ext: P, year: 2025, fid: '18uaq4rO2ov8v-5zoR0rt2TERE-LJKSUj' },
        { n: 7, title: 'Migraine', prof: 'Pr Raafa Ben Saada', ext: P, year: 2025, fid: '1gVFbydarcBwGk0RvcGkT6hWT2np5QtgD' },
        { n: 8, title: 'Neuroleptique', prof: 'Pr Olfa Gloulou', ext: P, year: 2025, fid: '1WJnL-4L21uGikgF39WK09lGOXxRh-eDa' },
      ],
    },
    {
      title: 'Pharmacologie',
      lectures: [
        { n: 9, title: 'Anesthésiques', prof: 'Pr Mohamed Amine EL Kaibi', ext: P, year: 2020, fid: '1sDekAHoTvmLF0VF4J_TqbQy9rw5H16ke' },
        { n: 10, title: 'Médicaments de la SEP', prof: 'Pr Mohamed Amine EL Kaibi', ext: P, year: 2019, fid: '17QOIMMxFW606LEiFcCQ96JB0vt2OozMx' },
        { n: 11, title: 'Antiépileptiques', prof: 'Pr Dorra Cherif', ext: P, year: 2026, fid: '1Xdehck5bNU18Uz-EIE6IyPRdW91kBMy9' },
        { n: 12, title: 'Antimigraineux', prof: 'Pr Mariem Lameri', ext: P, year: 2026, fid: '1-quV052cbTXMf3PKfbwViriungod58AH' },
        { n: 13, title: 'Diapos cours les antidépresseurs', prof: 'Pr Dorra Cherif', ext: P, year: 2026, fid: '1kpy2EspqhsAv-Z_euBG5FZjsIYyg-wI4' },
        { n: 14, title: 'Diapos cours les anxiolytiques', prof: 'Pr Dorra Cherif', ext: P, year: 2024, fid: '1ksSFda_IVZskmY5l-MS6wUiWivKNXMy0' },
        { n: 15, title: 'Diapos cours les Hypnotiques', prof: 'Pr Dorra Cherif', ext: P, year: 2026, fid: '1ktwPWaYzwyYjTpRRWix1E65elYS3xmWg' },
        { n: 16, title: 'La maladie d’Alzheimer', prof: 'Pr Rihab Ayadi', ext: P, year: 2026, fid: '1_ZjTSd0cHqLAg64wejVKfsGOyuf341vv' },
        { n: 17, title: 'Maladie de parkinson', prof: 'Pr Rihab Ayadi', ext: P, year: 2023, fid: '1_P3SWz86H2IHb30Id_WivD5xU6oaPpb1' },
      ],
    },
    {
      title: 'Sémiologie neurologique',
      lectures: [
        { n: 18, title: 'AVC i', ext: P, year: 2026, fid: '1AcJiKJnWWqjs6yqJSbH096T_7QrZe1Oi' },
        { n: 19, title: 'Les cephalees cours', ext: P, year: 2026, fid: '1AaZLdpBbt8GJMyUY2_3cDfif6doSPSLT' },
        { n: 20, title: 'Maladie de parkinson', ext: P, year: 2026, fid: '1OsuxczwioPuc1V81uca8E72moZo9jVcF' },
        { n: 21, title: 'Pharmacie-démence', ext: P, year: 2026, fid: '1h28aRCrEyLIVFLn1hERMinaAa9rfA6t_' },
      ],
    },
    {
      title: 'Sémiologie psychiatrique',
      lectures: [
        { n: 22, title: 'Les troubles de l’humeur', ext: P, year: 2026, fid: '1UGT6yLVxKrI_S3-17wYkdsCaGNEfpCU6' },
      ],
    },
    {
      title: 'Autres cours',
      lectures: [
        { n: 23, title: 'MED.NEURO-CC1 cours CC1 neuropsy 4A', ext: P, year: 2026, fid: '1Sm_4MfOhcjQ-7IL48DicHE3k90iauYUQ' },
      ],
    },
  ],

  sections: [
  ],
};

export const TN_DCEP2_CC4 = {
  id: 'tn-dcep2-cc4', promo: 'dcep2', semester: 'S1',
  name: 'ENDOCRINOLOGIE ET MÉTABOLISME (CC4)', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Endocrinologie et métabolisme',
      lectures: [
        { n: 1, title: 'MED.ENDO-CC4-IE02- support de cours CC4-4A', ext: P, year: 2026, fid: '1p4U4Er9atw-grG2SLNrZ7R_WclBiBUjF' },
      ],
    },
  ],

  sections: [
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Fascicule TP Biochimie CC4', ext: P, year: 2026, fid: '1b65HBIcBYmh2UEJTu_lNFJ5fDMqlkFSK' },
      ],
    },
  ],
};

export const TN_DCEP2_HEMATOLOGIE = {
  id: 'tn-dcep2-hematologie', promo: 'dcep2', semester: 'S1',
  name: 'HÉMATOLOGIE', icon: 'heart', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Hématologie',
      lectures: [
        { n: 1, title: 'Maladie de Willebrand et Hémophilie — diapositives', prof: 'Pr Inès Ghariani', ext: P, year: 2026, fid: '1WGwe2SA_rAgbqkXrmgy_xUbca1o954wH' },
        { n: 2, title: 'Pathologies de la coagulation — diapositives', prof: 'Pr Inès Ghariani', ext: P, year: 2026, fid: '1p9K-fIcX2SOLOMfEvY8LP8Yhd2WTWRB1' },
        { n: 3, title: 'Hemato-cm2-hematologie annee 2025-2026 modifié', ext: P, year: 2026, fid: '1Q7IJEG-2BqW3nqbCEnjxuqTcsrm9LXGW' },
        { n: 4, title: 'Ahai 2025 4aph', prof: 'Pr Manel Chaabene', ext: P, year: 2025, fid: '1raXA9Hxdbxx7B-MPDtN0q7WcPNkIWiVq' },
        { n: 5, title: 'Granulopoiese lymphopoiése', prof: 'Pr Amina Bouattay', ext: P, year: 2025, fid: '16J8TPVxdvqf6X4hRlXBLslqesmXjctuh' },
        { n: 6, title: 'Hyperlymphocytose', prof: 'Pr Amina Bouattay', ext: P, year: 2025, fid: '1SNjw8eo6ciNWs4oZvQCVribipUOeFLPD' },
        { n: 7, title: 'Les anémies (4A) part I et IIF', prof: 'Pr Sawsen Chouchene', ext: P, year: 2026, fid: '1b5Zb02OZr_9YK9HDxLdjrkNyQIgH-Oj0' },
        { n: 8, title: 'Les SMD cours', prof: 'Pr Mourad Chaari', ext: P, year: 2025, fid: '1C4zbTb9KEPlIp2FkTc6fqHScuA30YsQH' },
        { n: 9, title: 'Maladie Hémolytique du foetus et du NN', prof: 'Pr Manel Chaabene', ext: P, year: 2026, fid: '1sNERfnGiGwO7bPyApL2e7Z8iIo1vTzxl' },
        { n: 10, title: 'NMP version powerpoint', prof: 'Pr Hamida Jouini', ext: P, year: 2026, fid: '15YYaz6fFeEm9h6ZQZ3U-dhCyCM0aYdMj' },
        { n: 11, title: 'Pathologies de l’hémostase', prof: 'Pr Sonia Chouaieb', ext: P, year: 2026, fid: '1strq5O_8kmedhZ_ArQgCIkYHBh4h-mqQ' },
        { n: 12, title: 'Physiologie et Exploration de l’Hémostase', prof: 'Pr Mouna Sassi', ext: P, year: 2020, fid: '16nyCiHHRRY93UX78mUYNYrWmUx-oichK' },
        { n: 13, title: 'Pr jedidi', prof: 'Pr Inès Jedidi', ext: P, year: 2026, fid: '1UaOhduqLUgrBmfm7wDI5LPeBOkOMB1YJ' },
        { n: 14, title: 'Sécurité immunologique de la TS', prof: 'Pr Manel Chaabene', ext: P, year: 2026, fid: '1y3AkjH28Wr7nO9HxKQ7th9tvIHsmBx7f' },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Hémato resumé', ext: P, year: 2026, fid: '1KjH7v3pIudNheyx3GVUS9i93LNSCZNwB' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Fascicule TD Hématologie', ext: P, year: 2026, fid: '1Lk6VyIIeuDSJRvV4q8_Co_yFaq-1JCXA' },
      ],
    },
  ],
};

export const TN_DCEP2_GALENIQUE = {
  id: 'tn-dcep2-galenique', promo: 'dcep2', semester: 'S1',
  name: 'PHARMACIE GALÉNIQUE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pharmacie galénique',
      lectures: [
        { n: 1, title: 'Biodisponibilité-Bioéquivalence/2-Etude in Vitro', prof: 'Pr Imène Limayem', ext: P, year: 2020, fid: '1OZrLQRcuH-kli62aBkAtneoTkntRVccS' },
        { n: 2, title: 'Préparations d’Insuline', prof: 'Pr Marwa Tlijani', ext: P, year: 2020, fid: '1ZYG7Y3TJGxNerPiwpW9Vmpt-yKeqkWZs' },
        { n: 3, title: 'Préparations de Remplissage Vasculaire', prof: 'Pr Marwa Tlijani', ext: P, year: 2021, fid: '101N5uZTz2trwcw8rBH5LzNIf15y1hHKt' },
        { n: 4, title: 'Articles de Conditionnement', prof: 'Pr Marwa Tlijani', ext: P, year: 2021, fid: '1cAr5RtdhG0rLE6_cNLUeKJDTK03Luz2n' },
        { n: 5, title: 'PH.GAL-CM1- Support de cours galénique Validé', ext: P, year: 2026, fid: '198e9bS_lDqrBZKf6-gSgDN12TpENM9RJ' },
        { n: 6, title: 'Formes a liberation prolongee destinees a la voie oculaire', prof: 'Pr Imen Ben Jdidia', ext: P, year: 2025, fid: '1n-bQEf0PZIsY_7giI0WCfJHz2YNBPSlJ',
          versions: [
            { title: 'Formes a liberation prolongee destinees a la voie parenterale', prof: 'Pr Imen Ben Jdidia', ext: P, year: 2026, fid: '1zlLYAsb9ON209-ZIIbe5VUhG4RDHCfod' },
          ] },
        { n: 7, title: 'La fabrication des vaccins', prof: 'Pr Marwa Tlijani', ext: P, year: 2026, fid: '1f8_yG2PQMoV6SWHjpdhppDpiEY0qa2bt' },
        { n: 8, title: 'Les Dispositifs Transdermiques', prof: 'Pr Imen Ben Jdidia', ext: P, year: 2025, fid: '1bqf-JVyPPe1tdWNzFYCba8ZbiwWHpPG9' },
        { n: 9, title: 'Les formes à libération modifiée destinées à la voie orale', prof: 'Pr Emna Zribi', ext: P, year: 2026, fid: '1N5J94RWRcLgSdoKVLgVMWdhY3FWGgN4L' },
      ],
    },
  ],

  sections: [
  ],
};

export const TN_DCEP2_QUALITE_BIOLOGIE = {
  id: 'tn-dcep2-qualite-biologie', promo: 'dcep2', semester: 'S1',
  name: 'QUALITÉ EN BIOLOGIE CLINIQUE (OPTION)', icon: 'shield', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Pr Adem Ben Nasr',
      lectures: [
        { n: 1, title: 'GRB', prof: 'Pr Adem Ben Nasr', ext: PT, year: 2026, fid: '19mwSMQHwhOUp2bszoOJ2ygm1Z1M1ekZI' },
        { n: 2, title: 'Risque Chimique Labos', prof: 'Pr Adem Ben Nasr', ext: X, year: 2026, fid: '12_9EU_2c5ADhnJQW0NFbbfEK2l6NXCk9' },
      ],
    },
    {
      title: 'Pr Asma Ben Abdlbdaziz',
      lectures: [
        { n: 3, title: 'Evaluation de la qualité', prof: 'Pr Asma Ben Abdlbdaziz', ext: P, year: 2026, fid: '1JzN-ZL9eRe52fceP2j2UMA_8SFvhC1Ni' },
        { n: 4, title: 'Validation des méthodes', prof: 'Pr Asma Ben Abdlbdaziz', ext: P, year: 2026, fid: '1eHuXYx-4wbvgYgGFuZhegO-kQWN8yjw3' },
      ],
    },
    {
      title: 'Pr Hassen Bouzidi',
      lectures: [
        { n: 5, title: 'CIQ', prof: 'Pr Hassen Bouzidi', ext: P, year: 2026, fid: '1OzAWf3mjs_jE8UC11tgNNJyrV0C_d8CJ' },
        { n: 6, title: 'ISO15189', prof: 'Pr Hassen Bouzidi', ext: P, year: 2026, fid: '1oG28ThFqsxbZVZpTPxFoME7FaalnNfdQ' },
        { n: 7, title: 'Maintenance', prof: 'Pr Hassen Bouzidi', ext: P, year: 2026, fid: '1Dy-SX8ZSUpfUOB3sncMQaX41zWIgXgT6' },
        { n: 8, title: 'MEE systeme Q', prof: 'Pr Hassen Bouzidi', ext: P, year: 2026, fid: '1MWE00kcQ_FaixCaliz_Pe5kD9bIGXc70' },
        { n: 9, title: 'Principes géneraux', prof: 'Pr Hassen Bouzidi', ext: P, year: 2026, fid: '18tUnlHTpE9vuWEi-Z_zNbGFcvJehRJg-' },
        { n: 10, title: 'Reférentiels', prof: 'Pr Hassen Bouzidi', ext: P, year: 2026, fid: '15WRbWpJ3EMomHT0UdFPtx5SlSgS0WbFv' },
      ],
    },
    {
      title: 'Pr Nabila Ben Rajab',
      lectures: [
        { n: 11, title: 'La biologie clinique', prof: 'Pr Nabila Ben Rajab', ext: P, year: 2026, fid: '1wBcOxepukSI4eAidADA96q2UboSw2dk5' },
        { n: 12, title: 'Stucture documentaire', prof: 'Pr Nabila Ben Rajab', ext: P, year: 2026, fid: '1Cdn5FhSJlKz5k7TB6e773U6oxNr_VSoR' },
      ],
    },
    {
      title: 'Pr Rim Dabboubi',
      lectures: [
        { n: 13, title: 'Exigences techniques', prof: 'Pr Rim Dabboubi', ext: P, year: 2026, fid: '1CVak3mkZmwMSqXzJxMTDp4HMd0CyAk7_' },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annales Qualité en Biologie', ext: P, year: 2027, fid: '1mYMu8A-2LHRGZw-Ivya0KZt-sxe7SHaJ' },
      ],
    },
  ],
};

export const TN_DCEP2_PHARMACOTECHNIE = {
  id: 'tn-dcep2-pharmacotechnie', promo: 'dcep2', semester: 'S1',
  name: 'PHARMACOTECHNIE INDUSTRIELLE (OPTION)', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pharmacotechnie industrielle',
      lectures: [
        { n: 1, title: 'PHARMTECH-CO.MI1- Support pédagogique pharmacotechnie-4A-MAJ', ext: P, year: 2026, fid: '1vwkw6NeblK7GVSx-LZLVqI5sJn9eD4zn' },
      ],
    },
  ],

  sections: [
  ],
};

// ---------------------------------------------------------------------------
// S2
// ---------------------------------------------------------------------------

export const TN_DCEP2_CC2 = {
  id: 'tn-dcep2-cc2', promo: 'dcep2', semester: 'S2',
  name: 'CARDIOLOGIE ET PNEUMOLOGIE (CC2)', icon: 'heart', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Chimie thérapeutique',
      lectures: [
        { n: 1, title: 'Antiangoreux [Enregistrement automatique]', prof: 'Mca Meriem Laribi', ext: P, year: 2026, fid: '1wC7GSow7f_um8mEignmIrm-2Xh4k0_OI' },
        { n: 2, title: 'Antiarythmique', prof: 'Mca Meriem Laribi', ext: P, year: 2026, fid: '1qXz4jqWluJNRbAVdVM02J3kQveEha6aE' },
        { n: 3, title: 'B bloquants', prof: 'Mca Meriem Laribi', ext: P, year: 2026, fid: '1Vss-j-k2_ORPH6h6w2yD1AMY9HvEEtZG' },
        { n: 4, title: 'DIU chimie thérap BEN FATMA Nour', prof: 'Pr Ben Fatma Nour Elhouda', ext: P, year: 2026, fid: '1HJ2EvHiP9L8QlMFa3FeMZwVA3G8WdQ-d',
          versions: [
            { title: 'Hémostase chimie thérap BEN FATMA Nour', prof: 'Pr Ben Fatma Nour Elhouda', ext: P, year: 2026, fid: '1Qx4pQTN64K1nk-5Ouv3JEuONDwaEJvD7' },
            { title: 'IC chimie thérap BEN FATMA Nour', prof: 'Pr Ben Fatma Nour Elhouda', ext: P, year: 2026, fid: '178nrJRFFmZrDvvhltDosOELLRfxHr0vE' },
            { title: 'Insuf cardiaque chimie thérap BEN FATMA Nour', prof: 'Pr Ben Fatma Nour Elhouda', ext: P, year: 2026, fid: '15j-rU7CGyIWMmqMOnqyhjFpwh9CVQKu-' },
          ] },
        { n: 5, title: 'IEC', prof: 'Mca Meriem Laribi', ext: P, year: 2026, fid: '1DTYOcC93KpqbjaOvNqvNu9BxYEVfl-jJ' },
        { n: 6, title: 'Thérapeutique CC2', ext: P, year: 2026, fid: '19N-kHFGv90nXct_73Xi_fkNyPj15x6pX' },
      ],
    },
    {
      title: 'Pharmacologie',
      lectures: [
        { n: 7, title: 'Anticoagulants', prof: 'Pr Ikram Fasaa', ext: P, year: 2023, fid: '17MTKowI3Up63zrNlJ1N-oVakCWLL1BpA' },
        { n: 8, title: 'Les antiagrégants plaquettaires', prof: 'Pr Ikram Fasaa', ext: P, year: 2023, fid: '17MUKwLCwBkJgYbp_-gc1_-ch9oxauw-F',
          versions: [
            { title: 'Les antiagregants plaquettaires ml if', prof: 'Pr Ikram Fasaa', ext: P, year: 2023, fid: '1gfj8BdqV_oQEwsL6FgPYdjYClToaIQmF' },
            { title: 'Les antiagregants plaquettaires ml if', prof: 'Pr Ikram Fasaa', ext: P, year: 2023, fid: '1hI_sGBUksaIqrlYWgpOSxlDzdmtf9ejn' },
          ] },
        { n: 9, title: 'Les antiarythmiques', prof: 'Pr Dorra Cherif', ext: P, year: 2023, fid: '1-fIqIu3r4quk7-EZIr4mK0NOmB5eyaTw' },
        { n: 10, title: 'Les fibrinolytiques', prof: 'Pr Ikram Fasaa', ext: P, year: 2023, fid: '17PXegIuG2Tsq-F31eVt8gyhzJIL4wuGY',
          versions: [
            { title: 'Les fibrinolytiques ML IF', prof: 'Pr Ikram Fasaa', ext: P, year: 2023, fid: '1gg71OiamZUnfPpj8xDfsVn78WqOauL2J' },
            { title: 'Les fibrinolytiques ML IF', prof: 'Pr Ikram Fasaa', ext: P, year: 2023, fid: '1hFGCq5dqXS48Fw5U7uyv3VgQ_V3JnJa0' },
          ] },
        { n: 11, title: 'Medicaments de l’hemostase if ml', prof: 'Pr Ikram Fasaa', ext: P, year: 2023, fid: '1glvSwqTOW-8_MG3EpFJn_krTCSXf4-zP' },
        { n: 12, title: 'Pharmacologie des médicaments antiangineux', prof: 'Pr Dorra Cherif', ext: P, year: 2023, fid: '1y-qqyGReVJRcMuvXy42k8VIIy8i5HbdG' },
        { n: 13, title: 'Plycope i.e.c 2023 inhibiteurs enzyme de conversion', prof: 'Pr Nedia Fnina', ext: P, year: 2023, fid: '158N0-CwWrzT1EemcG8JjHo99y7eqoCjZ' },
        { n: 14, title: 'Plycope inhibiteurs calciques', prof: 'Pr Nedia Fnina', ext: P, year: 2023, fid: '157n-jhDmeNYudiQEKQCk0SOzEqtv0uUK' },
        { n: 15, title: 'Polycope AHT diurétiques', prof: 'Pr Nedia Fnina', ext: P, year: 2024, fid: '1ejzM5OINSQHj5t6kDsfmgwNE8T7MgBBL' },
        { n: 16, title: 'Polycope Antihypertenseurs Centraux, alpha bloquants et autres', prof: 'Pr Nedia Fnina', ext: P, year: 2023, fid: '16WUaY4yXzcO6-OJ5bJWPjMs_xW1q8M-Q' },
        { n: 17, title: 'Polycope bêtabloquants', prof: 'Pr Nedia Fnina', ext: P, year: 2023, fid: '15H1CAxfsGD6d3Z1EVXYNUzyB1jxKUoze' },
        { n: 18, title: 'Polycope Pharamcologie des cardiotoniques', prof: 'Pr Nedia Fnina', ext: P, year: 2023, fid: '16Zz5cPbQiVdesNse1ECUxV8OSNxN46LG' },
      ],
    },
    {
      title: 'Biochimie clinique',
      subtitle: 'Pr Omezzine Asma',
      lectures: [
        { n: 19, title: 'Atherogenese', prof: 'Pr Omezzine Asma', ext: P, year: 2021, fid: '1JNTPOm6Gl5Kswb__45_lZxrlLbBI_FJd' },
        { n: 20, title: 'Biochimie CC2', ext: P, year: 2026, fid: '1OBT2QGh4s1cK4HF082dg2rMZ6XuB6EiV' },
        { n: 21, title: 'Frcc2', prof: 'Pr Omezzine Asma', ext: P, year: 2025, fid: '1LGHkSdy4LkA2xzjFmVFk3PQVhz07k2Wm' },
        { n: 22, title: 'Marqueurs des SCA', prof: 'Pr Omezzine Asma', ext: P, year: 2026, fid: '1q0zRw4FRbM32ZVtIwZ4PCsR5Dw1v26Oo' },
      ],
    },
    {
      title: 'Sémiologie',
      lectures: [
        { n: 23, title: 'Asthme', prof: 'Dr Ghribi Wajih', ext: P, year: 2026, fid: '1L6xyC_TMo7uDV4NKbHtOFVGTdPJ09Uy8' },
        { n: 24, title: 'Bpco', prof: 'Dr Ghribi Wajih', ext: P, year: 2026, fid: '1RTd98xASRVyPuuOGYijjl1AmOv9NlTBP' },
        { n: 25, title: 'HTA', prof: 'Pr Najjar Aymen', ext: P, year: 2026, fid: '1UinVhvXxFFCX1GCzdcTk09CwBDf18nko' },
        { n: 26, title: 'IC', prof: 'Pr Najjar Aymen', ext: P, year: 2026, fid: '1O914kbOj34jYaV1oGXpzPAUdCdgH9rzk' },
        { n: 27, title: 'Ice coronaire', prof: 'Pr Najjar Aymen', ext: P, year: 2026, fid: '1muHUWVU7mq9O3H5Bly0mDNVb7OoDRGrX' },
        { n: 28, title: 'Insuffisance rénale aiguë', prof: 'Dr Sirine Bchir', ext: P, year: 2026, fid: '13faeVj6XigvE7ktOwzP5ZPX0nefoZGH5' },
        { n: 29, title: 'IRC', prof: 'Dr Sirine Bchir', ext: P, year: 2026, fid: '1ogWWXaeY-TbcuER8vN5yzIscbq39VXg2' },
        { n: 30, title: 'Les néphropathies glomérulaires', prof: 'Dr Sirine Bchir', ext: P, year: 2026, fid: '1IDlQFTQ28jBT430NXBd_xUBxRy3X4fGU' },
        { n: 31, title: 'Mvte', prof: 'Pr Najjar Aymen', ext: P, year: 2026, fid: '13RCIgmABtCrRXly8kSfCn0VU5WKk6Cnh' },
        { n: 32, title: 'Rein et medicaments', prof: 'Dr Sirine Bchir', ext: P, year: 2026, fid: '1srw7WjflKN1uGSBCY7IK9on-xCe_bNnl' },
        { n: 33, title: 'Semiologie respiratoire phar', prof: 'Dr Saoussen Cheikh Mhamed', ext: P, year: 2026, fid: '1Hx9s5Ed0ypP-3nvGch1bxGNWJJQzty9h' },
        { n: 34, title: 'Traitement de suppléance de la fonction rénale', prof: 'Dr Sirine Bchir', ext: P, year: 2026, fid: '1XtGwBqCrko8K7oos_RTmwg4IypB8SX-Y' },
      ],
    },
    {
      title: 'Autres cours',
      lectures: [
        { n: 35, title: 'MED-CARDIO-CC2 Support de cours CC2 validé 4', ext: P, year: 2026, fid: '1O0as7venMpHYPXlTKpi-NSFs8glEPjs0' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Les antiagregants plaquettaires avril — 2025-2026', prof: 'Ahu Meriem Lameri', ext: P, year: 2026, fid: '1S32cPcIj6shkK7jpJ3Sv1lLEAg43IWBI' },
        { title: 'Les fibrinolytiques Avril — 2025-2026', prof: 'Ahu Meriem Lameri', ext: P, year: 2026, fid: '1ci5sgWscI4_CVQRtqPv-OPHztlaGDvqo' },
        { title: 'Medicaments de l’hemostase — 2025-2026', prof: 'Mca Ikram Fazaa', ext: P, year: 2026, fid: '1pBYyQXkUPZgjujrQhHLafbG08seZVIa6' },
        { title: 'Pharmacologie CC2 — 2025-2026', ext: P, year: 2026, fid: '1EU55X5CtQKqnl9_QsgXBWWn0ogWoNqGt' },
        { title: 'Partie Chimie thérapeutique complète CC2 — 2023-2024', ext: P, year: 2024, fid: '1-I3qYa1GpcQT5Rj2RHtyC24kLNqIagqo' },
        { title: 'Partie pneumologie — 2023-2024', ext: P, year: 2024, fid: '1-Ba-6J7HJQDzBcgxAwmf5ZaEdcAC581J' },
        { title: 'Exploration de la Fonction Rénale — 2022-2023', prof: 'Pr Hssan Bouzidi', ext: P, year: 2021, fid: '14yK9ucrC_k7xf-BFagMtgL56d4qsX8HV' },
        { title: 'Lithiase Urinaire — 2022-2023', prof: 'Pr Hssan Bouzidi', ext: P, year: 2021, fid: '1HpP74MVC9_m2lK1-JmGurIhKvKIas7lG' },
        { title: 'Antiangoreux — 2022-2023', prof: 'Ahu Meriam Laaribi', ext: P, year: 2023, fid: '1wvc9UasMdtZ5UJRCrP0DSKkliSBwiUfT' },
        { title: 'Antiarythmiques — 2022-2023', prof: 'Ahu Meriam Laaribi', ext: P, year: 2023, fid: '17Aap8R98hhOMDknWpRHsUhrGBO-1xGKQ' },
        { title: 'Beta-bloquants — 2022-2023', prof: 'Ahu Meriam Laaribi', ext: P, year: 2022, fid: '1e53uTD0tXmB-PnWYh9DAYS-TcVgYyEle' },
        { title: 'Bêta-bloquants Et Alpha-bloquants — 2022-2023', prof: 'Ahu Meriam Laaribi', ext: P, year: 2023, fid: '1iCiJW1NIrHarpGcgGFLwHXsc_7a41UGS' },
        { title: 'Diurétiques (4éme annee pharmacie) — 2022-2023', prof: 'Ahu Nour El Houda Ben Fatma', ext: P, year: 2023, fid: '16QKA1h5QO0eHp3Y40yeR_nOVmzoYlUGr' },
        { title: 'Facteurs de risque des syndromes coronaires aigus — 2022-2023', prof: 'Pr Asma Omezzine', ext: P, year: 2023, fid: '13cezTjN9ogd6-KsfDLPtBUeEwn60bKOt' },
        { title: 'IC oap — 2022-2023', prof: 'Pr Mejdi Ben Messaoud', ext: P, year: 2023, fid: '1VcuQn4E1gi5IbxJ4Du8QZSoo0btFMVwK' },
        { title: 'Inhibiteurs calciques — 2022-2023', prof: 'Ahu Nour El Houda Ben Fatma', ext: P, year: 2023, fid: '1ffEX8Pjsex9c0hM54cztTzPgNSyCW8Qo' },
        { title: 'Insuffisances Coronaires — 2022-2023', prof: 'Pr Mejdi Ben Messaoud', ext: P, year: 2022, fid: '1zS_xpmWO86a0HiF2_3RYvxp5YVlaDvXi' },
        { title: 'Les néphropathies glomérulaires4 A — 2022-2023', prof: 'Pr Sabra Gorcii', ext: P, year: 2023, fid: '1QnkcUrMkQGSh0dwZHRLZf8bMwgq2bqOt' },
      ],
    },
  ],
};

export const TN_DCEP2_CC3 = {
  id: 'tn-dcep2-cc3', promo: 'dcep2', semester: 'S2',
  name: 'INFECTIOLOGIE (CC3)', icon: 'micro', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Chimie thérapeutique',
      lectures: [
        { n: 1, title: 'Antifongiques', prof: 'Ahu Ben Saada Raafa', ext: P, year: 2026, fid: '1x4qNL49pTkJK5JKhA768ZDiz1cb5S_uv' },
        { n: 2, title: 'Antihelmintiques antiprotozoaires', ext: P, year: 2026, fid: '1mpT0Fe2Z6VR-uAO11fnGmgl-2pUBBwaT' },
        { n: 3, title: 'Antipaludiques', ext: P, year: 2026, fid: '1gG8e0ouAZkmBfOMjVBCh7C8XGjYe5B5h' },
        { n: 4, title: 'Céphalo monobac carbapénème', ext: P, year: 2026, fid: '1Aj9BrjMUeH0q1Iaokq_hqlkWQrlK3y4d' },
        { n: 5, title: 'Glycopeptides', prof: 'Ahu Ben Saada Raafa', ext: P, year: 2026, fid: '1YIIv4BMIdfBHZcNtLaN7AHzSNWfCuXAt' },
        { n: 6, title: 'Les aminosides', prof: 'Ahu Wiem Ben Ayed', ext: P, year: 2026, fid: '11-XNFmN9bEZQgl0s_uYbxIs2U_H9LXMF' },
        { n: 7, title: 'Les antituberculeux', prof: 'Ahu Wiem Ben Ayed', ext: P, year: 2026, fid: '199J3lucpFbTFj5xiBRk6Lus3QSqcYZba' },
        { n: 8, title: 'Les antiviraux', prof: 'Ahu Ben Saada Raafa', ext: P, year: 2026, fid: '1A810qzJN5Rc3NoWcBqhoIfswqy3pQDsK' },
        { n: 9, title: 'Les macrolides', prof: 'Ahu Ben Saada Raafa', ext: P, year: 2026, fid: '1KEjdSQdk7_tAD2TpvNm6PyBVA1f9ZGnW' },
        { n: 10, title: 'Les quinolones', prof: 'Ahu Wiem Ben Ayed', ext: P, year: 2026, fid: '1kGNOcii6WLefX2NVsBSbKe3v4dprb78S' },
        { n: 11, title: 'Pénicillines', ext: P, year: 2026, fid: '1OB3KHCc19VP0COAUM6YM9h3dIvTlgY6d' },
        { n: 12, title: 'Sulfamides 2026', prof: 'Ahu Ben Saada Raafa', ext: P, year: 2026, fid: '1ohgooOXhdffaJrTk-g449XXRJ_A62h_S' },
        { n: 13, title: 'Tétracyclines', prof: 'Ahu Ben Saada Raafa', ext: P, year: 2026, fid: '1p-L4oQf0Qlk4bV-WFmv_2xYEQeRSyzpc' },
      ],
    },
    {
      title: 'Pharmacologie',
      lectures: [
        { n: 14, title: '2026 aminosides VE', prof: 'Mca Ikram Fazaa', ext: P, year: 2026, fid: '1HIL1aApIzgz5pBF18XoNWMcqhIHgceGA' },
        { n: 15, title: 'Les antiviraux IF nouv', prof: 'Mca Ikram Fazaa', ext: P, year: 2026, fid: '1YnR0auJLb3k6mecRzkaG_tYy1d33FMQv' },
        { n: 16, title: 'MLS', prof: 'Pr Ag Sana Boujaafar', ext: P, year: 2026, fid: '1TBBDSiOdPhpfg8m4h6hSZecDh3I-NaAE' },
        { n: 17, title: 'Pharmacologie des anti staphylococciques Les Glycopeptides', prof: 'Pr Ag Sana Boujaafar', ext: P, year: 2026, fid: '1P6gAA9j59hOdiWCagVYS4H17BT9lKKgM' },
        { n: 18, title: 'Polycope 26 antituberculeux les antilépreux les Sulfamides les phénicolés et autres antbiotiques 1', prof: 'Pr Nadia Fenina', ext: P, year: 2026, fid: '1yGaiCrVzlkgoKBrixYQl4maFZra_gDPG' },
        { n: 19, title: 'Polycope Antifongiques version', prof: 'Pr Nadia Fenina', ext: P, year: 2026, fid: '1uUC4wjmexJKRdOSL_7Oxv_s5QYsHRQLf' },
        { n: 20, title: 'Polycope béta lactamines version finale Janv', prof: 'Pr Nadia Fenina', ext: P, year: 2026, fid: '11pl67DJqCz8_wF493xBmrJ6md7_Kr_CY' },
        { n: 21, title: 'Polycope pharmacologie des antiparasitaires', prof: 'Pr Nadia Fenina', ext: P, year: 2026, fid: '1g74yqwAee6Zm52ey9-08lB4f2c-7-H66' },
        { n: 22, title: 'Polycope pharmacologie des cyclines', prof: 'Pr Nadia Fenina', ext: P, year: 2026, fid: '1LdvQ2ypeI2COxsBzXO3UbpHN3K9xdGg6' },
        { n: 23, title: 'Polycope pharmacologie des Quinolones', prof: 'Pr Nadia Fenina', ext: P, year: 2026, fid: '1Go9_1CrRy1TGdoM339ZCtaf2iqiKlzOZ' },
      ],
    },
    {
      title: 'Sémiologie',
      lectures: [
        { n: 24, title: 'Fièvres Fongiques', prof: 'Pr Bouthaina Jemli', ext: P, year: 2021, fid: '1HYpqFU8l1o8aiyQ1JabAAV8oBfCmmtH0' },
        { n: 25, title: 'Antibiotiques', prof: 'Pr Afef Masmoudi', ext: P, year: 2023, fid: '1AU8ESKijmHdcceKjSOck_pfDVs2WacUo' },
        { n: 26, title: 'ATB', prof: 'Pr Afef Masmoudi', ext: P, year: 2023, fid: '1JoPCron-UXWZM_9vwebBsz7gRHiPLJr1' },
        { n: 27, title: 'Bactériémies', prof: 'Pr Meriem Zribi', ext: P, year: 2022, fid: '1BuzlHNIYPzL-wtB00svpT8r-k0UPSmk4' },
        { n: 28, title: 'Bronchites', prof: 'Pr Afef Masmoudi', ext: P, year: 2021, fid: '1U5k3m0PK8CgIBAb3F5-OjS0C_E_udcaa',
          versions: [
            { title: 'Bronchites Infectieuses', prof: 'Pr Afef Masmoudi', ext: P, year: 2021, fid: '13TjnkKidxayuC4FU3jqima6X5VIxxpi4' },
          ] },
        { n: 29, title: 'Chimiothérapie antivirale cours 4iéme', prof: 'Pr Abdelhalim Trabelsi', ext: P, year: 2023, fid: '1hmnteJXRTMyIXgil7NvsEkZeQDXZ2P05' },
        { n: 30, title: 'Eruptions Cutanées', prof: 'Pr Meriem Zribi', ext: P, year: 2022, fid: '1n2fgvfFzOYXWpAA_II1PFzapsVzgPGkA' },
        { n: 31, title: 'Inf', prof: 'Pr Meriem Zribi', ext: P, year: 2021, fid: '1lohMQXoXQxptSzVdJfdazZRrYZf7Tmfi' },
        { n: 32, title: 'Infections Digestives', prof: 'Pr Afef Masmoudi', ext: P, year: 2023, fid: '1NXeyjLc-NN2D_aJyEB33gT9ROZs0eMW1',
          versions: [
            { title: 'Infections ORL', prof: 'Pr Afef Masmoudi', ext: P, year: 2023, fid: '1On89uBiyAm3AcGmucXg-G-YyB2CaEiN5' },
          ] },
        { n: 33, title: 'Méningites', prof: 'Pr Afef Masmoudi', ext: P, year: 2023, fid: '1PYuDoyufEb1yxctmL6aA0xFiI1qYMc7K' },
        { n: 34, title: 'Mycoses', prof: 'Pr Bouthaina Jemli', ext: P, year: 2021, fid: '1I86R8e7RTRnMl3-GcLg5E4aWPyl3cJCL' },
        { n: 35, title: 'Parasitoses Cutanées', prof: 'Pr Bouthaina Jemli', ext: P, year: 2023, fid: '11-hlN1cZke781G4y-5F3Ak7qaR0GwRVh' },
        { n: 36, title: 'Pneumopathies', prof: 'Pr Afef Masmoudi', ext: P, year: 2021, fid: '1whgJyLEVwBoXJHWoEJkYgY71o5t0-aUF' },
      ],
    },
    {
      title: 'Autres cours',
      lectures: [
        { n: 37, title: 'MED.INFECT-CC3 Support de CC3', ext: P, year: 2024, fid: '1-1OmCUqgkG6cDBnSMMOyaG9vqZ3sJkmd' },
        { n: 38, title: 'CC3-4A Partie 1 validée- Pr Gloulou Soussi Zribi', ext: P, year: 2024, fid: '1-2Vsw2vrgcTKjE00M-Cxhk-GaOXOwcJH' },
        { n: 39, title: 'Suite support de cours CC3 4A', ext: P, year: 2024, fid: '1-33rZz-gcRL9tMhmLmRqxqYFx-ViVhFi' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Med.infect.cc3 support de cours cc3 1 — 2025-2026', ext: P, year: 2026, fid: '1D8UKuOlSScify2uleSNnED72RpDAqr2u' },
        { title: 'I urinaires — 2025-2026', prof: 'Pr Zribi Meriam', ext: P, year: 2026, fid: '1Nz0dKMMkc8KEY88hhCcufon3X7IJhNCX' },
        { title: 'I.génitales — 2025-2026', prof: 'Pr Zribi Meriam', ext: P, year: 2026, fid: '1IRVZb7H3-5hVI02vFvo95axVKbdRpJ-v' },
        { title: 'Inf cut — 2025-2026', prof: 'Pr Zribi Meriam', ext: P, year: 2026, fid: '1TQ41PZ6D5fbdDYnTkpXp5GFvq_q6CcbI' },
        { title: 'Infections ostéo-articulaires — 2025-2026', prof: 'Pr Zribi Meriam', ext: P, year: 2026, fid: '134C3Qmx8-iwtnH7xPZD4mIFaGtBLUnk0' },
        { title: 'Les septicémies — 2025-2026', prof: 'Pr Zribi Meriam', ext: P, year: 2026, fid: '1gevlMIgwHIrNFACcqGN5zTSkzjYfKuoX' },
        { title: 'Aminoside — 2022-2023', prof: 'Pr Khrouf Myriam', ext: P, year: 2023, fid: '1xsn4PbUO7P4-VbCsFOh5QxWyENZYbz6U' },
        { title: 'Aminosides — 2022-2023', prof: 'Pr Med Ali Soussi', ext: P, year: 2023, fid: '19BFt-uyh1L-j9KaWB4BMxyw0x2kVQfdM' },
        { title: 'Anti Parasitaires — 2022-2023', prof: 'Pr Nadia Fenina', ext: P, year: 2023, fid: '1NCCoZ5JioZm-j7a7KXnGNlbBda22GWgU' },
        { title: 'Antipaludique — 2022-2023', prof: 'Pr Olfa Gloulou', ext: P, year: 2021, fid: '1AHkQpdh5ddqMFqI0EFmcO2allCQ-wp97' },
        { title: 'Antituberculeux — 2022-2023', prof: 'Pr Olfa Gloulou', ext: P, year: 2021, fid: '1-VeyMB667Pib4AAmXvbYFYdxr9b7c0Cy' },
        { title: 'Antituberculeux et autres antbiotiques — 2022-2023', prof: 'Pr Nadia Fenina', ext: P, year: 2023, fid: '1dY0sRuqQFX5rP2gkaPUqHki7KzZ1SJCl' },
        { title: 'Antiviraux — 2022-2023', prof: 'Pr Med Ali Soussi', ext: P, year: 2023, fid: '1q2_hlTY6QQWivzRv12iSA0jL8wB0xhwl' },
        { title: 'Béta Lactamines — 2022-2023', prof: 'Pr Nadia Fenina', ext: P, year: 2023, fid: '16pjrCCO-9dbe7ftFUlxh1oGVKAWL4Txd' },
        { title: 'Céphalo — 2022-2023', prof: 'Pr Olfa Gloulou', ext: P, year: 2021, fid: '1VpRJU10Oihiud3W4QzCvkWaqSt7OzuzV' },
        { title: 'Cyclines — 2022-2023', prof: 'Pr Nadia Fenina', ext: P, year: 2023, fid: '1IZpYQGg2xu-txvRCU6gcMl2ABrevB3D_' },
        { title: 'Macrolides — 2022-2023', prof: 'Pr Khrouf Myriam', ext: P, year: 2023, fid: '1LYljttuNVR-97KhVVxEPfpsq7mV9gAOm' },
        { title: 'Macrolides.Thérap.CC3 — 2022-2023', prof: 'Pr Olfa Gloulou', ext: P, year: 2021, fid: '1jOiO85rvWY8b-7JlK_VGC7wj1hqa2WRU' },
        { title: 'Quinlones — 2022-2023', prof: 'Pr Med Ali Soussi', ext: P, year: 2023, fid: '1Y8Tdbc1fMd0E5qQw4sXDQ-9CLLDsJN-X' },
        { title: 'Quinolones — 2022-2023', prof: 'Pr Med Ali Soussi', ext: P, year: 2023, fid: '16O8WplAogs4l2TWjVrbiS24XqpnwBFoc' },
        { title: 'Antibiotiques et résistance bmr bhre bis — 2021-2022', ext: P, year: 2022, fid: '1EcC9v1P17A-bB6RPr4ejBsiZfHetsXgM' },
        { title: 'Le guide pratique des bacteries pathogenes — 2021-2022', ext: P, year: 2022, fid: '1ArBy3Rbs6RAyzQFtW4ZOJVQ2OeGzIRJu' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale CC3', ext: P, year: 2022, fid: '16-_H4Q1uvquC6VHAzD0pCohWwJu0494e' },
      ],
    },
  ],
};

export const TN_DCEP2_PHARMACOGNOSIE = {
  id: 'tn-dcep2-pharmacognosie', promo: 'dcep2', semester: 'S2',
  name: 'PHARMACOGNOSIE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pharmacognosie',
      lectures: [
        { n: 1, title: 'Les Alcaloïdes', prof: 'Dr Abbassi', ext: P, year: 2022, fid: '11cyd0hevRIpyDMXjzB2PKTu-zRKxsYIz',
          versions: [
            { title: 'Alcaloïdes de type phenylethylamine', prof: 'Pr Amira Horchani', ext: P, year: 2022, fid: '1-dqnTzhC7aD_kEpK5GPs6l890BdPPgb0' },
            { title: 'Les alcaloides de l’ergot de seigle', prof: 'Pr Fatma Bannour', ext: P, year: 2023, fid: '1-jVi8ezr85ldk5F3T5FyVvjVWo0q1SDR' },
            { title: 'Les alcaloides tropaniques', prof: 'Dr Trabelsi', ext: P, year: 2023, fid: '1fdIqWntas_3ZbIWXtxd86utCSnRh_hXI' },
            { title: 'Les alcaloïdes tropaniques', prof: 'Dr Trabelsi', ext: P, year: 2022, fid: '1jWdzjHZP-YEgx-hP23aCcEBu8YDR-BA1' },
          ] },
        { n: 2, title: 'Les Antiparasitaires d’origine végétale', prof: 'Dr Abbassi', ext: P, year: 2022, fid: '1kK6u4Ah8Sjj2iqDmO5iAtsslRWNtqv5-' },
        { n: 3, title: 'Les curares', prof: 'Dr Abbassi', ext: P, year: 2022, fid: '1oYnzNojUtqunusd8jFOKjQLok98t4IIa' },
        { n: 4, title: 'Les morphinanes', prof: 'Dr Abbassi', ext: P, year: 2022, fid: '1L3Vvp_m4HuiQHvVGu_YXi10ZRJrP1w-1' },
        { n: 5, title: 'A indolo-monoT', prof: 'Dr Abbassi', ext: P, year: 2023, fid: '1_tS0Y_nHRAC6k9BFXZ-I-qwlHSIQtQNw' },
        { n: 6, title: 'Anti parasitaires', prof: 'Pr Yoser Krichen', ext: P, year: 2023, fid: '1-KPWqkF-ZOc8GA3khm5JrbM5oHE3y9ya' },
        { n: 7, title: 'Cours Pharmacognosie', ext: P, year: 2023, fid: '15ZWSQmMqVvoAmOpCywyyc2cAU6_VhanJ' },
        { n: 8, title: 'Drogues à bases puriques', prof: 'Dr Abbassi', ext: P, year: 2023, fid: '1h3KKbot3Mkq8okCoGsO_lNQwLLrLEWwo' },
        { n: 9, title: 'Les anti cancéreux', prof: 'Dr Abbassi', ext: P, year: 2023, fid: '1AmaJ1CEQFEVMiaCtVfml3Ywpke8tC9XM' },
        { n: 10, title: 'Les plantes stupéfiantes et Les plantes toxiques', prof: 'Dr Trabelsi', ext: P, year: 2023, fid: '1K6hoZlt8-aYhzWDTo-bFae5LJvfJg36A',
          versions: [
            { title: 'Les plantes stupefiantes et toxiques', prof: 'Dr Trabelsi', ext: P, year: 2023, fid: '1phREmFlj1Yrwsx-NkEsxWqlHt5ZexsaF' },
          ] },
        { n: 11, title: 'Phytothérapie', prof: 'Dr Trabelsi', ext: P, year: 2022, fid: '1qXID4unwRaI0I65ZTYqFCoLd-YNn3FXz' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'GNOSIE-CM1-cours pharmacognisie -Validé codifié avec cartouche — 2025-2026', ext: P, year: 2026, fid: '1Q9jItuiQ3gUfEQN5A7Z4dFIha3kWiMu0' },
        { title: 'Les drogues à bases puriques — 2025-2026', prof: 'Ahu Hamza Ben Abdallah', ext: P, year: 2026, fid: '1NKoN88gMPJZfcS3rVt6IJ4_TNa604zVE' },
        { title: 'Les indolomonoterpéniques — 2025-2026', prof: 'Ahu Hamza Ben Abdallah', ext: P, year: 2026, fid: '1mTgwjyGnzsFgzn6qkfnwj3A6ceRoYIaU' },
        { title: 'Plantes StupTox à envoyer — 2025-2026', prof: 'Ahu Hannachi Seif', ext: P, year: 2026, fid: '1yWpP_rKbfAreJMt3nSNcBeAam_9RwgU4' },
        { title: 'Support de cours 4 ème.pdf — 2021-2022', ext: P, year: 2022, fid: '1-c6TAT4p66JyMmZhfb9IoJMvec8DhieQ' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale Gnosie', ext: P, year: 2022, fid: '1-hRK1gk57ZbNPu1Cey47eB7kfL_-qZua' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'TD 4', ext: P, year: 2026, fid: '1jxIqs_7t5vbs-TF3PH5JaFSobTubWNcj' },
      ],
    },
  ],
};

export const TN_DCEP2_TOXICOLOGIE = {
  id: 'tn-dcep2-toxicologie', promo: 'dcep2', semester: 'S2',
  name: 'TOXICOLOGIE', icon: 'alert', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Pr Abderrazak Lehdhili',
      lectures: [
        { n: 1, title: 'Introduction à la toxicologie', prof: 'Pr Abderrazak Lehdhili', ext: P, year: 2023, fid: '123M2yhgf-jNfeKbrAiiJwNytIPKTbET1' },
      ],
    },
    {
      title: 'Pr Ag Nadia Chaouali',
      lectures: [
        { n: 2, title: 'Ethanol', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1aEJHUM3R6Jds8SmC6opcBwwhA9NXVqP7' },
        { n: 3, title: 'Intoxication ADT', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1NC_7WDeA1wO3FzIm21O3N3IndDN_P62k',
          versions: [
            { title: 'Intoxication Ethylene glycol', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1CIYq1h6ZVEkOeEwVpgx41w9VohsKmKkS' },
            { title: 'Intoxications aux cyanures', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1YEUoNQz8uY_3k4kgwLoarPQiyBxo4xci' },
            { title: 'Intoxications aux Pesticides', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1xKvTshMLK7wMijriBkWcdAKgraG6D-p5' },
            { title: 'Intoxications benzodiazepines', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1EVhQvPheQ-B7Lu6p8okPqtWMlXzmE2kG' },
            { title: 'Intoxications méthanol', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1jqdw_DOyob6CYSHHtgtHRocI5kl1uEhA' },
          ] },
        { n: 4, title: 'Introduction à la toxicologie', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1bjI0miZ3h_6IEVBD97f7kND6eFIYtouF' },
        { n: 5, title: 'Toxicomanie', prof: 'Pr Ag Nadia Chaouali', ext: P, year: 2023, fid: '1HvOuvmTBynccClXv0_DGPck3EC3l0N9S' },
      ],
    },
    {
      title: 'Pr Dorra Amira',
      lectures: [
        { n: 6, title: 'Méthéméglobinémie TOX', prof: 'Pr Dorra Amira', ext: P, year: 2021, fid: '1oyl2WQFgJBIzcyZe22WhHla2njUQW11h' },
        { n: 7, title: 'INTOX au Cd', prof: 'Pr Dorra Amira', ext: P, year: 2021, fid: '1BCpCJHHdCkllW4AljH-r5333WGjviyDJ' },
        { n: 8, title: 'Intoxication arsenic', prof: 'Pr Dorra Amira', ext: P, year: 2023, fid: '1cqhGfDU4XTZur5mgWF6pyj0w6y7092oo',
          versions: [
            { title: 'Intoxication au ARSENIC', prof: 'Pr Dorra Amira', ext: P, year: 2023, fid: '1eQ_BOdh2Yhr6-J8fOC8wDxxKhvsSo9SI' },
            { title: 'Intoxication au Pb', prof: 'Pr Dorra Amira', ext: P, year: 2023, fid: '1MHXBFuJv9REpRjU0TTdxptG9zchi0Os6' },
          ] },
        { n: 9, title: 'Intoxication mercure', prof: 'Pr Dorra Amira', ext: P, year: 2023, fid: '1zBJ1bFyuKVnjEgLJDYJcjZ9l-RuYTV2D' },
        { n: 10, title: 'Intoxication plomb', prof: 'Pr Dorra Amira', ext: P, year: 2023, fid: '1QvvzYGJQFVWkTRuIjuMVZw1Mq2AFjiMO' },
        { n: 11, title: 'Les agents methemoglobinisants', prof: 'Pr Dorra Amira', ext: P, year: 2023, fid: '11Q_vi_p568UAWxcN2u919xCq-PKwnJYz' },
        { n: 12, title: 'Metabolisme des toxiques', prof: 'Pr Dorra Amira', ext: P, year: 2023, fid: '1_afRB5YvfDK1HQid1BMXoMeyvc1KB6un' },
        { n: 13, title: 'Métabolisme des xenobiotiques', prof: 'Pr Dorra Amira', ext: P, year: 2023, fid: '1sYqUkjHVzVYnNI1eG95ou42AVLJmMDUf' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Année introduction toxicologie Etudiants FPM — 2025-2026', prof: 'Pr Hedhili Abderrazek', ext: P, year: 2026, fid: '1ix66U4n5GhaYQIlaV4d33_mxphhYj6Cf' },
        { title: 'C Support TOXICOLOGIE — 2025-2026', ext: P, year: 2026, fid: '1nfVvnZwu2_0Gc-d91N_IanLg7X8CtLfv' },
        { title: 'Toxicomanie avril 2026 Etudiants ppt — 2025-2026', prof: 'Pr Hedhili Abderrazek', ext: P, year: 2026, fid: '1HML1kRMyZ2Ri4WFFAiYBDwKFk6umPbde' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale Toxico', ext: P, year: 2022, fid: '1VNn54Khl2KcvWCnaDGauic9dD5Uz5yEw' },
      ],
    },
  ],
};

export const TN_DCEP2_INFERTILITE = {
  id: 'tn-dcep2-infertilite', promo: 'dcep2', semester: 'S2',
  name: 'BIOLOGIE DE L’INFERTILITÉ (OPTION)', icon: 'baby', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Biologie de l’infertilité',
      lectures: [
        { n: 1, title: 'INFERT-CO-MB2-Support de cours infertilité', ext: P, year: 2026, fid: '1W2aBy3RWQ0eQi9K_tqtVWaItQDdOKMy6',
          versions: [
            { title: 'Infertilité', prof: 'Pr Soumaya Ketata', ext: P, year: 2026, fid: '1rnmO0RErXq5RBkfjmwDi2C5ZWp7_d_bs' },
          ] },
        { n: 2, title: 'Infection et grossesse', prof: 'Pr Soumaya Ketata', ext: P, year: 2026, fid: '1s6A7gMCh4CBSkjaRTZWjf4AILGaTDYd3' },
      ],
    },
  ],

  sections: [
  ],
};

export const TN_DCEP2_CONTROLE_QUALITE = {
  id: 'tn-dcep2-controle-qualite', promo: 'dcep2', semester: 'S2',
  name: 'CONTRÔLE QUALITÉ (OPTION)', icon: 'shield', tint: 'purple',
  professors: [],

  chapters: [
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: '4éme', prof: 'Ahu Feriel Kara', ext: P, year: 2026, fid: '1CqIUpcCT47CdSEToRNBtyneAo82O0M59' },
        { title: 'Dossier d’amm', prof: 'Mca Toujani Emna', ext: P, year: 2026, fid: '1CABSBpUdNwdva9jmuEHjJ3B_mbBYVMfT' },
        { title: 'Produit fini support', prof: 'Mca Toujani Emna', ext: P, year: 2026, fid: '1QuJaN8gW6dmwCK3oQQ8VVlGae3Pp_TQ_' },
        { title: 'Substance active support', prof: 'Mca Toujani Emna', ext: P, year: 2026, fid: '1tdTM7B4cvEBbatP7oWLutqqHL9dHC9Y2' },
      ],
    },
  ],
};

export const TN_DCEP2 = [
  TN_DCEP2_CC1,
  TN_DCEP2_CC4,
  TN_DCEP2_HEMATOLOGIE,
  TN_DCEP2_GALENIQUE,
  TN_DCEP2_QUALITE_BIOLOGIE,
  TN_DCEP2_PHARMACOTECHNIE,
  TN_DCEP2_CC2,
  TN_DCEP2_CC3,
  TN_DCEP2_PHARMACOGNOSIE,
  TN_DCEP2_TOXICOLOGIE,
  TN_DCEP2_INFERTILITE,
  TN_DCEP2_CONTROLE_QUALITE,
];
