'use client';

// Saying yes, or saying no.
//
// The one screen that was missing. Before it, a challenge arrived as ten
// questions and a score to beat, which is not an invitation — it is being
// handed somebody else's exam. Nothing is drawn, answered or scored until
// this button is pressed.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function Answer({ id, who, title, of }) {
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
      <section className="card duel-invite">
        <div className="duel-invite-ic"><Icon name="swords" size={26} /></div>
        <div className="duel-invite-t">{who} يتحدّاك</div>
        <div className="duel-invite-b" dir="auto">{title}</div>
        <div className="duel-invite-n">{of} أسئلة · نفس الأسئلة لكليكما</div>

        {error && <div className="admin-err" style={{ marginTop: 14 }}>{error}</div>}

        <div className="duel-invite-row">
          <button className="btn p" disabled={!!busy} onClick={() => say('accept')}>
            {busy === 'accept' ? '…' : 'أقبل التحدّي'}
          </button>
          <button className="btn g" disabled={!!busy} onClick={() => say('refuse')}>
            {busy === 'refuse' ? '…' : 'ليس الآن'}
          </button>
        </div>
      </section>

      <p className="quiz-note">
        حين تقبل، تجيبان على الأسئلة نفسها — كلٌّ في وقته. وتظهر النتيجتان
        معًا حين ينتهي الاثنان.
      </p>
    </>
  );
}
