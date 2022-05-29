import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { Connection, Repository } from "typeorm";

@Injectable()
export class DeletePostCommand {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly connection: Connection,
    ) {}

    async delete(postID: number): Promise<number> {
        const queryRunner = this.connection.createQueryRunner()
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await this.postRepository.delete(postID);

            await queryRunner.commitTransaction();
            Logger.log(`[delete post] post ID: ${postID}`)
            return postID;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`[fail delete post] post ID: ${postID}`);
        } finally {
            await queryRunner.release();
        }
    }
}