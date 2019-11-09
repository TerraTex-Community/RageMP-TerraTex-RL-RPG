import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne, BeforeUpdate
} from "typeorm";
import {DbUserInventory} from "./DbUserInventory";
import {IInventoryItem} from "../../Script/User/Inventory/IInventoryItem";
import Player = RageMP.Player;
import {InventoryItemItemTypeTransformer} from "../transformer/InventoryItemItemTypeTransformer";
import {DbUser} from "./DbUser";

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

    async use(player: Player, options?: {[optionsName: string]: string}): Promise<boolean> {
        if (await this.itemType.use(player, options)) {
            this.amount--;
            if (this.amount <= 0) {
                await (<DbUser>player.customData.dbUser).inventory.removeInventoryItem(this);
            }
            return true;
        } else {
            return false;
        }
    }

    @BeforeUpdate()
    checkIfUpdateOrRemove(): void {
        if (this.userInventory === null) {
            this.remove();
        }
    }
}
