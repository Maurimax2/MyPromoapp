'use client';

// Dark or light, per phone. Students read late, and asked for it.
//
// Kept in a cookie rather than localStorage so the server can put it on the
// page (app/layout.js) and nothing paints white for a moment first. Switching
// only flips the attribute: every colour is a variable, so there is nothing to
// reload.

import { useEffect, useState } from 'react';
import Icon from './Icon';
import { useT } from './Lang';

export const themeNow = () =>
  (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function setTheme(next) {
  document.documentElement.dataset.theme = next;
  document.cookie = `mp-theme=${next}; path=/; max-age=31536000; samesite=lax`;
}

/** A round button; `row` draws it as a settings row with a switch instead. */
export default function ThemeToggle({ className = '', row = false }) {
  const t = useT();
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(themeNow() === 'dark'); }, []);

  const flip = () => {
    const next = dark ? 'light' : 'dark';
    setTheme(next);
    setDark(next === 'dark');
  };

  if (row) {
    return (
      <button type="button" className={`me-row ${className}`} role="switch" aria-checked={dark} onClick={flip}>
        <span className="me-list-ic"><Icon name="moon" size={19} /></span>
        <span className="grow">{t('الوضع الليلي')}</span>
        <span className={`ps-sw${dark ? ' on' : ''}`} aria-hidden="true"><i /></span>
      </button>
    );
  }
  return (
    <button type="button" className={className} onClick={flip}
            aria-label={dark ? t('الوضع النهاري') : t('الوضع الليلي')}>
      <Icon name={dark ? 'sun' : 'moon'} size={20} />
    </button>
  );
}
