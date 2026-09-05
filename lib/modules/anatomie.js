// ANATOMIE — S1, organised.
//
// Drive holds these 143 files in folders named after whoever uploaded them:
// `COURS VIEILLES/COURS/SOUMARE`, `KLEIB 2024`, `Ali ghorbel/Cours`. A student
// looking for the cerebellum has to know which teacher's folder to open, and
// which of `-CERVELET PDF 2023.pdf`, `cervelet anatomie.pdf` and
// `Cervelet Cour Kleiib.pdf` is the one they sat through.
//
// So nothing here uses a Drive name. Every lecture is filed under its chapter,
// numbered straight through the module, and titled in French. Where several
// teachers cover the same lecture the others are kept as `versions` on it
// rather than as separate entries — the same material, not more material.
// True duplicates (Drive's `(1)` copies, a .pptx sitting beside its own PDF)
// are dropped: 12 files, none of them anything the student loses.
//
// `fid` always points at the untouched original. The Drive is read-only.

const P = 'PDF';

export const ANATOMIE = {
  id: 'anatomie', promo: 'pcem2', semester: 'S1',
  name: 'ANATOMIE', icon: 'person', tint: 'purple',
  professors: ['Ghorbel', 'Kleib', 'Soumaré'],

  chapters: [
    {
      title: 'Tête et cou',
      subtitle: 'Ostéologie, muscles, vaisseaux, organes des sens',
      lectures: [
        { n: 1, title: 'Introduction — organisation et fonctions', ext: P, mb: '9.7',  fid: '14I6vtXSlSSsNuoE7gqWh53LHPZsZ1L8G', prof: 'Ghorbel' },
        { n: 2, title: 'Ostéologie de la tête',                    ext: P, mb: '15.5', fid: '1gfPvaavkrbZNjlcuA2zf1LJ63LZ-rfS-', prof: 'Ghorbel' },
        { n: 3, title: "L'appareil manducateur",                   ext: P, mb: '7.4',  fid: '1RBfT7yRrboOsk1erxCVTguVX_OuxgvZ_', prof: 'Ghorbel' },
        { n: 4, title: 'Les muscles de la tête et du cou',         ext: P, mb: '2.7',  fid: '14xgHFfIUN_OP2cgss4bLyLshh0BUIrWG', prof: 'Ghorbel' },
        // Vessels before lymphatics — 5 and 5b, never the other way round.
        { n: 5, title: 'Les vaisseaux de la tête et du cou',       ext: P, mb: '7.4',  fid: '1wI4Iu1vO7ujhsUNnkHODj40AartW8pZu', prof: 'Ghorbel' },
        { n: '5b', title: 'Les lymphatiques de la tête et du cou', ext: P, mb: '1.4',  fid: '1p2-HsGXH1kAsD3CQu7H-D-NJiCPIN-iM', prof: 'Ghorbel' },
        { n: 6, title: "L'appareil de vision",                     ext: P, mb: '2.5',  fid: '1HVRXJUA3deUQuAPNMo7WQ6M4Pa6RrSmU', prof: 'Ghorbel' },
        { n: 7, title: 'Les fosses nasales',                       ext: P, mb: '3.5',  fid: '1jcvtES-XdIuJTFoZ1k6uSMgr7HTE_khx', prof: 'Ghorbel' },
        { n: 8, title: "L'oreille",                                ext: P, mb: '2.3',  fid: '1mQzkun5hunohSJPMjlcJQGRYjDvP04wW', prof: 'Ghorbel' },
        { n: 9, title: 'Le larynx et le pharynx',                  ext: P, mb: '14.5', fid: '1H3jUUwVlIgSma2Pg7E5JbRiGWy5o8r5R', prof: 'Ghorbel' },
        { n: 10, title: 'La thyroïde',                             ext: P, mb: '9.0',  fid: '1Ob3bePXRBUedk__Gye_ApSKf41fUzU-H', prof: 'Ghorbel' },
        { n: 11, title: 'La cavité buccale et les glandes salivaires', ext: P, mb: '3.9', fid: '1-ePbJTb2PucG5HqfRFeaFkTLEoxXDegC', prof: 'Ghorbel' },
        { n: 12, title: 'Topographie de la tête et du cou',        ext: P, mb: '3.2',  fid: '1HtrOc4LAYGfAjSd6IMDa2cvtPwzyK2us', prof: 'Ghorbel' },
        { n: 13, title: 'Le crâne', ext: P, mb: '2.2', fid: '1UdqKPgdQMbU07CkLor-OAW5A8yOpcFY9', prof: 'Kleib',
          versions: [{ title: 'Le crâne', prof: 'Kleib', year: 2020, mb: '1.6', fid: '1loZNQ4CQfk8-I1kx3Zc5o2cL3OnsTyHt' }] },
        { n: 14, title: 'Le rachis', ext: P, mb: '1.7', fid: '1KfqsdjDzN0hCF63ExzhbrcMbzlOxEdTw', prof: 'Kleib', year: 2024,
          versions: [
            { title: 'Le rachis', prof: 'Kleib', year: 2022, mb: '18.0', fid: '1UxFTgxP8GU0jM5rf9M_0BoheH4TLpgM3' },
            { title: 'Le rachis', prof: 'Kleib', year: null, mb: '6.3',  fid: '1JAMTktXCBBkF5Ock4K2JJ-kmMdRLReTL' },
            { title: 'Le rachis — questions', prof: 'Kleib', year: null, mb: '2.5', fid: '10dbGdpiPl3d-ClC8dYsuZbd81tqpJ3Wp' },
          ] },
      ],
    },

    {
      title: 'Neuro-anatomie',
      subtitle: 'Système nerveux central, vascularisation, méninges',
      lectures: [
        { n: 15, title: 'Introduction à la neuro-anatomie', ext: P, mb: '26.4', fid: '1l0tIfLOLuBcmOuLjTjEqLVzI6NjplDcD', prof: 'Soumaré',
          versions: [{ title: 'Introduction à la neuro-anatomie', prof: 'Soumaré', year: 2021, mb: '33.4', fid: '1gUq5T2rGCERqphVawYrjVElqTb3lSWtm' }] },
        { n: 16, title: 'Embryologie du système nerveux', ext: P, mb: '1.1', fid: '1HQD2QJlo3m0k5OAJTjt7ezBpwCQOgg9a', prof: 'Ghorbel', year: 2023 },
        { n: 17, title: 'La moelle spinale', ext: P, mb: '3.9', fid: '1UNbG29AIt3Ikmv9JetAgl_m7JNrV1PJn', prof: 'Ghorbel', year: 2023,
          versions: [
            { title: 'La moelle spinale', prof: 'Kleib', year: 2024, mb: '2.5', fid: '1M6mN8Geq3wNTliA3BNfJVv5bipLWUBJr' },
            { title: 'La moelle spinale', prof: 'Kleib', year: null, mb: '0.8', fid: '1XyQ7k5YTgjkxUGzGUTzp3LfYots-by18' },
            { title: 'La moelle spinale', prof: 'Soumaré', year: 2019, mb: '21.7', fid: '14HXSkpte0sQvLvdXC7etRHBIym4D84-W' },
          ] },
        { n: 18, title: 'Le tronc cérébral', ext: P, mb: '3.6', fid: '1f6DAICq1V2RxGwzNjx9iGsX-RPANfcsW', prof: 'Ghorbel', year: 2023,
          versions: [
            { title: 'Le tronc cérébral (sans les nerfs crâniens)', prof: 'Soumaré', year: 2024, mb: '4.0', fid: '1Gg9PBqCQI1ga9tEphHByEmXEm0_cSzz2' },
            { title: 'Le tronc cérébral', prof: 'Soumaré', year: 2018, mb: '2.7', fid: '1osYMvZ27KDjhReI3YxtXpza_u68lDep6' },
            { title: 'Le tronc cérébral', prof: 'Kleib', year: null, mb: '3.9', fid: '1aIuYL6XIg-E2ZVpGg5rmqUk3A8OBInud' },
          ] },
        { n: 19, title: 'Le cervelet', ext: P, mb: '2.6', fid: '1lQyItXprWQgOgczEhkk-1HVnfQ8_2b8E', prof: 'Ghorbel', year: 2023,
          versions: [
            { title: 'Le cervelet', prof: 'Soumaré', year: 2024, mb: '4.0',  fid: '1dn-4TuSK6EDTXzK9pZxCiTNrX26YwMcu' },
            { title: 'Le cervelet', prof: 'Soumaré', year: 2019, mb: '10.9', fid: '1tltyqT2JK5XdOS-zvd-TpW2qQ6u0res8' },
            { title: 'Le cervelet', prof: 'Kleib', year: null, mb: '2.5', fid: '1P1X6-qBXdlXiC3WC5GCz5aRiG95jt32r' },
            { title: 'Le cervelet', prof: 'Kleib', year: null, mb: '1.2', fid: '1tID-aOm-WXLO5vWC9Ww2qkr26lGz-CCw' },
          ] },
        { n: 20, title: 'Le diencéphale', ext: P, mb: '3.0', fid: '1KX1XINySkSpicRWym04pNU33f44f506l', prof: 'Ghorbel', year: 2023 },
        { n: 21, title: 'Le télencéphale', ext: P, mb: '2.3', fid: '1IorCbPcwy4gyhgww2muOwxIPweNjVpVv', prof: 'Ghorbel', year: 2023 },
        { n: 22, title: 'Morphologie externe lobaire et anatomie fonctionnelle', ext: P, mb: '2.8', fid: '1txejUnf5S4rLZjbtwCY1i_iNMeAXUayo', prof: 'Soumaré', year: 2024 },
        { n: 23, title: 'Configuration interne — les ventricules encéphaliques', ext: P, mb: '4.9', fid: '1Hi7Lt8Ws4nfTeKHSjbuvq20U5MdrzVNQ', prof: 'Soumaré',
          versions: [
            { title: 'Les ventricules', prof: 'Kleib', year: 2024, mb: '1.7', fid: '1I2yHtYXoUluaVzzgPx8eOEm5XsoF2nS3' },
            { title: 'Configuration interne du cerveau (2)', prof: 'Kleib', year: 2024, mb: '1.0', fid: '1MjlXvPTePYJh8CwHQRqeNn5sxRnSOSV-' },
          ] },
        { n: 24, title: 'Configuration interne — la substance blanche', ext: P, mb: '41.5', fid: '1T1xB52H3km5G4FkFLtpvJyWaKzyYvpEm', prof: 'Soumaré' },
        { n: 25, title: 'Configuration interne — noyaux gris centraux et thalamus', ext: P, mb: '6.4', fid: '1sFhQybFyrqR96THtNTt4tquGORky5RBn', prof: 'Soumaré' },
        { n: 26, title: 'Les méninges', ext: P, mb: '3.2', fid: '1ZROJrNKXeja7nB_ck6aMYpQ_MGCr8D2Z', prof: 'Ghorbel', year: 2023,
          versions: [
            { title: 'Les méninges', prof: 'Soumaré', year: 2024, mb: '9.3', fid: '1M9QHLgNcJzcRTiDk-bfwWPMjB6QhlyU9' },
            { title: 'Les méninges', prof: 'Kleib', year: null, mb: '3.3', fid: '17J1CFn0w9DWR3VPIjMdIc_VnW12Wk_5h' },
            { title: 'Les méninges', prof: 'Kleib', year: null, mb: '1.5', fid: '1WejeXAr_oTdimvEpxQlhMREZlEBR4XyD' },
          ] },
        { n: 27, title: 'Vascularisation artérielle du cerveau', ext: P, mb: '1.5', fid: '1H-rp0yLvWVVPmoGyPheXgrxLI9NkFVqt', prof: 'Ghorbel', year: 2023,
          versions: [
            { title: 'Vascularisation artérielle', prof: 'Soumaré', year: 2021, mb: '4.6', fid: '1Gu9yXM2QSuBHHUa9Ep-aE6NjOgG6uSvh' },
            { title: 'Vascularisation artérielle (annotée)', prof: 'Soumaré', year: null, mb: '4.6', fid: '19T4pWjpmAi7E7xeILoEoECS5OsPB0jzj' },
            { title: 'Vascularisation cérébrale', prof: 'Soumaré', year: 2018, mb: '8.0', fid: '1snjs8GzLxrD1bh2oCl4UQTjfj5piWFSD' },
            { title: 'Vascularisation', prof: 'Kleib', year: 2024, mb: '1.5', fid: '1k3EH1cgmZonRKTSO4WLaDaQv9jPeBt8n' },
          ] },
        { n: 28, title: 'Vascularisation veineuse du cerveau', ext: P, mb: '2.1', fid: '1k-EuMF3TYSNZ9iBnM-Z1D9YL4y77M5fS', prof: 'Ghorbel', year: 2023,
          versions: [
            { title: 'Vascularisation veineuse', prof: 'Soumaré', year: 2021, mb: '3.8', fid: '1cKxGF-_8GQjntSJCeqtLSmaLrxXTA9u0' },
            { title: 'Vascularisation veineuse', prof: 'Soumaré', year: null, mb: '3.8', fid: '1m_cxwd3T4S-EVuZsQ-CXUs_2LWdmzAsH' },
          ] },
        { n: 29, title: 'Les nerfs crâniens', ext: P, mb: '0.9', fid: '1-R2efbRqKHiCDOp6DXEFQ-loH0d7FS4Q', prof: 'Kleib' },
      ],
    },
  ],

  // Everything that is not a lecture. Same rule: filed by what it is, not by
  // whose folder it happened to sit in.
  sections: [
    {
      id: 'polys', title: 'Polycopiés', icon: 'book',
      items: [
        { title: 'Système nerveux — Tome 1', ext: P, mb: '18.2',  fid: '1J1Th4318RgqZPT8mgEBqVlzHV6sm3QgF' },
        { title: 'Système nerveux — Tome 2', ext: P, mb: '23.9',  fid: '1TsCsaHQ9_DMDVjtXGZl43Mjp3nV4tttW' },
        { title: 'Neuro-anatomie — Pr Soumaré', ext: P, mb: '100.5', fid: '1UkcPXfkEFxX_0PMA_AXQkfk00HcRDNBI' },
        { title: 'Polycopié d’anatomie — Soumaré', ext: P, mb: '5.6', fid: '1XWKxsaB-yvU6VoawHX7O1-M0VHQ1gZ3x' },
        { title: 'Diapositives — Pr Kleib', ext: P, mb: '8.5', fid: '17Y4f0IaJegLlrpZh2Ml_B8_Qyn-kNfGz' },
      ],
    },
    {
      id: 'resumes', title: 'Résumés et fiches', icon: 'note',
      items: [
        { title: 'Résumé Kamina — S1', ext: P, mb: '6.3',  fid: '11h0XZXunbVsJ14hRZlf0ZVCMSG-efE5k' },
        { title: 'Résumé — ostéologie du crâne et neuro-anatomie', ext: P, mb: '66.0', fid: '1lDjGI4jKweHNxorPJMEhun4qXOY5rxwM' },
        { title: 'Résumé Kamina — le crâne', ext: P, mb: '1.1', fid: '1-bJEt7pZ7ZTgxTjC4SKTDK1J36ySGWsT' },
        { title: 'Les différentes vertèbres', ext: P, mb: '1.2', fid: '1LVMNb_j1WB-2o4eqa3L8jA4lthK7li9u' },
        { title: 'La vascularisation', ext: P, mb: '0.4', fid: '1RCIQvdQe6A3NxCtOgqE-9opJ2pkta3q2' },
        { title: 'Cours de Jean-Marie Le Minor', ext: P, mb: '4.1', fid: '1ayOjBUMUKHFOGAbDrrolXdDdFHTVxX6B' },
        { title: 'Résumé du cours de Kleib', ext: P, mb: '4.7', fid: '1ApfpkciLWipWVlgvKgZxxD_6RKQmuycF' },
      ],
    },
    {
      id: 'schemas', title: 'Schémas', icon: 'note',
      items: [
        { title: 'Schémas du Pr Kleib — 2024', ext: P, mb: '6.9', fid: '1-fAe3xxHpypbhWAV8StvOpKUhpkWSgkw' },
        { title: 'Schémas du Pr Kleib — 2023', ext: P, mb: '5.8', fid: '1aJaZBvBg_BrdNrmDhyJ85NaB7fAw5zRB' },
        { title: 'Schémas du Pr Kleib — planches', ext: P, mb: '3.9', fid: '1NDyniyWTjRwEhrSs_fkMnhJFb_NHXMNi' },
        { title: 'Schémas en noir et blanc', ext: P, mb: '5.5', fid: '1w3fsRXEA3B0mcPxKxKAlo-g_jVQK-T59' },
        { title: 'Schémas de Kleib — annotés', ext: P, mb: '1.0', fid: '1f1V4SGLn812B9x0RHja-rKxq6mMO9VEK' },
        { title: 'Le système nerveux en schémas', ext: P, mb: '7.1', fid: '1dM6jmYNOsD0v33a0b46rTiLu9Qm-VamY' },
      ],
    },
    {
      id: 'notes', title: 'Notes d’étudiants', icon: 'note',
      items: [
        { title: 'Notes du cours de Soumaré — 1', ext: P, mb: '7.4',  fid: '1dOQaZVl_76-artkcB54u_0jBWBDtshHq' },
        { title: 'Notes du cours de Soumaré — 2', ext: P, mb: '5.9',  fid: '15mZgd2JcqDsxON7v3dBRQZGV5h8NL6qQ' },
        { title: 'Notes du cours de Soumaré — 3', ext: P, mb: '7.7',  fid: '1PC1_OYjGDeCNKbl-sxpPbrQVtEJf_iSg' },
        { title: 'Notes du cours de Soumaré — 4', ext: P, mb: '5.6',  fid: '1BhBDC5WujJieUBow2nzqjr4F1BC4S4GG' },
        { title: 'Notes du cours de Soumaré — 2022', ext: P, mb: '31.4', fid: '16l6rfMecVBu9k4KWJF3UP_csEvhWf7t7' },
        { title: 'Notes du cours de Kleib — 2023', ext: P, mb: '24.8', fid: '1Zi-YcLYRIhYJdtSHGPC9i9FMVJGDF4Zz' },
        { title: 'Notes — noyaux gris centraux', ext: P, mb: '5.5', fid: '15ieCP6loEQUyqK7IEN7oPJNRtjCyP-3A' },
        { title: 'Notes — la substance blanche', ext: P, mb: '2.8', fid: '19EFCU12m54voJ3NzO6WTjTL3dz_8HbeB' },
      ],
    },
    {
      id: 'examens', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Session normale 2024 — neuro-anatomie', ext: P, mb: '37.5', fid: '1iwRZXK07Rwj0YW_Qio9ONHKbWTHqCL5p', correction: '1nu6sR4TwOViByz_vrDmAg44CzlHPBmRC' },
        { title: 'Session normale 2023', ext: P, mb: '0.6', fid: '1fY2mlw6h_nvnKgkh3SoFMZHLjZifyJRl', correction: '19k29kEzBFSMAfU7gdhGTmzel5i4_NE0k' },
        { title: 'Session normale 2022', ext: P, mb: '3.2', fid: '1eMhwXsjsyKFaYgEScfCbWtP6CJh7IIjX' },
        { title: 'Session normale 2021', ext: P, mb: '2.9', fid: '18XtJHyjDuk-dJvkPLx3jk8LbnwiU2SLD' },
        { title: 'Session normale 2020', ext: P, mb: '7.7', fid: '1WI4yotrtHZamhPqWm3sXBdI87oXzBaHt' },
        { title: 'Session normale 2019', ext: P, mb: '1.4', fid: '16-AWA-VPZRSLw4c9yHZ46ZuVETDwuv3I' },
        { title: 'Session normale 2018', ext: P, mb: '1.4', fid: '1TkAw2Iu9LF486hm8hbQwijf7OnF1OqGw' },
        { title: 'Rattrapage 2024', ext: P, mb: '2.1', fid: '1XEv-wdhLg7mdI_f6tk44gACYB1oZMj11' },
        { title: 'Rattrapage 2022', ext: P, mb: '4.9', fid: '19DvEHB5cAOF6X2TenW6uYo4ysGA2fXUb' },
        { title: 'Rattrapage 2020', ext: P, mb: '0.8', fid: '1HCdph2qdKznGM380OD_07eXhDw4-J18b' },
        { title: 'Rattrapage 2019', ext: P, mb: '0.3', fid: '1ep8zTZDvhXPt00ThQJ00lhNskbmDQLUh' },
        { title: 'Épreuve S2 2025', ext: P, mb: '0.6', fid: '16qZ1vIqbAzTPoQwXVnjfdYfmOTir2u4l' },
      ],
    },
    {
      id: 'isoles', title: 'Isolés', icon: 'quiz',
      items: [
        { title: 'Isolé — anatomie S1', ext: P, mb: '6.4', fid: '1TdptWBXPGnebk35BNIFmnnDgl3LMdr2x', correction: '19syIlAm2OhYRmpWXKzncPf1SEhmwHb9_' },
        { title: 'Isolé — anatomie (recueil)', ext: P, mb: '13.0', fid: '1QxaWJ6kMqqdGcFj-AhVMKgNFUoh_Ijs9' },
        { title: 'Isolé — crâne et rachis', ext: P, mb: '9.9', fid: '1jCmeWCNArLeB-q_0dDjxNtKiaO5UavO8' },
        { title: 'Isolé — le crâne (Kleib)', ext: P, mb: '5.8', fid: '1BYL3ddrM2ZjywyjnU3y7W-2ElQ2XSAeh' },
        { title: 'Isolé — introduction (Soumaré)', ext: P, mb: '19.7', fid: '10DimwVgKxVEbAGV2MifoRf_k769tMYAn' },
        { title: 'Isolé — ventricules et vascularisation', ext: P, mb: '20.5', fid: '1aNpkb_Llj_hhKMlZ3gtamrhlADMTZIxA' },
        { title: 'Isolé — substance blanche et noyaux gris centraux', ext: P, mb: '19.2', fid: '11VxnimaFFCYnaASa9U4N4Z85ShkhBg4x' },
        { title: 'Isolé — Soumaré', ext: P, mb: '10.4', fid: '1pCzLEeekMfgKm4G2kb8BZ3KSl9yIdz_c' },
        { title: 'Isolé — neuro-anatomie', ext: P, mb: '0.4', fid: '1HLGjAZkOqNAdv5b7upYGL83N33Gi-KBy' },
        { title: 'Isolé — recueil manuscrit', ext: P, mb: '13.1', fid: '1A3oQQrZX2MBPeDGJSG4HYNLdKCIYO6S3' },
        { title: 'Isolé — correction annotée', ext: P, mb: '7.0', fid: '1WzN7irKukj6agJaA8_rv0NzBX1doPO6w' },
      ],
    },
    {
      id: 'qcm', title: 'Banques de QCM', icon: 'quiz',
      items: [
        { title: '1045 QCM d’anatomie — Kanoun', ext: P, mb: '1.9', fid: '1OCwPN72F3ha18LjDOH1u4RMCj138FkAd' },
        { title: 'QCM du Pr Kleib — corrigés', ext: P, mb: '0.1', fid: '1J8nvbe9SBZMnCCAYDrjqYebGQ0pcQNk6' },
        { title: 'QCM — le cerveau', ext: P, mb: '1.7', fid: '1KtHxQiPeAWhnpv1vVNBWUm1vcIB_Ykr2' },
        { title: 'QCM — la moelle épinière', ext: P, mb: '0.3', fid: '1wMOHaxxmSQJq95CXInYryg-Zs0DT6mHd' },
        { title: 'QCM — le tronc cérébral', ext: P, mb: '0.3', fid: '1Vf4eoKN1rHHDnchxMqgH1cRnp7ICMwrt' },
        { title: 'QCM — ostéologie', ext: P, mb: '0.7', fid: '1Az4T-jL3a11kEtk-Zr5cANr5lBU4VO6y' },
        { title: 'QCM — le rachis', ext: P, mb: '0.4', fid: '1XUJzSEWF7227QAwWPNfVCHGS3M0T7ibp' },
        { title: 'QCM — recueil manuscrit', ext: P, mb: '4.0', fid: '1Zy-MWVfhp5synrhfLVx6aGxqbwb-7D5e' },
        { title: 'Correction — anatomie (tutorat)', ext: P, mb: '0.5', fid: '1mOO5dlk9XFTVo6h5w7yHWiRCjVUWAGQJ' },
      ],
    },
    {
      id: 'livres', title: 'Livres et atlas', icon: 'book',
      items: [
        { title: 'Netter — Atlas of Human Anatomy, 7e', ext: P, mb: '115.0', fid: '1QXex6ckvctj6bloBwhuFS0pE-DTsNMOU' },
        { title: 'Gray’s Anatomie pour les étudiants', ext: P, mb: '95.9', fid: '1XtV0ua25adHQ6z6IELpWA2t3uapvPr36' },
        { title: 'Kamina — Anatomie clinique T2 : tête, cou, dos', ext: P, mb: '78.9', fid: '1bCkQCbnnTQiSGUpJ7itt3V7wJoaF3O1j' },
        { title: 'Kamina — T3 : le dos et le thorax', ext: P, mb: '77.1', fid: '1b5JyOby5HA3ekgf2C6PzRawpMlAIEk0j' },
        { title: 'Kamina PCEM2 — version modifiée', ext: P, mb: '9.0', fid: '1yCQ-WD63DFT8KtDnb00Prag9ko87Z5a0' },
        { title: 'Atlas photographique du système nerveux central', ext: P, mb: '64.3', fid: '1lSfx7I0hSjGH-B3LaIMHT_FL3Nyt1ovo' },
        { title: 'Atlas d’anatomie humaine, 6e édition', ext: P, mb: '53.9', fid: '1CJ0BJl4qNmvibAGUG9sw0L2ktfei3h9e' },
        { title: 'Mémofiches Netter — tête et cou', ext: P, mb: '41.5', fid: '1OleamEYuFeSxU1hCpD1gU_zLG2k0s6iX' },
        { title: 'Tank — Grant’s Atlas d’anatomie', ext: P, mb: '1.3', fid: '1Rh-TSygbOQKsZ0KUTYn95tNWA2v9AG98' },
      ],
    },
  ],
};
