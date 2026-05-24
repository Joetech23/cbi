import { NextRequest, NextResponse } from 'next/server'

/**
 * Contact form delivery endpoint.
 *
 * Delivers to admin@cbi.ngo. Tries providers in this order:
 *   1. Resend  — if  RESEND_API_KEY  is set
 *   2. FormSubmit — fallback that works without any API key
 *                  (first submission triggers a one-time activation email
 *                  that admin@cbi.ngo must click to enable)
 *
 * To upgrade to Resend (recommended for production):
 *   1. Sign up at https://resend.com
 *   2. Verify the cbi.ngo domain
 *   3. Add to .env.local:
 *        RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
 *        CONTACT_FROM_EMAIL=contact-form@cbi.ngo
 */

const TO_EMAIL    = 'admin@cbi.ngo'
const FROM_FALLBACK = 'contact-form@cbi.ngo'

interface Payload {
  name:    string
  email:   string
  subject: string
  message: string
  // honeypot: must stay empty
  website?: string
}

function validate(body: Partial<Payload>): { ok: true; data: Payload } | { ok: false; error: string } {
  if (body.website && body.website.length > 0) {
    return { ok: false, error: 'Spam detected' }
  }
  const name    = (body.name    ?? '').trim()
  const email   = (body.email   ?? '').trim()
  const subject = (body.subject ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || name.length < 2)         return { ok: false, error: 'Please enter your name.' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                         return { ok: false, error: 'Please enter a valid email address.' }
  if (!subject)                          return { ok: false, error: 'Please pick a subject.' }
  if (!message || message.length < 10)   return { ok: false, error: 'Message is too short.' }
  if (message.length > 5000)             return { ok: false, error: 'Message is too long (max 5000 characters).' }

  return { ok: true, data: { name, email, subject, message } }
}

function buildEmail(d: Payload) {
  const subject = `[CBI Website] ${d.subject} — ${d.name}`

  const text = [
    `New contact-form submission`,
    `─────────────────────────────`,
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    `Subject: ${d.subject}`,
    ``,
    `Message:`,
    d.message,
    ``,
    `─────────────────────────────`,
    `Sent via cbi.ngo/contact`,
  ].join('\n')

  const html = `
<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:24px;color:#1e293b;margin:0">
  <div style="max-width:560px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;border:1px solid rgba(1,2,241,0.08)">
    <div style="background:linear-gradient(135deg,#0102F1 0%,#010278 100%);padding:18px 24px;color:white">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7">New Message · cbi.ngo</div>
      <div style="font-size:18px;font-weight:700;margin-top:4px">${escapeHtml(d.subject)}</div>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;margin-bottom:18px">
        <tr><td style="padding:6px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:80px">From</td>
            <td style="padding:6px 0;font-weight:600">${escapeHtml(d.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Email</td>
            <td style="padding:6px 0"><a href="mailto:${escapeHtml(d.email)}" style="color:#0102F1;text-decoration:none">${escapeHtml(d.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Subject</td>
            <td style="padding:6px 0">${escapeHtml(d.subject)}</td></tr>
      </table>
      <div style="border-top:1px solid #e2e8f0;padding-top:18px">
        <div style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px">Message</div>
        <div style="white-space:pre-wrap;line-height:1.65;font-size:14.5px">${escapeHtml(d.message)}</div>
      </div>
    </div>
    <div style="padding:14px 24px;background:#f8fafc;color:#94a3b8;font-size:11px">
      Reply directly to this email to respond to ${escapeHtml(d.name)}.
    </div>
  </div>
</body></html>`

  return { subject, text, html }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

/* ── Provider: Resend ───────────────────────────────────────────────── */
async function sendViaResend(d: Payload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'No Resend API key' }

  const { subject, text, html } = buildEmail(d)
  const from = process.env.CONTACT_FROM_EMAIL || FROM_FALLBACK

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        Authorization:   `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from:     `CBI Contact Form <${from}>`,
        to:       [TO_EMAIL],
        reply_to: d.email,
        subject,
        text,
        html,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Resend network error' }
  }
}

/* ── Provider: FormSubmit (zero-config fallback) ────────────────────── */
async function sendViaFormSubmit(d: Payload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept:         'application/json',
      },
      body: JSON.stringify({
        name:     d.name,
        email:    d.email,
        subject:  `[CBI Website] ${d.subject} — ${d.name}`,
        message:  d.message,
        _subject: `[CBI Website] ${d.subject} — ${d.name}`,
        _replyto: d.email,
        _template: 'table',
        _captcha: 'false',
      }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json.success === 'false') {
      return { ok: false, error: json.message || `FormSubmit ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'FormSubmit network error' }
  }
}

/* ── Route handler ──────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  let body: Partial<Payload>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const v = validate(body)
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 })

  // Try providers in order
  const providers = [
    { name: 'resend',     fn: () => sendViaResend(v.data) },
    { name: 'formsubmit', fn: () => sendViaFormSubmit(v.data) },
  ]

  const errors: string[] = []
  for (const p of providers) {
    const r = await p.fn()
    if (r.ok) {
      return NextResponse.json({ ok: true, provider: p.name })
    }
    errors.push(`${p.name}: ${r.error}`)
  }

  console.error('[contact] all providers failed:', errors)
  return NextResponse.json(
    { ok: false, error: 'Unable to deliver your message right now. Please email admin@cbi.ngo directly.' },
    { status: 502 }
  )
}

export const runtime = 'nodejs'
