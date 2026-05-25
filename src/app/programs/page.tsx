'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import DonationCTA from '@/components/sections/DonationCTA'
import { PROGRAMS } from '@/lib/programs'

export default function ProgramsPage() {
  const [active, setActive] = useState(0)
  const p = PROGRAMS[active]

  return (
    <>
      <PageHero
        tag="Our Programmes"
        headline="Six programmes."
        emph="One mission."
        sub="Thousands of lives across Nigeria. One goal — leave no community behind."
      />

      {/* ── Programme selector ── */}
      <section className="prog-page-section" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Tab bar */}
          <div className="prog-tabs" style={{
            display: 'flex', gap: 8, marginBottom: 52, flexWrap: 'wrap',
            overflowX: 'auto',
          }}>
            {PROGRAMS.map((pd, i) => (
              <button key={pd.slug} onClick={() => setActive(i)} style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, fontWeight: 700,
                background: active === i ? pd.accentHex : 'white',
                color: active === i ? 'white' : '#64748b',
                boxShadow: active === i
                  ? `0 4px 14px ${pd.accentHex}44`
                  : '0 1px 4px rgba(1,2,241,0.08)',
                transition: 'all 180ms cubic-bezier(0.16,1,0.3,1)',
                whiteSpace: 'nowrap', flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <span style={{ fontSize: 15 }}>{pd.icon}</span>
                {pd.name}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="prog-detail" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start',
          }}>
            {/* Left — info */}
            <div>
              {/* Tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{p.icon}</span>
                <span style={{
                  background: p.bgLight, color: p.accentHex,
                  border: `1px solid ${p.accentHex}44`,
                  borderRadius: 100, fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '6px 16px',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                }}>{p.shortName}</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 'clamp(24px, 2.5vw, 34px)',
                fontWeight: 700, color: '#000000',
                marginBottom: 16, letterSpacing: '-0.025em', lineHeight: 1.1,
              }}>{p.name}</h2>

              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 16, color: '#64748b', lineHeight: 1.78, marginBottom: 28,
              }}>{p.description}</p>

              {/* Who it serves */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
                }}>Who It Serves</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.targetPopulation.slice(0, 5).map(pop => (
                    <span key={pop} style={{
                      padding: '6px 14px', borderRadius: 100,
                      background: p.bgLight,
                      border: `1px solid ${p.accentHex}25`,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: 600, color: p.accentHex,
                    }}>{pop}</span>
                  ))}
                  {p.targetPopulation.length > 5 && (
                    <span style={{
                      padding: '6px 14px', borderRadius: 100,
                      background: '#f1f5f9',
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: 600, color: '#64748b',
                    }}>+{p.targetPopulation.length - 5} more</span>
                  )}
                </div>
              </div>

              {/* Activities */}
              <div style={{ marginBottom: 32 }}>
                <h4 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
                }}>Key Activities</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.keyActivities.slice(0, 6).map(a => (
                    <li key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle2 size={15} color={p.accentHex} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 14, color: '#374151', lineHeight: 1.55,
                      }}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom row: impact + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-block',
                  background: p.bgLight, color: p.accentHex,
                  borderRadius: 100, padding: '10px 24px',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 14, fontWeight: 700,
                  border: `1px solid ${p.accentHex}30`,
                }}>{p.stats[0].value} {p.stats[0].label}</span>

                <Link href={`/programs/${p.slug}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 22px',
                  background: p.accentHex, color: 'white',
                  borderRadius: 100, textDecoration: 'none',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 13, fontWeight: 700,
                  boxShadow: `0 4px 14px ${p.accentHex}44`,
                  transition: 'all 200ms',
                }}>
                  Full Programme Details <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right — image with overlay stats */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 20, overflow: 'hidden',
                height: 460,
                boxShadow: `0 24px 60px ${p.accentHex}20`,
                position: 'relative',
              }}>
                <Image
                  src={p.heroImage} alt={p.name}
                  fill sizes="640px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, ${p.accentHex}cc 0%, transparent 55%)`,
                }} />

                {/* Stats overlay */}
                <div style={{
                  position: 'absolute', bottom: 24, left: 24, right: 24,
                  display: 'flex', gap: 12,
                }}>
                  {p.stats.map((s, i) => (
                    <div key={s.label} style={{
                      flex: 1,
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 12, textAlign: 'center',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-space, monospace)',
                        fontSize: 'clamp(16px, 1.8vw, 22px)',
                        fontWeight: 700, color: i === 0 ? '#ff8400' : 'white',
                        lineHeight: 1,
                      }}>{s.value}</div>
                      <div style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 10, fontWeight: 600,
                        color: 'rgba(255,255,255,0.7)',
                        marginTop: 4,
                      }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SDG tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                {p.sdgs.map(sdg => (
                  <span key={sdg} style={{
                    padding: '5px 12px', borderRadius: 100,
                    background: p.bgLight,
                    border: `1px solid ${p.accentHex}25`,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 700, color: p.accentHex,
                  }}>{sdg}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .prog-page-section { padding: 80px 80px; }
          .prog-tabs::-webkit-scrollbar { display: none; }
          .prog-tabs { scrollbar-width: none; -ms-overflow-style: none; }
          @media (max-width: 1024px) {
            .prog-page-section { padding: 56px 40px !important; }
          }
          @media (max-width: 900px) {
            .prog-page-section { padding: 48px 24px !important; }
            .prog-detail { grid-template-columns: 1fr !important; gap: 32px !important; }
            .prog-tabs { flex-wrap: nowrap !important; }
          }
          @media (max-width: 520px) {
            .prog-page-section { padding: 36px 16px !important; }
          }
        `}</style>
      </section>

      {/* ── All Programmes grid ── */}
      <section style={{ background: 'white', padding: '80px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>All Programmes</span>
              <span style={{ display: 'block', width: 28, height: 1, background: '#ff8400' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              fontWeight: 700, color: '#050c2e',
              letterSpacing: '-0.02em',
            }}>
              Explore each of our{' '}
              <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 2 }}>six programme areas.</em>
            </h2>
          </div>

          <div className="all-progs-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24,
          }}>
            {PROGRAMS.map(prog => (
              <Link key={prog.slug} href={`/programs/${prog.slug}`} style={{
                textDecoration: 'none', color: 'inherit',
                background: 'white', borderRadius: 18, overflow: 'hidden',
                border: '1px solid rgba(1,2,241,0.07)',
                boxShadow: '0 4px 20px rgba(1,2,241,0.05)',
                transition: 'all 280ms cubic-bezier(0.16,1,0.3,1)',
                display: 'block',
              }}>
                {/* Image */}
                <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={prog.heroImage} alt={prog.name}
                    fill sizes="400px"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to top, ${prog.accentHex}cc 0%, transparent 60%)`,
                  }} />
                  <span style={{
                    position: 'absolute', bottom: 16, left: 16, fontSize: 28,
                  }}>{prog.icon}</span>
                  <span style={{
                    position: 'absolute', top: 14, right: 14,
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    padding: '4px 12px', borderRadius: 100,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 700, color: 'white',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{prog.shortName}</span>
                </div>

                {/* Content */}
                <div style={{ padding: '22px 24px 26px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontSize: 20, fontWeight: 700, color: '#050c2e',
                    marginBottom: 8, lineHeight: 1.2,
                  }}>{prog.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, color: '#64748b', lineHeight: 1.65,
                    marginBottom: 18,
                  }}>{prog.description}</p>

                  {/* Impact tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                    <span style={{
                      padding: '6px 14px', borderRadius: 100,
                      background: prog.bgLight, color: prog.accentHex,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: 700,
                      border: `1px solid ${prog.accentHex}25`,
                    }}>{prog.stats[0].value} {prog.stats[0].label}</span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: 700, color: prog.accentHex,
                    }}>Learn more <ArrowRight size={12} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .all-progs-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
          @media (max-width: 640px) {
            .all-progs-grid { grid-template-columns: 1fr !important; }
            section[style*="padding: 80px 80px"] { padding: 56px 24px !important; }
          }
        `}</style>
      </section>

      <DonationCTA />
    </>
  )
}
