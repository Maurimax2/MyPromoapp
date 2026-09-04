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

// A Drive file id is all we keep. The app builds its own routes from it:
// /file/<id> opens inside MyPromo, and these two are for Drive itself.
export const driveEmbed = (fid) => `https://drive.google.com/file/d/${fid}/preview`;
export const driveView  = (fid) => `https://drive.google.com/file/d/${fid}/view`;

// Lectures are filed under the chapter they belong to, and numbered straight
// through the module — the unnumbered neuro files continue from where the
// head-and-neck ones stop rather than sitting in a nameless heap.
export const MODULES = [
  {
    id: 'anatomie', promo: 'pcem2', semester: 'S1',
    name: 'ANATOMIE', icon: 'person', tint: 'purple',
    professors: ['Ali Ghorbel'],
    chapters: [
      {
        title: 'الرأس والعنق',
        subtitle: 'Tête et cou',
        lectures: [
          { n: 1,   title: 'Intro — fonctions',          ext: 'PDF', mb: '10.1', fid: '14I6vtXSlSSsNuoE7gqWh53LHPZsZ1L8G' },
          { n: 2,   title: 'Ostéologie de la tête',      ext: 'PDF', mb: '16.3', fid: '1gfPvaavkrbZNjlcuA2zf1LJ63LZ-rfS-' },
          { n: 3,   title: "L'appareil manducateur",     ext: 'PDF', mb: '7.8',  fid: '1RBfT7yRrboOsk1erxCVTguVX_OuxgvZ_' },
          { n: 4,   title: 'Les muscles tête–cou',       ext: 'PDF', mb: '2.9',  fid: '14xgHFfIUN_OP2cgss4bLyLshh0BUIrWG' },
          // Drive numbers both of these -5-. Vessels always come before
          // lymphatics — a rule of the course, not a guess. See CLAUDE.md.
          { n: 5,   title: 'Les vaisseaux tête et cou',  ext: 'PDF', mb: '7.8',  fid: '1wI4Iu1vO7ujhsUNnkHODj40AartW8pZu' },
          { n: '5b', title: 'Lymphatiques tête–cou',     ext: 'PDF', mb: '1.5',  fid: '1p2-HsGXH1kAsD3CQu7H-D-NJiCPIN-iM' },
          { n: 6,   title: 'Appareil de vision',         ext: 'PDF', mb: '2.7',  fid: '1HVRXJUA3deUQuAPNMo7WQ6M4Pa6RrSmU' },
          { n: 7,   title: 'Fosses nasales',             ext: 'PDF', mb: '3.6',  fid: '1jcvtES-XdIuJTFoZ1k6uSMgr7HTE_khx' },
          { n: 8,   title: 'Oreille',                    ext: 'PDF', mb: '2.5',  fid: '1mQzkun5hunohSJPMjlcJQGRYjDvP04wW' },
          { n: 9,   title: 'Larynx & pharynx',           ext: 'PDF', mb: '15.2', fid: '1H3jUUwVlIgSma2Pg7E5JbRiGWy5o8r5R' },
          { n: 10,  title: 'Thyroïde & larynx',          ext: 'PDF', mb: '9.4',  fid: '1Ob3bePXRBUedk__Gye_ApSKf41fUzU-H' },
        ],
      },
      {
        title: 'التشريح العصبي',
        subtitle: 'Neuro-anatomie · 2023',
        // These carry no number in Drive. They continue the module's
        // numbering, ordered the way the nervous system is taught:
        // spinal cord upward, then the coverings, then the blood supply.
        lectures: [
          { n: 11, title: 'Moelle épinière',      ext: 'PDF', mb: '4.1', fid: '1UNbG29AIt3Ikmv9JetAgl_m7JNrV1PJn' },
          { n: 12, title: 'Tronc cérébral',       ext: 'PDF', mb: '3.7', fid: '1f6DAICq1V2RxGwzNjx9iGsX-RPANfcsW' },
          { n: 13, title: 'Cervelet',             ext: 'PDF', mb: '2.7', fid: '1lQyItXprWQgOgczEhkk-1HVnfQ8_2b8E' },
          { n: 14, title: 'Diencéphale',          ext: 'PDF', mb: '3.2', fid: '1KX1XINySkSpicRWym04pNU33f44f506l' },
          { n: 15, title: 'Télencéphale',         ext: 'PDF', mb: '2.4', fid: '1IorCbPcwy4gyhgww2muOwxIPweNjVpVv' },
          { n: 16, title: 'Méninges',             ext: 'PDF', mb: '3.4', fid: '1ZROJrNKXeja7nB_ck6aMYpQ_MGCr8D2Z' },
          { n: 17, title: 'Vaisseaux du cerveau', ext: 'PDF', mb: '1.5', fid: '1H-rp0yLvWVVPmoGyPheXgrxLI9NkFVqt' },
          { n: 18, title: 'Veines du cerveau',    ext: 'PDF', mb: '2.2', fid: '1k-EuMF3TYSNZ9iBnM-Z1D9YL4y77M5fS' },
        ],
      },
    ],
  },
  {
    id: 'biochimie', promo: 'pcem2', semester: 'S1',
    name: 'BIOCHIMIE', icon: 'flask', tint: 'orange',
    professors: ['Kebir', 'Kadijetou Ba'],
    chapters: [
      {
        title: 'الدروس',
        subtitle: 'Cours',
        lectures: [
          { n: 1, title: 'B.C partie Kebir',         ext: 'PDF', mb: '10.0', fid: '1xNT_i9bm7swjge8feVv0nNKBgtDR8-2s' },
          { n: 2, title: 'B.C partie Ba',            ext: 'PDF', mb: '15.1', fid: '1mdQD_sN4snGqGeTmnLRzOfq_XcvRGrhI' },
        ],
      },
      {
        title: 'فيشات وتمارين',
        subtitle: 'Fiches & TD',
        lectures: [
          { n: 3, title: 'Fiches Kebir',             ext: 'PDF', mb: '5.0', fid: '19W2pIC0XFvMMbLxbbWGMo0shuXQurt3A' },
          { n: 4, title: 'Complément de cours & TD', ext: 'PDF', mb: '0.2', fid: '1LlNeEIUmM12gOWzQ1Jj5XVXXf0UgijVe' },
        ],
      },
    ],
  },
  {
    id: 'physiologie-s1', promo: 'pcem2', semester: 'S1',
    name: 'PHYSIOLOGIE S1', icon: 'heart', tint: 'orange',
    professors: [], note: 'بوليكوبيات',
    chapters: [
      {
        title: 'البوليكوبيات',
        subtitle: 'Polycopiés',
        lectures: [
          { n: 1, title: 'Polycopié 2020–2021', ext: 'PDF', mb: '3.5',  fid: '12CfGzAHqeop5LyTRgj7DNEpGtfEdUdpS' },
          { n: 2, title: 'Polycopié 2016–2017', ext: 'PDF', mb: '14.7', fid: '1T5E1Wf9pWtU5PkWIGyeCuGr7_cGIQBLe' },
          { n: 3, title: 'Polycopié 2015–2016', ext: 'PDF', mb: '4.6',  fid: '1utMEPO_pUuGCTaHCDxR2D-hWQiALLPfg' },
        ],
      },
    ],
  },
  { id: 'histologie',     promo: 'pcem2', semester: 'S1', name: 'HISTOLOGIE',     icon: 'micro',  tint: 'purpleLight', professors: [], chapters: [], empty: true },
  { id: 'module-sante',   promo: 'pcem2', semester: 'S1', name: 'MODULE SANTE',   icon: 'shield', tint: 'grey',        professors: [], chapters: [], empty: true },
  { id: 'anatomie-s2',    promo: 'pcem2', semester: 'S2', name: 'ANATOMIE S2',    icon: 'person', tint: 'purple',      professors: [], chapters: [], pending: true },
  { id: 'biophysique',    promo: 'pcem2', semester: 'S2', name: 'BIOPHYSIQUE',    icon: 'atom',   tint: 'purpleLight', professors: [], chapters: [], pending: true },
  { id: 'embryologie',    promo: 'pcem2', semester: 'S2', name: 'EMBRYOLOGIE',    icon: 'baby',   tint: 'orange',      professors: [], chapters: [], pending: true },
  { id: 'physiologie-s2', promo: 'pcem2', semester: 'S2', name: 'PHYSIOLOGIE S2', icon: 'heart',  tint: 'orange',      professors: [], chapters: [], pending: true },
];

