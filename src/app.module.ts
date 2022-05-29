import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PostModule } from '@post/post.module';
import mysqlConfig from './config/mysql.config';
import { HttpExceptionFilter } from './error/http-exception-filter';
import { MysqlModule } from './infrastructure/mysql/mysql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        mysqlConfig
      ]
    }),
    MysqlModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
