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
