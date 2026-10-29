// PCEP2 — pharmacy, second year.
//
// Source: `ARCHIVES-UNEM-FMPOS( PCEP)2026-2027` › `UNEM_PCEP2 2027`
// (1DPNqa1Vro0_9w7QiFAUK69pXMy8YrZ_y), shared «anyone with the link» and read
// off each folder's own public listing, one level at a time — metadata only,
// no file opened. Its two folders are the year's semesters, a folder per
// subject inside each: S1 (1ENSNnwLaPFvcuV5zHJ4lMiJDZRRdEk6T) and S2.
//
// Same rules as PCEP1: French titles, the same material by other hands is a
// `version`, another faculty's material — Tunis (UVT), Monastir, Marrakech,
// Djibouti — sits in its own section and is never numbered in with FMPOS's
// lectures. Exam papers photographed page by page are one paper with `pages`.
// Dropped: `desktop.ini` and Office `~$` lock files, a Word lock file in
// physiologie, and `attachment.pdf` at the root of PHYSIOLOGIE S1, whose name
// says nothing about what it is.
//
// PHYSIOLOGIE and BIOPHYSIQUE are medicine's PCEM2 courses — the polycopiés
// say «PCEM2» on the cover — filed here as the pharmacy students keep them.
// BIOPHYSIQUE has no lectures in this Drive, only papers and résumés.
//
// `year` is the year in the file name; for an academic year it is the second.
// SN is a session normale, SC a rattrapage.

const D = 'DOC';
const J = 'JPG';
const P = 'PDF';
const PT = 'PPT';
const W = 'DOCX';
const X = 'PPTX';

// ---------------------------------------------------------------------------
// S1
// ---------------------------------------------------------------------------

// FMPOS's five lectures, in the order the course is taught — Drive sorts
// them by name. The Tunis (UVT) course is the same programme chapter by chapter.
export const PCEP2_BIOCHIMIE = {
  id: 'pcep2-biochimie', promo: 'pcep2', semester: 'S1',
  name: 'BIOCHIMIE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Biochimie métabolique',
      lectures: [
        { n: 1, title: 'Enzymologie', ext: P, mb: '4.4', year: 2019, fid: '10EkB_Ka1Wn47WYanjWNi5PemrhKtJui_' },
        { n: 2, title: 'Bioénergétique et introduction au métabolisme', ext: P, mb: '1.2', fid: '1rjJr2AIUtXLKVWFxSnYdE75ad-p2Pu7g' },
        { n: 3, title: 'Métabolisme des glucides', ext: P, mb: '5.0', fid: '10wlvcmnMkLnMe51NQUr0cwWXztMqsC_C' },
        { n: 4, title: 'Métabolisme des lipides', ext: P, mb: '5.3', year: 2019, fid: '1b2eSaY9GgwokFcoW3ij4OquC1jxukpHi' },
        { n: 5, title: 'Maturation des protéines', ext: P, mb: '1.5', year: 2024, fid: '1J_8OgOopO3S7721hxBTJURnZe7aKkBWx' },
      ],
    },
  ],

  sections: [
    {
      id: 'tunis', where: 'archive', title: 'Cours — Tunis', icon: 'book',
      items: [
        { title: 'Enzymologie — ch. 1, généralités', ext: P, mb: '1.7', year: 2021, fid: '1BOBp3G77k5NivxOh59cF8_xTY33_d2fx' },
        { title: 'Enzymologie — ch. 2, cinétique enzymatique', ext: P, mb: '1.9', year: 2021, fid: '11ZWEBAD6F9FPlWlH2vEJ00nCj8pPVss-' },
        { title: 'Enzymologie — ch. 3, coenzymes', ext: P, mb: '1.4', year: 2021, fid: '1I2_ozTHUeqbhsASmqgdG-wOCydsNvWF3' },
        { title: 'Enzymologie — ch. 4, activité enzymatique', ext: P, mb: '0.4', year: 2021, fid: '1Lp5cXncZCJYzXQYQdafvV3Y1DMqcj80R' },
        { title: 'Enzymologie — ch. 5, régulation de l’activité enzymatique', ext: P, mb: '1.5', year: 2021, fid: '1PZPLvbs9_HVBJbJ88k_7sgBXJu6FMVyS' },
        { title: 'Métabolisme — ch. 1, métabolisme et bioénergétique', ext: P, mb: '0.8', year: 2021, fid: '1Wtghq1eyEFlIihfps1DsYdC3LuRES5Qm' },
        { title: 'Métabolisme — ch. 2, métabolisme de l’hème', ext: P, mb: '1.7', fid: '1K0foz6GJK_iEuOmlPYtuln_uEW_gyvCL',
          versions: [
            { title: 'Métabolisme de l’hème — diapositives', ext: P, mb: '1.0', fid: '1vewd0DWXCIbTd-qcMC8npNG8xojTf2sT' },
          ] },
        { title: 'Métabolisme — ch. 3, cycle de Krebs', ext: P, mb: '1.6', year: 2021, fid: '1xhrBExd7RmBo6n7Vww1T9Alxki-fPySi' },
        { title: 'Métabolisme — ch. 3, métabolisme des nucléotides', ext: P, mb: '1.4', fid: '1XiuOrualQWnp-AX5kr6vYOL7tAb0Jh15' },
        { title: 'Métabolisme — ch. 4, glycolyse anaérobie', ext: P, mb: '1.2', year: 2021, fid: '10GTREIxOHMDsPlQMgda4PWorXPXBV-Yz' },
        { title: 'Métabolisme — ch. 5, voie des pentoses phosphates', ext: P, mb: '1.1', year: 2021, fid: '1jQW3-qCQW1p-Vr-wZ0d6VCuUAYBgFJLf' },
        { title: 'Métabolisme — ch. 5, réactions de la voie des pentoses phosphates', ext: P, mb: '0.2', year: 2021, fid: '1HIvP7a1zp3aGJntjxdOo3Oc2EzPGkN7B' },
        { title: 'Métabolisme — ch. 6, néoglucogenèse', ext: P, mb: '1.1', year: 2021, fid: '1HRR3wIWP2qooSsniAEQf9XXeAG6h7ij6' },
        { title: 'Métabolisme — ch. 6, étapes de la néoglucogenèse', ext: P, mb: '0.3', year: 2021, fid: '1xqxm7-1cBbfym7sxmGEf0B6jOiAMLXK-' },
        { title: 'Métabolisme — ch. 6, métabolisme du glycogène', ext: P, mb: '1.0', year: 2021, fid: '1Auw2v8IRebYLXMqkuTwDKmoNPCjjeELQ' },
        { title: 'Cours complet de biochimie métabolique', ext: P, mb: '1.5', fid: '16MIePazAexsTqsTGdO9TYENCCXG9xuSk' },
        { title: 'Polycopié — lipides', ext: P, mb: '2.3', year: 2021, fid: '1GV8TRcd1JZsuD4uVTVaUtk4cNkb-SjRc' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — bioénergétique', ext: P, mb: '41.4', fid: '19XpdDril5HUnGkRv3jS-6JSJEsmEpX72' },
        { title: 'Résumé — enzymologie', ext: P, mb: '5.8', fid: '1oTIVwrbAYSmycq3gpNfD2fBGQCLuu1Ee' },
        { title: 'Résumé — glucides', ext: P, mb: '2.2', fid: '1JjmJHLkV4crBv0bwg0c9J4wFEhxzTdiO' },
        { title: 'Résumé — protéines', ext: P, mb: '22.2', fid: '1y0DX3mGfz5TthcPNtx5OkND3_TyjnS_g' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.3', year: 2025, fid: '1wFAWhM4L2gtJft0B69yA7yjCGxKQ22gQ' },
        { title: 'Examen 2025 — rattrapage', ext: P, mb: '0.7', year: 2025, fid: '12lOD4rj2KShZzhN1Ki_OCKLtr1Zqx1Vd' },
        { title: 'Examen 2020', ext: P, mb: '1.1', year: 2020, fid: '1V8RN02dd0oKRQX-nqJgyrOZpWkrSBZhU',
          versions: [
            { title: 'Corrigé — examen 2020 (photographié)', ext: J, mb: '0.1', year: 2020, fid: '1tbf08vPc170PWbjCvCh8ZS8K26KsK0Vj' },
          ] },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD 1', ext: P, mb: '0.3', fid: '1AUyMZ47V2ZjuE5HUJkkipHAu91UYHtzm',
          versions: [
            { title: 'Exercices corrigés — 2024', ext: P, mb: '0.3', year: 2024, fid: '1EZnXKAHVGRV83htc63dtGZ-GHndHfNDe' },
          ] },
        { title: 'ED — enzymologie (UVT)', ext: P, mb: '0.3', fid: '16ZO4hM2SZNTFXb37THlmVprtF4UtrGqs' },
        { title: 'QCM — lipides', ext: P, mb: '0.2', fid: '1oLNr3GUOroIFTfOpLa9xgOd9N9dlLI42' },
        { title: 'TD — glucides (2022)', ext: P, mb: '0.4', year: 2022, fid: '1As5QcRPlPvyxa6aSQYPy4zt5Of7G8ARH',
          versions: [
            { title: 'Correction du TD 2 — glucides', ext: P, mb: '0.8', fid: '1MCtqLnp9v8I1FoXNarSuF3Jrbzi5OuJB' },
          ] },
        { title: 'TD — glucides', ext: P, mb: '1.3', fid: '1O9M6vAv54UMdjHWTSt4E_bKMDlSD44B5' },
        { title: 'TD — lipides', ext: P, mb: '0.2', fid: '1YJG8Ity8zhy65aGyv8uxmPbA0nDt0t2L',
          versions: [
            { title: 'Correction du TD 2 — lipides (2022)', ext: P, mb: '1.3', year: 2022, fid: '1Mo7ZTP74u6PsuviR6wrROGPKnWtB5zbc' },
          ] },
      ],
    },
  ],
};

