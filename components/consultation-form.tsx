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
    <section className="py-20" style={{ backgroundColor: '#B03A2E' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Dang ky tu van</h2>
          <p className="text-lg opacity-90">
            Hay de lai thong tin cua ban, chung toi se lien he trong thoi gian som nhat co the
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white font-semibold mb-2">
              Ho va ten
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhap ho va ten cua ban"
              className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#C9A84C' } as React.CSSProperties}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-white font-semibold mb-2">
                So dien thoai
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhap so dien thoai"
                className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#C9A84C' } as React.CSSProperties}
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
                placeholder="Nhap email cua ban"
                className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#C9A84C' } as React.CSSProperties}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-white font-semibold mb-2">
              Loi nhan
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Nhap loi nhan cua ban"
              rows={5}
              className="w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#C9A84C' } as React.CSSProperties}
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 rounded font-bold text-lg transition-colors duration-200"
            style={{ backgroundColor: '#C9A84C', color: '#5D4E4E' }}
          >
            Dang ky ngay
          </button>
        </form>
      </div>
    </section>
  )
}
