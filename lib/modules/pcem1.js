// PCEM1 — the first year, organised.
//
// A short file, because the Drive is short. `UNEM-PCEM(D)1` holds about
// thirty openable files against PCEM2's nine hundred, and most of them are
// exam papers rather than courses: BIOLOGIE ET GÉNÉTIQUE has no course at
// all, ANATOMIE S2's `Cours` folder is empty, and PHYSIOLOGIE S2 has five
// whole-semester polycopiés and not one lecture. Four folders under the
// biology exams are empty too.
//
// Nothing here is invented to fill the gap. A year with thirty files is
// shown as a year with thirty files; the panel is where the rest arrives.
//
// The same rules as PCEM2: every title is French and readable, the same
// material by different hands is a `version` rather than another entry,
// exact duplicates are dropped, and a paper photographed page by page is one
// document with its pages in order — not six loose images.

const P = 'PDF';
const J = 'JPG';

// ---------------------------------------------------------------------------
// S1
// ---------------------------------------------------------------------------

export const PCEM1_ANATOMIE = {
  id: 'pcem1-anatomie', promo: 'pcem1', semester: 'S1',
  name: 'ANATOMIE', icon: 'person', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Généralités',
      subtitle: 'Organisation du corps humain',
      lectures: [
        { n: 1, title: 'Anatomie générale', ext: P, mb: '1.3', year: 2023,
          fid: '1id_yMYJDBMu-o-FmlR0Vqjba8XNlJGby' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Anatomie — polycopié PCEM1', ext: P, mb: '7.1', year: 2024,
          fid: '1SulnXmV3z1_BKOwYzyzh1skH14S6cQ9p' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '2.0', year: 2025,
          fid: '1GqxHDZY0_v1y7abnm0_04l7tR8rT5J3H' },
      ],
    },
  ],
};

// The whole module in the Drive is lipids. Three copies of the same course by
// different hands, so one lecture with two versions rather than three
// entries competing in a list.
export const PCEM1_BIOCHIMIE = {
  id: 'pcem1-biochimie', promo: 'pcem1', semester: 'S1',
  name: 'BIOCHIMIE', icon: 'flask', tint: 'orange',
  professors: ['Kebir'],

  chapters: [
    {
      title: 'Biochimie structurale',
      subtitle: 'Les lipides',
      lectures: [
        { n: 1, title: 'Les lipides', ext: P, mb: '2.1', year: 2023, prof: 'Kebir',
          fid: '18HXIFgjeQN87o6ICLV291C1EmYBCaXoM',
          versions: [
            { title: 'Les lipides — Pr Kebir', ext: P, mb: '28.1', year: 2022,
              fid: '1DHBGbWEjrcwOOq7S9LBfIANHUG4Gwfrf' },
            { title: 'Les lipides — résumé', ext: P, mb: '0.4', year: 2023,
              fid: '10bEiytQoX7rmWHaw52snxc8iXqelFK1j' },
          ] },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Fiches — les lipides', ext: P, mb: '6.3', year: 2024, prof: 'Kebir',
          fid: '1AtEo0Ui19A-HCZ6f2wu3pdavhSi5oLVA' },
      ],
    },
  ],
};

// No course in the Drive at all — only papers. The 2020 exam was
// photographed page by page and arrives as five loose images; it is one
// paper here, in order.
export const PCEM1_BIOLOGIE = {
  id: 'pcem1-biologie', promo: 'pcem1', semester: 'S1',
  name: 'BIOLOGIE ET GÉNÉTIQUE', icon: 'micro', tint: 'purple',
  professors: ['Kébé'],

  chapters: [],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Tous les examens — Pr Kébé', ext: P, mb: '5.3', year: 2023,
          fid: '1eghz75EAPClFDkwQHhPOA6TYIRwM4tXq' },
        { title: 'Tous les examens — Khatri et Hafedh', ext: P, mb: '4.2',
          fid: '1q0dXMn9dVXx5Nqo_9_wWmbJ0CD6NG5Rn' },
        { title: 'Examen 2022 — biologie et génétique', ext: P, mb: '0.2', year: 2022,
          fid: '1bi5_Rh1gnxbKeE3lkVhRqSvtCc1Gc7mL' },
        { title: 'Examen — biologie et génétique', ext: P, mb: '0.7',
          fid: '1fDem4T4sG8Q9bNHzVCsAkeutl4OLHCWX' },
        { title: 'Examen 2021 — questions', ext: P, mb: '0.2', year: 2021,
          fid: '19sdfc64-Vc7IAII1qdOtg4nTcyOXMX5H' },
        { title: 'Rattrapage 2019', ext: P, mb: '0.4', year: 2019,
          fid: '10zfhwU9bbtS1EdWfnmt-aWLUMrrobVXb',
          versions: [
            { title: 'Rattrapage 2019 — autre copie', ext: P, mb: '0.5', year: 2019,
              fid: '1bV9OBTaNzHU5HWIYOPHKK1BTRymY0DHt' },
          ] },
        { title: 'Examen 2020', ext: J, mb: '0.3', year: 2020,
          fid: '1_bux8EyKZkoWAXBanGZut8LXCLUKLs2Y',
          pages: ['1_bux8EyKZkoWAXBanGZut8LXCLUKLs2Y', '1JwY9PZcR4y3EZdc36GU5Nvm-YJ_Wa7As',
                  '1QRqpIhkoiFRTEjF3esCESkKpMTm7vtkl', '1woPCvxzSPXQp9Wp2sxHqmgfh6JDEcZNs',
                  '1ifJQ5-A9pXrhTdG4Y4KmLGQIWvkgZGvi'] },
        { title: 'Examen — Pr Kébé', ext: J, mb: '0.1', prof: 'Kébé',
          fid: '1PWPl9sQV_5lCrF0Fo54b5NdXSyCXcoR_' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// S2
// ---------------------------------------------------------------------------

// `Cours` is an empty folder. Everything the Drive has for this module is the
// abdomen: one paper, its QCM, its correction and a croquis.
export const PCEM1_ANATOMIE_S2 = {
  id: 'pcem1-anatomie-s2', promo: 'pcem1', semester: 'S2',
  name: 'ANATOMIE S2', icon: 'person', tint: 'orange',
  professors: ['Moulay'],

  chapters: [],

  sections: [
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: "L'abdomen — isolé", ext: P, mb: '5.1',
          fid: '1ab9Ghr29ZJvCUvlT1lEnNA-a5aonIRym',
          correction: '1ea_5V56Iye-YjqOtD-PpCl3WzQ6a3br3' },
        { title: "L'abdomen — QCM isolés", ext: P, mb: '0.1', year: 2023,
          fid: '13FlfaJ8_hcSGe_sms5rvIbtfauWJh0Rp' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2024', ext: P, mb: '1.4', year: 2024, prof: 'Moulay',
          fid: '1DWsQMUlocvZRL23JB231HqAu3-VsKptn' },
      ],
    },
    {
      id: 'schemas', where: 'archive', title: 'Schémas', icon: 'image',
      items: [
        { title: "Croquis d'anatomie — partie Moulay", ext: P, mb: '1.5', prof: 'Moulay',
          fid: '1NbtLrzuE6NjWTvPSMk6zHh9W-tWMcssX' },
      ],
    },
  ],
};

