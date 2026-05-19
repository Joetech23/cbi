'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useReveal } from '@/lib/reveal'

export default function PhotoCollage() {
  const { ref, visible } = useReveal()
  return (
    <section ref={ref} className="collage-section" style={{ background: 'white', overflow: 'hidden' }}>
      <div className="collage-grid" style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'center',
      }}>

        {/* ── Mosaic ── */}
        <div style={{
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-32px)',
          transition: 'all 900ms cubic-bezier(0.16,1,0.3,1)',
        }}>
          {/* Gold brushstroke */}
          <svg viewBox="0 0 280 50" aria-hidden="true" className="collage-brush" style={{
            position: 'absolute', bottom: -8, left: -24,
            width: 320, zIndex: 0, opacity: 0.28,
          }}>
            <path d="M6,25 C60,10 120,40 180,22 C240,4 270,30 274,25" stroke="#ff8400" strokeWidth="28" strokeLinecap="round" fill="none" />
          </svg>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 12, position: 'relative', zIndex: 1,
          }}>
            {/* Tall left image */}
            <div className="collage-tall" style={{ gridRow: '1/3', borderRadius: 12, overflow: 'hidden' }}>
              <Image
                src="/images/cbi-mother-baby.jpg"
                alt="Mother with newborn — CBI health program"
                width={300} height={420}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 420ms ease-out' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
              />
            </div>
            {/* Top-right */}
            <div className="collage-short" style={{ borderRadius: 12, overflow: 'hidden' }}>
              <Image
                src="/images/cbi-child-smiling.jpg"
                alt="Child in education program"
                width={200} height={200}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 420ms ease-out' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
              />
            </div>
            {/* Bottom-right */}
            <div className="collage-short" style={{ borderRadius: 12, overflow: 'hidden' }}>
              <Image
                src="/images/cbi-wash-sanitizer.jpg"
                alt="Child accessing clean water — WASH program"
                width={200} height={200}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 420ms ease-out' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
              />
            </div>
          </div>
        </div>

        {/* ── Copy ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(32px)',
          transition: 'all 900ms cubic-bezier(0.16,1,0.3,1) 200ms',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>Our Impact</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(22px,2.6vw,38px)', fontWeight: 700,
            letterSpacing: '-0.025em', color: '#000000', lineHeight: 1.1, marginBottom: 24,
          }}>
            What does your<br />support actually<br />
            <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>change?</em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 16, lineHeight: 1.78, color: '#64748b', marginBottom: 18,
          }}>
            Real outcomes. Real people. Since 2019, CBI has delivered measurable, verified impact in the communities that need it most.
          </p>
          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 16, lineHeight: 1.78, color: '#64748b', marginBottom: 36,
          }}>
            Boreholes built. Children back in school. Mothers supported through safe pregnancies. 1,500,000+ individuals reached across 10 states.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/about" className="cbi-btn cbi-btn-outline-blue"
              style={{ fontFamily: 'var(--font-jakarta, sans-serif)' }}
            >About Us →</Link>

            <Link href="/donate" className="cbi-btn cbi-btn-primary cbi-btn-pulse"
              style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700 }}
            >♥ Donate Now</Link>
          </div>
        </div>
      </div>

      <style>{`
        .collage-section { padding: 100px 80px; }
        .collage-tall    { height: 420px; }
        .collage-short   { height: 200px; }

        @media (max-width: 1024px) {
          .collage-section { padding: 72px 32px !important; }
        }
        @media (max-width: 960px) {
          .collage-section { padding: 64px 24px !important; }
          .collage-grid    { grid-template-columns: 1fr !important; gap: 48px !important; }
          .collage-brush   { display: none !important; }
          /* On stacked layout, mosaic takes full width — cap heights */
          .collage-tall    { height: 340px !important; }
          .collage-short   { height: 170px !important; }
        }
        @media (max-width: 520px) {
          .collage-section { padding: 48px 16px !important; }
          .collage-grid    { gap: 32px !important; }
          .collage-tall    { height: 260px !important; }
          .collage-short   { height: 130px !important; }
        }
      `}</style>
    </section>
  )
}
