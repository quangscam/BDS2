'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Home, BarChart2, Globe } from 'lucide-react'

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

/* ─── Brand Tokens ─────────────────────────────────── */
// Cream bg:     #FDFAF6
// Sidebar bg:   #F5EDE8
// Card bg:      #FFFFFF
// Red primary:  #B03A2E
// Red dark:     #7B241C
// Gold:         #C9A84C
// Warm text:    #5D4E4E
// Muted text:   #8A7D7D
// Border:       #E8D7CF

/* ─── Data ─────────────────────────────────────────── */
const categories = ['TẤT CẢ', 'THỊ TRƯỜNG', 'DỰ ÁN', 'PHONG CÁCH SỐNG', 'TÀI CHÍNH']

const categoryIcons: Record<string, JSX.Element> = {
  'THỊ TRƯỜNG': <TrendingUp size={14} />,
  'DỰ ÁN': <Home size={14} />,
  'PHONG CÁCH SỐNG': <Globe size={14} />,
  'TÀI CHÍNH': <BarChart2 size={14} />,
}

const allArticles = [
  {
    id: 1,
    title: 'THỊ TRƯỜNG BẤT ĐỘNG SẢN TPHCM QUÝ II/2025: CƠ HỘI VÀ THÁCH THỨC',
    excerpt: 'PHÂN TÍCH TOÀN CẢNH THỊ TRƯỜNG BẤT ĐỘNG SẢN TẠI THÀNH PHỐ HỒ CHÍ MINH TRONG BỐI CẢNH KINH TẾ PHỤC HỒI SAU ĐẠI DỊCH VÀ CÁC CHÍNH SÁCH MỚI CỦA CHÍNH PHỦ.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    category: 'THỊ TRƯỜNG',
    date: '15 THÁNG 4, 2025',
    readTime: '8 PHÚT ĐỌC',
    author: 'NGUYỄN MINH TUẤN',
    featured: true,
  },
  {
    id: 2,
    title: 'CENTRE POINT: KIỆT TÁC KIẾN TRÚC GIỮA LÒNG QUẬN 1',
    excerpt: 'KHÁM PHÁ THIẾT KẾ ĐỘC ĐÁO VÀ CÁC TIỆN ÍCH CAO CẤP CỦA DỰ ÁN CENTRE POINT — BIỂU TƯỢNG MỚI CỦA THÀNH PHỐ.',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
    category: 'DỰ ÁN',
    date: '10 THÁNG 4, 2025',
    readTime: '5 PHÚT ĐỌC',
    author: 'TRẦN THỊ LAN',
    featured: false,
  },
  {
    id: 3,
    title: 'PHONG CÁCH SỐNG HIỆN ĐẠI: XU HƯỚNG NỘI THẤT 2025',
    excerpt: 'TỪ MINIMALISM ĐẾN WABI-SABI, KHÁM PHÁ CÁC PHONG CÁCH NỘI THẤT ĐANG DẪN ĐẦU XU HƯỚNG TẠI CÁC CĂN HỘ CAO CẤP TPHCM.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    category: 'PHONG CÁCH SỐNG',
    date: '05 THÁNG 4, 2025',
    readTime: '6 PHÚT ĐỌC',
    author: 'LÊ HỒNG NHUNG',
    featured: false,
  },
  {
    id: 4,
    title: 'HƯỚNG DẪN VAY MUA NHÀ 2025: LÃI SUẤT & ĐIỀU KIỆN MỚI NHẤT',
    excerpt: 'CẬP NHẬT CÁC GÓI VAY ƯU ĐÃI TỪ CÁC NGÂN HÀNG LỚN VÀ CHIẾN LƯỢC TỐI ƯU HÓA TÀI CHÍNH KHI MUA BẤT ĐỘNG SẢN.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    category: 'TÀI CHÍNH',
    date: '01 THÁNG 4, 2025',
    readTime: '10 PHÚT ĐỌC',
    author: 'PHẠM QUỐC HÙNG',
    featured: false,
  },
  {
    id: 5,
    title: 'RIVERSIDE ELITE: CĂN HỘ VIEW SÔNG — ĐẲNG CẤP SỐNG MỚI',
    excerpt: 'TẠI SAO CĂN HỘ VEN SÔNG ĐANG TRỞ THÀNH LỰA CHỌN HÀNG ĐẦU CỦA GIỚI THƯỢNG LƯU TẠI THÀNH PHỐ HỒ CHÍ MINH.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    category: 'DỰ ÁN',
    date: '28 THÁNG 3, 2025',
    readTime: '7 PHÚT ĐỌC',
    author: 'VÕ THỊ MAI',
    featured: false,
  },
  {
    id: 6,
    title: 'ĐẦU TƯ BẤT ĐỘNG SẢN THÔNG MINH: 5 NGUYÊN TẮC VÀNG',
    excerpt: 'CHUYÊN GIA HAPPYHOUSE CHIA SẺ CÁC NGUYÊN TẮC ĐẦU TƯ GIÚP BẠN TỐI ĐA HÓA LỢI NHUẬN VÀ HẠN CHẾ RỦI RO.',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
    category: 'TÀI CHÍNH',
    date: '20 THÁNG 3, 2025',
    readTime: '9 PHÚT ĐỌC',
    author: 'HOÀNG VĂN BÌNH',
    featured: false,
  },
  {
    id: 7,
    title: 'GREEN LIVING: SỰ TRỖI DẬY CỦA CĂN HỘ XANH TẠI VIỆT NAM',
    excerpt: 'XU HƯỚNG KIẾN TRÚC BỀN VỮNG VÀ THIẾT KẾ THÂN THIỆN MÔI TRƯỜNG ĐANG ĐỊNH HÌNH LẠI TƯƠNG LAI CỦA BẤT ĐỘNG SẢN.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    category: 'PHONG CÁCH SỐNG',
    date: '15 THÁNG 3, 2025',
    readTime: '6 PHÚT ĐỌC',
    author: 'NGUYỄN THỊ HOA',
    featured: false,
  },
]

