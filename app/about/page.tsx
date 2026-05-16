'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import PhoneButton from '@/components/phone-button'
import { useEffect, useRef, useState } from 'react'

// ── Hook: theo dõi khi element vào viewport ──
function useScrollReveal(threshold = 0.15) {
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

// ── Hook: đếm số khi hiện ──
function useCountUp(target: number, visible: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [visible, target])
  return count
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

function Reveal({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.12,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  threshold?: number
  style?: React.CSSProperties
}) {
  const { ref, visible } = useScrollReveal(threshold)
  const initialTransform: Record<Direction, string> = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
    scale: 'scale(0.85)',
  }
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : initialTransform[direction],
        transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function StatCard({ icon, number, suffix, label, delay = 0 }: {
  icon: string; number: number; suffix: string; label: string; delay?: number
}) {
  const { ref, visible } = useScrollReveal()
  const count = useCountUp(number, visible)
  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.92)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      <p style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '16px' }}>{icon}</p>
      <p style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 800, color: '#B03A2E', letterSpacing: '-0.01em' }}>
        {count}{suffix}
      </p>
      <p style={{ fontWeight: 600, marginTop: '8px', color: '#5D4E4E', fontSize: '12px', letterSpacing: '0.06em' }}>
        {label}
      </p>
    </div>
  )
}

