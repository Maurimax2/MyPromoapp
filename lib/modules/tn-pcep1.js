// PCEP1 — pharmacy, first year: the Tunisian programme.
//
// The Faculté de pharmacie de Monastir's first year, as its students publish
// it on Pharmask (sites.google.com/view/pharmasktn › Externat › PCEP1). The
// page embeds one Drive folder, «1ère Année Pharmacie»
// (1iab0alztyU6Ra7k51K8CtollAwutjUjE), shared «anyone with the link» and read
// off each folder's public listing — metadata only, nothing in it touched.
// This Drive is filed by academic year first (2023-2024, 2024-2025), then by
// semester and subject; the 2022-2023 folders are empty.
//
// A student reads this year in FMPOS's programme (pcep1.js, with the S1 of
// PCEM1) or in this one, chosen on الدراسة. Same shape as tn-dcep3.js.
// Left out: the UVT code lists, the organigramme, native Google Docs and an
// .xps file. Four folders are not shared publicly and are absent.
//
// Every id starts `tn-` (lib/data.js, isTunisian).

const P = 'PDF';
const PT = 'PPT';
const X = 'PPTX';

// ---------------------------------------------------------------------------
// S1
// ---------------------------------------------------------------------------

export const TN_PCEP1_ANATOMIE_EMBRYOLOGIE = {
  id: 'tn-pcep1-anatomie-embryologie', promo: 'pcep1', semester: 'S1',
  name: 'ANATOMIE GÉNÉRALE ET EMBRYOLOGIE HUMAINE', icon: 'person', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Anatomie générale',
      lectures: [
        { n: 1, title: 'Introduction', ext: P, year: 2025, fid: '1HSnTtJwfzeeJbFf1qZfvR3fnn-5hqMtu' },
        { n: 2, title: 'Appareil-locomoteur', ext: P, year: 2022, fid: '1qHJEWOHaWI2E4MyD7EgGCCVqwVEaqqdS' },
        { n: 3, title: 'Appareil de l innervation', ext: P, year: 2023, fid: '1yVt5eLh5Jk1QlHcTGGM_sA2r0aX7GNRQ' },
        { n: 4, title: 'Appareil sensoriel', ext: P, year: 2022, fid: '1y3cWOmvu9C43AjmrdtJ2I4IoWp_ETxzp' },
        { n: 5, title: 'Appareil circulatoire', ext: P, year: 2022, fid: '1d9qLmx9DHQ3NycgIzYdH-x4sNk25GNTJ' },
        { n: 6, title: 'Appareil respiratoire', ext: P, year: 2022, fid: '1-apLh2qA0uGxSz7o2j9YlKkXs3NQcZWx' },
        { n: 7, title: 'Appareil digestif', ext: P, year: 2022, fid: '116Ybf5ggd_J7YNf2NKDvjc4w2CM6KmXX' },
        { n: 8, title: 'Appareil endocrinien', ext: P, year: 2022, fid: '1APTwQncM8t92xBqmHNFXR6ME1LXAlpdW' },
        { n: 9, title: 'Appareil uriniare', ext: P, year: 2022, fid: '1xIP-Wdn0dIopogA9F4YPjOMIycgSpMOb' },
        { n: 10, title: 'Appareil de génération', ext: P, year: 2022, fid: '1f9eprRZGEVaAyOBpNzS10HuXxHE8INdS' },
      ],
    },
    {
      title: 'Embryologie humaine',
      lectures: [
        { n: 11, title: '0la-f� condation dr-sallem', ext: P, year: 2025, fid: '1laSTE_PofauttRKlwSmL-R8wlBHB2JJy' },
        { n: 12, title: '1�re semaine embryo Dr Sallem 1', ext: P, year: 2025, fid: '1sgywH7wYCjeeOoofJbRbYaoJY2AMNS1J' },
        { n: 13, title: '2�me semaine embryo Dr Sallem', ext: P, year: 2022, fid: '1wKU9X1FuVY2cSY8PV2PduOsHUKOEi6EZ' },
        { n: 14, title: '3eme-semaine', ext: P, year: 2025, fid: '1JKSkuc_iLAGGEz3gJzxJw4J5vHm5_pWI' },
        { n: 15, title: '4eme-semaine', ext: P, year: 2025, fid: '1N8JpxNvNzMKP7Ao66lk3Q1bT6eunewLA' },
        { n: 16, title: 'Annexes et placenta Dr Sallem-2023-24-2', ext: P, mb: '3.0', year: 2024, fid: '1dlby9JaPbu6-vFSpQU34LjP21g68YoTp' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Deuxième semaine du développement embryonnaire — 2023-2024', ext: P, year: 2024, fid: '1AOw_XSnI0HqiJy6PsHasRX4t1KMHVhmp' },
        { title: 'La fécondation — 2023-2024', ext: P, year: 2024, fid: '1-gopK-g6MfUMKblU9K91F6G5DcJIu6PW' },
        { title: 'Première semaine du développement embryonnaire — 2023-2024', ext: P, year: 2024, fid: '1Gvd4twJY-mUXWhRjSFuUydcO40SmGcYB' },
        { title: 'Quatrième semaine du développement embryonnaire — 2023-2024', ext: P, year: 2024, fid: '11XD-sQS3oB0NAQl6NbAmoScbCoQBgQd1' },
        { title: 'Troisième semaine du développement embryonnaire — 2023-2024', ext: P, year: 2024, fid: '1AVlP84nrXeXpAhShESkRmtjeFOluKB1i' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale', ext: P, year: 2024, fid: '1-MJTZESPQwA72uPTJF8EQ3hqbtAhlXHN' },
        { title: 'Annale.Anatomie générale', ext: P, year: 2024, fid: '1aisXJICgzJZFvoBVUAtrPeCI063nlD3s' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Serie1embryo', ext: P, mb: '2.9', year: 2025, fid: '1p0Kgl4YjSnB6lc9ZKOwV8KaI5L3SQwUo' },
        { title: 'Serie2embryo', ext: P, mb: '2.7', year: 2025, fid: '18USC7ClgjmVWyn8kqasVPX4xsx2WG1p-' },
        { title: 'Serie3embryo', ext: P, mb: '1.2', year: 2025, fid: '1V2yJ4sV5YSvWCiZodnY18zmsax4fG9mI' },
        { title: 'Serie4embryo', ext: P, mb: '2.4', year: 2025, fid: '13gcnr92UNhrbHlD4uDQNOww4lkWQzBFU' },
        { title: 'ED embryologie', ext: P, year: 2024, fid: '1Cg0fXAWUF3xABwJsD2KaPTOgCCDSpgCA' },
      ],
    },
  ],
};

export const TN_PCEP1_BIOCHIMIE = {
  id: 'tn-pcep1-biochimie', promo: 'pcep1', semester: 'S1',
  name: 'BIOCHIMIE STRUCTURALE', icon: 'flask', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pr Manel Ayoub',
      lectures: [
        { n: 1, title: 'De cours-glucides-généralité', prof: 'Pr Manel Ayoub', ext: P, year: 2023, fid: '14pQ7InoiSM3zXd7Kiyn17GEaoIxis5aK' },
        { n: 2, title: 'De cours-LES-oses', prof: 'Pr Manel Ayoub', ext: P, year: 2023, fid: '19xhmQ1Z1njSbjFP8lMZ759NomXm0moz-' },
        { n: 3, title: 'De cours-Les-osides', prof: 'Pr Manel Ayoub', ext: P, year: 2023, fid: '1SvbEH8NS5Wp9MaGml2dDqw3Hh787egfZ' },
        { n: 4, title: 'De cours-methodes-detudes', prof: 'Pr Manel Ayoub', ext: P, year: 2023, fid: '1jWRvQfG2x3vc20P8xjYlf6Rhtb3GssjF' },
        { n: 5, title: 'De Glucides-2018-P256et7', prof: 'Pr Manel Ayoub', ext: P, year: 2018, fid: '1cntFU7zuzHseLTl24xKYWSkq4Gie82HN' },
      ],
    },
    {
      title: 'Pr Nabila Ben Rejeb',
      lectures: [
        { n: 6, title: 'De Structure des lipides converti-2', prof: 'Pr Nabila Ben Rejeb', ext: P, mb: '2.7', year: 2025, fid: '1In5eXZUk3z5L-ygc0Wo8KhmOCfHRYWfc' },
      ],
    },
    {
      title: 'Pr Selima Ferchichi',
      lectures: [
        { n: 7, title: 'De Cours AN(ADN/ARN)', prof: 'Pr Selima Ferchichi', ext: P, year: 2021, fid: '1-6_s6VzUKcAaG-jmYKoLk9AVT9lfWPmo' },
      ],
    },
    {
      title: 'Pr Yassine Chaabouni',
      lectures: [
        { n: 8, title: 'AA pepetides protéines', prof: 'Pr Yassine Chaabouni', ext: P, mb: '2.6', year: 2025, fid: '14FJe7dSvf8HnezASsLbtw30LPG1jTHkw' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'An(adn/arn) — 2023-2024', prof: 'Pr Selima Ferchichi', ext: P, year: 2021, fid: '1uIh3H3cX-KjqH2jeNEJxzjLV6VTtw2aQ' },
        { title: 'Cours aa — 2023-2024', prof: 'Pr Yessine Chaabouni', ext: P, year: 2024, fid: '1S1Nj5YZOk8jk6weB-PlgopPYimbOilXh' },
        { title: 'De COURS AA pepetides protéines — 2023-2024', prof: 'Pr Yessine Chaabouni', ext: P, mb: '2.6', year: 2024, fid: '1YRLHt_89aDu2tYkpI0ZCo2U060MNUpHb' },
        { title: 'Glucides 2018 P256et7 — 2023-2024', prof: 'Pr Ag Manel Ayoub', ext: P, year: 2018, fid: '1ow5rH-Ox0dpXMS9VfZniZF5-n76cby_a' },
        { title: 'Glucides généralité — 2023-2024', prof: 'Pr Ag Manel Ayoub', ext: P, year: 2023, fid: '1FvFUR9og9Pa7u9WLGRTs2mQKWe049EI2' },
        { title: 'LES oses — 2023-2024', prof: 'Pr Ag Manel Ayoub', ext: P, year: 2023, fid: '1oMXQshjfdrvSwPZHLqQtfegFzve-aEq2' },
        { title: 'Les osides — 2023-2024', prof: 'Pr Ag Manel Ayoub', ext: P, year: 2023, fid: '1LD5F01NoOgYGeQjjRQYXKxmxbTowKys8' },
        { title: 'Methodes detudes — 2023-2024', prof: 'Pr Ag Manel Ayoub', ext: P, year: 2023, fid: '12-JM3_K27u_5TX3pkiBVua4mA_iskIXJ' },
        { title: 'Structure des lipides converti 2 — 2023-2024', prof: 'Pr Nabila Ben Rjeb', ext: P, mb: '2.7', year: 2024, fid: '19N76Y-DdjsYomEVteAtenFlhwELNZOHy' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale biochimie', ext: P, mb: '6.7', year: 2024, fid: '1meuPIs85P_kg_iIJEmnjIaw3ahnRbNPb' },
      ],
    },
  ],
};

