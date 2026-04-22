'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Reveal } from '@/components/reveal' // Sử dụng component Reveal bạn đã có

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
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">1. Thu thập thông tin</h2>
              <p>
                Chúng tôi thu thập thông tin khi bạn đăng ký tư vấn trên website, bao gồm: Họ tên, Số điện thoại, Email và nhu cầu sản phẩm. Thông tin này giúp chúng tôi hỗ trợ bạn tốt nhất về dự án AVA Center.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">2. Sử dụng thông tin</h2>
              <p>Thông tin của bạn được sử dụng cho các mục đích:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>Cung cấp thông tin chi tiết về bảng giá, chính sách bán hàng.</li>
                <li>Gửi tài liệu dự án qua Email hoặc Zalo.</li>
                <li>Tư vấn trực tiếp về các thủ tục vay vốn ngân hàng.</li>
                <li>Nâng cao chất lượng dịch vụ khách hàng.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">3. Bảo mật dữ liệu</h2>
              <p>
                Happy House cam kết bảo mật tuyệt đối dữ liệu cá nhân của bạn. chúng tôi triển khai các biện pháp an ninh kỹ thuật hiện đại để ngăn chặn truy cập trái phép, mất mát hoặc lạm dụng thông tin.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#B03A2E] mb-4 uppercase tracking-wide">4. Chia sẻ với bên thứ ba</h2>
              <p>
                Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào ngoài đơn vị phát triển dự án và ngân hàng bão lãnh (nếu bạn có nhu cầu vay vốn).
              </p>
            </section>

            <section className="bg-[#F5EDE8] p-6 rounded-2xl border-l-4 border-[#B03A2E]">
              <p className="italic">
                Chính sách này có hiệu lực từ ngày 01/01/2026. Mọi thay đổi sẽ được cập nhật trực tiếp tại trang web này.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}