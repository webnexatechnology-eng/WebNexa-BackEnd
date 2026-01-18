import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { Lead, LeadSchema } from './leads.schema';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module'; // ✅ ADD THIS

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
    MailModule,
    AuthModule, // ✅ IMPORTANT
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
