import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * 에러 핸들링
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
  
    let message = exception.message;
    if (exception instanceof BadRequestException) {
      // 리퀘스트 필드값 검증을 위한 class-validator 의 메시지를 획득하기 위해 분기처리
      const errRes = exception.getResponse() as {
        message: string;
      }
      message = errRes.message
    }
    
    Logger.error(`${exception.stack}`)
    response
      .status(status)
      .json({
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}