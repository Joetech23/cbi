'use client'

import Link from 'next/link'
import { Megaphone, ArrowRight, CalendarClock } from 'lucide-react'

/**
 * Home-page announcement strip — Call for Volunteers.
 * Bold, attention-grabbing band placed right beneath the hero.
 */
export default function AnnouncementBanner() {
  return (
    <section className="annc" style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(120deg, #010278 0%, #0102F1 60%, #2a2cff 100%)',
    }}>
      {/* moving shimmer */}
      <div aria-hidden className="annc-shimmer" />

      <div className="annc-inner" style={{
        maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap',
      }}>
        {/* Left: label + headline */}
        <div className="annc-lead" style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
          <div className="annc-icon" style={{
            width: 46, height: 46, borderRadius: 12, flexShrink: 0,
            background: 'rgba(255,132,0,0.16)', border: '1px solid rgba(255,132,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Megaphone size={22} color="#ff8400" />
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span className="annc-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff8400', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10.5, fontWeight: 800, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Announcement · Now Recruiting</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(18px, 2.1vw, 26px)', fontWeight: 700,
              color: 'white', lineHeight: 1.15, letterSpacing: '-0.015em', margin: 0,
            }}>
              Call for Volunteers — <em style={{ fontStyle: 'italic', color: '#ff8400' }}>join the mission.</em>
            </h2>
            <div className="annc-deadline" style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 7 }}>
              <CalendarClock size={13} color="rgba(255,255,255,0.65)" />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
              }}>Applications close 7th July, 2026</span>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <Link href="/careers/volunteer" className="annc-btn" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0,
          padding: '14px 30px', background: '#ff8400', color: '#010278',
          borderRadius: 10, textDecoration: 'none',
          fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 14.5, fontWeight: 800,
          boxShadow: '0 8px 24px rgba(255,132,0,0.35)', transition: 'all 200ms',
        }}>
          Apply to Volunteer <ArrowRight size={17} />
        </Link>
      </div>

      <style>{`
        .annc { padding: 26px 80px; }
        .annc-shimmer {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.07) 50%, transparent 80%);
          background-size: 200% 100%;
          animation: anncShimmer 5s linear infinite;
        }
        .annc-dot { animation: anncPulse 1.6s ease-in-out infinite; }
        .annc-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(255,132,0,0.5) !important; }
        @keyframes anncShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        @keyframes anncPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.6); opacity: 0.5; }
        }
        @media (max-width: 900px) {
          .annc       { padding: 24px 32px; }
          .annc-inner { justify-content: center; text-align: left; }
        }
        @media (max-width: 620px) {
          .annc          { padding: 22px 20px; }
          .annc-lead     { gap: 14px; }
          .annc-icon     { width: 40px !important; height: 40px !important; }
          .annc-btn      { width: 100%; justify-content: center; }
          .annc-deadline { display: none !important; }
        }
      `}</style>
    </section>
  )
}
