import { Pagination } from "@common/response/pagination";
import { FetchPostResponse } from "./fetch-post.response";

/**
 * 게시글 목록 조회 응답
 */
export interface FetchPostListResponse {
    /**
     * 게시글 목록
     */
    readonly posts: Array<FetchPostResponse>;

    /**
     * 페이징
     */
    readonly pagination: Pagination;
}

