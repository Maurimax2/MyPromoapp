'use client';

// The interface language on the phone.
//
// The root layout hands down what the server read from the cookie, and —
// only when it is French — the dictionary, so a phone in Arabic never
// downloads the French. Switching writes the cookie (a year) and asks the
// server for the screen again: the layout comes back in the other language,
// with the dictionary or without it, and the page turns round with it.

import { createContext, useCallback, useContext, useEffect, useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LANG_COOKIE, dirOf, makeT } from '@/lib/i18n';
import Icon from './Icon';

const Ctx = createContext({ lang: 'ar', t: makeT('ar'), setLang: () => {}, switching: false });

export function LangProvider({ lang, dict, children }) {
  const router = useRouter();
  const [switching, start] = useTransition();
  const setLang = useCallback((next) => {
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    start(() => router.refresh());
  }, [router]);
  // The <html> the layout drew is not drawn again on a refresh.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dirOf(lang);
  }, [lang]);
  const value = useMemo(() => ({ lang, t: makeT(lang, dict), setLang, switching }), [lang, dict, setLang, switching]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
/** t() in a client component: `const t = useT();` */
export const useT = () => useContext(Ctx).t;

const NAME = { ar: 'العربية', fr: 'Français' };

/**
 * The switch: the other language, named in that language — a student who
 * cannot read Arabic has to be able to find it on an Arabic screen.
 */
export function LangSwitch({ className = 'lang-switch' }) {
  const { lang, setLang, switching } = useLang();
  const other = lang === 'fr' ? 'ar' : 'fr';
  return (
    <button type="button" className={className} onClick={() => setLang(other)} lang={other}
      disabled={switching} aria-busy={switching}>
      <Icon name="lang" size={16} />
      {NAME[other]}
    </button>
  );
}

/** The same switch as a row of أنا's list. */
export function LangRow() {
  const { lang, t, setLang, switching } = useLang();
  const other = lang === 'fr' ? 'ar' : 'fr';
  return (
    <button type="button" className="me-row" onClick={() => setLang(other)}
      disabled={switching} aria-busy={switching}>
      <span className="me-list-ic"><Icon name="lang" size={19} /></span>
      <span className="grow">{t('اللغة')}</span>
      <s lang={other}>{NAME[other]}</s>
      <Icon name="chev" size={15} />
    </button>
  );
}
