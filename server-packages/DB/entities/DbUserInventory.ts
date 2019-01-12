import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn, AfterLoad
} from 'typeorm';
import {DbUser} from './DbUser';

@Entity({
    name: 'user_inventory'
})
export class DbUserInventory extends BaseEntity {
    constructor(user: DbUser) {
        super();

        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => DbUser, user => user.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        persistence: true
    })
    @JoinColumn()
    user: DbUser;

    @Column({
        default: 5000,
        type: 'float',
    })
    money: number;

    @Column({
        default: 5000,
        type: 'float',
    })
    bank: number;

    @UpdateDateColumn({
        default: null,
        nullable: true
    })
    updated: Date;

}
