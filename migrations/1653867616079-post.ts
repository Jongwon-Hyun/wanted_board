import {MigrationInterface, QueryRunner} from "typeorm";

export class post1653867616079 implements MigrationInterface {
    name = 'post1653867616079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`idx_title\` ON \`posts\` (\`title\`)`);
        await queryRunner.query(`CREATE INDEX \`idx_writer\` ON \`posts\` (\`writer\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_title\` ON \`posts\``);
        await queryRunner.query(`DROP INDEX \`idx_writer\` ON \`posts\``);
    }

}
