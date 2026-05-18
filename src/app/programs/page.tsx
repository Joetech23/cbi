'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import DonationCTA from '@/components/sections/DonationCTA'

const PROG_DETAIL = [
  {
    key: 'Education', title: 'Education in Emergency',
    color: '#d8d8ff', tc: '#0102F1',
    img: '/images/programs/IMG_9278-education.jpg',
    impact: '12,000+ children enrolled',
    who: 'Out-of-school children ages 5–17 in conflict-affected communities.',
    acts: ['Temporary Learning Centres (TLCs)', 'Teacher training & recruitment', 'School supply distribution', 'Psychosocial support integration', 'Accelerated Education Programs'],
  },
  {
    key: 'Health', title: 'Health & Primary Care',
    color: '#dcfce7', tc: '#166534',
    img: '/images/programs/IMG_8929-health.jpg',
    impact: '45,000+ health consultations',
    who: 'Pregnant women, children under 5, and adults in underserved communities.',
    acts: ['Mobile health clinics', 'Maternal and newborn care', 'Immunization campaigns', 'Community health worker deployment', 'Primary health centre support'],
  },
  {
    key: 'Nutrition', title: 'Nutrition',
    color: '#fff3e0', tc: '#7a3d00',
    img: '/images/programs/IMG_9297-nutrition.jpg',
    impact: '8,000+ children treated',
    who: 'Children under 5, pregnant and lactating women, adolescent girls.',
    acts: ['CMAM — community-based management of acute malnutrition', 'Supplementary feeding programs', 'IYCF counseling', 'Growth monitoring', 'Nutrition-sensitive agriculture'],
  },
  {
    key: 'WASH', title: 'WASH',
    color: '#e0f2fe', tc: '#075985',
    img: '/images/cbi-wash-sanitizer.jpg',
    impact: '30,000+ with clean water access',
    who: 'Communities lacking safe water, schools, and health facilities.',
    acts: ['Borehole construction & rehabilitation', 'Hand pump installation', 'Latrine & sanitation facility construction', 'Hygiene promotion & CLTS', 'Water quality testing'],
  },
  {
    key: 'Protection', title: 'Protection & GBV',
    color: '#fce7f3', tc: '#9d174d',
    img: '/images/cbi-community-2.jpg',
    impact: '5,000+ protection cases managed',
    who: 'Women, girls, IDPs, and individuals at risk of GBV.',
    acts: ['Safe spaces for women and girls', 'GBV case management & referrals', 'Psychosocial support', 'Legal aid facilitation', 'Community awareness on SGBV'],
  },
  {
    key: 'Food', title: 'Food Security & Livelihoods',
    color: '#f0fdf4', tc: '#166534',
    img: '/images/cbi-mother-baby.jpg',
    impact: '20,000+ food-secure households',
    who: 'Food-insecure households, smallholder farmers, women-led households.',
    acts: ['Multi-purpose cash transfers', 'Agricultural input distribution', 'Vocational & livelihood training', 'Village savings & loans associations', 'Market systems development'],
  },
]

export default function ProgramsPage() {
  const [active, setActive] = useState(0)
  const p = PROG_DETAIL[active]

  return (
    <>
      <PageHero
        tag="Our Programs"
        headline="Six programs."
        emph="One mission."
        sub="Thousands of lives. One goal: leave no community behind."
      />

      <section className="prog-page-section" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Tabs — scrollable on mobile */}
          <div className="prog-tabs" style={{
            display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap',
            overflowX: 'auto',
          }}>
            {PROG_DETAIL.map((pd, i) => (
              <button key={pd.key} onClick={() => setActive(i)} style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, fontWeight: 700,
                background: active === i ? '#0102F1' : 'white',
                color: active === i ? 'white' : '#64748b',
                boxShadow: '0 1px 4px rgba(1,2,241,0.08)',
                transition: 'all 150ms', whiteSpace: 'nowrap', flexShrink: 0,
              }}>{pd.title}</button>
            ))}
          </div>

          {/* Detail */}
          <div className="prog-detail" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  background: p.color, color: p.tc,
                  border: `1px solid ${p.tc}44`,
                  borderRadius: 100, fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '6px 16px',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                }}>{p.key}</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 30, fontWeight: 700, color: '#000000',
                marginBottom: 20, letterSpacing: '-0.025em', lineHeight: 1.1,
              }}>{p.title}</h2>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 16, color: '#64748b', lineHeight: 1.78, marginBottom: 28,
              }}>
                CBI delivers evidence-based, community-centred interventions. This program reaches the most underserved — those other organizations cannot or do not reach.
              </p>

              <div style={{ marginBottom: 24 }}>
                <h4 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10,
                }}>Who It Serves</h4>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 15, color: '#000000', lineHeight: 1.7,
                }}>{p.who}</p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h4 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10,
                }}>Key Activities</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.acts.map(a => (
                    <li key={a} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff8400', flexShrink: 0 }} />
                      <span style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 15, color: '#64748b',
                      }}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <span style={{
                display: 'inline-block', background: '#d8d8ff', color: '#0102F1',
                borderRadius: 100, padding: '10px 24px',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 14, fontWeight: 700,
              }}>{p.impact}</span>
            </div>

            <div style={{
              borderRadius: 16, overflow: 'hidden', height: 460,
              boxShadow: '0 8px 40px rgba(1,2,241,0.12)',
              position: 'relative',
            }}>
              <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
          </div>
        </div>
        <style>{`
          .prog-page-section { padding: 80px 80px; }
          /* Hide scrollbar on mobile tab row */
          .prog-tabs::-webkit-scrollbar { display: none; }
          .prog-tabs { scrollbar-width: none; -ms-overflow-style: none; }
          @media (max-width: 900px) {
            .prog-page-section { padding: 48px 24px !important; }
            .prog-detail { grid-template-columns: 1fr !important; gap: 32px !important; }
            .prog-tabs   { flex-wrap: nowrap !important; }
          }
          @media (max-width: 520px) {
            .prog-page-section { padding: 36px 16px !important; }
          }
        `}</style>
      </section>

      <DonationCTA />
    </>
  )
}
