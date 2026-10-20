'use client'

import { useEffect, useRef } from 'react'

/**
 * Site-wide scroll progress indicator — a thin gradient line fixed to the
 * very top of the viewport that fills as the user scrolls the page.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      bar.style.transform = `scaleX(${pct / 100})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 3,
      zIndex: 9999, pointerEvents: 'none',
    }}>
      <div ref={barRef} style={{
        height: '100%', width: '100%',
        transform: 'scaleX(0)', transformOrigin: 'left',
        background: 'linear-gradient(90deg, #0102F1 0%, #2a2cff 55%, #ff8400 100%)',
        boxShadow: '0 0 8px rgba(1,2,241,0.45)',
      }} />
    </div>
  )
}
