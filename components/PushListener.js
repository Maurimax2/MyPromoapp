'use client';

// Mounted once, in the root layout: keeps this device registered for push,
// and takes a tapped notification to the screen it is about. Draws nothing.

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { syncPush } from '@/lib/pushClient';

// Screens where nobody is signed in yet (or nobody is let in yet).
const OUTSIDE = ['/login', '/waiting', '/feedback', '/auth', '/admin'];

export default function PushListener() {
  const path = usePathname();
  const router = useRouter();
  const outside = OUTSIDE.some((p) => path?.startsWith(p));

  useEffect(() => {
    if (outside) return;
    // After the screen has painted: this is never what a student is waiting for.
    const t = setTimeout(() => { syncPush((url) => router.push(url)); }, 1500);
    return () => clearTimeout(t);
  }, [outside, router]);

  return null;
}
