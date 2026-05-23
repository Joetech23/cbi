'use client'

/**
 * TeamAvatar
 *
 * Shows the team member's headshot when one exists (photo path starts with
 * /images/team/ or /images/team/).  For members whose photos we don't have,
 * renders a WhatsApp-style initials avatar instead of a dummy field image.
 */

import Image from 'next/image'

interface Props {
  photo:       string          // path from team.ts
  name:        string
  avatarColor: string          // background colour for the initials circle
  /** Use like Next.js Image fill — fills the parent (must be position:relative) */
  fill?:       boolean
  /** Used when fill is false */
  width?:      number
  height?:     number
  objectPosition?: string
  style?:      React.CSSProperties
  className?:  string
}

function getInitials(name: string): string {
  return name
    .replace(/^Dr\.?\s*/i, '')      // strip "Dr." prefix
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

/** Returns true when the photo is a real headshot in /images/team/ */
export function hasHeadshot(photo: string): boolean {
  return Boolean(photo) && photo.startsWith('/images/team/')
}

export default function TeamAvatar({
  photo,
  name,
  avatarColor,
  fill = false,
  width,
  height,
  objectPosition = 'top center',
  style,
  className,
}: Props) {
  if (hasHeadshot(photo)) {
    return (
      <Image
        src={photo}
        alt={name}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        style={{
          objectFit: 'cover',
          objectPosition,
          ...style,
        }}
      />
    )
  }

  /* ── Initials avatar ── */
  const initials = getInitials(name)

  const containerStyle: React.CSSProperties = fill
    ? {
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(145deg, ${avatarColor}cc 0%, ${avatarColor} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }
    : {
        width,
        height,
        background: `linear-gradient(145deg, ${avatarColor}cc 0%, ${avatarColor} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        ...style,
      }

  return (
    <div style={containerStyle} className={className} aria-label={name}>
      {/* Initials circle */}
      <div style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        border: '2px solid rgba(255,255,255,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}>
        <span style={{
          fontFamily: 'var(--font-jakarta, sans-serif)',
          fontWeight: 700,
          fontSize: 26,
          color: 'white',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          {initials}
        </span>
      </div>
      {/* Name hint */}
      <span style={{
        fontFamily: 'var(--font-jakarta, sans-serif)',
        fontSize: 11,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.70)',
        letterSpacing: '0.04em',
        textAlign: 'center',
        padding: '0 12px',
        lineHeight: 1.3,
      }}>
        {name.split(' ').slice(0, 2).join(' ')}
      </span>
    </div>
  )
}
