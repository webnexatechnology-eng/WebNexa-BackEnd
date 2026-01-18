"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let MailService = class MailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }
    async sendClientMail(to, name) {
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
    async sendAdminMail(dto) {
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
    async sendContactedMail(to, name) {
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
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map