import Link from 'next/link';
import Icon from '@/components/Icon';
import { supabaseServer } from '@/lib/supabase/server';
import { PROMOS } from '@/lib/data';
import Answers from './Answers';

export const dynamic = 'force-dynamic';

// آراء الطلبة — everything students said on شاركنا رأيك.
//
// Read with the staff session, not the service key: the table's own policy
// says staff read it, and a screen that goes around its own policy is a screen
// that cannot be trusted to prove the policy works.
export default async function Feedback({ searchParams }) {
  const params = await searchParams;
  const promo = typeof params?.promo === 'string' ? params.promo : '';

  const sb = await supabaseServer();
  let q = sb.from('feedback')
    .select('id, promo, needs, pain, wish, reach, name, phone, source, created_at')
    .order('created_at', { ascending: false })
    .limit(500);
  if (promo) q = q.eq('promo', promo);

  const { data: rows, error } = await q;

  // The table may not have been created yet — this migration is pasted by
  // hand like the others. Say which thing is missing rather than printing an
  // empty screen that reads as "nobody answered".
  const missing = error && /relation .*feedback.* does not exist|schema cache/i.test(error.message || '');

  const all = rows || [];
  const years = [...new Set(all.map((r) => r.promo))];
  const nameOf = (id) => PROMOS.find((p) => p.id === id)?.name || id.toUpperCase();

  // What students asked for, counted. The whole reason for asking.
  const tally = new Map();
  for (const r of all) for (const n of r.needs || []) tally.set(n, (tally.get(n) || 0) + 1);
  const wanted = [...tally.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="admin-body">
      <div className="admin-card" style={{ display: 'block' }}>
        <div className="admin-card-t">آراء الطلبة</div>
        <div className="admin-card-b">ما كتبه الطلبة في صفحة شاركنا رأيك، الأحدث أولاً.</div>
      </div>

      {missing && (
        <div className="admin-err">
          الجدول غير موجود بعد — الصق <code>supabase/feedback.sql</code> في Supabase.
        </div>
      )}
      {error && !missing && <div className="admin-err">تعذّرت القراءة — {error.message}</div>}

      {!error && (
        <>
          <div className="admin-grid">
            <div className="admin-tile" style={{ cursor: 'default' }}>
              <Icon name="msgs" size={19} />
              <b>{all.length}</b>
              <span>رأي</span>
            </div>
            <div className="admin-tile" style={{ cursor: 'default' }}>
              <Icon name="user" size={19} />
              <b>{all.filter((r) => r.reach && (r.phone || r.name)).length}</b>
              <span>ترك وسيلة تواصل</span>
            </div>
          </div>

          {wanted.length > 0 && (
            <div className="admin-card" style={{ display: 'block' }}>
              <div className="admin-card-t">ما يحتاجونه أثناء المراجعة</div>
              <div className="fb-tally">
                {wanted.map(([n, c]) => (
                  <span key={n} className="fb-need" dir="auto">
                    {n}
                    <b>{c}</b>
                  </span>
                ))}
              </div>
            </div>
          )}

          {years.length > 1 && (
            <div className="chips" style={{ margin: '4px 0 12px' }}>
              <Link href="/admin/feedback" className={`pill${promo ? ' grey' : ' solid'}`}>الكل</Link>
              {years.map((y) => (
                <Link key={y} href={`/admin/feedback?promo=${y}`}
                  className={`pill${promo === y ? ' solid' : ' grey'}`} dir="ltr">
                  {nameOf(y)}
                </Link>
              ))}
            </div>
          )}

          <Answers rows={all} />
        </>
      )}
    </div>
  );
}
