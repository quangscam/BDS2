'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'

const articlesData: Record<number, any> = {
  1: {
    id: 1,
    title: 'Thị trường bất động sản TP.HCM tăng trưởng mạnh trong năm 2024',
    excerpt: 'Theo báo cáo mới nhất, giá bất động sản tại TP.HCM đã tăng trưởng 15% so với năm trước đó.',
    category: 'Tin Thị trường',
    date: '2024-04-15',
    author: 'Nguyễn Văn A',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&q=80',
    readTime: '5 phút',
    content: `
      <h2>Thị trường bất động sản TP.HCM tăng trưởng mạnh trong năm 2024</h2>
      
      <p>Thị trường bất động sản tại TP.HCM đang chứng kiến một giai đoạn tăng trưởng mạnh mẽ. Với sự phát triển của hạ tầng giao thông, những dự án bất động sản mới liên tục ra mắt, thu hút các nhà đầu tư trong nước và quốc tế. Giá nhà đất tại các quận trung tâm đã tăng đáng kể, đặc biệt là ở các khu vực phát triển mới như Quận 2, Quận 7, Quận 9.</p>

      <h3>Những yếu tố đúc kết tăng trưởng</h3>

      <p>Sự tăng trưởng này được hỗ trợ bởi nhiều yếu tố tích cực:</p>

      <ul>
        <li><strong>Phát triển hạ tầng:</strong> Metro Line 1 và Metro Line 2 sắp hoàn thành, kết nối các quận xa với khu trung tâm thành phố.</li>
        <li><strong>Nước ngoài FDI:</strong> Các nhà đầu tư nước ngoài tăng cường đầu tư vào bất động sản TP.HCM.</li>
        <li><strong>Tính thanh khoản cao:</strong> Giá trị giao dịch bất động sản tăng gấp đôi so với năm 2022.</li>
        <li><strong>Chính sách hỗ trợ:</strong> Chính phủ công bố gói chính sách khuyến khích đầu tư.</li>
      </ul>

      <h3>Triển vọng tương lai</h3>

      <p>Các chuyên gia nhìn nhận rằng, thị trường bất động sản TP.HCM sẽ tiếp tục tăng trưởng trong những năm tới. Với những dự án lớn sắp hoàn thành và nhu cầu nhà ở tăng cao, giá bất động sản dự kiến sẽ tiếp tục tăng.</p>

      <p>Tuy nhiên, các chuyên gia cũng khuyến cáo rằng, các nhà đầu tư cần cẩn trọng khi lựa chọn dự án, tập trung vào những dự án có vị trí tốt, uy tín của chủ đầu tư, và tiềm năng tăng giá lâu dài.</p>
    `,
  },
  2: {
    id: 2,
    title: 'Hướng dẫn lựa chọn dự án bất động sản phù hợp cho gia đình',
    excerpt: 'Cách lựa chọn dự án bất động sản phù hợp với nhu cầu và ngân sách của gia đình.',
    category: 'Hướng dẫn',
    date: '2024-04-10',
    author: 'Trần Thị B',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=1000&q=80',
    readTime: '8 phút',
    content: `
      <h2>Hướng dẫn lựa chọn dự án bất động sản phù hợp cho gia đình</h2>
      
      <p>Lựa chọn dự án bất động sản là quyết định quan trọng của mỗi gia đình. Đây không chỉ là một khoản đầu tư lớn mà còn ảnh hưởng trực tiếp đến chất lượng cuộc sống của gia đình bạn. Trong bài viết này, chúng tôi sẽ hướng dẫn bạn từng bước lựa chọn dự án phù hợp.</p>

      <h3>Bước 1: Xác định nhu cầu</h3>

      <p>Trước tiên, bạn cần xác định rõ nhu cầu của gia đình:</p>

      <ul>
        <li><strong>Sống:</strong> Bạn cần một nơi để sống với gia đình</li>
        <li><strong>Cho thuê:</strong> Bạn muốn đầu tư để cho thuê</li>
        <li><strong>Đầu tư dài hạn:</strong> Bạn muốn tăng giá trị tài sản theo thời gian</li>
      </ul>

      <h3>Bước 2: Cân nhắc các yếu tố quan trọng</h3>

      <p>Khi xem xét dự án, hãy chú ý đến các yếu tố sau:</p>

      <ul>
        <li><strong>Vị trí:</strong> Gần trường học, bệnh viện, siêu thị, và giao thông công cộng</li>
        <li><strong>Quy mô dự án:</strong> Số lượng căn hộ, tiện ích, chất lượng xây dựng</li>
        <li><strong>Tiện ích:</strong> Bể bơi, gym, công viên, an ninh 24/7</li>
        <li><strong>Chi phí bảo trì:</strong> Phí quản lý, phí dịch vụ hàng tháng</li>
        <li><strong>Tỷ lệ lợi nhuận:</strong> Dự kiến giá trị tăng lên theo thời gian</li>
      </ul>

      <h3>Bước 3: Kiểm tra uy tín của chủ đầu tư</h3>

      <p>Hãy tìm hiểu về uy tín của chủ đầu tư qua:</p>

      <ul>
        <li>Các dự án trước đó của công ty</li>
        <li>Đánh giá từ khách hàng</li>
        <li>Tình hình tài chính của công ty</li>
        <li>Thời gian hoàn thành dự án</li>
      </ul>

      <h3>Kết luận</h3>

      <p>Lựa chọn dự án bất động sản phù hợp yêu cầu sự cân nhắc kỹ lưỡng. Hãy dành thời gian để so sánh các dự án, tham khảo ý kiến của chuyên gia, và đưa ra quyết định dựa trên nhu cầu thực tế của gia đình bạn.</p>
    `,
  },
  3: {
    id: 3,
    title: 'Xu hướng thiết kế căn hộ hiện đại năm 2024',
    excerpt: 'Khám phá những xu hướng thiết kế nội thất và kiến trúc mới nhất cho căn hộ hiện đại.',
    category: 'Thiết kế',
    date: '2024-04-05',
    author: 'Lê Văn C',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80',
    readTime: '6 phút',
    content: `
      <h2>Xu hướng thiết kế căn hộ hiện đại năm 2024</h2>
      
      <p>Năm 2024, các xu hướng thiết kế căn hộ đang thay đổi hướng tới sự tối giản, bền vững và công nghệ thông minh. Hãy khám phá những xu hướng mới nhất mà bạn sẽ gặp trong các dự án cao cấp.</p>

      <h3>1. Thiết kế tối giản và không gian mở</h3>

      <p>Các căn hộ hiện đại ngày nay ưu tiên không gian mở, loại bỏ những bức tường không cần thiết. Điều này tạo cảm giác rộng rãi hơn và cho phép ánh sáng tự nhiên truyền xuyên suốt.</p>

      <h3>2. Màu sắc trung tính và vật liệu tự nhiên</h3>

      <p>Thay vì các màu sắc rực rỡ, các thiết kế mới sử dụng những tông màu trung tính như trắng, xám, be, kết hợp với vật liệu tự nhiên như gỗ, đá, và bê tông.</p>

      <h3>3. Công nghệ nhà thông minh</h3>

      <p>Hệ thống điều khiển thông minh, chiếu sáng tự động, và các thiết bị IoT ngày càng phổ biến trong các căn hộ cao cấp.</p>

      <h3>4. Cân nhắc bền vững</h3>

      <p>Các dự án mới ngày nay quan tâm đến tính bền vững, sử dụng vật liệu thân thiện với môi trường và công nghệ tiết kiệm năng lượng.</p>

      <h3>5. Nội thất linh hoạt</h3>

      <p>Nội thất đa chức năng, có thể biến đổi tùy theo nhu cầu, trở thành một yếu tố quan trọng trong các căn hộ nhỏ.</p>

      <h3>Kết luận</h3>

      <p>Xu hướng thiết kế căn hộ năm 2024 tập trung vào sự cân bằng giữa tính thẩm mỹ, công năng, và bền vững. Những dự án mới ngày nay không chỉ tạo ra không gian sống đẹp mà còn thân thiện với môi trường.</p>
    `,
  },
  4: {
    id: 4,
    title: 'Lợi suất đầu tư bất động sản: Điểm số toàn cầu so sánh',
    excerpt: 'Phân tích chi tiết lợi suất đầu tư bất động sán ở các thành phố lớn trên thế giới.',
    category: 'Đầu tư',
    date: '2024-03-28',
    author: 'Phạm Thị D',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80',
    readTime: '7 phút',
    content: `
      <h2>Lợi suất đầu tư bất động sản: Điểm số toàn cầu so sánh</h2>
      
      <p>Đầu tư bất động sản tại các thành phố lớn trên thế giới mang lại lợi suất khác nhau. Hãy cùng chúng tôi phân tích chi tiết lợi suất ở các thành phố chủ chốt.</p>

      <h3>TP.HCM - Cơ hội tuyệt vời</h3>

      <p>TP.HCM hiện đang nằm ở vị trí tuyệt vời, với lợi suất khoảng 8-10% mỗi năm. So với Singapore, Bangkok hay Hong Kong, TP.HCM cung cấp cơ hội đầu tư với rủi ro thấp hơn nhưng tiềm năng tăng trưởng cao.</p>

      <h3>So sánh với các thành phố khác</h3>

      <ul>
        <li><strong>Singapore:</strong> Lợi suất 4-6%, rủi ro thấp, ổn định</li>
        <li><strong>Bangkok:</strong> Lợi suất 6-8%, tiềm năng tăng trưởng vừa phải</li>
        <li><strong>Hong Kong:</strong> Lợi suất 3-5%, thị trường chưa khởi sắc</li>
        <li><strong>TP.HCM:</strong> Lợi suất 8-10%, tiềm năng tăng trưởng cao</li>
      </ul>

      <h3>Các yếu tố ảnh hưởng</h3>

      <p>Lợi suất đầu tư phụ thuộc vào nhiều yếu tố:</p>

      <ul>
        <li>Phát triển kinh tế của thành phố</li>
        <li>Tốc độ tăng dân số</li>
        <li>Tình hình chính trị và an ninh</li>
        <li>Chính sách tài chính của chính phủ</li>
        <li>Tỷ lệ lạm phát</li>
      </ul>

      <h3>Kết luận</h3>

      <p>TP.HCM là một trong những thành phố hấp dẫn nhất cho nhà đầu tư bất động sản hiện nay. Với tiềm năng tăng trưởng cao và rủi ro tương đối thấp, TP.HCM xứng đáng là lựa chọn hàng đầu cho những nhà đầu tư tìm kiếm lợi suất tốt.</p>
    `,
  },
  5: {
    id: 5,
    title: 'CENTRE POINT hoàn thành giai đoạn 1 xây dựng',
    excerpt: 'Dự án CENTRE POINT đã hoàn thành giai đoạn 1 xây dựng với tiến độ vượt kế hoạch.',
    category: 'Tin Dự án',
    date: '2024-03-20',
    author: 'Nguyễn Văn A',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&q=80',
    readTime: '4 phút',
    content: `
      <h2>CENTRE POINT hoàn thành giai đoạn 1 xây dựng</h2>
      
      <p>CENTRE POINT, dự án bất động sản cao cấp của CENTRE GROUP, đã hoàn thành giai đoạn 1 xây dựng với tiến độ vượt kế hoạch 20%. Với hơn 10,000 nhân công tham gia, dự án đã sử dụng công nghệ xây dựng tiên tiến để đảm bảo chất lượng cao nhất.</p>

      <h3>Những thành tựu nổi bật</h3>

      <ul>
        <li><strong>Hoàn thành 60 phần trăm:</strong> Toàn bộ khung cấu trúc đã hoàn thành</li>
        <li><strong>Chất lượng cao:</strong> Được kiểm định bởi các chuyên gia quốc tế</li>
        <li><strong>An toàn lao động:</strong> Zero tai nạn lao động trong 6 tháng qua</li>
        <li><strong>Tiến độ vượt kế hoạch:</strong> Hoàn thành 20% trước thời hạn</li>
      </ul>

      <h3>Lộ trình tiếp theo</h3>

      <p>Giai đoạn 2 sẽ bao gồm:</p>

      <ul>
        <li>Hoàn thành lợp mái</li>
        <li>Cập nhật các hệ thống cơ điện</li>
        <li>Thi công nội thất</li>
        <li>Kiểm định chất lượng cuối cùng</li>
      </ul>

      <h3>Nhận bàn giao</h3>

      <p>Dự kiến giai đoạn 1 sẽ bàn giao cho cư dân vào quý 4 năm 2024. Các cư dân sắp bàn giao sẽ được hưởng các quyền lợi đặc biệt từ CENTRE GROUP.</p>
    `,
  },
  6: {
    id: 6,
    title: 'Chính sách hỗ trợ tài chính mới cho nhà đầu tư bất động sản',
    excerpt: 'Chính phủ công bố chính sách hỗ trợ tài chính mới nhằm khuyến khích đầu tư bất động sản.',
    category: 'Chính sách',
    date: '2024-03-15',
    author: 'Trần Thị B',
    image: 'https://images.unsplash.com/photo-1512207736139-c586cbf395ad?w=1000&q=80',
    readTime: '6 phút',
    content: `
      <h2>Chính sách hỗ trợ tài chính mới cho nhà đầu tư bất động sản</h2>
      
      <p>Chính phủ vừa công bố gói chính sách hỗ trợ tài chính mới nhằm khuyến khích đầu tư bất động sản tại các khu vực phát triển. Gói chính sách này bao gồm một loạt các biện pháp tích cực để thúc đẩy thị trường bất động sản.</p>

      <h3>Những điểm chính của gói chính sách</h3>

      <ul>
        <li><strong>Giảm lãi suất vay:</strong> Lãi suất vay mua bất động sản được giảm từ 2-3%</li>
        <li><strong>Miễn một số loại thuế:</strong> Miễn thuế chuyển nhượng trong 2 năm đầu</li>
        <li><strong>Tăng thời hạn vay:</strong> Thời hạn vay mua bất động sản tăng từ 20 năm lên 25 năm</li>
        <li><strong>Hỗ trợ cho các gia đình mua lần đầu:</strong> Giảm 5% giá mua cho lần đầu</li>
      </ul>

      <h3>Đối tượng được hưởng lợi</h3>

      <p>Gói chính sách này hướng tới các đối tượng sau:</p>

      <ul>
        <li>Gia đình mua bất động sản lần đầu</li>
        <li>Các nhà đầu tư cá nhân</li>
        <li>Các doanh nghiệp nhỏ và vừa</li>
        <li>Những người có thu nhập thấp</li>
      </ul>

      <h3>Tác động dự kiến</h3>

      <p>Gói chính sách này dự kiến sẽ:</p>

      <ul>
        <li>Tăng nhu cầu mua bất động sản</li>
        <li>Thúc đẩy sự tăng trưởng của thị trường</li>
        <li>Giúp nhiều gia đình có được nhà ở</li>
        <li>Tăng doanh thu cho các doanh nghiệp bất động sản</li>
      </ul>

      <h3>Kết luận</h3>

      <p>Gói chính sách hỗ trợ tài chính mới của chính phủ là một bước đi tích cực để thúc đẩy thị trường bất động sản. Đây là cơ hội tốt cho các nhà đầu tư và những người mong muốn có được một ngôi nhà của riêng mình.</p>
    `,
  },
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const articleId = parseInt(params.id)
  const article = articlesData[articleId]

  if (!article) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Bài viết không tìm thấy</h1>
            <p className="text-gray-600 mb-8">Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link href="/news" className="inline-block px-8 py-3 rounded text-white font-semibold" style={{ backgroundColor: '#8B4513' }}>
              Quay về trang tin tức
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedArticles = Object.values(articlesData)
    .filter((a: any) => a.id !== articleId && a.category === article.category)
    .slice(0, 3)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Article Header */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold px-3 py-1 rounded text-white" style={{ backgroundColor: '#8B4513' }}>
              {article.category}
            </span>
            <span className="text-sm text-gray-600">{article.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{article.author}</span>
            <span>•</span>
            <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-96 md:h-[500px] rounded-lg overflow-hidden bg-gray-200">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/<h2>/g, '<h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">')
                  .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-gray-900 mt-6 mb-3">')
                  .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed">')
                  .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 text-gray-700">')
                  .replace(/<li>/g, '<li class="text-gray-700">')
                  .replace(/<strong>/g, '<strong class="font-bold">')
              }}
            />
          </article>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-50 py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">BÀI VIẾT LIÊN QUAN</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle: any) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.id}`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img src={relatedArticle.image} alt={relatedArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold px-3 py-1 rounded text-white" style={{ backgroundColor: '#8B4513' }}>
                      {relatedArticle.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-3 group-hover:underline line-clamp-2">{relatedArticle.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{new Date(relatedArticle.date).toLocaleDateString('vi-VN')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">QUAN TÂM ĐẾN NHỮNG DỰ ÁN TUYỆT VỜI?</h2>
          <p className="text-lg text-gray-600 mb-8">Khám phá danh sách đầy đủ các dự án bất động sản của chúng tôi.</p>
          <Link
            href="/projects"
            className="inline-block px-10 py-4 rounded text-white font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#8B4513' }}
          >
            KHÁM PHÁ DỰ ÁN
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
