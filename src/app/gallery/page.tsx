'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'

const CATEGORIES = ['All', 'Health', 'Education', 'WASH', 'Community', 'Nutrition']

const PHOTOS = [
  { src: '/images/programs/IMG_8929-health.jpg',          caption: 'Primary health outreach — field clinic',                     category: 'Health',    h: 460 },
  { src: '/images/cbi-health-program.jpg',                caption: 'Community health programme in Borno State',                  category: 'Health',    h: 380 },
  { src: '/images/cbi-children-treatment.jpg',            caption: 'Children receiving treatment with CBI doctor',               category: 'Health',    h: 420 },
  { src: '/images/cbi-child-health.jpg',                  caption: 'Child receiving medication during medical outreach',         category: 'Health',    h: 360 },
  { src: '/images/cbi-medical-outreach.jpg',              caption: 'CBI medical outreach team in the field',                    category: 'Health',    h: 400 },
  { src: '/images/cbi-medical-bicycle.jpg',               caption: 'Distributing mosquito nets to elderly — Yobe State',        category: 'Health',    h: 440 },
  { src: '/images/cbi-medical-wheelchair-net.jpg',        caption: 'Reaching persons with disability — mosquito net distribution', category: 'Health',  h: 380 },
  { src: '/images/cbi-woman-wheelchair.jpg',              caption: 'Woman on wheelchair receiving treatment — CBI clinic',       category: 'Health',    h: 400 },
  { src: '/images/programs/IMG_9278-education.jpg',       caption: 'Education in Emergency programme — Adamawa',                category: 'Education', h: 320 },
  { src: '/images/cbi-education-class.jpg',               caption: 'Children learning and raising books in class',               category: 'Education', h: 460 },
  { src: '/images/cbi-children-books.jpg',                caption: 'Children raising books with pride — Borno State',           category: 'Education', h: 400 },
  { src: '/images/cbi-child-uniform.jpg',                 caption: 'Child in school uniform — Education in Emergency',          category: 'Education', h: 440 },
  { src: '/images/cbi-child-smiling.jpg',                 caption: 'Child smiling in school uniform — Borno State',             category: 'Education', h: 360 },
  { src: '/images/cbi-teaching-child.jpg',                caption: 'CBI teacher working one-on-one with a child',               category: 'Education', h: 420 },
  { src: '/images/cbi-wash-sanitizer.jpg',                caption: 'Children receiving hand sanitizer — WASH programme',        category: 'WASH',      h: 460 },
  { src: '/images/cbi-wash-program.jpg',                  caption: 'WASH programme field delivery',                             category: 'WASH',      h: 380 },
  { src: '/images/cbi-wash-global.jpg',                   caption: 'CBI WASH global programme — clean water access',            category: 'WASH',      h: 420 },
  { src: '/images/programs/IMG_9297-nutrition.jpg',       caption: 'Nutrition screening — community level',                     category: 'Nutrition', h: 380 },
  { src: '/images/cbi-mother-baby.jpg',                   caption: 'Mother and baby — CBI nutrition and care support',          category: 'Nutrition', h: 440 },
  { src: '/images/cbi-community-1.jpg',                   caption: 'Community engagement session — Northern Nigeria',           category: 'Community', h: 420 },
  { src: '/images/cbi-community-2.jpg',                   caption: 'CBI community mobilisation in the field',                   category: 'Community', h: 380 },
  { src: '/images/branding/Care-Best-3.jpg',              caption: 'CBI field team working with the community',                 category: 'Community', h: 400 },
  { src: '/images/cbi-events.jpg',                        caption: 'CBI programme event — 2023',                               category: 'Community', h: 360 },
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
                    padding: '3px 10px', borderRadius: 100, fontSize: 9, fontWeight: 700,
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
