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
        headline="A national NGO delivering integrated humanitarian programs"
        emph="since 2019."
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

          <h2 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700,
            letterSpacing: '-0.025em', color: '#000000',
            lineHeight: 1.2, marginBottom: 28,
          }}>
            Women-led, youth-driven, and{' '}
            <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3, fontStyle: 'italic' }}>
              built for impact.
            </em>
          </h2>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 16.5, color: '#475569', lineHeight: 1.82,
            }}>
              We are a <strong style={{ color: '#0102F1', fontWeight: 700 }}>women-led and youth-driven</strong> non-governmental and not-for-profit organization founded in 2019 and presently operational in states across Nigeria with a readiness to expand our reach.
            </p>

            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 16.5, color: '#475569', lineHeight: 1.82,
            }}>
              We are passionate about saving lives and easing the suffering of children, youth, women, and other vulnerable people — as well as maintaining human dignity and supporting the resilience of individuals and communities affected by crisis, poverty and inequality.
            </p>

            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 16.5, color: '#475569', lineHeight: 1.82,
            }}>
              We believe every individual deserves dignity, respect and the opportunity to thrive; hence we are committed to providing <strong style={{ color: '#000', fontWeight: 600 }}>humanitarian aid services</strong>, fostering <strong style={{ color: '#000', fontWeight: 600 }}>human capital development</strong> and strengthening <strong style={{ color: '#000', fontWeight: 600 }}>systems</strong> to empower vulnerable individuals and communities.
            </p>
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
          @media (max-width: 768px) {
            .about-intro { padding: 56px 24px 40px !important; }
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
              style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxWidth: 240, opacity: 0.92 }}
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
                fontSize: 'clamp(19px,2.2vw,29px)', fontWeight: 700,
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
