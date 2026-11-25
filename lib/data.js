// Everything the app knows about the archive: the course itself, as files.
//
// The years and the helpers live in lib/data-core.js and are re-exported
// here, so an old import still works. A screen that only needs those imports
// lib/data-core.js — this file is 824 KB compiled and is loaded only by what
// reads the course.
//
// The lecture entries below are the real contents of the shared Drive:
// `drive` is the file's Google Drive id, so "open" links to the untouched
// original. Titles here are the cleaned display names — the files in Drive
// are never renamed. PCEM2 and PCEM1 are indexed; the other four years are
// waiting for a Drive.

import { ANATOMIE } from './modules/anatomie.js';
import { BIOCHIMIE } from './modules/biochimie.js';
import { HISTOLOGIE } from './modules/histologie.js';
import { MODULE_SANTE } from './modules/module-sante.js';
import { PHYSIOLOGIE_S1 } from './modules/physiologie-s1.js';
import { ANATOMIE_S2 } from './modules/anatomie-s2.js';
import { BIOPHYSIQUE } from './modules/biophysique.js';
import { EMBRYOLOGIE } from './modules/embryologie.js';
import { PHYSIOLOGIE_S2 } from './modules/physiologie-s2.js';
import { PCEM1 } from './modules/pcem1.js';
import { PCEP1 } from './modules/pcep1.js';
import { PCEP2 } from './modules/pcep2.js';
import { DCEP1 } from './modules/dcep1.js';
import { DCEP2 } from './modules/dcep2.js';
import { DCEM4 } from './modules/dcem4.js';
import { TN_PCEP1 } from './modules/tn-pcep1.js';
import { TN_PCEP2 } from './modules/tn-pcep2.js';
import { TN_DCEP1 } from './modules/tn-dcep1.js';
import { TN_DCEP2 } from './modules/tn-dcep2.js';
import { TN_DCEP3 } from './modules/tn-dcep3.js';

import { isTunisian, sectionsFor, allFiles, POSTS, NOTES, QUIZZES, TUNISIAN_YEARS } from './data-core.js';

export * from './data-core.js';

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
  ...PCEM1,
  ...PCEP1,
  ...PCEP2,
  ...DCEP1,
  ...DCEP2,
  ...DCEM4,
  ...TN_PCEP1,
  ...TN_PCEP2,
  ...TN_DCEP1,
  ...TN_DCEP2,
  ...TN_DCEP3,
];

export const moduleById = (id) => MODULES.find((m) => m.id === id);

// TUNISIAN_YEARS is what lets the catalogue skip this file for a year with
// no Tunisian programme. A new tn- file for another year must be listed there,
// or its subjects would silently not appear.
for (const m of MODULES) {
  if (isTunisian(m) && !TUNISIAN_YEARS.includes(m.promo)) {
    console.error(`lib/data-core.js: TUNISIAN_YEARS is missing ${m.promo} (${m.id})`);
  }
}

// Every module that has question material, for the quiz index.
export const quizModules = () =>
  MODULES.filter((m) => sectionsFor(m, 'quiz').length > 0);

export const modulesFor = (promo, semester) =>
  MODULES.filter((m) => m.promo === promo && m.semester === semester);

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
