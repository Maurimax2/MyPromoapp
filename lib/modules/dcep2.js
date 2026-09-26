// DCEP2 — pharmacy, fourth year.
//
// Source: a standalone Drive, "ARCHIVE DCEP2" (1YVU3TSmrEK8t2rE-ahPmCHfNesFwsIgx),
// shared "anyone with the link" like DCEP1's — not searchable, read off its
// own folder listing pages one level at a time.
//
// Most of the year is not filed by subject at all: S1 has two "contrôle
// continu" period folders (`Cc1`, `CC4`) and S2 has two more (`CC2`, `CC3`
// inside an `CC` folder), each holding the same four subject folders
// (Chimie thérapeutique, Pharmacologie, Biochimie, Sémiologie) — and each
// period turns out to be one organ system taught across all four at once:
// CC1 is neuro-psychiatrique, CC4 is endocrino-métabolique, CC2 is
// cardio-rénal, CC3 is infectiologie (whose own Pharmacologie folder was
// empty). That is a real, deliberate structure, not a filing accident, so
// it is kept here rather than flattened into four generic subjects — each
// system is one module with a chapter per subject.
//
// Galénique, Hématologie, Toxicologie, Pharmacognosie (S2's `CM`) and,
// under S2's `CO`, Infertilité and Qualité, are filed as ordinary standalone
// subjects and catalogued the same way as PCEP1's.
//
// Several folders nested two or three levels deeper than the ones below
// (`Sar6et examen` under CC4/Biochimie, the `Isolés`/`Isolé` folders under
// most CC-period subjects, `Examen`'s own `Isolés` under Galénique,
// `Résumés 2` under DCEP1-style pharmacognosie, the Cardio/Nephro and
// Hasmio/Soufian professor folders under CC2 and CC3's Sémiologie) were not
// opened — this pass stopped at the first folder of files it reached down
// each branch, given how much deeper this Drive nests than DCEP1's.
// `year` is mostly the 2026 session written into the file names themselves
// (this promo's most recent year), not an academic-year guess.

const P = 'PDF';
const X = 'PPTX';
const PT = 'PPT';

// ---------------------------------------------------------------------------
// S1
// ---------------------------------------------------------------------------

