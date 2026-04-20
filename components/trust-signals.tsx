'use client'

import { useEffect, useState, useRef } from 'react'

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

/* ─── Dữ liệu ──────────────────────────────────────── */
const stats = [
  { value: 15, suffix: '+', label: 'NĂM KINH NGHIỆM' },
  { value: 500, suffix: '+', label: 'KHÁCH HÀNG HÀI LÒNG' },
  { value: 50, suffix: '+', label: 'DỰ ÁN THÀNH CÔNG' },
  { value: 98, suffix: '%', label: 'TỶ LỆ HÀI LÒNG' },
]

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Văn Minh',
    role: 'Giám đốc Công ty ABC',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    content: 'HappyHouse đã giúp gia đình tôi tìm được ngôi nhà mơ ước. Dịch vụ tư vấn tận tâm, chuyên nghiệp và cực kỳ minh bạch về pháp lý.',
  },
  {
    id: 2,
    name: 'Trần Thị Hương',
    role: 'Nhà đầu tư',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    content: 'Tôi rất hài lòng với shophouse tại dự án mới. Chất lượng xây dựng tuyệt vời, tiện ích đầy đủ và khả năng sinh lời vượt kỳ vọng.',
  },
  {
    id: 3,
    name: 'Lê Hoàng Nam',
    role: 'Chuyên gia CNTT',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    content: 'Quy trình mua bán nhanh chóng, rõ ràng. Đội ngũ nhân viên hỗ trợ nhiệt tình từ lúc xem nhà đến khi nhận sổ. Cảm ơn HappyHouse!',
  },
]

/* ─── Hook đếm số ──────────────────────────────────── */
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!start) return
    
    let startTime: number | null = null
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Sử dụng easing (easeOutQuart) cho số đếm để mượt hơn ở giai đoạn cuối
      const easeOutProgress = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutProgress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end) // Đảm bảo luôn kết thúc ở số đích
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start])
  
  return count
}

/* ─── Component Component Con ──────────────────────── */
function StatItem({ value, suffix, label, delay = 0 }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, visible } = useScrollReveal()
  const count = useCountUp(value, 2000, visible)
  
  return (
    <div 
      ref={ref} 
      className="text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`
      }}
    >
      <div 
        className="text-5xl md:text-6xl font-black mb-3" 
        style={{ color: '#B03A2E', letterSpacing: '-0.02em' }}
      >
        {count}{suffix}
      </div>
      <p 
        className="text-xs md:text-sm font-bold tracking-widest" 
        style={{ color: '#5D4E4E' }}
      >
        {label}
      </p>
    </div>
  )
}

/* ─── Component Chính ──────────────────────────────── */
export function TrustSignals() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#F5EDE8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Khối Thống kê (Stats) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-32 border-b pb-20" style={{ borderColor: '#E8D7CF' }}>
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>
        
        {/* Khối Đánh giá (Testimonials) */}
        <Reveal direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-5xl font-black mb-6 uppercase" 
              style={{ color: '#2C1A1A', letterSpacing: '-0.01em' }}
            >
              KHÁCH HÀNG <span style={{ color: '#B03A2E' }}>NÓI GÌ VỀ CHÚNG TÔI</span>
            </h2>
            <div className="w-20 h-1.5 mx-auto rounded-full" style={{ backgroundColor: '#B03A2E' }} />
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Reveal key={testimonial.id} direction="up" delay={idx * 0.15}>
              <div
                className="bg-white p-8 md:p-10 rounded-xl relative transition-all duration-300 h-full flex flex-col"
                style={{ 
                  borderTop: '4px solid #B03A2E',
                  boxShadow: '0 4px 20px rgba(93, 78, 78, 0.05)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(176, 58, 46, 0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(93, 78, 78, 0.05)'
                }}
              >
                {/* Dấu ngoặc kép mờ trang trí */}
                <div 
                  className="absolute top-6 right-8 text-7xl font-serif opacity-10" 
                  style={{ color: '#B03A2E', lineHeight: 1 }}
                >
                  "
                </div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                    style={{ border: '2px solid #E8D7CF' }}
                  />
                  <div>
                    <h4 className="font-extrabold text-base tracking-wide" style={{ color: '#2C1A1A' }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-xs font-bold tracking-wider uppercase mt-1" style={{ color: '#B03A2E' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <p 
                  className="leading-relaxed italic flex-grow relative z-10 text-sm md:text-base" 
                  style={{ color: '#5D4E4E' }}
                >
                  "{testimonial.content}"
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}