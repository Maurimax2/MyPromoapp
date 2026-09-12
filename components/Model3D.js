'use client';

// A model on screen: turn it, pinch it, tap a bone to be told its name.
//
// Geometry arrives as one file — positions, normals and indices laid out the
// way the GPU wants them — so nothing here parses anything. The buffer is
// sliced and handed over.
//
// Two things are deliberate. Bitmaps and buffers are freed on the way out,
// for the same reason the file viewer only keeps a window of drawn pages: a
// student moves between screens all day and a phone does not forgive a leak.
// And the device pixel ratio is capped, because a retina tablet asked for
// four times the pixels will render a skull at a slideshow.

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Icon from '@/components/Icon';
import { CREDIT } from '@/lib/anatomy/bundles';

const MAX_DPR = 2;
/** Unpainted bone. Everything that is not the answer to the question. */
const BONE = 0xe6e0d3;

export default function Model3D({ id, title }) {
  const host = useRef(null);
  const api = useRef(null);           // everything three.js owns
  const [parts, setParts] = useState([]);
  const [picked, setPicked] = useState(null);
  const [listing, setListing] = useState(false);
  const [plate, setPlate] = useState(false);   // every bone its own colour
  const [only, setOnly] = useState(false);     // the one you picked, by itself
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Selection is read by the scene and written by both the canvas and the
  // list, so it lives in a ref as well — the render loop must not close over
  // a stale one.
  const chosen = useRef(null);
  const all = useRef(false);
  const alone = useRef(false);
  useEffect(() => {
    chosen.current = picked;
    all.current = plate;
    alone.current = only;
    api.current?.paint();
  }, [picked, plate, only]);

  // Showing one bone by itself re-aims the camera at it, and putting the rest
  // back re-aims at the skull. Only on those two moves: re-framing every time
  // a bone is touched would throw away the zoom the student just set.
  const framed = useRef(null);
  useEffect(() => {
    const want = only && picked ? picked : null;
    if (framed.current === want) return;
    framed.current = want;
    api.current?.focusOn(want);
  }, [only, picked]);

  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;

    let dead = false;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));
    renderer.setSize(el.clientWidth, el.clientHeight, false);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 20);
    const group = new THREE.Group();
    scene.add(group);

    // Flat, even light. A dramatic key light looks better in a screenshot and
    // hides exactly the sutures and foramina somebody opened this to look at.
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b2c9, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(0.6, 1, 0.8);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.55);
    fill.position.set(-0.7, -0.2, -0.6);
    scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.rotateSpeed = 0.9;

    const meshes = [];
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // Nothing is ever made see-through. Ghosting the rest of the skull to
    // point at one bone turned the whole thing into an X-ray, and an X-ray of
    // twenty-two overlapping bones is not a picture of any of them. The bone
    // you touched takes its colour and the others stay bone.
    const paint = () => {
      for (const m of meshes) {
        const on = chosen.current === m.userData.id;
        m.visible = !(alone.current && chosen.current != null && !on);
        m.material.color.set(all.current || on ? m.userData.tint : BONE);
        // In the coloured plate every bone already has a colour of its own, so
        // the one you picked is lifted rather than recoloured.
        m.material.emissive.set(m.userData.tint);
        m.material.emissiveIntensity = on && all.current ? 0.45 : 0;
      }
      draw();
    };

    let frame = 0;
    const draw = () => {
      if (frame || dead) return;
      frame = requestAnimationFrame(() => { frame = 0; renderer.render(scene, camera); });
    };

    let live = true;
    const loop = () => {
      if (!live) return;
      requestAnimationFrame(loop);
      if (controls.update()) renderer.render(scene, camera);
    };

    // How far back the camera has to stand for the whole thing to be on
    // screen — worked out rather than guessed, because a guess that frames a
    // skull on a laptop crops it on a phone held upright. A portrait screen
    // is narrow, so it is the sideways angle of view that decides, and the
    // radius is the model's half-diagonal so that turning it never pushes a
    // corner off the edge.
    let wide = 1, tall = 1, drop = 0;
    const middle = new THREE.Vector3();
    // What the camera is framing: the whole skull, or the one bone left on
    // screen. Showing a bone by itself and leaving the camera where the whole
    // head was put a maxilla in the corner at the size of a stamp.
    let whole = null;
    const look = (box) => {
      const [lo, hi] = box;
      wide = Math.max(hi[0] - lo[0], hi[2] - lo[2]) / 2;
      tall = Math.max(hi[1] - lo[1], hi[2] - lo[2]) / 2;
      middle.set((lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2);
    };
    const MARGIN = 1.06;
    // The name of what you touched, and the credit under it, float over the
    // canvas. Framing against the whole canvas therefore puts the mandible
    // behind the card — so the model is fitted to, and centred in, what is
    // left above it.
    const RESERVE = 138;
    const place = () => {
      const h = Math.max(el.clientHeight, 1);
      const free = Math.max(h - RESERVE, h * 0.55);
      const up = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
      const across = up * camera.aspect;
      const d = Math.max(wide / across, (tall * h) / (up * free)) * MARGIN;
      drop = -((h - free) / 2) * ((2 * d * up) / h);
      return d;
    };
    const reframe = () => {
      const d = place();
      // The name of what you touched sits along the bottom, so the model is
      // drawn a little above the middle rather than under it.
      camera.position.set(middle.x, middle.y + drop, middle.z + d);
      controls.target.set(middle.x, middle.y + drop, middle.z);
      controls.minDistance = d * 0.35;
      controls.maxDistance = d * 2.2;
      controls.update();
      draw();
    };

    /** Frame one structure, or the whole model again when given nothing. */
    const focusOn = (id) => {
      const one = id && meshes.find((m) => m.userData.id === id);
      look(one ? one.userData.box : whole);
      reframe();
    };

    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Keep the distance the student chose; only re-frame what they have not
      // touched, so rotating a tablet does not undo a zoom.
      const grown = place() / MARGIN;
      controls.minDistance = grown * 0.35 * MARGIN;
      controls.maxDistance = grown * 2.2 * MARGIN;
      draw();
    };

    // A tap is a tap and a drag is a drag. Without this, letting go after
    // turning the skull selects whatever happened to be under your thumb.
    let down = null;
    const start = (e) => { down = { x: e.clientX, y: e.clientY, t: Date.now() }; };
    const end = (e) => {
      if (!down) return;
      const slid = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      const held = Date.now() - down.t;
      down = null;
      if (slid > 8 || held > 600) return;
      const box = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - box.left) / box.width) * 2 - 1;
      pointer.y = -((e.clientY - box.top) / box.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(meshes.filter((m) => m.visible), false)[0];
      setPicked(hit ? hit.object.userData.id : null);
      // Touching the background puts everything back: leaving the skull with
      // one bone in it and no way to tell why is worse than losing a choice.
      if (!hit) setOnly(false);
    };

    (async () => {
      try {
        const [meta, bin] = await Promise.all([
          fetch(`/anatomy/${id}.json`).then((r) => {
            if (!r.ok) throw new Error('manifest');
            return r.json();
          }),
          fetch(`/anatomy/${id}.bin`).then((r) => {
            if (!r.ok) throw new Error('geometry');
            return r.arrayBuffer();
          }),
        ]);
        if (dead) return;

        const [lo, hi] = meta.bounds;
        const mid = new THREE.Vector3(
          (lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2);

        for (const p of meta.parts) {
          const g = new THREE.BufferGeometry();
          g.setAttribute('position', new THREE.BufferAttribute(
            new Float32Array(bin, p.positions, p.vertexCount * 3), 3));
          g.setAttribute('normal', new THREE.BufferAttribute(
            new Int16Array(bin, p.normals, p.vertexCount * 3), 3, true));
          g.setIndex(new THREE.BufferAttribute(
            new Uint32Array(bin, p.indices, p.indexCount), 1));

          const mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
            color: BONE, roughness: 0.82, metalness: 0.02,
            side: THREE.DoubleSide,
          }));
          mesh.position.sub(mid);
          mesh.userData.id = p.id;
          mesh.userData.tint = new THREE.Color(p.tint);
          mesh.userData.box = p.bounds.map((v) => v.map((n, i) => n - mid.getComponent(i)));
          group.add(mesh);
          meshes.push(mesh);
        }

        // Turning it must not push it off the edge, but a sphere around the
        // whole thing is too careful: the skull is orbited sideways, so what
        // can arrive at the left and right is its width or its depth,
        // whichever is greater, and the same again for tilting it.
        whole = [lo, hi].map((v) => v.map((n, i) => n - mid.getComponent(i)));
        look(whole);

        setParts(meta.parts.map((p) => ({ id: p.id, name: p.name, tint: p.tint, fma: p.fma })));
        setLoading(false);
        api.current = { paint, focusOn, home: () => focusOn(null) };
        // Face-on and upright, the way it is drawn in every textbook.
        fit();
        reframe();
        loop();
      } catch {
        if (!dead) { setLoading(false); setError('تعذّر تحميل النموذج'); }
      }
    })();

    const watcher = new ResizeObserver(fit);
    watcher.observe(el);
    renderer.domElement.addEventListener('pointerdown', start);
    renderer.domElement.addEventListener('pointerup', end);

    return () => {
      dead = true; live = false;
      watcher.disconnect();
      renderer.domElement.removeEventListener('pointerdown', start);
      renderer.domElement.removeEventListener('pointerup', end);
      controls.dispose();
      for (const m of meshes) { m.geometry.dispose(); m.material.dispose(); }
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
  }, [id]);

  const name = parts.find((p) => p.id === picked)?.name || null;

  return (
    <div className="m3d">
      <div className="m3d-stage" ref={host} />

      {loading && <div className="m3d-msg">…</div>}
      {error && <div className="m3d-msg m3d-bad">{error}</div>}

      {!loading && !error && (
        <>
          <div className="m3d-acts">
            <button className={`icobtn${plate ? ' on' : ''}`}
              onClick={() => setPlate((v) => !v)} aria-label="تلوين كل العظام">
              <Icon name="palette" size={18} />
            </button>
            {/* Some of these are buried: the sphenoid and the vomer are behind
                everything else, and picking one out of the list would change
                nothing you can see without this. */}
            <button className={`icobtn${only ? ' on' : ''}`} disabled={!picked}
              onClick={() => setOnly((v) => !v)} aria-label="إظهار المحدَّد وحده">
              <Icon name="focus" size={18} />
            </button>
            <button className={`icobtn${listing ? ' on' : ''}`}
              onClick={() => setListing((v) => !v)} aria-label="القائمة">
              <Icon name="list" size={18} />
            </button>
            <button className="icobtn"
              onClick={() => { setOnly(false); api.current?.home(); }}
              aria-label="إعادة الضبط">
              <Icon name="rotate" size={18} />
            </button>
          </div>

          <div className="m3d-name">
            {name
              ? <span className="m3d-nm" dir="auto">{name}</span>
              : <span className="m3d-hint">أدر النموذج، والمس عظمًا لمعرفة اسمه</span>}
            {name && (
              <button className="m3d-clear"
                onClick={() => { setPicked(null); setOnly(false); }}
                aria-label="إلغاء التحديد">
                <Icon name="x" size={16} />
              </button>
            )}
          </div>

          {listing && (
            <div className="m3d-list">
              {parts.map((p) => (
                <button
                  key={p.id}
                  className={`m3d-row${picked === p.id ? ' on' : ''}`}
                  onClick={() => setPicked(picked === p.id ? null : p.id)}
                  dir="auto"
                >
                  {/* The list is the key to the coloured plate. Fourteen
                      colours on a skull say nothing without the names. */}
                  <span className="m3d-swatch" style={{ background: p.tint }} />
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <div className="m3d-credit" dir="auto">{CREDIT}</div>
    </div>
  );
}
