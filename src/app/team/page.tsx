'use client'

import Link from 'next/link'
import { Mail, ArrowRight, MapPin } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { EXECUTIVE, THEMATIC, DEPARTMENTAL } from '@/lib/team'
import type { TeamMember } from '@/lib/team'
import TeamAvatar from '@/components/ui/TeamAvatar'

/* ─────────────────────────────────────────────────────────────
   Shared card components
───────────────────────────────────────────────────────────── */

function ExecutiveCard({ p, i }: { p: TeamMember; i: number }) {
  return (
    <Link href={`/team/${p.slug}`} key={p.slug} style={{
      textDecoration: 'none', color: 'inherit',
      background: 'white', borderRadius: 16, overflow: 'hidden',
      border: '1px solid rgba(1,2,241,0.08)',
      transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
      animation: `fadeUp 700ms cubic-bezier(0.16,1,0.3,1) ${i * 120}ms both`,
      display: 'block', cursor: 'pointer',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-8px)'
        el.style.boxShadow = '0 24px 48px rgba(1,2,241,0.14)'
        el.style.borderColor = 'rgba(1,2,241,0.25)'
        const img = el.querySelector('img') as HTMLImageElement | null
        if (img) img.style.transform = 'scale(1.06)'
        const arrow = el.querySelector('.card-arrow') as HTMLElement | null
        if (arrow) arrow.style.transform = 'translateX(4px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'none'
        el.style.boxShadow = 'none'
        el.style.borderColor = 'rgba(1,2,241,0.08)'
        const img = el.querySelector('img') as HTMLImageElement | null
        if (img) img.style.transform = 'scale(1)'
        const arrow = el.querySelector('.card-arrow') as HTMLElement | null
        if (arrow) arrow.style.transform = 'none'
      }}>
      {/* Photo / Avatar */}
      <div style={{ height: 320, position: 'relative', overflow: 'hidden', background: '#f1f5f9' }}>
        <TeamAvatar
          photo={p.photo} name={p.name} avatarColor={p.accent}
          fill
          style={{ transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)' }}
        />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(1,2,120,0.82) 0%, transparent 52%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
          <span style={{
            background: '#0102F1', color: 'white',
            padding: '5px 14px', borderRadius: 100,
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>{p.role}</span>
        </div>
      </div>

      {/* Bio */}
      <div style={{ padding: 28 }}>
        <h3 style={{
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontSize: 20, fontWeight: 700, color: '#010278', marginBottom: 6,
        }}>{p.name}</h3>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14,
          fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 12, color: '#94a3b8',
        }}>
          <MapPin size={11} /> {p.location} · {p.yearsAtCBI} years at CBI
        </div>
        <p style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 13.5, color: '#64748b', lineHeight: 1.7, marginBottom: 20,
        }}>{p.shortBio || p.bio.slice(0, 140) + '…'}</p>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 16, borderTop: '1px solid rgba(1,2,241,0.07)',
        }}>
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 12, color: '#94a3b8',
          }}>{p.email}</span>
          <span className="card-arrow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 13, fontWeight: 700, color: '#0102F1',
            transition: 'transform 200ms',
          }}>View profile <ArrowRight size={14} /></span>
        </div>
      </div>
    </Link>
  )
}

