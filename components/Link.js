// next/link, not prefetched unless a link asks to be.
//
// Every Link in view used to fetch its page from the server in advance —
// twelve on الرئيسية alone, each subject banner, each tool — a function call
// whether or not anybody tapped it. On Vercel's free plan that was most of
// the server's CPU (owner, 2026-10-30: no Pro). A page is now asked for when
// it is tapped. The four tabs of the bottom bar, tapped all the time, still
// prefetch: components/BottomNav.js uses next/link itself.
import NextLink from 'next/link';

export default function Link({ prefetch = false, ...rest }) {
  return <NextLink prefetch={prefetch} {...rest} />;
}
