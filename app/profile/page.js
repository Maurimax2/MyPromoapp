import Link from 'next/link';
import Icon from '@/components/Icon';
import { promoById } from '@/lib/data';

const ITEMS = [
  { icon: 'bookmark', label: 'ملفاتي المحفوظة', n: '12' },
  { icon: 'book2',    label: 'منشوراتي',        n: '8'  },
  { icon: 'archive',  label: 'سجل التحميلات',   n: ''   },
  { icon: 'settings', label: 'الإعدادات',       n: ''   },
];

function Stat({ n, label, colour }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontSize: 19, fontWeight: 700, color: colour, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
      <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function Profile() {
  const promo = promoById('pcem2');
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="head-t">الملف الشخصي</div>
          <button className="icobtn" aria-label="الإعدادات"><Icon name="settings" size={19} /></button>
        </div>
      </header>

      <div className="scroll">
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11 }}>
          <div className="av" style={{ width: 68, height: 68, fontSize: 22, background: 'var(--purple)' }}>ه ب</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>هَمَد بشير</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, justifyContent: 'center', marginTop: 6 }}>
              <span className="pill solid" style={{ background: promo.badge, fontSize: 11 }}>{promo.name}</span>
              <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>طب · UNEM</span>
            </div>
          </div>
          <div style={{
            display: 'flex', width: '100%', marginTop: 6, paddingTop: 14,
            borderTop: '1px solid var(--line-soft)',
          }}>
            <Stat n="8" label="منشور" colour="var(--purple)" />
            <Stat n="12" label="محفوظ" colour="var(--orange)" />
            <Stat n="34" label="تعليق" colour="var(--purple-light)" />
          </div>
        </div>

        {ITEMS.map((it) => (
          <div key={it.label} className="card">
            <div className="card-row">
              <div className="tile sm tint-grey"><Icon name={it.icon} size={18} /></div>
              <div className="grow"><div className="nm" style={{ fontSize: 14 }}>{it.label}</div></div>
              {it.n && <span className="cnt">{it.n}</span>}
              <span className="chev"><Icon name="chev" size={18} /></span>
            </div>
          </div>
        ))}

        <Link href="/login" className="card">
          <div className="card-row">
            <div className="tile sm tint-grey"><Icon name="logout" size={18} /></div>
            <div className="grow"><div className="nm" style={{ fontSize: 14 }}>تسجيل الخروج</div></div>
            <span className="chev"><Icon name="chev" size={18} /></span>
          </div>
        </Link>
      </div>
    </>
  );
}
