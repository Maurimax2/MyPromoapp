import { readFileSync } from 'node:fs';
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
const doc = await pdfjs.getDocument({
  data: new Uint8Array(readFileSync(process.argv[2])),
  standardFontDataUrl: './public/pdfjs/standard_fonts/',
  cMapUrl: './public/pdfjs/cmaps/', cMapPacked: true,
  wasmUrl: './public/pdfjs/wasm/', iccUrl: './public/pdfjs/iccs/',
}).promise;
let out='';
for (let p=1;p<=doc.numPages;p++){
  const tc=await (await doc.getPage(p)).getTextContent();
  let last=null,line='';
  for(const it of tc.items){const y=it.transform[5];
    if(last!==null&&Math.abs(y-last)>3){out+=line.trim()+'\n';line='';}
    line+=it.str+(it.hasEOL?'\n':'');last=y;}
  out+=line.trim()+'\n';
}
process.stdout.write(out);
