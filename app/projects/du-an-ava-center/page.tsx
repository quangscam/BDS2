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
  Film, Stethoscope
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
  
  const displayItems = items.length < 5 ? [...items, ...items, ...items].slice(0, Math.max(5, items.length * 3)) : items
  const length = displayItems.length

  const next = () => setCurrentIndex((prev) => (prev + 1) % length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + length) % length)

  useEffect(() => {
    setCurrentIndex(0)
  }, [items])

  return (
    <div className={cn("relative w-full flex flex-col items-center justify-center overflow-hidden py-10 group/carousel", 
      showTextOutside ? "h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]" : "h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px]"
    )}>
      {/* Container chứa hình ảnh */}
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
                isDark ? "bg-black/20 border border-white/10" : "bg-white border border-[#E8D7CF]",
                showTextOutside ? "h-[85%]" : "h-[100%]"
              )}
              style={{ transform: transformStr, opacity, zIndex }}
            >
              {/* Hình ảnh */}
              <div className="relative w-full flex-grow group bg-white">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0F]/90 via-transparent to-transparent pointer-events-none" />
                )}
                
                {!showTextOutside && (
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex justify-center pointer-events-none">
                    <p className={cn(
                      "font-bold text-sm md:text-xl font-sans px-6 py-2.5 rounded-full shadow-lg transition-transform",
                      isCenter ? "translate-y-0" : "translate-y-4 opacity-0",
                      isDark ? "bg-white/15 backdrop-blur-md text-white border border-white/20" : "bg-white text-[#B03A2E] border border-[#E8D7CF]"
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
            isDark ? "bg-black/60 backdrop-blur-sm text-white border border-white/20" : "bg-white text-[#B03A2E] border border-[#E8D7CF]"
          )}>
            {displayItems[currentIndex]?.title}
          </p>
        </div>
      )}

      {/* Điều hướng */}
      <button onClick={prev} className={cn("absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#B03A2E]" : "bg-white/90 backdrop-blur shadow-lg border border-[#E8D7CF] text-[#2C1A1A] hover:bg-[#B03A2E] hover:text-white")}>
        <ArrowLeft size={20} />
      </button>
      <button onClick={next} className={cn("absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#B03A2E]" : "bg-white/90 backdrop-blur shadow-lg border border-[#E8D7CF] text-[#2C1A1A] hover:bg-[#B03A2E] hover:text-white")}>
        <ArrowRight size={20} />
      </button>
    </div>
  )
}

/* ─── Data ─── */
const navLinks = [
  { href: "#overview", label: "Tổng Quan" },
  { href: "#cta", label: "Đặc Quyền Sở Hữu" },
  { href: "#location", label: "Vị Trí" },
  { href: "#products", label: "Sản Phẩm" },
  { href: "#showroom", label: "Nhà Mẫu" },
  { href: "#amenities", label: "Tiện Ích" },
]

const features = [
  { icon: Building2, title: "Kiến Trúc Biểu Tượng", description: "Hai tòa tháp kết nối bằng cầu kính Sky Bridge tại tầng 21, tạo điểm nhấn thị giác độc đáo." },
  { icon: Shield, title: "Pháp Lý Minh Bạch", description: "Sổ hồng sở hữu lâu dài, bảo lãnh ngân hàng, ân hạn nợ gốc và hỗ trợ lãi suất 0% đến 24 tháng." },
  { icon: Leaf, title: "Vật Liệu Vì Sức Khỏe", description: "Tiên phong áp dụng tiêu chuẩn ván gỗ E0, hàm lượng formaldehyde gần bằng 0, an toàn cho sức khỏe." },
  { icon: Sparkles, title: "Full Nội Thất Cao Cấp", description: "Một trong những dự án hiếm hoi trên trục QL13 bàn giao hoàn thiện nội thất trọn gói." },
]

const connections = [
  { icon: Car, title: "Quốc lộ 13 — Đại lộ Bình Dương", description: "Trục kinh tế năng động đang được nâng cấp mở rộng lên 8 làn xe. Đủ gần để hưởng tiện ích sầm uất, đủ xa để tránh khói bụi." },
  { icon: Building, title: "Đường Vành đai 3 — Kết nối liên vùng", description: "Mạng lưới liên vùng giúp kết nối nhanh chóng đến TP.HCM và sân bay Long Thành tương lai." },
  { icon: Clock, title: "Cao tốc Mỹ Phước - Tân Vạn — Trục logistics", description: 'Trục "xương sống" logistics của toàn vùng Đông Nam Bộ, kết nối thuận tiện đến các KCN lớn.' },
]

const nearbyPlaces = [
  { name: "AEON Mall Bình Dương", time: "5 phút" },
  { name: "BV Quốc tế Becamex", time: "7 phút" },
  { name: "ĐH Quốc tế Miền Đông", time: "10 phút" },
  { name: "Trung tâm TP.HCM", time: "25 phút" },
  { name: "Sân bay Tân Sơn Nhất", time: "35 phút" },
  { name: "KCN VSIP", time: "15 phút" },
]

