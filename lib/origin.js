// The address the browser actually asked for.
//
// `request.url` inside a route handler is Next's own view of the request, not
// the one the phone typed: behind the dev server and behind Vercel's proxy it
// can come back as localhost. Redirecting to it silently changes host, and a
// session cookie set on one host is not sent to the other — so a signed-in
// student arrives at the next page signed out. The forwarded headers are what
// the proxy actually saw.
export function originOf(request) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) return new URL(request.url).origin;
  const proto = request.headers.get('x-forwarded-proto')
    || (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https');
  return `${proto}://${host}`;
}
