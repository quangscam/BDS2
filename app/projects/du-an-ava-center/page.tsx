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

function Reveal({ children, delay = 0, direction = 'up', threshold = 0.08, style = {}, className = '' }: {
  children: React.ReactNode; delay?: number; direction?: Direction
  threshold?: number; style?: React.CSSProperties; className?: string
}) {
  const { ref, visible } = useScrollReveal(threshold)
  const init: Record<Direction, string> = {
    up: 'translateY(50px)', down: 'translateY(-50px)',
    left: 'translateX(-50px)', right: 'translateX(50px)', scale: 'scale(0.88)',
  }
  return (
    <div ref={ref} className={className} style={{
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
      showTextOutside ? "h-[400px] sm:h-[500px] md:h-[600px]" : "h-[350px] sm:h-[450px] md:h-[550px]"
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
                "absolute top-0 bottom-0 my-auto w-[80%] md:w-[70%] lg:w-[850px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col",
                !isCenter && "cursor-pointer hover:opacity-100",
                isDark ? "bg-black/20 border border-white/10" : "bg-white border border-[#E8D7CF]",
                showTextOutside ? "h-[85%]" : "h-[100%]" // Đổi chiều cao để vừa text
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
                    imageFit === "contain" ? "object-contain p-2 md:p-4 mix-blend-multiply" : "object-cover"
                  )} 
                />
                
                {/* Lớp gradient mờ đè lên nếu fit là cover và KHÔNG hiển thị text outside */}
                {imageFit === "cover" && !showTextOutside && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F0F]/90 via-transparent to-transparent pointer-events-none" />
                )}
                
                {/* Hiện Title đè lên ảnh nếu showTextOutside = false */}
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

      {/* Hiển thị Text nằm ngoài hình ảnh (dành cho mặt bằng để không che chữ) */}
      {showTextOutside && (
        <div className="absolute bottom-2 left-0 right-0 text-center z-40 transition-opacity duration-300">
          <p className={cn(
            "inline-block font-bold text-sm md:text-base px-6 py-2.5 rounded-full shadow-md font-sans",
            isDark ? "bg-black/50 text-white border border-white/20" : "bg-white text-[#B03A2E] border border-[#E8D7CF]"
          )}>
            {displayItems[currentIndex]?.title}
          </p>
        </div>
      )}

      {/* Điều hướng */}
      <button onClick={prev} className={cn("absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#B03A2E]" : "bg-white/90 backdrop-blur shadow-lg border border-[#E8D7CF] text-[#2C1A1A] hover:bg-[#B03A2E] hover:text-white")}>
        <ArrowLeft size={20} />
      </button>
      <button onClick={next} className={cn("absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all z-40 opacity-0 group-hover/carousel:opacity-100", isDark ? "bg-black/50 border border-white/20 text-white hover:bg-[#B03A2E]" : "bg-white/90 backdrop-blur shadow-lg border border-[#E8D7CF] text-[#2C1A1A] hover:bg-[#B03A2E] hover:text-white")}>
        <ArrowRight size={20} />
      </button>
    </div>
  )
}

/* ─── Data ─── */
const navLinks = [
  { href: "#overview", label: "Tổng Quan" },
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

// CHỈ CHỨA ẢNH MẶT BẰNG
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
    id: "officetel", name: "Officetel", area: "~35-50m²", price: "Từ 1.5 tỷ",
    description: "Kết hợp ở và làm việc",
    features: ["Thiết kế đa năng", "Phù hợp văn phòng nhỏ", "Sở hữu lâu dài", "Sinh lời cho thuê cao"],
    popular: false,
    gallery: [{ src: "/ava-center/3.png", title: "Mặt Bằng Officetel Đề Xuất" }]
  },
]

