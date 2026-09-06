'use client';

// The year you are in, asked once, where it matters.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROMOS } from '@/lib/data';

export default function PickPromo() {
  const router = useRouter();
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  const pick = async (id) => {
    if (busy) return;
    setBusy(id); setError('');
    const res = await fetch('/api/me', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ promo: id }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy('');
    if (!res.ok) { setError(data.error || `تعذّر الحفظ (${res.status})`); return; }
    router.refresh();
  };

  return (
    <div className="composer">
      <div className="admin-card-t">في أي سنة أنت؟</div>
      <p className="admin-card-b">
        كل منشور ينتمي إلى دفعة، فاختر سنتك مرة واحدة لتبدأ النشر.
      </p>
      <div className="login-promos">
        {PROMOS.map((p) => (
          <button
            key={p.id}
            className={`imp-kind${busy === p.id ? ' on' : ''}`}
            style={busy === p.id ? { background: p.badge } : undefined}
            onClick={() => pick(p.id)}
            disabled={!!busy}
          >
            {p.name}
          </button>
        ))}
      </div>
      {error && <div className="admin-err">{error}</div>}
    </div>
  );
}
