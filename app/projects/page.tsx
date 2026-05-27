'use client'

import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'

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

/* ─── Data ───────────────────────────────────── */
const tagLabels: { [key: string]: string } = {
  'Commercial Suite': 'CĂN HỘ THƯƠNG MẠI',
  'Shophouse': 'NHÀ PHỐ THƯƠNG MẠI',
  'Premium Residence': 'CĂN HỘ CAO CẤP',
  'Smart Home': 'NHÀ THÔNG MINH',
  'Waterfront': 'CĂN HỘ VEN SÔNG',
  'Elite Corner Suite': 'CĂN GÓC CAO CẤP',
  'Detox & Healthy': 'CĂN HỘ SỨC KHỎE',
  'Riverside Town': 'NHÀ PHỐ VEN SÔNG',
  'Center Point': 'TRUNG TÂM THƯƠNG MẠI',
  'Knowledge Park': 'ĐÔ THỊ TRI THỨC',
}

const allProjects = [
  {
    id: 1,
    name: 'AVA CENTER',
    slug: 'du-an-ava-center',
    location: 'THUẬN AN, BÌNH DƯƠNG',
    area: 'THUẬN AN',
    price: 1500000000, 
    priceDisplay: 'ĐANG CẬP NHẬT',
    image: '/ava-center/tongquanava.png',
    description: 'CĂN HỘ CAO CẤP TẠI VỊ TRÍ VÀNG VỚI THIẾT KẾ HIỆN ĐẠI',
    type: 'CĂN HỘ',
    units: '628 CĂN',
    completion: '2027',
    tag: 'Premium Residence',
    squareMeters: '211 OFFICETEL • 6 TMDV',
  },
  {
    id: 2,
    name: 'THE PEAK GARDEN',
    slug: 'du-an-the-peakgarden',
    location: 'QUẬN 7, HỒ CHÍ MINH',
    area: 'QUẬN 7',
    price: 3000000000, 
    priceDisplay: 'TỪ 46 TRIỆU/M²',
    image: '/the-peak-garden/banner-main-type2.jpg',
    description: 'CĂN HỘ CHĂM SÓC SỨC KHỎE & SẮC ĐẸP ĐẦU TIÊN TẠI NAM SÀI GÒN',
    type: 'CĂN HỘ',
    units: '900+ CĂN',
    completion: '2026',
    tag: 'Detox & Healthy',
    squareMeters: '39 TIỆN ÍCH • 5.2 HA',
  },
  {
    id: 3,
    name: 'THANH PHÚ CENTRE POINT',
    slug: 'du-an-thanh-phu-centre-point',
    location: 'BẾN LỨC, LONG AN',
    area: 'BẾN LỨC',
    price: 2500000000,
    priceDisplay: 'LIÊN HỆ BÁO GIÁ',
    image: '/thanh-phu-centre-point/tongquan.jpg',
    description: 'KHU DÂN CƯ THƯƠNG MẠI TRUNG TÂM VỚI HẠ TẦNG ĐỒNG BỘ',
    type: 'NHÀ PHỐ',
    units: 'ĐANG CẬP NHẬT',
    completion: '2026',
    tag: 'Center Point',
    squareMeters: 'TIỆN ÍCH ĐA NĂNG',
  },
  {
    id: 5,
    name: 'VINHOMES SÀI GÒN PARK',
    slug: 'du-an-vinhomes-saigon-park',
    location: 'HÓC MÔN, HỒ CHÍ MINH',
    area: 'HÓC MÔN',
    price: 0,
    priceDisplay: 'ĐANG CẬP NHẬT',
    image: '/placeholder.jpg',
    description: 'ĐẠI ĐÔ THỊ CÔNG VIÊN TRI THỨC QUY MÔ KHOẢNG 1.080HA TẠI CỬA NGÕ TÂY BẮC TP.HCM',
    type: 'ĐẠI ĐÔ THỊ',
    units: '1.080 HA',
    completion: 'ĐANG TRIỂN KHAI',
    tag: 'Knowledge Park',
    squareMeters: 'ĐẠI HỌC QUỐC TẾ • CÔNG VIÊN',
  },
  {
    id: 4,
    name: 'PEARL RIVERSIDE',
    slug: 'du-an-pearl-riverside',
    location: 'QUẬN 8, HỒ CHÍ MINH',
    area: 'QUẬN 8',
    price: 6390000000,
    priceDisplay: 'TỪ 6.39 TỶ/CĂN',
    image: '/pearl-riverside/tongquan.jpg',
    description: 'NHÀ PHỐ THƯƠNG MẠI VEN SÔNG PHONG CÁCH TÂN CỔ ĐIỂN SANG TRỌNG',
    type: 'NHÀ PHỐ',
    units: '50 CĂN',
    completion: '2025',
    tag: 'Waterfront',
    squareMeters: '1 TRỆT 1 LỬNG 2 LẦU',
  }
]