/* ─── Article Card ──────────────────────────────────── */
function ArticleCard({ article, index }: { article: typeof allArticles[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Reveal direction="up" delay={index * 0.1}>
      <Link
        href={`/news/${article.id}`}
        className="block"
        style={{
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          boxShadow: isHovered ? '0 12px 36px rgba(176,58,46,0.13)' : '0 2px 8px rgba(93,78,78,0.06)',
          borderRadius: '12px',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          display: 'block', // Added to ensure Link block behaves correctly
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          {/* Category badge */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#B03A2E',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: '4px',
            }}
          >
            {categoryIcons[article.category]}
            {article.category}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              fontSize: '10px',
              color: '#8A7D7D',
              marginBottom: '10px',
              letterSpacing: '0.05em',
            }}
          >
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <h3
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#5D4E4E',
              lineHeight: 1.4,
              marginBottom: '10px',
              letterSpacing: '0.02em',
            }}
          >
            {article.title}
          </h3>

          <p
            style={{
              fontSize: '12px',
              color: '#8A7D7D',
              lineHeight: 1.6,
              marginBottom: '16px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.excerpt}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px',
              borderTop: '1px solid #E8D7CF',
            }}
          >
            <span style={{ fontSize: '11px', color: '#8A7D7D', letterSpacing: '0.04em' }}>
              {article.author}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#B03A2E',
                letterSpacing: '0.06em',
              }}
            >
              ĐỌC THÊM <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

/* ─── Featured Card ─────────────────────────────────── */
function FeaturedCard({ article }: { article: typeof allArticles[0] }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Reveal direction="up" delay={0.1}>
      <Link
        href={`/news/${article.id}`}
        style={{
          display: 'block',
          borderRadius: '14px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          boxShadow: isHovered
            ? '0 16px 48px rgba(176,58,46,0.18)'
            : '0 4px 16px rgba(93,78,78,0.08)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          marginBottom: '32px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
            <img
              src={article.image}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.4s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(176,58,46,0.15), transparent)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#B03A2E',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '5px 12px',
                borderRadius: '4px',
              }}
            >
              ✦ NỔI BẬT
            </div>
          </div>

          <div
            style={{
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFF0EE',
                color: '#B03A2E',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '18px',
                width: 'fit-content',
              }}
            >
              {categoryIcons[article.category]}
              {article.category}
            </div>

            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#5D4E4E',
                lineHeight: 1.35,
                marginBottom: '14px',
                letterSpacing: '0.01em',
              }}
            >
              {article.title}
            </h2>

            <p
              style={{
                fontSize: '13px',
                color: '#8A7D7D',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              {article.excerpt}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '18px',
                borderTop: '1px solid #E8D7CF',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#5D4E4E', letterSpacing: '0.04em' }}>
                  {article.author}
                </div>
                <div style={{ fontSize: '10px', color: '#8A7D7D', marginTop: '2px', letterSpacing: '0.04em' }}>
                  {article.date} · {article.readTime}
                </div>
              </div>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#B03A2E',
                  letterSpacing: '0.08em',
                }}
              >
                ĐỌC BÀI VIẾT <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

