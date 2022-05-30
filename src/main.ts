import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'module-alias/register';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './error/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API 전체에 적용되는 URL prefix
  app.setGlobalPrefix('v1/api');

  // 리퀘스트 값 검증 설정
  app.useGlobalPipes(new ValidationPipe({
  	whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 에러 핸들링 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3100);

  Logger.log('application running on port 3100');
}
bootstrap();
