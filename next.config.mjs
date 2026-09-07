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
};
export default nextConfig;