export const TN_PCEP1_CHIMIE_ORGANIQUE = {
  id: 'tn-pcep1-chimie-organique', promo: 'pcep1', semester: 'S1',
  name: 'CHIMIE ORGANIQUE PHARMACEUTIQUE', icon: 'flask', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Chimie organique pharmaceutique',
      lectures: [
        { n: 1, title: 'Chimie orga. première année', ext: P, year: 2025, fid: '1IR9J6hE_w00KdNrt52H6JXlbIIvt9OzM' },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale.Chimie organique', ext: P, year: 2024, fid: '19E2AAaiwjeWYvP_enL_xxO3nLiwpcPqK' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Corrections des séries 1–>4 ch', ext: P, mb: '4.8', year: 2025, fid: '1Vzn_c17mllnRRnzkRWbSCRfCbnpOuqls' },
        { title: 'Correction TDs', ext: P, mb: '13.4', year: 2024, fid: '1PqjkIYPdugr4NN_8WkcwvwMuQ8sqYQDe' },
      ],
    },
  ],
};

export const TN_PCEP1_CHIMIE_PHYSIQUE = {
  id: 'tn-pcep1-chimie-physique', promo: 'pcep1', semester: 'S1',
  name: 'CHIMIE PHYSIQUE PHARMACEUTIQUE', icon: 'atom', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Pr Ahlem Karoui',
      lectures: [
        { n: 1, title: 'Cours-22-23-ch sol', prof: 'Pr Ahlem Karoui', ext: P, year: 2024, fid: '1-RVAbVlR99fGXMY21HNFgPO2yPMCvmFv' },
      ],
    },
    {
      title: 'Pr Faouzi Ayari',
      lectures: [
        { n: 2, title: 'Cours-atomistique', prof: 'Pr Faouzi Ayari', ext: P, mb: '2.2', year: 2024, fid: '1sOllGgV1K23P8t5PX9uNWnqjGcs7E-oz',
          versions: [
            { title: 'De Cours-atomistique', prof: 'Pr Faouzi Ayari', ext: P, mb: '2.2', year: 2024, fid: '1jrtlhvSElgyXWsh6tZxoDgdlzhmYqrls' },
            { title: 'De Cours-atomistique', prof: 'Pr Faouzi Ayari', ext: P, mb: '2.2', year: 2024, fid: '1w6Fz9UIX-fZw5CBHj1H4SKl5-4B4pruu' },
          ] },
      ],
    },
    {
      title: 'Pr Hajer Trad',
      lectures: [
        { n: 3, title: 'A compléter', prof: 'Pr Hajer Trad', ext: P, mb: '0.6', year: 2024, fid: '1ooNbzoYIwF7OZvgLumlzmQWsrBgaWBR5' },
        { n: 4, title: 'Thermodynamique Chimique', prof: 'Pr Hajer Trad', ext: P, mb: '12.2', year: 2024, fid: '1krdgsyiP_QCVbH_loum4-407JSKvzpM6' },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés', icon: 'file',
      items: [
        { title: 'Résumé 1', prof: 'Pr Hajer Trad', ext: P, mb: '4.3', year: 2024, fid: '1mBMC5xpazJ01_2UorNj20MF1gHe0gt86' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale.Chimie physique', ext: P, year: 2024, fid: '1dLPtP-r3qjOPFgasf4PM8MnOwxJH8TDh' },
        { title: 'Corretion examen Chimie physique session principale', ext: P, year: 2024, fid: '1RenOfshkVZnnjZ0ILrujUM3o9C6jmzNx' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Corr séries ch des sol', ext: P, mb: '6.0', year: 2023, fid: '1ameHPpHcYU0EIaZXUfqtwS_g1vZQR91d' },
      ],
    },
  ],
};

export const TN_PCEP1_GENETIQUE = {
  id: 'tn-pcep1-genetique', promo: 'pcep1', semester: 'S1',
  name: 'GÉNÉTIQUE HUMAINE', icon: 'micro', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Pr Hend Chaker',
      lectures: [
        { n: 1, title: 'Contenu du génome humain', prof: 'Pr Hend Chaker', ext: X, mb: '0.3', year: 2024, fid: '1guGCfSj-gWWNLyIHqJABtcTp5ptEuiE3' },
        { n: 2, title: 'Cytogenetique.version3. 2023 2024 1', prof: 'Pr Hend Chaker', ext: P, mb: '5.3', year: 2024, fid: '1-wSm73w4rCXyrQH9al8W_mkw3xPYTOFx' },
        { n: 3, title: 'Définition', prof: 'Pr Hend Chaker', ext: X, mb: '0.2', year: 2024, fid: '1u8Dmkr-O4JEiTbS_ZxFo63MajiFNE4Sc' },
        { n: 4, title: 'Diversité humaine et notion de polymorphisme', prof: 'Pr Hend Chaker', ext: P, mb: '1.3', year: 2024, fid: '1FARgMVXFHd-F4JhBux31gYrTDAATpLQ1',
          versions: [
            { title: 'Diversit� humaine et notion de polymorphisme', prof: 'Pr Hend Chaker', ext: P, mb: '1.3', year: 2024, fid: '1pHkyQVN2DXNG7kpuSj575SgiJCuKGWte' },
          ] },
        { n: 5, title: 'Domaines dapplication', prof: 'Pr Hend Chaker', ext: P, mb: '1.4', year: 2024, fid: '1ouWzDG-NZ8qZv8vSjOIL9hlOfykmkj1K' },
        { n: 6, title: 'Les techniques damplification', prof: 'Pr Hend Chaker', ext: P, mb: '1.4', year: 2024, fid: '1E3nDBrrxwrDPOMRKMerJEvmRaB6aUGTk' },
        { n: 7, title: 'Les techniques de séquençage', prof: 'Pr Hend Chaker', ext: P, mb: '1.1', year: 2024, fid: '1CtvJMgv775rN9cLn69DQa-PKhSA5NO0W' },
        { n: 8, title: 'Les techniques de s�quen�age', prof: 'Pr Hend Chaker', ext: P, mb: '1.1', year: 2024, fid: '1a5SG1QazTiadgEYL_UwByAgiIFjBmv3C' },
        { n: 9, title: 'Organisation et Expression des gènes c8ee834ec0894cfb7750fd3fdf465a8a', prof: 'Pr Hend Chaker', ext: P, mb: '2.0', year: 2024, fid: '1TWWX9xUHLxc65tXIczagC6RoxEUhpfbQ',
          versions: [
            { title: 'Organisation et Expression des gènes chez les Eucaryotes', prof: 'Pr Hend Chaker', ext: X, mb: '1.4', year: 2024, fid: '1f9frHz-rOxCoB5fPkihUnMYVriUDvcEQ' },
            { title: 'Organisation et Expression des g�nes', prof: 'Pr Hend Chaker', ext: P, mb: '2.0', year: 2024, fid: '18PukhYtBfbXCKEz7yBMWUFhW6pFhvxYB' },
          ] },
        { n: 10, title: 'Références complémentaires', prof: 'Pr Hend Chaker', ext: P, mb: '0.8', year: 2024, fid: '1_CfDvip4VeD4wetwDRE8iZeuDezhG4dS' },
        { n: 11, title: 'Variabilité génétique et mutations', prof: 'Pr Hend Chaker', ext: P, mb: '1.1', year: 2024, fid: '1ojXrz5kRupOojdt5DoSOzxR2zrtEKFFm',
          versions: [
            { title: 'Variabilité génétique et mutations', prof: 'Pr Hend Chaker', ext: X, mb: '0.5', year: 2024, fid: '1P-djofqhVrnF3ioWaCQxmW00SXdX_KeR' },
          ] },
        { n: 12, title: 'Variabilit� g�n�tique et mutations', prof: 'Pr Hend Chaker', ext: P, mb: '1.1', year: 2024, fid: '1nFm9UnWfcBUxWc_CimRMJilJzFu53hJc' },
      ],
    },
    {
      title: 'Pr Sana Sfar',
      lectures: [
        { n: 13, title: 'Anomalies-chromosomiques', prof: 'Pr Sana Sfar', ext: P, mb: '1.2', year: 2024, fid: '1EmkHzM3rpahBzVBrEpTm7rx6dusKTvYi' },
        { n: 14, title: 'Caryotype-humain', prof: 'Pr Sana Sfar', ext: P, mb: '1.1', year: 2024, fid: '1Cnw-YvI70kmNIWJbdOWkOvc56Wz2Ik6v' },
        { n: 15, title: 'Diagnostic prénatal DPN 1', prof: 'Pr Sana Sfar', ext: P, mb: '0.7', year: 2024, fid: '18ZeFfINBHUGjTEd3sD8zqnmexd1f441h' },
        { n: 16, title: 'Génétique chromosomique', prof: 'Pr Sana Sfar', ext: P, mb: '9.4', year: 2024, fid: '1XRNL4fovejOYPzKVuo2AcSs9lRPwksmr' },
        { n: 17, title: 'Génétique-formelle', prof: 'Pr Sana Sfar', ext: P, mb: '11.5', year: 2024, fid: '1KYSmbXWbIIrFNvEVtsN5lIm4sVpeMDLA' },
        { n: 18, title: 'Principaux syndromes cytogénétiques 1', prof: 'Pr Sana Sfar', ext: P, mb: '0.6', year: 2024, fid: '1MBQ1iZjANRNRzn9AMrwLU9Q5l9uNnYxY' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'GEN M2-Support du cours de génétique-1 2024-2025-compressed — 2024-2025', ext: P, mb: '3.3', year: 2025, fid: '1v6CAyNs43W-gG61MH7Ri-BwKzisUBWbg' },
      ],
    },
  ],
};

