import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { Repository } from "typeorm";
import { FetchPostListFilter } from "./fetch-post-list-filter";

@Injectable()
export class FetchPostListQuery {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async getList(page: number, limit: number, filter: FetchPostListFilter): Promise<[Array<Post>, number]> {
        const query = this.postRepository
            .createQueryBuilder('post')
            .select([
                'post.id', 'post.title', 'post.content', 'post.writer'
            ])
            .orderBy('created_at', 'DESC')            
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