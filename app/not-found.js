import Link from 'next/link';
import Icon from '@/components/Icon';

// A link that no longer points anywhere — a deleted post, a mistyped address.
export default function NotFound() {
  return (
    <div className="scroll">
      <div className="empty">
        <div className="tile tint-purple"><Icon name="search" size={24} /></div>
        <div className="empty-t">لا شيء هنا</div>
        <div className="empty-b">الصفحة التي تبحث عنها غير موجودة، أو حُذفت.</div>
        <Link href="/feed" className="btn p" style={{ maxWidth: 240 }}>الرئيسية</Link>
      </div>
    </div>
  );
}
