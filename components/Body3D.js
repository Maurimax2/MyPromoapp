'use client';

// The whole body, to dissect.
//
// The regional models show one part of a lecture. This is what a dissection
// table is for: the whole body, every system, and the question «what lies
// under this?». Each system is switched on or off and made as see-through as
// you like — the muscles at a fifth and the nerves running under them is how
// a nerve's course is actually learned, and why a body of separate regions
// could not teach it.
//
// Rules this keeps from the regional viewer: a tap is not a drag; nothing is
// see-through until the student asks for it (one slider per system, never an
// automatic X-ray around a pick); every name is French.
//
// Thin structures get help. A nerve is two millimetres wide on a phone held
// at arm's length, so a tap that lands beside one still finds it: if the ray
// under the finger meets nothing, a ring of rays around it is tried and the
// nearest thin structure wins. Following a nerve draws it above everything
// else, so its whole course reads at once.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import Icon from '@/components/Icon';
import { useT } from '@/components/Lang';
import { studied } from '@/lib/streak';
import { tissueMaterial, studio, qualityTier, setDetail } from '@/lib/anatomy/material';
import {
  SETS, BODY, TINT, LOOK_OF, THIN, BODY_SECTIONS, SIDE, fullName, fold,
} from '@/lib/anatomy/body';

