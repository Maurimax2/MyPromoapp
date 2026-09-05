// PHYSIOLOGIE S1 — organised.
//
// Two halves: the kidney with the equilibria that depend on it, and the
// endocrine glands. Drive keeps the same lectures three times over — the 2024
// diapos, Dougui's PowerPoints from 2015–2019, and the detailed polycopiés —
// so each lecture here carries its older years as versions instead of
// appearing three times in the list.

const P = 'PDF';

export const PHYSIOLOGIE_S1 = {
  id: 'physiologie-s1', promo: 'pcem2', semester: 'S1',
  name: 'PHYSIOLOGIE S1', icon: 'atom', tint: 'purple',
  professors: ['Dougui', 'Rida Ben Cheikh'],

  chapters: [
    {
      title: 'Rein et équilibres',
      subtitle: 'Fonction rénale, hydro-électrolytique, acido-basique',
      lectures: [
        { n: 1, title: 'Introduction à la physiologie', ext: P, mb: '5.9', fid: '15xufwflF1wXbtQTcBJArhJUzOYJZcdeb', year: 2024 },
        { n: 2, title: 'Le rein', ext: P, mb: '2.1', fid: '1KxMT-vAnJV8OYLVbNLjo0bMrKqjRxtZz', year: 2023,
          versions: [
            { title: 'Le rein', year: 2023, mb: '1.7', fid: '1U1Vh1KX4K4ci3ZNE5jMnOJKpz4eQdOkv' },
            { title: 'Le rein', prof: 'Dougui', year: 2015, ext: 'PPTX', mb: '1.7', fid: '1r6Na7mUoFv3RFrBcKUasgwgT7equStqy' },
            { title: 'Le rein — polycopié détaillé', year: 2015, mb: '0.6', fid: '1MZWOyIAe8PIeRl_my0_4g_D1waXl6GTT' },
          ] },
        { n: 3, title: "L'équilibre hydro-électrolytique", ext: P, mb: '0.4', fid: '1YbPi-JAM86uUm2QMoaISi1-vafrgJcdT', year: 2015,
          versions: [
            { title: "L'équilibre hydro-électrolytique", prof: 'Dougui', year: 2015, ext: 'PPTX', mb: '1.5', fid: '1Npnflpfg8HidrtGAKqDNcxcpy-WnQdiO' },
            { title: "L'équilibre hydro-électrolytique", prof: 'Dougui', year: 2015, ext: 'DOCX', mb: '0.0', fid: '1YhFTX-PFT99UQVH9QERAGamLECJ6DkKN' },
          ] },
        { n: 4, title: "L'équilibre acido-basique", ext: 'PPTX', mb: '0.3', fid: '1Uo6AEN364WN5Ds-Oce4FpLEjyShqGl8q', prof: 'Dougui', year: 2015 },
      ],
    },
    {
      title: 'Physiologie endocrinienne',
      subtitle: 'Axe hypothalamo-hypophysaire, thyroïde, surrénales, gonades',
      lectures: [
        { n: 5, title: 'Le système endocrine — généralités', ext: 'PPTX', mb: '0.5', fid: '19fidM1G7yqkRRG44MFhm4xTovbXtLL8a', prof: 'Dougui', year: 2019 },
        { n: 6, title: "L'axe hypothalamo-hypophysaire", ext: P, mb: '15.8', fid: '1iZzD6DjAB1_kZYWAPw85BPoRSixcxAa9', year: 2024,
          versions: [
            { title: "L'axe hypothalamo-hypophysaire", prof: 'Dougui', year: 2019, ext: 'PPTX', mb: '3.2', fid: '1_F9vtFBbwayncp5W3uP4k0rpuamppVtW' },
            { title: "L'axe hypothalamo-hypophysaire", year: 2010, mb: '0.2', fid: '1IBCoZpSwYfOkeIPuxjEyuoyNB0Vcov3q' },
          ] },
        { n: 7, title: 'La thyroïde', ext: P, mb: '12.4', fid: '1FwPcDEopR2PkiKfzguTkVAsNY-kfrm0z', year: 2024,
          versions: [
            { title: 'La thyroïde', prof: 'Dougui', year: 2019, ext: 'PPTX', mb: '1.7', fid: '1CwcnP5N5RK1iHf4HpeEXBK6qkpExISj6' },
            { title: 'La thyroïde — polycopié détaillé', mb: '0.3', fid: '12U2TMcETpZyGyCK0MPVK3bxr7tTcVD8B' },
          ] },
        { n: 8, title: 'Les surrénales', ext: P, mb: '14.4', fid: '1tojrSt2KyULddH6V9vWyPBFPt7cVdk5v', prof: 'Dougui', year: 2024,
          versions: [
            { title: 'La surrénale', prof: 'Dougui', year: 2015, ext: 'PPTX', mb: '1.4', fid: '13_MphSqmQueMTU-ooWbF1N7bGKw2iQku' },
            { title: 'La corticosurrénale', year: 2015, mb: '0.7', fid: '1vLQuBhLp_Yrhyi-xtzzfDjqYZouKWEDb' },
          ] },
        { n: 9, title: 'Le pancréas endocrine', ext: P, mb: '20.6', fid: '1NHvJ2YrsiceF-mAAjQhdOHWYbWMqVHPu', prof: 'Rida Ben Cheikh', year: 2024,
          versions: [
            { title: 'Le pancréas endocrine', prof: 'Dougui', year: 2017, ext: 'PPTX', mb: '1.4', fid: '1NJFcE1quvWArDt94O-wcZnONSOVqyqeL' },
            { title: 'Le pancréas endocrine — polycopié détaillé', mb: '0.4', fid: '1UnOYHqIGJWKQFcheT3zSJ87I-QVmEdVR' },
          ] },
        { n: 10, title: 'Les gonades', ext: 'PPTX', mb: '1.7', fid: '1UcxcaQf2F5pQwgeGkW6r18sTXVml1mv3', prof: 'Dougui', year: 2015,
          versions: [{ title: 'Les gonades — polycopié détaillé', year: 2015, mb: '0.4', fid: '1hpYCmF9FKCjvLqldBluUPATnZ-4XiGjx' }] },
        { n: 11, title: 'Le métabolisme phosphocalcique', ext: P, mb: '26.7', fid: '14rr0Kibt_cZhqs7mMq6BaljESWz3FHlD', year: 2024,
          versions: [{ title: 'Le métabolisme phosphocalcique', prof: 'Dougui', year: 2017, ext: 'PPTX', mb: '1.6', fid: '1jVoC4RjSaYXFIIiNwjiSSzLv3R34ysWG' }] },
        { n: 12, title: 'Diapositives — Rida Ben Cheikh', ext: P, mb: '18.3', fid: '1rB6yjZb8aUg7WI1bPmtOLKJIJ897jBAi', prof: 'Rida Ben Cheikh', year: 2024 },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Polycopié complet — 2023–2024', ext: P, mb: '4.3', fid: '1hHOI-UaHZACPqwbSAdnke-V6EceZBi5u' },
        { title: 'Polycopié complet — 2022–2023', ext: P, mb: '3.3', fid: '1YR7KmBv_hn_bI6ktmo6JjnrxgyPRTctP' },
        { title: 'Polycopié complet — 2022', ext: P, mb: '3.3', fid: '1ybyUsM4RMkE1AjEqooYZ9VdtId8x7ZwW' },
        { title: 'Polycopié complet — 2021–2022', ext: P, mb: '4.3', fid: '1JKff-27WkM_1YY8j8Iqu0L5UwfoYwu0R' },
        { title: 'Polycopié complet — 2020–2021', ext: P, mb: '3.3', fid: '12CfGzAHqeop5LyTRgj7DNEpGtfEdUdpS' },
        { title: 'Polycopié complet — 2019–2020', ext: P, mb: '5.3', fid: '16yS79nfP6g-ugurxtt9GAzPN-qwannjR' },
        { title: 'Polycopié complet — 2018–2019', ext: 'DOCX', mb: '7.2', fid: '1GYgR5S-KUaIYyYo1ztt43d_PmAY_Lwal' },
        { title: 'Polycopié complet — 2018', ext: 'DOC', mb: '12.1', fid: '1dizkd_6OqCQ5eU5OwHXgmqax4v9Hhmge' },
        { title: 'Polycopié complet — 2016–2017', ext: P, mb: '14.0', fid: '1T5E1Wf9pWtU5PkWIGyeCuGr7_cGIQBLe' },
        { title: 'Polycopié complet — 2015–2016', ext: P, mb: '9.3', fid: '1Vu13v7LrpP__lNcqSLFqIgrVze58eJBZ' },
        { title: 'Physiologie humaine', ext: P, mb: '33.8', fid: '1HYA6TH6WATBIeLFFTZQHgHnf_miM0gL0' },
        { title: 'Programme du module', ext: P, mb: '2.1', fid: '1gcIS85agIIGqGADwZvek2X51tFjpL757' },
        { title: 'Polycopié complet — 2019–2020 (variante)', ext: P, mb: '5.3', fid: '1uXiKlXemBzr01gwUjzHLfdiDIqEU3OBX' },
        { title: 'Polycopié complet — 2015–2016 (variante)', ext: P, mb: '4.4', fid: '1utMEPO_pUuGCTaHCDxR2D-hWQiALLPfg' },
        { title: 'Polycopié — 2019', ext: 'DOT', mb: '7.7', fid: '1uZkkffekrQF7UNi38c263NsKuMupLMgF' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés et corrections', icon: 'file',
      items: [
        { title: 'Auto-évaluation — version 2023', ext: P, mb: '8.9', fid: '1dWlGvUyho-ypd0k6Hrd75hVENzUqrnxq' },
        { title: 'Correction des examens de physiologie', ext: P, mb: '16.6', fid: '1OgUkNzu1g4yAHPwi3kdZj7jC1Ul7Hqwc' },
        { title: 'Examens de physiologie et corrections', ext: P, mb: '10.5', fid: '1gbpSQPSeAPPHvHvkaoYuccSHluFwkfYr' },
        { title: 'Corrections commentées', ext: P, mb: '6.4', fid: '1MbbCH7MY1KAWr-VY7HKu90HwHwM09Fko' },
        { title: 'Corrections — recueil de Monastir', ext: P, mb: '1.0', fid: '1ZXYYJjnsBSW83QhV4fJXBumTzhMOlIAo' },
        { title: 'Physiologie S1 — notes', ext: P, mb: '16.3', fid: '1HAEQGJnh1mdTibJOM0P00-27OsGBKJBy' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Session 2025', ext: P, mb: '12.8', fid: '15L2XTBvN3rAIiEMm_7eF0Mv8oeyNvtlS', correction: '1IEXRDRMsTxTs1GOyq1EfmDeEz1ubtVj3' },
        { title: 'Session 2024', ext: P, mb: '6.4', fid: '1fLKZr99zALOejHNNkiyDPR1burrBLVB0' },
        { title: 'Session 2023', ext: P, mb: '0.6', fid: '105OHfPEMzoiW_sMmYfuiFCAeyE839BgP' },
        { title: 'Session 2022', ext: P, mb: '3.6', fid: '1ohNsEM32I7QeQxLOWcZcReDVHz3e0ODm' },
        { title: 'Session 2021', ext: P, mb: '5.5', fid: '1OxE0ljryXbBpjfomOU8aGormTPQ6xxL7', correction: '1pX7mAOZp1liGhj6usqVUEcbEyY0J4j57' },
        { title: 'Session 2020', ext: P, mb: '3.2', fid: '1Re2oYDm56YmXZ_SNSU9RfS2uhGvlp-ha' },
        { title: 'Session 2019', ext: P, mb: '0.6', fid: '109ztonJrw7c__dX4i4bpQ5WicMeo6TQz' },
        { title: 'Session 2018', ext: P, mb: '0.5', fid: '12L0iVjzPaw2zQ62alYN_P37ZwWrp8d1J' },
        { title: 'Session 2017', ext: P, mb: '0.7', fid: '1BCnrcTGkTyyLQgxDI30U4W_cy-WQTXVN' },
        { title: 'Session 2016', ext: P, mb: '1.4', fid: '1OKuZEOLg0ONt7U7wFPzeeNjXW7OAa06F' },
        { title: 'Rattrapage 2024', ext: P, mb: '2.2', fid: '1i9Ls4zajgD3INBHCAnsCWRBvxdXivqbV' },
        { title: 'Rattrapage 2023', ext: P, mb: '2.6', fid: '1x3c2K3tEX-8zukknwcEmRWTK_hVWzgUB' },
        { title: 'Session complémentaire 2022', ext: P, mb: '0.9', fid: '1awSOGXXVBJuOXq6-geTiOUK9JdJFSS99' },
        { title: 'Rattrapage 2021', ext: P, mb: '0.5', fid: '1vKRLxCnldQdJ8KcnOephw_nR2W_qUFUl' },
        { title: 'Rattrapage 2021 (photographié)', ext: 'JPG', mb: '0.6', fid: '1xDjD0awdK-o4gGubKKVXDyQ-MDxUh7Kh',
          pages: ['1xDjD0awdK-o4gGubKKVXDyQ-MDxUh7Kh', '1XMH7ID-NwSYhpriK55YP3ruCN2KPMDdK', '165UuhUCdcXCeblxYdXrLzHoVKAo7BpDU', '1MCWza51MoRFOjp-2YlS6WVCGnKK90Yo4', '1tWsTephw3p6AdPNVjxjUEixyhZVn3ykn', '15CRPsXTSdj_bOZ7Oi-E-Z8HUwTRI0ehA', '1DrsPOUMX-tu4By5QU7U5xoi_qNpddAXB', '1UQwS6rugxFFwwddSnjrQr9fBRpE5Xu70', '1DFe2IO4icHmtVIqmldBjBTkmrjF-sSI_', '1O-ghPTBRsxXfwVSPlZqFvgkzeNBOonlj'] },
        { title: 'Rattrapage 2019', ext: P, mb: '2.2', fid: '1TOtG_owOOfiCeZzCEYpdCq5do7aULHMO' },
        { title: 'Rattrapage 2017', ext: P, mb: '14.6', fid: '1bv-gxERDadwnk6XZM7oSV31i5f_hFpdy' },
        { title: 'Rattrapage 2016', ext: P, mb: '4.4', fid: '1-iABvh_idZgdCv9HmlR-mIlOd9_Ly3HM' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés par chapitre', icon: 'quiz',
      items: [
        { title: 'Isolé — le rein', ext: P, mb: '5.1', fid: '1BSnJRINLJ4iRJUMm_10e7duSNZGX8AWO',
          versions: [] },
        { title: 'Isolé — le rein (2)', ext: P, mb: '4.4', fid: '1Cag2qzVTxb5q5PzIwvjZb1USrKPQR21-' },
        { title: 'Isolé — le rein (3)', ext: P, mb: '1.2', fid: '17Uswe_6XrxzUUQqLc8qgiVYfb6Imn0fx' },
        { title: "Isolé — l'équilibre acido-basique", ext: P, mb: '1.4', fid: '1lVf2YfAb9JkY2xBPIqQdwy11RBTAzFj7' },
        { title: "Isolé — l'équilibre acido-basique (2)", ext: P, mb: '0.8', fid: '1WcvWF57hpCbDpOObs692aq_iQifNIuky' },
        { title: "Isolé — l'équilibre acido-basique (3)", ext: P, mb: '0.4', fid: '1xfEzbOEh2QEzL3QWGSkIgT5rIakilLD_' },
        { title: "Isolé — l'équilibre hydro-électrolytique", ext: P, mb: '1.5', fid: '17ZUcuhDhA-Mpvr-tUjRfFb7o90ZqBYQo' },
        { title: "Isolé — l'équilibre hydro-électrolytique (2)", ext: P, mb: '0.6', fid: '1BkJsu4HaFbDGYNIHC2fMu_lEHz1CNe1G' },
        { title: "Isolé — l'équilibre hydro-électrolytique (3)", ext: P, mb: '0.3', fid: '1rKpoiQ8mjVRSHgrys4ARiDk4uigx0lO1' },
        { title: "Isolé — l'axe hypothalamo-hypophysaire", ext: P, mb: '3.4', fid: '1cmVn2VfXAUSyTjgVp1P1Ygg4ieQeqgDP' },
        { title: "Isolé — l'axe hypothalamo-hypophysaire (2)", ext: P, mb: '3.0', fid: '1ZjCQ_9cV9RIZ_uQYdC9WjHENfAGQya_E' },
        { title: "Isolé — l'axe hypothalamo-hypophysaire (3)", ext: P, mb: '0.6', fid: '1oI1iUHHySU78R2RcBSXE1fFfJcE9eabm' },
        { title: 'Isolé — la thyroïde', ext: P, mb: '2.3', fid: '1w-BsNjtlL5ts2JHqSRi39n2UmUKSX6Uv' },
        { title: 'Isolé — la thyroïde (2)', ext: P, mb: '0.5', fid: '1c5yB5UVHTvBBHIq2Q1WAtO6e-9BObXWp' },
        { title: 'Isolé — la corticosurrénale', ext: P, mb: '4.6', fid: '1qjkaJZYPIETJBrJKxLX50_oq6StqpDKh' },
        { title: 'Isolé — la médullosurrénale', ext: P, mb: '1.6', fid: '16ip_WH9qRhydhwV1AoUTy7CvtaMBppti' },
        { title: 'Isolé — la surrénale', ext: P, mb: '3.3', fid: '1jiEGHD1ZwhXKvXiyEW-fiTAZu4Tbizml' },
        { title: 'Isolé — la surrénale (2)', ext: P, mb: '0.7', fid: '1yg8CJ6YffGLGV-gwrSzZIZReqgtwnj4y' },
        { title: 'Isolé — le pancréas endocrine', ext: P, mb: '2.7', fid: '1mh5haiNG7YmNQkVEalxfFkmtGtlxw7Dp' },
        { title: 'Isolé — le pancréas endocrine (2)', ext: P, mb: '2.5', fid: '1yDIVgu9BjLu_P1gZU01u9C1t1zVoPt7H' },
        { title: 'Isolé — le pancréas endocrine (3)', ext: P, mb: '0.5', fid: '10rZuR9gtvyaB2j-en7jyeu8XpOSAtFA9' },
        { title: 'Isolé — les gonades', ext: P, mb: '5.1', fid: '1ix7x9bk8HQu88Y9S9dnRZYuW4foe7m6t' },
        { title: 'Isolé — les gonades (2)', ext: P, mb: '3.2', fid: '1cggbdne-_gAAUbUJfcdeT_LEtbAcYGQ-' },
        { title: 'Isolé — les gonades (3)', ext: P, mb: '0.6', fid: '1DjOJ_QhOxU4GD_iHqXoHISYanDH2Ekj3' },
        { title: 'Isolé — le métabolisme phosphocalcique', ext: P, mb: '1.9', fid: '14Rmm9kQmdl4adRHMZsoQLtwtXumzkkc-' },
        { title: 'Isolé — le métabolisme phosphocalcique (2)', ext: P, mb: '1.9', fid: '1vbxidNFXE797QXMg9YwTj8hx5fKe--Mq' },
        { title: 'Isolé — le métabolisme phosphocalcique (3)', ext: P, mb: '0.6', fid: '1bgdOAQ_5wWAgUvpQsqCHCuU_MVcBcjR8' },
        { title: 'Isolés — recueil 2024', ext: P, mb: '25.8', fid: '15l9Bfp4hSq2udRX7F_lWLGxzO0-XklrP' },
        { title: 'Isolés — recueil complet', ext: P, mb: '56.5', fid: '1rI0UNG05mWLrfVATcLaq3LsgoOxO64nO' },
        { title: 'Isolés — recueil 1', ext: P, mb: '8.8', fid: '10BS1brsmO7g2tbTlQXdLEZFh75T-6v6h' },
        { title: 'Isolés — recueil 2', ext: P, mb: '8.4', fid: '1D_aVXse-mCfkJeZqi0zc42LzUpechp7D' },
        { title: 'Isolés — correction, partie 1', ext: P, mb: '0.1', fid: '17fGQHQBZcATsFT90ZWYJscLM1hzOsYQ2' },
      ],
    },
  ],
};
