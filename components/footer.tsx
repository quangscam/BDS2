export function Footer() {
  return (
    <footer className="bg-foreground text-foreground-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">ARTIFACT</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Curating exceptional residential developments for discerning investors and homeowners.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Information</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <p className="text-white/70 text-sm mb-3">
              Email: <a href="mailto:contact@artifact.com" className="hover:text-white transition-colors">contact@artifact.com</a>
            </p>
            <p className="text-white/70 text-sm mb-3">
              Phone: <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
            </p>
            <p className="text-white/70 text-sm">
              Hours: Mon - Fri, 9AM - 6PM
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">
              © 2024 Artifact Properties. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-4 md:mt-0">
              Crafting exceptional real estate experiences
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
