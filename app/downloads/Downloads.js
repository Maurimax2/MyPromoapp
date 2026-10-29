'use client';

// The lectures kept on this phone, and our own reader for them.
//
// A downloaded lecture opens in PdfViewer from the phone's own copy: nothing
// is asked of the network. Online lectures still open in Google's preview
// (QuickView) — the owner chose our reader for downloads only, 2026-10-28.
//
// The reader is drawn over this screen rather than at an address of its own:
// with the connection gone, going to another address is the one thing that
// cannot work, and this screen is already here.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import PdfViewer from '@/components/PdfViewer';
import { listDownloads, openDownload, removeDownload } from '@/lib/downloads';
import { SubjectTile } from '@/components/SubjectBanner';
import { lecturesWord } from '@/lib/i18n';
import { useT } from '@/components/Lang';

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

// How far a page may be pinched: smaller shows a whole page, bigger is drawn
// again at that size rather than stretched.
const hold = (z) => Math.min(3, Math.max(0.6, z));

export default function Downloads() {
  const t = useT();
  const [items, setItems] = useState(null);     // null while the phone is asked
  const [open, setOpen] = useState(null);       // the record being read, with its url
  const [zoom, setZoom] = useState(1);
  const [asking, setAsking] = useState(null);   // fid whose delete is being confirmed
  const worker = useRef(null);

  const load = () => listDownloads().then(setItems).catch(() => setItems([]));
  useEffect(() => {
    load();
    // The reader's code and its worker, started now while there may still be
    // a connection. Left to itself pdf.js fetches the worker's script again
    // for every document, and with the network gone none would open.
    let gone = false;
    import('@/lib/pdfjs').then((m) => m.pdfjs()).then((lib) => {
      if (!gone) worker.current = new lib.PDFWorker({ name: 'downloads' });
    }).catch(() => {});
    return () => { gone = true; worker.current?.destroy(); worker.current = null; };
  }, []);

  // A file's URL holds its bytes in memory until it is let go.
  useEffect(() => () => { if (open?.url) URL.revokeObjectURL(open.url); }, [open]);

  // The phone's own back closes the reader, not the screen under it.
  useEffect(() => {
    if (!open) return undefined;
    const back = () => setOpen(null);
    window.addEventListener('popstate', back);
    return () => window.removeEventListener('popstate', back);
  }, [open]);

  const read = async (fid) => {
    const rec = await openDownload(fid);
    if (!rec) { load(); return; }
    setZoom(1);
    window.history.pushState({ ...window.history.state, mpRead: fid }, '');
    setOpen(rec);
  };
  const drop = async (fid) => {
    await removeDownload(fid);
    setAsking(null);
    load();
  };

  const total = (items || []).reduce((n, it) => n + (it.bytes || 0), 0);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/profile" className="icobtn" aria-label={t('رجوع')}><Icon name="chevR" size={19} /></Link>
          <div className="grow">
            <div className="head-t">{t('التنزيلات')}</div>
            {items?.length > 0 && (
              <div className="head-s">{lecturesWord(t, items.length)} · <span dir="ltr">{mb(total)}</span></div>
            )}
          </div>
        </div>
      </header>

      <div className="scroll">
        {items && items.length === 0 && (
          <div className="empty">
            <div className="tile tint-olive"><Icon name="download" size={24} /></div>
            <div className="empty-t">{t('لا تنزيلات بعد')}</div>
          </div>
        )}
        {(items || []).map((it) => {
          return (
            <div key={it.fid} className="card dls-row">
              <button className="card-row dls-open" onClick={() => read(it.fid)}>
                <SubjectTile name={it.subject || it.title} size={52} radius={16} />
                <span className="grow">
                  <span className="nm" dir="auto">{it.title}</span>
                  <span className="mt" dir="ltr">{[it.subject, mb(it.bytes)].filter(Boolean).join(' · ')}</span>
                </span>
              </button>
              {asking === it.fid ? (
                <span className="dls-ask">
                  <button className="dls-yes" onClick={() => drop(it.fid)}>{t('احذف')}</button>
                  <button className="dls-no" onClick={() => setAsking(null)} aria-label={t('إلغاء')}><Icon name="x" size={18} /></button>
                </span>
              ) : (
                <button className="dls-del" onClick={() => setAsking(it.fid)} aria-label={t('احذف من الهاتف')}>
                  <Icon name="trash" size={19} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {open && (
        <div className="dlv">
          <header className="head">
            <div className="head-row">
              <button className="icobtn" onClick={() => window.history.back()} aria-label={t('رجوع')}>
                <Icon name="chevR" size={19} />
              </button>
              <div className="grow"><div className="head-t dlv-t" dir="auto">{open.title}</div></div>
            </div>
          </header>
          <PdfViewer src={open.url} title={open.title} zoom={zoom} onZoom={(z) => setZoom(hold(z))}
            worker={worker.current} />
        </div>
      )}
    </>
  );
}
