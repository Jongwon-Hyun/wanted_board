import { Bcrypt } from "@common/util/bcrypt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { PostUsecase } from "@post/domain/usecase/post.usecase";
import { Repository } from "typeorm";
import { FetchPostListDto, RegistPostDto, UpdatePostDto } from "../http/dto/post.dto";
import { DeletePostResponse } from "../http/response/delete-post.response";
import { FetchPostListResponse } from "../http/response/fetch-post-list.response";
import { RegistPostResponse } from "../http/response/regist-post.response";
import { DeletePostCommand } from "./command/delete-post.command";
import { RegistPostCommand } from "./command/regist-post.command";
import { UpdatePostCommand } from "./command/update-post.command";
import { FetchPostListQuery } from "./query/fetch-post-list.query";

@Injectable()
export class PostService implements PostUsecase {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly registPostCommand: RegistPostCommand,
        private readonly deletePostCommand: DeletePostCommand,
        private readonly updatePostCommand: UpdatePostCommand,
        private readonly fetchPostListQuery: FetchPostListQuery,
        private readonly bcrypt: Bcrypt,
    ) {}

    async regist(postDto: RegistPostDto): Promise<RegistPostResponse> {
        const post = await this.registPostCommand.regist({
            title: postDto.title,
            content: postDto.content,
            writer: postDto.writer,
            password: await this.bcrypt.generate(postDto.password),      
        });

        return {
            id: post.id,
            title: post.title,
            writer: post.writer,
            created_at: post.created_at,
        }
    }

    async delete(postID: number, password: string): Promise<DeletePostResponse> {
        await this.checkPassword(postID, password);
        await this.deletePostCommand.delete(postID);

        return { id: postID };
    }

    async update(postID: number, password: string, postDto: UpdatePostDto): Promise<void> {
        await this.checkPassword(postID, password);
        await this.updatePostCommand.update(postID, 
            {
                title: postDto.title,
                content: postDto.content,   
            }
        );
    }

    async getList(fetchPostListDto: FetchPostListDto): Promise<FetchPostListResponse> {
        const page = fetchPostListDto.page ? fetchPostListDto.page : 1
        const limit = fetchPostListDto.limit && fetchPostListDto.limit <= 500 ? fetchPostListDto.limit : 500;
        const [postList, totalCount] = await this.fetchPostListQuery.getList(page, limit,
            {
                title: fetchPostListDto.filter?.title,
                writer: fetchPostListDto.filter?.writer
            }    
        );

        
        return {
            posts: postList,
            pagination: {
                page,
                limit,
                total_count: totalCount,
            }
        }
    }

    private async checkPassword(postID: number, password: string): Promise<void> {
        const post = await this.postRepository.findOne(postID);
        if (!(await this.bcrypt.isMatch(password, post.password))) {
            throw new UnauthorizedException('invalid password');
        }
    }
}