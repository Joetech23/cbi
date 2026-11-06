'use client'

import { Download, Mail, FileText } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'

const COLORS: Record<string, string> = {
  'Newsletter':         '#0102F1',
  'Annual Report':      '#0102F1',
  'Assessment Report':  '#0891b2',
  'Situation Report':   '#be123c',
  'Learning Brief':     '#d97706',
  'Strategic Document': '#7c3aed',
}

interface Publication {
  type:  string
  title: string
  date:  string
  pages: string
  desc:  string
  /** Served from /public. Entries without a file are request-only. */
  file?: string
}

/* ── Monthly newsletters, newest first ── */
const NEWSLETTERS: Publication[] = [
  { type: 'Newsletter', title: 'CBI Newsletter — August 2026',    date: 'August 2026',    pages: '2 pages', file: '/publications/cbi-newsletter-august-2026.pdf',    desc: 'Programme highlights, field updates and community stories from across our operational states in August.' },
  { type: 'Newsletter', title: 'CBI Newsletter — July 2026',      date: 'July 2026',      pages: '2 pages', file: '/publications/cbi-newsletter-july-2026.pdf',      desc: 'Programme highlights, field updates and community stories from across our operational states in July.' },
  { type: 'Newsletter', title: 'CBI Newsletter — June 2026',      date: 'June 2026',      pages: '2 pages', file: '/publications/cbi-newsletter-june-2026.pdf',      desc: 'Programme highlights, field updates and community stories from across our operational states in June.' },
  { type: 'Newsletter', title: 'CBI Newsletter — May 2026',       date: 'May 2026',       pages: '2 pages', file: '/publications/cbi-newsletter-may-2026.pdf',       desc: 'Programme highlights, field updates and community stories from across our operational states in May.' },
  { type: 'Newsletter', title: 'CBI Newsletter — April 2026',     date: 'April 2026',     pages: '2 pages', file: '/publications/cbi-newsletter-april-2026.pdf',     desc: 'Programme highlights, field updates and community stories from across our operational states in April.' },
  { type: 'Newsletter', title: 'CBI Newsletter — March 2026',     date: 'March 2026',     pages: '2 pages', file: '/publications/cbi-newsletter-march-2026.pdf',     desc: 'Programme highlights, field updates and community stories from across our operational states in March.' },
  { type: 'Newsletter', title: 'CBI Newsletter — February 2026',  date: 'February 2026',  pages: '2 pages', file: '/publications/cbi-newsletter-february-2026.pdf',  desc: 'Programme highlights, field updates and community stories from across our operational states in February.' },
  { type: 'Newsletter', title: 'CBI Newsletter — January 2026',   date: 'January 2026',   pages: '1 page',  file: '/publications/cbi-newsletter-january-2026.pdf',   desc: 'Programme highlights, field updates and community stories from across our operational states in January.' },
]

/* ── Reports and briefs (available on request) ── */
const REPORTS: Publication[] = [
  { type: 'Annual Report',      title: 'CBI Annual Report 2024',                          date: 'March 2025',     pages: '52 pages', desc: 'A comprehensive review of CBI\'s programs, impact, finances, and strategic direction for 2024. Covers all six thematic areas across 10 states.' },
  { type: 'Assessment Report',  title: 'WASH Needs Assessment: North-East Nigeria 2024',  date: 'November 2024',  pages: '36 pages', desc: 'Field-level assessment of water, sanitation, and hygiene conditions across 8 LGAs in Borno and Adamawa states.' },
  { type: 'Situation Report',   title: 'Nutrition Situation Analysis: Yobe State 2024',   date: 'September 2024', pages: '28 pages', desc: 'Situational analysis of acute malnutrition prevalence and response capacity in Yobe State.' },
  { type: 'Learning Brief',     title: 'Education: Lessons from Borno',                   date: 'July 2024',      pages: '18 pages', desc: 'Key lessons and promising practices from CBI\'s education programs in conflict-affected communities, 2021–2024.' },
  { type: 'Strategic Document', title: 'CBI Strategic Plan 2023–2026',                    date: 'January 2023',   pages: '60 pages', desc: 'CBI\'s three-year strategic framework outlining vision, mission, programmatic priorities, and organisational development objectives.' },
]

const TOTAL = NEWSLETTERS.length + REPORTS.length