export const TN_PCEP1_ANGLAIS = {
  id: 'tn-pcep1-anglais', promo: 'pcep1', semester: 'S1',
  name: 'MEDICAL ENGLISH', icon: 'book', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Medical english',
      lectures: [
        { n: 1, title: 'Unit 1 lesson 1', ext: P, year: 2025, fid: '1Nm2bFt4TC2tN0i_iiP7LPNUx3GomJlJe' },
        { n: 2, title: 'Unit 1 lesson 2', ext: P, year: 2025, fid: '1mQj-UqYCl0AGUytC9ev1tvZRS0XDpYts' },
        { n: 3, title: 'Unit 2 lesson 1', ext: P, year: 2025, fid: '14KqgI8Wk7jJmVTajuoDq2wdWO03mUD6g' },
        { n: 4, title: 'Unit 2 lesson 2', ext: P, year: 2025, fid: '1cuR2UWI4xyAN0ANeNXxP_i8zTkBSzC2n' },
        { n: 5, title: 'Unit 2 lesson 3', ext: P, year: 2025, fid: '1B0nzk-G1w9v1zpqFW3Sw4XhFHkgE64UY' },
        { n: 6, title: 'Unit 2 lesson 4', ext: P, year: 2025, fid: '1l16JlyjjDG-pvKQhLI31x5rwOfjxYpkX' },
      ],
    },
  ],

  sections: [
  ],
};

