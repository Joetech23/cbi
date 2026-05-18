'use client'

import Image from 'next/image'
import { useReveal } from '@/lib/reveal'

// Real partner logos from /public/images/partners
const PARTNERS = [
  { name: 'UNICEF',                    src: '/images/partners/UNICEF.jpeg' },
  { name: 'WFP',                       src: '/images/partners/WFP.png' },
  { name: 'UNFPA',                     src: '/images/partners/UNFPA.jpg' },
  { name: 'IOM',                       src: '/images/partners/IOM.jpg' },
  { name: 'USAID',                     src: '/images/partners/USAID.jpg' },
  { name: 'FCDO',                      src: '/images/partners/FCDO.png' },
  { name: 'UN CERF',                   src: '/images/partners/UN-CERF.png' },
  { name: 'DRC Nigeria',               src: '/images/partners/DRC.jpg' },
  { name: 'Caritas',                   src: '/images/partners/Caritas.png' },
  { name: 'CAFOD',                     src: '/images/partners/CAFOD.png' },
  { name: 'NHF',                       src: '/images/partners/NHF.png' },
  { name: 'Sterling One Foundation',   src: '/images/partners/Sterling-One-Foundation.jpg' },
  { name: 'AHI',                       src: '/images/partners/AHI.png' },
  { name: 'JDF',                       src: '/images/partners/JDF.png' },
  { name: 'RAAI',                      src: '/images/partners/RAAI.jpeg' },
]

function LogoCard({ p }: { p: typeof PARTNERS[0] }) {
  return (
    <div className="partner-card" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 180, height: 96, padding: '14px 28px',
      background: 'white', borderRadius: 12,
      border: '1px solid rgba(1,2,241,0.08)',
      transition: 'all 280ms cubic-bezier(0.16,1,0.3,1)',
      cursor: 'default', flexShrink: 0,
      position: 'relative', overflow: 'hidden',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = '#ff8400'
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 14px 36px rgba(1,2,241,0.18)'
        const img = el.querySelector('img') as HTMLImageElement | null
        if (img) { img.style.filter = 'grayscale(0%)'; img.style.opacity = '1' }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(1,2,241,0.08)'
        el.style.transform = 'none'
        el.style.boxShadow = 'none'
        const img = el.querySelector('img') as HTMLImageElement | null
        if (img) { img.style.filter = 'grayscale(100%)'; img.style.opacity = '0.7' }
      }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src={p.src} alt={p.name} fill sizes="180px"
          style={{
            objectFit: 'contain',
            filter: 'grayscale(100%)', opacity: 0.7,
            transition: 'all 280ms',
          }}
        />
      </div>
    </div>
  )
}

export default function Partners() {
  const rowA = [...PARTNERS, ...PARTNERS]
  const rowB = [...PARTNERS.slice().reverse(), ...PARTNERS.slice().reverse()]
  const { ref, visible } = useReveal()

  return (
    <section ref={ref} className="partners-section" style={{
      background: 'linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
      padding: '80px 0', overflow: 'hidden', position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1280, margin: '0 auto 48px', padding: '0 80px', textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(28px)',
        transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
          <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#ff8400',
          }}>Our Partners</span>
          <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontSize: 'clamp(20px,2.4vw,32px)', fontWeight: 700,
          letterSpacing: '-0.025em', color: '#010278', lineHeight: 1.15,
        }}>
          Trusted by 35+{' '}
          <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>global partners.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 15, color: '#64748b', marginTop: 14,
          maxWidth: 540, margin: '14px auto 0', lineHeight: 1.65,
        }}>
          Working alongside UN agencies, government partners, and the world&apos;s leading humanitarian organisations.
        </p>
      </div>

      {/* Row A — left to right */}
      <div style={{
        position: 'relative', overflow: 'hidden', marginBottom: 16,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 200ms',
      }}>
        <div className="marquee-fade-l" />
        <div className="marquee-fade-r" />
        <div className="marquee-row" style={{
          display: 'flex', gap: 16, width: 'max-content',
          animation: 'marqueeL 50s linear infinite',
        }}>
          {rowA.map((p, i) => <LogoCard key={`a-${i}`} p={p} />)}
        </div>
      </div>

      {/* Row B — right to left */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1) 320ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 320ms',
      }}>
        <div className="marquee-fade-l" />
        <div className="marquee-fade-r" />
        <div className="marquee-row" style={{
          display: 'flex', gap: 16, width: 'max-content',
          animation: 'marqueeR 58s linear infinite',
        }}>
          {rowB.map((p, i) => <LogoCard key={`b-${i}`} p={p} />)}
        </div>
      </div>

      <style>{`
        @keyframes marqueeL { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-row:hover { animation-play-state: paused; }
        .marquee-fade-l {
          position: absolute; left: 0; top: 0; bottom: 0; width: 120px; z-index: 2;
          pointer-events: none;
          background: linear-gradient(to right, #f0f4f9 0%, transparent 100%);
        }
        .marquee-fade-r {
          position: absolute; right: 0; top: 0; bottom: 0; width: 120px; z-index: 2;
          pointer-events: none;
          background: linear-gradient(to left, #eef2f7 0%, transparent 100%);
        }
        @media (max-width: 768px) {
          .partners-section { padding: 56px 0 !important; }
          .marquee-fade-l, .marquee-fade-r { width: 40px !important; }
        }
      `}</style>
    </section>
  )
}
