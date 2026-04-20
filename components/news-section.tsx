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

/* ─── Dữ liệu Bài viết ─────────────────────────────── */
const newsArticles = [
  {
    id: 1,
    title: 'Xu hướng thị trường bất động sản 2025: Cơ hội và Thách thức',
    category: 'THỊ TRƯỜNG',
    date: '15/04/2025',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
  },
  {
    id: 2,
    title: 'Bí quyết chọn căn hộ cao cấp đầu tiên cho gia đình trẻ',
    category: 'HƯỚNG DẪN',
    date: '10/04/2025',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80',
  },
  {
    id: 3,
    title: 'HappyHouse ra mắt dự án Riverside Elite - Điểm nhấn ven sông',
    category: 'DỰ ÁN',
    date: '05/04/2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
  },
]

/* ─── Component Thẻ Bài viết ───────────────────────── */
function NewsCard({ article, index }: { article: typeof newsArticles[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Reveal direction="up" delay={index * 0.15}>
      <article 
        className="bg-white rounded-xl overflow-hidden cursor-pointer"
        style={{
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 16px 40px rgba(176, 58, 46, 0.12)' : '0 4px 20px rgba(93, 78, 78, 0.05)',
          border: '1px solid #E8D7CF',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/news/${article.id}`} className="block">
          {/* Khối Hình ảnh */}
          <div className="relative h-56 overflow-hidden">
            <img 
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              }}
            />
          </div>

          {/* Khối Nội dung */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4 border-b pb-4" style={{ borderColor: '#E8D7CF' }}>
              <span 
                className="text-xs font-bold px-3 py-1.5 rounded-md tracking-wider" 
                style={{ backgroundColor: '#FFF0EE', color: '#B03A2E' }}
              >
                {article.category}
              </span>
              <span className="text-xs font-medium tracking-wide" style={{ color: '#8A7D7D' }}>
                {article.date}
              </span>
            </div>
            
            <h3 
              className="text-xl font-bold mb-6 line-clamp-3 leading-snug transition-colors duration-300" 
              style={{ color: isHovered ? '#B03A2E' : '#2C1A1A' }}
            >
              {article.title}
            </h3>
            
            <div 
              className="flex items-center gap-2 text-xs font-bold tracking-widest transition-colors duration-300"
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
                Cập nhật thông tin mới nhất về thị trường bất động sản và các dự án của chúng tôi
              </p>
            </div>
          </div>
        </Reveal>

        {/* Lưới Bài viết */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>

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