import {MigrationInterface, QueryRunner} from "typeorm";

export class post1653840610895 implements MigrationInterface {
    name = 'post1653840610895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE posts MODIFY password varchar(72)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE posts MODIFY password varchar(20)`);
    }

}
