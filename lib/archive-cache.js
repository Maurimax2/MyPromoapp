// MyPromo's own copy of an archive file.
//
// Every open used to go phone → our server → Google Drive, on every single
// open, for every student. A 40 MB lecture crossed the network twice each
// time and Drive decides how fast that is. This keeps the file once, in the
// bucket the app already has, and after that a student is talking to a CDN
// that serves byte ranges properly — which is what lets the viewer draw page
// one before the rest has arrived.
//
// The Drive itself is never touched. It belongs to somebody else and is
// read-only; this is a copy of a file already shared with every student by
// link, kept so we stop asking for it a thousand times.

import { supabaseAdmin } from '@/lib/supabase/admin';
import * as r2 from '@/lib/r2';

// Its own bucket, not the one students upload into: that one caps a file at
// 25 MB, which is right for a photograph off a phone and wrong for a scanned
// lecture. Different things, different rules.
export const BUCKET = 'archive';

/** Big enough for a scanned lecture, small enough that a 141 MB atlas is not
    dragged into our storage — those keep going to Drive. */
export const CACHE_LIMIT = 60 * 1024 * 1024;

export const keyFor = (fid) => fid;

const publicUrl = (key) => {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/${BUCKET}/${key}` : null;
};

let ensured = false;
async function ensureBucket(db) {
  if (ensured) return;
  const { data } = await db.storage.getBucket(BUCKET);
  if (!data) {
    await db.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: CACHE_LIMIT,
      allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
    });
  }
  ensured = true;
}

/**
 * The address of our copy, if there is one.
 *
 * R2 first where it is configured, then Supabase — because the copies made
 * before the move are still perfectly good, and re-fetching them from Drive
 * to prove a point would make the app slower for a week.
 */
export async function cachedUrl(fid) {
  const key = keyFor(fid);

  if (r2.configured() && await r2.has(key)) return r2.urlFor(key);

  const url = publicUrl(key);
  if (!url) return null;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok ? url : null;
  } catch {
    return null;
  }
}

/**
 * Fetch the file from Drive and keep it.
 *
 * Runs after the student's own response has been sent, so nobody waits for
 * it, and it is allowed to fail: a copy that does not happen costs another
 * slow open, not a broken screen.
 */
export async function keep(fid, sources) {
  for (const url of sources) {
    let res;
    try {
      res = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyPromo/1.0)' },
      });
    } catch {
      continue;
    }
    if (!res.ok) continue;

    const type = res.headers.get('content-type') || '';
    if (type.includes('text/html')) continue;          // Drive's interstitial

    const size = Number(res.headers.get('content-length') || 0);
    if (size > CACHE_LIMIT) return { skipped: 'too big', size };

    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.byteLength > CACHE_LIMIT) return { skipped: 'too big', size: bytes.byteLength };

    // New copies go to R2 once it is configured; the old ones stay where they
    // are and keep serving.
    let refused = null;
    if (r2.configured()) {
      try {
        await r2.put(keyFor(fid), bytes, {
          contentType: type || 'application/pdf',
          cacheControl: 'public, max-age=31536000, immutable',
        });
        return { kept: bytes.byteLength, where: 'r2' };
      } catch (err) {
        // Keep it the old way rather than not at all. A wrong setting should
        // cost a line in the log, not every student a slow open until
        // somebody notices.
        refused = err.message;
      }
    }

    const db = supabaseAdmin();
    await ensureBucket(db);
    const { error } = await db.storage.from(BUCKET).upload(keyFor(fid), bytes, {
      contentType: type || 'application/pdf',
      cacheControl: '31536000',
      upsert: true,
    });
    if (error) return { error: error.message, r2: refused };
    return { kept: bytes.byteLength, where: 'supabase', r2: refused };
  }
  return { error: 'unreachable' };
}
