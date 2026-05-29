'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle2,
  HeartPulse, Leaf, Droplets, ShieldCheck, Wheat, GraduationCap,
  Wind, Scale,
} from 'lucide-react'
import DonationCTA from '@/components/sections/DonationCTA'
import { PROGRAMS } from '@/lib/programs'

/* ─────────────────────────────────────────────────────────────
   SVG icon map (replaces emojis)
───────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ReactNode> = {
  health:                    <HeartPulse  size={22} strokeWidth={1.8} />,
  nutrition:                 <Leaf        size={22} strokeWidth={1.8} />,
  wash:                      <Droplets    size={22} strokeWidth={1.8} />,
  protection:                <ShieldCheck size={22} strokeWidth={1.8} />,
  'food-security-livelihoods': <Wheat     size={22} strokeWidth={1.8} />,
  education:                 <GraduationCap size={22} strokeWidth={1.8} />,
}

/* ─────────────────────────────────────────────────────────────
   Pinwheel helpers
───────────────────────────────────────────────────────────── */
const SIZE = 480, CX = 240, CY = 240, R = 230, INNER = 54, GAP = 2.5

const WHEEL = [
  { name: 'Health',        slug: 'health',                    img: '/images/programs/IMG_8929-health.jpg',    color: '#0102F1' },
  { name: 'Nutrition',     slug: 'nutrition',                 img: '/images/programs/IMG_9297-nutrition.jpg', color: '#e11d48' },
  { name: 'Education',     slug: 'education',                 img: '/images/programs/IMG_9278-education.jpg', color: '#0891b2' },
  { name: 'WASH',          slug: 'wash',                      img: '/images/cbi-wash-program.jpg',            color: '#16a34a' },
  { name: 'Protection',    slug: 'protection',                img: '/images/cbi-community-2.jpg',             color: '#7c3aed' },
  { name: 'Food Security', slug: 'food-security-livelihoods', img: '/images/cbi-community-1.jpg',             color: '#ea580c' },
]

function wedgePath(startDeg: number, endDeg: number): string {
  const rad = (d: number) => (d * Math.PI) / 180
  const s = rad(startDeg), e = rad(endDeg)
  const ox1 = CX + R * Math.cos(s), oy1 = CY + R * Math.sin(s)
  const ox2 = CX + R * Math.cos(e), oy2 = CY + R * Math.sin(e)
  const ix1 = CX + INNER * Math.cos(s), iy1 = CY + INNER * Math.sin(s)
  const ix2 = CX + INNER * Math.cos(e), iy2 = CY + INNER * Math.sin(e)
  return `M${ix1.toFixed(1)} ${iy1.toFixed(1)} L${ox1.toFixed(1)} ${oy1.toFixed(1)} A${R} ${R} 0 0 1 ${ox2.toFixed(1)} ${oy2.toFixed(1)} L${ix2.toFixed(1)} ${iy2.toFixed(1)} A${INNER} ${INNER} 0 0 0 ${ix1.toFixed(1)} ${iy1.toFixed(1)}Z`
}

function labelPos(i: number) {
  const mid = ((i * 60 - 90 + GAP) + ((i + 1) * 60 - 90 - GAP)) / 2
  const rad = (mid * Math.PI) / 180
  const rMid = (R + INNER) / 2 + 24
  return { x: CX + rMid * Math.cos(rad), y: CY + rMid * Math.sin(rad) }
}

