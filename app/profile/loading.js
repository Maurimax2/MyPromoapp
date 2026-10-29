// أنا while your numbers are counted: the green head with the search and
// you, then the numbers, your days and the list on the sheet under it.

export default function Loading() {
  const pale = { background: 'rgba(255,255,255,.12)' };
  return (
    <div className="scroll st-flow">
      <header className="me2-head">
        <div className="me2-find" />
        <div style={{ ...pale, width: 112, height: 112, borderRadius: '50%', margin: '18px auto 0' }} />
        <div style={{ ...pale, width: 140, height: 22, borderRadius: 8, margin: '16px auto 0' }} />
        <div style={{ ...pale, width: 190, height: 12, borderRadius: 6, margin: '10px auto 0' }} />
      </header>
      <div className="me2-sheet">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8 }}>
          {[0, 1, 2, 3].map((i) => <div key={i} className="sk" style={{ height: 80, borderRadius: 16 }} />)}
        </div>
        <div className="sk" style={{ height: 250, borderRadius: 22 }} />
        <div className="sk" style={{ height: 120, borderRadius: 18 }} />
      </div>
    </div>
  );
}
