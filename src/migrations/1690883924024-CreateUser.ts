import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1690883924024 implements MigrationInterface {
  name = 'CreateUser1690883924024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(500) NOT NULL, \`email\` varchar(500) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`records\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`recordType\` varchar(255) NOT NULL, \`remarks\` varchar(500) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(500) NOT NULL, \`icon\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(500) NOT NULL, \`currency\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`records\` ADD CONSTRAINT \`FK_9237a6e731418bb2b6111d17fb1\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_81cea66ae6ded53813857cca003\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_3aa23c0a6d107393e8b40e3e2a6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_3aa23c0a6d107393e8b40e3e2a6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_81cea66ae6ded53813857cca003\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`records\` DROP FOREIGN KEY \`FK_9237a6e731418bb2b6111d17fb1\``,
    );
    await queryRunner.query(`DROP TABLE \`accounts\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP TABLE \`records\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
