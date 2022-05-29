import { PostDto, UpdatePostDto } from "@post/application/http/dto/post.dto";
import { DeletePostResponse } from "@post/application/http/response/delete-post.response";
import { RegistPostResponse } from "@post/application/http/response/regist-post.response";

export interface PostUsecase {
    regist(postDto: PostDto): Promise<RegistPostResponse>
    delete(postID: number, password: string): Promise<DeletePostResponse>
    update(postID: number, password: string, postDto: UpdatePostDto): Promise<void>
}