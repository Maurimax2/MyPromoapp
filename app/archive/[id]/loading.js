// A subject while its whole catalogue is read.
//
// The heaviest read in the app — every lecture, every paper, every chapter of
// one subject — and it is reached by tapping a banner, which makes the wait
// the most noticeable one there is: you press a picture and nothing happens.
//
// So the banner is drawn at once, in olive, the shape the subject arrives in:
// the banner, the four tabs, then chapters. Which colour and which model are
// the server's to say, so neither is guessed here.

export default function Loading() {
  return (
    <div className="sj">
      <div className="sj-hero" style={{ '--sj-bg': '#2A5B3E' }}>
        <div className="sj-hero-top">
          <span className="sj-back" />
        </div>
        <div className="sj-hero-t" style={{ gap: 8, marginTop: 20 }}>
          <span className="sk-dark" style={{ width: '40%', height: 10 }} />
          <span className="sk-dark" style={{ width: '85%', height: 26 }} />
          <span className="sk-dark" style={{ width: '60%', height: 10 }} />
        </div>
        <div className="sj-hero-p">
          <span className="sk-dark" style={{ width: 58, height: 58, borderRadius: '50%' }} />
          <span className="sk-dark" style={{ width: '55%', height: 10 }} />
        </div>
      </div>

      <div className="sj-tabs">
        <span className="sk" style={{ flex: 1, height: 44, margin: 4, borderRadius: 12 }} />
      </div>

      <div className="sj-body">
        <div className="sj-pane">
          {[0, 1, 2].map((c) => (
            <div key={c} className="sk" style={{ height: 78, borderRadius: 20 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