export const TN_PCEP1_PHILOSOPHIE = {
  id: 'tn-pcep1-philosophie', promo: 'pcep1', semester: 'S1',
  name: 'PHILOSOPHIE DES SCIENCES ET DROITS DE L’HOMME', icon: 'book', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Philosophie des sciences',
      lectures: [
        { n: 1, title: 'Ethique', ext: P, mb: '0.2', year: 2025, fid: '1bHYS1gVE_YuVYMWxwRwmkXOSz6Qtzpcp' },
        { n: 2, title: 'Histoire de la pharmacie1', ext: PT, mb: '0.5', year: 2025, fid: '1c1-_S8y9M3lBNwonFKCrASZ8II95e8Ta' },
        { n: 3, title: 'Introphilosophie', ext: P, mb: '0.5', year: 2025, fid: '1c1-GZzwe0QKI56rbihCPGcUZkxOvg9s4' },
        { n: 4, title: 'Science', ext: P, mb: '0.3', year: 2025, fid: '1ThEkDYFPt23s1CLBxWqtT7_9Vp2tDmE_' },
      ],
    },
    {
      title: 'Droits de l’homme',
      lectures: [
        { n: 5, title: 'Concepts introductifs.Droit de l’homme', ext: P, mb: '0.4', year: 2023, fid: '19ZDSz24EXVSzs7ROOjovnBKAvPmrubS0',
          versions: [
            { title: 'Droits de lHomme concepts introductifs', ext: P, year: 2025, fid: '1-R13Jv0DC6Tsx_sAUn64EmVJJ9jgGO3-' },
          ] },
        { n: 6, title: 'Les droits du patient', ext: P, year: 2025, fid: '1-KzQFIG50OexKO5U-c5Hu3NZBSDK6bJ3' },
        { n: 7, title: 'Protection des droits de lenfant', ext: P, year: 2025, fid: '1-Esp7DdFEfmkCVqvve1kaYudCGynHvY7' },
        { n: 8, title: 'Recherche-biomédicale', ext: P, year: 2025, fid: '1-FvbZq_5UItLs5uKoBaZNOqMLaiA2z4d' },
        { n: 9, title: 'Transplantation-organes', ext: P, year: 2025, fid: '1-EH01Unl0j6vXZxOb4woyx94OtKQgH7u' },
      ],
    },
  ],

  sections: [
  ],
};

