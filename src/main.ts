import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "https://web-nexa-front-end.vercel.app",
      "https://web-nexa-dashboard.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log("Backend running on port:", port);
}

bootstrap();
