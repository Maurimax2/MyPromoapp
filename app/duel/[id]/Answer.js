'use client';

// Saying yes, or saying no.
//
// The one screen that was missing. Before it, a challenge arrived as ten
// questions and a score to beat, which is not an invitation — it is being
// handed somebody else's exam. Nothing is drawn, answered or scored until
// this button is pressed. The faces and the paper above it are the page's;
// this is only the answer.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function Answer({ id }) {
  const router = useRouter();
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  const say = async (action) => {
    if (busy) return;
    setBusy(action); setError('');
    try {
      const res = await fetch(`/api/duel/${id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) { setError(d.error || 'تعذّر'); setBusy(''); return; }
      // Accepted: the same screen comes back with the questions on it.
      router.refresh();
    } catch {
      setError('لا اتصال'); setBusy('');
    }
  };

  return (
    <>
      {error && <div className="admin-err">{error}</div>}
      <button className="ar-go glow" disabled={!!busy} onClick={() => say('accept')}>
        <Icon name="swords" size={21} /> {busy === 'accept' ? '…' : 'أقبل التحدّي'}
      </button>
      <button className="ar-ghost" disabled={!!busy} onClick={() => say('refuse')}>
        {busy === 'refuse' ? '…' : 'ليس الآن'}
      </button>
    </>
  );
}
