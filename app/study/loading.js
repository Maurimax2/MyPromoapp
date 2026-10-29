// الدراسة while the catalogue is read.
//
// There was none once, so tapping the tab did nothing at all until every
// subject had arrived — it looked like the tab was broken. Now the screen is
// there the instant it is tapped, in its own shape: the title, the search,
// the years, the four tools two by two, then the subjects' banners.

export default function Loading() {
  return (
    <>
      <header className="st-top">
        <div className="sk sk-line big" style={{ width: 110 }} />
        <div className="sk" style={{ height: 48, borderRadius: 16 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="sk sk-line" style={{ width: 70, height: 38, borderRadius: 999 }} />
          ))}
        </div>
      </header>

      <div className="scroll st-flow">
        <div className="st-tools2">
          {[0, 1, 2, 3].map((i) => <div key={i} className="sk" style={{ height: 58, borderRadius: 18 }} />)}
        </div>
        <div className="sk sk-line" style={{ width: 120, marginTop: 8 }} />
        {[0, 1, 2].map((i) => <div key={i} className="sk olive" style={{ height: 160, borderRadius: 24 }} />)}
      </div>
    </>
  );
}
