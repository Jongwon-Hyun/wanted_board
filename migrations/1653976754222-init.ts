import {MigrationInterface, QueryRunner} from "typeorm";

export class init1653976754222 implements MigrationInterface {
    name = 'init1653976754222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notice_queues\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` bigint NOT NULL AUTO_INCREMENT, \`job_id\` bigint NULL, \`job_type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notices\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` bigint NOT NULL AUTO_INCREMENT, \`writer\` varchar(20) NOT NULL, \`keword\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`replies\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` bigint NOT NULL AUTO_INCREMENT, \`content\` varchar(1000) NOT NULL, \`writer\` varchar(20) NOT NULL, \`is_child\` tinyint NOT NULL, \`post_id\` bigint NOT NULL, \`parent_id\` bigint NULL, UNIQUE INDEX \`REL_37aebdb3b4ecc3667b54869270\` (\`parent_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` bigint NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL, \`content\` text NOT NULL, \`writer\` varchar(20) NOT NULL, \`password\` varchar(72) NOT NULL, INDEX \`IDX_2d82eb2bb2ddd7a6bfac8804d8\` (\`title\`), INDEX \`IDX_c80d494d5194a97234def5be1e\` (\`writer\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`replies\` ADD CONSTRAINT \`FK_3f53ba89a89b9cea8b9dd9286dc\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`replies\` ADD CONSTRAINT \`FK_37aebdb3b4ecc3667b54869270b\` FOREIGN KEY (\`parent_id\`) REFERENCES \`replies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`replies\` DROP FOREIGN KEY \`FK_37aebdb3b4ecc3667b54869270b\``);
        await queryRunner.query(`ALTER TABLE \`replies\` DROP FOREIGN KEY \`FK_3f53ba89a89b9cea8b9dd9286dc\``);
        await queryRunner.query(`DROP INDEX \`IDX_c80d494d5194a97234def5be1e\` ON \`posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_2d82eb2bb2ddd7a6bfac8804d8\` ON \`posts\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP INDEX \`REL_37aebdb3b4ecc3667b54869270\` ON \`replies\``);
        await queryRunner.query(`DROP TABLE \`replies\``);
        await queryRunner.query(`DROP TABLE \`notices\``);
        await queryRunner.query(`DROP TABLE \`notice_queues\``);
    }

}
