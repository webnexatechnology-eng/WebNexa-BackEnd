import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("ADMIN_EMAIL AT BOOT =", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD AT BOOT =", process.env.ADMIN_PASSWORD);


  app.enableCors({
     origin: [
    'http://localhost:5173', // main website
    'http://localhost:5174', // admin dashboard
  ],
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

}

bootstrap();
