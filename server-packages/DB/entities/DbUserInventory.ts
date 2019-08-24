import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn, OneToMany
} from "typeorm";
import {DbUser} from "./DbUser";
import {DbAdminBans} from "./DbAdminBans";
import {DbUserInventoryItems} from "./DbUserInventoryItems";

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

    @OneToMany(type => DbUserInventoryItems, inventoryItems => inventoryItems.userInventory)
    inventoryItems: DbUserInventoryItems[];

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

    @UpdateDateColumn({
        default: null,
        nullable: true
    })
    updated: Date;

}
