'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy, CheckCircle2, ChevronDown, CreditCard, Building2, Smartphone } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { useReveal } from '@/lib/reveal'
// Real bank logos in /public/images/banks

// Naira tiers — fixed amounts (NGN)
const TIERS = [
  { a: 10000,   label: '₦10,000',   t: 'Feed a family for a week — all seven of them.' },
  { a: 25000,   label: '₦25,000',   t: 'School supplies for 5 displaced children.' },
  { a: 50000,   label: '₦50,000',   t: 'Clean water for one household for a season.' },
  { a: 100000,  label: '₦100,000',  t: 'A complete healthcare kit for 10 beneficiaries.' },
  { a: 250000,  label: '₦250,000',  t: 'Sponsor an entire WASH outreach for a week.' },
  { a: 0,       label: 'Custom',    t: 'Every naira, every decision counts.' },
]

const TRUST = [
  '100% of program funds go directly to beneficiaries',
  'Verified by 35+ international partner organizations',
  'Quarterly impact reports sent to all donors',
  'Registered National NGO · Federal Republic of Nigeria',
  'Bank-grade secure payment via Paystack',
]

const BANK_ACCOUNTS = [
  {
    bank:    'First Bank of Nigeria',
    short:   'FirstBank',
    logo:    '/images/banks/firstbank-logo.png',
    name:    'Care Best Initiative',
    number:  '2032456789',
    type:    'Current Account (NGN)',
    swift:   'FBNINGLA',
    color:   '#003779',
  },
  {
    bank:    'Guaranty Trust Bank',
    short:   'GTBank',
    logo:    '/images/banks/gtb-logo.png',
    name:    'Care Best Initiative',
    number:  '0234567891',
    type:    'Current Account (NGN)',
    swift:   'GTBINGLA',
    color:   '#ea580c',
  },
  {
    bank:    'Guaranty Trust Bank — USD',
    short:   'GTBank USD',
    logo:    '/images/banks/gtb-logo.png',
    name:    'Care Best Initiative',
    number:  '0234567892',
    type:    'Domiciliary Account (USD)',
    swift:   'GTBINGLA',
    color:   '#ea580c',
  },
]

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked */ }
  }
  return (
    <button onClick={copy} aria-label="Copy" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 8,
      border: '1px solid rgba(1,2,241,0.15)',
      background: copied ? '#dcfce7' : 'white',
      color: copied ? '#15803d' : '#0102F1',
      fontFamily: 'var(--font-jakarta, sans-serif)',
      fontSize: 11, fontWeight: 700, cursor: 'pointer',
      letterSpacing: '0.06em', textTransform: 'uppercase',
      transition: 'all 180ms',
    }}>
      {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function BankRow({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, padding: '12px 0',
      borderBottom: '1px dashed rgba(1,2,241,0.1)',
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontSize: 10, fontWeight: 700, color: '#94a3b8',
          letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4,
        }}>{label}</div>
        <div style={{
          fontFamily: copyable ? 'var(--font-space, monospace)' : 'var(--font-jakarta, sans-serif)',
          fontSize: copyable ? 16 : 14, fontWeight: copyable ? 800 : 600,
          color: '#010278', letterSpacing: copyable ? '0.04em' : 0,
        }}>{value}</div>
      </div>
      {copyable && <CopyButton value={value} />}
    </div>
  )
}

