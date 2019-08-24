import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn, ManyToOne
} from "typeorm";
import {DbUserInventory} from "./DbUserInventory";
import {IInventoryItem} from "../../Script/User/Inventory/IInventoryItem";
import Player = RageMP.Player;

@Entity({
    name: "user_inventory_items"
})
export class DbUserInventoryItems extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => DbUserInventory, userInventory => userInventory.id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    userInventory: DbUserInventory;

    @Column({
        type: "varchar",
        length: 150
    })
    itemType: IInventoryItem;

    @Column()
    amount: number;

    async use(player: Player, options: {[optionsName: string]: string}): Promise<void> {
        if (await this.itemType.use(player, options)) {
            this.amount--;
            if (this.amount <= 0) await this.remove();
        }
    }
}
