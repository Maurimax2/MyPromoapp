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
import { edgeToEdge } from '@/components/StatusBar';

export default function Reader({ fid, src, title, subject = null }) {
  const t = useT();
  const [full, setFull] = useState(false);  // الصفحات وحدها

  // Opening a lecture is what «تابع من حيث توقّفت» is made of, and this is
  // the moment it happens. Recorded in the browser, not on the server — the
  // reasoning is in lib/resume.js.
  useEffect(() => { opened({ fid, title, subject }); }, [fid, title, subject]);

  // Full screen is ours alone. The class takes away the header and this bar and
  // drops the width the page is held to, and that is all of it. The browser's
  // own fullscreen used to be asked for as well, and inside the phone app it
  // put up a banner naming the website's address over the pages — the one
  // moment the app admitted to being a website. Escape and the button still
  // end it.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('only-pages', full);
    // Inside the app, the clock goes too, the way a reader app does it.
    let bars = null;
    let over = false;
    if (full && edgeToEdge()) {
      import('@capacitor/core').then(({ SystemBars }) => {
        if (over) return;
        bars = SystemBars;
        SystemBars.hide({ bar: 'StatusBar' }).catch(() => {});
      }).catch(() => {});
    }
    return () => {
      over = true;
      root.classList.remove('only-pages');
      bars?.show({ bar: 'StatusBar' }).catch(() => {});
    };
  }, [full]);

  useEffect(() => {
    const key = (e) => { if (e.key === 'Escape') setFull(false); };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, []);

  const enter = () => setFull(true);
  const leave = () => setFull(false);

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
