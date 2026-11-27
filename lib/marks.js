'use client';

// What a student draws on a lecture kept on the phone: highlights, pen marks
// and notes (components/PdfInk.js). One record per file, keyed like the file
// itself in lib/downloads.js, in a database of its own — so deleting a
// download leaves its marks, and downloading it again brings them back.
//
// Nothing here leaves the phone. Points are fractions of the page (0–1 on
// both axes), so a mark stays on its word at any zoom and on any screen.

const DB = 'mypromo-marks';
const STORE = 'marks';

function db() {
  return new Promise((ok, no) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'fid' });
    req.onsuccess = () => ok(req.result);
    req.onerror = () => no(req.error);
  });
}

async function run(mode, work) {
  const base = await db();
  return new Promise((ok, no) => {
    const tx = base.transaction(STORE, mode);
    const req = work(tx.objectStore(STORE));
    tx.oncomplete = () => { ok(req?.result); base.close(); };
    tx.onerror = () => { no(tx.error); base.close(); };
    tx.onabort = () => { no(tx.error); base.close(); };
  });
}

export const EMPTY = { strokes: [], notes: [] };

/** A file's marks: `{ strokes: [{ id, page, kind, color, pts }], notes: [{ id, page, x, y, text }] }`. */
export async function readMarks(fid) {
  const rec = await run('readonly', (s) => s.get(fid));
  return rec ? { strokes: rec.strokes || [], notes: rec.notes || [] } : EMPTY;
}

export async function writeMarks(fid, { strokes, notes }) {
  if (!strokes.length && !notes.length) {
    await run('readwrite', (s) => s.delete(fid));
    return;
  }
  await run('readwrite', (s) => s.put({ fid, strokes, notes, at: Date.now() }));
}
