import { Pagination } from "@common/response/pagination";
import { FetchReplyResponse } from "./fetch-reply.response";

export interface FetchReplyListResponse {
    readonly replies: Array<FetchReplyResponse>;
    readonly pagination: Pagination;
}

