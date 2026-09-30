// The shapes a screen wears while it waits.
//
// A grey rectangle says "something is coming". A rectangle with a tile where
// the tile goes and two lines where the name and the count go says *what* is
// coming, and — this is the part that matters — occupies the same space, so
// nothing jumps when the real thing lands.
//
// These are the two shapes the app repeats: a row in a list, and a post.

/** A card in a list: subject, chapter, conversation, notification. */
export function SkRow() {
  return (
    <div className="card">
      <div className="card-row">
        <div className="sk sk-flat" style={{ width: 46, height: 46, borderRadius: 15 }} />
        <div className="grow">
          <div className="sk sk-line" style={{ width: '46%' }} />
          <div className="sk sk-line" style={{ width: '28%', height: 11, marginTop: 7 }} />
        </div>
      </div>
    </div>
  );
}

/** A post in الرئيسية: who wrote it, when, and what they said. */
export function SkPost() {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div className="sk sk-flat" style={{ width: 40, height: 40, borderRadius: '50%' }} />
        <div className="grow">
          <div className="sk sk-line" style={{ width: '44%' }} />
          <div className="sk sk-line" style={{ width: '26%', height: 11, marginTop: 6 }} />
        </div>
      </div>
      <div className="sk sk-line" style={{ width: '92%', marginTop: 15 }} />
      <div className="sk sk-line" style={{ width: '70%', marginTop: 8 }} />
    </div>
  );
}

/**
 * A whole screen while it waits: its own header, named, over the shape of
 * what is coming. Before these existed a tap on a screen without one left
 * the last screen standing until the server answered — which on mobile data
 * reads as a button that did nothing.
 */
export function SkScreen({ title, rows = 5, post = false, hero = false }) {
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="sk sk-flat" style={{ width: 40, height: 40, borderRadius: 14 }} />
          <div className="grow">
            {title
              ? <div className="head-t">{title}</div>
              : <div className="sk sk-line big" style={{ width: '50%' }} />}
          </div>
        </div>
      </header>
      <div className="scroll">
        {hero && <div className="sk" style={{ height: 150, borderRadius: 22 }} />}
        {Array.from({ length: rows }, (_, i) => (post ? <SkPost key={i} /> : <SkRow key={i} />))}
      </div>
    </>
  );
}

/** A 3D model while its geometry arrives: the stage, and a pulse where it will stand. */
export function SkModel() {
  return (
    <>
      <header className="head" style={{ paddingBottom: 12 }}>
        <div className="head-row">
          <div className="sk sk-flat" style={{ width: 40, height: 40, borderRadius: 14 }} />
          <div className="grow">
            <div className="sk sk-line big" style={{ width: '55%' }} />
            <div className="sk sk-line" style={{ width: '35%', marginTop: 7 }} />
          </div>
        </div>
      </header>
      <div className="sk-model"><div className="sk sk-model-core" /></div>
    </>
  );
}
