import { Home, Building2, Newspaper, Info, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: '#7B241C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">HappyHouse</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#FDFAF6', opacity: 0.8 }}>
              Tim ngoi nha cua ban voi HappyHouse - noi uoc mo nha cua cua ban tro thanh hien thuc.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="transition-colors" style={{ color: 'rgba(253, 250, 246, 0.6)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.6)'}>Facebook</a>
              <a href="#" className="transition-colors" style={{ color: 'rgba(253, 250, 246, 0.6)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.6)'}>Instagram</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Lien ket nhanh</h4>
            <ul className="space-y-2">
              <li><a href="/" className="flex items-center gap-2 transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}><Home size={16} /> Trang chu</a></li>
              <li><a href="/projects" className="flex items-center gap-2 transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}><Building2 size={16} /> Du an</a></li>
              <li><a href="/news" className="flex items-center gap-2 transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}><Newspaper size={16} /> Tin tuc</a></li>
              <li><a href="/about" className="flex items-center gap-2 transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}><Info size={16} /> Gioi thieu</a></li>
              <li><a href="/contact" className="flex items-center gap-2 transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}><Phone size={16} /> Lien he</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Thong tin</h4>
            <ul className="space-y-2">
              <li><a href="#" className="transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}>Chinh sach bao mat</a></li>
              <li><a href="#" className="transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}>Dieu khoan dich vu</a></li>
              <li><a href="#" className="transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}>Cau hoi thuong gap</a></li>
              <li><a href="#" className="transition-colors" style={{ color: 'rgba(253, 250, 246, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}>Ho tro</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Lien he chung toi</h4>
            <p className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(253, 250, 246, 0.7)' }}>
              <Mail size={16} /> <a href="mailto:contact@happyhouse.vn" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}>contact@happyhouse.vn</a>
            </p>
            <p className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(253, 250, 246, 0.7)' }}>
              <Phone size={16} /> <a href="tel:+84123456789" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#C9A84C'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(253, 250, 246, 0.7)'}>+84 (123) 456-789</a>
            </p>
            <p className="flex items-center gap-2 text-sm" style={{ color: 'rgba(253, 250, 246, 0.7)' }}>
              <MapPin size={16} /> Gio lam viec: T2 - T6, 9AM - 6PM
            </p>
          </div>
        </div>

        <div className="border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm" style={{ color: 'rgba(253, 250, 246, 0.6)' }}>
              © 2025 HappyHouse. Ban quyen duoc bao ve.
            </p>
            <p className="text-sm mt-4 md:mt-0" style={{ color: 'rgba(253, 250, 246, 0.6)' }}>
              Tim ngoi nha cua ban cung HappyHouse
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
