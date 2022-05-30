import { Body, Controller, Delete, Get, Headers, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { RegistPostRequest } from "@post/application/http/request/regist-post.request";
import { PostService } from "@post/application/service/post.service";
import { UpdatePostRequest } from "../request/update-post.request";
import { DeletePostResponse } from "../response/delete-post.response";
import { FetchPostListResponse } from "../response/fetch-post-list.response";
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

  // 게시글 목록을 가져올 때 댓글은 가져오지 않음
  // 게시글 하나를 가져올 때 댓글 가져오기 -> 게시글 리스트 로딩이 더 빠르다는 장점
  // 게시글 목록을 가져올 때 댓글을 가져오기 -> 클라이언트에 store 시켜 놓기 때문에 게시글 하나 가져올 때 빠름
  @Get()
  async fetchPostList(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('title') title: string,
    @Query('writer') writer: string
    ): Promise<FetchPostListResponse> {

    Logger.log('[request fetch post list]');

    return await this.postService.getList({
      filter: {
        title,
        writer,
      },
      page,
      limit,
    })
  }
}