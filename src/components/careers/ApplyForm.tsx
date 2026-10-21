'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Check, ChevronLeft, ChevronRight, Upload, FileText, X,
  Loader2, PartyPopper, AlertCircle, User, ShieldCheck, Briefcase,
  GraduationCap, ClipboardCheck,
} from 'lucide-react'
import type { Job } from '@/lib/jobs'

/* Reuses the volunteer endpoint unless a careers-specific one is set.
   Submissions carry formType so the Apps Script routes them to their own tab. */
const ENDPOINT =
  process.env.NEXT_PUBLIC_CAREERS_ENDPOINT ||
  process.env.NEXT_PUBLIC_VOLUNTEER_ENDPOINT ||
  ''

const GENDER     = ['Male', 'Female', 'Prefer not to say']
const EXPERIENCE = ['Less than 2 years', '2 – 3 years', '3 – 5 years', '6 – 9 years', '10+ years']
const QUALS      = ['HND', 'Bachelor’s', 'Master’s', 'PhD', 'Other']
const NG_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
]

const STEPS = [
  { label: 'Personal',    icon: User },
  { label: 'Eligibility', icon: ShieldCheck },
  { label: 'Experience',  icon: Briefcase },
  { label: 'Documents',   icon: GraduationCap },
  { label: 'Review',      icon: ClipboardCheck },
]

const BLANK = {
  name: '', surname: '', middleName: '', email: '', phone: '', gender: '',
  stateOfResidence: '',
  qualification: '', qualificationField: '', yearsExperience: '', currentRole: '',
  linkedin: '', startDate: '',
}
type FormState = typeof BLANK

const MAX_MB = 10

const C = {
  blue: '#0102F1', navy: '#010278', orange: '#ff8400',
  ink: '#0f172a', sub: '#64748b', line: 'rgba(1,2,241,0.12)',
}
const F = 'var(--font-jakarta, sans-serif)'

