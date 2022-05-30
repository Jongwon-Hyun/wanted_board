import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';
import { PostModule } from '@post/post.module';
import { ReplyModule } from '@reply/reply.module';
import mysqlConfig from './config/mysql.config';
import { HttpExceptionFilter } from './error/http-exception-filter';
import { MysqlModule } from './infrastructure/mysql/mysql.module';
import { NoticeModule } from '@notice/notice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        mysqlConfig
      ]
    }),
    ScheduleModule.forRoot(),
    MysqlModule,
    PostModule,
    ReplyModule,
    NoticeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
