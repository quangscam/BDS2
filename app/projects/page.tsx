'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ZaloButton } from '@/components/zalo-button'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const tagTranslations: { [key: string]: string } = {
  'Commercial Suite': 'Can ho thuong mai',
  'Shophouse': 'Nha pho thuong mai',
  'Premium Residence': 'Can ho cao cap',
  'Smart Home': 'Nha thong minh',
  'Waterfront': 'Can ho ven song',
  'Elite Corner Suite': 'Can goc cao cap',
}

const allProjects = [
  {
    id: 1,
    name: 'CENTRE POINT',
    location: 'Trung tam thanh pho',
    area: 'Quan 1',
    price: 1300000000,
    priceDisplay: '1,300,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
    description: 'Can ho cao cap tai vi tri vang voi thiet ke hien dai',
    type: 'Can ho',
    units: '180 units',
    completion: '2025',
    tag: 'Commercial Suite',
    squareMeters: '75 - 120 m2',
  },
  {
    id: 2,
    name: 'CENTRE PLAZA',
    location: 'Khu do thi moi',
    area: 'Quan 2',
    price: 1100000000,
    priceDisplay: '1,100,000,000 VND',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=500&q=80',
    description: 'Khong gian shophouse thuong mai hien dai va trang bi day du',
    type: 'Shophouse',
    units: '156 units',
    completion: '2024',
    tag: 'Elite Corner Suite',
    squareMeters: '85 - 150 m2',
  },
  {
    id: 3,
    name: 'THANH PHU HOMES',
    location: 'Khu vuc phia tay',
    area: 'Quan 5',
    price: 950000000,
    priceDisplay: '950,000,000 VND',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    description: 'Nha pho thuong mai tieu chuan voi tai chinh linh hoat',
    type: 'Nha pho',
    units: '142 units',
    completion: '2025',
    tag: 'Shophouse',
    squareMeters: '100 - 180 m2',
  },
  {
    id: 4,
    name: 'LUXURY TOWERS',
    location: 'Quan trung tam',
    area: 'Quan 3',
    price: 1550000000,
    priceDisplay: '1,550,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    description: 'Toa nha cao cap voi cac tien ich khang hoang',
    type: 'Can ho',
    units: '198 units',
    completion: '2026',
    tag: 'Premium Residence',
    squareMeters: '90 - 200 m2',
  },
  {
    id: 5,
    name: 'RIVERSIDE ELITE',
    location: 'Bo song Sai Gon',
    area: 'Quan 7',
    price: 1450000000,
    priceDisplay: '1,450,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    description: 'Can ho huong song voi view tuyet dep',
    type: 'Can ho',
    units: '220 units',
    completion: '2025',
    tag: 'Waterfront',
    squareMeters: '80 - 160 m2',
  },
  {
    id: 6,
    name: 'TECH PARK RESIDENCES',
    location: 'Khu cong nghe cao',
    area: 'Quan 9',
    price: 850000000,
    priceDisplay: '850,000,000 VND',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=500&q=80',
    description: 'Can ho thong minh voi cong nghe tien tien',
    type: 'Can ho',
    units: '165 units',
    completion: '2026',
    tag: 'Smart Home',
    squareMeters: '65 - 110 m2',
  },
]

function ProjectCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

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
    <Link
      ref={ref}
      href={`/projects/${project.id}`}
      className={`group cursor-pointer block transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transform: isHovered ? 'translateY(-6px)' : isVisible ? 'translateY(0)' : 'translateY(30px)',
        boxShadow: isHovered ? '0 10px 30px rgba(176, 58, 46, 0.15)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 rounded-lg overflow-hidden mb-4">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div className="absolute top-4 right-4">
          <span
            className="text-xs font-semibold px-3 py-1 rounded"
            style={{ backgroundColor: '#C9A84C', color: '#5D4E4E' }}
          >
            {tagTranslations[project.tag] || project.tag}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold group-hover:underline" style={{ color: '#5D4E4E' }}>{project.name}</h3>
        <p className="text-sm" style={{ color: '#8A7D7D' }}>{project.location}</p>

        <p className="text-sm leading-relaxed" style={{ color: '#5D4E4E' }}>{project.description}</p>

        <div className="flex items-center justify-between text-xs pt-2" style={{ color: '#8A7D7D' }}>
          <span>{project.units}</span>
          <span>{project.squareMeters}</span>
          <span>Hoan thanh {project.completion}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E8D7CF' }}>
          <span className="text-lg font-bold" style={{ color: '#B03A2E' }}>
            {project.priceDisplay}
          </span>
          <span className="flex items-center gap-1 font-semibold" style={{ color: '#B03A2E' }}>
            Chi tiet <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000000])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const types = ['Can ho', 'Shophouse', 'Nha pho']
  const areas = ['Quan 1', 'Quan 2', 'Quan 3', 'Quan 5', 'Quan 7', 'Quan 9']

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

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FDFAF6' }}>
      <Header />

      {/* Page Title */}
      <div className="py-16" style={{ backgroundColor: '#FDFAF6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="w-1 self-stretch" style={{ backgroundColor: '#B03A2E' }} />
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ lineHeight: '1.2', color: '#5D4E4E' }}>
                Tim ngoi nha <span style={{ color: '#B03A2E' }}>cua ban</span>
              </h1>
              <p className="text-lg" style={{ color: '#5D4E4E' }}>
                Tu can ho hien dai den nha pho am cung — HappyHouse co tat ca
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12" style={{ backgroundColor: '#FDFAF6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6 p-6 rounded-lg" style={{ backgroundColor: '#F5F0EB' }}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#5D4E4E' }}>Tim kiem</label>
                  <input
                    type="text"
                    placeholder="Ten du an, dia diem..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E8D7CF', '--tw-ring-color': '#C9A84C' } as React.CSSProperties}
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#5D4E4E' }}>Loai bat dong san</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === null}
                        onChange={() => {
                          setSelectedType(null)
                          setCurrentPage(1)
                        }}
                        className="mr-2"
                        style={{ accentColor: '#B03A2E' }}
                      />
                      <span style={{ color: '#5D4E4E' }}>Tat ca</span>
                    </label>
                    {types.map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={selectedType === type}
                          onChange={() => {
                            setSelectedType(type)
                            setCurrentPage(1)
                          }}
                          className="mr-2"
                          style={{ accentColor: '#B03A2E' }}
                        />
                        <span style={{ color: '#5D4E4E' }}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#5D4E4E' }}>Khu vuc</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="area"
                        checked={selectedArea === null}
                        onChange={() => {
                          setSelectedArea(null)
                          setCurrentPage(1)
                        }}
                        className="mr-2"
                        style={{ accentColor: '#B03A2E' }}
                      />
                      <span style={{ color: '#5D4E4E' }}>Tat ca</span>
                    </label>
                    {areas.map((area) => (
                      <label key={area} className="flex items-center">
                        <input
                          type="radio"
                          name="area"
                          value={area}
                          checked={selectedArea === area}
                          onChange={() => {
                            setSelectedArea(area)
                            setCurrentPage(1)
                          }}
                          className="mr-2"
                          style={{ accentColor: '#B03A2E' }}
                        />
                        <span style={{ color: '#5D4E4E' }}>{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#5D4E4E' }}>Gia (VND)</label>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs" style={{ color: '#8A7D7D' }}>Tu:</label>
                      <input
                        type="range"
                        min="0"
                        max="2000000000"
                        step="50000000"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const newMin = parseInt(e.target.value)
                          if (newMin <= priceRange[1]) {
                            setPriceRange([newMin, priceRange[1]])
                            setCurrentPage(1)
                          }
                        }}
                        className="w-full"
                        style={{ accentColor: '#B03A2E' }}
                      />
                      <span className="text-xs" style={{ color: '#8A7D7D' }}>{(priceRange[0] / 1000000000).toFixed(1)}B VND</span>
                    </div>
                    <div>
                      <label className="text-xs" style={{ color: '#8A7D7D' }}>Den:</label>
                      <input
                        type="range"
                        min="0"
                        max="2000000000"
                        step="50000000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const newMax = parseInt(e.target.value)
                          if (newMax >= priceRange[0]) {
                            setPriceRange([priceRange[0], newMax])
                            setCurrentPage(1)
                          }
                        }}
                        className="w-full"
                        style={{ accentColor: '#B03A2E' }}
                      />
                      <span className="text-xs" style={{ color: '#8A7D7D' }}>{(priceRange[1] / 1000000000).toFixed(1)}B VND</span>
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedType(null)
                    setSelectedArea(null)
                    setPriceRange([0, 2000000000])
                    setCurrentPage(1)
                  }}
                  className="w-full py-2 rounded text-white font-semibold transition-colors duration-200"
                  style={{ backgroundColor: '#B03A2E' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#7B241C'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#B03A2E'
                  }}
                >
                  Dat lai bo loc
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="lg:col-span-3">
              {paginatedProjects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {paginatedProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      {currentPage > 1 && (
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors"
                          style={{ borderColor: '#E8D7CF', color: '#5D4E4E' }}
                        >
                          <ChevronLeft size={18} />
                          Truoc
                        </button>
                      )}

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'text-white'
                              : 'border hover:bg-gray-50'
                          }`}
                          style={
                            currentPage === page 
                              ? { backgroundColor: '#B03A2E' } 
                              : { borderColor: '#E8D7CF', color: '#5D4E4E' }
                          }
                        >
                          {page}
                        </button>
                      ))}

                      {currentPage < totalPages && (
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors"
                          style={{ borderColor: '#E8D7CF', color: '#5D4E4E' }}
                        >
                          Tiep <ChevronRight size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg" style={{ color: '#5D4E4E' }}>Khong tim thay du an phu hop voi bo loc cua ban.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedType(null)
                      setSelectedArea(null)
                      setPriceRange([0, 2000000000])
                      setCurrentPage(1)
                    }}
                    className="mt-4 px-6 py-2 rounded text-white font-semibold transition-colors duration-200"
                    style={{ backgroundColor: '#B03A2E' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#7B241C'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#B03A2E'
                    }}
                  >
                    Dat lai bo loc
                  </button>
                </div>
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
