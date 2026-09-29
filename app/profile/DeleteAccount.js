'use client';

// Deleting the account. Two taps on purpose: the first only asks.

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';

export default function DeleteAccount() {
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
      if (!res.ok) throw new Error(body.error || 'تعذّر حذف الحساب');
      window.location.assign('/login');
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  }

  if (!asking) {
    return (
      <button type="button" className="btn g sm danger" style={{ marginTop: 6 }} onClick={() => setAsking(true)}>
        <Icon name="trash" size={18} /> حذف حسابي
      </button>
    );
  }

  return (
    <div className="delete-ask" role="alertdialog" aria-label="حذف الحساب" ref={box}>
      <b>حذف الحساب نهائيًا؟</b>
      <p>
        سيُحذف حسابك ومنشوراتك ورسائلك ونقاطك وإعداداتك، ولا يمكن التراجع.
        الملخصات والأسئلة التي شاركتها تبقى لدفعتك دون اسمك.
      </p>
      {error && <p className="login-err">{error}</p>}
      <div className="delete-ask-row">
        <button type="button" className="btn g sm danger" disabled={busy} onClick={remove}>
          {busy ? 'جارٍ الحذف…' : 'نعم، احذف حسابي'}
        </button>
        <button type="button" className="btn g sm" disabled={busy} onClick={() => setAsking(false)}>
          إلغاء
        </button>
      </div>
    </div>
  );
}