/* ─────────────────────────────────────────────────────────────
   New programme areas
───────────────────────────────────────────────────────────── */
const NEW_AREAS = [
  {
    icon: <Wind size={18} strokeWidth={1.8} color="#16a34a" />,
    color: '#16a34a', bg: '#f0fdf4',
    title: 'Climate Change',
    desc: 'Strengthening community resilience to climate change through environmental awareness, sustainable practices, disaster risk reduction, and community-led climate actions that protect vulnerable populations and promote a healthier future.',
  },
  {
    icon: <Scale size={18} strokeWidth={1.8} color="#7c3aed" />,
    color: '#7c3aed', bg: '#faf5ff',
    title: 'Governance & Peace Building',
    desc: 'Promoting inclusive governance, civic participation, conflict prevention, and peaceful coexistence by empowering communities, amplifying voices, and fostering dialogue that supports justice, unity, and sustainable peace.',
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function ProgramsPage() {
  const [active,       setActive]       = useState(0)
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null)
  const p = PROGRAMS[active]

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO — Programme Areas Landing
      ══════════════════════════════════════════════ */}
      <section className="prog-hero-section" style={{ background: 'white', overflow: 'hidden' }}>
        <div className="prog-hero-inner" style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* ── Left ── */}
          <div className="prog-hero-left">

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Care Best Initiative</span>
            </div>

            <h1 className="prog-hero-h1" style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: '-0.025em', margin: '0 0 28px',
            }}>
              <span style={{ display: 'block', color: '#111827' }}>Our</span>
              <span style={{ display: 'block', color: '#0102F1' }}>Programme</span>
              <span style={{ display: 'block', color: '#9ca3af' }}>Areas</span>
            </h1>

            <p className="prog-hero-desc" style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 15, color: '#475569', lineHeight: 1.82,
              marginBottom: 32, maxWidth: 480,
            }}>
              Care Best Initiative implements its work through integrated programme areas that collectively respond to the complex and interconnected needs of vulnerable communities. Each area is designed to reinforce the others, ensuring a holistic approach to development, improving access to essential services, strengthening household resilience, safeguarding dignity, and promoting social stability.
            </p>

            <div className="new-areas-grid" style={{ marginBottom: 36 }}>
              {NEW_AREAS.map(area => (
                <div key={area.title} style={{
                  padding: '18px 20px',
                  background: area.bg, borderRadius: 12,
                  border: `1px solid ${area.color}22`,
                  borderLeft: `4px solid ${area.color}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: `${area.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>{area.icon}</div>
                    <h3 style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 14, fontWeight: 700, color: area.color, margin: 0,
                    }}>{area.title}</h3>
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0,
                  }}>{area.desc}</p>
                </div>
              ))}
            </div>

            <a href="#all-programmes" className="cbi-btn cbi-btn-blue" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-jakarta, sans-serif)',
            }}>
              Explore All Programme Areas <ArrowRight size={16} />
            </a>
          </div>

          {/* ── Right: Pinwheel ── */}
          <div className="prog-hero-right">
            {/* Outer wrapper controls layout size; inner wrapper scales the 480×480 canvas */}
            <div className="wheel-outer">
              <div className="wheel-inner" style={{ position: 'relative', width: SIZE, height: SIZE }}>

                {/* SVG clip-path defs */}
                <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
                  <defs>
                    {WHEEL.map((_, i) => (
                      <clipPath key={i} id={`prog-slice-${i}`} clipPathUnits="userSpaceOnUse">
                        <path d={wedgePath(i * 60 - 90 + GAP, (i + 1) * 60 - 90 - GAP)} />
                      </clipPath>
                    ))}
                  </defs>
                </svg>

                {/* Slices */}
                {WHEEL.map((seg, i) => {
                  const lp = labelPos(i)
                  const isHovered = hoveredSlice === i
                  return (
                    <div key={i}>
                      <Link
                        href={`/programs/${seg.slug}`}
                        style={{
                          position: 'absolute', inset: 0,
                          clipPath: `url(#prog-slice-${i})`,
                          transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1)',
                          transform: isHovered ? 'scale(1.035)' : 'scale(1)',
                          transformOrigin: `${CX}px ${CY}px`,
                          display: 'block', cursor: 'pointer',
                        }}
                        onMouseEnter={() => setHoveredSlice(i)}
                        onMouseLeave={() => setHoveredSlice(null)}
                      >
                        <Image src={seg.img} alt={seg.name} fill sizes="480px"
                          style={{ objectFit: 'cover', objectPosition: 'center' }} />
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: isHovered ? `${seg.color}80` : 'rgba(0,0,0,0.22)',
                          transition: 'background 280ms ease',
                        }} />
                      </Link>

                      {/* Slice label */}
                      <div style={{
                        position: 'absolute', left: lp.x, top: lp.y,
                        transform: 'translate(-50%,-50%)',
                        textAlign: 'center', pointerEvents: 'none', zIndex: 10,
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-jakarta, sans-serif)',
                          fontSize: isHovered ? 13 : 11, fontWeight: 800,
                          color: 'white', letterSpacing: '0.04em',
                          textShadow: '0 1px 8px rgba(0,0,0,0.75)',
                          whiteSpace: 'nowrap', display: 'block',
                          transition: 'font-size 200ms',
                        }}>{seg.name}</span>
                        {isHovered && (
                          <span style={{
                            fontFamily: 'var(--font-jakarta, sans-serif)',
                            fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.9)',
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                          }}>View →</span>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Ring overlay */}
                <svg width={SIZE} height={SIZE}
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 8 }}>
                  {WHEEL.map((_, i) => {
                    const angle = (i * 60 - 90) * Math.PI / 180
                    return (
                      <line key={i}
                        x1={CX + INNER * Math.cos(angle)} y1={CY + INNER * Math.sin(angle)}
                        x2={CX + R     * Math.cos(angle)} y2={CY + R     * Math.sin(angle)}
                        stroke="white" strokeWidth="3.5" />
                    )
                  })}
                  <circle cx={CX} cy={CY} r={R}     fill="none" stroke="#0102F1" strokeWidth="3" />
                  <circle cx={CX} cy={CY} r={INNER} fill="none" stroke="#0102F1" strokeWidth="2" />
                </svg>

                {/* Centre hub */}
                <div style={{
                  position: 'absolute', left: CX, top: CY,
                  transform: 'translate(-50%,-50%)',
                  width: INNER * 2 - 6, height: INNER * 2 - 6,
                  borderRadius: '50%', background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 12, boxShadow: '0 4px 20px rgba(1,2,241,0.18)',
                }}>
                  <Image src="/images/logo-blue.png" alt="CBI"
                    width={52} height={18}
                    style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxWidth: 52 }} />
                </div>

                {/* Hovered floating label */}
                {hoveredSlice !== null && (
                  <div style={{
                    position: 'absolute', bottom: -52, left: '50%',
                    transform: 'translateX(-50%)',
                    background: WHEEL[hoveredSlice].color, color: 'white',
                    borderRadius: 8, padding: '8px 20px',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
                    boxShadow: `0 8px 20px ${WHEEL[hoveredSlice].color}50`,
                    zIndex: 20, animation: 'fadeInUp 150ms ease both',
                  }}>
                    {WHEEL[hoveredSlice].name} — View Programme →
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateX(-50%) translateY(6px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0); }
          }

          .prog-hero-section  { padding: 88px 80px 100px; }
          .prog-hero-inner    { display: grid; grid-template-columns: 1fr 520px; gap: 72px; align-items: center; }
          .prog-hero-h1       { font-size: clamp(48px, 5.5vw, 84px); }
          .prog-hero-right    { display: flex; align-items: center; justify-content: center; }
          .new-areas-grid     { display: flex; flex-direction: column; gap: 14px; }

          /* Wheel scaling: outer sets layout box, inner scales content */
          .wheel-outer { width: 480px; height: 480px; position: relative; overflow: visible; }
          .wheel-inner { transform-origin: top left; }

          @media (max-width: 1280px) {
            .prog-hero-section { padding: 72px 48px 88px !important; }
            .prog-hero-inner   { grid-template-columns: 1fr 460px !important; gap: 48px !important; }
            .wheel-outer       { width: 400px !important; height: 400px !important; }
            .wheel-inner       { transform: scale(0.833) !important; }
          }
          @media (max-width: 1024px) {
            .prog-hero-inner   { grid-template-columns: 1fr 380px !important; gap: 36px !important; }
            .wheel-outer       { width: 340px !important; height: 340px !important; }
            .wheel-inner       { transform: scale(0.708) !important; }
            .prog-hero-section { padding: 64px 40px 80px !important; }
          }
          @media (max-width: 860px) {
            .prog-hero-inner   { grid-template-columns: 1fr !important; }
            .prog-hero-section { padding: 56px 32px 72px !important; }
            .prog-hero-right   { justify-content: center !important; margin-top: 16px; }
            .wheel-outer       { width: 420px !important; height: 420px !important; }
            .wheel-inner       { transform: scale(0.875) !important; }
          }
          @media (max-width: 520px) {
            .prog-hero-section { padding: 40px 16px 56px !important; }
            .wheel-outer       { width: 320px !important; height: 320px !important; }
            .wheel-inner       { transform: scale(0.667) !important; }
            .prog-hero-desc    { font-size: 14px !important; }
          }
          @media (max-width: 380px) {
            .wheel-outer { width: 280px !important; height: 280px !important; }
            .wheel-inner { transform: scale(0.583) !important; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════
          PROGRAMME SELECTOR
      ══════════════════════════════════════════════ */}
      <section id="all-programmes" className="prog-page-section" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Explore Each Area</span>
              <span style={{ display: 'block', width: 28, height: 1, background: '#ff8400' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(22px,2.4vw,32px)', fontWeight: 700,
              color: '#010278', letterSpacing: '-0.02em', margin: 0,
            }}>
              Our six <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 2 }}>integrated programmes.</em>
            </h2>
          </div>

          {/* Tab bar */}
          <div className="prog-tabs" style={{ display: 'flex', gap: 8, marginBottom: 48, overflowX: 'auto' }}>
            {PROGRAMS.map((pd, i) => (
              <button key={pd.slug} onClick={() => setActive(i)} style={{
                padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, fontWeight: 700,
                background: active === i ? pd.accentHex : 'white',
                color: active === i ? 'white' : '#64748b',
                boxShadow: active === i
                  ? `0 4px 14px ${pd.accentHex}44`
                  : '0 1px 4px rgba(1,2,241,0.08)',
                transition: 'all 180ms cubic-bezier(0.16,1,0.3,1)',
                whiteSpace: 'nowrap', flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ color: active === i ? 'white' : p.accentHex, display: 'flex' }}>
                  {ICON_MAP[pd.slug]}
                </span>
                {pd.name}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="prog-detail" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start',
          }}>
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: p.bgLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: p.accentHex,
                }}>
                  {ICON_MAP[p.slug]}
                </div>
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
                fontSize: 'clamp(22px, 2.5vw, 32px)',
                fontWeight: 700, color: '#000000',
                marginBottom: 14, letterSpacing: '-0.025em', lineHeight: 1.1,
              }}>{p.name}</h2>

              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 15.5, color: '#64748b', lineHeight: 1.78, marginBottom: 24,
              }}>{p.description}</p>

              <div style={{ marginBottom: 20 }}>
                <h4 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10,
                }}>Who It Serves</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {p.targetPopulation.slice(0, 5).map(pop => (
                    <span key={pop} style={{
                      padding: '5px 13px', borderRadius: 100,
                      background: p.bgLight, border: `1px solid ${p.accentHex}25`,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: 600, color: p.accentHex,
                    }}>{pop}</span>
                  ))}
                  {p.targetPopulation.length > 5 && (
                    <span style={{
                      padding: '5px 13px', borderRadius: 100, background: '#f1f5f9',
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: 600, color: '#64748b',
                    }}>+{p.targetPopulation.length - 5} more</span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <h4 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10,
                }}>Key Activities</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {p.keyActivities.slice(0, 6).map(a => (
                    <li key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                      <CheckCircle2 size={15} color={p.accentHex} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 14, color: '#374151', lineHeight: 1.55,
                      }}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-block',
                  background: p.bgLight, color: p.accentHex,
                  borderRadius: 100, padding: '10px 22px',
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

            {/* Right — image */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 20, overflow: 'hidden',
                height: 'clamp(300px, 40vw, 460px)',
                boxShadow: `0 24px 60px ${p.accentHex}20`,
                position: 'relative',
              }}>
                <Image src={p.heroImage} alt={p.name} fill sizes="640px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, ${p.accentHex}cc 0%, transparent 55%)`,
                }} />
                <div style={{
                  position: 'absolute', bottom: 20, left: 20, right: 20,
                  display: 'flex', gap: 10, flexWrap: 'wrap',
                }}>
                  {p.stats.map((s, i) => (
                    <div key={s.label} style={{
                      flex: 1, minWidth: 80, padding: '12px 14px',
                      background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 12, textAlign: 'center',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-space, monospace)',
                        fontSize: 'clamp(14px, 1.6vw, 20px)',
                        fontWeight: 700, color: i === 0 ? '#ff8400' : 'white', lineHeight: 1,
                      }}>{s.value}</div>
                      <div style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 10, fontWeight: 600,
                        color: 'rgba(255,255,255,0.7)', marginTop: 4,
                      }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 14 }}>
                {p.sdgs.map(sdg => (
                  <span key={sdg} style={{
                    padding: '5px 12px', borderRadius: 100,
                    background: p.bgLight, border: `1px solid ${p.accentHex}25`,
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
          .prog-tabs { scrollbar-width: none; -ms-overflow-style: none; flex-wrap: wrap; }
          .prog-tabs::-webkit-scrollbar { display: none; }
          @media (max-width: 1024px) {
            .prog-page-section { padding: 60px 40px !important; }
          }
          @media (max-width: 860px) {
            .prog-page-section { padding: 48px 24px !important; }
            .prog-detail { grid-template-columns: 1fr !important; gap: 32px !important; }
            .prog-tabs   { flex-wrap: nowrap !important; }
          }
          @media (max-width: 520px) {
            .prog-page-section { padding: 36px 16px !important; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════
          ALL PROGRAMMES grid
      ══════════════════════════════════════════════ */}
      <section className="all-progs-section" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
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
              fontWeight: 700, color: '#050c2e', letterSpacing: '-0.02em',
            }}>
              Explore each of our{' '}
              <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 2 }}>six programme areas.</em>
            </h2>
          </div>

          <div className="all-progs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {PROGRAMS.map(prog => (
              <Link key={prog.slug} href={`/programs/${prog.slug}`} style={{
                textDecoration: 'none', color: 'inherit',
                background: 'white', borderRadius: 18, overflow: 'hidden',
                border: '1px solid rgba(1,2,241,0.07)',
                boxShadow: '0 4px 20px rgba(1,2,241,0.05)',
                transition: 'all 280ms cubic-bezier(0.16,1,0.3,1)',
                display: 'block',
              }}>
                <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                  <Image src={prog.heroImage} alt={prog.name} fill sizes="400px"
                    style={{ objectFit: 'cover', objectPosition: 'center' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to top, ${prog.accentHex}cc 0%, transparent 60%)`,
                  }} />
                  {/* SVG icon badge */}
                  <div style={{
                    position: 'absolute', bottom: 14, left: 14,
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white',
                  }}>
                    {ICON_MAP[prog.slug]}
                  </div>
                  <span style={{
                    position: 'absolute', top: 14, right: 14,
                    background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    padding: '4px 12px', borderRadius: 100,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 700, color: 'white',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{prog.shortName}</span>
                </div>

                <div style={{ padding: '20px 22px 24px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontSize: 19, fontWeight: 700, color: '#050c2e',
                    marginBottom: 7, lineHeight: 1.2,
                  }}>{prog.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, color: '#64748b', lineHeight: 1.65, marginBottom: 16,
                  }}>{prog.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{
                      padding: '6px 13px', borderRadius: 100,
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
          .all-progs-section { padding: 80px 80px; }
          @media (max-width: 1024px) {
            .all-progs-section { padding: 60px 40px !important; }
            .all-progs-grid    { grid-template-columns: repeat(2,1fr) !important; }
          }
          @media (max-width: 640px) {
            .all-progs-section { padding: 48px 16px !important; }
            .all-progs-grid    { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <DonationCTA />
    </>
  )
}
