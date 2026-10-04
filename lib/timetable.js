// The faculty's planning, per promo — the data side. Server only: this is the
// file that holds the whole semester, and a phone should never import it.
// The logic that works on a list of sessions is in timetable-core.js.

import DATA from './timetable-data.json';
import { LECTURE } from './timetable-core.js';

export * from './timetable-core.js';

// One file serves three promos, and one promo reads two files.
const FILES = {
  pcem1: ['pcem1-pced1-pcep1'],
  pced1: ['pcem1-pced1-pcep1'],
  pcep1: ['pcem1-pced1-pcep1', 'pcep1'],
};

/** The planning files a promo reads, by name. */
export const filesOf = (promo) => {
  const p = String(promo || '').toLowerCase();
  const own = FILES[p] || [p];
  return own.filter((f) => DATA.groups[f]);
};

/** Whether the faculty has published a planning for this promo. */
export const hasPlanning = (promo) => filesOf(promo).length > 0;

export const SEMESTER = DATA.semester;

/**
 * Every session of a promo's semester, in time order.
 * `{ id, date, start, end, kind, module, title, teacher }`
 */
export function sessionsOf(promo) {
  const rows = [];
  for (const f of filesOf(promo)) {
    for (const [date, start, end, kind, module, title, teacher] of DATA.groups[f]) {
      rows.push({ date, start, end, kind, module, title, teacher });
    }
  }
  rows.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start)
    || a.module.localeCompare(b.module));
  // Two files can both list the same slot; the id keeps the two apart.
  rows.forEach((r, i) => { r.id = i; });
  return rows;
}
