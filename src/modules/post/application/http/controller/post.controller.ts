import { Body, Controller, Logger, Post } from "@nestjs/common";
import { RegistPostRequest } from "@post/application/http/request/regist-post.request";
import { PostService } from "@post/application/service/post.service";
import { RegistPostResponse } from "../response/regist-post.response";

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}
  @Post()
  async registPost(@Body() request: RegistPostRequest): Promise<RegistPostResponse> {
    Logger.log(`[request regist post] title: ${request.title} / writer: ${request.writer}`);
    return await this.postService.regist({
      title: request.title,
      content: request.content,
      writer: request.writer,
      password: request.password,
    });
  }
}