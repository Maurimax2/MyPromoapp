// Several bundles in one scene.
//
// Every bundle is carved in the same world frame — one standing body, metres,
// y measured off the floor — so `membre-sup` and `muscles-sup` fetched
// together already sit on each other. There is no registration step and no
// transform to guess: that was true from the first carve, and the reader
// simply never asked for two.
//
// What does have to be handled is identity. Two bundles can each hold a
// structure called `Corps (diaphyse)`, and a scene that keys meshes by name
// alone would light up the wrong bone. So every structure in a composed scene
// is addressed as `<bundle>/<name>`, and the bundle is carried on the mesh so
// its description can be looked up in the right book.

/** How a structure is addressed once several bundles share a scene. */
export const keyOf = (bundle, name) => `${bundle}/${name}`;

/** …and back again. */
export function unkey(key) {
  const cut = String(key).indexOf('/');
  return cut < 0
    ? { bundle: null, name: String(key) }
    : { bundle: key.slice(0, cut), name: key.slice(cut + 1) };
}

/**
 * Fetch the manifests, geometry and landmarks of several bundles at once.
 *
 * A bundle that will not load is dropped rather than allowed to take the
 * scene down with it: one missing file should cost a student that one layer,
 * not the eleven structures that did arrive.
 */
export async function loadScene(ids) {
  const loaded = await Promise.all(ids.map(async (id) => {
    try {
      const [meta, bin] = await Promise.all([
        fetch(`/anatomy/${id}.json`).then((r) => {
          if (!r.ok) throw new Error('manifest');
          return r.json();
        }),
        fetch(`/anatomy/${id}.bin`).then((r) => {
          if (!r.ok) throw new Error('geometry');
          return r.arrayBuffer();
        }),
      ]);
      // Landmarks are a separate small file and a bundle is allowed to have
      // none: only the skull has any so far, and the rest still draw.
      const named = await fetch(`/anatomy/${id}.points.json`)
        .then((r) => (r.ok ? r.json() : { points: [] }))
        .catch(() => ({ points: [] }));
      return { id, meta, bin, points: named.points || [] };
    } catch {
      return null;
    }
  }));
  return loaded.filter(Boolean);
}

/** The box around everything loaded, in world coordinates. */
export function boundsOf(layers) {
  const lo = [Infinity, Infinity, Infinity];
  const hi = [-Infinity, -Infinity, -Infinity];
  for (const l of layers) {
    for (let k = 0; k < 3; k++) {
      lo[k] = Math.min(lo[k], l.meta.bounds[0][k]);
      hi[k] = Math.max(hi[k], l.meta.bounds[1][k]);
    }
  }
  return [lo, hi];
}

/**
 * The box the camera opens on.
 *
 * The region says, because a scene holding a limb and a hand framed on
 * everything it contains shows neither of them. Failing that the lead bundle's
 * own frame, then everything.
 */
export function frameOf(layers, region, lead) {
  if (region?.frame) return region.frame;
  const first = layers.find((l) => l.id === lead) || layers[0];
  return first?.meta.frame || boundsOf(layers);
}
