import { getT } from '@/lib/lang';
// A duel while it is read: the arena is dark from the first frame, so it
// never flashes the light app on the way in.

export default async function Loading() {
  const t = await getT();
  return (
    <div className="arena">
      <div className="ar-top"><span className="ar-x" /><b className="grow">{t('تحدٍّ')}</b><span className="ar-x-pad" /></div>
      <div className="ar-body" style={{ animation: 'none' }}>
        <div className="ar-vs">
          <span className="ar-p"><span className="sk-dark" style={{ width: 88, height: 88, borderRadius: '50%' }} /></span>
          <span className="ar-mid"><b>VS</b></span>
          <span className="ar-p"><span className="sk-dark" style={{ width: 88, height: 88, borderRadius: '50%' }} /></span>
        </div>
        <span className="sk-dark" style={{ width: '100%', height: 130, borderRadius: 22 }} />
      </div>
    </div>
  );
}