/* ─── Page ──────────────────────────────────────────── */
export default function NewsInsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('TẤT CẢ')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const featuredArticle = allArticles.find((a) => a.featured)!
  const nonFeatured = allArticles.filter((a) => !a.featured)

  const filteredArticles = useMemo(() => {
    return nonFeatured.filter((a) => {
      const matchCat = selectedCategory === 'TẤT CẢ' || a.category === selectedCategory
      const matchSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [selectedCategory, searchQuery])

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredArticles.slice(start, start + itemsPerPage)
  }, [filteredArticles, currentPage])

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FDFAF6' }}>
      <Header />

      {/* ── Hero Title ── */}
      <div style={{ padding: '64px 0 40px', backgroundColor: '#FDFAF6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal direction="left" delay={0}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div
                style={{
                  width: '4px',
                  alignSelf: 'stretch',
                  backgroundColor: '#B03A2E',
                  flexShrink: 0,
                }}
              />
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(40px, 7vw, 72px)',
                    fontWeight: 900,
                    color: '#5D4E4E',
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  TIN TỨC & <span style={{ color: '#B03A2E' }}>INSIGHTS</span>
                </h1>
                <p
                  style={{
                    fontSize: '16px',
                    color: '#8A7D7D',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  GÓC NHÌN CHUYÊN GIA — THỊ TRƯỜNG — PHONG CÁCH SỐNG
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>

          {/* ── Sidebar ── */}
          <aside>
            <div
              style={{
                position: 'sticky',
                top: '80px',
                backgroundColor: '#F5EDE8',
                borderRadius: '12px',
                padding: '28px 24px',
              }}
            >
              {/* Bọc Reveal bên trong khối Sticky để không phá vỡ layout */}
              <Reveal direction="left" delay={0.1}>
                <div style={{ marginBottom: '28px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#5D4E4E',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                    }}
                  >
                    TÌM KIẾM
                  </label>
                  <input
                    type="text"
                    placeholder="TÊN BÀI VIẾT, CHỦ ĐỀ..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #E8D7CF',
                      borderRadius: '8px',
                      fontSize: '11px',
                      letterSpacing: '0.04em',
                      color: '#5D4E4E',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <div style={{ marginBottom: '28px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#5D4E4E',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                    }}
                  >
                    DANH MỤC
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {categories.map((cat) => {
                      const isActive = selectedCategory === cat
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat)
                            setCurrentPage(1)
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: isActive ? 700 : 500,
                            letterSpacing: '0.07em',
                            textAlign: 'left',
                            backgroundColor: isActive ? '#B03A2E' : 'transparent',
                            color: isActive ? '#FFFFFF' : '#5D4E4E',
                            transition: 'background 0.2s, color 0.2s',
                          }}
                        >
                          {cat !== 'TẤT CẢ' && categoryIcons[cat]}
                          {cat}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.3}>
                <div style={{ borderTop: '1px solid #E8D7CF', marginBottom: '20px' }} />
                <Link
                  href="/news"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#5D4E4E',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#5D4E4E'
                  }}
                >
                  XEM TẤT CẢ NỘI DUNG <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
          </aside>

          {/* ── Content Area ── */}
          <div>
            {/* Featured */}
            <FeaturedCard article={featuredArticle} />

            <Reveal direction="up" delay={0.2}>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: '#8A7D7D',
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                }}
              >
                HIỂN THỊ {filteredArticles.length} BÀI VIẾT
              </div>
            </Reveal>

            {/* Grid */}
            {paginated.length > 0 ? (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px',
                  }}
                >
                  {paginated.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Reveal direction="up" delay={0.2}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      {currentPage > 1 && (
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            border: '1px solid #E8D7CF',
                            borderRadius: '8px',
                            backgroundColor: '#FFFFFF',
                            color: '#5D4E4E',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            cursor: 'pointer',
                          }}
                        >
                          <ChevronLeft size={16} /> TRƯỚC
                        </button>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: currentPage === page ? 'none' : '1px solid #E8D7CF',
                            backgroundColor: currentPage === page ? '#B03A2E' : '#FFFFFF',
                            color: currentPage === page ? '#FFFFFF' : '#5D4E4E',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {page}
                        </button>
                      ))}
                      {currentPage < totalPages && (
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            border: '1px solid #E8D7CF',
                            borderRadius: '8px',
                            backgroundColor: '#FFFFFF',
                            color: '#5D4E4E',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            cursor: 'pointer',
                          }}
                        >
                          TIẾP <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </Reveal>
                )}
              </>
            ) : (
              <Reveal direction="up" delay={0.2}>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <p style={{ fontSize: '15px', color: '#5D4E4E', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    KHÔNG TÌM THẤY BÀI VIẾT PHÙ HỢP.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('TẤT CẢ')
                      setSearchQuery('')
                      setCurrentPage(1)
                    }}
                    style={{
                      marginTop: '16px',
                      padding: '10px 24px',
                      backgroundColor: '#B03A2E',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                    }}
                  >
                    XEM TẤT CẢ
                  </button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <ZaloButton />
    </main>
  )
}