'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'

const EASE = 'cubic-bezier(0.16,1,0.3,1)'
const SLIDE_DURATION = 7000

const SLIDES = [
  {
    img:       '/images/hero-woman.jpg',
    location:  'Borno · Field Program',
    eyebrow:   'Humanitarian Aid · Since 2019',
    lines:     ['Lifesaving care', "for Nigeria's most", 'vulnerable'],
    emph:      'communities.',
    lead:      "Healthcare, clean water, education, and protection — integrated programs reaching Nigeria's unreachable since 2019.",
    statNum:   '150K+',
    statLbl:   'Lives Reached',
  },
  {
    img:       '/images/programs/IMG_8929-health.jpg',
    location:  'Adamawa · Maternal Care',
    eyebrow:   'Health Programme · 10 States',
    lines:     ['Behind every', 'statistic is a', 'child waiting'],
    emph:      'for you.',
    lead:      'Every five seconds, a child somewhere in Nigeria needs urgent care. Our community health workers are there — even where there are no clinics.',
    statNum:   '45K+',
    statLbl:   'Consultations',
  },
  {
    img:       '/images/girl-water.jpg',
    location:  'Yobe · WASH Programme',
    eyebrow:   'Clean Water · 12 LGAs',
    lines:     ['We go where', "others don't.", 'Because someone'],
    emph:      'has to.',
    lead:      '8,000+ people now drink clean water from rehabilitated boreholes. No community should walk 5 kilometres for water — never again.',
    statNum:   '8,000+',
    statLbl:   'Clean Water Access',
  },
]

