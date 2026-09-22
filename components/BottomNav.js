'use client';

// The four tabs.
//
// It used to be الرئيسية · الملخصات · + · الأرشيف · المحادثات, and three of
// those five were carrying nothing. المحادثات is the least-opened screen in
// the app and does not deserve a permanent slot; الملخصات and الأرشيف are
// both "the material", which is one idea and now one tab. The + was the
// biggest, brightest thing on the screen for a job the feed's own composer
// already does in place.
//
// What is left is the four things a student actually moves between:
//
//   الرئيسية   what is happening, and what you were reading
//   الدراسة    every subject, every file, and the four ways to study them
//   الترتيب    where you stand in your promo
//   أنا        you, your points, your saved files, your settings
//
// المحادثات is still there — reached from a person, which is how a
// conversation starts anyway — it just no longer costs a fifth of the bar.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

const TABS = [
  { href: '/feed',    icon: 'home',   label: 'الرئيسية' },
  { href: '/study',   icon: 'book',   label: 'الدراسة', waiting: true },
  { href: '/points',  icon: 'award',  label: 'الترتيب' },
  { href: '/profile', icon: 'person', label: 'أنا' },
];

export default function BottomNav() {
  const path = usePathname();
  // Duels waiting on an answer. The count sits on الدراسة because that is
  // where التحدّي lives now, and it is the only number in the bar — a bar
  // where every tab has a badge is a bar with no badges.
  const [waiting, setWaiting] = useState(0);

  const quiet = path === '/' || path.startsWith('/login')
    || path.startsWith('/admin') || path === '/waiting';

  useEffect(() => {
    if (quiet) { setWaiting(0); return undefined; }
    let alive = true;
    fetch('/api/duel/waiting')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d) setWaiting(d.waiting || 0); })
      .catch(() => { /* a counter is not worth a message about */ });
    return () => { alive = false; };
  }, [path, quiet]);

  // The panel is not the app, and an account waiting for approval has
  // nowhere to go: four tabs that all bounce back is four dead buttons.
  if (quiet) return null;
  // A room has its own bar along the bottom, and a file wants the screen.
  if (/^\/(rooms|chat|qa|file|model)\/[^/]+$/.test(path)) return null;
  // A region of the body is a model with layers, at the same full height.
  if (path.startsWith('/anatomie/')) return null;
  // The pre-launch page is read by somebody with no account.
  if (path === '/feedback') return null;

  // `/points` answers to الترتيب, and الدراسة owns everything under it.
  const on = (href) => {
    if (href === '/study') {
      return ['/study', '/archive', '/notes', '/quiz', '/duel', '/review', '/anatomie']
        .some((p) => path === p || path.startsWith(`${p}/`));
    }
    return path === href || path.startsWith(`${href}/`);
  };

  return (
    <nav className="nav">
      {TABS.map((t) => (
        <Link key={t.href} href={t.href} data-on={on(t.href)}>
          <span className="nav-ic">
            <Icon name={t.icon} size={22} />
            {t.waiting && waiting > 0 && (
              <span className="nav-tally">{waiting > 9 ? '+9' : waiting}</span>
            )}
          </span>
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
