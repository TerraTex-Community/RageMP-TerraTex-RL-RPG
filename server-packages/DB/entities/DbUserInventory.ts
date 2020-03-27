import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn
} from "typeorm";
import {DbUser} from "./DbUser";

export interface ItemInventoryData {
    amount: number;
}

@Entity({
    name: "user_inventory"
})
export class DbUserInventory extends BaseEntity {
    constructor(user: DbUser) {
        super();

        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => DbUser, user => user.id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        persistence: true
    })
    @JoinColumn()
    user: DbUser;

    @Column({
        default: 5000,
        type: "float",
    })
    money: number;

    @Column({
        default: 5000,
        type: "float"
    })
    bank: number;

    @Column({
        default: "{}",
        type: "json"
    })
    inventoryItems: {[itemClassName: string]: ItemInventoryData};

    @UpdateDateColumn({
        default: null,
        nullable: true
    })
    updated: Date;
}
