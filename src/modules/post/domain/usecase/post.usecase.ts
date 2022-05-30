import { FetchPostListDto, RegistPostDto, UpdatePostDto } from "@post/application/http/dto/post.dto";
import { DeletePostResponse } from "@post/application/http/response/delete-post.response";
import { FetchPostListResponse } from "@post/application/http/response/fetch-post-list.response";
import { RegistPostResponse } from "@post/application/http/response/regist-post.response";

/**
 * 게시글 유즈케이스
 */
export interface PostUsecase {
    regist(postDto: RegistPostDto): Promise<RegistPostResponse>;
    delete(postID: number, password: string): Promise<DeletePostResponse>;
    update(postID: number, password: string, postDto: UpdatePostDto): Promise<void>;
    getList(fetchPostListDto: FetchPostListDto): Promise<FetchPostListResponse>;
}