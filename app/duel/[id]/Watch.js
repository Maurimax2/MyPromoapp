'use client';

// Keeping a duel screen honest while you are looking at it.
//
// The page is rendered on the server, so "he accepted" reaches you only when
// something asks again. Without this the challenger sits on «بانتظار ردّه»
// after the other person has already accepted, and the duel looks broken when
// it is merely a minute old.
//
// Only mounted while something can actually change — an invitation waiting
// for a reply, or a half that is not in yet. A finished duel asks nothing.
//
// Each ask is the whole page drawn again on the server. It was every 5 s for
// as long as the screen stayed open, which on a free plan whose limit is the
// number of calls (owner, 2026-11: Vercel nearly stopped the app) was the
// costliest screen there was. Every 15 s for the first three minutes — when an
// answer is most likely — then once a minute; never in a pocket, and once as
// soon as the app comes back to the front.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const QUICK = 15 * 1000;
const SLOW = 60 * 1000;
const PATIENT = 3 * 60 * 1000;

export default function Watch() {
  const router = useRouter();

  useEffect(() => {
    const since = Date.now();
    let timer = null;
    const later = () => {
      clearTimeout(timer);
      timer = setTimeout(look, Date.now() - since > PATIENT ? SLOW : QUICK);
    };
    // Nothing is asked while the phone is in a pocket: a screen nobody is
    // looking at does not need to be right, and the battery does.
    function look() {
      if (document.visibilityState !== 'visible') return;
      router.refresh();
      later();
    }
    const back = () => {
      if (document.visibilityState === 'visible') look();
      else clearTimeout(timer);
    };
    later();
    document.addEventListener('visibilitychange', back);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', back);
    };
  }, [router]);

  return null;
}