/* ── Primitives ── */
function Label({ children, required, hint }: { children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      <span style={{ fontFamily: F, fontSize: 13.5, fontWeight: 700, color: C.ink }}>
        {children}{required && <span style={{ color: C.orange, marginLeft: 3 }}>*</span>}
      </span>
      {hint && (
        <span style={{ display: 'block', fontFamily: F, fontSize: 12, color: C.sub, fontWeight: 500, marginTop: 3 }}>
          {hint}
        </span>
      )}
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
    <div className="chip-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns || 3}, 1fr)`, gap: 10 }}>
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

function StepHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 22, fontWeight: 700, color: C.navy, margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
      <p style={{ fontFamily: F, fontSize: 13.5, color: C.sub, marginTop: 5 }}>{sub}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Form
───────────────────────────────────────────────────────────── */
export default function ApplyForm({ job }: { job: Job }) {
  const draftKey = `cbi-apply-draft-${job.slug}`

  const [step,    setStep]    = useState(0)
  const [form,    setForm]    = useState<FormState>(BLANK)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [file,    setFile]    = useState<File | null>(null)
  const [fileErr, setFileErr] = useState('')
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errMsg,  setErrMsg]  = useState('')
  const [drag,    setDrag]    = useState(false)
  const [draftNote, setDraftNote] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const set = (k: keyof FormState, v: string) => setForm(f => ({ ...f, [k]: v }))
  const setAnswer = (k: string, v: string) => setAnswers(a => ({ ...a, [k]: v }))

  /* Draft autosave */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey)
      if (saved) {
        const p = JSON.parse(saved)
        setForm({ ...BLANK, ...(p.form || {}) })
        setAnswers(p.answers || {})
      }
    } catch { /* ignore */ }
  }, [draftKey])

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ form, answers }))
        if (Object.values(form).some(Boolean)) { setDraftNote(true); setTimeout(() => setDraftNote(false), 1600) }
      } catch { /* ignore */ }
    }, 600)
    return () => clearTimeout(t)
  }, [form, answers, draftKey])

  /* File handling */
  const accept = job.singlePdf ? '.pdf,application/pdf' : '.pdf,.doc,.docx'
  const handleFile = useCallback((f: File | undefined | null) => {
    setFileErr('')
    if (!f) return
    const isPdf = /\.pdf$/i.test(f.name) || f.type === 'application/pdf'
    const isDoc = /\.docx?$/i.test(f.name)
    if (job.singlePdf && !isPdf) {
      setFileErr('Please upload a PDF. Merge your CV and cover letter into one PDF first.'); return
    }
    if (!job.singlePdf && !isPdf && !isDoc) {
      setFileErr('Please upload a PDF or Word document.'); return
    }
    if (f.size > MAX_MB * 1024 * 1024) { setFileErr(`File is too large. Max ${MAX_MB} MB.`); return }
    setFile(f)
  }, [job.singlePdf])

  /* Validation */
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  const screeningComplete = job.screening.every(q => !q.required || !!answers[q.key])
  const stepValid = (s: number): boolean => {
    switch (s) {
      case 0: return !!form.name.trim() && !!form.surname.trim() && emailOk && !!form.phone.trim()
      case 1: return !!form.stateOfResidence.trim() && screeningComplete
      case 2: return !!form.qualification && !!form.qualificationField.trim() && !!form.yearsExperience
      case 3: return !!file
      case 4: return true
      default: return false
    }
  }
  const canNext = stepValid(step)
  const next = () => { if (canNext && step < STEPS.length - 1) setStep(s => s + 1) }
  const back = () => setStep(s => Math.max(0, s - 1))

  /* Submit */
  const fileToBase64 = (f: File) => new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result).split(',')[1] || '')
    r.onerror = reject
    r.readAsDataURL(f)
  })

  const submit = async () => {
    for (let i = 0; i < 4; i++) {
      if (!stepValid(i)) { setStep(i); return }
    }
    setStatus('submitting'); setErrMsg('')
    try {
      if (!ENDPOINT) throw new Error('Submission endpoint is not configured yet. Set NEXT_PUBLIC_CAREERS_ENDPOINT (or NEXT_PUBLIC_VOLUNTEER_ENDPOINT).')
      const fileData = file ? await fileToBase64(file) : ''
      const screeningText = job.screening
        .map(q => `${q.label} ${answers[q.key] || '—'}`)
        .join('\n')
      const payload = {
        formType: 'job-application',
        role: job.title,
        roleSlug: job.slug,
        ...form,
        screeningAnswers: screeningText,
        fileName: file?.name || '',
        fileMime: file?.type || 'application/pdf',
        fileData,
        submittedAt: new Date().toISOString(),
      }
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      localStorage.removeItem(draftKey)
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  /* Success */
  if (status === 'success') {
    return (
      <div style={{ background: '#f8fafc', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <div style={{ maxWidth: 540, textAlign: 'center', background: '#fff', borderRadius: 20, padding: '56px 40px', border: `1px solid ${C.line}`, boxShadow: '0 20px 60px rgba(1,2,241,0.10)' }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(22,163,74,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <PartyPopper size={34} color="#16a34a" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 28, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Application received</h1>
          <p style={{ fontFamily: F, fontSize: 15, color: C.sub, lineHeight: 1.7, marginBottom: 28 }}>
            Thank you for applying for the {job.title} role. Your application and document have been submitted. Applications are reviewed on a rolling basis — only shortlisted candidates will be contacted.
          </p>
          <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: C.blue, color: '#fff', borderRadius: 10, fontFamily: F, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Back to Careers
          </Link>
        </div>
      </div>
    )
  }

  const pct = (step / (STEPS.length - 1)) * 100

  return (
    <div style={{ background: '#f8fafc' }}>
      {/* Header band */}
      <section style={{ background: `linear-gradient(120deg, ${C.navy} 0%, ${C.blue} 100%)`, padding: '54px 24px 90px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link href={`/careers/${job.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: F, fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', marginBottom: 20 }}>
            <ChevronLeft size={15} /> Back to Job Advert
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,132,0,0.16)', border: '1px solid rgba(255,132,0,0.45)', borderRadius: 100, padding: '5px 14px', marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.orange }} />
            <span style={{ fontFamily: F, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.orange }}>
              Application · Closes {job.deadline}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.02em', margin: 0 }}>
            Apply — <em style={{ fontStyle: 'italic', color: C.orange }}>{job.title}</em>
          </h1>
          <p style={{ fontFamily: F, fontSize: 14.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginTop: 14, maxWidth: 620 }}>
            {job.location} · {job.duration}. The form takes about 4 minutes and your progress saves automatically. You will need your{' '}
            <strong style={{ color: '#fff' }}>
              {job.singlePdf ? 'CV and cover letter merged into a single PDF' : 'CV and cover letter'}
            </strong>.
          </p>
        </div>
      </section>

      {/* Form card */}
      <section style={{ padding: '0 20px 90px', marginTop: -56, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 820, margin: '0 auto', background: '#fff', borderRadius: 20, border: `1px solid ${C.line}`, boxShadow: '0 24px 70px rgba(1,2,40,0.14)', overflow: 'hidden' }}>

          {/* Progress */}
          <div style={{ padding: '26px 32px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              {STEPS.map((s, i) => {
                const done = i < step, active = i === step
                const Icon = s.icon
                return (
                  <button key={s.label} type="button" onClick={() => { if (i < step) setStep(i) }} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                    background: 'none', border: 'none', flex: 1, cursor: i < step ? 'pointer' : 'default',
                  }}>
                    <span style={{
                      width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: done ? '#16a34a' : active ? C.blue : '#eef1f6',
                      color: done || active ? '#fff' : '#94a3b8',
                      transition: 'all 200ms', boxShadow: active ? '0 4px 14px rgba(1,2,241,0.35)' : 'none',
                    }}>{done ? <Check size={17} strokeWidth={3} /> : <Icon size={17} />}</span>
                    <span className="apply-step-label" style={{
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

          <div style={{ padding: '30px 32px 8px' }} key={step} className="apply-fade">

            {/* STEP 0 — Personal */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Personal details" sub="How we identify and reach you." />
                <div className="apply-row">
                  <div><Label required>First Name</Label><TextField value={form.name} onChange={v => set('name', v)} placeholder="e.g. Musa" /></div>
                  <div><Label required>Surname</Label><TextField value={form.surname} onChange={v => set('surname', v)} placeholder="e.g. Ibrahim" /></div>
                </div>
                <div className="apply-row">
                  <div><Label>Middle Name</Label><TextField value={form.middleName} onChange={v => set('middleName', v)} placeholder="Optional" /></div>
                  <div><Label required>Email</Label><TextField type="email" value={form.email} onChange={v => set('email', v)} placeholder="you@example.com" /></div>
                </div>
                <div className="apply-row">
                  <div><Label required>Phone Number</Label><TextField type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="e.g. 0801 234 5678" /></div>
                  <div />
                </div>
                <div><Label>Gender</Label><ChipGroup options={GENDER} value={form.gender} onChange={v => set('gender', v)} columns={3} /></div>
              </div>
            )}

            {/* STEP 1 — Eligibility (role-specific) */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Eligibility" sub="A few questions specific to this role." />
                <div>
                  <Label required>State of residence</Label>
                  <TextField value={form.stateOfResidence} onChange={v => set('stateOfResidence', v)} placeholder="Start typing your state…" list="apply-ng-states" />
                  <datalist id="apply-ng-states">{NG_STATES.map(s => <option key={s} value={s} />)}</datalist>
                </div>
                {job.screening.map(q => (
                  <div key={q.key}>
                    <Label required={q.required} hint={q.hint}>{q.label}</Label>
                    <ChipGroup
                      options={q.options}
                      value={answers[q.key] || ''}
                      onChange={v => setAnswer(q.key, v)}
                      columns={q.options.length > 2 ? 3 : 2}
                    />
                    {q.warnOn && answers[q.key] === q.warnOn && q.warning && (
                      <div style={{ marginTop: 10, display: 'flex', gap: 9, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,132,0,0.07)', border: '1px solid rgba(255,132,0,0.35)' }}>
                        <AlertCircle size={16} color="#b35c00" style={{ flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontFamily: F, fontSize: 12.5, color: '#7a3d00', lineHeight: 1.55, margin: 0 }}>{q.warning}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* STEP 2 — Experience */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Qualifications & experience" sub="Your education and relevant background." />
                <div>
                  <Label required>Highest academic qualification</Label>
                  <ChipGroup options={QUALS} value={form.qualification} onChange={v => set('qualification', v)} columns={3} />
                </div>
                <div>
                  <Label required hint="e.g. Agronomy, Agricultural Extension, Mass Communication">Field of study</Label>
                  <TextField value={form.qualificationField} onChange={v => set('qualificationField', v)} placeholder="e.g. Agronomy" />
                </div>
                <div>
                  <Label required>Years of relevant experience</Label>
                  <ChipGroup options={EXPERIENCE} value={form.yearsExperience} onChange={v => set('yearsExperience', v)} columns={2} />
                </div>
                <div>
                  <Label>Current or most recent role and employer</Label>
                  <TextField value={form.currentRole} onChange={v => set('currentRole', v)} placeholder="e.g. Field Coordinator, XYZ Foundation" />
                </div>
              </div>
            )}

            {/* STEP 3 — Documents */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead
                  title="Your documents"
                  sub={job.singlePdf ? 'CV and cover letter must be merged into one PDF.' : 'Upload your CV and cover letter.'}
                />
                <div>
                  <Label required hint={job.singlePdf ? `One PDF containing your CV and cover letter. Max ${MAX_MB} MB.` : `PDF or Word document. Max ${MAX_MB} MB.`}>
                    {job.singlePdf ? 'CV + cover letter (single PDF)' : 'CV + cover letter'}
                  </Label>
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
                      <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 4 }}>Click to upload or drag &amp; drop</p>
                      <p style={{ fontFamily: F, fontSize: 12, color: C.sub }}>
                        {job.singlePdf ? 'PDF only' : 'PDF or Word'} · Max {MAX_MB} MB
                      </p>
                      <input ref={fileInput} type="file" accept={accept} hidden onChange={e => handleFile(e.target.files?.[0])} />
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
                <div className="apply-row">
                  <div><Label>LinkedIn or portfolio</Label><TextField value={form.linkedin} onChange={v => set('linkedin', v)} placeholder="Optional" /></div>
                  <div><Label>Earliest start date</Label><TextField type="date" value={form.startDate} onChange={v => set('startDate', v)} /></div>
                </div>
              </div>
            )}

            {/* STEP 4 — Review */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <StepHead title="Review & submit" sub="Check your details before sending." />
                <div style={{ borderRadius: 14, border: `1px solid ${C.line}`, overflow: 'hidden' }}>
                  {([
                    ['Applying for', job.title],
                    ['Full name', [form.name, form.middleName, form.surname].filter(Boolean).join(' ')],
                    ['Email', form.email],
                    ['Phone', form.phone],
                    ['Gender', form.gender || '—'],
                    ['State of residence', form.stateOfResidence],
                    ...job.screening.map(q => [q.label, answers[q.key] || '—'] as [string, string]),
                    ['Qualification', `${form.qualification} — ${form.qualificationField}`],
                    ['Experience', form.yearsExperience],
                    ['Current role', form.currentRole || '—'],
                    ['LinkedIn / portfolio', form.linkedin || '—'],
                    ['Earliest start', form.startDate || '—'],
                    ['Document', file?.name || '—'],
                  ] as [string, string][]).map(([k, v], i, arr) => (
                    <div key={k + i} style={{ display: 'flex', gap: 16, padding: '12px 18px', background: i % 2 ? '#fafbff' : '#fff', borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : 'none' }}>
                      <span style={{ fontFamily: F, fontSize: 12.5, fontWeight: 700, color: C.sub, width: 200, flexShrink: 0 }}>{k}</span>
                      <span style={{ fontFamily: F, fontSize: 13.5, color: C.ink, lineHeight: 1.55, wordBreak: 'break-word' }}>{v || '—'}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: F, fontSize: 12, color: C.sub, lineHeight: 1.6 }}>
                  By submitting, you agree to CBI processing your information for recruitment purposes. CBI is an equal-opportunity employer and has zero tolerance for sexual exploitation and abuse (PSEA). Only shortlisted candidates will be contacted.
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
                {status === 'submitting' ? <><Loader2 size={16} className="apply-spin" /> Submitting…</> : <>Submit Application <Check size={16} /></>}
              </button>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .apply-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @keyframes applyFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .apply-fade { animation: applyFade 280ms ease both; }
        @keyframes applySpin { to { transform: rotate(360deg); } }
        .apply-spin { animation: applySpin 800ms linear infinite; }
        @media (max-width: 600px) {
          .apply-row  { grid-template-columns: 1fr !important; }
          .chip-grid  { grid-template-columns: 1fr 1fr !important; }
          .apply-step-label { display: none !important; }
        }
      `}</style>
    </div>
  )
}
