import { Home, Building2, Newspaper, Info, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: '#7B241C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">HappyHouse</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Tìm ngôi nhà của bạn với HappyHouse - nơi ước mơ nhà cửa của bạn trở thành hiện thực.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">Facebook</a>
              <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">Instagram</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li><a href="/" className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors"><Home size={16} /> Trang chủ</a></li>
              <li><a href="/projects" className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors"><Building2 size={16} /> Dự án</a></li>
              <li><a href="/news" className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors"><Newspaper size={16} /> Tin tức</a></li>
              <li><a href="/about" className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors"><Info size={16} /> Giới thiệu</a></li>
              <li><a href="/contact" className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors"><Phone size={16} /> Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Thông tin</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">Hỗ trợ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Liên hệ chúng tôi</h4>
            <p className="flex items-center gap-2 text-white/70 text-sm mb-3">
              <Mail size={16} /> <a href="mailto:contact@happyhouse.vn" className="hover:text-yellow-400 transition-colors">contact@happyhouse.vn</a>
            </p>
            <p className="flex items-center gap-2 text-white/70 text-sm mb-3">
              <Phone size={16} /> <a href="tel:+84123456789" className="hover:text-yellow-400 transition-colors">+84 (123) 456-789</a>
            </p>
            <p className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin size={16} /> Giờ làm việc: T2 - T6, 9AM - 6PM
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">
              © 2024 HappyHouse. Bản quyền được bảo vệ.
            </p>
            <p className="text-white/60 text-sm mt-4 md:mt-0">
              Tìm ngôi nhà của bạn cùng HappyHouse
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
