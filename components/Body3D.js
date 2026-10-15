'use client';

// The body, to dissect — whole, or cut down to one lecture.
//
// Le corps entier is a dissection table: every system, switched on or off and
// made as see-through as you like — the muscles at a fifth and the nerves
// running under them is how a nerve's course is actually learned.
//
// A lesson (lib/anatomy/lessons.js) is the same body cut down to what one
// lecture is about: its part of the body, the systems it needs, opened the way
// the lecture looks at it, with that lecture's drawings and questions beside
// it. Nothing a lesson leaves out is gone: the systems panel turns it on, and
// «الجسم كاملًا» drops the cut.
//
// Rules this keeps from the regional viewer: a tap is not a drag; nothing is
// see-through until the student asks for it; every name is French.
//
// Thin structures get help. A nerve is two millimetres wide on a phone held
// at arm's length, so a tap that lands beside one still finds it: if the ray
// under the finger meets nothing, a ring of rays around it is tried and the
// nearest thin structure wins. Following a nerve draws it above everything
// else, so its whole course reads at once.
//
// Insertions are the areas where a muscle holds on to bone, drawn on the bone
// in red (origin) and blue (termination). Asked from a muscle they show that
// muscle's; asked from a bone, every muscle that holds on to it — with the
// muscles thinned so the bone can be read.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import Link from 'next/link';
import { useT } from '@/components/Lang';
import { Viewer as PlateViewer } from '@/components/Planches';
import { GROUPS_OF_LAYER, PLANCHES } from '@/lib/anatomy/planches';
import { studied } from '@/lib/streak';
import { createStage } from '@/lib/anatomy/stage';
import {
  SETS, BODY, TINT, THIN, BODY_SECTIONS, SIDE, fullName, fold,
} from '@/lib/anatomy/body';

