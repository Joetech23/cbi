'use client'

import PageHero from '@/components/layout/PageHero'

const PAST_EVENTS = [
  { date: 'Dec 12, 2024', day: '12', month: 'DEC', title: 'UNICEF Nutrition Summit — Abuja',                       type: 'Conference',  desc: 'CBI presented field data from Borno nutrition programs to 200+ humanitarian leaders.' },
  { date: 'Oct 03, 2024', day: '03', month: 'OCT', title: 'World Mental Health Day — Community Outreach',          type: 'Field Event', desc: 'Free counseling and awareness sessions across 4 community centres in Maiduguri.' },
  { date: 'Sep 19, 2024', day: '19', month: 'SEP', title: 'Girl-Child Empowerment Launch — Yola',                  type: 'Launch',      desc: 'Training 300 adolescent girls in leadership, safety, and life skills.' },
  { date: 'Jul 24, 2024', day: '24', month: 'JUL', title: 'Annual Partner Roundtable — Sterling One Foundation',   type: 'Partnership', desc: 'Annual strategy session with 35+ implementing partners on 2024–2025 program priorities.' },
]

export default function EventsPage() {
  return (
    <>
      <PageHero
        tag="Events"
        headline="Where we convene"
        emph="and connect."
        sub="Past events, partner gatherings, and field convenings across Nigeria."
      />

      <section className="events-section" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>

          {/* Notice */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '18px 24px', borderRadius: 12,
            background: '#fff3e0', border: '1px solid #ff8400',
            marginBottom: 56,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: '#ff8400',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: '#010278', fontSize: 16, fontWeight: 700 }}>!</span>
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 14, fontWeight: 700, color: '#7a3d00',
              }}>No upcoming events scheduled.</h3>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, color: '#7a3d00', opacity: 0.85, marginTop: 2,
              }}>Subscribe to our newsletter to be notified when new events are announced.</p>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Past Events</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 700,
              color: '#010278', letterSpacing: '-0.025em',
            }}>Recent gatherings &amp; field events.</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PAST_EVENTS.map(e => (
              <article key={e.title} style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr auto',
                gap: 24, alignItems: 'center', padding: 22,
                background: '#f8fafc', borderRadius: 14,
                border: '1px solid rgba(1,2,241,0.07)',
                transition: 'all 200ms ease',
              }}
                onMouseEnter={ev => {
                  const el = ev.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,132,0,0.4)'
                  el.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={ev => {
                  const el = ev.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(1,2,241,0.07)'
                  el.style.transform = 'none'
                }}>
                <div style={{
                  width: 70, height: 70, borderRadius: 12,
                  background: 'white', border: '1px solid rgba(1,2,241,0.1)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-space, monospace)',
                    fontSize: 18, fontWeight: 700, color: '#010278', lineHeight: 1,
                  }}>{e.day}</div>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 9, fontWeight: 700, color: '#ff8400',
                    letterSpacing: '0.1em', marginTop: 4,
                  }}>{e.month}</div>
                </div>

                <div>
                  <span style={{
                    background: '#d8d8ff', color: '#0102F1',
                    padding: '3px 10px', borderRadius: 100,
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    display: 'inline-block', marginBottom: 8,
                  }}>{e.type}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 16, fontWeight: 700, color: '#010278', marginBottom: 4,
                  }}>{e.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, color: '#64748b', lineHeight: 1.6,
                  }}>{e.desc}</p>
                </div>

                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap',
                }}>{e.date}</span>
              </article>
            ))}
          </div>

          {/* Newsletter */}
          <div style={{
            marginTop: 56, padding: 32, borderRadius: 16,
            background: '#010278', textAlign: 'center',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8,
            }}>Be the first to know.</h3>
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 18,
            }}>Subscribe to our newsletter for event announcements.</p>
            <form onSubmit={e => e.preventDefault()} style={{
              display: 'inline-flex', gap: 8,
            }}>
              <input type="email" placeholder="your@email.com" style={{
                padding: '11px 16px', borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.07)', color: 'white',
                fontSize: 13, fontFamily: 'var(--font-jakarta, sans-serif)',
                outline: 'none', width: 260,
              }} />
              <button type="submit" style={{
                padding: '11px 20px', background: '#ff8400', color: '#010278',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
              }}>Subscribe →</button>
            </form>
          </div>
        </div>
        <style>{`.events-section{padding:80px 80px;}@media(max-width:768px){.events-section{padding:56px 24px!important;}}`}</style>
      </section>
    </>
  )
}