// ---------------------------------------------------------------------------
// S2
// ---------------------------------------------------------------------------

export const TN_PCEP1_BIOLOGIE_CELLULAIRE = {
  id: 'tn-pcep1-biologie-cellulaire', promo: 'pcep1', semester: 'S2',
  name: 'BIOLOGIE CELLULAIRE ET ORGANISATION ANIMALE', icon: 'micro', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Biologie cellulaire et organisation animale',
      lectures: [
        { n: 1, title: 'Biologie cellulaire', ext: P, mb: '14.2', year: 2025, fid: '1aDS1fbXLzPvxEltssxwcgVIcEQVzNzkc',
          versions: [
            { title: 'Figures et tableaux biologie cellulaire', ext: P, mb: '9.0', year: 2025, fid: '1NDagibzilfBE060T9Pvj4QhxolxnOb3_' },
          ] },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale biocell', ext: P, mb: '10.1', year: 2025, fid: '1PT1wC89E2JrqYBkBNXfdEZGXw-OzZoNM' },
      ],
    },
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'Série 1 biocell', ext: P, mb: '2.1', year: 2025, fid: '1qqNBDLdmp5RCraGat8BlUFASNf9pPPHW' },
        { title: 'Série 2 biocell', ext: P, mb: '2.1', year: 2025, fid: '119O4GQYxGqp0uy6K7zf6-JxDZ4OHs59V' },
        { title: 'Série 3 biocell', ext: P, mb: '1.6', year: 2025, fid: '12Hi5UkJLQwiUE-FQbo8V5fypWrwUfB8b' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'TP 1 : initiation à l’utilisation du microscope photonique', ext: P, mb: '0.4', year: 2025, fid: '1TXjH-62YVdVnXaUpPSBNx320CIqCyPY1' },
      ],
    },
  ],
};

