'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, ArrowRight, MapPin } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { LEADERSHIP, STAFF } from '@/lib/team'

export default function TeamPage() {
  return (
    <>
      <PageHero
        tag="Our Team"
        headline="The people behind"
        emph="the mission."
        sub="Nine dedicated professionals driving positive change across Nigeria's most vulnerable communities."
      />

      {/* ── Leadership ── */}
      <section className="team-lead-section" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 52, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Leadership</span>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(28px,3.4vw,44px)', fontWeight: 800,
              color: '#010278', letterSpacing: '-0.025em', lineHeight: 1.1,
            }}>
              Executive <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>Team.</em>
            </h2>
          </div>

          <div className="lead-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
            {LEADERSHIP.map((p, i) => (
              <Link href={`/team/${p.slug}`} key={p.slug} style={{
                textDecoration: 'none', color: 'inherit',
                background: 'white', borderRadius: 16, overflow: 'hidden',
                border: '1px solid rgba(1,2,241,0.08)',
                transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
                animation: `leadFadeUp 700ms cubic-bezier(0.16,1,0.3,1) ${i * 120}ms both`,
                display: 'block', cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-8px)'
                  el.style.boxShadow = '0 24px 48px rgba(1,2,241,0.16)'
                  el.style.borderColor = 'rgba(255,132,0,0.4)'
                  const img = el.querySelector('img') as HTMLImageElement | null
                  if (img) img.style.transform = 'scale(1.08)'
                  const arrow = el.querySelector('.lead-arrow') as HTMLElement | null
                  if (arrow) { arrow.style.transform = 'translateX(4px)'; arrow.style.color = '#ff8400' }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'rgba(1,2,241,0.08)'
                  const img = el.querySelector('img') as HTMLImageElement | null
                  if (img) img.style.transform = 'scale(1)'
                  const arrow = el.querySelector('.lead-arrow') as HTMLElement | null
                  if (arrow) { arrow.style.transform = 'none'; arrow.style.color = '#0102F1' }
                }}>
                {/* Photo */}
                <div style={{ height: 320, position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                  <Image
                    src={p.photo} alt={p.name} fill
                    style={{
                      objectFit: 'cover', objectPosition: 'top center',
                      transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                  <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(1,2,120,0.85) 0%, transparent 50%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <span style={{
                      background: p.accent, color: 'white',
                      padding: '5px 14px', borderRadius: 100,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 10, fontWeight: 800,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                    }}>{p.role}</span>
                  </div>
                </div>

                {/* Bio */}
                <div style={{ padding: 28 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontSize: 22, fontWeight: 800, color: '#010278', marginBottom: 8,
                  }}>{p.name}</h3>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 12, color: '#94a3b8',
                  }}>
                    <MapPin size={11} /> {p.location} · {p.yearsAtCBI} years at CBI
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13.5, color: '#64748b', lineHeight: 1.7, marginBottom: 18,
                  }}>{p.shortBio || p.bio.slice(0, 140) + '…'}</p>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 18, borderTop: '1px solid rgba(1,2,241,0.07)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, color: '#94a3b8',
                    }}>{p.email}</span>
                    <span className="lead-arrow" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 13, fontWeight: 700, color: '#0102F1',
                      transition: 'all 220ms',
                    }}>
                      View profile <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes leadFadeUp {
            from { opacity: 0; transform: translateY(28px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .team-lead-section { padding: 80px 80px; }
          @media (max-width: 1024px) { .lead-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 700px)  {
            .team-lead-section { padding: 56px 24px !important; }
            .lead-grid         { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Staff grid ── */}
      <section className="team-staff-section" style={{ background: '#f8fafc', borderTop: '1px solid rgba(1,2,241,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Team</span>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(28px,3.2vw,40px)', fontWeight: 800,
              color: '#010278', letterSpacing: '-0.025em', lineHeight: 1.1,
            }}>
              Our <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>staff.</em>
            </h2>
          </div>

          <div className="staff-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
            {STAFF.map((p, i) => (
              <Link href={`/team/${p.slug}`} key={p.slug} style={{
                textDecoration: 'none', color: 'inherit',
                background: 'white', borderRadius: 14, overflow: 'hidden',
                border: '1px solid rgba(1,2,241,0.07)',
                transition: 'all 250ms cubic-bezier(0.16,1,0.3,1)',
                animation: `leadFadeUp 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both`,
                display: 'block', cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 16px 36px rgba(1,2,241,0.12)'
                  el.style.borderColor = 'rgba(255,132,0,0.35)'
                  const img = el.querySelector('img') as HTMLImageElement | null
                  if (img) img.style.transform = 'scale(1.06)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'rgba(1,2,241,0.07)'
                  const img = el.querySelector('img') as HTMLImageElement | null
                  if (img) img.style.transform = 'scale(1)'
                }}>
                <div style={{ height: 220, position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                  <Image
                    src={p.photo} alt={p.name} fill
                    style={{
                      objectFit: 'cover', objectPosition: 'top center',
                      transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                  <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(1,2,120,0.75) 0%, transparent 55%)',
                  }} />
                </div>

                <div style={{ padding: 22 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 16, fontWeight: 700, color: '#010278',
                  }}>{p.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, fontWeight: 700, color: p.accent,
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4,
                  }}>{p.role}</p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    marginTop: 14, paddingTop: 14,
                    borderTop: '1px solid rgba(1,2,241,0.07)',
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 12, color: '#94a3b8',
                  }}>
                    <Mail size={13} /> {p.email}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 56, textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 15, color: '#64748b', marginBottom: 16,
            }}>Interested in joining our team?</p>
            <Link href="/careers" style={{
              display: 'inline-block', padding: '14px 32px',
              background: '#0102F1', color: 'white',
              borderRadius: 8, fontSize: 14, fontWeight: 700,
              textDecoration: 'none',
              fontFamily: 'var(--font-jakarta, sans-serif)',
              transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 4px 12px rgba(1,2,241,0.2)',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#3335f3'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 24px rgba(1,2,241,0.3)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0102F1'; el.style.transform = 'none'; el.style.boxShadow = '0 4px 12px rgba(1,2,241,0.2)' }}
            >View Open Positions →</Link>
          </div>
        </div>
        <style>{`
          .team-staff-section { padding: 80px 80px; }
          @media (max-width: 1024px) { .staff-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 640px)  {
            .team-staff-section { padding: 56px 24px !important; }
            .staff-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  )
}
