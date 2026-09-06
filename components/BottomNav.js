'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

const TABS = [
  { href: '/feed',    icon: 'home',    label: 'الرئيسية' },
  { href: '/notes',   icon: 'book',    label: 'الملخصات' },
  { href: '/archive', icon: 'archive', label: 'الأرشيف' },
  { href: '/profile', icon: 'user',    label: 'الملف' },
];

export default function BottomNav() {
  const path = usePathname();
  // The panel is not the app: it has its own header and no use for the four
  // student tabs sitting over its buttons.
  // A room has its own bar along the bottom, and the file viewer wants the
  // whole screen. Neither has room for the four tabs as well.
  if (path === '/' || path.startsWith('/login') || path.startsWith('/admin')) return null;
  if (/^\/rooms\/[^/]+$/.test(path)) return null;
  const on = (href) => path.startsWith(href);
  return (
    <nav className="nav">
      {TABS.slice(0, 2).map((t) => (
        <Link key={t.href} href={t.href} data-on={on(t.href)}>
          <Icon name={t.icon} size={21} /><span>{t.label}</span>
        </Link>
      ))}
      <div className="navsp">
        <div className="fab" role="presentation"><Icon name="plus" size={24} /></div>
      </div>
      {TABS.slice(2).map((t) => (
        <Link key={t.href} href={t.href} data-on={on(t.href)}>
          <Icon name={t.icon} size={21} /><span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
