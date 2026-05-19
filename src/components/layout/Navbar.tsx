'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, X, Menu } from 'lucide-react'

/* ── Real social links ── */
const SOCIALS = [
  {
    label: 'Facebook',
    href:  'https://web.facebook.com/profile.php?id=100083698905161',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href:  'https://x.com/BestInitiative',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/care-best-initiative-b03a32202/',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/carebestinitiative/',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

/* ── Rolling news items ── */
const NEWS = [
  '🟠 CBI reaches 1,500,000+ beneficiaries across 10 Nigerian states',
  '🔵 New WASH programme launched in 12 LGAs — Yobe & Borno States',
  '🟠 CBI partners with UNICEF on Education in Emergency — 900+ children back in school',
  '🔵 Medical outreach programme extended to Adamawa State — 2024',
  '🟠 Food Security programme supports 20,000+ households this quarter',
  '🔵 CBI is recruiting — view open positions on our Careers page',
]

const NAV = [
  { label: 'Home',        href: '/' },
  { label: 'About Us',    href: '/about', children: [
    { label: 'Our Story',        href: '/about' },
    { label: 'Our Team',         href: '/team' },
    { label: 'Mission & Values', href: '/about' },
  ]},
  { label: 'Programs',    href: '/programs', children: [
    { label: 'Education in Emergency', href: '/programs' },
    { label: 'Health & Primary Care',  href: '/programs' },
    { label: 'Nutrition',              href: '/programs' },
    { label: 'WASH',                   href: '/programs' },
    { label: 'Protection & GBV',       href: '/programs' },
    { label: 'Food Security',          href: '/programs' },
  ]},
  { label: 'Impact',      href: '/impact' },
  { label: 'Media',       href: '/blog', children: [
    { label: 'News & Stories', href: '/blog' },
    { label: 'Gallery',        href: '/gallery' },
    { label: 'Events',         href: '/events' },
    { label: 'Publications',   href: '/publications' },
  ]},
  { label: 'Contact',     href: '/contact' },
]

export default function Navbar() {
  const pathname  = usePathname()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [dropdown,  setDropdown]  = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setDropdown(null) }, [pathname])

  return (
    <>
      {/* ── Top info bar ──────────────────────────────────── */}
      <div className="top-bar" style={{
        background: '#010278',
        height: 36,
        display: 'flex', alignItems: 'center',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
      }}>
        <div className="top-bar-inner" style={{
          maxWidth: 1280, margin: '0 auto', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 80px', gap: 24,
        }}>

          {/* Left: LIVE label + rolling ticker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, overflow: 'hidden', minWidth: 0 }}>
            {/* LIVE pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
              background: '#ff8400', borderRadius: 3,
              padding: '2px 8px',
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%', background: 'white',
                animation: 'livePulse 1.8s ease-in-out infinite',
                display: 'inline-block',
              }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 9, fontWeight: 800, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'white',
              }}>LIVE</span>
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />

            {/* Ticker track */}
            <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
              <div className="ticker-track" style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap' }}>
                {/* Content duplicated for seamless loop */}
                {[0, 1].map(copy => (
                  <span key={copy} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
                    {NEWS.map((item, i) => (
                      <span key={i} style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.80)',
                        letterSpacing: '0.01em',
                        display: 'inline-flex', alignItems: 'center',
                      }}>
                        {item}
                        <span style={{ color: 'rgba(255,132,0,0.6)', margin: '0 20px', fontSize: 9 }}>◆</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: NGO tag + social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 9.5, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
              whiteSpace: 'nowrap',
            }}>NGO · Nigeria</span>

            <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.18)' }} />

            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 26, height: 26, borderRadius: 4,
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.06)',
                  transition: 'color 150ms, background 150ms',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = '#ff8400'
                  el.style.background = 'rgba(255,132,0,0.12)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'rgba(255,255,255,0.55)'
                  el.style.background = 'rgba(255,255,255,0.06)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main navbar ───────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 36, left: 0, right: 0, zIndex: 1000,
        height: 68,
        background: 'white',
        borderBottom: scrolled ? 'none' : '1px solid rgba(1,2,241,0.07)',
        boxShadow: scrolled ? '0 4px 32px rgba(1,2,120,0.10)' : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'box-shadow 250ms ease, border-color 250ms ease',
      }}>
        <div className="nav-inner" style={{
          maxWidth: 1280, margin: '0 auto', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image
              src="/images/logo-blue.png"
              alt="Care Best Initiative"
              width={140} height={44}
              style={{ objectFit: 'contain', height: 44, width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
            {NAV.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'))
              const open   = dropdown === link.label
              return (
                <div key={link.label}
                  style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={() => link.children && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link href={link.href} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '0 14px', height: '100%',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13.5, fontWeight: 500, letterSpacing: '0.005em',
                    color: active ? '#0102F1' : '#1a1a2e',
                    textDecoration: 'none',
                    position: 'relative',
                    transition: 'color 150ms',
                  }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#0102F1' }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#1a1a2e' }}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={12} style={{
                        opacity: 0.5,
                        transition: 'transform 200ms',
                        transform: open ? 'rotate(180deg)' : 'none',
                      }} />
                    )}
                    {/* Active underline */}
                    {active && (
                      <span style={{
                        position: 'absolute', bottom: 0, left: 14, right: 14,
                        height: 2, background: '#ff8400', borderRadius: '2px 2px 0 0',
                      }} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0,
                      background: 'white',
                      borderTop: '2px solid #ff8400',
                      borderRadius: '0 0 10px 10px',
                      boxShadow: '0 12px 48px rgba(1,2,120,0.13)',
                      minWidth: 210, padding: '6px 0',
                      opacity: open ? 1 : 0,
                      pointerEvents: open ? 'all' : 'none',
                      transform: open ? 'translateY(0)' : 'translateY(-8px)',
                      transition: 'opacity 180ms ease, transform 180ms ease',
                    }}>
                      {link.children.map((child, ci) => (
                        <Link key={child.label} href={child.href} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '9px 18px',
                          fontFamily: 'var(--font-jakarta, sans-serif)',
                          fontSize: 13, fontWeight: 400, color: '#2d2d3a',
                          textDecoration: 'none',
                          transition: 'all 130ms',
                          borderBottom: ci < link.children!.length - 1 ? '1px solid rgba(1,2,241,0.05)' : 'none',
                        }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = '#f5f5ff'
                            el.style.color = '#0102F1'
                            el.style.paddingLeft = '22px'
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = 'transparent'
                            el.style.color = '#2d2d3a'
                            el.style.paddingLeft = '18px'
                          }}
                        >
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff8400', flexShrink: 0 }} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right: Donate + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link href="/donate" className="nav-donate cbi-btn cbi-btn-nav-donate" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '9px 20px', borderRadius: 8,
              fontSize: 13, fontWeight: 700,
              textDecoration: 'none', letterSpacing: '0.02em',
              fontFamily: 'var(--font-jakarta, sans-serif)',
              background: 'linear-gradient(135deg, #ffb96b 0%, #ff8400 100%)',
              color: '#010278', border: 'none', boxShadow: '0 14px 36px rgba(255,132,0,0.18)',
              transition: 'transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 20px 48px rgba(255,132,0,0.28)'
                el.style.opacity = '0.98'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'none'
                el.style.boxShadow = '0 14px 36px rgba(255,132,0,0.18)'
                el.style.opacity = '1'
              }}
            >
              <span style={{ display: 'inline-block', animation: 'livePulse 2s ease-in-out infinite', fontSize: 14 }}>♥</span>
              Donate Now
            </Link>

            <button className="hamburger" onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}>
              {menuOpen ? <X size={22} color="#1a1a2e" /> : <Menu size={22} color="#1a1a2e" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, background: '#010278', zIndex: 1002,
        display: 'flex', flexDirection: 'column',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
        overflowY: 'auto',
      }}>
        <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
          <Image src="/images/logo-white.png" alt="CBI" width={110} height={40} style={{ objectFit: 'contain', height: 40, width: 'auto' }} />
          <button onClick={() => setMenuOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <X size={24} color="white" />
          </button>
        </div>

        <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', listStyle: 'none', padding: '0 32px', gap: 0 }}>
          {NAV.map((link, i) => (
            <li key={link.label} style={{ animation: menuOpen ? `mobileNavIn 400ms ease both` : 'none', animationDelay: `${i * 60}ms` }}>
              <Link href={link.href} onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontFamily: 'var(--font-playfair, sans-serif)',
                fontSize: 22, fontWeight: 700, color: 'white',
                padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none', letterSpacing: '-0.01em',
              }}>
                {link.label}
                <span style={{ color: '#ff8400', fontSize: 18 }}>→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ padding: '24px 32px', flexShrink: 0 }}>
          <Link href="/donate" onClick={() => setMenuOpen(false)} style={{
            display: 'block', textAlign: 'center', padding: '16px 0',
            background: '#ff8400', color: '#010278', borderRadius: 8,
            fontSize: 16, fontWeight: 700, textDecoration: 'none',
            fontFamily: 'var(--font-jakarta, sans-serif)',
          }}>♥ Donate Now</Link>
        </div>
      </div>

      {/* ── Spacer (top-bar + navbar) ─────────────────────── */}
      <div style={{ height: 104 }} aria-hidden="true" />

      <style>{`
        .top-bar     { display: flex; }
        .nav-inner   { padding: 0 80px; }
        .hamburger   { display: none !important; }

        /* News ticker */
        .ticker-track {
          animation: tickerScroll 42s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover { animation-play-state: paused; }

        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes mobileNavIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 1024px) {
          .nav-inner { padding: 0 32px !important; }
        }
        @media (max-width: 900px) {
          .top-bar    { display: none !important; }
          header      { top: 0 !important; }
          .spacer     { height: 68px !important; }
          .nav-links  { display: none !important; }
          .nav-donate { display: none !important; }
          .hamburger  { display: flex !important; }
          .nav-inner  { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}
