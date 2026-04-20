'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Building2,
  Shield,
  Leaf,
  Sparkles,
  MapPin,
  Car,
  Clock,
  Building,
  Check,
  Waves,
  Dumbbell,
  ShoppingBag,
  Trees,
  GraduationCap,
  Coffee,
  BookOpen,
  Utensils,
  Baby,
  Hammer,
  Home,
  Mail,
  Send,
  Facebook,
  Youtube,
} from "lucide-react"

const navLinks = [
  { href: "#overview", label: "Tổng Quan" },
  { href: "#location", label: "Vị Trí" },
  { href: "#products", label: "Sản Phẩm" },
  { href: "#amenities", label: "Tiện Ích" },
  { href: "#progress", label: "Tiến Độ" },
  { href: "#contact", label: "Liên Hệ" },
]

const features = [
  {
    icon: Building2,
    title: "Kiến Trúc Biểu Tượng",
    description:
      "Hai tòa tháp kết nối bằng cầu kính Sky Bridge tại tầng 21, tạo điểm nhấn thị giác độc đáo.",
  },
  {
    icon: Shield,
    title: "Pháp Lý Minh Bạch",
    description:
      "Sổ hồng sở hữu lâu dài, bảo lãnh ngân hàng, ân hạn nợ gốc và hỗ trợ lãi suất 0% đến 24 tháng.",
  },
  {
    icon: Leaf,
    title: "Vật Liệu Vì Sức Khỏe",
    description:
      "Tiên phong áp dụng tiêu chuẩn ván gỗ E0, hàm lượng formaldehyde gần bằng 0, an toàn cho sức khỏe.",
  },
  {
    icon: Sparkles,
    title: "Full Nội Thất Cao Cấp",
    description:
      "Một trong những dự án hiếm hoi trên trục QL13 bàn giao hoàn thiện nội thất trọn gói.",
  },
]

const connections = [
  {
    icon: Car,
    title: "Quốc lộ 13",
    subtitle: "Đại lộ Bình Dương",
    description:
      "Trục kinh tế năng động đang được nâng cấp mở rộng lên 8 làn xe. Đủ gần để hưởng tiện ích sầm uất, đủ xa để tránh khói bụi.",
  },
  {
    icon: Building,
    title: "Đường Vành đai 3",
    subtitle: "Kết nối liên vùng",
    description:
      "Mạng lưới liên vùng giúp kết nối nhanh chóng đến TP.HCM và sân bay Long Thành tương lai.",
  },
  {
    icon: Clock,
    title: "Cao tốc Mỹ Phước - Tân Vạn",
    subtitle: "Trục logistics",
    description:
      'Trục "xương sống" logistics của toàn vùng Đông Nam Bộ, kết nối thuận tiện đến các KCN lớn.',
  },
]

const nearbyPlaces = [
  { name: "AEON Mall Bình Dương", time: "5 phút" },
  { name: "Bệnh viện Quốc tế Becamex", time: "7 phút" },
  { name: "Đại học Quốc tế Miền Đông", time: "10 phút" },
  { name: "Trung tâm TP.HCM", time: "25 phút" },
  { name: "Sân bay Tân Sơn Nhất", time: "35 phút" },
  { name: "KCN VSIP", time: "15 phút" },
]

const productTypes = [
  {
    id: "studio",
    name: "Studio",
    area: "~31m²",
    price: "Từ 1.2 tỷ",
    description: "Căn hộ thông minh cho người trẻ độc lập",
    features: [
      "Thiết kế tối ưu không gian",
      "Full nội thất cao cấp",
      "Logia đón nắng gió",
      "View đẹp thoáng mát",
    ],
    popular: false,
  },
  {
    id: "1pn",
    name: "1 Phòng Ngủ",
    area: "~45m²",
    price: "Từ 1.8 tỷ",
    description: "Lý tưởng cho cặp đôi trẻ",
    features: [
      "Phòng ngủ riêng biệt",
      "Phòng khách rộng rãi",
      "Full nội thất cao cấp",
      "Ban công view thành phố",
    ],
    popular: true,
  },
  {
    id: "2pn",
    name: "2 Phòng Ngủ",
    area: "~67m²",
    price: "Từ 2.5 tỷ",
    description: "Hoàn hảo cho gia đình nhỏ",
    features: [
      "2 phòng ngủ thoáng mát",
      "Phòng khách & bếp liên thông",
      "Full nội thất cao cấp",
      "2 ban công view panorama",
    ],
    popular: false,
  },
  {
    id: "officetel",
    name: "Officetel",
    area: "~35-50m²",
    price: "Từ 1.5 tỷ",
    description: "Kết hợp ở và làm việc",
    features: [
      "Thiết kế đa năng",
      "Phù hợp văn phòng nhỏ",
      "Sở hữu lâu dài",
      "Sinh lời cho thuê cao",
    ],
    popular: false,
  },
]

