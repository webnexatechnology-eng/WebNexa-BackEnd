import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateLeadDto } from '../leads/dto/create-lead.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  // ✅ 1. Auto reply to client when lead is created
  async sendClientMail(to: string, name: string) {
    return await this.transporter.sendMail({
      from: `"2SquareTech" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Thanks for contacting 2SquareTech',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting <b>2SquareTech</b>.</p>
        <p>We have received your request and will contact you shortly.</p>
        <br/>
        <p>Best regards,<br/>2SquareTech Team</p>
      `,
    });
  }

  // ✅ 2. Notify admin when new lead is created
  async sendAdminMail(dto: CreateLeadDto) {
    return await this.transporter.sendMail({
      from: `"Website Leads" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: 'New Lead Received 🚀',
      html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b> ${dto.name}</p>
        <p><b>Email:</b> ${dto.email}</p>
        <p><b>Message:</b> ${dto.message}</p>
      `,
    });
  }

  // ✅ 3. When admin marks as "contacted"
  async sendContactedMail(to: string, name: string) {
    return await this.transporter.sendMail({
      from: `"2SquareTech" <${process.env.MAIL_USER}>`,
      to,
      subject: 'We have contacted you ✔️',
      html: `
        <h2>Hello ${name},</h2>
        <p>We have reviewed your request and our team has contacted you.</p>
        <p>If you have any further questions, feel free to reply.</p>
        <br/>
        <p>Regards,<br/>2SquareTech Team</p>
      `,
    });
  }
}
