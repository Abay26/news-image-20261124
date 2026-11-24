// news-image-20261124 — "THE WORLD TODAY", Tuesday 24 November 2026.
//
// The entry is a single front-page image (entry.png, drawn for this day:
// Nvidia's 31% rebound as Jensen Huang returns, NATO's AWACS to Poland,
// Ukraine's strike on a Russian warship off Libya, the Banten factory
// fire, Oxfam's Gaza contamination report, US sanctions on Iran, and
// 18 more stories in the brief strip).
// This program does not draw anything: it validates the bundled PNG
// chunk by chunk and copies it to $MAKEFUN_OUTPUT_DIR/entry.png, so two
// runs always produce identical bytes. Node 22, standard library only,
// no network; the grader runs it with /bot read-only and /output empty.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1048576;
const MAX_SIDE = 1024;

// --- CRC-32 (PNG chunk checksums), table built once at startup. --------
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// --- PNG validation: walk every chunk, check type, length and CRC. -----
function validatePng(bytes: Buffer): { width: number; height: number } {
  const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (bytes.length < 8 || !bytes.subarray(0, 8).equals(magic)) {
    throw new Error('entry.png does not start with the PNG magic bytes');
  }
  if (bytes.length > MAX_BYTES) {
    throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
  }

  let offset = 8;
  let seenIhdr = false;
  let seenIdat = false;
  let seenIend = false;
  let width = 0;
  let height = 0;

  while (offset + 12 <= bytes.length) {
    const length = bytes.readUInt32BE(offset);
    const type = bytes.toString('ascii', offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (dataEnd + 4 > bytes.length) {
      throw new Error(`PNG chunk ${type} at ${offset} is truncated`);
    }
    const storedCrc = bytes.readUInt32BE(dataEnd);
    const actualCrc = crc32(bytes.subarray(offset + 4, dataEnd));
    if (storedCrc !== actualCrc) {
      throw new Error(`PNG chunk ${type} has a bad CRC`);
    }
    if (!seenIhdr) {
      if (type !== 'IHDR' || length !== 13) {
        throw new Error('first PNG chunk must be a 13-byte IHDR');
      }
      width = bytes.readUInt32BE(dataStart);
      height = bytes.readUInt32BE(dataStart + 4);
      if (width < 1 || width > MAX_SIDE || height < 1 || height > MAX_SIDE) {
        throw new Error(`image is ${width}x${height}, over the 1024x1024 cap`);
      }
      const bitDepth = bytes[dataStart + 8];
      const colorType = bytes[dataStart + 9];
      const compression = bytes[dataStart + 10];
      const filter = bytes[dataStart + 11];
      const interlace = bytes[dataStart + 12];
      const validDepths: Record<number, number[]> = {
        0: [1, 2, 4, 8, 16],
        2: [8, 16],
        3: [1, 2, 4, 8],
        4: [8, 16],
        6: [8, 16],
      };
      if (!(colorType in validDepths) || !validDepths[colorType].includes(bitDepth)) {
        throw new Error(`IHDR has unsupported bit depth ${bitDepth} / color type ${colorType}`);
      }
      if (compression !== 0 || filter !== 0 || (interlace !== 0 && interlace !== 1)) {
        throw new Error(`IHDR has unsupported compression ${compression} / filter ${filter} / interlace ${interlace}`);
      }
      seenIhdr = true;
    }
    if (type === 'IDAT') seenIdat = true;
    if (type === 'IEND') {
      if (length !== 0 || dataEnd + 4 !== bytes.length) {
        throw new Error('IEND must be the final, empty chunk');
      }
      seenIend = true;
      break;
    }
    offset = dataEnd + 4;
  }
  if (!seenIhdr || !seenIdat || !seenIend) {
    throw new Error('entry.png is missing IHDR, image data, or a trailing IEND chunk');
  }
  return { width, height };
}

// --- Copy. ---------------------------------------------------------------
const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetPath = join(outDir, 'entry.png');

const png = existsSync(sourcePath)
  ? readFileSync(sourcePath)
  : (() => {
      throw new Error(`entry.png not found at ${sourcePath}`);
    })();
const { width, height } = validatePng(png);

mkdirSync(outDir, { recursive: true });
writeFileSync(targetPath, png);

const written = readFileSync(targetPath);
if (!written.equals(png)) {
  throw new Error('verification read-back differs from entry.png');
}
console.log(`wrote ${targetPath} (${png.length} bytes, ${width}x${height})`);
