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

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Watch({ every = 5000 }) {
  const router = useRouter();

  useEffect(() => {
    // Nothing is asked while the phone is in a pocket: a screen nobody is
    // looking at does not need to be right, and the battery does.
    const look = () => {
      if (document.visibilityState === 'visible') router.refresh();
    };
    const timer = setInterval(look, every);
    document.addEventListener('visibilitychange', look);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', look);
    };
  }, [router, every]);

  return null;
}
