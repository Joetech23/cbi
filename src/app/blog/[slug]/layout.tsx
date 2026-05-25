import type { Metadata } from 'next'
import { getPost } from '@/lib/posts'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://cbi.ngo/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | CBI`,
      description: post.excerpt,
      url: `https://cbi.ngo/blog/${post.slug}`,
      type: 'article',
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
  }
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