// The teacher's three sessions, then three lectures filed beside them with no
// author, in the order of the course. «FST» papers are the Faculté des sciences
// et techniques'.
export const PCEP2_BIOLOGIE_MOLECULAIRE = {
  id: 'pcep2-biologie-moleculaire', promo: 'pcep2', semester: 'S1',
  name: 'BIOLOGIE MOLÉCULAIRE', icon: 'micro', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Cours',
      lectures: [
        { n: 1, title: 'Acides nucléiques et information génétique', ext: P, mb: '2.5', fid: '1GmhwA7RnpueheveNTqhhJuKoXP2uJY7l' },
        { n: 2, title: 'Synthèse protéique', ext: P, mb: '3.2', fid: '1S8dUu6VfncCz-ZY9Pb_3jcWzfsgMdOG-' },
        { n: 3, title: 'Biotechnologie', ext: P, mb: '10.6', year: 2022, fid: '18HlsrQSH0EOJlPXrwLs58ALzNqT9MQmt' },
      ],
    },
    {
      title: 'Réplication, transcription et traduction',
      lectures: [
        { n: 4, title: 'La réplication', ext: P, mb: '0.4', fid: '1qkb2gu6Dd5eLAyQRR8rhGuh5NwfBJY3s' },
        { n: 5, title: 'La transcription', ext: P, mb: '0.8', fid: '1Fmo4W3L8xU94VmTpEtyfkoRvriaBvHFd' },
        { n: 6, title: 'La traduction', ext: P, mb: '1.8', fid: '14VH5LAMIB3_Clvosl1bin_NaDp6zoelw' },
      ],
    },
  ],

  sections: [
    {
      id: 'tunis', where: 'archive', title: 'Cours — Tunis', icon: 'book',
      items: [
        { title: 'Ch. 0 — mécanismes fondamentaux de la biologie moléculaire', ext: P, mb: '0.3', year: 2021, fid: '1LKU3VmGUTnS4PlZcACXQA3zHVp-fU6Kb' },
        { title: 'Ch. 1 — information génétique', ext: P, mb: '0.4', year: 2021, fid: '1m2ZzvilGIBB654RpelIbIn79sP6Zol66' },
        { title: 'Ch. 2 — réplication', ext: P, mb: '0.9', year: 2021, fid: '1f0c2vEzZP_xenlboQ8nFjtOxpwulJjbO' },
        { title: 'Ch. 3 — transcription', ext: P, mb: '1.0', year: 2021, fid: '1vommfH8XORHV_6_Ri2TTB0VPipfIGhbE' },
        { title: 'Ch. 4 — traduction', ext: P, mb: '0.9', year: 2021, fid: '1g2A4SkMZd3NRU57ELyOqkFRCvb5JYiHN' },
        { title: 'Ch. 5 — réparation', ext: P, mb: '0.7', year: 2021, fid: '1gkhHZ1iJC31OO8lhOlLoz_03a2DsK6P3' },
        { title: 'Régulation de l’expression génique', ext: P, mb: '9.4', year: 2021, fid: '1SE_F-E9sIvV0Hizb3iikXHQopUK2t_tO' },
        { title: 'Cours complet de biologie moléculaire, 2e année', ext: P, mb: '13.7', year: 2021, fid: '1hVSndo17hvi__GFJO6pcXZ4HvYTAUDIl' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — réplication de l’ADN', ext: P, mb: '0.4', fid: '1jV94Dyq6ADHnsOjCKBinbWagYVeI5Gm_' },
        { title: 'Résumé de biologie moléculaire (2)', ext: P, mb: '4.6', fid: '1WOV03KixU_pi1M_vK-LpnWgWXSHyrUPH' },
        { title: 'Résumé de biologie moléculaire', ext: P, mb: '5.5', fid: '1OziUG54WDJ3RHHoMlo_Q7APdqvxaz5bq' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen — session normale', ext: P, mb: '0.6', fid: '17RMbCGO5CnkKS10RsKvbkdaLLKMXhAG1' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.3', year: 2025, fid: '18C8j-UK5o7tKSBEV7H-hrAFhuCUMf4t9',
          versions: [
            { title: 'Corrigé — examen 2025, session normale (Adou et Aicha)', ext: P, mb: '3.2', year: 2025, fid: '15ryHzdpyAtWNIUp-DVefW7ifgtUHand8' },
          ] },
        { title: 'Examen 2025 — rattrapage', ext: P, mb: '0.3', year: 2025, fid: '1iD1-fLEvZbPcmrQ49skvZqygpvJCz0Sh' },
        { title: 'Examen 2024 — session normale et rattrapage', ext: P, mb: '7.8', year: 2024, fid: '1AEgzgNouCvHeHtPveUWtO5t0ctJ3vDS4' },
        { title: 'Examen 2024 — FST', ext: P, mb: '0.1', year: 2024, fid: '1YdFV1rHGD-KRiSsNxp0DHsDiHjbBP-f2' },
        { title: 'Examen 2024, rattrapage — FST', ext: P, mb: '0.4', year: 2024, fid: '1J7WYpj27Z6ZiPl7zH7HyFOO2PZSxQgJ1',
          versions: [
            { title: 'Corrigé — rattrapage 2024, FST', ext: P, mb: '0.9', year: 2024, fid: '1ClejxohIgA-khaP6w4vr1_JI7tKgCCvI' },
          ] },
        { title: 'Examen — FST', ext: P, mb: '0.3', fid: '1jcoNas7hzsb1Hcv3OwiUVa4sizBcrtqI' },
        { title: 'Devoir 2024 — FST', ext: P, mb: '0.2', year: 2024, fid: '1PJB2n5WkdUhha2IgMfl5Rq43tO1xNyQz',
          versions: [
            { title: 'Corrigé — devoir 2024', ext: P, mb: '0.8', year: 2024, fid: '1Cc_GEm7oufHNdfSmoUhVvzhybh93DdEK' },
            { title: 'Corrigé — devoir 2024 (2)', ext: P, mb: '3.9', year: 2024, fid: '1Mn42GGdMHi1Cg5KwubB9W1SszkiHJCRp' },
          ] },
        { title: 'Devoir 2023 — FST, corrigé', ext: P, mb: '0.4', year: 2023, fid: '1rXNjLV7oI_ZURdc7FG9yu8Po3kRxcFzP' },
        { title: 'Devoir de génie génétique 2024 — FST', ext: P, mb: '0.6', year: 2024, fid: '1XLkfNbtxAWUsdNzpGkNgWP_BFVkXHJu6' },
        { title: 'Recueil d’examens de biologie moléculaire', ext: P, mb: '25.4', fid: '1sHaLMi4CB8yUb5RrIpcBLj7sp6f-gjEb' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD 1 — biologie moléculaire', ext: P, mb: '0.1', fid: '1kPiEh_zvGqz24dfDr7H8oMswEjHfn3Sb',
          versions: [
            { title: 'TD 1 — corrigé', ext: P, mb: '13.3', fid: '1eSiXuiAVDYsFCAibxzVWU1tsVSTanM5_' },
            { title: 'TD 1 — corrigé 2024', ext: P, mb: '1.2', year: 2024, fid: '1KZvH6-KqigAq-JNspKCGhVGQD7wOjSdo' },
            { title: 'TD 1 — autre copie', ext: P, mb: '2.5', fid: '1BOqzn1wBRbQQcW5t3y7bROBjPgSgNpHY' },
          ] },
        { title: 'TD 2 — biologie moléculaire', ext: P, mb: '0.3', fid: '1Y5u4qF_BdX3UALNxC-NLZY1bkwUy_KAU',
          versions: [
            { title: 'TD 2 — corrigé', ext: P, mb: '13.0', fid: '1NSRmUgAPCaMHDXzXD28N2y7fkBX8XgG1' },
          ] },
        { title: 'TD 3 — biologie moléculaire', ext: P, mb: '0.1', fid: '1uNf650vYhkIL_Jk-eBDC8IsBvlUnu1Ma',
          versions: [
            { title: 'TD 3 — corrigé', ext: P, mb: '4.9', fid: '1kuHFMGa6XiO7LNbyioR7QEQaCY61W53Y' },
          ] },
        { title: 'TD 4 — biologie moléculaire', ext: P, mb: '0.2', fid: '1N1jI3P9bu8XniXnrySrmoJbY2gyiCzID',
          versions: [
            { title: 'TD 4 — corrigé', ext: P, mb: '6.2', fid: '1-U4JXu64_USOs-EcFzEc3AY0MkuMKcTw' },
          ] },
        { title: 'TD 1 — génie génétique', ext: P, mb: '0.2', fid: '1ZyeD2dmLxOnqY-O83vxLxZB19XjUcV-T',
          versions: [
            { title: 'TD 1 — génie génétique, avec correction', ext: P, mb: '9.9', fid: '1exxoE2iwBx7BywV_xEAEgxQyRT5I-J_S' },
          ] },
        { title: 'TD 2 — génie génétique', ext: P, mb: '0.1', fid: '1myGy6dO4WrWZ9nSNim1yfCj5ubBl9TXU' },
        { title: 'TD 3 — génie génétique', ext: P, mb: '0.4', fid: '1ETBmlr1VNxnleJHRgb_sg33y3qb5Xvc9' },
        { title: 'TD 4 — génie génétique', ext: P, mb: '0.1', fid: '1iZgxBnkJW8IGPH0lbMMyJV03-3DGTYQO' },
        { title: 'TD — mutations', ext: P, mb: '0.4', fid: '1si5zfDEEjS1h2CMBOGkgvehIuyPg5ogu' },
        { title: 'Corrigé des TD 1 et 2', ext: P, mb: '1.4', fid: '18-gf7Hm0B6QOp0dsj4fkrSvjPg2-dUkW' },
        { title: 'TD 1, 2 et 3 de génie génétique — corrigés', ext: P, mb: '4.4', fid: '17yqMryDh_qCz5TO46EKPzX7xMH7uVri2' },
        { title: 'TD 1, 2 et 3 de biologie moléculaire', ext: P, mb: '1.6', fid: '1GqcE-Ep4kR-EUt-5r0NiIPYjJCGynXK8' },
        { title: 'TD de biologie moléculaire, partie 2 — Brahim', ext: P, mb: '8.4', fid: '1iPFf6rCD5V3E65pAAQmIfODDg8qZwlrV' },
        { title: 'Exercices — synthèse des protéines', ext: P, mb: '0.8', fid: '1pfI8wVoSY6aNSy0-1RZPE2ubhED5APMz' },
        { title: 'Exercices de biologie moléculaire', ext: P, mb: '0.2', fid: '1eKFUGVLJBrhWs9NB7vQPuDjAdmz6LwJg' },
        { title: 'Exercices de génie génétique', ext: P, mb: '0.6', fid: '12RA1AKl-xkC1RUaaPBoNiHKUEk4FUTQZ' },
        { title: 'TD 2 de génie génétique — corrigé type (licence de biochimie)', ext: P, mb: '0.6', fid: '1RhnmSXW3R0gbdSGHt9mYFQMgScKXgqSS' },
        { title: 'TD 2 — corrigé type', ext: P, mb: '0.6', fid: '1t4lu_uBjfwzCcWx_RC5dUdh3chOA4hmo' },
        { title: 'TD — solutions', ext: P, mb: '0.1', fid: '1fvxCX9fc4AHV0eUC1E4rIC5wsru3bVUc' },
      ],
    },
  ],
};

// Drive numbers the chapters 1 to 3, 4, 5 and 7; the systématique, unnumbered,
// falls between them.
export const PCEP2_BOTANIQUE = {
  id: 'pcep2-botanique', promo: 'pcep2', semester: 'S1',
  name: 'BOTANIQUE', icon: 'micro', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Botanique',
      lectures: [
        { n: 1, title: 'Chapitres 1 à 3', ext: P, mb: '3.3', fid: '1Av5DMH8Vvdrg6eXl5yasyGQM_ZFd-w4P' },
        { n: 2, title: 'Chapitre 4', ext: P, mb: '0.9', fid: '1eI7EurpLYDpQ0tauuNmKAMKKnwmQJpXP' },
        { n: 3, title: 'Chapitre 5 — la reproduction', ext: P, mb: '1.1', fid: '1H4HSCbuphHinVMny5nuyvwU4ZlgPWYVl' },
        { n: 4, title: 'Systématique des grandes divisions du règne végétal', ext: P, mb: '0.5', fid: '15h3Ln5bq7hmExfcM5bCJR27xX6Kp0jUT' },
        { n: 5, title: 'Chapitre 7 — les algues', ext: P, mb: '1.6', fid: '1LfFhR3R7obaaGYUw4dtHe4scfWgtngVJ' },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé de botanique', ext: P, mb: '19.1', fid: '17fKWaThxzr3b4KALXF0b0UDZUYTmAnaE' },
        { title: 'Résumé — les algues', ext: P, mb: '0.8', fid: '18f6THYbn76JXG1XPmpPHfexDrCXaeWz2' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '1.6', year: 2026, fid: '1gdFGRCdUZoHkGuukpwpkbYNzsZRbsV5Q' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.2', year: 2025, fid: '1XpoSXIvsy4XkglrmMRmR1NT_XR5KHtai' },
        { title: 'Examen 2025 — rattrapage', ext: P, mb: '0.2', year: 2025, fid: '1TMJGXOfQk7-VJB-zXFGpEPxuDhnqtXTP' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '0.6', year: 2024, fid: '1o9o67k1YLQuVnQPoh38HblVHfVAL4qd5' },
        { title: 'Biologie végétale — examen 1 (Algérie)', ext: P, mb: '0.3', fid: '1WIy3fKQUih58yW3xhDYt1dQfslBsZeCH' },
        { title: 'Biologie végétale — examen 2 (Algérie)', ext: P, mb: '1.0', fid: '1SnXWquukgpDgrd12uC_cXKGOAppBXEV5' },
        { title: 'Biologie végétale — examen 3 (Algérie)', ext: P, mb: '0.2', fid: '16J6ONVlYK4ihIzso3qNC_sIzsg35o9X6' },
        { title: 'Biologie végétale — examen 4 (Algérie)', ext: P, mb: '4.8', fid: '1VgfSHNUwcYwk1RYjYzrUU9wo02m1jIIW' },
        { title: 'Biologie végétale — examen 5 (Algérie)', ext: P, mb: '0.3', fid: '1LJyxmww0IPANSHouycrrkEYxCbw-WiPe' },
        { title: 'Biologie végétale — examen 6 (Algérie)', ext: P, mb: '4.8', fid: '1JgbaVjRmsINa2SH-phIzS0Yn7W_ee-zn' },
        { title: 'Biologie végétale — examen 7 (Algérie)', ext: P, mb: '0.2', fid: '129rSFsbs_vxsfooWQHgaOKiJpdm0PTPi' },
        { title: 'Biologie végétale — examen 8 (Algérie)', ext: P, mb: '0.2', fid: '1ArRaCaojhcL9AA_45iTdDxIFyjBmXby5' },
        { title: 'Biologie végétale — examen 9 (Algérie)', ext: P, mb: '0.1', fid: '1D5T1muD7NQwkJgJ-bi5a-TmYeIJ05AKo' },
        { title: 'Biologie végétale — examen 2021, corrigé (Algérie)', ext: P, mb: '0.5', year: 2021, fid: '14madMNPax8wSuGSiOYHJUTq8WadkpfZu' },
        { title: 'Biologie végétale — rattrapage 2014, corrigé (Algérie)', ext: P, mb: '0.5', year: 2014, fid: '1F1otj_ujTshTLtdVAFraChZEJ2QBtF4a' },
        { title: 'Biologie végétale — rattrapage, corrigé (Algérie)', ext: P, mb: '1.4', fid: '102igxXVi9WH49NFb_ctw1NAQR1WX7T7v' },
        { title: 'Biologie végétale — exercices corrigés (Algérie)', ext: P, mb: '9.3', fid: '1wupLLmPTz7urpGzxAcm9wyyFfxZ2a9FO' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD 1 — corrigé', ext: W, mb: '0.1', fid: '1nzx9dSjxkaTitqwbJd6hxe4ipTPocu2_' },
        { title: 'TD 2 — corrigé', ext: W, mb: '0.8', fid: '1a6A60btewnMvJc2-IPVUmO73KdwM5klb' },
        { title: 'TD — diapositives', ext: X, mb: '1.4', fid: '1ZZw6DrpqEAzfM6_kyTCn2p6scvXmut21' },
        { title: 'TD 2', ext: P, mb: '0.3', fid: '1_-ImuJK4mj--Vau56i8dW3Bz8-7-RWBM' },
        { title: 'TD 3', ext: P, mb: '0.3', fid: '1ERSGGmzwxeJMqhW9S3EZLro_RKhquU7y' },
      ],
    },
  ],
};

export const PCEP2_IMMUNOLOGIE = {
  id: 'pcep2-immunologie', promo: 'pcep2', semester: 'S1',
  name: 'IMMUNOLOGIE', icon: 'shield', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Immunologie',
      lectures: [
        { n: 1, title: 'Immunologie fondamentale — Nouakchott 2022', ext: P, mb: '14.5', year: 2022, fid: '1j-AH8_qFJViUtkbgx4-PKzXWvrxLcPEB' },
        { n: 2, title: 'La réaction antigène-anticorps', ext: PT, mb: '0.7', fid: '1J-VSl-g1bcjb352-Bxz5XO2ogaRDAygF' },
        { n: 3, title: 'Régulation de la réponse immunitaire', ext: PT, mb: '3.3', fid: '15qUlnJSsK_mWu7Zdf3f9kHGbXZq7IW_2' },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen — session normale', ext: P, mb: '2.0', fid: '1XlnDr_2_0K787GhoIXJW6bY_mTXLSjo6' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '1.7', year: 2025, fid: '1Do9ciplC8qxM5Nidq3r2z3APIyPIlpFa' },
        { title: 'Examen 2025 — rattrapage', ext: P, mb: '5.7', year: 2025, fid: '11mpzhgVYg9lMn8ylt601Rj9hCxJPYvcD' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '2.2', year: 2024, fid: '1zE2bVNHT6HwJ1OYpEu3uUMHEh0N0Y0zz' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '0.1', year: 2023, fid: '1euhAEz6enFi4zzeijHwyECoAWBaGnLwF' },
        { title: 'Examen 2023 — autre copie', ext: P, mb: '3.2', year: 2023, fid: '1-j8kG8lqblW2obzurgk3xH5Vtj6DFiLr' },
        { title: 'Examen 2022', ext: P, mb: '15.2', year: 2022, fid: '1UV2dq2eKHmbakQ8q2Q__MNcF5OsDqbL0' },
      ],
    },
    {
      id: 'djibouti', where: 'quiz', title: 'Examens — Djibouti', icon: 'quiz',
      items: [
        { title: 'Examen — Djibouti', ext: P, mb: '0.2', fid: '11uiS8-pVJ25etGLzo0UvY05fAK28eJ1h' },
        { title: 'Examen — Djibouti (2)', ext: P, mb: '1.7', fid: '1Fs7u6_VBFmO5-DehmPPflq0nnQEqmMs0' },
        { title: 'Corrigé — Djibouti (photographié)', ext: J, mb: '0.2', fid: '1-JRQafFwEYv83gUuxcloH1wslQM7Cx0r',
          pages: ['1-JRQafFwEYv83gUuxcloH1wslQM7Cx0r', '1-xPA2CXs7rckZPwYDOV5mjLQM088egJM'] },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolés — antigènes et organes lymphoïdes', ext: P, mb: '1.4', fid: '1lMYkfoqFUYJAARqld_ZdkQtP_NMiakEu' },
        { title: 'Isolés — cytokines', ext: P, mb: '2.3', fid: '1KxT-AWQ-IPUaCIL-stsB0XJEwntM31G3' },
        { title: 'Isolés — immunité non spécifique', ext: P, mb: '4.5', fid: '1mlFWGtql0um71CIMFR0uDVd6Pk6nqX8U' },
        { title: 'Isolés — immunité spécifique', ext: P, mb: '7.0', fid: '1CqShoCNYQ0839NeV911K08KBcHrbZHdv' },
        { title: 'Isolés — immunoglobulines', ext: P, mb: '8.6', fid: '1WxJCwY4lBGDniGEkouWhtqfp2ry-L6d4' },
        { title: 'Isolés — recueil complet', ext: P, mb: '3.6', fid: '1SsRRAlfvc6SOB-3bZGJmDR42hmQZ7ztR' },
        { title: 'Correction des isolés — Elmourteji Ahmed Boubacar', ext: P, mb: '18.9', fid: '1Rdhh4Dzycdo8oPxMXFxq11zMjzuNeFT_' },
      ],
    },
  ],
};