export const DCEP2_NEURO_PSYCHIATRIE = {
  id: 'dcep2-neuro-psychiatrie', promo: 'dcep2', semester: 'S1',
  name: 'NEURO-PSYCHIATRIE (CC1)', icon: 'person', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Chimie thérapeutique',
      lectures: [
        { n: 1, title: 'Anesthésiques', ext: P, mb: '0', fid: '14KcfP70Bzv_Sy9FXLy7P6iMHmXn-M85r' },
        { n: 2, title: 'Antidépresseurs', ext: P, mb: '0', fid: '1OCqKtEpI4y3KuFX97tym6VVzxEHVNT8A' },
        { n: 3, title: 'Antiépileptiques', ext: P, mb: '0', fid: '1q88FKEEtDXr2lO7EfvHCnauGGNNsMTin' },
        { n: 4, title: 'Antipsychotiques', ext: P, mb: '0', fid: '1DZXY3W9shup_WXycaiTQt9H4yz8d4xvk' },
        { n: 5, title: 'Anxiolytiques', ext: P, mb: '0', fid: '1ygcrNPXrSRYZlejsrA5QclCvscU4Foq4' },
        { n: 6, title: 'Hypnotiques', ext: P, mb: '0', fid: '1tROnXce0xGl6wrKml9K5MIUQ2B8aWoFh' },
        { n: 7, title: 'Parkinson et Alzheimer', ext: P, mb: '0', fid: '13uwMRMFlSWKU76gMrYYULihCLVPAajST' },
      ],
    },
    {
      title: 'Pharmacologie',
      lectures: [
        { n: 8, title: 'Médicaments de Parkinson', ext: P, mb: '0', year: 2020, fid: '1EWAx6LjQ1IA0d-BEQugO_lpeKxPbCJHC' },
        { n: 9, title: 'Médicaments d’Alzheimer', ext: P, mb: '0', year: 2020, fid: '1dhEN54M0HSWa66AAHAxq49KOjIDkL1pq' },
        { n: 10, title: 'Antiépileptiques', ext: P, mb: '0', year: 2020, fid: '1_7MlfBgkKVMkM-ES29g1xOAtsEkRBu_W' },
        { n: 11, title: 'Antimigraineux', ext: P, mb: '0', year: 2020, fid: '1CvwBrK2dft7_gMUI1_twNExwJERjpddt' },
        { n: 12, title: 'Pharmacologie des anesthésiques', ext: P, mb: '0', fid: '1Lz7LhQCIS9oz5F22PvQ2gCO9CDmnN-xF' },
        { n: 13, title: 'Antipsychotiques', ext: P, mb: '0', year: 2020, fid: '1qolt5KdGws-HHPOMjqw90rA426cjjMSA' },
        { n: 14, title: 'Les médicaments de la sclérose en plaques', ext: P, mb: '0', fid: '1IWdvRaLvcWt5oeCfl_RXVHHpVHJPBSnD' },
        { n: 15, title: 'Les antidépresseurs', ext: P, mb: '0', fid: '1mN6quR58XxEfT9F19wBbDqDnTh8_PqcZ' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Sémiologie', icon: 'book',
      items: [
        { title: 'Épilepsies', ext: X, mb: '0', fid: '1kr6muobKq-wfsY5iTwp2goA6YUfTGxOc' },
        { title: 'Cours d’AVC', ext: P, mb: '0', fid: '1UBO4EqdDyaWf2oyQoXBWzi0Tx9ng6yAi' },
        { title: 'Troubles anxieux et TOC', ext: X, mb: '0', fid: '1aarPBqlCeyMwSX80GWrmNmUlXWKuS7ee' },
        { title: 'Les psychoses chroniques', ext: X, mb: '0', fid: '1q-_3YXfSJvk-OxtOEHPxvjSE4hsA_7FG' },
        { title: 'Maladie maniaco-dépressive — trouble de l’humeur', ext: X, mb: '0', fid: '1KjOs51lAbM8CT4HIAcC8BhEdJx2VyGFa' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'CC1 — correction isolés et examens', ext: P, mb: '0', fid: '1CI84FKtVvBe7bANTSOmA2L825QQiY_GV' },
        { title: 'CC1 — 2026, session de contrôle', ext: P, mb: '0', year: 2026, fid: '1d_wGXoDl1ZzqasZh5Q4kvjv0dfLwmNwa' },
        { title: 'Correction — annale CC1, 2026', ext: P, mb: '0', year: 2026, fid: '1ZWfeD9DlhpBBKBrakq3lYfRiwAksUWE5' },
      ],
    },
  ],
};

