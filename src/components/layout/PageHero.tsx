'use client'

const AFRICA_PATH = "M185,8 C205,3 228,8 245,18 C262,28 270,45 276,62 C282,79 286,98 292,116 C298,134 306,150 308,168 C310,186 306,204 301,221 C296,238 286,253 281,270 C276,287 279,306 273,322 C267,338 255,351 247,366 C239,381 234,398 225,411 C216,424 204,433 193,439 C182,445 171,443 161,437 C151,431 145,419 139,407 C133,395 129,381 128,367 C127,353 130,339 129,325 C128,311 122,298 121,284 C120,270 125,256 125,242 C125,228 119,214 120,200 C121,186 128,173 129,159 C130,145 125,131 127,117 C129,103 136,90 139,76 C142,62 139,48 144,35 C149,22 161,13 185,8 Z"

interface Props {
  tag: string
  headline: string
  emph: string
  sub?: string
}

export default function PageHero({ tag, headline, emph, sub }: Props) {
  return (
    <section className="page-hero" style={{ background: '#010278', position: 'relative', overflow: 'hidden' }}>
      <svg viewBox="0 0 460 560" aria-hidden="true" style={{
        position: 'absolute', right: -60, top: -40,
        width: 500, opacity: 0.04, pointerEvents: 'none',
      }}>
        <path d={AFRICA_PATH} fill="white" transform="scale(1.5) translate(-25,0)" />
      </svg>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#ff8400',
          }}>{tag}</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontWeight: 700,
          fontSize: 'clamp(28px,3.6vw,52px)',
          lineHeight: 1.06, letterSpacing: '-0.025em',
          color: 'white', maxWidth: 720, margin: 0,
        }}>
          {headline}<br />
          <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>{emph}</em>
        </h1>
        {sub && (
          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 17, color: 'rgba(255,255,255,0.65)',
            marginTop: 18, maxWidth: 560, lineHeight: 1.65,
          }}>{sub}</p>
        )}
      </div>

      <style>{`
        .page-hero { padding: 80px 80px 88px; }
        @media (max-width: 768px) { .page-hero { padding: 56px 24px 64px !important; } }
        @media (max-width: 520px) { .page-hero { padding: 44px 16px 52px !important; } }
      `}</style>
    </section>
  )
}
