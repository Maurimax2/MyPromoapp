'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

const TABS = [
  { href: '/',         icon: 'home',    label: 'الرئيسية' },
  { href: '/lectures', icon: 'book',    label: 'المحاضرات' },
  { href: '/archive',  icon: 'archive', label: 'الأرشيف' },
  { href: '/profile',  icon: 'user',    label: 'الملف' },
];

export default function BottomNav() {
  const path = usePathname();
  if (path.startsWith('/login')) return null;
  const on = (href) => (href === '/' ? path === '/' : path.startsWith(href));
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
