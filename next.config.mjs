/** @type {import('next').NextConfig} */
const nextConfig = {
  // pdf.js loads its own worker by a runtime import. Bundled into the server
  // build that import resolves to a chunk that does not exist, and reading a
  // paper fails with `Setting up fake worker failed`. Left external, Node
  // resolves it out of node_modules the way pdf.js expects.
  serverExternalPackages: ['pdfjs-dist'],
};
export default nextConfig;
