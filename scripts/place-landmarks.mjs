// Turn the rules in lib/anatomy/landmarks.js into points on the bone.
//
//   node scripts/place-landmarks.mjs
//
// Reads the carved geometry, resolves each rule to an actual vertex, and
// writes the result beside the model. Run it after carving; the output is
// committed like the geometry is.
//
// A rule is a direction and the answer is the vertex furthest that way, which
// is how most of these are defined anatomically anyway — the mastoid is the
// lowest part of the temporal, the glabelle the frontmost part of the frontal.
// The foramen magnum is the exception and gets its own rule: it is a hole, so
// it is found by firing rays through the bone and keeping the ones that come
// out the other side.

import { readFileSync, writeFileSync } from 'node:fs';
import { LANDMARKS } from '../lib/anatomy/landmarks.js';
import { BUNDLES } from '../lib/anatomy/bundles.js';

const near = (v) => Math.round(v * 1e5) / 1e5;

for (const bundle of BUNDLES) {
  const rules = LANDMARKS[bundle.id];
  if (!rules) continue;

  const meta = JSON.parse(readFileSync(`public/anatomy/${bundle.id}.json`, 'utf8'));
  const raw = readFileSync(`public/anatomy/${bundle.id}.bin`);
  const buf = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.length);

  const geometry = new Map();
  for (const p of meta.parts) {
    geometry.set(p.id, {
      part: p,
      pos: new Float32Array(buf, p.positions, p.vertexCount * 3),
      nrm: new Int16Array(buf, p.normals, p.vertexCount * 3),
      idx: new Uint32Array(buf, p.indices, p.indexCount),
    });
  }

  const placed = [];
  for (const rule of rules) {
    const g = geometry.get(rule.part);
    if (!g) { console.error(`no part ${rule.part} for ${rule.name}`); process.exit(1); }
    const found = rule.hole ? throughHole(g, rule.hole) : furthest(g, rule);
    if (!found) { console.error(`could not place ${rule.name}`); process.exit(1); }
    placed.push({ name: rule.name, part: rule.part, at: found.at.map(near), out: found.out.map(near) });
    console.log(`  ${rule.name.padEnd(42)} ${found.at.map((n) => n.toFixed(3)).join(' ')}`);
  }

  writeFileSync(`public/anatomy/${bundle.id}.points.json`,
    `${JSON.stringify({ id: bundle.id, points: placed })}\n`);
  console.log(`${bundle.id}: ${placed.length} landmarks`);
}

/** The vertex furthest along a direction, within an optional slice of the bone. */
function furthest(g, rule) {
  const { pos, nrm, part } = g;
  const [dx, dy, dz] = rule.dir;
  const len = Math.hypot(dx, dy, dz) || 1;
  const d = [dx / len, dy / len, dz / len];

  // A band cuts the bone down to a slice before looking, which is how the two
  // sides of one mesh are told apart: the mandible is a single piece and its
  // left condyle is simply the highest point of its left third.
  let lo = -Infinity, hi = Infinity, axis = 0;
  if (rule.band) {
    const [name, from, to] = rule.band;
    axis = { x: 0, y: 1, z: 2 }[name];
    const a = part.bounds[0][axis], b = part.bounds[1][axis];
    lo = a + (b - a) * from;
    hi = a + (b - a) * to;
  }

  let best = -Infinity, at = null, i3 = 0;
  for (let i = 0; i < part.vertexCount; i++) {
    i3 = i * 3;
    const x = pos[i3], y = pos[i3 + 1], z = pos[i3 + 2];
    const on = [x, y, z][axis];
    if (rule.band && (on < lo || on > hi)) continue;
    const score = x * d[0] + y * d[1] + z * d[2];
    if (score > best) { best = score; at = i; }
  }
  if (at == null) return null;
  const o = at * 3;
  return {
    at: [pos[o], pos[o + 1], pos[o + 2]],
    // The way the surface faces here, so a label on the far side of the skull
    // can be hidden rather than drawn through the bone.
    out: unit([nrm[o] / 32767, nrm[o + 1] / 32767, nrm[o + 2] / 32767]),
  };
}

