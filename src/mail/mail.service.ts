import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private readonly BREVO_API = 'https://api.brevo.com/v3/smtp/email';
  private readonly API_KEY = process.env.BREVO_API_KEY;

  private readonly FROM_EMAIL = process.env.MAIL_FROM || 'no-reply@webnexa.tech';
  private readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'adityathakr@gmail.com';

  private readonly LOGO_URL =
    'https://res.cloudinary.com/dmxi7lt64/image/upload/v1769123208/eqhup0xa9zeb0rbpisit.png';

  private buildTemplate(title: string, body: string) {
    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
    
    <div style="padding:20px;text-align:center;background:linear-gradient(135deg,#2563eb,#7c3aed);">
      <img src="${this.LOGO_URL}" style="height:42px;margin-bottom:10px;" />
      <h1 style="color:#ffffff;margin:0;font-size:22px;">${title}</h1>
    </div>

    <div style="padding:28px;color:#1f2937;font-size:15px;line-height:1.6;">
      ${body}
    </div>

    <div style="text-align:center;padding:16px;font-size:12px;color:#6b7280;background:#f8fafc;">
      © ${new Date().getFullYear()} WebNexa Tech. All rights reserved.<br/>
      This is an automated email. Please do not reply.
    </div>

  </div>
</body>
</html>
    `;
  }

  private async sendMail(to: string, subject: string, html: string) {
    try {
      await axios.post(
        this.BREVO_API,
        {
          sender: { email: this.FROM_EMAIL, name: 'WebNexa Tech' },
          to: [{ email: to }],
          subject,
          htmlContent: html,
        },
        {
          headers: {
            'api-key': this.API_KEY,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        },
      );
    } catch (err) {
      this.logger.error('Mail failed', err?.response?.data || err.message || err);
    }
  }

  // 1️⃣ Client auto reply
  async sendClientMail(to: string, name: string) {
    const body = `
      <h2>Hello ${name},</h2>
      <p>Thank you for contacting <b>WebNexa Tech</b>.</p>
      <p>We have received your request and our team will contact you within <b>24 hours</b>.</p>

      <div style="margin:20px 0;padding:14px;background:#eff6ff;border-radius:8px;">
        📌 Our team is reviewing your requirements.
      </div>

      <p>Warm regards,<br/><b>WebNexa Team</b></p>
    `;

    return this.sendMail(
      to,
      'Thanks for contacting WebNexa',
      this.buildTemplate('Thanks for Reaching Out!', body),
    );
  }

  // 2️⃣ Admin notification
  async sendAdminMail(dto: any) {
    const body = `
      <h2>New Lead Received</h2>
      <table cellpadding="6">
        <tr><td><b>Name:</b></td><td>${dto.name}</td></tr>
        <tr><td><b>Email:</b></td><td>${dto.email}</td></tr>
        <tr><td><b>Message:</b></td><td>${dto.message}</td></tr>
      </table>
    `;

    return this.sendMail(
      this.ADMIN_EMAIL,
      '🚀 New Lead Received - WebNexa',
      this.buildTemplate('New Lead Alert', body),
    );
  }

  // 3️⃣ Contacted
  async sendContactedMail(to: string, name: string) {
    const body = `
      <h2>Hello ${name},</h2>

      <p>Great news! 🎉</p>

      <p>Our team has <b>successfully contacted you</b> regarding your request.</p>

      <div style="margin:20px 0;padding:14px;background:#ecfdf5;border-radius:8px;">
        📌 Next step: Requirement discussion & solution planning
      </div>

      <p>Regards,<br/><b>WebNexa Team</b></p>
    `;

    return this.sendMail(
      to,
      'We’ve Contacted You ✅',
      this.buildTemplate('We’ve Contacted You', body),
    );
  }

  // 4️⃣ Converted
  async sendConvertedMail(to: string, name: string) {
    const body = `
      <h2>Hello ${name},</h2>

      <p>Congratulations! 🎉</p>

      <p>Your project is now <b>officially started</b>.</p>

      <div style="margin:20px 0;padding:14px;background:#f0f9ff;border-radius:8px;">
        🚀 Our team will contact you shortly with next steps.
      </div>

      <p>Excited to build this with you!<br/><b>WebNexa Team</b></p>
    `;

    return this.sendMail(
      to,
      'Your Project Has Started 🚀',
      this.buildTemplate('Project Started', body),
    );
  }
}
