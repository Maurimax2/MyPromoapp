'use client';

// Which way to read this file.
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

const REMEMBER = 'mypromo.reader';

// Below this our renderer arrives fast enough that its better typography and
// its page handling are worth the wait.
const BIG = 8 * 1024 * 1024;

export default function Reader({ fid, src, title, bytes }) {
  const [mode, setMode] = useState(null);   // null until the device is read

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

  if (!mode) return <div className="pdf-msg"><div className="spinner" /></div>;

  return (
    <>
      {/* At the top, where a thumb reaches it and nothing covers it. */}
      <button className="pdf-switch" onClick={() => choose(mode === 'quick' ? 'app' : 'quick')}>
        {mode === 'quick' ? 'افتحه داخل التطبيق بدل ذلك' : 'العرض السريع — أسرع للملفات الكبيرة'}
      </button>

      {mode === 'quick'
        ? <QuickView fid={fid} onFallback={() => choose('app')} />
        : <PdfViewer src={src} title={title} />}
    </>
  );
}
