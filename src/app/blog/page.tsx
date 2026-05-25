'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import { POSTS } from '@/lib/posts'

const CATEGORIES = ['All', 'Impact', 'Programs', 'Stories', 'Events']

export default function BlogPage() {
  const [cat, setCat] = useState('All')
  const filtered  = cat === 'All' ? POSTS : POSTS.filter(p => p.category === cat)
  const featured  = POSTS[0]
  const gridPosts = filtered.filter(p => p.id !== featured.id || cat !== 'All')

  return (
    <>
      <PageHero
        tag="News & Stories"
        headline="Field reports from"
        emph="the frontline."
        sub="Impact stories, programme updates, and lessons from communities across Nigeria."
      />

      <section className="blog-section" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* ── Featured post (shown only on "All") ── */}
          {cat === 'All' && (
            <div className="featured-grid" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 48, marginBottom: 64, alignItems: 'center',
            }}>
              {/* Left: coloured panel */}
              <Link href={`/blog/${featured.slug}`} style={{
                background: 'linear-gradient(135deg, #010278 0%, #0102F1 100%)',
                borderRadius: 16, padding: 48, color: 'white',
                minHeight: 320,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                textDecoration: 'none',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 56px rgba(1,2,120,0.3)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}
              >
                <span style={{
                  background: '#ff8400', padding: '5px 14px',
                  borderRadius: 100, fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  display: 'inline-block', alignSelf: 'flex-start',
                  color: '#010278',
                }}>Featured · {featured.category}</span>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontSize: 56, fontWeight: 700, opacity: 0.15, lineHeight: 0.9, marginBottom: 16,
                  }}>{String(featured.id).padStart(2, '0')}</div>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0,
                  }}>{featured.excerpt}</p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginTop: 18,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, fontWeight: 700, color: '#ff8400',
                  }}>Read full story →</div>
                </div>
              </Link>

              {/* Right: text */}
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
                <Link href={`/blog/${featured.slug}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 14, fontWeight: 700, color: '#0102F1',
                  textDecoration: 'none', borderBottom: '1.5px solid rgba(1,2,241,0.25)',
                  paddingBottom: 2, transition: 'gap 150ms, border-color 150ms',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.gap = '10px'; el.style.borderColor = '#0102F1' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.gap = '6px'; el.style.borderColor = 'rgba(1,2,241,0.25)' }}
                >Read full story →</Link>
              </div>
            </div>
          )}

          {/* ── Category tabs ── */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: '8px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, fontWeight: 700,
                background: cat === c ? '#0102F1' : '#f8fafc',
                color: cat === c ? 'white' : '#64748b',
                transition: 'all 150ms',
              }}>{c}</button>
            ))}
          </div>

          {/* ── Post grid ── */}
          <div className="post-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {gridPosts.map(p => (
              <Link key={p.id} href={`/blog/${p.slug}`} style={{
                display: 'block', textDecoration: 'none',
                background: 'white', borderRadius: 14, overflow: 'hidden',
                border: '1px solid rgba(1,2,241,0.08)',
                transition: 'all 220ms ease-out',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 12px 36px rgba(1,2,241,0.12)'
                  el.style.borderColor = 'rgba(255,132,0,0.3)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'rgba(1,2,241,0.08)'
                }}
              >
                {/* CBI blue top bar */}
                <div style={{ height: 5, background: '#0102F1' }} />
                <div style={{ padding: 26 }}>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 700, color: '#ff8400',
                    letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10,
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
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 12, color: '#94a3b8',
                    paddingTop: 14, borderTop: '1px solid rgba(1,2,241,0.06)',
                  }}>
                    <span>{p.date}</span>
                    <span style={{ color: '#0102F1', fontWeight: 600, fontSize: 12 }}>
                      {p.read} read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {gridPosts.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '60px 0',
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 15, color: '#94a3b8',
            }}>No stories in this category yet. Check back soon.</div>
          )}
        </div>

        <style>{`
          .blog-section { padding: 80px 80px; }
          @media (max-width: 1024px) {
            .blog-section { padding: 56px 40px !important; }
            .post-grid    { grid-template-columns: repeat(2,1fr) !important; }
          }
          @media (max-width: 768px)  {
            .blog-section   { padding: 48px 24px !important; }
            .featured-grid  { grid-template-columns: 1fr !important; }
            .post-grid      { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 480px) {
            .blog-section { padding: 36px 16px !important; }
          }
        `}</style>
      </section>
    </>
  )
}
