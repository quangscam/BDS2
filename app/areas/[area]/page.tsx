'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'

const areaData: Record<string, any> = {
  'quan-1': {
    name: 'Quận 1',
    title: 'Dự án bất động sản Quận 1 - Trung tâm thành phố',
    description: 'Khám phá các dự án bất động sản cao cấp tại Quận 1, vị trí vàng trung tâm TP.HCM',
    content: `Quận 1 là quận trung tâm của TP.HCM với giá trị bất động sản cao nhất. Đây là nơi được lựa chọn bởi những nhà đầu tư và cư dân khó tính nhất. Với mật độ tiện ích, giáo dục, y tế đạt chuẩn quốc tế, Quận 1 là lựa chọn hàng đầu cho những người muốn sống ở vị trí vàng của thành phố.`,
    benefits: [
      'Vị trí vàng, trung tâm thành phố',
      'Gần các tòa nhà chọc trời nổi tiếng',
      'Cơ sở hạ tầng giao thông hoàn hảo',
      'Tiện ích cao cấp đầy đủ',
      'Giá trị bất động sản tăng liên tục',
      'Dễ dàng cho thuê với giá cao',
    ],
    projects: [1],
    stats: {
      avgPrice: '1,300,000,000 VND',
      projects: 1,
      units: 180,
    },
  },
  'quan-2': {
    name: 'Quận 2',
    title: 'Dự án bất động sản Quận 2 - Thành phố mới',
    description: 'Dự án tại Quận 2, trung tâm phát triển của khu đô thị mới TP.HCM',
    content: `Quận 2 đang phát triển nhanh chóng với hạ tầng giao thông hiện đại. Đây là lựa chọn tuyệt vời cho những nhà đầu tư tìm kiếm giá trị tăng trưởng cao. Với hàng loạt dự án mới và công nghệ xây dựng tiên tiến, Quận 2 hứa hẹn sẽ là điểm nóng của bất động sản trong những năm tới.`,
    benefits: [
      'Phát triển nhanh với hạ tầng mới',
      'Giá bất động sản còn phát triển',
      'Dự kiến tăng giá nhanh chóng',
      'Tiện ích hiện đại đầy đủ',
      'Môi trường yên tĩnh và xanh',
      'Metro Line 1 sắp hoàn thành',
    ],
    projects: [2],
    stats: {
      avgPrice: '1,100,000,000 VND',
      projects: 1,
      units: 156,
    },
  },
  'quan-3': {
    name: 'Quận 3',
    title: 'Dự án bất động sản Quận 3 - Khu cao ốc hạng sang',
    description: 'Những dự án cao ốc hạng sang tại Quận 3, phù hợp cho khách hàng VIP',
    content: `Quận 3 là nơi được lựa chọn bởi những nhà đầu tư cao cấp và các tập đoàn quốc tế. Với những dự án cao ốc hạng sang và tiện ích world-class, Quận 3 cung cấp những không gian sống và làm việc đẳng cấp nhất.`,
    benefits: [
      'Cao ốc hạng sang với thiết kế tiên tiến',
      'Tiện ích world-class',
      'Quản lý chuyên nghiệp 5 sao',
      'View panorama tuyệt đẹp',
      'An ninh tối cao 24/7',
      'Gần các trung tâm kinh tế',
    ],
    projects: [4],
    stats: {
      avgPrice: '1,550,000,000 VND',
      projects: 1,
      units: 198,
    },
  },
  'quan-5': {
    name: 'Quận 5',
    title: 'Dự án nhà phố Quận 5 - Thích hợp cho gia đình',
    description: 'Nhà phố và căn hộ ở Quận 5, phù hợp cho gia đình trẻ',
    content: `Quận 5 là nơi lý tưởng cho gia đình trẻ muốn có một ngôi nhà của riêng mình. Với các dự án nhà phố phổ biến và giá cả hợp lý, Quận 5 cung cấp cân bằng hoàn hảo giữa tiện lợi và giá trị.`,
    benefits: [
      'Giá cả hợp lý và cạnh tranh',
      'Phù hợp cho gia đình trẻ',
      'Gần trường học uy tín',
      'Tiện ích sinh hoạt đầy đủ',
      'Giao thông thuận tiện',
      'Tăng giá bất động sản lâu dài',
    ],
    projects: [3],
    stats: {
      avgPrice: '950,000,000 VND',
      projects: 1,
      units: 142,
    },
  },
  'quan-7': {
    name: 'Quận 7',
    title: 'Dự án bất động sản Quận 7 - Khu hưởng sông',
    description: 'Những dự án hướng sông tại Quận 7 với view tuyệt đẹp',
    content: `Quận 7 với vị trí tại bờ sông Sài Gòn mang lại những dự án bất động sản sang trọng. Đây là nơi lý tưởng để có một không gian sống với view sông đẹp mắt.`,
    benefits: [
      'View sông tuyệt đẹp',
      'Phong cảnh thiên nhiên xinh đẹp',
      'Quận phát triển với hạ tầng mới',
      'Tiện ích cao cấp',
      'Môi trường trong lành',
      'Giá trị tăng trưởng cao',
    ],
    projects: [5],
    stats: {
      avgPrice: '1,450,000,000 VND',
      projects: 1,
      units: 220,
    },
  },
  'quan-9': {
    name: 'Quận 9',
    title: 'Dự án công nghệ Quận 9 - Khu công nghệ cao',
    description: 'Căn hộ thông minh tại Quận 9, khu công nghệ cao của TP.HCM',
    content: `Quận 9 là khu công nghệ cao của TP.HCM với các dự án hiện đại và tiện ích thông minh. Đây là nơi lý tưởng cho những người muốn sống trong một không gian công nghệ tiên tiến.`,
    benefits: [
      'Công nghệ nhà thông minh',
      'Môi trường phát triển công nghệ',
      'Tiện ích hiện đại đầy đủ',
      'Giao thông kết nối tốt',
      'Môi trường làm việc chất lượng',
      'Giá bất động sản còn tiềm năng',
    ],
    projects: [6],
    stats: {
      avgPrice: '850,000,000 VND',
      projects: 1,
      units: 165,
    },
  },
}

