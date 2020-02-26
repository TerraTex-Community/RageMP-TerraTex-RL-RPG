import {MigrationInterface, QueryRunner} from "typeorm";

export class update1562025685601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user_vehicle` (`id` int NOT NULL AUTO_INCREMENT, `model` varchar(150) NOT NULL, `numberPlate` varchar(20) NULL, `positionData` json NOT NULL DEFAULT '{\"x\":0,\"y\":0,\"z\":0,\"heading\":0}', `updated` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ownerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_data` CHANGE `updated` `updated` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user_inventory` CHANGE `money` `money` float NOT NULL DEFAULT 5000");
        await queryRunner.query("ALTER TABLE `user_inventory` CHANGE `bank` `bank` float NOT NULL DEFAULT 5000");
        await queryRunner.query("ALTER TABLE `user_inventory` CHANGE `updated` `updated` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `created` `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updated` `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `admin_bans` CHANGE `systemName` `systemName` varchar(255) NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `admin_bans` CHANGE `banFrom` `banFrom` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `admin_bans` CHANGE `banTo` `banTo` datetime NULL DEFAULT null");
        await queryRunner.query("ALTER TABLE `log_money_transactions` CHANGE `amount` `amount` float NOT NULL");
        await queryRunner.query("ALTER TABLE `log_money_transactions` CHANGE `created` `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user_vehicle` ADD CONSTRAINT `FK_b4dba8121cd5effb36c3edce90e` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_vehicle` DROP FOREIGN KEY `FK_b4dba8121cd5effb36c3edce90e`");
        await queryRunner.query("ALTER TABLE `log_money_transactions` CHANGE `created` `created` datetime(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `log_money_transactions` CHANGE `amount` `amount` float(12) NOT NULL");
        await queryRunner.query("ALTER TABLE `admin_bans` CHANGE `banTo` `banTo` datetime NULL");
        await queryRunner.query("ALTER TABLE `admin_bans` CHANGE `banFrom` `banFrom` datetime(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `admin_bans` CHANGE `systemName` `systemName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updated` `updated` datetime(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `user` CHANGE `created` `created` datetime(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `user_inventory` CHANGE `updated` `updated` datetime(6) NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `user_inventory` CHANGE `bank` `bank` float(12) NOT NULL DEFAULT '5000'");
        await queryRunner.query("ALTER TABLE `user_inventory` CHANGE `money` `money` float(12) NOT NULL DEFAULT '5000'");
        await queryRunner.query("ALTER TABLE `user_data` CHANGE `updated` `updated` datetime(6) NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("DROP TABLE `user_vehicle`");
    }

}