export const TN_PCEP1_BIOPHYSIQUE = {
  id: 'tn-pcep1-biophysique', promo: 'pcep1', semester: 'S2',
  name: 'BIOPHYSIQUE', icon: 'atom', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Biophysique',
      lectures: [
        { n: 1, title: 'BIOPHY-M1-support de cours biophysique-1ère année-Partie I-1-77 compressed', ext: P, mb: '13.0', year: 2025, fid: '1WZ0Uy3iXK4P_fV55CpR0XxO4OiTe-AJ-' },
        { n: 2, title: 'BIOPHY-M1-support de cours biophysique-1ère année-Partie II-125-212', ext: P, mb: '16.4', year: 2025, fid: '1WV5BJOQ0FJuQdprumDxJQyV_dqFs9cEt' },
        { n: 3, title: 'Métrologie', ext: P, mb: '2.6', year: 2025, fid: '1WaRWtUVAUhpA9PFzALtA726EfN75Ht1Q' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Absorption — 2023-2024', ext: P, mb: '2.5', year: 2024, fid: '1f8E_aq1qkEoBuh-di339LLAaUpIUpfS2' },
        { title: 'Diffraction — 2023-2024', ext: P, mb: '1.6', year: 2024, fid: '1Rbg3bcaraMuqLtXv0OH3wRqHrb9O5cfW' },
        { title: 'Electrostatique E — 2023-2024', prof: 'Pr Najla Ayachi', ext: P, year: 2024, fid: '1EQFiMvnGBggxG5Fk1OD31Ug0ieQkSC2p' },
        { title: 'Niveaux dénergie — 2023-2024', prof: 'Pr Raja.Guedouar', ext: P, mb: '7.6', year: 2023, fid: '1wYbafnsSnGe9leQorFDS_i8X-RCbTuYc' },
        { title: 'Polarisation — 2023-2024', ext: P, mb: '1.7', year: 2024, fid: '1qNUWUGZhs1Wluutqqxd2C3zJr0LquK3G' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale biophysique', ext: P, mb: '12.4', year: 2025, fid: '1iZ8gkhjRUJpWgdgtQA6lzNqFM5mnJclU' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Annexe', ext: P, mb: '3.6', year: 2025, fid: '1xAwUcfPF2-ESGxnspNc9kNZqG9HUgp3J' },
        { title: 'Tp conductimétrie', ext: P, mb: '1.2', year: 2025, fid: '12CtTL-zPCSwCdsjqnzPTXEKd99jpjr0J' },
      ],
    },
  ],
};

