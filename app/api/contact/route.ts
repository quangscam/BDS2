import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'HappyHouse <onboarding@resend.dev>',
      to: ['ngocdiachinh34@gmail.com'],
      subject: `[Web HappyHouse] ${subject || 'Liên hệ mới'} - từ ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: #B03A2E; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0;">🏠 HappyHouse — Liên hệ mới</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <p><strong>👤 Họ và tên:</strong> ${name}</p>
            <p><strong>📞 Số điện thoại:</strong> ${phone || 'Không cung cấp'}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📌 Chủ đề:</strong> ${subject || 'Không có'}</p>
            <div style="background: #ffffff; padding: 16px; border-left: 4px solid #B03A2E; border-radius: 4px; margin-top: 10px;">
              <strong>💬 Nội dung:</strong><br/>
              <p style="margin-top: 8px;">${message}</p>
            </div>
          </div>
          <p style="font-size: 11px; color: #aaa; text-align: center; margin-top: 16px;">
            Email này được gửi tự động từ website HappyHouse
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Lỗi gửi email:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}