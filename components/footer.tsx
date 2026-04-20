'use client'

import { Home, Building2, Newspaper, Info, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-20" style={{ backgroundColor: '#7B241C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div>
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight">HappyHouse</h3>
            <p className="text-sm leading-loose mb-8" style={{ color: '#FDFAF6', opacity: 0.85 }}>
              Tìm ngôi nhà của bạn với HappyHouse – nơi ước mơ an cư và đầu tư sinh lời của bạn trở thành hiện thực.
            </p>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-sm font-bold tracking-wider uppercase transition-colors duration-300" 
                style={{ color: 'rgba(253, 250, 246, 0.7)' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} 
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}
              >
                Facebook
              </a>
              <a 
                href="#" 
                className="text-sm font-bold tracking-wider uppercase transition-colors duration-300" 
                style={{ color: 'rgba(253, 250, 246, 0.7)' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} 
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h4 className="text-xs font-bold text-white mb-6 uppercase tracking-widest">Liên kết nhanh</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="/" 
                  className="flex items-center gap-3 text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <Home size={16} /> Trang chủ
                </a>
              </li>
              <li>
                <a 
                  href="/projects" 
                  className="flex items-center gap-3 text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <Building2 size={16} /> Danh sách Dự án
                </a>
              </li>
              <li>
                <a 
                  href="/news" 
                  className="flex items-center gap-3 text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <Newspaper size={16} /> Tin tức & Sự kiện
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="flex items-center gap-3 text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <Info size={16} /> Giới thiệu
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="flex items-center gap-3 text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <Phone size={16} /> Liên hệ Tư vấn
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ pháp lý */}
          <div>
            <h4 className="text-xs font-bold text-white mb-6 uppercase tracking-widest">Hỗ trợ khách hàng</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="block text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="block text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="block text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  Câu hỏi thường gặp (FAQ)
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="block text-sm transition-colors duration-300" 
                  style={{ color: 'rgba(253, 250, 246, 0.75)' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateX(4px)' }} 
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  Hướng dẫn thủ tục vay vốn
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h4 className="text-xs font-bold text-white mb-6 uppercase tracking-widest">Trụ sở chính</h4>
            <div className="space-y-4">
              <p className="flex items-start gap-3 text-sm" style={{ color: 'rgba(253, 250, 246, 0.75)' }}>
                <MapPin size={16} className="mt-1 flex-shrink-0" /> 
                <span>123 Đường Nguyễn Huệ, Quận 1<br/>TP. Hồ Chí Minh, Việt Nam</span>
              </p>
              <p className="flex items-center gap-3 text-sm" style={{ color: 'rgba(253, 250, 246, 0.75)' }}>
                <Phone size={16} /> 
                <a 
                  href="tel:+842838215555" 
                  className="transition-colors duration-300" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'}
                >
                  +84 (28) 3821-5555
                </a>
              </p>
              <p className="flex items-center gap-3 text-sm" style={{ color: 'rgba(253, 250, 246, 0.75)' }}>
                <Mail size={16} /> 
                <a 
                  href="mailto:contact@happyhouse.vn" 
                  className="transition-colors duration-300" 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.75)'}
                >
                  contact@happyhouse.vn
                </a>
              </p>
            </div>
          </div>
          
        </div>

        {/* Dòng Copyright */}
        <div className="border-t pt-8" style={{ borderColor: 'rgba(253, 250, 246, 0.15)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(253, 250, 246, 0.5)' }}>
              © {new Date().getFullYear()} HappyHouse Vietnam. Bản quyền đã được bảo hộ.
            </p>
            <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'rgba(253, 250, 246, 0.5)' }}>
              Kiến tạo không gian • Nâng tầm giá trị
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}