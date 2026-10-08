// Planches d'anatomie: fetch each picked drawing from Servier Medical Art and
// write it as WebP into public/planches — the plate (1600 px on its long side)
// and a thumbnail for the grid.
//
//   node scripts/fetch-planches.mjs
//
// The originals are cached in ../servier, so a second run fetches nothing.
// Only what lib/anatomy/planches.js lists is fetched.

import { mkdirSync, existsSync, writeFileSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { PLANCHES } from '../lib/anatomy/planches.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = resolve(HERE, '../../servier');
const OUT = resolve(HERE, '../public/planches');
const UA = { 'User-Agent': 'Mozilla/5.0 (MyPromo study app; images credited CC BY 4.0)' };
mkdirSync(CACHE, { recursive: true });
mkdirSync(OUT, { recursive: true });

const sizes = {};
let bytes = 0;
for (const p of PLANCHES) {
  const raw = join(CACHE, `${p.id}.png`);
  if (!existsSync(raw)) {
    const r = await fetch(p.file, { headers: UA });
    if (!r.ok) throw new Error(`${p.id}: ${r.status}`);
    writeFileSync(raw, Buffer.from(await r.arrayBuffer()));
    await new Promise((ok) => setTimeout(ok, 250));
  }
  const src = readFileSync(raw);
  // Drawn on transparency; a plate is read on white.
  const flat = sharp(src).flatten({ background: '#ffffff' });
  const big = await flat.clone().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 }).toBuffer({ resolveWithObject: true });
  const small = await flat.clone().resize(420, 420, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 }).toBuffer();
  writeFileSync(join(OUT, `${p.id}.webp`), big.data);
  writeFileSync(join(OUT, `${p.id}-t.webp`), small);
  sizes[p.id] = [big.info.width, big.info.height];
  bytes += big.data.length + small.length;
}
// The shapes, so the grid reserves each plate's place before it arrives.
writeFileSync(join(OUT, 'sizes.json'), JSON.stringify(sizes));
console.log(`${PLANCHES.length} plates, ${(bytes / 1e6).toFixed(1)} MB`);
