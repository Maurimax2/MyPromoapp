// The pictures of the subjects, rendered from the app's own models.
//
//   node scripts/render-models.mjs            every picture
//   node scripts/render-models.mjs coeur virus  just these
//
// Writes public/art/<name>.webp — the images lib/subjectArt.js hands out.
//
// Each one is either a real anatomy bundle from public/anatomy (BodyParts3D,
// the same geometry the 3D reader draws, in the same world frame, so several
// bundles compose without being registered to each other) or, for a subject
// with no body part, a model built in scripts/render/render.html. Rendered in
// a real browser with WebGL, on a transparent ground, trimmed and shrunk.
//
// The camera, the parts kept and the angle for each are below. Changing one is
// a matter of editing its line and running this for that name alone.

import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright-core';

const APP = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1'), '..');
const OUT = path.join(APP, 'public', 'art');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'mypromo-art-'));
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

// name → [query, longest side in px]
const SHOTS = {
  crane: ['bundle=crane&yaw=-32&pitch=6&zoom=1.05', 360],
  'crane-big': ['bundle=crane&yaw=-18&pitch=4&zoom=1.0', 640],
  tete: ['bundle=tete&yaw=-30&pitch=4&zoom=1.05', 360],
  coeur: ['bundle=coeur&yaw=20&pitch=4&zoom=1.1', 360],
  'coeur-big': ['bundle=coeur&yaw=20&pitch=4&zoom=1.0', 640],
  poumons: ['bundle=poumons&yaw=0&pitch=4&zoom=1.05', 360],
  encephale: ['bundle=encephale&yaw=-60&pitch=8&zoom=1.1', 360],
  reins: ['bundle=urinaire&only=Reins,Glandes%20surr%C3%A9nales&yaw=-18&pitch=0&zoom=1.1', 360],
  colonne: ['bundle=colonne&yaw=90&pitch=0&zoom=1.05', 360],
  'membre-sup': ['bundle=membre-sup&yaw=-20&pitch=0&zoom=1.05', 360],
  thorax: ['bundle=thorax&only=Sternum,C%C3%B4tes%20vraies,C%C3%B4tes%20fausses,C%C3%B4tes%20flottantes,Cartilages%20costaux&yaw=-25&pitch=8&zoom=1.05', 360],
  main: ['bundle=main&yaw=0&pitch=-10&zoom=1.05', 360],
  pied: ['bundle=pied&yaw=60&pitch=20&zoom=1.05', 360],
  // The regions of the 3D tab that no subject banner needed.
  'membre-inf': ['bundle=membre-inf&yaw=-25&pitch=0&zoom=1.05', 360],
  bassin: ['bundle=membre-inf&only=Os%20coxal&yaw=-90&pitch=6&zoom=1.1', 360],
  cou: ['bundle=cou&yaw=-35&pitch=4&zoom=1.1', 360],
  digestif: ['bundle=abdomen&only=Foie,Tube%20digestif%20haut,Voies%20biliaires&skip=%C5%92sophage&yaw=0&pitch=4&zoom=1.05', 360],
  colon: ['bundle=abdomen&only=C%C3%B4lon,Intestin%20gr%C3%AAle&yaw=0&pitch=4&zoom=1.05', 360],
  pancreas: ['bundle=abdomen&names=Pancr%C3%A9as,Rate&yaw=0&pitch=10&zoom=1.05', 360],
  radiologie: ['bundle=thorax&only=Sternum,C%C3%B4tes%20vraies,C%C3%B4tes%20fausses,C%C3%B4tes%20flottantes,Cartilages%20costaux&xray=1&yaw=-10&pitch=4&zoom=1.05', 360],
  organes: ['bundle=coeur,poumons,abdomen&ghost=poumons&yaw=0&pitch=0&zoom=1.05', 360],
  molecule: ['proc=molecule&yaw=24&pitch=22&zoom=1.05', 360],
  morula: ['proc=morula&yaw=0&pitch=12&zoom=1.1', 360],
  cellules: ['proc=tissue&yaw=18&pitch=38&zoom=1.1', 360],
  membrane: ['proc=membrane&yaw=-25&pitch=18&zoom=1.05', 360],
  chromosomes: ['proc=chromosomes&yaw=0&pitch=0&zoom=1.05', 360],
  globules: ['proc=blood&yaw=0&pitch=0&zoom=1.05', 360],
  anticorps: ['proc=antibodies&yaw=15&pitch=0&zoom=1.05', 360],
  bacteries: ['proc=bacteria&yaw=10&pitch=10&zoom=1.05', 360],
  virus: ['proc=virus&yaw=0&pitch=0&zoom=1.05', 360],
  gelules: ['proc=pills&yaw=0&pitch=10&zoom=1.05', 360],
  parasite: ['proc=worm&yaw=0&pitch=20&zoom=1.05', 360],
  infection: ['proc=infection&yaw=0&pitch=0&zoom=1.05', 360],
  hopital: ['proc=hospital&yaw=-28&pitch=14&zoom=1.05', 360],
  graphique: ['proc=chart&yaw=-24&pitch=10&zoom=1.05', 360],
  langue: ['proc=lang&yaw=-18&pitch=6&zoom=1.05', 360],
};

const TYPES = { '.js': 'text/javascript', '.json': 'application/json', '.html': 'text/html', '.bin': 'application/octet-stream' };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  let file = null;
  if (u === '/render.html') file = path.join(APP, 'scripts/render/render.html');
  else if (u.startsWith('/anatomy/')) file = path.join(APP, 'public', u);
  else if (u.startsWith('/three/')) file = path.join(APP, 'node_modules/three/build', u.slice(7));
  else if (u.startsWith('/addons/')) file = path.join(APP, 'node_modules/three/examples/jsm', u.slice(8));
  else if (u.startsWith('/fonts/')) file = path.join(APP, 'node_modules/three/examples/fonts', u.slice(7));
  else if (u.startsWith('/lib/')) file = path.join(APP, 'lib/anatomy', u.slice(5));
  if (!file || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(3211);

const wanted = process.argv.slice(2);
const names = wanted.length ? wanted : Object.keys(SHOTS);
const unknown = names.filter((n) => !SHOTS[n]);
if (unknown.length) { console.error(`no such picture: ${unknown.join(', ')}`); process.exit(1); }

const browser = await chromium.launch({ executablePath: EDGE, args: ['--use-angle=d3d11', '--enable-webgl', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
page.on('pageerror', (e) => console.log('  page error:', String(e).slice(0, 160)));
fs.mkdirSync(OUT, { recursive: true });

for (const name of names) {
  const [qs, side] = SHOTS[name];
  await page.goto(`http://127.0.0.1:3211/render.html?${qs}&size=1000`);
  await page.waitForFunction(() => document.title === 'done', null, { timeout: 60000 });
  const raw = path.join(TMP, `${name}.png`);
  await page.locator('canvas').screenshot({ path: raw, omitBackground: true });
  const out = await sharp(raw).trim().resize(side, side, { fit: 'inside' })
    .webp({ quality: 86, alphaQuality: 92 }).toFile(path.join(OUT, `${name}.webp`));
  console.log(`  ${name.padEnd(12)} ${out.width}x${out.height}  ${(out.size / 1024).toFixed(0)} KB`);
}

await browser.close();
server.close();
fs.rmSync(TMP, { recursive: true, force: true });
