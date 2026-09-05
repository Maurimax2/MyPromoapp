// EMBRYOLOGIE — S2, organised.
//
// The heaviest duplication in the whole Drive: `DIAPO 2023`, `DIAPO 2024`,
// `COURS 2022`, `COURS TAREK` and `POLYCOPE 2022` are largely the same files
// copied whole from one folder to the next, and the per-topic folders hold a
// third and fourth copy. 164 files come down to 12 lectures.
//
// The course also carries histology of the eye and the ear, which is why those
// sit here rather than in HISTOLOGIE — they are examined with embryology.

const P = 'PDF';
const J = 'JPG';

export const EMBRYOLOGIE = {
  id: 'embryologie', promo: 'pcem2', semester: 'S2',
  name: 'EMBRYOLOGIE', icon: 'baby', tint: 'purple',
  professors: ['Tarek Rebai', 'Salima Daoud'],

  chapters: [
    {
      title: 'Embryologie générale',
      subtitle: 'Les quatre premières semaines',
      lectures: [
        { n: 1, title: 'Première et deuxième semaines', ext: 'PPT', mb: '5.2', fid: '11Fi1yHqjIQfkitxEFEYgXqmOB9NgklYf', year: 2024 },
        { n: 2, title: 'Troisième semaine', ext: 'PPT', mb: '1.3', fid: '1ZYTsn-euyEff6tUtoAA49nj5EXXP1qrt', year: 2024 },
        { n: 3, title: 'Quatrième semaine', ext: 'PPT', mb: '0.5', fid: '1RAxiSjJdiCagYIRBiwG8CfAsSZSzwP08', year: 2024 },
      ],
    },
    {
      title: 'Embryologie des appareils',
      subtitle: 'Cœur, digestif, urinaire, génital, nerveux, cervico-facial',
      lectures: [
        { n: 4, title: 'Embryologie du cœur', ext: P, mb: '3.2', fid: '1lejZC9Qjg4nZ10na52GWlswPG5XUrwxQ', prof: 'Salima Daoud', year: 2021,
          versions: [
            { title: 'Embryologie du cœur', prof: 'Salima Daoud', year: 2019, mb: '2.0', fid: '1X5iLSqGDDw12ZemmjyOaQ5IB_jd4Qc5B' },
            { title: 'Embryologie du cœur', year: 2021, mb: '2.0', fid: '1qm0fEhpUZd12H6qqpA1KVB97RhCeJZsl' },
            { title: 'Embryologie du cœur', year: 2018, mb: '0.7', fid: '1BtH4GGL8grPDXuO1ZPfOUAzPT3MFSFRS' },
            { title: 'Organogenèse du cœur', mb: '1.0', fid: '1jGZVsPgMCXislxbhL90Qa8cUsBxT_goI' },
            { title: 'Embryologie du cœur', prof: 'Salima Daoud', ext: 'PPTX', mb: '6.3', fid: '1xOb9mD0CmqS1Chv5OaXfDMd-xRLoCT2J' },
          ] },
        { n: 5, title: 'Embryologie du système digestif', ext: P, mb: '1.7', fid: '1VnlxpyNf6eWSJcjpZ_liu8TDkqTTK6OK', year: 2021,
          versions: [
            { title: 'Système digestif — polycopié', year: 2021, mb: '0.8', fid: '1MlDoM1d6LiGp8CrIfWQQGbgRULJRhjbH' },
            { title: 'Embryologie du système digestif', year: 2015, mb: '3.6', fid: '1-DENq5mt5he7TPQoyMyv71RRlFfpGlH9' },
            { title: 'Embryologie du système digestif', year: 2011, mb: '0.9', fid: '1rwG641REqomgd5zXYCgMzt9FJYYYauv8' },
            { title: 'Embryologie du système digestif', ext: 'PPT', mb: '11.9', fid: '1vZiCZJQbKONq_OmOWBh6BfYybk6e_LU_' },
          ] },
        { n: 6, title: 'Embryologie du système urinaire', ext: P, mb: '4.6', fid: '13jZeqRelpiCVuZarxnf0DwZ1oJE3B9-E', year: 2021,
          versions: [
            { title: 'Système urinaire — polycopié', year: 2021, mb: '1.0', fid: '1xUk2AsHe_jPqn--XJIhf-iTC82mdz2-4' },
            { title: 'Embryologie urinaire — diapositives', year: 2021, mb: '4.1', fid: '1C9GTp_mvoElhyMz-KAbJNqIAtUZMvcaT' },
            { title: 'Embryologie urinaire et génitale', ext: 'DOC', mb: '0.4', fid: '1qCSNx5JbcsJWZhiledZiu6sIKAIu5bPL' },
          ] },
        { n: 7, title: 'Embryologie du système génital', ext: P, mb: '4.6', fid: '164czYB57t0kuaWAz6A75OiIbCbPLPoIg', year: 2021,
          versions: [
            { title: 'Système génital — polycopié', year: 2021, mb: '0.8', fid: '1ZCftc1rMRY7Sb5rHewNjGa29b-whPzYv' },
            { title: 'Embryologie du système génital', ext: 'PPT', mb: '9.0', fid: '1vSlLLFrBS2R1hBR3ViZ0mFFtl-bGEMRa' },
          ] },
        { n: 8, title: 'Embryologie du système nerveux', ext: P, mb: '3.2', fid: '11roD0xJ0GUZqROV4AmAy5HtBTJvb8F7h', year: 2021,
          versions: [
            { title: 'Embryologie normale et pathologique du système nerveux', year: 2021, mb: '0.9', fid: '1dd1ywDREbr_BEGFCsX0NtVVYAlCkfGmh' },
            { title: 'Embryologie du système nerveux — diapositives', mb: '4.5', fid: '1nxwMsMQwoaYyMaLiiNXEbctHp4kPG25n' },
            { title: 'Embryologie normale et pathologique du SN', ext: 'DOC', mb: '0.8', fid: '1g8vciSbuIwxhyn4pm6QkrSlpfEWKmNO4' },
          ] },
        { n: 9, title: 'Embryologie cervico-faciale', ext: 'PPTX', mb: '7.8', fid: '1pRsaXMJcxAczRR6Ox82gCn-Frf99owu2', year: 2024,
          versions: [
            { title: 'Embryologie de la face et du cou', mb: '6.5', fid: '1IDlsOtZNT9w22cKiG9ewsiAKk2qxSQEU' },
            { title: 'Embryologie du cou et de la face', year: 2015, mb: '1.3', fid: '1zuxnOdyUgvhZmxtgk7qt-6oyxyTxy8xd' },
            { title: 'Embryologie cranio-faciale', year: 2009, mb: '0.5', fid: '1gvMzLIs5s6N_VZJcZ7aK7vL18_VBeixZ' },
            { title: 'Embryologie cervico-faciale', ext: 'DOCX', mb: '3.0', fid: '1dQOflsMVRzSynW9mFZ_9t8vsp9KrMZ_P' },
          ] },
      ],
    },
    {
      title: 'Organes des sens',
      subtitle: 'Histologie de l’œil et de l’oreille',
      lectures: [
        { n: 10, title: 'Les organes des sens', ext: P, mb: '5.7', fid: '1fJ19y5rndSKMSeaBeNKaa1K4Qgjn4s6b',
          versions: [{ title: 'Les organes des sens', mb: '1.4', fid: '1RAmNPosasm8IuzFP4tYFU2F5_y9gyBTu' }] },
        { n: 11, title: "Histologie de l'œil et de ses annexes", ext: 'PPT', mb: '9.9', fid: '1i0i_V7rAPvC05cPu4bAGITt7IDExSZae', year: 2024,
          versions: [{ title: "Histologie de l'œil, avec QCM corrigés", ext: 'DOC', mb: '1.3', fid: '1DLMTCvXYM4Y9jCvE-oaehUoRrvlCVvVD' }] },
        { n: 12, title: "Histologie de l'oreille", ext: P, mb: '11.9', fid: '11hfNnyuHbTBvFzCVyxqjNL0UIEAs69H5', year: 2024,
          versions: [{ title: "L'oreille — cours", ext: 'DOC', mb: '1.5', fid: '16aEx3zHEA-pmL5QE3NykwoHXNhC3ypaM' }] },
      ],
    },
  ],

  sections: [
    {
      id: 'polys', where: 'archive', title: 'Polycopiés et diapositives', icon: 'book',
      items: [
        { title: 'Diapositives — embryologie et histologie', ext: P, mb: '27.0', fid: '14rK_p6IYmXK9SIsd9DQiL5Uz-nHyRyIa', },
        { title: 'Liens des vidéos du cours', ext: P, mb: '0.4', fid: '1KUpr_M9RFO58kbC3wWLmQnG4w51OHum4' },
        { title: 'Liens des capsules — Pr Tarek Rebai', ext: 'DOCX', mb: '0.0', fid: '1oZ7MCv2ZnVBAZxRFtTnQ-C9yiNwDGgO3' },
      ],
    },
    {
      id: 'livres', where: 'archive', title: 'Livres', icon: 'book',
      items: [
        { title: 'Embryologie et histologie humaines — Brisset, Courtot, Tachdjian', ext: P, mb: '339.9', fid: '1RWW9qXB2GyF8Z-aUI3XHeM-jZU2FIYUR' },
        { title: 'Embryologie médicale — Langman, 9e édition française', ext: P, mb: '126.9', fid: '1Tw6pS94N4B9_9G1VQbFMASLa3zqmonpx' },
        { title: 'Embryologie humaine — Yaici et Arab', ext: P, mb: '42.4', fid: '1Jn1a2xy9dO-OOquR6ulTcSmWwNd1jgnM' },
      ],
    },
    {
      id: 'notes', where: 'notes', title: 'Notes et résumés', icon: 'file',
      items: [
        { title: 'Notes — embryologie uro-génitale', ext: P, mb: '30.0', fid: '1iGosI2lBPxOl-RnlmB1DiL3A5eBIJdJB' },
        { title: "Notes — histologie de l'œil", ext: P, mb: '30.3', fid: '14KQjwOBR0oa2jyhyEOpl4_PsNSdI2Q6-' },
        { title: 'Notes — rappels et embryologie digestive', ext: P, mb: '22.6', fid: '1q9n5r67iaQpUXNL0Pek3yqjUOcBXyHQb' },
        { title: 'Notes — embryologie du cœur', ext: P, mb: '18.3', fid: '1GZ0un9EFaxiKqiHxA57nXROc9tR6saJi' },
        { title: "Notes — histologie de l'oreille", ext: P, mb: '17.4', fid: '14gY_VgV7BpYrp6D2Op_Fw294WkJB3R2V' },
        { title: 'Notes — la face et le cou', ext: P, mb: '12.5', fid: '1SepTqA2RqgjowYJOMxr1NOAYy84BNAjF' },
        { title: 'Notes — embryologie du système nerveux', ext: P, mb: '11.1', fid: '1HrjBcQitVz2OxV5wBcfpstox2aSjnqcm' },
        { title: 'Notes — le cœur', ext: P, mb: '9.3', fid: '1vp_mQNnG367yJeJcm9T76ZALLMuRwNIa' },
        { title: 'Notes — le système nerveux', ext: P, mb: '7.8', fid: '1CIvtEFzT49IRig93FsqcPAOSpCIZh_wj' },
        { title: 'Notes — embryologie cardiaque 2024', ext: P, mb: '2.7', fid: '1A9_SiN-J7mLKR_RHwrcweXTwt3OcW7Yb' },
        { title: 'Résumé d’embryologie', ext: P, mb: '1.1', fid: '1Kg53wjBVvYFP-vYiFtbGtoToIpUZ4alm' },
        { title: 'Résumé d’embryologie (2)', ext: P, mb: '0.5', fid: '1BZGfLTtNnooMahGd_Vqt9TSK9iGzA6Jt' },
        { title: 'Résumé d’embryologie (3)', ext: P, mb: '4.0', fid: '1wBUM7Sgj1R4CdSoa4RMsEYtBrVZAgGG-' },
      ],
    },
    {
      id: 'examens', where: 'quiz', title: 'Examens', icon: 'quiz',
      items: [
        { title: 'Session 2024', ext: P, mb: '11.4', fid: '1SCfRUqvNqNdaE15-QCEvQ6vyOTwJA_59' },
        { title: 'Session 2023', ext: P, mb: '8.1', fid: '1SAg0X8tOPAmNfnWV-2ugy9OGALNbN2Jz' },
        { title: 'Session 2022', ext: P, mb: '0.1', fid: '1iaj0Qjw1UzaUr0Vddj9aD2JtbzOVTYju' },
        { title: 'Session 2021', ext: P, mb: '4.1', fid: '1u7ZvJzK3vTVXYULvJm0R1gV38c-gAg6o' },
        { title: 'Session 2019', ext: P, mb: '1.6', fid: '175b2YwrJx9G3pMl_ePg-5jc9FAxgi5M1', correction: '195DpI_BPXAlzIKJL1DNREFutOp6l6Bos' },
        { title: 'Session 2018', ext: P, mb: '1.3', fid: '1rKWTEQYBRdGzGumalJR8sB0Nouhei3Ob', correction: '1YM9wD_huAvcoP6ih6rb7OoTfU_xKVOiz' },
        { title: 'Session 2017', ext: P, mb: '2.6', fid: '1iBLnbkYxC-KNjzN9uYXdf8hog5Y6_DOp' },
        { title: 'Session 2015–2016 — histologie et embryologie', ext: P, mb: '3.7', fid: '1K4kgvvbjEHnc7jHDLFU2UbxPPKKXDu_K' },
        { title: 'Rattrapage 2024', ext: P, mb: '0.9', fid: '15GEAh6wAu0AxDlUyeSlNnGWlHiTSfes2' },
        { title: 'Rattrapage 2022', ext: P, mb: '10.4', fid: '1pltxnUTfHde9wSED0nouOD992kEHNL6K' },
        { title: 'Rattrapage 2021', ext: J, mb: '0.5', fid: '1B0KOTAMRtKN--j5nPUHRiBwUL-o9tQ2O',
          pages: ['1B0KOTAMRtKN--j5nPUHRiBwUL-o9tQ2O', '1bjWLHTIQoPpa9WQeaOgr0u4nUepN85P2', '1mqreOLslfXUfRatchJJ1qdvJPEJMJZga', '1SkJZ2cWtPEV7pxCUBvma2FrYVLgl3t3l', '1nnLRT6ZmTfzyTJEUM3MGwozjSZtMCLi1', '1kjUNcU28cvkj3qAOwH3i7_Bd-lQ4TGC_', '1AGcoSBKOVuk268_qM6WBQ4646aJaMPHh', '1KPrX2_Eds4WaSxBIGo9e372WwozYsogi'] },
        { title: 'Rattrapage 2020', ext: P, mb: '0.7', fid: '16D8CmXIJTRrVOYlCaG8iKPRL8W9Qhnw7' },
        { title: 'Rattrapage 2019', ext: P, mb: '0.2', fid: '13fQ14_cm_8lCKstCbQmBLo9ZCawhFDqA' },
        { title: 'Rattrapage 2018', ext: P, mb: '1.9', fid: '1mRyBXLuooJmcxfLUl5IaMz_OEkh21Ns4' },
        { title: 'Rattrapage 2017', ext: P, mb: '0.5', fid: '1b30ups4VC85cSdvk4csF93T_1a6hy71w' },
        { title: 'Rattrapage 2013', ext: 'DOC', mb: '0.3', fid: '1-5SfeSoMmGzS2Uzl5SYu4Ni540MlVV_F' },
        { title: 'Session embryologie', ext: P, mb: '0.4', fid: '1t5o5YR80L6ySVM7W63LblqvLc6TJovcD' },
        { title: 'Session histologie–embryologie', ext: P, mb: '0.5', fid: '1_IAmEmFMpgh9zlbpCkL7gA1wvP8lH3r7' },
        { title: 'Correction — examen d’embryologie S2', ext: P, mb: '1.0', fid: '1D-wvWgNoxgYiA339QwBw9VsTZiKQkdry' },
        { title: 'Correction — histologie et embryologie', ext: P, mb: '0.6', fid: '1bqa9L4oOdZfhmLRD3WxiocsMvLK8iWfL' },
      ],
    },
    {
      id: 'isoles', where: 'quiz', title: 'Isolés par chapitre', icon: 'quiz',
      items: [
        { title: 'Isolé — le cœur et l’appareil digestif', ext: P, mb: '1.4', fid: '1X-kAoWdpGRDE5KNOKqbpkr5ztH0-b_MP', correction: '1Wofl6-9k774wO4EUGvO3_gECpblsX0_M' },
        { title: 'Isolé — l’appareil digestif (correction)', ext: P, mb: '1.3', fid: '1ESMh_Iy10wBQfPgScwm_6QdmvH2v7eJS' },
        { title: 'Isolé — l’appareil urinaire', ext: P, mb: '2.1', fid: '1Ce_gO68uBTEA5O7iHAC-2kwIegvF3f4T', correction: '1SL6_-kicsaNDtFdn9l7zBT-K5d_bKJBN' },
        { title: 'Isolé — l’appareil génital', ext: P, mb: '1.2', fid: '1ovAvt161wRmNDLnHNGySHW0LpGS_n-mk', correction: '1GbYwPxlbpVJOvCFAbTBod5Srq5TKrn4v' },
        { title: 'Isolé — le système nerveux', ext: P, mb: '1.5', fid: '1xWI68HYQZkmdxEVXuY-26oZj79gmiqd1', correction: '1tafdplos-VkUd3jVim8VucWK9T07WbAV' },
        { title: 'Isolé — la tête et le cou', ext: P, mb: '1.6', fid: '1A65iibnwFyTho4-KBUwuVOLTsti-ds1F', correction: '1RrOpKeEOgIYOtDNR4QDHuP6JIjyCMMbW' },
        { title: 'Isolé — l’œil et l’oreille', ext: P, mb: '1.0', fid: '1svHHO3BylvjVBiVcizBr2i_iiNRsWX55', correction: '1g0R9sCBeXbePR70LllgnnpL8fAQYK6yn' },
        { title: 'Isolé — session complète', ext: P, mb: '1.3', fid: '10tnsFRcYLm3JkNq_UnEleIEfA0QBydeF' },
        { title: 'Isolé — embryologie S2', ext: P, mb: '1.9', fid: '1aVp2igqPIuAsYES05Bvn1WCFiiyixWNf', correction: '1afNP3wVstrMDSPNHlhxbwHv46otRnjw0' },
        { title: 'Isolés — recueil', ext: P, mb: '8.5', fid: '1Y6EL9wdZxkBwQJZnbJ370fYf01Zbge9E', correction: '1XKo_AnkCt1XaYV7UOWhIRrPTBuM2IjWE' },
        { title: 'Isolés — recueil diplôme', ext: P, mb: '12.8', fid: '1E9cVhRndXCRXUNWmutF1Q3K2K-6NJSF-' },
        { title: 'Isolés — recueil annoté', ext: P, mb: '10.7', fid: '1GMRp85G_TkV-Hs6NQDat-TBgUA1XBKGO' },
        { title: 'Correction — isolé d’embryologie S2', ext: P, mb: '0.3', fid: '1d9K4fNvhVln0FLFsjMIFoOfDRdFTJPId' },
      ],
    },
    {
      id: 'qcm', where: 'quiz', title: 'QCM', icon: 'quiz',
      items: [
        { title: 'QCM — embryologie', ext: P, mb: '2.8', fid: '1nemw1zP_QOv7CV_OXY5_bE1v25r48Mdo' },
        { title: 'QCM — l’œil et l’oreille', ext: P, mb: '0.1', fid: '1In9M5prwUbJJQDOKBFmGQPDM3oHViy7t' },
        { title: 'QCM — Sfax', ext: P, mb: '0.2', fid: '1bPKj_V9hCKDBwhC_wQSeDdKKeKVlmw6K' },
        { title: 'Devoir d’embryologie', ext: 'DOCX', mb: '0.1', fid: '1y1i7tL2gtGvMbuit4HPCBFsXa1k5zK2J' },
        { title: 'Embryologie digestive — questions', ext: P, mb: '0.3', fid: '1x91Ow_18GCSnEwJDyNR7iqVNjM_iR_mR' },
      ],
    },
  ],
};
