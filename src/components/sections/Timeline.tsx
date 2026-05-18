'use client'

import { useEffect, useState } from 'react'
import { useReveal } from '@/lib/reveal'

const TIMELINE = [
  { year: '2019', title: 'CBI Founded',         desc: 'Established in Nigeria with a founding team of 7. First program: Education in Emergency in Northeast Nigeria.', stat: '120 beneficiaries' },
  { year: '2020', title: 'COVID-19 Response',   desc: 'Rapid pivot to health emergency response. Distributed PPE, hygiene kits, and food packages across 3 states.',  stat: '5,000 families' },
  { year: '2021', title: 'WASH Expansion',      desc: 'Launched WASH program in Borno State. Built 12 boreholes serving 8,000+ people with clean water access.',     stat: '8,200 water beneficiaries' },
  { year: '2022', title: 'Protection Program',  desc: 'Established GBV response and protection services. Reached 2,400 women and girls in conflict-affected areas.',  stat: '2,400 women & girls' },
  { year: '2023', title: 'National Scale',      desc: 'Programs expanded to 10 states. Partnership with UNICEF and WFP unlocked nutrition programming at scale.',     stat: '50,000+ reached' },
  { year: '2024', title: 'Global Recognition',  desc: 'Recognised as a trusted implementing partner by USAID, FCDO, and UN CERF. 35+ international partnerships.',     stat: '100,000+ beneficiaries' },
  { year: '2025', title: 'Today',               desc: 'Six integrated programs, 150,000+ lives touched, active in 10 states. Growing toward universal humanitarian access.', stat: '150,000+ reached', current: true },
]

const AUTOPLAY_MS = 4500
const EASE = 'cubic-bezier(0.16,1,0.3,1)'

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(TIMELINE.length - 1)
  const [paused, setPaused]       = useState(false)
  const { ref: revealRef, visible } = useReveal()

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActiveIdx(i => (i + 1) % TIMELINE.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  const node = TIMELINE[activeIdx]

  return (
    <section
      className="timeline-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: '#f8fafc', overflow: 'hidden' }}
    >
      <div ref={revealRef} style={{
        maxWidth: 1280, margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(36px)',
        transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>Our Journey</span>
            <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(30px,3.5vw,48px)', fontWeight: 800,
            letterSpacing: '-0.025em', color: '#000000', marginTop: 6, lineHeight: 1.1,
          }}>
            Seven Years of<br />
            <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>Growing Impact.</em>
          </h2>
        </div>

        {/* Nodes — horizontal scroller */}
        <div style={{ overflowX: 'auto', paddingBottom: 8, marginBottom: 40 }}>
          <div style={{ display: 'flex', minWidth: 680, position: 'relative' }}>
            {/* Animated progress line under nodes */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: 20, left: `${(100 / TIMELINE.length) / 2}%`,
              width: `${(activeIdx / (TIMELINE.length - 1)) * (100 - 100 / TIMELINE.length)}%`,
              height: 2, background: '#ff8400', zIndex: 0,
              transition: `width 800ms ${EASE}`,
              boxShadow: '0 0 8px rgba(255,132,0,0.5)',
            }} />

            {TIMELINE.map((t, i) => {
              const on = activeIdx === i
              return (
                <div key={t.year}
                  onClick={() => setActiveIdx(i)}
                  style={{ flex: 1, position: 'relative', cursor: 'pointer', textAlign: 'center' }}>
                  {i < TIMELINE.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 20, left: '50%',
                      width: '100%', height: 2,
                      background: '#e2e8f0',
                      zIndex: 0,
                    }} />
                  )}
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', margin: '0 auto',
                    background: on ? '#ff8400' : t.current ? '#0102F1' : 'white',
                    border: on ? '3px solid #e07500' : t.current ? '3px solid #0102F1' : '2px solid #cbd5e1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 2,
                    boxShadow: on ? '0 6px 20px rgba(255,132,0,0.55)' : 'none',
                    transition: `all 400ms ${EASE}`,
                    transform: on ? 'scale(1.15)' : 'scale(1)',
                  }}>
                    {/* Pulsing ring on active */}
                    {on && (
                      <span aria-hidden="true" style={{
                        position: 'absolute', inset: -6, borderRadius: '50%',
                        border: '2px solid rgba(255,132,0,0.45)',
                        animation: 'tlPulse 1.6s ease-out infinite',
                      }} />
                    )}
                    {(on || t.current) && (
                      <div style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: on ? '#010278' : 'white',
                      }} />
                    )}
                  </div>
                  <div style={{
                    marginTop: 10,
                    fontFamily: 'var(--font-space, monospace)',
                    fontSize: 14, fontWeight: 800,
                    color: on ? '#ff8400' : '#94a3b8',
                    transition: 'color 300ms',
                  }}>{t.year}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detail card — animates per year change */}
        <div className="tl-detail" style={{
          background: 'white', borderRadius: 16, padding: '40px 48px',
          border: '1px solid rgba(1,2,241,0.07)',
          borderLeft: '5px solid #ff8400',
          boxShadow: '0 4px 24px rgba(1,2,241,0.08)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Progress bar across the top */}
          <div key={`bar-${activeIdx}`} aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0, height: 2,
            background: '#ff8400',
            width: '100%',
            transformOrigin: 'left',
            animation: paused ? 'none' : `tlBar ${AUTOPLAY_MS}ms linear`,
            animationFillMode: 'forwards',
            transform: 'scaleX(0)',
          }} />

          <div key={activeIdx} className="tl-card" style={{
            display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap',
            animation: `tlSlideIn 600ms ${EASE} both`,
          }}>
            <div style={{
              fontFamily: 'var(--font-space, monospace)',
              fontSize: 72, fontWeight: 900,
              background: 'linear-gradient(135deg, #ff8400 0%, #e07500 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1, flexShrink: 0,
            }}>{node.year}</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h3 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 28, fontWeight: 700, color: '#000000', marginBottom: 12,
              }}>{node.title}</h3>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 16, color: '#64748b', lineHeight: 1.72, marginBottom: 16,
              }}>{node.desc}</p>
              <span style={{
                display: 'inline-block', background: '#d8d8ff', color: '#0102F1',
                borderRadius: 100, padding: '6px 18px',
                fontSize: 13, fontWeight: 700,
                fontFamily: 'var(--font-jakarta, sans-serif)',
              }}>{node.stat}</span>
            </div>
          </div>
        </div>

        {/* Pause hint */}
        <div style={{
          textAlign: 'center', marginTop: 20,
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 11, color: '#94a3b8',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          opacity: paused ? 0.6 : 1, transition: 'opacity 200ms',
        }}>
          {paused ? '⏸ Paused — move your cursor away to resume' : '▶ Auto-playing — hover to pause'}
        </div>
      </div>

      <style>{`
        @keyframes tlSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tlPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.4); opacity: 0;   }
          100% { transform: scale(1.4); opacity: 0;   }
        }
        @keyframes tlBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .timeline-section { padding: 100px 80px; }
        @media (max-width: 768px) {
          .timeline-section { padding: 56px 16px !important; }
          .tl-detail        { padding: 28px 22px !important; }
          .tl-card          { gap: 16px !important; }
          .tl-card > div:first-child { font-size: 52px !important; }
        }
      `}</style>
    </section>
  )
}
