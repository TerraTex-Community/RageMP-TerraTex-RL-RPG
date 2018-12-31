import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne} from 'typeorm';
import {DbUser} from './DbUser';

@Entity({
    name: 'Admin_Bans'
})
export class DbAdminBans extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => DbUser, user => user.bans, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    user: DbUser;

    @Column()
    serial: string;

    @ManyToOne(type => DbUser, user => user.id, {
        nullable: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    })
    admin: DbUser;

    @Column({
        nullable: true,
        default: null
    })
    systemName: string;

    @Column({type: 'longtext'})
    reason: string;

    @CreateDateColumn({readonly: true})
    banFrom: Date;

    @Column({
        nullable: true,
        default: null
    })
    banTo: Date;

    @Column()
    blackListBan: boolean;
}
