import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private readonly BREVO_API = 'https://api.brevo.com/v3/smtp/email';
  private readonly API_KEY = process.env.BREVO_API_KEY;
  private readonly FROM_EMAIL = process.env.MAIL_FROM || '';
private readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';


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
        },
      );
    } catch (err) {
      this.logger.error('Mail failed', err?.response?.data || err.message);
    }
  }

  // 1️⃣ Client auto-reply
  async sendClientMail(to: string, name: string) {
    return this.sendMail(
      to,
      'Thanks for contacting WebNexa',
      `
      <h2>Hello ${name},</h2>
      <p>Thank you for contacting <b>WebNexa Tech</b>.</p>
      <p>We have received your request and will contact you within 24 hours.</p>
      <br/>
      <p>Regards,<br/>WebNexa Team</p>
      `,
    );
  }

  // 2️⃣ Admin notification
  async sendAdminMail(dto: any) {
    return this.sendMail(
      this.ADMIN_EMAIL,
      'New Lead Received 🚀',
      `
      <h2>New Lead</h2>
      <p><b>Name:</b> ${dto.name}</p>
      <p><b>Email:</b> ${dto.email}</p>
      <p><b>Message:</b> ${dto.message}</p>
      `,
    );
  }

  // 3️⃣ Contacted mail
  async sendContactedMail(to: string, name: string) {
    return this.sendMail(
      to,
      'We have contacted you ✔️',
      `
      <h2>Hello ${name},</h2>
      <p>Our team has contacted you regarding your request.</p>
      <p>We look forward to working with you.</p>
      <br/>
      <p>WebNexa Team</p>
      `,
    );
  }

  // 4️⃣ Converted mail
  async sendConvertedMail(to: string, name: string) {
    return this.sendMail(
      to,
      'Your project is now started 🚀',
      `
      <h2>Hello ${name},</h2>
      <p>Great news! Your project is now officially started.</p>
      <p>Our team will be in touch shortly.</p>
      <br/>
      <p>WebNexa Team</p>
      `,
    );
  }
}
