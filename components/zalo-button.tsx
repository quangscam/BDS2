'use client'

import { useState } from 'react'

export function ZaloButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <a
      href="https://zalo.me/yourphonenumber"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
      style={{ backgroundColor: '#0068FF' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      aria-label="Chat Zalo"
    >
      {/* Zalo Icon */}
      <svg
        viewBox="0 0 48 48"
        className="w-8 h-8"
        fill="white"
      >
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm9.89 30.77H14.11c-.72 0-1.32-.6-1.32-1.32 0-.36.15-.7.4-.95l14.77-16.55c.44-.5.4-1.27-.1-1.71-.21-.18-.47-.28-.75-.28H14.56c-.72 0-1.32-.6-1.32-1.32 0-.72.6-1.32 1.32-1.32h18.96c.72 0 1.32.6 1.32 1.32 0 .36-.15.7-.4.95L20.67 30.14c-.44.5-.4 1.27.1 1.71.21.18.47.28.75.28h12.37c.72 0 1.32.6 1.32 1.32 0 .72-.6 1.32-1.32 1.32z"/>
      </svg>
      
      {/* Tooltip */}
      {showTooltip && (
        <span 
          className="absolute right-full mr-3 px-3 py-2 rounded text-sm font-medium whitespace-nowrap shadow-md"
          style={{ backgroundColor: '#333', color: 'white' }}
        >
          Chat Zalo
        </span>
      )}
    </a>
  )
}
