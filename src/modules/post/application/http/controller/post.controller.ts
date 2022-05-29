import { Body, Controller, Delete, Headers, Logger, Param, Post, Put } from "@nestjs/common";
import { RegistPostRequest } from "@post/application/http/request/regist-post.request";
import { PostService } from "@post/application/service/post.service";
import { UpdatePostRequest } from "../request/update-post.request";
import { DeletePostResponse } from "../response/delete-post.response";
import { RegistPostResponse } from "../response/regist-post.response";

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Post()
  async registPost(
    @Body() request: RegistPostRequest
    ): Promise<RegistPostResponse> {

    Logger.log(`[request regist post] title: ${request.title} / writer: ${request.writer}`);

    return await this.postService.regist(
      {
        title: request.title,
        content: request.content,
        writer: request.writer,
        password: request.password,
      }
    );
  }

  // @TODO 인증 모듈이 완성될 때까지 pasword 를 헤더에 실어서 보냄
  @Delete(':id')
  async deletePost(
    @Param() params, 
    @Headers('password') password: string
    ): Promise<DeletePostResponse> {

    Logger.log(`[request delete post] post ID: ${params.id}`);

    return await this.postService.delete(params.id, password);
  }

  // @TODO 인증 모듈이 완성될 때까지 pasword 를 헤더에 실어서 보냄
  @Put(':id')
  async updatePost(
    @Param() params, 
    @Headers('password') password: string, 
    @Body() request: UpdatePostRequest
    ): Promise<void> {

    Logger.log(`[request update post] post ID: ${params.id}`);
    
    return await this.postService.update(params.id, password, 
      {
        title: request.title,
        content: request.content,
      }
    );
  }
}