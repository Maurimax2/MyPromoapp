// Point the native shell at a deployment.
//
//   MYPROMO_URL=https://your-app.vercel.app node scripts/native-url.mjs
//
// `npm run native:sync` runs this first, so the address is stamped into
// capacitor.config.json immediately before Capacitor copies it into the
// Android and iOS projects.
//
// Why a script rather than logic in the config: Capacitor will read a
// capacitor.config.js, but not on every code path — `cap ls` loaded one here
// while `cap add` reported the appId missing from the same file, because this
// package is `"type": "module"` and the CLI reaches for the config
// synchronously in places. A static JSON file is read identically by all of
// them, so the one moving part lives here instead.
//
// The URL is deliberately not committed with a default. A shell built against
// the wrong host looks completely normal and serves somebody else's app,
// which is far worse than a build that stops — so this stops.

import fs from 'node:fs';

const FILE = 'capacitor.config.json';
const site = process.env.MYPROMO_URL;

if (!site) {
  console.error(
    '\nMYPROMO_URL is not set.\n\n'
    + 'It is the deployment the native shell opens. Put it in .env.local:\n\n'
    + '  MYPROMO_URL=https://your-app.vercel.app\n\n'
    + 'or pass it for one command:\n\n'
    + '  MYPROMO_URL=https://your-app.vercel.app npm run native:sync\n\n'
    + 'See NATIVE.md.\n');
  process.exit(1);
}

let host;
try {
  const url = new URL(site);
  if (url.protocol !== 'https:') {
    // The shell refuses mixed content, and an http origin would take the
    // whole app down with it rather than failing on one request.
    console.error(`\nMYPROMO_URL must be https — got ${url.protocol}//\n`);
    process.exit(1);
  }
  host = url.host;
} catch {
  console.error(`\nMYPROMO_URL is not a URL: ${site}\n`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(FILE, 'utf8'));

config.server = { ...config.server, url: site.replace(/\/$/, '') };

// The site's own host has to be navigable, and it must not accumulate: this
// runs on every sync, and a list that grew a stale host every time somebody
// changed deployment would quietly keep the old one reachable.
const fixed = (config.server.allowNavigation || [])
  .filter((h) => !h.endsWith('.vercel.app') && h !== host);
config.server.allowNavigation = [host, ...fixed];

fs.writeFileSync(FILE, `${JSON.stringify(config, null, 2)}\n`);
console.log(`  native shell -> ${config.server.url}`);