export const DCEP2_ENDOCRINO_METABOLIQUE = {
  id: 'dcep2-endocrino-metabolique', promo: 'dcep2', semester: 'S1',
  name: 'ENDOCRINO-MÉTABOLIQUE (CC4)', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Chimie thérapeutique',
      lectures: [
        { n: 1, title: 'Vitamines', ext: P, mb: '0', fid: '1qZCNw7Q85pDJPCbmbaXSLSWEhT-6Ksb5' },
        { n: 2, title: 'Médicaments de la thyroïde', ext: P, mb: '0', fid: '1vkc7AW-5-ap3xQqN4EV7WeRb2CSNSrRP' },
        { n: 3, title: 'Médicaments du diabète', ext: P, mb: '0', fid: '1cLyoADA2cVB98fYkFR9w7r1Tc9vJyeHN' },
        { n: 4, title: 'Médicaments hypolipémiants', ext: P, mb: '0', fid: '17WhRlC5nBWRfL266bhoExk4CJXAhxmri' },
        { n: 5, title: 'Médicaments stéroïdes', ext: P, mb: '0', fid: '1GlTs5QB_TjkhW6-ljZjVpOHkbQE5Zugg' },
      ],
    },
    {
      title: 'Pharmacologie',
      lectures: [
        { n: 6, title: 'Hypolipémiants', ext: P, mb: '0', year: 2020, fid: '1Fu83BYRKaOgKnSgBxbPKpuOQAgCdRV7L' },
        { n: 7, title: 'Antidiabétiques — partie 1', ext: P, mb: '0', fid: '1XOJJaw5B-I0O90bCzfzOhZc8mBenSeyN' },
        { n: 8, title: 'Antidiabétiques — partie 2', ext: P, mb: '0', fid: '1teThRX7_Vj3Ek3VsiIpZpZrvSEvekmhv' },
        { n: 9, title: 'Médicaments des dysfonctionnements thyroïdiens', ext: P, mb: '0', fid: '1L2YBCrFg9BRE2M7Yd9h5Zv-JYlcfxtKe' },
        { n: 10, title: 'Pharmacologie des hormones stéroïdiennes sexuelles', ext: P, mb: '0', year: 2024, fid: '1U1dlFcWUnBgAUHSlsbxzZdqbsYLMdBPl' },
      ],
    },
    {
      title: 'Biochimie',
      subtitle: 'Explorations métaboliques et endocriniennes',
      lectures: [
        { n: 11, title: 'Exploration du métabolisme phosphocalcique', ext: P, mb: '0', fid: '1r8wjUNUaDEfkZbZGd2eSmZd7v-O5yWbY' },
        { n: 12, title: 'Exploration du métabolisme lipidique', ext: P, mb: '0', fid: '1WsMIDOPxFb10m3_ZYPQ8cFLkvXW0lHRu' },
        { n: 13, title: 'Exploration de l’équilibre acido-basique', ext: P, mb: '0', fid: '18JXtiN-C9dWEIV8tASaZCTsrNK2EQVV_' },
        { n: 14, title: 'Exploration corticosurrénalienne', ext: P, mb: '0', fid: '1nrV-ZhU-EulMIE3guVp04yoBlvERp0_e' },
        { n: 15, title: 'Exploration du diabète', ext: P, mb: '0', fid: '1v8MZr-i9fVksLAfxVJdWrHhcIEGrU4bP' },
        { n: 16, title: 'Exploration hydro-électrolytique', ext: P, mb: '0', fid: '1365D51ztDsFg9rPlyVSGUILRE8ceJIu1' },
        { n: 17, title: 'Exploration hypothalamo-hypophysaire', ext: P, mb: '0', fid: '13omsw48LvblN9gWGpbwJ4IJTevGhHTm5' },
        { n: 18, title: 'Exploration de l’ovaire', ext: P, mb: '0', fid: '1MRGE8cRLmT8ANU4UyDz8iaAN2U31Ip8B' },
        { n: 19, title: 'Exploration des androgènes', ext: P, mb: '0', fid: '1-AkbFYUjSBX8src0SvxOhgepAD50DClh' },
        { n: 20, title: 'Exploration des catécholamines', ext: P, mb: '0', fid: '16eJg9kUs_d6ZYL91oxZv7UNCN29aM6ag' },
        { n: 21, title: 'Les maladies héréditaires du métabolisme', ext: P, mb: '0', fid: '1T7lRawbtA0FKGuxcEEs7vcbeAXXWLtI0' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Sémiologie', icon: 'book',
      items: [
        { title: 'Présentation — diabète (pharmacie)', ext: P, mb: '0', fid: '1DQYNllwWWX9SbmiMGqFwehnjQpCcXKkB',
          versions: [{ title: 'Présentation — diabète', ext: PT, mb: '0', fid: '1if6Zq-YIFCJYH1QfPC-iZIiHG9q_xedL' }] },
        { title: 'Présentation — dyslipidémie', ext: P, mb: '0', fid: '10jYkYVFrFtFQN-6fOQEzw_pBbvbh2zGE' },
        { title: 'Présentation — hyperthyroïdie (pharmacie)', ext: PT, mb: '0', fid: '14SAeGztR_e8SpE7j5_Z8tNlD9WzTlNDJ' },
        { title: 'Présentation — hypothyroïdie (pharmacie)', ext: PT, mb: '0', fid: '14QxMpiqWyDTCeZIozQocklFrDWVpUzwq' },
        { title: 'Présentation — insuffisance surrénale (pharmacie)', ext: P, mb: '0', fid: '1Lz7dqvQu_cN8Fm96GGLwmN7AKnUOHUjc' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Correction — annale CC4, 2026', ext: P, mb: '0', year: 2026, fid: '1SiL0mCTTdjb-SRd8b1Z7oUV2U98050jq' },
      ],
    },
  ],
};

export const DCEP2_TOXICOLOGIE = {
  id: 'dcep2-toxicologie', promo: 'dcep2', semester: 'S1',
  name: 'TOXICOLOGIE', icon: 'alert', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Toxicologie',
      lectures: [
        { n: 1, title: 'Support de cours de toxicologie — 2025', ext: P, mb: '0', year: 2025, fid: '1CKSzYD-d3jZHLwTml8Wj-dmeDz-SySDW' },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale de toxicologie', ext: P, mb: '0', fid: '1Q7_1y2SiOy6w9MkSnIoQXkFkXhISTQ7b' },
      ],
    },
  ],
};