export const TN_PCEP1_STATISTIQUES = {
  id: 'tn-pcep1-statistiques', promo: 'pcep1', semester: 'S2',
  name: 'MATHÉMATIQUES ET STATISTIQUES', icon: 'book', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Mathématiques et statistiques',
      lectures: [
        { n: 1, title: 'MATH-M1-support de cours de mathématique-1A codifié avec cartouche', ext: P, mb: '8.8', year: 2025, fid: '1FHisr0rdYyQ4a0stUK5iuBszspuAvxMC' },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale biostat', ext: P, mb: '14.5', year: 2025, fid: '1kXSNbVsWDcAYMAIKCtWpfERFLUEyc7rf' },
      ],
    },
  ],
};

export const TN_PCEP1_GALENIQUE = {
  id: 'tn-pcep1-galenique', promo: 'pcep1', semester: 'S2',
  name: 'PHARMACIE GALÉNIQUE ET HISTOIRE DE LA PHARMACIE', icon: 'flask', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Pharmacie galénique et histoire de la pharmacie',
      lectures: [
        { n: 1, title: 'PH.GAL-M5 support cours pharmacie galénique 1A', ext: P, mb: '9.8', year: 2025, fid: '1Kewk-7mYsPgvqesIRBx1KJRoiVK4_nlj' },
        { n: 2, title: 'Le medicament et les methodes therapeutiques', ext: P, mb: '1.2', year: 2025, fid: '14j2UgVyPujUSB0K0cdMqqNaWexN7bJ_B' },
      ],
    },
  ],

  sections: [
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale galénique', ext: P, mb: '44.0', year: 2025, fid: '1eJwKp5e8JJp0xccxO0HN7-5GkMrAyL4Z' },
      ],
    },
    {
      id: 'tp', where: 'archive', title: 'Travaux pratiques', icon: 'book',
      items: [
        { title: 'Compte rendu bétadine', ext: P, mb: '0.4', year: 2025, fid: '1H2Cz08M4TIaO-aUDDPuIXF3jkzhrGpne' },
        { title: 'Compte rendu dakin', ext: P, mb: '0.8', year: 2025, fid: '1IwmA8sy1Dv4W6p_CM_iNCbfJ6i9xRH1k' },
        { title: 'Compte rendu gel', ext: P, mb: '0.3', year: 2025, fid: '1JXI6GzpRRKIINgJjAj8uzbE1ZnquG-uh' },
        { title: 'Compte rendu gélules', ext: P, mb: '1.8', year: 2025, fid: '1bil1zblxo6efw7Q3tbjwN4jK7tHeq8DY' },
        { title: 'Compte rendu paquet de charbon végétal', ext: P, mb: '1.4', year: 2025, fid: '1ENKhGKowzSwPiVhZvL1Ab03MC5I9tjW_' },
        { title: 'Compte rendu pate', ext: P, mb: '0.3', year: 2025, fid: '1FJw5TWjBUOx4HtysxkJ29FvAx8hn7Seg' },
        { title: 'Compte rendu potion', ext: P, mb: '1.4', year: 2025, fid: '1lkrr9wF4T3ZWDtpsOUUvvV5xtl7URydk' },
        { title: 'Compte rendu sirop', ext: P, mb: '1.5', year: 2025, fid: '17WZp-ukkcP-tr5zPJKEfbGbFjgRv5xvz' },
        { title: 'Compte rendu suppositoire', ext: P, mb: '0.6', year: 2025, fid: '1xXy7D_Gl_A0uY4aNPIYgoT9Gb3uaXCa-' },
        { title: 'Copmte rendu émulsion', ext: P, mb: '0.4', year: 2025, fid: '1WFvCTSey2674rcCPKEy-AoMIHGDSLmBC' },
        { title: 'Manuel du préparateur en', ext: P, mb: '0.5', year: 2025, fid: '1HY_U6ScSokaIdZZPWLF5fXOmgPJFvnod' },
        { title: 'Notion de pharmacie galénique', ext: P, mb: '0.6', year: 2025, fid: '1dP5SUh0XBKAYXN2qCH05YuxJ33CX2Dkf' },
        { title: 'Pharmacopée Française 1', ext: P, mb: '6.4', year: 2025, fid: '19u68ECporM-OUPFiEwSQddUBhyL0bG4Z' },
      ],
    },
  ],
};

