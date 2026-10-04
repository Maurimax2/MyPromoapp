// What a student has today, and next — the logic, with no data in it.
//
// Split from timetable.js so the phone loads this and not the whole semester:
// the planning is ~190 KB of sessions that only the server ever reads.
//
// The planning is a PDF per year, turned into lib/timetable-data.json by
// scripts/build-timetable.mjs. It is a plan, not a promise: a teacher
// sometimes skips ahead or runs a lecture over, so this says what the faculty
// published and never claims to know where the class really is.
//
// Pure functions, no database, usable on the server and in the browser. Times
// are Nouakchott's, which is UTC — so the clock in a Date is the clock on the
// wall, and there is no zone to get wrong.

// What kind of slot it is. A revision slot is time with no lecture in it —
// the faculty leaves it free on purpose — and a break is no class at all.
export const LECTURE = new Set(['course', 'tp', 'td', 'exam']);

const minutes = (t) => {
  const [h, m] = String(t || '').split(':').map(Number);
  return Number.isFinite(h) ? h * 60 + (m || 0) : null;
};

/** `{ day: 'YYYY-MM-DD', min }` for a moment — the wall clock in Nouakchott. */
export function clockOf(now = Date.now()) {
  const d = new Date(now);
  return { day: d.toISOString().slice(0, 10), min: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

/**
 * Where a student is in their week, at this moment.
 *
 * - `live`    a lecture that has started and not finished
 * - `next`    the next lecture, today or on a later day
 * - `later`   the rest of today's lectures after `next`
 * - `today`   everything the faculty put on today, in order
 * - `free`    today has no lecture in it at all (revision, a holiday, nothing)
 * - `until`   how many minutes until `next`, when it is today
 * - `started` false before the semester's first day
 * - `over`    the semester's last day has passed
 *
 * `term` is `{ first, last }` when `sessions` is only a slice of the semester:
 * from a slice alone, the first day looks like the start of term on any day.
 */
export function agenda(sessions, now = Date.now(), term = {}) {
  const at = clockOf(now);
  const today = sessions.filter((s) => s.date === at.day);
  const lectures = today.filter((s) => LECTURE.has(s.kind));
  const live = lectures.find((s) => minutes(s.start) <= at.min && at.min < minutes(s.end)) || null;

  const after = sessions.filter((s) => LECTURE.has(s.kind)
    && (s.date > at.day || (s.date === at.day && minutes(s.start) > at.min)));
  const next = after[0] || null;
  const sameDay = next && next.date === at.day;
  const free = lectures.length === 0;
  const firstDay = term.first || sessions[0]?.date || null;
  const lastDay = term.last || sessions.at(-1)?.date || null;

  return {
    day: at.day,
    live,
    next,
    later: sameDay ? after.slice(1).filter((s) => s.date === at.day) : [],
    today,
    free,
    // «Vacances», «Fête de l'indépendance» — the reason a day is empty.
    why: free ? (today.find((s) => s.kind === 'break') || today.find((s) => s.kind === 'revision') || null) : null,
    until: sameDay ? minutes(next.start) - at.min : null,
    daysTo: next ? Math.round((Date.parse(next.date) - Date.parse(at.day)) / 86400000) : null,
    started: firstDay ? at.day >= firstDay : false,
    over: !next && !live && lastDay != null && at.day > lastDay,
  };
}

// ---------------------------------------------------------------------------
// From a session to what a student can open
// ---------------------------------------------------------------------------

const STOP = new Set(['les', 'des', 'du', 'de', 'la', 'le', 'et', 'en', 'au', 'aux', 'un', 'une', 'pour',
  'sur', 'dans', 'par', 'avec', 'ses', 'son', 'ou', 'a', 'l', 'd', 'cours', 'partie', 'generalites', 'module']);

/** Words that say what a name is about: no accents, no case, no filler. */
export const words = (s = '') => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, ' ').split(' ')
  // «Systèmes» and «système» are the same word on a timetable and a Drive file.
  .map((w) => w.replace(/(ses|s|x)$/, (m, e, i, all) => (all.length > 4 ? '' : m)))
  .filter((w) => w.length > 2 && !STOP.has(w));

const same = (a, b) => a === b
  || (Math.min(a.length, b.length) >= 5 && (a.startsWith(b) || b.startsWith(a)));

/**
 * The subjects a timetable module is, among the subjects a student has.
 *
 * The timetable says «Anatomie-Système nerveux» and the app says «ANATOMIE»;
 * the faculty's names are not ours. A subject matches when every word of its
 * name is in the module's — and the ones with most words in common win, so
 * «Anatomie-MS-MI» does not fall to a bare «Anatomie» when there is a longer
 * one that fits. «Histo-Embryologie» is two subjects here, so this is a list:
 * the first is where a link goes, all of them are searched for the lecture.
 * A module with no match is simply not linked.
 */
export function matchSubjects(module, subjects) {
  const m = words(module);
  if (!m.length) return [];
  let best = [];
  let bestN = 0;
  for (const s of subjects) {
    const w = words(s.name);
    if (!w.length) continue;
    const shared = w.filter((x) => m.some((y) => same(x, y))).length;
    if (shared !== w.length) continue;
    if (shared > bestN) { best = [s]; bestN = shared; } else if (shared === bestN) best.push(s);
  }
  return best;
}

/**
 * The lecture a session is, among a subject's files — or null.
 *
 * Needs two words in common and at least half of the session's own, because a
 * lecture linked wrongly is worse than none: a student opens it the night
 * before the exam and reads the wrong chapter.
 */
export function matchLecture(title, lectures) {
  const t = [...new Set(words(title))];
  if (t.length < 2) return null;
  let best = null;
  let bestScore = 0;
  for (const l of lectures) {
    const w = new Set(words(l.title));
    const shared = t.filter((x) => [...w].some((y) => same(x, y))).length;
    const score = shared / t.length;
    if (shared >= 2 && score >= 0.5 && score > bestScore) { best = l; bestScore = score; }
  }
  return best;
}
