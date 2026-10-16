// What the scanner atlases' carves share (scripts/carve-oreille.mjs and
// scripts/carve-cerveau.mjs): nearest points, a similarity fitted by closest
// points (Horn's quaternion method), the minimal GLB writer.
//
// A guide for the fit is { src: [[x,y,z]…] sampled from the atlas, sc and dc:
// the centroids of the atlas piece and of its Z-Anatomy counterpart, near: a
// nearest-point lookup on the counterpart, w: weight, core: whether the two
// are the same whole thing (only the best 90 % of its points count) or a
// partial piece of a longer one (the best 60 %) }.

// ------------------------------------------------------- nearest-point grids
export function grid(points, cell) {
  const g = new Map();
  for (let i = 0; i < points.length; i += 3) {
    const k = `${Math.floor(points[i] / cell)},${Math.floor(points[i + 1] / cell)},${Math.floor(points[i + 2] / cell)}`;
    if (!g.has(k)) g.set(k, []);
    g.get(k).push(i);
  }
  // Nearest point, searched in growing shells of cells (and one more after the
  // first hit, so a nearer point in the next shell is not missed).
  return (x, y, z, rings = 12) => {
    const cx = Math.floor(x / cell), cy = Math.floor(y / cell), cz = Math.floor(z / cell);
    let best = -1, bd = Infinity, stop = rings;
    for (let r = 0; r <= stop; r++) {
      for (let i = -r; i <= r; i++) for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) {
        if (Math.max(Math.abs(i), Math.abs(j), Math.abs(k)) !== r) continue;
        const l = g.get(`${cx + i},${cy + j},${cz + k}`);
        if (!l) continue;
        for (const a of l) {
          const d = (points[a] - x) ** 2 + (points[a + 1] - y) ** 2 + (points[a + 2] - z) ** 2;
          if (d < bd) { bd = d; best = a; }
        }
      }
      if (best >= 0 && stop === rings) stop = r + 1;
    }
    return best < 0 ? null : [points[best], points[best + 1], points[best + 2], Math.sqrt(bd)];
  };
}

// --------------------------------------------------- similarity (Horn, 1987)
function topEigen4(A) {
  const a = A.map((r) => r.slice());
  const V = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0;
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) off += a[i][j] ** 2;
    if (off < 1e-24) break;
    for (let p = 0; p < 4; p++) for (let q = p + 1; q < 4; q++) {
      if (Math.abs(a[p][q]) < 1e-30) continue;
      const th = (a[q][q] - a[p][p]) / (2 * a[p][q]);
      const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
      const c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < 4; k++) { const x = a[k][p], y = a[k][q]; a[k][p] = c * x - s * y; a[k][q] = s * x + c * y; }
      for (let k = 0; k < 4; k++) { const x = a[p][k], y = a[q][k]; a[p][k] = c * x - s * y; a[q][k] = s * x + c * y; }
      for (let k = 0; k < 4; k++) { const x = V[k][p], y = V[k][q]; V[k][p] = c * x - s * y; V[k][q] = s * x + c * y; }
    }
  }
  let b = 0;
  for (let i = 1; i < 4; i++) if (a[i][i] > a[b][b]) b = i;
  return [V[0][b], V[1][b], V[2][b], V[3][b]];
}
export function similarity(X, Y, W) {
  let sw = 0;
  const mx = [0, 0, 0], my = [0, 0, 0];
  X.forEach((x, i) => { sw += W[i]; for (let k = 0; k < 3; k++) { mx[k] += W[i] * x[k]; my[k] += W[i] * Y[i][k]; } });
  for (let k = 0; k < 3; k++) { mx[k] /= sw; my[k] /= sw; }
  const M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  let sxx = 0;
  X.forEach((x, i) => {
    const a = x.map((v, k) => v - mx[k]), b = Y[i].map((v, k) => v - my[k]);
    sxx += W[i] * (a[0] ** 2 + a[1] ** 2 + a[2] ** 2);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) M[r][c] += W[i] * a[r] * b[c];
  });
  const [[xx, xy, xz], [yx, yy, yz], [zx, zy, zz]] = M;
  const [w, x, y, z] = topEigen4([
    [xx + yy + zz, yz - zy, zx - xz, xy - yx],
    [yz - zy, xx - yy - zz, xy + yx, zx + xz],
    [zx - xz, xy + yx, -xx + yy - zz, yz + zy],
    [xy - yx, zx + xz, yz + zy, -xx - yy + zz],
  ]);
  const R = [
    [w * w + x * x - y * y - z * z, 2 * (x * y - w * z), 2 * (x * z + w * y)],
    [2 * (x * y + w * z), w * w - x * x + y * y - z * z, 2 * (y * z - w * x)],
    [2 * (x * z - w * y), 2 * (y * z + w * x), w * w - x * x - y * y + z * z],
  ];
  let num = 0;
  X.forEach((p, i) => {
    const a = p.map((v, k) => v - mx[k]);
    const ra = R.map((r) => r[0] * a[0] + r[1] * a[1] + r[2] * a[2]);
    num += W[i] * ra.reduce((n, v, k) => n + v * (Y[i][k] - my[k]), 0);
  });
  const s = num / sxx;
  const t = my.map((v, k) => v - s * (R[k][0] * mx[0] + R[k][1] * mx[1] + R[k][2] * mx[2]));
  return { R, s, t };
}
export const move = ({ R, s, t }, p) => R.map((r, k) => s * (r[0] * p[0] + r[1] * p[1] + r[2] * p[2]) + t[k]);

