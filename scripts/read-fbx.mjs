// Enough of the FBX binary format to get meshes out of it.
//
// Z-Anatomy ships as FBX, one file per system, and FBX is a tree of records
// with typed properties — not a format that needs a 3D engine to read. This
// pulls out what a browser needs and nothing else: every mesh's name, its
// vertices, and the polygons that join them.
//
// Written here rather than pulled in as a dependency because the parts of the
// format that matter are small, and because a library that reads FBX properly
// drags in a scene graph, materials, animation and a matrix stack we would
// throw away.

import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

const MAGIC = 'Kaydara FBX Binary  ';

export function readFbx(path) {
  const buf = readFileSync(path);
  if (buf.toString('binary', 0, MAGIC.length) !== MAGIC) throw new Error(`${path} is not a binary FBX`);
  const version = buf.readUInt32LE(23);
  // Records grew 64-bit offsets at 7.5. Everything before stayed 32-bit.
  const wide = version >= 7500;
  let at = 27;

  const size = () => {
    const v = wide ? Number(buf.readBigUInt64LE(at)) : buf.readUInt32LE(at);
    at += wide ? 8 : 4;
    return v;
  };

  const array = (kind) => {
    const count = buf.readUInt32LE(at);
    const encoding = buf.readUInt32LE(at + 4);
    const bytes = buf.readUInt32LE(at + 8);
    at += 12;
    let raw = buf.subarray(at, at + bytes);
    at += bytes;
    if (encoding === 1) raw = inflateSync(raw);
    const each = { f: 4, d: 8, l: 8, i: 4, b: 1 }[kind];
    const out = kind === 'f' ? new Float32Array(count)
      : kind === 'd' ? new Float64Array(count)
      : kind === 'l' ? new BigInt64Array(count)
      : kind === 'i' ? new Int32Array(count)
      : new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      const o = i * each;
      out[i] = kind === 'f' ? raw.readFloatLE(o)
        : kind === 'd' ? raw.readDoubleLE(o)
        : kind === 'l' ? raw.readBigInt64LE(o)
        : kind === 'i' ? raw.readInt32LE(o)
        : raw[o];
    }
    return out;
  };

  const property = () => {
    const kind = String.fromCharCode(buf[at]); at += 1;
    switch (kind) {
      case 'Y': { const v = buf.readInt16LE(at); at += 2; return v; }
      case 'C': { const v = buf[at] !== 0; at += 1; return v; }
      case 'I': { const v = buf.readInt32LE(at); at += 4; return v; }
      case 'F': { const v = buf.readFloatLE(at); at += 4; return v; }
      case 'D': { const v = buf.readDoubleLE(at); at += 8; return v; }
      case 'L': { const v = Number(buf.readBigInt64LE(at)); at += 8; return v; }
      case 'f': case 'd': case 'l': case 'i': case 'b': return array(kind);
      case 'R': case 'S': {
        const n = buf.readUInt32LE(at); at += 4;
        const v = buf.toString('utf8', at, at + n); at += n;
        return kind === 'S' ? v : v;
      }
      default: throw new Error(`unknown property type ${kind} at ${at}`);
    }
  };

  const record = () => {
    const end = size();
    const props = size();
    size();                              // the property block's length, unused
    const nameLen = buf[at]; at += 1;
    const name = buf.toString('utf8', at, at + nameLen); at += nameLen;
    if (end === 0) return null;          // the null record that closes a list
    const values = [];
    for (let i = 0; i < props; i++) values.push(property());
    const children = [];
    while (at < end) {
      const child = record();
      if (!child) break;
      children.push(child);
    }
    at = end;
    return { name, values, children };
  };

  const top = [];
  while (at < buf.length - 13) {
    const r = record();
    if (!r) break;
    top.push(r);
  }
  return { version, top };
}

/** Every child of a record with the given name. */
export const kids = (node, name) => node.children.filter((c) => c.name === name);
/** The first child with the given name. */
export const kid = (node, name) => node.children.find((c) => c.name === name);
