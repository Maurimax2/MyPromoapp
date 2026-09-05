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
// The feed and the student notes are not invented here any more. Placeholder
// posts and made-up names made the app look finished when it was not, and
// they were the first thing that read as fake. Both come from the database
// once students are actually posting.
export const POSTS = [];
export const NOTES = [];

// The timetable was invented too — three lectures with times nobody set.
// It returns when there is a real one to show.
export const TODAY = [];

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
