// Can anybody read this Drive file, or only the people it was shared with?
//
// The app reads every lecture as a stranger: the server fetches it without a
// Google account (app/api/file), and a student's phone opens it in a frame
// that asks the student's own account. Both only work while the file is
// shared "anyone with the link". When a file is not, the student meets a
// request-access screen, and a catalogue that lists it is promising something
// it cannot give. So a file is checked the way a stranger would meet it,
// before it is added.
//
// Three answers, because "I could not tell" is not "closed": a Google hiccup
// must never refuse a good file.

const FAKE = process.env.ARCHIVE_SOURCE_BASE;   // the stand-in for Drive used in tests

/** 'open' | 'closed' | 'unknown' */
export async function driveOpenness(fid) {
  if (FAKE) return 'open';
  const url = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fid)}&export=download&confirm=t`;
  try {
    const res = await fetch(url, {
      // One byte is enough to tell a file from a sign-in page, and a lecture
      // is not downloaded to find out.
      headers: { Range: 'bytes=0-0', 'User-Agent': 'Mozilla/5.0 (compatible; MyPromo/1.0)' },
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });
    const type = res.headers.get('content-type') || '';
    await res.body?.cancel().catch(() => {});
    if ((res.status === 200 || res.status === 206) && !type.startsWith('text/html')) return 'open';
    // A page of HTML where a file should be is the sign-in or access screen.
    if (res.status === 401 || res.status === 403 || res.status === 404 || type.startsWith('text/html')) return 'closed';
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/** Many files, a few at a time, so a long import does not hammer Google. */
export async function openness(ids, { limit = 6 } = {}) {
  const verdict = new Map();
  const queue = [...new Set(ids)];
  await Promise.all(Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) {
      const id = queue.shift();
      verdict.set(id, await driveOpenness(id));
    }
  }));
  return verdict;
}
