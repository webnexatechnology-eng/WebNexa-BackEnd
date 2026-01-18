"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leads_schema_1 = require("./leads.schema");
const mail_service_1 = require("../mail/mail.service");
let LeadsService = class LeadsService {
    leadModel;
    mailService;
    constructor(leadModel, mailService) {
        this.leadModel = leadModel;
        this.mailService = mailService;
    }
    async create(dto) {
        const lead = await this.leadModel.create(dto);
        await this.mailService.sendClientMail(dto.email, dto.name);
        await this.mailService.sendAdminMail(dto);
        return { success: true };
    }
    async findAll() {
        return this.leadModel.find().sort({ createdAt: -1 });
    }
    async findOne(id) {
        const lead = await this.leadModel.findById(id);
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return lead;
    }
    async updateStatus(id, status) {
        const lead = await this.leadModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!lead) {
            throw new common_1.NotFoundException("Lead not found");
        }
        if (status === "contacted") {
            await this.mailService.sendContactedMail(lead.email, lead.name);
        }
        return lead;
    }
    async delete(id) {
        const lead = await this.leadModel.findByIdAndDelete(id);
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return { success: true };
    }
    async getStats() {
        const total = await this.leadModel.countDocuments();
        const newLeads = await this.leadModel.countDocuments({ status: "new" });
        const contacted = await this.leadModel.countDocuments({ status: "contacted" });
        const converted = await this.leadModel.countDocuments({ status: "converted" });
        const recent = await this.leadModel
            .find()
            .sort({ createdAt: -1 })
            .limit(5);
        return {
            total,
            newLeads,
            contacted,
            converted,
            recent,
        };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leads_schema_1.Lead.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map