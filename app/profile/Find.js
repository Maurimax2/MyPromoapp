'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';
import { normalise, looksRight } from '@/lib/matricule';
import { normaliseUsername, usernameLooksRight } from '@/lib/identity';

/**
 * Finding a classmate by their username or the number the faculty gave them.
 *
 * No endpoint behind it: what was typed goes into the address and the page it
 * lands on answers. That keeps one screen deciding who may be seen, and it
 * leaves nothing here that could be asked a thousand times to find out which
 * usernames exist.
 */
export default function Find() {
  const router = useRouter();
  const [value, setValue] = useState('');

  const number = normalise(value);
  const handle = normaliseUsername(value);
  const target = looksRight(number) ? number : usernameLooksRight(handle) ? handle : null;

  const go = (e) => {
    e.preventDefault();
    if (!target) return;
    router.push(`/u/${encodeURIComponent(target)}`);
  };

  return (
    <form className="card" onSubmit={go}>
      <div className="card-row">
        <div className="tile tint-oliveLight"><Icon name="search" size={20} /></div>
        <div className="grow">
          <div className="nm">ابحث عن زميل</div>
          <input
            className="login-input" dir="ltr" style={{ marginTop: 6, width: '100%' }}
            placeholder="sidi.ahmed أو D12345"
            autoCapitalize="none" autoCorrect="off" spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="اسم المستخدم أو الرقم الجامعي" />
        </div>
      </div>
      <button className="btn p find-go" disabled={!target}>اذهب</button>
    </form>
  );
}
