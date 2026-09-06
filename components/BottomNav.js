'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from './Icon';

const TABS = [
  { href: '/feed',    icon: 'home',    label: 'الرئيسية' },
  { href: '/notes',   icon: 'book',    label: 'الملخصات' },
  { href: '/archive', icon: 'archive', label: 'الأرشيف' },
  { href: '/profile', icon: 'user',    label: 'الملف' },
];

// Screens that can take something new without going anywhere.
const WRITES_HERE = ['/feed', '/notes'];

export default function BottomNav() {
  const path = usePathname();
  const router = useRouter();
  // The panel is not the app: it has its own header and no use for the four
  // student tabs sitting over its buttons.
  // A room has its own bar along the bottom, and the file viewer wants the
  // whole screen. Neither has room for the four tabs as well.
  // An account waiting for approval has nowhere to go; four tabs that all
  // bounce back to this screen would be four dead buttons.
  if (path === '/' || path.startsWith('/login') || path.startsWith('/admin')
      || path === '/waiting') return null;
  if (/^\/(rooms|chat|qa)\/[^/]+$/.test(path)) return null;
  const on = (href) => path.startsWith(href);
  return (
    <nav className="nav">
      {TABS.slice(0, 2).map((t) => (
        <Link key={t.href} href={t.href} data-on={on(t.href)}>
          <Icon name={t.icon} size={21} /><span>{t.label}</span>
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
          <Icon name={t.icon} size={21} /><span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