/** The middle of the largest opening straight through the bone. */
function throughHole(g, along) {
  const { pos, idx, part } = g;
  const axis = { x: 0, y: 1, z: 2 }[along];
  const [u, v] = [0, 1, 2].filter((n) => n !== axis);
  const lo = part.bounds[0], hi = part.bounds[1];
  const STEPS = 120;

  // Where the bone is, seen along the axis, and where the rays go clean
  // through. A hole is somewhere that is inside the outline and hits nothing.
  const solid = new Uint8Array(STEPS * STEPS);
  const tri = [0, 0, 0];
  for (let t = 0; t < idx.length; t += 3) {
    let au = Infinity, bu = -Infinity, av = Infinity, bv = -Infinity;
    for (let k = 0; k < 3; k++) {
      const o = idx[t + k] * 3;
      tri[k] = o;
      au = Math.min(au, pos[o + u]); bu = Math.max(bu, pos[o + u]);
      av = Math.min(av, pos[o + v]); bv = Math.max(bv, pos[o + v]);
    }
    const cu0 = cell(au, lo[u], hi[u]), cu1 = cell(bu, lo[u], hi[u]);
    const cv0 = cell(av, lo[v], hi[v]), cv1 = cell(bv, lo[v], hi[v]);
    for (let cu = cu0; cu <= cu1; cu++) {
      for (let cv = cv0; cv <= cv1; cv++) solid[cv * STEPS + cu] = 1;
    }
  }

  // Empty cells reachable from the edge are outside the bone. What is left
  // empty is enclosed by it: the holes.
  const outside = new Uint8Array(STEPS * STEPS);
  const queue = [];
  for (let i = 0; i < STEPS; i++) {
    for (const c of [i, i + STEPS * (STEPS - 1), i * STEPS, i * STEPS + STEPS - 1]) {
      if (!solid[c] && !outside[c]) { outside[c] = 1; queue.push(c); }
    }
  }
  while (queue.length) {
    const c = queue.pop();
    const cu = c % STEPS, cv = (c - cu) / STEPS;
    for (const [du, dv] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nu = cu + du, nv = cv + dv;
      if (nu < 0 || nv < 0 || nu >= STEPS || nv >= STEPS) continue;
      const n = nv * STEPS + nu;
      if (solid[n] || outside[n]) continue;
      outside[n] = 1; queue.push(n);
    }
  }

  // The biggest enclosed patch is the one worth naming.
  let best = null;
  const seen = new Uint8Array(STEPS * STEPS);
  for (let c = 0; c < solid.length; c++) {
    if (solid[c] || outside[c] || seen[c]) continue;
    const patch = [];
    const walk = [c]; seen[c] = 1;
    while (walk.length) {
      const q = walk.pop(); patch.push(q);
      const qu = q % STEPS, qv = (q - qu) / STEPS;
      for (const [du, dv] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nu = qu + du, nv = qv + dv;
        if (nu < 0 || nv < 0 || nu >= STEPS || nv >= STEPS) continue;
        const n = nv * STEPS + nu;
        if (solid[n] || outside[n] || seen[n]) continue;
        seen[n] = 1; walk.push(n);
      }
    }
    if (!best || patch.length > best.length) best = patch;
  }
  if (!best) return null;

  let su = 0, sv = 0;
  for (const c of best) { su += c % STEPS; sv += (c - (c % STEPS)) / STEPS; }
  const mu = middle(su / best.length, lo[u], hi[u]);
  const mv = middle(sv / best.length, lo[v], hi[v]);

  // Sit the label on the rim rather than in mid-air: the nearest point of the
  // bone to the middle of the hole.
  const centre = [];
  centre[axis] = (lo[axis] + hi[axis]) / 2; centre[u] = mu; centre[v] = mv;
  let close = Infinity, at = null;
  for (let i = 0; i < part.vertexCount; i++) {
    const o = i * 3;
    const du = pos[o + u] - mu, dv = pos[o + v] - mv;
    const flat = du * du + dv * dv;
    if (flat < close) { close = flat; at = o; }
  }
  const out = [0, 0, 0];
  out[axis] = pos[at + axis] < centre[axis] ? -1 : 1;
  return { at: [pos[at], pos[at + 1], pos[at + 2]], out };

  function cell(value, a, b) {
    return Math.max(0, Math.min(STEPS - 1, Math.floor(((value - a) / (b - a)) * STEPS)));
  }
  function middle(c, a, b) { return a + ((c + 0.5) / STEPS) * (b - a); }
}

function unit([x, y, z]) {
  const n = Math.hypot(x, y, z) || 1;
  return [x / n, y / n, z / n];
}
