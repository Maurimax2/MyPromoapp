import Link from 'next/link';
import Icon from '@/components/Icon';
import { getT } from '@/lib/lang';

// A link that no longer points anywhere — a deleted post, a mistyped address.
export default async function NotFound() {
  const t = await getT();
  return (
    <div className="scroll">
      <div className="empty">
        <div className="tile tint-olive"><Icon name="search" size={24} /></div>
        <div className="empty-t">{t('لا شيء هنا')}</div>
        <div className="empty-b">{t('الصفحة التي تبحث عنها غير موجودة، أو حُذفت.')}</div>
        <Link href="/feed" className="btn p" style={{ maxWidth: 240 }}>{t('الرئيسية')}</Link>
      </div>
    </div>
  );
}
