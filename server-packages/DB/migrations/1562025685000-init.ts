import {MigrationInterface, QueryRunner} from "typeorm";

export class init1562025685000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user_data` (`id` int NOT NULL AUTO_INCREMENT, `playTime` int NOT NULL DEFAULT 0, `skin` int NOT NULL DEFAULT 0, `paydayData` text NULL, `job` int NOT NULL DEFAULT 0, `spawn` text NULL, `factionId` int NOT NULL DEFAULT 0, `factionRank` int NOT NULL DEFAULT 0, `lastOfflineState` text NULL, `jailTime` int NOT NULL DEFAULT 0, `stvo` int NOT NULL DEFAULT 0, `updated` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, UNIQUE INDEX `REL_150d6991d90d298abc3f53d5e0` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_inventory` (`id` int NOT NULL AUTO_INCREMENT, `money` float NOT NULL DEFAULT 5000, `bank` float NOT NULL DEFAULT 5000, `updated` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, UNIQUE INDEX `REL_8b939d16efe58241bc0ce0c8d8` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `nickname` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `serial` varchar(255) NOT NULL, `forename` varchar(255) NOT NULL, `lastname` varchar(255) NOT NULL, `gender` enum ('male', 'female', 'other') NOT NULL, `birthday` datetime NOT NULL, `history` longtext NOT NULL, `admin` int NOT NULL DEFAULT 0, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e2364281027b926b879fa2fa1e` (`nickname`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `admin_bans` (`id` int NOT NULL AUTO_INCREMENT, `serial` varchar(255) NOT NULL, `systemName` varchar(255) NULL DEFAULT null, `reason` longtext NOT NULL, `banFrom` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `banTo` datetime NULL DEFAULT null, `blackListBan` tinyint NOT NULL, `userId` int NULL, `adminId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `log_money_transactions` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('money', 'bank', 'other') NOT NULL, `amount` float NOT NULL, `description` text NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `toId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_data` ADD CONSTRAINT `FK_150d6991d90d298abc3f53d5e09` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `user_inventory` ADD CONSTRAINT `FK_8b939d16efe58241bc0ce0c8d89` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `admin_bans` ADD CONSTRAINT `FK_2ae030609c088b1d4b165bb88f0` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `admin_bans` ADD CONSTRAINT `FK_5412ec63ed4ca854b2b06934333` FOREIGN KEY (`adminId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `log_money_transactions` ADD CONSTRAINT `FK_b8d44c8b4accfa20dcbca27967e` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `log_money_transactions` ADD CONSTRAINT `FK_2b5cf7fdba9debe931fe4f55cf6` FOREIGN KEY (`toId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `log_money_transactions` DROP FOREIGN KEY `FK_2b5cf7fdba9debe931fe4f55cf6`");
        await queryRunner.query("ALTER TABLE `log_money_transactions` DROP FOREIGN KEY `FK_b8d44c8b4accfa20dcbca27967e`");
        await queryRunner.query("ALTER TABLE `admin_bans` DROP FOREIGN KEY `FK_5412ec63ed4ca854b2b06934333`");
        await queryRunner.query("ALTER TABLE `admin_bans` DROP FOREIGN KEY `FK_2ae030609c088b1d4b165bb88f0`");
        await queryRunner.query("ALTER TABLE `user_inventory` DROP FOREIGN KEY `FK_8b939d16efe58241bc0ce0c8d89`");
        await queryRunner.query("ALTER TABLE `user_data` DROP FOREIGN KEY `FK_150d6991d90d298abc3f53d5e09`");
        await queryRunner.query("DROP TABLE `log_money_transactions`");
        await queryRunner.query("DROP TABLE `admin_bans`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e2364281027b926b879fa2fa1e` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP INDEX `REL_8b939d16efe58241bc0ce0c8d8` ON `user_inventory`");
        await queryRunner.query("DROP TABLE `user_inventory`");
        await queryRunner.query("DROP INDEX `REL_150d6991d90d298abc3f53d5e0` ON `user_data`");
        await queryRunner.query("DROP TABLE `user_data`");
    }

}
