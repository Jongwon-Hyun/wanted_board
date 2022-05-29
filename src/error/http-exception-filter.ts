import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
  
    let message = exception.message;
    if (exception instanceof BadRequestException) {
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