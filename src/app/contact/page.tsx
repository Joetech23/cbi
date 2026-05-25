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
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [sent, setSent]     = useState(false)
  const [focus, setFocus]   = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [error, setError]   = useState<string | null>(null)

  async function submitForm(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not send your message. Please try again or email info@cbi.ngo directly.')
        setSending(false)
        return
      }
      setSent(true)
      setSending(false)
    } catch {
      setError('Network error. Please check your connection or email info@cbi.ngo directly.')
      setSending(false)
    }
  }

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
                    onSubmit={submitForm}
                    style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
                  >
                    {/* Honeypot — hidden from real users, bots fill it */}
                    <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                      <label>
                        Website
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.website}
                          onChange={e => setForm({ ...form, website: e.target.value })}
                        />
                      </label>
                    </div>
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
                        }}>+234 (0) 915 349 3317 · info@cbi.ngo</div>
                      </div>
                    </div>

                    {/* Error banner */}
                    {error && (
                      <div role="alert" style={{
                        padding: '12px 16px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: 10,
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                      }}>
                        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>⚠️</span>
                        <div style={{
                          fontFamily: 'var(--font-jakarta, sans-serif)',
                          fontSize: 13, color: '#b91c1c', lineHeight: 1.55,
                        }}>
                          {error}
                          {' '}
                          <a
                            href={`mailto:info@cbi.ngo?subject=${encodeURIComponent(form.subject || 'Website enquiry')}&body=${encodeURIComponent(form.message)}`}
                            style={{ color: '#0102F1', fontWeight: 600, textDecoration: 'underline' }}
                          >
                            Open in your mail app instead
                          </a>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        padding: '16px 24px',
                        background: sending ? '#94a3b8' : '#0102F1',
                        color: 'white',
                        border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                        cursor: sending ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        transition: 'all 180ms cubic-bezier(0.16,1,0.3,1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        boxShadow: sending ? 'none' : '0 4px 14px rgba(1,2,241,0.22)',
                        opacity: sending ? 0.85 : 1,
                      }}
                      onMouseEnter={e => {
                        if (sending) return
                        const el = e.currentTarget as HTMLElement
                        el.style.background = '#3335f3'
                        el.style.transform = 'translateY(-2px)'
                        el.style.boxShadow = '0 10px 28px rgba(1,2,241,0.3)'
                      }}
                      onMouseLeave={e => {
                        if (sending) return
                        const el = e.currentTarget as HTMLElement
                        el.style.background = '#0102F1'
                        el.style.transform = 'none'
                        el.style.boxShadow = '0 4px 14px rgba(1,2,241,0.22)'
                      }}
                    >
                      {sending ? (
                        <>
                          <span style={{
                            width: 16, height: 16, borderRadius: '50%',
                            border: '2px solid rgba(255,255,255,0.35)',
                            borderTopColor: 'white',
                            animation: 'contactSpin 700ms linear infinite',
                            display: 'inline-block',
                          }} />
                          Sending…
                        </>
                      ) : (
                        <>Send Message <span style={{ color: '#ff8400', fontSize: 17 }}>→</span></>
                      )}
                    </button>
                    <style>{`
                      @keyframes contactSpin {
                        from { transform: rotate(0deg); }
                        to   { transform: rotate(360deg); }
                      }
                    `}</style>
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
                    onClick={() => {
                      setSent(false)
                      setError(null)
                      setForm({ name: '', email: '', subject: '', message: '', website: '' })
                    }}
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

        {/* ── Office Directory ── */}
        <div className="offices-wrap">

          {/* Section header */}
          <div style={{ marginBottom: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#eef0ff', borderRadius: 100,
                padding: '5px 14px', marginBottom: 12,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0102F1', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0102F1' }}>Our Offices</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 30, fontWeight: 700, color: '#010278', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2 }}>
                Find Us Across Nigeria
              </h2>
              <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 15, color: '#64748b', marginTop: 8, maxWidth: 480, lineHeight: 1.6 }}>
                One head office and six field offices — bringing humanitarian services closer to the communities we serve.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 28, fontWeight: 800, color: '#ff8400', lineHeight: 1 }}>1</div>
                <div style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>Head Office</div>
              </div>
              <div style={{ width: 1, height: 36, background: '#e2e8f0' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 28, fontWeight: 800, color: '#0102F1', lineHeight: 1 }}>6</div>
                <div style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>Field Offices</div>
              </div>
            </div>
          </div>

          {/* Office cards grid */}
          <div className="offices-grid">

            {/* ── Abuja HQ (featured) ── */}
            <div className="office-card office-hq">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                <div>
                  <span style={{
                    display: 'inline-block', background: '#ff8400', color: 'white',
                    fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '4px 12px', borderRadius: 100, marginBottom: 10,
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                  }}>Head Office</span>
                  <h3 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 22, fontWeight: 700, color: 'white', margin: 0, letterSpacing: '-0.01em' }}>Abuja</h3>
                  <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: '3px 0 0', letterSpacing: '0.05em' }}>Federal Capital Territory</p>
                </div>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🏛️</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 13, marginTop: 1, flexShrink: 0 }}>📍</span>
                  <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>No. 139, Aero Gardens Estate, Kyami, Airport Road, Abuja</span>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, flexShrink: 0 }}>✉️</span>
                  <a href="mailto:info@cbi.ngo" style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 13, color: '#ff8400', fontWeight: 600, textDecoration: 'none' }}>info@cbi.ngo</a>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, flexShrink: 0 }}>📞</span>
                  <a href="tel:+2349153493317" style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500, textDecoration: 'none' }}>+234 (0) 915 349 3317</a>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, flexShrink: 0 }}>🕐</span>
                  <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 11.5, color: 'rgba(255,255,255,0.45)' }}>Mon – Fri · 8 AM – 5 PM WAT</span>
                </div>
              </div>
            </div>

            {/* ── Field Offices ── */}
            {[
              { city: 'Maiduguri', state: 'Borno State',    icon: '🏕️', address: 'Behind UN House, Pompomari By-pass, Maiduguri',                                              email: 'borno@cbi.ngo',   phone: '+234 (0) 915 469 2357', tel: '+2349154692357' },
              { city: 'Yola',      state: 'Adamawa State',  icon: '🌿', address: 'No. 6, Opp. Dunamis Church, Bature, Yola North',                                            email: 'adamawa@cbi.ngo', phone: '+234 (0) 915 469 2360', tel: '+2349154692360' },
              { city: 'Damaturu', state: 'Yobe State',      icon: '🌾', address: "Muhammad Buhari Way, DonEtiebet Ext., Behind Mai Riga's House, Damaturu",                   email: 'yobe@cbi.ngo',    phone: '+234 (0) 915 469 2355', tel: '+2349154692355' },
              { city: 'Bauchi',   state: 'Bauchi State',    icon: '🏔️', address: 'No. 12 Dass Park, Behind Larema Hotel, Opp. Christ Embassy Church, New GRA, Bauchi',      email: 'bauchi@cbi.ngo',  phone: '+234 (0) 915 469 2348', tel: '+2349154692348' },
              { city: 'Gusau',    state: 'Zamfara State',   icon: '🌅', address: "White House, Behind Governor's House, GRA, Gusau, Zamfara",                                 email: 'zamfara@cbi.ngo', phone: '+234 (0) 915 349 3300', tel: '+2349153493300' },
              { city: 'Sokoto',   state: 'Sokoto State',    icon: '🕌', address: 'No. 31, Alero Road, Opp. Magistrate Court, Runji Sambo, Sokoto',                           email: 'sokoto@cbi.ngo',  phone: '+234 (0) 915 349 3344', tel: '+2349153493344' },
            ].map(o => (
              <div key={o.city} className="office-card office-field">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <span style={{
                      display: 'inline-block', background: '#eef0ff', color: '#0102F1',
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '3px 10px', borderRadius: 100, marginBottom: 8,
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                    }}>Field Office</span>
                    <h3 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 18, fontWeight: 700, color: '#010278', margin: 0, letterSpacing: '-0.01em' }}>{o.city}</h3>
                    <p style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 11, color: '#94a3b8', margin: '2px 0 0', letterSpacing: '0.04em' }}>{o.state}</p>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{o.icon}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12, marginTop: 1, flexShrink: 0, color: '#64748b' }}>📍</span>
                    <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 12.5, color: '#475569', lineHeight: 1.5 }}>{o.address}</span>
                  </div>
                  <div style={{ height: 1, background: '#f1f5f9' }} />
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, flexShrink: 0 }}>✉️</span>
                    <a href={`mailto:${o.email}`} style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 12.5, color: '#0102F1', fontWeight: 600, textDecoration: 'none' }}>{o.email}</a>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, flexShrink: 0 }}>📞</span>
                    <a href={`tel:${o.tel}`} style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 12.5, color: '#374151', fontWeight: 500, textDecoration: 'none' }}>{o.phone}</a>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ── Interactive Map (full width below offices) ── */}
        <div className="map-wrap">
          <CbiMap />
        </div>

        <style>{`
          .contact-wrap { padding: 80px 80px 100px; }
          .offices-wrap { max-width: 1200px; margin: 64px auto 0; padding: 0 80px; }
          .offices-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
          }
          .office-hq {
            grid-column: span 1;
            background: linear-gradient(140deg, #010278 0%, #0102F1 100%);
            border-radius: 18px;
            padding: 26px;
            box-shadow: 0 12px 40px rgba(1,2,241,0.22);
          }
          .office-field {
            background: white;
            border: 1.5px solid #e8edf4;
            border-radius: 16px;
            padding: 22px;
            transition: box-shadow 200ms, border-color 200ms, transform 200ms;
          }
          .office-field:hover {
            border-color: #0102F1;
            box-shadow: 0 8px 32px rgba(1,2,241,0.10);
            transform: translateY(-2px);
          }
          .map-wrap { max-width: 1200px; margin: 44px auto 0; padding: 0 80px; }
          @media (max-width: 1100px) {
            .offices-wrap { padding: 0 40px; }
            .map-wrap { padding: 0 40px; }
          }
          @media (max-width: 900px) {
            .offices-grid { grid-template-columns: 1fr 1fr; }
          }
          @media (max-width: 860px) {
            .contact-wrap { padding: 56px 28px 80px !important; }
            .offices-wrap { padding: 0 28px; margin-top: 48px; }
            .map-wrap { padding: 0 28px; }
          }
          @media (max-width: 560px) {
            .offices-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 520px) {
            .contact-wrap { padding: 40px 16px 60px !important; }
            .offices-wrap { padding: 0 16px; margin-top: 36px; }
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
