'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useReveal } from '@/lib/reveal'

const PROGRAMS = [
  {
    key:    'education',
    title:  'Education in Emergency',
    tag:    'Education',
    accent: '#0102F1',
    img:    '/images/cbi-education-class.jpg',
    desc:   'Safe learning environments, trained teachers, and school supplies — keeping children learning through crisis.',
    stat:   '900+ children back in school',
  },
  {
    key:    'health',
    title:  'Health & Primary Care',
    tag:    'Health',
    accent: '#e11d48',
    img:    '/images/cbi-health-program.jpg',
    desc:   'Community health services including maternal care, immunisation, and emergency outreach to underserved populations.',
    stat:   '45,000+ consultations',
  },
  {
    key:    'nutrition',
    title:  'Nutrition',
    tag:    'Nutrition',
    accent: '#d97706',
    img:    '/images/cbi-mother-baby.jpg',
    desc:   'Therapeutic feeding, growth monitoring, and IYCF counselling for mothers and children under 5.',
    stat:   '8,000+ children treated',
  },
  {
    key:    'wash',
    title:  'WASH',
    tag:    'Clean Water',
    accent: '#0891b2',
    img:    '/images/cbi-wash-sanitizer.jpg',
    desc:   'Clean water, sanitation facilities, and hygiene promotion for communities living without safe water.',
    stat:   '30,000+ with clean water',
  },
  {
    key:    'protection',
    title:  'Protection & GBV',
    tag:    'Protection',
    accent: '#7c3aed',
    img:    '/images/cbi-community-2.jpg',
    desc:   'Safe spaces, GBV case management, and psychosocial support for vulnerable women, girls, and IDPs.',
    stat:   '5,000+ cases managed',
  },
  {
    key:    'food',
    title:  'Food Security & Livelihoods',
    tag:    'Livelihoods',
    accent: '#16a34a',
    img:    '/images/cbi-community-1.jpg',
    desc:   'Cash transfers, agricultural input, and skills training helping families achieve lasting food security.',
    stat:   '20,000+ food-secure homes',
  },
]

const CARD_W  = 272   // px — card width
const CARD_H  = 320   // px — card height (smaller as requested)
const CARD_GAP = 16   // px

