'use client'

const newsArticles = [
  {
    id: 1,
    title: 'Mua bán nhà phố thương mại tại khu vực trung tâm',
    category: 'Thị trường',
    date: '15/04/2024',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
  },
  {
    id: 2,
    title: 'Khu nhà phố thương mại hiện đại với tiện ích đầy đủ',
    category: 'Dự án',
    date: '10/04/2024',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80',
  },
  {
    id: 3,
    title: 'Biệt thự phố thương mại - Xu hướng đầu tư năm 2024',
    category: 'Đầu tư',
    date: '05/04/2024',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
  },
]

export function NewsSection() {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">TIN TỨC & THỊ TRƯỜNG</h2>
          <p className="text-lg text-gray-600">
            Cập nhật thông tin mới nhất về thị trường bất động sản và các dự án của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold px-3 py-1 rounded" style={{ backgroundColor: '#D4AF37', color: '#2D2D2D' }}>
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-3 hover:text-gray-700 cursor-pointer">
                  {article.title}
                </h3>
                <button className="font-semibold transition-colors" style={{ color: '#C41E3A' }}>
                  Đọc thêm →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
