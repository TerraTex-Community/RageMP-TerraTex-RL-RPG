import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne
} from "typeorm";
import {DbUserInventory} from "./DbUserInventory";
import {IInventoryItem} from "../../Script/User/Inventory/IInventoryItem";
import Player = RageMP.Player;
import {InventoryItemItemTypeTransformer} from "../transformer/InventoryItemItemTypeTransformer";

@Entity({
    name: "user_inventory_items"
})
export class DbUserInventoryItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => DbUserInventory, userInventory => userInventory.id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    userInventory: DbUserInventory;

    @Column({
        type: "varchar",
        length: 150,
        transformer: new InventoryItemItemTypeTransformer()
    })
    itemType: IInventoryItem;

    @Column()
    amount: number;

    async use(player: Player, options?: {[optionsName: string]: string}): Promise<void> {
        if (await this.itemType.use(player, options)) {
            this.amount--;
            if (this.amount <= 0) await this.remove();
        }
    }
}
