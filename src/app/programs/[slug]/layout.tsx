import type { Metadata } from 'next'
import { getProgram, PROGRAMS } from '@/lib/programs'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getProgram(slug)
  if (!p) return { title: 'Programme not found · Care Best Initiative' }

  return {
    title: `${p.name} Programme`,
    description: p.description,
    alternates: { canonical: `https://cbi.ngo/programs/${p.slug}` },
    openGraph: {
      title: `${p.name} — Care Best Initiative`,
      description: p.description,
      url: `https://cbi.ngo/programs/${p.slug}`,
      type: 'website',
      images: [{ url: p.heroImage, width: 1200, height: 630, alt: p.name }],
    },
  }
}

export default function ProgramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
