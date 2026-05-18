'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, X, Menu } from 'lucide-react'

const NAV = [
  { label: 'Home',     href: '/' },
  { label: 'Who We Are',    href: '/about',    children: [
    { label: 'Our History',      href: '/about' },
    { label: 'Our Team',         href: '/team' },
    { label: 'Mission & Values', href: '/about' },
  ]},
  { label: 'Our Programs', href: '/programs', children: [
    { label: 'Education in Emergency', href: '/programs' },
    { label: 'Health & Primary Care',  href: '/programs' },
    { label: 'Nutrition',              href: '/programs' },
    { label: 'WASH',                   href: '/programs' },
    { label: 'Protection & GBV',       href: '/programs' },
    { label: 'Food Security',          href: '/programs' },
  ]},
  { label: 'Impact',  href: '/impact' },
  { label: 'Media',   href: '/blog', children: [
    { label: 'News & Stories', href: '/blog' },
    { label: 'Gallery',        href: '/gallery' },
    { label: 'Events',         href: '/events' },
    { label: 'Publications',   href: '/publications' },
  ]},
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname   = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setDropdown(null) }, [pathname])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 72,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'white',
        boxShadow: scrolled ? '0 2px 24px rgba(1,2,241,0.13)' : '0 1px 0 rgba(1,2,241,0.08)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 220ms ease',
      }}>
        <div className="nav-inner" style={{
          maxWidth: 1280, margin: '0 auto', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image
              src="/images/cbi-logo.webp"
              alt="Care Best Initiative"
              width={130} height={44}
              style={{ objectFit: 'contain', height: 44, width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV.map(link => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/')
              const open   = dropdown === link.label
              return (
                <div key={link.label} style={{ position: 'relative' }}
                  onMouseEnter={() => link.children && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link href={link.href} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '8px 14px',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
                    color: active ? '#0102F1' : '#000000',
                    borderBottom: active ? '2px solid #ff8400' : '2px solid transparent',
                    transition: 'color 150ms',
                    textDecoration: 'none',
                  }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#0102F1' }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#000000' }}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={13} style={{
                        opacity: 0.45,
                        transition: 'transform 200ms',
                        transform: open ? 'rotate(180deg)' : 'none',
                      }} />
                    )}
                  </Link>

                  {link.children && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0,
                      background: 'white', borderRadius: 12,
                      boxShadow: '0 8px 40px rgba(1,2,241,0.14)',
                      border: '1px solid rgba(1,2,241,0.07)',
                      minWidth: 220, padding: '8px 0',
                      opacity: open ? 1 : 0,
                      pointerEvents: open ? 'all' : 'none',
                      transform: open ? 'translateY(4px)' : 'translateY(-6px)',
                      transition: 'all 180ms ease',
                    }}>
                      {link.children.map(child => (
                        <Link key={child.label} href={child.href} style={{
                          display: 'block', padding: '10px 18px',
                          fontFamily: 'var(--font-jakarta, sans-serif)',
                          fontSize: 14, fontWeight: 500,
                          color: '#000000', textDecoration: 'none',
                          transition: 'all 120ms',
                        }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = '#f8fafc'
                            el.style.color = '#0102F1'
                            el.style.paddingLeft = '22px'
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = 'transparent'
                            el.style.color = '#000000'
                            el.style.paddingLeft = '18px'
                          }}
                        >{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link href="/donate" className="nav-donate" style={{
              padding: '11px 24px', background: '#ff8400', color: '#010278',
              borderRadius: 8, fontSize: 14, fontWeight: 700,
              textDecoration: 'none', transition: 'all 150ms',
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-jakarta, sans-serif)',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#e07500'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#ff8400'
                el.style.transform = 'none'
              }}
            >Donate Now</Link>

            <button className="hamburger" onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}>
              {menuOpen ? <X size={22} color="#000000" /> : <Menu size={22} color="#000000" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div style={{
        position: 'fixed', inset: 0, background: 'white', zIndex: 999,
        display: 'flex', flexDirection: 'column', padding: '0 24px 40px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)',
        overflowY: 'auto',
      }}>
        <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <Image src="/images/cbi-logo.webp" alt="CBI" width={110} height={38} style={{ objectFit: 'contain' }} />
          <button onClick={() => setMenuOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <X size={24} color="#000000" />
          </button>
        </div>

        <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', listStyle: 'none', padding: 0, gap: 0 }}>
          {NAV.map(link => (
            <li key={link.label}>
              <Link href={link.href} onClick={() => setMenuOpen(false)} style={{
                display: 'block',
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 32, fontWeight: 700, color: '#000000',
                padding: '13px 0', borderBottom: '1px solid rgba(1,2,241,0.06)',
                textDecoration: 'none',
              }}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <Link href="/donate" onClick={() => setMenuOpen(false)} style={{
          display: 'block', textAlign: 'center', padding: 18,
          background: '#0102F1', color: 'white', borderRadius: 12,
          fontSize: 17, fontWeight: 700, textDecoration: 'none',
          fontFamily: 'var(--font-jakarta, sans-serif)',
        }}>Donate Now →</Link>
      </div>

      <div style={{ height: 72 }} aria-hidden="true" />

      <style>{`
        .nav-inner  { padding: 0 80px; }
        .hamburger  { display: none !important; }
        @media (max-width: 960px) {
          .nav-inner  { padding: 0 24px !important; }
          .nav-links  { display: none !important; }
          .nav-donate { display: none !important; }
          .hamburger  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
