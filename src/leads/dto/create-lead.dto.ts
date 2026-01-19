import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  company?: string;

  @IsNotEmpty()
  projectType: string;

  @IsNotEmpty()
  budget: string;

  @IsNotEmpty()
  timeline: string;

  @IsNotEmpty()
  message: string;
}
