'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'
import { Building, CheckCircle2, CreditCard, FileSignature, Wallet } from 'lucide-react'

const steps = [
  {
    icon: Wallet,
    title: "Bước 1: Đặt cọc & Chọn phương án vay",
    desc: "Khách hàng tiến hành đặt cọc (Booking) căn hộ mong muốn. Chuyên viên tư vấn sẽ tính toán bảng dòng tiền chi tiết và giúp khách hàng chọn ngân hàng tài trợ phù hợp nhất (Vietcombank, MB Bank, BIDV).",
  },
  {
    icon: FileSignature,
    title: "Bước 2: Chuẩn bị hồ sơ pháp lý & Thu nhập",
    desc: "Khách hàng cần chuẩn bị: CCCD, Giấy xác nhận tình trạng hôn nhân. Hồ sơ chứng minh thu nhập bao gồm: Hợp đồng lao động, Sao kê lương 3-6 tháng gần nhất, hoặc Giấy phép kinh doanh (đối với chủ doanh nghiệp).",
  },
  {
    icon: Building,
    title: "Bước 3: Ngân hàng thẩm định & Ra thông báo cho vay",
    desc: "Ngân hàng tiến hành thẩm định hồ sơ trong vòng 2-4 ngày làm việc. Sau khi đạt yêu cầu, ngân hàng sẽ phát hành 'Thông báo cho vay' (Thư bảo lãnh) chính thức gửi đến khách hàng.",
  },
  {
    icon: CreditCard,
    title: "Bước 4: Ký HĐMB & Giải ngân",
    desc: "Khách hàng đóng đủ vốn tự có (thường là 30%) và Ký hợp đồng mua bán (HĐMB) với Chủ đầu tư. Ngân hàng sẽ tiến hành giải ngân 70% còn lại theo tiến độ xây dựng hoặc giải ngân 1 lần tùy chính sách.",
  }
]

export default function LoanGuidePage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] font-sans">
      <Header />
      
      <div className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-[#2C1A1A] mb-6 font-serif">Hướng Dẫn Thủ Tục Vay Vốn</h1>
            <p className="text-[#5D4E4E] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Sở hữu căn hộ AVA Center dễ dàng hơn với gói hỗ trợ tài chính ưu việt: <strong className="text-[#B03A2E]">Vay 70%, Miễn lãi suất 0% và ân hạn nợ gốc trong 24 tháng.</strong>
            </p>
          </div>

          {/* Bank Partners */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#E8D7CF] mb-16">
            <h3 className="text-center text-[11px] font-bold text-[#8A7D7D] uppercase tracking-[0.2em] mb-8">Đối tác tài chính chiến lược</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Thay bằng Logo thực tế của bạn nếu có, ở đây dùng text tượng trưng */}
               <div className="text-2xl font-black text-[#009245]">VIETCOMBANK</div>
               <div className="text-2xl font-black text-[#1D3A8A]">MB BANK</div>
               <div className="text-2xl font-black text-[#00529C]">BIDV</div>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="relative">
            {/* Trục dọc ở giữa (Chỉ hiện trên màn hình lớn) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#E8D7CF] -translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Cục tròn nằm trên trục */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-[#F5EDE8] rounded-full items-center justify-center z-10 shadow-sm text-[#B03A2E] font-bold">
                      {idx + 1}
                    </div>

                    {/* Nội dung Box */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E8D7CF] shadow-sm hover:shadow-lg transition-shadow duration-300 hover:border-[#B03A2E]/30 relative overflow-hidden group">
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5EDE8] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:bg-[#B03A2E]/10 transition-colors" />

                        <div className="w-14 h-14 bg-[#FFF0EE] text-[#B03A2E] rounded-2xl flex items-center justify-center mb-6">
                          <step.icon className="w-6 h-6" />
                        </div>
                        
                        <h4 className="text-xl font-bold text-[#2C1A1A] mb-3 font-serif leading-snug">
                          {step.title}
                        </h4>
                        
                        <p className="text-[#5D4E4E] leading-relaxed text-sm md:text-base">
                          {step.desc}
                        </p>
                        
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

          {/* Box Ưu đãi chốt sale */}
          <div className="mt-16 bg-[#F5EDE8] p-8 rounded-3xl border border-[#E8D7CF] flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0 w-16 h-16 bg-[#B03A2E] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#2C1A1A] mb-2 font-serif">Chuyên viên hỗ trợ làm hồ sơ tại nhà</h4>
              <p className="text-[#5D4E4E] text-sm">Bạn không cần mất thời gian đến trực tiếp ngân hàng. Chuyên viên tín dụng của chúng tôi sẽ thu hồ sơ và xử lý các thủ tục tận nơi hoàn toàn miễn phí.</p>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
      <ZaloButton />
    </main>
  )
}