export const DCEP2_HEMATOLOGIE = {
  id: 'dcep2-hematologie', promo: 'dcep2', semester: 'S1',
  name: 'HÉMATOLOGIE', icon: 'heart', tint: 'purple',
  professors: ['Boullah', 'Ghaber'],

  chapters: [
    {
      title: 'Hématologie clinique',
      lectures: [
        { n: 1, title: 'Hématologie clinique', ext: P, mb: '0', fid: '1JxbFySIy-pqm9TiUAtA6disOrIQzFH1X' },
      ],
    },
    {
      title: 'Hématologie générale',
      subtitle: 'Boullah, Ghaber',
      lectures: [
        { n: 2, title: 'Le sang et l’hématopoïèse', ext: P, mb: '0', prof: 'Boullah', fid: '1cWQfWYNo-i1E2WPa5mJE78YG6T1xPkWR' },
        { n: 3, title: 'Physiologie et exploration de la coagulation', ext: PT, mb: '0', prof: 'Boullah', fid: '1pr77JwyG1s-2FIWPUVyEPmRjiDGLomXr',
          versions: [{ title: 'Physiologie et exploration de la coagulation', ext: P, mb: '0', prof: 'Ghaber', fid: '1XaZPwZ7YWUE4ATIot7918iRmIIpF0K2J' }] },
        { n: 4, title: 'Érythropoïèse', ext: P, mb: '0', prof: 'Boullah', fid: '1mJgEPR6irwhZd3cm3nGZulOCG061BtM0' },
        { n: 5, title: 'Groupes sanguins', ext: X, mb: '0', prof: 'Boullah', fid: '1-G1NSeqva7WqA3gAvHKr81yM2UBSINSK' },
        { n: 6, title: 'Hémostase primaire — 2025', ext: X, mb: '0', year: 2025, prof: 'Boullah', fid: '19HEJHmHCVoOm97SOCsGi35a7KEiTyeM0' },
        { n: 7, title: 'La transfusion sanguine, pour infirmiers', ext: X, mb: '0', prof: 'Boullah', fid: '1W7ATOJ5tjgvV8nbLSrYeIds_M6Fs6xnQ' },
        { n: 8, title: 'Le sang et l’hémogramme', ext: P, mb: '0', prof: 'Boullah', fid: '1SfP48azL96rIwH5dxtNbrjkiurDSDQKm' },
        { n: 9, title: 'Lymphocytes et monocytes', ext: X, mb: '0', prof: 'Boullah', fid: '1l1ISGLwFTsQBaENxkCQ3D8KExEue7oSl' },
        { n: 10, title: 'L’hématopoïèse', ext: P, mb: '0', prof: 'Boullah', fid: '1Q39CV50T55L-9DX9wrN7oJ3TwBPYoouM' },
      ],
    },
  ],

  sections: [],
};

