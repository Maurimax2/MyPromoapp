import Link from 'next/link';
import Logo from '@/components/Logo';

const ROLE = {
  owner: 'مالك', admin: 'مشرف', editor: 'محرّر',
  marketing: 'تسويق', student: 'طالب',
};

export default function SignedIn({ profile, home }) {
  const waiting = profile.status === 'pending';

  return (
    <div className="login">
      <Logo size={74} id="login" />
      <div className="login-name">
        <span>My</span><span className="login-name-b">Promo</span>
      </div>

      <div className="login-sent">
        <div className="login-sent-t">أنت داخل بالفعل</div>
        <div className="login-sent-b">
          <span dir="ltr">{profile.email}</span><br />
          {ROLE[profile.role] || profile.role}
        </div>

        {waiting ? (
          <p className="login-terms">حسابك بانتظار موافقة مشرف.</p>
        ) : (
          <Link className="btn p" href={home}>ادخل</Link>
        )}

        <form action="/auth/signout" method="post" className="login-out">
          <button className="btn g">خروج</button>
        </form>
      </div>
    </div>
  );
}