export const moduleById = (id) => MODULES.find((m) => m.id === id);
export const allFiles = (m) => (m.chapters || []).flatMap((c) => c.lectures);
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
      fid: '12CfGzAHqeop5LyTRgj7DNEpGtfEdUdpS',
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
      fid: '1wI4Iu1vO7ujhsUNnkHODj40AartW8pZu',
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

// ---------------------------------------------------------------------------
// الملخصات — notes written by students, filed under the subject they cover.
// Every note carries the name of the student who made it. Placeholder content
// for now: real notes arrive when students can upload.
// ---------------------------------------------------------------------------

export const NOTES = [
  { id: 'n1', promo: 'pcem2', subject: 'ANATOMIE', title: 'ملخص عظام الرأس والوجه',
    author: 'أحمد محمد', initials: 'أ م', colour: '#6B21B5',
    when: 'قبل 3 أيام', pages: 6, kind: 'pdf', saves: 42 },
  { id: 'n2', promo: 'pcem2', subject: 'ANATOMIE', title: 'جداول الأعصاب القحفية',
    author: 'مريم سيدي', initials: 'م س', colour: '#F97316',
    when: 'الأسبوع الماضي', pages: 2, kind: 'pdf', saves: 87 },
  { id: 'n3', promo: 'pcem2', subject: 'PHYSIOLOGIE S1', title: 'الكلية — من الترشيح إلى البول',
    author: 'يحيى ولد أحمد', initials: 'ي و', colour: '#8B5CF6',
    when: 'قبل يومين', pages: 4, kind: 'pdf', saves: 55 },
  { id: 'n4', promo: 'pcem2', subject: 'BIOCHIMIE', title: 'ملخص السكريات والدهون',
    author: 'فاطمة الزهراء', initials: 'ف ز', colour: '#C2410C',
    when: 'أمس', pages: 3, kind: 'text', saves: 19 },
  { id: 'n5', promo: 'pcem1', subject: 'CHIMIE', title: 'التوازن الكيميائي — تمارين محلولة',
    author: 'محمد الأمين', initials: 'م أ', colour: '#7C3AED',
    when: 'قبل أسبوع', pages: 8, kind: 'pdf', saves: 64 },
  { id: 'n6', promo: 'pcem1', subject: 'BIOLOGIE', title: 'الخلية — مخطط مبسّط',
    author: 'خديجة بنت سيدي', initials: 'خ س', colour: '#8B5CF6',
    when: 'قبل 4 أيام', pages: 2, kind: 'text', saves: 23 },
  { id: 'n7', promo: 'dcem1', subject: 'SÉMIOLOGIE', title: 'الفحص السريري للبطن',
    author: 'عبد الله ولد محمد', initials: 'ع م', colour: '#F97316',
    when: 'أمس', pages: 5, kind: 'pdf', saves: 71 },
  { id: 'n8', promo: 'dcem3', subject: 'CARDIOLOGIE', title: 'قراءة تخطيط القلب خطوة بخطوة',
    author: 'آمنة بنت أحمد', initials: 'آ أ', colour: '#9A3412',
    when: 'قبل يومين', pages: 7, kind: 'pdf', saves: 118 },
];

