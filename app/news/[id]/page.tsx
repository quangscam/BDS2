import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const apiUrl = process.env.NEXT_PUBLIC_WP_URL || 'https://api.happyhousesg.com'

  const res = await fetch(`${apiUrl}/wp-json/wp/v2/posts/${id}?_embed`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center" style={{ backgroundColor: '#F5EDE8' }}>
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#FFF0EE' }}>
            <span className="text-3xl">🏠</span>
          </div>
          <h1 className="text-2xl font-black mb-3" style={{ color: '#2C1A1A', fontFamily: 'Georgia, serif' }}>
            Bài viết không tìm thấy
          </h1>
          <p className="mb-8 leading-relaxed" style={{ color: '#8A7D7D' }}>
            Bài viết này có thể đã bị xóa hoặc không tồn tại.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ backgroundColor: '#B03A2E' }}
          >
            <ArrowLeft size={16} />
            Quay về trang tin tức
          </Link>
        </div>
      </div>
    )
  }

  const post = await res.json()

  const title = post.title.rendered
  const content = post.content.rendered
  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80'
  const rawDate = new Date(post.date)
  const formattedDate = rawDate.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  // Estimate reading time
  const plainText = content.replace(/<[^>]+>/g, '')
  const wordCount = plainText.split(/\s+/).length
  const readingMinutes = Math.max(1, Math.round(wordCount / 200))

  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Tin Tức'

  return (
    <>
    <Header />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');

        .article-content {
          font-family: 'Lora', Georgia, serif;
          font-size: 1.1rem;
          line-height: 1.9;
          color: #3D2E2E;
        }
        .article-content p {
          margin-bottom: 1.6em;
        }
        .article-content h1, .article-content h2, .article-content h3 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          color: #2C1A1A;
          margin-top: 2em;
          margin-bottom: 0.8em;
          line-height: 1.3;
        }
        .article-content h2 { font-size: 1.5rem; }
        .article-content h3 { font-size: 1.25rem; }
        .article-content img {
          width: 100%;
          border-radius: 12px;
          margin: 2em 0;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        .article-content a {
          color: #B03A2E;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .article-content blockquote {
          border-left: 4px solid #B03A2E;
          margin: 2em 0;
          padding: 1em 1.5em;
          background: #FFF8F6;
          border-radius: 0 10px 10px 0;
          font-style: italic;
          color: #5D4E4E;
        }
        .article-content ul, .article-content ol {
          padding-left: 1.5em;
          margin-bottom: 1.6em;
        }
        .article-content li { margin-bottom: 0.5em; }
        .article-content strong { color: #2C1A1A; }

        .hero-overlay {
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(20, 10, 10, 0.65) 100%
          );
        }

        .back-link {
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
        }
        .back-link:hover { opacity: 0.7; transform: translateX(-3px); }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(to right, #B03A2E, #E87060);
          z-index: 100;
          transition: width 0.1s linear;
        }

        .toc-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: #7A6060;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .toc-link:hover { color: #B03A2E; padding-left: 4px; }
        .toc-link::before {
          content: '';
          width: 16px;
          height: 1px;
          background: currentColor;
          flex-shrink: 0;
        }
      `}</style>

      {/* Reading progress bar (decorative static at 0 — JS would animate this) */}
      <div className="progress-bar" style={{ width: '0%' }} id="reading-progress" />

      <main
        className="min-h-screen pb-24"
        style={{ backgroundColor: '#F7F0EB', fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Hero Image with overlay title ── */}
        <div className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="hero-overlay absolute inset-0" />

          {/* Back button on top of image */}
          <div className="absolute top-8 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-8">
            <Link
              href="/news"
              className="back-link inline-flex items-center gap-2 text-white/90 text-sm font-semibold tracking-wide uppercase"
            >
              <ArrowLeft size={16} />
              Danh sách tin
            </Link>
          </div>

          {/* Category + Title overlaid on hero */}
          <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-8 pb-10">
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4"
              style={{ backgroundColor: '#B03A2E', color: '#fff' }}
              dangerouslySetInnerHTML={{ __html: categoryName }}
            />
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-lg"
              style={{ fontFamily: 'Lora, Georgia, serif', maxWidth: '680px' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* ── Article ── */}
            <div className="flex-1 min-w-0">
              {/* Meta bar */}
              <div
                className="flex flex-wrap items-center gap-5 mb-10 pb-8"
                style={{ borderBottom: '1px solid #E0CEC8' }}
              >
                <div className="flex items-center gap-2 text-sm" style={{ color: '#8A7D7D' }}>
                  <Calendar size={15} style={{ color: '#B03A2E' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#8A7D7D' }}>
                  <Clock size={15} style={{ color: '#B03A2E' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {readingMinutes} phút đọc
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#8A7D7D' }}>
                  <Tag size={15} style={{ color: '#B03A2E' }} />
                  <span
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: categoryName }}
                  />
                </div>
              </div>

              {/* Article body */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Bottom nav */}
              <div
                className="mt-16 pt-8 flex items-center justify-between"
                style={{ borderTop: '1px solid #E0CEC8' }}
              >
                <Link
                  href="/news"
                  className="back-link inline-flex items-center gap-2 text-sm font-semibold tracking-wide"
                  style={{ color: '#5D4E4E' }}
                >
                  <ArrowLeft size={16} />
                  Trở về danh sách tin
                </Link>
                <span className="text-xs" style={{ color: '#BCA9A3', fontFamily: "'DM Sans', sans-serif" }}>
                  Happy House SG
                </span>
              </div>
            </div>

            {/* ── Sticky Sidebar ── */}
            <aside
              className="w-full lg:w-64 xl:w-72 flex-shrink-0 lg:sticky lg:top-28"
            >
              {/* Reading info card */}
              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  background: '#fff',
                  border: '1px solid #EAD8D0',
                  boxShadow: '0 4px 24px rgba(44,26,26,0.06)',
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: '#B03A2E' }}
                >
                  Thông tin bài viết
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Calendar size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#B03A2E' }} />
                    <div>
                      <p className="text-xs" style={{ color: '#8A7D7D' }}>Ngày đăng</p>
                      <p className="text-sm font-semibold" style={{ color: '#2C1A1A' }}>{formattedDate}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#B03A2E' }} />
                    <div>
                      <p className="text-xs" style={{ color: '#8A7D7D' }}>Thời gian đọc</p>
                      <p className="text-sm font-semibold" style={{ color: '#2C1A1A' }}>{readingMinutes} phút</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Tag size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#B03A2E' }} />
                    <div>
                      <p className="text-xs" style={{ color: '#8A7D7D' }}>Danh mục</p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: '#2C1A1A' }}
                        dangerouslySetInnerHTML={{ __html: categoryName }}
                      />
                    </div>
                  </li>
                </ul>
              </div>

              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-white overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #B03A2E 0%, #8B2217 100%)',
                }}
              >
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20"
                  style={{ background: '#fff' }}
                />
                <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
                  Tư vấn miễn phí
                </p>
                <p className="text-base font-black mb-4 leading-snug" style={{ fontFamily: 'Lora, serif' }}>
                  Bạn đang tìm kiếm bất động sản phù hợp?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.95)', color: '#B03A2E' }}
                >
                  Liên hệ ngay →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

<Footer />

{/* JS giữ nguyên */}
<script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var bar = document.getElementById('reading-progress');
            if (!bar) return;
            window.addEventListener('scroll', function() {
              var scrollTop = window.scrollY;
              var docHeight = document.body.scrollHeight - window.innerHeight;
              var pct = docHeight > 0 ? (scrollTop / docHeight * 100) : 0;
              bar.style.width = pct.toFixed(1) + '%';
            }, { passive: true });
          })();
        `
      }} />
    </>
  )
}