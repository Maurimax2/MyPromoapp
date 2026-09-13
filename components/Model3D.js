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
import { CREDIT, boneOf } from '@/lib/anatomy/bundles';
import { noteFor, SECTIONS } from '@/lib/anatomy/notes';

const MAX_DPR = 2;
/** Unpainted bone. Everything that is not the answer to the question. */
const BONE = 0xe6e0d3;

export default function Model3D({ id, title, hidden = [], facing = null, credit = CREDIT }) {
  const host = useRef(null);
  const api = useRef(null);           // everything three.js owns
  const [parts, setParts] = useState([]);
  const [picked, setPicked] = useState(null);
  const [listing, setListing] = useState(false);
  const [plate, setPlate] = useState(false);   // every bone its own colour
  const [only, setOnly] = useState(false);     // the one you picked, by itself
  const [points, setPoints] = useState([]);    // the named places on the bones
  const [pins, setPins] = useState(false);     // …named on screen or not
  const [pin, setPin] = useState(null);        // …and which one is being read
  const [gone, setGone] = useState([]);        // bones taken off to see behind
  const [open, setOpen] = useState(false);     // the description, read or not
  const [sub, setSub] = useState(null);        // which part of the bone
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Selection is read by the scene and written by both the canvas and the
  // list, so it lives in a ref as well — the render loop must not close over
  // a stale one.
  const chosen = useRef(null);
  const all = useRef(false);
  const alone = useRef(false);
  const showing = useRef(false);
  const reading = useRef(null);
  const off = useRef(new Set());
  const piece = useRef(null);
  useEffect(() => {
    chosen.current = picked;
    all.current = plate;
    alone.current = only;
    // …and never while the list is open: the labels floated over its rows and
    // made the one screen that is pure text unreadable.
    showing.current = pins && !listing && !open;
    off.current = new Set(gone);
    piece.current = sub;
    reading.current = pin;
    api.current?.paint();
  }, [picked, plate, only, pins, pin, listing, gone, open, sub]);

  // Showing one bone by itself re-aims the camera at it, and putting the rest
  // back re-aims at the skull. Only on those two moves: re-framing every time
  // a bone is touched would throw away the zoom the student just set.
  const framed = useRef(null);
  useEffect(() => { setOpen(false); }, [picked, pin]);

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

    // The named places on the bones. They are not geometry — a foramen is a
    // hole and a process is a bump, and the atlas has no separate piece for
    // either — so each one is a point on the surface with a label over it,
    // drawn as ordinary HTML above the canvas rather than as something in the
    // scene. That way the text is our own font at our own size and stays
    // crisp, and tapping one is a button press rather than a ray cast.
    const marks = [];
    let dots = [], tags = [], rules = [];
    const flat = new THREE.Vector3();
    const away = new THREE.Vector3();

    // How a plate in a book does it: the name sits in a column down the side
    // and a line runs from it to the place it names. Thirty names printed
    // where they land would cover the skull and each other.
    const COLUMN = 210;   // how wide a name is allowed to be
    const PITCH = 32;     // …and how much room one takes, wrapped to two lines
    const EDGE = 8;
    const PARKED = 'translate(-9999px, -9999px)';
    const GUTTER = 56;    // the column of buttons, which nothing may sit under

    const stack = (list, top, bottom) => {
      // Each name wants to be level with its own point and has to give way to
      // the one above it. Pushed down first, then squeezed back up if the run
      // has fallen off the bottom.
      let y = top;
      for (const s of list) { s.ly = Math.max(s.y, y); y = s.ly + PITCH; }
      if (y - PITCH > bottom) {
        let cur = bottom;
        for (let k = list.length - 1; k >= 0; k--) {
          // Clamped at the top as well: without it a long run pushed the first
          // few names up off the canvas and into the header.
          list[k].ly = Math.max(top, Math.min(list[k].ly, cur));
          cur = list[k].ly - PITCH;
        }
      }
    };

    const movePins = () => {
      if (!marks.length) return;
      if (dots.length !== marks.length) {
        const host = el.parentElement;
        dots = [...host.querySelectorAll('.m3d-pin')];
        tags = [...host.querySelectorAll('.m3d-tag')];
        rules = [...host.querySelectorAll('.m3d-rule')];
        if (dots.length !== marks.length || tags.length !== marks.length) return;
      }
      const w = el.clientWidth, h = el.clientHeight;
      const on = showing.current;
      // With one bone chosen, only that bone is named. Seventeen names at once
      // is a wall of text; the same screen with a bone picked is a plate.
      const just = chosen.current;

      const seen = [];
      marks.forEach((mark, i) => {
        // Parked as well as hidden: a name that is hidden without being moved
        // will show at the top corner of the canvas the moment anything else
        // makes it visible again.
        dots[i].hidden = true;
        tags[i].hidden = true;
        tags[i].style.transform = PARKED;
        // All four ends, not just one: a line with a fresh start and a stale
        // finish is still a line, and sixteen of them fan across the screen.
        const line = rules[i];
        line.setAttribute('x1', -99); line.setAttribute('y1', -99);
        line.setAttribute('x2', -99); line.setAttribute('y2', -99);
        if (!on || !mark.mesh.visible) return;
        if (just && mark.mesh.userData.id !== just) return;
        // A name on the far side of the head would otherwise be drawn through
        // the bone. Normalised, because the unnormalised version scaled the
        // test by how far away the camera was and hid two thirds of them.
        away.copy(mark.at).sub(camera.position).normalize();
        if (away.dot(mark.out) > 0.15) return;
        flat.copy(mark.at).project(camera);
        const x = (flat.x * 0.5 + 0.5) * w;
        const y = (-flat.y * 0.5 + 0.5) * h;
        if (flat.z > 1 || x < 0 || y < 0 || x > w || y > h) return;
        seen.push({ i, x, y });
      });

      // The buttons run down one side, so the names on that side start after
      // them rather than underneath them.
      const near = GUTTER + EDGE;
      const side = Math.min(COLUMN, Math.max((w - near - EDGE * 2) * 0.42, 116));
      const left = seen.filter((s) => s.x < w / 2).sort((a, b) => a.y - b.y);
      const right = seen.filter((s) => s.x >= w / 2).sort((a, b) => a.y - b.y);
      // The bottom of the column is above the name card, not the bottom of the
      // canvas: a long run of names ran on underneath it and the last two were
      // unreadable.
      const floor = h - RESERVE + PITCH / 2;
      stack(left, EDGE + PITCH / 2, floor);
      stack(right, EDGE + PITCH / 2, floor);

      for (const s of seen) {
        const at = s.x < w / 2 ? 'left' : 'right';
        const from = at === 'left' ? near : w - EDGE - side;
        const edge = at === 'left' ? near + side : w - EDGE - side;
        dots[s.i].hidden = false;
        dots[s.i].style.transform = `translate(-50%, -50%) translate(${s.x}px, ${s.y}px)`;
        const tag = tags[s.i];
        tag.hidden = false;
        tag.dataset.at = at;
        tag.style.width = `${side}px`;
        tag.style.transform = `translate(${from}px, ${s.ly - PITCH / 2}px)`;
        const line = rules[s.i];
        line.setAttribute('x1', edge); line.setAttribute('y1', s.ly);
        line.setAttribute('x2', s.x); line.setAttribute('y2', s.y);
      }
    };

    // Nothing is ever made see-through. Ghosting the rest of the skull to
    // point at one bone turned the whole thing into an X-ray, and an X-ray of
    // twenty-two overlapping bones is not a picture of any of them. The bone
    // you touched takes its colour and the others stay bone.
    const paint = () => {
      for (const m of meshes) {
        const on = chosen.current === m.userData.id;
        // A bone can be taken off to see what is behind it — the parietal over
        // the temporal, the mandible over the base of the skull. The one you
        // are looking at stays whatever else is hidden.
        const away = off.current.has(m.userData.id) && !on;
        m.visible = !away && !(alone.current && chosen.current != null && !on);

        // Colour means the same thing at both levels. With no bone chosen it
        // separates the bones; with one chosen it separates that bone's parts,
        // which is how the squama, the rocher and the mastoïde are told apart
        // on a bone the atlas drew as one piece.
        const bits = m.userData.groups;
        const split = on && all.current && bits;
        const coats = Array.isArray(m.material) ? m.material : [m.material];
        coats.forEach((coat, g) => {
          coat.color.set(split ? bits[g].tint : (all.current || on ? m.userData.tint : BONE));
          // In the coloured plate everything already has a colour of its own,
          // so what you picked is lifted rather than recoloured.
          coat.emissive.set(split ? bits[g].tint : m.userData.tint);
          const lifted = split ? bits[g].name === piece.current : on && all.current;
          coat.emissiveIntensity = lifted ? 0.45 : 0;
        });
      }
      movePins();
      draw();
    };

    let frame = 0;
    const draw = () => {
      if (frame || dead) return;
      frame = requestAnimationFrame(() => {
        frame = 0; renderer.render(scene, camera); movePins();
      });
    };

    let live = true;
    const loop = () => {
      if (!live) return;
      requestAnimationFrame(loop);
      if (controls.update()) { renderer.render(scene, camera); movePins(); }
      // React draws the labels a tick after the geometry arrives, so the first
      // placement has nothing to place. Without this they stay where they were
      // born — the corner of the screen — until the first drag.
      else if (dots.length !== marks.length) movePins();
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
    // Which way a model opens. Face-on is right for a skull, which is how
    // every textbook draws one; a brain is drawn from the side, and opening a
    // brain on its frontal poles shows the one view that says least. A bundle
    // may say which way to look from; the default is straight at the front.
    const from = new THREE.Vector3(...(facing || [0, 0, 1])).normalize();
    const reframe = () => {
      const d = place();
      // The name of what you touched sits along the bottom, so the model is
      // drawn a little above the middle rather than under it.
      camera.position.set(middle.x, middle.y + drop, middle.z).addScaledVector(from, d);
      controls.target.set(middle.x, middle.y + drop, middle.z);
      controls.minDistance = d * 0.35;
      controls.maxDistance = d * 2.2;
      controls.update();
      draw();
    };

    /**
     * Turn the skull so a landmark is facing you.
     *
     * Half of them are underneath or behind — the foramen magnum is on the
     * base and the occipital protuberance is at the back — so choosing one
     * from the list and being left looking at the face is choosing nothing.
     */
    const faceTo = (i) => {
      const mark = marks[i];
      if (!mark) return;
      const d = camera.position.distanceTo(controls.target);
      // Nudged off the vertical: straight underneath is the one place an
      // orbit has no sideways left, and the view snaps as soon as you drag.
      const from = mark.out.clone();
      if (Math.abs(from.y) > 0.94) from.z += from.y > 0 ? -0.3 : 0.3;
      camera.position.copy(controls.target).addScaledVector(from.normalize(), d);
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
      // …and which part of it, on a bone that has been divided. One tap gives
      // both: the temporal, and the mastoid you actually touched.
      // Which group was hit comes from the renderer, not from arithmetic on
      // the face number: it knows which draw group it was walking, and working
      // it out here named the wrong part of the bone.
      const bits = hit?.object.userData.groups;
      const which = hit?.face?.materialIndex;
      setSub(bits && which != null ? bits[which]?.name || null : null);
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
        // Landmarks are a separate small file and a model is allowed to have
        // none: a bundle with no names on it yet still draws.
        const named = await fetch(`/anatomy/${id}.points.json`)
          .then((r) => (r.ok ? r.json() : { points: [] }))
          .catch(() => ({ points: [] }));
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

          const coat = () => new THREE.MeshStandardMaterial({
            color: BONE, roughness: 0.82, metalness: 0.02,
            side: THREE.DoubleSide,
          });
          // One draw group per part, so a bone can be coloured by its parts
          // without the geometry being cut into separate objects.
          if (p.groups) {
            p.groups.forEach((q, gi) => g.addGroup(q.start, q.count, gi));
          }
          const mesh = new THREE.Mesh(g,
            p.groups ? p.groups.map(coat) : coat());
          mesh.position.sub(mid);
          mesh.userData.id = p.id;
          mesh.userData.tint = new THREE.Color(p.tint);
          mesh.userData.box = p.bounds.map((v) => v.map((n, i) => n - mid.getComponent(i)));
          mesh.userData.groups = p.groups || null;
          group.add(mesh);
          meshes.push(mesh);
        }

        // Turning it must not push it off the edge, but a sphere around the
        // whole thing is too careful: the skull is orbited sideways, so what
        // can arrive at the left and right is its width or its depth,
        // whichever is greater, and the same again for tilting it.
        // A model may say which box to open on: a nerve that runs the length
        // of the body is still part of the model, but it is not what the
        // screen is for.
        const [flo, fhi] = meta.frame || meta.bounds;
        whole = [flo, fhi].map((v) => v.map((n, i) => n - mid.getComponent(i)));
        look(whole);

        const byPart = new Map(meshes.map((m) => [m.userData.id, m]));
        for (const q of named.points || []) {
          const mesh = byPart.get(q.part);
          if (!mesh) continue;
          marks.push({
            name: q.name,
            mesh,
            at: new THREE.Vector3(...q.at).sub(mid),
            out: new THREE.Vector3(...q.out),
          });
        }
        setPoints(marks.map((m, i) => ({ i, name: m.name })));

        setParts(meta.parts.map((p) => ({
          id: p.id, name: p.name, tint: p.tint, fma: p.fma, groups: p.groups || null,
        })));
        // A model may start with something taken off — the platysma over the
        // neck. It is in the list like any other, marked off, one tap back.
        if (hidden.length) {
          const away = new Set(hidden);
          setGone(meta.parts.filter((p) => away.has(boneOf(p.name))).map((p) => p.id));
        }
        setLoading(false);
        api.current = { paint, focusOn, faceTo, home: () => focusOn(null) };
        // Upright, and facing the way this model asks to be opened.
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
      for (const m of meshes) {
        m.geometry.dispose();
        for (const c of [m.material].flat()) c.dispose();
      }
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
  }, [id]);

  // The card along the bottom says one thing at a time: the landmark you
  // touched, or the bone. A landmark is the finer answer so it wins.
  const spot = pin != null ? points.find((q) => q.i === pin)?.name : null;
  const bone = parts.find((p) => p.id === picked)?.name || null;
  const name = spot || bone;
  const bits = (picked && parts.find((p) => p.id === picked)?.groups) || [];
  const clear = () => {
    setPin(null); setPicked(null); setSub(null); setOnly(false); setOpen(false);
  };

  // What the thing you touched actually is. This is the reason a model is
  // worth opening at all: the name alone is a picture, and what is revised is
  // the parts, the attachments and what runs through it.
  // A part's description lives on its bone: touching the mastoïde opens what
  // is written about the temporal, which is where its parts are listed.
  const note = (spot || bone) ? noteFor(id, spot || bone) : null;

  return (
    <div className="m3d">
      <div className="m3d-stage" ref={host} />

      {/* Positioned from the render loop, not from React: these move with
          every frame of a drag and re-rendering thirty nodes at sixty hertz
          is how a phone starts dropping frames. */}
      <svg className="m3d-lines" aria-hidden="true">
        {points.map((q) => (
          <line key={q.i} className="m3d-rule" x1="-99" y1="-99" x2="-99" y2="-99" />
        ))}
      </svg>
      {points.map((q) => (
        <button
          key={q.i}
          className={`m3d-pin${pin === q.i ? ' on' : ''}`}
          hidden
          onClick={() => setPin(pin === q.i ? null : q.i)}
          aria-label={q.name}
        />
      ))}
      {points.map((q) => (
        <button
          key={`t${q.i}`}
          className={`m3d-tag${pin === q.i ? ' on' : ''}`}
          hidden
          onClick={() => setPin(pin === q.i ? null : q.i)}
          dir="auto"
        >
          {q.name}
        </button>
      ))}

      {loading && <div className="m3d-msg">…</div>}
      {error && <div className="m3d-msg m3d-bad">{error}</div>}

      {!loading && !error && (
        <>
          {/* While a description is open the model controls are in the way of
              reading it, and the column sat over the panel's own close. */}
          <div className="m3d-acts" hidden={open}>
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
            {/* Off to begin with. Thirty labelled points on the first open is
                somebody else's diagram, not a skull. */}
            {points.length > 0 && (
              <button className={`icobtn${pins ? ' on' : ''}`}
                onClick={() => { setPins((v) => !v); setPin(null); }}
                aria-label="أسماء المعالم">
                <Icon name="pin" size={18} />
              </button>
            )}
            <button className={`icobtn${listing ? ' on' : ''}`}
              onClick={() => setListing((v) => !v)} aria-label="القائمة">
              <Icon name="list" size={18} />
            </button>
            <button className="icobtn"
              onClick={() => { setOnly(false); setGone([]); api.current?.home(); }}
              aria-label="إعادة الضبط">
              <Icon name="rotate" size={18} />
            </button>
          </div>

          <div className="m3d-name">
            {name
              ? (
                <button className="m3d-nm" disabled={!note} onClick={() => setOpen(true)}>
                  <span className="m3d-nm-lines">
                    <span className={`m3d-nm-t${spot ? ' m3d-spot' : ''}`} dir="auto">
                      {name}
                    </span>
                    {/* Which part of it, under the bone rather than instead of
                        it: touching the temporal must still say « temporal ». */}
                    {sub && !spot && <span className="m3d-nm-s" dir="auto">{sub}</span>}
                  </span>
                  {note && <Icon name="chev" size={15} />}
                </button>
              )
              : <span className="m3d-hint">أدر النموذج، والمس عظمًا لمعرفة اسمه</span>}
            {picked && !spot && (
              <button className="m3d-clear" aria-label="أخفِ هذا العظم"
                onClick={() => { setGone((g) => [...g, picked]); setPicked(null); setOnly(false); }}>
                <Icon name="eyeOff" size={17} />
              </button>
            )}
            {name && (
              <button className="m3d-clear" onClick={clear} aria-label="إلغاء التحديد">
                <Icon name="x" size={16} />
              </button>
            )}
          </div>

          {open && note && (
            <div className="m3d-note">
              <div className="m3d-note-top">
                <div className="m3d-note-t" dir="auto">{name}</div>
                <button className="m3d-clear" onClick={() => setOpen(false)}
                  aria-label="إغلاق">
                  <Icon name="x" size={17} />
                </button>
              </div>
              <div className="m3d-note-body" dir="auto">
                <p className="m3d-what">{note.what}</p>
                {SECTIONS.map(([key, title]) => (note[key]?.length ? (
                  <section key={key} className="m3d-part">
                    <h3>{title}</h3>
                    <ul>{note[key].map((t) => <li key={t}>{t}</li>)}</ul>
                  </section>
                ) : null))}
                {note.note && <p className="m3d-aside">{note.note}</p>}
              </div>
            </div>
          )}

          {listing && (
            <div className="m3d-list">
              <div className="m3d-head">العظام</div>
              {parts.map((p) => (
                <div key={p.id} className={`m3d-line${gone.includes(p.id) ? ' away' : ''}`}>
                  <button
                    className={`m3d-row${picked === p.id ? ' on' : ''}`}
                    onClick={() => {
                      setSub(null);
                      setPicked(picked === p.id ? null : p.id);
                    }}
                    dir="auto"
                  >
                    {/* The list is the key to the coloured plate. Fourteen
                        colours on a skull say nothing without the names. */}
                    <span className="m3d-swatch" style={{ background: p.tint }} />
                    {p.name}
                  </button>
                  {/* The other way to put a bone back, and the only way to see
                      which ones are off without closing the list. */}
                  <button
                    className="m3d-off"
                    aria-label={gone.includes(p.id) ? 'أظهر' : 'أخفِ'}
                    onClick={() => setGone((g) => (
                      g.includes(p.id) ? g.filter((x) => x !== p.id) : [...g, p.id]))}
                  >
                    <Icon name={gone.includes(p.id) ? 'eyeOff' : 'eye'} size={16} />
                  </button>
                </div>
              ))}

              {bits.length > 0 && (
                <>
                  {/* The key to the colours on the bone you have chosen. */}
                  <div className="m3d-head" dir="auto">{bone}</div>
                  {bits.map((q) => (
                    <div key={q.name} className="m3d-line">
                      <button
                        className={`m3d-row${sub === q.name ? ' on' : ''}`}
                        onClick={() => { setSub(sub === q.name ? null : q.name); setPlate(true); }}
                        dir="auto"
                      >
                        <span className="m3d-swatch" style={{ background: q.tint }} />
                        {q.name}
                      </button>
                    </div>
                  ))}
                </>
              )}

              {points.length > 0 && (
                <>
                  <div className="m3d-head">المعالم</div>
                  {points.map((q) => (
                    <button
                      key={q.i}
                      className={`m3d-row${pin === q.i ? ' on' : ''}`}
                      onClick={() => {
                        setPin(q.i); setPins(true);
                        api.current?.faceTo(q.i);
                      }}
                      dir="auto"
                    >
                      <span className="m3d-swatch m3d-dot" />
                      {q.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </>
      )}

      <div className="m3d-credit" dir="auto">{credit}</div>
    </div>
  );
}
