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
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">1. Chấp thuận điều khoản</h2>
              <p>
                Bằng cách truy cập và sử dụng website của AVA Center, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây. Nếu bạn không đồng ý, vui lòng ngừng sử dụng trang web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">2. Quyền sở hữu trí tuệ</h2>
              <p>
                Toàn bộ nội dung, hình ảnh, phối cảnh 3D và tài liệu liên quan đến dự án AVA Center trên website này thuộc sở hữu của AVA Corp. Mọi hành vi sao chép trái phép đều vi phạm luật sở hữu trí tuệ.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">3. Miễn trừ trách nhiệm</h2>
              <p>
                Các hình ảnh phối cảnh và thông số kỹ thuật trên website mang tính chất minh họa tại thời điểm công bố. Thông tin chính thức sẽ được căn cứ trên hợp đồng mua bán được ký kết giữa khách hàng và chủ đầu tư.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">4. Thay đổi nội dung</h2>
              <p>
                Chúng tôi có quyền cập nhật, thay đổi thông tin dự án, chính sách bán hàng hoặc các điều khoản này bất kỳ lúc nào mà không cần thông báo trước.
              </p>
            </section>

            <section className="text-sm text-[#8A7D7D] mt-10">
              Cập nhật lần cuối: Tháng 4 năm 2026.
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}