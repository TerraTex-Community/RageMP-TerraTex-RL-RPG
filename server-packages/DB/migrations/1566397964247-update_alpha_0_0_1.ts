import {MigrationInterface, QueryRunner} from "typeorm";

export class update_alpha_0_0_1_1566397964247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user_inventory_items` (`id` int NOT NULL AUTO_INCREMENT, `itemType` varchar(150) NOT NULL, `amount` int NOT NULL, `userInventoryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_inventory_items` ADD CONSTRAINT `FK_97e151f3a8188dad659edaaacc1` FOREIGN KEY (`userInventoryId`) REFERENCES `user_inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_inventory_items` DROP FOREIGN KEY `FK_97e151f3a8188dad659edaaacc1`");
        await queryRunner.query("DROP TABLE `user_inventory_items`");
    }

}
