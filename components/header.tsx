'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Home, Building2, Newspaper, Info, Phone } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Trang chu', icon: Home },
    { href: '/projects', label: 'Du an', icon: Building2 },
    { href: '/news', label: 'Tin tuc', icon: Newspaper },
    { href: '/about', label: 'Ve HappyHouse', icon: Info },
    { href: '/contact', label: 'Lien he', icon: Phone },
  ]

  return (
    <header 
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? '#FFFFFF' : 'transparent',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: isScrolled ? '1px solid #E8D7CF' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#B03A2E' }}>
            HappyHouse
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 font-medium transition-colors duration-200"
                  style={{ color: isScrolled ? '#5D4E4E' : '#FFFFFF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#B03A2E'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isScrolled ? '#5D4E4E' : '#FFFFFF'
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
              className="hidden sm:inline-block text-white px-6 py-2 rounded font-semibold transition-colors duration-200"
              style={{ backgroundColor: '#B03A2E' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7B241C'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B03A2E'
              }}
            >
              Dang ky
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: isScrolled ? '#B03A2E' : '#FFFFFF' }}
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
          <nav className="md:hidden pb-4 space-y-2" style={{ backgroundColor: '#FFFFFF' }}>
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2 font-medium rounded transition-colors duration-200"
                  style={{ color: '#5D4E4E' }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F5F0EB'
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
              className="flex items-center justify-center gap-2 w-full text-white px-4 py-2 rounded font-semibold mt-2 transition-colors duration-200"
              style={{ backgroundColor: '#B03A2E' }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7B241C'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B03A2E'
              }}
            >
              <Phone size={18} />
              Dang ky
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
