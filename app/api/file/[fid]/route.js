// Serves an archive file from MyPromo's own domain.
//
// The files live in a Drive folder shared "anyone with the link", so a server
// may fetch them. Doing it here rather than embedding Drive in an iframe is
// what makes files open *inside* the app: the browser sees a PDF coming from
// my-promo, not a third-party Google page whose session Safari blocks.
//
// Range requests are passed straight through. That is what lets pdf.js fetch
// the first pages and start drawing instead of waiting for all 10 MB.
//
// And it only asks Drive once. The first student to open a lecture gets it
// relayed as before, and the file is kept in our own bucket afterwards;
// everybody after them is sent straight to a CDN that serves ranges properly.
// Drive is asked once per file, ever, instead of once per open.

import { after } from 'next/server';
import { relayHeaders } from '@/lib/file-headers';
import { cachedUrl, keep } from '@/lib/archive-cache';
import { getT } from '@/lib/lang';

export const runtime = 'nodejs';
export const maxDuration = 60;

// A stand-in for Drive, so the caching can be driven end to end without
// Google in the way. Never set in production.
const FAKE = process.env.ARCHIVE_SOURCE_BASE;

const SOURCES = (fid) => (FAKE ? [`${FAKE}/${fid}`] : [
  // `confirm=t` skips the "Google can't scan this file" interstitial, which
  // is otherwise returned as HTML instead of the file.
  `https://drive.usercontent.google.com/download?id=${fid}&export=download&confirm=t`,
  `https://drive.usercontent.google.com/download?id=${fid}&export=download`,
  `https://drive.google.com/uc?export=download&id=${fid}&confirm=t`,
  `https://drive.google.com/uc?export=download&id=${fid}`,
]);

// A name a phone's file system will take: no slashes or the other characters
// Windows and Android refuse, nothing invisible, and not endless.
function fileName(raw) {
  if (!raw) return null;
  const clean = raw.replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150);
  return clean && !/^\.+$/.test(clean) ? clean : null;
}

export async function GET(req, { params }) {
  const t = await getT();
  const { fid } = await params;

  if (!/^[A-Za-z0-9_-]{10,80}$/.test(fid)) {
    return new Response(t('معرّف ملف غير صالح'), { status: 400 });
  }

  // `?download=<name>`: kept on the phone under the name the student chose
  // (owner, 2026-11-27: «download them on your phone and name them whatever
  // you want»), so sent as an attachment instead of shown.
  const name = fileName(new URL(req.url).searchParams.get('download'));

  // Our own copy, if we have one. A redirect rather than a relay: the phone
  // then talks to the CDN directly and this function is out of the way for
  // every byte range that follows.
  const ours = await cachedUrl(fid);
  if (ours) {
    // Supabase's own `?download=` names an attachment the same way.
    const to = name ? `${ours}${ours.includes('?') ? '&' : '?'}download=${encodeURIComponent(name)}` : ours;
    return new Response(null, {
      status: 307,
      headers: { Location: to, 'Cache-Control': 'public, max-age=3600' },
    });
  }

  const range = req.headers.get('range');

  for (const url of SOURCES(fid)) {
    let res;
    try {
      res = await fetch(url, {
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MyPromo/1.0)',
          ...(range ? { Range: range } : {}),
        },
      });
    } catch {
      continue;
    }
    if (!res.ok && res.status !== 206) continue;
    if (!res.body) continue;

    // Drive answers with an HTML interstitial when it will not serve the
    // bytes; that is not a file, so try the next source.
    const type = res.headers.get('content-type') || '';
    if (type.includes('text/html')) continue;

    // Which of those two answers Drive gave decides what we may promise the
    // viewer — see lib/file-headers.js.
    const headers = relayHeaders(res);
    if (name) {
      // The plain filename is for browsers that read only that one; the
      // starred one carries the accents and the Arabic.
      const plain = name.replace(/[^\x20-\x7E]/g, '_').replace(/["\\]/g, '_');
      headers.set('Content-Disposition', `attachment; filename="${plain}"; filename*=UTF-8''${encodeURIComponent(name)}`);
    }

    // Kept after the answer has gone out, so nobody waits for it. A copy
    // that fails costs one more slow open, not a broken screen.
    after(async () => { await keep(fid, SOURCES(fid)).catch(() => {}); });

    return new Response(res.body, { status: res.status === 206 ? 206 : 200, headers });
  }

  return new Response(t('تعذّر جلب الملف'), { status: 502 });
}

export async function HEAD(req, ctx) {
  const res = await GET(req, ctx);
  return new Response(null, { status: res.status, headers: res.headers });
}