function StaffCard({ p, i }: { p: TeamMember; i: number }) {
  return (
    <Link href={`/team/${p.slug}`} style={{
      textDecoration: 'none', color: 'inherit',
      background: 'white', borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(1,2,241,0.07)',
      transition: 'all 250ms cubic-bezier(0.16,1,0.3,1)',
      animation: `fadeUp 600ms cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both`,
      display: 'block', cursor: 'pointer',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 16px 32px rgba(1,2,241,0.10)'
        el.style.borderColor = 'rgba(1,2,241,0.18)'
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
      <div style={{ height: 210, position: 'relative', overflow: 'hidden', background: '#f1f5f9' }}>
        <TeamAvatar
          photo={p.photo} name={p.name} avatarColor={p.accent}
          fill
          style={{ transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)' }}
        />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(1,2,120,0.72) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 15, fontWeight: 700, color: '#010278', marginBottom: 4,
        }}>{p.name}</h3>
        <p style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 11, fontWeight: 700, color: '#0102F1',
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 0,
        }}>{p.role}</p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginTop: 14, paddingTop: 14,
          borderTop: '1px solid rgba(1,2,241,0.07)',
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 12, color: '#94a3b8',
        }}>
          <Mail size={12} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.email}</span>
        </div>
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section header
───────────────────────────────────────────────────────────── */
function SectionHeader({ label, title, emph }: { label: string; title: string; emph: string }) {
  return (
    <div style={{ marginBottom: 48, textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ display: 'block', width: 28, height: 1, background: '#ff8400' }} />
        <span style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#ff8400',
        }}>{label}</span>
        <span style={{ display: 'block', width: 28, height: 1, background: '#ff8400' }} />
      </div>
      <h2 style={{
        fontFamily: 'var(--font-playfair, Georgia, serif)',
        fontSize: 'clamp(20px, 2.4vw, 34px)', fontWeight: 700,
        color: '#010278', letterSpacing: '-0.025em', lineHeight: 1.1,
        margin: 0,
      }}>
        {title}{' '}
        <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>{emph}</em>
      </h2>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function TeamPage() {
  const total = EXECUTIVE.length + THEMATIC.length + DEPARTMENTAL.length
  return (
    <>
      <PageHero
        tag="Our Team"
        headline="The people behind"
        emph="the mission."
        sub={`${total} dedicated professionals driving positive change across Nigeria's most vulnerable communities.`}
      />

      {/* ── 1. Executive Team ── */}
      <section className="team-section team-exec" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader label="Executive" title="Executive" emph="Team." />
          <div className="exec-grid">
            {EXECUTIVE.map((p, i) => <ExecutiveCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── 2. Departmental Leaders ── */}
      <section className="team-section team-dept" style={{ background: 'white', borderTop: '1px solid rgba(1,2,241,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader label="Operations & Support" title="Departmental" emph="Leaders." />
          <div className="staff-grid">
            {DEPARTMENTAL.map((p, i) => <StaffCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── 3. Thematic Leaders ── */}
      <section className="team-section team-thematic" style={{ background: '#f8fafc', borderTop: '1px solid rgba(1,2,241,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader label="Programmes" title="Thematic" emph="Leaders." />
          <div className="staff-grid">
            {THEMATIC.map((p, i) => <StaffCard key={p.slug} p={p} i={i} />)}
          </div>

          <div style={{ marginTop: 56, textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 15, color: '#64748b', marginBottom: 16,
            }}>Interested in joining our team?</p>
            <Link href="/contact" style={{
              display: 'inline-block', padding: '14px 32px',
              background: '#0102F1', color: 'white',
              borderRadius: 8, fontSize: 14, fontWeight: 700,
              textDecoration: 'none',
              fontFamily: 'var(--font-jakarta, sans-serif)',
              transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 4px 12px rgba(1,2,241,0.20)',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#3335f3'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 24px rgba(1,2,241,0.28)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0102F1'; el.style.transform = 'none'; el.style.boxShadow = '0 4px 12px rgba(1,2,241,0.20)' }}
            >Get in Touch →</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .team-section { padding: 80px 80px; }
        .exec-grid  { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; max-width: 900px; margin: 0 auto; }
        .staff-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

        @media (max-width: 1200px) {
          .staff-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 1024px) {
          .team-section { padding: 64px 32px !important; }
        }
        @media (max-width: 860px) {
          .exec-grid  { grid-template-columns: 1fr !important; max-width: 480px !important; }
          .staff-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .team-section { padding: 48px 16px !important; }
          .staff-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
