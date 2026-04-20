'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import Link from 'next/link'

const allArticles = [
  {
    id: 1,
    title: 'Thị trường bất động sản TP.HCM tăng trưởng mạnh trong năm 2024',
    excerpt: 'Theo báo cáo mới nhất, giá bất động sản tại TP.HCM đã tăng trưởng 15% so với năm trước đó.',
    content: 'Thị trường bất động sản tại TP.HCM đang chứng kiến một giai đoạn tăng trưởng mạnh mẽ. Với sự phát triển của hạ tầng giao thông, những dự án bất động sản mới liên tục ra mắt, thu hút các nhà đầu tư trong nước và quốc tế. Giá nhà đất tại các quận trung tâm đã tăng đáng kể, đặc biệt là ở các khu vực phát triển mới như Quận 2, Quận 7, Quận 9.',
    category: 'Tin Thị trường',
    date: '2024-04-15',
    author: 'Nguyễn Văn A',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    readTime: '5 phút',
  },
  {
    id: 2,
    title: 'Hướng dẫn lựa chọn dự án bất động sản phù hợp cho gia đình',
    excerpt: 'Cách lựa chọn dự án bất động sản phù hợp với nhu cầu và ngân sách của gia đình.',
    content: 'Lựa chọn dự án bất động sản là quyết định quan trọng của mỗi gia đình. Trước tiên, bạn cần xác định rõ nhu cầu của gia đình: đó là nơi để sống, cho thuê, hay đầu tư lâu dài. Sau đó, hãy cân nhắc vị trí, quy mô dự án, tiện ích, chi phí bảo trì, và tỷ lệ lợi nhuận kỳ vọng.',
    category: 'Hướng dẫn',
    date: '2024-04-10',
    author: 'Trần Thị B',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
    readTime: '8 phút',
  },
  {
    id: 3,
    title: 'Xu hướng thiết kế căn hộ hiện đại năm 2024',
    excerpt: 'Khám phá những xu hướng thiết kế nội thất và kiến trúc mới nhất cho căn hộ hiện đại.',
    content: 'Năm 2024, các xu hướng thiết kế căn hộ đang thay đổi hướng tới sự tối giản, bền vững và công nghệ thông minh. Màu sắc trung tính, vật liệu tự nhiên, và không gian mở là những yếu tố chủ yếu. Công nghệ nhà thông minh, hệ thống lọc không khí tiên tiến, và nội thất linh hoạt cũng trở thành những tiêu chuẩn của căn hộ cao cấp.',
    category: 'Thiết kế',
    date: '2024-04-05',
    author: 'Lê Văn C',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    readTime: '6 phút',
  },
  {
    id: 4,
    title: 'Lợi suất đầu tư bất động sản: Điểm số toàn cầu so sánh',
    excerpt: 'Phân tích chi tiết lợi suất đầu tư bất động sán ở các thành phố lớn trên thế giới.',
    content: 'Đầu tư bất động sản tại các thành phố lớn trên thế giới mang lại lợi suất khác nhau. TP.HCM hiện đang nằm ở giữa bảng xếp hạng, với lợi suất khoảng 8-10% mỗi năm. So với Singapore, Bangkok hay Hong Kong, TP.HCM cung cấp cơ hội đầu tư với rủi ro thấp hơn nhưng tiềm năng tăng trưởng cao.',
    category: 'Đầu tư',
    date: '2024-03-28',
    author: 'Phạm Thị D',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    readTime: '7 phút',
  },
  {
    id: 5,
    title: 'CENTRE POINT hoàn thành giai đoạn 1 xây dựng',
    excerpt: 'Dự án CENTRE POINT đã hoàn thành giai đoạn 1 xây dựng với tiến độ vượt kế hoạch.',
    content: 'CENTRE POINT, dự án bất động sản cao cấp của CENTRE GROUP, đã hoàn thành giai đoạn 1 xây dựng với tiến độ vượt kế hoạch 20%. Với hơn 10,000 nhân công tham gia, dự án đã sử dụng công nghệ xây dựng tiên tiến để đảm bảo chất lượng cao nhất.',
    category: 'Tin Dự án',
    date: '2024-03-20',
    author: 'Nguyễn Văn A',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    readTime: '4 phút',
  },
  {
    id: 6,
    title: 'Chính sách hỗ trợ tài chính mới cho nhà đầu tư bất động sản',
    excerpt: 'Chính phủ công bố chính sách hỗ trợ tài chính mới nhằm khuyến khích đầu tư bất động sản.',
    content: 'Chính phủ vừa công bố gói chính sách hỗ trợ tài chính mới nhằm khuyến khích đầu tư bất động sản tại các khu vực phát triển. Gói chính sách này bao gồm giảm lãi suất vay, miễn một số loại thuế, và tăng thời hạn vay lên 25 năm.',
    category: 'Chính sách',
    date: '2024-03-15',
    author: 'Trần Thị B',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=800&q=80',
    readTime: '6 phút',
  },
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  const categories = ['Tin Thị trường', 'Hướng dẫn', 'Thiết kế', 'Đầu tư', 'Tin Dự án', 'Chính sách']

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchCategory = !selectedCategory || article.category === selectedCategory
      const matchSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredArticles, currentPage])

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="bg-white py-12 border-b border-gray-200" ref={titleRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative transition-all duration-500 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute left-0 top-0 w-1 h-20 rounded" style={{ backgroundColor: '#B03A2E' }}></div>
            <div className="pl-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">TIN TỨC & <span style={{ color: '#B03A2E' }}>INSIGHTS</span></h1>
              <p className="text-lg text-gray-600">Cập nhật thông tin thị trường bất động sản và những xu hướng mới nhất</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6 bg-gray-50 p-6 rounded-lg">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Tìm kiếm</label>
                  <input
                    type="text"
                    placeholder="Tìm bài viết..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Danh mục</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={null}
                        checked={selectedCategory === null}
                        onChange={() => {
                          setSelectedCategory(null)
                          setCurrentPage(1)
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Tất cả</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={() => {
                            setSelectedCategory(category)
                            setCurrentPage(1)
                          }}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSearchQuery('')
                    setCurrentPage(1)
                  }}
                  className="w-full py-2 rounded text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#C41E3A' }}
                >
                  ĐẶT LẠI
                </button>
              </div>
            </div>

            {/* Articles */}
            <div className="lg:col-span-3">
              {paginatedArticles.length > 0 ? (
                <>
                  <div className="space-y-8 mb-12">
                    {paginatedArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/news/${article.id}`}
                        className="group flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <div className="h-48 md:h-auto md:w-64 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <span
                                className="text-xs font-semibold px-3 py-1 rounded text-white"
                                style={{ backgroundColor: '#8B4513' }}
                              >
                                {article.category}
                              </span>
                              <span className="text-xs text-gray-600">{article.readTime}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:underline mb-3">{article.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{article.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{article.author}</span>
                              <span>•</span>
                              <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <span className="font-semibold" style={{ color: '#C41E3A' }}>
                              ĐỌC TIẾP →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      {currentPage > 1 && (
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Trước
                        </button>
                      )}

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page ? 'text-white' : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                          style={currentPage === page ? { backgroundColor: '#8B4513' } : {}}
                        >
                          {page}
                        </button>
                      ))}

                      {currentPage < totalPages && (
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Tiếp
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Không tìm thấy bài viết phù hợp.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
