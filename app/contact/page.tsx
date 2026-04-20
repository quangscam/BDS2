'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { Mail, Phone, MapPin, Send, Phone as PhoneIcon, MessageSquare, FileText, Building2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: officesRef, isVisible: officesVisible } = useScrollReveal()
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal()

  const offices = [
    {
      name: 'Văn phòng chính - TP.HCM',
      address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
      phone: '+84 (28) 3821-5555',
      email: 'contact@centrepoint.com',
      hours: 'T2-T6: 9:00 - 18:00, T7-CN: 10:00 - 17:00',
      image: '🏢',
    },
    {
      name: 'Văn phòng chi nhánh - Quận 2',
      address: '456 Đường Tạ Uy Bằng, Quận 2, TP.HCM',
      phone: '+84 (28) 5555-2222',
      email: 'quận2@centrepoint.com',
      hours: 'T2-T6: 9:00 - 18:00, T7: 10:00 - 16:00',
      image: '🏬',
    },
    {
      name: 'Trung tâm tư vấn - Quận 3',
      address: '321 Đường Pasteur, Quận 3, TP.HCM',
      phone: '+84 (28) 3827-1111',
      email: 'quận3@centrepoint.com',
      hours: 'T2-T6: 9:00 - 18:00, T7-CN: 10:00 - 17:00',
      image: '🏛️',
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="bg-white py-12 border-b border-gray-200" ref={titleRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative transition-all duration-500 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute left-0 top-0 w-1 h-20 rounded" style={{ backgroundColor: '#B03A2E' }}></div>
            <div className="pl-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">LIÊN HỆ <span style={{ color: '#B03A2E' }}>VỚI CHÚNG TÔI</span></h1>
              <p className="text-lg text-gray-600">Chúng tôi sẵn sàng giúp đỡ và trả lời mọi câu hỏi của bạn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Office Information */}
      <div className="bg-gray-50 py-20" ref={officesRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative mb-12 transition-all duration-500 ${officesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute left-0 top-0 w-1 h-12 rounded" style={{ backgroundColor: '#B03A2E' }}></div>
            <div className="pl-6">
              <h2 className="text-3xl font-bold text-gray-900">CÁC VĂN PHÒNG CỦA CHÚNG TÔI</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, idx) => (
              <div 
                key={idx} 
                className={`bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 card-hover ${
                  officesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: officesVisible ? `${(idx + 1) * 75}ms` : '0ms',
                }}
              >
                <p className="text-5xl mb-4">{office.image}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{office.name}</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold text-gray-900">Địa chỉ</p>
                    <p>{office.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Điện thoại</p>
                    <a href={`tel:${office.phone}`} className="hover:text-yellow-600 transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href={`mailto:${office.email}`} className="hover:text-yellow-600 transition-colors">
                      {office.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Giờ làm việc</p>
                    <p>{office.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Map */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">GỬI TIN NHẮN</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Nhập tên của bạn"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="+84 (0)xxx-xxx-xxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Chủ đề</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="general">Câu hỏi chung</option>
                    <option value="project">Thông tin dự án</option>
                    <option value="booking">Đặt lịch tour</option>
                    <option value="finance">Tư vấn tài chính</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Lời nhắn</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Nhập lời nhắn của bạn"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#8B4513' }}
                >
                  <Send size={20} />
                  GỬI TIN NHẮN
                </button>

                {submitted && (
                  <div className="p-4 rounded-lg text-white text-sm" style={{ backgroundColor: '#C41E3A' }}>
                    Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ với bạn sớm.
                  </div>
                )}
              </form>
            </div>

            {/* Map & Info */}
            <div className="space-y-8">
              {/* Map */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">VỊ TRÍ CHÚNG TÔI</h2>
                <div className="h-96 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl mb-4">🗺️</p>
                    <p className="text-gray-600">Bản đồ tương tác</p>
                    <p className="text-sm text-gray-500 mt-2">Vị trí: 10.7769° N, 106.6955° E</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">CÓ CẦN GIÚP ĐỠ?</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+84283821555"
                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <PhoneIcon size={24} style={{ color: '#8B4513' }} />
                    <div>
                      <p className="font-semibold text-gray-900">Gọi ngay</p>
                      <p className="text-sm text-gray-600">+84 (28) 3821-5555</p>
                    </div>
                  </a>
                  <a
                    href="mailto:contact@centrepoint.com"
                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Mail size={24} style={{ color: '#8B4513' }} />
                    <div>
                      <p className="font-semibold text-gray-900">Gửi Email</p>
                      <p className="text-sm text-gray-600">contact@centrepoint.com</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/84283821555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <MessageSquare size={24} style={{ color: '#8B4513' }} />
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">Nhắn tin trực tiếp</p>
                    </div>
                  </a>
                  <a
                    href="/projects"
                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Building2 size={24} style={{ color: '#8B4513' }} />
                    <div>
                      <p className="font-semibold text-gray-900">Xem dự án</p>
                      <p className="text-sm text-gray-600">Khám phá các dự án của chúng tôi</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20" ref={faqRef as any}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative mb-12 transition-all duration-500 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute left-0 top-0 w-1 h-12 rounded" style={{ backgroundColor: '#B03A2E' }}></div>
            <div className="pl-6">
              <h2 className="text-3xl font-bold text-gray-900">CÂU HỎI THƯỜNG GẶP</h2>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'Làm cách nào để đặt lịch tour dự án?',
                a: 'Bạn có thể đặt lịch tour trực tiếp trên trang web hoặc liên hệ với chúng tôi qua điện thoại/email. Chúng tôi sẽ sắp xếp lịch thuận tiện nhất cho bạn.',
              },
              {
                q: 'Các điều kiện thanh toán là gì?',
                a: 'Chúng tôi cung cấp các hình thức thanh toán linh hoạt với các kỳ hạn từ 2-25 năm. Bạn có thể chọn thanh toán 30% trước, 70% sau khi bàn giao.',
              },
              {
                q: 'Dự án có được pháp lý đầy đủ không?',
                a: 'Tất cả các dự án của chúng tôi đều có pháp lý đầy đủ. Chúng tôi cam kết minh bạch và tuân thủ các quy định pháp luật.',
              },
              {
                q: 'Có chính sách hoàn tiền nếu tôi thay đổi ý định?',
                a: 'Chúng tôi có chính sách hỗ trợ linh hoạt. Vui lòng liên hệ trực tiếp để tìm hiểu thêm chi tiết.',
              },
            ].map((faq, idx) => (
              <details 
                key={idx} 
                className={`bg-white rounded-lg p-6 cursor-pointer hover:shadow-sm transition-all duration-500 ${
                  faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: faqVisible ? `${(idx + 1) * 75}ms` : '0ms',
                }}
              >
                <summary className="font-semibold text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span>+</span>
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
