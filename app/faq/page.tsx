'use client'

import { useState } from "react"
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import { ChevronDown, MessageCircleQuestion } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    category: "Pháp Lý & Sở Hữu",
    questions: [
      { q: "Người nước ngoài có được mua căn hộ AVA Center không?", a: "Có. Theo luật nhà ở Việt Nam hiện hành, người nước ngoài được phép sở hữu tối đa 30% số lượng căn hộ trong một tòa nhà. Thời hạn sở hữu là 50 năm và có thể gia hạn thêm." },
      { q: "Bao lâu thì nhận được sổ hồng?", a: "Chủ đầu tư cam kết sẽ tiến hành làm thủ tục cấp Giấy chứng nhận quyền sở hữu nhà ở (Sổ hồng) cho cư dân trong vòng 6-12 tháng kể từ ngày bàn giao nhà và khách hàng hoàn tất các nghĩa vụ tài chính." },
    ]
  },
  {
    category: "Tài Chính & Thanh Toán",
    questions: [
      { q: "Ngân hàng nào bão lãnh dự án?", a: "Dự án AVA Center hiện đang được bảo lãnh và hỗ trợ cho vay bởi các ngân hàng uy tín hàng đầu như: Vietcombank, MB Bank và BIDV." },
      { q: "Chính sách ân hạn nợ gốc hoạt động thế nào?", a: "Khách hàng mua căn hộ sẽ được hỗ trợ vay lên đến 70% giá trị hợp đồng. Miễn phí trả nợ trước hạn và ân hạn nợ gốc, hỗ trợ lãi suất 0% trong suốt 24 tháng (cho đến khi nhận thông báo bàn giao nhà)." },
    ]
  },
  {
    category: "Thiết Kế & Bàn Giao",
    questions: [
      { q: "Tiêu chuẩn bàn giao căn hộ gồm những gì?", a: "Căn hộ được bàn giao hoàn thiện nội thất liền tường cao cấp: Tủ bếp trên/dưới, bếp từ, máy hút mùi, thiết bị vệ sinh nhập khẩu (Kohler/Toto), sàn gỗ phòng ngủ tiêu chuẩn E0, điều hòa các phòng và hệ thống Smart Home cơ bản." },
      { q: "Khu vực để xe có đủ cho cư dân không?", a: "Dự án thiết kế 1 tầng hầm thông đế siêu rộng và bãi đỗ xe thông minh trên cao, đảm bảo tỷ lệ đỗ xe 1:1 cho ô tô đối với căn hộ 2PN và chỗ để xe máy rộng rãi cho toàn bộ cư dân." },
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
            <h1 className="text-3xl md:text-5xl font-bold text-[#2C1A1A] mb-4 font-serif">Câu Hỏi Thường Gặp</h1>
            <p className="text-[#5D4E4E] text-base md:text-lg">Giải đáp mọi thắc mắc của bạn về dự án AVA Center</p>
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
                      <div key={id} className="bg-white rounded-2xl border border-[#E8D7CF] overflow-hidden transition-all duration-300 hover:border-[#B03A2E]/30 shadow-sm">
                        <button
                          onClick={() => toggleFAQ(id)}
                          className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                          <span className={cn("font-bold text-base md:text-lg pr-4", isOpen ? "text-[#B03A2E]" : "text-[#2C1A1A]")}>
                            {faq.q}
                          </span>
                          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300", isOpen ? "bg-[#B03A2E] text-white" : "bg-[#F5EDE8] text-[#B03A2E]")}>
                            <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen && "rotate-180")} />
                          </div>
                        </button>
                        <div 
                          className={cn("px-6 overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0")}
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

          {/* CTA Section */}
          <div className="mt-16 bg-[#1C0F0F] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B03A2E] rounded-full blur-[80px] opacity-20" />
            <h3 className="text-2xl md:text-3xl font-bold font-serif mb-4 relative z-10">Bạn vẫn còn câu hỏi?</h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto relative z-10">Hãy để lại thông tin hoặc gọi ngay cho chúng tôi, chuyên viên tư vấn sẽ hỗ trợ bạn 24/7.</p>
            <a href="tel:0901234567" className="inline-block bg-[#B03A2E] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#8B2E24] transition-colors relative z-10">
              Gọi Ngay: 0901 234 567
            </a>
          </div>

        </div>
      </div>
      
      <Footer />
      <ZaloButton />
    </main>
  )
}