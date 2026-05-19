'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useReveal } from '@/lib/reveal'
import { Heart, Users } from 'lucide-react'

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
    <section className="cta-section" style={{ background: '#ffffff', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* ── Section label ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48,
        }}>
          <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#ff8400',
          }}>Make a Difference</span>
        </div>

        {/* ── Two-column grid ── */}
        <div className="cta-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
        }}>

          {/* ── Left: clean image + quote ── */}
          <div ref={left.ref} style={{
            opacity: left.visible ? 1 : 0,
            transform: left.visible ? 'none' : 'translateX(-28px)',
            transition: 'opacity 900ms ease, transform 900ms ease',
          }}>
            {/* Image — no overlay at all */}
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
              <Image
                src="/images/cbi-children-treatment.jpg"
                alt="CBI children receiving care"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              />
            </div>

            {/* Quote strip below image */}
            <div style={{
              marginTop: 24,
              borderLeft: '3px solid #ff8400',
              paddingLeft: 18,
            }}>
              <p style={{
                fontFamily: 'var(--font-playfair, serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                color: '#1a1a2e',
                lineHeight: 1.55,
                margin: '0 0 8px',
              }}>
                &ldquo;Your ₦25,000 returns a child to school for a full term.&rdquo;
              </p>
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#ff8400',
              }}>— CBI Impact Report 2024</span>
            </div>
          </div>

          {/* ── Right: donation form ── */}
          <div ref={right.ref} className="cta-right" style={{
            opacity: right.visible ? 1 : 0,
            transform: right.visible ? 'none' : 'translateX(28px)',
            transition: 'opacity 900ms ease 150ms, transform 900ms ease 150ms',
          }}>

            <h2 style={{
              fontFamily: 'var(--font-playfair, serif)',
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 700, color: '#000000',
              lineHeight: 1.1, letterSpacing: '-0.015em',
              margin: '0 0 16px',
            }}>
              One decision.<br />
              <em style={{ color: '#0102F1', fontStyle: 'italic' }}>A lifetime of change.</em>
            </h2>

            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 15, color: '#64748b',
              lineHeight: 1.72, margin: '0 0 36px',
            }}>
              Your support isn&apos;t charity — it&apos;s a direct investment in a child&apos;s chance at a dignified life.
            </p>

            {/* Tier label */}
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10.5, fontWeight: 600,
              color: '#94a3b8', letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>Choose your gift amount</p>

            {/* Tier grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 32 }}>
              {TIERS.map(t => {
                const on = sel === t.amount
                return (
                  <button
                    key={t.amount}
                    onClick={() => setSel(t.amount)}
                    style={{
                      padding: '14px 16px', borderRadius: 10,
                      cursor: 'pointer', textAlign: 'left',
                      background: on ? 'rgba(1,2,241,0.05)' : '#f8fafc',
                      border: `1.5px solid ${on ? '#0102F1' : '#e2e8f0'}`,
                      transform: on ? 'translateY(-1px)' : 'none',
                      boxShadow: on ? '0 4px 16px rgba(1,2,241,0.10)' : 'none',
                      transition: 'all 160ms ease',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-playfair, serif)',
                      fontSize: 22, fontWeight: 700,
                      color: on ? '#0102F1' : '#1a1a2e',
                      marginBottom: 3, letterSpacing: '-0.01em',
                    }}>{t.amount}</div>
                    <div style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 11.5, color: '#94a3b8', lineHeight: 1.4,
                    }}>{t.impact}</div>
                  </button>
                )
              })}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href="/donate"
                className="cbi-btn cbi-btn-gold cbi-btn-pulse"
                style={{
                  flex: 1, minWidth: 140, justifyContent: 'center',
                  fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700,
                }}
              >
                <Heart size={14} style={{ flexShrink: 0 }} />
                Donate {sel}
              </Link>

              <Link
                href="/contact"
                className="cbi-btn cbi-btn-outline-blue"
                style={{
                  flex: 1, minWidth: 140, justifyContent: 'center',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                }}
              >
                <Users size={14} style={{ flexShrink: 0 }} />
                Become a Partner
              </Link>
            </div>

            {/* Trust note */}
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, color: '#cbd5e1',
              marginTop: 20, letterSpacing: '0.01em',
            }}>
              🔒 Secure payment · Registered NGO · Nigeria
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section { padding: 88px 80px; }

        @media (max-width: 1024px) {
          .cta-section { padding: 64px 32px; }
          .cta-grid    { gap: 48px !important; }
        }
        @media (max-width: 768px) {
          .cta-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cta-section { padding: 56px 24px; }
        }
        @media (max-width: 480px) {
          .cta-section { padding: 48px 16px; }
          .cta-right   { width: 100%; }
        }
      `}</style>
    </section>
  )
}
