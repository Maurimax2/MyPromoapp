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
  ed:            { where: 'quiz',    title: 'ED et anciens examens', icon: 'quiz'  },
  isoles:        { where: 'quiz',    title: 'Isolés',                icon: 'quiz'  },
  qcm:           { where: 'quiz',    title: 'QCM',                   icon: 'quiz'  },
  'qcm-bc':      { where: 'quiz',    title: 'QCM — Pr Ben Cheikh',   icon: 'quiz'  },

  lecture:       { where: 'archive', title: 'Cours',                 icon: 'book'  },
};

/** A section we have never seen still gets a heading rather than nothing. */
export const sectionMeta = (id, where = 'archive') =>
  SECTIONS[id] || { where, title: id, icon: where === 'quiz' ? 'quiz' : 'file' };
