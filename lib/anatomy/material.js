// What a structure looks like up close: surface, not just colour.
//
// The geometry carries no texture coordinates, so an image texture has
// nothing to hang on — the bone grain that used to be a normal map was never
// actually drawn. The detail is generated in the shader instead, from the
// point's own position in the body: noise in 3D needs no UVs, costs no
// download, and cannot stretch or seam.
//
// Three surfaces, after the tissue:
//   fibre  muscle, tendon, nerve — striations running along the structure's
//          own long axis, found once per mesh from its vertices;
//   pore   bone, lung — a fine porous grain over a broad mottling;
//   soft   vessels, viscera, brain — a faint mottle under a wet clearcoat.
//
// The detail fades out as it gets smaller than a pixel. High-frequency noise
// drawn at a distance does not look like texture, it sparkles.

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const FIBRE = 2, PORE = 1, SOFT = 0;

// Per tissue: how the surface is made (grain, cycles per metre, colour
// variation, relief) and how it takes light. Wet tissue gets a clearcoat,
// dry bone does not; muscle and tendon get a sheen, which is what makes a
// striated surface read as fibres rather than as scratches.
const WET = { roughness: 0.46, clearcoat: 0.55, clearcoatRoughness: 0.32, grain: SOFT, freq: 55, amp: 0.10, bump: 0.18 };
const LOOK = {
  bone:      { roughness: 0.74, grain: PORE, freq: 420, amp: 0.08, bump: 0.26 },
  cartilage: { roughness: 0.34, clearcoat: 0.5, clearcoatRoughness: 0.3, grain: SOFT, freq: 60, amp: 0.05, bump: 0.08 },
  disc:      { roughness: 0.5, clearcoat: 0.25, grain: FIBRE, freq: 260, amp: 0.06, bump: 0.18 },
  muscle:    { roughness: 0.52, clearcoat: 0.28, clearcoatRoughness: 0.45, sheen: 0.25, sheenColor: '#d9786a', sheenRoughness: 0.5,
               grain: FIBRE, freq: 520, amp: 0.24, bump: 0.42 },
  tendon:    { roughness: 0.4, clearcoat: 0.4, clearcoatRoughness: 0.35, sheen: 0.8, sheenColor: '#ffffff', sheenRoughness: 0.35,
               grain: FIBRE, freq: 700, amp: 0.06, bump: 0.22 },
  nerve:     { roughness: 0.46, clearcoat: 0.3, sheen: 0.5, sheenColor: '#fff4b8', sheenRoughness: 0.4,
               grain: FIBRE, freq: 600, amp: 0.08, bump: 0.26 },
  artery:    { roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.22, grain: SOFT, freq: 70, amp: 0.06, bump: 0.08 },
  vein:      { roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.22, grain: SOFT, freq: 70, amp: 0.06, bump: 0.08 },
  sinus:     { roughness: 0.36, clearcoat: 0.6, clearcoatRoughness: 0.25, grain: SOFT, freq: 70, amp: 0.05, bump: 0.06 },
  brain:     { roughness: 0.44, clearcoat: 0.45, clearcoatRoughness: 0.35, grain: SOFT, freq: 90, amp: 0.08, bump: 0.14 },
  grey:      { roughness: 0.46, clearcoat: 0.4, clearcoatRoughness: 0.35, grain: SOFT, freq: 90, amp: 0.07, bump: 0.12 },
  csf:       { roughness: 0.2, clearcoat: 0.85, clearcoatRoughness: 0.12, grain: SOFT, freq: 40, amp: 0.02, bump: 0 },
  lung:      { roughness: 0.62, clearcoat: 0.3, clearcoatRoughness: 0.4, grain: PORE, freq: 300, amp: 0.1, bump: 0.2 },
  heart: WET, liver: WET, gut: WET, gland: WET, kidney: WET, gonad: WET, erectile: WET,
  urine:     { ...WET, clearcoat: 0.65 },
};

const NOISE = /* glsl */ `
varying vec3 vObj;
uniform vec3 uAxis;
uniform float uFreq, uAmp, uBump, uGrain;
float mpHash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float mpNoise(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(mpHash(i), mpHash(i + vec3(1,0,0)), f.x),
                 mix(mpHash(i + vec3(0,1,0)), mpHash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(mpHash(i + vec3(0,0,1)), mpHash(i + vec3(1,0,1)), f.x),
                 mix(mpHash(i + vec3(0,1,1)), mpHash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float mpFbm(vec3 p) {
  float s = 0.0, a = 0.5;
  for (int k = 0; k < 3; k++) { s += a * mpNoise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return s / 0.875;
}
// The surface's height at this point, 0..1, for the grain this tissue has.
float mpHeight(vec3 o) {
  vec3 p = o * uFreq;
  if (uGrain > 1.5) {
    vec3 a = normalize(uAxis);
    float along = dot(p, a);
    vec3 across = p - a * along;
    // Stretched hard along the axis: long fibres, fine across.
    return mpFbm(across + a * along * 0.05);
  }
  if (uGrain > 0.5) {
    float g = mpFbm(p);
    return g * g * 1.3;
  }
  return mpFbm(p * 0.6);
}
`;