export default function Hero() {
  const [active, setActive]   = useState(0)
  const [mounted, setMounted] = useState(false)
  const [paused, setPaused]   = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(id)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive(a => (a + 1) % SLIDES.length), SLIDE_DURATION)
    return () => clearInterval(id)
  }, [paused, active])

  const go = useCallback((i: number) => setActive(i), [])
  const slide = SLIDES[active]

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        height: 'calc(100vh - 72px)',
        minHeight: 620,
        maxHeight: 920,
        overflow: 'hidden',
        background: '#010278',
      }}>

      {/* ── Layered full-bleed photos (crossfade + ken-burns) ── */}
      {SLIDES.map((s, i) => (
        <div key={i} aria-hidden={i !== active} style={{
          position: 'absolute', inset: 0,
          opacity: i === active ? 1 : 0,
          transition: `opacity 1400ms ${EASE}`,
        }}>
          <Image
            src={s.img} alt="" fill priority={i === 0} sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              transform: i === active && mounted ? 'scale(1.0)' : 'scale(1.08)',
              transition: `transform 10s ${EASE}`,
            }}
          />
        </div>
      ))}

      {/* ── Gradient overlays ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(105deg, rgba(1,2,120,0.82) 0%, rgba(1,2,120,0.55) 40%, rgba(1,2,120,0.25) 75%, rgba(1,2,120,0.65) 100%)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(1,2,120,0.35) 0%, transparent 25%, transparent 65%, rgba(1,2,120,0.85) 100%)',
      }} />

      {/* Subtle film grain */}
      <div aria-hidden="true" className="hero-grain" />

      {/* ── Content ── */}
      <div className="hero-content" style={{
        position: 'relative', zIndex: 3,
        height: '100%',
        maxWidth: 1440, margin: '0 auto',
        padding: '0 80px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 48,
        alignItems: 'end',
        paddingBottom: 96,
      }}>
        {/* ── LEFT: Headline block ── */}
        <div className="hero-left" style={{ maxWidth: 720 }}>

          {/* Location pill — animates per slide */}
          <div key={`loc-${active}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 14px',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 100, marginBottom: 24,
            animation: `heroFadeIn 700ms ${EASE}`,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#ff8400',
              boxShadow: '0 0 0 4px rgba(255,132,0,0.25)',
              animation: 'heroPulse 1.8s ease-out infinite',
            }} />
            <MapPin size={11} color="rgba(255,255,255,0.7)" />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.06em',
            }}>{slide.location}</span>
          </div>

          {/* Eyebrow rule */}
          <div key={`eb-${active}`} style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28,
            animation: `heroFadeIn 700ms ${EASE} 80ms both`,
          }}>
            <span style={{ display: 'block', width: 32, height: 1, background: '#ff8400' }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>{slide.eyebrow}</span>
          </div>

          {/* Headline — line-clip reveal */}
          <h1 key={`h-${active}`} className="hero-headline" style={{
            fontFamily: 'var(--font-playfair, sans-serif)',
            fontWeight: 900,
            fontSize: 'clamp(42px, 6.4vw, 96px)',
            lineHeight: 0.98, letterSpacing: '-0.035em',
            color: 'white', margin: 0,
            textShadow: '0 4px 24px rgba(0,0,0,0.25)',
          }}>
            {slide.lines.map((line, i) => (
              <span key={i} style={{ overflow: 'hidden', display: 'block' }}>
                <span style={{
                  display: 'block',
                  animation: `heroLineUp 800ms ${EASE} both`,
                  animationDelay: `${150 + i * 100}ms`,
                }}>{line}</span>
              </span>
            ))}
            <span style={{ overflow: 'hidden', display: 'block' }}>
              <span style={{
                display: 'block',
                animation: `heroLineUp 800ms ${EASE} both`,
                animationDelay: `${150 + slide.lines.length * 100}ms`,
              }}>
                <em style={{ fontStyle: 'italic', position: 'relative', display: 'inline' }}>
                  {slide.emph}
                  <span aria-hidden="true" style={{
                    position: 'absolute', bottom: 6, left: 0, right: 0,
                    height: 6, background: '#ff8400', borderRadius: 3, display: 'block',
                    boxShadow: '0 4px 16px rgba(255,132,0,0.5)',
                  }} />
                </em>
              </span>
            </span>
          </h1>

          {/* Lead */}
          <p key={`lead-${active}`} className="hero-lead" style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 17, lineHeight: 1.7,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: 540, marginTop: 32, marginBottom: 38,
            animation: `heroFadeIn 700ms ${EASE} 700ms both`,
          }}>
            {slide.lead}
          </p>

          {/* CTAs + inline mini-stat */}
          <div className="hero-cta-row" style={{
            display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(14px)',
            transition: `all 700ms ${EASE} 900ms`,
          }}>
            <Link href="/donate" className="hero-btn-gold" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '17px 36px',
              background: '#ff8400', color: '#010278',
              borderRadius: 8, fontSize: 15, fontWeight: 700,
              fontFamily: 'var(--font-jakarta, sans-serif)',
              transition: `all 250ms ${EASE}`,
              letterSpacing: '-0.01em', textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(255,132,0,0.35)',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#e07500'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 14px 36px rgba(255,132,0,0.55)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ff8400'; el.style.transform = 'none'; el.style.boxShadow = '0 8px 24px rgba(255,132,0,0.35)' }}
            >Donate Now <ArrowRight size={16} /></Link>

            <Link href="/programs" className="hero-btn-ghost" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '17px 32px',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'white',
              borderRadius: 8, fontSize: 15, fontWeight: 600,
              fontFamily: 'var(--font-jakarta, sans-serif)',
              transition: 'all 250ms', textDecoration: 'none',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.14)'; el.style.borderColor = 'rgba(255,255,255,0.55)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.06)'; el.style.borderColor = 'rgba(255,255,255,0.25)' }}
            >See Our Work</Link>

            {/* Inline mini-stat */}
            <div key={`stat-${active}`} className="hero-mini-stat" style={{
              display: 'flex', alignItems: 'center', gap: 14, marginLeft: 8,
              paddingLeft: 24, borderLeft: '1px solid rgba(255,255,255,0.18)',
              animation: `heroFadeIn 700ms ${EASE} 1100ms both`,
            }}>
              <div style={{
                fontFamily: 'var(--font-space, sans-serif)',
                fontSize: 32, fontWeight: 800, color: '#ff8400',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>{slide.statNum}</div>
              <div style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, lineHeight: 1.3,
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                maxWidth: 90,
              }}>{slide.statLbl}</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Thumbnail rail ── */}
        <div className="hero-thumbs" style={{
          display: 'flex', flexDirection: 'column', gap: 12,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateX(0)' : 'translateX(20px)',
          transition: `all 700ms ${EASE} 800ms`,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
          }}>
            <span style={{ width: 16, height: 1, background: 'rgba(255,132,0,0.7)' }} />
            From the Field
          </div>

          {SLIDES.map((s, i) => {
            const on = i === active
            return (
              <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}: ${s.location}`} style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', gap: 14,
                width: on ? 280 : 240, padding: 8,
                background: on ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: on ? '1px solid rgba(255,132,0,0.5)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, cursor: 'pointer',
                transition: `all 400ms ${EASE}`,
                textAlign: 'left',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 8,
                  position: 'relative', overflow: 'hidden', flexShrink: 0,
                }}>
                  <Image
                    src={s.img} alt=""
                    fill sizes="64px"
                    style={{
                      objectFit: 'cover',
                      transform: on ? 'scale(1.05)' : 'scale(1)',
                      transition: `transform 600ms ${EASE}`,
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 9, fontWeight: 700,
                    color: on ? '#ff8400' : 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    marginBottom: 4, transition: 'color 300ms',
                  }}>0{i + 1} · {s.location.split(' · ')[0]}</div>
                  <div style={{
                    fontFamily: 'var(--font-playfair, sans-serif)',
                    fontSize: 13, fontWeight: 700, lineHeight: 1.3,
                    color: on ? 'white' : 'rgba(255,255,255,0.65)',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    transition: 'color 300ms',
                  }}>{s.lines.join(' ')} {s.emph}</div>
                </div>

                {/* Progress bar on active */}
                {on && (
                  <span aria-hidden="true" style={{
                    position: 'absolute', bottom: -1, left: 8, right: 8, height: 2,
                    background: 'rgba(255,132,0,0.18)', borderRadius: 2, overflow: 'hidden',
                  }}>
                    <span style={{
                      display: 'block', height: '100%', background: '#ff8400',
                      transformOrigin: 'left',
                      animation: paused ? 'none' : `heroProgress ${SLIDE_DURATION}ms linear`,
                    }} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Bottom bar: counter + scroll cue ── */}
      <div className="hero-bottombar" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
        padding: '20px 80px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(8px)',
        transition: `all 700ms ${EASE} 1200ms`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontFamily: 'var(--font-space, sans-serif)',
            fontSize: 32, fontWeight: 800, color: 'white',
            lineHeight: 1, fontVariantNumeric: 'tabular-nums',
          }}>0{active + 1}</span>
          <div style={{
            width: 80, height: 1, background: 'rgba(255,255,255,0.2)',
            position: 'relative', overflow: 'hidden',
          }}>
            <span key={`bar-${active}`} style={{
              position: 'absolute', inset: 0,
              background: '#ff8400',
              transformOrigin: 'left',
              animation: paused ? 'none' : `heroProgress ${SLIDE_DURATION}ms linear`,
            }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-space, sans-serif)',
            fontSize: 14, fontWeight: 600,
            color: 'rgba(255,255,255,0.45)',
            fontVariantNumeric: 'tabular-nums',
          }}>0{SLIDES.length}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
          }}>Scroll</span>
          <span aria-hidden="true" style={{
            display: 'block', width: 1, height: 28,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
            animation: 'heroScrollLine 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes heroLineUp {
          from { opacity: 0; transform: translateY(108%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(255,132,0,0.25); }
          50%      { box-shadow: 0 0 0 9px rgba(255,132,0,0); }
        }
        @keyframes heroProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes heroScrollLine {
          0%   { transform: translateY(-12px); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateY(0);     opacity: 0; }
        }

        .hero-grain {
          position: absolute; inset: 0; z-index: 2;
          opacity: 0.06; pointer-events: none; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .hero-content    { padding: 0 48px !important; padding-bottom: 96px !important; }
          .hero-bottombar  { padding: 18px 48px !important; }
        }
        @media (max-width: 900px) {
          .hero-content    {
            grid-template-columns: 1fr !important;
            align-items: end !important;
            padding-bottom: 140px !important;
          }
          .hero-thumbs     { display: none !important; }
          .hero-headline   { font-size: clamp(38px, 9vw, 64px) !important; }
        }
        @media (max-width: 640px) {
          .hero-content    {
            padding: 0 24px !important;
            padding-bottom: 130px !important;
          }
          .hero-bottombar  { padding: 16px 24px !important; }
          .hero-headline   { font-size: clamp(34px, 10vw, 52px) !important; }
          .hero-lead       { font-size: 15px !important; margin-bottom: 28px !important; }
          .hero-cta-row    { gap: 12px !important; }
          .hero-cta-row a  { padding: 14px 22px !important; font-size: 14px !important; }
          .hero-mini-stat  {
            margin-left: 0 !important;
            padding-left: 0 !important;
            border-left: none !important;
            width: 100%;
            padding-top: 16px;
            border-top: 1px solid rgba(255,255,255,0.15);
          }
        }
      `}</style>
    </section>
  )
}
