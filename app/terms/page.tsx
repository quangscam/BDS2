'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#FDFAF6]">
      <Header />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-[#E8D7CF]/50">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C1A1A] mb-8 font-serif border-b border-[#E8D7CF] pb-6">
            Điều Khoản Dịch Vụ
          </h1>

          <div className="space-y-8 font-sans text-[#5D4E4E] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                1. Chấp thuận điều khoản
              </h2>
              <p>
                Bằng cách truy cập và sử dụng website HappyHouse, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây. Nếu không đồng ý với bất kỳ nội dung nào, vui lòng ngừng sử dụng website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                2. Mục đích cung cấp thông tin
              </h2>
              <p>
                Website HappyHouse được xây dựng nhằm cung cấp thông tin tham khảo về các dự án bất động sản, bao gồm vị trí, tiện ích, mặt bằng, chính sách bán hàng, giá bán dự kiến và các nội dung tư vấn liên quan.
              </p>
              <p className="mt-4">
                Các thông tin trên website có thể thay đổi theo từng thời điểm và không được xem là cam kết chính thức thay thế cho tài liệu pháp lý, hợp đồng mua bán hoặc thông báo từ chủ đầu tư.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                3. Quyền sở hữu nội dung
              </h2>
              <p>
                Toàn bộ nội dung, hình ảnh, bài viết, bố cục giao diện và tài liệu hiển thị trên website thuộc quyền quản lý hoặc sử dụng hợp pháp của HappyHouse và các bên liên quan.
              </p>
              <p className="mt-4">
                Mọi hành vi sao chép, chỉnh sửa, phân phối hoặc sử dụng lại nội dung trên website cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản đều không được chấp thuận.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                4. Miễn trừ trách nhiệm
              </h2>
              <p>
                Các hình ảnh phối cảnh, thông số kỹ thuật, giá bán, chính sách ưu đãi và tiến độ dự án trên website chỉ mang tính chất tham khảo tại thời điểm đăng tải.
              </p>
              <p className="mt-4">
                Thông tin chính thức sẽ được căn cứ theo tài liệu từ chủ đầu tư, đơn vị phát triển dự án, hợp đồng giao dịch hoặc văn bản pháp lý có liên quan.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                5. Trách nhiệm của người dùng
              </h2>
              <p>
                Người dùng cam kết cung cấp thông tin chính xác khi đăng ký tư vấn và không sử dụng website cho các mục đích vi phạm pháp luật, gây ảnh hưởng đến hoạt động của hệ thống hoặc quyền lợi của bên thứ ba.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                6. Thay đổi điều khoản
              </h2>
              <p>
                HappyHouse có quyền cập nhật, điều chỉnh hoặc thay đổi nội dung website, thông tin dự án, chính sách bán hàng và các điều khoản sử dụng bất kỳ lúc nào để phù hợp với thực tế hoạt động và quy định pháp luật.
              </p>
            </section>

            <section className="bg-[#F5EDE8] p-6 rounded-2xl border-l-4 border-[#B03A2E]">
              <p className="italic">
                Điều khoản dịch vụ này có hiệu lực từ ngày 01/01/2026. Mọi thay đổi sẽ được cập nhật công khai trực tiếp trên website HappyHouse.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}