const QUIZ_LENGTH = 10;
// The three planes, by the axis across them. Their names are anatomy, so French.
const CUTS = [['x', 'Sagittale'], ['z', 'Frontale'], ['y', 'Horizontale']];
const CUT_NAME = Object.fromEntries(CUTS);
// Where the camera goes to face each cut, for the side kept by default.
const FACING = { x: [1, 0.08, 0.12], y: [0.05, 0.85, 0.5], z: [0.12, 0.08, 1] };
const NOT_QUIZZED = new Set(['peau', 'fascias', 'insertions']);
const shuffle = (list) => {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

// A muscle and its attachments are named by different hands — «Masséter,
// partie superficielle» holds on through «Masséter — origine» — so they are
// matched on the words that name the muscle, not on the whole name.
const FILLER = new Set(['muscle', 'muscles', 'm', 'de', 'du', 'des', 'la', 'le', 'les', 'l', 'd', 'et', 'partie', 'chef',
  'faisceau', 'ventre', 'portion', 'origine', 'terminaison', 'superficielle', 'profonde', 'superficiel', 'profond']);
const words = (s) => fold(String(s).replace(/œ/g, 'oe').replace(/Œ/g, 'Oe')).split(/[^a-z0-9]+/).filter((w) => w && !FILLER.has(w));
const sameMuscle = (a, b) => {
  const A = words(a), B = words(b);
  if (!A.length || !B.length) return false;
  const sa = new Set(A), sb = new Set(B);
  return A.every((w) => sb.has(w)) || B.every((w) => sa.has(w));
};

/** A lesson's scene, its filters compiled (they travel as strings). */
function compile(lesson) {
  const sc = lesson?.scene;
  if (!sc) return null;
  const re = (s) => (s ? new RegExp(s, 'i') : null);
  return {
    box: sc.box || null, boxes: sc.boxes || {}, from: sc.from || null, layers: sc.layers || null,
    // What the camera opens on, when it is not the whole of what is kept:
    // the ear lesson keeps both ears and looks at one.
    aim: sc.aim || sc.box || null,
    keep: Object.fromEntries(Object.entries(sc.keep || {}).map(([k, v]) => [k, re(v)])),
    drop: re(sc.drop), also: re(sc.also), quiz: lesson.quiz || null,
  };
}

/** Whether a structure belongs to the lesson: its system's names, its part of the body. */
function inLesson(L, item, layer) {
  if (!L) return true;
  if (L.also && L.also.test(item.n)) return true;
  const k = L.keep[layer];
  if (k && !k.test(item.n)) return false;
  const box = L.boxes[layer] || L.box;
  if (!box || !item.c) return true;
  const [lo, hi] = box;
  return item.c.every((v, i) => v >= lo[i] - 0.005 && v <= hi[i] + 0.005);
}

export default function Body3D({ set = 'corps', start = null, quiz: openQuiz = false, lesson = null }) {
  const t = useT();
  // Which body: the whole one, or the female pelvis. Everything that differs
  // between them — files, systems, ready views, regions — comes from here.
  const S = SETS[set] || BODY;
  const { layers: LAYERS, views: VIEWS, regions: REGIONS, root: ROOT, depth: DEPTH } = S;
  const regionName = (id) => REGIONS.find((r) => r.id === id)?.name || '';
  const layerOf = (id) => LAYERS.find((l) => l.id === id) || null;
  const host = useRef(null);
  const api = useRef(null);

  const L = useMemo(() => compile(lesson), [lesson]);
  // A system marked `only` belongs to the lessons that open it: the scanner's
  // ear is not listed or searched in the whole body, which has its own.
  const OFFERED = useMemo(() => LAYERS.filter((l) => !l.only || L?.layers?.[l.id] != null), [LAYERS, L]);
  const lessonRef = useRef(L);
  lessonRef.current = L;
  const plates = useMemo(() => (lesson?.planches || [])
    .map((id) => PLANCHES.find((p) => p.id === id)).filter(Boolean), [lesson]);

  // Which systems are drawn, how see-through each one is, and which have
  // arrived. `see` is opacity: 1 is solid, 0.1 is a ghost. A lesson opens
  // with its own systems; the body with its own.
  const opening = useCallback(() => Object.fromEntries(LAYERS.map((l) => {
    const want = L?.layers ? L.layers[l.id] : undefined;
    return [l.id, { on: L?.layers ? want != null : l.on, see: want ?? l.see }];
  })), [LAYERS, L]);
  const [state, setState] = useState(() => {
    const o = opening();
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, { ...v, loaded: false, loading: false }]));
  });
  const [index, setIndex] = useState(null);
  const [error, setError] = useState('');
  const [region, setRegion] = useState(S.home);
  const [whole, setWhole] = useState(false);          // a lesson shown in the whole body
  const [cut, setCut] = useState(null);               // { axis, at: 0..1 across the scene, flip }
  const [panel, setPanel] = useState(openQuiz ? 'quiz' : null);   // layers | search | quiz | planches | null
  const [plate, setPlate] = useState(null);           // a drawing open full screen
  const [picked, setPicked] = useState(null);         // a mesh id
  const [hidden, setHidden] = useState([]);           // ids taken off one by one
  const [alone, setAlone] = useState(false);          // only the picked structure
  const [follow, setFollow] = useState(false);        // the picked one drawn above all
  const [reading, setReading] = useState(false);      // its description open
  const [about, setAbout] = useState(null);           // …and what it says
  const [ins, setIns] = useState(null);               // { ids, of } — insertions shown
  const [touched, setTouched] = useState(false);      // the hint goes after a first touch
  const [query, setQuery] = useState('');
  const [catalogue, setCatalogue] = useState(null);   // every system's names, for search
  const [quiz, setQuiz] = useState(null);
  const [reps, setReps] = useState(null);             // every landmark, once asked for
  const [repsOn, setRepsOn] = useState(false);        // the picked bone's landmarks shown
  const [rep, setRep] = useState(null);               // …and the one being read

  const items = useRef(new Map());                    // id → { item, layer }
  const defs = useRef(new Map());                     // layer → descriptions

  // ------------------------------------------------------------------ scene
  // Everything three.js owns lives in lib/anatomy/stage.js: batched systems,
  // the camera, picking. This component keeps what the student chose.
  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;
    const st = createStage(el, {
      root: ROOT, depth: DEPTH,
      member: (item, layer) => inLesson(lessonRef.current, item, layer),
    });
    api.current = st;
    // `?debug3d` in the address hands the stage to the browser console (and
    // to the screenshot scripts): what it drew, whether the camera rests.
    if (new URLSearchParams(window.location.search).has('debug3d')) window.__mpStage = st;
    return () => { st.dispose(); api.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------------------------------------------ first load
  const stateRef = useRef(state);
  stateRef.current = state;

  const ensure = useCallback(async (layer) => {
    const s = stateRef.current[layer];
    if (!api.current || !s || s.loaded || s.loading) return;
    setState((p) => ({ ...p, [layer]: { ...p[layer], loading: true } }));
    try {
      const list = await api.current.load(layer);
      for (const i of list) items.current.set(i.id, { item: i, layer });
      setState((p) => ({ ...p, [layer]: { ...p[layer], loading: false, loaded: true } }));
      // What a lesson opens with taken off — the platysma over the neck.
      const drop = lessonRef.current?.drop;
      if (drop) {
        const ids = list.filter((i) => drop.test(i.n)).map((i) => i.id);
        if (ids.length) setHidden((h) => [...new Set([...h, ...ids])]);
      }
    } catch {
      setState((p) => ({ ...p, [layer]: { ...p[layer], loading: false } }));
      setError(t('تعذّر تحميل هذا الجهاز — تحقّق من الاتصال وأعد المحاولة.'));
    }
  }, [t]);

  // Where the camera goes for the lesson, or for the body.
  const home = useCallback((ix = index, cut = false) => {
    if (!ix || !api.current) return;
    if (L?.box && !whole) api.current.frame(L.aim, L.from || [0, 0.05, 1], cut);
    else api.current.frame(ix.regions[S.home] || ix.regions.corps, L?.from || [0, 0.05, 1], cut);
  }, [index, L, whole, S.home]);

  useEffect(() => {
    let alive = true;
    fetch(`${ROOT}/index.json`).then((r) => r.json()).then((ix) => {
      if (!alive) return;
      setIndex(ix);
      if (!L?.layers) {
        const first = start || S.start;
        const view = first && VIEWS.find((v) => v.id === first);
        if (view) applyView(view, false);
        else ensure(LAYERS.find((l) => l.on)?.id || LAYERS[0].id);
      }
      // The first view is where the screen opens, not a flight to it.
      setTimeout(() => home(ix, true), 50);
    }).catch(() => setError(t('تعذّر تحميل الجسم — تحقّق من الاتصال وأعد المحاولة.')));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whatever is switched on and not yet here is fetched.
  useEffect(() => {
    for (const l of LAYERS) if (state[l.id].on && !state[l.id].loaded && !state[l.id].loading) ensure(l.id);
  }, [state, ensure, LAYERS]);

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
    api.current?.setSolid((layer) => (state[layer]?.see ?? 1) >= 0.5 && !(ins && layer === 'muscles'));
    api.current?.paint({ layers: state, hidden, picked, alone, follow, marks, whole, ins: ins?.ids || null });
  }, [state, hidden, picked, alone, follow, marks, whole, ins]);

  // Whatever sheet is open over the bottom of the canvas, the model moves up
  // out of its way — once per sheet, not on every keystroke: a search list
  // growing under the finger kept the model sliding.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const el = host.current;
      if (!el || !api.current) return;
      const sheet = el.parentElement?.querySelector('.bd-panel, .bd-card, .bd-ask');
      const covered = sheet ? (sheet.getBoundingClientRect().height + 6) / Math.max(1, el.clientHeight) : 0;
      // The region chips lie over the top of the canvas.
      // The region chips and the cut's bar lie over the top of the canvas.
      const box = el.getBoundingClientRect();
      const tops = [...(el.parentElement?.querySelectorAll('.bd-regions, .bd-cutbar') || [])].map((n) => n.getBoundingClientRect().bottom - box.top);
      const top = Math.max(0, ...tops) / Math.max(1, box.height);
      api.current.setInset(Math.min(0.62, covered), Math.min(0.15, top));
    });
    return () => cancelAnimationFrame(id);
  }, [panel, picked, reading, repsOn, rep, ins, !!quiz, quiz?.answered, quiz?.done, !!cut && !panel]);

  // ------------------------------------------------------------------ the cut
  // A plane through the scene — the lesson's part of the body, or the region
  // looked at — slid along its axis. Choosing a plane turns the model to face
  // the cut; sliding does not move the camera.
  const cutBox = L?.box && !whole ? L.box : (index?.regions?.[region] || index?.regions?.corps || null);
  useEffect(() => {
    if (!api.current) return;
    if (!cut || !cutBox) { api.current.setCut(null); return; }
    const k = { x: 0, y: 1, z: 2 }[cut.axis];
    const lo = cutBox[0][k], hi = cutBox[1][k];
    api.current.setCut({ axis: cut.axis, at: lo + (hi - lo) * cut.at, flip: cut.flip });
  }, [cut, cutBox]);
  const faceCut = (axis, flip) => {
    const [x, y, z] = FACING[axis];
    const from = !flip ? [x, y, z] : axis === 'x' ? [-x, y, z] : axis === 'y' ? [x, -y, z] : [-x, y, -z];
    const box = L?.box && !whole ? L.aim : cutBox;
    if (box) api.current?.frame(box, from);
  };
  const chooseCut = (axis) => {
    if (!axis) { setCut(null); return; }
    setCut({ axis, at: 0.5, flip: false });
    faceCut(axis, false);
  };
  const flipCut = () => {
    if (!cut) return;
    setCut({ ...cut, flip: !cut.flip });
    faceCut(cut.axis, !cut.flip);
  };

  // ---------------------------------------------------------------- taps
  const choose = useCallback((id, aim = false) => {
    setPicked(id);
    setReading(false);
    setFollow(false);
    setRepsOn(false);
    setRep(null);
    if (aloneBefore.current !== null) { setAlone(aloneBefore.current); aloneBefore.current = null; }
    if (id) setTouched(true);
    // Touching an attachment keeps the attachments on screen; touching
    // anything else puts them away.
    if (!id || items.current.get(id)?.layer !== 'insertions') setIns(null);
    if (aim && id) api.current?.frameId(id);
  }, []);

  useEffect(() => {
    api.current?.setTap((id) => {
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
  }, [reading, pickedEntry, ROOT]);

  // ------------------------------------------------------------ landmarks
  // The named points of the skeleton (scripts/carve-landmarks.mjs): fetched
  // the first time a bone is picked, drawn as dots on the picked bone when
  // asked, each one read in the card — and what passes through, for an opening.
  const loadReps = useCallback(async () => {
    if (reps || set !== 'corps') return reps;
    try {
      const r = await fetch(`${ROOT}/reperes.json`).then((x) => x.json());
      setReps(r.items);
      return r.items;
    } catch { return null; }
  }, [reps, set, ROOT]);
  useEffect(() => {
    if (pickedEntry?.layer === 'squelette') loadReps();
  }, [pickedEntry, loadReps]);
  const boneReps = useMemo(() => {
    const it = pickedEntry?.item;
    if (!reps || !it || pickedEntry.layer !== 'squelette') return [];
    return reps.filter((r) => r.bone === it.n && (!it.s || !r.s || r.s === it.s));
  }, [reps, pickedEntry]);
  const repNow = repsOn && rep ? boneReps.find((r) => r.id === rep) || null : null;
  useEffect(() => {
    api.current?.setMarks(repsOn ? boneReps : null, rep);
    api.current?.setTag(repNow?.p || null, repNow ? fullName({ n: repNow.n, s: repNow.h }) : '');
  }, [repsOn, boneReps, rep, repNow]);
  // Close enough to read the bone around the point: a fifth of the bone,
  // between 2 and 6 cm — the foramen ovale and the greater trochanter are not
  // looked at from the same distance.
  const lookAtRep = (r, boneId = picked) => {
    const box = boneId && api.current?.boxOf(boneId);
    const size = box ? Math.max(...box[1].map((v, i) => v - box[0][i])) : 0.1;
    api.current?.focusPoint(r.p, Math.min(0.06, Math.max(0.02, size * 0.2)), r.o);
  };
  useEffect(() => {
    api.current?.setMarkTap((id) => {
      const r = (reps || []).find((x) => x.id === id);
      if (r) { setRep(id); lookAtRep(r); }
    });
  });
  const pickRep = (r) => { setRep(r.id); lookAtRep(r); };
  const stepRep = (by) => {
    const i = boneReps.findIndex((r) => r.id === rep);
    const next = boneReps[(i + by + boneReps.length) % boneReps.length];
    if (next) pickRep(next);
  };
  // The bone by itself while its points are read: half of them are under a
  // muscle. What was on before comes back when the points are put away.
  const aloneBefore = useRef(null);
  const repsOff = () => {
    setRepsOn(false); setRep(null);
    if (aloneBefore.current !== null) { setAlone(aloneBefore.current); aloneBefore.current = null; }
  };
  const showReps = () => {
    if (repsOn) { repsOff(); return; }
    setRepsOn(true);
    if (aloneBefore.current === null) aloneBefore.current = alone;
    setAlone(true);
    if (picked) api.current?.frameId(picked);
  };

  // ----------------------------------------------------------- insertions
  const waitFor = (test, n = 60) => new Promise((resolve) => {
    const go = (k) => (test() || k > n ? resolve() : setTimeout(() => go(k + 1), 100));
    go(0);
  });
  const loadedLayer = (layer) => [...items.current.values()].some((e) => e.layer === layer);

  const showInsertions = async () => {
    if (ins) { setIns(null); return; }
    const entry = pickedEntry;
    if (!entry) return;
    await ensure('insertions');
    await waitFor(() => loadedLayer('insertions'));
    const all = [...items.current.values()].filter((e) => e.layer === 'insertions');
    const { item, layer } = entry;
    const ids = layer === 'squelette'
      ? all.filter((e) => e.item.o === item.n && (!item.s || !e.item.s || e.item.s === item.s)).map((e) => e.item.id)
      : all.filter((e) => sameMuscle(e.item.m, item.n) && (!item.s || !e.item.s || e.item.s === item.s)).map((e) => e.item.id);
    setIns({ ids: new Set(ids), of: item.id, none: !ids.length });
  };

  const toMuscle = async () => {
    const m = pickedEntry?.item?.m;
    if (!m) return;
    setState((p) => ({ ...p, muscles: { ...p.muscles, on: true, see: Math.max(p.muscles.see, 0.6) } }));
    await ensure('muscles');
    await waitFor(() => loadedLayer('muscles'));
    const side = pickedEntry.item.s;
    const hit = [...items.current.values()].find((e) => e.layer === 'muscles' && sameMuscle(e.item.n, m) && (!side || e.item.s === side));
    if (hit) choose(hit.item.id, true);
  };

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
    setAlone(false); setHidden([]); setIns(null);
  }

  const goRegion = (id) => {
    setRegion(id);
    const box = index?.regions?.[id];
    // A limb is looked at from the front and a little to its side.
    const from = id === 'membre-sup' || id === 'membre-inf' ? [0.45, 0.05, 1] : [0, 0.05, 1];
    if (box) api.current?.frame(box, from);
  };

  const showWhole = (on) => {
    setWhole(on);
    if (!index || !api.current) return;
    if (on) api.current.frame(index.regions.corps, [0, 0.05, 1]);
    else if (L?.box) api.current.frame(L.aim, L.from || [0, 0.05, 1]);
  };

  const reset = () => {
    setPicked(null); setHidden([]); setAlone(false); setFollow(false); setQuiz(null); setIns(null); setPanel(null); setCut(null);
    if (L?.layers) {
      const o = opening();
      setState((p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, { ...v, ...o[k] }])));
    } else {
      const first = start || S.start;
      applyView(VIEWS.find((v) => v.id === first) || VIEWS[0]);
    }
    setWhole(false);
    if (L) {
      if (index && api.current) {
        if (L.box) api.current.frame(L.aim, L.from || [0, 0.05, 1]);
        else api.current.frame(index.regions[S.home] || index.regions.corps, L.from || [0, 0.05, 1]);
      }
      // What the lesson opens with taken off goes back off.
      if (L.drop) setHidden([...items.current.values()].filter((e) => L.drop.test(e.item.n)).map((e) => e.item.id));
    } else goRegion(S.home);
  };

  // --------------------------------------------------------------- search
  const openSearch = async () => {
    setPanel('search');
    if (catalogue) return;
    const lists = await Promise.all(OFFERED.map((l) => fetch(`${ROOT}/${l.id}.json`)
      .then((r) => r.json()).then((m) => m.items.map((i) => ({ ...i, layer: l.id }))).catch(() => [])));
    // The landmarks too: «foramen ovale» is searched as often as a bone.
    const marks = (await loadReps()) || [];
    setCatalogue([...lists.flat(), ...marks.map((r) => ({ ...r, layer: 'reperes', k: 'mark', c: r.p }))]);
  };
  const found = useMemo(() => {
    if (!catalogue) return [];
    const q = fold(query);
    if (q.length < 2) return [];
    const ws = q.split(/\s+/);
    const hits = catalogue
      .filter((i) => whole || inLesson(L, i, i.layer))
      .filter((i) => { const n = fold(i.n); return ws.every((w) => n.includes(w)); });
    if (!L?.layers) return hits.slice(0, 60);
    // In a lesson, what the lesson shows comes first, and a name another
    // system also has is not offered twice: the ear lesson's stapes is the
    // scanner's, not the body's one hidden under it.
    const mine = (i) => (L.layers[i.layer] != null ? 0 : 1);
    const seen = new Set();
    return hits.sort((a, b) => mine(a) - mine(b)).filter((i) => {
      const key = fullName(i.layer === 'reperes' ? { n: i.n, s: i.s || i.h } : i);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 60);
  }, [catalogue, query, whole, L]);

  const jumpTo = async (hit) => {
    setPanel(null);
    if (hit.layer === 'reperes') {
      // A landmark: its bone picked, its dots on, the camera on the point.
      if (!state.squelette.on) setState((p) => ({ ...p, squelette: { ...p.squelette, on: true, see: Math.max(p.squelette.see, 0.8) } }));
      await ensure('squelette');
      const tryBone = (n = 0) => {
        const bone = [...items.current.values()].find((e) => e.layer === 'squelette' && e.item.n === hit.bone && (!hit.s || e.item.s === hit.s));
        if (bone) {
          choose(bone.item.id);
          setTimeout(() => {
            setRepsOn(true); setRep(hit.id);
            if (aloneBefore.current === null) aloneBefore.current = false;
            setAlone(true);
            lookAtRep(hit, bone.item.id);
          }, 0);
        } else if (n < 40) setTimeout(() => tryBone(n + 1), 100);
      };
      tryBone();
      return;
    }
    if (!state[hit.layer].on) setState((p) => ({ ...p, [hit.layer]: { ...p[hit.layer], on: true, see: Math.max(p[hit.layer].see, 0.6) } }));
    await ensure(hit.layer);
    // Waits for the geometry to be in the scene before aiming at it.
    const tryAim = (n = 0) => {
      if (api.current?.has(hit.id)) choose(hit.id, true);
      else if (n < 40) setTimeout(() => tryAim(n + 1), 100);
    };
    tryAim();
  };

  // ----------------------------------------------------------------- quiz
  const quizRef = useRef(quiz);
  quizRef.current = quiz;
  const quizLayers = (L?.quiz || OFFERED.map((l) => l.id)).filter((id) => layerOf(id) && !NOT_QUIZZED.has(id));
  const [setup, setSetup] = useState(() => ({
    layer: quizLayers.includes(S.quizLayer) ? S.quizLayer : quizLayers[0], region: S.all, mode: 'find',
  }));

  const poolFor = (layer, reg) => {
    const seenNames = new Set();
    const out = [];
    for (const { item, layer: l } of items.current.values()) {
      if (l !== layer) continue;
      if (L) { if (!whole && !inLesson(L, item, l)) continue; }
      else if (reg !== S.all && item.r !== reg) continue;
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
      const box = api.current?.boxOf(ids[0]);
      if (box) {
        const pad = 0.06;
        api.current.frame([box[0].map((v) => v - pad), box[1].map((v) => v + pad)]);
      }
    }
    setQuiz(next);
  };

  const startQuiz = async () => {
    const { layer, region: reg, mode } = setup;
    setPanel(null); setPicked(null); setAlone(false); setFollow(false); setHidden([]); setIns(null);
    setState((p) => ({ ...p, [layer]: { ...p[layer], on: true, see: 1 } }));
    await ensure(layer);
    await waitFor(() => poolFor(layer, reg).length > 0, 40);
    const pool = poolFor(layer, reg);
    if (pool.length < 4) { setQuiz({ empty: true }); return; }
    if (L) home(); else goRegion(reg);
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
  const busy = LAYERS.some((l) => state[l.id].on && state[l.id].loading);
  // A system from another source credits it while it is on, its licence one
  // tap away (the scanner's ear asks for its licence to travel with it).
  const credits = [...new Map(LAYERS.filter((l) => l.credit && state[l.id].on).map((l) => [l.credit, l.licence])).entries()];
  const extraCredit = credits.map(([c, licence]) => (
    <span key={c}> · {licence ? <a href={licence} target="_blank" rel="noreferrer">{c}</a> : c}</span>
  ));
  const toggle = (id) => setPanel((x) => (x === id ? null : id));
  const canInsert = set === 'corps' && p && (pLayer === 'squelette' || pLayer === 'muscles') && p.k !== 'tooth';

  return (
    <div className="bd" data-lesson={!!L} data-credits={credits.length || undefined}>
      <div className="bd-canvas" ref={host} />

      {/* Where to look: the body's regions, French because they are anatomy.
          A lesson has its own place and needs none of them. */}
      {!quiz && !L && (
        <div className="bd-regions" role="tablist" aria-label={t('المناطق')}>
          {REGIONS.map((r) => (
            <button key={r.id} role="tab" aria-selected={region === r.id} data-on={region === r.id}
              onClick={() => goRegion(r.id)} dir="ltr">{r.name}</button>
          ))}
        </div>
      )}

      {busy && <div className="bd-busy" role="status"><i />{t('يحمَّل…')}</div>}
      {error && <div className="bd-error" role="alert">{error}<button onClick={() => setError('')} aria-label={t('إغلاق')}><Icon name="x" size={16} /></button></div>}

      {/* ---------------- systems: on, off, and how see-through ---------------- */}
      {panel === 'layers' && (
        <section className="bd-panel">
          <div className="bd-panel-h">
            <b>{t('الأجهزة')}</b>
            <button onClick={() => setPanel(null)} aria-label={t('إغلاق')}><Icon name="x" size={18} /></button>
          </div>
          {L?.box && (
            <div className="bd-seg bd-scope">
              <button data-on={!whole} onClick={() => showWhole(false)}>{t('الدرس فقط')}</button>
              <button data-on={whole} onClick={() => showWhole(true)}>{t('الجسم كاملًا')}</button>
            </div>
          )}
          <div className="bd-cut">
            <b><Icon name="cut" size={16} />{t('قطع النموذج')}</b>
            <div className="bd-seg">
              <button data-on={!cut} onClick={() => chooseCut(null)}>{t('بلا')}</button>
              {CUTS.map(([axis, name]) => (
                <button key={axis} data-on={cut?.axis === axis} onClick={() => chooseCut(axis)} lang="fr">{name}</button>
              ))}
            </div>
          </div>
          {!L && (
            <div className="bd-views" dir="ltr">
              {VIEWS.map((v) => <button key={v.id} onClick={() => applyView(v)}>{v.name}</button>)}
            </div>
          )}
          <p className="bd-hint">{t('اسحب الشريط لترى ما تحت الطبقة: العضلات شفافة والأعصاب تحتها.')}</p>
          <ul className="bd-layers">
            {OFFERED.map((l) => {
              const s = state[l.id];
              const size = index?.layers?.[l.id];
              return (
                <li key={l.id} data-on={s.on}>
                  <button className="bd-eye" onClick={() => setState((pr) => ({ ...pr, [l.id]: { ...pr[l.id], on: !pr[l.id].on } }))}
                    aria-pressed={s.on} aria-label={l.name}>
                    <Icon name={s.on ? 'eye' : 'eyeOff'} size={19} />
                  </button>
                  <div className="grow">
                    <div className="bd-layer-t" dir="ltr">
                      <i style={{ background: TINT[l.tint] || 'transparent' }} />
                      <b>{l.name}</b>
                      <s>{s.loading ? t('يحمَّل…') : !s.loaded && size ? mb(size.bytes) : ''}</s>
                    </div>
                    <input type="range" dir="ltr" min="0.08" max="1" step="0.02" value={s.see} disabled={!s.on}
                      aria-label={t('شفافية {name}', { name: l.name })}
                      onChange={(e) => { const v = Number(e.target.value); setState((pr) => ({ ...pr, [l.id]: { ...pr[l.id], see: v } })); }} />
                  </div>
                </li>
              );
            })}
          </ul>
          {hidden.length > 0 && (
            <button className="bd-wide" onClick={() => setHidden([])}>{t('أعد البنى المخفية ({n})', { n: hidden.length })}</button>
          )}
          <p className="bd-credit-in" dir="ltr">{S.credit}{extraCredit}</p>
        </section>
      )}

      {/* ---------------- search ---------------- */}
      {panel === 'search' && (
        <section className="bd-panel bd-panel-search">
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
                  <i style={{ background: TINT[hit.k] || '#FFB020' }} />
                  <span className="grow" dir="ltr"><b>{fullName(hit.layer === 'reperes' ? { n: hit.n, s: hit.s || hit.h } : hit)}</b><s>{hit.layer === 'reperes' ? `Repère osseux · ${hit.bone}` : layerOf(hit.layer)?.name}{hit.r ? ` · ${regionName(hit.r)}` : ''}</s></span>
                </button>
              </li>
            ))}
          </ul>
          {catalogue && query.length >= 2 && !found.length && <p className="bd-hint">{t('لا نتيجة. اكتب الاسم بالفرنسية.')}</p>}
        </section>
      )}

      {/* ---------------- the lecture's drawings ---------------- */}
      {panel === 'planches' && (
        <section className="bd-panel">
          <div className="bd-panel-h">
            <b>{t('اللوحات')}</b>
            <button onClick={() => setPanel(null)} aria-label={t('إغلاق')}><Icon name="x" size={18} /></button>
          </div>
          <div className="bd-plates">
            {plates.map((pl, i) => (
              <button key={pl.id} onClick={() => setPlate(i)}>
                <span><img src={`/planches/${pl.id}-t.webp`} alt="" loading="lazy" /></span>
                <b dir="ltr">{pl.t}</b>
              </button>
            ))}
          </div>
          <p className="bd-credit-in" dir="ltr">Servier Medical Art, CC BY 4.0</p>
        </section>
      )}
      {plate != null && plates[plate] && (
        <PlateViewer
          key={plates[plate].id}
          plate={plates[plate]}
          index={plate + 1} total={plates.length}
          onClose={() => setPlate(null)}
          onStep={(d) => setPlate((i) => (i + d + plates.length) % plates.length)}
        />
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
          {quizLayers.length > 1 && (
            <>
              <div className="bd-q-label">{t('الجهاز')}</div>
              <div className="bd-chips" dir="ltr">
                {quizLayers.map((id) => (
                  <button key={id} data-on={setup.layer === id} onClick={() => setSetup((s) => ({ ...s, layer: id }))}>{layerOf(id).name}</button>
                ))}
              </div>
            </>
          )}
          {!L && (
            <>
              <div className="bd-q-label">{t('المنطقة')}</div>
              <div className="bd-chips" dir="ltr">
                {REGIONS.map((r) => (
                  <button key={r.id} data-on={setup.region === r.id} onClick={() => setSetup((s) => ({ ...s, region: r.id }))}>{r.name}</button>
                ))}
              </div>
            </>
          )}
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
              <s>{[p.s ? SIDE[p.s] : null, p.o ? `sur : ${p.o}` : null, layerOf(pLayer)?.name, p.r ? regionName(p.r) : null].filter(Boolean).join(' · ')}</s>
            </div>
            <button onClick={() => choose(null)} aria-label={t('إغلاق')}><Icon name="x" size={18} /></button>
          </div>
          <div className="bd-acts">
            <button data-on={alone} onClick={() => setAlone((a) => !a)}>{alone ? t('أظهر الكل') : t('اعزل')}</button>
            <button onClick={() => { setHidden((h) => [...h, p.id]); setPicked(null); setIns(null); }}>{t('أخفِ')}</button>
            {THIN.has(pLayer) && (
              <button data-on={follow} onClick={() => setFollow((f) => !f)}>{t('تتبّع مساره')}</button>
            )}
            {canInsert && (
              <button data-on={!!ins} onClick={showInsertions}>
                <i className="bd-ins-dot" />{pLayer === 'squelette' ? t('الارتكازات العضلية') : t('مواضع الارتكاز')}
              </button>
            )}
            {pLayer === 'insertions' && <button onClick={toMuscle}>{t('العضلة')}</button>}
            {boneReps.length > 0 && (
              <button data-on={repsOn} onClick={showReps}><i className="bd-rep-dot" />{t('المعالم ({n})', { n: boneReps.length })}</button>
            )}
            <button data-on={reading} onClick={() => setReading((r) => !r)}>{t('الوصف')}</button>
            {/* The drawings of the same system, as an atlas page beside the specimen. */}
            {!L && GROUPS_OF_LAYER[pLayer] && (
              <Link href={`/anatomie/planches?g=${GROUPS_OF_LAYER[pLayer][0]}`}>{t('اللوحات')}</Link>
            )}
          </div>
          {/* One point at a time, stepped through like the pages of a plate;
              the list is one tap away. */}
          {repNow && (
            <div className="bd-rep-now" dir="ltr" lang="fr">
              <div className="bd-rep-step">
                <button onClick={() => stepRep(-1)} aria-label={t('السابق')}>‹</button>
                <div className="grow">
                  <b>{repNow.n}</b>
                  <s>{[repNow.h ? SIDE[repNow.h] : null, `${boneReps.indexOf(repNow) + 1} / ${boneReps.length}`].filter(Boolean).join(' · ')}</s>
                </div>
                <button onClick={() => stepRep(1)} aria-label={t('التالي')}>›</button>
              </div>
              {repNow.t && (
                <div className="bd-through"><b>Éléments qui le traversent</b><ul>{repNow.t.map((x) => <li key={x}>{x}</li>)}</ul></div>
              )}
              <button className="bd-rep-all" onClick={() => setRep(null)}>{t('كل المعالم')}</button>
            </div>
          )}
          {repsOn && !repNow && (
            <ul className="bd-reps" dir="ltr" lang="fr">
              {boneReps.map((r) => (
                <li key={r.id}>
                  <button onClick={() => pickRep(r)}><i />{r.n}{r.h ? <s> — {SIDE[r.h]}</s> : null}</button>
                </li>
              ))}
            </ul>
          )}
          {ins?.none && <p className="bd-hint">{t('لا ارتكازات مرسومة لهذه البنية.')}</p>}
          {ins && !ins.none && (
            <p className="bd-legend"><i className="o" />{t('المنشأ')}<i className="e" />{t('الانتهاء')}</p>
          )}
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

      {!p && !panel && !quiz && !touched && (
        <p className="bd-tip">{t('أدِر الجسم بإصبع، وكبّر بإصبعين، والمس أي بنية لتعرف اسمها')}</p>
      )}

      {/* ---------------- the cut, slid while looking ---------------- */}
      {/* Under an open panel it would cover the panel's own controls. */}
      {cut && !panel && (
        <div className="bd-cutbar" dir="ltr">
          <Icon name="cut" size={18} />
          <span lang="fr">{CUT_NAME[cut.axis]}</span>
          <input type="range" min="0" max="1" step="0.005" value={cut.at}
            onChange={(e) => { const at = Number(e.target.value); setCut((c) => (c ? { ...c, at } : c)); }}
            aria-label={t('موضع القطع')} />
          <button onClick={flipCut} aria-label={t('اقلب الجهة الباقية')}><Icon name="swap" size={18} /></button>
          <button onClick={() => setCut(null)} aria-label={t('أزل القطع')}><Icon name="x" size={16} /></button>
        </div>
      )}

      {/* ---------------- the tools, one row, each with its name ----------------
          and the credit under them, however many lines it takes. */}
      <div className="bd-foot">
      <nav className="bd-dock" aria-label={t('أدوات النموذج')}>
        <button onClick={() => toggle('layers')} data-on={panel === 'layers'}>
          <Icon name="layers" size={22} /><s>{t('الأجهزة')}</s>
        </button>
        <button onClick={() => (panel === 'search' ? setPanel(null) : openSearch())} data-on={panel === 'search'}>
          <Icon name="search" size={22} /><s>{t('بحث')}</s>
        </button>
        {plates.length > 0 && (
          <button onClick={() => toggle('planches')} data-on={panel === 'planches'}>
            <Icon name="images" size={22} /><s>{t('اللوحات')}</s>
          </button>
        )}
        <button onClick={() => { setQuiz(null); toggle('quiz'); }} data-on={panel === 'quiz' || !!quiz}>
          <Icon name="target" size={22} /><s>{t('اختبار')}</s>
        </button>
        <button onClick={reset}>
          <Icon name="again" size={22} /><s>{t('إعادة')}</s>
        </button>
      </nav>
      <p className="bd-credit" dir="ltr">{S.credit}{extraCredit}</p>
      </div>
    </div>
  );
}