// Two parts, bactériologie and virologie. Drive sorts the bacteriology files by
// name; here they run from the cell to the antibiotics. The two files in
// «ثقف نفسك» («test yourself») are revision questions with Arabic names.
export const PCEP2_MICROBIOLOGIE = {
  id: 'pcep2-microbiologie', promo: 'pcep2', semester: 'S1',
  name: 'MICROBIOLOGIE', icon: 'micro', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Bactériologie',
      lectures: [
        { n: 1, title: 'Anatomie bactérienne', ext: P, mb: '1.5', fid: '1oQ5UMg21Hxvdh7ouv2o77bu_hkZUi-R2' },
        { n: 2, title: 'Classification des bactéries', ext: P, mb: '0.1', fid: '1px2bxzCTudneWGmPMuERpWr-6pTpXo_4' },
        { n: 3, title: 'Nutrition des bactéries', ext: P, mb: '1.2', fid: '19m_jDbEr9LwRnibgeR2VRDXxMVPjFHE2' },
        { n: 4, title: 'Croissance et métabolisme bactériens', ext: P, mb: '1.6', fid: '1cpwdl68gLb-Tcgiei8MxHbp-a2JUk2it' },
        { n: 5, title: 'Génétique bactérienne', ext: P, mb: '2.6', fid: '1vEb418Lxb262IcrETpO5Bm3-hJCV4pwT' },
        { n: 6, title: 'Facteurs de pathogénicité', ext: P, mb: '1.9', fid: '1FQWK4HQH6uuxGZWxkwQTW6uorNWmkNqT' },
        { n: 7, title: 'Antibiotiques', ext: P, mb: '0.4', fid: '1qw9DvhnXCfN2xtQnDkp62pRtYGeaR0_W' },
      ],
    },
    {
      title: 'Virologie',
      lectures: [
        { n: 8, title: 'Structure et classification des virus', ext: P, mb: '0.9', fid: '1DxE_p8fS5f759i1Hl13_xxOkRxhxwv37' },
        { n: 9, title: 'Multiplication virale', ext: P, mb: '0.7', fid: '186P3HzDRhMKr12tR5_YE9R9sQDpb09LI' },
        { n: 10, title: 'Méthodes de diagnostic en virologie', ext: P, mb: '0.6', fid: '1oQdQpjLik-aDJIBeuxYu6-UDHn8g6z0N' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Virologie — polycopié de DCEM1', ext: P, mb: '0.7', fid: '1yotiKN9XFfIY-YejzkYaRzqZ4Tj0mKMW' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — anatomie bactérienne', ext: P, mb: '6.0', fid: '1TBlQ2wZeSvk1_6p7vTQ-LZ9ZD6e8-OJ5' },
        { title: 'Résumé — nutrition bactérienne', ext: P, mb: '4.4', fid: '1h8HmUftRGQI6f6Me3UT-MmekDpezYzI-' },
        { title: 'Résumé — facteurs de pathogénicité', ext: P, mb: '6.9', fid: '1Kvur6j2GFKnPYRcCofttu8WqYcuXc2Vj' },
        { title: 'Résumé — structure et classification des virus', ext: P, mb: '3.9', fid: '1NDz4oWtfBBWAHaO24Mz3UoNzPOaWMHZ6' },
        { title: 'Résumé — structure et classification des virus (Houda Cheibeta)', ext: P, mb: '5.9', fid: '1Zv4j1zzA0tP8PWqH5DTfHvERN3eGRoa8' },
        { title: 'Résumé — réplication virale', ext: P, mb: '2.0', fid: '14mErgq3Ex-IpGWug4EqOS0n-8ljwERsc' },
        { title: 'Résumé — réplication virale (Houda)', ext: P, mb: '4.2', fid: '1ppsP5tjh-zDe2sPe8tv7y26Nop1saLQC' },
        { title: 'Résumé — méthodes de diagnostic en virologie (Houda)', ext: P, mb: '7.1', fid: '1daBQFNio0XZn4VTtIMRHjTZOvRAWFrYS' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '2.3', year: 2026, fid: '10TA9ONfKt1_56yJ9BwtC8fjl5Kxmave8' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '1.0', year: 2025, fid: '1_R_ZTBwglp86SxkYOgODHcSvYhohixB-' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '1.2', year: 2024, fid: '1n4Cl1MGZFyBXgyKcC75FzwdKlSF-Kv87' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '0.8', year: 2024, fid: '1kvP4uGUhXdPM-_UYZR9E0SSoqiF_YFKb' },
        { title: 'Virologie (DCEM1) — examen 2023', ext: P, mb: '1.2', year: 2023, fid: '1Wb1McVkZbvA1PxBxnk6GmVHv5--5oFlT' },
        { title: 'Virologie (DCEM1) — examen 2020', ext: P, mb: '1.1', year: 2020, fid: '10DtCiTM2iqW0Zj0ZLngNbQiHlb3EX5pZ' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM', icon: 'quiz',
      items: [
        { title: 'Testez vos connaissances — anatomie, nutrition et croissance des bactéries', ext: P, mb: '0.8', fid: '1nQxlsv2OHodgVD9GPI8nQCWM9bNEmGOt' },
        { title: 'Testez vos connaissances — facteurs de pathogénicité', ext: P, mb: '0.4', fid: '1ZmEwtjPOoE6RC4HDKGa0ZTST5C3g7I0p' },
        { title: 'Testez vos connaissances — corrigé 2024', ext: P, mb: '5.1', year: 2024, fid: '1OmcPLnyeChf4wCD55_EUbI2uu-9oyc7F' },
        { title: 'Questions de révision — bactériologie', ext: P, mb: '0.9', fid: '1PoZdnpNbKgohp91h9nL_WfSp-TnBmFOV' },
        { title: 'Questions de révision — parasitologie', ext: P, mb: '1.1', fid: '1GwsadEkvwUgr1Lrs4tqs1Kg9lnlkbN3U' },
      ],
    },
  ],
};

// Drive's chapters are I, II, III and V; there is no IV.
export const PCEP2_CHIMIE_ORGANIQUE = {
  id: 'pcep2-chimie-organique', promo: 'pcep2', semester: 'S1',
  name: 'CHIMIE ORGANIQUE', icon: 'flask', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Chimie organique',
      lectures: [
        { n: 1, title: 'Chapitre I', ext: P, mb: '2.1', fid: '1oL3CofFDPuXLb6WNhUWeyuCJjb9BzZau' },
        { n: 2, title: 'Chapitre II', ext: P, mb: '1.4', fid: '1bZitMwsZ6K5EZqimGzO3tSnDWYlu-OBz' },
        { n: 3, title: 'Chapitre III', ext: P, mb: '1.8', fid: '1SPs93zJOFq5LIQ7lrmL_AZtzM9rKSSht' },
        { n: 4, title: 'Chapitre V', ext: P, mb: '2.9', fid: '187ozfBg_3MIEJasr2-xOiQu1fvylS96u' },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé des chapitres 1 à 3', ext: P, mb: '13.4', fid: '1k3hRl-blWQbYzNzbcSQ5XI1g4kiRP6RD' },
        { title: 'Résumé de chimie organique, partie 2', ext: P, mb: '22.0', fid: '1vL5mDCrBZSXR5YsXpzXJAqCmJtF1kfaV' },
        { title: 'Résumé — aldéhydes et cétones', ext: P, mb: '1.4', fid: '1Wh62JP7GIeAdDp3ZUYEYdwIJR53LuqWX' },
        { title: 'Résumé — hydrocarbures aromatiques', ext: P, mb: '5.0', fid: '1RlUXix2Jsdo-beEmQNXjKkvcpNHAFZKs' },
        { title: 'Mécanismes réactionnels — Pr Chriaa Najeh', ext: P, mb: '4.8', fid: '108gIsll6S0_Ff6s67VGqhQlGnaAknGAe' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen — session normale', ext: P, mb: '0.6', fid: '1ExQZCXmqmTMK1USJ1k26C9Vfz6jZy3cq' },
        { title: 'Corrigé — examen 2025, session normale', ext: P, mb: '2.2', year: 2025, fid: '1jCfrWwBDH_vAdDVZ3mjoeTHV7Vop6qFH' },
        { title: 'Examen 2025 — rattrapage', ext: P, mb: '0.3', year: 2025, fid: '113LNw2cWXNZQ6eoaywhVBxl5mpv7lBsg' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '2.0', year: 2024, fid: '1CVauG4p7RjY8gWEev9xM8Qyne7--r9wR',
          versions: [
            { title: 'Corrigé — examen 2024', ext: P, mb: '1.4', year: 2024, fid: '1Spb9vHtwtXNMLNagro4eiuaQEutqAG5i' },
          ] },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD 1', ext: P, mb: '0.5', fid: '10stcA5_1W81xlA3aDFi0ZBPK5uzNodfe' },
        { title: 'TD 2', ext: P, mb: '0.5', fid: '1mDkpn75lUU1muP_wV3tMq3oP9ABjbJR2',
          versions: [
            { title: 'TD 2 — corrigé', ext: P, mb: '0.8', fid: '11w4vF-t3rGYo0R4EceGWHP4ovHb3N8gK' },
            { title: 'TD 2 — corrigé (2)', ext: P, mb: '1.6', fid: '1ioytrCTP-tfMcH_9Lhk-1IiaN3LLwI0E' },
            { title: 'TD 2 — corrigé des exercices 7 à 9', ext: P, mb: '0.6', fid: '1wyZyJ8I8NHJ1KD9fhGWn4BFZlCgpWVml' },
            { title: 'TD 2 — suite', ext: P, mb: '0.6', fid: '11UaxX9yHoQZ1uxROqr4ewoolG_qUoULI' },
          ] },
        { title: 'TD 3', ext: P, mb: '0.4', fid: '1bnm94wadmOTYrWUnp6LRvGFp6cRHYP0M',
          versions: [
            { title: 'TD 3 — corrigé', ext: P, mb: '0.3', fid: '13ELzEvk0Rg4W15j_gHDUP8vOeGtNQSWa' },
            { title: 'TD 3 — corrigé (2)', ext: P, mb: '1.2', fid: '1uuXiS0cv_IpN7iLtZWdB9o4a8N27anN4' },
          ] },
        { title: 'TD — spectroscopie infrarouge', ext: P, mb: '0.3', fid: '1MvW29c0rCrovsV0jj2j8tFN8CKpjmLWh' },
        { title: 'TD de chimie organique, partie 2 — Brahim', ext: P, mb: '5.9', fid: '1J5yMYJWvlz7bOgzNJgGwoHZm7lDzIMhF' },
        { title: 'Aldéhydes et cétones — exercices (Lyon, 2009)', ext: P, mb: '0.4', fid: '1bTNcGRXWr1dDJetzaHITRZfZcdoD51yg' },
        { title: 'Carbocycles aromatiques monocycliques — exercices (Lyon 1, 2010)', ext: P, mb: '0.1', year: 2010, fid: '1y3REZhpB-ZEPfKi2mSESynk3AgBnNXwV' },
        { title: 'Hétérocycles aromatiques — exercices (Lyon 1, 2010)', ext: P, mb: '0.1', year: 2010, fid: '147x0bGpl7HmvIXAXNnuKWUkpU8BJ7UxN' },
        { title: 'Hétérocycles aromatiques — exercices (2010)', ext: P, mb: '0.1', year: 2010, fid: '1x_bxT9CS4yl_16WLVXRDiMwIvzQBjAwV' },
        { title: 'Exercices corrigés — UV et infrarouge', ext: P, mb: '1.1', fid: '1VQEb8NknK_X-rnTXNUq87gUsOvra6ZBh' },
        { title: 'Exercices — chapitre 13', ext: P, mb: '0.4', fid: '1n_blFwGwwXODlA8eR3L9skQls0qpRfQD' },
      ],
    },
  ],
};

// Eighteen lectures, numbered 1 to 18 in Drive, which sorts 10–18 ahead of 1–9.
export const PCEP2_GALENIQUE = {
  id: 'pcep2-galenique', promo: 'pcep2', semester: 'S1',
  name: 'PHARMACIE GALÉNIQUE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pharmacie galénique',
      lectures: [
        { n: 1, title: 'Le médicament et les méthodes thérapeutiques', ext: P, mb: '3.7', fid: '1NOhbJSypl_ZW0tBD0-JqbxSCAkN4I5Od' },
        { n: 2, title: 'Aperçu historique de la pharmacie', ext: P, mb: '1.8', fid: '1Wpep91dnY6Vu3nFrk2ATeKMpLc1jCNqa' },
        { n: 3, title: 'Déontologie pharmaceutique', ext: P, mb: '1.3', year: 2024, fid: '1UM0oPuGT9vywRGWQFDVZWHSzMzqueJBZ' },
        { n: 4, title: 'Le mélange', ext: P, mb: '2.1', fid: '10ZDG7GLJ-difUauJb6u9_9TGrgTEfNQO' },
        { n: 5, title: 'La dessiccation', ext: P, mb: '0.4', fid: '1K-W4cWCCGX3gel7HZ7-gnNKE5y8GGj8C' },
        { n: 6, title: 'La dissolution', ext: P, mb: '0.4', fid: '1oir_6e4M_hw-nza45gfXZoZhug-O7XU2' },
        { n: 7, title: 'La filtration', ext: P, mb: '0.4', fid: '1c3RDIsn1smg9BT08gwJYHgrnMjh7FsKN' },
        { n: 8, title: 'Le broyage', ext: P, mb: '0.8', fid: '1_AjrlYu5Z7VaAkeYSSHgpWBFgts9p700' },
        { n: 9, title: 'La stérilisation', ext: P, mb: '1.1', fid: '1d9kV1vFJqe8Ao0mJeJSg9WujXVcfuzL1' },
        { n: 10, title: 'Voie orale — les formes liquides', ext: P, mb: '1.2', fid: '1tLGu-2C1BdZDzrHnpHbKR__6GEi5Bwsm' },
        { n: 11, title: 'Voie rectale — les formes galéniques', ext: P, mb: '1.1', fid: '1-n1JAARwhzGn9xO7ntDQsCd33I_R3yea' },
        { n: 12, title: 'Voie cutanée — les formes galéniques', ext: P, mb: '0.5', fid: '1OmP5IE2aRl-MxRmIB-S_D6iXuIckk0YE' },
        { n: 13, title: 'Préparations pour inhalation', ext: P, mb: '0.5', fid: '1-9fu95Y1Di0wnPpoAvqfBCbNQ7kEXhTo' },
        { n: 14, title: 'Les formes orales solides', ext: P, mb: '1.0', fid: '1G4hq4zSnXaZeqEgyrsotDWMARLjduej6' },
        { n: 15, title: 'Voie parentérale', ext: P, mb: '1.5', fid: '1Qo6n_rJus-mqI1JcdAF8aYWcgm2UX9FC' },
        { n: 16, title: 'Voie bucco-pharyngée — les formes galéniques', ext: P, mb: '0.3', fid: '17TiJM5v3BGo73uBLUXU--H985AXgtN6S' },
        { n: 17, title: 'Voie vaginale — les formes galéniques', ext: P, mb: '0.3', fid: '1Wvk0nzAhatt7-2XEMNfyKbFVr4J61krD' },
        { n: 18, title: 'Voie oculaire', ext: P, mb: '0.9', fid: '1fjdZkGbSLH92l8y43kJF57FaxabPXwqR' },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé — voies d’administration et formes pharmaceutiques', ext: P, mb: '0.7', fid: '1La_uUETs4y_A-etnU-T4AeyC37Gvqctx' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '2.0', year: 2026, fid: '1xj0kiu397IwikiEoNMTj_CXa6vGriavw' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.4', year: 2025, fid: '1nKLvU-eT4W1M8z4fARyl10Y2a5TnvFkW' },
        { title: 'Examen 2025 — rattrapage', ext: P, mb: '0.3', year: 2025, fid: '1el0RwJG3_ZbVDb2Mcx6pfkCfd_fIQGWO' },
        { title: 'Corrigé — session normale', ext: P, mb: '0.8', fid: '1bM4QPfpMDD6hAfkYw2Ymto4QB35PeMhP' },
        { title: 'Corrigé — session normale (2)', ext: P, mb: '0.2', fid: '1DVFVPSAXQ2M75l9FncCsaH7hz9Y5bIHF' },
        { title: 'Corrigé — rattrapage 2024', ext: P, mb: '0.9', year: 2024, fid: '10w4Z5aALfmUv8u7dbRFCZjAq82MA0mtH' },
        { title: 'Corrigé — session complémentaire', ext: P, mb: '0.9', fid: '1IHFzt01iWJf9PJmdeGkw_PzttaDIphj9' },
      ],
    },
    {
      id: 'examens-monastir', where: 'quiz', title: 'Examens — Monastir', icon: 'quiz',
      items: [
        { title: 'Examens de pharmacie galénique — Faculté de pharmacie de Monastir', ext: P, mb: '13.2', fid: '1hDspS8P9yJsxuStaMdnSh0yO71AxFpz_' },
        { title: 'Corrigé — examen de galénique (Tunis)', ext: P, mb: '12.0', fid: '1fY2dq-OfJbGpuDh5x29vQyhxf1QgZPi2' },
        { title: 'Corrigé — Yayso', ext: P, mb: '8.8', fid: '1XjPo04xyq90vtF7pEp6_avgmaTLeal18' },
        { title: 'Corrigé — Yayso (suite)', ext: P, mb: '1.1', fid: '1v8Fp83MHVnWmtci0zmqaDQAL2NEN-L0t' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'Questions de pharmacie galénique', ext: P, mb: '0.2', fid: '1QM1M65i68J5MIQf9TdWLRB3EfA8eOhqc',
          versions: [
            { title: 'Corrigé — Nouh', ext: P, mb: '38.0', fid: '11HBKTJ71dyfv4sjiPSm43oVg6QA7eD_0' },
          ] },
        { title: 'TD — étiquetage et exonération', ext: X, mb: '2.7', fid: '11GbqhkfQQ7v193HzVxg2sEttYnHC0mFb' },
      ],
    },
  ],
};

