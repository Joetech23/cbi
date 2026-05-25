'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/lib/reveal'

const POSTS = [
  {
    tag:      'Field Report',
    tagColor: '#0102F1',
    date:     'May 2025',
    title:    'WASH Intervention Reaches 2,400 Families in Borno',
    excerpt:  'CBI\'s latest borehole rehabilitation and hygiene promotion campaign brings safe water access to over 12,000 individuals across hard-to-reach communities.',
    img:      '/images/cbi-wash-program.jpg',
    href:     '/blog',
  },
  {
    tag:      'Health',
    tagColor: '#0102F1',
    date:     'Apr 2025',
    title:    'Mobile Clinics Extend Healthcare to Adamawa Communities',
    excerpt:  'Our community health teams conducted over 3,200 consultations this quarter — reaching pregnant women, children under five, and persons with disabilities.',
    img:      '/images/cbi-medical-outreach.jpg',
    href:     '/blog',
  },
  {
    tag:      'Education',
    tagColor: '#0102F1',
    date:     'Mar 2025',
    title:    'Back to School: 900+ Children Re-enrolled in Yobe State',
    excerpt:  'Through partnerships with community leaders and UNICEF, CBI supported the re-enrolment and learning continuity of out-of-school children in 12 LGAs.',
    img:      '/images/cbi-education-class.jpg',
    href:     '/blog',
  },
]

export default function LatestStories() {
  const { ref, visible } = useReveal()

  return (
    <section className="latest-section" style={{ background: 'white' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16, marginBottom: 44,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 600ms ease, transform 600ms ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Our Stories</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, sans-serif)',
              fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 700,
              color: '#000000', lineHeight: 1.1, letterSpacing: '-0.015em', margin: 0,
            }}>
              From the field.{' '}
              <em style={{ fontStyle: 'italic', color: '#0102F1' }}>Stories that matter.</em>
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
          >View all stories <ArrowUpRight size={13} /></Link>
        </div>

        {/* Post grid */}
        <div className="latest-grid" style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr 1fr', gap: 24 }}>
          {POSTS.map((p, i) => (
            <Link key={p.title} href={p.href} className={`latest-card ${i === 0 ? 'latest-card-featured' : ''}`}
              style={{
                display: 'block', textDecoration: 'none',
                borderRadius: 14, overflow: 'hidden',
                background: 'white',
                border: '1px solid rgba(1,2,241,0.08)',
                boxShadow: '0 2px 12px rgba(1,2,241,0.04)',
                transition: `transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease, opacity 600ms ease ${i * 90}ms, transform 600ms ease ${i * 90}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(28px)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = '0 14px 40px rgba(1,2,241,0.10)'
                el.style.borderColor = 'rgba(1,2,241,0.20)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'none'
                el.style.boxShadow = '0 2px 12px rgba(1,2,241,0.04)'
                el.style.borderColor = 'rgba(1,2,241,0.08)'
              }}
            >
              {/* Image */}
              <div className={i === 0 ? 'latest-img-featured' : 'latest-img'} style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src={p.img} alt={p.title} fill
                  style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 500ms ease' }}
                  className="latest-photo"
                />
                {/* Overlay */}
                <div aria-hidden style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(1,2,40,0.55) 0%, transparent 60%)',
                }} />
                {/* Tag */}
                <div style={{
                  position: 'absolute', top: 14, left: 16,
                  background: '#ff8400', color: 'white',
                  padding: '3px 10px', borderRadius: 3,
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>{p.tag}</div>
                {/* Date */}
                <div style={{
                  position: 'absolute', bottom: 14, left: 16,
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{p.date}</div>
              </div>

              {/* Body */}
              <div style={{ padding: i === 0 ? '22px 24px 24px' : '18px 20px 20px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-playfair, sans-serif)',
                  fontSize: i === 0 ? 19 : 15,
                  fontWeight: 700, color: '#010278',
                  lineHeight: 1.35, letterSpacing: '-0.01em',
                  margin: '0 0 10px',
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 13, color: '#64748b', lineHeight: 1.65,
                  margin: '0 0 14px',
                }}>{p.excerpt}</p>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11.5, fontWeight: 700, color: '#0102F1',
                  letterSpacing: '0.02em',
                }}>Read more <ArrowUpRight size={11} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .latest-section { padding: 88px 80px; }
        .latest-img-featured { height: 260px; }
        .latest-img          { height: 180px; }
        .latest-card:hover .latest-photo { transform: scale(1.05); }

        @media (max-width: 1024px) {
          .latest-section { padding: 64px 32px !important; }
          .latest-grid { grid-template-columns: 1fr 1fr !important; }
          .latest-card-featured { grid-column: span 2 !important; }
          .latest-img-featured { height: 240px !important; }
        }
        @media (max-width: 640px) {
          .latest-section { padding: 52px 16px !important; }
          .latest-grid { grid-template-columns: 1fr !important; }
          .latest-card-featured { grid-column: span 1 !important; }
          .latest-img-featured { height: 200px !important; }
        }
      `}</style>
    </section>
  )
}
