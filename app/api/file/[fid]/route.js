// Serves an archive file from MyPromo's own domain.
//
// The files live in a Drive folder shared "anyone with the link", so a server
// may fetch them. Doing it here rather than embedding Drive in an iframe is
// what makes files open *inside* the app: the browser sees a PDF coming from
// my-promo, not a third-party Google page whose session Safari blocks.
//
// Range requests are passed straight through. That is what lets pdf.js fetch
// the first pages and start drawing instead of waiting for all 10 MB.

export const runtime = 'nodejs';

const SOURCES = (fid) => [
  // `confirm=t` skips the "Google can't scan this file" interstitial, which
  // is otherwise returned as HTML instead of the file.
  `https://drive.usercontent.google.com/download?id=${fid}&export=download&confirm=t`,
  `https://drive.usercontent.google.com/download?id=${fid}&export=download`,
  `https://drive.google.com/uc?export=download&id=${fid}&confirm=t`,
  `https://drive.google.com/uc?export=download&id=${fid}`,
];

export async function GET(req, { params }) {
  const { fid } = await params;

  if (!/^[A-Za-z0-9_-]{10,80}$/.test(fid)) {
    return new Response('معرّف ملف غير صالح', { status: 400 });
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

    const headers = new Headers({
      'Content-Type': type || 'application/pdf',
      'Content-Disposition': 'inline',
      'Accept-Ranges': 'bytes',
      // Cached hard at the edge: these files never change.
      'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable',
    });
    for (const h of ['content-length', 'content-range', 'etag', 'last-modified']) {
      const v = res.headers.get(h);
      if (v) headers.set(h, v);
    }

    return new Response(res.body, { status: res.status === 206 ? 206 : 200, headers });
  }

  return new Response('تعذّر جلب الملف', { status: 502 });
}

export async function HEAD(req, ctx) {
  const res = await GET(req, ctx);
  return new Response(null, { status: res.status, headers: res.headers });
}
