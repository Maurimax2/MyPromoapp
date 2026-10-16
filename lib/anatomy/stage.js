// The body's 3D stage: everything three.js owns for Body3D, kept out of React.
//
// Two things made the first viewer feel heavy on a phone, and both are fixed
// here rather than worked around:
//
// - Every structure was its own object: 3,700 meshes, each a draw call (two
//   when its system was see-through), each with its own matrix and culling.
//   A phone spent its frame talking to the GPU, not drawing. Now each system
//   is drawn as a few batches — one per tissue — so a whole dressed body is a
//   handful of draw calls. A structure is an instance in its batch: shown,
//   hidden and tinted there. A structure that must look different — picked,
//   asked in a quiz, followed — is lifted out of its batch and drawn on its
//   own for as long as it is different.
// - The camera jumped. A pinch moved the camera in steps towards the middle
//   of the body, not towards the fingers, and nothing eased. The controls are
//   camera-controls now: rotate, pinch and pan glide to rest, a pinch zooms
//   towards the fingers, a double tap brings what is under the finger to the
//   middle, and moving to a structure is a flight, not a cut.

import * as THREE from 'three';
import CameraControls from 'camera-controls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { tissueMaterial, studio, qualityTier, setDetail, CUT } from './material.js';
import { TINT, LOOK_OF, THIN } from './body.js';

CameraControls.install({ THREE });

const MAX_DPR = { high: 1.75, lite: 1.4 };

// A little light and shade per structure, so two muscles side by side read as
// two: one red for forty muscles was a wall. The same name always gets the
// same shade, on both sides.
const shade = (name, layer) => {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) h = Math.imul(h ^ name.charCodeAt(i), 16777619);
  const r = ((h >>> 0) % 1000) / 1000;
  const span = layer === 'muscles' ? 0.2 : layer === 'squelette' ? 0.07 : 0.12;
  return 1 - span / 2 + r * span;
};

