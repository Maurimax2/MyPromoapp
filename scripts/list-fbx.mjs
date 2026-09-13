// What is inside a Z-Anatomy FBX, so a bundle can be written against it.
//
//   node scripts/list-fbx.mjs CardioVascular41 --z ../zanat --find carotid
//
// Every bundle names its structures one by one, and the source names are
// English. This prints them with their triangle count and where they sit, so
// the naming can be done from the file rather than from memory.

import { meshesOf } from './fbx-meshes.mjs';
import { resolve, join } from 'node:path';

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const file = process.argv[2];
if (!file) { console.error('usage: node scripts/list-fbx.mjs <FileName> [--find text]'); process.exit(1); }
const root = resolve(arg('z', '../zanat'), 'Resources/Models/FBX');
const find = (arg('find', '') || '').toLowerCase();
const box = process.argv.includes('--box');

const meshes = meshesOf(join(root, file.replace(/\.fbx$/i, '') + '.fbx'));
let shown = 0;
for (const [name, m] of meshes) {
  if (find && !name.toLowerCase().includes(find)) continue;
  shown++;
  const tris = m.indices.length / 3;
  let line = `${String(tris).padStart(7)}  ${name}`;
  if (box) {
    let lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9];
    for (let i = 0; i < m.positions.length; i += 3) {
      for (let k = 0; k < 3; k++) {
        if (m.positions[i + k] < lo[k]) lo[k] = m.positions[i + k];
        if (m.positions[i + k] > hi[k]) hi[k] = m.positions[i + k];
      }
    }
    line += `   [${lo.map((v) => (v / 100).toFixed(3)).join(' ')}] [${hi.map((v) => (v / 100).toFixed(3)).join(' ')}]`;
  }
  console.log(line);
}
console.log(`\n${shown} of ${meshes.size} meshes`);
