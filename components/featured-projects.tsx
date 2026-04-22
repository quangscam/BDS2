'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

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

/* ─── Dữ liệu Dự Án ────────────────────────────────── */
const tagTranslations: { [key: string]: string } = {
  'Commercial Suite': 'CĂN HỘ THƯƠNG MẠI',
  'Shophouse': 'NHÀ PHỐ THƯƠNG MẠI',
  'Premium Residence': 'CĂN HỘ CAO CẤP',
  'Smart Home': 'NHÀ THÔNG MINH',
  'Waterfront': 'CĂN HỘ VEN SÔNG',
  'Elite Corner Suite': 'CĂN GÓC CAO CẤP',
}

const projects = [
  {
    id: 'ava-center',
    name: 'AVA CENTER',
    location: 'Thuận An, Bình Dương',
    price: 'Từ 1.300.000.000 VND',
    image: '/ava-center/tongquanava.png', // Sử dụng ảnh local theo yêu cầu
    description: 'Dự án tiên phong "Touchable Home" với hệ sinh thái tiện ích All-in-one và ba mặt hướng thủy tuyệt đẹp.',
    units: '855 căn',
    completion: '2027',
    tag: 'Commercial Suite',
    area: '28 - 80 m²',
  },
  {
    id: 'the-pearl-riverside',
    name: 'THE PEARL RIVERSIDE',
    location: 'Bến Lức, Long An',
    price: 'Đang cập nhật',
    image: '/pearlriverside.png', // Sử dụng ảnh local theo yêu cầu
    description: 'Khu đô thị sinh thái khép kín ven sông Vàm Cỏ Đông, sở hữu bến du thuyền và công viên ven sông đẳng cấp.',
    units: '250 căn',
    completion: 'Đã hoàn thiện',
    tag: 'Waterfront',
    area: 'Nhà phố liền kề',
  },
  {
    id: 'arcadia-lavila',
    name: 'ARCADIA AT LAVILA',
    location: 'Phước Kiển, Nhà Bè',
    price: 'Đang cập nhật',
    image: 'https://pavilionhousing.vn/wp-content/uploads/2026/04/Gemini_Generated_Image_jd8fatjd8fatjd8f-scaled-e1776052179865-2048x1132.png',
    description: 'Dự án biểu tượng mang đậm phong cách kiến trúc Pháp đương đại "La Belle Vie" tại trục xương sống Nam Sài Gòn.',
    units: '925 căn',
    completion: 'Đang cập nhật',
    tag: 'Premium Residence',
    area: 'Căn hộ cao cấp',
  },
  {
    id: 'thanh-phu-centre-point',
    name: 'THANH PHÚ CENTRE POINT',
    location: 'Bến Lức, Long An',
    price: 'Đang cập nhật',
    image: 'https://pavilionhousing.vn/wp-content/uploads/2026/03/z7638851530371_2ef2790509c42e42273388a3c672ea3a-2048x1862.jpg',
    description: 'Đại đô thị tích hợp đa chức năng quy mô 200ha, nổi bật với Mega Mall 9.5ha và giao thương sầm uất.',
    units: 'Giai đoạn 1',
    completion: 'T4/2026',
    tag: 'Shophouse',
    area: 'Đa dạng',
  }
]

/* ─── Component Thẻ Dự Án ──────────────────────────── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <Reveal direction="up" delay={index * 0.15}>
      <div
        className="group cursor-pointer rounded-xl overflow-hidden bg-white flex flex-col h-full"
        onMouseEnter={() => setHoveredId(project.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{
          transform: hoveredId === project.id ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hoveredId === project.id ? '0 16px 40px rgba(176, 58, 46, 0.12)' : '0 4px 20px rgba(93, 78, 78, 0.05)',
          border: '1px solid #E8D7CF',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Hình ảnh & Overlay */}
        <div className="relative h-64 overflow-hidden shrink-0">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: hoveredId === project.id ? 'scale(1.08)' : 'scale(1)',
            }}
          />
          
          {/* Tag */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: '#C9A84C',
              color: '#5D4E4E',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '6px 12px',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            {tagTranslations[project.tag] || project.tag}
          </div>

          {/* Nút Xem chi tiết (Overlay) */}
          <Link 
            href={`/projects/${project.id}`} 
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{ 
              backgroundColor: hoveredId === project.id ? 'rgba(44, 26, 26, 0.4)' : 'transparent',
              opacity: hoveredId === project.id ? 1 : 0
            }}
          >
            <span 
              className="text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wide transition-transform duration-300"
              style={{ 
                backgroundColor: '#B03A2E',
                transform: hoveredId === project.id ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              KHÁM PHÁ NGAY
            </span>
          </Link>
        </div>

        {/* Nội dung */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4 shrink-0">
            <h3 className="text-xl font-extrabold mb-2 tracking-tight" style={{ color: '#2C1A1A' }}>
              {project.name}
            </h3>
            <p className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#8A7D7D' }}>
              <MapPin size={16} /> {project.location}
            </p>
          </div>
          
          <div 
            className="flex items-center justify-between text-xs font-bold mb-4 pb-4 border-b shrink-0" 
            style={{ color: '#5D4E4E', borderColor: '#E8D7CF', letterSpacing: '0.04em' }}
          >
            <span>{project.units}</span>
            <span>•</span>
            <span>{project.area}</span>
            <span>•</span>
            <span>BÀN GIAO {project.completion}</span>
          </div>

          <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: '#5D4E4E' }}>
            {project.description}
          </p>

          <div className="flex items-center justify-between shrink-0 mt-auto">
            <div>
              <span className="block text-xs font-bold mb-1" style={{ color: '#8A7D7D', letterSpacing: '0.06em' }}>GIÁ BÁN</span>
              <span className="text-lg font-black" style={{ color: '#B03A2E', letterSpacing: '-0.01em' }}>
                {project.price}
              </span>
            </div>
            
            <Link 
              href={`/projects/${project.id}`} 
              className="flex items-center gap-2 text-xs font-bold transition-colors duration-200"
              style={{ color: hoveredId === project.id ? '#B03A2E' : '#5D4E4E', letterSpacing: '0.06em' }}
            >
              CHI TIẾT <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ─── Component Chính ──────────────────────────────── */
export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 relative" style={{ backgroundColor: '#FDFAF6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tiêu đề */}
        <Reveal direction="left" delay={0}>
          <div className="flex items-start gap-5 mb-16">
            <div style={{ width: '4px', alignSelf: 'stretch', backgroundColor: '#B03A2E', flexShrink: 0, borderRadius: '2px' }} />
            <div>
              <h2 
                className="text-3xl md:text-5xl font-black mb-3 uppercase" 
                style={{ color: '#2C1A1A', letterSpacing: '-0.01em' }}
              >
                DỰ ÁN <span style={{ color: '#B03A2E' }}>NỔI BẬT</span>
              </h2>
              <p className="text-sm md:text-base font-medium uppercase" style={{ color: '#8A7D7D', letterSpacing: '0.06em' }}>
                NHỮNG DỰ ÁN TIÊU BIỂU VỚI KIẾN TRÚC VƯỢT TRỘI VÀ TIỀM NĂNG ĐẦU TƯ CAO
              </p>
            </div>
          </div>
        </Reveal>

        {/* Lưới dự án */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Nút Call to Action */}
        <Reveal direction="up" delay={0.4}>
          <div className="text-center mt-20">
            <Link 
              href="/projects" 
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
              XEM TẤT CẢ DỰ ÁN <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}