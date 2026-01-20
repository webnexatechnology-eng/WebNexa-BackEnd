import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateLeadDto } from '../leads/dto/create-lead.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // must be false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

  }

  // 1️⃣ Auto reply to client
  async sendClientMail(to: string, name: string) {
    try {
      return await this.transporter.sendMail({
        from: `"WebNexa" <${process.env.MAIL_FROM}>`,
        to,
        subject: 'Thanks for contacting WebNexa',
        html: `
          <h2>Hello ${name},</h2>
          <p>Thank you for contacting <b>WebNexa Tech</b>.</p>
          <p>We have received your request and will contact you shortly.</p>
          <br/>
          <p>Best regards,<br/>WebNexa Team</p>
        `,
      });
    } catch (err) {
      this.logger.error("Client mail failed", err);
    }
  }

  // 2️⃣ Notify admin
  async sendAdminMail(dto: CreateLeadDto) {
    try {
      return await this.transporter.sendMail({
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
    } catch (err) {
      this.logger.error("Admin mail failed", err);
    }
  }

  // 3️⃣ When contacted
  async sendContactedMail(to: string, name: string) {
    try {
      return await this.transporter.sendMail({
        from: `"WebNexa" <${process.env.MAIL_FROM}>`,
        to,
        subject: 'We have contacted you ✔️',
        html: `
          <h2>Hello ${name},</h2>
          <p>Our team has contacted you regarding your request.</p>
          <p>We will guide you further shortly.</p>
          <br/>
          <p>Regards,<br/>WebNexa Team</p>
        `,
      });
    } catch (err) {
      this.logger.error("Contacted mail failed", err);
    }
  }

  // 4️⃣ When converted
  async sendConvertedMail(to: string, name: string) {
    try {
      return await this.transporter.sendMail({
        from: `"WebNexa" <${process.env.MAIL_FROM}>`,
        to,
        subject: 'Your project is starting 🚀',
        html: `
          <h2>Hello ${name},</h2>
          <p>Great news! Your project is now moved to <b>development phase</b>.</p>
          <p>Our team will start working on converting your idea into reality.</p>
          <br/>
          <p>Regards,<br/>WebNexa Team</p>
        `,
      });
    } catch (err) {
      this.logger.error("Converted mail failed", err);
    }
  }
}
