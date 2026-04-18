import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            ARTIFACT
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#projects" className="text-foreground hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#practice" className="text-foreground hover:text-primary transition-colors">
              Practice
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Inquire
          </button>
        </div>
      </div>
    </header>
  )
}
