import { Bcrypt } from "@common/util/bcrypt";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoticeScheduler } from "@notice/application/scheduler/notice.scheduler";
import { Post } from "@post/domain/entity/post.entity";
import { PostUsecase } from "@post/domain/usecase/post.usecase";
import { Reply } from "@reply/domain/entity/reply.entity";
import { ReplyUsecase } from "@reply/domain/usecase/reply.usecase";
import { Repository } from "typeorm";
import { FetchReplyListDto, RegistReplyDto } from "../http/dto/reply.dto";
import { FetchReplyListResponse } from "../http/response/fetch-reply-list.response";
import { FetchReplyResponse } from "../http/response/fetch-reply.response";
import { RegistReplyResponse } from "../http/response/regist-reply.response";
import { RegistReplyCommand } from "./command/regist-reply.command";
import { FetchReplyListQuery } from "./query/fetch-reply-list.query";

/**
 * 댓글 서비스
 */
@Injectable()
export class ReplyService implements ReplyUsecase {
    constructor(
        private readonly registReplyCommand: RegistReplyCommand,
        private readonly fetchReplyListQuery: FetchReplyListQuery,
        @InjectRepository(Reply)
        private readonly replyRepository: Repository<Reply>,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly noticeScheduler: NoticeScheduler,
    ) {}

    /**
     * 댓글 등록
     * @param registReplyDto 댓들 등록 DTO
     * @returns 댓글 등록 응답
     */
    async regist(registReplyDto: RegistReplyDto): Promise<RegistReplyResponse> {
        const registReply = {
            post_id: registReplyDto.postID,
            content: registReplyDto.content,
            writer: registReplyDto.writer,
            is_child: registReplyDto.isChild,
        }

        // 댓글이 달리는 게시글이 존재하는지 검증
        await this.checkPostID(registReplyDto.postID);

        if (registReplyDto.isChild) {
            // 대댓글의 경우, 대댓글이 달리는 부모 댓글이 존재하는지 검증
            await this.checkParent(registReplyDto.postID, registReplyDto.parentID);
        }

        if (registReplyDto.isChild) {
            // 대댓글의 경우 대댓글이 달리는 부모 댓글 ID 를 세팅
            Object.assign(registReply, { parent_id : registReplyDto.parentID });
        }

        const reply = await this.registReplyCommand.regist(registReply);

        // 알림 큐에 등록
        this.noticeScheduler.registJob(reply.id, 'reply');

        return {
            id: reply.id,
            post_id: reply.post_id,
            writer: reply.writer,
            is_child: reply.is_child,
            parent_id: reply.parent_id,
            created_at: reply.created_at,
        }
    }

    /**
     * 댓글 목록 조회
     * @param fetchReplyListDto 댓글 목록 조회 DTO
     * @returns 댓글 목록 조회 응답
     */
    async getList(fetchReplyListDto: FetchReplyListDto): Promise<FetchReplyListResponse> {
        // 요청 정보에 페이지가 없을 경우 1페이지로 세팅
        const page = fetchReplyListDto.page ? fetchReplyListDto.page : 1
        // 요청정보의 댓글 개수가 없거나 500개 이상의 경우, 500개로 세팅
        const limit = fetchReplyListDto.limit && fetchReplyListDto.limit <= 500 ? fetchReplyListDto.limit : 500;
        const [replyList, totalCount] = await this.fetchReplyListQuery.getList(
            fetchReplyListDto.postID, fetchReplyListDto.isChild, page, limit,
        );

        const responseReplyList = replyList.map(reply => ({
            id: reply.id,
            post_id: reply.post_id,
            content: reply.content,
            is_child: reply.is_child,
            created_at: reply.created_at,
            child_reply: {
                id: reply.child?.id,
                content: reply.child?.content,
                created_at: reply.child?.created_at,
            }
        }));
        return {
            replies: responseReplyList,
            pagination: {
                page,
                limit,
                total_count: totalCount,
            }
        }
    }

    /**
     * 게시글 ID 검증
     * 댓글이 달리는 게시글이 존재해야 한다!!
     * @param postID 게시글 ID
     */
    private async checkPostID(postID: number): Promise<void> {
        if (!(await this.postRepository.findOne(postID))) {
            throw new BadRequestException('not exsit post');
        }
    }

    /**
     * 부모 댓글 검증
     * 대댓글이 달리는 부모 댓글이 존재해야 한다!!
     * 댓글에는 대댓글이 하나만 달릴 수 있다!!
     * @param postID 게시글 ID
     * @param parentID 부모 댓글 ID
     */
    private async checkParent(postID: number, parentID: number): Promise<void> {
        const parentCount = await this.replyRepository.createQueryBuilder('reply')
            .where('reply.post_id = :postID', { postID })
            .andWhere('reply.parent_id = :parentID', { parentID })
            .getCount()

            // 부모 댓글이 존재하지 않을 경우
            if (parentCount === 0) {
                throw new BadRequestException('not exist parent');
            }

        const childCount = await this.replyRepository.createQueryBuilder('reply')
            .where('reply.post_id = :postID', { postID })
            .andWhere('reply.parent_id = :parentID', { parentID })
            .andWhere('reply.is_child is true')
            .getCount()

            // 부모 댓글에 대댓글이 달려 있는 경우
            if (childCount > 0) {
                throw new BadRequestException('must be only one re-reply');
            }
    }
}