/* ─── Project Card ────────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Reveal direction="up" delay={index * 0.1}>
      <Link
        href={`/projects/${project.slug}`} 
        style={{
          display: 'block',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          boxShadow: isHovered ? '0 10px 30px rgba(176,58,46,0.15)' : 'none',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          textDecoration: 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.35s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              backgroundColor: '#C9A84C',
              color: '#FFFFFF',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: '4px',
            }}
          >
            {tagLabels[project.tag] || project.tag}
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#2C1A1A',
              letterSpacing: '0.02em',
              marginBottom: '4px',
              textDecoration: isHovered ? 'underline' : 'none',
            }}
          >
            {project.name}
          </h3>
          <p style={{ fontSize: '11px', color: '#8A7D7D', letterSpacing: '0.05em', marginBottom: '10px', fontWeight: 600 }}>
            {project.location}
          </p>
          <p style={{ fontSize: '12px', color: '#5D4E4E', lineHeight: 1.6, letterSpacing: '0.03em', marginBottom: '12px' }}>
            {project.description}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: '#8A7D7D',
              letterSpacing: '0.06em',
              paddingBottom: '14px',
              marginBottom: '14px',
              borderBottom: '1px solid #E8D7CF',
              fontWeight: 700
            }}
          >
            <span>{project.units}</span>
            <span>{project.squareMeters}</span>
            <span style={{ color: '#2C8A4F' }}>HT: {project.completion}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#B03A2E', letterSpacing: '0.01em' }}>
              {project.priceDisplay}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#B03A2E',
                letterSpacing: '0.08em',
              }}
            >
              CHI TIẾT <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

/* ─── Projects Logic Component ────────────────────────────────────────── */
function ProjectsContent() {
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000000])
  const [currentPage, setCurrentPage] = useState(1)
  
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const itemsPerPage = 6

  const types = [
    { value: 'CĂN HỘ', label: 'CĂN HỘ CHUNG CƯ' },
    { value: 'SHOPHOUSE', label: 'SHOPHOUSE' },
    { value: 'NHÀ PHỐ', label: 'NHÀ PHỐ' },
  ]
  
  const areas = ['THUẬN AN', 'QUẬN 7', 'DĨ AN', 'THỦ ĐỨC', 'QUẬN 1', 'QUẬN 2', 'QUẬN 9', 'QUẬN 8', 'BẾN LỨC']

  // Đọc dữ liệu từ URL khi trang vừa load
  useEffect(() => {
    const qParam = searchParams.get('q')
    if (qParam) setSearchQuery(qParam)

    const typeParam = searchParams.get('type')
    if (typeParam && typeParam !== 'Tất cả loại') {
      if (typeParam === 'Căn hộ chung cư') setSelectedType('CĂN HỘ')
      else if (typeParam === 'Shophouse') setSelectedType('SHOPHOUSE')
      else if (typeParam === 'Nhà phố') setSelectedType('NHÀ PHỐ')
    }

    const areaParam = searchParams.get('area')
    if (areaParam && areaParam !== 'Tất cả khu vực') {
      setSelectedArea(areaParam.toUpperCase())
    }

    const priceParam = searchParams.get('price')
    if (priceParam && priceParam !== 'Tất cả mức giá') {
      if (priceParam === 'Từ 0.0 - 5.0 Tỷ') setPriceRange([0, 5000000000])
      else if (priceParam === 'Từ 5.0 - 10.0 Tỷ') setPriceRange([5000000000, 10000000000])
      else if (priceParam === 'Trên 10 Tỷ') setPriceRange([10000000000, 50000000000]) 
    }
  }, [searchParams])

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchType = !selectedType || project.type === selectedType
      const matchArea = !selectedArea || project.area === selectedArea
      const matchPrice = project.price >= priceRange[0] && project.price <= priceRange[1]
      return matchSearch && matchType && matchArea && matchPrice
    })
  }, [searchQuery, selectedType, selectedArea, priceRange])

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProjects, currentPage])

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedType(null)
    setSelectedArea(null)
    setPriceRange([0, 10000000000])
    setCurrentPage(1)
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color: '#5D4E4E',
    marginBottom: '10px',
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FDFAF6', fontFamily: 'sans-serif' }}>
      <Header />

      {/* ── Hero Title ── */}
      <div className="pt-24 lg:pt-32 pb-10" style={{ backgroundColor: '#FDFAF6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal direction="left" delay={0}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ width: '4px', alignSelf: 'stretch', backgroundColor: '#B03A2E', flexShrink: 0 }} />
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(36px, 7vw, 72px)',
                    fontWeight: 900,
                    color: '#2C1A1A',
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                    marginBottom: '12px',
                  }}
                >
                  TÌM NGÔI NHÀ <span style={{ color: '#B03A2E' }}>CỦA BẠN</span>
                </h1>
                <p style={{ fontSize: '13px', color: '#8A7D7D', letterSpacing: '0.05em', fontWeight: 600 }}>
                  TỪ CĂN HỘ HIỆN ĐẠI ĐẾN NHÀ PHỐ ẤM CÚNG — HAPPYHOUSE CÓ TẤT CẢ
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ padding: '0 0 80px', backgroundColor: '#FDFAF6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-10">

            {/* ── Sidebar ── */}
            <aside className="w-full">
              <div
                className="relative lg:sticky lg:top-[100px]"
                style={{
                  backgroundColor: '#F5EDE8',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                {/* Nút Toggle Bộ lọc trên Mobile */}
                <div 
                  className="flex justify-between items-center lg:hidden cursor-pointer pb-2"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  <span style={{...labelStyle, marginBottom: 0, fontSize: '12px'}}>
                    {showMobileFilters ? 'ĐÓNG BỘ LỌC' : 'HIỂN THỊ BỘ LỌC DỰ ÁN'}
                  </span>
                  {showMobileFilters ? <X size={20} color="#B03A2E" /> : <Filter size={20} color="#B03A2E" />}
                </div>

                <div className={`${showMobileFilters ? 'flex' : 'hidden'} lg:flex flex-col gap-6 mt-4 lg:mt-0 transition-all duration-300`}>
                  
                  {/* Search */}
                  <div>
                    <label style={labelStyle}>TÌM KIẾM</label>
                    <input
                      type="text"
                      placeholder="TÊN DỰ ÁN, ĐỊA ĐIỂM..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1px solid #E8D7CF',
                        borderRadius: '8px',
                        fontSize: '11px',
                        letterSpacing: '0.04em',
                        color: '#2C1A1A',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontWeight: 600
                      }}
                    />
                  </div>

                  <div style={{ borderTop: '1px solid #E8D7CF' }} />

                  {/* Property Type */}
                  <div>
                    <label style={labelStyle}>LOẠI BẤT ĐỘNG SẢN</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[{ value: null, label: 'TẤT CẢ' }, ...types].map((t) => (
                        <label
                          key={t.label}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          <input
                            type="radio"
                            name="type"
                            checked={selectedType === t.value}
                            onChange={() => { setSelectedType(t.value); setCurrentPage(1) }}
                            style={{ accentColor: '#B03A2E', width: '16px', height: '16px' }}
                          />
                          <span style={{ fontSize: '11px', letterSpacing: '0.06em', color: '#5D4E4E', fontWeight: selectedType === t.value ? 800 : 500 }}>
                            {t.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #E8D7CF' }} />

                  {/* Area */}
                  <div>
                    <label style={labelStyle}>KHU VỰC</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[{ value: null, label: 'TẤT CẢ' }, ...areas.map(a => ({ value: a, label: a }))].map((a) => (
                        <label
                          key={a.label}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                          <input
                            type="radio"
                            name="area"
                            checked={selectedArea === a.value}
                            onChange={() => { setSelectedArea(a.value); setCurrentPage(1) }}
                            style={{ accentColor: '#B03A2E', width: '16px', height: '16px' }}
                          />
                          <span style={{ fontSize: '11px', letterSpacing: '0.06em', color: '#5D4E4E', fontWeight: selectedArea === a.value ? 800 : 500 }}>
                            {a.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #E8D7CF' }} />

                  {/* Price Range */}
                  <div>
                    <label style={labelStyle}>GIÁ (VND)</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#8A7D7D', letterSpacing: '0.06em', marginBottom: '6px', fontWeight: 600 }}>TỪ:</div>
                        <input
                          type="range"
                          min="0"
                          max="10000000000"
                          step="100000000"
                          value={priceRange[0]}
                          onChange={(e) => {
                            const v = parseInt(e.target.value)
                            if (v <= priceRange[1]) { setPriceRange([v, priceRange[1]]); setCurrentPage(1) }
                          }}
                          style={{ width: '100%', accentColor: '#B03A2E' }}
                        />
                        <div style={{ fontSize: '11px', color: '#B03A2E', fontWeight: 800, letterSpacing: '0.04em', marginTop: '4px' }}>
                          {(priceRange[0] / 1_000_000_000).toFixed(1)} TỶ VND
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: '#8A7D7D', letterSpacing: '0.06em', marginBottom: '6px', fontWeight: 600 }}>ĐẾN:</div>
                        <input
                          type="range"
                          min="0"
                          max="10000000000"
                          step="100000000"
                          value={priceRange[1]}
                          onChange={(e) => {
                            const v = parseInt(e.target.value)
                            if (v >= priceRange[0]) { setPriceRange([priceRange[0], v]); setCurrentPage(1) }
                          }}
                          style={{ width: '100%', accentColor: '#B03A2E' }}
                        />
                        <div style={{ fontSize: '11px', color: '#B03A2E', fontWeight: 800, letterSpacing: '0.04em', marginTop: '4px' }}>
                          {(priceRange[1] / 1_000_000_000).toFixed(1)} TỶ VND
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reset */}
                  <button
                    onClick={resetFilters}
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: '#B03A2E',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      marginTop: '10px'
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7B241C' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E' }}
                  >
                    ĐẶT LẠI BỘ LỌC
                  </button>

                </div>
              </div>
            </aside>

            {/* ── Projects Grid ── */}
            <div className="w-full">
              <Reveal direction="up" delay={0.1}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#8A7D7D',
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #E8D7CF'
                  }}
                >
                  TÌM THẤY {filteredProjects.length} DỰ ÁN
                </div>
              </Reveal>

              {paginatedProjects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {paginatedProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Reveal direction="up" delay={0.2}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {currentPage > 1 && (
                          <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '10px 18px',
                              border: '1px solid #E8D7CF',
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                              color: '#5D4E4E',
                              fontSize: '11px',
                              fontWeight: 700,
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
                              padding: '10px 16px',
                              borderRadius: '8px',
                              border: currentPage === page ? 'none' : '1px solid #E8D7CF',
                              backgroundColor: currentPage === page ? '#B03A2E' : '#FFFFFF',
                              color: currentPage === page ? '#FFFFFF' : '#5D4E4E',
                              fontSize: '12px',
                              fontWeight: 800,
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
                              padding: '10px 18px',
                              border: '1px solid #E8D7CF',
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                              color: '#5D4E4E',
                              fontSize: '11px',
                              fontWeight: 700,
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
                  <div style={{ textAlign: 'center', padding: '80px 0', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px dashed #E8D7CF' }}>
                    <p style={{ fontSize: '15px', color: '#5D4E4E', letterSpacing: '0.05em', marginBottom: '20px', fontWeight: 600 }}>
                      KHÔNG TÌM THẤY DỰ ÁN PHÙ HỢP VỚI BỘ LỌC.
                    </p>
                    <button
                      onClick={resetFilters}
                      style={{
                        padding: '12px 28px',
                        backgroundColor: '#B03A2E',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7B241C' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E' }}
                    >
                      ĐẶT LẠI BỘ LỌC
                    </button>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ZaloButton />
    </main>
  )
}

/* ─── Export Component Bọc Trong Suspense ────────────────────────────────────────── */
export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#B03A2E] font-bold">Đang tải dữ liệu...</div>}>
      <ProjectsContent />
    </Suspense>
  )
}
