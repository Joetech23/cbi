'use client'

import { useEffect, useRef } from 'react'

/**
 * HeroParticles — a lightweight canvas "constellation" field.
 * Drifting particles connected by faint lines, gently repelled by the cursor.
 * Zero dependencies (~2KB) and skipped entirely for reduced-motion users.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }

    type P = { x: number; y: number; vx: number; vy: number; r: number }
    let pts: P[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.min(90, Math.floor((w * h) / 16000))
      pts = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
      }))
    }

    const LINK = 120
    const step = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        // drift
        p.x += p.vx; p.y += p.vy
        // gentle cursor repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const md = dx * dx + dy * dy
        if (md < 120 * 120) {
          const d = Math.sqrt(md) || 1
          p.x += (dx / d) * 1.1
          p.y += (dy / d) * 1.1
        }
        // wrap
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10
      }
      // links
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.28
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      // dots
      for (const p of pts) {
        ctx.fillStyle = 'rgba(255,163,64,0.85)'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(step)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    resize()
    step()
    const parent = canvas.parentElement
    window.addEventListener('resize', resize)
    parent?.addEventListener('pointermove', onMove as EventListener)
    parent?.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      parent?.removeEventListener('pointermove', onMove as EventListener)
      parent?.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 1, pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  )
}
