'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';
import { normalise, looksRight } from '@/lib/matricule';
import { normaliseUsername, usernameLooksRight } from '@/lib/identity';
import { useT } from '@/components/Lang';

/**
 * Finding a classmate by their username or the number the faculty gave them.
 *
 * No endpoint behind it: what was typed goes into the address and the page it
 * lands on answers. That keeps one screen deciding who may be seen, and it
 * leaves nothing here that could be asked a thousand times to find out which
 * usernames exist.
 */
//   variant  'head': one search field in أنا's green head, its button
//            appearing once what is typed can be looked up.
export default function Find({ variant }) {
  const t = useT();
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

  if (variant === 'head') {
    return (
      <form className="me2-find" onSubmit={go} role="search">
        <Icon name="search" size={18} />
        <input
          dir="auto" placeholder={t('ابحث عن زميل')}
          autoCapitalize="none" autoCorrect="off" spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label={t('اسم المستخدم أو الرقم الجامعي')} />
        {target && <button className="me2-find-go">{t('اذهب')}</button>}
      </form>
    );
  }

  return (
    <form className="card" onSubmit={go}>
      <div className="card-row">
        <div className="tile tint-oliveLight"><Icon name="search" size={20} /></div>
        <div className="grow">
          <div className="nm">{t('ابحث عن زميل')}</div>
          <input
            className="login-input" dir="ltr" style={{ marginTop: 6, width: '100%' }}
            placeholder={t('sidi.ahmed أو D12345')}
            autoCapitalize="none" autoCorrect="off" spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label={t('اسم المستخدم أو الرقم الجامعي')} />
        </div>
      </div>
      <button className="btn p find-go" disabled={!target}>{t('اذهب')}</button>
    </form>
  );
}
