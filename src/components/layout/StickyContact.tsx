'use client'

import { useState, useEffect, useRef } from 'react'

/* ──────────────────────────────────────────────────────────────
   StickyContact
   Floating bottom-right action buttons:
   - Phone (tel:)
   - Email (mailto:)
   - Chatbot (opens a small chat panel)

   The cluster expands from a single chat bubble. On wider
   screens you see all 3 buttons stacked. On mobile they
   tuck behind the main bubble until tapped.
─────────────────────────────────────────────────────────────── */

const PHONE = '+2349153493317'
const PHONE_DISPLAY = '+234 (0) 915 349 3317'
const EMAIL = 'admin@cbi.ngo'

interface ChatMessage {
  id:   number
  from: 'bot' | 'user'
  text: string
}

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 1,
  from: 'bot',
  text: "Hi there! 👋  I'm CBI's virtual assistant. How can we help you today? You can ask about our programs, donations, volunteering or partnerships.",
}

const QUICK_REPLIES = [
  'I want to donate',
  'How can I volunteer?',
  'Partnership opportunities',
  'Program information',
]

export default function StickyContact() {
  const [open, setOpen]       = useState(false)      // cluster open/closed
  const [chatOn, setChatOn]   = useState(false)      // chat panel open
  const [draft, setDraft]     = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE])
  const [hovered, setHovered] = useState<string | null>(null)
  const [teaser, setTeaser]   = useState(false)      // proactive prompt bubble
  const [teaserDone, setTeaserDone] = useState(false) // already shown this session

  const scrollRef = useRef<HTMLDivElement>(null)

  /* auto-scroll chat to newest */
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, chatOn])

  /* Proactive prompt: appears 7s after page load, once per session */
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('cbi_teaser_shown')) {
      setTeaserDone(true)
      return
    }
    const t = setTimeout(() => {
      // don't pop the teaser if the user already opened chat manually
      if (!chatOn && !teaserDone) {
        setTeaser(true)
        sessionStorage.setItem('cbi_teaser_shown', '1')
      }
    }, 7000)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Auto-hide the teaser after 15s if ignored */
  useEffect(() => {
    if (!teaser) return
    const t = setTimeout(() => setTeaser(false), 15000)
    return () => clearTimeout(t)
  }, [teaser])

  function dismissTeaser() {
    setTeaser(false)
    setTeaserDone(true)
  }

  function openChatFromTeaser() {
    dismissTeaser()
    setChatOn(true)
    setOpen(false)
  }

  function sendMessage(text: string) {
    const userMsg: ChatMessage = { id: Date.now(), from: 'user', text }
    setMessages(m => [...m, userMsg])
    setDraft('')

    /* canned bot reply after small delay */
    setTimeout(() => {
      const reply: ChatMessage = {
        id: Date.now() + 1,
        from: 'bot',
        text: `Thanks for reaching out! 🌟  A member of our team will respond shortly.  For urgent matters, please email ${EMAIL} or call ${PHONE_DISPLAY}.`,
      }
      setMessages(m => [...m, reply])
    }, 900)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = draft.trim()
    if (!v) return
    sendMessage(v)
  }

  /* shared sub-button style */
  function btnStyle(bg: string, hoverKey: string): React.CSSProperties {
    return {
      width:  52,
      height: 52,
      borderRadius: '50%',
      background: bg,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: 'pointer',
      boxShadow:  hovered === hoverKey
        ? '0 8px 24px rgba(0,0,0,0.28)'
        : '0 4px 14px rgba(0,0,0,0.18)',
      transform:  hovered === hoverKey ? 'translateY(-2px) scale(1.06)' : 'none',
      transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
      fontSize: 22,
      textDecoration: 'none',
      position: 'relative',
    }
  }

  /* tooltip that appears to the left of each button */
  const tooltipStyle = (key: string): React.CSSProperties => ({
    position: 'absolute',
    right: 'calc(100% + 12px)',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#0f172a',
    color: 'white',
    fontFamily: 'var(--font-jakarta, sans-serif)',
    fontSize: 12,
    fontWeight: 600,
    padding: '7px 12px',
    borderRadius: 8,
    whiteSpace: 'nowrap',
    opacity:    hovered === key ? 1 : 0,
    pointerEvents: 'none',
    transition: 'opacity 150ms',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  })

  return (
    <>
      {/* ───────────────────────── Proactive teaser bubble ───────────────────────── */}
      {teaser && !chatOn && (
        <div
          role="button"
          tabIndex={0}
          onClick={openChatFromTeaser}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openChatFromTeaser() }}
          style={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 9999,
            maxWidth: 280,
            background: 'white',
            borderRadius: '18px 18px 4px 18px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(1,2,241,0.12)',
            border: '1px solid rgba(1,2,241,0.1)',
            padding: '14px 16px 14px 14px',
            cursor: 'pointer',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            animation: 'teaserPop 360ms cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0102F1 0%, #010278 100%)',
            color: 'white', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 16, fontWeight: 800,
            boxShadow: '0 4px 10px rgba(1,2,241,0.3)',
            position: 'relative',
          }}>
            C
            {/* online dot */}
            <span style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 11, height: 11, borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid white',
            }} />
          </div>

          {/* Message */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#0102F1',
              marginBottom: 3,
            }}>CBI Assistant</div>
            <div style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 13.5, color: '#1e293b', fontWeight: 500,
              lineHeight: 1.45,
            }}>
              👋 Hi there! How can I help you today?
            </div>
            <div style={{
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 11, color: '#0102F1', fontWeight: 600,
              marginTop: 8, display: 'flex', alignItems: 'center', gap: 4,
            }}>
              Tap to chat
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="#0102F1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Close × */}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={e => { e.stopPropagation(); dismissTeaser() }}
            style={{
              position: 'absolute',
              top: 6, right: 6,
              width: 22, height: 22, borderRadius: '50%',
              background: '#f1f5f9',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748b',
              transition: 'background 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e2e8f0' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f1f5f9' }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* ───────────────────────── Floating cluster ───────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
        pointerEvents: 'none',     /* let cluster's children re-enable */
      }}>

        {/* Phone button */}
        <a
          href={`tel:${PHONE}`}
          aria-label="Call CBI"
          onMouseEnter={() => setHovered('phone')}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...btnStyle('linear-gradient(135deg, #25D366 0%, #128C7E 100%)', 'phone'),
            pointerEvents: 'auto',
            opacity: open ? 1 : 0,
            transform: open
              ? (hovered === 'phone' ? 'translateY(-2px) scale(1.06)' : 'translateY(0) scale(1)')
              : 'translateY(20px) scale(0.6)',
            transitionDelay: open ? '120ms' : '0ms',
          }}
        >
          {/* phone icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={tooltipStyle('phone')}>Call us · {PHONE_DISPLAY}</span>
        </a>

        {/* Email button */}
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Email CBI"
          onMouseEnter={() => setHovered('email')}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...btnStyle('linear-gradient(135deg, #ff8400 0%, #ff5e00 100%)', 'email'),
            pointerEvents: 'auto',
            opacity: open ? 1 : 0,
            transform: open
              ? (hovered === 'email' ? 'translateY(-2px) scale(1.06)' : 'translateY(0) scale(1)')
              : 'translateY(20px) scale(0.6)',
            transitionDelay: open ? '60ms' : '0ms',
          }}
        >
          {/* email icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="m22 6-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={tooltipStyle('email')}>Email · {EMAIL}</span>
        </a>

        {/* Chat button */}
        <button
          type="button"
          aria-label="Open chat"
          onClick={() => { setChatOn(true); setOpen(false) }}
          onMouseEnter={() => setHovered('chat')}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...btnStyle('linear-gradient(135deg, #0102F1 0%, #3335f3 100%)', 'chat'),
            pointerEvents: 'auto',
            opacity: open ? 1 : 0,
            transform: open
              ? (hovered === 'chat' ? 'translateY(-2px) scale(1.06)' : 'translateY(0) scale(1)')
              : 'translateY(20px) scale(0.6)',
            transitionDelay: open ? '0ms' : '0ms',
          }}
        >
          {/* chat icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={tooltipStyle('chat')}>Chat with us</span>
        </button>

        {/* Main toggle bubble */}
        <button
          type="button"
          aria-label={open ? 'Close contact menu' : 'Open contact menu'}
          onClick={() => setOpen(o => !o)}
          onMouseEnter={() => setHovered('main')}
          onMouseLeave={() => setHovered(null)}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0102F1 0%, #010278 100%)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered === 'main'
              ? '0 12px 32px rgba(1,2,241,0.4)'
              : '0 6px 24px rgba(1,2,241,0.32)',
            transition: 'all 220ms cubic-bezier(0.16,1,0.3,1)',
            transform: hovered === 'main' ? 'scale(1.06)' : 'none',
            pointerEvents: 'auto',
            position: 'relative',
          }}
        >
          {/* Pulse ring */}
          {!open && (
            <span style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '2px solid #0102F1',
              opacity: 0.5,
              animation: 'stickyPulse 2s ease-out infinite',
              pointerEvents: 'none',
            }} />
          )}

          {/* Icon — rotates X when open */}
          <svg
            width="26" height="26" viewBox="0 0 24 24" fill="none"
            style={{
              transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)',
              transform: open ? 'rotate(135deg)' : 'rotate(0deg)',
            }}
          >
            {open ? (
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
            ) : (
              <>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* ───────────────────────── Chat panel ───────────────────────── */}
      {chatOn && (
        <div
          role="dialog"
          aria-label="CBI Chat Assistant"
          style={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            width: 340,
            maxWidth: 'calc(100vw - 32px)',
            height: 480,
            maxHeight: 'calc(100vh - 140px)',
            background: 'white',
            borderRadius: 18,
            boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 4px 12px rgba(1,2,241,0.12)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatPop 240ms cubic-bezier(0.16,1,0.3,1) both',
            border: '1px solid rgba(1,2,241,0.1)',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0102F1 0%, #010278 100%)',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)',
                border: '2px solid rgba(255,255,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 800,
                fontFamily: 'var(--font-jakarta, sans-serif)',
              }}>C</div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 14, fontWeight: 700, lineHeight: 1.1,
                }}>CBI Assistant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 0 2px rgba(34,197,94,0.3)',
                    animation: 'livePulse 1.4s ease-in-out infinite',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-jakarta, sans-serif)',
                    fontSize: 11, fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                  }}>Online · Replies instantly</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setChatOn(false)}
              style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: 'none', color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 150ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6 6 18M6 6l12 12" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '18px 16px',
              background: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {messages.map(m => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.from === 'bot' ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  background: m.from === 'bot' ? 'white' : '#0102F1',
                  color: m.from === 'bot' ? '#1e293b' : 'white',
                  padding: '10px 14px',
                  borderRadius: m.from === 'bot' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  boxShadow: m.from === 'bot'
                    ? '0 1px 3px rgba(0,0,0,0.06)'
                    : '0 2px 8px rgba(1,2,241,0.25)',
                }}
              >
                {m.text}
              </div>
            ))}

            {/* Quick reply chips (only show if user hasn't sent anything) */}
            {messages.length === 1 && (
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 6,
                marginTop: 6, alignSelf: 'flex-start', maxWidth: '95%',
              }}>
                {QUICK_REPLIES.map(qr => (
                  <button
                    key={qr}
                    type="button"
                    onClick={() => sendMessage(qr)}
                    style={{
                      background: 'white',
                      border: '1px solid rgba(1,2,241,0.18)',
                      color: '#0102F1',
                      borderRadius: 100,
                      padding: '6px 12px',
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 150ms',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.background = '#0102F1'
                      el.style.color = 'white'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.background = 'white'
                      el.style.color = '#0102F1'
                    }}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '12px 12px 14px',
              background: 'white',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Type a message…"
              style={{
                flex: 1,
                padding: '11px 14px',
                borderRadius: 100,
                border: '1px solid #e2e8f0',
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13.5,
                outline: 'none',
                background: '#f8fafc',
                transition: 'border-color 150ms, box-shadow 150ms',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = '#0102F1'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,2,241,0.08)'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
              style={{
                width: 40, height: 40,
                borderRadius: '50%',
                background: draft.trim()
                  ? 'linear-gradient(135deg, #0102F1 0%, #3335f3 100%)'
                  : '#cbd5e1',
                color: 'white',
                border: 'none',
                cursor: draft.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 180ms',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes stickyPulse {
          0%   { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes chatPop {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes teaserPop {
          0%   { opacity: 0; transform: translateY(14px) scale(0.92); }
          70%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.85); }
        }
        @media (max-width: 520px) {
          [aria-label="CBI Chat Assistant"] {
            right: 12px !important;
            bottom: 90px !important;
          }
        }
      `}</style>
    </>
  )
}
