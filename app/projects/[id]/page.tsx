'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'

const projectsData: Record<number, any> = {
  1: {
    id: 1,
    name: 'Happy Plaza',
    location: 'Trung tâm thành phố, Quận 1',
    area: 'Quận 1',
    price: '1,300,000,000 VND',
    startingPrice: '1.3 Tỷ VND',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    description: 'Căn hộ cao cấp tại vị trí vàng với thiết kế hiện đại',
    fullDescription: 'Happy Plaza là dự án bất động sản cao cấp được phát triển với tiêu chuẩn quốc tế. Nằm tại vị trí vàng trong lòng thành phố, dự án này mang đến không gian sống đẳng cấp cho những cư dân khó tính.',
    units: '180 units',
    completion: '2025',
    tag: 'Commercial Suite',
    completionDate: 'Q4 2025',
    developer: 'HappyHouse DEVELOPMENT',
    address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    totalArea: '45,000 m²',
    landArea: '15,000 m²',
    projectType: 'Căn hộ cao cấp',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    ],
    amenities: [
      { icon: '🏊', name: 'Bể bơi Olympic', description: 'Bể bơi tiêu chuẩn Olympic 50m' },
      { icon: '🏋️', name: 'Phòng tập gym', description: 'Phòng tập hiện đại với trang thiết bị đầy đủ' },
      { icon: '🌳', name: 'Công viên xanh', description: 'Khu vực cây xanh và không gian thư giãn' },
      { icon: '🅿️', name: 'Bãi đỗ xe', description: 'Bãi đỗ xe ngầm tương ứng mỗi căn hộ' },
      { icon: '🍽️', name: 'Nhà hàng', description: 'Nhà hàng hạng 5 sao phục vụ cư dân' },
      { icon: '🛡️', name: 'An ninh 24/7', description: 'Hệ thống an ninh tự động 24 giờ' },
    ],
    floorPlans: [
      { name: '1 Phòng ngủ', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', area: '55-70 m²', price: '1.3 - 1.5 tỷ' },
      { name: '2 Phòng ngủ', image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=400&q=80', area: '85-100 m²', price: '1.8 - 2.2 tỷ' },
      { name: '3 Phòng ngủ', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', area: '120-150 m²', price: '2.5 - 3.0 tỷ' },
    ],
    highlights: [
      'Vị trí vàng, gần các trung tâm thương mại',
      'Thiết kế kiến trúc hiện đại, phong cách Âu',
      'Tiện ích đầy đủ và cao cấp',
      'Quản lý chuyên nghiệp 24/7',
      'Vốn đầu tư an toàn, sinh lời cao',
    ],
    coordinates: { lat: 10.7769, lng: 106.6955 },
  },
  2: {
    id: 2,
    name: 'Happy Shophouse',
    location: 'Khu đô thị mới, Quận 2',
    area: 'Quận 2',
    price: '1,100,000,000 VND',
    startingPrice: '1.1 Tỷ VND',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
    description: 'Không gian shophouse thương mại hiện đại và trang bị đầy đủ',
    fullDescription: 'Happy Shophouse là dự án shophouse thương mại hiện đại, nằm tại khu đô thị phát triển mạnh. Tuyệt vời cho kinh doanh và đầu tư.',
    units: '156 units',
    completion: '2024',
    tag: 'Elite Corner Suite',
    completionDate: 'Q2 2024',
    developer: 'HappyHouse DEVELOPMENT',
    address: '456 Đường Tạ Uy Bằng, Quận 2, TP.HCM',
    totalArea: '35,000 m²',
    landArea: '12,000 m²',
    projectType: 'Shophouse thương mại',
    gallery: [
      'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    ],
    amenities: [
      { icon: '🛍️', name: 'Khu thương mại', description: 'Không gian thương mại đa dạng' },
      { icon: '🅿️', name: 'Bãi đỗ xe rộng', description: 'Bãi đỗ xe tương ứng mỗi shophouse' },
      { icon: '🛡️', name: 'An ninh cao', description: 'Hệ thống an ninh tự động' },
      { icon: '💼', name: 'Văn phòng tiện nghi', description: 'Không gian làm việc chuyên nghiệp' },
      { icon: '📶', name: 'Cáp quang tốc độ cao', description: 'Internet tốc độ cao cho kinh doanh' },
      { icon: '🚀', name: 'Hỗ trợ kinh doanh', description: 'Hỗ trợ quản lý kinh doanh chuyên nghiệp' },
    ],
    floorPlans: [
      { name: '1 Shophouse', image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=400&q=80', area: '40-60 m²', price: '1.1 - 1.4 tỷ' },
      { name: '2 Shophouse', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', area: '60-100 m²', price: '1.7 - 2.3 tỷ' },
      { name: 'Corner Plot', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', area: '80-120 m²', price: '2.2 - 3.0 tỷ' },
    ],
    highlights: [
      'Shophouse góc vàng, lưu thông cao',
      'Phù hợp cho retail, F&B, văn phòng',
      'Lợi nhuận quay vòng nhanh',
      'Cộng đồng kinh doanh sôi động',
      'Dễ dàng cho thuê hoặc bán lại',
    ],
    coordinates: { lat: 10.8000, lng: 106.7500 },
  },
  3: {
    id: 3,
    name: 'THÀNH PHÚ HOMES',
    location: 'Khu vực phía tây, Quận 5',
    area: 'Quận 5',
    price: '950,000,000 VND',
    startingPrice: '950 Triệu VND',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    description: 'Nhà phố thương mại tiêu chuẩn với tài chính linh hoạt',
    fullDescription: 'THÀNH PHÚ HOMES là dự án nhà phố phổ biến, giá cả hợp lý, phù hợp cho các gia đình Việt.',
    units: '142 units',
    completion: '2025',
    tag: 'Shophouse',
    completionDate: 'Q3 2025',
    developer: 'THÀNH PHÚ DEVELOPMENT',
    address: '789 Đường Kinh Dương Vương, Quận 5, TP.HCM',
    totalArea: '28,000 m²',
    landArea: '10,000 m²',
    projectType: 'Nhà phố',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    ],
    amenities: [
      { icon: '👨‍👩‍👧‍👦', name: 'Cộng đồng gia đình', description: 'Khu cộng đồng an toàn cho gia đình' },
      { icon: '🎓', name: 'Gần trường học', description: 'Gần các trường cấp 1, 2, 3 uy tín' },
      { icon: '🏥', name: 'Sức khỏe', description: 'Gần bệnh viện và phòng khám chất lượng' },
      { icon: '🛒', name: 'Mua sắm tiện lợi', description: 'Gần siêu thị và các cửa hàng lớn' },
      { icon: '🚌', name: 'Giao thông thuận tiện', description: 'Gần các tuyến xe buýt chính' },
      { icon: '🌳', name: 'Môi trường xanh', description: 'Khu vực yên tĩnh, không khí trong lành' },
    ],
    floorPlans: [
      { name: '2 Phòng ngủ', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', area: '60-80 m²', price: '950M - 1.2 tỷ' },
      { name: '3 Phòng ngủ', image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=400&q=80', area: '80-100 m²', price: '1.2 - 1.5 tỷ' },
      { name: '4 Phòng ngủ', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', area: '100-120 m²', price: '1.5 - 1.8 tỷ' },
    ],
    highlights: [
      'Giá cả cạnh tranh, hợp lý',
      'Tài chính linh hoạt, dễ vay vốn',
      'Phù hợp cho gia đình trẻ',
      'Tiện ích sinh hoạt đầy đủ',
      'Tăng giá bất động sản lâu dài',
    ],
    coordinates: { lat: 10.7500, lng: 106.6500 },
  },
  4: {
    id: 4,
    name: 'LUXURY TOWERS',
    location: 'Quận trung tâm, Quận 3',
    area: 'Quận 3',
    price: '1,550,000,000 VND',
    startingPrice: '1.55 Tỷ VND',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    description: 'Tòa nhà cao cấp với các tiện ích khang hoàng',
    fullDescription: 'LUXURY TOWERS là dự án cao ốc hạng sang, được thiết kế bởi kiến trúc sư nổi tiếng quốc tế.',
    units: '198 units',
    completion: '2026',
    tag: 'Premium Residence',
    completionDate: 'Q1 2026',
    developer: 'LUXURY CORPORATION',
    address: '321 Đường Pasteur, Quận 3, TP.HCM',
    totalArea: '55,000 m²',
    landArea: '18,000 m²',
    projectType: 'Căn hộ hạng sang',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    ],
    amenities: [
      { icon: '🏊', name: 'Bể bơi vô cực', description: 'Bể bơi tầng cao với view toàn thành phố' },
      { icon: '🥘', name: 'Nhà hàng hạng sao', description: 'Nhà hàng hạng 5 sao với đầu bếp nổi tiếng' },
      { icon: '🧖', name: 'Spa & Wellness', description: 'Trung tâm spa và wellness world class' },
      { icon: '🎾', name: 'Sân tennis', description: 'Sân tennis tuyệt đẹp với ánh sáng nhân tạo' },
      { icon: '📚', name: 'Thư viện', description: 'Thư viện hiện đại với sách và tạp chí' },
      { icon: '🚗', name: 'Valet parking', description: 'Dịch vụ valet parking 24/7' },
    ],
    floorPlans: [
      { name: '2 Phòng ngủ', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', area: '95-120 m²', price: '1.8 - 2.2 tỷ' },
      { name: '3 Phòng ngủ', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', area: '140-180 m²', price: '2.8 - 3.5 tỷ' },
      { name: 'Penthouse', image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=400&q=80', area: '200-250 m²', price: '5.0 - 8.0 tỷ' },
    ],
    highlights: [
      'Kiến trúc sư nổi tiếng thế giới',
      'View panorama thành phố tuyệt đẹp',
      'Tiện ích hạng sang đầy đủ',
      'Quản lý quốc tế 5 sao',
      'Đầu tư an toàn, giá bảo toàn',
    ],
    coordinates: { lat: 10.7800, lng: 106.6900 },
  },
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(params.id)
  const project = projectsData[projectId]
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  if (!project) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dự án không tìm thấy</h1>
            <p className="text-gray-600 mb-8">Dự án bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link href="/projects" className="inline-block px-8 py-3 rounded text-white font-semibold" style={{ backgroundColor: '#8B4513' }}>
              Quay về danh sách
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative h-96 lg:h-full rounded-lg overflow-hidden bg-gray-200">
              <img src={project.gallery[selectedImage]} alt="Project" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {project.gallery.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-yellow-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{project.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{project.location}</p>
              <p className="text-gray-700 leading-relaxed text-lg">{project.fullDescription}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">TỔNG DIỆN TÍCH</p>
                  <p className="text-2xl font-bold text-gray-900">{project.totalArea}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">DIỆN TÍCH ĐẤT</p>
                  <p className="text-2xl font-bold text-gray-900">{project.landArea}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">SỐ CĂN</p>
                  <p className="text-2xl font-bold text-gray-900">{project.units}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">HOÀN THÀNH</p>
                  <p className="text-2xl font-bold text-gray-900">{project.completionDate}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 rounded-lg sticky top-20">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 font-semibold">GIÁ KHỞI ĐIỂM</p>
                  <p className="text-3xl font-bold" style={{ color: '#8B4513' }}>{project.startingPrice}</p>
                </div>

                <button
                  onClick={() => setShowBookingForm(!showBookingForm)}
                  className="w-full py-3 rounded text-white font-semibold transition-opacity hover:opacity-90 mb-3"
                  style={{ backgroundColor: '#8B4513' }}
                >
                  ĐẶT LỊCH TOUR
                </button>

                <button className="w-full py-3 rounded text-white font-semibold transition-opacity hover:opacity-90" style={{ backgroundColor: '#C41E3A' }}>
                  TẢI BROCHURE
                </button>

                <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">CHỦNG LOẠI</p>
                    <p className="text-gray-900 font-semibold">{project.projectType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">NHÀ PHÁT TRIỂN</p>
                    <p className="text-gray-900 font-semibold">{project.developer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">ĐỊA CHỈ</p>
                    <p className="text-gray-900 font-semibold text-sm">{project.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">ĐIỂM NỔI BẬT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="text-2xl mt-1" style={{ color: '#D4AF37' }}>★</span>
                <p className="text-gray-700 font-semibold">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">TIỆN ÍCH</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.amenities.map((amenity, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-4xl mb-2">{amenity.icon}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{amenity.name}</h3>
                <p className="text-gray-600 text-sm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floor Plans */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">PHỐI CẢNH & THIẾT KẾ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.floorPlans.map((plan, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-semibold">Diện tích:</span> {plan.area}</p>
                    <p><span className="font-semibold">Giá:</span> {plan.price}</p>
                  </div>
                  <button className="w-full py-2 rounded text-white font-semibold transition-opacity hover:opacity-90 text-sm" style={{ backgroundColor: '#8B4513' }}>
                    CHỌN CẤU HÌNH
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">ĐẶT LỊCH TOUR</h3>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Tên của bạn"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <textarea
                placeholder="Lời nhắn"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowBookingForm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg font-semibold transition-colors hover:bg-gray-50"
              >
                ĐÓNG
              </button>
              <button className="flex-1 py-2 rounded text-white font-semibold transition-opacity hover:opacity-90" style={{ backgroundColor: '#8B4513' }}>
                GỬI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Related Projects */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">DỰ ÁN KHÁC</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(projectsData)
              .filter((p: any) => p.id !== projectId)
              .slice(0, 3)
              .map((p: any) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:underline mb-2">{p.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{p.location}</p>
                  <p className="font-bold" style={{ color: '#8B4513' }}>
                    {p.price}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
