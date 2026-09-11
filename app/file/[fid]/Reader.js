'use client';

// Which way to read this file, and how much of the screen it gets.
//
// Quick view first for anything big: Google draws the pages and sends
// pictures, so a 40 MB scan starts immediately instead of arriving in full.
// Our own renderer for the rest, and for anyone who asks — it has our fonts
// and our page handling, it just has to fetch the whole document first.
//
// The choice is remembered per device: a student who prefers one should not
// have to say so on every lecture.

import { useEffect, useState } from 'react';
import PdfViewer from '@/components/PdfViewer';
import QuickView from '@/components/QuickView';
import Icon from '@/components/Icon';

const REMEMBER = 'mypromo.reader';

// Below this our renderer arrives fast enough that its better typography and
// its page handling are worth the wait.
const BIG = 8 * 1024 * 1024;

// How far a page may be taken. Below 1 it is smaller than the screen, which
// is how you see a whole page at once; above it, it is drawn again bigger
// rather than stretched, which is how you read the small print on a scan.
const NEAREST = 0.6;
const FURTHEST = 3;
const STEP = 1.25;
const hold = (z) => Math.min(FURTHEST, Math.max(NEAREST, z));

export default function Reader({ fid, src, title, bytes }) {
  const [mode, setMode] = useState(null);   // null until the device is read
  const [full, setFull] = useState(false);  // الصفحات وحدها
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem(REMEMBER); } catch {}
    setMode(saved === 'app' || saved === 'quick'
      ? saved
      : (bytes && bytes > BIG ? 'quick' : 'app'));
  }, [bytes]);

  const choose = (next) => {
    setMode(next);
    try { localStorage.setItem(REMEMBER, next); } catch {}
  };

  // Two things happen at once, because neither is enough on its own.
  //
  // The class is ours. It takes away the header and this bar, drops the width
  // the page is held to, and works in every browser — which matters, because
  // the one that refuses the other half must still end up with a full screen
  // of pages rather than nothing having happened.
  //
  // Fullscreen is the browser's, and it takes away the address bar too. On a
  // tablet held sideways that is the inch that decides whether a page fits.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('only-pages', full);
    return () => root.classList.remove('only-pages');
  }, [full]);

  // Our button is not the only way out. Escape, the back gesture and the
  // browser's own control all end fullscreen without telling React, and a
  // screen still wearing the class after that has no header and no way back.
  useEffect(() => {
    const sync = () => { if (!document.fullscreenElement) setFull(false); };
    const key = (e) => { if (e.key === 'Escape') setFull(false); };
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('fullscreenchange', sync);
      document.removeEventListener('keydown', key);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  // A browser that has never heard of it returns nothing rather than a
  // promise, and a browser that refuses rejects one. Both are fine: the class
  // has already done the half that always works.
  const settle = (p) => { if (p && p.catch) p.catch(() => {}); };

  const enter = () => {
    setFull(true);
    settle(document.documentElement.requestFullscreen?.());
  };

  const leave = () => {
    setFull(false);
    // Back to the size of the screen. A document left at 240% would come back
    // to a header and a bar with the pages running off the side of both, and
    // nothing on that screen says why.
    setZoom(1);
    if (document.fullscreenElement) settle(document.exitFullscreen());
  };

  if (!mode) return <div className="pdf-msg"><div className="spinner" /></div>;

  return (
    <>
      {/* At the top, where a thumb reaches it and nothing covers it. */}
      <div className="pdf-bar">
        <button className="pdf-switch" onClick={() => choose(mode === 'quick' ? 'app' : 'quick')}>
          {mode === 'quick' ? 'افتحه داخل التطبيق بدل ذلك' : 'العرض السريع — أسرع للملفات الكبيرة'}
        </button>
        <button className="pdf-full" onClick={enter} aria-label="ملء الشاشة" title="ملء الشاشة">
          <Icon name="expand" size={19} />
        </button>
      </div>

      {mode === 'quick'
        ? <QuickView fid={fid} onFallback={() => choose('app')} />
        : <PdfViewer
            src={src} title={title} zoom={zoom}
            /* Two fingers only where there is a way back out of what they
               do. Outside ملء الشاشة the width is the column's to decide. */
            onZoom={full ? (z) => setZoom(hold(z)) : undefined} />}

      {/* The only things drawn over the pages, and among them the only way
          back to the rest of the screen — so they stay put rather than fading
          out after a few seconds onto a page that then looks like a dead
          end. */}
      {full && (
        <div className="pdf-tools">
          {/* العرض السريع is Google's viewer in a frame: it has its own
              zoom inside it, and nothing out here can reach into it. */}
          {mode === 'app' && (
            <div className="pdf-zoom">
              <button onClick={() => setZoom((z) => hold(z / STEP))}
                disabled={zoom <= NEAREST + 0.001} aria-label="تصغير">
                <Icon name="minus" size={18} />
              </button>
              {/* The number is the way back to the size of the screen. */}
              <button className="pdf-zoom-n" onClick={() => setZoom(1)}
                aria-label="ملء عرض الشاشة">
                {Math.round(zoom * 100)}%
              </button>
              <button onClick={() => setZoom((z) => hold(z * STEP))}
                disabled={zoom >= FURTHEST - 0.001} aria-label="تكبير">
                <Icon name="plus" size={18} />
              </button>
            </div>
          )}
          <button className="pdf-out" onClick={leave} aria-label="إنهاء ملء الشاشة">
            <Icon name="shrink" size={20} />
          </button>
        </div>
      )}
    </>
  );
}
