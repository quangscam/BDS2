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

/* ─────────────────────────────────────────────
   COLOR TOKENS  (tím #27003E + gold #C9A84C)
   ─────────────────────────────────────────────
   bg-primary      → #27003E   (tím đậm chủ đạo)
   bg-primary-deep → #180026   (tím sâu, dark bg)
   accent          → #C9A84C   (gold)
   accent-light    → #F0D98A   (gold sáng)
   surface         → #F5EFF8   (nền tím nhạt)
   surface-mid     → #E8DAF0   (border / hover)
   text-main       → #180026
   text-sub        → #4A2060
   text-muted      → #9370A8
*/

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
                  isDark ? "bg-black/20 border border-white/10" : "bg-white border border-[#E8DAF0]",
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180026]/90 via-transparent to-transparent pointer-events-none" />
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
                        isDark ? "bg-white/15 backdrop-blur-md text-white border border-white/20" : "bg-white text-[#27003E] border border-[#E8DAF0]"
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
              isDark ? "bg-black/60 backdrop-blur-sm text-white border border-white/20" : "bg-white text-[#27003E] border border-[#E8DAF0]"
            )}>{displayItems[currentIndex]?.title}</p>
          </div>
        )}

        <button onClick={prev} className={cn("absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#C9A84C] hover:text-[#180026]" : "bg-white/90 backdrop-blur shadow-lg border border-[#E8DAF0] text-[#27003E] hover:bg-[#27003E] hover:text-white")}>
          <ArrowLeft size={20} />
        </button>
        <button onClick={next} className={cn("absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#C9A84C] hover:text-[#180026]" : "bg-white/90 backdrop-blur shadow-lg border border-[#E8DAF0] text-[#27003E] hover:bg-[#27003E] hover:text-white")}>
          <ArrowRight size={20} />
        </button>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300"
          style={{ backgroundColor: 'rgba(24,0,38,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#180026] rounded-full p-3 transition-colors z-50"
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
  { href: "#showroom", label: "Phối Cảnh" },
  { href: "#amenities", label: "Tiện Ích" },
]

const features = [
  {
    icon: Building2,
    title: "Đô Thị Tích Hợp Đầu Tiên Khu Tây",
    description: "Cấu trúc độc bản '01 Trục Đô Thị – 03 Tầng Giao Thương – 06 Cộng Đồng', định hình tiêu chuẩn đô thị mới cho cửa ngõ phía Tây TP.HCM."
  },
  {
    icon: Shield,
    title: "Pháp Lý Minh Bạch, Sổ Hồng Lâu Dài",
    description: "Quyết định giao đất, Quy hoạch 1/500 và Quyết định chấp thuận chủ trương đầu tư đã được phê duyệt đầy đủ. Khởi công chính thức 22/03/2026."
  },
  {
    icon: Car,
    title: "Đón Đầu 3 Tuyến Hạ Tầng Trọng Điểm",
    description: "Kết nối trực tiếp Cao tốc TP.HCM – Trung Lương, Vành đai 3 (đang triển khai 76km) và tuyến Bến Lức – Long Thành — hành lang tăng trưởng 2025–2035."
  },
  {
    icon: Sparkles,
    title: "Kiến Trúc Địa Trung Hải Đẳng Cấp",
    description: "Thiết kế bởi Codinachs Architects (Tây Ban Nha – 50 năm) & Broadway Malyan (Anh Quốc – 69 năm), phong cách Modern Mediterranean độc quyền tại Việt Nam."
  },
]

const connections = [
  {
    icon: Car,
    title: "5 Phút Ra Cao Tốc TP.HCM – Trung Lương",
    description: "Liên kết tức thì với toàn bộ vùng kinh tế Tây Nam Bộ. Đón đầu Vành đai 3 (76km đang triển khai) và Vành đai 4 gia tăng kết nối liên vùng bứt phá."
  },
  {
    icon: Building,
    title: "Trung Tâm Logistics Mekong Delta",
    description: "Bến Lức là 'bàn xoay' trung chuyển hàng hóa kết nối TP.HCM – Đông Nam Bộ – toàn vùng đồng bằng sông Cửu Long, tiếp giáp 40+ khu công nghiệp lớn."
  },
  {
    icon: Clock,
    title: "35 Phút Đến Trung Tâm Quận 1",
    description: "Mặt tiền đường Nguyễn Hữu Trí — trục giao thương huyết mạch cửa ngõ Tây. Khu vực được quy hoạch là đô thị vệ tinh kiểu mẫu giai đoạn 2025–2035."
  },
]

const nearbyPlaces = [
  { name: "Cao tốc Trung Lương", time: "5 phút" },
  { name: "Campus Y tế Tây TP.HCM", time: "15 phút" },
  { name: "Bến xe Miền Tây", time: "20 phút" },
  { name: "Quận 7 TP.HCM", time: "30 phút" },
  { name: "Trung tâm Quận 1", time: "35 phút" },
  { name: "Sân bay Long Thành", time: "45 phút" },
]

const productTypes = [
  {
    id: "nhaphothuongmai", name: "Nhà Phố Thương Mại", area: "Trục đường 30m–40m", price: "Liên hệ CĐT",
    description: "Sản phẩm thương mại mặt tiền trục chính — khai thác kinh doanh tầng trệt, kết hợp ở hoặc cho thuê các tầng trên với thiết kế kính lớn tràn trần đặc trưng Địa Trung Hải.",
    features: ["Xây tối đa 4 tầng", "Mật độ XD tối đa 85%", "Mặt tiền kính lớn tràn trần", "Vỉa hè rộng — đón dòng khách"],
    popular: true,
    gallery: [
      { src: "/thanh-phu-centre-point/tsnhaphothuongmai.png", title: "Mặt Bằng Nhà Phố Thương Mại" },
      { src: "/thanh-phu-centre-point/nhaphothuongmai.jpg", title: "Mặt Bằng Nhà Phố Thương Mại" },
      { src: "/thanh-phu-centre-point/nhaphothuongmai1.jpg", title: "Thiết Kế Tầng Trệt Thương Mại" },
    ]
  },
  {
    id: "lienke", name: "Nhà Phố Liền Kề", area: "~5,14 ha — 607 căn", price: "Liên hệ CĐT",
    description: "Phân khu Hội Phú — 'Trái tim sống' của Thanh Phú Centre Point. Bố trí block song song quanh hồ sinh thái, tối ưu đối lưu không khí tự nhiên với khoảng lùi tiểu cảnh trước và sau.",
    features: ["Xây tối đa 5 tầng", "Mật độ XD tối đa 90%", "Khoảng lùi cây xanh tiểu cảnh", "Sổ hồng lâu dài, pháp lý sạch"],
    popular: false,
    gallery: [
      { src: "/thanh-phu-centre-point/tsnhapholienke.png", title: "Mặt Bằng Nhà Phố Liền Kề" },
      { src: "/thanh-phu-centre-point/nhapholienke.jpg", title: "Mặt Bằng Nhà Phố Liền Kề" },
      { src: "/thanh-phu-centre-point/nhapholienke1.jpg", title: "Thiết Kế Nội Thất Liền Kề" },
    ]
  },
  {
    id: "bietthusinhthai", name: "Biệt Thự Sinh Thái", area: "~4,75 ha — 313 căn", price: "Liên hệ CĐT",
    description: "Phân khu An Phú — biệt thự đơn lập & song lập phong cách Địa Trung Hải, view hồ sinh thái 3,8ha & kênh Học Trò. Đặc quyền sử dụng Clubhouse 3.400m² và hồ bơi nổi đầu tiên Việt Nam.",
    features: ["Villa đơn lập & song lập", "Sân vườn view hồ sinh thái", "Clubhouse 3.400m² đẳng cấp 5*", "Kiến trúc Codinachs – Tây Ban Nha"],
    popular: false,
    gallery: [
      { src: "/thanh-phu-centre-point/tsvilla.png", title: "Mặt Bằng Biệt Thự Sinh Thái" },
      { src: "/thanh-phu-centre-point/villa.jpg", title: "Mặt Bằng Biệt Thự Đơn Lập" },
      { src: "/thanh-phu-centre-point/villa1.jpg", title: "Khu Clubhouse & Hồ Sinh Thái" },
    ]
  },
  {
    id: "stripmall", name: "Strip Mall", area: "~331 căn — Phân khu Thương Phú", price: "Liên hệ CĐT",
    description: "Phân khu Thương Phú — mô hình tổ hợp mua sắm mở (StripMall) duy nhất khu vực. Thiết kế kính tràn trần, đỗ xe ngay trước cửa, đón dòng khách từ Cao tốc và Vành đai 3.",
    features: ["Xây tối đa 3 tầng", "Mật độ XD tối đa 80%", "Trục thương mại 30m–40m", "Mô hình StripMall độc quyền"],
    popular: false,
    gallery: [
      { src: "/thanh-phu-centre-point/tsstripmall.png", title: "Mặt Bằng Strip Mall" },
      { src: "/thanh-phu-centre-point/stripmall.jpg", title: "Mặt Bằng Strip Mall" },
      { src: "/thanh-phu-centre-point/stripmall1.jpg", title: "Phối Cảnh Strip Mall" },
    ]
  },
]

const showroomGallery = [
  { src: "/thanh-phu-centre-point/phoicanhduan1.jpg", title: "Phối Cảnh Tổng Thể" },
  { src: "/thanh-phu-centre-point/phoicanhduan2.jpg", title: "Mega Mall 9,5ha — Trung Tâm Thương Mại" },
  { src: "/thanh-phu-centre-point/phoicanhduan3.jpg", title: "Quảng Trường Nhạc Nước 1,2ha" },
  { src: "/thanh-phu-centre-point/nhapholienke.jpg", title: "Phối Cảnh Nhà Phố Liền Kề" },
  { src: "/thanh-phu-centre-point/nhaphothuongmai.jpg", title: "Phối Cảnh Nhà Phố Thương Mại" },
  { src: "/thanh-phu-centre-point/villa.jpg", title: "Phối Cảnh Villa" },
]

const floorPlans = [
  { src: "/thanh-phu-centre-point/matbang.png", title: "Mặt Bằng Tổng Thể Dự Án" },
  { src: "/thanh-phu-centre-point/matbang1.png", title: "Mặt Bằng Giai Đoạn 1 — 85ha" },
  { src: "/thanh-phu-centre-point/matbang2.png", title: "Phân Khu Hội Phú — Nhà Phố Liền Kề" },
  { src: "/thanh-phu-centre-point/matbang3.png", title: "Phân Khu An Phú — Biệt Thự & Clubhouse" },
]

const amenitiesGallery = [
  { src: "/thanh-phu-centre-point/tienich1.jpg", title: "01 — ĐẠI SIÊU THỊ MEGA MALL 9,5HA" },
  { src: "/thanh-phu-centre-point/tienich2.jpg", title: "02 — HỒ BƠI NỔI TRÊN HỒ 3.300M² (ĐẦU TIÊN VN)" },
  { src: "/thanh-phu-centre-point/tienich3.jpg", title: "03 — SHOW NHẠC NƯỚC NGOÀI TRỜI HẰNG ĐÊM" },
  { src: "/thanh-phu-centre-point/tienich4.jpg", title: "04 — QUẢNG TRƯỜNG LỄ HỘI 1,2HA — 10.000 NGƯỜI" },
  { src: "/thanh-phu-centre-point/tienich5.jpg", title: "05 — RESORT TRỊ LIỆU & SPA CAO CẤP" },
  { src: "/thanh-phu-centre-point/tienich6.jpg", title: "06 — HỒ SINH THÁI 3,8HA & CÔNG VIÊN 8HA" },
]

const highlightAmenities = [
  { icon: ShoppingBag, label: "Mega Mall 9,5ha" },
  { icon: Waves, label: "Hồ bơi nổi 3.300m²" },
  { icon: Sparkles, label: "Nhạc nước ngoài trời" },
  { icon: Trees, label: "Hồ sinh thái 3,8ha" },
  { icon: Dumbbell, label: "9 sân đa năng" },
  { icon: Coffee, label: "StripMall & F&B" },
  { icon: GraduationCap, label: "Trường học QT" },
  { icon: Film, label: "Music Stage ngoài trời" },
  { icon: Baby, label: "Khu vui chơi trẻ em" },
  { icon: Shield, label: "An ninh 24/7" },
  { icon: Building2, label: "Clubhouse 5 sao" },
  { icon: Stethoscope, label: "Resort trị liệu" },
]

const amenityCategories = [
  {
    title: "Thương Mại & Mua Sắm",
    icon: ShoppingBag,
    items: ["Mega Mall 9,5ha — hàng trăm thương hiệu quốc tế", "Tổ hợp StripMall phố mua sắm mở", "Chuỗi F&B & ẩm thực đa phong cách", "Khách sạn Luxury Hotel cao cấp"]
  },
  {
    title: "Văn Hóa & Lễ Hội",
    icon: Film,
    items: ["Show nhạc nước ngoài trời hằng đêm trên hồ", "Quảng trường sự kiện 1,2ha — 10.000 chỗ", "Music Stage — sân khấu âm nhạc lớn", "Cầu Rồng biểu tượng — điểm check-in"]
  },
  {
    title: "Thể Thao & Sức Khỏe",
    icon: Dumbbell,
    items: ["Hồ bơi nổi trên hồ 3.300m² — đầu tiên Việt Nam", "9 sân thi đấu đa năng nội khu", "2 sân Pickleball tiêu chuẩn quốc tế", "Resort trị liệu cao cấp & Spa"]
  },
  {
    title: "Giáo Dục & Cộng Đồng",
    icon: GraduationCap,
    items: ["Trường học liên cấp tiêu chuẩn quốc tế", "Clubhouse 3.400m² đẳng cấp 5 sao", "Công viên trung tâm 8ha & hành lang xanh", "Khu thể thao & vui chơi mặt nước"]
  },
]

const milestones = [
  {
    id: 1, title: "Hoàn Thiện Pháp Lý Toàn Bộ", date: "Đã hoàn thành",
    description: "Quyết định giao đất, Quy hoạch chi tiết 1/500 và Quyết định chấp thuận chủ trương đầu tư số 7500/QĐ–UBND (27/06/2025) đã được UBND tỉnh Long An phê duyệt.",
    status: "completed"
  },
  {
    id: 2, title: "Khởi Công Chính Thức", date: "22/03/2026 — Đã khởi công",
    description: "BIM Land chính thức khởi công tại xã Bến Lức với sự tham dự của lãnh đạo địa phương và các đối tác Hòa Bình & Khang Thành Construction. Giai đoạn 1: Miền Thương Phú 85ha.",
    status: "in-progress"
  },
  {
    id: 3, title: "Mở Bán & Ký HĐMB", date: "Giữa – cuối 2026",
    description: "Ra mắt chính thức toàn bộ sản phẩm Nhà Phố Thương Mại, Nhà Phố Liền Kề, Biệt Thự và StripMall. Ký hợp đồng mua bán với thanh toán 10 đợt linh hoạt.",
    status: "upcoming"
  },
  {
    id: 4, title: "Bàn Giao & Kích Hoạt Đô Thị", date: "Dự kiến 2027–2029",
    description: "Bàn giao sản phẩm theo tiến độ. Mega Mall, Clubhouse và các tiện ích biểu tượng đi vào vận hành, hình thành cộng đồng cư dân sầm uất tại cửa ngõ phía Tây.",
    status: "upcoming"
  },
]

const legalDocuments = [
  "Quyết định chấp thuận chủ trương đầu tư số 8909/QĐ-UBND (28/09/2023) và số 7500/QĐ-UBND (27/06/2025)",
  "Quy hoạch chi tiết tổng mặt bằng tỷ lệ 1/500 đã được phê duyệt chính thức",
  "Quyết định giao đất hợp lệ — Chủ đầu tư: Công ty CP BEHS (thành viên BIM Land)",
  "Dự án đã khởi công ngày 22/03/2026 — Nhà thầu Hòa Bình & Khang Thành",
]

/* ─── Main Component ─── */
export default function ThanhPhuCentrePointLandingPage() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("nhaphothuongmai")
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", product: "", message: "",
    subject: "Đăng ký tư vấn dự án Thanh Phú Centre Point"
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
          setFormData({ name: '', email: '', phone: '', product: '', message: '', subject: 'Đăng ký tư vấn dự án Thanh Phú Centre Point' })
          setIsSubmitted(false)
        }, 4000)
      } else { alert("Có lỗi từ máy chủ. Vui lòng thử lại!") }
    } catch { alert("Lỗi kết nối. Không thể đăng ký lúc này.") }
    finally { setIsSubmitting(false) }
  }

  const activeProduct = productTypes.find(p => p.id === selectedProduct) || productTypes[0]

  return (
    <main className="min-h-screen bg-[#F5EFF8] overflow-x-hidden selection:bg-[#27003E] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ── Header & Nav ── */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-[#E8DAF0]/60" : "bg-transparent"
      )}>
        <Header />
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-10 py-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-xs lg:text-sm font-bold text-[#4A2060] hover:text-[#27003E] tracking-[0.1em] uppercase transition-colors relative group font-sans">
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a href="#contact"
                className="ml-4 text-xs font-bold bg-[#27003E] text-white px-6 py-3 rounded-full tracking-[0.1em] uppercase hover:bg-[#3D0060] transition-all shadow-md hover:shadow-xl hover:shadow-[#27003E]/30 hover:-translate-y-0.5 font-sans">
                Nhận Bảng Giá
              </a>
            </nav>

            <div className="md:hidden flex items-center justify-between py-3">
              <span className="text-[#27003E] font-bold text-base tracking-wider font-sans">THANH PHÚ CENTRE POINT</span>
              <div className="flex items-center gap-3">
                <a href="#contact" className="text-xs font-bold bg-[#27003E] text-white px-5 py-2.5 rounded-full tracking-wider uppercase font-sans shadow-sm">
                  Đăng Ký
                </a>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#E8DAF0] hover:bg-[#D5C0E8] transition-colors">
                  <span className={cn("w-5 h-0.5 bg-[#27003E] transition-all duration-300", mobileMenuOpen && "rotate-45 translate-y-2")} />
                  <span className={cn("w-5 h-0.5 bg-[#27003E] transition-all duration-300", mobileMenuOpen && "opacity-0")} />
                  <span className={cn("w-5 h-0.5 bg-[#27003E] transition-all duration-300", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-[#E8DAF0] shadow-lg py-2 px-4 flex flex-col z-50">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="block py-3.5 px-2 text-sm font-bold text-[#4A2060] hover:text-[#27003E] hover:bg-[#F5EFF8]/50 rounded-lg tracking-wider uppercase font-sans transition-colors">
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
          <Image src="/thanh-phu-centre-point/tongquan.jpg" alt="Tổng quan Thanh Phú Centre Point" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180026] via-[#180026]/65 to-[#27003E]/30" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>

        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent z-10" />

        <div className={cn(
          "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-1000",
          isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex items-center gap-2 border border-[#C9A84C]/50 rounded-full px-5 py-2.5 bg-[#C9A84C]/10 backdrop-blur-md">
              <Star className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase font-sans">Đại Đô Thị Giao Thương — Cửa Ngõ Tây TP.HCM</span>
              <Star className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
            </div>
          </div>

          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-none font-sans drop-shadow-lg">
            THANH PHÚ<br className="sm:hidden" /> <span className="text-[#C9A84C]">CENTRE POINT</span>
          </h1>
          <p className="text-center text-white/90 text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-4 md:mb-5 font-medium font-sans">
            Biểu tượng giao thương mới — Sôi động quốc tế, trù phú Mekong
          </p>
          <div className="flex items-center justify-center gap-2 mb-8 md:mb-12">
            <MapPin size={16} className="text-[#C9A84C] shrink-0" />
            <p className="text-white/70 text-sm sm:text-base font-sans">Đường Nguyễn Hữu Trí, xã Bến Lức, Long An — Cửa ngõ phía Tây TP.HCM</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 md:mb-14">
            {[
              { value: "200ha", unit: "Tổng quy mô", label: "đô thị tích hợp" },
              { value: "1.251", unit: "Sản phẩm GĐ1", label: "thấp tầng tinh hoa" },
              { value: "14,41%", unit: "Mật độ XD", label: "phần lớn cho cảnh quan" },
              { value: "48%", unit: "Tỷ lệ tiện ích", label: "xanh & mặt nước" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 hover:bg-white/10 hover:border-[#C9A84C]/40 transition-all duration-300">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C9A84C] leading-none mb-1 font-sans drop-shadow-sm">{stat.value}</p>
                <p className="text-white/80 text-xs uppercase tracking-wider font-bold font-sans">{stat.unit}</p>
                <p className="text-white/50 text-[11px] mt-1 font-sans">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8953e] text-[#180026] font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all hover:shadow-[0_8px_30px_rgb(201,168,76,0.4)] hover:-translate-y-1 font-sans">
              Nhận Thông Tin Ưu Đãi <ArrowRight size={18} />
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
                <div className="h-px w-12 bg-[#27003E]" />
                <span className="text-[#27003E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Tổng Quan Dự Án</span>
                <div className="h-px w-12 bg-[#27003E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#180026] mb-6 leading-tight font-sans">
                Thành Phố Thu Nhỏ<br />Tại Cửa Ngõ Tây Sài Gòn
              </h2>
              <p className="text-[#4A2060] text-base md:text-lg leading-relaxed font-sans">
                Thanh Phú Centre Point là "All-in-one city" quy mô 200ha do BIM Land kiến tạo — nơi giao thương, văn hóa, nghỉ dưỡng và cộng đồng hội tụ trong một hệ sinh thái đô thị hoàn chỉnh tại Bến Lức, Long An.
              </p>
            </div>
          </Reveal>

          {/* Tab Bar */}
          <Reveal direction="up" delay={0.05}>
            <div className="flex justify-center mb-10 md:mb-14">
              <div className="inline-flex bg-[#E8DAF0] rounded-2xl p-1.5 gap-1 shadow-inner">
                {[
                  { key: 'tongquan', label: 'Tổng Quan Dự Án' },
                  { key: 'chudautu', label: 'Chủ Đầu Tư' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setOverviewTab(tab.key as 'tongquan' | 'chudautu')}
                    className={cn(
                      "relative px-7 py-3 rounded-xl text-sm font-bold tracking-wider uppercase font-sans transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#27003E]",
                      overviewTab === tab.key
                        ? "bg-[#27003E] text-white shadow-[0_4px_16px_rgba(39,0,62,0.28)] scale-[1.03]"
                        : "text-[#4A2060] hover:text-[#27003E] hover:bg-white/60"
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
                    className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8DAF0] group cursor-zoom-in"
                    onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/tongquan1.jpg", alt: "Phối cảnh tổng thể Thanh Phú Centre Point" })}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image src="/thanh-phu-centre-point/tongquan1.jpg" alt="Phối cảnh tổng thể" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#180026]/90 via-[#180026]/30 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 pointer-events-none">
                        <div className="bg-[#C9A84C]/90 backdrop-blur-sm text-[#180026] p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Maximize2 size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none z-10">
                      <h3 className="text-white font-bold text-xl md:text-2xl mb-2 font-sans">Mật độ xây dựng thương phẩm chỉ 14,41%</h3>
                      <p className="text-white/80 text-sm md:text-base font-sans">48% diện tích dành cho cảnh quan, tiện ích và mặt nước.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="right">
                  <div className="space-y-8 md:space-y-10">
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                      {[
                        { label: "Chủ đầu tư", value: "Công ty CP BEHS — BIM Land (BIM Group)" },
                        { label: "Thiết kế kiến trúc", value: "Codinachs Architects (Tây Ban Nha) & Benoy" },
                        { label: "Quy hoạch cảnh quan", value: "Broadway Malyan (Anh Quốc)" },
                        { label: "Địa chỉ", value: "Mặt đường Nguyễn Hữu Trí, Bến Lức, Long An" },
                      ].map((item) => (
                        <div key={item.label} className="border-l-[3px] border-[#C9A84C] pl-5 py-1">
                          <p className="text-[#9370A8] text-xs font-bold uppercase tracking-widest mb-1.5 font-sans">{item.label}</p>
                          <p className="text-[#180026] font-bold text-base md:text-lg leading-snug font-sans">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-br from-[#EDE0F5] to-[#F5EFF8] rounded-3xl p-8 md:p-10 border border-[#E8DAF0] shadow-sm">
                      <h3 className="text-xl md:text-2xl font-bold text-[#27003E] mb-6 font-sans">Cấu Trúc Giai Đoạn 1 — Miền Thương Phú (85ha)</h3>
                      <ul className="space-y-5">
                        {[
                          { label: "Phân khu Hội Phú — 607 nhà phố liền kề", desc: "Khu ở 'Trái Tim Sống' ~5,14ha, bố trí block song song quanh hồ sinh thái." },
                          { label: "Phân khu An Phú — 313 biệt thự", desc: "Đơn lập & song lập ~4,75ha view hồ 3,8ha, kết hợp Clubhouse 5 sao & hồ bơi nổi." },
                          { label: "Phân khu Thương Phú — StripMall", desc: "Tổ hợp mua sắm mở độc đáo duy nhất khu vực, trục thương mại 30m–40m sầm uất." },
                          { label: "Cấu trúc '01 Trục – 03 Tầng – 06 Cộng Đồng'", desc: "Quy hoạch đô thị tích hợp, mật độ thương phẩm siêu thấp chuẩn quốc tế." },
                        ].map((item) => (
                          <li key={item.label} className="flex items-start gap-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C] mt-1.5 shrink-0" />
                            <span className="text-[#4A2060] text-base leading-relaxed font-sans">
                              <strong className="text-[#180026] font-bold">{item.label}:</strong> {item.desc}
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
                    <div className="group bg-white rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl border border-[#E8DAF0] hover:border-[#27003E]/30 transition-all duration-300 h-full hover:-translate-y-1.5">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#EDE0F5] group-hover:bg-[#27003E] flex items-center justify-center mb-6 md:mb-8 transition-colors duration-300">
                        <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#27003E] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#180026] mb-3 font-sans">{feature.title}</h3>
                      <p className="text-[#4A2060] text-sm md:text-base leading-relaxed font-sans">{feature.description}</p>
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
                    className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8DAF0] group cursor-zoom-in aspect-[4/3]"
                    onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/tongquan1.jpg", alt: "BIM Land — Chủ đầu tư Thanh Phú Centre Point" })}
                  >
                    <Image src="/thanh-phu-centre-point/bimland.jpg" alt="BIM Land" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180026]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                      <div className="bg-[#C9A84C]/90 text-[#180026] p-4 rounded-full scale-75 group-hover:scale-100 transition-transform"><Maximize2 size={24} /></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
                      <p className="text-white/60 text-xs uppercase tracking-widest font-bold font-sans mb-1">Chủ đầu tư</p>
                      <h3 className="text-white font-bold text-2xl md:text-3xl font-sans">BIM Land</h3>
                      <p className="text-white/75 text-sm font-sans mt-1">Thành viên Tập đoàn BIM Group — 30+ năm kinh nghiệm</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "1994", label: "Năm thành lập" },
                      { value: "9M m²", label: "Quỹ đất BIM Land" },
                      { value: "10+", label: "Quốc gia hoạt động" },
                    ].map((s) => (
                      <div key={s.label} className="text-center bg-[#EDE0F5] rounded-2xl py-5 px-3 border border-[#E8DAF0]">
                        <p className="text-[#27003E] text-2xl md:text-3xl font-bold leading-none font-sans">{s.value}</p>
                        <p className="text-[#9370A8] text-[10px] font-bold uppercase tracking-wider mt-1.5 font-sans leading-snug">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#180026] mb-4 font-sans">BIM Group — Tiên Phong Phát Triển Bền Vững</h3>
                    <p className="text-[#4A2060] text-base leading-relaxed font-sans">
                      Thành lập năm 1994, BIM Group là tập đoàn đa ngành hàng đầu Việt Nam với 4 lĩnh vực cốt lõi: bất động sản, du lịch nghỉ dưỡng, năng lượng tái tạo và nông nghiệp – thực phẩm. BIM Land đã phát triển thành công hàng loạt dự án biểu tượng, đồng thời hợp tác vận hành với Hyatt, IHG và The Ascott.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#EDE0F5] to-[#F5EFF8] rounded-3xl p-8 border border-[#E8DAF0]">
                    <h4 className="text-lg font-bold text-[#27003E] mb-5 font-sans uppercase tracking-wider">Dự Án Tiêu Biểu</h4>
                    <ul className="space-y-4">
                      {[
                        { name: "Halong Marina", detail: "Khu đô thị biển 248ha — biểu tượng Hạ Long, Quảng Ninh." },
                        { name: "InterContinental Halong Bay", detail: "Khách sạn 5 sao, hợp tác vận hành IHG quốc tế." },
                        { name: "BIM Group Phú Quốc", detail: "Quần thể nghỉ dưỡng & đô thị đảo ngọc chuẩn quốc tế." },
                        { name: "Thanh Xuân Valley", detail: "Đô thị sinh thái nghỉ dưỡng — kiến trúc xanh bền vững." },
                      ].map((proj) => (
                        <li key={proj.name} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
                          <span className="text-[#4A2060] text-sm leading-relaxed font-sans">
                            <strong className="text-[#180026] font-bold">{proj.name}:</strong> {proj.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-3xl p-8 border border-[#E8DAF0] shadow-sm">
                    <h4 className="text-lg font-bold text-[#180026] mb-5 font-sans">Đội Ngũ Tư Vấn Quốc Tế</h4>
                    <div className="space-y-4">
                      {[
                        { firm: "Codinachs Architects", country: "Tây Ban Nha", role: "Thiết kế kiến trúc tổng thể — 50 năm kinh nghiệm" },
                        { firm: "Broadway Malyan", country: "Anh Quốc", role: "Quy hoạch đô thị & cảnh quan — 69 năm" },
                        { firm: "Benoy Architects", country: "Anh Quốc", role: "Tư vấn thiết kế kiến trúc bổ sung" },
                        { firm: "BIM Estates Management", country: "BIM Group", role: "Quản lý vận hành chuyên nghiệp dài hạn" },
                      ].map((firm) => (
                        <div key={firm.firm} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F5EFF8] border border-[#E8DAF0] hover:bg-[#EDE0F5] transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-[#EDE0F5] border border-[#E8DAF0] flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5 text-[#27003E]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#180026] font-bold text-sm font-sans">{firm.firm}</p>
                            <p className="text-[#9370A8] text-xs font-sans">{firm.role}</p>
                          </div>
                          <span className="text-[10px] bg-[#27003E]/10 text-[#27003E] border border-[#27003E]/15 px-2.5 py-1 rounded-full font-bold font-sans shrink-0">{firm.country}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a href="#contact" className="inline-flex items-center gap-2 bg-[#27003E] text-white font-bold px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all hover:bg-[#3D0060] hover:shadow-[0_8px_24px_rgba(39,0,62,0.35)] hover:-translate-y-0.5 font-sans">
                    Tìm Hiểu Thêm Về BIM Land <ArrowRight size={16} />
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
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#27003E]/5 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#C9A84C]/6 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up" className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#27003E]/20 bg-[#EDE0F5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27003E] animate-pulse" />
              <span className="text-[#27003E] text-[11px] font-bold uppercase tracking-[0.22em] font-sans">5 Lý do đầu tư Thanh Phú Centre Point</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal direction="left" className="relative h-full flex flex-col justify-center">
              <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none pt-4 pb-10 px-8 lg:pl-4 lg:pr-10">
                <div
                  className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_rgba(24,0,38,0.18)] border border-[#E8DAF0] group cursor-zoom-in"
                  onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/matbang.png", alt: "Thanh Phú Centre Point — Không gian giao thương sầm uất" })}
                >
                  <Image src="/thanh-phu-centre-point/matbang.png" alt="Phối cảnh dự án" fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180026]/75 via-[#180026]/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#27003E]/20 to-transparent mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 pointer-events-none">
                    <div className="bg-[#C9A84C]/90 text-[#180026] p-4 rounded-full shadow-lg scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                  <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-white/15 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/25 pointer-events-none">
                    <ShoppingBag className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase font-sans">Miền Thương Phú — GĐ1</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none">
                    <p className="text-white/55 text-[10px] uppercase tracking-widest font-bold mb-0.5 font-sans">Mặt đường Nguyễn Hữu Trí</p>
                    <p className="text-white font-bold text-base font-sans">Bến Lức, Long An — Khởi công 22/03/2026</p>
                  </div>
                </div>

                {/* Badge: đăng ký */}
                <div className="absolute top-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#E8DAF0] z-20 flex items-center gap-3 pointer-events-none">
                  <div className="flex -space-x-2">
                    {[31, 32, 33, 34].map((u) => (
                      <div key={u} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shrink-0">
                        <img src={`https://i.pravatar.cc/80?u=${u}`} alt="" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[#180026] text-xs font-bold font-sans leading-tight">+200 đăng ký</p>
                    <p className="text-[#9370A8] text-[10px] font-sans">tháng này</p>
                  </div>
                </div>

                {/* Badge: khởi công */}
                <div className="absolute bottom-0 right-0 bg-[#180026] rounded-2xl px-6 py-4 shadow-[0_16px_40px_rgba(24,0,38,0.3)] border border-white/10 z-20 text-right pointer-events-none">
                  <p className="text-white/45 text-[10px] uppercase tracking-widest mb-0.5 font-sans">Khởi công</p>
                  <p className="text-[#C9A84C] text-2xl font-bold leading-none font-sans">22/03</p>
                  <p className="text-white/55 text-[11px] mt-0.5 font-sans">/ 2026</p>
                  <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-[#27003E] flex items-center justify-center shadow-md">
                    <Hammer className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" className="flex flex-col gap-6 h-full justify-center mt-0 lg:-mt-4">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#180026] leading-[1.25] font-sans tracking-tight">
                  Cơ hội sở hữu <span className="text-[#27003E]">bất động sản thương mại</span>{" "}
                  tại{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#27003E] italic">cửa ngõ phía Tây</span>
                    <span className="absolute left-0 -bottom-0.5 w-full h-[3px] bg-[#C9A84C] rounded-full" />
                  </span>{" "}không lặp lại lần hai.
                </h2>
                <p className="text-[#4A2060] text-sm md:text-[15px] leading-relaxed font-sans mt-2">
                  Sở hữu <strong className="text-[#180026]">nhà phố thương mại, liền kề, biệt thự sinh thái & StripMall</strong> tại đại đô thị 200ha — pháp lý hoàn chỉnh, đã khởi công, đón đầu Vành đai 3 & cao tốc Trung Lương.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                <div className="flex-1 h-px bg-gradient-to-l from-[#C9A84C]/40 to-transparent" />
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: MapPin, title: "Vị Trí Cửa Ngõ Độc Tôn", desc: "Mặt tiền Nguyễn Hữu Trí, liền kề cao tốc Trung Lương — lõi kết nối 3 vùng kinh tế trọng điểm.", tag: "Vị trí vàng", target: "location" },
                  { icon: ShoppingBag, title: "StripMall — Sinh Lời Bền Vững", desc: "Dòng tiền kép: vừa tăng giá đất vừa cho thuê kinh doanh. Mô hình mở duy nhất cửa ngõ Tây TP.HCM.", tag: "Sinh lời cao", target: "amenities" },
                  { icon: Shield, title: "Pháp Lý & Tiến Độ Vững Chắc", desc: "Quyết định 1/500 đã phê duyệt. Khởi công 22/03/2026 với tổng thầu Hòa Bình & Khang Thành.", tag: "An tâm sở hữu", target: "progress" },
                ].map((item, i) => (
                  <button
                    key={i} type="button"
                    onClick={() => {
                      const el = document.getElementById(item.target)
                      if (!el) return
                      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: "smooth" })
                    }}
                    className="relative w-full text-left flex items-center gap-4 bg-[#F5EFF8] rounded-xl p-4 border border-[#E8DAF0] hover:border-[#27003E]/30 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute left-0 inset-y-0 w-[3px] bg-[#27003E] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 rounded-xl bg-[#EDE0F5] group-hover:bg-[#27003E] flex items-center justify-center shrink-0 transition-colors">
                      <item.icon className="w-5 h-5 text-[#27003E] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[#180026] font-bold text-sm font-sans uppercase tracking-tight">{item.title}</span>
                        <span className="text-[9px] bg-[#EDE0F5] text-[#27003E] border border-[#27003E]/15 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans shrink-0 group-hover:bg-[#27003E]/10">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[#9370A8] text-xs leading-relaxed font-sans">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9370A8] group-hover:text-[#27003E] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "85ha", label: "Quy mô giai đoạn 1" },
                  { value: "1.251", label: "Sản phẩm tinh hoa" },
                  { value: "30+", label: "Năm kinh nghiệm CĐT" },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-[#EDE0F5] rounded-xl py-3.5 px-2 border border-[#E8DAF0]/80">
                    <p className="text-[#27003E] text-xl md:text-2xl font-bold leading-none font-sans">{s.value}</p>
                    <p className="text-[#9370A8] text-[10px] font-bold uppercase tracking-wider mt-1 font-sans leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contact"
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-4 bg-[#27003E] text-white font-bold rounded-xl shadow-[0_10px_24px_rgba(39,0,62,0.3)] hover:bg-[#3D0060] hover:-translate-y-1 transition-all uppercase tracking-widest text-sm font-sans">
                  Nhận thông tin ưu đãi <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:0986514242"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#E8DAF0] hover:border-[#27003E]/30 text-[#180026] font-bold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all text-sm font-sans shrink-0">
                  <Phone className="w-4 h-4 text-[#27003E]" /> Gọi Ngay
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VỊ TRÍ ── */}
      <section id="location" className="py-20 md:py-32 bg-[#180026] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#27003E]/60 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/8 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase font-sans">Vị Trí Chiến Lược</span>
                <div className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
                Lõi Kết Nối 3 Vùng Kinh Tế
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Tọa lạc mặt tiền đường Nguyễn Hữu Trí, Bến Lức — giao điểm chiến lược của Vành đai 3, Cao tốc TP.HCM – Trung Lương và tuyến Bến Lức – Long Thành, kết nối TP.HCM – Đông Nam Bộ – Mekong Delta.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
            <Reveal direction="left" className="lg:col-span-3">
              <div
                onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/vitri.jpg", alt: "Bản đồ vị trí Thanh Phú Centre Point" })}
                className="relative rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in bg-white shadow-2xl"
                style={{ minHeight: '400px' }}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setZoomedImage({ src: "/thanh-phu-centre-point/vitri.jpg", alt: "Bản đồ vị trí" }) }}
              >
                <Image src="/thanh-phu-centre-point/vitri.jpg" alt="Bản đồ vị trí" fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#180026]/15 transition-colors flex items-center justify-center">
                  <div className="bg-[#C9A84C] text-[#180026] p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-[0_0_40px_rgba(201,168,76,0.6)] scale-75 group-hover:scale-100">
                    <Maximize2 size={32} />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#180026]/90 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-[#E8DAF0] pointer-events-none flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#EDE0F5] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#27003E]" />
                  </div>
                  <div>
                    <p className="text-[#180026] font-bold text-base font-sans">THANH PHÚ CENTRE POINT</p>
                    <p className="text-[#4A2060] text-xs font-sans mt-0.5">Đường Nguyễn Hữu Trí, Bến Lức</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-2 flex flex-col justify-center space-y-5 md:space-y-6">
              {connections.map((item, idx) => (
                <Reveal key={item.title} direction="right" delay={idx * 0.1}>
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 hover:bg-white/10 hover:border-[#C9A84C]/40 transition-all duration-300 group">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#C9A84C]/15 flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C] transition-colors">
                        <item.icon className="w-6 h-6 text-[#C9A84C] group-hover:text-[#180026] transition-colors" />
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
              <p className="text-[#C9A84C] text-sm font-bold tracking-[0.2em] uppercase text-center mb-8 font-sans">Thời Gian Di Chuyển Từ Dự Án</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {nearbyPlaces.map((place) => (
                  <div key={place.name}
                    className="text-center p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-[#27003E] border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-300 group cursor-default">
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
      <section className="py-12 bg-white border-y border-[#E8DAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F5EFF8] rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#180026] mb-3 font-sans">Tải Trọn Bộ Tài Liệu Dự Án</h3>
              <p className="text-[#4A2060] font-sans">Nhận ngay mặt bằng chi tiết, chính sách bán hàng và bảng giá mới nhất qua Zalo/Email.</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <Input required placeholder="Họ tên của bạn" value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-white border-[#E8DAF0] h-14 sm:w-64 rounded-xl focus-visible:ring-[#27003E]" />
              <Input required type="tel" placeholder="Số điện thoại" value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-white border-[#E8DAF0] h-14 sm:w-64 rounded-xl focus-visible:ring-[#27003E]" />
              <Button type="submit" disabled={isSubmitting}
                className="h-14 px-8 bg-[#27003E] hover:bg-[#3D0060] text-white rounded-xl font-bold uppercase tracking-wider transition-all whitespace-nowrap">
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
                <div className="h-px w-12 bg-[#27003E]" />
                <span className="text-[#27003E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Sản Phẩm & Thiết Kế</span>
                <div className="h-px w-12 bg-[#27003E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#180026] mb-6 leading-tight font-sans">
                4 Dòng Sản Phẩm Tinh Hoa
              </h2>
              <p className="text-[#4A2060] text-base md:text-lg font-sans">
                Từ nhà phố thương mại, liền kề đến biệt thự sinh thái & StripMall — đa dạng lựa chọn an cư và đầu tư sinh lời.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="flex overflow-x-auto hide-scroll w-full justify-start md:justify-center gap-3 px-1 mb-12 md:mb-16 snap-x pb-4">
              {productTypes.map((p) => (
                <button key={p.id} onClick={() => setSelectedProduct(p.id)}
                  className={cn(
                    "relative flex-shrink-0 px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans snap-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27003E]",
                    selectedProduct === p.id
                      ? "bg-[#27003E] text-white shadow-[0_8px_20px_rgba(39,0,62,0.3)] scale-105"
                      : "bg-white text-[#4A2060] hover:bg-[#EDE0F5] border border-[#E8DAF0]"
                  )}>
                  {p.name}
                  {p.popular && <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-[#C9A84C] text-[#180026] px-2 py-0.5 rounded-full font-bold font-sans shadow-sm">Hot</span>}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mb-8">
              <p className="text-center text-[#9370A8] text-xs font-bold uppercase tracking-[0.2em] mb-4 font-sans">Phối Cảnh & Mặt Bằng — {activeProduct.name}</p>
              <CoverflowCarousel items={activeProduct.gallery} imageFit="cover" showTextOutside={true} />
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-2xl shadow-black/5 border border-[#E8DAF0] relative overflow-hidden mb-16 mt-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#EDE0F5] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-70 pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                {activeProduct.popular && (
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#27003E] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-8 shadow-md font-sans">
                    <Star className="w-4 h-4 fill-white" /> Sản phẩm được quan tâm nhiều nhất
                  </span>
                )}

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#180026] mb-10 font-sans">{activeProduct.name}</h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10">
                  <div className="flex flex-col items-center">
                    <span className="text-[#9370A8] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Quy mô / Diện tích</span>
                    <span className="text-[#180026] text-2xl md:text-3xl font-bold font-sans">{activeProduct.area}</span>
                  </div>
                  <div className="w-full h-px md:w-px md:h-16 bg-[#E8DAF0] max-w-[200px]" />
                  <div className="flex flex-col items-center">
                    <span className="text-[#9370A8] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Giá tham khảo</span>
                    <span className="text-[#27003E] text-3xl md:text-5xl font-bold font-sans">{activeProduct.price}</span>
                  </div>
                </div>

                <div className="relative py-8 mb-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full border-t border-[#E8DAF0]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-8 text-[#4A2060] italic text-lg md:text-xl font-medium font-sans text-center">
                      "{activeProduct.description}"
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                  {activeProduct.features.map((f) => (
                    <div key={f} className="flex flex-col items-center justify-center text-center bg-[#EDE0F5]/60 p-5 md:p-6 rounded-3xl border border-[#E8DAF0]/80 hover:bg-[#EDE0F5] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                        <Check className="w-5 h-5 text-[#27003E]" />
                      </div>
                      <span className="text-[#180026] text-sm font-bold leading-snug font-sans">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a href="#contact"
                    onClick={() => setFormData(prev => ({ ...prev, product: activeProduct.id }))}
                    className="inline-flex items-center gap-3 bg-[#180026] text-white font-bold text-sm uppercase tracking-widest px-10 py-5 md:py-6 rounded-full hover:bg-[#27003E] transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(39,0,62,0.4)] hover:-translate-y-1 font-sans">
                    Đăng Ký Tư Vấn {activeProduct.name} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mặt bằng */}
          <Reveal direction="up" delay={0.25}>
            <div className="bg-gradient-to-br from-[#EDE0F5] to-[#F5EFF8] rounded-[2.5rem] pt-12 pb-6 border border-[#E8DAF0] shadow-lg">
              <h3 className="text-2xl md:text-4xl font-bold text-[#180026] mb-6 font-sans text-center px-4">Mặt Bằng Tổng Thể Dự Án</h3>
              <CoverflowCarousel items={floorPlans} imageFit="contain" showTextOutside={true} />
            </div>
          </Reveal>

          {/* Phối cảnh */}
          <Reveal direction="up" delay={0.3} className="mt-24 pt-24 border-t border-[#E8DAF0]" id="showroom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#27003E]" />
                <span className="text-[#27003E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Không Gian Dự Án</span>
                <div className="h-px w-12 bg-[#27003E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#180026] mb-6 leading-tight font-sans">Phối Cảnh Dự Án</h2>
              <p className="text-[#4A2060] text-base md:text-lg leading-relaxed font-sans">
                Hình ảnh phối cảnh chính thức từ chủ đầu tư BIM Land — đại đô thị 200ha đang được kiến tạo tại cửa ngõ Tây TP.HCM.
              </p>
            </div>
            <CoverflowCarousel items={showroomGallery} imageFit="cover" showTextOutside={true} />
          </Reveal>
        </div>
      </section>

      {/* ── TIỆN ÍCH ── */}
      <section id="amenities" className="py-20 md:py-32 bg-[#180026] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#27003E]/80 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[#C9A84C]/8 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase font-sans">Hệ Sinh Thái Tiện Ích</span>
                <div className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
                Giao Thương – Trải Nghiệm – Lễ Hội
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Mega Mall 9,5ha, hồ bơi nổi 3.300m² (đầu tiên Việt Nam), hồ sinh thái 3,8ha, công viên 8ha, nhạc nước hằng đêm — tiêu chuẩn resort tại lòng đô thị.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up">
            <div
              className="relative rounded-3xl overflow-hidden mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-[#180026] cursor-zoom-in"
              onClick={() => setZoomedImage({ src: "/thanh-phu-centre-point/matbangtienich.png", alt: "Sơ đồ tiện ích nội khu — Thanh Phú Centre Point" })}
            >
              <Image src="/thanh-phu-centre-point/matbangtienich.png" alt="Tiện ích Thanh Phú Centre Point" width={1400} height={700}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/20 pointer-events-none">
                <div className="bg-[#C9A84C]/90 text-[#180026] p-5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                  <Maximize2 size={32} />
                </div>
              </div>
            </div>
            <p className="text-center text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-20 font-sans">Sơ đồ tiện ích nội khu — Thanh Phú Centre Point</p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mb-20">
              <p className="text-center text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 font-sans">12 Tiện ích biểu tượng đẳng cấp quốc tế</p>
              <CoverflowCarousel items={amenitiesGallery} imageFit="cover" isDark={true} showTextOutside={true} />
            </div>
          </Reveal>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 mb-16">
            {highlightAmenities.map((item, idx) => (
              <Reveal key={item.label} direction="up" delay={idx * 0.05}>
                <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 text-center hover:bg-white/10 border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-300 hover:-translate-y-1.5 cursor-default">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-xl bg-[#C9A84C]/10 group-hover:bg-[#C9A84C] flex items-center justify-center mb-4 transition-colors">
                    <item.icon className="w-6 h-6 text-[#C9A84C] group-hover:text-[#180026] transition-colors" />
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
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#C9A84C]/15 flex items-center justify-center mb-6 group-hover:bg-[#C9A84C] transition-colors duration-300">
                    <cat.icon className="w-7 h-7 text-[#C9A84C] group-hover:text-[#180026] transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-6 font-sans">{cat.title}</h3>
                  <ul className="space-y-4">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/70 text-sm md:text-base group-hover:text-white/90 transition-colors font-sans">
                        <Check className="w-5 h-5 text-[#C9A84C] shrink-0" />
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
      <section className="relative py-20 bg-[#0D0015] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#27003E]/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-gradient-to-r from-[#1E0035] to-[#180026] border border-white/10 rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center max-w-5xl mx-auto">
            <div className="w-16 h-16 bg-[#C9A84C]/20 rounded-full flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans">Nhận Ưu Đãi Đặc Quyền Ra Mắt</h3>
            <p className="text-white/70 text-lg mb-10 max-w-2xl font-sans">
              Dành riêng cho khách hàng đăng ký sớm — nhận bảng giá gốc từ BIM Land và chính sách thanh toán 10 đợt ưu đãi đặc biệt.
            </p>
            <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input required placeholder="Số điện thoại của bạn" value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-white/5 border-white/20 h-16 rounded-2xl text-white placeholder:text-white/30 focus-visible:ring-[#C9A84C]" />
              <div className="relative">
                <select value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full h-16 rounded-2xl bg-white/5 border border-white/20 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] appearance-none cursor-pointer">
                  <option value="" className="bg-[#180026]">Chọn loại sản phẩm</option>
                  <option value="nhaphothuongmai" className="bg-[#180026]">Nhà phố thương mại</option>
                  <option value="lienke" className="bg-[#180026]">Nhà phố liền kề</option>
                  <option value="bietthusinhthai" className="bg-[#180026]">Biệt thự sinh thái</option>
                  <option value="stripmall" className="bg-[#180026]">Strip Mall</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
              <Button type="submit" disabled={isSubmitting}
                className="h-16 bg-[#C9A84C] hover:bg-[#b8953e] text-[#180026] rounded-2xl font-bold text-lg uppercase tracking-widest transition-all">
                {isSubmitting ? "Đang xử lý..." : "Nhận Ưu Đãi Ngay"}
              </Button>
            </form>
            <p className="mt-6 text-white/40 text-sm font-sans flex items-center gap-2">
              <Clock className="w-4 h-4" /> Ưu đãi ra mắt — số lượng có hạn
            </p>
          </div>
        </div>
      </section>

      {/* ── PHÁP LÝ & TIẾN ĐỘ ── */}
      <section id="progress" className="py-20 md:py-32 bg-[#EDE0F5] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#27003E]" />
                <span className="text-[#27003E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Bảo Chứng Niềm Tin</span>
                <div className="h-px w-12 bg-[#27003E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#180026] mb-6 leading-tight font-sans">
                Pháp Lý & Tiến Độ
              </h2>
              <p className="text-[#4A2060] text-base md:text-lg leading-relaxed font-sans">
                BIM Land — thành viên Tập đoàn BIM Group, 30+ năm kiến tạo Halong Marina, Phú Quốc, Thanh Xuân Valley. Cam kết pháp lý minh bạch và tiến độ đúng hẹn.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <Hammer className="text-[#27003E] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#180026] font-sans">Lộ Trình Triển Khai</h3>
                </div>
                <div className="relative pl-6 md:pl-10 space-y-0">
                  {milestones.map((m, idx) => (
                    <div key={m.id} className="relative pb-10 last:pb-0">
                      {idx < milestones.length - 1 && (
                        <div className="absolute left-[-27px] md:left-[-35px] top-6 bottom-0 w-1 bg-[#D5C0E8] rounded-full" />
                      )}
                      <div className={cn(
                        "absolute -left-[33px] md:-left-[41px] top-1 w-7 h-7 rounded-full border-4 border-[#EDE0F5] flex items-center justify-center z-10 shadow-sm",
                        m.status === "completed" ? "bg-[#27003E]"
                          : m.status === "in-progress" ? "bg-[#C9A84C] ring-4 ring-[#C9A84C]/20"
                          : "bg-[#D5C0E8]"
                      )}>
                        {m.status === "in-progress" && <div className="w-2 h-2 rounded-full bg-white animate-ping" />}
                      </div>
                      <div className={cn(
                        "rounded-3xl p-6 md:p-8 border transition-all",
                        m.status === "in-progress" ? "bg-white border-[#C9A84C]/40 shadow-xl scale-[1.02]"
                          : m.status === "completed" ? "bg-[#E0D0EE] border-[#27003E]/20 shadow-sm"
                          : "bg-white border-[#E8DAF0] shadow-sm opacity-80"
                      )}>
                        <span className={cn(
                          "inline-block text-[11px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 font-sans",
                          m.status === "completed" ? "bg-[#27003E]/15 text-[#27003E]"
                            : m.status === "in-progress" ? "bg-[#C9A84C]/20 text-[#7a5f00]"
                            : "bg-[#EDE0F5] text-[#9370A8]"
                        )}>{m.date}</span>
                        <h4 className="text-lg md:text-xl font-bold text-[#180026] mb-2 font-sans">{m.title}</h4>
                        <p className="text-[#4A2060] text-sm md:text-base leading-relaxed font-sans">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8 md:space-y-10">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#E8DAF0]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#EDE0F5] rounded-2xl flex items-center justify-center shrink-0">
                      <Shield className="text-[#27003E] w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#180026] font-sans">Hồ Sơ Pháp Lý</h3>
                  </div>
                  <ul className="space-y-4">
                    {legalDocuments.map((doc) => (
                      <li key={doc} className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[#EDE0F5] hover:bg-[#D5C0E8]/50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#27003E]/20 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-[#27003E]" />
                        </div>
                        <span className="text-[#180026] font-semibold text-sm md:text-base leading-relaxed font-sans">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative bg-[#180026] rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#27003E] rounded-full blur-[80px] opacity-80 pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#C9A84C] rounded-full blur-[80px] opacity-20 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                        <BarChart2 className="text-[#C9A84C] w-6 h-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-sans">Chính Sách Tài Chính</h3>
                    </div>
                    <div className="space-y-5">
                      {[
                        { rate: "10 Đợt", title: "Thanh toán linh hoạt theo tiến độ", desc: "Lịch thanh toán dàn trải nhiều đợt, bắt đầu booking 300 triệu. Nhận HĐMB giữa đến cuối 2026, bàn giao 2027–2029." },
                        { rate: "BIM", title: "Chủ đầu tư BIM Land — 30+ năm uy tín", desc: "Đã thành công với Halong Marina 248ha, InterContinental Halong Bay, BIM Phú Quốc và Thanh Xuân Valley." },
                      ].map((item) => (
                        <div key={item.rate} className="flex items-center gap-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                            <span className="text-sm md:text-base font-bold text-[#C9A84C] font-sans text-center leading-tight px-1">{item.rate}</span>
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
      <section id="contact" className="py-20 md:py-32 bg-[#EDE0F5] border-t border-[#E8DAF0] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#27003E]/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-[#27003E]" />
                  <span className="text-[#27003E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Liên Hệ Ngay Hôm Nay</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#180026] mb-6 leading-tight font-sans">
                  Giữ Chỗ Ngay —<br />Nhận Chiết Khấu Đặc Biệt.
                </h2>
                <p className="text-[#4A2060] text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-sans max-w-lg">
                  Đăng ký để nhận trọn bộ tài liệu, mặt bằng chi tiết và bảng giá ưu đãi trực tiếp từ chủ đầu tư BIM Land — Hotline: <strong className="text-[#27003E]">0986 51 4242</strong>.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Hotline CSKH 24/7", value: "0986 51 4242", href: "tel:0986514242", isLarge: true },
                    { icon: Mail, label: "Email Hỗ Trợ", value: "Ngocdiachinh34@gmail.com", href: "mailto:Ngocdiachinh34@gmail.com", isLarge: false },
                  ].map((c) => (
                    <a key={c.label} href={c.href}
                      className="flex items-center gap-5 bg-white p-6 rounded-3xl border border-[#E8DAF0] hover:border-[#27003E]/40 hover:shadow-xl transition-all duration-300 group outline-none focus:ring-2 focus:ring-[#27003E]">
                      <div className="w-14 h-14 bg-[#EDE0F5] group-hover:bg-[#27003E] rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm">
                        <c.icon className="w-6 h-6 text-[#27003E] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[#9370A8] text-xs font-bold uppercase tracking-widest mb-1 font-sans">{c.label}</p>
                        <p className={cn("font-bold text-[#180026] group-hover:text-[#27003E] transition-colors font-sans", c.isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>
                          {c.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Sales Gallery address */}
                <div className="mt-6 bg-white rounded-2xl p-6 border border-[#E8DAF0]">
                  <p className="text-[#9370A8] text-xs font-bold uppercase tracking-widest mb-2 font-sans">Tham Quan Sales Gallery</p>
                  <p className="text-[#180026] font-bold text-base font-sans">28 Trần Quốc Thảo, P. Xuân Hòa, TP. Hồ Chí Minh</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-2xl border border-[#E8DAF0]">
                <h3 className="text-2xl md:text-3xl font-bold text-[#180026] mb-8 md:mb-10 text-center font-sans">Đăng Ký Tư Vấn</h3>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#27003E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 md:w-12 md:h-12 text-[#27003E]" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#180026] mb-3 font-sans">Đăng Ký Thành Công!</h4>
                    <p className="text-[#4A2060] text-base mb-8 leading-relaxed font-sans">Chuyên viên BIM Land sẽ liên hệ với quý khách trong thời gian sớm nhất.</p>
                    <button onClick={() => setIsSubmitted(false)} className="text-[#27003E] font-bold text-base underline underline-offset-4 hover:text-[#3D0060] transition-colors font-sans">
                      Đăng ký thêm thông tin khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                    <div>
                      <label className="block text-xs font-bold text-[#4A2060] uppercase tracking-widest mb-2.5">Họ và tên <span className="text-[#27003E]">*</span></label>
                      <Input required placeholder="Nhập họ và tên của bạn..."
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#F5EFF8] border-transparent py-6 focus-visible:ring-[#27003E] focus-visible:ring-2 placeholder:text-[#C0A8D0] rounded-xl" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#4A2060] uppercase tracking-widest mb-2.5">Điện thoại <span className="text-[#27003E]">*</span></label>
                        <Input required type="tel" placeholder="09xx..."
                          value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-[#F5EFF8] border-transparent py-6 focus-visible:ring-[#27003E] focus-visible:ring-2 placeholder:text-[#C0A8D0] rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#4A2060] uppercase tracking-widest mb-2.5">Sản phẩm quan tâm</label>
                        <div className="relative">
                          <select value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                            className="w-full h-[50px] rounded-xl bg-[#F5EFF8] border-0 px-4 text-[#180026] focus:outline-none focus:ring-2 focus:ring-[#27003E] appearance-none cursor-pointer">
                            <option value="">Chọn loại sản phẩm...</option>
                            <option value="nhaphothuongmai">Nhà phố thương mại</option>
                            <option value="lienke">Nhà phố liền kề</option>
                            <option value="bietthusinhthai">Biệt thự sinh thái</option>
                            <option value="stripmall">Strip Mall</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9370A8] pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4A2060] uppercase tracking-widest mb-2.5">Email <span className="text-[#9370A8] normal-case font-normal">(Tùy chọn)</span></label>
                      <Input type="email" placeholder="Để nhận tài liệu qua email..."
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#F5EFF8] border-transparent py-6 focus-visible:ring-[#27003E] focus-visible:ring-2 placeholder:text-[#C0A8D0] rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4A2060] uppercase tracking-widest mb-2.5">Ghi chú thêm</label>
                      <textarea rows={3} placeholder="Bạn cần tư vấn vấn đề gì..."
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border-0 bg-[#F5EFF8] px-4 py-4 text-sm md:text-base text-[#180026] placeholder:text-[#C0A8D0] focus:outline-none focus:ring-2 focus:ring-[#27003E] resize-none" />
                    </div>
                    <button type="submit" disabled={isSubmitting}
                      className={cn(
                        "w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27003E]",
                        isSubmitting
                          ? "bg-[#27003E]/50 cursor-not-allowed"
                          : "bg-[#27003E] hover:bg-[#3D0060] shadow-[0_10px_30px_rgba(39,0,62,0.3)] hover:shadow-[0_15px_40px_rgba(39,0,62,0.4)] hover:-translate-y-1"
                      )}>
                      {isSubmitting
                        ? <><span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> Đang gửi...</>
                        : <><Send size={18} /> Nhận Thông Tin Ngay</>
                      }
                    </button>
                    <p className="text-center text-xs text-[#9370A8] mt-4 font-sans flex items-center justify-center gap-1.5">
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

      {/* ── Modal Phóng To Ảnh ── */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] bg-[#180026]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#180026] rounded-full p-3 transition-colors z-50 shadow-lg"
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