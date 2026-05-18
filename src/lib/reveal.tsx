'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from 'react'

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

/* ── Core observer hook ───────────────────────────────────── */
export function useReveal(threshold = 0.12, rootMargin = '0px 0px -50px 0px') {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold, rootMargin })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold, rootMargin])
  return { ref, visible }
}

/* ── Simple reveal wrapper ────────────────────────────────── */
type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'

interface RevealProps {
  children:   ReactNode
  delay?:     number
  distance?:  number
  duration?:  number
  direction?: Direction
  as?:        ElementType
  style?:     CSSProperties
  className?: string
}

function transformFor(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':    return `translateY(${distance}px)`
    case 'down':  return `translateY(-${distance}px)`
    case 'left':  return `translateX(-${distance}px)`
    case 'right': return `translateX(${distance}px)`
    case 'zoom':  return 'scale(0.96)'
    case 'fade':  return 'none'
  }
}

export function Reveal({
  children, delay = 0, distance = 28, duration = 800,
  direction = 'up', as: Tag = 'div', style, className,
}: RevealProps) {
  const { ref, visible } = useReveal()
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transformFor(direction, distance),
        transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

/* ── Stagger reveal — wraps a list of children with sequential delays ─ */
interface RevealStaggerProps {
  children:   ReactNode
  stagger?:   number
  distance?:  number
  duration?:  number
  direction?: Direction
  as?:        ElementType
  style?:     CSSProperties
  className?: string
}

export function RevealStagger({
  children, stagger = 80, distance = 24, duration = 700,
  direction = 'up', as: Tag = 'div', style, className,
}: RevealStaggerProps) {
  const { ref, visible } = useReveal()
  const items = Array.isArray(children) ? children : [children]
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={style}
    >
      {items.map((child, i) => (
        <div key={i} style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : transformFor(direction, distance),
          transition: `opacity ${duration}ms ${EASE} ${i * stagger}ms, transform ${duration}ms ${EASE} ${i * stagger}ms`,
          willChange: 'opacity, transform',
        }}>
          {child}
        </div>
      ))}
    </Tag>
  )
}

/* ── Stagger helper — returns style function for index ───── */
export function useStagger(stagger = 80, distance = 24, duration = 700, direction: Direction = 'up') {
  const { ref, visible } = useReveal()
  const style = (i: number, extra?: CSSProperties): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : transformFor(direction, distance),
    transition: `opacity ${duration}ms ${EASE} ${i * stagger}ms, transform ${duration}ms ${EASE} ${i * stagger}ms`,
    willChange: 'opacity, transform',
    ...extra,
  })
  return { ref, visible, style }
}
