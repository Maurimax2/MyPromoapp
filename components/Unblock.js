'use client';

// Taking a block back — on the person's profile, and on أنا ← المحظورون.

import { useState } from 'react';
import { useT } from '@/components/Lang';

export default function Unblock({ person, className = 'btn g sm', onDone }) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const go = async () => {
    setBusy(true); setError('');
    const res = await fetch('/api/block', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ person }),
    }).catch(() => null);
    setBusy(false);
    if (!res?.ok) { setError(t('تعذّر إلغاء الحظر — أعد المحاولة')); return; }
    if (onDone) onDone(); else window.location.reload();
  };

  return (
    <>
      <button type="button" className={className} onClick={go} disabled={busy}>{t('ألغِ الحظر')}</button>
      {error && <span className="sheet-err">{error}</span>}
    </>
  );
}