/** A structure's geometry with the node's transform baked in: metres, floats. */
function bake(o) {
  const src = o.geometry;
  const pos = src.attributes.position, nor = src.attributes.normal;
  const n = pos.count;
  const p = new Float32Array(n * 3);
  const q = nor ? new Float32Array(n * 3) : null;
  const v = new THREE.Vector3();
  const nm = new THREE.Matrix3().getNormalMatrix(o.matrixWorld);
  for (let i = 0; i < n; i++) {
    v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld);
    p[i * 3] = v.x; p[i * 3 + 1] = v.y; p[i * 3 + 2] = v.z;
    if (q) {
      v.fromBufferAttribute(nor, i).applyMatrix3(nm).normalize();
      q[i * 3] = v.x; q[i * 3 + 1] = v.y; q[i * 3 + 2] = v.z;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  if (q) g.setAttribute('normal', new THREE.BufferAttribute(q, 3));
  if (src.index) g.setIndex(new THREE.BufferAttribute(n > 65535 ? Uint32Array.from(src.index.array) : Uint16Array.from(src.index.array), 1));
  if (!q) g.computeVertexNormals();
  g.computeBoundingBox();
  g.computeBoundingSphere();
  return g;
}

/**
 * @param el      the element the canvas fills
 * @param root    where the set's files are (/anatomy/body)
 * @param depth   systems from the inside out, for blending see-through ones
 * @param member  (item, layer) → whether a structure belongs to the lesson
 */
export function createStage(el, { root, depth, member }) {
  let dead = false;
  const tier = qualityTier();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR[tier]));
  renderer.setSize(el.clientWidth, el.clientHeight, false);
  setDetail(tier !== 'lite');
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const unstudio = studio(renderer, scene, tier);
  const lite = tier === 'lite';
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b2c9, lite ? 2.1 : 0.9));
  // The key light rides with the camera, a little above and to the side, so
  // whatever the student turns towards them is lit — a fixed light left the
  // back of a structure in the dark once it was turned round.
  const key = new THREE.DirectionalLight(0xffffff, lite ? 1.25 : 1.6);
  const fill = new THREE.DirectionalLight(0xffffff, lite ? 0.55 : 0.45);
  scene.add(key, key.target, fill, fill.target);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.005, 30);
  camera.position.set(0, 1, 4);
  const controls = new CameraControls(camera, renderer.domElement);
  controls.smoothTime = 0.2;
  controls.draggingSmoothTime = 0.06;
  controls.dollyToCursor = true;
  controls.minDistance = 0.03;
  controls.maxDistance = 6;
  controls.dollySpeed = 0.7;
  controls.azimuthRotateSpeed = 0.9;
  controls.polarRotateSpeed = 0.9;
  controls.restThreshold = 0.004;
  controls.mouseButtons.left = CameraControls.ACTION.ROTATE;
  controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
  controls.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
  controls.touches.one = CameraControls.ACTION.TOUCH_ROTATE;
  controls.touches.two = CameraControls.ACTION.TOUCH_DOLLY_TRUCK;
  controls.touches.three = CameraControls.ACTION.TOUCH_TRUCK;

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const materials = new Map();          // `${layer}|${kind}` → material
  const batches = [];                   // every batch, with userData { layer, kind, ids }
  const entries = new Map();            // id → { id, layer, item, g, batch, iid, member, vis, overlay }
  const overlays = new Set();
  // A see-through system is blended as ONE surface, not as every surface it
  // has: a depth-only twin of its batches draws first, so only its nearest
  // surface survives to be blended over what lies under it.
  // A see-through system is drawn in two passes: this one lays down the depth
  // of its nearest surface, pushed a hair back (the polygon offset), then the
  // colour pass draws only what is strictly in front of that, writing depth
  // as it goes — so each pixel is blended once, by the nearest surface. Without
  // the push and the strict test, two surfaces at the same depth both passed:
  // the auricle's overlapping patches, or a sheet stored with both windings,
  // fought pixel by pixel, and on a phone's GPU that flickered as it turned.
  const depthOnly = new THREE.MeshBasicMaterial({
    colorWrite: false, depthWrite: true, transparent: true, side: THREE.DoubleSide,
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 4,
  });

  const base = (layer, kind) => {
    const k = `${layer}|${kind}`;
    if (!materials.has(k)) {
      const m = tissueMaterial(LOOK_OF[kind] || kind, TINT[kind] || TINT.bone, null, tier);
      m.userData.layer = layer;
      // An attachment is a patch lying on the bone: pulled towards the eye
      // so the two surfaces do not flicker through each other.
      if (layer === 'insertions') { m.polygonOffset = true; m.polygonOffsetFactor = -2; m.polygonOffsetUnits = -4; }
      materials.set(k, m);
    }
    return materials.get(k);
  };

  // ---------------------------------------------------------- landmarks
  // The named points of a bone: small dots on its surface, sized to the
  // distance so they stay findable whether the bone fills the screen or not.
  const markGroup = new THREE.Group();
  scene.add(markGroup);
  const markGeo = new THREE.SphereGeometry(1, 14, 10);
  const markMat = new THREE.MeshBasicMaterial({ color: '#FFB020' });
  // The chosen one is never hidden behind a ridge of its own bone, and with
  // one chosen the others step back: seventy dots of one size are a rash.
  const markOnMat = new THREE.MeshBasicMaterial({ color: '#E8462E', depthTest: false });
  const markDimMat = new THREE.MeshBasicMaterial({ color: '#FFB020', transparent: true, opacity: 0.55 });
  let marks = [];
  const sizeMarks = () => {
    const r = Math.min(0.004, Math.max(0.0011, controls.distance * 0.0065));
    for (const m of marks) {
      const k = m.userData.on ? r * 1.7 : m.userData.dim ? r * 0.7 : r;
      m.scale.setScalar(k);
      m.position.copy(m.userData.at).addScaledVector(m.userData.out, k * 0.5);
    }
  };
  // The chosen point's name, printed beside it the way a plate labels a
  // feature, and moved with it whenever a frame is drawn.
  const tag = document.createElement('div');
  tag.className = 'bd-tag';
  tag.dir = 'ltr';
  tag.lang = 'fr';
  tag.hidden = true;
  el.appendChild(tag);
  let tagAt = null;
  const placeTag = () => {
    if (!tagAt) return;
    const v = tagAt.clone().project(camera);
    const off = v.z > 1 || Math.abs(v.x) > 1.2 || Math.abs(v.y) > 1.2;
    tag.hidden = off;
    if (off) return;
    const w = el.clientWidth;
    const x = (v.x + 1) / 2 * w, y = (1 - v.y) / 2 * el.clientHeight;
    // Beside the dot on whichever side has room; a name too long for either
    // goes above it, held inside the screen.
    const tw = tag.offsetWidth, gap = 14, edge = 8;
    let tx, ty = y - 12;
    if (x + gap + tw <= w - edge) tx = x + gap;
    else if (x - gap - tw >= edge) tx = x - gap - tw;
    else { tx = Math.min(w - edge - tw, Math.max(edge, x - tw / 2)); ty = y - 40; }
    tag.style.transform = `translate(${Math.round(tx)}px, ${Math.round(ty)}px)`;
  };
  const setTag = (p, text) => {
    tagAt = p ? new THREE.Vector3(...p) : null;
    tag.textContent = text || '';
    tag.hidden = !p;
    placeTag();
  };

  const setMarks = (list, active = null) => {
    for (const m of marks) markGroup.remove(m);
    marks = (list || []).map((it) => {
      const on = it.id === active, dim = !!active && !on;
      const m = new THREE.Mesh(markGeo, on ? markOnMat : dim ? markDimMat : markMat);
      m.userData = { mark: it.id, on, dim, at: new THREE.Vector3(...it.p), out: new THREE.Vector3(...(it.o || [0, 0, 1])) };
      m.renderOrder = on ? 999 : 50;
      markGroup.add(m);
      return m;
    });
    sizeMarks();
    draw();
  };

  // ------------------------------------------------------------ drawing
  let dirty = true;
  const draw = () => { dirty = true; };
  // The share of the canvas a sheet covers, and how far the picture has slid.
  // `insetTop` is what lies over the top of it (the region chips).
  let inset = 0, insetTop = 0, insetNow = 0;
  const applyInset = () => {
    const w = el.clientWidth, h = el.clientHeight;
    if (Math.abs(insetNow) < 0.001) { camera.clearViewOffset(); controls.setViewport(null); return; }
    camera.setViewOffset(w, h, 0, (insetNow / 2) * h, w, h);
    controls.setViewport(0, (insetNow / 2) * h, w, h);
  };
  const clock = new THREE.Clock();
  let live = true, last = 0, avg = 16, seen = 0, stage = 0, nearAt = 0;
  const loop = () => {
    if (!live) return;
    requestAnimationFrame(loop);
    const dt = clock.getDelta();
    const moved = controls.update(dt);
    const sliding = slide(dt);
    if (!moved && !dirty && !sliding) { last = 0; return; }
    dirty = false;
    // The near plane follows the distance, so a nerve seen from a centimetre
    // is not cut, and a body seen from two metres does not flicker. It stays
    // as far out as it can: depth precision is spent near the camera, and a
    // phone's depth buffer at d / 250 could not tell the skin of the auricle
    // from the bone a millimetre under it.
    const d = controls.distance;
    if (Math.abs(d - nearAt) > nearAt * 0.2) {
      nearAt = d;
      camera.near = Math.max(0.002, d / 80);
      camera.far = Math.max(5, d * 10);
      camera.updateProjectionMatrix();
    }
    if (marks.length) sizeMarks();
    key.position.copy(camera.position).add(new THREE.Vector3(0.3, 0.6, 0).applyQuaternion(camera.quaternion));
    key.target.position.copy(controls.getTarget(new THREE.Vector3()));
    fill.position.copy(camera.position).add(new THREE.Vector3(-0.8, -0.3, -0.4).applyQuaternion(camera.quaternion));
    fill.target.position.copy(key.target.position);
    renderer.render(scene, camera);
    placeTag();
    if (!moved) return;
    // The governor: a phone that cannot keep 30 frames a second while
    // turning is stepped down, never up.
    const now = performance.now();
    if (last && now - last < 250) {
      avg = avg * 0.9 + (now - last) * 0.1;
      if (++seen > 40 && avg > 34 && stage < 2) {
        stage += 1;
        if (stage === 1) {
          renderer.setPixelRatio(1);
          renderer.setSize(el.clientWidth, el.clientHeight, false);
          scene.environment = null;
        } else setDetail(false);
        avg = 16; seen = 0;
      }
    }
    last = now;
  };
  requestAnimationFrame(loop);

  const fit = () => {
    const w = el.clientWidth, h = el.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    applyInset();
    draw();
  };
  const watch = new ResizeObserver(fit);
  watch.observe(el);
  fit();

  // ------------------------------------------------------------- camera
  // Fills the screen with a box, looked at from `from` (or from where the
  // camera already is). A flight unless `cut`.
  // The last view framed, until a finger moves the camera: while it stands,
  // a sheet opening over the screen re-aims it for what is left.
  let lastFrame = null;
  controls.addEventListener('controlstart', () => { lastFrame = null; });
  // `pts`, when given, are the structure's own vertices: a femur seen at a
  // slant is a thin diagonal, and its box seen the same way is twice as big.
  const frame = (box, from = null, cut = false, pts = null) => {
    lastFrame = { box, from, pts, cut, at: performance.now() };
    const lo = new THREE.Vector3(...box[0]), hi = new THREE.Vector3(...box[1]);
    const centre = lo.clone().add(hi).multiplyScalar(0.5);
    const target = controls.getTarget(new THREE.Vector3());
    const dir = from ? new THREE.Vector3(...from).normalize()
      : camera.position.clone().sub(target).normalize();
    // Kept from where the camera is, but never from far above or below: a
    // femur asked for after the base of the skull is not looked at end on.
    if (!from && Math.abs(dir.y) > 0.6) {
      const flat = new THREE.Vector2(dir.x, dir.z);
      if (flat.lengthSq() < 1e-6) flat.set(0, 1);
      flat.normalize().multiplyScalar(0.8);
      dir.set(flat.x, Math.sign(dir.y) * 0.6, flat.y);
    }
    // A flight aimed again for a new sheet keeps its direction, not the one
    // it has reached halfway.
    lastFrame.from = dir.toArray();
    // The box as the camera will see it: its eight corners on the screen's
    // own axes, so a bone looked at from below is measured from below.
    const right = new THREE.Vector3(0, 1, 0).cross(dir);
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
    right.normalize();
    const up = dir.clone().cross(right).normalize();
    let halfW = 0, halfH = 0, front = 0;
    const v = new THREE.Vector3();
    const take = () => {
      v.sub(centre);
      halfW = Math.max(halfW, Math.abs(v.dot(right)));
      halfH = Math.max(halfH, Math.abs(v.dot(up)));
      front = Math.max(front, v.dot(dir));
    };
    if (pts) {
      // Centred on the middle of the outline, not of the box.
      let ax = Infinity, bx = -Infinity, ay = Infinity, by = -Infinity;
      const step = Math.max(3, Math.floor(pts.length / 3 / 3000) * 3);
      for (let i = 0; i < pts.length; i += step) {
        v.set(pts[i], pts[i + 1], pts[i + 2]).sub(centre);
        const x = v.dot(right), y = v.dot(up);
        ax = Math.min(ax, x); bx = Math.max(bx, x); ay = Math.min(ay, y); by = Math.max(by, y);
      }
      centre.addScaledVector(right, (ax + bx) / 2).addScaledVector(up, (ay + by) / 2);
      for (let i = 0; i < pts.length; i += step) { v.set(pts[i], pts[i + 1], pts[i + 2]); take(); }
    } else {
      for (let i = 0; i < 8; i++) { v.set(i & 1 ? hi.x : lo.x, i & 2 ? hi.y : lo.y, i & 4 ? hi.z : lo.z); take(); }
    }
    // Into the part of the screen the sheet leaves free.
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const free = Math.max(0.38, 1 - inset - insetTop);
    const fit = Math.max(halfH / free, halfW / camera.aspect, 0.015) / tan;
    const dist = fit * 1.12 + front;
    const pos = centre.clone().addScaledVector(dir, dist);
    controls.setLookAt(pos.x, pos.y, pos.z, centre.x, centre.y, centre.z, !cut);
    draw();
  };

  // ------------------------------------------------------------ loading
  const load = async (layer) => {
    const [gltf, man] = await Promise.all([
      loader.loadAsync(`${root}/${layer}.glb`),
      fetch(`${root}/${layer}.json`).then((r) => { if (!r.ok) throw new Error(layer); return r.json(); }),
    ]);
    if (dead) return [];
    const by = new Map(man.items.map((i) => [i.id, i]));
    gltf.scene.updateMatrixWorld(true);
    const byKind = new Map();
    gltf.scene.traverse((o) => {
      if (!o.isMesh) return;
      const item = by.get(o.parent?.name) || by.get(o.name);
      if (!item) return;
      const g = bake(o);
      o.geometry.dispose();
      const e = { id: item.id, layer, item, g, member: member(item, layer), vis: true, overlay: null };
      if (!byKind.has(item.k)) byKind.set(item.k, []);
      byKind.get(item.k).push(e);
    });
    for (const [kind, list] of byKind) {
      let vc = 0, ic = 0;
      for (const e of list) { vc += e.g.attributes.position.count; ic += e.g.index ? e.g.index.count : 0; }
      const batch = new THREE.BatchedMesh(list.length, vc, Math.max(ic, 3), base(layer, kind));
      batch.sortObjects = false;
      batch.userData = { layer, kind, ids: [], list };
      const tint = new THREE.Color();
      for (const e of list) {
        const gid = batch.addGeometry(e.g);
        e.iid = batch.addInstance(gid);
        e.batch = batch;
        batch.userData.ids[e.iid] = e.id;
        const s = shade(e.item.n, layer);
        batch.setColorAt(e.iid, tint.setRGB(s, s, s));
        entries.set(e.id, e);
      }
      batches.push(batch);
      scene.add(batch);
    }
    draw();
    return man.items;
  };

  // A see-through system's depth-only twin, made the first time it is needed.
  const twinOf = (batch) => {
    if (batch.userData.twin) return batch.userData.twin;
    const { list } = batch.userData;
    let vc = 0, ic = 0;
    for (const e of list) { vc += e.g.attributes.position.count; ic += e.g.index ? e.g.index.count : 0; }
    const twin = new THREE.BatchedMesh(list.length, vc, Math.max(ic, 3), depthOnly);
    twin.sortObjects = false;
    for (const e of list) {
      const iid = twin.addInstance(twin.addGeometry(e.g));
      twin.setVisibleAt(iid, e.vis);
    }
    twin.raycast = () => {};
    batch.userData.twin = twin;
    scene.add(twin);
    return twin;
  };

  // ----------------------------------------------------------- painting
  // Everything that depends on what the student chose, in one place, run
  // after every choice.
  const unlay = (o) => {
    scene.remove(o);
    o.material.dispose();
    for (const c of o.children) c.material.dispose();
    overlays.delete(o);
  };
  const paint = (s) => {
    // While insertions are being read, the muscles are thinned: the
    // attachment is on the bone, under them.
    const seeOf = (layer) => {
      const see = s.layers[layer]?.see ?? 1;
      return s.ins && layer === 'muscles' ? Math.min(see, 0.2) : see;
    };
    for (const m of materials.values()) {
      const see = seeOf(m.userData.layer);
      const clear = see < 0.995;
      if (m.transparent !== clear) { m.transparent = clear; m.needsUpdate = true; }
      m.opacity = see;
      m.depthWrite = true;
      m.depthFunc = clear ? THREE.LessDepth : THREE.LessEqualDepth;
    }
    for (const b of batches) {
      const { layer } = b.userData;
      const clear = seeOf(layer) < 0.995;
      const d = depth.indexOf(layer);
      b.renderOrder = clear ? 101 + 2 * d : 0;
      // A fixed order: sorted by distance, which of two coincident surfaces
      // drew first changed as the model turned, and the skin shimmered.
      b.sortObjects = false;
      if (clear) twinOf(b);
      if (b.userData.twin) { b.userData.twin.visible = clear; b.userData.twin.renderOrder = 100 + 2 * d; }
    }
    const off = new Set(s.hidden);
    const pickedItem = s.picked ? entries.get(s.picked)?.item : null;
    for (const e of entries.values()) {
      const { id, layer, item } = e;
      const Ls = s.layers[layer];
      let show = !!Ls?.on && !off.has(id) && (s.whole || e.member);
      if (layer === 'insertions' && s.ins) show = s.ins.has(id);
      if (s.alone && pickedItem) show = item.n === pickedItem.n || (layer === 'insertions' && !!s.ins?.has(id));
      const want = show ? (s.marks.get(id) || (id === s.picked ? (s.follow ? 'follow' : 'pick') : null)) : null;
      const inBatch = show && !want;
      if (e.vis !== inBatch) {
        e.vis = inBatch;
        e.batch.setVisibleAt(e.iid, inBatch);
        e.batch.userData.twin?.setVisibleAt(e.iid, inBatch);
      }
      if (!want) {
        if (e.overlay) { unlay(e.overlay); e.overlay = null; }
        continue;
      }
      if (e.overlay && e.overlay.userData.want === want) continue;
      if (e.overlay) unlay(e.overlay);
      const m = base(layer, item.k).clone();
      // A pick glows in its own colour; the quiz says right in green and
      // wrong in red; a followed structure is drawn over everything.
      const glow = want === 'right' ? '#2E9E5B' : want === 'wrong' ? '#D23B2E' : want === 'ask' ? '#FFB020' : null;
      if (glow) m.color = new THREE.Color(glow);
      m.emissive = new THREE.Color(glow || TINT[item.k] || '#ffffff');
      m.emissiveIntensity = glow ? 0.55 : 0.4;
      m.opacity = 1; m.transparent = want === 'follow' || want === 'ask'; m.depthWrite = true;
      const o = new THREE.Mesh(e.g, m);
      o.userData = { id, layer, want };
      if (want === 'follow' || want === 'ask') { m.depthTest = false; o.renderOrder = 999; }
      // What is picked shows through whatever covers it, faintly and only
      // where it is covered (a second pass drawn where something is in
      // front): a femur found by name under the thigh is still found, and
      // nothing around it has been made see-through.
      if (want === 'pick') {
        const xm = new THREE.MeshBasicMaterial({
          color: new THREE.Color(TINT[item.k] || '#FFC56B'), transparent: true, opacity: 0.32,
          depthWrite: false, depthFunc: THREE.GreaterDepth,
        });
        const x = new THREE.Mesh(e.g, xm);
        x.renderOrder = 1000;
        x.raycast = () => {};
        o.add(x);
      }
      e.overlay = o;
      overlays.add(o);
      scene.add(o);
    }
    draw();
  };

  // ---------------------------------------------------------------- the cut
  // One plane through everything — sagittal, frontal or horizontal — keeping
  // the side `flip` says: by default what lies behind it, below it, or to the
  // right of it, so the cut face is towards a camera in front, above or on
  // the left. `at` is where along the axis, in metres.
  const cutPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
  let cutOn = false;
  const AXES = { x: [-1, 0, 0], y: [0, -1, 0], z: [0, 0, -1] };
  const setCut = (cut) => {
    if (!cut) {
      if (cutOn) { renderer.clippingPlanes = []; CUT.value = 0; cutOn = false; draw(); }
      return;
    }
    const n = AXES[cut.axis], k = cut.flip ? -1 : 1;
    cutPlane.normal.set(n[0] * k, n[1] * k, n[2] * k);
    cutPlane.constant = cut.at * k;
    if (!cutOn) { renderer.clippingPlanes = [cutPlane]; CUT.value = 1; cutOn = true; }
    draw();
  };
  // A horizontal cut slid up the body takes the camera with it, so the
  // section stays where it is on the screen: only the height changes.
  const followHeight = (y) => {
    const t = controls.getTarget(new THREE.Vector3());
    if (Math.abs(t.y - y) < 0.002) return;
    lastFrame = null;
    controls.moveTo(t.x, y, t.z, true);
    draw();
  };
  // What the plane passes through — every structure on screen with geometry
  // on both sides of it: what a section at this level shows, to be named.
  const cutThrough = () => {
    if (!cutOn) return [];
    const out = [];
    const corner = new THREE.Vector3();
    const { normal: n, constant: c } = cutPlane;
    for (const e of entries.values()) {
      if (!e.vis && !e.overlay) continue;
      const b = e.g.boundingBox;
      let lo = Infinity, hi = -Infinity;
      for (let i = 0; i < 8; i++) {
        corner.set(i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z);
        const d = cutPlane.distanceToPoint(corner);
        lo = Math.min(lo, d); hi = Math.max(hi, d);
      }
      if (lo > 0 || hi < 0) continue;
      // The box straddles the plane; an oblique muscle's box can without the
      // muscle doing so, so its vertices are asked.
      const p = e.g.attributes.position.array;
      const step = Math.max(3, Math.floor(p.length / 3 / 800) * 3);
      let above = false, below = false;
      for (let i = 0; i < p.length && !(above && below); i += step) {
        if (n.x * p[i] + n.y * p[i + 1] + n.z * p[i + 2] + c >= 0) above = true; else below = true;
      }
      if (above && below) out.push(e.id);
    }
    return out;
  };

  // ------------------------------------------------------------ picking
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pickables = () => [...batches, ...overlays];
  const castAt = (x, y, rect) => {
    pointer.x = ((x - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((y - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables(), false);
    // What the cut took away cannot be touched.
    return cutOn ? hits.filter((h) => cutPlane.distanceToPoint(h.point) >= 0) : hits;
  };
  const idOf = (h) => (h.object.isBatchedMesh ? h.object.userData.ids[h.batchId] : h.object.userData.id);
  // A faint system is looked through, not touched: a tap on a ghosted
  // muscle reaches the nerve under it.
  let solidEnough = () => true;
  const firstSolid = (hits) => hits.find((h) => solidEnough(h.object.userData.layer));
  const hitAt = (x, y) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const direct = firstSolid(castAt(x, y, rect));
    if (direct) return { id: idOf(direct), point: direct.point };
    let best = null;
    for (const r of [10, 20, 30]) {
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2;
        const hit = firstSolid(castAt(x + Math.cos(a) * r, y + Math.sin(a) * r, rect));
        if (!hit) continue;
        const thin = THIN.has(hit.object.userData.layer);
        const score = r + (thin ? 0 : 40);
        if (!best || score < best.score) best = { hit, score };
      }
      if (best && best.score < 40) break;
    }
    return best ? { id: idOf(best.hit), point: best.hit.point } : null;
  };

  // A tap is not a drag; two taps close together bring what is under the
  // finger to the middle of the screen, and the turning goes round it.
  let onTap = () => {};
  let onMark = () => {};
  // A dot is found on the screen, not by a ray: a 3 mm sphere is too small a
  // target for a thumb, so the nearest dot within 26 px of the tap wins.
  const markAt = (x, y) => {
    if (!marks.length) return null;
    const rect = renderer.domElement.getBoundingClientRect();
    const v = new THREE.Vector3();
    let best = null, bd = 26;
    for (const m of marks) {
      v.copy(m.position).project(camera);
      if (v.z > 1) continue;
      const px = rect.left + (v.x + 1) / 2 * rect.width, py = rect.top + (1 - v.y) / 2 * rect.height;
      const d = Math.hypot(px - x, py - y);
      if (d < bd) { bd = d; best = m.userData.mark; }
    }
    return best;
  };
  let down = null, lastTap = null;
  const startTap = (e) => { down = { x: e.clientX, y: e.clientY, t: Date.now() }; };
  const endTap = (e) => {
    if (!down) return;
    const slid = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    const held = Date.now() - down.t;
    down = null;
    if (slid > 8 || held > 600) return;
    const now = Date.now();
    if (lastTap && now - lastTap.t < 320 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30) {
      lastTap = null;
      const h = hitAt(e.clientX, e.clientY);
      if (h) {
        lastFrame = null;
        controls.moveTo(h.point.x, h.point.y, h.point.z, true);
        controls.dolly(controls.distance * 0.35, true);
      }
      return;
    }
    lastTap = { x: e.clientX, y: e.clientY, t: now };
    const mark = markAt(e.clientX, e.clientY);
    if (mark) { onMark(mark); return; }
    onTap(hitAt(e.clientX, e.clientY)?.id || null);
  };
  renderer.domElement.addEventListener('pointerdown', startTap);
  renderer.domElement.addEventListener('pointerup', endTap);

  // A sheet over the bottom of the canvas — a card, the quiz, a panel — takes
  // that part of the screen away, so the view slides up to sit in what is
  // left instead of hiding behind it. `f` is the share of the canvas covered.
  //
  // It is a shift of the picture, not of the camera (a view offset): moving
  // the camera by so many centimetres held only at the distance it was worked
  // out at, and a flight from the whole body to a foramen left the bone half
  // a metre off the screen. The controls are told the same, so a pinch still
  // zooms to where the fingers are.
  const slide = (dt) => {
    const goal = inset - insetTop;
    if (Math.abs(goal - insetNow) <= 0.002) return false;
    insetNow += (goal - insetNow) * Math.min(1, dt * 9);
    if (Math.abs(goal - insetNow) <= 0.002) insetNow = goal;
    applyInset();
    return true;
  };
  const setInset = (f, top = 0) => {
    if (Math.abs(f - inset) < 0.02 && Math.abs(top - insetTop) < 0.01) return;
    inset = f; insetTop = top;
    // A view framed for the screen as it was is aimed again for what the
    // sheet now leaves — unless a finger has moved it since.
    // The opening view is not a flight, and neither is its first adjustment.
    const cut = !!lastFrame?.cut && performance.now() - lastFrame.at < 1500;
    if (cut) { insetNow = inset - insetTop; applyInset(); }
    if (lastFrame) frame(lastFrame.box, lastFrame.from, cut, lastFrame.pts);
    draw();
  };

  // Fills what the sheets leave with one structure, by its own outline.
  const frameId = (id, from = null) => {
    const e = entries.get(id);
    if (!e) return;
    const b = e.g.boundingBox;
    frame([b.min.toArray(), b.max.toArray()], from, false, e.g.attributes.position.array);
  };
  const boxOf = (id) => {
    const e = entries.get(id);
    if (!e) return null;
    const b = e.g.boundingBox;
    return [b.min.toArray(), b.max.toArray()];
  };

  return {
    load, paint, frame, frameId, boxOf, setInset, setMarks, setCut, cutThrough, followHeight,
    setMarkTap: (fn) => { onMark = fn; },
    // Flies to a point, close enough to read the bone around it.
    // From `out`, the way the feature faces, when it is known: the foramen
    // ovale is looked at from under the skull. Never from straight above or
    // below, where the turntable flips over.
    focusPoint: (p, r = 0.025, out = null) => {
      let from = null;
      if (out) {
        const cur = camera.position.clone().sub(controls.getTarget(new THREE.Vector3())).normalize();
        const d = new THREE.Vector3(...out).normalize().multiplyScalar(0.8).addScaledVector(cur, 0.2).normalize();
        if (Math.abs(d.y) > 0.9) {
          const flat = new THREE.Vector2(d.x, d.z);
          if (flat.length() < 1e-3) flat.set(cur.x, cur.z);
          if (flat.length() < 1e-3) flat.set(0, 1);
          flat.normalize().multiplyScalar(Math.sqrt(1 - 0.81));
          d.set(flat.x, Math.sign(d.y) * 0.9, flat.y);
        }
        from = d.toArray();
      }
      frame([p.map((v) => v - r), p.map((v) => v + r)], from);
    },
    setTag,
    has: (id) => entries.has(id),
    setTap: (fn) => { onTap = fn; },
    setSolid: (fn) => { solidEnough = fn; },
    stats: () => ({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, batches: batches.length }),
    debug: () => ({ dirty, frames: renderer.info.render.frame, active: controls.active, inset: inset - insetTop, insetNow, cam: camera.position.toArray(), target: controls.getTarget(new THREE.Vector3()).toArray(), near: camera.near, far: camera.far, vis: [...entries.values()].filter((e) => e.vis).length, marks: marks.length, tag: tag.hidden ? null : tag.style.transform }),
    dead: () => dead,
    dispose: () => {
      dead = true; live = false;
      watch.disconnect();
      renderer.domElement.removeEventListener('pointerdown', startTap);
      renderer.domElement.removeEventListener('pointerup', endTap);
      controls.dispose();
      for (const b of batches) { b.dispose(); b.userData.twin?.dispose(); }
      for (const e of entries.values()) e.g.dispose();
      for (const m of materials.values()) m.dispose();
      for (const o of overlays) o.material.dispose();
      depthOnly.dispose();
      markGeo.dispose(); markMat.dispose(); markOnMat.dispose();
      unstudio();
      renderer.dispose();
      renderer.domElement.remove();
      tag.remove();
    },
  };
}
