import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateLeadDto } from '../leads/dto/create-lead.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true only for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // ✅ 1. Auto reply to client
  async sendClientMail(to: string, name: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"WebNexa" <${process.env.MAIL_FROM}>`,
        to,
        subject: 'Thanks for contacting WebNexa',
        html: `
          <h2>Hello ${name},</h2>
          <p>Thank you for contacting <b>WebNexa Tech</b>.</p>
          <p>We have received your request and will contact you within 24 hours.</p>
          <br/>
          <p>Best regards,<br/>WebNexa Team</p>
        `,
      });

      this.logger.log(`Client mail sent: ${info.messageId}`);
      return info;
    } catch (err) {
      this.logger.error('Client mail failed', err);
      throw err;
    }
  }

  // ✅ 2. Notify admin
  async sendAdminMail(dto: CreateLeadDto) {
    try {
      const info = await this.transporter.sendMail({
        from: `"WebNexa Leads" <${process.env.MAIL_FROM}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Lead Received 🚀',
        html: `
          <h2>New Lead Received</h2>
          <p><b>Name:</b> ${dto.name}</p>
          <p><b>Email:</b> ${dto.email}</p>
          <p><b>Message:</b> ${dto.message}</p>
        `,
      });

      this.logger.log(`Admin mail sent: ${info.messageId}`);
      return info;
    } catch (err) {
      this.logger.error('Admin mail failed', err);
      throw err;
    }
  }

  // ✅ 3. When marked as contacted
  async sendContactedMail(to: string, name: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"WebNexa" <${process.env.MAIL_FROM}>`,
        to,
        subject: 'We have contacted you ✔️',
        html: `
          <h2>Hello ${name},</h2>
          <p>Our team has reviewed your request and contacted you.</p>
          <p>We look forward to working with you.</p>
          <br/>
          <p>Regards,<br/>WebNexa Team</p>
        `,
      });

      this.logger.log(`Contacted mail sent: ${info.messageId}`);
      return info;
    } catch (err) {
      this.logger.error('Contacted mail failed', err);
      throw err;
    }
  }
}
