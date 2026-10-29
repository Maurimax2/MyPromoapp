// PCEP2 — pharmacy, second year: the Tunisian programme.
//
// The Faculté de pharmacie de Monastir's second year, as its students publish
// it on Pharmask (sites.google.com/view/pharmasktn › Externat › PCEP2). The
// page embeds one Drive folder, «2ème Année Pharmacie»
// (1z4ZvVNkt3jfxMre7r1lXOzPbqe69SbHK), shared «anyone with the link» and read
// off each folder's public listing — metadata only, nothing in it touched.
// Each semester keeps «Années Précédentes», one folder per academic year
// (2021-2022 to 2024-2025), a folder per subject inside.
//
// A student reads this year in FMPOS's programme (pcep2.js, which already
// files some Tunis material as sections) or in this one, chosen on الدراسة.
// Same shape as tn-dcep3.js; the folders of papers for every subject at once
// («Annales par matière», «Correction des examens», «Examen 2026») are filed
// under the subject each paper's name gives.
//
// Every id starts `tn-` (lib/data.js, isTunisian).

const P = 'PDF';
const PT = 'PPT';
const W = 'DOCX';
const X = 'PPTX';

// ---------------------------------------------------------------------------
// S1
// ---------------------------------------------------------------------------

export const TN_PCEP2_BIOLOGIE_MOLECULAIRE = {
  id: 'tn-pcep2-biologie-moleculaire', promo: 'pcep2', semester: 'S1',
  name: 'BIOLOGIE MOLÉCULAIRE ET BIOTECHNOLOGIE', icon: 'micro', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Pr Asma Omezzine',
      lectures: [
        { n: 1, title: 'Introduction', prof: 'Pr Asma Omezzine', ext: P, year: 2025, fid: '1-7S4yXNsUV85LuZWv_l_W2xLfgS6BBuZ' },
        { n: 2, title: 'L’information génétique', prof: 'Pr Asma Omezzine', ext: P, year: 2025, fid: '1osOz3_6MbyaooMFDzG4Oob0FnV6j3rLu' },
        { n: 3, title: 'La replication', prof: 'Pr Asma Omezzine', ext: P, year: 2025, fid: '1-FaU2diyS-ke5lHUNQhWOYR_lfuXij6t' },
        { n: 4, title: 'La transcription', prof: 'Pr Asma Omezzine', ext: P, year: 2025, fid: '1-49GS7aZZ5qJD63MjLu0d_w3OEmdJIxb' },
        { n: 5, title: 'La traduction', prof: 'Pr Asma Omezzine', ext: P, year: 2025, fid: '1--by5Ssh4P7Bpo9BZCPqi_Ku8scC4RCb' },
        { n: 6, title: 'La réparation', prof: 'Pr Asma Omezzine', ext: P, year: 2025, fid: '1-2cG8BOfZ60JcgET1m2NGOd_-mulvaX6' },
        { n: 7, title: 'Les événements génétiques', prof: 'Pr Asma Omezzine', ext: P, year: 2025, fid: '1-7c0v8G8mER9q-0xQNOI78T0JDHkHJNG' },
        { n: 8, title: 'Polycope biomol pdf', prof: 'Pr Asma Omezzine', ext: P, mb: '3.5', year: 2025, fid: '1LOA9z1mYdOgOKRvnupwkmlyszY29Ph2h' },
      ],
    },
    {
      title: 'Pr Sana Sfar',
      lectures: [
        { n: 9, title: 'Régulation de lexpression géniique', prof: 'Pr Sana Sfar', ext: P, mb: '27.1', year: 2025, fid: '1lqRhyMAWqNxKvgqFBND73XTNp-zOj98M' },
        { n: 10, title: 'Sana', prof: 'Pr Sana Sfar', ext: P, mb: '14.1', year: 2025, fid: '1k6dx1n7NJv28G5H0iJJtPgak9nAYbtlP' },
      ],
    },
    {
      title: 'Pr Tayeb',
      lectures: [
        { n: 11, title: 'Biotechnologie', prof: 'Pr Tayeb', ext: P, mb: '10.6', year: 2022, fid: '1yDxQqy7eVTTA_nmYkJfl9n5FQRF-sDo2' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Article à lire - Mutation génétique et maladie — 2023-2024', prof: 'Pr Omezzine Asma', ext: P, mb: '3.0', year: 2024, fid: '1Jcb4IKfhZ32RFBAmyxf0f8riue9aRXOJ' },
        { title: 'Polycope biologie molécullaire — 2023-2024', prof: 'Pr Omezzine Asma', ext: P, mb: '25.5', year: 2024, fid: '158eSMpM5mtbQq9EPfYBJP7a4I1qBUSjs' },
        { title: 'Régulation de l’expression des gènes — 2023-2024', prof: 'Dr Sfar Sana', ext: P, mb: '14.1', year: 2024, fid: '1L50VdX8zZyn1bbwhiE69ySdH8h8fZSH_' },
        { title: 'Mécanismes Fondamentaux de la BioMol — 2021-2022', prof: 'Pr Omezzine Asma', ext: P, mb: '0.3', year: 2021, fid: '1HmMRORF59ECWX3cwSpeLhr3kJz0nA7yD' },
        { title: 'Information Génétique — 2021-2022', prof: 'Pr Omezzine Asma', ext: P, mb: '0.4', year: 2021, fid: '1dlke2j1O9PDG6dDNhkG6ntwTnztSmakq' },
        { title: 'Réplication — 2021-2022', prof: 'Pr Omezzine Asma', ext: P, mb: '0.9', year: 2021, fid: '1lObyFrtHFqtkQ0V4P-sR7q6r_UIt4qhu' },
        { title: 'Transcription — 2021-2022', prof: 'Pr Omezzine Asma', ext: P, mb: '1.0', year: 2021, fid: '1jFsIDkQRx8lCrGpBOVeoceUh_jPiCPdS' },
        { title: 'Traduction — 2021-2022', prof: 'Pr Omezzine Asma', ext: P, mb: '0.9', year: 2021, fid: '1-fnCBVpIstL8Z5mDX32Z7HGC0tPCBN-C' },
        { title: 'Réparation — 2021-2022', prof: 'Pr Omezzine Asma', ext: P, mb: '0.7', year: 2021, fid: '1xTpkrw4GWER4u1UkrMnTTE4-ixg3tFTA' },
        { title: 'Evènements génétiques — 2021-2022', prof: 'Pr Omezzine Asma', ext: P, mb: '0.3', year: 2021, fid: '17Woe00z49bUG4AubyssPWDV7WnzyqP1e' },
        { title: 'Biol Mol — 2021-2022', prof: 'Pr Ben Messaoud Taieb', ext: P, mb: '13.7', year: 2021, fid: '1dJdYctx6s423mMSnwgpgjxfRJJ-r4bTI' },
        { title: 'Régulation de l expression génique — 2021-2022', prof: 'Pr Sfar Sana', ext: P, mb: '9.4', year: 2021, fid: '1OwiG6_K8ATVk1og-ATQftiopqoi_JYSu' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Biomol', ext: P, mb: '7.1', year: 2025, fid: '1NsYIQZh4TLaQ5HQVg70Y-JPJmrM81Zrq' },
        { title: 'Consignes devoir', prof: 'Pr Omezzine Asma', ext: P, mb: '0.3', year: 2024, fid: '1hDPDbRgcGj7u5rtaKdJCHhSr7aDFj38_' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Correction TD1 BioMol', ext: P, mb: '0.4', year: 2025, fid: '1Ycn-nK5Gd0wr9if_Ij1hYmeeZA9Utqj4' },
        { title: 'Correction TD4+5 biomol', ext: P, mb: '5.0', year: 2025, fid: '1vcLiBAVcLuMuSf9M3c71KWW7TbnfDLQi' },
        { title: 'Correction Régulation de l expression génique', ext: P, year: 2024, fid: '1blINMibabguc8gUCJo720aed9SUfxYKN' },
        { title: 'Correction TD1 BioMol', ext: P, year: 2024, fid: '1rsQjvGFlmbpsrG7m0SWZbfNPZceCMNSo' },
        { title: 'TD Biomol', ext: P, mb: '1.0', year: 2025, fid: '11WFATzAZAImpGEqsKBHTPUJ58I-iKggq' },
        { title: 'TD régulation de l’expression des gènes', ext: P, mb: '0.9', year: 2024, fid: '17H_qDisEUJjjyALDg4tJZdO0OOAiiGs6' },
        { title: 'TD Bio-Mol Régulation de lexpression génique', ext: P, mb: '0.5', year: 2021, fid: '1UAodK_EnbQoTV6TQpGwDkFukD6Eredws' },
        { title: 'Correction Régulation de l expression génique', ext: P, mb: '1.0', year: 2022, fid: '1l3V7--wOJtp6cF9YsluHiHeC9j3S-S6D' },
        { title: 'TD BioMol en ligne', ext: P, mb: '0.3', year: 2021, fid: '1oPkq1msL4bykQasl5Dtnku6AvcQsJUPJ' },
        { title: 'TD BioMol en présentiel', ext: P, mb: '0.3', year: 2021, fid: '1D5t140MTcJCzXU1fpopnK7aoQuaqJyrP' },
        { title: 'TD Régulation de l expression génique', ext: P, mb: '0.5', year: 2021, fid: '150n6KZpMj3oW8GVJznv13FwkXmI-JSQ2' },
      ],
    },
  ],
};

export const TN_PCEP2_BIOPHYSIQUE = {
  id: 'tn-pcep2-biophysique', promo: 'pcep2', semester: 'S1',
  name: 'BIOPHYSIQUE', icon: 'atom', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Biophysique',
      lectures: [
        { n: 1, title: 'Acoustiques anatomie poly3', prof: 'Pr raja guedouar', ext: P, year: 2025, fid: '1jYc19MPPtRAbQktOszzDnZnYiOl2SDPD' },
        { n: 2, title: 'Acoustiques audiogramme poly4', prof: 'Pr raja guedouar', ext: P, year: 2025, fid: '1C0mjdrSVo2TTuSMkNP1ea1bH8ebbe8BU' },
        { n: 3, title: 'Acoustiques physiologie poly2', prof: 'Pr raja guedouar', ext: P, year: 2025, fid: '1mAKQzMawV30Pt9NwDwKEgEknxBzcwy_b' },
        { n: 4, title: 'Acoustiques version étudiants 2023 chapitre1', prof: 'Pr raja guedouar', ext: P, year: 2023, fid: '1oEdbTISSS2f99Zxl4AHZm4zcfllLMAZ7' },
        { n: 5, title: 'Astigmatisme', prof: 'Pr raja guedouar', ext: P, year: 2025, fid: '1KdyrvKMqNAv8LxHza2lqR_kbLBd_HD0A' },
        { n: 6, title: 'Biohysique chapitre1 cours vision', prof: 'Pr raja guedouar', ext: P, year: 2023, fid: '18JpQVTuU9D-MbOnn72l29AqfD4HWJThG' },
        { n: 7, title: 'Biophy', ext: P, year: 2025, fid: '1q89W7Cag09pJVhtHiKBV1D6ORU3H8fJG' },
        { n: 8, title: 'Cours biophysique Audition', prof: 'Pr raja guedouar', ext: P, year: 2022, fid: '1jaTN-V5XuoxmI0XL9AZYuMyjNurIAULM' },
        { n: 9, title: 'Numérique Biohysique cours vision 20222-6', prof: 'Pr raja guedouar', ext: P, year: 2025, fid: '1qlvpcg5GRFuIuD4mzlCcxKYX-LK95iT3' },
        { n: 10, title: 'Sfar biophysique de la vision chapitre2', prof: 'Pr raja guedouar', ext: P, year: 2025, fid: '1hpd-DYdFvnp1GGDvRFXrwIUQKDJeLJb1' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Mécanique des Fluides — 2023-2024', prof: 'Pr Ayachi Najla', ext: P, mb: '6.1', year: 2021, fid: '1DQC3_amoE5dHImur8Xk30sB9uKi3wQO4' },
        { title: 'Phénomènes de Surface — 2023-2024', prof: 'Dr Ouerfelli Hanene', ext: P, mb: '4.1', year: 2021, fid: '157eEPkZxdzFhBWytb15AsIx8XX278W6o' },
        { title: 'Radioactivité radiobiologie — 2023-2024', prof: 'Pr Toumi Asma', ext: P, mb: '13.4', year: 2024, fid: '1H_yNwsqYZYUMSmkRYFM9_KM0QbFoI5Eu' },
        { title: 'Dosimétrie et radioprotection — 2022-2023', ext: P, mb: '5.8', year: 2023, fid: '1GMjLNpKE10LjDvsKOPf5s8Sj2uT8RnqY' },
        { title: 'Numérique Biohysique cours vision — 2022-2023', ext: P, mb: '21.6', year: 2022, fid: '1jFb4N9OX0VeGK9YwRM5pVQlMLmhvaLV0' },
        { title: 'Physique nucleaire et radioactivite cours — 2022-2023', ext: P, mb: '10.9', year: 2022, fid: '1N5NTyGt2C-o22fLdZe043nOscW61NNs_' },
        { title: 'Acoustique — 2021-2022', prof: 'Dr Guedouar Raja', ext: P, mb: '40.1', year: 2022, fid: '1iW4xcgSXH_ZzjBrxAv6bT8csn-Rhzp5R' },
        { title: 'Perception Auditive — 2021-2022', prof: 'Dr Guedouar Raja', ext: P, mb: '10.9', year: 2022, fid: '1KrptJdN39qCyN9xjG8phGx8o2oZ78dF4' },
        { title: 'Physique Nucléaire et Radioactivité — 2021-2022', prof: 'Pr Ayachi Najla', ext: P, mb: '12.1', year: 2021, fid: '1XOjxqzWRirEMGxobLqpEjeGBBie5Sgo1' },
        { title: 'Partie 1 : Explorations fonctionnelles de l’audition — 2021-2022', prof: 'Dr Guedouar Raja', ext: P, mb: '1.6', year: 2022, fid: '1NzJDuuUyjBcfp54_iTrvVzOOX3XmsCKS' },
        { title: 'Partie 2 : Explorations fonctionnelles de l’audition — 2021-2022', prof: 'Dr Guedouar Raja', ext: P, mb: '11.7', year: 2022, fid: '1UvV2O5hsNl5l4yzDptf5DcDBZ6yAlL3J' },
        { title: 'Ultrasons — 2021-2022', prof: 'Dr Guedouar Raja', ext: P, mb: '14.1', year: 2022, fid: '16hs02jQ-tge3XKwfi8ZZLW0YlxL9l9-M' },
        { title: 'Suite cours radioactivité Dr Toumi — 2021-2022', prof: 'Dr Toumi Asma', ext: P, mb: '3.4', year: 2022, fid: '1RRDw7VUoqhvJRcdKwtcHmZ6dl6r_FTVG' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé cours vision', prof: 'Dr Guedouar Raja', ext: P, mb: '8.4', year: 2022, fid: '1_3ev1qMcRkYpjY1EuE1oGzUIrHyyYmDx' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Biophy', ext: P, mb: '16.0', year: 2025, fid: '1ia_r_5KrSit-gWFK_7Y1cGb9kmwyWl52' },
        { title: 'Biophysique s1', ext: P, mb: '0.3', year: 2026, fid: '12HmonPMAsx0qcNQDtqIW-k66YZh8tqoV' },
        { title: 'Correction Examen Biophysique Session Janvier', ext: P, mb: '1.9', year: 2025, fid: '1XlA2fLtKUDNxIjTUHoAGXmi_5kneDjGF' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Correction Acoustique 1', ext: P, year: 2025, fid: '1cmDWYieUEcbr1dqakBFxiO7j0UOxYWRv' },
        { title: 'Correction acoustique 1+2', ext: P, year: 2025, fid: '1g5H2rbSLgQIyj3okTCRlD5hXT6QhiBUa' },
        { title: 'Correction Acoustique 2', ext: P, year: 2025, fid: '1JlmScBlK2M_HDwldnY4s-bPu_w9KYm6d' },
        { title: 'Correction Mécanique de fluides 2', ext: P, year: 2025, fid: '1otg81h4kagCpz_2Ku_GEmZIhHc2cweg3' },
        { title: 'Correction mécanique des fluides 1', ext: P, year: 2025, fid: '1p_9eNv9noPEqqrcDFftG90u3S3svPggm' },
        { title: 'Correction mécanique des fluides 2', ext: P, year: 2025, fid: '1wQyNadeDeLTNLK3mipQ3NkHJoLCbKZqO' },
        { title: 'Correction Mécaniques de fluides 1', ext: P, year: 2025, fid: '1lO4qu1fsnY_fZ3bPKOwnjrz9n7Lnhcw1' },
        { title: 'Correction Optique 1', ext: P, year: 2025, fid: '1G7Zto-QbfAbWkW_lI0m1eY6_hwRE6dD8' },
        { title: 'Correction optique 2', ext: P, year: 2025, fid: '1hm9YHnqI6q7VOkfip3sRPIwUbyn9ZHcS' },
        { title: 'Correction phénomène de surface', ext: P, year: 2025, fid: '1LuZ7mCF8MtwRistzJH2z9D84R5hGA1O-' },
        { title: 'Correction Phénomènes de surface', ext: P, year: 2025, fid: '1k0L1DGJXYEerA0SBByUEuxJJxfGbJsIS' },
        { title: 'Correction Radioactivité 1', ext: P, year: 2025, fid: '1vovof_i9EVnx1rpGZvtUhXkYAa-2sYOU' },
        { title: 'Correction Radioactivité 2', ext: P, year: 2025, fid: '1JyejL8XoEv_G2s44hMwNvA3OqCM7hVpi' },
        { title: 'Correction TD radioactivité 2', ext: P, year: 2025, fid: '1XE_hWTSxqv5_XP79x8ztqiUEJ6Zlx209' },
        { title: 'Correction TD1 radio', ext: P, year: 2025, fid: '1rux6zFm2Q7v99U5d6Nu7onMyoha5wFxV' },
        { title: 'Corrigé TD optique2', ext: P, year: 2023, fid: '11V3jvaewu-nJoRWNuk4_Nr0pxuDa5rES' },
        { title: 'Fascicule TD Biophysique', ext: P, year: 2025, fid: '1wo9dz92U65HnthKUQL0xz4JdUAVoGtCc' },
        { title: 'TD acoustique', ext: P, year: 2025, fid: '19hKulvy3rbO4cdSQDgHD9XvkI3cLHl1F' },
        { title: 'TD acoustique 1', ext: P, year: 2025, fid: '1Z-lH_kbx7rCelsgcusOUVbWFVt4OrMSD' },
        { title: 'Td phenomène surface', ext: P, year: 2020, fid: '1vIDEIP6Zzno7DZVBXEy4VBLiOOcBn9mV' },
        { title: 'Correction acoustique 1+2', ext: P, mb: '0.8', year: 2024, fid: '1I4Oos5RgHH1s4GVj8XBQnervoVq-oGqp' },
        { title: 'Correction mécanique des fluides 1', ext: P, mb: '0.9', year: 2024, fid: '1t0nNzBHA7TI5JtE9hRTj_ND-P4iaLnIT' },
        { title: 'Correction mécanique des fluides 2', ext: P, mb: '0.6', year: 2024, fid: '1zVtKAuXY-owksiTla7JO8ePYlOeBdY0L' },
        { title: 'Correction Mécaniques de fluides 1', ext: P, mb: '0.3', year: 2024, fid: '1JeRZiWxYPoIttcX49nWA3Lsxe7KiEa8j' },
        { title: 'Correction optique 2', ext: P, mb: '1.2', year: 2024, fid: '1mZF2JYeaByo6A4MglGbpIy-pMDiMpfNl' },
        { title: 'Correction phénomène de surface', ext: P, mb: '0.7', year: 2024, fid: '1GHaUZqeDWxrQYJ649HyvGUmoVxb9fBU3' },
        { title: 'Correction TD radioactivité 2', ext: P, mb: '0.9', year: 2024, fid: '1ZmSC_Cwpz1hooKs9P5l3tufy6ggqglAI' },
        { title: 'Correction TD1 radio', ext: P, mb: '1.1', year: 2024, fid: '1WaDwNo77t5mg3h25GTj6iZBtz3PjzOio' },
        { title: 'Corrigé TD optique2', ext: P, mb: '4.2', year: 2023, fid: '1MKSBAbueLJet7xbrf8BX0Y13aike7meo' },
        { title: 'TD acoustique', ext: P, mb: '0.8', year: 2024, fid: '11MqaW83SiYauvPRZAAV-gvT4VKuuNucR' },
        { title: 'TD acoustique 1', ext: P, mb: '1.2', year: 2024, fid: '1AC9PqvgniX5qgdF6G4WOx6u3uZ2yYxwB' },
        { title: 'Td phenomène surface', ext: P, mb: '0.2', year: 2020, fid: '1ZcjxdrIyMM8HYI5Gf0ZMRuFQBcCc9XFU' },
        { title: 'Correction acoustique 2', ext: P, mb: '0.8', year: 2023, fid: '1VUulb6BKpM_IyLGBdV2yrrnc_Qi66tAw' },
        { title: 'Correction radioactivité 1', ext: P, mb: '0.5', year: 2023, fid: '1Q9yoFEc_dezPN2jv5Zx0-7Rq2Zfaj2Av' },
        { title: 'Correction radioactivité 2', ext: P, mb: '0.5', year: 2023, fid: '1ZwEQxUtpJpaoaNy5RGfUlYfWc4pWX1Q3' },
        { title: 'Correction radiobiologie', ext: P, mb: '0.4', year: 2023, fid: '1b8k1y5nWAJG0bPSmXU0ABihJ2pATxETx' },
        { title: 'Correction Acoustique 1', ext: P, mb: '0.2', year: 2022, fid: '1sUiBGvN35XoppNgRSEA1Wj2L4C1k9VcV' },
        { title: 'Correction Acoustique 2', ext: P, mb: '0.2', year: 2022, fid: '1zJHs1AWi3hVbgynOzE66UWqS69o2AUmO' },
        { title: 'Correction Mécanique de fluides 2', ext: P, mb: '0.3', year: 2022, fid: '1F49Zd5qht75zC9SvMQqUsZwfa86nrG_U' },
        { title: 'Correction Optique 1', ext: P, mb: '0.2', year: 2022, fid: '1pyNE_-FErEUiKrUVu3OOux_jCdl1SVKU' },
        { title: 'Correction Phénomènes de surface', ext: P, mb: '0.1', year: 2022, fid: '1sfwELEOH9o_5_Pl8CT7IyYVI9CnjZTnX' },
        { title: 'Correction Radioactivité 1', ext: P, mb: '0.0', year: 2022, fid: '1Opb4TAbmfh7jTEwSsLb39yJE7AEwfg9V' },
        { title: 'Correction Radioactivité 2', ext: P, mb: '0.2', year: 2022, fid: '19u2q0CTf2PIzsipIsBu8UaY8wAjDb2T1' },
        { title: 'Fascicule TD Biophysique', ext: P, mb: '1.1', year: 2022, fid: '1j8jgGlH3ERMe5toA_t365Wc8CvwyKC8w' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Fasicule TP mise à jour 2021PDF 221009 171448-1', ext: P, mb: '1.2', year: 2021, fid: '1W1MDt-DS-fvSI_uonUSAzG3qt5Jd0JII' },
      ],
    },
  ],
};

export const TN_PCEP2_BOTANIQUE = {
  id: 'tn-pcep2-botanique', promo: 'pcep2', semester: 'S1',
  name: 'BOTANIQUE ET CRYPTOGAMIE PHARMACEUTIQUE', icon: 'micro', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Botanique et cryptogamie pharmaceutique',
      lectures: [
        { n: 1, title: '(Partie A)', ext: P, year: 2022, fid: '1PUsS7ccA8LBb7XZhwZ26agApPIZLBa3p' },
        { n: 2, title: '(Partie B)', ext: P, year: 2023, fid: '1No8QKQFKcut0m-4YQ_cm5URllk0h52UT' },
        { n: 3, title: 'BOTA M5-Support de cours Botanique et Cryptogamie Pharmaceutiques 2ème année', ext: P, mb: '18.2', year: 2024, fid: '12uUvfokFGFfCvQItnfweXGZe_VLoieJW' },
        { n: 4, title: 'Cryptogamie pour dépot', ext: P, mb: '12.7', year: 2024, fid: '1eoIrjW8fB6jRWcLHrqmoC9Qeg9-ezFED' },
        { n: 5, title: 'Cryptogamie101117 power point', ext: P, mb: '10.7', year: 2024, fid: '1oSwCWM74tMDwbgr4i5RM2H0yS6zVHOJ6' },
        { n: 6, title: 'Diapos', ext: P, mb: '19.5', year: 2024, fid: '1IZvzSbdxAGLIXMpOznEsnCdXykLcYwoO' },
        { n: 7, title: 'Finall', ext: P, mb: '9.9', year: 2024, fid: '1L_j-nq3gAgyR0QidabCfF7BGImoMAqi7' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'BOTA-M5 Support de cours botanique 2024-2025 approuvé 1 — 2024-2025', ext: P, mb: '18.4', year: 2025, fid: '10_9g5F6W4fcudZKUKFCcUpxap4DP8Wsu' },
        { title: 'Cours — 2022-2023', prof: 'Pr Dhahbia Khiari', ext: P, mb: '9.8', year: 2023, fid: '1IWwF73s2bwpTMYvKcpGrSf-WNeQP3wer' },
        { title: 'La Tige des Angiospermesfigures — 2021-2022', prof: 'Pr Dhahbia Khiari', ext: P, mb: '0.6', year: 2022, fid: '1_FBC7bOY0kpbAui10YWd1AMyjfurm67U' },
        { title: 'La Racine des Angiospermes — 2021-2022', prof: 'Pr Dhahbia Khiari', ext: P, mb: '0.1', year: 2022, fid: '11ZETvtKyr47_Y_DcKHYjGAfyRn59YAgp' },
        { title: 'La Feuille des Angiospermes — 2021-2022', prof: 'Pr Dhahbia Khiari', ext: P, mb: '0.1', year: 2022, fid: '1o3otek5EyqgBFYJacJj_WndZIS9Xme9P' },
        { title: 'CH1les tissus figures — 2021-2022', prof: 'Pr Dhahbia Khiari', ext: P, mb: '1.2', year: 2022, fid: '17j9EORqt8aoZ1RmSMo--7taWksTAlTZU' },
        { title: 'Cryptogamie Pharmaceutique — 2021-2022', prof: 'Dr Amer Issi', ext: P, mb: '1.5', year: 2021, fid: '10krWE73mice0zAplQKUh6fdRsXDnIEiO' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Feuille', ext: P, mb: '4.8', year: 2025, fid: '16XQ7D0PK7Zk6liOOe4h9ddsWhN9j0Kuh' },
        { title: 'Racine', ext: P, mb: '5.1', year: 2025, fid: '1e0p6IjBbhX9qrIUEKJqxrtU7V1jFGeis' },
        { title: 'Resumé dhahbiya', ext: P, mb: '14.9', year: 2025, fid: '1BUd4x4uAzfjWh61ZFvmIg9U9Smei0eGq' },
        { title: 'Tige', ext: P, mb: '6.4', year: 2025, fid: '1IDFPKh-K7NZhsgvxVGQ9zAy7BMufcp2C' },
        { title: 'Tissus-végétaux', ext: P, mb: '10.0', year: 2025, fid: '18lygpLDxmnd4JQp3nFJ5EgLA2Kl3kLAt' },
        { title: 'Angio+gymno', ext: P, mb: '5.8', year: 2024, fid: '1zIS1W9zuL11hJ__fK_QngHAn9C3z95WJ' },
        { title: 'Bryophytes', ext: P, mb: '0.6', year: 2024, fid: '14blsMzNW_y9W9l2rDX15g1nw35_psVzi' },
        { title: 'Partie B', ext: P, mb: '22.4', year: 2024, fid: '15d5hFklKy7jRZBnNzhPuxS6Uk9rCR8pa' },
        { title: 'Resume botanique', ext: P, mb: '4.3', year: 2024, fid: '1yTABeoC6Q0pu77A0cBhG2YMiU6pB6s13' },
        { title: 'Resumé mr Ridha', ext: P, mb: '4.5', year: 2024, fid: '17AVN1G1oG3MDPglQ14rTQhVzqNpRJvP9' },
        { title: 'Résume partie Mme', ext: P, mb: '14.9', year: 2024, fid: '1JEdPSSAtclN32X9a7ODJXJWeMXD12KHH' },
        { title: 'Taxonomie', ext: P, mb: '22.4', year: 2024, fid: '1neQoL4K8TdsfD2NP-_BhTWRZBp7Hb9EE' },
        { title: 'Champignons', ext: P, mb: '1.1', year: 2022, fid: '1ldNdEx23lNck5WWV6NDiQQnOGmxkAxfY' },
        { title: 'Diagrammes et formules florales', ext: P, mb: '0.6', year: 2022, fid: '1QJibozKOuu3sgJTWDiXoqXeP1u20h02C' },
        { title: 'Fiches Familles Angiospermes regroupées', ext: P, mb: '1.8', year: 2022, fid: '1Qkl5Ufe5qgtWjVnPzryc6LfW-gTY1zdx' },
        { title: 'Résumé taxonomie', ext: P, mb: '0.5', year: 2022, fid: '1lb9OAYlspJIzzk44i9I2oPJ9TsX2gHtm' },
        { title: 'Taxonomie', ext: P, mb: '0.4', year: 2022, fid: '16W2-yGE8eN2flnZHiTSFut2z0x2qFBUv' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Botanique', ext: P, mb: '9.9', year: 2025, fid: '1luhRrynvDYPBDwlALkdfw6XzhJnbnARD' },
        { title: 'Correction Examen Botanique 2ère année Session Janvier', ext: P, mb: '2.2', year: 2025, fid: '1TTLswMPA7qoZeFwKHET9Nyc6-ofvH4Bb' },
        { title: 'Principal 2026 Botanique', ext: P, mb: '5.3', year: 2026, fid: '1MCR66TdQTw8oa752-sacRM3ZmabMTB7o' },
        { title: 'Rattrapage 2026 Botanique', ext: P, mb: '6.5', year: 2026, fid: '1MXDu3jrgGNojICCnzN0zziqQTabGwv4E' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'TD Bot. - Crpt. Pharm- A-Approuvé', ext: P, year: 2025, fid: '1nDX0qQo-ZlL6PWQhc9auzwIRCi82EO2D' },
        { title: 'TD mr ameur', ext: P, mb: '1.4', year: 2025, fid: '1qMmp-w53-E8TCTPGMKk3FmqXhFLrAe5S' },
        { title: 'Correction TD4 botanique', ext: P, mb: '1.2', year: 2024, fid: '1i3EbmM2MIP2CQT9SH3Q0zazokKk2csur' },
        { title: 'PETIT LEXIQUE DE BOTANIQUE Station Alpine Joseph Fourier', ext: P, mb: '5.1', year: 2024, fid: '1XUASI3JGQF9l9octYKMTvteEJFC4P7d0' },
        { title: 'Séance n°2TD', ext: P, mb: '2.6', year: 2024, fid: '1_3CphiXs5zEaHQgLex7bG1MKp0eXKyQF' },
        { title: 'TD Bot. - Crpt. Pharm- A-Approuvé', ext: P, mb: '1.4', year: 2024, fid: '1IbnA6y2vBnE6GCZVR3SM59Gdb2KQSMTm' },
        { title: 'TD mr ameur', ext: P, year: 2024, fid: '1QbPGFWlRZo_v-N2nVbhvw7caF4rHRZM1' },
        { title: 'TD Botanique, S1', ext: P, mb: '1.3', year: 2023, fid: '1FIQAHmBJqSy0ADiBzy51NLEzx2kKjs4V' },
        { title: 'Botanique ex', ext: P, mb: '0.1', year: 2022, fid: '1qmMAvdI7x3fQeKQHPAjfAfY1eTCQtul_' },
        { title: 'Fascicule TD Cryptogamie', ext: P, mb: '2.7', year: 2021, fid: '1AZKVXxxtgQgTUlkymcQZK1lkc1OpEu9z' },
        { title: 'TD Cryptogamie', ext: P, mb: '1.4', year: 2022, fid: '1BPFSsHifhvaOw9IrWBDJsSVN0DOrS-ed' },
        { title: 'TD MR Ridha', ext: P, mb: '2.4', year: 2022, fid: '1lNRYs9DYM7NAV4DUAXqG73v83Wl8maiI' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Bota CR1', ext: P, mb: '0.8', year: 2024, fid: '1O7AoN7U1sMKw9KnXmxq8aUZS6YFDccEV' },
        { title: 'Bota CR2', ext: P, mb: '1.1', year: 2024, fid: '1ObjHqK1grrp8UanZjMgm1gaH67_jz4cD' },
        { title: 'Bota CR3', ext: P, mb: '0.8', year: 2024, fid: '1G7LCcxYkzsZ5fRMgM7x3c8eQ1izknSQD' },
        { title: 'Bota CR4', ext: P, mb: '0.6', year: 2024, fid: '1qqa4ZU76Yz_XT720kwqlN-BOmZWEBumt' },
        { title: 'Botanique merged', ext: P, mb: '21.7', year: 2024, fid: '11EgfDhhGmOlVTotKyPiJw9h0MGzeEzCM' },
        { title: 'Observations', ext: P, mb: '33.0', year: 2024, fid: '1q913anaHk8csBaMOkPA_bFNO5DFvDHCn' },
        { title: 'Présentation sortie botanique', ext: X, mb: '10.1', year: 2024, fid: '1k8k8NPDNpN5uCPsC3sh9UpwHe0Q1Zonu' },
        { title: 'TP Botanique CR1', ext: P, mb: '0.7', year: 2024, fid: '1BguPnud3oegH46yTuWau2X52Tm7alt35' },
        { title: 'TP Botanique CR2', ext: P, mb: '0.6', year: 2024, fid: '1IUh8aEWbZypPj5bsBMBC9H-cFCcKLTDm' },
        { title: 'TP Botanique CR3', ext: P, mb: '1.0', year: 2024, fid: '1a5Fe-YfggIOnWP6aMQN2R0AlQLbXhVuI' },
        { title: 'TP Botanique CR4', ext: P, mb: '1.6', year: 2024, fid: '1UwgzAR4EW5viKBjB9I34zthzRnuJpEtR' },
        { title: 'TP 1 botanique', ext: P, mb: '1.5', year: 2023, fid: '1bKfP5ENHPLqWtVo7ysT22suNuv8ooxs1' },
        { title: 'Tp 2 botanique', ext: P, mb: '1.2', year: 2023, fid: '1Dc3-bi_RoLV_BGdtUsdJu-9eMbozP1Eo' },
        { title: 'Tp 3 botanique', ext: P, mb: '1.6', year: 2023, fid: '1fIFDU78og0YzYIJPe2ipjGf9Zb-nn-gt' },
      ],
    },
  ],
};

export const TN_PCEP2_CHIMIE_ANALYTIQUE = {
  id: 'tn-pcep2-chimie-analytique', promo: 'pcep2', semester: 'S1',
  name: 'CHIMIE ANALYTIQUE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Chimie analytique',
      lectures: [
        { n: 1, title: 'CH.ANAL-M4- cours Chimie analytique 2A-S1-approuvé', ext: P, mb: '18.4', year: 2024, fid: '1Pwvrgu895B82SQFcmxPccbCrp5Ggmh9a' },
        { n: 2, title: 'CH introduction de chimie de solutions', prof: 'Pr Zribi Kaouthar', ext: P, mb: '3.7', year: 2024, fid: '12lzEiORmBdZvdjYNEZDwymp1xrmTqTzC' },
        { n: 3, title: 'CH Oxydoréduction partie 1', prof: 'Dr Ben Said Azza', ext: P, mb: '1.5', year: 2024, fid: '12e4PQnlXQKvLhd6OM5WntfJhx7hNlWTQ' },
        { n: 4, title: 'CH protométrie en milieu aqueux', prof: 'Pr Oueslati Hanen', ext: P, mb: '0.9', year: 2024, fid: '12hzYDd8_fAEFQ96IRNHnTdQxqrsXihR1',
          versions: [
            { title: 'CH Protométrie en milieu non aqueux', prof: 'Dr Ben Cheikh Med HEdi', ext: P, mb: '0.2', year: 2024, fid: '12VL1BlzVOBrgS8q3hfdasPRFcovf3sN7' },
          ] },
        { n: 5, title: 'CH Réactions de précipitation', prof: 'Dr Ben Cheikh Med HEdi', ext: P, mb: '1.9', year: 2024, fid: '12XUEkTtlfHPE1lg6Rj5OpVFAz_Rkp9tr' },
        { n: 6, title: 'Coulométrie et ampérométrie', prof: 'Pr Touati Mouna', ext: P, year: 2023, fid: '1dBc8O_NZtyjNjZqmGPXJacrgHinKtMaE' },
        { n: 7, title: 'Electrolyse et courbes courant-potentiel', prof: 'Pr Touati Mouna', ext: P, year: 2023, fid: '1x2V_mneXFS1YlHoslAvAwoJ6TNUS1MPg' },
        { n: 8, title: 'Polarographie-voltampérométrie', prof: 'Pr Touati Mouna', ext: P, year: 2023, fid: '1-efaTxu5DvB89_l0cB6jnmB88WKGns5_' },
        { n: 9, title: 'Potentiométrie', prof: 'Pr Touati Mouna', ext: X, year: 2023, fid: '1--IXWL3hjGzkiQU8iCmSa7O46lCpQhr1',
          versions: [
            { title: 'Potentiométrie', prof: 'Pr Touati Mouna', ext: X, mb: '4.7', year: 2023, fid: '1fxlkGnbn8swoK5olLTCKdzwAwbybVVll' },
          ] },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Chimie analytique — 2024-2025', ext: P, year: 2025, fid: '1CNosu01wkbvJ03rOQM3p6L5WdgXxYG5E' },
        { title: 'Ch analytique — 2022-2023', ext: P, mb: '14.3', year: 2023, fid: '10HXnAUzI2-MNhWVeK1SEIdOl6hKR-kDd' },
        { title: 'CH Oxydoréduction partie 2 — 2021-2022', prof: 'Dr Ben Said Azza', ext: P, mb: '18.0', year: 2022, fid: '1AyReYxo_e2kQKj3tr_z7YMxUe3TXi35r' },
        { title: 'CH Oxydoréduction partie 3 — 2021-2022', prof: 'Dr Ben Said Azza', ext: P, mb: '10.2', year: 2022, fid: '1AiQNR5vtrbXlr7m5ycnUBUNakECFfX6C' },
        { title: 'CH Réactions de complexation — 2021-2022', prof: 'Pr Oueslati Hanen', ext: P, mb: '9.7', year: 2022, fid: '1nruGHtVQGKuvHnJU5W8963M-7Aa4JOw5' },
        { title: 'Chapitre I Généralités — 2021-2022', prof: 'Pr Touati Mouna_', ext: P, mb: '2.1', year: 2022, fid: '1v0-wNGp3M5E7CKqRqNCX-mUskfdGBCxm' },
        { title: 'Chapitre II Potentiométrie — 2021-2022', prof: 'Pr Touati Mouna_', ext: P, mb: '1.3', year: 2022, fid: '1VgEZLcWL37Ru1a4qXxznktzOf71-A7Rx' },
        { title: 'CHAPITRE III Courbe intensite-potentiel — 2021-2022', prof: 'Pr Touati Mouna_', ext: P, mb: '0.6', year: 2022, fid: '1DQelIwn0mybcXUsNUD2Tdod7CEGdTZLJ' },
        { title: 'Chapitre IV Polarographie-voltampérométrie — 2021-2022', prof: 'Pr Touati Mouna_', ext: P, mb: '0.5', year: 2022, fid: '1noA_hjWAu4L3edkuY_qKgRQv-fXegB_o' },
        { title: 'CHAPITRE V Coulométrie — 2021-2022', prof: 'Pr Touati Mouna_', ext: P, mb: '0.5', year: 2022, fid: '1FZdfFMyc7PGafzDOuyObEEpZbom9aHhl' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Iodo iodimetrie 1', ext: P, year: 2025, fid: '1-02NR9JEUz3pY3YvXy-djwpg8-7WpoX_' },
        { title: 'Résumé analytique', ext: P, year: 2025, fid: '1-4LulZfQ5hIC1ojv4-7Py2c3u63I5f15' },
        { title: 'Resume Chromimetrie 1', ext: P, year: 2025, fid: '1-3XIcMiahR8a7qpCcxmEaFrRP7bSuxC3' },
        { title: 'Resume Manganimetrie 1', ext: P, year: 2025, fid: '1Yd5kXm61AWOoTgBF3mVVVzS4Dau_CAHg' },
        { title: 'Resume protometrie', ext: P, year: 2025, fid: '1-1KZ7dGmnH3HDVizmiLl9YXgYsWbiNiI' },
        { title: 'Résumé analytique', ext: P, mb: '23.1', year: 2024, fid: '1cEr08c2egtNIGn1Zye8n1R5A2TRiaS-p' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Chimie analytique', ext: P, mb: '17.7', year: 2025, fid: '1HBl1f0hD0gyrZMBKUHdwW_I3z3KLQUo2' },
        { title: 'Chimie analytique s1', ext: P, mb: '0.7', year: 2026, fid: '1SBZXa5JsJYgbowyRwgLKE3DmmMan8JVy' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Correction TD électrolyse', ext: P, mb: '0.8', year: 2025, fid: '1XP93v-wPHf1GHsg6TxBOoVXqIXdW2x0_' },
        { title: 'Correction TD potentiométrie', ext: P, mb: '0.7', year: 2025, fid: '1sdyV2fj86nnhyvNBJ5-Xt_piA0m0zkRb' },
        { title: 'Série 1', ext: P, mb: '0.9', year: 2025, fid: '113-5rlkVLeIfMG09tbYbdrXC8XZEHGFd' },
        { title: 'Serie 2 analytique', ext: P, year: 2025, fid: '1fiBJpazt9GG78bw4nBHPsQ1IAgwe7eRk' },
        { title: 'Serie 3 analytique', ext: P, mb: '1.2', year: 2025, fid: '1Mv3A4mrlPaDqj_ayb2zutmQMXg-iKsKb' },
        { title: 'Serie 4 analytique', ext: P, year: 2025, fid: '1xvXF3KcfPhrqsdYfh_rxRw5WZXjjoDeG' },
        { title: 'Correction TD potentiométrie', ext: P, mb: '0.6', year: 2023, fid: '1hpHetguIOyk2QLpdBQ3c0bDPP9EtLDbQ' },
        { title: 'Correction TD1', ext: P, mb: '0.1', year: 2024, fid: '12KXFfSKDr5afzGi7iaJuIMexSfrJkIcf' },
        { title: 'Fascicule TD Chimie Analytique', ext: P, mb: '0.6', year: 2024, fid: '1FnRiJHenkPElVD1Ng25IuU26_XLqwi3g' },
        { title: 'Potentio TD 8', ext: P, mb: '1.6', year: 2024, fid: '1StxBMJ8KieAxG8bFEQ5gDjFbJTrGimrn' },
        { title: 'Serie 1 analytique', ext: P, mb: '0.5', year: 2024, fid: '1OdxbExskt-iF8S0qwLDLAwHDeq8-MgMf' },
        { title: 'Serie 2 analytique', ext: P, mb: '1.6', year: 2024, fid: '1ocYUBzqOfT4ov_jSBs-Xe9PBJgS5PJua' },
        { title: 'Serie 4 analytique', ext: P, mb: '1.3', year: 2024, fid: '1wRHmlcaxv3_b8Sy7d4N-dcUgEn9ukm9u' },
        { title: 'Serie 5 analytique', ext: P, mb: '1.4', year: 2024, fid: '1N-e20fJA8Vl9QOp5tSDhD4UgfqIIEHZn' },
        { title: 'Serie 6 analytique', ext: P, mb: '1.2', year: 2024, fid: '1o-cMjE_Cfxqmo8ZAnSmoXXA-27qQsbFu' },
        { title: 'Serie 7 analytique', ext: P, mb: '0.9', year: 2024, fid: '1GNp205BO_iS9Fpfdn0ewcwicAl21VZrs' },
        { title: 'Serie 8 analytique', ext: P, mb: '1.3', year: 2024, fid: '1MdjyA9OOjBHBltLs9v3vcAvHR6cTSp_b' },
        { title: 'TD 9 Correction', ext: P, mb: '0.6', year: 2022, fid: '1hUjA6s0y7lNquWuQxm_HJ1bN-3xpft9r' },
        { title: 'TD7 potentio', ext: P, mb: '1.1', year: 2024, fid: '19BoIED9S8gkyNAZNA0vvIME7D7RTJRTV' },
        { title: 'Fascicule td analytique', ext: P, mb: '23.8', year: 2023, fid: '1tyCYXF5spz4Ts9CdE80pXgM8zaWAUhe9' },
        { title: 'TD 10 Correction', ext: P, mb: '0.7', year: 2022, fid: '1WL1FnSWSzANPuFC601jHJ8gJWugexx0z' },
        { title: 'Correction TD 9 (électrolyse Ex1)', ext: P, mb: '0.2', year: 2022, fid: '1Dr3LuW4CwAeuYJ1zQaXpQ9gVTpAOuL8g' },
        { title: 'Correction TD2', ext: P, mb: '0.1', year: 2022, fid: '1Vy48WX_2jsKPxvX27I1jvLi3mdGJMRRj' },
        { title: 'Correction TD3', ext: P, mb: '0.5', year: 2022, fid: '13UXuCDtjcyf0cm8I_q0_nHs8_XEcPjjq' },
        { title: 'Correction TD4', ext: P, mb: '0.7', year: 2022, fid: '1UdpczJKTC3xjKbKjUmf5WIWvulDE7LTz' },
        { title: 'Correction TD5', ext: P, mb: '0.1', year: 2022, fid: '1T31itiDcI3KNeh6OZIW7isWyeOQuqE7M' },
        { title: 'Correction TD6', ext: P, mb: '0.2', year: 2022, fid: '1gO_Goz33xQrKcisekeTcJvu73pmSRbxe' },
        { title: 'Correction TD7', ext: P, mb: '0.3', year: 2022, fid: '1uPzyP9kvGWckfQGjunIl60qUE97a7pe-' },
        { title: 'Correction TD8', ext: P, mb: '0.2', year: 2022, fid: '1dyYHiMi1ICoKlec-u5XRuOxIrKG4855C' },
        { title: 'Correction TD9', ext: P, mb: '0.1', year: 2022, fid: '1r0WugsQ7UsLaPiT3eb7bA5XaAEsyH8kh' },
        { title: 'Série N 6 et 7 (complexation)', ext: P, mb: '0.2', year: 2022, fid: '1iewOGwracE3Xr_BRREBDNhrayD-z5nLC' },
        { title: 'TD 8 Correction (potentiométrie)', ext: P, mb: '0.5', year: 2022, fid: '1HyhYgYo2WFSGK6Pq0cSi5W0t0troYBA2' },
        { title: 'TD 9 Correction (électrolyse)', ext: P, mb: '0.6', year: 2022, fid: '142OFiP7LFJcMjDeOfgGVJhGHZGfeuzLW' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Manip 2', ext: P, mb: '0.6', year: 2024, fid: '1tp9ojanopBBj4XN-0xZeScusUjAHtjfO' },
        { title: 'Manip 3', ext: P, mb: '0.5', year: 2024, fid: '1GSgOHi_X2zBojI2JHBmJwmJveUooJfX3' },
        { title: 'Manip 4', ext: P, mb: '1.4', year: 2024, fid: '1x3Q5fcwEFsH7nEE-kclRXJ-Jv55NjdLV' },
        { title: 'Manip 5', ext: P, mb: '0.7', year: 2024, fid: '1FcFy191Hfq1fBDRqNVWHT4tnBm1x_R-E' },
        { title: 'Manip 6', ext: P, mb: '1.2', year: 2024, fid: '1pOpj7aBfrwGRSkMFGcQCmwyjoApHEhW8' },
        { title: 'Manip 8', ext: P, mb: '2.8', year: 2024, fid: '1I23UAbUZDZguiIwGaScWsLGixTDYzagY' },
        { title: 'Manip 9', ext: P, mb: '0.3', year: 2024, fid: '1hHBGS3sNP40tBdGgmqpdQCnTI2AvwSN-' },
        { title: 'Tp 6-1', ext: P, mb: '0.5', year: 2024, fid: '1Gw1D5n89zweWqPU_GdiUy1omFYDGa1JG' },
        { title: 'Tp 7', ext: P, mb: '5.2', year: 2024, fid: '1r6woovIHE0pNOg5SjOpDKPTUNKGznR7M' },
        { title: 'Tp 8', ext: P, year: 2024, fid: '1-7-xe5B93yXT-LpGfnIxg4Bi9YM9s2Pf' },
      ],
    },
  ],
};

export const TN_PCEP2_SEMIOLOGIE_EPIDEMIOLOGIE = {
  id: 'tn-pcep2-semiologie-epidemiologie', promo: 'pcep2', semester: 'S1',
  name: 'SÉMIOLOGIE ET ÉPIDÉMIOLOGIE', icon: 'pulse', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Sémiologie',
      lectures: [
        { n: 1, title: 'SEMIO.EPI-M1 Support de cours semio epidemio', ext: P, mb: '11.6', year: 2025, fid: '1eegvQHebbK7W4win-CCZvS9xO380sNiH',
          versions: [
            { title: 'Semio et epidemio', ext: P, year: 2025, fid: '1HpnapfZzhAGqwoGW2QAlh-LLVh-097Ba' },
          ] },
        { n: 2, title: 'Semiologie', ext: P, year: 2025, fid: '1wx7ODnNMpmjttgOWkS5K3z39H8uTanz5',
          versions: [
            { title: 'Semiologie 1 et 2 pr klii', ext: P, year: 2025, fid: '1eIk1I4H1aZTOCjB4EmsGaABQF-4ZgAMe' },
          ] },
      ],
    },
    {
      title: 'Épidémiologie',
      lectures: [
        { n: 3, title: 'Les-enq-descriptives', ext: P, year: 2023, fid: '1TebB4YPqhteRkQ44Ca7-F6V8EAHDFzBF' },
        { n: 4, title: 'Cas-témoins-1', ext: P, year: 2025, fid: '1-52SATwmHq5hw9CXxNigwA-4IqY1EDk9' },
        { n: 5, title: 'Études-expérimentales-manel-6-dec', ext: P, year: 2023, fid: '1-NgEUhfVn7KgVc7CdvvTs_KWL5C2zeyi' },
        { n: 6, title: 'Chapitre 3Les enquêtes de cohorte COURS', ext: P, year: 2025, fid: '1-8HGSfFCTqDoUDTepDY59KL669WTcSu6' },
        { n: 7, title: 'Les études diagnostiques pharamcie', ext: P, year: 2025, fid: '1-NhXppZQs3an7lIKQqx9j3GMT2FuaH9G' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Types d’Etude en Epidémiologie — 2021-2022', ext: P, mb: '0.3', year: 2021, fid: '1w-ULjKSoc6UI13JXATvmMyYQsst880Wx' },
        { title: 'Enquêtes Descriptives — 2021-2022', ext: P, mb: '1.0', year: 2021, fid: '1Q_GGB0G2Ae6XvfodusIOsw8_QhsEJFsI' },
        { title: 'Epidémiologie analytique — 2021-2022', ext: P, mb: '1.2', year: 2022, fid: '1-aUFnQ_1YmhgObPm4tp8Y68HETDEKQHX' },
        { title: 'Etudes Dagnostiques — 2021-2022', ext: P, mb: '1.7', year: 2021, fid: '1r9YyeXqUV9q_mQs7u3Fo2ZrBytoSimfi' },
        { title: 'Études expérimentales — 2021-2022', ext: P, mb: '1.2', year: 2022, fid: '1NcM3Zbi4pEdwvtEQgC56oewGibggbksm' },
        { title: 'Chp 1,2,3 semiologie — 2021-2022', ext: P, mb: '3.8', year: 2022, fid: '19xnpgSBkkYjIVxREqy-yS0M-4xlBm6Ds' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Epidèmio-résumé', ext: P, mb: '3.9', year: 2025, fid: '1vR5Y1BwknSe_SOz2QqZ12sEN8JcCDkqK' },
        { title: 'QE', ext: P, mb: '0.0', year: 2025, fid: '1k-twexQb83zHjxC_5goZgQvL9HkgVNAP' },
        { title: 'Qe semio rectifié', ext: P, mb: '0.2', year: 2025, fid: '1XoAF5v_JJUXld_Jb-Z5SgglPHTITDqKg' },
        { title: 'QE1', ext: P, mb: '0.0', year: 2025, fid: '1WunSFuxP1hVJl62s5UCYafwOFfO-rDNn' },
        { title: 'QE2', ext: P, mb: '0.0', year: 2025, fid: '148YVyXR_PfgOgYX5G4pSLWjwOHaovPml' },
        { title: 'QE3', ext: P, mb: '0.0', year: 2025, fid: '1FRYeRQsHXJfXa0uB3kaRntgRxh4z4yRD' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale epidémio sémio', ext: P, mb: '16.1', year: 2027, fid: '1cUO807DF-ySqa8bhJni-lpAXsuDW4fGb' },
        { title: 'Examen abdominal', ext: P, year: 2025, fid: '1_V2GrdpkBs2n6qFBirv_FbFc735nJQsK' },
        { title: 'Chp4 Examen cardiovasculaire', ext: P, year: 2025, fid: '1aZ0TB1CY_mxDhabNkp03GjWbBtd8lKNv' },
        { title: 'Chp5 Examen respiratoire', ext: P, year: 2025, fid: '1QyLH8DG-RP9d_5lFjLR0wspSXZWMU_5z' },
        { title: 'Corr semio', ext: P, mb: '0.0', year: 2025, fid: '1o9MAqjIWi3GchOssKXjxyhRqmpyuBMGL' },
        { title: 'Correction Epreuve Epidémiologie Sémiologie Session Janvier', ext: P, mb: '1.2', year: 2025, fid: '1CT7rkuwgsE-OQpEk_-p88IMmL29wRc8M' },
        { title: 'Semio et epidemio', ext: P, mb: '7.7', year: 2025, fid: '1t3w8MpyQ6SYwoepzKfKxzlu7gyy8Oub4' },
        { title: 'Examen abdominal', ext: P, mb: '2.3', year: 2024, fid: '1Fb_nthh9XmIZY5xnK1OMAzK5gBjVo3mv' },
        { title: 'Chp4 Examen cardiovasculaire', ext: P, mb: '2.2', year: 2024, fid: '1LTk7k84W08r8EtqSXUPqswKmxnsyjgnX' },
        { title: 'Chp5 Examen respiratoire', ext: P, mb: '2.5', year: 2024, fid: '1ogFRHfZ5edxzyN8z1S8jfvXhwPNAqeoZ' },
        { title: 'Chp6 Examen abdominal', ext: P, mb: '2.3', year: 2022, fid: '1enrPvxTeCC7IWBJsX-wofv_S8pGhLsey' },
      ],
    },
  ],
};

export const TN_PCEP2_INFORMATIQUE = {
  id: 'tn-pcep2-informatique', promo: 'pcep2', semester: 'S1',
  name: 'INFORMATIQUE (C2N)', icon: 'book', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Informatique',
      subtitle: 'Pr Nasri Anis',
      lectures: [
        { n: 1, title: 'Check list D4', prof: 'Pr Nasri Anis', ext: P, mb: '0.1', year: 2022, fid: '1r7a-OKzoRd_kiFEgXN2XpExIBuo8V7BF' },
        { n: 2, title: 'Cnil guide securite personnelle D4', prof: 'Pr Nasri Anis', ext: P, mb: '0.3', year: 2022, fid: '1ZDKEJ4rID5t1RzwpyICQXkYjNy0n69fZ' },
        { n: 3, title: 'Cours D2 1', prof: 'Pr Nasri Anis', ext: P, mb: '0.5', year: 2022, fid: '1hPv4bJQ3JGghjkjys8x2Es-GvLZltdxy' },
        { n: 4, title: 'Cours D2 2', prof: 'Pr Nasri Anis', ext: P, mb: '0.3', year: 2022, fid: '1JsBoI1MmiU71V015LHFg1maLvmw4xxKI' },
        { n: 5, title: 'Cours D2 3', prof: 'Pr Nasri Anis', ext: P, mb: '0.4', year: 2022, fid: '1NA-Yo0pkqk-1SkuQ54FGyb7a85D21WNI' },
        { n: 6, title: 'Cours D2 4', prof: 'Pr Nasri Anis', ext: P, mb: '0.2', year: 2022, fid: '1Q2Bk5dXk0CbTk2YG6xS0nppSQTW2Trw7' },
        { n: 7, title: 'Cours D4', prof: 'Pr Nasri Anis', ext: P, mb: '0.3', year: 2022, fid: '1ibTZeRywlAH1gfkiv84EPiZyCtyv2_g0' },
        { n: 8, title: 'Cours D5', prof: 'Pr Nasri Anis', ext: P, mb: '0.5', year: 2022, fid: '1wiFTG4r1akui06o_BO86tXbI45Ta4vvG' },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé D2', prof: 'Pr Nasri Anis', ext: P, mb: '0.7', year: 2022, fid: '1Gz6RuWAWD0KVFd8fpP-HnS-GaC-ROVD7' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM', icon: 'quiz',
      items: [
        { title: 'Qcm1-d1', prof: 'Pr Nasri Anis', ext: P, mb: '0.5', year: 2022, fid: '1yZ6CiLqGD-qcakT-abe4qB-5rRZlJ9wS' },
        { title: 'Qcm2-d5', prof: 'Pr Nasri Anis', ext: P, mb: '0.4', year: 2022, fid: '1J6H32pobutwjOHmS1tqkJ7GyCISK_v_s' },
        { title: 'Qcm3-d4', prof: 'Pr Nasri Anis', ext: P, mb: '0.5', year: 2022, fid: '162pTlO5auRUwxd45N6CNm3yNY8Ja_QvH' },
      ],
    },
  ],
};

export const TN_PCEP2_MICROBIOLOGIE = {
  id: 'tn-pcep2-microbiologie', promo: 'pcep2', semester: 'S1',
  name: 'MICROBIOLOGIE GÉNÉRALE', icon: 'micro', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Dr Ben Nasr Adem',
      lectures: [
        { n: 1, title: 'GenetiqueBacteriennex', prof: 'Dr Ben Nasr Adem', ext: P, mb: '2.0', year: 2023, fid: '148Wr67IEn7t-5Vfsb23vKY6HZ88gGNf0' },
        { n: 2, title: 'PathogeniciteBacterienne', prof: 'Dr Ben Nasr Adem', ext: P, mb: '1.2', year: 2023, fid: '1dsXmqXJFGKb_EP34dp0_EJZSE7zUeofe' },
      ],
    },
    {
      title: 'Pr Bekir Leila',
      lectures: [
        { n: 3, title: 'Anatomie bactérienne(Pr.BAKIR Leila)', prof: 'Pr Bekir Leila', ext: P, mb: '3.2', year: 2023, fid: '1CtnDaS3Qy9D1y3AbpAv1BCFdjIXUOmus' },
        { n: 4, title: 'Croissance bactérienne', prof: 'Pr Bekir Leila', ext: P, mb: '0.7', year: 2023, fid: '1AohbCqz_5et4oMFZxLgi9KmZpU9W8eoc' },
        { n: 5, title: 'Métabolisme Bactérien. Pharma', prof: 'Pr Bekir Leila', ext: P, mb: '2.1', year: 2023, fid: '14h9TD2zd97lzOgs2rOYLOtxmtR6BTzoI' },
        { n: 6, title: 'Nutrition bactérienne.', prof: 'Pr Bekir Leila', ext: P, mb: '0.7', year: 2023, fid: '1rfvYsokJ_wxuvKT_NSNeDEEo9KyivjfA' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'PolycopMicrobioGeneraleV3-2 — 2024-2025', prof: 'Pr Leila Bakir', ext: P, mb: '7.7', year: 2025, fid: '1Lr1E5pv3punAGXuK5uUC2NPBpKp7buM5' },
        { title: 'Microbiologie générale approuvé — 2023-2024', ext: P, year: 2024, fid: '1Tb8_6zTE4Ju7nxFaIUtphN3EqmsYWzW0' },
        { title: 'Anatomie Bactérienne — 2021-2022', prof: 'Pr Bekir Leila', ext: P, mb: '2.1', year: 2022, fid: '1yCORJPCp2NxZjU5_ilCw8i-An-O9f8WF' },
        { title: 'Métabolisme Bactérien — 2021-2022', prof: 'Pr Bekir Leila', ext: P, mb: '1.8', year: 2022, fid: '1uzZH9BELaSjPnmdsDSOVZqnBaKyPEBUf' },
        { title: 'Genetique Bacterienne — 2021-2022', prof: 'Dr Ben Nasr Adem', ext: P, mb: '1.4', year: 2022, fid: '1A--6rLSu300YplvuBcI5lM6JIs0t5wqk' },
        { title: 'Facteurs Pathogenicite — 2021-2022', prof: 'Dr Ben Nasr Adem', ext: P, mb: '1.7', year: 2022, fid: '1rZ0Y4RnmranFOnt-unCCmxfBtPSEukx4' },
        { title: 'Virologie Générale — 2021-2022', prof: 'Pr Trabelsi Abdelhalim', ext: P, mb: '7.5', year: 2022, fid: '1yZaIhibi_wymOoscezF7rT663FcO_FcL' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Bacteriophage', ext: P, mb: '0.0', year: 2024, fid: '1YvJDJjkCIiNRVVzH5nZPhcq34JqrRzFj' },
        { title: 'Genetique bacterienne', ext: P, mb: '0.0', year: 2024, fid: '19Wj5YiLxqwCI1MhbMu4WHewYtOp6at6f' },
        { title: 'Multiplication virale', ext: P, mb: '0.1', year: 2024, fid: '14nuJ6AizQB_4eLoNKykd9CtJerwTee8K' },
        { title: 'Pathogénicité bactérienne', ext: P, mb: '0.1', year: 2024, fid: '1StwNpr5i3iqqYua-Od3CRi5KjaB4Xql3' },
        { title: 'Résume partie BEKIR Leila', ext: P, mb: '8.9', year: 2024, fid: '1Gvd72Ft2YraLMBqvkB4FudItBtROmx6s' },
        { title: 'Résume partie Mr', ext: P, mb: '11.0', year: 2024, fid: '13hv6-7fO1gLLQkQNVjcRFtbpnbGAsJMd' },
        { title: 'Résumé virologie', ext: P, mb: '12.4', year: 2024, fid: '1lkRlrC-4YxeTZcQF2GLHIBVyTZPw-dWY' },
        { title: 'Structure et classification', ext: P, mb: '0.7', year: 2024, fid: '1ceKakfk6ulYlGthqyNBoALefvKz1bRdo' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Examen microbiologie générale principale', ext: P, mb: '0.3', year: 2025, fid: '1MeG3nWQBGAj_gMnnvhzG3fiblTATczwP' },
        { title: 'Microbiologie', ext: P, mb: '4.4', year: 2025, fid: '1QK5MODJhImCpi8Zu1hAlJ2qucYuVBjO4' },
        { title: 'Microbiologie generale s1', ext: P, mb: '0.3', year: 2026, fid: '12CiroTZGeWtsCXEXVSIYBFVYtWQ5DDGh' },
        { title: 'Annale Microbio', ext: P, year: 2024, fid: '1YrCtVhBEYzm83r7d_HIUB6HSBJkS58bZ' },
        { title: 'Qe-bacterio', ext: P, mb: '9.4', year: 2024, fid: '1fa5ktOOo536lWJJnPuDviyc2WgXkWRIS' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Microbio correction TD2', ext: P, mb: '1.0', year: 2024, fid: '1liD6AxgnEvBJYHley_X5N34Zx_16BVaj' },
        { title: 'TD microbiologie générale', ext: P, mb: '1.7', year: 2024, fid: '1RtoLIaTAaCv5RBhct0zOoJc4Nh4AbhEk' },
        { title: 'TD Virologie Généale', ext: P, year: 2024, fid: '1tVtjZDlT3-ZD9isGdGGoorhI3b6YwzEr' },
        { title: 'TD1 micrbio correction', ext: P, mb: '0.9', year: 2024, fid: '1fGJjlhYgDb9SvFTelUfgGi_qo14pRaS_' },
        { title: 'TD anatomie bactérienne', ext: P, mb: '0.1', year: 2022, fid: '1-wFhGHIjHfTUqxtFKpEng1JHjgNhHHsC' },
        { title: 'TD de virologie', ext: P, mb: '0.1', year: 2022, fid: '1xFxk-0AhYY70D9RfVMYFoPLks02V2k71' },
        { title: 'TD facteurs de pathogénecité', ext: P, mb: '0.0', year: 2022, fid: '1q1F2TQft0X_q9NVhlQS7ITRTJ6oA8Ckj' },
        { title: 'TD genetique bactérienne', ext: P, mb: '1.2', year: 2022, fid: '1EoRuEKIr9FEVkXF7TZ_AH3tQPAv6jPWc' },
        { title: 'TD génétique bactérienne', ext: P, mb: '0.1', year: 2022, fid: '1gbBD4xDmWQU9SJmOnohDYa34DRGO6iMF' },
        { title: 'Td virologie', ext: P, mb: '1.0', year: 2022, fid: '14Wmz7b-nqmQgegCZyQE-nggP4PbP7JD-' },
        { title: 'TD Virologie Généale', ext: P, mb: '1.7', year: 2022, fid: '1EdC_5Vv2D_hz-6p6ZtEY4JRkTcslf3IG' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// S2
// ---------------------------------------------------------------------------

export const TN_PCEP2_ANGLAIS = {
  id: 'tn-pcep2-anglais', promo: 'pcep2', semester: 'S2',
  name: 'ANGLAIS', icon: 'book', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Anglais',
      lectures: [
        { n: 1, title: 'Anglais', ext: P, year: 2024, fid: '1-KrfMQgJHwPH4QV_ooiiYoqv9YbVsanY' },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Anglais - Annales des Examens', ext: P, year: 2022, fid: '1Fo2qbu44xh5qAqnuYbH_2sN6x44SXOXQ' },
        { title: 'Session 1', ext: P, mb: '2.2', year: 2022, fid: '1letk9bknslfPPWCxIPVseHxsNILE9Gah' },
        { title: 'Session 1', ext: P, mb: '2.5', year: 2022, fid: '1ib6cfxqB6n_4FJxPzQlD9uhPe-9SBzPg' },
        { title: 'Session 2', ext: P, mb: '2.5', year: 2022, fid: '18WKfL_aYjgpaq0zmUiqYWxqTiTzHHaJ3' },
        { title: 'Session 2', ext: P, mb: '2.3', year: 2022, fid: '1URC8YM4QMawJyhKl5kctWRedUfsBg7y9' },
        { title: 'Session 3', ext: P, mb: '2.1', year: 2022, fid: '1Z1oFJHe5QJHGv2HK92YGLo8Nu4VWJlkp' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'TD ANG M7- English Tutorial 2nd level codifié avec cartouche', ext: P, mb: '2.1', year: 2024, fid: '1iJiBM6b2PJ8voZhEFCm3pjZUir2mpEs5' },
      ],
    },
  ],
};

export const TN_PCEP2_BIOCHIMIE = {
  id: 'tn-pcep2-biochimie', promo: 'pcep2', semester: 'S2',
  name: 'BIOCHIMIE MÉTABOLIQUE', icon: 'flask', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Biochimie métabolique',
      lectures: [
        { n: 1, title: 'C BIOCH.MET M2 Support de cours Biochimie métabolique 2 1', ext: P, mb: '18.3', year: 2024, fid: '1WjPDJZz1vadNMg58OnBTeZYEjcPKEnsw' },
        { n: 2, title: 'Cycle de Krebs', prof: 'Pr Chahed Hend', ext: P, year: 2023, fid: '1mVgKvx01KIYeQxqiC4w1yXCH3n3TRwei' },
        { n: 3, title: 'Glycolyse anaérobie', prof: 'Pr Chahed Hend', ext: P, year: 2023, fid: '1nxzffV0K4IwlbbEw-vol26XAy8V7Mk7G' },
        { n: 4, title: 'Voie des pentose', prof: 'Pr Chahed Hend', ext: P, year: 2023, fid: '1tkrtMrNFhlyvfwxT9irN2XWuS1x77_Uz' },
        { n: 5, title: 'La néoglucogenèse', prof: 'Pr Chahed Hend', ext: P, year: 2023, fid: '1xGrhAzBvd4EQK_dIk0QiArCT10DOZqVv' },
        { n: 6, title: 'Métabolisme du glycogène', prof: 'Pr Chahed Hend', ext: P, year: 2023, fid: '15tIv0HqKRcncglYTp2_Ik6L9rUtc7Zca' },
        { n: 7, title: 'Biosynthese des acides Gras', prof: 'Pr Omezzine Asma.', ext: PT, mb: '3.1', year: 2024, fid: '1h4ge9sNU10aNYFUMzOJ1JzQzkXGFpdK4' },
        { n: 8, title: 'Biosynthese des glycerolipides', prof: 'Pr Omezzine Asma.', ext: X, mb: '0.2', year: 2024, fid: '1THPJ4Qhb90e4e2qf9RGxkjR43ddRXrhE' },
        { n: 9, title: 'Biosynyhèse des hormones stéroides', prof: 'Pr Omezzine Asma.', ext: PT, mb: '0.5', year: 2024, fid: '19t1gkhyjrFK-MLeoICuoPPxPZxLuxaHr' },
        { n: 10, title: 'Catabolisme des AG', prof: 'Pr Omezzine Asma.', ext: X, mb: '0.7', year: 2024, fid: '1Tg32A931DQUTj72XmOozswVyt-1V_lFb',
          versions: [
            { title: 'Catabolisme des glycerolipides', prof: 'Pr Omezzine Asma.', ext: X, mb: '1.3', year: 2024, fid: '12UUsU3l3ATBUwvX7cHeEuQgBWGBrFKKc' },
          ] },
        { n: 11, title: 'Chaine-respiratoire', prof: 'Pr Chahed Hend', ext: P, mb: '0.6', year: 2023, fid: '1fcFE73DpwwwlZ4iL4ml2iQ9Tou13z7zw' },
        { n: 12, title: 'Corps cetoniques', prof: 'Pr Omezzine Asma.', ext: X, mb: '1.6', year: 2024, fid: '12kN-sLqN5rPvY3Ykr3QTL2Uw2_xhRL62' },
        { n: 13, title: 'Eicosanoides', prof: 'Pr Omezzine Asma.', ext: X, mb: '0.2', year: 2024, fid: '11HVJ9RryS0vVMBSEgCIwKMfQvbakJanC' },
        { n: 14, title: 'La vitamine D3', prof: 'Pr Omezzine Asma.', ext: X, mb: '0.4', year: 2024, fid: '1FkafBhxh1xrpxRUsz4cznITO3_o14wii' },
        { n: 15, title: 'Metabolisme du cholestérol', prof: 'Pr Omezzine Asma.', ext: PT, mb: '1.0', year: 2024, fid: '1S8SQthxHwYSLngjrlG492uzw9yFbNFup' },
        { n: 16, title: 'Métabolisme-et-Bioénergétique', prof: 'Pr Chahed Hend', ext: P, mb: '0.5', year: 2023, fid: '1ABJFDowD93oCPqfD_5oPH8sE-SRD-Rte' },
        { n: 17, title: 'Polycope lipide', prof: 'Pr Omezzine Asma.', ext: P, mb: '1.7', year: 2024, fid: '1CjFqOCYE7fMVAvIUqcaFo-4STD9SKVGk' },
        { n: 18, title: 'Regulation TG', prof: 'Pr Omezzine Asma.', ext: X, mb: '0.8', year: 2024, fid: '1G2Ipz5omGRS0JFanbfVw1fkA5Shqsgp8' },
        { n: 19, title: 'Sphingolipides', prof: 'Pr Omezzine Asma.', ext: X, mb: '0.1', year: 2024, fid: '1giEvOhY75QaO0T_cHbqeuUbN9uJKJaqy' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Complet metabolisme des lipides — 2022-2023', ext: P, mb: '7.0', year: 2023, fid: '1bRPSBk9EsbdCUTBsE7Uban-MP0Nvxl3O' },
        { title: 'De generalites — 2022-2023', ext: P, mb: '0.5', year: 2023, fid: '1vxP32Q8U4omSGIKOupMEYZUv2MuijmTi' },
        { title: 'Generalites — 2022-2023', ext: P, mb: '0.5', year: 2023, fid: '1_DjSf-MFJTaiWjFUXdXdmJ4-AxydHOxI' },
        { title: 'I-1-catabolisme des AG — 2022-2023', ext: P, mb: '1.1', year: 2023, fid: '1wHEp7WX1UlOYPrNqwqz_yOKfR9NQ9MRt' },
        { title: 'I-2-biosynthese des acides Gras — 2022-2023', ext: P, mb: '0.9', year: 2023, fid: '1i3RjgepZ7dcAdnfjGFICnEoRbavBejZ6' },
        { title: 'I-3-regulation AG — 2022-2023', ext: P, mb: '0.2', year: 2023, fid: '1G0UaeMjPKRaGOYO5dPLCMdb-uHzYtmpa' },
        { title: 'II-corps cetoniques — 2022-2023', ext: P, mb: '0.5', year: 2023, fid: '1wKnQvaYfSWhSsRCKFInWRgd90FDSU1eH' },
        { title: 'III-1-biosynthese des glycerolipides — 2022-2023', ext: P, mb: '0.1', year: 2023, fid: '1zmoNPdM63xDb1hNip01jtUl9b8WycfcL' },
        { title: 'III-2-catabolisme des glycerolipides — 2022-2023', ext: P, mb: '0.8', year: 2023, fid: '1io0wADFxFY4SrIltdnJ3-ZGp6vG1zRzQ' },
        { title: 'III-3-regulation TG — 2022-2023', ext: P, mb: '0.4', year: 2023, fid: '11ea245zFpspGza___-AFgPup__Qg4x4S' },
        { title: 'IV-sphingolipides — 2022-2023', ext: P, mb: '0.1', year: 2023, fid: '1HuoYham6sPds_q7yRpRbYvKi05lOXNUR' },
        { title: 'Métabolisme AA 2A — 2022-2023', ext: P, mb: '3.6', year: 2023, fid: '1u-HcUI_BMU9UNy6rLVz-F4rOowhaV0oW' },
        { title: 'Métabolisme de lhème — 2022-2023', ext: P, mb: '1.2', year: 2023, fid: '15TqMR8JqCp-XMNtmxkso02adHi8h0B2r' },
        { title: 'Métabolisme des nucléotides — 2022-2023', ext: P, mb: '2.0', year: 2023, fid: '1FbIVtdHLEbuoap6gjmPBeZJC060NkZc8' },
        { title: 'Réactions de la voie des pentose phosphate — 2022-2023', ext: P, year: 2023, fid: '1HOsmeWIECBclcRYMil7KCWAx-MmZSpCl' },
        { title: 'V-eicosanoides — 2022-2023', ext: P, mb: '0.2', year: 2023, fid: '1h2EfvvHYp8G841GJqYqya0vo6scGbSmX' },
        { title: 'VI-metabolisme du cholestérol — 2022-2023', ext: P, mb: '0.7', year: 2023, fid: '1nZyPswT8x5WyjSwDBkRrmDLwBvQ_lRkL' },
        { title: 'VII-La vitamine D3 — 2022-2023', ext: P, mb: '0.2', year: 2023, fid: '19n-lGo4g67EiXrqJ-GaeiT0k-zfuijv0' },
        { title: 'VIII-biosynyhèse des hormones stéroides — 2022-2023', ext: P, mb: '0.2', year: 2023, fid: '1tIzSJoFlsDDF9k_ZyFDe7q_JZHwf4GAi' },
        { title: 'Rappels — 2021-2022', prof: 'Pr Asma Ommezine', ext: P, mb: '0.5', year: 2022, fid: '1kAWA3EdJh86qa_PU-tSLROemsR6Uyb-c' },
        { title: 'Biosynthèse des AGs — 2021-2022', prof: 'Pr Asma Ommezine', ext: P, mb: '0.8', year: 2022, fid: '1NJaOMJhTIbf15lo0PXp3ZUudPseuyHyM' },
        { title: 'Cinétique Enzymatique — 2021-2022', prof: 'Pr Hassen Bouzidi', ext: P, year: 2021, fid: '1js5kHf3f51zyF4KWWmCqSKX21Mf5-Xyg' },
        { title: 'Coenzymes — 2021-2022', prof: 'Pr Hassen Bouzidi', ext: P, year: 2021, fid: '1xhUvF6oamv_AzC68abS9g-ZKxK3Fkb4h' },
        { title: 'Métabolisme des glycérolipides — 2021-2022', prof: 'Pr Asma Ommezine', ext: P, mb: '0.8', year: 2022, fid: '1hHTlwU1MKf0nYMA4t13Re_0SlUCZbjXd' },
        { title: 'Activité Enzymatique — 2021-2022', prof: 'Pr Hassen Bouzidi', ext: P, year: 2021, fid: '16mNqYLeoNMQEOCw8ctGCivBmn49OAyLD' },
        { title: 'Régulation de l’Activité Enzymatique — 2021-2022', prof: 'Pr Hassen Bouzidi', ext: P, year: 2021, fid: '1mCPRdZVUXb3JOLAZFdhtqCuDR6DarbWd' },
        { title: 'Voie des pentoses phosphate — 2021-2022', prof: 'Pr Hend Chahed', ext: P, mb: '1.3', year: 2022, fid: '1n6EJnr9Jn1lEcqubuE34Qq4eG3-H4U4V' },
        { title: 'Néoglucogenèse — 2021-2022', prof: 'Pr Hend Chahed', ext: P, mb: '0.8', year: 2022, fid: '1K_jZkZkTzGrVbgp_t7q2DEfYNeYg4QKs' },
        { title: 'Métabolisme des AAs cours — 2020-2021', prof: 'Pr Ilhem Hallara', ext: P, mb: '5.1', year: 2021, fid: '1E2jYjt031SOHLJn5ryUvG2CXRtoswmND' },
        { title: 'Métabolisme des AAs diapos — 2020-2021', prof: 'Pr Ilhem Hallara', ext: P, mb: '2.6', year: 2021, fid: '152cN41g9b-Ds9BMH1TIeM0FXRyfTKEaN' },
        { title: 'Partie 1 generalités — 2020-2021', prof: 'Pr Asma Omezzine', ext: P, mb: '0.4', year: 2021, fid: '1NRaBmJ-pr1IXJEOOrcMcf9ZpyCwaFYc9' },
        { title: 'Partie 2 catabolisme des AG — 2020-2021', prof: 'Pr Asma Omezzine', ext: P, mb: '0.8', year: 2021, fid: '1cNaM_4sV0W-Pvj1n4sZMziN6BOELvbHp' },
        { title: 'Partie 3 biosynthese des acides Gras — 2020-2021', prof: 'Pr Asma Omezzine', ext: P, mb: '0.9', year: 2021, fid: '17K6zDHUoCHjq-q8S1v5F0sUcKlenpdUo' },
        { title: 'Partie 4 regulation — 2020-2021', prof: 'Pr Asma Omezzine', ext: P, mb: '0.2', year: 2021, fid: '1ZXoknMbJiL4AOErLPZe7Kr3d-Yf0MmpS' },
        { title: 'Métabolisme de l’hème cours — 2020-2021', prof: 'Pr Ilhem Hallara', ext: P, mb: '1.7', year: 2021, fid: '1sOfXix4DupTg9Q_1Gr6_WsPUe4pRHPTn' },
        { title: 'Métabolisme de l’hème diapos — 2020-2021', prof: 'Pr Ilhem Hallara', ext: P, mb: '1.0', year: 2021, fid: '1IR4enh8BVIxQwzuoV06ChMJcDv24Xpg7' },
        { title: 'Métabolisme des nucléotides cours — 2020-2021', prof: 'Pr Ilhem Hallara', ext: P, mb: '1.4', year: 2021, fid: '1VdRyoa1EwhHx1Cwpjv2DU81SbHa7uXNZ' },
        { title: 'Partie 1 Voie des Pentoses Phosphate — 2020-2021', prof: 'Pr Hend Chahed', ext: P, mb: '1.1', year: 2021, fid: '1eF95e3Apffz83JHiGL9rVyHPz-weTyWz' },
        { title: 'Partie 2 Réactions de la Voie des Pentose Phosphate — 2020-2021', prof: 'Pr Hend Chahed', ext: P, mb: '0.2', year: 2021, fid: '1PoEoT6MXJEz9bZjP4db95GSNNV222672' },
        { title: 'Partie 1 Néoglucogenèse — 2020-2021', prof: 'Pr Hend Chahed', ext: P, mb: '1.1', year: 2021, fid: '1T9QY4Bj60BGTKVOcTOjsS2ah_PLM5ocf' },
        { title: 'Partie 2 Etapes de néoglucogenèse — 2020-2021', prof: 'Pr Hend Chahed', ext: P, mb: '0.3', year: 2021, fid: '1L6VRqeviretozZYhINuvrWr-37a9ds4O' },
        { title: 'Partie 3 Métabolisme du glycogène — 2020-2021', prof: 'Pr Hend Chahed', ext: P, mb: '1.0', year: 2021, fid: '1Gr-OhU-l3Vxo0SrBaTgM6CZK-M_40uTr' },
        { title: 'Complet — 2020-2021', prof: 'Pr Asma Omezzine', ext: P, mb: '1.5', year: 2021, fid: '1DIpqaOQt-4G1GO3WFyg7bCssfayDmbWX' },
        { title: 'Enzymologie — 2020-2021', prof: 'Pr Hassen Bouzidi', ext: P, mb: '2.7', year: 2021, fid: '14BpOwYW6ztu8QjWr3K1aZB4bkB3r_Fog' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Fiche AA', ext: P, mb: '3.9', year: 2024, fid: '1l1UlzmsEyGMP-EUXzh0oWV37vNuEYFxf' },
        { title: 'Fiche AG', ext: P, mb: '0.3', year: 2024, fid: '1wNruoms10YtsrDBive9yW0riWqXTe9sC' },
        { title: 'Fiche Chaîne respiratoire', ext: P, mb: '0.2', year: 2024, fid: '1eNlecmxVPCR0LxB6PARQShHncjtFbB01' },
        { title: 'Fiche Cholestérol', ext: P, mb: '0.9', year: 2024, fid: '1yL1t6CjT_TphI2kpIX1K9-04sIe32rnu' },
        { title: 'Fiche Cinétique enzymatique', ext: P, mb: '1.0', year: 2024, fid: '1B2kBWNTIljVd34PhD9UQe9NuE2xBt3Jl' },
        { title: 'Fiche Coenzymes', ext: P, mb: '2.3', year: 2024, fid: '1eK7CpjS9A0Tg5fYSIv0v28MbOBkD2cqf' },
        { title: 'Fiche Corps cétoniques', ext: P, mb: '0.3', year: 2024, fid: '1mdW0_qTi9Mn_OM9q7v_QW-ePluODQvQ-' },
        { title: 'Fiche Cycle Krebs (CK)', ext: P, mb: '3.1', year: 2024, fid: '1pikAdoiSIyv6W4gFO-Z1UdZsUZz2qvSf' },
        { title: 'Fiche Eicosanoïdes', ext: P, mb: '0.1', year: 2024, fid: '10bhR38DbPs0_4twoRRD4kpE7MA0Kh8ts' },
        { title: 'Fiche Glycogénogénèse (GG)', ext: P, mb: '1.8', year: 2024, fid: '14d0piEVHFKsGvrLmI4n6V6Iqj0d5pMQw' },
        { title: 'Fiche Glycolyse Anaérobie (GA)', ext: P, mb: '3.7', year: 2024, fid: '1450o4UUjCEQ_VMEDXMkmBDmCSi0NtUzC' },
        { title: 'Fiche Mesure de l’act enzymatique', ext: P, mb: '0.5', year: 2024, fid: '15PyA4VfZBhqcr9gyK0Dht4fwZYkvSUJS' },
        { title: 'Fiche Métabolisme & Biosynthèse', ext: P, mb: '0.4', year: 2024, fid: '1jE6AfVL4Zkn8ZBcMV0QJ5ZPWueyR_4cQ' },
        { title: 'Fiche Métabolisme de l’hème', ext: P, mb: '0.2', year: 2024, fid: '1jkKQ6WvEnX9rioXGv4lEJQkM7POHwTSn' },
        { title: 'Fiche Métabolisme nucléotides', ext: P, mb: '0.0', year: 2024, fid: '1TEaCMOL5qmJ6GZ-BWkQccBuJW0fQE8yR' },
        { title: 'Fiche Néoglucogénèse (NG)', ext: P, mb: '2.0', year: 2024, fid: '1F-63xZOVsLTKDYIj-qpSVLvvHE0j9y2y' },
        { title: 'Fiche Sphingolipides', ext: P, mb: '0.0', year: 2024, fid: '1Y_PaiQbSM2goyk1HB3QOrPYqo7JryCJl' },
        { title: 'Fiche Stratégies Régulat° act enzymatique', ext: P, mb: '1.6', year: 2024, fid: '1OlFMJUg8HmgWA-8zHAWNnim-mHWYTYp-' },
        { title: 'Fiche TG + GlycéroPP', ext: P, mb: '0.2', year: 2024, fid: '1voqxXvdBoUVkx6QQakwh1i1UniAjHtXn' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Ann prin s2 biochi metabo', ext: P, mb: '0.3', year: 2026, fid: '1FX5UMtQFj2If5eMkqDBAqkSpdiu8Dk_U' },
        { title: 'Bioch Correction P', ext: P, mb: '0.2', year: 2024, fid: '1n1T_otmaboZZZ522Oz1RPm5lrinMO9_e' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'TD- BIOCH.MET Support de TD Bioch Metabolique', ext: P, mb: '2.7', year: 2024, fid: '19N9WMnwizq8uOOosGMJSJP6t-uETodxU' },
        { title: 'CORRECTION Acide aminé rectifié', ext: P, mb: '0.6', year: 2024, fid: '13G0cVcv_05IC1hwkkAp9Y84PIcyj-mnC' },
        { title: 'Correction TD', ext: P, mb: '0.8', year: 2024, fid: '1ZnBzUjGt0Oe0Q3G00sW7ASwhTpSVBf0r' },
        { title: 'Correction TD enzymo', ext: P, mb: '2.5', year: 2024, fid: '1DUtI9ny41lNxX_Yc7UlwFvGzWAGgdiwm' },
        { title: 'Correction TD glucides', ext: P, mb: '1.4', year: 2024, fid: '1A-r2_NR8rusMd6zXRKlVWykG-xpoy-kp' },
        { title: 'Correction TD lipide', ext: P, mb: '0.9', year: 2024, fid: '1rRLQkklpKznTFiLSlMGtoi5Lnqh-GqIM' },
        { title: 'ED enzymo UVT', ext: P, year: 2024, fid: '1Ra3udYVuLhghPW0hXPTgUCGtkwWpfyUJ' },
        { title: 'TD LIPIDES 2emeAnneePharmacie', ext: P, mb: '0.3', year: 2023, fid: '1leza6w-IaNmmWdDHECboyKB79suwMVqn' },
        { title: 'TD2 Glucides', ext: P, year: 2024, fid: '1UDWSaip-_4lRHcHghQbHOy1eQHZpq_eH' },
        { title: 'ED enzymo UVT', ext: P, mb: '0.6', year: 2023, fid: '1QyZKh62CyuF065uJ-3DVkaQtgOCOINTy' },
        { title: 'TD LIPIDES 2emeAnneePharmacie', ext: P, mb: '0.1', year: 2020, fid: '1HNWV1Xi5jQUZz-6qiBVmXU88dM-5nOhf' },
        { title: 'TD2 Glucides', ext: P, mb: '0.2', year: 2023, fid: '1w_5SwSSDDCoS9LWHqxGIBPLpBOWvTlhG' },
        { title: 'Correction TD glucides + remarques', ext: P, mb: '5.7', year: 2022, fid: '1hf4KdCQUTGpjWefus1TA_-rdNL3Y8WQ6' },
        { title: 'Correction TD1 Glucides', ext: P, year: 2021, fid: '1XPQyZ5QhNtiMrYlqaj9TRPt2uFYDZTu8' },
        { title: 'TD Glucides', ext: P, mb: '0.6', year: 2022, fid: '1NMz2or_IeMG7MOO-RUhxmgvlFUrnxeN8' },
        { title: 'TD lipides', ext: P, mb: '0.1', year: 2020, fid: '1ad5Kp33qTsmVt_sq4jeA9JDP2rZBG2Gx' },
        { title: 'Correction TD1 Glucides', ext: P, mb: '1.4', year: 2021, fid: '15sX_CKQPlChxmmHwSr1enIWOViXwMcrT' },
        { title: 'Correction TD1 Lipides', ext: P, mb: '1.8', year: 2021, fid: '1DXQwwOqqyZjPRhSs_2vuo4t5Qj6aYjU0' },
        { title: 'Correction TD2', ext: P, mb: '0.4', year: 2021, fid: '1eAHd5TyluidEc4MO5ff2i1KPqaTxGadK' },
        { title: 'Correction TD2 glucide', ext: P, mb: '0.8', year: 2021, fid: '1j4ljWEna6DP8_ruo0KsPwfdidt7yL0Ft' },
        { title: 'Correction TD2 Lipides', ext: P, mb: '1.1', year: 2022, fid: '1zWogTs1AQrFAQUHaDA8NuKdrnCVqlXVH' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM', icon: 'quiz',
      items: [
        { title: 'QCM-lipide', ext: P, mb: '0.2', year: 2021, fid: '189rUyf9p5S5GtPKJCXpvA8ULh5dMbOKT' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Manip 1+2+3', ext: P, mb: '0.9', year: 2024, fid: '1bykV665JPs47tsbV-9RfzJl3n9YjFTxn' },
        { title: 'Manip 4', ext: P, mb: '0.9', year: 2024, fid: '1z7IZuXwlx7jcwEinl1ck8ybEYtxnIEO5' },
        { title: 'Manip 5', ext: P, mb: '0.5', year: 2024, fid: '1DLZ74JUnA-A6RecRpIQy8TAultzQyHfi' },
        { title: 'Tp bioch', ext: P, mb: '3.0', year: 2022, fid: '1Q8UaUAeDASSEUEboBGvKghBgwvkS7fxu' },
      ],
    },
  ],
};

export const TN_PCEP2_BIOLOGIE_VEGETALE = {
  id: 'tn-pcep2-biologie-vegetale', promo: 'pcep2', semester: 'S2',
  name: 'BIOLOGIE VÉGÉTALE', icon: 'micro', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Biologie végétale',
      lectures: [
        { n: 1, title: 'Equilibre hydrique et flux des sèves', prof: 'Pr Madini Hanane', ext: P, mb: '2.8', year: 2024, fid: '1hs8M7vtK4ekdRNmxFiloRHhnQNKyDH4P' },
        { n: 2, title: 'BIO.VEG-M5- support du cours de biologie végétale, A-Codifié avec cartouche20231209', ext: P, year: 2024, fid: '12lnMB7qE49YVOy1949w659hwKpkoIb3I' },
        { n: 3, title: 'Nutrition Minérale', prof: 'Pr Madini Hanane', ext: P, mb: '3.2', year: 2024, fid: '1eeiFK9LCTuqpEcg99Xv_njq6XzXf2hFI' },
        { n: 4, title: 'Nutrition Azotée', prof: 'Pr Madini Hanane', ext: P, mb: '2.1', year: 2024, fid: '1vrl94hGZtzAl0CMDd-LzDE-kSUInw7M0' },
        { n: 5, title: 'Phytohormones', prof: 'Pr Madini Hanane', ext: P, mb: '2.4', year: 2024, fid: '1fyE-9SEN3YrrXjsZskSregmyc_Q9XiG6' },
        { n: 6, title: 'Croissance et Développement', prof: 'Pr Madini Hanane', ext: P, mb: '2.7', year: 2024, fid: '17WtshBl2lkjw5-XMEpi59lmhSDczb1p0' },
        { n: 7, title: 'Floraison', prof: 'Pr Madini Hanane', ext: P, mb: '1.6', year: 2024, fid: '1iDcs1JdO5uQ1B-Yoyn47tfrhzqQ8b68z' },
        { n: 8, title: 'Germination', prof: 'Pr Madini Hanane', ext: P, mb: '1.5', year: 2024, fid: '1bmWgHrIPF0pNbs99XDDiQbVaBLE6SS0M' },
        { n: 9, title: 'Diapos cours les plastes et la photosynthèse', prof: 'Pr Aissi Ameur', ext: P, mb: '24.6', year: 2024, fid: '1SPnmEwsZfvQQOpURGgy1TBUOE6UqaEWF' },
        { n: 10, title: 'Photosynthèse(ameur)', prof: 'Pr Aissi Ameur', ext: P, mb: '5.2', year: 2024, fid: '1MvZKjfN0TqvpleuHFCkol2RYURUzsy02' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Biologie végétale — 2022-2023', ext: P, mb: '7.4', year: 2023, fid: '1PieTrNW8CGXNbI4JsjwybGtOT_OKF8Ty' },
        { title: 'CH: Plastes et Photosynthèses — 2021-2022', prof: 'Pr Ameur Issi', ext: P, mb: '2.0', year: 2022, fid: '1cIw_4wT6o8j4ww4NhtVlJUBEXTG1ey5d' },
        { title: 'Photosynthèse — 2020-2021', prof: 'Pr Ameur Issi', ext: P, mb: '2.0', year: 2021, fid: '1H8HNHn7DPALfjn2jZMT8AuG-OSu_Z-1_' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Bioveg 1', ext: P, mb: '0.3', year: 2024, fid: '15Vf15Ep2duIWwKw7C-2cXg-KwXjEuJkr' },
        { title: 'Bioveg 4', ext: P, mb: '0.3', year: 2024, fid: '161JzNvKlVViRtmq0JDmRtVTrH-qNq9i8' },
        { title: 'Croissance et développement', ext: W, mb: '0.7', year: 2024, fid: '196OU5tcW55AnmcMI-tLjdXS2Z1SM0HRM' },
        { title: 'Floraison', ext: W, mb: '0.2', year: 2024, fid: '18yf_ECbb8kjZoR4MRUpKmTYe0in9uqF2' },
        { title: 'Germination-résumé', ext: W, mb: '1.1', year: 2024, fid: '18yLWvG8O8ruDdi_IsxnQ5qCIVRIsPV-x' },
        { title: 'Phytohormones', ext: P, mb: '1.1', year: 2024, fid: '15pXAa5trqmz_pwQjY5FajSZ7ai0dDMa8' },
        { title: 'QE-Photosynthèse', ext: P, mb: '0.2', year: 2024, fid: '1CN7BEEO1MFvxIaMll30OL0Zuoznhz1KN' },
        { title: 'Résumé chap1: équilibre hydrique et flux des sèves', ext: P, mb: '0.5', year: 2024, fid: '18bYhFc9GJOfkkKCx56hrbUcTWwRWqoMv' },
        { title: 'Résumé chap2: La nutrition minérale', ext: P, mb: '1.2', year: 2024, fid: '1V6zamtDTtHRGX4X6i_LMgH-Quo3VZRPm' },
        { title: 'Résumé chap3: nutrition azotée', ext: P, mb: '0.9', year: 2024, fid: '1c7uzvW5KXTq-_Uvn4Hnh8lhskhAtmOpM' },
        { title: 'Résumé chap7:la germination', ext: P, mb: '0.4', year: 2024, fid: '1V-e8qmGCsMVRNSviGZ_d1iY1ufyWjIXF' },
        { title: 'Résumé chap8:les plastes et la photosynthèse', ext: P, mb: '1.0', year: 2024, fid: '1x5lXTUSEDma5Vma6wwYYBkfPvyg1ZDj2' },
        { title: 'Résumé Partie Dr.Ameur ISSI', ext: P, mb: '2.7', year: 2021, fid: '1e1f_b-c1tXt9mDsu0D_jyL7233WMOHtl' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Ann prin s2 biolo vegetale', ext: P, mb: '0.2', year: 2025, fid: '124tSSZ_FvnQaQFOQqW-0_KcnSHk0cU3p' },
        { title: 'BioVeg Correction P', ext: P, mb: '1.0', year: 2024, fid: '1K7qFIVnAwaAPr3igaqWMB4wkjPt80PNC' },
        { title: 'Correction Examen Biologie Végétale Session Mai', ext: P, mb: '0.4', year: 2025, fid: '1Bt6bUf3BaE0olXz968KhvDV9d89HAwsp' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Correction td photosynthèse', ext: P, mb: '1.8', year: 2024, fid: '17dXR45ZbG9_85CAAuhJDDT14s3MLPHdc' },
        { title: 'Correction TD1 Echanges Hydriques et Nutrition Minérale', ext: P, mb: '0.7', year: 2024, fid: '1CXy5U5jbzcv0nkFwMpIhukxyyjNtjo5c' },
        { title: 'Correction TD2 Phytohormones', ext: P, mb: '0.6', year: 2024, fid: '1QuySpfgtoeiyQn18P7aOOvuKrWHrobIH' },
        { title: 'Correction TD3 Germination et Floraison', ext: P, mb: '0.6', year: 2024, fid: '1A3_s9NGe8cWq0bp_iKnc9IRSIrgGm9rj' },
        { title: 'Facicule de TD', ext: P, mb: '1.5', year: 2024, fid: '1GRHQJheN1v6ncTT128g-TLGan1zrTfRx' },
        { title: 'TD 1', ext: P, mb: '0.7', year: 2024, fid: '1kw8nqLtOEKw_L9EtonScCVU_F-ffIRZE' },
        { title: 'TD1 Echanges hydrique et nutrition minerale', ext: P, mb: '0.1', year: 2024, fid: '1LQDTu-t0ag-xYLSREI6MdrZIwpPtz6QH' },
        { title: 'TD2 Phytohormones', ext: P, mb: '0.3', year: 2024, fid: '130NuEbyg4INSSR6vrepH2bqnbkbWBg-J' },
        { title: 'TD3 Germination et Croissance', ext: P, mb: '0.5', year: 2024, fid: '12DXtVESaehK1fDmEXH3L30YdjyuEr0to' },
        { title: 'TD Bio V', ext: P, mb: '0.7', year: 2023, fid: '1S4i_Jl_8H88QfFUv8d1xbLkQw1EuIJS7' },
        { title: 'Correction TD1 Echanges Hydriques et Nutrition Minérale', ext: P, year: 2022, fid: '1loT5CjObcaDha91967jamqSwV8hJxbey' },
        { title: 'Correction TD2 Phytohormones', ext: P, year: 2022, fid: '1NWYN_9XdfymSShMg6aR-ly79zGG8NT-I' },
        { title: 'Correction TD3 Germination et Floraison', ext: P, year: 2022, fid: '1Ny24VeB4lQvcPjpeYbD65DdzVxhz2A4f' },
        { title: 'TD2 Phytohormones', ext: P, year: 2022, fid: '1MglkjPCV6Rglq3kb8kuJ9BbT4t1ApN9i' },
        { title: 'TD4 : Photosynthèse', ext: P, mb: '0.5', year: 2022, fid: '1tu5HY_SdqiL4IcsDB51xAahVqEtTDQp_' },
        { title: 'TD Photosynthèse', ext: P, mb: '0.5', year: 2021, fid: '1gtG2yEzI1X0IjmZ3yR8uV0czMca5lVMV' },
        { title: 'TD1 Echanges hydriques et nutrition minérale', ext: P, mb: '0.3', year: 2021, fid: '1Kf3i8-m8Dv07a3803pjbirehsOq2YetN' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM', icon: 'quiz',
      items: [
        { title: 'QCM1', ext: P, mb: '0.1', year: 2021, fid: '1u0jRWowpshnsbRUAcCIj-3MPkEUeHoeY' },
        { title: 'QCM2 phytohormones', ext: P, mb: '0.3', year: 2021, fid: '1VCg5DlIjTfNySBxRxB497sbPPcWHVKFL' },
        { title: 'QCM3', ext: P, mb: '0.2', year: 2021, fid: '14hvx7mjZiLc7kMJjq2o-VbEGEoVi6veA' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Effet tampon', ext: P, mb: '3.5', year: 2024, fid: '1ki3YuHER_e7VUtgiioru2EaFmOjpmXA4' },
        { title: 'Effet TAMPON', ext: P, mb: '0.8', year: 2024, fid: '1PnNFhRi642us6WXJNBiGtMPyNfEqNz3P' },
        { title: 'Etude des inclusions cytoplasmique', ext: P, mb: '1.6', year: 2024, fid: '15r74LbtqwtmFOgKwxkhuroVritCfcY3i' },
        { title: 'Les acides nucleiques', ext: P, mb: '1.4', year: 2024, fid: '16bwlgXx6x8ZSS03-gQ3ND3g23mEg4ozS' },
        { title: 'Les pigments plastidaires', ext: P, mb: '1.0', year: 2024, fid: '1rAGq8Krs582_d7-6PAZHaiRXcU6pzW63' },
        { title: 'Pression osmotique et permeabilité', ext: P, mb: '3.3', year: 2024, fid: '1qcvgyNEN6b3i5njnaYtiuK5KOdotNvoh' },
        { title: 'Manip 1', ext: P, mb: '2.3', year: 2023, fid: '1IQPePXW9Qr-ewDO-qENf7vCo8mKXPydg' },
        { title: 'Manip 2', ext: P, mb: '0.6', year: 2023, fid: '1GWzZF-CH5VgTRvkzw4GNqkZQT7tnDMXQ' },
        { title: 'Manip 5', ext: P, mb: '1.1', year: 2023, fid: '1S0-zp26tXn5J4bxWwZmCJswJyNVQQzIY' },
        { title: 'Guide de tp biologie végétale', ext: P, mb: '1.6', year: 2022, fid: '1bcDhWjHPJIigGBzVSccvF6Ver9_N1SsO' },
      ],
    },
  ],
};

export const TN_PCEP2_CHIMIE_MINERALE = {
  id: 'tn-pcep2-chimie-minerale', promo: 'pcep2', semester: 'S2',
  name: 'CHIMIE MINÉRALE', icon: 'atom', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Chimie minérale',
      subtitle: 'Dr Faouzi Ayari',
      lectures: [
        { n: 1, title: 'Tableau périodique', prof: 'Dr Faouzi Ayari', ext: P, year: 2022, fid: '1grlYpe9luVHetMAfGHNIM5sqEGig5b6d' },
        { n: 2, title: 'Liaisons de faible énergie', prof: 'Dr Faouzi Ayari', ext: P, year: 2022, fid: '1AU80R6hVnG1coNcUhvQHeNDOoLZx51gS' },
        { n: 3, title: 'Nomenclature', prof: 'Dr Faouzi Ayari', ext: P, year: 2022, fid: '1yX7yE9MoFXd2ZpHyHpDTcYMRRHDCI_Wi' },
        { n: 4, title: 'Introduction cristallographie', prof: 'Dr Faouzi Ayari', ext: P, mb: '2.3', year: 2022, fid: '1qk7lCn352AO5N7hayRz6dzDYw8dQ9pWw' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Chimie Minérale — 2024-2025', ext: P, mb: '8.7', year: 2025, fid: '1AdakBhyF-stYNueH5Q1UwFGkntJegLs3' },
        { title: 'Min�rale 24 Full — 2023-2024', ext: P, mb: '5.2', year: 2024, fid: '1H5eiV3wF5OJuhEZlushyPDNI3iZ-D2Wp' },
        { title: 'Minérale 2023 7 février — 2022-2023', ext: P, mb: '8.1', year: 2023, fid: '16alvHRHxcV_FxQf3PXSsR-naQFhL-IqI' },
        { title: 'Version Etudiant — 2020-2021', prof: 'Pr Chedly Boudokhane', ext: P, mb: '3.6', year: 2021, fid: '1DX-TW82mSsgBaIFUvzCUBrCKG-DWCAfK' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Cristallographie', ext: P, mb: '0.2', year: 2024, fid: '1qHiOFVQJ5Hr-HZrLSUnIIjPzOJSvXIXu' },
        { title: 'Fiche Liaisons de faible E', ext: P, mb: '0.6', year: 2024, fid: '1HqRkT2m5HwSzJQ8TLLqwR_IWjxgu7_ZY' },
        { title: 'Fiche Tableau périodique moderne', ext: P, mb: '1.2', year: 2024, fid: '1BsyC2Rb3CeyOHAWREpJU2bHeyjvQf44k' },
        { title: 'Résumé 1 CM', ext: P, mb: '0.1', year: 2024, fid: '12o2REGc6yg-WTkqLu860abCC9gXyy-mR' },
        { title: 'Résumé 2 CM', ext: P, mb: '0.6', year: 2024, fid: '1VYnRi6evH6MFRKQMcD4W0zwn1bJ0zdO5' },
        { title: 'Résumé 3 CM', ext: P, mb: '0.1', year: 2024, fid: '13Aohr9Oo5oSCkCtY6txM2-wQIyfLv_F4' },
        { title: 'Résumé 4 CM', ext: P, mb: '0.2', year: 2024, fid: '1rEGDgLu49HCHLReSL73wn7QOAd3QQfSt' },
        { title: 'Résumé 4 CM', ext: P, mb: '0.5', year: 2024, fid: '1TkvuNB1Zx8OE2QENuyq-7BnLp7l5b1MY' },
        { title: 'Résumé 4 CM', ext: P, mb: '0.4', year: 2024, fid: '1dDb6gLCL7QaUXK8oWT8gUZEEfbEA_AIz' },
        { title: 'Résumé 5 CM', ext: P, mb: '0.3', year: 2024, fid: '1R20ZUgsrenf7rEQVqViduFICp2Xrx7Ef' },
        { title: 'Resumé minerale', ext: P, mb: '2.3', year: 2024, fid: '16WWZ-UPqC-6Yg8v7c2YBO_2KvjbWLbQX' },
        { title: 'Résumé Cristallo', ext: P, mb: '0.5', year: 2021, fid: '1vHWbYyvfcCOt8v-fF8Jt64Rpj2m4a4np' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Ann prin s2 chimie minerale', ext: P, mb: '0.1', year: 2026, fid: '17yXWiwQBTzASjzZv6EOQPY6xiZ087MfS' },
        { title: 'Chimie Minérale Correction P', ext: P, mb: '0.9', year: 2024, fid: '1BabUYePSOYpuJjvjFE16LEpOfPfA9U1P' },
        { title: 'Correction Epreuve Chime Minérale Pharmaceutique session Mai', ext: P, mb: '0.8', year: 2025, fid: '1VTyR-9bSoYPT0Jwcv74_Y21FbZnV4Cbx' },
        { title: 'Correction Epreuve Chimie Minérale Pharmaceutique Session de rattrapage Juin', ext: P, mb: '0.5', year: 2025, fid: '1wCqVsJMpOXCWmo83jLNSpmpNowcdavZH' },
        { title: 'Correction Mineral P', ext: P, mb: '1.5', year: 2023, fid: '1x5uDhZA7u4Aqe0ef3uPJTndivKs7QtUs' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Série 1 Minérale', ext: P, mb: '0.6', year: 2025, fid: '1SwWys2dC2PpPxHRh2eAkY_C1emNUm352' },
        { title: 'Série 4 Minérale', ext: P, mb: '1.0', year: 2025, fid: '1hgwatEIyL2NFFFRV-EfxjaMDSDBACUSt' },
        { title: 'Séries 2 et 3 Minérale', ext: P, mb: '0.8', year: 2025, fid: '1oQbbLBlDkm1qC7mE3Rj3NJaNwVhrbVdZ' },
        { title: 'TD CH.MIN M3 TD Min�rale', ext: P, mb: '1.6', year: 2024, fid: '1O53KI8Ou7P0gKNLC-WT0pRUbUUnbtH3W' },
        { title: 'S�rie 1 Min�rale', ext: P, mb: '0.9', year: 2024, fid: '1LNOsOPyyBJlKTgej2lmAJf8Cyecu6hQC' },
        { title: 'S�rie 2 Min�rale', ext: P, mb: '0.7', year: 2024, fid: '1pec2mqBvZ_w3qvXuNt186eIwpsty3-r2' },
        { title: 'S�rie 3 Min�rale', ext: P, mb: '0.6', year: 2024, fid: '1WL6X-POqDqpPATOVnNixvnrbFxQzi_hl' },
        { title: 'S�rie 4 partie 1', ext: P, mb: '1.6', year: 2024, fid: '1iadvEFjdp2wQQc4Jdw12g2bsEvdW_WzV' },
        { title: 'S�rie 4 partie 2', ext: P, mb: '0.8', year: 2023, fid: '16w6oPe0rk7mtF17-8-is_ldeS5d3PSW6' },
        { title: 'S�rie 5 Min�rale', ext: P, mb: '1.1', year: 2023, fid: '1gWSEw5ThOMBxxYeglVHhrsuo5Bo5oxn_' },
        { title: 'Correction Série 1 Minérale', ext: P, mb: '1.3', year: 2023, fid: '1NOgwGfpyH3uvaGL6U-uJxvxJbEnhgeIy' },
        { title: 'Correction Série 2 Minérale', ext: P, mb: '0.9', year: 2023, fid: '1MtCYnVz_U15-ohwmADwVArh0EczokqpX' },
        { title: 'Correction Série 3 Minérale', ext: P, mb: '0.8', year: 2023, fid: '1NXaxrRfr9MwXzLnLxVeYTSii5wYNG7_V' },
        { title: 'Correction Série 4 Minérale', ext: P, mb: '2.1', year: 2023, fid: '1NhEXnbY6gOtqqV2-HNvB55_lnoIaeODb' },
        { title: 'Correction série 5 Minérale', ext: P, mb: '1.1', year: 2023, fid: '1Y9pqThMNfOmv8828Fhmjvyt5N78muihY' },
        { title: 'TD Minérale', ext: P, mb: '0.7', year: 2023, fid: '16Xp8-bscEvK1Tuim4av7vOdX1wfMH4YF' },
        { title: 'Correction Série 1', ext: P, mb: '2.9', year: 2022, fid: '1y4VcRO_o-0Jul1w21zRlvIdFk-lG3XTc' },
        { title: 'Correction Série 2', ext: P, mb: '1.6', year: 2022, fid: '1js0JKwWXu7pm2NK6nekgCmDQMq1wnMP_' },
        { title: 'Série 1', ext: P, mb: '1.2', year: 2022, fid: '1kRADrdsEY4R7ZZEKE3e62i9o-9atUMpN' },
        { title: 'Série 2', ext: P, mb: '1.9', year: 2022, fid: '1bifLFiwwFwSkEaDY6bZj-wV5vtcVPOtv' },
        { title: 'Correction Série 3 Mr AYARI Faouzi', ext: P, mb: '1.0', year: 2021, fid: '1uhwp_NYTnrHk_hZ94zUFNPjg1BJJdiiw' },
        { title: 'Correction Série 3 Mr BOUDOKHANE Chedly', ext: P, mb: '1.5', year: 2021, fid: '1UwkJnO6T-SbNjOQi1O9JXhR9agtw2pXI' },
        { title: 'Série 1', ext: P, mb: '0.2', year: 2021, fid: '1qN9NjB9yVxQkpkm_R4kFT-o3InQca9nM' },
        { title: 'Série 2', ext: P, mb: '0.2', year: 2021, fid: '1wRA-30RTLOqV6x4QVnPcVWCOet17JS6w' },
        { title: 'Série 3', ext: P, mb: '0.2', year: 2021, fid: '1yGUnKSBPxi8J6uH8Bfw4Y5YTaY1enNg7' },
        { title: 'TD cristallographie Pr.BOUDOKHANE Chedly', ext: P, mb: '0.8', year: 2021, fid: '1IZP7KDnixfNGeAUyA-FAk3v-osBRpUvi' },
      ],
    },
  ],
};

export const TN_PCEP2_CHIMIE_ORGANIQUE = {
  id: 'tn-pcep2-chimie-organique', promo: 'pcep2', semester: 'S2',
  name: 'CHIMIE ORGANIQUE PHARMACEUTIQUE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Chimie organique pharmaceutique',
      lectures: [
        { n: 1, title: 'CH.ORG-M3-cours ch orga 2eme-23-24 -codifié avec cartouche', ext: P, mb: '6.5', year: 2024, fid: '1o3JmrJ4pkSobFb88tdpSmE5yj3JJ22n3' },
        { n: 2, title: 'Chap-II', ext: P, mb: '1.8', year: 2024, fid: '12L5uXqw3Syp0wlZM4zGNUIWHo48EYjpa' },
        { n: 3, title: 'Diapositives 1', ext: P, mb: '0.5', year: 2024, fid: '1NPxDsePZ-JxM0loJpV_IAOqV_XFoyp69' },
        { n: 4, title: 'Diapositives 2', ext: P, mb: '0.5', year: 2024, fid: '1m-22DkBaNbQfkvg-6-kcXmmqVUvkLbgv' },
        { n: 5, title: 'Diapositives 3', ext: P, mb: '0.6', year: 2024, fid: '1By7-HBPx3pdN_KHBn5ZSDvl44uA3u5kj' },
        { n: 6, title: 'Diapositives 4', ext: P, mb: '0.8', year: 2024, fid: '1sONU53K5JygMFaNBUSPt6rPaqOc1tU8H' },
        { n: 7, title: 'Diapositives 5', ext: P, mb: '0.3', year: 2024, fid: '1pbVpWAlXNFS7L52TgyHA0jGpkOo-NcV4' },
        { n: 8, title: 'Diapositives 6', ext: P, mb: '0.2', year: 2024, fid: '1UzcGkO19sujlszRz8Ob-w5lcxKXDU07R' },
        { n: 9, title: 'Diapositives 7', ext: P, mb: '0.6', year: 2024, fid: '1w1X-qL6tPrDMSPZXIai2WCBNzgmAj7ma' },
        { n: 10, title: 'Diapositives 8', ext: P, mb: '0.6', year: 2024, fid: '1PVcIIzQFb6I00muhLqXmP0h2HZbZnoC1' },
        { n: 11, title: 'Diapositives 9', ext: P, mb: '0.1', year: 2024, fid: '11U-VwhkxqUKYvX9RsTMorSKsg-K197C2' },
        { n: 12, title: 'M et N 10éme séance', ext: P, mb: '16.3', year: 2024, fid: '17wrYosWRpRddit0CsVPPq9oxdZ72UFf8' },
        { n: 13, title: 'M et N 11éme séance', ext: P, mb: '12.4', year: 2024, fid: '1Ifl3R4BpHVj3IFFTRPvXfYFF98SUp2Uu' },
        { n: 14, title: 'M et N 12éme séance', ext: P, mb: '7.1', year: 2024, fid: '1PqGu1x6kl94HpR_JYeaw7xgead4CEfCb' },
        { n: 15, title: 'M et N 1ére séance', ext: P, mb: '0.6', year: 2024, fid: '1v7IRDjJ6tDeXeu73X3CeY6VXan_oiDu4' },
        { n: 16, title: 'M et N 2éme séance', ext: P, mb: '7.0', year: 2024, fid: '1pSOg5HRWvETCoKMTNfoTeo44-0dPRs5a' },
        { n: 17, title: 'M et N 3éme et 4éme séances', ext: P, mb: '6.5', year: 2024, fid: '1oNblZJHLwUykqSb8cKtfJULMPyJ-tRRe' },
        { n: 18, title: 'M et N 5éme séance', ext: P, mb: '3.6', year: 2024, fid: '1bJX6qrqhdPv3_GaCUGS9sY6b1_mVAwGl' },
        { n: 19, title: 'M et N 6éme séance', ext: P, mb: '4.8', year: 2024, fid: '1LRtDGMC39iYij66sQSNyq-cVt5Ajxjlo' },
        { n: 20, title: 'M et N 7éme séance', ext: P, mb: '6.7', year: 2024, fid: '1PNVLITxjwpttM8ox_mMpL25z84_2CksO' },
        { n: 21, title: 'M et N 8éme séance', ext: P, mb: '9.0', year: 2024, fid: '17E5oljMqDXjlYBqq8xCkWfUGDXCMfQBK' },
        { n: 22, title: 'M et N 9éme séance', ext: P, mb: '8.1', year: 2024, fid: '1TwkjSxhcXWbJ4TLURoJYiBLZ2et5sFjX' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Fascicule de cours de chimie organique — 2022-2023', ext: P, mb: '5.0', year: 2023, fid: '1TZ2wCHmbmOq1HJD1_UhphmIVFeYKMIUq' },
        { title: 'Les Hydrocarbures Aromatiques — 2021-2022', prof: 'Pr Jamil Kraiem', ext: P, mb: '1.4', year: 2022, fid: '1KsoRFt4lXITjMOvW634N_YTlEc7Xb5Z3' },
        { title: 'Résonnance Magnétique Nucléaire — 2021-2022', prof: 'Pr Ag Donya Ghedira', ext: P, mb: '3.2', year: 2022, fid: '1XJqpv0dnojpZbhRkPOmwZx3dr0MqTe2G' },
        { title: 'Infra-rouge — 2021-2022', prof: 'Pr Ag Donya Ghedira', ext: P, mb: '1.6', year: 2021, fid: '16Rrr9p-MJT4UaFQy9djwH1Eiu-XoRHWI' },
        { title: 'Les Aldéhydes Et Les Cétones — 2021-2022', prof: 'Pr Jamil Kraiem', ext: P, mb: '1.7', year: 2022, fid: '1ButuZj9xbEM27NpuZWD7tnzfaI5QOAux' },
        { title: 'Hétérocycles aromatiques — 2021-2022', prof: 'Pr Jamil Kraiem', ext: P, mb: '0.8', year: 2022, fid: '16Hys0qBv_j2JRMoi6vKEmmCspjEMP1PJ' },
        { title: 'CHAPITRE III + IV support — 2021-2022', prof: 'Pr Jamil Kraiem', ext: P, mb: '1.0', year: 2022, fid: '15luFgFHx499BShuj1BLtD2TgUozkxmoM' },
        { title: 'Hydrocarbures Aromatiques — 2020-2021', prof: 'Pr Jamil Kraiem', ext: P, mb: '1.9', year: 2021, fid: '1WAd9Ihasyuj2ixoll-LC9lokkbiq1DN9' },
        { title: 'Partie1: La Résonnance Magnétique du proton — 2020-2021', prof: 'Pr Donya Ghedira', ext: P, mb: '1.7', year: 2021, fid: '1GFC2OCa-3KJ-ZZsZ3KhMPql36jOUuJ4P' },
        { title: 'Partie2: La Résonnance Magnétique du Carbone — 2020-2021', prof: 'Pr Donya Ghedira', ext: P, mb: '0.4', year: 2021, fid: '1wP1rc23jtSPJbHTI-Pqg6lwY1lq6fud9' },
        { title: 'Aldéhydes et Cétones — 2020-2021', prof: 'Pr Jamil Kraiem', ext: P, mb: '1.7', year: 2021, fid: '1zNpArs3Ne-26PqGz_PxThYxsBUte_cxh' },
        { title: 'Sectroscopie IR — 2020-2021', prof: 'Pr Donya Ghedira', ext: P, mb: '1.3', year: 2021, fid: '1Qcg2brO2zOmGLQnRSXKmETN9kCUpUaS-' },
        { title: 'CH3+4: Acides Carboxyliques et Fonctions Dérivées — 2020-2021', prof: 'Pr Jamil Kraiem', ext: P, mb: '0.5', year: 2021, fid: '1o2BrQC-gjz9nyBRTsBgLX9SQLglLh49M' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Compléments sur les acides carboxyliques et dérivés', ext: P, mb: '3.8', year: 2024, fid: '1_eeJ01IlKBGYtfqKi5f96kliwqeMpRDq' },
        { title: 'Les aldéhydes et les cétones', ext: P, mb: '14.7', year: 2024, fid: '1rLlHDD2L71eH0hwWSAoZ7XXZ7VXv5MtI' },
        { title: 'Les hétérocycles aromatiques', ext: P, mb: '9.7', year: 2024, fid: '1syApFWNPiYdWzgHFnNMgMtDvwHe78B_s' },
        { title: 'Les hydrocarbures aromatiques', ext: P, mb: '11.5', year: 2024, fid: '1beBqWHzAXIIKlZSou2flYYBfVRCrVskW' },
        { title: 'Mécanismes proposés par Pr Chriaa Najeh', ext: P, mb: '4.8', year: 2024, fid: '1c9OAAVaVE25An2EZMFMTxSgUAnhhjsgC' },
        { title: 'Résumé chimie organique 2éme', ext: P, mb: '2.3', year: 2024, fid: '1EQJd7mMWytTOYPly88ElsUhS_-GD23wP' },
        { title: 'Résumé IR', ext: P, mb: '2.3', year: 2024, fid: '1t0IW2N2Szus1cytZuBubzWYKbiZCl1zv' },
        { title: 'Résumé les Aldéhydes et Cétones', ext: P, mb: '1.4', year: 2024, fid: '1byZomteGUsFVEjcwgRY2-FwFV62o7iau' },
        { title: 'Résumé les hydrocarbures aromatiques', ext: P, mb: '5.0', year: 2024, fid: '1aMNUH0zuIOxwMNqshA7PiOOL2XWomJTZ' },
        { title: 'Résumé RMN', ext: P, mb: '2.1', year: 2024, fid: '1XkEjoHr0TXjHywr55wJMXAd-fXIePlAk' },
        { title: 'Synthèse et réactions des composées ẞ dicarbonilées', ext: P, mb: '5.8', year: 2024, fid: '1Tb8xjI_Vz7I3aSXejf3XnNVcBJoGrTPv' },
        { title: 'Toutes les réactions et tous les mécanismes à retenir', ext: P, mb: '4.7', year: 2024, fid: '1Sj3thm78ptNCcqz5xQNKnqKBw4mjvSrZ' },
        { title: 'Introduction à la synthèse organique', ext: P, mb: '3.8', year: 2023, fid: '1HIldfCL8EjpEUO5bHK1LJp_Q1d8kDCAD' },
        { title: 'Aldéhydes et Cétones', ext: P, mb: '0.3', year: 2021, fid: '1oBP8Pamz6Xwbq_9zTTIo5KWAQ4uEpd2B' },
        { title: 'Aldéhydes et Cétones', ext: P, mb: '0.1', year: 2021, fid: '1_j46MybUm1qQFUO6Ed6uNpqX9w3ZJYn3' },
        { title: 'Hydrocarbures Aromatiques', ext: P, mb: '0.3', year: 2021, fid: '1PF6rwvbb4kRQVLjclok4quFxMwLA5HvZ' },
        { title: 'Mécanismes by Dr. Najah CHRIAA P1', ext: P, mb: '2.9', year: 2021, fid: '1r2PwRMxcrq30DPvTg06EVDeq3R-9sdbc' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Correction CH,Org P', ext: P, mb: '0.8', year: 2023, fid: '1TEGuURUeZ05t5x4oNyYzRN7uxEkarFKs' },
        { title: 'Correction chimie organique P', ext: P, mb: '4.9', year: 2021, fid: '1mRt3PjBmsKbY3cn5eGuLxP4gEQJ01SQ9' },
        { title: 'Correction principale chimie organique', ext: P, mb: '3.4', year: 2020, fid: '1n-9haBb0Mhcx8JGMffrX3O7OupjWQNBO' },
        { title: 'Prin s2 chimie organique', ext: P, mb: '0.1', year: 2026, fid: '1k9_yFGKson6XoNmcN2T0xzZFzRXzbCV_' },
        { title: 'Rattrapage 2026 CH,ORG', ext: P, mb: '3.0', year: 2026, fid: '1Xzj2jPt6BIXbhgg1R20_OR0UnCXjw7_y' },
        { title: 'Correction principal', ext: P, mb: '4.9', year: 2021, fid: '13I6-Uxoo_Kgvz9E_Na-sXpLcL4c9XO1_' },
        { title: 'Correction principale', ext: P, mb: '0.8', year: 2023, fid: '1yB4rw_HXTxZQB4wdePDpzvgl2mr6BwCt' },
        { title: 'Correction principale', ext: P, mb: '3.4', year: 2020, fid: '10jNQEWzX1VuQKQmhuv_sa5CslEayshpQ' },
        { title: 'Correction principale 2021 partie pr Donia', ext: P, mb: '1.5', year: 2021, fid: '10slFS5RzO7l2WzlNiT0dpEhBs4D1Wbt3' },
        { title: 'Réponse sur question c1 exam principal', ext: P, mb: '0.1', year: 2023, fid: '11Bib3yfnI0aKyyx87Qz4FBabQ2QRCMU1' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Calcul de nombre d’instauration facile', ext: P, mb: '0.1', year: 2024, fid: '1zmqVPhYspqxV2xCqgCeLtoLOe8_J2vXD' },
        { title: 'Complément de correction Série 1 et 2', ext: P, mb: '0.3', year: 2024, fid: '1dDxchCxjXMCDC0C4YYW0kCoZj8GeJp2I' },
        { title: 'Correction exercice 2 de la serie 9', ext: P, mb: '0.5', year: 2024, fid: '1-OSyNpw9R4Are25jTaBlUNACV8vs4UcB' },
        { title: 'Correction Mme Najeh', ext: P, mb: '7.9', year: 2024, fid: '1S_sFrDmQeHNnzZZsO-0oz4GscAjwpS2v' },
        { title: 'Correction série 1 et 2 (ex 3 et 2)', ext: P, mb: '0.5', year: 2024, fid: '11VMih4QP6EkHzquS7jAUh6bo0Eeg8t9N' },
        { title: 'Correction serie techniques spectroscopiques', ext: P, mb: '0.7', year: 2024, fid: '1dFgXtzKbxziRW9wvilkPDfrBPq2K-w-I' },
        { title: 'Correction TD 1 ex1', ext: P, mb: '3.3', year: 2024, fid: '10-tlcMVlqOgfGg-90T-NCf7RFrKpNqI2' },
        { title: 'Correction TD 1 ex3', ext: P, mb: '1.0', year: 2024, fid: '1CVDt-eIYqBzmbx3HDlAbO2L_smRBe1Pv' },
        { title: 'Correction TD 10 mme Najeh', ext: P, mb: '3.4', year: 2024, fid: '1NMlLh1r1tC3W-Fb3I-BK74WGhXKBbOg9' },
        { title: 'Correction TD 3', ext: P, mb: '2.3', year: 2024, fid: '1P5gcSqYstIHV3jhf1Y5uR2ZAJYcgour-' },
        { title: 'Correction TD 8 Mme Najeh', ext: P, mb: '2.9', year: 2024, fid: '1K0V5meZxhVMoHpWkJBJN36IgBDwCKbhI' },
        { title: 'Correction TD 9 Mme Najeh', ext: P, mb: '4.2', year: 2024, fid: '1K52ZHVjK8QoD71PW6oRs10Z4WiWRlYoi' },
        { title: 'Correction TD-4', ext: P, mb: '7.1', year: 2024, fid: '13SEp3B-8nC3SAKsQxTB0uGj21kxDt70V' },
        { title: 'Correction TD-5', ext: P, mb: '1.6', year: 2024, fid: '1G7iVnAmfnZDTaaVKN3M45Bj564WWMy9S' },
        { title: 'Correction TD-6', ext: P, mb: '3.3', year: 2024, fid: '1sci1XrsV3fPyOPLSQdAET5btOlweVhk0' },
        { title: 'Correction TD-7', ext: P, mb: '4.9', year: 2024, fid: '1GqaFR-6GYvBObxZFd2-EZur97vP3zAjX' },
        { title: 'Correction TD-8', ext: P, mb: '4.7', year: 2024, fid: '1Gr4WkbtKjOw0kKKTuuqKN_RXpXm2seUR' },
        { title: 'Correction-TD-2-ex(1 3)', ext: P, mb: '3.9', year: 2024, fid: '1K8GLxgl_DsDsdwmkAEiZJNciybIIzk8d' },
        { title: 'Série 1 EX 2', ext: P, mb: '0.5', year: 2024, fid: '18Jw-wQV0PYVpCe_Ax2qk0FguzkA4xOdB' },
        { title: 'Série 2 - Correction exercice N°1', ext: P, mb: '0.4', year: 2024, fid: '1rKG7XTkPI_XuHbsBlOUFiwl0znbUU5eQ' },
        { title: 'Correction serie 1 organique', ext: P, mb: '0.9', year: 2023, fid: '1MERVERUe8_mkvfNjG8l8cznii-027qWj' },
        { title: 'Correction serie 10 organique', ext: P, mb: '0.6', year: 2023, fid: '1DV5qUYIHGDTY9QUQTzhHUheeOZNsdoWv' },
        { title: 'Correction serie 2 organique', ext: P, mb: '1.0', year: 2023, fid: '1xbbKl_yg1TVKAqVUWIjzvqA2Ah3DO_dR' },
        { title: 'Correction serie 3 organique', ext: P, mb: '0.6', year: 2023, fid: '1hhRiBykBDJipmOkckIX9PLfSNy_hDN9L' },
        { title: 'Correction serie 4 organique', ext: P, mb: '0.9', year: 2023, fid: '1Zrb7T-os_eiISJHXBdHyOh47duFfvhx4' },
        { title: 'Correction serie 5 organique', ext: P, mb: '0.5', year: 2023, fid: '1Ct82GrhIs2N01WztwVq792zhb4R70qx6' },
        { title: 'Correction serie 6 organique', ext: P, mb: '0.5', year: 2023, fid: '1baJDKxBrsa6Fuo6H9c91rr19Fp6pISLk' },
        { title: 'Correction serie 7 organique', ext: P, mb: '0.5', year: 2023, fid: '12U51lIBpgTGESKi2aoPLdmMU4TQrn0m_' },
        { title: 'TD ch orga s2', ext: P, mb: '1.1', year: 2023, fid: '1iSFbhZwF5lFxw_Fk65ZwhAMKgVCsEa5u' },
        { title: 'Correction Série 1', ext: P, mb: '3.6', year: 2022, fid: '12e2mSZfhzEtq97h0Azyl-xG-DHSXuT3w' },
        { title: 'Correction Série 2', ext: P, mb: '2.2', year: 2022, fid: '1UonJrYi0gZNc6iRqVIHTqcu7XChRKpYG' },
        { title: 'Correction Série 3', ext: P, mb: '1.3', year: 2022, fid: '1rOQDYWaoMwcC0HbPl5s6bTgQctSFOZJN' },
        { title: 'Correction Série 3 Mme Najeh', ext: P, mb: '8.2', year: 2022, fid: '1gCarxE_S_pBAb-9eqUuSQv-fXLCvWch2' },
        { title: 'Correction Série 4 Ex 1', ext: P, mb: '1.2', year: 2022, fid: '1rqIRl8FrQdfwPibQWLmgM5nJyBrYN3eW' },
        { title: 'Correction série RMN et IR', ext: P, mb: '2.7', year: 2022, fid: '1Gf7ocFI4w08ipjHFVCzyg8vAy782QFmQ' },
        { title: 'Série 1', ext: P, mb: '0.7', year: 2022, fid: '1bvIRq0tazizLw1TLiOHU_Syy5_AouZdY' },
        { title: 'Série 2', ext: P, mb: '1.0', year: 2022, fid: '1eVqq0VVSJ8evkLTUIFQd9F4c6NfG9g4x' },
        { title: 'Série 3', ext: P, mb: '0.6', year: 2022, fid: '1MXG1bykvuYwZT9h-fqj9QAZDZHQdhISA' },
        { title: 'Série 4', ext: P, mb: '1.4', year: 2022, fid: '1cLu4ZYZnle0DAmdThiDwp7NlMsnriSP-' },
        { title: 'Série RMN et IR', ext: P, mb: '2.2', year: 2022, fid: '1N91YZ567S9v4vX0kT_P8rNXjATXfYvdO' },
        { title: 'Suite Correction Série 4', ext: P, mb: '4.8', year: 2022, fid: '1uOjSDEfbXLgt9GWPfS4uTT2xGPdO8fAS' },
        { title: 'Applications RMN et exercices corrigés', prof: 'Pr Donya Ghedira', ext: P, mb: '0.9', year: 2021, fid: '1H-UGqg_tN1Iu1VaGw58sQR8RTHAWTVMP' },
        { title: 'Correction séries techniques spectroscopiques', ext: P, mb: '0.7', year: 2021, fid: '1RNmYPoDq19sYImNsRXmRzR_8r38pVnAm' },
        { title: 'Correction td 1', ext: P, mb: '3.6', year: 2021, fid: '1y3IDWHm7jTaQfiClWM4LHzRy4u2i5tdK' },
        { title: 'Correction td 2', ext: P, mb: '4.5', year: 2021, fid: '1SWLZ4AyE-GZGf4TQyLJ39XyavEavRcsd' },
        { title: 'Série Techniques spectroscopiques', ext: P, mb: '0.9', year: 2021, fid: '1NKIoL5gPWdLTR7OzYlgeII3_pdcFDwen' },
        { title: 'Td 2018/2019', ext: P, mb: '2.5', year: 2019, fid: '158QI5AePl7HNKcEvg5CXMu3mac3M8tMr' },
        { title: 'TD1', ext: P, mb: '0.2', year: 2021, fid: '1sP09lXwMM66hFjDwapcc_7kJ9nUdJO87' },
        { title: 'TD2', ext: P, mb: '0.3', year: 2021, fid: '1ZNwISByBi-CxwhAhZHo7BOM_UauhyhG8' },
        { title: 'TD3', ext: P, mb: '0.2', year: 2021, fid: '1LPWHXRGtvCp4nXtkHvDZFVJhIPS_4CLt' },
        { title: 'TD4', ext: P, mb: '5.4', year: 2021, fid: '14884hqM_dr-SvnCgF3CUi_D4FNAykmra' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Comptes rendus complets', ext: P, mb: '8.7', year: 2024, fid: '1G3IeijpVn_gocTh1HGDlUlaXf3m6p1CU' },
        { title: 'Manip 1 organique', ext: P, mb: '0.5', year: 2024, fid: '1F5D2qy9hdkQQwnxOZMvO1PDBjyoypWf3' },
        { title: 'Manip 3 organique', ext: P, mb: '2.3', year: 2024, fid: '1ArQqjjdHutBaArnIMIiZek2zeDOYXCOd' },
        { title: 'Manip 4 organique', ext: P, mb: '0.7', year: 2024, fid: '1H6edK_NgiV5AtGIkan_CKnKi6t1UMvk6' },
        { title: 'Manip 5 organique', ext: P, mb: '1.0', year: 2024, fid: '1AvzvJyYiZ6coH9rLy_jbxuoPo8mHsbXp' },
        { title: 'Manip 6 organique', ext: P, mb: '0.7', year: 2024, fid: '1AyUhhbiQ1VIPcIdJjkMl8BP4J2DlCt-j' },
        { title: 'Manip 7 organique', ext: P, mb: '1.1', year: 2024, fid: '1B2h39dOuvaxC98TUSH4--6ctw5LURILb' },
        { title: 'Annexe tp organique', ext: P, mb: '5.4', year: 2023, fid: '119xu8J8Y4Rd_DBywxLGz9nm-4eW4KlQK' },
        { title: 'Fascicule tp', ext: P, mb: '5.8', year: 2023, fid: '1IQR9dN5JHqNzVwenCTkJQfilhfMfSq9K' },
        { title: 'Guide TP chimie organique', ext: P, mb: '1.6', year: 2022, fid: '17SWmxtSqlm14R6e6CrjrjmshNQAOB2hp' },
      ],
    },
  ],
};

export const TN_PCEP2_IMMUNOLOGIE = {
  id: 'tn-pcep2-immunologie', promo: 'pcep2', semester: 'S2',
  name: 'IMMUNOLOGIE ET IMMUNO-ANALYSE', icon: 'shield', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Immunologie et immuno-analyse',
      lectures: [
        { n: 1, title: 'Introduction àImmunolgie Pharmacie WSAKLY ensiegné', ext: P, mb: '7.4', year: 2024, fid: '14dcaDrf-hmtlgUR-EwdVBxeFJjSY5BZ5' },
        { n: 2, title: 'Réaction Antigène-anticorps', prof: 'Pr Mlayeh Sarra', ext: P, mb: '1.6', year: 2024, fid: '12EphKhpRUDY7FpU0qthN_DrmSnj5_GS2',
          versions: [
            { title: 'Réactions antigène-anticorps utilisant le complément', prof: 'Pr Mlayeh Sarra', ext: P, mb: '0.3', year: 2024, fid: '1_YqNX2MxS9QXwht9vlYOBkEtxU1s76RF' },
          ] },
        { n: 3, title: 'IMMUNO-M6-Support de cours immunologie', ext: P, year: 2024, fid: '1evTsHj5cNtVI159M1Y3NV3vPuTp2LURD' },
        { n: 4, title: 'Organes Lymphoides Pharmacie WSAKLY ensiegné 21.01.26 envoyé étudiants', ext: P, mb: '6.2', year: 2024, fid: '1eF48BIwMGu8nMgMiG1oWhKx9iFLpN3qL' },
        { n: 5, title: 'Réactions multimoléculaires formant réseau', prof: 'Pr Mlayeh Sarra', ext: P, mb: '2.2', year: 2024, fid: '1Cgc22xWo6w2ZgwfvEVS9j124-_jK7MXw' },
        { n: 6, title: 'DImmunolgie IL Cytokines Pharmacie enseigné 28.01.26 envoyé étudiants', ext: P, mb: '4.7', year: 2024, fid: '1HasLkHCP3G856MDoz9MY8PlNQBGHMLbM' },
        { n: 7, title: 'Réactions monomoléculaires utilisant un traceur', prof: 'Pr Mlayeh Sarra', ext: P, mb: '0.8', year: 2024, fid: '169_srw_SZtD4wVjK-_68WCpyUA_EHMoA' },
        { n: 8, title: 'Cellules de limmunité-2eme année', ext: P, mb: '4.5', year: 2026, fid: '1M3Y8y3AC8gAwEDh-gEU6b_DOcLp6nXam' },
        { n: 9, title: 'Techniques Immunologiques de purification et d analyse de l antigène', prof: 'Pr Mlayeh Sarra', ext: P, mb: '1.0', year: 2024, fid: '1lQRXrzK7V5rVUFMqV1le3d9Dxz6cPqMM' },
        { n: 10, title: 'Immunoglobulines-2eme-année', ext: P, mb: '4.2', year: 2026, fid: '1yX6yqHiueUsApzYA0XQ06Vc8CKJUe-0X' },
        { n: 11, title: 'Les-Antigènes-2eme-année', ext: P, mb: '1.8', year: 2026, fid: '11_E5Wi2mZ_kDgtZ5iHDpgluVGbtTgHhC' },
        { n: 12, title: 'Immunité innée', ext: P, mb: '3.1', year: 2024, fid: '1HJfcq-SJuH9HNkRMKbFl8_NMulGKmUS8' },
        { n: 13, title: 'CMH', ext: P, mb: '2.2', year: 2024, fid: '1vtmS3UXLZkPsSq4sOIU8UpOVq8xqb3Gr' },
        { n: 14, title: 'Coopération cellulaire 2éme année', ext: P, mb: '3.9', year: 2024, fid: '13wqgixl1nH4hG-Ycnv1f3GJm-4QO5rQI' },
        { n: 15, title: 'Immunité anti-infectieuse', ext: P, mb: '1.8', year: 2024, fid: '1mdPZKfQmXoBuYelcDDg0ZuwgidQy5SxH' },
        { n: 16, title: 'Tolérance', ext: P, mb: '1.2', year: 2024, fid: '1N-IYNkm2Ls1SopaqebSyK5mQ6HEGIQF7' },
        { n: 17, title: 'Immunopath', ext: P, mb: '1.3', year: 2024, fid: '18zTd-1Aqqq9987kGaDNxzTBnl15EDVIH' },
        { n: 18, title: 'Immunothérapie', ext: P, mb: '1.1', year: 2024, fid: '1V2S_yl9lCBsf6AoTCVUsp16X2M-oGvHH' },
        { n: 19, title: 'Antigènes Wiem Lazzem', prof: 'Pr Wiem Lazzem', ext: P, mb: '1.8', year: 2024, fid: '1kSRDCTfwjCVbANXVGVz-bTVnRMRixYCJ' },
        { n: 20, title: 'Coopération cellulaire 2 wiem lazzem', prof: 'Pr Wiem Lazzem', ext: P, mb: '1.5', year: 2024, fid: '1FpmB-1CFcoTQU60wLkIWlqY6o2uDzeGt',
          versions: [
            { title: 'Coopération cellulaire wiem lazzem', prof: 'Pr Wiem Lazzem', ext: P, mb: '2.5', year: 2024, fid: '1BIwXDyMTPEbJ2BIb5Mmu1bYkElBOp1Dt' },
          ] },
        { n: 21, title: 'Dips', prof: 'Pr Ghazouani Ezzedine', ext: X, mb: '0.3', year: 2024, fid: '1MqK_MEbtElU9o72fzGasj_VLkCDLy08s' },
        { n: 22, title: 'Immuno Wiem Lazzem', prof: 'Pr Wiem Lazzem', ext: P, mb: '3.2', year: 2024, fid: '1gs8gVEwX99NzcF1ACCKYmqpeADy7Yl2r' },
        { n: 23, title: 'Immunoglobulines Wiem Lazzem', prof: 'Pr Wiem Lazzem', ext: P, mb: '3.2', year: 2024, fid: '1rn50XRWAn5jncrPdHWUBWMpepN2COc7F' },
        { n: 24, title: 'Immunologie générale HJ', prof: 'Pr Jaidane Hela', ext: P, mb: '6.1', year: 2024, fid: '1qdi_YmMnB43m4KTo5AVJrywUZpLsdwo2' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Aspects fondamentaux — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.3', year: 2023, fid: '1WIwpBhxCR-1_mf4sNLSfyJmoUM_NQzYb' },
        { title: 'Définition et aspects fondamentaux de lagglutination immunologique — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.4', year: 2023, fid: '1Vz1s-QKN07gWchF81qJ-yac4Ni0sm2tt' },
        { title: 'Les bases moléculaires et les propriétés de la réaction antigène-anticorps — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.7', year: 2023, fid: '1VOJA5fPojtVUk2166qlQ8qS4La8ICDMw' },
        { title: 'Les différents types de traceurs — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.5', year: 2023, fid: '1WMWeIzHFFNHPVhHpiCktYNPWE8Ll9Iu0' },
        { title: 'Les méthodes chromatographiques — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.3', year: 2022, fid: '1Wjye1234KUJ4ZAqFwav_PRTWRMUEv0Sa' },
        { title: 'Anticorps polyclonaux et anticops monoclonaux — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.4', year: 2023, fid: '1VRfPVOOAEBEeAlVjq3CEuRSfpTHp0KnV' },
        { title: 'Lélectrophorèse — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.4', year: 2022, fid: '1WaZxhSjTdjVyTfKzZj5jaLdMpT-O6aM_' },
        { title: 'Les dosages avec traceurs — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.6', year: 2023, fid: '1WOuIaDllvKl8bmPaGuXMrWOk08NzNw8h' },
        { title: 'Méthodologie de la réaction dagglutination immunologique — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.6', year: 2023, fid: '1W38UqYm9KDL8_Bx0EVwIGoXCjVk0cVKx' },
        { title: 'Méthodologie et applications de la réaction d’immunoprécipitation — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.8', year: 2023, fid: '1WJ4yADMg3xbkey4XahQus8BIAnFo52xn' },
        { title: 'Applications — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.2', year: 2023, fid: '1W6LDP7Mlcy7GJsa7nuvUtb91B41cBZCW' },
        { title: 'Classification des réactions antigène-anticorps et choix de la technique — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.2', year: 2023, fid: '1VUoALJcsXCR-hA8KXvKQc6vp1frhvSod' },
        { title: 'Séparation des cellules — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.4', year: 2023, fid: '1WlTnGvR0_N8QXTvKiy0yiAxsuTPMBC1e' },
        { title: 'Applications au laboratoire des réactions antigène-anticorps — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.2', year: 2023, fid: '1VZTg-qhVExuPKHK9kG1LxOi3Ur7zuBBD' },
        { title: 'Complet immunoanalyse — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '2.4', year: 2023, fid: '1WouDA9b_dQtulidFSlKu6qVcaCaM5gY2' },
        { title: 'Coopération — 2022-2023', prof: 'Pr Mariem Ghozzi', ext: P, mb: '0.8', year: 2023, fid: '1QcfskEc2edM2BkF1msxmbA8KKkznAZyj' },
        { title: 'Coopération cellulaire 1 — 2022-2023', prof: 'Pr Mariem Ghozzi', ext: P, mb: '3.5', year: 2023, fid: '1cff1qtml1uEx-lSgN_HKZXOCjGvwhMqb' },
        { title: 'Cours Pr N. SAKLY — 2022-2023', prof: 'Pr Nabil Sakly', ext: P, mb: '11.3', year: 2022, fid: '1E5GN4pFwMucaQhNov8TJLVe-kNItecS9' },
        { title: 'Diapos coopération cellulaire 2 — 2022-2023', prof: 'Pr Mariem Ghozzi', ext: P, mb: '1.2', year: 2023, fid: '1QRqGa7-895nNp5jmy2WonJ5QKGBnw-f6' },
        { title: 'Diapos cours cellules de l immunité-Ig et Ag — 2022-2023', prof: 'Pr Mariem Ghozzi', ext: P, mb: '8.3', year: 2023, fid: '1Ej_0CHUljBbskDD0N6g31L1zKFIvD9P1' },
        { title: 'Les antigènes — 2022-2023', prof: 'Pr Mariem Ghozzi', ext: P, mb: '0.7', year: 2023, fid: '1QdFpZxJD9AscW4rBgN5GxwCrJO9tC_66' },
        { title: 'Les cellules de l’immunité — 2022-2023', prof: 'Pr Mariem Ghozzi', ext: P, mb: '2.2', year: 2023, fid: '1QRqDB7tyrq9F1ByHUTZQY8r-qGabkAtT' },
        { title: 'Les immunoglobulines — 2022-2023', prof: 'Pr Mariem Ghozzi', ext: P, mb: '1.4', year: 2023, fid: '1QXrQfvgMIgOnu6wicqk4s0bgxoNUTzKM' },
        { title: 'Les réactions antigène-anticorps utilisant le complément — 2022-2023', prof: 'Pr Sarra Mlayeh', ext: P, mb: '0.3', year: 2023, fid: '1Wm6xMnCPueSkWeXMlwZLmlGqz5qJd6H4' },
        { title: 'Cellules de l’immunité — 2021-2022', prof: 'Pr Mariem Ghozzy', ext: P, mb: '2.4', year: 2022, fid: '1ZBP7snfPuDz8_jb_Mcd7Gj9nAJ0yev0k' },
        { title: 'Immunoglobulines — 2021-2022', prof: 'Pr Mariem Ghozzy', ext: P, mb: '2.8', year: 2022, fid: '1beIvRlmkc2Z-vkhi0JWzcCINpWh2B5QG' },
        { title: 'Antigènes — 2021-2022', prof: 'Pr Mariem Ghozzy', ext: P, mb: '1.3', year: 2022, fid: '1wwfcF6dUZI-Q2EC6ie2ooqxzDdN4fJbg' },
        { title: 'Coopération cellulaire — 2021-2022', prof: 'Pr Mariem Ghozzy', ext: P, mb: '1.8', year: 2022, fid: '19UVITNh-HFKD1zvoXwZ8ggU2ruM-rK70' },
        { title: 'Bases Immunologiques de l’Immuno-Pathologie — 2021-2022', prof: 'Pr Ezzedine Ghazouani', ext: P, mb: '0.6', year: 2022, fid: '15MC5IiUMyQcMVxvZ0R_xdtU2ZlPT6USA' },
        { title: 'Immunologie générale HJ Im innée et CMH — 2021-2022', prof: 'Pr Hela Jaidane', ext: P, mb: '2.9', year: 2022, fid: '1HFWq4eu1ny579M-B4f0yGC5_I3PCd17S' },
        { title: 'Suite CH4 : coopération cellulaire 2 — 2021-2022', prof: 'Pr Mariem Ghozzy', ext: P, mb: '1.2', year: 2022, fid: '1bqJEF7FDo9npOetwRzhrt6RmqhcNdi5K' },
        { title: 'Cours d’immunologie générale Pr Nabil SAKLY — 2020-2021', prof: 'Pr Nabil Sakly', ext: P, mb: '24.9', year: 2020, fid: '19H7bJp96UKqwhiOkM54b4JlkiRqFeCBQ' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé', ext: P, mb: '0.1', year: 2024, fid: '167dn0LNLtuKYBdGUcSSi7CUO7K_xR5R1' },
        { title: 'Résumé', ext: P, mb: '2.1', year: 2024, fid: '1ZQZfnzoTPZcuJI-K5RiCcmAJ1WGB3H9s' },
        { title: 'Résumé', ext: P, mb: '1.4', year: 2024, fid: '1u26zTTxrG-JSqPSCx00m9m17Me1aL8-y' },
        { title: 'Résumé', ext: P, mb: '1.9', year: 2024, fid: '1USEwXmauVQkkZTbX3uHVhSveVtAPTAUc' },
        { title: 'Résumé', ext: P, mb: '0.0', year: 2024, fid: '1Y57NvVs8YqwAhG_n2gAPKqFkoHNY6Yyj' },
        { title: 'Résumé', ext: P, mb: '0.5', year: 2024, fid: '1I1LRVQzbKk6IUxoXeCD-MyE_gHuhviXY' },
        { title: 'Résumé', ext: P, mb: '0.3', year: 2024, fid: '1AcxaWl5WnEHCGQs2T2xKjaWosskfZxGo' },
        { title: 'Résumé 1', ext: P, mb: '0.9', year: 2024, fid: '1P-kzr82u8lsYOIUka2Fuk5ay3VNSEK7p' },
        { title: 'Résumé 3', ext: P, mb: '1.4', year: 2024, fid: '1ra5dw812_etLts_NFjs3zr7VcjMj9p0t' },
        { title: 'Résumé 4', ext: P, mb: '2.1', year: 2024, fid: '1mybXh8d8LGguXq4_FtRcPVxDTRSPMOMr' },
        { title: 'Résumé 5', ext: P, mb: '1.2', year: 2024, fid: '1t16p3bhGcWoaLY4RPykY1ATSl81Svzjt' },
        { title: 'Résumé 6', ext: P, mb: '5.1', year: 2024, fid: '1cIRKXTLby7fwqK-YIYhRGEnVVo_q4Msz' },
        { title: 'Résumé 7', ext: P, mb: '0.0', year: 2024, fid: '193hLaB-AiekXkAnXNjT2F-xksabFOEH1' },
        { title: 'Résumé 8', ext: P, mb: '0.0', year: 2024, fid: '1JYujjPuqrehw-v69EMLzB-Z36ZfC39VD' },
        { title: 'Résumé 9', ext: P, mb: '0.0', year: 2024, fid: '1PphicSxVyMD0Hz6XOd4H_YO2--lBOS7t' },
        { title: 'Résumé des immunoglobulines', ext: P, mb: '0.4', year: 2024, fid: '1THrI_gmcP008stm27KOr48FeAEppRWs_' },
        { title: 'Résumé des lymphocytes B', ext: P, mb: '0.7', year: 2024, fid: '1sPbYlyqIFX7ReWR80H0wx3Z6U9MrzEXo' },
        { title: 'Résumé des lymphocytes T', ext: P, mb: '0.6', year: 2024, fid: '14IYRaKtgZjtbUqUG9HdaX3OtLCnqvOWc' },
        { title: 'Résumé du Système du complément', ext: P, mb: '0.3', year: 2024, fid: '1l4Vndyb2eIi2ItRUa33k9R2SHdoOKP09' },
        { title: 'Résumé Ig', ext: P, mb: '0.4', year: 2021, fid: '1TyGK24oTWeRPcQdbQAVkIf6h-svuqf-J' },
        { title: 'Résumé2 2', ext: P, mb: '3.3', year: 2024, fid: '1BQD0bT-3vqdiPYkNBhU2Qpa33bX6cT2I' },
        { title: 'DIP', ext: P, mb: '0.4', year: 2021, fid: '19svBY2GI1btwmUF0ehlB2y-gPoTPYnJ3' },
        { title: 'Schéma', ext: P, mb: '0.1', year: 2021, fid: '1fKkyDqZpLt6kIzhJb3rb6iXsWm6XJUb7' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Ann prin s2 immuno gener immuno analys', ext: P, mb: '0.4', year: 2025, fid: '117IlReQWxcEZzSOyiGZv3pUeVyjngtot' },
        { title: 'Correction Epreuve Immunologie Générale Session de rattrapage Juin', ext: P, mb: '3.3', year: 2025, fid: '1Zt-uEVpdOrqNCwpGIEdA0G5f1jmaG9Ke' },
        { title: 'Immunologie Correction P', ext: P, mb: '0.7', year: 2024, fid: '1zVnJMnteySgWFZCuMuXlrJ4PkOjrf1Yp' },
        { title: 'Immunologie Correction Complète P', ext: P, mb: '0.7', year: 2024, fid: '1Jb1crAjiM9SAbBAgESDC9HVlpfJ123Uy' },
        { title: 'Immunologie Correction P', ext: P, mb: '0.4', year: 2024, fid: '16btmtyWunwPVCq6h9zbYB9fIWrPTqByU' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Correction TD n 1', ext: P, mb: '1.0', year: 2024, fid: '1J_1MZlZkYItJlWFDe7xemYp9FHmQhkUH' },
        { title: 'TD 3éme séance', ext: P, mb: '1.0', year: 2024, fid: '1j-nRhZBh26w4lTWZGlx71M9OeB7r6wqS' },
        { title: 'TD 4éme séance', ext: P, mb: '2.2', year: 2024, fid: '1aesK5gKlLspUHtKhyhD9jyE2jFHBmXyj' },
        { title: 'TD immuno', ext: P, mb: '2.4', year: 2025, fid: '1BC4AtwMFcnN2MffSEgkgH_51n3PGi43g' },
        { title: 'TD immuno 2024 pdf 2 2', ext: P, mb: '2.5', year: 2024, fid: '1Hl5p4paK83IREv1jmdPJFeOQ-fb-GTwC' },
        { title: 'TD5 Immunologie 3', ext: P, mb: '2.9', year: 2024, fid: '15yXESAauDgWcDe4n_daMygHsVYgsMYHB' },
        { title: 'TD6 Immunologie 2', ext: P, mb: '1.8', year: 2024, fid: '1B-9wyZ4cNCBW8aAR-2_PpBXSqq67Z0II' },
        { title: 'Fascicule de TD + corrections', ext: P, mb: '16.8', year: 2022, fid: '1ehW1PU4WtXXVwBQbJva1aHvW54w7U3KC' },
        { title: 'TD1 : Organes Lymphoïdes et Cellules de l’Immunité', ext: P, mb: '1.5', year: 2022, fid: '1165kd2bFVs_coFli5Khnw24yH-w5ifOQ' },
        { title: 'TD2: Immunoglobulines', ext: P, mb: '1.2', year: 2022, fid: '1mpABexqVkSD1YA5LZxse7II_35nbj211' },
        { title: 'TD4 : Complexe d’Histocompatibilité', ext: P, mb: '0.4', year: 2022, fid: '13haGbhVUIrhjZQWoeba-JgI63qRCR-E2' },
        { title: 'TD5 : Réponse Immunitaire', ext: P, mb: '0.4', year: 2022, fid: '1RqcXDzZVWgiyH48Ci9kBz5eVgHiL4-VA' },
        { title: 'TD6 : Immunité Anti-infectieuse', ext: P, mb: '1.1', year: 2022, fid: '1s_KJqqyQ5Q2tU83vKIjMazqO-NRrmWnQ' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Fascicule tp immuno', ext: P, mb: '6.1', year: 2023, fid: '11saAsN4b2QD59YA3zkSIf39-EHNNQvE2' },
        { title: 'Guide de TP d’immuno-analyse', ext: P, mb: '1.3', year: 2022, fid: '1F6PxKtY5SIX_TOVxRHpdfYEno4PVmHp8' },
      ],
    },
  ],
};

export const TN_PCEP2_PHYSIOLOGIE = {
  id: 'tn-pcep2-physiologie', promo: 'pcep2', semester: 'S2',
  name: 'PHYSIOLOGIE HUMAINE', icon: 'heart', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pr Ameni Cherif',
      lectures: [
        { n: 1, title: 'Les compartiments liquidiens de l’organisme', prof: 'Pr Ameni Cherif', ext: P, mb: '0.9', year: 2021, fid: '1iVLymfxPmALeItxoZk_e-N2NpxOnLFcI' },
      ],
    },
    {
      title: 'Pr Hassen Abdennebi',
      lectures: [
        { n: 2, title: '(système digestif)', prof: 'Pr Hassen Abdennebi', ext: P, mb: '6.3', year: 2021, fid: '1NQiB1-MUjOxjMhrDWKj7Ns_5PdzfN9eq',
          versions: [
            { title: 'Figures (système digestif)', prof: 'Pr Hassen Abdennebi', ext: P, mb: '3.7', year: 2021, fid: '1czZjcDMHbFfJSE456v60JF7AA_VEcGyE' },
            { title: 'Plan du cours (système digestif)', prof: 'Pr Hassen Abdennebi', ext: P, mb: '0.5', year: 2021, fid: '18X0JDBEWlbRu2pngMbECr23xz057oD8z' },
          ] },
        { n: 3, title: 'Fascicule Cours cardiovasculaire', prof: 'Pr Hassen Abdennebi', ext: P, mb: '0.9', year: 2021, fid: '1M6YaZkyiRGC-kpWIdk0Afq21jb6tokRq',
          versions: [
            { title: 'Figures Fascicule cours cardiovasculaire', prof: 'Pr Hassen Abdennebi', ext: P, mb: '2.0', year: 2021, fid: '1kipvUz0FVHv1ZmE4N-PflQVLBfBn0Haq' },
          ] },
        { n: 4, title: 'Fascicule cours digestion', prof: 'Pr Hassen Abdennebi', ext: P, mb: '1.1', year: 2021, fid: '1gwnPJzHcg_v_8CKpJxQ2e8Jc8EiSnXlO' },
        { n: 5, title: 'Fascicule Cours Physiologie Rénale', prof: 'Pr Hassen Abdennebi', ext: P, mb: '1.1', year: 2021, fid: '118g6BZJhpq0LR8Tbrh-FVZndo2InAcKx',
          versions: [
            { title: 'Figures Fascicule cours physiologie rénale', prof: 'Pr Hassen Abdennebi', ext: P, mb: '2.9', year: 2021, fid: '1NJxpcO4U7yrexPZRMnsZSUqoXTkPjPQT' },
          ] },
        { n: 6, title: 'Fascicule cours SYSTEME RESPIRATOIRE', prof: 'Pr Hassen Abdennebi', ext: P, mb: '1.1', year: 2021, fid: '1fTxLy22MtnW9F5Whdl6xQor22FbCVvQR' },
        { n: 7, title: 'Figures cours SYSTEME RESPIRATOIRE', prof: 'Pr Hassen Abdennebi', ext: P, mb: '3.1', year: 2021, fid: '1-R77jKK6rQ6wgWtbE3SASv4MeNd3WSXg' },
        { n: 8, title: 'Le système cardiovasculaire-Diapos cours', prof: 'Pr Hassen Abdennebi', ext: X, mb: '19.3', year: 2023, fid: '1xJ62ZMWzZdda1PcyEM8pptefUEAOmobI',
          versions: [
            { title: 'Le système cardiovasculaire-Diapos cours', prof: 'Pr Hassen Abdennebi', ext: P, mb: '4.6', year: 2021, fid: '127RZVJDvySFQBv2Ck_C18p7dHiDMW3nv' },
          ] },
        { n: 9, title: 'Le système rénal-Diapos cours', prof: 'Pr Hassen Abdennebi', ext: X, mb: '20.8', year: 2023, fid: '1btKhH5cT4Webw3nqh87EeeCoQo5kC7J4',
          versions: [
            { title: 'Le système rénal-Diapos cours', prof: 'Pr Hassen Abdennebi', ext: P, mb: '6.7', year: 2021, fid: '138W_VAXd-NmzHcnJllqpwgtTcWnet8dR' },
          ] },
        { n: 10, title: 'Le système respiratoire-Diapos cours', prof: 'Pr Hassen Abdennebi', ext: X, mb: '14.8', year: 2023, fid: '17APfYHmuprH-PJWaS_QxP4XtrFdVYoNf',
          versions: [
            { title: 'Le système respiratoire-Diapos cours', prof: 'Pr Hassen Abdennebi', ext: P, mb: '3.9', year: 2021, fid: '19dRwZmJ53LCpEuaVRR60Vut9keMFbT4I' },
          ] },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'PHYSIO-M1-Support de cours Physiologie — 2023-2024', ext: P, mb: '12.6', year: 2024, fid: '1_yX3a66IqWceS9EOH0x7PkcxLDysnBpz' },
        { title: 'Fascicule Cours Physiologie — 2022-2023', ext: P, mb: '9.9', year: 2023, fid: '135HdftofQL-sZah75oz5RQ9Cvse7LQp3' },
        { title: 'Système Rénal — 2021-2022', prof: 'Pr Ameni Cherif', ext: P, mb: '3.1', year: 2022, fid: '1boSA3JDH4zqsSxq2iHIN-cww1sP-2PKX' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Fiche Compartiments çaire liquidiens', ext: P, mb: '0.6', year: 2024, fid: '1DD5uDsdceeb1AKgQoJgt_k68UhplKkYm' },
        { title: 'Fiche Sys', ext: P, mb: '6.1', year: 2024, fid: '16cGwYcqu_M1vuGO6agQmfpi1rRGr54xY' },
        { title: 'Fiche Sys Cardiovasculaire', ext: P, mb: '9.3', year: 2024, fid: '11llMKdgmEKUpFkiipe2hfYAJarWvyeZD' },
        { title: 'Fiche Sys Digestif', ext: P, mb: '10.1', year: 2024, fid: '1K_gdKYk2IcXga_XJimXnZIWDyabSqrah' },
        { title: 'Fiche Sys Renal', ext: P, mb: '9.3', year: 2024, fid: '1aMw3Ael61GVXiTy3XI0yOdvw64nSJrqW' },
        { title: 'Fiche système digestif', ext: P, mb: '0.4', year: 2024, fid: '1XYBabU8bnhXxUOW_SIu_1KnrzfaOAYac' },
        { title: 'Résumé des compartiments liquidiens', ext: P, mb: '0.4', year: 2024, fid: '1HIW23BuA28Nho4ByOjY2KzQlsP-ruh28' },
        { title: 'Résumé du systeme respiratoire', ext: P, mb: '1.1', year: 2024, fid: '1hf7eW5OcQOW49pv9Vxe6Rj8qKsngPgWZ' },
        { title: 'Résumé système digestif', ext: P, mb: '1.0', year: 2024, fid: '1I1eqCA9K7tfjzM1XdthCpwPftRyvh_eJ' },
        { title: 'Formule respiratoire', ext: P, mb: '0.2', year: 2021, fid: '1p66Ak-aFLUOZktq-CiISVUNq9P2-VyGx' },
        { title: 'Régulation enzymes', ext: P, mb: '0.5', year: 2021, fid: '1zMgsdFHxK4TrjW1UGQFelTTx3Oga_mXj' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Ann prin s2 phisio humaine s2', ext: P, mb: '0.3', year: 2026, fid: '1ydMpGwylIxoKiG4aQ6NlQRGBJEDJ4-eS' },
        { title: 'Correction Physiologie P', ext: P, mb: '0.3', year: 2025, fid: '15_VYpSPRvd5LoWyAGw2T4jGAOEldIgBH' },
        { title: 'Principale Physio-2026-2ème-correction', ext: P, mb: '0.3', year: 2026, fid: '1F_EEY4S62KDvjlJIFBCjhfLYYmtCQU-l' },
        { title: 'QE cardiovasculaire 3', ext: P, mb: '1.1', year: 2021, fid: '1C8pfLk2a262L5CJyTp4R_KEq0zdUkJI9' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Correction système digestif', ext: P, mb: '1.7', year: 2023, fid: '1XxR20eXIbmlAQMIURswrmbRX1JbNH5BE' },
        { title: 'Correction système rénal', ext: P, mb: '0.8', year: 2023, fid: '1Y8tJf3H4gkhTeyxjbIIslyOrReUih5Ae' },
        { title: 'Correction système respiratoire', ext: P, mb: '1.3', year: 2023, fid: '1Y6UMTzGu-nBardp2Kq_ReSZXVOH9Pusf' },
        { title: 'Correction td compartiments liquidiens', ext: P, mb: '0.7', year: 2023, fid: '1Y7-v3uIDlIiQ3ljAh2kzAKcyvwlBe8FN' },
        { title: 'Fascicule Enseignement Dirigé Physiologie Humaine', ext: P, mb: '1.6', year: 2023, fid: '19KZqvDNezUdh2-UDUTy4mwPAzy1czxHu' },
        { title: 'Correction TD Compartiments Liquidiens', ext: P, mb: '2.3', year: 2022, fid: '1uOz4kqBcuNMg2gt9jhk47nq_l51wxOOR' },
        { title: 'Correction TD Système Digestif', ext: P, mb: '0.8', year: 2022, fid: '1xBe0GOAvSt-N264WOHOdh5V3lFXi5WcM' },
        { title: 'Correction TD Système Rénal', ext: P, mb: '0.8', year: 2022, fid: '156xMmFXQNGr1B6-Qmw3a0xYpyBprTE4e' },
        { title: 'Correction TD Système Respiratoire', ext: P, mb: '1.4', year: 2022, fid: '1qMdzu2EW9NHKmIdSBf6Yak1MNm-3_lvu' },
        { title: 'TD Compartiments Liquidiens', ext: P, mb: '0.4', year: 2022, fid: '1i5h1u9ukfvhe1mokI8dwzgC4KO5kfaix' },
        { title: 'TD Système Rénal', ext: P, mb: '0.1', year: 2022, fid: '1gBzsRvarQ1LYSfOHJpfAgpAGQiSJ5qTi' },
        { title: 'Correction TD compartiment liquidien', ext: P, mb: '0.6', year: 2021, fid: '1z0S00Xhk53hjIm5KZTNcLZJS5Z22ih05' },
        { title: 'Correction td respiratoire', ext: P, mb: '2.2', year: 2021, fid: '1FF2xJwY9L1eoO94XqM46y_CLbL4zwtd3' },
        { title: 'TD 2019_2020', ext: P, mb: '1.4', year: 2020, fid: '1zkvraq3zuxs9Swn-6qu780cGkjtSe_nB' },
        { title: 'Td physio', ext: P, mb: '0.3', year: 2020, fid: '1ABRkVt5UWIh1u41XvqrzWpFX2GWVmh2o' },
        { title: 'Test Respiratoire', ext: P, mb: '0.2', year: 2021, fid: '1JWQvZ3PmMvGunzNNIMnvXXIN9jZicp9_' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM', icon: 'quiz',
      items: [
        { title: 'QCM cardiovasculaire', ext: P, mb: '0.5', year: 2021, fid: '1s5tWgeYuYqSJ5HCLj0MfsgECu5tOFU8k' },
        { title: 'Qcm digestif 1', ext: P, mb: '0.1', year: 2021, fid: '17gnXKq-55uetG0LgFllNHYLewYFncrgn' },
        { title: 'Qcm digestif 2', ext: P, mb: '0.3', year: 2021, fid: '1bLUsKiDW6l_HbF5izsKR7N_9XwJ2UCRs' },
        { title: 'Qcm digestif 3', ext: P, mb: '0.3', year: 2021, fid: '17GdfeP2UX1wGr12wguXQaQ_zMJzrFnne' },
        { title: 'Qcm systeme renale', ext: P, mb: '0.4', year: 2021, fid: '1IbHXPbkT36MxwJqD9aC4j-AY7oFTIJ0h' },
        { title: 'QCM1 système respiratoire watermark', ext: P, mb: '0.6', year: 2021, fid: '19RX9H4qVsD9N39mZI3PIfWU-0GVwC073' },
      ],
    },
  ],
};

export const TN_PCEP2 = [
  TN_PCEP2_BIOLOGIE_MOLECULAIRE,
  TN_PCEP2_BIOPHYSIQUE,
  TN_PCEP2_BOTANIQUE,
  TN_PCEP2_CHIMIE_ANALYTIQUE,
  TN_PCEP2_SEMIOLOGIE_EPIDEMIOLOGIE,
  TN_PCEP2_INFORMATIQUE,
  TN_PCEP2_MICROBIOLOGIE,
  TN_PCEP2_ANGLAIS,
  TN_PCEP2_BIOCHIMIE,
  TN_PCEP2_BIOLOGIE_VEGETALE,
  TN_PCEP2_CHIMIE_MINERALE,
  TN_PCEP2_CHIMIE_ORGANIQUE,
  TN_PCEP2_IMMUNOLOGIE,
  TN_PCEP2_PHYSIOLOGIE,
];
