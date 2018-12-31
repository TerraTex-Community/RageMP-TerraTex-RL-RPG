import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany} from 'typeorm';
import {DbAdminBans} from './DbAdminBans';

@Entity({
    name: 'User'
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
        type: 'enum',
        enum: ["male", "female", "other"]
    })
    gender: string;

    @Column()
    birthday: Date;

    @Column({
        type: 'longtext'
    })
    history: string;

    @Column({
        default: 0
    })
    admin: number;

    @Column({
        default: 0
    })
    dev: number;

    @CreateDateColumn({readonly: true})
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @OneToMany(type => DbAdminBans, ban => ban.user)
    bans: Promise<DbAdminBans[]>;
}
