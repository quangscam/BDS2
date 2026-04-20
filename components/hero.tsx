import { Building2, Calendar } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-[600px] flex items-center justify-center bg-white py-12 md:py-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden rounded-lg h-[400px] lg:h-[500px] bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" 
              alt="HappyHouse" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">Tìm Ngôi Nhà</h2>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Của Bạn</h2>
              <p className="text-2xl" style={{ color: '#C9A84C' }}>Cùng HappyHouse</p>
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#5D4E4E' }}>
              HappyHouse
            </h1>
            <p className="text-lg mb-4 leading-relaxed" style={{ color: '#5D4E4E' }}>
              Tìm ngôi nhà của bạn cùng HappyHouse. Từ căn hộ hiện đại đến nhà phố ấm cúng, chúng tôi có tất cả những gì bạn cần để tìm thấy không gian sống hoàn hảo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/projects" className="flex items-center justify-center gap-2 text-white px-8 py-3 rounded font-semibold transition-all hover:opacity-90" style={{ backgroundColor: '#B03A2E' }}>
                <Building2 size={20} />
                Khám phá dự án
              </a>
              <a href="/contact" className="flex items-center justify-center gap-2 text-white px-8 py-3 rounded font-semibold transition-all hover:opacity-90" style={{ backgroundColor: '#C9A84C', color: '#5D4E4E' }}>
                <Calendar size={20} />
                Đặt lịch tour
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
