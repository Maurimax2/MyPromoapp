// Meshes out of an FBX, placed where the scene puts them.
//
// An FBX geometry is drawn around its own origin; where it actually sits is on
// the Model that points at it, and on every Model above that. So the vertices
// alone are useless - the masseter and the temporal come out sitting inside
// one another. This walks the connections, builds each model's transform from
// its ancestors, and hands back world-space triangles.
//
// Normals are recomputed rather than read. FBX stores them under a mapping and
// a reference mode that can be by-polygon, by-vertex, direct or indexed, in
// any combination; recomputing is a few lines and cannot be wrong.

import { readFbx } from './read-fbx.mjs';

const RAD = Math.PI / 180;
const NUL = String.fromCharCode(0);

/** An FBX name is the real name, then NUL, then SOH, then the kind. */
const plain = (v) => String(v).split(NUL)[0];

function transform(model) {
  const out = {
    t: [0, 0, 0], r: [0, 0, 0], s: [1, 1, 1],
    gt: [0, 0, 0], gr: [0, 0, 0], gs: [1, 1, 1],
  };
  const props = model && model.children && model.children.find((c) => c.name === 'Properties70');
  if (!props) return out;
  for (const p of props.children) {
    const key = p.values[0];
    const three = [Number(p.values[4]) || 0, Number(p.values[5]) || 0, Number(p.values[6]) || 0];
    if (key === 'Lcl Translation') out.t = three;
    else if (key === 'Lcl Rotation') out.r = three;
    else if (key === 'Lcl Scaling') out.s = three;
    else if (key === 'GeometricTranslation') out.gt = three;
    else if (key === 'GeometricRotation') out.gr = three;
    else if (key === 'GeometricScaling') out.gs = three;
  }
  return out;
}

const identity = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

function multiply(a, b) {
  const out = new Array(16).fill(0);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) sum += a[k * 4 + r] * b[c * 4 + k];
      out[c * 4 + r] = sum;
    }
  }
  return out;
}

function compose({ t, r, s }) {
  const [rx, ry, rz] = r.map((d) => d * RAD);
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const cz = Math.cos(rz), sz = Math.sin(rz);
  // FBX rotates XYZ by default, applied as Rz then Ry then Rx.
  const m = [
    cy * cz, cy * sz, -sy, 0,
    sx * sy * cz - cx * sz, sx * sy * sz + cx * cz, sx * cy, 0,
    cx * sy * cz + sx * sz, cx * sy * sz - sx * cz, cx * cy, 0,
    0, 0, 0, 1,
  ];
  for (let c = 0; c < 3; c++) for (let k = 0; k < 3; k++) m[c * 4 + k] *= s[c];
  m[12] = t[0]; m[13] = t[1]; m[14] = t[2];
  return m;
}

const apply = (m, x, y, z) => [
  m[0] * x + m[4] * y + m[8] * z + m[12],
  m[1] * x + m[5] * y + m[9] * z + m[13],
  m[2] * x + m[6] * y + m[10] * z + m[14],
];

/**
 * Every mesh in the file, by name, in world space.
 *
 * A Map of name to { positions, indices }: metres in the scene's own axes,
 * already triangulated.
 */
export function meshesOf(path) {
  const f = readFbx(path);
  const objects = f.top.find((t) => t.name === 'Objects');
  const links = f.top.find((t) => t.name === 'Connections');

  const models = new Map();
  const geometries = new Map();
  for (const c of objects.children) {
    if (c.name === 'Model') models.set(c.values[0], c);
    else if (c.name === 'Geometry') geometries.set(c.values[0], c);
  }

  const above = new Map();
  for (const c of links.children) {
    if (c.values[0] !== 'OO') continue;
    above.set(c.values[1], c.values[2]);
  }

  const world = new Map();
  const placeOf = (id) => {
    if (world.has(id)) return world.get(id);
    const model = models.get(id);
    if (!model) return identity();
    world.set(id, identity());
    const up = above.get(id);
    const parent = up != null && models.has(up) ? placeOf(up) : identity();
    const m = multiply(parent, compose(transform(model)));
    world.set(id, m);
    return m;
  };

  const out = new Map();
  for (const [id, g] of geometries) {
    const holder = above.get(id);
    const place = holder != null ? placeOf(holder) : identity();
    const local = transform(models.get(holder));
    const m = multiply(place, compose({ t: local.gt, r: local.gr, s: local.gs }));

    const verts = g.children.find((c) => c.name === 'Vertices');
    const faces = g.children.find((c) => c.name === 'PolygonVertexIndex');
    if (!verts || !faces) continue;
    const raw = verts.values[0];
    const poly = faces.values[0];

    const positions = new Float32Array(raw.length);
    for (let i = 0; i < raw.length; i += 3) {
      const p = apply(m, raw[i], raw[i + 1], raw[i + 2]);
      positions[i] = p[0]; positions[i + 1] = p[1]; positions[i + 2] = p[2];
    }

    // Polygons are runs closed by a negative index, which is the real one bit
    // flipped. Fanned into triangles.
    const tris = [];
    let face = [];
    for (let i = 0; i < poly.length; i++) {
      const v = poly[i];
      const last = v < 0;
      face.push(last ? ~v : v);
      if (!last) continue;
      for (let k = 1; k + 1 < face.length; k++) tris.push(face[0], face[k], face[k + 1]);
      face = [];
    }

    const named = models.get(holder);
    const name = plain(named ? named.values[1] : g.values[1]);
    out.set(name, { positions, indices: new Uint32Array(tris) });
  }
  return out;
}

/** Normals for a mesh, from its own triangles. */
export function normalsOf(positions, indices) {
  const n = new Float32Array(positions.length);
  for (let t = 0; t < indices.length; t += 3) {
    const a = indices[t] * 3, b = indices[t + 1] * 3, c = indices[t + 2] * 3;
    const ux = positions[b] - positions[a];
    const uy = positions[b + 1] - positions[a + 1];
    const uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a];
    const vy = positions[c + 1] - positions[a + 1];
    const vz = positions[c + 2] - positions[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    for (const o of [a, b, c]) { n[o] += nx; n[o + 1] += ny; n[o + 2] += nz; }
  }
  const out = new Int16Array(positions.length);
  const cap = (v) => Math.max(-32767, Math.min(32767, Math.round(v * 32767)));
  for (let i = 0; i < n.length; i += 3) {
    const len = Math.hypot(n[i], n[i + 1], n[i + 2]) || 1;
    out[i] = cap(n[i] / len);
    out[i + 1] = cap(n[i + 1] / len);
    out[i + 2] = cap(n[i + 2] / len);
  }
  return out;
}
