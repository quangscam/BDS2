'use client'

import { useEffect, useState, useRef } from 'react'

const stats = [
  { value: 10, suffix: '+', label: 'nam kinh nghiem' },
  { value: 500, suffix: '+', label: 'khach hang' },
  { value: 6, suffix: '', label: 'du an hoan thanh' },
  { value: 98, suffix: '%', label: 'hai long' },
]

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!start) return
    
    let startTime: number | null = null
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start])
  
  return count
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 2000, isVisible)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#B03A2E' }}>
        {count}{suffix}
      </div>
      <p className="text-base md:text-lg" style={{ color: '#5D4E4E' }}>{label}</p>
    </div>
  )
}

const testimonials = [
  {
    id: 1,
    name: 'Nguyen Van Minh',
    role: 'Giam doc Cong ty ABC',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    content: 'HappyHouse da giup gia dinh toi tim duoc ngoi nha mo uoc. Dich vu tu van tan tam, chuyen nghiep va minh bach.',
  },
  {
    id: 2,
    name: 'Tran Thi Huong',
    role: 'Doanh nhan',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    content: 'Toi rat hai long voi can ho tai Centre Point. Chat luong xay dung tuyet voi, tien ich day du va vi tri thuan tien.',
  },
  {
    id: 3,
    name: 'Le Hoang Nam',
    role: 'Ky su CNTT',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    content: 'Quy trinh mua ban nhanh chong, ro rang. Doi ngu nhan vien ho tro nhiet tinh tu dau den cuoi. Cam on HappyHouse!',
  },
]

export function TrustSignals() {
  return (
    <section className="py-20" style={{ backgroundColor: '#FDFAF6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#5D4E4E' }}>
            Khach hang noi gi ve chung toi
          </h2>
          <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#B03A2E' }} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-sm card-hover"
              style={{ borderTop: '4px solid #B03A2E' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold" style={{ color: '#5D4E4E' }}>{testimonial.name}</h4>
                  <p className="text-sm" style={{ color: '#8A7D7D' }}>{testimonial.role}</p>
                </div>
              </div>
              <p className="leading-relaxed italic" style={{ color: '#5D4E4E' }}>
                {'"'}{testimonial.content}{'"'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
