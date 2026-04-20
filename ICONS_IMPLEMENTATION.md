# Icon Implementation Guide - CENTRE POINT Website

## Overview
All icons have been integrated using **lucide-react** library. This guide documents all icon implementations across the CENTRE POINT website.

## Icons Installed
- lucide-react v0.564.0

## Icon Usage by Component

### 1. Header Component (`/components/header.tsx`)
**Navigation Menu Icons:**
- 🏠 **Home** → `Home` (size: 18px)
- 🏢 **Projects** → `Building2` (size: 18px)
- 📰 **News** → `Newspaper` (size: 18px)
- ℹ️ **About** → `Info` (size: 18px)
- 📞 **Contact** → `Phone` (size: 18px)

**Desktop Navigation:** Icons appear before menu labels
**Mobile Navigation:** Icons appear before menu labels with adjusted spacing
**Register Button:** Phone icon in mobile menu

---

### 2. Hero Section (`/components/hero.tsx`)
**Call-to-Action Buttons:**
- **KHÁM PHÁ DỰ ÁN** → `Building2` (size: 20px)
  - Route: `/projects`
  - Color: White text on #8B4513 background
  
- **ĐẶT LỊCH TOUR** → `Calendar` (size: 20px)
  - Route: `/contact`
  - Color: White text on #C41E3A background

---

### 3. Featured Projects Component (`/components/featured-projects.tsx`)
**Project Cards:**
- **CHI TIẾT DỰ ÁN** → `ArrowRight` (size: 18px)
  - Appears inline with text
  - Color: #C41E3A
  - Route: `/projects/[id]`

---

### 4. News Section Component (`/components/news-section.tsx`)
**News Articles:**
- **Đọc thêm** → `ArrowRight` (size: 18px)
  - Appears inline with text
  - Color: #C41E3A
  - Route: `/news/[id]`

---

### 5. Projects List Page (`/app/projects/page.tsx`)
**Project Cards:**
- **CHI TIẾT** → `ArrowRight` (size: 18px)
  - Color: #C41E3A

**Pagination:**
- **Trước** (Previous) → `ChevronLeft` (size: 18px)
- **Tiếp** (Next) → `ChevronRight` (size: 18px)

---

### 6. Contact Page (`/app/contact/page.tsx`)
**Form Button:**
- **GỬI TIN NHẮN** (Send Message) → `Send` (size: 20px)
  - Color: White on #8B4513 background

**Quick Links Section:**
- **Gọi ngay** (Call Now) → `Phone` (size: 24px, color: #8B4513)
- **Gửi Email** (Send Email) → `Mail` (size: 24px, color: #8B4513)
- **WhatsApp** (Chat) → `MessageSquare` (size: 24px, color: #8B4513)
- **Xem dự án** (View Projects) → `Building2` (size: 24px, color: #8B4513)

---

### 7. Footer Component (`/components/footer.tsx`)
**Navigation Links (Liên kết nhanh):**
- Trang chủ → `Home` (size: 16px)
- Dự án → `Building2` (size: 16px)
- Tin tức → `Newspaper` (size: 16px)
- Giới thiệu → `Info` (size: 16px)
- Liên hệ → `Phone` (size: 16px)

**Contact Information:**
- Email → `Mail` (size: 16px)
- Phone → `Phone` (size: 16px)
- Location/Hours → `MapPin` (size: 16px)

---

## Icon Sizing Standards

| Context | Size |
|---------|------|
| Menu Items | 18px |
| Hero Buttons | 20px |
| Card Details | 18px |
| Pagination | 18px |
| Contact Form Button | 20px |
| Quick Links | 24px |
| Footer Links | 16px |

---

## Color Usage

| Color | Use Case |
|-------|----------|
| #8B4513 (Burgundy) | Contact quick links, primary actions |
| #C41E3A (Red) | Secondary CTAs, "Read more" links |
| #D4AF37 (Gold) | Accent elements, tags |
| White | Header buttons, hero buttons |
| Gray (#666) | Navigation text (changes to gold on hover) |

---

## Icon Alignment & Spacing

- **Flex Layout:** All icons use `flex items-center gap-X` for proper alignment
- **Gap Sizes:**
  - Menu items: `gap-2` (8px)
  - Buttons: `gap-2` (8px)
  - Footer links: `gap-2` (8px)
  - Contact quick links: `gap-3` (12px)

---

## Responsive Behavior

- **Desktop:** All icons visible with labels
- **Mobile/Tablet:** Icons scale appropriately and maintain alignment
- **Menu:** Mobile menu shows icons with same styling as desktop

---

## Future Icon Additions

When adding new icons, follow these standards:
1. Import from `lucide-react`
2. Set appropriate size (18px, 20px, or 24px based on context)
3. Use consistent colors from the palette
4. Maintain flex alignment with `gap-X` spacing
5. Update this document

---

## Icon Library Documentation
For additional icons, visit: https://lucide.dev