export const DCEP2_GALENIQUE = {
  id: 'dcep2-galenique', promo: 'dcep2', semester: 'S1',
  name: 'PHARMACIE GALÉNIQUE', icon: 'flask', tint: 'orange',
  professors: ['Belssem', 'Iman', 'Med Aly Youssfi'],

  // The `Examen` folder's own `Isolés` subfolder was not opened.
  chapters: [
    {
      title: 'Formes galéniques — Belssem',
      subtitle: 'Belssem',
      lectures: [
        { n: 1, title: 'Article de conditionnement', ext: P, mb: '0', prof: 'Belssem', fid: '13hBiSc9ZJsVANmY8zFj6DOhSZd_F6Viv' },
        { n: 2, title: 'La fabrication des vaccins', ext: P, mb: '0', prof: 'Belssem', fid: '1bXnZcrlHOsomlPBRhy_JP9lBKMiy-3_t' },
        { n: 3, title: 'Les adjuvants de valorisation des médicaments', ext: P, mb: '0', prof: 'Belssem', fid: '157LlK4ECyphQ4AvmGYQ-pAO6EuqGopDj' },
        { n: 4, title: 'Les préparations de remplissage vasculaire', ext: P, mb: '0', prof: 'Belssem', fid: '1zDy_goNxTGpZsWXFZP_fLAV2ELRcRnwm' },
        { n: 5, title: 'Les préparations d’insuline', ext: P, mb: '0', prof: 'Belssem', fid: '16Cs69ovcHVN46BrAS9aN02yByKYkhzOx' },
      ],
    },
    {
      title: 'Formes à libération modifiée — Iman',
      subtitle: 'Iman',
      lectures: [
        { n: 6, title: 'Formes à libération prolongée destinées à la voie parentérale', ext: P, mb: '0', year: 2021, prof: 'Iman', fid: '1cCSwkw3_JFPKeqgLYqjuTZq1auwQx90f' },
        { n: 7, title: 'Biodisponibilité, bioéquivalence — étude in vitro', ext: P, mb: '0', prof: 'Iman', fid: '1Lvu2z9wZB1dnA8GjFNEyIj8eFHO8hky2' },
        { n: 8, title: 'Dispositifs transdermiques', ext: P, mb: '0', prof: 'Iman', fid: '16pXBrAYB_ls96ERF6y4OfAZu9fBw-8gb' },
        { n: 9, title: 'Formes à libération prolongée — voie oculaire', ext: P, mb: '0', prof: 'Iman', fid: '16AWxRDd87a3Zb6q5oe-YfwD0WfQ-sQcg' },
        { n: 10, title: 'Formes à libération modifiée destinées à la voie orale', ext: P, mb: '0', prof: 'Iman', fid: '1ovDC738XyjPLB43lqQgXrOpr5SAKVqbL' },
        { n: 11, title: 'Sphéroïdes et formes vectorisées', ext: P, mb: '0', prof: 'Iman', fid: '1UwrhaM1kq0jYi0FxvrIKeVjqihMmkLc5' },
      ],
    },
    {
      title: 'Dessiccation et lyophilisation — Med Aly Youssfi',
      subtitle: 'Med Aly Youssfi',
      lectures: [
        { n: 12, title: 'La dessiccation', ext: X, mb: '0', prof: 'Med Aly Youssfi', fid: '14JBC0vBCujwOWqsxOp0gpuW6RxgCfBV5' },
        { n: 13, title: 'Lyophilisation', ext: X, mb: '0', prof: 'Med Aly Youssfi', fid: '1Fz8raiBrFyt2wJbIXfV0VcVj34KWUA5e' },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale de galénique — 2026', ext: P, mb: '0', year: 2026, fid: '1gm6G5ipBJ22CtvrQ01Gd_S2OaUGZdgJl' },
        { title: 'Correction — annale de galénique DCEP2', ext: P, mb: '0', prof: 'Brahim', fid: '18OZm9M2OJTaAM8fjBSasUVVjNTVvJnnZ' },
        { title: 'Correction — annale galénique 4, 2026', ext: P, mb: '0', year: 2026, fid: '1_iLGYl2L2gkJERbBxCtd9Rp0bBtAEeFr' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// S2
// ---------------------------------------------------------------------------

export const DCEP2_CARDIO_RENAL = {
  id: 'dcep2-cardio-renal', promo: 'dcep2', semester: 'S2',
  name: 'CARDIO-RÉNAL (CC2)', icon: 'heart', tint: 'orange',
  professors: [],

  // Pharmacologie's own `Isolés` and Sémiologie's `Cardio`/`Nephro`
  // professor folders were not opened.
  chapters: [
    {
      title: 'Chimie thérapeutique — cardiovasculaire',
      lectures: [
        { n: 1, title: 'Insuffisance cardiaque', ext: P, mb: '0', year: 2026, fid: '1oI9uWGaYUeTYK5A8BGvhNmhFtnM6AzkH' },
        { n: 2, title: 'Inhibiteurs calciques', ext: P, mb: '0', year: 2025, fid: '1zxEa_8SDuKlmkyXURw3ntKJJcae7sfx-' },
        { n: 3, title: 'Médicaments de l’hémostase', ext: P, mb: '0', year: 2026, fid: '1t3mmOvISsQB6139czbEc-R0sPBV7qfKs' },
        { n: 4, title: 'Antiangoreux', ext: P, mb: '0', year: 2026, fid: '10lv5YOvwUiNbmNsRESkCD5j0lCdth7z_' },
        { n: 5, title: 'Antiarythmiques', ext: P, mb: '0', year: 2026, fid: '1wNRU_GB5K3n1gvXV0fHOuGjb7YsvMCzx' },
        { n: 6, title: 'Inhibiteurs de l’enzyme de conversion (IEC)', ext: P, mb: '0', year: 2026, fid: '1WX9QN6btamHTN2iQIPi1c3GHjP0glIiZ' },
        { n: 7, title: 'Bêta-bloquants', ext: P, mb: '0', year: 2026, fid: '1SLkgrPuHynDNJNNUPL4VkiqTm-qiqz31' },
        { n: 8, title: 'Diurétiques', ext: P, mb: '0', year: 2026, fid: '1l5r464aCah7U-QwoNk8vVffKETLTEiSW' },
      ],
    },
    {
      title: 'Biochimie — exploration cardiaque et rénale',
      lectures: [
        { n: 9, title: 'Exploration biochimique myocardique', ext: P, mb: '0', fid: '1WL0ZTIyhxGaLV-crCBYRTP7TZO2SorVA' },
        { n: 10, title: 'Exploration fonctionnelle rénale', ext: P, mb: '0', fid: '12dtIHe_34htLgQg-vICpTYb8PvWnDBKy' },
        { n: 11, title: 'Lithiase rénale', ext: P, mb: '0', fid: '1mywjAjQvaQdHKUBIMGr_n9OuW5ucFSGR' },
      ],
    },
  ],

  sections: [],
};

export const DCEP2_INFECTIOLOGIE = {
  id: 'dcep2-infectiologie', promo: 'dcep2', semester: 'S2',
  name: 'INFECTIOLOGIE (CC3)', icon: 'micro', tint: 'purple',
  professors: [],

  // Chimie thérapeutique's own `Isolés` subfolder, and Sémiologie's
  // `Hasmio`/`Soufian` professor folders, were not opened. CC3's own
  // Pharmacologie folder holds no files.
  chapters: [
    {
      title: 'Chimie thérapeutique — anti-infectieux',
      lectures: [
        { n: 1, title: 'Sulfamides', ext: P, mb: '0', year: 2026, fid: '1nkU0JenpDKeJsHYjtAsgMo6Ev7rwH180' },
        { n: 2, title: 'Glycopeptides', ext: P, mb: '0', fid: '1BFq-_2Oevrk1_49RLuR-0nYWmu2ZQGVD' },
        { n: 3, title: 'Aminosides', ext: P, mb: '0', year: 2026, fid: '1-cYzv0ujgz79qdompdmXRPDubvnBScsV' },
        { n: 4, title: 'Antifongiques', ext: P, mb: '0', year: 2026, fid: '18R3MIuS9Jf5VqatGUNubxrrTwSwjiPfj' },
        { n: 5, title: 'Antihelminthiques et antiprotozoaires', ext: P, mb: '0', year: 2026, fid: '1JZ5_8sPRSmnfHJocVga9zIO4XiHf--SZ' },
        { n: 6, title: 'Antipaludiques', ext: P, mb: '0', year: 2026, fid: '1V4UpxUG9mdunyQDtufAFh6LYWKMzWW85' },
        { n: 7, title: 'Antituberculeux', ext: P, mb: '0', year: 2026, fid: '1Hkm4Ae_CYD4u8B4VmWFs2ZC_zxDIhKlx' },
        { n: 8, title: 'Macrolides', ext: P, mb: '0', fid: '11niqnPucOgn-28XFYeuTx7XJTZmZKsHQ' },
        { n: 9, title: 'Antiviraux', ext: P, mb: '0', year: 2026, fid: '1Qcn_7PFFdoHYAijU3ZEqoiKFdcGeDk7s' },
        { n: 10, title: 'Quinolones antibactériens', ext: P, mb: '0', year: 2026, fid: '1D-7q1SguFvbnhX1d58Fm-KikWGTo_XkO' },
        { n: 11, title: 'Tétracyclines', ext: P, mb: '0', year: 2026, fid: '1QhmE_AKFa3qbiwKEo-JYgC58g8lmOhtP' },
        { n: 12, title: 'Bêta-lactamines', ext: P, mb: '0', fid: '1WHi-kfuVUsxWVRCNG4lmt7rN3MfjJpPK' },
      ],
    },
  ],

  sections: [],
};

export const DCEP2_PHARMACOGNOSIE = {
  id: 'dcep2-pharmacognosie', promo: 'dcep2', semester: 'S2',
  name: 'PHARMACOGNOSIE', icon: 'flask', tint: 'purple',
  professors: [],

  // The `Isolés` subfolder here was not opened.
  chapters: [],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale de pharmacognosie — 2026', ext: P, mb: '0', year: 2026, fid: '18XrhZv8Gj8icKnpa1w0Fr3Mbshdzll0K' },
      ],
    },
  ],
};

export const DCEP2_INFERTILITE = {
  id: 'dcep2-infertilite', promo: 'dcep2', semester: 'S2',
  name: 'INFERTILITÉ', icon: 'baby', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Infertilité et procréation médicalement assistée',
      lectures: [
        { n: 1, title: 'Exploration de l’infertilité féminine — Mauritanie', ext: P, mb: '0', year: 2026, fid: '1qVHLCTdW1Bde8WL3LukID_SRqvtVr_5G' },
        { n: 2, title: 'Exploration de l’infertilité masculine — Mauritanie', ext: P, mb: '0', year: 2026, fid: '1XJkEYMgSoWhNzE0dPkEgu6Na1JO4J6vW' },
        { n: 3, title: 'Infertilité infectieuse — Mauritanie', ext: P, mb: '0', year: 2026, fid: '1uYBUZqYZYnbt93MGWqH5upVn0PIa_nD4' },
        { n: 4, title: 'Techniques d’AMP', ext: P, mb: '0', year: 2026, fid: '1Jsn-H4i7u2avSkOnRFTSOdroqsEL4y_O' },
        { n: 5, title: 'Traitement — AMP', ext: P, mb: '0', fid: '151aQkfUEWiz-QsKJvvmdd407Vbe8w9Oo' },
        { n: 6, title: 'Aspects éthiques et juridiques de l’AMP', ext: P, mb: '0', year: 2026, fid: '14ypleMqyrcy9dRkE6oPgGHUoGh3YPuq-' },
        { n: 7, title: 'Cours de DPI (diagnostic préimplantatoire)', ext: P, mb: '0', year: 2026, fid: '1BHbJ2eb-zEhSpubwPOKHaoHKDhFwg0ZT' },
        { n: 8, title: 'Préservation de la fertilité', ext: P, mb: '0', fid: '1ho7Z-mQt_XLz_RKkb4LLVz2vbeZmqbJN' },
        { n: 9, title: 'Hémoglobinopathies', ext: P, mb: '0', year: 2026, fid: '1idno3052GRVVH0g7io3PgHxEiq2KDA1e' },
        { n: 10, title: 'Infections et grossesse', ext: P, mb: '0', year: 2026, fid: '14-lI5i3DCMF3PzdHbQqxCO7tBi440znS' },
      ],
    },
  ],

  sections: [],
};

