'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from './Icon';

// الملف left this bar for the picture of you in الرئيسية's head, which is
// the same one tap and was doing nothing there. المحادثات took the slot: it
// is the most opened screen of the four and the only one that can be waiting
// for you, so the count belongs where you can see it from anywhere.
const TABS = [
  { href: '/feed',    icon: 'home',    label: 'الرئيسية' },
  { href: '/notes',   icon: 'book',    label: 'الملخصات' },
  { href: '/archive', icon: 'archive', label: 'الأرشيف' },
  { href: '/chat',    icon: 'msg',     label: 'المحادثات', counts: true },
];

// Screens that can take something new without going anywhere.
const WRITES_HERE = ['/feed', '/notes'];

export default function BottomNav() {
  const path = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(0);

  // Asked for again on every change of screen, so reading your messages puts
  // the number out straight away rather than at the next full load. Hooks run
  // before the bar decides whether to draw itself at all — they have to.
  const quiet = path === '/' || path.startsWith('/login')
    || path.startsWith('/admin') || path === '/waiting';
  useEffect(() => {
    if (quiet) { setUnread(0); return undefined; }
    let alive = true;
    fetch('/api/chat/unread')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d) setUnread(d.unread || 0); })
      .catch(() => { /* a counter is not worth a message about */ });
    return () => { alive = false; };
  }, [path, quiet]);
  // The panel is not the app: it has its own header and no use for the four
  // student tabs sitting over its buttons.
  // A room has its own bar along the bottom, and the file viewer wants the
  // whole screen. Neither has room for the four tabs as well.
  // An account waiting for approval has nowhere to go; four tabs that all
  // bounce back to this screen would be four dead buttons.
  if (path === '/' || path.startsWith('/login') || path.startsWith('/admin')
      || path === '/waiting') return null;
  // A file wants the whole screen — the comment above said so and the test
  // did not: the bar sat over the last inch of every lecture, and over the
  // control for switching how it opens.
  if (/^\/(rooms|chat|qa|file)\/[^/]+$/.test(path)) return null;
  const on = (href) => path.startsWith(href);
  return (
    <nav className="nav">
      {TABS.slice(0, 2).map((t) => (
        <Link key={t.href} href={t.href} data-on={on(t.href)}>
          <span className="nav-ic"><Icon name={t.icon} size={21} /></span>
          <span>{t.label}</span>
        </Link>
      ))}
      <div className="navsp">
        {/* It used to be a div: the biggest, brightest thing on the screen and
            it did nothing at all. It opens whatever "new" means where you are
            — the composer on الرئيسية, the upload on الملخصات — and takes you
            to the composer from anywhere else. */}
        <button
          className="fab"
          aria-label="أضف"
          onClick={() => {
            if (WRITES_HERE.includes(path)) window.dispatchEvent(new Event('mypromo:new'));
            else router.push('/feed?write=1');
          }}
        >
          <Icon name="plus" size={24} />
        </button>
      </div>
      {TABS.slice(2).map((t) => (
        <Link key={t.href} href={t.href} data-on={on(t.href)}>
          <span className="nav-ic">
            <Icon name={t.icon} size={21} />
            {t.counts && unread > 0 && (
              <span className="nav-tally">{unread > 9 ? '+9' : unread}</span>
            )}
          </span>
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
