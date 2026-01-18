import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }

  // ✅ PUBLIC (used by website contact form)
  @Post()
  create(@Body() body: CreateLeadDto) {
    return this.leadsService.create(body);
  }

  // 🔒 PROTECTED (admin only)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  // 🔒 PROTECTED (admin only)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  // 🔒 PROTECTED (admin only)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.leadsService.updateStatus(id, status);
  }

  // 🔒 PROTECTED (admin only)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.leadsService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("stats/summary")
  async getStats() {
    return this.leadsService.getStats();
  }

}
