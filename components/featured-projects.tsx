'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const projects = [
  {
    id: 1,
    name: 'Happy Plaza',
    location: 'Trung tâm thành phố',
    price: '1,300,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
    description: 'Căn hộ cao cấp tại vị trí vàng với thiết kế hiện đại',
    units: '180 units',
    completion: '2025',
    tag: 'Commercial Suite',
  },
  {
    id: 2,
    name: 'Happy Shophouse',
    location: 'Khu đô thị mới',
    price: '1,100,000,000 VND',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=500&q=80',
    description: 'Không gian shophouse thương mại hiện đại và trang bị đầy đủ',
    units: '156 units',
    completion: '2024',
    tag: 'Elite Corner Suite',
  },
  {
    id: 3,
    name: 'THÀNH PHÚ HOMES',
    location: 'Khu vực phía tây',
    price: '950,000,000 VND',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    description: 'Nhà phố thương mại tiêu chuẩn với tài chính linh hoạt',
    units: '142 units',
    completion: '2025',
    tag: 'Shophouse',
  },
  {
    id: 4,
    name: 'LUXURY TOWERS',
    location: 'Quận trung tâm',
    price: '1,550,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    description: 'Tòa nhà cao cấp với các tiện ích khang hoàng và mô phỏng',
    units: '198 units',
    completion: '2026',
    tag: 'Premium Residence',
  },
]

export function FeaturedProjects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="projects" className="py-20 bg-white" ref={ref as any}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">DỰ ÁN NỔI BẬT</h2>
          <p className="text-lg text-gray-600">
            Những dự án tiêu biểu với thiết kế kiến trúc vượt trội và tiềm năng đầu tư cao
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${idx * 100}ms` : '0ms',
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden mb-6 card-hover">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                
                {/* Overlay on hover */}
                <Link href={`/projects/${project.id}`} className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <button className="text-white px-8 py-3 rounded font-semibold transition-all hover:opacity-90 btn-hover" style={{ backgroundColor: '#8B4513' }}>
                    Xem chi tiết
                  </button>
                </Link>
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600">{project.location}</p>
                  </div>
                  <span className="text-sm font-semibold px-3 py-1 rounded" style={{ backgroundColor: '#D4AF37', color: '#2D2D2D' }}>
                    {project.tag}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{project.units}</span>
                  <span>Hoàn thành {project.completion}</span>
                </div>

                <p className="text-gray-700 leading-relaxed">{project.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xl font-bold" style={{ color: '#8B4513' }}>{project.price}</span>
                  <Link href={`/projects/${project.id}`} className="flex items-center gap-1 font-semibold transition-colors" style={{ color: '#C41E3A' }}>
                    CHI TIẾT DỰ ÁN <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="/projects" className="inline-block px-10 py-4 rounded text-lg font-semibold transition-all hover:opacity-90 text-white btn-hover" style={{ backgroundColor: '#8B4513' }}>
            XEM TẤT CẢ DỰ ÁN
          </a>
        </div>
      </div>
    </section>
  )
}
