import {MigrationInterface, QueryRunner} from "typeorm";

export class update_alpha_0_0_1_1566397964247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_inventory` ADD `inventory` json NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_inventory` DROP COLUMN `inventory`");
    }

}
