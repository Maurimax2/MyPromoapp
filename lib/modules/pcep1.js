// PCEP1 — pharmacy, first year, organised.
//
// Source: the `ARCHIVE MOHAMED YESLEM CHOUMAD` Drive (1VJeDKQAg0d-RD2qhmzB9nHojUGVrtxlq).
// Its `PCEP1` folder is one student's whole year, S1 and S2, a folder per
// subject. The year is PCEP1 and not PCEM1 by its own content: CHIMIE
// ORGANIQUE and CHIMIE PHYSIQUE, which medicine does not take, and papers
// headed «PCEP1-PCED1». The same Drive has a `PCEP2` folder whose S1 and S2
// are both empty — see pcep2.js.
//
// Much of S1 is taught with medicine (Kebir and Khadijetou Ba in biochimie,
// Kébé in biologie, Dogui in physiologie), but it is not PCEM1's S1: the
// anatomy is Moulay Idriss's course by systems, and the two chemistries are
// pharmacy's own. `promos.reads_from` still points PCEP1 at PCEM1's S1 as
// well, so until the owner changes that in the panel a PCEP1 student will see
// both years' ANATOMIE side by side. That is a decision about the year, not
// about this file.
//
// The second source is the pharmacy students' reference site
// (sites.google.com/view/pharmas). The site itself asks for a Google sign-in;
// the Drive folders it links to were readable. By their own file names —
// module codes like `1-C-GEN-M2`, the Tunisian UVT code lists — they are the
// Faculté de pharmacie de Monastir's first year, the same faculty whose
// papers sit in FMPOS's DCEP1 Drive under `Monastir`. Its material is filed
// under the FMPOS subject it matches, in its own two sections («Cours —
// Monastir», «Examens — Monastir»), never numbered in with FMPOS's lectures.
// What Monastir teaches and FMPOS's PCEP1 does not — Medical English,
// philosophie des sciences et droits de l'homme, secourisme, pharmacie
// galénique — is left out, as are its timetables and code lists, a `.xps`
// nothing here can open, Google Docs copies of PDFs already listed, and every
// shortcut whose target could not be reached (Pr Manel Ayoub's five glucides
// files, Pr Ahlem Karoui's chimie des solutions, Pr Najla Ayachi's
// électrostatique).
//
// Same rules as medicine: French titles, the same material by other hands is
// a `version`, exact duplicates (same name, same byte count) keep one copy,
// macOS `._` and `.DS_Store` debris is dropped. The sixteen algorithmique
// videos in MATHS-STATISTIQUES-INFORMATIQUE are not listed: the file viewer
// reads documents, and a video handed to it would spin for ever. The Drive's
// `GRILLE GÉNÉRALE` is a grid, not study material.
//
// `year` is the year in the file name; for an academic year («2024-2025») it
// is the second, the year of the exam session. SN is a session normale, SC a
// rattrapage.

const P = 'PDF';
const J = 'JPG';
const X = 'PPTX';

// ---------------------------------------------------------------------------
// S1
// ---------------------------------------------------------------------------

// Ten files in `COURS MOULAY IDRISS`, one per system. Drive sorts them by
// name; here they run in the order the course is taught, which is also the
// order Monastir numbers its own version of it, chapitre 0 to 9.
export const PCEP1_ANATOMIE = {
  id: 'pcep1-anatomie', promo: 'pcep1', semester: 'S1',
  name: 'ANATOMIE', icon: 'person', tint: 'purple',
  professors: ['Moulay Idriss'],

  chapters: [
    {
      title: 'Anatomie des appareils et systèmes',
      subtitle: 'Moulay Idriss',
      lectures: [
        { n: 1, title: 'Anatomie', ext: P, mb: '2.0', prof: 'Moulay Idriss', fid: '1HWLJLqf3sFtQ8WKzApEXvqnJ6yA0_h2-' },
        { n: 2, title: 'Appareil locomoteur', ext: P, mb: '4.5', prof: 'Moulay Idriss', fid: '1bxFlSpq6HvKM9epQhFFApWJqwMmviC47' },
        { n: 3, title: 'Système nerveux', ext: P, mb: '2.0', prof: 'Moulay Idriss', fid: '1kiSRiSJ8Kv8AEv-LO0DP-3XTI8SeVcUD' },
        { n: 4, title: 'Organes des sens', ext: P, mb: '1.0', prof: 'Moulay Idriss', fid: '15hSYHkoYy_kQR5htqIEOqD_eNrkT5_lX' },
        { n: 5, title: 'Appareil cardiovasculaire', ext: P, mb: '1.4', prof: 'Moulay Idriss', fid: '1nvkhji95EOONGuv7HTMw08910igQrdaD' },
        { n: 6, title: 'Appareil respiratoire', ext: P, mb: '1.1', prof: 'Moulay Idriss', fid: '1eWhTvBqjtXuZAYn2Lj01DNSMPOmRLNVa' },
        { n: 7, title: 'Appareil digestif', ext: P, mb: '1.5', prof: 'Moulay Idriss', fid: '1DTOUPQhWkqJSmroKFA4SlHLryMz2mDT9' },
        { n: 8, title: 'Système endocrinien', ext: P, mb: '1.6', prof: 'Moulay Idriss', fid: '1TaPyb-K7horqCd10PbpxFz8E3o3JZTMn' },
        { n: 9, title: 'Appareil urinaire', ext: P, mb: '1.0', prof: 'Moulay Idriss', fid: '1qXyPEZc5JO0g11BxtQ56RHrfxMsuFUPy' },
        { n: 10, title: 'Appareil génital mâle et femelle', ext: P, mb: '0.8', prof: 'Moulay Idriss', fid: '1f7_rN-bFtqCF-qo1Fs0m461F09xvUFMW' },
      ],
    },
  ],

  sections: [
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Anatomie générale — chapitre 0, introduction', ext: P, mb: '2.1', fid: '1nrzA_uVvaLCa3yjmJEDz7sNQIy3jHYWj' },
        { title: 'Anatomie générale — chapitre 1, appareil locomoteur', ext: P, mb: '3.0', year: 2022, fid: '1XYNEhiGfOz5kQ4cEJLQeK7V5YGt0xG23' },
        { title: 'Anatomie générale — chapitre 2, appareil de l’innervation', ext: P, mb: '2.1', year: 2023, fid: '1FLgIteEPdl09Z7SaoUKxmZSCUZt79Lak' },
        { title: 'Anatomie générale — chapitre 3, appareil sensoriel', ext: P, mb: '0.4', year: 2022, fid: '1i14FfxM5MP7aRd0gujY-gcZobe0zJ6rJ' },
        { title: 'Anatomie générale — chapitre 4, appareil circulatoire', ext: P, mb: '1.5', year: 2022, fid: '1R4EnXVaFkjugm7E6sxC-KV3PyRamKV8Y' },
        { title: 'Anatomie générale — chapitre 5, appareil respiratoire', ext: P, mb: '0.6', year: 2022, fid: '1n4XR8JXYxqWVZzWvZDDReroPXRgYymJK' },
        { title: 'Anatomie générale — chapitre 6, appareil digestif', ext: P, mb: '1.5', year: 2022, fid: '1hxNjvfPlQcQXx69i8gSuGE6zHppj0dHP' },
        { title: 'Anatomie générale — chapitre 7, appareil endocrinien', ext: P, mb: '0.6', year: 2022, fid: '1MZ5_Mo6CHCgdDLIpbmQY3GFt2VKA8_94' },
        { title: 'Anatomie générale — chapitre 8, appareil urinaire', ext: P, mb: '0.6', year: 2022, fid: '1gTeZCcXe0zafH3-UK_2rwV5Nkd9ov5Rn' },
        { title: 'Anatomie générale — chapitre 9, appareil de génération', ext: P, mb: '0.6', year: 2022, fid: '1fB-DHPux2Uj3TG2hGVuBjP3ydJvxEUA2' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2024 — session normale', ext: P, mb: '0.3', year: 2024, fid: '1onX9fr6espIYC2BbwzjtuvznterivvHd' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '0.7', year: 2023, fid: '1YLEmSvtKEfoiGHMUhUUsMrNXmYgLSo-d' },
        { title: 'Examens d’anatomie — Moulay, école de santé', ext: P, mb: '1.6', prof: 'Moulay Idriss', fid: '154zB3x8HGFlDqufNtozWGohqRLAeAzhi' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2024 — anatomie générale', ext: P, mb: '57.3', year: 2024, fid: '1QtbbRnNYin72sX7zScfOKppUHQSWM3KO' },
      ],
    },
  ],
};

