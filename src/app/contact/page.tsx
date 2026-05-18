'use client'

import { useState } from 'react'
import PageHero from '@/components/layout/PageHero'

const OFFICES = [
  { city: 'Abuja (HQ)',    phone: '+234 809 000 0001' },
  { city: 'Lagos',         phone: '+234 809 000 0002' },
  { city: 'Maiduguri',     phone: '+234 809 000 0003' },
  { city: 'Yola',          phone: '+234 809 000 0004' },
  { city: 'Damaturu',      phone: '+234 809 000 0005' },
  { city: 'Kano',          phone: '+234 809 000 0006' },
  { city: 'Port Harcourt', phone: '+234 809 000 0007' },
]

const SUBJECTS = ['General Inquiry', 'Partnership Opportunity', 'Donation Question', 'Volunteer', 'Media & Press', 'Program Information']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 15px', borderRadius: 8,
    border: '1px solid #e2e8f0', fontSize: 15,
    fontFamily: 'var(--font-jakarta, sans-serif)',
    outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-jakarta, sans-serif)',
    fontSize: 11, fontWeight: 700, color: '#64748b',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    display: 'block', marginBottom: 8,
  }

  return (
    <>
      <PageHero
        tag="Contact Us"
        headline="We'd love to hear"
        emph="from you."
      />

      <section className="contact-section" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="contact-grid" style={{
            display: 'grid', gridTemplateColumns: '1.3fr 0.7fr',
            gap: 48, alignItems: 'start',
          }}>
            {!sent ? (
              <div style={{
                background: 'white', borderRadius: 20, padding: 48,
                boxShadow: '0 4px 32px rgba(1,2,241,0.08)',
                border: '1px solid rgba(1,2,241,0.06)',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-playfair, Georgia, serif)',
                  fontSize: 28, fontWeight: 800, color: '#000000',
                  marginBottom: 6, letterSpacing: '-0.02em',
                }}>Send a Message</h2>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 14, color: '#94a3b8', marginBottom: 32,
                }}>We reply within 48 hours on business days.</p>

                <form
                  onSubmit={e => { e.preventDefault(); setSent(true) }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Full Name" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#0102F1')}
                      onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="Email Address" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#0102F1')}
                      onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle, background: 'white' }}
                      onFocus={e => (e.target.style.borderColor = '#0102F1')}
                      onBlur={e => (e.target.style.borderColor = '#e2e8f0')}>
                      <option value="">Select a subject…</option>
                      {SUBJECTS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help…" rows={5}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => (e.target.style.borderColor = '#0102F1')}
                      onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                  </div>
                  <button type="submit" style={{
                    padding: 16, background: '#0102F1', color: 'white',
                    border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
                    transition: 'all 150ms', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#3335f3'; el.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0102F1'; el.style.transform = 'none' }}
                  >Send Message <span style={{ color: '#ff8400' }}>→</span></button>
                </form>
              </div>
            ) : (
              <div style={{
                background: 'white', borderRadius: 20, padding: '64px 48px',
                boxShadow: '0 4px 32px rgba(1,2,241,0.08)', textAlign: 'center',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: '#dcfce7', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', fontSize: 28,
                }}>✓</div>
                <h2 style={{
                  fontFamily: 'var(--font-playfair, Georgia, serif)',
                  fontSize: 32, fontWeight: 800, color: '#000000', marginBottom: 12,
                }}>Message Sent!</h2>
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 16, color: '#64748b', lineHeight: 1.65, marginBottom: 28,
                }}>Thank you for reaching out. Our team will respond within 48 hours.</p>
                <button onClick={() => setSent(false)} style={{
                  padding: '12px 28px', background: '#0102F1', color: 'white',
                  border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
                }}>Send Another →</button>
              </div>
            )}

            {/* Sidebar */}
            <div>
              <div style={{
                background: '#0102F1', borderRadius: 16, padding: 32,
                color: 'white', marginBottom: 20,
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 15, fontWeight: 700, marginBottom: 18, letterSpacing: '-0.01em',
                }}>Headquarters</h3>
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: 10,
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6,
                }}>
                  <div><strong style={{ color: 'white' }}>Email:</strong> info@cbi.ngo</div>
                  <div><strong style={{ color: 'white' }}>Phone:</strong> +234 809 000 0001</div>
                  <div><strong style={{ color: 'white' }}>Address:</strong> Aero Gardens Estate, Kyami, Abuja</div>
                  <div><strong style={{ color: 'white' }}>Hours:</strong> Mon–Fri, 8AM – 5PM WAT</div>
                </div>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 14, fontWeight: 700, color: '#000000', marginBottom: 14,
              }}>Our 7 Field Offices</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {OFFICES.map(o => (
                  <div key={o.city} style={{
                    padding: '14px 18px', background: 'white', borderRadius: 10,
                    border: '1px solid rgba(1,2,241,0.08)',
                    borderLeft: '3px solid transparent',
                    cursor: 'pointer', transition: 'all 150ms',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#ff8400' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent' }}>
                    <div style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 14, fontWeight: 700, color: '#000000', marginBottom: 3,
                    }}>{o.city}</div>
                    <div style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, color: '#94a3b8',
                    }}>{o.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .contact-section { padding: 80px 80px; }
          @media (max-width: 900px) {
            .contact-section { padding: 48px 24px !important; }
            .contact-grid    { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
          @media (max-width: 520px) {
            .contact-section { padding: 36px 16px !important; }
            .contact-grid > div:first-child { padding: 28px !important; }
          }
        `}</style>
      </section>
    </>
  )
}
