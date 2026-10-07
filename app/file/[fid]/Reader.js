'use client';

// How a file is read, and how much of the screen it gets.
//
// One way only: Google draws the pages and sends pictures, so a 40 MB scan
// starts at once instead of arriving whole. There used to be a second reader
// of our own for the small files, and a switch between them; it had to fetch
// the whole document before drawing anything, and students found it slow, so
// it went.

import { useEffect, useState } from 'react';
import QuickView from '@/components/QuickView';
import Icon from '@/components/Icon';
import { opened } from '@/lib/resume';
import { useT } from '@/components/Lang';

export default function Reader({ fid, src, title, subject = null }) {
  const t = useT();
  const [full, setFull] = useState(false);  // الصفحات وحدها

  // Opening a lecture is what «تابع من حيث توقّفت» is made of, and this is
  // the moment it happens. Recorded in the browser, not on the server — the
  // reasoning is in lib/resume.js.
  useEffect(() => { opened({ fid, title, subject }); }, [fid, title, subject]);

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
    if (document.fullscreenElement) settle(document.exitFullscreen());
  };

  return (
    <>
      {/* At the top, where a thumb reaches it and nothing covers it. */}
      <div className="pdf-bar">
        <button className="pdf-full wide" onClick={enter} aria-label={t('ملء الشاشة')}>
          <Icon name="expand" size={18} />{' '}{t('ملء الشاشة')}</button>
      </div>

      <QuickView fid={fid} src={src} />

      {/* The only thing drawn over the pages, and the only way back to the
          rest of the screen — so it stays put rather than fading out after a
          few seconds onto a page that then looks like a dead end. */}
      {full && (
        <div className="pdf-tools">
          <button className="pdf-out" onClick={leave} aria-label={t('إنهاء ملء الشاشة')}>
            <Icon name="shrink" size={20} />
          </button>
        </div>
      )}
    </>
  );
}
