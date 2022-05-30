import { Pagination } from "@common/response/pagination";
import { FetchReplyResponse } from "./fetch-reply.response";

/**
 * 댓글 목록 조회 응답
 */
export interface FetchReplyListResponse {
    /**
     * 댓글 목록
     */
    readonly replies: Array<FetchReplyResponse>;

    /**
     * 페이징
     */
    readonly pagination: Pagination;
}

