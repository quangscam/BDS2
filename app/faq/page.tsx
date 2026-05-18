'use client'

import { useState } from "react"
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import PhoneButton from '@/components/phone-button'
import { ChevronDown, MessageCircleQuestion } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    category: "Thông Tin Dự Án",
    questions: [
      {
        q: "Happy House cung cấp thông tin về những loại bất động sản nào?",
        a: "Happy House cung cấp thông tin tham khảo về nhiều loại hình bất động sản như căn hộ, nhà phố, biệt thự, đất nền, khu đô thị và các dự án đang được quan tâm trên thị trường."
      },
      {
        q: "Thông tin dự án trên website có phải là thông tin chính thức không?",
        a: "Các thông tin trên website được tổng hợp nhằm mục đích tham khảo và hỗ trợ khách hàng tìm hiểu ban đầu. Thông tin chính thức sẽ được xác nhận theo tài liệu từ chủ đầu tư, đơn vị phát triển dự án hoặc hợp đồng giao dịch."
      },
    ]
  },
  {
    category: "Tư Vấn & Hỗ Trợ Khách Hàng",
    questions: [
      {
        q: "Tôi muốn được tư vấn dự án phù hợp thì cần làm gì?",
        a: "Bạn có thể để lại họ tên, số điện thoại và nhu cầu tìm kiếm bất động sản trên website. Đội ngũ Happy House sẽ liên hệ để tư vấn dự án phù hợp với tài chính, khu vực mong muốn và mục tiêu mua ở hoặc đầu tư."
      },
      {
        q: "Happy House có hỗ trợ so sánh nhiều dự án không?",
        a: "Có. Happy House có thể hỗ trợ bạn so sánh vị trí, mức giá, tiện ích, pháp lý, tiến độ, chính sách thanh toán và tiềm năng khai thác của nhiều dự án để bạn dễ đưa ra quyết định hơn."
      },
    ]
  },
  {
    category: "Tài Chính & Thanh Toán",
    questions: [
      {
        q: "Tôi có thể vay ngân hàng khi mua bất động sản không?",
        a: "Tùy từng dự án và hồ sơ khách hàng, ngân hàng có thể hỗ trợ vay một phần giá trị sản phẩm. Happy House sẽ hỗ trợ kết nối thông tin về ngân hàng, hạn mức vay, lãi suất và phương án thanh toán phù hợp."
      },
      {
        q: "Giá bán trên website đã phải là giá cuối cùng chưa?",
        a: "Giá bán trên website có thể thay đổi theo thời điểm, chính sách bán hàng, vị trí sản phẩm và tình trạng giỏ hàng. Để có bảng giá mới nhất, bạn nên liên hệ trực tiếp đội ngũ tư vấn của Happy House."
      },
    ]
  },
  {
    category: "Pháp Lý & Giao Dịch",
    questions: [
      {
        q: "Khi mua bất động sản cần kiểm tra những giấy tờ gì?",
        a: "Khách hàng nên kiểm tra các thông tin như pháp lý dự án, giấy phép xây dựng, quy hoạch, hợp đồng mua bán, tiến độ thanh toán, chính sách bàn giao và các điều khoản liên quan trước khi quyết định giao dịch."
      },
      {
        q: "Happy House có thay mặt chủ đầu tư ký hợp đồng không?",
        a: "Happy House đóng vai trò cung cấp thông tin và hỗ trợ tư vấn cho khách hàng. Việc ký kết hợp đồng, thanh toán và các cam kết pháp lý sẽ thực hiện trực tiếp theo quy định của chủ đầu tư hoặc đơn vị có thẩm quyền."
      },
    ]
  },
  {
    category: "Đầu Tư & An Cư",
    questions: [
      {
        q: "Nên mua bất động sản để ở hay đầu tư?",
        a: "Điều này phụ thuộc vào nhu cầu, dòng tiền và mục tiêu của bạn. Nếu mua để ở, nên ưu tiên vị trí, tiện ích và môi trường sống. Nếu mua để đầu tư, nên quan tâm thêm đến tiềm năng tăng giá, khả năng cho thuê và thanh khoản."
      },
      {
        q: "Happy House có hỗ trợ tìm dự án theo ngân sách không?",
        a: "Có. Bạn có thể cung cấp mức tài chính dự kiến, khu vực mong muốn và nhu cầu sử dụng. Happy House sẽ gợi ý các dự án phù hợp để bạn tham khảo và so sánh."
      },
    ]
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0")

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <main className="min-h-screen bg-[#FDFAF6] font-sans">
      <Header />

      <div className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-[#F5EDE8] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircleQuestion className="w-8 h-8 text-[#B03A2E]" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[#2C1A1A] mb-4 font-serif">
              Câu Hỏi Thường Gặp
            </h1>

            <p className="text-[#5D4E4E] text-base md:text-lg">
              Giải đáp những thắc mắc phổ biến khi tìm hiểu, mua ở hoặc đầu tư bất động sản cùng Happy House.
            </p>
          </div>

          <div className="space-y-12">
            {faqs.map((group, gIdx) => (
              <div key={group.category}>
                <h2 className="text-xl font-bold text-[#B03A2E] mb-6 uppercase tracking-widest border-b border-[#E8D7CF] pb-3">
                  {group.category}
                </h2>

                <div className="space-y-4">
                  {group.questions.map((faq, qIdx) => {
                    const id = `${gIdx}-${qIdx}`
                    const isOpen = openIndex === id

                    return (
                      <div
                        key={id}
                        className="bg-white rounded-2xl border border-[#E8D7CF] overflow-hidden transition-all duration-300 hover:border-[#B03A2E]/30 shadow-sm"
                      >
                        <button
                          onClick={() => toggleFAQ(id)}
                          className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                          <span
                            className={cn(
                              "font-bold text-base md:text-lg pr-4",
                              isOpen ? "text-[#B03A2E]" : "text-[#2C1A1A]"
                            )}
                          >
                            {faq.q}
                          </span>

                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                              isOpen ? "bg-[#B03A2E] text-white" : "bg-[#F5EDE8] text-[#B03A2E]"
                            )}
                          >
                            <ChevronDown
                              className={cn(
                                "w-5 h-5 transition-transform duration-300",
                                isOpen && "rotate-180"
                              )}
                            />
                          </div>
                        </button>

                        <div
                          className={cn(
                            "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                            isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                          )}
                        >
                          <p className="text-[#5D4E4E] leading-relaxed border-t border-[#E8D7CF]/50 pt-4">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#1C0F0F] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B03A2E] rounded-full blur-[80px] opacity-20" />

            <h3 className="text-2xl md:text-3xl font-bold font-serif mb-4 relative z-10">
              Bạn vẫn còn câu hỏi?
            </h3>

            <p className="text-white/70 mb-8 max-w-xl mx-auto relative z-10">
              Hãy để lại thông tin hoặc liên hệ ngay với Happy House, đội ngũ tư vấn sẽ hỗ trợ bạn chọn dự án phù hợp.
            </p>

            <a
              href="tel:0986514242"
              className="inline-block bg-[#B03A2E] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#8B2E24] transition-colors relative z-10"
            >
              Gọi Ngay: 0986 51 4242
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <PhoneButton />
      <ZaloButton />
    </main>
  )
}