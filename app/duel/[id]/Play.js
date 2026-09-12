'use client';

// Taking a duel somebody sent you.
//
// The score is not worked out here. The ticks go to the server, which has the
// questions the duel stored and decides from those — so the number on the
// result screen is one both players can point at.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Quiz from '@/components/Quiz';

export default function Play({ id, questions, title }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const send = async (answers) => {
    setBusy(true); setError('');
    const res = await fetch(`/api/duel/${id}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(d.error || 'تعذّر الإرسال'); return; }
    router.refresh();
  };

  if (error) {
    return (
      <>
        <div className="admin-err">{error}</div>
        <button className="btn g" onClick={() => router.refresh()}>حدِّث</button>
      </>
    );
  }

  if (busy) return <div className="pdf-msg"><div className="spinner" /></div>;

  return <Quiz questions={questions} moduleName={title} source="تحدٍّ" onAnswers={send} />;
}
