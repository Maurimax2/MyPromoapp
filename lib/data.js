// Everything the app knows about the archive.
//
// The lecture entries below are the real contents of the shared UNEM Drive:
// `drive` is the file's Google Drive id, so "open" links to the untouched
// original. Titles here are the cleaned display names — the files in Drive
// are never renamed. Only PCEM2 has been indexed so far.

export const PROMOS = [
  { id: 'pcem1', name: 'PCEM1', label: 'السنة الأولى',  badge: '#8B5CF6', indexed: false },
  { id: 'pcem2', name: 'PCEM2', label: 'السنة الثانية', badge: '#6B21B5', indexed: true  },
  { id: 'dcem1', name: 'DCEM1', label: 'السنة الثالثة', badge: '#F97316', indexed: false },
  { id: 'dcem2', name: 'DCEM2', label: 'السنة الرابعة', badge: '#C2410C', indexed: false },
  { id: 'dcem3', name: 'DCEM3', label: 'السنة الخامسة', badge: '#7C3AED', indexed: false },
  { id: 'dcem4', name: 'DCEM4', label: 'السنة السادسة', badge: '#9A3412', indexed: false },
];

export const promoById = (id) => PROMOS.find((p) => p.id === id);

const drive = (id) => `https://drive.google.com/file/d/${id}/view`;

