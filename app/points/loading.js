import { getT } from '@/lib/lang';
// الترتيب while the promo is counted: the green head with its tabs and
// podium, then you and the list on the sheet under it.

export default async function Loading() {
  const t = await getT();
  const pale = { background: 'rgba(255,255,255,.12)' };
  return (
    <div className="scroll">
      <header className="rk-head">
        <div className="rk-title"><b>{t('الترتيب')}</b></div>
        <div className="rk-tabs" style={{ height: 50 }} />
        <div style={{ ...pale, height: 38, width: 200, borderRadius: 999, margin: '14px auto 0' }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 24 }}>
          {[150, 190, 130].map((h, i) => <div key={i} style={{ ...pale, flex: 1, height: h, borderRadius: '14px 14px 0 0' }} />)}
        </div>
      </header>
      <div className="rk-sheet">
        <div className="sk" style={{ height: 70, borderRadius: 20 }} />
        {[0, 1, 2, 3].map((i) => <div key={i} className="sk" style={{ height: 58, borderRadius: 14 }} />)}
      </div>
    </div>
  );
}
