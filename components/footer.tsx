'use client'

import { Home, Building2, Newspaper, Info, Phone, Mail, MapPin, Briefcase, Hash } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-20 bg-[#7B241C] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="lg:pr-6">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight drop-shadow-sm">
              HappyHouse
            </h3>
            <p className="text-sm leading-relaxed mb-6 text-[#FDFAF6]/80 text-pretty">
              Tìm ngôi nhà của bạn với HappyHouse – nơi ước mơ an cư và đầu tư sinh lời của bạn trở thành hiện thực.
            </p>
            {/* Thông tin pháp lý */}
            <div className="mb-6 space-y-2 border-l-2 border-[#C9A84C]/50 pl-3">
              <p className="text-xs text-[#FDFAF6]/60 leading-relaxed">
                <span className="text-[#FDFAF6]/40 uppercase tracking-wider text-[10px]">Đơn vị vận hành</span><br/>
                Công ty TNHH Pavilion Housing
              </p>
              <p className="text-xs text-[#FDFAF6]/60">
                <span className="text-[#FDFAF6]/40 uppercase tracking-wider text-[10px]">MST</span>{' '}
                0319139165
              </p>
            </div>
            <div className="flex gap-6">
              <a 
                href="https://www.facebook.com/vu.ngoc.5099" 
                className="text-xs font-bold tracking-[0.15em] uppercase text-[#FDFAF6]/70 hover:text-[#C9A84C] hover:-translate-y-0.5 transition-all duration-300" 
              >
                Facebook
              </a>
              <a 
                href="https://zalo.me/0986514242" 
                className="text-xs font-bold tracking-[0.15em] uppercase text-[#FDFAF6]/70 hover:text-[#C9A84C] hover:-translate-y-0.5 transition-all duration-300" 
              >
                Zalo
              </a>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.15em] border-b border-white/20 pb-3 inline-block">
              Liên kết nhanh
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Trang chủ', icon: Home, href: '/' },
                { name: 'Danh sách Dự án', icon: Building2, href: '/projects' },
                { name: 'Tin tức & Sự kiện', icon: Newspaper, href: '/news' },
                { name: 'Giới thiệu', icon: Info, href: '/about' },
                { name: 'Liên hệ Tư vấn', icon: Phone, href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="group flex items-center gap-3 text-sm text-[#FDFAF6]/80 hover:text-[#C9A84C] transition-all duration-300 hover:translate-x-1.5" 
                  >
                    <item.icon size={16} className="text-[#FDFAF6]/60 group-hover:text-[#C9A84C] transition-colors" /> 
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.15em] border-b border-white/20 pb-3 inline-block">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Chính sách bảo mật', href: '/privacy-policy' },
                { name: 'Điều khoản dịch vụ', href: '/terms' },
                { name: 'Câu hỏi thường gặp (FAQ)', href: '/faq' },
                { name: 'Hướng dẫn thủ tục vay vốn', href: '/loan-guide' },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="inline-block text-sm text-[#FDFAF6]/80 hover:text-[#C9A84C] transition-all duration-300 hover:translate-x-1.5" 
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.15em] border-b border-white/20 pb-3 inline-block">
              Trụ sở chính
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3 text-sm text-[#FDFAF6]/80 leading-relaxed">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#C9A84C]" /> 
                <p>Số C26 Đường D08, KDC Caric,<br/>P. An Khánh, TP. HCM</p>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-[#FDFAF6]/80">
                <Phone size={18} className="shrink-0 text-[#C9A84C]" /> 
                <a 
                  href="tel:+84986514242" 
                  className="hover:text-[#C9A84C] transition-colors duration-300 font-medium tracking-wide" 
                >
                  +84 0986 51 4242
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-[#FDFAF6]/80">
                <Mail size={18} className="shrink-0 text-[#C9A84C]" /> 
                <a 
                  href="mailto:ngocdiachinh34@gmail.com" 
                  className="hover:text-[#C9A84C] transition-colors duration-300 tracking-wide" 
                >
                  ngocdiachinh34@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#FDFAF6]/80">
                <Briefcase size={18} className="shrink-0 text-[#C9A84C]" />
                <span>Công ty TNHH Pavilion Housing</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#FDFAF6]/80">
                <Hash size={18} className="shrink-0 text-[#C9A84C]" />
                <span>MST: 0319139165</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Dòng Copyright */}
        <div className="border-t border-[#FDFAF6]/15 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-medium tracking-wider uppercase text-[#FDFAF6]/50 text-center md:text-left">
              © {new Date().getFullYear()} HappyHouse Vietnam — Vận hành bởi Công ty TNHH Pavilion Housing (MST: 0319139165). Bản quyền đã được bảo hộ.
            </p>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9A84C]/80 text-center md:text-right whitespace-nowrap">
              Kiến tạo không gian • Nâng tầm giá trị
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}