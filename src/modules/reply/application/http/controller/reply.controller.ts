import { Body, Controller, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { ReplyService } from "@reply/application/service/reply.service";
import { RegistReplyRequest } from "../request/regist-reply.request";
import { FetchReplyListResponse } from "../response/fetch-reply-list.response";
import { RegistReplyResponse } from "../response/regist-reply.response";

/**
 * 댓글 컨트롤러
 */
@Controller('replies')
export class ReplyController {
  constructor(
    private readonly replyService: ReplyService,
  ) {}

  /**
   * 댓글 등록
   * @param request 요청 객체
   * @returns 응답 객체
   */
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

  /**
   * 댓글 목록 조회
   * @param params 요청 파라미터, 게시글 ID
   * @param page 페이지
   * @param limit 댓글 개수
   * @param isChild 대댓글 플래그
   * @returns 응답 객체
   */
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