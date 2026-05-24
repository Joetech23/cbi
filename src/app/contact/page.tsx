'use client'

import { useState } from 'react'
import PageHero from '@/components/layout/PageHero'
import CbiMap from '@/components/sections/CbiMap'

const SUBJECTS = [
  'General Inquiry',
  'Partnership Opportunity',
  'Donation Question',
  'Volunteer',
  'Media & Press',
  'Program Information',
]

export default function ContactPage() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]   = useState(false)
  const [focus, setFocus] = useState<string | null>(null)

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 10,
    fontSize: 15, fontFamily: 'var(--font-jakarta, sans-serif)',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 180ms, box-shadow 180ms',
  }
  const getInputStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    border: focus === field ? '1.5px solid #0102F1' : '1.5px solid #e2e8f0',
    boxShadow: focus === field ? '0 0 0 3px rgba(1,2,241,0.07)' : 'none',
    background: 'white',
  })
  const label: React.CSSProperties = {
    fontFamily: 'var(--font-jakarta, sans-serif)',
    fontSize: 11, fontWeight: 700, color: '#64748b',
    letterSpacing: '0.09em', textTransform: 'uppercase',
    display: 'block', marginBottom: 8,
  }

  return (
    <>
      <PageHero
        tag="Contact Us"
        headline="We'd love to hear"
        emph="from you."
        sub="Reach out for partnerships, media enquiries, volunteering, or general information."
      />

      <section className="contact-wrap" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

            {/* ── Contact form ── */}
            <div>
              {!sent ? (
                <div style={{
                  background: 'white', borderRadius: 20, padding: 48,
                  boxShadow: '0 4px 32px rgba(1,2,241,0.07)',
                  border: '1px solid rgba(1,2,241,0.06)',
                }}>
                  <div style={{ marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ display: 'block', width: 28, height: 2, background: '#ff8400', borderRadius: 2 }} />
                      <span style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: '#ff8400',
                      }}>Get in Touch</span>
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-playfair, Georgia, serif)',
                      fontSize: 28, fontWeight: 700, color: '#000000',
                      marginBottom: 8, letterSpacing: '-0.02em',
                    }}>Send a Message</h2>
                    <p style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 14, color: '#94a3b8', lineHeight: 1.6,
                    }}>We reply within 48 hours on business days. For urgent humanitarian matters please call our nearest field office directly.</p>
                  </div>

                  <form
                    onSubmit={e => { e.preventDefault(); setSent(true) }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
                  >
                    {/* Name + Email row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={label}>Full Name</label>
                        <input
                          type="text" value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name" style={getInputStyle('name')}
                          onFocus={() => setFocus('name')} onBlur={() => setFocus(null)}
                          required
                        />
                      </div>
                      <div>
                        <label style={label}>Email Address</label>
                        <input
                          type="email" value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="email@example.com" style={getInputStyle('email')}
                          onFocus={() => setFocus('email')} onBlur={() => setFocus(null)}
                          required
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label style={label}>Subject</label>
                      <select
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        style={getInputStyle('subject')}
                        onFocus={() => setFocus('subject')} onBlur={() => setFocus(null)}
                        required
                      >
                        <option value="">Select a subject…</option>
                        {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={label}>Message</label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how we can help…"
                        rows={5}
                        style={{ ...getInputStyle('message'), resize: 'vertical' }}
                        onFocus={() => setFocus('message')} onBlur={() => setFocus(null)}
                        required
                      />
                    </div>

                    {/* HQ quick-contact */}
                    <div style={{
                      background: '#f8fafc', borderRadius: 12,
                      padding: '16px 20px',
                      border: '1px solid rgba(1,2,241,0.07)',
                      display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: '#0102F1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, fontSize: 15,
                      }}>📞</div>
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-jakarta, sans-serif)',
                          fontSize: 12, fontWeight: 700, color: '#000',
                        }}>Prefer to call?</div>
                        <div style={{
                          fontFamily: 'var(--font-jakarta, sans-serif)',
                          fontSize: 13, color: '#0102F1', fontWeight: 600, marginTop: 2,
                        }}>+234 (0) 915 349 3317 · admin@cbi.ngo</div>
                      </div>
                    </div>

                    <button type="submit" style={{
                      padding: '16px 24px', background: '#0102F1', color: 'white',
                      border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                      cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
                      transition: 'all 180ms cubic-bezier(0.16,1,0.3,1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 4px 14px rgba(1,2,241,0.22)',
                    }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#3335f3'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 28px rgba(1,2,241,0.3)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0102F1'; el.style.transform = 'none'; el.style.boxShadow = '0 4px 14px rgba(1,2,241,0.22)' }}
                    >
                      Send Message <span style={{ color: '#ff8400', fontSize: 17 }}>→</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{
                  background: 'white', borderRadius: 20, padding: '80px 48px',
                  boxShadow: '0 4px 32px rgba(1,2,241,0.07)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0102F1 0%, #3335f3 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 28px', fontSize: 32, boxShadow: '0 8px 24px rgba(1,2,241,0.25)',
                  }}>✓</div>
                  <h2 style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontSize: 28, fontWeight: 700, color: '#000', marginBottom: 14,
                  }}>Message Sent!</h2>
                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 16, color: '#64748b', lineHeight: 1.7, marginBottom: 32,
                    maxWidth: 380, margin: '0 auto 32px',
                  }}>Thank you for reaching out. Our team will respond within 48 business hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    style={{
                      padding: '13px 32px', background: '#0102F1', color: 'white',
                      border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700,
                      cursor: 'pointer', fontFamily: 'var(--font-jakarta, sans-serif)',
                    }}
                  >Send Another Message →</button>
                </div>
              )}
            </div>

        </div>

        {/* ── Interactive Map (full width below form) ── */}
        <div className="map-wrap">
          <CbiMap />
        </div>

        <style>{`
          .contact-wrap { padding: 80px 80px 100px; }
          .map-wrap { max-width: 1200px; margin: 44px auto 0; padding: 0 80px; }
          @media (max-width: 1100px) {
            .map-wrap { padding: 0 40px; }
          }
          @media (max-width: 860px) {
            .contact-wrap { padding: 56px 28px 80px !important; }
            .map-wrap { padding: 0 28px; }
          }
          @media (max-width: 520px) {
            .contact-wrap { padding: 40px 16px 60px !important; }
            .map-wrap { padding: 0 16px; margin-top: 32px; }
            .contact-wrap > div > div > div { padding: 28px !important; }
            .contact-wrap > div > div form > div:first-child {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </>
  )
}
