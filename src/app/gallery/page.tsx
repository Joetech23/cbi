'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'

const CATEGORIES = ['All', 'Health', 'Education', 'WASH', 'Community', 'Nutrition']

const PHOTOS = [
  { src: '/images/programs/IMG_8929-health.jpg',     caption: 'Primary health outreach — field clinic',         category: 'Health',    h: 460 },
  { src: '/images/programs/IMG_9278-education.jpg',  caption: 'Education in Emergency programme',               category: 'Education', h: 320 },
  { src: '/images/programs/IMG_9297-nutrition.jpg',  caption: 'Nutrition screening — community level',          category: 'Nutrition', h: 380 },
  { src: '/images/branding/Care-Best-3.jpg',         caption: 'CBI field team in the community',                category: 'Community', h: 420 },
  { src: '/images/mother-newborn.jpg',               caption: 'Mother with newborn — Adamawa State',            category: 'Health',    h: 380 },
  { src: '/images/boy-smiling.jpg',                  caption: 'Child in education program — Borno State',       category: 'Education', h: 360 },
  { src: '/images/girl-water.jpg',                   caption: 'Clean water from rehabilitated borehole',        category: 'WASH',      h: 460 },
  { src: '/images/family-lush.jpg',                  caption: 'Family supported through nutrition program',     category: 'Community', h: 320 },
  { src: '/images/boy-mother-park.jpg',              caption: 'Mother and son in community outreach',           category: 'Community', h: 420 },
  { src: '/images/girl-portrait.jpg',                caption: 'Portrait — Fatima, age 8, Borno',                category: 'Education', h: 440 },
  { src: '/images/hero-woman.jpg',                   caption: 'Community advocate — Yobe State',                category: 'Community', h: 380 },
  { src: '/images/programs/IMG_9297-nutrition.jpg',  caption: 'Hand-pump installation site',                    category: 'WASH',      h: 380 },
]

export default function GalleryPage() {
  const [cat, setCat] = useState('All')
  const [active, setActive] = useState<number | null>(null)
  const filtered = cat === 'All' ? PHOTOS : PHOTOS.filter(p => p.category === cat)

  return (
    <>
      <PageHero
        tag="Gallery"
        headline="Images from"
        emph="the field."
        sub="Photographs from CBI programs across 10 Nigerian states."
      />

      <section className="gallery-section" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: '8px 18px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, fontWeight: 700,
                background: cat === c ? '#0102F1' : '#f8fafc',
                color: cat === c ? 'white' : '#64748b',
                transition: 'all 150ms',
              }}>{c}</button>
            ))}
          </div>

          {/* Masonry columns */}
          <div className="masonry" style={{
            columnCount: 3, columnGap: 16,
          }}>
            {filtered.map((p, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                breakInside: 'avoid', marginBottom: 16, cursor: 'pointer',
                borderRadius: 12, overflow: 'hidden', position: 'relative',
                height: p.h,
              }}
                onMouseEnter={e => {
                  const overlay = (e.currentTarget as HTMLElement).querySelector('.gallery-overlay') as HTMLElement
                  if (overlay) overlay.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const overlay = (e.currentTarget as HTMLElement).querySelector('.gallery-overlay') as HTMLElement
                  if (overlay) overlay.style.opacity = '0'
                }}
              >
                <Image
                  src={p.src} alt={p.caption} fill
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
                <div className="gallery-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(1,2,120,0.92) 0%, transparent 60%)',
                  padding: 18, display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end',
                  opacity: 0, transition: 'opacity 220ms ease',
                }}>
                  <span style={{
                    background: '#ff8400', color: '#010278', alignSelf: 'flex-start',
                    padding: '3px 10px', borderRadius: 100, fontSize: 9, fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                  }}>{p.category}</span>
                  <p style={{
                    color: 'white',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, fontWeight: 600,
                  }}>{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {active !== null && (
          <div onClick={() => setActive(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2000, padding: 24, cursor: 'pointer',
          }}>
            <div style={{ position: 'relative', maxWidth: 1100, maxHeight: '85vh', width: '100%', height: '85vh' }}>
              <Image
                src={filtered[active].src}
                alt={filtered[active].caption}
                fill style={{ objectFit: 'contain' }}
              />
            </div>
            <button onClick={(e) => { e.stopPropagation(); setActive(null) }} style={{
              position: 'fixed', top: 24, right: 24,
              background: 'rgba(255,255,255,0.1)', color: 'white',
              border: 'none', width: 44, height: 44, borderRadius: '50%',
              cursor: 'pointer', fontSize: 24,
            }}>×</button>
          </div>
        )}

        <style>{`
          .gallery-section { padding: 80px 80px; }
          @media (max-width: 1024px) { .masonry { column-count: 2 !important; } }
          @media (max-width: 640px)  {
            .gallery-section { padding: 56px 24px !important; }
            .masonry         { column-count: 1 !important; }
          }
        `}</style>
      </section>
    </>
  )
}
