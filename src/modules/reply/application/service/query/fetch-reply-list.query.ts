import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { Reply } from "@reply/domain/entity/reply.entity";
import { Repository } from "typeorm";

@Injectable()
export class FetchReplyListQuery {
    constructor(
        @InjectRepository(Reply)
        private readonly replyRepository: Repository<Reply>,
    ) {}

    async getList(postID: number, isChild: boolean, page: number, limit: number): Promise<[Array<Reply>, number]> {
        const query = this.replyRepository
            .createQueryBuilder('reply')
            .orderBy('reply.created_at', 'DESC')            
            .skip(limit * (page - 1))
            .take(limit)
            .where("reply.post_id = :postID", { postID: postID })
            .andWhere('reply.is_child is false');
        
        if (!isChild) {
            query.leftJoinAndSelect(
                'reply.child',
                'child',
              )
        }

        Logger.log('[fetch reply list]')
        return await query.getManyAndCount();
    }
}