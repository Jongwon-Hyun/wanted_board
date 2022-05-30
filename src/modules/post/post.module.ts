import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { PostController } from '@post/application/http/controller/post.controller';
import { PostService } from './application/service/post.service';
import { RegistPostCommand } from './application/service/command/regist-post.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './domain/entity/post.entity';
import { DeletePostCommand } from './application/service/command/delete-post.command';
import { UpdatePostCommand } from './application/service/command/update-post.command';
import { FetchPostListQuery } from './application/service/query/fetch-post-list.query';
import { NoticeModule } from '@notice/notice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommonModule,
    NoticeModule,
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostService,
    RegistPostCommand,
    DeletePostCommand,
    UpdatePostCommand,
    FetchPostListQuery,
  ],
})
export class PostModule {}
