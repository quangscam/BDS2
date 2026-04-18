# CENTRE POINT - UI Standards & Component Guide

## Navigation Menu Synchronization

### Header Navigation Links
All pages use the same header component with consistent navigation:

```
TRANG CHỦ (Home: /)
DỰ ÁN (Projects: /projects)
TIN TỨC (News: /news)
GIỚI THIỆU (About: /about)
LIÊN HỆ (Contact: /contact)
```

**Features:**
- Mobile hamburger menu with expandable navigation
- Hover effects with gold (#D4AF37) color on desktop
- Responsive design that collapses on mobile devices
- "ĐĂNG KÝ" (Register) button always visible as CTA

### Footer Navigation
All pages include the same footer with synchronized links:

**Quick Links Section:**
- Trang chủ (Home)
- Dự án (Projects)
- Tin tức (News)
- Giới thiệu (About)
- Liên hệ (Contact)

**Information Section:**
- Chính sách bảo mật (Privacy Policy)
- Điều khoản dịch vụ (Terms of Service)
- Câu hỏi thường gặp (FAQ)
- Hỗ trợ (Support)

**Contact Section:**
- Email: contact@centrepoint.com
- Phone: +84 (123) 456-789
- Hours: T2 - T6, 9AM - 6PM

---

## Color Scheme (Consistent Across Website)

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Brown | #8B4513 | Main buttons, links, branding |
| Secondary Red | #C41E3A | Alert buttons, CTAs |
| Accent Gold | #D4AF37 | Tags, accents, highlights |
| Dark Gray | #2D2D2D | Text, backgrounds |
| Light Background | #FAFAF9 | Page backgrounds |
| Border Gray | #E0E0E0 | Borders, dividers |

---

## Button Styles

### Primary Button
- Background: #8B4513 (Burgundy)
- Text: White
- Classes: `text-white px-6 py-3 rounded font-semibold transition-opacity hover:opacity-90`
- Usage: Main CTAs (Explore Projects, Contact, Register)

### Secondary Button
- Background: #C41E3A (Dark Red)
- Text: White
- Classes: `text-white px-6 py-3 rounded font-semibold transition-opacity hover:opacity-90`
- Usage: Alternative actions, alerts, special CTAs

### Accent Button
- Background: #D4AF37 (Gold)
- Text: #2D2D2D (Dark Gray)
- Classes: `text-sm font-semibold px-3 py-1 rounded`
- Usage: Tags, badges, secondary actions

### Large Button
- Background: #8B4513 (Burgundy)
- Text: White
- Classes: `text-white px-8 py-4 rounded text-lg font-semibold transition-opacity hover:opacity-90`
- Usage: Hero section CTAs, main action buttons

### Small Button
- Background: #8B4513 (Burgundy)
- Text: White
- Classes: `text-white px-4 py-2 rounded text-sm font-semibold transition-opacity hover:opacity-90`
- Usage: Inline actions, filter buttons

---

## Navigation Structure

### Homepage (/)
- Hero Section with dual CTAs
  - Primary: "KHÁM PHÁ DỰ ÁN" → /projects
  - Secondary: "ĐẶT LỊCH TOUR" → /contact
- Featured Projects Section
  - Project cards link to `/projects/[id]`
  - "XEM TẤT CẢ DỰ ÁN" → /projects
- News Section
  - Articles link to `/news/[id]`
- Consultation Form Section

### Projects Page (/projects)
- List all projects with filters
- Each project card links to `/projects/[id]`
- Filter controls reset properly
- Pagination working

### Project Detail (/projects/[id])
- Full project information
- Booking modal with contact form
- Related projects section
- Back to projects button

### News Page (/news)
- List all articles with search & filtering
- Article links to `/news/[id]`
- Pagination working

### News Detail (/news/[id])
- Full article content
- Related articles section
- Links back to news page

### About Page (/about)
- Company information
- Team section
- Timeline
- CTAs linking to projects and contact

### Contact Page (/contact)
- Contact form (primary)
- Office locations
- Quick contact links (phone, email, WhatsApp)
- FAQ section
- Map placeholder

### Category Pages
- **Areas:** `/areas/[area]` (Quận 1-9)
- **Property Types:** `/property-types/[type]` (Căn hộ, Shophouse, Nhà phố)
- SEO-optimized with relevant filters

---

## Text Styling

### Headings
- H1: `text-4xl md:text-5xl font-bold text-gray-900`
- H2: `text-3xl md:text-4xl font-bold text-gray-900`
- H3: `text-2xl font-bold text-gray-900`
- H4: `text-lg font-bold text-gray-900`

### Body Text
- Standard: `text-gray-700 leading-relaxed`
- Muted: `text-gray-600`
- Small: `text-sm text-gray-500`

### Links
- Default: `text-gray-700 hover:text-yellow-600 transition-colors`
- Header: Font weight medium with gold hover
- Footer: `text-white/70 hover:text-yellow-400 transition-colors`

---

## Form Styling

### Input Fields
```
w-full px-4 py-3 border border-gray-300 rounded-lg
focus:outline-none focus:ring-2 focus:ring-yellow-500
placeholder-gray-500
```

### Labels
```
block text-sm font-semibold text-gray-900 mb-2
```

### Submit Buttons
```
w-full py-3 rounded text-white font-semibold
transition-opacity hover:opacity-90
style={{ backgroundColor: '#8B4513' }}
```

---

## Mobile Responsiveness

### Breakpoints Used
- **Mobile:** Default (< 640px)
- **Tablet:** `md:` (≥ 768px)
- **Desktop:** `lg:` (≥ 1024px)

### Key Responsive Features
- Header navigation collapses to hamburger menu on mobile
- Sidebar filters hide on mobile, shown as filters on desktop
- Grid layouts adjust from 1 column (mobile) → 2 columns (tablet) → 3+ columns (desktop)
- Text sizes scale appropriately for readability

---

## Implementation Checklist

- ✅ Header with mobile menu support
- ✅ Synchronized footer across all pages
- ✅ Consistent button styling throughout
- ✅ Color scheme applied everywhere
- ✅ Navigation links functional
- ✅ Responsive design on all breakpoints
- ✅ Form styling consistent
- ✅ Typography hierarchy established
- ✅ Hover effects consistent
- ✅ Accessibility considerations (semantic HTML, ARIA)

---

## Notes

- All color references use inline `style` prop for flexibility
- Components use Next.js `Link` for client-side navigation
- Mobile menu uses React hooks for state management
- Forms include proper validation and submission handling
- All external links use standard `<a>` tags