export const PCEM1_EMBRYOLOGIE = {
  id: 'pcem1-embryologie', promo: 'pcem1', semester: 'S2',
  name: 'EMBRYOLOGIE', icon: 'baby', tint: 'purple',
  professors: ['Cheikha', 'Cheikh'],

  chapters: [
    {
      title: 'Les appareils génitaux',
      subtitle: 'Développement de l’appareil génital',
      lectures: [
        { n: 1, title: "L'appareil génital féminin", ext: P, mb: '2.4', year: 2016,
          fid: '1O5ZBVC0XNLO3Nql7Q1Ws_WBnsFkNzi63' },
        { n: 2, title: "L'appareil génital mâle", ext: P, mb: '6.0', prof: 'Cheikh',
          fid: '1GqTG2Pqbg1pH432pJJqEj1xboOZxWIxO' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Embryologie générale — polycopié PCEM1', ext: P, mb: '6.5', year: 2016,
          fid: '12n8jccTkecaAI4E62DTn3dx6o9powQOy' },
      ],
    },
    {
      id: 'notes', where: 'notes', title: "Notes d'étudiants", icon: 'file',
      items: [
        { title: 'Notes — embryologie (1)', ext: P, mb: '39.7', year: 2022, prof: 'Cheikha',
          fid: '1IcXz9h5CkTIQmyp2LArw4pvx18GCKhl0' },
        { title: 'Notes — embryologie (2)', ext: P, mb: '43.4', year: 2022, prof: 'Cheikha',
          fid: '1lDrW0V3wJf34b0GaMTpWIlOG3so64fxp' },
        { title: 'Notes — embryologie', ext: P, mb: '36.7', year: 2024,
          fid: '1rhw_AO1VI-IiaON3_GP_Ugiti5G-4NUw' },
        { title: 'Les appareils — notes', ext: P, mb: '9.2', year: 2024,
          fid: '1aHNhxPA3fPoK3vHf13Qylsy13V4l4_cy' },
      ],
    },
  ],
};

// Five polycopiés covering the whole semester, one per year, and a single
// isolé. No lecture in the Drive.
export const PCEM1_PHYSIOLOGIE_S2 = {
  id: 'pcem1-physiologie-s2', promo: 'pcem1', semester: 'S2',
  name: 'PHYSIOLOGIE S2', icon: 'heart', tint: 'orange',
  professors: [],

  chapters: [],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Polycopié PCEM1 S2 — 2024', ext: P, mb: '4.6', year: 2024,
          fid: '19d7gVhQ3fv4QleHwsfIdpzaMPsxqc8D8' },
        { title: 'Polycopié PCEM1 S2 — 2023', ext: P, mb: '3.5', year: 2023,
          fid: '1ez0TWkqys4c2exU9IcVyhB8dRcyuM-YZ' },
        { title: 'Polycopié PCEM1 S2 — 2022', ext: P, mb: '4.3', year: 2022,
          fid: '1QT1dMtpyz6DchxaXseVN9sr2iq_HjEYb' },
        { title: 'Polycopié PCEM1 S2 — 2021', ext: P, mb: '3.7', year: 2021,
          fid: '1a7z3WAJPKMo6GF6mOSWHbfJmxkrWSbIT' },
        { title: 'Polycopié PCEM1 S2 — 2018', ext: P, mb: '4.6', year: 2018,
          fid: '1E_NNjevnOWcIHArpRL4-MgQjYOSbtHd3' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'La respiration — isolé', ext: P, mb: '5.9', year: 2023,
          fid: '12uMribz20EF6qmYQ6qRxtHJetouH4k6V' },
      ],
    },
  ],
};

export const PCEM1 = [
  PCEM1_ANATOMIE,
  PCEM1_BIOCHIMIE,
  PCEM1_BIOLOGIE,
  PCEM1_ANATOMIE_S2,
  PCEM1_EMBRYOLOGIE,
  PCEM1_PHYSIOLOGIE_S2,
];
