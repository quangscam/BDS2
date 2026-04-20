'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const tagTranslations: { [key: string]: string } = {
  'Commercial Suite': 'Can ho thuong mai',
  'Shophouse': 'Nha pho thuong mai',
  'Premium Residence': 'Can ho cao cap',
  'Smart Home': 'Nha thong minh',
  'Waterfront': 'Can ho ven song',
  'Elite Corner Suite': 'Can goc cao cap',
}

const projects = [
  {
    id: 1,
    name: 'CENTRE POINT',
    location: 'Trung tam thanh pho',
    price: '1,300,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
    description: 'Can ho cao cap tai vi tri vang voi thiet ke hien dai',
    units: '180 units',
    completion: '2025',
    tag: 'Commercial Suite',
    area: '75 - 120 m2',
  },
  {
    id: 2,
    name: 'CENTRE PLAZA',
    location: 'Khu do thi moi',
    price: '1,100,000,000 VND',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=500&q=80',
    description: 'Khong gian shophouse thuong mai hien dai va trang bi day du',
    units: '156 units',
    completion: '2024',
    tag: 'Elite Corner Suite',
    area: '85 - 150 m2',
  },
  {
    id: 3,
    name: 'THANH PHU HOMES',
    location: 'Khu vuc phia tay',
    price: '950,000,000 VND',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    description: 'Nha pho thuong mai tieu chuan voi tai chinh linh hoat',
    units: '142 units',
    completion: '2025',
    tag: 'Shophouse',
    area: '100 - 180 m2',
  },
  {
    id: 4,
    name: 'LUXURY TOWERS',
    location: 'Quan trung tam',
    price: '1,550,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    description: 'Toa nha cao cap voi cac tien ich khang hoang va hien dai',
    units: '198 units',
    completion: '2026',
    tag: 'Premium Residence',
    area: '90 - 200 m2',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{
        transform: hoveredId === project.id ? 'translateY(-6px)' : isVisible ? 'translateY(0)' : 'translateY(30px)',
        boxShadow: hoveredId === project.id ? '0 10px 30px rgba(176, 58, 46, 0.15)' : 'none',
      }}
    >
      <div className="relative h-80 rounded-lg overflow-hidden mb-6">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: hoveredId === project.id ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        
        {/* Overlay on hover */}
        <Link href={`/projects/${project.id}`} className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
            hoveredId === project.id ? 'opacity-100' : 'opacity-0'
          }`}>
          <button 
            className="text-white px-8 py-3 rounded font-semibold transition-colors duration-200"
            style={{ backgroundColor: '#B03A2E' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7B241C'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#B03A2E'
            }}
          >
            Xem chi tiet
          </button>
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold" style={{ color: '#5D4E4E' }}>{project.name}</h3>
            <p style={{ color: '#8A7D7D' }}>{project.location}</p>
          </div>
          <span className="text-sm font-semibold px-3 py-1 rounded" style={{ backgroundColor: '#C9A84C', color: '#5D4E4E' }}>
            {tagTranslations[project.tag] || project.tag}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm" style={{ color: '#8A7D7D' }}>
          <span>{project.units}</span>
          <span>{project.area}</span>
          <span>Hoan thanh {project.completion}</span>
        </div>

        <p className="leading-relaxed" style={{ color: '#5D4E4E' }}>{project.description}</p>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E8D7CF' }}>
          <span className="text-xl font-bold" style={{ color: '#B03A2E' }}>{project.price}</span>
          <Link 
            href={`/projects/${project.id}`} 
            className="flex items-center gap-1 font-semibold transition-colors duration-200"
            style={{ color: '#B03A2E' }}
          >
            Chi tiet du an <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-20" style={{ backgroundColor: '#FDFAF6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#5D4E4E' }}>Du an noi bat</h2>
          <p className="text-lg" style={{ color: '#8A7D7D' }}>
            Nhung du an tieu bieu voi thiet ke kien truc vuot troi va tiem nang dau tu cao
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a 
            href="/projects" 
            className="inline-block px-10 py-4 rounded text-lg font-semibold transition-colors duration-200 text-white"
            style={{ backgroundColor: '#B03A2E' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7B241C'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#B03A2E'
            }}
          >
            Xem tat ca du an
          </a>
        </div>
      </div>
    </section>
  )
}
