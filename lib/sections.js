// What a group of files is called.
//
// A document row carries the section it belongs to — `polys`, `resumes`,
// `examens` — but not the words on the heading above it. The catalogue file
// used to spell those out per subject ("Résumés et fiches" in one, "Résumés
// par chapitre" in another); a database row keeps only the id, so the words
// live here instead, once.
//
// French, like everything that names study material, and `where` decides the
// screen: the archive holds what you read, الملخصات what students wrote,
// اختبر نفسك the question papers.

export const SECTIONS = {
  polys:         { where: 'archive', title: 'Polycopiés',            icon: 'book'  },
  'polys-det':   { where: 'archive', title: 'Polycopiés détaillés',  icon: 'book'  },
  livres:        { where: 'archive', title: 'Livres et atlas',       icon: 'book'  },
  schemas:       { where: 'archive', title: 'Schémas',               icon: 'image' },
  tp:            { where: 'archive', title: 'Travaux pratiques',     icon: 'book'  },
  // The Faculté de pharmacie de Monastir's own material, which the pharmacy
  // years read alongside FMPOS's — kept under its own heading, never mixed
  // into FMPOS's numbered lectures or its exam papers.
  monastir:      { where: 'archive', title: 'Cours — Monastir',      icon: 'book'  },
  // Same idea, for the Tunis reference material DCEP1's own pharmacologie
  // générale folder carries (a `tunis` subfolder of pharmacokinetics slides).
  tunis:         { where: 'archive', title: 'Cours — Tunis',         icon: 'book'  },

  resumes:       { where: 'notes',   title: 'Résumés',               icon: 'file'  },
  'resumes-gen': { where: 'notes',   title: 'Résumés généraux',      icon: 'file'  },
  'resumes-tete':{ where: 'notes',   title: 'Résumés — tête et cou', icon: 'file'  },
  'resumes-stat':{ where: 'notes',   title: 'Résumés — statistique et informatique', icon: 'file' },
  notes:         { where: 'notes',   title: "Notes d'étudiants",     icon: 'file'  },

  examens:       { where: 'quiz',    title: 'Examens',               icon: 'quiz'  },
  'examens-sp':  { where: 'quiz',    title: 'Examens — santé publique', icon: 'quiz' },
  'examens-stat':{ where: 'quiz',    title: 'Examens — statistique', icon: 'quiz'  },
  'examens-info':{ where: 'quiz',    title: 'Examens — informatique', icon: 'quiz' },
  maroc:         { where: 'quiz',    title: 'Examens — Marrakech',   icon: 'quiz'  },
  djibouti:      { where: 'quiz',    title: 'Examens — Djibouti',    icon: 'quiz'  },
  'examens-monastir': { where: 'quiz', title: 'Examens — Monastir',  icon: 'quiz'  },
  ed:            { where: 'quiz',    title: 'ED et anciens examens', icon: 'quiz'  },
  isoles:        { where: 'quiz',    title: 'Isolés',                icon: 'quiz'  },
  qcm:           { where: 'quiz',    title: 'QCM',                   icon: 'quiz'  },
  'qcm-bc':      { where: 'quiz',    title: 'QCM — Pr Ben Cheikh',   icon: 'quiz'  },

  lecture:       { where: 'archive', title: 'Cours',                 icon: 'book'  },
};

/** A section we have never seen still gets a heading rather than nothing. */
export const sectionMeta = (id, where = 'archive') =>
  SECTIONS[id] || { where, title: id, icon: where === 'quiz' ? 'quiz' : 'file' };
