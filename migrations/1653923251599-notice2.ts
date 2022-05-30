import {MigrationInterface, QueryRunner} from "typeorm";

export class notice21653923251599 implements MigrationInterface {
    name = 'notice21653923251599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notice_queues\` CHANGE \`job_id\` \`job_id\` bigint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notice_queues\` CHANGE \`job_id\` \`job_id\` bigint NOT NULL`);
    }

}
