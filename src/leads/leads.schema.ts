import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  company: string;

  @Prop({ required: true })
  projectType: string;

  @Prop({ required: true })
  budget: string;

  @Prop({ required: true })
  timeline: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 'new' })
  status: 'new' | 'contacted' | 'converted';
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
