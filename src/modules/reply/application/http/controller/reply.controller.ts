import { Body, Controller, Delete, Get, Headers, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { RegistPostRequest } from "@post/application/http/request/regist-post.request";
import { PostService } from "@post/application/service/post.service";
import { ReplyService } from "@reply/application/service/reply.service";
import { RegistReplyRequest } from "../request/regist-reply.request";
import { FetchReplyListResponse } from "../response/fetch-reply-list.response";
import { RegistReplyResponse } from "../response/regist-reply.response";

@Controller('replies')
export class ReplyController {
  constructor(
    private readonly replyService: ReplyService,
  ) {}

  @Post()
  async registReply(
    @Body() request: RegistReplyRequest
    ): Promise<RegistReplyResponse> {

    Logger.log(`[request regist reply] writer: ${request.writer}`);

    return await this.replyService.regist(
      {
        postID: request.post_id,
        content: request.content,
        writer: request.writer,
        isChild: request.is_child,
        parentID: request.parent_id
      }
    );
  }

  @Get(':post_id')
  async fetchReplyList(
    @Param() params,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('is_child') isChild: boolean,
    ): Promise<FetchReplyListResponse> {

    Logger.log('[request fetch reply list]');

    return await this.replyService.getList({
      postID: params.post_id,
      isChild,
      page,
      limit,
    })
  }
}