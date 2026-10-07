'use client';

// Deleting the account. Two taps on purpose: the first only asks.

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { useT } from '@/components/Lang';

export default function DeleteAccount() {
  const t = useT();
  const [asking, setAsking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const box = useRef(null);

  // The bottom bar covers the foot of the page; bring the question above it.
  useEffect(() => {
    if (asking) box.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [asking]);

  async function remove() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/me/delete', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ confirm: true }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || t('تعذّر حذف الحساب'));
      window.location.assign('/login');
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  }

  if (!asking) {
    return (
      <button type="button" className="btn g sm danger" style={{ marginTop: 6 }} onClick={() => setAsking(true)}>
        <Icon name="trash" size={18} />{' '}{t('حذف حسابي')}</button>
    );
  }

  return (
    <div className="delete-ask" role="alertdialog" aria-label={t('حذف الحساب')} ref={box}>
      <b>{t('حذف الحساب نهائيًا؟')}</b>
      <p>{t(
        'سيُحذف حسابك ومنشوراتك ورسائلك ونقاطك وإعداداتك، ولا يمكن التراجع. الملخصات والأسئلة التي شاركتها تبقى لدفعتك دون اسمك.'
      )}</p>
      {error && <p className="login-err">{error}</p>}
      <div className="delete-ask-row">
        <button type="button" className="btn g sm danger" disabled={busy} onClick={remove}>
          {busy ? t('جارٍ الحذف…') : t('نعم، احذف حسابي')}
        </button>
        <button type="button" className="btn g sm" disabled={busy} onClick={() => setAsking(false)}>{t('إلغاء')}</button>
      </div>
    </div>
  );
}
