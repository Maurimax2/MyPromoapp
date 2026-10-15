// Legacy VTK polydata (the files 3D Slicer writes), binary or ASCII.
//
// Points, then polygons or triangle strips, turned into triangles. Binary
// numbers are big-endian. Version 4.1 files may put a METADATA block after a
// section; it runs to the next blank line and is skipped. Point data
// (normals, scalars) is ignored: normals are recomputed where they are used.

import { readFileSync } from 'node:fs';

export function readVtk(path) {
  const buf = readFileSync(path);
  let at = 0;
  const line = () => {
    const end = buf.indexOf(0x0a, at);
    const s = buf.toString('latin1', at, end < 0 ? buf.length : end).trim();
    at = end < 0 ? buf.length : end + 1;
    return s;
  };
  line(); line();
  const binary = line().toUpperCase() === 'BINARY';
  let words = [];
  const word = () => {
    while (!words.length) {
      if (at >= buf.length) return null;
      words = line().split(/\s+/).filter(Boolean);
    }
    return words.shift();
  };
  const floats = (n, type) => {
    const out = new Float32Array(n);
    if (binary) {
      const size = type === 'double' ? 8 : 4;
      for (let i = 0; i < n; i++) out[i] = size === 8 ? buf.readDoubleBE(at + i * 8) : buf.readFloatBE(at + i * 4);
      at += n * size;
      if (buf[at] === 0x0a) at++;
    } else for (let i = 0; i < n; i++) out[i] = Number(word());
    return out;
  };
  const ints = (n) => {
    const out = new Int32Array(n);
    if (binary) {
      for (let i = 0; i < n; i++) out[i] = buf.readInt32BE(at + i * 4);
      at += n * 4;
      if (buf[at] === 0x0a) at++;
    } else for (let i = 0; i < n; i++) out[i] = Number(word());
    return out;
  };
  const skipMeta = () => {
    // METADATA … up to and including the first empty line.
    while (at < buf.length) { if (line() === '') break; }
  };

  let positions = null;
  const tris = [];
  for (;;) {
    const w = word();
    if (w == null) break;
    const key = w.toUpperCase();
    if (key === 'DATASET') { word(); continue; }
    if (key === 'METADATA') { words = []; skipMeta(); continue; }
    if (key === 'POINTS') {
      const n = Number(word()); const type = word(); words = [];
      positions = floats(n * 3, type);
      continue;
    }
    if (key === 'POLYGONS' || key === 'TRIANGLE_STRIPS' || key === 'VERTICES' || key === 'LINES') {
      word(); const size = Number(word()); words = [];
      const cells = ints(size);
      for (let i = 0; i < cells.length;) {
        const k = cells[i++];
        const c = cells.subarray(i, i + k); i += k;
        if (key === 'POLYGONS') for (let j = 1; j + 1 < k; j++) tris.push(c[0], c[j], c[j + 1]);
        else if (key === 'TRIANGLE_STRIPS') for (let j = 0; j + 2 < k; j++) {
          if (j % 2) tris.push(c[j + 1], c[j], c[j + 2]); else tris.push(c[j], c[j + 1], c[j + 2]);
        }
      }
      continue;
    }
    // Point or cell data: nothing more is needed from the file.
    if (key === 'POINT_DATA' || key === 'CELL_DATA') break;
  }
  return { positions, indices: Uint32Array.from(tris) };
}
