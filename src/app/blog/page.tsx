'use client'

import { useState } from 'react'
import PageHero from '@/components/layout/PageHero'

const CATEGORIES = ['All', 'Impact', 'Programs', 'Stories', 'Events']

const POSTS = [
  { id: 1, category: 'Impact',   title: '1,500,000 lives touched — our 2024 in review',                 date: 'Dec 18, 2024', read: '6 min', color: '#0102F1', excerpt: 'A year of integrated programs across 10 Nigerian states. Here\'s what your support made possible.' },
  { id: 2, category: 'Stories',  title: 'Fatima\'s return to school after two lost years',            date: 'Nov 12, 2024', read: '4 min', color: '#be123c', excerpt: 'How CBI\'s Education in Emergency program reopened a future for one displaced 8-year-old.' },
  { id: 3, category: 'Programs', title: 'Borno borehole rehabilitation — 8,000 lives reached',        date: 'Oct 25, 2024', read: '5 min', color: '#0891b2', excerpt: 'Twelve new boreholes brought clean water to communities that walked 5km each day.' },
  { id: 4, category: 'Impact',   title: 'How we trained 50+ community health workers in one year',    date: 'Sep 30, 2024', read: '7 min', color: '#0102F1', excerpt: 'A model that places medical knowledge in the hands of the communities themselves.' },
  { id: 5, category: 'Events',   title: 'CBI joins UNICEF nutrition summit in Abuja',                 date: 'Aug 14, 2024', read: '3 min', color: '#d97706', excerpt: 'Our learnings from the field shared with national stakeholders.' },
  { id: 6, category: 'Stories',  title: 'Amina\'s safe delivery in a village without a clinic',       date: 'Jul 22, 2024', read: '5 min', color: '#be123c', excerpt: 'Sometimes the difference between life and loss is one trained worker who arrives on time.' },
]

export default function BlogPage() {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? POSTS : POSTS.filter(p => p.category === cat)
  const featured = POSTS[0]

  return (
    <>
      <PageHero
        tag="News & Stories"
        headline="Field reports from"
        emph="the frontline."
        sub="Impact stories, program updates, and lessons from communities across Nigeria."
      />

      <section className="blog-section" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Featured */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
            marginBottom: 64, alignItems: 'center',
          }} className="featured-grid">
            <div style={{
              background: `linear-gradient(135deg, ${featured.color} 0%, ${featured.color}dd 100%)`,
              borderRadius: 16, padding: 48, color: 'white', minHeight: 320,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <span style={{
                background: 'rgba(255,255,255,0.15)', padding: '6px 14px',
                borderRadius: 100, fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                display: 'inline-block', alignSelf: 'flex-start',
              }}>Featured · {featured.category}</span>
              <div style={{
                fontFamily: 'var(--font-space, monospace)',
                fontSize: 48, fontWeight: 700, opacity: 0.18, lineHeight: 0.9,
              }}>{String(featured.id).padStart(2, '0')}</div>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 12, color: '#94a3b8', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14,
              }}>{featured.date} · {featured.read} read</p>
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 'clamp(20px,2.4vw,32px)', fontWeight: 700,
                color: '#000000', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 18,
              }}>{featured.title}</h2>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 16, color: '#64748b', lineHeight: 1.72, marginBottom: 24,
              }}>{featured.excerpt}</p>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 14, fontWeight: 700, color: '#0102F1',
                textDecoration: 'none',
              }}>Read full story →</a>
            </div>
          </div>

          {/* Category tabs */}
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

          {/* Grid */}
          <div className="post-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {filtered.map(p => (
              <article key={p.id} style={{
                background: 'white', borderRadius: 14, overflow: 'hidden',
                border: '1px solid rgba(1,2,241,0.08)',
                transition: 'all 220ms ease-out', cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 12px 36px rgba(1,2,241,0.13)'
                  el.style.borderColor = 'rgba(255,132,0,0.3)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'rgba(1,2,241,0.08)'
                }}>
                <div style={{ height: 6, background: p.color }} />
                <div style={{ padding: 26 }}>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, fontWeight: 700, color: p.color,
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
                  }}>{p.category}</p>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontSize: 19, fontWeight: 700, color: '#010278',
                    lineHeight: 1.28, marginBottom: 12,
                  }}>{p.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 14, color: '#64748b', lineHeight: 1.65, marginBottom: 18,
                  }}>{p.excerpt}</p>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 12, color: '#94a3b8',
                    paddingTop: 14, borderTop: '1px solid rgba(1,2,241,0.06)',
                  }}>
                    <span>{p.date}</span>
                    <span>{p.read} read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .blog-section { padding: 80px 80px; }
          @media (max-width: 1024px) { .post-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 768px)  {
            .blog-section   { padding: 56px 24px !important; }
            .featured-grid  { grid-template-columns: 1fr !important; }
            .post-grid      { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  )
}
