'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useReveal } from '@/lib/reveal'

const STORIES = [
  {
    name:     'Fatima, age 8',
    location: 'Borno State',
    program:  'Education',
    href:     '/programs/education',
    img:      '/images/cbi-child-uniform.jpg',
    quote:    'Before CBI came, I had not been to school for two years. Now I go every day, and I can read.',
  },
  {
    name:     'Amina & Baby Zara',
    location: 'Adamawa State',
    program:  'Health',
    href:     '/programs/health',
    img:      '/images/cbi-mother-baby.jpg',
    quote:    'The health worker came to my village. Without her, I don\'t know if my baby would be here today.',
  },
  {
    name:     'Ibrahim, age 7',
    location: 'Yobe State',
    program:  'WASH',
    href:     '/programs/wash',
    img:      '/images/cbi-wash-sanitizer.jpg',
    quote:    'I used to walk 4km every morning for water. Now there is a borehole in our compound.',
  },
]

export default function Testimonials() {
  const [hov, setHov] = useState<number | null>(null)
  const { ref, visible } = useReveal()

  return (
    <section className="stories-section" style={{ background: '#f8fafc' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20, marginBottom: 52,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 700ms ease, transform 700ms ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Human Stories</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, sans-serif)',
              fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 700,
              color: '#000000', lineHeight: 1.1, letterSpacing: '-0.015em', margin: 0,
            }}>
              Voices from the communities<br />
              <em style={{ fontStyle: 'italic', color: '#0102F1' }}>we serve.</em>
            </h2>
          </div>
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 12, fontWeight: 600, color: '#0102F1',
            textDecoration: 'none', borderBottom: '1.5px solid rgba(1,2,241,0.25)',
            paddingBottom: 1, transition: 'gap 150ms, border-color 150ms',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.gap = '8px'; el.style.borderColor = '#0102F1' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.gap = '5px'; el.style.borderColor = 'rgba(1,2,241,0.25)' }}
          >Read All Stories →</Link>
        </div>

        {/* Cards */}
        <div className="stories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {STORIES.map((s, i) => {
            const on = hov === i
            return (
              <Link key={s.name} href={s.href}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  background: 'white', borderRadius: 14, overflow: 'hidden',
                  border: `1px solid ${on ? 'rgba(1,2,241,0.25)' : 'rgba(1,2,241,0.07)'}`,
                  boxShadow: on ? '0 16px 48px rgba(1,2,241,0.12)' : '0 2px 12px rgba(1,2,241,0.05)',
                  transform: visible ? (on ? 'translateY(-6px)' : 'none') : 'translateY(32px)',
                  opacity: visible ? 1 : 0,
                  transition: `opacity 700ms ease ${i * 100}ms, transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease`,
                  textDecoration: 'none', display: 'block',
                }}>

                {/* Image */}
                <div style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
                  <Image
                    src={s.img} alt={s.name} fill
                    style={{
                      objectFit: 'cover', objectPosition: 'top center',
                      transition: 'transform 500ms ease',
                      transform: on ? 'scale(1.06)' : 'scale(1)',
                    }}
                  />
                  {/* Gradient — always CBI navy */}
                  <div aria-hidden style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(1,2,120,0.85) 0%, transparent 55%)',
                    opacity: on ? 1 : 0.7,
                    transition: 'opacity 300ms ease',
                  }} />
                  {/* Program tag */}
                  <div style={{
                    position: 'absolute', bottom: 14, left: 16,
                    background: '#ff8400', color: 'white',
                    padding: '3px 10px', borderRadius: 4,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>{s.program}</div>
                </div>

                {/* Body */}
                <div style={{ padding: '22px 24px 26px' }}>
                  {/* Quote mark */}
                  <div style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 52, lineHeight: 0.8,
                    color: '#0102F1', opacity: 0.12,
                    marginBottom: 6, userSelect: 'none',
                  }}>&ldquo;</div>

                  <blockquote style={{
                    fontFamily: 'var(--font-playfair, sans-serif)',
                    fontStyle: 'italic', fontSize: 14.5,
                    color: '#2d2d3a', lineHeight: 1.7, margin: '0 0 18px',
                  }}>{s.quote}</blockquote>

                  <div style={{ height: 1, background: 'rgba(1,2,241,0.06)', marginBottom: 16 }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(1,2,241,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 16 }}>👤</span>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 13, fontWeight: 700, color: '#000000',
                      }}>{s.name}</div>
                      <div style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 11, color: '#94a3b8',
                      }}>{s.location}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        .stories-section { padding: 96px 80px; }

        @media (max-width: 1024px) {
          .stories-section { padding: 64px 32px !important; }
        }
        @media (max-width: 860px) {
          .stories-section { padding: 56px 24px !important; }
          /* 2 cols at tablet */
          .stories-grid { grid-template-columns: repeat(2,1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 560px) {
          .stories-section { padding: 48px 16px !important; }
          /* 1 col on phones */
          .stories-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
