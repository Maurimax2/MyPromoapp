'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';
import { normalise, looksRight } from '@/lib/matricule';

/**
 * Finding a classmate by the number the faculty gave them.
 *
 * No endpoint behind it: the number goes into the address and the page it
 * lands on answers. That keeps one screen deciding who may be seen, and it
 * leaves nothing here that could be asked a thousand times to find out which
 * numbers exist.
 */
export default function Find() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const number = normalise(value);
  const ready = looksRight(number);

  const go = (e) => {
    e.preventDefault();
    if (!ready) return;
    router.push(`/u/${number}`);
  };

  return (
    <form className="card" onSubmit={go}>
      <div className="card-row">
        <div className="tile tint-purpleLight"><Icon name="search" size={20} /></div>
        <div className="grow">
          <div className="nm">ابحث عن زميل</div>
          <input
            className="login-input" dir="ltr" style={{ marginTop: 6 }}
            placeholder="D04458" inputMode="text"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            aria-label="الرقم الجامعي" />
        </div>
      </div>
      <button className="btn p" disabled={!ready}>اذهب</button>
    </form>
  );
}
