'use client';

// Planches d'anatomie: the drawings, by system, and one of them full screen.
//
// A plate is looked at closely, so the viewer zooms the way a phone's photo
// app does — two fingers to zoom, one to move once zoomed, a double tap for
// 2.5× and back — and a swipe goes to the next plate when it is not zoomed.
// The grid keeps each plate's shape (public/planches/sizes.json) so nothing
// jumps as the thumbnails arrive.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useZoom } from '@/lib/useZoom';
import Icon from '@/components/Icon';
import { useT } from '@/components/Lang';
import { GROUPS, PLANCHES, PLANCHES_CREDIT } from '@/lib/anatomy/planches';
import { fold } from '@/lib/anatomy/body';

const groupName = (id) => GROUPS.find((g) => g.id === id)?.name || '';

export default function Planches({ sizes = {}, group = null, open: first = null }) {
  const t = useT();
  const [g, setG] = useState(GROUPS.some((x) => x.id === group) ? group : 'tout');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(() => (first ? PLANCHES.findIndex((p) => p.id === first) : -1));

  const shown = useMemo(() => {
    const words = fold(q).split(/\s+/).filter(Boolean);
    // A search looks through every system: typing «rein» while «Cœur» is
    // chosen should find the kidney, not nothing.
    return PLANCHES.filter((p) => (words.length || g === 'tout' || p.g === g)
      && words.every((w) => fold(p.t).includes(w)));
  }, [g, q]);

  // The viewer walks the plates in view, so «next» stays inside the system.
  const at = open >= 0 ? shown.findIndex((p) => p.id === PLANCHES[open]?.id) : -1;
  const step = (d) => {
    if (at < 0 || !shown.length) return;
    const next = shown[(at + d + shown.length) % shown.length];
    setOpen(PLANCHES.findIndex((p) => p.id === next.id));
  };

  return (
    <>
      <div className="pl-tools">
        <div className="pl-search">
          <Icon name="search" size={17} />
          <input value={q} onChange={(e) => setQ(e.target.value)} dir="auto"
            placeholder={t('ابحث بالفرنسية — cœur، rein…')} aria-label={t('ابحث في اللوحات')} />
        </div>
        <div className="pl-chips" dir="ltr">
          {[{ id: 'tout', name: 'Tout' }, ...GROUPS].map((x) => (
            <button key={x.id} data-on={g === x.id} onClick={() => setG(x.id)}>{x.name}</button>
          ))}
        </div>
      </div>

      <div className="scroll pl-grid">
        {shown.map((p) => {
          const [w, h] = sizes[p.id] || [1, 1];
          return (
            <button key={p.id} className="pl-card" onClick={() => setOpen(PLANCHES.indexOf(p))}>
              <span className="pl-thumb" style={{ aspectRatio: `${w} / ${Math.min(h, w * 1.6)}` }}>
                <img src={`/planches/${p.id}-t.webp`} alt={p.t} loading="lazy" />
              </span>
              <b dir="ltr">{p.t}</b>
              <s dir="ltr">{groupName(p.g)}</s>
            </button>
          );
        })}
        {!shown.length && <p className="pl-none">{t('لا لوحة بهذا الاسم.')}</p>}
        <p className="pl-credit" dir="ltr">{PLANCHES_CREDIT}</p>
      </div>

      {open >= 0 && PLANCHES[open] && (
        <Viewer
          key={PLANCHES[open].id}
          plate={PLANCHES[open]}
          index={at + 1} total={shown.length}
          onClose={() => setOpen(-1)} onStep={step}
        />
      )}
    </>
  );
}

// Also opened from a lesson in 3D, over the model, with that lesson's plates.
export function Viewer({ plate, index, total, onClose, onStep }) {
  const t = useT();
  const box = useRef(null);
  const [view] = useZoom(box, onStep);

  // Escape and the arrow keys, for a laptop.
  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', key);
    const had = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = had; };
  }, [onClose, onStep]);

  return (
    <div className="pl-view" role="dialog" aria-modal="true" aria-label={plate.t}>
      <div className="pl-view-top">
        <button onClick={onClose} aria-label={t('إغلاق')}><Icon name="x" size={20} /></button>
        <div className="grow" dir="ltr">
          <b>{plate.t}</b>
          <s>{groupName(plate.g)}{total ? ` · ${index} / ${total}` : ''}</s>
        </div>
      </div>
      <div className="pl-stage" ref={box}>
        <img src={`/planches/${plate.id}.webp`} alt={plate.t} draggable={false}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})` }} />
      </div>
      <div className="pl-view-foot">
        <button onClick={() => onStep(-1)} aria-label={t('السابقة')}><Icon name="chevR" size={20} /></button>
        <p dir="ltr">
          {PLANCHES_CREDIT} ·{' '}
          <a href={`https://smart.servier.com/smart_image/${plate.id}/`} target="_blank" rel="noreferrer">source</a>
        </p>
        <button onClick={() => onStep(1)} aria-label={t('التالية')}><Icon name="chev" size={20} /></button>
      </div>
    </div>
  );
}
