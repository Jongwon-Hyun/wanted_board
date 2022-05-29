import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'module-alias/register';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './error/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1/api');

  app.useGlobalPipes(new ValidationPipe({
  	whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3100);

  Logger.log('application running on port 3100');
}
bootstrap();
