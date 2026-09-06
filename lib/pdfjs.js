// pdf.js, with the one method it needs and no browser has yet.
//
// pdfjs-dist 6.3 calls `Map.prototype.getOrInsertComputed` — a proposal so
// recent that nothing ships it: not Chrome, not Safari. The document loads,
// the page count appears, and then every page throws
//
//   TypeError: this[#methodPromises].getOrInsertComputed is not a function
//
// and nothing is ever drawn. On screen that is a viewer that spins for ever,
// which is exactly what a slow network looks like — it cost most of a day
// looking at the wrong thing.
//
// Both halves need it: the library and its worker, which runs in its own
// realm and gets the polyfill through the copied worker file.

function polyfill() {
  if (typeof Map === 'undefined') return;

  if (!Map.prototype.getOrInsertComputed) {
    Object.defineProperty(Map.prototype, 'getOrInsertComputed', {
      value: function getOrInsertComputed(key, callback) {
        if (!this.has(key)) this.set(key, callback(key));
        return this.get(key);
      },
      writable: true, configurable: true,
    });
  }

  if (!Map.prototype.getOrInsert) {
    Object.defineProperty(Map.prototype, 'getOrInsert', {
      value: function getOrInsert(key, value) {
        if (!this.has(key)) this.set(key, value);
        return this.get(key);
      },
      writable: true, configurable: true,
    });
  }
}

/** The library, ready to use. */
export async function pdfjs() {
  polyfill();
  const lib = await import('pdfjs-dist');
  lib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
  return lib;
}