export default function Programs() {
  const { ref, visible } = useReveal()
  const trackRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<number | null>(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const amount = CARD_W + CARD_GAP
    const scrollTrack = () => {
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: amount * 2, behavior: 'smooth' })
      }
    }

    const timeoutId = window.setTimeout(() => {
      scrollTrack()
      autoScrollRef.current = window.setInterval(scrollTrack, 5000)
    }, 5000)

    return () => {
      window.clearTimeout(timeoutId)
      if (autoScrollRef.current !== null) {
        window.clearInterval(autoScrollRef.current)
      }
    }
  }, [])

  function scroll(dir: 'left' | 'right') {
    const el = trackRef.current
    if (!el) return
    const amount = CARD_W + CARD_GAP
    el.scrollBy({ left: dir === 'left' ? -amount * 2 : amount * 2, behavior: 'smooth' })
  }

  function onScroll() {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  return (
    <section className="progs-section" style={{ background: '#f8fafc' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16, marginBottom: 36,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 600ms ease, transform 600ms ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>What We Do</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, sans-serif)',
              fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 700,
              color: '#000000', lineHeight: 1.1, letterSpacing: '-0.015em', margin: 0,
            }}>
              Six Programs.{' '}
              <em style={{ fontStyle: 'italic', color: '#0102F1' }}>One Mission.</em>
            </h2>
          </div>

          {/* Right: arrows + view-all link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: 8 }}>
              {([
                { dir: 'left'  as const, Icon: ChevronLeft,  can: canLeft  },
                { dir: 'right' as const, Icon: ChevronRight, can: canRight },
              ]).map(({ dir, Icon, can }) => (
                <button key={dir} onClick={() => scroll(dir)} aria-label={dir} style={{
                  width: 36, height: 36, borderRadius: 6, border: 'none', cursor: can ? 'pointer' : 'default',
                  background: can ? '#0102F1' : 'rgba(1,2,241,0.08)',
                  color: can ? 'white' : 'rgba(1,2,241,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 150ms ease',
                }}>
                  <Icon size={16} />
                </button>
              ))}
            </div>

            <Link href="/programs" style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 12, fontWeight: 600, color: '#0102F1',
              textDecoration: 'none', borderBottom: '1.5px solid rgba(1,2,241,0.25)',
              paddingBottom: 1, transition: 'gap 150ms, border-color 150ms',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.gap = '8px'; el.style.borderColor = '#0102F1' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.gap = '5px'; el.style.borderColor = 'rgba(1,2,241,0.25)' }}
            >View all <ArrowUpRight size={13} /></Link>
          </div>
        </div>

        {/* ── Horizontal scroll track ── */}
        <div style={{ position: 'relative' }}>
          {/* Fade mask right edge */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 48, zIndex: 2,
            background: 'linear-gradient(to right, transparent, #f8fafc)',
            pointerEvents: 'none',
          }} />

          <div
            ref={trackRef}
            onScroll={onScroll}
            style={{
              display: 'flex',
              gap: CARD_GAP,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: 8,  /* space for any scrollbar */
              scrollbarWidth: 'none',  /* Firefox */
              msOverflowStyle: 'none', /* IE */
            }}
          >
            {PROGRAMS.map((p, i) => (
              <Link
                href="/programs"
                key={p.key}
                className="prog-card"
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 10,
                  overflow: 'hidden',
                  display: 'block',
                  textDecoration: 'none',
                  scrollSnapAlign: 'start',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(24px)',
                  transition: `opacity 600ms ease ${i * 70}ms, transform 600ms ease ${i * 70}ms`,
                }}
              >
                {/* Photo */}
                <Image
                  src={p.img} alt={p.title}
                  fill sizes="280px"
                  className="prog-img"
                  style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)' }}
                />

                {/* Base gradient — always on */}
                <div aria-hidden style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,20,0.90) 0%, rgba(0,0,20,0.35) 50%, transparent 75%)',
                }} />

                {/* Coloured hover overlay */}
                <div className="prog-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, ${p.accent}f0 0%, ${p.accent}88 55%, transparent 100%)`,
                  opacity: 0, transition: 'opacity 320ms ease',
                }} />

                {/* Tag — top left */}
                <div style={{
                  position: 'absolute', top: 13, left: 13,
                  background: p.accent, color: 'white',
                  padding: '3px 10px', borderRadius: 3,
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>{p.tag}</div>

                {/* Default bottom label */}
                <div className="prog-default-label" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '0 16px 16px',
                  transition: 'opacity 220ms ease',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair, sans-serif)',
                    fontSize: 15, fontWeight: 700, color: 'white',
                    margin: '0 0 4px', letterSpacing: '-0.01em',
                  }}>{p.title}</h3>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10.5, color: 'rgba(255,255,255,0.5)', fontWeight: 500,
                  }}>{p.stat}</div>
                </div>

                {/* Hover description + CTA */}
                <div className="prog-hover-body" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '16px 16px 18px',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'opacity 320ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)',
                    margin: '0 0 14px',
                  }}>{p.desc}</p>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, fontWeight: 700, color: 'white',
                    background: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.35)',
                    padding: '6px 12px', borderRadius: 4,
                  }}>Explore <ArrowUpRight size={11} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* hide scrollbar track */
        .progs-section div::-webkit-scrollbar { display: none; }

        .progs-section { padding: 72px 80px 80px; }

        .prog-card:hover .prog-img          { transform: scale(1.06); }
        .prog-card:hover .prog-overlay      { opacity: 1; }
        .prog-card:hover .prog-default-label{ opacity: 0; }
        .prog-card:hover .prog-hover-body   { opacity: 1; transform: translateY(0); }

        @media (max-width: 1024px) {
          .progs-section { padding: 56px 32px 64px !important; }
        }
        @media (max-width: 640px) {
          .progs-section { padding: 48px 16px 56px !important; }
        }
      `}</style>
    </section>
  )
}
