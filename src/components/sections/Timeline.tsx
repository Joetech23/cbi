'use client'

import { useEffect, useState } from 'react'
import { useReveal } from '@/lib/reveal'

const MILESTONES = [
  {
    year:  '2019',
    title: 'CBI Founded',
    desc:  'Established in Nigeria with a founding team of 7. Our first programme — Education in Emergency — launched in Northeast Nigeria, enrolling 120 children within weeks.',
    stat:  '120 beneficiaries',
    color: '#0102F1',
    icon:  '🌱',
  },
  {
    year:  '2020',
    title: 'COVID-19 Response',
    desc:  'We pivoted rapidly to emergency health response. PPE, hygiene kits, and food packages were distributed across 3 states — reaching 5,000 families at their most vulnerable.',
    stat:  '5,000 families',
    color: '#e11d48',
    icon:  '🏥',
  },
  {
    year:  '2021',
    title: 'WASH Expansion',
    desc:  'Launched our WASH programme in Borno State. 12 boreholes constructed and 8 community water points rehabilitated — giving 8,200 people clean, safe water for the first time.',
    stat:  '8,200 water beneficiaries',
    color: '#0891b2',
    icon:  '💧',
  },
  {
    year:  '2022',
    title: 'Protection & GBV',
    desc:  'Established safe spaces and GBV case management services. 2,400 women and girls in conflict-affected areas received psychosocial support, legal aid, and emergency referrals.',
    stat:  '2,400 women & girls',
    color: '#7c3aed',
    icon:  '🛡️',
  },
  {
    year:  '2023',
    title: 'National Scale',
    desc:  'Programmes expanded to 10 states simultaneously. Partnerships with UNICEF and WFP unlocked nutrition programming at scale — 50,000+ beneficiaries reached in a single year.',
    stat:  '50,000+ reached',
    color: '#16a34a',
    icon:  '🗺️',
  },
  {
    year:  '2024',
    title: 'Global Recognition',
    desc:  'Recognised as a trusted implementing partner by USAID, FCDO, and UN CERF. 35+ international partnerships formalised. Surpassed 1,000,000 cumulative beneficiaries.',
    stat:  '1,000,000+ beneficiaries',
    color: '#ff8400',
    icon:  '🌍',
  },
  {
    year:    '2025',
    title:   'Today',
    desc:    'Six integrated programmes running simultaneously across 10 states. 1,500,000+ lives touched. Growing steadily toward universal humanitarian access for Nigeria\'s most vulnerable.',
    stat:    '1,500,000+ reached',
    color:   '#0102F1',
    icon:    '✦',
    current: true,
  },
]

const AUTOPLAY_MS = 5000

