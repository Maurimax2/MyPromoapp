// أنا while your numbers are counted.

export default function Loading() {
  return (
    <>
      <header className="st-top">
        <div className="st-title"><span className="grow"><b>أنا</b></span></div>
      </header>

      <div className="scroll st-flow">
        <div className="sk olive" style={{ height: 238, borderRadius: 26 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8 }}>
          {[0, 1, 2, 3].map((i) => <div key={i} className="sk" style={{ height: 80, borderRadius: 16 }} />)}
        </div>
        <div className="sk" style={{ height: 250, borderRadius: 22 }} />
        <div className="sk" style={{ height: 120, borderRadius: 18 }} />
      </div>
    </>
  );
}
