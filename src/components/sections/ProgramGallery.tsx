'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import type { GalleryImage } from '@/lib/programs'

interface Props {
  images: GalleryImage[]
  accentHex: string
  programName: string
}

export default function ProgramGallery({ images, accentHex, programName }: Props) {
  const [active, setActive]         = useState(0)
  const [prev, setPrev]             = useState<number | null>(null)
  const [animDir, setAnimDir]       = useState<'next' | 'prev'>('next')
  const [isHovered, setIsHovered]   = useState(false)
  const [thumbsVisible, setThumbsVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number, dir: 'next' | 'prev' = 'next') => {
    setPrev(active)
    setAnimDir(dir)
    setActive(idx)
  }, [active])

  const next = useCallback(() => {
    goTo((active + 1) % images.length, 'next')
  }, [active, images.length, goTo])

  const prev2 = useCallback(() => {
    goTo((active - 1 + images.length) % images.length, 'prev')
  }, [active, images.length, goTo])

  /* auto-advance */
  useEffect(() => {
    if (isHovered) { if (timerRef.current) clearInterval(timerRef.current); return }
    timerRef.current = setInterval(next, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isHovered, next])

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev2()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev2])

  /* reveal thumbs after mount */
  useEffect(() => { setThumbsVisible(true) }, [])

  const cur = images[active]

  return (
    <div
      style={{ width: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Main Stage ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        aspectRatio: '16 / 9',
        background: '#050c2e',
        boxShadow: `0 24px 80px ${accentHex}22`,
        cursor: 'pointer',
      }}>

        {/* Images — crossfade */}
        {images.map((img, i) => (
          <div key={img.src} style={{
            position: 'absolute', inset: 0,
            opacity: i === active ? 1 : 0,
            transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1)',
            zIndex: i === active ? 2 : 1,
          }}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width:768px) 100vw, 70vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={i === 0}
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: 'linear-gradient(to top, rgba(5,12,46,0.88) 0%, rgba(5,12,46,0.3) 40%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: 'linear-gradient(to right, rgba(5,12,46,0.25) 0%, transparent 40%)',
        }} />

        {/* Caption */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
          padding: '28px 32px 24px',
        }}>
          {/* Progress bar */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? 'next' : 'prev')}
                aria-label={`Go to image ${i + 1}`}
                style={{
                  flex: 1, height: 3, borderRadius: 2,
                  border: 'none', cursor: 'pointer', padding: 0,
                  background: i === active
                    ? accentHex
                    : 'rgba(255,255,255,0.3)',
                  transition: 'all 300ms',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {i === active && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '100%',
                    width: isHovered ? '0%' : '100%',
                    background: 'rgba(255,255,255,0.4)',
                    transition: isHovered ? 'none' : 'width 5000ms linear',
                    borderRadius: 2,
                  }} />
                )}
              </button>
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 14, color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.5, margin: 0,
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}>{cur.caption}</p>

          <div style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginTop: 6,
          }}>{active + 1} / {images.length} · {programName}</div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev2}
          aria-label="Previous image"
          style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            zIndex: 6,
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 200ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${accentHex}cc` }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)' }}
        >‹</button>

        <button
          onClick={next}
          aria-label="Next image"
          style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            zIndex: 6,
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 200ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${accentHex}cc` }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)' }}
        >›</button>

        {/* "Pause" indicator */}
        {isHovered && (
          <div style={{
            position: 'absolute', top: 16, right: 16, zIndex: 6,
            padding: '4px 10px', borderRadius: 100,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10, fontWeight: 700,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>⏸ Paused</div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      <div style={{
        display: 'flex', gap: 10, marginTop: 12,
        overflowX: 'auto', paddingBottom: 4,
        scrollbarWidth: 'none',
      }}>
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => goTo(i, i > active ? 'next' : 'prev')}
            aria-label={`View image ${i + 1}`}
            style={{
              flex: '0 0 calc(16.66% - 9px)',
              minWidth: 72,
              aspectRatio: '4/3',
              position: 'relative',
              borderRadius: 10,
              overflow: 'hidden',
              border: i === active
                ? `2.5px solid ${accentHex}`
                : '2.5px solid transparent',
              opacity: i === active ? 1 : 0.55,
              cursor: 'pointer',
              padding: 0,
              transition: 'all 250ms',
              transform: i === active ? 'scale(1)' : 'scale(0.96)',
              outline: 'none',
            }}
            onMouseEnter={e => {
              if (i !== active) (e.currentTarget as HTMLElement).style.opacity = '0.85'
            }}
            onMouseLeave={e => {
              if (i !== active) (e.currentTarget as HTMLElement).style.opacity = '0.55'
            }}
          >
            <Image
              src={img.src} alt={img.alt}
              fill sizes="100px"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      <style>{`
        .gallery-thumbs::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
