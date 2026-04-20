'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import Link from 'next/link'
import { ArrowRight, MapPin, Building2, Layers, CalendarCheck, X } from 'lucide-react'

/* ─── Brand Tokens ───────────────────────────────────
   Cream bg:    #FDFAF6
   Section alt: #F5EDE8
   Card bg:     #FFFFFF
   Red primary: #B03A2E
   Red dark:    #7B241C
   Gold:        #C9A84C
   Warm text:   #5D4E4E
   Muted:       #8A7D7D
   Border:      #E8D7CF
─────────────────────────────────────────────────── */

const projectsData: Record<number, any> = {
  1: {
    id: 1,
    name: 'CENTRE POINT',
    location: 'TRUNG TÂM THÀNH PHỐ, QUẬN 1',
    area: 'QUẬN 1',
    price: '1,300,000,000 VND',
    startingPrice: '1.3 TỶ VND',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    description: 'CĂN HỘ CAO CẤP TẠI VỊ TRÍ VÀNG VỚI THIẾT KẾ HIỆN ĐẠI',
    fullDescription:
      'CENTRE POINT LÀ DỰ ÁN BẤT ĐỘNG SẢN CAO CẤP ĐƯỢC PHÁT TRIỂN VỚI TIÊU CHUẨN QUỐC TẾ. NẰM TẠI VỊ TRÍ VÀNG TRONG LÒNG THÀNH PHỐ, DỰ ÁN NÀY MANG ĐẾN KHÔNG GIAN SỐNG ĐẲNG CẤP CHO NHỮNG CƯ DÂN KHÓ TÍNH.',
    units: '180 CĂN',
    completion: '2025',
    tag: 'COMMERCIAL SUITE',
    completionDate: 'QUÝ 4 / 2025',
    developer: 'CENTRE GROUP',
    address: '123 ĐƯỜNG NGUYỄN HUỆ, QUẬN 1, TP.HCM',
    totalArea: '45,000 M²',
    landArea: '15,000 M²',
    projectType: 'CĂN HỘ CAO CẤP',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    ],
    amenities: [
      { icon: '🏊', name: 'BỂ BƠI OLYMPIC', description: 'BỂ BƠI TIÊU CHUẨN OLYMPIC 50M' },
      { icon: '🏋️', name: 'PHÒNG TẬP GYM', description: 'PHÒNG TẬP HIỆN ĐẠI VỚI TRANG THIẾT BỊ ĐẦY ĐỦ' },
      { icon: '🌳', name: 'CÔNG VIÊN XANH', description: 'KHU VỰC CÂY XANH VÀ KHÔNG GIAN THƯ GIÃN' },
      { icon: '🅿️', name: 'BÃI ĐỖ XE', description: 'BÃI ĐỖ XE NGẦM TƯƠNG ỨNG MỖI CĂN HỘ' },
      { icon: '🍽️', name: 'NHÀ HÀNG', description: 'NHÀ HÀNG HẠNG 5 SAO PHỤC VỤ CƯ DÂN' },
      { icon: '🛡️', name: 'AN NINH 24/7', description: 'HỆ THỐNG AN NINH TỰ ĐỘNG 24 GIỜ' },
    ],
    floorPlans: [
      { name: '1 PHÒNG NGỦ', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', area: '55–70 M²', price: '1.3 – 1.5 TỶ' },
      { name: '2 PHÒNG NGỦ', image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=400&q=80', area: '85–100 M²', price: '1.8 – 2.2 TỶ' },
      { name: '3 PHÒNG NGỦ', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', area: '120–150 M²', price: '2.5 – 3.0 TỶ' },
    ],
    highlights: [
      'VỊ TRÍ VÀNG, GẦN CÁC TRUNG TÂM THƯƠNG MẠI',
      'THIẾT KẾ KIẾN TRÚC HIỆN ĐẠI, PHONG CÁCH ÂU',
      'TIỆN ÍCH ĐẦY ĐỦ VÀ CAO CẤP',
      'QUẢN LÝ CHUYÊN NGHIỆP 24/7',
      'VỐN ĐẦU TƯ AN TOÀN, SINH LỜI CAO',
    ],
  },
  2: {
    id: 2,
    name: 'CENTRE PLAZA',
    location: 'KHU ĐÔ THỊ MỚI, QUẬN 2',
    area: 'QUẬN 2',
    price: '1,100,000,000 VND',
    startingPrice: '1.1 TỶ VND',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
    description: 'KHÔNG GIAN SHOPHOUSE THƯƠNG MẠI HIỆN ĐẠI VÀ TRANG BỊ ĐẦY ĐỦ',
    fullDescription: 'CENTRE PLAZA LÀ DỰ ÁN SHOPHOUSE THƯƠNG MẠI HIỆN ĐẠI, NẰM TẠI KHU ĐÔ THỊ PHÁT TRIỂN MẠNH. TUYỆT VỜI CHO KINH DOANH VÀ ĐẦU TƯ.',
    units: '156 CĂN',
    completion: '2024',
    tag: 'ELITE CORNER SUITE',
    completionDate: 'QUÝ 2 / 2024',
    developer: 'CENTRE GROUP',
    address: '456 ĐƯỜNG TẠ UY BẰNG, QUẬN 2, TP.HCM',
    totalArea: '35,000 M²',
    landArea: '12,000 M²',
    projectType: 'SHOPHOUSE THƯƠNG MẠI',
    gallery: [
      'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    ],
    amenities: [
      { icon: '🛍️', name: 'KHU THƯƠNG MẠI', description: 'KHÔNG GIAN THƯƠNG MẠI ĐA DẠNG' },
      { icon: '🅿️', name: 'BÃI ĐỖ XE RỘNG', description: 'BÃI ĐỖ XE TƯƠNG ỨNG MỖI SHOPHOUSE' },
      { icon: '🛡️', name: 'AN NINH CAO', description: 'HỆ THỐNG AN NINH TỰ ĐỘNG' },
      { icon: '💼', name: 'VĂN PHÒNG TIỆN NGHI', description: 'KHÔNG GIAN LÀM VIỆC CHUYÊN NGHIỆP' },
      { icon: '📶', name: 'CÁP QUANG TỐC ĐỘ CAO', description: 'INTERNET TỐC ĐỘ CAO CHO KINH DOANH' },
      { icon: '🚀', name: 'HỖ TRỢ KINH DOANH', description: 'HỖ TRỢ QUẢN LÝ KINH DOANH CHUYÊN NGHIỆP' },
    ],
    floorPlans: [
      { name: '1 SHOPHOUSE', image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=400&q=80', area: '40–60 M²', price: '1.1 – 1.4 TỶ' },
      { name: '2 SHOPHOUSE', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', area: '60–100 M²', price: '1.7 – 2.3 TỶ' },
      { name: 'CORNER PLOT', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', area: '80–120 M²', price: '2.2 – 3.0 TỶ' },
    ],
    highlights: [
      'SHOPHOUSE GÓC VÀNG, LƯU THÔNG CAO',
      'PHÙ HỢP CHO RETAIL, F&B, VĂN PHÒNG',
      'LỢI NHUẬN QUAY VÒNG NHANH',
      'CỘNG ĐỒNG KINH DOANH SÔI ĐỘNG',
      'DỄ DÀNG CHO THUÊ HOẶC BÁN LẠI',
    ],
  },
  3: {
    id: 3,
    name: 'THÀNH PHÚ HOMES',
    location: 'KHU VỰC PHÍA TÂY, QUẬN 5',
    area: 'QUẬN 5',
    price: '950,000,000 VND',
    startingPrice: '950 TRIỆU VND',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    description: 'NHÀ PHỐ THƯƠNG MẠI TIÊU CHUẨN VỚI TÀI CHÍNH LINH HOẠT',
    fullDescription: 'THÀNH PHÚ HOMES LÀ DỰ ÁN NHÀ PHỐ PHỔ BIẾN, GIÁ CẢ HỢP LÝ, PHÙ HỢP CHO CÁC GIA ĐÌNH VIỆT.',
    units: '142 CĂN',
    completion: '2025',
    tag: 'SHOPHOUSE',
    completionDate: 'QUÝ 3 / 2025',
    developer: 'THÀNH PHÚ DEVELOPMENT',
    address: '789 ĐƯỜNG KINH DƯƠNG VƯƠNG, QUẬN 5, TP.HCM',
    totalArea: '28,000 M²',
    landArea: '10,000 M²',
    projectType: 'NHÀ PHỐ',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    ],
    amenities: [
      { icon: '👨‍👩‍👧‍👦', name: 'CỘNG ĐỒNG GIA ĐÌNH', description: 'KHU CỘNG ĐỒNG AN TOÀN CHO GIA ĐÌNH' },
      { icon: '🎓', name: 'GẦN TRƯỜNG HỌC', description: 'GẦN CÁC TRƯỜNG CẤP 1, 2, 3 UY TÍN' },
      { icon: '🏥', name: 'SỨC KHỎE', description: 'GẦN BỆNH VIỆN VÀ PHÒNG KHÁM CHẤT LƯỢNG' },
      { icon: '🛒', name: 'MUA SẮM TIỆN LỢI', description: 'GẦN SIÊU THỊ VÀ CÁC CỬA HÀNG LỚN' },
      { icon: '🚌', name: 'GIAO THÔNG THUẬN TIỆN', description: 'GẦN CÁC TUYẾN XE BUÝT CHÍNH' },
      { icon: '🌳', name: 'MÔI TRƯỜNG XANH', description: 'KHU VỰC YÊN TĨNH, KHÔNG KHÍ TRONG LÀNH' },
    ],
    floorPlans: [
      { name: '2 PHÒNG NGỦ', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', area: '60–80 M²', price: '950TR – 1.2 TỶ' },
      { name: '3 PHÒNG NGỦ', image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=400&q=80', area: '80–100 M²', price: '1.2 – 1.5 TỶ' },
      { name: '4 PHÒNG NGỦ', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', area: '100–120 M²', price: '1.5 – 1.8 TỶ' },
    ],
    highlights: [
      'GIÁ CẢ CẠNH TRANH, HỢP LÝ',
      'TÀI CHÍNH LINH HOẠT, DỄ VAY VỐN',
      'PHÙ HỢP CHO GIA ĐÌNH TRẺ',
      'TIỆN ÍCH SINH HOẠT ĐẦY ĐỦ',
      'TĂNG GIÁ BẤT ĐỘNG SẢN LÂU DÀI',
    ],
  },
  4: {
    id: 4,
    name: 'LUXURY TOWERS',
    location: 'QUẬN TRUNG TÂM, QUẬN 3',
    area: 'QUẬN 3',
    price: '1,550,000,000 VND',
    startingPrice: '1.55 TỶ VND',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    description: 'TÒA NHÀ CAO CẤP VỚI CÁC TIỆN ÍCH KHANG HOÀNG',
    fullDescription: 'LUXURY TOWERS LÀ DỰ ÁN CAO ỐC HẠNG SANG, ĐƯỢC THIẾT KẾ BỞI KIẾN TRÚC SƯ NỔI TIẾNG QUỐC TẾ.',
    units: '198 CĂN',
    completion: '2026',
    tag: 'PREMIUM RESIDENCE',
    completionDate: 'QUÝ 1 / 2026',
    developer: 'LUXURY CORPORATION',
    address: '321 ĐƯỜNG PASTEUR, QUẬN 3, TP.HCM',
    totalArea: '55,000 M²',
    landArea: '18,000 M²',
    projectType: 'CĂN HỘ HẠNG SANG',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    ],
    amenities: [
      { icon: '🏊', name: 'BỂ BƠI VÔ CỰC', description: 'BỂ BƠI TẦNG CAO VỚI VIEW TOÀN THÀNH PHỐ' },
      { icon: '🥘', name: 'NHÀ HÀNG HẠNG SAO', description: 'NHÀ HÀNG HẠNG 5 SAO VỚI ĐẦU BẾP NỔI TIẾNG' },
      { icon: '🧖', name: 'SPA & WELLNESS', description: 'TRUNG TÂM SPA VÀ WELLNESS WORLD CLASS' },
      { icon: '🎾', name: 'SÂN TENNIS', description: 'SÂN TENNIS TUYỆT ĐẸP VỚI ÁNH SÁNG NHÂN TẠO' },
      { icon: '📚', name: 'THƯ VIỆN', description: 'THƯ VIỆN HIỆN ĐẠI VỚI SÁCH VÀ TẠP CHÍ' },
      { icon: '🚗', name: 'VALET PARKING', description: 'DỊCH VỤ VALET PARKING 24/7' },
    ],
    floorPlans: [
      { name: '2 PHÒNG NGỦ', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', area: '95–120 M²', price: '1.8 – 2.2 TỶ' },
      { name: '3 PHÒNG NGỦ', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', area: '140–180 M²', price: '2.8 – 3.5 TỶ' },
      { name: 'PENTHOUSE', image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=400&q=80', area: '200–250 M²', price: '5.0 – 8.0 TỶ' },
    ],
    highlights: [
      'KIẾN TRÚC SƯ NỔI TIẾNG THẾ GIỚI',
      'VIEW PANORAMA THÀNH PHỐ TUYỆT ĐẸP',
      'TIỆN ÍCH HẠNG SANG ĐẦY ĐỦ',
      'QUẢN LÝ QUỐC TẾ 5 SAO',
      'ĐẦU TƯ AN TOÀN, GIÁ BẢO TOÀN',
    ],
  },
}

/* ─── Stat Block ─────────────────────────────────── */
function StatBlock({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: '#F5EDE8',
        borderRadius: '10px',
        padding: '18px 20px',
        borderLeft: '3px solid #B03A2E',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8A7D7D', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px' }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: '18px', fontWeight: 800, color: '#5D4E4E', letterSpacing: '0.02em' }}>{value}</div>
    </div>
  )
}

/* ─── Floor Plan Card ─────────────────────────────── */
function FloorPlanCard({ plan }: { plan: any }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 10px 32px rgba(176,58,46,0.13)' : '0 2px 8px rgba(93,78,78,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: '180px', overflow: 'hidden' }}>
        <img
          src={plan.image}
          alt={plan.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#5D4E4E', letterSpacing: '0.08em', marginBottom: '12px' }}>{plan.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8A7D7D', marginBottom: '16px', letterSpacing: '0.04em' }}>
          <span>DIỆN TÍCH: {plan.area}</span>
          <span style={{ color: '#B03A2E', fontWeight: 700 }}>{plan.price}</span>
        </div>
        <button
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#B03A2E',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7B241C' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E' }}
        >
          CHỌN CẤU HÌNH
        </button>
      </div>
    </div>
  )
}

/* ─── Related Card ───────────────────────────────── */
function RelatedCard({ p }: { p: any }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={`/projects/${p.id}`}
      style={{
        display: 'block',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        textDecoration: 'none',
        boxShadow: hovered ? '0 10px 28px rgba(176,58,46,0.12)' : '0 2px 8px rgba(93,78,78,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: '180px', overflow: 'hidden' }}>
        <img
          src={p.image}
          alt={p.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>
      <div style={{ padding: '16px 18px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#5D4E4E', letterSpacing: '0.04em', marginBottom: '4px' }}>{p.name}</h3>
        <p style={{ fontSize: '11px', color: '#8A7D7D', letterSpacing: '0.04em', marginBottom: '10px' }}>{p.location}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#B03A2E' }}>{p.startingPrice}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 700, color: '#B03A2E', letterSpacing: '0.06em' }}>
            XEM <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ─── Page ────────────────────────────────────────── */
export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(params.id)
  const project = projectsData[projectId]
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  if (!project) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#FDFAF6' }}>
        <Header />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#5D4E4E', letterSpacing: '0.04em', marginBottom: '12px' }}>DỰ ÁN KHÔNG TÌM THẤY</h1>
          <p style={{ color: '#8A7D7D', marginBottom: '28px', letterSpacing: '0.04em' }}>DỰ ÁN BẠN TÌM KIẾM KHÔNG TỒN TẠI HOẶC ĐÃ BỊ XÓA.</p>
          <Link
            href="/projects"
            style={{ display: 'inline-block', padding: '12px 28px', backgroundColor: '#B03A2E', color: '#FFFFFF', borderRadius: '8px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none' }}
          >
            QUAY VỀ DANH SÁCH
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FDFAF6' }}>
      <Header />

      {/* ── Hero Gallery ── */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '32px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* Page breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '11px', color: '#8A7D7D', letterSpacing: '0.08em' }}>
            <Link href="/projects" style={{ color: '#8A7D7D', textDecoration: 'none' }}>DỰ ÁN</Link>
            <span>/</span>
            <span style={{ color: '#B03A2E', fontWeight: 700 }}>{project.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            {/* Main image */}
            <div style={{ position: 'relative', height: '420px', borderRadius: '14px', overflow: 'hidden' }}>
              <img
                src={project.gallery[selectedImage]}
                alt="Project"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
              />
              {/* Tag badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '18px',
                  backgroundColor: '#B03A2E',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '6px 14px',
                  borderRadius: '4px',
                }}
              >
                {project.tag}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gap: '8px' }}>
              {project.gallery.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: selectedImage === idx ? '2px solid #B03A2E' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {selectedImage === idx && (
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(176,58,46,0.12)' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Project Info ── */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '48px 0', borderBottom: '1px solid #E8D7CF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '48px', alignItems: 'start' }}>

            {/* Left */}
            <div>
              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '4px', alignSelf: 'stretch', backgroundColor: '#B03A2E', flexShrink: 0 }} />
                <div>
                  <h1
                    style={{
                      fontSize: 'clamp(28px, 5vw, 48px)',
                      fontWeight: 900,
                      color: '#5D4E4E',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.15,
                      marginBottom: '6px',
                    }}
                  >
                    {project.name}
                  </h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8A7D7D', fontSize: '12px', letterSpacing: '0.06em' }}>
                    <MapPin size={14} />
                    {project.location}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#5D4E4E', lineHeight: 1.8, letterSpacing: '0.03em', marginBottom: '32px' }}>
                {project.fullDescription}
              </p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                <StatBlock label="TỔNG DIỆN TÍCH" value={project.totalArea} icon={<Layers size={12} />} />
                <StatBlock label="DIỆN TÍCH ĐẤT" value={project.landArea} icon={<Building2 size={12} />} />
                <StatBlock label="SỐ CĂN" value={project.units} icon={<Building2 size={12} />} />
                <StatBlock label="HOÀN THÀNH" value={project.completionDate} icon={<CalendarCheck size={12} />} />
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div
              style={{
                position: 'sticky',
                top: '80px',
                backgroundColor: '#F5EDE8',
                borderRadius: '14px',
                padding: '32px 28px',
              }}
            >
              <div style={{ marginBottom: '8px', fontSize: '10px', fontWeight: 700, color: '#8A7D7D', letterSpacing: '0.12em' }}>
                GIÁ KHỞI ĐIỂM
              </div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#B03A2E', marginBottom: '24px', letterSpacing: '-0.01em' }}>
                {project.startingPrice}
              </div>

              <button
                onClick={() => setShowBookingForm(true)}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#B03A2E',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginBottom: '10px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7B241C' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E' }}
              >
                ĐẶT LỊCH TOUR
              </button>

              <button
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#5D4E4E',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#5D4E4E' }}
              >
                TẢI BROCHURE
              </button>

              <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #E8D7CF', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'CHỦNG LOẠI', value: project.projectType },
                  { label: 'NHÀ PHÁT TRIỂN', value: project.developer },
                  { label: 'ĐỊA CHỈ', value: project.address },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#8A7D7D', letterSpacing: '0.12em', marginBottom: '3px' }}>{label}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#5D4E4E', letterSpacing: '0.03em' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Highlights ── */}
      <div style={{ backgroundColor: '#F5EDE8', padding: '56px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#5D4E4E', letterSpacing: '0.06em', marginBottom: '28px' }}>
            ĐIỂM NỔI BẬT
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {project.highlights.map((h: string, i: number) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '16px 18px',
                  borderLeft: '3px solid #C9A84C',
                }}
              >
                <span style={{ color: '#C9A84C', fontSize: '18px', lineHeight: 1.2 }}>★</span>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#5D4E4E', letterSpacing: '0.04em', lineHeight: 1.5 }}>{h}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Amenities ── */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '56px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#5D4E4E', letterSpacing: '0.06em', marginBottom: '28px' }}>TIỆN ÍCH</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {project.amenities.map((a: any, i: number) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#F5EDE8',
                  borderRadius: '12px',
                  padding: '24px 20px',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{a.icon}</div>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#5D4E4E', letterSpacing: '0.06em', marginBottom: '6px' }}>{a.name}</h3>
                <p style={{ fontSize: '11px', color: '#8A7D7D', letterSpacing: '0.03em', lineHeight: 1.6 }}>{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floor Plans ── */}
      <div style={{ backgroundColor: '#F5EDE8', padding: '56px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#5D4E4E', letterSpacing: '0.06em', marginBottom: '28px' }}>
            PHỐI CẢNH & THIẾT KẾ
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {project.floorPlans.map((plan: any, i: number) => (
              <FloorPlanCard key={i} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Related Projects ── */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '56px 0', borderTop: '1px solid #E8D7CF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#5D4E4E', letterSpacing: '0.06em', marginBottom: '28px' }}>DỰ ÁN KHÁC</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {Object.values(projectsData)
              .filter((p: any) => p.id !== projectId)
              .slice(0, 3)
              .map((p: any) => (
                <RelatedCard key={p.id} p={p} />
              ))}
          </div>
        </div>
      </div>

      {/* ── Booking Modal ── */}
      {showBookingForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '24px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowBookingForm(false) }}
        >
          <div
            style={{
              backgroundColor: '#FDFAF6',
              borderRadius: '16px',
              padding: '36px 32px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 24px 64px rgba(93,78,78,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#5D4E4E', letterSpacing: '0.06em' }}>ĐẶT LỊCH TOUR</h3>
              <button
                onClick={() => setShowBookingForm(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A7D7D' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {[
                { key: 'name', placeholder: 'TÊN CỦA BẠN', type: 'text' },
                { key: 'email', placeholder: 'EMAIL', type: 'email' },
                { key: 'phone', placeholder: 'SỐ ĐIỆN THOẠI', type: 'tel' },
              ].map(({ key, placeholder, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={(formData as any)[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #E8D7CF',
                    borderRadius: '8px',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    color: '#5D4E4E',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              ))}
              <textarea
                placeholder="LỜI NHẮN"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #E8D7CF',
                  borderRadius: '8px',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  color: '#5D4E4E',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowBookingForm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #E8D7CF',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#5D4E4E',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
              >
                ĐÓNG
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#B03A2E',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7B241C' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E' }}
              >
                GỬI
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ZaloButton />
    </main>
  )
}