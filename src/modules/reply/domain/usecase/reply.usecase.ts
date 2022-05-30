import { RegistPostDto, UpdatePostDto } from "@post/application/http/dto/post.dto";
import { DeletePostResponse } from "@post/application/http/response/delete-post.response";
import { RegistPostResponse } from "@post/application/http/response/regist-post.response";
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