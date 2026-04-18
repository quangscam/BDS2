'use client'

import { useState } from 'react'

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  return (
    <section className="py-20" style={{ backgroundColor: '#8B4513' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">ĐĂNG KÝ TƯ VẤN</h2>
          <p className="text-lg opacity-90">
            Hãy để lại thông tin của bạn, chúng tôi sẽ liên hệ trong soonest thời gian
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white font-semibold mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên của bạn"
              className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2" 
              style={{ '--tw-ring-color': '#D4AF37' } as any}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-white font-semibold mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D4AF37' } as any}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email của bạn"
                className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D4AF37' } as any}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-white font-semibold mb-2">
              Lời nhắn
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Nhập lời nhắn của bạn"
              rows={5}
              className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#D4AF37' } as any}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white px-8 py-4 rounded font-bold text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#D4AF37', color: '#2D2D2D' }}
          >
            ĐĂNG KÝ NGAY
          </button>
        </form>
      </div>
    </section>
  )
}
