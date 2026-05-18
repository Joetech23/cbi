'use client'

import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import ImpactNumbers from '@/components/sections/ImpactNumbers'
import DonationCTA from '@/components/sections/DonationCTA'
import { useStagger, useReveal } from '@/lib/reveal'

const VALUES = [
  { icon: '🌱', title: 'Accountability', desc: 'Transparent stewardship of every resource entrusted to us.' },
  { icon: '🤝', title: 'Partnership',    desc: 'We work with, not for, the communities we serve.' },
  { icon: '⚡', title: 'Innovation',     desc: 'Evidence-based approaches adapted to local realities.' },
  { icon: '🛡️', title: 'Integrity',      desc: 'Principled action in everything we do, always.' },
  { icon: '❤️', title: 'Compassion',     desc: 'Human dignity is the foundation of every decision.' },
]

const PILLS = [
  {
    tag: 'Our Mission',
    title: 'Why We Exist',
    text: "To deliver integrated, evidence-based humanitarian programs that improve the health, education, nutrition, and protection outcomes of Nigeria's most vulnerable populations.",
    accent: '#0102F1',
  },
  {
    tag: 'Our Vision',
    title: "Where We're Going",
    text: 'A Nigeria where every community — regardless of location, ethnicity, or circumstance — has access to the basic services required for a dignified, healthy, and prosperous life.',
    accent: '#ff8400',
  },
]

export default function AboutPage() {
  const pills    = useStagger(140, 24)
  const values   = useStagger(80, 24)
  const photoRev = useReveal()
  return (
    <>
      <PageHero
        tag="About CBI"
        headline="A national NGO delivering integrated humanitarian programs"
        emph="since 2019."
      />

      {/* Mission + Vision */}
      <section className="about-mv" style={{ background: 'white' }}>
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
                  fontSize: 32, fontWeight: 800, color: '#000000',
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
          .about-mv { padding: 80px 80px; }
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
          <div style={{
            height: 440, overflow: 'hidden', position: 'relative',
            opacity: photoRev.visible ? 1 : 0,
            transform: photoRev.visible ? 'none' : 'translateX(-32px)',
            transition: 'all 900ms cubic-bezier(0.16,1,0.3,1)',
          }}>
            <Image
              src="/images/branding/Care-Best-3.jpg"
              alt="Care Best Initiative in the field"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="about-photo-text" style={{
            display: 'flex', alignItems: 'center', padding: '60px 64px',
            opacity: photoRev.visible ? 1 : 0,
            transform: photoRev.visible ? 'none' : 'translateX(32px)',
            transition: 'all 900ms cubic-bezier(0.16,1,0.3,1) 200ms',
          }}>
            <div>
              <div style={{ width: 4, height: 48, background: '#ff8400', borderRadius: 4, marginBottom: 28 }} />
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800,
                color: 'white', lineHeight: 1.25, marginBottom: 20,
                letterSpacing: '-0.02em', fontStyle: 'italic',
              }}>
                &ldquo;We didn&apos;t wait for permission to start. We started in 2019 with seven people and a mission.&rdquo;
              </h2>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 14, color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600,
              }}>Rejoice Mark, Executive Director</p>
            </div>
          </div>
        </div>
        <style>{`
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
              fontSize: 'clamp(30px,3.5vw,44px)', fontWeight: 800,
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
                <div style={{ fontSize: 30, marginBottom: 14 }}>{v.icon}</div>
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
