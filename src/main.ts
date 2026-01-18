import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log("ADMIN_EMAIL AT BOOT =", process.env.ADMIN_EMAIL);
  console.log("ADMIN_PASSWORD AT BOOT =", process.env.ADMIN_PASSWORD);

  // ✅ Enable CORS for Vercel frontends
  app.enableCors({
    origin: [
      "https://web-nexa-front-end.vercel.app",   // Landing page
      "https://web-nexa-dashboard.vercel.app",    // Admin dashboard
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log("Backend running on port:", port);
}

bootstrap();
