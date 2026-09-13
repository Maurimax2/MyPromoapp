// Cut one bone's triangles into its named parts.
//
// Each part gets an anchor — the point of the bone furthest in the direction
// the rule gives — and every triangle goes to the anchor its middle is nearest
// to. The result is the same triangles in a new order, plus the run each part
// occupies, which the browser draws as a group with its own colour.
//
// The division is approximate by construction and that is stated rather than
// hidden: the boundaries fall where the parts meet, not along a suture the
// geometry does not contain.
//
// Shared by both carve scripts, because a bone is a bone whichever atlas it
// came out of. It takes plain arrays, not a file and an offset.

import { PART_TINTS } from '../lib/anatomy/parts.js';

/**
 * @param {Float32Array} pos     vertex positions, three per vertex
 * @param {Uint32Array}  idx     triangle indices
 * @param {number[][]}   bounds  [[minX,minY,minZ],[maxX,maxY,maxZ]]
 * @param {object[]}     seeds   the parts, from lib/anatomy/parts.js
 * @param {boolean}      mirrored  true for the right-side copy of a left mesh
 */
export function divide(pos, idx, bounds, seeds, mirrored) {
  const vertexCount = pos.length / 3;
  const indexCount = idx.length;

  const anchors = seeds.map((seed) => {
    const d = [...seed.dir];
    if (mirrored) d[0] = -d[0];
    const len = Math.hypot(...d) || 1;
    const unit = d.map((n) => n / len);

    let lo = -Infinity, hi = Infinity, axis = 0;
    if (seed.band) {
      const [name, from, to] = seed.band;
      axis = { x: 0, y: 1, z: 2 }[name];
      const a = bounds[0][axis], b = bounds[1][axis];
      lo = a + (b - a) * from;
      hi = a + (b - a) * to;
    }

    // Measured inside the bone's own box rather than in metres. A maxilla is
    // three times as deep as it is wide, so in raw coordinates "forward and a
    // little to the side" is simply "forward", and the anchors for the two
    // sides landed in different places on bones that are nearly mirrors.
    const span = [0, 1, 2].map((k) => (bounds[1][k] - bounds[0][k]) || 1);
    let best = -Infinity, at = 0;
    for (let v = 0; v < vertexCount; v++) {
      const o = v * 3;
      if (seed.band) { const on = pos[o + axis]; if (on < lo || on > hi) continue; }
      let score = 0;
      for (let k = 0; k < 3; k++) score += unit[k] * ((pos[o + k] - bounds[0][k]) / span[k]);
      if (score > best) { best = score; at = o; }
    }
    return [pos[at], pos[at + 1], pos[at + 2]];
  });

  const mine = new Uint8Array(indexCount / 3);
  for (let t = 0; t < indexCount; t += 3) {
    let cx = 0, cy = 0, cz = 0;
    for (let k = 0; k < 3; k++) {
      const o = idx[t + k] * 3;
      cx += pos[o]; cy += pos[o + 1]; cz += pos[o + 2];
    }
    cx /= 3; cy /= 3; cz /= 3;
    let near = Infinity, who = 0;
    anchors.forEach((a, i) => {
      // `pull` is how far a part reaches. Nearest-anchor alone gives a thin
      // spike like the styloid process the same territory as the mastoid it
      // sits beside, because territory is decided by the gap between anchors
      // and not by the size of the thing.
      const reach = seeds[i].pull || 1;
      const d = ((cx - a[0]) ** 2 + (cy - a[1]) ** 2 + (cz - a[2]) ** 2) / (reach * reach);
      if (d < near) { near = d; who = i; }
    });
    mine[t / 3] = who;
  }

  const order = new Uint32Array(indexCount);
  const groups = [];
  let cursor = 0;
  seeds.forEach((seed, i) => {
    const start = cursor;
    for (let t = 0; t < mine.length; t++) {
      if (mine[t] !== i) continue;
      order[cursor] = idx[t * 3];
      order[cursor + 1] = idx[t * 3 + 1];
      order[cursor + 2] = idx[t * 3 + 2];
      cursor += 3;
    }
    groups.push({
      name: seed.name, tint: PART_TINTS[i % PART_TINTS.length],
      start, count: cursor - start,
    });
  });
  return { order, groups };
}
