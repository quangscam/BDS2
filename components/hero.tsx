'use client'

import { Building2, Calendar } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80" 
          alt="HappyHouse Hero" 
          className="w-full h-full object-cover"
        />
        {/* Red overlay 20% opacity */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(176, 58, 46, 0.2)' }} />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Nơi gia đình bạn thuộc về
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 text-pretty">
            Từ căn hộ hiện đại đến nhà phố âm hưởng — HappyHouse có tất cả
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/projects" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-semibold text-lg transition-all duration-200 text-white hover:opacity-90"
              style={{ backgroundColor: '#B03A2E' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7B241C'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B03A2E'
              }}
            >
              <Building2 size={20} />
              Khám phá dự án
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-semibold text-lg transition-all duration-200"
              style={{ backgroundColor: '#C9A84C', color: '#5D4E4E' }}
            >
              <Calendar size={20} />
              Đặt lịch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
