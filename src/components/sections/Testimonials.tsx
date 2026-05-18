'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useReveal } from '@/lib/reveal'

const STORIES = [
  {
    name:     'Fatima, 8',
    location: 'Borno State, Nigeria',
    program:  'Education in Emergency',
    quote:    '"Before CBI came, I had not been to school for two years. Now I go every day, and I can read."',
    img:      '/images/girl-portrait.jpg',
  },
  {
    name:     'Amina & Newborn',
    location: 'Adamawa State, Nigeria',
    program:  'Health & Primary Care',
    quote:    '"The health worker came to my village. Without her, I don\'t know if my baby would be here today."',
    img:      '/images/mother-newborn.jpg',
  },
  {
    name:     'Ibrahim, 7',
    location: 'Yobe State, Nigeria',
    program:  'WASH Program',
    quote:    '"I used to walk 4km every morning for water. Now there is a borehole in our compound."',
    img:      '/images/girl-water.jpg',
  },
]

export default function Testimonials() {
  const [hov, setHov] = useState<number | null>(null)
  const { ref, visible } = useReveal()

  return (
    <section className="stories-section" style={{ background: 'white' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>Human Stories</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(30px,3.5vw,48px)', fontWeight: 800,
            letterSpacing: '-0.025em', color: '#000000', lineHeight: 1.1, maxWidth: 560,
          }}>
            Voices from the<br />
            <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>communities we serve.</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="stories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {STORIES.map((s, i) => {
            const on = hov === i
            return (
              <div key={s.name}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  background: 'white', borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                  border: '1px solid rgba(1,2,241,0.08)',
                  borderBottom: on ? '4px solid #ff8400' : '4px solid transparent',
                  boxShadow: on ? '0 12px 40px rgba(1,2,241,0.14)' : '0 2px 16px rgba(1,2,241,0.06)',
                  transform: visible ? (on ? 'translateY(-5px)' : 'none') : 'translateY(32px)',
                  opacity: visible ? 1 : 0,
                  transition: `transform 220ms ease-out, opacity 700ms cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, box-shadow 220ms ease-out, border-color 220ms ease-out`,
                }}>
                <div style={{ height: 248, overflow: 'hidden', position: 'relative' }}>
                  <Image
                    src={s.img} alt={s.name}
                    fill
                    style={{
                      objectFit: 'cover', objectPosition: 'top center',
                      transition: 'transform 400ms ease-out',
                      transform: on ? 'scale(1.05)' : 'none',
                    }}
                  />
                </div>
                <div style={{ padding: '28px 28px 32px' }}>
                  <span style={{
                    background: '#d8d8ff', color: '#0102F1', borderRadius: 100,
                    padding: '4px 12px', fontSize: 10, fontWeight: 700,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                  }}>{s.program}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 18, fontWeight: 700, color: '#000000',
                    marginTop: 14, marginBottom: 4,
                  }}>{s.name}</h3>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, color: '#94a3b8', marginBottom: 16,
                  }}>{s.location}</div>
                  <blockquote style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontStyle: 'italic', fontSize: 16, color: '#000000', lineHeight: 1.7, margin: 0,
                  }}>{s.quote}</blockquote>
                  <div style={{
                    marginTop: 20, fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, fontWeight: 600, color: '#0102F1',
                  }}>Read full story →</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .stories-section { padding: 100px 80px; }
        .stories-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 960px) {
          .stories-section { padding: 64px 24px !important; }
          .stories-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .stories-section { padding: 48px 16px !important; }
        }
      `}</style>
    </section>
  )
}