// Keeps only the triangles `keep(t)` says, and the vertices they use.
export function subset(positions, indices, keep) {
  const map = new Int32Array(positions.length / 3).fill(-1);
  const pos = [], idx = [];
  for (let t = 0; t < indices.length; t += 3) {
    if (!keep(t / 3)) continue;
    for (let k = 0; k < 3; k++) {
      const v = indices[t + k];
      if (map[v] < 0) { map[v] = pos.length / 3; pos.push(positions[v * 3], positions[v * 3 + 1], positions[v * 3 + 2]); }
      idx.push(map[v]);
    }
  }
  return { positions: Float32Array.from(pos), indices: Uint32Array.from(idx) };
}

export const sample = (p, n) => {
  const step = Math.max(1, Math.floor(p.length / 3 / n));
  const out = [];
  for (let i = 0; i < p.length; i += 3 * step) out.push([p[i], p[i + 1], p[i + 2]]);
  return out;
};
export const centroid = (p) => {
  const c = [0, 0, 0];
  for (let i = 0; i < p.length; i += 3) { c[0] += p[i]; c[1] += p[i + 1]; c[2] += p[i + 2]; }
  return c.map((v) => v / (p.length / 3));
};
/** Fits the guides; `mirror` flips the atlas's x first (the other hand). */
export function fit(guides, mirror) {
  const M = (p) => (mirror ? [-p[0], p[1], p[2]] : p);
  const core = guides.filter((g) => g.core);
  let T = similarity(core.map((g) => M(g.sc)), core.map((g) => g.dc), core.map(() => 1));
  let err = 0;
  for (let it = 0; it < 80; it++) {
    const X = [], Y = [], W = [];
    let e = 0, n = 0;
    for (const g of guides) {
      const hits = [];
      for (const q of g.src) { const h = g.near(...move(T, M(q))); if (h) hits.push([q, h]); }
      hits.sort((a, b) => a[1][3] - b[1][3]);
      const keep = hits.slice(0, Math.ceil(hits.length * (g.core ? 0.9 : 0.6)));
      for (const [q, h] of keep) {
        X.push(M(q)); Y.push(h.slice(0, 3)); W.push(g.w / keep.length);
        if (g.core) { e += h[3]; n++; }
      }
    }
    T = similarity(X, Y, W);
    err = e / n;
  }
  const per = guides.map((g) => {
    let e = 0;
    for (const q of g.src) e += g.near(...move(T, M(q)))[3];
    return `${g.f.replace(/Model_\d+_|\.vtk/g, '')} ${(e / g.src.length * 1000).toFixed(1)}`;
  });
  return { mirror, T, err, per };
}
// A mirror turns every triangle inside out unless its winding is reversed.
export const flipWinding = (idx) => {
  const o = Uint32Array.from(idx);
  for (let t = 0; t < o.length; t += 3) { o[t + 1] = idx[t + 2]; o[t + 2] = idx[t + 1]; }
  return o;
};
export const mirrorX = (p) => { const q = Float32Array.from(p); for (let i = 0; i < q.length; i += 3) q[i] = -q[i]; return q; };

// ------------------------------------------------------------------ the GLB
export function boxOf(p) {
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], p[i + k]); hi[k] = Math.max(hi[k], p[i + k]); }
  return [lo, hi];
}
/** The same minimal GLB writer as carve-body.mjs: one node per structure. */
export function glb(meshes) {
  const views = [], accessors = [], gmeshes = [], nodes = [], chunks = [];
  let at = 0;
  const put = (arr, target) => {
    const pad = (4 - (at % 4)) % 4;
    if (pad) { chunks.push(Buffer.alloc(pad)); at += pad; }
    const buf = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
    views.push({ buffer: 0, byteOffset: at, byteLength: buf.length, target });
    chunks.push(buf); at += buf.length;
    return views.length - 1;
  };
  for (const m of meshes) {
    const [lo, hi] = boxOf(m.positions);
    accessors.push({ bufferView: put(m.positions, 34962), componentType: 5126, count: m.positions.length / 3, type: 'VEC3', min: lo, max: hi });
    accessors.push({ bufferView: put(m.normals, 34962), componentType: 5126, count: m.normals.length / 3, type: 'VEC3' });
    accessors.push({ bufferView: put(m.indices, 34963), componentType: 5125, count: m.indices.length, type: 'SCALAR' });
    const a = accessors.length;
    gmeshes.push({ name: m.id, primitives: [{ attributes: { POSITION: a - 3, NORMAL: a - 2 }, indices: a - 1, material: 0 }] });
    nodes.push({ name: m.id, mesh: gmeshes.length - 1 });
  }
  const json = {
    asset: { version: '2.0', generator: 'MyPromo spl-lib' },
    scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes: gmeshes,
    accessors, bufferViews: views, buffers: [{ byteLength: at }],
    materials: [{ name: 'tissue', pbrMetallicRoughness: { baseColorFactor: [0.9, 0.9, 0.9, 1], metallicFactor: 0, roughnessFactor: 0.6 } }],
  };
  let text = Buffer.from(JSON.stringify(json));
  if (text.length % 4) text = Buffer.concat([text, Buffer.alloc(4 - (text.length % 4), 0x20)]);
  const bin = Buffer.concat(chunks);
  const binPad = bin.length % 4 ? Buffer.alloc(4 - (bin.length % 4)) : Buffer.alloc(0);
  const head = Buffer.alloc(12);
  head.writeUInt32LE(0x46546c67, 0); head.writeUInt32LE(2, 4);
  head.writeUInt32LE(12 + 8 + text.length + 8 + bin.length + binPad.length, 8);
  const jh = Buffer.alloc(8); jh.writeUInt32LE(text.length, 0); jh.writeUInt32LE(0x4e4f534a, 4);
  const bh = Buffer.alloc(8); bh.writeUInt32LE(bin.length + binPad.length, 0); bh.writeUInt32LE(0x004e4942, 4);
  return Buffer.concat([head, jh, text, bh, bin, binPad]);
}