const productTypes = [
  {
    id: "studio", name: "Studio", area: "~31m²", price: "Từ 1.2 tỷ",
    description: "Căn hộ thông minh cho người trẻ độc lập",
    features: ["Thiết kế tối ưu không gian", "Full nội thất cao cấp", "Logia đón nắng gió", "View đẹp thoáng mát"],
    popular: false,
    gallery: [
      { src: "/ava-center/studio1.jpeg", title: "Mặt Bằng Căn Studio - Đề xuất 1" }, 
      { src: "/ava-center/studio2.jpeg", title: "Mặt Bằng Căn Studio - Đề xuất 2" }
    ]
  },
  {
    id: "1pn", name: "1 Phòng Ngủ", area: "~45m²", price: "Từ 1.8 tỷ",
    description: "Lý tưởng cho cặp đôi trẻ",
    features: ["Phòng ngủ riêng biệt", "Phòng khách rộng rãi", "Full nội thất cao cấp", "Ban công view thành phố"],
    popular: true,
    gallery: [
      { src: "/ava-center/1.png", title: "Mặt Bằng Căn 1PN+ (Loại 1)" },
      { src: "/ava-center/2.png", title: "Mặt Bằng Căn 1PN+ (Loại 2)" },
    ]
  },
  {
    id: "2pn", name: "2 Phòng Ngủ", area: "~67m²", price: "Từ 2.5 tỷ",
    description: "Hoàn hảo cho gia đình nhỏ",
    features: ["2 phòng ngủ thoáng mát", "Phòng khách & bếp liên thông", "Full nội thất cao cấp", "2 ban công panorama"],
    popular: false,
    gallery: [
      { src: "/ava-center/3.png", title: "Mặt Bằng Căn 2PN+ (Góc A)" },
      { src: "/ava-center/4.png", title: "Mặt Bằng Căn 2PN+ (Góc B)" },
      { src: "/ava-center/5.png", title: "Mặt Bằng Căn 2PN+ (Góc C)" },
    ]
  },
  {
    id: "3pn", name: "3 Phòng Ngủ", area: "~85-95m²", price: "Từ 3.2 tỷ",
    description: "Không gian rộng rãi, đẳng cấp cho gia đình đa thế hệ",
    features: ["3 phòng ngủ thoáng sáng", "Phòng khách sang trọng", "Full nội thất cao cấp", "Ban công góc panorama"],
    popular: false,
    gallery: [
      { src: "/ava-center/3pn.jpg", title: "Mặt Bằng Căn 3PN (Đang cập nhật)" }
    ]
  },
  {
    id: "officetel", name: "Officetel", area: "~35-50m²", price: "Từ 1.5 tỷ",
    description: "Kết hợp ở và làm việc",
    features: ["Thiết kế đa năng", "Phù hợp văn phòng nhỏ", "Sở hữu lâu dài", "Sinh lời cho thuê cao"],
    popular: false,
    gallery: [{ src: "/ava-center/3.png", title: "Mặt Bằng Officetel Đề Xuất" }]
  },
  {
    id: "shophouse", name: "Shophouse", area: "~100-150m²", price: "Từ 5.5 tỷ",
    description: "Vị trí thương mại đắc địa tại khối đế",
    features: ["Vị trí kinh doanh sầm uất", "Thiết kế tối ưu trưng bày", "Sở hữu lâu dài", "Phục vụ hơn 2000+ cư dân"],
    popular: false,
    gallery: [{ src: "/ava-center/shophouseavacenter.jpg", title: "Mặt Bằng Shophouse Khối Đế" }]
  },
]

const showroomGallery = [
  { src: "/ava-center/13.png", title: "Không gian phòng khách" },
  { src: "/ava-center/20.png", title: "Góc bếp hiện đại" },
  { src: "/ava-center/21.png", title: "Không gian sinh hoạt chung" },
  { src: "/ava-center/22.png", title: "Phòng ngủ Master" },
  { src: "/ava-center/23.png", title: "Phòng ngủ dành cho bé" },
  { src: "/ava-center/24.png", title: "Thiết kế tủ kệ âm tường" },
  { src: "/ava-center/25.png", title: "Phòng vệ sinh cao cấp" },
  { src: "/ava-center/26.png", title: "Khu vực làm việc tại gia" },
  { src: "/ava-center/27.png", title: "Logia đón gió tự nhiên" },
  { src: "/ava-center/28.png", title: "Tầm nhìn panorama" },
]

const floorPlans = [
  { src: "/ava-center/7.png", title: "Tầng 4-10, 12A-15" },
  { src: "/ava-center/8.png", title: "Tầng 3" },
  { src: "/ava-center/9.png", title: "Tầng 2" },
  { src: "/ava-center/10.png", title: "Tầng 1" },
  { src: "/ava-center/11.png", title: "Tầng 11-12, 30-31" },
  { src: "/ava-center/12.png", title: "Tầng 16-40" },
  { src: "/ava-center/19.png", title: "Tầng 21 — Sky Bridge" },
]

const amenitiesGallery = [
  { src: "/ava-center/tienich7.png", title: "Hồ Bơi Vô Cực Tầng Thượng" },
  { src: "/ava-center/tienich3.png", title: "Khu Vui Chơi Nước Trẻ Em" },
  { src: "/ava-center/tienich2.png", title: "Công Viên Xanh Mát" },
  { src: "/ava-center/tienich8.png", title: "Đường Dạo Bộ Yên Tĩnh" },
  { src: "/ava-center/tienich4.png", title: "Sảnh Đón Khách Sang Trọng" },
  { src: "/ava-center/tienich1.png", title: "Khu Vực BBQ Ngoài Trời" },
  { src: "/ava-center/tienich9.png", title: "Phòng Chiếu Phim Cinema" },
  { src: "/ava-center/tienich6.png", title: "Trường Mầm Non Tiêu Chuẩn" },
  { src: "/ava-center/tienich5.png", title: "Phòng Khám Đa Khoa" },
]

const highlightAmenities = [
  { icon: Waves, label: "Hồ bơi vô cực" }, { icon: Trees, label: "Công viên" },
  { icon: Baby, label: "Khu vui chơi" }, { icon: Dumbbell, label: "Phòng Gym" },
  { icon: Film, label: "Cinema" }, { icon: Sparkles, label: "Spa" },
  { icon: ShoppingBag, label: "TTTM" }, { icon: Coffee, label: "Café" },
  { icon: Stethoscope, label: "Phòng khám" }, { icon: GraduationCap, label: "Nhà trẻ" },
  { icon: Utensils, label: "BBQ" }, { icon: Shield, label: "An ninh 24/7" },
]

const amenityCategories = [
  { title: "Thể Thao & Sức Khỏe", icon: Dumbbell, items: ["Hồ bơi vô cực & Hồ bơi trẻ em", "Phòng Gym tiêu chuẩn", "Đường dạo bộ nội khu", "Yoga & Spa thư giãn"] },
  { title: "Mua Sắm & Giải Trí", icon: ShoppingBag, items: ["Khu thương mại sầm uất", "Phòng chiếu phim Cinema", "Nhà hàng & café", "Khu vực BBQ ngoài trời"] },
  { title: "Giáo Dục & Y Tế", icon: GraduationCap, items: ["Trường mầm non nội khu", "Phòng khám đa khoa", "Khu vui chơi sáng tạo", "Thư viện tri thức"] },
  { title: "Đặc Quyền Cư Dân", icon: Sparkles, items: ["Sảnh đón khách sang trọng", "Công viên cây xanh", "Hệ thống an ninh khép kín", "Bãi đỗ xe hầm rộng rãi"] },
]