// Medicine's PCEM2 physiology, first semester: endocrinology and the kidney.
// Three sets of slides, kept apart because they are three teachers' versions.
export const PCEP2_PHYSIOLOGIE = {
  id: 'pcep2-physiologie', promo: 'pcep2', semester: 'S1',
  name: 'PHYSIOLOGIE', icon: 'heart', tint: 'purple',
  professors: ['Dogui', 'Beichar'],

  chapters: [
    {
      title: 'Diapositives 2024',
      lectures: [
        { n: 1, title: 'Introduction', ext: P, mb: '5.9', fid: '1SF2dxw6i7OkMOZ0TXjG-wlBrANF7KosX' },
        { n: 2, title: 'Axe hypothalamo-hypophysaire', ext: P, mb: '15.8', fid: '1lO1tnKW4qnIPnVCYDI_8xGFjDbEVdnh0' },
        { n: 3, title: 'Thyroïde', ext: P, mb: '12.4', fid: '156FUirjuu-mvseiRBFjhpq9vAY6sZONI' },
        { n: 4, title: 'Hormones surrénaliennes', ext: P, mb: '14.4', prof: 'Dogui', fid: '18RG-1c0TG24j_XpsbeDEAOJh0Ea79gHJ' },
        { n: 5, title: 'Rein', ext: P, mb: '2.1', year: 2023, fid: '1vKqA37vTzCSaMLrlbVWC27GG_t4P-z5b',
          versions: [
            { title: 'Rein — 2023', ext: P, mb: '1.7', year: 2023, fid: '1L1Frmh3SiJQ3mwnAZ7CCz8Z4QOASX8V1' },
          ] },
        { n: 6, title: 'Diapositives de Rida Ben Cheikh', ext: P, mb: '18.3', prof: 'Ben Cheikh', fid: '12DF-LqEIhe-XVtJ92AKnaC6uB7ItOHsQ' },
      ],
    },
    {
      title: 'Pr Dogui',
      lectures: [
        { n: 7, title: 'Système endocrinien', ext: X, mb: '0.5', year: 2019, prof: 'Dogui', fid: '1w5erijEQl3Fa-TSk9pL6JeWhQZTwM93A' },
        { n: 8, title: 'Thyroïde', ext: X, mb: '1.7', year: 2019, prof: 'Dogui', fid: '1dKBnLt6N5010Q1Odirr10-R8XUSJQcDu' },
        { n: 9, title: 'Équilibre hydro-électrolytique', ext: W, mb: '0.1', year: 2015, prof: 'Dogui', fid: '1yoZ7owYE1bs5uqOk2htnbrWEavlXzS9L' },
      ],
    },
    {
      title: 'Dr Beichar',
      lectures: [
        { n: 10, title: 'Physiologie endocrinienne', ext: P, mb: '4.6', prof: 'Beichar', fid: '1DMdsEtrjBheKYlkgrjIKvhg1VQHQ7w7o' },
        { n: 11, title: 'Physiologie rénale', ext: X, mb: '12.2', prof: 'Beichar', fid: '1AW5JHc_7CzhYvTlBtyOObeljwmOye1DU' },
        { n: 12, title: 'Physiologie rénale — UASZ', ext: X, mb: '3.3', year: 2025, prof: 'Beichar', fid: '1JpNe_u0qBzljnrj7XrT_hxOUq35wJ0_7' },
        { n: 13, title: 'Fascicule de physiologie rénale — Cheikh Anta Diop', ext: P, mb: '7.9', prof: 'Beichar', fid: '1f4asF46Ne9aW8dvbG44g9fOBpoTtA9kS' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Polycopié complet 2023-2024', ext: P, mb: '4.3', year: 2024, fid: '1M4QEtcoIptnvdtF4fZ3UF_zw9FCUgesi' },
        { title: 'Polycopié 2022-2023', ext: P, mb: '3.3', year: 2023, fid: '12N3_DrGJyzIIlZq0zlDCiUXEjY9ygklA' },
        { title: 'Polycopié 2022', ext: P, mb: '3.3', year: 2022, fid: '1uLEYXKi3TbS8aTHtPMUyf33pIO-waKap' },
        { title: 'Polycopié complet 2021-2022', ext: P, mb: '4.3', year: 2021, fid: '1-bbDa7FFoYdpeaMRyUGOeKCpDrNNXrfp' },
        { title: 'Polycopié 2020-2021', ext: P, mb: '3.3', year: 2021, fid: '1l0a7IqwoHLmplNP7nanQExlnmwWU0bXG' },
        { title: 'Polycopié 2019-2020', ext: P, mb: '5.3', year: 2020, fid: '1sfLY3wiVGqU5ejJEWIFBnOWhTDP_qKgt',
          versions: [
            { title: 'Polycopié 2019-2020 (autre copie)', ext: P, mb: '5.3', year: 2020, fid: '1PdVXNrokwFeoJ4Wv2Ud6Sb3sGXL7tZLU' },
          ] },
        { title: 'Polycopié 2018', ext: D, mb: '12.1', year: 2018, fid: '1Zgh3-gPRR35H7WBxmPWtjzGs-yv_lLnX' },
        { title: 'Polycopié 2016-2017', ext: P, mb: '14.0', year: 2017, fid: '16275enfO6-7UDnSnIDIteegx5hYJmIpZ' },
        { title: 'Polycopié 2015-2016', ext: P, mb: '4.4', year: 2016, fid: '123tsgx1shaK_df4-ZQWpO3JsY5xDOsuJ',
          versions: [
            { title: 'Polycopié 2015-2016 (autre copie)', ext: P, mb: '9.3', year: 2016, fid: '1shLVMhDgLSjzKzwW2BRU3MuARmouAO9p' },
          ] },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '4.2', year: 2026, fid: '1D2ehUUWYTzSBUIHYVxgzKQRZIkTquka2' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '0.6', year: 2023, fid: '1idL7gsOZeOa_NQKRD42QBKyufe7kfxDq' },
        { title: 'Examen 2022 — session normale', ext: P, mb: '3.6', year: 2022, fid: '14hcvjOf6wdSOxX8wh4No_53_Km4Rl9SL' },
        { title: 'Examen 2021 — session normale', ext: P, mb: '5.5', year: 2021, fid: '1Vqzg_926W2W_Apj754QpVcqXbjsMKt7Y' },
        { title: 'Examen 2020 — session normale', ext: P, mb: '3.2', year: 2020, fid: '1c6bbDFyV_VzH7Zs_4cyZvjkGraaRDhbW' },
        { title: 'Examen 2019 — session normale', ext: P, mb: '0.6', year: 2019, fid: '1_9q0fmCQKWEmSonRfRJmg2sLZ9HSMkVw' },
        { title: 'Examen 2018 — session normale', ext: P, mb: '0.5', year: 2018, fid: '1uixYgp9v6EE24bRCgIlDiplmBtAUNHTi' },
        { title: 'Examen 2017 — session normale', ext: P, mb: '0.7', year: 2017, fid: '1pvTRE6lUAnxrPIj6Dim_Ty2B4c4zlJwj' },
        { title: 'Examen 2016 — session normale', ext: P, mb: '1.4', year: 2016, fid: '1blOa7MbpeBvCGfAMs7OJW7T65WYcad98' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '2.2', year: 2024, fid: '1CE983Dr9x1RmQKjr0hfqv_2n-pf4WaWg' },
        { title: 'Examen 2023 — rattrapage', ext: P, mb: '2.6', year: 2023, fid: '13Jq8nzQNe5YwBGDIBMvYej-bVcKI69_6' },
        { title: 'Examen 2022 — rattrapage', ext: P, mb: '0.9', year: 2022, fid: '1_HrrYGgg80jA-r5D1-H9yxWnjEogO6yK' },
        { title: 'Examen 2021 — rattrapage', ext: P, mb: '0.5', year: 2021, fid: '1BA1flM39KOrL3pR9vo_fEaeagxFfUl-A' },
        { title: 'Examen 2021 — rattrapage (photographié)', ext: J, mb: '0.5', year: 2021, fid: '1meXllgiYIiaxWhFAGqA4KILUhK_L6L8K',
          pages: ['1meXllgiYIiaxWhFAGqA4KILUhK_L6L8K', '1DcT4cMwbTYeh5N36yaMOunPgtoKcZoWa', '1VpmpEdx-vYV05Y2RTk1dECvWla2N0NhF', '15aepHp-GurVe4hw4WMf_MuQGhJ5CHrSw', '1qSm7fZdTEyTslj7P1T7xsL5TFVnBqiSh', '1FAQ1C4zFVUZucaAZs2Ilw2GaqRTswUvb', '1o09Xp4Q8lCHFxkTSVUCyrYofsX7nC9jF', '19pLREEwnR1ajK2Bvs5PVGPCWc-dQUnhg', '1Eg2QCjWF_21-u6iBeIwznpot8DHjEaqc', '1aPchkQn9wbtxt_UEA-PsxdkNCqGoBHfT'] },
        { title: 'Examen 2019 — rattrapage, partie 2', ext: P, mb: '2.2', year: 2019, fid: '10K6r9j_Vea-stg_ExX_yy6I1uBrBbOG2' },
        { title: 'Examen 2017 — rattrapage', ext: P, mb: '14.6', year: 2017, fid: '1due4GmUn4LhTJ_QkJv2uefoOMjqxozMN' },
        { title: 'Examen 2016 — rattrapage', ext: P, mb: '4.4', year: 2016, fid: '16DOiNS-xLn5HeSOu1IrS0LmoW2WMGMzR' },
        { title: 'Corrigé — examen 2023, session normale', ext: P, mb: '0.2', year: 2023, fid: '1KMIVvZVEwpi-6OtDOWYKy305ApS6Gai4' },
        { title: 'Corrigé — examen 2021', ext: P, mb: '1.0', year: 2021, fid: '1R3GrnShf7jy0yKKVihqPj-KjoQIfzBG2' },
        { title: 'Corrigé — examen 2021 (2)', ext: P, mb: '0.2', year: 2021, fid: '1xDyXwzngyu-UrpG8G-56x7uVT1xcJf9U' },
        { title: 'Corrigé — examen 2019', ext: P, mb: '0.2', year: 2019, fid: '1nzGe2_gLVj4M_6lZ5hyiv7GBi4Bxjfcm' },
        { title: 'Corrigé de physiologie', ext: P, mb: '16.6', fid: '15ud5QQktA0o63eOtD1iJSAH2nSBacaRj' },
        { title: 'Corrigé — Med Amar', ext: P, mb: '6.4', fid: '1tSQRqe5Mb3HQ_lsb7qNEhmhKIAFTDtnQ' },
        { title: 'Examens corrigés — Sena', ext: P, mb: '10.5', fid: '1ghakzyyijtsndUw106fgBjpqQG5GAbLe' },
        { title: 'Examens corrigés et livre de Monastir — MS', ext: P, mb: '1.0', fid: '1WMfupt-ndvVRoo7Iy7uvhp0SrETq4f8o' },
        { title: 'Physiologie S1 — ce qui tombe à l’examen', ext: P, mb: '16.3', fid: '1AT1N9jFR-2FUFvbTYVUC-Mw_m0OnsxLm' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolés de physiologie 2024', ext: P, mb: '25.8', year: 2024, fid: '14gafACeRUaesJOLSWfIpoNAnS1E3ubbU' },
        { title: 'Isolés de physiologie S1', ext: P, mb: '56.5', fid: '1ARFguNj57lYIldEBdsdfMv5ANzfxAWBA' },
        { title: 'Isolés de physiologie, partie 1', ext: P, mb: '8.8', fid: '1pr1iQ4rGRQcJSIvr41dad79t9E0pHkuW' },
        { title: 'Isolés de physiologie, partie 2', ext: P, mb: '8.4', fid: '1ITZytUF6NNcdAD1CWMfTZz2yysc-WRyS' },
        { title: 'Corrigé des isolés, partie 1', ext: P, mb: '0.1', fid: '1X2gJEWqPIvVGg7YBDK6zwqDIQTWrpPR-' },
        { title: 'Isolés par chapitre — axe hypothalamo-hypophysaire', ext: P, mb: '0.6', fid: '1mgD193MBJHpDf-Je7-KL92eh9izDo4GE' },
        { title: 'Isolés par chapitre — thyroïde', ext: P, mb: '0.5', fid: '14Qqp1rGb6CwiMJOjs5CuFSruwy7-nL2G' },
        { title: 'Isolés par chapitre — surrénales', ext: P, mb: '0.7', fid: '1JvZ8lBg--lkTtBVHzWMrtSeNiKhNFsMC' },
        { title: 'Isolés par chapitre — pancréas endocrine', ext: P, mb: '0.5', fid: '1L-6MlxMZaifruiTqPVmYlIJ9vNkuv7Nw' },
        { title: 'Isolés par chapitre — métabolisme phosphocalcique', ext: P, mb: '0.6', fid: '1yv-d5M5QmlXBwo7TCu_hsbloLoH0dj1G' },
        { title: 'Isolés par chapitre — gonades', ext: P, mb: '0.6', fid: '1pLJqQl2OmKHLwWiR5aduAjHcJzk0Wwo2' },
        { title: 'Isolés par chapitre — rein', ext: P, mb: '1.2', fid: '1GiXoUPjw12MpfXAY-BvoSbRCJIPVQYhP' },
        { title: 'Isolés par chapitre — équilibre hydro-électrolytique', ext: P, mb: '0.3', fid: '17ZkCnaFmH0QfyfSTnyhhmznr8dyxFjIT' },
        { title: 'Isolés par chapitre — équilibre acido-basique', ext: P, mb: '0.4', fid: '1cy_JvcqNckFT6Hg-BbTtVCERCHU8mN4X' },
        { title: 'Isolés 2016–2021 — axe hypothalamo-hypophysaire', ext: P, mb: '3.4', fid: '1WoVz6Yb2NBuDYR8fJ2tJE8kgovAdQhFi' },
        { title: 'Isolés 2016–2021 — thyroïde', ext: P, mb: '2.3', fid: '10ZBjOcB82O2uBAbDT1AH0yPIKZeuMZd9' },
        { title: 'Isolés 2016–2021 — corticosurrénale', ext: P, mb: '4.6', fid: '1D_pIZoUlliXTmP4_Y5T2bvSwAaQqHYPG' },
        { title: 'Isolés 2016–2021 — médullosurrénale', ext: P, mb: '1.6', fid: '1GFFtwUGGjM-JY9SFfNl0cDbbTjL4tuox' },
        { title: 'Isolés 2016–2021 — pancréas endocrine', ext: P, mb: '2.7', fid: '1TI9fgtkyP3ZEMg0zYbm_aXdwowXxmt2U' },
        { title: 'Isolés 2016–2021 — métabolisme phosphocalcique', ext: P, mb: '1.9', fid: '13A_vcJz5txYweYQog0kjy2JjzOETAt9z' },
        { title: 'Isolés 2016–2021 — gonades', ext: P, mb: '5.1', fid: '1BKmrS4xtoBiEIUa4izTy-6EJoLU5inAV' },
        { title: 'Isolés 2016–2021 — rein', ext: P, mb: '5.1', fid: '10PXQWsWaDX32FfvvZ1OidWok19yxM3cG' },
        { title: 'Isolés 2016–2021 — équilibre hydro-électrolytique', ext: P, mb: '1.5', fid: '1WuIIkCI2WYS2as46z7HxoY1DMYog4ps8' },
        { title: 'Isolés 2016–2021 — équilibre acido-basique', ext: P, mb: '1.4', fid: '1Kew0oBRYRI8bu5guhMLXf0e1SlxjFn4Z' },
        { title: 'Isolés MedNval — pancréas endocrine', ext: P, mb: '2.5', fid: '1GoUqbfgAnDrvkWUFUpdhTnpr8G4BPPfu' },
        { title: 'Isolés MedNval — métabolisme phosphocalcique', ext: P, mb: '1.9', fid: '1McJkpPMRZyVO4X8roJAanUddV0P_CeS0' },
        { title: 'Isolés MedNval — gonades', ext: P, mb: '3.2', fid: '1XXezwrV5k2N8HZUsb_PtCPm6TUi1YOjN' },
        { title: 'Isolés MedNval — rein', ext: P, mb: '4.4', fid: '1NvQ6-KicDHktpVNx53scIhabqrVcfolr' },
        { title: 'Isolés MedNval — équilibre hydro-électrolytique', ext: P, mb: '0.6', fid: '1ge98orozwCRW9Dt3MCAIP2FoC6QQ3yMr' },
        { title: 'Isolés MedNval — équilibre acido-basique', ext: P, mb: '0.8', fid: '1OTakwlOwb1V8XtcGJEeaThb9Qw0EiZii' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'Auto-évaluation — 2020', ext: P, mb: '8.9', year: 2020, fid: '1VJDFi7epXiaTUApPeeIQCJt7jiBwVm0L' },
        { title: 'TD de physiologie humaine — Dr Beichar', ext: W, mb: '0.1', fid: '1quZt7asfgEaSxojCoZWoiA9-enn3_K_2' },
        { title: 'TD de physiologie rénale — Dr Beichar', ext: P, mb: '0.3', fid: '1rBz2a1hzA1Nqquk9Sl-FwuMH-zyPapNR' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// S2
// ---------------------------------------------------------------------------

export const PCEP2_BIOLOGIE_VEGETALE = {
  id: 'pcep2-biologie-vegetale', promo: 'pcep2', semester: 'S2',
  name: 'BIOLOGIE VÉGÉTALE', icon: 'micro', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Physiologie végétale',
      lectures: [
        { n: 1, title: 'Germination', ext: P, mb: '0.5', fid: '1kyL8kyqOPX_i8JUWcPeTDPTgR17sOLfn' },
        { n: 2, title: 'Croissance et développement', ext: P, mb: '0.2', fid: '1i7T4H1VV5biXFlahZMUtzuCCCEAuK6V8' },
        { n: 3, title: 'Photosynthèse', ext: P, mb: '0.7', fid: '1_AcFO9a0d6QcbgCAQqxt_Lyew8H2hI6E' },
        { n: 4, title: 'Nutrition en eau', ext: P, mb: '0.2', fid: '12RQDsXs77XoiO-QUFN2oWE2YiELOHigc',
          versions: [
            { title: 'Nutrition hydrique — 2025', ext: P, mb: '2.1', year: 2025, fid: '1vhvwn-ASsDca7Bgj2oCPvQCyrCR7EQWm' },
          ] },
        { n: 5, title: 'Cours magistral de biologie végétale', ext: P, mb: '1.5', year: 2026, fid: '1QjGZzp8JrGaw7WmJ__hns2TeFCDsTzGj' },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé du cours 1', ext: P, mb: '74.9', fid: '1cxWcMF75jP0cmez-ZHTs4K4TQ82eY1CN' },
        { title: 'Résumé du cours 2', ext: P, mb: '28.4', fid: '1M7gXnU5F5Ufb6asnR6lJEZ2rWIbP2T7C' },
        { title: 'Résumé du cours 4', ext: P, mb: '12.8', fid: '1Ltajr4kUN0icvDKubCHNJcTxBeImbCSn' },
        { title: 'Résumé du cours 5', ext: P, mb: '4.7', fid: '1fslGwIEDpd8xnr6haEKvyDooeWdACq8A' },
        { title: 'Résumé de biologie végétale — Ahmed', ext: P, mb: '7.2', fid: '10Wty1lMUFeH8TMRciD8z_ImxnGQUE1Z5' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '1.4', year: 2026, fid: '1tyAIyXlqXwu17O5iIhLSrXxUeSxYS17q' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.1', year: 2025, fid: '1AWWGsXRSs8g3pe-sJNi4-gPGXvOSVAcK' },
        { title: 'Examen 2025 — rattrapage', ext: P, mb: '0.1', year: 2025, fid: '1BPt8JfB3CiXAN5aZcyWMF6uMrBcnRJ4t' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '0.1', year: 2024, fid: '1j3RU_wp1HMNaQdmfTWJLo9Yt2cnNznGn' },
        { title: 'Examen S2', ext: P, mb: '0.4', fid: '1GvFJ_3JZSrSNmk6cM1Lm45mXyewfpPqh' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD 1 — échanges hydriques et nutrition minérale', ext: P, mb: '0.3', fid: '1iTTbKyc7mdfsp397eMAdbICZ0kIoW7dS',
          versions: [
            { title: 'TD 1 — correction', ext: P, mb: '0.7', fid: '1pmvC1zxhyT9T7ilE3ZAR-HCUCEsJYpMU' },
          ] },
        { title: 'TD 2 — phytohormones', ext: P, mb: '0.3', fid: '18VWpY-RmF1pQLqjYo7nMoBgKcjgFtq4P',
          versions: [
            { title: 'TD 2 — correction', ext: P, mb: '0.6', fid: '11Ue2oUeUtl4ALAp0xGWzrB58fI_v2u-X' },
          ] },
        { title: 'TD 3 — germination et floraison, correction', ext: P, mb: '0.6', fid: '1OXCYpA3iJE7W793AeiJF3illH246mTLL' },
        { title: 'TD — photosynthèse', ext: P, mb: '0.5', fid: '1Ros3ZnBA4vP2r_rK27TK6FULkVkanJto' },
        { title: 'QCM 1', ext: P, mb: '0.1', fid: '1iiW8n5zEMC7_hwnbl1-7xnihYDkgn05x' },
        { title: 'QCM 2 — phytohormones', ext: P, mb: '0.3', fid: '1uhlpnFyTGoOX6_UGipm00QHzJeVMOEfa' },
        { title: 'QCM 3', ext: P, mb: '0.2', fid: '1UzH2hiqd98F97RC8JC118USlavKUoJX-' },
        { title: 'TP et TD de biologie végétale — FMPOS', ext: P, mb: '0.5', fid: '1YylF9c_4deNdejAWnNJR1bwqwjhaN25R' },
        { title: 'TD de physiologie végétale (licence)', ext: P, mb: '1.3', fid: '1iNqwxa5C8cQ13TLXdwGVXBYGLxe9m7WC' },
      ],
    },
  ],
};

// No lectures in this Drive: papers, isolés by chapter, and résumés. Three of
// its files have Arabic names; they are a collection of isolés and two
// revision sheets.
export const PCEP2_BIOPHYSIQUE = {
  id: 'pcep2-biophysique', promo: 'pcep2', semester: 'S2',
  name: 'BIOPHYSIQUE', icon: 'atom', tint: 'purple',
  professors: [],

  chapters: [],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Chapitre 1 — l’atome, notes et questions', ext: P, mb: '14.9', fid: '1O__8Gh8ghWE2J72hSr5Mp_40THA3Fwt6' },
        { title: 'Chapitre 2 — introduction à la radioactivité', ext: P, mb: '14.9', fid: '1uuDX_cTbnQkQ5njJZ24lZI9QmAHkWVD0' },
        { title: 'Chapitre 3 — cinétique de la radioactivité', ext: P, mb: '8.7', fid: '1OIGUBCIsPyW2pYk6upiaH4_umOHNQyMZ' },
        { title: 'Chapitre 4 — interaction des rayonnements ionisants avec la matière', ext: P, mb: '13.2', fid: '12TlMF9BlvXWlE2y77FCUsYL_GdFfes3V' },
        { title: 'Notes — radioactivité', ext: P, mb: '10.5', fid: '1eqANQS2kuWjGag6kfhQkTjuTvYVsdsu8' },
        { title: 'Résumé de biophysique', ext: P, mb: '11.6', fid: '1MrNOmfjoUW_HPhXofAJhdw461DyiTp-a' },
        { title: 'Résumé organisé de biophysique — Kh', ext: P, mb: '1.2', fid: '1o3nDSWoeqSdL8V2KqZmTiSkEbelLcDWK' },
        { title: 'Quelques résumés de biophysique', ext: P, mb: '14.5', fid: '1EB6aUk8qk_DandXYuPtOu8zznCztLAea' },
        { title: 'Résumé — Brahim', ext: P, mb: '3.9', fid: '1hUYRG3oidXs3dAQIgYss9t2x3zruM9Nz' },
        { title: 'Résumé — radioactivité', ext: P, mb: '1.0', fid: '1W8Qsoo45tFF1xbnoFl9--JMR6cMCj5js' },
        { title: 'Résumé — cinétique', ext: P, mb: '0.6', fid: '1VEFWEV-4UfF7IUnCOcDS5FvAazWI9UMs' },
        { title: 'Résumé — protons', ext: P, mb: '0.8', fid: '1ErcvjZ88eMNloG78IjyhtY9a8Bv3SYLY' },
        { title: 'Résumé — détecteurs', ext: P, mb: '1.1', fid: '1alqTeqx4Wa49LimB00iU6gt0ppon0-dY' },
        { title: 'Résumé — ionisation et excitation', ext: P, mb: '0.9', fid: '1qn9TMGOP-XvZHdxbBLLZwnMMJHI4aHyH' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '2.6', year: 2026, fid: '1AsULzmAHqvphP_5qNpkq8PM63ciR8SsW' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '3.2', year: 2025, fid: '1KD1nHi3y5txvovGL16mHDTg1Q2nUCy1i' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '7.5', year: 2024, fid: '1tu6I7D9ic96-2b21RCyhkHjzJsZrpePV' },
        { title: 'Examen 2023 — session normale', ext: P, mb: '0.4', year: 2023, fid: '1diobKpr7L7lSDyzvwhaCO2OBgPAJNcL4' },
        { title: 'Examen 2023 — rattrapage', ext: P, mb: '0.2', year: 2023, fid: '11oqwkDQ_ZSROZL3uAC3OkCwrQEVcNoQf' },
        { title: 'Examen 2019', ext: P, mb: '0.3', year: 2019, fid: '13N9Jnj-okqhfzogl5aIqSgjv6PqMYMvJ' },
        { title: 'Examen 2017 — rattrapage', ext: P, mb: '0.3', year: 2017, fid: '1DMv2CKWEUkZJknfUeLQTgBGSSt6yk-Tu' },
        { title: 'Examen 2016 — juin', ext: P, mb: '2.0', year: 2016, fid: '1dmtn-PCr8zylKlkKGv4eDNQUPYTkP8f6' },
        { title: 'Examen 2016', ext: P, mb: '1.9', year: 2016, fid: '1CT6UZcBs0WYq1k-N0LO01_0NxLXgRVAi' },
        { title: 'Corrigé — Sidose', ext: P, mb: '0.4', fid: '1ocy7CqRgT6pQhNYMSU-K77xWp92xD2AB' },
        { title: 'Corrigé — Daoud', ext: P, mb: '0.4', fid: '11lm9PxKhl2iL_BwIO8eXRei2mA_06yKd' },
      ],
    },
    {
      id: 'maroc', where: 'quiz', title: 'Examens — Marrakech', icon: 'quiz',
      items: [
        { title: 'Examen 2024 — Marrakech', ext: P, mb: '0.7', year: 2024, fid: '1SCgB5ijQwrG-ONr1GLRqOrL1pCnrcs37' },
        { title: 'Examen 2024 — Marrakech (2)', ext: P, mb: '1.9', year: 2024, fid: '1iAnfJRdgnQTgVqcsEgEnj3XyWAMtjEql' },
        { title: 'Examen 2023 — Marrakech (photographié)', ext: J, mb: '0.6', year: 2023, fid: '14-JiiBy-h-LmV9xUVUNVad8bNeEc_GW5',
          pages: ['14-JiiBy-h-LmV9xUVUNVad8bNeEc_GW5', '1FfU2KAmeMNNhXCr_dQgfFiXuwfc-R9Ji', '1DUWbZFt2HvxXhDRVzonus0mXtDTZGZ2J', '1NvnzOrLyEsKjUaKTmvGT25y95hqPr00G', '1Uzr6Wng5CL3YXSsAyAZ3WAizLKT3z1sj', '1-FwwPV8wevFKEBNgI7j0A5lkI0G0xpOB', '1qc3j6NR33wKsRSmogDIjfE4dVj5V5WGd'] },
        { title: 'Examen 2022 — Marrakech (photographié)', ext: J, mb: '2.2', year: 2022, fid: '1_KxfIQ2d-K-44KFp7J6j_DpiAr7F8JAr',
          pages: ['1_KxfIQ2d-K-44KFp7J6j_DpiAr7F8JAr', '1GEGFX7vnUAQgcKayDXDz-e7q85Nm9S7G', '1iidbA0ghX8-gVKlSdQYLEuVprhnxE8tA', '11K8GmFq1BAMS9n4AgQe4FAdM2v8K09XP', '1pIKmRwlTHC3eriLS6k5IY-8Y9MKdIe5N', '1O9fRp5SmAEjuZ4LL5KWi9WAmz1lU0A4P', '1kD9ZHzY7wXT-lBkKcjSXSWPfKkG5ntr1'] },
        { title: 'Examen 2021 — Marrakech (photographié)', ext: J, mb: '0.3', year: 2021, fid: '1OsFUcEaKwbf62aHFCR7eggcgkVidLB8V',
          pages: ['1OsFUcEaKwbf62aHFCR7eggcgkVidLB8V', '1h6WqQFhW0QFFfVx0Lr2dRfAI4GZ-n_WN', '1_rnLhHbDF7Fu-EpyCCYVvstkJFCi5_PO', '1ruyjvA4iHlShhc0XUA21aCkoOAqaR_Hi', '1c270wwqWfxg_YnJEoWyzlg3Yi-uI3yOI'] },
        { title: 'Examen 2021 — Marrakech (scan)', ext: P, mb: '2.6', year: 2021, fid: '1mBQ49BuBleollZysHsLsvz_Br9MipPzD' },
        { title: 'Examen 2018 — Marrakech', ext: P, mb: '0.3', year: 2018, fid: '11NteLogHhCaIpNuM_zIH-bxKi3q6cuOc' },
        { title: 'Examens 2014–2021 — Marrakech', ext: P, mb: '73.3', year: 2021, fid: '1XdNi0zLTPu5qCpP_NEnah3XbU-r5gJXO' },
        { title: 'Questions d’examen 2014–2018 — Marrakech', ext: P, mb: '56.0', year: 2018, fid: '1o7OStNlJPpB2gr_S5sZx2klj1ewJnM8E' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolés — chapitre 1', ext: P, mb: '4.5', fid: '1BiGUOzjX9NC0CFK0meKPebJfNvlYscm-' },
        { title: 'Isolés — chapitre 2', ext: P, mb: '5.1', fid: '1VtEmEl-DJfD1tc0ji9KEiRYa4EdWswyn' },
        { title: 'Isolés — chapitre 3', ext: P, mb: '0.8', fid: '1jER16VmSRfvLazG5wgaVVydgHK5pLkB4' },
        { title: 'Isolés — chapitre 4', ext: P, mb: '0.4', fid: '1Pg38EOHO-LGNHIr8OXk_Xka4bQnKcY4f' },
        { title: 'Isolés — chapitre 5', ext: P, mb: '0.6', fid: '1-LXKP0ObOtOVN_3q6mDTQ-iQ3NrpGspl' },
        { title: 'Isolés — chapitre 6', ext: P, mb: '1.2', fid: '1pCLHS_-5USsbHY8xpQgsI9reUR-IN3pm' },
        { title: 'Isolés — chapitre 7', ext: P, mb: '0.4', fid: '1N6P1xr1Au0G7di9nn1qXxVFPQ70MAxT1' },
        { title: 'Isolés — chapitre 8', ext: P, mb: '2.4', fid: '16FoCHkYXhpOzGZv95iLX6cf4Bx_-IC2d' },
        { title: 'Isolés — Marrakech', ext: P, mb: '4.3', fid: '1m_HkeIaZ8sgZkcO2V8M902UlQMLGUtL6' },
        { title: 'Isolés de biophysique — recueil', ext: P, mb: '26.7', fid: '1hvaZBc7z2W30XQVQMsFpvbw9Hnd7xgrO' },
        { title: 'Révision 1', ext: P, mb: '0.2', fid: '1xv5RPaROKj1mV6piHVkDkmRNJAqN7_0m' },
        { title: 'Révision 2', ext: P, mb: '0.1', fid: '1qorrM-3DEDfcsODUePPWYxpcXlwTEwWX' },
        { title: 'Isolés (photographiés, 2022)', ext: J, mb: '0.2', year: 2022, fid: '1J8hLkQx8J8pbHEZLgsu_yUJf6Ej4m96t',
          pages: ['1J8hLkQx8J8pbHEZLgsu_yUJf6Ej4m96t', '19Ove53XZC702xDXBwQP6BNcd5bvps-J2', '1tqqBN0hlUVWVodZa5EoJ0NxrsOowLKXR'] },
        { title: 'Isolé (photographié)', ext: J, mb: '0.1', fid: '1rNvGJqbLuBSLzMbpV8zVezr3xKYib3O9' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD de biophysique', ext: P, mb: '0.4', fid: '1Fmu-Z3FREpiq5O2auUtbgpnhyz994ldC' },
        { title: 'QCM de biophysique — les bonnes proportions', ext: P, mb: '3.9', fid: '1YMkcKNP4FQdub7FpMlpuy3qOV4ZwVgWN' },
      ],
    },
  ],
};

// One FMPOS course; Tunis's is the same programme in thirteen chapters.
export const PCEP2_CHIMIE_ANALYTIQUE = {
  id: 'pcep2-chimie-analytique', promo: 'pcep2', semester: 'S2',
  name: 'CHIMIE ANALYTIQUE', icon: 'flask', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Chimie analytique',
      lectures: [
        { n: 1, title: 'Chimie analytique pharmaceutique', ext: P, mb: '1.2', fid: '1sWKH5GwLIGH6F-XYSOT-wJLPxBFuHr47' },
      ],
    },
  ],

  sections: [
    {
      id: 'tunis', where: 'archive', title: 'Cours — Tunis', icon: 'book',
      items: [
        { title: 'Introduction à la chimie des solutions', ext: P, mb: '3.7', fid: '1t9O480sqSudJ9mHj9u0SwYXJu6Ac0X67' },
        { title: 'Protométrie en milieu aqueux', ext: P, mb: '0.9', fid: '1_Nx5I3AxJV4t_bAVr6nb0jbxxEWAdvb1' },
        { title: 'Protométrie en milieu non aqueux', ext: P, mb: '0.2', fid: '1y6k1uz7DXZa9S_OpHXMaMKiRpFMANFst' },
        { title: 'Réactions de complexation', ext: P, mb: '9.7', fid: '1YsTpRkfzR07EMV03xlqJRTmkeiH7qHYp' },
        { title: 'Réactions de précipitation', ext: P, mb: '1.9', fid: '1aY7RXVEmoiFukcu0DXxTz8avwkmYAo_2' },
        { title: 'Oxydoréduction, partie 2', ext: P, mb: '18.0', fid: '1GDERR_d8daQInI9dD2_4QPEOiiNxrmN5' },
        { title: 'Oxydoréduction, partie 3', ext: P, mb: '10.2', fid: '1TRGCvciI2Z8Fh4Mm4dzG9XCo8dCIOelL' },
        { title: 'Électrochimie — ch. I, généralités', ext: P, mb: '2.1', fid: '1ptnqeEGuVar5iMQ9qgQNd5rV9Tr7lbBc' },
        { title: 'Électrochimie — ch. II, potentiométrie', ext: P, mb: '1.3', fid: '13VS2rzF57BqtJjBGxW8EUO1eQ94GwvZ4' },
        { title: 'Électrochimie — ch. III, courbes intensité-potentiel', ext: P, mb: '0.6', fid: '15g3Kg4YxbjyPgpJarwjJpIGZgM7SeBrh' },
        { title: 'Électrochimie — ch. IV, polarographie et voltampérométrie', ext: P, mb: '0.5', fid: '1Zv8Oo5w0KXOTISIZBKioEUfLE1V6zQkb' },
        { title: 'Électrochimie — ch. V, coulométrie', ext: P, mb: '0.5', fid: '1Y0nBxSNLACZaDlyhAuSZNOJXwThb-_Fv' },
        { title: 'Support de chimie analytique, 2e année', ext: P, mb: '14.3', fid: '1gWKIOO-YrnWeLzm1uPWCnP_j6UvRAhV3' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen — session normale', ext: P, mb: '1.0', fid: '1gmwd6FZLorTuz5Lv1bkdzyhYRejM_s7b' },
        { title: 'Examen de travaux pratiques', ext: P, mb: '1.3', fid: '1B9LOHA8aQpgh9gf22_FiB6_3wlF3fvFX' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD de chimie analytique', ext: P, mb: '2.9', fid: '1QsP2z1bLrv8Y6iAFcTtl3InRfCUuwQ7R' },
        { title: 'Fascicule de TD (Tunis)', ext: P, mb: '0.6', fid: '1-8IBrmuVjO275osAzok0TZrHslnPhu_L' },
        { title: 'Correction du TD 1', ext: P, mb: '0.1', fid: '1ZuxYjGccpW8hKoKUbQ0I5wfwWY_4iPyb' },
        { title: 'Correction du TD 2', ext: P, mb: '0.1', fid: '1yphd8xfeTYtnwwRvY70MQSFJ3BJN7GYQ' },
        { title: 'Correction du TD 3', ext: P, mb: '0.5', fid: '1LrkCgL-vssWDMtpTgulCWnu7P3oJaTeD' },
        { title: 'Correction du TD 4', ext: P, mb: '0.7', fid: '1agC9iVrnOiI7jMlZl2XUvoohGgjDlc_K' },
        { title: 'Correction du TD 5', ext: P, mb: '0.1', fid: '1Dr8291bDqdyruImF2-9a_Z7FC74_bitF' },
        { title: 'Correction du TD 6', ext: P, mb: '0.2', fid: '1npSczQiFD3w5wvsUX0LPsBobKf-NYTJ4' },
        { title: 'Séries 6 et 7 — complexation', ext: P, mb: '0.2', fid: '1ON1jev4-J8MOmPJnhpYOuEfTUOcRKTgR' },
        { title: 'Correction du TD 8', ext: P, mb: '0.2', fid: '1TNbWzItx6rH7gB_GR4CxgrCBK87JaRvG' },
        { title: 'TD 8 — potentiométrie, corrigé', ext: P, mb: '0.5', fid: '1-gYIUym65pehW5lCseiepMcRfxoPq3A_' },
        { title: 'Correction du TD 9', ext: P, mb: '0.1', fid: '1BxvaA3zlqNsG9q7PMj4u4ZfUNh2YObX7' },
        { title: 'TD 9 — électrolyse, corrigé', ext: P, mb: '0.6', fid: '1yu9oRQOhdxmHhdC7kIPWoMdULwWpfG2w' },
        { title: 'TD 9 — électrolyse, corrigé de l’exercice 1', ext: P, mb: '0.2', fid: '1fv8N9EQRrJjV7eatDIgfv-vLhnWIhzNL' },
      ],
    },
  ],
};

export const PCEP2_CHIMIE_MINERALE = {
  id: 'pcep2-chimie-minerale', promo: 'pcep2', semester: 'S2',
  name: 'CHIMIE MINÉRALE', icon: 'atom', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Chimie minérale',
      lectures: [
        { n: 1, title: 'Chimie minérale', ext: P, mb: '3.4', fid: '1YTHRJVf-Xq7n6giPmr2ltu8i1VScY-YL' },
      ],
    },
  ],

  sections: [
    {
      id: 'tunis', where: 'archive', title: 'Cours — Tunis', icon: 'book',
      items: [
        { title: 'Ch. 1 — tableau périodique', ext: P, mb: '0.9', fid: '1b-E9u7yg7SyU8TtbCWWLlqCSvhGyF0uY' },
        { title: 'Ch. 2 — liaisons de faible énergie', ext: P, mb: '0.3', fid: '1YpA0Kd_VQSTq0fiWlNnwfNot80PtlB7a' },
        { title: 'Ch. 3 — nomenclature', ext: P, mb: '0.4', fid: '1L5IiIP-_7auZDSt0dQhmeydt5VaDshmV' },
        { title: 'Ch. 4 — introduction à la cristallographie', ext: P, mb: '2.3', fid: '1eBonDhjJkYQhTu5cjd7Jz5WOgEtGD5CO' },
        { title: 'Cours complet, version étudiant', ext: P, mb: '3.6', fid: '1XKwLlzV7Jaugn_9tD00oNzsndwn5xtz7' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé de chimie minérale', ext: P, mb: '9.5', fid: '1TO2-tBUVLrt7epobsLjEgj92latUMPHe' },
        { title: 'Résumé — nomenclature en chimie inorganique', ext: P, mb: '1.9', fid: '1cBddQTQ73Md8abM7cvyLznxBfPg0MUR_' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '1.1', year: 2026, fid: '17_GqSDn9wA77fxAxJiCPSqG-8NeqwXNu' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.1', year: 2025, fid: '1jx7KwluIeHICQEoY7ODaaXxxpIDknSJQ' },
        { title: 'Examen 2024', ext: P, mb: '1.3', year: 2024, fid: '1IL_BLs8ySpk9VZpWkDP9nJom9wSDNsuQ' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'TD de chimie minérale', ext: P, mb: '0.2', fid: '1fjGghiE0E4Jf5LFY3y8xXE6oSGVLtHSY' },
        { title: 'Exercices de nomenclature', ext: P, mb: '0.3', fid: '1tNCBd2RN_X9B3mKiJvLXnMTLeBtom22S',
          versions: [
            { title: 'Exercices de nomenclature — correction', ext: P, mb: '0.8', fid: '18qK_loMNYI0RuA5N_6F9orwJ16niOXLw' },
          ] },
        { title: 'Série 1 (Tunis)', ext: P, mb: '0.2', year: 2021, fid: '160P8Y5TliVf2Me5EdgLtZu3a1oREpKEU' },
        { title: 'Série 2 (Tunis)', ext: P, mb: '0.2', year: 2021, fid: '1mAAVJFU_XLl3oMJEvXiNfbgB7gYehoRh' },
        { title: 'Série 3 (Tunis)', ext: P, mb: '0.2', year: 2021, fid: '1V6Xp5mptaB8AdqZnawFSlIMMvFb2-e2Z',
          versions: [
            { title: 'Série 3 — correction de M. Ayari Faouzi', ext: P, mb: '1.0', year: 2021, fid: '1mFMTqdft_KPp38swMvYp0mDpZfO_ilwj' },
            { title: 'Série 3 — correction de M. Boudokhane Chedly', ext: P, mb: '1.5', year: 2021, fid: '1vUERAu3G2AOeje-rHa-PXznBhz0eMZEu' },
          ] },
        { title: 'TD de cristallographie — Pr Boudokhane Chedly', ext: P, mb: '0.8', fid: '1NpKP5lN5ce_FrfFG5V2ZG_4VkybnUDFF' },
      ],
    },
  ],
};

// Medicine's PCEM2 physiology, second semester: neurophysiology. The 2024 and
// 2023 slides are kept as two chapters — the same course, two years' edition.
export const PCEP2_PHYSIOLOGIE_S2 = {
  id: 'pcep2-physiologie-s2', promo: 'pcep2', semester: 'S2',
  name: 'PHYSIOLOGIE S2', icon: 'heart', tint: 'orange',
  professors: ['Dogui', 'Samy Dadah'],

  chapters: [
    {
      title: 'Diapositives 2024',
      lectures: [
        { n: 1, title: 'Système sensitivo-sensoriel', ext: P, mb: '0.9', fid: '1X2Oy99COAUtRlfNpX8feP-9AeEiR8KP-' },
        { n: 2, title: 'Somesthésie', ext: P, mb: '2.4', fid: '1w4Ny9-ioc2sQGRqn1O7PbNUpXKsy7K8F' },
        { n: 3, title: 'La vision', ext: P, mb: '2.1', fid: '1eHqaC9VK7PMxOkn2C_nN194YB9_4Dv8d' },
        { n: 4, title: 'Audition', ext: P, mb: '0.9', fid: '1qTxifKsvLuqyINnMNkv-syUEhINmOROJ' },
        { n: 5, title: 'Motricité réflexe', ext: P, mb: '7.9', fid: '1ChIU_XMhXqNaplEOySOORianIpiXamsz' },
        { n: 6, title: 'Motricité somatique', ext: P, mb: '3.4', fid: '1LEoQESVZHgxRXMbj6yizRqo8dYXiP5-B' },
        { n: 7, title: 'Contrôle cortical de la motricité', ext: P, mb: '4.0', fid: '1gV7mKUVwI1g5nI9e6_YrBAr96z7oIWZq' },
        { n: 8, title: 'Cervelet', ext: P, mb: '0.8', fid: '1NYkrpEv40S5-GPWqr8J431_A3m8sI_FQ' },
        { n: 9, title: 'Cortex', ext: P, mb: '3.1', year: 2024, fid: '1F2eJP6S28ClRqzBJh4RCm_UbvmoGF1GS' },
        { n: 10, title: 'Veille et sommeil', ext: P, mb: '7.1', year: 2024, fid: '1kCyjMA_DdlQR3021zu5WcR6lBYHhVgvd' },
      ],
    },
    {
      title: 'Diapositives 2023',
      lectures: [
        { n: 11, title: 'Nociception', ext: P, mb: '17.1', fid: '1-1EJ0ueoFfMMnC3wGHnWGuDiOHeOk_we' },
        { n: 12, title: 'Nociception (suite)', ext: P, mb: '15.8', fid: '1fIGSP7EOGYPqiQXBcReg27jMggZbElqw' },
        { n: 13, title: 'Motricité somatique', ext: P, mb: '1.7', fid: '1HYMo21HRlEF15q235NfQt7cpnkV3J5oF' },
        { n: 14, title: 'Tonus musculaire', ext: P, mb: '3.6', fid: '1RfthEIaYzq6U_nmEGe10F9r4hhDqSrqn' },
        { n: 15, title: 'Tonus musculaire (suite)', ext: P, mb: '8.3', fid: '1tK-Aulh9knwMYKUQAO6zvLN3Jht4ZdLR' },
        { n: 16, title: 'Posture et équilibre', ext: P, mb: '7.4', fid: '1_AOLh1zmFJ3j8fk0NjG4LrUHF82Bdh6M' },
        { n: 17, title: 'La motricité volontaire', ext: P, mb: '7.7', fid: '16LCjGtB-ID7uvd-DSf41fMnUyC5eKOB3' },
        { n: 18, title: 'Cervelet', ext: P, mb: '12.3', fid: '1JiOIMza6qoqYSgZzkMGVXSPH0S7xGgD0' },
        { n: 19, title: 'Noyaux gris centraux', ext: P, mb: '14.7', fid: '1lU61Dv1iE8GyieLfI_FvMT306BzBnzFR' },
        { n: 20, title: 'Fonctions supérieures du cortex', ext: P, mb: '3.6', fid: '1wUVP0n62V85FLolo8Hb3-zc89vVKn9JJ' },
        { n: 21, title: 'La mémoire', ext: P, mb: '3.7', fid: '1U4FDwpsQ4bYQSiunmdNRAr0WbepGrIbT' },
        { n: 22, title: 'Connexions thalamo-corticales', ext: P, mb: '2.9', fid: '1fAJdnT3AhKL4ple_dsvj8kihgjqNroh7' },
        { n: 23, title: 'Électroencéphalogramme', ext: P, mb: '4.4', fid: '1wHhXc3eF_nXJzN2yXd53dShwh3K7ai9Y' },
      ],
    },
    {
      title: 'Pr Dogui',
      lectures: [
        { n: 24, title: 'Systèmes sensoriels', ext: X, mb: '0.1', year: 2015, prof: 'Dogui', fid: '1n-jso_HaygeytTezb31N1d3F32gaj4rG' },
        { n: 25, title: 'Motricité', ext: PT, mb: '0.1', prof: 'Dogui', fid: '17dr4KOwNSlI2DqddK1j6Qm6_-qNNbsV8' },
        { n: 26, title: 'Réflexes médullaires', ext: PT, mb: '0.5', prof: 'Dogui', fid: '1nt-JNjKhFi3EcS3Q7nUbDOde7XFIuapA' },
      ],
    },
    {
      title: 'Dr Samy Dadah',
      lectures: [
        { n: 27, title: 'La somesthésie', ext: P, mb: '3.6', prof: 'Samy Dadah', fid: '1xn6w_4GoLulHof4nilJ6MwDlCrGS6YPU' },
        { n: 28, title: 'Physiologie de la douleur', ext: P, mb: '1.6', prof: 'Samy Dadah', fid: '1BOeCC_iyrcX6S0GXxbIGVV5EbjGRAELw' },
        { n: 29, title: 'La vision', ext: P, mb: '1.5', prof: 'Samy Dadah', fid: '1p_8yVYa0dJsqCJoT9Pc1nchHPrcwj4ci' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Polycopié 2025', ext: P, mb: '4.4', year: 2025, fid: '1Q32gOWbSOq6A6h74L6lNz157cDZTWM6r' },
        { title: 'Polycopié 2023-2024', ext: P, mb: '4.1', year: 2024, fid: '1TgF-50CgcRpnPXhCOGInI7rRsI-AVDfb' },
        { title: 'Polycopié 2023', ext: P, mb: '4.9', year: 2023, fid: '1o0IHJC2Dd7MACsQI6QavKgwnalRLQgos' },
        { title: 'Polycopié 2022', ext: P, mb: '4.1', year: 2022, fid: '1zd7_flbOzGB5N_1RZ4sazt-8Cqx8P0Gb' },
        { title: 'Polycopié 2021', ext: P, mb: '4.9', year: 2021, fid: '1HIbZwm7OIQ73Hr4PvBjrcWih0cdPz5p7' },
        { title: 'Polycopié complet 2020', ext: P, mb: '2.6', year: 2020, fid: '1KyWVv2NzkCsaCaClsPLO4QiOkEHxlHES' },
        { title: 'Polycopié 2019', ext: P, mb: '4.5', year: 2019, fid: '1_r61daywSo_Qa2Dua69FFNsMrP4SGYfs' },
        { title: 'Polycopié 2018', ext: P, mb: '6.3', year: 2018, fid: '1iM2KvTVHoLjatvNIPLd5Z73ZQzwbiVBd' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '3.2', year: 2026, fid: '1dWmvKeTkgpG-CCbTAUSiu5qYggnyNWn7' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '1.3', year: 2025, fid: '1-AQM2fZrQmYZS3BEeMZSd_rW_NpfnKuf' },
        { title: 'Examen 2024 — session normale (photographié)', ext: J, mb: '12.4', year: 2024, fid: '1_hyDOf76abkZ6lHcao0QhEBA1CnztRau',
          pages: ['1_hyDOf76abkZ6lHcao0QhEBA1CnztRau', '1Hg5mr1FolHQDAgolpFhpkfrTJiHhPB9i', '1XlU2lyX2K7KyPrlW0vSV1NzfLk1rdE-0', '1xqWl48lH9tRnWZsQ0S_nT3wGaX2O_6PG'] },
        { title: 'Examen 2022 — session normale', ext: P, mb: '0.1', year: 2022, fid: '1icK-zMczlq6sPKJHdDtBDILEdF0RAcsx' },
        { title: 'Examen 2017 — session normale', ext: P, mb: '1.3', year: 2017, fid: '1OThKhh0Bu1w7LDE0zl2CE8cRKr6HHYbX' },
        { title: 'Examen 2016 — session normale', ext: P, mb: '0.5', year: 2016, fid: '1Hm8Vn2lHz9YWwAREvS_dyChzXiv593bf' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '2.2', year: 2024, fid: '1-o3S0ofdYiyKdd85H5KD1f0vpJRYo7Ej' },
        { title: 'Examen 2023 — rattrapage', ext: P, mb: '2.6', year: 2023, fid: '1_mAJSSrVh2EDqVjgItK4tOERDJJTGpQ4' },
        { title: 'Examen 2022 — rattrapage', ext: P, mb: '0.9', year: 2022, fid: '1xn4yqvAvxHQz32nihfJ-_yzzy6iR5tM-' },
        { title: 'Examen 2021 — rattrapage', ext: P, mb: '0.5', year: 2021, fid: '1cBB6Aqrj0YLVeI6vPqqb-gE5dwEKwZju' },
        { title: 'Examen 2021 — rattrapage (photographié)', ext: J, mb: '0.5', year: 2021, fid: '1zQuCDPFI8FoM3gz67yR4pYJUqj_oGVBY',
          pages: ['1zQuCDPFI8FoM3gz67yR4pYJUqj_oGVBY', '1gXVaGrfEkjkHfa54q4mWlxoctu4Yh2Jd', '1yL3izY1UlHJEjTTZIf2RSnpAwIkuWPmM', '1IoA4nzqBZbYi_RCUIc8MJgiKEWoUj5cS', '1JYBWViw4lLn1Csq1snPTwKWAzIApXk-N', '1ukTNOfYkGY0pEcizJX9A3_Ez5xUL1hSL', '1KD0ezKD8jCiI5Hd35oC0DeBx_de7CMFT', '1jP7Tx8vjlieU7M5XyUugyeYLRi2UNj_j', '14XyyQvI7EGUQzPsrNdl_YSfo91cqw58B', '10qdTQVBYfach1vFdtGnCom24wkSyCrl6'] },
        { title: 'Examen 2019 — rattrapage, partie 2', ext: P, mb: '2.2', year: 2019, fid: '1S-n7KJqr0Mw9zvm9-5FsoA5wzqN_rgcP' },
        { title: 'Examen 2017 — rattrapage', ext: P, mb: '14.6', year: 2017, fid: '18Vz4wuqDZa2RihuMrrX7kiQReqWNMckV' },
        { title: 'Examen 2016 — rattrapage', ext: P, mb: '4.4', year: 2016, fid: '1SL4bafzRRfNusIyvX-49YAANlcHJwzQC' },
        { title: 'Examen de physiologie S2', ext: P, mb: '1.3', fid: '1NLYKpQA7skO4lYxp8qKnWb_NZBxaf6wo' },
        { title: 'Examen de physiologie S2 (2)', ext: P, mb: '12.4', fid: '1M4ZFc7GaKiYyA1zI8kDQLyJbS4Tng94q' },
        { title: 'Corrigé — examen de physiologie S2', ext: P, mb: '0.8', fid: '1UHXs4d2PJ8zlhSGqdYUoLv2pxfNOixkx' },
        { title: 'Corrigé — physiologie S2, version 2', ext: P, mb: '0.1', fid: '1ycrqlRYKos9z6RF0qeJOo38u9rh2s6ka' },
        { title: 'Corrigé — examen 2021', ext: P, mb: '0.5', year: 2021, fid: '1A42m-s5rOh6QHz5Nz1zlm56wHWm8qlSn' },
        { title: 'Corrigé — examen 2019 (photographié)', ext: J, mb: '0.1', year: 2019, fid: '1yV1ArwIJAMmc4xe-z-o9lKzY6GUvelLg' },
        { title: 'Corrigé — examen 2018', ext: W, mb: '0.1', year: 2018, fid: '1lCXgVseJUNl522c4bkxpmfjUQBjnOH-a' },
        { title: 'Examens corrigés et livre de Monastir — MS', ext: P, mb: '1.0', fid: '1-ooEDgB0OY9lYoBg0IP1cXT8VlN18cdj' },
        { title: 'Corrigé (photographié, 2021)', ext: J, mb: '0.7', year: 2021, fid: '1J88FrrNXVzhb3ela4tk6jfgplevFM_vV',
          pages: ['1J88FrrNXVzhb3ela4tk6jfgplevFM_vV', '1MGozD_-mnxJ2yi0lVvyC2F7fC16UGfe_', '1aqSgW6pJHIvKaMuFdf8UcbmVGopLEX4G', '1hfn2eI_T_bJdhjHyPWeKwkTEYyKiNLQG', '1LwB91M2_M7DF1EO7A7VcTtEvAhoOWU0s', '1Ah7E4oBRKNgTDsHmYvyyAoEvrl1LWifQ', '13bu03vYlgTta6i89w2RaDriZNpmDThBV', '1srjWC0s6RmlW1Ze3XmR8bBVq3V_uP6JZ', '13ZR64fucDqpbCfaX91tUvc3m9fMxvR0B', '13RXCQl6gPy0EojhcS9ok4tKLp9ujqQlH', '1kyJ-adXsMsCXFZ5IK47rkIy138G7ACH-'] },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolés — « Diplôme »', ext: P, mb: '18.4', fid: '1dhUhaLe9SG49gLx80G6te-zmatIBX-Wa' },
        { title: 'Isolés — ceux qui tombent à l’examen', ext: P, mb: '4.2', fid: '12dKcFi09_VIXqtpePTidso4NAyX4XAJF' },
        { title: 'Isolés — système sensoriel', ext: P, mb: '2.1', fid: '1UVJx_s2XnnoxICqY-i7gzAz-4iWJOqzS' },
        { title: 'Isolés — la motricité', ext: P, mb: '2.9', fid: '1pB2762MGsPKpGgR3UR_jyTkUSP2lnV48' },
        { title: 'Isolés — fonctions supérieures', ext: P, mb: '2.5', fid: '1OogqVfRgqPwl15MYviunygU2pEPKxR90' },
        { title: 'Isolés — circulation (Sidose)', ext: P, mb: '1.9', fid: '1LX4NZ4Y2G5iS0ypeEwIu58XTfO0fo_Sm' },
        { title: 'Isolés — digestion (Sidose)', ext: P, mb: '1.8', fid: '1B7mscS1VnXcTXcj4kV6v9I2306_RJspS' },
        { title: 'Corrigé des isolés', ext: P, mb: '4.8', fid: '1enUzwZLK5uUi8nmtQ3alTVF4FiN3rCY9' },
        { title: 'Corrigé des isolés de physiologie S2', ext: P, mb: '1.5', fid: '1Qm6jLtcad0VPQvzjCwEYrI0MUrg4JSGo' },
        { title: 'Isolés corrigés — système sensoriel', ext: P, mb: '3.3', fid: '1BjkGeF2GQP-zK6zheQC0YJTAAM6wm5yF' },
        { title: 'Isolés corrigés — somesthésie', ext: P, mb: '9.5', fid: '1vY6DfG1JZT1CzFOHXlfdoqg9U1QNlcIj' },
        { title: 'Isolés corrigés — douleur', ext: P, mb: '2.7', fid: '1kpeSXScNf5G4thq0pfJcnYG7A4RUJh5s' },
        { title: 'Isolés corrigés — vision', ext: P, mb: '3.7', fid: '1U0Ndr0J4i8qnES562u2FhHnlQpYSQ5Cm' },
        { title: 'Isolés corrigés — audition', ext: P, mb: '2.4', fid: '1PayRYNDe7LgRRmnyuUrkJ5cqxfnbXsdi' },
        { title: 'Isolés corrigés — équilibration', ext: P, mb: '5.2', fid: '1YuGVX4yy5Bb9aqUjK6dqTu9X0n-Cc6hB' },
        { title: 'Isolés corrigés — tonus', ext: P, mb: '3.8', fid: '1kOJ0xy_H89UdsIGPsZM9oar7F9vSAAyS' },
        { title: 'Isolés corrigés — contrôle de la motricité', ext: P, mb: '4.5', fid: '1dKhiRz0BtKz58BAk8ql82ol-B_QLIEEA' },
        { title: 'Isolés corrigés — cervelet', ext: P, mb: '4.4', fid: '1XSrYptXlS4BIlTlLyDwHqfCVqI_DU506' },
        { title: 'Isolés corrigés — noyaux gris centraux', ext: P, mb: '1.9', fid: '110KFl9U8Pw77Acxap5UZFwlCs_Q9H-pV' },
        { title: 'Isolés corrigés — mémoire', ext: P, mb: '2.9', fid: '1lMKZpmzjpp8dTQ7HiVzVgxEvtiJuYI5W' },
        { title: 'Isolés corrigés — sommeil', ext: P, mb: '11.8', fid: '12ytT0vAoYvwD-kfe3WMp-l6jpVJDqGrp' },
        { title: 'Isolés corrigés — divers', ext: P, mb: '1.1', fid: '1kLi_r8lp2raYdiv26mL8zSZmtyMm9zKA' },
        { title: 'Isolés MedNval — système sensoriel', ext: P, mb: '44.4', fid: '1MAihNECF8UXjOtoPifbVWv_uqE2EyuWh' },
        { title: 'Isolés MedNval — corrigé 2024', ext: P, mb: '4.1', year: 2024, fid: '1yP-_HTNOR4k9iiDetaYjfLJVYKOcBIDl' },
        { title: 'Isolés MedNval — douleur', ext: P, mb: '1.0', fid: '14Wjbh6w6mLaMOa_ypT6KPCGYY4jQycZZ' },
        { title: 'Isolés MedNval — réflexe médullaire', ext: P, mb: '1.2', fid: '1AKGIRTJPb-dvPDfxX7hmMf2X2-ijJZ2I' },
        { title: 'Isolés MedNval — contrôle cortical de la motricité', ext: P, mb: '1.0', fid: '1mWKUp0JBcpB5uv1yFi6SdPx7c4LjMXbi' },
        { title: 'Isolés MedNval — cervelet', ext: P, mb: '0.5', fid: '1PvzYlUm3VbikNcRSdUa5if9y_nKLyoB3' },
        { title: 'Isolés MedNval — noyaux gris centraux', ext: P, mb: '0.7', fid: '1c_goBIwTEvCvpWMw6aHHiYrViud2DYzb' },
        { title: 'Isolés MedNval — néocortex', ext: P, mb: '1.5', fid: '16phl5MEKac-g0Q8xjKF9RYeQbIdMrmWD' },
        { title: 'Isolés MedNval — EEG, mémoire et connexions thalamiques', ext: P, mb: '1.5', fid: '1R9eedqnVUNHp2kW5pbBysLwEV0iuBLKp' },
        { title: 'Isolés MedNval — sommeil', ext: P, mb: '1.4', fid: '1MG5sMngQ_odulhCRTIkKewZmRHhGFEka' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM', icon: 'quiz',
      items: [
        { title: 'QCM — Ridha Ben Cheikh 2024', ext: P, mb: '1.0', year: 2024, fid: '1lCn-ZK6Vc4btmLLmBmAEleISFlgJ2WIL' },
        { title: 'QCM — Ridha Ben Cheikh, 1', ext: P, mb: '0.5', fid: '1Zs2gzGuz6VJBkD2dwiVVl5gL-f7q4vJC' },
        { title: 'QCM de physiologie digestive — Ridha Ben Cheikh 2021', ext: P, mb: '0.1', fid: '13QR0m7MhXnsULp_mIS3LJVSYRmvBQknf' },
        { title: 'ED de physiologie digestive', ext: P, mb: '0.6', fid: '1dnuccwl5jYvwxGoYX6OuO7XPq9iiAtz5' },
        { title: 'QCM — Ben Cheikh (photographiés)', ext: J, mb: '0.3', year: 2021, fid: '1BT7pFaevorsY5eevChaW2xgF17OcgiSc',
          pages: ['1BT7pFaevorsY5eevChaW2xgF17OcgiSc', '1tCAimR70OkKB26RbiOW2j4dlovQByWZO', '18q_KdPkFs1F0WjoPmhhUwjsOBF5MHB0i', '1d8KiXZ_G-YVzhRj5dm2lebMNJGAB2ntQ', '1jPg5TdUrw80U7pk1dhaXo4QwhxQPjMN6', '1EtxqozS003RrfWnMD9oqPp4yZ8cvw_OS'] },
        { title: 'QCM — Ben Cheikh, Monastir (photographiés)', ext: J, mb: '0.3', year: 2021, fid: '1TxMQrUQTOidAKT6Gp1J3riJeXZJdG9UQ',
          pages: ['1TxMQrUQTOidAKT6Gp1J3riJeXZJdG9UQ', '1wxrwXoRzRvQk3rMpXMcdIW7JH-VCkWTN', '1dEBkjk39EzD7GNfJNWNHXagKFiLI0AlH', '1p3DsmRq-OnYOEL31vFgBVRje5nT1GbjS', '18XyFeNs18dOc3wX893YH4tPinGVZox64'] },
        { title: 'QCM — Dogui', ext: P, mb: '1.2', fid: '1sOR0ptBPlUedaPwWRx281a4K8ZLOkdCg' },
        { title: 'Questions de neurophysiologie — 2013', ext: W, mb: '0.1', year: 2013, fid: '1uZ_8dbYazP6ZW2vo3hpToji1dziATusT' },
        { title: 'Questions — vision et audition (2015)', ext: W, mb: '0.1', year: 2015, fid: '1z8tVe2XExSXwEgjCGIbGG4TL_IsKnJTf' },
        { title: 'ED 2 (2014)', ext: W, mb: '0.1', year: 2014, fid: '15OmDYt9dqGQjU7W2CjFTXY1D-Gcs6Y66' },
        { title: 'Anciennes questions de PCEM2', ext: W, mb: '0.1', fid: '1a1gyr2SDsHXmYGM8ZAMSGloVkCuNHQjt' },
        { title: 'Examen de septembre 2011-2012, corrigé', ext: W, mb: '0.1', year: 2012, fid: '1xpzEEtjhYBIJNzgtsykLO_wmBvzP6zoi' },
        { title: 'Examen de septembre 2012-2013, corrigé', ext: W, mb: '0.1', year: 2013, fid: '1iSORZ3fDDzIHFdGkk9w-LWnT9c5RyK2Y' },
        { title: 'Examen de juin 2012-2013, sans réponses', ext: D, mb: '0.4', year: 2013, fid: '1pzKhIEL95kmt_agMfPWi6RYAXryB0AZn' },
        { title: 'Examen Dogui — 2013', ext: W, mb: '0.1', year: 2013, fid: '1fwVOhjjnGKE_kvv45En3IMYcq7zjA5gz' },
        { title: 'Examen Dogui — 2013 (autre copie)', ext: W, mb: '0.1', year: 2013, fid: '1w1RCYglRk3j4UfUSYa1U2AuuIdP4FZNp' },
        { title: 'Examen de Djibouti — 2013', ext: W, mb: '0.1', year: 2013, fid: '1v6nFER2Wp1g-9zz5IOUMJRzb9GmJt0WC' },
        { title: 'Examen Tabka — 2013', ext: W, mb: '0.1', year: 2013, fid: '19Ul48tJ-EO1Q1cAAVyCFU8dE0Kh1WiX0' },
        { title: 'Examen principal — 2014', ext: W, mb: '0.1', year: 2014, fid: '1w4shFwrNE8gFpsNhiXM0tghC9Mb--j85' },
        { title: 'Examen principal — 2014 (autre copie)', ext: W, mb: '0.1', year: 2014, fid: '19Ev9puTlaOaH-HLhL1_9RZcyF-f4O_nb' },
        { title: 'Examen de rattrapage — 2015', ext: W, mb: '0.1', year: 2015, fid: '1QixWUU6ISrYPTa_0NyJv0EW0x3O7n1pD' },
        { title: 'Rattrapage 2015 — réponses', ext: W, mb: '0.1', year: 2015, fid: '1Vy5ZbQE_W5aQy-1AyYWTN7bBCC_w7unm' },
        { title: 'Examen de Djibouti, principal — 2015', ext: W, mb: '0.1', year: 2015, fid: '1R5YK64-ZaFmpK-fdcy_rZYxchJ_QS0_y' },
        { title: 'Réponses S2 — 2015', ext: W, mb: '0.1', year: 2015, fid: '12tu4aimEtSnrf2hd_sPhKC6jd0Q4kf2R' },
        { title: 'Réponses QCR — Djibouti, principal 2011', ext: D, mb: '0.1', year: 2011, fid: '1b0qIFcVVG6lacK7GpdqaUezFPN8D-Iqw' },
        { title: 'Réponses QCR — Djibouti, principal 2013', ext: W, mb: '0.1', year: 2013, fid: '1Cm0FV8p5PmfWf8UYKXDTD-agQ5eMOQMG' },
        { title: 'Réponses — rattrapage Djibouti 2013', ext: W, mb: '0.1', year: 2013, fid: '1PJEv9rNhrQmq63PlgzSnoJEc1prLdJt2' },
        { title: 'Réponses QCR — Dogui, principal 2014', ext: W, mb: '0.1', year: 2014, fid: '1lXtHdZGTawSXweDQbbcUMUxIroOtnvbQ' },
        { title: 'Examen de Djibouti, 2e rattrapage 2014 — Zbidi', ext: W, mb: '0.1', year: 2014, fid: '1wbZ0cfEimwkzMyUuFA2PtK3Qza5CQu0f' },
        { title: 'Somesthésie — diapositives (2009)', ext: PT, mb: '0.5', fid: '1ZrN6x8MC0vSgglILsoCAk-ZLEjqAQ3PG' },
        { title: 'Devoir de physiologie', ext: W, mb: '0.1', fid: '1RhTv_cnbYQpbgehzW1InT-8StJsxkHLb' },
      ],
    },
  ],
};

export const PCEP2_SEMIOLOGIE_EPIDEMIOLOGIE = {
  id: 'pcep2-semiologie-epidemiologie', promo: 'pcep2', semester: 'S2',
  name: 'SÉMIOLOGIE-ÉPIDÉMIOLOGIE', icon: 'pulse', tint: 'purple',
  professors: ['Isselmou'],

  chapters: [
    {
      title: 'Épidémiologie',
      lectures: [
        { n: 1, title: 'Initiation aux études épidémiologiques', ext: P, mb: '1.4', fid: '1Qbr6zmPaP3QPqFB8s_Wewdy5bCRyhNoI' },
        { n: 2, title: 'Enquêtes statistiques', ext: P, mb: '0.9', fid: '13hEcKFIU_1y8lUhbWvsDPvBnvNcGvBVV' },
        { n: 3, title: 'Dépistage', ext: P, mb: '0.4', fid: '1wJCnj_StnvQGVyr8L4_VasAlpWG3kF-v' },
        { n: 4, title: 'Épidémiologie — 2024', ext: P, mb: '0.2', year: 2024, fid: '1y50UWve1fUUmkN8OdeQrJk6Eb_YetWQE' },
      ],
    },
    {
      title: 'Sémiologie',
      subtitle: 'Pr Isselmou',
      lectures: [
        { n: 5, title: 'Introduction à la sémiologie', ext: P, mb: '0.3', prof: 'Isselmou', fid: '1QQWJbP5EEybKQrsBmYDYaW30jsEaDIML' },
        { n: 6, title: 'Sémiologie — diapositives du Pr Isselmou', ext: PT, mb: '5.3', prof: 'Isselmou', fid: '12DFo6S0wOoC72pf2v-90qWGBx_cUjmFK' },
        { n: 7, title: 'Sémiologie cardiovasculaire', ext: P, mb: '0.5', prof: 'Isselmou', fid: '1XEmlOwFckH_7lC7mFjWPA1s8dOI0gO2u' },
        { n: 8, title: 'Sémiologie pulmonaire', ext: P, mb: '0.5', prof: 'Isselmou', fid: '17x0qPUuD8Pf5ZumPjZqJpLBuSRz0S0WH' },
        { n: 9, title: 'Sémiologie digestive', ext: P, mb: '0.1', prof: 'Isselmou', fid: '1b4R4VOv9OSt7PKIm15NE0jw-QGR81jP_' },
        { n: 10, title: 'Sémiologie rhumatologique', ext: P, mb: '0.6', prof: 'Isselmou', fid: '1zWLnERsz6QncqeFrdMOi-kdXeAbHFzOw' },
      ],
    },
  ],

  sections: [
    {
      id: 'tunis', where: 'archive', title: 'Cours — Tunis', icon: 'book',
      items: [
        { title: 'Support de sémiologie (Tunisie)', ext: P, mb: '1.2', fid: '1IrLRIOgwC25Y7NSJa9cFDk_tW49dfRNj' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen 2026 — session normale', ext: P, mb: '0.4', year: 2026, fid: '1n09gmb3uLKQcZhExZapG_fV8JNVLQNPM' },
        { title: 'Examen 2025 — session normale', ext: P, mb: '0.2', year: 2025, fid: '1lq6z-a_4l48lw3VrTaIyB-FIvIdwS6KH' },
        { title: 'Examen 2025 — rattrapage', ext: P, mb: '0.2', year: 2025, fid: '13ZKpWWddeT3LDdiT_KDaQecV1O7D_W8z' },
        { title: 'Examen 2024 — session normale', ext: P, mb: '1.8', year: 2024, fid: '1xvb4NmntLCaVEmkGXuiy1Rtw_zMisgP8' },
        { title: 'Examen 2024 — rattrapage', ext: P, mb: '1.1', year: 2024, fid: '1soGVxCfNDGUnELgSX2MGJDnGbRZ4hfG_' },
      ],
    },
  ],
};

export const PCEP2 = [
  PCEP2_BIOCHIMIE,
  PCEP2_BIOLOGIE_MOLECULAIRE,
  PCEP2_BOTANIQUE,
  PCEP2_IMMUNOLOGIE,
  PCEP2_MICROBIOLOGIE,
  PCEP2_CHIMIE_ORGANIQUE,
  PCEP2_GALENIQUE,
  PCEP2_PHYSIOLOGIE,
  PCEP2_BIOLOGIE_VEGETALE,
  PCEP2_BIOPHYSIQUE,
  PCEP2_CHIMIE_ANALYTIQUE,
  PCEP2_CHIMIE_MINERALE,
  PCEP2_PHYSIOLOGIE_S2,
  PCEP2_SEMIOLOGIE_EPIDEMIOLOGIE,
];
