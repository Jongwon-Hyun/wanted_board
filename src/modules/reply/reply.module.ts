import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeModule } from '@notice/notice.module';
import { Post } from '@post/domain/entity/post.entity';
import { ReplyController } from './application/http/controller/reply.controller';
import { RegistReplyCommand } from './application/service/command/regist-reply.command';
import { FetchReplyListQuery } from './application/service/query/fetch-reply-list.query';
import { ReplyService } from './application/service/reply.service';
import { Reply } from './domain/entity/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reply, Post]),
    CommonModule,
    NoticeModule,
  ],
  controllers: [
    ReplyController
  ],
  providers: [
    ReplyService,
    RegistReplyCommand,
    FetchReplyListQuery,
  ],
})
export class ReplyModule {}
