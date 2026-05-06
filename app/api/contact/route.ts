import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Dán trực tiếp API Key vào đây để bỏ qua lỗi không đọc được file .env
const resend = new Resend('re_BfzUqzkr_3KNgg4mLeeKWpuPbjtZwyWxN');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng điền đầy đủ Họ tên, Email và Lời nhắn' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      // Lưu ý: Nếu chưa verify domain, bắt buộc phải dùng onboarding@resend.dev
      from: 'HappyHouse <onboarding@resend.dev>', 
      to: ['ngocdiachinh34@gmail.com'],
      subject: `[Web HappyHouse] ${subject || 'Liên hệ mới'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #B03A2E; padding: 20px; color: #ffffff;">
            <h2 style="margin: 0;">🏠 HappyHouse — Liên hệ mới</h2>
          </div>
          <div style="padding: 24px; background: #f9f9f9;">
            <p><strong>👤 Họ và tên:</strong> ${name}</p>
            <p><strong>📞 Số điện thoại:</strong> ${phone || 'Không cung cấp'}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📌 Chủ đề:</strong> ${subject || 'Tư vấn dự án'}</p>
            <div style="background: #fff; padding: 15px; border-left: 4px solid #B03A2E; margin-top: 15px;">
              <strong>💬 Nội dung:</strong><br/>
              ${message}
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Lỗi Resend:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi hệ thống' },
      { status: 500 }
    );
  }
}