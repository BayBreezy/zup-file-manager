import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CLIENT_URLS, PORT } from './config/config';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Serve static files Images, etc..
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  // Helmet for security
  app.use(helmet());
  // global pipe validation
  app.useGlobalPipes(new ValidationPipe());
  // Enable cors so frontend can send data to this server
  app.enableCors({
    credentials: true,
    origin: JSON.parse(CLIENT_URLS),
  });
  await app.listen(PORT);
}
bootstrap();
