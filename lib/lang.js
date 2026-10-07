import 'server-only';
import { cookies } from 'next/headers';
import { LANG_COOKIE, langOf, makeT } from './i18n';
import FR from './i18n-fr';

// The interface language on the server: read from the phone's cookie, so the
// first paint is already in the language the student chose.
export async function getLang() {
  return langOf((await cookies()).get(LANG_COOKIE)?.value);
}

/** The dictionary a phone in this language needs: French has one, Arabic is the key. */
export const dictOf = (lang) => (lang === 'fr' ? FR : null);

/** t() for a server component or a route: `const t = await getT();` */
export async function getT() {
  const lang = await getLang();
  return makeT(lang, dictOf(lang));
}
