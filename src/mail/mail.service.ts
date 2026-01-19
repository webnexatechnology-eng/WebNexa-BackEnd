import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateLeadDto } from '../leads/dto/create-lead.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  // 🔥 Helper to send mail safely
  private async safeSend(options: nodemailer.SendMailOptions) {
    try {
      await this.transporter.sendMail(options);
      this.logger.log(`Mail sent to ${options.to}`);
    } catch (err) {
      this.logger.error('Mail failed:', err);
    }
  }

  // ✅ 1. Auto reply to client when lead is created
  async sendClientMail(to: string, name: string) {
    return this.safeSend({
      from: `"WebNexa Tech" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Thanks for contacting WebNexa Tech 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>Hello ${name},</h2>
          <p>Thank you for contacting <b>WebNexa Tech</b>.</p>
          <p>We have received your request and our team will contact you within <b>24 hours</b>.</p>
          <br/>
          <p>Best regards,<br/>
          <b>WebNexa Tech Team</b><br/>
          🌐 https://webnexatech.vercel.app</p>
        </div>
      `,
    });
  }

  // ✅ 2. Notify admin when new lead is created
  async sendAdminMail(dto: CreateLeadDto) {
    return this.safeSend({
      from: `"WebNexa Leads" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: '🔥 New Lead Received - WebNexa',
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>🚀 New Lead Received</h2>
          <p><b>Name:</b> ${dto.name}</p>
          <p><b>Email:</b> ${dto.email}</p>
          <p><b>Message:</b><br/> ${dto.message}</p>
          <br/>
          <p>Check admin dashboard for details.</p>
        </div>
      `,
    });
  }

  // ✅ 3. When admin marks as "contacted"
  async sendContactedMail(to: string, name: string) {
    return this.safeSend({
      from: `"WebNexa Tech" <${process.env.MAIL_USER}>`,
      to,
      subject: 'We have contacted you ✔️',
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>Hello ${name},</h2>
          <p>Our team has reviewed your request and <b>contacted you</b>.</p>
          <p>If you need anything else, just reply to this email.</p>
          <br/>
          <p>Regards,<br/>
          <b>WebNexa Tech Team</b></p>
        </div>
      `,
    });
  }

  // ✅ 4. When admin marks as "converted"
  async sendConvertedMail(to: string, name: string) {
    return this.safeSend({
      from: `"WebNexa Tech" <${process.env.MAIL_USER}>`,
      to,
      subject: '🎉 Your project is now started!',
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>Congratulations ${name}! 🎉</h2>
          <p>We are excited to inform you that your project has been <b>officially started</b>.</p>
          <p>Our team will now work on converting your idea into a powerful digital product.</p>
          <br/>
          <p>Thank you for trusting <b>WebNexa Tech</b>.</p>
          <p>— WebNexa Team 🚀</p>
        </div>
      `,
    });
  }
}
