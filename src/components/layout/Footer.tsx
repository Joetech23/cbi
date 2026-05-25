'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* ── Footer link columns ── */
const COLS = [
  {
    heading: 'Who We Are',
    links: [
      { label: 'About Us',         href: '/about' },
      { label: 'Mission & Vision', href: '/about#mission' },
      { label: 'Our Team',         href: '/team' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Health',                      href: '/programs/health' },
      { label: 'Nutrition',                   href: '/programs/nutrition' },
      { label: 'WASH',                        href: '/programs/wash' },
      { label: 'Protection',                  href: '/programs/protection' },
      { label: 'Food Security & Livelihoods', href: '/programs/food-security-livelihoods' },
      { label: 'Education',                   href: '/programs/education' },
    ],
  },
  {
    heading: 'Our Stories',
    links: [
      { label: 'News & Stories', href: '/blog' },
      { label: 'Gallery',        href: '/gallery' },
      { label: 'Events',         href: '/events' },
      { label: 'Publications',   href: '/publications' },
    ],
  },
  {
    heading: 'Get Involved',
    links: [
      { label: 'Our Impact', href: '/impact' },
      { label: 'Donate',     href: '/donate' },
      { label: 'Careers',    href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

const SOCIALS = [
  {
    label: 'Facebook',
    href:  'https://web.facebook.com/profile.php?id=100083698905161',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href:  'https://x.com/BestInitiative',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/care-best-initiative-b03a32202/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/carebestinitiative/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer style={{ background: '#010278', color: 'white' }}>
      <div className="footer-inner" style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div className="footer-grid">

          {/* ── Brand column ── */}
          <div>
            <Image
              src="/images/logo-white.png"
              alt="Care Best Initiative"
              width={160} height={56}
              style={{ objectFit: 'contain', height: 56, width: 'auto', marginBottom: 20 }}
            />
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 14, color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75, marginBottom: 20, maxWidth: 260,
            }}>
              Reaching Nigeria&apos;s most vulnerable communities — one life at a time since 2019.
            </p>

            {/* Newsletter mini-form */}
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 10,
            }}>Stay Updated</p>
            {subscribed ? (
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, color: '#ff8400',
              }}>✓ Thanks — you&apos;re on the list!</p>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true) }}
                style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  style={{
                    flex: 1, padding: '10px 12px', borderRadius: 7,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.07)',
                    color: 'white', fontSize: 12,
                    fontFamily: 'var(--font-jakarta, sans-serif)', outline: 'none',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#ff8400')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
                <button type="submit" style={{
                  padding: '10px 14px', background: '#ff8400', color: '#010278',
                  border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
                  whiteSpace: 'nowrap',
                }}>Join →</button>
              </form>
            )}

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all 150ms',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = '#ff8400'; el.style.color = '#010278'; el.style.borderColor = '#ff8400'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.05)'; el.style.color = 'rgba(255,255,255,0.55)'; el.style.borderColor = 'rgba(255,255,255,0.12)'
                  }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {COLS.map(col => (
            <div key={col.heading}>
              <h4 style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 18,
              }}>{col.heading}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 14, color: 'rgba(255,255,255,0.60)',
                      textDecoration: 'none', transition: 'color 150ms',
                      display: 'inline-block',
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff8400'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)'}
                    >{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Contact details ── */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 18,
            }}>Contact</h4>
            <div style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 2,
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <a href="mailto:info@cbi.ngo"
                style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff8400'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
              >✉ info@cbi.ngo</a>
              <a href="tel:+2349153493317"
                style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff8400'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
              >📞 +234 (0) 915 349 3317</a>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12.5 }}>
                📍 No. 139, Aero Gardens Estate,<br />Kyami, Airport Road, Abuja
              </span>
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
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Use',   href: '/terms' },
              { label: 'Sitemap',        href: '/sitemap.xml' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 12, color: 'rgba(255,255,255,0.28)',
                textDecoration: 'none', transition: 'color 150ms',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.28)'}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-inner { padding: 72px 80px 40px; }
        .footer-grid  {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 56px;
        }
        @media (max-width: 1200px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 1024px) {
          .footer-inner { padding: 56px 40px 32px; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 520px) {
          .footer-grid  { grid-template-columns: 1fr; gap: 28px; }
          .footer-inner { padding: 48px 20px 32px; }
        }
      `}</style>
    </footer>
  )
}
