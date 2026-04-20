'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import { useEffect, useRef, useState } from 'react'

// ── Scroll Reveal ──
function useReveal(threshold = 0.1) {
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

type Dir = 'up' | 'left' | 'right' | 'fade'
function Reveal({ children, delay = 0, dir = 'up', style = {} }: {
  children: React.ReactNode; delay?: number; dir?: Dir; style?: React.CSSProperties
}) {
  const { ref, visible } = useReveal()
  const init: Record<Dir, string> = {
    up: 'translateY(40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
    fade: 'none',
  }
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : init[dir],
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── Count Up ──
function useCountUp(target: number, visible: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = Math.ceil(target / (1800 / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [visible, target])
  return count
}

// ── Colors & tokens ──
const C = {
  navy: '#1B2B4B',
  navyLight: '#243558',
  gold: '#B8922A',
  goldLight: '#D4A843',
  cream: '#F8F5F0',
  creamDark: '#EEE9E0',
  white: '#FFFFFF',
  text: '#1B2B4B',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  border: 'rgba(27,43,75,0.12)',
}

// ── Stat Block ──
function StatBlock({ value, suffix, label, delay = 0 }: { value: number; suffix: string; label: string; delay?: number }) {
  const { ref, visible } = useReveal()
  const count = useCountUp(value, visible)
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.7s ease ${delay}s`,
      textAlign: 'center', padding: '40px 20px',
      borderRight: '1px solid rgba(184,146,42,0.2)',
    }}>
      <div style={{
        fontSize: '52px', fontWeight: 700, color: C.navy,
        fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
        lineHeight: 1, letterSpacing: '-0.02em',
      }}>
        {count.toLocaleString('vi-VN')}{suffix}
      </div>
      <div style={{
        fontSize: '12px', color: C.textMuted, marginTop: '10px',
        fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.1em',
        textTransform: 'uppercase', fontWeight: 500,
      }}>
        {label}
      </div>
    </div>
  )
}

// ── Section Label ──
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <div style={{ width: '40px', height: '1px', background: C.gold }} />
      <span style={{
        fontSize: '11px', letterSpacing: '0.2em', color: C.gold,
        fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
        textTransform: 'uppercase',
      }}>{text}</span>
    </div>
  )
}

export default function AvaCenterPage() {
  const [activeNav, setActiveNav] = useState('tong-quan')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { id: 'tong-quan', label: 'Tổng quan' },
    { id: 'vi-tri', label: 'Vị trí' },
    { id: 'can-ho', label: 'Căn hộ' },
    { id: 'tien-ich', label: 'Tiện ích' },
    { id: 'tien-do', label: 'Tiến độ' },
    { id: 'lien-he', label: 'Liên hệ' },
  ]

  const specs = [
    { label: 'Tên dự án', value: 'Chung cư Trung tâm AVA (AVA CENTER)' },
    { label: 'Vị trí', value: 'Mặt tiền Thủ Khoa Huân, P. Thuận Giao, TP. Hồ Chí Minh' },
    { label: 'Chủ đầu tư', value: 'Tyson An Phú (AVA Group)' },
    { label: 'Tổng thầu', value: 'Hòa Bình Corporation' },
    { label: 'Block A', value: '40 tầng — Chung cư hỗn hợp' },
    { label: 'Block B', value: '6 tầng — Thương mại & dịch vụ' },
    { label: 'Pháp lý', value: 'Sở hữu lâu dài (người Việt Nam)' },
    { label: 'Bàn giao', value: 'Full nội thất — Tự do định bản sắc' },
  ]

  const units = [
    { type: 'Studio / 1PN', area: '35 – 41 m²', price: 'Từ 1,4 tỷ', note: 'Phù hợp độc thân, couple' },
    { type: '2 Phòng Ngủ', area: '61 – 72 m²', price: 'Từ 2,4 tỷ', note: 'Lý tưởng cho gia đình nhỏ' },
    { type: 'Officetel', area: '30 – 45 m²', price: 'Liên hệ', note: 'Văn phòng kết hợp lưu trú' },
    { type: 'Shophouse', area: '80 – 120 m²', price: 'Liên hệ', note: 'Kinh doanh tầng trệt' },
  ]

  const amenities = [
    { icon: '🏊‍♂️', title: 'Hồ bơi tràn bờ', desc: 'Chuẩn Olympic, hồ người lớn & trẻ em' },
    { icon: '🏋️', title: 'Gym & Yoga', desc: 'Phòng tập hiện đại với thiết bị cao cấp' },
    { icon: '🌳', title: 'Vườn xanh nội khu', desc: 'Không gian xanh chiếm 65% diện tích' },
    { icon: '☕', title: 'Café sân vườn', desc: 'Khu thư giãn ngoài trời thoáng đãng' },
    { icon: '🛡️', title: 'An ninh 24/7', desc: 'Camera giám sát & bảo vệ chuyên nghiệp' },
    { icon: '🍖', title: 'Khu BBQ', desc: 'Không gian tiệc nướng ngoài trời' },
    { icon: '👶', title: 'Khu vui chơi', desc: 'Sân chơi an toàn & sáng tạo cho trẻ' },
    { icon: '💆', title: 'Spa & Wellness', desc: 'Trung tâm chăm sóc sức khỏe toàn diện' },
  ]

  const connectivity = [
    { time: '5 phút', items: ['AEON Mall Bình Dương', 'KCN Việt Hương', 'BV Columbia Asia', 'Trường THPT Trịnh Hoài Đức'] },
    { time: '10 phút', items: ['Mega Market', 'Chợ Thuận Giao', 'Sân Golf Sông Bé', 'Trường QT MMI Việt Nam'] },
    { time: '15 phút', items: ['GO Bình Dương', 'CoopMart', 'ĐH Thủ Dầu Một', 'KCN VSIP'] },
    { time: '20 phút', items: ['TP Mới Bình Dương', 'BV Becamex', 'TT Hành chính TP Thuận An'] },
  ]

  const milestones = [
    { date: 'T8/2025', title: 'Khởi Công', desc: 'Lễ khởi công chính thức với tổng thầu Hòa Bình', done: true },
    { date: 'T12/2026', title: 'Hoàn Thành Móng', desc: 'Hoàn tất phần móng và tầng hầm đỗ xe', done: false },
    { date: 'T6/2027', title: 'Cất Nóc', desc: 'Hoàn thiện kết cấu tòa nhà 40 tầng', done: false },
    { date: 'T12/2027', title: 'Bàn Giao', desc: 'Bàn giao full nội thất cho cư dân', done: false },
  ]

  return (
    <main style={{ background: C.cream, minHeight: '100vh', color: C.text, fontFamily: "'Playfair Display', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.gold}; }
        ::selection { background: rgba(184,146,42,0.2); }

        .nav-link { transition: color 0.2s; }
        .nav-link:hover { color: ${C.gold} !important; }
        .unit-card { transition: all 0.3s ease; }
        .unit-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(27,43,75,0.12) !important; }
        .amenity-card { transition: all 0.25s ease; }
        .amenity-card:hover { background: ${C.navy} !important; }
        .amenity-card:hover .amenity-title { color: ${C.white} !important; }
        .amenity-card:hover .amenity-desc { color: rgba(255,255,255,0.6) !important; }
        .btn-primary { transition: all 0.25s ease; }
        .btn-primary:hover { background: ${C.navyLight} !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(27,43,75,0.25); }
        .btn-outline { transition: all 0.25s ease; }
        .btn-outline:hover { background: ${C.navy} !important; color: ${C.white} !important; }

        @keyframes heroFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lineGrow { from { width: 0; } to { width: 100%; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes scrollDown {
          0% { transform: translateX(-50%) translateY(0); opacity: 1; }
          100% { transform: translateX(-50%) translateY(16px); opacity: 0; }
        }
      `}</style>

      <Header />

      {/* ── STICKY SUBNAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(248,245,240,0.97)' : C.cream,
        borderBottom: `1px solid ${C.border}`,
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 20px rgba(27,43,75,0.08)' : 'none',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              onClick={() => setActiveNav(item.id)}
              style={{
                padding: '18px 24px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.08em',
                textDecoration: 'none',
                color: activeNav === item.id ? C.gold : C.navy,
                borderBottom: activeNav === item.id ? `2px solid ${C.gold}` : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {item.label.toUpperCase()}
            </a>
          ))}
          <a
            href="#lien-he"
            style={{
              marginLeft: '24px',
              padding: '10px 24px',
              background: C.navy,
              color: C.white,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            className="btn-primary"
          >
            Đăng Ký
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '720px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        {/* BG image with overlay */}
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=90"
          alt="AVA Center"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(27,43,75,0.92) 0%, rgba(27,43,75,0.5) 40%, rgba(27,43,75,0.2) 70%, transparent 100%)',
        }} />
        {/* Top gold bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 40px 80px' }}>
          <div style={{ animation: 'heroFade 1s ease 0.2s both' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '6px 14px',
              border: `1px solid rgba(184,146,42,0.6)`,
              marginBottom: '24px',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.gold, display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.22em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                THUẬN GIAO · TP. HỒ CHÍ MINH · KHỞI CÔNG 08/2025
              </span>
            </div>
          </div>

          <div style={{ animation: 'heroFade 1s ease 0.35s both' }}>
            <div style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(255,255,255,0.6)', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, letterSpacing: '0.04em', marginBottom: '8px', fontStyle: 'italic' }}>
              Căn hộ cao cấp bàn giao nội thất theo gu riêng
            </div>
            <h1 style={{
              fontSize: 'clamp(56px, 9vw, 120px)',
              fontWeight: 700, lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: C.white,
              marginBottom: '4px',
            }}>
              AVA
            </h1>
            <h1 style={{
              fontSize: 'clamp(56px, 9vw, 120px)',
              fontWeight: 400, lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'transparent',
              WebkitTextStroke: `1px ${C.gold}`,
              marginBottom: '32px',
            }}>
              CENTER
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', animation: 'heroFade 1s ease 0.55s both', flexWrap: 'wrap' }}>
            <a href="#lien-he" className="btn-primary" style={{
              display: 'inline-block', padding: '16px 40px',
              background: C.gold, color: C.white,
              fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
              fontSize: '11px', letterSpacing: '0.14em',
              textDecoration: 'none', textTransform: 'uppercase',
            }}>
              Đăng Ký Nhận Tư Vấn
            </a>
            <a href="#tong-quan" className="btn-outline" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px',
              border: '1px solid rgba(255,255,255,0.4)',
              color: C.white,
              fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
              fontSize: '11px', letterSpacing: '0.12em',
              textDecoration: 'none', textTransform: 'uppercase',
            }}>
              Khám Phá Dự Án
              <span style={{ fontSize: '16px' }}>↓</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <div style={{
            width: '28px', height: '44px',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '14px', margin: '0 auto',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '6px',
          }}>
            <div style={{ width: '3px', height: '8px', background: C.gold, borderRadius: '2px', animation: 'scrollDown 1.5s ease infinite' }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          STATS
      ══════════════════════════════════ */}
      <section style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
            <StatBlock value={7340} suffix=" m²" label="Tổng Diện Tích" delay={0} />
            <StatBlock value={40} suffix=" Tầng" label="Block A" delay={0.08} />
            <StatBlock value={628} suffix="" label="Căn Hộ Chung Cư" delay={0.16} />
            <StatBlock value={211} suffix="" label="Căn Officetel" delay={0.24} />
            <StatBlock value={34} suffix=".5%" label="Mật Độ Xây Dựng" delay={0.32} />
            <StatBlock value={1478} suffix="" label="Dân Số Dự Kiến" delay={0.4} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          TỔNG QUAN
      ══════════════════════════════════ */}
      <section id="tong-quan" style={{ padding: '100px 0', background: C.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <Reveal>
                <SectionLabel text="Tổng quan dự án" />
                <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '20px', color: C.navy }}>
                  Triết Lý Thiết Kế<br />
                  <em style={{ fontWeight: 400, color: C.gold }}>Đô Thị Hiện Đại</em>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontSize: '15px', lineHeight: 1.9, color: C.textMuted, fontFamily: 'Montserrat, sans-serif', fontWeight: 300, marginBottom: '20px' }}>
                  AVA Center là dự án tiên phong mang triết lý thiết kế đô thị hiện đại, lấy cảm hứng từ những nguyên tắc tạo nên không gian sống bền vững — nơi cái đẹp không chỉ đến từ hình thức, mà còn từ sự đa dạng chức năng và khả năng kết nối linh hoạt.
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.9, color: C.textMuted, fontFamily: 'Montserrat, sans-serif', fontWeight: 300, marginBottom: '40px' }}>
                  100% căn hộ được bàn giao <strong style={{ color: C.navy }}>full nội thất</strong> — cư dân tự do định bản sắc không gian sống của mình.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                  {specs.map((s, i) => (
                    <div key={i} style={{
                      padding: '16px 0',
                      borderBottom: `1px solid ${C.border}`,
                      borderRight: i % 2 === 0 ? `1px solid ${C.border}` : 'none',
                      paddingRight: i % 2 === 0 ? '20px' : '0',
                      paddingLeft: i % 2 === 1 ? '20px' : '0',
                    }}>
                      <div style={{ fontSize: '9px', letterSpacing: '0.15em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{s.label}</div>
                      <div style={{ fontSize: '13px', fontFamily: 'Montserrat, sans-serif', fontWeight: 500, color: C.navy, lineHeight: 1.5 }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal dir="right" delay={0.2}>
              <div style={{ position: 'relative' }}>
                {/* Decorative frame */}
                <div style={{
                  position: 'absolute', top: '-16px', right: '-16px',
                  width: '100%', height: '100%',
                  border: `2px solid ${C.gold}`,
                  opacity: 0.25, pointerEvents: 'none',
                }} />
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85"
                  alt="AVA Center"
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                />
                {/* Badge */}
                <div style={{
                  position: 'absolute', bottom: '-20px', left: '-20px',
                  background: C.navy, padding: '20px 24px',
                  boxShadow: '0 8px 32px rgba(27,43,75,0.2)',
                }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', marginBottom: '4px' }}>ĐÃ KHỞI CÔNG</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: C.gold }}>08 / 2025</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          VỊ TRÍ
      ══════════════════════════════════ */}
      <section id="vi-tri" style={{ padding: '100px 0', background: C.navy }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <SectionLabel text="Vị trí dự án" />
              <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: C.white, lineHeight: 1.2 }}>
                Tâm Điểm Kết Nối<br />
                <em style={{ fontWeight: 400, color: C.gold }}>Vùng Kinh Tế Phía Nam</em>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'start' }}>
            {/* Map image */}
            <Reveal dir="left" delay={0.1}>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=85"
                  alt="Vị trí"
                  style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block', opacity: 0.85 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,43,75,0.9) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, marginBottom: '6px' }}>📍 ĐỊA CHỈ</div>
                  <div style={{ fontSize: '14px', color: C.white, fontFamily: 'Montserrat, sans-serif', lineHeight: 1.6 }}>
                    Ngã tư Hòa Lân, đường Thủ Khoa Huân<br />
                    Phường Thuận Giao, TP. Hồ Chí Minh
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Connectivity */}
            <div>
              <Reveal delay={0.15}>
                <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.6)', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, marginBottom: '40px' }}>
                  Tọa lạc ngay ngã tư Hòa Lân — cửa ngõ giao thương sầm uất bậc nhất, mặt tiền Thủ Khoa Huân kết nối trực tiếp Quốc lộ 13, trục xương sống vùng kinh tế trọng điểm phía Nam.
                </p>
              </Reveal>
              {connectivity.map((group, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{
                    display: 'flex', gap: '24px',
                    padding: '24px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{
                      flexShrink: 0,
                      minWidth: '90px',
                      padding: '8px 14px',
                      border: `1px solid rgba(184,146,42,0.5)`,
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: C.gold, lineHeight: 1 }}>{group.time.split(' ')[0]}</div>
                      <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', marginTop: '2px' }}>phút</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
                      {group.items.map((item, j) => (
                        <span key={j} style={{
                          fontSize: '12px', fontFamily: 'Montserrat, sans-serif',
                          color: 'rgba(255,255,255,0.65)', lineHeight: 1.5,
                          background: 'rgba(255,255,255,0.05)',
                          padding: '4px 10px', borderRadius: '2px',
                        }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.5}>
                <div style={{
                  marginTop: '32px', padding: '20px 24px',
                  background: 'rgba(184,146,42,0.1)',
                  border: `1px solid rgba(184,146,42,0.3)`,
                  display: 'flex', alignItems: 'center', gap: '16px',
                }}>
                  <span style={{ fontSize: '24px' }}>🚇</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: C.gold, fontFamily: 'Montserrat, sans-serif' }}>Cách Ga Metro chỉ 400m</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', marginTop: '2px' }}>Metro Bình Dương khởi công cuối 2025</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CĂN HỘ
      ══════════════════════════════════ */}
      <section id="can-ho" style={{ padding: '100px 0', background: C.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <SectionLabel text="Dòng sản phẩm" />
              <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>
                Loại Căn Hộ &{' '}
                <em style={{ fontWeight: 400, color: C.gold }}>Giá Bán</em>
              </h2>
              <p style={{ marginTop: '16px', fontSize: '13px', color: C.textMuted, fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                Thanh toán chỉ 15% đến khi nhận nhà · Hỗ trợ vay ngân hàng đến 70%
              </p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {units.map((unit, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="unit-card" style={{
                  background: i === 1 ? C.navy : C.white,
                  border: `1px solid ${i === 1 ? C.navy : C.border}`,
                  padding: '36px 28px',
                  boxShadow: i === 1 ? '0 12px 40px rgba(27,43,75,0.2)' : '0 2px 12px rgba(27,43,75,0.06)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {i === 1 && (
                    <div style={{
                      position: 'absolute', top: '16px', right: '-28px',
                      background: C.gold, color: C.white,
                      fontSize: '9px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                      letterSpacing: '0.12em', padding: '4px 36px',
                      transform: 'rotate(45deg)',
                    }}>BÁN CHẠY</div>
                  )}
                  <div style={{
                    fontSize: '10px', letterSpacing: '0.15em',
                    color: i === 1 ? 'rgba(255,255,255,0.5)' : C.textLight,
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
                    textTransform: 'uppercase', marginBottom: '12px',
                  }}>Loại căn hộ</div>
                  <h3 style={{
                    fontSize: '22px', fontWeight: 700,
                    color: i === 1 ? C.white : C.navy,
                    marginBottom: '8px',
                  }}>{unit.type}</h3>
                  <div style={{
                    fontSize: '13px', color: i === 1 ? 'rgba(255,255,255,0.5)' : C.textMuted,
                    fontFamily: 'Montserrat, sans-serif', marginBottom: '4px',
                  }}>{unit.note}</div>
                  <div style={{
                    fontSize: '13px', fontFamily: 'Montserrat, sans-serif',
                    color: i === 1 ? 'rgba(255,255,255,0.6)' : C.textMuted,
                    marginBottom: '28px',
                  }}>Diện tích: <strong style={{ color: i === 1 ? C.white : C.navy }}>{unit.area}</strong></div>
                  <div style={{ borderTop: `1px solid ${i === 1 ? 'rgba(255,255,255,0.1)' : C.border}`, paddingTop: '20px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>Giá từ</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: i === 1 ? C.gold : C.navy }}>{unit.price}</div>
                  </div>
                  <a href="#lien-he" style={{
                    display: 'block', marginTop: '24px',
                    padding: '12px',
                    border: `1px solid ${i === 1 ? C.gold : C.navy}`,
                    textAlign: 'center',
                    fontSize: '11px', letterSpacing: '0.1em',
                    color: i === 1 ? C.gold : C.navy,
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
                    textDecoration: 'none', textTransform: 'uppercase',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = C.gold
                      el.style.borderColor = C.gold
                      el.style.color = C.white
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'transparent'
                      el.style.borderColor = i === 1 ? C.gold : C.navy
                      el.style.color = i === 1 ? C.gold : C.navy
                    }}
                  >
                    Tư Vấn Ngay
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Payment note */}
          <Reveal delay={0.4}>
            <div style={{
              marginTop: '48px', padding: '28px 36px',
              background: C.white,
              border: `1px solid ${C.border}`,
              display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap',
            }}>
              {[
                { icon: '🏦', text: 'Hỗ trợ vay 70% — Lãi suất ưu đãi' },
                { icon: '💰', text: 'Chỉ 15% đến khi nhận nhà' },
                { icon: '📋', text: 'Pháp lý sổ đỏ lâu dài' },
                { icon: '🏠', text: 'Bàn giao full nội thất cao cấp' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontSize: '13px', fontFamily: 'Montserrat, sans-serif', color: C.navy, fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          TIỆN ÍCH
      ══════════════════════════════════ */}
      <section id="tien-ich" style={{ padding: '100px 0', background: C.creamDark }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <Reveal>
                <SectionLabel text="Tiện ích nội khu" />
                <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: '20px' }}>
                  Trải Nghiệm Sống<br />
                  <em style={{ fontWeight: 400, color: C.gold }}>Đẳng Cấp Resort</em>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontSize: '15px', lineHeight: 1.9, color: C.textMuted, fontFamily: 'Montserrat, sans-serif', fontWeight: 300, marginBottom: '32px' }}>
                  Hơn 30 tiện ích cao cấp trong khuôn viên. Mật độ xây dựng chỉ <strong style={{ color: C.navy }}>34.5%</strong> — phần lớn diện tích dành trọn cho không gian xanh và trải nghiệm cư dân.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=85"
                    alt="Resort lifestyle"
                    style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,43,75,0.6) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: C.white, fontFamily: 'Playfair Display, serif' }}>30+</div>
                    <div style={{ fontSize: '12px', letterSpacing: '0.1em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>TIỆN ÍCH CAO CẤP</div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {amenities.map((a, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="amenity-card" style={{
                    padding: '24px 20px',
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    cursor: 'default',
                  }}>
                    <div style={{ fontSize: '28px', marginBottom: '12px' }}>{a.icon}</div>
                    <div className="amenity-title" style={{
                      fontSize: '14px', fontWeight: 600, color: C.navy,
                      marginBottom: '6px', fontFamily: 'Montserrat, sans-serif',
                      transition: 'color 0.25s',
                    }}>{a.title}</div>
                    <div className="amenity-desc" style={{
                      fontSize: '12px', color: C.textMuted,
                      fontFamily: 'Montserrat, sans-serif', lineHeight: 1.6,
                      transition: 'color 0.25s',
                    }}>{a.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          GALLERY
      ══════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: C.white }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <SectionLabel text="Không gian sống" />
              <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: C.navy }}>
                Hình Ảnh <em style={{ fontWeight: 400, color: C.gold }}>Dự Án</em>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '300px 300px', gap: '8px' }}>
            {[
              { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85', row: 'span 2' },
              { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85' },
              { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=85' },
            ].map((img, i) => (
              <Reveal key={i} delay={i * 0.1} style={{ gridRow: img.row || 'auto', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img src={img.src} alt="" style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease', display: 'block',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                  />
                </div>
              </Reveal>
            ))}
          </div>
          {/* Second row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '8px' }}>
            {[
              'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?w=600&q=85',
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=85',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=85',
            ].map((src, i) => (
              <Reveal key={i} delay={i * 0.1} style={{ overflow: 'hidden', height: '220px' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                  <img src={src} alt="" style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease', display: 'block',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          TIẾN ĐỘ
      ══════════════════════════════════ */}
      <section id="tien-do" style={{ padding: '100px 0', background: C.cream }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <SectionLabel text="Tiến độ dự án" />
              <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: C.navy }}>
                Lộ Trình <em style={{ fontWeight: 400, color: C.gold }}>Bàn Giao</em>
              </h2>
            </div>
          </Reveal>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '32px', left: '12.5%', right: '12.5%', height: '1px', background: `linear-gradient(to right, ${C.gold}, rgba(184,146,42,0.2))` }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
              {milestones.map((m, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '64px', height: '64px',
                      border: `2px solid ${m.done ? C.gold : C.border}`,
                      background: m.done ? C.gold : C.white,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px',
                      fontSize: '20px',
                      boxShadow: m.done ? `0 4px 20px rgba(184,146,42,0.3)` : 'none',
                    }}>
                      {m.done ? <span style={{ color: C.white, fontSize: '22px' }}>✓</span> : <span style={{ color: C.textLight, fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px' }}>{i + 1}</span>}
                    </div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginBottom: '8px' }}>{m.date}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: C.navy, marginBottom: '8px' }}>{m.title}</div>
                    <div style={{ fontSize: '13px', color: C.textMuted, fontFamily: 'Montserrat, sans-serif', lineHeight: 1.6 }}>{m.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT
      ══════════════════════════════════ */}
      <section id="lien-he" style={{ padding: '100px 0', background: C.navy }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            {/* Info */}
            <div>
              <Reveal>
                <SectionLabel text="Liên hệ" />
                <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: C.white, lineHeight: 1.2, marginBottom: '20px' }}>
                  Nhận Thông Tin<br />
                  <em style={{ fontWeight: 400, color: C.gold }}>Ưu Đãi Ngay Hôm Nay</em>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, marginBottom: '48px' }}>
                  Để lại thông tin để được tư vấn miễn phí, nhận bảng giá gốc và chính sách ưu đãi mới nhất trực tiếp từ chủ đầu tư Tyson An Phú.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
                  {[
                    { icon: '📍', label: 'Địa chỉ', value: 'Mặt tiền Thủ Khoa Huân, P. Thuận Giao, TP. Hồ Chí Minh' },
                    { icon: '📞', label: 'Hotline', value: '1800 xxxx (Miễn phí · 8:00–20:00 hàng ngày)' },
                    { icon: '✉️', label: 'Email', value: 'info@avacenter.vn' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '44px', height: '44px', flexShrink: 0,
                        background: 'rgba(184,146,42,0.15)',
                        border: `1px solid rgba(184,146,42,0.3)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px',
                      }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.6 }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal dir="right" delay={0.2}>
              <div style={{
                background: C.white, padding: '48px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: C.navy, marginBottom: '6px' }}>Đăng Ký Nhận Tư Vấn</h3>
                <p style={{ fontSize: '13px', color: C.textMuted, fontFamily: 'Montserrat, sans-serif', marginBottom: '32px' }}>Chuyên viên phản hồi trong vòng 30 phút</p>

                {[
                  { label: 'Họ và tên *', type: 'text' },
                  { label: 'Số điện thoại *', type: 'tel' },
                  { label: 'Email', type: 'email' },
                ].map((field, i) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.14em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>{field.label}</label>
                    <input type={field.type} style={{
                      width: '100%', padding: '12px 0',
                      border: 'none', borderBottom: `1px solid ${C.border}`,
                      fontSize: '14px', fontFamily: 'Montserrat, sans-serif',
                      outline: 'none', background: 'transparent', color: C.navy,
                    }} />
                  </div>
                ))}

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.14em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Loại căn hộ quan tâm</label>
                  <select style={{
                    width: '100%', padding: '12px 0',
                    border: 'none', borderBottom: `1px solid ${C.border}`,
                    fontSize: '14px', fontFamily: 'Montserrat, sans-serif',
                    outline: 'none', background: 'transparent', color: C.navy, cursor: 'pointer',
                  }}>
                    <option value="">Chọn loại căn hộ</option>
                    <option>Studio / 1 Phòng ngủ (35–41m²)</option>
                    <option>2 Phòng ngủ (61–72m²)</option>
                    <option>Officetel (30–45m²)</option>
                    <option>Shophouse (80–120m²)</option>
                  </select>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.14em', color: C.gold, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Ghi chú</label>
                  <textarea rows={3} style={{
                    width: '100%', padding: '12px 0',
                    border: 'none', borderBottom: `1px solid ${C.border}`,
                    fontSize: '14px', fontFamily: 'Montserrat, sans-serif',
                    outline: 'none', background: 'transparent',
                    color: C.navy, resize: 'none',
                  }} />
                </div>

                <button className="btn-primary" style={{
                  width: '100%', padding: '16px',
                  background: C.navy, border: 'none',
                  color: C.white, fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700, fontSize: '11px', letterSpacing: '0.14em',
                  cursor: 'pointer', textTransform: 'uppercase',
                }}>
                  Gửi Đăng Ký →
                </button>

                <p style={{ fontSize: '11px', color: C.textLight, fontFamily: 'Montserrat, sans-serif', textAlign: 'center', marginTop: '16px' }}>
                  🔒 Thông tin của bạn được bảo mật hoàn toàn
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Bottom bar ── */}
      <div style={{
        background: '#111B2E',
        padding: '20px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.06em' }}>
          © 2025 AVA CENTER · TYSON AN PHÚ · Mọi thông tin chỉ mang tính chất tham khảo
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '6px', height: '6px', background: C.gold, borderRadius: '50%', animation: 'pulse 2s ease infinite' }} />
          <span style={{ fontSize: '11px', color: C.gold, fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}>ĐÃ KHỞI CÔNG 22/08/2025</span>
        </div>
      </div>

      <Footer />
      <ZaloButton />
    </main>
  )
}