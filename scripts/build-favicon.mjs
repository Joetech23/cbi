/**
 * Build a multi-size favicon.ico from the CBI logo.
 * Sizes: 16, 32, 48 (PNG-in-ICO is supported by all modern browsers).
 *
 * Run from the cbi/frontend directory:
 *   node scripts/build-favicon.mjs
 */
import sharp from 'sharp'
import fs    from 'node:fs/promises'
import path  from 'node:path'

const SRC  = path.resolve('public/images/logo-blue.png')
const DEST = path.resolve('src/app/favicon.ico')
const SIZES = [16, 32, 48]

async function main() {
  // Generate PNG buffers at each size
  const pngs = await Promise.all(
    SIZES.map(size =>
      sharp(SRC)
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toBuffer()
    )
  )

  // ICO header: 6 bytes (reserved=0, type=1 ICO, count=N)
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(SIZES.length, 4)

  // Each directory entry is 16 bytes
  const dirSize     = 16 * SIZES.length
  const dataStart   = 6 + dirSize
  let offset        = dataStart
  const dirEntries  = []
  for (let i = 0; i < SIZES.length; i++) {
    const size = SIZES[i]
    const png  = pngs[i]
    const e    = Buffer.alloc(16)
    e.writeUInt8(size === 256 ? 0 : size, 0)   // width
    e.writeUInt8(size === 256 ? 0 : size, 1)   // height
    e.writeUInt8(0, 2)                          // palette count
    e.writeUInt8(0, 3)                          // reserved
    e.writeUInt16LE(1, 4)                       // planes
    e.writeUInt16LE(32, 6)                      // bits per pixel
    e.writeUInt32LE(png.length, 8)              // image size
    e.writeUInt32LE(offset, 12)                 // offset
    dirEntries.push(e)
    offset += png.length
  }

  const ico = Buffer.concat([header, ...dirEntries, ...pngs])
  await fs.writeFile(DEST, ico)
  console.log(`✓ Wrote ${DEST} (${ico.length} bytes, ${SIZES.length} sizes: ${SIZES.join(', ')})`)
}

main().catch(err => { console.error(err); process.exit(1) })
