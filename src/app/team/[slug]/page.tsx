import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowLeft, Mail, MapPin, Calendar, Languages,
  GraduationCap, Award, Globe, CheckCircle2, ArrowRight,
} from 'lucide-react'
import { TEAM, getMember } from '@/lib/team'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return TEAM.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const m = getMember(slug)
  if (!m) return { title: 'Team member not found · Care Best Initiative' }
  return {
    title: `${m.name} — ${m.role} · Care Best Initiative`,
    description: m.shortBio || m.bio.slice(0, 160),
  }
}

export default async function TeamProfilePage({ params }: Props) {
  const { slug } = await params
  const member = getMember(slug)
  if (!member) notFound()

  // 3 other team members for the "Meet more of the team" section
  const others = TEAM.filter(m => m.slug !== member.slug).slice(0, 3)

  return (
    <>
      {/* ── Hero (cinematic photo + name overlay) ── */}
      <section className="profile-hero" style={{
        position: 'relative',
        minHeight: 520,
        background: '#010278',
        overflow: 'hidden',
      }}>
        <Image
          src={member.photo}
          alt={member.name}
          fill priority sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'top center',
            opacity: 0.6,
          }}
        />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(105deg, rgba(1,2,120,0.92) 0%, rgba(1,2,241,0.55) 45%, rgba(1,2,120,0.25) 80%, rgba(1,2,120,0.75) 100%)`,
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(1,2,120,0.4) 0%, transparent 30%, transparent 60%, rgba(1,2,120,0.9) 100%)',
        }} />

        <div className="profile-hero-inner" style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1280, margin: '0 auto',
          padding: '60px 80px',
          minHeight: 520,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {/* Back link */}
          <Link href="/team" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.75)',
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 13, fontWeight: 600,
            textDecoration: 'none', alignSelf: 'flex-start',
            padding: '8px 14px', borderRadius: 100,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            transition: 'all 200ms',
          }}>
            <ArrowLeft size={14} /> Back to team
          </Link>

          {/* Name block */}
          <div style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ display: 'block', width: 32, height: 1, background: member.accent }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#ffa340',
              }}>
                {member.level === 'leadership' ? 'Leadership' : 'Team'} · {member.role}
              </span>
            </div>

            <h1 className="profile-name" style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4.8vw, 68px)',
              lineHeight: 0.98, letterSpacing: '-0.035em',
              color: 'white', margin: 0,
              textShadow: '0 4px 24px rgba(0,0,0,0.25)',
            }}>{member.name}</h1>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 18, marginTop: 26,
              flexWrap: 'wrap',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '7px 14px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 100,
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 12, fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
              }}>
                <MapPin size={12} /> {member.location}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '7px 14px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 100,
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 12, fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
              }}>
                <Calendar size={12} /> {member.yearsAtCBI} {member.yearsAtCBI === 1 ? 'year' : 'years'} at CBI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body grid ── */}
      <section className="profile-body" style={{ background: 'white' }}>
        <div className="profile-grid" style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1.6fr 0.9fr',
          gap: 80, alignItems: 'start',
        }}>
          {/* LEFT — bio, quote, achievements */}
          <div>
            {/* Section: About */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 11, fontWeight: 700, color: '#94a3b8',
                letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14,
              }}>About</h2>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 17, color: '#000', lineHeight: 1.78,
              }}>{member.bio}</p>
            </div>

            {/* Quote */}
            <blockquote className="profile-quote" style={{
              position: 'relative',
              padding: '32px 28px 32px 36px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              borderLeft: `5px solid ${member.accent}`,
              borderRadius: 14,
              marginBottom: 48,
            }}>
              <span aria-hidden="true" style={{
                position: 'absolute', top: 14, right: 22,
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 80, lineHeight: 1, color: member.accent, opacity: 0.18,
              }}>&ldquo;</span>
              <p style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontStyle: 'italic', fontSize: 22, fontWeight: 600,
                color: '#010278', lineHeight: 1.5, marginBottom: 12,
                position: 'relative', zIndex: 1,
              }}>&ldquo;{member.quote}&rdquo;</p>
              <cite style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontStyle: 'normal',
                fontSize: 11, fontWeight: 700, color: '#94a3b8',
                letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>— {member.name}</cite>
            </blockquote>

            {/* Expertise pills */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 11, fontWeight: 700, color: '#94a3b8',
                letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14,
              }}>Areas of Expertise</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {member.expertise.map(skill => (
                  <span key={skill} style={{
                    padding: '8px 16px', borderRadius: 100,
                    background: `${member.accent}10`,
                    border: `1px solid ${member.accent}30`,
                    color: member.accent,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 13, fontWeight: 600,
                  }}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {member.achievements && member.achievements.length > 0 && (
              <div style={{ marginBottom: 48 }}>
                <h2 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}><Award size={14} /> Key Achievements</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {member.achievements.map(a => (
                    <li key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <CheckCircle2 size={18} color={member.accent} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 15, color: '#000', lineHeight: 1.6,
                      }}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education */}
            {member.education && member.education.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, fontWeight: 700, color: '#94a3b8',
                  letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}><GraduationCap size={14} /> Education</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {member.education.map(e => (
                    <li key={e} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '14px 18px',
                      background: '#f8fafc', borderRadius: 10,
                      border: '1px solid rgba(1,2,241,0.06)',
                    }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: member.accent, marginTop: 7, flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 14, color: '#000', lineHeight: 1.55,
                      }}>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT — sticky contact card */}
          <aside className="profile-aside" style={{ position: 'sticky', top: 100 }}>
            {/* Contact card */}
            <div style={{
              background: 'white', borderRadius: 16, padding: 28,
              border: '1px solid rgba(1,2,241,0.08)',
              boxShadow: '0 4px 24px rgba(1,2,241,0.06)',
              marginBottom: 16,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 11, fontWeight: 700, color: '#94a3b8',
                letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18,
              }}>Get in Touch</h3>

              <a href={`mailto:${member.email}`} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 14, borderRadius: 10,
                background: '#0102F1', color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 14, fontWeight: 700,
                transition: 'all 200ms',
                marginBottom: 10,
              }}>
                <Mail size={16} />
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.email}</span>
                <ArrowRight size={14} />
              </a>

              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 14, borderRadius: 10,
                  background: '#f8fafc', color: '#010278',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 14, fontWeight: 700,
                  border: '1px solid rgba(1,2,241,0.08)',
                  transition: 'all 200ms',
                }}>
                  <Globe size={16} />
                  <span style={{ flex: 1 }}>LinkedIn Profile</span>
                  <ArrowRight size={14} />
                </a>
              )}
            </div>

            {/* Quick facts card */}
            <div style={{
              background: 'linear-gradient(135deg, #010278 0%, #0102F1 100%)',
              borderRadius: 16, padding: 28, color: 'white',
              marginBottom: 16, position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative accent */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: -40, right: -40,
                width: 140, height: 140, borderRadius: '50%',
                background: `radial-gradient(circle, ${member.accent}55 0%, transparent 70%)`,
                filter: 'blur(8px)',
              }} />

              <h3 style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 22,
                position: 'relative',
              }}>Quick Facts</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-space, monospace)',
                    fontSize: 28, fontWeight: 700, color: '#ff8400',
                    fontVariantNumeric: 'tabular-nums', lineHeight: 1,
                  }}>{member.yearsAtCBI}</div>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, fontWeight: 600,
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    marginTop: 4,
                  }}>Years at CBI</div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

                <div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, fontWeight: 600,
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
                  }}><Languages size={11} /> Languages</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {member.languages.map(l => (
                      <span key={l} style={{
                        padding: '4px 10px', borderRadius: 100,
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 12, fontWeight: 600, color: 'white',
                      }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Photo card */}
            <div style={{
              borderRadius: 16, overflow: 'hidden', position: 'relative',
              height: 280,
            }}>
              <Image
                src={member.photo} alt={member.name} fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
          </aside>
        </div>

        <style>{`
          .profile-body { padding: 80px 80px 100px; }
          @media (max-width: 1024px) {
            .profile-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
            .profile-aside { position: static !important; }
          }
          @media (max-width: 768px) {
            .profile-body { padding: 56px 24px 80px !important; }
            .profile-hero-inner { padding: 40px 24px !important; }
          }
          @media (max-width: 520px) {
            .profile-body { padding: 40px 16px 60px !important; }
            .profile-hero-inner { padding: 32px 16px !important; }
            .profile-quote { padding: 24px 20px 24px 26px !important; }
            .profile-quote p { font-size: 18px !important; }
          }
        `}</style>
      </section>

      {/* ── Meet more of the team ── */}
      <section className="profile-more" style={{ background: '#f8fafc', borderTop: '1px solid rgba(1,2,241,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#ff8400',
              }}>More of the team</span>
              <span style={{ display: 'block', width: 24, height: 1, background: '#ff8400' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 700,
              color: '#010278', letterSpacing: '-0.025em',
            }}>
              Meet the rest of <em style={{ borderBottom: '4px solid #ff8400', paddingBottom: 3 }}>the team.</em>
            </h2>
          </div>

          <div className="profile-others" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginBottom: 36,
          }}>
            {others.map(o => (
              <Link key={o.slug} href={`/team/${o.slug}`} style={{
                textDecoration: 'none', color: 'inherit',
                background: 'white', borderRadius: 14, overflow: 'hidden',
                border: '1px solid rgba(1,2,241,0.07)',
                transition: 'all 250ms cubic-bezier(0.16,1,0.3,1)',
                display: 'block',
              }}>
                <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                  <Image
                    src={o.photo} alt={o.name} fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>
                <div style={{ padding: 18 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 15, fontWeight: 700, color: '#010278',
                  }}>{o.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, fontWeight: 700, color: o.accent,
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4,
                  }}>{o.role}</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/team" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px',
              background: 'transparent', color: '#0102F1',
              border: '2px solid #0102F1',
              borderRadius: 8, fontSize: 14, fontWeight: 700,
              fontFamily: 'var(--font-jakarta, sans-serif)',
              textDecoration: 'none', transition: 'all 200ms',
            }}>
              <ArrowLeft size={14} /> View entire team
            </Link>
          </div>
        </div>
        <style>{`
          .profile-more { padding: 80px 80px; }
          @media (max-width: 1024px) { .profile-others { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 640px)  {
            .profile-more { padding: 56px 24px !important; }
            .profile-others { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  )
}
