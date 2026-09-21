// Where you left off.
//
// الرئيسية opens on «تابع من حيث توقّفت», and until now there was nothing
// behind that sentence: no row, no column, nothing that remembered which
// lecture was last opened. So it is remembered here, in the browser, beside
// the review schedule — the same reasoning as lib/review.js. What a student
// reads is theirs, it is worth nothing to anyone else, and a round trip to
// Postgres to draw one card on every load is a round trip not worth making.
//
// One record, not a history: the card shows a single lecture, so keeping
// thirty would be keeping twenty-nine for nobody.
//
// The record grows in two stages, because the two facts arrive at different
// moments. Opening the file is instant; the first page being drawn, and the
// page you reach, happen later and only if you stay. So `opened()` writes the
// record and `mark()` adds to it without ever replacing what is already
// there — a student who opens a lecture and immediately leaves still has a
// card tomorrow, just without the picture.

const KEY = 'mypromo.resume';

const read = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const write = (it) => {
  try { localStorage.setItem(KEY, JSON.stringify(it)); } catch { /* private mode */ }
};

/** Remember that this lecture was opened. Never throws. */
export function opened({ fid, title, subject = null }) {
  if (!fid || !title) return;
  const had = read();
  // The same lecture again keeps its picture and its page; a different one
  // starts clean, or the card would show the last lecture's first page.
  const keep = had?.fid === fid ? had : {};
  write({ ...keep, fid, title, subject, at: Date.now() });
}

/**
 * How far in, and what it looks like.
 *
 * Called as the pages are drawn, so it must be cheap and must not mind being
 * called with only half of what it takes.
 */
export function mark({ fid, page, pages, thumb }) {
  const it = read();
  // A late callback from a lecture already navigated away from must not
  // scribble over the record of the one opened since.
  if (!it || it.fid !== fid) return;

  const next = { ...it };
  // Furthest reached, not last seen: scrolling back up to check something is
  // not losing your place.
  if (page && (!next.page || page > next.page)) next.page = page;
  if (pages) next.pages = pages;
  if (thumb && !next.thumb) next.thumb = thumb;
  write(next);
}

/**
 * The last lecture opened, or null.
 *
 * Anything older than a fortnight is not "where you left off" any more, it is
 * a lecture from before the holidays, and a card offering to resume it is
 * noise where the review prompt would have been useful.
 */
const FORTNIGHT = 14 * 24 * 60 * 60 * 1000;

export function lastOpened(now = Date.now()) {
  const it = read();
  if (!it?.fid || !it?.title) return null;
  if (now - (it.at || 0) > FORTNIGHT) return null;
  return it;
}
