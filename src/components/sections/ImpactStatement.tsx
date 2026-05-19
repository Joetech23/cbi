'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useReveal } from '@/lib/reveal'

const PILLARS = [
  { num: '10', unit: 'States', lbl: 'operating across Nigeria' },
  { num: '6',  unit: 'Programs', lbl: 'delivering integrated care' },
  { num: '35+', unit: 'Partners', lbl: 'UN agencies & NGOs' },
]

export default function ImpactStatement() {
  const left  = useReveal()
  const right = useReveal()

  return (
    <section className="stmt-section" style={{ background: 'white', overflow: 'hidden' }}>
      <div className="stmt-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 80 }}>

        {/* ── Left: image with floating badge ── */}
        <div ref={left.ref} style={{
          position: 'relative',
          opacity: left.visible ? 1 : 0,
          transform: left.visible ? 'none' : 'translateX(-32px)',
          transition: 'opacity 900ms ease, transform 900ms ease',
        }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 500, position: 'relative' }}>
            <Image
              src="/images/cbi-community-1.jpg"
              alt="CBI community engagement"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Tint */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(1,2,120,0.6) 0%, transparent 50%)',
            }} />
          </div>

          {/* Floating stat card */}
          <div className="anim-float" style={{
            position: 'absolute', bottom: -24, right: -28,
            background: '#0102F1', borderRadius: 12,
            padding: '22px 28px', boxShadow: '0 16px 48px rgba(1,2,241,0.3)',
            minWidth: 180,
          }}>
            <div style={{
              fontFamily: 'var(--font-playfair, sans-serif)',
              fontSize: 42, fontWeight: 700, color: '#ff8400', lineHeight: 1,
            }}>1.5M+</div>
            <div style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.75)',
              marginTop: 4, letterSpacing: '0.04em',
            }}>Lives reached since 2019</div>
          </div>

          {/* Top-left accent block */}
          <div style={{
            position: 'absolute', top: -16, left: -16,
            width: 64, height: 64,
            background: '#ff8400', borderRadius: 10, zIndex: -1,
            opacity: 0.35,
          }} />
        </div>

        {/* ── Right: pull-quote + pillars ── */}
        <div ref={right.ref} style={{
          opacity: right.visible ? 1 : 0,
          transform: right.visible ? 'none' : 'translateX(32px)',
          transition: 'opacity 900ms ease 150ms, transform 900ms ease 150ms',
        }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>Our Reach</span>
          </div>

          {/* Big quote mark */}
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 96, lineHeight: 0.7,
            color: '#ff8400', opacity: 0.18,
            marginBottom: 8, userSelect: 'none',
          }}>&ldquo;</div>

          <blockquote style={{
            fontFamily: 'var(--font-playfair, sans-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.2vw, 28px)',
            lineHeight: 1.45, letterSpacing: '-0.01em',
            color: '#000000', margin: '0 0 12px',
          }}>
            Since 2019, we have touched over 1,500,000 lives across 10 Nigerian states — one community at a time.
          </blockquote>

          <div style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 12, fontWeight: 600,
            color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 40,
          }}>— Rejoice Mark, Executive Director</div>

          {/* Pillars row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, marginBottom: 40, borderTop: '1px solid rgba(1,2,241,0.08)', paddingTop: 28 }}>
            {PILLARS.map((p, i) => (
              <div key={p.unit} style={{
                paddingRight: i < 2 ? 20 : 0,
                borderRight: i < 2 ? '1px solid rgba(1,2,241,0.08)' : 'none',
                paddingLeft: i > 0 ? 20 : 0,
              }}>
                <div style={{
                  fontFamily: 'var(--font-playfair, sans-serif)',
                  fontSize: 28, fontWeight: 700, color: '#0102F1', lineHeight: 1,
                }}>{p.num} <span style={{ fontSize: 14, color: '#ff8400', fontStyle: 'italic' }}>{p.unit}</span></div>
                <div style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, color: '#94a3b8', marginTop: 5, lineHeight: 1.4,
                }}>{p.lbl}</div>
              </div>
            ))}
          </div>

          <Link href="/about" className="cbi-btn cbi-btn-primary"
            style={{ fontFamily: 'var(--font-jakarta, sans-serif)' }}
          >Our Story →</Link>
        </div>
      </div>

      <style>{`
        .stmt-section { padding: 100px 80px; }
        .stmt-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 900px) {
          .stmt-section { padding: 64px 24px !important; }
          .stmt-grid    { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 520px) {
          .stmt-section { padding: 48px 16px !important; }
        }
      `}</style>
    </section>
  )
}
