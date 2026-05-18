'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#FDFAF6]">
      <Header />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-[#E8D7CF]/50">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C1A1A] mb-8 font-serif border-b border-[#E8D7CF] pb-6">
            Chính Sách Bảo Mật
          </h1>

          <div className="space-y-8 font-sans text-[#5D4E4E] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                1. Thu thập thông tin
              </h2>
              <p>
                HappyHouse thu thập các thông tin khách hàng khi đăng ký tư vấn trên website bao gồm:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <li>Họ và tên</li>
                <li>Số điện thoại</li>
                <li>Email</li>
                <li>Nhu cầu tìm hiểu dự án</li>
              </ul>
              <p className="mt-4">
                Thông tin được thu thập nhằm hỗ trợ tư vấn và cung cấp thông tin phù hợp về các dự án bất động sản do HappyHouse phân phối.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                2. Mục đích sử dụng thông tin
              </h2>
              <p>Thông tin khách hàng được sử dụng cho các mục đích:</p>
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <li>Cung cấp bảng giá, chính sách bán hàng và thông tin dự án.</li>
                <li>Gửi tài liệu dự án qua Email hoặc Zalo.</li>
                <li>Hỗ trợ tư vấn thủ tục pháp lý và vay vốn ngân hàng.</li>
                <li>Nâng cao chất lượng dịch vụ và trải nghiệm khách hàng.</li>
                <li>Thông báo các chương trình ưu đãi mới nếu khách hàng đồng ý nhận thông tin.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                3. Cam kết bảo mật thông tin
              </h2>
              <p>
                HappyHouse cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. Chúng tôi áp dụng các biện pháp kỹ thuật và bảo mật phù hợp nhằm ngăn chặn việc truy cập trái phép, mất mát hoặc sử dụng sai mục đích dữ liệu người dùng.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                4. Chia sẻ thông tin với bên thứ ba
              </h2>
              <p>
                HappyHouse không mua bán hoặc chia sẻ thông tin cá nhân khách hàng cho bên thứ ba, ngoại trừ:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <li>Đơn vị phát triển dự án.</li>
                <li>Ngân hàng bảo lãnh hoặc hỗ trợ vay vốn.</li>
                <li>Cơ quan chức năng theo yêu cầu của pháp luật.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">
                5. Quyền của khách hàng
              </h2>
              <p>Khách hàng có quyền:</p>
              <ul className="list-disc ml-6 mt-3 space-y-2">
                <li>Yêu cầu chỉnh sửa hoặc cập nhật thông tin cá nhân.</li>
                <li>Yêu cầu ngừng nhận thông tin quảng cáo.</li>
                <li>Yêu cầu xóa dữ liệu cá nhân khỏi hệ thống.</li>
              </ul>
              <p className="mt-4">
                Mọi yêu cầu vui lòng liên hệ qua Email hoặc số điện thoại hỗ trợ trên website.
              </p>
            </section>

            <section className="bg-[#F5EDE8] p-6 rounded-2xl border-l-4 border-[#B03A2E]">
              <p className="italic">
                Chính sách bảo mật này có hiệu lực từ ngày 01/01/2026. HappyHouse có thể cập nhật nội dung để phù hợp với quy định pháp luật và sẽ công khai trực tiếp trên website.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}