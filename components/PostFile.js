'use client';

// A PDF in a post (owner, 2026-11-27: «hold on it and install it either on
// your phone or save it inside the app»).
//
// Tapped, it opens on our own screen, in Google's preview like every file a
// student reads online (CLAUDE.md, «One way to read a file»). It used to be a
// plain link to the stored file: the iPhone app handed it to Safari, and
// Android's web view, which cannot show a PDF, did nothing at all.
//
// Held — a long press on a phone, a right click on a computer — it offers the
// two places to keep it:
// - the phone itself (lib/saveFile.js): a download under its name, the share
//   sheet's «Enregistrer dans Fichiers» on an iPhone, and in the store apps
//   the phone's browser, which can save where the shell cannot;
// - the app's own التنزيلات (lib/downloads.js), where our reader opens it with
//   no connection, the same as a downloaded lecture.

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from './Link';
import Sheet from './Sheet';
import Icon from './Icon';
import { useT } from './Lang';
import { fileAbility, downloadFile, shareFile } from '@/lib/saveFile';
import { download, isDownloaded } from '@/lib/downloads';

// Long enough not to be a tap, short enough not to feel stuck.
const HOLD = 480;
const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

export default function PostFile({ m, subject, shades }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [look, setLook] = useState(false);
  const [can, setCan] = useState({ download: false, share: false });
  const [kept, setKept] = useState(null);   // null | 'no' | 'yes' | a percentage while it comes
  const [err, setErr] = useState('');
  const timer = useRef(0);
  const from = useRef(null);
  const held = useRef(false);
  const fid = `post:${m.path}`;
  const name = m.name || 'MyPromo.pdf';

  useEffect(() => { setCan(fileAbility('application/pdf')); }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    isDownloaded(fid)
      .then((y) => setKept((k) => (typeof k === 'number' ? k : y ? 'yes' : 'no')))
      .catch(() => setKept('no'));
  }, [open, fid]);

  const show = () => {
    clearTimeout(timer.current);
    if (held.current) return;   // the long press and the context menu both ask
    held.current = true;
    try { navigator.vibrate?.(15); } catch { /* not a phone */ }
    setErr('');
    setOpen(true);
  };
  const down = (e) => {
    held.current = false;
    from.current = { x: e.clientX, y: e.clientY };
    clearTimeout(timer.current);
    timer.current = setTimeout(show, HOLD);
  };
  // A finger that moves is scrolling the feed, not holding the file.
  const move = (e) => {
    const f = from.current;
    if (f && Math.hypot(e.clientX - f.x, e.clientY - f.y) > 10) clearTimeout(timer.current);
  };
  const up = () => { clearTimeout(timer.current); from.current = null; };
  const close = () => { setOpen(false); held.current = false; };

  const tap = (e) => {
    // A computer's ctrl- or cmd-click still opens a tab, as a link should.
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (held.current) { held.current = false; return; }
    setLook(true);
  };

  const toPhone = async () => {
    setErr('');
    try {
      if (can.download) await downloadFile(m.url, name, 'application/pdf');
      else await shareFile(m.url, name, name, 'application/pdf');
      close();
    } catch {
      setErr(t('تعذّر ذلك، حاول مرة أخرى.'));
    }
  };
  const toApp = async () => {
    setErr('');
    setKept(0);
    try {
      await download({ fid, title: name.replace(/\.pdf$/i, ''), subject, url: m.url }, setKept);
      setKept('yes');
    } catch {
      setKept('no');
      setErr(t('تعذّر ذلك، حاول مرة أخرى.'));
    }
  };

  return (
    <>
      <a className="pv-file" href={m.url} target="_blank" rel="noreferrer"
         style={{ '--a': shades.a, '--b': shades.b }}
         onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}
         onContextMenu={(e) => { e.preventDefault(); show(); }}
         onClick={tap}>
        <span className="grow">
          <b dir="ltr">{m.name || t('ملف')}</b>
          <span dir="ltr">{mb(m.bytes)}</span>
        </span>
        <span className="pv-paper" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      </a>

      {look && (
        <Look url={m.url} name={name} onClose={() => setLook(false)}
          onKeep={() => { setLook(false); held.current = false; show(); }} />
      )}

      {open && (
        <Sheet onClose={close}>
          <div className="sheet-say"><b dir="ltr">{name}</b></div>
          {(can.download || can.share) && (
            <button className="sheet-act" onClick={toPhone}>
              <Icon name="download" size={20} />{t('احفظ على الهاتف')}
            </button>
          )}
          {kept === 'yes' ? (
            <Link className="sheet-act" href="/downloads">
              <Icon name="check" size={20} />{t('في التنزيلات')}
            </Link>
          ) : typeof kept === 'number' ? (
            <span className="sheet-act" role="status" aria-live="polite">
              <Icon name="archive" size={20} /><span dir="ltr">{kept}%</span>
            </span>
          ) : (
            <button className="sheet-act" onClick={toApp} disabled={kept === null}>
              <Icon name="archive" size={20} />{t('احفظ في التطبيق')}
            </button>
          )}
          {err && <p className="sheet-err">{err}</p>}
          <button className="sheet-act quiet" onClick={close}>{t('إلغاء')}</button>
        </Sheet>
      )}
    </>
  );
}

// The PDF on our own screen. A posted file is not on Drive, so it is Google's
// document viewer rather than Drive's preview — the same pages drawn by
// Google, framed here. That viewer now and then answers with an empty page,
// so it can be asked again; one that never loads at all gives way to keeping
// the file instead, as a lecture's preview does.
function Look({ url, name, onClose, onKeep }) {
  const t = useT();
  const [round, setRound] = useState(0);
  const [failed, setFailed] = useState(false);
  const frame = useRef(null);

  useEffect(() => {
    const key = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key);
    const had = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = had; };
  }, [onClose]);

  useEffect(() => {
    setFailed(false);
    const late = setTimeout(() => { if (!frame.current?.dataset.loaded) setFailed(true); }, 10000);
    return () => clearTimeout(late);
  }, [round]);

  return createPortal(
    <div className="pf-view" role="dialog" aria-modal="true" aria-label={name}>
      <div className="pf-top">
        <button onClick={onClose} aria-label={t('إغلاق')}><Icon name="x" size={20} /></button>
        <b dir="ltr">{name}</b>
        <button onClick={() => setRound((r) => r + 1)} aria-label={t('أعد المحاولة')}><Icon name="again" size={20} /></button>
        <button onClick={onKeep} aria-label={t('تنزيل')}><Icon name="download" size={20} /></button>
      </div>
      {failed ? (
        <div className="pdf-msg">
          <Icon name="alert" size={26} />
          <span>{t('تعذّر العرض السريع لهذا الملف.')}</span>
          <button className="btn p" style={{ maxWidth: 240 }} onClick={onKeep}>{t('تنزيل')}</button>
        </div>
      ) : (
        <iframe key={round} ref={frame} className="pf-frame"
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
          title={t('عرض الملف')}
          onLoad={(e) => { e.currentTarget.dataset.loaded = '1'; }} />
      )}
    </div>,
    document.body,
  );
}
