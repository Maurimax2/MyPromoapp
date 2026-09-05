// Reading the shared Drive directly, through the official API.
//
// The folder `UNEM-PCEM2` belongs to someone else and is shared read-only,
// so everything here is a GET. Nothing in this file can rename, move or
// delete anything in it.
//
// Why the API and not the connector we used before: the connector returned
// partial listings — folders it had already shown came back empty on the
// next call. Here we page explicitly with `nextPageToken` until Drive says
// there is nothing left, so a listing is either complete or an error.

export const ROOT_FOLDER = '1WzuNzfrhL2blHChfZx-6KsHKdKE_o0of'; // UNEM-PCEM2

const ENDPOINT = 'https://www.googleapis.com/drive/v3/files';
const FIELDS = 'nextPageToken,files(id,name,mimeType,size,modifiedTime)';

export const FOLDER_MIME = 'application/vnd.google-apps.folder';

export function isFolder(item) {
  return item.mimeType === FOLDER_MIME;
}

/** Every child of one folder, following paging to the end. */
export async function listFolder(folderId, key) {
  const items = [];
  let pageToken = null;

  do {
    const url = new URL(ENDPOINT);
    url.searchParams.set('q', `'${folderId}' in parents and trashed = false`);
    url.searchParams.set('fields', FIELDS);
    url.searchParams.set('pageSize', '1000');
    url.searchParams.set('orderBy', 'folder,name_natural');
    url.searchParams.set('supportsAllDrives', 'true');
    url.searchParams.set('includeItemsFromAllDrives', 'true');
    url.searchParams.set('key', key);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Drive ${res.status}: ${body.slice(0, 300)}`);
    }

    const data = await res.json();
    items.push(...(data.files || []));
    pageToken = data.nextPageToken || null;
  } while (pageToken);

  return items;
}

/** The folder or file id inside a Drive link, or null if it is not one. */
export function driveIdFromUrl(url) {
  const text = String(url || '').trim();
  const patterns = [
    /\/folders\/([A-Za-z0-9_-]{10,80})/,
    /\/file\/d\/([A-Za-z0-9_-]{10,80})/,
    /[?&]id=([A-Za-z0-9_-]{10,80})/,
    /^([A-Za-z0-9_-]{20,80})$/,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m) return m[1];
  }
  return null;
}

/**
 * Everything under a folder, flattened, with the path that led to each file.
 * Bounded: a folder with ten thousand files would time out the request and
 * nobody wants to name ten thousand files in one sitting anyway.
 */
export async function walkFolder(folderId, key, { maxFiles = 600, maxDepth = 6 } = {}) {
  const files = [];
  const queue = [{ id: folderId, path: [], depth: 0 }];
  let truncated = false;

  while (queue.length) {
    const node = queue.shift();
    if (node.depth > maxDepth) continue;

    for (const item of await listFolder(node.id, key)) {
      if (isFolder(item)) {
        queue.push({ id: item.id, path: [...node.path, item.name], depth: node.depth + 1 });
        continue;
      }
      if (files.length >= maxFiles) { truncated = true; continue; }
      files.push({
        id: item.id,
        name: item.name,
        path: node.path,
        bytes: item.size ? Number(item.size) : null,
        mime: item.mimeType,
      });
    }
  }

  return { files, truncated };
}

// What a file is called in Drive is not what a student should read. Strip the
// extension, the leading `-5-`, the underscores, the `(1)` Drive adds to a
// second copy, and the year a folder already carries.
export function cleanName(name) {
  return name
    .replace(/\.[a-z0-9]{1,5}$/i, '')
    .replace(/^[\s\-_.]*\d{1,2}\s*[-_.]\s*/, '')
    .replace(/\(\d+\)\s*$/, '')
    .replace(/[_]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** A first guess at what kind of document this is, from its folder and name. */
export function guessKind(file) {
  const hay = [...file.path, file.name].join(' ').toLowerCase();
  if (/isol/.test(hay)) return { where: 'quiz', section: 'isole' };
  if (/qcm|qcr|ed\b|td\b/.test(hay)) return { where: 'quiz', section: 'qcm' };
  if (/exam|epreuve|épreuve|rattrap|session|compo/.test(hay)) return { where: 'quiz', section: 'exam' };
  if (/r[ée]sum|fiche/.test(hay)) return { where: 'notes', section: 'resume' };
  if (/note/.test(hay)) return { where: 'notes', section: 'note' };
  if (/sch[ée]ma/.test(hay)) return { where: 'archive', section: 'schema' };
  if (/livre|atlas|kamina|netter|gray/.test(hay)) return { where: 'archive', section: 'livre' };
  if (/poly/.test(hay)) return { where: 'archive', section: 'poly' };
  return { where: 'archive', section: 'lecture' };
}