export const MODULES = [
  {
    id: 'anatomie', promo: 'pcem2', semester: 'S1',
    name: 'ANATOMIE', icon: 'person', tint: 'purple',
    professors: ['Ali Ghorbel'],
    lectures: [
      { n: 1,  title: 'Intro — fonctions',          ext: 'PDF', mb: '10.1', drive: drive('14I6vtXSlSSsNuoE7gqWh53LHPZsZ1L8G') },
      { n: 2,  title: 'Ostéologie de la tête',      ext: 'PDF', mb: '16.3', drive: drive('1gfPvaavkrbZNjlcuA2zf1LJ63LZ-rfS-') },
      { n: 3,  title: "L'appareil manducateur",     ext: 'PDF', mb: '7.8',  drive: drive('1RBfT7yRrboOsk1erxCVTguVX_OuxgvZ_') },
      { n: 4,  title: 'Les muscles tête–cou',       ext: 'PDF', mb: '2.9',  drive: drive('14xgHFfIUN_OP2cgss4bLyLshh0BUIrWG') },
      { n: 5,  title: 'Les vaisseaux tête et cou',  ext: 'PDF', mb: '7.8',  drive: drive('1wI4Iu1vO7ujhsUNnkHODj40AartW8pZu'), clash: true },
      { n: 5,  title: 'Lymphatiques tête–cou',      ext: 'PDF', mb: '1.5',  drive: drive('1p2-HsGXH1kAsD3CQu7H-D-NJiCPIN-iM'), clash: true },
      { n: 6,  title: 'Appareil de vision',         ext: 'PDF', mb: '2.7',  drive: drive('1HVRXJUA3deUQuAPNMo7WQ6M4Pa6RrSmU') },
      { n: 7,  title: 'Fosses nasales',             ext: 'PDF', mb: '3.6',  drive: drive('1jcvtES-XdIuJTFoZ1k6uSMgr7HTE_khx') },
      { n: 8,  title: 'Oreille',                    ext: 'PDF', mb: '2.5',  drive: drive('1mQzkun5hunohSJPMjlcJQGRYjDvP04wW') },
      { n: 9,  title: 'Larynx & pharynx',           ext: 'PDF', mb: '15.2', drive: drive('1H3jUUwVlIgSma2Pg7E5JbRiGWy5o8r5R') },
      { n: 10, title: 'Thyroïde & larynx',          ext: 'PDF', mb: '9.4',  drive: drive('1Ob3bePXRBUedk__Gye_ApSKf41fUzU-H') },
    ],
    extra: {
      label: 'بدون ترقيم — عصبية 2023',
      items: [
        { title: 'Moelle épinière',      ext: 'PDF', mb: '4.1', drive: drive('1UNbG29AIt3Ikmv9JetAgl_m7JNrV1PJn') },
        { title: 'Télencéphale',         ext: 'PDF', mb: '2.4', drive: drive('1IorCbPcwy4gyhgww2muOwxIPweNjVpVv') },
        { title: 'Diencéphale',          ext: 'PDF', mb: '3.2', drive: drive('1KX1XINySkSpicRWym04pNU33f44f506l') },
        { title: 'Cervelet',             ext: 'PDF', mb: '2.7', drive: drive('1lQyItXprWQgOgczEhkk-1HVnfQ8_2b8E') },
        { title: 'Tronc cérébral',       ext: 'PDF', mb: '3.7', drive: drive('1f6DAICq1V2RxGwzNjx9iGsX-RPANfcsW') },
        { title: 'Méninges',             ext: 'PDF', mb: '3.4', drive: drive('1ZROJrNKXeja7nB_ck6aMYpQ_MGCr8D2Z') },
        { title: 'Vaisseaux du cerveau', ext: 'PDF', mb: '1.5', drive: drive('1H-rp0yLvWVVPmoGyPheXgrxLI9NkFVqt') },
        { title: 'Veines du cerveau',    ext: 'PDF', mb: '2.2', drive: drive('1k-EuMF3TYSNZ9iBnM-Z1D9YL4y77M5fS') },
      ],
    },
  },
  {
    id: 'biochimie', promo: 'pcem2', semester: 'S1',
    name: 'BIOCHIMIE', icon: 'flask', tint: 'orange',
    professors: ['Kebir', 'Kadijetou Ba'],
    lectures: [
      { title: 'B.C partie Kebir',         ext: 'PDF', mb: '10.0', drive: drive('1xNT_i9bm7swjge8feVv0nNKBgtDR8-2s') },
      { title: 'B.C partie Ba',            ext: 'PDF', mb: '15.1', drive: drive('1mdQD_sN4snGqGeTmnLRzOfq_XcvRGrhI') },
      { title: 'Fiches Kebir',             ext: 'PDF', mb: '5.0',  drive: drive('19W2pIC0XFvMMbLxbbWGMo0shuXQurt3A') },
      { title: 'Complément de cours & TD', ext: 'PDF', mb: '0.2',  drive: drive('1LlNeEIUmM12gOWzQ1Jj5XVXXf0UgijVe') },
    ],
  },
  {
    id: 'physiologie-s1', promo: 'pcem2', semester: 'S1',
    name: 'PHYSIOLOGIE S1', icon: 'heart', tint: 'orange',
    professors: [], note: 'بوليكوبيات',
    lectures: [
      { title: 'Polycopié 2020–2021', ext: 'PDF', mb: '3.5',  drive: drive('12CfGzAHqeop5LyTRgj7DNEpGtfEdUdpS') },
      { title: 'Polycopié 2016–2017', ext: 'PDF', mb: '14.7', drive: drive('1T5E1Wf9pWtU5PkWIGyeCuGr7_cGIQBLe') },
      { title: 'Polycopié 2015–2016', ext: 'PDF', mb: '4.6',  drive: drive('1utMEPO_pUuGCTaHCDxR2D-hWQiALLPfg') },
    ],
  },
  { id: 'histologie',     promo: 'pcem2', semester: 'S1', name: 'HISTOLOGIE',     icon: 'micro',  tint: 'purpleLight', professors: [], lectures: [], empty: true },
  { id: 'module-sante',   promo: 'pcem2', semester: 'S1', name: 'MODULE SANTE',   icon: 'shield', tint: 'grey',        professors: [], lectures: [], empty: true },
  { id: 'anatomie-s2',    promo: 'pcem2', semester: 'S2', name: 'ANATOMIE S2',    icon: 'person', tint: 'purple',      professors: [], lectures: [], pending: true },
  { id: 'biophysique',    promo: 'pcem2', semester: 'S2', name: 'BIOPHYSIQUE',    icon: 'atom',   tint: 'purpleLight', professors: [], lectures: [], pending: true },
  { id: 'embryologie',    promo: 'pcem2', semester: 'S2', name: 'EMBRYOLOGIE',    icon: 'baby',   tint: 'orange',      professors: [], lectures: [], pending: true },
  { id: 'physiologie-s2', promo: 'pcem2', semester: 'S2', name: 'PHYSIOLOGIE S2', icon: 'heart',  tint: 'orange',      professors: [], lectures: [], pending: true },
];

