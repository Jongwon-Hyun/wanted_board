import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { PostController } from '@post/application/http/controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './domain/entity/reply.entity';
import { ReplyService } from './application/service/reply.service';
import { RegistReplyCommand } from './application/service/command/regist-reply.command';
import { FetchReplyListQuery } from './application/service/query/fetch-reply-list.query';
import { ReplyController } from './application/http/controller/reply.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reply]),
    CommonModule,
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
