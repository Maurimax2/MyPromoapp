'use client';

// The panel's one piece of chrome.
//
// It used to be a logo, a link to the app, and a sign-out — with no way back.
// Every screen under /admin was a dead end you escaped by pressing the
// browser's own back button, which is not a thing you should have to do
// inside an app. The parent is derived from the URL, so back always means the
// same thing and always goes somewhere real.

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';

const TITLES = {
  '/admin':           'لوحة التحكم',
  '/admin/users':     'الأعضاء',
  '/admin/questions': 'الأسئلة',
  '/admin/content':   'المحتوى',
  '/admin/import':    'استيراد',
  '/admin/reports':   'البلاغات',
};

/** One level up, worked out from the path and its parameters. */
function parentOf(path, params) {
  if (path === '/admin') return null;

  // The catalogue is three levels deep inside one route, so its parent lives
  // in the query string rather than the path.
  if (path === '/admin/content') {
    if (params.get('module')) {
      const promo = params.get('promo');
      return promo ? `/admin/content?promo=${promo}` : '/admin/content';
    }
    if (params.get('promo')) return '/admin/content';
    return '/admin';
  }

  return '/admin';
}

export default function AdminHeader({ role }) {
  const path = usePathname();
  const params = useSearchParams();
  const parent = parentOf(path, params);
  const title = TITLES[path] || 'لوحة التحكم';

  return (
    <header className="admin-top">
      {parent ? (
        <Link href={parent} className="icobtn" aria-label="رجوع">
          <Icon name="chev" size={20} />
        </Link>
      ) : (
        <Link href="/admin" className="admin-mark" aria-label="MyPromo">
          <span>My</span><span className="admin-brand-b">Promo</span>
        </Link>
      )}

      <div className="grow">
        <div className="admin-title">{title}</div>
      </div>

      {role && <span className="admin-badge">{role}</span>}
      <Link href="/feed" className="admin-out">التطبيق</Link>
      <form action="/auth/signout" method="post">
        <button className="admin-out">خروج</button>
      </form>
    </header>
  );
}
