// What you got wrong comes back.
//
// A Leitner schedule, kept in the browser: a question you miss returns in ten
// minutes, and each time you get it right it waits longer — a day, three days,
// a week, three weeks. Miss it again and it drops back to the start.
//
// There are no accounts yet, so this lives in localStorage: it is this
// student's own record, on this phone, and it survives closing the app.

const KEY = 'mypromo.review.v1';

// How long to wait after each consecutive correct answer.
const DELAYS = [10 * 60e3, 24 * 3600e3, 3 * 24 * 3600e3, 7 * 24 * 3600e3, 21 * 24 * 3600e3];

function read() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}

function write(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ }
}

/** Record an answer and schedule when the question should come back. */
export function record(id, correct) {
  const state = read();
  const prev = state[id] || { box: 0, wrong: 0 };
  const box = correct ? Math.min(prev.box + 1, DELAYS.length - 1) : 0;

  // A question answered right from the top box is learnt; stop tracking it.
  if (correct && prev.box >= DELAYS.length - 1) {
    delete state[id];
    write(state);
    return;
  }

  state[id] = {
    box,
    wrong: prev.wrong + (correct ? 0 : 1),
    due: Date.now() + DELAYS[box],
  };
  write(state);
}

/** The ids this student owes, soonest first. */
export function dueIds(now = Date.now()) {
  const state = read();
  return Object.entries(state)
    .filter(([, v]) => v.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => id);
}

/** Everything being tracked, due or not — for the counter on the card. */
export function trackedCount() {
  return Object.keys(read()).length;
}

export function dueCount(now = Date.now()) {
  return dueIds(now).length;
}

export function reset() {
  write({});
}
