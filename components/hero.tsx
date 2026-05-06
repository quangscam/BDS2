'use client'

import { 
  Building2, PlayCircle, Star, MapPin, 
  DollarSign, Search, Shield, Home, Heart, Headset, ChevronDown 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function Hero() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // State quản lý thanh tìm kiếm
  const [type, setType] = useState('Tất cả loại')
  const [area, setArea] = useState('Tất cả khu vực')
  const [price, setPrice] = useState('Tất cả mức giá')
  const [keyword, setKeyword] = useState('')

  // Kích hoạt animation sau khi component mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (type !== 'Tất cả loại') params.set('type', type)
    if (area !== 'Tất cả khu vực') params.set('area', area)
    if (price !== 'Tất cả mức giá') params.set('price', price)
    if (keyword.trim()) params.set('q', keyword.trim())

    router.push(`/projects?${params.toString()}`)
  }

  // Tách từ cho tiêu đề H1 để tạo hiệu ứng staggered
  const titleLine1 = ["Nơi", "gia", "đình", "bạn"]
  const titleLine2 = ["thuộc", "về"]

  return (
    <div className="relative flex flex-col font-sans bg-[#F9F9F9]">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80" 
            alt="HappyHouse Background" 
            className={`w-full h-full object-cover transition-transform duration-[2500ms] ease-out ${
              isMounted ? 'scale-100' : 'scale-105'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#110D0C]/90 via-[#110D0C]/70 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Nội dung Hero */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="max-w-[600px]">
            
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#352A28]/60 border border-white/5 backdrop-blur-sm text-[#F0A9A3] text-xs font-semibold mb-8 transition-all duration-700 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Star size={14} className="fill-current text-[#F0A9A3]" />
              Tìm nhà. An tâm sống. Hạnh phúc trọn vẹn.
            </div>

            {/* Tiêu đề chính (H1) - Hiệu ứng bật lên từng từ */}
            <h1 className="text-5xl md:text-[5rem] font-bold text-white leading-[1.1] mb-6 tracking-tight flex flex-wrap gap-x-3 gap-y-2">
              {/* Dòng 1 */}
              <div className="flex flex-wrap gap-x-3">
                {titleLine1.map((word, index) => (
                  <span
                    key={`l1-${index}`}
                    className={`inline-block transition-all duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                      isMounted 
                        ? 'opacity-100 translate-y-0 scale-100 blur-0' 
                        : 'opacity-0 translate-y-10 scale-90 blur-sm'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 100}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </div>
              {/* Dòng 2 */}
              <div className="flex flex-wrap gap-x-3 w-full">
                {titleLine2.map((word, index) => (
                  <span
                    key={`l2-${index}`}
                    className={`inline-block text-[#CF4538] transition-all duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                      isMounted 
                        ? 'opacity-100 translate-y-0 scale-100 blur-0' 
                        : 'opacity-0 translate-y-10 scale-90 blur-sm'
                    }`}
                    style={{ transitionDelay: `${(titleLine1.length + index) * 100 + 100}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </h1>

            {/* Subtitle */}
            <p 
              className={`text-base md:text-lg text-gray-300 mb-10 max-w-[500px] leading-relaxed transition-all duration-700 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              Từ căn hộ hiện đại đến nhà phố ấm cúng — HappyHouse đồng hành cùng bạn tìm tổ ấm lý tưởng.
            </p>

            {/* Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '850ms' }}
            >
              <button 
                onClick={() => router.push('/projects')}
                className="flex items-center justify-center gap-2 bg-[#CF4538] hover:bg-[#A8352A] text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#CF4538]/20 group"
              >
                <Building2 size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Khám phá dự án
              </button>

              <button className="flex items-center justify-center gap-2 border border-white/20 bg-transparent hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all hover:-translate-y-0.5 group">
                <PlayCircle size={18} className="transition-transform duration-300 group-hover:scale-110" />
                Xem dự án nổi bật
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SEARCH BAR ================= */}
      <div 
        className={`w-full max-w-[1100px] mx-auto px-4 sm:px-6 relative z-20 -mt-28 transition-all duration-1000 ease-out ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="bg-[#231F1E] rounded-[24px] p-6 shadow-2xl border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* Input 1: Loại Bất Động Sản */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-[#A19D9C] text-xs font-semibold pl-1">Loại bất động sản</label>
              <div className="relative flex justify-between items-center h-[50px] bg-transparent border border-white/10 rounded-xl px-4 text-white focus-within:border-white/30 hover:border-white/30 transition-colors">
                <select 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Tất cả loại" className="text-black">Tất cả</option>
                  <option value="Căn hộ chung cư" className="text-black">Căn hộ chung cư</option>
                  <option value="Shophouse" className="text-black">Shophouse</option>
                  <option value="Nhà phố" className="text-black">Nhà phố</option>
                </select>
                <span className="text-sm font-medium pointer-events-none truncate mr-2">{type}</span>
                <ChevronDown size={16} className="text-gray-400 pointer-events-none shrink-0" />
              </div>
            </div>

            {/* Input 2: Khu Vực */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-[#A19D9C] text-xs font-semibold pl-1">Khu vực</label>
              <div className="relative flex justify-between items-center h-[50px] bg-transparent border border-white/10 rounded-xl px-4 text-white focus-within:border-white/30 hover:border-white/30 transition-colors">
                <select 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="Tất cả khu vực" className="text-black">Tất cả khu vực</option>
                  <option value="Thuận An" className="text-black">Thuận An</option>
                  <option value="Dĩ An" className="text-black">Dĩ An</option>
                  <option value="Thủ Đức" className="text-black">Thủ Đức</option>
                  <option value="Quận 1" className="text-black">Quận 1</option>
                  <option value="Quận 2" className="text-black">Quận 2</option>
                  <option value="Quận 9" className="text-black">Quận 9</option>
                </select>
                <div className="flex items-center gap-2 pointer-events-none truncate mr-2">
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm font-medium truncate">{area}</span>
                </div>
                <ChevronDown size={16} className="text-gray-400 pointer-events-none shrink-0" />
              </div>
            </div>

            {/* Input 3: Giá (VND) */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-[#A19D9C] text-xs font-semibold pl-1">Khoảng giá</label>
              <div className="relative flex justify-between items-center h-[50px] bg-transparent border border-white/10 rounded-xl px-4 text-white focus-within:border-white/30 hover:border-white/30 transition-colors">
                <select 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <option value="Tất cả mức giá" className="text-black">Tất cả mức giá</option>
                  <option value="Từ 0.0 - 5.0 Tỷ" className="text-black">Từ: 0.0 Tỷ - Đến: 5.0 Tỷ</option>
                  <option value="Từ 5.0 - 10.0 Tỷ" className="text-black">Từ: 5.0 Tỷ - Đến: 10.0 Tỷ</option>
                  <option value="Trên 10 Tỷ" className="text-black">Trên: 10.0 Tỷ</option>
                </select>
                <div className="flex items-center gap-2 pointer-events-none truncate mr-2">
                  <DollarSign size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm font-medium truncate">{price}</span>
                </div>
                <ChevronDown size={16} className="text-gray-400 pointer-events-none shrink-0" />
              </div>
            </div>

            {/* Input 4: Từ khóa */}
            <div className="flex flex-col gap-2">
              <label className="text-[#A19D9C] text-xs font-semibold pl-1">Từ khóa</label>
              <div className="flex items-center gap-2 h-[50px] bg-transparent border border-white/10 rounded-xl px-4 text-white focus-within:border-white/30 transition-colors">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Nhập từ khóa" 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch()
                  }}
                  className="bg-transparent outline-none w-full text-sm font-medium placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="h-[50px] bg-[#CF4538] hover:bg-[#A8352A] text-white w-full rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#CF4538]/20 group"
            >
              <Search size={16} className="transition-transform duration-300 group-hover:scale-110" />
              Tìm kiếm
            </button>

          </div>
        </div>
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-white pt-24 pb-16 relative z-10 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div 
              className={`flex items-start gap-4 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <div className="w-12 h-12 rounded-[14px] bg-[#FDF3F2] flex items-center justify-center shrink-0">
                <Shield size={24} className="text-[#C24136]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-gray-900 font-bold text-base relative w-max after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C24136] after:transition-all after:duration-300 hover:after:w-full cursor-default">
                  Dự án uy tín
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">Hợp tác với chủ đầu tư hàng đầu</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div 
              className={`flex items-start gap-4 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '1350ms' }}
            >
              <div className="w-12 h-12 rounded-[14px] bg-[#FDF3F2] flex items-center justify-center shrink-0">
                <Home size={24} className="text-[#C24136]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-gray-900 font-bold text-base relative w-max after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C24136] after:transition-all after:duration-300 hover:after:w-full cursor-default">
                  Vị trí đắc địa
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">Kết nối thuận tiện, tiềm năng tăng giá cao</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div 
              className={`flex items-start gap-4 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '1500ms' }}
            >
              <div className="w-12 h-12 rounded-[14px] bg-[#FDF3F2] flex items-center justify-center shrink-0">
                <Heart size={24} className="text-[#C24136]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-gray-900 font-bold text-base relative w-max after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C24136] after:transition-all after:duration-300 hover:after:w-full cursor-default">
                  Tiện ích đa dạng
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">Đáp ứng mọi nhu cầu sống hiện đại</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div 
              className={`flex items-start gap-4 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '1650ms' }}
            >
              <div className="w-12 h-12 rounded-[14px] bg-[#FDF3F2] flex items-center justify-center shrink-0">
                <Headset size={24} className="text-[#C24136]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-gray-900 font-bold text-base relative w-max after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C24136] after:transition-all after:duration-300 hover:after:w-full cursor-default">
                  Hỗ trợ tận tâm
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">Đồng hành cùng bạn trong suốt quá trình</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}