export default function DonatePage() {
  const [sel, setSel]       = useState(25000)
  const [custom, setCustom] = useState('')
  const [method, setMethod] = useState<'card' | 'bank' | 'ussd'>('card')
  const [openBank, setOpenBank] = useState(0)
  const sectionRev = useReveal()

  const selectedTier = TIERS.find(t => t.a === sel || (sel === 0 && t.a === 0))
  const finalAmount = sel === 0 ? (custom ? `₦${Number(custom).toLocaleString()}` : '') : selectedTier?.label

  return (
    <>
      <PageHero
        tag="Make a Donation"
        headline="Your gift goes directly to the people who need it"
        emph="most."
        sub="100% of program funds reach beneficiaries. Donate securely in Naira via card, bank transfer, or USSD."
      />

      <section className="donate-section" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="donate-grid" style={{
            display: 'grid', gridTemplateColumns: '1.3fr 0.7fr',
            gap: 48, alignItems: 'start',
          }}>
            {/* Form */}
            <div ref={sectionRev.ref} className="donate-form" style={{
              background: 'white', borderRadius: 20, padding: 48,
              boxShadow: '0 4px 32px rgba(1,2,241,0.08)',
              border: '1px solid rgba(1,2,241,0.06)',
              opacity: sectionRev.visible ? 1 : 0,
              transform: sectionRev.visible ? 'none' : 'translateY(36px)',
              transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: 28, fontWeight: 700, color: '#000000',
                marginBottom: 8, letterSpacing: '-0.02em',
              }}>Choose Your Impact</h2>
              <p style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, color: '#94a3b8', marginBottom: 28,
              }}>All amounts in Nigerian Naira (₦).</p>

              {/* Tier grid */}
              <div className="donate-tier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
                {TIERS.map(t => {
                  const on = sel === t.a
                  return (
                    <div key={t.label} onClick={() => setSel(t.a)} style={{
                      padding: '16px 12px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                      border: on ? '2px solid #0102F1' : '1px solid #e2e8f0',
                      background: on ? '#e8e8ff' : 'white',
                      transform: on ? 'translateY(-2px)' : 'none',
                      boxShadow: on ? '0 6px 16px rgba(1,2,241,0.13)' : 'none',
                      transition: 'all 220ms cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-space, monospace)',
                        fontSize: t.label === 'Custom' ? 16 : 18,
                        fontWeight: 700,
                        color: on ? '#0102F1' : '#010278', marginBottom: 4,
                      }}>{t.label}</div>
                      <div style={{
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 10, color: on ? '#0102F1' : '#94a3b8', lineHeight: 1.4,
                      }}>{t.t.slice(0, 42)}{t.t.length > 42 ? '…' : ''}</div>
                    </div>
                  )
                })}
              </div>

              {/* Impact bar */}
              <div style={{
                background: '#fff3e0', border: '1px solid #ff8400',
                borderRadius: 10, padding: '14px 18px', marginBottom: 24,
                display: 'flex', alignItems: 'center', gap: 12,
                animation: 'fadeIn 300ms ease-out',
              }}>
                <CheckCircle2 size={18} color="#7a3d00" />
                <p style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 14, color: '#7a3d00', fontWeight: 600, lineHeight: 1.4,
                }}>{selectedTier?.t}</p>
              </div>

              {/* Custom amount */}
              {sel === 0 && (
                <div style={{ marginBottom: 24, animation: 'fadeIn 300ms ease-out' }}>
                  <label style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, fontWeight: 700, color: '#64748b',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    display: 'block', marginBottom: 8,
                  }}>Custom Amount (NGN)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute', left: 16, top: '50%',
                      transform: 'translateY(-50%)',
                      fontFamily: 'var(--font-space, monospace)',
                      fontSize: 18, fontWeight: 700, color: '#94a3b8',
                    }}>₦</span>
                    <input
                      type="number" value={custom} onChange={e => setCustom(e.target.value)}
                      placeholder="0"
                      style={{
                        width: '100%', padding: '14px 16px 14px 36px', borderRadius: 10,
                        border: '1px solid #e2e8f0', fontSize: 17,
                        fontFamily: 'var(--font-space, monospace)', fontWeight: 700,
                        outline: 'none', boxSizing: 'border-box',
                        transition: 'border-color 180ms',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#0102F1')}
                      onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                    />
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 11, fontWeight: 700, color: '#64748b',
                  letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10,
                }}>Payment Method</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                  {[
                    { id: 'card', label: 'Card',  icon: CreditCard },
                    { id: 'bank', label: 'Bank',  icon: Building2  },
                    { id: 'ussd', label: 'USSD',  icon: Smartphone },
                  ].map(m => {
                    const on = method === m.id
                    const Icon = m.icon
                    return (
                      <button key={m.id} onClick={() => setMethod(m.id as 'card' | 'bank' | 'ussd')} style={{
                        padding: '14px 12px', borderRadius: 10, cursor: 'pointer',
                        border: on ? '2px solid #0102F1' : '1px solid #e2e8f0',
                        background: on ? '#e8e8ff' : 'white',
                        fontFamily: 'var(--font-jakarta, sans-serif)',
                        fontSize: 13, fontWeight: 700,
                        color: on ? '#0102F1' : '#64748b',
                        transition: 'all 150ms',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: 6,
                      }}>
                        <Icon size={18} />
                        {m.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Card / USSD CTA — links to Paystack */}
              {method !== 'bank' && (
                <div style={{ animation: 'fadeIn 300ms ease-out' }}>
                  {/* Paystack badge */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: '#f0fdf4', border: '1px solid #bbf7d0',
                    borderRadius: 10, padding: '10px 16px', marginBottom: 14,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#0a9e5c"/>
                      <path d="M8 12.5l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 12, fontWeight: 600, color: '#15803d',
                    }}>
                      Secured by <strong>Paystack</strong> — bank-grade encryption
                    </span>
                  </div>

                  <a
                    href="https://paystack.com/pay/cbidonation"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      width: '100%', padding: 17,
                      background: '#0102F1', color: 'white',
                      borderRadius: 12, fontSize: 16, fontWeight: 700,
                      textDecoration: 'none',
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      boxShadow: '0 4px 16px rgba(1,2,241,0.2)',
                      transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = '#3335f3'
                      el.style.transform = 'translateY(-2px)'
                      el.style.boxShadow = '0 10px 28px rgba(1,2,241,0.35)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = '#0102F1'
                      el.style.transform = 'none'
                      el.style.boxShadow = '0 4px 16px rgba(1,2,241,0.2)'
                    }}
                  >
                    <span>Donate {finalAmount || ''} via Paystack</span>
                    <span style={{ color: '#ff8400' }}>→</span>
                  </a>
                </div>
              )}

              {/* Bank transfer accordion */}
              {method === 'bank' && (
                <div style={{ animation: 'fadeIn 300ms ease-out' }}>
                  <div style={{
                    background: '#e8e8ff', borderRadius: 12,
                    padding: '16px 20px', marginBottom: 16,
                    border: '1px solid rgba(1,2,241,0.15)',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 13, color: '#0102F1', fontWeight: 600, lineHeight: 1.55,
                    }}>
                      💙 Transfer <strong>{finalAmount || 'your amount'}</strong> to any of these accounts. Email <strong>info@cbi.ngo</strong> with your proof of payment.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {BANK_ACCOUNTS.map((b, i) => {
                      const on = openBank === i
                      return (
                        <div key={b.bank} style={{
                          borderRadius: 12, border: '1px solid rgba(1,2,241,0.1)',
                          overflow: 'hidden', background: 'white',
                          transition: 'all 220ms',
                          boxShadow: on ? '0 8px 24px rgba(1,2,241,0.10)' : '0 1px 4px rgba(1,2,241,0.04)',
                        }}>
                          <button onClick={() => setOpenBank(on ? -1 : i)} style={{
                            width: '100%', padding: '14px 16px', background: 'transparent',
                            border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 14,
                          }}>
                            <div style={{
                              width: 52, height: 38, borderRadius: 8,
                              background: 'white',
                              border: '1px solid rgba(1,2,241,0.08)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              padding: 6, flexShrink: 0, position: 'relative',
                            }}>
                              <Image
                                src={b.logo} alt={b.short}
                                fill sizes="52px"
                                style={{ objectFit: 'contain', padding: 6 }}
                              />
                            </div>
                            <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                              <div style={{
                                fontFamily: 'var(--font-jakarta, sans-serif)',
                                fontSize: 13.5, fontWeight: 700, color: '#010278',
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              }}>{b.short}</div>
                              <div style={{
                                fontFamily: 'var(--font-space, monospace)',
                                fontSize: 12, color: '#64748b', marginTop: 2,
                                fontVariantNumeric: 'tabular-nums',
                              }}>{b.number}</div>
                            </div>
                            <ChevronDown size={18} color="#64748b" style={{
                              transform: on ? 'rotate(180deg)' : 'none',
                              transition: 'transform 220ms', flexShrink: 0,
                            }} />
                          </button>

                          {on && (
                            <div style={{
                              padding: '8px 20px 20px',
                              borderTop: '1px solid rgba(1,2,241,0.06)',
                              animation: 'slideDown 300ms cubic-bezier(0.16,1,0.3,1)',
                            }}>
                              <BankRow label="Account Name"   value={b.name} />
                              <BankRow label="Account Number" value={b.number} copyable />
                              <BankRow label="Bank Name"      value={b.short} />
                              <BankRow label="Account Type"   value={b.type} />
                              <BankRow label="SWIFT Code"     value={b.swift} copyable />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 12, color: '#94a3b8', marginTop: 18, lineHeight: 1.6,
                  }}>
                    Once your transfer is complete, send proof of payment to <a href="mailto:info@cbi.ngo" style={{ color: '#0102F1', textDecoration: 'none', fontWeight: 700 }}>info@cbi.ngo</a> and we&apos;ll send you an official receipt within 24 hours.
                  </p>
                </div>
              )}
            </div>

            {/* Trust sidebar */}
            <div>
              <div style={{
                background: 'white', borderRadius: 16, padding: 32, marginBottom: 20,
                border: '1px solid rgba(1,2,241,0.08)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 15, fontWeight: 700, color: '#000000', marginBottom: 20,
                }}>Why Give to CBI?</h3>
                {TRUST.map(s => (
                  <div key={s} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: '#dcfce7', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <span style={{ color: '#16a34a', fontSize: 10, fontWeight: 700 }}>✓</span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 13, color: '#64748b', lineHeight: 1.55,
                    }}>{s}</span>
                  </div>
                ))}
              </div>

              <div style={{
                background: '#010278', borderRadius: 16, padding: 28,
                position: 'relative', overflow: 'hidden',
              }}>
                <Image
                  src="/images/cbi-child-smiling.jpg"
                  alt="" aria-hidden="true" fill
                  style={{ objectFit: 'cover', opacity: 0.14 }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <blockquote style={{
                    fontFamily: 'var(--font-playfair, Georgia, serif)',
                    fontStyle: 'italic', fontSize: 19, color: 'white',
                    lineHeight: 1.55, margin: '0 0 14px',
                  }}>&ldquo;Your support is a direct investment in a child&apos;s chance at a dignified life.&rdquo;</blockquote>
                  <div style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600,
                  }}>— Rejoice Mark, Executive Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; max-height: 0;   transform: translateY(-8px); }
            to   { opacity: 1; max-height: 600px; transform: translateY(0); }
          }
          .donate-section { padding: 80px 80px; }
          @media (max-width: 900px) {
            .donate-section { padding: 48px 24px !important; }
            .donate-grid    { grid-template-columns: 1fr !important; gap: 32px !important; }
            .donate-form    { padding: 32px !important; }
          }
          @media (max-width: 520px) {
            .donate-section   { padding: 36px 16px !important; }
            .donate-form      { padding: 24px !important; border-radius: 16px !important; }
            .donate-tier-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </section>
    </>
  )
}
