// الدراسة while the catalogue is read.
//
// There was none, so tapping the tab did nothing at all until every subject
// and its counts had arrived — it looked like the tab was broken. Now the
// screen is there the instant it is tapped: the title, the four doors, the 3D
// card and the subjects, each the size it will be.

export default function Loading() {
  return (
    <>
      <header className="st-top">
        <div className="sk sk-line big" style={{ width: 110 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="sk sk-line" style={{ width: 64, height: 34, borderRadius: 999 }} />
          ))}
        </div>
      </header>

      <div className="scroll st-flow">
        <div className="st-tools">
          <div className="sk olive" style={{ height: 116, borderRadius: 20 }} />
          <div className="sk dark" style={{ height: 116, borderRadius: 20 }} />
          <div className="sk" style={{ height: 116, borderRadius: 20 }} />
          <div className="sk" style={{ height: 116, borderRadius: 20 }} />
        </div>

        <div className="sk dark" style={{ height: 152, borderRadius: 24, marginTop: 34 }} />

        <div className="sk sk-line" style={{ width: 120, marginTop: 8 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: 12, rowGap: 46, paddingTop: 36 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="sk olive" style={{ height: 124, borderRadius: 20 }} />
          ))}
        </div>
      </div>
    </>
  );
}