// Notes for one promo, grouped by the subject they belong to.
export const notesBySubject = (promo) => {
  const groups = new Map();
  NOTES.filter((n) => n.promo === promo).forEach((n) => {
    if (!groups.has(n.subject)) groups.set(n.subject, []);
    groups.get(n.subject).push(n);
  });
  return [...groups.entries()].map(([subject, items]) => ({ subject, items }));
};

// Find any archive file by its Drive id, so the viewer can title itself.
export const fileByFid = (fid) => {
  for (const m of MODULES) {
    const hit = allFiles(m).find((f) => f.fid === fid);
    if (hit) return { ...hit, module: m.name, semester: m.semester };
  }
  const post = POSTS.find((p) => p.attachment && p.attachment.fid === fid);
  if (post) return { title: post.attachment.name, ext: post.attachment.ext,
    mb: post.attachment.mb, module: post.tag, semester: '' };
  return null;
};

// ---------------------------------------------------------------------------
// الاختبارات — short quizzes attached to a module. Placeholder questions on
// standard course facts until real question banks are written.
// ---------------------------------------------------------------------------

export const QUIZZES = {
  anatomie: {
    title: 'ANATOMIE — الرأس والعنق',
    questions: [
      { q: 'كم عدد عظام الجمجمة الدماغية (neurocrâne)؟',
        options: ['6', '8', '12', '14'], answer: 1,
        why: 'الجمجمة الدماغية تتكوّن من ثمانية عظام.' },
      { q: 'أي عصب قحفي يعصّب عضلات الوجه الحركية؟',
        options: ['العصب الثلاثي التوائم (V)', 'العصب الوجهي (VII)', 'العصب المبهم (X)', 'العصب تحت اللسان (XII)'], answer: 1,
        why: 'العصب الوجهي VII هو المسؤول عن حركة عضلات الوجه.' },
      { q: 'إلى أين تصبّ معظم لمفاويات الرأس والعنق في النهاية؟',
        options: ['العقد الإبطية', 'العقد العنقية العميقة', 'العقد المنصفية', 'العقد النكفية'], answer: 1,
        why: 'المسار النهائي يمرّ عبر السلسلة العنقية العميقة.' },
      { q: 'الشريان السباتي الظاهر (carotide externe) يغذّي أساسًا:',
        options: ['الدماغ', 'الوجه والرقبة', 'العين فقط', 'النخاع الشوكي'], answer: 1,
        why: 'السباتي الظاهر يغذّي بنى الوجه والرقبة، بينما الباطن يغذّي الدماغ.' },
    ],
  },
  biochimie: {
    title: 'BIOCHIMIE',
    questions: [
      { q: 'ما الوحدة البنائية للبروتينات؟',
        options: ['حمض أميني', 'حمض دهني', 'نيوكليوتيد', 'سكر أحادي'], answer: 0,
        why: 'البروتينات سلاسل من الأحماض الأمينية.' },
      { q: 'كم ذرة كربون في جزيء الغلوكوز؟',
        options: ['4', '5', '6', '12'], answer: 2,
        why: 'الغلوكوز سكر سداسي — ست ذرات كربون.' },
      { q: 'أين يحدث تحلل السكر (glycolyse)؟',
        options: ['الميتوكوندريا', 'السيتوبلازم', 'النواة', 'جهاز غولجي'], answer: 1,
        why: 'تحلل السكر يجري في السيتوبلازم.' },
    ],
  },
  'physiologie-s1': {
    title: 'PHYSIOLOGIE S1',
    questions: [
      { q: 'ما الوحدة الوظيفية للكلية؟',
        options: ['النيفرون', 'الحويصلة', 'الجريب', 'العصبون'], answer: 0,
        why: 'النيفرون هو الوحدة الوظيفية للكلية.' },
      { q: 'أين تبدأ عملية الترشيح الكبيبي؟',
        options: ['الأنبوب القريب', 'الكبيبة', 'عروة هنلي', 'الأنبوب الجامع'], answer: 1,
        why: 'الترشيح يبدأ في الكبيبة داخل محفظة بومان.' },
    ],
  },
};

export const quizFor = (moduleId) => QUIZZES[moduleId] || null;
export const quizzedModules = () =>
  MODULES.filter((m) => QUIZZES[m.id]).map((m) => ({ ...m, quiz: QUIZZES[m.id] }));
