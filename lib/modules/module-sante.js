// MODULE SANTÉ — S1, organised.
//
// It is three courses sharing one exam: santé publique, statistique and
// informatique. Drive keeps them in three folders, each with its own COURS /
// EXAMENS / RÉSUMÉ, so they become three chapters here. The exams that cover
// all three sit together under `Examens`, which is how they are actually sat.

const P = 'PDF';

export const MODULE_SANTE = {
  id: 'module-sante', promo: 'pcem2', semester: 'S1',
  name: 'MODULE SANTÉ', icon: 'shield', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Santé publique',
      subtitle: 'Concepts, épidémiologie, prévention',
      lectures: [
        { n: 1, title: 'Santé publique — définitions et concepts', ext: 'PPT', mb: '0.4', fid: '1bVexvRPuNGyg4nAUMy75ZvTH-ti09XN9' },
        { n: 2, title: 'Notions de santé publique', ext: 'DOC', mb: '0.0', fid: '1b5EWhSMTBVApn0NCF3BBgFUMEJ7q2I8-' },
        { n: 3, title: 'Cours de santé publique — PCEM2', ext: 'PPT', mb: '0.4', fid: '1EW9Wi3dauWawIhn7dRLjwHcEsoz9HrQt' },
        { n: 4, title: "Initiation à l'épidémiologie", ext: 'DOC', mb: '7.9', fid: '10P_Ye5xHm7PPNawJNURaQw6GGVT5o-M3',
          versions: [{ title: 'Épidémiologie — cours PCEM2', ext: 'DOCX', mb: '0.1', fid: '1zpSpYVgAKVN5t11okmLNlDeN8e60PX9n' }] },
        { n: 5, title: 'Épidémiologie — les indicateurs', ext: P, mb: '0.7', fid: '1vRlCnv6y5_RUFBv2nP3no1xpBXB1FX9C' },
        { n: 6, title: "L'éducation pour la santé", ext: 'PPT', mb: '0.3', fid: '1s1sDjCAVeBrK_VMhvTwzMOe70nE52nrg' },
        { n: 7, title: 'Les infections nosocomiales et leur prévention', ext: 'PPTX', mb: '1.1', fid: '1EoaKKU9QwXC_pWmi-_R22YrmO6yjp3r1',
          versions: [
            { title: 'Infections nosocomiales', ext: 'PPTX', mb: '0.1', fid: '1bNfWro-8ADIqOipOSRwb91uUQGgC9SEV' },
            { title: 'Infections nosocomiales', ext: P, mb: '0.0', fid: '1aFhziPAQefOYLP222WqA_QJKSJya9X6Q' },
            { title: 'Infections nosocomiales et prévention', ext: 'DOC', mb: '0.1', fid: '1eZlTo3X0zIPZa01CBnc1O3bOjrysrQsz' },
            { title: 'Infections nosocomiales et prévention', year: 2024, ext: P, mb: '0.9', fid: '1SZa2_rFesMHbIxeMMU2OSUUsMiv3vfZs' },
          ] },
        { n: 8, title: 'Santé publique — concepts et définitions', ext: P, mb: '0.4', fid: '1lI-smtzd4Ol5fSKHNEvUdDfSYaRT-QNj', year: 2024 },
        { n: 9, title: 'Chapitre 1 — santé publique', ext: P, mb: '0.2', fid: '1gsO5fDHEvuZ7IGftGA2u0llihGEY3vdI' },
      ],
    },
    {
      title: 'Statistique',
      subtitle: 'Statistique descriptive et probabilités',
      lectures: [
        { n: 10, title: 'Chapitre 1 — partie 1', ext: P, mb: '0.4', fid: '1wdnx6EKVLm59M7Y9bTXkOQxeW2kjR78h', year: 2023 },
        { n: 11, title: 'Chapitre 1 — partie 2', ext: P, mb: '0.4', fid: '1tEMMB8_IKYeYJGG7gWDddE_YX4Gp9Riv', year: 2023 },
        { n: 12, title: 'Chapitre 2 — partie 1', ext: P, mb: '0.3', fid: '1LLFxn3rVWl1PNwGqmQUltgY9ZJjOLB-l', year: 2023 },
        { n: 13, title: 'Chapitre 2 — partie 2', ext: P, mb: '0.2', fid: '10KiqEimx6saC9DEJybXH9BOwPRdWJVuk', year: 2023 },
        { n: 14, title: 'Chapitre 2 — partie 3', ext: P, mb: '0.2', fid: '1K1KXy4K7BwEOdjocswL9ke6z4R-n-8Cb', year: 2023 },
      ],
    },
    {
      title: 'Informatique',
      subtitle: 'Introduction et algorithmique',
      lectures: [
        { n: 15, title: "Introduction à l'informatique", ext: P, mb: '0.6', fid: '1BjVCAcpsw-02phx4rkcF_F2thsIVvT3x',
          versions: [{ title: "Introduction à l'informatique", ext: P, mb: '0.3', fid: '1_L6BqIDIswsksMmGsCiz2o1FRZMUtZdX' }] },
        { n: 16, title: 'Algorithmique', ext: P, mb: '0.8', fid: '1KyXhIFUdZ3muQ_WhBFkSFuXga2cRvvYM',
          versions: [{ title: 'Cours d’algorithme', ext: P, mb: '0.2', fid: '1SIfiGozgOAbktWr49RuOoE_k8jSvnNfh' }] },
        { n: 17, title: 'Access', ext: 'PPT', mb: '1.7', fid: '1Ayx1UtP-sp2NF8PN5sCyZzDhs2GXpnCq' },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés — santé publique', icon: 'file',
      items: [
        { title: 'Cahier de santé publique', ext: P, mb: '7.9', fid: '1VXzBZpTYRKfR70z7H5E6YOEBUG8xgTY0' },
        { title: 'Résumé — le dépistage', ext: P, mb: '20.6', fid: '1eSISwfGt2StZFgoz7dQrecNjYL1SkSHx' },
        { title: 'Résumé — santé publique', ext: P, mb: '1.5', fid: '1rOdZq0BZiaz5cLV2eFuO16kJmCTwc34c' },
        { title: 'Résumé — santé publique (2)', ext: P, mb: '1.0', fid: '1rLF5NguLFpdP-ux55nls4VicxSFLQtTI' },
        { title: 'Résumé — la santé et ses déterminants', ext: P, mb: '0.4', fid: '14W_L2OsYJ6rSzLzEfirMmbvYQlpo0L6r' },
        { title: 'Résumé — concepts et définitions', ext: P, mb: '0.4', fid: '1D-ofnW-bHVHnxYywPQtsIl8DoMH6Mcqq' },
        { title: 'Résumé — épidémiologie', ext: P, mb: '0.3', fid: '1jipcMWDT9aU_epDYtw-aFuxonTiA0WP2' },
        { title: 'Résumé — santé publique (3)', ext: P, mb: '0.3', fid: '14_TZ29Ge4DSS05LghlSMBpjCoLaYc5-p' },
        { title: 'Résumé — santé publique (4)', ext: P, mb: '3.2', fid: '1_23g4teVA7mIdKFVLqIJfMcq2Je-yH8s' },
        { title: 'Résumé — santé publique (5)', ext: P, mb: '2.9', fid: '1mAG3WUcR2FGiVRwJBgA-a1No5vUVedMO' },
        { title: 'Résumé — santé publique (6)', ext: P, mb: '0.5', fid: '1xM9Bf3-zrdsZ8lDH7cx4g4yiVRjzdOkw' },
        { title: 'Résumé — santé publique (7)', ext: P, mb: '0.0', fid: '1RQjydCRqb6ULhAeUSEjgUCyf2-BqY6GB' },
      ],
    },
    {
      id: 'resumes-stat', where: 'notes', title: 'Résumés — statistique et informatique', icon: 'file',
      items: [
        { title: 'Résumé — statistique', ext: P, mb: '16.3', fid: '1eqxIhLO6eB1gW86Hz7FyTd_yIPY6mxn2' },
        { title: 'Résumé — statistique (2)', ext: P, mb: '9.6', fid: '1QPP3cy0izZAjwLWifyXuTL16Vowxq2oM' },
        { title: 'Résumé — statistique et probabilités', ext: P, mb: '2.4', fid: '1MA4gCgQlMXT9yvLPd83XA1mNJOnstRmy' },
        { title: 'Résumé — statistique, par chapitre', ext: P, mb: '2.3', fid: '1WiPPY1ZO_LrwQoZfJGERE2Za5wlUo_Wn' },
        { title: 'Résumé — informatique', ext: P, mb: '3.0', fid: '1v-Abc5_REhds4yAvB8f-NrJCB8GuOjMJ' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens — module complet', icon: 'quiz',
      items: [
        { title: 'Session 2025', ext: P, mb: '0.7', fid: '1Lzi1pF5oQ1UJ8zCP1UpGkuo501jJCLHL' },
        { title: 'Session 2023', ext: P, mb: '0.3', fid: '1xCQXK0dg0LIzg3Vi3NWLKnlR7DpQ1Y5K' },
        { title: 'Session 2023 (2)', ext: P, mb: '0.2', fid: '1c06HjMRtOYgfPax5F83eVG8bFuBIIYdk' },
        { title: 'Session 2022', ext: P, mb: '1.0', fid: '1a5wBskfJrHB5byFGN33Y0e9CruucdYPf' },
        { title: 'Session 2021', ext: P, mb: '0.6', fid: '1V6g7zC6GAS4QrSqelPBh_OOdFESQd_d1' },
        { title: 'Session 2020', ext: P, mb: '0.2', fid: '1D0nGEhPIO34iN31X4tAPpvJdKkVE2fCA' },
        { title: 'Session 2019', ext: P, mb: '1.8', fid: '1cw8LgaXEB9kJiMNhtipWPwWG9msmqjEh' },
        { title: 'Session 2018 — juin', ext: P, mb: '0.4', fid: '1-Q0elaNzZRa99dsgnPgBw6yAzVnb6qqy' },
        { title: 'Session 2018 — février', ext: P, mb: '0.1', fid: '15RBIXh_UmvInVul6BBH2LaiZcYLugGU9' },
        { title: 'Session 2018', ext: P, mb: '0.1', fid: '1j4TaZE8u-8hBcA05qC_o9bm5C2_AAr4j' },
        { title: 'Session 2017–2018', ext: P, mb: '0.4', fid: '1hqAl8IcGMH5XkQEaUxhf4_3sxK7mbJ2C' },
      ],
    },
    {
      id: 'examens-sp', where: 'quiz', title: 'Examens — santé publique', icon: 'quiz',
      items: [
        { title: 'Session 2023', ext: P, mb: '0.1', fid: '1OgI_GJH1P2bAoCNSyAjruFpJP0sP3WVp' },
        { title: 'Session 2022', ext: P, mb: '1.0', fid: '1QAqzOY7OTYi8fSErXnKSDSl7zffSMsLf' },
        { title: 'Session 2021', ext: P, mb: '0.6', fid: '1q5IPzTtKcTugyphXzo0QAiwyeam55WQy' },
        { title: 'Rattrapage 2022', ext: P, mb: '4.5', fid: '1Ute4c6d0uV89v60yawnD1SsnEA7SAPeo' },
      ],
    },
    {
      id: 'examens-stat', where: 'quiz', title: 'Examens — statistique', icon: 'quiz',
      items: [
        { title: 'Session 2024', ext: P, mb: '2.0', fid: '10FCIK_T2hXZZMwHU97aDSRmAO52RZrUC' },
        { title: 'Session 2023', ext: P, mb: '0.1', fid: '1hGiwu2GObwpflR2KBjPpBkFhz1VMvg4o' },
        { title: 'Rattrapage 2023', ext: P, mb: '0.1', fid: '1MT9qcTtHc9gfdUqERqiYLbaAwSXk1RpY' },
        { title: 'Session mai 2022', ext: P, mb: '0.4', fid: '1frIJGBnasXcM9oEsFn7QKUUzSTmp3eHO' },
        { title: 'Session 2022', ext: P, mb: '0.1', fid: '1-RCxsD4OCavixKsXwj6rsWXmksqxzP-E' },
        { title: 'Rattrapage 2022', ext: P, mb: '0.1', fid: '1LU9lYhgESvB_W1NDP8eTiQ_lxCKwUfFm' },
        { title: 'Session 2021', ext: P, mb: '0.1', fid: '1TAwTkyn55dW6pamqYP11XUj_VKxhiN7n', correction: '1VrLxRKEOW-cXoM30q0dxWdqSAF8O0Ahb' },
        { title: 'Rattrapage 2021', ext: P, mb: '0.0', fid: '1y-GjoymFxTg8oDev3cOoJ2P6rxAinrR_' },
        { title: 'Examens corrigés', ext: P, mb: '31.7', fid: '1_dBw-ATtCVzdng9qAWZLmQH3bukqwFd7' },
        { title: 'Examens corrigés — recueil', ext: P, mb: '6.6', fid: '1TTLneyz2s2rF5LsJao4Qe9f7WFvxtSsP' },
        { title: 'Statistique — DCEM4, juin 2021', ext: P, mb: '0.1', fid: '1HeWLv4HRJYBfp2qRyWwizzhY-QKOw9ZB' },
        { title: 'Sujets ISCAE', ext: 'JPG', mb: '9.2', fid: '1WFgzGde4kmeP7gbeuFh8TbOUPWcIerTb',
          pages: ['1WFgzGde4kmeP7gbeuFh8TbOUPWcIerTb', '1zOywvjeYR_b8yBMJXgpGRGUuKu5hR79u'] },
      ],
    },
    {
      id: 'examens-info', where: 'quiz', title: 'Examens — informatique', icon: 'quiz',
      items: [
        { title: 'Session 2023', ext: P, mb: '0.1', fid: '1LCEBc6lpS11E5lD4T5fyBWx3-d8JH1tJ' },
        { title: 'Session 2022', ext: P, mb: '2.4', fid: '184SZQPgthbvPErTB2pdxtT5mvdNtoYSZ', correction: '1uz9r-1gkK1JHNZ5RQbX8YxZFX3EQVkTs' },
        { title: 'Isolé — informatique (correction)', ext: P, mb: '3.8', fid: '1yT4p-zJ6d158pudwkQSkVUCacZdMOLFp' },
        { title: 'Examens 2013 à 2015', ext: P, mb: '0.7', fid: '1-vtrOl4IAk1mqBLj_iMUFil6lTjx_870' },
        { title: 'Examens UGEM', ext: P, mb: '1.0', fid: '12bbB7EfiFJGLvyngAx71TEB3qHHMY4TP' },
        { title: 'Recueil d’examens', ext: P, mb: '30.1', fid: '11NICMqPGYad7g9TYSVjFlbJHp79TXCbt' },
        { title: 'Exercices d’algorithmique', ext: P, mb: '0.0', fid: '1u4zN5WIBaM4C2Tn9Cj69zpC3Q3m4hhvU' },
        { title: 'Informatique — annales', ext: P, mb: '1.2', fid: '1s8Lw0OfzFG3WUNWeyzusZodAg9LbxmQG' },
      ],
    },
  ],
};