export default function AreaPage({ params }: { params: { area: string } }) {
  const area = areaData[params.area]

  if (!area) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Khu vực không tìm thấy</h1>
            <p className="text-gray-600 mb-8">Khu vực bạn tìm kiếm không tồn tại.</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{area.name}</h1>
          <p className="text-lg text-gray-600">{area.description}</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Giới thiệu {area.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{area.content}</p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Lợi ích của {area.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {area.benefits.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-2xl mt-1" style={{ color: '#D4AF37' }}>
                      ✓
                    </span>
                    <p className="text-gray-700 font-semibold">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-sm sticky top-20">
                <h3 className="text-xl font-bold text-gray-900 mb-6">THỐNG KÊ {area.name.toUpperCase()}</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">GIÁ TRUNG BÌNH</p>
                    <p className="text-2xl font-bold" style={{ color: '#8B4513' }}>
                      {area.stats.avgPrice}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-600 font-semibold mb-2">SỐ DỰ ÁN</p>
                    <p className="text-2xl font-bold text-gray-900">{area.stats.projects}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-600 font-semibold mb-2">TỔNG SỐ CĂN</p>
                    <p className="text-2xl font-bold text-gray-900">{area.stats.units}</p>
                  </div>

                  <button
                    onClick={() => {
                      const url = `/projects?area=${encodeURIComponent(area.name)}`
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

      {/* Featured Projects in this area */}
      {area.projects.length > 0 && (
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">DỰ ÁN NỔI BẬT TẠI {area.name.toUpperCase()}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {area.projects.map((projectId: number) => {
                const projectsMap: Record<number, any> = {
                  1: { name: 'CENTRE POINT', price: '1,300,000,000 VND', units: '180 units' },
                  2: { name: 'CENTRE PLAZA', price: '1,100,000,000 VND', units: '156 units' },
                  3: { name: 'THÀNH PHÚ HOMES', price: '950,000,000 VND', units: '142 units' },
                  4: { name: 'LUXURY TOWERS', price: '1,550,000,000 VND', units: '198 units' },
                  5: { name: 'RIVERSIDE ELITE', price: '1,450,000,000 VND', units: '220 units' },
                  6: { name: 'TECH PARK RESIDENCES', price: '850,000,000 VND', units: '165 units' },
                }
                const project = projectsMap[projectId]

                return (
                  <Link
                    key={projectId}
                    href={`/projects/${projectId}`}
                    className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-4xl">🏗️</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:underline mb-2">{project.name}</h3>
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

      {/* CTA Section */}
      <div className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">QUAN TÂM ĐẾN DỰ ÁN TẠI {area.name.toUpperCase()}?</h2>
          <p className="text-lg text-gray-600 mb-10">
            Liên hệ với chúng tôi ngay để nhận thêm thông tin chi tiết và đặt lịch tour.
          </p>
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
