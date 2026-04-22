'use client'

import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import { Mail, Send, Phone, MessageSquare, Building2 } from 'lucide-react'

/* ─── Hook & Component Hiệu Ứng (Reveal) ───────────── */
function useScrollReveal(threshold = 0.1) {
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

function Reveal({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
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

/* ─── Brand Tokens ─────────────────────────────────────
   Cream bg:    #FDFAF6
   Section alt: #F5EDE8
   Red primary: #B03A2E
   Red dark:    #7B241C
   Gold:        #C9A84C
   Warm text:   #5D4E4E
   Muted:       #8A7D7D
   Border:      #E8D7CF
────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const offices = [
    {
      name: 'VĂN PHÒNG CHÍNH — TP.HCM',
      address: 'C26, đường D8, KDC Caric, An Khánh, TP HCM',
      phone: '+84 0986 51 4242',
      email: 'ngocdiachinh34@gmail.com',
      hours: 'T2–T6: 9:00–18:00 | T7–CN: 10:00–17:00',
      icon: '🏢',
    },
    {
      name: 'VĂN PHÒNG CHI NHÁNH — QUẬN PHÚ NHUẬN',
      address: '117-119-121 Hoàng Văn Thụ, Phú Nhuận, TP.HCM',
      phone: '+84 0909 423 328',
      email: 'info@pavilionhousing.vn',
      hours: 'T2–T6: 9:00–18:00 | T7: 10:00–16:00',
      icon: '🏬',
    },
    {
      name: 'TRUNG TÂM TƯ VẤN — QUẬN 2',
      address: '45 đường R, Lakeview City, An Phú, Tp HCM',
      phone: '+84 0986 51 4242',
      email: 'ngocdiachinh34@gmail.com',
      hours: 'T2–T6: 9:00–18:00 | T7–CN: 10:00–17:00',
      icon: '🏢',
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Có lỗi xảy ra, vui lòng thử lại.')
        return
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    } catch {
      setError('Không thể kết nối đến máy chủ. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  /* shared input style */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #E8D7CF',
    borderRadius: '8px',
    fontSize: '12px',
    letterSpacing: '0.04em',
    color: '#5D4E4E',
    backgroundColor: '#FFFFFF',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color: '#5D4E4E',
    marginBottom: '8px',
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FDFAF6' }}>
      <Header />

      {/* ── Hero Header ── */}
      <div className="pt-24 lg:pt-32 pb-12 lg:pb-16 border-b" style={{ backgroundColor: '#FDFAF6', borderColor: '#E8D7CF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal direction="left" delay={0}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{ width: '4px', alignSelf: 'stretch', backgroundColor: '#B03A2E', flexShrink: 0 }} />
              <div>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#5D4E4E', lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '12px' }}>
                  LIÊN HỆ VỚI <span style={{ color: '#B03A2E' }}>CHÚNG TÔI</span>
                </h1>
                <p style={{ fontSize: '15px', color: '#8A7D7D', letterSpacing: '0.05em' }}>
                  CHÚNG TÔI SẴN SÀNG GIÚP ĐỠ VÀ TRẢ LỜI MỌI CÂU HỎI CỦA BẠN
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Văn phòng ── */}
      <div className="py-16 lg:py-20" style={{ backgroundColor: '#F5EDE8' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal direction="up" delay={0}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#2C1A1A', marginBottom: '48px', textAlign: 'center', letterSpacing: '0.04em' }}>
              CÁC VĂN PHÒNG CỦA <span style={{ color: '#B03A2E' }}>CHÚNG TÔI</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, idx) => (
              <Reveal key={idx} direction="up" delay={idx * 0.1}>
                <div
                  style={{ backgroundColor: '#FDFAF6', padding: '32px', borderRadius: '12px', transition: 'transform 0.2s, box-shadow 0.2s', borderTop: '3px solid #B03A2E', height: '100%' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(176,58,46,0.12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <p style={{ fontSize: '40px', marginBottom: '16px' }}>{office.icon}</p>
                  <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#5D4E4E', marginBottom: '20px', letterSpacing: '0.07em' }}>{office.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: 'ĐỊA CHỈ', value: office.address, href: undefined },
                      { label: 'ĐIỆN THOẠI', value: office.phone, href: `tel:${office.phone}` },
                      { label: 'EMAIL', value: office.email, href: `mailto:${office.email}` },
                      { label: 'GIỜ LÀM VIỆC', value: office.hours, href: undefined },
                    ].map(({ label, value, href }) => (
                      <div key={label}>
                        <p style={{ fontSize: '9px', fontWeight: 700, color: '#8A7D7D', letterSpacing: '0.12em', marginBottom: '2px' }}>{label}</p>
                        {href ? (
                          <a href={href} style={{ fontSize: '13px', color: '#5D4E4E', textDecoration: 'none', fontWeight: 500 }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#B03A2E' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#5D4E4E' }}>
                            {value}
                          </a>
                        ) : (
                          <p style={{ fontSize: '13px', color: '#5D4E4E' }}>{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form + Map ── */}
      <div className="py-16 lg:py-20" style={{ backgroundColor: '#FDFAF6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Form */}
            <Reveal direction="left" delay={0.1}>
              <div className="order-2 lg:order-1">
                <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#2C1A1A', marginBottom: '36px', letterSpacing: '0.04em' }}>
                  GỬI TIN NHẮN
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>HỌ VÀ TÊN</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="NHẬP TÊN CỦA BẠN" style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label style={labelStyle}>EMAIL</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="email@example.com" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>SỐ ĐIỆN THOẠI</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+84 (0)xxx-xxx-xxx" style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>CHỦ ĐỀ</label>
                    <select name="subject" value={formData.subject} onChange={handleInputChange} required style={inputStyle}>
                      <option value="">CHỌN CHỦ ĐỀ</option>
                      <option value="general">CÂU HỎI CHUNG</option>
                      <option value="project">THÔNG TIN DỰ ÁN</option>
                      <option value="booking">ĐẶT LỊCH TOUR</option>
                      <option value="finance">TƯ VẤN TÀI CHÍNH</option>
                      <option value="other">KHÁC</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>LỜI NHẮN</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} placeholder="NHẬP LỜI NHẮN CỦA BẠN" style={{ ...inputStyle, resize: 'none' }} />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '14px',
                      backgroundColor: isLoading ? '#8A7D7D' : '#B03A2E',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { if (!isLoading) (e.currentTarget as HTMLElement).style.backgroundColor = '#7B241C' }}
                    onMouseLeave={e => { if (!isLoading) (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E' }}
                  >
                    {isLoading ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        ĐANG GỬI...
                      </>
                    ) : (
                      <><Send size={16} /> GỬI TIN NHẮN</>
                    )}
                  </button>

                  <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

                  {error && (
                    <div style={{ padding: '14px 18px', borderRadius: '8px', backgroundColor: '#B03A2E', color: '#FFFFFF', fontSize: '13px', letterSpacing: '0.04em', textAlign: 'center' }}>
                      {error}
                    </div>
                  )}

                  {submitted && (
                    <div style={{ padding: '14px 18px', borderRadius: '8px', backgroundColor: '#2C8A4F', color: '#FFFFFF', fontSize: '13px', letterSpacing: '0.04em', textAlign: 'center' }}>
                      CẢM ƠN BẠN ĐÃ GỬI TIN NHẮN! CHÚNG TÔI SẼ LIÊN HỆ VỚI BẠN SỚM.
                    </div>
                  )}
                </form>
              </div>
            </Reveal>

            {/* Map + Quick links */}
            <Reveal direction="right" delay={0.2}>
              <div className="flex flex-col gap-8 order-1 lg:order-2">
                {/* Map placeholder */}
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#2C1A1A', marginBottom: '20px', letterSpacing: '0.04em' }}>
                    VỊ TRÍ CHÚNG TÔI
                  </h2>
                  <div style={{ height: '280px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E8D7CF', backgroundColor: '#F5EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ fontSize: '48px' }}>🗺️</p>
                    <p style={{ fontSize: '13px', color: '#8A7D7D', letterSpacing: '0.05em' }}>BẢN ĐỒ TƯƠNG TÁC</p>
                    <p style={{ fontSize: '11px', color: '#8A7D7D', letterSpacing: '0.04em' }}>10.7769° N, 106.6955° E</p>
                  </div>
                </div>

                {/* Quick links */}
                <div style={{ backgroundColor: '#F5EDE8', padding: '28px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#5D4E4E', marginBottom: '20px', letterSpacing: '0.1em' }}>
                    CÓ CẦN GIÚP ĐỠ?
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[
                      { href: 'tel:+0986514242', icon: <Phone size={20} />, label: 'GỌI NGAY', sub: '+84 0986 51 4242' },
                      { href: 'mailto:contact@happyhouse.com.vn', icon: <Mail size={20} />, label: 'GỬI EMAIL', sub: 'ngocdiachinh34@gmail.com' },
                      { href: 'https://wa.me/84283821555', icon: <MessageSquare size={20} />, label: 'WHATSAPP', sub: 'NHẮN TIN TRỰC TIẾP' },
                      { href: '/projects', icon: <Building2 size={20} />, label: 'XEM DỰ ÁN', sub: 'KHÁM PHÁ CÁC DỰ ÁN CỦA CHÚNG TÔI' },
                    ].map(({ href, icon, label, sub }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 14px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#E8D7CF' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                      >
                        <span style={{ color: '#B03A2E' }}>{icon}</span>
                        <div>
                          <p style={{ fontSize: '12px', fontWeight: 700, color: '#5D4E4E', letterSpacing: '0.07em' }}>{label}</p>
                          <p style={{ fontSize: '10px', color: '#8A7D7D', letterSpacing: '0.04em' }}>{sub}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="py-16 lg:py-20" style={{ backgroundColor: '#F5EDE8' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <Reveal direction="up" delay={0}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#2C1A1A', textAlign: 'center', marginBottom: '48px', letterSpacing: '0.04em' }}>
              CÂU HỎI <span style={{ color: '#B03A2E' }}>THƯỜNG GẶP</span>
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                q: 'LÀM CÁCH NÀO ĐỂ ĐẶT LỊCH TOUR DỰ ÁN?',
                a: 'Bạn có thể đặt lịch tour trực tiếp trên trang web hoặc liên hệ với chúng tôi qua điện thoại/email. Chúng tôi sẽ sắp xếp lịch thuận tiện nhất cho bạn.',
              },
              {
                q: 'CÁC ĐIỀU KIỆN THANH TOÁN LÀ GÌ?',
                a: 'Chúng tôi cung cấp các hình thức thanh toán linh hoạt với các kỳ hạn từ 2–25 năm. Bạn có thể chọn thanh toán 30% trước, 70% sau khi bàn giao.',
              },
              {
                q: 'DỰ ÁN CÓ ĐƯỢC PHÁP LÝ ĐẦY ĐỦ KHÔNG?',
                a: 'Tất cả các dự án của chúng tôi đều có pháp lý đầy đủ. Chúng tôi cam kết minh bạch và tuân thủ các quy định pháp luật.',
              },
              {
                q: 'CÓ CHÍNH SÁCH HOÀN TIỀN NẾU TÔI THAY ĐỔI Ý ĐỊNH?',
                a: 'Chúng tôi có chính sách hỗ trợ linh hoạt. Vui lòng liên hệ trực tiếp để tìm hiểu thêm chi tiết.',
              },
            ].map((faq, idx) => (
              <Reveal key={idx} direction="up" delay={idx * 0.1}>
                <details
                  style={{ backgroundColor: '#FDFAF6', borderRadius: '10px', padding: '20px 24px', cursor: 'pointer', borderLeft: '3px solid #E8D7CF' }}
                >
                  <summary style={{ fontSize: '12px', fontWeight: 700, color: '#5D4E4E', letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
                    {faq.q}
                    <span style={{ color: '#B03A2E', marginLeft: '12px', flexShrink: 0 }}>+</span>
                  </summary>
                  <p style={{ fontSize: '13px', color: '#8A7D7D', marginTop: '14px', lineHeight: 1.7, letterSpacing: '0.02em' }}>{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <ZaloButton />
    </main>
  )
}