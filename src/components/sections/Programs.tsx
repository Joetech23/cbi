'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Reveal, useReveal } from '@/lib/reveal'

/* ── Custom SVG icons matching the Claude design ── */
const Icons = {
  Education: () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M7 14l11-6 11 6-11 6-11-6z" stroke="#0102F1" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 17v8s3 2.5 6 2.5 6-2.5 6-2.5v-8" stroke="#0102F1" strokeWidth="2" strokeLinecap="round"/>
      <line x1="29" y1="14" x2="29" y2="21" stroke="#0102F1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Health: () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="6" y="6" width="24" height="24" rx="5" stroke="#0102F1" strokeWidth="2"/>
      <path d="M18 11v14M11 18h14" stroke="#0102F1" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  Nutrition: () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M14 6v9c0 2.2 1.8 4 4 4s4-1.8 4-4V6" stroke="#0102F1" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="19" x2="18" y2="30" stroke="#0102F1" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 10h5M22 10h5" stroke="#0102F1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  WASH: () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 4s-10 11-10 18a10 10 0 0020 0C28 15 18 4 18 4z" stroke="#0102F1" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 22a4 4 0 003 2.5" stroke="#0102F1" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Protection: () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 4l12 5v9c0 7-5 12-12 14C11 30 6 25 6 18V9l12-5z" stroke="#0102F1" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 18l4 4 6-7" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Food: () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M9 28L18 9l9 19" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="21" x2="24" y2="21" stroke="#0102F1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
}

const PROGRAMS = [
  { key: 'Education',  title: 'Education in Emergency',        desc: 'Keeping children learning during crises. Safe learning environments, teacher training, and school supplies for displaced communities.' },
  { key: 'Health',     title: 'Health & Primary Care',         desc: 'Community health services including maternal care, immunization, and primary outreach reaching the most underserved populations.' },
  { key: 'Nutrition',  title: 'Nutrition',                     desc: 'Tackling acute malnutrition through therapeutic feeding, growth monitoring, and caregiver nutrition counseling.' },
  { key: 'WASH',       title: 'WASH',                          desc: 'Clean water, sanitation facilities, and hygiene promotion for communities living without safe water sources.' },
  { key: 'Protection', title: 'Protection & GBV',              desc: 'Safeguarding vulnerable women, children, and IDPs from violence, abuse, and exploitation through case management and safe spaces.' },
  { key: 'Food',       title: 'Food Security & Livelihoods',   desc: 'Cash assistance, agricultural support, and skills training to help communities achieve lasting self-sufficiency.' },
]

export default function Programs() {
  const [hov, setHov] = useState<number | null>(null)
  const { ref, visible } = useReveal()

  return (
    <section className="progs-section" style={{ background: '#f8fafc' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>What We Do</span>
            <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(34px,4vw,52px)', fontWeight: 800,
            letterSpacing: '-0.025em', color: '#000000', lineHeight: 1.1, marginTop: 4,
          }}>
            Six Programs.<br />
            <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>One Mission.</em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 17, color: '#64748b', marginTop: 16, maxWidth: 480,
            margin: '16px auto 0', lineHeight: 1.65,
          }}>
            Thousands of lives. One goal: leave no community behind.
          </p>
        </div>
        </Reveal>

        {/* Grid */}
        <div className="progs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {PROGRAMS.map((p, i) => {
            const Icon = Icons[p.key as keyof typeof Icons]
            const on = hov === i
            return (
              <Link href="/programs" key={p.key}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  background: 'white', borderRadius: 12, cursor: 'pointer', padding: 32,
                  border: on ? '1px solid rgba(255,132,0,0.3)' : '1px solid rgba(1,2,241,0.08)',
                  borderLeft: on ? '4px solid #ff8400' : '4px solid transparent',
                  boxShadow: on ? '0 8px 32px rgba(1,2,241,0.13)' : '0 2px 16px rgba(1,2,241,0.06)',
                  transform: visible ? (on ? 'translateY(-4px)' : 'none') : 'translateY(28px)',
                  opacity: visible ? 1 : 0,
                  transition: `all 700ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 220ms ease-out, opacity 700ms ease-out`,
                  textDecoration: 'none', display: 'block',
                }}>
                <div style={{ marginBottom: 20 }}><Icon /></div>
                <h3 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 17, fontWeight: 700, color: '#000000',
                  marginBottom: 10, letterSpacing: '-0.01em',
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 14, color: '#64748b', lineHeight: 1.68, marginBottom: 20,
                }}>{p.desc}</p>
                <div style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 13, fontWeight: 600,
                  color: on ? '#ff8400' : '#0102F1',
                  transition: 'color 200ms',
                }}>Learn more →</div>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        .progs-section { padding: 100px 80px; }
        @media (max-width: 1024px) { .progs-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px)  {
          .progs-grid    { grid-template-columns: 1fr !important; gap: 16px !important; }
          .progs-section { padding: 56px 16px !important; }
        }
      `}</style>
    </section>
  )
}
