'use client';

// How a file is read, and how much of the screen it gets.
//
// One way only: Google draws the pages and sends pictures, so a 40 MB scan
// starts at once instead of arriving whole. There used to be a second reader
// of our own for the small files, and a switch between them; it had to fetch
// the whole document before drawing anything, and students found it slow, so
// it went.
//
// That reader is back for one case only: a lecture the student keeps in the
// app is read from التنزيلات, where the whole file is already there. Reading
// here stays Google's preview.
//
// «تنزيل» in the bar asks where (owner, 2026-11-27: downloaded lectures
// «shouldn't be stuck in the app»): onto the phone itself, under a name the
// student types (lib/saveFile.js), or kept in the app as before.

import { useEffect, useState } from 'react';
import Link from '@/components/Link';
import Sheet from '@/components/Sheet';
import QuickView from '@/components/QuickView';
import Icon from '@/components/Icon';
import { opened } from '@/lib/resume';
import { useT } from '@/components/Lang';
import { edgeToEdge } from '@/components/StatusBar';
import { download, isDownloaded } from '@/lib/downloads';
import { saveLecture, lectureNamed } from '@/lib/saveFile';

export default function Reader({ fid, src, title, subject = null, ext = null }) {
  const t = useT();
  const [full, setFull] = useState(false);  // الصفحات وحدها
  // Kept on this phone (lib/downloads.js): null while unknown, then a percent
  // while it comes down, true once it is here.
  const [kept, setKept] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { isDownloaded(fid).then((yes) => setKept(yes || false)).catch(() => setKept(false)); }, [fid]);
  const [asking, setAsking] = useState(false);   // the sheet: onto the phone, or kept in the app
  const [name, setName] = useState('');
  const [named, setNamed] = useState(true);      // whether the phone will take the name typed
  useEffect(() => { setNamed(lectureNamed()); }, []);
  const pdf = !ext || /pdf/i.test(ext);
  const dot = (ext || 'pdf').toLowerCase().replace(/^\./, '');

  const ask = () => { setName(title || ''); setAsking(true); };
  const toPhone = () => {
    saveLecture(fid, `${name.trim() || title || 'MyPromo'}.${dot}`);
    setAsking(false);
  };

  const keep = async () => {
    setFailed(false);
    setKept(0);
    try {
      await download({ fid, title, subject }, (p) => setKept(p));
      setKept(true);
    } catch {
      setKept(false);
      setFailed(true);
    }
  };

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
        {typeof kept === 'number' ? (
          <span className="pdf-full wide pdf-dl" aria-live="polite">
            <Icon name="download" size={18} />{' '}{kept}%</span>
        ) : (
          <button className={`pdf-full wide pdf-dl${kept === true ? ' done' : ''}`} onClick={ask}>
            <Icon name={kept === true ? 'check' : 'download'} size={18} />{' '}
            {failed ? t('تعذّر التنزيل، أعد المحاولة') : kept === true ? t('في التنزيلات') : t('تنزيل')}</button>
        )}
      </div>

      {asking && (
        <Sheet onClose={() => setAsking(false)}>
          <div className="sheet-say"><b dir="auto">{title}</b></div>
          {named && (
            <label className="sheet-name">
              <span>{t('الاسم على الهاتف')}</span>
              {/* A file name ends with its extension, on the right, whatever
                  language the name itself is in. */}
              <span className="sheet-name-row" dir="ltr">
                <input value={name} onChange={(e) => setName(e.target.value)} dir="auto" maxLength={140}
                  enterKeyHint="done" onKeyDown={(e) => { if (e.key === 'Enter') toPhone(); }} />
                <i dir="ltr">.{dot}</i>
              </span>
            </label>
          )}
          <button className="sheet-act" onClick={toPhone}>
            <Icon name="download" size={20} />{t('احفظ على الهاتف')}
          </button>
          {pdf && (kept === true ? (
            <Link className="sheet-act" href="/downloads">
              <Icon name="check" size={20} />{t('في التنزيلات')}
            </Link>
          ) : typeof kept === 'number' ? (
            <span className="sheet-act" role="status" aria-live="polite">
              <Icon name="archive" size={20} /><span dir="ltr">{kept}%</span>
            </span>
          ) : (
            <button className="sheet-act" onClick={keep} disabled={kept === null}>
              <Icon name="archive" size={20} />{t('احفظ في التطبيق')}
            </button>
          ))}
          <button className="sheet-act quiet" onClick={() => setAsking(false)}>{t('إلغاء')}</button>
        </Sheet>
      )}

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
