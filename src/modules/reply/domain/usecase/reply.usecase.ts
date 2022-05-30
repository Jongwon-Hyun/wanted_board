import { FetchReplyListDto, RegistReplyDto } from "@reply/application/http/dto/reply.dto";
import { FetchReplyListResponse } from "@reply/application/http/response/fetch-reply-list.response";
import { RegistReplyResponse } from "@reply/application/http/response/regist-reply.response";

/**
 * 댓글 유즈케이스
 */
export interface ReplyUsecase {
    regist(replyDto: RegistReplyDto): Promise<RegistReplyResponse>;
    getList(fetchReplyListDto: FetchReplyListDto): Promise<FetchReplyListResponse>;
}