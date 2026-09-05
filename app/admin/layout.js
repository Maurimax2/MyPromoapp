import Link from 'next/link';
import { redirect } from 'next/navigation';
import { currentProfile, isStaff } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Everything under /admin is staff only. The check is on the server, before a
// single byte of the panel is sent — a student who guesses the URL is
// redirected, not shown a page that hides its buttons.
export default async function AdminLayout({ children }) {
  const profile = await currentProfile();
  if (!profile) redirect('/login');
  if (!isStaff(profile)) redirect('/feed');

  return (
    <div className="admin">
      <header className="admin-top">
        <Link href="/admin" className="admin-brand">
          <span>My</span><span className="admin-brand-b">Promo</span>
          <span className="admin-badge">{profile.role}</span>
        </Link>
        <Link href="/feed" className="admin-out">التطبيق</Link>
        <form action="/auth/signout" method="post">
          <button className="admin-out">خروج</button>
        </form>
      </header>
      {children}
    </div>
  );
}
