export function Hero() {
  return (
    <section className="min-h-[600px] flex items-center justify-center bg-white py-12 md:py-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden rounded-lg h-[400px] lg:h-[500px] bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" 
              alt="CENTRE POINT" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">ĐẲNG CẤP</h2>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">THƯƠNG GIA</h2>
              <p className="text-2xl" style={{ color: '#D4AF37' }}>VỊ TRÍ VÀNG</p>
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              CENTRE POINT
            </h1>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Khám phá không gian sống đẳng cấp tại vị trí vàng của thành phố. Các căn hộ và shophouse thương mại được thiết kế hiện đại với tiện ích đầy đủ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/projects" className="text-white px-8 py-3 rounded font-semibold transition-opacity hover:opacity-90 inline-block text-center" style={{ backgroundColor: '#8B4513' }}>
                KHÁM PHÁ DỰ ÁN
              </a>
              <a href="/contact" className="text-white px-8 py-3 rounded font-semibold transition-opacity hover:opacity-90 inline-block text-center" style={{ backgroundColor: '#C41E3A' }}>
                ĐẶT LỊCH TOUR
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
