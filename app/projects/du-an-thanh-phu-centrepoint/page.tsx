'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'

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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/90 via-transparent to-transparent pointer-events-none" />
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
                        isDark ? "bg-white/15 backdrop-blur-md text-white border border-white/20" : "bg-white text-[#B45309] border border-[#D4C4B0]"
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
              isDark ? "bg-black/60 backdrop-blur-sm text-white border border-white/20" : "bg-white text-[#B45309] border border-[#D4C4B0]"
            )}>
              {displayItems[currentIndex]?.title}
            </p>
          </div>
        )}

        <button onClick={prev} className={cn("absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#B45309]" : "bg-white/90 backdrop-blur shadow-lg border border-[#F5E6D0] text-[#1A0A00] hover:bg-[#B45309] hover:text-white")}>
          <ArrowLeft size={20} />
        </button>
        <button onClick={next} className={cn("absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#B45309]" : "bg-white/90 backdrop-blur shadow-lg border border-[#F5E6D0] text-[#1A0A00] hover:bg-[#B45309] hover:text-white")}>
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
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-[#B45309] text-white rounded-full p-3 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white/50"
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
  { href: "#showroom", label: "Phối Cảnh" },
  { href: "#amenities", label: "Tiện Ích" },
]

const features = [
  { icon: ShoppingBag, title: "Mô Hình StripMall Độc Đáo", description: "Dự án duy nhất tại khu vực có mô hình TripMall hiện đại — xu hướng mua sắm 'mở' thịnh hành thế giới, đỗ xe trực tiếp trước cửa hiệu." },
  { icon: Shield, title: "Pháp Lý Hoàn Chỉnh", description: "Đầy đủ Quyết định giao đất, Quy hoạch 1/500 và Quyết định chấp thuận chủ trương đầu tư. Đã chính thức khởi công 22/03/2026." },
  { icon: Building2, title: "Vị Trí Cửa Ngõ Tây TP.HCM", description: "Tọa lạc tại Bến Lức, Long An — 'Ngã Năm Giao Thông' kết nối TP.HCM, Đông Nam Bộ và toàn vùng Tây Nam Bộ." },
  { icon: Sparkles, title: "Tiện Ích Đẳng Cấp 5 Sao", description: "Mega Mall 9,5ha, hồ bơi nổi 3.300m² đầu tiên Việt Nam, quảng trường nhạc nước 1,2ha, resort trị liệu cao cấp." },
]

const connections = [
  { icon: Car, title: "Cao Tốc TP.HCM – Trung Lương & Vành Đai 3", description: "Chỉ 5 phút kết nối cao tốc TP.HCM – Trung Lương. Đón đầu Vành đai 3 (76km, đang triển khai) và quy hoạch Vành đai 4 — gia tăng năng lực kết nối liên vùng." },
  { icon: Building, title: "Trung Tâm Logistics Chiến Lược", description: "Bến Lức nổi lên như 'bàn xoay logistics' kết nối TP.HCM với toàn bộ miền Tây, tiếp giáp trực tiếp 40+ khu công nghiệp lớn." },
  { icon: Clock, title: "Chỉ 35 Phút Đến Quận 1", description: "Liền kề mạng lưới cao tốc và tuyến đường huyết mạch 830C dọc sông Rạch Dơi. Khu Tây dự báo là trung tâm phát triển tiếp theo 2025–2035." },
]

const nearbyPlaces = [
  { name: "Trung tâm Quận 1", time: "35 phút" },
  { name: "Cao tốc Trung Lương", time: "5 phút" },
  { name: "Sân bay TSN", time: "40 phút" },
  { name: "Khu CN Bến Lức", time: "2 phút" },
  { name: "TP. Tân An", time: "20 phút" },
  { name: "Cần Thơ", time: "90 phút" },
]

const productTypes = [
  {
    id: "lienke", name: "Nhà Phố Liền Kề", area: "~5,14 ha — 607 căn", price: "Liên hệ CĐT",
    description: "Khu ở trung tâm dự án, bố trí block song song, lý tưởng cho gia đình an cư lâu dài",
    features: ["Xây tối đa 5 tầng", "Mật độ XD tối đa 90%", "Đường nội khu rộng rãi", "Pháp lý sổ hồng lâu dài"],
    popular: false,
    gallery: [
      { src: "/thanh-phu-centre-point/lienke-01.jpg", title: "Phối Cảnh Nhà Phố Liền Kề" },
      { src: "/thanh-phu-centre-point/lienke-02.jpg", title: "Mặt Bằng Nhà Phố Liền Kề" },
      { src: "/thanh-phu-centre-point/lienke-03.jpg", title: "Thiết Kế Nội Thất Liền Kề" },
    ]
  },
  {
    id: "shophouse", name: "Shophouse / Nhà Phố TM", area: "Trục đường 30m–40m", price: "Liên hệ CĐT",
    description: "Dãy shophouse sầm uất trên trục thương mại chính, đón đầu dòng khách khổng lồ từ cao tốc và vành đai",
    features: ["Xây tối đa 3 tầng", "Mật độ XD tối đa 80%", "Mô hình StripMall độc đáo", "Kinh doanh & cho thuê"],
    popular: true,
    gallery: [
      { src: "/thanh-phu-centre-point/shophouse-01.jpg", title: "Phối Cảnh Shophouse Thương Mại" },
      { src: "/thanh-phu-centre-point/shophouse-02.jpg", title: "Mặt Bằng Shophouse" },
      { src: "/thanh-phu-centre-point/shophouse-03.jpg", title: "Trục StripMall Kinh Doanh" },
    ]
  },
  {
    id: "villa", name: "Biệt Thự Villa", area: "~4,75 ha — 313 căn", price: "Liên hệ CĐT",
    description: "Biệt thự đơn lập & song lập cao cấp, kết hợp Clubhouse đẳng cấp 5 sao — đỉnh cao của sống đẳng cấp",
    features: ["Villa đơn lập & song lập", "Clubhouse đẳng cấp 5*", "Hướng đến cư dân cao cấp", "Thiết kế Codinachs Tây Ban Nha"],
    popular: false,
    gallery: [
      { src: "/thanh-phu-centre-point/villa-01.jpg", title: "Phối Cảnh Biệt Thự Villa" },
      { src: "/thanh-phu-centre-point/villa-02.jpg", title: "Mặt Bằng Biệt Thự Đơn Lập" },
      { src: "/thanh-phu-centre-point/villa-03.jpg", title: "Khu Clubhouse 5 Sao" },
    ]
  },
]

