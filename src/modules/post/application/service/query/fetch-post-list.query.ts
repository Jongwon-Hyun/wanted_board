import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { Repository } from "typeorm";
import { FetchPostListFilter } from "./fetch-post-list-filter";

/**
 * 게시글 목록 조회
 */
@Injectable()
export class FetchPostListQuery {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    /**
     * 게시글 목록 조회
     * @param page 페이지
     * @param limit 게시글 개수
     * @param filter 검색 조건
     * @returns 조회된 게시글, 게시글 총 개수
     */
    async getList(page: number, limit: number, filter: FetchPostListFilter): Promise<[Array<Post>, number]> {
        const query = this.postRepository
            .createQueryBuilder('post')
            .select([
                'post.id', 'post.title', 'post.content', 'post.writer', 
                'post.created_at', 'post.updated_at',
            ])
            .orderBy('post.created_at', 'DESC')            
            .skip(limit * (page - 1))
            .take(limit);
        
        if (filter) {
            if (filter.title) {
                query.andWhere('post.title like :title', {
                    title: `%${filter.title}%`,
                  });
            }

            if (filter.writer) {
                query.andWhere('post.writer like :writer', {
                    writer: `%${filter.writer}%`,
                  });
            }
        }

        Logger.log('[fetch post list]')
        return await query.getManyAndCount();
    }
}