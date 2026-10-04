// The icons the website hands out — the iPhone's «Add to Home Screen» icon, the
// install icons in the manifest — cut from the one official app icon, the same
// artwork the Android launcher and the App Store icon come from.
//
//   node scripts/web-icons.mjs
//
// They used to be a separate drawing with the mark 12 px low in 512, which on
// an iPhone's rounded square reads as «not quite centred». One source means
// they cannot drift apart again.
//
// An iPhone icon must be opaque: iOS fills transparency with black.

import sharp from 'sharp';

const SOURCE = 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png';
const make = (size, to) => sharp(SOURCE).resize(size, size, { kernel: 'lanczos3' }).flatten({ background: '#F3F1E9' })
  .removeAlpha().png({ compressionLevel: 9 }).toFile(to).then(() => console.log(to, size));

await make(180, 'app/apple-icon.png');       // apple-touch-icon: 180 is what iPhones ask for
await make(512, 'public/icon-512.png');
await make(192, 'public/icon-192.png');