export default function Timeline() {
  const [active,   setActive]   = useState(MILESTONES.length - 1)
  const [paused,   setPaused]   = useState(false)
  const [progress, setProgress] = useState(0)
  const { ref, visible }        = useReveal()

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive(i => (i + 1) % MILESTONES.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  // Progress bar
  useEffect(() => {
    setProgress(0)
    if (paused) return
    const step = 60
    const inc  = (step / AUTOPLAY_MS) * 100
    const id   = setInterval(() => setProgress(p => Math.min(p + inc, 100)), step)
    return () => clearInterval(id)
  }, [active, paused])

  const node = MILESTONES[active]

  return (
    <section
      className="journey-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: '#ffffff', overflow: 'hidden' }}
    >
      <div ref={ref} className="journey-inner" style={{
        maxWidth: 1280, margin: '0 auto',
        opacity:   visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(36px)',
        transition: 'opacity 900ms ease, transform 900ms ease',
      }}>

        {/* ── Section header ── */}
        <div className="journey-header" style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>Our Journey</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair, serif)',
            fontSize: 'clamp(26px, 3vw, 44px)',
            fontWeight: 700, color: '#000000',
            lineHeight: 1.08, letterSpacing: '-0.015em', margin: 0,
          }}>
            Seven years of<br />
            <em style={{ color: '#0102F1', fontStyle: 'italic' }}>growing impact.</em>
          </h2>
        </div>

        {/* ── Card grid ── */}
        <div className="journey-grid" style={{
          display: 'grid', gridTemplateColumns: '260px 1fr',
          border: '1px solid #e8eaf0', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 8px 48px rgba(1,2,120,0.08)',
        }}>

          {/* ── Left: year list ── */}
          <div className="journey-list" style={{ background: '#f8fafc', borderRight: '1px solid #e8eaf0' }}>
            {MILESTONES.map((m, i) => {
              const on = active === i
              return (
                <button
                  key={m.year}
                  onClick={() => setActive(i)}
                  style={{
                    width: '100%', padding: '16px 20px',
                    background:  on ? 'white' : 'transparent',
                    border:      'none',
                    borderLeft:  `3px solid ${on ? m.color : 'transparent'}`,
                    borderBottom: i < MILESTONES.length - 1 ? '1px solid #e8eaf0' : 'none',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 220ms ease',
                    display: 'flex', alignItems: 'center', gap: 12,
                    boxShadow: on ? '2px 0 16px rgba(1,2,120,0.07)' : 'none',
                  }}
                >
                  {/* Icon badge */}
                  <div style={{
                    width: 32, height: 32, borderRadius: 7, flexShrink: 0,
                    background:  on ? m.color : '#e8eaf0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: on ? 15 : 0,
                    transition: 'all 220ms ease',
                    boxShadow: on ? `0 4px 12px ${m.color}40` : 'none',
                    position: 'relative',
                  }}>
                    {on ? m.icon : (
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%', background: '#94a3b8',
                        display: 'block',
                      }} />
                    )}
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontFamily: 'var(--font-space, monospace)',
                      fontSize: 12.5, fontWeight: 700, letterSpacing: '0.05em',
                      color: on ? m.color : '#94a3b8',
                      transition: 'color 220ms',
                    }}>{m.year}</div>
                    <div style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: on ? 600 : 400,
                      color: on ? '#000000' : '#64748b',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      transition: 'all 220ms', marginTop: 1,
                    }}>{m.title}</div>
                  </div>

                  {m.current && (
                    <span style={{
                      flexShrink: 0, background: '#0102F1', color: 'white',
                      fontSize: 8, fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '2px 6px', borderRadius: 3,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                    }}>NOW</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Right: content panel ── */}
          <div style={{ background: 'white', position: 'relative', overflow: 'hidden' }}>

            {/* Top progress bar */}
            <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#f1f5f9', zIndex: 2 }}>
              <div style={{
                height: '100%', background: node.color,
                width: `${progress}%`,
                transition: 'width 60ms linear',
                borderRadius: '0 2px 2px 0',
              }} />
            </div>

            {/* Year watermark */}
            <div key={`wm-${active}`} aria-hidden style={{
              position: 'absolute', right: -16, top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-space, monospace)',
              fontSize: 'clamp(80px, 13vw, 156px)',
              fontWeight: 700, lineHeight: 1,
              color: node.color, opacity: 0.045,
              userSelect: 'none', pointerEvents: 'none',
              letterSpacing: '-0.04em',
              animation: 'jFadeWm 500ms ease both',
            }}>{node.year}</div>

            {/* Main content */}
            <div key={active} className="journey-content" style={{
              padding: '48px 52px',
              position: 'relative', zIndex: 1,
              animation: 'jSlideIn 480ms cubic-bezier(0.16,1,0.3,1) both',
            }}>

              {/* Top row: icon + year + counter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 11,
                  background: node.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                  boxShadow: `0 6px 20px ${node.color}44`,
                }}>{node.icon}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-space, monospace)',
                    fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em',
                    color: node.color, textTransform: 'uppercase',
                  }}>{node.year}</div>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10.5, color: '#94a3b8',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>Milestone {active + 1} / {MILESTONES.length}</div>
                </div>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-playfair, serif)',
                fontSize: 'clamp(22px, 2.6vw, 36px)',
                fontWeight: 700, color: '#000000',
                lineHeight: 1.1, letterSpacing: '-0.015em',
                margin: '0 0 16px',
              }}>{node.title}</h3>

              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 15, color: '#475569',
                lineHeight: 1.8, margin: '0 0 28px',
                maxWidth: 500,
              }}>{node.desc}</p>

              {/* Stat chip */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: `${node.color}0f`,
                border: `1.5px solid ${node.color}2e`,
                borderRadius: 100, padding: '7px 16px',
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: node.color, flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 13, fontWeight: 700,
                  color: node.color, letterSpacing: '0.02em',
                }}>{node.stat}</span>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 36 }}>
                {[
                  { label: '←', fn: () => setActive(i => (i - 1 + MILESTONES.length) % MILESTONES.length), aria: 'Previous' },
                  { label: '→', fn: () => setActive(i => (i + 1) % MILESTONES.length), aria: 'Next' },
                ].map(btn => (
                  <button
                    key={btn.aria}
                    onClick={btn.fn}
                    aria-label={btn.aria}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      border: '1.5px solid #e2e8f0', background: 'white',
                      cursor: 'pointer', color: '#64748b', fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 150ms ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = node.color
                      el.style.color       = node.color
                      el.style.background  = `${node.color}0f`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = '#e2e8f0'
                      el.style.color       = '#64748b'
                      el.style.background  = 'white'
                    }}
                  >{btn.label}</button>
                ))}

                <div style={{ display: 'flex', gap: 5, marginLeft: 6 }}>
                  {MILESTONES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      style={{
                        width: active === i ? 20 : 6, height: 6, borderRadius: 3,
                        background: active === i ? node.color : '#e2e8f0',
                        border: 'none', cursor: 'pointer', padding: 0,
                        transition: 'all 280ms ease',
                      }}
                      aria-label={`Go to ${MILESTONES[i].year}`}
                    />
                  ))}
                </div>

                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10.5, color: '#94a3b8',
                  letterSpacing: '0.06em', marginLeft: 6,
                }}>{paused ? '⏸ Paused' : '▶ Auto-playing'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes jSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes jFadeWm {
          from { opacity: 0; }
          to   { opacity: 0.045; }
        }

        .journey-section { padding: 100px 80px; }

        @media (max-width: 1024px) {
          .journey-section { padding: 72px 32px !important; }
          .journey-grid    { grid-template-columns: 200px 1fr !important; }
        }
        @media (max-width: 768px) {
          .journey-section { padding: 56px 16px !important; }
          .journey-grid    { grid-template-columns: 1fr !important; }
          .journey-list    {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            border-right: none !important;
            border-bottom: 1px solid #e8eaf0 !important;
            scrollbar-width: none;
          }
          .journey-list::-webkit-scrollbar { display: none; }
          .journey-list button {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            min-width: 90px !important;
            padding: 12px 10px !important;
            border-left: none !important;
            border-bottom: 3px solid transparent !important;
            flex-shrink: 0 !important;
            gap: 6px !important;
          }
          .journey-content { padding: 28px 22px !important; }
        }
        @media (max-width: 480px) {
          .journey-section { padding: 48px 12px !important; }
          .journey-header  { margin-bottom: 28px !important; }
        }
      `}</style>
    </section>
  )
}
