'use client'

import type React from 'react'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import ImpactNumbers from '@/components/sections/ImpactNumbers'
import DonationCTA from '@/components/sections/DonationCTA'
import { useStagger, useReveal } from '@/lib/reveal'

const VALUE_ICONS: Record<string, React.ReactNode> = {
  'Service In Love': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  'Teamwork': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  'Excellence': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  'Transparency': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  'Equity': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
}

const VALUES = [
  { title: 'Service In Love',  desc: 'Our services are motivated by genuine interest and empathy.' },
  { title: 'Teamwork',         desc: 'We collaborate seamlessly, leveraging diverse skills and perspectives to achieve common goals.' },
  { title: 'Excellence',        desc: 'We maintain the highest standards of conduct, competence, and integrity in all our interactions and operations.' },
  { title: 'Transparency',     desc: 'We uphold openness and honesty in our actions, fostering trust and accountability within our organization and with stakeholders.' },
  { title: 'Equity',           desc: 'We strive for fairness and equality in all our endeavours, ensuring everyone has access to opportunities and resources.' },
]

const PILLS = [
  {
    tag: 'Our Mission',
    title: 'Why We Exist',
    text: 'To deliver humanitarian aid, drive sustainable development and empower vulnerable communities through community-based, inclusive and innovative programs globally',
    accent: '#0102F1',
  },
  {
    tag: 'Our Vision',
    title: "Where We're Going",
    text: 'A world where everyone thrives with dignity, equity and resilience',
    accent: '#ff8400',
  },
]

