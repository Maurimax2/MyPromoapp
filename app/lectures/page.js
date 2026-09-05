import Icon from '@/components/Icon';
import { TODAY } from '@/lib/data';

export default function Lectures() {
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">المحاضرات</div>
            <div className="head-s">جدول اليوم</div>
          </div>
          <button className="icobtn" aria-label="الجدول"><Icon name="clock" size={19} /></button>
        </div>
      </header>

      <div className="scroll">
        {TODAY.length === 0 && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="clock" size={24} /></div>
            <div className="empty-t">لا جدول بعد</div>
            <div className="empty-b">سيظهر هنا حين يُضاف جدول المحاضرات.</div>
          </div>
        )}
        {TODAY.map((l) => (
          <div key={l.time} className="card">
            <div className="card-row">
              <div style={{ width: 52, flexShrink: 0, textAlign: 'center' }}>
                <div style={{
                  fontSize: 15, fontWeight: 700, color: 'var(--purple)',
                  fontVariantNumeric: 'tabular-nums',
                }}>{l.time}</div>
              </div>
              <div className={`tile sm tint-${l.tint}`} style={{ width: 3, height: 38, borderRadius: 3 }} />
              <div className="grow">
                <div className="nm">{l.title}</div>
                <div className="mt">{l.prof} · {l.module}</div>
              </div>
              <span className="chev"><Icon name="chev" size={18} /></span>
            </div>
          </div>
        ))}

        <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--ink-3)', padding: '16px 0' }}>
          لا محاضرات أخرى اليوم
        </p>
      </div>
    </>
  );
}
