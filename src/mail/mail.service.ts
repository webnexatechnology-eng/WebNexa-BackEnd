import { Injectable, notequal } from '@nestjs/common';
import axios from 'axios';
import { CreateLeadDto } from '../leads/dto/create-lead.dto';

@Injectable()
export class MailService {
  private readonly apiKey = process.env.BREVO_API_KEY;
  private readonly apiUrl = 'https://api.brevo.com/v3/smtp/email';

  private readonly headers = {
    'api-key': this.apiKey,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  private async send(payload: any) {
    try {
      await axios.post(this.apiUrl, payload, { headers: this.headers });
    } catch (err: any) {
      console.error('Brevo API Error:', err?.response?.data || err.message);
      throw err;
    }
  }

  // ✅ 1. Auto reply to client when lead is created
  async sendClientMail(to: string, name: string) {
    return this.send({
      sender: { name: 'WebNexa Tech', email: process.env.MAIL_FROM },
      to: [{ email: to, name }],
      subject: 'Thanks for contacting WebNexa Tech',
      htmlContent: `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting <b>WebNexa Tech</b>.</p>
        <p>We have received your request and will contact you within 24 hours.</p>
        <br/>
        <p>Best regards,<br/>WebNexa Tech Team</p>
      `,
    });
  }

  // ✅ 2. Notify admin when new lead is created
  async sendAdminMail(dto: CreateLeadDto) {
    return this.send({
      sender: { name: 'WebNexa Website', email: process.env.MAIL_FROM },
      to: [{ email: process.env.ADMIN_EMAIL, name: 'Admin' }],
      subject: '🚀 New Lead Received',
      htmlContent: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${dto.name}</p>
        <p><b>Email:</b> ${dto.email}</p>
        <p><b>Message:</b> ${dto.message}</p>
      `,
    });
  }

  // ✅ 3. When admin marks as "contacted"
  async sendContactedMail(to: string, name: string) {
    return this.send({
      sender: { name: 'WebNexa Tech', email: process.env.MAIL_FROM },
      to: [{ email: to, name }],
      subject: 'We have contacted you ✔️',
      htmlContent: `
        <h2>Hello ${name},</h2>
        <p>Our team has successfully contacted you regarding your request.</p>
        <p>If you have more questions, just reply to this email.</p>
        <br/>
        <p>Regards,<br/>WebNexa Tech Team</p>
      `,
    });
  }

  // ✅ 4. When admin marks as "converted"
  async sendConvertedMail(to: string, name: string) {
    return this.send({
      sender: { name: 'WebNexa Tech', email: process.env.MAIL_FROM },
      to: [{ email: to, name }],
      subject: 'Your project is now started 🚀',
      htmlContent: `
        <h2>Congratulations ${name} 🎉</h2>
        <p>We are happy to inform you that your project has been approved and is now in progress.</p>
        <p>Our team will stay in touch with you for next steps.</p>
        <br/>
        <p>Regards,<br/>WebNexa Tech Team</p>
      `,
    });
  }
}
