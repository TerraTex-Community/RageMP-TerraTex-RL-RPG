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
import {InventoryTransformer} from "../transformers/InventoryTransformer";
import {Inventory} from "../../Script/User/Inventory/Inventory";

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
        type: "json",
        transformer: new InventoryTransformer(),
        nullable: true
    })
    inventory: Inventory;

    @Column({
        default: 5000,
        type: "float",
    })
    bank: number;

    @UpdateDateColumn({
        default: null,
        nullable: true
    })
    updated: Date;

}
