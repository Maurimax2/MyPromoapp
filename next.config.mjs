/** @type {import('next').NextConfig} */
const nextConfig = {
  // pdf.js loads its own worker by a runtime import. Bundled into the server
  // build that import resolves to a chunk that does not exist, and reading a
  // paper fails with `Setting up fake worker failed`. Left external, Node
  // resolves it out of node_modules the way pdf.js expects.
  serverExternalPackages: ['pdfjs-dist'],

  // …but "left external" only helps if the file is actually deployed, and the
  // worker never was. Next works out what to ship by following imports, and
  // pdf.js reaches for its worker through a path it builds at runtime — so
  // nothing points at `pdf.worker.mjs` and nothing shipped it. On this machine
  // node_modules is right there and everything worked; on Vercel the function
  // got `pdf.mjs` alone and every extraction died with
  //
  //   Cannot find module '/var/task/node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs'
  //
  // Named here because a tracer cannot be expected to guess it.
  outputFileTracingIncludes: {
    '/api/admin/extract': ['./node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs'],
  },

  // The 3D geometry is a few megabytes per model and never changes between
  // deploys. Left to the default, a phone asks the server whether it has
  // changed on every visit — one slow round trip per file on mobile data —
  // before it shows anything it already holds. A day of "no need to ask",
  // then a week of showing the old copy while it refreshes in the background.
  async headers() {
    return [{
      source: '/anatomy/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
    }, {
      // The laptop app: a window around the site, ~1 MB.
      source: '/MyPromo.exe',
      headers: [
        { key: 'Content-Type', value: 'application/vnd.microsoft.portable-executable' },
        { key: 'Content-Disposition', value: 'attachment; filename="MyPromo.exe"' },
        { key: 'Cache-Control', value: 'public, max-age=300' },
      ],
    }, {
      // The Android app, handed out from /download. Told what it is so a
      // phone installs it rather than showing it as text, and kept for only a
      // few minutes so a new build replaces the old one quickly.
      source: '/MyPromo.apk',
      headers: [
        { key: 'Content-Type', value: 'application/vnd.android.package-archive' },
        { key: 'Content-Disposition', value: 'attachment; filename="MyPromo.apk"' },
        { key: 'Cache-Control', value: 'public, max-age=300' },
      ],
    }];
  },
};
export default nextConfig;
