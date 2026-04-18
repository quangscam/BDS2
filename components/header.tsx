import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#8B4513' }}>
            CENTRE POINT
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              TRANG CHỦ
            </Link>
            <Link href="#projects" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              DỰ ÁN
            </Link>
            <Link href="#news" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              TIN TỨC
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              LIÊN HỆ
            </Link>
          </nav>
          <button className="text-white px-6 py-2 rounded transition-opacity font-semibold" style={{ backgroundColor: '#8B4513' }}>
            ĐĂNG KÝ
          </button>
        </div>
      </div>
    </header>
  )
}
