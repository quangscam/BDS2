'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export default function AboutPage() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal()
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal()
  const { ref: teamRef, isVisible: teamVisible } = useScrollReveal()

  const stats = [
    { number: '5000+', label: 'Khách hàng hài lòng', icon: '👥' },
    { number: '50+', label: 'Dự án thành công', icon: '🏗️' },
    { number: '15', label: 'Năm kinh nghiệm', icon: '⭐' },
    { number: '1000+', label: 'Cơ hội đầu tư', icon: '💰' },
  ]

  const teamMembers = [
    {
      name: 'Nguyễn Văn A',
      role: 'Giám đốc Điều hành',
      bio: 'Hơn 20 năm kinh nghiệm trong lĩnh vực bất động sản',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Trần Thị B',
      role: 'Phó Giám đốc Marketing',
      bio: 'Chuyên gia tiếp thị bất động sản hàng đầu tại Việt Nam',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Lê Văn C',
      role: 'Trưởng phòng Bán hàng',
      bio: 'Chuyên gia bán hàng với tỷ lệ chuyển đổi cao nhất',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Phạm Thị D',
      role: 'Quản lý Dự án',
      bio: 'Quản lý dự án hạng sang với bề dày kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
  ]

  const values = [
    {
      title: 'Tính Trung Thực',
      description: 'Chúng tôi cam kết thực hiện đúng lời hứa và minh bạch trong mọi giao dịch.',
      icon: '✓',
    },
    {
      title: 'Chất Lượng Hàng Đầu',
      description: 'Mỗi dự án được xây dựng với tiêu chuẩn quốc tế cao nhất.',
      icon: '★',
    },
    {
      title: 'Khách Hàng Trên Hết',
      description: 'Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.',
      icon: '❤',
    },
    {
      title: 'Đổi Mới Liên Tục',
      description: 'Chúng tôi luôn tìm kiếm những cách tiếp cận mới và tốt hơn.',
      icon: '🚀',
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">VỀ CENTRE GROUP</h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                CENTRE GROUP là một nhà phát triển bất động sản hàng đầu tại Việt Nam với hơn 15 năm kinh nghiệm trong ngành. Chúng tôi cam kết mang đến những dự án chất lượng cao, thiết kế độc đáo và tạo giá trị bền vững cho cộng đồng.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Với đội ngũ chuyên gia giàu kinh nghiệm và tầm nhìn dài hạn, chúng tôi luôn đặt khách hàng lên hàng đầu trong mỗi quyết định kinh doanh.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                alt="CENTRE GROUP"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">SỨ MỆNH</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Sứ mệnh của chúng tôi là phát triển những dự án bất động sản chất lượng cao, tạo ra những không gian sống và làm việc tuyệt vời cho mọi người. Chúng tôi tin rằng mỗi dự án là một cơ hội để cải thiện chất lượng cuộc sống của cộng đồng.
              </p>
            </div>
            <div className="bg-white p-12 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">TẦM NHÌN</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Tầm nhìn của chúng tôi là trở thành nhà phát triển bất động sản được tin tưởng nhất tại Việt Nam, được công nhận vì cam kết với chất lượng, đổi mới và khách hàng. Chúng tôi hướng tới sự bền vững và tác động xã hội tích cực.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-20" ref={statsRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative mb-16 transition-all duration-500 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute left-0 top-0 w-1 h-16 rounded" style={{ backgroundColor: '#B03A2E' }}></div>
            <div className="pl-6">
              <h2 className="text-4xl font-bold text-gray-900">CON SỐ CỐT LÕI</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`text-center transition-all duration-500 ${
                  statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: statsVisible ? `${(idx + 1) * 75}ms` : '0ms',
                }}
              >
                <p className="text-5xl mb-4">{stat.icon}</p>
                <p className="text-4xl font-bold" style={{ color: '#8B4513' }}>
                  {stat.number}
                </p>
                <p className="text-gray-600 font-semibold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50 py-20" ref={valuesRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative mb-16 transition-all duration-500 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute left-0 top-0 w-1 h-16 rounded" style={{ backgroundColor: '#B03A2E' }}></div>
            <div className="pl-6">
              <h2 className="text-4xl font-bold text-gray-900">GIÁ TRỊ CỐT LÕI</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                className={`bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 card-hover ${
                  valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: valuesVisible ? `${(idx + 1) * 75}ms` : '0ms',
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl mt-1" style={{ color: '#D4AF37' }}>
                    {value.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white py-20" ref={teamRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative mb-16 transition-all duration-500 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute left-0 top-0 w-1 h-16 rounded" style={{ backgroundColor: '#B03A2E' }}></div>
            <div className="pl-6">
              <h2 className="text-4xl font-bold text-gray-900">ĐỘI NGŨ CỦA CHÚNG TÔI</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx} 
                className={`bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 card-hover ${
                  teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: teamVisible ? `${(idx + 1) * 75}ms` : '0ms',
                }}
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: '#C41E3A' }}>
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">HÀNH TRÌNH CỦA CHÚNG TÔI</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>
            <div className="space-y-12">
              {[
                { year: '2009', title: 'Thành lập CENTRE GROUP', desc: 'Bắt đầu hành trình với dự án nhỏ đầu tiên' },
                { year: '2012', title: 'Mở rộng thị trường', desc: 'Phát triển sang nhiều quận huyện' },
                { year: '2016', title: 'Dự án hạng sang', desc: 'Khởi động dự án cao ốc hạng sang đầu tiên' },
                { year: '2020', title: 'Doanh thu 1 triệu tỷ', desc: 'Đạt mốc doanh thu khổng lồ' },
                { year: '2024', title: 'Tầm nhìn toàn cầu', desc: 'Lên kế hoạch mở rộng quốc tế' },
              ].map((milestone, idx) => (
                <div key={idx} className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <p className="text-sm font-bold" style={{ color: '#8B4513' }}>
                        {milestone.year}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mt-2">{milestone.title}</h3>
                      <p className="text-gray-600 mt-2">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="w-0 flex justify-center">
                    <div
                      className="w-6 h-6 rounded-full border-4 border-white"
                      style={{ backgroundColor: '#8B4513' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">MUỐN TìM HIỂU THÊM?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Liên hệ với chúng tôi để khám phá những dự án tuyệt vời và cơ hội đầu tư hấp dẫn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="inline-block px-10 py-4 rounded text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#8B4513' }}
            >
              KHÁM PHÁ DỰ ÁN
            </a>
            <a
              href="/contact"
              className="inline-block px-10 py-4 rounded text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#C41E3A' }}
            >
              LIÊN HỆ NGAY
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