export const DCEP2_QUALITE = {
  id: 'dcep2-qualite', promo: 'dcep2', semester: 'S2',
  name: 'ASSURANCE QUALITÉ AU LABORATOIRE', icon: 'shield', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Assurance qualité — Mauritanie',
      lectures: [
        { n: 1, title: 'Concepts généraux de la qualité', ext: P, mb: '0', fid: '1PWXPR3bzFa0Ypa1z2kJuVAAiMqQ9HW6z' },
        { n: 2, title: 'Les référentiels réglementaires et normatifs', ext: P, mb: '0', fid: '1f39Pr-51sJYes32guNV5AWjA58Vl_cIF' },
        { n: 3, title: 'Biologie clinique et organisation des LBM', ext: P, mb: '0', fid: '1B3DY5gD74qdJrbtHn2H5k080MpV-NQfj' },
        { n: 4, title: 'Structure documentaire — 2026', ext: P, mb: '0', year: 2026, fid: '1_oEGsKsBQrtWu98EVReloPE4h1dz2hv_' },
        { n: 5, title: 'Gestion des non-conformités et évaluation de la qualité', ext: P, mb: '0', fid: '1o-GZ1aYZi-QYtde7wNHDlBZLS3CveeAH' },
        { n: 6, title: 'Exigences techniques — partie 1', ext: P, mb: '0', fid: '1uEfcJ5BkRs7Z0Etatw0qrhJzcqim1D16' },
        { n: 7, title: 'Exigences techniques — partie 2', ext: P, mb: '0', fid: '17U8xkmSjvB4KGaRIcAs27ktd2owfx2HN' },
        { n: 8, title: 'Exigences techniques — partie 3', ext: P, mb: '0', fid: '1I5P0k7rK6-aSVnv-FdpBeJV4DAJI1uFE' },
        { n: 9, title: 'Validation des méthodes', ext: P, mb: '0', fid: '1KO__Z89yDUBs02YsqalNDzf4IXdcnBDF' },
        { n: 10, title: 'Gestion des risques biologiques et chimiques', ext: P, mb: '0', fid: '1Xm0JhPnUbgKPhp20gzUNcPro2T9pFj4O' },
      ],
    },
  ],

  sections: [],
};

export const DCEP2 = [
  DCEP2_NEURO_PSYCHIATRIE,
  DCEP2_ENDOCRINO_METABOLIQUE,
  DCEP2_TOXICOLOGIE,
  DCEP2_HEMATOLOGIE,
  DCEP2_GALENIQUE,
  DCEP2_CARDIO_RENAL,
  DCEP2_INFECTIOLOGIE,
  DCEP2_PHARMACOGNOSIE,
  DCEP2_INFERTILITE,
  DCEP2_QUALITE,
];