export const moduleById = (id) => MODULES.find((m) => m.id === id);
export const allFiles = (m) => [...(m.lectures || []), ...((m.extra && m.extra.items) || [])];
export const fileCount = (m) => allFiles(m).length;

export const modulesFor = (promo, semester) =>
  MODULES.filter((m) => m.promo === promo && m.semester === semester);

// Sample feed content, so the screen shows what it does rather than an empty
// shell. Attachments point at real files in the Drive.
export const POSTS = [
  {
    id: 'p1', author: 'أحمد محمد', initials: 'أ م', colour: '#6B21B5',
    promo: 'pcem2', field: 'طب', when: 'قبل ساعتين',
    body: 'جمعت أهم النقاط من الفسيولوجيا في ورقتين. راجعوها قبل الامتحان وقولوا لي إذا نقص شيء 🙏',
    attachment: {
      kind: 'pdf', name: 'Polycopié PHYSIO S1 2020–2021', ext: 'PDF', mb: '3.5',
      href: 'https://drive.google.com/file/d/12CfGzAHqeop5LyTRgj7DNEpGtfEdUdpS/view',
    },
    tag: 'PHYSIOLOGIE S1', likes: 54, comments: 12, saves: 31,
  },
  {
    id: 'p2', author: 'مريم سيدي', initials: 'م س', colour: '#F97316',
    promo: 'pcem2', field: 'صيدلة', when: 'اليوم · 09:40',
    body: 'صوّرت السبورة في محاضرة اليوم. الجزء الأخير عن الأوعية اللمفاوية السطحية والعميقة — أحد فهم الفرق؟',
    attachment: { kind: 'image', caption: 'صورة من محاضرة التشريح' },
    tag: 'ANATOMIE', likes: 23, comments: 7, saves: 4,
  },
  {
    id: 'p3', author: 'يحيى ولد أحمد', initials: 'ي و', colour: '#8B5CF6',
    promo: 'dcem1', field: 'طب', when: 'أمس',
    body: 'انتبهوا: ملفان في الدرايف كلاهما مرقّم ‎-5-‎ في التشريح. الترتيب الصحيح هو الأوعية أولًا ثم اللمفاويات.',
    attachment: {
      kind: 'pdf', name: 'Les vaisseaux tête et cou', ext: 'PDF', mb: '7.8',
      href: 'https://drive.google.com/file/d/1wI4Iu1vO7ujhsUNnkHODj40AartW8pZu/view',
    },
    tag: 'ANATOMIE', likes: 41, comments: 9, saves: 18,
  },
  {
    id: 'p4', author: 'فاطمة الزهراء', initials: 'ف ز', colour: '#C2410C',
    promo: 'pcem1', field: 'طب أسنان', when: 'أمس',
    body: 'أول امتحان الأسبوع الجاي. أي حد عنده أسئلة السنوات الماضية في البيوشيمي؟',
    tag: 'BIOCHIMIE', likes: 12, comments: 21, saves: 2,
  },
];

export const TODAY = [
  { time: '08:30', title: 'Fosses nasales', prof: 'Ali Ghorbel',   module: 'ANATOMIE',  tint: 'purple' },
  { time: '10:15', title: 'Les glucides',   prof: 'Kebir',         module: 'BIOCHIMIE', tint: 'orange' },
  { time: '14:00', title: 'Les lipides',    prof: 'Kadijetou Ba',  module: 'BIOCHIMIE', tint: 'orange' },
];
