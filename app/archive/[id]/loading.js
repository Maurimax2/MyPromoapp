// A subject while its whole catalogue is read.
//
// The heaviest read in the app — every lecture, every paper, every chapter of
// one subject — and it is reached by tapping a banner, which makes the wait
// the most noticeable one there is: you press a picture and nothing happens.
//
// The chapter shape is drawn rather than a stack of identical rows, because
// that is what arrives: a numbered heading, then its lectures under it.

export default function Loading() {
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="sk sk-flat" style={{ width: 44, height: 44, borderRadius: 13 }} />
          <div className="grow">
            <div className="sk sk-line big" style={{ width: '55%' }} />
            <div className="sk sk-line" style={{ width: '35%', marginTop: 7 }} />
          </div>
        </div>
      </header>

      <div className="scroll">
        {/* اختبر نفسك sits at the top of every subject. */}
        <div className="sk" style={{ height: 64 }} />

        {[0, 1].map((c) => (
          <section key={c} className="chapter">
            <div className="chapter-head">
              <span className="sk sk-flat" style={{ width: 27, height: 27, borderRadius: 9 }} />
              <div className="grow">
                <div className="sk sk-line" style={{ width: '58%' }} />
                <div className="sk sk-line" style={{ width: '26%', height: 11, marginTop: 6 }} />
              </div>
            </div>
            <div className="sk" style={{ height: 58, marginTop: 8 }} />
            <div className="sk" style={{ height: 58, marginTop: 8 }} />
          </section>
        ))}
      </div>
    </>
  );
}