export default function AboutPage() {
  const pills    = useStagger(140, 24)
  const values   = useStagger(80, 24)
  const photoRev = useReveal()
  const intro    = useReveal()
  return (
    <>
      <PageHero
        tag="About CBI"
        headline="A Women-led and Youth-driven Non-Governmental and"
        emph="Not-for-Profit Organization."
      />

      {/* About CBI intro */}
      <section className="about-intro" style={{ background: 'white' }}>
        <div
          ref={intro.ref}
          style={{
            maxWidth: 920, margin: '0 auto',
            opacity: intro.visible ? 1 : 0,
            transform: intro.visible ? 'none' : 'translateY(20px)',
            transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            <span style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#ff8400',
            }}>About CBI</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 16.5, color: '#475569', lineHeight: 1.82,
            }}>
              CBI was founded in 2019 and presently operational across 10 states with a readiness to expand its reach. We are passionate about saving lives and elevating the suffering of children, youth, women, and other vulnerable people, as well as maintaining human dignity and supporting the resilience of individuals and communities affected by crisis, poverty and inequality.
            </p>
          </div>

          {/* Strategic Objectives */}
          <div style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Strategic Objectives</span>
            </div>
            <div className="objectives-grid">
              {[
                {
                  title: 'Delivery Of Humanitarian Aid',
                  desc:  'To deliver multisectoral life-saving assistance, shelter, food, water, and healthcare to vulnerable individuals.',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  ),
                },
                {
                  title: 'Human Capital Development',
                  desc:  'To build skills, knowledge and capacities of the most vulnerable.',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  ),
                },
                {
                  title: 'System Strengthening',
                  desc:  'To enhance institutional capacities, governance and infrastructure to empower the vulnerable.',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0102F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
                    </svg>
                  ),
                },
              ].map((obj, i) => (
                <div key={i} style={{
                  padding: '24px 28px',
                  background: 'white',
                  borderRadius: 12,
                  border: '1px solid rgba(1,2,241,0.08)',
                  borderLeft: '4px solid #0102F1',
                  display: 'flex', flexDirection: 'column', gap: 10,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(1,2,241,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>{obj.icon}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 14, fontWeight: 700, color: '#010278',
                    margin: 0,
                  }}>{obj.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13.5, color: '#64748b', lineHeight: 1.7,
                    margin: 0,
                  }}>{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stat ribbon */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 0,
            marginTop: 40,
            background: '#f8fafc',
            borderRadius: 14,
            border: '1px solid rgba(1,2,241,0.07)',
            overflow: 'hidden',
          }}>
            {[
              { num: '2019',       label: 'Founded' },
              { num: '7+',         label: 'States of Presence' },
              { num: '1.5M+',      label: 'Lives Reached' },
              { num: 'Women-led',  label: 'Leadership' },
            ].map((s, i, a) => (
              <div key={s.label} style={{
                flex: '1 1 200px',
                padding: '20px 24px',
                borderRight: i < a.length - 1 ? '1px solid rgba(1,2,241,0.07)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-playfair, Georgia, serif)',
                  fontSize: 24, fontWeight: 700, color: '#0102F1',
                  letterSpacing: '-0.02em', marginBottom: 4,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: '#64748b',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .about-intro { padding: 80px 80px 56px; }
          .objectives-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          @media (max-width: 768px) {
            .about-intro { padding: 56px 24px 40px !important; }
            .objectives-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 520px) {
            .about-intro { padding: 40px 16px 32px !important; }
          }
        `}</style>
      </section>

      {/* Mission + Vision */}
      <section id="mission" className="about-mv" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div ref={pills.ref} className="mv-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {PILLS.map((c, i) => (
              <div key={c.tag} style={{
                padding: 40, background: '#f8fafc', borderRadius: 16,
                borderLeft: `5px solid ${c.accent}`,
                border: '1px solid rgba(1,2,241,0.07)',
                borderLeftColor: c.accent, borderLeftWidth: 5,
                ...pills.style(i),
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
                  <span style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#ff8400',
                  }}>{c.tag}</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-playfair, Georgia, serif)',
                  fontSize: 24, fontWeight: 700, color: '#000000',
                  marginBottom: 16, letterSpacing: '-0.02em',
                }}>{c.title}</h2>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 16, color: '#64748b', lineHeight: 1.78,
                }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .about-mv { padding: 40px 80px 80px; scroll-margin-top: 120px; }
          @media (max-width: 768px) {
            .about-mv { padding: 56px 24px !important; }
            .mv-grid  { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 520px) {
            .about-mv { padding: 40px 16px !important; }
            .mv-grid > div { padding: 28px !important; }
          }
        `}</style>
      </section>

      {/* Photo + tagline */}
      <section ref={photoRev.ref} style={{ background: '#010278', position: 'relative', overflow: 'hidden' }}>
        <div className="about-photo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Left panel — white logo on navy */}
          <div style={{
            height: 440, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.04)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            opacity: photoRev.visible ? 1 : 0,
            transform: photoRev.visible ? 'none' : 'translateX(-32px)',
            transition: 'all 900ms cubic-bezier(0.16,1,0.3,1)',
          }}>
            <Image
              src="/images/logo-white.png"
              alt="Care Best Initiative"
              width={240}
              height={80}
              className="logo-roll-breathe"
              style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxWidth: 240 }}
            />
          </div>

          <div className="about-photo-text" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 64px',
            opacity: photoRev.visible ? 1 : 0,
            transform: photoRev.visible ? 'none' : 'translateX(32px)',
            transition: 'all 900ms cubic-bezier(0.16,1,0.3,1) 200ms',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 3, background: '#ff8400', borderRadius: 4, margin: '0 auto 24px' }} />
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 'clamp(13px,1.2vw,16px)', color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
              }}>Care Best Initiative · Est. 2019</p>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes logoRollBreathe {
            0%   { transform: scale(1)    rotateY(0deg);  opacity: 1; }
            15%  { transform: scale(1.07) rotateY(8deg);  opacity: 1; }
            30%  { transform: scale(1)    rotateY(0deg);  opacity: 0.82; }
            50%  { transform: scale(1.1)  rotateY(-8deg); opacity: 1; }
            65%  { transform: scale(1)    rotateY(0deg);  opacity: 0.82; }
            80%  { transform: scale(1.06) rotateY(5deg);  opacity: 1; }
            100% { transform: scale(1)    rotateY(0deg);  opacity: 1; }
          }
          .logo-roll-breathe {
            animation: logoRollBreathe 5s ease-in-out infinite;
            transform-origin: center center;
            transform-style: preserve-3d;
          }
          @media (max-width: 768px) {
            .about-photo-grid { grid-template-columns: 1fr !important; }
            .about-photo-text { padding: 40px 24px !important; }
          }
          @media (max-width: 520px) {
            .about-photo-text { padding: 32px 20px !important; }
          }
        `}</style>
      </section>

      {/* Values */}
      <section className="values-section" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>What We Stand For</span>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(22px,2.6vw,34px)', fontWeight: 700,
              letterSpacing: '-0.025em', color: '#000000', marginTop: 6, lineHeight: 1.1,
            }}>
              Our Core <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>Values</em>
            </h2>
          </div>

          <div ref={values.ref} className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 20 }}>
            {VALUES.map((v, i) => (
              <div key={v.title} style={{
                textAlign: 'center', padding: '32px 20px',
                background: 'white', borderRadius: 12,
                border: '1px solid rgba(1,2,241,0.07)',
                ...values.style(i),
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'rgba(1,2,241,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>{VALUE_ICONS[v.title]}</div>
                <h3 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 15, fontWeight: 700, color: '#000000', marginBottom: 8,
                }}>{v.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 13, color: '#64748b', lineHeight: 1.65,
                }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .values-section { padding: 80px 80px; }
          @media (max-width: 1024px) { .values-grid { grid-template-columns: repeat(3,1fr) !important; } }
          @media (max-width: 640px)  {
            .values-section { padding: 56px 24px !important; }
            .values-grid    { grid-template-columns: repeat(2,1fr) !important; }
          }
          @media (max-width: 380px)  { .values-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <ImpactNumbers />
      <DonationCTA />
    </>
  )
}
