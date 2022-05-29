import { Bcrypt } from "@common/util/bcrypt";
import { Injectable } from "@nestjs/common";
import { Post } from "@post/domain/entity/post.entity";
import { PostUsecase } from "@post/domain/usecase/post.usecase";
import { PostDto } from "../http/dto/post.dto";
import { RegistPostResponse } from "../http/response/regist-post.response";
import { RegistPostCommand } from "./command/regist-post.command";

@Injectable()
export class PostService implements PostUsecase {
    constructor(
        private readonly registPostCommand: RegistPostCommand,
        private readonly bcrypt: Bcrypt,
    ) {}

    async regist(postDto: PostDto): Promise<RegistPostResponse> {
        const post = await this.registPostCommand.regist({
            title: postDto.title,
            content: postDto.content,
            writer: postDto.writer,
            password: await this.bcrypt.generate(postDto.password),      
        });

        return new RegistPostResponse(post.id, post.title, post.writer);
    }
    
}