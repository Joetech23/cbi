'use client'

import { Briefcase, Send } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'

const BENEFITS = [
  { title: 'Purposeful Work',       desc: "Every role directly contributes to humanitarian programs for Nigeria's most vulnerable." },
  { title: 'Professional Growth',   desc: 'Access to international training, capacity development, and mentoring programs.' },
  { title: 'Collaborative Culture', desc: 'Work with passionate colleagues and 35+ global partner organisations.' },
  { title: 'Field Experience',      desc: 'Direct community engagement across 10 states in Nigeria.' },
  { title: 'Learning Environment',  desc: 'Continuous development through structured systems, peer learning, and feedback.' },
  { title: 'Safe Workplace',        desc: 'Committed to staff welfare, security, and work-life balance in all offices.' },
]

const DEPARTMENTS = [
  'Programs & Implementation',
  'Monitoring, Evaluation & Learning (MEAL)',
  'Finance & Administration',
  'Logistics & Supply Chain',
  'Human Resources',
  'Information & Communications (ICT)',
]

const STEPS = [
  { step: '01', title: 'Prepare your documents', desc: 'CV, a tailored cover letter, and relevant certifications or credentials.' },
  { step: '02', title: 'Send your application',  desc: 'Email to careers@cbi.ngo with the position title in the subject line.' },
  { step: '03', title: "We'll be in touch",     desc: 'Shortlisted candidates are contacted within 10 working days for an interview.' },
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        tag="Careers"
        headline="Build a career with"
        emph="purpose."
        sub="Join a team of passionate professionals working at the intersection of humanitarian response, community development, and lasting change in Nigeria."
      />

      {/* Open positions — empty state */}
      <section className="careers-open" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 32,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#ff8400',
                }}>Open Positions</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 'clamp(26px,3vw,36px)', fontWeight: 800,
                color: '#010278', letterSpacing: '-0.025em',
              }}>Current openings</h2>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: '#f8fafc', border: '1px solid rgba(1,2,241,0.08)',
              borderRadius: 12, padding: '14px 22px',
            }}>
              <Briefcase size={18} color="#94a3b8" />
              <div>
                <p style={{
                  fontFamily: 'var(--font-space, monospace)',
                  fontSize: 22, fontWeight: 800, color: '#010278', lineHeight: 1,
                }}>0</p>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, color: '#94a3b8', fontWeight: 700, marginTop: 4,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>Open positions</p>
              </div>
            </div>
          </div>

          <div style={{
            background: '#f8fafc', borderRadius: 16, padding: 56,
            textAlign: 'center', border: '1px solid rgba(1,2,241,0.07)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'rgba(1,2,241,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Briefcase size={24} color="#0102F1" />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 22, fontWeight: 800, color: '#010278', marginBottom: 10,
            }}>No open positions right now.</h3>
            <p style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 14, color: '#64748b', lineHeight: 1.65,
              maxWidth: 460, margin: '0 auto 24px',
            }}>
              We don&apos;t have active postings at the moment, but we always welcome exceptional talent. Send us your CV and we&apos;ll reach out when a matching role opens.
            </p>
            <a href="mailto:careers@cbi.ngo" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', background: '#0102F1', color: 'white',
              borderRadius: 8, fontSize: 14, fontWeight: 700,
              textDecoration: 'none',
              fontFamily: 'var(--font-jakarta, sans-serif)',
              transition: 'all 150ms',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#3335f3'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0102F1'; el.style.transform = 'none' }}
            >Send Unsolicited Application <Send size={14} /></a>
          </div>
        </div>
        <style>{`.careers-open{padding:64px 80px;}@media(max-width:768px){.careers-open{padding:48px 24px!important;}}`}</style>
      </section>

      {/* Benefits */}
      <section className="careers-benefits" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>Why CBI</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(26px,3vw,36px)', fontWeight: 800,
              color: '#010278', letterSpacing: '-0.025em',
            }}>Why professionals choose us.</h2>
          </div>

          <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {BENEFITS.map(b => (
              <div key={b.title} style={{
                padding: 26, background: 'white', borderRadius: 14,
                border: '1px solid rgba(1,2,241,0.07)',
                transition: 'all 220ms ease',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 10px 28px rgba(1,2,241,0.10)'
                  el.style.borderColor = 'rgba(255,132,0,0.35)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'none'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'rgba(1,2,241,0.07)'
                }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: '#fff3e0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>
                  <span style={{ color: '#7a3d00', fontWeight: 800, fontSize: 14 }}>✓</span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 16, fontWeight: 700, color: '#010278', marginBottom: 8,
                }}>{b.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 13.5, color: '#64748b', lineHeight: 1.65,
                }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .careers-benefits { padding: 80px 80px; }
          @media (max-width: 1024px) { .benefits-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 640px)  {
            .careers-benefits { padding: 56px 24px !important; }
            .benefits-grid    { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Departments + Apply */}
      <section className="careers-apply" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="apply-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start',
          }}>
            {/* Departments */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#ff8400',
                }}>Departments</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 'clamp(26px,3vw,36px)', fontWeight: 800,
                color: '#010278', letterSpacing: '-0.025em', marginBottom: 28,
              }}>Where you could work.</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {DEPARTMENTS.map(d => (
                  <div key={d} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px', background: '#f8fafc',
                    borderRadius: 10, border: '1px solid rgba(1,2,241,0.07)',
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff8400' }} />
                    <span style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 14, fontWeight: 600, color: '#000000',
                    }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to apply */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
                <span style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#ff8400',
                }}>How to Apply</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 'clamp(26px,3vw,36px)', fontWeight: 800,
                color: '#010278', letterSpacing: '-0.025em', marginBottom: 28,
              }}>Three simple steps.</h2>

              {STEPS.map(s => (
                <div key={s.step} style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: '#0102F1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      color: '#ff8400',
                      fontFamily: 'var(--font-space, monospace)',
                      fontSize: 13, fontWeight: 800,
                    }}>{s.step}</span>
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 15, fontWeight: 700, color: '#010278', marginBottom: 4,
                    }}>{s.title}</h3>
                    <p style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 13.5, color: '#64748b', lineHeight: 1.65,
                    }}>{s.desc}</p>
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: 8, padding: 20, background: '#f8fafc',
                borderRadius: 12, border: '1px solid rgba(1,2,241,0.08)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 10, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4,
                }}>Applications email</p>
                <a href="mailto:careers@cbi.ngo" style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 15, fontWeight: 700, color: '#0102F1',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
                  transition: 'color 150ms',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff8400'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#0102F1'}
                >careers@cbi.ngo →</a>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11.5, color: '#94a3b8', marginTop: 10, lineHeight: 1.5,
                }}>CBI is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all staff.</p>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .careers-apply { padding: 80px 80px; }
          @media (max-width: 900px) {
            .careers-apply { padding: 56px 24px !important; }
            .apply-grid    { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>
    </>
  )
}
