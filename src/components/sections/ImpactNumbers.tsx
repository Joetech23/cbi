'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useReveal } from '@/lib/reveal'

function useCountUp(target: number, duration = 2200) {
  const [val, setVal]       = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true)
        let t0: number | null = null
        const step = (ts: number) => {
          if (!t0) t0 = ts
          const p    = Math.min((ts - t0) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.floor(ease * target))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration, started])

  return [val, ref] as const
}

const STATS = [
  { target: 1500000, suffix: '+', label: 'Beneficiaries Reached',    sub: 'across 10 Nigerian states' },
  { target: 70000,  suffix: '+', label: 'Health Consultations',      sub: 'community & field clinics' },
  { target: 35,     suffix: '+', label: 'Partner Organisations',      sub: 'UN agencies, donors & NGOs' },
  { target: 6,      suffix: '',  label: 'Active Programs',            sub: 'integrated humanitarian work' },
]

function StatItem({ stat }: { stat: typeof STATS[0] }) {
  const [val, ref] = useCountUp(stat.target)
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '0 8px' }}>
      <div style={{
        fontFamily: 'var(--font-playfair, sans-serif)',
        fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 700,
        color: 'white', lineHeight: 1, letterSpacing: '-0.03em',
      }}>
        {val.toLocaleString()}<span style={{ color: '#ff8400' }}>{stat.suffix}</span>
      </div>
      <div style={{ width: 32, height: 2, background: '#ff8400', borderRadius: 2, margin: '10px auto 10px' }} />
      <div style={{
        fontFamily: 'var(--font-jakarta, sans-serif)',
        fontSize: 12, fontWeight: 600, color: 'white',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4,
      }}>{stat.label}</div>
      <div style={{
        fontFamily: 'var(--font-jakarta, sans-serif)',
        fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em',
      }}>{stat.sub}</div>
    </div>
  )
}

export default function ImpactNumbers() {
  const { ref, visible } = useReveal()

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background image with overlay */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="/images/cbi-medical-outreach.jpg"
          alt="" fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.25)' }}
          aria-hidden
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(1,2,120,0.95) 0%, rgba(1,2,241,0.7) 100%)',
      }} />

      <div ref={ref} className="stats-section" style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>

        {/* Header row */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24, marginBottom: 64,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(28px)',
          transition: 'opacity 700ms ease, transform 700ms ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>By The Numbers</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, sans-serif)',
              fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 700,
              color: 'white', letterSpacing: '-0.015em', lineHeight: 1.15, margin: 0,
            }}>
              Impact measured.<br />
              <em style={{ color: '#ff8400', fontStyle: 'italic' }}>Lives transformed.</em>
            </h2>
          </div>
          <Link href="/impact" className="cbi-btn cbi-btn-outline-white"
            style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 12 }}
          >See Our Impact →</Link>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 56 }} />

        {/* Stats grid */}
        <div className="stats-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 800ms ease 200ms, transform 800ms ease 200ms',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              padding: '0 16px',
            }}>
              <StatItem stat={s} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-section { padding: 80px 80px; }
        @media (max-width: 1024px) {
          .stats-section { padding: 64px 32px !important; }
        }
        @media (max-width: 960px) {
          .stats-section { padding: 56px 24px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 40px !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 32px; }
          .stats-grid > div:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.08) !important; }
          .stats-grid > div:last-child, .stats-grid > div:nth-last-child(2) { border-bottom: none; }
        }
        @media (max-width: 520px) {
          .stats-section { padding: 44px 16px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 360px) {
          .stats-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; padding-bottom: 24px; }
          .stats-grid > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  )
}
