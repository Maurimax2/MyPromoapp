// What we tell the browser about a file we are relaying from Drive.
//
// Kept out of the route so it can be exercised directly: the decision that
// matters here is invisible in a running app and expensive when it is wrong.

/**
 * Whether the upstream answer really supports byte ranges.
 *
 * pdf.js asks for a document in 256 KB pieces and believes `Accept-Ranges`.
 * If we claim ranges we do not have, every piece is answered with the whole
 * file — a 40 MB lecture arrives several times over before a page is drawn.
 * Claiming nothing costs one sequential download and no more.
 */
export const upstreamHasRanges = (res) =>
  res.status === 206 || /bytes/i.test(res.headers.get('accept-ranges') || '');

/** The headers to pass on, given the upstream response. */
export function relayHeaders(res, fallbackType = 'application/pdf') {
  const type = res.headers.get('content-type') || '';

  const headers = new Headers({
    'Content-Type': type || fallbackType,
    'Content-Disposition': 'inline',
    ...(upstreamHasRanges(res) ? { 'Accept-Ranges': 'bytes' } : {}),
    // These files never change: cached hard at the edge.
    'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable',
  });

  for (const h of ['content-length', 'content-range', 'etag', 'last-modified']) {
    const v = res.headers.get(h);
    if (v) headers.set(h, v);
  }
  return headers;
}