const showroomGallery = [
  { src: "/thanh-phu-centre-point/phoi-canh-01.jpg", title: "Phối Cảnh Tổng Thể Dự Án" },
  { src: "/thanh-phu-centre-point/phoi-canh-02.jpg", title: "Khu Mega Mall 9,5ha" },
  { src: "/thanh-phu-centre-point/phoi-canh-03.jpg", title: "Quảng Trường Nhạc Nước 1,2ha" },
  { src: "/thanh-phu-centre-point/phoi-canh-04.jpg", title: "Hồ Sinh Thái 3,8ha" },
  { src: "/thanh-phu-centre-point/phoi-canh-05.jpg", title: "Trục StripMall Thương Mại" },
  { src: "/thanh-phu-centre-point/phoi-canh-06.jpg", title: "Khu Biệt Thự Cao Cấp" },
]

const floorPlans = [
  { src: "/thanh-phu-centre-point/matbang-tongthe.jpg", title: "Mặt Bằng Tổng Thể Dự Án" },
  { src: "/thanh-phu-centre-point/matbang-gd1.jpg", title: "Mặt Bằng Giai Đoạn 1 — 85ha" },
  { src: "/thanh-phu-centre-point/matbang-lienke.jpg", title: "Phân Khu Nhà Phố Liền Kề" },
  { src: "/thanh-phu-centre-point/matbang-villa.jpg", title: "Phân Khu Biệt Thự & Clubhouse" },
  { src: "/thanh-phu-centre-point/matbang-stripmall.jpg", title: "Phân Khu StripMall Thương Mại" },
  { src: "/thanh-phu-centre-point/matbang-tienich.jpg", title: "Sơ Đồ Tiện Ích Nội Khu" },
]

const amenitiesGallery = [
  { src: "/thanh-phu-centre-point/tienich-megamall.jpg", title: "01 - ĐẠI SIÊU THỊ MEGA MALL 9,5HA" },
  { src: "/thanh-phu-centre-point/tienich-hoiboi.jpg", title: "02 - HỒ BƠI NỔI TRÊN HỒ 3.300M²" },
  { src: "/thanh-phu-centre-point/tienich-nhacnuoc.jpg", title: "03 - SHOW NHẠC NƯỚC NGOÀI TRỜI" },
  { src: "/thanh-phu-centre-point/tienich-quangtuong.jpg", title: "04 - QUẢNG TRƯỜNG LỄ HỘI 1,2HA" },
  { src: "/thanh-phu-centre-point/tienich-resort.jpg", title: "05 - RESORT TRỊ LIỆU CAO CẤP" },
  { src: "/thanh-phu-centre-point/tienich-ho.jpg", title: "06 - HỒ SINH THÁI 3,8HA" },
  { src: "/thanh-phu-centre-point/tienich-clubhouse.jpg", title: "07 - CLUBHOUSE ĐẲNG CẤP 5 SAO" },
  { src: "/thanh-phu-centre-point/tienich-thethaonuoc.jpg", title: "08 - KHU THỂ THAO MẶT NƯỚC" },
  { src: "/thanh-phu-centre-point/tienich-truonghoc.jpg", title: "09 - TRƯỜNG HỌC LIÊN CẤP QT" },
  { src: "/thanh-phu-centre-point/tienich-pickleball.jpg", title: "10 - 9 SÂN ĐA NĂNG & PICKLEBALL" },
  { src: "/thanh-phu-centre-point/tienich-stripe.jpg", title: "11 - STRIPMALL PHỐ MUA SẮM" },
  { src: "/thanh-phu-centre-point/tienich-khachsan.jpg", title: "12 - KHÁCH SẠN CAO CẤP" },
]

const highlightAmenities = [
  { icon: ShoppingBag, label: "Mega Mall 9,5ha" }, { icon: Waves, label: "Hồ bơi nổi 3.300m²" },
  { icon: Sparkles, label: "Show nhạc nước" }, { icon: Trees, label: "Hồ sinh thái 3,8ha" },
  { icon: Dumbbell, label: "Sân đa năng" }, { icon: Coffee, label: "StripMall F&B" },
  { icon: GraduationCap, label: "Trường học QT" }, { icon: Film, label: "Sân khấu ngoài trời" },
  { icon: Baby, label: "Khu vui chơi" }, { icon: Shield, label: "An ninh 24/7" },
  { icon: Building2, label: "Clubhouse 5 sao" }, { icon: Stethoscope, label: "Resort trị liệu" },
]

const amenityCategories = [
  { title: "Thương Mại & Mua Sắm", icon: ShoppingBag, items: ["Đại siêu thị Mega Mall 9,5ha", "Tổ hợp StripMall phố mua sắm", "Hàng trăm gian hàng F&B", "Khách sạn cao cấp Luxury Hotel"] },
  { title: "Văn Hóa & Giải Trí", icon: Film, items: ["Show nhạc nước ngoài trời hàng đêm", "Quảng trường lễ hội sức chứa 10.000 người", "Sân khấu âm nhạc Music Stage", "Không gian sự kiện quy mô lớn"] },
  { title: "Thể Thao & Sức Khỏe", icon: Dumbbell, items: ["Hồ bơi nổi trên hồ 3.300m² (đầu tiên VN)", "9 sân thi đấu đa năng nội khu", "2 sân pickleball tiêu chuẩn quốc tế", "Resort trị liệu cao cấp & Spa"] },
  { title: "Giáo Dục & Cộng Đồng", icon: GraduationCap, items: ["Trường học liên cấp tiêu chuẩn QT", "Clubhouse đẳng cấp 5 sao", "Hồ sinh thái 3,8ha & công viên 8ha", "Khu thể thao mặt nước"] },
]

const milestones = [
  { id: 1, title: "Hoàn Thiện Pháp Lý", date: "Hoàn thành", description: "100% hồ sơ pháp lý hoàn chỉnh: Quyết định giao đất, Quy hoạch 1/500 và Quyết định chấp thuận chủ trương đầu tư đã được phê duyệt.", status: "completed" },
  { id: 2, title: "Lễ Khởi Công Chính Thức", date: "22/03/2026 — Đã khởi công", description: "BIM Land chính thức khởi công tại xã Bến Lức, Tây Ninh với sự tham dự của lãnh đạo địa phương và các đối tác chiến lược Hòa Bình & Khang Thành.", status: "in-progress" },
  { id: 3, title: "Mở Bán & Ký HĐMB", date: "Giữa đến cuối 2026", description: "Ra mắt chính thức sản phẩm nhà phố, shophouse và biệt thự. Ký hợp đồng mua bán với khách hàng, tiến độ thanh toán linh hoạt.", status: "upcoming" },
  { id: 4, title: "Bàn Giao Cư Dân", date: "Dự kiến 2027–2028", description: "Bàn giao sản phẩm hoàn thiện đúng tiêu chuẩn. Hệ thống tiện ích đi vào vận hành, hình thành cộng đồng cư dân sầm uất.", status: "upcoming" },
]

const legalDocuments = [
  "Quyết định chấp thuận chủ trương đầu tư từ cơ quan có thẩm quyền",
  "Quy hoạch chi tiết tổng mặt bằng tỷ lệ 1/500 đã được phê duyệt",
  "Quyết định giao đất hợp lệ từ cơ quan nhà nước",
  "Dự án đã chính thức khởi công ngày 22/03/2026",
]

