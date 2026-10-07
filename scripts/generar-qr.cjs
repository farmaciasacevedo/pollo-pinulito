// Ejecutar: node scripts/generar-qr.cjs https://farmaciasacevedo.github.io/pollo-pinulito/
// No instala dependencias ni utiliza servicios externos; la biblioteca está incluida.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const qrcode = require('./qrcode-generator.cjs');

const raw = process.argv[2];
if (!raw) {
  console.error('Indica la URL pública: node scripts/generar-qr.cjs https://USUARIO.github.io/REPOSITORIO/');
  process.exit(1);
}
let target;
try { target = new URL(raw); } catch (_) { console.error('La URL no es válida.'); process.exit(1); }
if (target.protocol !== 'https:' || target.username || target.password || ['localhost', '127.0.0.1', '0.0.0.0', '[::1]'].includes(target.hostname)) {
  console.error('Usa una URL pública HTTPS sin credenciales.');
  process.exit(1);
}
target.hash = '';
const qr = qrcode(0, 'M');
qr.addData(target.href);
qr.make();
const modules = qr.getModuleCount();
const unit = 12;
const border = 4;
const size = (modules + border * 2) * unit;

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}
const pixels = Buffer.alloc(size * (size + 1), 255);
for (let y = 0; y < size; y++) {
  const offset = y * (size + 1);
  pixels[offset] = 0; // Filtro PNG: None.
  const row = Math.floor(y / unit) - border;
  for (let x = 0; x < size; x++) {
    const col = Math.floor(x / unit) - border;
    if (row >= 0 && row < modules && col >= 0 && col < modules && qr.isDark(row, col)) pixels[offset + x + 1] = 0;
  }
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(size, 0);
ihdr.writeUInt32BE(size, 4);
ihdr[8] = 8; // Grises de ocho bits.
const image = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(pixels)),
  chunk('IEND', Buffer.alloc(0))
]);
const root = path.resolve(__dirname, '..');
fs.writeFileSync(path.join(root, 'qr_codigo_pinulito.png'), image);
fs.writeFileSync(path.join(root, 'qr_code.svg'), qr.createSvgTag({ cellSize: unit, margin: border * unit, scalable: true, alt: 'Código QR de la página Pollo Pinulito' }));
fs.writeFileSync(path.join(root, 'DESTINO-QR.txt'), target.href + '\n');
console.log('QR PNG y SVG actualizados:', target.href);
