import { Suspense } from 'react';
import Link from 'next/link';
import AdminHeader from './AdminHeader';
import AdminLogin from './AdminLogin';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { staffEmails, syncStaffRole } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

// Everything under /admin is staff only. The check is on the server, before a
// single byte of the panel is sent — a student who guesses the URL never sees
// a page that merely hides its buttons.
//
// It is also its own door. Nothing in the student app links here and the
// app's own sign-in lands everybody, staff included, in the app: the panel is
// reached by coming to this address and signing in with a staff email. So
// somebody arriving with no session gets this form, not a bounce to /login
// that would take them straight back to the app afterwards.
//
// What it must NOT do is bounce silently. It used to redirect anyone who was
// not staff straight to the feed, which is indistinguishable from "there is no
// admin page" — and that is exactly how it read when my own account was still
// filed as a student. Being turned away now says who you are and why.
export default async function AdminLayout({ children }) {
  const profile = await syncStaffRole(await currentProfile());
  if (!profile) return <div className="admin"><AdminLogin /></div>;

  if (!isStaff(profile)) {
    const listed = staffEmails().includes((profile.email || '').toLowerCase());
    const configured = staffEmails().length > 0;

    return (
      <div className="admin">
        <header className="admin-top">
          <Link href="/admin" className="admin-mark">
            <span>My</span><span className="admin-brand-b">Promo</span>
          </Link>
          <div className="grow" />
          <Link href="/feed" className="admin-out">التطبيق</Link>
        </header>
        <div className="admin-body">
          <section className="admin-card admin-seed">
            <div className="admin-card-t">هذا الحساب ليس من الطاقم</div>
            <p className="admin-card-b">
              <span dir="ltr">{profile.email}</span> — الدور الحالي: {profile.role}
              {profile.status !== 'approved' ? ` · ${profile.status}` : ''}
            </p>
            <p className="admin-card-b">
              {!configured
                ? 'المتغيّر ADMIN_EMAILS غير مضبوط على الخادم، فلا أحد يدخل اللوحة. اضبطه ثم أعد النشر، ثم اخرج وادخل من جديد.'
                : listed
                  ? 'بريدك مدرج في ADMIN_EMAILS لكن تعذّر تحديث الدور — تحقّق من SUPABASE_SERVICE_ROLE_KEY على الخادم.'
                  : 'بريدك غير مدرج في ADMIN_EMAILS. أضفه ثم أعد النشر — لا حاجة للخروج والدخول.'}
            </p>
            <form action="/auth/signout" method="post">
              <button className="btn p">خروج</button>
            </form>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <Suspense fallback={<div className="admin-top" />}>
        <AdminHeader role={profile.role} />
      </Suspense>
      {children}
    </div>
  );
}
