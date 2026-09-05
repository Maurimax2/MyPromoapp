import Link from 'next/link';
import Icon from '@/components/Icon';

// The six years. Only PCEM2 has anything in it so far, and the row says so
// rather than pretending otherwise.
export default function PromoScreen({ promos, subjects, files }) {
  if (!promos.length) {
    return (
      <div className="admin-body">
        <section className="admin-card admin-seed">
          <div className="admin-card-t">قاعدة البيانات فارغة</div>
          <p className="admin-card-b">
            شغّل ملف <code>supabase/schema.sql</code> في Supabase أولًا — هو الذي
            ينشئ السنوات الست.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <div className="admin-bar"><span>السنوات</span><span>{promos.length}</span></div>
      <div className="admin-rows">
        {promos.map((p) => (
          <Link key={p.id} href={`/admin/content?promo=${p.id}`} className="ctm">
            <span className="ctm-badge" style={{ background: p.badge }}>{p.name}</span>
            <div className="grow">
              <div className="ctm-t">{p.label}</div>
              <div className="ctm-b">
                {subjects[p.id]
                  ? `${subjects[p.id]} مادة · ${files[p.id]} ملف`
                  : 'لا مواد بعد'}
              </div>
            </div>
            <Icon name="chev" size={18} />
          </Link>
        ))}
      </div>
    </div>
  );
}