const milestones = [
  { id: 1, title: "Lễ Động Thổ", date: "22/08/2025", description: "Hoàn tất 100% công tác dọn dẹp, chuẩn bị mặt bằng và tổ chức lễ động thổ chính thức.", status: "completed" },
  { id: 2, title: "Thi Công Móng & Hầm", date: "Đang thi công — Đầu 2026", description: "Đang thi công nhộn nhịp ngày đêm phần móng, tầng hầm và đang lên kết cấu khối đế thương mại (Block B).", status: "in-progress" },
  { id: 3, title: "Thi Công Thân Tháp", date: "Sắp Tới", description: "Đẩy nhanh tiến độ phần thô thân tháp, cất nóc và thi công song song cơ điện (M&E), cầu kính Sky Bridge.", status: "upcoming" },
  { id: 4, title: "Hoàn Thiện & Bàn Giao", date: "Quý 4/2027", description: "Cam kết bàn giao căn hộ hoàn thiện cao cấp cho cư dân (Full nội thất).", status: "upcoming" },
]

const legalDocuments = [
  "Phê duyệt quy hoạch chi tiết tổng mặt bằng tỷ lệ 1/500",
  "Giấy phép xây dựng hợp lệ",
  "Sổ hồng sở hữu lâu dài (Người Việt Nam)",
  "Sở hữu 50 năm (Người nước ngoài theo luật định)",
]

