import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { PostController } from '@post/application/http/controller/post.controller';
import { PostService } from './application/service/post.service';
import { RegistPostCommand } from './application/service/command/regist-post.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './domain/entity/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommonModule,
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostService,
    RegistPostCommand,
  ],
})
export class PostModule {}
