// الترتيب while the promo is counted: the tabs, the podium, you, the list.

export default function Loading() {
  return (
    <>
      <header className="head">
        <div className="head-row"><div className="grow"><div className="head-t">الترتيب</div></div></div>
      </header>
      <div className="scroll">
        <div className="sk" style={{ height: 50, borderRadius: 999 }} />
        <div className="sk dark" style={{ height: 262, borderRadius: 26 }} />
        <div className="sk" style={{ height: 70, borderRadius: 20 }} />
        {[0, 1, 2, 3].map((i) => <div key={i} className="sk" style={{ height: 58, borderRadius: 14 }} />)}
      </div>
    </>
  );
}
