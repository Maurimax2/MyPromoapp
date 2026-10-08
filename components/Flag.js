'use client';

// The three dots beside anything somebody else wrote: report it, or block
// the person who wrote it.
//
// Both stores require the two for an app where students write to each other
// (Apple 1.2, Google's user-generated content policy), and they are asked for
// in the same place: the moment something is wrong is the moment you are
// looking at it. One component, so a post, an answer, a chat, a profile and a
// room all say the same words and do the same thing.
//
// Reporting is one tap and needs no reason. Blocking asks once — it is the
// one here that changes what you see across the whole app.

import { useState } from 'react';
import Sheet from './Sheet';
import Icon from './Icon';
import { useT } from '@/components/Lang';

const REPORT = {
  post: 'أبلغ عن المنشور',
  note: 'أبلغ عن الملخص',
  comment: 'أبلغ عن الردّ',
  message: 'أبلغ عن المحادثة',
  profile: 'أبلغ عن الحساب',
  room: 'أبلغ عن الغرفة',
};

/**
 * @param {object}  p
 * @param {string}  [p.type]      what is reported (a key of REPORT); none, no report row
 * @param {*}       [p.id]        its id — for a chat, the chat's
 * @param {{id: string, name: string}} [p.person]  who wrote it; none, no block row
 * @param {boolean} [p.blocked]   already blocked by you: the row offers to undo it
 * @param {Function}[p.onBlocked] after a block or an unblock; reloads by default
 * @param {string}  [p.className] the trigger's class
 * @param {number}  [p.size]
 */
export default function Flag({ type, id, person, blocked = false, onBlocked, className, size = 18 }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('menu');     // menu | confirm | reported
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const close = () => { setOpen(false); setView('menu'); setError(''); };
  const after = onBlocked || (() => window.location.reload());
  const first = (person?.name || '').split(' ')[0] || t('طالب');

  const report = async () => {
    setBusy(true); setError('');
    const res = await fetch('/api/report', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type, id }),
    }).catch(() => null);
    setBusy(false);
    if (!res?.ok) { setError(t('تعذّر إرسال البلاغ — أعد المحاولة')); return; }
    setView('reported');
  };

  const block = async (on) => {
    setBusy(true); setError('');
    const res = await fetch('/api/block', {
      method: on ? 'POST' : 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ person: person.id }),
    }).catch(() => null);
    const data = await res?.json().catch(() => ({}));
    setBusy(false);
    if (!res?.ok) { setError(data?.error || t('تعذّر الحظر — أعد المحاولة')); return; }
    close();
    after(on);
  };

  return (
    <>
      {/* Inside a card that is itself a link, the tap must open the sheet
          and not the file. */}
      <button type="button" className={className} aria-label={t('خيارات')}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}>
        <Icon name="dots" size={size} />
      </button>

      {open && (
        <Sheet onClose={close}>
          {view === 'menu' && (
            <>
              {type && REPORT[type] && (
                <button className="sheet-act" onClick={report} disabled={busy}>
                  <Icon name="flag" size={18} />&nbsp;{t(REPORT[type])}
                </button>
              )}
              {person?.id && (blocked ? (
                <button className="sheet-act" onClick={() => block(false)} disabled={busy}>
                  {t('ألغِ الحظر')}
                </button>
              ) : (
                <button className="sheet-act warn" onClick={() => setView('confirm')} disabled={busy}>
                  <Icon name="block" size={18} />&nbsp;{t('احظر {name}', { name: first })}
                </button>
              ))}
            </>
          )}

          {view === 'confirm' && (
            <div className="sheet-say">
              <b>{t('احظر {name}؟', { name: first })}</b>
              <p>{t('لن ترى منشوراته ولا ردوده ولا رسائله، ولن يستطيع مراسلتك أو تحدّيك أو إضافتك صديقًا. لن يُخبَر بذلك، وتستطيع إلغاء الحظر متى شئت من أنا ← المحظورون.')}</p>
              <button className="sheet-act warn" onClick={() => block(true)} disabled={busy}>
                <Icon name="block" size={18} />&nbsp;{t('احظر')}
              </button>
            </div>
          )}

          {view === 'reported' && (
            <div className="sheet-say">
              <b>{t('شكرًا — وصل بلاغك')}</b>
              <p>{t('يراجعه المشرفون خلال 24 ساعة، ولن يعرف صاحبه من أبلغ عنه.')}</p>
              {person?.id && !blocked && (
                <button className="sheet-act warn" onClick={() => setView('confirm')} disabled={busy}>
                  <Icon name="block" size={18} />&nbsp;{t('احظر {name} أيضًا', { name: first })}
                </button>
              )}
            </div>
          )}

          {error && <div className="sheet-err">{error}</div>}
          <button className="sheet-act quiet" onClick={close}>
            {view === 'reported' ? t('حسنًا') : t('إلغاء')}
          </button>
        </Sheet>
      )}
    </>
  );
}
