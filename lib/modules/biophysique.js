// BIOPHYSIQUE — S2, organised.
//
// The course is numbered by the teacher himself — `1- Atomes`, `2-Radioactivité`,
// through to audition — so the numbering here is his, not invented. Drive keeps
// 2023 and 2024 side by side; 2024 is the lecture and 2023 hangs off it.
//
// A large part of the question material is Moroccan (Marrakech), which students
// use because the programme is close. Those sit apart from the UNEM papers.

const P = 'PDF';
const J = 'JPG';

export const BIOPHYSIQUE = {
  id: 'biophysique', promo: 'pcem2', semester: 'S2',
  name: 'BIOPHYSIQUE', icon: 'atom', tint: 'orange',
  professors: ['NK'],

  chapters: [
    {
      title: 'Rayonnements ionisants',
      subtitle: 'Atome, radioactivité, interactions, détection, radioprotection',
      lectures: [
        { n: 1, title: "L'atome — rappels", ext: P, mb: '12.0', fid: '1-hI9ZBM56HTMTKN6KzSnw2SuyyTk25d2', year: 2024,
          versions: [{ title: "L'atome — rappels", year: 2023, mb: '11.9', fid: '1O5oomV2cIvSg28T3941UjG5tFEv8vBMx' }] },
        { n: 2, title: 'La radioactivité', ext: P, mb: '15.8', fid: '1y0zOVdveF2URnRQcTJTxExD_QZD0vi3o', year: 2024,
          versions: [{ title: 'La radioactivité', year: 2023, mb: '15.3', fid: '1-Y1YTBH4QdIFSoCHazul-9PXVUzvjEg9' }] },
        { n: 3, title: 'La cinétique de la radioactivité', ext: P, mb: '3.8', fid: '1JwtJPfgIsnS9hs5QLuT5d0xU4WvNLFoB', year: 2024,
          versions: [{ title: 'La cinétique de la radioactivité', year: 2023, mb: '4.2', fid: '1SkS4q4KRbSBq4QZbttyT8rCWCBhtglnJ' }] },
        { n: 4, title: 'Interaction des rayonnements ionisants avec la matière', ext: P, mb: '13.4', fid: '1b_Nu_Utqxzsr2MZPM4cnGFmLNi0enH5j', year: 2024,
          versions: [{ title: 'Interaction des RI avec la matière', year: 2023, mb: '10.3', fid: '1l-6_cTpbWEtiWtbdWOVY0Ax7sqI4V6pd' }] },
        { n: 5, title: 'Les détecteurs', ext: P, mb: '15.5', fid: '1usqW85ENta19VbqAWr9zKpCWWzypAf6s', year: 2024,
          versions: [{ title: 'Les détecteurs', year: 2022, mb: '16.1', fid: '1qitEHyGIXUd5ZEdhiNnnup_Xs-y7z--n' }] },
        { n: 6, title: 'Radiobiologie et radiopathologie', ext: P, mb: '2.9', fid: '1torWxQKFPDuOFOoQcYfIa8vVpIeWl8Xg', year: 2024,
          versions: [{ title: 'Radiobiologie et radiopathologie', year: 2020, mb: '12.9', fid: '1nwjAsJWqfHeUxZaDFX1vykl6Gsj4dRm0' }] },
        { n: 7, title: 'La radioprotection', ext: P, mb: '2.0', fid: '1NDy479dykx-0OwXxKP63s9d93VzxmCBU', year: 2024,
          versions: [{ title: 'La radioprotection', year: 2020, mb: '5.7', fid: '1gJEOSh9I_rbkERung9j4faMhVyISu8Vs' }] },
      ],
    },
    {
      title: 'Biophysique des sens et imagerie',
      subtitle: 'Vision, audition, imagerie médicale',
      lectures: [
        { n: 8, title: 'Biophysique de la vision', ext: P, mb: '7.3', fid: '1ogek73sirKeZomiMPj2UfdMYkcDApRXj', year: 2024,
          versions: [{ title: 'Biophysique de la vision', year: 2022, mb: '10.6', fid: '1qGbBDZaydfjUp2yqNlpMbSHC8P6KsFGh' }] },
        { n: 9, title: "Biophysique de l'audition", ext: P, mb: '12.3', fid: '1O6q_feiB8cJEyLTSo3nMCO3udypW5XMy', year: 2024,
          versions: [{ title: "Biophysique de l'audition", year: 2020, mb: '11.8', fid: '1eC6nFPAOcGv7Eu_DQUY6jT5rSj4jHPtY' }] },
        { n: 10, title: "L'imagerie radiologique", ext: P, mb: '2.1', fid: '1ENelMbt-uFFDQVltmBr-cOcbdUsjmXI0', year: 2024 },
        { n: 11, title: 'La médecine nucléaire', ext: P, mb: '2.0', fid: '1PzDrGGGgCzh_Kdcslh7RkV3DxriOtmUD', year: 2024 },
      ],
    },
  ],

  sections: [
    {
      id: 'resumes', where: 'notes', title: 'Résumés par chapitre', icon: 'file',
      items: [
        { title: 'Chapitre 1 — l’atome', ext: P, mb: '14.9', fid: '1pfnvz0JDsZqo-uwdyZhOE8FjUTlcZYs5' },
        { title: 'Chapitre 2 — la radioactivité', ext: P, mb: '14.9', fid: '1F3m35Zi79idEJWtUh0ux0BNshRXmc8pw' },
        { title: 'Chapitre 3 — la cinétique de la radioactivité', ext: P, mb: '8.7', fid: '16kWKSRhgLgxGatdaO4-1kq_6Mij55uCk' },
        { title: 'Chapitre 4 — l’interaction des RI avec la matière', ext: P, mb: '13.2', fid: '15Ykk_2meRbYnsHgNTYxvwwg5W2fU7Ho7' },
        { title: 'Notes — la radioactivité', ext: P, mb: '10.5', fid: '1yYSTAGJsULQfI750hhpKJ0D7K36lW-Py' },
        { title: 'Résumé — la cinétique', ext: P, mb: '0.6', fid: '12jsHEcEHPAwRUrZPP1hab2-nbXUqrarO' },
        { title: 'Résumé — les détecteurs', ext: P, mb: '1.1', fid: '1x1o_-4GrCVcUtI8wA37XeR3SCqf-GXGP' },
        { title: 'Résumé — la radioactivité', ext: P, mb: '1.0', fid: '1HhKE31_TlIPEndd-wSpLYZowSnN5_OvK' },
        { title: 'Résumé — les protons', ext: P, mb: '0.8', fid: '1XyRbkFwodMajXtWr2QuNcZmBgCm8vMzW' },
        { title: 'Résumé — ionisation et excitation', ext: P, mb: '0.9', fid: '1TLsaOcfH5tx-EysGLSE0VuoLSmOjmGVs' },
      ],
    },
    {
      id: 'resumes-gen', where: 'notes', title: 'Résumés généraux', icon: 'file',
      items: [
        { title: 'Résumé — biophysique PCEM2', ext: P, mb: '11.6', fid: '1V45TpDMMOqFjWIS1BEYJcM3C6KSjFceU' },
        { title: 'Résumé — quelques chapitres', ext: P, mb: '14.5', fid: '1MPRy_1jFFQyfxbvBV8umgWmcFfTUqTBv' },
        { title: 'Résumé organisé', ext: P, mb: '1.2', fid: '1HL_Yjv5mZv9yLSD-T7O2qRECPnYUQRBF' },
        { title: 'Résumé — Brahim', ext: P, mb: '3.9', fid: '1qhcOrfqFiDJeIXg9BsTaiVCcOa5zechI' },
        { title: 'Les proportions justes des QCM', ext: P, mb: '3.9', fid: '1Sk2fO_cnaveSOxhxe5J0d2KuGllo6ukm' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens — UNEM', icon: 'quiz',
      items: [
        { title: 'Session 2024', ext: P, mb: '7.5', fid: '1__zidyKkFmlNh_8CxI6SOfx7zaHl7gqD' },
        { title: 'Rattrapage 2024', ext: P, mb: '4.6', fid: '1P6G98pOPreIcPNtaGTWiVIuuUIErnRAC' },
        { title: 'Session 2023', ext: P, mb: '0.4', fid: '1iBKbjGxhyas_4PuHi5jQ1SV2A2euRlzY' },
        { title: 'Rattrapage 2023', ext: P, mb: '0.2', fid: '1AzSYw0MRo16IQrIHSzaNxlxDjhvv2B6w' },
        { title: 'Session 2021', ext: P, mb: '10.0', fid: '1sMyRF1bQXVn4Y42j2zzoGVWEQ4nxWfg-' },
        { title: 'Session 2019', ext: P, mb: '0.3', fid: '1w1EqFPzL4ZiB8oZrPBvcND24H87IuO4l' },
        { title: 'Session 2018', ext: P, mb: '0.2', fid: '1EVuVYxf6gScybgRNcKwxql4o88qNvbco' },
        { title: 'Rattrapage 2017', ext: P, mb: '0.3', fid: '1U18z7TWgGC7Vt3mSr9E9H3FELUqjAGtE' },
        { title: 'Session 2016 — juin', ext: P, mb: '2.0', fid: '1V2Eh0m8zZen-Y2Z9uKTPZ2VQ_ZFKpo3h' },
        { title: 'Session 2016', ext: P, mb: '1.9', fid: '1K3fX_OU-_bkd1CakRqD2XvHsUH5ThPJy' },
        { title: 'Tous les examens — recueil', ext: P, mb: '59.7', fid: '11W78JNSGcDEZ9gei7Dfe9IUbDMwKDUDa' },
        { title: 'TD — PCEM2', ext: P, mb: '0.4', fid: '1HkdNkl5UcPZZGRkBnz7GVDOAtYdcLjUV' },
        { title: 'Correction — majorat 2024', ext: P, mb: '2.1', fid: '1xrCwaBT-dr5q0kHKGWhpHWtElq-NQ7Du' },
        { title: 'Correction — majorat 2024 (2)', ext: P, mb: '0.5', fid: '1ZJ-02Bwkj2gAQP1m6lMv197Xay_9WF1d' },
        { title: 'Correction — recueil', ext: P, mb: '0.4', fid: '1IGdKXfkwXvrI7Cewx7q9D7wBKvEDD3NC' },
        { title: 'Correction — recueil (2)', ext: P, mb: '0.4', fid: '1RdnN1R_sock7Qf1HRCKDyvqq4G5wWg-S' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés par chapitre', icon: 'quiz',
      items: [
        { title: 'Isolé — chapitre 1, l’atome', ext: P, mb: '4.5', fid: '1X0WAX6Wu70Gqo9GeeDp87pAvym5jcfiI',
          versions: [] },
        { title: 'Isolé — l’atome (2)', ext: P, mb: '5.5', fid: '1wwZsffXfsuJrnw9ZcKKcoELNySL8Wryc' },
        { title: 'Isolé — chapitre 2, la radioactivité', ext: P, mb: '5.1', fid: '11zSJCmUzF-SvJTw8XRTEBbJPPQZvCfzz' },
        { title: 'Isolé — chapitre 3, la cinétique', ext: P, mb: '0.8', fid: '1bpLZ0dhzBaIeI89ADSABi83KZ6YKWzGg' },
        { title: 'Isolé — chapitre 4, interaction des RI', ext: P, mb: '0.4', fid: '1LGPqzw1xih_OnelFen9KZ6bJhlOdw5NL' },
        { title: 'Isolé — chapitre 5, les détecteurs', ext: P, mb: '0.6', fid: '1m1xgAoKGWDdktu14cbt3MG_zX-bEtZqy' },
        { title: 'Isolé — chapitre 6, radiobiologie', ext: P, mb: '1.2', fid: '1XgLah1sFa_-1JZMdhyMXHenkg18ZHOfL' },
        { title: 'Isolé — chapitre 7, radioprotection', ext: P, mb: '0.4', fid: '1LEK_vHa7l-LCm5H6YGsr2D8Zgd8MbihR' },
        { title: 'Isolé — chapitre 8, l’audition', ext: P, mb: '2.4', fid: '1mD2rjAvJwU7TDzhxegDqWxiHgSgtZ547' },
        { title: 'Isolés — recueil complet', ext: P, mb: '26.7', fid: '1qqDVEzwUAg2meIBhEhuT_c38YCsWO8lP' },
        { title: 'Isolé — Marrakech', ext: P, mb: '4.3', fid: '16MeRdXjr1wBGjMrmQtNFvbnQPVCEacmC' },
        { title: 'Isolé photographié — 2022', ext: J, mb: '0.2', fid: '12_-y-6GwW2ikKmT_z9eTVkWziRbnfObZ',
          pages: ['12_-y-6GwW2ikKmT_z9eTVkWziRbnfObZ', '10CTF9mnIsvxeMrdSyIO8YCENnexUGQUI', '1W6zD_yfqkaCfnO2SLtJFFdyiwU3Nh8ne', '1AfhFHwPAfR_63xry3rArDSx0OHEU88l9'] },
        { title: 'Révision 1', ext: P, mb: '0.2', fid: '1qFfGLeeihQTjFAtDZNzIbHcjBPdE64kp' },
        { title: 'Révision 2', ext: P, mb: '0.1', fid: '1tXodbd0on3cGS9I0pIOWOVNw6RXuCBZX' },
      ],
    },
    {
      id: 'maroc', where: 'quiz', title: 'Examens — Marrakech', icon: 'quiz',
      items: [
        { title: 'Questions d’examen 2014 à 2021', ext: P, mb: '73.3', fid: '1En7n_CspF52BfKnreHcwGt46p5Y6eNjy' },
        { title: 'Questions d’examen 2014 à 2018', ext: P, mb: '56.0', fid: '1gOOE9fkzTOUhFOsNZUzRp6e23ZWKqAcJ' },
        { title: 'Examens corrigés', ext: P, mb: '3.3', fid: '1zWXZanDaDarWMPlgM0cPub0XjnWot7lS' },
        { title: 'Session 2024', ext: P, mb: '1.9', fid: '1b581mvHr390V2roeaPjpqdndmA-CK1yb',
          versions: [] },
        { title: 'Session 2024 (2)', ext: P, mb: '0.7', fid: '17bJ0_PATVJoLpgszkmut87JHCphXVQ6C' },
        { title: 'Session 2023', ext: J, mb: '0.7', fid: '1xmL1m1xpkXAyy001njysZ9IewDo27M85',
          pages: ['1xmL1m1xpkXAyy001njysZ9IewDo27M85', '1bD6cEMpgtiSUHtBOYeUCQN0hopvwWuk-', '1hJSD5T2koPixK1FBhnmPtfmyvF4mHPif', '1boRXR4HonkDqdt1ZCah6ZXGL7qSTPf9o', '1sQ1y8PfJAQGhRHzuxoo6e7gEe_12h1TR', '1i3QgxVmM-gyIw7q4BHWq21Ki1_P1XdJq', '141ZyN5vp5ClzZ3LomSeS4vguw8Lp7FWv'] },
        { title: 'Session 2022', ext: J, mb: '2.2', fid: '1hBKNwtfWyvcYYKLT4Wk2B1LFT6Egh_-t',
          pages: ['1hBKNwtfWyvcYYKLT4Wk2B1LFT6Egh_-t', '1k-gDsRzKuS-jSxdYNL7KqUIybBeLzatn', '1o8-yq4FdqI5IIghHQXAduOvvLD4KSfku', '1qiFkiYQ8gmZaOJy8UmagwN4gqNkNjL9W', '1dBxNigKFTy-i1pnf-_tt66ha-3W5AloV', '1GeY4Rza4oFa0nsgNcZStGM0t45kq717s', '1wSyFgDyn5YJ1fIXFPpR43QCeiqayh8GK'] },
        { title: 'Session 2021', ext: J, mb: '0.5', fid: '1JXnWiVUnE3UGtQt6ruNEs8hmCitgBmGH',
          pages: ['1JXnWiVUnE3UGtQt6ruNEs8hmCitgBmGH', '1FdoWh4_BE-QFjYl5abzWGbeWaBM2PluA', '1q3NFQ6MsLi17nQ9UXoGQRVKRppdY3KyZ', '1k1v2jXLbq0bdqRl9eyCZG5FMJGZUq8A6', '1GtgI_uLdf4IBXwK97nj-_Z-GhjbVyOJm'] },
        { title: 'Session 2021 (scannée)', ext: P, mb: '2.6', fid: '1TeTRupn7Oo3oPh1U7DiANxSuClhQfj-W' },
        { title: 'Session 2018', ext: P, mb: '0.3', fid: '16ZzI1q3dTeu3Sr0ssL2sHy-17iqxyBnJ' },
      ],
    },
  ],
};
