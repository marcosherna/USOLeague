import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1758902881098 implements MigrationInterface {
    name = 'CreateTableUsers1758902881098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imgProfile\` varchar(255) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NULL, \`authProvider\` enum ('local', 'google', 'microsoft') NOT NULL DEFAULT 'local', \`providerId\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
