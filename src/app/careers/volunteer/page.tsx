'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Check, ChevronLeft, ChevronRight, Upload, FileText, X,
  Loader2, PartyPopper, AlertCircle, User, Phone, Briefcase, GraduationCap,
  ClipboardCheck,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   Config
───────────────────────────────────────────────────────────── */
const ENDPOINT = process.env.NEXT_PUBLIC_VOLUNTEER_ENDPOINT || ''
const DEADLINE = '7th July, 2026'

/* ─────────────────────────────────────────────────────────────
   Options
───────────────────────────────────────────────────────────── */
const GENDER        = ['Male', 'Female', 'Prefer not to say']
const PWD           = ['Yes', 'No', 'Maybe']
const BEST_TIME     = ['Morning', 'Afternoon', 'Evening']
const POSITIONS     = [
  'Health Assistant', 'Nutrition Assistant', 'WASH Assistant', 'Education Assistant',
  'Protection Assistant', 'Food Security & Livelihood Assistant', 'Admin Assistant', 'Media Assistant',
]
const QUALIFICATIONS = ['Bachelors', 'Diploma', 'N.C.E.', 'A Level', 'O Level', 'Other']
const CERTS          = ['Yes', 'No']
const PRIMARY_STATES = ['Sokoto', 'Zamfara', 'Kebbi', 'Katsina']
const NG_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
]

const STEPS = [
  { label: 'Personal',  icon: User },
  { label: 'Contact',   icon: Phone },
  { label: 'Role',      icon: Briefcase },
  { label: 'Documents', icon: GraduationCap },
  { label: 'Review',    icon: ClipboardCheck },
]

const BLANK = {
  name: '', surname: '', middleName: '', email: '', gender: '', pwd: '',
  state: '', stateOther: '', bestTime: '', phone: '',
  position: '', why: '',
  qualification: '', qualificationOther: '', certifications: '', certificationsOther: '',
}
type FormState = typeof BLANK

const MAX_MB = 10
const ACCEPT = '.pdf,.doc,.docx'

/* ─────────────────────────────────────────────────────────────
   Small UI primitives
───────────────────────────────────────────────────────────── */
const C = { blue: '#0102F1', navy: '#010278', orange: '#ff8400', ink: '#0f172a', sub: '#64748b', line: 'rgba(1,2,241,0.12)' }
const F = "var(--font-jakarta, sans-serif)"

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{ display: 'block', fontFamily: F, fontSize: 13.5, fontWeight: 700, color: C.ink, marginBottom: 8 }}>
      {children}{required && <span style={{ color: C.orange, marginLeft: 3 }}>*</span>}
    </label>
  )
}

function TextField({ value, onChange, placeholder, type = 'text', list }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; list?: string
}) {
  return (
    <input
      type={type} value={value} list={list}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '13px 16px', borderRadius: 10,
        border: `1.5px solid ${C.line}`, background: '#fff',
        fontFamily: F, fontSize: 14.5, color: C.ink, outline: 'none',
        transition: 'border-color 150ms, box-shadow 150ms',
      }}
      onFocus={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,2,241,0.10)' }}
      onBlur={e => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.boxShadow = 'none' }}
    />
  )
}

