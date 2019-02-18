import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, OneToOne} from "typeorm";
import {DbAdminBans} from "./DbAdminBans";
import {DbUserData} from "./DbUserData";
import {DbUserInventory} from "./DbUserInventory";

@Entity({
    name: "user"
})
export class DbUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    nickname: string;

    @Column()
    password: string;

    @Column({unique: true})
    email: string;

    @Column()
    serial: string;

    @Column()
    forename: string;

    @Column()
    lastname: string;

    @Column({
        type: "enum",
        enum: ["male", "female", "other"]
    })
    gender: string;

    @Column()
    birthday: Date;

    @Column({
        type: "longtext"
    })
    history: string;

    @Column({
        default: 0
    })
    admin: number;

    @CreateDateColumn({readonly: true})
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @OneToMany(type => DbAdminBans, ban => ban.user)
    bans: Promise<DbAdminBans[]>;

    @OneToOne(type => DbUserData, userData => userData.user, {
        cascade: true,
        eager: true
    })
    data: DbUserData;

    @OneToOne(type => DbUserInventory, userData => userData.user, {
        cascade: true,
        eager: true
    })
    inventory: DbUserInventory;
}