export const TN_PCEP1_PHYSIOLOGIE = {
  id: 'tn-pcep1-physiologie', promo: 'pcep1', semester: 'S2',
  name: 'PHYSIOLOGIE HUMAINE', icon: 'heart', tint: 'orange',
  professors: [],

  chapters: [
    {
      title: 'Physiologie humaine',
      lectures: [
        { n: 1, title: 'PHYSIO-M4 Support de cours de Physiologie 1A', ext: P, mb: '7.0', year: 2025, fid: '13C8StAA9luhtdjrRaOEmn2kuNnmyC_68' },
        { n: 2, title: 'MUSCLES 1ère année', ext: P, mb: '4.3', year: 2025, fid: '1NjUQwzUpA3aAJ1ycJJuiyGZ3s7A4pNeA' },
      ],
    },
  ],

  sections: [
    {
      id: 'anciens', where: 'archive', title: 'Éditions précédentes', icon: 'book',
      items: [
        { title: 'Physiologie humaine 1ère année — 2023-2024', ext: P, year: 2023, fid: '1SLSbO0bLyGeBcWPcEm4PDbopSv5sZo_Y' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Annale physiologie', ext: P, mb: '14.4', year: 2025, fid: '1kiwTQ9RuuC4gWCsG6Pbai92UvWfcScvl' },
      ],
    },
  ],
};

export const TN_PCEP1_INFORMATIQUE = {
  id: 'tn-pcep1-informatique', promo: 'pcep1', semester: 'S2',
  name: 'INFORMATIQUE (C2N)', icon: 'book', tint: 'purple',
  professors: [],

  chapters: [
    {
      title: 'Informatique',
      lectures: [
        { n: 1, title: 'D1.1 recherche info veille 2024 JEBLAOUI', ext: P, mb: '5.4', year: 2024, fid: '1npEOHjguZzr6zvrayrKy2hXTAsMHUBiO' },
        { n: 2, title: 'D1.2 Gérer des données 2025 jeblaoui', ext: P, mb: '1.2', year: 2025, fid: '16XzdQd2ErETLwM6NZhaF4PAJF7cCZupq' },
        { n: 3, title: 'D3.1 Création de contenu', ext: P, mb: '1.6', year: 2025, fid: '1HG-RgobkTf7R9yPMaBS6eALxl6nCgywR' },
      ],
    },
  ],

  sections: [
  ],
};

export const TN_PCEP1_SECOURISME = {
  id: 'tn-pcep1-secourisme', promo: 'pcep1', semester: 'S2',
  name: 'SECOURISME', icon: 'heart', tint: 'orange',
  professors: [],

  chapters: [
  ],

  sections: [
    {
      id: 'td', where: 'quiz', title: 'TD et exercices', icon: 'quiz',
      items: [
        { title: 'TD SECOUR cours secourisme-1ère année Validé avec cartouche', ext: P, year: 2025, fid: '1-cHTo8yCD-L90QoW32BqlgL8mg85o6UI' },
      ],
    },
  ],
};

export const TN_PCEP1 = [
  TN_PCEP1_ANATOMIE_EMBRYOLOGIE,
  TN_PCEP1_BIOCHIMIE,
  TN_PCEP1_CHIMIE_ORGANIQUE,
  TN_PCEP1_CHIMIE_PHYSIQUE,
  TN_PCEP1_GENETIQUE,
  TN_PCEP1_ANGLAIS,
  TN_PCEP1_PHILOSOPHIE,
  TN_PCEP1_BIOLOGIE_CELLULAIRE,
  TN_PCEP1_BIOPHYSIQUE,
  TN_PCEP1_STATISTIQUES,
  TN_PCEP1_GALENIQUE,
  TN_PCEP1_PHYSIOLOGIE,
  TN_PCEP1_INFORMATIQUE,
  TN_PCEP1_SECOURISME,
];
