'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const EASE    = 'cubic-bezier(0.16,1,0.3,1)'
const DURATION = 6500

const SLIDES = [
  {
    img:          '/images/cbi-medical-outreach.jpg',
    imgPosition:  'center 35%',
    tag:          'Humanitarian Aid · Since 2019',
    line1:        'Reaching Lives,',
    line2:        'Restoring',
    emph:         'Dignity.',
    lead:         'Integrated healthcare, education, clean water and protection for Nigeria\'s most vulnerable — across 10 states.',
    stat:         { num: '1.5M+', lbl: 'Lives Reached' },
  },
  {
    img:          '/images/cbi-education-class.jpg',
    imgPosition:  'center 40%',
    tag:          'Education in Emergency · 900+ Children',
    line1:        'Every Child',
    line2:        'Deserves to',
    emph:         'Learn.',
    lead:         'Safe classrooms, trained teachers and school materials — keeping children learning through crisis and displacement.',
    stat:         { num: '900+', lbl: 'Children Back in School' },
  },
  {
    img:          '/images/cbi-mother-baby.jpg',
    imgPosition:  'center 25%',
    tag:          'Nutrition & Maternal Care · 8,000+ Treated',
    line1:        'Healthy Mothers.',
    line2:        'Thriving',
    emph:         'Children.',
    lead:         'Therapeutic feeding, growth monitoring and IYCF counselling — giving every mother and child under 5 a fighting chance.',
    stat:         { num: '8,000+', lbl: 'Children Treated' },
  },
]

