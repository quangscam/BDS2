'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Home, Building2, Newspaper, Info, Phone } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'TRANG CHỦ', icon: Home },
    { href: '/projects', label: 'DỰ ÁN', icon: Building2 },
    { href: '/news', label: 'TIN TỨC', icon: Newspaper },
    { href: '/about', label: 'GIỚI THIỆU', icon: Info },
    { href: '/contact', label: 'LIÊN HỆ', icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#8B4513' }}>
            CENTRE POINT
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 hover:transition-colors font-medium"
                  style={{ color: '#666' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#D4AF37'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#666'
                  }}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-block text-white px-6 py-2 rounded font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#8B4513' }}
            >
              ĐĂNG KÝ
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: '#8B4513' }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:transition-colors font-medium rounded"
                  style={{ color: '#666' }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full text-white px-4 py-2 rounded font-semibold mt-2"
              style={{ backgroundColor: '#8B4513' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone size={18} />
              ĐĂNG KÝ
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
