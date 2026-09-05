'use client';

// What is actually in the Drive.
//
// Before a single file is copied anywhere, this walks UNEM-PCEM2 folder by
// folder and shows the whole tree with real sizes. Every earlier inventory
// was built on a connector that quietly under-reported; this one either
// shows a folder's full contents or shows the error it hit.

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

const ROOT = 'root';
const PARALLEL = 5;

function fmt(bytes) {
  if (bytes == null) return '—';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} كب`;
  const mb = bytes / (1024 * 1024);
  if (mb < 1024) return `${mb.toFixed(1)} مب`;
  return `${(mb / 1024).toFixed(2)} جب`;
}

export default function InventoryPage() {
  // folderId -> { name, path, folders, files, error }
  const [tree, setTree] = useState({});
  const [pending, setPending] = useState(0);
  const [collapsed, setCollapsed] = useState({});
  const [fatal, setFatal] = useState(null);

  const walk = useCallback(async () => {
    const queue = [{ id: ROOT, name: 'UNEM-PCEM2', depth: 0 }];
    const seen = new Set();
    let active = 0;

    const next = async () => {
      while (queue.length && active < PARALLEL) {
        const node = queue.shift();
        if (seen.has(node.id)) continue;
        seen.add(node.id);
        active += 1;
        setPending((n) => n + 1);

        const qs = node.id === ROOT ? '' : `?id=${encodeURIComponent(node.id)}`;
        fetch(`/api/drive/list${qs}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.error) {
              setTree((t) => ({ ...t, [node.id]: { ...node, folders: [], files: [], error: data.error } }));
              if (node.id === ROOT) setFatal(data.error);
              return;
            }
            setTree((t) => ({ ...t, [node.id]: { ...node, folders: data.folders, files: data.files } }));
            for (const f of data.folders) {
              queue.push({ id: f.id, name: f.name, depth: node.depth + 1 });
            }
          })
          .catch((err) => {
            setTree((t) => ({ ...t, [node.id]: { ...node, folders: [], files: [], error: String(err) } }));
          })
          .finally(() => {
            active -= 1;
            setPending((n) => n - 1);
            next();
          });
      }
    };

    next();
  }, []);

  useEffect(() => { walk(); }, [walk]);

  const nodes = Object.values(tree);
  const totalFiles = nodes.reduce((n, x) => n + (x.files?.length || 0), 0);
  const totalFolders = Math.max(0, nodes.length - 1);
  const totalBytes = nodes.reduce(
    (n, x) => n + (x.files || []).reduce((m, f) => m + (f.bytes || 0), 0),
    0,
  );
  const scanning = pending > 0;

  function Folder({ id, depth }) {
    const node = tree[id];
    if (!node) {
      return (
        <div className="inv-row inv-wait" style={{ paddingInlineStart: 12 + depth * 14 }}>
          <span className="inv-name">…</span>
        </div>
      );
    }

    const shut = collapsed[id];
    const count = (node.files?.length || 0) + (node.folders?.length || 0);

    return (
      <>
        <button
          className="inv-row inv-folder"
          style={{ paddingInlineStart: 12 + depth * 14 }}
          onClick={() => setCollapsed((c) => ({ ...c, [id]: !c[id] }))}
        >
          <span className="inv-caret">{shut ? '▸' : '▾'}</span>
          <span className="inv-name" dir="ltr">{node.name}</span>
          <span className="inv-count">{count}</span>
        </button>

        {!shut && (
          <>
            {node.error && (
              <div className="inv-row inv-err" style={{ paddingInlineStart: 12 + (depth + 1) * 14 }}>
                {node.error}
              </div>
            )}
            {(node.folders || []).map((f) => (
              <Folder key={f.id} id={f.id} depth={depth + 1} />
            ))}
            {(node.files || []).map((f) => (
              <div
                key={f.id}
                className="inv-row inv-file"
                style={{ paddingInlineStart: 12 + (depth + 1) * 14 }}
              >
                <span className="inv-name" dir="ltr">{f.name}</span>
                <span className="inv-size">{fmt(f.bytes)}</span>
              </div>
            ))}
          </>
        )}
      </>
    );
  }

  return (
    <div className="app">
      <header className="head">
        <div className="head-row">
          <Link href="/feed" className="icobtn" aria-label="رجوع">←</Link>
          <div className="head-t">
            محتويات الدرايف
            <div className="head-s">UNEM-PCEM2 — قراءة فقط</div>
          </div>
        </div>

        <div className="inv-stats">
          <div><b>{totalFolders}</b><span>مجلد</span></div>
          <div><b>{totalFiles}</b><span>ملف</span></div>
          <div><b>{fmt(totalBytes)}</b><span>الحجم</span></div>
        </div>

        <div className={`inv-state ${scanning ? 'on' : ''}`}>
          {scanning ? `قيد المسح… (${pending})` : 'اكتمل المسح'}
        </div>
      </header>

      {fatal ? (
        <div className="inv-fatal">{fatal}</div>
      ) : (
        <div className="inv-tree">
          <Folder id={ROOT} depth={0} />
        </div>
      )}
    </div>
  );
}
