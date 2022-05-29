import { PostDto } from "@post/application/http/dto/post.dto";
import { RegistPostResponse } from "@post/application/http/response/regist-post.response";

export interface PostUsecase {
    regist(postDto: PostDto): Promise<RegistPostResponse>
}