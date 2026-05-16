'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import PhoneButton from '@/components/phone-button'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import {
  Phone, ChevronDown, Building2, Shield, Leaf, Sparkles, MapPin,
  Car, Clock, Building, Check, Waves, Dumbbell, ShoppingBag, Trees,
  GraduationCap, Coffee, BookOpen, Utensils, Baby, Hammer, Home,
  Mail, Send, BarChart2, ArrowRight, ArrowLeft, Star, Maximize2, X,
  Film, Stethoscope, Download, Gift, Anchor, Sun, Wind
} from "lucide-react"

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

function Reveal({ children, delay = 0, direction = 'up', threshold = 0.08, style = {}, className = '', id }: {
  children: React.ReactNode; delay?: number; direction?: Direction
  threshold?: number; style?: React.CSSProperties; className?: string; id?: string
}) {
  const { ref, visible } = useScrollReveal(threshold)
  const init: Record<Direction, string> = {
    up: 'translateY(50px)', down: 'translateY(-50px)',
    left: 'translateX(-50px)', right: 'translateX(50px)', scale: 'scale(0.88)',
  }
  return (
    <div id={id} ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : init[direction],
      transition: `opacity 0.75s ease-out ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ─── Carousel 3D (Coverflow) Component ─── */
function CoverflowCarousel({ items, imageFit = "cover", isDark = false, showTextOutside = false }: {
  items: any[], imageFit?: "cover" | "contain", isDark?: boolean, showTextOutside?: boolean
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightbox, setLightbox] = useState<{src: string, title: string} | null>(null)

  const displayItems = items.length < 5 ? [...items, ...items, ...items].slice(0, Math.max(5, items.length * 3)) : items
  const length = displayItems.length

  const next = () => setCurrentIndex((prev) => (prev + 1) % length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + length) % length)

  useEffect(() => { setCurrentIndex(0) }, [items])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [lightbox])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (lightbox && e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  return (
    <>
      <div className={cn(
        "relative w-full flex flex-col items-center justify-center overflow-hidden py-10 group/carousel",
        showTextOutside ? "h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]" : "h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px]"
      )}>
        <div className="relative w-full h-full flex items-center justify-center">
          {displayItems.map((item, idx) => {
            let diff = idx - currentIndex
            if (diff > Math.floor(length / 2)) diff -= length
            if (diff < -Math.floor(length / 2)) diff += length

            const isCenter = diff === 0
            const isLeft = diff === -1
            const isRight = diff === 1

            let transformStr = `translateX(0) scale(0.5)`
            let opacity = 0
            let zIndex = 0

            if (isCenter) { transformStr = `translateX(0) scale(1)`; opacity = 1; zIndex = 30 }
            else if (isLeft) { transformStr = `translateX(-55%) scale(0.85)`; opacity = 0.6; zIndex = 20 }
            else if (isRight) { transformStr = `translateX(55%) scale(0.85)`; opacity = 0.6; zIndex = 20 }
            else if (diff < -1) { transformStr = `translateX(-90%) scale(0.65)`; opacity = 0; zIndex = 10 }
            else if (diff > 1) { transformStr = `translateX(90%) scale(0.65)`; opacity = 0; zIndex = 10 }

            return (
              <div
                key={`${idx}-${item.title}`}
                onClick={() => { if (isLeft) prev(); if (isRight) next() }}
                className={cn(
                  "absolute top-0 bottom-0 my-auto w-[85%] md:w-[70%] lg:w-[900px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col",
                  !isCenter && "cursor-pointer hover:opacity-100",
                  isDark ? "bg-black/20 border border-white/10" : "bg-white border border-[#D6EAF2]",
                  showTextOutside ? "h-[85%]" : "h-[100%]"
                )}
                style={{ transform: transformStr, opacity, zIndex }}
              >
                <div
                  className="relative w-full flex-grow group bg-white"
                  onClick={(e) => { if (isCenter) { e.stopPropagation(); setLightbox({ src: item.src, title: item.title }) } }}
                  style={isCenter ? { cursor: 'zoom-in' } : {}}
                >
                  <Image src={item.src} alt={item.title} fill className={cn(
                    "transition-transform duration-700",
                    isCenter && "group-hover:scale-[1.02]",
                    imageFit === "contain" ? "object-contain p-4 mix-blend-multiply" : "object-cover"
                  )} />

                  {imageFit === "cover" && !showTextOutside && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002E42]/90 via-transparent to-transparent pointer-events-none" />
                  )}
                  {isCenter && (
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <Maximize2 size={16} />
                    </div>
                  )}
                  {!showTextOutside && (
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex justify-center pointer-events-none">
                      <p className={cn(
                        "font-bold text-sm md:text-xl font-sans px-6 py-2.5 rounded-full shadow-lg transition-transform",
                        isCenter ? "translate-y-0" : "translate-y-4 opacity-0",
                        isDark ? "bg-white/15 backdrop-blur-md text-white border border-white/20" : "bg-white text-[#005B7F] border border-[#D6EAF2]"
                      )}>{item.title}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {showTextOutside && (
          <div className="absolute bottom-2 left-0 right-0 text-center z-40 px-4">
            <p className={cn(
              "inline-block font-bold text-xs sm:text-sm md:text-base px-6 py-2.5 rounded-full shadow-md font-sans max-w-full truncate",
              isDark ? "bg-black/60 backdrop-blur-sm text-white border border-white/20" : "bg-white text-[#005B7F] border border-[#D6EAF2]"
            )}>{displayItems[currentIndex]?.title}</p>
          </div>
        )}

        <button onClick={prev} className={cn("absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#D4A843] hover:text-[#002E42]" : "bg-white/90 backdrop-blur shadow-lg border border-[#D6EAF2] text-[#005B7F] hover:bg-[#005B7F] hover:text-white")}>
          <ArrowLeft size={20} />
        </button>
        <button onClick={next} className={cn("absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#D4A843] hover:text-[#002E42]" : "bg-white/90 backdrop-blur shadow-lg border border-[#D6EAF2] text-[#005B7F] hover:bg-[#005B7F] hover:text-white")}>
          <ArrowRight size={20} />
        </button>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300"
          style={{ backgroundColor: 'rgba(0,46,66,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-[#D4A843] text-white hover:text-[#002E42] rounded-full p-3 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
          ><X size={26} /></button>
          <div className="relative w-full max-w-5xl flex flex-col items-center animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} style={{ width: '100%', height: 'auto', maxHeight: '82vh', objectFit: 'contain', borderRadius: '1rem' }} />
            <p className="text-white/80 text-sm font-bold mt-5 font-sans tracking-widest uppercase text-center px-4">{lightbox.title}</p>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Data ─── */
const navLinks = [
  { href: "#overview", label: "Tổng Quan" },
  { href: "#cta", label: "Lý Do Sở Hữu" },
  { href: "#location", label: "Vị Trí" },
  { href: "#products", label: "Sản Phẩm" },
  { href: "#showhouse", label: "Nhà Mẫu" },
  { href: "#showroom", label: "Phối Cảnh" },
  { href: "#amenities", label: "Tiện Ích" },
]

const features = [
  {
    icon: Anchor,
    title: "Nhà Phố Ven Sông Hiếm Hoi Quận 8",
    description: "Chỉ 50 căn nhà phố thương mại mặt tiền sông Phú Định — sản phẩm khan hiếm, không thể nhân rộng tại khu Tây TP.HCM đang đô thị hóa mạnh."
  },
  {
    icon: Shield,
    title: "Pháp Lý Sạch — Sổ Hồng Lâu Dài",
    description: "Chủ đầu tư Saigonres Group, pháp lý minh bạch, quy hoạch rõ ràng. Mỗi căn đều có sổ hồng lâuài, an tâm sở hữu và giao dịch."
  },
  {
    icon: Car,
    title: "Kết Nối Đại Lộ Võ Văn Kiệt",
    description: "Liền kề trục huyết mạch Võ Văn Kiệt, 10 phút đến Quận 1 & Quận 5. Bến thuyền Phú Định ngay trước cửa — giao thông thủy bộ thuận tiện."
  },
  {
    icon: Sun,
    title: "Thiết Kế Tân Cổ Điển Đẳng Cấp",
    description: "Phong cách tân cổ điển 1 trệt + 1 lửng + 2 lầu, bàn giao hoàn thiện trong & ngoài. Mặt tiền thoáng rộng, ban công đón gió sông, sân trước – sân sau xanh mát."
  },
]

const connections = [
  {
    icon: Car,
    title: "10 Phút Ra Đại Lộ Võ Văn Kiệt",
    description: "Kết nối tức thì với trung tâm Quận 1, Quận 5, Quận 6. Hạ tầng đồng bộ cửa ngõ Tây Sài Gòn đang được đầu tư mạnh giai đoạn 2025–2030."
  },
  {
    icon: Anchor,
    title: "Liền Kề Bến Thuyền Phú Định",
    description: "Một trong những bến cảng nội đô lớn nhất TP.HCM ngay trước cửa. Không gian sống ven sông trong lành, thoáng đãng — giá trị hiếm có giữa lòng đô thị."
  },
  {
    icon: Clock,
    title: "15 Phút Đến TP. Thủ Đức & Bình Tân",
    description: "Nằm giữa vùng phát triển năng động Bình Tân – Quận 8 – Bình Chánh, kết nối toàn bộ khu Tây và hành lang kinh tế mới về Long An."
  },
]

const nearbyPlaces = [
  { name: "Đại lộ Võ Văn Kiệt", time: "5 phút" },
  { name: "Trung tâm Quận 5", time: "10 phút" },
  { name: "Trung tâm Quận 1", time: "15 phút" },
  { name: "Aeon Mall Bình Tân", time: "15 phút" },
  { name: "TP. Thủ Đức", time: "20 phút" },
  { name: "Sân bay TSN", time: "25 phút" },
]

const productTypes = [
  {
    id: "diamond", name: "Diamond", area: "60m² – 80m² / căn", price: "Liên hệ CĐT",
    description: "Phân khu Diamond — Những căn nhà phố thương mại vị trí đắc địa nhất dự án, trực diện mặt tiền sông và trục đường chính. Thiết kế sang trọng, tối ưu diện tích kinh doanh và không gian sống thượng lưu.",
    features: ["Vị trí độc bản mặt tiền sông", "Kiến trúc tân cổ điển đẳng cấp", "Vỉa hè rộng thông thoáng", "Pháp lý hoàn chỉnh, sổ hồng riêng"],
    popular: true,
    gallery: [
      { src: "/pearl-riverside/diamond1.jpg", title: "Phối Cảnh Diamond Riverside" },
      { src: "/pearl-riverside/diamond2.jpg", title: "Mặt Tiền Kinh Doanh Diamond" },
      { src: "/pearl-riverside/diamond3.jpg", title: "Thiết Kế Nội Thất Diamond" },
      { src: "/pearl-riverside/diamond4.jpg", title: "Thiết Kế Nội Thất Diamond" },
      { src: "/pearl-riverside/diamond5.jpg", title: "Thiết Kế Nội Thất Diamond" },
      { src: "/pearl-riverside/diamond6.jpg", title: "Thiết Kế Nội Thất Diamond" },
    ]
  },
  {
    id: "emerald", name: "Emerald", area: "50m² – 60m² / căn", price: "Từ 6,39 tỷ/căn",
    description: "Phân khu Emerald mang đến không gian sống xanh mát, hài hòa cùng thiên nhiên. Thiết kế tối ưu ánh sáng và gió trời, mang lại sự thư thái tuyệt đối cho cư dân.",
    features: ["Không gian sống xanh tiêu chuẩn", "Thiết kế 1 trệt 1 lửng 2 lầu", "Hệ thống thông gió tự nhiên", "Bàn giao hoàn thiện cao cấp"],
    popular: false,
    gallery: [
      { src: "/pearl-riverside/emerald1.jpg", title: "Phối Cảnh Emerald" },
      { src: "/pearl-riverside/emerald2.jpg", title: "Kiến Trúc Emerald" },
      { src: "/pearl-riverside/emerald3.jpg", title: "Mặt Bằng Bố Trí Emerald" },
      { src: "/pearl-riverside/emerald4.jpg", title: "Phối Cảnh Emerald" },
      { src: "/pearl-riverside/emerald5.jpg", title: "Kiến Trúc Emerald" },
      { src: "/pearl-riverside/emerald6.jpg", title: "Mặt Bằng Bố Trí Emerald" },
    ]
  },
  {
    id: "emerald-plus", name: "Emerald+", area: "60m² – 65m² / căn", price: "Liên hệ CĐT",
    description: "Phiên bản Emerald+ với diện tích rộng rãi hơn, tối ưu hóa không gian cho các gia đình đa thế hệ, đảm bảo sự riêng tư nhưng vẫn kết nối ấm cúng.",
    features: ["Diện tích tối ưu hơn", "Không gian linh hoạt", "Ban công đón gió sông", "Phong cách sống hiện đại"],
    popular: false,
    gallery: [
      { src: "/pearl-riverside/emerald+1.jpg", title: "Phối Cảnh Emerald+" },
      { src: "/pearl-riverside/emerald+2.jpg", title: "Kiến Trúc Emerald+" },
      { src: "/pearl-riverside/emerald+3.jpg", title: "Thiết kế mẫu Emerald+" },
      { src: "/pearl-riverside/emerald+4.jpg", title: "Phối Cảnh Emerald+" },
      { src: "/pearl-riverside/emerald+5.jpg", title: "Kiến Trúc Emerald+" },
      { src: "/pearl-riverside/emerald+6.jpg", title: "Thiết kế mẫu Emerald+" },
    ]
  },
  {
    id: "ruby", name: "Ruby", area: "55m² – 70m² / căn", price: "Liên hệ CĐT",
    description: "Ruby Riverside tỏa sáng như viên hồng ngọc giữa lòng dự án. Tọa lạc tại các trục đường nội khu sầm uất, Ruby là sự lựa chọn lý tưởng cho hoạt động kinh doanh đa ngành nghề.",
    features: ["Trục đường nội khu sầm uất", "Phù hợp kinh doanh & cho thuê", "Hạ tầng kỹ thuật đồng bộ", "Cộng đồng cư dân tinh hoa"],
    popular: false,
    gallery: [
      { src: "/pearl-riverside/ruby1.jpg", title: "Phối Cảnh Ruby" },
      { src: "/pearl-riverside/ruby2.jpg", title: "Trục Đường Ruby sầm uất" },
      { src: "/pearl-riverside/ruby3.jpg", title: "Tiện ích liền kề Ruby" },
      { src: "/pearl-riverside/ruby4.jpg", title: "Phối Cảnh Ruby" },
      { src: "/pearl-riverside/ruby5.jpg", title: "Trục Đường Ruby sầm uất" },
      { src: "/pearl-riverside/ruby6.jpg", title: "Tiện ích liền kề Ruby" },
    ]
  },
  {
    id: "sapphire", name: "Sapphire", area: "50m² – 60m² / căn", price: "Liên hệ CĐT",
    description: "Sở hữu vẻ đẹp yên bình của đại dương, Sapphire là phân khu nhà phố yên tĩnh, an ninh tuyệt đối với tầm nhìn hướng sông lộng gió.",
    features: ["Khu vực yên tĩnh, riêng tư", "An ninh Compound 24/7", "Gần bến thuyền Phú Định", "Tiềm năng tăng giá bền vững"],
    popular: false,
    gallery: [
      { src: "/pearl-riverside/sapphire1.jpg", title: "Phối Cảnh Sapphire" },
      { src: "/pearl-riverside/sapphire2.jpg", title: "Không gian ven sông Sapphire" },
      { src: "/pearl-riverside/sapphire3.jpg", title: "View sông từ Sapphire" },
      { src: "/pearl-riverside/sapphire4.jpg", title: "Phối Cảnh Sapphire" },
      { src: "/pearl-riverside/sapphire5.jpg", title: "Không gian ven sông Sapphire" },
      { src: "/pearl-riverside/sapphire6.jpg", title: "View sông từ Sapphire" },
    ]
  },
]

const showhouseTypes = [
  {
    id: "nhamauA", name: "Nhà Mẫu Diamond (Mẫu A)", area: "80m²",
    description: "Thiết kế theo phong cách Indochine kết hợp hiện đại, tối ưu không gian kinh doanh tầng trệt và nơi ở sang trọng tầng trên.",
    gallery: [
      { src: "/pearl-riverside/nhamaua1.jpg", title: "Phòng khách mẫu A" },
      { src: "/pearl-riverside/nhamaua2.jpg", title: "Phòng bếp mẫu A" },
      { src: "/pearl-riverside/nhamaua3.jpg", title: "Phòng ngủ mẫu A" },
      { src: "/pearl-riverside/nhamaua4.jpg", title: "Phòng khách mẫu A" },
      { src: "/pearl-riverside/nhamaua5.jpg", title: "Phòng bếp mẫu A" },
      { src: "/pearl-riverside/nhamaua6.jpg", title: "Phòng ngủ mẫu A" },
      { src: "/pearl-riverside/nhamaua7.jpg", title: "Phòng ngủ mẫu A" },
      { src: "/pearl-riverside/nhamaua8.jpg", title: "Phòng khách mẫu A" },
      { src: "/pearl-riverside/nhamaua9.jpg", title: "Phòng bếp mẫu A" },
      { src: "/pearl-riverside/nhamaua10.jpg", title: "Phòng ngủ mẫu A" },
    ]
  },
  {
    id: "nhamauB", name: "Nhà Mẫu Emerald (Mẫu B)", area: "60m²",
    description: "Phong cách tối giản Minimalism, tập trung vào ánh sáng tự nhiên và luồng gió sông, phù hợp cho gia đình trẻ năng động.",
    gallery: [
      { src: "/pearl-riverside/nhamaub1.jpg", title: "Phòng khách mẫu A" },
      { src: "/pearl-riverside/nhamaub2.jpg", title: "Phòng bếp mẫu A" },
      { src: "/pearl-riverside/nhamaub3.jpg", title: "Phòng ngủ mẫu A" },
      { src: "/pearl-riverside/nhamaub4.jpg", title: "Phòng khách mẫu A" },
      { src: "/pearl-riverside/nhamaub5.jpg", title: "Phòng bếp mẫu A" },
      { src: "/pearl-riverside/nhamaub6.jpg", title: "Phòng ngủ mẫu A" },
      { src: "/pearl-riverside/nhamaub7.jpg", title: "Phòng ngủ mẫu A" },
      { src: "/pearl-riverside/nhamaub8.jpg", title: "Phòng khách mẫu A" },
      { src: "/pearl-riverside/nhamaub9.jpg", title: "Phòng bếp mẫu A" },
      { src: "/pearl-riverside/nhamaub10.jpg", title: "Phòng ngủ mẫu A" },
    ]
  }
]

const showroomGallery = [
  { src: "/pearl-riverside/phoicanh1.jpg", title: "Phối Cảnh Tổng Thể — Pearl Riverside" },
  { src: "/pearl-riverside/phoicanh2.jpg", title: "Trục Phố Ven Sông Phú Định" },
  { src: "/pearl-riverside/phoicanh3.jpg", title: "Khu Cộng Đồng An Cư Đẳng Cấp" },
  { src: "/pearl-riverside/phoicanh4.jpg", title: "Không Gian Xanh & Mặt Nước" },
  { src: "/pearl-riverside/phoicanh5.jpg", title: "Mặt Tiền Đường Phú Định" },
]

const floorPlans = [
  { src: "/pearl-riverside/matbangtongthe.jpg", title: "Mặt Bằng Tổng Thể Dự Án" },
]

const amenitiesGallery = [
  { src: "/pearl-riverside/tienich1.png", title: "01 — GO An Lạc" },
  { src: "/pearl-riverside/tienich2.jpg", title: "02 — Aeon Mall Bình Tân" },
  { src: "/pearl-riverside/tienich3.png", title: "03 — Galaxy Kinh Dương Vương" },
  { src: "/pearl-riverside/tienich4.jpg", title: "04 — Trung tâm mua sắm trung tâm" },
]

const highlightAmenities = [
  { icon: Trees, label: "Công viên 5.954m²" },
  { icon: Anchor, label: "Bến thuyền nội đô" },
  { icon: Wind, label: "Hành lang xanh ven sông" },
  { icon: Waves, label: "View sông toàn cảnh" },
  { icon: ShoppingBag, label: "Thương mại gần kề" },
  { icon: GraduationCap, label: "Trường học quanh khu" },
  { icon: Stethoscope, label: "Bệnh viện tiêu chuẩn" },
  { icon: Coffee, label: "F&B & ẩm thực đa dạng" },
  { icon: Baby, label: "Khu vui chơi trẻ em" },
  { icon: Shield, label: "An ninh 24/7" },
  { icon: Car, label: "Bãi đỗ xe nội khu" },
  { icon: Leaf, label: "Không gian sống trong lành" },
]

const amenityCategories = [
  {
    title: "Thiên Nhiên & Sông Nước",
    icon: Waves,
    items: ["Công viên cây xanh rộng 5.954m²", "Hành lang xanh mặt tiền sông Phú Định", "Bến thuyền Phú Định — cảng nội đô lớn nhất TP.HCM", "View sông thoáng đãng, không khí trong lành"]
  },
  {
    title: "Hạ Tầng & Giao Thông",
    icon: Car,
    items: ["Đường nội khu trải nhựa, vỉa hè cây xanh", "Hệ thống điện – nước âm, chiếu sáng hiện đại", "Kết nối Võ Văn Kiệt — huyết mạch Tây TP.HCM", "Tuyến Phú Định – Bến Lức đang quy hoạch mở rộng"]
  },
  {
    title: "Tiện Ích Giáo Dục - Y Tế",
    icon: GraduationCap,
    items: ["Trường tiểu học, THCS, THPT trong bán kính 1km", "Bệnh viện Quận 8 & trung tâm y tế gần kề", "Chợ Phú Định & siêu thị tiện lợi sát khu", "Nhà văn hóa, công viên cộng đồng hiện đại"]
  },
  {
    title: "Thương Mại & Dịch Vụ",
    icon: ShoppingBag,
    items: ["Chuỗi F&B & nhà hàng ven sông đặc trưng", "Tầng trệt thương mại linh hoạt đa công năng", "Aeon Mall Bình Tân – 15 phút di chuyển", "Kết nối toàn bộ chuỗi tiện ích khu Tây"]
  },
]

const milestones = [
  {
    id: 1, title: "Pháp Lý Hoàn Chỉnh", date: "Đã hoàn thành",
    description: "Dự án do Saigonres Group phát triển với đầy đủ quyết định giao đất, quy hoạch và pháp lý minh bạch. Sổ hồng lâu dài cho từng căn, sẵn sàng giao dịch.",
    status: "completed"
  },
  {
    id: 2, title: "Mở Bán Giai Đoạn 1", date: "Đang mở bán",
    description: "Pearl Riverside chính thức mở bán với mức giá từ 6,39 tỷ đồng/căn. Chính sách thanh toán linh hoạt, đặt cọc 100 triệu giữ chỗ chọn căn đẹp.",
    status: "in-progress"
  },
  {
    id: 3, title: "Bàn Giao Hoàn Thiện", date: "Theo tiến độ CĐT",
    description: "Bàn giao nhà hoàn thiện bên trong và bên ngoài. Cư dân nhận nhà sẵn sàng ở hoặc kinh doanh ngay, không phát sinh chi phí hoàn thiện thêm.",
    status: "upcoming"
  },
  {
    id: 4, title: "Kích Hoạt Cộng Đồng", date: "Sau bàn giao",
    description: "Khu cộng đồng yên tĩnh – an toàn đi vào vận hành đầy đủ. Hệ thống hạ tầng, cây xanh và tiện ích hoàn chỉnh, hình thành phong cách sống ven sông đẳng cấp.",
    status: "upcoming"
  },
]

const legalDocuments = [
  "Chủ đầu tư: Công ty TNHH MTV Địa ốc Sài Gòn Nam Đô (Saigonres Group) — uy tín hàng đầu TP.HCM",
  "Quyết định giao đất và Quy hoạch 1/500 đã được phê duyệt chính thức",
  "Sổ hồng lâu dài từng căn — pháp lý minh bạch, sẵn sàng giao dịch",
  "Dự án đã hoàn chỉnh hạ tầng — cư dân có thể dọn vào ở ngay sau bàn giao",
]

/* ─── Main Component ─── */
export default function PearlRiversideLandingPage() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("diamond")
  const [selectedShowhouse, setSelectedShowhouse] = useState("nhamauA")
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", product: "", message: "",
    subject: "Đăng ký tư vấn dự án Pearl Riverside"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [overviewTab, setOverviewTab] = useState<'tongquan' | 'chudautu'>('tongquan')
  const [zoomedImage, setZoomedImage] = useState<{src: string, alt: string} | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsHeroLoaded(true)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) { 
    e.preventDefault()
    const targetId = e.currentTarget instanceof HTMLAnchorElement 
                     ? e.currentTarget.getAttribute('href') 
                     : null;

    if (targetId && targetId !== '#') {
      const el = document.querySelector(targetId)
      if (el) {
        const offset = el.getBoundingClientRect().top + window.pageYOffset - 90
        window.scrollTo({ top: offset, behavior: "smooth" })
        setMobileMenuOpen(false)
      }
    }
  })
})
  }, [])

  useEffect(() => {
    document.body.style.overflow = zoomedImage ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [zoomedImage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', product: '', message: '', subject: 'Đăng ký tư vấn dự án Pearl Riverside' })
          setIsSubmitted(false)
        }, 4000)
      } else { alert("Có lỗi từ máy chủ. Vui lòng thử lại!") }
    } catch { alert("Lỗi kết nối. Không thể đăng ký lúc này.") }
    finally { setIsSubmitting(false) }
  }

  const activeProduct = productTypes.find(p => p.id === selectedProduct) || productTypes[0]
  const activeShowhouse = showhouseTypes.find(s => s.id === selectedShowhouse) || showhouseTypes[0]

  return (
    <main className="min-h-screen bg-[#F0F7FA] overflow-x-hidden selection:bg-[#005B7F] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ── Header & Nav ── */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-[#D6EAF2]/60" : "bg-transparent"
      )}>
        <Header />
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-10 py-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-xs lg:text-sm font-bold text-[#1A4A60] hover:text-[#005B7F] tracking-[0.1em] uppercase transition-colors relative group font-sans">
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#D4A843] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a href="#contact"
                className="ml-4 text-xs font-bold bg-[#005B7F] text-white px-6 py-3 rounded-full tracking-[0.1em] uppercase hover:bg-[#004060] transition-all shadow-md hover:shadow-xl hover:shadow-[#005B7F]/30 hover:-translate-y-0.5 font-sans">
                Nhận Bảng Giá
              </a>
            </nav>

            <div className="md:hidden flex items-center justify-between py-3">
              <span className="text-[#005B7F] font-bold text-base tracking-wider font-sans">PEARL RIVERSIDE</span>
              <div className="flex items-center gap-3">
                <a href="#contact" className="text-xs font-bold bg-[#005B7F] text-white px-5 py-2.5 rounded-full tracking-wider uppercase font-sans shadow-sm">
                  Đăng Ký
                </a>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#D6EAF2] hover:bg-[#B8D8E8] transition-colors">
                  <span className={cn("w-5 h-0.5 bg-[#005B7F] transition-all duration-300", mobileMenuOpen && "rotate-45 translate-y-2")} />
                  <span className={cn("w-5 h-0.5 bg-[#005B7F] transition-all duration-300", mobileMenuOpen && "opacity-0")} />
                  <span className={cn("w-5 h-0.5 bg-[#005B7F] transition-all duration-300", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-[#D6EAF2] shadow-lg py-2 px-4 flex flex-col z-50">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="block py-3.5 px-2 text-sm font-bold text-[#1A4A60] hover:text-[#005B7F] hover:bg-[#F0F7FA]/50 rounded-lg tracking-wider uppercase font-sans transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-end pb-12 md:pb-24 justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image src="/pearl-riverside/hero-bg.jpg" alt="Pearl Riverside — Nhà phố ven sông Phú Định" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002E42] via-[#002E42]/65 to-[#005B7F]/30" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>

        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A843] to-transparent z-10" />

        <div className={cn(
          "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-1000",
          isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex items-center gap-2 border border-[#D4A843]/50 rounded-full px-5 py-2.5 bg-[#D4A843]/10 backdrop-blur-md">
              <Anchor className="w-3 h-3 text-[#D4A843]" />
              <span className="text-[#D4A843] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase font-sans">Nhà Phố Thương Mại Ven Sông — Quận 8 TP.HCM</span>
              <Anchor className="w-3 h-3 text-[#D4A843]" />
            </div>
          </div>

          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-none font-sans drop-shadow-lg">
            PEARL<br className="sm:hidden" /> <span className="text-[#D4A843]">RIVERSIDE</span>
          </h1>
          <p className="text-center text-white/90 text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-4 md:mb-5 font-medium font-sans">
            Viên ngọc bên sông — An cư đẳng cấp, đầu tư sinh lời bền vững
          </p>
          <div className="flex items-center justify-center gap-2 mb-8 md:mb-12">
            <MapPin size={16} className="text-[#D4A843] shrink-0" />
            <p className="text-white/70 text-sm sm:text-base font-sans">Đường Phú Định, Phường Phú Định, Quận 8, TP. Hồ Chí Minh</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 md:mb-14">
            {[
              { value: "50", unit: "Căn nhà phố", label: "quy mô giới hạn" },
              { value: "50–60m²", unit: "Diện tích / căn", label: "tân cổ điển 4 tầng" },
              { value: "6,39 tỷ", unit: "Giá từ", label: "cạnh tranh khu Tây" },
              { value: "100%", unit: "Hoàn thiện", label: "bàn giao trong & ngoài" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 hover:bg-white/10 hover:border-[#D4A843]/40 transition-all duration-300">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4A843] leading-none mb-1 font-sans drop-shadow-sm">{stat.value}</p>
                <p className="text-white/80 text-xs uppercase tracking-wider font-bold font-sans">{stat.unit}</p>
                <p className="text-white/50 text-[11px] mt-1 font-sans">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#D4A843] hover:bg-[#b8953e] text-[#002E42] font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all hover:shadow-[0_8px_30px_rgb(212,168,67,0.4)] hover:-translate-y-1 font-sans">
              Nhận Thông Tin & Báo Giá <ArrowRight size={18} />
            </a>
            <a href="#overview"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all backdrop-blur-sm font-sans">
              Khám Phá Dự Án
            </a>
          </div>

          <div className="flex justify-center mt-12 md:mt-16">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <div className="w-7 h-11 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
                <div className="w-1.5 h-3 bg-white/80 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TỔNG QUAN ── */}
      <section id="overview" className="py-20 md:py-32 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#005B7F]" />
                <span className="text-[#005B7F] text-xs font-bold tracking-[0.2em] uppercase font-sans">Tổng Quan Dự Án</span>
                <div className="h-px w-12 bg-[#005B7F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#001E2E] mb-6 leading-tight font-sans">
                Viên Ngọc Bên Sông<br />Giữa Lòng Tây Sài Gòn
              </h2>
              <p className="text-[#1A4A60] text-base md:text-lg leading-relaxed font-sans">
                Pearl Riverside là khu nhà phố thương mại cao cấp ven sông tọa lạc tại Quận 8, do Saigonres Group phát triển — nơi không gian sống trong lành hòa cùng tiềm năng đầu tư bền vững ngay cửa ngõ Tây TP.HCM.
              </p>
            </div>
          </Reveal>

          {/* Tab Bar */}
          <Reveal direction="up" delay={0.05}>
            <div className="flex justify-center mb-10 md:mb-14">
              <div className="inline-flex bg-[#D6EAF2] rounded-2xl p-1.5 gap-1 shadow-inner">
                {[
                  { key: 'tongquan', label: 'Tổng Quan Dự Án' },
                  { key: 'chudautu', label: 'Chủ Đầu Tư' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setOverviewTab(tab.key as 'tongquan' | 'chudautu')}
                    className={cn(
                      "relative px-7 py-3 rounded-xl text-sm font-bold tracking-wider uppercase font-sans transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#005B7F]",
                      overviewTab === tab.key
                        ? "bg-[#005B7F] text-white shadow-[0_4px_16px_rgba(0,91,127,0.28)] scale-[1.03]"
                        : "text-[#1A4A60] hover:text-[#005B7F] hover:bg-white/60"
                    )}
                  >{tab.label}</button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Tab: Tổng quan */}
          {overviewTab === 'tongquan' && (
            <>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">
                <Reveal direction="left">
                  <div
                    className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D6EAF2] group cursor-zoom-in"
                    onClick={() => setZoomedImage({ src: "/pearl-riverside/tongquan.jpg", alt: "Phối cảnh tổng thể Pearl Riverside" })}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image src="/pearl-riverside/tongquan.jpg" alt="Phối cảnh Pearl Riverside" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002E42]/90 via-[#002E42]/30 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 pointer-events-none">
                        <div className="bg-[#D4A843]/90 backdrop-blur-sm text-[#002E42] p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Maximize2 size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none z-10">
                      <h3 className="text-white font-bold text-xl md:text-2xl mb-2 font-sans">Chỉ 50 căn — Quy mô giới hạn</h3>
                      <p className="text-white/80 text-sm md:text-base font-sans">Sản phẩm khan hiếm ven sông, không thể tái tạo tại khu Tây TP.HCM.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="right">
                  <div className="space-y-8 md:space-y-10">
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                      {[
                        { label: "Chủ đầu tư", value: "Saigonres Group (Địa ốc Sài Gòn Nam Đô)" },
                        { label: "Vị trí", value: "Đường Phú Định, Phường Phú Định, Quận 8" },
                        { label: "Quy mô", value: "50 căn nhà phố thương mại ven sông" },
                        { label: "Pháp lý", value: "Sổ hồng lâu dài — giao dịch an toàn" },
                      ].map((item) => (
                        <div key={item.label} className="border-l-[3px] border-[#D4A843] pl-5 py-1">
                          <p className="text-[#5B8FA8] text-xs font-bold uppercase tracking-widest mb-1.5 font-sans">{item.label}</p>
                          <p className="text-[#001E2E] font-bold text-base md:text-lg leading-snug font-sans">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-br from-[#D6EAF2] to-[#F0F7FA] rounded-3xl p-8 md:p-10 border border-[#D6EAF2] shadow-sm">
                      <h3 className="text-xl md:text-2xl font-bold text-[#005B7F] mb-6 font-sans">Đặc Điểm Sản Phẩm</h3>
                      <ul className="space-y-5">
                        {[
                          { label: "Diện tích đất 50–60m² mỗi căn", desc: "Bố trí 1 trệt, 1 lửng, 2 lầu tối ưu công năng — phù hợp ở kết hợp kinh doanh." },
                          { label: "Mặt tiền thoáng rộng, ban công đón gió sông", desc: "Khoảng sân trước – sân sau hợp lý, tạo không gian riêng tư và thoáng đãng hiếm có." },
                          { label: "Bàn giao hoàn thiện toàn bộ", desc: "Hoàn thiện bên trong và bên ngoài — dọn vào ở ngay, không tốn chi phí phát sinh thêm." },
                          { label: "Khu cộng đồng yên tĩnh – an ninh 24/7", desc: "Chỉ 50 căn, tạo nên cộng đồng dân cư riêng biệt, chất lượng cao và an toàn tuyệt đối." },
                        ].map((item) => (
                          <li key={item.label} className="flex items-start gap-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D4A843] mt-1.5 shrink-0" />
                            <span className="text-[#1A4A60] text-base leading-relaxed font-sans">
                              <strong className="text-[#001E2E] font-bold">{item.label}:</strong> {item.desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
                {features.map((feature, idx) => (
                  <Reveal key={feature.title} direction="up" delay={idx * 0.1}>
                    <div className="group bg-white rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl border border-[#D6EAF2] hover:border-[#005B7F]/30 transition-all duration-300 h-full hover:-translate-y-1.5">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#D6EAF2] group-hover:bg-[#005B7F] flex items-center justify-center mb-6 md:mb-8 transition-colors duration-300">
                        <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#005B7F] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#001E2E] mb-3 font-sans">{feature.title}</h3>
                      <p className="text-[#1A4A60] text-sm md:text-base leading-relaxed font-sans">{feature.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {/* Tab: Chủ đầu tư */}
          {overviewTab === 'chudautu' && (
            <Reveal direction="up" delay={0.05}>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div className="space-y-8">
                  <div
                    className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D6EAF2] group cursor-zoom-in aspect-[4/3]"
                    onClick={() => setZoomedImage({ src: "/pearl-riverside/chudautu.jpg", alt: "Saigonres Group — Chủ đầu tư Pearl Riverside" })}
                  >
                    <Image src="/pearl-riverside/chudautu.jpg" alt="Saigonres Group" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002E42]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                      <div className="bg-[#D4A843]/90 text-[#002E42] p-4 rounded-full scale-75 group-hover:scale-100 transition-transform"><Maximize2 size={24} /></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
                      <p className="text-white/60 text-xs uppercase tracking-widest font-bold font-sans mb-1">Chủ đầu tư</p>
                      <h3 className="text-white font-bold text-2xl md:text-3xl font-sans">Saigonres Group</h3>
                      <p className="text-white/75 text-sm font-sans mt-1">Địa ốc Sài Gòn Nam Đô — Uy tín hàng đầu TP.HCM</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "10+", label: "Năm kinh nghiệm" },
                      { value: "20+", label: "Dự án đã bàn giao" },
                      { value: "5.000+", label: "Khách hàng tin tưởng" },
                    ].map((s) => (
                      <div key={s.label} className="text-center bg-[#D6EAF2] rounded-2xl py-5 px-3 border border-[#B8D8E8]">
                        <p className="text-[#005B7F] text-2xl md:text-3xl font-bold leading-none font-sans">{s.value}</p>
                        <p className="text-[#5B8FA8] text-[10px] font-bold uppercase tracking-wider mt-1.5 font-sans leading-snug">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#001E2E] mb-4 font-sans">Saigonres Group — Bảo Chứng Uy Tín</h3>
                    <p className="text-[#1A4A60] text-base leading-relaxed font-sans">
                      Công ty TNHH MTV Địa ốc Sài Gòn Nam Đô (Saigonres Group) là chủ đầu tư uy tín với hàng chục dự án nhà ở và thương mại tại TP.HCM. Doanh nghiệp cam kết pháp lý minh bạch, tiến độ đúng hẹn và chất lượng bàn giao vượt kỳ vọng.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#D6EAF2] to-[#F0F7FA] rounded-3xl p-8 border border-[#D6EAF2]">
                    <h4 className="text-lg font-bold text-[#005B7F] mb-5 font-sans uppercase tracking-wider">Cam Kết Với Khách Hàng</h4>
                    <ul className="space-y-4">
                      {[
                        { name: "Pháp lý sổ hồng lâu dài", detail: "Từng căn nhà đều được cấp sổ hồng lâu dài, đảm bảo quyền sở hữu hợp pháp và dễ dàng giao dịch, chuyển nhượng." },
                        { name: "Bàn giao hoàn thiện 100%", detail: "Nhà bàn giao hoàn chỉnh bên trong và bên ngoài, cư dân dọn vào ở ngay mà không cần chi thêm phí thi công." },
                        { name: "Hạ tầng đồng bộ, sẵn dùng", detail: "Đường nội khu, hệ thống điện – nước, chiếu sáng và cây xanh đã hoàn thiện trước khi bàn giao." },
                        { name: "Hỗ trợ vay ngân hàng", detail: "Đối tác ngân hàng uy tín, hỗ trợ vay lên đến 70% giá trị căn nhà với lãi suất ưu đãi và thủ tục nhanh gọn." },
                      ].map((proj) => (
                        <li key={proj.name} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#D4A843] mt-2 shrink-0" />
                          <span className="text-[#1A4A60] text-sm leading-relaxed font-sans">
                            <strong className="text-[#001E2E] font-bold">{proj.name}:</strong> {proj.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-3xl p-8 border border-[#D6EAF2] shadow-sm">
                    <h4 className="text-lg font-bold text-[#001E2E] mb-5 font-sans">Điểm Khác Biệt Pearl Riverside</h4>
                    <div className="space-y-4">
                      {[
                        { firm: "Vị trí ven sông độc nhất", country: "Quận 8", role: "Mặt tiền sông Phú Định — không khí trong lành, thoáng đãng 4 mùa" },
                        { firm: "Quy mô giới hạn 50 căn", country: "Khan hiếm", role: "Cộng đồng dân cư riêng biệt, yên tĩnh, không ồn ào đông đúc" },
                        { firm: "Thiết kế tân cổ điển chuẩn", country: "Cao cấp", role: "Kiến trúc đẳng cấp, bàn giao hoàn thiện toàn bộ trong và ngoài" },
                        { firm: "Kết nối hạ tầng chiến lược", country: "Tiện lợi", role: "5 phút Võ Văn Kiệt, 15 phút Quận 1 — di chuyển cực kỳ thuận tiện" },
                      ].map((firm) => (
                        <div key={firm.firm} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F0F7FA] border border-[#D6EAF2] hover:bg-[#D6EAF2] transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-[#D6EAF2] border border-[#B8D8E8] flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5 text-[#005B7F]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#001E2E] font-bold text-sm font-sans">{firm.firm}</p>
                            <p className="text-[#5B8FA8] text-xs font-sans">{firm.role}</p>
                          </div>
                          <span className="text-[10px] bg-[#005B7F]/10 text-[#005B7F] border border-[#005B7F]/15 px-2.5 py-1 rounded-full font-bold font-sans shrink-0">{firm.country}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a href="#contact" className="inline-flex items-center gap-2 bg-[#005B7F] text-white font-bold px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all hover:bg-[#004060] hover:shadow-[0_8px_24px_rgba(0,91,127,0.35)] hover:-translate-y-0.5 font-sans">
                    Liên Hệ Tư Vấn Ngay <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── LÝ DO SỞ HỮU (CTA) ── */}
      <section id="cta" className="relative py-16 md:py-24 overflow-hidden bg-white scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#005B7F]/5 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#D4A843]/6 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up" className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#005B7F]/20 bg-[#D6EAF2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#005B7F] animate-pulse" />
              <span className="text-[#005B7F] text-[11px] font-bold uppercase tracking-[0.22em] font-sans">5 Lý do sở hữu Pearl Riverside</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal direction="left" className="relative h-full flex flex-col justify-center">
              <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none pt-4 pb-10 px-8 lg:pl-4 lg:pr-10">
                <div
                  className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_rgba(0,46,66,0.18)] border border-[#D6EAF2] group cursor-zoom-in"
                  onClick={() => setZoomedImage({ src: "/pearl-riverside/exterior-01.jpg", alt: "Pearl Riverside — Nhà phố thương mại ven sông" })}
                >
                  <Image src="/pearl-riverside/exterior-01.jpg" alt="Pearl Riverside exterior" fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002E42]/75 via-[#002E42]/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#005B7F]/20 to-transparent mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 pointer-events-none">
                    <div className="bg-[#D4A843]/90 text-[#002E42] p-4 rounded-full shadow-lg scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                  <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-white/15 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/25 pointer-events-none">
                    <Anchor className="w-3 h-3 text-[#D4A843] fill-[#D4A843]" />
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase font-sans">Ven sông Phú Định — Quận 8</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none">
                    <p className="text-white/55 text-[10px] uppercase tracking-widest font-bold mb-0.5 font-sans">Đường Phú Định, Quận 8</p>
                    <p className="text-white font-bold text-base font-sans">Khu cộng đồng 50 căn — Đang mở bán</p>
                  </div>
                </div>

                {/* Badge: đăng ký */}
                <div className="absolute top-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#D6EAF2] z-20 flex items-center gap-3 pointer-events-none">
                  <div className="flex -space-x-2">
                    {[31, 32, 33, 34].map((u) => (
                      <div key={u} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shrink-0">
                        <img src={`https://i.pravatar.cc/80?u=${u}`} alt="" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[#001E2E] text-xs font-bold font-sans leading-tight">+80 đăng ký</p>
                    <p className="text-[#5B8FA8] text-[10px] font-sans">tháng này</p>
                  </div>
                </div>

                {/* Badge: giá */}
                <div className="absolute bottom-0 right-0 bg-[#002E42] rounded-2xl px-6 py-4 shadow-[0_16px_40px_rgba(0,46,66,0.3)] border border-white/10 z-20 text-right pointer-events-none">
                  <p className="text-white/45 text-[10px] uppercase tracking-widest mb-0.5 font-sans">Giá từ</p>
                  <p className="text-[#D4A843] text-2xl font-bold leading-none font-sans">6,39</p>
                  <p className="text-white/55 text-[11px] mt-0.5 font-sans">tỷ đồng</p>
                  <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-[#005B7F] flex items-center justify-center shadow-md">
                    <Home className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" className="flex flex-col gap-6 h-full justify-center mt-0 lg:-mt-4">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#001E2E] leading-[1.25] font-sans tracking-tight">
                  Sở hữu <span className="text-[#005B7F]">nhà phố thương mại</span>{" "}
                  tại{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#005B7F] italic">ven sông Quận 8</span>
                    <span className="absolute left-0 -bottom-0.5 w-full h-[3px] bg-[#D4A843] rounded-full" />
                  </span>{" "}— cơ hội không lặp lại.
                </h2>
                <p className="text-[#1A4A60] text-sm md:text-[15px] leading-relaxed font-sans mt-2">
                  Chỉ <strong className="text-[#001E2E]">50 căn duy nhất</strong> mặt tiền sông Phú Định — sản phẩm khan hiếm, pháp lý hoàn chỉnh, bàn giao hoàn thiện 100%, kết nối đại lộ Võ Văn Kiệt ngay trước cửa.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-[#D4A843]/40 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                <div className="flex-1 h-px bg-gradient-to-l from-[#D4A843]/40 to-transparent" />
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: MapPin, title: "Vị Trí Ven Sông Độc Tôn", desc: "Mặt tiền sông Phú Định, liền kề bến thuyền nội đô — không gian sống xanh mát, thoáng đãng hiếm có giữa lòng Sài Gòn.", tag: "Vị trí vàng", target: "location" },
                  { icon: Home, title: "Nhà Bàn Giao Hoàn Thiện 100%", desc: "Thiết kế tân cổ điển 1 trệt + 1 lửng + 2 lầu. Dọn vào ở ngay sau bàn giao, không phát sinh chi phí thêm.", tag: "Tiết kiệm chi phí", target: "products" },
                  { icon: Shield, title: "Pháp Lý Sạch — An Tâm Sở Hữu", desc: "Chủ đầu tư Saigonres Group uy tín. Sổ hồng lâu dài từng căn, pháp lý minh bạch, dễ dàng giao dịch ngân hàng.", tag: "An toàn đầu tư", target: "progress" },
                ].map((item, i) => (
                  <button
                    key={i} type="button"
                    onClick={() => {
                      const el = document.getElementById(item.target)
                      if (!el) return
                      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: "smooth" })
                    }}
                    className="relative w-full text-left flex items-center gap-4 bg-[#F0F7FA] rounded-xl p-4 border border-[#D6EAF2] hover:border-[#005B7F]/30 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute left-0 inset-y-0 w-[3px] bg-[#005B7F] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 rounded-xl bg-[#D6EAF2] group-hover:bg-[#005B7F] flex items-center justify-center shrink-0 transition-colors">
                      <item.icon className="w-5 h-5 text-[#005B7F] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[#001E2E] font-bold text-sm font-sans uppercase tracking-tight">{item.title}</span>
                        <span className="text-[9px] bg-[#D6EAF2] text-[#005B7F] border border-[#005B7F]/15 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans shrink-0 group-hover:bg-[#005B7F]/10">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[#5B8FA8] text-xs leading-relaxed font-sans">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5B8FA8] group-hover:text-[#005B7F] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "50 căn", label: "Quy mô giới hạn" },
                  { value: "6,39 tỷ", label: "Giá mở bán từ" },
                  { value: "100%", label: "Bàn giao hoàn thiện" },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-[#D6EAF2] rounded-xl py-3.5 px-2 border border-[#B8D8E8]/80">
                    <p className="text-[#005B7F] text-xl md:text-2xl font-bold leading-none font-sans">{s.value}</p>
                    <p className="text-[#5B8FA8] text-[10px] font-bold uppercase tracking-wider mt-1 font-sans leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contact"
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-4 bg-[#005B7F] text-white font-bold rounded-xl shadow-[0_10px_24px_rgba(0,91,127,0.3)] hover:bg-[#004060] hover:-translate-y-1 transition-all uppercase tracking-widest text-sm font-sans">
                  Nhận báo giá & ưu đãi <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:0918139814"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#D6EAF2] hover:border-[#005B7F]/30 text-[#001E2E] font-bold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all text-sm font-sans shrink-0">
                  <Phone className="w-4 h-4 text-[#005B7F]" /> Gọi Ngay
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VỊ TRÍ ── */}
      <section id="location" className="py-20 md:py-32 bg-[#002E42] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#005B7F]/60 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#D4A843]/8 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#D4A843]" />
                <span className="text-[#D4A843] text-xs font-bold tracking-[0.2em] uppercase font-sans">Vị Trí Chiến Lược</span>
                <div className="h-px w-12 bg-[#D4A843]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
                Cửa Ngõ Tây Sài Gòn<br />Ngay Mặt Tiền Sông
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Tọa lạc mặt tiền đường Phú Định, Quận 8 — liền kề đại lộ Võ Văn Kiệt và bến thuyền Phú Định, kết nối nhanh chóng đến toàn bộ TP.HCM và hành lang kinh tế Long An.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
            <Reveal direction="left" className="lg:col-span-3">
              <div
                onClick={() => setZoomedImage({ src: "/pearl-riverside/vitriduan.jpg", alt: "Bản đồ vị trí Pearl Riverside Quận 8" })}
                className="relative rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in bg-white shadow-2xl"
                style={{ minHeight: '400px' }}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setZoomedImage({ src: "/pearl-riverside/vitriduan.jpg", alt: "Bản đồ vị trí" }) }}
              >
                <Image src="/pearl-riverside/vitriduan.jpg" alt="Bản đồ vị trí" fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#002E42]/15 transition-colors flex items-center justify-center">
                  <div className="bg-[#D4A843] text-[#002E42] p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-[0_0_40px_rgba(212,168,67,0.6)] scale-75 group-hover:scale-100">
                    <Maximize2 size={32} />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#002E42]/90 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-[#D6EAF2] pointer-events-none flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D6EAF2] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#005B7F]" />
                  </div>
                  <div>
                    <p className="text-[#001E2E] font-bold text-base font-sans">PEARL RIVERSIDE</p>
                    <p className="text-[#1A4A60] text-xs font-sans mt-0.5">Đường Phú Định, Phường Phú Định, Quận 8</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-2 flex flex-col justify-center space-y-5 md:space-y-6">
              {connections.map((item, idx) => (
                <Reveal key={item.title} direction="right" delay={idx * 0.1}>
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 hover:bg-white/10 hover:border-[#D4A843]/40 transition-all duration-300 group">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#D4A843]/15 flex items-center justify-center shrink-0 group-hover:bg-[#D4A843] transition-colors">
                        <item.icon className="w-6 h-6 text-[#D4A843] group-hover:text-[#002E42] transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base md:text-lg mb-2 font-sans leading-tight">{item.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed font-sans">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="up">
            <div className="bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-8 md:p-12 border border-white/10">
              <p className="text-[#D4A843] text-sm font-bold tracking-[0.2em] uppercase text-center mb-8 font-sans">Thời Gian Di Chuyển Từ Pearl Riverside</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {nearbyPlaces.map((place) => (
                  <div key={place.name}
                    className="text-center p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-[#005B7F] border border-white/10 hover:border-[#D4A843]/50 transition-all duration-300 group cursor-default">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">{place.time}</p>
                    <p className="text-white/70 text-xs md:text-sm font-medium group-hover:text-white leading-snug font-sans">{place.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MINI FORM ── */}
      <section className="py-12 bg-white border-y border-[#D6EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F0F7FA] rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#001E2E] mb-3 font-sans">Tải Trọn Bộ Tài Liệu Pearl Riverside</h3>
              <p className="text-[#1A4A60] font-sans">Nhận ngay mặt bằng chi tiết, chính sách bán hàng và bảng giá mới nhất qua Zalo/Email.</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <Input required placeholder="Họ tên của bạn" value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-white border-[#D6EAF2] h-14 sm:w-64 rounded-xl focus-visible:ring-[#005B7F]" />
              <Input required type="tel" placeholder="Số điện thoại" value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-white border-[#D6EAF2] h-14 sm:w-64 rounded-xl focus-visible:ring-[#005B7F]" />
              <Button type="submit" disabled={isSubmitting}
                className="h-14 px-8 bg-[#005B7F] hover:bg-[#004060] text-white rounded-xl font-bold uppercase tracking-wider transition-all whitespace-nowrap">
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"} <Download className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ── SẢN PHẨM ── */}
      <section id="products" className="py-20 md:py-32 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#005B7F]" />
                <span className="text-[#005B7F] text-xs font-bold tracking-[0.2em] uppercase font-sans">Sản Phẩm & Thiết Kế</span>
                <div className="h-px w-12 bg-[#005B7F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#001E2E] mb-6 leading-tight font-sans">
                Nhà Phố Ven Sông<br />Tân Cổ Điển Đẳng Cấp
              </h2>
              <p className="text-[#1A4A60] text-base md:text-lg font-sans">
                Pearl Riverside giới thiệu các dòng sản phẩm đá quý độc bản, mang lại giá trị an cư và đầu tư vượt trội bên dòng kênh xanh mát.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="flex overflow-x-auto hide-scroll w-full justify-start md:justify-center gap-3 px-1 mb-12 md:mb-16 snap-x pb-4">
              {productTypes.map((p) => (
                <button key={p.id} onClick={() => setSelectedProduct(p.id)}
                  className={cn(
                    "relative flex-shrink-0 px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans snap-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005B7F]",
                    selectedProduct === p.id
                      ? "bg-[#005B7F] text-white shadow-[0_8px_20px_rgba(0,91,127,0.3)] scale-105"
                      : "bg-white text-[#1A4A60] hover:bg-[#D6EAF2] border border-[#D6EAF2]"
                  )}>
                  {p.name}
                  {p.popular && <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-[#D4A843] text-[#002E42] px-2 py-0.5 rounded-full font-bold font-sans shadow-sm">Hot</span>}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mb-8">
              <p className="text-center text-[#5B8FA8] text-xs font-bold uppercase tracking-[0.2em] mb-4 font-sans">Phối Cảnh & Thiết Kế — {activeProduct.name}</p>
              <CoverflowCarousel items={activeProduct.gallery} imageFit="cover" showTextOutside={true} />
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-2xl shadow-black/5 border border-[#D6EAF2] relative overflow-hidden mb-16 mt-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6EAF2] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-70 pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                {activeProduct.popular && (
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#005B7F] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-8 shadow-md font-sans">
                    <Star className="w-4 h-4 fill-white" /> Sản phẩm được quan tâm nhiều nhất
                  </span>
                )}

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001E2E] mb-10 font-sans">{activeProduct.name}</h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10">
                  <div className="flex flex-col items-center">
                    <span className="text-[#5B8FA8] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Diện tích</span>
                    <span className="text-[#001E2E] text-2xl md:text-3xl font-bold font-sans">{activeProduct.area}</span>
                  </div>
                  <div className="w-full h-px md:w-px md:h-16 bg-[#D6EAF2] max-w-[200px]" />
                  <div className="flex flex-col items-center">
                    <span className="text-[#5B8FA8] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Giá bán</span>
                    <span className="text-[#005B7F] text-3xl md:text-5xl font-bold font-sans">{activeProduct.price}</span>
                  </div>
                </div>

                <div className="relative py-8 mb-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full border-t border-[#D6EAF2]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-8 text-[#1A4A60] italic text-lg md:text-xl font-medium font-sans text-center">
                      "{activeProduct.description}"
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                  {activeProduct.features.map((f) => (
                    <div key={f} className="flex flex-col items-center justify-center text-center bg-[#D6EAF2]/60 p-5 md:p-6 rounded-3xl border border-[#B8D8E8]/80 hover:bg-[#D6EAF2] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                        <Check className="w-5 h-5 text-[#005B7F]" />
                      </div>
                      <span className="text-[#001E2E] text-sm font-bold leading-snug font-sans">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a href="#contact"
                    onClick={() => setFormData(prev => ({ ...prev, product: activeProduct.id }))}
                    className="inline-flex items-center gap-3 bg-[#002E42] text-white font-bold text-sm uppercase tracking-widest px-10 py-5 md:py-6 rounded-full hover:bg-[#005B7F] transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(0,91,127,0.4)] hover:-translate-y-1 font-sans">
                    Đăng Ký Tư Vấn {activeProduct.name} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NHÀ MẪU ── */}
      <section id="showhouse" className="py-20 md:py-32 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#D4A843]" />
                <span className="text-[#D4A843] text-xs font-bold tracking-[0.2em] uppercase font-sans">Không Gian Sống Thực Tế</span>
                <div className="h-px w-12 bg-[#D4A843]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001E2E] mb-6 leading-tight font-sans">
                Khám Phá Nhà Mẫu Pearl Riverside
              </h2>
              <p className="text-[#1A4A60] text-base md:text-lg font-sans">
                Trải nghiệm không gian nội thất tinh tế qua 2 mẫu nhà điển hình, nơi hội tụ nghệ thuật sắp đặt và tối ưu công năng.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="flex justify-center gap-4 mb-12">
              {showhouseTypes.map((s) => (
                <button key={s.id} onClick={() => setSelectedShowhouse(s.id)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all font-sans",
                    selectedShowhouse === s.id
                      ? "bg-[#002E42] text-white shadow-lg"
                      : "bg-[#F0F7FA] text-[#1A4A60] hover:bg-[#D6EAF2]"
                  )}>
                  {s.name}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="bg-[#F0F7FA] rounded-[2.5rem] p-8 md:p-12 border border-[#D6EAF2]">
              <div className="grid lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-1 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#001E2E] font-sans">{activeShowhouse.name}</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#D6EAF2]">
                    <Maximize2 size={16} className="text-[#D4A843]" />
                    <span className="text-sm font-bold text-[#005B7F] font-sans">Diện tích: {activeShowhouse.area}</span>
                  </div>
                  <p className="text-[#1A4A60] leading-relaxed font-sans">{activeShowhouse.description}</p>
                  <Button asChild className="rounded-full px-8 bg-[#005B7F] hover:bg-[#002E42]">
                    <a href="#contact">Đăng ký tham quan thực tế</a>
                  </Button>
                </div>
                <div className="lg:col-span-2">
                  <CoverflowCarousel items={activeShowhouse.gallery} imageFit="cover" showTextOutside={true} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PHỐI CẢNH ── */}
      <section id="showroom" className="py-20 md:py-32 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" delay={0.3} className="pt-24 border-t border-[#D6EAF2]">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#005B7F]" />
                <span className="text-[#005B7F] text-xs font-bold tracking-[0.2em] uppercase font-sans">Không Gian Dự Án</span>
                <div className="h-px w-12 bg-[#005B7F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001E2E] mb-6 leading-tight font-sans">Phối Cảnh Pearl Riverside</h2>
              <p className="text-[#1A4A60] text-base md:text-lg leading-relaxed font-sans">
                Hình ảnh phối cảnh chính thức từ Saigonres Group — khu nhà phố thương mại 50 căn ven sông Phú Định, Quận 8, TP.HCM.
              </p>
            </div>
            <CoverflowCarousel items={showroomGallery} imageFit="cover" showTextOutside={true} />
          </Reveal>
        </div>
      </section>

      {/* ── TIỆN ÍCH ── */}
      <section id="amenities" className="py-20 md:py-32 bg-[#002E42] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#005B7F]/80 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[#D4A843]/8 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#D4A843]" />
                <span className="text-[#D4A843] text-xs font-bold tracking-[0.2em] uppercase font-sans">Hệ Sinh Thái Tiện Ích</span>
                <div className="h-px w-12 bg-[#D4A843]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
                Sống Xanh – Thoáng Đãng<br />Tiện Nghi Đầy Đủ
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Công viên cây xanh 5.954m², bến thuyền nội đô, hành lang ven sông, hạ tầng đồng bộ — chuẩn mực sống chất lượng cao giữa lòng khu Tây TP.HCM.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up">
            <div
              className="relative rounded-3xl overflow-hidden mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-[#002E42] cursor-zoom-in"
              onClick={() => setZoomedImage({ src: "/pearl-riverside/tongquan.jpg", alt: "Sơ đồ tiện ích nội khu — Pearl Riverside" })}
            >
              <Image src="/pearl-riverside/tongquan.jpg" alt="Tiện ích Pearl Riverside" width={1400} height={700}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/20 pointer-events-none">
                <div className="bg-[#D4A843]/90 text-[#002E42] p-5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  <Maximize2 size={32} />
                </div>
              </div>
            </div>
            <p className="text-center text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-20 font-sans">Sơ đồ tiện ích nội khu — Pearl Riverside Quận 8</p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mb-20">
              <p className="text-center text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 font-sans">Tiện ích nội & ngoại khu đẳng cấp</p>
              <CoverflowCarousel items={amenitiesGallery} imageFit="cover" isDark={true} showTextOutside={true} />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 mb-16">
            {highlightAmenities.map((item, idx) => (
              <Reveal key={item.label} direction="up" delay={idx * 0.05}>
                <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 text-center hover:bg-white/10 border border-white/10 hover:border-[#D4A843]/50 transition-all duration-300 hover:-translate-y-1.5 cursor-default">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-xl bg-[#D4A843]/10 group-hover:bg-[#D4A843] flex items-center justify-center mb-4 transition-colors">
                    <item.icon className="w-6 h-6 text-[#D4A843] group-hover:text-[#002E42] transition-colors" />
                  </div>
                  <p className="text-white/80 group-hover:text-white text-xs md:text-sm font-bold leading-snug font-sans">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {amenityCategories.map((cat, idx) => (
              <Reveal key={cat.title} direction="up" delay={idx * 0.1}>
                <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 h-full shadow-2xl hover:bg-white/10 transition-colors group">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#D4A843]/15 flex items-center justify-center mb-6 group-hover:bg-[#D4A843] transition-colors duration-300">
                    <cat.icon className="w-7 h-7 text-[#D4A843] group-hover:text-[#002E42] transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-6 font-sans">{cat.title}</h3>
                  <ul className="space-y-4">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/70 text-sm md:text-base group-hover:text-white/90 transition-colors font-sans">
                        <Check className="w-5 h-5 text-[#D4A843] shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK PROMO FORM ── */}
      <section className="relative py-20 bg-[#001520] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#005B7F]/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A843]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-gradient-to-r from-[#002E42] to-[#001520] border border-white/10 rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center max-w-5xl mx-auto">
            <div className="w-16 h-16 bg-[#D4A843]/20 rounded-full flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-[#D4A843]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans">Nhận Ưu Đãi Đặc Quyền Mở Bán</h3>
            <p className="text-white/70 text-lg mb-10 max-w-2xl font-sans">
              Dành riêng cho khách hàng đăng ký sớm — nhận bảng giá gốc từ Saigonres Group, chính sách thanh toán ưu đãi và tư vấn trực tiếp từ CĐT.
            </p>
            <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input required placeholder="Số điện thoại của bạn" value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-white/5 border-white/20 h-16 rounded-2xl text-white placeholder:text-white/30 focus-visible:ring-[#D4A843]" />
              <div className="relative">
                <select value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full h-16 rounded-2xl bg-white/5 border border-white/20 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#D4A843] appearance-none cursor-pointer">
                  <option value="" className="bg-[#002E42]">Chọn loại sản phẩm</option>
                  <option value="diamond" className="bg-[#002E42]">Diamond</option>
                  <option value="emerald" className="bg-[#002E42]">Emerald</option>
                  <option value="emerald-plus" className="bg-[#002E42]">Emerald+</option>
                  <option value="ruby" className="bg-[#002E42]">Ruby</option>
                  <option value="sapphire" className="bg-[#002E42]">Sapphire</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
              <Button type="submit" disabled={isSubmitting}
                className="h-16 bg-[#D4A843] hover:bg-[#b8953e] text-[#002E42] rounded-2xl font-bold text-lg uppercase tracking-widest transition-all">
                {isSubmitting ? "Đang xử lý..." : "Nhận Ưu Đãi Ngay"}
              </Button>
            </form>
            <p className="mt-6 text-white/40 text-sm font-sans flex items-center gap-2">
              <Clock className="w-4 h-4" /> Ưu đãi mở bán — số lượng giới hạn 50 căn
            </p>
          </div>
        </div>
      </section>

      {/* ── PHÁP LÝ & TIẾN ĐỘ ── */}
      <section id="progress" className="py-20 md:py-32 bg-[#D6EAF2] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#005B7F]" />
                <span className="text-[#005B7F] text-xs font-bold tracking-[0.2em] uppercase font-sans">Bảo Chứng Niềm Tin</span>
                <div className="h-px w-12 bg-[#005B7F]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#001E2E] mb-6 leading-tight font-sans">
                Pháp Lý & Tiến Độ
              </h2>
              <p className="text-[#1A4A60] text-base md:text-lg leading-relaxed font-sans">
                Saigonres Group — chủ đầu tư uy tín với hàng chục dự án đã bàn giao thành công tại TP.HCM. Cam kết pháp lý minh bạch, sổ hồng lâu dài, bàn giao đúng tiến độ.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <Home className="text-[#005B7F] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#001E2E] font-sans">Lộ Trình Triển Khai</h3>
                </div>
                <div className="relative pl-6 md:pl-10 space-y-0">
                  {milestones.map((m, idx) => (
                    <div key={m.id} className="relative pb-10 last:pb-0">
                      {idx < milestones.length - 1 && (
                        <div className="absolute left-[-27px] md:left-[-35px] top-6 bottom-0 w-1 bg-[#B8D8E8] rounded-full" />
                      )}
                      <div className={cn(
                        "absolute -left-[33px] md:-left-[41px] top-1 w-7 h-7 rounded-full border-4 border-[#D6EAF2] flex items-center justify-center z-10 shadow-sm",
                        m.status === "completed" ? "bg-[#005B7F]"
                          : m.status === "in-progress" ? "bg-[#D4A843] ring-4 ring-[#D4A843]/20"
                          : "bg-[#B8D8E8]"
                      )}>
                        {m.status === "in-progress" && <div className="w-2 h-2 rounded-full bg-white animate-ping" />}
                      </div>
                      <div className={cn(
                        "rounded-3xl p-6 md:p-8 border transition-all",
                        m.status === "in-progress" ? "bg-white border-[#D4A843]/40 shadow-xl scale-[1.02]"
                          : m.status === "completed" ? "bg-[#B8D8E8] border-[#005B7F]/20 shadow-sm"
                          : "bg-white border-[#D6EAF2] shadow-sm opacity-80"
                      )}>
                        <span className={cn(
                          "inline-block text-[11px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 font-sans",
                          m.status === "completed" ? "bg-[#005B7F]/15 text-[#005B7F]"
                            : m.status === "in-progress" ? "bg-[#D4A843]/20 text-[#7a5f00]"
                            : "bg-[#D6EAF2] text-[#5B8FA8]"
                        )}>{m.date}</span>
                        <h4 className="text-lg md:text-xl font-bold text-[#001E2E] mb-2 font-sans">{m.title}</h4>
                        <p className="text-[#1A4A60] text-sm md:text-base leading-relaxed font-sans">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8 md:space-y-10">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#D6EAF2]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#D6EAF2] rounded-2xl flex items-center justify-center shrink-0">
                      <Shield className="text-[#005B7F] w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#001E2E] font-sans">Hồ Sơ Pháp Lý</h3>
                  </div>
                  <ul className="space-y-4">
                    {legalDocuments.map((doc) => (
                      <li key={doc} className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[#D6EAF2] hover:bg-[#B8D8E8]/50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#005B7F]/20 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-[#005B7F]" />
                        </div>
                        <span className="text-[#001E2E] font-semibold text-sm md:text-base leading-relaxed font-sans">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative bg-[#002E42] rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#005B7F] rounded-full blur-[80px] opacity-80 pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#D4A843] rounded-full blur-[80px] opacity-20 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                        <BarChart2 className="text-[#D4A843] w-6 h-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-sans">Chính Sách Tài Chính</h3>
                    </div>
                    <div className="space-y-5">
                      {[
                        { rate: "100tr", title: "Đặt cọc giữ chỗ", desc: "Chỉ 100 triệu đồng để đặt cọc và giữ chỗ chọn căn ưng ý. Thanh toán linh hoạt theo tiến độ bàn giao thực tế." },
                        { rate: "70%", title: "Hỗ trợ vay ngân hàng", desc: "Kết nối các ngân hàng uy tín, hỗ trợ vay lên đến 70% giá trị căn nhà với lãi suất ưu đãi và thủ tục nhanh chóng." },
                      ].map((item) => (
                        <div key={item.rate} className="flex items-center gap-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                            <span className="text-sm md:text-base font-bold text-[#D4A843] font-sans text-center leading-tight px-1">{item.rate}</span>
                          </div>
                          <div>
                            <p className="text-white font-bold text-base md:text-lg mb-1.5 font-sans">{item.title}</p>
                            <p className="text-white/70 text-sm leading-relaxed font-sans">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── LIÊN HỆ (MAIN FORM) ── */}
      <section id="contact" className="py-20 md:py-32 bg-[#D6EAF2] border-t border-[#B8D8E8] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#005B7F]/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-[#005B7F]" />
                  <span className="text-[#005B7F] text-xs font-bold tracking-[0.2em] uppercase font-sans">Liên Hệ Ngay Hôm Nay</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#001E2E] mb-6 leading-tight font-sans">
                  Đặt Cọc Ngay —<br />Chọn Căn Đẹp Nhất.
                </h2>
                <p className="text-[#1A4A60] text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-sans max-w-lg">
                  Đăng ký để nhận trọn bộ tài liệu, mặt bằng chi tiết và bảng giá ưu đãi trực tiếp từ Saigonres Group — Hotline: <strong className="text-[#005B7F]">0918.139.814</strong>.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Hotline CSKH 24/7", value: "0986.51.4242", href: "tel:0986514242", isLarge: true },
                    { icon: Mail, label: "Email Hỗ Trợ", value: "Ngocdiachinh34@gmail.com", href: "mailto:Ngocdiachinh34@gmail.com", isLarge: false },
                  ].map((c) => (
                    <a key={c.label} href={c.href}
                      className="flex items-center gap-5 bg-white p-6 rounded-3xl border border-[#D6EAF2] hover:border-[#005B7F]/40 hover:shadow-xl transition-all duration-300 group outline-none focus:ring-2 focus:ring-[#005B7F]">
                      <div className="w-14 h-14 bg-[#D6EAF2] group-hover:bg-[#005B7F] rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm">
                        <c.icon className="w-6 h-6 text-[#005B7F] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[#5B8FA8] text-xs font-bold uppercase tracking-widest mb-1 font-sans">{c.label}</p>
                        <p className={cn("font-bold text-[#001E2E] group-hover:text-[#005B7F] transition-colors font-sans", c.isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>
                          {c.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Sales Gallery address */}
                <div className="mt-6 bg-white rounded-2xl p-6 border border-[#D6EAF2]">
                  <p className="text-[#5B8FA8] text-xs font-bold uppercase tracking-widest mb-2 font-sans">Địa Chỉ Dự Án</p>
                  <p className="text-[#001E2E] font-bold text-base font-sans">Đường Phú Định, Phường Phú Định, Quận 8, TP. Hồ Chí Minh</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-2xl border border-[#D6EAF2]">
                <h3 className="text-2xl md:text-3xl font-bold text-[#001E2E] mb-8 md:mb-10 text-center font-sans">Đăng Ký Tư Vấn</h3>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#005B7F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 md:w-12 md:h-12 text-[#005B7F]" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#001E2E] mb-3 font-sans">Đăng Ký Thành Công!</h4>
                    <p className="text-[#1A4A60] text-base mb-8 leading-relaxed font-sans">Chuyên viên tư vấn Pearl Riverside sẽ liên hệ với quý khách trong thời gian sớm nhất.</p>
                    <button onClick={() => setIsSubmitted(false)} className="text-[#005B7F] font-bold text-base underline underline-offset-4 hover:text-[#004060] transition-colors font-sans">
                      Đăng ký thêm thông tin khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                    <div>
                      <label className="block text-xs font-bold text-[#1A4A60] uppercase tracking-widest mb-2.5">Họ và tên <span className="text-[#005B7F]">*</span></label>
                      <Input required placeholder="Nhập họ và tên của bạn..."
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#F0F7FA] border-transparent py-6 focus-visible:ring-[#005B7F] focus-visible:ring-2 placeholder:text-[#8BBDD6] rounded-xl" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#1A4A60] uppercase tracking-widest mb-2.5">Điện thoại <span className="text-[#005B7F]">*</span></label>
                        <Input required type="tel" placeholder="09xx..."
                          value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-[#F0F7FA] border-transparent py-6 focus-visible:ring-[#005B7F] focus-visible:ring-2 placeholder:text-[#8BBDD6] rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1A4A60] uppercase tracking-widest mb-2.5">Sản phẩm quan tâm</label>
                        <div className="relative">
                          <select value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                            className="w-full h-[50px] rounded-xl bg-[#F0F7FA] border-0 px-4 text-[#001E2E] focus:outline-none focus:ring-2 focus:ring-[#005B7F] appearance-none cursor-pointer">
                            <option value="">Chọn loại sản phẩm...</option>
                            <option value="diamond">Diamond</option>
                            <option value="emerald">Emerald</option>
                            <option value="emerald-plus">Emerald+</option>
                            <option value="ruby">Ruby</option>
                            <option value="sapphire">Sapphire</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B8FA8] pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A4A60] uppercase tracking-widest mb-2.5">Email <span className="text-[#5B8FA8] normal-case font-normal">(Tùy chọn)</span></label>
                      <Input type="email" placeholder="Để nhận tài liệu qua email..."
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#F0F7FA] border-transparent py-6 focus-visible:ring-[#005B7F] focus-visible:ring-2 placeholder:text-[#8BBDD6] rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A4A60] uppercase tracking-widest mb-2.5">Ghi chú thêm</label>
                      <textarea rows={3} placeholder="Bạn cần tư vấn vấn đề gì..."
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border-0 bg-[#F0F7FA] px-4 py-4 text-sm md:text-base text-[#001E2E] placeholder:text-[#8BBDD6] focus:outline-none focus:ring-2 focus:ring-[#005B7F] resize-none" />
                    </div>
                    <button type="submit" disabled={isSubmitting}
                      className={cn(
                        "w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005B7F]",
                        isSubmitting
                          ? "bg-[#005B7F]/50 cursor-not-allowed"
                          : "bg-[#005B7F] hover:bg-[#004060] shadow-[0_10px_30px_rgba(0,91,127,0.3)] hover:shadow-[0_15px_40px_rgba(0,91,127,0.4)] hover:-translate-y-1"
                      )}>
                      {isSubmitting
                        ? <><span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> Đang gửi...</>
                        : <><Send size={18} /> Nhận Thông Tin Ngay</>
                      }
                    </button>
                    <p className="text-center text-xs text-[#5B8FA8] mt-4 font-sans flex items-center justify-center gap-1.5">
                      <Shield size={12} /> Thông tin của bạn được bảo mật tuyệt đối.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
      <PhoneButton />
      <ZaloButton />

      {/* ── Modal Phóng To Ảnh ── */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] bg-[#002E42]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-[#D4A843] text-white hover:text-[#002E42] rounded-full p-3 transition-colors z-50 shadow-lg"
            onClick={(e) => { e.stopPropagation(); setZoomedImage(null) }}
          ><X size={28} /></button>
          <div
            className="relative w-full max-w-6xl max-h-[85vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 bg-transparent flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={zoomedImage.src} alt={zoomedImage.alt} className="max-w-full max-h-[85vh] object-contain rounded-xl" />
          </div>
          <p className="absolute bottom-6 md:bottom-10 text-white/80 text-sm font-bold font-sans tracking-widest uppercase text-center px-4 pointer-events-none drop-shadow-md">
            {zoomedImage.alt}
          </p>
        </div>
      )}
    </main>
  )
}