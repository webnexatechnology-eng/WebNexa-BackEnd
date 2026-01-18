import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async login(email: string, password: string) {
    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;

    console.log("ENV ADMIN_EMAIL =", JSON.stringify(adminEmail));
    console.log("ENV ADMIN_PASSWORD =", JSON.stringify(adminPassword));
    console.log("INPUT EMAIL =", JSON.stringify(email));
    console.log("INPUT PASSWORD =", JSON.stringify(password));

    if (email !== adminEmail || password !== adminPassword) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
