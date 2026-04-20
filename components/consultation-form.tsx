'use client'

import { useState } from 'react'
import { CheckCircle2, Shield, Clock, Send } from 'lucide-react'

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Giả lập thời gian gửi form
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', message: '' })
      
      // Tắt thông báo thành công sau 3 giây
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  /* Shared input styles */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #E8D7CF',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#5D4E4E',
    backgroundColor: '#FAFAFA',
    outline: 'none',
    transition: 'all 0.2s ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#5D4E4E',
    marginBottom: '8px',
    textTransform: 'uppercase',
  }

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#FDFAF6' }}>
      {/* Khối màu trang trí nền */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full hidden lg:block" 
        style={{ backgroundColor: '#F5EDE8', borderTopLeftRadius: '100px' }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Cột trái: Thông tin thuyết phục */}
          <div className="order-2 lg:order-1">
            <div style={{ width: '40px', height: '4px', backgroundColor: '#B03A2E', marginBottom: '24px' }} />
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-6" 
              style={{ color: '#2C1A1A', lineHeight: 1.2, letterSpacing: '-0.01em' }}
            >
              ĐĂNG KÝ <span style={{ color: '#B03A2E' }}>NHẬN TƯ VẤN</span>
            </h2>
            <p className="text-base md:text-lg mb-10" style={{ color: '#5D4E4E', lineHeight: 1.7 }}>
              Hãy để lại thông tin để nhận ngay bảng giá chi tiết, chính sách ưu đãi mới nhất và bộ tài liệu độc quyền từ chủ đầu tư.
            </p>

            <div className="space-y-6">
              {[
                { icon: <CheckCircle2 size={24} />, title: 'Thông tin minh bạch', desc: 'Cung cấp pháp lý dự án và bảng giá gốc trực tiếp.' },
                { icon: <Shield size={24} />, title: 'Bảo mật tuyệt đối', desc: 'Thông tin cá nhân của bạn được mã hóa và bảo vệ 100%.' },
                { icon: <Clock size={24} />, title: 'Hỗ trợ 24/7', desc: 'Chuyên viên của chúng tôi sẽ liên hệ lại trong vòng 15 phút.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div style={{ color: '#C9A84C', marginTop: '2px' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#2C1A1A', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#8A7D7D' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cột phải: Form Card */}
          <div className="order-1 lg:order-2">
            <div 
              className="p-8 md:p-10 rounded-2xl relative"
              style={{ 
                backgroundColor: '#FFFFFF', 
                boxShadow: '0 24px 48px rgba(176,58,46,0.08)',
                border: '1px solid #E8D7CF'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" style={labelStyle}>Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên của bạn"
                    style={inputStyle}
                    required
                    onFocus={e => e.target.style.borderColor = '#B03A2E'}
                    onBlur={e => e.target.style.borderColor = '#E8D7CF'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" style={labelStyle}>Số điện thoại</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+84 (0)xxx-xxx-xxx"
                      style={inputStyle}
                      required
                      onFocus={e => e.target.style.borderColor = '#B03A2E'}
                      onBlur={e => e.target.style.borderColor = '#E8D7CF'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      style={inputStyle}
                      required
                      onFocus={e => e.target.style.borderColor = '#B03A2E'}
                      onBlur={e => e.target.style.borderColor = '#E8D7CF'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>Lời nhắn (Tùy chọn)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Bạn cần tìm hiểu thêm về căn hộ loại nào?"
                    rows={4}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#B03A2E'}
                    onBlur={e => e.target.style.borderColor = '#E8D7CF'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: isSubmitting ? '#8A7D7D' : '#B03A2E', 
                    color: '#FFFFFF',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={e => { if(!isSubmitting) (e.currentTarget as HTMLElement).style.backgroundColor = '#7B241C' }}
                  onMouseLeave={e => { if(!isSubmitting) (e.currentTarget as HTMLElement).style.backgroundColor = '#B03A2E' }}
                >
                  {isSubmitting ? 'ĐANG GỬI...' : (
                    <>
                      <Send size={18} /> GỬI YÊU CẦU TƯ VẤN
                    </>
                  )}
                </button>

                {/* Thông báo thành công */}
                {submitted && (
                  <div 
                    className="p-4 rounded-lg text-center" 
                    style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontSize: '13px', fontWeight: 600 }}
                  >
                    Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.
                  </div>
                )}
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}