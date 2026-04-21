'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/* ─── Hook & Component Hiệu Ứng (Reveal) ───────────── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

function Reveal({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  threshold?: number
  style?: React.CSSProperties
}) {
  const { ref, visible } = useScrollReveal(threshold)
  const initialTransform: Record<Direction, string> = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
    scale: 'scale(0.85)',
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : initialTransform[direction],
        transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Component Thẻ Bài viết (Dùng Dữ liệu Động) ───── */
function NewsCard({ article, index }: { article: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  // Xử lý dữ liệu từ WordPress JSON
  // ĐÃ SỬA: Lấy 'slug' (đường dẫn theo tiêu đề) thay vì 'id' (số)
  const slug = article.slug 
  const title = article.title?.rendered || 'Bài viết chưa có tiêu đề'
  
  // Xử lý ảnh (nếu bài viết không có ảnh đại diện, dùng ảnh mặc định)
  const featuredImage = article._embedded?.['wp:featuredmedia']?.[0]?.source_url 
    || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
    
  // Xử lý danh mục (Category)
  const categoryName = article._embedded?.['wp:term']?.[0]?.[0]?.name || 'TIN TỨC'
  
  // Format ngày tháng (vd: 20/04/2026)
  const rawDate = new Date(article.date)
  const formattedDate = rawDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <Reveal direction="up" delay={index * 0.15}>
      <article 
        className="bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col h-full"
        style={{
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 16px 40px rgba(176, 58, 46, 0.12)' : '0 4px 20px rgba(93, 78, 78, 0.05)',
          border: '1px solid #E8D7CF',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ĐÃ SỬA: Truyền biến slug vào href */}
        <Link href={`/news/${slug}`} className="block flex-grow flex flex-col">
          {/* Khối Hình ảnh */}
          <div className="relative h-56 overflow-hidden flex-shrink-0">
            <img 
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              }}
            />
          </div>

          {/* Khối Nội dung */}
          <div className="p-6 md:p-8 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4 border-b pb-4" style={{ borderColor: '#E8D7CF' }}>
              <span 
                className="text-xs font-bold px-3 py-1.5 rounded-md tracking-wider uppercase" 
                style={{ backgroundColor: '#FFF0EE', color: '#B03A2E' }}
                dangerouslySetInnerHTML={{ __html: categoryName }}
              />
              <span className="text-xs font-medium tracking-wide" style={{ color: '#8A7D7D' }}>
                {formattedDate}
              </span>
            </div>
            
            <h3 
              className="text-xl font-bold mb-6 line-clamp-3 leading-snug transition-colors duration-300 flex-grow" 
              style={{ color: isHovered ? '#B03A2E' : '#2C1A1A' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            
            <div 
              className="flex items-center gap-2 text-xs font-bold tracking-widest transition-colors duration-300 mt-auto"
              style={{ color: isHovered ? '#B03A2E' : '#5D4E4E' }}
            >
              ĐỌC THÊM <ArrowRight size={16} />
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  )
}

/* ─── Component Chính ──────────────────────────────── */
export function NewsSection() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Gọi API từ WordPress khi Component được load
  useEffect(() => {
    // Thêm tham số _embed để WordPress trả về cả ảnh đại diện và thông tin danh mục
    fetch('https://api.happyhousesg.com/wp-json/wp/v2/posts?_embed&per_page=3')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error)
        setIsLoading(false)
      })
  }, [])

  return (
    <section id="news" className="py-24 relative" style={{ backgroundColor: '#F5EDE8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tiêu đề Section */}
        <Reveal direction="left" delay={0}>
          <div className="flex items-start gap-5 mb-16">
            <div style={{ width: '4px', alignSelf: 'stretch', backgroundColor: '#B03A2E', flexShrink: 0, borderRadius: '2px' }} />
            <div>
              <h2 
                className="text-3xl md:text-5xl font-black mb-3 uppercase" 
                style={{ color: '#2C1A1A', letterSpacing: '-0.01em' }}
              >
                TIN TỨC & <span style={{ color: '#B03A2E' }}>THỊ TRƯỜNG</span>
              </h2>
              <p className="text-sm md:text-base font-medium uppercase" style={{ color: '#8A7D7D', letterSpacing: '0.06em' }}>
                Cập nhật thông tin mới nhất trực tiếp từ hệ thống
              </p>
            </div>
          </div>
        </Reveal>

        {/* Khu vực hiển thị Bài viết */}
        {isLoading ? (
          // Hiệu ứng Loading
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
          </div>
        ) : (
          // Lưới Bài viết
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((article: any, index: number) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-10" style={{ color: '#8A7D7D' }}>
                Hiện chưa có bài viết nào.
              </div>
            )}
          </div>
        )}

        {/* Nút Xem tất cả */}
        <Reveal direction="up" delay={0.4}>
          <div className="text-center mt-16">
            <Link 
              href="/news" 
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-lg text-sm font-bold tracking-widest transition-all duration-300"
              style={{ backgroundColor: '#2C1A1A', color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B03A2E'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2C1A1A'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              XEM TẤT CẢ TIN TỨC <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  )
}