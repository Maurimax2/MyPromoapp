// ANATOMIE S2 — organised.
//
// Two teachers, two subjects: Diagana takes the urogenital apparatus and the
// retroperitoneum, Kleib and Med Jedou take what is left of the head and neck.
// Drive files each lecture twice — a .pptx or .doc "poly" beside the PDF — so
// the PDF is the lecture and the source document hangs off it.

const P = 'PDF';

export const ANATOMIE_S2 = {
  id: 'anatomie-s2', promo: 'pcem2', semester: 'S2',
  name: 'ANATOMIE S2', icon: 'person', tint: 'purple',
  professors: ['Diagana', 'Kleib', 'Med Jedou'],

  chapters: [
    {
      title: 'Appareil urinaire et génital',
      subtitle: 'Pr Diagana',
      lectures: [
        { n: 1, title: 'Le rein et les surrénales', ext: 'DOCX', mb: '2.4', fid: '1Ztz21DpejXiGevqKjYxhopwXUK9CdSzC', prof: 'Diagana',
          versions: [
            { title: 'Reins, surrénales et uretères', prof: 'Diagana', year: 2023, ext: 'PPTX', mb: '9.7', fid: '141NlzQawryrvFBmUG5esyL_I7NmLDzLd' },
          ] },
        { n: 2, title: "L'uretère", ext: 'DOCX', mb: '2.2', fid: '1UJl6aJEnQ8KmHN7U3HroA2r4PXZm58dC', prof: 'Diagana' },
        { n: 3, title: 'La vessie', ext: 'PPTX', mb: '0.9', fid: '1As7YP2GYYigKyJcPS0EXwUnel2hxE9bk', prof: 'Diagana', year: 2023,
          versions: [{ title: 'Anatomie chirurgicale de la vessie', prof: 'Diagana', ext: 'DOC', mb: '0.3', fid: '1MZOaBjP6HKLsA7PYktVZLJwiMCw_8gvJ' }] },
        { n: 4, title: "L'urètre masculin", ext: P, mb: '2.1', fid: '174bzWVZ2AZVf_wYvbqnvnUzbsQ50lv3T', prof: 'Diagana', year: 2024,
          versions: [
            { title: "L'urètre masculin", prof: 'Diagana', ext: 'PPTX', mb: '0.2', fid: '149k1DhhAkzPW9m9bsDuORhiYRHI0HQw5' },
            { title: "L'urètre", prof: 'Diagana', ext: 'DOC', mb: '0.1', fid: '1XElK73aektX8hcK5jEbPYqw8o21XPEBw' },
          ] },
        { n: 5, title: 'La prostate', ext: P, mb: '1.0', fid: '1-huLXG02A34fydVFuBHiQXeAmsHT8Ia9', prof: 'Diagana', year: 2023,
          versions: [{ title: 'La prostate', prof: 'Diagana', ext: 'DOC', mb: '0.2', fid: '17vMvwOmXPQIy6vinL21-3KlBfAAis5zV' }] },
        { n: 6, title: 'Les bourses, l’épididyme et le testicule', ext: 'PPTX', mb: '1.4', fid: '1x66u7Xc-Kd1CGaVQFmMGyZmFhrumaGeS', prof: 'Diagana' },
        { n: 7, title: 'Les voies spermatiques', ext: 'DOCX', mb: '0.1', fid: '1EoPyslSjDsr0WkaHSMVYLoWMw7xi989C', prof: 'Diagana' },
        { n: 8, title: 'Les glandes génitales masculines annexes', ext: P, mb: '1.7', fid: '1Hm862XrNofWe5VFb7l1_sa4u6JsDZfVR', prof: 'Diagana', year: 2023 },
        { n: 9, title: 'Le pénis', ext: 'DOC', mb: '0.1', fid: '1zJx7t_4oyDB9S-q6GOpVWw7FrkY5pSAN', prof: 'Diagana' },
        { n: 10, title: 'L’utérus et ses annexes', ext: P, mb: '1.6', fid: '1rmp3hSBwS-2TyiLLDtFuzKWlP6sC49V7', prof: 'Diagana', year: 2024,
          versions: [{ title: 'L’utérus', prof: 'Diagana', mb: '1.6', fid: '1Q5Cmu3v9jo8UO8m-_27RzPdZbwdFzSDe' }] },
        { n: 11, title: 'Le vagin et la vulve', ext: 'PPTX', mb: '1.9', fid: '13IQP7-eGD4KZ5jMa352KV81bx6TGsrzW', prof: 'Diagana' },
        { n: 12, title: 'Les vaisseaux pelviens', ext: 'PPTX', mb: '5.9', fid: '1UnFKlwIec9ECfPyXFKG7vBgl8RwTWLpF', prof: 'Diagana',
          versions: [{ title: 'Les vaisseaux pelviens', prof: 'Diagana', ext: 'DOCX', mb: '0.7', fid: '1yWEWRL_Uqp-IeRp5xUMmx6ZvUnBiTghN' }] },
        { n: 13, title: 'La région rétropéritonéale', ext: 'PPTX', mb: '12.3', fid: '1Sr8v0PTC6Bg_anoWaFwx8FLz66tkj7Xy', prof: 'Diagana' },
      ],
    },
    {
      title: 'Tête et cou',
      subtitle: 'Pr Kleib · Dr Med Jedou',
      lectures: [
        { n: 14, title: 'La cavité buccale', ext: 'PPTX', mb: '16.0', fid: '1AhWJAkH9s4v0NADxyJzNhMIY2C132XFq', prof: 'Kleib' },
        { n: 15, title: 'La loge parotide', ext: P, mb: '8.5', fid: '1Pbkrw2rv-tOEOyDzuTAHqP5jrHFdjEej', prof: 'Kleib' },
        { n: 16, title: 'Les muscles de la face et du cou', ext: 'PPT', mb: '11.7', fid: '18a1VGaconH3UD4KAumVbjpX91VLsvL90', prof: 'Kleib' },
        { n: 17, title: "L'organe de l'audition", ext: 'PPTX', mb: '5.4', fid: '1_Ww_CWRR9NKJ1VcZ0Lrs1RrLPic2juoy', prof: 'Kleib' },
        { n: 18, title: "L'orbite", ext: P, mb: '1.2', fid: '1SA4e0TzUUmywDMESfm7bxSU3PBr17xFm', prof: 'Med Jedou' },
        { n: 19, title: "L'œil et ses annexes", ext: P, mb: '0.5', fid: '1dB5mIlp0QdmAc5B3nTDNfoGFkIZUj8oy', prof: 'Med Jedou' },
        { n: 20, title: 'Les muscles oculomoteurs', ext: P, mb: '1.1', fid: '1-vqH8cEz8fRzIHlNnOHL4p1gPnUSStUZ', prof: 'Med Jedou' },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Anatomie — cours complet, Pr Diagana', ext: P, mb: '121.7', fid: '1JaYvxje08v8wLpFC-l75JyovxNCz65Vt' },
        { title: 'Anatomie — Pr Diagana (recueil)', ext: P, mb: '11.0', fid: '1NNvEbEB_SrM0PMQvmrjZWm-H4qbvdc24' },
      ],
    },
    {
      id: 'schemas', where: 'archive', title: 'Schémas', icon: 'image',
      items: [
        { title: 'Schémas du Pr Kleib', ext: P, mb: '58.7', fid: '1H__cE94JcscWrwLB9xwZGmrLftJ66wu3' },
        { title: 'Schémas du Pr Kleib — S2', ext: P, mb: '8.6', fid: '1cvvArPslNLIkMGEBbhUnpTqVH-7zKAEG' },
      ],
    },
    {
      id: 'livres', where: 'archive', title: 'Livres et atlas', icon: 'book',
      items: [
        { title: 'Kamina — Tome 4', ext: P, mb: '41.5', fid: '1GCFvHy3AU7hb0yH-VGSjXkplj42L6akZ' },
        { title: 'Mémofiches Netter — tête et cou', ext: P, mb: '41.5', fid: '1fgFcY_mNiO7J_TFU3Dp6Kuzhu1QJN_Lz' },
        { title: 'Kamina Tome 2 — tête osseuse, os du crâne', ext: P, mb: '11.4', fid: '1BHtuIlajoRSZCIGLkwilwoovYn288qfS' },
        { title: 'Kamina Tome 2 — os de la face et cavités', ext: P, mb: '5.9', fid: '1fNDtAP_AsOLXMR5g8xeVV-GzLw0gKm8O' },
        { title: 'Kamina Tome 2 — appareil manducateur', ext: P, mb: '7.7', fid: '1N2HHi5I-Gel6tPGRux788qrybQYnanZH' },
        { title: 'Kamina Tome 2 — le dos et la colonne vertébrale', ext: P, mb: '11.2', fid: '1SXZ4NTAt6-MTaLVxzl3yHD7BBIrptDq-' },
        { title: 'Kamina Tome 2 — sommaire', ext: P, mb: '1.4', fid: '1C7EncON-RQLwZFmh_yYQ48zX4dfgIyqT' },
        { title: 'Kamina Tome 2 — index', ext: P, mb: '2.2', fid: '1vI7iUV1UwBour_PIy9QSShIGrNJPxntl' },
        { title: 'Kamina Tome 2 — références', ext: P, mb: '1.4', fid: '1oNhxQ9iJ8hj4G53W60rlgSxAFfMG9r2a' },
        { title: 'Kamina Tome 2 — préface', ext: P, mb: '1.0', fid: '1M6QaigQJ8JTr3gpXSVkyLCsHdAUTqtzO' },
        { title: 'Kamina Tome 2 — page de titre', ext: P, mb: '1.0', fid: '1xwGf5YhXmd_oYXJAlSQ9aBd1kxu91oc-' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés — Diagana', icon: 'file',
      items: [
        { title: 'Résumé — urologie', ext: P, mb: '9.1', fid: '1PbE2j6w_zM_0gjsJJLMaHzJWiLumG5gm' },
        { title: 'Résumé — anatomie Diagana', ext: P, mb: '7.4', fid: '1HH9mO-CLlb1OuTStLRCYo2hAj_Dwte6K' },
        { title: 'Résumé — anatomie Diagana (2)', ext: P, mb: '5.5', fid: '16su2084y8WB1cC6QI5EWdQ-i02RVV_g3' },
        { title: 'Résumé — anatomie Diagana (3)', ext: P, mb: '3.4', fid: '1RJaFawLK3Y6T4sZen6DJkCaoXXa71an7' },
        { title: 'Résumé — quelques chapitres', ext: P, mb: '11.7', fid: '1DgT92KkSyIeT3fMU47SZv9O5qQWFOIZ_' },
        { title: 'Résumé — cours de Diagana annotés', ext: P, mb: '5.0', fid: '1bEUBE1aXhV1HuReJ-TaSXzD0CzVvc4C9' },
        { title: 'Résumé — les uretères et la vessie', ext: P, mb: '2.6', fid: '1Kpn8W4NTs1d29Szo8qTyH-VcxzYPo5Qh' },
        { title: 'Résumé — la vessie', ext: P, mb: '1.4', fid: '1DyZPvaVke8g7QmB7mHJlL3fDExiPLbK1' },
        { title: 'Résumé — la vessie (Houda)', ext: P, mb: '0.4', fid: '1m5-bTExQtTUPAuz1spwu7OLwESEuejNW' },
        { title: 'Résumé — l’uretère (Houda)', ext: P, mb: '0.3', fid: '1KPfw8FT_o9cB02NRwMjD9bPzAnnoFTSX' },
        { title: 'Résumé — la prostate', ext: P, mb: '0.8', fid: '1ebkLrkaa-j8huKVBsnMHUv-_zemk8NQm' },
        { title: 'Résumé — la prostate (Houda)', ext: P, mb: '0.3', fid: '1wbs6ckNVFLn_cPjSt9ZAFqucCUsZPpir' },
        { title: 'Résumé — le rein et les surrénales (Houda)', ext: P, mb: '0.5', fid: '1Qb8Uh6bkE5nVwpjjr2OMhpMVDhD-JI4e' },
        { title: 'Résumé — le rein', ext: P, mb: '1.7', fid: '1Z6sjhKPcusLkgJHMNOKjcqNb8vV76rzG' },
        { title: 'Résumé — la vascularisation rénale', ext: P, mb: '0.3', fid: '1Pzp0nxR-LeQq9f5UGLAYRmf_qemnt43a' },
        { title: 'Résumé — la surrénale', ext: P, mb: '0.2', fid: '1zw6B3ay4X3lJ_FGyS4ISmrpgOneeAczs' },
        { title: 'Résumé — région rétropéritonéale et testicule', ext: P, mb: '1.5', fid: '1tzU0zIFzHF8I5JO8xYAhX8PyJoqehC_Y' },
        { title: 'Résumé — appareil génital mâle', ext: P, mb: '0.7', fid: '1ti3AAXIEWnczkbFpiKp9TsPVlU8QPtZw' },
        { title: 'Résumé — vaisseaux pelviens', ext: P, mb: '0.8', fid: '12rS9QhuvKz-9yeT0KEyODMrawARv5T83' },
      ],
    },
    {
      id: 'resumes-tete', where: 'notes', title: 'Résumés — tête et cou', icon: 'file',
      items: [
        { title: 'Résumé — muscles du cou et de la face', ext: P, mb: '52.1', fid: '1dQEicAt8GZIfXPV0S0z3aVAFbqQk1llM' },
        { title: 'Résumé — anatomie S2 (complet)', ext: P, mb: '25.4', fid: '1d3XKzrp3Uuw8Qs9SPVcMtk7lWTDoFz72' },
        { title: 'Résumé — anatomie S2', ext: P, mb: '3.9', fid: '1FoDEmC1Q6ZC4ZW2MBdnjoO3ku084V92r' },
        { title: 'Résumé — cours de Kleib', ext: P, mb: '5.2', fid: '1FYLAlmcIMRJrj5uVRrWCZs2-zOFDxXtt' },
        { title: 'Résumé — cours de Kleib (2)', ext: P, mb: '4.0', fid: '1QYSCFwOk_4pSEQDtL-gJSqhkS8RKLz1T' },
        { title: 'Résumé — cours de Kleib (3)', ext: P, mb: '0.2', fid: '1SmEiJyUEOKiJP8Bo3AZxF7qOSvS3VbpE' },
        { title: 'Résumé — la glande parotide', ext: P, mb: '0.4', fid: '1nBq6xCO3ssr7ZfiAShvTJXEHFLK_wool' },
        { title: 'Résumé — les foramens du crâne', ext: P, mb: '1.3', fid: '1aZ7-s9zO4i6p5uVqaUyxMQ8rLSwB_sC1' },
        { title: 'Résumé — cours du Pr Aziz', ext: P, mb: '3.3', fid: '1a6ke04pS3zKLOgUHVRHkhhuAuPyBXhPi' },
        { title: 'Résumé — cours du Pr Aziz (2)', ext: P, mb: '0.3', fid: '1RFI7Fueyi7leFG-rGDxKWxGG8jFEazia' },
        { title: 'Résumé — cours du Dr Jeddou', ext: P, mb: '1.0', fid: '1dRV82056fK6P2klpIj7GBmQlmGeQYRZq' },
        { title: 'Résumé — cours du Dr Jeddou (2)', ext: P, mb: '0.8', fid: '1u89bGfEF-PT0nAHxRQ5_tWj3znc5OEN6' },
        { title: 'Résumé — l’orbite', ext: 'JPG', mb: '0.6', fid: '10OHHVgy_PEd6Cz9hIzgD876qogu4zSF4',
          pages: ['10OHHVgy_PEd6Cz9hIzgD876qogu4zSF4', '1kGDnqhoDkkeDsv08Y20HGGsid8cYyvZ5'] },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Session 2024', ext: P, mb: '2.7', fid: '13WupKTmm-gPoj0bfnVD-vqA95C9vl4RG', correction: '1WUZ9T8qrg55lrJ1LTdgb0-xqPV2hahx0' },
        { title: 'Session 2023', ext: P, mb: '0.2', fid: '1VmoCNDX1RLDEhjGnWg8VhjOC2TdOr77G' },
        { title: 'Session 2022', ext: P, mb: '1.9', fid: '1YpKidqhALeuZXw1OuG7XwzkRz7wLePGF' },
        { title: 'Session 2021', ext: P, mb: '1.0', fid: '19hhHdteH7ucciTCsmqeYGbHZlZn6hI8n' },
        { title: 'Session 2021 (2)', ext: P, mb: '0.7', fid: '1j48UNdP0gE8BmdPl6weyF2lbGeo6qZt5' },
        { title: 'Session 2020', ext: P, mb: '0.9', fid: '1zkNhMSxK1tF-v07xyQaLZLNgy9md80XX', correction: '13WQao6UPmLTjyv4GrbCDLhZq0IpI5aGd' },
        { title: 'Session 2018', ext: P, mb: '0.1', fid: '1oQI4KmDrzcuSTMDXYGE7ID0J1zCbF4NS', correction: '1N009YLq9xLXgmMwogAi-o5itoCaOGng-' },
        { title: 'Session 2017', ext: P, mb: '1.3', fid: '1WI7Q5syWwhxdumVvMWItaamW6j0qNUpI' },
        { title: 'Pelvis — 2019', ext: P, mb: '0.2', fid: '12h_QhT0tDG6lvvsq7BdmjDJYScyRvxKM' },
        { title: 'Pelvis — 2017, principale et session', ext: P, mb: '0.5', fid: '1op804_Mvn4MuQvbIKUfmAGlo0f2g9b-u' },
        { title: 'Rattrapage 2022', ext: P, mb: '4.9', fid: '1gzAHu3Ad_onHgO51pEd8oKG6YwxrqBlw' },
        { title: 'Rattrapage 2020', ext: P, mb: '0.8', fid: '1PVruaxGG7kfC8bZeqeGmAWzVYa3UQ6oq' },
        { title: 'Rattrapage 2019', ext: P, mb: '0.3', fid: '1EaldFaqtmdTc2Y7U_9jj_BzsQj77py6L' },
        { title: 'Examens — recueil', ext: P, mb: '15.1', fid: '1D4dk6OaJFgtOLAziEyCXHLsyL4Cc9Unq' },
        { title: 'Corrections — recueil', ext: P, mb: '9.3', fid: '1wFW2m01QicfmIMQZlkMMJdvfkEJpiQdZ' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM et questions', icon: 'quiz',
      items: [
        { title: 'QCM — anatomie S2', ext: P, mb: '26.7', fid: '1-LjhHEUP0yP2tC9wQBFqnGwSVM-IOj5z' },
        { title: 'QCM — Soumaré, corrigés', ext: P, mb: '0.4', fid: '1BTeu3q3dXroJWCZXLAdrv8FFin24zMgo' },
        { title: 'QROC — Diagana, corrigés 2025', ext: P, mb: '16.9', fid: '128pJEwyIN3O9aihHjdXHUcxXX230JtnM' },
        { title: 'Questions d’examen — Diagana, corrigées', ext: P, mb: '3.7', fid: '1gHWh7AUkRma_xj-6rlKlB_hAfHum_HVK' },
        { title: 'Questions d’examen et TP', ext: P, mb: '3.3', fid: '1H4hWPg1W5LnZXPMEsRF9oBWTPrj6a_gm' },
        { title: 'Questions d’examen', ext: P, mb: '0.5', fid: '1KkrbltknrlxYgHnOwjXyubWEc83sNiJ7' },
      ],
    },
  ],
};
