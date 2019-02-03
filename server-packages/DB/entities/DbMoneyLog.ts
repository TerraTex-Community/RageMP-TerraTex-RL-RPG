import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BaseEntity,
    JoinColumn, ManyToOne
} from 'typeorm';
import {DbUser} from './DbUser';

@Entity({
    name: 'log_money_transactions'
})
export class DbMoneyLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => DbUser, user => user.id, {
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    })
    @JoinColumn()
    user: DbUser;

    @Column({
        type: 'enum',
        enum: ["money", "bank", "other"]
    })
    type: string;

    @ManyToOne(type => DbUser, user => user.id, {
        nullable: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    })
    @JoinColumn()
    to: DbUser;

    @Column({
        type:'float'
    })
    amount: number;

    category: string;

    @Column({
        type: 'simple-json',
        nullable: true
    })
    description: {};

    @CreateDateColumn({readonly: true})
    created: Date;
}
