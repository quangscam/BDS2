'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'

const propertyTypeData: Record<string, any> = {
  'can-ho': {
    name: 'Căn hộ',
    title: 'Căn hộ cao cấp - Giải pháp sống hiện đại',
    description: 'Khám phá các căn hộ cao cấp với thiết kế hiện đại và tiện ích đầy đủ',
    content: `Căn hộ cao cấp là lựa chọn phổ biến của các chuyên gia trẻ và gia đình hiện đại. Với thiết kế đa dạng từ 1-3+ phòng ngủ, các căn hộ mang đến không gian sống tối ưu hóa. Tiện ích như bể bơi, gym, công viên, và an ninh 24/7 được cung cấp đầy đủ để tạo một cộng đồng sống lành mạnh.`,
    benefits: [
      'Thiết kế hiện đại và linh hoạt',
      'Tiện ích đầy đủ trong tòa nhà',
      'An ninh cao 24/7',
      'Dễ dàng bảo trì và quản lý',
      'Lựa chọn phù hợp cho thuê kiếm lợi nhuận',
      'Cộng đồng cư dân chất lượng cao',
    ],
    features: [
      'Diện tích từ 55-250 m²',
      'Từ 1-4 phòng ngủ',
      'Có ban công/sân vườn',
      'Hệ thống điều hòa riêng',
      'Hầm để xe',
      'Phòng bếp hiện đại',
    ],
    projects: [1, 4],
    stats: {
      avgPrice: '1,400,000,000 VND',
      projects: 2,
      units: 378,
    },
  },
  'shophouse': {
    name: 'Shophouse',
    title: 'Shophouse thương mại - Cơ hội đầu tư sinh lợi cao',
    description: 'Shophouse kết hợp kinh doanh và ở được với tiềm năng lợi nhuận cao',
    content: `Shophouse là dạng bất động sản kết hợp giữa không gian kinh doanh ở tầng dưới và nhà ở tầng trên. Đây là lựa chroscope cơ hội đầu tư cao với khả năng sinh lợi từ cho thuê và kinh doanh. Với vị trí thương mại chiến lược, shophouse mang lại lợi suất cao nhất trong các loại bất động sản.`,
    benefits: [
      'Cơ hội kinh doanh đa dạng',
      'Lợi suất cao từ cho thuê',
      'Vị trí thương mại chiến lược',
      'Sở hữu lâu dài tăng giá',
      'Dễ tìm khách cho thuê',
      'Phù hợp cho các chủ shop nhỏ',
    ],
    features: [
      'Mặt tiền rộng',
      'Tầng dưới: kinh doanh',
      'Tầng trên: nhà ở',
      'Hầm để xe riêng',
      'Diện tích từ 40-120 m²',
      'Nối kề các tuyến đường chính',
    ],
    projects: [2, 3],
    stats: {
      avgPrice: '1,050,000,000 VND',
      projects: 2,
      units: 298,
    },
  },
  'nha-pho': {
    name: 'Nhà phố',
    title: 'Nhà phố liền kề - Nơi ở lý tưởng cho gia đình',
    description: 'Nhà phố hiện đại với giá cả hợp lý, phù hợp cho gia đình trẻ',
    content: `Nhà phố liền kề là lựa chọn tuyệt vời cho gia đình muốn có không gian sống riêng biệt nhưng vẫn thuận tiện. Với thiết kế 2-4 phòng ngủ, nhà phối mang đến sự thoải mái gia đình. Giá cả hợp lý và tài chính linh hoạt làm cho nhà phố trở thành lựa chọn phổ biến của các gia đình Việt.`,
    benefits: [
      'Có không gian sân vườn riêng',
      'Giá cả hợp lý và cạnh tranh',
      'Tài chính linh hoạt, dễ vay vốn',
      'Thích hợp cho gia đình trẻ',
      'Tăng giá theo thời gian',
      'Dễ sửa chữa và cải tạo',
    ],
    features: [
      'Diện tích từ 60-150 m²',
      'Từ 2-4 phòng ngủ',
      'Có sân vườn riêng',
      'Gara để xe',
      'Hệ thống an ninh khóa cổng',
      'Cây xanh và khoảng trống mở',
    ],
    projects: [3],
    stats: {
      avgPrice: '950,000,000 VND',
      projects: 1,
      units: 142,
    },
  },
}

