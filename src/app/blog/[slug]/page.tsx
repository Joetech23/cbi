import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { POSTS, getPost, getRelatedPosts } from '@/lib/posts'

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)

  const twitterUrl  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://cbi.ngo/blog/${post.slug}`)}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://cbi.ngo/blog/${post.slug}`)}`
  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(`${post.title} — https://cbi.ngo/blog/${post.slug}`)}`

  return (
    <>
      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: 480, background: '#010278', overflow: 'hidden' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill priority
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.35 }}
        />
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #010278 20%, rgba(1,2,120,0.7) 60%, transparent 100%)',
        }} />

        <div className="post-hero-inner" style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', justifyContent: 'flex-end',
          maxWidth: 860, margin: '0 auto', width: '100%',
        }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            {[
              { label: 'Home',           href: '/' },
              { label: 'News & Stories', href: '/blog' },
              { label: post.category,    href: '/blog' },
            ].map((crumb, i, arr) => (
              <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Link href={crumb.href} style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                }}>{crumb.label}</Link>
                {i < arr.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>›</span>
                )}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-block',
              background: '#ff8400', color: 'white',
              padding: '4px 12px', borderRadius: 4,
              fontFamily: 'var(--font-jakarta, sans-serif)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>{post.category}</span>
            {post.program && (
              <span style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '4px 12px', borderRadius: 4,
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>{post.program}</span>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(26px, 3.5vw, 46px)',
            fontWeight: 700, color: 'white',
            lineHeight: 1.18, letterSpacing: '-0.02em',
            margin: '0 0 20px',
          }}>{post.title}</h1>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 40, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,132,0,0.25)',
                border: '1.5px solid rgba(255,132,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>✍</div>
              <div>
                <div style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 13, fontWeight: 700, color: 'white' }}>
                  {post.author}
                </div>
                <div style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  {post.authorRole}
                </div>
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              {post.date}
            </span>
            <span style={{ fontFamily: 'var(--font-jakarta, sans-serif)', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              · {post.read} read
            </span>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <main style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div className="post-body">

            {/* Lead excerpt */}
            <p style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(17px, 1.6vw, 21px)',
              fontStyle: 'italic', color: '#374151',
              lineHeight: 1.65, margin: '0 0 36px',
              paddingBottom: 36,
              borderBottom: '1px solid rgba(1,2,241,0.08)',
            }}>{post.excerpt}</p>

            {/* Body */}
            {post.content.map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 'clamp(15px, 1.1vw, 17px)',
                color: '#374151', lineHeight: 1.85,
                margin: '0 0 26px',
              }}>{para}</p>
            ))}

            {/* Tags */}
            <div style={{
              marginTop: 48, paddingTop: 28,
              borderTop: '1px solid rgba(1,2,241,0.08)',
              display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
            }}>
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 11, fontWeight: 700, color: '#94a3b8',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>Tags:</span>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-jakarta, sans-serif)',
                  fontSize: 12, fontWeight: 600, color: '#0102F1',
                  background: '#eef0ff', padding: '4px 12px', borderRadius: 100,
                }}>{tag}</span>
              ))}
            </div>

            {/* Share strip */}
            <div style={{
              marginTop: 28, padding: '22px 24px',
              background: 'white', borderRadius: 12,
              border: '1px solid rgba(1,2,241,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 12,
            }}>
              <span style={{
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, fontWeight: 600, color: '#374151',
              }}>Share this story and help amplify our impact</span>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { label: 'X / Twitter', icon: '𝕏', href: twitterUrl },
                  { label: 'LinkedIn',    icon: 'in', href: linkedInUrl },
                  { label: 'WhatsApp',   icon: '💬', href: whatsAppUrl },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label} className="share-btn"
                  >{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Back */}
            <div style={{ marginTop: 36 }}>
              <Link href="/blog" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-jakarta, sans-serif)',
                fontSize: 13, fontWeight: 600, color: '#0102F1',
                textDecoration: 'none',
              }}>← Back to all stories</Link>
            </div>
          </div>
        </div>
      </main>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section style={{ background: 'white' }}>
          <div className="post-related">
            <h2 style={{
              fontFamily: 'var(--font-playfair, Georgia, serif)',
              fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700,
              color: '#010278', letterSpacing: '-0.015em',
              margin: '0 0 32px',
            }}>More stories you might like</h2>
            <div className="related-grid">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="related-card">
                  <div style={{ height: 5, background: '#0102F1' }} />
                  <div style={{ padding: '20px 22px 22px' }}>
                    <p style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 10, fontWeight: 700, color: '#ff8400',
                      letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8,
                    }}>{r.category}</p>
                    <h3 style={{
                      fontFamily: 'var(--font-playfair, Georgia, serif)',
                      fontSize: 16, fontWeight: 700, color: '#010278',
                      lineHeight: 1.35, margin: '0 0 10px',
                    }}>{r.title}</h3>
                    <p style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: '0 0 14px',
                    }}>{r.excerpt}</p>
                    <div style={{
                      fontFamily: 'var(--font-jakarta, sans-serif)',
                      fontSize: 11, color: '#94a3b8',
                      display: 'flex', justifyContent: 'space-between',
                      paddingTop: 12, borderTop: '1px solid rgba(1,2,241,0.06)',
                    }}>
                      <span>{r.date}</span>
                      <span>{r.read} read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA strip ── */}
      <section style={{
        background: 'linear-gradient(135deg, #010278 0%, #0102F1 100%)',
        textAlign: 'center',
      }}>
        <div className="post-cta">
          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14,
          }}>Take action</p>
          <h2 style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 700,
            color: 'white', letterSpacing: '-0.02em', margin: '0 0 12px',
          }}>Stories like this need your support.</h2>
          <p style={{
            fontFamily: 'var(--font-jakarta, sans-serif)',
            fontSize: 15, color: 'rgba(255,255,255,0.65)',
            margin: '0 auto 32px', maxWidth: 480,
          }}>
            Every contribution funds the programmes behind these stories — healthcare, clean water,
            education, and protection for Nigeria&apos;s most vulnerable.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/donate" className="cta-donate">♥ Donate Now</Link>
            <Link href="/blog"   className="cta-back">← More Stories</Link>
          </div>
        </div>
      </section>

      <style>{`
        /* Layout */
        .post-hero-inner { padding: 0 80px; }
        .post-body       { padding: 64px 0 56px; }
        .post-related    { max-width: 860px; margin: 0 auto; padding: 64px 0; }
        .related-grid    { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .post-cta        { padding: 80px 80px; }

        /* Share buttons */
        .share-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(1,2,241,0.12);
          background: #f8fafc; color: #0102F1;
          font-size: 13px; font-weight: 700;
          text-decoration: none;
          transition: background 150ms, color 150ms, border-color 150ms;
        }
        .share-btn:hover {
          background: #0102F1;
          color: white;
          border-color: #0102F1;
        }

        /* Related cards */
        .related-card {
          display: block; text-decoration: none;
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(1,2,241,0.08);
          background: #f8fafc;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(1,2,241,0.10);
        }

        /* CTA buttons */
        .cta-donate {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 8px;
          background: #ff8400; color: #010278;
          font-family: var(--font-jakarta, sans-serif);
          font-size: 15px; font-weight: 700; text-decoration: none;
          box-shadow: 0 8px 28px rgba(255,132,0,0.35);
          transition: transform 150ms, box-shadow 150ms;
        }
        .cta-donate:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(255,132,0,0.5);
        }
        .cta-back {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06); color: white;
          font-family: var(--font-jakarta, sans-serif);
          font-size: 15px; font-weight: 600; text-decoration: none;
          transition: background 150ms, border-color 150ms;
        }
        .cta-back:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.45);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .post-hero-inner { padding: 0 40px; }
          .post-body       { padding: 48px 40px 40px; }
          .post-related    { padding: 48px 40px; }
          .post-cta        { padding: 60px 40px; }
        }
        @media (max-width: 768px) {
          .related-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .post-hero-inner { padding: 0 20px; }
          .post-body       { padding: 36px 20px 32px; }
          .post-related    { padding: 40px 20px; }
          .post-cta        { padding: 48px 20px; }
          .related-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