const highlightAmenities = [
  { icon: Waves, label: "Hồ bơi vô cực" },
  { icon: Dumbbell, label: "Phòng Gym" },
  { icon: Trees, label: "Công viên" },
  { icon: ShoppingBag, label: "TTTM" },
  { icon: Coffee, label: "Café" },
  { icon: Baby, label: "Khu vui chơi" },
  { icon: BookOpen, label: "Thư viện" },
  { icon: Utensils, label: "Nhà hàng" },
  { icon: Shield, label: "An ninh 24/7" },
  { icon: Car, label: "Hầm xe" },
  { icon: GraduationCap, label: "Mầm non" },
  { icon: Sparkles, label: "Spa" },
]

const amenityCategories = [
  {
    title: "Thể Thao & Sức Khỏe",
    icon: Dumbbell,
    items: ["Hồ bơi vô cực", "Phòng Gym hiện đại", "Yoga & Spa thư giãn", "Sân tennis"],
  },
  {
    title: "Mua Sắm & Ẩm Thực",
    icon: ShoppingBag,
    items: ["Khu thương mại sầm uất", "Siêu thị tiện lợi", "Nhà hàng & café", "Shophouse đa dạng"],
  },
  {
    title: "Giáo Dục & Trẻ Em",
    icon: GraduationCap,
    items: ["Trường mầm non quốc tế", "Khu vui chơi sáng tạo", "Thư viện tri thức", "Sân chơi ngoài trời"],
  },
  {
    title: "Tiện Ích Khác",
    icon: Sparkles,
    items: ["Công viên cây xanh", "Khu BBQ ngoài trời", "Phòng sinh hoạt cộng đồng", "Bãi đỗ xe thông minh"],
  },
]

const milestones = [
  {
    id: 1,
    title: "Lễ Động Thổ",
    date: "22/08/2025",
    description: "Khởi công chính thức, dọn dẹp và chuẩn bị mặt bằng",
    status: "completed",
    icon: Check,
  },
  {
    id: 2,
    title: "Thi Công Móng & Hầm",
    date: "Q4/2025 - Q1/2026",
    description: "Hoàn thiện phần móng, tầng hầm và kết cấu nền",
    status: "in-progress",
    icon: Hammer,
  },
  {
    id: 3,
    title: "Thi Công Thân Tháp",
    date: "Q2/2026 - Q2/2027",
    description: "Lên kết cấu các tầng nổi, cất nóc Block A & Block B",
    status: "upcoming",
    icon: Building,
  },
  {
    id: 4,
    title: "Hoàn Thiện & Bàn Giao",
    date: "Q4/2027",
    description: "Hoàn thiện nội thất, M&E, Sky Bridge và bàn giao căn hộ",
    status: "upcoming",
    icon: Home,
  },
]

