import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeModule } from '@notice/notice.module';
import { PostController } from '@post/application/http/controller/post.controller';
import { DeletePostCommand } from './application/service/command/delete-post.command';
import { RegistPostCommand } from './application/service/command/regist-post.command';
import { UpdatePostCommand } from './application/service/command/update-post.command';
import { PostService } from './application/service/post.service';
import { FetchPostListQuery } from './application/service/query/fetch-post-list.query';
import { Post } from './domain/entity/post.entity';

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
