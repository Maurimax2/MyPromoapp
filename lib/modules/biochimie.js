// BIOCHIMIE — S1, organised.
//
// Two teachers, two halves of the module: Kebir has the metabolic half,
// Khadijetou Ba the clinical half. Drive files them under their names, which
// is why an earlier attempt at this grouped them by file type — `Cours` and
// `Fiches & TD` — and lost the fact that they are two different courses.
//
// Ba's lectures exist in Drive one by one, so they are numbered. Kebir's do
// not: his course is one polycopié plus the fiches he hands out, and there is
// no honest way to split a single PDF into chapters here. That is what the
// module actually is.
//
// Several exams exist only as photographs — a page per image. They are kept as
// one exam with its pages in order, not as loose files called `20161025_230717`.

const P = 'PDF';
const J = 'JPG';

export const BIOCHIMIE = {
  id: 'biochimie', promo: 'pcem2', semester: 'S1',
  name: 'BIOCHIMIE', icon: 'flask', tint: 'orange',
  professors: ['Kebir', 'Khadijetou Ba'],

  chapters: [
    {
      title: 'Biochimie métabolique',
      subtitle: 'Pr Kebir',
      lectures: [
        { n: 1, title: 'Fiches du cours', ext: P, mb: '32.5', fid: '1chUgiG9V4NcKtF_T5J0pdgIEQUujB-zZ', prof: 'Kebir',
          versions: [{ title: 'Fiches du cours (recueil court)', prof: 'Kebir', mb: '4.7', fid: '19W2pIC0XFvMMbLxbbWGMo0shuXQurt3A' }] },
        { n: 2, title: 'Fiche 12 — la cétogenèse', ext: P, mb: '0.1', fid: '1jp7fdvA7qww0bHp4nUIy3QHvYg7HXK-p', prof: 'Kebir', year: 2025 },
        { n: 3, title: 'Fiches 15 à 17 — métabolisme des acides aminés', ext: P, mb: '0.1', fid: '1w_1Hsmz0d9xqvF6UuGtFEvGT9R2f39YY', prof: 'Kebir', year: 2025 },
        { n: 4, title: 'Complément de cours et TD', ext: P, mb: '0.2', fid: '1LlNeEIUmM12gOWzQ1Jj5XVXXf0UgijVe', prof: 'Kebir', year: 2025 },
        { n: 5, title: 'Fiches complémentaires', ext: P, mb: '0.3', fid: '14I5OkbTrlK2OJTbRZGo-ArkC8ppJ5Vxb', prof: 'Kebir', year: 2025 },
      ],
    },
    {
      title: 'Biochimie clinique',
      subtitle: 'Pr Khadijetou Ba',
      lectures: [
        { n: 6, title: 'Exploration du métabolisme glucidique', ext: P, mb: '6.6', fid: '18x4XTvdHgCXWm--CPbC1iZ7aC7i9bD4M', prof: 'Ba', year: 2025,
          versions: [{ title: 'Biochimie glucidique', prof: 'Ba', mb: '0.9', fid: '1BPiuwcWQh85i892rNIC7vQ4S9wVALJT9' }] },
        { n: 7, title: 'Exploration du métabolisme lipidique', ext: P, mb: '0.3', fid: '1OI1jno5X6P3HTiakKT4WkRJeCeS87si5', prof: 'Ba', year: 2025,
          versions: [{ title: 'Biochimie lipidique', prof: 'Ba', mb: '0.9', fid: '1Ftr5KR4B8Wt5Uj8lb5f4hzj3VOxxpueD' }] },
        { n: 8, title: 'Exploration biochimique du foie', ext: P, mb: '2.8', fid: '1wrGb-VkRwdDQS4wtKdVjuPu-8ZoXVhe4', prof: 'Ba', year: 2025 },
        { n: 9, title: 'Exploration biochimique de la fonction rénale', ext: P, mb: '2.2', fid: '167AtbQXhCMbpZrOoiWd1j6Mx5TaLSPVS', prof: 'Ba', year: 2025 },
        { n: 10, title: "Exploration de l'équilibre hydro-électrolytique", ext: P, mb: '50.4', fid: '1tDrI4oEn6nSfmg5iTwCUs8RzgxuLuWPO', prof: 'Ba', year: 2025 },
        { n: 11, title: 'Métabolisme des protéines', ext: P, mb: '4.3', fid: '1D5PPqXujsQJ3BVwhNKpbt2137psKirpM', prof: 'Ba', year: 2025 },
        { n: 12, title: 'Les protéines sériques', ext: P, mb: '1.6', fid: '1Vun_R35cQ6sf9Zgyuh3iHaw1RCK6Q6w6', prof: 'Ba' },
        { n: 13, title: 'Les enzymes sériques', ext: P, mb: '2.8', fid: '10PKg_mgdBGXRpdtbZPcKJGVG-Hj9LX2W', prof: 'Ba', year: 2025,
          versions: [{ title: 'Les enzymes sériques', prof: 'Ba', mb: '1.6', fid: '1oBavMWOjSzlx2t4rQK85L5rrF-gPWqln' }] },
        { n: 14, title: 'Le métabolisme phosphocalcique', ext: P, mb: '1.9', fid: '17s2TP1LOE32F6qxAyuGkw1vURcqXKOcn', prof: 'Ba', year: 2025,
          versions: [{ title: 'Métabolisme phosphocalcique', prof: 'Ba', mb: '0.7', fid: '1yziECDc7U9HMMZQ9v-wEXeo_Zwmpg3wO' }] },
        { n: 15, title: 'La biochimie du fer', ext: P, mb: '1.1', fid: '1S05oFkzalhBugUNfhQyBgA9UbSygDVEs', prof: 'Ba' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Biochimie métabolique — cours complet', ext: P, mb: '9.5',  fid: '1xNT_i9bm7swjge8feVv0nNKBgtDR8-2s' },
        { title: 'Biochimie clinique — cours complet', ext: P, mb: '14.4', fid: '1mdQD_sN4snGqGeTmnLRzOfq_XcvRGrhI' },
        { title: 'Biochimie — Pr Khadijetou Ba (recueil)', ext: P, mb: '16.6', fid: '1CRfzFKMWZOm8vGtaijX3zY3V2zJyor0N' },
        { title: 'Biochimie — notes de cours', ext: P, mb: '0.4', fid: '1owzseEmi_kNT4q5tkDDxfDHvTU_dpnI9' },
      ],
    },
    {
      id: 'livres', where: 'archive', title: 'Livres', icon: 'book',
      items: [
        { title: 'Biochimie UE1 — 1re année santé, Beaumont & Simon', ext: P, mb: '66.2', fid: '15uDcC-aYr-i3g520tlyJdzub7B-4PuIH' },
        { title: 'Biochimie clinique', ext: P, mb: '5.5', fid: '13RCzkvsgRwkeoVIAJsJqsThfcVBUjjtn' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés et fiches', icon: 'file',
      items: [
        { title: 'Résumé — biochimie clinique', ext: P, mb: '13.4', fid: '1D52dRiRn30ASefnLXohLghAOwVy4EoFW' },
        { title: 'Résumé — biochimie Kh. Ba', ext: P, mb: '11.8', fid: '1b01CnGn9CR918N_j-C9OfGAsfmXPprwR' },
        { title: 'Résumé — l’essentiel de la biochimie clinique', ext: P, mb: '5.8', fid: '1CXuBdPhsNESBKq8ycIkFPimoNktmBgsx' },
        { title: 'Résumé — biochimie clinique (2)', ext: P, mb: '5.4', fid: '1CfZEIlMrF8aaOm4qXlRw7z1CMygsF4IM' },
        { title: 'Résumé — biochimie clinique (3)', ext: P, mb: '5.0', fid: '1988RnvgGe_010IVYS3HILJY65titP5MP' },
        { title: 'Résumé — biochimie clinique (4)', ext: P, mb: '4.6', fid: '1l2P8Rec5w-IBzKqmUA4kc3bVxtmtOMpd' },
        { title: 'Résumé — biochimie clinique (5)', ext: P, mb: '4.2', fid: '1P_dw5RV7eEZIEefOMSfZAyYBP3KyKkh8' },
        { title: 'Résumé — biochimie clinique (6)', ext: P, mb: '1.4', fid: '1CvQ0d3U1ubcAiI4wsXcLwhp4ar2AKWLk' },
        { title: 'Notes de cours — biochimie clinique', ext: P, mb: '10.1', fid: '14Vrhmhk0a77dhG9SxdEwEuJjtS8roAq_' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Session 2025', ext: P, mb: '0.6', fid: '1IK1rciOcnXc9u_76MMVCaJKMVAEbDM34' },
        { title: 'Session 2024', ext: P, mb: '3.3', fid: '1C2s6mTOF8hOhQrMFcg6fHx8Z-TeuK5Aq' },
        { title: 'Rattrapage 2024', ext: J, mb: '4.5', fid: '1CBvPW9t2vEU-VJsUDfP0oYX08QifKkMW' },
        { title: 'Session 2023 — Kebir', ext: P, mb: '0.1', fid: '11GVPAfSV5h3hlvdz_PiyTRpPpT8Upfh_' },
        { title: 'Session 2023 — Kh. Ba', ext: P, mb: '0.0', fid: '1H_iMThMyUcxLH_gpHFbirs_1sWZq5Sdq' },
        { title: 'Rattrapage 2023 — Kebir', ext: P, mb: '0.1', fid: '16xEOJreaS_V0IUNn2UBmypr5ruXQ6cqH' },
        { title: 'Rattrapage 2023 — Kh. Ba', ext: P, mb: '0.1', fid: '13bKMnqGAOMc822aS6kyDtbJadaZ0ojvx' },
        { title: 'Rattrapage 2023 (photographié)', ext: J, mb: '4.4', fid: '1Ybmx1rsd4W8KEx3_gX4EZyVyCgMQAIxP' },
        { title: 'Session 2022 — Kebir', ext: P, mb: '0.8', fid: '1r9YRjraK2LgUqOlrz-8lscBSy9m-JTfb' },
        { title: 'Session 2022 — Kh. Ba', ext: P, mb: '0.3', fid: '1k6gZrlKNRCvT4EyFqhfr_Om0u9fvsImJ' },
        { title: 'Session 2022 (photographié)', ext: J, mb: '0.3', fid: '1qeP5tWCvb3A2Oi4dIh5fnFsxuOMewRlp',
          pages: ['1qeP5tWCvb3A2Oi4dIh5fnFsxuOMewRlp', '190UmtxFnuVpJbuqZMzcE1taMJ3wcrxk5'] },
        { title: 'Session 2021', ext: P, mb: '1.0', fid: '19wYnlpd4maIsxXkZ8s34vAeFZ0N0XwSd', correction: '1kcd81Hn4B4KhA_srf1u8gKGLfqpFNfro' },
        { title: 'Session 2021 — Kebir', ext: P, mb: '0.6', fid: '128BNfglrNguV2QMVGYs6_XZeaegGGP9c' },
        { title: 'Session 2020', ext: J, mb: '20.5', fid: '1WpHZ0xJG-vrcHIK9xtWGgSEIp3Ola6H7',
          pages: ['1WpHZ0xJG-vrcHIK9xtWGgSEIp3Ola6H7', '1slWGscMrf4rUZiX2i84qD5Kqp6UCVFtD', '177LM-ynK8ojIoJkutcYdD6x6HIYLF5pe', '1OJz_JTeClt3qH_w98C5OsvFuexcuw9SJ', '1IdJeMfodHRm51op2C_Fuyjus39Z9ny9M'] },
        { title: 'Session 2016', ext: J, mb: '2.5', fid: '1qtTJDmZmll1XQGabbMXKdJq1AUyKf8It',
          pages: ['1qtTJDmZmll1XQGabbMXKdJq1AUyKf8It', '1r8CHSOuhgKGuOvgMdrUtRjoxWlhICcf7', '1VLrl6Kel3IgULV7Noy4X2Xf3w8srV86q'] },
        { title: 'Session 2015', ext: J, mb: '1.8', fid: '1c3CUKS5vJm5bHxLE3JMt7IaEd5Y5FikR',
          pages: ['1c3CUKS5vJm5bHxLE3JMt7IaEd5Y5FikR', '1Ikw6ZEyvHRBbkj5iy6wHivDDLVOYhEuT'] },
        { title: 'Session 2014', ext: J, mb: '4.5', fid: '1wmzKVh8Bb_CvJ_7U4kOYMouQVRy-BTf6',
          pages: ['1wmzKVh8Bb_CvJ_7U4kOYMouQVRy-BTf6', '1wSMOc0MKT_vphOFnLcH0G42PgFUdoatC', '1eBME3wAWmtwA41OVkX9pFtwW90MHylfp', '1i6VW-IzCbnGKF1dupumCypXGylK5SVhw', '1esuQ1KHQOsAJ8TJasmc_uLKE-uXGzuG8'] },
        { title: 'Épreuve 1 (photographiée)', ext: J, mb: '1.9', fid: '15YsJFfZnZ2JpqA3ZaiqNjyshGw9syHVo',
          pages: ['15YsJFfZnZ2JpqA3ZaiqNjyshGw9syHVo', '160i-QMn3v7Mkwk1kGJqXjyz6BOa8NEMO'] },
        { title: 'Épreuve 2 (photographiée)', ext: J, mb: '2.0', fid: '1Tz8G2U7txuC4T1_8C6oz7-CYId8XB8cR',
          pages: ['1Tz8G2U7txuC4T1_8C6oz7-CYId8XB8cR', '1Hg50KF8xjWZA-W7CpKENXcozurPOXwDW'] },
        { title: 'Compositions 2014 à 2017', ext: P, mb: '0.6', fid: '1l_zN4OcKvubXyLLys_6Gb85_vcliZNI6' },
        { title: 'Tous les examens de Kh. Ba', ext: P, mb: '0.9', fid: '1OSEtTcu2aCYDU9-o9Hixn9ESD-G2NLLM' },
        { title: 'Examen Kh. Ba', ext: P, mb: '1.5', fid: '1KFQm_kLPNGySDSgbZtkAV9yPtV9BvFZ7' },
        { title: 'Examen Kh. Ba — corrigé, avec Kebir', ext: P, mb: '2.8', fid: '1EHhDG6IW38LD6f9bhSZtbXGs4nOcTfOS' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et TD', icon: 'quiz',
      items: [
        { title: 'QCM et TD — Kebir', ext: P, mb: '21.0', fid: '1CnQ4F0u1OWyz7YPVIeASzMK1EVtOxCPT' },
        { title: 'QCM — Kebir', ext: P, mb: '5.2', fid: '1-J0Ewc3iymrcgH09CEwuBIu624QOumFP' },
        { title: 'QCM — enzymologie', ext: P, mb: '0.2', fid: '1Id02v5SG9KjqevfYR5uF8mAW9jEk9hll' },
        { title: 'QCM — fiches 15 à 17', ext: P, mb: '1.1', fid: '1x1YTZoe90tDFTK0vpNoh5VGcvYddVvDC' },
        { title: 'QCM — fiches 3 et 4, réponses', ext: 'DOCX', mb: '0.0', fid: '1zJzcqUR3aIKVke1k2D8IY8rLTe1J_yNv' },
        { title: 'TD — Kebir, avec correction', ext: P, mb: '1.2', fid: '1vMsukaLp9yZMg_0B9GnC5ZAxYOLGRIta' },
        { title: 'TD 2 — Kebir', ext: P, mb: '1.2', fid: '1KQfYbQodBd8iwmKGlIg8ccgkop7mj75o' },
        { title: 'TD 2024 — Kh. Ba', ext: P, mb: '4.1', fid: '1ZWO5X8c4fEOVqOsm_b5n2VKf_mCFnYea' },
        { title: 'TD — biochimie clinique', ext: P, mb: '1.5', fid: '1ten0X6cZAc2q8A4NVTZ7zYKU7G6H2tB7' },
        { title: 'TD 2016–2017', ext: P, mb: '3.6', fid: '1XAgDtO2jeH8mW-KGYN7xjE3sROrZaat8' },
        { title: 'TD 2018–2019', ext: P, mb: '0.3', fid: '1lV5ulpuhvLNjNUpiV8kjGWMyWDOQIP4Y' },
        { title: 'TD — PCEM2', ext: P, mb: '0.1', fid: '13rWde-PXIBRFykp8SfEynlnnN9z1_RAV' },
        { title: 'TD — biochimie', ext: P, mb: '0.4', fid: '1nq9IU19KvCBh5Huho0MrgRB-clIt3bB1' },
        { title: 'Correction des TD', ext: P, mb: '1.2', fid: '1ik34Iho_V89B_WCeQQ3e_TQbjF2d2_-t' },
      ],
    },
  ],
};
