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
import {DbUserInventoryItem} from "./DbUserInventoryItem";
import {getInventoryItemByItemSymbol} from "../../Script/User/Inventory/IInventoryItem";

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

    @OneToMany(type => DbUserInventoryItem, inventoryItem => inventoryItem.userInventory, {
        eager: true
    })
    inventoryItems: DbUserInventoryItem[];

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

    async addInventoryItem(itemSymbol: string): Promise<void> {
        for (const item of this.inventoryItems) {
            if (item.itemType.itemSymbol === itemSymbol) {
                item.amount++;
                return;
            }
        }
        const itemType = getInventoryItemByItemSymbol(itemSymbol);
        if (!itemType) throw new Error(`ItemType '${itemSymbol}' does not exist.`);

        const newItem = new DbUserInventoryItem();
        newItem.amount = 1;
        newItem.itemType = itemType;
        newItem.userInventory = this;
        await newItem.save();

        this.inventoryItems.push(newItem);

        await this.save();
    }

    getAItemByItemSymbol(itemSymbol: string): DbUserInventoryItem | false {
        for (const item of this.inventoryItems) {
            if (item.itemType.itemSymbol === itemSymbol) {
                return item;
            }
        }
        return false;
    }
}
