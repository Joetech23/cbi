import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ChevronLeft, CalendarClock, MapPin, Clock, Briefcase,
  Users, Check, ShieldCheck, Mail, ArrowRight, Sprout,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   Tokens — matched to /careers/volunteer
───────────────────────────────────────────────────────────── */
const C = {
  blue: '#0102F1', navy: '#010278', orange: '#ff8400',
  ink: '#0f172a', sub: '#64748b', line: 'rgba(1,2,241,0.12)',
}
const F = 'var(--font-jakarta, sans-serif)'

const DEADLINE = '4th November 2026'
const APPLY_EMAIL = 'careers@cbi.ngo'

export const metadata: Metadata = {
  title: 'Project Officer (Contract Role) — Careers | Care Best Initiative',
  description:
    'CBI is recruiting a Project Officer for the WPHF Climate-Resilient Peacebuilding project in Yobe State (Bade/Jakusko). 11-month contract. Applications close 4th November 2026, reviewed on a rolling basis.',
}

/* ─────────────────────────────────────────────────────────────
   Advert content
───────────────────────────────────────────────────────────── */
const FACTS = [
  { icon: Briefcase,     label: 'Job Title',     value: 'Project Officer (Contract Role)' },
  { icon: Sprout,        label: 'Project',       value: 'WPHF Climate-Resilient Peacebuilding (Yobe)' },
  { icon: Users,         label: 'Reporting To',  value: 'Program Manager; coordinates with the Grants & Compliance Officer' },
  { icon: MapPin,        label: 'Duty Station',  value: 'Yobe State (Bade/Jakusko)' },
  { icon: Clock,         label: 'Duration',      value: '11 months' },
  { icon: CalendarClock, label: 'Deadline',      value: '4th November 2026 (rolling basis)' },
]

const RESPONSIBILITIES = [
  'Oversee implementation of all field activities in Bade and Jakusko',
  'Supervise Agronomists and Technical Assistants',
  'Ensure quality delivery of FFS, hubs, technical clinics and starter packages',
  'Coordinate with Consortium Team, LGAs, traditional leaders and Hub Committees',
  'Monitor progress, support reporting and ensure accountability',
  'Maintain work plans and support adaptive management',
  'Prepare donor reports and respond to donor feedback through to donor project closure',
]

const QUALIFICATIONS = [
  'Bachelor’s degree in Agriculture, Agricultural Extension, Agronomy or related field',
  'Minimum 3 years’ experience in project management or field coordination of agricultural/livelihoods projects',
  'Strong project management skills (compulsory)',
  'Practical agricultural knowledge, especially climate-smart / vegetable production (compulsory)',
  'Experience supervising field staff',
  'Fluency in English and Hausa',
  'Must be resident in Yobe State',
]