export default function Hero() {
  const [active,   setActive]   = useState(0)
  const [prev,     setPrev]     = useState<number | null>(null)
  const [ready,    setReady]    = useState(false)
  const [paused,   setPaused]   = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef  = useRef<NodeJS.Timeout | null>(null)
  const progRef   = useRef<NodeJS.Timeout | null>(null)

  const go = useCallback((next: number) => {
    setPrev(active)
    setActive(next)
    setProgress(0)
  }, [active])

  const next = useCallback(() => go((active + 1) % SLIDES.length), [active, go])
  const prev_ = useCallback(() => go((active - 1 + SLIDES.length) % SLIDES.length), [active, go])

  // Mount
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(next, DURATION)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, next])

  // Progress bar
  useEffect(() => {
    setProgress(0)
    const step = 50
    const inc  = (step / DURATION) * 100
    progRef.current = setInterval(() => setProgress(p => Math.min(p + inc, 100)), step)
    return () => { if (progRef.current) clearInterval(progRef.current) }
  }, [active])

  const slide = SLIDES[active]

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', height: 'calc(100vh - 104px)', minHeight: 580, maxHeight: 860, overflow: 'hidden', background: '#010278' }}
    >
      {/* ── Background images (crossfade) ── */}
      {SLIDES.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === active ? 1 : 0,
          transition: 'opacity 1200ms ease',
          zIndex: 0,
        }}>
          <Image
            src={s.img} alt="" fill priority={i === 0} sizes="100vw"
            style={{
              objectFit: 'cover', objectPosition: s.imgPosition,
              transform: i === active && ready ? 'scale(1.04)' : 'scale(1.12)',
              transition: `transform ${DURATION}ms linear`,
              willChange: 'transform',
            }}
          />
        </div>
      ))}

      {/* ── Gradient overlay — heavier on left for text legibility ── */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(100deg, rgba(1,2,120,0.88) 0%, rgba(1,2,120,0.65) 42%, rgba(1,2,120,0.22) 70%, rgba(1,2,40,0.45) 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(1,2,120,0.80) 0%, transparent 35%)',
      }} />

      {/* ── Main content ── */}
      <div className="hero-wrap" style={{
        position: 'relative', zIndex: 2,
        height: '100%', maxWidth: 1280, margin: '0 auto',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        paddingBottom: 72,
      }}>

        {/* Text block */}
        <div className="hero-text" style={{ maxWidth: 660 }}>

          {/* Tag pill */}
          <div key={`tag-${active}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px', marginBottom: 22,
            background: 'rgba(255,132,0,0.15)',
            border: '1px solid rgba(255,132,0,0.45)',
            borderRadius: 4,
            animation: 'hFadeUp 600ms ease both',
          }}>
            <span className="anim-pulse-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff8400', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10.5, fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>{slide.tag}</span>
          </div>

          {/* Headline */}
          <h1 key={`h-${active}`} className="hero-h1" style={{
            fontFamily: 'var(--font-playfair, sans-serif)',
            fontSize: 'clamp(40px, 5.5vw, 76px)',
            fontWeight: 700, lineHeight: 1.0,
            letterSpacing: '-0.01em',
            color: 'white', margin: '0 0 22px',
            textShadow: '0 2px 24px rgba(0,0,0,0.25)',
          }}>
            <span style={{ display: 'block', animation: 'hFadeUp 650ms ease 80ms both' }}>{slide.line1}</span>
            <span style={{ display: 'block', animation: 'hFadeUp 650ms ease 160ms both' }}>
              {slide.line2}{' '}
              <em style={{
                fontStyle: 'italic', color: '#ff8400',
                borderBottom: '3px solid rgba(255,132,0,0.5)',
                paddingBottom: 2,
              }}>{slide.emph}</em>
            </span>
          </h1>

          {/* Lead */}
          <p key={`p-${active}`} style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            fontWeight: 400, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 32px', maxWidth: 500,
            animation: 'hFadeUp 650ms ease 240ms both',
          }}>{slide.lead}</p>

          {/* Buttons */}
          <div key={`b-${active}`} style={{
            display: 'flex', flexWrap: 'wrap', gap: 12,
            animation: 'hFadeUp 650ms ease 320ms both',
          }}>
            <Link href="/programs"
              className="cbi-btn cbi-btn-gold cbi-btn-pulse"
              style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontWeight: 700 }}
            >
              Our Programs <ArrowRight size={14} />
            </Link>

            <Link href="/about"
              className="cbi-btn cbi-btn-outline-white"
              style={{ fontFamily: 'var(--font-jakarta, sans-serif)' }}
            >
              About Us
            </Link>
          </div>
        </div>

        {/* ── Bottom bar: stat + controls + progress ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 48, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.12)',
        }}>

          {/* Stat */}
          <div key={`stat-${active}`} style={{ animation: 'hFadeUp 600ms ease 400ms both' }}>
            <div style={{
              fontFamily: 'var(--font-playfair, sans-serif)',
              fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700,
              color: '#ff8400', lineHeight: 1, letterSpacing: '-0.02em',
            }}>{slide.stat.num}</div>
            <div style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4,
            }}>{slide.stat.lbl}</div>
          </div>

          {/* Slide dots + arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: 6 }}>
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} style={{
                  border: 'none', cursor: 'pointer', padding: 0,
                  width: i === active ? 28 : 7, height: 7,
                  borderRadius: 4,
                  background: i === active ? '#ff8400' : 'rgba(255,255,255,0.3)',
                  transition: 'all 300ms ease',
                }} />
              ))}
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ fn: prev_, Icon: ArrowLeft, lbl: 'Previous' }, { fn: next, Icon: ArrowRight, lbl: 'Next' }].map(({ fn, Icon, lbl }) => (
                <button key={lbl} onClick={fn} aria-label={lbl} style={{
                  width: 38, height: 38, borderRadius: 5,
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'white',
                  transition: 'all 150ms ease',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = '#ff8400'
                    el.style.borderColor = '#ff8400'
                    el.style.color = '#010278'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.06)'
                    el.style.borderColor = 'rgba(255,255,255,0.25)'
                    el.style.color = 'white'
                  }}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.08)' }}>
          <div style={{
            height: '100%', background: '#ff8400',
            width: `${progress}%`,
            transition: 'width 50ms linear',
          }} />
        </div>
      </div>

      {/* ── Right side: vertical slide counter ── */}
      <div className="hero-counter" style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 3,
        width: 64,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 0,
        borderLeft: '1px solid rgba(255,255,255,0.07)',
      }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: '100%', flex: 1,
            border: 'none', background: i === active ? 'rgba(255,132,0,0.12)' : 'transparent',
            cursor: 'pointer',
            borderLeft: i === active ? '3px solid #ff8400' : '3px solid transparent',
            transition: 'all 250ms ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, fontWeight: 700, color: i === active ? '#ff8400' : 'rgba(255,255,255,0.3)',
              letterSpacing: '0.06em',
              transition: 'color 250ms ease',
            }}>0{i + 1}</span>
          </button>
        ))}
      </div>

      {/* ── Scroll-down indicator ── */}
      <div className="anim-bounce" style={{
        position: 'absolute', bottom: 28, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        cursor: 'pointer',
      }} onClick={() => { window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' }) }}>
        <span style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 9, fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
        }}>Scroll</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 7l5 5 5-5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        @keyframes hFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-wrap  { padding: 0 80px; }
        .hero-counter { display: flex; }

        @media (max-width: 900px) {
          .hero-wrap    { padding: 0 24px !important; padding-bottom: 56px !important; }
          .hero-counter { display: none !important; }
          section       { height: calc(100vh - 68px) !important; }
        }
        @media (max-width: 600px) {
          .hero-wrap    { padding: 0 20px !important; padding-bottom: 40px !important; }
          .hero-text    { max-width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
