import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  message: string;
}
