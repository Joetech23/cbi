'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

/* ─────────────────────────────────────────────────────────────
   Office data  (all 7 field offices from the DOCX)
───────────────────────────────────────────────────────────── */
interface Office {
  id:       string
  label:    string
  type:     'HQ' | 'Field'
  state:    string
  address:  string
  email:    string
  phone:    string
  hours:    string
  /** pin position — % of the map image container */
  x: number
  y: number
}

const OFFICES: Office[] = [
  {
    id: 'abuja', label: 'Abuja', type: 'HQ', state: 'Federal Capital Territory',
    address: 'No. 139, Aero Gardens Estate, Kyami, Airport Road, Abuja',
    email: 'admin@cbi.ngo', phone: '+234 (0) 915 349 3317',
    hours: 'Mon – Fri · 8 AM – 5 PM WAT',
    x: 38, y: 60,
  },
  {
    id: 'borno', label: 'Maiduguri', type: 'Field', state: 'Borno State',
    address: 'Behind UN House, Pompomari By-pass, Maiduguri',
    email: 'borno@cbi.ngo', phone: '+234 (0) 915 469 2357',
    hours: 'Mon – Fri · 8 AM – 5 PM WAT',
    x: 81, y: 21,
  },
  {
    id: 'adamawa', label: 'Yola', type: 'Field', state: 'Adamawa State',
    address: 'No. 6, Opp. Dunamis Church, Bature, Yola North',
    email: 'adamawa@cbi.ngo', phone: '+234 (0) 915 469 2360',
    hours: 'Mon – Fri · 8 AM – 5 PM WAT',
    x: 71, y: 58,
  },
  {
    id: 'yobe', label: 'Damaturu', type: 'Field', state: 'Yobe State',
    address: 'Muhammad Buhari Way, DonEtiebet Ext., Behind Mai Riga\'s House, Damaturu',
    email: 'yobe@cbi.ngo', phone: '+234 (0) 915 469 2355',
    hours: 'Mon – Fri · 8 AM – 5 PM WAT',
    x: 67, y: 25,
  },
  {
    id: 'bauchi', label: 'Bauchi', type: 'Field', state: 'Bauchi State',
    address: 'No. 12 Dass Park, Behind Larema Hotel, Opp. Christ Embassy Church, New GRA, Bauchi',
    email: 'bauchi@cbi.ngo', phone: '+234 (0) 915 469 2348',
    hours: 'Mon – Fri · 8 AM – 5 PM WAT',
    x: 54, y: 39,
  },
  {
    id: 'zamfara', label: 'Gusau', type: 'Field', state: 'Zamfara State',
    address: 'White House, Behind Governor\'s House, GRA, Gusau, Zamfara',
    email: 'zamfara@cbi.ngo', phone: '+234 (0) 915 349 3300',
    hours: 'Mon – Fri · 8 AM – 5 PM WAT',
    x: 30, y: 22,
  },
  {
    id: 'sokoto', label: 'Sokoto', type: 'Field', state: 'Sokoto State',
    address: 'No. 31, Alero Road, Opp. Magistrate Court, Runji Sambo, Sokoto',
    email: 'sokoto@cbi.ngo', phone: '+234 (0) 915 349 3344',
    hours: 'Mon – Fri · 8 AM – 5 PM WAT',
    x: 14, y: 14,
  },
]

