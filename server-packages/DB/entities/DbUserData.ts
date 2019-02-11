import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn, AfterLoad
} from 'typeorm';
import {DbUser} from './DbUser';


@Entity({
    name: 'user_data'
})
export class DbUserData extends BaseEntity {
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

    @Column({default: 0})
    playTime: number;

    @Column({default: 0})
    skin: number;

    @Column({
        type: 'simple-json',
        nullable: true
    })
    paydayData: {
        current: {
            outgoings: {},
            income: {}
        },
        last: {
            outgoings: {},
            income: {}
        }
    };

    @AfterLoad()
    resetPayDayData() {
        if (this.paydayData === null) {
            this.paydayData = {
                current: {
                    outgoings: {},
                    income: {}
                },
                last: {
                    outgoings: {},
                    income: {}
                }
            }
        }
    }

    @Column({default: 0})
    job: number;

    @Column({
        type: 'simple-json',
        nullable: true
    })
    spawn: {};

    @Column({default: 0})
    factionId: number;

    @Column({default: 0})
    factionRank: 0;

    @Column({
        type: 'simple-json',
        nullable: true
    })
    lastOfflineState: {};

    @Column({default: 0})
    jailTime: number;

    @Column({default: 0})
    stvo: number;

    @UpdateDateColumn({
        default: null,
        nullable: true
    })
    updated: Date;
}
