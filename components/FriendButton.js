'use client';

// أضف صديقًا — and what that button becomes after: sent, accept, friends.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const LOOK = {
  none:    { icon: 'addFriend', say: 'أضف صديقًا', cls: 'p' },
  sent:    { icon: 'clock', say: 'أُرسل الطلب — إلغاء', cls: 'g' },
  asked:   { icon: 'addFriend', say: 'اقبل طلب الصداقة', cls: 'p' },
  friends: { icon: 'friend', say: 'صديقك', cls: 'g' },
};

export default function FriendButton({ to, state: initial }) {
  const router = useRouter();
  const [state, setState] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [unsure, setUnsure] = useState(false);

  const act = async () => {
    if (busy) return;
    // Unfriending is two taps; everything else is one.
    if (state === 'friends' && !unsure) { setUnsure(true); return; }
    setBusy(true); setError('');
    const method = state === 'none' || state === 'asked' ? 'POST' : 'DELETE';
    const res = await fetch('/api/friends', {
      method, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ to }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false); setUnsure(false);
    if (!res.ok) { setError(data.error || 'تعذّر ذلك'); return; }
    setState(data.state);
    router.refresh();
  };

  const look = LOOK[state] || LOOK.none;
  return (
    <>
      <button className={`btn ${look.cls}`} onClick={act} disabled={busy}>
        <Icon name={unsure ? 'x' : look.icon} size={17} />
        {busy ? '…' : unsure ? 'إلغاء الصداقة؟ اضغط مرة أخرى' : look.say}
      </button>
      {error && <div className="admin-err">{error}</div>}
    </>
  );
}
