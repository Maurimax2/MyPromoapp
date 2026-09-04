import Link from 'next/link';
import Logo from '@/components/Logo';

// Sign-in is deliberately open while we are testing: the button just goes in.
// Nothing here authenticates anybody yet.
export default function Login() {
  return (
    <div style={{
      minHeight: '100dvh', background: 'var(--surface)', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px',
    }}>
      <Logo size={74} id="login" />
      <div style={{ fontSize: 31, fontWeight: 700, marginTop: 18, letterSpacing: '-.02em' }}>
        <span style={{ color: 'var(--ink)' }}>My</span>
        <span style={{ color: 'var(--purple)' }}>Promo</span>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 11, marginTop: 40 }}>
        <Link href="/feed" className="btn p">تسجيل الدخول</Link>
        <Link href="/feed" className="btn g">إنشاء حساب</Link>
      </div>

      <p style={{
        fontSize: 11.5, color: 'var(--ink-3)', lineHeight: 1.9, textAlign: 'center',
        marginTop: 22, maxWidth: 250,
      }}>
        بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
      </p>
    </div>
  );
}