// Two teachers, two halves, the way medicine's BIOCHIMIE is filed: Kebir's
// structural course (lipides, protéines) and Khadijetou Ba's (glucides,
// acides nucléiques). Ba's slides are the 2024-2025 edition; her older
// polycopiés hang off them as versions.
export const PCEP1_BIOCHIMIE = {
  id: 'pcep1-biochimie', promo: 'pcep1', semester: 'S1',
  name: 'BIOCHIMIE', icon: 'flask', tint: 'orange',
  professors: ['Kebir', 'Khadijetou Ba'],

  chapters: [
    {
      title: 'Lipides et protéines',
      subtitle: 'Kebir',
      lectures: [
        { n: 1, title: 'Les lipides', ext: P, mb: '3.0', prof: 'Kebir', fid: '1lyBM1Nt5lvBBV1P0G1IUnwXPNcsJ1NSc' },
        { n: 2, title: 'Les protéines', ext: P, mb: '0.5', prof: 'Kebir', fid: '1y0w1Uj_acuyD3UJ3TsZi1sorhCFD9jrd' },
        { n: 3, title: 'Fiches des lipides', ext: P, mb: '6.3', prof: 'Kebir', fid: '11ONaZgLuRUYmu_87UQ15_yFfy88bvrRa' },
        { n: 4, title: 'Toutes les fiches du cours', ext: P, mb: '3.6', prof: 'Kebir', fid: '1Hj761hMIGEWOBp9GaJ8prfjDqv6jUHnu' },
      ],
    },
    {
      title: 'Glucides et acides nucléiques',
      subtitle: 'Khadijetou Ba',
      lectures: [
        { n: 5, title: 'Les glucides', ext: P, mb: '22.4', year: 2025, prof: 'Khadijetou Ba', fid: '1hSMRSt6wukdDAXuc3TlYjvjYvy89qlov',
          versions: [
            { title: 'Les glucides — polycopié', ext: P, mb: '1.7', year: 2012, prof: 'Khadijetou Ba', fid: '1JgVdtJnxys8D5wiUEuhtN3S_sXDIK1Ut' },
            { title: 'Les glucides', ext: P, mb: '1.2', fid: '18AYEUL8sEEli3-GZILZKjoe_deAAvroT' },
          ] },
        { n: 6, title: 'Les acides nucléiques', ext: P, mb: '1.0', year: 2025, prof: 'Khadijetou Ba', fid: '11GsvfzWzCzeQpgcZSasRapKSvnaVBkNx',
          versions: [
            { title: 'Les acides nucléiques — polycopié', ext: P, mb: '17.2', year: 2017, prof: 'Khadijetou Ba', fid: '1liAHMblBhi1PsCiWZ9AzA6Ph93BnHkwa' },
          ] },
      ],
    },
  ],

  sections: [
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Structure des lipides', ext: P, mb: '2.7', prof: 'Nabila Ben Rejeb', fid: '1In5eXZUk3z5L-ygc0Wo8KhmOCfHRYWfc' },
        { title: 'Acides aminés, peptides et protéines', ext: P, mb: '2.6', prof: 'Yassine Chaabouni', fid: '14FJe7dSvf8HnezASsLbtw30LPG1jTHkw' },
        { title: 'Acides nucléiques — ADN et ARN', ext: P, mb: '3.7', year: 2021, prof: 'Selima Ferchichi', fid: '1gBpZ3ZpzqCbVbjFzMG0H-4i3ZimKVjGs' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — les protides', ext: P, mb: '1.4', fid: '1Ie26XdQTDKmzT2ufQjuDudiX9QOjwsu7' },
      ],
    },
    {
      id: 'notes', where: 'notes', title: "Notes d'étudiants", icon: 'file',
      items: [
        { title: 'Les lipides — Kebir, notes d’Ahmed et El Qadi', ext: P, mb: '28.1', prof: 'Kebir', fid: '1MCFLdx46JPfzYy1-feOxyN1oXdT4lvsk' },
        { title: 'Cahier — les lipides', ext: P, mb: '4.2', prof: 'Kebir', fid: '1NVYONeRYiCveS4kV8yk7FZkVufalWtYI' },
        { title: 'Les lipides — notes', ext: P, mb: '0.2', fid: '119f25D_uEOwHm5wVW-VHZ0Ltavk7-sK8' },
        { title: 'Les protides — notes', ext: P, mb: '27.5', fid: '15wohfaDrXtRTR1SHD6EI3rM9_1lsFAgl' },
        { title: 'Les acides aminés — notes', ext: P, mb: '1.5', fid: '1BZ7uPJlbOX1bQUJPuFEao5gU1Icux9Ur' },
        { title: 'Les feuilles de Kebir', ext: P, mb: '3.8', year: 2019, prof: 'Kebir', fid: '1qrRjWgHORyjvN1BAPTMp0pZyDQzxl9hR' },
        { title: 'Partie Kebir — notes de Cheikha', ext: P, mb: '6.1', prof: 'Kebir', fid: '1ra2RjRPfHlaOQNO5OjCotc2R0Mgb_ULg' },
        { title: 'Cahier du Pr Maarouf', ext: P, mb: '9.3', year: 2019, prof: 'Maarouf', fid: '1DrEqbyy0Rom_MzYwYXuzFb6W0lCkP3zF' },
        { title: 'Notes de cours — 2019', ext: P, mb: '37.2', year: 2019, fid: '1dZFbM32hTNHB5zvEshFzHwfAH9BiR5yv' },
        { title: 'Notes de cours — 2017', ext: P, mb: '3.8', year: 2017, fid: '13qm51Rfr7FVxwk2JJ5ueJpF0yPUPs73N' },
        { title: 'Seve Michel — page 11', ext: P, mb: '8.9', fid: '1vwg7vDDrk21jFDlKiG0SPYEqx_ZHEl03' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '1.1', year: 2025, fid: '162jPF0QJF2i5xTNfWKBg2SfXc0c3JhJp' },
        { title: 'QCM, QROC et examens de biochimie', ext: P, mb: '26.2', fid: '18hnkFDLEAkomPfoS21VXmZJLLBvtftv0' },
        { title: 'Kebir — examen 2025, session normale', ext: P, mb: '0.4', year: 2025, prof: 'Kebir', fid: '1uhx2m4yQtqLV_vtVQd_5lqyPps1aUfLj' },
        { title: 'Kebir — examen 2024, session normale', ext: P, mb: '0.5', year: 2024, prof: 'Kebir', fid: '1bPAh8d87dRbBaRc9wuWPzyaugB-vFfoG' },
        { title: 'Kebir — examen 2023, session normale', ext: P, mb: '0.2', year: 2023, prof: 'Kebir', fid: '16n1NG4iTUjOXz0XNiIOISwAzTaXQC-1H' },
        // Two files a few kilobytes apart under almost the same name — two
        // scans of the paper, so one entry with the other as a version.
        { title: 'Kebir — examen 2018, rattrapage', ext: P, mb: '0.2', year: 2018, prof: 'Kebir', fid: '1bm_35_fgzSna6sUGiChprEApfysDTlzM',
          versions: [
            { title: 'Kebir — examen 2018, rattrapage (autre copie)', ext: P, mb: '0.3', year: 2018, prof: 'Kebir', fid: '1edAJuYDk9fLqudvM7ZX9fz159VRVGYlf' },
          ] },
        { title: 'Kebir — examen 2017, rattrapage', ext: P, mb: '1.3', year: 2017, prof: 'Kebir', fid: '1N0pzI0PQpmHeqYC9JHCCRwWYb-Mt4nd7' },
        { title: 'Kebir — examen sur la structure des lipides', ext: P, mb: '0.8', prof: 'Kebir', fid: '1udReguW5szk3BfNUwvpJvd0gmcRfrjts' },
        { title: 'Kebir — devoir de révision', ext: P, mb: '0.1', prof: 'Kebir', fid: '1ntijDM9FRqSHnxxI_QDC8M6o2T9LR--h' },
        { title: 'Kebir — examens et corrections', ext: P, mb: '1.7', prof: 'Kebir', fid: '1h3-5-nAxF5OV1Q4lnaHnErTMjG_XJHxz' },
        { title: 'Khadijetou Ba — examen 2022, session normale', ext: P, mb: '0.4', year: 2022, prof: 'Khadijetou Ba', fid: '1CCC94RvyhSEmRr0vH-auHVLvYVrK_du1' },
        { title: 'Khadijetou Ba — examen 2021, session normale et rattrapage', ext: P, mb: '1.5', year: 2021, prof: 'Khadijetou Ba', fid: '17ghsUs1B3vmbchcjnrvw2ldd-vF0QkGW' },
        { title: 'Khadijetou Ba — examen 2019, session normale', ext: P, mb: '0.7', year: 2019, prof: 'Khadijetou Ba', fid: '1WfyRuu7LItsu6ylFYmEeuB8IDL2MaLhi' },
        { title: 'Khadijetou Ba — examen 2018, session normale', ext: P, mb: '1.1', year: 2018, prof: 'Khadijetou Ba', fid: '19UzYWM-zCqxB0RMRFdosseD-P8jjSErd' },
        { title: 'Khadijetou Ba — examen 2017, session normale et rattrapage', ext: P, mb: '1.1', year: 2017, prof: 'Khadijetou Ba', fid: '1xc5moQsPGkETHimSx4nv2mEl-Fl0oxW4' },
        { title: 'Khadijetou Ba — examen 2015, session normale', ext: P, mb: '0.9', year: 2015, prof: 'Khadijetou Ba', fid: '1lcgI-xyNZSOsZRlvthh1wOmP_46ZyUId' },
        // Three students' corrections of the same papers.
        { title: 'Khadijetou Ba — corrigé des examens', ext: P, mb: '0.5', prof: 'Khadijetou Ba', fid: '10Y8Pin51PlqP03ys2H6rKLj5WXud_WUW',
          versions: [
            { title: 'Khadijetou Ba — corrigé des examens, par Sadam', ext: P, mb: '21.0', fid: '1zZ0DUcuq0zX68ZvmTuDISFLTh5UFwSTC' },
            { title: 'Khadijetou Ba — corrigé des examens, par Vetate', ext: P, mb: '1.7', fid: '1-NxouML0K_zVr071wXu3NYZARuIxqGF1' },
          ] },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'QCM — Khadijetou Ba', ext: P, mb: '4.3', prof: 'Khadijetou Ba', fid: '12WjkMHpev127Q8jdtFA99xt6v1ngrZvB' },
        { title: 'QROC — Khadijetou Ba', ext: P, mb: '3.1', prof: 'Khadijetou Ba', fid: '1ol0pOhhtqfFwlHsReazP5799TpgRnDuo' },
        { title: 'TD — Khadijetou Ba', ext: P, mb: '0.9', prof: 'Khadijetou Ba', fid: '1ei5OVdLkOQgja20FjQKs3ngy_9BJeaCQ' },
        { title: 'QCM — biochimie', ext: P, mb: '0.2', prof: 'Kebir', fid: '17p-dhPAkyhbTwp4EChvn2Mn-LfMD5TjE' },
        { title: 'QCM — lipides', ext: P, mb: '4.1', prof: 'Kebir', fid: '1i7-GPykmiZf-sPngsM4e_4wj_ePEFybS' },
        { title: 'QCM — protéines', ext: P, mb: '2.5', prof: 'Kebir', fid: '1zYjSImoUidD8KD73Ckei28A0u3j7NY3_' },
        { title: 'Questionnaire de biochimie', ext: P, mb: '13.8', year: 2018, prof: 'Kebir', fid: '11n_WvTVodqFVoL0_A172yxUC_1SvVXuI' },
        { title: 'TD — lipides', ext: P, mb: '4.5', prof: 'Kebir', fid: '1SywtuuydR1Oh1RYMfTPJnvdOKR2h8TF-' },
        // Three byte-identical copies in Drive; one is kept. The smaller
        // «TD + corrigé» is a different document on the same TD.
        { title: 'TD — lipides, avec correction', ext: P, mb: '0.6', prof: 'Kebir', fid: '1CCVx3vtxYskkFgr-ztfnqhK6RQgRgfZp',
          versions: [
            { title: 'TD — lipides, corrigé', ext: P, mb: '0.4', prof: 'Kebir', fid: '11C2nBX_Irjdt07judbmh-qqjVmq2EZd3' },
          ] },
        { title: 'TD — Kebir', ext: P, mb: '3.8', prof: 'Kebir', fid: '1eUDZqIVdo0Ix2JwbNfmr5eVsawPwg-nM' },
        { title: 'TD — Kebir, scan de 2019', ext: P, mb: '5.9', year: 2019, prof: 'Kebir', fid: '1qzRvy9ZnU8U0ljHb3KqKsTYZ7HvZ6Ms2' },
        { title: 'TD de biochimie — PCEM1', ext: P, mb: '0.5', prof: 'Kebir', fid: '1ySb3XnI4U8QlMExeJ2TcdO9jh1QXXe4m' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2024 — biochimie structurale', ext: P, mb: '6.7', year: 2024, fid: '1meuPIs85P_kg_iIJEmnjIaw3ahnRbNPb' },
      ],
    },
  ],
};