/* ─────────────────────────────────────────────────────────────
   Office detail card
───────────────────────────────────────────────────────────── */
function OfficeCard({ office, flip }: { office: Office; flip?: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 'calc(100% + 12px)',
      ...(flip ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' }),
      width: 280,
      background: 'white',
      borderRadius: 14,
      boxShadow: '0 16px 48px rgba(0,0,0,0.28), 0 2px 8px rgba(1,2,241,0.15)',
      overflow: 'hidden',
      zIndex: 30,
      animation: 'cardPop 200ms cubic-bezier(0.16,1,0.3,1) both',
    }}>
      {/* Header bar */}
      <div style={{
        background: office.type === 'HQ'
          ? 'linear-gradient(120deg, #0102F1 0%, #010278 100%)'
          : 'linear-gradient(120deg, #010278 0%, #0102F1 100%)',
        padding: '14px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 15, fontWeight: 800, color: 'white', letterSpacing: '-0.01em',
          }}>{office.label}</div>
          <div style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2,
          }}>{office.state}</div>
        </div>
        <span style={{
          background: office.type === 'HQ' ? '#ff8400' : 'rgba(255,255,255,0.15)',
          color: 'white', fontSize: 9, fontWeight: 800,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: 100,
          fontFamily: 'var(--font-jakarta, sans-serif)',
          border: office.type === 'HQ' ? 'none' : '1px solid rgba(255,255,255,0.25)',
        }}>{office.type === 'HQ' ? 'Head Office' : 'Field Office'}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Address */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 13, marginTop: 1, flexShrink: 0 }}>📍</span>
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 12.5, color: '#374151', lineHeight: 1.5,
          }}>{office.address}</span>
        </div>

        <div style={{ height: 1, background: '#f1f5f9' }} />

        {/* Email */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 12, flexShrink: 0 }}>✉️</span>
          <a
            href={`mailto:${office.email}`}
            style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 12.5, color: '#0102F1', fontWeight: 600,
              textDecoration: 'none',
              transition: 'color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
          >{office.email}</a>
        </div>

        {/* Phone */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 12, flexShrink: 0 }}>📞</span>
          <a
            href={`tel:${office.phone.replace(/[^\d+]/g, '')}`}
            style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 12.5, color: '#374151', fontWeight: 600,
              textDecoration: 'none',
              transition: 'color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0102F1' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#374151' }}
          >{office.phone}</a>
        </div>

        {/* Hours */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 12, flexShrink: 0 }}>🕐</span>
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 11.5, color: '#64748b',
          }}>{office.hours}</span>
        </div>
      </div>

      {/* Caret */}
      <div style={{
        position: 'absolute',
        bottom: -8, left: flip ? 'auto' : '50%',
        right: flip ? 16 : 'auto',
        transform: flip ? 'none' : 'translateX(-50%)',
        width: 16, height: 16,
        background: 'white',
        rotate: '45deg',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.08)',
        borderRadius: 2,
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────── */
export default function CbiMap() {
  const [active, setActive] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeOffice = OFFICES.find(o => o.id === active) ?? null

  return (
    <div style={{
      position: 'relative',
      borderRadius: 20,
      overflow: 'hidden',
      background: '#050c2e',
      boxShadow: '0 8px 48px rgba(1,2,241,0.18)',
    }}>

      {/* ── Top bar: LIVE indicator + title ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        background: 'linear-gradient(to bottom, rgba(5,12,46,0.98) 0%, transparent 100%)',
        padding: '18px 22px 36px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Title */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            {/* Live pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#e11d48', borderRadius: 100,
              padding: '3px 10px 3px 6px',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'white',
                display: 'inline-block',
                animation: 'livePulse 1.2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 9, fontWeight: 800, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'white',
              }}>LIVE</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            }}>Field Presence</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 18, fontWeight: 700, color: 'white',
            letterSpacing: '-0.02em', margin: 0,
          }}>CBI Across Nigeria</h3>
        </div>

        {/* Stats badge */}
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, padding: '8px 14px', textAlign: 'right',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 20, fontWeight: 800, color: '#ff8400', lineHeight: 1,
          }}>7</div>
          <div style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3,
          }}>Offices</div>
        </div>
      </div>

      {/* ── Top bar spacer so the absolute header sits above the map ── */}
      <div style={{ height: 90 }} />

      {/* ── Map image layer — aspect ratio locked to image (593 × 447) ── */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '593 / 447',
          cursor: 'crosshair',
        }}
        onMouseLeave={() => setActive(null)}
      >
        {/* Nigeria map image — tinted blue */}
        <Image
          src="/images/nigeria-map.png"
          alt="CBI Nigeria presence map"
          fill
          style={{
            objectFit: 'fill',
            opacity: 0.55,
            mixBlendMode: 'screen',
            filter: 'hue-rotate(180deg) saturate(1.6) brightness(1.1)',
          }}
        />

        {/* Subtle grid overlay */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(1,2,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(1,2,241,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }} />

        {/* Bottom gradient fade */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to top, #050c2e 0%, transparent 100%)',
          zIndex: 5,
        }} />

        {/* ── Office Pins ── */}
        {OFFICES.map((office) => {
          const isHQ     = office.type === 'HQ'
          const isActive = active === office.id
          // flip card if pin is on right half of map
          const flipCard = office.x > 60

          return (
            <div
              key={office.id}
              style={{
                position: 'absolute',
                left: `${office.x}%`,
                top: `${office.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 25 : 10,
                cursor: 'pointer',
              }}
              onMouseEnter={() => setActive(office.id)}
            >
              {/* Pulse rings */}
              <div style={{ position: 'relative', width: isHQ ? 14 : 10, height: isHQ ? 14 : 10 }}>

                {/* Ring 1 */}
                <div style={{
                  position: 'absolute', inset: '50%',
                  width: isHQ ? 26 : 20, height: isHQ ? 26 : 20,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  border: `1px solid ${isHQ ? '#ff8400' : '#ffffff'}`,
                  animation: 'ringPulse 2s ease-out infinite',
                  opacity: 0,
                  animationDelay: '0s',
                }} />

                {/* Ring 2 */}
                <div style={{
                  position: 'absolute', inset: '50%',
                  width: isHQ ? 26 : 20, height: isHQ ? 26 : 20,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  border: `1px solid ${isHQ ? '#ff8400' : '#ffffff'}`,
                  animation: 'ringPulse 2s ease-out infinite',
                  opacity: 0,
                  animationDelay: '0.7s',
                }} />

                {/* Ring 3 */}
                <div style={{
                  position: 'absolute', inset: '50%',
                  width: isHQ ? 26 : 20, height: isHQ ? 26 : 20,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  border: `1px solid ${isHQ ? '#ff8400' : '#ffffff'}`,
                  animation: 'ringPulse 2s ease-out infinite',
                  opacity: 0,
                  animationDelay: '1.4s',
                }} />

                {/* Glow under pin */}
                <div style={{
                  position: 'absolute', inset: '50%',
                  width: isHQ ? 18 : 13, height: isHQ ? 18 : 13,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: isHQ ? 'rgba(255,132,0,0.3)' : 'rgba(255,255,255,0.15)',
                  filter: 'blur(4px)',
                }} />

                {/* Pin dot */}
                <div style={{
                  position: 'absolute', inset: '50%',
                  width: isHQ ? 10 : 7, height: isHQ ? 10 : 7,
                  borderRadius: '50%',
                  background: isHQ ? '#ff8400' : 'white',
                  border: `1.5px solid ${isHQ ? '#fff' : 'rgba(255,255,255,0.4)'}`,
                  boxShadow: isHQ
                    ? '0 0 0 2px rgba(255,132,0,0.35), 0 2px 8px rgba(0,0,0,0.4)'
                    : '0 0 0 1.5px rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.35)',
                  transition: 'transform 180ms cubic-bezier(0.16,1,0.3,1)',
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.4 : 1})`,
                  zIndex: 2,
                }} />

                {/* Label below pin */}
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: `translateX(-50%) translateY(${isActive ? 4 : 2}px)`,
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: isHQ ? 8 : 7.5,
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: isHQ ? '#ff8400' : 'rgba(255,255,255,0.85)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                  marginTop: 4,
                  transition: 'opacity 150ms',
                  opacity: isActive ? 1 : 0.75,
                  zIndex: 2,
                }}>{isHQ ? `● ${office.label}` : office.label}</div>
              </div>

              {/* Hover card */}
              {isActive && <OfficeCard office={office} flip={flipCard} />}
            </div>
          )
        })}
      </div>

      {/* ── Bottom legend ── */}
      <div style={{
        padding: '12px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 8,
        background: 'rgba(5,12,46,0.92)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff8400', boxShadow: '0 0 0 3px rgba(255,132,0,0.25)' }} />
            <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Head Office</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', border: '1.5px solid rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Field Office</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 8, height: 8, background: '#1d4ed8', borderRadius: 2, opacity: 0.9 }} />
            <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>States of Presence</span>
          </div>
        </div>

        <span style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 10, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic',
        }}>Hover a pin to see office details</span>
      </div>

      {/* ── Global styles ── */}
      <style>{`
        @keyframes ringPulse {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.85); }
        }
        @keyframes cardPop {
          from { opacity: 0; transform: translateX(-50%) translateY(6px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1); }
        }
      `}</style>
    </div>
  )
}
