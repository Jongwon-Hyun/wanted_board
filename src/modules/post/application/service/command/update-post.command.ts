import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { Connection, Repository } from "typeorm";

@Injectable()
export class UpdatePostCommand {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly connection: Connection,
    ) {}

    async update(postID: number, post: Partial<Post>): Promise<void> {
        const queryRunner = this.connection.createQueryRunner()
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await this.postRepository.update(postID, post);

            await queryRunner.commitTransaction();
            Logger.log(`[update post] post ID: ${postID}`)
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`[fail update post] post ID: ${postID}}`);
        } finally {
            await queryRunner.release();
        }
    }
}