function ChipGroup({ options, value, onChange, columns }: {
  options: string[]; value: string; onChange: (v: string) => void; columns?: number
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns || 3}, 1fr)`, gap: 10 }} className="chip-grid">
      {options.map(opt => {
        const on = value === opt
        return (
          <button key={opt} type="button" onClick={() => onChange(opt)} style={{
            padding: '12px 14px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
            border: `1.5px solid ${on ? C.blue : C.line}`,
            background: on ? 'rgba(1,2,241,0.06)' : '#fff',
            color: on ? C.blue : C.ink,
            fontFamily: F, fontSize: 13.5, fontWeight: on ? 700 : 500,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
            transition: 'all 150ms',
          }}>
            <span>{opt}</span>
            <span style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
              border: `2px solid ${on ? C.blue : '#cbd5e1'}`,
              background: on ? C.blue : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{on && <Check size={11} color="#fff" strokeWidth={3} />}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function VolunteerPage() {
  const [step,    setStep]    = useState(0)
  const [form,    setForm]    = useState<FormState>(BLANK)
  const [file,    setFile]    = useState<File | null>(null)
  const [fileErr, setFileErr] = useState('')
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errMsg,  setErrMsg]  = useState('')
  const [drag,    setDrag]    = useState(false)
  const [draftNote, setDraftNote] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const set = (k: keyof FormState, v: string) => setForm(f => ({ ...f, [k]: v }))

  /* ── Draft autosave ── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cbi-volunteer-draft')
      if (saved) setForm({ ...BLANK, ...JSON.parse(saved) })
    } catch {}
  }, [])
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem('cbi-volunteer-draft', JSON.stringify(form))
        if (Object.values(form).some(Boolean)) { setDraftNote(true); setTimeout(() => setDraftNote(false), 1600) }
      } catch {}
    }, 600)
    return () => clearTimeout(t)
  }, [form])

  /* ── File handling ── */
  const handleFile = useCallback((f: File | undefined | null) => {
    setFileErr('')
    if (!f) return
    const okType = /\.(pdf|docx?|)$/i.test(f.name) || ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(f.type)
    if (!okType) { setFileErr('Please upload a PDF or Word document.'); return }
    if (f.size > MAX_MB * 1024 * 1024) { setFileErr(`File is too large. Max ${MAX_MB} MB.`); return }
    setFile(f)
  }, [])

  /* ── Validation ── */
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  const stepValid = (s: number): boolean => {
    switch (s) {
      case 0: return !!form.name.trim() && !!form.surname.trim() && emailOk && !!form.gender
      case 1: return !!(form.state === 'Other' ? form.stateOther.trim() : form.state)
      case 2: return !!form.position && !!form.why.trim()
      case 3: return !!(form.qualification === 'Other' ? form.qualificationOther.trim() : form.qualification) && !!file
      case 4: return true
      default: return false
    }
  }
  const canNext = stepValid(step)

  const next = () => { if (canNext && step < STEPS.length - 1) setStep(s => s + 1) }
  const back = () => setStep(s => Math.max(0, s - 1))

  /* ── Submit ── */
  const fileToBase64 = (f: File) => new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result).split(',')[1] || '')
    r.onerror = reject
    r.readAsDataURL(f)
  })

  const submit = async () => {
    if (!stepValid(3)) { setStep(3); return }
    setStatus('submitting'); setErrMsg('')
    try {
      const fileData = file ? await fileToBase64(file) : ''
      const payload = {
        ...form,
        state: form.state === 'Other' ? form.stateOther : form.state,
        qualification: form.qualification === 'Other' ? form.qualificationOther : form.qualification,
        certifications: form.certifications === 'Other' ? form.certificationsOther : form.certifications,
        fileName: file?.name || '', fileMime: file?.type || 'application/octet-stream', fileData,
        submittedAt: new Date().toISOString(),
      }
      if (!ENDPOINT) throw new Error('Submission endpoint is not configured yet. Please set NEXT_PUBLIC_VOLUNTEER_ENDPOINT.')

      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      // Apps Script may return an opaque/redirected response — reaching here without a
      // network error means the row + file were accepted.
      localStorage.removeItem('cbi-volunteer-draft')
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  /* ── Success screen ── */
  if (status === 'success') {
    return (
      <main style={{ background: '#f8fafc', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <div style={{ maxWidth: 540, textAlign: 'center', background: '#fff', borderRadius: 20, padding: '56px 40px', border: `1px solid ${C.line}`, boxShadow: '0 20px 60px rgba(1,2,241,0.10)' }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(22,163,74,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <PartyPopper size={34} color="#16a34a" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 28, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Application received!</h1>
          <p style={{ fontFamily: F, fontSize: 15, color: C.sub, lineHeight: 1.7, marginBottom: 28 }}>
            Thank you for offering your time to Care Best Initiative. Your application and CV have been submitted successfully. Our team will review it and reach out to shortlisted volunteers.
          </p>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: C.blue, color: '#fff', borderRadius: 10, fontFamily: F, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  const pct = (step / (STEPS.length - 1)) * 100

  return (
    <main style={{ background: '#f8fafc' }}>
      {/* ── Header band ── */}
      <section style={{ background: `linear-gradient(120deg, ${C.navy} 0%, ${C.blue} 100%)`, padding: '54px 24px 90px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: F, fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', marginBottom: 20 }}>
            <ChevronLeft size={15} /> Back to Careers
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,132,0,0.16)', border: '1px solid rgba(255,132,0,0.45)', borderRadius: 100, padding: '5px 14px', marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.orange }} />
            <span style={{ fontFamily: F, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.orange }}>Call for Volunteers · Deadline {DEADLINE}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.02em', margin: 0 }}>
            Volunteer with <em style={{ fontStyle: 'italic', color: C.orange }}>Care Best Initiative</em>
          </h1>
          <div style={{ maxWidth: 660, display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
            <p style={{ fontFamily: F, fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75 }}>
              Care Best Initiative is a women-led and youth-driven non-governmental and not-for-profit organization, founded in 2019 and presently operational in states across the North-East, North-Central and North-West regions of Nigeria, with plans to expand our reach. We&apos;re passionate about saving lives, alleviating the suffering of children, youth, women, and other vulnerable people; as well as maintaining human dignity and supporting the resilience of individuals and communities affected by crises, poverty and inequality.
            </p>
            <p style={{ fontFamily: F, fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75 }}>
              We believe that every individual deserves dignity, respect and the opportunity to thrive; hence, we&apos;re committed to providing humanitarian aid services, fostering human capital development and strengthening systems to empower vulnerable individuals and communities.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.orange }}>Application Deadline: {DEADLINE}</span>
              <a href="https://www.cbi.ngo" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                www.cbi.ngo <ChevronRight size={13} />
              </a>
            </div>
            <p style={{ fontFamily: F, fontSize: 12.5, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
              The form takes about 4 minutes — your progress saves automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ── Form card ── */}
      <section style={{ padding: '0 20px 90px', marginTop: -56, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 820, margin: '0 auto', background: '#fff', borderRadius: 20, border: `1px solid ${C.line}`, boxShadow: '0 24px 70px rgba(1,2,40,0.14)', overflow: 'hidden' }}>

          {/* Progress */}
          <div style={{ padding: '26px 32px 0' }}>
            <div className="vol-steps" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              {STEPS.map((s, i) => {
                const done = i < step, active = i === step
                const Icon = s.icon
                return (
                  <button key={s.label} type="button"
                    onClick={() => { if (i < step) setStep(i) }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                      background: 'none', border: 'none', flex: 1,
                      cursor: i < step ? 'pointer' : 'default',
                    }}>
                    <span style={{
                      width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: done ? '#16a34a' : active ? C.blue : '#eef1f6',
                      color: done || active ? '#fff' : '#94a3b8',
                      transition: 'all 200ms', boxShadow: active ? '0 4px 14px rgba(1,2,241,0.35)' : 'none',
                    }}>{done ? <Check size={17} strokeWidth={3} /> : <Icon size={17} />}</span>
                    <span className="vol-step-label" style={{
                      fontFamily: F, fontSize: 11, fontWeight: active ? 700 : 600,
                      color: active ? C.blue : done ? '#16a34a' : '#94a3b8',
                    }}>{s.label}</span>
                  </button>
                )
              })}
            </div>
            <div style={{ height: 6, background: '#eef1f6', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${C.blue}, ${C.orange})`, borderRadius: 100, transition: 'width 350ms cubic-bezier(0.16,1,0.3,1)' }} />
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '30px 32px 8px' }} key={step} className="vol-fade">

            {/* STEP 0 — Personal */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Personal details" sub="Tell us a little about yourself." />
                <div className="vol-row">
                  <div><Label required>First Name</Label><TextField value={form.name} onChange={v => set('name', v)} placeholder="e.g. Aisha" /></div>
                  <div><Label required>Surname</Label><TextField value={form.surname} onChange={v => set('surname', v)} placeholder="e.g. Bello" /></div>
                </div>
                <div className="vol-row">
                  <div><Label>Middle Name</Label><TextField value={form.middleName} onChange={v => set('middleName', v)} placeholder="Optional" /></div>
                  <div><Label required>Email</Label><TextField type="email" value={form.email} onChange={v => set('email', v)} placeholder="you@example.com" /></div>
                </div>
                <div><Label required>Gender</Label><ChipGroup options={GENDER} value={form.gender} onChange={v => set('gender', v)} columns={3} /></div>
                <div><Label>Person with disability (PWD)?</Label><ChipGroup options={PWD} value={form.pwd} onChange={v => set('pwd', v)} columns={3} /></div>
              </div>
            )}

            {/* STEP 1 — Contact */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Contact information" sub="Where you're applying and how to reach you." />
                <div>
                  <Label required>State Applying For</Label>
                  <ChipGroup options={[...PRIMARY_STATES, 'Other']} value={form.state} onChange={v => set('state', v)} columns={3} />
                  {form.state === 'Other' && (
                    <div style={{ marginTop: 12 }}>
                      <TextField value={form.stateOther} onChange={v => set('stateOther', v)} placeholder="Start typing your state…" list="ng-states" />
                      <datalist id="ng-states">{NG_STATES.map(s => <option key={s} value={s} />)}</datalist>
                    </div>
                  )}
                </div>
                <div className="vol-row">
                  <div><Label>Phone Number</Label><TextField type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="e.g. 0801 234 5678" /></div>
                  <div><Label>Best time to contact you</Label><ChipGroup options={BEST_TIME} value={form.bestTime} onChange={v => set('bestTime', v)} columns={3} /></div>
                </div>
              </div>
            )}

            {/* STEP 2 — Role */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Your role" sub="Pick the position that fits you best." />
                <div><Label required>What position are you applying for?</Label><ChipGroup options={POSITIONS} value={form.position} onChange={v => set('position', v)} columns={2} /></div>
                <div>
                  <Label required>Why do you want to volunteer with CBI?</Label>
                  <textarea
                    value={form.why} onChange={e => set('why', e.target.value)}
                    rows={5} placeholder="Share what motivates you to serve…"
                    style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: `1.5px solid ${C.line}`, fontFamily: F, fontSize: 14.5, color: C.ink, outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
                    onFocus={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,2,241,0.10)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 3 — Documents */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Qualifications & CV" sub="Your education and supporting documents." />
                <div>
                  <Label required>Highest academic qualification</Label>
                  <ChipGroup options={QUALIFICATIONS} value={form.qualification} onChange={v => set('qualification', v)} columns={3} />
                  {form.qualification === 'Other' && (
                    <div style={{ marginTop: 12 }}><TextField value={form.qualificationOther} onChange={v => set('qualificationOther', v)} placeholder="Specify your qualification" /></div>
                  )}
                </div>
                <div>
                  <Label>Do you possess any relevant professional certifications?</Label>
                  <ChipGroup options={[...CERTS, 'Other']} value={form.certifications} onChange={v => set('certifications', v)} columns={3} />
                  {form.certifications === 'Other' && (
                    <div style={{ marginTop: 12 }}><TextField value={form.certificationsOther} onChange={v => set('certificationsOther', v)} placeholder="List your certifications" /></div>
                  )}
                </div>
                <div>
                  <Label required>Upload your CV / supporting documents</Label>
                  {!file ? (
                    <div
                      onClick={() => fileInput.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDrag(true) }}
                      onDragLeave={() => setDrag(false)}
                      onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]) }}
                      style={{
                        border: `2px dashed ${drag ? C.blue : C.line}`, borderRadius: 14,
                        padding: '34px 20px', textAlign: 'center', cursor: 'pointer',
                        background: drag ? 'rgba(1,2,241,0.04)' : '#fafbff', transition: 'all 150ms',
                      }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(1,2,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                        <Upload size={20} color={C.blue} />
                      </div>
                      <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 4 }}>Click to upload or drag & drop</p>
                      <p style={{ fontFamily: F, fontSize: 12, color: C.sub }}>PDF or Word document · Max {MAX_MB} MB</p>
                      <input ref={fileInput} type="file" accept={ACCEPT} hidden onChange={e => handleFile(e.target.files?.[0])} />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 12, border: `1.5px solid ${C.blue}`, background: 'rgba(1,2,241,0.04)' }}>
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FileText size={20} color={C.blue} />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ fontFamily: F, fontSize: 13.5, fontWeight: 700, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                        <p style={{ fontFamily: F, fontSize: 11.5, color: C.sub }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button type="button" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = '' }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 6, flexShrink: 0 }}><X size={18} /></button>
                    </div>
                  )}
                  {fileErr && <p style={{ fontFamily: F, fontSize: 12.5, color: '#dc2626', marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={13} /> {fileErr}</p>}
                </div>
              </div>
            )}

            {/* STEP 4 — Review */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Review & submit" sub="Double-check your details before sending." />
                <div style={{ borderRadius: 14, border: `1px solid ${C.line}`, overflow: 'hidden' }}>
                  {[
                    ['Full name', [form.name, form.middleName, form.surname].filter(Boolean).join(' ')],
                    ['Email', form.email],
                    ['Gender', form.gender],
                    ['PWD', form.pwd || '—'],
                    ['State', form.state === 'Other' ? form.stateOther : form.state],
                    ['Phone', form.phone || '—'],
                    ['Best time to contact', form.bestTime || '—'],
                    ['Position', form.position],
                    ['Qualification', form.qualification === 'Other' ? form.qualificationOther : form.qualification],
                    ['Certifications', (form.certifications === 'Other' ? form.certificationsOther : form.certifications) || '—'],
                    ['CV', file?.name || '—'],
                    ['Why volunteer', form.why],
                  ].map(([k, v], i) => (
                    <div key={k} style={{ display: 'flex', gap: 16, padding: '12px 18px', background: i % 2 ? '#fafbff' : '#fff', borderBottom: i < 11 ? `1px solid ${C.line}` : 'none' }}>
                      <span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: C.sub, width: 150, flexShrink: 0 }}>{k}</span>
                      <span style={{ fontFamily: F, fontSize: 13.5, color: C.ink, lineHeight: 1.55, wordBreak: 'break-word' }}>{v || '—'}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: F, fontSize: 12, color: C.sub, lineHeight: 1.6 }}>
                  By submitting, you agree to CBI processing your information for recruitment purposes. CBI is an equal-opportunity organisation.
                </p>
                {status === 'error' && (
                  <div style={{ display: 'flex', gap: 10, padding: '14px 16px', borderRadius: 10, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.25)' }}>
                    <AlertCircle size={18} color="#dc2626" style={{ flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontFamily: F, fontSize: 13, color: '#b91c1c', lineHeight: 1.5 }}>{errMsg}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 32px 28px', borderTop: `1px solid ${C.line}`, marginTop: 12 }}>
            <button type="button" onClick={back} disabled={step === 0} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 20px', borderRadius: 10,
              border: `1.5px solid ${C.line}`, background: '#fff', cursor: step === 0 ? 'not-allowed' : 'pointer',
              fontFamily: F, fontSize: 14, fontWeight: 700, color: step === 0 ? '#cbd5e1' : C.ink, opacity: step === 0 ? 0.6 : 1,
            }}><ChevronLeft size={16} /> Back</button>

            <span style={{ fontFamily: F, fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
              {draftNote && <><Check size={13} color="#16a34a" /> Draft saved</>}
            </span>

            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next} disabled={!canNext} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 26px', borderRadius: 10,
                border: 'none', cursor: canNext ? 'pointer' : 'not-allowed',
                background: canNext ? C.blue : '#cbd5e1', color: '#fff',
                fontFamily: F, fontSize: 14, fontWeight: 700,
                boxShadow: canNext ? '0 6px 18px rgba(1,2,241,0.30)' : 'none', transition: 'all 150ms',
              }}>Continue <ChevronRight size={16} /></button>
            ) : (
              <button type="button" onClick={submit} disabled={status === 'submitting'} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 10,
                border: 'none', cursor: status === 'submitting' ? 'wait' : 'pointer',
                background: C.orange, color: '#fff', fontFamily: F, fontSize: 14, fontWeight: 700,
                boxShadow: '0 6px 18px rgba(255,132,0,0.35)',
              }}>
                {status === 'submitting' ? <><Loader2 size={16} className="vol-spin" /> Submitting…</> : <>Submit Application <Check size={16} /></>}
              </button>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .vol-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @keyframes volFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .vol-fade { animation: volFade 280ms ease both; }
        @keyframes volSpin { to { transform: rotate(360deg); } }
        .vol-spin { animation: volSpin 800ms linear infinite; }
        @media (max-width: 600px) {
          .vol-row  { grid-template-columns: 1fr !important; }
          .chip-grid { grid-template-columns: 1fr 1fr !important; }
          .vol-step-label { display: none !important; }
        }
      `}</style>
    </main>
  )
}

function StepHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 22, fontWeight: 700, color: C.navy, margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
      <p style={{ fontFamily: F, fontSize: 13.5, color: C.sub, marginTop: 5 }}>{sub}</p>
    </div>
  )
}