export default function AboutPage() {
  const stats = [
    { icon: '⭐', number: 15, suffix: '+', label: 'NĂM KINH NGHIỆM' },
    { icon: '👥', number: 500, suffix: '+', label: 'KHÁCH HÀNG HÀI LÒNG' },
    { icon: '🏗️', number: 50, suffix: '+', label: 'DỰ ÁN THÀNH CÔNG' },
    { icon: '😊', number: 98, suffix: '%', label: 'TỶ LỆ HÀI LÒNG' },
  ]

  const values = [
    { title: 'TÍNH TRUNG THỰC', description: 'Chúng tôi cam kết thực hiện đúng lời hứa và minh bạch trong mọi giao dịch.', icon: '✓' },
    { title: 'CHẤT LƯỢNG HÀNG ĐẦU', description: 'Mỗi dự án được xây dựng với tiêu chuẩn quốc tế cao nhất.', icon: '★' },
    { title: 'KHÁCH HÀNG TRÊN HẾT', description: 'Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.', icon: '❤' },
    { title: 'ĐỔI MỚI LIÊN TỤC', description: 'Chúng tôi luôn tìm kiếm những cách tiếp cận mới và tốt hơn.', icon: '◆' },
  ]

  const testimonials = [
    {
      name: 'CHỊ NGỌC HÀ',
      location: 'QUẬN 2, TP.HCM',
      text: 'HappyHouse đã giúp gia đình tôi tìm được căn hộ mơ ước. Đội ngũ tư vấn nhiệt tình, chuyên nghiệp và luôn lắng nghe nhu cầu của khách hàng.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    },
    {
      name: 'ANH MINH TUẤN',
      location: 'QUẬN 7, TP.HCM',
      text: 'Tôi đã mua căn shophouse qua HappyHouse và rất hài lòng. Quy trình minh bạch, pháp lý rõ ràng, không có bất kỳ rắc rối nào.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
    {
      name: 'ANH HOÀNG LONG',
      location: 'QUẬN 9, TP.HCM',
      text: 'Đầu tư vào dự án của HappyHouse là quyết định đúng đắn nhất của tôi. Giá trị bất động sản tăng đáng kể chỉ sau 1 năm.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    },
  ]

  const certificates = [
    {
      title: 'CHỨNG CHỈ HÀNH NGHỀ MÔI GIỚI BẤT ĐỘNG SẢN',
      issuer: 'Bộ Xây dựng Việt Nam',
      number: 'Số: 123456/BXD-QLHĐXD',
      year: '2026',
      icon: '🏛️',
      color: '#B03A2E',
    },
    {
      title: 'CHỨNG CHỈ ĐỊNH GIÁ BẤT ĐỘNG SẢN',
      issuer: 'Hội Thẩm định giá Việt Nam',
      number: 'Số: 78901/HTĐGVN',
      year: '2026',
      icon: '📋',
      color: '#C9A84C',
    },
    {
      title: 'CHỨNG NHẬN HOÀN THÀNH ĐÀO TẠO MÔI GIỚI BĐS QUỐC TẾ',
      issuer: 'National Association of Realtors® (NAR)',
      number: 'Member ID: NAR-2019-VN-0582',
      year: '2026',
      icon: '🌐',
      color: '#2C6E8A',
    },
  ]

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FDFAF6' }}>
      <Header />

      {/* ══════════════════════════════════════════
          ── HERO: CHUYÊN VIÊN TƯ VẤN (ĐẶT LÊN ĐẦU) ──
          ══════════════════════════════════════════ */}
      <div
        className="pt-24 lg:pt-32 pb-16 lg:pb-20"
        style={{
          background: 'linear-gradient(135deg, #2C1A1A 0%, #4A2020 50%, #3A1818 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(176,58,46,0.25) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 80px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          {/* Badge tiêu đề section */}
          <Reveal direction="up">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 20px',
                borderRadius: '100px',
                backgroundColor: 'rgba(176,58,46,0.3)',
                border: '1px solid rgba(176,58,46,0.5)',
                color: '#F5A99A',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: '16px',
              }}>
                CHUYÊN VIÊN TƯ VẤN CỦA BẠN
              </span>
              <h2 style={{
                fontSize: 'clamp(26px, 3.5vw, 40px)',
                fontWeight: 900,
                color: '#FDFAF6',
                letterSpacing: '0.02em',
              }}>
                GẶP GỠ <span style={{ color: '#C9A84C' }}>CHUYÊN GIA</span> CỦA CHÚNG TÔI
              </h2>
            </div>
          </Reveal>

          {/* Profile Card: ảnh lớn + thông tin chuyên nghiệp */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}>

            {/* ── Ảnh lớn bên trái ── */}
            <Reveal direction="left" delay={0.1} style={{ flex: '1 1 320px', maxWidth: '420px' }}>
              <div style={{ position: 'relative', height: '100%', minHeight: '480px' }}>
                {/* Gold frame decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-12px', left: '-12px',
                  width: '100%', height: '100%',
                  border: '2px solid rgba(201,168,76,0.4)',
                  borderRadius: '16px',
                  zIndex: 0,
                }} />
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  minHeight: '480px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                }}>
                  <img
                    src="/avatarvuthingoc2.png"
                    alt="Vũ Thị Ngọc – Chuyên viên tư vấn cấp cao"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block',
                    }}
                  />
                  {/* Gradient overlay bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '120px',
                    background: 'linear-gradient(to top, rgba(44,26,26,0.85), transparent)',
                  }} />
                  {/* Name tag at bottom of image */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px', left: '20px', right: '20px',
                  }}>
                    <p style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '4px' }}>
                      CHUYÊN VIÊN TƯ VẤN CẤP CAO
                    </p>
                    <p style={{ fontSize: '22px', fontWeight: 900, color: '#FDFAF6', letterSpacing: '0.01em' }}>
                      Vũ Thị Ngọc
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Thông tin bên phải ── */}
            <Reveal direction="right" delay={0.2} style={{ flex: '1 1 340px', maxWidth: '560px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div>

                {/* Tagline */}
                <p style={{
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: 'rgba(245,237,232,0.7)',
                  marginBottom: '28px',
                  lineHeight: 1.7,
                  borderLeft: '3px solid #C9A84C',
                  paddingLeft: '16px',
                }}>
                  "Mỗi giao dịch bất động sản là một quyết định quan trọng trong cuộc đời — tôi ở đây để đồng hành cùng bạn, từ những câu hỏi đầu tiên đến ngày bàn giao chìa khóa."
                </p>

                {/* Chuyên môn & nổi bật */}
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '16px' }}>
                    CHUYÊN MÔN NỔI BẬT
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: 'Phân tích đầu tư bất động sản', detail: 'Định giá theo giá trị thực, cân bằng lợi nhuận & rủi ro' },
                      { label: 'Tư vấn pháp lý giao dịch', detail: 'Kiểm tra pháp lý dự án, an toàn 100% trước khi ký kết' },
                      { label: 'Bất động sản cao cấp & thương mại', detail: 'Căn hộ hạng sang, shophouse, officetel tại TP.HCM' },
                      { label: 'Lập kế hoạch tài chính mua nhà', detail: 'Tối ưu vay ngân hàng, hỗ trợ hồ sơ từ A–Z' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <span style={{
                          width: '20px', height: '20px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(176,58,46,0.8)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}>
                          <span style={{ color: '#fff', fontSize: '10px', fontWeight: 800 }}>✓</span>
                        </span>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#FDFAF6', marginBottom: '2px' }}>{item.label}</p>
                          <p style={{ fontSize: '12px', color: 'rgba(253,250,246,0.55)', lineHeight: 1.5 }}>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Số liệu nhanh */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '28px',
                }}>
                  {[
                    { num: '10+', label: 'Năm kinh nghiệm' },
                    { num: '93', label: 'Giao dịch thành công' },
                    { num: '98%', label: 'Khách hàng hài lòng' },
                  ].map((s, i) => (
                    <div key={i} style={{
                      flex: '1 1 90px',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      textAlign: 'center',
                    }}>
                      <p style={{ fontSize: '22px', fontWeight: 900, color: '#C9A84C', marginBottom: '2px' }}>{s.num}</p>
                      <p style={{ fontSize: '10px', color: 'rgba(253,250,246,0.6)', letterSpacing: '0.06em' }}>{s.label.toUpperCase()}</p>
                    </div>
                  ))}
                </div>

                {/* CTA liên hệ */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="/contact"
                    style={{
                      display: 'inline-block',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      backgroundColor: '#B03A2E',
                      color: '#FDFAF6',
                      textDecoration: 'none',
                      transition: 'background 0.2s, transform 0.15s',
                      boxShadow: '0 4px 16px rgba(176,58,46,0.4)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#8E2D24'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    }}
                  >
                    TƯ VẤN NGAY
                  </a>
                  <a
                    href="tel:+840986514242"
                    style={{
                      display: 'inline-block',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      backgroundColor: 'transparent',
                      color: '#C9A84C',
                      textDecoration: 'none',
                      border: '1px solid rgba(201,168,76,0.5)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(201,168,76,0.15)'
                      ;(e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)'
                    }}
                  >
                    📞 GỌI ĐIỆN TRAO ĐỔI
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Chứng chỉ hành nghề ── */}
          <Reveal direction="up" delay={0.3}>
            <div style={{ marginTop: '56px' }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '28px',
              }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#C9A84C', letterSpacing: '0.15em', marginBottom: '8px' }}>
                  CHỨNG CHỈ & NĂNG LỰC HÀNH NGHỀ
                </p>
                <div style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C', margin: '0 auto' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                {certificates.map((cert, idx) => (
                  <Reveal key={idx} direction="up" delay={0.1 * idx}>
                    <div style={{
                      flex: '1 1 260px',
                      maxWidth: '360px',
                      padding: '20px 24px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: `1px solid rgba(255,255,255,0.1)`,
                      borderLeft: `3px solid ${cert.color}`,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      backdropFilter: 'blur(4px)',
                    }}>
                      <span style={{ fontSize: '28px', flexShrink: 0, marginTop: '2px' }}>{cert.icon}</span>
                      <div>
                        <p style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#FDFAF6',
                          letterSpacing: '0.05em',
                          marginBottom: '6px',
                          lineHeight: 1.4,
                        }}>
                          {cert.title}
                        </p>
                        <p style={{ fontSize: '11px', color: 'rgba(253,250,246,0.55)', marginBottom: '2px' }}>
                          {cert.issuer}
                        </p>
                        <p style={{ fontSize: '10px', color: 'rgba(253,250,246,0.35)', letterSpacing: '0.04em' }}>
                          {cert.number} &nbsp;·&nbsp; Cấp năm {cert.year}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          ── VỀ HAPPYHOUSE HERO ──
          ══════════════════════════════════════════ */}
      <div className="py-16 lg:py-20 border-b border-[#E8D7CF]" style={{ backgroundColor: '#FDFAF6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '64px', rowGap: '40px', alignItems: 'center' }}>
            <Reveal direction="left" style={{ flex: '1 1 320px', minWidth: 0, maxWidth: '100%' }}>
              <div>
                <Reveal delay={0.1}>
                  <div style={{ width: 48, height: 4, backgroundColor: '#B03A2E', marginBottom: 24, borderRadius: 2 }} />
                </Reveal>
                <Reveal delay={0.2}>
                  <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#2C1A1A', marginBottom: 24, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                    VỀ{' '}
                    <span style={{ color: '#B03A2E' }}>HAPPYHOUSE</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.3}>
                  <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#5D4E4E', marginBottom: 20 }}>
                    HappyHouse là nhà phát triển bất động sản uy tín tại Việt Nam với hơn 15 năm kinh nghiệm. Chúng tôi cam kết mang đến những dự án chất lượng cao, thiết kế độc đáo và tạo giá trị bền vững cho mọi gia đình.
                  </p>
                </Reveal>
                <Reveal delay={0.4}>
                  <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#8A7D7D' }}>
                    Với đội ngũ chuyên gia giàu kinh nghiệm và tầm nhìn dài hạn, chúng tôi luôn đặt hạnh phúc của khách hàng lên hàng đầu trong mỗi quyết định.
                  </p>
                </Reveal>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2} style={{ flex: '1 1 320px', minWidth: 0, maxWidth: '100%' }}>
              <div style={{ position: 'relative', height: '400px', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(176,58,46,0.15)' }}>
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                  alt="HappyHouse"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(176,58,46,0.12)' }} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Sứ mệnh & Tầm nhìn ── */}
      <div className="py-16 lg:py-20" style={{ backgroundColor: '#F5EDE8' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal direction="left" delay={0} style={{ display: 'flex' }}>
              <div style={{ padding: '32px', borderRadius: '12px', backgroundColor: '#FDFAF6', borderLeft: '4px solid #B03A2E', flex: 1 }} className="p-8 lg:p-12">
                <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#B03A2E', marginBottom: '20px', letterSpacing: '0.04em' }}>SỨ MỆNH</h2>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5D4E4E' }}>
                  Phát triển những dự án bất động sản chất lượng cao, tạo ra những không gian sống và làm việc lý tưởng cho mọi gia đình Việt Nam. Mỗi dự án là một cơ hội để nâng cao chất lượng cuộc sống cộng đồng.
                </p>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.15} style={{ display: 'flex' }}>
              <div style={{ padding: '32px', borderRadius: '12px', backgroundColor: '#FDFAF6', borderLeft: '4px solid #C9A84C', flex: 1 }} className="p-8 lg:p-12">
                <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#C9A84C', marginBottom: '20px', letterSpacing: '0.04em' }}>TẦM NHÌN</h2>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5D4E4E' }}>
                  Trở thành nhà phát triển bất động sản được tin tưởng nhất tại Việt Nam, được công nhận vì cam kết với chất lượng, đổi mới và sự hài lòng của khách hàng. Hướng tới sự bền vững và tác động xã hội tích cực.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Thống kê ── */}
      <div className="py-16 lg:py-20" style={{ backgroundColor: '#FDFAF6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal direction="up">
            <h2 style={{ fontSize: '36px', fontWeight: 900, textAlign: 'center', color: '#2C1A1A', marginBottom: '60px', letterSpacing: '0.02em' }}>
              CON SỐ <span style={{ color: '#B03A2E' }}>NỔI BẬT</span>
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{ flex: '1 1 140px', maxWidth: '300px' }}>
                <StatCard {...stat} delay={idx * 0.12} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Khách hàng nói gì ── */}
      <div className="py-16 lg:py-20" style={{ backgroundColor: '#F5EDE8' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal direction="up">
            <h2 style={{ fontSize: '36px', fontWeight: 900, textAlign: 'center', color: '#2C1A1A', marginBottom: '60px', letterSpacing: '0.02em' }}>
              KHÁCH HÀNG <span style={{ color: '#B03A2E' }}>NÓI GÌ</span>
            </h2>
          </Reveal>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Reveal key={idx} direction="up" delay={idx * 0.15}>
                <div style={{ padding: '32px', borderRadius: '12px', backgroundColor: '#FDFAF6', borderTop: '4px solid #B03A2E', height: '100%' }}>
                  <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5D4E4E', fontStyle: 'italic', marginBottom: '24px' }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={t.image} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <p style={{ fontWeight: 700, color: '#2C1A1A', fontSize: '12px', letterSpacing: '0.06em' }}>{t.name}</p>
                      <p style={{ fontSize: '11px', color: '#8A7D7D', letterSpacing: '0.05em' }}>{t.location}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Giá trị cốt lõi ── */}
      <div className="py-16 lg:py-20" style={{ backgroundColor: '#FDFAF6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal direction="up">
            <h2 style={{ fontSize: '36px', fontWeight: 900, textAlign: 'center', color: '#2C1A1A', marginBottom: '60px', letterSpacing: '0.02em' }}>
              GIÁ TRỊ <span style={{ color: '#B03A2E' }}>CỐT LÕI</span>
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {values.map((value, idx) => (
              <Reveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.1} style={{ flex: '1 1 300px', minWidth: 0 }}>
                <div
                  style={{ padding: '32px', borderRadius: '12px', backgroundColor: '#F5EDE8', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default', height: '100%' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(176,58,46,0.12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 800, color: '#C9A84C', lineHeight: 1.2 }}>{value.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#2C1A1A', marginBottom: '10px', letterSpacing: '0.06em' }}>{value.title}</h3>
                      <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#5D4E4E' }}>{value.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="py-16 lg:py-20" style={{ backgroundColor: '#B03A2E' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <Reveal direction="up">
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', marginBottom: '20px', letterSpacing: '0.02em' }}>
              MUỐN TÌM HIỂU THÊM?
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p style={{ fontSize: '17px', color: 'rgba(253,250,246,0.85)', marginBottom: '40px', lineHeight: 1.7 }}>
              Liên hệ với chúng tôi để khám phá những dự án tuyệt vời và cơ hội đầu tư hấp dẫn.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.25}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/projects"
                style={{ display: 'inline-block', padding: '14px 36px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', backgroundColor: '#FDFAF6', color: '#B03A2E', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F5EDE8' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FDFAF6' }}
              >
                KHÁM PHÁ DỰ ÁN
              </a>
              <a
                href="/contact"
                style={{ display: 'inline-block', padding: '14px 36px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', backgroundColor: '#7B241C', color: '#FDFAF6', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#5C1A14' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7B241C' }}
              >
                LIÊN HỆ NGAY
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
      <PhoneButton />
      <ZaloButton />
    </main>
  )
}