/* ─────────────────────────────────────────────────────────────
   Building blocks
───────────────────────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <span style={{ display: 'block', width: 24, height: 2, background: C.orange, borderRadius: 2 }} />
      <h2 style={{
        fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: C.orange, margin: 0,
      }}>{children}</h2>
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
      {items.map(item => (
        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
          <span style={{
            width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
            background: 'rgba(1,2,241,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Check size={12} color={C.blue} strokeWidth={3} />
          </span>
          <span style={{ fontFamily: F, fontSize: 14.5, color: '#374151', lineHeight: 1.65 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function ProjectOfficerPage() {
  return (
    <div style={{ background: '#f8fafc' }}>

      {/* ── Header band ── */}
      <section style={{
        background: `linear-gradient(120deg, ${C.navy} 0%, ${C.blue} 100%)`,
        padding: '54px 24px 90px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link href="/careers" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: F, fontSize: 12.5, fontWeight: 600,
            color: 'rgba(255,255,255,0.75)', textDecoration: 'none', marginBottom: 20,
          }}>
            <ChevronLeft size={15} /> Back to Careers
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,132,0,0.16)', border: '1px solid rgba(255,132,0,0.45)',
            borderRadius: 100, padding: '5px 14px', marginBottom: 18,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.orange }} />
            <span style={{
              fontFamily: F, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: C.orange,
            }}>Job Vacancy · Deadline {DEADLINE}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#fff',
            lineHeight: 1.08, letterSpacing: '-0.02em', margin: 0,
          }}>
            Project Officer <em style={{ fontStyle: 'italic', color: C.orange }}>(Contract Role)</em>
          </h1>

          <div style={{ maxWidth: 660, display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
            <p style={{ fontFamily: F, fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75 }}>
              Care Best Initiative is a women-led and youth-driven non-governmental and not-for-profit organization, founded in 2019 and presently operational in states across the North-East, North-Central and North-West regions of Nigeria, with plans to expand our reach. We’re passionate about saving lives, alleviating the suffering of children, youth, women, and other vulnerable people; as well as maintaining human dignity and supporting the resilience of individuals and communities affected by crises, poverty and inequality.
            </p>
            <p style={{ fontFamily: F, fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75 }}>
              We believe that every individual deserves dignity, respect and the opportunity to thrive; hence, we’re committed to providing humanitarian aid services, fostering human capital development and strengthening systems to empower vulnerable individuals and communities.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.orange }}>
                Application Deadline: {DEADLINE}
              </span>
              <a href="https://www.cbi.ngo" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: F, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                www.cbi.ngo <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content card ── */}
      <section style={{ padding: '0 20px 90px', marginTop: -56, position: 'relative', zIndex: 2 }}>
        <div style={{
          maxWidth: 820, margin: '0 auto', background: '#fff', borderRadius: 20,
          border: `1px solid ${C.line}`, boxShadow: '0 24px 70px rgba(1,2,40,0.14)', overflow: 'hidden',
        }}>

          {/* Facts grid */}
          <div className="po-facts">
            {FACTS.map(f => {
              const Icon = f.icon
              return (
                <div key={f.label} className="po-fact">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                    <Icon size={13} color={C.blue} />
                    <span style={{
                      fontFamily: F, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.14em',
                      textTransform: 'uppercase', color: C.sub,
                    }}>{f.label}</span>
                  </div>
                  <p style={{
                    fontFamily: F, fontSize: 14, fontWeight: 600,
                    color: C.ink, lineHeight: 1.5, margin: 0,
                  }}>{f.value}</p>
                </div>
              )
            })}
          </div>

          <div style={{ padding: '34px 36px 40px', display: 'flex', flexDirection: 'column', gap: 36 }}>

            {/* Purpose */}
            <div>
              <SectionTitle>Purpose</SectionTitle>
              <p style={{ fontFamily: F, fontSize: 15.5, color: '#475569', lineHeight: 1.8, margin: 0 }}>
                Provide day-to-day field leadership and oversight of the project, combining strong project management with practical agricultural knowledge.
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <SectionTitle>Key Responsibilities</SectionTitle>
              <CheckList items={RESPONSIBILITIES} />
            </div>

            {/* Qualifications */}
            <div>
              <SectionTitle>Required Qualifications</SectionTitle>
              <CheckList items={QUALIFICATIONS} />
            </div>

            {/* Core requirement callout */}
            <div style={{
              padding: '20px 24px', borderRadius: 12,
              background: 'rgba(1,2,241,0.04)',
              border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.blue}`,
            }}>
              <span style={{
                fontFamily: F, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: C.sub, display: 'block', marginBottom: 6,
              }}>Core Requirement</span>
              <p style={{
                fontFamily: F, fontSize: 16, fontWeight: 700, color: C.navy, margin: 0, lineHeight: 1.5,
              }}>
                Management skills + Agricultural skills.
              </p>
            </div>

            {/* How to apply */}
            <div>
              <SectionTitle>How to Apply</SectionTitle>
              <p style={{ fontFamily: F, fontSize: 15, color: '#475569', lineHeight: 1.8, margin: '0 0 10px' }}>
                Interested and qualified candidates should apply with their <strong style={{ color: C.ink }}>CV and a cover letter merged as a single PDF document</strong>.
              </p>
              <p style={{ fontFamily: F, fontSize: 14, color: C.sub, lineHeight: 1.75, margin: '0 0 22px' }}>
                The application deadline is {DEADLINE}. Due to the urgency of this role, applications will be reviewed on a rolling basis, and the position may be filled before the closing date. Early applications are therefore encouraged.
              </p>

              <a
                href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application — Project Officer (WPHF Climate-Resilient Peacebuilding, Yobe)')}`}
                className="po-apply"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '15px 32px', background: C.orange, color: C.navy,
                  borderRadius: 10, textDecoration: 'none',
                  fontFamily: F, fontSize: 15, fontWeight: 800,
                  boxShadow: '0 10px 28px rgba(255,132,0,0.35)',
                }}
              >
                <Mail size={17} /> Apply for this Role
              </a>
              <p style={{ fontFamily: F, fontSize: 12.5, color: C.sub, marginTop: 12 }}>
                Applications go to <strong style={{ color: C.blue }}>{APPLY_EMAIL}</strong> — attach your merged PDF.
              </p>
            </div>

            {/* Safeguarding */}
            <div style={{
              padding: '22px 24px', borderRadius: 12,
              background: '#f8fafc', border: `1px solid ${C.line}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                <ShieldCheck size={16} color={C.blue} />
                <span style={{
                  fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: C.navy,
                }}>Safeguarding Statement</span>
              </div>
              <p style={{ fontFamily: F, fontSize: 13.5, color: C.sub, lineHeight: 1.75, margin: '0 0 10px' }}>
                Care Best Initiative (CBI) is committed to safeguarding and protecting children and adults from abuse, exploitation and harassment, and has zero tolerance for sexual exploitation and abuse (PSEA). All appointments are subject to satisfactory references check, and successful candidates must adhere to CBI’s safeguarding policies and code of conduct.
              </p>
              <p style={{ fontFamily: F, fontSize: 13.5, color: C.sub, lineHeight: 1.75, margin: 0 }}>
                CBI is an equal opportunity employer. Only shortlisted candidates will be contacted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .po-facts {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid ${C.line}; background: #fafbff;
        }
        .po-fact {
          padding: 20px 24px;
          border-right: 1px solid ${C.line};
          border-bottom: 1px solid ${C.line};
        }
        .po-fact:nth-child(3n) { border-right: none; }
        .po-fact:nth-child(n+4) { border-bottom: none; }
        .po-apply { transition: transform 200ms, box-shadow 200ms; }
        .po-apply:hover { transform: translateY(-2px); box-shadow: 0 16px 38px rgba(255,132,0,0.45); }
        @media (max-width: 760px) {
          .po-facts { grid-template-columns: repeat(2, 1fr); }
          .po-fact:nth-child(3n) { border-right: 1px solid ${C.line}; }
          .po-fact:nth-child(2n) { border-right: none; }
          .po-fact:nth-child(n+4) { border-bottom: 1px solid ${C.line}; }
          .po-fact:nth-last-child(-n+2) { border-bottom: none; }
        }
        @media (max-width: 520px) {
          .po-facts { grid-template-columns: 1fr; }
          .po-fact { border-right: none !important; border-bottom: 1px solid ${C.line} !important; }
          .po-fact:last-child { border-bottom: none !important; }
        }
      `}</style>
    </div>
  )
}
