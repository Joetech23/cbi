'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useReveal } from '@/lib/reveal'

const TIERS = [
  { amount: '₦10K',  impact: 'Feed a family for a week — all seven of them.' },
  { amount: '₦25K',  impact: 'School supplies for 5 displaced children.' },
  { amount: '₦50K',  impact: 'Clean water for a household for a season.' },
  { amount: '₦100K', impact: 'A healthcare kit for 10 beneficiaries.' },
]

export default function DonationCTA() {
  const [sel, setSel] = useState('₦25K')
  const { ref, visible } = useReveal()

  return (
    <section ref={ref} className="cta-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background photo */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="/images/field-vert.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.35)' }}
          aria-hidden="true"
        />
      </div>
      {/* Gradient overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(1,2,120,0.88) 0%, rgba(1,2,241,0.55) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(36px)',
        transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ display: 'block', width: 24, height: 1, background: 'rgba(255,132,0,0.5)' }} />
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#ffa340',
          }}>Make a Difference</span>
          <span style={{ display: 'block', width: 24, height: 1, background: 'rgba(255,132,0,0.5)' }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontSize: 'clamp(34px,4.5vw,62px)', fontWeight: 800,
          letterSpacing: '-0.025em', color: 'white',
          lineHeight: 1.08, margin: '16px 0 20px',
        }}>
          Every action begins<br />with one decision.<br />
          Make <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>yours</em> today.
        </h2>

        <p style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 17, color: 'rgba(255,255,255,0.72)',
          marginBottom: 40, lineHeight: 1.65,
        }}>
          Your support isn&apos;t charity — it&apos;s a direct investment in a child&apos;s chance at a dignified life.
        </p>

        <p style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 11, color: 'rgba(255,255,255,0.45)',
          marginBottom: 14, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>— choose what your gift does —</p>

        {/* Tier grid */}
        <div className="tiers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 36 }}>
          {TIERS.map(t => {
            const on = sel === t.amount
            return (
              <div key={t.amount} onClick={() => setSel(t.amount)} style={{
                padding: '16px 12px', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
                background: on ? 'rgba(255,132,0,0.18)' : 'rgba(255,255,255,0.06)',
                border: on ? '2px solid #ff8400' : '2px solid rgba(255,255,255,0.18)',
                transform: on ? 'scale(1.03)' : 'none',
                transition: 'all 150ms ease-out',
              }}>
                <div style={{
                  fontFamily: 'var(--font-space, monospace)',
                  fontSize: 28, fontWeight: 800,
                  color: on ? '#ff8400' : 'white', marginBottom: 8,
                }}>{t.amount}</div>
                <div style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5,
                }}>{t.impact}</div>
              </div>
            )
          })}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/donate" style={{
            padding: '16px 40px', background: '#ff8400', color: '#010278',
            border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
            transition: 'all 150ms', textDecoration: 'none', display: 'inline-block',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#e07500'; el.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ff8400'; el.style.transform = 'none' }}
          >Donate Now →</Link>

          <Link href="/contact" style={{
            padding: '16px 40px', background: 'transparent',
            border: '2px solid rgba(255,255,255,0.45)', color: 'white',
            borderRadius: 8, fontSize: 16, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
            transition: 'all 150ms', textDecoration: 'none', display: 'inline-block',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.1)'; el.style.borderColor = 'rgba(255,255,255,0.8)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.45)' }}
          >Become a Partner</Link>
        </div>
      </div>

      <style>{`
        .cta-section { padding: 120px 80px; }
        .tiers-grid { grid-template-columns: repeat(4,1fr) !important; }
        @media (max-width: 900px) {
          .cta-section { padding: 80px 24px !important; }
          .tiers-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 520px) {
          .cta-section { padding: 56px 16px !important; }
        }
      `}</style>
    </section>
  )
}