const legalDocuments = [
  "Phê duyệt quy hoạch chi tiết 1/500",
  "Giấy phép xây dựng",
  "Sổ hồng sở hữu lâu dài (người Việt)",
  "Sở hữu 50 năm (người nước ngoài)",
]

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function AVACenterLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("1pn")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsHeroLoaded(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", phone: "", email: "", product: "", message: "" })
  }

  return (
    <main className="min-h-screen">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                "text-2xl md:text-3xl font-bold tracking-tight transition-colors font-serif",
                isScrolled ? "text-primary" : "text-primary-foreground"
              )}
            >
              AVA CENTER
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:0901234567"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              <Phone className="h-4 w-4" />
              0901 234 567
            </a>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="#contact">Đăng Ký Tư Vấn</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X
                className={cn(
                  "h-6 w-6",
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "h-6 w-6",
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                )}
              />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground text-base font-medium py-2 border-b border-border/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:0901234567"
                className="flex items-center gap-2 text-primary font-medium py-2"
              >
                <Phone className="h-4 w-4" />
                0901 234 567
              </a>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-2"
              >
                <Link href="#contact">Đăng Ký Tư Vấn</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-building.jpg"
            alt="AVA Center - Tổ hợp căn hộ cao cấp"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div
            className={`transition-all duration-1000 ${
              isHeroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-4">
              Touchable Home - Sống Chuẩn Gu
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight font-serif">
              AVA CENTER
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-4">
              Biểu tượng kiến trúc mới tại cửa ngõ Đông Bắc
            </p>
            <p className="text-primary-foreground/70 text-sm md:text-base max-w-2xl mx-auto mb-8">
              Mặt tiền đường Thủ Khoa Huân, TP. Thuận An, Bình Dương
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-10">
              {[
                { value: "40", label: "Tầng cao" },
                { value: "635+", label: "Căn hộ" },
                { value: "36", label: "Tiện ích" },
                { value: "Q4/2027", label: "Bàn giao" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-1 font-serif">
                    {stat.value}
                  </p>
                  <p className="text-primary-foreground/70 text-xs md:text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base"
              >
                <Link href="#contact">Đăng Ký Nhận Bảng Giá</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base"
              >
                <Link href="#overview">Khám Phá Dự Án</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Link href="#overview" aria-label="Scroll down">
            <ChevronDown className="h-8 w-8 text-primary-foreground/70" />
          </Link>
        </div>
      </section>

      {/* ============================================ */}
      {/* OVERVIEW SECTION */}
      {/* ============================================ */}
      <section id="overview" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">
              Tổng Quan Dự Án
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              Nhà Sang, Giá Xịn
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              AVA Center là tổ hợp căn hộ cao cấp, thương mại dịch vụ và văn phòng
              lưu trú mang tính biểu tượng mới tại khu vực cửa ngõ Đông Bắc Bình
              Dương.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/apartment-interior.jpg"
                alt="Nội thất căn hộ AVA Center"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-primary-foreground text-lg font-semibold font-serif">
                  100% căn hộ có Logia
                </p>
                <p className="text-primary-foreground/80 text-sm">
                  Tối ưu hóa ánh sáng và đón nắng gió tự nhiên
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Chủ đầu tư", value: "Công ty TNHH Tyson An Phú" },
                  { label: "Phát triển", value: "Tập đoàn AVA Corp" },
                  { label: "Tổng thầu", value: "Tập đoàn Xây dựng Hòa Bình" },
                  { label: "Quy mô", value: "7.300m² - 9.400m²" },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-primary pl-4">
                    <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 font-serif">
                  Cấu Trúc Dự Án
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>
                      <strong className="text-foreground">Block A:</strong> Tháp
                      căn hộ 40 tầng với khoảng 635 căn hộ
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>
                      <strong className="text-foreground">Block B:</strong> Tháp
                      thương mại - dịch vụ 6 tầng
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>
                      <strong className="text-foreground">Sky Bridge:</strong> Cầu
                      kính không trung kết nối tại tầng 21
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>
                      <strong className="text-foreground">1 Tầng hầm:</strong> Bãi
                      đỗ xe và hệ thống kỹ thuật
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-serif">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* LOCATION SECTION */}
      {/* ============================================ */}
      <section id="location" className="py-20 md:py-32 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">
              Vị Trí Chiến Lược
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 font-serif">
              Tọa Độ Vàng
            </h2>
            <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed">
              Mặt tiền đường Thủ Khoa Huân (liền kề Quốc lộ 13), Phường Thuận
              Giao, TP. Thuận An, Bình Dương - giao thoa 3 trục giao thông huyết
              mạch.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 mb-16">
            <div className="lg:col-span-3 relative aspect-[16/10] rounded-lg overflow-hidden bg-secondary/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6726741776726!2d106.69898031474373!3d10.980982092195636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1a7d8fd3b0f%3A0x6b19afb5d6e71a05!2zVGh14bqtbiBHaWFvLCBUaHXhuq1uIEFuLCBCw6xuaCBExrDGoW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1650000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AVA Center Location Map"
                className="absolute inset-0"
              />
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-foreground font-semibold text-sm font-serif">
                      AVA CENTER
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Thuận Giao, Thuận An, Bình Dương
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {connections.map((item) => (
                <div
                  key={item.title}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-5 border border-primary-foreground/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-primary-foreground font-bold text-lg font-serif">
                        {item.title}
                      </h3>
                      <p className="text-accent text-sm mb-2">{item.subtitle}</p>
                      <p className="text-primary-foreground/70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-lg p-8 border border-primary-foreground/20">
            <h3 className="text-xl font-bold text-primary-foreground mb-6 text-center font-serif">
              Kết Nối Tiện Ích Xung Quanh
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {nearbyPlaces.map((place) => (
                <div
                  key={place.name}
                  className="text-center p-4 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
                >
                  <p className="text-2xl font-bold text-accent mb-1 font-serif">
                    {place.time}
                  </p>
                  <p className="text-primary-foreground/80 text-sm">{place.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRODUCTS SECTION */}
      {/* ============================================ */}
      <section id="products" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">
              Loại Hình Sản Phẩm
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              Đa Dạng Lựa Chọn
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Từ Studio đến căn hộ 2PN và Officetel, mỗi căn hộ đều được thiết kế
              tối ưu công năng với nội thất cao cấp đồng bộ.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {productTypes.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-medium transition-all",
                  selectedProduct === product.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-foreground hover:bg-muted border border-border"
                )}
              >
                {product.name}
                {product.popular && (
                  <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                    Hot
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productTypes.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border",
                  selectedProduct === product.id
                    ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                    : "border-border/50"
                )}
              >
                <div
                  className={cn(
                    "p-6 text-center",
                    product.popular ? "bg-primary" : "bg-muted/50"
                  )}
                >
                  {product.popular && (
                    <span className="inline-block text-xs uppercase tracking-wider text-accent mb-2">
                      Được Yêu Thích
                    </span>
                  )}
                  <h3
                    className={cn(
                      "text-2xl font-bold mb-1 font-serif",
                      product.popular ? "text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      product.popular
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    Diện tích: {product.area}
                  </p>
                </div>

                <div className="p-6">
                  <p className="text-2xl font-bold text-primary mb-2 font-serif">
                    {product.price}
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={cn(
                      "w-full",
                      product.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    )}
                  >
                    <a href="#contact">Nhận Báo Giá Chi Tiết</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card rounded-xl p-8 md:p-12 shadow-sm border border-border/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">
                  Đặc Biệt
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-serif">
                  Shophouse Khối Đế
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Các dãy Shophouse tại khối đế Block B với vị trí mặt tiền đắc
                  địa, phục vụ cộng đồng cư dân hơn 2.000 người và khách hàng khu
                  vực. Tiềm năng kinh doanh và cho thuê vượt trội.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href="#contact">Tìm Hiểu Thêm</a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Vị trí", value: "Mặt tiền khối đế" },
                  { label: "Diện tích", value: "Đa dạng" },
                  { label: "Công năng", value: "Kinh doanh" },
                  { label: "Sở hữu", value: "Lâu dài" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-secondary/50 rounded-lg p-4 text-center"
                  >
                    <p className="text-lg font-bold text-foreground font-serif">
                      {item.value}
                    </p>
                    <p className="text-muted-foreground text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* AMENITIES SECTION */}
      {/* ============================================ */}
      <section id="amenities" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">
              Hệ Thống Tiện Ích
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              36 Tiện Ích Đẳng Cấp
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Dự án được tích hợp hệ thống tiện ích toàn diện, mang đến cuộc sống
              tiện nghi và đẳng cấp cho cư dân.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-16">
            <Image
              src="/images/pool-amenity.jpg"
              alt="Hồ bơi vô cực AVA Center"
              width={1200}
              height={600}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4 font-serif">
                Resort Giữa Lòng Thành Phố
              </h3>
              <div className="flex flex-wrap gap-3">
                {highlightAmenities.slice(0, 6).map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2"
                  >
                    <item.icon className="w-4 h-4 text-accent" />
                    <span className="text-primary-foreground text-sm">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {highlightAmenities.map((item) => (
              <div
                key={item.label}
                className="bg-card rounded-xl p-4 text-center hover:shadow-md transition-shadow border border-border/50 group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-foreground text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenityCategories.map((category) => (
              <div
                key={category.title}
                className="bg-secondary/30 rounded-xl p-6 hover:bg-secondary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4 font-serif">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-muted-foreground text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card rounded-xl p-8 md:p-12 shadow-sm border border-border/50">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 font-serif">
                  An Ninh Khép Kín Đa Lớp
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Hệ thống an ninh hiện đại với thẻ từ kiểm soát vào ra, camera
                  giám sát 24/7, đội ngũ bảo vệ chuyên nghiệp túc trực ngày đêm.
                  Cư dân hoàn toàn yên tâm về sự an toàn cho gia đình.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROGRESS SECTION */}
      {/* ============================================ */}
      <section id="progress" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">
              Tiến Độ Xây Dựng
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              Cam Kết Tiến Độ
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Dự án được cam kết tiến độ mạnh mẽ nhờ sự hợp tác với Tập đoàn Xây
              dựng Hòa Bình - nhà thầu top đầu Việt Nam.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

              <div className="space-y-8 md:space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className={cn(
                      "relative flex items-start gap-6 md:gap-0",
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute left-4 md:left-1/2 w-8 h-8 rounded-full flex items-center justify-center -translate-x-1/2 z-10",
                        milestone.status === "completed"
                          ? "bg-primary"
                          : milestone.status === "in-progress"
                          ? "bg-accent animate-pulse"
                          : "bg-muted border-2 border-border"
                      )}
                    >
                      {milestone.status === "completed" ? (
                        <Check className="w-4 h-4 text-primary-foreground" />
                      ) : milestone.status === "in-progress" ? (
                        <Clock className="w-4 h-4 text-accent-foreground" />
                      ) : (
                        <milestone.icon className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>

                    <div
                      className={cn(
                        "ml-14 md:ml-0 md:w-[calc(50%-2rem)]",
                        index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                      )}
                    >
                      <div
                        className={cn(
                          "bg-card rounded-lg p-5 shadow-sm border",
                          milestone.status === "in-progress"
                            ? "border-accent"
                            : "border-border/50"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block text-xs font-medium px-2 py-1 rounded-full mb-2",
                            milestone.status === "completed"
                              ? "bg-primary/10 text-primary"
                              : milestone.status === "in-progress"
                              ? "bg-accent/20 text-accent-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {milestone.date}
                        </span>
                        <h3 className="text-lg font-bold text-foreground mb-2 font-serif">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {milestone.description}
                        </p>
                        {milestone.status === "in-progress" && (
                          <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-accent rounded-full animate-pulse"
                                style={{ width: "60%" }}
                              />
                            </div>
                            <span className="text-xs text-accent-foreground font-medium">
                              60%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-6 font-serif">
                Hồ Sơ Pháp Lý Hoàn Chỉnh
              </h3>
              <ul className="space-y-4">
                {legalDocuments.map((doc) => (
                  <li key={doc} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary rounded-xl p-8 text-primary-foreground">
              <h3 className="text-xl font-bold mb-6 font-serif">
                Chính Sách Tài Chính Ưu Đãi
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold font-serif">0%</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Lãi suất 0% trong 24 tháng</p>
                    <p className="text-primary-foreground/70 text-sm">
                      Hỗ trợ lãi suất đến khi nhận nhà
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold font-serif">70%</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Vay đến 70% giá trị</p>
                    <p className="text-primary-foreground/70 text-sm">
                      Ngân hàng lớn bảo lãnh và hỗ trợ vay
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold font-serif">10%</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Chỉ thanh toán 10% ban đầu</p>
                    <p className="text-primary-foreground/70 text-sm">
                      Tiến độ thanh toán linh hoạt theo giai đoạn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACT SECTION */}
      {/* ============================================ */}
      <section id="contact" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">
              Liên Hệ Tư Vấn
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              Đăng Ký Nhận Thông Tin
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Để lại thông tin để nhận bảng giá chi tiết và chính sách ưu đãi đặc
              biệt từ chủ đầu tư.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-serif">
                      Đăng Ký Thành Công!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Đăng ký thêm
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Họ và tên *
                        </label>
                        <Input
                          required
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Số điện thoại *
                        </label>
                        <Input
                          required
                          type="tel"
                          placeholder="0901 234 567"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Loại căn hộ quan tâm
                      </label>
                      <select
                        value={formData.product}
                        onChange={(e) =>
                          setFormData({ ...formData, product: e.target.value })
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Chọn loại căn hộ</option>
                        <option value="studio">Studio (~31m²)</option>
                        <option value="1pn">1 Phòng ngủ (~45m²)</option>
                        <option value="2pn">2 Phòng ngủ (~67m²)</option>
                        <option value="officetel">Officetel</option>
                        <option value="shophouse">Shophouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tin nhắn
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Nội dung bạn muốn tư vấn..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 py-6 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Đang gửi...
                        </span>
                      ) : (
                        "Đăng Ký Nhận Tư Vấn"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Bằng việc đăng ký, bạn đồng ý nhận thông tin từ AVA Center
                    </p>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-primary rounded-xl p-8 text-primary-foreground">
                <h3 className="text-xl font-bold mb-6 font-serif">Hotline Tư Vấn</h3>
                <a
                  href="tel:0901234567"
                  className="flex items-center gap-4 text-2xl font-bold mb-4 hover:text-accent transition-colors"
                >
                  <Phone className="w-6 h-6" />
                  0901 234 567
                </a>
                <p className="text-primary-foreground/70 text-sm">
                  Tư vấn miễn phí 24/7
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Địa chỉ dự án
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Mặt tiền đường Thủ Khoa Huân, P. Thuận Giao, TP. Thuận An,
                      Bình Dương
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Email</p>
                    <a
                      href="mailto:info@avacenter.vn"
                      className="text-primary text-sm hover:underline"
                    >
                      info@avacenter.vn
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Giờ làm việc
                    </p>
                    <p className="text-muted-foreground text-sm">
                      8:00 - 20:00 (Thứ 2 - Chủ nhật)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-xl p-6">
                <p className="text-muted-foreground text-sm mb-2">
                  Đơn vị phát triển
                </p>
                <p className="text-foreground font-bold text-lg font-serif">
                  Tập đoàn AVA Corp
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Chủ đầu tư: Công ty TNHH Tyson An Phú
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold mb-4 font-serif">AVA CENTER</h3>
              <p className="text-background/70 mb-6 max-w-md leading-relaxed">
                Tổ hợp căn hộ cao cấp, thương mại dịch vụ và văn phòng lưu trú
                mang tính biểu tượng mới tại khu vực cửa ngõ Đông Bắc Bình Dương.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label="Youtube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 font-serif">Điều Hướng</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 font-serif">Liên Hệ</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:0901234567"
                    className="flex items-center gap-3 text-background/70 hover:text-background transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    0901 234 567
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@avacenter.vn"
                    className="flex items-center gap-3 text-background/70 hover:text-background transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    info@avacenter.vn
                  </a>
                </li>
                <li className="flex items-start gap-3 text-background/70 text-sm">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Mặt tiền đường Thủ Khoa Huân, P. Thuận Giao, TP. Thuận An,
                    Bình Dương
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-background/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-background/50 text-sm">
                © 2026 AVA Center. Đơn vị phát triển: Tập đoàn AVA Corp
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-background/50 hover:text-background text-sm transition-colors"
                >
                  Chính sách bảo mật
                </a>
                <a
                  href="#"
                  className="text-background/50 hover:text-background text-sm transition-colors"
                >
                  Điều khoản sử dụng
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}