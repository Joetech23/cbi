'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const COLS: Record<string, string[]> = {
  'About Us':  ['Our Story', 'Mission & Vision', 'Our Team', 'Core Values', 'Annual Reports'],
  'Our Work':  ['Programs', 'Impact Stories', 'Publications', 'Gallery', 'Media'],
}

const SOCIALS = ['F', 'T', 'I', 'in']

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer style={{ background: '#010278', color: 'white' }}>
      <div className="footer-inner" style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1.6fr',
          gap: 48, marginBottom: 56,
        }}>
          {/* ── Brand ── */}
          <div>
            <Image
              src="/images/cbi-logo.webp"
              alt="Care Best Initiative"
              width={120} height={44}
              style={{ objectFit: 'contain', height: 44, width: 'auto', marginBottom: 20, filter: 'brightness(10) saturate(0)' }}
            />
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 14, color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75, marginBottom: 28, maxWidth: 270,
            }}>
              Reaching Nigeria&apos;s most vulnerable communities — one life at a time since 2019.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map(s => (
                <button key={s} style={{
                  width: 38, height: 38, borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  transition: 'all 150ms',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = '#ff8400'
                    el.style.color = '#010278'
                    el.style.borderColor = '#ff8400'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.05)'
                    el.style.color = 'rgba(255,255,255,0.55)'
                    el.style.borderColor = 'rgba(255,255,255,0.12)'
                  }}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* ── Link cols ── */}
          {Object.entries(COLS).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 18,
              }}>{heading}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {links.map(l => (
                  <li key={l}>
                    <button style={{
                      background: 'none', border: 'none',
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 14, color: 'rgba(255,255,255,0.6)',
                      cursor: 'pointer', padding: 0,
                      transition: 'color 150ms', textAlign: 'left',
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff8400'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'}
                    >{l}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Newsletter + Contact ── */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 12,
            }}>Stay Close to the Mission</h4>
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 16,
            }}>
              Impact stories, field reports, and updates. No spam.
            </p>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: '11px 14px', borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'white', fontSize: 13,
                  fontFamily: 'var(--font-jakarta, sans-serif)', outline: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = '#ff8400')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
              <button type="submit" style={{
                padding: '11px 16px', background: '#ff8400', color: '#010278',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
                whiteSpace: 'nowrap',
              }}>Join →</button>
            </form>

            <h4 style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 12,
            }}>Contact</h4>
            <div style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 2,
            }}>
              <div>info@cbi.ngo</div>
              <div>+234 (0) 800 000 0000</div>
              <div>Abuja, Federal Capital Territory, Nigeria</div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 12, color: 'rgba(255,255,255,0.28)',
          }}>
            © {new Date().getFullYear()} Care Best Initiative. All rights reserved. Registered NGO · Federal Republic of Nigeria.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
              <button key={l} style={{
                background: 'none', border: 'none',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 12, color: 'rgba(255,255,255,0.28)',
                cursor: 'pointer', padding: 0, transition: 'color 150ms',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.28)'}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-inner { padding: 72px 80px 40px; }
        .footer-grid  { grid-template-columns: 1.6fr 1fr 1fr 1.6fr !important; }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px)  {
          .footer-grid  { grid-template-columns: 1fr !important; gap: 36px !important; }
          .footer-inner { padding: 48px 20px 32px !important; }
        }
      `}</style>
    </footer>
  )
}
