'use client'

export default function PhoneButton() {
  return (
    <div className="fixed bottom-24 right-6 z-50 group flex items-center">
      <span
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-3 px-3 py-2 rounded text-sm font-medium whitespace-nowrap shadow-md"
        style={{ backgroundColor: '#333', color: 'white' }}
      >
        Gọi Ngay
      </span>
      <a
        href="tel:0986514242"
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
        style={{ backgroundColor: '#B03A2E' }}
        aria-label="Gọi điện thoại"
      >
        {/* Đã cập nhật sang Icon Điện Thoại chuẩn dùng nét vẽ stroke */}
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  )
}