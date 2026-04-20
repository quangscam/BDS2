'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const newsArticles = [
  {
    id: 1,
    title: 'Xu huong thi truong bat dong san 2025: Co hoi va thach thuc',
    category: 'Thi truong',
    date: '15/04/2025',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
  },
  {
    id: 2,
    title: 'Bi quyet chon can ho dau tien cho gia dinh tre',
    category: 'Huong dan',
    date: '10/04/2025',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80',
  },
  {
    id: 3,
    title: 'HappyHouse ra mat du an Riverside Elite - Diem nhan ben song',
    category: 'Du an',
    date: '05/04/2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
  },
]

function NewsCard({ article, index }: { article: typeof newsArticles[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <article 
      ref={ref}
      className={`bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transform: isHovered ? 'translateY(-6px)' : isVisible ? 'translateY(0)' : 'translateY(30px)',
        boxShadow: isHovered ? '0 10px 30px rgba(176, 58, 46, 0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold px-3 py-1 rounded" style={{ backgroundColor: '#C9A84C', color: '#5D4E4E' }}>
            {article.category}
          </span>
          <span className="text-sm" style={{ color: '#8A7D7D' }}>{article.date}</span>
        </div>
        <Link href={`/news/${article.id}`}>
          <h3 className="text-lg font-bold mb-4 line-clamp-3 transition-colors" style={{ color: '#5D4E4E' }}>
            {article.title}
          </h3>
        </Link>
        <Link 
          href={`/news/${article.id}`} 
          className="flex items-center gap-1 font-semibold transition-colors"
          style={{ color: '#B03A2E' }}
        >
          Doc them <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  )
}

export function NewsSection() {
  return (
    <section id="news" className="py-20" style={{ backgroundColor: '#F5F0EB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#5D4E4E' }}>Tin tuc & Thi truong</h2>
          <p className="text-lg" style={{ color: '#8A7D7D' }}>
            Cap nhat thong tin moi nhat ve thi truong bat dong san va cac du an cua chung toi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/news" 
            className="inline-block px-8 py-3 rounded font-semibold transition-colors duration-200 text-white"
            style={{ backgroundColor: '#B03A2E' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7B241C'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#B03A2E'
            }}
          >
            Xem tat ca tin tuc
          </a>
        </div>
      </div>
    </section>
  )
}
