// Serves an archive file from MyPromo's own domain.
//
// The files live in a Drive folder shared "anyone with the link", so a server
// may fetch them. Doing it here rather than embedding Drive in an iframe is
// what makes files open *inside* the app: the browser sees a PDF coming from
// my-promo, not a third-party Google page whose session Safari blocks.

export const runtime = 'nodejs';

const SOURCES = (fid) => [
  `https://drive.usercontent.google.com/download?id=${fid}&export=download`,
  `https://drive.google.com/uc?export=download&id=${fid}`,
];

export async function GET(_req, { params }) {
  const { fid } = await params;

  if (!/^[A-Za-z0-9_-]{10,80}$/.test(fid)) {
    return new Response('معرّف ملف غير صالح', { status: 400 });
  }

  for (const url of SOURCES(fid)) {
    let res;
    try {
      res = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyPromo/1.0)' },
      });
    } catch {
      continue;
    }
    if (!res.ok || !res.body) continue;

    // Drive answers with an HTML interstitial when it will not serve the
    // bytes; that is not a file, so try the next source.
    const type = res.headers.get('content-type') || '';
    if (type.includes('text/html')) continue;

    const headers = new Headers({
      'Content-Type': type || 'application/pdf',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    });
    const len = res.headers.get('content-length');
    if (len) headers.set('Content-Length', len);

    return new Response(res.body, { status: 200, headers });
  }

  return new Response('تعذّر جلب الملف', { status: 502 });
}
