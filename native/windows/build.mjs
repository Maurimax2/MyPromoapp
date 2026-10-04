// Builds MyPromo.exe, the laptop app.
//
//   node native/windows/build.mjs
//
// Needs nothing installed beyond Node and Windows itself: the compiler is the
// csc.exe every Windows carries (.NET Framework 4), and the one thing that is
// not on the machine — Microsoft's WebView2 libraries — is fetched from NuGet
// the first time and kept in native/windows/build/.
//
// Writes public/MyPromo.exe, which /download hands out.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const build = path.join(here, 'build');
const require = createRequire(path.join(root, 'package.json'));
const sharp = require('sharp');

const VERSION = '1.0.2592.51';                       // WebView2 SDK
const CSC = 'C:/Windows/Microsoft.NET/Framework64/v4.0.30319/csc.exe';
fs.mkdirSync(build, { recursive: true });

// ---- the WebView2 libraries
const pkg = path.join(build, 'webview2.nupkg');
if (!fs.existsSync(path.join(build, 'lib', 'net462', 'Microsoft.Web.WebView2.Core.dll'))) {
  console.log('fetching WebView2', VERSION);
  const url = `https://api.nuget.org/v3-flatcontainer/microsoft.web.webview2/${VERSION}/microsoft.web.webview2.${VERSION}.nupkg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`NuGet answered ${res.status}`);
  fs.writeFileSync(pkg, Buffer.from(await res.arrayBuffer()));
  // A .nupkg is a zip; PowerShell can open one without anything installed.
  execFileSync('powershell', ['-NoProfile', '-Command',
    `Copy-Item '${pkg}' '${pkg}.zip' -Force; Expand-Archive -Path '${pkg}.zip' -DestinationPath '${build}' -Force`]);
}
const lib = (...p) => path.join(build, ...p);

// ---- the icon: one .ico holding several sizes, each a PNG
const sizes = [16, 24, 32, 48, 64, 128, 256];
const pngs = await Promise.all(sizes.map((s) =>
  sharp(path.join(root, 'public', 'icon-512.png')).resize(s, s).png().toBuffer()));
const head = Buffer.alloc(6); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = Buffer.concat(sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e[0] = s === 256 ? 0 : s; e[1] = s === 256 ? 0 : s;
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
}));
const ico = path.join(build, 'MyPromo.ico');
fs.writeFileSync(ico, Buffer.concat([head, dir, ...pngs]));

// ---- the manifest: sharp text on a high-DPI screen, and Windows 10/11 named
const manifest = path.join(build, 'MyPromo.manifest');
fs.writeFileSync(manifest, `<?xml version="1.0" encoding="utf-8"?>
<assembly manifestVersion="1.0" xmlns="urn:schemas-microsoft-com:asm.v1">
  <trustInfo xmlns="urn:schemas-microsoft-com:asm.v3">
    <security><requestedPrivileges><requestedExecutionLevel level="asInvoker" uiAccess="false" /></requestedPrivileges></security>
  </trustInfo>
  <compatibility xmlns="urn:schemas-microsoft-com:compatibility.v1">
    <application><supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}" /></application>
  </compatibility>
  <application xmlns="urn:schemas-microsoft-com:asm.v3">
    <windowsSettings>
      <dpiAware xmlns="http://schemas.microsoft.com/SMI/2005/WindowsSettings">true/pm</dpiAware>
      <dpiAwareness xmlns="http://schemas.microsoft.com/SMI/2016/WindowsSettings">PerMonitorV2</dpiAwareness>
    </windowsSettings>
  </application>
</assembly>
`);

// ---- compile
const out = path.join(here, 'dist', 'MyPromo.exe');
fs.mkdirSync(path.dirname(out), { recursive: true });
execFileSync(CSC, [
  '/nologo', '/target:winexe', '/optimize+', `/out:${out}`,
  `/win32icon:${ico}`, `/win32manifest:${manifest}`,
  '/r:System.Windows.Forms.dll', '/r:System.Drawing.dll',
  `/r:${lib('lib', 'net462', 'Microsoft.Web.WebView2.Core.dll')}`,
  `/r:${lib('lib', 'net462', 'Microsoft.Web.WebView2.WinForms.dll')}`,
  `/resource:${lib('lib', 'net462', 'Microsoft.Web.WebView2.Core.dll')},Microsoft.Web.WebView2.Core.dll`,
  `/resource:${lib('lib', 'net462', 'Microsoft.Web.WebView2.WinForms.dll')},Microsoft.Web.WebView2.WinForms.dll`,
  `/resource:${lib('runtimes', 'win-x64', 'native', 'WebView2Loader.dll')},WebView2Loader.x64.dll`,
  `/resource:${lib('runtimes', 'win-x86', 'native', 'WebView2Loader.dll')},WebView2Loader.x86.dll`,
  path.join(here, 'MyPromo.cs'),
], { stdio: 'inherit' });

fs.copyFileSync(out, path.join(root, 'public', 'MyPromo.exe'));
console.log(`built ${(fs.statSync(out).size / 1048576).toFixed(2)} MB → public/MyPromo.exe`);
