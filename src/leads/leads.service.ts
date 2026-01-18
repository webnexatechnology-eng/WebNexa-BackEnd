import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from './leads.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead.name) private leadModel: Model<Lead>,
    private mailService: MailService,
  ) { }

  async create(dto: CreateLeadDto) {
    const lead = await this.leadModel.create(dto);

    await this.mailService.sendClientMail(dto.email, dto.name);
    await this.mailService.sendAdminMail(dto);

    return { success: true };
  }

  async findAll() {
    return this.leadModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const lead = await this.leadModel.findById(id);
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async updateStatus(id: string, status: string) {
  const lead = await this.leadModel.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );

  if (!lead) {
    throw new NotFoundException("Lead not found");
  }

  if (status === "contacted") {
    await this.mailService.sendContactedMail(
      lead.email,
      lead.name
    );
  }

  return lead;
}



  async delete(id: string) {
    const lead = await this.leadModel.findByIdAndDelete(id);
    if (!lead) throw new NotFoundException('Lead not found');
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

}