export default function PropertyTypePage({ params }: { params: { type: string } }) {
  const propertyType = propertyTypeData[params.type]

  if (!propertyType) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loại bất động sản không tìm thấy</h1>
            <p className="text-gray-600 mb-8">Loại bất động sản bạn tìm kiếm không tồn tại.</p>
            <Link href="/projects" className="inline-block px-8 py-3 rounded text-white font-semibold" style={{ backgroundColor: '#8B4513' }}>
              Quay về danh sách dự án
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

      {/* Page Header */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{propertyType.name}</h1>
          <p className="text-lg text-gray-600">{propertyType.description}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Giới thiệu {propertyType.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{propertyType.content}</p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Lợi ích của {propertyType.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {propertyType.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-2xl mt-1" style={{ color: '#D4AF37' }}>
                      ✓
                    </span>
                    <p className="text-gray-700 font-semibold">{benefit}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Đặc điểm chính</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {propertyType.features.map((feature: string, idx: number) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 font-semibold">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-sm sticky top-20">
                <h3 className="text-xl font-bold text-gray-900 mb-6">THỐNG KÊ {propertyType.name.toUpperCase()}</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">GIÁ TRUNG BÌNH</p>
                    <p className="text-2xl font-bold" style={{ color: '#8B4513' }}>
                      {propertyType.stats.avgPrice}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-600 font-semibold mb-2">SỐ DỰ ÁN</p>
                    <p className="text-2xl font-bold text-gray-900">{propertyType.stats.projects}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-600 font-semibold mb-2">TỔNG SỐ CĂN</p>
                    <p className="text-2xl font-bold text-gray-900">{propertyType.stats.units}</p>
                  </div>

                  <button
                    onClick={() => {
                      const typeMap: Record<string, string> = {
                        'can-ho': 'Căn hộ',
                        'shophouse': 'Shophouse',
                        'nha-pho': 'Nhà phố',
                      }
                      const url = `/projects?type=${encodeURIComponent(typeMap[params.type])}`
                      window.location.href = url
                    }}
                    className="w-full py-3 rounded text-white font-semibold transition-opacity hover:opacity-90 mt-6"
                    style={{ backgroundColor: '#8B4513' }}
                  >
                    XEM DỰ ÁN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">NƯỚC NÀO CHO BẠN?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900">Tiêu chí</th>
                  <th className="px-4 py-4 font-semibold text-gray-900">Căn hộ</th>
                  <th className="px-4 py-4 font-semibold text-gray-900">Shophouse</th>
                  <th className="px-4 py-4 font-semibold text-gray-900">Nhà phố</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-4 text-left font-semibold text-gray-900">Giá trung bình</td>
                  <td className="px-4 py-4">1.4 tỷ</td>
                  <td className="px-4 py-4">1.05 tỷ</td>
                  <td className="px-4 py-4">950 triệu</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-4 text-left font-semibold text-gray-900">Lợi suất cho thuê</td>
                  <td className="px-4 py-4">5-7%</td>
                  <td className="px-4 py-4">8-12%</td>
                  <td className="px-4 py-4">4-6%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-4 text-left font-semibold text-gray-900">Phù hợp cho</td>
                  <td className="px-4 py-4">Chuyên gia trẻ</td>
                  <td className="px-4 py-4">Nhà đầu tư</td>
                  <td className="px-4 py-4">Gia đình</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-4 text-left font-semibold text-gray-900">Không gian</td>
                  <td className="px-4 py-4">Nhỏ gọn</td>
                  <td className="px-4 py-4">Rộng</td>
                  <td className="px-4 py-4">Rất rộng</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-4 text-left font-semibold text-gray-900">Bảo trì</td>
                  <td className="px-4 py-4">Dễ</td>
                  <td className="px-4 py-4">Khó hơn</td>
                  <td className="px-4 py-4">Khó nhất</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-left font-semibold text-gray-900">Tăng giá</td>
                  <td className="px-4 py-4">Nhanh</td>
                  <td className="px-4 py-4">Rất nhanh</td>
                  <td className="px-4 py-4">Khá nhanh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      {propertyType.projects.length > 0 && (
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">DỰ ÁN {propertyType.name.toUpperCase()} NỔI BẬT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {propertyType.projects.map((projectId: number) => {
                const projectsMap: Record<number, any> = {
                  1: { name: 'CENTRE POINT', price: '1,300,000,000 VND', location: 'Quận 1', units: '180 units' },
                  2: { name: 'CENTRE PLAZA', price: '1,100,000,000 VND', location: 'Quận 2', units: '156 units' },
                  3: { name: 'THÀNH PHÚ HOMES', price: '950,000,000 VND', location: 'Quận 5', units: '142 units' },
                  4: { name: 'LUXURY TOWERS', price: '1,550,000,000 VND', location: 'Quận 3', units: '198 units' },
                }
                const project = projectsMap[projectId]

                return (
                  <Link
                    key={projectId}
                    href={`/projects/${projectId}`}
                    className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-300 flex items-center justify-center text-4xl">🏗️</div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:underline mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{project.location}</p>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p><span className="font-semibold">Giá:</span> {project.price}</p>
                        <p><span className="font-semibold">Căn:</span> {project.units}</p>
                      </div>
                      <button className="w-full py-2 rounded text-white font-semibold transition-opacity hover:opacity-90 text-sm" style={{ backgroundColor: '#8B4513' }}>
                        CHI TIẾT DỰ ÁN
                      </button>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">QUAN TÂM ĐẾN {propertyType.name.toUpperCase()}?</h2>
          <p className="text-lg text-gray-600 mb-10">Liên hệ với chúng tôi để khám phá cơ hội đầu tư tuyệt vời.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-block px-10 py-4 rounded text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#8B4513' }}
            >
              KHÁM PHÁ DỰ ÁN
            </Link>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 rounded text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#C41E3A' }}
            >
              LIÊN HỆ NGAY
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
