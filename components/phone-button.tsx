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
        <svg viewBox="0 0 48 48" width="28" height="28" fill="white">
          <path d="M37.3 47H10.7C5.1 47 1 42.9 1 37.3V10.7C1 5.1 5.1 1 10.7 1h26.6C42.9 1 47 5.1 47 10.7v26.6c0 5.6-4.1 9.7-9.7 9.7zm-16.2-8h16.2c4.1 0 7.7-3.5 7.7-7.7V10.7c0-4.1-3.5-7.7-7.7-7.7H10.7c-4.1 0-7.7 3.5-7.7 7.7v26.6c0 4.1 3.5 7.7 7.7 7.7zM24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12zm0-20c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" />
        </svg>
      </a>
    </div>
  )
}
