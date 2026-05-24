/**
 * Generate all PWA / browser icons from the CBI logo.
 *
 *   src/app/icon.png        512×512   (modern favicon — Next.js convention)
 *   src/app/apple-icon.png  180×180   (iOS home screen)
 *   public/icon-192.png     192×192   (PWA manifest)
 *   public/icon-512.png     512×512   (PWA manifest, maskable)
 *
 * Run from cbi/frontend:  node scripts/build-icons.mjs
 */
import sharp from 'sharp'
import path  from 'node:path'

const SRC = path.resolve('public/images/logo-blue.png')

const OUTPUTS = [
  { dst: 'src/app/icon.png',        size: 512 },
  { dst: 'src/app/apple-icon.png',  size: 180, bg: { r: 255, g: 255, b: 255, alpha: 1 } },
  { dst: 'public/icon-192.png',     size: 192 },
  { dst: 'public/icon-512.png',     size: 512 },
]

for (const { dst, size, bg } of OUTPUTS) {
  const pipeline = sharp(SRC).resize(size, size, {
    fit: 'contain',
    background: bg ?? { r: 255, g: 255, b: 255, alpha: 0 },
  })
  if (bg) pipeline.flatten({ background: bg })
  await pipeline.png({ compressionLevel: 9 }).toFile(path.resolve(dst))
  console.log(`✓ ${dst} (${size}×${size})`)
}