/* ─── Main Component ─── */
export default function AVACenterLandingPage() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("1pn")
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", product: "", message: "", subject: "Đăng ký tư vấn dự án AVA Center" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMapZoomed, setIsMapZoomed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
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
    if (isMapZoomed) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMapZoomed])

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
          setFormData({ name: '', email: '', phone: '', product: '', message: '', subject: 'Đăng ký tư vấn dự án AVA Center' })
          setIsSubmitted(false)
        }, 4000)
      } else { alert("Có lỗi từ máy chủ. Vui lòng thử lại!") }
    } catch (error) { alert("Lỗi kết nối. Không thể đăng ký lúc này.") }
    finally { setIsSubmitting(false) }
  }

  const activeProduct = productTypes.find(p => p.id === selectedProduct) || productTypes[1]

  return (
    <main className="min-h-screen bg-[#FDFAF6] overflow-x-hidden selection:bg-[#B03A2E] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ── Header & Menu ── */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-[#E8D7CF]/60" : "bg-transparent"
      )}>
        <Header />
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-10 py-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-xs lg:text-sm font-bold text-[#5D4E4E] hover:text-[#B03A2E] tracking-[0.1em] uppercase transition-colors relative group font-sans">
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#B03A2E] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a href="#contact"
                className="ml-4 text-xs font-bold bg-[#B03A2E] text-white px-6 py-3 rounded-full tracking-[0.1em] uppercase hover:bg-[#8B2E24] transition-all shadow-md hover:shadow-xl hover:shadow-[#B03A2E]/30 hover:-translate-y-0.5 font-sans">
                Đăng Ký Ngay
              </a>
            </nav>

            <div className="md:hidden flex items-center justify-between py-3">
              <span className="text-[#2C1A1A] font-bold text-base tracking-wider font-sans">AVA CENTER</span>
              <div className="flex items-center gap-3">
                <a href="#contact" className="text-xs font-bold bg-[#B03A2E] text-white px-5 py-2.5 rounded-full tracking-wider uppercase font-sans shadow-sm">
                  Đăng Ký
                </a>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#F5EDE8] hover:bg-[#E8D7CF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B03A2E]">
                  <span className={cn("w-5 h-0.5 bg-[#2C1A1A] transition-all duration-300", mobileMenuOpen && "rotate-45 translate-y-2")} />
                  <span className={cn("w-5 h-0.5 bg-[#2C1A1A] transition-all duration-300", mobileMenuOpen && "opacity-0")} />
                  <span className={cn("w-5 h-0.5 bg-[#2C1A1A] transition-all duration-300", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-[#E8D7CF] shadow-lg py-2 px-4 flex flex-col z-50">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className="block py-3.5 px-2 text-sm font-bold text-[#5D4E4E] hover:text-[#B03A2E] hover:bg-[#F5EDE8]/50 rounded-lg tracking-wider uppercase font-sans transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-[100svh] flex items-end pb-12 md:pb-24 justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image src="/ava-center/tongquanava.png" alt="Tổng quan AVA Center" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A08] via-[#1A0A08]/60 to-[#1A0A08]/30" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent z-10" />

        <div className={cn("relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-1000", isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex items-center gap-2 border border-[#C9A84C]/50 rounded-full px-5 py-2.5 bg-[#C9A84C]/10 backdrop-blur-md">
              <Star className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase font-sans">Touchable Home — Sống Chuẩn Gu</span>
              <Star className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
            </div>
          </div>
          <h1 className="text-center text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-none font-sans drop-shadow-lg">
            AVA<br className="sm:hidden" /> <span className="text-[#C9A84C]">CENTER</span>
          </h1>
          <p className="text-center text-white/90 text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-4 md:mb-5 font-medium font-sans">Biểu tượng kiến trúc mới tại cửa ngõ Đông Bắc</p>
          <div className="flex items-center justify-center gap-2 mb-8 md:mb-12">
            <MapPin size={16} className="text-[#B03A2E] shrink-0" />
            <p className="text-white/70 text-sm sm:text-base font-sans">Mặt tiền đường Thủ Khoa Huân, Thuận An, Bình Dương</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10 md:mb-14">
            {[
              { value: "40", unit: "tầng", label: "Tháp A" },
              { value: "635+", unit: "căn", label: "Căn hộ cao cấp" },
              { value: "36", unit: "tiện ích", label: "Nội khu" },
              { value: "Q4/2027", unit: "", label: "Dự kiến bàn giao" },
            ].map((stat) => (
              <div key={stat.label} className="relative text-center bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 overflow-hidden group hover:bg-white/10 hover:border-[#C9A84C]/40 transition-all duration-300">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C9A84C] leading-none mb-1 font-sans drop-shadow-sm">{stat.value}</p>
                {stat.unit && <p className="text-white/60 text-[11px] uppercase tracking-widest font-sans">{stat.unit}</p>}
                <p className="text-white/80 text-xs md:text-sm uppercase tracking-wider font-bold mt-2 font-sans">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#B03A2E] hover:bg-[#8B2E24] text-white font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all hover:shadow-[0_8px_30px_rgb(176,58,46,0.4)] hover:-translate-y-1 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A0A08] focus:ring-[#B03A2E]">
              Đăng Ký Nhận Bảng Giá <ArrowRight size={18} />
            </a>
            <a href="#overview" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 md:py-5 rounded-full text-sm tracking-widest uppercase transition-all backdrop-blur-sm font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A0A08] focus:ring-white/50">
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

      {/* ============================================ */}
      {/* TỔNG QUAN DỰ ÁN */}
      {/* ============================================ */}
      <section id="overview" className="py-20 md:py-32 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#B03A2E]" />
                <span className="text-[#B03A2E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Tổng Quan Dự Án</span>
                <div className="h-px w-12 bg-[#B03A2E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C1A1A] mb-6 leading-tight font-sans">Nhà Sang, Giá Xịn</h2>
              <p className="text-[#5D4E4E] text-base md:text-lg leading-relaxed font-sans">AVA Center là tổ hợp căn hộ cao cấp, thương mại dịch vụ và văn phòng lưu trú mang tính biểu tượng mới tại khu vực cửa ngõ Đông Bắc Bình Dương.</p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">
            <Reveal direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8D7CF] group">
                <div className="relative aspect-[4/3]">
                  <Image 
                    src="/ava-center/tongquanava.png" 
                    alt="Phối cảnh tổng thể AVA Center" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1C0F0F]/90 via-[#1C0F0F]/40 to-transparent pointer-events-none" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 font-sans">Kiến trúc đột phá</h3>
                  <p className="text-white/80 text-sm md:text-base font-sans">100% căn hộ thiết kế tối ưu, có Logia đón nắng gió tự nhiên.</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-2 gap-6 md:gap-8">
                  {[
                    { label: "Chủ đầu tư", value: "Cty Tyson An Phú" },
                    { label: "Phát triển", value: "Tập đoàn AVA Corp" },
                    { label: "Tổng thầu", value: "Hòa Bình Group" },
                    { label: "Quy mô", value: "7.300m² — 9.400m²" },
                  ].map((item) => (
                    <div key={item.label} className="border-l-[3px] border-[#B03A2E] pl-5 py-1">
                      <p className="text-[#8A7D7D] text-xs font-bold uppercase tracking-widest mb-1.5 font-sans">{item.label}</p>
                      <p className="text-[#2C1A1A] font-bold text-base md:text-lg leading-snug font-sans">{item.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-[#F5EDE8] to-[#FAF3F0] rounded-3xl p-8 md:p-10 border border-[#E8D7CF] shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold text-[#B03A2E] mb-6 font-sans">Cấu Trúc Biểu Tượng</h3>
                  <ul className="space-y-5">
                    {[
                      { label: "Block A", desc: "Tháp căn hộ cao 40 tầng, khoảng 635 căn hộ cao cấp." },
                      { label: "Block B", desc: "Tháp thương mại - dịch vụ & tiện ích cao 6 tầng." },
                      { label: "Sky Bridge", desc: "Cầu kính không trung kết nối 2 tháp tại tầng 21 đẳng cấp." },
                      { label: "1 Tầng hầm", desc: "Không gian rộng rãi, đáp ứng đủ chỗ đỗ xe cho cư dân." },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#B03A2E] mt-1.5 shrink-0" />
                        <span className="text-[#5D4E4E] text-base leading-relaxed font-sans">
                          <strong className="text-[#2C1A1A] font-bold">{item.label}:</strong> {item.desc}
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
                <div className="group bg-white rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl border border-[#E8D7CF] hover:border-[#B03A2E]/30 transition-all duration-300 h-full hover:-translate-y-1.5">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#FFF0EE] group-hover:bg-[#B03A2E] flex items-center justify-center mb-6 md:mb-8 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#B03A2E] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#2C1A1A] mb-3 font-sans">{feature.title}</h3>
                  <p className="text-[#5D4E4E] text-sm md:text-base leading-relaxed font-sans">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
{/* PROMOTIONAL CTA SECTION - AVA CENTER */}
{/* ============================================ */}
<section className="relative py-16 md:py-24 overflow-hidden bg-white">

  {/* Blob nền */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#B03A2E]/5 blur-[100px]" />
    <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#C9A84C]/6 blur-[100px]" />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    {/* Badge */}
    <Reveal direction="up" className="flex justify-center mb-12">
      <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#B03A2E]/20 bg-[#FFF0EE]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B03A2E] animate-pulse" />
        <span className="text-[#B03A2E] text-[11px] font-bold uppercase tracking-[0.22em] font-sans">Cơ hội đầu tư hiếm có</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
      </div>
    </Reveal>

    {/* Grid 2 cột cân bằng 50/50 */}
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* ══ CỘT TRÁI: ẢNH ══ */}
      <Reveal direction="left" className="relative">
        {/* Padding tạo khoảng cho floating cards không bị clip */}
        <div className="relative mx-auto max-w-[460px] lg:max-w-none pt-10 pb-10 px-8 lg:pl-4 lg:pr-10">

          {/* Ảnh chính */}
          <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_rgba(44,26,26,0.18)] border border-[#E8D7CF] group">
            <Image
              src="/ava-center/artavacenter.png"
              alt="AVA Center – Căn hộ đẳng cấp"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0F]/75 via-[#1C0F0F]/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B03A2E]/15 to-transparent mix-blend-overlay" />

            {/* Badge Resort trong ảnh */}
            <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-white/15 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/25">
              <Star className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
              <span className="text-white text-[10px] font-bold tracking-widest uppercase font-sans">Resort 5 Sao</span>
            </div>

            {/* Địa chỉ dưới ảnh */}
            <div className="absolute bottom-0 inset-x-0 p-6">
              <p className="text-white/55 text-[10px] uppercase tracking-widest font-bold mb-0.5 font-sans">Mặt tiền đường Thủ Khoa Huân</p>
              <p className="text-white font-bold text-base font-sans">Thuận An, Bình Dương</p>
            </div>
          </div>

          {/* Floating: Social proof — trên phải */}
          <div className="absolute top-0 right-0 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#E8D7CF] z-20 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[21, 22, 23, 24].map((u) => (
                <div key={u} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shrink-0">
                  <img src={`https://i.pravatar.cc/80?u=${u}`} alt="" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-[#2C1A1A] text-xs font-bold font-sans leading-tight">+120 đăng ký</p>
              <p className="text-[#8A7D7D] text-[10px] font-sans">tuần này</p>
            </div>
          </div>

          {/* Floating: Giá — dưới trái */}
          <div className="absolute bottom-0 left-0 bg-[#1C0F0F] rounded-2xl px-5 py-4 shadow-[0_16px_40px_rgba(28,15,15,0.3)] border border-white/10 z-20">
            <p className="text-white/45 text-[10px] uppercase tracking-widest mb-0.5 font-sans">Chỉ từ</p>
            <p className="text-[#C9A84C] text-2xl font-bold leading-none font-sans">5 triệu</p>
            <p className="text-white/55 text-[11px] mt-0.5 font-sans">/ tháng</p>
            <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#B03A2E] flex items-center justify-center shadow-md">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Decor blobs */}
          <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-[#C9A84C]/12 blur-3xl -z-10" />
          <div className="absolute -top-8 -right-8 w-52 h-52 rounded-full bg-[#B03A2E]/6 blur-3xl -z-10" />
        </div>
      </Reveal>

      {/* ══ CỘT PHẢI: NỘI DUNG ══ */}
      <Reveal direction="right" className="flex flex-col gap-6">

        {/* Tiêu đề */}
        <div className="space-y-3">
            <section id="cta" className="relative py-16 md:py-24 overflow-hidden bg-white scroll-mt-24"></section>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#2C1A1A] leading-[1.15] font-sans tracking-tight">
            Đừng mua căn hộ tại Bình Dương khi chưa xem{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#B03A2E] italic">siêu phẩm</span>
              <span className="absolute left-0 -bottom-0.5 w-full h-[3px] bg-[#C9A84C] rounded-full" />
            </span>{" "}này!
          </h2>
          <p className="text-[#5D4E4E] text-sm md:text-[15px] leading-relaxed font-sans">
            Sở hữu ngay căn hộ <strong className="text-[#2C1A1A]">đẳng cấp Resort 5 sao</strong> với mức giá{" "}
            <span className="text-[#B03A2E] font-bold">không tưởng</span> – Chỉ từ <strong className="text-[#2C1A1A]">5 triệu/tháng</strong>.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <div className="flex-1 h-px bg-gradient-to-l from-[#C9A84C]/40 to-transparent" />
        </div>

        {/* USP Cards — clickable, smooth scroll */}
        <div className="space-y-2.5">
          {[
            { icon: MapPin, title: "Vị trí Tam Giác Vàng",  desc: "Aeon Mall – Mega Market – Vincom ngay trước thềm nhà.",                                tag: "Vị trí đắc địa", target: "location" },
            { icon: Home,   title: "Bàn giao Full nội thất", desc: "Chỉ cần xách vali vào ở ngay, tiết kiệm hàng trăm triệu đồng.",                         tag: "Sẵn ở ngay",    target: "showroom" },
            { icon: Leaf,   title: "Gỗ chuẩn E0 an toàn",   desc: "Bảo vệ sức khỏe tuyệt đối theo tiêu chuẩn Châu Âu – Formaldehyde gần bằng 0.",  tag: "Sức khoẻ",       target: "showroom" },
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
              className="relative w-full text-left flex items-center gap-4 bg-[#FDFAF6] rounded-xl p-4 border border-[#E8D7CF] hover:border-[#B03A2E]/30 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute left-0 inset-y-0 w-[3px] bg-[#B03A2E] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EE] group-hover:bg-[#B03A2E] flex items-center justify-center shrink-0 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-[#B03A2E] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-[#2C1A1A] font-bold text-sm font-sans uppercase tracking-tight">{item.title}</span>
                  <span className="text-[9px] bg-[#FFF0EE] text-[#B03A2E] border border-[#B03A2E]/15 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans shrink-0 group-hover:bg-[#B03A2E]/10">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[#8A7D7D] text-xs leading-relaxed font-sans">{item.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C4B5B5] group-hover:text-[#B03A2E] group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "0%",      label: "Lãi suất 24 tháng" },
            { value: "70%",     label: "Ngân hàng hỗ trợ vay" },
            { value: "Q4/2027", label: "Dự kiến bàn giao" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-[#FFF0EE] rounded-xl py-3.5 px-2 border border-[#E8D7CF]/80">
              <p className="text-[#B03A2E] text-xl md:text-2xl font-bold leading-none font-sans">{s.value}</p>
              <p className="text-[#8A7D7D] text-[10px] font-bold uppercase tracking-wider mt-1 font-sans leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2.5 px-7 py-4 bg-[#B03A2E] text-white font-bold rounded-xl shadow-[0_10px_24px_rgba(176,58,46,0.3)] hover:bg-[#2C1A1A] hover:shadow-[0_14px_32px_rgba(44,26,26,0.32)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm font-sans"
          >
            Nhận ưu đãi độc quyền <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="tel:0901234567"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#E8D7CF] hover:border-[#B03A2E]/30 text-[#2C1A1A] font-bold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-sm font-sans shrink-0"
          >
            <Phone className="w-4 h-4 text-[#B03A2E]" />
            Gọi Ngay
          </a>
        </div>

      </Reveal>
    </div>
  </div>
</section>

      {/* ============================================ */}
      {/* LOCATION (ZOOMABLE MAP) */}
      {/* ============================================ */}
      <section id="location" className="py-20 md:py-32 bg-[#1C0F0F] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#B03A2E]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase font-sans">Vị Trí Chiến Lược</span>
                <div className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">Tọa Độ Vàng Giao Thương</h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Nằm trên mặt tiền đường Thủ Khoa Huân, liền kề Quốc lộ 13 — vị trí trung tâm giao thoa 3 trục giao thông huyết mạch của khu vực.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Map Clickable */}
            <Reveal direction="left" className="lg:col-span-3">
              <div 
                onClick={() => setIsMapZoomed(true)}
                className="relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer bg-white shadow-2xl" 
                style={{ minHeight: '400px' }}
                role="button"
                aria-label="Phóng to bản đồ vị trí"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setIsMapZoomed(true) }}
              >
                <Image src="/ava-center/mapsavacenter.png" alt="Bản đồ vị trí AVA Center" fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]" />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1C0F0F]/15 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-[#B03A2E] text-white p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_40px_rgba(176,58,46,0.6)] scale-75 group-hover:scale-100">
                    <Maximize2 size={32} />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1C0F0F]/90 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-[#E8D7CF] pointer-events-none flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FFF0EE] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#B03A2E]" />
                  </div>
                  <div>
                    <p className="text-[#2C1A1A] font-bold text-base font-sans">AVA CENTER</p>
                    <p className="text-[#5D4E4E] text-xs font-sans mt-0.5">Click để phóng to bản đồ</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-2 flex flex-col justify-center space-y-5 md:space-y-6">
              {connections.map((item, idx) => (
                <Reveal key={item.title} direction="right" delay={idx * 0.1}>
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 hover:bg-white/10 hover:border-[#C9A84C]/40 transition-all duration-300 group">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#C9A84C]/15 flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C] transition-colors duration-300">
                        <item.icon className="w-6 h-6 text-[#C9A84C] group-hover:text-[#1C0F0F] transition-colors" />
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
          
          {/* Nearby grid */}
          <Reveal direction="up">
            <div className="bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-8 md:p-12 border border-white/10">
              <p className="text-[#C9A84C] text-sm font-bold tracking-[0.2em] uppercase text-center mb-8 font-sans">Kết Nối Hoàn Hảo — Ngàn Tiện Ích Xung Quanh</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {nearbyPlaces.map((place) => (
                  <div key={place.name}
                    className="text-center p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-[#B03A2E] border border-white/10 hover:border-[#B03A2E] transition-all duration-300 group cursor-default">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">{place.time}</p>
                    <p className="text-white/70 text-xs md:text-sm font-medium group-hover:text-white leading-snug font-sans">{place.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRODUCTS SECTION */}
      {/* ============================================ */}
      <section id="products" className="py-20 md:py-32 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#B03A2E]" />
                <span className="text-[#B03A2E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Sản Phẩm & Thiết Kế</span>
                <div className="h-px w-12 bg-[#B03A2E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C1A1A] mb-6 leading-tight font-sans">Đa Dạng Lựa Chọn</h2>
            </div>
          </Reveal>

          {/* Product tabs - Scrollable on mobile */}
          <Reveal direction="up" delay={0.1}>
            <div className="flex overflow-x-auto hide-scroll w-full justify-start md:justify-center gap-3 px-1 mb-12 md:mb-16 snap-x pb-4">
              {productTypes.map((p) => (
                <button key={p.id} onClick={() => setSelectedProduct(p.id)}
                  className={cn(
                    "relative flex-shrink-0 px-6 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans snap-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B03A2E]",
                    selectedProduct === p.id ? "bg-[#B03A2E] text-white shadow-[0_8px_20px_rgba(176,58,46,0.3)] scale-105" : "bg-white text-[#5D4E4E] hover:bg-[#F5EDE8] border border-[#E8D7CF]"
                  )}>
                  {p.name}
                  {p.popular && <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-[#C9A84C] text-[#1A0A08] px-2 py-0.5 rounded-full font-bold font-sans shadow-sm">Hot</span>}
                </button>
              ))}
            </div>
          </Reveal>

          {/* GALLERY MẶT BẰNG */}
          <Reveal direction="up" delay={0.15}>
            <div className="mb-8">
              <p className="text-center text-[#8A7D7D] text-xs font-bold uppercase tracking-[0.2em] mb-4 font-sans">Mặt Bằng Chi Tiết — {activeProduct.name}</p>
              <CoverflowCarousel items={activeProduct.gallery} imageFit="contain" showTextOutside={true} />
            </div>
          </Reveal>

          {/* CHI TIẾT CĂN HỘ */}
          <Reveal direction="up" delay={0.2}>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-2xl shadow-black/5 border border-[#E8D7CF] relative overflow-hidden mb-16 mt-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5EDE8] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-70 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F5EDE8] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-70 pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                {activeProduct.popular && (
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#B03A2E] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-8 shadow-md font-sans">
                    <Star className="w-4 h-4 fill-white" /> Sản phẩm được săn đón nhất
                  </span>
                )}

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A1A] mb-10 font-sans">
                  {activeProduct.id === 'shophouse' ? '' : 'Căn hộ '}{activeProduct.name}
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10">
                  <div className="flex flex-col items-center">
                    <span className="text-[#8A7D7D] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Diện tích thông thủy</span>
                    <span className="text-[#2C1A1A] text-2xl md:text-3xl font-bold font-sans">{activeProduct.area}</span>
                  </div>
                  <div className="w-full h-px md:w-px md:h-16 bg-[#E8D7CF] max-w-[200px]" />
                  <div className="flex flex-col items-center">
                    <span className="text-[#8A7D7D] text-xs uppercase tracking-widest font-bold mb-2 font-sans">Mức giá tham khảo</span>
                    <span className="text-[#B03A2E] text-3xl md:text-5xl font-bold font-sans">{activeProduct.price}</span>
                  </div>
                </div>

                <div className="relative py-8 mb-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full border-t border-[#E8D7CF]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-8 text-[#5D4E4E] italic text-lg md:text-xl font-medium font-sans text-center">
                      "{activeProduct.description}"
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                  {activeProduct.features.map((f) => (
                    <div key={f} className="flex flex-col items-center justify-center text-center bg-[#F5EDE8]/60 p-5 md:p-6 rounded-3xl border border-[#E8D7CF]/80 hover:bg-[#F5EDE8] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                        <Check className="w-5 h-5 text-[#B03A2E]" />
                      </div>
                      <span className="text-[#2C1A1A] text-sm font-bold leading-snug font-sans">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a href="#contact"
                    onClick={() => setFormData(prev => ({ ...prev, product: activeProduct.id }))}
                    className="inline-flex items-center gap-3 bg-[#2C1A1A] text-white font-bold text-sm uppercase tracking-widest px-10 py-5 md:py-6 rounded-full hover:bg-[#B03A2E] transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(176,58,46,0.4)] hover:-translate-y-1 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B03A2E]">
                    Đăng Ký Tư Vấn {activeProduct.id === 'shophouse' ? '' : 'Căn '} {activeProduct.name} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* MẶT BẰNG TỔNG THỂ */}
          <Reveal direction="up" delay={0.25}>
            <div className="bg-gradient-to-br from-[#F5EDE8] to-[#FAF3F0] rounded-[2.5rem] pt-12 pb-6 border border-[#E8D7CF] shadow-lg">
              <h3 className="text-2xl md:text-4xl font-bold text-[#2C1A1A] mb-6 font-sans text-center px-4">
                Mặt Bằng Tầng Tổng Thể
              </h3>
              <CoverflowCarousel items={floorPlans} imageFit="contain" showTextOutside={true} />
            </div>
          </Reveal>

          {/* ============================================ */}
          {/* KHÔNG GIAN SỐNG / NHÀ MẪU */}
          {/* ============================================ */}
          <Reveal direction="up" delay={0.3} className="mt-24 pt-24 border-t border-[#E8D7CF]" id="showroom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#B03A2E]" />
                <span className="text-[#B03A2E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Không Gian Sống</span>
                <div className="h-px w-12 bg-[#B03A2E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A1A] mb-6 leading-tight font-sans">
                Hình Ảnh Nhà Mẫu
              </h2>
              <p className="text-[#5D4E4E] text-base md:text-lg leading-relaxed font-sans">
                Chiêm ngưỡng không gian sống được thiết kế tỉ mỉ, bàn giao full nội thất cao cấp với tiêu chuẩn vật liệu vì sức khỏe E0.
              </p>
            </div>
            
            <CoverflowCarousel items={showroomGallery} imageFit="cover" showTextOutside={true} />
          </Reveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* AMENITIES SECTION */}
      {/* ============================================ */}
      <section id="amenities" className="py-20 md:py-32 bg-[#1C0F0F] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#B03A2E]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[#C9A84C]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase font-sans">Tiện Ích Nội Khu</span>
                <div className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
                Đẳng Cấp Nghỉ Dưỡng Resort
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans">
                Hệ sinh thái 36 tiện ích nội khu được đầu tư bài bản, mang đến trải nghiệm sống trọn vẹn và đủ đầy mỗi ngày.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up">
            <div className="relative rounded-3xl overflow-hidden mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-[#1A0A08]">
              <Image src="/ava-center/tongtienich.png"
                alt="Tổng quan tiện ích AVA Center" width={1400} height={700}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <p className="text-center text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-20 font-sans">Sơ đồ bố trí tiện ích tổng thể</p>
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
                <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 text-center hover:bg-white/10 border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-300 hover:-translate-y-1.5 cursor-default">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-xl bg-[#C9A84C]/10 group-hover:bg-[#C9A84C] flex items-center justify-center mb-4 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-[#C9A84C] group-hover:text-[#1C0F0F] transition-colors" />
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
                    <cat.icon className="w-7 h-7 text-[#C9A84C] group-hover:text-[#1C0F0F] transition-colors" />
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

      {/* ============================================ */}
      {/* PROGRESS & LEGAL */}
      {/* ============================================ */}
      <section id="progress" className="py-20 md:py-32 bg-[#F5EDE8] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#B03A2E]" />
                <span className="text-[#B03A2E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Bảo Chứng Niềm Tin</span>
                <div className="h-px w-12 bg-[#B03A2E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C1A1A] mb-6 leading-tight font-sans">
                Pháp Lý & Tiến Độ
              </h2>
              <p className="text-[#5D4E4E] text-base md:text-lg leading-relaxed font-sans">
                Được bảo chứng bởi các thương hiệu hàng đầu và hành lang pháp lý chuẩn chỉnh, AVA Center mang đến sự an tâm tuyệt đối cho khách hàng và nhà đầu tư.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <Hammer className="text-[#B03A2E] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C1A1A] font-sans">Tiến Độ Xây Dựng</h3>
                </div>

                <div className="relative pl-6 md:pl-10 space-y-0">
                  {milestones.map((m, idx) => (
                    <div key={m.id} className="relative pb-10 last:pb-0">
                      {idx < milestones.length - 1 && (
                        <div className="absolute left-[-27px] md:left-[-35px] top-6 bottom-0 w-1 bg-[#E8D7CF] rounded-full" />
                      )}
                      <div className={cn(
                        "absolute -left-[33px] md:-left-[41px] top-1 w-7 h-7 rounded-full border-4 border-[#F5EDE8] flex items-center justify-center z-10 shadow-sm",
                        m.status === "completed" ? "bg-[#2C8A4F]"
                          : m.status === "in-progress" ? "bg-[#B03A2E] ring-4 ring-[#B03A2E]/20"
                          : "bg-[#E8D7CF]"
                      )}>
                        {m.status === "in-progress" && (
                          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                        )}
                      </div>

                      <div className={cn(
                        "rounded-3xl p-6 md:p-8 border transition-all duration-300",
                        m.status === "in-progress" ? "bg-white border-[#B03A2E]/40 shadow-xl scale-[1.02]"
                          : m.status === "completed" ? "bg-[#F0FBF5] border-[#2C8A4F]/20 shadow-sm"
                          : "bg-white border-[#E8D7CF] shadow-sm opacity-80"
                      )}>
                        <span className={cn(
                          "inline-block text-[11px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 font-sans",
                          m.status === "completed" ? "bg-[#2C8A4F]/15 text-[#2C8A4F]"
                            : m.status === "in-progress" ? "bg-[#B03A2E]/15 text-[#B03A2E]"
                            : "bg-[#F5EDE8] text-[#8A7D7D]"
                        )}>
                          {m.date}
                        </span>
                        <h4 className="text-lg md:text-xl font-bold text-[#2C1A1A] mb-2 font-sans">{m.title}</h4>
                        <p className="text-[#5D4E4E] text-sm md:text-base leading-relaxed font-sans">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="space-y-8 md:space-y-10">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#E8D7CF]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#FFF0EE] rounded-2xl flex items-center justify-center shrink-0">
                      <Shield className="text-[#B03A2E] w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#2C1A1A] font-sans">Hồ Sơ Pháp Lý</h3>
                  </div>
                  <ul className="space-y-4">
                    {legalDocuments.map((doc) => (
                      <li key={doc} className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[#F5EDE8] hover:bg-[#E8D7CF]/50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#2C8A4F]/20 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-[#2C8A4F]" />
                        </div>
                        <span className="text-[#2C1A1A] font-semibold text-sm md:text-base leading-relaxed font-sans">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative bg-[#1C0F0F] rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#B03A2E] rounded-full blur-[80px] opacity-50 pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#C9A84C] rounded-full blur-[80px] opacity-30 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                        <BarChart2 className="text-[#C9A84C] w-6 h-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-sans">Chính Sách Tài Chính</h3>
                    </div>

                    <div className="space-y-5">
                      {[
                        { rate: "0%", title: "Lãi suất 0% trong 24 tháng", desc: "Ân hạn nợ gốc và hỗ trợ lãi suất cho đến khi nhận nhà." },
                        { rate: "70%", title: "Ngân hàng hỗ trợ vay 70%", desc: "Bảo lãnh dự án bởi các ngân hàng uy tín hàng đầu." },
                      ].map((item) => (
                        <div key={item.rate} className="flex items-center gap-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                            <span className="text-2xl md:text-3xl font-bold text-[#C9A84C] font-sans">{item.rate}</span>
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

      {/* ============================================ */}
      {/* CONTACT */}
      {/* ============================================ */}
      <section id="contact" className="py-20 md:py-32 bg-[#F5EDE8] border-t border-[#E8D7CF] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#B03A2E]/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-[#B03A2E]" />
                  <span className="text-[#B03A2E] text-xs font-bold tracking-[0.2em] uppercase font-sans">Liên Hệ Ngay Hôm Nay</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C1A1A] mb-6 leading-tight font-sans text-balance">
                  Giữ Chỗ Căn Đẹp Nhận Chiết Khấu.
                </h2>
                <p className="text-[#5D4E4E] text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-sans max-w-lg">
                  Đăng ký ngay để nhận trọn bộ tài liệu dự án, mặt bằng chi tiết từng tầng và bảng tính dòng tiền ưu đãi trực tiếp từ đơn vị phát triển AVA Corp.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Hotline CSKH 24/7", value: "0901 234 567", href: "tel:0901234567", isLarge: true },
                    { icon: Mail, label: "Email Hỗ Trợ", value: "info@avacenter.vn", href: "mailto:info@avacenter.vn", isLarge: false },
                  ].map((c) => (
                    <a key={c.label} href={c.href} className="flex items-center gap-5 bg-white p-6 rounded-3xl border border-[#E8D7CF] hover:border-[#B03A2E]/40 hover:shadow-xl transition-all duration-300 group outline-none focus:ring-2 focus:ring-[#B03A2E]">
                      <div className="w-14 h-14 bg-[#FFF0EE] group-hover:bg-[#B03A2E] rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm">
                        <c.icon className="w-6 h-6 text-[#B03A2E] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[#8A7D7D] text-xs font-bold uppercase tracking-widest mb-1 font-sans">{c.label}</p>
                        <p className={cn("font-bold text-[#2C1A1A] group-hover:text-[#B03A2E] transition-colors font-sans", c.isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>
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
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-2xl border border-[#E8D7CF]">
                <h3 className="text-2xl md:text-3xl font-bold text-[#2C1A1A] mb-8 md:mb-10 text-center font-sans">
                  Đăng Ký Tư Vấn
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#2C8A4F]/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <Check className="w-10 h-10 md:w-12 md:h-12 text-[#2C8A4F]" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#2C1A1A] mb-3 font-sans">Đăng Ký Thành Công!</h4>
                    <p className="text-[#5D4E4E] text-base mb-8 leading-relaxed font-sans">Chuyên viên của chúng tôi sẽ gọi lại cho quý khách trong thời gian sớm nhất.</p>
                    <button onClick={() => setIsSubmitted(false)} className="text-[#B03A2E] font-bold text-base underline underline-offset-4 hover:text-[#8B2E24] transition-colors font-sans focus:outline-none focus:ring-2 focus:ring-[#B03A2E] rounded-md px-2 py-1">
                      Đăng ký thêm thông tin khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                    <div>
                      <label className="block text-xs font-bold text-[#5D4E4E] uppercase tracking-widest mb-2.5">Họ và tên <span className="text-[#B03A2E]">*</span></label>
                      <Input required placeholder="Nhập họ và tên của bạn..."
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#F5EDE8] border-transparent py-6 focus-visible:ring-[#B03A2E] focus-visible:ring-2 placeholder:text-[#C4B5B5] text-sm md:text-base rounded-xl" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#5D4E4E] uppercase tracking-widest mb-2.5">Điện thoại <span className="text-[#B03A2E]">*</span></label>
                        <Input required type="tel" placeholder="09xx..."
                          value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-[#F5EDE8] border-transparent py-6 focus-visible:ring-[#B03A2E] focus-visible:ring-2 placeholder:text-[#C4B5B5] text-sm md:text-base rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5D4E4E] uppercase tracking-widest mb-2.5">Sản phẩm quan tâm</label>
                        <div className="relative">
                          <select value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                            className="w-full h-[50px] rounded-xl bg-[#F5EDE8] border-0 px-4 text-sm md:text-base text-[#2C1A1A] focus:outline-none focus:ring-2 focus:ring-[#B03A2E] appearance-none cursor-pointer">
                            <option value="">Chọn loại căn...</option>
                            <option value="Studio">Studio (~31m²)</option>
                            <option value="1PN">1 Phòng ngủ (~45m²)</option>
                            <option value="2PN">2 Phòng ngủ (~67m²)</option>
                            <option value="3PN">3 Phòng ngủ (~85-95m²)</option>
                            <option value="Officetel">Officetel</option>
                            <option value="Shophouse">Shophouse Khối đế</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7D7D] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5D4E4E] uppercase tracking-widest mb-2.5">Email <span className="text-[#8A7D7D] normal-case tracking-normal font-normal">(Tùy chọn)</span></label>
                      <Input type="email" placeholder="Để nhận tài liệu qua email..."
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#F5EDE8] border-transparent py-6 focus-visible:ring-[#B03A2E] focus-visible:ring-2 placeholder:text-[#C4B5B5] text-sm md:text-base rounded-xl" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5D4E4E] uppercase tracking-widest mb-2.5">Ghi chú thêm</label>
                      <textarea rows={3} placeholder="Bạn cần tư vấn vấn đề gì..."
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border-0 bg-[#F5EDE8] px-4 py-4 text-sm md:text-base text-[#2C1A1A] placeholder:text-[#C4B5B5] focus:outline-none focus:ring-2 focus:ring-[#B03A2E] resize-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className={cn(
                        "w-full py-5 rounded-2xl font-bold text-sm uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B03A2E]",
                        isSubmitting
                          ? "bg-[#B03A2E]/50 cursor-not-allowed"
                          : "bg-[#B03A2E] hover:bg-[#8B2E24] shadow-[0_10px_30px_rgba(176,58,46,0.3)] hover:shadow-[0_15px_40px_rgba(176,58,46,0.4)] hover:-translate-y-1"
                      )}>
                      {isSubmitting ? (
                        <><span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> Đang gửi...</>
                      ) : (
                        <><Send size={18} /> Nhận Báo Giá Ngay</>
                      )}
                    </button>
                    <p className="text-center text-xs text-[#8A7D7D] mt-4 font-sans flex items-center justify-center gap-1.5">
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

      {/* Modal Phóng To Bản Đồ */}
      {isMapZoomed && (
        <div className="fixed inset-0 z-[100] bg-[#1A0A08]/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" 
             onClick={() => setIsMapZoomed(false)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-[#B03A2E] text-white rounded-full p-3 transition-colors z-50 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => { e.stopPropagation(); setIsMapZoomed(false); }}
            aria-label="Đóng bản đồ"
          >
            <X size={28} />
          </button>
          <div 
            className="relative w-full max-w-6xl aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 border border-white/20 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src="/ava-center/mapsavacenter.png" 
              alt="Bản đồ AVA Center phóng to" 
              fill 
              className="object-contain p-4" 
            />
          </div>
        </div>
      )}
    </main>
  )
}