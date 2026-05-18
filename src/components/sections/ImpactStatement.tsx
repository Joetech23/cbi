'use client'

import { useEffect, useRef, useState } from 'react'

export default function ImpactStatement() {
  const ref = useRef<HTMLElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="impact-stmt" style={{
      background: 'white',
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(28px)',
      transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        {/* Decorative rule */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 40 }}>
          <span style={{ display: 'block', flex: 1, maxWidth: 72, height: 1, background: '#e2e8f0' }} />
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            color: '#94a3b8', textTransform: 'uppercase',
          }}>Our Reach</span>
          <span style={{ display: 'block', flex: 1, maxWidth: 72, height: 1, background: '#e2e8f0' }} />
        </div>

        <blockquote style={{
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(26px, 3.4vw, 48px)',
          lineHeight: 1.32, letterSpacing: '-0.02em',
          color: '#000000', marginBottom: 32,
        }}>
          &ldquo;Since 2019, we have touched over 150,000 lives across 10 Nigerian states — one community at a time.&rdquo;
        </blockquote>

        <div style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 12, fontWeight: 700,
          color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          — Rejoice Mark, Executive Director
        </div>
      </div>

      <style>{`
        .impact-stmt { padding: 120px 80px; }
        @media (max-width: 768px) { .impact-stmt { padding: 80px 24px !important; } }
        @media (max-width: 520px) { .impact-stmt { padding: 56px 16px !important; } }
      `}</style>
    </section>
  )
}
