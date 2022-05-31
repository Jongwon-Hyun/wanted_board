import { Bcrypt } from "@common/util/bcrypt";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoticeScheduler } from "@notice/application/scheduler/notice.scheduler";
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

/**
 * 게시글 서비스
 */
@Injectable()
export class PostService implements PostUsecase {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly registPostCommand: RegistPostCommand,
        private readonly deletePostCommand: DeletePostCommand,
        private readonly updatePostCommand: UpdatePostCommand,
        private readonly fetchPostListQuery: FetchPostListQuery,
        private readonly noticeScheduler: NoticeScheduler,
        private readonly bcrypt: Bcrypt,
    ) {}

    /**
     * 게시글 등록
     * @param registPostDto 게시글 등록 DTO
     * @returns 게시글 등록 응답
     */    
    async regist(registPostDto: RegistPostDto): Promise<RegistPostResponse> {
        const post = await this.registPostCommand.regist({
            title: registPostDto.title,
            content: registPostDto.content,
            writer: registPostDto.writer,
            password: await this.bcrypt.generate(registPostDto.password),      
        });

        // 알람 큐에 등록
        this.noticeScheduler.registJob(post.id, 'post');

        return {
            id: post.id,
            title: post.title,
            writer: post.writer,
            created_at: post.created_at,
        }
    }

    /**
     * 게시글 삭제
     * @param postID 게시글 ID
     * @param password 패스워드
     * @returns 게시글 삭제 응답
     */
    async delete(postID: number, password: string): Promise<DeletePostResponse> {
        await this.checkPostID(postID);
        await this.checkPassword(postID, password);
        await this.deletePostCommand.delete(postID);

        return { id: postID };
    }

    /**
     * 게시글 수정
     * @param postID 게시글 ID
     * @param password 패스워드
     * @param updatePostDto 게시글 수정 DTO
     */
    async update(postID: number, password: string, updatePostDto: UpdatePostDto): Promise<void> {
        await this.checkPostID(postID);
        await this.checkPassword(postID, password);
        await this.updatePostCommand.update(postID, 
            {
                title: updatePostDto.title,
                content: updatePostDto.content,   
            }
        );
    }

    /**
     * 게시글 목록 조회
     * @param fetchPostListDto 게시글 목록 조회 DTO
     * @returns 게시글 목록
     */
    async getList(fetchPostListDto: FetchPostListDto): Promise<FetchPostListResponse> {
        // 요청정보에 페이지가 없는 경우 1페이지로 세팅
        const page = fetchPostListDto.page ? fetchPostListDto.page : 1
        // 요청정보의 게시글 개수가 없거나 500개 이상일 경우, 500개로 세팅
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

    /**
     * 게시글 ID 검증
     * 게시글 수정, 삭제의 경우 게시글이 존재해야 한다!!
     * @param postID 게시글 ID
     */
     private async checkPostID(postID: number): Promise<void> {
        if (!(await this.postRepository.findOne(postID))) {
            throw new BadRequestException('not exsit post');
        }
    }

    /**
     * 패스워드 검증
     * 게시글 수정, 삭제의 경우 패스워드가 일치해야 한다!!
     * @param postID 게시글 ID
     * @param password 패스워드
     */
    private async checkPassword(postID: number, password: string): Promise<void> {
        const post = await this.postRepository.findOne(postID);
        if (!(await this.bcrypt.isMatch(password, post.password))) {
            throw new UnauthorizedException('invalid password');
        }
    }
}