// MẢNG DỮ LIỆU RIÊNG CHO CĂN HỘ MẪU
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
  
  const [isMapZoomed, setIsMapZoomed] = useState(false)

  useEffect(() => {
    setIsHeroLoaded(true)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e: Event) {
        e.preventDefault()
        const targetId = (this as HTMLAnchorElement).getAttribute('href')
        if (targetId && targetId !== '#') {
          const el = document.querySelector(targetId)
          if (el) {
            const offset = el.getBoundingClientRect().top + window.pageYOffset - 100
            window.scrollTo({ top: offset, behavior: "smooth" })
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
    <main className="min-h-screen bg-[#FDFAF6] overflow-x-hidden">
      {/* CSS Ẩn thanh cuộn cho các danh sách trượt ngang */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <Header />

      {/* ── Sub-Nav ── */}
      <div className="fixed top-[64px] md:top-[80px] left-0 right-0 z-40 backdrop-blur-xl bg-white/80 border-b border-[#E8D7CF]/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-10 py-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="text-[11px] font-bold text-[#5D4E4E] hover:text-[#B03A2E] tracking-[0.15em] uppercase transition-colors relative group font-sans">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B03A2E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="#contact"
              className="ml-2 text-[11px] font-bold bg-[#B03A2E] text-white px-6 py-2.5 rounded-full tracking-[0.15em] uppercase hover:bg-[#8B2E24] transition-all hover:shadow-lg hover:shadow-[#B03A2E]/30 hover:-translate-y-0.5 font-sans">
              Đăng Ký Ngay
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center justify-between py-2.5">
            <span className="text-[#2C1A1A] font-bold text-sm tracking-wider font-sans">AVA CENTER</span>
            <div className="flex items-center gap-3">
              <a href="#contact" className="text-[10px] font-bold bg-[#B03A2E] text-white px-4 py-2 rounded-full tracking-wider uppercase font-sans">
                Đăng Ký
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-[#F5EDE8]">
                <span className={cn("w-5 h-0.5 bg-[#2C1A1A] transition-all", mobileMenuOpen && "rotate-45 translate-y-2")} />
                <span className={cn("w-5 h-0.5 bg-[#2C1A1A] transition-all", mobileMenuOpen && "opacity-0")} />
                <span className={cn("w-5 h-0.5 bg-[#2C1A1A] transition-all", mobileMenuOpen && "-rotate-45 -translate-y-2")} />
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-[#E8D7CF] py-3 space-y-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-2 text-xs font-bold text-[#5D4E4E] tracking-wider uppercase font-sans">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-[100svh] flex items-end pb-16 md:pb-24 justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/ava-center/tongquanava.png" alt="Tổng quan AVA Center" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A08] via-[#1A0A08]/50 to-[#1A0A08]/20" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent z-10" />

        <div className={cn("relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-1200", isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 border border-[#C9A84C]/50 rounded-full px-5 py-2 bg-[#C9A84C]/10 backdrop-blur-sm">
              <Star className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase font-sans">Touchable Home — Sống Chuẩn Gu</span>
              <Star className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
            </div>
          </div>
          <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-4 tracking-tight leading-none font-sans">
            AVA<br className="sm:hidden" /> <span className="text-[#C9A84C]">CENTER</span>
          </h1>
          <p className="text-center text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-3 font-medium font-sans">Biểu tượng kiến trúc mới tại cửa ngõ Đông Bắc</p>
          <div className="flex items-center justify-center gap-2 mb-10">
            <MapPin size={14} className="text-[#B03A2E] shrink-0" />
            <p className="text-white/60 text-xs sm:text-sm font-sans">Mặt tiền đường Thủ Khoa Huân, TP. Thuận An, Bình Dương</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-10 md:mb-12">
            {[
              { value: "40", unit: "tầng", label: "Tháp A" },
              { value: "635+", unit: "căn", label: "Căn hộ cao cấp" },
              { value: "36", unit: "tiện ích", label: "Nội khu" },
              { value: "Q4/2027", unit: "", label: "Dự kiến bàn giao" },
            ].map((stat) => (
              <div key={stat.label} className="relative text-center bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/10 overflow-hidden group hover:border-[#C9A84C]/40 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A84C] leading-none mb-0.5 font-sans">{stat.value}</p>
                {stat.unit && <p className="text-white/50 text-[10px] uppercase tracking-wider font-sans">{stat.unit}</p>}
                <p className="text-white/70 text-[11px] md:text-xs uppercase tracking-wider font-bold mt-1 font-sans">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#B03A2E] hover:bg-[#8B2E24] text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm tracking-widest uppercase transition-all hover:shadow-2xl hover:shadow-[#B03A2E]/40 hover:-translate-y-1 font-sans">
              Đăng Ký Nhận Bảng Giá <ArrowRight size={16} />
            </a>
            <a href="#overview" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl text-xs sm:text-sm tracking-widest uppercase transition-all backdrop-blur-sm font-sans">
              Khám Phá Dự Án
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-12">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                <div className="w-1 h-2.5 bg-white/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TỔNG QUAN DỰ ÁN */}
      {/* ============================================ */}
      <section id="overview" className="py-20 md:py-32 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#B03A2E]" />
                <span className="text-[#B03A2E] text-[10px] font-bold tracking-[0.3em] uppercase font-sans">Tổng Quan Dự Án</span>
                <div className="h-px w-10 bg-[#B03A2E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A1A] mb-5 leading-tight font-sans">Nhà Sang, Giá Xịn</h2>
              <p className="text-[#5D4E4E] text-base md:text-lg leading-relaxed font-sans">AVA Center là tổ hợp căn hộ cao cấp, thương mại dịch vụ và văn phòng lưu trú mang tính biểu tượng mới tại khu vực cửa ngõ Đông Bắc Bình Dương.</p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
  <Reveal direction="left">
    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-[#E8D7CF] group">
      <div className="relative aspect-[4/3]">
        <Image 
          src="/ava-center/tongquanava.png" 
          alt="Nội thất căn hộ AVA Center" 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {/* Đổi dải mờ đen chỉ phủ 1/2 phần dưới cùng của ảnh để không làm tối phần trên tòa nhà */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2C1A1A]/90 to-transparent" />
      </div>
      
      {/* Thu nhỏ padding xung quanh và padding trong hộp để khối chú thích mỏng gọn lại */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
      </div>
    </div>
  </Reveal>

            <Reveal direction="right">
              <div className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Chủ đầu tư", value: "Công ty TNHH Tyson An Phú" },
                    { label: "Phát triển", value: "Tập đoàn AVA Corp" },
                    { label: "Tổng thầu", value: "Hòa Bình Group" },
                    { label: "Quy mô", value: "7.300m² — 9.400m²" },
                  ].map((item) => (
                    <div key={item.label} className="border-l-[3px] border-[#B03A2E] pl-4 py-1">
                      <p className="text-[#8A7D7D] text-[10px] font-bold uppercase tracking-widest mb-1 font-sans">{item.label}</p>
                      <p className="text-[#2C1A1A] font-bold text-sm leading-snug font-sans">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-[#F5EDE8] to-[#FAF3F0] rounded-2xl p-6 md:p-8 border border-[#E8D7CF]">
                  <h3 className="text-lg md:text-xl font-bold text-[#B03A2E] mb-5 font-sans">Cấu Trúc Biểu Tượng</h3>
                  <ul className="space-y-4">
                    {[
                      { label: "Block A", desc: "Tháp căn hộ cao 40 tầng, cung cấp khoảng 635 căn." },
                      { label: "Block B", desc: "Tháp thương mại - dịch vụ & tiện ích cao 6 tầng." },
                      { label: "Sky Bridge", desc: "Cầu kính không trung kết nối 2 tháp tại tầng 21 cực kỳ đẳng cấp." },
                      { label: "1 Tầng hầm", desc: "Rộng rãi, đáp ứng chỗ đỗ xe cho toàn bộ cư dân." },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#B03A2E] mt-1.5 shrink-0" />
                        <span className="text-[#5D4E4E] text-sm leading-relaxed font-sans">
                          <strong className="text-[#2C1A1A]">{item.label}:</strong> {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, idx) => (
              <Reveal key={feature.title} direction="up" delay={idx * 0.1}>
                <div className="group bg-white rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-xl border border-[#E8D7CF] hover:border-[#B03A2E]/30 transition-all duration-300 h-full hover:-translate-y-1">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FFF0EE] group-hover:bg-[#B03A2E] flex items-center justify-center mb-5 md:mb-6 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#B03A2E] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-[#2C1A1A] mb-3 font-sans">{feature.title}</h3>
                  <p className="text-[#5D4E4E] text-sm leading-relaxed font-sans">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* LOCATION (ZOOMABLE MAP) */}
      {/* ============================================ */}
      <section id="location" className="py-20 md:py-32 bg-[#1C0F0F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#B03A2E]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[10px] font-bold tracking-[0.3em] uppercase font-sans">Vị Trí Chiến Lược</span>
                <div className="h-px w-10 bg-[#C9A84C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight font-sans">Tọa Độ Vàng Giao Thương</h2>
              <p className="text-white/65 text-base md:text-lg leading-relaxed font-sans">
                Nằm trên mặt tiền đường Thủ Khoa Huân, liền kề Quốc lộ 13 — vị trí giao thoa 3 trục giao thông huyết mạch.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-6 md:gap-8 mb-10">
            {/* Map Clickable */}
            <Reveal direction="left" className="lg:col-span-3">
              <div 
                onClick={() => setIsMapZoomed(true)}
                className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group cursor-pointer bg-white" 
                style={{ minHeight: '360px' }}
              >
                <Image src="/ava-center/mapsavacenter.png" alt="Bản đồ vị trí AVA Center" fill className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]" />
                
                {/* Overlay Zoom Báo Hiệu */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1C0F0F]/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-[#B03A2E] text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(176,58,46,0.5)] scale-90 group-hover:scale-100">
                    <Maximize2 size={28} />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1C0F0F]/80 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-[#E8D7CF] pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#FFF0EE] rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#B03A2E]" />
                    </div>
                    <div>
                      <p className="text-[#2C1A1A] font-bold text-sm font-sans">AVA CENTER</p>
                      <p className="text-[#5D4E4E] text-[11px] font-sans">Click ảnh để phóng to bản đồ</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-2 space-y-4">
              {connections.map((item, idx) => (
                <Reveal key={item.title} direction="right" delay={idx * 0.1}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/8 hover:bg-white/10 hover:border-[#C9A84C]/30 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C]/25 transition-colors">
                        <item.icon className="w-5 h-5 text-[#C9A84C]" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm md:text-base mb-1.5 font-sans leading-tight">{item.title}</h3>
                        <p className="text-white/60 text-xs md:text-sm leading-relaxed font-sans">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          
          {/* Nearby grid */}
          <Reveal direction="up">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/8">
              <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase text-center mb-6 font-sans">Kết Nối Hoàn Hảo — Ngàn Tiện Ích Xung Quanh</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {nearbyPlaces.map((place) => (
                  <div key={place.name}
                    className="text-center p-4 rounded-xl bg-white/5 hover:bg-[#B03A2E] border border-white/10 hover:border-[#B03A2E] transition-all duration-300 group cursor-default">
                    <p className="text-xl font-bold text-white mb-1.5 font-sans">{place.time}</p>
                    <p className="text-white/60 text-[11px] font-medium group-hover:text-white/90 leading-tight font-sans">{place.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRODUCTS & GALLERY (MẶT BẰNG & CĂN HỘ MẪU) */}
      {/* ============================================ */}
      <section id="products" className="py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#B03A2E]" />
                <span className="text-[#B03A2E] text-[10px] font-bold tracking-[0.3em] uppercase font-sans">Sản Phẩm & Thiết Kế</span>
                <div className="h-px w-10 bg-[#B03A2E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A1A] mb-5 leading-tight font-sans">Đa Dạng Lựa Chọn</h2>
            </div>
          </Reveal>

          {/* Product tabs */}
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-12">
              {productTypes.map((p) => (
                <button key={p.id} onClick={() => setSelectedProduct(p.id)}
                  className={cn(
                    "relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans",
                    selectedProduct === p.id ? "bg-[#B03A2E] text-white shadow-lg shadow-[#B03A2E]/30 scale-105" : "bg-[#F5EDE8] text-[#5D4E4E] hover:bg-[#E8D7CF] border border-[#E8D7CF]"
                  )}>
                  {p.name}
                  {p.popular && <span className="absolute -top-2 -right-2 text-[9px] bg-[#C9A84C] text-[#1A0A08] px-1.5 py-0.5 rounded-full font-bold font-sans">Hot</span>}
                </button>
              ))}
            </div>
          </Reveal>

          {/* GALLERY MẶT BẰNG (COVERFLOW 3D) - HIỂN THỊ TEXT Ở NGOÀI */}
          <Reveal direction="up" delay={0.15}>
            <div className="mb-4">
              <p className="text-center text-[#8A7D7D] text-[10px] font-bold uppercase tracking-[0.25em] mb-2 font-sans">Mặt Bằng Căn Hộ — {activeProduct.name}</p>
              
              <CoverflowCarousel items={activeProduct.gallery} imageFit="contain" showTextOutside={true} />

            </div>
          </Reveal>

          {/* CHI TIẾT CĂN HỘ (ĐÃ THIẾT KẾ LẠI) */}
          <Reveal direction="up" delay={0.2}>
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-[#E8D7CF]/50 relative overflow-hidden mb-12 mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5EDE8] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5EDE8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60" />

              <div className="relative z-10 max-w-4xl mx-auto text-center">
                {activeProduct.popular && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#B03A2E] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 shadow-md font-sans">
                    <Star className="w-3 h-3 fill-white" /> Sản phẩm được săn đón nhất
                  </span>
                )}

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A1A] mb-8 font-sans">
                  Căn hộ {activeProduct.name}
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-8">
                  <div className="flex flex-col items-center">
                    <span className="text-[#8A7D7D] text-[10px] uppercase tracking-widest font-bold mb-1.5 font-sans">Diện tích thông thủy</span>
                    <span className="text-[#2C1A1A] text-xl font-bold font-sans">{activeProduct.area}</span>
                  </div>
                  <div className="w-px h-10 bg-[#E8D7CF] hidden md:block" />
                  <div className="flex flex-col items-center">
                    <span className="text-[#8A7D7D] text-[10px] uppercase tracking-widest font-bold mb-1.5 font-sans">Mức giá tham khảo</span>
                    <span className="text-[#B03A2E] text-3xl md:text-4xl font-bold font-sans">{activeProduct.price}</span>
                  </div>
                </div>

                <div className="relative py-6 mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full border-t border-[#E8D7CF]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-6 text-[#5D4E4E] italic text-base md:text-lg font-medium font-sans">
                      "{activeProduct.description}"
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {activeProduct.features.map((f) => (
                    <div key={f} className="flex flex-col items-center justify-center text-center bg-[#F5EDE8]/50 p-4 md:p-5 rounded-2xl border border-[#E8D7CF]/50 hover:bg-[#F5EDE8] transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
                        <Check className="w-4 h-4 text-[#B03A2E]" />
                      </div>
                      <span className="text-[#2C1A1A] text-xs md:text-sm font-bold leading-snug font-sans">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a href="#contact"
                    onClick={() => setFormData(prev => ({ ...prev, product: activeProduct.id }))}
                    className="inline-flex items-center gap-2 bg-[#2C1A1A] text-white font-bold text-xs uppercase tracking-widest px-10 py-5 rounded-full hover:bg-[#B03A2E] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 font-sans">
                    Đăng Ký Tư Vấn Căn {activeProduct.name} <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* MẶT BẰNG TỔNG THỂ (COVERFLOW 3D) */}
          <Reveal direction="up" delay={0.25}>
            <div className="bg-gradient-to-br from-[#F5EDE8] to-[#FAF3F0] rounded-3xl pt-10 pb-4 border border-[#E8D7CF]">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2C1A1A] mb-4 font-sans text-center">
                Mặt Bằng Tầng Tổng Thể
              </h3>
              
              <CoverflowCarousel items={floorPlans} imageFit="contain" showTextOutside={true} />
              
            </div>
          </Reveal>

          {/* ============================================ */}
          {/* KHÔNG GIAN SỐNG / NHÀ MẪU (NEW SECTION) */}
          {/* ============================================ */}
          <Reveal direction="up" delay={0.3} className="mt-20 pt-20 border-t border-[#E8D7CF]" id="showroom">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#B03A2E]" />
                <span className="text-[#B03A2E] text-[10px] font-bold tracking-[0.3em] uppercase font-sans">Không Gian Sống Thượng Lưu</span>
                <div className="h-px w-10 bg-[#B03A2E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A1A] mb-5 leading-tight font-sans">
                Hình Ảnh Nhà Mẫu
              </h2>
              <p className="text-[#5D4E4E] text-base md:text-lg leading-relaxed font-sans">
                Chiêm ngưỡng không gian sống được thiết kế tỉ mỉ, bàn giao full nội thất cao cấp với tiêu chuẩn vật liệu vì sức khỏe E0.
              </p>
            </div>
            
            {/* Slider Nhà Mẫu (ảnh tràn viền, text nằm dưới) */}
            <CoverflowCarousel items={showroomGallery} imageFit="cover" showTextOutside={true} />
            
          </Reveal>

          {/* Shophouse CTA */}
          <Reveal direction="up" className="mt-12 md:mt-20">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0">
                <Image src="/ava-center/shophouseavacenter.jpg" alt="Shophouse Khối Đế" fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1C0F0F] via-[#1C0F0F]/90 to-[#1C0F0F]/40" />
              </div>
              <div className="relative z-10 p-8 md:p-10 lg:p-12">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 border border-[#C9A84C]/40 rounded-full px-4 py-1.5 bg-[#C9A84C]/10 mb-4">
                      <span className="text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase font-sans">Cơ Hội Đầu Tư Đặc Biệt</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-sans leading-tight">
                      Shophouse Khối Đế (Block B)
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-7 text-sm md:text-base font-sans">
                      Tọa lạc tại mặt tiền đường, phục vụ trực tiếp cộng đồng cư dân hơn 2.000 người và khách vãng lai khu vực sầm uất — "gà đẻ trứng vàng" với tiềm năng sinh lời vượt trội.
                    </p>
                    <a href="#contact"
                      className="inline-flex items-center gap-2 bg-[#B03A2E] text-white font-bold text-xs uppercase tracking-widest px-7 py-4 rounded-xl hover:bg-[#8B2E24] transition-all hover:shadow-xl hover:shadow-[#B03A2E]/30 hover:-translate-y-0.5 font-sans">
                      Tìm Hiểu Chi Tiết Shophouse <ArrowRight size={15} />
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {[
                      { label: "Vị trí", value: "Mặt tiền khối đế" },
                      { label: "Diện tích", value: "Đa dạng cấu trúc" },
                      { label: "Công năng", value: "Tối ưu Kinh doanh" },
                      { label: "Tiềm năng", value: "Sinh lời dài hạn" },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/15 hover:bg-white/15 transition-colors">
                        <p className="text-lg md:text-xl font-bold text-[#C9A84C] mb-1 font-sans">{item.value}</p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider font-sans">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* AMENITIES SECTION */}
      {/* ============================================ */}
      <section id="amenities" className="py-20 md:py-32 bg-[#1C0F0F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#B03A2E]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#C9A84C]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[10px] font-bold tracking-[0.3em] uppercase font-sans">Hệ Thống Tiện Ích Khép Kín</span>
                <div className="h-px w-10 bg-[#C9A84C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight font-sans">
                Đẳng Cấp Nghỉ Dưỡng Resort
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-sans">
                Hệ sinh thái 36 tiện ích nội khu được đầu tư bài bản, mang đến trải nghiệm sống trọn vẹn mỗi ngày.
              </p>
            </div>
          </Reveal>

          {/* Hero amenity image (Ảnh bìa tổng) */}
          <Reveal direction="up">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-6 shadow-2xl border border-white/10 group">
              <Image src="/ava-center/tongtienich.png"
                alt="Tổng quan tiện ích AVA Center" width={1400} height={700}
                className="w-full h-auto object-contain bg-[#1C0F0F]" />
            </div>
            <p className="text-center text-white/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-16 font-sans">Sơ đồ bố trí 36 tiện ích nội khu</p>
          </Reveal>

          {/* SLIDER COVERFLOW TIỆN ÍCH CHI TIẾT */}
          <Reveal direction="up" delay={0.15}>
            <div className="mb-16">
              <p className="text-center text-white/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-2 font-sans">Khám phá từng không gian tiện ích</p>
              {/* Truyền showTextOutside để text hiển thị dưới ảnh, không đè làm mờ ảnh */}
              <CoverflowCarousel items={amenitiesGallery} imageFit="cover" isDark={true} showTextOutside={true} />
            </div>
          </Reveal>

          {/* Amenity icons */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 mb-10 md:mb-12">
            {highlightAmenities.map((item, idx) => (
              <Reveal key={item.label} direction="up" delay={idx * 0.04}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center hover:bg-white/10 border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-[#C9A84C]/15 group-hover:bg-[#C9A84C] flex items-center justify-center mb-3 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[#C9A84C] group-hover:text-[#1C0F0F] transition-colors" />
                  </div>
                  <p className="text-white/80 group-hover:text-white text-[11px] md:text-xs font-bold leading-tight transition-colors font-sans">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Category cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {amenityCategories.map((cat, idx) => (
              <Reveal key={cat.title} direction="up" delay={idx * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-7 border border-white/10 h-full shadow-xl hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#C9A84C]/15 flex items-center justify-center mb-5 group-hover:bg-[#C9A84C] transition-colors duration-300">
                    <cat.icon className="w-5 h-5 md:w-6 md:h-6 text-[#C9A84C] group-hover:text-[#1C0F0F] transition-colors duration-300" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-4 font-sans">{cat.title}</h3>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-white/60 text-xs md:text-sm group-hover:text-white/80 transition-colors font-sans">
                        <Check className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                        <span className="font-medium leading-snug">{item}</span>
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
      <section id="progress" className="py-20 md:py-32 bg-[#F5EDE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#B03A2E]" />
                <span className="text-[#B03A2E] text-[10px] font-bold tracking-[0.3em] uppercase font-sans">Bảo Chứng Niềm Tin</span>
                <div className="h-px w-10 bg-[#B03A2E]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A1A] mb-5 leading-tight font-sans">
                Pháp Lý & Tiến Độ
              </h2>
              <p className="text-[#5D4E4E] text-base md:text-lg leading-relaxed font-sans">
                Được bảo chứng bởi các thương hiệu hàng đầu và hành lang pháp lý chuẩn chỉnh, AVA Center mang đến sự an tâm tuyệt đối.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Timeline */}
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Hammer className="text-[#B03A2E] w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C1A1A] font-sans">Cam Kết Tiến Độ — Hòa Bình Group</h3>
                </div>

                <div className="relative pl-6 md:pl-8 space-y-0">
                  {milestones.map((m, idx) => (
                    <div key={m.id} className="relative pb-8 last:pb-0">
                      {/* Vertical line */}
                      {idx < milestones.length - 1 && (
                        <div className="absolute left-[-23px] md:left-[-29px] top-5 bottom-0 w-0.5 bg-[#E8D7CF]" />
                      )}
                      {/* Dot */}
                      <div className={cn(
                        "absolute -left-[29px] md:-left-[35px] top-1 w-5 h-5 rounded-full border-4 border-[#F5EDE8] flex items-center justify-center z-10",
                        m.status === "completed" ? "bg-[#2C8A4F]"
                          : m.status === "in-progress" ? "bg-[#B03A2E] ring-4 ring-[#B03A2E]/20"
                          : "bg-[#E8D7CF]"
                      )}>
                        {m.status === "in-progress" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        )}
                      </div>

                      <div className={cn(
                        "rounded-xl p-5 md:p-6 border transition-all",
                        m.status === "in-progress"
                          ? "bg-white border-[#B03A2E]/40 shadow-md"
                          : m.status === "completed"
                          ? "bg-[#F0FBF5] border-[#2C8A4F]/20"
                          : "bg-white border-[#E8D7CF]"
                      )}>
                        <span className={cn(
                          "inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 font-sans",
                          m.status === "completed" ? "bg-[#2C8A4F]/15 text-[#2C8A4F]"
                            : m.status === "in-progress" ? "bg-[#B03A2E]/15 text-[#B03A2E]"
                            : "bg-[#F5EDE8] text-[#8A7D7D]"
                        )}>
                          {m.date}
                        </span>
                        <h4 className="text-base font-bold text-[#2C1A1A] mb-1.5 font-sans">{m.title}</h4>
                        <p className="text-[#5D4E4E] text-sm leading-relaxed font-sans">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Legal + Finance */}
            <Reveal direction="right">
              <div className="space-y-5 md:space-y-6">
                {/* Legal */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#E8D7CF]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#FFF0EE] rounded-xl flex items-center justify-center shrink-0">
                      <Shield className="text-[#B03A2E] w-5 h-5" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#2C1A1A] font-sans">Pháp Lý Minh Bạch</h3>
                  </div>
                  <ul className="space-y-3">
                    {legalDocuments.map((doc) => (
                      <li key={doc} className="flex items-start gap-3 p-3.5 md:p-4 rounded-xl bg-[#F5EDE8]">
                        <div className="w-5 h-5 rounded-full bg-[#2C8A4F]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#2C8A4F]" />
                        </div>
                        <span className="text-[#2C1A1A] font-semibold text-sm leading-relaxed font-sans">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Finance */}
                <div className="relative bg-[#1C0F0F] rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#B03A2E] rounded-full blur-3xl opacity-40 pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#C9A84C] rounded-full blur-3xl opacity-20 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <BarChart2 className="text-[#C9A84C] w-5 h-5" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white font-sans">Chính Sách Tài Chính</h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        { rate: "0%", title: "Lãi suất 0% trong 24 tháng", desc: "Ân hạn nợ gốc và hỗ trợ lãi suất cho đến khi nhận nhà." },
                        { rate: "70%", title: "Ngân hàng hỗ trợ vay 70%", desc: "Bảo lãnh dự án bởi các ngân hàng uy tín hàng đầu." },
                      ].map((item) => (
                        <div key={item.rate} className="flex items-center gap-4 bg-white/8 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                            <span className="text-lg md:text-xl font-bold text-[#C9A84C] font-sans">{item.rate}</span>
                          </div>
                          <div>
                            <p className="text-white font-bold text-sm md:text-base mb-1 font-sans">{item.title}</p>
                            <p className="text-white/60 text-xs md:text-sm leading-relaxed font-sans">{item.desc}</p>
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
      <section id="contact" className="py-20 md:py-32 bg-[#F5EDE8] border-t border-[#E8D7CF] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#B03A2E]/5 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left */}
            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-[#B03A2E]" />
                  <span className="text-[#B03A2E] text-[10px] font-bold tracking-[0.3em] uppercase font-sans">Liên Hệ Ngay Hôm Nay</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1A1A] mb-5 leading-tight font-sans text-center text-balance">
  Giữ Chỗ Căn Đẹp — Nhận Chiết Khấu Khủng
</h2>
                <p className="text-[#5D4E4E] text-sm md:text-base leading-relaxed mb-8 md:mb-10 font-sans">
                  Đăng ký ngay để nhận trọn bộ tài liệu dự án, mặt bằng chi tiết từng tầng và bảng tính dòng tiền ưu đãi trực tiếp từ đơn vị phát triển AVA Corp.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Hotline CSKH 24/7", value: "0901 234 567", href: "tel:0901234567", isLarge: true },
                    { icon: Mail, label: "Email Hỗ Trợ", value: "info@avacenter.vn", href: "mailto:info@avacenter.vn", isLarge: false },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E8D7CF] hover:border-[#B03A2E]/30 hover:shadow-md transition-all duration-300 group">
                      <div className="w-12 h-12 bg-[#FFF0EE] group-hover:bg-[#B03A2E] rounded-xl flex items-center justify-center shrink-0 transition-colors">
                        <c.icon className="w-5 h-5 text-[#B03A2E] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[#8A7D7D] text-[10px] font-bold uppercase tracking-widest mb-0.5 font-sans">{c.label}</p>
                        <a href={c.href} className={cn("font-bold text-[#2C1A1A] hover:text-[#B03A2E] transition-colors font-sans", c.isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg")}>
                          {c.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal direction="right">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-[#E8D7CF]">
                <h3 className="text-xl md:text-2xl font-bold text-[#2C1A1A] mb-6 md:mb-8 text-center font-sans">
                  Đăng Ký Tư Vấn
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2C8A4F]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Check className="w-8 h-8 md:w-10 md:h-10 text-[#2C8A4F]" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#2C1A1A] mb-2 font-sans">Đăng Ký Thành Công!</h4>
                    <p className="text-[#5D4E4E] text-sm mb-6 leading-relaxed font-sans">Chuyên viên của chúng tôi sẽ gọi lại cho quý khách trong thời gian sớm nhất.</p>
                    <button onClick={() => setIsSubmitted(false)} className="text-[#B03A2E] font-bold text-sm underline underline-offset-4 hover:text-[#8B2E24] transition-colors font-sans">
                      Đăng ký thêm thông tin khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                    <div>
                      <label className="block text-[10px] font-bold text-[#5D4E4E] uppercase tracking-widest mb-2">Họ và tên *</label>
                      <Input required placeholder="Nhập họ và tên của bạn..."
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#F5EDE8] border-transparent py-5 focus-visible:ring-[#B03A2E] focus-visible:ring-2 placeholder:text-[#C4B5B5] text-sm rounded-xl" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-[#5D4E4E] uppercase tracking-widest mb-2">Điện thoại *</label>
                        <Input required type="tel" placeholder="09xx..."
                          value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-[#F5EDE8] border-transparent py-5 focus-visible:ring-[#B03A2E] focus-visible:ring-2 placeholder:text-[#C4B5B5] text-sm rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#5D4E4E] uppercase tracking-widest mb-2">Sản phẩm quan tâm</label>
                        <select value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                          className="w-full h-[46px] rounded-xl bg-[#F5EDE8] border-0 px-3.5 text-sm text-[#2C1A1A] focus:outline-none focus:ring-2 focus:ring-[#B03A2E]">
                          <option value="">Chọn loại căn...</option>
                          <option value="Studio">Studio (~31m²)</option>
                          <option value="1PN">1 Phòng ngủ (~45m²)</option>
                          <option value="2PN">2 Phòng ngủ (~67m²)</option>
                          <option value="Officetel">Officetel</option>
                          <option value="Shophouse">Shophouse Khối đế</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#5D4E4E] uppercase tracking-widest mb-2">Email (Tùy chọn)</label>
                      <Input type="email" placeholder="Để nhận tài liệu qua email..."
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#F5EDE8] border-transparent py-5 focus-visible:ring-[#B03A2E] focus-visible:ring-2 placeholder:text-[#C4B5B5] text-sm rounded-xl" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#5D4E4E] uppercase tracking-widest mb-2">Ghi chú thêm</label>
                      <textarea rows={3} placeholder="Bạn cần tư vấn vấn đề gì..."
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border-0 bg-[#F5EDE8] px-4 py-3 text-sm text-[#2C1A1A] placeholder:text-[#C4B5B5] focus:outline-none focus:ring-2 focus:ring-[#B03A2E] resize-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className={cn(
                        "w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2 mt-2",
                        isSubmitting
                          ? "bg-[#B03A2E]/50 cursor-not-allowed"
                          : "bg-[#B03A2E] hover:bg-[#8B2E24] shadow-lg hover:shadow-xl hover:shadow-[#B03A2E]/30 hover:-translate-y-0.5"
                      )}>
                      {isSubmitting ? (
                        <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Đang gửi...</>
                      ) : (
                        <><Send size={15} /> Nhận Báo Giá Ngay</>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-[#8A7D7D] mt-2 font-sans">🔒 Thông tin của bạn được bảo mật tuyệt đối.</p>
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
        <div className="fixed inset-0 z-[100] bg-[#1A0A08]/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300" 
             onClick={() => setIsMapZoomed(false)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); setIsMapZoomed(false); }}
          >
            <X size={24} />
          </button>
          <div 
            className="relative w-full max-w-6xl aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src="/ava-center/mapsavacenter.png" 
              alt="Bản đồ AVA Center phóng to" 
              fill 
              className="object-contain bg-white" 
            />
          </div>
        </div>
      )}
    </main>
  )
}