// BIOLOGIE and GÉNÉTIQUE are two folders in Drive but one paper: every exam
// in either is «EXAMEN DE BIOLOGIE-GÉNÉTIQUE», and the two folders hold
// byte-identical copies of the same five. So one subject with two chapters —
// the same subject medicine calls BIOLOGIE ET GÉNÉTIQUE — and each paper once.
export const PCEP1_BIOLOGIE = {
  id: 'pcep1-biologie', promo: 'pcep1', semester: 'S1',
  name: 'BIOLOGIE ET GÉNÉTIQUE', icon: 'micro', tint: 'purple',
  professors: ['Kébé'],

  chapters: [
    {
      title: 'Biologie cellulaire',
      subtitle: 'Kébé',
      lectures: [
        { n: 1, title: 'Les constituants de la matière vivante', ext: P, mb: '2.3', prof: 'Kébé', fid: '1YLcV3YLyWDTClVWAHkjRXE1mX_ppPdfS',
          versions: [
            { title: 'Les constituants de la matière vivante — diapositives', ext: X, mb: '14.5', year: 2025, prof: 'Kébé', fid: '18_GGk3VejgU-s-67x90iNPbQXzyQadnb' },
          ] },
        { n: 2, title: 'La membrane plasmique', ext: P, mb: '23.8', prof: 'Kébé', fid: '1hRbKUQUPJYfX0hpRtuqnXNKSCT_P-tFx',
          versions: [
            { title: 'La membrane plasmique', ext: P, mb: '0.5', fid: '1bBTWOkHsDFbPvmfggfgolkh4rMg_jFnb' },
          ] },
        { n: 3, title: 'Les différenciations membranaires', ext: P, mb: '5.8', prof: 'Kébé', fid: '145m83ecughKYWWT2ptxoGw-yoUVoULWg' },
        { n: 4, title: 'Le cytosquelette', ext: P, mb: '26.6', prof: 'Kébé', fid: '1dIi0xXZHkr1MrT8OqjGYsntoPfkTNVVJ',
          versions: [
            { title: 'Le cytosquelette', ext: P, mb: '0.3', fid: '15swgcmDk2-TXm9psqnQGxum7m7nJfh2y' },
          ] },
        { n: 5, title: 'La méiose', ext: P, mb: '7.5', year: 2025, prof: 'Kébé', fid: '1y9XlIyTVfEZnMUqkwG6di-m-m7iAVOO6',
          versions: [
            { title: 'La méiose', ext: P, mb: '0.6', prof: 'Kébé', fid: '1QrR2643wr1H-bJRCbOptgryC2J1960in' },
          ] },
      ],
    },
    {
      title: 'Génétique',
      lectures: [
        { n: 6, title: 'Cours de génétique', ext: P, mb: '3.1', fid: '1DBPclMrUcOoaa-NpgPZ8drzq0GAjucKk' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Cours de biologie', ext: P, mb: '12.6', fid: '1Y8NfJ_OEsQcUJnrEm13ysl-pGTJmTvLc' },
      ],
    },
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Génétique humaine — support de cours', ext: P, mb: '3.3', year: 2025, fid: '1v6CAyNs43W-gG61MH7Ri-BwKzisUBWbg' },
        { title: 'Contenu du génome humain', ext: X, mb: '0.3', prof: 'Hend Chaker', fid: '1guGCfSj-gWWNLyIHqJABtcTp5ptEuiE3' },
        { title: 'Définitions', ext: X, mb: '0.2', prof: 'Hend Chaker', fid: '1u8Dmkr-O4JEiTbS_ZxFo63MajiFNE4Sc' },
        { title: 'Organisation et expression des gènes chez les eucaryotes', ext: P, mb: '2.0', prof: 'Hend Chaker', fid: '1TWWX9xUHLxc65tXIczagC6RoxEUhpfbQ',
          versions: [
            { title: 'Organisation et expression des gènes chez les eucaryotes — diapositives', ext: X, mb: '1.4', prof: 'Hend Chaker', fid: '1f9frHz-rOxCoB5fPkihUnMYVriUDvcEQ' },
          ] },
        { title: 'Variabilité génétique et mutations', ext: P, mb: '1.1', prof: 'Hend Chaker', fid: '1ojXrz5kRupOojdt5DoSOzxR2zrtEKFFm',
          versions: [
            { title: 'Variabilité génétique et mutations — diapositives', ext: X, mb: '0.5', prof: 'Hend Chaker', fid: '1P-djofqhVrnF3ioWaCQxmW00SXdX_KeR' },
          ] },
        { title: 'Diversité humaine et notion de polymorphisme', ext: P, mb: '1.3', prof: 'Hend Chaker', fid: '1FARgMVXFHd-F4JhBux31gYrTDAATpLQ1' },
        { title: 'Les techniques d’amplification', ext: P, mb: '1.4', prof: 'Hend Chaker', fid: '1E3nDBrrxwrDPOMRKMerJEvmRaB6aUGTk' },
        { title: 'Les techniques de séquençage', ext: P, mb: '1.1', prof: 'Hend Chaker', fid: '1CtvJMgv775rN9cLn69DQa-PKhSA5NO0W' },
        { title: 'Domaines d’application', ext: P, mb: '1.4', prof: 'Hend Chaker', fid: '1ouWzDG-NZ8qZv8vSjOIL9hlOfykmkj1K' },
        { title: 'Cytogénétique', ext: P, mb: '5.3', year: 2024, prof: 'Hend Chaker', fid: '1-wSm73w4rCXyrQH9al8W_mkw3xPYTOFx' },
        { title: 'Références complémentaires', ext: P, mb: '0.8', prof: 'Hend Chaker', fid: '1_CfDvip4VeD4wetwDRE8iZeuDezhG4dS' },
        { title: 'Génétique chromosomique — support de cours', ext: P, mb: '9.4', prof: 'Sana Sfar', fid: '1XRNL4fovejOYPzKVuo2AcSs9lRPwksmr' },
        { title: 'Caryotype humain', ext: P, mb: '1.1', prof: 'Sana Sfar', fid: '1Cnw-YvI70kmNIWJbdOWkOvc56Wz2Ik6v' },
        { title: 'Anomalies chromosomiques', ext: P, mb: '1.2', prof: 'Sana Sfar', fid: '1EmkHzM3rpahBzVBrEpTm7rx6dusKTvYi' },
        { title: 'Principaux syndromes cytogénétiques', ext: P, mb: '0.6', prof: 'Sana Sfar', fid: '1MBQ1iZjANRNRzn9AMrwLU9Q5l9uNnYxY' },
        { title: 'Génétique formelle', ext: P, mb: '11.5', prof: 'Sana Sfar', fid: '1KYSmbXWbIIrFNvEVtsN5lIm4sVpeMDLA' },
        { title: 'Diagnostic prénatal (DPN)', ext: P, mb: '0.7', prof: 'Sana Sfar', fid: '18ZeFfINBHUGjTEd3sD8zqnmexd1f441h' },
        { title: 'Biologie cellulaire — support de cours', ext: P, mb: '14.2', year: 2025, fid: '1aDS1fbXLzPvxEltssxwcgVIcEQVzNzkc' },
        { title: 'Biologie cellulaire — figures et tableaux', ext: P, mb: '9.0', year: 2025, fid: '1NDagibzilfBE060T9Pvj4QhxolxnOb3_' },
        { title: 'Biologie cellulaire — TD, série 1', ext: P, mb: '2.1', fid: '1qqNBDLdmp5RCraGat8BlUFASNf9pPPHW' },
        { title: 'Biologie cellulaire — TD, série 2', ext: P, mb: '2.1', fid: '119O4GQYxGqp0uy6K7zf6-JxDZ4OHs59V' },
        { title: 'Biologie cellulaire — TD, série 3', ext: P, mb: '1.6', fid: '12Hi5UkJLQwiUE-FQbo8V5fypWrwUfB8b' },
        { title: 'TP 1 — initiation à l’utilisation du microscope photonique', ext: P, mb: '0.4', fid: '1TXjH-62YVdVnXaUpPSBNx320CIqCyPY1' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — les constituants de la matière vivante', ext: P, mb: '7.7', fid: '1TC0WaJQdtmuxO7hS1aggOwF2Cda-_heb' },
        { title: 'Résumé — génétique', ext: P, mb: '0.7', fid: '1C0k2LfeU6vk7PrP33lYckCIvMiGjNV0Z' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.7', year: 2025, fid: '1aSMMYzyWNUGctyj7PGbrk0MP12RmBoT6' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '1.0', year: 2024, fid: '1UG4U9WmbvxCPDW6fp54OY2RloWZN15c1' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '3.0', year: 2024, fid: '1e8Xp0RbWlxmXVxQTe9WgIVVHFytGb_u8' },
        { title: 'Examen 2023 — session normale, avec correction', ext: P, mb: '0.8', year: 2023, fid: '1qyNctwIBQDWGL_t7_D8lrQVTMZumgdQf' },
        { title: 'Examen 2022 — session normale', ext: P, mb: '0.2', year: 2022, fid: '1fSNTRQdjq5mLTzDbLgoLi-1gTDe7ROsO' },
        { title: 'Examens de génétique, avec corrections', ext: P, mb: '22.0', fid: '1v3etKwWDfMQzcHY_FYpF0RTH84OZal9N' },
        { title: 'Examens et TD de biologie', ext: P, mb: '1.7', fid: '1EQtRyxSuYZhI0HUAhBKXToq5Yj3OI_gv' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD — Kébé', ext: P, mb: '0.9', prof: 'Kébé', fid: '18Tdnuncyr3rVg4DZltBLF4zpOJAiR79j' },
        { title: 'TD — Kébé, correction', ext: P, mb: '6.5', prof: 'Kébé', fid: '1jRA5l3c6nq_2bOPmW2uKFpZdHDr6B7dv',
          versions: [
            { title: 'TD — Kébé, autre correction', ext: P, mb: '3.1', prof: 'Kébé', fid: '1Fv2NgQgQWVY090s8yupPlv-4mCUWP2Ye' },
          ] },
        { title: 'TD — génétique', ext: P, mb: '0.2', fid: '175EFYBjQToocNXRkl1UNlUe21bnAlBnI' },
        { title: 'TD — génétique, correction', ext: P, mb: '3.4', fid: '1PP9rG1GpUBICCs5m-UU9QEPlgvqQCppa' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2025 — biologie cellulaire', ext: P, mb: '10.1', year: 2025, fid: '1PT1wC89E2JrqYBkBNXfdEZGXw-OzZoNM' },
      ],
    },
  ],
};

export const PCEP1_CHIMIE_ORGANIQUE = {
  id: 'pcep1-chimie-organique', promo: 'pcep1', semester: 'S1',
  name: 'CHIMIE ORGANIQUE', icon: 'flask', tint: 'purple',
  professors: ['Kenkou'],

  chapters: [
    {
      title: 'Chimie organique',
      subtitle: 'Kenkou',
      lectures: [
        { n: 1, title: 'Cours de chimie organique', ext: P, mb: '7.5', prof: 'Kenkou', fid: '1EkOmUX5Dg9PWFh1juL7YK0NOEjm5-hNz' },
        { n: 2, title: 'Les mécanismes réactionnels', ext: P, mb: '6.3', prof: 'Kenkou', fid: '1vLN-bQt_znPirGodwVE7s94QZ98hubqI',
          versions: [
            { title: 'Les mécanismes réactionnels', ext: P, mb: '0.7', fid: '1UDZUcVwAmE0e1m2kHL8mNmawQhROeaiT' },
          ] },
        { n: 3, title: 'Les principales réactions', ext: P, mb: '0.4', prof: 'Kenkou', fid: '1G9pZcL96N-qaldUUCxe4lIjgevybFTGz' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Cours de chimie organique — Oran', ext: P, mb: '2.1', fid: '1d1w8nw2i8JqEX-FwTkZ0X5P-wLNq4dEN' },
      ],
    },
    {
      id: 'livres', where: 'archive', title: 'Livres', icon: 'book',
      items: [
        { title: 'Livre de chimie organique', ext: P, mb: '10.1', fid: '1ff6LZrOJoDbcH9DLyM7Orkm63cyEKFvI' },
        { title: 'Les deux chimies', ext: P, mb: '4.2', fid: '11AV1u1nI7uuHg-Jjza6Qbz944p0sSrzl' },
        { title: 'Livre de chimie, avec exercices', ext: P, mb: '6.7', fid: '1WHl67KLMKzCEz9_wFZBdIbzxVr2nxhur' },
      ],
    },
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Chimie organique pharmaceutique 1 — support de cours', ext: P, mb: '4.2', fid: '1x0QfOsJSbLrjujMRDmj1Xu70NeIiugpX' },
        { title: 'Corrections des séries 1 à 4', ext: P, mb: '4.8', fid: '1Vzn_c17mllnRRnzkRWbSCRfCbnpOuqls' },
        { title: 'Correction des TD', ext: P, mb: '13.4', year: 2024, fid: '1PqjkIYPdugr4NN_8WkcwvwMuQ8sqYQDe' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé de chimie organique pour les TP', ext: P, mb: '1.1', fid: '1T9sWUbxNVkFSPx_dvMfwbjfA0HEe1ApC' },
      ],
    },
    {
      // The second file's name is Arabic in Drive («Kenkou told us»); it is
      // a student's notes of his lectures.
      id: 'notes', where: 'notes', title: "Notes d'étudiants", icon: 'file',
      items: [
        { title: 'Notes de cours — Kenkou', ext: P, mb: '49.1', prof: 'Kenkou', fid: '1VIqZrX_EfOynt6R4gVWYmuk2HUDYb69n' },
        { title: 'Cahier de chimie organique', ext: P, mb: '17.9', fid: '1YnPKU8H4Gjh2vImR8KT1YzYD-RW0SzRh' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.1', year: 2025, fid: '1r80pzFurQmKGsqBlDG-FExtKBGF5eARU' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '0.2', year: 2024, fid: '18e0FKDTfPZqdCDFcPJ332YI_7rwypJX6' },
        { title: 'Corrigé — examen 2024, session normale', ext: P, mb: '3.5', year: 2024, fid: '1aqYb6_8jXLAKM7jSKbDLtiXqdDs8dKp5' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '0.3', year: 2023, fid: '1TYrvcAXNUlKtw5e3bWCOI37F0OUFxAVb' },
        { title: 'Corrigé — examen 2023, session normale', ext: P, mb: '1.0', year: 2023, fid: '1USRYv2muLcpxC-kxmSB60NohWb9dLbqI' },
        { title: 'Examen 2023 — rattrapage', ext: P, mb: '0.2', year: 2023, fid: '1Kbe7o4dxqS-m1SUoSereJgGAvmZwl9uI' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD 1', ext: P, mb: '0.2', fid: '1cKsQxH1eE957_YWIEGQZw3JAETmOYnoM' },
        { title: 'TD 2', ext: P, mb: '0.1', fid: '1KVl3JGqKmcr-jv_i2Ge68UukEN-4dqyC' },
        { title: 'TD 3', ext: P, mb: '0.2', fid: '14xj6KYXTGOaVl3rwOpUCTe_x8OFvY3Fh' },
        { title: 'TD 4', ext: P, mb: '0.3', fid: '1ONjpac44EUoJmQea6aivT_-Sg7sXsVAl' },
        { title: 'TD 5', ext: P, mb: '0.2', fid: '1MWcsFnmhLldhZjBs2WolkNcXHU0SAhFe' },
        { title: 'TD 6', ext: P, mb: '0.5', fid: '1vUrJ3D5RoFI6QJY4Q6TBwkP4r9ousU9W' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2024 — chimie organique', ext: P, mb: '6.5', year: 2024, fid: '1KLAMbY0vBNDocSCD2m9ApxEGjyjw5_o5' },
      ],
    },
  ],
};

// The year's `TP` folder is chimie des solutions (a manipulation and its 2025
// exam) plus a sheet of lab equipment, so it is filed here, with the course
// the solutions belong to. Its `TP CHIMIE ORGANIQUE` folders are empty, and
// a stray copy of the whole `TP` folder inside HISTOLOGIE holds only a
// byte-identical copy of the same equipment sheet.
export const PCEP1_CHIMIE_PHYSIQUE = {
  id: 'pcep1-chimie-physique', promo: 'pcep1', semester: 'S1',
  name: 'CHIMIE PHYSIQUE', icon: 'atom', tint: 'orange',
  professors: ['Abdallahi'],

  chapters: [
    {
      title: 'Chimie physique',
      subtitle: 'M. Abdallahi',
      lectures: [
        { n: 1, title: 'Chimie physique — 1re partie', ext: P, mb: '2.5', prof: 'Abdallahi', fid: '1f8r7w65uph9W_tcjpgQP21t1gxTEWH4j' },
        { n: 2, title: 'Chimie physique — 2e partie', ext: P, mb: '1.7', prof: 'Abdallahi', fid: '1ka8FS0QVYoICxvBePHJUisign5OQJv2C' },
      ],
    },
  ],

  sections: [
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'TP de chimie des solutions — 1re manipulation', ext: P, mb: '18.0', fid: '1jfFhTIrYV0xxAN_debSdNzWOYzNDp0Bc' },
        { title: 'Matériel de TP', ext: P, mb: '0.2', fid: '1PPIrSl6rkT3FGMtDW6kBIHl3waNKADp6' },
      ],
    },
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Cours d’atomistique', ext: P, mb: '2.2', prof: 'Faouzi Ayari', fid: '1sOllGgV1K23P8t5PX9uNWnqjGcs7E-oz' },
        { title: 'Thermodynamique chimique', ext: P, mb: '12.2', year: 2024, prof: 'Hajer Trad', fid: '1krdgsyiP_QCVbH_loum4-407JSKvzpM6' },
        { title: 'Thermodynamique chimique — résumé 1', ext: P, mb: '4.3', prof: 'Hajer Trad', fid: '1mBMC5xpazJ01_2UorNj20MF1gHe0gt86' },
        { title: 'Thermodynamique chimique — document à compléter', ext: P, mb: '0.6', prof: 'Hajer Trad', fid: '1ooNbzoYIwF7OZvgLumlzmQWsrBgaWBR5' },
        { title: 'Chimie des solutions — corrigé des séries', ext: P, mb: '6.0', year: 2023, fid: '1ameHPpHcYU0EIaZXUfqtwS_g1vZQR91d' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.1', year: 2025, fid: '1LVLipgLFZNdWn6AJniBMKa_tiHXoAQLo' },
        { title: 'Examen de TP de chimie des solutions — 2025', ext: P, mb: '0.6', year: 2025, fid: '1wTkkW3nqsuyp9yRNWork-MG_zi8Cow-F' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '1.7', year: 2024, fid: '1RSzdgtelY6xuv7MAcTwyRCArcH9HolWY' },
        { title: 'Corrigé — examen 2024, session normale', ext: P, mb: '16.3', year: 2024, fid: '1JvOhAZ7FxKXtkLy2zRNegdkmBGvanX5u' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '0.4', year: 2024, fid: '1LgCuj7PlBFJIL01djspzu7JvSCJzDL-q' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '0.8', year: 2023, fid: '1_g5ZgM5KERYbBzcpfPqoeg58rbUXecBZ' },
        { title: 'Examen 2023 — rattrapage', ext: P, mb: '0.1', year: 2023, fid: '1OINXAENnXlnvHfuLpOblBsCulchMpcLg' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD 1', ext: P, mb: '0.9', fid: '1puzep64bzpM08ALHXVteIC53h132rXTE' },
        { title: 'TD 1 — correction', ext: P, mb: '2.9', fid: '1IpmaK89exWqqBQAFPqv1RpxYcN7GO2FF' },
        { title: 'TD 2', ext: P, mb: '0.2', fid: '1G8fUymHazuES-M40_xMtyosW4NECB8BI' },
        { title: 'TD 2 — correction', ext: P, mb: '2.5', fid: '1QFwp68TuYOfuAG3w9LDtRlIGZ0MvoVBw' },
        { title: 'TD 3', ext: P, mb: '0.1', fid: '1yWJyLMg0M6v-o4hPfgnSP0lo9pKHqVC8' },
        { title: 'TD 3 — correction', ext: P, mb: '1.1', fid: '128ZBYghv1tBdl34s50m16Lc6z5K07N8Q' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2024 — chimie physique', ext: P, mb: '8.7', year: 2024, fid: '1UcVxS0Zd-B0a3Cc8e2UcPgarXMPzCTlu' },
        { title: 'Corrigé — examen 2024, session principale', ext: P, mb: '0.4', year: 2024, fid: '1sFXyVzxn9KalyAbKVnaOD1izmD-uq6jw' },
      ],
    },
  ],
};

// The histo-embryo rattrapage compilation sits in this folder and in S2's
// HISTOLOGIE-EMBRYOLOGIE, byte for byte; it is kept once, in S2, where the
// subject it examines is.
export const PCEP1_HISTOLOGIE = {
  id: 'pcep1-histologie', promo: 'pcep1', semester: 'S1',
  name: 'HISTOLOGIE', icon: 'micro', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Histologie générale',
      subtitle: 'Les tissus',
      lectures: [
        { n: 1, title: 'Les épithéliums', ext: P, mb: '1.5', fid: '1LLHC9lSAk9T3zvFrI0zNlMMYmS1M7Yf7' },
        { n: 2, title: 'Les tissus conjonctifs', ext: P, mb: '2.8', fid: '10mRjnQviZ0hbMfMsTVQQvDi5cy6b7Fak' },
        { n: 3, title: 'Le tissu sanguin', ext: P, mb: '24.1', fid: '1qzZwAllEO4Wqdiiha7yqnQNCtZlUg1ql' },
        { n: 4, title: 'Le tissu osseux', ext: P, mb: '7.6', fid: '1XB7ePLDXqEI1yBgyf1DlQV8h3RZaO_O_' },
        { n: 5, title: 'Les tissus musculaires', ext: P, mb: '4.8', fid: '1MeuSOXjk7TP9Mm4Qk4o1OfpMKo6sYPwd' },
        { n: 6, title: 'Le tissu nerveux', ext: P, mb: '5.0', fid: '16JPJOH0QTbfVq5sgPgX5CT2Q_WDPt_oi' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Histologie — cours complet', ext: P, mb: '51.3', fid: '1E9j0bHrej0GYEfbKzYbO13ncrwQ3HH8J' },
        { title: 'Polycopié d’histologie — 2025', ext: P, mb: '0.6', year: 2025, fid: '1c1ZTpR6EngmhSPODaxRRGVYgsbCmkRLb' },
      ],
    },
    {
      id: 'livres', where: 'archive', title: 'Livres', icon: 'book',
      items: [
        { title: 'Atlas en couleur d’histologie', ext: P, mb: '28.0', fid: '1cR-xlttqin7TBEOZNmzEVm0SijVwpXxP' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé d’histologie', ext: P, mb: '5.7', fid: '1QJuSko-7U6Z139gBcjei2F4WTpGi1xvz' },
        { title: 'Résumé d’histologie (2)', ext: P, mb: '0.5', fid: '1F8decsQsuenn2Kt1vVEFHYTlxw3yhtUI' },
        { title: 'Résumé — histologie', ext: P, mb: '16.3', fid: '1HNGnQ6orMTtUOmTjMaklzPqJ6JaUmBM4' },
        { title: 'Résumé — histologie générale', ext: P, mb: '1.4', fid: '1_sXhbZ_2_YsXZXxEW2eCuVyRbVMflx_Z' },
        { title: 'Résumé — épithélium', ext: P, mb: '9.0', fid: '1UF8NaPXcoX9-Id3k_03qWCguKpMfSN5v' },
        { title: 'Résumé — tissu épithélial', ext: P, mb: '0.6', fid: '1df1_jIjhJBWz3QMTC4FmMgnl3ZzNJoU6' },
        { title: 'Résumé — tissu conjonctif', ext: P, mb: '0.3', fid: '1KwN1ZwLRmdCHI1uF_7JW7G7c4w_wsQJe' },
        { title: 'Résumé — tissu sanguin', ext: P, mb: '1.8', fid: '1KP70wXjLqyIROYDMW61E7GGtJd_-QHCL' },
        { title: 'Résumé — tissu osseux', ext: P, mb: '0.6', fid: '1tjBUYz0oie6JbS0ZEdP1cI9TXRb2GheY',
          versions: [
            { title: 'Résumé — tissu osseux (autre version)', ext: P, mb: '0.3', fid: '1O2TUsUaiOSHBO66bji7H0K81SdbEBmKx' },
          ] },
        { title: 'Résumé — tissu musculaire', ext: P, mb: '1.8', fid: '1PwGWe4u6HvyT9nJ6Y8WS6ZLlP2hR2ZEJ' },
      ],
    },
    {
      id: 'notes', where: 'notes', title: "Notes d'étudiants", icon: 'file',
      items: [
        { title: 'Notes — tissu sanguin', ext: P, mb: '4.6', fid: '1TgqboPdYw4WJi9wIpOlmrlNRJvSTM-8s' },
        { title: 'Notes — tissu osseux', ext: P, mb: '5.6', fid: '1H1z8edjaWaYXrUdgw3Jh_EhYhuZwOBzy' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '1.7', year: 2025, fid: '1G_cVXR5i-oFF9Esn7KlLZcbfRRgjCrXF' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '0.8', year: 2024, fid: '1O6ayPwc70k1SQQxqzeDXfCIC8_-cUh5O' },
        { title: 'Corrigé — examen 2024, session normale', ext: P, mb: '0.1', year: 2024, fid: '1MUDkLYyYLQJiMhefR-sDofNxxw8uBVY5' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '1.6', year: 2023, fid: '1bnqyUs2stqpQuc7UIyjgiaBNgeWIzh5W' },
        { title: 'Corrigé — examen 2023, session normale', ext: P, mb: '0.1', year: 2023, fid: '1IYT7bOWUMeRvS8mgZ37useJkmn5lo2_1' },
        { title: 'Examen 2021 — session normale', ext: P, mb: '1.2', year: 2021, fid: '1iBN5Xi3jsYN42BzcMBeAYpLoO4wVR7z5' },
        { title: 'Corrigé — examen 2021, session normale', ext: P, mb: '0.2', year: 2021, fid: '1ljrJThcybaW5xSvK3jGXY4fdjy3aHV4M' },
        { title: 'Examen 2020 — session normale', ext: P, mb: '0.7', year: 2020, fid: '1j-FUlHDT7bddzHBzxAedBBC3-d6OW6g8' },
        { title: 'Corrigé — examen 2020, session normale', ext: P, mb: '0.0', year: 2020, fid: '1i_l-Zc6vOJVJdhzaPxLC1ejhxfQIHw9w' },
        { title: 'Examen 2019 — session normale', ext: P, mb: '1.3', year: 2019, fid: '1xnG5mYfLMP4XeKZYoanENH1VmPJiptZ8' },
        { title: 'Corrigé — examen 2019, session normale', ext: P, mb: '0.0', year: 2019, fid: '1vPmBxJdmg2GEHTsgv6a1amW4U2nZJMb-' },
        { title: 'Examen 2018 — session normale', ext: P, mb: '1.9', year: 2018, fid: '1PoHbh5xtaGBQw5f1DLTABvzJDqiojMD6' },
        { title: 'Examen 2017 — session normale', ext: P, mb: '1.7', year: 2017, fid: '1OqnxPOSuQjnIBdrz4SWePcIahru6ngb-' },
        { title: 'Examen 2016 — session normale', ext: P, mb: '4.6', year: 2016, fid: '10zfQo60gKmmWOX9WvkaagGLnrQoxX2ja' },
        // In Drive twice, byte for byte — under the exams and under the isolés.
        { title: 'Corrigé des examens et des isolés d’histologie', ext: P, mb: '6.1', fid: '1ILqxunYjBfA4iR_6BPGTzLLq4I0FGfdO' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolé d’histologie', ext: P, mb: '17.0', fid: '1ojIjvb5lOqz-wSJVZwso_9FNii2Qi7JT' },
        { title: 'Les épithéliums — isolé', ext: P, mb: '4.6', fid: '1IXTOpl1_mhmdR3ZAXmDX5MudwFRSQRqx' },
        { title: 'Le tissu conjonctif — isolé', ext: P, mb: '1.3', fid: '1ucJehf7bK8NeA7c4u8SqGofwqTM_6lq5' },
        { title: 'Le tissu sanguin — isolé', ext: P, mb: '1.7', fid: '1OKEnQ33a2ZbhYjpOLahUt8ZSwa8WzWgy' },
        { title: 'Le tissu osseux — isolé', ext: P, mb: '3.1', fid: '18vubxA551EcrLDV0tKxp8bllEajq--UQ' },
        { title: 'Les tissus musculaires — isolé', ext: P, mb: '1.9', fid: '1RVIuZStHb5nkFXYYB5ScihyGZNWnHmwR' },
        { title: 'Le tissu nerveux — isolé', ext: P, mb: '3.1', fid: '18VIKlaknu0lGVLh6bwSnuaOB3gLUe3-U' },
        { title: 'L’appareil circulatoire — isolé', ext: P, mb: '1.2', fid: '1Z2hSNJ4sxaVSjN25EHDlnNAYl5DeuK2b' },
        { title: 'Corrigé des isolés d’histologie de médecine (validé)', ext: P, mb: '14.9', fid: '1XoXxgOFhxl9qBpWAW26BZdtEKCLyKZEL' },
      ],
    },
  ],
};

// Dogui's slides are the 2015 set; this Drive spells him Dogui where
// medicine's files spell Dougui — kept as each file writes it.
export const PCEP1_PHYSIOLOGIE = {
  id: 'pcep1-physiologie', promo: 'pcep1', semester: 'S1',
  name: 'PHYSIOLOGIE', icon: 'heart', tint: 'purple',
  professors: ['Dogui', 'Ridha'],

  chapters: [
    {
      title: 'Physiologie générale',
      subtitle: 'Milieu intérieur, neurone, muscle, bioénergétique',
      lectures: [
        { n: 1, title: 'Le milieu intérieur', ext: P, mb: '2.0', year: 2015, prof: 'Dogui', fid: '1heRcYmdaBFs1_QOC4Tynjaid-PZr9kpJ' },
        { n: 2, title: 'Physiologie du neurone', ext: P, mb: '1.9', year: 2015, prof: 'Dogui', fid: '1qC5gwbDUwSHE_FhboBMOeg--rHBMG17v' },
        { n: 3, title: 'Physiologie du muscle strié squelettique', ext: P, mb: '2.1', year: 2015, prof: 'Dogui', fid: '14DvANH0QWbA5ThVtlKYjQ5sy8H2Co46V' },
        { n: 4, title: 'Bioénergétique et rations alimentaires', ext: P, mb: '0.7', year: 2015, prof: 'Dogui', fid: '1SJerRISPpxPsuC5N0vjEZ3zQutxrchZd' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Polycopié de physiologie S1 — 2025', ext: P, mb: '2.9', year: 2025, fid: '1gP1urv8Wxt7gpnJb0KLMPqbKzYBfGAPQ' },
        { title: 'Polycopié de physiologie S1 — 2023', ext: P, mb: '4.8', year: 2023, fid: '138D1eLhxMLARCSA5qr6GiX8dRin6ykv4' },
        { title: 'Polycopié de physiologie S1 — 2020', ext: P, mb: '4.2', year: 2020, fid: '1S9xb8Wq4LHBDvmb6v8meu6hx-Mu_oN-V' },
        { title: 'Polycopié de physiologie S1 — 2019', ext: P, mb: '2.9', year: 2019, fid: '16Zmm5UF_s2n7QM6bAxxYjT0Qiqc30DXD' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — physiologie', ext: P, mb: '2.6', fid: '1yKwvBFnBgQN9ZhASUWoVkl6iJDGXWSG9' },
        { title: 'Résumé — le milieu intérieur', ext: P, mb: '0.4', fid: '1oKz3TRb9e8fCMC5qyuVJVApguy6A1y1b' },
        { title: 'Résumé — physiologie musculaire', ext: P, mb: '1.1', fid: '1ZYkr6JiXrFj_PlFm6tjuvRk-8-tjR7p6' },
        { title: 'Résumé — bioénergétique', ext: P, mb: '0.3', fid: '1mTGdQAcimzUDyvmwWYhFge2qylArrZAa' },
        { title: 'Résumé — le sang (M. Yeslem)', ext: P, mb: '0.3', fid: '1DYMv3SEOTr1_VWbbSfM6-L_L0J5HCvZh' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '3.4', year: 2025, fid: '14m3nXd2YvPba4FbSR2-KRNs7ByBYtcS5' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '0.0', year: 2024, fid: '1SAJiboysbt3iXEQuq05dAKa6mKF4o-nz' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '4.7', year: 2023, fid: '1QWeyg8YG3RhtS-gCLJyc2_XdMz25Nqms' },
        { title: 'Corrigé — examen 2023, session normale', ext: P, mb: '0.1', year: 2023, fid: '10PlSeYD6Gfl7ow9OyRNfzVDLHd-ETVmz' },
        { title: 'Examen 2021 — session normale', ext: P, mb: '2.8', year: 2021, fid: '12MkQc6eZnWLdmfoVFf1icthaD8gyyJxK' },
        { title: 'Corrigé — examen 2021, session normale', ext: P, mb: '0.1', year: 2021, fid: '1lm5pl7ld2riYwoPwHJq1IfDJlpKUeDz_' },
        { title: 'Examen 2020 — session normale', ext: P, mb: '1.5', year: 2020, fid: '1Jm9cdkh24_JrlHbX-Q3Un9kXhdhpcvOP' },
        { title: 'Corrigé — examen 2020, session normale', ext: P, mb: '0.7', year: 2020, fid: '1p2EJyncEr5wQF1C-cNhI_cR3nJj74YAB' },
        { title: 'Examen 2019 — session normale', ext: P, mb: '1.5', year: 2019, fid: '1yz592LmyTzlLj6RFuyb3sw-1DJjgutFE' },
        { title: 'Corrigé — examen 2019, session normale', ext: P, mb: '0.0', year: 2019, fid: '1wm59IDiMjGRS_EFp_K4KZTZKh0ytXP0F' },
        { title: 'Examen 2017 — session normale', ext: P, mb: '1.2', year: 2017, fid: '1sLLBbb9QpJ7HMEEgmL5kiZng6_M3cP9W' },
        { title: 'Corrigé — examen 2017, session normale', ext: P, mb: '0.5', year: 2017, fid: '1o8SiVIgguJ4T2JZwRGxAvVirY8zRWSoM' },
        { title: 'Examen 2016 — session normale', ext: P, mb: '6.7', year: 2016, fid: '1G3WKw9xEcn3VT45b_rNNSH9mdcDY9g1q' },
        { title: 'Corrigé — examen 2016, session normale', ext: P, mb: '0.1', year: 2016, fid: '15KLWqcVyFKIjAY1ZDTZnO9yxg4Bv15eZ' },
        { title: 'Examen 2015 — rattrapage', ext: P, mb: '0.1', year: 2015, fid: '1R8nFED7Baiv7yDqNMCH7FWcPynXBZ_Xc' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Le milieu intérieur — isolé', ext: P, mb: '6.7', prof: 'Dogui et Ridha', fid: '1LbYfMVGfu5pzm70q4wlTug9_q0wo7cXP' },
        { title: 'Le neurone — isolé', ext: P, mb: '5.5', prof: 'Dogui et Ridha', fid: '1xHNknQ69y4Tg03zfrHP7pk3NYBehTm2S' },
        { title: 'Le muscle — isolé', ext: P, mb: '5.3', prof: 'Dogui et Ridha', fid: '1uY-FkPMGBesDPsVRFS9KAUg7MLQUGTl-' },
        { title: 'La bioénergétique — isolé', ext: P, mb: '4.5', prof: 'Dogui et Ridha', fid: '1YbuILgnSMO-RpkWGgMWuRwqRzXvalZSM' },
        { title: 'La thermorégulation — isolé', ext: P, mb: '2.0', prof: 'Dogui et Ridha', fid: '14-76PuKzdTO5XOBgjC5KoEK2stFDH3t6' },
        { title: 'Physiologie nerveuse — isolé', ext: P, mb: '6.3', prof: 'Dogui et Ridha', fid: '13eVmgSoPJJqNhz-z0xamX2logHPRS9ns' },
        { title: 'Le système nerveux végétatif — isolé', ext: P, mb: '1.9', prof: 'Dogui et Ridha', fid: '1eGtDeNUQkDZL3fqWbl5SzIwiQ_uvZlcW' },
        { title: 'Isolé « Diplôme en poche » — 2025', ext: P, mb: '32.9', year: 2025, fid: '1vmKZl5UPhHXL9flrZI5a3j0i4iczG146' },
        { title: 'Isolé des années impaires — médecine (validé)', ext: P, mb: '26.8', fid: '1n767_O6hctMdcv4xNN1jluPStURAhs4N' },
        { title: 'Corrigé de l’isolé des années impaires — promo 18', ext: P, mb: '0.0', fid: '1CHIrFHL-TrKV8YFspWaNvP-BEQtoNUOm' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'Questions d’auto-évaluation — Dogui', ext: P, mb: '12.6', prof: 'Dogui', fid: '1eKEtdZcCetQ3PDtaZ0Hp43CxeqCV91lV' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// S2
// ---------------------------------------------------------------------------

export const PCEP1_BIOPHYSIQUE = {
  id: 'pcep1-biophysique', promo: 'pcep1', semester: 'S2',
  name: 'BIOPHYSIQUE', icon: 'atom', tint: 'purple',
  professors: ['Mohamed Aziz Bssis'],

  chapters: [
    {
      title: 'Biophysique',
      subtitle: 'Pr Mohamed Aziz Bssis',
      lectures: [
        { n: 1, title: 'Cours de biophysique — diapositives', ext: P, mb: '29.1', year: 2025, prof: 'Mohamed Aziz Bssis', fid: '1s3Q_rZiAIAkU5pfa65V73AA7irxyYN2G' },
      ],
    },
  ],

  sections: [
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Biophysique 1 — support de cours, partie I', ext: P, mb: '13.0', fid: '1WZ0Uy3iXK4P_fV55CpR0XxO4OiTe-AJ-' },
        { title: 'Biophysique 1 — support de cours, partie II', ext: P, mb: '16.4', fid: '1WV5BJOQ0FJuQdprumDxJQyV_dqFs9cEt' },
        { title: 'Métrologie', ext: P, mb: '2.6', year: 2025, fid: '1WaRWtUVAUhpA9PFzALtA726EfN75Ht1Q' },
        { title: 'Niveaux d’énergie', ext: P, mb: '7.6', year: 2023, prof: 'Raja Guedouar', fid: '1wYbafnsSnGe9leQorFDS_i8X-RCbTuYc' },
        { title: 'Absorption', ext: P, mb: '2.5', year: 2024, fid: '1f8E_aq1qkEoBuh-di339LLAaUpIUpfS2' },
        { title: 'Diffraction', ext: P, mb: '1.6', year: 2024, fid: '1Rbg3bcaraMuqLtXv0OH3wRqHrb9O5cfW' },
        { title: 'Polarisation', ext: P, mb: '1.7', year: 2024, fid: '1qNUWUGZhs1Wluutqqxd2C3zJr0LquK3G' },
        { title: 'TP — conductimétrie', ext: P, mb: '1.2', fid: '12CtTL-zPCSwCdsjqnzPTXEKd99jpjr0J' },
        { title: 'TP — annexe', ext: P, mb: '3.6', fid: '1xAwUcfPF2-ESGxnspNc9kNZqG9HUgp3J' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — Sadam', ext: P, mb: '35.1', fid: '1uYvoFc16wP_svsOUXJ84NWxLgR1T6CG5' },
        { title: 'Résumé — Wl Gah, version mise à jour et corrigée', ext: P, mb: '7.6', fid: '1CnpLfPFhc-HhFT7J4JDfqHQBJoA3ScCg' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '3.3', year: 2025, fid: '1Q-PAM7MZi8_TPEM5g5kl13WrLInZXMxq' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '5.2', year: 2023, fid: '1cGRsxXDDWqOMG-MAV2_NYtZy2vmrGoVq' },
        { title: 'Examen 2022 — rattrapage', ext: P, mb: '2.2', year: 2022, fid: '1daVmTnbohWaL-ezssyl7c4azCW06VF_q' },
        { title: 'Examen 2021 — rattrapage', ext: P, mb: '2.8', year: 2021, fid: '1A2cIgevahZWojRUjP3InOe6yG-n1jrKa' },
        { title: 'Examen 2019 — rattrapage', ext: P, mb: '3.1', year: 2019, fid: '1Ax62UQ14a5s2bGCT1N_PPjdCAVEFp0t7' },
        // In Drive twice, byte for byte — under the exams and the corrections.
        { title: 'Examens de biophysique, avec corrections', ext: P, mb: '22.9', fid: '1KTv27Y3RXZe7Db5y7ODuYEMufHY9mi6Q' },
        { title: 'Examens de biophysique, sans correction', ext: P, mb: '28.8', fid: '15dpHSBDLdkkDheos_MXN7RnqO0tJs-pv' },
        { title: 'Corrigé des examens de biophysique', ext: P, mb: '0.1', fid: '1Kr4q6IAovk4Y07H_Ygaq4HwFeM2pLrx-',
          versions: [
            { title: 'Corrigé des examens de biophysique — UNEM', ext: P, mb: '0.4', fid: '1VCvfdezXM0V_1y6QaCRxHcFg5h_r6JRR' },
          ] },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolé — tous les chapitres', ext: P, mb: '0.9', fid: '1-Ft-Ali1rXVHM3uO8dB2KhAC9Zkehx8U' },
        { title: 'Isolé — chapitre 1', ext: P, mb: '0.0', fid: '1bMCLEFtmlSgyDPKJ30XMXSmg3VB6iS6l' },
        { title: 'Isolé — chapitre 2', ext: P, mb: '0.1', fid: '1lDfd2ZHeXdMZ4N8A0MzTAE13kee3zp1m' },
        { title: 'Isolé — chapitre 3', ext: P, mb: '0.1', fid: '1CDnhDoJvBQ2hlHE8HBdAQw61L7b5sMEd' },
        { title: 'Isolé — chapitre 4', ext: P, mb: '0.0', fid: '1DrwaPHiEF0ct5wWpVI5VpAKLPyp1quml' },
        { title: 'Isolé — chapitre 5', ext: P, mb: '0.1', fid: '1ft1IRa2ZS6Gm04loU3KTcHHMOPRrSe-m' },
        { title: 'Isolé — chapitre 6', ext: P, mb: '0.1', fid: '194vcPdMfNfnr69d_Fh1lQ0rkPOWz-NCz' },
        { title: 'Isolé — chapitre 7', ext: P, mb: '0.1', fid: '1yRHq00eZI3z53KPrdYg6LqW_yCZqNaVF' },
        { title: 'Isolé — chapitre 8', ext: P, mb: '0.0', fid: '1jVzP0aBUcMSJ5pf2U-DKNj8y7LIjy7dZ' },
        { title: 'Isolé — chapitres 9 et 10', ext: P, mb: '0.1', fid: '1KkG3UNN5rmY8b16nlY96r4NSRY_fLigB' },
        { title: 'Isolé — chapitre 11', ext: P, mb: '0.1', fid: '164p0xQ2fEt_3uMvsuL4xCnMjU779PIDk' },
        { title: 'Isolé — chapitre 12', ext: P, mb: '0.1', fid: '1NcSjvvFdKPx1_IQbd8y8ccTNfa-RVE1D' },
        { title: 'Isolé — chapitre 13', ext: P, mb: '0.1', fid: '1faGgXjMZ8Olfoi_Wa6fOeyuEdN5XxwK2' },
        { title: 'Corrigé de l’isolé — Mohamed Yeslem', ext: P, mb: '1.4', fid: '1HmayS5L4NTZpMdp5_mxJcXzDXyXJlldY' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        // In Drive twice, byte for byte — under QCM and under TD.
        { title: 'QCM corrigés par le professeur', ext: P, mb: '7.6', fid: '13uMrDKpuPqw1yvg9ydlsqAOsmPjWT97m' },
        { title: 'Tous les QCM projetés par le professeur — 2025', ext: P, mb: '14.9', year: 2025, fid: '1yONCfbw-TjI6p1ZyY3rL-yee3ZEla8Yu' },
        { title: 'TD de biophysique — 2025', ext: P, mb: '7.6', year: 2025, fid: '1UiaImf5hvNnPdo-FjnbECvVVHfZ7JvIA' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2025 — biophysique', ext: P, mb: '12.4', year: 2025, fid: '1iZ8gkhjRUJpWgdgtQA6lzNqFM5mnJclU' },
      ],
    },
  ],
};

// The 2017 correction was photographed in two halves; it is one document with
// its pages in order.
export const PCEP1_HISTO_EMBRYO = {
  id: 'pcep1-histo-embryo', promo: 'pcep1', semester: 'S2',
  name: 'HISTOLOGIE-EMBRYOLOGIE', icon: 'baby', tint: 'orange',
  professors: ['Nouzhe'],

  chapters: [
    {
      title: 'Histologie-embryologie',
      lectures: [
        { n: 1, title: 'Histo-embryologie — diapositives', ext: P, mb: '22.9', year: 2025, fid: '1LoooMIq3cVtF5olGPYMKOMnhPJ9dGQXm' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Polycopié d’histo-embryologie — 2016', ext: P, mb: '8.5', year: 2016, prof: 'Nouzhe', fid: '1oYMwwka6U3UDa9Jam9wnKiX4v38zgaCv' },
      ],
    },
    {
      id: 'livres', where: 'archive', title: 'Livres', icon: 'book',
      items: [
        { title: 'Embryologie humaine descriptive', ext: P, mb: '14.9', fid: '1FZdipufDLcl4JsTx77hzra58cIqivL1a' },
        { title: 'Embryologie humaine — Yaici Ayoub, Arab Oueil', ext: P, mb: '24.1', fid: '1fyrV6zPCB12rFC6SwZrSoER--wX7hbrA' },
        { title: 'Embryologie — CH', ext: P, mb: '56.0', fid: '1zyJRdWRbW_8TmgxOFBYP2xwDFV_eMpyz' },
      ],
    },
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'La fécondation', ext: P, mb: '2.1', year: 2023, prof: 'Sallem', fid: '1lQkj54ZQpivdimaFMi9s_jbxW8HTMkXv' },
        { title: 'Première semaine du développement embryonnaire', ext: P, mb: '1.5', prof: 'Sallem', fid: '1wsEqyFlFE-96owZFfyifEN3YIP7B2FjP' },
        { title: 'Deuxième semaine du développement embryonnaire', ext: P, mb: '1.7', year: 2022, prof: 'Sallem', fid: '1ahH4ZzpvjgrgpqM962D_fwMVsR8O4qCX' },
        { title: 'Troisième semaine du développement embryonnaire', ext: P, mb: '2.3', prof: 'Sallem', fid: '1KrWLPeoAs93rMIEO0cs7Jc1mF2MdM40v' },
        { title: 'Quatrième semaine du développement embryonnaire', ext: P, mb: '2.3', prof: 'Sallem', fid: '1g-VkvRPWtL1oeQaZAytdNDmTmO5c9D7y' },
        { title: 'Annexes et placenta', ext: P, mb: '3.0', year: 2024, prof: 'Sallem', fid: '1dlby9JaPbu6-vFSpQU34LjP21g68YoTp' },
        { title: 'Embryologie — TD, série 1', ext: P, mb: '2.9', fid: '1p0Kgl4YjSnB6lc9ZKOwV8KaI5L3SQwUo' },
        { title: 'Embryologie — TD, série 2', ext: P, mb: '2.7', fid: '18USC7ClgjmVWyn8kqasVPX4xsx2WG1p-' },
        { title: 'Embryologie — TD, série 3', ext: P, mb: '1.2', fid: '1V2yJ4sV5YSvWCiZodnY18zmsax4fG9mI' },
        { title: 'Embryologie — TD, série 4', ext: P, mb: '2.4', fid: '13gcnr92UNhrbHlD4uDQNOww4lkWQzBFU' },
      ],
    },
    {
      id: 'notes', where: 'notes', title: "Notes d'étudiants", icon: 'file',
      items: [
        { title: 'Cours d’embryologie — Mohamed Yeslem (gamétogenèse, fécondation, développement embryonnaire)', ext: P, mb: '67.8', year: 2025, fid: '1mDqdwjvaRBvfAD4HmENIy7_2pBExrQMe' },
        { title: 'Notes d’embryologie — Cheikha', ext: P, mb: '82.8', fid: '1SJGq07DAhnw1EWhfatWxJ6gfZzMidx6U' },
        { title: 'Notes — le placenta', ext: P, mb: '16.8', fid: '1gh9S4V__P23FHlRcJnY_MbVhOG9bb2dE' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale, PCEP1 et PCED1', ext: P, mb: '0.1', year: 2025, fid: '1iDrS0KJjdONZfixiEOS260Nu_e-lwi-d' },
        { title: 'Examen 2025 — session normale, PCEM1', ext: P, mb: '3.5', year: 2025, fid: '1obM29WHIj7u2SWm7OQYi-Pj_3_2FSm2B' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '2.2', year: 2024, fid: '1GoCAAI-iZfyEPdcYRK314oHYkELt55Is' },
        { title: 'Corrigé — examen 2024, session normale', ext: P, mb: '0.1', year: 2024, fid: '1rWh4rnqwlJY_bOWBnse2l9NZ3YZx9rmY' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '1.5', year: 2024, fid: '11sFSQnSfhB7q16UmDDbOCsqFkkIiDmRr' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '0.6', year: 2023, fid: '1jdUw8P1TxXp6nW6E8mZdRXkclrmxKoSs' },
        { title: 'Examen 2022 — session normale', ext: P, mb: '1.2', year: 2022, fid: '1YIwgCQRtv_3OaFA6-ufIMHkyJbYyE1-l' },
        { title: 'Examen 2022 — rattrapage', ext: J, mb: '0.0', year: 2022, fid: '1oP3af2q5XaDE0chLdZMKg92auxw45R8P' },
        { title: 'Examen 2021 — session normale', ext: P, mb: '4.1', year: 2021, fid: '1y9GhzvurAzpII1W9AW7f0YEJ5eP3s69T' },
        { title: 'Examen 2020 — session normale', ext: P, mb: '0.8', year: 2020, fid: '1sYeTFUB-3l-ds24aALMZRaqu0BbFa_6c' },
        { title: 'Examen 2019 — session normale', ext: P, mb: '20.0', year: 2019, fid: '1H-83p1JAFATCPTw-6vb5N3mFqxYrwpQk' },
        { title: 'Examen 2018 — session normale', ext: P, mb: '2.1', year: 2018, fid: '14EszwqZ4A8vwTRydrW_PR53asBHCNBxq' },
        { title: 'Corrigé UNEM FMPOS — sessions normales 2018 à 2023', ext: P, mb: '0.1', fid: '1c3gTXh0Fipnt75h2eSpb2F14Y8eIShpv' },
        // Its Drive name is cut off at «2017-202»: a compilation from 2017 on.
        { title: 'Recueil d’examens — 2017 et suivants', ext: P, mb: '20.8', fid: '1fJN-IMLIiNvIxg-GZoXNaISmPt6W5j71' },
        { title: 'Corrigé — examen 2017, session normale', ext: J, mb: '0.1', year: 2017, fid: '1fD9VHAjy64fv57QuC4zuv_N9nSR4Vkm8',
          pages: ['1fD9VHAjy64fv57QuC4zuv_N9nSR4Vkm8', '1IiC6iZqWiI8h0aCPlwu3J_N8E6yXMy89'] },
        { title: 'Examen 2016 — session normale', ext: P, mb: '0.4', year: 2016, fid: '1KcgZR7IdyKRSZmVtHZ502yGO9o2f4qgg' },
        { title: 'Corrigé — examen 2016, session normale', ext: J, mb: '0.0', year: 2016, fid: '1Ie__iEi1-WCrN8RGtNbee6_y4aqe_nl_' },
        { title: 'Examen 2016 — rattrapage', ext: P, mb: '3.7', year: 2016, fid: '1U0hssqui49bLMC3Sj_GNyaA88J1kT7N5' },
        { title: 'Examens de rattrapage — recueil', ext: P, mb: '14.8', fid: '1ctK_Pw0iue_m3OsIAsCcQgl5KWoG5TPM' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'La gamétogenèse — isolé', ext: P, mb: '10.6', fid: '1ijk6G76IIQWsFEET5-g6jQrgc8rZFoeg' },
        { title: 'La fécondation — isolé', ext: P, mb: '11.4', fid: '1mfYB1wHlJyu0HhRh4-eFV1ENezmh93xD' },
        { title: 'La première semaine — isolé', ext: P, mb: '11.2', fid: '1fMDujYpI5CQ4M_6GBA0vYwrgf5lBQTxx' },
        { title: 'La deuxième semaine — isolé', ext: P, mb: '3.8', fid: '1EFDHocRN7u3LU7BH2nLwJKp07ZPWI56M' },
        { title: 'La troisième semaine — isolé', ext: P, mb: '6.1', fid: '1JeWUChwKd5nqlSiexOs7_pU4uAdiUlcu' },
        { title: 'La quatrième semaine — isolé', ext: P, mb: '9.6', fid: '1HaZgEvFRrVLfEFx76mhvVGwQMFHNNmiH' },
        { title: 'Les ébauches embryonnaires — isolé', ext: P, mb: '4.9', fid: '1mXHlBMdKZuDsxM-HzIZP5J82Tga1CuN5' },
        { title: 'Le placenta — isolé', ext: P, mb: '14.9', fid: '1Kn0T2s8UxhZE-ja3qh_1tijpQVCjNFL2' },
        { title: 'L’appareil génital femelle — isolé', ext: P, mb: '11.9', fid: '1PO9paTvgFTsUTp7_34kn0jFQT1dJ4YKc' },
        { title: 'L’appareil génital mâle — isolé', ext: P, mb: '15.4', fid: '1RMnWAQH9m57Nph6ZC8JyrHa0w-X2Tu49' },
        { title: 'Isolé d’embryologie « Diplôme en poche »', ext: P, mb: '99.8', fid: '1cho0qE67YRpKs3WMMO4LnH2orPioROna' },
        { title: 'Corrigé de l’isolé « Diplôme en poche » — promo 18', ext: P, mb: '11.4', fid: '1WAUQOAZVYMaO5RyDgO9KvZ3LKObAwFFO' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'QCM projetés par Nouzhe — 2025', ext: P, mb: '3.4', year: 2025, prof: 'Nouzhe', fid: '1vp6S6dJ5cJt2XowRAEd3wUtYzMXsUl00' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2024 — embryologie', ext: P, mb: '18.6', year: 2024, fid: '1LQsW4SntEZubXhN3mS8rXrrL0R_2phEW' },
      ],
    },
  ],
};

// The case the chapters feature is for: one module on the timetable and one
// exam paper («EXAMEN MODULE MATHS-STATISTIQUES-IMFORMATIQUE»), taught as
// three series — mathématiques, probabilités et statistiques, informatique.
// Drive files statistics as two sub-folders (probabilités, statistiques);
// they stay two chapters here.
export const PCEP1_MATHS = {
  id: 'pcep1-maths-stats-info', promo: 'pcep1', semester: 'S2',
  name: 'MATHS-STATISTIQUES-INFORMATIQUE', icon: 'book2', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Mathématiques',
      lectures: [
        { n: 1, title: 'Algèbre', ext: P, mb: '0.9', fid: '1V7oCoOcXSYSQVNrXz_2vM_eREeqYSdbL' },
        { n: 2, title: 'Analyse', ext: P, mb: '1.0', fid: '1mORNOg-84tOCNnScV1kQqewlhT-l4CKC' },
        { n: 3, title: 'Développements limités usuels', ext: P, mb: '0.0', fid: '14GCvmT1ejFk_1W3_QQ7T-6JV8PvqHAn3' },
      ],
    },
    {
      title: 'Probabilités',
      lectures: [
        { n: 4, title: 'Probabilités — chapitre 0', ext: P, mb: '0.1', fid: '1Vw7FvQhep20sg8miVL9xch8u1dNK9708' },
        { n: 5, title: 'Probabilités — chapitre 1', ext: P, mb: '0.4', fid: '1g5mtEbn9LxkHPSpkCO3cTAGxDYXL7J59' },
        { n: 6, title: 'Probabilités — chapitre 2', ext: P, mb: '0.6', fid: '1B5sHX1lbWGSqUQLaxKZXqvHaG4pmyOCo' },
      ],
    },
    {
      title: 'Statistiques',
      lectures: [
        { n: 7, title: 'Statistiques — chapitre 1', ext: P, mb: '0.5', fid: '11DF5LovMXXEI51Zq4OUlHYJ52pD6Td37' },
        { n: 8, title: 'Statistiques — chapitre 2', ext: P, mb: '0.4', fid: '17wZDNsvXrWuJUJxf5-PWgtvvXDjFKAYs' },
        { n: 9, title: 'Statistiques — chapitre 3', ext: P, mb: '0.3', fid: '1ZQSfCwEYN0D8DIfpAXjXn4tw_Pr3jlzu' },
        { n: 10, title: 'Statistiques — chapitre 4', ext: P, mb: '0.3', fid: '1gDaX4FfEM_NpRwucO1t4UpORPL9ucPrr' },
        { n: 11, title: 'Statistiques — chapitre 5', ext: P, mb: '0.2', fid: '1DQZzKmXJYAWZhzhnxm2bCYPtmF_Z85xo' },
      ],
    },
    {
      title: 'Informatique',
      lectures: [
        { n: 12, title: 'Introduction à l’informatique', ext: P, mb: '0.7', fid: '1rxyPdFf6fr7btDkVbTYMgFSt7-a_6zqD' },
        { n: 13, title: 'Algorithmique', ext: P, mb: '0.6', fid: '1PtjKzxGuReZy2nEe2T8f2EKB9_n3F-R2' },
      ],
    },
  ],

  sections: [
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Mathématiques — support de cours de 1re année', ext: P, mb: '8.8', year: 2024, fid: '1FHisr0rdYyQ4a0stUK5iuBszspuAvxMC',
          versions: [
            { title: 'Mathématiques — support de cours de 1re année', ext: P, mb: '25.9', year: 2024, fid: '1_r3OHh2pZxM1mj4b-F5OspOqNje55aD1' },
          ] },
        { title: 'Informatique C2N — D1.1, recherche d’information et veille', ext: P, mb: '5.4', year: 2024, prof: 'Jeblaoui', fid: '1npEOHjguZzr6zvrayrKy2hXTAsMHUBiO' },
        { title: 'Informatique C2N — D1.2, gérer des données', ext: P, mb: '1.2', year: 2025, prof: 'Jeblaoui', fid: '16XzdQd2ErETLwM6NZhaF4PAJF7cCZupq' },
        { title: 'Informatique C2N — D3.1, création de contenu', ext: P, mb: '1.6', fid: '1HG-RgobkTf7R9yPMaBS6eALxl6nCgywR' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        // Its Drive name is Arabic, a student's joke at their own expense.
        { title: 'Résumé — probabilités', ext: P, mb: '7.1', fid: '1mWq-4gatA7d7_9VKCSGtJukwk-RnMZtJ' },
        { title: 'Résumé — informatique de base (Mohamed Yeslem)', ext: P, mb: '0.1', fid: '1viQr9exjpsYveGM3i9GWq6FurgYYh47I' },
      ],
    },
    {
      id: 'notes', where: 'notes', title: "Notes d'étudiants", icon: 'file',
      items: [
        { title: 'Notes de statistiques — Cheikha', ext: P, mb: '2.3', fid: '1lKiHgFwh8uezFy-W8y0zsWaeH6djTlbX' },
        { title: 'Notes de statistiques avec Cheybani', ext: P, mb: '16.8', fid: '1pvkmx02OyXU8mckfrijEX6EfTMKQcL7G' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '1.8', year: 2025, fid: '13AuGzbRpImLxLZrgxD00qVeSbtr-LOUt' },
        { title: 'Corrigé — examen d’informatique 2025, session normale (Mohamed Yeslem)', ext: P, mb: '0.0', year: 2025, fid: '15PQ8xd2FTECyM5c_J5V4kA0HHbHoRMIS' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '5.9', year: 2024, fid: '1QEN38HLp57fIL3Czfj6BKrg5LdQaO5kj' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '0.6', year: 2024, fid: '1vaRowRNr_ViujQI_9aXp8cFI8sawwFbL' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '0.6', year: 2023, fid: '1_A9PyAH3roASZQJaqFHh038GTQAc8rLy' },
        // Medicine takes the same module in DCEM4; its paper is filed beside
        // PCEP1's in Drive.
        { title: 'Examen 2025 du module, avec correction — DCEM4', ext: P, mb: '0.9', year: 2025, fid: '1LITr9HK_MMEknPIImbXUypeiGatEq0N2' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD d’algèbre', ext: P, mb: '0.2', fid: '11XgporwlCP0Lbt0-LYh9CAIlvkcG8NvM' },
        { title: 'TD 1 d’algèbre — correction', ext: P, mb: '3.2', fid: '1ihu6qed1FZk02mISPyZ6w99pY2sDYpH6' },
        { title: 'TD 1 d’algèbre — correction de l’exercice 10', ext: P, mb: '0.2', fid: '1xK3JozOqssYzs84dKN_L0G2sNq2rFpk0' },
        { title: 'TD 1 d’analyse', ext: P, mb: '0.2', fid: '18YsNXyxIbT-9akAcmYLHBmiAWQXMqFa7' },
        { title: 'TD 1 d’analyse — correction', ext: P, mb: '0.5', fid: '1ERqYM8W_WvOaFgxdFDviEsOyVMwFHM3B' },
        { title: 'TD 2 d’analyse', ext: P, mb: '0.2', fid: '1ORnFxip9qmUTxGC8vOdS99mnui7R4l-W' },
        { title: 'Probabilités — TD 1', ext: P, mb: '0.2', fid: '1orWnEciHO0jrWrJUoIbzMgIvS4Gv_Hei' },
        { title: 'Probabilités — correction du TD 1', ext: P, mb: '2.8', fid: '1foKeIUUeAxKI-OzlV4v1V-WWWTSjJGYh',
          versions: [
            { title: 'Probabilités — correction du TD 1 (Mohamed Yeslem)', ext: P, mb: '3.8', fid: '1mMzJm77kWVymKFBQDpcMPRePEiEtl5Q-' },
          ] },
        { title: 'Probabilités — fiche de TD 1 et 2', ext: P, mb: '0.3', fid: '1EurrGtzhzelOLwuQM6oO1xYBw-r_WJh9' },
        { title: 'Probabilités — correction de la fiche de TD 1 et 2', ext: P, mb: '0.8', fid: '1Dcnf6ZmdLlJFQ1X8cTKlJO25mgSQQkN1' },
        { title: 'Statistiques — TD 1', ext: P, mb: '0.1', fid: '14oYRbGBJ9svISwnpQhaSxpilLk1FAIsK' },
        { title: 'Statistiques — correction du TD 1 (Mohamed Yeslem)', ext: P, mb: '2.3', fid: '1cndI-b36jFz4SgvEzJeKe7tyK-cMWgs1' },
        { title: 'Statistiques — TD 2 et 3', ext: P, mb: '0.1', fid: '1vlY2boI0lJhqOhBY3D-_0axCma7_MImK' },
        { title: 'Statistiques — correction des TD 2 et 3 (Mohamed Yeslem)', ext: P, mb: '3.4', fid: '1upryylwlsFHcolxW4omYUpKuaAzh64aF' },
        { title: 'Statistiques — correction des TD 1, 2 et 3', ext: P, mb: '13.9', fid: '1jKi8DE2Aake_QsdJKX3YgIE10WUbN9YT' },
        { title: 'Statistiques — TD 3, 4 et 5', ext: P, mb: '0.1', fid: '17zIrAlSBVtZnVG3GuZtEnq8KtNUdUbv1' },
        { title: 'Statistiques — correction des TD 3 et 4', ext: P, mb: '2.3', fid: '1fPXCJoqhdkjFxBUH556TEZ2uFqfvdw-A' },
        { title: 'TD de probabilités et de statistiques — correction du professeur', ext: P, mb: '4.8', fid: '11uoJY-JLsf4qeS2WTzs4zs9549i2YjqV' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2025 — biostatistique', ext: P, mb: '14.5', year: 2025, fid: '1kXSNbVsWDcAYMAIKCtWpfERFLUEyc7rf' },
      ],
    },
  ],
};

export const PCEP1_PHYSIOLOGIE_S2 = {
  id: 'pcep1-physiologie-s2', promo: 'pcep1', semester: 'S2',
  name: 'PHYSIOLOGIE S2', icon: 'heart', tint: 'orange',
  professors: ['Dogui', 'Ridha'],

  chapters: [
    {
      title: 'Physiologie des grandes fonctions',
      subtitle: 'Cardio-circulation, respiration, digestion',
      lectures: [
        { n: 1, title: 'Physiologie cardio-circulatoire', ext: P, mb: '2.7', prof: 'Dogui', fid: '17DUbdiB4EBxElmIZv3oevnfLs6U47Ca8',
          versions: [
            { title: 'Physiologie cardio-circulatoire', ext: P, mb: '4.4', prof: 'Ridha', fid: '1CAGZXA2n-fzLMNfuotDPBHabR-1pDN4K' },
          ] },
        { n: 2, title: 'Physiologie de la respiration', ext: P, mb: '6.4', prof: 'Dogui', fid: '1goBUDYCY7uaR-hhFa1LIBbQxfGEx-vWm' },
        { n: 3, title: 'Physiologie de la digestion', ext: P, mb: '41.3', prof: 'Dogui', fid: '1DzWF096fedyAxUjg-hw5l5ySHRPcIPfb' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Polycopié de physiologie S2 — 2025', ext: P, mb: '3.3', year: 2025, fid: '1fQKPL6UC3Q6Wby9DquhoiNSeKsvegqvK' },
        { title: 'Polycopié de physiologie S2 — 2024', ext: P, mb: '4.6', year: 2024, fid: '1-mnLAHJIEQRhvIrn5SM01IYckZ924vxb' },
        { title: 'Polycopié de physiologie S2 — 2023', ext: P, mb: '9.6', year: 2023, fid: '1YJiUQv7hSePfOlggURnVoxmiS7eV2HxX' },
        { title: 'Polycopié de physiologie S2 — 2022', ext: P, mb: '4.8', year: 2022, fid: '1Lk7x6Qbb20bVBK7QwnLE6DfVJJDhy3VA' },
        { title: 'Polycopié de physiologie S2 — 2021', ext: P, mb: '4.2', year: 2021, fid: '1o35KylU-uRo4b8AXVVvQMSZf9i6uPlCs' },
        { title: 'Polycopié de physiologie S2 — 2018', ext: P, mb: '4.9', year: 2018, fid: '1xcxXiMwQWdqWxy-LE2jOB0H0iF2MKyt2' },
        { title: 'Physiologie de la digestion — 2015', ext: P, mb: '0.4', year: 2015, fid: '130CSnI5XufUDi4kKA5WL1dqrmCFXfflg' },
      ],
    },
    {
      id: 'monastir', where: 'archive', title: 'Cours — Monastir', icon: 'book',
      items: [
        { title: 'Physiologie humaine 1 — support de cours', ext: P, mb: '7.0', fid: '13C8StAA9luhtdjrRaOEmn2kuNnmyC_68' },
        { title: 'Les muscles', ext: P, mb: '4.3', year: 2025, fid: '1NjUQwzUpA3aAJ1ycJJuiyGZ3s7A4pNeA' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Cours résumé — physiologie de la digestion (Mohamed Yeslem)', ext: P, mb: '0.3', fid: '1oF_MOMgTkRDHjloQ-A4zdpnWUI8kjSG9' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '4.8', year: 2025, fid: '1fWA2fPLeKsMfi5Z98pfYV-0aKU5GJW8p' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '1.7', year: 2024, fid: '1MHHH2cVBRgeuyVCWnmqMjsyn92_FCLoX' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '2.8', year: 2023, fid: '1foA27BpenjMu-oK64tyAI_pFEIfty1l7' },
        { title: 'Corrigé — examen 2023, session normale', ext: P, mb: '0.3', year: 2023, fid: '19k6EQPPEj0n3Ck3izHqJqbXRqmWjy0ri' },
        { title: 'Examen 2022 — session normale', ext: P, mb: '9.5', year: 2022, fid: '1riak6f9bN-UIktDUBm-DPMCqiBPomRrw' },
        { title: 'Corrigé — examen 2022, session normale', ext: P, mb: '10.0', year: 2022, fid: '1_Gmivyar4pJg5sWi2YW0r7r9zmi6_i6f' },
        { title: 'Examen 2021 — session normale', ext: P, mb: '5.0', year: 2021, fid: '15bR93IbpAu63BOkwG2h9iqVEeNaI13H5' },
        { title: 'Corrigé — examen 2021, session normale', ext: P, mb: '0.3', year: 2021, fid: '1lX-oOB3lh4jKwwTR8ggPKd-8fE3QWs4n',
          versions: [
            { title: 'Corrigé — examen 2021, session normale (groupe de révision)', ext: P, mb: '2.0', year: 2021, fid: '1auhcboqK9WhKFgUf3V6a9XBke_cE2cXB' },
          ] },
        { title: 'Examen 2021 — rattrapage', ext: P, mb: '22.5', year: 2021, fid: '1oCqk7fPjKU7JjQukOajeKFm8kLDdk43e' },
        { title: 'Examen 2020 — session normale', ext: P, mb: '1.5', year: 2020, fid: '1DCBxnVzcqhWh9QfcAFpq9eW1Fwz0cFdv' },
        { title: 'Corrigé — examen 2020, session normale', ext: P, mb: '0.3', year: 2020, fid: '1Fa2sBp78k2IwPjgsYQZYgMEdeIlafgIx' },
        { title: 'Examen 2019 — session normale', ext: P, mb: '0.8', year: 2019, fid: '1DpwyW2OLBhTKkdsf81_Pxi2tUCo_0HSN' },
        { title: 'Corrigé — examen 2019, session normale', ext: P, mb: '0.1', year: 2019, fid: '17PlYEgxlZV2yJe3hSM7yurFq75RTYMOc' },
        { title: 'Examen 2018 — session normale', ext: P, mb: '4.7', year: 2018, fid: '1YbHqrSuMXOt6E03L2l2Z22Y7iS4GGCvs' },
        { title: 'Corrigé — examen 2018, session normale', ext: P, mb: '0.7', year: 2018, fid: '11qmxM3_8oUUoS_61ms_zNN52T2wuf-Aw' },
        { title: 'Examen 2017 — session normale', ext: P, mb: '0.6', year: 2017, fid: '1iqS2Mg1NUAMON1D75vX8mLlq7fHNM6cP' },
        { title: 'Corrigé — examen 2017, session normale', ext: P, mb: '0.2', year: 2017, fid: '1dVtumC8qVaNUVESX_mAMrp4XIOmrl4Ou' },
        { title: 'Corrigés de quelques examens de rattrapage', ext: P, mb: '0.1', fid: '1QQ7T4iGiMhtvrbUMK8qhunxdvQHM-Ohd' },
        // In Drive twice, byte for byte — under the exams and the isolés.
        { title: 'Quelques corrigés des examens et des isolés de physiologie S2', ext: P, mb: '3.1', fid: '1U1TdnB8mdPjXDYs6tDDkA30DG_txdP7b' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Physiologie cardio-circulatoire — isolé « Diplôme en poche »', ext: P, mb: '9.6', fid: '16O9XEtl-hvx9d3CHwL7aqVcuExHlEkTQ' },
        { title: 'Physiologie de la respiration — isolé « Diplôme en poche »', ext: P, mb: '10.5', fid: '1o1Yc-TUPXjijEqz2KPbLTHep0FkHdOqr' },
        { title: 'Physiologie de la digestion — isolé « Diplôme en poche »', ext: P, mb: '16.3', fid: '1sd9mxNccohZszdhxgPYcFj8tfLyijF0_' },
        { title: 'Corrigé de l’isolé « Diplôme en poche » — promo 18', ext: P, mb: '0.3', fid: '1sIN8GM6uBNVGi99Sz_Qq9iesoBp9jwR_' },
        { title: 'Corrigé des QCM de l’isolé « Diplôme en poche » — Mohamed Yeslem', ext: P, mb: '2.1', fid: '1sI-ZspoGdzH7F2f3AwivNN15tr4PQLuS' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Annale 2025 — physiologie', ext: P, mb: '14.4', year: 2025, fid: '1kiwTQ9RuuC4gWCsG6Pbai92UvWfcScvl' },
      ],
    },
  ],
};

export const PCEP1 = [
  PCEP1_ANATOMIE,
  PCEP1_BIOCHIMIE,
  PCEP1_BIOLOGIE,
  PCEP1_CHIMIE_ORGANIQUE,
  PCEP1_CHIMIE_PHYSIQUE,
  PCEP1_HISTOLOGIE,
  PCEP1_PHYSIOLOGIE,
  PCEP1_BIOPHYSIQUE,
  PCEP1_HISTO_EMBRYO,
  PCEP1_MATHS,
  PCEP1_PHYSIOLOGIE_S2,
];
