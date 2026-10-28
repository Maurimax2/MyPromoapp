'use client';

// Lectures kept on this phone, to open without asking the network again.
//
// IndexedDB, one record per lecture, keyed by its Drive id. The file is kept
// as an ArrayBuffer rather than a Blob: older iPhone web views lose Blobs put
// into IndexedDB, and a buffer is just bytes everywhere. Nothing here leaves
// the phone, and nothing is ever downloaded without the student asking.

const DB = 'mypromo-downloads';
const STORE = 'files';

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

/** Everything downloaded, newest first, without the bytes. */
export async function listDownloads() {
  const all = (await run('readonly', (s) => s.getAll())) || [];
  return all
    .map(({ data, ...rest }) => rest)
    .sort((a, b) => b.at - a.at);
}

export async function isDownloaded(fid) {
  return (await run('readonly', (s) => s.getKey(fid))) !== undefined;
}

/** A lecture's file, as a URL its reader can open, or null. */
export async function openDownload(fid) {
  const rec = await run('readonly', (s) => s.get(fid));
  if (!rec) return null;
  return { ...rec, url: URL.createObjectURL(new Blob([rec.data], { type: 'application/pdf' })) };
}

export async function removeDownload(fid) {
  await run('readwrite', (s) => s.delete(fid));
}

/**
 * Fetch a lecture through our own file route and keep it.
 * @param {{ fid: string, title: string, subject?: string }} lecture
 * @param {(percent: number) => void} [onProgress]
 */
export async function download({ fid, title, subject = null }, onProgress) {
  const res = await fetch(`/api/file/${encodeURIComponent(fid)}`);
  if (!res.ok || !res.body) throw new Error(String(res.status));
  const total = Number(res.headers.get('content-length')) || 0;
  const reader = res.body.getReader();
  const parts = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
    got += value.length;
    if (total && onProgress) onProgress(Math.min(99, Math.round((got / total) * 100)));
  }
  const data = new Uint8Array(got);
  let at = 0;
  for (const p of parts) { data.set(p, at); at += p.length; }
  // A big file goes to Drive, and Drive can answer with a page about virus
  // scanning instead of the file. Kept, that would be a lecture that never opens.
  if (String.fromCharCode(...data.subarray(0, 5)) !== '%PDF-') throw new Error('not a pdf');
  // Ask the browser not to clear these when space runs low; a refusal is fine.
  navigator.storage?.persist?.().catch(() => {});
  await run('readwrite', (s) => s.put({ fid, title, subject, bytes: got, at: Date.now(), data: data.buffer }));
  onProgress?.(100);
  return got;
}
