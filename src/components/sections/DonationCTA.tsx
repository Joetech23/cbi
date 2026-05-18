'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useReveal } from '@/lib/reveal'

const TIERS = [
  { amount: '₦10K',  impact: 'Feed a family for a week' },
  { amount: '₦25K',  impact: 'School kits for 5 children' },
  { amount: '₦50K',  impact: 'Clean water for a household' },
  { amount: '₦100K', impact: 'Healthcare kits for 10 people' },
]

export default function DonationCTA() {
  const [sel, setSel] = useState('₦25K')
  const left  = useReveal()
  const right = useReveal()

  return (
    <section className="cta-section" style={{
      background: 'linear-gradient(135deg, #061138 0%, #010278 38%, #0f3ee2 100%)',
      overflow: 'hidden', position: 'relative', color: 'white',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at top right, rgba(255,132,0,0.14) 0%, transparent 24%), radial-gradient(circle at bottom left, rgba(255,255,255,0.08) 0%, transparent 20%)',
      }} />
      <div className="cta-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 620, position: 'relative', zIndex: 1 }}>

        {/* ── Left: image ── */}
        <div ref={left.ref} style={{
          position: 'relative', overflow: 'hidden',
          opacity: left.visible ? 1 : 0,
          transform: left.visible ? 'none' : 'translateX(-24px)',
          transition: 'opacity 900ms ease, transform 900ms ease',
        }}>
          <Image
            src="/images/cbi-children-treatment.jpg"
            alt="CBI field work"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, transparent 60%, #010278 100%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(1,2,120,0.7) 0%, transparent 50%)',
          }} />

          {/* Floating quote */}
          <div style={{
            position: 'absolute', bottom: 32, left: 28, right: 28,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, padding: '18px 22px',
          }}>
            <div style={{
              fontFamily: 'var(--font-playfair, sans-serif)',
              fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6,
            }}>&ldquo;Your ₦25,000 returns a child to school for a full term.&rdquo;</div>
            <div style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10.5, color: '#ff8400', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 8,
            }}>— CBI Impact Report 2024</div>
          </div>
        </div>

        {/* ── Right: donation form ── */}
        <div ref={right.ref} className="cta-right" style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '64px 56px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.22)',
          borderRadius: 30,
          backdropFilter: 'blur(20px)',
          opacity: right.visible ? 1 : 0,
          transform: right.visible ? 'none' : 'translateX(24px)',
          transition: 'opacity 900ms ease 150ms, transform 900ms ease 150ms',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>Make a Difference</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-playfair, sans-serif)',
            fontSize: 'clamp(22px, 2.8vw, 38px)', fontWeight: 700,
            color: 'white', lineHeight: 1.15, letterSpacing: '-0.015em',
            margin: '0 0 14px',
          }}>
            One decision.<br />
            <em style={{ color: '#ff8400', fontStyle: 'italic' }}>A lifetime of change.</em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 14, color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7, margin: '0 0 32px',
          }}>
            Your support isn&apos;t charity — it&apos;s a direct investment in a child&apos;s chance at a dignified life.
          </p>

          {/* Tier selector */}
          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10, color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12,
          }}>Choose your gift amount</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 28 }}>
            {TIERS.map(t => {
              const on = sel === t.amount
              return (
                <button key={t.amount} onClick={() => setSel(t.amount)} style={{
                  padding: '14px 16px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                  background: on ? 'rgba(255,132,0,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${on ? '#ff8400' : 'rgba(255,255,255,0.12)'}`,
                  transform: on ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 150ms ease',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-playfair, sans-serif)',
                    fontSize: 20, fontWeight: 700,
                    color: on ? '#ff8400' : 'white', marginBottom: 4,
                  }}>{t.amount}</div>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4,
                  }}>{t.impact}</div>
                </button>
              )
            })}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/donate"
              className="cbi-btn cbi-btn-gold cbi-btn-pulse"
              style={{
                flex: 1, minWidth: 140,
                fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700, justifyContent: 'center',
                background: 'linear-gradient(135deg, #ffb96b, #ff8400)',
                boxShadow: '0 18px 40px rgba(255,132,0,0.32)',
                border: 'none',
              }}
            >♥ Donate {sel}</Link>

            <Link href="/contact"
              className="cbi-btn cbi-btn-outline-white"
              style={{
                flex: 1, minWidth: 140,
                fontFamily: 'var(--font-jakarta, sans-serif)', justifyContent: 'center',
                border: '1.5px solid rgba(255,255,255,0.52)',
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
              }}
            >Become a Partner</Link>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section { }
        .cta-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 900px) {
          .cta-grid  { grid-template-columns: 1fr !important; }
          .cta-right { padding: 48px 24px !important; }
          .cta-grid > div:first-child { height: 300px; }
        }
        @media (max-width: 520px) {
          .cta-right { padding: 40px 16px !important; }
        }
      `}</style>
    </section>
  )
}