/* ─── Main Component ─── */
export default function ThanhPhuCentrePointLandingPage() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("shophouse")
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", product: "", message: "", subject: "Đăng ký tư vấn dự án Thanh Phú Centre Point" })
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
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', product: '', message: '', subject: 'Đăng ký tư vấn dự án Thanh Phú Centre Point' })
          setIsSubmitted(false)
        }, 4000)
      } else { alert("Có lỗi từ máy chủ. Vui lòng thử lại!") }
    } catch (error) { alert("Lỗi kết nối. Không thể đăng ký lúc này.") }
    finally { setIsSubmitting(false) }
  }

  const activeProduct = productTypes.find(p => p.id === selectedProduct) || productTypes[0]

  return (
    <main className="min-h-screen bg-[#FBF5EE] overflow-x-hidden selection:bg-[#B45309] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ── Header & Nav ── */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-[#E8D5B0]/60" : "bg-transparent"
      )}>
        <Header />
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-10 py-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-xs lg:text-sm font-bold text-[#5C3A1E] hover:text-[#B45309] tracking-[0.1em] uppercase transition-colors relative group font-sans">
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#B45309] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a href="#contact"
                className="ml-4 text-xs font-bold bg-[#B45309] text-white px-6 py-3 rounded-full tracking-[0.1em] uppercase hover:bg-[#92400E] transition-all shadow-md hover:shadow-xl hover:shadow-[#B45309]/30 hover:-translate-y-0.5 font-sans">
                Đăng Ký Ngay
              </a>
            </nav>

            <div className="md:hidden flex items-center justify-between py-3">
              <span className="text-[#92400E] font-bold text-base tracking-wider font-sans">THANH PHÚ CENTRE POINT</span>
              <div className="flex items-center gap-3">
                <a href="#contact" className="text-xs font-bold bg-[#B45309] text-white px-5 py-2.5 rounded-full tracking-wider uppercase font-sans shadow-sm">
                  Đăng Ký
                </a>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#F5E6D0] hover:bg-[#E8D5B0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B45309]">
                  <span className={cn("w-5 h-0.5 bg-[#92400E] transition-all duration-300", mobileMenuOpen && "rotate-45 translate-y-2")} />
                  <span className={cn("w-5 h-0.5 bg-[#92400E] transition-all duration-300", mobileMenuOpen && "opacity-0")} />
                  <span className={cn("w-5 h-0.5 bg-[#92400E] transition-all duration-300", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-[#E8D5B0] shadow-lg py-2 px-4 flex flex-col z-50">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="block py-3.5 px-2 text-sm font-bold text-[#5C3A1E] hover:text-[#B45309] hover:bg-[#F5E6D0]/50 rounded-lg tracking-wider uppercase font-sans transition-colors">
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
          <Image src="/thanh-phu-centre-point/banner-main.jpg" alt="Tổng quan Thanh Phú Centre Point" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00] via-[#1A0A00]/60 to-[#1A0A00]/20" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent z-10" />

        <div className={cn("relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-1000", isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex items-center gap-2 border border-[#F59E0B]/50 rounded-full px-5 py-2.5 bg-[#F59E0B]/10 backdrop-blur-md">
              <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="text-[#F59E0B] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase font-sans">Đô Thị Thương Mại Tích Hợp — Cửa Ngõ Tây TP.HCM</span>
              <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
            </div>
          </div>
          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-none font-sans drop-shadow-lg">
            THANH PHÚ<br className="sm:hidden" /> <span className="text-[#F59E0B]">CENTRE POINT</span>
          </h1>
          <p className="text-center text-white/90 text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-4 md:mb-5 font-medium font-sans">Tâm điểm giao thương — Đô thị thương mại lớn nhất cửa ngõ phía Tây</p>
          <div className="flex items-center justify-center gap-2 mb-8 md:mb-12">
            <MapPin size={16} className="text-[#F59E0B] shrink-0" />
            <p className="text-white/70 text-sm sm:text-base font-sans">Đường 830C, xã Bến Lức, tỉnh Tây Ninh (Cửa ngõ phía Tây TP.HCM)</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 md:mb-14">
            {[
              { value: "200ha", unit: "", label: "Tổng quy mô" },
              { value: "1.251", unit: "sản phẩm", label: "Giai đoạn 1" },
              { value: "9,5ha", unit: "", label: "Mega Mall" },
              { value: "12.662", unit: "tỷ đồng", label: "Tổng mức đầu tư" },
            ].map((stat) => (
              <div key={stat.label} className="relative text-center bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 overflow-hidden group hover:bg-white/10 hover:border-[#F59E0B]/40 transition-all duration-300">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F59E0B] leading-none mb-1 font-sans drop-shadow-sm">{stat.value}</p>
                {stat.unit && <p className="text-white/60 text-[11px] uppercase tracking-widest font-sans">{stat.unit}</p>}
                <p className="text-white/80 text-xs md:text-sm uppercase tracking-wider font-bold mt-2 font-sans">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#B45309] hover:bg-[#92400E] text-white font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all hover:shadow-[0_8px_30px_rgb(180,83,9,0.4)] hover:-translate-y-1 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A0A00] focus:ring-[#B45309]">
              Đăng Ký Nhận Thông Tin <ArrowRight size={18} />
            </a>
            <a href="#overview" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all backdrop-blur-sm font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A0A00] focus:ring-white/50">
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
                <div className="h-px w-12 bg-[#B45309]" />
                <span className="text-[#B45309] text-xs font-bold tracking-[0.2em] uppercase font-sans">Tổng Quan Dự Án</span>
                <div className="h-px w-12 bg-[#B45309]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A00] mb-6 leading-tight font-sans">Tâm Điểm Trù Phú</h2>
              <p className="text-[#5C3A1E] text-base md:text-lg leading-relaxed font-sans">Thanh Phú Centre Point là đại đô thị giao thương tích hợp — điểm đến Đô thị – Thương mại – Văn hóa lớn nhất cửa ngõ phía Tây TP.HCM, do BIM Land (Tập đoàn BIM Group) kiến tạo.</p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">
            <Reveal direction="left">
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8D5B0] group cursor-zoom-in"
                onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/phoi-canh-01.jpg", alt: "Phối cảnh tổng thể Thanh Phú Centre Point" })}
              >
                <div className="relative aspect-[4/3]">
                  <Image 
                    src="/thanh-phu-centre-point/phoi-canh-01.jpg" 
                    alt="Phối cảnh tổng thể Thanh Phú Centre Point" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/90 via-[#1A0A00]/30 to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 pointer-events-none">
                    <div className="bg-[#B45309]/90 backdrop-blur-sm text-white p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 size={24} />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none z-10">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 font-sans">Đô thị thương mại tích hợp đầu tiên khu Tây</h3>
                  <p className="text-white/80 text-sm md:text-base font-sans">Mật độ xây dựng chỉ 14,41% — phần lớn dành cho tiện ích & cảnh quan.</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-2 gap-6 md:gap-8">
                  {[
                    { label: "Chủ đầu tư", value: "BIM Land (Tập đoàn BIM Group)" },
                    { label: "Nhà thầu", value: "Hòa Bình & Khang Thành Construction" },
                    { label: "Quy mô", value: "200ha — Giai đoạn 1: 85ha" },
                    { label: "Vị trí", value: "Đường 830C, Bến Lức, Tây Ninh" },
                  ].map((item) => (
                    <div key={item.label} className="border-l-[3px] border-[#B45309] pl-5 py-1">
                      <p className="text-[#8C6040] text-xs font-bold uppercase tracking-widest mb-1.5 font-sans">{item.label}</p>
                      <p className="text-[#1A0A00] font-bold text-base md:text-lg leading-snug font-sans">{item.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-[#FDF0DC] to-[#FBF5EE] rounded-3xl p-8 md:p-10 border border-[#E8D5B0] shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold text-[#B45309] mb-6 font-sans">Cấu Trúc Dự Án — Giai Đoạn 1</h3>
                  <ul className="space-y-5">
                    {[
                      { label: "607 Nhà phố liền kề", desc: "Khu ở trung tâm ~5,14ha, bố trí block song song, xây tối đa 5 tầng." },
                      { label: "313 Biệt thự Villa", desc: "Đơn lập & song lập ~4,75ha kết hợp Clubhouse đẳng cấp 5 sao." },
                      { label: "331 Shophouse StripMall", desc: "Trục thương mại chính, xây 3 tầng, mô hình mua sắm 'mở' độc đáo." },
                      { label: "Thiết kế bởi Codinachs (Tây Ban Nha)", desc: "Kiến trúc quốc tế, mật độ xây dựng thương phẩm siêu thấp 14,41%." },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#B45309] mt-1.5 shrink-0" />
                        <span className="text-[#5C3A1E] text-base leading-relaxed font-sans">
                          <strong className="text-[#1A0A00] font-bold">{item.label}:</strong> {item.desc}
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
                <div className="group bg-white rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl border border-[#E8D5B0] hover:border-[#B45309]/30 transition-all duration-300 h-full hover:-translate-y-1.5">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#FDF0DC] group-hover:bg-[#B45309] flex items-center justify-center mb-6 md:mb-8 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#B45309] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1A0A00] mb-3 font-sans">{feature.title}</h3>
                  <p className="text-[#5C3A1E] text-sm md:text-base leading-relaxed font-sans">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONAL CTA SECTION */}
      <section id="cta" className="relative py-16 md:py-24 overflow-hidden bg-white scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#B45309]/5 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#F59E0B]/6 blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up" className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#B45309]/20 bg-[#FDF0DC]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-pulse" />
              <span className="text-[#B45309] text-[11px] font-bold uppercase tracking-[0.22em] font-sans">Đặc quyền sở hữu — Cửa ngõ Tây Nam</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            </div>
          </Reveal>
        
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Cột trái: Ảnh */}
            <Reveal direction="left" className="relative h-full flex flex-col justify-center">
              <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none pt-4 pb-10 px-8 lg:pl-4 lg:pr-10">
                <div 
                  className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_rgba(26,10,0,0.18)] border border-[#E8D5B0] group cursor-zoom-in"
                  onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/phoi-canh-02.jpg", alt: "Thanh Phú Centre Point — Đại đô thị thương mại tích hợp" })}
                >
                  <Image
                    src="/thanh-phu-centre-point/phoi-canh-02.jpg"
                    alt="Thanh Phú Centre Point — Đại đô thị thương mại tích hợp"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/75 via-[#1A0A00]/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#B45309]/15 to-transparent mix-blend-overlay pointer-events-none" />
        
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 pointer-events-none">
                     <div className="bg-[#B45309]/90 backdrop-blur-sm text-white p-4 rounded-full shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                         <Maximize2 size={24} />
                     </div>
                  </div>

                  <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-white/15 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/25 pointer-events-none">
                    <ShoppingBag className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase font-sans">StripMall & Mega Mall</span>
                  </div>
        
                  <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none">
                    <p className="text-white/55 text-[10px] uppercase tracking-widest font-bold mb-0.5 font-sans">Đường 830C, Bến Lức</p>
                    <p className="text-white font-bold text-base font-sans">Tây Ninh — Cửa ngõ Tây TP.HCM</p>
                  </div>
                </div>
        
                <div className="absolute top-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#E8D5B0] z-20 flex items-center gap-3 pointer-events-none">
                  <div className="flex -space-x-2">
                    {[31, 32, 33, 34].map((u) => (
                      <div key={u} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shrink-0">
                        <img src={`https://i.pravatar.cc/80?u=${u}`} alt="" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[#1A0A00] text-xs font-bold font-sans leading-tight">+200 đăng ký</p>
                    <p className="text-[#8C6040] text-[10px] font-sans">tháng này</p>
                  </div>
                </div>
        
                <div className="absolute bottom-0 right-0 bg-[#1A0A00] rounded-2xl px-6 py-4 shadow-[0_16px_40px_rgba(26,10,0,0.3)] border border-white/10 z-20 text-right pointer-events-none">
                  <p className="text-white/45 text-[10px] uppercase tracking-widest mb-0.5 font-sans">Khởi công</p>
                  <p className="text-[#F59E0B] text-2xl font-bold leading-none font-sans">22/03</p>
                  <p className="text-white/55 text-[11px] mt-0.5 font-sans">/ 2026</p>
                  <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-[#B45309] flex items-center justify-center shadow-md">
                    <Hammer className="w-3 h-3 text-white" />
                  </div>
                </div>
        
                <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-[#F59E0B]/12 blur-3xl -z-10" />
                <div className="absolute -top-8 -right-8 w-52 h-52 rounded-full bg-[#B45309]/6 blur-3xl -z-10" />
              </div>
            </Reveal>
        
            <Reveal direction="right" className="flex flex-col gap-6 h-full justify-center mt-0 lg:-mt-4">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#1A0A00] leading-[1.25] md:leading-[1.3] font-sans tracking-tight text-balance">
                  Đừng bỏ lỡ cơ hội sở hữu <span className="text-[#B45309]">bất động sản thương mại</span> <br className="hidden md:block" /> tại{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#B45309] italic">cửa ngõ Tây TP.HCM</span>
                    <span className="absolute left-0 -bottom-0.5 w-full h-[3px] bg-[#F59E0B] rounded-full" />
                  </span>!
                </h2>
                <p className="text-[#5C3A1E] text-sm md:text-[15px] leading-relaxed font-sans text-balance mt-2">
                  Sở hữu ngay <strong className="text-[#1A0A00]">nhà phố, shophouse & biệt thự</strong> tại đại đô thị giao thương đầu tiên khu Tây —{" "}
                  <span className="text-[#B45309] font-bold">pháp lý hoàn chỉnh</span>, đã khởi công, đón đầu Vành đai 3 & Vành đai 4.
                </p>
              </div>
        
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-[#F59E0B]/40 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                <div className="flex-1 h-px bg-gradient-to-l from-[#F59E0B]/40 to-transparent" />
              </div>
        
              <div className="space-y-2.5">
                {[
                  { icon: MapPin, title: "Vị Trí Chiến Lược",  desc: "Ngã năm giao thông, liền kề cao tốc Trung Lương, chỉ 35 phút đến trung tâm Quận 1 TP.HCM.", tag: "Vị trí vàng", target: "location" },
                  { icon: ShoppingBag, title: "StripMall Độc Đáo", desc: "Mô hình mua sắm 'mở' duy nhất khu vực, đón dòng khách Vành đai 3, Vành đai 4 và cao tốc.", tag: "Sinh lời cao",        target: "amenities" },
                  { icon: Shield, title: "Pháp Lý Hoàn Chỉnh", desc: "Đã có 1/500, quyết định giao đất, CTCĐT. Khởi công 22/03/2026 với tổng thầu uy tín.", tag: "An tâm sở hữu", target: "progress" },
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
                    className="relative w-full text-left flex items-center gap-4 bg-[#FBF5EE] rounded-xl p-4 border border-[#E8D5B0] hover:border-[#B45309]/30 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute left-0 inset-y-0 w-[3px] bg-[#B45309] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-10 h-10 rounded-xl bg-[#FDF0DC] group-hover:bg-[#B45309] flex items-center justify-center shrink-0 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-[#B45309] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[#1A0A00] font-bold text-sm font-sans uppercase tracking-tight">{item.title}</span>
                        <span className="text-[9px] bg-[#FDF0DC] text-[#B45309] border border-[#B45309]/15 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans shrink-0 group-hover:bg-[#B45309]/10">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[#8C6040] text-xs leading-relaxed font-sans">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C8A870] group-hover:text-[#B45309] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
        
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "14,41%",  label: "Mật độ XD thương phẩm" },
                  { value: "50 năm",  label: "Thời hạn hoạt động" },
                  { value: "4.800",   label: "Dân số dự kiến" },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-[#FDF0DC] rounded-xl py-3.5 px-2 border border-[#E8D5B0]/80">
                    <p className="text-[#B45309] text-xl md:text-2xl font-bold leading-none font-sans">{s.value}</p>
                    <p className="text-[#8C6040] text-[10px] font-bold uppercase tracking-wider mt-1 font-sans leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
        
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-4 bg-[#B45309] text-white font-bold rounded-xl shadow-[0_10px_24px_rgba(180,83,9,0.3)] hover:bg-[#92400E] hover:shadow-[0_14px_32px_rgba(146,64,14,0.32)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm font-sans"
                >
                  Nhận thông tin ưu đãi <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:0901234567"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#E8D5B0] hover:border-[#B45309]/30 text-[#1A0A00] font-bold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-sm font-sans shrink-0"
                >
                  <Phone className="w-4 h-4 text-[#B45309]" />
                  Gọi Ngay
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-20 md:py-32 bg-[#1A0A00] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#B45309]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#F59E0B]/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#F59E0B]" />
                <span className="text-[#F59E0B] text-xs font-bold tracking-[0.2em] uppercase font-sans">Vị Trí Chiến Lược</span>
                <div className="h-px w-12 bg-[#F59E0B]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">Ngã Năm Giao Thông</h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Tọa lạc mặt tiền đường 830C, Bến Lức — điểm giao thoa chiến lược của Vành đai 3, Vành đai 4 và cao tốc TP.HCM – Trung Lương, kết nối 3 vùng kinh tế trọng điểm.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Map */}
            <Reveal direction="left" className="lg:col-span-3">
              <div 
                onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/map.jpg", alt: "Bản đồ vị trí Thanh Phú Centre Point" })}
                className="relative rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in bg-white shadow-2xl" 
                style={{ minHeight: '400px' }}
                role="button"
                aria-label="Phóng to bản đồ vị trí"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setZoomedImage({ src: "/thanh-phu-centre-point/map.jpg", alt: "Bản đồ vị trí Thanh Phú Centre Point" }) }}
              >
                <Image src="/thanh-phu-centre-point/map.jpg" alt="Bản đồ vị trí Thanh Phú Centre Point" fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]" />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1A0A00]/15 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-[#B45309] text-white p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_40px_rgba(180,83,9,0.6)] scale-75 group-hover:scale-100">
                    <Maximize2 size={32} />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1A0A00]/90 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-[#E8D5B0] pointer-events-none flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FDF0DC] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#B45309]" />
                  </div>
                  <div>
                    <p className="text-[#1A0A00] font-bold text-base font-sans">THANH PHÚ CENTRE POINT</p>
                    <p className="text-[#5C3A1E] text-xs font-sans mt-0.5">Click để phóng to bản đồ</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-2 flex flex-col justify-center space-y-5 md:space-y-6">
              {connections.map((item, idx) => (
                <Reveal key={item.title} direction="right" delay={idx * 0.1}>
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 hover:bg-white/10 hover:border-[#F59E0B]/40 transition-all duration-300 group">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#F59E0B]/15 flex items-center justify-center shrink-0 group-hover:bg-[#F59E0B] transition-colors duration-300">
                        <item.icon className="w-6 h-6 text-[#F59E0B] group-hover:text-[#1A0A00] transition-colors" />
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
              <p className="text-[#F59E0B] text-sm font-bold tracking-[0.2em] uppercase text-center mb-8 font-sans">Kết Nối Chiến Lược — Di Chuyển Dễ Dàng</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {nearbyPlaces.map((place) => (
                  <div key={place.name}
                    className="text-center p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-[#B45309] border border-white/10 hover:border-[#B45309] transition-all duration-300 group cursor-default">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">{place.time}</p>
                    <p className="text-white/70 text-xs md:text-sm font-medium group-hover:text-white leading-snug font-sans">{place.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ADDITIONAL FORM 1: MINI INLINE FORM */}
      <section className="py-12 bg-white border-y border-[#E8D5B0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FBF5EE] rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A0A00] mb-3 font-sans">Tải Trọn Bộ Tài Liệu Dự Án</h3>
              <p className="text-[#5C3A1E] font-sans">Nhận ngay mặt bằng chi tiết, chính sách bán hàng và bảng giá mới nhất qua Zalo/Email.</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <Input 
                required
                placeholder="Họ tên của bạn"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-white border-[#E8D5B0] h-14 sm:w-64 rounded-xl focus-visible:ring-[#B45309]"
              />
              <Input 
                required
                type="tel"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-white border-[#E8D5B0] h-14 sm:w-64 rounded-xl focus-visible:ring-[#B45309]"
              />
              <Button type="submit" disabled={isSubmitting} className="h-14 px-8 bg-[#B45309] hover:bg-[#92400E] text-white rounded-xl font-bold uppercase tracking-wider transition-all whitespace-nowrap">
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
                <div className="h-px w-12 bg-[#B45309]" />
                <span className="text-[#B45309] text-xs font-bold tracking-[0.2em] uppercase font-sans">Sản Phẩm & Thiết Kế</span>
                <div className="h-px w-12 bg-[#B45309]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A00] mb-6 leading-tight font-sans">Đa Dạng Lựa Chọn</h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="flex overflow-x-auto hide-scroll w-full justify-start md:justify-center gap-3 px-1 mb-12 md:mb-16 snap-x pb-4">
              {productTypes.map((p) => (
                <button key={p.id} onClick={() => setSelectedProduct(p.id)}
                  className={cn(
                    "relative flex-shrink-0 px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans snap-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B45309]",
                    selectedProduct === p.id ? "bg-[#B45309] text-white shadow-[0_8px_20px_rgba(180,83,9,0.3)] scale-105" : "bg-white text-[#5C3A1E] hover:bg-[#FDF0DC] border border-[#E8D5B0]"
                  )}>
                  {p.name}
                  {p.popular && <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-[#F59E0B] text-[#1A0A00] px-2 py-0.5 rounded-full font-bold font-sans shadow-sm">Hot</span>}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mb-8">
              <p className="text-center text-[#8C6040] text-xs font-bold uppercase tracking-[0.2em] mb-4 font-sans">Phối Cảnh & Mặt Bằng — {activeProduct.name}</p>
              <CoverflowCarousel items={activeProduct.gallery} imageFit="cover" showTextOutside={true} />
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-2xl shadow-black/5 border border-[#E8D5B0] relative overflow-hidden mb-16 mt-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#FDF0DC] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-70 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FDF0DC] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-70 pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                {activeProduct.popular && (
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#B45309] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-8 shadow-md font-sans">
                    <Star className="w-4 h-4 fill-white" /> Sản phẩm được săn đón nhất
                  </span>
                )}

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A0A00] mb-10 font-sans">
                  {activeProduct.name}
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10">
                  <div className="flex flex-col items-center">
                    <span className="text-[#8C6040] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Quy mô / Diện tích</span>
                    <span className="text-[#1A0A00] text-2xl md:text-3xl font-bold font-sans">{activeProduct.area}</span>
                  </div>
                  <div className="w-full h-px md:w-px md:h-16 bg-[#E8D5B0] max-w-[200px]" />
                  <div className="flex flex-col items-center">
                    <span className="text-[#8C6040] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Giá tham khảo</span>
                    <span className="text-[#B45309] text-3xl md:text-5xl font-bold font-sans">{activeProduct.price}</span>
                  </div>
                </div>

                <div className="relative py-8 mb-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full border-t border-[#E8D5B0]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-8 text-[#5C3A1E] italic text-lg md:text-xl font-medium font-sans text-center">
                      "{activeProduct.description}"
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                  {activeProduct.features.map((f) => (
                    <div key={f} className="flex flex-col items-center justify-center text-center bg-[#FDF0DC]/60 p-5 md:p-6 rounded-3xl border border-[#E8D5B0]/80 hover:bg-[#FDF0DC] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                        <Check className="w-5 h-5 text-[#B45309]" />
                      </div>
                      <span className="text-[#1A0A00] text-sm font-bold leading-snug font-sans">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a href="#contact"
                    onClick={() => setFormData(prev => ({ ...prev, product: activeProduct.id }))}
                    className="inline-flex items-center gap-3 bg-[#1A0A00] text-white font-bold text-sm uppercase tracking-widest px-10 py-5 md:py-6 rounded-full hover:bg-[#B45309] transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(180,83,9,0.4)] hover:-translate-y-1 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B45309]">
                    Đăng Ký Tư Vấn {activeProduct.name} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mặt bằng tổng thể */}
          <Reveal direction="up" delay={0.25}>
            <div className="bg-gradient-to-br from-[#FDF0DC] to-[#FBF5EE] rounded-[2.5rem] pt-12 pb-6 border border-[#E8D5B0] shadow-lg">
              <h3 className="text-2xl md:text-4xl font-bold text-[#1A0A00] mb-6 font-sans text-center px-4">
                Mặt Bằng Tổng Thể Dự Án
              </h3>
              <CoverflowCarousel items={floorPlans} imageFit="contain" showTextOutside={true} />
            </div>
          </Reveal>

          {/* Phối Cảnh */}
          <Reveal direction="up" delay={0.3} className="mt-24 pt-24 border-t border-[#E8D5B0]" id="showroom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#B45309]" />
                <span className="text-[#B45309] text-xs font-bold tracking-[0.2em] uppercase font-sans">Không Gian Dự Án</span>
                <div className="h-px w-12 bg-[#B45309]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A0A00] mb-6 leading-tight font-sans">
                Phối Cảnh Dự Án
              </h2>
              <p className="text-[#5C3A1E] text-base md:text-lg leading-relaxed font-sans">
                Cập nhật hình ảnh phối cảnh và không gian tiện ích của Thanh Phú Centre Point — đại đô thị thương mại đang được kiến tạo tại cửa ngõ Tây TP.HCM.
              </p>
            </div>
            
            <CoverflowCarousel items={showroomGallery} imageFit="cover" showTextOutside={true} />
          </Reveal>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section id="amenities" className="py-20 md:py-32 bg-[#1A0A00] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#B45309]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[#F59E0B]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#F59E0B]" />
                <span className="text-[#F59E0B] text-xs font-bold tracking-[0.2em] uppercase font-sans">Hệ Sinh Thái Tiện Ích</span>
                <div className="h-px w-12 bg-[#F59E0B]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
                Đại Đô Thị Giao Thương
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Mega Mall 9,5ha, hồ sinh thái 3,8ha, công viên trung tâm 8ha, không gian sự kiện 10.000 người — hệ sinh thái tiện ích đẳng cấp quốc tế.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up">
            <div 
              className="relative rounded-3xl overflow-hidden mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-[#1A0A00] cursor-zoom-in"
              onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/matbang-tienich.jpg", alt: "Sơ đồ tiện ích nội khu — Thanh Phú Centre Point" })}
            >
              <Image src="/thanh-phu-centre-point/matbang-tienich.jpg"
                alt="Tổng quan tiện ích Thanh Phú Centre Point" width={1400} height={700}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
              
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 pointer-events-none">
                 <div className="bg-[#F59E0B]/90 backdrop-blur-sm text-[#1A0A00] p-5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                     <Maximize2 size={32} />
                 </div>
              </div>
            </div>
            <p className="text-center text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-20 font-sans">Sơ đồ tiện ích nội khu — Thanh Phú Centre Point</p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mb-20">
              <p className="text-center text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 font-sans">Khám phá không gian tiện ích đẳng cấp</p>
              <CoverflowCarousel items={amenitiesGallery} imageFit="cover" isDark={true} showTextOutside={true} />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 mb-16">
            {highlightAmenities.map((item, idx) => (
              <Reveal key={item.label} direction="up" delay={idx * 0.05}>
                <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 text-center hover:bg-white/10 border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-300 hover:-translate-y-1.5 cursor-default">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-xl bg-[#F59E0B]/10 group-hover:bg-[#F59E0B] flex items-center justify-center mb-4 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-[#F59E0B] group-hover:text-[#1A0A00] transition-colors" />
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
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#F59E0B]/15 flex items-center justify-center mb-6 group-hover:bg-[#F59E0B] transition-colors duration-300">
                    <cat.icon className="w-7 h-7 text-[#F59E0B] group-hover:text-[#1A0A00] transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-6 font-sans">{cat.title}</h3>
                  <ul className="space-y-4">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/70 text-sm md:text-base group-hover:text-white/90 transition-colors font-sans">
                        <Check className="w-5 h-5 text-[#F59E0B] shrink-0" />
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

      {/* ADDITIONAL FORM 2: DARK PROMO FORM */}
      <section className="relative py-20 bg-[#0D0500] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B45309]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-gradient-to-r from-[#2D1200] to-[#1A0A00] border border-white/10 rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center max-w-5xl mx-auto">
            <div className="w-16 h-16 bg-[#F59E0B]/20 rounded-full flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans">Nhận Ưu Đãi Đặc Quyền Ra Mắt</h3>
            <p className="text-white/70 text-lg mb-10 max-w-2xl font-sans">Chỉ dành cho khách hàng đăng ký sớm: Nhận ngay bảng giá gốc từ chủ đầu tư BIM Land và chính sách thanh toán ưu đãi đặc biệt.</p>
            
            <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input 
                required
                placeholder="Số điện thoại của bạn"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-white/5 border-white/20 h-16 rounded-2xl text-white placeholder:text-white/30 focus-visible:ring-[#F59E0B]"
              />
              <div className="relative">
                <select 
                  value={formData.product} 
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full h-16 rounded-2xl bg-white/5 border border-white/20 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#1A0A00]">Chọn loại sản phẩm</option>
                  <option value="lienke" className="bg-[#1A0A00]">Nhà phố liền kề</option>
                  <option value="shophouse" className="bg-[#1A0A00]">Shophouse / StripMall</option>
                  <option value="villa" className="bg-[#1A0A00]">Biệt thự Villa</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="h-16 bg-[#F59E0B] hover:bg-[#D97706] text-[#1A0A00] rounded-2xl font-bold text-lg uppercase tracking-widest transition-all">
                {isSubmitting ? "Đang xử lý..." : "Nhận Ưu Đãi Ngay"}
              </Button>
            </form>
            <p className="mt-6 text-white/40 text-sm font-sans flex items-center gap-2">
              <Clock className="w-4 h-4" /> Ưu đãi ra mắt — số lượng có hạn
            </p>
          </div>
        </div>
      </section>

      {/* PROGRESS & LEGAL */}
      <section id="progress" className="py-20 md:py-32 bg-[#FDF0DC] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#B45309]" />
                <span className="text-[#B45309] text-xs font-bold tracking-[0.2em] uppercase font-sans">Bảo Chứng Niềm Tin</span>
                <div className="h-px w-12 bg-[#B45309]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A00] mb-6 leading-tight font-sans">
                Pháp Lý & Tiến Độ
              </h2>
              <p className="text-[#5C3A1E] text-base md:text-lg leading-relaxed font-sans">
                BIM Land — thành viên Tập đoàn BIM Group với hơn 30 năm kinh nghiệm, đã phát triển thành công Halong Marina, Phú Quốc và nhiều đại đô thị biểu tượng trên cả nước.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <Hammer className="text-[#B45309] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A0A00] font-sans">Tiến Độ Triển Khai</h3>
                </div>

                <div className="relative pl-6 md:pl-10 space-y-0">
                  {milestones.map((m, idx) => (
                    <div key={m.id} className="relative pb-10 last:pb-0">
                      {idx < milestones.length - 1 && (
                        <div className="absolute left-[-27px] md:left-[-35px] top-6 bottom-0 w-1 bg-[#E8D5B0] rounded-full" />
                      )}
                      <div className={cn(
                        "absolute -left-[33px] md:-left-[41px] top-1 w-7 h-7 rounded-full border-4 border-[#FDF0DC] flex items-center justify-center z-10 shadow-sm",
                        m.status === "completed" ? "bg-[#B45309]"
                          : m.status === "in-progress" ? "bg-[#F59E0B] ring-4 ring-[#F59E0B]/20"
                          : "bg-[#E8D5B0]"
                      )}>
                        {m.status === "in-progress" && (
                          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                        )}
                      </div>

                      <div className={cn(
                        "rounded-3xl p-6 md:p-8 border transition-all duration-300",
                        m.status === "in-progress" ? "bg-white border-[#F59E0B]/40 shadow-xl scale-[1.02]"
                          : m.status === "completed" ? "bg-[#FBF0E0] border-[#B45309]/20 shadow-sm"
                          : "bg-white border-[#E8D5B0] shadow-sm opacity-80"
                      )}>
                        <span className={cn(
                          "inline-block text-[11px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 font-sans",
                          m.status === "completed" ? "bg-[#B45309]/15 text-[#B45309]"
                            : m.status === "in-progress" ? "bg-[#F59E0B]/15 text-[#92400E]"
                            : "bg-[#FDF0DC] text-[#8C6040]"
                        )}>
                          {m.date}
                        </span>
                        <h4 className="text-lg md:text-xl font-bold text-[#1A0A00] mb-2 font-sans">{m.title}</h4>
                        <p className="text-[#5C3A1E] text-sm md:text-base leading-relaxed font-sans">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8 md:space-y-10">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#E8D5B0]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#FDF0DC] rounded-2xl flex items-center justify-center shrink-0">
                      <Shield className="text-[#B45309] w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1A0A00] font-sans">Hồ Sơ Pháp Lý</h3>
                  </div>
                  <ul className="space-y-4">
                    {legalDocuments.map((doc) => (
                      <li key={doc} className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[#FDF0DC] hover:bg-[#F5E0B0]/50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#B45309]/20 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-[#B45309]" />
                        </div>
                        <span className="text-[#1A0A00] font-semibold text-sm md:text-base leading-relaxed font-sans">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative bg-[#1A0A00] rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#B45309] rounded-full blur-[80px] opacity-50 pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#F59E0B] rounded-full blur-[80px] opacity-30 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                        <BarChart2 className="text-[#F59E0B] w-6 h-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-sans">Chính Sách Tài Chính</h3>
                    </div>

                    <div className="space-y-5">
                      {[
                        { rate: "Linh hoạt", title: "Chính sách thanh toán nhiều đợt", desc: "Áp dụng theo tiến độ xây dựng và có thể kết thúc sớm khi đủ số lượng. Liên hệ CĐT để nhận bảng giá gốc." },
                        { rate: "BIM Group", title: "Chủ đầu tư uy tín 30+ năm", desc: "Đơn vị đã phát triển thành công Halong Marina 248ha, Phú Quốc, Thanh Xuân Valley và nhiều dự án biểu tượng." },
                      ].map((item) => (
                        <div key={item.rate} className="flex items-center gap-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                            <span className="text-sm md:text-base font-bold text-[#F59E0B] font-sans text-center leading-tight px-1">{item.rate}</span>
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
      <section id="contact" className="py-20 md:py-32 bg-[#FDF0DC] border-t border-[#E8D5B0] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#B45309]/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-[#B45309]" />
                  <span className="text-[#B45309] text-xs font-bold tracking-[0.2em] uppercase font-sans">Liên Hệ Ngay Hôm Nay</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A0A00] mb-6 leading-tight font-sans text-balance">
                  Giữ Chỗ Sản Phẩm Đẹp, Nhận Chiết Khấu Đặc Biệt.
                </h2>
                <p className="text-[#5C3A1E] text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-sans max-w-lg">
                  Đăng ký ngay để nhận trọn bộ tài liệu dự án, mặt bằng chi tiết và bảng giá ưu đãi trực tiếp từ chủ đầu tư BIM Land (Tập đoàn BIM Group).
                </p>

                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Hotline CSKH 24/7", value: "0901 234 567", href: "tel:0901234567", isLarge: true },
                    { icon: Mail, label: "Email Hỗ Trợ", value: "info@thanhphucentrepoint.vn", href: "mailto:info@thanhphucentrepoint.vn", isLarge: false },
                  ].map((c) => (
                    <a key={c.label} href={c.href} className="flex items-center gap-5 bg-white p-6 rounded-3xl border border-[#E8D5B0] hover:border-[#B45309]/40 hover:shadow-xl transition-all duration-300 group outline-none focus:ring-2 focus:ring-[#B45309]">
                      <div className="w-14 h-14 bg-[#FDF0DC] group-hover:bg-[#B45309] rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm">
                        <c.icon className="w-6 h-6 text-[#B45309] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[#8C6040] text-xs font-bold uppercase tracking-widest mb-1 font-sans">{c.label}</p>
                        <p className={cn("font-bold text-[#1A0A00] group-hover:text-[#B45309] transition-colors font-sans", c.isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>
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
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-2xl border border-[#E8D5B0]">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1A0A00] mb-8 md:mb-10 text-center font-sans">
                  Đăng Ký Tư Vấn
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#B45309]/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <Check className="w-10 h-10 md:w-12 md:h-12 text-[#B45309]" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#1A0A00] mb-3 font-sans">Đăng Ký Thành Công!</h4>
                    <p className="text-[#5C3A1E] text-base mb-8 leading-relaxed font-sans">Chuyên viên BIM Land sẽ gọi lại cho quý khách trong thời gian sớm nhất.</p>
                    <button onClick={() => setIsSubmitted(false)} className="text-[#B45309] font-bold text-base underline underline-offset-4 hover:text-[#92400E] transition-colors font-sans focus:outline-none focus:ring-2 focus:ring-[#B45309] rounded-md px-2 py-1">
                      Đăng ký thêm thông tin khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                    <div>
                      <label className="block text-xs font-bold text-[#5C3A1E] uppercase tracking-widest mb-2.5">Họ và tên <span className="text-[#B45309]">*</span></label>
                      <Input required placeholder="Nhập họ và tên của bạn..."
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#FBF5EE] border-transparent py-6 focus-visible:ring-[#B45309] focus-visible:ring-2 placeholder:text-[#C8A870] text-sm md:text-base rounded-xl" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#5C3A1E] uppercase tracking-widest mb-2.5">Điện thoại <span className="text-[#B45309]">*</span></label>
                        <Input required type="tel" placeholder="09xx..."
                          value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-[#FBF5EE] border-transparent py-6 focus-visible:ring-[#B45309] focus-visible:ring-2 placeholder:text-[#C8A870] text-sm md:text-base rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5C3A1E] uppercase tracking-widest mb-2.5">Sản phẩm quan tâm</label>
                        <div className="relative">
                          <select value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                            className="w-full h-[50px] rounded-xl bg-[#FBF5EE] border-0 px-4 text-sm md:text-base text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#B45309] appearance-none cursor-pointer">
                            <option value="">Chọn loại sản phẩm...</option>
                            <option value="lienke">Nhà phố liền kề</option>
                            <option value="shophouse">Shophouse / StripMall</option>
                            <option value="villa">Biệt thự Villa</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6040] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5C3A1E] uppercase tracking-widest mb-2.5">Email <span className="text-[#8C6040] normal-case tracking-normal font-normal">(Tùy chọn)</span></label>
                      <Input type="email" placeholder="Để nhận tài liệu qua email..."
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#FBF5EE] border-transparent py-6 focus-visible:ring-[#B45309] focus-visible:ring-2 placeholder:text-[#C8A870] text-sm md:text-base rounded-xl" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5C3A1E] uppercase tracking-widest mb-2.5">Ghi chú thêm</label>
                      <textarea rows={3} placeholder="Bạn cần tư vấn vấn đề gì..."
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border-0 bg-[#FBF5EE] px-4 py-4 text-sm md:text-base text-[#1A0A00] placeholder:text-[#C8A870] focus:outline-none focus:ring-2 focus:ring-[#B45309] resize-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className={cn(
                        "w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B45309]",
                        isSubmitting
                          ? "bg-[#B45309]/50 cursor-not-allowed"
                          : "bg-[#B45309] hover:bg-[#92400E] shadow-[0_10px_30px_rgba(180,83,9,0.3)] hover:shadow-[0_15px_40px_rgba(180,83,9,0.4)] hover:-translate-y-1"
                      )}>
                      {isSubmitting ? (
                        <><span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> Đang gửi...</>
                      ) : (
                        <><Send size={18} /> Nhận Thông Tin Ngay</>
                      )}
                    </button>
                    <p className="text-center text-xs text-[#8C6040] mt-4 font-sans flex items-center justify-center gap-1.5">
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
      <ZaloButton />

      {/* Modal Phóng To Ảnh Dùng Chung */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[100] bg-[#1A0A00]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-300" 
             onClick={() => setZoomedImage(null)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-[#B45309] text-white rounded-full p-3 transition-colors z-50 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
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