function PublicationCard({ p }: { p: Publication }) {
  const color = COLORS[p.type] || '#0102F1'
  const hasFile = Boolean(p.file)

  return (
    <article className="pub-card" style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr auto',
      gap: 28, alignItems: 'center', padding: 28,
      background: 'white', borderRadius: 14,
      border: '1px solid rgba(1,2,241,0.08)',
      borderLeft: '4px solid transparent',
      transition: 'all 220ms ease',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderLeftColor = color
        el.style.boxShadow = '0 10px 28px rgba(1,2,241,0.10)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderLeftColor = 'transparent'
        el.style.boxShadow = 'none'
        el.style.transform = 'none'
      }}>
      <div style={{
        width: 56, height: 56, borderRadius: 12,
        background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', flexShrink: 0,
      }}>
        <FileText size={22} />
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
          <span style={{
            background: `${color}10`, color, border: `1px solid ${color}30`,
            padding: '3px 12px', borderRadius: 100,
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            fontFamily: 'var(--font-jakarta, sans-serif)',
          }}>{p.type}</span>
          <span style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 12, color: '#94a3b8',
          }}>{p.date} · {p.pages}</span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-playfair, Georgia, serif)',
          fontSize: 19, fontWeight: 700, color: '#010278', marginBottom: 6,
        }}>{p.title}</h3>
        <p style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 13.5, color: '#64748b', lineHeight: 1.65,
        }}>{p.desc}</p>
      </div>

      {hasFile ? (
        <a
          href={p.file}
          target="_blank"
          rel="noopener noreferrer"
          className="pub-action"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 10,
            border: '2px solid rgba(1,2,241,0.15)',
            background: 'white', color: '#0102F1',
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            flexShrink: 0, whiteSpace: 'nowrap',
          }}
        >
          <Download size={14} /> Download
        </a>
      ) : (
        <a
          href={`mailto:info@cbi.ngo?subject=${encodeURIComponent('Publication request — ' + p.title)}`}
          className="pub-action pub-action-request"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 10,
            border: '2px solid rgba(1,2,241,0.12)',
            background: 'white', color: '#64748b',
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            flexShrink: 0, whiteSpace: 'nowrap',
          }}
        >
          <Mail size={14} /> Request a copy
        </a>
      )}
    </article>
  )
}

function SectionHeading({ label, title, count }: { label: string; title: string; count: number }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ display: 'block', width: 24, height: 2, background: '#ff8400', borderRadius: 2 }} />
        <span style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 10, fontWeight: 800, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#ff8400',
        }}>{label}</span>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-playfair, Georgia, serif)',
        fontSize: 'clamp(20px,2.4vw,28px)', fontWeight: 700,
        color: '#010278', letterSpacing: '-0.025em', margin: 0,
      }}>
        {title} <span style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 14, fontWeight: 600, color: '#94a3b8', letterSpacing: 0,
        }}>({count})</span>
      </h2>
    </div>
  )
}

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        tag="Publications"
        headline="Evidence-based"
        emph="knowledge."
        sub="Our newsletters, reports, assessments, and learning briefs — freely available for partners, researchers, and the humanitarian community."
      />

      <section className="pubs-section" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 13.5, color: '#64748b', marginBottom: 40,
          }}>{TOTAL} publications available</p>

          {/* ── Monthly newsletters ── */}
          <SectionHeading label="Monthly Updates" title="Newsletters" count={NEWSLETTERS.length} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 56 }}>
            {NEWSLETTERS.map(p => <PublicationCard key={p.title} p={p} />)}
          </div>

          {/* ── Reports and briefs ── */}
          <SectionHeading label="Research & Evidence" title="Reports & Briefs" count={REPORTS.length} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {REPORTS.map(p => <PublicationCard key={p.title} p={p} />)}
          </div>

          {/* Request CTA */}
          <div style={{
            marginTop: 48, padding: 36, borderRadius: 16,
            background: '#f8fafc', border: '1px solid rgba(1,2,241,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 24, flexWrap: 'wrap',
          }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 18, fontWeight: 700, color: '#010278', marginBottom: 4,
              }}>Need a specific report or raw data?</h3>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, color: '#64748b', lineHeight: 1.6, maxWidth: 480,
              }}>Research partners, journalists, and institutional donors can request additional publications from our MEAL team.</p>
            </div>
            <a href="mailto:info@cbi.ngo" style={{
              padding: '13px 28px', background: '#0102F1', color: 'white',
              borderRadius: 8, fontSize: 14, fontWeight: 700,
              textDecoration: 'none', fontFamily: 'var(--font-jakarta, sans-serif)',
              transition: 'all 150ms', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#3335f3'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0102F1'; el.style.transform = 'none' }}
            >Request a Report →</a>
          </div>
        </div>
        <style>{`
          .pubs-section { padding: 80px 80px; }
          .pub-action { transition: all 150ms; }
          .pub-action:hover { background: #0102F1 !important; color: white !important; border-color: #0102F1 !important; }
          .pub-action-request:hover { background: #64748b !important; border-color: #64748b !important; }
          @media (max-width: 768px) {
            .pubs-section { padding: 56px 24px !important; }
            .pub-card     { grid-template-columns: 1fr !important; }
            .pub-action   { justify-content: center; }
          }
        `}</style>
      </section>
    </>
  )
}
