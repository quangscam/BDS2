'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

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
  Film, Stethoscope, Download, Gift
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
function CoverflowCarousel({ items, imageFit = "cover", isDark = false, showTextOutside = false }: { items: any[], imageFit?: "cover" | "contain", isDark?: boolean, showTextOutside?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightbox, setLightbox] = useState<{src: string, title: string} | null>(null)

  const displayItems = items.length < 5 ? [...items, ...items, ...items].slice(0, Math.max(5, items.length * 3)) : items
  const length = displayItems.length

  const next = () => setCurrentIndex((prev) => (prev + 1) % length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + length) % length)

  useEffect(() => {
    setCurrentIndex(0)
  }, [items])

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [lightbox])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  return (
    <>
      <div className={cn("relative w-full flex flex-col items-center justify-center overflow-hidden py-10 group/carousel", 
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

            if (isCenter) {
              transformStr = `translateX(0) scale(1)`
              opacity = 1
              zIndex = 30
            } else if (isLeft) {
              transformStr = `translateX(-55%) scale(0.85)`
              opacity = 0.6
              zIndex = 20
            } else if (isRight) {
              transformStr = `translateX(55%) scale(0.85)`
              opacity = 0.6
              zIndex = 20
            } else if (diff < -1) {
              transformStr = `translateX(-90%) scale(0.65)`
              opacity = 0
              zIndex = 10
            } else if (diff > 1) {
              transformStr = `translateX(90%) scale(0.65)`
              opacity = 0
              zIndex = 10
            }

            return (
              <div
                key={`${idx}-${item.title}`}
                onClick={() => {
                  if (isLeft) prev()
                  if (isRight) next()
                }}
                className={cn(
                  "absolute top-0 bottom-0 my-auto w-[85%] md:w-[70%] lg:w-[900px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col",
                  !isCenter && "cursor-pointer hover:opacity-100",
                  isDark ? "bg-black/20 border border-white/10" : "bg-white border border-[#D4C4B0]",
                  showTextOutside ? "h-[85%]" : "h-[100%]"
                )}
                style={{ transform: transformStr, opacity, zIndex }}
              >
                <div
                  className="relative w-full flex-grow group bg-white"
                  onClick={(e) => {
                    if (isCenter) {
                      e.stopPropagation()
                      setLightbox({ src: item.src, title: item.title })
                    }
                  }}
                  style={isCenter ? { cursor: 'zoom-in' } : {}}
                >
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    className={cn(
                      "transition-transform duration-700",
                      isCenter && "group-hover:scale-[1.02]",
                      imageFit === "contain" ? "object-contain p-4 mix-blend-multiply" : "object-cover"
                    )} 
                  />
                  
                  {imageFit === "cover" && !showTextOutside && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A120A]/90 via-transparent to-transparent pointer-events-none" />
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
                        isDark ? "bg-white/15 backdrop-blur-md text-white border border-white/20" : "bg-white text-[#2E7D32] border border-[#D4C4B0]"
                      )}>
                        {item.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {showTextOutside && (
          <div className="absolute bottom-2 left-0 right-0 text-center z-40 transition-opacity duration-300 px-4">
            <p className={cn(
              "inline-block font-bold text-xs sm:text-sm md:text-base px-6 py-2.5 rounded-full shadow-md font-sans max-w-full truncate",
              isDark ? "bg-black/60 backdrop-blur-sm text-white border border-white/20" : "bg-white text-[#2E7D32] border border-[#D4C4B0]"
            )}>
              {displayItems[currentIndex]?.title}
            </p>
          </div>
        )}

        <button onClick={prev} className={cn("absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#2E7D32]" : "bg-white/90 backdrop-blur shadow-lg border border-[#D4E8D0] text-[#1A2E1A] hover:bg-[#2E7D32] hover:text-white")}>
          <ArrowLeft size={20} />
        </button>
        <button onClick={next} className={cn("absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#2E7D32]" : "bg-white/90 backdrop-blur shadow-lg border border-[#D4E8D0] text-[#1A2E1A] hover:bg-[#2E7D32] hover:text-white")}>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-[#2E7D32] text-white rounded-full p-3 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
            aria-label="Đóng ảnh"
          >
            <X size={26} />
          </button>

          <div
            className="relative w-full max-w-5xl flex flex-col items-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '82vh',
                objectFit: 'contain',
                borderRadius: '1rem',
              }}
            />
            <p className="text-white/80 text-sm font-bold mt-5 font-sans tracking-widest uppercase text-center px-4">
              {lightbox.title}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Data ─── */
const navLinks = [
  { href: "#overview", label: "Tổng Quan" },
  { href: "#cta", label: "Đặc Quyền Sở Hữu" },
  { href: "#location", label: "Vị Trí" },
  { href: "#products", label: "Sản Phẩm" },
  { href: "#showroom", label: "Nhà Mẫu" },
  { href: "#amenities", label: "Tiện ÍCH" },
]

const features = []

const connections = [
  { icon: Car, title: "Nguyễn Lương Bằng — Trục Tài Chính Tỷ Đô", description: "Tuyến đường rộng 48m, 6 làn xe thông suốt, là trục thương mại - tài chính sầm uất nhất khu Nam, nối thẳng Phú Mỹ Hưng." },
  { icon: Building, title: "Đường 15B & Cầu Phú Mỹ 2 — Kết Nối Liên Vùng", description: "Tuyến đường 15B kết nối trực tiếp từ Nguyễn Lương Bằng xuống Nhà Bè và Cần Giờ, đang đẩy nhanh tiến độ hoàn thiện." },
  { icon: Clock, title: "Metro & Hạ Tầng Trọng Điểm", description: "Ga Tân Mỹ (tuyến Metro) đang thi công tấp nập — cú hích hạ tầng lớn nâng tầm giá trị bất động sản khu Nam." },
]

const nearbyPlaces = [
  { name: "Crescent Mall Q7", time: "5 phút" },
  { name: "BV FV Quốc Tế", time: "7 phút" },
  { name: "Đại học RMIT", time: "10 phút" },
  { name: "Trung tâm TP.HCM", time: "15 phút" },
  { name: "Sân bay TSN", time: "25 phút" },
  { name: "KĐT Phú Mỹ Hưng", time: "2 phút" },
]

const productTypes = [
  {
    id: "2pn", name: "2 Phòng Ngủ", area: "~65–73m²", price: "Từ 65 triệu/m²",
    description: "Lý tưởng cho cặp đôi và gia đình nhỏ hiện đại",
    features: ["100% có logia riêng", "Cửa sổ mọi phòng ngủ", "Nội thất máy lọc khí Ozon", "View thoáng, cửa chống cháy"],
    popular: true,
    gallery: [
      { src: "/the-peak-garden/the-peak-garden-65m2.jpg", title: "Mặt Bằng 65m² (2PN)" },
      { src: "/the-peak-garden/the-peak-garden-66m2.jpg", title: "Mặt Bằng 66m² (2PN)" },
      { src: "/the-peak-garden/the-peak-garden-67m2.jpg", title: "Mặt Bằng 67m² (2PN)" },
      { src: "/the-peak-garden/the-peak-garden-70m2.jpg", title: "Mặt Bằng 70m² (2PN)" },
      { src: "/the-peak-garden/the-peak-garden-73m2.jpg", title: "Mặt Bằng 73m² (2PN)" },
    ]
  },
  {
    id: "3pn", name: "3 Phòng Ngủ", area: "~85–101m²", price: "Từ 75 triệu/m²",
    description: "Không gian rộng rãi cho gia đình đa thế hệ",
    features: ["3 phòng ngủ đón gió tự nhiên", "Logia rộng panorama", "Hệ thống cửa lõi thép chống cháy", "Full nội thất máy lọc khí"],
    popular: false,
    gallery: [
      { src: "/the-peak-garden/the-peak-garden-94m2.jpg", title: "Mặt Bằng 94m² (3PN)" },
      { src: "/the-peak-garden/the-peak-garden-100m2.jpg", title: "Mặt Bằng 100m² (3PN)" },
    ]
  },
  {
    id: "duplex", name: "Duplex", area: "~101–181m²", price: "Liên hệ CĐT",
    description: "Biệt thự trên không — đẳng cấp thượng lưu đích thực",
    features: ["Thiết kế 2 tầng thông suốt", "Diện tích sử dụng tối đa", "Tầm nhìn panorama toàn cảnh", "Sở hữu lâu dài, đặc quyền"],
    popular: false,
    gallery: [
      { src: "/the-peak-garden/DA3.jpg", title: "Mặt Bằng Duplex DA3" },
      { src: "/the-peak-garden/DA4.jpg", title: "Mặt Bằng Duplex DA4" },
      { src: "/the-peak-garden/DB1.jpg", title: "Mặt Bằng Duplex DB1" },
      { src: "/the-peak-garden/DB2A.jpg", title: "Mặt Bằng Duplex DB2A" },
      { src: "/the-peak-garden/DB2B.jpg", title: "Mặt Bằng Duplex DB2B" },
      { src: "/the-peak-garden/DB2C.jpg", title: "Mặt Bằng Duplex DB2C" },
      { src: "/the-peak-garden/DB3A.jpg", title: "Mặt Bằng Duplex DB3A" },
    ]
  },
]

const showroomGallery = [
  { src: "/the-peak-garden/TIEN-ICH-TANG-5.jpg", title: "Không gian tiện ích tầng 5" },
  { src: "/the-peak-garden/TIEN-ICH-TANG-1.jpg", title: "Sảnh đón tiện ích tầng 1" },
  { src: "/the-peak-garden/TPG - Mat bang tang 5.jpg", title: "Mặt bằng tầng 5 — khu tiện ích" },
  { src: "/the-peak-garden/TPG - Mat bang tang 6-24.jpg", title: "Thiết kế căn hộ tầng điển hình" },
  { src: "/the-peak-garden/TPG - Mat bang tang 25.jpg", title: "Căn hộ đặc biệt tầng 25" },
  { src: "/the-peak-garden/TPG - Mat bang tang 26.jpg", title: "Căn hộ penthouse tầng 26" },
]

const floorPlans = [
  { src: "/the-peak-garden/TPG - Mat bang tang 1.jpg", title: "Tầng 1 — Shophouse" },
  { src: "/the-peak-garden/TPG - Mat bang tang 2.jpg", title: "Tầng 2 — Officetel" },
  { src: "/the-peak-garden/TPG - Mat bang tang 3.jpg", title: "Tầng 3 — Officetel" },
  { src: "/the-peak-garden/TPG - Mat bang tang 4.jpg", title: "Tầng 4 — Officetel" },
  { src: "/the-peak-garden/TPG - Mat bang tang 5.jpg", title: "Tầng 5 — Tiện Ích" },
  { src: "/the-peak-garden/TPG - Mat bang tang 6-24.jpg", title: "Tầng 6–24 — Căn hộ" },
  { src: "/the-peak-garden/TPG - Mat bang tang 25.jpg", title: "Tầng 25 — Căn hộ đặc biệt" },
  { src: "/the-peak-garden/TPG - Mat bang tang 26.jpg", title: "Tầng 26 — Penthouse / Duplex" },
  { src: "/the-peak-garden/TPG - Mat bang tang 27.jpg", title: "Tầng 27 — Sky Penthouse" },
]

const amenitiesGallery = [
  { src: "/the-peak-garden/01%20-%20H%E1%BB%92%20B%C6%A0I%20SKY%20VIEW.jpg", title: "01 - HỒ BƠI SKY VIEW" },
  { src: "/the-peak-garden/02%20-%20C%C3%94NG%20VI%C3%8AN%20LUNA%20PARK%20H%C6%A0N%206000%20M2%20.jpg", title: "02 - CÔNG VIÊN LUNA PARK" },
  { src: "/the-peak-garden/hothienduong.jpg", title: "03 - HỒ THIÊN ĐƯỜNG" },
  { src: "/the-peak-garden/vuontreothacnuoc.jpg", title: "04 - VƯỜN TREO THÁC NƯỚC" },
  { src: "/the-peak-garden/05%20-%20H%E1%BB%92%20T%E1%BA%AEM%20KHO%C3%81NG%20N%C3%93NG%20ONSEN.jpg", title: "05 - HỒ TẮM KHOÁNG ONSEN" },
  { src: "/the-peak-garden/06%20-%20SPA%20_%20SAUNA.jpg", title: "06 - SPA & SAUNA" },
  { src: "/the-peak-garden/07%20-%20DETOX%20_%20ORGANIC%20SHOP.jpg", title: "07 - DETOX ORGANIC SHOP" },
  { src: "/the-peak-garden/denkhutrung.jpg", title: "08 - ĐÈN BÀN KHỬ TRÙNG UV-C" },
  { src: "/the-peak-garden/09%20-%20SMARTHOME.jpg", title: "09 - SMARTHOME" },
  { src: "/the-peak-garden/10%20-%20AN%20NINH%206%20L%E1%BB%9AP.jpg", title: "10 - AN NINH 6 LỚP" },
  { src: "/the-peak-garden/11%20-%20BBQ%20GARDEN.jpg", title: "11 - BBQ GARDEN" },
  { src: "/the-peak-garden/choinghi.jpg", title: "12 - CHÒI NGHỈ" },
  { src: "/the-peak-garden/13%20-%20%C4%90%C6%AF%E1%BB%9CNG%20C%E1%BA%A6U%20V%E1%BB%92NG.jpg", title: "13 - ĐƯỜNG CẦU VỒNG" },
  { src: "/the-peak-garden/14%20-%20%C4%90%C6%AF%E1%BB%9CNG%20D%E1%BA%A0O%20B%E1%BB%98%20TR%C3%8AN%20M%C3%82Y.jpg", title: "14 - ĐƯỜNG DẠO BỘ TRÊN MÂY" },
  { src: "/the-peak-garden/15%20-%20V%C6%AF%E1%BB%9CN%20%C3%81NH%20S%C3%81NG.jpg", title: "15 - VƯỜN ÁNH SÁNG" },
  { src: "/the-peak-garden/16%20-%20H%E1%BB%92%20TH%C6%AF%20GI%C3%83N%20JACUZZI.jpg", title: "16 - HỒ JACUZZI" },
  { src: "/the-peak-garden/17%20-%20KHU%20TH%E1%BB%82%20THAO%20NGO%C3%80I%20TR%E1%BB%9CI.jpg", title: "17 - THỂ THAO NGOÀI TRỜI" },
  { src: "/the-peak-garden/hoboitreem.jpg", title: "18 - HỒ BƠI TRẺ EM" },
  { src: "/the-peak-garden/19%20-%20L%E1%BB%90I%20D%E1%BA%A0O%20B%E1%BB%98.jpg", title: "19 - LỐI DẠO BỘ" },
]

const highlightAmenities = [
  { icon: Waves, label: "Hồ bơi Sky View" }, { icon: Trees, label: "Vườn nhiệt đới" },
  { icon: Baby, label: "Khu vui chơi" }, { icon: Dumbbell, label: "Phòng Gym" },
  { icon: Film, label: "Khu giải trí" }, { icon: Sparkles, label: "Spa & Detox" },
  { icon: ShoppingBag, label: "TTTM ngoài" }, { icon: Coffee, label: "Café" },
  { icon: Stethoscope, label: "Lọc khí Ozon" }, { icon: GraduationCap, label: "Trường học" },
  { icon: Waves, label: "Hồ Thiên Nga" }, { icon: Shield, label: "An ninh 24/7" },
]

const amenityCategories = [
  { title: "Sức Khỏe & Thư Giãn", icon: Leaf, items: ["Hồ bơi Sky View tầng 5", "Vườn nhiệt đới 11.000m²", "Hồ Thiên Nga 10.000m³", "Spa Detox & Làm đẹp"] },
  { title: "Thể Thao & Vận Động", icon: Dumbbell, items: ["Phòng Gym tiêu chuẩn", "Đường dạo bộ nội khu", "Khu yoga ngoài trời", "39 tiện ích quanh hồ"] },
  { title: "Giáo Dục & Y Tế", icon: GraduationCap, items: ["Máy lọc khí Ozon mỗi căn", "Đèn sưởi hồng ngoại", "Gần RMIT, ĐH Tôn Đức Thắng", "Bệnh viện FV 7 phút"] },
  { title: "Đặc Quyền Cư Dân", icon: Sparkles, items: ["Sảnh đón khách cao cấp", "Camera an ninh 24/7", "Cửa lõi thép chống cháy", "Hầm đỗ xe rộng rãi"] },
]

const milestones = [
  { id: 1, title: "Hoàn Thiện Pháp Lý", date: "Hoàn thành", description: "100% hồ sơ pháp lý hoàn chỉnh: quy hoạch 1/500, quyết định giao đất, giấy phép xây dựng, đã ký HĐMB." },
  { id: 2, title: "Thi Công Tầng 9–10", date: "Tháng 4/2026 — Đang thi công", description: "Hoàn thành bê tông dầm sàn tầng 9, hoàn tất thép cột vách từ tầng 9 lên tầng 10. Hồ bơi Sky View bước vào giao đoạn thi công phần thô.", status: "in-progress" },
  { id: 3, title: "Thi Công Thân Tháp", date: "Sắp Tới", description: "Đẩy nhanh các tầng tiếp theo, thi công song song hệ thống cơ điện (M&E) và hoàn thiện khu tiện ích nội khu." },
  { id: 4, title: "Bàn Giao Cư Dân", date: "Dự kiến 2026–2027", description: "Cam kết bàn giao căn hộ hoàn thiện theo đúng tiêu chuẩn chăm sóc sức khỏe — vật liệu an toàn, nội thất cao cấp." },
]

const legalDocuments = [
  "Phê duyệt quy hoạch chi tiết tổng mặt bằng tỷ lệ 1/500",
  "Quyết định giao đất từ cơ quan nhà nước có thẩm quyền",
  "Giấy phép xây dựng hợp lệ đã được cấp",
  "Sổ hồng sở hữu lâu dài (Người Việt Nam)",
]

/* ─── Main Component ─── */
export default function ThePeakGardenLandingPage() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("2pn")
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    product: "", 
    message: "", 
    subject: "Đăng ký tư vấn dự án The Peak Garden" 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const [zoomedImage, setZoomedImage] = useState<{src: string, alt: string} | null>(null)

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50) }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsHeroLoaded(true)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e: Event) {
        e.preventDefault()
        const targetId = (this as HTMLAnchorElement).getAttribute('href')
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
    if (zoomedImage) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = 'unset' }
    return () => { document.body.style.overflow = 'unset' }
  }, [zoomedImage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', product: '', message: '', subject: 'Đăng ký tư vấn dự án The Peak Garden' })
          setIsSubmitted(false)
        }, 4000)
      } else { alert("Có lỗi: " + (result.error || "Vui lòng thử lại!")) }
    } catch (error) { alert("Lỗi kết nối. Không thể đăng ký lúc này.") }
    finally { setIsSubmitting(false) }
  }

  const activeProduct = productTypes.find(p => p.id === selectedProduct) || productTypes[0]

  return (
    <main className="min-h-screen bg-[#F4F7F0] overflow-x-hidden selection:bg-[#2E7D32] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ── Header & Nav ── */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-[#D4E8D0]/60" : "bg-transparent"
      )}>
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-10 py-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-xs lg:text-sm font-bold text-[#3D5A3E] hover:text-[#2E7D32] tracking-[0.1em] uppercase transition-colors relative group font-sans">
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#2E7D32] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a href="#contact"
                className="ml-4 text-xs font-bold bg-[#2E7D32] text-white px-6 py-3 rounded-full tracking-[0.1em] uppercase hover:bg-[#1B5E20] transition-all shadow-md hover:shadow-xl hover:shadow-[#2E7D32]/30 hover:-translate-y-0.5 font-sans">
                Nhận Bảng Giá
              </a>
            </nav>

            <div className="md:hidden flex items-center justify-between py-3">
              <span className="text-[#1B5E20] font-bold text-base tracking-wider font-sans">THE PEAK GARDEN</span>
              <div className="flex items-center gap-3">
                <a href="#contact" className="text-xs font-bold bg-[#2E7D32] text-white px-5 py-2.5 rounded-full tracking-wider uppercase font-sans shadow-sm">
                  Đăng Ký
                </a>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#E8F0E8] hover:bg-[#D4E8D0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E7D32]">
                  <span className={cn("w-5 h-0.5 bg-[#1B5E20] transition-all duration-300", mobileMenuOpen && "rotate-45 translate-y-2")} />
                  <span className={cn("w-5 h-0.5 bg-[#1B5E20] transition-all duration-300", mobileMenuOpen && "opacity-0")} />
                  <span className={cn("w-5 h-0.5 bg-[#1B5E20] transition-all duration-300", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-[#D4E8D0] shadow-lg py-2 px-4 flex flex-col z-50">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="block py-3.5 px-2 text-sm font-bold text-[#3D5A3E] hover:text-[#2E7D32] hover:bg-[#E8F0E8]/50 rounded-lg tracking-wider uppercase font-sans transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex items-end pb-12 md:pb-24 justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image src="/the-peak-garden/banner-main-type2.jpg" alt="Tổng quan The Peak Garden" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F0D] via-[#0D1F0D]/60 to-[#0D1F0D]/20" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A951] to-transparent z-10" />

        <div className={cn("relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-1000", isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex items-center gap-2 border border-[#C8A951]/50 rounded-full px-5 py-2.5 bg-[#C8A951]/10 backdrop-blur-md">
              <Star className="w-3 h-3 text-[#C8A951] fill-[#C8A951]" />
              <span className="text-[#C8A951] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase font-sans">Detox & Healthy Living — Sống Cân Bằng</span>
              <Star className="w-3 h-3 text-[#C8A951] fill-[#C8A951]" />
            </div>
          </div>
          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-none font-sans drop-shadow-lg">
            THE PEAK<br className="sm:hidden" /> <span className="text-[#C8A951]">GARDEN</span>
          </h1>
          <p className="text-center text-white/90 text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-4 md:mb-5 font-medium font-sans">Căn hộ liền kề Phú Mỹ Hưng & sắc đẹp tại trung tâm Nam Sài Gòn</p>
          <div className="flex items-center justify-center gap-2 mb-8 md:mb-12">
            <MapPin size={16} className="text-[#4CAF50] shrink-0" />
            <p className="text-white/70 text-sm sm:text-base font-sans">15B Nguyễn Lương Bằng, Phường Phú Mỹ, Quận 7, TP.HCM</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 md:mb-14">
            {[
              { value: "26", unit: "tầng", label: "Mỗi Block" },
              { value: "900+", unit: "căn", label: "Căn hộ" },
              { value: "39", unit: "tiện ích", label: "Quanh hồ Thiên Nga" },
              { value: "600 tỷ", unit: "", label: "Đầu tư tiện ích" },
            ].map((stat) => (
              <div key={stat.label} className="relative text-center bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 overflow-hidden group hover:bg-white/10 hover:border-[#C8A951]/40 transition-all duration-300">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C8A951] leading-none mb-1 font-sans drop-shadow-sm">{stat.value}</p>
                {stat.unit && <p className="text-white/60 text-[11px] uppercase tracking-widest font-sans">{stat.unit}</p>}
                <p className="text-white/80 text-xs md:text-sm uppercase tracking-wider font-bold mt-2 font-sans">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all hover:shadow-[0_8px_30px_rgb(46,125,50,0.4)] hover:-translate-y-1 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1F0D] focus:ring-[#2E7D32]">
              Đăng Ký Nhận Bảng Giá <ArrowRight size={18} />
            </a>
            <a href="#overview" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all backdrop-blur-sm font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1F0D] focus:ring-white/50">
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

      {/* TỔNG QUAN DỰ ÁN */}
      <section id="overview" className="py-20 md:py-32 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#2E7D32]" />
                <span className="text-[#2E7D32] text-xs font-bold tracking-[0.2em] uppercase font-sans">Tổng Quan Dự Án</span>
                <div className="h-px w-12 bg-[#2E7D32]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2E1A] mb-6 leading-tight font-sans">Sống Xanh, Sống Khỏe</h2>
              <p className="text-[#3D5A3E] text-base md:text-lg leading-relaxed font-sans">The Peak Garden là tổ hợp căn hộ cao cấp tiên phong theo dòng Detox & Healthy Living — lần đầu tiên xuất hiện tại khu Nam Sài Gòn, do Hưng Lộc Phát Corp phát triển.</p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">
            <Reveal direction="left">
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4E8D0] group cursor-zoom-in"
                onClick={() => setZoomedImage({ src: "/the-peak-garden/tongquanduanthepeak.jpg", alt: "Phối cảnh tổng thể The Peak Garden" })}
              >
                <div className="relative aspect-[4/3]">
                  <Image 
                    src="/the-peak-garden/tongquanduanthepeak.jpg" 
                    alt="Phối cảnh tổng thể The Peak Garden" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F0D]/90 via-[#0D1F0D]/30 to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 pointer-events-none">
                    <div className="bg-[#2E7D32]/90 backdrop-blur-sm text-white p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 size={24} />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none z-10">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 font-sans">Thiên đường sức khỏe giữa lòng Quận 7</h3>
                  <p className="text-white/80 text-sm md:text-base font-sans">11.000m² cây xanh & hồ điều hòa — lá phổi xanh giữa đô thị.</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-2 gap-6 md:gap-8">
                  {[
                    { label: "Chủ đầu tư", value: "Hưng Lộc Phát Corp" },
                    { label: "Tổng thầu", value: "Hòa Bình Group" },
                    { label: "Quy mô", value: "5,2 ha — 2 Block" },
                    { label: "Vị trí", value: "15B Nguyễn Lương Bằng, Q7" },
                  ].map((item) => (
                    <div key={item.label} className="border-l-[3px] border-[#2E7D32] pl-5 py-1">
                      <p className="text-[#6B8C6B] text-xs font-bold uppercase tracking-widest mb-1.5 font-sans">{item.label}</p>
                      <p className="text-[#1A2E1A] font-bold text-base md:text-lg leading-snug font-sans">{item.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-[#E8F0E8] to-[#F0F7F0] rounded-3xl p-8 md:p-10 border border-[#D4E8D0] shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold text-[#2E7D32] mb-6 font-sans">Cấu Trúc Dự Án</h3>
                  <ul className="space-y-5">
                    {[
                      { label: "2 Block A & B", desc: "Mỗi block cao 26 tầng, thiết kế theo chuẩn căn hộ xanh & sức khỏe." },
                      { label: "Tầng 1", desc: "Sảnh đón cao cấp và khu tiện ích cộng đồng sầm uất." },
                      { label: "Tầng 5", desc: "Tầng tiện ích đặc quyền: Hồ bơi Sky View, Gym, Spa, khu vui chơi." },
                      { label: "Tầng 6–26", desc: "Căn hộ cao cấp 2–3PN và Duplex, 100% có logia, cửa sổ mọi phòng." },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                        <span className="text-[#3D5A3E] text-base leading-relaxed font-sans">
                          <strong className="text-[#1A2E1A] font-bold">{item.label}:</strong> {item.desc}
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
                <div className="group bg-white rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl border border-[#D4E8D0] hover:border-[#2E7D32]/30 transition-all duration-300 h-full hover:-translate-y-1.5">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#E8F5E9] group-hover:bg-[#2E7D32] flex items-center justify-center mb-6 md:mb-8 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#2E7D32] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1A2E1A] mb-3 font-sans">{feature.title}</h3>
                  <p className="text-[#3D5A3E] text-sm md:text-base leading-relaxed font-sans">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONAL CTA SECTION */}
      <section id="cta" className="relative py-16 md:py-24 overflow-hidden bg-white scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#2E7D32]/5 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#C8A951]/6 blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up" className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#2E7D32]/20 bg-[#E8F5E9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
              <span className="text-[#2E7D32] text-[11px] font-bold uppercase tracking-[0.22em] font-sans">Đặc quyền sở hữu — Nam Sài Gòn</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A951]" />
            </div>
          </Reveal>
        
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Cột trái: Ảnh */}
            <Reveal direction="left" className="relative h-full flex flex-col justify-center">
              <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none pt-4 pb-10 px-8 lg:pl-4 lg:pr-10">
                <div 
                  className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_rgba(13,31,13,0.18)] border border-[#D4E8D0] group cursor-zoom-in"
                  onClick={() => setZoomedImage({ src: "/the-peak-garden/group4.jpg", alt: "The Peak Garden — Căn hộ đẳng cấp Quận 7" })}
                >
                  <Image
                    src="/the-peak-garden/group4.jpg"
                    alt="The Peak Garden — Căn hộ đẳng cấp Quận 7"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F0D]/75 via-[#0D1F0D]/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2E7D32]/15 to-transparent mix-blend-overlay pointer-events-none" />
        
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 pointer-events-none">
                     <div className="bg-[#2E7D32]/90 backdrop-blur-sm text-white p-4 rounded-full shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                         <Maximize2 size={24} />
                     </div>
                  </div>

                  <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-white/15 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/25 pointer-events-none">
                    <Leaf className="w-3 h-3 text-[#C8A951] fill-[#C8A951]" />
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase font-sans">Detox & Healthy</span>
                  </div>
        
                  <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none">
                    <p className="text-white/55 text-[10px] uppercase tracking-widest font-bold mb-0.5 font-sans">15B Nguyễn Lương Bằng</p>
                    <p className="text-white font-bold text-base font-sans">Phú Mỹ, Quận 7, TP.HCM</p>
                  </div>
                </div>
        
                <div className="absolute top-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#D4E8D0] z-20 flex items-center gap-3 pointer-events-none">
                  <div className="flex -space-x-2">
                    {[31, 32, 33, 34].map((u) => (
                      <div key={u} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shrink-0">
                        <img src={`https://i.pravatar.cc/80?u=${u}`} alt="" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[#1A2E1A] text-xs font-bold font-sans leading-tight">+150 đăng ký</p>
                    <p className="text-[#6B8C6B] text-[10px] font-sans">tháng này</p>
                  </div>
                </div>
        
                <div className="absolute bottom-0 right-0 bg-[#0D1F0D] rounded-2xl px-6 py-4 shadow-[0_16px_40px_rgba(13,31,13,0.3)] border border-white/10 z-20 text-right pointer-events-none">
                  <p className="text-white/45 text-[10px] uppercase tracking-widest mb-0.5 font-sans">Chỉ từ</p>
                  <p className="text-[#C8A951] text-2xl font-bold leading-none font-sans">75 triệu</p>
                  <p className="text-white/55 text-[11px] mt-0.5 font-sans">/ m²</p>
                  <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-[#2E7D32] flex items-center justify-center shadow-md">
                    <Leaf className="w-3 h-3 text-white" />
                  </div>
                </div>
        
                <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-[#C8A951]/12 blur-3xl -z-10" />
                <div className="absolute -top-8 -right-8 w-52 h-52 rounded-full bg-[#2E7D32]/6 blur-3xl -z-10" />
              </div>
            </Reveal>
        
            <Reveal direction="right" className="flex flex-col gap-6 h-full justify-center mt-0 lg:-mt-4">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#1A2E1A] leading-[1.25] md:leading-[1.3] font-sans tracking-tight text-balance">
                  Đừng bỏ lỡ cơ hội sở hữu <span className="text-[#2E7D32]">căn hộ xanh</span> <br className="hidden md:block" /> duy nhất tại{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#2E7D32] italic">trung tâm Quận 7</span>
                    <span className="absolute left-0 -bottom-0.5 w-full h-[3px] bg-[#C8A951] rounded-full" />
                  </span>!
                </h2>
                <p className="text-[#3D5A3E] text-sm md:text-[15px] leading-relaxed font-sans text-balance mt-2">
                  Sở hữu ngay căn hộ <strong className="text-[#1A2E1A]">chăm sóc sức khỏe & sắc đẹp</strong> đầu tiên Nam Sài Gòn, liền kề Phú Mỹ Hưng,{" "}
                  <span className="text-[#2E7D32] font-bold">pháp lý hoàn chỉnh</span> — giá chỉ từ <strong className="text-[#1A2E1A]">75 triệu/m²</strong>.
                </p>
              </div>
        
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-[#C8A951]/40 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#C8A951]" />
                <div className="flex-1 h-px bg-gradient-to-l from-[#C8A951]/40 to-transparent" />
              </div>
        
              <div className="space-y-2.5">
                {[
                  { icon: MapPin, title: "Vị Trí Kim Cương",  desc: "Mặt tiền Nguyễn Lương Bằng — trục tài chính tỷ đô, liền kề Phú Mỹ Hưng và Crescent Mall.", tag: "Vị trí đắc địa", target: "location" },
                  { icon: Leaf,   title: "Detox & Healthy", desc: "11.000m² vườn nhiệt đới, hồ Thiên Nga 10.000m³, 39 tiện ích sức khỏe bao quanh.", tag: "Sức khoẻ",        target: "amenities" },
                  { icon: Shield, title: "Pháp Lý Hoàn Chỉnh", desc: "Đã có HĐMB, đang xây tầng 9–10. Sổ hồng sở hữu lâu dài, bảo lãnh ngân hàng.", tag: "An tâm sở hữu", target: "progress" },
                ].map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(item.target)
                      if (!el) return
                      const top = el.getBoundingClientRect().top + window.pageYOffset - 90
                      window.scrollTo({ top, behavior: "smooth" })
                    }}
                    className="relative w-full text-left flex items-center gap-4 bg-[#F4F7F0] rounded-xl p-4 border border-[#D4E8D0] hover:border-[#2E7D32]/30 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute left-0 inset-y-0 w-[3px] bg-[#2E7D32] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] group-hover:bg-[#2E7D32] flex items-center justify-center shrink-0 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-[#2E7D32] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[#1A2E1A] font-bold text-sm font-sans uppercase tracking-tight">{item.title}</span>
                        <span className="text-[9px] bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/15 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans shrink-0 group-hover:bg-[#2E7D32]/10">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[#6B8C6B] text-xs leading-relaxed font-sans">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9ABCA0] group-hover:text-[#2E7D32] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
        
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "0%",      label: "Lãi suất hỗ trợ" },
                  { value: "70%",     label: "Ngân hàng cho vay" },
                  { value: "5,2 ha",  label: "Tổng diện tích" },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-[#E8F5E9] rounded-xl py-3.5 px-2 border border-[#D4E8D0]/80">
                    <p className="text-[#2E7D32] text-xl md:text-2xl font-bold leading-none font-sans">{s.value}</p>
                    <p className="text-[#6B8C6B] text-[10px] font-bold uppercase tracking-wider mt-1 font-sans leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
        
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-4 bg-[#2E7D32] text-white font-bold rounded-xl shadow-[0_10px_24px_rgba(46,125,50,0.3)] hover:bg-[#1B5E20] hover:shadow-[0_14px_32px_rgba(27,94,32,0.32)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm font-sans"
                >
                  Nhận ưu đãi độc quyền <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:0986514242"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#D4E8D0] hover:border-[#2E7D32]/30 text-[#1A2E1A] font-bold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-sm font-sans shrink-0"
                >
                  <Phone className="w-4 h-4 text-[#2E7D32]" />
                  Gọi Ngay
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-20 md:py-32 bg-[#0D1F0D] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#2E7D32]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#C8A951]/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C8A951]" />
                <span className="text-[#C8A951] text-xs font-bold tracking-[0.2em] uppercase font-sans">Vị Trí Chiến Lược</span>
                <div className="h-px w-12 bg-[#C8A951]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">Trục Tài Chính Tỷ Đô</h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Toạ lạc ngay mặt tiền 15B Nguyễn Lương Bằng — tuyến phố thương mại – tài chính sầm uất bậc nhất Nam Sài Gòn, liền kề khu đô thị Phú Mỹ Hưng.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Map */}
            <Reveal direction="left" className="lg:col-span-3">
              <div 
                onClick={() => setZoomedImage({ src: "/the-peak-garden/map.jpg", alt: "Bản đồ vị trí The Peak Garden" })}
                className="relative rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in bg-white shadow-2xl" 
                style={{ minHeight: '400px' }}
                role="button"
                aria-label="Phóng to bản đồ vị trí"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setZoomedImage({ src: "/the-peak-garden/map.jpg", alt: "Bản đồ vị trí The Peak Garden" }) }}
              >
                <Image src="/the-peak-garden/map.jpg" alt="Bản đồ vị trí The Peak Garden" fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]" />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#0D1F0D]/15 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-[#2E7D32] text-white p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_40px_rgba(46,125,50,0.6)] scale-75 group-hover:scale-100">
                    <Maximize2 size={32} />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0D1F0D]/90 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-[#D4E8D0] pointer-events-none flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFF0EE] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-[#1A2E1A] font-bold text-base font-sans">THE PEAK GARDEN</p>
                    <p className="text-[#3D5A3E] text-xs font-sans mt-0.5">Click để phóng to bản đồ</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-2 flex flex-col justify-center space-y-5 md:space-y-6">
              {connections.map((item, idx) => (
                <Reveal key={item.title} direction="right" delay={idx * 0.1}>
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 hover:bg-white/10 hover:border-[#C8A951]/40 transition-all duration-300 group">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#C8A951]/15 flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C] transition-colors duration-300">
                        <item.icon className="w-6 h-6 text-[#C8A951] group-hover:text-[#0D1F0D] transition-colors" />
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
              <p className="text-[#C8A951] text-sm font-bold tracking-[0.2em] uppercase text-center mb-8 font-sans">Kết Nối Hoàn Hảo — Ngàn Tiện ÍCH Xung Quanh</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {nearbyPlaces.map((place) => (
                  <div key={place.name}
                    className="text-center p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-[#2E7D32] border border-white/10 hover:border-[#2E7D32] transition-all duration-300 group cursor-default">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">{place.time}</p>
                    <p className="text-white/70 text-xs md:text-sm font-medium group-hover:text-white leading-snug font-sans">{place.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ADDITIONAL FORM 1: MINI INLINE FORM (ĐÃ SỬA LỖI MÁY CHỦ) */}
      <section className="py-12 bg-white border-y border-[#D4E8D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F4F7F0] rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A2E1A] mb-3 font-sans">Tải Trọn Bộ Tài Liệu Dự Án</h3>
              <p className="text-[#3D5A3E] font-sans">Nhận ngay mặt bằng chi tiết, chính sách bán hàng và bảng giá mới nhất qua Zalo/Email.</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <Input 
                required
                placeholder="Họ tên của bạn"
                value={formData.name}
                onChange={(e) => setFormData({
                  ...formData, 
                  name: e.target.value, 
                  email: formData.email || "khachhang@form.nho", 
                  message: "Yêu cầu tải tài liệu dự án (Gửi từ form nhanh)",
                  subject: "Yêu cầu tải trọn bộ tài liệu dự án The Peak Garden"
                })}
                className="bg-white border-[#D4E8D0] h-14 sm:w-64 rounded-xl focus-visible:ring-[#2E7D32]"
              />
              <Input 
                required
                type="tel"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({
                  ...formData, 
                  phone: e.target.value,
                  email: formData.email || "khachhang@form.nho", 
                  message: "Yêu cầu tải tài liệu dự án (Gửi từ form nhanh)",
                })}
                className="bg-white border-[#D4E8D0] h-14 sm:w-64 rounded-xl focus-visible:ring-[#2E7D32]"
              />
              <Button type="submit" disabled={isSubmitting} className="h-14 px-8 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-bold uppercase tracking-wider transition-all whitespace-nowrap">
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"} <Download className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-20 md:py-32 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#2E7D32]" />
                <span className="text-[#2E7D32] text-xs font-bold tracking-[0.2em] uppercase font-sans">Sản Phẩm & Thiết Kế</span>
                <div className="h-px w-12 bg-[#2E7D32]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2E1A] mb-6 leading-tight font-sans">Đa Dạng Lựa Chọn</h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="flex overflow-x-auto hide-scroll w-full justify-start md:justify-center gap-3 px-1 mb-12 md:mb-16 snap-x pb-4">
              {productTypes.map((p) => (
                <button key={p.id} onClick={() => setSelectedProduct(p.id)}
                  className={cn(
                    "relative flex-shrink-0 px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans snap-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E7D32]",
                    selectedProduct === p.id ? "bg-[#2E7D32] text-white shadow-[0_8px_20px_rgba(46,125,50,0.3)] scale-105" : "bg-white text-[#3D5A3E] hover:bg-[#E8F5E9] border border-[#D4E8D0]"
                  )}>
                  {p.name}
                  {p.popular && <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-[#C8A951] text-[#0D1F0D] px-2 py-0.5 rounded-full font-bold font-sans shadow-sm">Hot</span>}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mb-8">
              <p className="text-center text-[#6B8C6B] text-xs font-bold uppercase tracking-[0.2em] mb-4 font-sans">Mặt Bằng Chi Tiết — {activeProduct.name}</p>
              <CoverflowCarousel items={activeProduct.gallery} imageFit="contain" showTextOutside={true} />
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-2xl shadow-black/5 border border-[#D4E8D0] relative overflow-hidden mb-16 mt-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8F5E9] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-70 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E8F5E9] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-70 pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                {activeProduct.popular && (
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#2E7D32] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-8 shadow-md font-sans">
                    <Star className="w-4 h-4 fill-white" /> Sản phẩm được săn đón nhất
                  </span>
                )}

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2E1A] mb-10 font-sans">
                  Căn hộ {activeProduct.name}
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10">
                  <div className="flex flex-col items-center">
                    <span className="text-[#6B8C6B] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Diện tích thông thủy</span>
                    <span className="text-[#1A2E1A] text-2xl md:text-3xl font-bold font-sans">{activeProduct.area}</span>
                  </div>
                  <div className="w-full h-px md:w-px md:h-16 bg-[#D4E8D0] max-w-[200px]" />
                  <div className="flex flex-col items-center">
                    <span className="text-[#6B8C6B] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Mức giá tham khảo</span>
                    <span className="text-[#2E7D32] text-3xl md:text-5xl font-bold font-sans">{activeProduct.price}</span>
                  </div>
                </div>

                <div className="relative py-8 mb-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full border-t border-[#D4E8D0]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-8 text-[#3D5A3E] italic text-lg md:text-xl font-medium font-sans text-center">
                      "{activeProduct.description}"
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                  {activeProduct.features.map((f) => (
                    <div key={f} className="flex flex-col items-center justify-center text-center bg-[#E8F5E9]/60 p-5 md:p-6 rounded-3xl border border-[#D4E8D0]/80 hover:bg-[#E8F5E9] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                        <Check className="w-5 h-5 text-[#2E7D32]" />
                      </div>
                      <span className="text-[#1A2E1A] text-sm font-bold leading-snug font-sans">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a href="#contact"
                    onClick={() => {
                        setSelectedProduct(activeProduct.id);
                        setFormData({ 
                            ...formData, 
                            product: activeProduct.id, 
                            subject: `Yêu cầu tư vấn Căn hộ ${activeProduct.name}`,
                            email: formData.email || "khachhang@form.sanpham",
                            message: `Khách quan tâm căn hộ ${activeProduct.name}` 
                        });
                    }}
                    className="inline-flex items-center gap-3 bg-[#1A2E1A] text-white font-bold text-sm uppercase tracking-widest px-10 py-5 md:py-6 rounded-full hover:bg-[#2E7D32] transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(46,125,50,0.4)] hover:-translate-y-1 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E7D32]">
                    Đăng Ký Tư Vấn {activeProduct.name} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mặt bằng tổng thể */}
          <Reveal direction="up" delay={0.25}>
            <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F0F7F0] rounded-[2.5rem] pt-12 pb-6 border border-[#D4E8D0] shadow-lg">
              <h3 className="text-2xl md:text-4xl font-bold text-[#1A2E1A] mb-6 font-sans text-center px-4">
                Mặt Bằng Tầng Tổng Thể
              </h3>
              <CoverflowCarousel items={floorPlans} imageFit="contain" showTextOutside={true} />
            </div>
          </Reveal>

          {/* Nhà Mẫu */}
          <Reveal direction="up" delay={0.3} className="mt-24 pt-24 border-t border-[#D4E8D0]" id="showroom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#2E7D32]" />
                <span className="text-[#2E7D32] text-xs font-bold tracking-[0.2em] uppercase font-sans">Không Gian Sống</span>
                <div className="h-px w-12 bg-[#2E7D32]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2E1A] mb-6 leading-tight font-sans">
                Hình Ảnh Thực Tế Dự Án
              </h2>
              <p className="text-[#3D5A3E] text-base md:text-lg leading-relaxed font-sans">
                Cập nhật tiến độ thi công và không gian tiện ích của The Peak Garden — đang xây dựng nhộn nhịp tại trung tâm Quận 7.
              </p>
            </div>
            
            <CoverflowCarousel items={showroomGallery} imageFit="cover" showTextOutside={true} />
          </Reveal>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section id="amenities" className="py-20 md:py-32 bg-[#0D1F0D] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#2E7D32]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[#C8A951]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C8A951]" />
                <span className="text-[#C8A951] text-xs font-bold tracking-[0.2em] uppercase font-sans">Tiện Ích Nội Khu</span>
                <div className="h-px w-12 bg-[#C8A951]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
                Thiên Đường Xanh 600 Tỷ
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                39 tiện ích đẳng cấp bao quanh hồ Thiên Nga 10.000m³ — đầu tư hơn 600 tỷ đồng để kiến tạo không gian Detox & Healthy hoàn hảo.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up">
            <div 
              className="relative rounded-3xl overflow-hidden mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-[#0D1F0D] cursor-zoom-in"
              onClick={() => setZoomedImage({ src: "/the-peak-garden/TIEN-ICH-TANG-1.jpg", alt: "Sơ đồ tiện ích tầng 1 — The Peak Garden" })}
            >
              <Image src="/the-peak-garden/TIEN-ICH-TANG-1.jpg"
                alt="Tổng quan tiện ích The Peak Garden" width={1400} height={700}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
              
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 pointer-events-none">
                 <div className="bg-[#C8A951]/90 backdrop-blur-sm text-[#0D1F0D] p-5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                     <Maximize2 size={32} />
                 </div>
              </div>
            </div>
            <p className="text-center text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-20 font-sans">Sơ đồ tiện ích tầng 1 — The Peak Garden</p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mb-20">
              <p className="text-center text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 font-sans">Khám phá không gian tiện ích</p>
              <CoverflowCarousel items={amenitiesGallery} imageFit="cover" isDark={true} showTextOutside={true} />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 mb-16">
            {highlightAmenities.map((item, idx) => (
              <Reveal key={item.label} direction="up" delay={idx * 0.05}>
                <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 text-center hover:bg-white/10 border border-white/10 hover:border-[#C8A951]/50 transition-all duration-300 hover:-translate-y-1.5 cursor-default">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-xl bg-[#C8A951]/10 group-hover:bg-[#C8A951] flex items-center justify-center mb-4 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-[#C8A951] group-hover:text-[#0D1F0D] transition-colors" />
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
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#C8A951]/15 flex items-center justify-center mb-6 group-hover:bg-[#C8A951] transition-colors duration-300">
                    <cat.icon className="w-7 h-7 text-[#C8A951] group-hover:text-[#0D1F0D] transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-6 font-sans">{cat.title}</h3>
                  <ul className="space-y-4">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/70 text-sm md:text-base group-hover:text-white/90 transition-colors font-sans">
                        <Check className="w-5 h-5 text-[#C8A951] shrink-0" />
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

      {/* ADDITIONAL FORM 2: DARK PROMO FORM (SỬA ĐỂ KHÔNG BỊ LỖI THIẾU EMAIL) */}
      <section className="relative py-20 bg-[#0A160A] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2E7D32]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-gradient-to-r from-[#1A2E1A] to-[#0D1F0D] border border-white/10 rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center max-w-5xl mx-auto">
            <div className="w-16 h-16 bg-[#C8A951]/20 rounded-full flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-[#C8A951]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans">Nhận Ưu Đãi Đặc Quyền Tháng 5</h3>
            <p className="text-white/70 text-lg mb-10 max-w-2xl font-sans">Chỉ dành cho 10 khách hàng đăng ký sớm nhất: Tặng gói nội thất chăm sóc sức khỏe trị giá 100 triệu đồng.</p>
            
            <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input 
                required
                placeholder="Số điện thoại của bạn"
                value={formData.phone}
                onChange={(e) => setFormData({
                  ...formData, 
                  phone: e.target.value, 
                  name: formData.name || "Khách đăng ký ưu đãi",
                  email: formData.email || "khachhang@form.uudai", 
                  subject: "Đăng ký nhận Ưu đãi đặc quyền tháng 5",
                  message: `Khách quan tâm nhận ưu đãi đặc quyền (Số đt: ${e.target.value})`
                })}
                className="bg-white/5 border-white/20 h-16 rounded-2xl text-white placeholder:text-white/30 focus-visible:ring-[#C8A951]"
              />
              <div className="relative">
                <select 
                  value={formData.product} 
                  onChange={(e) => setFormData({
                    ...formData, 
                    product: e.target.value, 
                    message: `Khách quan tâm loại căn: ${e.target.value} (Đăng ký từ form ưu đãi)`
                  })}
                  className="w-full h-16 rounded-2xl bg-white/5 border border-white/20 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A951] appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0D1F0D]">Chọn loại căn hộ</option>
                  <option value="2PN" className="bg-[#0D1F0D]">Căn hộ 2 Phòng ngủ</option>
                  <option value="3PN" className="bg-[#0D1F0D]">Căn hộ 3 Phòng ngủ</option>
                  <option value="Duplex" className="bg-[#0D1F0D]">Duplex đặc quyền</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="h-16 bg-[#C8A951] hover:bg-[#A68A3D] text-[#0D1F0D] rounded-2xl font-bold text-lg uppercase tracking-widest transition-all">
                {isSubmitting ? "Đang xử lý..." : "Nhận Ưu Đãi Ngay"}
              </Button>
            </form>
            <p className="mt-6 text-white/40 text-sm font-sans flex items-center gap-2">
              <Clock className="w-4 h-4" /> Thời gian ưu đãi còn lại: 02 ngày 14 giờ
            </p>
          </div>
        </div>
      </section>

      {/* PROGRESS & LEGAL */}
      <section id="progress" className="py-20 md:py-32 bg-[#E8F5E9] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#2E7D32]" />
                <span className="text-[#2E7D32] text-xs font-bold tracking-[0.2em] uppercase font-sans">Bảo Chứng Niềm Tin</span>
                <div className="h-px w-12 bg-[#2E7D32]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2E1A] mb-6 leading-tight font-sans">
                Pháp Lý & Tiến Độ
              </h2>
              <p className="text-[#3D5A3E] text-base md:text-lg leading-relaxed font-sans">
                Hưng Lộc Phát — chủ đầu tư uy tín với 3 dự án đã bàn giao thành công, cam kết minh bạch pháp lý và tiến độ thi công đúng hạn.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <Hammer className="text-[#2E7D32] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A2E1A] font-sans">Tiến Độ Xây Dựng</h3>
                </div>

                <div className="relative pl-6 md:pl-10 space-y-0">
                  {milestones.map((m, idx) => (
                    <div key={m.id} className="relative pb-10 last:pb-0">
                      {idx < milestones.length - 1 && (
                        <div className="absolute left-[-27px] md:left-[-35px] top-6 bottom-0 w-1 bg-[#D4E8D0] rounded-full" />
                      )}
                      <div className={cn(
                        "absolute -left-[33px] md:-left-[41px] top-1 w-7 h-7 rounded-full border-4 border-[#E8F5E9] flex items-center justify-center z-10 shadow-sm",
                        m.status === "completed" || !m.status ? "bg-[#2E7D32]"
                          : m.status === "in-progress" ? "bg-[#C8A951] ring-4 ring-[#C8A951]/20"
                          : "bg-[#D4E8D0]"
                      )}>
                        {m.status === "in-progress" && (
                          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                        )}
                      </div>

                      <div className={cn(
                        "rounded-3xl p-6 md:p-8 border transition-all duration-300 bg-white",
                        m.status === "in-progress" ? "border-[#C8A951]/40 shadow-xl scale-[1.02]"
                          : "border-[#D4E8D0] shadow-sm"
                      )}>
                        <span className={cn(
                          "inline-block text-[11px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 font-sans",
                          m.status === "in-progress" ? "bg-[#C8A951]/15 text-[#9A7A20]"
                            : "bg-[#2E7D32]/15 text-[#2E7D32]"
                        )}>
                          {m.date}
                        </span>
                        <h4 className="text-lg md:text-xl font-bold text-[#1A2E1A] mb-2 font-sans">{m.title}</h4>
                        <p className="text-[#3D5A3E] text-sm md:text-base leading-relaxed font-sans">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8 md:space-y-10">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#D4E8D0]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#E8F5E9] rounded-2xl flex items-center justify-center shrink-0">
                      <Shield className="text-[#2E7D32] w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1A2E1A] font-sans">Hồ Sơ Pháp Lý</h3>
                  </div>
                  <ul className="space-y-4">
                    {legalDocuments.map((doc) => (
                      <li key={doc} className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[#E8F5E9] hover:bg-[#D4E8D0]/50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#2E7D32]/20 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-[#2E7D32]" />
                        </div>
                        <span className="text-[#1A2E1A] font-semibold text-sm md:text-base leading-relaxed font-sans">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative bg-[#0D1F0D] rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#2E7D32] rounded-full blur-[80px] opacity-50 pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#C8A951] rounded-full blur-[80px] opacity-30 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                        <BarChart2 className="text-[#C8A951] w-6 h-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-sans">Chính Sách Tài Chính</h3>
                    </div>

                    <div className="space-y-5">
                      {[
                        { rate: "0%", title: "Lãi suất ưu đãi hỗ trợ", desc: "Ân hạn nợ gốc và hỗ trợ lãi suất cho khách hàng trong thời gian xây dựng." },
                        { rate: "70%", title: "Ngân hàng hỗ trợ vay 70%", desc: "Bảo lãnh dự án bởi các ngân hàng uy tín, thanh toán nhiều đợt linh hoạt." },
                      ].map((item) => (
                        <div key={item.rate} className="flex items-center gap-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                            <span className="text-2xl md:text-3xl font-bold text-[#C8A951] font-sans">{item.rate}</span>
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

      {/* CONTACT (MAIN FORM) */}
      <section id="contact" className="py-20 md:py-32 bg-[#E8F5E9] border-t border-[#D4E8D0] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#2E7D32]/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-[#2E7D32]" />
                  <span className="text-[#2E7D32] text-xs font-bold tracking-[0.2em] uppercase font-sans">Liên Hệ Ngay Hôm Nay</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A2E1A] mb-6 leading-tight font-sans text-balance">
                  Giữ Chỗ Căn Đẹp, Nhận Chiết Khấu Đặc Biệt.
                </h2>
                <p className="text-[#3D5A3E] text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-sans max-w-lg">
                  Đăng ký ngay để nhận trọn bộ tài liệu dự án, mặt bằng chi tiết từng tầng và bảng giá ưu đãi trực tiếp từ chủ đầu tư Hưng Lộc Phát.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Hotline CSKH 24/7", value: "0986 514 242", href: "tel:0986b 51 4242", isLarge: true },
                    { icon: Mail, label: "Email Hỗ Trợ", value: "ngocdiachinh34@gmail.com", href: "ngocdiachinh34@gmail.com", isLarge: false },
                  ].map((c) => (
                    <a key={c.label} href={c.href} className="flex items-center gap-5 bg-white p-6 rounded-3xl border border-[#D4E8D0] hover:border-[#2E7D32]/40 hover:shadow-xl transition-all duration-300 group outline-none focus:ring-2 focus:ring-[#2E7D32]">
                      <div className="w-14 h-14 bg-[#E8F5E9] group-hover:bg-[#2E7D32] rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm">
                        <c.icon className="w-6 h-6 text-[#2E7D32] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[#6B8C6B] text-xs font-bold uppercase tracking-widest mb-1 font-sans">{c.label}</p>
                        <p className={cn("font-bold text-[#1A2E1A] group-hover:text-[#2E7D32] transition-colors font-sans", c.isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>
                          {c.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal direction="right">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-2xl border border-[#D4E8D0]">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1A2E1A] mb-8 md:mb-10 text-center font-sans">
                  Đăng Ký Tư Vấn
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <Check className="w-10 h-10 md:w-12 md:h-12 text-[#2E7D32]" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#1A2E1A] mb-3 font-sans">Đăng Ký Thành Công!</h4>
                    <p className="text-[#3D5A3E] text-base mb-8 leading-relaxed font-sans">Chuyên viên Hưng Lộc Phát sẽ gọi lại cho quý khách trong thời gian sớm nhất.</p>
                    <button onClick={() => setIsSubmitted(false)} className="text-[#2E7D32] font-bold text-base underline underline-offset-4 hover:text-[#1B5E20] transition-colors font-sans focus:outline-none focus:ring-2 focus:ring-[#2E7D32] rounded-md px-2 py-1">
                      Đăng ký thêm thông tin khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                    <div>
                      <label className="block text-xs font-bold text-[#3D5A3E] uppercase tracking-widest mb-2.5">Họ và tên <span className="text-[#2E7D32]">*</span></label>
                      <Input required placeholder="Nhập họ và tên của bạn..."
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#F4F7F0] border-transparent py-6 focus-visible:ring-[#2E7D32] focus-visible:ring-2 placeholder:text-[#9ABCA0] text-sm md:text-base rounded-xl" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#3D5A3E] uppercase tracking-widest mb-2.5">Điện thoại <span className="text-[#2E7D32]">*</span></label>
                        <Input required type="tel" placeholder="09xx..."
                          value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-[#F4F7F0] border-transparent py-6 focus-visible:ring-[#2E7D32] focus-visible:ring-2 placeholder:text-[#9ABCA0] text-sm md:text-base rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#3D5A3E] uppercase tracking-widest mb-2.5">Sản phẩm quan tâm</label>
                        <div className="relative">
                          <select value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value, subject: `Khách quan tâm Căn hộ ${e.target.value}` })}
                            className="w-full h-[50px] rounded-xl bg-[#F4F7F0] border-0 px-4 text-sm md:text-base text-[#1A2E1A] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] appearance-none cursor-pointer">
                            <option value="">Chọn loại căn...</option>
                            <option value="2PN">Căn hộ 2 Phòng ngủ</option>
                            <option value="3PN">Căn hộ 3 Phòng ngủ</option>
                            <option value="Duplex">Duplex (Biệt thự trên không)</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B8C6B] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3D5A3E] uppercase tracking-widest mb-2.5">Email <span className="text-[#2E7D32]">*</span></label>
                      <Input required type="email" placeholder="Để nhận tài liệu qua email..."
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#F4F7F0] border-transparent py-6 focus-visible:ring-[#2E7D32] focus-visible:ring-2 placeholder:text-[#9ABCA0] text-sm md:text-base rounded-xl" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#3D5A3E] uppercase tracking-widest mb-2.5">Ghi chú thêm <span className="text-[#2E7D32]">*</span></label>
                      <textarea required rows={3} placeholder="Bạn cần tư vấn vấn đề gì..."
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border-0 bg-[#F4F7F0] px-4 py-4 text-sm md:text-base text-[#1A2E1A] placeholder:text-[#9ABCA0] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] resize-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className={cn(
                        "w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E7D32]",
                        isSubmitting
                          ? "bg-[#2E7D32]/50 cursor-not-allowed"
                          : "bg-[#2E7D32] hover:bg-[#1B5E20] shadow-[0_10px_30px_rgba(46,125,50,0.3)] hover:shadow-[0_15px_40px_rgba(46,125,50,0.4)] hover:-translate-y-1"
                      )}>
                      {isSubmitting ? (
                        <><span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> Đang gửi...</>
                      ) : (
                        <><Send size={18} /> Nhận Báo Giá Ngay</>
                      )}
                    </button>
                    <p className="text-center text-xs text-[#6B8C6B] mt-4 font-sans flex items-center justify-center gap-1.5">
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

      {/* Modal Phóng To Ảnh Dùng Chung */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[100] bg-[#0D1F0D]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-300" 
             onClick={() => setZoomedImage(null)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-[#2E7D32] text-white rounded-full p-3 transition-colors z-50 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
            aria-label="Đóng ảnh"
          >
            <X size={28} />
          </button>
          <div 
            className="relative w-full max-w-6xl max-h-[85vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 bg-transparent flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={zoomedImage.src} 
              alt={zoomedImage.alt} 
              className="max-w-full max-h-[85vh] object-contain rounded-xl" 
            />
          </div>
          <p className="absolute bottom-6 md:bottom-10 text-white/80 text-sm font-bold font-sans tracking-widest uppercase text-center px-4 pointer-events-none drop-shadow-md">
            {zoomedImage.alt}
          </p>
        </div>
      )}
    </main>
  )
}