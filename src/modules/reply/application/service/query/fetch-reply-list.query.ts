import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reply } from "@reply/domain/entity/reply.entity";
import { Repository } from "typeorm";

/**
 * 댓글 목록 조회
 */
@Injectable()
export class FetchReplyListQuery {
    constructor(
        @InjectRepository(Reply)
        private readonly replyRepository: Repository<Reply>,
    ) {}

    /**
     * 댓글 조회
     * @param postID 게시글 ID
     * @param page 페이지
     * @param limit 댓글 개수
     * @returns 댓글 목록, 댓글 총 개수
     */
    async getList(postID: number, page: number, limit: number): Promise<[Array<Reply>, number]> {
        const query = this.replyRepository
            .createQueryBuilder('reply')
            .orderBy('reply.created_at', 'DESC')            
            .skip(limit * (page - 1))
            .take(limit)
            .leftJoinAndSelect(
                'reply.child',
                'child',
              )
            .where("reply.post_id = :postID", { postID })
            // 대댓글은 댓글에 달려 나가기 때문에 제외
            .andWhere('reply.is_child is false');

        Logger.log('[fetch reply list]')
        return await query.getManyAndCount();
    }
}