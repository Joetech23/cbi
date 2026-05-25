import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Users, Target, Globe } from 'lucide-react'
import { PROGRAMS, getProgram, getRelated } from '@/lib/programs'
import ProgramGallery from '@/components/sections/ProgramGallery'
import DonationCTA from '@/components/sections/DonationCTA'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PROGRAMS.map(p => ({ slug: p.slug }))
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params
  const program = getProgram(slug)
  if (!program) notFound()

  const related = getRelated(program)

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: 560, overflow: 'hidden', background: '#010278' }}>
        <Image
          src={program.heroImage}
          alt={program.name}
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.4 }}
        />
        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(1,2,120,0.96) 0%, rgba(1,2,241,0.6) 50%, rgba(1,2,120,0.75) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(1,2,120,0.9) 100%)',
        }} />
        {/* Decorative glow */}
        <div aria-hidden style={{
          position: 'absolute', right: '-8%', top: '-15%',
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,132,0,0.18) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />

        <div className="prog-hero-inner" style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1280, margin: '0 auto',
          padding: '64px 80px 80px',
          minHeight: 560,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {/* Back link */}
          <Link href="/programs" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            padding: '8px 16px', borderRadius: 100,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            alignSelf: 'flex-start',
          }}>
            <ArrowLeft size={13} /> All Programmes
          </Link>

          {/* Name block */}
          <div>
            {/* Tag row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <span style={{ fontSize: 26 }}>{program.icon}</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 14px', borderRadius: 100,
                background: '#ff8400',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'white',
              }}>Programme Area</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontWeight: 700,
              fontSize: 'clamp(38px, 5.5vw, 72px)',
              lineHeight: 1, letterSpacing: '-0.04em',
              color: 'white', margin: '0 0 18px',
              maxWidth: 720,
            }}>{program.name}</h1>

            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.65, margin: '0 0 40px',
              maxWidth: 540,
            }}>{program.tagline}</p>

            {/* Impact stat pills */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {program.stats.map((s, i) => (
                <div key={s.label} style={{
                  padding: '14px 22px',
                  background: i === 0 ? '#ff8400' : 'rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(10px)',
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.16)',
                  borderRadius: 12,
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-space, monospace)',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    fontWeight: 700, color: 'white',
                    letterSpacing: '-0.02em', lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    marginTop: 5,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SDG TAG STRIP
      ═══════════════════════════════════════════════════ */}
      <div style={{
        background: '#0102F1',
        padding: '12px 80px',
        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 9, fontWeight: 700,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>Contributing to</span>
        {program.sdgs.map(sdg => (
          <span key={sdg} style={{
            padding: '4px 14px', borderRadius: 100,
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.22)',
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 11, fontWeight: 600, color: 'white',
            whiteSpace: 'nowrap',
          }}>{sdg}</span>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          MAIN BODY
      ═══════════════════════════════════════════════════ */}
      <section className="prog-body" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="prog-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 72,
            alignItems: 'start',
          }}>

            {/* ── LEFT — content ── */}
            <div>

              {/* Overview */}
              <div style={{
                background: 'white', borderRadius: 20, padding: 40,
                border: '1px solid rgba(1,2,241,0.06)',
                boxShadow: '0 4px 24px rgba(1,2,241,0.05)',
                marginBottom: 24,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
                  <span style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#ff8400',
                  }}>Overview</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-playfair, Georgia, serif)',
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  fontWeight: 700, color: '#000',
                  letterSpacing: '-0.02em', lineHeight: 1.15,
                  marginBottom: 18,
                }}>About the <span style={{ color: '#0102F1' }}>{program.shortName}</span> Programme</h2>
                {program.overview.map((para, i) => (
                  <p key={i} style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 15, color: '#4b5563', lineHeight: 1.8,
                    marginBottom: i < program.overview.length - 1 ? 14 : 0,
                  }}>{para}</p>
                ))}
              </div>

              {/* Strategic Approach (Nutrition pillars) */}
              {program.approach && (
                <div style={{
                  background: 'white', borderRadius: 20, padding: 40,
                  border: '1px solid rgba(1,2,241,0.06)',
                  boxShadow: '0 4px 24px rgba(1,2,241,0.05)',
                  marginBottom: 24,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
                    <span style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: '#ff8400',
                    }}>Strategic Approach</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {program.approach.map((a, i) => (
                      <div key={a.title} style={{
                        padding: '22px 24px',
                        background: '#f8fafc',
                        borderRadius: 12,
                        borderLeft: '4px solid #0102F1',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: '#0102F1',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'var(--font-space, monospace)',
                            fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
                          }}>{i + 1}</div>
                          <h3 style={{
                            fontFamily: 'var(--font-jakarta, sans-serif)',
                            fontSize: 15, fontWeight: 700, color: '#000', margin: 0,
                          }}>{a.title}</h3>
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-jakarta, sans-serif)',
                          fontSize: 13, color: '#6b7280', lineHeight: 1.75,
                          margin: 0, paddingLeft: 40,
                        }}>{a.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Who We Serve */}
              <div style={{
                background: 'white', borderRadius: 20, padding: 40,
                border: '1px solid rgba(1,2,241,0.06)',
                boxShadow: '0 4px 24px rgba(1,2,241,0.05)',
                marginBottom: 24,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <Users size={14} color="#0102F1" />
                  <span style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#94a3b8',
                  }}>Who We Serve</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                  {program.targetPopulation.map(pop => (
                    <span key={pop} style={{
                      padding: '8px 16px',
                      background: '#eef0ff',
                      border: '1px solid rgba(1,2,241,0.14)',
                      borderRadius: 100,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 13, fontWeight: 600, color: '#0102F1',
                    }}>{pop}</span>
                  ))}
                </div>
              </div>

              {/* Key Activities */}
              <div style={{
                background: 'white', borderRadius: 20, padding: 40,
                border: '1px solid rgba(1,2,241,0.06)',
                boxShadow: '0 4px 24px rgba(1,2,241,0.05)',
                marginBottom: program.crossCutting ? 24 : 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <Target size={14} color="#0102F1" />
                  <span style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#94a3b8',
                  }}>Key Activities</span>
                </div>
                <div className="acts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {program.keyActivities.map(act => (
                    <div key={act} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '12px 14px',
                      background: '#f8fafc',
                      borderRadius: 10,
                      border: '1px solid rgba(1,2,241,0.05)',
                    }}>
                      <CheckCircle2 size={15} color="#0102F1" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 13, color: '#374151', lineHeight: 1.5,
                      }}>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-Cutting Approaches (WASH) */}
              {program.crossCutting && (
                <div style={{
                  background: 'white', borderRadius: 20, padding: 40,
                  border: '1px solid rgba(1,2,241,0.06)',
                  boxShadow: '0 4px 24px rgba(1,2,241,0.05)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                    <Globe size={14} color="#0102F1" />
                    <span style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: '#94a3b8',
                    }}>Cross-Cutting Approaches</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {program.crossCutting.map(cc => (
                      <span key={cc} style={{
                        padding: '7px 16px',
                        background: '#f8fafc',
                        border: '1.5px solid rgba(1,2,241,0.12)',
                        borderRadius: 100,
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 12, fontWeight: 600, color: '#374151',
                      }}>{cc}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT — sticky gallery + impact card ── */}
            <div style={{ position: 'sticky', top: 96 }}>

              {/* Gallery label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ display: 'block', width: 24, height: 2, background: '#ff8400', borderRadius: 2 }} />
                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#ff8400',
                }}>Our Work in Action</span>
              </div>

              <ProgramGallery
                images={program.gallery}
                accentHex="#0102F1"
                programName={program.shortName}
              />

              {/* Impact card */}
              <div style={{
                marginTop: 20,
                background: 'linear-gradient(135deg, #010278 0%, #0102F1 100%)',
                borderRadius: 18, padding: '28px 28px',
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(1,2,241,0.2)',
              }}>
                {/* Orange glow */}
                <div aria-hidden style={{
                  position: 'absolute', top: -24, right: -24,
                  width: 100, height: 100, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,132,0,0.5) 0%, transparent 70%)',
                  filter: 'blur(16px)',
                }} />

                <div style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  marginBottom: 20, position: 'relative',
                }}>Programme Impact</div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: program.stats.length === 2 ? '1fr 1fr' : '1fr 1fr',
                  gap: 18, position: 'relative', marginBottom: 24,
                }}>
                  {program.stats.map((s, i) => (
                    <div key={s.label}>
                      <div style={{
                        fontFamily: 'var(--font-space, monospace)',
                        fontSize: 'clamp(20px, 2vw, 28px)',
                        fontWeight: 700, color: '#ff8400',
                        lineHeight: 1,
                      }}>{s.value}</div>
                      <div style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 11, fontWeight: 600,
                        color: 'rgba(255,255,255,0.55)',
                        marginTop: 5, lineHeight: 1.4,
                      }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: 20 }} />

                <Link href="/donate" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px 20px',
                  background: '#ff8400', color: 'white',
                  borderRadius: 10, textDecoration: 'none',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 13, fontWeight: 700,
                  position: 'relative',
                }}>
                  Support this programme <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .prog-body { padding: 72px 80px; }
          @media (max-width: 1100px) {
            .prog-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .prog-body > div > div > div:last-child { position: static !important; }
          }
          @media (max-width: 768px) {
            .prog-body { padding: 48px 28px !important; }
            .prog-hero-inner { padding: 40px 28px 56px !important; }
            .acts-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 520px) {
            .prog-body { padding: 36px 16px !important; }
            .prog-hero-inner { padding: 32px 16px 48px !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════════
          DARK COMMITMENT BANNER
      ═══════════════════════════════════════════════════ */}
      <section style={{
        background: '#010278',
        padding: '72px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', left: '30%', top: '-30%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,132,0,0.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', right: '-5%', bottom: '-20%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(1,2,241,0.3) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div className="commit-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
          }}>
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#ff8400',
                }}>Our Commitment</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 'clamp(24px, 2.8vw, 38px)',
                fontWeight: 700, color: 'white',
                letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 18,
              }}>
                Integrated programming<br />
                for <em style={{ color: '#ff8400' }}>lasting impact.</em>
              </h2>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 15, color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.78, marginBottom: 28,
              }}>
                The {program.name} programme works alongside CBI&apos;s other sectors — Health, WASH,
                Protection, Nutrition, Education, and Food Security — to address the root causes
                of vulnerability and create sustainable, community-led change.
              </p>
              <Link href="/donate" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px',
                background: '#ff8400', color: 'white',
                borderRadius: 10, textDecoration: 'none',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 14, fontWeight: 700,
              }}>
                Donate to this cause <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right — stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {program.stats.map((s, i) => (
                <div key={s.label} style={{
                  padding: '28px 24px',
                  background: i === 0 ? '#0102F1' : 'rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  border: i === 0 ? '1px solid rgba(1,2,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-space, monospace)',
                    fontSize: 'clamp(24px, 2.6vw, 36px)',
                    fontWeight: 700,
                    color: '#ff8400',
                    lineHeight: 1, marginBottom: 10,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 12, fontWeight: 600,
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.4,
                  }}>{s.label}</div>
                </div>
              ))}
              <div style={{
                padding: '28px 24px',
                background: 'rgba(255,132,0,0.12)',
                borderRadius: 16,
                border: '1px solid rgba(255,132,0,0.2)',
                textAlign: 'center',
                gridColumn: program.stats.length % 2 === 0 ? 'auto' : '1 / -1',
              }}>
                <div style={{
                  fontFamily: 'var(--font-space, monospace)',
                  fontSize: 'clamp(24px, 2.6vw, 36px)',
                  fontWeight: 700, color: '#ff8400',
                  lineHeight: 1, marginBottom: 10,
                }}>2019</div>
                <div style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 12, fontWeight: 600,
                  color: 'rgba(255,255,255,0.55)', lineHeight: 1.4,
                }}>Programme since</div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .commit-grid { grid-template-columns: 1fr 1fr; }
          @media (max-width: 900px) {
            .commit-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            section[style*="010278"] { padding: 56px 28px !important; }
          }
          @media (max-width: 520px) {
            section[style*="010278"] { padding: 48px 16px !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════════
          RELATED PROGRAMMES
      ═══════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section style={{ background: 'white', padding: '72px 80px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#ff8400',
                }}>Related Programmes</span>
                <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
              </div>
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 700, color: '#010278', letterSpacing: '-0.02em',
              }}>
                Explore our other{' '}
                <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 2 }}>programmes.</em>
              </h2>
            </div>

            <div className="related-grid" style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(related.length, 3)}, 1fr)`,
              gap: 22,
            }}>
              {related.map(rel => (
                <Link key={rel.slug} href={`/programs/${rel.slug}`} style={{
                  textDecoration: 'none', color: 'inherit',
                  background: 'white', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid rgba(1,2,241,0.08)',
                  boxShadow: '0 4px 20px rgba(1,2,241,0.05)',
                  transition: 'all 260ms cubic-bezier(0.16,1,0.3,1)',
                  display: 'block',
                }}>
                  <div style={{ height: 190, position: 'relative', overflow: 'hidden' }}>
                    <Image
                      src={rel.heroImage} alt={rel.name}
                      fill sizes="400px"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(1,2,120,0.85) 0%, transparent 55%)',
                    }} />
                    <span style={{ position: 'absolute', bottom: 14, left: 14, fontSize: 24 }}>{rel.icon}</span>
                    <span style={{
                      position: 'absolute', top: 12, right: 12,
                      background: '#ff8400',
                      padding: '3px 10px', borderRadius: 100,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 9, fontWeight: 700, color: 'white',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                    }}>{rel.shortName}</span>
                  </div>
                  <div style={{ padding: '20px 22px 24px' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-playfair, Georgia, serif)',
                      fontSize: 19, fontWeight: 700, color: '#010278',
                      marginBottom: 8, lineHeight: 1.2,
                    }}>{rel.name}</h3>
                    <p style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 13, color: '#64748b', lineHeight: 1.65,
                      marginBottom: 16,
                    }}>{rel.description}</p>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: 700, color: '#0102F1',
                    }}>Learn more <ArrowRight size={12} /></span>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/programs" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 26px',
                background: 'transparent', color: '#0102F1',
                border: '2px solid #0102F1',
                borderRadius: 8, fontSize: 14, fontWeight: 700,
                fontFamily: 'var(--font-jakarta, sans-serif)',
                textDecoration: 'none',
              }}>
                <ArrowLeft size={13} /> View all programmes
              </Link>
            </div>
          </div>

          <style>{`
            .related-grid { grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 900px) {
              .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
              section[style*="white"] { padding: 56px 28px !important; }
            }
            @media (max-width: 580px) {
              .related-grid { grid-template-columns: 1fr !important; }
              section[style*="white"] { padding: 48px 16px !important; }
            }
          `}</style>
        </section>
      )}

      <DonationCTA />
    </>
  )
}
