import {MigrationInterface, QueryRunner} from "typeorm";

export class update1585332044167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_inventory` ADD `inventoryItems` json NOT NULL DEFAULT '{}'");
     }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_inventory` DROP COLUMN `inventoryItems`");
    }

}
