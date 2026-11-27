'use client';

// A post's photo, over everything (owner, 2026-11-27: a shared photo «you
// cannot click it, you cannot zoom it, you cannot install it»).
//
// Tapped in the feed, it opens here: the whole picture, uncropped, on black
// like the phone's own gallery; two fingers zoom, a double tap zooms where it
// lands, a swipe goes to the post's next photo. Below it, what this phone can
// do with it (lib/saveFile.js) — download, share, or on an iPhone the one
// sheet that does both. A phone that can do neither shows neither.

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { useT } from './Lang';
import { useZoom } from '@/lib/useZoom';
import { fileAbility, prepare, downloadFile, shareFile } from '@/lib/saveFile';

export default function PhotoViewer({ photos, start = 0, name = 'MyPromo', onClose }) {
  const t = useT();
  const [at, setAt] = useState(start);
  const box = useRef(null);
  const step = useCallback((d) => setAt((i) => Math.min(photos.length - 1, Math.max(0, i + d))), [photos.length]);
  const [view, setView] = useZoom(box, step);
  const [can, setCan] = useState({ download: false, share: false, saveInShare: false });
  const [busy, setBusy] = useState('');
  const [note, setNote] = useState('');
  const photo = photos[at];
  const file = photos.length > 1 ? `${name}-${at + 1}` : name;

  useEffect(() => { setCan(fileAbility('image/jpeg')); }, []);
  // A new photo starts whole, and is fetched now so a tap on «share» can
  // open the sheet at once (Safari refuses one that waited for a download).
  useEffect(() => {
    setView({ s: 1, x: 0, y: 0 });
    setNote('');
    if (can.download || can.share) prepare(photo.url, file).catch(() => {});
  }, [at, can, photo.url, file, setView]);

  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', key);
    const had = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = had; };
  }, [onClose, step]);

  const act = async (which) => {
    if (busy) return;
    setBusy(which); setNote('');
    try {
      if (which === 'download') {
        const { where } = await downloadFile(photo.url, file);
        if (where) setNote(t('حُفظت في {where}', { where }));
      } else {
        await shareFile(photo.url, file, name);
      }
    } catch {
      setNote(t('تعذّر ذلك، حاول مرة أخرى.'));
    } finally {
      setBusy('');
    }
  };

  return createPortal(
    <div className="ph-view" role="dialog" aria-modal="true" aria-label={t('صورة')}>
      <div className="ph-top">
        <button onClick={onClose} aria-label={t('إغلاق')}><Icon name="x" size={22} /></button>
        {photos.length > 1 && <span className="ph-count" dir="ltr">{at + 1} / {photos.length}</span>}
      </div>
      <div className="ph-stage" ref={box}>
        <img src={photo.url} alt="" draggable={false}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})` }} />
      </div>
      {note && <p className="ph-note" role="status">{note}</p>}
      {(can.download || can.share) && (
        <div className="ph-foot">
          {can.download && (
            <button onClick={() => act('download')} disabled={!!busy}>
              <Icon name="download" size={20} /><span>{t('تنزيل')}</span>
            </button>
          )}
          {can.share && (
            <button onClick={() => act('share')} disabled={!!busy}>
              <Icon name="share" size={20} /><span>{can.saveInShare ? t('احفظ أو شارك') : t('مشاركة')}</span>
            </button>
          )}
        </div>
      )}
    </div>,
    document.body,
  );
}
