import { FetchPostResponse } from "./fetch-post.response";
import { Pagination } from "../../../../../common/response/pagination";

export interface FetchPostListResponse {
    readonly posts: Array<FetchPostResponse>;
    readonly pagination: Pagination;
}

