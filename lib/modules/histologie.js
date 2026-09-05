// HISTOLOGIE — S1, organised.
//
// The course is seven appareils, taught the same way every year. Drive keeps
// three years of each — `COURS 2024`, `DIAPO 2023`, `POLYCOPE` (2021–22) — so
// the same lecture appears three times under three folder names. Here the most
// recent is the lecture and the older years hang off it.

const P = 'PDF';
const J = 'JPG';

export const HISTOLOGIE = {
  id: 'histologie', promo: 'pcem2', semester: 'S1',
  name: 'HISTOLOGIE', icon: 'micro', tint: 'purple',
  professors: ['Nozha'],

  chapters: [
    {
      title: 'Histologie des appareils',
      subtitle: 'Digestif, urinaire, respiratoire, lymphoïde, endocrine, tégument',
      lectures: [
        { n: 1, title: 'Le système digestif', ext: P, mb: '4.4', fid: '12GdU1K1GbLWJY0QMzu_8IDm1XfEJudzv', year: 2024,
          versions: [
            { title: 'Appareil digestif — partie I', year: 2023, mb: '4.2', fid: '1j7jnpyee16lmuWxB29lf2jkQxwaFLQ9S' },
            { title: 'Appareil digestif — complet', year: 2023, mb: '5.9', fid: '1dq2PBw4kSh1CM-Vw6LCCsJRy_2ioHTLD' },
            { title: 'Système digestif', year: 2021, mb: '4.7', fid: '1KdIKWs7dLEeZUqYXKb4pxYIkto_FOWFJ' },
          ] },
        { n: 2, title: 'Les glandes annexes du tube digestif', ext: P, mb: '1.0', fid: '1JflL6fhEEwBraaGayvqi65tuZGW6eh6a', year: 2023,
          versions: [
            { title: 'Les glandes', year: 2023, mb: '2.9', fid: '1PGMHuAcsnVHMQsHQxIm4eEMNW4WOU2Zu' },
            { title: 'Les glandes annexes', year: 2022, mb: '1.0', fid: '1C3ISVjq5yUXVqE98JElkWuyuIoF3rdUb' },
          ] },
        { n: 3, title: "L'appareil urinaire", ext: P, mb: '0.9', fid: '1I3xKoms2IQd9O9kITwz1kB2R0F0a5ift', year: 2023,
          versions: [
            { title: "L'appareil urinaire", year: 2023, mb: '4.6', fid: '1HVmSWnsAkVyncQa4Hf_fzHuf8TZKt392' },
            { title: "L'appareil urinaire", year: 2022, mb: '0.9', fid: '1cmfS5_5UNcPszOLlX6HF_4cjiAVBxE9k' },
          ] },
        { n: 4, title: 'Le système respiratoire', ext: P, mb: '0.8', fid: '1b_xMnNhrcZXx6tQtNTx1xmvE-g5dGH37', year: 2024,
          versions: [
            { title: 'Le système respiratoire', year: 2023, mb: '2.9', fid: '11dewu9chvZGeTsWfUiVkdLlXwU081e7N' },
            { title: 'Le système respiratoire', year: 2022, mb: '0.8', fid: '1ZvdmX8Hlcxi3szFSAtRhQupnBsm3-RBy' },
          ] },
        { n: 5, title: 'La peau et ses annexes', ext: P, mb: '0.6', fid: '1AeJLGP5JK6-HLtsI8OnV1TjLfLS4niLa', year: 2023,
          versions: [
            { title: 'Glandes mammaires et peau', year: 2023, mb: '2.7', fid: '15mjbPdRqcchkkfXXXPLZ_j4F9PuKlibC' },
            { title: 'Peau et annexes', year: 2022, mb: '0.6', fid: '1hzL_7r0tnOqQ4qolyrhItE37qrvexpHH' },
          ] },
        { n: 6, title: 'Le système lymphoïde', ext: P, mb: '0.9', fid: '1PZN_dAlUbjX56nQubHbNZAVQEm6f2Vvt', year: 2023,
          versions: [
            { title: 'Le système lymphoïde', year: 2023, mb: '8.6', fid: '18tL7czZXvEnp6LRGJGFYqfzlsPl7DY7V' },
            { title: 'Le système lymphoïde', year: 2022, mb: '0.9', fid: '1hoR4-3iDd43pw57mwLhSF2KagHosbrpB' },
          ] },
        { n: 7, title: 'Le système endocrine', ext: P, mb: '1.3', fid: '10Pyw8E8LGER9z3tc95VIZZgbf9uDeybp', year: 2023 },
      ],
    },
  ],

  sections: [
    {
      id: 'livres', where: 'archive', title: 'Livres', icon: 'book',
      items: [
        { title: 'Embryologie et histologie humaines — Brisset, Courtot, Tachdjian', ext: P, mb: '339.9', fid: '14SRhgV8tLqVg1QV9c5BTMrWcFhEuYDfh' },
        { title: 'Histologie et biologie cellulaire', ext: P, mb: '142.8', fid: '1J3LZ8pf4yFEQIeVHHGomxwpDWKkznePO' },
        { title: 'Histologie — l’essentiel', ext: P, mb: '7.1', fid: '1st-u5wKlToZLu9L26Hv0kAHBe2mIW8ak' },
      ],
    },
    {
      id: 'resumes', where: 'notes', title: 'Résumés et fiches', icon: 'file',
      items: [
        { title: 'Notes des sites', ext: P, mb: '45.5', fid: '1nNVwjGJOWdLv385wiaWElWZeDBhtTM39' },
        { title: 'Notes des sites (2)', ext: P, mb: '19.6', fid: '1kqRgSv54orOYG9ucrP81ey23acw_PdaK' },
        { title: 'Le système respiratoire — résumé', ext: P, mb: '7.6', fid: '1SGFyMe1jKFQqO2AKL2zEd30r_P9IIwHS' },
        { title: 'Les papilles linguales', ext: P, mb: '0.6', fid: '13EWdUD4c2xThkGf8BQhU25IdcP-HfidA' },
        { title: 'La peau et ses annexes — fiche', ext: P, mb: '0.1', fid: '1FNRVm5ybva4BMCk3VWqsdfMoRDsHZ4rP' },
        { title: 'Les glandes fundiques — fiche', ext: P, mb: '0.0', fid: '1OKXdqIQ5HLdsRZhzp-iwdL174AY6SJ4u' },
        { title: 'Le système lymphoïde — fiche', ext: P, mb: '0.0', fid: '1kw2lFPi3RfOnWx60lVXSIu6xBJolC2rE' },
        { title: 'Planches scannées', ext: P, mb: '8.7', fid: '1R8Qy4TIy0_CEQeUPpJv_Eo_tvLh9_MUn' },
      ],
    },
    {
      id: 'notes', where: 'notes', title: 'Notes d’étudiants', icon: 'file',
      items: [
        { title: 'Notes — la peau et ses annexes', ext: P, mb: '41.5', fid: '1okfSi0trBlgojRgcNvo2aqvIf3LPr0BO' },
        { title: 'Notes — le système endocrine', ext: P, mb: '34.2', fid: '15_yMnJeXcvQIDWOfCo_tNHw1WmDyeoBd' },
        { title: 'Notes — l’appareil respiratoire', ext: P, mb: '28.9', fid: '1Gu_GdJSLOO2_bAhgzaDpZNs0JYYM7VV4' },
        { title: 'Notes — le système lymphoïde', ext: P, mb: '23.1', fid: '1-vc2Zbr2uT09f0CqIuI6WNnVkBDhv_en' },
        { title: 'Notes — l’appareil urinaire', ext: P, mb: '20.4', fid: '1g-J3vgQBidL0c65xRB9m4m6EpCk4tV1b' },
        { title: 'Notes — cours complet', ext: P, mb: '20.7', fid: '1TZCF5WfR7ZFe1LsBsHj2VHFnl9QiuPax' },
        { title: 'Notes — la peau et ses annexes (2)', ext: P, mb: '17.9', fid: '1TPOQAQhJp8ICUQLyAl-46CxIqnsmRbq-' },
        { title: 'Notes — l’appareil digestif', ext: P, mb: '2.1', fid: '1_j5L44cCvyZya0a6kAjnIGGWbREqaQqr' },
        { title: 'Notes — les glandes annexes', ext: P, mb: '0.7', fid: '1PvLTd6-bOYQnq-PNzarTxHZikIgeemO0' },
        { title: 'Notes manuscrites — 2024', ext: P, mb: '6.7', fid: '1JYXFOVyrX-UeXfRyR1j7pCAza6jhRX3l' },
        { title: 'Notes manuscrites — 2023', ext: P, mb: '6.7', fid: '1aZkkhpRHp85OmbdO-6aDMPNiQUTKEdQp' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Session 2025', ext: P, mb: '8.4', fid: '1__Wmca8cUGHTS4bbWVZNI5Rg1hQLe8s_' },
        { title: 'Session 2024', ext: P, mb: '16.7', fid: '1VOCl3rKokA5MmOwQ7BzZSM7azOMVwPin' },
        { title: 'Session 2024 (photographiée)', ext: J, mb: '5.6', fid: '1AUz2jB-Bun4_XOFo1KgqhGrzNljsjIJS',
          pages: ['1AUz2jB-Bun4_XOFo1KgqhGrzNljsjIJS', '16E5X9LzkiL5yB279YFX0xfnW1CVXm32n'] },
        { title: 'Session 2023', ext: P, mb: '0.4', fid: '1EAaJ41KPAuqNDjWtONsv65eI2DkFeqac' },
        { title: 'Session 2022', ext: P, mb: '1.5', fid: '1LlL8dQPWB3dg_xPVS_NtpzGlcok9Rzpp' },
        { title: 'Session 2021', ext: P, mb: '3.5', fid: '186DWaZ4XNLAK0ZEEjIKJyIk8p1gHFjKM' },
        { title: 'Session 2020', ext: P, mb: '2.8', fid: '1rydAcdwvHrlXIKlx3dB1X772aA3MYmY4' },
        { title: 'Session 2019', ext: P, mb: '3.6', fid: '1cuHSeANZZHohW8PctKl6k188d_5796zp' },
        { title: 'Session 2018', ext: P, mb: '0.5', fid: '1dhYa3yS8dTMXlqpLO6IA8JmQFEOpl5JC' },
        { title: 'Session 2017', ext: P, mb: '13.6', fid: '1DvdKnDvhWtYd9t2CE0sPzW8LUYLCOdJn' },
        { title: 'Session 2017 (autre version)', ext: P, mb: '3.9', fid: '18mIG_bzbYr72J6djGf_njGIW5UZQVM7m' },
        { title: 'Rattrapage 2024 — histologie et embryologie', ext: P, mb: '0.9', fid: '1eXZcLmrmq75zsKutZQK32TmHm0wh23IL' },
        { title: 'Rattrapage 2023', ext: P, mb: '0.4', fid: '1n0ou41tA-DonP8cFdOxXxXs2Mre_17Bp' },
        { title: 'Rattrapage 2022', ext: J, mb: '2.3', fid: '1BT6wmMW1DDNIsNWwho6mjJdRjG33bCj5',
          pages: ['1BT6wmMW1DDNIsNWwho6mjJdRjG33bCj5', '1h2xoDkC7WtdpXnNVKUsY2_e3OfOo6t6j', '1DaYHOIPdUqSTbyil4srVTYhtkNFkFiag', '1PAzEokps6wTU9BVxe1r007PEu9-C7bTE', '1W0UZkUitdnBsmNS88K7RIjrgyI_32iqr', '1wJcZHGszhx1g49w7OWlBTycWi5pjYMf9', '1qzLz8mIDvO3jJh3pfTgpGvJ3WGhz_nd1', '1srmmNbIVKp5y96ZZErl7Fun5_1YSRCBg', '1kxaUS_JfDQN3kmfh8fitIgLdFrCMSaEG'] },
        { title: 'Rattrapage 2021', ext: J, mb: '0.5', fid: '1-BNtcQMDoKEJ0f-UZM5fQLALcVRJ-MiB',
          pages: ['1-BNtcQMDoKEJ0f-UZM5fQLALcVRJ-MiB', '1CW-mXE0Gunkymbl_hZqm2ZWd8sqPp5Td', '1S0H51NYaTkEoPoLQjgMR9e62vjoFZ_mM', '1aMj3Obtq6WHm50T2ek8zHD2hmT-OkfXC', '1GqOVw1a-sS_a_lTBa74piHhLp_5tuBkF', '1S0csda5DL9S0bBnwzBpMw-f6NTalfffQ', '1mzKGNjsUBlG7OfqegJjtyOB9zaqLL0l6', '1OsbW8C_nDMIDSCudqFXfmPZ9i8cW9lQM'] },
        { title: 'Rattrapage 2020', ext: P, mb: '0.7', fid: '1zgTA6oY0JyhW6tMzICTR7P4BbCVvxT18' },
        { title: 'Rattrapage 2019', ext: P, mb: '0.2', fid: '1_YK-HxnQzfMQO-OiTgMwTCZ7K_j-HG5P' },
        { title: 'Rattrapage 2018', ext: P, mb: '1.9', fid: '1fTBtSUTQQz1xtff0PqXmc1UZZLJD9VYU' },
        { title: 'Rattrapage 2017', ext: P, mb: '0.5', fid: '1DZShSWO9fhOh3fAhbYm1woW00560e1h1' },
        { title: 'Session histologie–embryologie', ext: P, mb: '0.5', fid: '1YpfRkWj1qkz4013uzVZRNhce91-p_URJ' },
        { title: 'Session histologie–embryologie (non scannée)', ext: P, mb: '0.5', fid: '11ULBBlv-3LNRRRQu0sc-wMe7qZPZ2CpM' },
        { title: 'Session embryologie', ext: P, mb: '0.4', fid: '1ArfRpw7AnrxiVbW040pMTGyryNIv6O_n' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés par chapitre', icon: 'quiz',
      items: [
        { title: 'Isolé — l’appareil digestif', ext: P, mb: '0.9', fid: '1WGh5kjGvnUbkiZIDj7TIHLt_SOlp5RXA', correction: '1s-SRa-idtY2R3C_p36mMYeIlNy97V0qd' },
        { title: 'Isolé — les glandes annexes', ext: P, mb: '0.5', fid: '1fcfQnyZAR0o_nDAMn9tGwskwmxnuvGj0' },
        { title: 'Isolé — l’appareil urinaire', ext: P, mb: '0.8', fid: '1bxBoNO9dNKfrU6xSIR31s-A3iJlmg-3A', correction: '17gh6JOAIuYky2n8E_uJA_4qVNBrBNC6Z' },
        { title: 'Isolé — le système lymphoïde', ext: P, mb: '1.8', fid: '1OZvWU0qwohyIHye8t8wH9MkqSpxyH614', correction: '1WOGttouVvKOmL2c2_UrJviZCQPrziUYM' },
        { title: 'Isolé — le système tégumentaire', ext: P, mb: '0.4', fid: '1pcLkz123qBREzR4mBDvTtq_m1kL33fkK', correction: '1b7bOY2oF9v-dVDlwWW7lcPpSrY_7sczu' },
        { title: 'Isolé — les glandes endocrines', ext: P, mb: '0.9', fid: '1ooP9TbXTlh3XRjIQQTzjfGYuByhmIyUR', correction: '1X61VcVD4-g_L0sQZKTPYzTAcYAXd2y1z' },
        { title: 'Isolé — l’appareil respiratoire (correction)', ext: P, mb: '0.1', fid: '1Ewn9c8dnmOVP2jfoRqZB7a3wNDDKRvzY' },
        { title: 'Isolé — l’appareil urinaire (correction modifiée)', ext: P, mb: '0.1', fid: '1jA5sYlD4sMV9_dXqohzVVepWqbfoGo9w' },
        { title: 'Isolé — l’appareil urinaire (correction 2)', ext: P, mb: '0.2', fid: '1IdhdR7Ytrsa90EmJTj963nXsRjVDO4P6' },
        { title: 'Isolés — recueil 2022', ext: P, mb: '20.3', fid: '1M_VrI-nFS_PO3bvO8SIGOEppbZJAxt5D' },
        { title: 'QCM Sfax — histologie et embryologie', ext: P, mb: '2.4', fid: '1JIRSqYs1e1Jyacje1aTXJxCg7lRKNqSw' },
      ],
    },
  ],
};
