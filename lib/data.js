// Everything the app knows about the archive.
//
// The lecture entries below are the real contents of the shared UNEM Drive:
// `drive` is the file's Google Drive id, so "open" links to the untouched
// original. Titles here are the cleaned display names — the files in Drive
// are never renamed. Only PCEM2 has been indexed so far.

import { ANATOMIE } from './modules/anatomie.js';
import { BIOCHIMIE } from './modules/biochimie.js';
import { HISTOLOGIE } from './modules/histologie.js';
import { MODULE_SANTE } from './modules/module-sante.js';
import { PHYSIOLOGIE_S1 } from './modules/physiologie-s1.js';
import { ANATOMIE_S2 } from './modules/anatomie-s2.js';
import { BIOPHYSIQUE } from './modules/biophysique.js';
import { EMBRYOLOGIE } from './modules/embryologie.js';
import { PHYSIOLOGIE_S2 } from './modules/physiologie-s2.js';

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
  ANATOMIE,
  BIOCHIMIE,
  HISTOLOGIE,
  MODULE_SANTE,
  PHYSIOLOGIE_S1,
  ANATOMIE_S2,
  BIOPHYSIQUE,
  EMBRYOLOGIE,
  PHYSIOLOGIE_S2,
];

export const moduleById = (id) => MODULES.find((m) => m.id === id);
export const allFiles = (m) => (m.chapters || []).flatMap((c) => c.lectures);

// Everything openable in a module: lectures, the other teachers' versions of
// them, and the documents filed in sections.
export const allDocs = (m) => [
  ...allFiles(m).flatMap((l) => [l, ...(l.versions || [])]),
  ...(m.sections || []).flatMap((s) => s.items),
];

// A module's sections split three ways. The archive holds the material you
// read; الملخصات holds what students wrote; اختبر نفسك holds the questions.
export const sectionsFor = (m, where) =>
  (m.sections || []).filter((s) => s.where === where);

// Every module that has question material, for the quiz index.
export const quizModules = () =>
  MODULES.filter((m) => sectionsFor(m, 'quiz').length > 0);
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

// الملخصات draws on two sources: what students have posted inside MyPromo,
// and the résumés, fiches and handwritten notes already sitting in the Drive.
// Both are notes; the student does not care which side they came from.
export const notesBySubject = (promo) => {
  const groups = new Map();
  const push = (subject, item) => {
    if (!groups.has(subject)) groups.set(subject, []);
    groups.get(subject).push(item);
  };

  for (const m of MODULES.filter((m) => m.promo === promo)) {
    for (const s of sectionsFor(m, 'notes')) {
      for (const it of s.items) {
        push(m.name, {
          id: it.fid, title: it.title, fid: it.fid,
          kind: 'pdf', mb: it.mb, source: s.title,
        });
      }
    }
  }

  NOTES.filter((n) => n.promo === promo).forEach((n) => push(n.subject, n));

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

// اختبر نفسك — the real question banks. The placeholder questions that used
// to sit here were written in Arabic, which breaks the rule the whole app runs
// on: nobody studies anatomy in Arabic and nobody knows the terms in it. They
// are gone rather than translated — the questions students should see are the
// ones in the exam papers and the isolés, and those are being extracted.
export const QUIZZES = {};

export const quizFor = (moduleId) => QUIZZES[moduleId] || null;

// A module belongs in اختبر نفسك if it has questions to ask — either written
// ones, or the exam papers, isolés and QCM banks they will be drawn from.
export const quizzedModules = () =>
  MODULES.filter((m) => QUIZZES[m.id] || sectionsFor(m, 'quiz').length)
    .map((m) => ({
      ...m,
      quiz: QUIZZES[m.id] || null,
      banks: sectionsFor(m, 'quiz'),
      bankCount: sectionsFor(m, 'quiz').reduce((n, s) => n + s.items.length, 0),
    }));
