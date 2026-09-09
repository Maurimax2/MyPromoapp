'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

const PROMOS = ['PCEM1', 'PCEM2', 'DCEM1', 'DCEM2', 'DCEM3', 'DCEM4'];

export default function PromoSelector({ current }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSelect = async (promo) => {
    const lowered = promo.toLowerCase();

    await fetch('/api/promo/select', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ promo: lowered }),
    });

    setOpen(false);
    router.refresh();
  };

  return (
    <div className="promo-selector">
      <button
        className="promo-btn"
        onClick={() => setOpen(!open)}
        aria-label="اختر السنة"
      >
        <span>{current.toUpperCase()}</span>
        <Icon name="chev" size={16} />
      </button>
      {open && (
        <div className="promo-menu">
          {PROMOS.map((promo) => (
            <button
              key={promo}
              className={`promo-item${current === promo.toLowerCase() ? ' active' : ''}`}
              onClick={() => handleSelect(promo)}
            >
              {promo}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