// Built once: every tissue shares the same program, with its own uniforms.
function patch(shader, u) {
  Object.assign(shader.uniforms, u);
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vObj;')
    .replace('#include <begin_vertex>', '#include <begin_vertex>\nvObj = position;');
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', `#include <common>\n${NOISE}`)
    .replace('void main() {', `void main() {
  // How big one pixel is in noise cycles: past half a cycle the detail is
  // below the pixel and is faded out rather than left to shimmer.
  float mpFoot = length(fwidth(vObj * uFreq));
  float mpKeep = 1.0 - smoothstep(0.35, 0.9, mpFoot);
  float mpH = mpHeight(vObj) * mpKeep;
  float mpBroad = mpFbm(vObj * 22.0);`)
    .replace('#include <color_fragment>', `#include <color_fragment>
  diffuseColor.rgb *= 1.0 + uAmp * ((mpH - 0.5 * mpKeep) * 1.5 + (mpBroad - 0.5) * 0.9);`)
    .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
  if (uBump > 0.0 && mpKeep > 0.01) {
    // Bump from the height's screen-space slope (Mikkelsen), made
    // independent of the model's scale by working in noise cycles.
    vec3 sx = dFdx(-vViewPosition), sy = dFdy(-vViewPosition);
    vec3 r1 = cross(sy, normal), r2 = cross(normal, sx);
    float det = dot(sx, r1);
    vec3 grad = sign(det) * (dFdx(mpH) * r1 + dFdy(mpH) * r2) / max(abs(det), 1e-20);
    normal = normalize(normal - uBump * grad / uFreq);
  }`);
}

/** The long axis of a mesh, from its vertices: the direction fibres run. */
export function axisOf(positions) {
  const n = positions.length / 3;
  const step = Math.max(1, Math.floor(n / 4000));
  let mx = 0, my = 0, mz = 0, c = 0;
  for (let i = 0; i < n; i += step) { mx += positions[i * 3]; my += positions[i * 3 + 1]; mz += positions[i * 3 + 2]; c += 1; }
  mx /= c; my /= c; mz /= c;
  let xx = 0, xy = 0, xz = 0, yy = 0, yz = 0, zz = 0;
  for (let i = 0; i < n; i += step) {
    const x = positions[i * 3] - mx, y = positions[i * 3 + 1] - my, z = positions[i * 3 + 2] - mz;
    xx += x * x; xy += x * y; xz += x * z; yy += y * y; yz += y * z; zz += z * z;
  }
  // Power iteration: the covariance's dominant direction.
  let v = [1, 1, 1];
  for (let k = 0; k < 24; k++) {
    const w = [xx * v[0] + xy * v[1] + xz * v[2], xy * v[0] + yy * v[1] + yz * v[2], xz * v[0] + yz * v[1] + zz * v[2]];
    const len = Math.hypot(...w) || 1;
    v = w.map((q) => q / len);
  }
  return new THREE.Vector3(...v);
}

/** The material one structure of this tissue is drawn in. */
export function tissueMaterial(kind, colour, axis) {
  const look = LOOK[kind] || LOOK.bone;
  const { grain, freq, amp, bump, sheenColor, ...light } = look;
  const m = new THREE.MeshPhysicalMaterial({
    color: colour,
    metalness: 0,
    ...light,
    ...(sheenColor ? { sheenColor: new THREE.Color(sheenColor) } : {}),
    side: THREE.DoubleSide,
  });
  const u = {
    uAxis: { value: axis || new THREE.Vector3(0, 1, 0) },
    uFreq: { value: freq },
    uAmp: { value: amp },
    uBump: { value: bump },
    uGrain: { value: grain },
  };
  m.onBeforeCompile = (shader) => patch(shader, u);
  m.customProgramCacheKey = () => 'mp-tissue-1';
  return m;
}

/**
 * Soft studio light for reflections and clearcoat to pick up. The direct
 * lights stay as they were — even, so sutures and foramina are not lost in
 * shadow — and this only gives wet tissue something to shine with.
 */
export function studio(renderer, scene) {
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Neutral keeps hues where the plate convention put them; ACES would push
  // muscle towards orange and veins towards teal.
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.35;
  room.dispose?.();
  pmrem.dispose();
  return () => env.dispose();
}