const MAX_DPR = { high: 1.75, lite: 1.4 };
const QUIZ_LENGTH = 10;
const shuffle = (list) => {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

export default function Body3D({ set = 'corps', start = null, quiz: openQuiz = false }) {
  const t = useT();
  // Which body: the whole one, or the female pelvis. Everything that differs
  // between them — files, systems, ready views, regions — comes from here.
  const S = SETS[set] || BODY;
  const { layers: LAYERS, views: VIEWS, regions: REGIONS, root: ROOT, depth: DEPTH } = S;
  const regionName = (id) => REGIONS.find((r) => r.id === id)?.name || '';
  const layerOf = (id) => LAYERS.find((l) => l.id === id) || null;
  const host = useRef(null);
  const api = useRef(null);

  // Which systems are drawn, how see-through each one is, and which have
  // arrived. `see` is opacity: 1 is solid, 0.1 is a ghost.
  const [state, setState] = useState(() => Object.fromEntries(
    LAYERS.map((l) => [l.id, { on: l.on, see: l.see, loaded: false, loading: false }])));
  const [index, setIndex] = useState(null);
  const [error, setError] = useState('');
  const [region, setRegion] = useState(S.home);
  const [panel, setPanel] = useState(openQuiz ? 'quiz' : null);   // layers | search | quiz | null
  const [picked, setPicked] = useState(null);         // a mesh id
  const [hidden, setHidden] = useState([]);           // ids taken off one by one
  const [alone, setAlone] = useState(false);          // only the picked structure
  const [follow, setFollow] = useState(false);        // the picked one drawn above all
  const [reading, setReading] = useState(false);      // its description open
  const [about, setAbout] = useState(null);           // …and what it says
  const [query, setQuery] = useState('');
  const [catalogue, setCatalogue] = useState(null);   // every system's names, for search
  const [quiz, setQuiz] = useState(null);

  const items = useRef(new Map());                    // id → { item, layer }
  const defs = useRef(new Map());                     // layer → descriptions

  // ------------------------------------------------------------------ scene
  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;
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
    const key = new THREE.DirectionalLight(0xffffff, lite ? 1.25 : 1.6);
    key.position.set(0.6, 1, 0.8);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, lite ? 0.55 : 0.45);
    fill.position.set(-0.7, -0.2, -0.6);
    scene.add(fill);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.005, 30);
    camera.position.set(0, 1, 4);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.9;
    controls.screenSpacePanning = true;
    controls.minDistance = 0.06;
    controls.maxDistance = 6;

    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    const meshes = [];
    const groups = new Map();
    const materials = new Map();          // `${layer}|${kind}` → material
    const overrides = new Map();          // mesh → material it wears instead
    // A see-through system is blended as ONE surface, not as every surface it
    // has. Forty muscles overlapping at a fifth each add up to a solid wall —
    // which is how «transparent muscles» first looked. So each mesh carries a
    // twin that writes depth and no colour, drawn just before the system's
    // colour: only the nearest surface of the system survives, and that one
    // is blended once over what lies under it.
    const depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true, transparent: true, side: THREE.DoubleSide });

    const base = (layer, kind) => {
      const k = `${layer}|${kind}`;
      if (!materials.has(k)) {
        const m = tissueMaterial(LOOK_OF[kind] || kind, TINT[kind] || TINT.bone, null, tier);
        m.userData.layer = layer;
        materials.set(k, m);
      }
      return materials.get(k);
    };

    // ---------------------------------------------------------- drawing
    let pending = 0;
    const draw = () => {
      if (pending || dead) return;
      pending = requestAnimationFrame(() => { pending = 0; renderer.render(scene, camera); });
    };

    let live = true, last = 0, avg = 16, seen = 0, stage = 0;
    const loop = () => {
      if (!live) return;
      requestAnimationFrame(loop);
      const now = performance.now();
      if (controls.update()) {
        renderer.render(scene, camera);
        // The governor of the regional viewer: a phone that cannot keep 30
        // frames a second while turning is stepped down, never up.
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
      } else last = 0;
    };
    requestAnimationFrame(loop);

    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
      draw();
    };
    const watch = new ResizeObserver(fit);
    watch.observe(el);
    fit();

    // ---------------------------------------------------------- camera
    // Keeps the direction the student is looking from, and moves the target
    // and the distance so the box fills the screen.
    const frame = (box, from = null) => {
      const lo = new THREE.Vector3(...box[0]), hi = new THREE.Vector3(...box[1]);
      const centre = lo.clone().add(hi).multiplyScalar(0.5);
      const size = hi.clone().sub(lo);
      const dir = from ? new THREE.Vector3(...from).normalize()
        : camera.position.clone().sub(controls.target).normalize();
      const fov = THREE.MathUtils.degToRad(camera.fov);
      const tall = Math.max(size.y, size.x / camera.aspect, 0.06);
      const dist = (tall / 2) / Math.tan(fov / 2) * 1.18 + size.z / 2;
      controls.target.copy(centre);
      camera.position.copy(centre).addScaledVector(dir, dist);
      camera.near = Math.max(0.002, dist / 200);
      camera.updateProjectionMatrix();
      controls.update();
      draw();
    };
    const boxOfMesh = (mesh) => {
      const b = new THREE.Box3().setFromObject(mesh);
      return [b.min.toArray(), b.max.toArray()];
    };

    // ---------------------------------------------------------- loading
    const load = async (layer) => {
      const [gltf, man] = await Promise.all([
        loader.loadAsync(`${ROOT}/${layer}.glb`),
        fetch(`${ROOT}/${layer}.json`).then((r) => { if (!r.ok) throw new Error(layer); return r.json(); }),
      ]);
      if (dead) return [];
      const by = new Map(man.items.map((i) => [i.id, i]));
      const group = new THREE.Group();
      gltf.scene.traverse((o) => {
        if (!o.isMesh) return;
        const item = by.get(o.parent?.name) || by.get(o.name);
        if (!item) return;
        o.userData = { id: item.id, layer, item };
        o.material = base(layer, item.k);
        const twin = new THREE.Mesh(o.geometry, depthOnly);
        twin.visible = false;
        twin.renderOrder = 100 + 2 * DEPTH.indexOf(layer);
        twin.raycast = () => {};
        o.add(twin);
        o.userData.twin = twin;
        meshes.push(o);
        items.current.set(item.id, { item, layer });
      });
      group.add(gltf.scene);
      groups.set(layer, group);
      scene.add(group);
      return man.items;
    };

    // ---------------------------------------------------------- painting
    // Everything that depends on what the student chose, in one place, run
    // after every choice. Two thousand meshes is a short loop.
    const paint = (s) => {
      for (const m of materials.values()) {
        const see = s.layers[m.userData.layer]?.see ?? 1;
        const clear = see < 0.995;
        if (m.transparent !== clear) { m.transparent = clear; m.needsUpdate = true; }
        m.opacity = see;
        m.depthWrite = !clear;
      }
      const off = new Set(s.hidden);
      const pickedItem = s.picked ? items.current.get(s.picked)?.item : null;
      for (const mesh of meshes) {
        const { id, layer, item } = mesh.userData;
        const L = s.layers[layer];
        let show = !!L?.on && !off.has(id);
        if (s.alone && pickedItem) show = item.n === pickedItem.n;
        mesh.visible = show;
        const want = s.marks.get(id) || (id === s.picked ? (s.follow ? 'follow' : 'pick') : null);
        const had = overrides.get(mesh);
        const clear = (L?.see ?? 1) < 0.995;
        mesh.userData.twin.visible = clear && !want;
        if (!want) {
          if (had) { had.dispose(); overrides.delete(mesh); }
          mesh.material = base(layer, item.k);
          mesh.renderOrder = clear ? 101 + 2 * DEPTH.indexOf(layer) : 0;
          continue;
        }
        if (had && had.userData.want === want) continue;
        had?.dispose();
        const m = base(layer, item.k).clone();
        m.userData = { want };
        // A pick glows in its own colour; the quiz says right in green and
        // wrong in red; a followed structure is drawn over everything.
        const glow = want === 'right' ? '#2E9E5B' : want === 'wrong' ? '#D23B2E' : want === 'ask' ? '#FFB020' : null;
        if (glow) m.color = new THREE.Color(glow);
        m.emissive = new THREE.Color(glow || TINT[item.k] || '#ffffff');
        m.emissiveIntensity = glow ? 0.55 : 0.4;
        m.opacity = 1; m.transparent = want === 'follow' || want === 'ask'; m.depthWrite = true;
        mesh.renderOrder = 0;
        if (want === 'follow' || want === 'ask') { m.depthTest = false; mesh.renderOrder = 999; }
        overrides.set(mesh, m);
        mesh.material = m;
      }
      draw();
    };

    // ---------------------------------------------------------- picking
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pickable = () => meshes.filter((m) => m.visible);
    const castAt = (x, y, box) => {
      pointer.x = ((x - box.left) / box.width) * 2 - 1;
      pointer.y = -((y - box.top) / box.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(pickable(), false);
    };
    // A faint system is looked through, not touched: a tap on a ghosted
    // muscle reaches the nerve under it.
    let solidEnough = () => true;
    const firstSolid = (hits) => hits.find((h) => solidEnough(h.object.userData.layer));
    const hitAt = (x, y) => {
      const box = renderer.domElement.getBoundingClientRect();
      const direct = firstSolid(castAt(x, y, box));
      if (direct) return direct.object;
      let best = null;
      for (const r of [10, 20, 30]) {
        for (let k = 0; k < 8; k++) {
          const a = (k / 8) * Math.PI * 2;
          const hit = firstSolid(castAt(x + Math.cos(a) * r, y + Math.sin(a) * r, box));
          if (!hit) continue;
          const thin = THIN.has(hit.object.userData.layer);
          const score = r + (thin ? 0 : 40);
          if (!best || score < best.score) best = { obj: hit.object, score };
        }
        if (best && best.score < 40) break;
      }
      return best?.obj || null;
    };

    let onTap = () => {};
    let down = null;
    const startTap = (e) => { down = { x: e.clientX, y: e.clientY, t: Date.now() }; };
    const endTap = (e) => {
      if (!down) return;
      const slid = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      const held = Date.now() - down.t;
      down = null;
      if (slid > 8 || held > 600) return;
      onTap(hitAt(e.clientX, e.clientY));
    };
    renderer.domElement.addEventListener('pointerdown', startTap);
    renderer.domElement.addEventListener('pointerup', endTap);

    api.current = {
      load, paint, frame, boxOfMesh,
      meshesOf: (id) => meshes.filter((m) => m.userData.id === id),
      meshesNamed: (n) => meshes.filter((m) => m.userData.item.n === n),
      setTap: (fn) => { onTap = fn; },
      setSolid: (fn) => { solidEnough = fn; },
      dead: () => dead,
    };

    return () => {
      dead = true; live = false;
      watch.disconnect();
      renderer.domElement.removeEventListener('pointerdown', startTap);
      renderer.domElement.removeEventListener('pointerup', endTap);
      controls.dispose();
      for (const m of meshes) m.geometry.dispose();
      for (const m of materials.values()) m.dispose();
      for (const m of overrides.values()) m.dispose();
      depthOnly.dispose();
      unstudio();
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
  }, []);

  // ------------------------------------------------------------ first load
  const stateRef = useRef(state);
  stateRef.current = state;

  const ensure = useCallback(async (layer) => {
    const s = stateRef.current[layer];
    if (!api.current || s.loaded || s.loading) return;
    setState((p) => ({ ...p, [layer]: { ...p[layer], loading: true } }));
    try {
      await api.current.load(layer);
      setState((p) => ({ ...p, [layer]: { ...p[layer], loading: false, loaded: true } }));
    } catch {
      setState((p) => ({ ...p, [layer]: { ...p[layer], loading: false } }));
      setError(t('تعذّر تحميل هذا الجهاز — تحقّق من الاتصال وأعد المحاولة.'));
    }
  }, [t]);

  useEffect(() => {
    let alive = true;
    fetch(`${ROOT}/index.json`).then((r) => r.json()).then((ix) => {
      if (!alive) return;
      setIndex(ix);
      const first = start || S.start;
      const view = first && VIEWS.find((v) => v.id === first);
      if (view) applyView(view, false);
      else ensure(LAYERS.find((l) => l.on)?.id || LAYERS[0].id);
      setTimeout(() => api.current?.frame(ix.regions[S.home] || ix.regions.corps, [0, 0.05, 1]), 50);
    }).catch(() => setError(t('تعذّر تحميل الجسم — تحقّق من الاتصال وأعد المحاولة.')));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whatever is switched on and not yet here is fetched.
  useEffect(() => {
    for (const l of LAYERS) if (state[l.id].on && !state[l.id].loaded && !state[l.id].loading) ensure(l.id);
  }, [state, ensure]);

  // ------------------------------------------------------------- painting
  const marks = useMemo(() => {
    const m = new Map();
    if (quiz?.mode === 'name' && quiz.target) for (const id of quiz.targetIds) m.set(id, 'ask');
    if (quiz?.answered) {
      for (const id of quiz.targetIds) m.set(id, 'right');
      if (quiz.tapped && !quiz.right) m.set(quiz.tapped, 'wrong');
    }
    return m;
  }, [quiz]);

  useEffect(() => {
    api.current?.setSolid((layer) => (state[layer]?.see ?? 1) >= 0.5);
    api.current?.paint({ layers: state, hidden, picked, alone, follow, marks });
  }, [state, hidden, picked, alone, follow, marks]);

  // ---------------------------------------------------------------- taps
  const choose = useCallback((id, aim = false) => {
    setPicked(id);
    setReading(false);
    setFollow(false);
    if (aim && id && api.current) {
      const [mesh] = api.current.meshesOf(id);
      if (mesh) {
        const [lo, hi] = api.current.boxOfMesh(mesh);
        const pad = 0.04;
        api.current.frame([lo.map((v) => v - pad), hi.map((v) => v + pad)]);
      }
    }
  }, []);

  useEffect(() => {
    api.current?.setTap((obj) => {
      const id = obj?.userData.id || null;
      if (quizRef.current?.mode === 'find' && quizRef.current.target && !quizRef.current.answered) {
        if (!id) return;
        answerFind(id);
        return;
      }
      if (quizRef.current) return;
      if (!id) { setAlone(false); }
      choose(id);
    });
  });

  // ---------------------------------------------------------- descriptions
  const pickedEntry = picked ? items.current.get(picked) : null;
  useEffect(() => {
    if (!reading || !pickedEntry) return;
    const { layer, item } = pickedEntry;
    let alive = true;
    const have = defs.current.get(layer);
    const show = (book) => { if (alive) setAbout(book?.[item.b] || false); };
    if (have) show(have);
    else {
      setAbout(null);
      fetch(`${ROOT}/${layer}.defs.json`).then((r) => r.json()).then((book) => {
        defs.current.set(layer, book); show(book);
      }).catch(() => show(null));
    }
    return () => { alive = false; };
  }, [reading, pickedEntry]);

  // ---------------------------------------------------------------- views
  function applyView(view, keepPick = true) {
    setState((p) => {
      const next = { ...p };
      for (const l of LAYERS) {
        const see = view.layers[l.id];
        next[l.id] = { ...p[l.id], on: see != null, see: see ?? p[l.id].see };
      }
      return next;
    });
    if (!keepPick) setPicked(null);
    setAlone(false); setHidden([]);
  }

  const goRegion = (id) => {
    setRegion(id);
    const box = index?.regions?.[id];
    // A limb is looked at from the front and a little to its side.
    const from = id === 'membre-sup' || id === 'membre-inf' ? [0.45, 0.05, 1] : [0, 0.05, 1];
    if (box) api.current?.frame(box, from);
  };

  const reset = () => {
    setPicked(null); setHidden([]); setAlone(false); setFollow(false); setQuiz(null);
    applyView(VIEWS[0]);
    goRegion(S.home);
  };

  // --------------------------------------------------------------- search
  const openSearch = async () => {
    setPanel('search');
    if (catalogue) return;
    const lists = await Promise.all(LAYERS.map((l) => fetch(`${ROOT}/${l.id}.json`)
      .then((r) => r.json()).then((m) => m.items.map((i) => ({ ...i, layer: l.id }))).catch(() => [])));
    setCatalogue(lists.flat());
  };
  const found = useMemo(() => {
    if (!catalogue) return [];
    const q = fold(query);
    if (q.length < 2) return [];
    const words = q.split(/\s+/);
    return catalogue.filter((i) => { const n = fold(i.n); return words.every((w) => n.includes(w)); })
      .slice(0, 60);
  }, [catalogue, query]);

  const jumpTo = async (hit) => {
    setPanel(null);
    if (!state[hit.layer].on) setState((p) => ({ ...p, [hit.layer]: { ...p[hit.layer], on: true, see: Math.max(p[hit.layer].see, 0.6) } }));
    await ensure(hit.layer);
    // Waits for the geometry to be in the scene before aiming at it.
    const tryAim = (n = 0) => {
      if (api.current?.meshesOf(hit.id).length) choose(hit.id, true);
      else if (n < 40) setTimeout(() => tryAim(n + 1), 100);
    };
    tryAim();
  };

  // ----------------------------------------------------------------- quiz
  const quizRef = useRef(quiz);
  quizRef.current = quiz;
  const [setup, setSetup] = useState({ layer: S.quizLayer, region: S.all, mode: 'find' });

  const poolFor = (layer, reg) => {
    const seenNames = new Set();
    const out = [];
    for (const { item, layer: l } of items.current.values()) {
      if (l !== layer) continue;
      if (reg !== S.all && item.r !== reg) continue;
      if (seenNames.has(item.n)) continue;
      seenNames.add(item.n);
      out.push(item);
    }
    return out;
  };

  const ask = (q) => {
    const pool = q.pool;
    const target = pool[q.order[q.step]];
    const ids = [...items.current.values()].filter((e) => e.item.n === target.n).map((e) => e.item.id);
    const next = { ...q, target, targetIds: ids, answered: false, tapped: null, right: false };
    if (q.mode === 'name') {
      // Three wrong answers from the same system, preferring the same tissue
      // and the same region: «nerf médian or nerf ulnaire» is a question,
      // «nerf médian or fémur» is not.
      const near = shuffle(pool.filter((p) => p.n !== target.n && p.k === target.k));
      const rest = shuffle(pool.filter((p) => p.n !== target.n && p.k !== target.k));
      next.options = shuffle([target, ...[...near, ...rest].slice(0, 3)]).map((p) => p.n);
      const [mesh] = api.current?.meshesOf(ids[0]) || [];
      if (mesh) {
        const [lo, hi] = api.current.boxOfMesh(mesh);
        const pad = 0.06;
        api.current.frame([lo.map((v) => v - pad), hi.map((v) => v + pad)]);
      }
    }
    setQuiz(next);
  };

  const startQuiz = async () => {
    const { layer, region: reg, mode } = setup;
    setPanel(null); setPicked(null); setAlone(false); setFollow(false); setHidden([]);
    setState((p) => ({ ...p, [layer]: { ...p[layer], on: true, see: 1 } }));
    await ensure(layer);
    const wait = (n = 0) => new Promise((resolve) => {
      const go = () => (poolFor(layer, reg).length || n > 40 ? resolve() : setTimeout(() => { n += 1; go(); }, 100));
      go();
    });
    await wait();
    const pool = poolFor(layer, reg);
    if (pool.length < 4) { setQuiz({ empty: true }); return; }
    goRegion(reg);
    const order = shuffle(pool.map((_, i) => i)).slice(0, Math.min(QUIZ_LENGTH, pool.length));
    ask({ mode, layer, region: reg, pool, order, step: 0, score: 0, done: false });
  };

  function answerFind(id) {
    const q = quizRef.current;
    const right = q.targetIds.includes(id);
    setQuiz({ ...q, answered: true, tapped: id, right, tappedName: items.current.get(id)?.item.n, score: q.score + (right ? 1 : 0) });
  }
  const answerName = (name) => {
    const q = quizRef.current;
    if (q.answered) return;
    const right = name === q.target.n;
    setQuiz({ ...q, answered: true, chosen: name, right, score: q.score + (right ? 1 : 0) });
  };
  const nextQuestion = () => {
    const q = quizRef.current;
    if (q.step + 1 >= q.order.length) {
      setQuiz({ ...q, done: true, target: null, targetIds: [], answered: false });
      // A finished round is studying: it counts for the day's streak.
      try { studied(1); } catch { /* the quiz still happened */ }
      return;
    }
    ask({ ...q, step: q.step + 1 });
  };

  // ------------------------------------------------------------------- UI
  const p = pickedEntry?.item;
  const pLayer = pickedEntry?.layer;
  const mb = (bytes) => `${(bytes / 1e6).toFixed(1)} Mo`;

  return (
    <div className="bd">
      <div className="bd-canvas" ref={host} />

      {/* Where to look: the body's regions, French because they are anatomy. */}
      {!quiz && (
        <div className="bd-regions" role="tablist" aria-label={t('المناطق')}>
          {REGIONS.map((r) => (
            <button key={r.id} role="tab" aria-selected={region === r.id} data-on={region === r.id}
              onClick={() => goRegion(r.id)} dir="ltr">{r.name}</button>
          ))}
        </div>
      )}

      <div className="bd-tools">
        <button onClick={() => setPanel(panel === 'layers' ? null : 'layers')} data-on={panel === 'layers'} aria-label={t('الأجهزة والشفافية')}>
          <Icon name="list" size={20} /><s>{t('الطبقات')}</s>
        </button>
        <button onClick={() => (panel === 'search' ? setPanel(null) : openSearch())} data-on={panel === 'search'} aria-label={t('ابحث عن بنية')}>
          <Icon name="search" size={20} /><s>{t('بحث')}</s>
        </button>
        <button onClick={() => { setQuiz(null); setPanel(panel === 'quiz' ? null : 'quiz'); }} data-on={panel === 'quiz' || !!quiz} aria-label={t('اختبار ثلاثي الأبعاد')}>
          <Icon name="quiz" size={20} /><s>{t('اختبار')}</s>
        </button>
        <button onClick={reset} aria-label={t('إعادة الضبط')}>
          <Icon name="again" size={20} /><s>{t('إعادة')}</s>
        </button>
      </div>

      {error && <div className="bd-error" role="alert">{error}<button onClick={() => setError('')} aria-label={t('إغلاق')}><Icon name="x" size={16} /></button></div>}

      {/* ---------------- systems: on, off, and how see-through ---------------- */}
      {panel === 'layers' && (
        <section className="bd-panel">
          <div className="bd-panel-h">
            <b>{t('الأجهزة')}</b>
            <button onClick={() => setPanel(null)} aria-label={t('إغلاق')}><Icon name="x" size={18} /></button>
          </div>
          <div className="bd-views" dir="ltr">
            {VIEWS.map((v) => <button key={v.id} onClick={() => applyView(v)}>{v.name}</button>)}
          </div>
          <p className="bd-hint">{t('اسحب الشريط لترى ما تحت الطبقة: العضلات شفافة والأعصاب تحتها.')}</p>
          <ul className="bd-layers">
            {LAYERS.map((l) => {
              const s = state[l.id];
              const size = index?.layers?.[l.id];
              return (
                <li key={l.id} data-on={s.on}>
                  <button className="bd-eye" onClick={() => setState((p) => ({ ...p, [l.id]: { ...p[l.id], on: !p[l.id].on } }))}
                    aria-pressed={s.on} aria-label={l.name}>
                    <Icon name={s.on ? 'eye' : 'eyeOff'} size={19} />
                  </button>
                  <div className="grow">
                    <div className="bd-layer-t" dir="ltr">
                      <b>{l.name}</b>
                      <s>{s.loading ? t('يحمَّل…') : !s.loaded && size ? mb(size.bytes) : ''}</s>
                    </div>
                    <input type="range" dir="ltr" min="0.08" max="1" step="0.02" value={s.see} disabled={!s.on}
                      aria-label={t('شفافية {name}', { name: l.name })}
                      onChange={(e) => { const v = Number(e.target.value); setState((p) => ({ ...p, [l.id]: { ...p[l.id], see: v } })); }} />
                  </div>
                </li>
              );
            })}
          </ul>
          {hidden.length > 0 && (
            <button className="bd-wide" onClick={() => setHidden([])}>{t('أعد البنى المخفية ({n})', { n: hidden.length })}</button>
          )}
        </section>
      )}

      {/* ---------------- search ---------------- */}
      {panel === 'search' && (
        <section className="bd-panel">
          <div className="bd-panel-h">
            <input className="bd-search" autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder={t('اسم بالفرنسية — nerf médian، fémur…')} dir="auto" aria-label={t('ابحث عن بنية')} />
            <button onClick={() => setPanel(null)} aria-label={t('إغلاق')}><Icon name="x" size={18} /></button>
          </div>
          {!catalogue && <p className="bd-hint">{t('يحمَّل…')}</p>}
          <ul className="bd-found">
            {found.map((hit) => (
              <li key={hit.id}>
                <button onClick={() => jumpTo(hit)}>
                  <i style={{ background: TINT[hit.k] }} />
                  <span className="grow" dir="ltr"><b>{fullName(hit)}</b><s>{layerOf(hit.layer)?.name}{hit.r ? ` · ${regionName(hit.r)}` : ''}</s></span>
                </button>
              </li>
            ))}
          </ul>
          {catalogue && query.length >= 2 && !found.length && <p className="bd-hint">{t('لا نتيجة. اكتب الاسم بالفرنسية.')}</p>}
        </section>
      )}

      {/* ---------------- quiz: choosing what to be asked ---------------- */}
      {panel === 'quiz' && !quiz && (
        <section className="bd-panel">
          <div className="bd-panel-h">
            <b>{t('اختبار ثلاثي الأبعاد')}</b>
            <button onClick={() => setPanel(null)} aria-label={t('إغلاق')}><Icon name="x" size={18} /></button>
          </div>
          <div className="bd-q-label">{t('نوع السؤال')}</div>
          <div className="bd-seg">
            <button data-on={setup.mode === 'find'} onClick={() => setSetup((s) => ({ ...s, mode: 'find' }))}>{t('أين هي؟ — المسها')}</button>
            <button data-on={setup.mode === 'name'} onClick={() => setSetup((s) => ({ ...s, mode: 'name' }))}>{t('ما اسمها؟ — اختر')}</button>
          </div>
          <div className="bd-q-label">{t('الجهاز')}</div>
          <div className="bd-chips" dir="ltr">
            {LAYERS.filter((l) => l.id !== 'peau' && l.id !== 'fascias').map((l) => (
              <button key={l.id} data-on={setup.layer === l.id} onClick={() => setSetup((s) => ({ ...s, layer: l.id }))}>{l.name}</button>
            ))}
          </div>
          <div className="bd-q-label">{t('المنطقة')}</div>
          <div className="bd-chips" dir="ltr">
            {REGIONS.map((r) => (
              <button key={r.id} data-on={setup.region === r.id} onClick={() => setSetup((s) => ({ ...s, region: r.id }))}>{r.name}</button>
            ))}
          </div>
          <button className="btn p bd-go" onClick={startQuiz}>{t('ابدأ — {n} أسئلة', { n: QUIZ_LENGTH })}</button>
        </section>
      )}

      {/* ---------------- quiz: asking ---------------- */}
      {quiz?.empty && (
        <section className="bd-ask">
          <p>{t('لا توجد بنى كافية في هذه المنطقة لهذا الجهاز. اختر منطقة أخرى.')}</p>
          <button className="btn g" onClick={() => { setQuiz(null); setPanel('quiz'); }}>{t('رجوع')}</button>
        </section>
      )}
      {quiz && !quiz.empty && !quiz.done && quiz.target && (
        <section className="bd-ask" aria-live="polite">
          <div className="bd-ask-top">
            <s>{t('سؤال {i} من {n}', { i: quiz.step + 1, n: quiz.order.length })}</s>
            <s>{t('{score} صحيحة', { score: quiz.score })}</s>
            <button onClick={() => setQuiz(null)} aria-label={t('أنهِ الاختبار')}><Icon name="x" size={16} /></button>
          </div>
          {quiz.mode === 'find' ? (
            <>
              <div className="bd-ask-q">{t('المس:')} <b dir="ltr">{quiz.target.n}</b></div>
              {!quiz.answered && <p className="bd-hint">{t('أدِر الجسم وكبّر، ثم المس البنية. كلا الجانبين صحيح.')}</p>}
            </>
          ) : (
            <>
              <div className="bd-ask-q">{t('ما اسم البنية المضيئة؟')}</div>
              <div className="bd-options" dir="ltr">
                {quiz.options.map((o) => (
                  <button key={o} disabled={quiz.answered}
                    data-state={quiz.answered ? (o === quiz.target.n ? 'right' : o === quiz.chosen ? 'wrong' : '') : ''}
                    onClick={() => answerName(o)}>{o}</button>
                ))}
              </div>
            </>
          )}
          {quiz.answered && (
            <div className="bd-verdict" data-right={quiz.right}>
              <b>{quiz.right ? t('صحيح') : t('خطأ')}</b>
              {!quiz.right && quiz.mode === 'find' && quiz.tappedName && (
                <span dir="ltr">{t('لمستَ:')} {quiz.tappedName}</span>
              )}
              <button className="btn p" onClick={nextQuestion}>{t('التالي')}</button>
            </div>
          )}
        </section>
      )}
      {quiz?.done && (
        <section className="bd-ask">
          <div className="bd-score">{t('النتيجة: {score} من {n}', { score: quiz.score, n: quiz.order.length })}</div>
          <div className="bd-row">
            <button className="btn p" onClick={startQuiz}>{t('أعد')}</button>
            <button className="btn g" onClick={() => { setQuiz(null); setPanel('quiz'); }}>{t('غيّر الأسئلة')}</button>
          </div>
        </section>
      )}

      {/* ---------------- what was touched ---------------- */}
      {p && !quiz && !panel && (
        <section className="bd-card">
          <div className="bd-card-h">
            <i style={{ background: TINT[p.k] }} />
            <div className="grow" dir="ltr">
              <b>{p.n}</b>
              <s>{[p.s ? SIDE[p.s] : null, layerOf(pLayer)?.name, p.r ? regionName(p.r) : null].filter(Boolean).join(' · ')}</s>
            </div>
            <button onClick={() => choose(null)} aria-label={t('إغلاق')}><Icon name="x" size={18} /></button>
          </div>
          <div className="bd-acts">
            <button data-on={alone} onClick={() => setAlone((a) => !a)}>{alone ? t('أظهر الكل') : t('اعزل')}</button>
            <button onClick={() => { setHidden((h) => [...h, p.id]); setPicked(null); }}>{t('أخفِ')}</button>
            {THIN.has(pLayer) && (
              <button data-on={follow} onClick={() => setFollow((f) => !f)}>{t('تتبّع مساره')}</button>
            )}
            <button data-on={reading} onClick={() => setReading((r) => !r)}>{t('الوصف')}</button>
          </div>
          {reading && (
            <div className="bd-about" dir="ltr" lang="fr">
              {about === null && <p className="bd-hint">{t('يحمَّل…')}</p>}
              {about === false && <p className="bd-hint">{t('لا وصف مكتوب لهذه البنية بعد.')}</p>}
              {about && about.note?.what && <p>{about.note.what}</p>}
              {about && about.note && BODY_SECTIONS.filter(([k]) => about.note[k]?.length).map(([k, label]) => (
                <div key={k} className="bd-sec">
                  <b>{label}</b>
                  <ul>{[about.note[k]].flat().map((line) => <li key={line}>{line}</li>)}</ul>
                </div>
              ))}
              {about && about.note?.note && <p className="bd-hint">{about.note.note}</p>}
              {about && !about.note && about.text && about.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              {about && !about.note && about.link && (
                <a href={about.link} target="_blank" rel="noreferrer" className="bd-src">Wikipédia · CC BY-SA</a>
              )}
            </div>
          )}
        </section>
      )}

      <p className="bd-credit" dir="ltr">{S.credit}</p>
    </div>
  );
}
