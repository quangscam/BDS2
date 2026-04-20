'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const allProjects = [
  {
    id: 1,
    name: 'Happy Plaza',
    location: 'Trung tâm thành phố',
    area: 'Quận 1',
    price: 1300000000,
    priceDisplay: '1,300,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
    description: 'Căn hộ cao cấp tại vị trí vàng với thiết kế hiện đại',
    type: 'Căn hộ',
    units: '180 units',
    completion: '2025',
    tag: 'Commercial Suite',
  },
  {
    id: 2,
    name: 'Happy Shophouse',
    location: 'Khu đô thị mới',
    area: 'Quận 2',
    price: 1100000000,
    priceDisplay: '1,100,000,000 VND',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=500&q=80',
    description: 'Không gian shophouse thương mại hiện đại và trang bị đầy đủ',
    type: 'Shophouse',
    units: '156 units',
    completion: '2024',
    tag: 'Elite Corner Suite',
  },
  {
    id: 3,
    name: 'THÀNH PHÚ HOMES',
    location: 'Khu vực phía tây',
    area: 'Quận 5',
    price: 950000000,
    priceDisplay: '950,000,000 VND',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    description: 'Nhà phố thương mại tiêu chuẩn với tài chính linh hoạt',
    type: 'Nhà phố',
    units: '142 units',
    completion: '2025',
    tag: 'Shophouse',
  },
  {
    id: 4,
    name: 'LUXURY TOWERS',
    location: 'Quận trung tâm',
    area: 'Quận 3',
    price: 1550000000,
    priceDisplay: '1,550,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    description: 'Tòa nhà cao cấp với các tiện ích khang hoàng',
    type: 'Căn hộ',
    units: '198 units',
    completion: '2026',
    tag: 'Premium Residence',
  },
  {
    id: 5,
    name: 'RIVERSIDE ELITE',
    location: 'Bờ sông Sài Gòn',
    area: 'Quận 7',
    price: 1450000000,
    priceDisplay: '1,450,000,000 VND',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    description: 'Căn hộ hướng sông với view tuyệt đẹp',
    type: 'Căn hộ',
    units: '220 units',
    completion: '2025',
    tag: 'Waterfront',
  },
  {
    id: 6,
    name: 'TECH PARK RESIDENCES',
    location: 'Khu công nghệ cao',
    area: 'Quận 9',
    price: 850000000,
    priceDisplay: '850,000,000 VND',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=500&q=80',
    description: 'Căn hộ thông minh với công nghệ tiên tiến',
    type: 'Căn hộ',
    units: '165 units',
    completion: '2026',
    tag: 'Smart Home',
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000000])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal()

  const types = ['Căn hộ', 'Shophouse', 'Nhà phố']
  const areas = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 9']

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
    <main className="min-h-screen">
      <Header />

      {/* Page Title */}
      <div className="bg-white py-16" style={{ borderColor: '#B03A2E' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-16 rounded" style={{ backgroundColor: '#B03A2E' }}></div>
            <div className="pl-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ lineHeight: '1.2' }}>
                Tìm ngôi nhà <span style={{ color: '#B03A2E' }}>của bạn</span>
              </h1>
              <p className="text-lg" style={{ color: '#5D4E4E' }}>
                Từ căn hộ hiện đại đến nhà phố ấm cúng — HappyHouse có tất cả
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6 bg-gray-50 p-6 rounded-lg">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Tìm kiếm</label>
                  <input
                    type="text"
                    placeholder="Tên dự án, địa điểm..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Loại bất động sản</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value={null}
                        checked={selectedType === null}
                        onChange={() => {
                          setSelectedType(null)
                          setCurrentPage(1)
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Tất cả</span>
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
                        />
                        <span className="text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Khu vực</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="area"
                        value={null}
                        checked={selectedArea === null}
                        onChange={() => {
                          setSelectedArea(null)
                          setCurrentPage(1)
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Tất cả</span>
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
                        />
                        <span className="text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Giá (VND)</label>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-600">Từ:</label>
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
                      />
                      <span className="text-xs text-gray-600">{(priceRange[0] / 1000000000).toFixed(1)}B VND</span>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Đến:</label>
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
                      />
                      <span className="text-xs text-gray-600">{(priceRange[1] / 1000000000).toFixed(1)}B VND</span>
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
                  className="w-full py-2 rounded text-white font-semibold transition-all hover:opacity-90 btn-hover"
                  style={{ backgroundColor: '#C41E3A' }}
                >
                  ĐẶT LẠI BỘ LỌC
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="lg:col-span-3" ref={cardsRef as any}>
              {paginatedProjects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {paginatedProjects.map((project, idx) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className={`group cursor-pointer hover:shadow-lg transition-all duration-500 card-hover ${
                          cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{
                          transitionDelay: cardsVisible ? `${idx * 75}ms` : '0ms',
                        }}
                      >
                        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-4 image-zoom">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <span
                              className="text-xs font-semibold px-3 py-1 rounded"
                              style={{ backgroundColor: '#D4AF37', color: '#2D2D2D' }}
                            >
                              {project.tag}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:underline">{project.name}</h3>
                          <p className="text-gray-600 text-sm">{project.location}</p>

                          <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>

                          <div className="flex items-center justify-between text-xs text-gray-600 pt-2">
                            <span>{project.units}</span>
                            <span>Hoàn thành {project.completion}</span>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <span className="text-lg font-bold" style={{ color: '#8B4513' }}>
                              {project.priceDisplay}
                            </span>
                            <span className="flex items-center gap-1 font-semibold" style={{ color: '#C41E3A' }}>
                              CHI TIẾT <ArrowRight size={18} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      {currentPage > 1 && (
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <ChevronLeft size={18} />
                          Trước
                        </button>
                      )}

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                          style={
                            currentPage === page ? { backgroundColor: '#8B4513' } : {}
                          }
                        >
                          {page}
                        </button>
                      ))}

                      {currentPage < totalPages && (
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Tiếp <ChevronRight size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Không tìm thấy dự án phù hợp với bộ lọc của bạn.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedType(null)
                      setSelectedArea(null)
                      setPriceRange([0, 2000000000])
                      setCurrentPage(1)
                    }}
                    className="mt-4 px-6 py-2 rounded text-white font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8B4513' }}
                  >
                    ĐẶT LẠI BỘ LỌC
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
