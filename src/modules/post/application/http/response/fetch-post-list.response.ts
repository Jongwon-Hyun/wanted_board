import { FetchPostResponse } from "./fetch-post.response";
import { Pagination } from "./pagination";

export interface FetchPostListResponse {
    readonly posts: Array<FetchPostResponse>;
    readonly pagination: Pagination;
}

