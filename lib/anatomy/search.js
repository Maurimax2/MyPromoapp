// Finding a structure by its name.
//
// A student the night before an exam does not remember which of thirty-three
// regions holds the foramen ovale. They remember « foramen ovale ». So the
// index is everything the app can name — every structure in every bundle,
// every named part of a divided bone, and every placed landmark — and a hit
// opens the region that holds it with it already chosen.
//
// The index is BUILT, not computed here: `scripts/build-search.mjs` reads the
// carved files in public/ and decides each home from the coordinate the thing
// actually sits at. Working it out in the browser meant guessing from the list
// of bundles instead, and that put le tubercule de Gerdy in la hanche — three
// joints from where it is. `npm run build:search`, and prebuild runs it.

import INDEX from './search-index.js';

/** Accent- and case-blind, because nobody types « épineux » with the accent. */
export const fold = (s) => String(s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’']/g, ' ')
  .toLowerCase().trim();

export { INDEX };

// A structure before one of its parts before a point on it: l'acétabulum is
// both a coloured territory of l'os coxal and a placed dot, and offering the
// same word twice in the same region is asking a question with one answer.
const ORDER = { structure: 0, part: 1, landmark: 2 };

/**
 * What matches, best first.
 *
 * A name that starts with what was typed beats one that merely contains it:
 * typing « foramen » should offer the foramen magnum before the jugular
 * foramen, and « fosse » the fossae before every bone that has one in its
 * description.
 */
export function findAnatomy(query, limit = 20) {
  const q = fold(query);
  if (q.length < 2) return [];
  const hits = [];
  for (const row of INDEX) {
    const at = row.find.indexOf(q);
    if (at < 0) continue;
    // Exact, then starts-with, then a word boundary, then anywhere.
    const rank = row.find === q ? 0
      : at === 0 ? 1
        : row.find[at - 1] === ' ' ? 2 : 3;
    hits.push({ ...row, rank });
  }
  hits.sort((a, b) => a.rank - b.rank
    || ORDER[a.kind] - ORDER[b.kind]
    || a.name.length - b.name.length
    || a.name.localeCompare(b.name, 'fr'));

  // One row per name per region. The same word drawn two ways is still one
  // thing to a student, and both rows would open the same screen.
  const out = [];
  const seen = new Set();
  for (const h of hits) {
    const key = `${h.region}/${h.find}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(h);
    if (out.length >= limit) break;
  }
  return out;
}

/** Where a hit opens: the region, with the thing already chosen. */
export const hrefOf = (hit) =>
  `/anatomie/${hit.promo}/${hit.semester}/${hit.region}`
  + `?${hit.kind === 'landmark' ? 'point' : 'pick'}=${encodeURIComponent(hit.name)}`;
