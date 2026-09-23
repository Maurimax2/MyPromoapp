'use client';

// «شارك النتيجة» — the phone's own share sheet where there is one (every
// phone, and the app shell), the clipboard where there is not.

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function Share({ text }) {
  const [said, setSaid] = useState('');

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    try {
      if (navigator.share) { await navigator.share({ text, url }); return; }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setSaid('نُسخت');
      setTimeout(() => setSaid(''), 1800);
    } catch { /* dismissed */ }
  };

  return (
    <button className="ar-ghost" onClick={share}>
      <Icon name="share" size={17} /> {said || 'شارك النتيجة'}
    </button>
  );
}
