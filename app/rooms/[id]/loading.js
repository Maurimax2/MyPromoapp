// A study room while it is read: the title bar, the clock, the seats.

export default function Loading() {
  return (
    <div className="rm">
      <div className="rm-top">
        <span className="rm-back" />
        <span className="grow">
          <span className="sk sk-line" style={{ width: '60%', display: 'block' }} />
          <span className="sk sk-line" style={{ width: '35%', display: 'block', marginTop: 6 }} />
        </span>
      </div>
      <div className="rm-flow">
        <div className="sk dark" style={{ height: 144, borderRadius: 24 }} />
        <div className="rm-seats">
          <div className="sk olive" style={{ height: 106, borderRadius: 20 }} />
          <div className="sk olive" style={{ height: 106, borderRadius: 20 }} />
        </div>
      </div>
    </div>
  );
}
