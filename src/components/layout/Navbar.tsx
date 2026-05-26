'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, X, Menu } from 'lucide-react'

/* ── Social links ── */
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

/* ── 6-tab navigation structure ── */
const NAV = [
  { label: 'Home', href: '/' },

  { label: 'Who We Are', href: '/about', children: [
    { label: 'About Us',         href: '/about' },
    { label: 'Mission & Vision', href: '/about#mission' },
    { label: 'Our Team',         href: '/team' },
  ]},

  { label: 'What We Do', href: '/programs', children: [
    { label: 'Health',                      href: '/programs/health' },
    { label: 'Nutrition',                   href: '/programs/nutrition' },
    { label: 'WASH',                        href: '/programs/wash' },
    { label: 'Protection',                  href: '/programs/protection' },
    { label: 'Food Security & Livelihoods', href: '/programs/food-security-livelihoods' },
    { label: 'Education',                   href: '/programs/education' },
  ]},

  { label: 'How We Serve', href: '/blog', children: [
    { label: 'News & Stories',  href: '/blog' },
    { label: 'Gallery',         href: '/gallery' },
    { label: 'Events',          href: '/events' },
    { label: 'Publications',    href: '/publications' },
  ]},

  { label: 'Where We Work', href: '/impact', children: [
    { label: 'Our Impact',  href: '/impact' },
    { label: 'Our Reach',   href: '/contact' },
  ]},

  { label: 'Join Us', href: '/careers', children: [
    { label: 'Careers',     href: '/careers' },
    { label: 'Contact Us',  href: '/contact' },
    { label: 'Donate',      href: '/donate' },
  ]},
]

export default function Navbar() {
  const pathname  = usePathname()
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [dropdown,       setDropdown]       = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false)
    setDropdown(null)
    setMobileExpanded(null)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function closeMobile() {
    setMenuOpen(false)
    setMobileExpanded(null)
  }

  return (
    <>
      {/* ── Main navbar ───────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 68, background: 'white',
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
            <Image src="/images/logo-blue.png" alt="Care Best Initiative"
              width={140} height={44}
              style={{ objectFit: 'contain', height: 44, width: 'auto' }} priority />
          </Link>

          {/* Desktop nav */}
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
                    fontSize: 13.5, fontWeight: 500,
                    color: active ? '#0102F1' : '#1a1a2e',
                    textDecoration: 'none', position: 'relative', transition: 'color 150ms',
                  }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#0102F1' }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#1a1a2e' }}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={12} style={{
                        opacity: 0.5, transition: 'transform 200ms',
                        transform: open ? 'rotate(180deg)' : 'none',
                      }} />
                    )}
                    {active && (
                      <span style={{
                        position: 'absolute', bottom: 0, left: 14, right: 14,
                        height: 2, background: '#ff8400', borderRadius: '2px 2px 0 0',
                      }} />
                    )}
                  </Link>

                  {/* Desktop dropdown */}
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
                          textDecoration: 'none', transition: 'all 130ms',
                          borderBottom: ci < link.children!.length - 1 ? '1px solid rgba(1,2,241,0.05)' : 'none',
                        }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = '#f5f5ff'; el.style.color = '#0102F1'; el.style.paddingLeft = '22px'
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = 'transparent'; el.style.color = '#2d2d3a'; el.style.paddingLeft = '18px'
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
            <Link href="/donate" className="nav-donate" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '9px 20px', borderRadius: 8,
              fontSize: 13, fontWeight: 700, textDecoration: 'none',
              fontFamily: 'var(--font-jakarta, sans-serif)',
              background: 'linear-gradient(135deg, #ffb96b 0%, #ff8400 100%)',
              color: '#010278', border: 'none',
              boxShadow: '0 14px 36px rgba(255,132,0,0.18)',
              transition: 'transform 160ms ease, box-shadow 160ms ease',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 20px 48px rgba(255,132,0,0.28)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 14px 36px rgba(255,132,0,0.18)' }}
            >
              <span style={{ animation: 'livePulse 2s ease-in-out infinite', fontSize: 14 }}>♥</span>
              Donate Now
            </Link>

            <button className="hamburger" onClick={() => { setMenuOpen(o => !o); setMobileExpanded(null) }}
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
        {/* Mobile header */}
        <div style={{
          height: 72, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 24px', flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <Image src="/images/logo-white.png" alt="CBI" width={110} height={40}
            style={{ objectFit: 'contain', height: 40, width: 'auto' }} />
          <button onClick={closeMobile}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <X size={24} color="white" />
          </button>
        </div>

        {/* Mobile nav items */}
        <ul style={{ flex: 1, listStyle: 'none', padding: '8px 0', margin: 0, overflowY: 'auto' }}>
          {NAV.map((link, i) => {
            const isExpanded = mobileExpanded === link.label
            const hasChildren = Boolean(link.children)

            return (
              <li key={link.label} style={{
                animation: menuOpen ? 'mobileNavIn 350ms ease both' : 'none',
                animationDelay: `${i * 55}ms`,
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                {/* Parent row */}
                {hasChildren ? (
                  // Tappable parent — toggles children (no navigation on tap)
                  <button
                    onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-playfair, sans-serif)',
                      fontSize: 22, fontWeight: 700, color: 'white',
                      padding: '18px 28px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {link.label}
                    <ChevronDown size={18} color="rgba(255,255,255,0.5)" style={{
                      transition: 'transform 250ms',
                      transform: isExpanded ? 'rotate(180deg)' : 'none',
                    }} />
                  </button>
                ) : (
                  <Link href={link.href} onClick={closeMobile} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'var(--font-playfair, sans-serif)',
                    fontSize: 22, fontWeight: 700, color: 'white',
                    padding: '18px 28px', textDecoration: 'none',
                  }}>
                    {link.label}
                    <span style={{ color: '#ff8400', fontSize: 18 }}>→</span>
                  </Link>
                )}

                {/* Children (accordion) */}
                {hasChildren && (
                  <div style={{
                    maxHeight: isExpanded ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 300ms cubic-bezier(0.16,1,0.3,1)',
                    background: 'rgba(0,0,0,0.25)',
                  }}>
                    {/* "View all" link for the parent page */}
                    <Link href={link.href} onClick={closeMobile} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 28px 12px 40px',
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 13, color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <span style={{ fontSize: 10 }}>↗</span>
                      View all {link.label}
                    </Link>

                    {link.children!.map(child => (
                      <Link key={child.label} href={child.href} onClick={closeMobile} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '13px 28px 13px 40px',
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff8400', flexShrink: 0 }} />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {/* Mobile footer: Donate */}
        <div style={{ padding: '20px 24px 28px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/donate" onClick={closeMobile} style={{
            display: 'block', textAlign: 'center', padding: '16px 0',
            background: '#ff8400', color: '#010278', borderRadius: 10,
            fontSize: 16, fontWeight: 700, textDecoration: 'none',
            fontFamily: 'var(--font-jakarta, sans-serif)',
          }}>♥ Donate Now</Link>
        </div>
      </div>

      {/* ── Spacer ─────────────────────────────────────────── */}
      <div style={{ height: 68 }} aria-hidden="true" />

      <style>{`
        .nav-inner  { padding: 0 80px; }
        .hamburger  { display: none !important; }

        @keyframes mobileNavIn {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 1024px) {
          .nav-inner { padding: 0 32px !important; }
        }
        @media (max-width: 900px) {
          .nav-links  { display: none !important; }
          .nav-donate { display: none !important; }
          .hamburger  { display: flex !important; }
          .nav-inner  { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}
