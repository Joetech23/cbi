'use client'

import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/lib/reveal'

function useCountUp(target: number, duration = 2400) {
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

function CounterItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [val, ref] = useCountUp(target)
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-space, monospace)',
        fontSize: 'clamp(44px,5vw,70px)', fontWeight: 800,
        color: 'white', lineHeight: 1, marginBottom: 10,
      }}>
        {val.toLocaleString()}{suffix}
      </div>
      <div style={{ width: 40, height: 3, background: '#ff8400', borderRadius: 2, margin: '0 auto 12px' }} />
      <div style={{
        fontFamily: 'var(--font-jakarta, sans-serif)',
        fontSize: 12, fontWeight: 500,
        color: 'rgba(255,255,255,0.65)',
        textTransform: 'uppercase', letterSpacing: '0.1em',
      }}>{label}</div>
    </div>
  )
}

export default function ImpactNumbers() {
  const { ref, visible } = useReveal()
  return (
    <section ref={ref} className="stats-section" style={{ background: '#0102F1' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(32px)',
          transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 24, height: 1, background: 'rgba(255,132,0,0.5)' }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ffa340',
            }}>By The Numbers</span>
            <span style={{ display: 'block', width: 24, height: 1, background: 'rgba(255,132,0,0.5)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(30px,3.5vw,44px)', fontWeight: 800,
            color: 'white', letterSpacing: '-0.025em', marginTop: 6, lineHeight: 1.1,
          }}>
            We are always where others<br />
            <em style={{ borderBottom: '3px solid #ff8400', paddingBottom: 3 }}>need help.</em>
          </h2>
        </div>

        {/* Counters */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
          <CounterItem target={150000} suffix="+" label="Beneficiaries Reached" />
          <CounterItem target={50}     suffix="+" label="Health Workers Trained" />
          <CounterItem target={35}     suffix="+" label="Partner Organizations" />
          <CounterItem target={6}      suffix=""  label="Active Programs" />
        </div>
      </div>

      <style>{`
        .stats-section { padding: 80px 80px; }
        .stats-grid { grid-template-columns: repeat(4,1fr) !important; }
        @media (max-width: 960px) {
          .stats-section { padding: 64px 24px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 520px) {
          .stats-section { padding: 48px 16px !important; }
          .stats-grid { gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
